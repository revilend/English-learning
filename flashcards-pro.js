/* ==========================================================================
   English Zero-to-Hero — Flashcards 2.5
   Lug'at manbasi:
     • words-dictionary.js (DICT_EN_UZ) — 10 000+ eng ko'p ishlatiladigan so'z
     • lesson-vocab.js — har darsga qo'shilgan 10 ta so'z + 1 200+ misol gap

   Bu modul app.js dagi flashcard funksiyalarini to'ldiradi (app.js tegilmaydi):
     • wordsOfLesson() — dars so'zlari + o'sha darsning qo'shimcha so'zlari
       (har bir so'z uchun misol gap va uning o'zbekcha tarjimasi bilan)
     • buildAllWords() — butun 10 000+ so'zli lug'at (misollar bilan)
     • fCard()         — karta chizilishi (tarjima + misol gap + progress)
     • Rejimlar: butun lug'at, dars so'zlari, ➕ qo'shimcha so'zlar,
       ⭐ sevimlilar, ✅ o'rganilganlar, 🗒 misoli bor so'zlar
     • Avtomatik talaffuz, klaviatura tugmalari, statistika
   ========================================================================== */

var DICT_CACHE = null;

/* ------------------------------- Ma'lumot -------------------------------- */
function fcVocabPart(part) {
  try {
    if (typeof LESSON_VOCAB !== 'undefined' && LESSON_VOCAB && LESSON_VOCAB[part]) return LESSON_VOCAB[part];
  } catch (e) {}
  return null;
}
function fcExample(en) {
  var ex = fcVocabPart('ex');
  if (!ex) return null;
  var r = ex[String(en == null ? '' : en).trim().toLowerCase()];
  return (r && r[0]) ? { s: r[0], u: r[1] || '' } : null;
}
function fcWord(en, uz, extra) {
  var e = fcExample(en);
  return {
    en: String(en == null ? '' : en),
    uz: String(uz == null ? '' : uz),
    ex: e ? e.s : '',
    exUz: e ? e.u : '',
    x: !!extra
  };
}
/* tools/build-vocab.js yig'gan dars qo'shimcha so'zlari */
function lessonExtras(id) {
  var x = fcVocabPart('x');
  var list = x ? x[String(id)] : null;
  if (!list || !list.length) return [];
  return list.map(function (p) { return fcWord(p[0], p[1], true); });
}
function lessonExtrasOnly(id) { return lessonExtras(id); }

/* 10 000+ so'zli lug'at (misol gaplar bilan boyitilgan) */
function dictWords() {
  if (DICT_CACHE) return DICT_CACHE;
  var out = [];
  try {
    if (typeof DICT_EN_UZ === 'string' && DICT_EN_UZ) {
      DICT_EN_UZ.split('\n').forEach(function (line) {
        var i = line.indexOf('|');
        if (i < 1) return;
        var en = line.slice(0, i).trim();
        var uz = line.slice(i + 1).trim();
        if (en && uz) out.push(fcWord(en, uz));
      });
    }
  } catch (e) { out = []; }
  DICT_CACHE = out;
  return out;
}
function fcAppWords() {
  var d = dictWords();
  if (d.length) return d.slice();
  if (typeof WORDS !== 'undefined' && WORDS) {
    return WORDS.map(function (p) { return fcWord(p[0], p[1]); });
  }
  return [];
}
function fcExampleWords() {
  return fcAppWords().filter(function (w) { return !!w.ex; });
}
function fcFavs() {
  try { return JSON.parse(localStorage.getItem('favWords') || '[]') || []; } catch (e) { return []; }
}
function fcKnown() {
  try { return JSON.parse(localStorage.getItem('fcKnown') || '[]') || []; } catch (e) { return []; }
}
function fcSave(key, arr) {
  try { localStorage.setItem(key, JSON.stringify(arr.slice(0, 8000))); } catch (e) {}
}
function fcList() { return (window.fcWords || []); }
function fcCurrentWord() {
  var list = fcList();
  if (!list.length) return null;
  var i = parseInt(window.fcIdx, 10) || 0;
  if (i >= list.length) i = list.length - 1;
  if (i < 0) i = 0;
  return list[i];
}
function fcSettings() {
  try { return JSON.parse(localStorage.getItem('fcSettings') || '{}') || {}; } catch (e) { return {}; }
}
function fcSetSetting(k, v) {
  var s = fcSettings();
  s[k] = v;
  try { localStorage.setItem('fcSettings', JSON.stringify(s)); } catch (e) {}
}

/* -------------------------- app.js bilan bog'lash ------------------------- */
/* Dars so'zlari: dars lug'ati + shu darsga qo'shilgan 10 ta so'z */
function wordsOfLesson(id) {
  var l = null;
  try { l = (typeof L !== 'undefined' && L) ? L.filter(function (x) { return x.id === id; })[0] : null; } catch (e) {}
  if (!l) return fcAppWords();
  var base = (l.v || []).map(function (p) { return fcWord(p[0], p[1]); });
  return base.concat(lessonExtras(id));
}
/* Qidiruv va "Umumiy so'zlar" rejimi 10 000+ so'z ustida ishlaydi */
function buildAllWords() { return fcAppWords(); }

/* ------------------------------ Ko'rinish -------------------------------- */
function fcStatsHtml() {
  var list = fcList();
  var dict = dictWords().length;
  var favs = fcFavs();
  var known = fcKnown();
  var w = fcCurrentWord();
  var knownHere = 0;
  list.forEach(function (x) { if (known.indexOf(x.en) > -1) knownHere++; });
  var pct = list.length ? Math.round(knownHere / list.length * 100) : 0;
  var withEx = 0;
  list.forEach(function (x) { if (x.ex) withEx++; });
  return '' +
    fcStatChip('fa-layer-group', list.length + ' ta karta', 'Joriy ro\u2018yxatdagi so\u2018zlar soni') +
    fcStatChip('fa-book', dict ? (dict + ' so\u2018z') : '—', 'Lug\u2018atdagi jami so\u2018zlar (10 000+)') +
    fcStatChip('fa-quote-left', withEx + ' misol', 'Misol gapli so\u2018zlar') +
    fcStatChip('fa-star', favs.length + '', 'Sevimli so\u2018zlar') +
    fcStatChip('fa-circle-check', known.length + '', 'O\u2018rganilgan so\u2018zlar') +
    fcStatChip('fa-gauge-high', pct + '%', 'Shu ro\u2018yxatda o\u2018rganilgan') +
    (w && w.x ? '<span class="bg b-a1">➕ qo\u2018shimcha so\u2018z</span>' : '') +
    '<span class="fchint"><i class="fa-solid fa-keyboard"></i> ← → karta, bo\u2018shliq = ochish, S = talaffuz</span>';
}
function fcStatChip(icon, text, title) {
  return '<span class="bg b-a0 fcstat" title="' + esc(title || '') + '"><i class="fa-solid ' + icon + '"></i> ' + esc(text) + '</span>';
}
function fcRefresh() {
  var stats = document.getElementById('fcStats');
  if (stats) stats.innerHTML = fcStatsHtml();
  var fav = document.getElementById('fcFavBtn');
  var w = fcCurrentWord();
  var isFav = w && fcFavs().indexOf(w.en) > -1;
  var isKnown = w && fcKnown().indexOf(w.en) > -1;
  if (fav) {
    fav.className = 'btn bs ' + (isFav ? 'bp' : 'bo');
    fav.innerHTML = '<i class="fa-solid fa-star"></i> ' + (isFav ? 'Sevimlilarda' : 'Sevimlilarga');
  }
  var kn = document.getElementById('fcKnownBtn');
  if (kn) {
    kn.className = 'btn bs ' + (isKnown ? 'bp' : 'bo');
    kn.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + (isKnown ? 'O\u2018rganilgan' : 'O\u2018rgandim');
  }
  var auto = document.getElementById('fcAutoBtn');
  if (auto) auto.className = 'btn bs ' + (fcSettings().auto ? 'bp' : 'bo');
}
/* Karta: old tomoni (so'z) + orqa tomoni (tarjima, misol gap) */
function fcRenderCard() {
  var fw = document.getElementById('fw'), fm = document.getElementById('fm'), fe = document.getElementById('fe'),
      feu = document.getElementById('feu'), fp = document.getElementById('fp'), bad = document.getElementById('fcBad'),
      bar = document.getElementById('fcBar'), exBox = document.getElementById('fcEx');
  if (!fw) return;
  var list = fcList();
  if (!list.length) list = fcAppWords();
  if (!list.length) return;
  var i = parseInt(window.fcIdx, 10) || 0;
  if (i >= list.length) i = 0;
  if (i < 0) i = list.length - 1;
  window.fcIdx = i;
  var c = list[i] || { en: '', uz: '', ex: '' };
  fw.textContent = c.en;
  if (fm) fm.textContent = c.uz;
  if (exBox) exBox.style.display = c.ex ? 'block' : 'none';
  if (fe) fe.textContent = c.ex || '';
  if (feu) feu.textContent = c.exUz || '';
  if (bad) {
    bad.textContent = c.x ? '➕ dars qo\u2018shimcha so\u2018zi' : '';
    bad.style.display = c.x ? 'inline-block' : 'none';
  }
  if (fp) fp.textContent = (i + 1) + ' / ' + list.length;
  if (bar) bar.style.width = Math.round((i + 1) / list.length * 100) + '%';
  var card = document.getElementById('fcCard');
  if (card) card.classList.remove('flp');
  fcRefresh();
}
function fCard() { fcRenderCard(); }

/* ------------------------------- Amallar --------------------------------- */
function fcToast(msg) { if (typeof voiceToast === 'function') voiceToast(msg); }
function fcSetWords(list, label) {
  window.fcWords = list;
  window.fcIdx = 0;
  fcRenderCard();
  if (label) fcToast(label + ': <b>' + list.length + '</b> so\u2018z');
}
function fcSayCurrent() {
  var w = fcCurrentWord();
  if (w && w.en && typeof speakWord === 'function') speakWord(w.en);
}
function fcSpeakExample() {
  var w = fcCurrentWord();
  if (w && w.ex && typeof speakWord === 'function') speakWord(w.ex);
}
function fcShuffle() {
  var list = fcList().slice();
  if (list.length < 2) return;
  for (var i = list.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = list[i]; list[i] = list[j]; list[j] = t;
  }
  window.fcWords = list;
  window.fcIdx = 0;
  fcRenderCard();
  fcToast('\uD83D\uDD00 Aralashtirildi');
}
function fcRandom() {
  var list = fcList();
  if (!list.length) return;
  window.fcIdx = Math.floor(Math.random() * list.length);
  fcRenderCard();
  fcSayCurrent();
}
function fcFavToggle() {
  var w = fcCurrentWord();
  if (!w) return;
  var favs = fcFavs();
  var i = favs.indexOf(w.en);
  if (i > -1) favs.splice(i, 1); else favs.push(w.en);
  fcSave('favWords', favs);
  fcRefresh();
}
function fcKnownToggle() {
  var w = fcCurrentWord();
  if (!w) return;
  var known = fcKnown();
  var i = known.indexOf(w.en);
  if (i > -1) known.splice(i, 1);
  else { known.push(w.en); if (typeof addXP === 'function') addXP(2); }
  fcSave('fcKnown', known);
  fcRefresh();
}
/* Rejim tugmalari */
function fcTabs(mode, btn) {
  document.querySelectorAll('#ft .tab').forEach(function (t) { t.classList.remove('ac'); });
  if (btn) btn.classList.add('ac');
  var wrap = document.getElementById('fsl');
  if (wrap) wrap.style.display = (mode === 'a') ? 'none' : 'block';
}
function fcLessonId() {
  var sel = document.getElementById('fli');
  var id = sel ? parseInt(sel.value, 10) || 0 : 0;
  if (!id) {
    try { id = parseInt(localStorage.getItem('currentLesson') || '1', 10) || 1; } catch (e) { id = 1; }
  }
  return id;
}
function fcAllMode(btn) {
  fcTabs('a', btn);
  fcSetWords(fcAppWords(), '\uD83D\uDCDA Butun lug\u2018at');
}
function fcLessonMode(btn) {
  fcTabs('l', btn);
  var id = fcLessonId();
  var l = null;
  try { l = L.filter(function (x) { return x.id === id; })[0]; } catch (e) {}
  fcSetWords(wordsOfLesson(id), '\uD83D\uDCD8 ' + id + '-dars (' + ((l && l.lv) || '') + ')');
}
function fcExtrasMode(btn) {
  fcTabs('l', btn);
  var id = fcLessonId();
  fcSetWords(lessonExtras(id), '\u2795 ' + id + '-dars qo\u2018shimcha so\u2018zlari');
}
function fcExampleMode(btn) {
  fcTabs('a', btn);
  fcSetWords(fcExampleWords(), '\uD83D\uDDD2 Misol gapli so\u2018zlar');
}
function fcFavMode(btn) {
  fcTabs('a', btn);
  var favs = fcFavs();
  fcSetWords(fcAppWords().filter(function (w) { return favs.indexOf(w.en) > -1; }), '\u2B50 Sevimlilar');
}
function fcKnownMode(btn) {
  fcTabs('a', btn);
  var known = fcKnown();
  fcSetWords(fcAppWords().filter(function (w) { return known.indexOf(w.en) > -1; }), '\u2705 O\u2018rganilganlar');
}
function fcResetList(btn) { fcAllMode(btn); }
function fcAutoToggle() {
  var on = !fcSettings().auto;
  fcSetSetting('auto', on);
  fcRefresh();
  fcToast(on ? '\uD83D\uDD0A Avtomatik talaffuz yoqildi' : '\uD83D\uDD07 Avtomatik talaffuz o\u2018chirildi');
  if (on) fcSayCurrent();
}

/* --------------------------- Sahifaga joylash ---------------------------- */
function fcControlsHtml() {
  return '<div class="cd" style="cursor:default;margin-bottom:12px">' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<button class="btn bp bs" onclick="fcShuffle()"><i class="fa-solid fa-shuffle"></i> Aralashtirish</button>' +
      '<button class="btn bo bs" onclick="fcRandom()"><i class="fa-solid fa-dice"></i> Tasodifiy so\u2018z</button>' +
      '<button class="btn bo bs" id="fcFavBtn" onclick="fcFavToggle()"><i class="fa-solid fa-star"></i> Sevimlilarga</button>' +
      '<button class="btn bo bs" id="fcKnownBtn" onclick="fcKnownToggle()"><i class="fa-solid fa-circle-check"></i> O\u2018rgandim</button>' +
      '<button class="btn bo bs" onclick="fcFavMode(this)"><i class="fa-solid fa-star-half-stroke"></i> Sevimlilar</button>' +
      '<button class="btn bo bs" onclick="fcKnownMode(this)"><i class="fa-solid fa-brain"></i> O\u2018rganilganlar</button>' +
      '<button class="btn bo bs" onclick="fcExampleMode(this)"><i class="fa-solid fa-quote-left"></i> Misol gaplilar</button>' +
      '<button class="btn bo bs" id="fcAutoBtn" onclick="fcAutoToggle()"><i class="fa-solid fa-volume-high"></i> Avtomatik talaffuz</button>' +
    '</div>' +
    '<div class="gt" style="margin-top:10px">Kartani bosing — orqa tomonida tarjima, <b>misol gap</b> va uning tarjimasi chiqadi. ' +
    'So\u2018zni yodda saqlagach <b>O\u2018rgandim</b> tugmasini bosing (+2 XP) — shunda progress oshadi.</div>' +
    '</div>';
}
function fcInstall() {
  if (typeof document === 'undefined') return;
  /* app.js dagi funksiyalarni almashtiramiz (app.js tegmasdan qoladi) */
  if (typeof window.wordsOfLesson !== 'function' || !window.wordsOfLesson.__fcPro) {
    wordsOfLesson.__fcPro = true;
    window.wordsOfLesson = wordsOfLesson;
  }
  if (typeof window.buildAllWords !== 'function' || !window.buildAllWords.__fcPro) {
    buildAllWords.__fcPro = true;
    window.buildAllWords = buildAllWords;
  }
  if (typeof window.fCard !== 'function' || !window.fCard.__fcPro) {
    fCard.__fcPro = true;
    window.fCard = fCard;
  }
  /* mFc (oldingi/keyingi) — avtomatik talaffuz bilan */
  if (typeof window.mFc === 'function' && !window.mFc.__fcPro) {
    var origM = window.mFc;
    var mWrap = function (d) {
      origM(d);
      fcRenderCard();
      if (fcSettings().auto) setTimeout(fcSayCurrent, 60);
    };
    mWrap.__fcPro = true;
    window.mFc = mWrap;
  }
  /* setFS / setFL — ro'yxat o'zgarganda kartani yangilash */
  if (typeof window.setFS === 'function' && !window.setFS.__fcPro) {
    var origSet = window.setFS;
    var setWrap = function (mode, btn) {
      origSet(mode, btn);
      fcRenderCard();
    };
    setWrap.__fcPro = true;
    window.setFS = setWrap;
  }
  if (typeof window.setFL === 'function' && !window.setFL.__fcPro) {
    var origL = window.setFL;
    var lWrap = function (id) {
      origL(id);
      fcRenderCard();
      fcToast('\uD83D\uDCD8 ' + id + '-dars so\u2018zlari');
    };
    lWrap.__fcPro = true;
    window.setFL = lWrap;
  }
  /* Dars tanlash ro'yxati */
  if (typeof populateFCSelect === 'function' && typeof window.populateFCSelect === 'function') {
    try { populateFCSelect(); } catch (e) {}
  }
  /* Boshqaruv paneli */
  var tabs = document.getElementById('ft');
  if (tabs && !document.getElementById('fcCtl')) {
    tabs.insertAdjacentHTML('afterend', '<div id="fcCtl">' + fcControlsHtml() + '</div>');
  }
  if (!fcList().length) fcSetWords(fcAppWords(), '');
  else fcRenderCard();
}
function fcFlip(ev) {
  var card = document.getElementById('fcCard');
  if (!card) return;
  card.classList.toggle('flp');
  if (ev && ev.target && ev.target.closest && ev.target.closest('.fcsay,.fcsound')) return;
}
function fcKeys(e) {
  if (!e || !e.key) return;
  var box = document.getElementById('p3');
  if (!box || box.style.display === 'none') return;
  var tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.key === 'ArrowRight') { if (typeof mFc === 'function') mFc(1); }
  else if (e.key === 'ArrowLeft') { if (typeof mFc === 'function') mFc(-1); }
  else if (e.key === ' ') { e.preventDefault(); var c = document.getElementById('fcCard'); if (c) c.classList.toggle('flp'); }
  else if (e.key === 's' || e.key === 'S') { fcSayCurrent(); }
  else if (e.key === 'k' || e.key === 'K') { fcKnownToggle(); }
}
/* Qidiruv natijalarida misol gap ham ko'rsatiladi (app.js doS buildAllWords
   dan foydalanadi — u endi misolli 10 000+ so'z qaytaradi). */
function fcSearchExample(w) { return w && w.ex ? w.ex : ''; }

if (typeof window !== 'undefined') {
  window.dictWords = dictWords;
  window.fcShuffle = fcShuffle;
  window.fcRandom = fcRandom;
  window.fcFavToggle = fcFavToggle;
  window.fcKnownToggle = fcKnownToggle;
  window.fcFavMode = fcFavMode;
  window.fcKnownMode = fcKnownMode;
  window.fcAllMode = fcAllMode;
  window.fcLessonMode = fcLessonMode;
  window.fcExtrasMode = fcExtrasMode;
  window.fcExampleMode = fcExampleMode;
  window.fcAutoToggle = fcAutoToggle;
  window.fcFlip = fcFlip;
  window.fcSpeakExample = fcSpeakExample;
  window.fcRenderCard = fcRenderCard;
  window.fcRefresh = fcRefresh;
  window.lessonExtras = lessonExtras;
  window.lessonExtrasOnly = lessonExtrasOnly;
  window.fcExample = fcExample;
  window.fcWord = fcWord;
  window.fcStats = fcStatsHtml;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fcInstall);
    else fcInstall();
    document.addEventListener('keydown', fcKeys);
  }
}
