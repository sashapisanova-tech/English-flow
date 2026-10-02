import type { ReadingText } from '@/types/dutch';

const M = 'a1-challenge' as const;
const MT = '30-Day Challenge';

export const moduleA1_5Texts: ReadingText[] = [
  {
    id: 'a1m5-1',
    title: 'A Challenge from Gran',
    titleTranslation: 'Вызов от бабушки',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "My name is Ollie. I'm 31, and I work in an office in Bristol. I'm at my table all day, and I'm always tired. I never do sport. My favourite sport is football, on TV.\n\n" +
      "On Sunday, I had breakfast with my gran, Margaret. She's 72, and she's never tired. After breakfast, she showed me her phone. 'Look, Ollie! It's a challenge: thirty days to get fit. You get up at six every day. And there's no cake and no chocolate. Let's do it together!'\n\n" +
      "'Gran, you're 72!' I said. 'Yes, and you're 31, and you're always tired,' she said. So I said yes. Thirty days with my gran. What can go wrong?\n\n" +
      "At six o'clock on Monday, there was a message on my phone. It was from Gran: 'I'm waiting in the park. Where are you?'",
    words: {
      gran: { english: 'бабушка (разговорное)' },
      challenge: { english: 'челлендж / испытание, вызов' },
      fit: { english: 'в хорошей (спортивной) форме: get fit — прийти в форму' },
      said: { english: 'сказал(а) (say — говорить, сказать)' },
      never: { english: 'никогда (без второго отрицания: I never do sport)' },
    },
    expressions: {
      'get up': { english: 'вставать (с постели)' },
    },
    grammarNote:
      "«I had breakfast with my gran… So I said yes» — Past Simple: законченное действие в прошлом. had — прошедшее от have, said — от say, а was / were — прошедшее от to be: she was, there was a message. По-русски выбираем между «говорил» и «сказал», а в английском вида нет: одна форма said на оба случая.",
    comprehensionQuestions: [
      {
        question: 'What sport does Ollie like?',
        questionTranslation: 'Какой спорт нравится Олли?',
        options: ['He plays football every day.', "He likes football, but he doesn't play it.", 'He loves tennis.'],
        correctIndex: 1,
      },
      {
        question: 'What are the rules of the challenge?',
        questionTranslation: 'Какие правила у челленджа?',
        options: ['Up at six every morning, and no chocolate', 'Go to bed at six every day', 'Play football in the park every day'],
        correctIndex: 0,
      },
      {
        question: 'Why does Gran write to Ollie at six on Monday?',
        questionTranslation: 'Почему бабушка пишет Олли в шесть утра в понедельник?',
        options: ['She wants breakfast with him.', 'She is angry about the challenge.', "She is in the park, and he isn't there."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-2',
    title: 'Two Old Bananas',
    titleTranslation: 'Два старых банана',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "I usually get up at eight, but on Monday I got up at six. I went to the park, and Gran was there in a pink jumper. 'You're late, Ollie!' she said. 'Come on, let's run! I'm not waiting for you!'\n\n" +
      "Gran runs every morning, so she's very fit. I never run. After the bridge, I stopped. 'Gran, wait for me!' But Gran didn't wait. 'Ollie, you're 31, not 81!' she said, and she laughed.\n\n" +
      "At work, my legs felt like two old bananas. I was at my table all day, and I was very quiet.\n\n" +
      "I usually go to bed at twelve. On Monday, I went to bed at nine. Then I looked at the challenge on my phone. After the first day, Gran was first on the list. And there was a new message: 'Day 2 tomorrow: no coffee!'",
    words: {
      usually: { english: 'обычно' },
      run: { english: 'бегать / бежать' },
      felt: { english: 'чувствовал(ся) (feel — чувствовать): felt like — были как…' },
      legs: { english: 'ноги (leg)' },
      first: { english: 'первый; первым' },
    },
    expressions: {
      'go to bed': { english: 'ложиться спать' },
    },
    grammarNote:
      "«I usually get up at eight» — слова usually, always, never ставятся перед глаголом, но после to be: she's never tired. А «I never run» — never уже отрицание, второе не нужно: не I don't never run. По-русски «я никогда не бегаю» с двумя отрицаниями, а в английском одно.",
    comprehensionQuestions: [
      {
        question: "Why does Gran say 'You're late'?",
        questionTranslation: 'Почему бабушка говорит «Ты опоздал»?',
        options: ['Ollie was in the park at eight.', 'Gran was in the park before Ollie.', 'Ollie stopped after the bridge.'],
        correctIndex: 1,
      },
      {
        question: 'How did Ollie feel at work?',
        questionTranslation: 'Как Олли чувствовал себя на работе?',
        options: ['His legs were very tired.', 'He was happy and fit.', 'He was angry with Gran.'],
        correctIndex: 0,
      },
      {
        question: 'Why is the message a problem for Ollie?',
        questionTranslation: 'Почему сообщение — проблема для Олли?',
        options: ['He is not on the list.', 'Gran is not first.', "He can't have coffee tomorrow."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-3',
    title: "Josh's Birthday Cake",
    titleTranslation: 'Торт на день рождения Джоша',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Day 4 of the challenge. At work, I usually have three coffees, and I sometimes eat a box of biscuits. Not now. Now it's tea, apples and vegetables. A lot of vegetables. My legs are OK now, and I go to bed at ten.\n\n" +
      "Today was Josh's birthday. Josh works at the next table, and he loves cake. At eleven o'clock, he came in with a chocolate cake. 'Ollie, have some cake! We're all having cake!' 'No, thanks. I'm in a challenge with my gran.' Everyone laughed. 'Your gran? How old is she?' 'She's 72, and she's first on the list.'\n\n" +
      "The cake was next to me all afternoon. At four o'clock, I ate a bit. OK, I ate a lot of it.\n\n" +
      "At seven, there was a message from Gran: 'Hi, Ollie! How are you? Did you eat cake today?' How did she know?",
    words: {
      sometimes: { english: 'иногда' },
      biscuits: { english: 'печенье (biscuit)' },
      vegetables: { english: 'овощи (vegetable)' },
      today: { english: 'сегодня' },
      ate: { english: 'съел(а) (eat — есть, кушать)' },
    },
    expressions: {
      'how are you': { english: 'как дела? / как ты?' },
    },
    grammarNote:
      "«Did you eat cake today?» — вопрос в прошедшем строится с did, а глагол возвращается в начальную форму: Did you eat?, а не Did you ate? Одной интонацией, как по-русски («Ты ел торт?»), нельзя: You ate cake? звучит как удивлённое переспрашивание.",
    comprehensionQuestions: [
      {
        question: 'What does Ollie usually have at work?',
        questionTranslation: 'Что Олли обычно ест и пьёт на работе?',
        options: ['Tea and vegetables', 'A lot of coffee and some biscuits', 'Pizza and cake'],
        correctIndex: 1,
      },
      {
        question: 'Why does Ollie say no to the cake at eleven?',
        questionTranslation: 'Почему Олли отказывается от торта в одиннадцать?',
        options: ["He doesn't like chocolate.", 'It is not his birthday.', 'The challenge says no cake.'],
        correctIndex: 2,
      },
      {
        question: "Why is Gran's message a surprise for Ollie?",
        questionTranslation: 'Почему сообщение бабушки — сюрприз для Олли?',
        options: ['She knows about the cake, but she was not at his work.', 'She never writes to him.', "She doesn't know his number."],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-4',
    title: "Gran's Neighbour",
    titleTranslation: 'Бабушкин сосед',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Saturday morning, I went to Gran's flat. How did she know about the cake? But Gran wasn't at home.\n\n" +
      "Then a man came down from upstairs. 'Hello! You're Margaret's Ollie! I'm Derek, her neighbour.' 'Nice to meet you, Derek.' 'Margaret isn't here. She's swimming. She always gets up at half past five and goes to the swimming pool. After that, she often goes to the park, and she sometimes goes dancing.' 'My gran? Dancing?'\n\n" +
      "'I ate a bit of cake, and she knows!' I said. Derek laughed. 'There's a photo of you and the cake on the internet. Margaret saw it. In the evening, she's often on the internet.'\n\n" +
      "Derek was in sports clothes, and he looked very fit. 'Derek, are you also in the challenge?' 'Of course! Margaret is first, and I'm second.' He looked at his phone. 'And you, Ollie, are number 43.'",
    words: {
      half: { english: 'половина: half past five — полшестого (5:30)' },
      often: { english: 'часто' },
      also: { english: 'тоже / также (ставится перед глаголом)' },
      second: { english: 'второй; вторым' },
      evening: { english: 'вечер: in the evening — вечером' },
    },
    expressions: {
      'swimming pool': { english: 'бассейн' },
    },
    grammarNote:
      "«A man came down from upstairs… she goes to the swimming pool» — a ставим, когда человек или вещь появляется впервые («какой-то мужчина»), а the — когда понятно, о чём речь (тот самый бассейн, куда она всегда ходит). В русском артиклей нет, и это различие передаётся словами «какой-то» и «тот самый» или никак.",
    comprehensionQuestions: [
      {
        question: 'Who is Derek?',
        questionTranslation: 'Кто такой Дерек?',
        options: ["He is Ollie's friend from work.", "He is Gran's neighbour.", "He is Gran's doctor."],
        correctIndex: 1,
      },
      {
        question: 'How does Gran know about the cake?',
        questionTranslation: 'Откуда бабушка знает про торт?',
        options: ['Josh phoned her.', 'Derek was at the office.', 'She saw a photo of it on the internet.'],
        correctIndex: 2,
      },
      {
        question: "Why isn't Ollie happy with the list, do you think?",
        questionTranslation: 'Как ты думаешь, почему Олли не рад списку?',
        options: ['Gran and Derek are first and second, and he is 43.', 'He hates swimming.', 'Derek is angry with him.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-5',
    title: 'Win, Not Earn',
    titleTranslation: 'Выиграть, а не заработать',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Day 26 of the challenge, and I'm a new man. I get up at six every day, and I often feel great. I never eat biscuits now. OK, sometimes.\n\n" +
      "Today there was a message from the challenge: 'On day 30, number 1 on the list wins £200 for a sports shop!' Gran is winning, Derek is second, and I'm number 3.\n\n" +
      "At work, I said to Josh, 'I can win £200!' Josh laughed. 'But you earn money every day. Why do you want to win it?' 'It's not about money. Gran is always first. This time, I want to be first.' After work, we went to the gym. Now I'm there in all my free time.\n\n" +
      "Then there was a message from Gran: 'Come to the swimming pool tomorrow at six. Derek and I swim there every morning.' Only one problem: I can't swim.",
    words: {
      win: { english: 'выигрывать / побеждать' },
      shop: { english: 'магазин' },
      only: { english: 'только; всего' },
      earn: { english: 'зарабатывать (деньги работой)' },
      gym: { english: 'спортзал' },
    },
    expressions: {
      'free time': { english: 'свободное время' },
    },
    grammarNote:
      "«You earn money every day. Why do you want to win it?» — по-русски «заработать» и «выиграть» — разные слова, но учащиеся часто путают их в английском. earn — получать деньги за работу, win — выигрывать в игре, конкурсе или челлендже: win a prize, win £200, но earn money at work.",
    comprehensionQuestions: [
      {
        question: 'What is new about Ollie?',
        questionTranslation: 'Что нового у Олли?',
        options: ['He gets up at six and feels good.', 'He eats biscuits every day.', 'He is always tired.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Ollie want to win, do you think?',
        questionTranslation: 'Как ты думаешь, почему Олли хочет выиграть?',
        options: ['He wants new clothes.', 'He wants to be number 1, not Gran.', 'Josh wants a present.'],
        correctIndex: 1,
      },
      {
        question: "What is Ollie's problem for tomorrow?",
        questionTranslation: 'Какая у Олли проблема на завтра?',
        options: ['The gym is closed.', 'He has got work at six.', "Gran wants him at the swimming pool, but he can't swim."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-6',
    title: "Don't Tell Ollie",
    titleTranslation: 'Только не говори Олли',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Saturday at six, I was at the swimming pool with Gran and Derek. They were in the big pool. I was in the small pool, next to a man of ninety. He swims there every day, and he's very fit too. Gran often looked at me and laughed.\n\n" +
      "In the evening, I felt very tired. On Sunday morning, I phoned Gran. 'I have a cold. No challenge for me today.'\n\n" +
      "At five, Gran came to my flat with a big box of vegetables. She asked a lot of questions. 'Did you eat today? Did you have breakfast? Did you go to the park?' 'No, Gran. I have a cold!' Then she went to the kitchen. 'I'm making you some tea!'\n\n" +
      "Her phone was on the table, and there was a message from Derek: 'Tomorrow at six, at the bridge. Don't tell Ollie!' Don't tell Ollie? Don't tell Ollie what?",
    words: {
      big: { english: 'большой' },
      too: { english: 'тоже (в конце фразы)' },
      asked: { english: 'спросил(а) / задал(а) (ask — спрашивать)' },
      tell: { english: 'говорить, рассказывать (кому-то): tell Ollie — говорить Олли' },
      questions: { english: 'вопросы (question): ask a question — задать вопрос' },
    },
    expressions: {
      'have a cold': { english: 'быть простуженным: I have a cold — я простудился' },
    },
    grammarNote:
      "«She asked a lot of questions… Then she went to the kitchen» — у правильных глаголов прошедшее время с -ed (ask → asked, phone → phoned, laugh → laughed), а у неправильных своя форма: go → went, come → came, make → made. Их нужно просто запомнить: в русском такого деления нет.",
    comprehensionQuestions: [
      {
        question: 'Where was Ollie at the swimming pool?',
        questionTranslation: 'Где был Олли в бассейне?',
        options: ['In the big pool with Gran', 'At the gym with Josh', 'In the small pool, with a very old man'],
        correctIndex: 2,
      },
      {
        question: "Why did Gran come to Ollie's flat?",
        questionTranslation: 'Почему бабушка пришла к Олли домой?',
        options: ['He had a cold, and she wanted to help him.', 'She wanted tea.', 'She was angry with Derek.'],
        correctIndex: 0,
      },
      {
        question: "How does Ollie feel about Derek's message?",
        questionTranslation: 'Что Олли чувствует из-за сообщения Дерека?',
        options: ['He is happy: it is a nice message.', "He wants to know what Gran and Derek don't tell him.", 'He thinks the message is about the gym.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-7',
    title: 'The Red Car',
    titleTranslation: 'Красная машина',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Yesterday, I saw a message on Gran's phone: 'Don't tell Ollie!' At night, I didn't sleep. At half past five, I got up and walked to the bridge. I had a cold, but I waited behind the bus stop.\n\n" +
      "At six, Gran came on foot. A red car stopped next to her. It was Derek's car! Gran got in, and the car turned left.\n\n" +
      "Gran is first in the challenge, and she goes by car? I can't go after a car on foot, so I got a taxi. 'Go after that red car, please!' I said to the driver. He laughed. 'Are you a police officer?' 'No, I'm looking for my gran!'\n\n" +
      "The car stopped in the centre, next to a big green door. Gran and Derek went in. I looked in the window. There was music, and Gran and Derek danced together. Gran was in a red dress!",
    words: {
      yesterday: { english: 'вчера' },
      sleep: { english: 'спать: I didn\'t sleep — я не спал' },
      walked: { english: 'шёл / пошёл пешком (walk — ходить пешком, гулять)' },
      car: { english: 'машина, автомобиль' },
      driver: { english: 'водитель' },
    },
    expressions: {
      'on foot': { english: 'пешком' },
    },
    grammarNote:
      "«At night, I didn't sleep» — отрицание в прошедшем: didn't + глагол в начальной форме (не didn't slept). По-русски можно сказать «не спал» или «не поспал», а в английском вида нет: одно didn't sleep на оба случая.",
    comprehensionQuestions: [
      {
        question: 'What did Ollie think about at night?',
        questionTranslation: 'О чём Олли думал ночью?',
        options: ['His small bed', "The message on Gran's phone", 'The swimming pool'],
        correctIndex: 1,
      },
      {
        question: 'Why does Ollie get a taxi?',
        questionTranslation: 'Почему Олли берёт такси?',
        options: ['He is late for work.', 'He has a cold.', 'Gran and Derek went in a car.'],
        correctIndex: 2,
      },
      {
        question: 'What did Ollie see in the window?',
        questionTranslation: 'Что Олли увидел в окне?',
        options: ['Gran danced with Derek.', 'Gran was at the swimming pool.', 'Derek was in a red dress.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m5-8',
    title: 'Day 30',
    titleTranslation: 'День тридцатый',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On day 30, everyone came to the park. Gran was in her red dress.\n\n" +
      "'Gran, can we talk?' I said. 'Yesterday, you went to the centre in Derek's car. And you danced!' Gran laughed. 'Derek is my boyfriend. We swim together, and we also go dancing. It's sport too!' 'So why \"Don't tell Ollie\"?' 'I wanted to tell you today. Surprise!'\n\n" +
      "A woman read the list: 'Number 1, Margaret! She wins £200 for a sports shop!' Gran said, 'I've got a question. Can Ollie have it? On the first day, he only walked. Now he runs every morning, and he goes to the gym.' 'No problem,' said the woman.\n\n" +
      "'Gran, did you want to win?' I asked. 'Never,' she said. 'I wanted you in the park with me.' Derek showed me his phone: 'Next month: thirty days of dancing!' 'Gran, I'm not dancing!' 'See you tomorrow at six, Ollie!'",
    words: {
      talk: { english: 'разговаривать, поговорить' },
      boyfriend: { english: 'парень, бойфренд' },
      month: { english: 'месяц: next month — в следующем месяце' },
    },
    expressions: {
      'no problem': { english: 'без проблем / конечно' },
    },
    grammarNote:
      "«On the first day, he only walked. Now he runs every morning» — Past Simple (walked) рассказывает о том, что было, а Present Simple (runs) — о том, что бывает обычно. По-русски время видно по глаголу «ходил» / «бегает», и в английском тоже: прошлое всегда отмечено формой — walked, went, did, а вот вида (ходил / сходил) нет. А в вопросе — did: Did you want to win?",
    comprehensionQuestions: [
      {
        question: 'Who is Derek?',
        questionTranslation: 'Кто такой Дерек?',
        options: ["Ollie's taxi driver", 'A man from the gym', "Gran's boyfriend"],
        correctIndex: 2,
      },
      {
        question: 'What does Gran do with the £200?',
        questionTranslation: 'Что бабушка делает с 200 фунтами?',
        options: ['She wants Ollie to have it.', 'She buys a red dress.', 'She wants it for Derek.'],
        correctIndex: 0,
      },
      {
        question: 'Why did Gran do the challenge, do you think?',
        questionTranslation: 'Как ты думаешь, зачем бабушка участвовала в челлендже?',
        options: ['She wanted to win £200.', 'She wanted Ollie fit, and with her in the park.', 'She wanted a boyfriend.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
];
