/* ==========================================================================
   tools/build-vocab.js
   tools/examples.json (Gemini misol gaplari) + tools/plan.js (so'z rejasi)
   asosida sayt uchun tayyor ma'lumot faylini yig'adi:  lesson-vocab.js

   Ishlatish:  node tools/build-vocab.js
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const PLAN = require('./plan');

const ROOT = path.join(__dirname, '..');
const EX = JSON.parse(fs.readFileSync(path.join(__dirname, 'examples.json'), 'utf8'));
const PER_LESSON = 10;                       /* har bir darsga qo'shiladigan so'zlar */

function exOf(word) {
  const e = EX[String(word).trim().toLowerCase()];
  if (!e || !e.s) return null;
  return [e.s, e.u || ''];
}

const extrasOut = {};
const examplesOut = {};
let extrasTotal = 0, examplesTotal = 0;
const shortLessons = [];
const pool = [];                                  /* ishlatilmagan, lekin yaroqli so'zlar */

PLAN.L.forEach(function (l) {
  /* Darsning o'z so'zlari uchun misol gaplar */
  (PLAN.plan.lessonWords[l.id] || []).forEach(function (w) {
    const e = exOf(w.en);
    if (e) { examplesOut[w.en.toLowerCase()] = e; examplesTotal++; }
  });
  /* Qo'shimcha so'zlar: faqat mazmunli (misoli tasdiqlangan) so'zlar olinadi.
     Nomzodlar chastota tartibida, shuning uchun eng mos so'zlar birinchi. */
  const own = [];
  (PLAN.plan.extras[l.id] || []).forEach(function (w) {
    const key = w.en.toLowerCase();
    const inLesson = (PLAN.plan.lessonWords[l.id] || []).some(function (x) { return x.en.toLowerCase() === key; });
    if (inLesson) return;
    const e = exOf(w.en);
    if (!e) return;                               /* Gemini yaroqsiz deb topdi */
    own.push({ en: w.en, uz: w.uz, ex: e, lv: l.lv });
  });
  extrasOut[String(l.id)] = own.slice(0, PER_LESSON);
  own.slice(PER_LESSON).forEach(function (w) { pool.push(w); });
});

/* Ba'zi darslarda 10 ta so'z yetmasa — boshqa darslardan qolgan so'zlardan to'ldiramiz */
PLAN.L.forEach(function (l) {
  const list = extrasOut[String(l.id)];
  if (list.length >= PER_LESSON) return;
  for (let i = pool.length - 1; i >= 0 && list.length < PER_LESSON; i--) {
    if (pool[i].lv !== l.lv) continue;
    list.push(pool[i]);
    pool.splice(i, 1);
  }
  for (let i = 0; i < pool.length && list.length < PER_LESSON; i++) {
    list.push(pool[i]);
    pool.splice(i, 1);
    i--;
  }
  shortLessons.push(l.id + '(' + list.length + ')');
});

Object.keys(extrasOut).forEach(function (id) {
  extrasOut[id] = extrasOut[id].map(function (w) {
    examplesOut[w.en.toLowerCase()] = w.ex;
    examplesTotal++;
    return [w.en, w.uz];
  });
  extrasTotal += extrasOut[id].length;
});

const header =
  '/* ==========================================================================\n' +
  '   English Zero-to-Hero — dars lug\'ati ma\'lumotlari (avtomatik yaratilgan)\n' +
  '   tools/build-vocab.js tomonidan yig\'ilgan. Qo\'lda tahrirlamang.\n' +
  '     ex — so\'z -> [inglizcha misol gap, o\'zbekcha tarjimasi]\n' +
  '     x  — dars raqami -> shu darsga qo\'shilgan ' + PER_LESSON + ' ta qo\'shimcha so\'z\n' +
  '   Jami: ' + examplesTotal + ' misol gap, ' + extrasTotal + ' qo\'shimcha so\'z.\n' +
  '   ========================================================================== */\n';

const body =
  'var LESSON_VOCAB = {\n' +
  '  ex: ' + JSON.stringify(examplesOut) + ',\n' +
  '  x: ' + JSON.stringify(extrasOut) + '\n' +
  '};\n';

fs.writeFileSync(path.join(ROOT, 'lesson-vocab.js'), header + body);
console.log('lesson-vocab.js yozildi | misollar:', examplesTotal, '| qo\'shimcha so\'zlar:', extrasTotal);
console.log('to\'lmagan darslar:', shortLessons.length ? shortLessons.join(' ') : 'yo\'q');
console.log('zaxirada qolgan so\'zlar:', pool.length);
console.log('namuna (dars 1):', JSON.stringify(extrasOut['1']));
console.log('namuna (dars 30):', JSON.stringify(extrasOut['30']));
