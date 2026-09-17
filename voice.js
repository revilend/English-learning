/* ==========================================================================
   English Zero-to-Hero — Voice (ovoz)
   1) Text-to-speech: brauzer ovozini ishonchli ishlatish
      - ovozlar ro'yxati kech yuklanishi (voiceschanged) hisobga olinadi
      - uzun matn bo'laklarga bo'linadi (Chrome 15 sekundda to'xtatadi)
      - xatolar foydalanuvchiga tushunarli qilib ko'rsatiladi
   2) Mikrofon: SpeechRecognition ishlamasa — sababi aytiladi va yozib
      javob berish imkoniyati beriladi (mashq baribir bajariladi).
   ========================================================================== */

var VOICE = {
  ttsSupported: (typeof window !== 'undefined' && 'speechSynthesis' in window),
  srSupported: (typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)),
  voices: 0,
  lang: '',
  lastError: null,
  busy: false
};

function voiceIframe() {
  try { return window.self !== window.top; } catch (e) { return true; }
}

function voiceVoices() {
  if (!VOICE.ttsSupported) return [];
  try { return window.speechSynthesis.getVoices() || []; } catch (e) { return []; }
}

function voicePick() {
  var v = voiceVoices();
  VOICE.voices = v.length;
  if (!v.length) return null;
  var pref = ['Google US English', 'Google UK English Female', 'Microsoft Aria', 'Microsoft Jenny', 'Samantha', 'Daniel', 'Karen'];
  var i, j;
  for (i = 0; i < pref.length; i++) {
    for (j = 0; j < v.length; j++) {
      if (v[j].name && v[j].name.indexOf(pref[i]) > -1) return v[j];
    }
  }
  for (i = 0; i < v.length; i++) if (/^en[-_]US/i.test(v[i].lang || '')) return v[i];
  for (i = 0; i < v.length; i++) if (/^en/i.test(v[i].lang || '')) return v[i];
  return null;
}

/* Chrome uzun matnni ~15 sekunddan keyin to'xtatadi, shuning uchun bo'laklarga bo'lamiz */
function voiceChunk(text) {
  var clean = String(text == null ? '' : text).split('|').join('. ').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  if (clean.length <= 170) return [clean];
  var parts = [], buf = '';
  clean.split(' ').forEach(function (w) {
    if ((buf + ' ' + w).trim().length > 160) {
      if (buf.trim()) parts.push(buf.trim());
      buf = w;
    } else {
      buf = (buf + ' ' + w).trim();
      if (/[.!?]$/.test(w) && buf.length > 90) { parts.push(buf.trim()); buf = ''; }
    }
  });
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function voiceNotify(msg) {
  var el = document.getElementById('voiceOut') || document.getElementById('aiVoiceOut');
  if (el) el.innerHTML = msg;
  else console.warn('[voice] ' + msg.replace(/<[^>]+>/g, ''));
}

/* Asosiy: matnni ovoz chiqarib o'qish */
function voiceSay(text, opts) {
  opts = opts || {};
  if (!VOICE.ttsSupported) {
    voiceNotify('⚠️ Bu brauzer ovoz chiqara olmaydi. Chrome yoki Safari dan foydalaning.');
    if (opts.onFail) opts.onFail();
    return false;
  }
  if (!text) return false;
  var synth = window.speechSynthesis;
  var parts = voiceChunk(text);
  if (!parts.length) return false;
  VOICE.busy = true;
  VOICE.lastError = null;
  try { synth.cancel(); } catch (e) {}

  var i = 0, keep = null;
  function speakNext() {
    if (i >= parts.length) {
      VOICE.busy = false;
      if (keep) { clearInterval(keep); keep = null; }
      if (opts.onDone) opts.onDone();
      return;
    }
    var u = new SpeechSynthesisUtterance(parts[i++]);
    var v = voicePick();
    u.lang = (v && v.lang) ? v.lang : 'en-US';
    VOICE.lang = u.lang;
    if (v) u.voice = v;
    u.rate = opts.rate || 0.92;
    u.pitch = 1;
    u.volume = 1;
    u.onend = function () { setTimeout(speakNext, 70); };
    u.onerror = function (e) {
      var err = (e && e.error) || 'unknown';
      VOICE.lastError = err;
      if (err === 'interrupted' || err === 'canceled') return;
      VOICE.busy = false;
      if (keep) { clearInterval(keep); keep = null; }
      var why = err === 'not-allowed'
        ? 'Brauzer ovozga ruxsat bermadi (sahifani bosganingizdan keyin qayta urinib ko‘ring).'
        : (err === 'audio-busy' ? 'Boshqa ovoz ijro etilmoqda — birozdan so‘ng qayta bosing.' : 'Ovoz chiqarishda xatolik: ' + err + '.');
      voiceNotify('⚠️ ' + why + (voiceIframe() ? '<br>Preview oynasida ovoz bloklanishi mumkin — saytni to‘g‘ridan-to‘g‘ri ochib ko‘ring.' : ''));
      if (opts.onFail) opts.onFail();
    };
    try { synth.speak(u); } catch (e) { VOICE.lastError = 'speak-exception'; voiceNotify('⚠️ Ovoz chiqarib bo‘lmadi.'); }
  }

  function begin() {
    /* Chrome uchun: cancel() dan keyin darhol speak() qilinsa ovoz tushib qolishi mumkin */
    setTimeout(speakNext, 80);
    if (String(text).length > 220) {
      keep = setInterval(function () {
        if (!synth.speaking) { clearInterval(keep); keep = null; return; }
        try { synth.resume(); } catch (e) {}
      }, 8000);
    }
  }

  if (!voiceVoices().length) {
    /* Ovozlar ro'yxati hali yuklanmagan bo'lishi mumkin */
    var fired = false;
    var onReady = function () {
      if (fired) return;
      fired = true;
      try { synth.onvoiceschanged = null; } catch (e) {}
      voicePick();
      begin();
    };
    try {
      if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', onReady);
      else synth.onvoiceschanged = onReady;
    } catch (e) {}
    setTimeout(onReady, 700); /* ovoz ro'yxati umuman bo'lmasa ham o'qib ko'ramiz */
  } else {
    begin();
  }
  return true;
}

function voiceStop() {
  if (VOICE.ttsSupported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  VOICE.busy = false;
}

function voiceTest() {
  var out = document.getElementById('aiVoiceOut');
  if (out) out.innerHTML = '🔊 Tekshirilmoqda...';
  voiceSay('Hello! I am your English teacher. Let us practise speaking together.', {
    onDone: function () {
      if (out) out.innerHTML = '✅ Ovoz ishlayapti (' + (VOICE.voices || voiceVoices().length) + ' ta ovoz topildi, til: ' + (VOICE.lang || 'en-US') + ').';
    },
    onFail: function () {
      if (out) out.innerHTML = '⚠️ Ovoz chiqmadi. Telefonda: <b>Sozlamalar → Ovoz</b> bo‘limida ovoz o‘chirilmaganini va <b>media ovozi</b> yoqilganini tekshiring. Chrome ishlatsangiz ancha yaxshi ishlaydi.';
    }
  });
}

function voiceDiagnostics() {
  var v = voiceVoices().length;
  var rows = [
    ['Brauzer ovoz chiqarishi (TTS)', VOICE.ttsSupported ? '✅ ishlaydi' : '❌ yo‘q'],
    ['Topilgan ovozlar soni', VOICE.ttsSupported ? (v ? '✅ ' + v + ' ta' : '⚠️ 0 ta (ovoz paketi o‘rnatilmagan bo‘lishi mumkin)') : '—'],
    ['Mikrofon (nutqni tanish)', VOICE.srSupported ? '✅ ishlaydi' : '❌ yo‘q (Safari/Firefox da cheklangan)'],
    ['Xavfsiz ulanish (https)', (typeof location !== 'undefined' && location.protocol === 'https:') ? '✅ ha' : '⚠️ http — mikrofon ishlamaydi'],
    ['Preview oynasi (iframe)', voiceIframe() ? '⚠️ ha — mikrofon bloklangan bo‘lishi mumkin' : '✅ yo‘q (to‘g‘ridan-to‘g‘ri sayt)'],
    ['Oxirgi xato', VOICE.lastError ? '⚠️ ' + VOICE.lastError : '✅ yo‘q']
  ];
  return '<div class="vl">' + rows.map(function (r) {
    return '<div class="vi" style="cursor:default"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>';
  }).join('') + '</div>' +
    '<div class="gt" style="margin-top:10px">Mikrofon ishlamasa: brauzer ruxsatini bering (manzil yonidagi 🔒 belgisi → Mikrofon → Ruxsat), ' +
    'preview oynasi o‘rniga saytni to‘g‘ridan-to‘g‘ri oching va telefon ovozini yoqing. Ishlamasa ham mashqni <b>yozib</b> bajarish mumkin.</div>';
}

/* ============================ MIKROFON ================================== */
function voiceTargetPhrase() {
  try {
    var lessons = (typeof L !== 'undefined') ? L : [];
    var id = (typeof activeLesson !== 'undefined') ? activeLesson : null;
    var l = lessons.filter(function (x) { return x.id === id; })[0];
    if (l && l.ws) return l.ws;
  } catch (e) {}
  return '';
}

function voiceSim(a, b) {
  var A = String(a || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  var B = String(b || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  if (!B.length) return 0;
  var hit = B.filter(function (w) { return A.indexOf(w) > -1; }).length;
  return Math.round(hit / B.length * 100);
}

function voiceTypedCheck() {
  var inp = document.getElementById('speechTyped');
  var fb = document.getElementById('speechTypedFb');
  if (!inp || !fb) return;
  var target = voiceTargetPhrase();
  var val = inp.value.trim();
  if (!val) { fb.innerHTML = '<span style="color:var(--err)">Gapni yozing.</span>'; return; }
  var sim = voiceSim(val, target);
  var good = sim >= 60;
  fb.innerHTML = good
    ? '<span style="color:var(--ok);font-weight:700">✅ Yaxshi! O‘xshashlik: ' + sim + '%. +10 XP</span>'
    : '<span style="color:var(--acc);font-weight:700">✍️ O‘xshashlik: ' + sim + '%.</span> Namuna: <i>' + target + '</i>';
  if (good && typeof addXP === 'function') {
    addXP(10);
    if (typeof activeLesson !== 'undefined' && typeof markSkill === 'function') markSkill(activeLesson, 'speaking');
  }
}

function voiceFallback(reason) {
  var out = document.getElementById('speechOut');
  if (!out) return;
  var target = voiceTargetPhrase();
  out.innerHTML =
    '<div style="color:var(--acc);font-weight:700">⚠️ ' + reason + '</div>' +
    '<div style="margin-top:8px">Ovoz o‘rniga mashqni <b>yozib</b> bajaring (mashq hisobga olinadi):</div>' +
    '<input class="inp" id="speechTyped" style="margin-top:8px" placeholder="Namunani yozing: ' + (target || 'Write the sentence') + '">' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">' +
      '<button class="btn bp bs" onclick="voiceTypedCheck()"><i class="fa-solid fa-check"></i> Tekshirish</button>' +
      (target ? '<button class="btn bo bs" onclick="speakWord(\'' + String(target).replace(/'/g, '’') + '\')"><i class="fa-solid fa-volume-high"></i> Namunani eshitish</button>' : '') +
      '<button class="btn bo bs" onclick="voiceHelp()"><i class="fa-solid fa-circle-info"></i> Nega ishlamadi?</button>' +
    '</div>' +
    '<div id="speechTypedFb" style="margin-top:8px"></div>';
}

function voiceHelp() {
  var out = document.getElementById('speechOut');
  if (!out) return;
  out.innerHTML = voiceDiagnostics();
}

function startSpeech() {
  var out = document.getElementById('speechOut');
  var btn = document.getElementById('micBtn');
  if (!out) return;

  if (VOICE.busy) { voiceStop(); }

  if (typeof location !== 'undefined' && location.protocol !== 'https:' && location.hostname !== 'localhost') {
    voiceFallback('Mikrofon faqat https orqali ishlaydi.');
    return;
  }
  if (!VOICE.srSupported) {
    voiceFallback('Bu brauzer nutqni taniy olmaydi (iPhone Safari va Firefox da bu funksiya yo‘q). Chrome yoki kompyuterdagi brauzerda ochib ko‘ring.');
    return;
  }

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  if (btn) btn.classList.add('recording');
  out.innerHTML = '🎙 <b>Gapiring...</b> (inglizcha, balandroq)';

  var finished = false;
  function done() {
    if (finished) return;
    finished = true;
    if (btn) btn.classList.remove('recording');
  }

  rec.onresult = function (e) {
    var said = '';
    for (var i = e.resultIndex; i < e.results.length; i++) said += e.results[i][0].transcript;
    said = said.trim();
    if (!said) return;
    var target = voiceTargetPhrase();
    var sim = voiceSim(said, target);
    var good = sim >= 60;
    out.innerHTML =
      '🗣 Siz aytdingiz: <b>' + said + '</b>' +
      (target ? '<br>' + (good
        ? '<span style="color:var(--ok);font-weight:700">✅ Juda yaxshi! Aniqlik: ' + sim + '%. +10 XP</span>'
        : '<span style="color:var(--acc)">Aniqlik: ' + sim + '%.</span> Namuna: <i>' + target + '</i> — yana urinib ko‘ring.') : '');
    if (good) {
      if (typeof addXP === 'function') addXP(10);
      if (typeof activeLesson !== 'undefined' && typeof markSkill === 'function') markSkill(activeLesson, 'speaking');
    }
    if (target) speakWord(target);
    done();
  };

  rec.onerror = function (e) {
    done();
    var code = (e && e.error) || 'unknown';
    VOICE.lastError = code;
    var msg = {
      'not-allowed': 'Mikrofon ruxsat berilmagan. Manzil yonidagi 🔒 belgisini bosib, Mikrofon → Ruxsat bering.',
      'service-not-allowed': 'Brauzer mikrofon xizmatiga ruxsat bermadi.' + (voiceIframe() ? ' Preview oynasi mikrofonni bloklaydi — saytni to‘g‘ridan-to‘g‘ri (yangi oynada) oching.' : ''),
      'audio-capture': 'Mikrofon topilmadi (qurilmaga ulanmagan yoki band).',
      'no-speech': 'Hech narsa eshitilmadi — mikrofonni yaqinroq tutib, balandroq gapiring.',
      'network': 'Internet aloqasi yo‘q — nutqni tanish uchun internet kerak.',
      'aborted': 'Yozib olish to‘xtatildi.'
    }[code] || ('Xatolik: ' + code);
    voiceFallback(msg + (voiceIframe() ? ' <br><b>Maslahat:</b> Freebuff preview oynasida mikrofon ko‘pincha bloklanadi — saytni <b>revilend.github.io/English-learning</b> manzilida to‘g‘ridan-to‘g‘ri oching.' : ''));
  };

  rec.onend = done;

  /* Avval ruxsatni so'raymiz — xato sababini aniq bilish uchun */
  var started = false;
  function begin() {
    if (started) return;
    started = true;
    try { rec.start(); } catch (err) {
      done();
      voiceFallback('Mikrofonni ishga tushirib bo‘lmadi: ' + (err && err.name ? err.name : 'xato'));
    }
  }
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      stream.getTracks().forEach(function (t) { t.stop(); });
      begin();
    }, function (err) {
      done();
      var name = (err && err.name) || '';
      var why = name === 'NotAllowedError'
        ? 'Mikrofon ruxsat berilmagan.'
        : (name === 'NotFoundError' ? 'Mikrofon topilmadi.' : (name === 'NotReadableError' ? 'Mikrofon boshqa dasturda band.' : 'Mikrofon ochilmadi (' + name + ').'));
      voiceFallback(why + (voiceIframe() ? ' Preview oynasi mikrofonni bloklashi mumkin — saytni to‘g‘ridan-to‘g‘ri oching.' : ''));
    });
  } else {
    begin();
  }
}

/* =============================== INIT =================================== */
function voiceInit() {
  if (typeof window === 'undefined') return;
  /* app.js dagi oddiy versiyalarni ishonchli versiyalar bilan almashtiramiz */
  window.speakWord = function (text) { return voiceSay(text); };
  window.startSpeech = startSpeech;
  window.voiceTest = voiceTest;
  window.voiceStop = voiceStop;
  window.deviceSpeak = voiceSay;
  if (VOICE.ttsSupported) {
    voicePick();
    try {
      var synth = window.speechSynthesis;
      var h = function () { voicePick(); };
      if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', h);
      else synth.onvoiceschanged = h;
    } catch (e) {}
    /* Ba'zi brauzerlarda birinchi bosishda ovoz "uxlab qoladi" */
    document.addEventListener('click', function once() {
      try { window.speechSynthesis.resume(); } catch (e) {}
      document.removeEventListener('click', once);
    });
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', voiceInit);
else voiceInit();
