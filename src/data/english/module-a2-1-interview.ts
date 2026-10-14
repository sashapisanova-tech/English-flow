import type { ReadingText } from '@/types/dutch';

const M = 'a2-interview' as const;
const MT = 'The Job Interview';

export const moduleA2_1Texts: ReadingText[] = [
  {
    id: 'a2m1-1',
    title: 'One Week to Go',
    titleTranslation: 'Осталась неделя',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Three weeks ago, I sent my CV to forty companies in London. I'm Kirill, I'm 26, and I'm from St Petersburg. I moved to London last year. I usually work at home on my computer, and some days I only talk to my cat. I wanted a job in an office, with people.\n\n" +
      "Nobody answered. Then, last Friday, I got an email: 'Can you come for an interview next Friday at ten?' I read it three times, and after that I couldn't sit down or eat my breakfast.\n\n" +
      "My flatmate Femi helps people find jobs, so I showed her the email. 'Kirill, that's great news!' she said. 'You've got one week to get ready. Tell me: what experience have you got?' 'Four years. Apps for shops, cafés, even a bank.' 'Not bad. Now tell me about a time you were wrong.' 'I'm never wrong,' I said. Femi laughed. 'Yesterday you put salt in your tea! Actually, they always ask that in interviews.'\n\n" +
      "Now it's Sunday evening. Femi is sitting on the sofa with a list of fifty questions, and I'm standing in the kitchen in my best shirt. 'What if I make a mistake?' I ask. 'Then you make a mistake. Just do your best. Question one: tell me about yourself.' In Russian, I could talk about my work for hours. In English, I can't say a word.",
    words: {
      CV: { english: 'резюме' },
      companies: { english: 'компании, фирмы (company)' },
      interview: { english: 'собеседование (при приёме на работу)' },
      ago: { english: 'назад (three weeks ago — три недели назад)' },
      experience: { english: 'опыт (работы)' },
      actually: { english: 'вообще-то / на самом деле (не «актуально»!)' },
    },
    expressions: {
      'make a mistake': { english: 'ошибиться / сделать ошибку (make, не do)' },
      'do your best': { english: 'постараться изо всех сил / сделать всё, что можешь' },
    },
    grammarNote:
      "«Three weeks ago, I sent my CV… Last Friday, I got an email» — Past Simple с указанием, когда это было. ago ставится после срока: three weeks ago — «три недели назад», а last Friday идёт без предлога: не on last Friday. А could — прошедшее от can: I could talk about my work for hours, I couldn't sit down — «мог / не мог».",
    comprehensionQuestions: [
      {
        question: 'Why did Kirill send his CV to companies in London?',
        options: ['He wanted to work with people, not only with his cat.', "He didn't have a job.", 'Femi asked him to do it.'],
        correctIndex: 0,
      },
      {
        question: 'How did Kirill feel after he read the email?',
        options: ['He was tired and wanted to sleep.', 'He was angry about the time.', 'He was so happy that he forgot about food.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Femi laugh?',
        options: ['Kirill wears his best shirt in the kitchen.', 'Kirill says he is never wrong, but yesterday he was.', 'Kirill has got only four years of experience.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-2',
    title: 'Six Pages',
    titleTranslation: 'Шесть страниц',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Monday morning, Femi read my CV, and it took her ten minutes. 'Kirill, it's six pages long,' she said. 'And why is there a photo of your cat?' 'He's in all my photos,' I said.\n\n" +
      "Femi took a pen. 'In the UK, a CV is two pages. One is better. Make sure they see the important things first: your skills and your experience.' We started with my first job. Eight years ago, I worked in my uncle's computer shop in St Petersburg. I sold phones and laptops, and I made tea for everyone. 'Don't write about the tea,' Femi said.\n\n" +
      "Then she asked, 'What can you say about yourself?' I wrote: 'I am hard-working and friendly.' 'No, no, no,' said Femi. 'Everyone writes that. Show it. When did you improve something?' I thought for a long time, and then I remembered: last year, I made a slow app ten times faster. 'Yes! Put that in. And prepare an example for every skill. At least one.'\n\n" +
      "At twelve at night, my CV was one page, and the cat was gone. I felt like a new man. Femi is usually right about these things. Then I opened the job advert again and read it to the end: 'We want someone with experience in games.' Games. I don't make games. I never did.",
    words: {
      skills: { english: 'навыки, умения (skill)' },
      'hard-working': { english: 'трудолюбивый' },
      improve: { english: 'улучшать / улучшить' },
      prepare: { english: 'подготовить / готовиться' },
      example: { english: 'пример' },
      advert: { english: 'объявление (job advert — объявление о вакансии)' },
    },
    expressions: {
      'make sure': { english: 'убедиться / проследить, чтобы…' },
      'at least': { english: 'как минимум / хотя бы' },
    },
    grammarNote:
      "«Eight years ago, I worked… I sold phones… I made tea» — Past Simple для того, что было и закончилось. У правильных глаголов окончание -ed (worked, started), а неправильные нужно запомнить: sell → sold, make → made, take → took. И заметьте: make tea, но do a job — по-русски в обоих случаях «делать», а в английском глагол выбирают по слову.",
    comprehensionQuestions: [
      {
        question: "What is the problem with Kirill's CV?",
        options: ["There's nothing about his experience.", "It's much too long.", "It's in Russian."],
        correctIndex: 1,
      },
      {
        question: 'Why does Femi want an example for every skill?',
        options: ['An example shows that the words on a CV are not empty.', 'The company asks for ten examples.', 'Kirill has got only one skill.'],
        correctIndex: 0,
      },
      {
        question: 'How does Kirill feel at the end?',
        options: ['Happy, because his CV is ready', 'Tired, because it is late', "Not happy any more: the job is about games, and he doesn't make them"],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-3',
    title: 'Coffee and a Stranger',
    titleTranslation: 'Кофе и незнакомец',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Tuesday, I didn't go to bed. I sat at my computer all night and made a tiny game. In the game, a cat runs from table to table and eats yoghurts. At four in the morning, Femi came into the kitchen for some water. She played it for ten minutes. 'It's silly,' she said, 'but I couldn't stop!'\n\n" +
      "On Wednesday morning, I went to a café near the station with my eyes half closed. I took my coffee, turned, and suddenly walked into a man in a white shirt. All my coffee went on his shirt. 'I'm so sorry!' I said. My face was red.\n\n" +
      "The man looked at his shirt, then at his phone: it was wet, and it didn't work. 'Great,' he said. 'I've got a meeting in twenty minutes.' I took his phone, turned it off and opened it. Two minutes later, I fixed it. The man smiled for the first time. 'Thank you. What do you do?' 'I make apps,' I said. 'Actually, I'm looking for a job.' But he was in a hurry, and he left before I could say more.\n\n" +
      "Then I saw a card on the floor. He left it by mistake. I picked it up and read it. There was the name of a company on it, and I knew that name. It was in my interview email.",
    words: {
      tiny: { english: 'крошечный' },
      silly: { english: 'глупый, дурацкий (по-доброму)' },
      suddenly: { english: 'вдруг, внезапно' },
      meeting: { english: 'встреча, совещание' },
      fixed: { english: 'починил (fix — чинить, исправлять)' },
    },
    expressions: {
      'in a hurry': { english: 'в спешке, торопясь' },
      'by mistake': { english: 'случайно, по ошибке' },
    },
    splitExpressions: [
      { word1: 'picked', word2: 'up', display: 'pick … up', english: 'поднимать (с пола), подбирать' },
    ],
    grammarNote:
      "«He left before I could say more» — could здесь значит «смог / успел», это прошедшее от can. А «I'm looking for a job» — Present Continuous: Кирилл ищет работу сейчас, в этот период жизни. По-русски «я ищу» — одна форма на всё, а в английском I look for — «обычно, вообще», I'm looking for — «сейчас».",
    comprehensionQuestions: [
      {
        question: "What does Femi think about Kirill's game?",
        options: ["It's a bit silly, but she can't stop playing.", "It's too difficult for her.", "She doesn't like cats."],
        correctIndex: 0,
      },
      {
        question: "Why is Kirill's face red?",
        options: ['He ran to the café.', 'He feels bad about the coffee on the man.', 'The coffee is too hot.'],
        correctIndex: 1,
      },
      {
        question: 'Why is the card important?',
        options: ['The man is from St Petersburg.', 'The man wants a new phone.', 'The man works where Kirill wants to work.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-4',
    title: 'Mrs Brown',
    titleTranslation: 'Миссис Браун',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Wednesday evening, Femi put on her mum's old glasses and sat at the kitchen table. 'Good evening. I'm Mrs Brown, and I'm strict,' she said. 'I never smile at interviews.' She didn't smile.\n\n" +
      "'Tell me about yourself.' This time, I could answer. I talked about my uncle's shop, my apps and my silly cat game. 'What are your skills?' 'I can fix almost anything. This morning, I fixed a man's phone in a café.' 'And what are you bad at?' 'Coffee,' I said. Femi forgot about Mrs Brown and laughed.\n\n" +
      "Then she asked about mistakes. 'When I did a mistake…' I started. 'Stop. You make a mistake, but you do a job,' she said. 'Again.' We practised for two hours. She asked about my colleagues, my last app and my plans. 'You can be good at apps and bad at interviews,' she said. 'Give me an example every time.' When I looked at the floor, she said, 'Look at me. Be confident. You know this.' When I spoke too fast, she said, 'Calm down. Breathe.'\n\n" +
      "At eleven, an email arrived from the company: 'Dear Kirill, can we change the time? Can you come tomorrow, Thursday, at nine?' Tomorrow. Nine o'clock. I looked at Femi. Femi took off her glasses.",
    words: {
      strict: { english: 'строгий' },
      colleagues: { english: 'коллеги (colleague)' },
      practised: { english: 'тренировались (practise — британское написание глагола)' },
      confident: { english: 'уверенный (в себе)' },
    },
    expressions: {
      'be good at': { english: 'хорошо уметь что-то, быть сильным в чём-то' },
      'calm down': { english: 'успокоиться' },
    },
    grammarNote:
      "«You make a mistake, but you do a job» — make обычно про то, что создаётся (make tea, make an app, make a mistake), а do — про работу и задания (do a job, do your best). По-русски и то и другое «делать», поэтому I did a mistake — частая ошибка. Запомните целиком: make a mistake.",
    comprehensionQuestions: [
      {
        question: 'Why does Femi wear glasses and not smile?',
        options: ['She is tired after work.', 'She is playing a strict person from the company.', 'She is angry with Kirill.'],
        correctIndex: 1,
      },
      {
        question: 'What is different from Sunday evening?',
        options: ['Now Kirill can talk about himself.', 'Now Femi has got fifty questions.', 'Now Kirill speaks in Russian.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Femi take off her glasses at the end?',
        options: ['She wants to go to bed.', 'Kirill answered every question well.', 'The interview is now tomorrow, not on Friday.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-5',
    title: 'Delayed',
    titleTranslation: 'Поезд задерживается',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Thursday, I got up at six. I put on my best shirt and left the flat at seven. The interview was at nine, so I had two hours. 'Easy,' I thought.\n\n" +
      "At the station, the board said 'Delayed'. The platform was crowded, and people couldn't move. After twenty minutes, a train came, but I couldn't get on. When I got off at last, my phone took me down the wrong street, then down the wrong street again. Now I know: you can get lost in London with a phone too. Suddenly, it started to rain. I ran. My shirt was wet, my hair was wet, and my CV was wet too.\n\n" +
      "At four minutes to nine, I arrived at a tall glass building. I was on time. Only just. 'Calm down,' I told myself. A woman at the desk said, 'Fifth floor,' and I ran to the tiny lift. Just before the doors closed, a man came in. His shirt was white. Well, white and brown.\n\n" +
      "He looked at me. I looked at him. It was the man from the café. 'Ah,' he said. 'The phone man. Are you here for the interview?' 'Yes. I'm Kirill.' He smiled. 'Nice to meet you, Kirill. I'm Daniel. I'm doing your interview.'",
    words: {
      delayed: { english: 'задерживается (о поезде, рейсе)' },
      platform: { english: 'платформа' },
      crowded: { english: 'переполненный, людный' },
      lift: { english: 'лифт (британское; в США — elevator)' },
    },
    expressions: {
      'get lost': { english: 'заблудиться' },
      'on time': { english: 'вовремя' },
    },
    grammarNote:
      "«I arrived at a tall glass building» — arrive at: приехать в конкретное место (здание, станцию), а arrive in — в город или страну: arrive in London. Не arrive to! По-русски всегда «приехать в», а в английском предлог зависит от места.",
    comprehensionQuestions: [
      {
        question: 'Why does Kirill think the morning is going to be easy?',
        options: ['He has got a lot of time before the interview.', 'The station is near the flat.', 'Femi is going with him.'],
        correctIndex: 0,
      },
      {
        question: 'What goes wrong after the train?',
        options: ['Kirill takes a taxi.', 'Kirill buys a new shirt.', "Kirill's phone sends him the wrong way."],
        correctIndex: 2,
      },
      {
        question: 'Who is the man in the lift?',
        options: ['A man from the station', 'The man from the café, and he is doing the interview', "Femi's colleague"],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-6',
    title: 'Not on the List',
    titleTranslation: 'Не по списку',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Daniel took me to a small room with a big window. I had Femi's fifty answers in my head, and I tried to look confident. But Daniel didn't ask any of Femi's questions.\n\n" +
      "'So, you fix phones in cafés,' he said. 'Let's find out what other things you can do.' I showed him my cat game. He played it for five minutes and didn't say a word. Then he laughed. 'My children love things like this.'\n\n" +
      "Then he opened his laptop. 'This is our app. Three days ago, it suddenly got slow, and my team couldn't work out why. Here's a task for you. You've got fifteen minutes.' I looked at the screen. For ten minutes, I found nothing, and my hands were cold. 'Calm down,' I thought. Then I saw it: one tiny mistake, one small letter in the wrong place. Somebody made it last week, and no one noticed. I showed Daniel. He looked surprised, and he called a woman from his team. She looked at the screen for a long time. 'He's right,' she said. She didn't smile.\n\n" +
      "At the door, Daniel said, 'Thanks for coming, Kirill. We can tell you on Monday.' The woman looked at me. 'There's one more person for this job,' she said. 'She's coming at two. And she's very good.'",
    words: {
      task: { english: 'задание, задача' },
      screen: { english: 'экран' },
      noticed: { english: 'заметил(и) (notice — замечать)' },
      surprised: { english: 'удивлённый' },
    },
    expressions: {
      'find out': { english: 'узнать, выяснить' },
      'work out': { english: 'понять, разобраться, вычислить' },
    },
    grammarNote:
      "«My team couldn't work out why» — couldn't: «не смогли», прошедшее от can't. А «Three days ago, it suddenly got slow» — get здесь значит «стать»: got slow — «стало медленным», got wet — «промок». По-русски это разные глаголы, а в английском часто одно get.",
    comprehensionQuestions: [
      {
        question: 'How is the interview different from the plan?',
        options: ["Daniel asks all of Femi's questions.", 'Daniel wants to see what Kirill can do, not hear answers.', 'The interview is in Russian.'],
        correctIndex: 1,
      },
      {
        question: 'What does Kirill do with the app?',
        options: ["He finds the problem that Daniel's team couldn't find.", 'He makes it look nicer.', 'He makes it into a game.'],
        correctIndex: 0,
      },
      {
        question: 'How does Kirill feel at the end?',
        options: ["He's sure that the job is his.", "He's angry with Daniel.", "He's nervous about the other person."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-7',
    title: 'Waiting',
    titleTranslation: 'Ожидание',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Friday, I got up at five, but there was no email. I looked at my phone every five minutes, and I couldn't think about my work. Femi came home at six. 'Any news?' 'Nothing.' 'Then let's go out. You can't sit and wait all evening.'\n\n" +
      "We went to the café near the station. Yes, that café. It was crowded, but we found a table, and I told Femi everything. 'I spoke too fast. I didn't answer your questions. And two days ago, I put coffee on the boss's shirt.' 'Never mind the coffee,' Femi said. 'You said he looked surprised. His team couldn't work out the problem, and you did. In fifteen minutes. They probably remember that.' 'Maybe. But I expect the other person has got more experience.' 'You don't know that. You don't know her.'\n\n" +
      "I was worried, and Femi knew it. So she talked about other things: her work, her sister, a really bad film. We stayed for ages. For one hour, I forgot about the interview. Then I said, 'I wonder what Daniel is doing now.' 'Kirill!' Femi said.\n\n" +
      "At nine, an email arrived. It was from Daniel. I couldn't open it. I gave my phone to Femi. She read it, and her face changed.",
    words: {
      probably: { english: 'вероятно, наверное' },
      expect: { english: 'ожидать; думать, предполагать (I expect… — наверное, …)' },
      worried: { english: 'обеспокоенный: I was worried — я волновался' },
      wonder: { english: 'интересоваться, задаваться вопросом (I wonder… — интересно, …)' },
    },
    expressions: {
      'never mind': { english: 'неважно, забудь, ничего страшного' },
      'for ages': { english: 'очень долго, целую вечность (разговорное)' },
    },
    grammarNote:
      "«Any news?» — news в английском неисчисляемое и единственного числа: The news is good, а не are. Нельзя сказать a news — только some news или a piece of news. По-русски «новости» — множественное число, отсюда частая ошибка.",
    comprehensionQuestions: [
      {
        question: 'Why does Femi want to go out?',
        options: ['She wants Kirill to stop waiting for the email.', 'There is no food in the flat.', 'She wants to meet Daniel.'],
        correctIndex: 0,
      },
      {
        question: 'What does Femi think is important about the interview?',
        options: ['Kirill spoke too fast.', 'Kirill found the problem in the app.', 'The coffee on the shirt.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Kirill give his phone to Femi?',
        options: ['His phone is wet again.', 'Femi wants to see a film.', 'He is too nervous to read the email.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m1-8',
    title: 'The Answer',
    titleTranslation: 'Ответ',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Femi read the email to me. 'Dear Kirill, thank you for coming on Thursday. We are giving the job to another person. She has got ten years of experience…' I closed my eyes: I prepared for a week, and this was the answer. I felt so disappointed. 'Wait,' Femi said. 'Listen. There's more.'\n\n" +
      "'…but actually, we don't want to lose you. Last year, we planned an app with games for children. We couldn't find the right person. Then I played a tiny game about a cat. My team loved it, and my children played it all evening. Can you come on Monday and talk about a new job? Daniel. And sorry about the coffee. It was my mistake too.'\n\n" +
      "I read it three times. 'No way,' I said. Then I suddenly stood up and shouted, and everyone in the café looked at me. My face was red again. 'Femi, you were right. Every example, every skill, every question.' 'No,' she said. 'Daniel didn't ask any of my questions. You did your best, and they saw it.' 'I was so worried for nothing,' I said. Femi just smiled. She looked proud.\n\n" +
      "On Monday, I found out the rest: Daniel offered me the job. In the end, nothing went to plan, and that was fine. Probably the best week of my life. In the evening, Femi put on her glasses. 'Tell me about yourself,' she said. 'I'm Kirill,' I said. 'I'm 26, and I make games for children. With cats.'",
    words: {
      disappointed: { english: 'разочарованный, расстроенный' },
      shouted: { english: 'закричал (shout — кричать)' },
      proud: { english: 'гордый: she looked proud — она выглядела гордой' },
      offered: { english: 'предложил (offer — предлагать)' },
    },
    expressions: {
      'no way': { english: 'не может быть! / ни за что (разговорное)' },
      'in the end': { english: 'в итоге, в конце концов' },
    },
    grammarNote:
      "«Daniel didn't ask any of my questions» — в отрицаниях и вопросах Past Simple время показывает did, а глагол остаётся в простой форме: didn't ask, а не didn't asked. По-русски прошедшее время всегда в самом глаголе, поэтому так и хочется поставить -ed дважды. А в утверждении — снова форма прошедшего: You did your best, and they saw it.",
    comprehensionQuestions: [
      {
        question: 'How does Kirill feel when he hears that the job is going to another person?',
        options: ['Very happy', 'Disappointed', 'Angry with Femi'],
        correctIndex: 1,
      },
      {
        question: 'Why does Daniel want to see Kirill again?',
        options: ['He wants to say sorry about the coffee.', 'He wants Kirill to fix his phone.', 'He thinks Kirill is right for a new job with games.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Femi say that her questions were not important?',
        options: ['Kirill got the job because of what he showed, not his answers.', 'Her questions were too difficult.', 'Daniel asked other people.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
];
