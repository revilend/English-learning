"""
Kunlik so'z — har kuni yangi so'z o'rganing
"""

WORD_OF_DAY = [
    # A0-A1 darajadagi so'zlar
    {"word": "Hello", "translation": "Salom", "example": "Hello, how are you?", "level": "A0"},
    {"word": "Thank you", "translation": "Rahmat", "example": "Thank you very much!", "level": "A0"},
    {"word": "Please", "translation": "Iltimos", "example": "Can I have some water, please?", "level": "A0"},
    {"word": "Sorry", "translation": "Kechirasiz", "example": "Sorry, I am late.", "level": "A0"},
    {"word": "Good morning", "translation": "Ertalablik xayrli", "example": "Good morning, teacher!", "level": "A0"},
    {"word": "How are you?", "translation": "Qalaysiz?", "example": "Hi! How are you?", "level": "A0"},
    {"word": "My name is...", "translation": "Mening ismim...", "example": "My name is Alex.", "level": "A0"},
    {"word": "Nice to meet you", "translation": "Tanishganimdan xursandman", "example": "Nice to meet you, Sarah!", "level": "A0"},
    {"word": "Goodbye", "translation": "Xayr", "example": "Goodbye, see you tomorrow!", "level": "A0"},
    {"word": "Yes", "translation": "Ha", "example": "Yes, I understand.", "level": "A0"},
    {"word": "No", "translation": "Yo'q", "example": "No, thank you.", "level": "A0"},
    {"word": "Water", "translation": "Suv", "example": "Can I have some water?", "level": "A1"},
    {"word": "Hungry", "translation": "Och", "example": "I am very hungry.", "level": "A1"},
    {"word": "Tired", "translation": "Charchagan", "example": "I am tired after work.", "level": "A1"},
    {"word": "Happy", "translation": "Baxtli", "example": "I am happy today.", "level": "A1"},
    {"word": "Beautiful", "translation": "Chiroyli", "example": "This flower is beautiful.", "level": "A1"},
    {"word": "Important", "translation": "Muhim", "example": "This is very important.", "level": "A1"},
    {"word": "Different", "translation": "Turli", "example": "These are different colors.", "level": "A1"},
    {"word": "Interesting", "translation": "Qiziq", "example": "This book is interesting.", "level": "A1"},
    {"word": "Delicious", "translation": "Mazzali", "example": "This food is delicious!", "level": "A1"},
    {"word": "Expensive", "translation": "Qimmat", "example": "This phone is too expensive.", "level": "A2"},
    {"word": "Recommend", "translation": "Tavsiya qilmoq", "example": "I recommend this restaurant.", "level": "A2"},
    {"word": "Experience", "translation": "Tajriba", "example": "I have good experience.", "level": "A2"},
    {"word": "Possible", "translation": "Mumkin", "example": "Is it possible to help me?", "level": "A2"},
    {"word": "Immediately", "translation": "Darhol", "example": "Please come immediately.", "level": "A2"},
    {"word": "Unfortunately", "translation": "Afsuski", "example": "Unfortunately, I cannot come.", "level": "A2"},
    {"word": "Government", "translation": "Hukumat", "example": "The government made a decision.", "level": "B1"},
    {"word": "Environment", "translation": "Atrof-muhit", "example": "We must protect the environment.", "level": "B1"},
    {"word": "Knowledge", "translation": "Bilim", "example": "Knowledge is power.", "level": "B1"},
    {"word": "Opportunity", "translation": "Imkoniyat", "example": "This is a great opportunity.", "level": "B1"},
    {"word": "Communication", "translation": "Muloqot", "example": "Good communication is important.", "level": "B1"},
]


def get_word_of_day():
    """Bugungi so'z — kun raqamiga qarab"""
    from datetime import datetime
    day_of_year = datetime.now().timetuple().tm_yday
    index = day_of_year % len(WORD_OF_DAY)
    return WORD_OF_DAY[index]


def get_random_word(level: str = None):
    """Tasodifiy so'z"""
    import random
    if level:
        words = [w for w in WORD_OF_DAY if w["level"] == level]
    else:
        words = WORD_OF_DAY
    return random.choice(words) if words else WORD_OF_DAY[0]
