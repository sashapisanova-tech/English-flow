import type { ReadingText } from '@/types/dutch';

const M = 'a1-flatmates' as const;
const MT = 'New Flatmates';

export const moduleA1_1Texts: ReadingText[] = [
  {
    id: 'a1m1-1',
    title: 'Hello, Manchester!',
    titleTranslation: 'Привет, Манчестер!',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Hi! I'm Lena. I'm 24, and I'm from Kazan. It's Sunday, and now I'm in Manchester, in a new flat. Hello, Manchester!\n\n" +
      "Tom and Priya are my flatmates. Tom is 27. He's a chef. Priya is 22. She's a student.\n\n" +
      "We have got a TV and a piano. The piano is Priya's. And there are five guitars. Five! Why five? They're all Tom's.\n\n" +
      'But there is one problem…',
    words: {
      new: { english: 'новый' },
      flat: { english: 'квартира' },
      flatmates: { english: 'соседи по квартире' },
      chef: { english: 'повар / шеф-повар' },
    },
    expressions: {
      'have got': { english: 'иметь: we have got — у нас есть' },
    },
    grammarNote:
      '«He\'s a chef» — по-русски «Он повар», без глагола и без артикля. В английском нужны оба: глагол to be (he\'s = he is) и артикль a перед профессией.',
    comprehensionQuestions: [
      {
        question: 'Who are Tom and Priya?',
        questionTranslation: 'Кто такие Том и Прия?',
        options: ['Two chefs from Kazan', 'Two students from Manchester', "Lena's new flatmates"],
        correctIndex: 2,
      },
      {
        question: 'Why are there five guitars in the flat?',
        questionTranslation: 'Почему в квартире пять гитар?',
        options: ['Tom has got five guitars.', 'Lena has got five guitars.', 'Priya has got a piano and guitars.'],
        correctIndex: 0,
      },
      {
        question: 'Is the new flat OK?',
        questionTranslation: 'Всё ли в порядке с новой квартирой?',
        options: ['Yes, there are no problems.', 'Yes, but there is a problem.', 'No, there is no TV.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-2',
    title: "Tom's Fridge",
    titleTranslation: 'Холодильник Тома',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "The new flat is OK, but the kitchen is very small. And the problem? The fridge. It's all Tom's! He's a chef.\n\n" +
      'In the fridge, there are ten tomatoes, eight lemons, six bananas and two pizzas. Priya has got one white box, with PRIYA on it.\n\n' +
      "And me? I have got six pink yoghurts. Now they're under Tom's lemons.\n\n" +
      'On Monday, there are six. On Tuesday, there are five.',
    words: {
      fridge: { english: 'холодильник' },
      kitchen: { english: 'кухня' },
      small: { english: 'маленький' },
      box: { english: 'коробка / контейнер' },
      yoghurts: { english: 'йогурты' },
    },
    expressions: {
      'there are': { english: 'есть / находятся (о нескольких предметах)' },
    },
    grammarNote:
      '«In the fridge, there are ten tomatoes» — по-русски просто «В холодильнике десять помидоров». В английском нужно there are (для одного предмета — there is), а у существительных во множественном числе окончание -s/-es: lemons, tomatoes.',
    comprehensionQuestions: [
      {
        question: 'Why is the fridge a problem?',
        questionTranslation: 'Почему холодильник — проблема?',
        options: ['There is no fridge in the flat.', "Tom's tomatoes, lemons and pizzas are in it.", "Priya's box is very big."],
        correctIndex: 1,
      },
      {
        question: 'What has Lena got in the fridge?',
        questionTranslation: 'Что у Лены в холодильнике?',
        options: ['A white box', 'Ten tomatoes', 'Six yoghurts'],
        correctIndex: 2,
      },
      {
        question: 'What is the problem on Tuesday?',
        questionTranslation: 'Какая проблема во вторник?',
        options: ['One yoghurt is not there.', 'There are six yoghurts.', "Tom's lemons are not there."],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-3',
    title: "Who's Got My Yoghurt?",
    titleTranslation: 'У кого мой йогурт?',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "It's Tuesday. There are five yoghurts in the fridge, not six. I'm very angry! Is it one of my flatmates?\n\n" +
      "'Tom! Have you got my yoghurt?' Tom: 'Me? No! I'm a chef, Lena. I've got very good food. Your yoghurt is not my problem.'\n\n" +
      "'Priya? Is it you?' Priya: 'No, sorry. I'm not hungry. And I've got my salad, in my box.'\n\n" +
      "So who is it? I don't know. And on Wednesday, there are four.",
    words: {
      angry: { english: 'сердитый / злой (I\'m angry — я злюсь)' },
      good: { english: 'хороший' },
      food: { english: 'еда' },
      hungry: { english: 'голодный' },
    },
    expressions: {
      "i don't know": { english: 'я не знаю' },
    },
    grammarNote:
      '«Have you got my yoghurt?» — по-русски «У тебя мой йогурт?», без глагола. В английском «иметь» выражают через have got, а вопрос начинают с have: Have you got…? С he/she — has: Has Tom got…?',
    comprehensionQuestions: [
      {
        question: 'How is Lena on Tuesday, and why?',
        questionTranslation: 'Как себя чувствует Лена во вторник и почему?',
        options: ['Angry: one yoghurt is not there.', 'Hungry: there is no food.', 'Very good: there are six yoghurts.'],
        correctIndex: 0,
      },
      {
        question: 'Has Tom got the yoghurt?',
        questionTranslation: 'Йогурт у Тома?',
        options: ["Yes, it's in his box.", "No. He's a chef with good food.", 'Yes, and he is very hungry.'],
        correctIndex: 1,
      },
      {
        question: 'Why is it not Priya?',
        questionTranslation: 'Почему это не Прия?',
        options: ["She's a chef.", 'She has got five yoghurts.', "She isn't hungry, and her salad is in her box."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-4',
    title: "Lena's Room",
    titleTranslation: 'Комната Лены',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      'My room in the new flat is small. There is a bed next to the window. One bed! That\'s all the furniture.\n\n' +
      "But I'm a designer, and I've got ideas. Now it's purple and green, and there are photos of Kazan. Tom: 'Lena, it's very good!' Priya: 'Yes, very!'\n\n" +
      "And on Thursday, there are three yoghurts in the fridge. Three! I'm hungry, and I'm angry.",
    words: {
      room: { english: 'комната' },
      bed: { english: 'кровать' },
      window: { english: 'окно' },
      furniture: { english: 'мебель' },
      designer: { english: 'дизайнер' },
    },
    expressions: {
      'next to': { english: 'рядом с' },
    },
    grammarNote:
      "«That's all the furniture» — furniture (мебель) в английском неисчисляемое: нельзя сказать a furniture или furnitures, и глагол всегда в единственном числе (the furniture is). Если нужно посчитать, называют сам предмет: one bed, a table.",
    comprehensionQuestions: [
      {
        question: "What is in Lena's room?",
        questionTranslation: 'Что есть в комнате Лены?',
        options: ['A TV and a piano', 'Five guitars', 'A bed and a window'],
        correctIndex: 2,
      },
      {
        question: 'Why is the room OK now?',
        questionTranslation: 'Почему теперь комната в порядке?',
        options: ['Tom is a designer.', 'Lena is a designer with good ideas.', 'There is new furniture from Priya.'],
        correctIndex: 1,
      },
      {
        question: 'How is Lena at the end?',
        questionTranslation: 'Как Лена себя чувствует в конце?',
        options: ['Angry and hungry', 'Very good: there are six yoghurts', 'Not angry: the room is OK'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-5',
    title: 'House Rules',
    titleTranslation: 'Правила квартиры',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Priya has got house rules for her flatmates. There are ten! One: no pizza in bed. Two: no guitars at night. Three: Tom's food is Tom's, and Lena's food is Lena's.\n\n" +
      "Tom is very angry. 'No guitars? No pizza in bed? Priya, I'm a chef!'\n\n" +
      "So now my yoghurts have got a name on them: LENA, in pink. I'm a designer!\n\n" +
      "On Saturday, there is a yoghurt in the fridge with my name on it. It's empty.",
    words: {
      name: { english: 'имя' },
      empty: { english: 'пустой' },
    },
    expressions: {
      'house rules': { english: 'правила квартиры (для жильцов)' },
      'at night': { english: 'ночью' },
    },
    grammarNote:
      "«Tom's food is Tom's» — 's после имени отвечает на вопрос «чей?»: Tom's food = еда Тома. По-русски меняется окончание (Тома, Лены), а в английском просто добавляют 's — и можно даже без существительного: …is Tom's = …принадлежит Тому.",
    comprehensionQuestions: [
      {
        question: 'Whose house rules are they?',
        questionTranslation: 'Чьи это правила?',
        options: ["Tom's", "Priya's", "Lena's"],
        correctIndex: 1,
      },
      {
        question: 'Why is Tom angry?',
        questionTranslation: 'Почему Том сердится?',
        options: ['His guitars and his pizza are a problem now.', 'There is no name on his food.', 'Priya has got his pizza.'],
        correctIndex: 0,
      },
      {
        question: 'What is the problem on Saturday?',
        questionTranslation: 'Какая проблема в субботу?',
        options: ['There are no house rules now.', "Lena's name is not on the yoghurts.", "A 'LENA' yoghurt is empty."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-6',
    title: 'Whose Hair Is It?',
    titleTranslation: 'Чей это волос?',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "It's Sunday, and there is a new problem in the kitchen. There is a white hair in the fridge, next to the empty yoghurt. So whose is it? Tom's is black, Priya's is black, and mine is brown.\n\n" +
      "Joan from flat 2 is our neighbour. 'Hello! You're Lena? Oh, what a nice name!' The people here are very nice.\n\n" +
      "But Joan has got… white hair. Is it Joan? No, no! She's 80. Or… is it?",
    words: {
      hair: { english: 'волосы; волос' },
      neighbour: { english: 'соседка / сосед' },
      people: { english: 'люди' },
      nice: { english: 'милый / приятный; красивый (об имени)' },
    },
    expressions: {
      'there is': { english: 'есть / находится (об одном предмете)' },
    },
    grammarNote:
      '«The people here are very nice» — people в английском всегда множественного числа, поэтому are, а не is. По-русски можно сказать «народ здесь милый» в единственном числе, но people is — ошибка.',
    comprehensionQuestions: [
      {
        question: 'Why is the white hair a problem?',
        questionTranslation: 'Почему белый волос — это проблема?',
        options: ["It isn't Tom's, Priya's or Lena's.", "It is in Lena's bed.", "It is Tom's hair."],
        correctIndex: 0,
      },
      {
        question: 'Who is Joan?',
        questionTranslation: 'Кто такая Джоан?',
        options: ["Priya's flatmate", 'A new chef', 'A neighbour from flat 2'],
        correctIndex: 2,
      },
      {
        question: "Why is there a question about Joan?",
        questionTranslation: 'Почему Лена подозревает Джоан?',
        options: ['Joan is angry.', "Joan's hair is white.", 'Joan is very hungry.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-7',
    title: 'A Camera in the Kitchen',
    titleTranslation: 'Камера на кухне',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Priya has got an idea: a camera in the kitchen. Tom: 'A camera? For a yoghurt? I don't know, Priya…' Priya: 'For Lena's yoghurt! And for my salad box.'\n\n" +
      'At night, we are all in our rooms. But in the morning, there is a video. And there is a new empty yoghurt.\n\n' +
      "On the video, it's three o'clock. The kitchen window and the fridge are open. And in the fridge, next to my yoghurt, there are two hungry green eyes!",
    words: {
      camera: { english: 'камера' },
      "o'clock": { english: 'ровно (о времени): three o’clock — три часа' },
      open: { english: 'открытый' },
      eyes: { english: 'глаза' },
    },
    expressions: {
      'in the morning': { english: 'утром' },
    },
    grammarNote:
      '«Priya has got an idea: a camera in the kitchen» — an ставят перед гласным звуком (an idea), a — перед согласным (a camera). А the kitchen — с the: кухня в квартире одна, и все знают, какая. В русском артиклей нет, поэтому их легко забыть.',
    comprehensionQuestions: [
      {
        question: 'Why is there a camera in the kitchen?',
        questionTranslation: 'Зачем на кухне камера?',
        options: ["For Tom's food videos", "For Lena's photos", 'For the yoghurt problem'],
        correctIndex: 2,
      },
      {
        question: 'When is the video from?',
        questionTranslation: 'Во сколько снято видео?',
        options: ['From three in the morning', 'From ten at night', 'From Sunday at eight'],
        correctIndex: 0,
      },
      {
        question: 'What is on the video?',
        questionTranslation: 'Что видно на видео?',
        options: ['Tom with a yoghurt', 'An open window, an open fridge and two eyes', 'Priya at the fridge'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m1-8',
    title: 'The Yoghurt Thief',
    titleTranslation: 'Похититель йогурта',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On the camera video, there is a white cat with green eyes. It's in the fridge, with my yoghurt!\n\n" +
      "It's Joan's. Joan, our neighbour, is very nice and very sorry. 'Her name is Lena!' The thief is… Lena. Tom: 'Very funny!'\n\n" +
      "And the white hair? The cat's. The open window and fridge at night? Tom's, of course.\n\n" +
      'Now there is a new house rule: the fridge is closed at night. And the cat? She has got her yoghurt: LENA 2.',
    words: {
      cat: { english: 'кошка' },
      thief: { english: 'вор / похититель' },
      funny: { english: 'смешной' },
      closed: { english: 'закрытый' },
    },
    expressions: {
      'of course': { english: 'конечно' },
    },
    grammarNote:
      "«There is a white cat… And the white hair? The cat's» — сначала a cat: кошка новая, о ней говорят впервые. Потом the cat: теперь мы знаем, какая это кошка. В русском эту разницу передают разве что словами «какая-то» и «эта», а в английском артикль нужен всегда.",
    comprehensionQuestions: [
      {
        question: 'Who is the yoghurt thief?',
        questionTranslation: 'Кто похититель йогурта?',
        options: ['Tom', "Joan's cat", 'Joan'],
        correctIndex: 1,
      },
      {
        question: "Why is it funny?",
        questionTranslation: 'Почему это смешно?',
        options: ['The cat is pink.', 'Tom is a cat.', "The cat has got Lena's name."],
        correctIndex: 2,
      },
      {
        question: "Why is it Tom's problem?",
        questionTranslation: 'Почему это ещё и проблема Тома?',
        options: ['The window and the fridge are open because of Tom.', 'Tom has got a cat.', "The yoghurt is Tom's."],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
];
