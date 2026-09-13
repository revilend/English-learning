import os
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, FSInputFile
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from database import db
from services.curriculum import get_lesson
from services.tts_service import generate_speech
from services.ai_service import ai_service
from keyboards.inline import get_quiz_keyboard, get_skills_keyboard

router = Router()

class SkillStates(StatesGroup):
    waiting_listening = State()
    waiting_writing = State()
    waiting_speaking = State()

# ----------------- SKILL SELECTION -----------------
@router.callback_query(F.data.startswith("skill_"))
async def start_skill(callback: CallbackQuery, state: FSMContext):
    parts = callback.data.split("_")
    lesson_id = int(parts[1])
    skill = parts[2]
    lesson = get_lesson(lesson_id)

    if not lesson:
        await callback.answer("Dars topilmadi.", show_alert=True)
        return

    # Store current lesson in state
    await state.update_data(lesson_id=lesson_id)

    if skill == "reading":
        r_data = lesson["reading"]
        text = (
            f"📖 <b>Reading mashqi ({lesson['title']})</b>\n\n"
            f"Matnni diqqat bilan o'qing:\n\n"
            f"<i>{r_data['text']}</i>\n\n"
            f"❓ <b>Savol:</b> {r_data['question']}"
        )
        await callback.message.edit_text(
            text,
            reply_markup=get_quiz_keyboard(lesson_id, r_data["options"]),
            parse_mode="HTML"
        )
        await callback.answer()

    elif skill == "listening":
        l_data = lesson["listening"]
        audio_path = await generate_speech(l_data["audio_text"])
        
        await callback.message.answer("🎧 <b>Audioni tinglang:</b>", parse_mode="HTML")
        voice_file = FSInputFile(audio_path)
        await callback.message.answer_voice(voice_file)
        
        # Clean up temp file
        if os.path.exists(audio_path):
            try:
                os.remove(audio_path)
            except Exception:
                pass

        await callback.message.answer(
            f"✍️ <b>Vazifa:</b>\n{l_data['task']}\n\nJavobingizni xabar qilib yozing:",
            parse_mode="HTML"
        )
        await state.set_state(SkillStates.waiting_listening)
        await callback.answer()

    elif skill == "writing":
        w_data = lesson["writing"]
        await callback.message.answer(
            f"✍️ <b>Writing (Yozish) mashqi:</b>\n\n"
            f"{w_data['task']}\n\n"
            "Inglizcha javobingizni shu yerga yozib yuboring. AI sizning jumlalaringizni tekshirib beradi! 🤖",
            parse_mode="HTML"
        )
        await state.set_state(SkillStates.waiting_writing)
        await callback.answer()

    elif skill == "speaking":
        s_data = lesson["speaking"]
        # Generate sample pronunciation
        audio_path = await generate_speech(s_data["target_phrase"])
        
        await callback.message.answer(
            f"🗣 <b>Speaking (Talaffuz) mashqi:</b>\n\n"
            f"{s_data['task']}\n\n"
            "Avval namunaviy talaffuzni eshiting, so'ngra xuddi shunday qilib <b>ovozli xabar (Voice message)</b> yuboring:",
            parse_mode="HTML"
        )
        voice_file = FSInputFile(audio_path)
        await callback.message.answer_voice(voice_file)
        
        if os.path.exists(audio_path):
            try:
                os.remove(audio_path)
            except Exception:
                pass

        await state.set_state(SkillStates.waiting_speaking)
        await callback.answer()


# ----------------- READING QUIZ CHECK -----------------
@router.callback_query(F.data.startswith("quiz_"))
async def handle_quiz_answer(callback: CallbackQuery):
    parts = callback.data.split("_")
    lesson_id = int(parts[1])
    selected_idx = int(parts[2])
    lesson = get_lesson(lesson_id)
    
    correct_idx = lesson["reading"]["correct_option"]
    if selected_idx == correct_idx:
        await db.mark_skill_completed(callback.from_user.id, lesson_id, "reading")
        await db.add_xp(callback.from_user.id, 10)
        
        # Add lesson vocabulary to user's spaced repetition flashcards
        for v in lesson["vocabulary"]:
            await db.add_vocab_word(callback.from_user.id, v["word"], v["translation"])

        skills_status = await db.get_lesson_skills_status(callback.from_user.id, lesson_id)
        await callback.message.answer(
            "🎉 <b>To'g'ri javob!</b>\n"
            "+10 XP qo'shildi! ⭐️\n"
            "Yangi so'zlar sizning lug'atingizga qo'shildi.",
            reply_markup=get_skills_keyboard(lesson_id, skills_status),
            parse_mode="HTML"
        )
    else:
        await callback.answer("❌ Noto'g'ri javob. Yana bir bor urinib ko'ring!", show_alert=True)


# ----------------- LISTENING HANDLER -----------------
@router.message(SkillStates.waiting_listening, F.text)
async def handle_listening_submission(message: Message, state: FSMContext):
    data = await state.get_data()
    lesson_id = data.get("lesson_id", 1)
    lesson = get_lesson(lesson_id)
    expected = lesson["listening"]["expected_text"].strip().lower()
    user_text = message.text.strip().lower()

    # Compare
    is_correct = (expected in user_text) or (user_text in expected) or (expected == user_text)

    await db.mark_skill_completed(message.from_user.id, lesson_id, "listening")
    await db.add_xp(message.from_user.id, 15)
    await state.clear()

    skills_status = await db.get_lesson_skills_status(message.from_user.id, lesson_id)
    
    if is_correct:
        res = "🎯 <b>Ajoyib! Eshitib to'g'ri tushundingiz!</b>\n+15 XP ⭐️"
    else:
        res = (
            f"👍 <b>Javob qabul qilindi!</b>\n"
            f"Kutilgan variant: <i>{lesson['listening']['expected_text']}</i>\n"
            f"Sizning javobingiz: <i>{message.text}</i>\n"
            "+15 XP ⭐️"
        )
    
    await message.answer(res, reply_markup=get_skills_keyboard(lesson_id, skills_status), parse_mode="HTML")


# ----------------- WRITING HANDLER -----------------
@router.message(SkillStates.waiting_writing, F.text)
async def handle_writing_submission(message: Message, state: FSMContext):
    data = await state.get_data()
    lesson_id = data.get("lesson_id", 1)
    lesson = get_lesson(lesson_id)
    
    wait_msg = await message.answer("⏳ <i>AI javobingizni tahlil qilmoqda...</i>", parse_mode="HTML")

    ai_result = await ai_service.check_writing(
        task_description=lesson["writing"]["task"],
        user_answer=message.text,
        expected_sample=lesson["writing"]["sample_solution"]
    )

    await db.mark_skill_completed(message.from_user.id, lesson_id, "writing")
    await db.add_xp(message.from_user.id, 20)
    await state.clear()

    await wait_msg.delete()

    skills_status = await db.get_lesson_skills_status(message.from_user.id, lesson_id)
    
    feedback_text = (
        f"✍️ <b>Writing tahlili natijasi:</b>\n\n"
        f"{ai_result['feedback']}\n\n"
        "⭐ <b>+20 XP</b> qo'shildi!"
    )
    await message.answer(feedback_text, reply_markup=get_skills_keyboard(lesson_id, skills_status), parse_mode="HTML")


# ----------------- SPEAKING HANDLER -----------------
@router.message(SkillStates.waiting_speaking, F.voice)
async def handle_speaking_voice(message: Message, state: FSMContext):
    data = await state.get_data()
    lesson_id = data.get("lesson_id", 1)
    lesson = get_lesson(lesson_id)

    wait_msg = await message.answer("🎙 <i>Ovozingiz tekshirilmoqda...</i>", parse_mode="HTML")

    evaluation = await ai_service.evaluate_speaking(lesson["speaking"]["target_phrase"])

    await db.mark_skill_completed(message.from_user.id, lesson_id, "speaking")
    await db.add_xp(message.from_user.id, 25)
    await state.clear()

    await wait_msg.delete()

    skills_status = await db.get_lesson_skills_status(message.from_user.id, lesson_id)

    response_text = (
        f"🗣 <b>Speaking natijasi:</b>\n\n"
        f"{evaluation['feedback']}\n\n"
        "⭐ <b>+25 XP</b> qo'shildi!"
    )
    await message.answer(response_text, reply_markup=get_skills_keyboard(lesson_id, skills_status), parse_mode="HTML")

@router.message(SkillStates.waiting_speaking, ~F.voice)
async def handle_non_voice_speaking(message: Message):
    await message.answer("Iltimos, Speaking mashqi uchun <b>ovozli xabar (Voice message)</b> yuboring! 🎙", parse_mode="HTML")
