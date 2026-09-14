class AIService {
  static String getResponse(String input) {
    final lower = input.toLowerCase().trim();

    // Grammar explanations
    if (lower.contains('present simple')) {
      return '''📘 Present Simple (Hozirgi oddiy):

📝 Formula: Subject + V(s/es)
✅ I/You/We/They → work
✅ He/She/It → works

📌 Misollar:
• I work every day.
• She works at a hospital.
• They don't speak English.

💡 Maslahat: Har doim, odat, haqiqat uchun ishlatiladi.''';
    }

    if (lower.contains('past simple')) {
      return '''📘 Past Simple (O'tgan zamon):

📝 Formula: Subject + V2 (ed/ied)
✅ I worked yesterday.
✅ She played football.
❌ I didn't go.

📌 Misollar:
• I went to school yesterday.
• He studied English last night.
• We didn't see the movie.

💡 Maslahat: O'tgan voqealar uchun ishlatiladi.''';
    }

    if (lower.contains('future') || lower.contains('will')) {
      return '''📘 Future Tense (Kelajak zamon):

📝 Will: I will work tomorrow.
📝 Going to: I am going to travel next week.

📌 Misollar:
• I will call you later.
• She is going to visit London.
• They won't forget.

💡 Maslahat: Will = shaxoncha qaror, Going to = reja.''';
    }

    if (lower.contains('article') || lower.contains('a an the')) {
      return '''📘 Articles (A, An, The):

📝 A = bitta (unli harf oldida)
📝 An = bitta (unli harf oldida)
📝 The = ma'lum narsa

📌 Misollar:
• A book (bitta kitob)
• An apple (bitta olma)
• The sun (quyosh - yagona)

💡 Maslahat: A/An = noma'lum, The = ma'lum.''';
    }

    if (lower.contains('preposition') || lower.contains('in on at')) {
      return '''📘 Prepositions (Oldiklar):

📝 in = ichida (in the room)
📝 on = ustida (on the table)
📝 at = nuqtada (at home)

📌 Misollar:
• in London, in January, in the box
• on Monday, on the wall, on time
• at school, at night, at 3 o'clock

💡 Maslahat: Joy va vaqt uchun ishlatiladi.''';
    }

    // Translation responses
    if (lower.contains('hello') || lower.contains('salom')) {
      return '''💡 Hello = "Salom" 👋

📖 Salomlashish darsidan.

🗣 Talaffuz: he-LOU

✅ Misol: "Hello, my name is Ali."
📖 "Salom, mening ismim Ali."

🎤 Eshitish uchun bosing!''';
    }

    if (lower.contains('thank you') || lower.contains('rahmat')) {
      return '''💡 Thank you = "Rahmat" 🙏

📖 Salomlashish darsidan.

🗣 Talaffuz: SANK-yoo

✅ Misol: "Thank you for your help."
📖 "Yordamingiz uchun rahmat."

💡 Javob: "You're welcome" = "Arzimaydi"''';
    }

    if (lower.contains('please')) {
      return '''💡 Please = "Iltimos" 🙏

📖 Salomlashish darsidan.

🗣 Talaffuz: PLIIZ

✅ Misol: "Can I have water, please?"
📖 "Suv berishingiz mumkinmi, iltimos?"

💡 Javob: "You're welcome" = "Arzimaydi"''';
    }

    // Vocabulary
    if (lower.contains('rain') || lower.contains("yomg'ir")) {
      return '''💡 Rain = "Yomg'ir" 🌧

📖 Ob-havo va Fasllar darsidan.

🗣 Talaffuz: REYN

✅ Misol: "It is raining today."
📖 "Bugun yomg'ir yog'moqda."

💡 Related: Sunny ☀️ | Snow ❄️ | Wind 💨''';
    }

    if (lower.contains('beautiful') || lower.contains('chiroyli')) {
      return '''💡 Beautiful = "Chiroyli" ✨

📖 Ranglar va Buyumlar darsidan.

🗣 Talaffuz: BYUU-ti-ful

✅ Misol: "This is a beautiful dress."
📖 "Bu chiroyli kiyim."

💡 Synonyms: Pretty, Gorgeous, Lovely''';
    }

    if (lower.contains('family') || lower.contains('oila')) {
      return '''💡 Family = "Oila" 👨‍👩‍👧‍👦

📖 Oila va Qarindoshlar darsidan.

🗣 Talaffuz: FAM-i-lee

✅ Misol: "I have a big family."
📖 "Mening katta oilam bor."

💡 Father=Ota, Mother=Ona, Brother=Aka, Sister=Opa''';
    }

    // Greetings
    if (lower.contains('good morning')) {
      return '''💡 Good morning = "Erta tong" ☀️

📖 Salomlashish darsidan.

🗣 Talaffuz: GUD MOR-ning

✅ "Good morning! How are you?"
📖 "Erta tong! Qandaysiniz?"

💡 Good afternoon = Yo'l tong
💡 Good evening = Kechqurun''';
    }

    if (lower.contains('goodbye') || lower.contains('bye')) {
      return '''💡 Goodbye = "Xayr" 👋

📖 Salomlashish darsidan.

🗣 Talaffuz: GUD-bay

✅ "Goodbye! See you tomorrow."
📖 "Xayr! Ertaga ko'rishguncha."

💡 Other ways: See you! / Bye! / Take care!''';
    }

    // Questions
    if (lower.contains('how are you') || lower.contains('qandaysiz')) {
      return '''💡 How are you? = "Qandaysiniz?" 😊

📖 Salomlashish darsidan.

🗣 Talaffuz: HAO AR YUU

✅ Javoblar:
• I'm fine, thank you. = Yaxshiman, rahmat.
• I'm great! = Ajoyibman!
• Not bad. = Yomonmas.''';
    }

    if (lower.contains('what is your name') || lower.contains('ismingiz')) {
      return '''💡 What is your name? = "Ismingiz nima?" 📝

📖 Salomlashish darsidan.

🗣 Talaffuz: WOT IZ YOR NEYM

✅ Javob: "My name is ..." = "Mening ismim ..."

💡 Also: "I'm ..." = "Men ..."''';
    }

    // Numbers
    if (lower.contains('number') || lower.contains('raqam')) {
      return '''💡 Numbers (Raqamlar) 🔢

📖 Raqamlar va Yosh darsidan.

1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten

11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty

💡 20=Yigirma, 30=O'ttiz, 40=Qirq, 50=Ellik''';
    }

    // Default response
    return '''🤖 Yaxshi savol! 

"Siz nima demoqchisiz?" deb batafsilroq yozing.

💡 Mavzular:
• 📘 Grammatika: "present simple", "past simple", "articles"
• 💬 Tarjima: o'zbekcha/inglizcha yozing
• 📖 So'zlar: har qanday so'zni yozing
• ❓ Savollar: "how", "when", "where" deb boshlang

Men sizga yordam beraman! 😊''';
  }
}
