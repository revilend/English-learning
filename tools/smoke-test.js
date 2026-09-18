/* ==========================================================================
   tools/smoke-test.js — sayt skriptlarini soxta DOM bilan yuklab, flashcard va
   dars lug'ati bog'lanishini tekshiradi (brauzersiz).

   Ishlatish:  node tools/smoke-test.js
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SCRIPTS = ['reading-a.js', 'reading-b.js', 'reading-c.js', 'words-dictionary.js', 'lesson-vocab.js',
  'app.js', 'reading-ui.js', 'lesson-plus.js', 'progress-real.js', 'flashcards-pro.js',
  'certificate.js', 'exam.js', 'mock.js', 'voice.js', 'ai.js'];

let failures = 0;
function ok(cond, label, extra) {
  if (cond) console.log('  ✅ ' + label);
  else { failures++; console.log('  ❌ ' + label + (extra !== undefined ? '  → ' + extra : '')); }
}

/* ------------------------------- Soxta DOM ------------------------------- */
function makeEl(id) {
  const el = {
    id: id, style: {}, dataset: {}, children: [],
    innerHTML: '', textContent: '', value: '', disabled: false, className: '',
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); },
      remove(c) { this._s.delete(c); },
      contains(c) { return this._s.has(c); },
      toggle(c) { this._s.has(c) ? this._s.delete(c) : this._s.add(c); }
    },
    insertAdjacentHTML(pos, html) { this.innerHTML += html; },
    appendChild(c) { this.children.push(c); return c; },
    removeChild() {}, remove() {}, setAttribute() {}, getAttribute() { return null; },
    addEventListener() {}, removeEventListener() {}, focus() {}, blur() {}, click() {},
    scrollTop: 0, scrollHeight: 0, offsetWidth: 0, width: 800, height: 600,
    querySelector() { return null; }, querySelectorAll() { return []; },
    getContext() { return null; }, closest() { return null; }, getBoundingClientRect() { return { top: 0, left: 0 }; }
  };
  return el;
}
const els = {};
function byId(id) { if (!els[id]) els[id] = makeEl(id); return els[id]; }
/* index.html dagi barcha id larni oldindan yaratamiz */
((fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')).match(/id="[^"]+"/g) || []).forEach(function (m) {
  byId(m.slice(4, -1));
});

const document = {
  readyState: 'loading',
  body: makeEl('body'), head: makeEl('head'),
  documentElement: makeEl('html'),
  getElementById: byId,
  createElement: makeEl,
  querySelector: function (sel) { return /^#([\w-]+)$/.test(sel) ? byId(sel.slice(1)) : makeEl('q'); },
  querySelectorAll: function () { return []; },
  addEventListener: function () {}, removeEventListener: function () {},
  cookie: '', title: '', hidden: false
};
const store = {};
const sandbox = {
  console: console, setTimeout: setTimeout, clearTimeout: clearTimeout, setInterval: setInterval,
  clearInterval: clearInterval, Promise: Promise, JSON: JSON, Math: Math, Date: Date, RegExp: RegExp,
  String: String, Number: Number, Array: Array, Object: Object, Error: Error, isNaN: isNaN, parseInt: parseInt,
  parseFloat: parseFloat, encodeURIComponent: encodeURIComponent, decodeURIComponent: decodeURIComponent,
  document: document,
  localStorage: {
    getItem(k) { return k in store ? store[k] : null; },
    setItem(k, v) { store[k] = String(v); },
    removeItem(k) { delete store[k]; }
  },
  navigator: { userAgent: 'node', standalone: false, mediaDevices: null, onLine: true },
  location: { href: 'https://example.test/', protocol: 'https:', hostname: 'example.test', origin: 'https://example.test' },
  SpeechSynthesisUtterance: function () {}, alert: function () {},
  matchMedia: function () { return { matches: false, addEventListener: function () {} }; },
  performance: { now: function () { return Date.now(); } }
};
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);

console.log('— Skriptlar yuklanmoqda —');
SCRIPTS.forEach(function (f) {
  const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try {
    vm.runInContext(code, ctx, { filename: f });
    console.log('  ✅ ' + f);
  } catch (e) {
    failures++;
    console.log('  ❌ ' + f + ' → ' + e.message);
  }
});

console.log('— Flashcard bog\u2018lanishi —');
try { sandbox.fcInstall(); } catch (e) { failures++; console.log('  ❌ fcInstall: ' + e.message); }

ok(typeof sandbox.lessonExtras === 'function', 'lessonExtras() mavjud');
ok((sandbox.lessonExtras(1) || []).length === 10, 'dars 1 uchun 10 ta qo\u2018shimcha so\u2018z', (sandbox.lessonExtras(1) || []).length);
ok((sandbox.lessonExtras(1) || []).every(function (w) { return w.ex && w.uz; }), 'har bir qo\u2018shimcha so\u2018zda misol gap bor');
ok(sandbox.window.wordsOfLesson === sandbox.wordsOfLesson, 'wordsOfLesson app.js dan almashtirilgan');

const lesson1 = sandbox.wordsOfLesson(1);
ok(lesson1.length === 30, 'dars 1: 20 dars so\u2018zi + 10 qo\u2018shimcha = 30 karta', lesson1.length);
ok(lesson1.slice(20).every(function (w) { return w.x && w.ex; }), 'qo\u2018shimcha kartalarda misol gap va belgisi bor');
const withEx = lesson1.filter(function (w) { return w.ex; }).length;
ok(withEx >= 25, 'dars 1 kartalarida misol gaplar: ' + withEx + '/30');

const all = sandbox.buildAllWords();
ok(all.length > 10000, 'butun lug\u2018at 10 000+ so\u2018z: ' + all.length);
ok(all.filter(function (w) { return w.ex; }).length > 1000, 'lug\u2018atda misol gapli so\u2018zlar: ' + all.filter(function (w) { return w.ex; }).length);

console.log('— Karta chizilishi —');
sandbox.fcExtrasMode(null);
ok((sandbox.window.fcWords || []).length === 10, '➕ rejimida 10 so\u2018z', (sandbox.window.fcWords || []).length);
ok(byId('fw').textContent === sandbox.window.fcWords[0].en, 'karta old tomoni so\u2018zni ko\u2018rsatadi', byId('fw').textContent);
ok(byId('fm').textContent === sandbox.window.fcWords[0].uz, 'karta orqasi tarjimani ko\u2018rsatadi', byId('fm').textContent);
ok(byId('fe').textContent === sandbox.window.fcWords[0].ex, 'misol gap chiziladi: ' + byId('fe').textContent);
ok(byId('feu').textContent === sandbox.window.fcWords[0].exUz, 'misol gap tarjimasi chiziladi');
ok(byId('fp').textContent === '1 / 10', 'sanoq: ' + byId('fp').textContent);
ok(byId('fcBar').style.width === '10%', 'progress: ' + byId('fcBar').style.width);
ok(byId('fcBad').style.display === 'inline-block', 'qo\u2018shimcha so\u2018z belgisi ko\u2018rinadi');
ok(String(byId('fcStats').innerHTML).indexOf('10 ta karta') > -1, 'statistika chiziladi');

sandbox.fcLessonMode(null);
ok((sandbox.window.fcWords || []).length === 30, '📘 dars rejimida 30 so\u2018z', (sandbox.window.fcWords || []).length);
sandbox.fcAllMode(null);
ok((sandbox.window.fcWords || []).length > 10000, '📚 butun lug\u2018at rejimi', (sandbox.window.fcWords || []).length);
sandbox.fcExampleMode(null);
ok((sandbox.window.fcWords || []).length > 1000, '🗒 misol gaplilar rejimi', (sandbox.window.fcWords || []).length);

const before = sandbox.window.fcIdx;
sandbox.mFc(1);
ok(sandbox.window.fcIdx === before + 1, 'mFc keyingi kartaga o\u2018tadi');
sandbox.fcKnownToggle();
ok(sandbox.fcKnown().indexOf(sandbox.fcCurrentWord().en) > -1, 'O\u2018rgandim belgisi saqlanadi');
sandbox.fcFavToggle();
ok(sandbox.fcFavs().indexOf(sandbox.fcCurrentWord().en) > -1, 'Sevimlilar belgisi saqlanadi');

console.log('— Dars sahifasi lug\u2018ati —');
const vf = sandbox.vocabFor(3);
ok((vf || []).length === 10, 'dars 3 qo\u2018shimcha so\u2018zlari: ' + ((vf || []).length));
ok((vf || []).every(function (w) { return w.ex; }), 'dars lug\u2018atida misol gaplar bor');

console.log('');
if (failures) { console.log('❌ ' + failures + ' ta tekshiruv muvaffaqiyatsiz'); process.exit(1); }
console.log('✅ Barcha tekshiruvlar muvaffaqiyatli');
