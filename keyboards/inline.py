from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from services.curriculum import LESSONS

def get_lessons_keyboard(current_lesson: int) -> InlineKeyboardMarkup:
    buttons = []
    for l in LESSONS:
        status = "🔓" if l["id"] <= current_lesson else "🔒"
        text = f"{status} {l['id']}-Dars: {l['title']}"
        callback = f"lesson_{l['id']}" if l["id"] <= current_lesson else "locked_lesson"
        buttons.append([InlineKeyboardButton(text=text, callback_data=callback)])
    return InlineKeyboardMarkup(inline_keyboard=buttons)

def get_skills_keyboard(lesson_id: int, skills_status: dict) -> InlineKeyboardMarkup:
    r_icon = "✅" if skills_status.get("reading") else "📖"
    l_icon = "✅" if skills_status.get("listening") else "🎧"
    w_icon = "✅" if skills_status.get("writing") else "✍️"
    s_icon = "✅" if skills_status.get("speaking") else "🗣"

    buttons = [
        [
            InlineKeyboardButton(text=f"{r_icon} Reading", callback_data=f"skill_{lesson_id}_reading"),
            InlineKeyboardButton(text=f"{l_icon} Listening", callback_data=f"skill_{lesson_id}_listening")
        ],
        [
            InlineKeyboardButton(text=f"{w_icon} Writing", callback_data=f"skill_{lesson_id}_writing"),
            InlineKeyboardButton(text=f"{s_icon} Speaking", callback_data=f"skill_{lesson_id}_speaking")
        ],
        [
            InlineKeyboardButton(text="🔙 Darslar ro'yxatiga", callback_data="back_to_lessons")
        ]
    ]
    return InlineKeyboardMarkup(inline_keyboard=buttons)

def get_quiz_keyboard(lesson_id: int, options: list) -> InlineKeyboardMarkup:
    buttons = []
    for idx, opt in enumerate(options):
        buttons.append([InlineKeyboardButton(text=opt, callback_data=f"quiz_{lesson_id}_{idx}")])
    return InlineKeyboardMarkup(inline_keyboard=buttons)
