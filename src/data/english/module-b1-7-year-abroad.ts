import type { ReadingText } from '@/types/dutch';

const M = 'b1-year-abroad' as const;
const MT = 'One Year Abroad';

export const moduleB1_7Texts: ReadingText[] = [
  {
    id: 'b1m7-1',
    title: 'Week One',
    titleTranslation: 'Первая неделя',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Blog post, week 1: A Foreigner in Glasgow. Hello from Scotland! For my friends in Perm, who have asked me to write about my new life, here is the first post. My name is Ilya, I'm 30, and a week ago I arrived in Glasgow with two suitcases, a new job at the university and no idea what I was doing.\n\n" +
      "I should have checked the weather before I packed. I brought one light jacket, because someone told me that the British rain was just a stereotype. It has rained every day since I landed, and my one umbrella was destroyed on the second day by the weather. I could have bought a real coat at the airport, but I wanted to save money. That was a mistake that I've already regretted many times.\n\n" +
      "The university is beautiful, an old building that was designed to look like a castle from a film, and my colleagues have been very kind. I'm doing research on water and pollution and giving a few lectures, and my boss, Professor Reid, is a quiet woman who says very little but notices everything. My office is shared with a researcher called Dev, who came here from Chennai five years ago and has offered to help me with what he calls 'the British system'. 'You'll need a bank account, a flat, a doctor and a number from the government,' he said. 'Good luck. It's a challenging process, and the system is challenging for everyone.'\n\n" +
      "The biggest surprise is the accent. I studied English for fifteen years, and I thought that my English was good, but in Glasgow I understand maybe half of what a native speaker says. On my first morning, the man at the café asked, 'Y'alright?' and I started to tell him about my flight. It was my first misunderstanding: he looked at me as if I was strange. Dev told me later that it just means hello, and that the right answer is 'Aye, fine, you?'\n\n" +
      "For now, I'm staying in a double room in a small hotel, which is expensive, and looking for a flat. Despite the rain and the accent, I'm happy that I came. Everything is new, from the weather to the lifestyle, and every day is an opportunity to learn something. Next week: the British system. Wish me luck. I'm going to need it.",
    words: {
      foreigner: { english: 'иностранец' },
      system: { english: 'система' },
      challenging: { english: 'трудный, требующий усилий' },
      process: { english: 'процесс' },
      despite: { english: 'несмотря на' },
      opportunity: { english: 'возможность' },
    },
    expressions: {
      'should have checked': { english: 'надо было проверить (should have + 3-я форма — сожаление)' },
      'could have bought': { english: 'мог бы купить (could have + 3-я форма — упущенная возможность)' },
    },
    grammarNote:
      "«I should have checked the weather… I could have bought a real coat» — should have + третья форма: «надо было (но я не сделал)»; could have + третья форма: «мог бы (но не сделал)». Так говорят о сожалении и упущенных возможностях. По-русски «надо было проверить», «мог бы купить» — прошлое передаётся словами «надо было», «мог бы», а в английском — конструкцией с have.",
    comprehensionQuestions: [
      {
        question: 'What does Ilya regret?',
        options: ['Coming to Glasgow', 'Not checking the weather and not buying a warm coat', 'Studying English'],
        correctIndex: 1,
      },
      {
        question: 'What does Dev offer to help with?',
        options: ['The British system: bank, flat, doctor and other things', "Ilya's research", 'Learning Russian'],
        correctIndex: 0,
      },
      {
        question: "What is Ilya's opinion of his first week, in general?",
        options: ['He wants to go home.', 'He hates the rain too much.', 'It is hard, but he is happy and sees it as a chance to learn.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-2',
    title: 'Paperwork',
    titleTranslation: 'Бумажная волокита',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Dev, also an immigrant, had warned me about British bureaucracy, but I didn't believe him until I tried to open a bank account. On Monday morning, I went to a bank in the city centre, filled in a form and waited for forty minutes. Then a polite young man looked at my form and said no. 'I'm sorry,' he said, 'but one of our requirements is proof of address. Have you got a letter with your name and your address on it?' 'I live in a hotel,' I said. 'Then I'm afraid we can't help you.'\n\n" +
      "So I went to look at flats. The first landlord liked me, and the flat was perfect, but before I could sign anything, he asked for my bank account. 'I haven't got a bank account,' I said. 'The bank needs proof of address.' 'And I need a bank account,' he said. 'Sorry, mate. That's the system.' I walked back to the hotel in the rain and understood the problem with the whole process: no flat without a bank account, and no bank account without a flat.\n\n" +
      "The rest of the week was more paperwork. I needed to register with a doctor, and the doctor's form asked for my National Insurance number. To get a National Insurance number, I had to call an official number, wait for an hour and answer questions about my visa, which was the most challenging part of the week. At the end of the call, the woman said, 'We'll send you a letter.' 'Where?' I asked. 'To your address,' she said. I laughed so much that she put the phone down.\n\n" +
      "On Friday, a letter finally arrived at the hotel. It was from the bank, and it was very official: Dear Mr Volkov, Thank you for your request. We regret to inform you that we cannot open an account for you at this time. Please contact us if you need more information.\n\n" +
      "I showed it to Dev, who laughed for a long time. 'You should have asked me first,' he said. 'Here's some advice: the university can write you a letter with your address on it. It works as proof of address.' I could have saved a week of my life. Then he showed me an advert: Furnished room in a flat, ten minutes from the university. No questions about bank accounts. Ruth.",
    words: {
      bureaucracy: { english: 'бюрократия' },
      form: { english: 'бланк, анкета (fill in a form — заполнить бланк)' },
      requirements: { english: 'требования (requirement)' },
      paperwork: { english: 'бумажная работа, оформление документов' },
      register: { english: 'зарегистрироваться, встать на учёт' },
      official: { english: 'официальный' },
      visa: { english: 'виза' },
    },
    expressions: {
      'proof of address': { english: 'подтверждение адреса' },
      'national insurance number': { english: 'номер социального страхования (в Великобритании)' },
    },
    grammarNote:
      "«You should have asked me first» — should have + третья форма: упрёк или совет о прошлом. А «more information» и «some advice» — повторение: information и advice неисчисляемые, без -s и без a. По-русски «информация» и «совет» бывают во множественном числе («советы»), а в английском — нет: some advice, a lot of information.",
    comprehensionQuestions: [
      {
        question: 'Why does the bank say no?',
        options: ["Ilya doesn't have a job.", "He can't show proof of his address.", 'His English is not good enough.'],
        correctIndex: 1,
      },
      {
        question: 'What is the problem that Ilya finds?',
        options: ['He needs a bank account to rent a flat, and a flat to open a bank account.', 'He keeps getting lost in Glasgow.', 'The doctor and the bank are in the same building.'],
        correctIndex: 0,
      },
      {
        question: "What is the purpose of Ruth's advert?",
        options: ['To sell a car', 'To find a job', 'To find someone to rent a room, with no bank questions'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-3',
    title: 'Small Talk',
    titleTranslation: 'Светская беседа',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Ruth was 34, she drove a bus for the city, and she had the loudest laugh in Glasgow. Her flat was on the fourth floor of an old block of flats near the river, and my room was small, cold and perfect, and we got on well with each other from the start. On my first evening, she sat me down with a cup of tea and said, 'Right. If you're going to live here, you need to learn small talk. For a foreigner, it's the most challenging part of the system.'\n\n" +
      "According to Ruth, small talk is the most important skill in Britain. 'You talk about the weather, the bus, the football,' she said. 'You never talk about money, and you never say what you really think.' 'Why not?' I asked. 'In Russia, if someone asks how you are, you tell them.' 'Exactly,' Ruth said. 'Whereas here, when someone asks how you are, the answer is always fine, even if everything is going wrong.' I laughed, but I was taking notes.\n\n" +
      "Over the next weeks, I learned British manners the hard way. I learned that recycling is separated into four different bins. I learned that a queue is very important, and that you should never, ever push in. I learned that 'not bad' can mean 'brilliant', and that 'interesting' can mean 'awful'. In the beginning, talking to people felt awkward, but eventually I started to enjoy it, like a game with secret rules. Each cultural difference was an opportunity to meet people.\n\n" +
      "The only thing that I couldn't get used to was not complaining. Our neighbours upstairs played loud music until two every night, and after a week of no sleep, I wanted to make a complaint. 'You can't go to their door and tell them,' Ruth said, shocked. 'That's not how we do it here.' 'Then how?' 'You look very tired on the stairs when you see them,' she said. 'And then you leave a very polite note. That's British culture. Its origin is probably three hundred years of being polite to people you hate.' 'That's a good point,' I said.\n\n" +
      "I left a polite note, and the music stopped. That night, for the first time since I arrived, I slept for eight hours. In the morning, there was a message from Katya, my girlfriend in Perm: 'I miss you. When are you coming home?'",
    words: {
      whereas: { english: 'тогда как, в то время как' },
      manners: { english: 'манеры, правила поведения' },
      awkward: { english: 'неловкий' },
      eventually: { english: 'в конце концов, со временем' },
      origin: { english: 'происхождение, начало' },
    },
    expressions: {
      'small talk': { english: 'светская беседа, разговор о погоде' },
      'block of flats': { english: 'многоквартирный дом' },
      'make a complaint': { english: 'пожаловаться (официально)' },
    },
    grammarNote:
      "«If you're going to live here, you need to learn small talk» — первое условное (повторение): реальная ситуация. «when someone asks how you are» — после when настоящее время, без will. А «I wanted to make a complaint» — с complaint используется make, а не do: make a complaint, make a mistake, но do your homework. По-русски везде «сделать», поэтому сочетания нужно запоминать.",
    comprehensionQuestions: [
      {
        question: 'Why does Ruth say that Ilya needs small talk?',
        options: ['It is how people are friendly with each other in Britain.', 'Ilya talks too little.', 'It helps with the paperwork.'],
        correctIndex: 0,
      },
      {
        question: 'How is the British answer to "How are you?" different from the Russian one?',
        options: ['British people tell you all their problems.', 'British people say "fine", even when things are bad.', 'British people never answer.'],
        correctIndex: 1,
      },
      {
        question: "What is Ruth's opinion of complaining?",
        options: ['You should go to the door and complain.', 'You should call the police.', 'In Britain, people complain politely and in hidden ways.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-4',
    title: 'One Month',
    titleTranslation: 'Один месяц',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Blog post, one month: The Hard Part. I haven't written for three weeks, and I'm sorry to everyone who has subscribed. The truth is that this month has been harder than I expected. The paperwork is done, I have a bank account, a room in Ruth's flat and a doctor, and I'm satisfied with my work at the university. But no one warned me about the loneliness. Even small talk feels awkward when you're lonely.\n\n" +
      "Apart from Dev and Ruth, I don't really know anyone in Glasgow. My colleagues are friendly, but at five o'clock they go home to their families, and I go home to my small cold room. In Perm, I had friends that I had known since school, a family that called me every day, and Katya, who I have been with for four years. Here, I have Ruth's cat, who doesn't like me, and no one to speak my mother tongue with.\n\n" +
      "Last Saturday was a special occasion: our anniversary, mine and Katya's. We had planned to be together, but I couldn't afford a flight home, so we had dinner on a video call instead. The distance between us felt bigger than ever. She cooked my favourite soup in Perm, and I ate a sandwich from the shop downstairs in Glasgow. If I were in Perm, I would take her to the restaurant where we had our first date. Instead, I watched her eat soup on a small screen. When I closed my laptop, the flat was very quiet.\n\n" +
      "My contract is temporary, only for one year, and some nights I think about going home early. Katya thinks that I should. 'If you came back now,' she said last night, 'you could get your old job back.' She's right, and therefore I haven't told her the other thing: that sometimes, despite the loneliness, I love it here. When I walk to work by the river in the morning, I feel happier than I have felt for years.\n\n" +
      "Ruth, more caring than she pretends, has noticed. Yesterday she put a note on my door: a list of things at the community centre, with one of them in red: Russian-speaking group, Thursdays at seven. Tea and cake. Underneath, in her terrible handwriting, she had written: 'Go. It'll cheer you up. You look like a sad potato.' Maybe I will. Maybe one day this temporary life will feel permanent.",
    words: {
      satisfied: { english: 'довольный (результатом)' },
      loneliness: { english: 'одиночество' },
      anniversary: { english: 'годовщина' },
      temporary: { english: 'временный' },
      therefore: { english: 'поэтому, следовательно' },
      permanent: { english: 'постоянный' },
    },
    expressions: {
      'apart from': { english: 'кроме, помимо' },
      'community centre': { english: 'общественный центр (в районе)' },
    },
    grammarNote:
      "«If I were in Perm, I would take her to the restaurant where we had our first date» — второе условное (повторение) и where в придаточном. А «Katya, who I have been with for four years» — Present Perfect с for: это продолжается до сих пор. По-русски «мы вместе четыре года» — настоящее время, а в английском — have been. И «When I walk to work… I feel» — после when настоящее время.",
    comprehensionQuestions: [
      {
        question: 'What is the hardest part of the first month for Ilya?',
        options: ['The paperwork', 'Feeling lonely, with very few friends', 'His work'],
        correctIndex: 1,
      },
      {
        question: "Why hasn't Ilya told Katya that he sometimes loves Glasgow?",
        options: ['Because she wants him to come home, and he does not want to hurt her', 'Because he hates Glasgow', 'Because she already knows'],
        correctIndex: 0,
      },
      {
        question: "What is the purpose of Ruth's note?",
        options: ['To ask for the rent', 'To complain about the cat', 'To push Ilya to meet people so that he feels better'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-5',
    title: 'The Mistake',
    titleTranslation: 'Ошибка',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "In November, Professor Reid asked me to write my first report for the team, a study of pollution in the river Clyde, which had to be ready by Friday. I worked on it every evening for two weeks, and I was proud of it. On Thursday night, I stayed at the university until two in the morning, because I had to meet a deadline, and at 8.55 on Friday, I sent it to the whole team.\n\n" +
      "At 9.30, Dev came into our office with a strange face. 'Ilya,' he said, 'have you looked at your table on page six?' I looked, and my stomach went cold. I had used the data from the wrong year: I was tired, and therefore I didn't check. Every number in the table was wrong, and the conclusion of the report was wrong too. Twelve people had already read it, including Professor Reid. I had been so satisfied with it, and now it was awkward. 'I should have checked the data again,' I said. 'I could have asked you to read it.'\n\n" +
      "In Russia, at my old job, a mistake like this one was a disaster. People there didn't talk about mistakes. You hid them, or you lost your job. So my first idea was to say nothing and hope that no one noticed. Then I thought about Ruth's polite notes and Dev's advice, and I chose to do the opposite. I went to Professor Reid's office and told her the truth. 'I've made a mistake,' I said. 'The data in the table is from 2019, not 2023. I'm very sorry. I can do the whole table again by Monday.'\n\n" +
      "I expected her to be angry. Instead, she reacted very calmly, and I admired her for it. 'Thank you for telling me,' she said. 'Everyone makes mistakes. Everyone has to miss a deadline sometimes, too: last year, I missed one by a month, and no one died. Fix it, send it again, and write a short note to the team. Otherwise, people will use the wrong numbers. And Ilya? Next time, ask Dev to read your work. That's what colleagues are for.'\n\n" +
      "I did the table again over the weekend. On Monday, I sent the new report. That afternoon, Professor Reid called me in again. 'There's a conference in Edinburgh in March,' she said. 'I'd like you to present this report there.'",
    words: {
      data: { english: 'данные' },
      conclusion: { english: 'вывод, заключение' },
      reacted: { english: 'отреагировала (react)' },
      otherwise: { english: 'иначе, в противном случае' },
      conference: { english: 'конференция' },
    },
    expressions: {
      'meet a deadline': { english: 'успеть к сроку' },
      'miss a deadline': { english: 'не успеть к сроку, сорвать срок' },
    },
    grammarNote:
      "«I should have checked the data again… I could have asked you» — should have / could have для сожаления о прошлом. А «I've made a mistake» — Present Perfect: результат важен сейчас, и make, а не do: make a mistake, но do the table again. И say / tell: «told her the truth», но «say nothing» — после tell сразу кому, после say — что.",
    comprehensionQuestions: [
      {
        question: 'What was wrong with the report?',
        options: ['It was late.', 'Ilya used the data from the wrong year.', 'It was too short.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Ilya first want to say nothing?',
        options: ['At his old job in Russia, people hid their mistakes.', 'He thinks the mistake is small.', 'Professor Reid is on holiday.'],
        correctIndex: 0,
      },
      {
        question: 'What does Professor Reid think about mistakes?',
        options: ['You should lose your job for them.', 'You should hide them.', 'Everyone makes them; what matters is being honest and fixing them.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-6',
    title: 'Six Months',
    titleTranslation: 'Полгода',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Blog post, six months: Small Victories. It's March, and the news is good. I haven't been homesick for three weeks, which is new for me. So here, for my friends in Perm, is a list of my small achievements, because I've learned that small victories are the ones that matter.\n\n" +
      "One: I understood something funny in Glaswegian. On the bus, Ruth's friend said something about the weather, everyone laughed, and I laughed too, at the right time. Two: I bought a bike, so I've cut down on buses, and I cycle to work on the new cycle lane by the river, even in the rain. Three: I went to the Russian-speaking group at the community centre, where all the children are bilingual, and now I play games there on Thursdays with a man from Kyiv and a woman from Almaty. Four: Ruth's mum asked me to dinner, and I ate haggis, and I was fine. Haggis has a stronger flavour than you think, and it's better than it sounds.\n\n" +
      "Five, and this is the big one: I presented my report at the conference in Edinburgh. When I arrived at the building, my hands were cold, but I talked for twenty minutes about pollution, water and climate change, and at the end, people raised their hands and asked questions, and I understood all of them. My English isn't perfect, and I'm not fluent yet, but for the first time, I felt like a real researcher, not like a foreigner. It was my biggest achievement.\n\n" +
      "Six: I lost my wallet on the way home from Edinburgh, and the police found it. The police in Scotland are very kind. An officer called me, and when I went to the police station, she gave it back with every pound still in it. In Perm, my friends don't believe this story.\n\n" +
      "Last weekend, I explored the Highlands for the first time, on a bus route that goes in the direction of the coast, past mountains and water. The landscape was so beautiful that I forgot to take photos. I sat by the window, too excited to take a nap, and thought: I could have stayed in Perm and never seen this. Then my phone rang. It was an email from Professor Reid, and it said: 'We would like to offer you a permanent position, with better conditions.' Ten minutes later, Katya called.",
    words: {
      achievements: { english: 'достижения (achievement)' },
      victories: { english: 'победы (victory)' },
      haggis: { english: 'хаггис (шотландское блюдо)' },
      fluent: { english: 'бегло (говорить на языке)' },
      explored: { english: 'исследовал, осмотрел (explore)' },
      route: { english: 'маршрут' },
      landscape: { english: 'пейзаж, ландшафт' },
    },
    expressions: {
      'cycle lane': { english: 'велодорожка' },
      'climate change': { english: 'изменение климата' },
    },
    grammarNote:
      "«the news is good» и «The police in Scotland are very kind» — повторение двух ловушек: news — единственное число (is), police — множественное (are). По-русски наоборот: «новости» — множественное, «полиция» — единственное. А «When I arrived at the building» — arrive at для здания, arrive in для города: I arrived in Glasgow.",
    comprehensionQuestions: [
      {
        question: 'Why does Ilya write a list of small victories?',
        options: ['To show that small successes matter and that life is getting better', 'To complain about Glasgow', 'To make his friends feel bad'],
        correctIndex: 0,
      },
      {
        question: 'What is the biggest achievement for Ilya?',
        options: ['Eating haggis', 'Buying a bike', 'Presenting his report and understanding all the questions'],
        correctIndex: 2,
      },
      {
        question: 'Why is the end of the post important?',
        options: ['Ilya loses his phone.', 'He gets a job offer, and then Katya calls.', 'The bus breaks down.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-7',
    title: 'The Magazine',
    titleTranslation: 'Журнал',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Katya had news too. Her uncle had found me a job at a company in Perm, a good job with a good salary, starting in June. 'You can come home,' she said, so happy that I couldn't say anything. I had to hand in my answer to the university by the end of April, and I had three weeks to choose between two lives. That week, the university magazine asked me to write for students who were thinking about moving abroad:\n\n" +
      "What I Wish I Had Known. Moving to another country is the hardest and best thing that I have ever done. It has benefits and disadvantages, and here is my advice. First, the paperwork will take longer than you expect, so start it in advance and ask someone who has done it. My visa and residence permit are valid for one year, and when they expire, I'll have to renew them, so I keep every letter. Second, you should have a plan for the loneliness, because it will come, usually in the second month. I should have joined groups earlier. I could have saved myself a lot of quiet evenings. Third, don't be afraid of mistakes, and you don't need to be fluent. People respect you more when you admit them, and small achievements will come.\n\n" +
      "The biggest advantage of living abroad is not the salary or the career. It's that you meet a different version of yourself. In Perm, I was a person who always met other people's expectations. In Glasgow, I've had to decide everything for myself, and I've discovered that I'm braver than I thought. One day, maybe, I'll apply for citizenship and a second nationality. Or maybe I'll go home. Either way, I won't regret this year, and that is its real advantage.\n\n" +
      "Ruth read the article and looked at me over her tea. 'You wrote maybe you'll go home,' she said. 'Do you agree with your own article?' 'I don't know,' I said. 'I agree with every word, and I still don't know.' 'Then go and see,' she said. 'You can't choose a place from a screen.'\n\n" +
      "On Thursday, I bought a plane ticket to Perm for one week in April. As the plane took off, I looked down at the grey landscape of the city that I had hated in my first week, and I realised that I was already missing it.",
    words: {
      valid: { english: 'действительный (о документе)' },
      expire: { english: 'истекать (о сроке действия)' },
      renew: { english: 'продлить (документ)' },
      advantage: { english: 'преимущество' },
      version: { english: 'версия, вариант' },
      citizenship: { english: 'гражданство' },
    },
    expressions: {
      'hand in': { english: 'сдать, подать (работу, ответ)' },
      'residence permit': { english: 'вид на жительство' },
    },
    grammarNote:
      "«I should have joined groups earlier. I could have saved myself a lot of quiet evenings» — сожаление о прошлом. А «the university magazine» — повторение ложного друга: magazine — «журнал», а не «магазин». И «Do you agree with your own article?» — agree — глагол, поэтому в вопросе do: Do you agree?, а не Are you agree?",
    comprehensionQuestions: [
      {
        question: 'What choice does Ilya have to make?',
        options: ['Between two universities in Scotland', 'Between a permanent job in Glasgow and a job back in Perm', 'Between two flats'],
        correctIndex: 1,
      },
      {
        question: "What is Ilya's main point in the article?",
        options: ['You discover a different, braver version of yourself.', 'It is only about money.', 'It is easy if you are clever.'],
        correctIndex: 0,
      },
      {
        question: 'What does Ruth think Ilya should do?',
        options: ['Stay in Glasgow without thinking', 'Write another article', 'Go to Perm and see how he feels there'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m7-8',
    title: 'One Year',
    titleTranslation: 'Один год',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Blog post, one year: Home. I arrived in Glasgow one year ago today, with two suitcases and one light jacket. Today I have a winter coat, a bike, a permanent contract and a residence permit that I renewed last week. Some of you have asked me about Perm, so here is the answer.\n\n" +
      "The week in Perm was beautiful and strange. My mum cooked every meal that I had missed, even her pickles, my old friends took me to the places of our childhood, and Katya and I walked by the river every evening. But the reality was that my identity had changed. I was more independent, and I noticed things that I had never noticed before: how fast everyone drove, how little people smiled at strangers, how much I missed small talk about the weather. I wasn't a foreigner in Perm, but I wasn't quite at home there either.\n\n" +
      "On the last evening, Katya and I talked for a long time, honestly, the way Ruth showed me. She didn't want to leave Perm, and I didn't want to leave Glasgow. It was the saddest talk of my life, but it wasn't an argument. We split up, but we chose to stay friends, and we keep each other up to date every Sunday. I'm supposed to feel that I've lost something, and sometimes I do. But mostly, I feel grateful.\n\n" +
      "So I handed in my answer to the university, and I said yes: I was going to settle in Glasgow. Professor Reid smiled. Dev took me out for a curry, and Ruth gave me a key to the flat with a small Scottish flag on it, in a little ceremony in the kitchen with tea and cake. 'Welcome home,' she said. 'You're not a sad potato any more.'\n\n" +
      "People ask me whether I should have moved, and whether I could have had an easier life in Perm. Maybe I could have. But I wouldn't have learned to ask for help, to admit my mistakes, to make a complaint with a polite note or to find friends in a community centre on a Thursday night. Some things remain difficult: the paperwork, the rain, my carbon footprint every time I fly home. But one year ago, I was a foreigner with a light jacket. Today, I'm a person who lives in Glasgow. That's the biggest achievement of all.",
    words: {
      reality: { english: 'реальность, действительность' },
      independent: { english: 'самостоятельный, независимый' },
      ceremony: { english: 'церемония' },
      remain: { english: 'оставаться' },
      settle: { english: 'обосноваться, поселиться' },
    },
    expressions: {
      "i'm supposed to": { english: 'я, по идее, должен (be supposed to)' },
      'carbon footprint': { english: 'углеродный след' },
    },
    grammarNote:
      "«People ask me whether I should have moved, and whether I could have had an easier life» — should have / could have в косвенном вопросе. И «I wouldn't have learned to ask for help» — would have + третья форма: так говорят о прошлом, которого не было. Весь курс в последнем абзаце: Present Perfect, условные, косвенная речь, придаточные — всё вместе в одной истории.",
    comprehensionQuestions: [
      {
        question: 'How did Ilya feel in Perm?',
        options: ['At home, like before', 'He had changed, and he was not quite at home there any more.', 'He hated it.'],
        correctIndex: 1,
      },
      {
        question: 'What did Ilya and Katya choose to do?',
        options: ['To stay friends, because they want to live in different places', 'To get married in Glasgow', 'To stop talking'],
        correctIndex: 0,
      },
      {
        question: "What does Ilya think is his biggest achievement?",
        options: ['His permanent contract', 'His new bike', 'That Glasgow is now his home and he belongs there'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
