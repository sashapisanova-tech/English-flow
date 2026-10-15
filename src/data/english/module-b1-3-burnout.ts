import type { ReadingText } from '@/types/dutch';

const M = 'b1-burnout' as const;
const MT = 'Burnout';

export const moduleB1_3Texts: ReadingText[] = [
  {
    id: 'b1m3-1',
    title: 'Night Shift',
    titleTranslation: 'Ночная смена',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Tuesday, twenty to four in the morning. I've just come home from a night shift of twelve hours at the hospital, and I'm too exhausted to sleep. It makes no sense. My name is Emma, I'm 33, and I've been a nurse in Sheffield for ten years. I used to love my job, and I used to come home after a shift tired but happy, eat something, watch a film and fall asleep in five minutes. Now I stay awake in bed and think about every patient, every mistake and every little thing that I forgot to do.\n\n" +
      "Lately, I can't switch off, even at home, because my head is still at work, and when I finally fall asleep, I see the hospital in my sleep. 'It's insomnia,' my sister says. 'A nurse with insomnia needs to take a break.' But nurses don't take breaks. There are not enough of us, so I do overtime almost every week, and when my manager asks me to do more overtime, I always say yes.\n\n" +
      "Tuesday, quarter past six. I gave up trying to sleep and went outside to put the rubbish in the bin, and on the stairs I met my neighbour from the flat opposite. His name is Lev, he's about 35, and he works with money for a big company in the centre. He was wearing a suit and carrying a laptop bag, and his face looked just like mine, grey and exhausted. 'Going to work already?' I asked. 'I start at seven now,' he said. 'I used to start at nine, but there's too much work, and my boss sends emails at twelve at night.'\n\n" +
      "We stood on the stairs for a minute, two tired people in a cold building. 'How do you cope with night shifts?' he asked. 'I don't,' I said. 'Not any more. Lately, I don't cope with anything.' He laughed, but it wasn't a happy laugh. 'Do you know how many days I've worked without a day off?' he asked. 'Two hundred and twelve. I worked it out last night, because I couldn't sleep either.'\n\n" +
      "Then he looked at his watch, said sorry and ran down the stairs. I went back to bed and stayed there until the sun came up, thinking about his number: two hundred and twelve days.",
    words: {
      shift: { english: 'смена (на работе)' },
      exhausted: { english: 'измотанный, без сил' },
      lately: { english: 'в последнее время' },
      insomnia: { english: 'бессонница' },
      overtime: { english: 'сверхурочная работа, переработка' },
      cope: { english: 'справляться (cope with — справляться с)' },
    },
    expressions: {
      'switch off': { english: 'отключиться, расслабиться (перестать думать о работе)' },
      'fall asleep': { english: 'заснуть' },
      'take a break': { english: 'сделать перерыв, отдохнуть' },
    },
    grammarNote:
      "«I used to love my job» — used to + глагол: так было раньше, а теперь нет. По-русски «раньше я любила свою работу» — слово «раньше» и прошедшее время, а в английском всё это в одной конструкции used to. В отрицании и вопросе — did: I didn't use to start at seven. И «I gave up trying to sleep» — после give up глагол с -ing: give up doing, а не give up to do.",
    comprehensionQuestions: [
      {
        question: "What is different about Emma's life now?",
        options: ['She has a new job.', 'She can no longer stop thinking about work at home.', 'She sleeps more than before.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Emma do so much overtime?',
        options: ['There are not enough nurses, and she always says yes.', 'She needs the money for a holiday.', 'Her sister asks her to.'],
        correctIndex: 0,
      },
      {
        question: 'What does Lev think about his work, from what he says?',
        options: ['He loves it more than ever.', 'He wants to work at the hospital.', "It's too much now, and he hasn't had a day off for a long time."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-2',
    title: 'Two Hundred and Twelve Days',
    titleTranslation: 'Двести двенадцать дней',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Lev Morozov had been in Sheffield for six years, and for the first five, he had liked his job very much. He came from Novosibirsk and had studied numbers at university there, and in England he found work at a company that looked after the money of other companies. He used to finish at five, go to the gym, play games online with his brother and call his mum every Sunday. He used to cook real dinners. Now he ate toast standing up, and he hadn't called his mum for a month.\n\n" +
      "The problem was the workload. It had grown every month since his boss, Graham, lost two people from the team and didn't find new ones. The workload was now his. Lev now had eighteen clients instead of ten, and every client thought that their work was urgent. His schedule was full from seven in the morning until nine at night, with lots of overtime, and he still couldn't keep up with his emails. There was no space in his schedule to take a break. Everything was a priority, so nothing was a priority.\n\n" +
      "On Wednesday, after another night with three hours of sleep, he sat in a meeting with Graham and two important clients. The room was warm, the client was talking about numbers in a slow voice, and Lev's eyes closed for a second. When he opened them, everyone was looking at him. 'Lev,' Graham said, 'you're supposed to be presenting the report.' Lev's face went hot. He had been working on that report until two in the morning, because he couldn't switch off or fall asleep, and now he couldn't remember the first word of the report.\n\n" +
      "After the meeting, Graham called him into his office. Lev expected bad news, but Graham smiled. 'You're my best person, Lev,' he said, 'so I've got good news. From next week, you're going to take over two more clients from the team in Leeds. It's a stressful time for everyone, but I know you can do it.'\n\n" +
      "Lev wanted to say no. He wanted to say that he was exhausted, that he couldn't keep up, that he had forgotten what it felt like to rest. Instead, he heard himself say, 'Of course, Graham. No problem.' On the way home, he tried to remember the last time that he had said no to anything, and he couldn't.",
    words: {
      workload: { english: 'нагрузка, объём работы' },
      clients: { english: 'клиенты (client)' },
      urgent: { english: 'срочный' },
      schedule: { english: 'расписание, график' },
      priority: { english: 'приоритет' },
      report: { english: 'отчёт, доклад' },
      stressful: { english: 'напряжённый, стрессовый' },
    },
    expressions: {
      'keep up with': { english: 'успевать за, справляться с потоком' },
      "you're supposed to": { english: 'ты должен (так положено, ожидается)' },
    },
    grammarNote:
      "«He used to finish at five, go to the gym… Now he ate toast standing up» — used to + глагол для привычек в прошлом, которых больше нет. А «He had been working on that report until two in the morning» — Past Perfect Continuous: действие длилось до другого момента в прошлом. По-русски «он работал над отчётом до двух ночи» — простое прошедшее, а в английском видно, что это было до встречи и долго.",
    comprehensionQuestions: [
      {
        question: "Why is Lev's work so hard now?",
        options: ['He has a new boss.', 'His team is smaller, so he has many more clients.', 'He has moved to Leeds.'],
        correctIndex: 1,
      },
      {
        question: "Why does Lev's face go hot in the meeting?",
        options: ['He fell asleep for a moment, and now he must present.', 'The room is too warm.', 'Graham is angry about the clients.'],
        correctIndex: 0,
      },
      {
        question: 'What does Graham think about Lev?',
        options: ['He thinks Lev is lazy.', 'He thinks Lev needs a holiday.', 'He thinks Lev is his best worker and can do more.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-3',
    title: 'Ten Signs',
    titleTranslation: 'Десять признаков',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Thursday, during the only break of ten minutes that I had in a long shift, I sat in the staff room with a cup of tea and read an article that someone had put on the wall. Usually I don't read anything on that wall, but the first words stopped me.\n\n" +
      "Ten signs of burnout. Burnout is not just being tired: it comes when stress at work goes on for months, and in general, people who care a lot about their work are at the highest risk. Typical symptoms include: you feel exhausted after sleep; you can't switch off; you used to enjoy your job, but now you dread it; you get ill more often; you forget small things; you feel that nothing you do is good enough. What can help? Talk to someone. Try to cut down on overtime. Change your lifestyle slowly, not all at once. If the symptoms continue, see your GP, and get some professional advice. Asking a doctor for advice is normal.\n\n" +
      "When I checked, I had eight of the ten symptoms, maybe nine. I tried to remember the last time that I had enjoyed a shift, and I couldn't. I tried to remember the last time that I had eaten lunch sitting down, and I couldn't remember that either. In general, I'm a person who looks after other people, so I'm not very good at noticing when I need looking after.\n\n" +
      "My manager, Maria, came into the staff room and saw me with the article. She read it over my shoulder and then looked at me for a long time. 'Emma,' she said, 'how many of those have you got?' 'A few,' I said. 'How many?' 'Eight.' She sat down next to me. 'You're taking two weeks off. Starting on Monday. I've already found someone to cover your shifts.' 'But we haven't got enough nurses—' 'That's not advice, Emma. That's an order. If you burn out, I'll lose you for months, not two weeks.'\n\n" +
      "I wanted to argue, but I was too tired. On the bus home, I read the article again on my phone, and I stopped at one part of it: you used to enjoy your job, but now you dread it.",
    words: {
      burnout: { english: 'выгорание (эмоциональное)' },
      symptoms: { english: 'симптомы (symptom)' },
      typical: { english: 'типичный' },
      dread: { english: 'бояться, с ужасом ждать (чего-то)' },
      lifestyle: { english: 'образ жизни' },
      professional: { english: 'профессиональный' },
    },
    expressions: {
      'in general': { english: 'в целом, вообще' },
      'cut down on': { english: 'сократить, уменьшить (количество чего-то)' },
    },
    grammarNote:
      "«Try to cut down on overtime… I tried to remember the last time» — try to + глагол: «пытаться, стараться что-то сделать». А «you used to enjoy your job» — после enjoy глагол всегда с -ing: enjoy working, а не enjoy to work. И advice — неисчисляемое: some advice, professional advice, но никогда не an advice. По-русски «совет» — обычное исчисляемое слово, поэтому эта ошибка очень частая.",
    comprehensionQuestions: [
      {
        question: 'What does the article say about burnout?',
        options: ['It comes from long stress at work and is more than being tired.', 'Only nurses get it.', 'You can fix it in one weekend.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Maria tell Emma to take two weeks off?',
        options: ['There are too many nurses.', 'Emma asked for a holiday.', 'She is afraid of losing Emma for a much longer time.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Emma read the last part again on the bus?',
        options: ["She doesn't understand it.", 'It says how she feels about her job now.', 'She wants to show it to Lev.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-4',
    title: 'The Bet',
    titleTranslation: 'Пари',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Saturday morning, I met Lev on the stairs again, and he was carrying a bag from a sports shop, and I was carrying nothing, because for the first time in years, I had no plans. I told him about the article, my eight symptoms of burnout and Maria's order. 'Two weeks off,' I said. 'I'm going to do nothing. I'm going to sleep, walk and stop thinking about the hospital.'\n\n" +
      "'I am not agree,' Lev said, looking at me. 'Sorry, my English. I don't agree.' 'You've got it,' I said. 'In English, you just say I agree or I don't agree. But why don't you agree?' 'Because doing nothing doesn't solve anything,' he said. 'In my opinion, the problem isn't my workload. The problem is that I'm not efficient. If I'm more efficient, I'll finish everything and rest later.' He showed me what was in the bag: a new clock and a book called The Productive Morning. 'I'm going to get up at five, do twenty minutes of meditation, plan my day and stop wasting time. I've got an advice for you too.' 'Some advice,' I said, smiling. 'Not an advice.' 'Some advice, then. Make an effort. Don't just lie on the sofa.'\n\n" +
      "I didn't doubt that he meant it, but I had real doubts about his plan. Lev was the most ambitious person in our building, and ambitious people often try to fix being tired with more work. On the other hand, my plan wasn't perfect either, because I have never been good at doing nothing. I used to feel guilty on my days off, when I was ill too.\n\n" +
      "'Let's make a bet,' Lev said. 'Two weeks. You try your way, I try mine. Then we'll see who feels better.' 'And the winner?' 'The loser cooks dinner for the winner.' We shook hands on the stairs like two people at work.\n\n" +
      "That night, I fell asleep at ten for the first time in months, and I didn't wake up until nine. When I opened my door, there was a note on it from Lev: 'Day 1. Got up at 5. Meditated. Answered 40 emails before 8. Very productive. Feeling great!' Under it, he had drawn a small, tired face.",
    words: {
      efficient: { english: 'эффективный, продуктивный (о работе без потерь)' },
      productive: { english: 'продуктивный' },
      meditation: { english: 'медитация' },
      doubt: { english: 'сомневаться; сомнение' },
      ambitious: { english: 'амбициозный, целеустремлённый' },
      guilty: { english: 'виноватый: feel guilty — чувствовать вину' },
    },
    expressions: {
      'in my opinion': { english: 'по-моему, на мой взгляд' },
      'make an effort': { english: 'постараться, приложить усилие' },
      'on the other hand': { english: 'с другой стороны' },
    },
    grammarNote:
      "«I am not agree… I don't agree» — agree по-английски глагол, поэтому без am: I agree, I don't agree, do you agree? По-русски «я согласен» — прилагательное с «быть», отсюда частая ошибка I am agree. А «stop wasting time», «good at doing nothing» — после stop и после предлога (at) глагол стоит в форме -ing.",
    comprehensionQuestions: [
      {
        question: "What is Lev's opinion about his problem?",
        options: ['He needs a holiday.', "He isn't efficient enough, so he needs to work better.", 'He needs a new job.'],
        correctIndex: 1,
      },
      {
        question: "Why does Emma talk about Lev's English?",
        options: ["To help him with 'agree' and 'advice'.", 'Because she is angry with him.', 'Because he asked her to.'],
        correctIndex: 0,
      },
      {
        question: "What does the small tired face on Lev's note probably show?",
        options: ['Lev is very happy with his first day.', 'Lev wants to stop the bet.', 'Lev is not as fine as his words say.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-5',
    title: 'Inbox',
    titleTranslation: 'Входящие',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "By the end of the first week, Lev had been getting up at five every day, and his inbox looked like this:\n\n" +
      "From: Graham Hart. Monday, 23:14. Subject: The Leeds clients. Lev, as we discussed, you're going to take over the Leeds clients from Monday. Please confirm. I've sent their information as an attachment. Thanks, G.\n\n" +
      "From: Lev Morozov. Tuesday, 05:32. Subject: RE: The Leeds clients. Hi Graham, I confirm. I'll get back to you about the information by lunch. Lev.\n\n" +
      "From: Graham Hart. Wednesday, 22:50. Subject: Urgent request. Lev, one more request: the Leeds team needs the report by Friday instead of next Wednesday. I know it's a lot. Can you reply tonight? G.\n\n" +
      "Lev replied at 23:05, then at 01:40, and again at 04:55, before his new clock woke him. The meditation app showed four missed days in a row, and the book about productive mornings was still on the kitchen table with a coffee cup on it. He was efficient, but it didn't help, because every hour that he saved, Graham filled with more work. He felt frustrated, then angry, then nothing at all, and the nothing frightened him more than being angry.\n\n" +
      "On Thursday evening, he got into the lift in our building and couldn't remember which floor was his. He stood there for a whole minute, looking at the numbers, until I came in with my shopping and chose four for both of us. His hands were cold. 'Lev,' I said, 'are you OK?' 'I'm fine,' he said. 'I'm just a bit tired. I'm being very productive.' Then he looked at the floor. 'I can't remember the last time I enjoyed anything. Is that OK?'\n\n" +
      "I didn't know what to say, so I said the only true thing. 'No,' I said. 'It isn't. And I know, because I used to feel just the same.'",
    words: {
      inbox: { english: 'входящие (почта)' },
      confirm: { english: 'подтвердить' },
      attachment: { english: 'вложение (в письме)' },
      request: { english: 'просьба, запрос' },
      replied: { english: 'ответил (reply — отвечать)' },
      frustrated: { english: 'раздражённый, расстроенный (от бессилия)' },
    },
    expressions: {
      'take over': { english: 'взять на себя (чужую работу, клиентов)' },
      'get back to': { english: 'ответить позже, вернуться к кому-то с ответом' },
      'in a row': { english: 'подряд' },
    },
    grammarNote:
      "«By the end of the first week, Lev had been getting up at five every day» — Past Perfect Continuous: действие повторялось какое-то время до момента в прошлом. А «I didn't know what to say» в конце — вопросительное слово + to + глагол: what to say, how to cope, which floor to choose. По-русски «какую кнопку нажать» — тоже инфинитив, и здесь английский похож на русский.",
    comprehensionQuestions: [
      {
        question: "What do Graham's emails show about Lev's work?",
        options: ['Graham keeps giving him more work, often late at night.', 'Graham wants Lev to rest.', 'Graham is going to Leeds.'],
        correctIndex: 0,
      },
      {
        question: "Why doesn't being efficient help Lev?",
        options: ["The meditation app doesn't work.", 'He is not really efficient.', 'Every hour he saves, Graham gives him more work.'],
        correctIndex: 2,
      },
      {
        question: 'What frightens Lev most?',
        options: ['The lift', 'Feeling nothing at all', 'Graham'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-6',
    title: 'The Allotment',
    titleTranslation: 'Огород',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Day 3. I'm bad at resting. I used to want free time so much, and now that I've got it, I don't know what to do with it. This morning I cleaned the kitchen two times, answered three messages from work and felt guilty about all of them, because a productive day is the only kind of day that I know. In the afternoon, I tried to take a nap, but I stayed in bed thinking about the patients in the hospital, and the nap never came.\n\n" +
      "Day 5. My gran had an allotment outside the city, and since she died, it has belonged to my mum. She never goes there. Today I took the bus out and worked for four hours in the rain, pulling up weeds. My back hurts, my hands are dirty, and for four hours, I didn't think about the hospital once. What a relief. I didn't know that weeds could be so pleasant, and I didn't have to make an effort to stop thinking.\n\n" +
      "Day 8. Gradually, something is changing. I've been sleeping eight hours a night, five nights in a row, and I've been going to the allotment every morning. Yesterday I went for a long walk in the countryside near Edale, on a path that went up into the wild hills, and I walked for five hours without once checking my phone. At the end of the path, I shouted into the empty sky, just to let off steam. A sheep looked at me as if I was very strange, and I laughed for the first time in weeks.\n\n" +
      "Day 11. From time to time, I still feel anxious about work, and I still wake up at three sometimes, but it isn't every night now. I've started to remember why I wanted to be a nurse: I like helping people, and I'm good at it. I just can't help anyone when I'm empty.\n\n" +
      "Day 12, 3.10 in the morning. I woke up and couldn't fall asleep again, so I went to the window to look at the night. On the balcony opposite, there was a light. Lev was sitting out there in his suit, with his laptop on his legs, in the cold, at three in the morning. He wasn't working. He was just sitting there, looking at nothing.",
    words: {
      nap: { english: 'короткий сон днём: take a nap — вздремнуть' },
      allotment: { english: 'огород, участок (арендуемый в городе)' },
      relief: { english: 'облегчение' },
      pleasant: { english: 'приятный' },
      gradually: { english: 'постепенно' },
      weeds: { english: 'сорняки (weed)' },
    },
    expressions: {
      'let off steam': { english: 'выпустить пар, дать выход эмоциям' },
      'from time to time': { english: 'время от времени, иногда' },
    },
    grammarNote:
      "«I've started to remember why I wanted to be a nurse» — после start можно и to, и -ing: start to remember = start remembering. А «I like helping people» — после like обычно -ing, когда речь о том, что нравится вообще. По-русски после «начать» и «любить» — всегда инфинитив, а в английском форма зависит от глагола, и её надо запоминать вместе с ним.",
    comprehensionQuestions: [
      {
        question: 'Why is resting difficult for Emma at first?',
        options: ['She is used to being busy, and she feels guilty doing nothing.', 'Her flat is too noisy.', 'She has to work at the allotment.'],
        correctIndex: 0,
      },
      {
        question: 'What helps Emma most?',
        options: ['Answering messages from work', 'Working with her hands outside and long walks without her phone', 'Watching films'],
        correctIndex: 1,
      },
      {
        question: 'What does Emma see at the end, and what does it suggest?',
        options: ['Lev is working hard, so his plan is working.', 'Lev is having a party.', 'Lev is sitting alone at night, so he is not well.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-7',
    title: 'The Balcony',
    titleTranslation: 'Балкон',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "I put on a coat, went out on my own balcony and called his name quietly, so that I didn't wake the neighbours. He looked up, surprised, and then he gave me a tired smile. 'You won the bet,' he said. 'I've been sitting here for an hour. I opened my inbox to answer an email, and I couldn't read it. The words didn't mean anything, and I felt so frustrated.'\n\n" +
      "The gap between our balconies was small, and we talked across the gap for a long time, quietly, like two people in a hospital at night. 'I used to love numbers,' he said. 'Since I was a child in Novosibirsk, they were my favourite thing, and now I can't look at a table of numbers without feeling sick. I've been telling myself that it's just a busy time. For a year.'\n\n" +
      "'Honestly, Lev,' I said, 'I think you should see a doctor. And maybe a therapist.' He laughed. 'A therapist? I'm not depressed. I'm just tired. In Russia, my grandmother used to say that being tired is for people with too much free time.' 'With love to your grandmother,' I said, 'that's not true. From my point of view, as a nurse, you've got every symptom on that article. Burnout isn't your fault. It comes when a good worker carries too much for too long.'\n\n" +
      "He was quiet for a long time, and I could see that he wanted to argue, but I could also see that he was too tired to win the argument, and I knew that feeling very well. 'Therapy,' he said at last. 'My mum is going to be so worried.' 'Your mum will be happy that you're looking after yourself,' I said, and I tried to persuade him the way I persuade nervous patients: slowly, with facts, and without pushing.\n\n" +
      "Finally, he said yes. 'OK. I'll change my mind about one thing. I'll see my GP on Monday, and then maybe you can show me your allotment.' 'It's a relief to hear that,' I said. Then he opened his laptop again, and this time he started to write. 'What are you writing?' I asked. 'An email to Graham,' he said. 'I've been avoiding it for a year.'",
    words: {
      gap: { english: 'промежуток, расстояние' },
      honestly: { english: 'честно говоря, честно' },
      therapist: { english: 'психотерапевт' },
      depressed: { english: 'в депрессии, подавленный' },
      therapy: { english: 'терапия, психотерапия' },
      persuade: { english: 'убеждать, уговаривать' },
    },
    expressions: {
      'point of view': { english: 'точка зрения' },
      'change my mind': { english: 'передумать (change your mind)' },
    },
    grammarNote:
      "«I used to love numbers… my grandmother used to say» — used to для того, что было раньше и прошло. А «I've been avoiding it for a year» — после avoid всегда -ing: avoid doing, а не avoid to do. Так же после enjoy, finish, mind, give up. По-русски «избегать делать» — инфинитив, поэтому такие глаголы стоит запомнить списком.",
    comprehensionQuestions: [
      {
        question: 'Why does Lev say that Emma won the bet?',
        options: ['His plan has failed: he is worse, not better.', 'Emma cooked him dinner.', 'He has a new job.'],
        correctIndex: 0,
      },
      {
        question: "What is Emma's opinion about burnout?",
        options: ['People get it because they are lazy.', 'Good people get it when they carry too much work for a long time.', 'It is just a busy time.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Lev start to write at the end?',
        options: ['He wants to finish a report.', 'He is answering a client.', 'He wants to write to Graham about his situation.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m3-8',
    title: 'Balance',
    titleTranslation: 'Баланс',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "This is the email that Lev sent at 4.20 that morning. He showed it to me the next day:\n\n" +
      "From: Lev Morozov. Subject: My workload. Dear Graham, I have to take responsibility for my health, so I'm writing to you honestly. I've been working without a day off for 223 days. I can't keep up with eighteen clients and the Leeds team, and I can't take over any more work. My workload is too big, and I've had insomnia for months. I'm seeing my doctor on Monday. I want to keep doing a good job for you, but I need a workload that a person can achieve. Can we talk this week? Lev.\n\n" +
      "He expected Graham to be angry, but instead, Graham called him at nine. 'Lev,' he said, 'I'm sorry. I didn't realise. You always said yes, so I assumed you were fine. I've been under pressure too, and I passed it to you. Take two weeks off, and when you come back, we'll give the Leeds clients to someone new. You deserve it.' Lev put the phone down and sat on the stairs, and I sat next to him. 'I deserve it,' he said, as if he couldn't believe it.\n\n" +
      "Three months later, a lot has changed. Lev works four days a week now, he can switch off in the evenings, and on Fridays he comes to the allotment with me and grows very bad carrots. He achieves more in four days than he used to achieve in six, he sees a therapist every two weeks, and the therapy has helped with the burnout more than any productive morning, he calls his mum every Sunday again, and he has started playing games online with his brother. I went back to the hospital, but I've started to say no to some overtime and to extra shifts, and Maria encourages me to take my breaks. I don't always manage it, but I appreciate that she tries, and Lev appreciates his new boss too.\n\n" +
      "Last Saturday, Lev cooked dinner for me, because I had won the bet. 'Is this the winner's dinner?' I asked, looking at the carrots. 'This is the winner's dinner,' he said, and he lifted his glass of water. 'To work-life balance.' 'To work-life balance,' I said. 'And to good neighbours. They cheer you up when nothing else does.'",
    words: {
      achieve: { english: 'достичь, выполнить' },
      deserve: { english: 'заслуживать' },
      encourages: { english: 'поощряет, поддерживает (encourage)' },
      appreciate: { english: 'ценить, быть благодарным' },
      carrots: { english: 'морковь (carrot)' },
    },
    expressions: {
      'take responsibility for': { english: 'взять ответственность за' },
      'work-life balance': { english: 'баланс работы и личной жизни' },
      'cheer you up': { english: 'поднимают настроение (cheer up)' },
    },
    grammarNote:
      "«I've been working without a day off for 223 days» — Present Perfect Continuous с for: действие началось давно и продолжается до сих пор. А «I want to keep doing a good job… he has started playing games» — keep и start с -ing: keep doing — «продолжать», start doing — «начать». По-русски после этих глаголов инфинитив, а в английском — форма на -ing.",
    comprehensionQuestions: [
      {
        question: "Why does Lev write the email to Graham?",
        options: ['To ask for more clients', 'To ask for a smaller workload because of his health', 'To leave the company'],
        correctIndex: 1,
      },
      {
        question: "Why didn't Graham notice Lev's problem before?",
        options: ['Lev always said yes, so Graham thought he was fine.', 'Graham was on holiday.', 'Lev worked from home.'],
        correctIndex: 0,
      },
      {
        question: 'What does Emma think is important at the end?',
        options: ['Earning more money', 'Working every day', 'A good balance and people near you'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
