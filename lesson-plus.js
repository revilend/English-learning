/* ==========================================================================
   English Zero-to-Hero — Dars sahifasi qo'shimchalari
   1) MASHQ NAZORATI: darsni "tugatish" uchun 4 ta mashq bajarilishi shart.
        📖 Reading   — reading bank savollarining HAMMASI to'g'ri
        🎧 Listening — diktant to'g'ri yozilgan
        ✍️ Writing   — tarjima tekshirilgan (o'xshashlik ≥ 70%)
        🗣 Speaking  — namuna aytilgan yoki to'g'ri yozilgan (≥ 60%)
      Hammasi bajarilmaguncha "Darsni tugatish" tugmasi ishlamaydi va
      keyingi darsga o'tish tugmasi chiqmaydi ("oddiy bosib o'tib ketish" yo'q).
   2) QO'SHIMCHA SO'ZLAR: har darsga 10 000+ so'zli lug'atdan o'sha darajaga
      mos 12 ta qo'shimcha so'z (chastota bo'yicha) qo'shiladi.

   app.js o'z joyida qoladi: bu modul uning renderLessonDetail funksiyasini
   o'rab oladi (wrapper) va sahifa chizilgach qo'shimchalarni joylashtiradi.
   ========================================================================== */

/* ----------------------------- Mashq holati ------------------------------ */
function gateBankOf(id) {
  return (typeof readingBankOf === 'function') ? readingBankOf(id) : null;
}
function gateFlag(id, skill) {
  try { return localStorage.getItem('skill_' + id + '_' + skill) === '1'; } catch (e) { return false; }
}
function gateReading(id) {
  var bank = gateBankOf(id);
  if (!bank) return { done: gateFlag(id, 'reading'), ok: gateFlag(id, 'reading'), have: 0, need: 0 };
  var have = 0;
  bank.qs.forEach(function (q, k) {
    if (localStorage.getItem('reading_' + id + '_' + k) === '1') have++;
  });
  return { done: have === bank.qs.length, ok: have === bank.qs.length, have: have, need: bank.qs.length };
}
function gateState(id) {
  var r = gateReading(id);
  var listen = gateFlag(id, 'listening');
  var write = gateFlag(id, 'writing');
  var speak = gateFlag(id, 'speaking');
  return {
    id: id,
    reading: r, listening: listen, writing: write, speaking: speak,
    done: (r.done ? 1 : 0) + (listen ? 1 : 0) + (write ? 1 : 0) + (speak ? 1 : 0),
    total: 4,
    ready: r.done && listen && write && speak
  };
}
function gateReady(id) { return gateState(id).ready; }

/* Writing mashqi: app.js faqat "tekshirildi" belgisini qo'yadi — biz
   natijadagi o'xshashlikni ham tekshiramiz (≥ 70% bo'lmasa belgi o'chadi). */
function gateHookWriting() {
  if (typeof window.checkWriting !== 'function' || window.checkWriting.__gated) return;
  var original = window.checkWriting;
  var patched = function (id) {
    original(id);
    try {
      var box = document.getElementById('wresult');
      var m = box ? String(box.innerHTML).match(/(\d+)%/) : null;
      var pct = m ? parseInt(m[1], 10) : 0;
      if (pct < 70) localStorage.removeItem('skill_' + id + '_writing');
    } catch (e) {}
  };
  patched.__gated = true;
  window.checkWriting = patched;
}

/* ------------------------------ Ko'rinish -------------------------------- */
function gateRow(ic, name, ok, hint) {
  return '<div class="vi" style="cursor:default;' + (ok ? 'border-color:rgba(16,185,129,.45)' : '') + '">' +
    '<b>' + ic + ' ' + name + '</b>' +
    '<span>' + (ok ? '✅ bajarildi' : '⏳ ' + hint) + '</span></div>';
}
function gateChecklistHtml(id) {
  var st = gateState(id);
  var done = (typeof getCompleted === 'function') && getCompleted().indexOf(id) > -1;
  if (done) {
    return '<div class="gt" style="border-color:rgba(16,185,129,.35)">' +
      '✅ <b>Bu dars tugatilgan.</b> Keyingi darsga o‘tishingiz mumkin.' +
      '<div style="margin-top:8px;font-size:.82rem;color:var(--tx2)">Mashqlarni takrorlab, bilimni mustahkamlash foydali.</div></div>';
  }
  var r = st.reading;
  return '<div class="cd" style="cursor:default;margin-top:18px">' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px">' +
        '<b>🎯 Darsni tugatish shartlari</b>' +
        '<span class="bg ' + (st.ready ? 'b-a1' : 'b-a0') + '" id="gateBadge">' + st.done + '/' + st.total + '</span>' +
        '<span style="margin-left:auto;color:var(--tx2);font-size:.78rem">' +
          (st.ready ? 'Hammasi bajarildi — tugatishingiz mumkin' : 'Quyidagi mashqlarni bajaring') + '</span>' +
      '</div>' +
      '<div class="vl">' +
        gateRow('📖', 'Reading', r.done, 'barcha savollarga to‘g‘ri javob: ' + r.have + '/' + r.need) +
        gateRow('🎧', 'Listening', st.listening, 'diktantni to‘g‘ri yozing') +
        gateRow('✍️', 'Writing', st.writing, 'tarjimani yozib tekshiring (70%+)') +
        gateRow('🗣', 'Speaking', st.speaking, 'namunani ayting yoki yozing (60%+)') +
      '</div></div>';
}
function gateRefresh(id) {
  if (!id) return;
  var wrap = document.getElementById('gateWrap');
  if (wrap) wrap.innerHTML = gateChecklistHtml(id);
  var st = gateState(id);
  var btn = document.querySelector('#lc button[onclick^="completeLesson"]');
  if (btn) {
    btn.disabled = !st.ready;
    btn.innerHTML = st.ready
      ? '<i class="fa-solid fa-check-double"></i> Darsni tugatish (+15 XP)'
      : '<i class="fa-solid fa-lock"></i> Avval mashqlarni tugating (' + st.done + '/' + st.total + ')';
  }
}
function gateMissingText(id) {
  var st = gateState(id);
  var miss = [];
  if (!st.reading.done) miss.push('📖 Reading (' + st.reading.have + '/' + st.reading.need + ')');
  if (!st.listening) miss.push('🎧 Listening');
  if (!st.writing) miss.push('✍️ Writing');
  if (!st.speaking) miss.push('🗣 Speaking');
  return miss.join(', ');
}

/* ------------------------- Qo'shimcha so'zlar --------------------------- */
var VOCAB_BANDS = {
  A0: [0.00, 0.12], A1: [0.12, 0.24], A2: [0.24, 0.36],
  B1: [0.36, 0.52], B2: [0.52, 0.74], C1: [0.74, 1.00]
};
var VOCAB_PER_LESSON = 12;
/* Yordamchi so'zlar (grammatika darslarida o'rganiladi) — qo'shimcha so'zlar
   ro'yxatiga qo'shmaymiz, shunda faqat ma'noli so'zlar chiqadi. */
var VOCAB_STOP = {
  the: 1, of: 1, and: 1, to: 1, a: 1, in: 1, for: 1, on: 1, that: 1, by: 1, this: 1, with: 1,
  you: 1, it: 1, not: 1, or: 1, be: 1, are: 1, is: 1, was: 1, were: 1, from: 1, at: 1, as: 1,
  your: 1, all: 1, have: 1, has: 1, had: 1, an: 1, we: 1, they: 1, he: 1, she: 1, i: 1, me: 1,
  my: 1, our: 1, their: 1, his: 1, her: 1, its: 1, will: 1, would: 1, can: 1, could: 1,
  should: 1, may: 1, might: 1, must: 1, do: 1, does: 1, did: 1, no: 1, yes: 1, if: 1, so: 1,
  but: 1, than: 1, then: 1, there: 1, here: 1, what: 1, which: 1, who: 1, when: 1, where: 1,
  why: 1, how: 1, also: 1, more: 1, most: 1, some: 1, any: 1, other: 1, such: 1, only: 1,
  just: 1, very: 1, too: 1, up: 1, out: 1, about: 1, into: 1, over: 1, after: 1, before: 1,
  between: 1, under: 1, again: 1, off: 1, down: 1, own: 1, same: 1, each: 1, other: 1
};
function vocabSkel(s) {
  return String(s).toLowerCase().replace(/[^a-z]/g, '').replace(/[aeiou]/g, '');
}
function vocabLev(a, b) {
  if (a === b) return 0;
  if (!a.length || !b.length) return a.length + b.length;
  var prev = [], i, j, cur = [];
  for (j = 0; j <= b.length; j++) prev[j] = j;
  for (i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur.slice();
  }
  return prev[b.length];
}
/* So'z mashq qilishga yaroqlimi? (qisqartma, atoqli ot, tarjimasiz so'zlar tashlanadi) */
function vocabGood(w) {
  var en = String(w.en || '').toLowerCase();
  var uz = String(w.uz || '').toLowerCase();
  if (!en || !uz) return false;
  if (en.length < 3 || en.length > 20) return false;
  if (!/[aeiou]/.test(en)) return false;
  if (VOCAB_STOP[en]) return false;
  if (en === uz) return false;                       /* tarjima qilinmagan */
  var a = vocabSkel(en), b = vocabSkel(uz);
  if (a.length >= 4 && b.length >= 4 && vocabLev(a, b) <= 1) return false; /* johnston|jonston */
  return true;
}

function vocabList() {
  if (typeof dictWords === 'function') {
    var all = dictWords();
    if (all && all.length) return all;
  }
  return [];
}
function vocabLessonOf(id) {
  try { return (typeof L !== 'undefined' && L) ? L.filter(function (x) { return x.id === id; })[0] : null; } catch (e) { return null; }
}
function vocabFor(id) {
  var l = vocabLessonOf(id);
  var all = vocabList();
  if (!l || !all.length) return [];
  var band = VOCAB_BANDS[l.lv] || VOCAB_BANDS.A1;
  var start = Math.floor(all.length * band[0]);
  var end = Math.floor(all.length * band[1]);
  var sameLevel = L.filter(function (x) { return x.lv === l.lv; });
  var idx = sameLevel.indexOf(l);
  if (idx < 0) idx = 0;
  var per = Math.floor((end - start) / Math.max(1, sameLevel.length));
  var from = start + idx * per;
  var out = [], i;
  for (i = from; i < end && out.length < VOCAB_PER_LESSON; i++) {
    if (vocabGood(all[i])) out.push(all[i]);
  }
  /* band oxirigacha yetmasa — o'sha darajaning boshidan to'ldiramiz */
  for (i = start; i < from && out.length < VOCAB_PER_LESSON; i++) {
    if (vocabGood(all[i])) out.push(all[i]);
  }
  return out;
}
function vocabLearned(id) {
  try { return JSON.parse(localStorage.getItem('vocab_' + id) || '[]') || []; } catch (e) { return []; }
}
function vocabToggle(id, word) {
  var list = vocabLearned(id);
  var i = list.indexOf(word);
  if (i > -1) list.splice(i, 1); else list.push(word);
  localStorage.setItem('vocab_' + id, JSON.stringify(list));
  vocabRefresh(id);
  if (i === -1 && typeof addXP === 'function') addXP(2);
}
function vocabRefresh(id) {
  var box = document.getElementById('vocabWrap');
  if (box) box.innerHTML = vocabHtml(id);
}
function vocabHtml(id) {
  var words = vocabFor(id);
  if (!words.length) return '';
  var learned = vocabLearned(id);
  var l = vocabLessonOf(id);
  return '<div class="st2">➕ Qo‘shimcha so‘zlar (' + ((l && l.lv) || '') + ' daraja lug‘atidan)</div>' +
    '<div style="color:var(--tx2);font-size:.8rem;margin-bottom:8px">10 000+ so‘zli chastota lug‘atidan shu darajaga mos so‘zlar. ' +
    'So‘zni bosib talaffuzini eshiting, ✅ bilan “o‘rgandim” deb belgilang. ' +
    'Belgilangan: <b>' + learned.length + '/' + words.length + '</b></div>' +
    '<div class="vl">' + words.map(function (w) {
      var ok = learned.indexOf(w.en) > -1;
      return '<div class="vi" style="cursor:default;' + (ok ? 'border-color:rgba(16,185,129,.45)' : '') + '">' +
        '<div style="display:flex;align-items:flex-start;gap:6px">' +
          '<div style="flex:1;min-width:0" onclick="speakWord(this.parentNode.dataset.w)" data-w="' + esc(w.en) + '">' +
            '<b>' + esc(w.en) + ' <i class="fa-solid fa-volume-high" style="font-size:.6rem"></i></b>' +
            '<span>' + esc(w.uz) + '</span>' +
          '</div>' +
          '<button class="btn bo bs" style="padding:4px 8px" onclick="vocabToggle(' + id + ',this.dataset.w)" data-w="' + esc(w.en) + '" title="O‘rgandim">' +
            (ok ? '✅' : '＋') + '</button>' +
        '</div></div>';
    }).join('') + '</div>';
}

/* --------------------------- Sahifaga joylash ---------------------------- */
function lessonPlusMount(id) {
  var box = document.getElementById('lc');
  if (!box) return;
  /* 1) shartlar ro'yxati (tugmalar qatoridan oldin) */
  var actions = null;
  var candidates = box.querySelectorAll('div');
  for (var i = 0; i < candidates.length; i++) {
    var c = candidates[i];
    if (!c.querySelector) continue;
    if (c.querySelector('button[onclick^="completeLesson"]')) { actions = c; break; }
  }
  if (actions && !document.getElementById('gateWrap')) {
    actions.insertAdjacentHTML('beforebegin', '<div id="gateWrap">' + gateChecklistHtml(id) + '</div>');
  }
  /* 2) qo'shimcha so'zlar ro'yxati (sahifa oxirida) */
  if (!document.getElementById('vocabWrap')) {
    box.insertAdjacentHTML('beforeend', '<div id="vocabWrap">' + vocabHtml(id) + '</div>');
  }
  gateRefresh(id);
}
function lessonPlusHook() {
  if (typeof window === 'undefined') return;
  gateHookWriting();
  if (typeof window.completeLesson === 'function' && !window.completeLesson.__plusGated) {
    var original = window.completeLesson;
    var patched = function (id) {
      if (!gateReady(id)) {
        var miss = gateMissingText(id);
        if (typeof voiceToast === 'function') {
          voiceToast('🔒 <b>Dars hali tugamadi.</b><br>Bajarilishi kerak: ' + miss);
        }
        gateRefresh(id);
        return;
      }
      original(id);
      if (typeof voiceToast === 'function') {
        voiceToast('✅ <b>Dars tugatildi!</b> Endi keyingi darsga o‘tishingiz mumkin.');
      }
    };
    patched.__plusGated = true;
    window.completeLesson = patched;
  }
  if (typeof window.renderLessonDetail === 'function' && !window.renderLessonDetail.__plusHooked) {
    var orig = window.renderLessonDetail;
    var wrap = function (id) {
      orig(id);
      try { lessonPlusMount(id); } catch (e) { console.warn('[lesson-plus]', e); }
    };
    wrap.__plusHooked = true;
    window.renderLessonDetail = wrap;
  }
  window.vocabToggle = vocabToggle;
  window.vocabFor = vocabFor;
  window.gateState = gateState;
  window.gateReady = gateReady;
}

/* Mashq bajarilgach ro'yxatni yangilab turamiz (bosishdan keyin) */
var gateTimer = null;
function lessonPlusWatch() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', function () {
    if (typeof activeLesson === 'undefined') return;
    if (gateTimer) clearTimeout(gateTimer);
    gateTimer = setTimeout(function () { gateRefresh(activeLesson); }, 260);
  });
  document.addEventListener('input', function (e) {
    if (!e || !e.target || e.target.id !== 'winput') return;
    if (gateTimer) clearTimeout(gateTimer);
    gateTimer = setTimeout(function () { gateRefresh(activeLesson); }, 500);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { lessonPlusHook(); lessonPlusWatch(); });
} else { lessonPlusHook(); lessonPlusWatch(); }
