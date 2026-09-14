from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from database import db
from keyboards import get_main_menu
from services.ai_service import ai_service
from services.level_test import LEVEL_TEST_QUESTIONS, calculate_level
from services.word_of_day import get_word_of_day
from services.achievements import check_achievements, format_achievement, ACHIEVEMENTS
from services.pronunciation import get_random_practice, format_practice_message
from services.grammar_tips import get_tip_of_day, get_random_tip, format_tip_message
from keyboards.inline import get_level_test_keyboard
from services.pronunciation import get_random_practice, format_practice_message
from services.grammar_tips import get_tip_of_day, get_random_tip, format_tip_message


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


# ----------------- WORD OF THE DAY -----------------
@router.message(F.text == "📖 Kunlik so'z")
async def word_of_day(message: Message):
    word = get_word_of_day()
    text = (
        f"📖 <b>Bugungi so'z:</b>\n\n"
        f"🔤 <b>{word['word']}</b> — {word['translation']}\n"
        f"📝 <b>Misol:</b> <i>{word['example']}</i>\n"
        f"📊 <b>Daraja:</b> {word['level']}\n\n"
        "💡 Bu so'zni eslab qoling va kun davomida ishlatishga harakat qiling!"
    )
    await message.answer(text, parse_mode="HTML")


# ----------------- ACHIEVEMENTS -----------------
@router.message(F.text == "🏆 Yutuqlarim")
async def show_achievements(message: Message):
    user = await db.get_user(message.from_user.id)
    if not user:
        await message.answer("Profil topilmadi. /start ni bosing.")
        return

    # Yutuqlarni tekshirish
    completed_lessons = user.get("current_lesson", 1) - 1
    streak = user.get("streak", 1)
    new_achievements = check_achievements(user, completed_lessons, streak)

    text = "🏆 <b>Sizning yutuqlaringiz:</b>\n\n"
    for a_id in new_achievements:
        text += f"{format_achievement(a_id)}\n\n"

    if not new_achievements:
        text += "Hozircha yutuqlar yo'q. Darslarni yakunlab yutuqlar to'plang! 💪"

    text += f"\n📊 <b>Umumiy:</b> {len(new_achievements)}/{len(ACHIEVEMENTS)} yutuq"
    await message.answer(text, parse_mode="HTML")


# ----------------- DAILY GOALS -----------------
@router.message(F.text == "🎯 Kunlik maqsadlar")
async def daily_goals(message: Message):
    user = await db.get_user(message.from_user.id)
    if not user:
        await message.answer("Profil topilmadi. /start ni bosing.")
        return

    xp = user.get("xp", 0)
    streak = user.get("streak", 1)
    lesson = user.get("current_lesson", 1)

    # Kunlik maqsadlar
    daily_xp_goal = 50
    daily_lesson_goal = 1
    weekly_xp_goal = 350

    text = (
        f"🎯 <b>Bugungi maqsadlaringiz:</b>\n\n"
        f"⭐ <b>XP:</b> {xp % daily_xp_goal}/{daily_xp_goal} (kunlik)\n"
        f"📚 <b>Dars:</b> {daily_lesson_goal} ta dars yakunlash\n"
        f"🔥 <b>Streak:</b> {streak} kun davom ettirish\n\n"
        f"📈 <b>Haftalik maqsad:</b> {xp % weekly_xp_goal}/{weekly_xp_goal} XP\n\n"
        "💡 <b>Maslahat:</b> Kuniga 5-10 daqiqa ajrating va streak'ni sindirmang!"
    )
    await message.answer(text, parse_mode="HTML")


# ----------------- LEVEL TEST -----------------
class LevelTestStates(StatesGroup):
    in_test = State()

@router.message(F.text == "📝 Daraja testi")
async def start_level_test(message: Message, state: FSMContext):
    await state.update_data(current_q=0, answers={}, correct=0)
    
    welcome = (
        "📝 <b>Ingliz tili daraja testi</b>\n\n"
        "20 ta savolga javob bering. Natijaga qarab Sizning darajangiz aniqlanadi:\n"
        "• <b>A0</b> — Boshlang'ich\n"
        "• <b>A1</b> — Elementar\n"
        "• <b>A2</b> — O'rtacha\n"
        "• <b>B1</b> — O'rta\n\n"
        "Tayyor bo'lsangiz, <b>Boshlash</b> tugmasini bosing!"
    )
    await message.answer(welcome, reply_markup=get_level_test_keyboard(0), parse_mode="HTML")
    await state.set_state(LevelTestStates.in_test)

@router.callback_query(F.data.startswith("lt_start"))
async def level_test_next(callback: CallbackQuery, state: FSMContext):
    data = await state.get_data()
    current_q = data.get("current_q", 0)
    
    if current_q >= len(LEVEL_TEST_QUESTIONS):
        # Test tugadi — natijani hisoblash
        answers = data.get("answers", {})
        result = calculate_level(answers)
        
        # Foydalanuvchi darajasini yangilash
        await db.update_user_level(callback.from_user.id, result["level"], result["lesson_start"])
        
        text = (
            f"🎉 <b>Test tugadi!</b>\n\n"
            f"📊 <b>Natija:</b> {result['score']}/{result['total']} ({result['score_percent']}%)\n\n"
            f"🎯 <b>Sizning darajangiz: {result['level']}</b>\n"
            f"📖 <b>Boshlash darsi:</b> {result['lesson_start']}-dars\n\n"
            f"💡 {result['description']}\n\n"
            f"📚 Endi <b>'📚 Darslar'</b> tugmasini bosib o'rganishni boshlashingiz mumkin!"
        )
        await callback.message.edit_text(text, parse_mode="HTML")
        await state.clear()
        await callback.answer()
        return
    
    q = LEVEL_TEST_QUESTIONS[current_q]
    text = (
        f"❓ <b>Savol {current_q + 1}/{len(LEVEL_TEST_QUESTIONS)}</b>\n\n"
        f"{q['question']}"
    )
    await callback.message.edit_text(
        text,
        reply_markup=get_level_test_keyboard(current_q),
        parse_mode="HTML"
    )
    await callback.answer()

@router.callback_query(F.data.startswith("lt_"))
async def handle_level_test_answer(callback: CallbackQuery, state: FSMContext):
    parts = callback.data.split("_")
    q_index = int(parts[1])
    selected = int(parts[2])
    
    data = await state.get_data()
    answers = data.get("answers", {})
    current_q = data.get("current_q", 0)
    
    q = LEVEL_TEST_QUESTIONS[q_index]
    answers[q["id"]] = selected
    
    await state.update_data(answers=answers, current_q=current_q + 1)
    
    # Keyingi savolga o'tish
    await level_test_next(callback, state)



# ----------------- PRONUNCIATION PRACTICE -----------------
@router.message(F.text == "🗣 Talaffuz mashqi")
async def pronunciation_practice(message: Message):
    practice = get_random_practice()
    text = format_practice_message(practice)
    await message.answer(text, parse_mode="HTML")


# ----------------- GRAMMAR TIP OF THE DAY -----------------
@router.message(F.text == "📘 Kunlik grammatika")
async def grammar_tip(message: Message):
    tip = get_tip_of_day()
    text = format_tip_message(tip)
    await message.answer(text, parse_mode="HTML")


# ----------------- AI CHAT (Oddiy yozishmalar) -----------------
# Bu handler boshqa handlerlardan keyin kelishi kerak,
# shuning uchun eng oxirida

# ----------------- PRONUNCIATION PRACTICE -----------------
@router.message(F.text == "🗣 Talaffuz mashqi")
async def pronunciation_practice(message: Message):
    practice = get_random_practice()
    text = format_practice_message(practice)
    await message.answer(text, parse_mode="HTML")


# ----------------- GRAMMAR TIP OF THE DAY -----------------
@router.message(F.text == "📘 Kunlik grammatika")
async def grammar_tip(message: Message):
    tip = get_tip_of_day()
    text = format_tip_message(tip)
    await message.answer(text, parse_mode="HTML")


# ----------------- AI CHAT (Voice messages) -----------------
@router.message(F.voice)
async def ai_voice_handler(message: Message):
    """Foydalanuvchi ovozli xabar yuborsa — AI javob beradi."""
    wait_msg = await message.answer("🤖 <i>Ovozingiz qabul qilindi!</i>", parse_mode="HTML")

    # Voice message uchun audio faylni saqlash
    file_info = await message.bot.get_file(message.voice.file_id)
    file_path = file_info.file_path
    
    # Transkripsiya qilishga harakat qilish
    transcribed = await ai_service.transcribe_voice(file_path)
    
    if transcribed:
        # Agar muvaffaqiyatli transkripsiya qilinsa
        user_name = message.from_user.full_name or "O'quvchi"
        response = await ai_service.chat(transcribed, user_name)
        try:
            await wait_msg.delete()
        except Exception:
            pass
        await message.answer(
            f"🗣 <b>Siz aytdingiz:</b> <i>{transcribed}</i>\n\n"
            f"{response}",
            parse_mode="HTML"
        )
    else:
        # Transkripsiya mumkin bo'lmasa
        try:
            await wait_msg.delete()
        except Exception:
            pass
        await message.answer(
            "🗣 <b>Ovozli xabar qabul qilindi!</b>\n\n"
            "Hozircha ovozni matnga aylantirish to'liq ishlamayapti.\n"
            "Iltimos, matn ko'rinishida yozing: 💬\n\n"
            "💡 <b>Maslahatlar:</b>\n"
            "• Inglizcha yozsangiz — grammatikangizni tekshiraman\n"
            "• O'zbekcha yozsangiz — tarjima beraman\n"
            "• Savol bering — javob beraman\n"
            "• Grammatika so'rang — tushuntiraman",
            parse_mode="HTML"
        )



# ----------------- PRONUNCIATION PRACTICE -----------------
@router.message(F.text == "🗣 Talaffuz mashqi")
async def pronunciation_practice(message: Message):
    practice = get_random_practice()
    text = format_practice_message(practice)
    await message.answer(text, parse_mode="HTML")


# ----------------- GRAMMAR TIP OF THE DAY -----------------
@router.message(F.text == "📘 Kunlik grammatika")
async def grammar_tip(message: Message):
    tip = get_tip_of_day()
    text = format_tip_message(tip)
    await message.answer(text, parse_mode="HTML")


# ----------------- AI CHAT (Oddiy yozishmalar) -----------------
# Bu handler boshqa handlerlardan keyin kelishi kerak,
# shuning uchun eng oxirida
@router.message(F.text & ~F.text.startswith("/"))
async def ai_chat_handler(message: Message):
    """Foydalanuvchi oddiy matn yozganda AI javob beradi."""
    user_text = message.text.strip()
    
    # Agar menyu tugmalari bo'lsa — o'tkazib yuborish
    menu_buttons = [
        "📚 Darslar (0 dan A1 ga)", "🗂 So'z boyligi (Lug'at)",
        "👤 Profil va Natijalar", "🏆 Reyting (Leaderboard)",
        "ℹ️ Qanday o'rganiladi?", "📝 Daraja testi",
        "📖 Kunlik so'z", "🎯 Kunlik maqsadlar", "🏆 Yutuqlarim",
        "🗣 Talaffuz mashqi", "📘 Kunlik grammatika"
    ]
    if user_text in menu_buttons:
        return
    
    wait_msg = await message.answer("🤖 <i>AI tahlil qilmoqda...</i>", parse_mode="HTML")
    
    user_name = message.from_user.full_name or "O'quvchi"
    response = await ai_service.chat(user_text, user_name)
    
    try:
        await wait_msg.delete()
    except Exception:
        pass
    
    await message.answer(response, parse_mode="HTML")
