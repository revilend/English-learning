"""
To'liq kurikulum: A0 dan B1 gacha (24 dars)
"""

LESSONS = [
    # ==================== A0 (STARTER) ====================
    {
        "id": 1,
        "title": "Salomlashish va Tanishuv",
        "level": "A0",
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
            "task": "Audioni tinglang va Alex nima deganini to'liq yozing:",
            "expected_text": "Hello, my name is Alex. Nice to meet you."
        },
        "writing": {
            "task": "O'zbekcha gapni ingliz tiliga tarjima qiling:\n\n'Salom! Mening ismim [Ismingiz]. Tanishganimdan xursandman.'",
            "sample_solution": "Hello! My name is ... Nice to meet you."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'Hello! My name is John. Nice to meet you.'",
            "target_phrase": "Hello! My name is John. Nice to meet you."
        }
    },
    {
        "id": 2,
        "title": "Raqamlar va Yosh",
        "level": "A0",
        "vocabulary": [
            {"word": "One, Two, Three", "translation": "Bir, Ikki, Uch"},
            {"word": "Ten", "translation": "O'n"},
            {"word": "Years old", "translation": "Yoshda"},
            {"word": "How old are you?", "translation": "Yoshingiz nechida?"},
            {"word": "Student", "translation": "Talaba"}
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
            "task": "Ingliz tilida yozing:\n\n'Men 18 yoshdaman va men talabaman.'",
            "sample_solution": "I am 18 years old and I am a student."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I am twenty years old.'",
            "target_phrase": "I am twenty years old."
        }
    },
    {
        "id": 3,
        "title": "Oila va Qarindoshlar",
        "level": "A0",
        "vocabulary": [
            {"word": "Father / Mother", "translation": "Ota / Ona"},
            {"word": "Brother / Sister", "translation": "Aka-uka / Opa-singil"},
            {"word": "Family", "translation": "Oila"},
            {"word": "Love", "translation": "Sevmoq"},
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
            "task": "Ingliz tilida yozing:\n\n'Bu mening otam. Men oilamni yaxshi ko'raman.'",
            "sample_solution": "This is my father. I love my family."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I have a family and I love my mother.'",
            "target_phrase": "I have a family and I love my mother."
        }
    },
    # ==================== A1 (BEGINNER) ====================
    {
        "id": 4,
        "title": "Kundalik Harakatlar",
        "level": "A1",
        "vocabulary": [
            {"word": "Wake up", "translation": "Uyg'onmoq"},
            {"word": "Drink coffee", "translation": "Kofe ichmoq"},
            {"word": "Go to work", "translation": "Ishga bormoq"},
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
            "task": "Ovozli xabar yuboring:\n\n👉 'I drink coffee every day.'",
            "target_phrase": "I drink coffee every day."
        }
    },
    {
        "id": 5,
        "title": "Taom va Ichimlik",
        "level": "A1",
        "vocabulary": [
            {"word": "Water", "translation": "Suv"},
            {"word": "Bread", "translation": "Non"},
            {"word": "Apple", "translation": "Olma"},
            {"word": "Rice", "translation": "Guruch"},
            {"word": "I would like", "translation": "Men ... istayman"}
        ],
        "reading": {
            "title": "Restoranda",
            "text": "Waiter: Good evening! What would you like?\nTom: I would like water and bread, please.\nWaiter: Anything else?\nTom: No, thank you.",
            "question": "Tom nima buyurtma berdi?",
            "options": ["Juice and cake", "Water and bread", "Coffee and sandwich", "Milk and rice"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "I would like water and bread, please.",
            "task": "Audioni tinglang va to'liq yozing:",
            "expected_text": "I would like water and bread, please."
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Men suv va non istayman, iltimos.'",
            "sample_solution": "I would like water and bread, please."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I would like an apple, please.'",
            "target_phrase": "I would like an apple, please."
        }
    },
    {
        "id": 6,
        "title": "Ranglar va Buyumlar",
        "level": "A1",
        "vocabulary": [
            {"word": "Red", "translation": "Qizil"},
            {"word": "Blue", "translation": "Ko'k"},
            {"word": "Green", "translation": "Yashil"},
            {"word": "This is", "translation": "Bu ..."},
            {"word": "Beautiful", "translation": "Chiroyli"}
        ],
        "reading": {
            "title": "Do'konda",
            "text": "Lisa: Look! This is a beautiful red dress.\nAnna: Oh, I like green more.\nLisa: This green bag is very nice too!",
            "question": "Lisa nima yoqtiradi?",
            "options": ["Green bag", "Red dress", "Blue shirt", "Yellow hat"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "This is a beautiful blue car.",
            "task": "Audioni tinglang va rangni yozing:\n\nThis is a beautiful _____ car.",
            "expected_text": "blue"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Bu chiroyli yashil daftar.'",
            "sample_solution": "This is a beautiful green notebook."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'This is a beautiful red flower.'",
            "target_phrase": "This is a beautiful red flower."
        }
    },
    {
        "id": 7,
        "title": "Vaqt va Kun",
        "level": "A1",
        "vocabulary": [
            {"word": "What time is it?", "translation": "Soat nechida?"},
            {"word": "Monday", "translation": "Dushanba"},
            {"word": "Weekend", "translation": "Dam olish kuni"},
            {"word": "Breakfast", "translation": "Nonushta"},
            {"word": "Soon", "translation": "Tez orada"}
        ],
        "reading": {
            "title": "Dushanba kuni",
            "text": "It is Monday morning. The time is 8 AM. Sarah has breakfast and goes to school.",
            "question": "Sarah qachon maktabga boradi?",
            "options": ["On weekends", "Monday morning", "Sunday", "At night"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "What time is it? It is eight o'clock.",
            "task": "Audioni tinglang va soatni yozing:\n\nIt is _____ o'clock.",
            "expected_text": "eight"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Hozir soat ertalab 9. Men maktabga boraman.'",
            "sample_solution": "It is 9 AM. I go to school."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'What time is it? It is nine o'clock.'",
            "target_phrase": "What time is it? It is nine o'clock."
        }
    },
    {
        "id": 8,
        "title": "Sayohat va Joylar",
        "level": "A1",
        "vocabulary": [
            {"word": "Airport", "translation": "Aeroport"},
            {"word": "Hotel", "translation": "Mehmonxona"},
            {"word": "Beach", "translation": "Plyaj"},
            {"word": "Where is?", "translation": "Qayerda?"},
            {"word": "Ticket", "translation": "Chipta"}
        ],
        "reading": {
            "title": "Sayohat rejalari",
            "text": "Ali is going to Istanbul. He buys a ticket at the airport. The hotel is near the beach.",
            "question": "Ali qayerga ketyapti?",
            "options": ["London", "Istanbul", "Paris", "Dubai"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "Where is the hotel? It is near the beach.",
            "task": "Audioni tinglang va javobni yozing:\n\nHotel _____ the beach.",
            "expected_text": "near"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Mehmonxona plyaj yaqinida.'",
            "sample_solution": "The hotel is near the beach."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'Where is the airport? I need a ticket.'",
            "target_phrase": "Where is the airport? I need a ticket."
        }
    },
    {
        "id": 9,
        "title": "Do'kon va Xarid",
        "level": "A1",
        "vocabulary": [
            {"word": "Shop", "translation": "Do'kon"},
            {"word": "How much?", "translation": "Nechada?"},
            {"word": "Cheap / Expensive", "translation": "Arzon / Qimmat"},
            {"word": "Money", "translation": "Pul"},
            {"word": "Buy", "translation": "Sotib olmoq"}
        ],
        "reading": {
            "title": "Kiyim do'konida",
            "text": "Mum: How much is this shirt?\nSeller: It is 50,000 so'm.\nMum: That is too expensive. Do you have a cheaper one?\nSeller: Yes, this one is 30,000 so'm.",
            "question": "Birinchi ko'ylak qancha turadi?",
            "options": ["30,000 so'm", "50,000 so'm", "20,000 so'm", "100,000 so'm"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "How much is this book? It costs ten dollars.",
            "task": "Audioni tinglang va kitob narxini yozing:\n\nIt costs _____ dollars.",
            "expected_text": "ten"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Bu ko'ylak qancha turadi? U 50 dollar.'",
            "sample_solution": "How much is this shirt? It costs 50 dollars."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'How much is this book? I want to buy it.'",
            "target_phrase": "How much is this book? I want to buy it."
        }
    },
    {
        "id": 10,
        "title": "Ob-havo va Fasllar",
        "level": "A1",
        "vocabulary": [
            {"word": "Hot / Cold", "translation": "Issiq / Sovuq"},
            {"word": "Rain", "translation": "Yomg'ir"},
            {"word": "Sun", "translation": "Quyosh"},
            {"word": "Winter", "translation": "Qish"},
            {"word": "Summer", "translation": "Yoz"}
        ],
        "reading": {
            "title": "Ob-havo",
            "text": "Today is very hot. The sun is shining. There are no clouds. I want to go to the beach.",
            "question": "Bugun qanday ob-havo?",
            "options": ["Sovuq", "Issiq", "Yomg'irli", "Bulutli"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "It is raining today. I need an umbrella.",
            "task": "Audioni tinglang va gapni to'liq yozing:",
            "expected_text": "It is raining today. I need an umbrella."
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Bugun juda issiq. Quyosh porlayapti.'",
            "sample_solution": "Today is very hot. The sun is shining."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'It is cold today. I need a jacket.'",
            "target_phrase": "It is cold today. I need a jacket."
        }
    },
    {
        "id": 11,
        "title": "Kasblar va Ish",
        "level": "A1",
        "vocabulary": [
            {"word": "Doctor", "translation": "Shifokor"},
            {"word": "Teacher", "translation": "O'qituvchi"},
            {"word": "Engineer", "translation": "Muhandis"},
            {"word": "Work", "translation": "Ish"},
            {"word": "Hospital", "translation": "Kasalxona"}
        ],
        "reading": {
            "title": "Kasblar",
            "text": "My father is a doctor. He works at a hospital. My mother is a teacher. She works at a school.",
            "question": "Onasi qayerda ishlaydi?",
            "options": ["Hospital", "School", "Bank", "Office"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "My father is a doctor and he works at a hospital.",
            "task": "Audioni tinglang va otasining kasbini yozing:\n\nMy father is a _____.",
            "expected_text": "doctor"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Mening otam shifokor. U kasalxonada ishlaydi.'",
            "sample_solution": "My father is a doctor. He works at a hospital."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I want to be a doctor. I will work at a hospital.'",
            "target_phrase": "I want to be a doctor. I will work at a hospital."
        }
    },
    {
        "id": 12,
        "title": "Hobbi va Qiziqishlar",
        "level": "A1",
        "vocabulary": [
            {"word": "Football", "translation": "Futbol"},
            {"word": "Music", "translation": "Musiqa"},
            {"word": "Reading", "translation": "O'qish"},
            {"word": "Swimming", "translation": "Suzish"},
            {"word": "Favorite", "translation": "Sevimli"}
        ],
        "reading": {
            "title": "Mening hobbiim",
            "text": "I like playing football. My favorite team is Barcelona. On weekends, I play with my friends.",
            "question": "Uning sevimli jamoasi qaysi?",
            "options": ["Real Madrid", "Barcelona", "Liverpool", "Manchester"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "My favorite hobby is reading books.",
            "task": "Audioni tinglang va hobbiini yozing:\n\nMy favorite hobby is _____.",
            "expected_text": "reading books"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Mening sevimli shug'lanishim futbol o'ynash.'",
            "sample_solution": "My favorite hobby is playing football."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I like playing football and listening to music.'",
            "target_phrase": "I like playing football and listening to music."
        }
    },
    # ==================== A2 (ELEMENTARY) ====================
    {
        "id": 13,
        "title": "O'tgan Zamon (Past Simple)",
        "level": "A2",
        "vocabulary": [
            {"word": "Yesterday", "translation": "Kecha"},
            {"word": "Went", "translation": "Bordi (goning past)"},
            {"word": "Ate", "translation": "Yedi (eatning past)"},
            {"word": "Saw", "translation": "Ko'rdi (seening past)"},
            {"word": "Played", "translation": "O'ynadi"}
        ],
        "reading": {
            "title": "Kechagi kun",
            "text": "Yesterday I went to the park. I saw my friends there. We played football and ate ice cream. It was a great day!",
            "question": "Ular parkda nima qilishdi?",
            "options": ["Swimming", "Football o'ynashdi", "Kitob o'qishdi", "Film ko'rishdi"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "Yesterday I went to the park and played football.",
            "task": "Audioni tinglang va to'liq gapni yozing:",
            "expected_text": "Yesterday I went to the park and played football."
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Kecha men do'stlarim bilan kinoga bordim.'",
            "sample_solution": "Yesterday I went to the cinema with my friends."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'Yesterday I went to the park and played football.'",
            "target_phrase": "Yesterday I went to the park and played football."
        }
    },
    {
        "id": 14,
        "title": "Kelajak Rejalari (Will / Going to)",
        "level": "A2",
        "vocabulary": [
            {"word": "Tomorrow", "translation": "Ertaga"},
            {"word": "Will", "translation": "-man (kelajak)"},
            {"word": "Going to", "translation": "Rejalanyapti"},
            {"word": "Plan", "translation": "Reja"},
            {"word": "Vacation", "translation": "Ta'til"}
        ],
        "reading": {
            "title": "Kelajak rejalari",
            "text": "Next week, I am going to visit my grandmother. She lives in Samarkand. I will stay there for three days.",
            "question": "U qayerga boradi?",
            "options": ["Tashkent", "Bukhara", "Samarkand", "Khiva"],
            "correct_option": 2
        },
        "listening": {
            "audio_text": "I am going to visit my grandmother tomorrow.",
            "task": "Audioni tinglang va qayerga borishini yozing:\n\nI am going to visit my _____.",
            "expected_text": "grandmother"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Ertaga men kinoga boraman.'",
            "sample_solution": "Tomorrow I am going to the cinema."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'Tomorrow I am going to visit my friend.'",
            "target_phrase": "Tomorrow I am going to visit my friend."
        }
    },
    {
        "id": 15,
        "title": "Taqqoslash (Comparatives)",
        "level": "A2",
        "vocabulary": [
            {"word": "Bigger", "translation": "Kattaroq"},
            {"word": "Smaller", "translation": "Kichikroq"},
            {"word": "Better", "translation": "Yaxshiroq"},
            {"word": "Than", "translation": "Dan (taqqoslash)"},
            {"word": "The most", "translation": "Eng"}
        ],
        "reading": {
            "title": "Shaharlar taqqoslash",
            "text": "Tashkent is bigger than Samarkand. But Samarkand is more beautiful than Tashkent. I like Samarkand the most.",
            "question": "Qaysi shahar kattaroq?",
            "options": ["Samarkand", "Bukhara", "Tashkent", "Khiva"],
            "correct_option": 2
        },
        "listening": {
            "audio_text": "Samarkand is more beautiful than Tashkent.",
            "task": "Audioni tinglang va qaysi shahar chiroyliroq:\n\n_____ is more beautiful than _____.",
            "expected_text": "Samarkand is more beautiful than Tashkent."
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Mening akam mendan kattaroq.'",
            "sample_solution": "My brother is bigger than me."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'This book is more interesting than that one.'",
            "target_phrase": "This book is more interesting than that one."
        }
    },
    {
        "id": 16,
        "title": "So'rov va Ruxsat",
        "level": "A2",
        "vocabulary": [
            {"word": "Can I?", "translation": "Men ... mumkinmi?"},
            {"word": "Could you?", "translation": "Iltimos ... olasizmi?"},
            {"word": "Please", "translation": "Iltimos"},
            {"word": "Excuse me", "translation": "Kechirasiz"},
            {"word": "Thank you", "translation": "Rahmat"}
        ],
        "reading": {
            "title": "Kutubxonada",
            "text": "Student: Excuse me, can I borrow this book?\nLibrarian: Yes, of course. Please bring it back next week.\nStudent: Thank you very much!",
            "question": "Talaba nima so'rayapti?",
            "options": ["Pul so'rayapti", "Kitob olishni so'rayapti", "Yordam so'rayapti", "Ruxsat so'rayapti"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "Could you please help me with my homework?",
            "task": "Audioni tinglang va to'liq yozing:",
            "expected_text": "Could you please help me with my homework?"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Kechirasiz, menga yordam bera olasizmi?'",
            "sample_solution": "Excuse me, could you help me?"
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'Excuse me, can I borrow your pen?'",
            "target_phrase": "Excuse me, can I borrow your pen?"
        }
    },
    {
        "id": 17,
        "title": "Sarflar va Byudjet",
        "level": "A2",
        "vocabulary": [
            {"word": "Price", "translation": "Narx"},
            {"word": "Discount", "translation": "Chegirma"},
            {"word": "Expensive", "translation": "Qimmat"},
            {"word": "Cheap", "translation": "Arzon"},
            {"word": "Pay", "translation": "To'lash"}
        ],
        "reading": {
            "title": "Xarid qilish",
            "text": "I went shopping yesterday. I bought a new phone for 500 dollars. It was on discount, so it was cheaper than usual.",
            "question": "Telefon qancha turdi?",
            "options": ["600 dollar", "500 dollar", "400 dollar", "700 dollar"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "The phone costs five hundred dollars.",
            "task": "Audioni tinglang va narxni yozing:\n\nThe phone costs _____ dollars.",
            "expected_text": "five hundred"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Men yangi telefon sotib oldim. U 500 dollar turdi.'",
            "sample_solution": "I bought a new phone. It cost 500 dollars."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I bought a new phone. It was on discount.'",
            "target_phrase": "I bought a new phone. It was on discount."
        }
    },
    {
        "id": 18,
        "title": "Sog'liq va Tibbiyot",
        "level": "A2",
        "vocabulary": [
            {"word": "Headache", "translation": "Bosh og'rig'i"},
            {"word": "Fever", "translation": "Isitma"},
            {"word": "Medicine", "translation": "Dori"},
            {"word": "Hospital", "translation": "Kasalxona"},
            {"word": "Feel sick", "translation": "Kasal sezmoq"}
        ],
        "reading": {
            "title": "Kasalxonada",
            "text": "I feel sick today. I have a headache and fever. I went to the hospital. The doctor gave me medicine.",
            "question": "U nima sezmoqda?",
            "options": ["Ochlik", "Charchash", "Kasallik", "Uyqu"],
            "correct_option": 2
        },
        "listening": {
            "audio_text": "I have a headache and I need medicine.",
            "task": "Audioni tinglang va kasallikni yozing:\n\nI have a _____.",
            "expected_text": "headache"
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Mening boshim og'riyapti. Menga dori kerak.'",
            "sample_solution": "I have a headache. I need medicine."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I feel sick. I have a fever and headache.'",
            "target_phrase": "I feel sick. I have a fever and headache."
        }
    },
    # ==================== B1 (INTERMEDIATE) ====================
    {
        "id": 19,
        "title": "O'tgan Zamon Ideal (Past Perfect)",
        "level": "B1",
        "vocabulary": [
            {"word": "Had + past participle", "translation": "O'tgan zamonning o'tgani"},
            {"word": "Before", "translation": "Oldin"},
            {"word": "Already", "translation": "Allaqachon"},
            {"word": "Yet", "translation": "Hali"},
            {"word": "Since", "translation": "Dan beri"}
        ],
        "reading": {
            "title": "Sayohat",
            "text": "When I arrived at the airport, the plane had already left. I was very sad because I had bought the ticket two weeks ago.",
            "question": "U samolyot qachon ketgan edi?",
            "options": ["U kelgandan keyin", "U kelgandan oldin", "Bir vaqtda", "Ertaga"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "I had already finished my homework before she came.",
            "task": "Audioni tinglang va to'liq gapni yozing:",
            "expected_text": "I had already finished my homework before she came."
        },
        "writing": {
            "task": "Ingliz tilida yozing:\n\n'Men kelganimda, u allaqachon ketgan edi.'",
            "sample_solution": "When I came, he had already left."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I had already eaten before you arrived.'",
            "target_phrase": "I had already eaten before you arrived."
        }
    },
    {
        "id": 20,
        "title": "Passive Voice (Passiv)",
        "level": "B1",
        "vocabulary": [
            {"word": "Was/were + past participle", "translation": "Passiv o'tgan zamon"},
            {"word": "Is/am/are + past participle", "translation": "Passiv hozirgi zamon"},
            {"word": "By", "translation": "Tomonidan"},
            {"word": "Built", "translation": "Qurilgan"},
            {"word": "Written", "translation": "Yozilgan"}
        ],
        "reading": {
            "title": "Tarixiy bino",
            "text": "The Registan was built in the 15th century. It was designed by famous architects. Every year, thousands of tourists visit it.",
            "question": "Registan qachon qurilgan?",
            "options": ["14-asrda", "15-asrda", "16-asrda", "20-asrda"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "The book was written by a famous author.",
            "task": "Audioni tinglang va passive formani toping:\n\nThe book _____ by a famous author.",
            "expected_text": "was written"
        },
        "writing": {
            "task": "Ingliz tilida yozing (passive voice):\n\n'Bu uy 2020-yilda qurilgan.'",
            "sample_solution": "This house was built in 2020."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'The bridge was built in 1950.'",
            "target_phrase": "The bridge was built in 1950."
        }
    },
    {
        "id": 21,
        "title": "Reported Speech (Aytilgan Gap)",
        "level": "B1",
        "vocabulary": [
            {"word": "Said", "translation": "Dedi"},
            {"word": "Told", "translation": "Aytdi"},
            {"word": "Asked", "translation": "So'radi"},
            {"word": "That", "translation": " deb"},
            {"word": "If / whether", "translation": " ...mi"}
        ],
        "reading": {
            "title": "Suhbat",
            "text": "Tom said that he was tired. He told me that he had worked all day. He asked if I could help him.",
            "question": "Tom nima dedi?",
            "options": ["Charchaganini", "Och ekanini", "Uyqu kelganini", "Xursand ekanini"],
            "correct_option": 0
        },
        "listening": {
            "audio_text": "She said that she was coming tomorrow.",
            "task": "Audioni tinglang va to'liq yozing:",
            "expected_text": "She said that she was coming tomorrow."
        },
        "writing": {
            "task": "Ingliz tilida yozing (reported speech):\n\nU dedi: Men ertaga kelaman.",
            "sample_solution": "He said that he was coming tomorrow."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'He said that he was tired and needed rest.'",
            "target_phrase": "He said that he was tired and needed rest."
        }
    },
    {
        "id": 22,
        "title": "First & Second Conditionals",
        "level": "B1",
        "vocabulary": [
            {"word": "If", "translation": "Agar"},
            {"word": "Will", "translation": "-man (kelajak)"},
            {"word": "Would", "translation": "-ardim (virtual)"},
            {"word": "Unless", "translation": "Agar ...masa"},
            {"word": "In case", "translation": "Agar ...bo'lsa"}
        ],
        "reading": {
            "title": "Rejalar",
            "text": "If it rains tomorrow, I will stay at home. If I had more money, I would travel around the world.",
            "question": "U ko'p puli bo'lsa nima qiladi?",
            "options": ["Uy sotib oladi", "Dunyo bo'ylab sayohat qiladi", "Maktabga boradi", "Ishlaydi"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "If it rains, I will take an umbrella.",
            "task": "Audioni tinglang va to'liq gapni yozing:",
            "expected_text": "If it rains, I will take an umbrella."
        },
        "writing": {
            "task": "Ingliz tilida yozing (first conditional):\n\n'Agar men boy bo'lsam, uy sotib olaman.'",
            "sample_solution": "If I am rich, I will buy a house."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'If I have time, I will visit you tomorrow.'",
            "target_phrase": "If I have time, I will visit you tomorrow."
        }
    },
    {
        "id": 23,
        "title": "Phrasal Verbs (Frazali Fe'llar)",
        "level": "B1",
        "vocabulary": [
            {"word": "Look after", "translation": "G'amxo'rlik qilmoq"},
            {"word": "Give up", "translation": "Vaz kechmoq"},
            {"word": "Get up", "translation": "Uyg'onmoq"},
            {"word": "Turn on", "translation": "Yoqmoq"},
            {"word": "Put on", "translation": "Kiyimoq"}
        ],
        "reading": {
            "title": "Kundalik hayot",
            "text": "Every morning I get up at 7. I turn on the TV and have breakfast. I never give up on my dreams.",
            "question": "U ertalab nima qiladi?",
            "options": ["TV ni o'chiradi", "TV ni yoqadi", "Kitob o'qiydi", "Sport bilan shug'ullanadi"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "I need to look after my little brother today.",
            "task": "Audioni tinglang va frazal fe'lni toping:\n\nI need to _____ my little brother today.",
            "expected_text": "look after"
        },
        "writing": {
            "task": "Ingliz tilida yozing (phrasal verb ishlatib):\n\n'Men ertalab soat 7 da uyg'onaman va televizorni yoqaman.'",
            "sample_solution": "I get up at 7 AM and turn on the TV."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'I will never give up on my dreams.'",
            "target_phrase": "I will never give up on my dreams."
        }
    },
    {
        "id": 24,
        "title": "Inglizcha Idiomatik ifodalar",
        "level": "B1",
        "vocabulary": [
            {"word": "Break a leg", "translation": "Omad tilayman!"},
            {"word": "Piece of cake", "translation": "Juda oson"},
            {"word": "Hit the books", "translation": "Dars qilmoq"},
            {"word": "Under the weather", "translation": "Kasal"},
            {"word": "Cost an arm and a leg", "translation": "Juda qimmat"}
        ],
        "reading": {
            "title": "Idiomlar",
            "text": "Tom's exam was a piece of cake. He hit the books all night. Now he is under the weather because he didn't sleep.",
            "question": "Tomning imtihoni qanday o'tdi?",
            "options": ["Qiyin", "Oson", "Uzoq", "Noto'g'ri"],
            "correct_option": 1
        },
        "listening": {
            "audio_text": "The new phone costs an arm and a leg.",
            "task": "Audioni tinglang va idomani toping:\n\nThe new phone _____ an arm and a leg.",
            "expected_text": "costs"
        },
        "writing": {
            "task": "Ingliz tilida yozing (idiom ishlatib):\n\n'Mening imtihonim juda oson edi.'",
            "sample_solution": "My exam was a piece of cake."
        },
        "speaking": {
            "task": "Ovozli xabar yuboring:\n\n👉 'Break a leg on your exam tomorrow!'",
            "target_phrase": "Break a leg on your exam tomorrow!"
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


def get_lessons_by_level(level: str):
    return [l for l in LESSONS if l["level"] == level]
