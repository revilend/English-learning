"""
Talaffuz mashqi — ingliz tilidagi qiyin tovushlar uchun mashqlar.
Minimal pairs va talaffuz maslahatlari.
"""
import random

PRONUNCIATION_PRACTICE = [
    {
        "sound": "TH (θ/ð)",
        "description": "Tilni tishlar orasiga qo'ying",
        "pairs": [
            ("think", "sink", "O'ylamoq / cho'kmoq"),
            ("three", "free", "Uch / erkin"),
            ("this", "dis", "Bu / bu"),
            ("that", "dat", "U / u"),
            ("with", "wiz", "Bilan / bilan"),
            ("bath", "bas", "Vanna / vanna"),
        ],
        "tip": "Tilni pastki tishlarga tegizib, havo chiqaring. 'θ' — tishlar orasidan, 'ð' — til bilan."
    },
    {
        "sound": "R vs L",
        "description": "Tilning holati farqi",
        "pairs": [
            ("right", "light", "To'g'ri / yorug'lik"),
            ("red", "led", "Qizil / olib bordi"),
            ("road", "load", "Yo'l / yuk"),
            ("race", "lace", "Poyga / shnur"),
            ("free", "flee", "Erkin / qochmoq"),
            ("pride", "plide", "G'urur / g'urur"),
        ],
        "tip": "R: til orqa tomog'iga qayriladi. L: til og'iz tomog'iga tegadi."
    },
    {
        "sound": "V vs W",
        "description": "Lab holati farqi",
        "pairs": [
            ("vine", "wine", "O'simlik / vino"),
            ("vet", "wet", "Veterinar / ho'l"),
            ("vest", "west", "Ko'ylak / g'arb"),
            ("very", "werry", "Juda / juda"),
            ("vote", "wote", "Ovoz / ovoz"),
            ("van", "wan", "Mashina / sarg'ish"),
        ],
        "tip": "V: pastki lab ustki tishlarga tegadi. W: lablar dumaloq qilinadi."
    },
    {
        "sound": "I vs Iː",
        "description": "Qisqa va uzun I",
        "pairs": [
            ("sit", "seat", "O'tirish / o'rin"),
            ("ship", "sheep", "Kema / qo'y"),
            ("bit", "beat", "Bir oz / urish"),
            ("live", "leave", "Yashamoq / ketmoq"),
            ("fill", "feel", "To'ldirmoq / sezmoq"),
            ("hill", "heal", "Tepalik / davolamoq"),
        ],
        "tip": "I: qisqa, og'iz kichik ochiladi. Iː: uzun, og'iz kengroq ochiladi."
    },
    {
        "sound": "SH vs CH",
        "description": "Tovush chiqarish joyi",
        "pairs": [
            ("she", "che", "U / u"),
            ("ship", "chip", "Kema / chiplar"),
            ("share", "chair", "Bo'lishmoq / stul"),
            ("shoe", "choo", "Poyabzal / poyabzal"),
            ("shop", "chop", "Do'kon / kesmoq"),
            ("wish", "witch", "Istak / cadu"),
        ],
        "tip": "SH: lablar dumaloq, havo chiqadi. CH: til tishlarga tegadi, keskin."
    },
    {
        "sound": "VOWELS (Unlilar)",
        "description": "Ingliz tilidagi asosiy unlilar",
        "pairs": [
            ("bed", "bad", "Krovat / yomon"),
            ("sit", "set", "O'tirish / qo'yish"),
            ("cup", "cap", "Krujka / bosh kiyim"),
            ("hot", "hat", "Issiq / шляпа"),
            ("foot", "food", "Oyoq / ovqat"),
            ("bird", "bed", "Qush / krovat"),
        ],
        "tip": "Unlilar og'zning ochilish darajasiga qarab farq qiladi. E: kichik, A: katta, O: dumaloq."
    },
]


def get_random_practice():
    """Tasodifiy talaffuz mashqini qaytaradi."""
    return random.choice(PRONUNCIATION_PRACTICE)


def get_practice_by_sound(sound_name):
    """Ma'lum tovush bo'yicha mashq qaytaradi."""
    for p in PRONUNCIATION_PRACTICE:
        if sound_name.lower() in p["sound"].lower():
            return p
    return get_random_practice()


def format_practice_message(practice):
    """Mashq xabarini formatlaydi."""
    text = f"🗣 <b>Talaffuz mashqi: {practice['sound']}</b>\n"
    text += f"📝 {practice['description']}\n\n"
    text += "🔤 <b>Minimal pairs (farqlash mashqi):</b>\n"
    
    for word1, word2, meaning in practice["pairs"][:4]:
        text += f"• <b>{word1}</b> vs <b>{word2}</b> — {meaning}\n"
    
    text += f"\n💡 <b>Maslahat:</b> {practice['tip']}\n\n"
    text += "🎙 Ovozingizda takrorlang va javobingizni yozib yuboring!"
    
    return text
