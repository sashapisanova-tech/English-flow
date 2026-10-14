import type { ReadingText } from '@/types/dutch';

const M = 'a2-influencer' as const;
const MT = 'The Influencer Experiment';

export const moduleA2_5Texts: ReadingText[] = [
  {
    id: 'a2m5-1',
    title: 'The Bet',
    titleTranslation: 'Пари',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "It started at Sunday lunch at my parents' house. My brother Misha looked at my phone and laughed. 'Let me guess: you're on social media again. Have you ever done any real work, Nastya? You're on social media all day, and you just show off your clothes.' 'Being an influencer is real work,' I said. 'It's harder than your job.' Misha is 24, and he works with computers, so he thinks he knows everything.\n\n" +
      "'OK,' he said. 'Let's see. How many followers have you got?' I looked. 'Three hundred and twelve.' 'Get ten thousand followers in a month, and I'll wash your dishes for a year. If you don't, you'll wash mine.' 'Deal,' I said. Mum said nothing, and Dad asked for more potatoes.\n\n" +
      "I'm Nastya. I'm 20, I'm from Omsk, and I study fashion in Newcastle. I've posted photos of my fashion ideas for years, but I've never really tried to be an influencer. That evening, I told my flatmate Grace about our bet. 'Ten thousand?' she said. 'In a month? No way!' Then she smiled. 'Well, have a go. I'm looking forward to it.' 'I will,' I said. 'And I've already started. I've just made a plan.'\n\n" +
      "That wasn't true, because I didn't have a plan. I had a phone, a lot of clothes and thirty days, and a brother with a lot of dirty dishes.",
    words: {
      influencer: { english: 'инфлюенсер, блогер' },
      followers: { english: 'подписчики (follower)' },
      already: { english: 'уже (I\'ve already started — я уже начала)' },
      bet: { english: 'пари, спор (на что-то)' },
      fashion: { english: 'мода' },
      ever: { english: 'когда-нибудь (в вопросах: Have you ever…?)' },
    },
    expressions: {
      'social media': { english: 'соцсети' },
      'have a go': { english: 'попробовать, рискнуть' },
    },
    grammarNote:
      "«I've posted photos for years, but I've never really tried» — Present Perfect (have + третья форма): опыт до сегодняшнего дня, без точного «когда». А «That evening, I told my flatmate» — Past Simple: есть конкретное время (that evening). По-русски в обоих случаях прошедшее время, а в английском выбор зависит от того, сказано ли «когда».",
    comprehensionQuestions: [
      {
        question: 'Why does Misha laugh at Nastya?',
        options: ["He doesn't think social media is real work.", 'She has got a lot of followers.', 'She is late for lunch.'],
        correctIndex: 0,
      },
      {
        question: "What will Nastya do if she doesn't get 10,000 followers?",
        options: ['She will give Misha her phone.', 'She will wash his dishes for a year.', 'She will stop using social media.'],
        correctIndex: 1,
      },
      {
        question: "Why does Nastya tell Grace she has a plan?",
        options: ['She really has a good plan.', 'Grace asks for the plan.', "She doesn't want to look silly, but there is no plan."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-2',
    title: 'Forty Likes',
    titleTranslation: 'Сорок лайков',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Monday, Grace and I made my first video, and I showed three ways to wear one jumper. Grace had the camera, and we practised and filmed it eleven times. 'Have you posted it yet?' she asked at twelve at night. 'Not yet. I'm scared.' 'Just post it!' I closed my eyes and touched 'post'.\n\n" +
      "The next morning, the video had forty likes and two comments. One comment was from my mum: 'Beautiful! But where is your coat? The forecast says it's cold!' The other comment was from Misha: 'Only 9,688 to go.' It was embarrassing, so I put my phone under my bed.\n\n" +
      "'You should post every day,' Grace said. 'And you have to talk to your audience, not just show clothes. The best influencers tell a story.' 'What story? I haven't done anything interesting yet.' Grace thought. 'Have you ever told anyone about your first day in England?' 'You mean when I took the wrong train to Scotland?' 'Yes! That's a story. A good story makes people come back.'\n\n" +
      "That evening, I filmed a short video about the train, and I laughed in the middle. By Wednesday, I had 500 followers, and I felt more confident. Then Grace showed me her phone. 'Look. Everyone is doing this new dance trend. Have you seen it? It's got thousands of views already, and the views are going up every minute. You should take part in it.' 'I can't dance,' I said. 'You don't have to be keen on dancing,' Grace said. 'You just have to do it.'",
    words: {
      yet: { english: 'ещё (в вопросах и отрицаниях: not yet — ещё нет)' },
      comments: { english: 'комментарии (comment)' },
      scared: { english: 'напуганный: I\'m scared — мне страшно' },
      story: { english: 'история, рассказ' },
      trend: { english: 'тренд' },
      views: { english: 'просмотры (view)' },
    },
    expressions: {
      'take part in': { english: 'участвовать в чём-то' },
      'be keen on': { english: 'очень любить, увлекаться чем-то' },
    },
    grammarNote:
      "«Have you posted it yet? — Not yet» — yet ставится в конце вопросов и отрицаний: «уже? / ещё нет». А already — в утверждениях, обычно между have и третьей формой: It's got thousands of views already / I've already started. По-русски «уже» одно слово на всё, а в английском в вопросе — yet, а не already.",
    comprehensionQuestions: [
      {
        question: "What does Misha's comment mean?",
        options: ['He likes the video.', 'Nastya still needs a lot more followers.', 'He wants a new jumper.'],
        correctIndex: 1,
      },
      {
        question: 'What advice does Grace give?',
        options: ['Tell a story about yourself, not only show clothes.', 'Stop posting for a week.', 'Buy a better camera.'],
        correctIndex: 0,
      },
      {
        question: 'Why is Nastya not sure about the trend?',
        options: ['She has got no time.', 'She thinks it is boring.', 'She is not a good dancer.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-3',
    title: 'The Dance',
    titleTranslation: 'Танец',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "I have never been so embarrassed in my life, and Grace wasn't embarrassed at all. She filmed me in the kitchen, and I did the dance twenty times, but my arms went left when everyone else's went right. 'Go on!' Grace said. 'One more time!' At the end, I fell over the cat.\n\n" +
      "We posted the video at ten, and by eleven, my phone didn't stop. Notification after notification. Two thousand people watched it in one hour, and three hundred of them started to follow me. Most of the comments were about the cat. 'This is the worst dance I've ever seen, and I love it,' someone wrote. 'Is the cat OK?' wrote another. A few comments were rude, but it didn't matter. People noticed me.\n\n" +
      "By Friday, I had 1,400 followers, more than ever before. But it was still far from ten thousand, and I had only three weeks left. 'You should do another trend,' Grace said. 'And another. And another.' 'Every day? My arms hurt.' I realised it was a long way, and that ten thousand was still far.\n\n" +
      "That night, I looked at the app for hours. Then I saw an advert: 'Want more followers? 1,000 followers for £10! Fast and easy!' It looked weird, and a bit too good to be true. Weird things often are. But it was only ten pounds. I showed Grace. She looked at it, then at me. 'Nastya,' she said. 'Don't.'",
    words: {
      embarrassed: { english: 'смущённый: I was embarrassed — мне было стыдно' },
      notification: { english: 'уведомление' },
      follow: { english: 'подписаться (на кого-то в соцсетях); следовать' },
      weird: { english: 'странный (разговорное)' },
      far: { english: 'далеко (far from — далеко от)' },
    },
    expressions: {
      'go on': { english: 'давай! продолжай!' },
      'fell over': { english: 'споткнулась, упала (fall over)' },
    },
    grammarNote:
      "«This is the worst dance I've ever seen» — после превосходной степени (the worst, the best) английский использует Present Perfect с ever: the best film I've ever seen. По-русски «худший танец, который я видел» — прошедшее время, поэтому хочется сказать I ever saw. Так говорят в Америке, но в британском английском — I've ever seen.",
    comprehensionQuestions: [
      {
        question: 'Why do people like the video?',
        options: ['Nastya is a very good dancer.', 'The dance goes wrong in a funny way.', 'The kitchen is beautiful.'],
        correctIndex: 1,
      },
      {
        question: 'What is the problem after Friday?',
        options: ['Nastya still needs a lot more followers.', 'People write bad comments.', 'The cat is ill.'],
        correctIndex: 0,
      },
      {
        question: "What does Grace mean when she says 'Don't'?",
        options: ['Do not post another dance.', 'Do not go to bed late.', 'Do not pay for followers.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-4',
    title: 'Fake',
    titleTranslation: 'Фальшивка',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "I did it anyway. On Saturday morning, Grace went to work, and I opened the link. I had to sign up with my email and give the password to my account, so I wasn't very careful. It took two minutes, and then the app said, 'Your order is ready.' I watched the number: 1,500, 1,800, 2,200… By lunch, I had 2,400 followers, and my account looked great. Ten pounds from my budget, and I could afford it, I thought.\n\n" +
      "I felt great for about an hour. Then I posted a new photo, and I waited. Before, I always got some comments: something funny from a stranger, a question about my jumper. This time, there were no notifications. Nothing. Two thousand new followers, and not one of them said a word. I looked at their profiles. They had strange names, like 'user84629', and they all had the same photo of a beach. It was weird. They weren't real people. They were just numbers.\n\n" +
      "When Grace came home, she saw my face. 'You've done it, haven't you?' 'Yes,' I said. 'I've paid for followers. And now I feel worse than before.' 'Why?' 'Because it's a lie. They don't know me, and they aren't interested. I trusted a strange link with my password.' I was scared that everyone could see it.\n\n" +
      "Then a message arrived from Misha: 'Wow, 2,400 already! That's strange. Your new followers all have the same picture. Have you bought them?'",
    words: {
      link: { english: 'ссылка' },
      password: { english: 'пароль' },
      account: { english: 'аккаунт, учётная запись' },
      strange: { english: 'странный' },
      anyway: { english: 'всё равно; в любом случае' },
    },
    expressions: {
      'sign up': { english: 'зарегистрироваться' },
      'by lunch': { english: 'к обеду' },
    },
    grammarNote:
      "«I've paid for followers. And now I feel worse» — Present Perfect: важен результат сейчас (подписчики куплены, на душе плохо). А «On Saturday morning, Grace went to work» — Past Simple: есть точное время. По-русски «я заплатила» в обоих случаях. Подсказка: если есть yesterday, last week, on Saturday — Past Simple, а не Present Perfect.",
    comprehensionQuestions: [
      {
        question: 'What is strange about the new followers?',
        options: ['They write a lot of comments.', 'They look the same and never say anything.', 'They all live in Newcastle.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Nastya feel worse?',
        options: ['The numbers are not true, and the people are not real.', 'She lost ten pounds.', 'Grace is angry with her.'],
        correctIndex: 0,
      },
      {
        question: 'How does Misha know?',
        options: ['Grace told him.', 'Nastya told him.', 'He saw that the new followers all have the same picture.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-5',
    title: 'The Cake',
    titleTranslation: 'Торт',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "I didn't answer Misha, because I didn't want to talk to anyone. On Sunday, I wanted to do something real. 'I'm going to bake my gran's chocolate cake,' I told Grace. 'It's the best recipe in the world, and I've made it a hundred times. I can bake it with my eyes closed.' Grace put the camera on the table in our cosy kitchen. 'Great. A cooking video. People love them.'\n\n" +
      "It was a disaster. I put on my gran's old jumper, and I talked to the camera like a real influencer. I forgot the sugar, and I burnt the first cake. The second one was better, but it was heavy, and when I tried to carry it to the table, I fell over the cat again. The cake went on my head. I was so embarrassed, and Grace laughed so much that she couldn't film.\n\n" +
      "That night, I wanted to post only the nice part, with the finished photo. But I was tired, and I posted the wrong video by mistake: all forty minutes, with the cat, the cake and my head.\n\n" +
      "In the morning, Grace woke me up. 'Nastya. Have you seen your phone?' 'Not yet. Why?' There were notifications everywhere. 'The cake video has gone viral. A viral disaster! Fifty thousand views. And you've got 7,000 new followers. Did you post it on purpose?' I sat up. 'No! But are they real ones?' 'Real ones,' she said. 'And they've already written two thousand comments. The recipe is everywhere too.'",
    words: {
      bake: { english: 'печь, выпекать' },
      recipe: { english: 'рецепт' },
      disaster: { english: 'катастрофа, провал' },
      burnt: { english: 'сожгла, подгорело (burn — гореть, жечь)' },
      viral: { english: 'вирусный (о видео: gone viral — разлетелось по сети)' },
    },
    expressions: {
      'put on': { english: 'надеть' },
      'woke me up': { english: 'разбудила меня (wake up — просыпаться, будить)' },
    },
    grammarNote:
      "«I've made it a hundred times» — Present Perfect для опыта (сколько раз за жизнь). А «I burnt the first cake… I fell over the cat» — Past Simple: конкретные события вчерашнего вечера. И «Have you seen your phone? — Not yet» — вопрос о результате сейчас. По-русски везде просто прошедшее время.",
    comprehensionQuestions: [
      {
        question: 'Why does Nastya make a cooking video?',
        options: ['She wants to show something real.', 'Misha asked her to.', 'She wants to sell cakes.'],
        correctIndex: 0,
      },
      {
        question: 'What mistake does Nastya make that night?',
        options: ['She deletes the video.', 'She posts all of the video, not only the good part.', 'She sends the video to Misha.'],
        correctIndex: 1,
      },
      {
        question: 'Why is the morning news good?',
        options: ['Gran liked the cake.', 'The cat is OK.', 'Thousands of real people like the video.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-6',
    title: 'Real People',
    titleTranslation: 'Настоящие люди',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "I read the comments all day, and they weren't like the comments on my fashion videos. People shared their own disasters. 'I've burnt every cake I've ever made,' one woman wrote. 'My dog ate my birthday cake last year,' wrote a boy from Leeds. A grandmother abroad, in Canada, asked for the recipe, and people were generous and kind.\n\n" +
      "Then I found a longer message. 'Hi. I've had a really bad month. I lost my job, and I've felt lonely since then. Yesterday, I watched your cake video, and I laughed for the first time in weeks. Thank you for being real.' I read it three times. Then I sat on my bed and cried a bit, because I knew that lonely feeling too.\n\n" +
      "'Grace,' I said. 'I have to do something brave.' I opened my account and found the 2,000 fake followers, and one by one, I deleted them. It took two hours, and my number went down from 9,400 to 7,400. 'Are you sure?' Grace asked. 'You've only got five days left.' 'I'm sure,' I said. 'I'd rather lose the bet than win it with a lie.'\n\n" +
      "That evening, I wrote to the woman with the bad month. 'Thank you for your message. I'm sorry about your job. Can I share your words in my next video? Without your name.' She answered in a minute: 'Yes. And good luck. I've already shared your cake with all my friends, and with my own mum.'",
    words: {
      shared: { english: 'делились (share — делиться)' },
      own: { english: 'собственный: their own — свои собственные' },
      lonely: { english: 'одинокий: I felt lonely — мне было одиноко' },
      since: { english: 'с тех пор, с (since then — с тех пор)' },
      luck: { english: 'удача: good luck — удачи' },
    },
    expressions: {
      'one by one': { english: 'один за другим, по одному' },
      'went down': { english: 'уменьшилось, упало (go down)' },
    },
    grammarNote:
      "«I've felt lonely since then» — Present Perfect с since: «с тех пор и до сих пор». По-русски здесь настоящее время («мне одиноко с тех пор»), а в английском нельзя I feel lonely since… — только I've felt. А «I lost my job» — Past Simple: это случилось один раз и закончилось.",
    comprehensionQuestions: [
      {
        question: 'How are these comments different?',
        options: ['People write about their own problems and mistakes.', 'People are angry.', 'People only write about fashion.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Nastya delete the fake followers?',
        options: ['Misha asked her to.', 'The app stopped working.', 'She wants her number to be honest.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Nastya write to the woman?',
        options: ['To ask for a job for her', 'To ask if she can use her message in a video', 'To ask for her cake recipe'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-7',
    title: 'Day Thirty',
    titleTranslation: 'День тридцатый',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On day thirty, I made the most honest video I've ever made: no fashion, no dance, no cake, just me in the kitchen. 'I have to tell you something,' I said to the camera. 'A month ago, I made a bet with my brother. I wanted ten thousand followers. And two weeks ago, I bought two thousand fake ones. I've deleted them now. Since then, I've learnt a lot, mostly from the cake disaster. You're the real ones. Thank you for your support. Your support is the real thing.'\n\n" +
      "Then I read the message from the woman with the bad month, in my own words. I didn't mention her name, and I didn't mention her job. 'This is why I don't want to win with a lie,' I said. 'Numbers don't laugh with you. People do.' Behind the camera, Grace looked upset, then happy, then proud. 'Was that OK?' I asked. 'That was better than OK,' she said. 'You were brave.'\n\n" +
      "We posted it at six, and then we sat on the sofa and watched the number. I had 9,100 followers. At eight, 9,600. At ten, 9,900. My battery was at 10%, and I wanted to log out and hide. 'I prefer not to look,' I said, and I looked every minute. 'Put your phone away,' Grace said. Then she made some tea, but we didn't drink it.\n\n" +
      "At 11:58, the number stopped. 9,998. Two people. I needed two more people, and I didn't want to be upset. Then someone was at the door.",
    words: {
      mention: { english: 'упоминать' },
      support: { english: 'поддержка; поддерживать' },
      upset: { english: 'расстроенный' },
      prefer: { english: 'предпочитать: I prefer not to — я лучше не буду' },
    },
    expressions: {
      'log out': { english: 'выйти (из аккаунта, приложения)' },
    },
    splitExpressions: [
      { word1: 'put', word2: 'away', display: 'put … away', english: 'убрать (на место)' },
    ],
    grammarNote:
      "«A month ago, I made a bet… I've deleted them now» — ago всегда с Past Simple (a month ago, two weeks ago), а now, already, just, yet — с Present Perfect. По-русски «я поспорила месяц назад» и «я их уже удалила» — одно прошедшее время, а в английском слова-подсказки помогают выбрать форму.",
    comprehensionQuestions: [
      {
        question: 'What is different about this video?',
        options: ['It is a new dance.', 'Nastya tells the truth about the fake followers.', 'Misha is in it.'],
        correctIndex: 1,
      },
      {
        question: 'How does Grace feel about the video?',
        options: ['She thinks it is very good, and it moves her.', 'She thinks it is boring.', 'She is angry about the fake followers.'],
        correctIndex: 0,
      },
      {
        question: 'Why is the last minute so difficult?',
        options: ['The phone stops working.', 'Grace goes to bed.', 'Nastya needs only two more followers, and it is very late.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m5-8',
    title: 'Two More',
    titleTranslation: 'Ещё двое',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Grace opened the door, and it was Misha, with a box of cake. 'I've seen your video,' he said. 'All of it. Twice.' He took out his phone and followed me. 9,999. 'Have you followed her yet?' he asked Grace. 'I've followed her since day one,' Grace said. 'Then here's one more,' Misha said. 'My work account.' 10,000. It was 11:59.\n\n" +
      "'Wait,' I said. 'That's my brother twice. That isn't fair. It's impossible.' 'Nastya,' Misha said, 'you've just told ten thousand people the truth about fake followers, and you've made a woman laugh after the worst month of her life. That's real work. I was wrong, and you've won.' He looked a bit gutted, but he was generous about it.\n\n" +
      "I couldn't believe it. My brother has never said 'I was wrong' before. Not once in twenty years, and I didn't believe my ears. 'So you'll do the washing-up for a year?' I asked. 'I've already started,' he said, and he walked to the kitchen and turned on the kettle. 'Good luck,' Grace said. I put my phone away, and we laughed and celebrated with his cake.\n\n" +
      "A week later, I had 15,000 followers. I've had offers from two fashion brands since then, but I haven't said yes yet. I'm going to turn down one of them, because the company sells fake followers too, and I've done that once already. I post a story every day now. No more trends: just honest, a bit silly, often with the cat. And every Sunday, Misha sends me a photo of my clean dishes.",
    words: {
      brands: { english: 'бренды, марки (brand)' },
      once: { english: 'один раз (not once — ни разу)' },
      believe: { english: 'верить: I couldn\'t believe it — я не могла поверить' },
      impossible: { english: 'невозможный, невозможно' },
    },
    expressions: {
      'do the washing-up': { english: 'мыть посуду (британское)' },
      'turn down': { english: 'отказаться от (предложения)' },
    },
    grammarNote:
      "«My brother has never said 'I was wrong' before» — Present Perfect с never: «никогда в жизни, до сих пор». А «I was wrong» внутри — Past Simple: Миша говорит о конкретной ошибке. По-русски «никогда не говорил» — просто прошедшее время, а в английском never + Present Perfect, когда речь о всей жизни до сегодня.",
    comprehensionQuestions: [
      {
        question: 'How do the last two followers come?',
        options: ['From the woman with the bad month', "From Misha's two accounts", 'From two fashion brands'],
        correctIndex: 1,
      },
      {
        question: 'Why does Misha say Nastya has won?',
        options: ['Her honest video was real work, and it helped people.', 'She has got 10,000 followers.', 'He wants her cake.'],
        correctIndex: 0,
      },
      {
        question: 'What is different about Nastya at the end?',
        options: ['She only posts fashion now.', 'She has stopped using social media.', 'She posts honest things about her life.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
