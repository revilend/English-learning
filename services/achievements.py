"""
Yutuqlar va badjlar tizimi
"""

ACHIEVEMENTS = [
    {"id": "first_lesson", "name": "Boshlang'ich", "icon": "🌱", "description": "Birinchi darsni yakunlang", "xp_required": 0},
    {"id": "five_lessons", "name": "O'quvchi", "icon": "📚", "description": "5 ta darsni yakunlang", "xp_required": 0},
    {"id": "ten_lessons", "name": "Talaba", "icon": "🎓", "description": "10 ta darsni yakunlang", "xp_required": 0},
    {"id": "all_lessons", "name": "Ustoz", "icon": "👨‍🏫", "description": "Barcha 34 darsni yakunlang", "xp_required": 0},
    {"id": "xp_100", "name": "Yulduz", "icon": "⭐", "description": "100 XP to'plang", "xp_required": 100},
    {"id": "xp_500", "name": "Masters", "icon": "🏆", "description": "500 XP to'plang", "xp_required": 500},
    {"id": "xp_1000", "name": "Chempion", "icon": "🥇", "description": "1000 XP to'plang", "xp_required": 1000},
    {"id": "streak_3", "name": "Davomiy", "icon": "🔥", "description": "3 kunlik streak", "xp_required": 0},
    {"id": "streak_7", "name": "Haftalik", "icon": "💪", "description": "7 kunlik streak", "xp_required": 0},
    {"id": "streak_30", "icon": "👑", "name": "Oylik", "description": "30 kunlik streak", "xp_required": 0},
    {"id": "level_a1", "name": "A1 daraja", "icon": "📗", "description": "A1 darajasiga yeting", "xp_required": 0},
    {"id": "level_a2", "name": "A2 daraja", "icon": "📘", "description": "A2 darajasiga yeting", "xp_required": 0},
    {"id": "level_b1", "name": "B1 daraja", "icon": "📕", "description": "B1 darajasiga yeting", "xp_required": 0},
    {"id": "perfect_reading", "name": "Mukammal o'qish", "icon": "📖", "description": "Reading bo'yicha 100% oling", "xp_required": 0},
    {"id": "perfect_writing", "name": "Mukammal yozish", "icon": "✍️", "description": "Writing bo'yicha 100% oling", "xp_required": 0},
]


def check_achievements(user_data: dict, completed_lessons: int, streak: int) -> list:
    """Foydalanuvchi uchun yangi yutuqlarni tekshirish"""
    new_achievements = []
    xp = user_data.get("xp", 0)
    level = user_data.get("level", "A0")

    # Darslar yutuqlari
    if completed_lessons >= 1:
        new_achievements.append("first_lesson")
    if completed_lessons >= 5:
        new_achievements.append("five_lessons")
    if completed_lessons >= 10:
        new_achievements.append("ten_lessons")
    if completed_lessons >= 34:
        new_achievements.append("all_lessons")

    # XP yutuqlari
    if xp >= 100:
        new_achievements.append("xp_100")
    if xp >= 500:
        new_achievements.append("xp_500")
    if xp >= 1000:
        new_achievements.append("xp_1000")

    # Streak yutuqlari
    if streak >= 3:
        new_achievements.append("streak_3")
    if streak >= 7:
        new_achievements.append("streak_7")
    if streak >= 30:
        new_achievements.append("streak_30")

    # Daraja yutuqlari
    if level in ["A1", "A2", "B1"]:
        new_achievements.append("level_a1")
    if level in ["A2", "B1"]:
        new_achievements.append("level_a2")
    if level == "B1":
        new_achievements.append("level_b1")

    return new_achievements


def get_achievement_by_id(achievement_id: str):
    """Yutuqni ID bo'yicha topish"""
    for a in ACHIEVEMENTS:
        if a["id"] == achievement_id:
            return a
    return None


def format_achievement(achievement_id: str) -> str:
    """Yutuqni formatlangan holda qaytarish"""
    a = get_achievement_by_id(achievement_id)
    if a:
        return f"{a['icon']} <b>{a['name']}</b>\n{a['description']}"
    return ""
