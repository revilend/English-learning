/* ==========================================================================
   English Zero-to-Hero — Flashcards 2.0 (10 000+ so'z)
   Lug'at manbasi: words-dictionary.js (DICT_EN_UZ) — ingliz tilining eng ko'p
   ishlatiladigan 10 000 so'zi va o'zbekcha tarjimalari.
   Bu modul:
     • buildAllWords() ni katta lug'atga ulaydi (shu sababli "Umumiy so'zlar"
       rejimi va qidiruv ham 10 000+ so'z ustida ishlaydi)
     • Aralashtirish / Tasodifiy so'z / Sevimlilar / O'rgandim belgilarini qo'shadi
     • Karta ichida qidirish (joriy ro'yxatdan filtrlash) imkonini beradi
   ========================================================================== */

var DICT_CACHE = null;
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
        if (en && uz) out.push({ en: en, uz: uz, ex: '' });
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
    return WORDS.map(function (p) { return { en: p[0], uz: p[1], ex: '' }; });
  }
  return [];
}
function fcFavs() {
  try { return JSON.parse(localStorage.getItem('favWords') || '[]') || []; } catch (e) { return []; }
}
function fcKnown() {
  try { return JSON.parse(localStorage.getItem('fcKnown') || '[]') || []; } catch (e) { return []; }
}
function fcSave(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr.slice(0, 5000)));
}
function fcList() { return (typeof window !== 'undefined' && window.fcWords) ? window.fcWords : []; }
function fcCurrent() {
  var list = fcList();
  var i = (typeof window !== 'undefined' ? window.fcIdx : 0) || 0;
  if (!list.length) return null;
  if (i >= list.length) i = list.length - 1;
  if (i < 0) i = 0;
  return list[i];
}

/* ------------------------------ Ko'rinish -------------------------------- */
function fcInfoHtml() {
  var list = fcList();
  var d = dictWords();
  var favs = fcFavs().length;
  var known = fcKnown().length;
  var w = fcCurrent();
  return '<div class="rdmeta" style="justify-content:flex-start">' +
    '<span><i class="fa-solid fa-book"></i> Ro‘yxatda: <b>' + list.length + '</b> so‘z</span>' +
    (d.length ? '<span>· Lug‘at: <b>' + d.length + '</b> so‘z</span>' : '') +
    '<span>· ⭐ ' + favs + '</span>' +
    '<span>· ✅ ' + known + '</span>' +
    (w ? '<span style="margin-left:auto;color:var(--tx2)">' + esc(w.en) + '</span>' : '') +
    '</div>';
}
function fcControlsHtml() {
  return '<div class="cd" style="cursor:default;margin-bottom:12px">' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<button class="btn bp bs" onclick="fcShuffle()"><i class="fa-solid fa-shuffle"></i> Aralashtirish</button>' +
      '<button class="btn bo bs" onclick="fcRandom()"><i class="fa-solid fa-dice"></i> Tasodifiy so‘z</button>' +
      '<button class="btn bo bs" id="fcFavBtn" onclick="fcFavToggle()"><i class="fa-solid fa-star"></i> Sevimlilarga</button>' +
      '<button class="btn bo bs" onclick="fcFavMode()"><i class="fa-solid fa-star-half-stroke"></i> Sevimlilar (' + fcFavs().length + ')</button>' +
      '<button class="btn bo bs" id="fcKnownBtn" onclick="fcKnownToggle()"><i class="fa-solid fa-check"></i> O‘rgandim</button>' +
      '<button class="btn bo bs" onclick="fcKnownMode()"><i class="fa-solid fa-brain"></i> O‘rganilganlar (' + fcKnown().length + ')</button>' +
      '<button class="btn bo bs" onclick="fcAllMode()"><i class="fa-solid fa-layer-group"></i> Butun lug‘at</button>' +
    '</div>' +
    '<input class="inp" id="fcFind" placeholder="Shu ro‘yxatdan qidirish (so‘z yoki tarjima)..." style="margin-top:10px" oninput="fcFindNow()">' +
    '<div id="fcInfo" style="margin-top:8px"></div>' +
    '</div>';
}
function fcRefresh() {
  var info = document.getElementById('fcInfo');
  if (info) info.innerHTML = fcInfoHtml();
  var fav = document.getElementById('fcFavBtn');
  var w = fcCurrent();
  var isFav = w && fcFavs().indexOf(w.en) > -1;
  var isKnown = w && fcKnown().indexOf(w.en) > -1;
  if (fav) fav.className = 'btn bs ' + (isFav ? 'bp' : 'bo');
  var kn = document.getElementById('fcKnownBtn');
  if (kn) kn.className = 'btn bs ' + (isKnown ? 'bp' : 'bo');
}

/* ------------------------------- Amallar --------------------------------- */
function fcSetList(list, label) {
  window.fcWords = list;
  window.fcIdx = 0;
  if (typeof fCard === 'function') fCard();
  if (label && typeof voiceToast === 'function') voiceToast('📚 ' + label + ': ' + list.length + ' so‘z');
  fcRefresh();
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
  if (typeof fCard === 'function') fCard();
  fcRefresh();
}
function fcRandom() {
  var list = fcList();
  if (!list.length) return;
  window.fcIdx = Math.floor(Math.random() * list.length);
  if (typeof fCard === 'function') fCard();
  if (typeof speakWord === 'function') speakWord(list[window.fcIdx].en);
  fcRefresh();
}
function fcFavToggle() {
  var w = fcCurrent();
  if (!w) return;
  var favs = fcFavs();
  var i = favs.indexOf(w.en);
  if (i > -1) favs.splice(i, 1); else favs.push(w.en);
  fcSave('favWords', favs);
  var btn = document.getElementById('fcFavBtn');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-star"></i> Sevimlilar (' + favs.length + ')';
  fcRefresh();
}
function fcKnownToggle() {
  var w = fcCurrent();
  if (!w) return;
  var known = fcKnown();
  var i = known.indexOf(w.en);
  if (i > -1) known.splice(i, 1); else known.push(w.en);
  fcSave('fcKnown', known);
  if (i === -1 && typeof addXP === 'function') addXP(2);
  fcRefresh();
}
function fcFavMode() {
  var favs = fcFavs();
  var all = fcAppWords();
  var list = all.filter(function (w) { return favs.indexOf(w.en) > -1; });
  fcSetList(list, '⭐ Sevimlilar');
}
function fcKnownMode() {
  var known = fcKnown();
  var all = fcAppWords();
  var list = all.filter(function (w) { return known.indexOf(w.en) > -1; });
  fcSetList(list, '🧠 O‘rganilganlar');
}
function fcAllMode() {
  fcSetList(fcAppWords(), '📚 Butun lug‘at');
}
function fcFindNow() {
  var inp = document.getElementById('fcFind');
  if (!inp) return;
  var q = String(inp.value || '').trim().toLowerCase();
  var base = (fcFindNow.__base && fcFindNow.__base.length) ? fcFindNow.__base : null;
  if (!base) { fcFindNow.__base = fcList().slice(); base = fcFindNow.__base; }
  if (!q) { window.fcWords = base.slice(); window.fcIdx = 0; if (typeof fCard === 'function') fCard(); fcRefresh(); return; }
  var res = base.filter(function (w) {
    return w.en.toLowerCase().indexOf(q) > -1 || String(w.uz).toLowerCase().indexOf(q) > -1;
  });
  window.fcWords = res;
  window.fcIdx = 0;
  if (typeof fCard === 'function') fCard();
  fcRefresh();
}

/* ----------------------------- Sahifaga joylash --------------------------- */
function fcInstall() {
  if (typeof document === 'undefined') return;
  /* 1) katta lug'atni app.js ga ulaymiz: "Umumiy so'zlar" va qidiruv 10k so'z bilan ishlaydi */
  if (typeof window.buildAllWords === 'function' && !window.buildAllWords.__dictHooked) {
    var original = window.buildAllWords;
    var patched = function () {
      var all = fcAppWords();
      return all.length ? all : original();
    };
    patched.__dictHooked = true;
    window.buildAllWords = patched;
  }
  /* 2) kartadan keyin boshqaruv panelini qo'shamiz */
  var card = document.getElementById('fcCard');
  var tabs = document.getElementById('ft');
  if (tabs && !document.getElementById('fcCtl')) {
    tabs.insertAdjacentHTML('afterend', '<div id="fcCtl" style="margin:12px 0">' + fcControlsHtml() + '</div>');
  } else if (card && !document.getElementById('fcCtl')) {
    card.insertAdjacentHTML('beforebegin', '<div id="fcCtl" style="margin:12px 0">' + fcControlsHtml() + '</div>');
  }
  /* 3) setFS (app.js) ishga tushganda ma'lumotni yangilaymiz */
  if (typeof window.setFS === 'function' && !window.setFS.__infoHooked) {
    var origSet = window.setFS;
    var setWrap = function (mode, btn) {
      fcFindNow.__base = null;
      var inp = document.getElementById('fcFind');
      if (inp) inp.value = '';
      origSet(mode, btn);
      fcRefresh();
    };
    setWrap.__infoHooked = true;
    window.setFS = setWrap;
  }
  if (typeof window.fCard === 'function' && !window.fCard.__infoHooked) {
    var origCard = window.fCard;
    var cardWrap = function () {
      origCard();
      fcRefresh();
    };
    cardWrap.__infoHooked = true;
    window.fCard = cardWrap;
  }
  fcRefresh();
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
}

if (typeof window !== 'undefined') {
  window.dictWords = dictWords;
  window.fcShuffle = fcShuffle;
  window.fcRandom = fcRandom;
  window.fcFavToggle = fcFavToggle;
  window.fcKnownToggle = fcKnownToggle;
  window.fcFavMode = fcFavMode;
  window.fcKnownMode = fcKnownMode;
  window.fcAllMode = fcAllMode;
  window.fcFindNow = fcFindNow;
  window.fcRefresh = fcRefresh;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fcInstall);
    else fcInstall();
    document.addEventListener('keydown', fcKeys);
  }
}
