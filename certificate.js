/* ==========================================================================
   English Zero-to-Hero — Sertifikat moduli
   Darslar tugatilgach sertifikat generatsiya qiladi (PNG yuklab olish / PDF).
   app.js ga bog'lanmagan holda ishlaydi.
   ========================================================================== */

var TOTAL_LESSONS = 50;

/* ---------- Progress ma'lumotlari ---------- */
function certCompleted() {
  try {
    var arr = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    return Array.isArray(arr) ? arr.length : 0;
  } catch (e) { return 0; }
}
function certXP() {
  return parseInt(localStorage.getItem('xp') || '0', 10) || 0;
}
function certLevelFromXP(xp) {
  if (xp >= 1500) return 'C1';
  if (xp >= 1000) return 'B2';
  if (xp >= 600) return 'B1';
  if (xp >= 300) return 'A2';
  if (xp >= 100) return 'A1';
  return 'A0';
}

/* Bosqichlar: nechta dars tugatilganiga qarab sertifikat darajasi */
var CERT_TIERS = [
  { min: 50, level: 'C1', title: 'To‘liq kurs sertifikati', note: 'A0 dan C1 gacha barcha 50 dars tugatildi' },
  { min: 40, level: 'B2', title: 'Yuqori bosqich sertifikati', note: 'Kursning katta qismi muvaffaqiyatli tugatildi' },
  { min: 25, level: 'B1', title: 'O‘rta bosqich sertifikati', note: 'Kursning yarmidan ko‘pi tugatildi' },
  { min: 10, level: 'A2', title: 'Boshlang‘ich sertifikat', note: 'Kursning boshlang‘ich qismi tugatildi' }
];

function certStatus() {
  var done = certCompleted();
  var xp = certXP();
  var tier = null;
  for (var i = 0; i < CERT_TIERS.length; i++) {
    if (done >= CERT_TIERS[i].min) { tier = CERT_TIERS[i]; break; }
  }
  var next = null;
  for (var j = CERT_TIERS.length - 1; j >= 0; j--) {
    if (done < CERT_TIERS[j].min) { next = CERT_TIERS[j]; break; }
  }
  return {
    done: done,
    total: TOTAL_LESSONS,
    xp: xp,
    xpLevel: certLevelFromXP(xp),
    tier: tier,
    next: next,
    percent: Math.min(100, Math.round(done / TOTAL_LESSONS * 100))
  };
}

/* ---------- Yordamchi funksiyalar ---------- */
function certUserName() {
  return (localStorage.getItem('userName') || '').trim();
}
function certCode(name, level, date) {
  var s = (name + '|' + level + '|' + date + '|ezh').toLowerCase();
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  var a = (h >>> 0).toString(36).toUpperCase().slice(0, 4);
  var b = ((h * 2654435761) >>> 0).toString(36).toUpperCase().slice(0, 4);
  return 'EZH-' + new Date().getFullYear() + '-' + a + b;
}
function certDateStr() {
  var d = new Date();
  var months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

/* ---------- Sahifani tayyorlash ---------- */
function refreshCertHints() {
  var st = certStatus();
  var hint = document.getElementById('certHint');
  var bar = document.getElementById('certBar');
  if (bar) bar.style.width = st.percent + '%';
  if (hint) {
    if (st.tier) {
      hint.innerHTML = '✅ Siz <b>' + st.tier.level + '</b> darajasidagi sertifikatga loyiqsiz (' +
        st.done + '/' + TOTAL_LESSONS + ' dars). Sertifikat sahifasida yuklab oling.';
    } else {
      hint.innerHTML = '📈 Hozir: <b>' + st.done + '</b>/' + TOTAL_LESSONS + ' dars. Sertifikat uchun kamida ' +
        (st.next ? st.next.min : 10) + ' dars tugatish kerak. Yana <b>' +
        ((st.next ? st.next.min : 10) - st.done) + '</b> dars qoldi.';
    }
  }
}

function renderCertificatePage() {
  var st = certStatus();
  var info = document.getElementById('certInfo');
  var nameRow = document.getElementById('certNameRow');
  var actions = document.getElementById('certActions');
  if (!info) return;

  var savedName = certUserName();

  if (!st.tier) {
    info.innerHTML =
      '<div class="cd" style="cursor:default;text-align:center;padding:26px">' +
        '<div style="font-size:2.4rem;margin-bottom:8px">🔒</div>' +
        '<h3 style="margin-bottom:6px">Sertifikat hali yopiq</h3>' +
        '<p style="color:var(--tx2);margin-bottom:12px">Kamida <b>' + (st.next ? st.next.min : 10) +
          '</b> ta darsni tugatishingiz kerak. Hozir: <b>' + st.done + '/' + TOTAL_LESSONS + '</b>.</p>' +
        '<div class="prr" style="max-width:420px;margin:0 auto 14px"><div class="prf" style="width:' + st.percent + '%"></div></div>' +
        '<button class="btn bp" onclick="go(\'p1\')"><i class="fa-solid fa-book-open"></i> Darslarni davom ettirish</button>' +
      '</div>';
    if (nameRow) nameRow.style.display = 'none';
    if (actions) actions.style.display = 'none';
    return;
  }

  info.innerHTML =
    '<div class="cd" style="cursor:default">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px">' +
        '<span class="bg ' + ('b-' + st.tier.level.toLowerCase()) + '">' + st.tier.level + '</span>' +
        '<b>' + st.tier.title + '</b>' +
        '<span style="margin-left:auto;color:var(--tx2);font-size:.82rem">' + st.done + '/' + TOTAL_LESSONS + ' dars</span>' +
      '</div>' +
      '<p style="color:var(--tx2);font-size:.88rem">' + st.tier.note + '. XP: <b>' + st.xp + '</b> · Daraja (XP bo‘yicha): <b>' + st.xpLevel + '</b>.</p>' +
      '<div class="prr"><div class="prf" style="width:' + st.percent + '%"></div></div>' +
      (st.next ? '<p style="color:var(--tx2);font-size:.82rem;margin-top:6px">Keyingi bosqich: <b>' + st.next.level + '</b> (' + st.next.min + ' dars)</p>' : '') +
    '</div>';

  if (nameRow) nameRow.style.display = 'block';
  if (actions) actions.style.display = 'block';

  var nameInput = document.getElementById('certName');
  if (nameInput && savedName && !nameInput.value) nameInput.value = savedName;

  drawCertificate();
}

/* ---------- Canvas chizish ---------- */
var CERT_W = 1400, CERT_H = 990;

function certRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function certWrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';
  var lines = [];
  for (var i = 0; i < words.length; i++) {
    var test = line ? line + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  for (var k = 0; k < lines.length; k++) {
    ctx.fillText(lines[k], x, y + k * lineHeight);
  }
  return lines.length;
}

function drawCertificate() {
  var cv = document.getElementById('certCanvas');
  if (!cv || !cv.getContext) return;
  var st = certStatus();
  if (!st.tier) return;

  var nameInput = document.getElementById('certName');
  var name = ((nameInput && nameInput.value) || certUserName() || 'O‘quvchi').trim();
  var ctx = cv.getContext('2d');
  var W = CERT_W, H = CERT_H;

  ctx.clearRect(0, 0, W, H);

  /* fon */
  var bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(0.5, '#f7f8ff');
  bg.addColorStop(1, '#eef1ff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* tashqi gradient hoshiya */
  var border = ctx.createLinearGradient(0, 0, W, H);
  border.addColorStop(0, '#6366f1');
  border.addColorStop(0.5, '#a855f7');
  border.addColorStop(1, '#f59e0b');
  ctx.strokeStyle = border;
  ctx.lineWidth = 16;
  certRoundRect(ctx, 26, 26, W - 52, H - 52, 26);
  ctx.stroke();

  /* ichki nozik chiziq */
  ctx.strokeStyle = 'rgba(99,102,241,.35)';
  ctx.lineWidth = 2;
  certRoundRect(ctx, 52, 52, W - 104, H - 104, 18);
  ctx.stroke();

  ctx.textAlign = 'center';

  /* sarlavha bloki */
  ctx.fillStyle = '#6366f1';
  ctx.font = '600 22px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('E N G L I S H   Z E R O - T O - H E R O', W / 2, 132);

  var titleGrad = ctx.createLinearGradient(W / 2 - 260, 0, W / 2 + 260, 0);
  titleGrad.addColorStop(0, '#4f46e5');
  titleGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = titleGrad;
  ctx.font = '900 84px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('SERTIFIKAT', W / 2, 232);

  ctx.fillStyle = '#64748b';
  ctx.font = '400 24px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('kursni muvaffaqiyatli tamomlaganlik to‘g‘risida', W / 2, 276);

  /* nom */
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 20px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('Ushbu sertifikat', W / 2, 342);

  ctx.fillStyle = '#0f172a';
  ctx.font = '800 64px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText(name, W / 2, 412);

  /* nom ostidagi chiziq */
  var nameWidth = Math.min(760, Math.max(360, ctx.measureText(name).width + 80));
  var lg = ctx.createLinearGradient(W / 2 - nameWidth / 2, 0, W / 2 + nameWidth / 2, 0);
  lg.addColorStop(0, 'rgba(99,102,241,0)');
  lg.addColorStop(0.5, 'rgba(99,102,241,.8)');
  lg.addColorStop(1, 'rgba(99,102,241,0)');
  ctx.fillStyle = lg;
  ctx.fillRect(W / 2 - nameWidth / 2, 432, nameWidth, 3);

  /* izoh */
  ctx.fillStyle = '#475569';
  ctx.font = '400 25px Inter, Segoe UI, Arial, sans-serif';
  var desc = '«English Zero-to-Hero» onlayn kursining A0 dan C1 gacha bo‘lgan ' +
    TOTAL_LESSONS + ' darsini, ya’ni Reading, Listening, Writing va Speaking ko‘nikmalarini ' +
    'muvaffaqiyatli tamomlagani uchun taqdim etiladi.';
  certWrapText(ctx, desc, W / 2, 492, 940, 36);

  /* daraja belgisi */
  var chipW = 520, chipH = 78, chipX = (W - chipW) / 2, chipY = 606;
  var chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
  chipGrad.addColorStop(0, 'rgba(99,102,241,.12)');
  chipGrad.addColorStop(1, 'rgba(168,85,247,.12)');
  ctx.fillStyle = chipGrad;
  certRoundRect(ctx, chipX, chipY, chipW, chipH, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(99,102,241,.45)';
  ctx.lineWidth = 2;
  certRoundRect(ctx, chipX, chipY, chipW, chipH, 18);
  ctx.stroke();

  ctx.fillStyle = '#4f46e5';
  ctx.font = '800 34px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('Daraja: ' + st.tier.level, W / 2, chipY + 40);
  ctx.fillStyle = '#64748b';
  ctx.font = '500 19px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('CEFR bo‘yicha taxminiy daraja · ' + st.done + '/' + TOTAL_LESSONS + ' dars tugatilgan', W / 2, chipY + 66);

  /* muhr */
  var sealX = 268, sealY = 782, sealR = 84;
  var sealGrad = ctx.createLinearGradient(sealX - sealR, sealY - sealR, sealX + sealR, sealY + sealR);
  sealGrad.addColorStop(0, '#6366f1');
  sealGrad.addColorStop(1, '#a855f7');
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fillStyle = sealGrad;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 10, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,.75)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 46px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText(st.tier.level, sealX, sealY + 8);
  ctx.font = '600 15px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('EZ-HERO', sealX, sealY + 36);

  /* imzo va kod bloklari */
  ctx.textAlign = 'left';
  ctx.strokeStyle = 'rgba(100,116,139,.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(520, 812);
  ctx.lineTo(880, 812);
  ctx.stroke();
  ctx.fillStyle = '#334155';
  ctx.font = '700 21px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('English Zero-to-Hero', 520, 842);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '400 17px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('Onlayn o‘quv kursi · kurs muallifi', 520, 868);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#334155';
  ctx.font = '600 20px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText(certDateStr(), W - 120, 812);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '400 17px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('Berilgan sana', W - 120, 838);

  var code = certCode(name, st.tier.level, certDateStr());
  ctx.fillStyle = '#6366f1';
  ctx.font = '700 20px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText(code, W - 120, 876);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '400 16px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('Tekshirish kodi', W - 120, 900);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '400 16px Inter, Segoe UI, Arial, sans-serif';
  ctx.fillText('Bu hujjat onlayn kursni tugatganlik to‘g‘risidagi guvohnoma. Rasmiy CEFR sertifikati emas.', W / 2, 936);
}

/* ---------- Amallar ---------- */
function updateCertName() {
  var input = document.getElementById('certName');
  if (!input) return;
  var v = input.value.trim();
  if (v) localStorage.setItem('userName', v);
  drawCertificate();
}

function downloadCert() {
  var cv = document.getElementById('certCanvas');
  if (!cv) return;
  var st = certStatus();
  var name = ((document.getElementById('certName') || {}).value || 'oquvchi').trim().replace(/\s+/g, '-');
  try {
    var url = cv.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'sertifikat-' + st.tier.level + '-' + name + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    alert('Yuklab olishda xatolik. Sertifikat rasmini bosib saqlab oling yoki chop etib PDF qiling.');
  }
}

function printCert() {
  drawCertificate();
  document.body.classList.add('printing-cert');
  setTimeout(function () {
    window.print();
    setTimeout(function () { document.body.classList.remove('printing-cert'); }, 400);
  }, 120);
}

/* ---------- Ochish ---------- */
function openCertificate() {
  var st = certStatus();
  if (typeof go === 'function') go('p6');
  renderCertificatePage();
  if (!st.tier) return;
}

/* ---------- Ishga tushirish ---------- */
function certInit() {
  refreshCertHints();
  if (document.getElementById('certCanvas')) {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(drawCertificate).catch(function () {});
    }
    drawCertificate();
  }
  document.addEventListener('click', function () { setTimeout(refreshCertHints, 60); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', certInit);
} else {
  certInit();
}
