/* ==========================================================================
   English Zero-to-Hero — Daraja imtihonlari (CEFR uslubidagi mock testlar)
   Savol turlari haqiqiy Cambridge/CEFR imtihon formatlaridan olingan:
     Part 1 — Multiple-choice cloze (variantli bo'sh joy)
     Part 2 — Open cloze (o'zingiz yozadigan bitta so'z)
     Part 3 — Word formation (so'z yasash)
     Part 4 — Key word transformation (kalit so'z bilan qayta yozish)
     Part 5 — Reading (matn + savollar)
     Listening — eshitib tushunish
     Writing  — yozma ish (so'z soni hisoblanadi)
   Har bir daraja tugagach shu darajaning imtihoni ochiladi.
   ========================================================================== */

var MOCK_ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
var MOCK_PASS_PERCENT = 65;

function mc(q, o, c) { return { type: 'mc', part: 'Part 1 · Multiple-choice cloze', q: q, o: o, c: c }; }
function open_(q, a) { return { type: 'open', part: 'Part 2 · Open cloze', q: q, a: a }; }
function form(q, a) { return { type: 'form', part: 'Part 3 · Word formation', q: q, a: a }; }
function trans(q, a) { return { type: 'trans', part: 'Part 4 · Key word transformation', q: q, a: a }; }
function read(text, items) { return { type: 'read', part: 'Part 5 · Reading', text: text, items: items }; }
function listen(say, q, o, c) { return { type: 'listen', part: 'Listening', say: say, q: q, o: o, c: c }; }
function writeTask(prompt, minWords, points) {
  return { type: 'write', part: 'Writing', prompt: prompt, minWords: minWords, points: points || 2 };
}

/* ------------------------------- Savollar bazasi ------------------------ */
var MOCK_BANK = {
  A0: {
    title: 'A0 — Eng boshlang‘ich',
    note: 'Salomlashish, o‘zini tanishtirish, raqamlar va oila.',
    time: 600,
    items: [
      mc('My name ___ Aziz.', ['am', 'is', 'are', 'be'], 1),
      mc('This is my sister. ___ name is Malika.', ['His', 'Her', 'Its', 'Their'], 1),
      mc('I ___ from Uzbekistan.', ['is', 'am', 'are', 'be'], 1),
      open_('She ___ a teacher. (to be fe’lini to‘g‘ri shaklda yozing)', ['is']),
      mc('How old ___ you?', ['is', 'are', 'am', 'do'], 1),
      form('He is a ___ (TEACH) at our school.', ['teacher']),
      read('Hello! My name is Bek. I am ten. I live in Andijan. I have one brother and two sisters. ' +
        'My father is a doctor and my mother is a teacher.',
        [
          { q: 'Bek necha yoshda?', o: ['5', '10', '12', '20'], c: 1 },
          { q: 'Uning otasi kim?', o: ['teacher', 'doctor', 'driver', 'cook'], c: 1 }
        ]),
      listen('I have two sisters and one brother.', 'Uning nechta aka-ukasi va opa-singlisi bor?', ['one', 'two', 'three', 'four'], 1),
      writeTask('O‘zingiz haqingizda 3–4 gap yozing: ismingiz, yoshingiz, shahringiz va oilangiz.', 20, 2)
    ]
  },

  A1: {
    title: 'A1 — Boshlang‘ich',
    note: 'Kundalik harakatlar, taom, ranglar, vaqt va oddiy savollar.',
    time: 720,
    items: [
      mc('She ___ to school every day.', ['go', 'goes', 'going', 'went'], 1),
      mc('There ___ two chairs in the room.', ['is', 'are', 'be', 'am'], 1),
      open_('I have ___ orange in my bag. (artikl)', ['an']),
      mc('___ you like tea?', ['Do', 'Does', 'Are', 'Is'], 0),
      form('He works as a ___ (DRIVE) in the city.', ['driver']),
      trans('My house is near the school. | FAR | My house is not ___ the school.', ['far from']),
      read('I usually get up at seven. I have breakfast at half past seven. Then I go to work by bus. ' +
        'In the evening I read a book or watch television. I go to bed at eleven.',
        [
          { q: 'U ertalab nima qiladi?', o: ['Nonushta qiladi', 'Ishga boradi', 'Kitob o‘qiydi', 'Uxlaydi'], c: 0 },
          { q: 'U ishga qanday boradi?', o: ['Piyoda', 'Avtobusda', 'Taksida', 'Poyezdda'], c: 1 }
        ]),
      listen('I have breakfast at half past seven.', 'U nonushtani qachon qiladi?', ['7:00', '7:30', '8:00', '8:30'], 1),
      writeTask('Kundalik tartibingiz haqida 5–6 gap yozing (uydan chiqish, ish/o‘qish, kechki mashg‘ulot).', 30, 2)
    ]
  },

  A2: {
    title: 'A2 — Elementar',
    note: 'O‘tgan zamon, Present Perfect, taqqoslash, sayohat va xarid.',
    time: 780,
    items: [
      mc('We ___ to Samarkand last summer.', ['go', 'goes', 'went', 'going'], 2),
      mc('I have ___ finished my homework.', ['already', 'yet', 'still', 'ago'], 0),
      open_('She is very good ___ mathematics. (predlog)', ['at']),
      mc('This shirt is ___ than that one.', ['cheaper', 'cheap', 'cheapest', 'more cheap'], 0),
      form('The weather was ___ (BEAUTY) yesterday.', ['beautiful']),
      trans('The bag was too heavy for me. | ENOUGH | I was not ___ to carry the bag.', ['strong enough']),
      read('Last weekend we travelled to Bukhara. We booked a small hotel near the old town. ' +
        'The rooms were clean and the local food was delicious. On Sunday it rained, so we visited a museum instead of going to the park.',
        [
          { q: 'Ular qayerda tunashdi?', o: ['Mehmonxonada', 'Do‘stlarida', 'Chodirda', 'Poezdda'], c: 0 },
          { q: 'Yomg‘ir yog‘ganda nima qilishdi?', o: ['Parkga ketishdi', 'Muzeyga ketishdi', 'Uyda qolishdi', 'Xarid qilishdi'], c: 1 }
        ]),
      listen('I would like to book a table for four at eight o clock.', 'U nechta kishi uchun stol band qilmoqchi?', ['two', 'three', 'four', 'eight'], 2),
      writeTask('Oxirgi ta’tiliniz haqida yozing: qayerga bordingiz, nima ko‘rdingiz, nima yoqdi? (60+ so‘z)', 40, 2)
    ]
  },

  B1: {
    title: 'B1 — O‘rta',
    note: 'Present Perfect, shart gaplar, bilvosita savol, fikr bildirish.',
    time: 840,
    items: [
      mc('I ___ in Tashkent since 2019.', ['live', 'lived', 'have lived', 'am living'], 2),
      mc('If it ___ tomorrow, we will stay at home.', ['rains', 'rain', 'rained', 'raining'], 0),
      open_('He is interested ___ learning foreign languages. (predlog)', ['in']),
      mc('She asked me ___ I was from.', ['what', 'where', 'who', 'how'], 1),
      form('Her ___ (DECIDE) surprised everybody in the team.', ['decision']),
      trans('I started working here two years ago. | FOR | I have worked here ___ two years.', ['for']),
      read('Many people think that talent decides everything. However, studies of musicians and athletes show ' +
        'something different: the amount of deliberate practice is usually more important. ' +
        'Talented beginners often stop improving because they avoid difficult tasks, while less talented ' +
        'learners who practise regularly keep getting better.',
        [
          { q: 'Muallifning fikriga ko‘ra, eng muhimi nima?', o: ['Talant', 'Muntazam mashq', 'Yosh', 'Omad'], c: 1 },
          { q: 'Nega iqtidorli boshlovchilar to‘xtab qoladi?', o: ['Vaqti yo‘q', 'Qiyin vazifalardan qochadi', 'Ular kasal', 'Ular ishonmaydi'], c: 1 }
        ]),
      listen('You must hand in the report by Friday, otherwise it will not be marked.', 'Hisobot qachon topshirilishi kerak?', ['Thursday', 'Friday', 'Saturday', 'Monday'], 1),
      writeTask('«Onlayn o‘qish an’anaviy darsdan yaxshiroq» degan fikrga munosabatingizni yozing (80+ so‘z).', 60, 2)
    ]
  },

  B2: {
    title: 'B2 — Yuqori o‘rta',
    note: 'Passiv, gerund/infinitive, bog‘lovchilar, esse va murakkab matnlar.',
    time: 900,
    items: [
      mc('The report ___ by the team yesterday.', ['was completed', 'completed', 'completing', 'completes'], 0),
      mc('Despite ___ hard, he did not pass the exam.', ['study', 'studied', 'studying', 'to study'], 2),
      open_('You had better ___ a doctor as soon as possible. (fe’lning asosiy shakli)', ['see']),
      mc('Neither of the answers ___ correct.', ['is', 'are', 'were', 'be'], 0),
      form('The company reported a steady ___ (GROW) in profits.', ['growth']),
      trans('It was such a good film that I watched it twice. | SO | The film was ___ that I watched it twice.', ['so good']),
      read('When cities invest in public transport, traffic falls and air quality improves. ' +
        'Yet the effect depends on how convenient the new service is. If buses are slow or unreliable, ' +
        'drivers simply keep using their cars. Studies in several European cities found that frequency, ' +
        'not price, was the strongest predictor of whether commuters changed their habits.',
        [
          { q: 'Yangi transportning ta’siri nimaga bog‘liq?', o: ['Narxga', 'Qulayligiga', 'Shahar hajmiga', 'Ob-havoga'], c: 1 },
          { q: 'Tadqiqotlarda eng kuchli omil nima bo‘ldi?', o: ['Chipta narxi', 'Qatnov chastotasi', 'Avtobus rangi', 'Haydovchi soni'], c: 1 }
        ]),
      listen('Had I known about the meeting, I would have attended it.', 'Uchrashuv haqida nima bo‘ldi?', ['U qatnashdi', 'U qatnashmadi', 'Uchrashuv bekor qilindi', 'U kechikdi'], 1),
      writeTask('Ijtimoiy tarmoqlarning afzalliklari va kamchiliklari haqida esse yozing (100–140 so‘z).', 80, 2)
    ]
  },

  /* Imtihonga tayyorgarlik: aralash CEFR uslubidagi sinov (p7 dan ochiladi) */
  CEFR: {
    title: 'CEFR uslubidagi aralash sinov',
    note: 'Part 1–5 + Listening + Writing: haqiqiy imtihon kabi aralash topshiriqlar.',
    time: 900,
    items: [
      mc('She has been working in this company ___ three years.', ['for', 'since', 'during', 'from'], 0),
      open_('I am looking forward ___ hearing from you soon. (predlog)', ['to']),
      form('The instructions were completely ___ (CLEAR) — nobody understood them.', ['unclear']),
      trans('It was raining, so we stayed inside. | BECAUSE | We stayed inside ___ the rain.', ['because of']),
      mc('By the time we arrived, the film ___.', ['started', 'had started', 'has started', 'was starting'], 1),
      mc('Not only ___ late, but he also forgot the documents.', ['he was', 'was he', 'he is', 'is he'], 1),
      read('Employers increasingly value evidence of practical skills. A degree still opens doors, but candidates who ' +
        'can show portfolios, internships or measurable results often move ahead of equally qualified applicants. ' +
        'The same logic applies to language learning: a certificate proves a level, while a recorded conversation ' +
        'proves that you can use it.',
        [
          { q: 'Maqolaga ko‘ra ish beruvchilar nimani qadrlaydi?', o: ['Faqat diplomni', 'Amaliy ko‘nikma dalillarini', 'Yoshni', 'Tavsiyanomani'], c: 1 },
          { q: 'Til o‘rganishda qanday xulosa chiqariladi?', o: ['Sertifikat yetarli', 'Yozib olingan suhbat darajani isbotlaydi', 'Imtihon kerak emas', 'Grammatika muhim emas'], c: 1 }
        ]),
      listen('I would rather you did not mention this to anyone.', 'U nima so‘rayapti?', ['Buni hech kimga aytmaslikni', 'Buni tez aytishni', 'Yordam berishni', 'Kutishni'], 0),
      writeTask('«Imtihonga tayyorlanishning eng samarali yo‘li» haqida 80–120 so‘z yozing.', 60, 2)
    ]
  },

  C1: {
    title: 'C1 — Ilg‘or',
    note: 'Inversiya, subjunctive, advanced passive, akademik uslub.',
    time: 960,
    items: [
      mc('Rarely ___ such an interesting documentary.', ['I have seen', 'have I seen', 'I saw', 'did I saw'], 1),
      mc('___ had she left the house when it started to rain.', ['No sooner', 'Hardly ever', 'Only when', 'As soon'], 0),
      open_('Under no circumstances ___ you open this door. (modal fe’l)', ['should', 'must']),
      mc('The findings are believed ___ last year.', ['to have been published', 'to be published', 'publishing', 'published'], 0),
      form('The report was highly ___ (CRITIC) of the new policy.', ['critical']),
      trans('People say that English is the global language of business. | SAID | English ___ to be the global language of business.', ['is said']),
      read('Globalisation has connected economies and lowered the price of many goods, but its benefits have not ' +
        'been evenly shared. Regions that depended on a single industry often lost employment, while ' +
        'well-connected cities gained. Economists therefore argue that the question is not whether to trade, ' +
        'but how to redistribute the gains — through taxation, retraining and regional investment.',
        [
          { q: 'Maqolada globallashuvning qanday natijasi ta’kidlanadi?', o: ['Faqat ijobiy', 'Faqat salbiy', 'Foydasi teng taqsimlanmagan', 'Ta’siri yo‘q'], c: 2 },
          { q: 'Iqtisodchilar nima deydi?', o: ['Savdo to‘xtatilsin', 'Foyda qayta taqsimlansin', 'Narxlar oshirilsin', 'Chegara yopilsin'], c: 1 }
        ]),
      listen('Not only did she finish the project, but she also helped her team.', 'U nima qildi?', ['Faqat loyihani tugatdi', 'Loyihani tugatib, jamoasiga ham yordam berdi', 'Faqat jamoasiga yordam berdi', 'Hech narsa qilmadi'], 1),
      writeTask('Masofadan ishlash (remote work) haqida dalilli esse yozing: afzallik, kamchilik va xulosa (140–190 so‘z).', 100, 2)
    ]
  }
};

/* ------------------------------- Yordamchi ------------------------------ */
function mockLessonsOf(level) {
  if (typeof L === 'undefined' || !L) return [];
  return L.filter(function (l) { return l.lv === level; });
}
function mockCompletedIds() {
  try { return JSON.parse(localStorage.getItem('completedLessons') || '[]') || []; } catch (e) { return []; }
}
function mockStatus(level) {
  var lessons = mockLessonsOf(level);
  var done = mockCompletedIds();
  var doneCount = lessons.filter(function (l) { return done.indexOf(l.id) > -1; }).length;
  var unlocked = lessons.length > 0 && doneCount === lessons.length;
  var result = null;
  try { result = JSON.parse(localStorage.getItem('mockResult_' + level) || 'null'); } catch (e) { result = null; }
  return {
    level: level,
    bank: MOCK_BANK[level],
    lessons: lessons.length,
    doneCount: doneCount,
    unlocked: unlocked,
    result: result,
    passed: !!(result && result.passed)
  };
}
function mockNorm(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?;:"()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function mockFlatItems(level) {
  var bank = MOCK_BANK[level];
  if (!bank) return [];
  var out = [];
  bank.items.forEach(function (it) {
    if (it.type === 'read') {
      it.items.forEach(function (sub, k) {
        out.push({
          type: 'mc',
          part: 'Part 5 · Reading · savol ' + (k + 1),
          q: sub.q, o: sub.o, c: sub.c,
          text: it.text,
          group: 'read'
        });
      });
    } else {
      out.push(it);
    }
  });
  return out;
}
function mockMaxPoints(level) {
  return mockFlatItems(level).reduce(function (sum, it) {
    return sum + (it.type === 'write' ? (it.points || 2) : 1);
  }, 0);
}

/* ------------------------------- Runner state --------------------------- */
var mockState = null;
var mockTimer = null;

function openMocks() {
  if (typeof go === 'function') go('p8');
  renderMockPage();
  updateMockHint();
  var stage = document.getElementById('mockStage');
  if (stage && !mockState) stage.style.display = 'none';
}

/* p7 (CEFR yo'li) dan: aralash CEFR uslubidagi sinov */
function mockStartPractice() {
  if (typeof go === 'function') go('p8');
  renderMockPage();
  mockStart('CEFR', true);
}

function renderMockPage() {
  var list = document.getElementById('mockList');
  if (!list) return;
  var cards = MOCK_ORDER.map(function (lv) {
    var st = mockStatus(lv);
    var badge;
    if (st.passed) badge = '<span class="bg b-a1">🏅 O‘tilgan</span>';
    else if (st.unlocked) badge = '<span class="bg b-a2">▶ Tayyor</span>';
    else badge = '<span class="bg b-a0">🔒 Yopiq</span>';

    var info = st.unlocked
      ? (st.result
          ? 'Oxirgi natija: <b>' + st.result.score + '/' + st.result.total + '</b> (' + st.result.percent + '%) · ' + st.result.date
          : 'Imtihon tayyor: ' + st.lessons + ' dars tugatildi.')
      : st.lessons + ' darsdan <b>' + st.doneCount + '</b> tasi tugatilgan. Imtihon uchun hammasi kerak.';

    return '<div class="cd" style="cursor:default">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px">' +
        '<b>' + st.bank.title + '</b>' + badge +
        '<span style="margin-left:auto;color:var(--tx2);font-size:.78rem">' +
          MOCK_BANK[lv].items.length + ' topshiriq · ' + Math.round(MOCK_BANK[lv].time / 60) + ' daqiqa' +
        '</span>' +
      '</div>' +
      '<p style="color:var(--tx2);font-size:.85rem;margin-bottom:4px">' + st.bank.note + '</p>' +
      '<p style="color:var(--tx2);font-size:.82rem;margin-bottom:10px">' + info + '</p>' +
      (st.unlocked
        ? '<button class="btn bp bs" onclick="mockStart(\'' + lv + '\')"><i class="fa-solid fa-play"></i> ' +
            (st.result ? 'Qayta topshirish' : 'Imtihonni boshlash') + '</button>'
        : '<button class="btn bo bs" onclick="go(\'p1\')"><i class="fa-solid fa-book-open"></i> Darslarga o‘tish</button>') +
      '</div>';
  }).join('');
  list.innerHTML = cards;
}

/* -------------------------------- Imtihon ------------------------------- */
function mockStart(level, force) {
  var st = mockStatus(level);
  if (!st.unlocked && !force) return;
  if (!MOCK_BANK[level]) return;
  /* savollarni nusxalaymiz: qayta topshirishda eski belgilar qolmasligi uchun */
  var items = JSON.parse(JSON.stringify(mockFlatItems(level)));
  mockState = {
    level: level,
    items: items,
    index: 0,
    score: 0,
    answers: [],
    timeLeft: MOCK_BANK[level].time,
    totalTime: MOCK_BANK[level].time
  };
  var stage = document.getElementById('mockStage');
  if (stage) { stage.style.display = 'block'; stage.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  mockRenderStep();
}

function mockStopTimer() {
  if (mockTimer) { clearInterval(mockTimer); mockTimer = null; }
}

function mockStartTimer() {
  mockStopTimer();
  var el = document.getElementById('mockTimer');
  var bar = document.getElementById('mockTimeBar');
  function tick() {
    if (!mockState) { mockStopTimer(); return; }
    var m = Math.floor(mockState.timeLeft / 60);
    var s = mockState.timeLeft % 60;
    if (el) el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    if (bar) bar.style.width = Math.min(100, (mockState.timeLeft / mockState.totalTime) * 100) + '%';
    if (mockState.timeLeft <= 0) { mockStopTimer(); mockFinish(); return; }
    mockState.timeLeft--;
  }
  tick();
  mockTimer = setInterval(tick, 1000);
}

function mockRenderStep() {
  var stage = document.getElementById('mockStage');
  if (!stage || !mockState) return;
  var it = mockState.items[mockState.index];
  if (!it) { mockFinish(); return; }

  var header =
    '<div class="cd" style="cursor:default;margin-bottom:12px">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
        '<b>' + MOCK_BANK[mockState.level].title + ' · daraja imtihoni</b>' +
        '<span style="margin-left:auto;font-weight:700;color:var(--acc)" id="mockTimer">-</span>' +
      '</div>' +
      '<div class="prr"><div class="prf" id="mockTimeBar" style="width:100%"></div></div>' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
        '<span class="part-tag">' + it.part + '</span>' +
        '<span style="color:var(--tx2);font-size:.78rem">' + (mockState.index + 1) + '/' + mockState.items.length + '</span>' +
        '<span style="color:var(--tx2);font-size:.78rem;margin-left:auto">Ball: ' + mockState.score + '</span>' +
      '</div>' +
      '<div class="prr" style="height:4px"><div class="prf" style="width:' +
        ((mockState.index / mockState.items.length) * 100) + '%"></div></div>' +
    '</div>';

  var body = '';
  if (it.type === 'mc') {
    body = (it.text ? '<div class="gt" style="font-size:.85rem">' + it.text + '</div>' : '') +
      '<div class="cd" style="cursor:default">' +
        '<p style="font-weight:600;margin-bottom:12px;font-size:1.05rem">' + it.q + '</p>' +
        '<div class="qos">' + it.o.map(function (o, i) {
          return '<div class="qo" id="mock-' + i + '" onclick="mockPick(' + i + ')">' +
            String.fromCharCode(65 + i) + '. ' + o + '</div>';
        }).join('') + '</div>' +
      '</div>';
  } else if (it.type === 'listen') {
    body = '<div class="cd" style="cursor:default">' +
      '<button class="btn bo bs" onclick="speakWord(\'' + String(it.say).replace(/'/g, '’') + '\')">' +
        '<i class="fa-solid fa-play"></i> Tinglash</button>' +
      '<p style="font-weight:600;margin:12px 0;font-size:1.05rem">' + it.q + '</p>' +
      '<div class="qos">' + it.o.map(function (o, i) {
        return '<div class="qo" id="mock-' + i + '" onclick="mockPick(' + i + ')">' +
          String.fromCharCode(65 + i) + '. ' + o + '</div>';
      }).join('') + '</div></div>';
  } else if (it.type === 'write') {
    body = '<div class="cd" style="cursor:default">' +
      '<p style="font-weight:600;margin-bottom:8px">' + it.prompt + '</p>' +
      '<p style="color:var(--tx2);font-size:.82rem;margin-bottom:10px">Kamida ' + it.minWords +
        ' so‘z. Baho: ' + (it.points || 2) + ' ball.</p>' +
      '<textarea class="inp" id="mockWriting" rows="7" placeholder="Javobingizni inglizcha yozing..."></textarea>' +
      '<div id="mockWordCount" style="color:var(--tx2);font-size:.82rem;margin-top:6px">0 so‘z</div>' +
    '</div>';
  } else {
    body = '<div class="cd" style="cursor:default">' +
      '<p style="font-weight:600;margin-bottom:6px;font-size:1.05rem">' + it.q + '</p>' +
      (it.type === 'trans' ? '<p style="color:var(--tx2);font-size:.82rem;margin-bottom:10px">Kalit so‘z shaklini o‘zgartirmang, gapni qayta yozing.</p>' : '') +
      '<input class="inp" id="mockInput" placeholder="Javobni yozing..." onkeydown="if(event.key===\'Enter\')mockSubmitText()">' +
      '<div style="margin-top:10px"><button class="btn bp bs" onclick="mockSubmitText()">Javobni tekshirish</button></div>' +
      '<div id="mockFeedback" style="margin-top:10px"></div>' +
    '</div>';
  }

  stage.innerHTML = header + body +
    '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
      (mockState.index > 0 && it.type !== 'mc' && it.type !== 'listen' && it.type !== 'write'
        ? '<button class="btn bo" onclick="mockSkip()">Keyingi savol</button>' : '') +
      '<button class="btn bo" onclick="mockAbort()">Imtihonni to‘xtatish</button>' +
    '</div>';

  if (it.type === 'write') {
    var ta = document.getElementById('mockWriting');
    var wc = document.getElementById('mockWordCount');
    if (ta) ta.value = localStorage.getItem('mockWriting') || '';
    if (ta && wc) {
      var upd = function () {
        var n = ta.value.trim().split(/\s+/).filter(Boolean).length;
        wc.textContent = n + ' so‘z';
      };
      ta.addEventListener('input', upd);
      upd();
    }
  }
  mockStartTimer();
}

function mockWordCountNow() {
  var ta = document.getElementById('mockWriting');
  if (!ta) return 0;
  return ta.value.trim().split(/\s+/).filter(Boolean).length;
}

function mockPick(i) {
  if (!mockState) return;
  var it = mockState.items[mockState.index];
  if (!it || (it.type !== 'mc' && it.type !== 'listen')) return;
  if (it._done) return;
  it._done = true;
  var correct = i === it.c;
  for (var k = 0; k < it.o.length; k++) {
    var el = document.getElementById('mock-' + k);
    if (!el) continue;
    el.classList.add('ds');
    if (k === it.c) el.classList.add('ok');
    if (k === i && !correct) el.classList.add('no');
  }
  if (correct) mockState.score++;
  mockState.answers.push({ part: it.part, ok: correct });
  setTimeout(mockNextStep, 500);
}

function mockSubmitText() {
  if (!mockState) return;
  var it = mockState.items[mockState.index];
  if (!it || it._done) return;
  var inp = document.getElementById('mockInput');
  var fb = document.getElementById('mockFeedback');
  if (!inp) return;
  var given = inp.value.trim();
  if (!given) { if (fb) fb.innerHTML = '<span style="color:var(--err)">Javob yozing.</span>'; return; }
  var accepted = (it.a || []).map(mockNorm);
  var correct = accepted.indexOf(mockNorm(given)) > -1;
  it._done = true;
  if (correct) mockState.score++;
  mockState.answers.push({ part: it.part, ok: correct });
  if (fb) {
    fb.innerHTML = correct
      ? '<span style="color:var(--ok);font-weight:700">✅ To‘g‘ri.</span>'
      : '<span style="color:var(--err);font-weight:700">❌ To‘g‘ri javob: ' + (it.a || []).join(' / ') + '</span>';
  }
  inp.disabled = true;
  setTimeout(mockNextStep, 900);
}

function mockSkip() { mockNextStep(); }

function mockNextStep() {
  if (!mockState) return;
  mockStopTimer();
  mockState.index++;
  if (mockState.index >= mockState.items.length) { mockFinish(); return; }
  mockRenderStep();
  var stage = document.getElementById('mockStage');
  if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mockAbort() {
  mockStopTimer();
  mockState = null;
  var stage = document.getElementById('mockStage');
  if (stage) { stage.style.display = 'none'; stage.innerHTML = ''; }
  renderMockPage();
}

function mockFinish() {
  mockStopTimer();
  if (!mockState) return;
  var level = mockState.level;
  var it = mockState.items[mockState.index];

  /* yozma ishni baholash */
  if (it && it.type === 'write' && !it._done) {
    var words = mockWordCountNow();
    localStorage.setItem('mockWriting', (document.getElementById('mockWriting') || {}).value || '');
    var pts = 0;
    if (words >= it.minWords) pts = it.points || 2;
    else if (words >= Math.round(it.minWords * 0.6)) pts = 1;
    mockState.score += pts;
    mockState.answers.push({ part: 'Writing', ok: pts >= (it.points || 2), points: pts });
  }

  var max = mockMaxPoints(level);
  var score = mockState.score;
  var percent = Math.round(score / max * 100);
  var passed = percent >= MOCK_PASS_PERCENT;
  var prev = null;
  try { prev = JSON.parse(localStorage.getItem('mockResult_' + level) || 'null'); } catch (e) { prev = null; }

  var result = {
    score: score, total: max, percent: percent, passed: passed,
    date: new Date().toLocaleDateString('uz-UZ')
  };
  if (!prev || percent >= prev.percent) localStorage.setItem('mockResult_' + level, JSON.stringify(result));
  else result.bestPercent = prev.percent;

  var byPart = {};
  mockState.answers.forEach(function (a) {
    var key = String(a.part).split('·')[0].trim();
    if (!byPart[key]) byPart[key] = { ok: 0, n: 0 };
    byPart[key].n++;
    if (a.ok) byPart[key].ok++;
  });

  var idx = MOCK_ORDER.indexOf(level);
  var next = idx > -1 && idx < MOCK_ORDER.length - 1 ? MOCK_ORDER[idx + 1] : null;
  var nextStatus = next ? mockStatus(next) : null;

  var stage = document.getElementById('mockStage');
  if (stage) {
    stage.innerHTML =
      '<div class="cd" style="cursor:default;text-align:center;padding:28px">' +
        '<div style="font-size:2.6rem;margin-bottom:8px">' + (passed ? '🏅' : '📚') + '</div>' +
        '<h3 style="margin-bottom:6px">' + MOCK_BANK[level].title + ' — natija</h3>' +
        '<p style="font-size:1.15rem;color:var(--tx2);margin-bottom:6px">' + score + '/' + max + ' ball (' + percent + '%)</p>' +
        '<p style="font-weight:700;color:' + (passed ? 'var(--ok)' : 'var(--acc)') + ';margin-bottom:10px">' +
          (passed ? '✅ O‘tdingiz! Keyingi darajaga o‘tishingiz mumkin.' : '🔁 O‘tmadingiz. ' + MOCK_PASS_PERCENT + '% kerak (yana ' + (MOCK_PASS_PERCENT - percent) + '%).') +
        '</p>' +
        '<div class="vl" style="max-width:620px;margin:0 auto 14px;text-align:left">' +
          Object.keys(byPart).map(function (k) {
            return '<div class="vi" style="cursor:default"><b>' + k + '</b><span>' + byPart[k].ok + '/' + byPart[k].n + '</span></div>';
          }).join('') +
        '</div>' +
        (passed ? '' : '<div class="gt" style="text-align:left">Maslahat: xato qilingan qismlar bo‘yicha darslarni qayta o‘qing, ' +
          'so‘ngra imtihonni qayta topshiring. Har bir qayta urinish — mashq.</div>') +
        '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:14px">' +
          '<button class="btn bp" onclick="mockStart(\'' + level + '\')"><i class="fa-solid fa-rotate-right"></i> Qayta topshirish</button>' +
          (next && nextStatus && nextStatus.unlocked
            ? '<button class="btn bo" onclick="mockStart(\'' + next + '\')">Keyingi daraja: ' + next + '</button>'
            : '<button class="btn bo" onclick="go(\'p1\')"><i class="fa-solid fa-book-open"></i> Darslarga o‘tish</button>') +
          '<button class="btn bo" onclick="openMocks()">Barcha daraja imtihonlari</button>' +
        '</div>' +
      '</div>';
    stage.style.display = 'block';
  }
  mockState = null;
  renderMockPage();
}

/* ------------- Daraja tugaganda imtihon taklif qilish (banner) ---------- */
function mockLevelDoneFor(lessonId) {
  var l = (typeof L !== 'undefined' && L) ? L.filter(function (x) { return x.id === lessonId; })[0] : null;
  if (!l) return null;
  var st = mockStatus(l.lv);
  return st.unlocked ? l.lv : null;
}

function mockShowBanner(level) {
  var box = document.getElementById('mockBanner');
  if (!box) return;
  box.innerHTML =
    '<div class="mock-banner">' +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
        '<i class="fa-solid fa-graduation-cap" style="color:var(--acc)"></i>' +
        '<b>' + level + ' daraja tugadi!</b>' +
        '<span style="color:var(--tx2);font-size:.85rem">Endi CEFR uslubidagi daraja imtihonini topshiring.</span>' +
        '<button class="btn bp bs" style="margin-left:auto" onclick="mockStartFromBanner(\'' + level + '\')">Imtihonni boshlash</button>' +
        '<button class="btn bo bs" onclick="mockHideBanner()" aria-label="Yopish"><i class="fa-solid fa-xmark"></i></button>' +
      '</div>' +
    '</div>';
  box.style.display = 'block';
}

function mockHideBanner() {
  var box = document.getElementById('mockBanner');
  if (box) { box.style.display = 'none'; box.innerHTML = ''; }
}

function mockStartFromBanner(level) {
  mockHideBanner();
  openMocks();
  var st = mockStatus(level);
  if (st.unlocked) mockStart(level);
}

/* completeLesson tugagach daraja to‘liq tugaganini tekshirish */
function mockOnLessonCompleted(lessonId) {
  var level = mockLevelDoneFor(lessonId);
  if (!level) return;
  var res = null;
  try { res = JSON.parse(localStorage.getItem('mockResult_' + level) || 'null'); } catch (e) { res = null; }
  if (res && res.passed) return;
  mockShowBanner(level);
}

function mockHookNavigation() {
  if (typeof window === 'undefined') return;
  if (typeof window.go !== 'function' || window.go.__mockHooked) return;
  var original = window.go;
  var wrapper = function (id) {
    original(id);
    if (id === 'p8') { renderMockPage(); updateMockHint(); }
    if (id === 'p1' || id === 'p0') updateMockHint();
  };
  wrapper.__mockHooked = true;
  window.go = wrapper;
}

function mockInstallHook() {
  if (typeof window === 'undefined') return;
  mockHookNavigation();
  if (typeof window.completeLesson !== 'function') return;
  if (window.completeLesson.__mockHooked) return;
  var original = window.completeLesson;
  var wrapper = function (id) {
    original(id);
    try { mockOnLessonCompleted(id); } catch (e) {}
  };
  wrapper.__mockHooked = true;
  window.completeLesson = wrapper;
}

/* -------------------------------- Ishga tushirish ---------------------- */
function mockInit() {
  mockInstallHook();
  if (document.getElementById('mockList')) renderMockPage();
  updateMockHint();
}
function updateMockHint() {
  var el = document.getElementById('mockHint');
  if (!el) return;
  var passed = MOCK_ORDER.filter(function (lv) { return mockStatus(lv).passed; }).length;
  var open = MOCK_ORDER.filter(function (lv) { return mockStatus(lv).unlocked && !mockStatus(lv).passed; }).length;
  el.innerHTML = open
    ? '🎓 <b>' + open + '</b> ta daraja imtihoni tayyor. ' + passed + '/' + MOCK_ORDER.length + ' daraja o‘tilgan.'
    : 'Daraja tugagach, shu darajaning CEFR uslubidagi imtihoni avtomatik ochiladi. O‘tilgan: ' + passed + '/' + MOCK_ORDER.length + '.';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mockInit);
} else {
  mockInit();
}
