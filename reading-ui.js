/* ==========================================================================
   English Zero-to-Hero — Dars sahifasidagi Reading bo'limi
   READING_BANK (reading-a/b/c.js) asosida har darsda bir nechta savol ko'rsatiladi.
   Daraja oshgani sari matn uzunroq va savol ko'proq bo'ladi:
     A0 → ~75 so'z / 2 savol      A1 → ~115 so'z / 3 savol
     A2 → ~175 so'z / 3 savol     B1 → ~240 so'z / 4 savol
     B2 → ~250 so'z / 4 savol     C1 → ~320 so'z / 5 savol

   app.js o'z joyida qoladi: u dars sahifasini chizib bo'lgach, shu modul eski
   bir savolli "Reading" blokini bankka asoslangan blok bilan almashtiradi va
   oldin to'g'ri javob berilgan savollarni tiklaydi.
   ========================================================================== */

function readingBankOf(id) {
  try {
    if (typeof READING_BANK === 'undefined' || !READING_BANK) return null;
    return READING_BANK[id] || null;
  } catch (e) { return null; }
}
function readingLessonOf(id) {
  try {
    if (typeof L === 'undefined' || !L) return null;
    return L.filter(function (x) { return x.id === id; })[0] || null;
  } catch (e) { return null; }
}
function readingPlainText(bank) {
  return String((bank && bank.t) || '').replace(/\s+/g, ' ').trim();
}
function readingWordCount(bank) {
  var t = readingPlainText(bank);
  return t ? t.split(' ').length : 0;
}
function readingDoneOf(id) {
  var bank = readingBankOf(id);
  if (!bank) return 0;
  var n = 0;
  bank.qs.forEach(function (q, k) {
    if (localStorage.getItem('reading_' + id + '_' + k) === '1') n++;
  });
  return n;
}
function readingProgressText(id) {
  var bank = readingBankOf(id);
  if (!bank) return '';
  var n = readingDoneOf(id);
  return '✅ To‘g‘ri javob: <b>' + n + '/' + bank.qs.length + '</b> savol' +
    (n === bank.qs.length ? ' — matn to‘liq o‘zlashtirildi! 🎉' : '');
}

/* Eski (bir savolli) blok o'rniga qo'yiladigan HTML */
function readingSectionHtml(id) {
  var bank = readingBankOf(id);
  if (!bank) return '';
  var l = readingLessonOf(id);
  var lv = (l && l.lv) || '';
  var badge = (typeof badgeClass === 'function') ? badgeClass(lv) : 'b-a1';
  var paras = String(bank.t || '').split('\n').map(function (p) { return p.trim(); }).filter(Boolean);
  return '<div class="rdmeta">' +
      (lv ? '<span class="bg ' + badge + '">' + lv + '</span>' : '') +
      '<span><i class="fa-solid fa-file-lines"></i> ' + readingWordCount(bank) + ' so‘z</span>' +
      '<span><i class="fa-solid fa-circle-question"></i> ' + bank.qs.length + ' savol</span>' +
      '<button class="btn bo bs" onclick="readingSpeak(' + id + ')"><i class="fa-solid fa-volume-high"></i> Matnni eshitish</button>' +
      '<button class="btn bo bs" onclick="voiceStop()"><i class="fa-solid fa-stop"></i> To‘xtatish</button>' +
    '</div>' +
    '<div class="gt readbox" id="rdText">' + paras.join('<br><br>') + '</div>' +
    bank.qs.map(function (q, k) {
      return '<div class="cd" style="cursor:default">' +
        '<p style="font-weight:600;margin-bottom:10px">' + (k + 1) + '. ' + q.q + '</p>' +
        '<div class="qos" id="rdq-' + id + '-' + k + '">' + q.o.map(function (o, i) {
          return '<div class="qo" id="rdo-' + id + '-' + k + '-' + i + '" ' +
            'onclick="readingAnswer(' + id + ',' + k + ',' + i + ')">' +
            String.fromCharCode(65 + i) + '. ' + o + '</div>';
        }).join('') + '</div>' +
        '<div class="rdfb" id="rdf-' + id + '-' + k + '"></div>' +
      '</div>';
    }).join('') +
    '<div class="cd" style="cursor:default">' +
      '<div id="rdProg-' + id + '" style="font-size:.88rem">' + readingProgressText(id) + '</div>' +
      '<div style="margin-top:10px">' +
        '<button class="btn bo bs" onclick="readingReset(' + id + ')">' +
          '<i class="fa-solid fa-rotate-left"></i> Savollarni qayta boshlash</button>' +
      '</div>' +
    '</div>';
}

/* Savol variantlarini belgilash */
function readingPaint(id, qi, picked) {
  var bank = readingBankOf(id);
  if (!bank || !bank.qs[qi]) return;
  var q = bank.qs[qi];
  var wrap = document.getElementById('rdq-' + id + '-' + qi);
  if (!wrap) return;
  Array.prototype.forEach.call(wrap.children, function (c, i) {
    c.classList.add('ds');
    if (i === q.c) c.classList.add('ok');
  });
  if (picked != null && picked !== q.c) {
    var el = document.getElementById('rdo-' + id + '-' + qi + '-' + picked);
    if (el) el.classList.add('no');
  }
}

function readingAnswer(id, qi, oi) {
  var bank = readingBankOf(id);
  if (!bank || !bank.qs[qi]) return;
  var q = bank.qs[qi];
  if (localStorage.getItem('reading_' + id + '_' + qi) === '1') return; /* allaqachon to'g'ri */
  var fb = document.getElementById('rdf-' + id + '-' + qi);
  var correct = oi === q.c;
  readingPaint(id, qi, oi);
  if (correct) {
    localStorage.setItem('reading_' + id + '_' + qi, '1');
    if (fb) fb.innerHTML = '<span style="color:var(--ok);font-weight:700">✅ To‘g‘ri! +5 XP</span>';
    if (typeof addXP === 'function') addXP(5);
    if (typeof markSkill === 'function') markSkill(id, 'reading');
  } else if (fb) {
    fb.innerHTML = '<span style="color:var(--err);font-weight:700">❌ Xato.</span> ' +
      '<span style="color:var(--tx2)">To‘g‘ri javob yashil rangda. Matnni qayta o‘qib, yana urinib ko‘ring.</span>';
  }
  var prog = document.getElementById('rdProg-' + id);
  if (prog) prog.innerHTML = readingProgressText(id);
}

/* Oldin to'g'ri javob berilgan savollarni tiklash */
function readingRestore(id) {
  var bank = readingBankOf(id);
  if (!bank) return;
  bank.qs.forEach(function (q, k) {
    if (localStorage.getItem('reading_' + id + '_' + k) !== '1') return;
    readingPaint(id, k, null);
    var fb = document.getElementById('rdf-' + id + '-' + k);
    if (fb) fb.innerHTML = '<span style="color:var(--ok);font-weight:700">✅ To‘g‘ri javob berilgan.</span>';
  });
  var prog = document.getElementById('rdProg-' + id);
  if (prog) prog.innerHTML = readingProgressText(id);
}

function readingReset(id) {
  var bank = readingBankOf(id);
  if (!bank) return;
  bank.qs.forEach(function (q, k) { localStorage.removeItem('reading_' + id + '_' + k); });
  var box = document.getElementById('lc');
  if (box && typeof window.renderLessonDetail === 'function') window.renderLessonDetail(id);
}

/* Butun matnni ovoz chiqarib o'qish */
function readingSpeak(id) {
  var bank = readingBankOf(id);
  if (!bank) return;
  if (typeof speakWord === 'function') speakWord(readingPlainText(bank));
}

/* Eski bir savolli blokni almashtirish */
function readingMount(id) {
  var box = document.getElementById('lc');
  if (!box || !readingBankOf(id)) return;
  var heads = box.querySelectorAll('.st2');
  var head = null, i;
  for (i = 0; i < heads.length; i++) {
    if (heads[i].textContent.indexOf('Reading') > -1) { head = heads[i]; break; }
  }
  if (!head) return;
  var next = head.nextElementSibling, old = [];
  while (next && !(next.classList && next.classList.contains('st2'))) {
    old.push(next);
    next = next.nextElementSibling;
  }
  if (!old.length) return; /* kutilgan blok topilmadi — hech narsani buzmaymiz */
  old.forEach(function (n) { n.parentNode.removeChild(n); });
  head.insertAdjacentHTML('afterend', readingSectionHtml(id));
  readingRestore(id);
}

/* app.js dars sahifasini chizgach ishga tushadigan qism */
function readingHook() {
  if (typeof window === 'undefined') return;
  if (typeof window.renderLessonDetail !== 'function') return;
  if (window.renderLessonDetail.__readingHooked) return;
  var original = window.renderLessonDetail;
  var patched = function (id) {
    original(id);
    try { readingMount(id); } catch (e) { console.warn('[reading]', e); }
  };
  patched.__readingHooked = true;
  window.renderLessonDetail = patched;
  window.readingAnswer = readingAnswer;
  window.readingReset = readingReset;
  window.readingSpeak = readingSpeak;
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', readingHook);
else readingHook();
