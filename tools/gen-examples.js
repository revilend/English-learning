/* ==========================================================================
   tools/gen-examples.js
   Har bir dars so'zi va har bir darsga qo'shiladigan qo'shimcha so'z uchun
   inglizcha misol gap + uning o'zbekcha tarjimasini yaratadi (Gemini).

   Ishlatish:  GEMINI_KEY=<kalit> node tools/gen-examples.js [sekund] [worker]

   Natija:  tools/examples.json  ({ "word": {"s": "...", "u": "..."} })
   Skript qayta ishga tushirilganda bajarilgan so'zlarni o'tkazib yuboradi,
   shuning uchun uni bir necha marta (budjet bilan) ishga tushirish mumkin.
   Kalit faqat muhit o'zgaruvchisidan olinadi — repoga yozilmaydi.
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const PLAN = require('./plan');

const KEY = process.env.GEMINI_KEY || process.env.GEMINI_API_KEY || '';
const MODELS = ['gemini-3.5-flash', 'gemini-flash-lite-latest', 'gemini-flash-latest'];
const OUT = path.join(__dirname, 'examples.json');
const BUDGET_MS = (parseInt(process.argv[2], 10) || 150) * 1000;
const WORKERS = parseInt(process.argv[3], 10) || 5;
const PER_REQ = 24;
const START = Date.now();

if (!KEY) { console.error('GEMINI_KEY kerak'); process.exit(1); }

/* ------------------------------ Maqsadlar -------------------------------- */
const targets = new Map();                       /* en(lower) -> {en,uz,lv,prio} */
function add(en, uz, lv, prio) {
  en = String(en || '').trim(); uz = String(uz || '').trim();
  if (!en || !uz || en.length > 34) return;
  const k = en.toLowerCase();
  if (targets.has(k)) { if (prio < targets.get(k).prio) targets.get(k).prio = prio; return; }
  targets.set(k, { en: en, uz: uz, lv: lv, prio: prio });
}
PLAN.L.forEach(function (l) {
  (PLAN.plan.lessonWords[l.id] || []).forEach(function (w) { add(w.en, w.uz, l.lv, 0); });
});
PLAN.L.forEach(function (l) {
  (PLAN.plan.extras[l.id] || []).forEach(function (w) { add(w.en, w.uz, l.lv, 1); });
});

const done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const queue = Array.from(targets.values())
  .filter(function (t) { return !done[t.en.toLowerCase()]; })
  .sort(function (a, b) { return a.prio - b.prio; });

console.log('maqsadlar:', targets.size, '| bajarildi:', targets.size - queue.length, '| qoldi:', queue.length);
if (!queue.length) { console.log('HAMMASI TAYYOR'); process.exit(0); }

/* --------------------------------- API ----------------------------------- */
function ask(words, model, lv) {
  const list = words.map(function (w) { return w.en + ' = ' + w.uz; }).join('\n');
  const prompt =
    'You are an English teacher writing flashcards for Uzbek learners (CEFR ' + lv + ').\n' +
    'For EVERY item write ONE natural English example sentence that uses the item, and its Uzbek translation.\n' +
    'Length: A0/A1 = 4-7 words, A2 = 6-11 words, B1/B2/C1 = 8-14 words, natural and idiomatic.\n' +
    'Use simple vocabulary. Write the Uzbek translation in Latin script, using ʻ for the letters o‘/g‘.\n' +
    'If an item is a proper noun (person, company, brand, city), an abbreviation, vulgar, sexual, ' +
    'offensive or otherwise unsuitable for a family language course, return empty "s" and "u".\n' +
    'Return ONLY a JSON array, no markdown. Each element: {"w":"item","s":"english sentence","u":"uzbek translation"}\n\nITEMS:\n' + list;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.45, responseMimeType: 'application/json' }
  });
  return new Promise(function (resolve, reject) {
    const req = https.request({
      host: 'generativelanguage.googleapis.com',
      path: '/v1beta/models/' + model + ':generateContent',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'x-goog-api-key': KEY },
      timeout: 25000,
      agent: false
    }, function (r) {
      let d = '';
      r.on('data', function (c) { d += c; });
      r.on('end', function () {
        if (r.statusCode !== 200) return reject(new Error('HTTP ' + r.statusCode + ' ' + d.slice(0, 140)));
        try {
          const j = JSON.parse(d);
          const txt = (((j.candidates || [])[0] || {}).content || {}).parts.map(function (p) { return p.text || ''; }).join('');
          resolve(JSON.parse(txt.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()));
        } catch (e) { reject(new Error('parse: ' + e.message)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', function () { req.destroy(new Error('timeout')); });
    req.write(body); req.end();
  });
}
function save() { fs.writeFileSync(OUT, JSON.stringify(done)); }
/* Osilib qolishdan himoya */
setTimeout(function () {
  save();
  console.log('budjet tugadi (watchdog) — saqlandi');
  process.exit(0);
}, BUDGET_MS + 30000);

/* Navbat: daraja + muhimlik bo'yicha bo'laklarga bo'lamiz */
const chunks = [];
let cur = [];
queue.forEach(function (w) {
  if (cur.length && (w.lv !== cur[0].lv || cur.length >= PER_REQ)) { chunks.push(cur); cur = []; }
  cur.push(w);
});
if (cur.length) chunks.push(cur);

let next = 0, added = 0, empty = 0, failed = 0;
async function worker(id) {
  while (Date.now() - START < BUDGET_MS) {
    const my = chunks[next++];
    if (!my) return;
    let attempt = 0;
    while (attempt < 4) {
      attempt++;
      const model = MODELS[Math.min(attempt - 1, MODELS.length - 1)];
      try {
        const arr = await ask(my, model, my[0].lv);
        const byKey = {};
        (arr || []).forEach(function (o) {
          if (!o || !o.w) return;
          const k = String(o.w).toLowerCase().trim();
          const s = String(o.s || '').trim();
          if (s) byKey[k] = { s: s, u: String(o.u || '').trim() };
        });
        let got = 0;
        my.forEach(function (w) {
          const k = w.en.toLowerCase();
          if (byKey[k]) { done[k] = byKey[k]; got++; }
          else if (!done[k]) { done[k] = { s: '', u: '' }; empty++; }   /* yaroqsiz / mos kelmadi */
        });
        added += got;
        save();
        console.log('#' + id, my[0].lv, my.length, '| misol:', got, '| jami:', added);
        break;
      } catch (e) {
        if (attempt >= 4) {
          failed++;
          console.log('#' + id, 'XATO', e.message.slice(0, 110));
        } else {
          await new Promise(function (r) { setTimeout(r, 1500 * attempt); });
        }
      }
    }
  }
}
(async function () {
  await Promise.all(Array.from({ length: WORKERS }, function (_, k) { return worker(k + 1); }));
  save();
  const ok = Object.keys(done).filter(function (k) { return done[k].s; }).length;
  console.log('saqlandi:', Object.keys(done).length, '| misolli:', ok, '| bo\'sh:', empty, '| xato:', failed, '| qoldi:', targets.size - Object.keys(done).length);
  process.exit(0);
})();
