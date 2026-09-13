from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import CommandStart
from database import db
from keyboards import get_main_menu

router = Router()

@router.message(CommandStart())
async def cmd_start(message: Message):
    user = await db.get_or_create_user(
        user_id=message.from_user.id,
        username=message.from_user.username or "",
        full_name=message.from_user.full_name or "O'quvchi"
    )
    
    welcome_text = (
        f"Assalomu alaykum, <b>{message.from_user.full_name}</b>! 🇺🇸\n\n"
        "<b>English Zero-to-Hero</b> botiga xush kelibsiz!\n\n"
        "Bu bot ingliz tilini <b>0 dan</b> boshlab eng samarali 4 ta yo'nalishda o'rgatadi:\n"
        "• 📖 <b>Reading</b> (O'qish va tushunish)\n"
        "• 🎧 <b>Listening</b> (Eshitib tushunish & diktant)\n"
        "• ✍️ <b>Writing</b> (AI orqali grammatika va jumla tuzish)\n"
        "• 🗣 <b>Speaking</b> (Ovozli xabar orqali talaffuz va gapirish)\n\n"
        "O'rganishni boshlash uchun quyidagi <b>'📚 Darslar'</b> tugmasini bosing!"
    )
    await message.answer(welcome_text, reply_markup=get_main_menu(), parse_mode="HTML")

@router.message(F.text == "👤 Profil va Natijalar")
async def show_profile(message: Message):
    user = await db.get_user(message.from_user.id)
    if not user:
        await message.answer("Profil ma'lumotlari topilmadi. /start ni bosing.")
        return

    text = (
        f"👤 <b>Foydalanuvchi:</b> {user['full_name']}\n"
        f"🎯 <b>Daraja:</b> {user['level']}\n"
        f"📖 <b>Ochiq dars:</b> {user['current_lesson']}-dars\n"
        f"⭐ <b>To'plangan ball (XP):</b> {user['xp']} XP\n"
        f"🔥 <b>Kunlik streak:</b> {user['streak']} kun\n"
    )
    await message.answer(text, parse_mode="HTML")

@router.message(F.text == "🏆 Reyting (Leaderboard)")
async def show_leaderboard(message: Message):
    leaders = await db.get_leaderboard(limit=10)
    if not leaders:
        await message.answer("Hozircha reyting mavjud emas.")
        return

    text = "🏆 <b>Eng faol o'quvchilar reytingi (Top-10):</b>\n\n"
    medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    for idx, u in enumerate(leaders):
        medal = medals[idx] if idx < len(medals) else f"{idx+1}."
        name = u['full_name'] or u['username'] or "O'quvchi"
        text += f"{medal} <b>{name}</b> — {u['xp']} XP ({u['current_lesson']}-dars)\n"

    await message.answer(text, parse_mode="HTML")

@router.message(F.text == "ℹ️ Qanday o'rganiladi?")
async def how_it_works(message: Message):
    text = (
        "💡 <b>Tez va samarali o'rganish metodikasi:</b>\n\n"
        "1. <b>Mikro-darslar:</b> Kuniga 5-10 daqiqa ajratish kifoya.\n"
        "2. <b>4 tomonlama mashq:</b> Har bir darsda faqat nazariya emas, 4 ta ko'nikma (o'qish, tinglash, yozish, gapirish) amalda bajariladi.\n"
        "3. <b>AI tahlil:</b> Yozgan jumlalaringizni sun'iy intellekt tekshiradi va xatolaringizni o'zbek tilida tushuntiradi.\n"
        "4. <b>Interaktiv ovoz:</b> Ovozli xabarlar yuborib talaffuzingizni charxlaysiz."
    )
    await message.answer(text, parse_mode="HTML")

@router.message(F.text == "🗂 So'z boyligi (Lug'at)")
async def vocab_review(message: Message):
    words = await db.get_words_for_review(message.from_user.id, limit=5)
    if not words:
        await message.answer("Hozircha takrorlash uchun so'zlar yo'q. Darslarni yakunlab boring va yangi so'zlar avtomatik qo'shiladi! 🚀")
        return

    text = "🗂 <b>Bugungi takrorlash so'zlari (Interval Repetition):</b>\n\n"
    for w in words:
        text += f"🔹 <b>{w['word']}</b> — {w['translation']}\n"
    text += "\nBu so'zlarni xotirada mustahkamlang!"
    await message.answer(text, parse_mode="HTML")
