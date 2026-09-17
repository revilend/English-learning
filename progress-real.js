/* ==========================================================================
   English Zero-to-Hero — Reyting (faqat HAQIQIY ma'lumot)
   Ilgari bu joyda o'ylab topilgan ismlar (Aziza, Bekzod...) turardi. Endi:
     1) Sizning haqiqiy statistikangiz (XP, darslar, seriya, o'qilgan matn,
        o'rganilgan so'zlar, topshirilgan imtihonlar)
     2) Daraja zinapoyasi — o'z natijangiz nisbatan (o'ylab topilgan raqamlar yo'q)
     3) "Guruh" — o'qituvchi/o'quvchi o'z guruhining HAQIQIY natijalarini
        o'zi kiritadi (shu qurilmada saqlanadi) va siz bilan solishtiriladi.
   Sayt statik (server yo'q), shuning uchun boshqa foydalanuvchilarning
   natijalari avtomatik kelmaydi — o'ylab topilgan ism qo'shmaymiz.
   ========================================================================== */

function lbNum(key, def) {
  try {
    var v = parseInt(localStorage.getItem(key) || String(def || 0), 10);
    return isNaN(v) ? (def || 0) : v;
  } catch (e) { return def || 0; }
}
function lbReadingAnswered() {
  var n = 0;
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('reading_') === 0 && localStorage.getItem(k) === '1') n++;
    }
  } catch (e) {}
  return n;
}
function lbWordsLearned() {
  var n = 0;
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('vocab_') === 0) {
        var arr = JSON.parse(localStorage.getItem(k) || '[]');
        if (arr && arr.length) n += arr.length;
      }
    }
  } catch (e) {}
  return n;
}
function lbMocksPassed() {
  var n = 0;
  ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'CEFR'].forEach(function (lv) {
    try {
      var r = JSON.parse(localStorage.getItem('mockResult_' + lv) || 'null');
      if (r && r.passed) n++;
    } catch (e) {}
  });
  return n;
}
function lbMyStats() {
  var xp = lbNum('xp', 0);
  var lessons = (typeof getCompleted === 'function') ? getCompleted().length : 0;
  return {
    name: 'Siz',
    xp: xp,
    lessons: lessons,
    streak: lbNum('streak', 0),
    level: (typeof levelFor === 'function') ? levelFor(xp) : 'A0',
    me: true
  };
}
var LB_LADDER = [
  { lv: 'A0', xp: 100, lessons: 3, ds: 'Salomlashish, raqamlar, oila' },
  { lv: 'A1', xp: 300, lessons: 11, ds: 'Kundalik harakatlar, taom, sayohat' },
  { lv: 'A2', xp: 600, lessons: 21, ds: 'O‘tgan zamon, Present Perfect, taqqoslash' },
  { lv: 'B1', xp: 1000, lessons: 31, ds: 'Modal fe’llar, passiv, shart gaplar' },
  { lv: 'B2', xp: 1500, lessons: 41, ds: 'Frazal fe’llar, biznes, ilmiy matnlar' },
  { lv: 'C1', xp: 2200, lessons: 50, ds: 'Inversiya, akademik uslub, global mavzular' }
];
function lbLadderHtml() {
  var s = lbMyStats();
  return '<div class="cd" style="cursor:default;grid-column:1/-1">' +
    '<b style="display:block;margin-bottom:8px">🪜 Daraja zinapoyasi (o‘z natijangiz)</b>' +
    LB_LADDER.map(function (r) {
      var ok = s.xp >= r.xp && s.lessons >= r.lessons;
      var here = !ok && s.lessons >= (LB_LADDER[LB_LADDER.indexOf(r) - 1] ? LB_LADDER[LB_LADDER.indexOf(r) - 1].lessons : 0);
      return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(30,41,59,.5)">' +
        '<span class="bg ' + badgeClass(r.lv) + '">' + r.lv + '</span>' +
        '<span style="flex:1;min-width:0;font-size:.83rem">' + r.ds +
          '<span style="display:block;color:var(--tx2);font-size:.75rem">' + r.lessons + ' dars · ' + r.xp + ' XP</span></span>' +
        (ok ? '<span style="color:var(--ok);font-weight:700;font-size:.8rem">✅</span>'
            : (here ? '<span style="color:var(--acc);font-weight:700;font-size:.8rem">▶ hozir</span>'
                    : '<span style="color:var(--tx2);font-size:.78rem">' + r.lessons + ' dars</span>')) +
        '</div>';
    }).join('') +
    '<div style="margin-top:8px;color:var(--tx2);font-size:.78rem">Bu bosqichlar — kurs ichidagi yo‘l xaritasi (rasmiy CEFR sertifikati emas).</div>' +
    '</div>';
}
function lbGroup() {
  try { return JSON.parse(localStorage.getItem('lbGroup') || '[]') || []; } catch (e) { return []; }
}
function lbAddFromForm() {
  var n = document.getElementById('lbName');
  var x = document.getElementById('lbXp');
  var l = document.getElementById('lbLessons');
  var name = n ? String(n.value).trim() : '';
  if (!name) { if (typeof voiceToast === 'function') voiceToast('Ism kiriting.'); return; }
  var xp = parseInt((x && x.value) || '0', 10); if (isNaN(xp) || xp < 0) xp = 0;
  var lessons = parseInt((l && l.value) || '0', 10); if (isNaN(lessons) || lessons < 0) lessons = 0;
  if (lessons > 50) lessons = 50;
  var g = lbGroup();
  g.push({ name: name, xp: xp, lessons: lessons });
  localStorage.setItem('lbGroup', JSON.stringify(g));
  if (n) n.value = ''; if (x) x.value = ''; if (l) l.value = '';
  renderLeaderboard();
}
function lbRemove(i) {
  var g = lbGroup();
  g.splice(i, 1);
  localStorage.setItem('lbGroup', JSON.stringify(g));
  renderLeaderboard();
}
function lbClearGroup() {
  localStorage.removeItem('lbGroup');
  renderLeaderboard();
}
function renderLeaderboard() {
  var box = document.getElementById('lb');
  if (!box) return;
  var me = lbMyStats();
  var group = lbGroup().map(function (g, i) {
    return { name: g.name, xp: g.xp || 0, lessons: g.lessons || 0, idx: i };
  });
  var rows = group.concat([me]).sort(function (a, b) {
    return (b.xp - a.xp) || (b.lessons - a.lessons) || (a.me ? 1 : -1);
  });
  var myRank = rows.map(function (r) { return r.me ? 1 : 0; }).indexOf(1) + 1;

  var head =
    '<div class="cd" style="cursor:default;grid-column:1/-1">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px">' +
        '<b>📊 Sizning natijangiz</b>' +
        '<span class="bg ' + badgeClass(me.level) + '">' + me.level + '</span>' +
        (group.length ? '<span style="margin-left:auto;color:var(--tx2);font-size:.78rem">Guruhda o‘rningiz: #' + myRank + '/' + rows.length + '</span>' : '') +
      '</div>' +
      '<div class="vl" style="margin:0">' +
        '<div class="vi" style="cursor:default"><b>' + me.xp + ' XP</b><span>Umumiy ball</span></div>' +
        '<div class="vi" style="cursor:default"><b>' + me.lessons + '/50</b><span>Tugatilgan darslar</span></div>' +
        '<div class="vi" style="cursor:default"><b>' + me.streak + ' kun</b><span>Ketma-ket kunlar</span></div>' +
        '<div class="vi" style="cursor:default"><b>' + lbReadingAnswered() + '</b><span>To‘g‘ri reading javobi</span></div>' +
        '<div class="vi" style="cursor:default"><b>' + lbWordsLearned() + '</b><span>Belgilangan so‘zlar</span></div>' +
        '<div class="vi" style="cursor:default"><b>' + lbMocksPassed() + '</b><span>O‘tilgan imtihonlar</span></div>' +
      '</div></div>';

  var groupHtml =
    '<div class="cd" style="cursor:default;grid-column:1/-1">' +
      '<b style="display:block;margin-bottom:6px">👥 Guruh reytingi (haqiqiy natijalar)</b>' +
      '<div style="color:var(--tx2);font-size:.78rem;margin-bottom:10px">' +
        'Sayt serverga ulanmaydi, shuning uchun boshqa foydalanuvchilar avtomatik kelmaydi. ' +
        'Guruhingiz a’zolarining natijasini o‘zingiz kiritsangiz — ro‘yxat haqiqiy bo‘ladi.' +
      '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">' +
        '<input class="inp" id="lbName" placeholder="Ism" style="flex:2;min-width:120px">' +
        '<input class="inp" id="lbXp" type="number" min="0" placeholder="XP" style="flex:1;min-width:80px">' +
        '<input class="inp" id="lbLessons" type="number" min="0" max="50" placeholder="Darslar" style="flex:1;min-width:90px">' +
        '<button class="btn bp bs" onclick="lbAddFromForm()"><i class="fa-solid fa-user-plus"></i> Qo‘shish</button>' +
        (group.length ? '<button class="btn bo bs" onclick="lbClearGroup()"><i class="fa-solid fa-trash"></i> Tozalash</button>' : '') +
      '</div>' +
      '<div class="vl" style="margin:0">' + rows.map(function (r) {
        var pos = rows.indexOf(r) + 1;
        var medal = ['🥇', '🥈', '🥉'][pos - 1] || ('#' + pos);
        return '<div class="vi" style="cursor:default;' + (r.me ? 'border-color:var(--pri);background:rgba(99,102,241,.1)' : '') + '">' +
          '<div style="display:flex;align-items:flex-start;gap:6px">' +
            '<div style="flex:1;min-width:0">' +
              '<b>' + medal + ' ' + esc(r.name) + (r.me ? ' (siz)' : '') + '</b>' +
              '<span>' + r.xp + ' XP · ' + r.lessons + '/50 dars</span>' +
            '</div>' +
            (r.me ? '' : '<button class="btn bo bs" style="padding:4px 8px" onclick="lbRemove(' + r.idx + ')" title="O‘chirish">✕</button>') +
          '</div></div>';
      }).join('') + '</div>' +
      (group.length ? '' : '<div style="color:var(--tx2);font-size:.8rem;margin-top:8px">Hozircha faqat sizning natijangiz bor.</div>') +
    '</div>';

  box.innerHTML = head + groupHtml + lbLadderHtml();
}

if (typeof window !== 'undefined') {
  window.renderLeaderboard = renderLeaderboard;
  window.lbAddFromForm = lbAddFromForm;
  window.lbRemove = lbRemove;
  window.lbClearGroup = lbClearGroup;
}
