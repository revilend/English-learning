/* ==========================================================================
   English Zero-to-Hero — app logic
   50 lessons (A0 -> C1), 4 skills: Reading, Listening, Writing, Speaking
   ========================================================================== */

/* ------------------------------- LESSON DATA ------------------------------ */
var L = [
{id:1,lv:'A0',t:'Salomlashish va Tanishuv',
  v:[['Hello','Salom'],['Good morning','Xayrli tong'],['Goodbye','Xayr'],['Name','Ism'],['My name is','Mening ismim'],['I am','Men …man'],['You are','Siz …siz'],['Nice to meet you','Tanishganimdan xursandman'],['What is your name?','Ismingiz nima?'],['How are you?','Qandaysiz?'],['I am fine','Yaxshiman'],['Thank you','Rahmat'],['Please','Iltimos'],['Sorry','Kechirasiz'],['From','…dan'],['My friend','Mening do’stim'],['Teacher','O’qituvchi'],['Student','Talaba'],['Learn','O’rganmoq'],['Help','Yordam']],
  r:{t:'Alex: Hello! My name is Alex. | Sarah: Hi! I am Sarah. Nice to meet you. | Alex: Nice to meet you too! Are you from Tashkent? | Sarah: Yes, I am. And you?',q:'Sarahlardan kim Toshkentdan?',o:['Alex','Sarah','Tom','David'],c:1},
  ls:'Hello, my name is Alex. Nice to meet you.',w:'Salom! Mening ismim ...',ws:'Hello! My name is ...',sp:'Introduce yourself.',g:'Ism - Name | Salomlashish - Greetings | Rahmat - Thank you'},
{id:2,lv:'A0',t:'Raqamlar va Yosh',
  v:[['One','Bir'],['Two','Ikki'],['Three','Uch'],['Four','To’rt'],['Five','Besh'],['Six','Olti'],['Seven','Yetti'],['Eight','Sakkiz'],['Nine','To’qqiz'],['Ten','O’n'],['Twenty','Yigirma'],['Thirty','O’ttiz'],['Hundred','Yuz'],['Years old','Yoshda'],['Doctor','Shifokor'],['Old','Katta'],['Young','Yosh'],['First','Birinchi'],['Second','Ikkinchi'],['Number','Raqam'],['Age','Yosh'],['Birthday','Tug’ilgan kun']],
  r:{t:'Anna is twenty-five. She is a teacher. | Mark is thirty. He is an engineer.',q:'Anna necha yoshda?',o:['5','20','25','30'],c:2},
  ls:'I am twenty-five years old.',w:'Men 18 yoshdaman.',ws:'I am 18 years old.',sp:'Say your age and job.',g:'Raqamlar - Numbers | Yosh - Age'},
{id:3,lv:'A0',t:'Oila va Qarindoshlar',
  v:[['Father','Ota'],['Mother','Ona'],['Brother','Aka'],['Sister','Opa'],['Family','Oila'],['Grandfather','Katta ota'],['Grandmother','Katta ona'],['Son','O’g’il'],['Daughter','Qiz'],['Husband','Er'],['Wife','Xotin'],['Uncle','Amaki'],['Aunt','Xola'],['Cousin','Amakivachcha'],['Love','Sevmoq'],['Parents','Ota-onalar'],['Baby','Chaqaloq'],['Together','Birga'],['Home','Uy'],['Happy','Baxtli']],
  r:{t:'I have a big family. My father is a doctor. My mother is a teacher.',q:'Onasi nima qiladi?',o:['Doctor','Driver','Teacher','Engineer'],c:2},
  ls:'My father is a doctor.',w:'Mening otam shifokor.',ws:'My father is a doctor.',sp:'Talk about your family.',g:'Oila - Family | Ota - Father | Ona - Mother'},
{id:4,lv:'A1',t:'Kundalik Harakatlar',
  v:[['Wake up','Uyg’onmoq'],['Get up','Turmoq'],['Drink','Ichmoq'],['Eat','Yemoq'],['Go to work','Ishga bormoq'],['Sleep','Uxlamoq'],['Rest','Dam olmoq'],['Morning','Ertalab'],['Evening','Kechqurun'],['Night','Kechasi'],['Every day','Har kuni'],['Always','Doimo'],['Never','Hech qachon'],['Breakfast','Nonushta'],['Lunch','Tushlik'],['Dinner','Kechki ovqat'],['Coffee','Kofe'],['Tea','Choy'],['Read','O’qimoq'],['Write','Yozmoq'],['Study','O’qish'],['Work','Ish']],
  r:{t:'Every day, I wake up at 7. I drink coffee. I go to work.',q:'U ertalab nima ichadi?',o:['Tea','Juice','Milk','Coffee'],c:3},
  ls:'Every day I wake up at seven.',w:'Men har kuni ertalab uyg’onaman.',ws:'I wake up at 7 every morning.',sp:'Describe your morning.',g:'Uyg’onmoq - Wake up | Ichmoq - To drink'},
{id:5,lv:'A1',t:'Taom va Ichimlik',
  v:[['Water','Suv'],['Bread','Non'],['Apple','Olma'],['Rice','Guruch'],['Meat','Go’sht'],['Milk','Sut'],['Eggs','Tuxum'],['Fish','Baliq'],['Chicken','Tovuq'],['Vegetables','Sabzavot'],['Fruit','Meva'],['Sugar','Shakar'],['Salt','Tuz'],['I would like','…istayman'],['Waiter','Ofitsiant'],['Delicious','Mazali'],['Hungry','Och'],['Thirsty','Chanqagan'],['Menu','Menyu'],['Order','Buyurtma'],['Plate','Tarelka'],['Fork','Sanchqi'],['Knife','Pichoq'],['Spoon','Qoshiq'],['Cup','Chashka']],
  r:{t:'Waiter: What would you like? | Tom: Rice and chicken, please.',q:'Tom nima oldi?',o:['Juice','Rice and chicken','Coffee','Milk'],c:1},
  ls:'I would like water and bread, please.',w:'Men suv va non istayman.',ws:'I would like water and bread, please.',sp:'Order food.',g:'I would like - Men istayman | Mazali - Delicious'},
{id:6,lv:'A1',t:'Ranglar va Buyumlar',
  v:[['Red','Qizil'],['Blue','Ko’k'],['Green','Yashil'],['Yellow','Sariq'],['White','Oq'],['Black','Qora'],['Orange','To’q sariq'],['Purple','Binafsha'],['Pink','Pushti'],['Brown','Jigarrang'],['Beautiful','Chiroyli'],['Big','Katta'],['Small','Kichik'],['New','Yangi'],['Old','Eski'],['Cheap','Arzon'],['Expensive','Qimmat'],['Shirt','Ko’ylak'],['Pants','Shim'],['Shoes','Poyabzal'],['Bag','Sumka'],['Hat','Shapka'],['Dress','Ko’ylak']],
  r:{t:'Lisa: Look! This is a beautiful red dress. | Anna: I like green more.',q:'Lisa nima yoqtiradi?',o:['Green bag','Red dress','Blue shirt','Yellow hat'],c:1},
  ls:'This is a beautiful blue car.',w:'Bu chiroyli yashil daftar.',ws:'This is a beautiful green notebook.',sp:'Describe a colorful object.',g:'Ranglar - Colors | Chiroyli - Beautiful'},
{id:7,lv:'A1',t:'Vaqt va Kun',
  v:[['Morning','Ertalab'],['Afternoon','Kunduzi'],['Evening','Kechqurun'],['Night','Kechasi'],['Today','Bugun'],['Tomorrow','Ertaga'],['Yesterday','Kecha'],['Monday','Dushanba'],['Tuesday','Seshanba'],['Wednesday','Chorshanba'],['Thursday','Payshanba'],['Friday','Juma'],['Saturday','Shanba'],['Sunday','Yakshanba'],['Now','Hozir'],['Time','Vaqt'],['Clock','Soat'],['Hour','Soat'],['Minute','Daqiqa'],['Second','Sekund'],['Early','Erta'],['Late','Kech']],
  r:{t:'It is Monday morning. The time is 8 AM.',q:'U qachon boradi?',o:['Weekends','Monday morning','Sunday','Night'],c:1},
  ls:'What time is it? It is eight o clock.',w:'Hozir soat 9.',ws:'It is 9 AM.',sp:'Tell the time.',g:'Kunlar - Days | Vaqt - Time'},
{id:8,lv:'A1',t:'Sayohat va Joylar',
  v:[['Airport','Aeroport'],['Hotel','Mehmonxona'],['Beach','Plyaj'],['Station','Stansiya'],['Ticket','Chipta'],['Taxi','Taksi'],['Bus','Avtobus'],['Train','Poyezd'],['Where is?','Qayerda?'],['Near','Yaqin'],['Far','Uzoq'],['Here','Bu yerda'],['Left','Chap'],['Right','O’ng'],['Straight','To’g’ri'],['Excuse me','Kechirasiz'],['Map','Xarita'],['Passport','Pasport'],['Luggage','Yuk'],['Room','Xona'],['Travel','Sayohat qilmoq'],['Holiday','Ta’til']],
  r:{t:'Where is the hotel? It is near the beach.',q:'Mehmonxona qayerda?',o:['Airport','Beach','Station','City'],c:1},
  ls:'Where is the hotel?',w:'Mehmonxona plyaj yaqinida.',ws:'The hotel is near the beach.',sp:'Ask directions.',g:'Qayerda? - Where? | Yaqin - Near'},
{id:9,lv:'A1',t:'Do’kon va Xarid',
  v:[['Shop','Do’kon'],['How much?','Nechada?'],['Cheap','Arzon'],['Expensive','Qimmat'],['Money','Pul'],['Buy','Sotib olmoq'],['Price','Narx'],['Discount','Chegirma'],['Cash','Naqd'],['Card','Karta'],['Size','O’lcham'],['Color','Rang'],['Phone','Telefon'],['Sale','Chegirma'],['Receipt','Check'],['Want','Xohlamoq'],['Need','Kerak'],['Show','Ko’rsatmoq'],['Try','Sinamoq'],['Change','Almashtirmoq'],['Return','Qaytarmoq']],
  r:{t:'How much is this shirt? It is fifty thousand soum.',q:'Ko’ylak qancha turadi?',o:['30,000','50,000','20,000','100,000'],c:1},
  ls:'How much is this book?',w:'Bu kitob qancha turadi?',ws:'How much is this book?',sp:'Ask about prices.',g:'Nechada? - How much? | Narx - Price'},
{id:10,lv:'A1',t:'Ob-havo va Fasllar',
  v:[['Hot','Issiq'],['Cold','Sovuq'],['Rain','Yomg’ir'],['Snow','Qor'],['Wind','Shamol'],['Sun','Quyosh'],['Cloud','Bulut'],['Summer','Yoz'],['Winter','Qish'],['Spring','Bahor'],['Autumn','Kuz'],['Warm','Iliq'],['Cool','Salqin'],['Umbrella','Soyabon'],['Jacket','Kurtka'],['Sunny','Quyoshli'],['Cloudy','Bulutli'],['Windy','Shamolli'],['Weather','Ob-havo'],['Temperature','Harorat'],['Ice','Muz'],['Frost','Sovuq tushishi']],
  r:{t:'Today is very hot. The sun is shining.',q:'Bugun qanday?',o:['Sovuq','Issiq','Yomg’irli','Bulutli'],c:1},
  ls:'It is raining today.',w:'Bugun juda issiq.',ws:'Today is very hot.',sp:'Describe weather.',g:'Issiq - Hot | Sovuq - Cold | Yomg’ir - Rain'},
{id:11,lv:'A1',t:'Kasblar va Ish',
  v:[['Doctor','Shifokor'],['Teacher','O’qituvchi'],['Engineer','Muhandis'],['Nurse','Hamshira'],['Driver','Haydovchi'],['Cook','Oshpaz'],['Farmer','Dehqon'],['Worker','Ishchi'],['Boss','Rahbar'],['Hospital','Kasalxona'],['School','Maktab'],['Office','Idora'],['Job','Kasb'],['I work at','Men ishlayman'],['Want to be','Bo’lmoqchi'],['Bank','Bank'],['Factory','Zavod'],['Team','Jamoa'],['Busy','Band'],['Free','Erkin']],
  r:{t:'She works at a hospital. She is a nurse.',q:'Uning kasbi nima?',o:['Doctor','Teacher','Nurse','Driver'],c:2},
  ls:'I am a student.',w:'Men talabaman.',ws:'I am a student.',sp:'Talk about your job.',g:'Kasb - Job | Ish - Work | Haydovchi - Driver'},
{id:12,lv:'A2',t:'O’tgan zamon',
  v:[['Yesterday','Kecha'],['Last week','O’tgan hafta'],['Last month','O’tgan oy'],['Last year','O’tgan yil'],['Two days ago','Ikki kun oldin'],['Ago','…oldin'],['Went','Bordim'],['Saw','Ko’rdim'],['Visited','Tashrif buyurdim'],['Travelled','Sayohat qildim'],['Studied','O’qidim'],['Worked','Ishladim'],['Played','O’ynadim'],['Ate','Yedim'],['Drank','Ichdim'],['Slept','Uxladim'],['Wrote','Yozdim'],['Read','O’qidim'],['Met','Uchratdim'],['Finished','Tugatdim']],
  r:{t:'Last week I went to Tashkent. I visited my grandmother. I ate delicious plov.',q:'U nima qilgan?',o:['Toshkentga borgan','Uyda qolgan','Akasini ko’rgan','Televizor ko’rgan'],c:0},
  ls:'Last week I went to Tashkent.',w:'Men o’tgan hafta Toshkentga bordim.',ws:'I went to Tashkent last week.',sp:'Talk about what you did last week.',g:'O’tgan zamon - Past Simple | go / went'},
{id:13,lv:'A2',t:'Kelajak rejalari',
  v:[['Tomorrow','Ertaga'],['Next week','Keyingi hafta'],['Soon','Tezoq'],['Will','Kelajak fe’li'],['Going to','Rejalashtirmoq'],['Plan','Reja'],['Decide','Qaror qilmoq'],['Maybe','Balki'],['Perhaps','Ehtimol'],['Hope','Umid qilmoq'],['Promise','Va’da bermoq'],['Meeting','Uchrashuv'],['Arrive','Yetib kelmoq'],['Schedule','Jadval']],
  r:{t:'Next week I am going to visit my grandparents. | I will buy the tickets tomorrow. | We will stay there for three days.',q:'U chiptani qachon sotib oladi?',o:['Bugun','Ertaga','Keyingi hafta','Hech qachon'],c:1},
  ls:'I am going to travel next month.',w:'Men ertaga do’stim bilan uchrashaman.',ws:'I am going to meet my friend tomorrow.',sp:'Talk about your plans for next week.',g:'will + fe’l | be going to + fe’l (rejalar)'},
{id:14,lv:'A2',t:'Present Perfect',
  v:[['Already','Allaqachon'],['Just','Hozirgina'],['Yet','Hali'],['Ever','Hech bo’lsa'],['Never','Hech qachon'],['Since','…dan buyon'],['For','… davomida'],['Recently','Yaqinda'],['Lately','Keyingi paytda'],['Experience','Tajriba'],['Abroad','Chet elda'],['Twice','Ikki marta'],['So far','Hozirgacha'],['Achieve','Erishmoq']],
  r:{t:'I have already finished my homework. | She has never been to London. | We have lived here for five years.',q:'U Londonda bo’lganmi?',o:['Ha','Yo’q','Bir marta','Ikki marta'],c:1},
  ls:'I have just finished my work.',w:'Men bu kitobni allaqachon o’qib bo’ldim.',ws:'I have already read this book.',sp:'Talk about things you have already done.',g:'have/has + V3 | since / for'},
{id:15,lv:'A2',t:'Sifatlarni taqqoslash',
  v:[['Better','Yaxshiroq'],['Worse','Yomonroq'],['More','Ko’proq'],['Less','Kamroq'],['The best','Eng yaxshi'],['Than','…dan'],['As … as','…dek'],['Similar','O’xshash'],['Different','Boshqacha'],['Compare','Taqqoslamoq'],['Size','O’lcham'],['Weight','Vazn'],['Height','Balandlik'],['Cheaper','Arzonroq']],
  r:{t:'This car is faster than that one. | My phone is not as new as yours. | This is the best restaurant in town.',q:'Qaysi restoran eng yaxshi?',o:['Bu','O’sha','Shahardagi','Hech qaysi'],c:2},
  ls:'This book is more interesting than that one.',w:'Bu telefon o’sha telefondan qimmatroq.',ws:'This phone is more expensive than that one.',sp:'Compare two things you own.',g:'Comparative: -er / more | Superlative: the -est / the most'},
{id:16,lv:'A2',t:'Sog’liq va Tana',
  v:[['Head','Bosh'],['Eyes','Ko’zlar'],['Hand','Qo’l'],['Leg','Oyoq'],['Back','Orqa'],['Doctor','Shifokor'],['Medicine','Dori'],['Pain','Og’riq'],['Fever','Isitma'],['Cough','Yo’tal'],['Cold','Shamollash'],['Healthy','Sog’lom'],['Tired','Charchagan'],['Rest','Dam olmoq']],
  r:{t:'My head hurts and I have a fever. | The doctor told me to take medicine and rest. | You should drink water and sleep well.',q:'Shifokor nima qilishni aytdi?',o:['Ishlashni','Dori ichib dam olishni','Sport qilishni','Sayohatni'],c:1},
  ls:'I have a headache and a fever.',w:'Men o’zimni yomon his qilyapman.',ws:'I am feeling sick today.',sp:'Describe how you feel today.',g:'have a headache | should + fe’l (maslahat)'},
{id:17,lv:'A2',t:'Kiyim va Moda',
  v:[['Shirt','Ko’ylak'],['Trousers','Shim'],['Dress','Ko’ylak'],['Shoes','Oyoq kiyim'],['Jacket','Kurtka'],['Hat','Shapka'],['Scarf','Sharf'],['Size','O’lcham'],['Fit','To’g’ri kelmoq'],['Wear','Kiymoq'],['Try on','Kiyib ko’rmoq'],['Style','Uslub'],['Fashion','Moda'],['Comfortable','Qulay']],
  r:{t:'I want to buy a new jacket. | This shirt does not fit me. | Can I try on these shoes?',q:'U nima sotib olmoqchi?',o:['Shim','Kurtka','Shapka','Ko’ylak'],c:1},
  ls:'Can I try on this jacket?',w:'Bu ko’ylak menga to’g’ri kelmayapti.',ws:'This shirt does not fit me.',sp:'Describe what you are wearing today.',g:'fit = o’lchamga mos | suit = uslubga mos'},
{id:18,lv:'A2',t:'Shahar va Transport',
  v:[['Bus','Avtobus'],['Metro','Metro'],['Taxi','Taksi'],['Train','Poyezd'],['Ticket','Chipta'],['Station','Bekat'],['Stop','To’xtash joyi'],['Direction','Yo’nalish'],['Crossing','Chorraha'],['Traffic','Tirbandlik'],['Driver','Haydovchi'],['Fare','Yo’l haqi'],['Crowded','Tirband'],['Nearby','Yaqin atrofda']],
  r:{t:'Take the metro to the city centre. | The bus stop is next to the bank. | The fare is three thousand soum.',q:'Metro qayerga boradi?',o:['Bozorga','Shahar markaziga','Aeroportga','Bekatga'],c:1},
  ls:'How do I get to the train station?',w:'Metro bekati qayerda?',ws:'Where is the metro station?',sp:'Ask for directions to a place in your city.',g:'How do I get to …? | Take the bus/metro'},
{id:19,lv:'A2',t:'Restoran va Ovqatlanish',
  v:[['Menu','Menyu'],['Order','Buyurtma bermoq'],['Waiter','Ofitsiant'],['Bill','Hisob'],['Starter','Birinchi taom'],['Main course','Asosiy taom'],['Dessert','Shirinlik'],['Napkin','Salfetka'],['Reserve','Band qilmoq'],['Fresh','Yangi'],['Spicy','Achchiq'],['Sweet','Shirin'],['Table','Stol'],['Tip','Choychaqa']],
  r:{t:'A table for two, please. | I would like the chicken soup as a starter. | Could we have the bill, please?',q:'Ular nechta odamga stol so’radi?',o:['Bir','Ikki','Uch','To’rt'],c:1},
  ls:'Could we have the bill, please?',w:'Men tovuq sho’rva buyurtma qilmoqchiman.',ws:'I would like to order chicken soup.',sp:'Order a meal in a restaurant.',g:'I would like … | Could we have …?'},
{id:20,lv:'A2',t:'Telefon va Internet',
  v:[['Call','Qo’ng’iroq'],['Message','Xabar'],['Send','Yubormoq'],['Receive','Qabul qilmoq'],['Charge','Quvvatlamoq'],['Battery','Batareya'],['Screen','Ekran'],['Password','Parol'],['Download','Yuklab olmoq'],['Upload','Yuklamoq'],['Website','Veb sayt'],['Email','Elektron pochta'],['Signal','Signal'],['Connect','Ulanmoq']],
  r:{t:'My phone battery is almost empty. | I sent you a message yesterday. | Please download the file and send it to me.',q:'Telefon batareyasi qanday?',o:['To’la','Deyarli bo’sh','Buzilgan','Yangi'],c:1},
  ls:'Please send me the file by email.',w:'Men sizga xabar yubordim.',ws:'I sent you a message.',sp:'Talk about how you use your phone.',g:'send / sent / sent | download / upload'},
{id:21,lv:'A2',t:'His-tuyg’ular va Fikrlar',
  v:[['Happy','Xursand'],['Sad','Xafa'],['Angry','Achchiqlangan'],['Nervous','Xavotirda'],['Excited','Hayajonlangan'],['Worried','Tashvishli'],['Proud','Faxr'],['Jealous','Rashk'],['Bored','Zerikkan'],['Interested','Qiziqqan'],['Surprised','Hayron'],['Lonely','Yolg’iz'],['Think','O’ylamoq'],['Feel','His qilmoq']],
  r:{t:'I felt nervous before the exam. | She was very proud of her son. | He looks worried about something.',q:'U imtihondan oldin qanday his qildi?',o:['Xursand','Xavotir','Zerikkan','Faxr'],c:1},
  ls:'I felt very nervous before the interview.',w:'Men natijadan juda xursand bo’ldim.',ws:'I was very happy with the result.',sp:'Describe a time you felt excited.',g:'be + sifat: I am happy | feel + sifat'},
{id:22,lv:'B1',t:'Modal fe’llar',
  v:[['Must','Shart'],['Should','Kerak'],['Might','Balki'],['Could','Mumkin'],['Have to','Majbur'],['Need to','Zarur'],['Ought to','Kerak'],['Allowed','Ruxsat berilgan'],['Forbidden','Taqiqlangan'],['Advice','Maslahat'],['Obligation','Majburiyat'],['Permission','Ruxsat'],['Ability','Qobiliyat'],['Polite','Odobli']],
  r:{t:'You must wear a helmet on a motorbike. | You should see a doctor if the pain continues. | Passengers may not smoke on board.',q:'Mototsiklda nima qilish shart?',o:['Tez yurish','Shlem kiyish','Musiqa eshitish','Telefon qilish'],c:1},
  ls:'You should see a doctor as soon as possible.',w:'Siz ko’proq dam olishingiz kerak.',ws:'You should rest more.',sp:'Give advice to a friend who is tired.',g:'must / should / may / might + fe’l'},
{id:23,lv:'B1',t:'Shart gaplar',
  v:[['If','Agar'],['Unless','Agar …masa'],['Condition','Shart'],['Result','Natija'],['Would','…ar edi'],['Would have','…gan bo’lardi'],['Imaginary','Xayoliy'],['Possible','Mumkin'],['Likely','Ehtimoliy'],['Otherwise','Aks holda'],['Depend','Bog’liq bo’lmoq'],['Chance','Imkoniyat'],['Regret','Afsuslanmoq'],['Luck','Omad']],
  r:{t:'If it rains tomorrow, we will stay at home. | If I had more time, I would learn the guitar. | If I had studied harder, I would have passed the exam.',q:'Yomg’ir yog’sa nima qilishadi?',o:['Sayohat qilishadi','Uyda qolishadi','Ishlashadi','Cho’milishadi'],c:1},
  ls:'If I had more free time, I would travel more.',w:'Agar vaqtim bo’lsa, sizga yordam beraman.',ws:'If I have time, I will help you.',sp:'Talk about a wish you have.',g:'Zero / First / Second / Third conditional'},
{id:24,lv:'B1',t:'Passiv ovoz',
  v:[['Built','Qurilgan'],['Written','Yozilgan'],['Sold','Sotilgan'],['Invented','Ixtiro qilingan'],['Discovered','Kashf qilingan'],['Designed','Loyihalashtirilgan'],['Produced','Ishlab chiqarilgan'],['Held','O’tkazilgan'],['Founded','Asos solingan'],['Damaged','Shikastlangan'],['Repaired','Ta’mirlangan'],['Delivered','Yetkazilgan'],['Completed','Yakunlangan'],['Made','Yasalgan']],
  r:{t:'The bridge was built in 1998. | English is spoken all over the world. | The letters will be delivered tomorrow.',q:'Ko’prik qachon qurilgan?',o:['1898','1988','1998','2008'],c:2},
  ls:'The meeting will be held next Monday.',w:'Bu uy 2010-yilda qurilgan.',ws:'This house was built in 2010.',sp:'Describe how a product is made.',g:'be + V3: is/are/was/were/will be + V3'},
{id:25,lv:'B1',t:'Ish va Karyera',
  v:[['Apply','Ariza topshirmoq'],['Interview','Suhbat'],['CV','Rezyume'],['Salary','Maosh'],['Promotion','Lavozim ko’tarilishi'],['Experience','Tajriba'],['Skill','Ko’nikma'],['Deadline','Muddat'],['Colleague','Hamkasb'],['Boss','Rahbar'],['Contract','Shartnoma'],['Resign','Ishdan bo’shamoq'],['Retire','Nafaqaga chiqmoq'],['Achieve','Erishmoq']],
  r:{t:'I applied for a new job last month. | The interview went well and they offered me the position. | The salary is better than my current one.',q:'Suhbat qanday o’tdi?',o:['Yomon','Yaxshi','O’tkazilmadi','Kechiktirildi'],c:1},
  ls:'I have five years of experience in marketing.',w:'Men yangi ishga ariza topshirdim.',ws:'I applied for a new job.',sp:'Talk about your job or your dream job.',g:'apply for a job | work as a teacher | be responsible for'},
{id:26,lv:'B1',t:'Ta’lim va Universitet',
  v:[['Degree','Diplom'],['Lecture','Ma’ruza'],['Seminar','Seminar'],['Assignment','Topshiriq'],['Research','Tadqiqot'],['Thesis','Dissertatsiya'],['Scholarship','Stipendiya'],['Tuition','O’qish to’lovi'],['Graduate','Bitirmoq'],['Enrol','Ro’yxatdan o’tmoq'],['Attend','Qatnashmoq'],['Grade','Baho'],['Knowledge','Bilim'],['Skill','Ko’nikma']],
  r:{t:'She is studying for a degree in economics. | The lecture starts at nine and lasts two hours. | He received a scholarship for his research.',q:'U nima bo’yicha o’qiydi?',o:['Tibbiyot','Iqtisod','Huquq','Tarix'],c:1},
  ls:'He received a scholarship for his research project.',w:'Men universitetda o’qishni xohlayman.',ws:'I want to study at university.',sp:'Talk about your studies.',g:'study for a degree | attend a lecture'},
{id:27,lv:'B1',t:'Ekologiya va Atrof-muhit',
  v:[['Environment','Atrof-muhit'],['Pollution','Ifloslanish'],['Climate','Iqlim'],['Recycle','Qayta ishlamoq'],['Waste','Chiqindi'],['Energy','Energiya'],['Solar','Quyosh'],['Protect','Himoya qilmoq'],['Renewable','Qayta tiklanuvchi'],['Damage','Zarar'],['Species','Turlar'],['Extinct','Qirilib ketgan'],['Aware','Xabardor'],['Reduce','Kamaytirmoq']],
  r:{t:'Air pollution is a serious problem in big cities. | We should recycle plastic and glass. | Renewable energy can reduce the damage to the environment.',q:'Katta shaharlarda qanday muammo bor?',o:['Suv','Havo ifloslanishi','Shovqin','Yorug’lik'],c:1},
  ls:'We should recycle plastic and glass to protect nature.',w:'Atrof-muhitni himoya qilishimiz kerak.',ws:'We must protect the environment.',sp:'Give three tips to protect the environment.',g:'should / must + fe’l | environment, pollution, recycle'},
{id:28,lv:'B1',t:'Texnologiya va Kelajak',
  v:[['Device','Qurilma'],['Data','Ma’lumot'],['Software','Dastur'],['Update','Yangilash'],['Artificial intelligence','Sun’iy intellekt'],['Robot','Robot'],['Improve','Yaxshilamoq'],['Digital','Raqamli'],['Network','Tarmoq'],['Security','Xavfsizlik'],['Store','Saqlash'],['Generate','Yaratmoq'],['Efficient','Samarali'],['Convenient','Qulay']],
  r:{t:'Artificial intelligence is changing many industries. | Software updates often improve security and speed. | In the future, robots may do most dangerous work.',q:'Dasturiy yangilanishlar nima uchun kerak?',o:['Rang uchun','Xavfsizlik va tezlik uchun','Narx uchun','Hajm uchun'],c:1},
  ls:'Software updates improve security and speed.',w:'Sun’iy intellekt kelajakda katta rol o’ynaydi.',ws:'Artificial intelligence will play a big role in the future.',sp:'Talk about a technology you cannot live without.',g:'will + fe’l | may + fe’l (ehtimol)'},
{id:29,lv:'B1',t:'Madaniyat va An’analar',
  v:[['Culture','Madaniyat'],['Tradition','An’ana'],['Custom','Urf-odat'],['Festival','Bayram'],['Ceremony','Marosim'],['Wedding','To’y'],['Celebrate','Nishonlamoq'],['Generation','Avlod'],['Respect','Hurmat'],['Heritage','Meros'],['National','Milliy'],['Costume','Libos'],['Guest','Mehmon'],['Hospitality','Mehmonnavozlik']],
  r:{t:'Navruz is an important traditional festival in Uzbekistan. | Families celebrate it with sumalak and spring flowers. | Guests are always treated with great respect.',q:'Navruz nima bilan nishonlanadi?',o:['Sumalak va gullar bilan','Sovg’alar bilan','Shamlar bilan','Otlar bilan'],c:0},
  ls:'Navruz is celebrated with sumalak and spring flowers.',w:'To’yda mehmonlar hurmat qilinadi.',ws:'Guests are treated with great respect at weddings.',sp:'Describe a tradition in your country.',g:'be + V3 (passive) | national holidays'},
{id:30,lv:'B1',t:'Sayohat va Tajriba',
  v:[['Journey','Sayohat'],['Destination','Manzil'],['Departure','Jo’nash'],['Arrival','Kelish'],['Delay','Kechikish'],['Book','Band qilmoq'],['Accommodation','Turar joy'],['Sightseeing','Diqqatga sazovor joylar'],['Souvenir','Sovg’a'],['Local','Mahalliy'],['Passport','Pasport'],['Customs','Bojxona'],['Adventure','Sarguzasht'],['Trip','Safar']],
  r:{t:'We booked a hotel near the old town. | Our flight was delayed by two hours. | The local food was delicious and the people were friendly.',q:'Parvoz qancha kechikdi?',o:['Bir soat','Ikki soat','Uch soat','Kechikmadi'],c:1},
  ls:'Our flight was delayed by two hours.',w:'Biz mehmonxonani oldindan band qildik.',ws:'We booked the hotel in advance.',sp:'Talk about your best trip.',g:'be delayed by | book in advance'},
{id:31,lv:'B1',t:'Munozara va Fikr bildirish',
  v:[['Opinion','Fikr'],['Agree','Qo’shilmoq'],['Disagree','Qo’shilmaslik'],['Argument','Dalil'],['Point','Nuqta'],['However','Biroq'],['Therefore','Shuning uchun'],['Moreover','Bundan tashqari'],['Reason','Sabab'],['Evidence','Dalil'],['Suggest','Taklif qilmoq'],['Convince','Ishontirmoq'],['Discuss','Muhokama qilmoq'],['Conclusion','Xulosa']],
  r:{t:'In my opinion, learning languages is important. | However, it requires time and patience. | Therefore, we should practise a little every day.',q:'Muallifning fikriga ko’ra, nima kerak?',o:['Ko’p pul','Har kuni mashq','Bir yil dam','Talant'],c:1},
  ls:'In my opinion, learning languages is very important.',w:'Menimcha, bu fikr to’g’ri.',ws:'In my opinion, this idea is right.',sp:'Give your opinion about online learning.',g:'In my opinion … | However … | Therefore …'},
{id:32,lv:'B2',t:'Nisbiy gaplar (Relative Clauses)',
  v:[['Who','Kim'],['Which','Qaysi'],['That','…ki'],['Whose','Kimning'],['Where','Qayerda'],['Whom','Kimni'],['Defining','Aniqlovchi'],['Non-defining','Aniqlovchi bo’lmagan'],['Relative clause','Nisbiy gap'],['Antecedent','Oldingi so’z'],['Combine','Birlashtirmoq'],['Modify','Aniqlash'],['Clause','Gap'],['Pronoun','Olmosh']],
  r:{t:'The man who lives next door is a doctor. | This is the book which changed my life. | My brother, who works in Berlin, is visiting us.',q:'Kim Berlinda ishlaydi?',o:['Qo’shni','Aka','Ota','Do’st'],c:1},
  ls:'The book which changed my life was a gift.',w:'Men yangi ko’chib kelgan qo’shnini bilaman.',ws:'I know the neighbour who just moved in.',sp:'Describe a person who influenced you.',g:'who (odam) | which (narsa) | whose (egalik) | that (aniqlovchi)'},
{id:33,lv:'B2',t:'O’zlashtirilgan gap (Reported Speech)',
  v:[['Said','Aytdi'],['Told','Aytdi'],['Asked','So’radi'],['Reported speech','O’zlashtirilgan gap'],['Direct speech','To’g’ridan-to’g’ri gap'],['Indirect speech','Bilvosita gap'],['Claimed','Da’vo qildi'],['Explained','Tushuntirdi'],['Admitted','Tan oldi'],['Promised','Va’da berdi'],['Reminded','Eslatdi'],['Warned','Ogohlantirdi'],['According to','…ga ko’ra'],['Mentioned','Eslatib o’tdi']],
  r:{t:'He said that he was tired. | She told me she would call later. | They asked if I had finished the report.',q:'U nima deb aytdi?',o:['Charchaganini','Xursandligini','Kasal ekanini','Band ekanini'],c:0},
  ls:'She told me she would call me later.',w:'U mendan yordam so’radi.',ws:'He asked me to help him.',sp:'Report a conversation you had yesterday.',g:'said (that) … | told + shaxs | asked if …'},
{id:34,lv:'B2',t:'Gerund va Infinitive',
  v:[['Enjoy','Yoqtirmoq'],['Avoid','Qochmoq'],['Suggest','Taklif qilmoq'],['Mind','Qarshi bo’lmaslik'],['Decide','Qaror qilmoq'],['Hope','Umid qilmoq'],['Agree','Rozi bo’lmoq'],['Refuse','Rad etmoq'],['Manage','Uddalamoq'],['Pretend','O’zini … qilib ko’rsatmoq'],['Recommend','Tavsiya qilmoq'],['Expect','Kutmoq'],['Practise','Mashq qilmoq'],['Promise','Va’da bermoq']],
  r:{t:'I enjoy reading before bed. | She decided to change her career. | They suggested going to the cinema instead.',q:'U yotishdan oldin nima qilishni yoqtiradi?',o:['Yugurish','O’qish','Musiqa tinglash','Suzish'],c:1},
  ls:'I enjoy reading before I go to bed.',w:'Men chet tillarini o’rganishni yoqtiraman.',ws:'I enjoy learning foreign languages.',sp:'Talk about a hobby you enjoy.',g:'enjoy/avoid/suggest + Ving | decide/hope/agree + to + V'},
{id:35,lv:'B2',t:'Frazal fe’llar',
  v:[['Give up','Voz kechmoq'],['Look after','Qaramoq'],['Find out','Bilib olmoq'],['Put off','Kechiktirmoq'],['Carry on','Davom etmoq'],['Turn down','Rad etmoq'],['Bring up','Tarbiyalamoq'],['Come across','Tasodifan uchratmoq'],['Get along','Yaxshi munosabatda bo’lmoq'],['Run out of','Tugab qolmoq'],['Take up','Boshlamoq'],['Figure out','Tushunib olmoq'],['Look forward to','Intizor bo’lmoq'],['Break down','Buzilib qolmoq']],
  r:{t:'He gave up smoking two years ago. | I am looking forward to meeting you. | We ran out of time and had to put off the meeting.',q:'U ikki yil oldin nima qildi?',o:['Chekishni tashladi','Ishga kirdi','Sayohat qildi','Uylandi'],c:0},
  ls:'I am looking forward to meeting you next week.',w:'Men sizni uchratishga intizorman.',ws:'I am looking forward to seeing you.',sp:'Use a phrasal verb to describe your weekend.',g:'give up / look after / put off / run out of'},
{id:36,lv:'B2',t:'Biznes va Moliya',
  v:[['Investment','Investitsiya'],['Profit','Foyda'],['Loss','Zarar'],['Revenue','Daromad'],['Budget','Budjet'],['Loan','Kredit'],['Interest','Foiz'],['Shareholder','Aksiyador'],['Merge','Qo’shilish'],['Negotiate','Muzokara qilmoq'],['Forecast','Bashorat'],['Growth','O’sish'],['Expense','Xarajat'],['Market','Bozor']],
  r:{t:'The company reported a profit of two million dollars. | We need to reduce expenses and increase revenue. | The budget forecast looks positive for next quarter.',q:'Kompaniya qancha foyda ko’rsatdi?',o:['Bir million','Ikki million','Uch million','Foyda yo’q'],c:1},
  ls:'We need to reduce expenses and increase revenue.',w:'Kompaniya budjetni kamaytirdi.',ws:'The company reduced its budget.',sp:'Talk about a business idea you have.',g:'make a profit | cut costs | break even'},
{id:37,lv:'B2',t:'Sog’liq va Tibbiyot',
  v:[['Symptom','Belgi'],['Treatment','Davolash'],['Prescription','Retsept'],['Surgery','Jarrohlik'],['Diagnosis','Tashxis'],['Infection','Infeksiya'],['Vaccine','Em'],['Immunity','Immunitet'],['Nutrition','Ovqatlanish'],['Recovery','Tiklanish'],['Chronic','Surunkali'],['Prevention','Profilaktika'],['Patient','Bemor'],['Cure','Davolamoq']],
  r:{t:'The patient complained of a sharp pain in his chest. | The doctor prescribed antibiotics and recommended rest. | Prevention is always better than treatment.',q:'Shifokor nima yozib berdi?',o:['Antibiotik','Vitamin','Sham','Dori emas'],c:0},
  ls:'Prevention is always better than treatment.',w:'Bemor ikki hafta dam oldi.',ws:'The patient rested for two weeks.',sp:'Explain how to stay healthy.',g:'prescribe medicine | suffer from … | recover from …'},
{id:38,lv:'B2',t:'OAV va Jurnalistika',
  v:[['Headline','Sarlavha'],['Article','Maqola'],['Journalist','Jurnalist'],['Interview','Intervyu'],['Source','Manba'],['Report','Reportaj'],['Broadcast','Translyatsiya'],['Coverage','Yoritish'],['Bias','Tarafkashlik'],['Objective','Xolis'],['Editor','Muharrir'],['Publish','Nashr etmoq'],['Audience','Tomoshabinlar'],['Circulation','Tarqatish']],
  r:{t:'The journalist interviewed several witnesses. | The headline was published before the facts were confirmed. | Readers should check the source of every article.',q:'Jurnalist nima qildi?',o:['Maqola yozdi','Guvohlar bilan suhbatlashdi','Kitob chiqardi','Film suratga oldi'],c:1},
  ls:'Readers should always check the source of an article.',w:'Maqola gazetada chop etildi.',ws:'The article was published in the newspaper.',sp:'Talk about the media you trust.',g:'be published | according to the source'},
{id:39,lv:'B2',t:'Ilm-fan va Tadqiqot',
  v:[['Research','Tadqiqot'],['Experiment','Tajriba'],['Hypothesis','Gipoteza'],['Theory','Nazariya'],['Evidence','Dalil'],['Analysis','Tahlil'],['Data','Ma’lumotlar'],['Result','Natija'],['Conclusion','Xulosa'],['Discovery','Kashfiyot'],['Observation','Kuzatish'],['Method','Usul'],['Sample','Namuna'],['Significant','Ahamiyatli']],
  r:{t:'The researchers tested their hypothesis in a controlled experiment. | The results supported the original theory. | Further research is needed before we can draw a conclusion.',q:'Natijalar nima qildi?',o:['Nazariyani rad etdi','Nazariyani tasdiqladi','Xato topdi','To’xtatildi'],c:1},
  ls:'The results supported the original theory.',w:'Tadqiqot natijalari ijobiy bo’ldi.',ws:'The research results were positive.',sp:'Describe a scientific discovery you find interesting.',g:'conduct research | draw a conclusion | based on data'},
{id:40,lv:'B2',t:'Jamiyat va Shahar hayoti',
  v:[['Community','Jamiyat'],['Neighbourhood','Mahalla'],['Citizen','Fuqaro'],['Public transport','Jamoat transporti'],['Infrastructure','Infratuzilma'],['Poverty','Qashshoqlik'],['Equality','Tenglik'],['Population','Aholi'],['Facilities','Qulayliklar'],['Crime','Jinoyat'],['Safety','Xavfsizlik'],['Volunteer','Ko’ngilli'],['Homeless','Uysiz'],['Improve','Yaxshilash']],
  r:{t:'The city has invested in public transport and green spaces. | However, many neighbourhoods still lack basic facilities. | Local communities can help by volunteering.',q:'Shahar nimaga investitsiya qildi?',o:['Zavodlarga','Transport va yashil maydonlarga','Banklarga','Turizmga'],c:1},
  ls:'The city has invested in public transport and green spaces.',w:'Mahallamizda yangi bog’ qurildi.',ws:'A new park was built in our neighbourhood.',sp:'Describe a problem in your city and suggest a solution.',g:'invest in | lack of | however'},
{id:41,lv:'B2',t:'Idiomatik iboralar',
  v:[['Break the ice','Muzni yormoq'],['Once in a blue moon','Juda kamdan-kam'],['Piece of cake','Oson ish'],['Hit the books','Kitob o’qishga kirishmoq'],['Under the weather','Betob'],['On the same page','Bir fikrda'],['Cost an arm and a leg','Juda qimmat'],['Keep an eye on','Ko’z-quloq bo’lmoq'],['Let the cat out of the bag','Sirni ochmoq'],['Call it a day','Bugunlik to’xtash'],['Get cold feet','Qo’rqib qolmoq'],['In hot water','Muammoda'],['Better late than never','Kech bo’lsa ham yaxshi'],['Cut corners','Qisqartirmoq']],
  r:{t:'The exam was a piece of cake for her because she had studied hard. | He was under the weather, so he called it a day. | That car costs an arm and a leg.',q:'Nega imtihon oson bo’ldi?',o:['Omad','Qattiq o’qiganligi uchun','Oson savollar','Yordam olgan'],c:1},
  ls:'The exam was a piece of cake for her.',w:'Bu ish juda oson.',ws:'This task is a piece of cake.',sp:'Use one idiom in a sentence about your day.',g:'Idioms are fixed expressions | learn them as a whole'},
{id:42,lv:'C1',t:'Inversiya (Inversion)',
  v:[['Rarely','Kamdan-kam'],['Seldom','Kamdan-kam'],['Hardly','Arang'],['No sooner','…shi bilanoq'],['Not only','Nafaqat'],['Little did','Bilmasdi'],['Under no circumstances','Hech qanday holatda'],['On no account','Hech qachon'],['Never before','Ilgari hech qachon'],['Scarcely','Zo’rg’a'],['Barely','Arang'],['Such was','Shunday edi'],['Only when','Faqat qachonki'],['Inversion','Teskari tartib']],
  r:{t:'Never have I seen such a beautiful landscape. | Not only did she finish the project, but she also helped her team. | Rarely do we get such an opportunity.',q:'U loyihani tugatgandan keyin nima qildi?',o:['Uyga ketdi','Jamoasiga yordam berdi','Dam oldi','Yangisini boshladi'],c:1},
  ls:'Never have I seen such a beautiful landscape.',w:'Men bunday narsani hech qachon ko’rmaganman.',ws:'Never have I seen anything like this.',sp:'Emphasise a rare experience using inversion.',g:'Negative adverb + auxiliary + subject + verb'},
{id:43,lv:'C1',t:'Subjunctive va Wish',
  v:[['I wish','Istardim'],['If only','Qani edi'],['Were I','Agar men …bo’lsam'],['Demand','Talab qilmoq'],['Insist','Qat’iy turib olmoq'],['Recommend','Tavsiya qilmoq'],['It is essential','Zarur'],['If necessary','Kerak bo’lsa'],['Required','Talab qilinadi'],['Hypothetical','Faraziy'],['Contrary','Aksincha'],['Unreal','Haqiqiy bo’lmagan'],['Regret','Afsus'],['Urge','Undamoq']],
  r:{t:'I wish I had more free time. | If only I had listened to your advice. | The manager insisted that everyone be present at the meeting.',q:'Muallif nima istaydi?',o:['Ko’proq ish','Ko’proq bo’sh vaqt','Yangi telefon','Sayohat'],c:1},
  ls:'If only I had listened to your advice.',w:'Agar imkonim bo’lsa, chet elda o’qirdim.',ws:'If I had the chance, I would study abroad.',sp:'Express a wish about the past with wish / if only.',g:'wish + past simple | if only + past perfect | insist that + base verb'},
{id:44,lv:'C1',t:'Cleft Sentences (Ta’kidli gaplar)',
  v:[['It was … who','Aynan … edi'],['What I mean is','Men nima demoqchiman'],['The reason is','Sabab shundaki'],['The thing is','Gap shundaki'],['What matters is','Muhimi shundaki'],['What happened','Nima bo’ldi'],['The problem is','Muammo shundaki'],['The truth is','Haqiqat shundaki'],['The fact is','Fakt shundaki'],['Emphasis','Ta’kid'],['Focus','Diqqat'],['Highlight','Ajratib ko’rsatish'],['Stress','Urg’u'],['All I want','Men faqat …istayman']],
  r:{t:'It was Ali who broke the window. | What I need is more time to prepare. | The reason I am late is the heavy traffic.',q:'Derazani kim sindirdi?',o:['Tom','Ali','John','David'],c:1},
  ls:'It was Ali who broke the window.',w:'Menga kerak bo’lgan narsa - vaqt.',ws:'What I need is more time.',sp:'Emphasise the main reason for your success.',g:'It is/was … who/that | What … is …'},
{id:45,lv:'C1',t:'Advanced Passive',
  v:[['It is said that','Aytilishicha'],['It is believed that','Ishoniladi'],['It is reported that','Xabar qilinadi'],['It is estimated that','Taxmin qilinadi'],['It is rumoured that','Mish-mish bo’yicha'],['It is claimed that','Da’vo qilinadi'],['It is assumed that','Taxmin qilinadi'],['Allegedly','Da’vo qilinishicha'],['Supposedly','Taxminan'],['Widely considered','Keng hisoblanadi'],['Be held','O’tkazilmoq'],['Be regarded','Hisoblanmoq'],['Be expected','Kutilmoq'],['Be required','Talab qilinmoq']],
  r:{t:'It is said that English is the global language of business. | The report is believed to have been written last year. | He is widely regarded as the best player in the league.',q:'Hisobot qachon yozilgan deb hisoblanadi?',o:['Bu yil','O’tgan yil','Ikki yil oldin','Noma’lum'],c:1},
  ls:'It is said that English is the global language of business.',w:'Aytilishicha, u chet elda ishlagan.',ws:'It is said that he worked abroad.',sp:'Report a widely believed fact using passive structures.',g:'It is said/believed/reported that … | be believed to have + V3'},
{id:46,lv:'C1',t:'Academic Writing',
  v:[['Furthermore','Bundan tashqari'],['Nevertheless','Shunga qaramay'],['Consequently','Natijada'],['In contrast','Aksincha'],['Substantial','Muhim'],['Approach','Yondashuv'],['Framework','Doira'],['Implication','Natija'],['Significant','Ahamiyatli'],['Analyse','Tahlil qilmoq'],['Demonstrate','Ko’rsatmoq'],['Argue','Dalillamoq'],['Cite','Iqtibos keltirmoq'],['Conclude','Xulosa qilmoq']],
  r:{t:'Furthermore, the data suggests a strong link between the two variables. | Nevertheless, the sample size was too small to draw firm conclusions. | Consequently, further research is recommended.',q:'Nega aniq xulosa chiqarib bo’lmadi?',o:['Ma’lumot yo’q','Namuna juda kichik','Vaqt oz','Xato bor'],c:1},
  ls:'Consequently, further research is strongly recommended.',w:'Bundan tashqari, natijalar muhim.',ws:'Furthermore, the results are significant.',sp:'Summarise an argument using linking words.',g:'Academic linkers: furthermore, nevertheless, consequently'},
{id:47,lv:'C1',t:'Public Speaking va Ritorika',
  v:[['Audience','Tinglovchilar'],['Persuade','Ishontirmoq'],['Structure','Tuzilma'],['Introduction','Kirish'],['Conclusion','Xulosa'],['Demonstrate','Namoyish etmoq'],['Engage','Jalb qilmoq'],['Confidence','Ishonch'],['Pause','To’xtam'],['Emphasis','Ta’kid'],['Gesture','Ishora'],['Credibility','Ishonchlilik'],['Clarity','Aniqlik'],['Rapport','Aloqa o’rnatish']],
  r:{t:'A strong introduction captures the attention of the audience. | Speakers often use pauses and emphasis to highlight key points. | Credibility is built through evidence and confidence.',q:'Ishonchlilik nima orqali quriladi?',o:['Hazil orqali','Dalil va ishonch orqali','Ovoz balandligi orqali','Kiyim orqali'],c:1},
  ls:'A strong introduction captures the attention of the audience.',w:'Nutqni aniq va qisqa qiling.',ws:'Keep your speech clear and concise.',sp:'Deliver a one-minute introduction about yourself.',g:'Signposting: firstly, secondly, in conclusion'},
{id:48,lv:'C1',t:'Biznes va Muzokaralar',
  v:[['Negotiate','Muzokara qilmoq'],['Compromise','Murosaga kelmoq'],['Proposal','Taklif'],['Counter-offer','Qarshi taklif'],['Agreement','Kelishuv'],['Terms','Shartlar'],['Concession','Chegara'],['Leverage','Ta’sir kuchi'],['Deadline','Muddat'],['Counterparty','Qarshi tomon'],['Mutual','O’zaro'],['Feasible','Amalga oshirish mumkin'],['Walk away','Kelishuvdan voz kechmoq'],['Commitment','Majburiyat']],
  r:{t:'Both sides made concessions to reach an agreement. | We proposed a two-year contract with a flexible payment plan. | If the terms are not feasible, we may walk away from the deal.',q:'Kelishuvga erishish uchun nima qilindi?',o:['Shartlar qiyinlashdi','Ikki tomon chegara qildi','Muzokara to’xtadi','Narx oshdi'],c:1},
  ls:'Both sides made concessions to reach an agreement.',w:'Biz yangi shartnoma taklif qildik.',ws:'We proposed a new contract.',sp:'Negotiate a price with a partner.',g:'reach an agreement | make a concession | on condition that'},
{id:49,lv:'C1',t:'Adabiyot va Tanqid',
  v:[['Novel','Roman'],['Plot','Syujet'],['Character','Qahramon'],['Theme','Mavzu'],['Narrative','Bayon'],['Metaphor','Metafora'],['Symbol','Ramz'],['Protagonist','Bosh qahramon'],['Irony','Istehzo'],['Conflict','To’qnashuv'],['Symbolism','Ramziylik'],['Review','Taqriz'],['Interpretation','Talqin'],['Perspective','Nuqtai nazar']],
  r:{t:'The novel explores themes of identity and belonging. | The author uses vivid metaphors to describe the inner conflict. | Critics have offered different interpretations of the ambiguous ending.',q:'Roman qanday mavzularni o’rganadi?',o:['Urush va tinchlik','Kimlik va mansublik','Pul va hokimiyat','Fan va din'],c:1},
  ls:'The author uses vivid metaphors to describe the inner conflict.',w:'Kitob mening nuqtai nazarimni o’zgartirdi.',ws:'The book changed my perspective.',sp:'Review a book or film you liked.',g:'explore a theme | use a metaphor | from a different perspective'},
{id:50,lv:'C1',t:'Global Issues va Siyosat',
  v:[['Globalisation','Globallashuv'],['Inequality','Tengsizlik'],['Climate change','Iqlim o’zgarishi'],['Migration','Migratsiya'],['Human rights','Inson huquqlari'],['Policy','Siyosat'],['Diplomacy','Diplomatiya'],['Sanction','Sanksiya'],['Sustainability','Barqarorlik'],['Refugee','Qochqin'],['Poverty','Qashshoqlik'],['Aid','Yordam'],['Treaty','Shartnoma'],['Negotiation','Muzokara']],
  r:{t:'Globalisation has connected economies but widened inequality in some regions. | Climate change requires coordinated international policy. | Migration and human rights remain central topics in diplomacy.',q:'Globallashuv nimaga olib keldi?',o:['Tenglikka','Iqtisodlarni bog’ladi va tengsizlikni kengaytirdi','Urushga','Barqarorlikka'],c:1},
  ls:'Climate change requires coordinated international policy.',w:'Iqlim o’zgarishi global muammodir.',ws:'Climate change is a global problem.',sp:'Discuss a global issue that concerns you.',g:'Advanced language: requires, remains, has widened'}
];

/* Word bank for flashcards + search */
var WORDS = [
['hello','salom'],['good morning','xayrli tong'],['thank you','rahmat'],['please','iltimos'],['sorry','kechirasiz'],
['yes','ha'],['no','yo’q'],['water','suv'],['bread','non'],['apple','olma'],['name','ism'],['student','talaba'],
['teacher','o’qituvchi'],['book','kitob'],['pen','ruchka'],['table','stol'],['chair','stul'],['door','eshik'],
['window','deraza'],['house','uy'],['cat','mushuk'],['dog','it'],['friend','do’st'],['family','oila'],['school','maktab'],
['work','ish'],['money','pul'],['time','vaqt'],['day','kun'],['night','kecha'],['food','ovqat'],['drink','ichimlik'],
['eat','yemoq'],['sleep','uxlamoq'],['go','bormoq'],['come','kelmoq'],['say','aytmoq'],['read','o’qimoq'],
['write','yozmoq'],['speak','gapirmoq'],['listen','eshitmoq'],['learn','o’rganmoq'],['study','o’qish'],
['play','o’ynamoq'],['help','yordam'],['need','kerak'],['want','xohlamoq'],['like','yoqtirmoq'],['love','sevmoq'],
['happy','xursand'],['sad','xafa'],['good','yaxshi'],['bad','yomon'],['big','katta'],['small','kichik'],
['new','yangi'],['old','eski'],['hot','issiq'],['cold','sovuq'],['rain','yomg’ir'],['sun','quyosh'],
['snow','qor'],['wind','shamol'],['red','qizil'],['blue','ko’k'],['green','yashil'],['yellow','sariq'],
['black','qora'],['white','oq'],['one','bir'],['two','ikki'],['three','uch'],['four','to’rt'],['five','besh'],
['six','olti'],['seven','yetti'],['eight','sakkiz'],['nine','to’qqiz'],['ten','o’n'],['twenty','yigirma'],
['money','pul'],['price','narx'],['cheap','arzon'],['expensive','qimmat'],['shop','do’kon'],['market','bozor'],
['travel','sayohat'],['hotel','mehmonxona'],['airport','aeroport'],['ticket','chipta'],['train','poyezd'],
['doctor','shifokor'],['nurse','hamshira'],['engineer','muhandis'],['driver','haydovchi'],['office','idora'],
['city','shahar'],['country','davlat'],['weather','ob-havo'],['summer','yoz'],['winter','qish'],['spring','bahor'],
['autumn','kuz'],['morning','ertalab'],['evening','kechqurun'],['today','bugun'],['tomorrow','ertaga'],
['yesterday','kecha'],['week','hafta'],['month','oy'],['year','yil'],['question','savol'],['answer','javob'],
['beautiful','chiroyli'],['important','muhim'],['different','boshqacha'],['interesting','qiziqarli'],
['delicious','mazali'],['difficult','qiyin'],['easy','oson'],['famous','mashhur'],['future','kelajak'],
['health','sog’liq'],['knowledge','bilim'],['experience','tajriba'],['opportunity','imkoniyat'],
['environment','atrof-muhit'],['government','hukumat'],['communication','muloqot'],['development','rivojlanish']
];

/* --- Derived: vocabulary list of numbers/letters used across the app --- */
var LEVELS = ['A0','A1','A2','B1','B2','C1'];

/* =============================== NAVIGATION ============================== */
var pages = {};
var currentFilter = 'all';

function go(id) {
  if (!pages[id]) return;
  Object.keys(pages).forEach(function (k) {
    var show = k === id;
    pages[k].style.display = show ? 'block' : 'none';
    if (show) pages[k].classList.add('a'); else pages[k].classList.remove('a');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'p1') renderLessons(currentFilter);
  if (id === 'p3') { populateFCSelect(); fCard(); }
  if (id === 'p4') { updateProgressPage(); renderAchievements(); renderLeaderboard(); }
}

function fL(level, btn) {
  document.querySelectorAll('#lt .tab').forEach(function (t) { t.classList.remove('ac'); });
  if (btn) btn.classList.add('ac');
  currentFilter = level;
  renderLessons(level);
}

function badgeClass(lv) { return 'b-' + lv.toLowerCase(); }

function renderLessons(filter) {
  var box = document.getElementById('ll');
  if (!box) return;
  var list = (filter === 'all') ? L : L.filter(function (l) { return l.lv === filter; });
  if (!list.length) {
    box.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--tx2)">Bu darajada darslar hali tayyorlanmoqda.</div>';
    return;
  }
  var done = getCompleted();
  box.innerHTML = list.map(function (l) {
    return '<div class="cd card-hover" onclick="openLesson(' + l.id + ')">' +
      '<div style="display:flex;align-items:center;gap:12px">' +
        '<div style="font-size:1.9rem;flex-shrink:0">' + (done.indexOf(l.id) > -1 ? '✅' : '📘') + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<h3 style="font-size:1.02rem;margin-bottom:6px">' + l.id + '. ' + l.t + '</h3>' +
          '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
            '<span class="bg ' + badgeClass(l.lv) + '">' + l.lv + '</span>' +
            '<span style="color:var(--tx2);font-size:.75rem">📖 ' + l.v.length + ' so’z</span>' +
          '</div>' +
        '</div>' +
        '<i class="fa-solid fa-chevron-right" style="color:var(--tx2);font-size:.8rem"></i>' +
      '</div></div>';
  }).join('');
}

/* ============================== LESSON PAGE ============================== */
var activeLesson = 1;

function openLesson(id) {
  var l = L.filter(function (x) { return x.id === id; })[0];
  if (!l) return;
  activeLesson = id;
  localStorage.setItem('currentLesson', String(id));
  go('p5');
  renderLessonDetail(id);
}

function renderLessonDetail(id) {
  var box = document.getElementById('lc');
  var l = L.filter(function (x) { return x.id === id; })[0];
  if (!box || !l) return;
  var done = getCompleted().indexOf(id) > -1;
  var idx = L.indexOf(l);
  var prev = L[idx - 1], next = L[idx + 1];

  box.innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px">' +
      '<h2 class="pt" style="margin:0">Dars ' + l.id + '</h2>' +
      '<span class="bg ' + badgeClass(l.lv) + '">' + l.lv + '</span>' +
      (done ? '<span class="bg b-a1">✅ Tugatilgan</span>' : '') +
    '</div>' +
    '<p class="ps">' + l.t + '</p>' +

    '<div class="st2">📚 So’zlar</div>' +
    '<div class="vl">' + l.v.map(function (p) {
      return '<div class="vi" onclick="speakWord(this.dataset.w)" data-w="' + esc(p[0]) + '">' +
        '<b>' + p[0] + ' <i class="fa-solid fa-volume-high" style="font-size:.65rem"></i></b>' +
        '<span>' + p[1] + '</span></div>';
    }).join('') + '</div>' +

    '<div class="st2">📖 Reading</div>' +
    '<div class="gt">' + l.r.t.split('|').join('<br>') + '</div>' +
    '<div class="cd" style="cursor:default">' +
      '<div style="font-weight:700;margin-bottom:10px">' + l.r.q + '</div>' +
      '<div class="qos">' + l.r.o.map(function (o, i) {
        return '<div class="qo" onclick="answerQuiz(this,' + i + ',' + l.r.c + ')">' + o + '</div>';
      }).join('') + '</div>' +
      '<div id="quizFb" style="margin-top:10px"></div>' +
    '</div>' +

    '<div class="st2">🎧 Listening</div>' +
    '<div class="gt">' +
      '<button class="btn bp bs" onclick="speakWord(\'' + esc(l.ls) + '\')"><i class="fa-solid fa-play"></i> Tinglash</button>' +
      '<button class="btn bo bs" onclick="dictation(\'' + esc(l.ls) + '\')"><i class="fa-solid fa-keyboard"></i> Diktant</button>' +
      '<div style="margin-top:10px;color:var(--tx2);font-size:.85rem">Tinglang, so’ng diktantni yozing.</div>' +
      '<div id="dictBox" style="margin-top:10px"></div>' +
    '</div>' +

    '<div class="st2">✍️ Writing</div>' +
    '<div class="cd" style="cursor:default">' +
      '<p style="color:var(--tx2);font-size:.9rem;margin-bottom:10px">Tarjima qiling: <b style="color:var(--tx)">' + l.w + '</b></p>' +
      '<textarea class="inp" id="winput" rows="3" placeholder="Javobingizni inglizcha yozing..."></textarea>' +
      '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
        '<button class="btn bp" onclick="checkWriting(' + l.id + ')"><i class="fa-solid fa-check"></i> Tekshirish</button>' +
        '<button class="btn bo" onclick="showSample(' + l.id + ')"><i class="fa-solid fa-lightbulb"></i> Namuna</button>' +
      '</div>' +
      '<div id="wresult" style="margin-top:10px"></div>' +
    '</div>' +

    '<div class="st2">🗣 Speaking</div>' +
    '<div class="gt">' +
      '<p style="margin-bottom:10px">' + l.sp + '</p>' +
      '<button class="btn bp bs" onclick="speakWord(\'' + esc(l.ws) + '\')"><i class="fa-solid fa-volume-high"></i> Namunani eshitish</button>' +
      '<button class="btn bo bs" onclick="startSpeech()" id="micBtn"><i class="fa-solid fa-microphone"></i> Ovozimni aytish</button>' +
      '<div id="speechOut" style="margin-top:10px;color:var(--tx2);font-size:.85rem"></div>' +
    '</div>' +

    '<div class="st2">💡 Grammatika</div>' +
    '<div class="gt"><b>' + l.g + '</b></div>' +

    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px">' +
      (prev ? '<button class="btn bo" onclick="openLesson(' + prev.id + ')"><i class="fa-solid fa-arrow-left"></i> Oldingi dars</button>' : '') +
      (done
        ? '<button class="btn bp" onclick="' + (next ? 'openLesson(' + next.id + ')' : 'go(\'p4\')') + '">' +
            (next ? 'Keyingi dars <i class="fa-solid fa-arrow-right"></i>' : 'Yakunlash <i class="fa-solid fa-flag-checkered"></i>') + '</button>'
        : '<button class="btn bp" onclick="completeLesson(' + l.id + ')"><i class="fa-solid fa-check-double"></i> Darsni tugatish (+15 XP)</button>') +
    '</div>';

  var w = document.getElementById('winput');
  if (w) w.value = localStorage.getItem('writing_' + l.id) || '';
}

function esc(s) { return String(s).replace(/'/g, '’'); }

function answerQuiz(el, picked, correct) {
  var wrap = el.parentNode;
  Array.prototype.forEach.call(wrap.children, function (c, i) {
    c.classList.add('ds');
    if (i === correct) c.classList.add('ok');
  });
  if (picked !== correct) el.classList.add('no');
  var fb = document.getElementById('quizFb');
  if (fb) {
    fb.innerHTML = picked === correct
      ? '<span style="color:var(--ok);font-weight:700">✅ To’g’ri javob! +5 XP</span>'
      : '<span style="color:var(--err);font-weight:700">❌ Xato. To’g’ri javob yashil rangda.</span>';
  }
  addXP(5);
  markSkill(activeLesson, 'reading');
}

function dictation(sentence) {
  var box = document.getElementById('dictBox');
  if (!box) return;
  box.innerHTML = '<input class="inp" id="dictInp" placeholder="Eshitgan gapingizni yozing..." onkeydown="if(event.key===\'Enter\')checkDict(\'' + esc(sentence) + '\')">' +
    '<button class="btn bs bp" style="margin-top:8px" onclick="checkDict(\'' + esc(sentence) + '\')">Tekshirish</button>' +
    '<div id="dictFb" style="margin-top:8px"></div>';
}

function norm(s) {
  return String(s).toLowerCase().replace(/[.,!?;:’']/g, '').replace(/\s+/g, ' ').trim();
}

function checkDict(sentence) {
  var inp = document.getElementById('dictInp');
  var fb = document.getElementById('dictFb');
  if (!inp || !fb) return;
  var ok = norm(inp.value) === norm(sentence);
  fb.innerHTML = ok
    ? '<span style="color:var(--ok);font-weight:700">✅ Ajoyib! To’g’ri yozdingiz. +10 XP</span>'
    : '<span style="color:var(--err)">Yana urinib ko’ring. To’g’ri javob: <b>' + sentence + '</b></span>';
  if (ok) { addXP(10); markSkill(activeLesson, 'listening'); }
}

function showSample(id) {
  var l = L.filter(function (x) { return x.id === id; })[0];
  var box = document.getElementById('wresult');
  if (!l || !box) return;
  box.innerHTML = '<div class="gt">Namuna: <b>' + l.ws + '</b></div>';
}

function checkWriting(id) {
  var l = L.filter(function (x) { return x.id === id; })[0];
  var inp = document.getElementById('winput');
  var box = document.getElementById('wresult');
  if (!l || !inp || !box) return;
  var val = inp.value.trim();
  if (!val) { box.innerHTML = '<div class="gt" style="color:var(--err)">Iltimos, gap yozing.</div>'; return; }
  localStorage.setItem('writing_' + id, val);
  var target = norm(l.ws).split(' ').filter(function (w) { return w.length > 2; });
  var mine = norm(val).split(' ');
  var hits = target.filter(function (w) { return mine.indexOf(w) > -1; }).length;
  var score = target.length ? Math.round((hits / target.length) * 100) : 0;
  var nice = score >= 70;
  box.innerHTML =
    '<div class="gt">' +
      (nice ? '<b style="color:var(--ok)">✅ Juda yaxshi! O’xshashlik: ' + score + '%</b>'
            : '<b style="color:var(--acc)">✍️ Yaxshi urinish. O’xshashlik: ' + score + '%</b>') +
      '<div style="margin-top:6px;color:var(--tx2)">Namuna: <i>' + l.ws + '</i></div>' +
    '</div>';
  markSkill(id, 'writing');
  addXP(nice ? 10 : 5);
}

/* ============================== SPEAKING ================================= */
function startSpeech() {
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var out = document.getElementById('speechOut');
  var btn = document.getElementById('micBtn');
  if (!out) return;
  if (!SR) {
    out.textContent = 'Brauzeringiz ovozni tanimaydi. Namunani eshitib, ovoz chiqarib takrorlang.';
    return;
  }
  var rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = false;
  if (btn) btn.classList.add('recording');
  out.textContent = '🎙 Gapiring...';
  rec.onresult = function (e) {
    var said = e.results[0][0].transcript;
    out.innerHTML = 'Siz aytdingiz: <b>' + said + '</b>';
    addXP(5);
    markSkill(activeLesson, 'speaking');
  };
  rec.onerror = function () { out.textContent = 'Ovoz olinmadi. Qayta urinib ko’ring.'; };
  rec.onend = function () { if (btn) btn.classList.remove('recording'); };
  try { rec.start(); } catch (e) { if (btn) btn.classList.remove('recording'); }
}

function speakWord(text) {
  if (!text || !('speechSynthesis' in window)) return;
  var u = new SpeechSynthesisUtterance(String(text).split('|').join(' '));
  u.lang = 'en-US';
  u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/* ============================ PROGRESS / XP ============================== */
function getCompleted() {
  try { return JSON.parse(localStorage.getItem('completedLessons') || '[]'); } catch (e) { return []; }
}
function markSkill(lessonId, skill) {
  localStorage.setItem('skill_' + lessonId + '_' + skill, '1');
}
function addXP(n) {
  var xp = parseInt(localStorage.getItem('xp') || '0', 10) + n;
  localStorage.setItem('xp', String(xp));
  updateStats();
}
function levelFor(xp) {
  if (xp >= 1500) return 'C1';
  if (xp >= 1000) return 'B2';
  if (xp >= 600) return 'B1';
  if (xp >= 300) return 'A2';
  if (xp >= 100) return 'A1';
  return 'A0';
}
function completeLesson(id) {
  var done = getCompleted();
  if (done.indexOf(id) === -1) done.push(id);
  localStorage.setItem('completedLessons', JSON.stringify(done));
  ['reading', 'listening', 'writing', 'speaking'].forEach(function (s) { markSkill(id, s); });
  addXP(15);
  renderLessonDetail(id);
  updateStats();
}
function updateStats() {
  var xp = parseInt(localStorage.getItem('xp') || '0', 10);
  var completed = getCompleted().length;
  var streak = parseInt(localStorage.getItem('streak') || '0', 10);
  var lv = levelFor(xp);
  setText('sxp', xp); setText('ssk', streak); setText('sdn', completed + '/50');
  setText('slv', lv);
  setText('pxp', xp); setText('pdn', completed); setText('plv', lv); setText('psk', streak);
  var dot = document.getElementById('slv');
  if (dot) dot.className = 'bg ' + badgeClass(lv);
  updateProgressPage();
}
function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
function updateProgressPage() {
  var xp = parseInt(localStorage.getItem('xp') || '0', 10);
  var goal = 30, cur = xp % goal;
  var bar = document.getElementById('pxf');
  if (bar) bar.style.width = (cur / goal * 100) + '%';
  setText('pxt', cur + '/' + goal);
}

/* ============================ ACHIEVEMENTS =============================== */
function renderAchievements() {
  var box = document.getElementById('al');
  if (!box) return;
  var xp = parseInt(localStorage.getItem('xp') || '0', 10);
  var done = getCompleted().length;
  var streak = parseInt(localStorage.getItem('streak') || '0', 10);
  var all = [
    { on: xp >= 50,  ic: '🏅', nm: 'Birinchi qadam', ds: '50 XP to’plang' },
    { on: xp >= 200, ic: '⚡', nm: 'XP yig’uvchi', ds: '200 XP to’plang' },
    { on: xp >= 600, ic: '🚀', nm: 'Marafonchi', ds: '600 XP to’plang' },
    { on: done >= 5, ic: '📚', nm: 'O’quvchi', ds: '5 ta darsni tugating' },
    { on: done >= 15, ic: '🎓', nm: 'Bilimdon', ds: '15 ta darsni tugating' },
    { on: done >= 30, ic: '🏆', nm: 'Chempion', ds: '30 ta darsni tugating' },
    { on: streak >= 3, ic: '🔥', nm: 'Streak 3', ds: '3 kun ketma-ket kirish' },
    { on: streak >= 7, ic: '🌟', nm: 'Streak 7', ds: '7 kun ketma-ket kirish' }
  ];
  var got = all.filter(function (a) { return a.on; });
  box.innerHTML = all.map(function (a) {
    return '<div class="ach' + (a.on ? '' : ' lk') + '" style="' + (a.on ? '' : 'opacity:.55') + '">' +
      '<div class="ic">' + a.ic + '</div><div><div class="nm">' + a.nm + '</div><div class="ds">' + a.ds + '</div></div>' +
      (a.on ? '<i class="fa-solid fa-circle-check" style="margin-left:auto;color:var(--ok)"></i>' : '<i class="fa-solid fa-lock" style="margin-left:auto;color:var(--tx2)"></i>') +
      '</div>';
  }).join('');
  setText('achCount', got.length + '/' + all.length);
}

/* ============================ LEADERBOARD =============================== */
function renderLeaderboard() {
  var box = document.getElementById('lb');
  if (!box) return;
  var xp = parseInt(localStorage.getItem('xp') || '0', 10);
  var done = getCompleted().length;
  var you = { name: 'Siz', xp: xp, lessons: done, me: true };
  var bots = [
    { name: 'Aziza', xp: 780, lessons: 26 },
    { name: 'Bekzod', xp: 540, lessons: 19 },
    { name: 'Dilnoza', xp: 430, lessons: 15 },
    { name: 'Jasur', xp: 290, lessons: 10 },
    { name: 'Malika', xp: 160, lessons: 6 }
  ];
  var rows = bots.concat([you]).sort(function (a, b) { return b.xp - a.xp; });
  box.innerHTML = rows.map(function (r, i) {
    var medal = ['🥇', '🥈', '🥉'][i] || ('#' + (i + 1));
    return '<div class="vi" style="' + (r.me ? 'border-color:var(--pri);background:rgba(99,102,241,.1)' : '') + '">' +
      '<b>' + medal + ' ' + r.name + (r.me ? ' (siz)' : '') + '</b>' +
      '<span style="color:var(--tx2);font-size:.75rem">' + r.xp + ' XP · ' + r.lessons + '/50 dars</span>' +
      '</div>';
  }).join('');
}

/* ============================== LEVEL TEST =============================== */
var TQ = [
  { q: 'My name ___ Alex.', o: ['am', 'is', 'are', 'be'], c: 1, l: 'A0' },
  { q: 'She ___ from Tashkent.', o: ['am', 'is', 'are', 'do'], c: 1, l: 'A0' },
  { q: 'This is ___ book.', o: ['my', 'I', 'me', 'mine'], c: 0, l: 'A0' },
  { q: 'How ___ you?', o: ['is', 'are', 'am', 'do'], c: 1, l: 'A0' },
  { q: 'I ___ to school every day.', o: ['go', 'goes', 'going', 'went'], c: 0, l: 'A1' },
  { q: 'She ___ reading now.', o: ['is', 'are', 'am', 'be'], c: 0, l: 'A1' },
  { q: 'They ___ football yesterday.', o: ['play', 'plays', 'played', 'playing'], c: 2, l: 'A1' },
  { q: '___ you like coffee?', o: ['Are', 'Do', 'Is', 'Does'], c: 1, l: 'A1' },
  { q: 'There ___ a cat on the table.', o: ['is', 'are', 'am', 'be'], c: 0, l: 'A1' },
  { q: 'I have ___ apple.', o: ['a', 'an', 'the', 'one'], c: 1, l: 'A1' },
  { q: 'I ___ already finished my homework.', o: ['have', 'has', 'had', 'having'], c: 0, l: 'A2' },
  { q: 'She ___ to the cinema last night.', o: ['go', 'goes', 'went', 'going'], c: 2, l: 'A2' },
  { q: 'This book is ___ than that one.', o: ['good', 'better', 'best', 'well'], c: 1, l: 'A2' },
  { q: 'If it ___ tomorrow, we will stay home.', o: ['rains', 'rain', 'rained', 'raining'], c: 0, l: 'A2' },
  { q: 'She asked me ___ I was from.', o: ['what', 'where', 'who', 'how'], c: 1, l: 'A2' },
  { q: 'The report ___ by the team yesterday.', o: ['was completed', 'completed', 'completing', 'completes'], c: 0, l: 'B1' },
  { q: 'I wish I ___ more time.', o: ['have', 'has', 'had', 'having'], c: 2, l: 'B1' },
  { q: 'I am looking forward ___ you.', o: ['meet', 'to meet', 'meeting at', 'to meeting'], c: 3, l: 'B1' },
  { q: 'Never ___ I seen such a view.', o: ['have', 'has', 'did', 'was'], c: 0, l: 'C1' },
  { q: 'It is said ___ English is global.', o: ['which', 'that', 'what', 'who'], c: 1, l: 'C1' }
];
var testState = null;

function sT() { testState = { i: 0, score: 0 }; renderTest(); }
function renderTest() {
  var box = document.getElementById('tc');
  if (!box || !testState) return;
  var i = testState.i;
  if (i >= TQ.length) {
    var pct = Math.round(testState.score / TQ.length * 100);
    var lv = levelFor(pct * 15);
    addXP(testState.score * 5);
    box.innerHTML = '<div class="cd" style="text-align:center;padding:30px;cursor:default">' +
      '<div style="font-size:3rem;margin-bottom:8px">🎉</div>' +
      '<h3 style="margin-bottom:6px">Test tugadi!</h3>' +
      '<p style="font-size:1.15rem;color:var(--tx2);margin-bottom:8px">' + testState.score + ' / ' + TQ.length + ' to’g’ri (' + pct + '%)</p>' +
      '<p style="color:var(--ok);font-weight:700;margin-bottom:14px">Taxminiy daraja: ' + lv + '</p>' +
      '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn bp" onclick="sT()">Qayta ishlash</button>' +
        '<button class="btn bo" onclick="go(\'p1\')">Darslarga o’tish</button>' +
      '</div></div>';
    testState = null;
    return;
  }
  var q = TQ[i];
  box.innerHTML = '<div class="cd" style="cursor:default">' +
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
      '<span style="color:var(--tx2);font-size:.8rem">Savol ' + (i + 1) + ' / ' + TQ.length + '</span>' +
      '<span class="bg ' + badgeClass(q.l) + '">' + q.l + '</span>' +
      '<span style="margin-left:auto;color:var(--acc);font-size:.8rem">✅ ' + testState.score + '</span>' +
    '</div>' +
    '<p style="font-size:1.08rem;font-weight:600;margin-bottom:14px">' + q.q + '</p>' +
    '<div class="qos">' + q.o.map(function (o, k) {
      return '<div class="qo" onclick="pickTest(' + k + ')">' + String.fromCharCode(65 + k) + '. ' + o + '</div>';
    }).join('') + '</div></div>';
}
function pickTest(k) {
  if (!testState) return;
  var q = TQ[testState.i];
  if (k === q.c) testState.score++;
  testState.i++;
  setTimeout(renderTest, 220);
}

/* ============================== FLASHCARDS =============================== */
var fcWords = [], fcIdx = 0;
function buildAllWords() {
  return WORDS.map(function (p) { return { en: p[0], uz: p[1], ex: '' }; });
}
function populateFCSelect() {
  var sel = document.getElementById('fli');
  if (!sel) return;
  sel.innerHTML = '<option value="0">Darsni tanlang...</option>' + L.map(function (l) {
    return '<option value="' + l.id + '">' + l.id + '. ' + l.t + ' (' + l.lv + ')</option>';
  }).join('');
}
function setFS(mode, btn) {
  document.querySelectorAll('#ft .tab').forEach(function (t) { t.classList.remove('ac'); });
  if (btn) btn.classList.add('ac');
  var wrap = document.getElementById('fsl');
  if (wrap) wrap.style.display = (mode === 'l') ? 'block' : 'none';
  fcWords = (mode === 'l')
    ? wordsOfLesson(parseInt(localStorage.getItem('currentLesson') || '1', 10) || 1)
    : buildAllWords();
  fcIdx = 0;
  fCard();
}
function setFL(id) {
  fcWords = wordsOfLesson(parseInt(id, 10) || 1);
  fcIdx = 0;
  fCard();
}
function wordsOfLesson(id) {
  var l = L.filter(function (x) { return x.id === id; })[0];
  return l ? l.v.map(function (p) { return { en: p[0], uz: p[1], ex: '' }; }) : buildAllWords();
}
function fCard() {
  if (!fcWords.length) fcWords = buildAllWords();
  var fw = document.getElementById('fw'), fm = document.getElementById('fm'), fe = document.getElementById('fe'), fp = document.getElementById('fp');
  if (!fw) return;
  if (fcIdx >= fcWords.length) fcIdx = 0;
  if (fcIdx < 0) fcIdx = fcWords.length - 1;
  var c = fcWords[fcIdx];
  fw.textContent = c.en;
  if (fm) fm.textContent = c.uz;
  if (fe) fe.textContent = c.ex || '';
  if (fp) fp.textContent = (fcIdx + 1) + '/' + fcWords.length;
}
function mFc(d) { fcIdx += d; fCard(); }

/* ================================ SEARCH ================================= */
function doS() {
  var q = (document.getElementById('si').value || '').trim().toLowerCase();
  var box = document.getElementById('sr');
  if (!box) return;
  if (!q) { box.innerHTML = '<div style="color:var(--tx2);font-size:.85rem">So’z kiriting.</div>'; return; }
  var res = buildAllWords().filter(function (w) {
    return w.en.indexOf(q) > -1 || w.uz.indexOf(q) > -1;
  }).slice(0, 12);
  if (!res.length) { box.innerHTML = '<div style="color:var(--tx2);font-size:.85rem">Topilmadi.</div>'; return; }
  box.innerHTML = '<div class="vl">' + res.map(function (w) {
    return '<div class="vi" onclick="speakWord(this.dataset.w)" data-w="' + esc(w.en) + '"><b>' + w.en + '</b><span>' + w.uz + '</span></div>';
  }).join('') + '</div>';
}
function clS() {
  var si = document.getElementById('si'), sr = document.getElementById('sr');
  if (si) si.value = '';
  if (sr) sr.innerHTML = '';
}

/* ================================= CHAT ================================== */
function tChat() {
  var box = document.getElementById('cbox');
  if (!box) return;
  box.classList.toggle('op');
  if (box.classList.contains('op')) {
    var i = document.getElementById('cinp');
    if (i) setTimeout(function () { i.focus(); }, 120);
  }
}
function sMsg() {
  var inp = document.getElementById('cinp'), body = document.getElementById('cbody');
  if (!inp || !body) return;
  var text = inp.value.trim();
  if (!text) return;
  body.insertAdjacentHTML('beforeend', '<div class="msg u">' + text.replace(/</g, '&lt;') + '</div>');
  inp.value = '';
  body.scrollTop = body.scrollHeight;
  body.insertAdjacentHTML('beforeend', '<div class="msg b typing" id="typing"><span></span><span></span><span></span></div>');
  body.scrollTop = body.scrollHeight;
  var reply = aiReply(text);
  setTimeout(function () {
    var t = document.getElementById('typing');
    if (t) t.remove();
    body.insertAdjacentHTML('beforeend', '<div class="msg b">' + reply + '</div>');
    body.scrollTop = body.scrollHeight;
    addXP(5);
  }, 600);
}
function aiReply(text) {
  var t = text.toLowerCase();
  var w = todaysWord();
  if (/^(salom|assalom|hello|hi|hey)/.test(t)) {
    return 'Salom! 👋 <b>English Zero-to-Hero</b>ga xush kelibsiz. Kunlik so’z: <b>' + w.word + '</b> — ' + w.tr + '.';
  }
  if (t.indexOf('rahmat') > -1 || t.indexOf('thank') > -1) return 'Arzimaydi! 😊 Yana savolingiz bormi?';
  if (t.indexOf('tarjima') > -1 || t.indexOf('translate') > -1) return 'Tarjima uchun so’z yozing — masalan: <i>kitob</i> yoki <i>book</i>.';
  if (t.indexOf('grammatika') > -1 || t.indexOf('grammar') > -1) return 'Grammatika bo’yicha: Present Simple — odatdagi harakatlar, Present Continuous — hozir bo’layotgan harakat. Qaysi mavzuni batafsil tushuntiraman?';
  if (t.indexOf('?') > -1) return 'Yaxshi savol! 🤔 Bu savolga javob berish uchun darslardagi mos mavzuni o’qing. Kunlik so’z: <b>' + w.word + '</b> — ' + w.tr + '.';
  var words = text.split(/\s+/).filter(function (x) { return x.length > 1; }).length;
  return 'Yozganingiz uchun rahmat! 👏 (' + words + ' so’z). Mashq uchun: <b>' + w.word + '</b> — ' + w.tr + '.<br>Yangi so’z bilan gap tuzib ko’ring.';
}

/* ============================ WORD OF THE DAY ============================ */
function todaysWord() {
  var bank = [
    { word: 'Hello', tr: 'Salom', ex: 'Hello, how are you?' },
    { word: 'Good morning', tr: 'Xayrli tong', ex: 'Good morning, teacher!' },
    { word: 'Thank you', tr: 'Rahmat', ex: 'Thank you for your help.' },
    { word: 'Please', tr: 'Iltimos', ex: 'Can you please help me?' },
    { word: 'Sorry', tr: 'Kechirasiz', ex: 'Sorry, I am late.' },
    { word: 'Welcome', tr: 'Xush kelibsiz', ex: 'Welcome to our school!' },
    { word: 'Beautiful', tr: 'Chiroyli', ex: 'This flower is beautiful.' },
    { word: 'Important', tr: 'Muhim', ex: 'This is very important.' },
    { word: 'Experience', tr: 'Tajriba', ex: 'I have good experience.' },
    { word: 'Opportunity', tr: 'Imkoniyat', ex: 'This is a great opportunity.' },
    { word: 'Environment', tr: 'Atrof-muhit', ex: 'We must protect the environment.' },
    { word: 'Knowledge', tr: 'Bilim', ex: 'Knowledge is power.' }
  ];
  var d = new Date();
  var seed = d.getFullYear() * 1000 + d.getMonth() * 31 + d.getDate();
  return bank[seed % bank.length];
}
function setWordOfDay() {
  var w = todaysWord();
  var a = document.getElementById('ww'), b = document.getElementById('wt'), c = document.getElementById('we');
  if (a) a.textContent = w.word;
  if (b) b.textContent = w.tr;
  if (c) c.textContent = w.ex;
}

/* ================================ STREAK ================================= */
function updateStreak() {
  var today = new Date().toDateString();
  var last = localStorage.getItem('lastActive');
  var streak = parseInt(localStorage.getItem('streak') || '0', 10);
  if (last !== today) {
    var y = new Date(); y.setDate(y.getDate() - 1);
    streak = (last === y.toDateString()) ? streak + 1 : 1;
    localStorage.setItem('lastActive', today);
    localStorage.setItem('streak', String(streak));
  }
  if (streak < 1) { streak = 1; localStorage.setItem('streak', '1'); }
}

/* ================================= INIT ================================== */
function init() {
  pages = {};
  Array.prototype.forEach.call(document.querySelectorAll('.pg'), function (p) {
    pages[p.id] = p;
    p.style.display = 'none';
  });
  var first = document.getElementById('p0');
  if (first) { first.style.display = 'block'; first.classList.add('a'); }
  setWordOfDay();
  updateStreak();
  updateStats();
  renderLessons('all');
  populateFCSelect();
  fCard();
  renderAchievements();
  renderLeaderboard();
  var lv = localStorage.getItem('currentLesson');
  if (lv && document.getElementById('lc')) {
    var n = parseInt(lv, 10);
    if (n >= 1 && n <= 50) { /* stay on home, lesson opens on click */ }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
