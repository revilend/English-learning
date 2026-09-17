/* ==========================================================================
   Reading bank — 35–50-darslar (B2, C1)
   Matn daraja oshgani sari uzunroq bo‘ladi:
     B2 → ~250 so‘z, 4 savol   ·   C1 → ~320 so‘z, 5 savol
   Savollar B1 dan boshlab inglizcha (haqiqiy imtihondagidek), javoblar ham inglizcha.
   READING_BANK[1..17] → reading-a.js,  [18..34] → reading-b.js
   ========================================================================== */
var READING_BANK = READING_BANK || {};

READING_BANK[35] = {
  t: 'When I took up running two years ago, I nearly gave up in the first week. I could not keep up\n' +
     'with the other runners in the park, and my legs hurt for days. My friend Aziz told me to carry on\n' +
     'and to write down every small improvement instead of staring at the whole distance.\n' +
     'Little by little, things changed. I worked out a simple weekly plan, put off the idea of running\n' +
     'a marathon until next year, and turned down invitations to late-night parties so that I could\n' +
     'sleep properly. I also looked up the words I did not know in the running magazine, and I made up\n' +
     'a short list of phrasal verbs to review on the bus.\n' +
     'The biggest surprise was not physical. Once I stopped comparing myself with faster runners,\n' +
     'I stopped finding excuses to skip training. My brother, who had signed up for the same race,\n' +
     'dropped out after three weeks; he had relied on motivation instead of a routine.\n' +
     'Now I understand why coaches say that habits beat talent. Motivation shows up on good days,\n' +
     'but a habit shows up on the bad ones — and those are the days that decide everything.',
  qs: [
    { q: 'Why did the author nearly give up in the first week?', o: ['He had no running shoes', 'He could not keep up with the other runners', 'His friend stopped training', 'He found the park too far'], c: 1 },
    { q: 'What did Aziz advise him to do?', o: ['To run a marathon immediately', 'To carry on and note small improvements', 'To train at night', 'To read a running magazine'], c: 1 },
    { q: 'What does “turned down” mean in the text?', o: ['Accepted', 'Refused', 'Postponed', 'Wrote down'], c: 1 },
    { q: 'Why did his brother drop out of the race?', o: ['He was injured', 'He relied on motivation instead of a routine', 'He moved to another city', 'He could not pay the fee'], c: 1 }
  ]
};

READING_BANK[36] = {
  t: 'A friend of mine runs a small furniture workshop, and last year he decided to expand.\n' +
     'A bank offered him a loan, but the interest rate was high, so he asked an accountant to look\n' +
     'at his numbers before he signed anything. The advice he received was simple: growth costs money\n' +
     'before it earns money. Hiring two workers and renting a larger space would increase his fixed\n' +
     'costs every month, while new orders might arrive slowly.\n' +
     'Instead of borrowing the full amount, he borrowed half and paid for the rest from his savings.\n' +
     'He also changed his prices: small items became slightly cheaper, while custom-made furniture,\n' +
     'which took most of his time, became more expensive. Within six months the workshop was\n' +
     'profitable again, though its turnover had grown by less than he had hoped.\n' +
     'The lesson is not that ambition is dangerous. It is that a business plan should be judged by\n' +
     'cash flow, not by excitement. Many companies fail not because nobody buys their product,\n' +
     'but because they run out of money while waiting for customers to pay. Keeping three months of\n' +
     'expenses in reserve sounds boring, yet it is the difference between a slow year and a closed door.',
  qs: [
    { q: 'Why did the owner ask an accountant for advice?', o: ['To find new customers', 'Because the loan interest was high', 'To sell the workshop', 'To hire an accountant permanently'], c: 1 },
    { q: 'What did he finally do about the loan?', o: ['He borrowed the full amount', 'He borrowed half and used his savings', 'He refused all growth', 'He sold his savings'], c: 1 },
    { q: 'How did he change his prices?', o: ['He lowered every price', 'He raised prices on custom-made furniture', 'He kept prices the same', 'He stopped selling small items'], c: 1 },
    { q: 'What should a business plan be judged by, according to the author?', o: ['Excitement', 'Cash flow', 'Number of employees', 'Shop size'], c: 1 }
  ]
};

READING_BANK[37] = {
  t: 'For most of history, medicine focused on treating people who were already ill. Today doctors talk\n' +
     'about prevention as much as about treatment, because the illnesses that kill most people in\n' +
     'middle age develop quietly over decades. High blood pressure, for instance, rarely causes pain,\n' +
     'so thousands of people carry it without knowing. A simple check once a year can catch it early,\n' +
     'when changes in diet and exercise are still enough.\n' +
     'Yet screening has limits that are easy to forget. A test that finds a problem the body would\n' +
     'have solved by itself leads to unnecessary worry and unnecessary treatment. That is why doctors\n' +
     'weigh the benefit against the harm before recommending a programme for a whole population.\n' +
     'Sleep is a good example of how much knowledge has changed. Twenty years ago, sleeping six hours\n' +
     'was treated almost as a virtue. Studies now link long-term sleep shortage to heart disease,\n' +
     'weaker memory and slower recovery. The advice has therefore shifted from “work harder” to\n' +
     '“protect your nights”.\n' +
     'What has not changed is the importance of the patient’s own account. Machines measure the body,\n' +
     'but only the patient can describe how daily life feels — and that description often decides\n' +
     'which test is worth doing next.',
  qs: [
    { q: 'Why do doctors emphasise prevention today?', o: ['Treatment is impossible', 'Many serious illnesses develop quietly over years', 'Patients prefer tests', 'Hospitals are overcrowded'], c: 1 },
    { q: 'What is a disadvantage of screening?', o: ['It is always expensive', 'It may find problems that would have solved themselves', 'It takes several days', 'It cannot measure blood pressure'], c: 1 },
    { q: 'How has advice about sleep changed?', o: ['From protecting nights to working harder', 'From treating short sleep as a virtue to warning against it', 'Sleep is no longer studied', 'Six hours is now recommended'], c: 1 },
    { q: 'What is the patient’s unique contribution?', o: ['Measuring the body precisely', 'Describing how daily life feels', 'Choosing the hospital', 'Paying for treatment'], c: 1 }
  ]
};

READING_BANK[38] = {
  t: 'Readers often ask why journalists report bad news more often than good news. The short answer is\n' +
     'that bad news is usually sudden and specific, while good news is usually slow and general.\n' +
     'A bridge that collapses is an event; a bridge that stands for forty years is not, even though\n' +
     'it is far more important. Editors are therefore not choosing to depress us; they are following\n' +
     'the structure of events.\n' +
     'That does not excuse every decision. Every reporter works with a limited budget, a deadline and a\n' +
     'source who may have a reason to tell only part of the truth. The professional rule is to seek a\n' +
     'second independent source, and to give the person who is criticised a chance to answer.\n' +
     'Readers play a part too. A headline can be accurate and still misleading if it leaves out the\n' +
     'context. Studies of social media show that claims travel fastest when they confirm what we already\n' +
     'believe, so the duty to check does not belong to journalists alone.\n' +
     'The healthiest attitude is neither trust nor suspicion, but curiosity: asking who benefits from\n' +
     'this story, what evidence supports it, and what a well-informed person on the other side would say.',
  qs: [
    { q: 'Why is bad news reported more often?', o: ['Editors enjoy it', 'It is sudden and specific, unlike slow good news', 'Good news is illegal to publish', 'Readers pay only for bad news'], c: 1 },
    { q: 'What is the professional rule mentioned?', o: ['Publish quickly without checking', 'Find a second independent source and let the criticised side respond', 'Never name companies', 'Only use official sources'], c: 1 },
    { q: 'How can an accurate headline still mislead?', o: ['If it is too long', 'If it leaves out the context', 'If it uses numbers', 'If it names a person'], c: 1 },
    { q: 'Which claims spread fastest on social media?', o: ['Boring ones', 'Ones that confirm what we already believe', 'Official reports', 'Long articles'], c: 1 },
    { q: 'What attitude does the author recommend?', o: ['Blind trust', 'Constant suspicion', 'Curiosity and checking evidence', 'Ignoring the news'], c: 2 }
  ]
};

READING_BANK[39] = {
  t: 'A scientific result is not the same thing as a scientific fact. A single study can show a pattern,\n' +
     'but a pattern may come from chance, from a badly chosen sample, or from a measurement that was\n' +
     'taken slightly differently from the measurement used by other teams. This is why replication\n' +
     'matters more than novelty. If three independent groups, using different equipment and different\n' +
     'populations, find the same effect, confidence grows.\n' +
     'Modern research has a problem that earlier scientists did not face: there are simply more papers\n' +
     'than anyone can read. A specialist in one narrow area may have to evaluate hundreds of articles a\n' +
     'year, and the pressure to publish quickly can reward speed over care. Some journals now require\n' +
     'authors to register their method in advance, so that the analysis cannot be adjusted after the\n' +
     'results are known.\n' +
     'None of this means that science is unreliable. It means that progress is a social process, not a\n' +
     'single brilliant moment. A claim becomes knowledge when a community of researchers has tried to\n' +
     'break it and failed. For ordinary readers, the practical lesson is to check whether a story\n' +
     'describes one study or many, and whether the effect is large enough to matter in real life.',
  qs: [
    { q: 'Why is replication more valuable than novelty?', o: ['It is cheaper', 'Independent repetition makes confidence grow', 'It is faster to publish', 'Journals prefer it'], c: 1 },
    { q: 'What problem do modern researchers face?', o: ['Too few measurements', 'More papers than anyone can read', 'No access to equipment', 'Too much funding'], c: 1 },
    { q: 'Why do some journals ask for the method in advance?', o: ['To shorten papers', 'So the analysis cannot be adjusted after results are known', 'To keep methods secret', 'To reduce costs'], c: 1 },
    { q: 'When does a claim become knowledge?', o: ['After one strong experiment', 'When a community has tried to break it and failed', 'When it appears in a newspaper', 'When a famous professor agrees'], c: 1 }
  ]
};

READING_BANK[40] = {
  t: 'The way a city feels depends less on its buildings than on its distances. A neighbourhood where\n' +
     'shops, schools and a clinic are within a ten-minute walk produces very different daily habits from\n' +
     'one where every errand requires a car. Planners call this walkability, and it affects health,\n' +
     'local business and even how well neighbours know each other.\n' +
     'Improving it, however, is harder than drawing a new map. Widening a road may speed up traffic in\n' +
     'the short term and encourage more cars in the long term, until the road is as busy as before.\n' +
     'Adding a bus lane is unpopular with drivers who lose a lane; yet the same drivers often benefit\n' +
     'years later, when the alternative to driving becomes realistic.\n' +
     'There is also the question of who pays. Public transport, parks and pavements are shared goods:\n' +
     'everyone can use them, so no single company has a strong reason to build them. This is one of the\n' +
     'few areas where public money is not an obstacle to the market but a condition for it. A street\n' +
     'with reliable buses supports the cafés and workshops along it, and they in turn make the walk\n' +
     'worth taking.\n' +
     'The most successful projects usually start small: one junction, one square, one bus corridor.\n' +
     'Cities learn by experiment, and residents accept change more easily when the first results are\n' +
     'visible in their own street.',
  qs: [
    { q: 'What does walkability depend on, according to the text?', o: ['The height of buildings', 'How short the distances between daily services are', 'The number of cars', 'The age of the city'], c: 1 },
    { q: 'What often happens after a road is widened?', o: ['Traffic disappears forever', 'More cars appear until the road is busy again', 'Buses stop running', 'Shops close'], c: 1 },
    { q: 'Why is public transport difficult for private companies to provide?', o: ['It is illegal', 'It is a shared good that nobody can easily charge for', 'It is always unprofitable in every city', 'Drivers refuse to use it'], c: 1 },
    { q: 'What do the most successful projects look like at the start?', o: ['Very large and expensive', 'Small: one junction or one corridor', 'Invisible to residents', 'Restricted to rich districts'], c: 1 }
  ]
};

READING_BANK[41] = {
  t: 'Idioms are the last part of a language that a learner masters, and the reason is simple: their\n' +
     'meaning cannot be built from the words. Somebody who knows every word in “she let the cat out of\n' +
     'the bag” still cannot guess that it means she revealed a secret. Idioms are like small history\n' +
     'lessons that the whole community has agreed to remember.\n' +
     'Because of this, learners often make two opposite mistakes. The first is to avoid idioms\n' +
     'completely, which makes their English correct but flat, like a report written by a machine.\n' +
     'The second is to use them everywhere, especially in formal writing, where “we are in the same boat”\n' +
     'may sound inappropriate in a legal document.\n' +
     'A safer approach is to collect idioms in context, not in lists. Note down who said it, to whom,\n' +
     'and in what mood. You will quickly notice that many idioms are informal, that some are used only\n' +
     'in British English, and that a few carry a hint of criticism. “He is a bit of a couch potato”\n' +
     'is friendly between friends but rude in a job interview.\n' +
     'The good news is that understanding matters more than producing. You can listen to a film,\n' +
     'catch “it is not my cup of tea”, and feel pleased without ever using the phrase yourself.\n' +
     'Passive knowledge quietly turns into active knowledge — usually on the day you least expect it.',
  qs: [
    { q: 'Why are idioms difficult for learners?', o: ['They are very long', 'Their meaning cannot be worked out from the individual words', 'They are rarely used', 'They change every year'], c: 1 },
    { q: 'What is the first mistake learners make?', o: ['Using too many idioms', 'Avoiding idioms completely', 'Translating them literally', 'Writing them in lists'], c: 1 },
    { q: 'Why is “we are in the same boat” unsuitable for a legal document?', o: ['It is grammatically wrong', 'It is informal in a formal context', 'It is American English', 'It is old-fashioned'], c: 1 },
    { q: 'How does the author suggest collecting idioms?', o: ['Alphabetically in a list', 'With context: who said it and in what mood', 'By translating them', 'By learning only British ones'], c: 1 },
    { q: 'What does the author say about passive knowledge?', o: ['It is useless until produced', 'It slowly becomes active knowledge', 'It must be tested weekly', 'It only works for reading'], c: 1 }
  ]
};

READING_BANK[42] = {
  t: 'Not often does a single grammatical device change the tone of a whole paragraph, yet inversion can\n' +
     'do exactly that. In ordinary English we say “I have never seen such a crowd.” Move the negative\n' +
     'word to the front, and the sentence acquires a formal, almost dramatic weight: “Never have I seen\n' +
     'such a crowd.” The information is identical; the effect is not.\n' +
     'Only in writing does this structure appear without effort. In speech it is rarer, and when it is\n' +
     'used, it usually signals emphasis rather than neutrality. “Not only did the team lose the match,\n' +
     'but they also lost their captain to injury” sounds like a summary in a sports report, not like a\n' +
     'remark between friends. Hardly had the announcement been made when the questions began;\n' +
     'no sooner had the minister sat down than the first journalist stood up. Both patterns place two\n' +
     'events very close together in time, and both belong to careful, literary prose.\n' +
     'Learners should therefore treat inversion as a tool with a narrow but real purpose: it is\n' +
     'excellent for emphasis in essays, reports and speeches, and dangerous in casual conversation,\n' +
     'where it can sound theatrical. Under no circumstances should it be used simply because it looks\n' +
     'advanced. Style, after all, is the art of choosing what to leave out, not of proving how much\n' +
     'grammar one has memorised.',
  qs: [
    { q: 'What changes when a negative word is moved to the front?', o: ['The information', 'The tone, which becomes more formal and emphatic', 'The tense', 'Nothing at all'], c: 1 },
    { q: 'Where does inversion appear most naturally?', o: ['In casual conversation', 'In careful writing such as reports and speeches', 'In text messages', 'In shopping lists'], c: 1 },
    { q: 'What do “hardly had… when” and “no sooner had… than” express?', o: ['A condition', 'Two events happening very close together in time', 'A polite request', 'A habit in the past'], c: 1 },
    { q: 'What warning does the author give?', o: ['Never use inversion at all', 'Do not use it merely because it looks advanced', 'Use it only in speech', 'Use it in every paragraph'], c: 1 },
    { q: 'Which sentence is correctly inverted?', o: ['Never I have seen such a crowd', 'Never have I seen such a crowd', 'Have never I seen such a crowd', 'I never have seen such crowd'], c: 1 }
  ]
};

READING_BANK[43] = {
  t: 'The subjunctive is the part of English grammar that refuses to behave like the rest of it.\n' +
     'In everyday speech we say “I wish I was taller”, and nobody minds. In careful writing the same\n' +
     'sentence becomes “I wish I were taller”, because the subjunctive marks something that is not true\n' +
     'now. The distinction is small, but it tells the reader that the speaker is thinking about reality\n' +
     'rather than about possibilities.\n' +
     'The same logic explains why committees insist on “I suggest that he be informed immediately”\n' +
     'instead of “he is informed”. After verbs of demanding, suggesting and insisting, English keeps the\n' +
     'base form of the verb, even in the third person. It is a fossil of an older system, preserved in\n' +
     'institutions — laws, contracts, minutes of meetings — precisely because those texts value\n' +
     'precision over smoothness.\n' +
     'For learners, the practical rule is easier than the theory. Use “were” after wish and after “if”\n' +
     'in hypothetical statements, and use the base form after demand, insist, require, recommend and\n' +
     'suggest in formal writing. Do not worry if a native speaker uses “was” in conversation;\n' +
     'that is a register choice, not an error.\n' +
     'What matters most is that the subjunctive expresses an attitude towards reality — that something\n' +
     'is wished for, demanded or imagined rather than reported. If it did not exist, English would lose\n' +
     'one of its few ways of saying, in grammar alone, “this is not how things are”.',
  qs: [
    { q: 'Why does careful writing prefer “I wish I were taller”?', o: ['It sounds older', 'It marks something that is not true now', 'It is easier to pronounce', 'It is more polite'], c: 1 },
    { q: 'What form follows verbs such as demand, insist and suggest in formal English?', o: ['The -ing form', 'The base form of the verb', 'The past continuous', 'The infinitive with “to”'], c: 1 },
    { q: 'Why is the subjunctive preserved in laws and contracts?', o: ['Because it is fashionable', 'Because those texts value precision', 'Because it is shorter', 'Because grammar books require it'], c: 1 },
    { q: 'What does the author say about native speakers using “was” in speech?', o: ['It is a serious error', 'It is a register choice, not an error', 'It is only used by children', 'It changes the meaning completely'], c: 1 },
    { q: 'What attitude does the subjunctive express?', o: ['Certainty about the past', 'Something wished for, demanded or imagined', 'A polite question', 'A future plan'], c: 1 }
  ]
};

READING_BANK[44] = {
  t: 'It is not what a writer says that decides whether a paragraph holds our attention; it is where the\n' +
     'emphasis falls. Cleft sentences exist for exactly this purpose. Instead of “The delay annoyed the\n' +
     'passengers most”, an experienced writer may choose “What annoyed the passengers most was the\n' +
     'delay.” The second version slows the reader down and points a finger at one element of the\n' +
     'sentence.\n' +
     'The structure is flexible. “It was the manager who apologised” and “What the manager did was\n' +
     'apologise” push different parts of the message into the light. Both are common in journalism,\n' +
     'where the first line of a report must carry the news, and in academic writing, where a claim has\n' +
     'to be separated from the evidence that supports it.\n' +
     'There is a cost, however. Cleft sentences are longer than plain ones, and a text built entirely\n' +
     'from them soon sounds artificial, as if every sentence were competing for the same prize.\n' +
     'The most elegant use is corrective: it is the tool you reach for when a reader might have the\n' +
     'wrong idea, or when a comparison is being made. “It was not the price that worried us; it was\n' +
     'the timing.” Here the emphasis is not decoration — it removes a misunderstanding the reader is\n' +
     'likely to have.\n' +
     'Good writers therefore treat the cleft as a spotlight rather than a permanent lamp. Used once in\n' +
     'a paragraph, it directs attention. Used everywhere, it blinds.',
  qs: [
    { q: 'What is the main purpose of cleft sentences?', o: ['To shorten a sentence', 'To control where the emphasis falls', 'To avoid the passive', 'To make a text more formal'], c: 1 },
    { q: 'Which pair both illustrate cleft structures?', o: ['“It was the manager who apologised” and “What the manager did was apologise”', '“The manager apologised” and “The manager was apologising”', '“Annoyed the passengers” and “The passengers were annoyed”', '“It was late” and “It rained”'], c: 0 },
    { q: 'What is the cost of using cleft sentences?', o: ['They are grammatically incorrect', 'They are longer and can sound artificial if overused', 'They cannot be used in journalism', 'They hide the subject'], c: 1 },
    { q: 'When is a cleft sentence most useful?', o: ['In every sentence', 'When correcting a likely misunderstanding', 'Only in poetry', 'When writing instructions'], c: 1 },
    { q: 'What does the spotlight comparison suggest?', o: ['Emphasis should be used everywhere', 'Emphasis is powerful when used sparingly', 'Cleft sentences are decorative only', 'Readers dislike emphasis'], c: 1 }
  ]
};

READING_BANK[45] = {
  t: 'The passive voice has a reputation problem, and it is largely undeserved. Generations of students\n' +
     'have been told that the passive should be avoided, mostly because it can hide responsibility:\n' +
     '“mistakes were made” tells us that something went wrong while carefully avoiding the question of\n' +
     'who did it. That is a real danger, and the criticism is fair when the passive is used to avoid\n' +
     'accountability.\n' +
     'But the passive is also the only sensible choice in many situations. Scientific writing depends on\n' +
     'it, because the method matters more than the person: “the samples were heated to 60 degrees”\n' +
     'describes a procedure that anyone could repeat. In formal notices, the passive protects the reader\n' +
     'from unnecessary blame: “applications must be submitted by Friday” is clearer and kinder than an\n' +
     'accusation addressed to individuals.\n' +
     'Advanced writers go further, combining the passive with other structures. “The findings are\n' +
     'believed to have been published last year” reports a claim without naming the people who believe\n' +
     'it. “It is said that the building will be demolished” presents a rumour as a rumour rather than\n' +
     'as a fact — a distinction that readers of newspapers should value.\n' +
     'The practical advice is therefore not to ban the passive but to ask what it is doing. Is the agent\n' +
     'unknown, unimportant, or deliberately hidden? If the last, the writing is not elegant — it is\n' +
     'evasive. If the first two, the passive is not a weakness but a sign of a writer who understands\n' +
     'what the sentence is actually about.',
  qs: [
    { q: 'Why is the passive criticised?', o: ['It is grammatically wrong', 'It can hide who is responsible', 'It is too short', 'It cannot express the past'], c: 1 },
    { q: 'Why does scientific writing depend on the passive?', o: ['To sound intelligent', 'Because the method matters more than the person', 'Because scientists dislike names', 'To save space'], c: 1 },
    { q: 'What does “The findings are believed to have been published last year” do?', o: ['Names the researchers', 'Reports a claim without naming who believes it', 'Denies the findings', 'Corrects an error'], c: 1 },
    { q: 'What is the author’s practical advice?', o: ['Ban the passive completely', 'Ask what the passive is doing in the sentence', 'Use only active verbs', 'Never use the passive in reports'], c: 1 },
    { q: 'When is the passive evasive rather than elegant?', o: ['When the agent is unknown', 'When the agent is deliberately hidden', 'When the agent is unimportant', 'When the sentence is long'], c: 1 }
  ]
};

READING_BANK[46] = {
  t: 'Academic writing is often described as difficult, but its rules exist to make reading easier rather\n' +
     'than to impress the reader. A paragraph should make one point, support it with evidence, and say\n' +
     'clearly how the evidence relates to the point. When a paragraph tries to do three things at once,\n' +
     'the reader finishes it without knowing what to remember.\n' +
     'The most common weakness in student essays is not grammar; it is the missing link between claim\n' +
     'and evidence. A quotation placed next to an argument proves nothing by itself. What proves\n' +
     'something is the sentence that explains why the quotation supports the claim — and that sentence\n' +
     'is frequently the one that students forget to write.\n' +
     'Hedging is another area where beginners often overshoot. Careful writers use “this suggests”\n' +
     'or “the evidence indicates” because a single study rarely proves a general law. But a text full of\n' +
     '“perhaps” and “possibly” sounds as though the author has no opinion at all. The aim is measured\n' +
     'confidence: strong claims where the evidence is strong, cautious language where it is not.\n' +
     'Finally, structure should be visible. Headings, topic sentences and signposting words such as\n' +
     '“however” and “therefore” are not decorations; they are the reader’s map. Markers of quality in\n' +
     'academic work are consistency of argument, accuracy of reference and clarity of expression — in\n' +
     'that order. Elegance without accuracy is merely a well-dressed mistake.',
  qs: [
    { q: 'What is the purpose of the rules of academic writing?', o: ['To impress the reader', 'To make reading easier', 'To lengthen essays', 'To hide the author’s opinion'], c: 1 },
    { q: 'What should a paragraph do?', o: ['Make several points at once', 'Make one point and support it with explained evidence', 'Quote as much as possible', 'Avoid signposting words'], c: 1 },
    { q: 'What is the most common weakness in student essays?', o: ['Spelling', 'The missing explanation linking evidence to the claim', 'Too many paragraphs', 'Informal vocabulary'], c: 1 },
    { q: 'How should hedging be used?', o: ['In every sentence', 'With measured confidence, matching the strength of the evidence', 'Never', 'Only in the conclusion'], c: 1 },
    { q: 'What are headings and signposting words described as?', o: ['Decorations', 'The reader’s map', 'Optional extras', 'Signs of weak writing'], c: 1 }
  ]
};

READING_BANK[47] = {
  t: 'Asked what makes a speech memorable, most people mention the speaker’s voice, their gestures or\n' +
     'their confidence. Experienced speakers give a different answer: structure first, delivery second.\n' +
     'An audience forgives a nervous voice far more easily than it forgives confusion. If listeners\n' +
     'cannot say after ten minutes what the talk is about, no amount of charisma will repair the damage.\n' +
     'A useful discipline is to reduce the talk to three sentences before writing a single slide. What is\n' +
     'the problem? What is the evidence? What do I want the audience to do? Every example that does\n' +
     'not serve one of those sentences is a candidate for removal — and beginners almost always remove\n' +
     'too little rather than too much.\n' +
     'Delivery can then be practised separately. Short sentences are easier to say aloud than long ones;\n' +
     'silence after an important point is more powerful than repetition; and an anecdote told in the\n' +
     'first person usually earns more attention than a statistic. Statistics still have their place, but\n' +
     'they work best when they are few and when they are explained in everyday language.\n' +
     'Perhaps the least appreciated skill is the ending. A speech that stops because the speaker ran out\n' +
     'of material leaves an audience with nothing to carry away. A deliberate last sentence — an\n' +
     'instruction, a question, a single memorable image — turns information into something people\n' +
     'remember on the way home.',
  qs: [
    { q: 'What do experienced speakers put first?', o: ['Voice and gestures', 'Structure', 'Confidence', 'Humor'], c: 1 },
    { q: 'What happens if listeners cannot identify the topic after ten minutes?', o: ['They listen harder', 'Charisma cannot repair the damage', 'They ask questions', 'They remember the examples'], c: 1 },
    { q: 'What three questions should a talk answer?', o: ['Who, when and where?', 'What is the problem, what is the evidence, what should the audience do?', 'Why, how much and how long?', 'Who paid, who wrote and who agreed?'], c: 1 },
    { q: 'What mistake do beginners usually make?', o: ['Removing too much', 'Removing too little', 'Speaking too briefly', 'Using too few slides'], c: 1 },
    { q: 'What is said about the ending?', o: ['It should be improvised', 'It should be deliberate, with a memorable last sentence', 'It should repeat the introduction', 'It does not matter'], c: 1 }
  ]
};

READING_BANK[48] = {
  t: 'Negotiation is often imagined as a contest in which one side wins and the other accepts. In practice,\n' +
     'the most durable agreements are usually those in which both sides can explain to their own\n' +
     'colleagues why the deal was reasonable. If your counterpart cannot sell the agreement internally,\n' +
     'it will not survive its first test.\n' +
     'This is why preparation matters more than tactics. A negotiator who knows which of their interests\n' +
     'are essential and which are merely convenient has something valuable to trade: concessions that\n' +
     'cost little but matter a great deal to the other side. Delivery dates, payment terms, training,\n' +
     'and the length of a contract are classic examples. Money is visible, which is exactly why it is not\n' +
     'always the real issue.\n' +
     'Listening is harder than speaking in these conversations, and silence is harder still. Skilled\n' +
     'negotiators use silence after an offer, because the first person to fill it often reveals more than\n' +
     'they intended. They also separate the problem from the person: “this price does not work for our\n' +
     'budget” is easier to answer than “you are being unreasonable”.\n' +
     'None of this guarantees success. Sometimes the honest conclusion is that no agreement is better\n' +
     'than a bad one, and the ability to walk away politely — with the relationship intact — is itself a\n' +
     'form of power. Deals that were signed under pressure are usually renegotiated, delayed, or quietly\n' +
     'abandoned, and the cost of that is paid by everyone.',
  qs: [
    { q: 'Why are durable agreements usually mutual?', o: ['Because they are short', 'Because each side can justify the deal internally', 'Because lawyers write them', 'Because prices are fixed'], c: 1 },
    { q: 'What is more important than tactics?', o: ['Confidence', 'Preparation, knowing which interests are essential', 'Speaking loudly', 'A large budget'], c: 1 },
    { q: 'What kind of concessions are most valuable?', o: ['Expensive ones', 'Ones that cost little but matter to the other side', 'Ones about money only', 'None at all'], c: 1 },
    { q: 'Why do skilled negotiators use silence?', o: ['To show anger', 'Because the first to speak often reveals more than intended', 'To save time', 'Because they have nothing to say'], c: 1 },
    { q: 'What does the author say about walking away?', o: ['It destroys relationships', 'It is a form of power when done politely', 'It is always the right choice', 'It should never be considered'], c: 1 }
  ]
};

READING_BANK[49] = {
  t: 'Literary criticism has an unhappy reputation among readers who love books: it is often imagined as\n' +
     'the art of finding fault. In fact, criticism at its best is an act of attention. Its first question\n' +
     'is not “is this good?” but “how does this work?” — how a narrator is placed, why the author withholds\n' +
     'information on page forty, what a repeated image is doing in a novel that never explains it.\n' +
     'Two habits separate careful readers from careless ones. The first is quoting precisely. A claim\n' +
     'about a character is worth little until a sentence is produced to support it, read in its own\n' +
     'context rather than invented from memory. The second is distinguishing between the narrator and the\n' +
     'author. A novel told by an arrogant doctor does not automatically recommend arrogance; the gap\n' +
     'between what a narrator says and what the text shows is often where the meaning lives.\n' +
     'It is also worth remembering that a book is not obliged to share our values in order to be worth\n' +
     'reading. Asking what a nineteenth-century novel assumes about class or marriage is not an act of\n' +
     'hostility; it is a way of hearing the past more clearly. Condemning the novel instead of examining\n' +
     'it usually ends the conversation at the exact point where it becomes interesting.\n' +
     'Good criticism, then, is neither praise nor prosecution. It is the discipline of noticing, recorded\n' +
     'well enough for someone else to check. The critic’s greatest compliment to a book is to take it\n' +
     'seriously enough to disagree with it carefully.',
  qs: [
    { q: 'What is the first question of good criticism?', o: ['Is this good?', 'How does this work?', 'Who is the author?', 'Has it won a prize?'], c: 1 },
    { q: 'Why is quoting precisely important?', o: ['It makes the essay longer', 'A claim needs textual support read in context', 'It shows memory', 'Teachers require it'], c: 1 },
    { q: 'Why should the narrator and the author be distinguished?', o: ['They are always the same person', 'The meaning often lies in the gap between what a narrator says and what the text shows', 'Narrators are unreliable by law', 'To avoid quoting'], c: 1 },
    { q: 'What does the author say about a book’s values?', o: ['A book must share our values', 'A book can be worth reading without sharing them', 'Old books should be avoided', 'Only modern novels matter'], c: 1 },
    { q: 'How does the author define good criticism?', o: ['Praise or prosecution', 'The discipline of noticing, recorded well', 'Finding fault systematically', 'Summarising the plot'], c: 1 }
  ]
};

READING_BANK[50] = {
  t: 'Global problems are easy to describe and unusually difficult to solve, for a reason that has little\n' +
     'to do with knowledge. Climate change, migration and pandemics are what economists call collective\n' +
     'action problems: the cost of acting falls on the country that acts, while the benefit is shared by\n' +
     'everyone. A government that reduces emissions alone pays a visible price for an invisible gain.\n' +
     'This is not an argument for doing nothing. It is an argument for designing agreements that survive\n' +
     'domestic politics. Treaties that require every signatory to move at the same speed are fragile,\n' +
     'because no two economies can move at the same speed. More durable arrangements usually combine\n' +
     'three things: transparency, so that cheating is visible; graduated obligations, so that poorer\n' +
     'countries are not asked to carry the same burden as richer ones; and review, so that targets can be\n' +
     'corrected in public rather than quietly abandoned.\n' +
     'There is also a practical reason to be optimistic. The cost of clean technology has fallen faster\n' +
     'than almost any forecast predicted, which means that the political arithmetic has changed: what was\n' +
     'once a sacrifice is increasingly a cheaper option. Policies that were unthinkable fifteen years ago\n' +
     'are now described as sensible housekeeping.\n' +
     'What remains scarce is not technology or even money, but trust — the expectation that today’s\n' +
     'sacrifice will not be exploited tomorrow. Building that trust is slower than signing a declaration,\n' +
     'and it is the part of diplomacy that rarely appears in photographs.',
  qs: [
    { q: 'Why are global problems called collective action problems?', o: ['Because nobody understands them', 'Because one country pays the cost while everyone shares the benefit', 'Because they are always financial', 'Because scientists disagree'], c: 1 },
    { q: 'Why are treaties that demand identical speed from all signatories fragile?', o: ['They are too short', 'Economies differ and cannot move at the same pace', 'They cost too much to write', 'They are not legally binding'], c: 1 },
    { q: 'Which three elements make agreements more durable?', o: ['Silence, secrecy and speed', 'Transparency, graduated obligations and public review', 'Sanctions, tariffs and fines', 'A single global tax'], c: 1 },
    { q: 'Why is the author optimistic?', o: ['Because emissions have stopped rising', 'Because clean technology has become cheaper than expected', 'Because all countries agree', 'Because populations are falling'], c: 1 },
    { q: 'What does the author say is the scarcest resource?', o: ['Money', 'Technology', 'Trust', 'Land'], c: 2 }
  ]
};
