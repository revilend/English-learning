from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

def get_main_menu() -> ReplyKeyboardMarkup:
    kb = [
        [KeyboardButton(text="📚 Darslar (0 dan A1 ga)"), KeyboardButton(text="🗂 So'z boyligi (Lug'at)")],
        [KeyboardButton(text="👤 Profil va Natijalar"), KeyboardButton(text="🏆 Reyting (Leaderboard)")],
        [KeyboardButton(text="ℹ️ Qanday o'rganiladi?")]
    ]
    return ReplyKeyboardMarkup(keyboard=kb, resize_keyboard=True)
