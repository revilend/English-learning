/* ==========================================================================
   tools/gen-dict.js
   Lug'atni kengaytiradi: mavzular bo'yicha yangi inglizcha so'z/ibora va
   ularning o'zbekcha tarjimasini yaratadi (Gemini).

   Ishlatish:  GEMINI_KEY=<kalit> node tools/gen-dict.js [sekund] [worker]

   Natija:  tools/dict-extra.json  [{"en":"...","uz":"...","lv":"A1","topic":"food"}]
   Skript qayta ishga tushirilganda bajarilgan mavzularni o'tkazib yuboradi.
   Mavjud lug'atda bor so'zlar avtomatik tashlab yuboriladi.
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const KEY = process.env.GEMINI_KEY || process.env.GEMINI_API_KEY || '';
const MODELS = ['gemini-3.5-flash', 'gemini-flash-lite-latest', 'gemini-flash-latest'];
const OUT = path.join(__dirname, 'dict-extra.json');
const BUDGET_MS = (parseInt(process.argv[2], 10) || 150) * 1000;
const WORKERS = parseInt(process.argv[3], 10) || 4;
const PER_REQ = 50;
const START = Date.now();

if (!KEY) { console.error('GEMINI_KEY kerak'); process.exit(1); }

const TOPICS = [
  ['food and cooking', 'A1'], ['travel and transport', 'A2'], ['work and office', 'B1'],
  ['health and body', 'A2'], ['technology and internet', 'B1'], ['emotions and personality', 'B1'],
  ['education and study', 'A2'], ['shopping and money', 'A2'], ['nature and weather', 'A2'],
  ['sport and hobbies', 'A2'], ['house and furniture', 'A1'], ['city and places', 'A2'],
  ['clothes and fashion', 'A2'], ['everyday action verbs', 'A1'], ['describing adjectives', 'A2'],
  ['phrasal verbs', 'B1'], ['idioms and expressions', 'B2'], ['business and finance', 'B2'],
  ['academic and writing words', 'B2'], ['polite phrases and small talk', 'A2'],
  ['family and relationships', 'A2'], ['animals and plants', 'A2'], ['music and art', 'B1'],
  ['law, society and politics', 'C1'], ['science and research', 'B2'], ['feelings in conversations', 'B1'],
  ['time, numbers and measurement', 'A2'], ['phones, calls and messages', 'A2'],
  ['restaurants and food service', 'B1'], ['airport, hotel and booking', 'B1']
];

/* Mavjud lug'at */
const DICT = new Function(fs.readFileSync(path.join(ROOT, 'words-dictionary.js'), 'utf8') + '; return DICT_EN_UZ;')();
const existing = new Set();
DICT.split('\n').forEach(function (line) {
  const p = line.indexOf('|');
  if (p > 0) existing.add(line.slice(0, p).trim().toLowerCase());
});

const done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { topics: {}, words: [] };
const words = done.words || [];
words.forEach(function (w) { existing.add(String(w.en).toLowerCase()); });

const queue = [];
TOPICS.forEach(function (t) {
  const key = t[0];
  if (done.topics && done.topics[key]) return;
  const need = Math.ceil(120 / PER_REQ);
  for (let i = 0; i < need; i++) queue.push({ topic: key, lv: t[1], part: i + 1, total: need });
});
console.log('mavjud so\u2018zlar:', existing.size, '| navbat:', queue.length, '| to\u2018plangan yangi so\u2018z:', words.length);
if (!queue.length) { console.log('HAMMASI TAYYOR'); process.exit(0); }

function ask(job, model) {
  const prompt =
    'You are building an English \u2192 Uzbek dictionary for a language course.\n' +
    'Give me ' + PER_REQ + ' useful English entries on the topic "' + job.topic + '" (CEFR ' + job.lv + '), ' +
    'with their Uzbek translations (Latin script, use \u02bb for the letters o\u2018/g\u2018).\n' +
    'Prefer specific, practical words, collocations, phrasal verbs and ready-to-use phrases that a learner really needs. ' +
    'Do NOT give the most basic words (the, go, come, good, big...). Avoid proper nouns, brands, offensive or sexual words.\n' +
    'Every English entry must be unique inside your answer, lowercase (except names), and at most 4 words long.\n' +
    'Return ONLY a JSON array, no markdown. Each element: {"en":"english word or phrase","uz":"uzbek translation"}\n' +
    'This is part ' + job.part + ' of ' + job.total + ', so give DIFFERENT entries than a typical list of the most common words.';
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.9, responseMimeType: 'application/json' }
  });
  return new Promise(function (resolve, reject) {
    const req = https.request({
      host: 'generativelanguage.googleapis.com',
      path: '/v1beta/models/' + model + ':generateContent',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'x-goog-api-key': KEY },
      timeout: 30000,
      agent: false
    }, function (r) {
      let d = '';
      r.on('data', function (c) { d += c; });
      r.on('end', function () {
        if (r.statusCode !== 200) return reject(new Error('HTTP ' + r.statusCode + ' ' + d.slice(0, 120)));
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
function save() {
  done.words = words;
  fs.writeFileSync(OUT, JSON.stringify(done));
}
setTimeout(function () { save(); console.log('budjet tugadi (watchdog)'); process.exit(0); }, BUDGET_MS + 30000);

function clean(en, uz) {
  en = String(en || '').trim();
  uz = String(uz || '').trim();
  if (!en || !uz) return null;
  if (en.length < 2 || en.length > 34 || uz.length > 40) return null;
  if (!/^[a-zA-Z][a-zA-Z' \-]*$/.test(en)) return null;
  if (!/[aeiou]/i.test(en)) return null;
  if (/^(the|a|an|of|and|to|in|is|are|it)$/i.test(en)) return null;
  const k = en.toLowerCase();
  if (existing.has(k)) return null;
  if (k === uz.toLowerCase()) return null;
  return { en: en.toLowerCase(), uz: uz, lv: '', topic: '' };
}

let added = 0, failed = 0;
let next = 0;
async function worker(id) {
  while (Date.now() - START < BUDGET_MS) {
    const job = queue[next++];
    if (!job) return;
    let attempt = 0;
    while (attempt < 4) {
      attempt++;
      const model = MODELS[Math.min(attempt - 1, MODELS.length - 1)];
      try {
        const arr = await ask(job, model);
        let got = 0;
        (arr || []).forEach(function (o) {
          if (!o) return;
          const w = clean(o.en, o.uz);
          if (!w) return;
          w.lv = job.lv;
          w.topic = job.topic;
          existing.add(w.en);
          words.push(w);
          got++;
        });
        added += got;
        save();
        console.log('#' + id, job.topic, job.part + '/' + job.total, '| yangi:', got, '| jami:', words.length);
        break;
      } catch (e) {
        if (attempt >= 4) { failed++; console.log('#' + id, 'XATO', e.message.slice(0, 100)); }
        else await new Promise(function (r) { setTimeout(r, 1500 * attempt); });
      }
    }
  }
}
(async function () {
  await Promise.all(Array.from({ length: WORKERS }, function (_, k) { return worker(k + 1); }));
  save();
  console.log('yangi so\u2018zlar:', added, '| jami to\u2018plangan:', words.length, '| xato:', failed, '| qoldi:', queue.length - next);
  process.exit(0);
})();
