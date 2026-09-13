from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from database import db
from services.curriculum import get_lesson, LESSONS
from keyboards.inline import get_lessons_keyboard, get_skills_keyboard

router = Router()

@router.message(F.text == "📚 Darslar (0 dan A1 ga)")
async def show_lessons_menu(message: Message):
    user = await db.get_user(message.from_user.id)
    current_lesson = user["current_lesson"] if user else 1
    
    text = (
        "📚 <b>Ingliz tili darslari (0 dan):</b>\n\n"
        "Har bir darsni to'liq yakunlash uchun uning <b>4 ta ko'nikmasini</b> (Reading, Listening, Writing, Speaking) bajarishingiz kerak.\n\n"
        "Darsni tanlang:"
    )
    await message.answer(text, reply_markup=get_lessons_keyboard(current_lesson), parse_mode="HTML")

@router.callback_query(F.data == "back_to_lessons")
async def back_to_lessons(callback: CallbackQuery):
    user = await db.get_user(callback.from_user.id)
    current_lesson = user["current_lesson"] if user else 1
    await callback.message.edit_text(
        "📚 <b>Darsni tanlang:</b>",
        reply_markup=get_lessons_keyboard(current_lesson),
        parse_mode="HTML"
    )
    await callback.answer()

@router.callback_query(F.data == "locked_lesson")
async def locked_lesson_alert(callback: CallbackQuery):
    await callback.answer("🔒 Bu dars qulflangan! Oldingi darsning barcha 4 ta mashqini yakunlang.", show_alert=True)

@router.callback_query(F.data.startswith("lesson_"))
async def open_lesson(callback: CallbackQuery):
    lesson_id = int(callback.data.split("_")[1])
    lesson = get_lesson(lesson_id)
    if not lesson:
        await callback.answer("Dars topilmadi.", show_alert=True)
        return

    skills_status = await db.get_lesson_skills_status(callback.from_user.id, lesson_id)
    
    # Vocabulary list
    vocab_text = "\n".join([f"• <b>{v['word']}</b> — {v['translation']}" for v in lesson["vocabulary"]])
    
    text = (
        f"📖 <b>{lesson['id']}-Dars: {lesson['title']}</b>\n"
        f"Daraja: <i>{lesson['level']}</i>\n\n"
        f"🔤 <b>Yangi so'zlar:</b>\n{vocab_text}\n\n"
        "Quyidagi 4 ta ko'nikmani ketma-ket bajaring:\n"
        "📖 Reading | 🎧 Listening | ✍️ Writing | 🗣 Speaking"
    )
    
    await callback.message.edit_text(
        text,
        reply_markup=get_skills_keyboard(lesson_id, skills_status),
        parse_mode="HTML"
    )
    await callback.answer()
