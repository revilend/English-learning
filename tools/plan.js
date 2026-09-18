/* ==========================================================================
   tools/plan.js — darslar, lug'at va qo'shimcha so'z nomzodlari rejasi.
   Bu modulni ham misol gap generatori (gen-examples.js), ham sayt uchun
   ma'lumot faylini yig'uvchi skript (build-vocab.js) ishlatadi — shunda
   ikkalasi bir xil so'zlar ustida ishlaydi.
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const appSrc = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8').split('\n');
const L = new Function('return (function(){' + appSrc.slice(6, 208).join('\n') + '; return L;})()')();
const DICT = new Function(fs.readFileSync(path.join(ROOT, 'words-dictionary.js'), 'utf8') + '; return DICT_EN_UZ;')();
const DICT_WORDS = DICT.split('\n').map(function (line, i) {
  const p = line.indexOf('|');
  return p < 1 ? null : { en: line.slice(0, p).trim(), uz: line.slice(p + 1).trim(), rank: i };
}).filter(Boolean);

const BANDS = {
  A0: [0.00, 0.12], A1: [0.12, 0.24], A2: [0.24, 0.36],
  B1: [0.36, 0.52], B2: [0.52, 0.74], C1: [0.74, 1.00]
};
const STOP = ('the of and to a in for on that by this with you it not or be are is was were from at as your all have has had an we they he she i me my our their his her its will would can could should may might must do does did no yes if so but than then there here what which who when where why how also more most some any other such only just very too up out about into over after before between under again off down own same each am us page free one two new now time information ' +
  /* Yordamchi (grammatik) so'zlar — alohida so'z sifatida o'rgatilmaydi */
  'been being having these those them doing its whose whom thus hence upon within without whether though although unless until while whereas plus via per ours yours theirs himself herself itself myself yourself ourselves themselves everyone everything something anything nothing someone somebody anybody shall ought ' +
  'cant dont doesnt didnt isnt arent wasnt werent hasnt havent hadnt wont couldnt shouldnt wouldnt mustnt')
  .split(' ').reduce(function (o, w) { if (w) o[w] = 1; return o; }, {});
const BLOCK = ('sex sexy porn porno nude naked slut bitch whore ejaculation nipple bra breasts penis vagina condom fuck shit ass damn gay gays lesbian erotic orgy milf anal xxx worldsex drugs cocaine heroin')
  .split(' ').reduce(function (o, w) { o[w] = 1; return o; }, {});
const CORPUS = (function () {
  let text = ['reading-a.js', 'reading-b.js', 'reading-c.js']
    .map(function (f) { return fs.readFileSync(path.join(ROOT, f), 'utf8'); }).join('\n');
  L.forEach(function (l) { text += '\n' + String(l.r.t).replace(/\|/g, ' ') + ' ' + (l.ls || '') + ' ' + (l.ws || ''); });
  return ' ' + text.toLowerCase().replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ') + ' ';
})();

function skel(s) { return String(s).toLowerCase().replace(/[^a-z]/g, '').replace(/[aeiou]/g, ''); }
function lev(a, b) {
  if (a === b) return 0;
  if (!a.length || !b.length) return a.length + b.length;
  let prev = [], cur = [], i, j;
  for (j = 0; j <= b.length; j++) prev[j] = j;
  for (i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur.slice();
  }
  return prev[b.length];
}
/* So'z kursga yaroqlimi? (qisqartma, atoqli ot, tarjimasiz, odobsiz so'zlar tashlanadi) */
function goodWord(en, uz) {
  en = String(en || '').trim().toLowerCase();
  uz = String(uz || '').trim().toLowerCase();
  if (!en || !uz) return false;
  if (!/^[a-z]{3,18}$/.test(en)) return false;
  if (!/[aeiou]/.test(en)) return false;
  if (STOP[en] || BLOCK[en]) return false;
  if (en === uz) return false;
  if (CORPUS.indexOf(' ' + en + ' ') < 0) return false;
  const a = skel(en), b = skel(uz);
  if (a.length >= 4 && b.length >= 4 && lev(a, b) <= 1) return false;
  return true;
}

const WANT_CANDIDATES = 22;

function buildPlan() {
  const lessonWords = {};      /* id -> [{en,uz}] */
  const extras = {};           /* id -> [{en,uz}] nomzodlar */
  const used = new Set();
  L.forEach(function (l) {
    lessonWords[l.id] = (l.v || []).map(function (p) {
      return { en: String(p[0]).trim(), uz: String(p[1]).trim() };
    }).filter(function (w) { return w.en && w.uz; });
    lessonWords[l.id].forEach(function (w) { used.add(w.en.toLowerCase()); });
  });
  L.forEach(function (l) {
    const band = BANDS[l.lv] || BANDS.A1;
    const start = Math.floor(DICT_WORDS.length * band[0]);
    const end = Math.floor(DICT_WORDS.length * band[1]);
    const ordered = [];
    let i;
    for (i = start; i < end; i++) ordered.push(DICT_WORDS[i]);
    for (i = 0; i < DICT_WORDS.length; i++) if (i < start || i >= end) ordered.push(DICT_WORDS[i]);
    const picked = [];
    for (i = 0; i < ordered.length && picked.length < WANT_CANDIDATES; i++) {
      const w = ordered[i];
      const k = w.en.toLowerCase();
      if (used.has(k)) continue;
      if (!goodWord(w.en, w.uz)) continue;
      used.add(k);
      picked.push({ en: w.en, uz: w.uz });
    }
    extras[l.id] = picked;
  });
  return { lessons: L, lessonWords: lessonWords, extras: extras };
}

/* tools/gen-dict.js to'plagan qo'shimcha lug'at (mavzular bo'yicha) */
const DICT_EXTRA_FILE = path.join(__dirname, 'dict-extra.json');
const dictExtras = fs.existsSync(DICT_EXTRA_FILE)
  ? (JSON.parse(fs.readFileSync(DICT_EXTRA_FILE, 'utf8')).words || [])
  : [];

module.exports = {
  L: L, DICT_WORDS: DICT_WORDS, BANDS: BANDS, goodWord: goodWord,
  plan: buildPlan(), dictExtras: dictExtras
};
