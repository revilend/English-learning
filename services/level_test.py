"""
Daraja aniqlash testi (A0 → B1)
Foydalanuvchi 20 ta savolga javob beradi, natijaga qarab darajasi aniqlanadi.
"""

LEVEL_TEST_QUESTIONS = [
    # --- A0 (Starter) savollari ---
    {
        "id": 1,
        "question": "Hello! My name ___ Alex.",
        "options": ["am", "is", "are", "be"],
        "correct": 1,
        "level": "A0"
    },
    {
        "id": 2,
        "question": "I ___ a student.",
        "options": ["is", "am", "are", "be"],
        "correct": 1,
        "level": "A0"
    },
    {
        "id": 3,
        "question": "She ___ from Tashkent.",
        "options": ["am", "is", "are", "do"],
        "correct": 1,
        "level": "A0"
    },
    {
        "id": 4,
        "question": "This is ___.",
        "options": ["my", "I", "me", "mine"],
        "correct": 0,
        "level": "A0"
    },
    {
        "id": 5,
        "question": "How ___ you?",
        "options": ["is", "are", "am", "do"],
        "correct": 1,
        "level": "A0"
    },
    # --- A1 (Beginner) savollari ---
    {
        "id": 6,
        "question": "I ___ to school every day.",
        "options": ["go", "goes", "going", "went"],
        "correct": 0,
        "level": "A1"
    },
    {
        "id": 7,
        "question": "She ___ reading a book now.",
        "options": ["is", "are", "am", "be"],
        "correct": 0,
        "level": "A1"
    },
    {
        "id": 8,
        "question": "They ___ football yesterday.",
        "options": ["play", "plays", "played", "playing"],
        "correct": 2,
        "level": "A1"
    },
    {
        "id": 9,
        "question": "___ you like coffee?",
        "options": ["Are", "Do", "Is", "Does"],
        "correct": 1,
        "level": "A1"
    },
    {
        "id": 10,
        "question": "There ___ a cat on the table.",
        "options": ["is", "are", "am", "be"],
        "correct": 0,
        "level": "A1"
    },
    {
        "id": 11,
        "question": "I have ___ apple.",
        "options": ["a", "an", "the", "one"],
        "correct": 1,
        "level": "A1"
    },
    {
        "id": 12,
        "question": "He ___ TV every evening.",
        "options": ["watch", "watches", "watching", "watched"],
        "correct": 1,
        "level": "A1"
    },
    # --- A2 (Elementary) savollari ---
    {
        "id": 13,
        "question": "I ___ already finished my homework.",
        "options": ["have", "has", "had", "having"],
        "correct": 0,
        "level": "A2"
    },
    {
        "id": 14,
        "question": "She ___ to the cinema last night.",
        "options": ["go", "goes", "went", "going"],
        "correct": 2,
        "level": "A2"
    },
    {
        "id": 15,
        "question": "This book is ___ than that one.",
        "options": ["good", "better", "best", "well"],
        "correct": 1,
        "level": "A2"
    },
    {
        "id": 16,
        "question": "I ___ never been to London.",
        "options": ["have", "has", "had", "did"],
        "correct": 0,
        "level": "A2"
    },
    {
        "id": 17,
        "question": "If it ___ tomorrow, we will stay home.",
        "options": ["rains", "rain", "rained", "raining"],
        "correct": 0,
        "level": "A2"
    },
    {
        "id": 18,
        "question": "She asked me ___ I was from.",
        "options": ["what", "where", "who", "how"],
        "correct": 1,
        "level": "A2"
    },
    # --- B1 (Intermediate) savollari ---
    {
        "id": 19,
        "question": "I wish I ___ more time.",
        "options": ["have", "has", "had", "having"],
        "correct": 2,
        "level": "B1"
    },
    {
        "id": 20,
        "question": "The report ___ by the team yesterday.",
        "options": ["was completed", "completed", "completing", "completes"],
        "correct": 0,
        "level": "B1"
    },
]


def calculate_level(answers: dict) -> dict:
    """
    Foydalanuvchi javoblariga qarab darajani aniqlaydi.
    answers = {question_id: selected_option_index}
    """
    scores = {"A0": 0, "A1": 0, "A2": 0, "B1": 0}
    total_per_level = {"A0": 0, "A1": 0, "A2": 0, "B1": 0}
    correct_count = 0

    for q in LEVEL_TEST_QUESTIONS:
        total_per_level[q["level"]] += 1
        if q["id"] in answers and answers[q["id"]] == q["correct"]:
            scores[q["level"]] += 1
            correct_count += 1

    # Har bir daraja uchun foizni hisoblash
    percentages = {}
    for level in ["A0", "A1", "A2", "B1"]:
        if total_per_level[level] > 0:
            percentages[level] = (scores[level] / total_per_level[level]) * 100
        else:
            percentages[level] = 0

    # Darajani aniqlash
    total_questions = len(LEVEL_TEST_QUESTIONS)
    score_percent = (correct_count / total_questions) * 100

    if score_percent <= 25:
        determined_level = "A0"
        next_level = "A1"
        lesson_start = 1
        description = "Siz ingliz tilini endigina boshlamoqdasiz. Boshlang'ich darslardan boshlang!"
    elif score_percent <= 50:
        determined_level = "A1"
        next_level = "A2"
        lesson_start = 9
        description = "Siz oddiy gaplarni tushunasiz. Davom eting!"
    elif score_percent <= 75:
        determined_level = "A2"
        next_level = "B1"
        lesson_start = 17
        description = "Siz kundalik suhbatlarda qatnasha olasiz. Yana biroz harakat qiling!"
    else:
        determined_level = "B1"
        next_level = "B2"
        lesson_start = 25
        description = "Siz yaxshi darajadasiz! Murakkab mavzularni o'rganing."

    return {
        "level": determined_level,
        "next_level": next_level,
        "score": correct_count,
        "total": total_questions,
        "score_percent": round(score_percent),
        "lesson_start": lesson_start,
        "description": description,
        "level_scores": scores,
        "level_percentages": percentages
    }
