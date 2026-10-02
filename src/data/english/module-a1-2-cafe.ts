import type { ReadingText } from '@/types/dutch';

const M = 'a1-cafe' as const;
const MT = 'The Café Shift';

export const moduleA1_2Texts: ReadingText[] = [
  {
    id: 'a1m2-1',
    title: "Max Can't Make Coffee",
    titleTranslation: 'Макс не умеет варить кофе',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "I'm Max. I'm 19, and I'm from Berlin. Now I'm in Brighton, and I work at Café Rosa. It's small: five tables and a cat, Mango.\n\n" +
      "Rosa is 45, and she has got house rules. I'm here at seven o'clock every day. No phone at work. And the food is for the tables, not for me!\n\n" +
      "'Do you like coffee, Max?' 'No, I don't. I like tea.' 'Can you make coffee?' 'No, I can't.' 'Max! We make coffee here every day!'\n\n" +
      "Rosa isn't angry. She has got an idea. 'On Monday at seven, you make twenty coffees. For me.'",
    words: {
      work: { english: 'работать; работа' },
      tables: { english: 'столы / столики' },
      like: { english: 'нравиться / любить: I like tea — я люблю чай' },
      can: { english: 'мочь / уметь' },
      make: { english: 'делать; готовить (make coffee — варить кофе)' },
    },
    expressions: {
      'every day': { english: 'каждый день' },
    },
    grammarNote:
      "«Do you like coffee?» — «No, I don't». По-русски вопрос задают интонацией: «Ты любишь кофе?». В английском в начале вопроса нужен помощник do, а в отрицании — don't (do not): I don't like coffee.",
    comprehensionQuestions: [
      {
        question: 'Where is Max now?',
        questionTranslation: 'Где сейчас Макс?',
        options: ['In Berlin, with Rosa', 'At work in Brighton', 'In a kitchen in Berlin'],
        correctIndex: 1,
      },
      {
        question: 'What is the problem with Max?',
        questionTranslation: 'Какая проблема с Максом?',
        options: ["He can't make coffee.", "He doesn't like tea.", 'He is not here at seven.'],
        correctIndex: 0,
      },
      {
        question: 'How is Rosa, and what is her idea?',
        questionTranslation: 'Как ведёт себя Роза и какая у неё идея?',
        options: ['She is angry: Max has got no work now.', 'She is hungry: Max makes food for her.', 'She is not angry: Max makes coffee for her on Monday.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-2',
    title: 'The Wrong Table',
    titleTranslation: 'Не тот столик',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Monday, I make twenty coffees. Rosa likes number twenty! On Tuesday, I've got the orders.\n\n" +
      "'Would you like a coffee?' Table one would like tea with milk. Table two: a coffee and a lemon cake.\n\n" +
      "In the kitchen, I don't know: is the milk for table one or two? All the orders are wrong! The customers are angry. Rosa isn't angry, but her eyes are.\n\n" +
      "At ten o'clock, there is a new customer at table four: black hair, black jeans. 'Would you like a coffee?' 'No. Tea with milk and a lemon cake.' Now his eyes are on me.",
    words: {
      orders: { english: 'заказы' },
      milk: { english: 'молоко' },
      cake: { english: 'торт / пирожное' },
      wrong: { english: 'неправильный / не тот' },
      customers: { english: 'посетители / клиенты' },
    },
    expressions: {
      'would you like': { english: 'не хотите ли…? / хотите…? (вежливо)' },
    },
    grammarNote:
      "«Would you like a coffee?» — так вежливо предлагают в кафе. Это готовая фраза: по-русски «Хотите кофе?», но Do you want a coffee? звучит грубовато. И обратите внимание: a coffee — одна чашка кофе, поэтому с артиклем a.",
    comprehensionQuestions: [
      {
        question: 'What is the new work for Max on Tuesday?',
        questionTranslation: 'Какая новая работа у Макса во вторник?',
        options: ['He makes twenty coffees.', 'He makes lemon cakes.', 'He is on orders for the tables.'],
        correctIndex: 2,
      },
      {
        question: 'Why are the customers angry?',
        questionTranslation: 'Почему посетители сердятся?',
        options: ['There is no milk.', 'Max has got the orders wrong.', 'Rosa is angry with them.'],
        correctIndex: 1,
      },
      {
        question: 'What is the problem with the new customer?',
        questionTranslation: 'Что не так с новым посетителем?',
        options: ['His eyes are on Max.', "He doesn't like tea.", 'He has got a cat.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-3',
    title: 'The Man at Table Four',
    titleTranslation: 'Мужчина за четвёртым столиком',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "The man in black comes every day at ten o'clock. His table is always table four, next to the window. He always has tea with milk and a lemon cake.\n\n" +
      "He has got a black book, and he writes in it. He writes and writes. What does he write? I don't know.\n\n" +
      "'Rosa, who is he?' 'I don't know his name. But he's a good customer.' 'What time does he come?' 'At ten. Always.'\n\n" +
      "On Wednesday, the man isn't at his table, and his book is open. In it, there is a name: MAX.",
    words: {
      man: { english: 'мужчина' },
      come: { english: 'приходить' },
      always: { english: 'всегда' },
      write: { english: 'писать' },
      book: { english: 'книга; здесь: блокнот' },
    },
    expressions: {
      'what time': { english: 'во сколько / в котором часу' },
    },
    grammarNote:
      "«What time does he come?» — по-русски «Во сколько он приходит?». В английском в вопросе нужен does (для he/she), а сам глагол теряет -s: does he come, а не does he comes. Сравните утверждение: He comes every day.",
    comprehensionQuestions: [
      {
        question: 'What does the man have every day?',
        questionTranslation: 'Что мужчина берёт каждый день?',
        options: ['A tea and a cake', 'A coffee, no milk', 'A lemon tea'],
        correctIndex: 0,
      },
      {
        question: 'Does Rosa know the man?',
        questionTranslation: 'Роза знает этого мужчину?',
        options: ["Yes, he's her neighbour.", 'Yes, his name is Max.', "No, not his name, but he's here every day."],
        correctIndex: 2,
      },
      {
        question: 'Why is Wednesday a problem for Max?',
        questionTranslation: 'Почему среда — проблема для Макса?',
        options: ['The man has got no tea.', "The name MAX is in the man's book.", 'The book is closed.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-4',
    title: 'How Much Is a Tea?',
    titleTranslation: 'Сколько стоит чай?',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Thursday, Rosa makes the coffee, and I've got the money. A customer at table two: 'How much is a tea, please?' '£2.50.' 'And a lemon cake?' '£3.80.' 'That's expensive!' But she has two cakes, and she pays by card.\n\n" +
      "The man at table four doesn't pay by card. His tea and cake are £6.30, and he has got £10 for me. 'Thank you, Max. Good tea.'\n\n" +
      "Max? He knows my name! How? From his book?\n\n" +
      "Now the man isn't here, but the black book is on table four. Can I open it?",
    words: {
      money: { english: 'деньги' },
      expensive: { english: 'дорогой (о цене)' },
      pays: { english: 'платит (pay — платить)' },
      card: { english: 'карта (банковская): by card — картой' },
    },
    expressions: {
      'how much': { english: 'сколько (стоит)' },
    },
    grammarNote:
      "«She pays by card» — с he/she/it к глаголу добавляют -s: she pays, Rosa makes, he knows. А в отрицании -s уходит, его «забирает» doesn't: He doesn't pay by card. По-русски «платит картой» — без предлога, а в английском нужен by.",
    comprehensionQuestions: [
      {
        question: 'What is expensive for the customer at table two?',
        questionTranslation: 'Что кажется дорогим посетительнице за вторым столиком?',
        options: ['The tea', 'The lemon cake', 'The card'],
        correctIndex: 1,
      },
      {
        question: 'How does the man pay?',
        questionTranslation: 'Как платит мужчина?',
        options: ['By card', 'Rosa pays for him.', 'With money, not a card'],
        correctIndex: 2,
      },
      {
        question: 'What is the problem for Max?',
        questionTranslation: 'Что беспокоит Макса?',
        options: ['The man knows his name.', "The man doesn't pay.", 'The tea is expensive.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-5',
    title: 'The Black Book',
    titleTranslation: 'Чёрный блокнот',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "I look at the book. I look at Rosa. 'Max, no! It's his book!' But Rosa is next to me, and she reads it with me.\n\n" +
      "In it, there are restaurants in Brighton, and there is Café Rosa: 'Tea with milk: seven out of ten. Lemon cake: nine. Coffee: four.' Four! My coffee!\n\n" +
      "At night, Rosa has got an email from her neighbour: 'A food critic is in Brighton this week.'\n\n" +
      "Rosa looks at me. 'Max, do you think…?' 'Yes, I do. The man always writes about food. He's the critic! And he doesn't like my coffee.'",
    words: {
      reads: { english: 'читает (read — читать)' },
      critic: { english: 'критик' },
      week: { english: 'неделя: this week — на этой неделе' },
      think: { english: 'думать' },
    },
    expressions: {
      'look at': { english: 'смотреть на' },
    },
    grammarNote:
      "«Do you think…?» — «Yes, I do». По-русски отвечают «Да, думаю», повторяя глагол. В английском в коротком ответе повторяют помощник do: Yes, I do / No, I don't.",
    comprehensionQuestions: [
      {
        question: 'What does Rosa do with the book?',
        questionTranslation: 'Что Роза делает с книгой?',
        options: ['She has got it in the kitchen.', 'She is angry: it is the man’s book.', 'She reads it with Max.'],
        correctIndex: 2,
      },
      {
        question: 'What is four out of ten in the book?',
        questionTranslation: 'Что в блокноте получило четыре из десяти?',
        options: ['The coffee from Max', 'The tea with milk', 'The lemon cake'],
        correctIndex: 0,
      },
      {
        question: 'Why do Max and Rosa think the man is the critic?',
        questionTranslation: 'Почему Макс и Роза думают, что мужчина — критик?',
        options: ['He has got a camera.', 'His book is about food, and a critic is in Brighton now.', 'His name is in the email.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-6',
    title: 'An Apple Cake from Berlin',
    titleTranslation: 'Яблочный пирог из Берлина',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Friday, Rosa wants clean tables, clean windows and a clean kitchen. 'The critic is here this week, and he doesn't like your coffee.' 'And the lemon cake?' 'Nine? No. I want ten.'\n\n" +
      "'I've got an idea: an apple cake from Berlin!' 'I'm not sure, Max…' 'I think it's ten out of ten. Can you help me?'\n\n" +
      "At night, we make three apple cakes. Mango is hungry, but they aren't for cats.\n\n" +
      "What time does the man in black come on Saturday? Ten, of course. At table two, there is a new customer with a camera… and a black book!",
    words: {
      wants: { english: 'хочет (want — хотеть)' },
      clean: { english: 'чистый' },
      apple: { english: 'яблоко; яблочный' },
      help: { english: 'помогать' },
    },
    expressions: {
      "i'm not sure": { english: 'я не уверен(а) / не знаю…' },
    },
    grammarNote:
      "«The critic doesn't like your coffee» — по-русски просто «Критику не нравится твой кофе». В английском отрицание строят через doesn't (с he/she/it), а глагол остаётся без -s: doesn't like, а не doesn't likes.",
    comprehensionQuestions: [
      {
        question: 'What does Rosa want on Friday?',
        questionTranslation: 'Чего хочет Роза в пятницу?',
        options: ['A clean kitchen and clean tables', 'A new window', 'Coffee from Max'],
        correctIndex: 0,
      },
      {
        question: 'Why does Max want an apple cake?',
        questionTranslation: 'Зачем Макс хочет испечь яблочный пирог?',
        options: ['Mango is hungry.', 'Rosa wants ten out of ten from the critic.', 'The lemon cake is four out of ten.'],
        correctIndex: 1,
      },
      {
        question: 'What is new on Saturday?',
        questionTranslation: 'Что нового в субботу?',
        options: ["The man doesn't come.", 'Max makes the coffee.', 'A customer with a camera and a black book'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-7',
    title: 'Two Black Books',
    titleTranslation: 'Два чёрных блокнота',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "It's Saturday, and Café Rosa is busy. Rosa is nervous, and I'm nervous.\n\n" +
      "The man at table four has his tea and apple cake, and he writes. Does he like it? I'm not sure.\n\n" +
      "At table two, there is a woman with pink hair. 'Excuse me! A tea with milk and the apple cake, please.' But I'm busy, and I make… a coffee. No milk. She doesn't drink it, but she writes in her book and pays by card. Is she a critic?\n\n" +
      "At twelve o'clock, the man comes to Rosa with his book. 'Rosa? Would you like…'",
    words: {
      busy: { english: 'оживлённый, полный людей; занятой' },
      nervous: { english: 'нервный: I\'m nervous — я нервничаю' },
      woman: { english: 'женщина' },
      drink: { english: 'пить' },
    },
    expressions: {
      'excuse me': { english: 'извините (чтобы обратиться к кому-то)' },
    },
    grammarNote:
      "«Does he like the cake?» — по-русски «Ему нравится торт?», вопрос только интонацией. В английском с he/she вопрос начинают с does, а -s у глагола исчезает: Does he like…?, а не Does he likes… и не He likes…?",
    comprehensionQuestions: [
      {
        question: 'How are Max and Rosa on Saturday?',
        questionTranslation: 'Как себя чувствуют Макс и Роза в субботу?',
        options: ['Hungry', 'Nervous', 'Angry'],
        correctIndex: 1,
      },
      {
        question: 'What is wrong with the order for table two?',
        questionTranslation: 'Что не так с заказом для второго столика?',
        options: ['The woman has got a coffee, not tea.', 'There is no apple cake.', 'Max has got her book.'],
        correctIndex: 0,
      },
      {
        question: "Why doesn't the woman drink it?",
        questionTranslation: 'Почему женщина его не пьёт?',
        options: ["She isn't hungry.", "She doesn't like tea.", 'It is the wrong drink.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m2-8',
    title: 'Nine Out of Ten',
    titleTranslation: 'Девять из десяти',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "'…would you like to read my book?' He isn't the critic! He's Ted, and his book is about Brighton food and cats. Mango is in it, and a funny waiter: Max! 'My coffee? Four?' 'I don't like coffee!'\n\n" +
      "On Monday, the critic is on the internet: she's the woman with pink hair! 'Café Rosa is clean and busy. The waiter is nervous, and my tea is a coffee. But I love the apple cake! Nine out of ten.'\n\n" +
      "Rosa is happy. 'Max, you're a great waiter… with wrong orders! Can you work here every day?' 'Of course! See you tomorrow!'",
    words: {
      waiter: { english: 'официант' },
      great: { english: 'отличный / замечательный' },
      love: { english: 'очень любить, обожать: I love it — мне очень нравится' },
      happy: { english: 'счастливый; довольный' },
    },
    expressions: {
      'see you tomorrow': { english: 'до завтра' },
    },
    grammarNote:
      "«Can you work here every day?» — после can глагол стоит без to и без -s: can work, а не can to work. По-русски «можешь работать» — с инфинитивом, а в английском просто голый глагол. И вопрос с can строят без do: Can you…?",
    comprehensionQuestions: [
      {
        question: 'Who is the man from table four?',
        questionTranslation: 'Кто мужчина за четвёртым столиком?',
        options: ['The food critic', 'A neighbour of Rosa', 'Ted: he writes about food and cats'],
        correctIndex: 2,
      },
      {
        question: 'What does the critic think?',
        questionTranslation: 'Что думает критик?',
        options: ['The coffee is great.', 'Her drink is wrong, but she loves the cake.', 'The waiter is not nervous.'],
        correctIndex: 1,
      },
      {
        question: 'Why is Rosa happy?',
        questionTranslation: 'Почему Роза довольна?',
        options: ['The critic loves the apple cake.', 'Max can make good coffee now.', 'Ted is the critic.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
];
