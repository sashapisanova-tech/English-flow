import type { ReadingText } from '@/types/dutch';

const M = 'b1-startup' as const;
const MT = 'The Startup';

export const moduleB1_1Texts: ReadingText[] = [
  {
    id: 'b1m1-1',
    title: 'We Quit',
    titleTranslation: 'Мы уволились',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Three months ago, the three of us quit our jobs on the same day. My mum still isn't happy about it. 'You had a good salary, Hannah,' she says every Sunday. 'And now you sit in Josh's kitchen and drink coffee all day.' She isn't wrong about the coffee.\n\n" +
      "I'm Hannah, I'm 30, and I'm one of the founders of a startup. That still feels strange to me. The other two founders are Timur and Josh. We met at university in Leeds, and we've been friends for a decade now. Timur is from Ufa, and he's the quietest and cleverest person I know. He's been making apps since he was twelve. Josh is the opposite: loud and funny, and he can sell anything to anyone.\n\n" +
      "The idea came from a night out last year. We were standing outside a restaurant at closing time, and we saw the staff throw away bags and bags of good food. Timur said, 'Someone should make an app for this.' Josh said, 'Why not us?' And by the end of the evening, we managed to come up with a name: Leftovers. Restaurants sell their food cheaply at the end of the day, and people get a good dinner for three pounds.\n\n" +
      "Since then, we've been working on it every day. We've set up a company, we've used most of our savings, and Timur has made the first app. It works, mostly. We haven't made any money yet. If we don't find an investor soon, we'll have to find real jobs again.\n\n" +
      "Then, last night, an email arrived. 'Dear Hannah, I've heard about Leftovers, and I'd like to meet you. Can you present your idea to me on Friday? Diane Clarke.' Josh read it and shouted. Timur's face went white. 'Friday?' he said. 'That's in four days.'",
    words: {
      quit: { english: 'уволиться, бросить (работу)' },
      founders: { english: 'основатели (founder)' },
      startup: { english: 'стартап' },
      decade: { english: 'десятилетие, десять лет (не «декада» — 10 дней!)' },
      savings: { english: 'сбережения' },
      investor: { english: 'инвестор' },
    },
    expressions: {
      'come up with': { english: 'придумать (идею, название)' },
      'set up': { english: 'основать, создать (компанию)' },
    },
    grammarNote:
      "«We've been friends for a decade… He's been making apps since he was twelve» — Present Perfect (и Present Perfect Continuous для процесса) с for и since: действие началось в прошлом и продолжается сейчас. По-русски здесь настоящее время («мы дружим десять лет»), поэтому так хочется сказать We are friends for ten years — это ошибка. А decade — это десять лет, а не «декада».",
    comprehensionQuestions: [
      {
        question: "What does Hannah's mum think about the startup?",
        options: ["She's proud of it.", "She doesn't think it's a real job.", 'She wants to give them money.'],
        correctIndex: 1,
      },
      {
        question: 'How does the app work?',
        options: ['People can buy cheap food from restaurants before they throw it away.', 'Restaurants can find new staff.', 'People can learn to cook at home.'],
        correctIndex: 0,
      },
      {
        question: 'Why is Timur worried about the email?',
        options: ["He doesn't like Diane.", "He's ill.", 'They have very little time to prepare.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-2',
    title: 'The Pitch',
    titleTranslation: 'Презентация для инвестора',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "For four days, we hardly slept. Timur fixed problems in the app, I made the presentation, and Josh practised in front of the bathroom mirror. 'Have you been talking to yourself again?' Timur asked him on Thursday morning. 'I've been preparing,' Josh said. 'There's a difference.'\n\n" +
      "Diane Clarke's office was high up in a glass building near the station. She was about fifty, with short grey hair, and she looked at people very carefully. She's an investor. She has invested in more than thirty startups, and two of them are now huge companies. 'So you're the founders,' she said. 'You've got ten minutes. Show me what you've got.'\n\n" +
      "Josh started. He talked about the problem of food waste, about the restaurants in Leeds, about the next ten years. He was brilliant. Then Diane asked, 'How many users have you got?' 'Lots,' Josh said. 'Thousands, soon.' 'How many now?' Josh looked at me. 'Two hundred and forty,' I said. Diane wrote something down.\n\n" +
      "Then she turned to Timur. 'And you? You haven't said a word.' Timur was quiet for a moment. Then he showed her the app on his phone: the map, how you pay, the message the restaurant gets. He spoke slowly, but you could see he believed in every part of it. Diane watched carefully. 'That's impressive,' she said. 'And you've made all this alone?' 'Yes,' Timur said. 'In the evenings, at first.'\n\n" +
      "At the end, Diane sat back in her chair. 'I like the idea, and I like your team. But I can't invest in two hundred and forty users. Here's my offer. If you get a thousand users in six weeks, I'll invest. If you don't, I won't.' We left her office under pressure, with a target and a deadline. In the lift, Josh said, 'A thousand? Easy.' No one else said anything.",
    words: {
      presentation: { english: 'презентация' },
      invested: { english: 'инвестировала, вложила деньги (invest)' },
      users: { english: 'пользователи (user)' },
      impressive: { english: 'впечатляющий' },
      target: { english: 'цель (в цифрах), план' },
      deadline: { english: 'крайний срок, дедлайн' },
    },
    expressions: {
      'food waste': { english: 'пищевые отходы, выброшенная еда' },
      'under pressure': { english: 'под давлением, в напряжении' },
    },
    grammarNote:
      "«She has invested in more than thirty startups» — Present Perfect: опыт за всю жизнь, без даты. А «Diane's office was high up in a glass building» — Past Simple: рассказ о конкретном дне. И «Have you been talking to yourself again?» — Present Perfect Continuous: действие длилось до сих пор, и это видно. По-русски везде «ты разговаривал», а в английском три разные формы.",
    comprehensionQuestions: [
      {
        question: 'Why does Josh look at Hannah when Diane asks about users?',
        options: ["He doesn't know the number.", "He doesn't want to say the real number. It's small.", 'He wants Hannah to speak.'],
        correctIndex: 1,
      },
      {
        question: 'What does Diane like about Timur?',
        options: ['He clearly believes in the app he has made.', 'He talks a lot.', 'He has got a lot of money.'],
        correctIndex: 0,
      },
      {
        question: 'How do Hannah and Timur feel about the target?',
        options: ['They think it is easy, like Josh.', 'They are angry with Diane.', 'They are worried, but they say nothing.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-3',
    title: 'Launch Week',
    titleTranslation: 'Неделя запуска',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "We planned to launch the new app the next Monday. For the first time, restaurants all over Leeds could join, not only our first six. Josh visited forty restaurants in three days. Timur stayed up every night until three, working on new features. I wrote emails, posts and messages until my hands hurt. A thousand users was our target, and the deadline was getting closer every day.\n\n" +
      "On Monday morning, we launched it. At first, nothing changed. Then the first order arrived: a box of curry from a small Indian restaurant near the university, for £3.50. We all stood by Timur's laptop and shouted like our team won the World Cup. By the evening, we had forty new users.\n\n" +
      "The feedback was mostly positive. 'Brilliant idea!' 'I've saved so much money this week!' 'The pasta was better than my mum's.' But some people were not so happy. The map sometimes showed restaurants in the wrong place, and one man walked to a closed café two times. 'We've been working too fast,' Timur said. 'We need to fix this before we grow.' 'We need to grow before we run out of money,' Josh said. 'Or before our investor changes her mind.'\n\n" +
      "By Friday, we had 410 users. That was progress, but we were already falling behind. We needed a thousand in five weeks. I wrote our number on the fridge every morning. Every morning, it went up a little, and every morning, we looked at it and felt worse.\n\n" +
      "On Saturday, Josh came into the kitchen with a big smile. 'I've got great news,' he said. 'A reporter from the Leeds Daily wants to write an article about us. And I've told her we'll be the biggest food app in Yorkshire by Christmas.' Timur put down his coffee. 'You've told her what?'",
    words: {
      launch: { english: 'запустить (продукт, приложение)' },
      features: { english: 'функции, возможности (feature)' },
      feedback: { english: 'отзывы, обратная связь' },
      positive: { english: 'положительный' },
      progress: { english: 'прогресс' },
      reporter: { english: 'репортёр, журналист' },
      article: { english: 'статья' },
    },
    expressions: {
      'stayed up': { english: 'не ложился спать (stay up — засиживаться допоздна)' },
      'falling behind': { english: 'отставать (fall behind — отстать)' },
    },
    grammarNote:
      "«We've been working too fast» — Present Perfect Continuous: действие длилось какое-то время до сих пор, и результат виден сейчас (ошибки в приложении). По-русски «мы работали слишком быстро» — прошедшее время. А «I've told her we'll be the biggest…» — Present Perfect: Джош сделал это недавно, и это важно прямо сейчас.",
    comprehensionQuestions: [
      {
        question: 'What problem do some users have?',
        options: ['The food is cold.', 'The map is sometimes wrong.', 'The app is too expensive.'],
        correctIndex: 1,
      },
      {
        question: 'Why do Timur and Josh disagree?',
        options: ['Timur wants to fix problems first, and Josh wants to grow fast.', 'Josh wants to stop the app.', 'Timur wants more restaurants.'],
        correctIndex: 0,
      },
      {
        question: 'Why is Timur angry at the end?',
        options: ['A reporter is coming to the kitchen.', "Josh hasn't visited any restaurants.", "Josh has promised something they probably can't do."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-4',
    title: 'Say, Tell',
    titleTranslation: 'Сказать, рассказать',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "The reporter's name was Priti, and she came to Josh's kitchen on Monday. She was young, friendly and very good at her job. She asked about the idea, the team and the money. Josh did most of the talking. 'We've signed up a hundred restaurants,' he said. 'Fifty more are joining next month.' 'That's quite a claim,' Priti said, and she smiled. I looked at Timur. We had thirty restaurants. On a good day.\n\n" +
      "When Priti left, Timur closed the door very quietly. 'Why did you say that?' 'Say what?' 'A hundred restaurants. Josh, that isn't true.' 'It isn't true yet,' Josh said. 'It's what we're going to have. Investors like big numbers. Everyone does it.' He didn't admit anything. 'Not me,' Timur said. 'I don't tell lies to reporters.'\n\n" +
      "The article came out on Wednesday. The headline said 'Leeds Friends Change the Way We Eat'. There was a photo of the three of us, laughing in the kitchen, and there it was, in the second paragraph: 'According to the founders, Leftovers already works with more than a hundred restaurants across the city.' That day, we got 300 new users. The feedback was great. 'See?' Josh said. 'It works.'\n\n" +
      "On Thursday, the phone rang. It was a woman with a café on our list. 'I've been reading about you in the paper,' she said. 'A hundred restaurants? I've spoken to my friends in restaurants, and no one knows you. Is this some kind of game?' I apologised and told her the truth, but she wasn't convinced. 'To be honest,' she said, 'if you lie to the papers, you'll lie to me.' She left the app the same day.\n\n" +
      "That evening, Timur didn't come to the kitchen. He sent a message to the group chat: 'I need some time to think.' Josh read it and laughed. 'He'll be fine.' I wasn't so sure.",
    words: {
      claim: { english: 'заявление, утверждение (часто сомнительное)' },
      admit: { english: 'признать (вину, ошибку)' },
      headline: { english: 'заголовок (в газете)' },
      paragraph: { english: 'абзац' },
      apologised: { english: 'извинилась (apologise — извиняться)' },
      convinced: { english: 'убеждённый: she wasn\'t convinced — её это не убедило' },
    },
    expressions: {
      'according to': { english: 'по словам, согласно' },
      'to be honest': { english: 'честно говоря' },
    },
    grammarNote:
      "«Why did you say that?… I don't tell lies» — say и tell оба значат «сказать», но после tell почти всегда стоит, кому: tell her, tell me, а после say — нет: say that, say something. Устойчиво: tell lies, tell the truth, tell a story. По-русски «сказать» одно, поэтому частая ошибка — He said me. Правильно: He told me или He said to me.",
    comprehensionQuestions: [
      {
        question: 'What does Josh tell the reporter?',
        options: ['The true number of restaurants', 'A much bigger number of restaurants than they really have', 'That the app is closing'],
        correctIndex: 1,
      },
      {
        question: 'Why does the woman with the café leave the app?',
        options: ["She doesn't trust them now.", 'The food is not selling.', 'She is closing her café.'],
        correctIndex: 0,
      },
      {
        question: "How does Hannah feel about Timur's message?",
        options: ['She thinks it is funny.', 'She agrees with Josh.', 'She is worried about him.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-5',
    title: 'The Offer',
    titleTranslation: 'Предложение',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Timur came back on Monday, but something was different. He was polite and quiet, and he worked hard, as always. But he didn't laugh at Josh's funny stories, and he left at six every evening. 'He's angry,' Josh said. 'He'll get over it.'\n\n" +
      "Meanwhile, we had a bigger problem: money. I sat down with the bank statements and a pen and tried to figure out how long we could last. We had no income. Our expenses were small, but they were there every month: the internet, the phones, the website, a little rent for Josh's kitchen. 'If nothing changes,' I said, 'we've got enough money for five weeks.' 'Diane's deadline is in three,' Josh said. 'We'll be fine.'\n\n" +
      "We had 790 users. The number on the fridge was going up, but more slowly since the article came out. Two more restaurants left after the woman with the café talked to them. That was still progress, but slow. Josh was on the phone with restaurants all day, and I answered angry feedback.\n\n" +
      "On Wednesday, I came to the kitchen early and found Timur at the table, looking at his laptop. He closed it fast when he saw me. 'What's that?' I asked. He didn't answer at first. Then he opened it again. It was an email from a big computer company in London. 'We are pleased to offer you the position of Senior Developer. Salary: £85,000.'\n\n" +
      "I sat down. 'How long have you been talking to them?' 'Two weeks,' he said. 'I didn't ask for this job. They found me.' He looked tired. 'Hannah, I've been doing two jobs for months. I've used all my savings. My parents keep asking me when I'll get a real job. I don't know what to do.' 'Does Josh know?' I asked. Timur said no. 'Not yet.'",
    words: {
      meanwhile: { english: 'тем временем, между тем' },
      statements: { english: 'выписки (bank statement — банковская выписка)' },
      income: { english: 'доход' },
      expenses: { english: 'расходы (expense)' },
      position: { english: 'должность, позиция' },
    },
    expressions: {
      'get over': { english: 'пережить, оправиться от чего-то' },
      'figure out': { english: 'понять, вычислить, разобраться' },
    },
    grammarNote:
      "«How long have you been talking to them?» — вопрос How long… + Present Perfect Continuous: сколько времени длится то, что ещё продолжается. По-русски «Как долго ты с ними разговариваешь?» — настоящее время, а в английском нельзя How long are you talking — только have you been talking.",
    comprehensionQuestions: [
      {
        question: 'Why is money a problem?',
        options: ['They have used too much on parties.', 'They earn nothing, and their savings are almost gone.', 'Diane wants her money back.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Timur close his laptop?',
        options: ["He doesn't want Hannah to see the job offer.", 'He is playing a game.', 'The laptop is not working.'],
        correctIndex: 0,
      },
      {
        question: 'Why is Timur thinking about the new job?',
        options: ['He hates the app.', 'He wants to move to London.', 'He is tired, he has no money, and his family is worried.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-6',
    title: 'The Argument',
    titleTranslation: 'Ссора',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Josh found out on Friday. Timur left his laptop open on the kitchen table, and Josh saw the email. When Timur came back from the shop, Josh was standing by the window with the laptop in his hands. 'The position in London,' he said. 'Eighty-five thousand. When were you going to tell us?'\n\n" +
      "'I haven't said yes,' Timur said. 'You haven't said no either. Make up your mind, Timur.' Josh put the laptop down hard. 'We've been working on this for a year. We quit our jobs together. And now, two weeks before the deadline, you want to leave? You've let us down.' 'Don't blame me,' Timur said. 'You want to talk about honesty? You told a reporter we had a hundred restaurants. We've lost five because of that. You've been lying to everyone, and I've been fixing your problems at three in the morning. I'm fed up with it.' 'Admit it,' Josh said. 'You've been looking for a way out.'\n\n" +
      "Josh's face went red. He was furious. 'I've been selling this app every day while you sat behind your screen. Without me, no one knows about this app—' 'Stop,' I said. They both looked at me. 'Please. Both of you.' But no one was listening any more. They were shouting, then interrupting each other, then saying awful things. Things about money, about families, about who was more important.\n\n" +
      "In the end, Timur took his coat. 'To be honest, maybe Diane was right,' he said quietly. 'Maybe this was never a real company. Just three friends playing a game.' He walked out and closed the door behind him.\n\n" +
      "Josh sat down at the table and put his head in his hands. The kitchen was very quiet. On the fridge, our number said 860. Fourteen days left. I looked at Josh, and for the first time in a decade, I didn't know what to say to him.",
    words: {
      honesty: { english: 'честность' },
      blame: { english: 'винить, обвинять' },
      furious: { english: 'в ярости, взбешённый' },
      interrupting: { english: 'перебивая (interrupt — перебивать)' },
    },
    expressions: {
      'make up your mind': { english: 'решись, определись' },
      'fed up': { english: 'сыт по горло, надоело (be fed up with)' },
    },
    splitExpressions: [
      { word1: 'let', word2: 'down', display: 'let … down', english: 'подвести (кого-то)' },
    ],
    grammarNote:
      "«We've been working on this for a year. We quit our jobs together» — Present Perfect Continuous (работаем год и до сих пор) и Past Simple (уволились в конкретный момент). По-русски «мы работаем над этим год» — настоящее время, а в английском — have been working, не we work.",
    comprehensionQuestions: [
      {
        question: 'How does Josh find out about the job offer?',
        options: ['Timur tells him.', 'Hannah tells him.', "He sees the email on Timur's laptop."],
        correctIndex: 2,
      },
      {
        question: 'What does Timur say about Josh?',
        options: ['He works harder than anyone.', "He hasn't told the truth, and Timur has to fix the problems.", 'He is a good friend.'],
        correctIndex: 1,
      },
      {
        question: 'How does Hannah feel at the end?',
        options: ["For the first time, she doesn't know what to say to Josh.", 'She is happy the argument is over.', 'She is angry with Timur.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-7',
    title: 'A Decade',
    titleTranslation: 'Десять лет',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "For three days, no one spoke. Josh didn't answer his phone, and Timur's messages were short and polite. The app kept working, but no one was there to take care of it. Users wrote to us about problems, and I didn't know how to fix them. The number on the fridge went up to 890, then stopped.\n\n" +
      "On Tuesday, I took the train to Timur's flat. He opened the door in an old T-shirt. He looked very tired. 'Have you said yes to the job?' I asked. 'Not yet,' he said. 'They want an answer by Friday.' 'You don't have to make up your mind today,' I said. We sat in his small kitchen, and he made tea the way his grandmother does in Ufa, with jam. For a long time, we didn't talk about the startup. We talked about university, about the night we got lost in the Lake District, about Josh's awful first car.\n\n" +
      "'Do you remember,' Timur said, 'when my dad was ill, in our second year? Josh drove me to the airport at four in the morning. He lent me money for the ticket. He never asked for it back. I'm still grateful.' 'I remember,' I said. 'He's been a good friend for a decade, Timur. He's not good at honesty, and he's a bad liar. But you can rely on him.' Timur smiled for the first time. 'He's a terrible liar.'\n\n" +
      "Then I told him the truth. 'I don't want Leftovers without you. Josh doesn't want it either, but he can't say it. If you take the job, I'll understand. After all, you've given more than any of us.' 'I see what you mean,' Timur said, and he looked at his tea for a long time. 'Do you think he'll forgive me? I said awful things.' 'He said them too. I think you both regret it.'\n\n" +
      "That evening, I got a message from Josh. Not to the group, just to me. 'I've been thinking. I was wrong about the restaurants. I want to tell Diane the truth before the deadline. And I want to say sorry to Timur. I'm not furious any more. Do you think he'll listen?'",
    words: {
      grateful: { english: 'благодарный' },
      liar: { english: 'лжец, врун' },
      forgive: { english: 'простить' },
      regret: { english: 'сожалеть, жалеть о чём-то' },
    },
    expressions: {
      'take care of': { english: 'заботиться о, присматривать за' },
      'rely on': { english: 'полагаться на, рассчитывать на' },
      'after all': { english: 'в конце концов, всё-таки' },
      'i see what you mean': { english: 'понимаю, о чём ты' },
    },
    grammarNote:
      "«He's been a good friend for a decade» — Present Perfect с for: так было десять лет и так есть сейчас. Decade — «десятилетие», а не «декада» (десять дней): это ложный друг. А «Josh drove me to the airport… He lent me money» — Past Simple: конкретные события в прошлом.",
    comprehensionQuestions: [
      {
        question: 'Why does Hannah visit Timur?',
        options: ['To ask him to come back and to tell him how she feels', 'To bring him his laptop', 'To ask about the job in London'],
        correctIndex: 0,
      },
      {
        question: 'What does the story about the airport show?',
        options: ['Josh is a bad driver.', 'Josh helped Timur a lot when things were difficult.', "Timur's father lives in London."],
        correctIndex: 1,
      },
      {
        question: "What is new about Josh's message?",
        options: ['He wants to close the app.', 'He is angry with Hannah.', 'He says he was wrong and wants to fix things.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m1-8',
    title: 'One Thousand',
    titleTranslation: 'Тысяча',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Thursday, the three of us were back in Josh's kitchen. Josh made coffee, badly, as always. He didn't wait. 'Timur, I'm sorry,' he said. 'I told the reporter lies, and you paid for them. I've been a bad friend.' Timur looked at him for a long moment. 'Yes,' he said. 'You have. But I forgive you. And I'm grateful for a decade of friendship.' Then he smiled. 'I've told the company in London no.'\n\n" +
      "We had one week and 110 users to go. This time, we made a plan together. Timur fixed the map in two days. Josh called every restaurant on our list, and this time he told them the truth: 'We're small, we're new, and we'll work hard for you.' To our surprise, it worked better than the lies. The woman with the café came back too. 'Honesty,' she said. 'Was that so difficult?'\n\n" +
      "On Monday, the deadline, we were at 970. All day, we sat by the laptop and watched the number. 981. 994. At six o'clock, the phone rang. It was Diane, our investor. 'I've read the article,' she said. 'And I've spoken to some restaurants.' I couldn't breathe. 'Before you say anything,' Josh said, 'that article was wrong, and it was my fault.' No one said anything. Then Diane laughed. 'I know. Founders don't often say sorry. That's rare. Did you reach your target?' Timur looked at the screen. 'One thousand and six users.'\n\n" +
      "We signed the agreement a week later. Diane invested enough for a year, and we agreed on clear roles. Timur's job is to be in charge of the app. Mine is to be responsible for the money. Josh sells, but Timur checks his numbers. 'Every number,' Timur says. I was so relieved that I slept for twelve hours.\n\n" +
      "My mum came to the launch party in Leeds. She ate a box of curry for £3.50 and said it was the best food she has ever had for three pounds. 'So,' she said. 'You quit a good job for this. It's a real job now?' 'It's always been a real job, Mum.'",
    words: {
      fault: { english: 'вина: it was my fault — это была моя вина' },
      rare: { english: 'редкий' },
      agreement: { english: 'соглашение, договор' },
      roles: { english: 'роли, обязанности (role)' },
      relieved: { english: 'испытывающий облегчение' },
    },
    expressions: {
      'be in charge of': { english: 'отвечать за, руководить' },
      'be responsible for': { english: 'быть ответственным за' },
    },
    grammarNote:
      "«I've been a bad friend… I've told the company in London no» — Present Perfect: важен результат сейчас (Тимур остаётся). А «We signed the agreement a week later» — Past Simple: конкретный момент. И в конце: «It's always been a real job» — Present Perfect с always: так было всегда и так есть сейчас. По-русски «это всегда была настоящая работа» — прошедшее время.",
    comprehensionQuestions: [
      {
        question: 'What is different about how Josh talks to restaurants now?',
        options: ['He tells them the truth about the app.', 'He promises them more money.', "He doesn't talk to them."],
        correctIndex: 0,
      },
      {
        question: 'Why does Diane laugh on the phone?',
        options: ['She thinks the app is silly.', 'She already knew, and she likes that Josh says it was his fault.', 'She is happy about the article.'],
        correctIndex: 1,
      },
      {
        question: 'How has the team changed at the end?',
        options: ['Josh has left the startup.', 'They have moved to London.', 'Everyone has a clear job, and Timur checks the numbers.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
