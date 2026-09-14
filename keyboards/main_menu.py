from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


def get_main_menu() -> ReplyKeyboardMarkup:
    kb = [
        [KeyboardButton(text="📚 Darslar (0 dan A1 ga)"), KeyboardButton(text="📝 Daraja testi")],
        [KeyboardButton(text="📖 Kunlik so'z"), KeyboardButton(text="📘 Kunlik grammatika")],
        [KeyboardButton(text="🗣 Talaffuz mashqi"), KeyboardButton(text="🎯 Kunlik maqsadlar")],
        [KeyboardButton(text="🗂 So'z boyligi (Lug'at)"), KeyboardButton(text="👤 Profil")],
        [KeyboardButton(text="🏆 Yutuqlarim"), KeyboardButton(text="🏆 Reyting")],
        [KeyboardButton(text="ℹ️ Qanday o'rganiladi?")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)
