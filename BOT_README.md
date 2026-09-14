# 🇺🇸 English Zero-to-Hero Telegram Bot

Ingliz tilini **0 dan (A0–A1)** o'rgatuvchi, 4 ta asosiy ko'nikmani (**Reading, Listening, Writing, Speaking**) kompleks shakllantiruvchi zamonaviy Telegram bot.

---

## 🌟 Asosiy imkoniyatlar

1. **📖 Reading (O'qish va tushunish):**
   * Boshlang'ich darajadagi mini-matnlar va dialoglar.
   * Matn mazmuni bo'yicha interaktiv testlar (Inline quiz).
2. **🎧 Listening (Eshitib tushunish):**
   * Matnni avtomatik ovozli xabarga aylantirish (Text-to-Speech).
   * Eshitib yozish (Audio diktant) va bo'sh o'rinlarni to'ldirish mashqlari.
3. **✍️ Writing (Yozish va grammatika):**
   * O'zbekchadan inglizchaga tarjima va mustaqil jumla tuzish mashqlari.
   * **Google Gemini AI integratsiyasi:** Foydalanuvchi yozgan gapdagi xatolarni real-vaqtda tekshirish, to'g'ri variantni berish va o'zbek tilida tushuntirish.
4. **🗣 Speaking (Gapirish va talaffuz):**
   * Namuna talaffuzni ovozli tarzda eshitish.
   * Foydalanuvchidan ovozli xabar (Voice message) qabul qilish va talaffuzni tahlil qilish.
5. **🗂 Interval takrorlash (Spaced Repetition):**
   * O'rganilgan so'zlarni lug'atga saqlash va vaqti-vaqti bilan qayta eslatish.
6. **🎮 Gamifikatsiya:**
   * Tajriba ballari (XP), ochiluvchi darajalar va umumiy Top-10 reyting (Leaderboard).

---

## 📂 Loyiha tuzilmasi

```text
english_bot/
├── config.py                 # Bot konfiguratsiyasi va .env yuklash
├── main.py                   # Botni ishga tushirish nuqtasi
├── requirements.txt          # Kerakli Python kutubxonalari
├── .env.example              # Muhit o'zgaruvchilari namunasi
├── database/
│   ├── __init__.py
│   └── db.py                 # SQLite asinxron ma'lumotlar bazasi (aiosqlite)
├── services/
│   ├── __init__.py
│   ├── ai_service.py         # Gemini AI bilan xatolarni tekshirish
│   ├── tts_service.py        # Ovoz generatsiyasi (gTTS)
│   └── curriculum.py         # 0 dan boshlanuvchi darslar bazasi
├── keyboards/
│   ├── __init__.py
│   ├── main_menu.py          # Asosiy menyu (Reply) tugmalari
│   └── inline.py             # Darslar va testlar uchun Inline tugmalar
└── handlers/
    ├── __init__.py
    ├── start.py              # /start, profil va reyting boshqaruvi
    ├── lessons.py            # Darslar ro'yxati va tanlash
    └── skills.py             # 4 ta ko'nikma mashqlari va FSM jarayonlari
```

---

## 🚀 O'rnatish va Ishga Tushirish

### 1. Talablar
* Python 3.10 yoki undan yuqori versiya.

### 2. Virtual muhitni yaratish va kutubxonalarni o'rnatish

**Linux / macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Windows:**
```cmd
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Sozlamalarni kiritish (.env)
Fayl nusxasini yarating:
```bash
cp .env.example .env
```
`.env` faylini ochib quyidagi qiymatlarni kiriting:
* `BOT_TOKEN`: [@BotFather](https://t.me/BotFather) dan olingan bot tokeni.
* `GEMINI_API_KEY`: [Google AI Studio](https://aistudio.google.com/) orqali bepul olingan API kaliti (Writing mashqlarini tekshirish uchun).

### 4. Botni ishga tushirish
```bash
python main.py
```

---

## 🌐 Serverga (Render / VPS) yuklash

### Render.com orqali:
1. Loyihani GitHub repository qilib yuklang.
2. Render.com da **New -> Background Worker** (yoki Web Service) tanlang.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `python main.py`
5. **Environment Variables** bo'limiga `BOT_TOKEN` va `GEMINI_API_KEY` ni qo'shing.

---

## ➕ Yangi darslar qo'shish

Yangi dars qo'shish juda oson. Buning uchun `services/curriculum.py` fayliga yangi lug'at, reading matni, listening jumlasi va writing vazifasini kiritishingiz kifoya!
