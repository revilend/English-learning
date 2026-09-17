/* ==========================================================================
   Reading bank — 1–17-darslar (A0, A1, A2)
   Har darsda bir nechta savol. Daraja oshgani sari matn uzunroq bo‘ladi
   (o‘lchangan o‘rtacha uzunlik):
     A0 → ~60 so‘z, 2 savol   ·   A1 → ~90 so‘z, 3 savol   ·   A2 → ~115 so‘z, 3 savol
   Savollar A2 gacha o‘zbekcha, javoblar inglizcha (o‘qib tushunish mashqi).
   ========================================================================== */
var READING_BANK = READING_BANK || {};

READING_BANK[1] = {
  t: 'Hello! My name is Aziza. I am from Tashkent. This is my friend Ben. He is from London.\n' +
     'Ben says: “Good morning!” I say: “Good morning!” We are students. We are in the same class.\n' +
     'Our teacher is Miss Laylo. She says: “Nice to meet you, Ben.” Ben is happy. He likes his new school.',
  qs: [
    { q: 'Aziza qayerdan?', o: ['London', 'Tashkent', 'Samarqand', 'Buxoro'], c: 1 },
    { q: 'Ben kim?', o: ['O‘qituvchi', 'Azizaning do‘sti', 'Miss Laylo', 'Shifokor'], c: 1 }
  ]
};

READING_BANK[2] = {
  t: 'My name is Timur. I am twelve years old. I have a big family. My brother is twenty.\n' +
     'My sister is nine. My mother is thirty-eight and my father is forty. Our house number is fifteen.\n' +
     'We live on the second floor. My grandmother is seventy-two. She has three sons and two daughters.\n' +
     'Today is my birthday. I am very happy!',
  qs: [
    { q: 'Timur necha yoshda?', o: ['2', '9', '12', '20'], c: 2 },
    { q: 'Ularning uy raqami nechchi?', o: ['5', '12', '15', '50'], c: 2 }
  ]
};

READING_BANK[3] = {
  t: 'I have a small family. My father is a doctor. My mother is a teacher.\n' +
     'I have one brother and two sisters. My brother is a student. My sisters are young.\n' +
     'My grandmother lives with us. She is very kind. We have a cat. Its name is Puffy.\n' +
     'In the evening we drink tea together. We are a happy family.',
  qs: [
    { q: 'Uning akasi kim?', o: ['O‘qituvchi', 'Shifokor', 'Talaba', 'Haydovchi'], c: 2 },
    { q: 'Ularning uy hayvoni qanday?', o: ['dog', 'cat', 'bird', 'fish'], c: 1 }
  ]
};

READING_BANK[4] = {
  t: 'I usually wake up at six thirty. I get up and wash my face. Then I have breakfast with my family.\n' +
     'I drink tea and eat bread with honey. At seven fifteen I go to work by bus. I start work at eight.\n' +
     'I have lunch at twelve thirty in a small café near my office. I finish work at five.\n' +
     'In the evening I go shopping or study English for one hour. I have dinner with my family at seven.\n' +
     'I read a book and go to bed at eleven.',
  qs: [
    { q: 'U ertalab qachon turadi?', o: ['6:00', '6:30', '7:15', '8:00'], c: 1 },
    { q: 'U ishni qachon tugatadi?', o: ['12:30', '17:00', '19:00', '20:00'], c: 1 },
    { q: 'Kechqurun u nima qiladi?', o: ['Ishlaydi', 'Ingliz tilini o‘rganadi', 'Sayohat qiladi', 'Futbol o‘ynaydi'], c: 1 }
  ]
};

READING_BANK[5] = {
  t: 'On Saturday my family and I have lunch in a small restaurant. The waiter brings us a menu.\n' +
     'My father orders rice and chicken. My mother wants fish and vegetables. I would like a cup of tea and a piece of cake.\n' +
     'My little sister asks for milk and bread. The food is delicious. After lunch my father pays the bill.\n' +
     'The waiter says: “Thank you, come again!” We are not hungry, but we are thirsty, so we drink cold water at home.',
  qs: [
    { q: 'Otasi nima buyurtma qiladi?', o: ['Baliq', 'Guruch va tovuq', 'Kek', 'Sut'], c: 1 },
    { q: 'Kim sut so‘raydi?', o: ['Onasi', 'Singlisi', 'Ofitsiant', 'Otasi'], c: 1 },
    { q: 'Tushlikdan keyin ular nima qilishadi?', o: ['Uyda sovuq suv ichishadi', 'Yana ovqat buyurtma qilishadi', 'Kafega borishadi', 'Ovqat pishirishadi'], c: 0 }
  ]
};

READING_BANK[6] = {
  t: 'Zuhra has a small room. The walls are light blue and the door is white. She has a new red bag,\n' +
     'a green notebook and two yellow pens. Her bed is big and her desk is small and brown.\n' +
     'On the desk there is a photo of her family in a black frame. She likes bright colours,\n' +
     'but her mother prefers grey and white. Yesterday Zuhra bought a beautiful pink dress.\n' +
     'Today she is wearing a white shirt and blue jeans, because she goes to school.',
  qs: [
    { q: 'Zuhraning sumkasi qanday?', o: ['yangi va qizil', 'eski va qora', 'yashil', 'pushti'], c: 0 },
    { q: 'Bugun u nima kiygan?', o: ['Pushti ko‘ylak', 'Oq ko‘ylak va ko‘k jinsi', 'Sariq shim', 'Qora palto'], c: 1 },
    { q: 'Onasi qaysi ranglarni yoqtiradi?', o: ['Yorqin ranglarni', 'Kulrang va oqni', 'Qizil va sariqni', 'Faqat ko‘kni'], c: 1 }
  ]
};

READING_BANK[7] = {
  t: 'My week is busy. On Monday, Tuesday and Wednesday I study at the university.\n' +
     'My first lesson starts at eight thirty and finishes at eleven. On Thursday I work in a shop from two to six.\n' +
     'On Friday afternoon I visit my grandmother. Saturday is my free day: I clean my room in the morning,\n' +
     'and in the evening I meet my friends. On Sunday morning I sleep late. Today is Friday, so tomorrow I can rest.\n' +
     'It is ten past nine now, and my bus leaves in twenty minutes.',
  qs: [
    { q: 'Bugun qaysi kun?', o: ['Payshanba', 'Juma', 'Shanba', 'Dushanba'], c: 1 },
    { q: 'Universitetda birinchi dars qachon boshlanadi?', o: ['8:00', '8:30', '9:10', '11:00'], c: 1 },
    { q: 'Shanba kuni kechqurun u nima qiladi?', o: ['Uy tozalaydi', 'Do‘stlari bilan uchrashadi', 'Buvasiga boradi', 'Ishlaydi'], c: 1 }
  ]
};

READING_BANK[8] = {
  t: 'Last month Kamila travelled to Nukus. She went by plane from Tashkent. The airport was busy but clean.\n' +
     'In Nukus she stayed in a small hotel near the museum. Her room was on the third floor and it was quiet.\n' +
     'In the morning she visited the Savitsky Museum and saw many famous paintings.\n' +
     'In the afternoon she walked around the city and bought postcards for her friends. The weather was hot and sunny.\n' +
     'She came back home on Sunday and showed her photos to her family.',
  qs: [
    { q: 'U qanday sayohat qildi?', o: ['Poyezdda', 'Samolyotda', 'Avtobusda', 'Taksida'], c: 1 },
    { q: 'Uning mehmonxonasi qayerda edi?', o: ['Muzey yaqinida', 'Aeroportda', 'Bozorda', 'Bekatda'], c: 0 },
    { q: 'U do‘stlari uchun nima sotib oldi?', o: ['Rasm', 'Otkritka', 'Kitob', 'Kiyim'], c: 1 }
  ]
};

READING_BANK[9] = {
  t: 'Sardor needs a new shirt. He goes to a shop in the city centre. There are many shirts: white, blue and black.\n' +
     'He likes a blue shirt, but it is too expensive. The shop assistant shows him another one.\n' +
     'It costs eighty thousand soum and there is a small discount today. Sardor tries it on.\n' +
     'The size is right, so he buys it. He pays by card and takes the receipt. Then he buys a present for his sister:\n' +
     'a small yellow bag. He is tired but happy because he spent less than he planned.',
  qs: [
    { q: 'Sardor nima sotib oldi?', o: ['Qora ko‘ylak', 'Ko‘k ko‘ylak', 'Sariq sumka', 'Shim'], c: 1 },
    { q: 'Ko‘ylak qancha turdi?', o: ['50 000 so‘m', '80 000 so‘m', '100 000 so‘m', '20 000 so‘m'], c: 1 },
    { q: 'U qanday to‘ladi?', o: ['Naqd pul bilan', 'Karta bilan', 'Telefon orqali', 'Chek bilan'], c: 1 }
  ]
};

READING_BANK[10] = {
  t: 'In summer the weather in Tashkent is very hot. The temperature can be forty degrees.\n' +
     'People get up early and stay at home in the afternoon. They drink cold water and eat ice cream.\n' +
     'Autumn is different: it is warm in September, but in November it is cool and it often rains.\n' +
     'Winter is cold and sometimes it snows. Children like winter because they play in the snow.\n' +
     'Spring is my favourite season: the trees are green, the days are longer and the air is fresh.\n' +
     'In spring it is neither hot nor cold.',
  qs: [
    { q: 'Yozda Toshkentda ob-havo qanday?', o: ['Sovuq', 'Juda issiq', 'Yomg‘irli', 'Shamolli'], c: 1 },
    { q: 'Noyabrda ob-havo qanday?', o: ['Issiq', 'Salqin va yomg‘irli', 'Qorli', 'Quyoshli'], c: 1 },
    { q: 'Nega muallif bahorni yaxshi ko‘radi?', o: ['Qor yog‘adi', 'Kunlar uzun va havo toza', 'Juda issiq', 'Ta’til boshlanadi'], c: 1 }
  ]
};

READING_BANK[11] = {
  t: 'My name is Nilufar. I am a nurse. I work in a big hospital in Samarkand.\n' +
     'I start work at eight in the morning and finish at four. I help doctors and I talk to patients.\n' +
     'My job is difficult, but I like it because I help people. My brother Rustam is a driver.\n' +
     'He works for a small company and drives a bus. My sister is a student, but she also works in a café at the weekend.\n' +
     'My father is a farmer: he works on a farm outside the city. On Sundays our family has dinner together.',
  qs: [
    { q: 'Nilufar nima ish qiladi?', o: ['Haydovchi', 'Hamshira', 'Dehqon', 'O‘qituvchi'], c: 1 },
    { q: 'Rustam qayerda ishlaydi?', o: ['Kasalxonada', 'Kichik kompaniyada', 'Kafeda', 'Fermada'], c: 1 },
    { q: 'Nilufar o‘z ishi haqida nima deydi?', o: ['Oson va zerikarli', 'Qiyin, lekin yoqadi', 'Juda xavfli', 'Yaxshi to‘lanmaydi'], c: 1 }
  ]
};

READING_BANK[12] = {
  t: 'Last weekend was very busy for Aziz. On Saturday morning he woke up early because he had a lot of plans.\n' +
     'First he went to the market with his mother and they bought vegetables, fruit and fresh bread.\n' +
     'Then he cleaned his room and washed his car. In the afternoon his cousins came to visit them.\n' +
     'They played football in the yard and drank tea in the garden. Aziz’s cousin left his jacket in the car,\n' +
     'so Aziz called him in the evening. On Sunday Aziz did not go anywhere. He stayed at home, watched an old film\n' +
     'and prepared his lessons for Monday. He went to bed at ten because he was tired but happy.',
  qs: [
    { q: 'Shanba kuni ertalab Aziz nima qildi?', o: ['Uyga bordi', 'Bozorga bordi', 'Kino ko‘rdi', 'Futbol o‘ynadi'], c: 1 },
    { q: 'Kimlar tashrif buyurdi?', o: ['Do‘stlari', 'Amakivachchalari', 'Qo‘shnilari', 'O‘qituvchisi'], c: 1 },
    { q: 'Yakshanba kuni u nima qildi?', o: ['Sayohat qildi', 'Uyda qoldi va dars tayyorladi', 'Bozorga bordi', 'Ishga bordi'], c: 1 }
  ]
};

READING_BANK[13] = {
  t: 'Next month Dilnoza is going to take an important exam in English. She has a clear plan.\n' +
     'In June she is going to study grammar every evening for forty minutes.\n' +
     'In July she will watch English films with subtitles three times a week and she will write short texts\n' +
     'about her family and her city. In August her cousin from London is going to visit her,\n' +
     'so she will practise speaking with him. Her teacher says: “Your plan is good, but you must rest too.”\n' +
     'Dilnoza will also prepare a notebook with one hundred new words. She hopes she will get a high score.\n' +
     'If she passes the exam, her parents will buy her a bicycle.',
  qs: [
    { q: 'Dilnoza iyun oyida nima qilmoqchi?', o: ['Grammatika o‘rganmoqchi', 'Kino ko‘rmoqchi', 'Sayohat qilmoqchi', 'Kitob sotib olmoqchi'], c: 0 },
    { q: 'Avgustda kim keladi?', o: ['Onasi', 'Londonlik amakivachchasi', 'O‘qituvchisi', 'Qo‘shnisi'], c: 1 },
    { q: 'Imtihondan o‘tsa, ota-onasi nima qiladi?', o: ['Telefon oladi', 'Velosiped oladi', 'Sayohatga olib boradi', 'Kitob beradi'], c: 1 }
  ]
};

READING_BANK[14] = {
  t: 'Sardor has collected stamps since he was eight years old. He has already visited more than thirty countries —\n' +
     'but only in his album! He has never been abroad, but he has met many people online who also collect stamps.\n' +
     'He has just received a letter from Japan, and he has not opened it yet because he wants to open it with his father.\n' +
     'His collection has grown a lot this year: he has added stamps from Turkey, Egypt and Canada.\n' +
     'His younger sister has never liked stamps; she prefers postcards. Sardor has kept every letter\n' +
     'he has received since 2019 in a big box under his bed.',
  qs: [
    { q: 'Sardor marka yig‘ishni qachon boshladi?', o: ['2019-yilda', '8 yoshida', '30 yoshida', 'O‘tgan yili'], c: 1 },
    { q: 'U chet elda bo‘lganmi?', o: ['Ha, ko‘p marta', 'Yo‘q, hech qachon', 'Bir marta', 'Faqat Yaponiyada'], c: 1 },
    { q: 'Yaponiyadan kelgan xatni ochdimi?', o: ['Ha, ochdi', 'Yo‘q, hali ochmagan', 'Otasi ochib qo‘ydi', 'Yo‘qotib qo‘ydi'], c: 1 }
  ]
};

READING_BANK[15] = {
  t: 'My old phone was cheap, but it was very slow. Last week I bought a new one.\n' +
     'It is more expensive than the old phone, but it is much faster and the camera is better.\n' +
     'My friend’s phone is bigger and heavier, so it is not easy to hold it with one hand.\n' +
     'In our class, Malika has the most modern phone, but she says it is not the most useful:\n' +
     'she uses only two apps. My sister thinks the best phone is a simple one, because she does not like\n' +
     'complicated things. For me the most important thing is the battery: my phone works longer than my\n' +
     'friend’s phone, so I charge it only once a day.',
  qs: [
    { q: 'Nega yangi telefon yaxshiroq?', o: ['Arzonroq', 'Tezroq va kamerasi yaxshi', 'Kattaroq', 'Yengilroq'], c: 1 },
    { q: 'Do‘stining telefoni qanday?', o: ['Kichik va yengil', 'Kattaroq va og‘irroq', 'Eng zamonaviy', 'Eng arzon'], c: 1 },
    { q: 'Muallif uchun eng muhimi nima?', o: ['Narx', 'Batareya', 'Rang', 'Hajm'], c: 1 }
  ]
};

READING_BANK[16] = {
  t: 'Kamola did not feel well on Tuesday. She had a bad headache and a high fever, and her throat hurt.\n' +
     'In the morning she drank warm tea with lemon, but she did not get better. Her mother took her to the doctor.\n' +
     'The doctor asked her a few questions and examined her throat. He said it was a bad cold,\n' +
     'not a serious illness. He told her to take medicine twice a day, to drink a lot of water\n' +
     'and to sleep at least eight hours. Kamola stayed at home for three days. She did not go to school,\n' +
     'so her friend sent her the homework. On Saturday she felt much better.\n' +
     'Now she knows that rest is as important as medicine.',
  qs: [
    { q: 'Kamola nima bilan kasal bo‘ldi?', o: ['Bosh og‘rig‘i va isitma', 'Qorin og‘rig‘i', 'Tish og‘rig‘i', 'Qo‘l sinishi'], c: 0 },
    { q: 'Shifokor nima qilishni aytdi?', o: ['Operatsiya qilishni', 'Dori ichish, ko‘p suv ichish va uxlashni', 'Sport qilishni', 'Ishlashni'], c: 1 },
    { q: 'U necha kun uyda qoldi?', o: ['Bir kun', 'Ikki kun', 'Uch kun', 'Bir hafta'], c: 2 }
  ]
};

READING_BANK[17] = {
  t: 'In my city the weather changes quickly, so my wardrobe is different every season.\n' +
     'In winter I wear a warm coat, a scarf and boots. My coat is three years old, but it is comfortable\n' +
     'and it fits me well. In spring I wear a light jacket and trainers. I like bright colours,\n' +
     'so my spring jacket is green. In summer I wear cotton T-shirts, shorts and a hat,\n' +
     'because the sun is very strong. In autumn I need a raincoat and shoes that do not get wet.\n' +
     'Last week I tried on a beautiful grey suit in a shop, but it was too expensive and the size was too small.\n' +
     'I decided to wait for a sale.',
  qs: [
    { q: 'Qishda u nima kiyadi?', o: ['Yengil kurtka', 'Issiq palto va sharf', 'Shorts', 'Kostyum'], c: 1 },
    { q: 'Nega yozda shlyapa kiyadi?', o: ['Chiroyli bo‘lgani uchun', 'Quyosh juda kuchli bo‘lgani uchun', 'Yomg‘ir yog‘gani uchun', 'Sovuq bo‘lgani uchun'], c: 1 },
    { q: 'Kulrang kostyumni nega sotib olmadi?', o: ['O‘lchami kichik va narxi qimmat', 'Rangi yoqmadi', 'Do‘konda yo‘q edi', 'Sotuvchi bermadi'], c: 0 }
  ]
};
