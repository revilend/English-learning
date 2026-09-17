/* ==========================================================================
   English Zero-to-Hero — AI o'qituvchi
   - Kalit kiritilgan bo'lsa: Google AI (Gemini) API ga to'g'ridan-to'g'ri
     brauzerdan murojaat (sayt statik, server yo'q).
   - Kalit bo'lmasa: oflayn o'qituvchi (lug'at, grammatika tekshiruvi,
     tarjima) ishlaydi — sayt hech qachon "javobsiz" qolmaydi.
   Kalit hech qayerga yuborilmaydi, faqat shu brauzerda (localStorage) saqlanadi.
   ========================================================================== */

var AI_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-flash-latest', 'gemini-1.5-flash-latest'];
var AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/';
var AI_KEY_PAGE = 'https://aistudio.google.com/apikey';
var AI_HISTORY = [];
var AI_LAST_ERROR = '';
var AI_BUSY = false;

/* ------------------------------ Kalit ----------------------------------- */
function aiKey() {
  try {
    return (localStorage.getItem('geminiApiKey') || localStorage.getItem('GEMINI_API_KEY') || '').trim();
  } catch (e) { return ''; }
}
function aiSetKey(k) {
  try {
    if (k) localStorage.setItem('geminiApiKey', String(k).trim());
    else localStorage.removeItem('geminiApiKey');
  } catch (e) {}
  aiStatusChip();
}
function aiHasKey() { return aiKey().length > 15; }

function aiStatusChip() {
  var el = document.getElementById('aiStatus');
  if (!el) return;
  if (aiHasKey()) {
    el.className = 'bg b-a1';
    el.textContent = '🤖 AI: yoqilgan';
    el.title = 'Gemini AI kaliti saqlangan';
  } else {
    el.className = 'bg b-a0';
    el.textContent = '📴 AI: oflayn';
    el.title = 'Kalit kiritilmagan — oflayn o‘qituvchi ishlaydi';
  }
}

/* --------------------------- Sozlamalar paneli -------------------------- */
function aiSettings() {
  var box = document.getElementById('aiBox');
  var chat = document.getElementById('cbox');
  if (!box) return;
  if (chat) chat.classList.remove('op');
  box.classList.add('op');
  aiRenderPanel();
}
function aiCloseSettings() {
  var box = document.getElementById('aiBox');
  if (box) box.classList.remove('op');
}
function aiRenderPanel() {
  var body = document.getElementById('aiPanelBody');
  if (!body) return;
  var key = aiKey();
  body.innerHTML =
    '<div class="msg b" style="max-width:100%">' +
      (aiHasKey()
        ? '✅ <b>Gemini AI yoqilgan.</b> Savollaringiz haqiqiy AI tomonidan javoblanadi (grammatika, tarjima, izoh).'
        : '📴 <b>Hozir oflayn rejim.</b> AI chat ishlaydi, lekin javoblar oddiy qoidaga asoslanadi. Haqiqiy AI uchun pastdan kalit qo‘shing (bepul).') +
    '</div>' +
    '<div class="gt">' +
      '<b>1) Gemini API kaliti</b><br>' +
      'Kalitni <a href="' + AI_KEY_PAGE + '" target="_blank" rel="noopener" style="color:var(--acc)">aistudio.google.com/apikey</a> dan bepul olasiz ' +
      '(Google hisobi bilan, karta talab qilinmaydi). Telegram bot ham xuddi shu <code>GEMINI_API_KEY</code> dan foydalanadi.' +
      '<input class="inp" id="aiKeyInput" type="password" placeholder="AIza... (Gemini API kaliti)" style="margin-top:8px" value="' + (key ? key.replace(/.(?=.{4})/g, '•') : '') + '">' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">' +
        '<button class="btn bp bs" onclick="aiSaveKey()"><i class="fa-solid fa-floppy-disk"></i> Saqlash</button>' +
        '<button class="btn bo bs" onclick="aiTestKey()"><i class="fa-solid fa-plug-circle-check"></i> Sinash</button>' +
        (key ? '<button class="btn bo bs" onclick="aiClearKey()"><i class="fa-solid fa-trash"></i> O‘chirish</button>' : '') +
      '</div>' +
      '<div id="aiKeyOut" style="font-size:.85rem;margin-top:8px">' + (AI_LAST_ERROR ? AI_LAST_ERROR : '') + '</div>' +
      '<p style="color:var(--tx2);font-size:.78rem;margin-top:8px">Kalit faqat shu qurilmada saqlanadi va to‘g‘ridan-to‘g‘ri Google serveriga yuboriladi. Sayt statik (GitHub Pages) bo‘lgani uchun serverda saqlanmaydi.</p>' +
    '</div>' +
    '<div class="gt">' +
      '<b>2) Ovoz</b><br>' +
      'Ovozni tekshirish va nima ishlamayotganini bilish uchun: ' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">' +
        '<button class="btn bp bs" onclick="voiceTest()"><i class="fa-solid fa-volume-high"></i> Ovozni sinash</button>' +
        '<button class="btn bo bs" onclick="voiceStop()"><i class="fa-solid fa-stop"></i> To‘xtatish</button>' +
      '</div>' +
      '<div id="aiVoiceOut" style="font-size:.85rem;margin-top:8px"></div>' +
      '<div style="margin-top:10px">' + voiceDiagnostics() + '</div>' +
      '<p style="color:var(--tx2);font-size:.78rem;margin-top:8px">Mikrofon (nutqni tanish) Chrome/Edge da yaxshi ishlaydi. ' +
      'iPhone Safari va Firefox da mikrofon yozuvi ishlamaydi — u holda mashqni <b>yozib</b> bajarish mumkin, mashq baribir hisobga olinadi.</p>' +
    '</div>';
}
function aiSaveKey() {
  var inp = document.getElementById('aiKeyInput');
  var out = document.getElementById('aiKeyOut');
  if (!inp) return;
  var v = inp.value.trim();
  if (v && v.indexOf('•') > -1) { if (out) out.innerHTML = 'Kalit o‘zgarmadi.'; return; }
  if (v && v.length < 20) { if (out) out.innerHTML = '<span style="color:var(--err)">Kalit juda qisqa ko‘rinadi. To‘liq kalitni nusxalab qo‘ying.</span>'; return; }
  aiSetKey(v);
  AI_HISTORY = [];
  AI_LAST_ERROR = '';
  if (out) out.innerHTML = v ? '✅ Saqlandi. Endi AI savollaringizga haqiqiy javob beradi.' : 'Kalit o‘chirildi — oflayn rejim.';
  aiRenderPanel();
  aiChips();
}
function aiClearKey() {
  aiSetKey('');
  AI_HISTORY = [];
  aiRenderPanel();
}
function aiTestKey() {
  var out = document.getElementById('aiKeyOut');
  if (!aiHasKey()) { if (out) out.innerHTML = '<span style="color:var(--err)">Avval kalitni saqlang.</span>'; return; }
  if (out) out.innerHTML = '⏳ Google serveriga ulanmoqda...';
  aiCallAPI('Reply with exactly: OK', null).then(function (txt) {
    if (out) out.innerHTML = '<span style="color:var(--ok)">✅ AI ishlayapti — javob: ' + aiEscape(txt.slice(0, 40)) + '</span>';
  }, function (err) {
    if (out) out.innerHTML = '<span style="color:var(--err)">❌ ' + aiEscape(err.message) + '</span>';
  });
}

/* ------------------------------- Gemini --------------------------------- */
function aiSystemPrompt() {
  return 'Siz "English Zero-to-Hero" saytining ingliz tili o‘qituvchisiz. Foydalanuvchi — ingliz tilini 0 dan o‘rganayotgan o‘zbek. ' +
    'Qoidalar: (1) qisqa va do‘stona javob bering, 90 so‘zdan oshmasin; (2) foydalanuvchi inglizcha yozgan bo‘lsa — xatolarini tuzatib, ' +
    'to‘g‘ri variantini ko‘rsating va nima uchun xato ekanini o‘zbekcha bir gap bilan tushuntiring; (3) foydalanuvchi o‘zbekcha yozgan bo‘lsa — ' +
    'aniq inglizcha tarjima va 2 ta misol bering; (4) har javobda 1 ta yangi foydali so‘zni ma’nosi bilan qo‘shing; ' +
    '(5) javobni o‘zbekcha (lotin) yozing, inglizcha misollar alohida ko‘rsatilsin.';
}
function aiCallAPI(prompt, history) {
  var key = aiKey();
  if (!key) return Promise.reject(new Error('API kaliti kiritilmagan.'));
  var contents = (history || []).slice(-6).concat([{ role: 'user', parts: [{ text: prompt }] }]);
  var body = {
    systemInstruction: { parts: [{ text: aiSystemPrompt() }] },
    contents: contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
  };
  var i = 0;
  function tryModel() {
    if (i >= AI_MODELS.length) return Promise.reject(new Error('Model topilmadi. Internet aloqasini tekshiring.'));
    var model = AI_MODELS[i++];
    return fetch(AI_ENDPOINT + model + ':generateContent?key=' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.text().then(function (raw) {
        var data = null;
        try { data = JSON.parse(raw); } catch (e) {}
        if (!r.ok) {
          var msg = (data && data.error && data.error.message) || ('HTTP ' + r.status);
          if (r.status === 404) return tryModel(); /* model nomi mos kelmadi — keyingisini sinaymiz */
          if (r.status === 400 && /API key not valid/i.test(msg)) throw new Error('API kalit noto‘g‘ri. Kalitni qayta nusxalab qo‘ying.');
          if (r.status === 403) throw new Error('Kalitga ruxsat yo‘q (403). Google AI Studio dan yangi kalit oling.');
          if (r.status === 429) throw new Error('Bepul limit tugadi (429). Bir daqiqadan so‘ng qayta urinib ko‘ring.');
          throw new Error('AI xatosi: ' + msg);
        }
        var txt = '';
        try {
          (data.candidates[0].content.parts || []).forEach(function (p) { if (p.text) txt += p.text; });
        } catch (e) {}
        if (!txt && data && data.promptFeedback) throw new Error('AI javob bermadi (kontent filtri).');
        if (!txt) throw new Error('Bo‘sh javob keldi.');
        return txt.trim();
      });
    }, function () {
      throw new Error('Internet aloqasi yo‘q — Google serveriga ulanib bo‘lmadi.');
    });
  }
  return tryModel();
}

function aiAsk(text) {
  var history = AI_HISTORY;
  return aiCallAPI(text, history).then(function (reply) {
    AI_HISTORY = history.concat([{ role: 'user', parts: [{ text: text }] }, { role: 'model', parts: [{ text: reply }] }]);
    AI_LAST_ERROR = '';
    return aiMarkdown(reply);
  }, function (err) {
    AI_LAST_ERROR = err.message;
    throw err;
  });
}

function aiEscape(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function aiMarkdown(s) {
  var h = aiEscape(s);
  h = h.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  h = h.replace(/(^|\s)\*([^*\n]+)\*/g, '$1<i>$2</i>');
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/^\s*[-*]\s+/gm, '• ');
  h = h.replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>');
  return h;
}

/* --------------------------- Oflayn o'qituvchi -------------------------- */
var AI_FIXES = [
  [/\bi\b/g, 'I', '«I» har doim katta harf bilan yoziladi.'],
  [/\bhe go\b/gi, 'he goes', '3-shaxs birlikda fe’lga -s qo‘shiladi (he goes).'],
  [/\bshe go\b/gi, 'she goes', '3-shaxs birlikda fe’lga -s qo‘shiladi (she goes).'],
  [/\bit go\b/gi, 'it goes', '3-shaxs birlikda fe’lga -s qo‘shiladi (it goes).'],
  [/\bhe have\b/gi, 'he has', '«he/she/it» bilan «has» ishlatiladi.'],
  [/\bshe have\b/gi, 'she has', '«he/she/it» bilan «has» ishlatiladi.'],
  [/\bi goes\b/gi, 'I go', '«I» bilan fe’l asosiy shaklda bo‘ladi (I go).'],
  [/\bi has\b/gi, 'I have', '«I» bilan «have» ishlatiladi.'],
  [/\bpeoples\b/gi, 'people', '«people» allaqachon ko‘plik.'],
  [/\badvices\b/gi, 'advice', '«advice» sanalmaydigan ot — ko‘plikda «-s» olmaydi.'],
  [/\binformations\b/gi, 'information', '«information» sanalmaydigan ot.'],
  [/\bdid not went\b/gi, 'did not go', '«did» dan keyin fe’l asosiy shaklda: did not go.'],
  [/\bdid you went\b/gi, 'did you go', '«did» dan keyin fe’l asosiy shaklda: did you go?'],
  [/\bmore better\b/gi, 'better', '«better» allaqachon qiyosiy shakl.']
];
var AI_IRREGULAR = { go: 'went', eat: 'ate', see: 'saw', buy: 'bought', come: 'came', take: 'took', make: 'made', do: 'did', have: 'had', is: 'was', are: 'were', meet: 'met', write: 'wrote', read: 'read', say: 'said', get: 'got', give: 'gave', drink: 'drank', sleep: 'slept', study: 'studied', watch: 'watched', play: 'played', visit: 'visited', work: 'worked', travel: 'travelled' };

function aiOfflineCorrect(text) {
  var out = text, notes = [];
  AI_FIXES.forEach(function (f) {
    if (f[0].test(out)) {
      var before = out;
      out = out.replace(f[0], f[1]);
      if (before !== out && f[2] && notes.indexOf(f[2]) === -1) notes.push(f[2]);
    }
    f[0].lastIndex = 0;
  });
  /* o'tgan zamon ishorasi bo'lsa */
  if (/\b(yesterday|last (night|week|month|year))\b/i.test(text)) {
    var m = out.match(/\bI (\w+)\b/i);
    if (m && AI_IRREGULAR[m[1].toLowerCase()] && !/_ed$/.test(m[1]) && m[1].toLowerCase() !== AI_IRREGULAR[m[1].toLowerCase()]) {
      var past = AI_IRREGULAR[m[1].toLowerCase()];
      if (past !== m[1].toLowerCase()) {
        out = out.replace(new RegExp('\\bI ' + m[1] + '\\b'), 'I ' + past);
        notes.push('«yesterday / last week» bilan o‘tgan zamon kerak: I ' + past + '.');
      }
    }
  }
  /* gap oxirida nuqta */
  if (out && !/[.!?]$/.test(out.trim())) out = out.trim() + '.';
  return { text: out, notes: notes };
}

function aiOfflineTranslate(text) {
  var dict = {};
  try {
    if (typeof buildAllWords === 'function') {
      buildAllWords().forEach(function (w) { if (w.uz && !dict[w.uz.toLowerCase()]) dict[w.uz.toLowerCase()] = w.en; });
    }
  } catch (e) {}
  var words = text.toLowerCase().replace(/[.,!?;:]/g, ' ').split(/\s+/).filter(Boolean);
  var hits = [], miss = [];
  words.forEach(function (w) {
    if (dict[w]) { if (hits.indexOf(dict[w]) === -1) hits.push(dict[w]); }
    else miss.push(w);
  });
  return { hits: hits, miss: miss };
}

function aiOffline(text) {
  var t = String(text).trim();
  var low = t.toLowerCase();
  var w = (typeof todaysWord === 'function') ? todaysWord() : { word: 'Practice', tr: 'Mashq', ex: 'Practice makes perfect.' };

  if (/^(salom|assalom|hello|hi|hey|xayrli)\b/.test(low)) {
    return 'Salom! 👋 Men sizning ingliz tili o‘qituvchingizman. Menga inglizcha gap yozing — xatolarni tuzataman; o‘zbekcha yozsangiz — tarjima qilaman.<br><br>' +
      'Kunlik so‘z: <b>' + w.word + '</b> — ' + w.tr + ' (<i>' + w.ex + '</i>)';
  }
  if (low.indexOf('rahmat') > -1 || low.indexOf('thank') > -1) {
    return 'Arzimaydi! 😊 Mashqni davom ettiramiz: bugungi so‘z <b>' + w.word + '</b> — ' + w.tr + '. Shu so‘z bilan bitta gap yozib ko‘ring.';
  }

  var hasUz = /[ʻ’‘]|o'|g'|sh|ch|ng/.test(low) && /\b(men|sen|u|biz|siz|ular|kitob|suv|non|uy|ish|bugun|ertaga|yaxshi|kerak|bor|yo'q|juda|nima|qanday)\b/.test(low);
  var isEnglish = /\b(the|is|are|am|was|were|i|you|he|she|it|we|they|do|does|did|have|has|can|will|my|your|to|in|on|at)\b/.test(low);

  if (hasUz && !isEnglish) {
    var tr = aiOfflineTranslate(t);
    if (tr.hits.length) {
      return '🇬🇧 Tarjima (so‘zma-so‘z): <b>' + tr.hits.join(', ') + '</b><br>' +
        (tr.miss.length ? '<span style="color:var(--tx2)">Lug‘atda topilmadi: ' + aiEscape(tr.miss.join(', ')) + '</span><br>' : '') +
        'To‘liq va tabiiy tarjima uchun AI kalitini qo‘shing (yuqoridagi ⚙️ tugma).';
    }
    return '🇬🇧 Bu gapning tabiiy tarjimasi uchun <b>AI kalit</b> kerak: yuqoridagi <b>⚙️</b> tugmani bosib Gemini kalitini qo‘shsangiz, men haqiqiy AI sifatida aniq tarjima va izoh beraman (bepul).<br><br>' +
      'Hozircha mashq: <b>' + w.word + '</b> — ' + w.tr;
  }

  /* inglizcha gap: xatolarni tuzatamiz */
  var fixed = aiOfflineCorrect(t);
  var changed = fixed.text.toLowerCase() !== t.trim().toLowerCase();
  var html = '';
  if (changed) {
    html += '✍️ <b>To‘g‘rilangan variant:</b> <i>' + aiEscape(fixed.text) + '</i><br>';
    if (fixed.notes.length) html += '<span style="color:var(--tx2)">' + fixed.notes.map(aiEscape).join('<br>') + '</span><br>';
  } else {
    html += '✅ Gapda qo‘pol xato topilmadi — yaxshi! Davom eting.<br>';
  }
  html += '<br>📚 Yangi so‘z: <b>' + w.word + '</b> — ' + w.tr + '. Misol: <i>' + w.ex + '</i>';
  html += '<br><span style="color:var(--tx2);font-size:.8rem">Bu javob oflayn qoidalar asosida. Chuqurroq izoh, erkin suhbat va aniq tarjima uchun ⚙️ dan bepul AI kalitini qo‘shing.</span>';
  return html;
}

/* ------------------------------- Chat ----------------------------------- */
function aiChips() {
  var body = document.getElementById('cbody');
  if (!body) return;
  var old = document.getElementById('aiChips');
  if (old) old.remove();
  var chips = [
    'Salom!',
    'Correct: i goes to school yesterday',
    'Tarjima: Men har kuni ingliz tilini o‘rganaman',
    'Present Perfect qachon ishlatiladi?',
    'Menga 5 ta yangi so‘z bering'
  ];
  var html = '<div id="aiChips" class="chips">' + chips.map(function (c) {
    return '<button class="chip" onclick="aiChip(this)">' + aiEscape(c) + '</button>';
  }).join('') + '</div>';
  body.insertAdjacentHTML('beforeend', html);
  body.scrollTop = body.scrollHeight;
}
function aiChip(btn) {
  var inp = document.getElementById('cinp');
  if (!inp) return;
  inp.value = btn.textContent;
  sMsg();
}
function sMsg() {
  var inp = document.getElementById('cinp'), body = document.getElementById('cbody');
  if (!inp || !body) return;
  var text = inp.value.trim();
  if (!text || AI_BUSY) return;
  body.insertAdjacentHTML('beforeend', '<div class="msg u">' + aiEscape(text) + '</div>');
  inp.value = '';
  body.scrollTop = body.scrollHeight;
  body.insertAdjacentHTML('beforeend', '<div class="msg b typing" id="typing"><span></span><span></span><span></span></div>');
  body.scrollTop = body.scrollHeight;

  function show(html) {
    var t = document.getElementById('typing');
    if (t) t.remove();
    body.insertAdjacentHTML('beforeend', '<div class="msg b">' + html + '</div>');
    var chips = document.getElementById('aiChips');
    if (chips) body.appendChild(chips); /* taklif tugmalari doim pastda turadi */
    body.scrollTop = body.scrollHeight;
    if (typeof addXP === 'function') addXP(5);
  }

  if (aiHasKey()) {
    AI_BUSY = true;
    aiAsk(text).then(function (html) {
      AI_BUSY = false;
      show(html);
    }, function (err) {
      AI_BUSY = false;
      show('<span style="color:var(--err)">⚠️ ' + aiEscape(err.message) + '</span><br>' + aiOffline(text));
    });
  } else {
    setTimeout(function () { show(aiOffline(text)); }, 350);
  }
}
function tChat() {
  var box = document.getElementById('cbox');
  if (!box) return;
  var panel = document.getElementById('aiBox');
  if (panel) panel.classList.remove('op');
  box.classList.toggle('op');
  if (box.classList.contains('op')) {
    aiStatusChip();
    if (!document.getElementById('aiChips')) aiChips();
    var i = document.getElementById('cinp');
    if (i) setTimeout(function () { i.focus(); }, 120);
  }
}

/* -------------------------------- INIT ---------------------------------- */
function aiInit() {
  if (typeof window === 'undefined') return;
  window.sMsg = sMsg;
  window.tChat = tChat;
  window.aiSettings = aiSettings;
  window.aiSaveKey = aiSaveKey;
  window.aiTestKey = aiTestKey;
  window.aiClearKey = aiClearKey;
  window.aiChip = aiChip;
  window.aiCloseSettings = aiCloseSettings;
  aiStatusChip();
  aiChips();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aiInit);
else aiInit();
