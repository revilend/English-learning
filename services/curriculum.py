"""To'liq kurikulum: A0 dan B1 gacha (30 dars)"""

LESSONS = [
    # ==================== A0 (STARTER) ====================
    {
        "id": 1, "title": "Salomlashish va Tanishuv", "level": "A0",
        "vocabulary": [
            {"word": "Hello", "translation": "Salom"}, {"word": "Name", "translation": "Ism"},
            {"word": "Nice to meet you", "translation": "Tanishganimdan xursandman"},
            {"word": "I am", "translation": "Men ... man"}, {"word": "Goodbye", "translation": "Xayr"}
        ],
        "reading": {
            "title": "Tanishuv dialogi",
            "text": "Alex: Hello! My name is Alex.\nSarah: Hi Alex! I am Sarah. Nice to meet you.\nAlex: Nice to meet you too!",
            "question": "Sarah kim bilan tanishdi?",
            "options": ["Alex", "John", "David", "Tom"], "correct_option": 0
        },
        "listening": {"audio_text": "Hello, my name is Alex. Nice to meet you.",
            "task": "Audioni tinglang va to'liq yozing:",
            "expected_text": "Hello, my name is Alex. Nice to meet you."},
        "writing": {"task": "Ingliz tilida yozing: 'Salom! Mening ismim ... Tanishganimdan xursandman.'",
            "sample_solution": "Hello! My name is ... Nice to meet you."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Hello! My name is John. Nice to meet you.'",
            "target_phrase": "Hello! My name is John. Nice to meet you."}
    },
    {
        "id": 2, "title": "Raqamlar va Yosh", "level": "A0",
        "vocabulary": [
            {"word": "One, Two, Three", "translation": "Bir, Ikki, Uch"}, {"word": "Ten", "translation": "O'n"},
            {"word": "Years old", "translation": "Yoshda"}, {"word": "How old are you?", "translation": "Yoshingiz nechida?"},
            {"word": "Student", "translation": "Talaba"}
        ],
        "reading": {"title": "David haqida", "text": "This is David. He is twenty years old. David is a student.",
            "question": "David necha yoshda?", "options": ["15", "20", "25", "10"], "correct_option": 1},
        "listening": {"audio_text": "I am twenty years old and I am a student.",
            "task": "Audioni tinglang va yoshni yozing: 'I am _____ years old.'",
            "expected_text": "twenty"},
        "writing": {"task": "Ingliz tilida yozing: 'Men 18 yoshdaman va men talabaman.'",
            "sample_solution": "I am 18 years old and I am a student."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I am twenty years old.'",
            "target_phrase": "I am twenty years old."}
    },
    {
        "id": 3, "title": "Oila va Qarindoshlar", "level": "A0",
        "vocabulary": [
            {"word": "Father / Mother", "translation": "Ota / Ona"}, {"word": "Brother / Sister", "translation": "Aka-uka / Opa-singil"},
            {"word": "Family", "translation": "Oila"}, {"word": "Love", "translation": "Sevmoq"},
            {"word": "Big / Small", "translation": "Katta / Kichik"}
        ],
        "reading": {"title": "Mening oilam", "text": "I have a small family. My father is a doctor. My mother is a teacher.",
            "question": "Onasi kim bo'lib ishlaydi?", "options": ["Doctor", "Driver", "Teacher", "Engineer"], "correct_option": 2},
        "listening": {"audio_text": "My father is a doctor and my mother is a teacher.",
            "task": "Audioni tinglang va otasining kasbini yozing:", "expected_text": "doctor"},
        "writing": {"task": "Ingliz tilida yozing: 'Bu mening otam. Men oilamni yaxshi ko'raman.'",
            "sample_solution": "This is my father. I love my family."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I have a family and I love my mother.'",
            "target_phrase": "I have a family and I love my mother."}
    },
    # ==================== A1 (BEGINNER) ====================
    {
        "id": 4, "title": "Kundalik Harakatlar", "level": "A1",
        "vocabulary": [
            {"word": "Wake up", "translation": "Uyg'onmoq"}, {"word": "Drink coffee", "translation": "Kofe ichmoq"},
            {"word": "Go to work", "translation": "Ishga bormoq"}, {"word": "In the morning", "translation": "Ertalab"},
            {"word": "Every day", "translation": "Har kuni"}
        ],
        "reading": {"title": "Ertalabki reja", "text": "Every day, I wake up at 7 AM. I drink black coffee. Then I go to work.",
            "question": "U ertalab nima ichadi?", "options": ["Tea", "Juice", "Milk", "Black coffee"], "correct_option": 3},
        "listening": {"audio_text": "Every day I wake up at seven and drink coffee.",
            "task": "Audioni tinglang va to'liq gapni yozing:", "expected_text": "Every day I wake up at seven and drink coffee."},
        "writing": {"task": "Ingliz tilida yozing: 'Men har kuni ertalab soat 7 da uyg'onaman.'",
            "sample_solution": "I wake up at 7 every morning."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I drink coffee every day.'",
            "target_phrase": "I drink coffee every day."}
    },
    {
        "id": 5, "title": "Taom va Ichimlik", "level": "A1",
        "vocabulary": [
            {"word": "Water", "translation": "Suv"}, {"word": "Bread", "translation": "Non"},
            {"word": "Apple", "translation": "Olma"}, {"word": "Rice", "translation": "Guruch"},
            {"word": "I would like", "translation": "Men ... istayman"}
        ],
        "reading": {"title": "Restoranda", "text": "Waiter: What would you like?\nTom: I would like water and bread, please.",
            "question": "Tom nima buyurtma berdi?", "options": ["Juice", "Water and bread", "Coffee", "Milk"], "correct_option": 1},
        "listening": {"audio_text": "I would like water and bread, please.",
            "task": "Audioni tinglang va to'liq yozing:", "expected_text": "I would like water and bread, please."},
        "writing": {"task": "Ingliz tilida yozing: 'Men suv va non istayman, iltimos.'",
            "sample_solution": "I would like water and bread, please."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I would like an apple, please.'",
            "target_phrase": "I would like an apple, please."}
    },
    {
        "id": 6, "title": "Ranglar va Buyumlar", "level": "A1",
        "vocabulary": [
            {"word": "Red", "translation": "Qizil"}, {"word": "Blue", "translation": "Ko'k"},
            {"word": "Green", "translation": "Yashil"}, {"word": "This is", "translation": "Bu ..."},
            {"word": "Beautiful", "translation": "Chiroyli"}
        ],
        "reading": {"title": "Do'konda", "text": "Lisa: Look! This is a beautiful red dress.\nAnna: I like green more.",
            "question": "Lisa nima yoqtiradi?", "options": ["Green bag", "Red dress", "Blue shirt", "Yellow hat"], "correct_option": 1},
        "listening": {"audio_text": "This is a beautiful blue car.",
            "task": "Audioni tinglang va rangni yozing: 'This is a beautiful _____ car.'",
            "expected_text": "blue"},
        "writing": {"task": "Ingliz tilida yozing: 'Bu chiroyli yashil daftar.'",
            "sample_solution": "This is a beautiful green notebook."},
        "speaking": {"task": "Ovozli xabar yuboring: 'This is a beautiful red flower.'",
            "target_phrase": "This is a beautiful red flower."}
    },
    {
        "id": 7, "title": "Vaqt va Kun", "level": "A1",
        "vocabulary": [
            {"word": "What time is it?", "translation": "Soat nechida?"}, {"word": "Monday", "translation": "Dushanba"},
            {"word": "Weekend", "translation": "Dam olish kuni"}, {"word": "Breakfast", "translation": "Nonushta"},
            {"word": "Soon", "translation": "Tez orada"}
        ],
        "reading": {"title": "Dushanba kuni", "text": "It is Monday morning. The time is 8 AM. Sarah has breakfast and goes to school.",
            "question": "Sarah qachon maktabga boradi?", "options": ["On weekends", "Monday morning", "Sunday", "At night"], "correct_option": 1},
        "listening": {"audio_text": "What time is it? It is eight o'clock.",
            "task": "Audioni tinglang va soatni yozing: 'It is _____ o'clock.'", "expected_text": "eight"},
        "writing": {"task": "Ingliz tilida yozing: 'Hozir soat ertalab 9.'",
            "sample_solution": "It is 9 AM."},
        "speaking": {"task": "Ovozli xabar yuboring: 'What time is it? It is nine o'clock.'",
            "target_phrase": "What time is it? It is nine o'clock."}
    },
    {
        "id": 8, "title": "Sayohat va Joylar", "level": "A1",
        "vocabulary": [
            {"word": "Airport", "translation": "Aeroport"}, {"word": "Hotel", "translation": "Mehmonxona"},
            {"word": "Beach", "translation": "Plyaj"}, {"word": "Where is?", "translation": "Qayerda?"},
            {"word": "Ticket", "translation": "Chipta"}
        ],
        "reading": {"title": "Sayohat", "text": "Ali is going to Istanbul. He buys a ticket at the airport. The hotel is near the beach.",
            "question": "Ali qayerga ketyapti?", "options": ["London", "Istanbul", "Paris", "Dubai"], "correct_option": 1},
        "listening": {"audio_text": "Where is the hotel? It is near the beach.",
            "task": "Audioni tinglang va javobni yozing: 'Hotel _____ the beach.'", "expected_text": "near"},
        "writing": {"task": "Ingliz tilida yozing: 'Mehmonxona plyaj yaqinida.'",
            "sample_solution": "The hotel is near the beach."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Where is the airport? I need a ticket.'",
            "target_phrase": "Where is the airport? I need a ticket."}
    },
    {
        "id": 9, "title": "Do'kon va Xarid", "level": "A1",
        "vocabulary": [
            {"word": "Shop", "translation": "Do'kon"}, {"word": "How much?", "translation": "Nechada?"},
            {"word": "Cheap / Expensive", "translation": "Arzon / Qimmat"}, {"word": "Money", "translation": "Pul"},
            {"word": "Buy", "translation": "Sotib olmoq"}
        ],
        "reading": {"title": "Kiyim do'konida", "text": "Mum: How much is this shirt?\nSeller: It is 50,000 so'm.\nMum: That is too expensive.",
            "question": "Birinchi ko'ylak qancha turadi?", "options": ["30,000", "50,000", "20,000", "100,000"], "correct_option": 1},
        "listening": {"audio_text": "How much is this book? It costs ten dollars.",
            "task": "Audioni tinglang va narxni yozing: 'It costs _____ dollars.'", "expected_text": "ten"},
        "writing": {"task": "Ingliz tilida yozing: 'Bu ko'ylak qancha turadi? U 50 dollar.'",
            "sample_solution": "How much is this shirt? It costs 50 dollars."},
        "speaking": {"task": "Ovozli xabar yuboring: 'How much is this book? I want to buy it.'",
            "target_phrase": "How much is this book? I want to buy it."}
    },
    {
        "id": 10, "title": "Ob-havo va Fasllar", "level": "A1",
        "vocabulary": [
            {"word": "Hot / Cold", "translation": "Issiq / Sovuq"}, {"word": "Rain", "translation": "Yomg'ir"},
            {"word": "Sun", "translation": "Quyosh"}, {"word": "Winter", "translation": "Qish"},
            {"word": "Summer", "translation": "Yoz"}
        ],
        "reading": {"title": "Ob-havo", "text": "Today is very hot. The sun is shining. I want to go to the beach.",
            "question": "Bugun qanday ob-havo?", "options": ["Sovuq", "Issiq", "Yomg'irli", "Bulutli"], "correct_option": 1},
        "listening": {"audio_text": "It is raining today. I need an umbrella.",
            "task": "Audioni tinglang va gapni to'liq yozing:", "expected_text": "It is raining today. I need an umbrella."},
        "writing": {"task": "Ingliz tilida yozing: 'Bugun juda issiq. Quyosh porlayapti.'",
            "sample_solution": "Today is very hot. The sun is shining."},
        "speaking": {"task": "Ovozli xabar yuboring: 'It is cold today. I need a jacket.'",
            "target_phrase": "It is cold today. I need a jacket."}
    },
    {
        "id": 11, "title": "Kasblar va Ish", "level": "A1",
        "vocabulary": [
            {"word": "Doctor", "translation": "Shifokor"}, {"word": "Teacher", "translation": "O'qituvchi"},
            {"word": "Engineer", "translation": "Muhandis"}, {"word": "Work", "translation": "Ish"},
            {"word": "Hospital", "translation": "Kasalxona"}
        ],
        "reading": {"title": "Kasblar", "text": "My father is a doctor. He works at a hospital. My mother is a teacher.",
            "question": "Onasi qayerda ishlaydi?", "options": ["Hospital", "School", "Bank", "Office"], "correct_option": 1},
        "listening": {"audio_text": "My father is a doctor and he works at a hospital.",
            "task": "Audioni tinglang va kasbni yozing: 'My father is a _____.'", "expected_text": "doctor"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening otam shifokor. U kasalxonada ishlaydi.'",
            "sample_solution": "My father is a doctor. He works at a hospital."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I want to be a doctor.'",
            "target_phrase": "I want to be a doctor."}
    },
    {
        "id": 12, "title": "Hobbi va Qiziqishlar", "level": "A1",
        "vocabulary": [
            {"word": "Football", "translation": "Futbol"}, {"word": "Music", "translation": "Musiqa"},
            {"word": "Reading", "translation": "O'qish"}, {"word": "Swimming", "translation": "Suzish"},
            {"word": "Favorite", "translation": "Sevimli"}
        ],
        "reading": {"title": "Mening hobbiim", "text": "I like playing football. My favorite team is Barcelona.",
            "question": "Uning sevimli jamoasi qaysi?", "options": ["Real Madrid", "Barcelona", "Liverpool", "Chelsea"], "correct_option": 1},
        "listening": {"audio_text": "My favorite hobby is reading books.",
            "task": "Audioni tinglang va hobbiini yozing: 'My favorite hobby is _____.'", "expected_text": "reading books"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening sevimli shug'lanishim futbol o'ynash.'",
            "sample_solution": "My favorite hobby is playing football."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I like playing football and listening to music.'",
            "target_phrase": "I like playing football and listening to music."}
    },
    {
        "id": 13, "title": "Transport va Sayohat", "level": "A1",
        "vocabulary": [
            {"word": "Bus", "translation": "Avtobus"}, {"word": "Train", "translation": "Poyezd"},
            {"word": "Car", "translation": "Mashina"}, {"word": "Station", "translation": "Stansiya"},
            {"word": "Ticket", "translation": "Chipta"}
        ],
        "reading": {"title": "Stansiyada", "text": "I go to the train station every morning. I buy a ticket and take the train to work.",
            "question": "U har kuni qayerga boradi?", "options": ["Maktabga", "Do'konga", "Stansiyaga", "Kasalxonaga"], "correct_option": 2},
        "listening": {"audio_text": "I take the bus to school every day.",
            "task": "Audioni tinglang va transport turini yozing: 'I take the _____ to school.'", "expected_text": "bus"},
        "writing": {"task": "Ingliz tilida yozing: 'Men har kuni avtobusda ishga boraman.'",
            "sample_solution": "I go to work by bus every day."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I take the train to work every morning.'",
            "target_phrase": "I take the train to work every morning."}
    },
    {
        "id": 14, "title": "Do'stlar va Ijtimoiy Hayot", "level": "A1",
        "vocabulary": [
            {"word": "Friend", "translation": "Do'st"}, {"word": "Party", "translation": "Ziyofat"},
            {"word": "Invite", "translation": "Taklif qilmoq"}, {"word": "Fun", "translation": "Ko'ngil ochish"},
            {"word": "Together", "translation": "Birga"}
        ],
        "reading": {"title": "Do'stlar bilan", "text": "I have many friends. We play together after school. On Friday, we have a party.",
            "question": "Juma kuni nima qilishadi?", "options": ["Maktabga", "Ziyofat", "Uyqqa", "Ishlayishadi"], "correct_option": 1},
        "listening": {"audio_text": "My best friend is Ali. We play football together.",
            "task": "Audioni tinglang va do'stining ismini yozing: 'My best friend is _____.'", "expected_text": "Ali"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening do'stim bilan men futbol o'ynaymiz.'",
            "sample_solution": "My friend and I play football together."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I have a best friend and we have fun together.'",
            "target_phrase": "I have a best friend and we have fun together."}
    },
    # ==================== A2 (ELEMENTARY) ====================
    {
        "id": 15, "title": "O'tgan Zamon (Past Simple)", "level": "A2",
        "vocabulary": [
            {"word": "Yesterday", "translation": "Kecha"}, {"word": "Went", "translation": "Bordi"},
            {"word": "Ate", "translation": "Yedi"}, {"word": "Saw", "translation": "Ko'rdi"},
            {"word": "Played", "translation": "O'ynadi"}
        ],
        "reading": {"title": "Kechagi kun", "text": "Yesterday I went to the park. I saw my friends. We played football.",
            "question": "Ular parkda nima qilishdi?", "options": ["Swimming", "Football", "Kitob", "Film"], "correct_option": 1},
        "listening": {"audio_text": "Yesterday I went to the park and played football.",
            "task": "Audioni tinglang va to'liq gapni yozing:", "expected_text": "Yesterday I went to the park and played football."},
        "writing": {"task": "Ingliz tilida yozing: 'Kecha men do'stlarim bilan kinoga bordim.'",
            "sample_solution": "Yesterday I went to the cinema with my friends."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Yesterday I went to the park and played football.'",
            "target_phrase": "Yesterday I went to the park and played football."}
    },
    {
        "id": 16, "title": "Kelajak Rejalari (Will / Going to)", "level": "A2",
        "vocabulary": [
            {"word": "Tomorrow", "translation": "Ertaga"}, {"word": "Will", "translation": "-man (kelajak)"},
            {"word": "Going to", "translation": "Rejalanyapti"}, {"word": "Plan", "translation": "Reja"},
            {"word": "Vacation", "translation": "Ta'til"}
        ],
        "reading": {"title": "Kelajak rejalari", "text": "Next week, I am going to visit my grandmother. She lives in Samarkand.",
            "question": "U qayerga boradi?", "options": ["Tashkent", "Bukhara", "Samarkand", "Khiva"], "correct_option": 2},
        "listening": {"audio_text": "I am going to visit my grandmother tomorrow.",
            "task": "Audioni tinglang: 'I am going to visit my _____.'", "expected_text": "grandmother"},
        "writing": {"task": "Ingliz tilida yozing: 'Ertaga men kinoga boraman.'",
            "sample_solution": "Tomorrow I am going to the cinema."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Tomorrow I am going to visit my friend.'",
            "target_phrase": "Tomorrow I am going to visit my friend."}
    },
    {
        "id": 17, "title": "Taqqoslash (Comparatives)", "level": "A2",
        "vocabulary": [
            {"word": "Bigger", "translation": "Kattaroq"}, {"word": "Smaller", "translation": "Kichikroq"},
            {"word": "Better", "translation": "Yaxshiroq"}, {"word": "Than", "translation": "Dan (taqqoslash)"},
            {"word": "The most", "translation": "Eng"}
        ],
        "reading": {"title": "Shaharlar taqqoslash", "text": "Tashkent is bigger than Samarkand. But Samarkand is more beautiful.",
            "question": "Qaysi shahar kattaroq?", "options": ["Samarkand", "Bukhara", "Tashkent", "Khiva"], "correct_option": 2},
        "listening": {"audio_text": "Samarkand is more beautiful than Tashkent.",
            "task": "Audioni tinglang: '_____ is more beautiful than _____.'", "expected_text": "Samarkand is more beautiful than Tashkent."},
        "writing": {"task": "Ingliz tilida yozing: 'Mening akam mendan kattaroq.'",
            "sample_solution": "My brother is bigger than me."},
        "speaking": {"task": "Ovozli xabar yuboring: 'This book is more interesting than that one.'",
            "target_phrase": "This book is more interesting than that one."}
    },
    {
        "id": 18, "title": "So'rov va Ruxsat", "level": "A2",
        "vocabulary": [
            {"word": "Can I?", "translation": "Mumkinmi?"}, {"word": "Could you?", "translation": "Olasizmi?"},
            {"word": "Please", "translation": "Iltimos"}, {"word": "Excuse me", "translation": "Kechirasiz"},
            {"word": "Thank you", "translation": "Rahmat"}
        ],
        "reading": {"title": "Kutubxonada", "text": "Student: Excuse me, can I borrow this book?\nLibrarian: Yes, of course.",
            "question": "Talaba nima so'rayapti?", "options": ["Pul", "Kitob", "Yordam", "Ruxsat"], "correct_option": 1},
        "listening": {"audio_text": "Could you please help me with my homework?",
            "task": "Audioni tinglang va to'liq yozing:", "expected_text": "Could you please help me with my homework?"},
        "writing": {"task": "Ingliz tilida yozing: 'Kechirasiz, menga yordam bera olasizmi?'",
            "sample_solution": "Excuse me, could you help me?"},
        "speaking": {"task": "Ovozli xabar yuboring: 'Excuse me, can I borrow your pen?'",
            "target_phrase": "Excuse me, can I borrow your pen?"}
    },
    {
        "id": 19, "title": "Sarflar va Byudjet", "level": "A2",
        "vocabulary": [
            {"word": "Price", "translation": "Narx"}, {"word": "Discount", "translation": "Chegirma"},
            {"word": "Expensive", "translation": "Qimmat"}, {"word": "Cheap", "translation": "Arzon"},
            {"word": "Pay", "translation": "To'lash"}
        ],
        "reading": {"title": "Xarid", "text": "I bought a new phone for 500 dollars. It was on discount.",
            "question": "Telefon qancha turdi?", "options": ["600", "500", "400", "700"], "correct_option": 1},
        "listening": {"audio_text": "The phone costs five hundred dollars.",
            "task": "Audioni tinglang: 'The phone costs _____ dollars.'", "expected_text": "five hundred"},
        "writing": {"task": "Ingliz tilida yozing: 'Men yangi telefon sotib oldim. U 500 dollar turdi.'",
            "sample_solution": "I bought a new phone. It cost 500 dollars."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I bought a new phone. It was on discount.'",
            "target_phrase": "I bought a new phone. It was on discount."}
    },
    {
        "id": 20, "title": "Sog'liq va Tibbiyot", "level": "A2",
        "vocabulary": [
            {"word": "Headache", "translation": "Bosh og'rig'i"}, {"word": "Fever", "translation": "Isitma"},
            {"word": "Medicine", "translation": "Dori"}, {"word": "Hospital", "translation": "Kasalxona"},
            {"word": "Feel sick", "translation": "Kasal sezmoq"}
        ],
        "reading": {"title": "Kasalxonada", "text": "I feel sick today. I have a headache and fever. The doctor gave me medicine.",
            "question": "U nima sezmoqda?", "options": ["Ochlik", "Charchash", "Kasallik", "Uyqu"], "correct_option": 2},
        "listening": {"audio_text": "I have a headache and I need medicine.",
            "task": "Audioni tinglang: 'I have a _____.'", "expected_text": "headache"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening boshim og'riyapti. Menga dori kerak.'",
            "sample_solution": "I have a headache. I need medicine."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I feel sick. I have a fever.'",
            "target_phrase": "I feel sick. I have a fever."}
    },
    {
        "id": 21, "title": "Texnologiya va Internet", "level": "A2",
        "vocabulary": [
            {"word": "Phone", "translation": "Telefon"}, {"word": "Computer", "translation": "Kompyuter"},
            {"word": "Internet", "translation": "Internet"}, {"word": "Download", "translation": "Yuklab olmoq"},
            {"word": "Social media", "translation": "Ijtimoiy tarmoq"}
        ],
        "reading": {"title": "Texnologiya", "text": "I use my phone every day. I download apps and use social media.",
            "question": "U nima uchun kompyuter ishlatadi?", "options": ["O'yin", "Film", "Ish", "Maktab"], "correct_option": 2},
        "listening": {"audio_text": "I use social media every day to talk to my friends.",
            "task": "Audioni tinglang: 'I use _____ every day.'", "expected_text": "social media"},
        "writing": {"task": "Ingliz tilida yozing: 'Men telefonimda har kuni internetdan foydalanaman.'",
            "sample_solution": "I use the internet on my phone every day."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I use my phone to talk to my friends.'",
            "target_phrase": "I use my phone to talk to my friends."}
    },
    # ==================== B1 (INTERMEDIATE) ====================
    {
        "id": 22, "title": "Past Perfect", "level": "B1",
        "vocabulary": [
            {"word": "Had + past participle", "translation": "O'tgan zamonning o'tgani"}, {"word": "Before", "translation": "Oldin"},
            {"word": "Already", "translation": "Allaqachon"}, {"word": "Yet", "translation": "Hali"},
            {"word": "Since", "translation": "Dan beri"}
        ],
        "reading": {"title": "Sayohat", "text": "When I arrived, the plane had already left. I was very sad.",
            "question": "U samolyot qachon ketgan edi?", "options": ["U kelgandan keyin", "U kelgandan oldin", "Bir vaqtda", "Ertaga"], "correct_option": 1},
        "listening": {"audio_text": "I had already finished my homework before she came.",
            "task": "Audioni tinglang va to'liq gapni yozing:", "expected_text": "I had already finished my homework before she came."},
        "writing": {"task": "Ingliz tilida yozing: 'Men kelganimda, u allaqachon ketgan edi.'",
            "sample_solution": "When I came, he had already left."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I had already eaten before you arrived.'",
            "target_phrase": "I had already eaten before you arrived."}
    },
    {
        "id": 23, "title": "Passive Voice", "level": "B1",
        "vocabulary": [
            {"word": "Was/were + past participle", "translation": "Passiv o'tgan zamon"}, {"word": "Is/am/are + past participle", "translation": "Passiv hozirgi zamon"},
            {"word": "By", "translation": "Tomonidan"}, {"word": "Built", "translation": "Qurilgan"},
            {"word": "Written", "translation": "Yozilgan"}
        ],
        "reading": {"title": "Tarixiy bino", "text": "The Registan was built in the 15th century. It was designed by famous architects.",
            "question": "Registan qachon qurilgan?", "options": ["14-asrda", "15-asrda", "16-asrda", "20-asrda"], "correct_option": 1},
        "listening": {"audio_text": "The book was written by a famous author.",
            "task": "Audioni tinglang: 'The book _____ by a famous author.'", "expected_text": "was written"},
        "writing": {"task": "Ingliz tilida yozing (passive): 'Bu uy 2020-yilda qurilgan.'",
            "sample_solution": "This house was built in 2020."},
        "speaking": {"task": "Ovozli xabar yuboring: 'The bridge was built in 1950.'",
            "target_phrase": "The bridge was built in 1950."}
    },
    {
        "id": 24, "title": "Reported Speech", "level": "B1",
        "vocabulary": [
            {"word": "Said", "translation": "Dedi"}, {"word": "Told", "translation": "Aytdi"},
            {"word": "Asked", "translation": "So'radi"}, {"word": "That", "translation": " deb"},
            {"word": "If / whether", "translation": " ...mi"}
        ],
        "reading": {"title": "Suhbat", "text": "Tom said that he was tired. He told me he had worked all day.",
            "question": "Tom nima dedi?", "options": ["Charchaganini", "Och ekanini", "Uyqu kelganini", "Xursand"], "correct_option": 0},
        "listening": {"audio_text": "She said that she was coming tomorrow.",
            "task": "Audioni tinglang va to'liq yozing:", "expected_text": "She said that she was coming tomorrow."},
        "writing": {"task": "Ingliz tilida yozing (reported speech): 'U dedi: Men ertaga kelaman.'",
            "sample_solution": "He said that he was coming tomorrow."},
        "speaking": {"task": "Ovozli xabar yuboring: 'He said that he was tired.'",
            "target_phrase": "He said that he was tired."}
    },
    {
        "id": 25, "title": "First & Second Conditionals", "level": "B1",
        "vocabulary": [
            {"word": "If", "translation": "Agar"}, {"word": "Will", "translation": "-man (kelajak)"},
            {"word": "Would", "translation": "-ardim (virtual)"}, {"word": "Unless", "translation": "Agar ...masa"},
            {"word": "In case", "translation": "Agar ...bo'lsa"}
        ],
        "reading": {"title": "Rejalar", "text": "If it rains, I will stay home. If I had money, I would travel.",
            "question": "U ko'p puli bo'lsa nima qiladi?", "options": ["Uy", "Sayohat", "Maktab", "Ish"], "correct_option": 1},
        "listening": {"audio_text": "If it rains, I will take an umbrella.",
            "task": "Audioni tinglang va to'liq gapni yozing:", "expected_text": "If it rains, I will take an umbrella."},
        "writing": {"task": "Ingliz tilida yozing: 'Agar men boy bo'lsam, uy sotib olaman.'",
            "sample_solution": "If I am rich, I will buy a house."},
        "speaking": {"task": "Ovozli xabar yuboring: 'If I have time, I will visit you.'",
            "target_phrase": "If I have time, I will visit you."}
    },
    {
        "id": 26, "title": "Phrasal Verbs", "level": "B1",
        "vocabulary": [
            {"word": "Look after", "translation": "G'amxo'rlik qilmoq"}, {"word": "Give up", "translation": "Vaz kechmoq"},
            {"word": "Get up", "translation": "Uyg'onmoq"}, {"word": "Turn on", "translation": "Yoqmoq"},
            {"word": "Put on", "translation": "Kiyimoq"}
        ],
        "reading": {"title": "Kundalik hayot", "text": "Every morning I get up at 7. I turn on the TV. I never give up on my dreams.",
            "question": "U ertalab nima qiladi?", "options": ["O'chiradi", "Yoqadi", "Kitob", "Sport"], "correct_option": 1},
        "listening": {"audio_text": "I need to look after my little brother today.",
            "task": "Audioni tinglang: 'I need to _____ my little brother.'", "expected_text": "look after"},
        "writing": {"task": "Ingliz tilida yozing: 'Men ertalab soat 7 da uyg'onaman.'",
            "sample_solution": "I get up at 7 AM."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I will never give up on my dreams.'",
            "target_phrase": "I will never give up on my dreams."}
    },
    {
        "id": 27, "title": "Idioms", "level": "B1",
        "vocabulary": [
            {"word": "Break a leg", "translation": "Omad tilayman!"}, {"word": "Piece of cake", "translation": "Juda oson"},
            {"word": "Hit the books", "translation": "Dars qilmoq"}, {"word": "Under the weather", "translation": "Kasal"},
            {"word": "Cost an arm and a leg", "translation": "Juda qimmat"}
        ],
        "reading": {"title": "Idiomlar", "text": "Tom's exam was a piece of cake. He hit the books all night.",
            "question": "Tomning imtihoni qanday o'tdi?", "options": ["Qiyin", "Oson", "Uzoq", "Noto'g'ri"], "correct_option": 1},
        "listening": {"audio_text": "The new phone costs an arm and a leg.",
            "task": "Audioni tinglang: 'The new phone _____ an arm and a leg.'", "expected_text": "costs"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening imtihonim juda oson edi.'",
            "sample_solution": "My exam was a piece of cake."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Break a leg on your exam!'",
            "target_phrase": "Break a leg on your exam!"}
    },
    {
        "id": 28, "title": "Ish va Kasbiy Hayot", "level": "A2",
        "vocabulary": [
            {"word": "Salary", "translation": "Oylik"}, {"word": "Meeting", "translation": "Yig'ilish"},
            {"word": "Boss", "translation": "Rahbar"}, {"word": "Colleague", "translation": "Hamkasb"},
            {"word": "Deadline", "translation": "Muddat"}
        ],
        "reading": {"title": "Ish kunida", "text": "I have a meeting at 10 AM. My boss wants the report by Friday.",
            "question": "Hisobotni qachon topshirish kerak?", "options": ["Dushanba", "Chorshanba", "Juma", "Shanba"], "correct_option": 2},
        "listening": {"audio_text": "I have a meeting with my boss at ten.",
            "task": "Audioni tinglang: 'I have a meeting at _____.'", "expected_text": "ten"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening rahbarim bilan soat 10 da yig'ilish bor.'",
            "sample_solution": "I have a meeting with my boss at 10 AM."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I have a meeting with my boss today.'",
            "target_phrase": "I have a meeting with my boss today."}
    },
    {
        "id": 29, "title": "Sayohat Rejalari", "level": "B1",
        "vocabulary": [
            {"word": "Passport", "translation": "Pasport"}, {"word": "Reservation", "translation": "Bron qilish"},
            {"word": "Luggage", "translation": "Yuk"}, {"word": "Return ticket", "translation": "Qaytish chiptasi"},
            {"word": "Departure", "translation": "Jo'nash"}
        ],
        "reading": {"title": "Aeroportda", "text": "I arrived two hours before departure. I showed my passport and checked in my luggage.",
            "question": "U qachon aeroportga keldi?", "options": ["1 soat", "2 soat", "3 soat", "4 soat"], "correct_option": 1},
        "listening": {"audio_text": "Please show your passport at the check-in counter.",
            "task": "Audioni tinglang: 'Please show your _____.'", "expected_text": "passport"},
        "writing": {"task": "Ingliz tilida yozing: 'Mening pasportim va qaytish chiptam bor.'",
            "sample_solution": "I have my passport and return ticket."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I need to check in my luggage.'",
            "target_phrase": "I need to check in my luggage."}
    },
    {
        "id": 30, "title": "Madaniyat va Bayramlar", "level": "B1",
        "vocabulary": [
            {"word": "Tradition", "translation": "An'ana"}, {"word": "Celebration", "translation": "Bayram"},
            {"word": "Custom", "translation": "Odat"}, {"word": "Festival", "translation": "Bayram"},
            {"word": "Heritage", "translation": "Merros"}
        ],
        "reading": {"title": "Navro'z", "text": "Navro'z is a traditional Uzbek festival. It is celebrated in spring. Families cook Sumalak.",
            "question": "Navro'z qachon nishonlanadi?", "options": ["Yozda", "Bahorda", "Kuzda", "Qishda"], "correct_option": 1},
        "listening": {"audio_text": "We celebrate Navroz with our family every year.",
            "task": "Audioni tinglang: 'We celebrate _____ with our family.'", "expected_text": "Navroz"},
        "writing": {"task": "Ingliz tilida yozing: 'Navroz — bu o'zbek an'anasidir.'",
            "sample_solution": "Navroz is a Uzbek tradition."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Navroz is our traditional celebration.'",
            "target_phrase": "Navroz is our traditional celebration."}
    }
    ,
    {
        "id": 31, "title": "Present Simple vs Present Continuous", "level": "A1",
        "vocabulary": [
            {"word": "Always", "translation": "Doimo"}, {"word": "Sometimes", "translation": "Ba'zan"},
            {"word": "Never", "translation": "Hech qachon"}, {"word": "Now", "translation": "Hozir"},
            {"word": "Right now", "translation": "Hozirgina"}
        ],
        "reading": {"title": "Grammatika darsi", "text": "I play football every day (Present Simple). I am playing football now (Present Continuous).",
            "question": "Qaysi gap hozirgi harakatni bildiradi?", "options": ["I play football", "I am playing football", "I played football", "I will play"], "correct_option": 1},
        "listening": {"audio_text": "I am reading a book right now.",
            "task": "Audioni tinglang: 'I _____ a book right now.'", "expected_text": "am reading"},
        "writing": {"task": "Ingliz tilida yozing (Present Simple): 'Men har kuni sport bilan shug'ullanaman.'",
            "sample_solution": "I do sports every day."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I am studying English right now.'",
            "target_phrase": "I am studying English right now."}
    },
    {
        "id": 32, "title": "Articles (A, An, The)", "level": "A1",
        "vocabulary": [
            {"word": "A", "translation": "Bitta (old vowel emas)"}, {"word": "An", "translation": "Bitta (old vowel)"},
            {"word": "The", "translation": "Aniqlik (ma'lum)"},
            {"word": "Zero article", "translation": "Artikelsiz"},
            {"word": "Plural", "translation": "Ko'plik"}
        ],
        "reading": {"title": "Artikellar", "text": "I have a cat. The cat is black. I like cats (zero article).",
            "question": "Qaysi artikeldan keyin unli harf keladi?", "options": ["A", "An", "The", "None"], "correct_option": 1},
        "listening": {"audio_text": "I saw an apple on the table.",
            "task": "Audioni tinglang: 'I saw _____ apple on _____ table.'", "expected_text": "an apple on the table"},
        "writing": {"task": "Ingliz tilida yozing: 'Men bitta kitob oldim. Kitob qizil.'",
            "sample_solution": "I bought a book. The book is red."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I have a dog. The dog is very friendly.'",
            "target_phrase": "I have a dog. The dog is very friendly."}
    },
    {
        "id": 33, "title": "Prepositions of Place", "level": "A1",
        "vocabulary": [
            {"word": "In", "translation": "Ichida"}, {"word": "On", "translation": "Ustida"},
            {"word": "Under", "translation": "Pastida"}, {"word": "Next to", "translation": "Yonida"},
            {"word": "Behind", "translation": "Ortida"}
        ],
        "reading": {"title": "Joylashuv", "text": "The book is on the table. The cat is under the table. The lamp is next to the table.",
            "question": "Kitob qayerda?", "options": ["Under", "On", "Behind", "In"], "correct_option": 1},
        "listening": {"audio_text": "The keys are in my pocket.",
            "task": "Audioni tinglang: 'The keys are _____ my pocket.'", "expected_text": "in"},
        "writing": {"task": "Ingliz tilida yozing: 'Mashina uyning ortida.'",
            "sample_solution": "The car is behind the house."},
        "speaking": {"task": "Ovozli xabar yuboring: 'The book is on the desk and the pen is under it.'",
            "target_phrase": "The book is on the desk and the pen is under it."}
    },
    {
        "id": 34, "title": "Past Simple vs Past Continuous", "level": "A2",
        "vocabulary": [
            {"word": "While", "translation": " ...ayni paytda"}, {"word": "When", "translation": "...ganda"},
            {"word": "Was/were + V-ing", "translation": "O'tgan davomiy"},
            {"word": "Interrupted", "translation": "To'xtatilgan"},
            {"word": "Background action", "translation": "Orqa fon harakati"}
        ],
        "reading": {"title": "Hikoya", "text": "I was reading a book when the phone rang. My friend was cooking while I was setting the table.",
            "question": "Telefon qo'ng'iroq qilganda nima qilyapti?", "options": ["Kitob o'qiyapti", "Ovqat pishiryapti", "Telefonga javob berdi", "Uxlayapti"], "correct_option": 0},
        "listening": {"audio_text": "I was sleeping when the alarm went off.",
            "task": "Audioni tinglang: 'I was _____ when the alarm went off.'", "expected_text": "sleeping"},
        "writing": {"task": "Ingliz tilida yozing: 'Men televizor ko'rayotganda eshik ochildi.'",
            "sample_solution": "The door opened while I was watching TV."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I was studying when my friend called me.'",
            "target_phrase": "I was studying when my friend called me."}
    }

    ,
    {
        "id": 35, "title": "Present Perfect", "level": "B2",
        "vocabulary": [
            {"word": "Have/Has + V3", "translation": "Hozirgi tugallangan"},
            {"word": "Already", "translation": "Allaqachon"},
            {"word": "Yet", "translation": "Hali"},
            {"word": "Just", "translation": "Endigina"},
            {"word": "Ever", "translation": "Hech qachon"},
            {"word": "Never", "translation": "Hech qachon"},
            {"word": "Since", "translation": "Dan beri"},
            {"word": "For", "translation": "Davomida"},
            {"word": "Been", "translation": "Bo'lgan"},
            {"word": "Gone", "translation": "Ketgan"},
            {"word": "Experience", "translation": "Tajriba"},
            {"word": "Achievement", "translation": "Yutuq"}
        ],
        "reading": {"title": "Tajriba", "text": "I have visited Tashkent three times. She has lived here since 2020. We have known each other for five years.", "question": "U qachondan beri yerda yashayapti?", "options": ["2019", "2020", "2021", "2022"], "correct_option": 1},
        "listening": {"audio_text": "I have never been to London.", "task": "Audioni tinglang: 'I have _____ been to London.'", "expected_text": "never"},
        "writing": {"task": "Ingliz tilida yozing (Present Perfect): 'Men hali hech qachon chet elga bormaganman.'", "sample_solution": "I have never been abroad."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I have learned many new words today.'", "target_phrase": "I have learned many new words today."}
    },
    {
        "id": 36, "title": "Present Perfect vs Past Simple", "level": "B2",
        "vocabulary": [
            {"word": "Experience", "translation": "Tajriba"},
            {"word": "Specific time", "translation": "Aniq vaqt"},
            {"word": "Duration", "translation": "Davomiylik"},
            {"word": "Result", "translation": "Natija"},
            {"word": "Life experience", "translation": "Hayot tajribasi"},
            {"word": "Finished action", "translation": "Tugallangan harakat"}
        ],
        "reading": {"title": "Farqi", "text": "I have been to Paris (life experience). I went to Paris last year (specific time). She has lived here since 2019. She lived in Samarkand before that.", "question": "Qaysi gap aniq vaqtni bildiradi?", "options": ["I have been to Paris", "I went to Paris last year", "She has lived here", "We have known each other"], "correct_option": 1},
        "listening": {"audio_text": "I have already finished my homework.", "task": "Audioni tinglang: 'I have _____ finished my homework.'", "expected_text": "already"},
        "writing": {"task": "Ingliz tilida yozing: 'Men allaqachon kitobni o'qidim. Kecha boshladim.'", "sample_solution": "I have already read the book. I started it yesterday."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I have visited many countries in my life.'", "target_phrase": "I have visited many countries in my life."}
    },
    {
        "id": 37, "title": "Relative Clauses", "level": "B2",
        "vocabulary": [
            {"word": "Who", "translation": "Kim (odam)"},
            {"word": "Which", "translation": "Qaysi (narsa)"},
            {"word": "That", "translation": "Kim/niy (hamma)"},
            {"word": "Where", "translation": "Qayer (joy)"},
            {"word": "When", "translation": "Qachon (vaqt)"},
            {"word": "Whose", "translation": "Kimniki"},
            {"word": "Whom", "translation": "Kimni (rasmiy)"},
            {"word": "Which", "translation": "Qaysi"},
            {"word": "Subject", "translation": "Mavzu"},
            {"word": "Object", "translation": "Ob'ekt"},
            {"word": "Defining", "translation": "Aniqlash"},
            {"word": "Non-defining", "translation": "Qo'shimcha"}
        ],
        "reading": {"title": "Nisbatli gaplar", "text": "The man who lives next door is a doctor. The book which I read was interesting. The city where I was born is Samarkand.", "question": "Qaysi gap non-defining clause?", "options": ["The man who lives next door", "The book which I read", "The city where I was born", "Hammasi defining"], "correct_option": 2},
        "listening": {"audio_text": "The teacher who teaches me English is very kind.", "task": "Audioni tinglang: 'The teacher _____ teaches me English is kind.'", "expected_text": "who"},
        "writing": {"task": "Ingliz tilida yozing (relative clause): 'Mening o'qituvchim juda mehribon. U ingliz tilini o'qitadi.'", "sample_solution": "My teacher, who teaches English, is very kind."},
        "speaking": {"task": "Ovozli xabar yuboring: 'The city where I live is very beautiful.'", "target_phrase": "The city where I live is very beautiful."}
    },
    {
        "id": 38, "title": "Modals of Deduction", "level": "B2",
        "vocabulary": [
            {"word": "Must be", "translation": " Albatta"},
            {"word": "Can't be", "translation": "Bo'lishi mumkin emas"},
            {"word": "Might be", "translation": "Bo'lishi mumkin"},
            {"word": "Could be", "translation": "Bo'lishi mumkin"},
            {"word": "Should be", "translation": "Bo'lishi kerak"},
            {"word": "Probably", "translation": "Ehtimol"},
            {"word": "Certainly", "translation": "Albatta"},
            {"word": "Possibly", "translation": "Ehtimol"},
            {"word": "Deduction", "translation": "Xulosa"},
            {"word": "Evidence", "translation": "Dalil"},
            {"word": "Conclusion", "translation": "Xulosa"},
            {"word": "Certainty", "translation": "Ishonch"}
        ],
        "reading": {"title": "Xulosa chiqarish", "text": "He must be tired - he worked all day. She can't be at home - her car is gone. They might be late because of the traffic.", "question": "Nima uchun u uyda bo'lishi mumkin emas?", "options": ["U charchagan", "Mashinasi yo'q", "Kech qildi", "Ishladi"], "correct_option": 1},
        "listening": {"audio_text": "She must be very happy today.", "task": "Audioni tinglang: 'She _____ be very happy today.'", "expected_text": "must"},
        "writing": {"task": "Ingliz tilida yozing: 'U albatta juda boy. Katta uyda yashaydi.'", "sample_solution": "He must be very rich. He lives in a big house."},
        "speaking": {"task": "Ovozli xabar yuboring: 'It might rain tomorrow.'", "target_phrase": "It might rain tomorrow."}
    },
    {
        "id": 39, "title": "Wish / If only", "level": "B2",
        "vocabulary": [
            {"word": "Wish", "translation": "Xohlash"},
            {"word": "If only", "translation": "Faqat agar"},
            {"word": "Had + V3", "translation": "O'tgan voqea"},
            {"word": "Would + V", "translation": "Kelajak xohlash"},
            {"word": "Could + V", "translation": "Imkoniyat"},
            {"word": "Regret", "translation": "Pushaymonlik"},
            {"word": "Dream", "translation": "Orzu"},
            {"word": "Hope", "translation": "Umid"},
            {"word": "Past regret", "translation": "O'tmish pushaymonligi"},
            {"word": "Present wish", "translation": "Hozirgi xohlash"},
            {"word": "Future wish", "translation": "Kelajak xohlash"},
            {"word": "Unreal", "translation": "Noreal"}
        ],
        "reading": {"title": "Xohlash", "text": "I wish I had more time. (Hozir) If only I had studied harder. (O'tmish) I wish I could fly. (Imkoniyat)", "question": "Qaysi gap o'tmishga tegishli?", "options": ["I wish I had more time", "If only I had studied harder", "I wish I could fly", "Hammasi hozirga"], "correct_option": 1},
        "listening": {"audio_text": "I wish I were taller.", "task": "Audioni tinglang: 'I _____ I were taller.'", "expected_text": "wish"},
        "writing": {"task": "Ingliz tilida yozing: 'Men xohlayman, ko'proq pulim bo'lsa.'", "sample_solution": "I wish I had more money."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I wish I could speak English fluently.'", "target_phrase": "I wish I could speak English fluently."}
    },
    {
        "id": 40, "title": "Causative (Have something done)", "level": "B2",
        "vocabulary": [
            {"word": "Have + V3", "translation": "Qildirmoq"},
            {"word": "Get + V3", "translation": "Qildirmoq"},
            {"word": "Service", "translation": "Xizmat"},
            {"word": "Repair", "translation": "Ta'mirlash"},
            {"word": "Haircut", "translation": "Soch oldirish"},
            {"word": "Clean", "translation": "Tozalatmoq"},
            {"word": "Build", "translation": "Qurdirmoq"},
            {"word": "Paint", "translation": "Bo'yo'tmoq"},
            {"word": "Fix", "translation": "Tuzatmoq"},
            {"word": "Install", "translation": "O'rnatmoq"},
            {"word": "Arrange", "translation": "Tartibga solmoq"},
            {"word": "Organize", "translation": "Tashkil etmoq"}
        ],
        "reading": {"title": "Xizmat", "text": "I had my car repaired yesterday. She had her hair cut at the salon. We are having the house painted next week.", "question": "U nima qildirdi?", "options": ["Mashinasini ta'mirlatdi", "Sochini oldirdi", "Uyni bo'yattdi", "Hammasi"], "correct_option": 0},
        "listening": {"audio_text": "I need to have my computer fixed.", "task": "Audioni tinglang: 'I need to have my computer _____.'", "expected_text": "fixed"},
        "writing": {"task": "Ingliz tilida yozing: 'Men dushanba kuni mashinamni ta'mirlatdim.'", "sample_solution": "I had my car repaired on Monday."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I had my house cleaned yesterday.'", "target_phrase": "I had my house cleaned yesterday."}
    },
    {
        "id": 41, "title": "Inversion", "level": "C1",
        "vocabulary": [
            {"word": "Never have I", "translation": "Hech qachon men"},
            {"word": "Rarely", "translation": "Kamdan-kam"},
            {"word": "Seldom", "translation": "Kamdan-kam"},
            {"word": "Not only", "translation": "Faqat emas"},
            {"word": "Hardly", "translation": "Zarb"},
            {"word": "Scarcely", "translation": "Zarb"},
            {"word": "No sooner", "translation": "Darhol"},
            {"word": "Had I known", "translation": "Bilsam edi"},
            {"word": "Were I you", "translation": "Siz o'rnimda bo'lsangiz"},
            {"word": "So + adj", "translation": "Shunchalik"},
            {"word": "Neither/nor", "translation": "Na...na"},
            {"word": "Only then", "translation": "Faqat keyin"}
        ],
        "reading": {"title": "Teskari tartib", "text": "Never have I seen such a beautiful sunset. Had I known, I would have helped. Not only did she win, but she also broke the record.", "question": "Qaysi gap inversion ishlatilgan?", "options": ["Never have I seen", "I have never seen", "She won", "I helped"], "correct_option": 0},
        "listening": {"audio_text": "Rarely does he arrive on time.", "task": "Audioni tinglang: 'Rarely _____ he arrive on time.'", "expected_text": "does"},
        "writing": {"task": "Ingliz tilida yozing (inversion): 'Men hech qachon bunchalik chiroyli ko'rmaganman.'", "sample_solution": "Never have I seen something so beautiful."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Not only did I pass the exam, but I also got the highest score.'", "target_phrase": "Not only did I pass the exam, but I also got the highest score."}
    },
    {
        "id": 42, "title": "Advanced Conditionals (3rd & Mixed)", "level": "C1",
        "vocabulary": [
            {"word": "Had + V3", "translation": "3-shart (o'tmish)"},
            {"word": "Would have + V3", "translation": "O'tmish natija"},
            {"word": "Could have + V3", "translation": "O'tmish imkoniyat"},
            {"word": "Should have + V3", "translation": "Kerak edi"},
            {"word": "Might have + V3", "translation": "Ehtimol"},
            {"word": "Mixed conditional", "translation": "Aralash shart"},
            {"word": "Counterfactual", "translation": "Noreal"},
            {"word": "Regret", "translation": "Pushaymonlik"},
            {"word": "If only", "translation": "Faqat agar"},
            {"word": "Suppose", "translation": "Tasavvur qiling"},
            {"word": "Imagine", "translation": "Tasavvur qiling"},
            {"word": "Past hypothetical", "translation": "O'tmish virtual"}
        ],
        "reading": {"title": "3-shart", "text": "If I had studied harder, I would have passed the exam. Had she arrived earlier, she could have caught the train. If I were you, I would have accepted the offer.", "question": "U imtihondan o'tganmi?", "options": ["Ha", "Yo'q", "Noma'lum", "Ehtimol"], "correct_option": 1},
        "listening": {"audio_text": "If I had known, I would have helped you.", "task": "Audioni tinglang: 'If I had known, I _____ have helped you.'", "expected_text": "would"},
        "writing": {"task": "Ingliz tilida yozing: 'Agar men ko'proq harakat qilgan bo'lsam, men yutgan bo'lardim.'", "sample_solution": "If I had tried harder, I would have won."},
        "speaking": {"task": "Ovozli xabar yuboring: 'Had I known earlier, I would have prepared better.'", "target_phrase": "Had I known earlier, I would have prepared better."}
    },
    {
        "id": 43, "title": "Cleft Sentences", "level": "C1",
        "vocabulary": [
            {"word": "It was... who", "translation": "Shaxsni ta'kidlash"},
            {"word": "It was... that", "translation": "Narsani ta'kidlash"},
            {"word": "What I need", "translation": "Menga kerak narsa"},
            {"word": "The thing that", "translation": "Narsa"},
            {"word": "Emphasis", "translation": "Ta'kidlash"},
            {"word": "Focus", "translation": "E'tibor"},
            {"word": "Subject focus", "translation": "Mavzu ta'kidi"},
            {"word": "Object focus", "translation": "Ob'ekt ta'kidi"},
            {"word": "Adverbial focus", "translation": "Atrof so'z ta'kidi"},
            {"word": "Negative focus", "translation": "Inkor ta'kidi"},
            {"word": "Question focus", "translation": "Savol ta'kidi"},
            {"word": "Contrastive", "translation": "Taqqoslash"}
        ],
        "reading": {"title": "Ta'kidlash", "text": "It was John who broke the window. It was yesterday that I met her. What I need is a good rest.", "question": "Qaysi gap odamni ta'kidlaydi?", "options": ["It was John who broke the window", "It was yesterday that I met her", "What I need is a good rest", "Hammasi"], "correct_option": 0},
        "listening": {"audio_text": "It was the teacher who helped me.", "task": "Audioni tinglang: 'It was _____ who helped me.'", "expected_text": "the teacher"},
        "writing": {"task": "Ingliz tilida yozing (cleft sentence): 'Meni sevindirgan narsa — sizning yordamingiz.'", "sample_solution": "What made me happy was your help."},
        "speaking": {"task": "Ovozli xabar yuboring: 'It was the exam that I was worried about.'", "target_phrase": "It was the exam that I was worried about."}
    },
    {
        "id": 44, "title": "Advanced Passive Structures", "level": "C1",
        "vocabulary": [
            {"word": "It is said that", "translation": "Aytishlaricha"},
            {"word": "It is believed", "translation": "Ishonishlaricha"},
            {"word": "It is reported", "translation": "Xabar berishlaricha"},
            {"word": "It is known", "translation": "Ma'lumki"},
            {"word": "It is thought", "translation": "O'ylashlaricha"},
            {"word": "It is considered", "translation": "Hisoblashlaricha"},
            {"word": "It is rumored", "translation": "Mish-mishlaricha"},
            {"word": "It is rumored", "translation": "Mish-mishlaricha"},
            {"word": "Passive report", "translation": "Passiv xabar"},
            {"word": "Formal", "translation": "Rasmiy"},
            {"word": "Journalistic", "translation": "Jurnalistik"},
            {"word": "Academic", "translation": "Akademik"}
        ],
        "reading": {"title": "Rasmiy passiv", "text": "It is said that he is very rich. She is believed to be the best student. The report is expected to be ready tomorrow.", "question": "Qaysi gap passiv xabar?", "options": ["It is said that he is rich", "He is rich", "She is the best", "The report is ready"], "correct_option": 0},
        "listening": {"audio_text": "It is believed that climate change is real.", "task": "Audioni tinglang: 'It is _____ that climate change is real.'", "expected_text": "believed"},
        "writing": {"task": "Ingliz tilida yozing: 'Aytishlaricha, u juda mehribon o'qituvchi ekan.'", "sample_solution": "It is said that he is a very kind teacher."},
        "speaking": {"task": "Ovozli xabar yuboring: 'It is known that education is important.'", "target_phrase": "It is known that education is important."}
    },
    {
        "id": 45, "title": "Subjunctive Mood", "level": "C1",
        "vocabulary": [
            {"word": "If I were", "translation": "Agar men bo'lgan bo'lsam"},
            {"word": "I suggest that", "translation": "Men taklif qilaman"},
            {"word": "It is essential", "translation": "Zarur"},
            {"word": "It is vital", "translation": "Muhim"},
            {"word": "It is important", "translation": "Muhim"},
            {"word": "Demand that", "translation": "Talab qilmoq"},
            {"word": "Insist that", "translation": "Talab qilmoq"},
            {"word": "Recommend that", "translation": "Tavsiya qilmoq"},
            {"word": "Mandate", "translation": "Buyruq"},
            {"word": "Proposal", "translation": "Taklif"},
            {"word": "Formal request", "translation": "Rasmiy so'rov"},
            {"word": "Authority", "translation": "Vacohat"}
        ],
        "reading": {"title": "Virtual Hold", "text": "If I were you, I would accept the offer. The doctor suggested that he rest for a week. It is essential that every student attend the meeting.", "question": "Qaysi gap rasmiy virtual hold?", "options": ["If I were you", "The doctor suggested", "It is essential that", "Hammasi"], "correct_option": 2},
        "listening": {"audio_text": "I suggest that he study harder.", "task": "Audioni tinglang: 'I suggest that he _____ harder.'", "expected_text": "study"},
        "writing": {"task": "Ingliz tilida yozing: 'Men taklif qilaman, har kuni 5 daqiqa mashq qilinsin.'", "sample_solution": "I suggest that everyone practice for 5 minutes every day."},
        "speaking": {"task": "Ovozli xabar yuboring: 'If I were the president, I would improve education.'", "target_phrase": "If I were the president, I would improve education."}
    },
    {
        "id": 46, "title": "Advanced Linking Words", "level": "C1",
        "vocabulary": [
            {"word": "Furthermore", "translation": "Shuningdek"},
            {"word": "Moreover", "translation": "Bundan tashqari"},
            {"word": "Nevertheless", "translation": "Shunga qaramay"},
            {"word": "However", "translation": "Biroq"},
            {"word": "Consequently", "translation": "Shuning uchun"},
            {"word": "Therefore", "translation": "Shuning uchun"},
            {"word": "Nonetheless", "translation": "Shunga qaramay"},
            {"word": "Despite", "translation": "Qaramay"},
            {"word": "In spite of", "translation": "Qaramay"},
            {"word": "Whereas", "translation": "Holboki"},
            {"word": "Whilst", "translation": "Holboki"},
            {"word": "Conversely", "translation": "Aksincha"}
        ],
        "reading": {"title": " bog'lovchi so'zlar", "text": "The project was difficult; nevertheless, we completed it on time. He is young, whereas she is experienced. The weather was bad; however, we still went out.", "question": "Qaysi so'z qarama-qarshilik bildiradi?", "options": ["Furthermore", "Nevertheless", "Therefore", "Moreover"], "correct_option": 1},
        "listening": {"audio_text": "She is intelligent; moreover, she is very hardworking.", "task": "Audioni tinglang: 'She is intelligent; _____, she is very hardworking.'", "expected_text": "moreover"},
        "writing": {"task": "Ingliz tilida yozing (advanced linking): 'Qiyin edi. Lekin biz muvaffaq bo'ldik.'", "sample_solution": "It was difficult; nevertheless, we succeeded."},
        "speaking": {"task": "Ovozli xabar yuboring: 'The task was hard, but we managed to complete it.'", "target_phrase": "The task was hard, but we managed to complete it."}
    },
    {
        "id": 47, "title": "Academic English", "level": "C1",
        "vocabulary": [
            {"word": "Hypothesis", "translation": "Taxmin"},
            {"word": "Analysis", "translation": "Tahlil"},
            {"word": "Conclusion", "translation": "Xulosa"},
            {"word": "Furthermore", "translation": "Shuningdek"},
            {"word": "Consequently", "translation": "Shuning uchun"},
            {"word": "The research", "translation": "Tadqiqot"},
            {"word": "Evidence", "translation": "Dalil"},
            {"word": "Significant", "translation": "Muhim"},
            {"word": "Demonstrate", "translation": "Ko'rsatmoq"},
            {"word": "Indicate", "translation": "Ko'rsatmoq"},
            {"word": "Suggest", "translation": "Taklif qilmoq"},
            {"word": "Contradict", "translation": "Zid kelmoq"}
        ],
        "reading": {"title": "Akademik matn", "text": "The research demonstrates that education has a significant impact on economic development. Furthermore, the evidence suggests that early childhood education is particularly important.", "question": "Tadqiqot nima ko'rsatadi?", "options": ["Ta'lim iqtisodiyotga ta'sir qiladi", "Bolalar ta'limi muhim emas", "Tadqiqot natijasi yo'q", "Iqtisodiyot ta'limdan mustaqil"], "correct_option": 0},
        "listening": {"audio_text": "The study indicates a strong correlation between sleep and productivity.", "task": "Audioni tinglang: 'The study _____ a strong correlation.'", "expected_text": "indicates"},
        "writing": {"task": "Ingliz tilida yozing (akademik): 'Tadqiqot shuni ko'rsatadiki, ta'lim juda muhim.'", "sample_solution": "The research demonstrates that education is very important."},
        "speaking": {"task": "Ovozli xabar yuboring: 'This study provides evidence that technology improves learning.'", "target_phrase": "This study provides evidence that technology improves learning."}
    },
    {
        "id": 48, "title": "Advanced Report Writing", "level": "C1",
        "vocabulary": [
            {"word": "Executive summary", "translation": "Boshqaruv xulosasi"},
            {"word": "Methodology", "translation": "Usul"},
            {"word": "Findings", "translation": "Topilmalar"},
            {"word": "Recommendations", "translation": "Tavsiyalar"},
            {"word": "Objective", "translation": "Maqsad"},
            {"word": "Scope", "translation": "Doirasi"},
            {"word": "Limitations", "translation": "Cheklovlar"},
            {"word": "Implications", "translation": "Oqibatlar"},
            {"word": "Appendix", "translation": "Qo'shimcha"},
            {"word": "Abstract", "translation": "Annotatsiya"},
            {"word": "Citation", "translation": "Iltibos"},
            {"word": "Reference", "translation": "Manba"}
        ],
        "reading": {"title": "Hisobot", "text": "This report examines the impact of remote work on productivity. The methodology involved surveys of 500 employees. The findings suggest that remote work increases productivity by 20%.", "question": "Hisobot nimani tekshiradi?", "options": ["Uydan ishlash samaradorlikka ta'siri", "500 xodim so'rovi", "20% samaradorlik oshishi", "Hammasi"], "correct_option": 0},
        "listening": {"audio_text": "The recommendations include implementing flexible work hours.", "task": "Audioni tinglang: 'The _____ include implementing flexible work hours.'", "expected_text": "recommendations"},
        "writing": {"task": "Ingliz tilida yozing (hisobot): 'Hisobotning maqsad — uydan ishlashni tahlil qilish.'", "sample_solution": "The objective of the report is to analyze remote work."},
        "speaking": {"task": "Ovozli xabar yuboring: 'The findings indicate a positive trend in employee satisfaction.'", "target_phrase": "The findings indicate a positive trend in employee satisfaction."}
    },
    {
        "id": 49, "title": "Idiomatic Expressions (Advanced)", "level": "C1",
        "vocabulary": [
            {"word": "A blessing in disguise", "translation": "Yashirin ne'mat"},
            {"word": "Beat around the bush", "translation": "Xaftaga kelish"},
            {"word": "Break the ice", "translation": "Muzni sindirmoq"},
            {"word": "Hit the nail on the head", "translation": "To'g'ri aytmoq"},
            {"word": "Let the cat out of the bag", "translation": "Sirni ochmoq"},
            {"word": "On the ball", "translation": "Serharakat"},
            {"word": "The ball is in your court", "translation": "Navbat sizda"},
            {"word": "Cost an arm and a leg", "translation": "Juda qimmat"},
            {"word": "Piece of cake", "translation": "Juda oson"},
            {"word": "Under the weather", "translation": "Kasal"},
            {"word": "Burn the midnight oil", "translation": "Tungi ish"},
            {"word": "Go the extra mile", "translation": "Ko'proq harakat"}
        ],
        "reading": {"title": "Ibratli iboralar", "text": "Don't beat around the bush - just tell me the truth. The meeting really hit the nail on the head. Getting this job was a blessing in disguise.", "question": "'Beat around the bush' nima ma'noni anglatadi?", "options": ["To'g'ri aytmoq", "Xaftaga kelish", "Sirni ochmoq", "Ko'proq harakat"], "correct_option": 1},
        "listening": {"audio_text": "The exam was a piece of cake.", "task": "Audioni tinglang: 'The exam was a _____.'", "expected_text": "piece of cake"},
        "writing": {"task": "Ingliz tilida yozing (idiom): 'Imtihon juda oson edi.'", "sample_solution": "The exam was a piece of cake."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I need to hit the books for the exam.'", "target_phrase": "I need to hit the books for the exam."}
    },
    {
        "id": 50, "title": "Debate & Opinion Language", "level": "C1",
        "vocabulary": [
            {"word": "I strongly believe", "translation": "Men kuchli ishonaman"},
            {"word": "In my opinion", "translation": "Mening fikrimcha"},
            {"word": "I would argue that", "translation": "Men da'vo qilamanki"},
            {"word": "On the other hand", "translation": "Boshqa tomondan"},
            {"word": "To be honest", "translation": "Ro'stdan aytganda"},
            {"word": "I see your point", "translation": "Sizning fikringizni tushunaman"},
            {"word": "However", "translation": "Biroq"},
            {"word": "Furthermore", "translation": "Shuningdek"},
            {"word": "Consequently", "translation": "Shuning uchun"},
            {"word": "It goes without saying", "translation": "Aytish ham shart emas"},
            {"word": "Needless to say", "translation": "Aytish ham shart emas"},
            {"word": "I couldn't agree more", "translation": "To'liq roziman"}
        ],
        "reading": {"title": "Munozara", "text": "I strongly believe that education should be free for everyone. On the other hand, some argue that it would be too expensive. However, the benefits outweigh the costs.", "question": "Muallif nima da'vo qiladi?", "options": ["Ta'lim pulli bo'lishi kerak", "Ta'lim bepul bo'lishi kerak", "Ta'lim qimmat", "Ta'lim muhim emas"], "correct_option": 1},
        "listening": {"audio_text": "In my opinion, technology has changed our lives significantly.", "task": "Audioni tinglang: 'In _____ opinion, technology has changed our lives.'", "expected_text": "my"},
        "writing": {"task": "Ingliz tilida yozing (munozara): 'Men ishonaman, sport sog'liq uchun juda muhim.'", "sample_solution": "I strongly believe that sports are very important for health."},
        "speaking": {"task": "Ovozli xabar yuboring: 'I would argue that learning languages opens many doors.'", "target_phrase": "I would argue that learning languages opens many doors."}
    }

]