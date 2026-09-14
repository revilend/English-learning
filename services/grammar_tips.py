"""
Kunlik grammatika maslahatlari — har kuni 1 ta grammatika qoidasi.
"""
import random
from datetime import datetime

GRAMMAR_TIPS = [
    {
        "rule": "Present Simple",
        "title": "Hozirgi oddiy vaqt",
        "explanation": "Doimo yuz beradigan harakatlar uchun ishlatiladi.",
        "formula": "I/We/You/They + V  |  He/She/It + V-s",
        "examples": [
            "I play football every day.",
            "She plays tennis on Mondays.",
            "They don't like coffee.",
            "Do you speak English?"
        ],
        "tip": "Belgilar: always, usually, sometimes, never, every day"
    },
    {
        "rule": "Present Continuous",
        "title": "Hozirgi davomiy vaqt",
        "explanation": "Hozir yuz berayotgan harakatlar uchun.",
        "formula": "I + am + V-ing  |  He/She/It + is + V-ing  |  We/You/They + are + V-ing",
        "examples": [
            "I am studying English right now.",
            "She is cooking dinner.",
            "They are playing football.",
            "It is raining outside."
        ],
        "tip": "Belgilar: now, right now, at the moment, currently"
    },
    {
        "rule": "Past Simple",
        "title": "O'tgan oddiy vaqt",
        "explanation": "O'tmishda tugallangan harakatlar uchun.",
        "formula": "V2 (irregular)  yoki  V+ed (regular)",
        "examples": [
            "I went to school yesterday.",
            "She watched a movie last night.",
            "We visited our grandmother.",
            "He didn't call me."
        ],
        "tip": "Belgilar: yesterday, last week, last month, ago"
    },
    {
        "rule": "Future (will)",
        "title": "Kelajak (will)",
        "explanation": "Bashorat yoki to'satdli qaror uchun.",
        "formula": "will + V",
        "examples": [
            "I will help you.",
            "It will rain tomorrow.",
            "She will be 20 next year.",
            "We won't forget you."
        ],
        "tip": "Belgilar: tomorrow, next week, in the future, I think"
    },
    {
        "rule": "Future (going to)",
        "title": "Kelajak (going to)",
        "explanation": "Oldindan rejalangan harakatlar uchun.",
        "formula": "am/is/are + going to + V",
        "examples": [
            "I am going to study medicine.",
            "She is going to visit Paris.",
            "They are going to buy a house.",
            "We are not going to party tonight."
        ],
        "tip": "Belgilar: plan, intend, decided, already arranged"
    },
    {
        "rule": "Articles (A/An/The)",
        "title": "Artikellar",
        "explanation": "Narsalarni aniqlash uchun ishlatiladi.",
        "formula": "A — bitta (unli emas)  |  An — bitta (unli)  |  The — ma'lum",
        "examples": [
            "I have a cat. The cat is black.",
            "She bought an apple.",
            "The sun is bright today.",
            "I like cats (zero article)."
        ],
        "tip": "A/An — birinchi marta. The — ikkinchi marta yoki ma'lum narsa."
    },
    {
        "rule": "Comparatives",
        "title": "Taqqoslash (kattaroq/kichikroq)",
        "explanation": "Ikki narsani taqqoslash uchun.",
        "formula": "Qisqa: adj + er + than  |  Uzun: more + adj + than",
        "examples": [
            "Tashkent is bigger than Samarkand.",
            "This book is more interesting than that one.",
            "She is taller than her sister.",
            "My car is faster than yours."
        ],
        "tip": "Qisqa so'zlar: big→bigger, small→smaller. Uzun: beautiful→more beautiful"
    },
    {
        "rule": "Superlatives",
        "title": "Eng darajali",
        "explanation": "3+ narsadan birini ajratish uchun.",
        "formula": "the + adj + est  yoki  the most + adj",
        "examples": [
            "She is the tallest girl in class.",
            "This is the most beautiful park.",
            "He is the best student.",
            "It was the worst movie ever."
        ],
        "tip": "Qisqa: tall→the tallest. Uzun: beautiful→the most beautiful"
    },
    {
        "rule": "Present Perfect",
        "title": "Hozirgi tugallangan",
        "explanation": "O'tmishdagi tajriba yoki natija hozirga tegishli.",
        "formula": "have/has + V3",
        "examples": [
            "I have visited Paris three times.",
            "She has lived here since 2020.",
            "We have known each other for years.",
            "He has just finished his homework."
        ],
        "tip": "Belgilar: already, yet, just, ever, never, since, for"
    },
    {
        "rule": "Passive Voice",
        "title": "Passiv o'tgan",
        "explanation": "Harakat bajaruvchi muhim bo'lmaganda.",
        "formula": "was/were + V3 (o'tgan)  |  is/am/are + V3 (hozirgi)",
        "examples": [
            "The book was written by a famous author.",
            "English is spoken in many countries.",
            "The house was built in 2020.",
            "Rice is grown in Uzbekistan."
        ],
        "tip": "Harakat muhim, bajaruvchi muhim bo'lmaganda passiv ishlating."
    },
    {
        "rule": "Conditionals (If)",
        "title": "Shartli gaplar",
        "explanation": "Shart bajarilsa — natija bo'ladi.",
        "formula": "1-shart: If + V1, will + V  |  2-shart: If + V2, would + V",
        "examples": [
            "If it rains, I will stay home.",
            "If I were rich, I would buy a house.",
            "If you study hard, you will pass.",
            "If I had known, I would have helped."
        ],
        "tip": "1-shart: haqiqat. 2-shart: virtual (hozir). 3-shart: o'tmish virtual."
    },
    {
        "rule": "Can / Can't",
        "title": "Imkoniyat",
        "explanation": "Qila olmoq yoki qila olmaslik.",
        "formula": "can + V  |  can't + V",
        "examples": [
            "I can swim very well.",
            "She can speak three languages.",
            "He can't drive a car.",
            "Can you help me?"
        ],
        "tip": "Can — shakl o'zgarmaydi. I can, He can, They can (V s形式 emas)."
    },
    {
        "rule": "Prepositions",
        "title": "Predloglar",
        "explanation": "Joy, vaqt, yo'nalishni bildiradi.",
        "formula": "in=ichida | on=ustida | at=joyda | to=ga | from=dan",
        "examples": [
            "The book is on the table.",
            "I live in Tashkent.",
            "The meeting is at 3 PM.",
            "She is from Samarkand."
        ],
        "tip": "in=ichida (xona), on=ustida (sirt), at=aniq joy/vaqt"
    },
    {
        "rule": "Relative Clauses",
        "title": "Nisbatli gaplar",
        "explanation": "Gapga qo'shimcha ma'lumot qo'shish.",
        "formula": "who (odam) | which (narsa) | where (joy) | when (vaqt)",
        "examples": [
            "The man who lives next door is a doctor.",
            "The book which I read was interesting.",
            "The city where I was born is Samarkand.",
            "I remember the day when we first met."
        ],
        "tip": "Who — odam, Which — narsa, That — hammasi, Where — joy"
    },
    {
        "rule": "Phrasal Verbs",
        "title": "Frazal fe'llar",
        "explanation": "Fe'l + predlog = yangi ma'no.",
        "formula": "Fe'l + preposition/adverb",
        "examples": [
            "get up — turmoq",
            "give up — vaz kechmoq",
            "turn on — yoqmoq",
            "look after — g'amxo'rlik qilmoq"
        ],
        "tip": "Frazal fe'llar oddiy fe'dan farqli ma'no beradi. Context'dan tushuning!"
    },
]


def get_tip_of_day():
    """Har kuni 1 ta grammatika maslahatini qaytaradi."""
    day_of_year = datetime.now().timetuple().tm_yday
    return GRAMMAR_TIPS[day_of_year % len(GRAMMAR_TIPS)]


def get_random_tip():
    """Tasodifiy grammatika maslahatini qaytaradi."""
    return random.choice(GRAMMAR_TIPS)


def format_tip_message(tip):
    """Maslahat xabarini formatlaydi."""
    text = f"📘 <b>Grammatika maslahati:</b> {tip['title']}\n\n"
    text += f"📌 <b>Qoida:</b> {tip['rule']}\n"
    text += f"📝 <b>Tushuntirish:</b> {tip['explanation']}\n\n"
    text += f"🔢 <b>Formula:</b>\n<code>{tip['formula']}</code>\n\n"
    text += "📖 <b>Misollar:</b>\n"
    for ex in tip['examples'][:3]:
        text += f"• <i>{ex}</i>\n"
    text += f"\n💡 <b>Maslahat:</b> {tip['tip']}"
    return text
