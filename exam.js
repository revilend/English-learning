/* ==========================================================================
   English Zero-to-Hero — CEFR imtihon yo'li va sinov imtihoni
   Diqqat: bu modul rasmiy baholash emas. U "tayyorlik sinovi" (readiness check).
   Rasmiy sertifikat faqat akkreditatsiyalangan markazlarda topshiriladi.
   ========================================================================== */

/* ------------------------- Rasmiy imtihonlar jadvali -------------------- */
var OFFICIAL_EXAMS = [
  { level: 'A2', cambridge: 'A2 Key (KET)', ielts: '—', what: 'Kundalik oddiy mavzular, qisqa xatlar, tanish vaziyatlar' },
  { level: 'B1', cambridge: 'B1 Preliminary (PET)', ielts: '4.0 – 5.0', what: 'Sayohat, ish, o‘qishda oddiy muloqot, qisqa insho' },
  { level: 'B2', cambridge: 'B2 First (FCE)', ielts: '5.5 – 6.5', what: 'Erkin suhbat, esse, murakkab matnlar, rasmiy xat' },
  { level: 'C1', cambridge: 'C1 Advanced (CAE)', ielts: '7.0 – 8.0', what: 'Akademik va professional muloqot, abstrakt mavzular' },
  { level: 'C2', cambridge: 'C2 Proficiency (CPE)', ielts: '8.5 – 9.0', what: 'Ona tilida so‘zlashuvchi darajasiga yaqin' }
];

var EXAM_PARTS = [
  { name: 'Reading & Use of English', time: '~1 soat 15 daqiqa (B2) / 1 soat 30 daqiqa (C1)', what: 'Bo‘sh joylarni to‘ldirish, matn tushunish, so‘z yasash' },
  { name: 'Writing', time: '~1 soat 20 daqiqa (B2) / 1 soat 30 daqiqa (C1)', what: 'Esse, xat yoki hisobot yozish (140–220 so‘z)' },
  { name: 'Listening', time: '~40 daqiqa', what: 'Dialoglar, monologlar, radio suhbatlar' },
  { name: 'Speaking', time: '14–15 daqiqa', what: '2 ta nomzod + imtihonchi: suhbat, rasm taqqoslash, birgalikda muhokama' }
];

/* ------------------------------- Sinov savollari ------------------------ */
var EXAM_GRAMMAR = [
  { q: 'My brother ___ football every Sunday.', o: ['play', 'plays', 'playing', 'played'], c: 1, l: 'A1–A2' },
  { q: 'I have lived in Tashkent ___ 2019.', o: ['for', 'since', 'from', 'during'], c: 1, l: 'B1' },
  { q: 'If I ___ you, I would apologise.', o: ['am', 'was', 'were', 'be'], c: 2, l: 'B2' },
  { q: 'The bridge ___ built in 1998.', o: ['is', 'was', 'has', 'did'], c: 1, l: 'A2–B1' },
  { q: 'Neither of the answers ___ correct.', o: ['is', 'are', 'were', 'be'], c: 0, l: 'B1' },
  { q: 'He suggested ___ a taxi to the airport.', o: ['take', 'to take', 'taking', 'took'], c: 2, l: 'B1–B2' },
  { q: 'Rarely ___ such an interesting documentary.', o: ['I have seen', 'have I seen', 'I saw', 'did I saw'], c: 1, l: 'C1' },
  { q: 'Despite ___ hard, he did not pass the exam.', o: ['study', 'studied', 'studying', 'to study'], c: 2, l: 'B2' },
  { q: 'This is the man ___ car was stolen.', o: ['who', 'which', 'whose', 'whom'], c: 2, l: 'B1' },
  { q: '“Reluctant” so‘zining eng yaqin ma’nosi:', o: ['tayyor', 'istamaydigan', 'ehtiyotsiz', 'saxiy'], c: 1, l: 'B2' }
];

var EXAM_READING = {
  text: 'Many people believe that learning a language is mostly about memorising words. In fact, research shows that ' +
    'regular practice with real material matters far more. A student who reads twenty minutes every day usually ' +
    'progresses faster than one who studies grammar rules for three hours once a week. The reason is simple: the ' +
    'brain remembers what it meets often. However, practice alone is not enough. Learners also need feedback, ' +
    'because repeating the same mistake for months only makes it stronger. For this reason, teachers often ask ' +
    'students to record themselves and compare their speech with a model.',
  items: [
    { q: 'Tadqiqotga ko‘ra, eng muhimi nima?', o: ['So‘z yodlash', 'Muntazam amaliyot', 'Grammatika qoidalari', 'Haftada bir mashg‘ulot'], c: 1 },
    { q: 'Nega kunlik 20 daqiqa samaraliroq?', o: ['Vaqt ko‘p bo‘lgani uchun', 'Miya tez-tez uchragan narsani eslab qoladi', 'Grammatika oson', 'Kitob qiziqarli'], c: 1 },
    { q: 'Nima uchun fikr-mulohaza (feedback) kerak?', o: ['Xatoni takrorlash mustahkamlanib qolmasligi uchun', 'Vaqtni tejash uchun', 'Kitob sotib olish uchun', 'Imtihon qiyin bo‘lgani uchun'], c: 0 },
    { q: 'O‘qituvchilar o‘quvchilarga nima qilishni taklif qiladi?', o: ['Ko‘proq yozishni', 'O‘z ovozini yozib, namuna bilan solishtirishni', 'Guruhda o‘qishni', 'Uy vazifasini kamaytirishni'], c: 1 }
  ]
};

var EXAM_LISTENING = [
  { say: 'The train to Samarkand leaves at half past seven in the morning.', q: 'Poyezd qachon jo‘naydi?', o: ['7:00', '7:30', '8:00', '8:30'], c: 1 },
  { say: 'I would have called you earlier, but my phone battery had died.', q: 'Nega u oldin qo‘ng‘iroq qilmadi?', o: ['Band edi', 'Telefon quvvati tugagan edi', 'Uxlayotgan edi', 'Raqamni bilmas edi'], c: 1 },
  { say: 'You must hand in the report by Friday, otherwise it will not be marked.', q: 'Hisobot qachon topshirilishi kerak?', o: ['Payshanbagacha', 'Jumagacha', 'Shanbagacha', 'Dushanbagacha'], c: 1 },
  { say: 'Had I known about the meeting, I would have attended it.', q: 'U nima qilgan bo‘lardi?', o: ['Uchrashuvga qatnashgan bo‘lardi', 'Uyda qolgan bo‘lardi', 'Ishga ketgan bo‘lardi', 'Kechikkan bo‘lardi'], c: 0 }
];

var EXAM_WRITING = {
  prompt: 'Yozing (60–100 so‘z): «Qabul qilgan qaroringiz hayotingizni qanday o‘zgartirdi?»',
  hint: 'Foydali iboralar: I decided to … / Because of that … / Looking back, …'
};

/* ------------------- Reading: darajaga mos matnlar ---------------------- */
/* Foydalanuvchi yetgan daraja va undan keyingi daraja matni beriladi:
   imtihondagidek bir nechta matn, daraja oshgani sari uzunroq matn va ko'proq savol.
   Manba: READING_BANK (reading-a/b/c.js). Bank bo'lmasa — eski savollar ishlaydi. */
function examLevels() {
  return (typeof LEVELS !== 'undefined' && LEVELS) ? LEVELS : ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
}
function examUserLevel() {
  var levels = examLevels();
  var done = (typeof getCompleted === 'function') ? getCompleted() : [];
  var lessons = (typeof L !== 'undefined' && L) ? L : [];
  var best = -1;
  done.forEach(function (id) {
    var l = lessons.filter(function (x) { return x.id === id; })[0];
    if (!l) return;
    var i = levels.indexOf(l.lv);
    if (i > best) best = i;
  });
  return best < 0 ? levels[0] : levels[best];
}
function examReadLevels() {
  var levels = examLevels();
  var i = levels.indexOf(examUserLevel());
  var out = [levels[i]];
  var next = levels[i + 1] || levels[i - 1];
  if (next) out.push(next);
  return out;
}
function examBankReading(level) {
  if (typeof READING_BANK === 'undefined' || !READING_BANK) return null;
  var lessons = (typeof L !== 'undefined' && L) ? L : [];
  var found = lessons.filter(function (l) {
    var b = READING_BANK[l.id];
    return l.lv === level && b && b.qs && b.qs.length;
  });
  if (!found.length) return null;
  return READING_BANK[found[found.length - 1].id];
}
function examReadItems() {
  var out = [];
  examReadLevels().forEach(function (lv) {
    var b = examBankReading(lv);
    if (!b) return;
    var text = String(b.t).replace(/\s+/g, ' ').trim();
    var words = text.split(' ').length;
    b.qs.forEach(function (q, k) {
      out.push({
        text: text, level: lv, words: words, qno: k + 1, qcount: b.qs.length,
        first: k === 0, q: q.q, o: q.o, c: q.c
      });
    });
  });
  if (!out.length) {
    /* bank topilmasa — eski bitta matnli savollar */
    EXAM_READING.items.forEach(function (it, k) {
      out.push({
        text: EXAM_READING.text, level: 'B1', words: 0, qno: k + 1,
        qcount: EXAM_READING.items.length, first: k === 0, q: it.q, o: it.o, c: it.c
      });
    });
  }
  return out;
}

/* ------------------------------- Sinov holati --------------------------- */
var examState = null;
var examTimer = null;

function examAnswered() {
  try {
    var r = JSON.parse(localStorage.getItem('examResult') || 'null');
    return r && typeof r.total === 'number' ? r : null;
  } catch (e) { return null; }
}

function examBandPercent(p) {
  if (p >= 80) return { level: 'C1', note: 'C1 (Advanced) imtihoni formati bilan tanishishni boshlashingiz mumkin.' };
  if (p >= 60) return { level: 'B2', note: 'B2 First darajasiga yaqin. Yozish va tinglashga ko‘proq vaqt ajrating.' };
  if (p >= 40) return { level: 'B1', note: 'B1 darajasi. Avval B1 Preliminary formatini mashq qiling.' };
  if (p >= 25) return { level: 'A2', note: 'A2 darajasi. A1–A2 darslarini mustahkamlang.' };
  return { level: 'A1', note: 'Asoslarni mustahkamlash kerak: 1–11-darslardan boshlang.' };
}

/* ------------------------------ Sahifani chizish ------------------------ */
function renderExamPage() {
  var info = document.getElementById('examIntro');
  var last = document.getElementById('examLast');
  if (info) {
    info.innerHTML =
      '<div class="cd" style="cursor:default;overflow-x:auto">' +
        '<table class="cefr">' +
          '<thead><tr><th>CEFR</th><th>Rasmiy imtihon</th><th>IELTS</th><th>Nima tekshiriladi</th></tr></thead>' +
          '<tbody>' + OFFICIAL_EXAMS.map(function (e) {
            return '<tr><td><b>' + e.level + '</b></td><td>' + e.cambridge + '</td><td>' + e.ielts + '</td><td>' + e.what + '</td></tr>';
          }).join('') + '</tbody>' +
        '</table>' +
      '</div>' +
      '<div class="st2">🧩 Imtihon qismlari</div>' +
      '<div class="vl">' + EXAM_PARTS.map(function (p) {
        return '<div class="vi" style="cursor:default"><b>' + p.name + '</b><span>' + p.time + '</span>' +
          '<span style="font-size:.78rem;margin-top:4px">' + p.what + '</span></div>';
      }).join('') + '</div>' +
      '<div class="gt"><b>Halol izoh:</b> bu kurs <b>poydevor va yo‘l xaritasi</b> beradi — rasmiy imtihonning o‘zi emas. ' +
      'Rasmiy CEFR sertifikatini faqat Cambridge University Press &amp; Assessment, British Council, IELTS (IELTS.org) kabi ' +
      'akkreditatsiyalangan tashkilotlar imtihoni orqali olish mumkin. Narx, sana va markazlar <b>o‘zgarib turadi</b>, ' +
      'shuning uchun ularni rasmiy saytlardan tekshirish kerak.</div>';
  }

  var r = examAnswered();
  if (last) {
    if (!r) {
      last.innerHTML = '<p style="color:var(--tx2)">Hali sinov topshirilmagan.</p>';
    } else {
      var b = examBandPercent(r.percent);
      last.innerHTML =
        '<div class="cd" style="cursor:default">' +
          '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px">' +
            '<span class="bg b-' + b.level.toLowerCase() + '">' + b.level + '</span>' +
            '<b>Oxirgi sinov natijasi</b>' +
            '<span style="margin-left:auto;color:var(--tx2);font-size:.82rem">' + r.date + '</span>' +
          '</div>' +
          '<p style="color:var(--tx2);font-size:.88rem">Ball: <b>' + r.score + '/' + r.total + '</b> (' + r.percent + '%). ' +
          'Grammatika/lug‘at: ' + r.gram + '/' + EXAM_GRAMMAR.length +
          ' · O‘qish: ' + r.read + '/' + examReadItems().length +
          ' · Tinglash: ' + r.listen + '/' + EXAM_LISTENING.length +
          ' · Yozish: ' + r.write + '/6</p>' +
          '<p style="font-size:.88rem">' + b.note + '</p>' +
        '</div>';
    }
  }
}

/* -------------------------------- Sinov --------------------------------- */
function examStart() {
  examState = { section: 0, i: 0, gram: 0, read: 0, listen: 0, write: 0, timeLeft: 0 };
  var stage = document.getElementById('examStage');
  if (stage) stage.style.display = 'block';
  examRenderSection();
}

function examSections() {
  return [
    { id: 'gram', title: 'Grammar & Vocabulary', time: 420, count: EXAM_GRAMMAR.length },
    { id: 'read', title: 'Reading', time: 600, count: examReadItems().length },
    { id: 'listen', title: 'Listening', time: 300, count: EXAM_LISTENING.length },
    { id: 'write', title: 'Writing', time: 720, count: 1 }
  ];
}

function examStopTimer() {
  if (examTimer) { clearInterval(examTimer); examTimer = null; }
}

function examStartTimer(seconds) {
  examStopTimer();
  examState.timeLeft = seconds;
  var el = document.getElementById('examTimer');
  var bar = document.getElementById('examTimeBar');
  function tick() {
    var m = Math.floor(examState.timeLeft / 60);
    var s = examState.timeLeft % 60;
    if (el) el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    if (bar) bar.style.width = Math.min(100, (examState.timeLeft / seconds) * 100) + '%';
    if (examState.timeLeft <= 0) {
      examStopTimer();
      examNextSection();
    }
    examState.timeLeft--;
  }
  tick();
  examTimer = setInterval(tick, 1000);
}

function examRenderSection() {
  var stage = document.getElementById('examStage');
  if (!stage) return;
  var secs = examSections();
  var sec = secs[examState.section];
  if (!sec) { examFinish(); return; }

  var header =
    '<div class="cd" style="cursor:default;margin-bottom:12px">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
        '<b>' + (examState.section + 1) + '/' + secs.length + ' · ' + sec.title + '</b>' +
        '<span style="margin-left:auto;font-weight:700;color:var(--acc)" id="examTimer">-</span>' +
      '</div>' +
      '<div class="prr"><div class="prf" id="examTimeBar" style="width:100%"></div></div>' +
      '<p style="color:var(--tx2);font-size:.8rem">Imtihondagidek: vaqt tugasa keyingi qismga o‘tadi.</p>' +
    '</div>';

  var body = '';
  if (sec.id === 'gram') {
    body = EXAM_GRAMMAR.map(function (it, k) {
      return '<div class="cd" style="cursor:default">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">' +
          '<span style="color:var(--tx2);font-size:.78rem">' + (k + 1) + '/' + EXAM_GRAMMAR.length + '</span>' +
          '<span class="bg b-a2">' + it.l + '</span>' +
        '</div>' +
        '<p style="font-weight:600;margin-bottom:10px">' + it.q + '</p>' +
        '<div class="qos">' + it.o.map(function (o, i) {
          return '<div class="qo" id="g' + k + '-' + i + '" onclick="examPick(\'gram\',' + k + ',' + i + ')">' +
            String.fromCharCode(65 + i) + '. ' + o + '</div>';
        }).join('') + '</div></div>';
    }).join('');
  } else if (sec.id === 'read') {
    /* matnlar foydalanuvchi darajasiga qarab tanlanadi va matn bir marta to'liq ko'rsatiladi */
    examState.readItems = examReadItems();
    var readN = 0;
    body = examState.readItems.map(function (it, k) {
      var head = '';
      if (it.first) {
        readN++;
        head = '<div class="st2">📄 Matn ' + readN + ' · ' + it.level +
          (it.words ? ' · ' + it.words + ' so‘z' : '') + ' · ' + it.qcount + ' savol</div>' +
          '<div class="gt readbox">' + it.text + '</div>';
      } else {
        head = '<details class="gt readbox">' +
          '<summary><i class="fa-solid fa-book-open"></i> Matn ' + readN + ' qayta ko‘rsatish</summary>' +
          it.text + '</details>';
      }
      return head + '<div class="cd" style="cursor:default">' +
        '<p style="font-weight:600;margin-bottom:10px">' +
          '<span class="bg b-a2">matn ' + readN + ' · savol ' + it.qno + '/' + it.qcount + '</span> ' + it.q + '</p>' +
        '<div class="qos">' + it.o.map(function (o, i) {
          return '<div class="qo" id="r' + k + '-' + i + '" onclick="examPick(\'read\',' + k + ',' + i + ')">' +
            String.fromCharCode(65 + i) + '. ' + o + '</div>';
        }).join('') + '</div></div>';
    }).join('');
  } else if (sec.id === 'listen') {
    body = '<div class="gt">Tinglang (2 martagacha eshitish mumkin), so‘ng savolga javob bering.</div>' +
      EXAM_LISTENING.map(function (it, k) {
        return '<div class="cd" style="cursor:default">' +
          '<button class="btn bo bs" onclick="speakWord(\'' + String(it.say).replace(/'/g, '’') + '\')">' +
            '<i class="fa-solid fa-play"></i> Gapni eshitish</button>' +
          '<p style="font-weight:600;margin:10px 0">' + (k + 1) + '. ' + it.q + '</p>' +
          '<div class="qos">' + it.o.map(function (o, i) {
            return '<div class="qo" id="l' + k + '-' + i + '" onclick="examPick(\'listen\',' + k + ',' + i + ')">' +
              String.fromCharCode(65 + i) + '. ' + o + '</div>';
          }).join('') + '</div></div>';
      }).join('');
  } else {
    body = '<div class="cd" style="cursor:default">' +
      '<p style="font-weight:600;margin-bottom:8px">' + EXAM_WRITING.prompt + '</p>' +
      '<p style="color:var(--tx2);font-size:.82rem;margin-bottom:10px">' + EXAM_WRITING.hint + '</p>' +
      '<textarea class="inp" id="examWriting" rows="6" placeholder="Javobingizni inglizcha yozing..."></textarea>' +
      '<div id="examWordCount" style="color:var(--tx2);font-size:.82rem;margin-top:6px">0 so‘z</div>' +
    '</div>';
  }

  stage.innerHTML = header + body + '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
    '<button class="btn bp" onclick="examNextSection()">' +
      (examState.section === secs.length - 1 ? 'Yakunlash va natijani ko‘rish' : 'Keyingi qism') +
      ' <i class="fa-solid fa-arrow-right"></i></button>' +
    '<button class="btn bo" onclick="examStop()">To‘xtatish</button></div>';

  if (sec.id === 'write') {
    var ta = document.getElementById('examWriting');
    var wc = document.getElementById('examWordCount');
    if (ta && wc) {
      ta.addEventListener('input', function () {
        var n = ta.value.trim().split(/\s+/).filter(Boolean).length;
        wc.textContent = n + ' so‘z';
      });
    }
  }

  examStartTimer(sec.time);
}

function examPick(kind, qIndex, choice) {
  if (!examState) return;
  var data = kind === 'gram' ? EXAM_GRAMMAR
    : (kind === 'read' ? (examState.readItems || examReadItems()) : EXAM_LISTENING);
  var it = data[qIndex];
  if (!it) return;
  var stateKey = 'l_' + kind + '_' + qIndex;
  if (examState[stateKey] !== undefined) return;
  examState[stateKey] = choice;
  var correct = choice === it.c;
  if (correct) {
    examState[kind === 'gram' ? 'gram' : (kind === 'read' ? 'read' : 'listen')]++;
  }
  for (var i = 0; i < it.o.length; i++) {
    var el = document.getElementById(kind.charAt(0) + qIndex + '-' + i);
    if (!el) continue;
    el.classList.add('ds');
    if (i === it.c) el.classList.add('ok');
    if (i === choice && !correct) el.classList.add('no');
  }
}

function examNextSection() {
  if (!examState) return;
  examStopTimer();
  var secs = examSections();
  var sec = secs[examState.section];
  if (sec && sec.id === 'write') {
    var ta = document.getElementById('examWriting');
    if (ta) {
      var n = ta.value.trim().split(/\s+/).filter(Boolean).length;
      examState.write = n >= 100 ? 6 : (n >= 60 ? 4 : (n >= 30 ? 2 : 0));
      examState.writingText = ta.value.trim();
      localStorage.setItem('examWriting', ta.value);
    }
  }
  examState.section++;
  if (examState.section >= secs.length) { examFinish(); return; }
  examRenderSection();
  var stage = document.getElementById('examStage');
  if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function examStop() {
  examStopTimer();
  examState = null;
  var stage = document.getElementById('examStage');
  if (stage) { stage.style.display = 'none'; stage.innerHTML = ''; }
}

function examFinish() {
  examStopTimer();
  var st = examState || { gram: 0, read: 0, listen: 0, write: 0 };
  var readTotal = examReadItems().length;
  var objective = EXAM_GRAMMAR.length + readTotal + EXAM_LISTENING.length;
  var score = (st.gram || 0) + (st.read || 0) + (st.listen || 0) + (st.write || 0);
  var total = objective + 6;
  var percent = Math.round(score / total * 100);
  var band = examBandPercent(percent);

  var result = {
    score: score, total: total, percent: percent,
    gram: st.gram || 0, read: st.read || 0, listen: st.listen || 0, write: st.write || 0,
    level: band.level,
    date: new Date().toLocaleDateString('uz-UZ')
  };
  localStorage.setItem('examResult', JSON.stringify(result));

  var stage = document.getElementById('examStage');
  if (stage) {
    stage.innerHTML =
      '<div class="cd" style="cursor:default;text-align:center;padding:28px">' +
        '<div style="font-size:2.6rem;margin-bottom:8px">🎯</div>' +
        '<h3 style="margin-bottom:6px">Sinov yakunlandi</h3>' +
        '<p style="font-size:1.15rem;color:var(--tx2);margin-bottom:8px">' + score + '/' + total + ' ball (' + percent + '%)</p>' +
        '<p style="font-weight:700;color:var(--acc);margin-bottom:6px">Taxminiy daraja: ' + band.level + '</p>' +
        '<p style="color:var(--tx2);font-size:.9rem;margin-bottom:14px">' + band.note + '</p>' +
        '<div class="vl" style="max-width:640px;margin:0 auto 14px;text-align:left">' +
          '<div class="vi" style="cursor:default"><b>Grammar & Vocabulary</b><span>' + (st.gram || 0) + '/' + EXAM_GRAMMAR.length + '</span></div>' +
          '<div class="vi" style="cursor:default"><b>Reading</b><span>' + (st.read || 0) + '/' + readTotal + '</span></div>' +
          '<div class="vi" style="cursor:default"><b>Listening</b><span>' + (st.listen || 0) + '/' + EXAM_LISTENING.length + '</span></div>' +
          '<div class="vi" style="cursor:default"><b>Writing</b><span>' + (st.write || 0) + '/6</span></div>' +
        '</div>' +
        '<div class="gt" style="text-align:left">Bu <b>tayyorlik sinovi</b>, rasmiy baholash emas. Rasmiy CEFR sertifikati uchun ' +
        'Cambridge, British Council yoki IELTS imtihonini akkreditatsiyalangan markazda topshirish kerak.</div>' +
        '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px">' +
          '<button class="btn bp" onclick="examStart()"><i class="fa-solid fa-rotate-right"></i> Qayta topshirish</button>' +
          '<button class="btn bo" onclick="go(\'p1\')"><i class="fa-solid fa-book-open"></i> Darslarga o‘tish</button>' +
        '</div>' +
      '</div>';
    stage.style.display = 'block';
  }
  examState = null;
  renderExamPage();
}

function openExam() {
  if (typeof go === 'function') go('p7');
  renderExamPage();
}

/* --------------------------- O‘z-o‘zini tekshirish ---------------------- */
var READINESS = [
  'Men 5 daqiqa davomida tanaffussiz inglizcha gapira olaman',
  'Men 200+ so‘zlik matnni lug‘atsiz tushunaman',
  'Men 3 daqiqalik audio suhbatni bir marta eshitib mazmunini tushunaman',
  'Men 150–200 so‘zlik esse/fikr yozib bera olaman',
  'Men rasmiy xat yoki elektron pochta yoza olaman',
  'Men o‘tgan, hozirgi va kelasi zamonlarni aralashtirib ishlata olaman',
  'Men passiv va shart gaplarni (conditionals) to‘g‘ri ishlataman',
  'Men yangi so‘zni kontekstdan ma’nosini topib olaman',
  'Men o‘z fikrimga dalil keltirib himoya qila olaman',
  'Men savolga qisqa javob emas, izohli javob bera olaman'
];

function renderReadiness() {
  var box = document.getElementById('examReadiness');
  if (!box) return;
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('readiness') || '{}'); } catch (e) { saved = {}; }
  box.innerHTML =
    '<div class="vl">' + READINESS.map(function (t, i) {
      return '<div class="vi" style="cursor:default">' +
        '<b style="font-size:.82rem">' + t + '</b>' +
        '<select class="inp" style="margin-top:6px;padding:6px 8px;font-size:.8rem" onchange="setReady(' + i + ',this.value)">' +
          ['— tanlang —', 'Yo‘q', 'Ba’zan', 'Ha, ishonch bilan'].map(function (o, v) {
            var sel = saved[i] === String(v) ? ' selected' : '';
            return '<option value="' + v + '"' + sel + '>' + o + '</option>';
          }).join('') +
        '</select></div>';
    }).join('') + '</div>' +
    '<div style="margin-top:12px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">' +
      '<div class="prr" style="flex:1;min-width:200px;margin:0"><div class="prf" id="readyBar" style="width:0%"></div></div>' +
      '<b id="readyText" style="color:var(--acc)">0%</b>' +
    '</div>';
  updateReadiness();
}

function setReady(i, v) {
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('readiness') || '{}'); } catch (e) { saved = {}; }
  saved[i] = String(v);
  localStorage.setItem('readiness', JSON.stringify(saved));
  updateReadiness();
}

function updateReadiness() {
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem('readiness') || '{}'); } catch (e) { saved = {}; }
  var sum = 0, n = READINESS.length;
  for (var i = 0; i < n; i++) {
    var v = parseInt(saved[i] || '0', 10);
    sum += (v === 2 ? 1 : (v === 1 ? 0.5 : 0));
  }
  var pct = Math.round(sum / n * 100);
  var bar = document.getElementById('readyBar');
  var txt = document.getElementById('readyText');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = pct + '%';
}

/* -------------------------------- Ishga tushirish ---------------------- */
function examInit() {
  if (document.getElementById('examIntro')) renderExamPage();
  if (document.getElementById('examReadiness')) renderReadiness();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', examInit);
} else {
  examInit();
}
