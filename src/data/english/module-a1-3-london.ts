import type { ReadingText } from '@/types/dutch';

const M = 'a1-london' as const;
const MT = 'Lost in London';

export const moduleA1_3Texts: ReadingText[] = [
  {
    id: 'a1m3-1',
    title: 'One Weekend, One Phone',
    titleTranslation: 'Одни выходные, один телефон',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "I'm Dasha. I'm 21, and I'm from Minsk. My friend Sofia is 22, and she's a student in Lisbon. Now we're in London for the weekend! Sofia: 'London at the weekend! I love it!' Our hotel room is very small: two beds, a window, and that's all the furniture.\n\n" +
      "Sofia has got a pink list of places. There are ten on it: a museum, a park, a red bus… And on Sunday at four o'clock, we've got tickets for the theatre. Sofia's phone? It's in Lisbon, on her bed. 'No problem! Your phone has got a map.'\n\n" +
      "At night, I look at photos of London on my phone. All night. In the morning, Sofia is at the window with her list. 'Come on, Dasha! Open the map!'\n\n" +
      "But my phone is dead. It doesn't work. No map, no internet… And our theatre tickets? They're on the phone.",
    words: {
      friend: { english: 'друг / подруга' },
      list: { english: 'список' },
      places: { english: 'места (place — место)' },
      tickets: { english: 'билеты' },
      map: { english: 'карта (города)' },
    },
    expressions: {
      'at the weekend': { english: 'на выходных' },
    },
    grammarNote:
      "«London at the weekend!» — британцы говорят at the weekend (в Америке — on the weekend), хотя русское «на выходных» подсказывает on. А «на выходные» (на какой срок) — for the weekend: We're in London for the weekend. Сравните: on Sunday, at four o'clock.",
    comprehensionQuestions: [
      {
        question: "Where is Sofia's phone?",
        questionTranslation: 'Где телефон Софии?',
        options: ['In the hotel room', 'In Lisbon', 'At the theatre'],
        correctIndex: 1,
      },
      {
        question: "Why doesn't the phone work in the morning?",
        questionTranslation: 'Почему утром телефон Даши не работает?',
        options: ['Dasha looks at it all night.', 'Sofia has got it.', 'There is no internet in the hotel.'],
        correctIndex: 0,
      },
      {
        question: 'Why is the phone a problem for Sunday?',
        questionTranslation: 'Почему телефон — проблема для воскресенья?',
        options: ['The theatre is closed on Sunday.', 'Sofia has got no list.', 'The tickets for the theatre are on it.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-2',
    title: 'How Many Tickets?',
    titleTranslation: 'Сколько билетов?',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "There is a Tube station next to our hotel. Sofia loves the Tube! This morning, she wants to see the Science Museum. It's on her list. In the station, there is a map, and she looks at it. 'Look! The museum is here, and we're here. It's two stations!'\n\n" +
      "But where do we buy tickets? How much is a ticket? The station is very busy. People look at their phones, not at us. A man with a red umbrella looks at me. 'Excuse me, can I help?'\n\n" +
      "'How many tickets do you want?' 'Two, please.' 'Don't buy tickets. Pay by card here, and go in!' Sofia pays by card. 'Thank you!' But the man isn't there. Where is he?\n\n" +
      "On the Tube, we're happy. One station, two stations… six… nine. Sofia: 'Dasha, how many stations is it to the museum?' 'Two.' Now we're at Heathrow. Wrong Tube!",
    words: {
      station: { english: 'станция / вокзал' },
      buy: { english: 'покупать' },
      umbrella: { english: 'зонт' },
      go: { english: 'ехать / идти' },
    },
    expressions: {
      'the tube': { english: 'метро (в Лондоне)' },
      'how many': { english: 'сколько (для того, что можно посчитать)' },
    },
    grammarNote:
      "«How many tickets do you want?» и «How much is a ticket?» — по-русски в обоих случаях «сколько». В английском how many — для того, что считают штуками (tickets, stations), а how much — для цены и неисчисляемого (money, milk).",
    comprehensionQuestions: [
      {
        question: 'Where is the station?',
        questionTranslation: 'Где станция?',
        options: ['At the museum', 'In the park', 'Next to their hotel'],
        correctIndex: 2,
      },
      {
        question: "Why don't Dasha and Sofia buy tickets?",
        questionTranslation: 'Почему Даша и София не покупают билеты?',
        options: ['They have got no money.', 'The man thinks a card is a good idea.', 'The tickets are on the phone.'],
        correctIndex: 1,
      },
      {
        question: 'What is the problem on the Tube?',
        questionTranslation: 'Какая проблема в метро?',
        options: ['It is the wrong Tube for the museum.', 'There are no people.', 'The man with the umbrella is there.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-3',
    title: 'Turn Left, Turn Right',
    titleTranslation: 'Налево, направо',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "At twelve o'clock, we're at a new station. But where is the museum? There's no map here. My friend isn't nervous. 'No problem! People can help.'\n\n" +
      "'Excuse me, do you know the Science Museum?' A woman with a guitar: 'Go straight on, then turn left.' A man with a coffee: 'No, no! Turn right, then go straight on.' A waiter in a café: 'The museum? It's opposite the park. Turn left, then right.'\n\n" +
      "Three people. Who is right? We go left, then right, then left, then right. Sofia thinks it's funny. I don't.\n\n" +
      "At one o'clock, there it is: the museum! And opposite the museum, there's a man with a red umbrella. The man from the station? He looks at us. Now I'm nervous.",
    words: {
      turn: { english: 'поворачивать' },
      left: { english: 'налево; левый' },
      right: { english: 'направо; правый; прав (Who is right? — Кто прав?)' },
      then: { english: 'потом / затем' },
      opposite: { english: 'напротив' },
    },
    expressions: {
      'straight on': { english: 'прямо (о направлении)' },
    },
    grammarNote:
      "«Go straight on, then turn left» — повелительное наклонение в английском — это просто глагол без «ты» или «вы»: Turn! Go! По-русски есть «поверни» и «поверните», а в английском одна форма для всех; вежливость добавляет слово please.",
    comprehensionQuestions: [
      {
        question: "Why does Sofia think there is no problem?",
        questionTranslation: 'Почему София думает, что проблемы нет?',
        options: ['People here can help them.', 'She has got a map.', 'The museum is next to the station.'],
        correctIndex: 0,
      },
      {
        question: 'What is the problem with the help from the three people?',
        questionTranslation: 'Что не так с помощью трёх людей?',
        options: ['They are busy and don\'t help.', 'They think the museum is closed.', 'Every person has got a new idea: left, right…'],
        correctIndex: 2,
      },
      {
        question: 'Why is Dasha nervous at one o\'clock?',
        questionTranslation: 'Почему Даша нервничает в час дня?',
        options: ['The museum is closed.', 'The man from the station is there, and he looks at them.', 'Sofia is not with her.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-4',
    title: 'Rain at the Market',
    titleTranslation: 'Дождь на рынке',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Sofia loves the museum. The next place on her list is Borough Market. We go there on the Tube, and this time it's the right Tube! At the market, there are cakes, coffee, pizza and a lot of people.\n\n" +
      "Then the rain comes. London rain! We haven't got an umbrella. 'Umbrellas! Cheap umbrellas!' A man has got ten umbrellas. 'How much is an umbrella?' '£12.' 'Twelve? That's not cheap!' But Sofia buys two, and she pays by card.\n\n" +
      "Sofia: 'Does it rain every day in London?' The man: 'No, no. Not every day. At the weekend!'\n\n" +
      "Then Sofia looks at me. 'Dasha, where's my list?' We look for it, but it isn't there. And behind us, there is a man with a red umbrella. The man from the station! Is he a thief?",
    words: {
      market: { english: 'рынок' },
      rain: { english: 'дождь; идти (о дожде)' },
      cheap: { english: 'дешёвый' },
      behind: { english: 'позади / за' },
    },
    expressions: {
      'look for': { english: 'искать' },
    },
    grammarNote:
      "«Does it rain every day in London?» — по-русски «В Лондоне каждый день идёт дождь?»: вопрос только интонацией, а дождь «идёт». В английском нужен does в начале и формальное it: it rains — одно слово вместо «идёт дождь».",
    comprehensionQuestions: [
      {
        question: 'Why do they buy umbrellas?',
        questionTranslation: 'Почему они покупают зонты?',
        options: ['They are very cheap.', 'It rains, and they have got no umbrella.', 'Sofia loves red umbrellas.'],
        correctIndex: 1,
      },
      {
        question: 'How much is one umbrella, and what does Dasha think?',
        questionTranslation: 'Сколько стоит один зонт и что думает Даша?',
        options: ['£2: cheap!', '£12: cheap!', '£12: expensive!'],
        correctIndex: 2,
      },
      {
        question: 'What is the problem now?',
        questionTranslation: 'Какая проблема теперь?',
        options: ["Sofia hasn't got her list.", 'The man from the station has got their umbrellas.', 'The market is closed.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-5',
    title: 'Upstairs on the Red Bus',
    titleTranslation: 'На втором этаже красного автобуса',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "No list! But Sofia knows the next place: a red bus. There's a bus stop opposite the market. A number 15 bus comes, and we get on. 'Go upstairs, Dasha!'\n\n" +
      "We're upstairs, at the window. Down there, there are red buses, black taxis and people with cheap umbrellas. The rain is on the window, but Sofia is very happy.\n\n" +
      "Then I see it: Tower Bridge, with the river under it! It's on the list! 'Sofia! The bridge! Do we get off here?' 'Yes! Come on!' We get off at the next bus stop.\n\n" +
      "At the bus stop opposite, there's a man with a red umbrella. It's him! 'Excuse me! Excuse me!' And he has got a pink list. Then a bus comes, and he isn't there.",
    words: {
      upstairs: { english: 'наверху / наверх (на втором этаже)' },
      bridge: { english: 'мост' },
      river: { english: 'река' },
    },
    expressions: {
      'bus stop': { english: 'автобусная остановка' },
      'get on': { english: 'садиться (в автобус, поезд)' },
      'get off': { english: 'выходить (из автобуса, поезда)' },
    },
    grammarNote:
      "«We get off at the next bus stop» — get off = выходить из транспорта, get on = садиться. По-русски «выходим на остановке», а в английском остановка — это точка на маршруте, поэтому at: at the bus stop, at the station.",
    comprehensionQuestions: [
      {
        question: 'Where are Dasha and Sofia on the bus?',
        questionTranslation: 'Где Даша и София в автобусе?',
        options: ['Next to the bus stop', 'Opposite the market', 'Upstairs, next to a window'],
        correctIndex: 2,
      },
      {
        question: 'Why do they get off the bus?',
        questionTranslation: 'Почему они выходят из автобуса?',
        options: ['The bridge from the list is there.', 'It is the wrong bus.', 'The man with the umbrella is on the bus.'],
        correctIndex: 0,
      },
      {
        question: 'What has the man with the red umbrella got?',
        questionTranslation: 'Что у мужчины с красным зонтом?',
        options: ['Two tickets for the bus', 'A list, pink like Sofia’s', 'A map of London'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-6',
    title: 'Where Is Our Hotel?',
    titleTranslation: 'Где наш отель?',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "It's nine o'clock at night, and we're at the river. There's rain, we're tired, and the man with the umbrella isn't here. And where's our hotel? It's small… it's in the centre… its name is… I don't know!\n\n" +
      "But Sofia isn't nervous. 'Look, a police officer! Excuse me, can you help us? We're looking for our hotel.' 'What's its name?' 'We don't know.' 'What street is it in?' 'We don't know.' 'Is it near a station?' 'Yes! Near a Tube station!'\n\n" +
      "The police officer looks at us. 'How many hotels in London are near a Tube station? A thousand!'\n\n" +
      "Then Sofia has got an idea. 'The key!' In her jeans, there is a hotel key: HOTEL BELL, 12 MILL STREET. 'Mill Street? It's near here. Go straight on, then turn left.' At ten o'clock, we're at the hotel. And next to it? The man with the red umbrella.",
    words: {
      tired: { english: 'уставший: we\'re tired — мы устали' },
      street: { english: 'улица' },
      near: { english: 'рядом / недалеко от' },
      key: { english: 'ключ' },
    },
    expressions: {
      'police officer': { english: 'полицейский' },
    },
    grammarNote:
      "«What street is it in?» — по-русски «На какой улице?», предлог стоит в начале. В английском предлог часто уходит в конец вопроса, а с улицей британцы говорят in: in Mill Street, а не on, как подсказывает русское «на».",
    comprehensionQuestions: [
      {
        question: "Why can't they go to their hotel?",
        questionTranslation: 'Почему они не могут пойти в свой отель?',
        options: ["They don't know its name or its street.", 'The hotel is closed at night.', "The police officer doesn't help."],
        correctIndex: 0,
      },
      {
        question: "What is funny about 'near a Tube station'?",
        questionTranslation: 'Что смешного в ответе «рядом со станцией метро»?',
        options: ['There is no Tube in London.', 'Many hotels in London are near the Tube.', 'The hotel is opposite the police.'],
        correctIndex: 1,
      },
      {
        question: 'What helps them?',
        questionTranslation: 'Что им помогает?',
        options: ['The man with the umbrella', 'The map on the phone', "The key in Sofia's jeans"],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-7',
    title: 'Sunday at Four',
    titleTranslation: 'В воскресенье в четыре',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Sunday morning, we have breakfast in the hotel café. I look for the man with the red umbrella. He isn't in the café, and he isn't behind us. A woman from the hotel looks at my dead phone. 'Have you got a charger? No? Here you are!'\n\n" +
      "At eleven o'clock, my phone works again! The map and our tickets are all there. 'Dasha, where's the man with the umbrella? Is he in our hotel?' 'I don't know. And I don't want to know! A thief? A police officer?'\n\n" +
      "In the afternoon, we get on a bus to the theatre: upstairs, of course! The theatre is in a busy street near the river. At three o'clock, we get off at the bus stop. Our tickets are for four. We aren't late!\n\n" +
      "Then I look up. On the theatre, there's a photo of a man. A man with a red umbrella!",
    words: {
      charger: { english: 'зарядка (для телефона)' },
      again: { english: 'снова / опять' },
      afternoon: { english: 'день (после полудня): in the afternoon — днём' },
      late: { english: 'опоздавший; поздно: we aren\'t late — мы не опаздываем' },
    },
    expressions: {
      'have breakfast': { english: 'завтракать' },
    },
    grammarNote:
      "«In the afternoon, we get on a bus… At three o'clock, we get off» — части дня с in (in the morning, in the afternoon), дни с on (on Sunday), время с at (at three o'clock). По-русски везде без предлога или с «в»: «днём», «в воскресенье», «в три».",
    comprehensionQuestions: [
      {
        question: 'What is new on Sunday morning?',
        questionTranslation: 'Что нового в воскресенье утром?',
        options: ['The man with the umbrella is at breakfast.', 'A woman from the hotel helps, and the phone works now.', 'The tickets are not on the phone.'],
        correctIndex: 1,
      },
      {
        question: "Why doesn't Dasha want to know about the man?",
        questionTranslation: 'Почему Даша не хочет ничего знать о мужчине?',
        options: ['She is nervous: is he a thief?', 'She is tired of the theatre.', 'She is late for breakfast.'],
        correctIndex: 0,
      },
      {
        question: 'What is at the theatre?',
        questionTranslation: 'Что они видят у театра?',
        options: ['The man with the umbrella', "Sofia's pink list", 'A photo of the man with the red umbrella'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m3-8',
    title: 'The Man with the Red Umbrella',
    titleTranslation: 'Человек с красным зонтом',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "The show is great, and the man with the red umbrella is in it! He's an actor, and people love him. Sofia: 'Dasha… is he famous?'\n\n" +
      "After the show, he's in the café opposite the theatre. 'Hello again! I'm Oliver, and we're neighbours: I'm in your hotel, in room 12. And look: is this your list?' Sofia's pink list! 'It's from the market. I look for you at the bridge, but then a bus comes, and you aren't there!'\n\n" +
      "So he isn't a thief or a police officer. Sofia reads her list: the museum, the market, the red bus, the bridge, the river, the theatre… 'No map, no phone, and we see all the places!'\n\n" +
      "We take a photo with Oliver and his red umbrella. On Monday afternoon, we go home, tired and happy. My phone works now, but I don't look at the map. I look at the photo.",
    words: {
      show: { english: 'спектакль / шоу' },
      actor: { english: 'актёр' },
      famous: { english: 'знаменитый / известный' },
      home: { english: 'дом; домой (go home — ехать домой)' },
    },
    expressions: {
      'take a photo': { english: 'сфотографироваться / сделать фото' },
    },
    grammarNote:
      "«On Monday, we go home» — перед home не нужен предлог to: go home, а не go to home (сравните: go to the theatre). По-русски «едем домой» — тоже без предлога, так что здесь русское чутьё подсказывает верно.",
    comprehensionQuestions: [
      {
        question: 'Who is the man with the red umbrella?',
        questionTranslation: 'Кто мужчина с красным зонтом?',
        options: ['A police officer', 'A thief from the market', 'An actor in the show'],
        correctIndex: 2,
      },
      {
        question: 'Why is the man always near Dasha and Sofia?',
        questionTranslation: 'Почему мужчина всё время рядом с Дашей и Софией?',
        options: ['He wants their tickets.', 'He is in their hotel, and he has got their list.', 'He is a police officer.'],
        correctIndex: 1,
      },
      {
        question: 'Why is Sofia happy after the show?',
        questionTranslation: 'Почему София счастлива после спектакля?',
        options: ['They see all the places on the list.', 'The phone works now.', 'Oliver has got a new umbrella for them.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
];
