LESSONS = [
    {
        "id": 1,
        "title": "Salomlashish va Tanishuv",
        "level": "A0 (Starter)",
        "vocabulary": [
            {"word": "Hello", "translation": "Salom"},
            {"word": "Name", "translation": "Ism"},
            {"word": "Nice to meet you", "translation": "Tanishganimdan xursandman"},
            {"word": "I am", "translation": "Men ... man"},
            {"word": "Goodbye", "translation": "Xayr"}
        ],
        "reading": {
            "title": "Tanishuv dialogi",
            "text": "Alex: Hello! My name is Alex.\nSarah: Hi Alex! I am Sarah. Nice to meet you.\nAlex: Nice to meet you too!",
            "question": "Sarah kim bilan tanishdi?",
            "options": ["Alex", "John", "David", "Tom"],
            "correct_option": 0
        },
        "listening": {
            "audio_text": "Hello, my name is Alex. Nice to meet you.",
            "task": "Audioni tinglang va Alex nima deganini to'liq yozing (diktant):",
            "expected_text": "Hello, my name is Alex. Nice to meet you."
        },
        "writing": {
            "task": "O'zbekcha gapni ingliz tiliga tarjima qilib yozing:\n\n'Salom! Mening ismim [Ismingiz]. Tanishganimdan xursandman.'",
            "sample_solution": "Hello! My name is ... Nice to meet you."
        },
        "speaking": {
            "task": "Quyidagi gapni ovozli xabar (Voice message) orqali yozib yuboring:\n\n👉 'Hello! My name is John. Nice to meet you.'",
            "target_phrase": "Hello! My name is John. Nice to meet you."
        }
    },
    {
        "id": 2,
        "title": "Raqamlar va Yosh (Numbers & Age)",
        "level": "A0 (Starter)",
        "vocabulary": [
            {"word": "One, Two, Three", "translation": "Bir, Ikki, Uch"},
            {"word": "Ten", "translation": "O'n"},
            {"word": "Years old", "translation": "Yoshda"},
            {"word": "How old are you?", "translation": "Yoshingiz nechida?"},
            {"word": "Student", "translation": "Talaba / O'quvchi"}
        ],
        "reading": {
            "title": "David haqida",
            "text": "This is David. He is twenty years old. David is a student. He has two brothers.",
            "question": "David necha yoshda?",
            "options": ["15", "20", "25", "10"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "I am twenty years old and I am a student.",
            "task": "Audioni tinglang va bo'sh joyni to'ldiring:\n\n'I am _____ years old and I am a student.'",
            "expected_text": "twenty"
        },
        "writing": {
            "task": "Quyidagi gapni ingliz tiliga tarjima qiling:\n\n'Men 18 yoshdaman va men o'quvchiman.'",
            "sample_solution": "I am 18 years old and I am a student."
        },
        "speaking": {
            "task": "O'z yoshingizni aytib ovozli xabar yuboring:\n\n👉 'I am twenty years old.' (yoki o'z yoshingizni kiriting)",
            "target_phrase": "I am twenty years old."
        }
    },
    {
        "id": 3,
        "title": "Oila va Qarindoshlar (Family)",
        "level": "A0-A1",
        "vocabulary": [
            {"word": "Father / Mother", "translation": "Ota / Ona"},
            {"word": "Brother / Sister", "translation": "Aka-uka / Opa-singil"},
            {"word": "Family", "translation": "Oila"},
            {"word": "Love", "translation": "Yaxshi ko'rmoq / Sevmoq"},
            {"word": "Big / Small", "translation": "Katta / Kichik"}
        ],
        "reading": {
            "title": "Mening oilam",
            "text": "I have a small family. My father is a doctor. My mother is a teacher. I have one sister.",
            "question": "Onasi kim bo'lib ishlaydi?",
            "options": ["Doctor", "Driver", "Teacher", "Engineer"],
            "correct_option": 2
        },
        "listening": {
            "audio_text": "My father is a doctor and my mother is a teacher.",
            "task": "Audioni tinglang va otasining kasbini yozing:",
            "expected_text": "doctor"
        },
        "writing": {
            "task": "Quyidagi gapni ingliz tiliga tarjima qiling:\n\n'Bu mening otam. Men oilamni yaxshi ko'raman.'",
            "sample_solution": "This is my father. I love my family."
        },
        "speaking": {
            "task": "Ovozli xabar qilib talaffuz qiling:\n\n👉 'I have a family and I love my mother.'",
            "target_phrase": "I have a family and I love my mother."
        }
    },
    {
        "id": 4,
        "title": "Kundalik Harakatlar (Daily Routines)",
        "level": "A1",
        "vocabulary": [
            {"word": "Wake up", "translation": "Uyg'onmoq"},
            {"word": "Drink coffee", "translation": "Kofe ichmoq"},
            {"word": "Go to work / school", "translation": "Ishga / maktabga bormoq"},
            {"word": "In the morning", "translation": "Ertalab"},
            {"word": "Every day", "translation": "Har kuni"}
        ],
        "reading": {
            "title": "Ertalabki reja",
            "text": "Every day, I wake up at 7 AM. I wash my face and drink black coffee. Then I go to work.",
            "question": "U ertalab nima ichadi?",
            "options": ["Tea", "Juice", "Milk", "Black coffee"],
            "correct_option": 3
        },
        "listening": {
            "audio_text": "Every day I wake up at seven and drink coffee.",
            "task": "Audioni tinglang va to'liq gapni yozing:",
            "expected_text": "Every day I wake up at seven and drink coffee."
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Men har kuni ertalab soat 7 da uyg'onaman.'",
            "sample_solution": "I wake up at 7 every morning."
        },
        "speaking": {
            "task": "Ovozli tarzda ayting:\n\n👉 'I drink coffee every day.'",
            "target_phrase": "I drink coffee every day."
        }
    }
]

def get_lesson(lesson_id: int):
    for l in LESSONS:
        if l["id"] == lesson_id:
            return l
    return None

def get_total_lessons():
    return len(LESSONS)
