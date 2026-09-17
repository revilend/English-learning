/* ==========================================================================
   Reading bank — 18–34-darslar (A2, B1, B2)
   A2 → ~120 so‘z, 3 savol  ·  B1 → ~145 so‘z, 4 savol  ·  B2 → ~190 so‘z, 4–5 savol
   B1 dan boshlab savollar inglizcha (imtihondagidek).
   ========================================================================== */
var READING_BANK = READING_BANK || {};

READING_BANK[18] = {
  t: 'Tashkent has a large metro system. The stations in the centre are old and beautiful,\n' +
     'but the new line is modern and fast. A ticket costs a small amount of money and you can use the same\n' +
     'card on buses and on the metro. In the morning, between eight and nine, the trains are crowded.\n' +
     'Many people prefer the metro because there is no traffic jam under the ground.\n' +
     'Taxis are more expensive, but they are useful late in the evening when buses stop working.\n' +
     'On Fridays the roads near the markets are often busy, so it is better to leave home earlier.',
  qs: [
    { q: 'Nega odamlar metroni afzal ko‘radi?', o: ['Arzon bo‘lgani uchun', 'Tirbandlik bo‘lmagani uchun', 'Tez bo‘lgani uchun', 'Chiroyli bo‘lgani uchun'], c: 1 },
    { q: 'Bitta karta qayerda ishlatiladi?', o: ['Faqat metrоda', 'Faqat avtobusda', 'Metro va avtobusda', 'Taksida'], c: 2 },
    { q: 'Taksi qachon foydali?', o: ['Ertalab', 'Kechqurun kech, avtobuslar to‘xtaganda', 'Juma kuni', 'Bozor yaqinida'], c: 1 }
  ]
};

READING_BANK[19] = {
  t: 'Last Friday my friends and I booked a table in a new restaurant. We arrived at seven and the waiter\n' +
     'showed us a table near the window. The menu was long and everything looked delicious.\n' +
     'I ordered a vegetable soup and grilled fish. My friend Umid wanted a steak, but the waiter said\n' +
     'there was no steak that evening, so he chose chicken with rice. We shared a big salad and two bottles of water.\n' +
     'The service was quick and the staff were friendly. At the end we asked for the bill and paid together.\n' +
     'The restaurant was not cheap, but the food was worth the price. Next time we will book earlier,\n' +
     'because at nine the place was completely full.',
  qs: [
    { q: 'Ular qaysi stolni oldilar?', o: ['Eshik yonidagi', 'Deraza yonidagi', 'Ikkinchi qavatdagi', 'Tashqaridagi'], c: 1 },
    { q: 'Umid nega steyk olmadi?', o: ['Yoqti madi', 'O‘sha kuni steyk yo‘q edi', 'Qimmat edi', 'Shifokor taqiqlagan'], c: 1 },
    { q: 'Keyingi safar nima qilishadi?', o: ['Boshqa restoranga borishadi', 'Oldinroq stol band qilishadi', 'Uyda ovqat yeyishadi', 'Kechroq kelishadi'], c: 1 }
  ]
};

READING_BANK[20] = {
  t: 'Smartphones have changed the way we talk to each other. Ten years ago most people called their friends;\n' +
     'today they send messages or voice notes. This is convenient, but it also has a negative side.\n' +
     'Many students check their phones every few minutes, and some people feel nervous when their battery is low.\n' +
     'My grandmother uses a simple phone: she says it is enough for calls. My father has two phones —\n' +
     'one for work and one for the family. I try to follow one rule: no phone at the dinner table.\n' +
     'It is not always easy, but when we talk, we really talk.',
  qs: [
    { q: 'Muallifning qoidasi nima?', o: ['Telefonsiz yurish', 'Ovqat stolida telefon ishlatmaslik', 'Kechqurun telefonni o‘chirish', 'Ikki telefon olish'], c: 1 },
    { q: 'Buvasi qanday telefondan foydalanadi?', o: ['Eng yangi smartfondan', 'Oddiy telefondan', 'Planshetdan', 'Telefonsiz'], c: 1 },
    { q: 'Muallif smartfonning qanday salbiy tomonini aytadi?', o: ['Qimmatligini', 'Doimiy tekshirish va xavotirni', 'Sekin ishlashini', 'Katta hajmini'], c: 1 }
  ]
};

READING_BANK[21] = {
  t: 'When my brother failed his driving test for the second time, he was very disappointed.\n' +
     'He did not want to talk to anyone, and for two days he stayed in his room. Our mother did not\n' +
     'tell him: “Do not worry.” Instead, she asked him what exactly went wrong.\n' +
     'He said he was too nervous at the beginning of the test and made a small mistake while parking.\n' +
     'A week later he booked a new date and practised parking every evening. The third time he passed,\n' +
     'and he was proud of himself. Now he says that failure taught him more than success would have.',
  qs: [
    { q: 'Akasi testdan necha marta yiqildi?', o: ['Bir marta', 'Ikki marta', 'Uch marta', 'Hech qachon'], c: 1 },
    { q: 'Onasi nima qildi?', o: ['“Xavotir olma” dedi', 'Nima xato bo‘lganini so‘radi', 'Unga jahl qildi', 'Yangi testga yozdi'], c: 1 },
    { q: 'U uchinchi urinishda nima qildi?', o: ['Yiqildi', 'O‘tdi va faxrlandi', 'Testni tashladi', 'Mashina sotib oldi'], c: 1 }
  ]
};

READING_BANK[22] = {
  t: 'Rules of politeness are different in every culture, and a visitor must learn them quickly.\n' +
     'In many countries you should take off your shoes when you enter a house, but in some places\n' +
     'you must not do it. In Japan you should not talk loudly on a train; in Italy a loud conversation\n' +
     'in a café is completely normal. When you receive a present, in some cultures you should open it\n' +
     'immediately, while in others you may wait. None of these rules is better than another —\n' +
     'they are simply different. If you are not sure what to do, the safest choice is to watch the people\n' +
     'around you and copy them. You need not speak the language perfectly; a smile and a quiet question\n' +
     '“May I do this?” will help you much more than a long explanation.',
  qs: [
    { q: 'What should a visitor do when the rules are unclear?', o: ['Ask for a written guide', 'Watch and copy local people', 'Stay at the hotel', 'Speak English loudly'], c: 1 },
    { q: 'According to the text, what is true about café conversations in Italy?', o: ['They must be quiet', 'Loud conversation is normal', 'Talking is not allowed', 'Only locals may talk'], c: 1 },
    { q: 'What matters more than perfect language, according to the author?', o: ['A long explanation', 'A smile and a polite question', 'A good present', 'Formal clothes'], c: 1 },
    { q: 'What is the main idea of the text?', o: ['Politeness rules are the same everywhere', 'Rules differ, so observe before acting', 'Foreign visitors should stay home', 'Present-giving is the most important rule'], c: 1 }
  ]
};

READING_BANK[23] = {
  t: 'If you want to build a habit, start with something so small that you cannot fail.\n' +
     'Suppose your goal is to read more in English. If you promise yourself two hours every evening,\n' +
     'you will probably stop after three days. But if you decide to read one paragraph before breakfast,\n' +
     'you will succeed, and success feels good. Once the action is easy, you can slowly increase it.\n' +
     'This method works because our brains repeat what they already do. Researchers found that people\n' +
     'who began with a two-minute exercise continued for longer than people who began with thirty minutes.\n' +
     'Unless you enjoy the first week, you will not continue for a year. So make the first step almost\n' +
     'invisible, and let time do the rest.',
  qs: [
    { q: 'What kind of habit should you start with?', o: ['A big and ambitious one', 'A very small, easy one', 'A difficult but useful one', 'A habit someone else chose'], c: 1 },
    { q: 'Why does starting small work?', o: ['Because it saves time', 'Because the brain repeats what it already does', 'Because it costs nothing', 'Because it impresses others'], c: 1 },
    { q: 'What did the researchers find?', o: ['Two-minute starters lasted longer', 'Thirty-minute starters lasted longer', 'Habits cannot be built', 'Evening practice is best'], c: 0 },
    { q: 'What does the author recommend in the final sentence?', o: ['Make the first step almost invisible', 'Practise for a year before judging', 'Read two hours daily', 'Wait for motivation'], c: 0 }
  ]
};

READING_BANK[24] = {
  t: 'The old library in our town was built in 1905. It was designed by a local architect,\n' +
     'and for many years it was used as the main reading room of the town. In the 1980s the building\n' +
     'was damaged by a fire, and a new roof was put on. Twenty years later the library was moved\n' +
     'to a modern building, and the old one was closed. For a long time nothing happened there.\n' +
     'Then, in 2019, the building was bought by a group of young people. It has now been repaired,\n' +
     'and a small theatre has been opened inside. Local artists’ work is exhibited in the old reading room.\n' +
     'The theatre is run by volunteers, and tickets are sold at a very low price.\n' +
     'It is often said that old buildings should be kept. This one shows why: it was not only repaired,\n' +
     'it was given a new purpose.',
  qs: [
    { q: 'When was the library designed and built?', o: ['In 1905', 'In the 1980s', 'In 2019', 'Twenty years ago'], c: 0 },
    { q: 'What happened to the building in the 1980s?', o: ['It was sold', 'It was damaged by a fire', 'It was moved', 'It was rebuilt in glass'], c: 1 },
    { q: 'Who runs the theatre now?', o: ['The town council', 'A local architect', 'Volunteers', 'A foreign company'], c: 2 },
    { q: 'What is the main point of the last paragraph?', o: ['Old buildings are expensive', 'Repair gives old buildings a new purpose', 'Theatres need volunteers', 'Libraries should be modern'], c: 1 }
  ]
};

READING_BANK[25] = {
  t: 'When Zuhra finished university, she accepted the first job she was offered.\n' +
     'The salary was low and the work was boring, but she learned something important every week:\n' +
     'how to write a clear email, how to ask for help and how to meet a deadline.\n' +
     'Two years later she applied for a position in a bigger company. At the interview she was asked\n' +
     'why she wanted to change her job, and she answered honestly: “I have learned a lot,\n' +
     'but now I need more responsibility.” She got the position.\n' +
     'Her advice to students is simple. First, do not wait for the perfect job; begin somewhere\n' +
     'and learn the basics. Second, keep a small file of your achievements — it will help you\n' +
     'when you write your CV. Third, do not be afraid to ask for feedback, because people usually\n' +
     'give it if you ask politely. A career, she says, is built slowly, not in one lucky day.',
  qs: [
    { q: 'What did Zuhra gain from her first job?', o: ['A high salary', 'Practical skills each week', 'A company car', 'Famous contacts'], c: 1 },
    { q: 'Why did she leave her first job?', o: ['The colleagues were unfriendly', 'She wanted more responsibility', 'The office was far', 'She was dismissed'], c: 1 },
    { q: 'What is her second piece of advice?', o: ['Wait for the perfect job', 'Keep a file of your achievements', 'Never change jobs', 'Ask for a higher salary first'], c: 1 },
    { q: 'How does she describe a career?', o: ['A matter of luck', 'Something built slowly', 'A single decision', 'A university result'], c: 1 }
  ]
};

READING_BANK[26] = {
  t: 'Every year thousands of students choose a university, and many of them choose badly.\n' +
     'The most common mistake is to follow a friend or a fashionable subject instead of asking\n' +
     'what they actually enjoy doing. A second mistake is to believe that one degree decides\n' +
     'the whole life: in fact, most people change their field at least once.\n' +
     'Teachers usually give two pieces of advice. First, visit the university and sit in a real lecture;\n' +
     'a brochure cannot show you how it feels. Second, talk to students who are already there —\n' +
     'they will tell you what nobody writes in the description. It is also useful to remember that\n' +
     'education does not end with a diploma. Languages, computer skills and the ability to write clearly\n' +
     'can be learned at any age, and employers often value them more than the name of the university.',
  qs: [
    { q: 'What is the most common mistake when choosing a university?', o: ['Choosing a cheap course', 'Following a friend or fashion', 'Studying abroad', 'Starting too early'], c: 1 },
    { q: 'Why should you visit a lecture?', o: ['To meet the director', 'Because a brochure cannot show the real experience', 'To get a discount', 'To register faster'], c: 1 },
    { q: 'What do employers often value more than the university name?', o: ['A high diploma grade', 'Practical skills such as languages and clear writing', 'A long CV', 'Recommendation letters'], c: 1 },
    { q: 'What does the text say about changing fields?', o: ['It is a sign of failure', 'Most people do it at least once', 'It is impossible after 30', 'Only engineers do it'], c: 1 }
  ]
};

READING_BANK[27] = {
  t: 'Plastic bags are cheap, light and useful, and that is exactly why they are a problem.\n' +
     'A single bag is used for about twenty minutes, but it can stay in the environment for hundreds of years.\n' +
     'Many countries have introduced a small tax on plastic bags, and the results were surprising:\n' +
     'in some places the number of bags used fell by more than eighty per cent in a few months.\n' +
     'However, taxes alone are not enough. Reusable bags must be stronger and shops must be easy to reach on foot.\n' +
     'In cities where public transport is poor, people continue to buy plastic because they cannot carry\n' +
     'heavy bags home. Recycling helps too, but it should be the last step, not the first:\n' +
     'the best waste is the waste that was never produced. Small daily choices — a bottle,\n' +
     'a bag, a bus ticket instead of a car — decide more than a big promise once a year.',
  qs: [
    { q: 'How long is a plastic bag normally used?', o: ['About twenty minutes', 'One day', 'One year', 'Twenty years'], c: 0 },
    { q: 'What happened after a small tax was introduced?', o: ['Nothing changed', 'Plastic bag use dropped sharply', 'Shops closed', 'Prices fell'], c: 1 },
    { q: 'Why do taxes alone sometimes fail?', o: ['People do not care', 'Public transport is poor and bags are heavy to carry', 'Shops are too far from factories', 'Recycling is banned'], c: 1 },
    { q: 'What is the author’s main message?', o: ['Recycling is the best solution', 'Preventing waste matters more than recycling it', 'Plastic should be banned completely', 'Taxes never work'], c: 1 }
  ]
};

READING_BANK[28] = {
  t: 'Every generation believes that it is living through the fastest changes in history,\n' +
     'and perhaps every generation is right. What is new today is the speed at which a technology\n' +
     'reaches ordinary people. A device that costs a month’s salary this year may cost a week’s salary\n' +
     'in three years. This has two effects. On the one hand, students in small towns can now attend\n' +
     'the same online courses as students in the capital. On the other hand, people who cannot\n' +
     'adapt quickly may lose their jobs to machines — not because machines are cleverer,\n' +
     'but because they do not get tired. Experts disagree about the future of work, yet most of them agree\n' +
     'on one point: the skills that are hardest to replace are those that combine knowledge with\n' +
     'communication. A person who can explain, persuade and listen will always be needed.',
  qs: [
    { q: 'What is new about technology today, according to the text?', o: ['It is cheaper than before', 'It reaches ordinary people very quickly', 'It is made in one country', 'It never fails'], c: 1 },
    { q: 'What positive effect is mentioned?', o: ['Machines work faster', 'Students in small towns can take the same online courses', 'Prices always fall', 'People work fewer hours'], c: 1 },
    { q: 'Why may some people lose jobs to machines?', o: ['Because machines are cleverer', 'Because machines do not get tired', 'Because salaries are higher', 'Because machines are cheaper to train'], c: 1 },
    { q: 'Which skills do experts consider hardest to replace?', o: ['Typing speed', 'Knowledge combined with communication', 'Physical strength', 'Programming alone'], c: 1 }
  ]
};

READING_BANK[29] = {
  t: 'Traditions survive when they are useful, and they change when they stop being useful.\n' +
     'Nowruz, for example, is celebrated in many countries, and each nation has added something of its own:\n' +
     'food, music, games or special clothes. Nobody organises this; it happens naturally.\n' +
     'A tradition that is kept only because “we have always done it” becomes a performance,\n' +
     'while a tradition that people enjoy stays alive. The same is true of language.\n' +
     'New words appear every year, and old words disappear. Some people are worried about this,\n' +
     'but linguists are usually calm: a language that stops changing is a language that is dying.\n' +
     'The healthiest sign is not the number of old words that are remembered,\n' +
     'but the number of young people who still want to speak it.',
  qs: [
    { q: 'When do traditions change, according to the text?', o: ['When governments decide', 'When they stop being useful', 'Every ten years', 'When tourists arrive'], c: 1 },
    { q: 'What happens to a tradition kept only out of habit?', o: ['It becomes a performance', 'It grows stronger', 'It spreads abroad', 'It becomes a law'], c: 0 },
    { q: 'How do linguists react to language change?', o: ['With worry', 'Calmly — change is normal', 'By banning new words', 'By writing dictionaries only'], c: 1 },
    { q: 'What is the healthiest sign for a language?', o: ['Many old words remembered', 'Young people wanting to speak it', 'A long dictionary', 'Official status'], c: 1 }
  ]
};

READING_BANK[30] = {
  t: 'Travelling teaches you things that no book can, but only if you are ready to be uncomfortable.\n' +
     'The first days in a new country are usually the hardest: you are tired, you do not understand\n' +
     'the signs, and the food tastes strange. Many tourists stay inside this discomfort and look for\n' +
     'familiar restaurants. Others try to solve one small problem every day — buying a ticket,\n' +
     'asking for directions, ordering a meal without pointing at the menu. After a week,\n' +
     'the second group speaks with more confidence, even if their grammar is still weak.\n' +
     'Language teachers often say the same about the classroom: the students who improve fastest\n' +
     'are not the cleverest ones, but those who are willing to make mistakes in front of other people.\n' +
     'Comfort is pleasant, but it rarely teaches anything new.',
  qs: [
    { q: 'What makes the first days in a new country difficult?', o: ['The weather only', 'Tiredness, unfamiliar signs and food', 'The cost of hotels', 'Long queues at museums'], c: 1 },
    { q: 'What do the travellers who improve fastest do?', o: ['Stay in familiar places', 'Solve one small problem every day', 'Read guidebooks carefully', 'Travel with a group'], c: 1 },
    { q: 'How does this compare with language lessons?', o: ['Grammar matters most', 'Students who risk mistakes improve fastest', 'Clever students always win', 'Books are unnecessary'], c: 1 },
    { q: 'What is the main idea of the text?', o: ['Travel is always expensive', 'Discomfort is where learning happens', 'Tourists should avoid local food', 'Books teach nothing'], c: 1 }
  ]
};

READING_BANK[31] = {
  t: 'A good discussion is not a competition. Beginners often think that an argument is won\n' +
     'by speaking loudly or by having the last word, but experienced speakers do something different:\n' +
     'they listen, repeat the other person’s point in their own words, and only then give their opinion.\n' +
     'This technique, called paraphrasing, has two advantages. First, it shows respect,\n' +
     'so the other person becomes calmer. Second, it makes sure that you have understood correctly\n' +
     'before you disagree. Useful phrases are short: “So, if I understand you correctly, you think that…”,\n' +
     '“I see your point, but I would add that…”, “That may be true in some cases, however…”.\n' +
     'Notice that none of these phrases says “You are wrong”. Strong opinions can be expressed politely,\n' +
     'and a conversation that ends with both sides thinking is more valuable than one that ends with a winner.',
  qs: [
    { q: 'What do experienced speakers do before giving their opinion?', o: ['Speak more loudly', 'Repeat the other point in their own words', 'Change the subject', 'Interrupt politely'], c: 1 },
    { q: 'What is one advantage of paraphrasing?', o: ['It shortens the discussion', 'It shows respect and calms the other person', 'It proves you are right', 'It avoids questions'], c: 1 },
    { q: 'Which phrase is recommended?', o: ['You are wrong', 'I see your point, but I would add that…', 'That is a silly idea', 'Everyone agrees with me'], c: 1 },
    { q: 'According to the author, a good conversation ends with…', o: ['a winner', 'both sides thinking', 'a written agreement', 'a change of topic'], c: 1 }
  ]
};

READING_BANK[32] = {
  t: 'The teacher who changed my attitude to science was a woman whose name I have forgotten.\n' +
     'She taught physics in a school where the laboratories, which had been built in the 1960s,\n' +
     'were falling apart. Instead of complaining, she brought simple objects to class — a candle,\n' +
     'a mirror, a piece of wire — and asked us questions that had no quick answers.\n' +
     'The experiment I remember best is the one that failed: we could not explain why the flame moved\n' +
     'when the door opened, and we spent two lessons arguing about it.\n' +
     'What she gave us was not information, which we could find in any book,\n' +
     'but a habit of asking “why” until the answer made sense. Students who learn this habit,\n' +
     'whose marks are not always the highest, usually do well later, because work — like science —\n' +
     'is mostly a series of problems that nobody has solved yet.',
  qs: [
    { q: 'What was the condition of the school laboratories?', o: ['Newly built', 'Falling apart', 'Moved to another building', 'Fully equipped'], c: 1 },
    { q: 'Why does the author remember one experiment best?', o: ['It was dangerous', 'It failed and led to a long discussion', 'It was in the textbook', 'It won a prize'], c: 1 },
    { q: 'What did the teacher really give the students?', o: ['Scientific facts', 'Expensive equipment', 'A habit of asking why', 'Better marks'], c: 2 },
    { q: 'Which students usually do well later?', o: ['Those with the highest marks', 'Those who keep asking questions', 'Those who avoid experiments', 'Those who read only books'], c: 1 }
  ]
};

READING_BANK[33] = {
  t: 'When my manager asked me to lead the project, I told her I had never managed a team before.\n' +
     'She said she knew that, and added that this was exactly why she had chosen me:\n' +
     'she explained that people who think they already know everything rarely listen.\n' +
     'Later, one of my colleagues asked me whether I was nervous about the deadline.\n' +
     'I answered that I was nervous about something else — that the team would not tell me\n' +
     'when they disagreed. So we agreed on a simple rule at the first meeting: anyone who saw a problem\n' +
     'had to say it in the same week. It was not a friendly rule, but it saved us twice.\n' +
     'The project finished one week late, and I told the client honestly why.\n' +
     'He said he preferred a late project to a silent one, and he asked us to work with him again.',
  qs: [
    { q: 'Why did the manager choose the author?', o: ['Because of long experience', 'Because newcomers listen carefully', 'Because nobody else applied', 'Because of his degree'], c: 1 },
    { q: 'What was the author really worried about?', o: ['The deadline', 'That the team would hide disagreements', 'The client’s reaction', 'His salary'], c: 1 },
    { q: 'What rule was agreed at the first meeting?', o: ['No meetings after five', 'Problems must be raised in the same week', 'Only the leader may speak', 'All decisions by vote'], c: 1 },
    { q: 'How did the client react to the delay?', o: ['He cancelled the contract', 'He accepted honesty and wanted to work again', 'He asked for a discount', 'He complained to the manager'], c: 1 }
  ]
};

READING_BANK[34] = {
  t: 'Many learners stop improving because they are afraid of making mistakes, and this fear\n' +
     'is often created by the way they were taught. In some classrooms, correcting errors is the main job\n' +
     'of the teacher, so students learn to avoid difficult structures rather than using them.\n' +
     'Research in second-language learning suggests something different. Errors are not a sign of failure;\n' +
     'they are evidence that the learner is testing a rule. A student who says “I goed there yesterday”\n' +
     'has understood that past time needs a past form — the rule is almost right.\n' +
     'The most useful correction is therefore not “wrong”, but “almost — try saying it this way”.\n' +
     'Teachers who correct too much create silence; teachers who correct too little create habits.\n' +
     'The balance is to choose the right moment: after the meaning is clear, not while the student is still thinking.\n' +
     'Learners can do the same for themselves by recording their own voice and comparing it with a model.',
  qs: [
    { q: 'Why do some learners avoid difficult structures?', o: ['They are lazy', 'They fear mistakes', 'They prefer grammar rules', 'They have no teacher'], c: 1 },
    { q: 'How does the text describe errors?', o: ['A sign of failure', 'Evidence that a rule is being tested', 'A result of bad memory', 'A problem of pronunciation'], c: 1 },
    { q: 'What makes the example “I goed there” interesting?', o: ['It shows the past rule is almost understood', 'It proves the student cannot learn', 'It is a spelling mistake only', 'It is correct in some dialects'], c: 0 },
    { q: 'What is the recommended balance?', o: ['Correct every mistake immediately', 'Correct only after meaning is clear', 'Never correct', 'Correct only written work'], c: 1 }
  ]
};
