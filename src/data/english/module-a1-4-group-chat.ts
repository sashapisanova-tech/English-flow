import type { ReadingText } from '@/types/dutch';

const M = 'a1-group-chat' as const;
const MT = 'The Group Chat';

export const moduleA1_4Texts: ReadingText[] = [
  {
    id: 'a1m4-1',
    title: 'A Party for J',
    titleTranslation: 'Вечеринка для Джей',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "I'm Kat, and I'm at work in Leeds. It's Monday afternoon, but I'm not working. I'm making a group chat on my phone. Its name is 'Party for J'.\n\n" +
      "J is Jamal, my friend from work. His birthday is on Saturday, and he's thirty! We want a party for him. But Jamal can't know about it. My flatmate Nadia is in the group chat with me.\n\n" +
      "Nadia: A party for Jamal? Great idea! I love making cakes. Can I make him a chocolate cake?\n" +
      "Kat: Yes, please! He loves chocolate.\n" +
      "Nadia: Where is the party? And what time?\n" +
      "Kat: I don't know. I'm thinking about it.\n\n" +
      "Then my phone shows a new message. It isn't in the group chat. It's from Jamal: 'What are you doing, Kat? Who are you writing to?' Jamal works at the next table. Now he's looking at me.",
    words: {
      birthday: { english: 'день рождения' },
      party: { english: 'вечеринка / праздник' },
      message: { english: 'сообщение' },
    },
    expressions: {
      'group chat': { english: 'групповой чат' },
    },
    grammarNote:
      "«I'm at work… but I'm not working» — Present Continuous (am/is/are + -ing) говорит о том, что происходит прямо сейчас. А «Jamal works at the next table» — Present Simple: так всегда, это его обычное место. По-русски в обоих случаях просто «работает», а в английском время выбирают по смыслу: сейчас или обычно.",
    comprehensionQuestions: [
      {
        question: "Why isn't Kat working?",
        questionTranslation: 'Почему Кат не работает?',
        options: ['She is at home on Monday.', 'She is making a chat about a party.', 'She is writing to Jamal.'],
        correctIndex: 1,
      },
      {
        question: 'What can Nadia do for the party?',
        questionTranslation: 'Что Надя может сделать для вечеринки?',
        options: ['Make a cake with chocolate', 'Buy a cake for Kat', 'Make a list of places'],
        correctIndex: 0,
      },
      {
        question: "Why is Jamal's message a problem for Kat?",
        questionTranslation: 'Почему сообщение Джамала — проблема для Кат?',
        options: ['Jamal knows about the party.', 'Jamal is not at work.', 'Jamal is near her, and he wants to know who she is writing to.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-2',
    title: 'No One Agrees',
    titleTranslation: 'Никто не согласен',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Tuesday morning, there are three of us in the group chat: Nadia, me and Leo. Leo is Jamal's friend from football, and he loves dancing. The party is a surprise, so Jamal can't see the chat.\n\n" +
      "Kat: Where can we have the party?\n" +
      "Leo: Let's have it in the park!\n" +
      "Nadia: In March? It always rains in March.\n" +
      "Leo: Then let's go to a restaurant. I know a famous place near the river.\n" +
      "Nadia: Famous places are expensive. And I hate restaurants for parties.\n" +
      "Leo: Then where?\n\n" +
      "No one agrees. Leo doesn't agree with Nadia, and Nadia doesn't agree with him. I'm reading their messages all morning, and I'm not working again.\n\n" +
      "In the afternoon, Jamal comes to my table. 'Kat, why is everyone busy this week? I'm writing to Leo, but he isn't writing to me. Are you all angry with me?'",
    words: {
      surprise: { english: 'сюрприз' },
      dancing: { english: 'танцы (dance — танцевать)' },
      hate: { english: 'ненавидеть / очень не любить' },
      agree: { english: 'соглашаться: I agree — я согласен' },
      everyone: { english: 'все, каждый (глагол в ед. числе: everyone is)' },
    },
    expressions: {
      "let's": { english: 'давай / давайте (let us)' },
    },
    grammarNote:
      "«Leo doesn't agree with Nadia» — agree в английском глагол, как «соглашаться». Поэтому «я согласен» — это I agree, а не I am agree, и отрицание строится через don't / doesn't: I don't agree, he doesn't agree.",
    comprehensionQuestions: [
      {
        question: "Why can't they have the party in the park?",
        questionTranslation: 'Почему нельзя устроить вечеринку в парке?',
        options: ['Nadia thinks it can rain.', 'The park is closed in March.', 'Leo hates the park.'],
        correctIndex: 0,
      },
      {
        question: 'What does Nadia think about restaurants?',
        questionTranslation: 'Что Надя думает о ресторанах?',
        options: ['They are great for dancing.', 'They are cheap and good.', "They aren't good for parties, and they aren't cheap."],
        correctIndex: 2,
      },
      {
        question: 'What does Jamal think?',
        questionTranslation: 'Что думает Джамал?',
        options: ['He is happy about his birthday.', 'He thinks his friends are angry with him.', 'He is tired of football.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-3',
    title: 'Jamal Hates Pizza',
    titleTranslation: 'Джамал терпеть не может пиццу',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Wednesday, there's a new name in the group chat: Ben. Ben is Jamal's flatmate, so he knows Jamal's favourite food. And food is the next problem.\n\n" +
      "Leo: Let's have pizza. Everyone likes pizza!\n" +
      "Ben: Not Jamal. He hates pizza. His favourite food is curry.\n" +
      "Nadia: I can make curry! I love cooking.\n" +
      "Leo: Curry? For how many people? Twenty? Do you agree, Kat?\n" +
      "Kat: I agree. Nadia cooks a lot of curry at the weekend.\n" +
      "Ben: And Jamal's sister, Amira, is in the chat now. She's in Glasgow, but she knows him, and she can help us.\n" +
      "Amira: Hi, everyone! I agree with Ben. Jamal loves curry.\n\n" +
      "At ten o'clock at night, Ben writes to me, not in the group chat. 'Kat, help! I'm in the kitchen with Jamal, and my phone is on the table. He's reading my messages!'",
    words: {
      favourite: { english: 'любимый' },
      cooking: { english: 'готовка (cook — готовить еду)' },
      curry: { english: 'карри (острое блюдо)' },
      sister: { english: 'сестра' },
    },
    expressions: {
      'a lot of': { english: 'много' },
    },
    grammarNote:
      "«I love cooking» — после love, like и hate в английском часто идёт глагол с -ing. По-русски «люблю готовить» — с инфинитивом, поэтому хочется сказать I love cook, но так нельзя: I love cooking, I hate dancing.",
    comprehensionQuestions: [
      {
        question: "Why don't they want pizza for the party?",
        questionTranslation: 'Почему они не хотят пиццу на вечеринку?',
        options: ["Jamal doesn't like it.", 'Pizza is very expensive.', 'Nadia hates cooking pizza.'],
        correctIndex: 0,
      },
      {
        question: 'Who is Amira?',
        questionTranslation: 'Кто такая Амира?',
        options: ["Ben's sister", "Kat's flatmate in Leeds", "Jamal's sister"],
        correctIndex: 2,
      },
      {
        question: 'Why is Ben nervous at night?',
        questionTranslation: 'Почему Бен нервничает ночью?',
        options: ['There is no curry in the kitchen.', 'Jamal can see the messages about the party.', 'Kat is angry with him.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-4',
    title: 'A Present for Jamal',
    titleTranslation: 'Подарок для Джамала',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Thursday, there's a new problem: the present.\n\n" +
      "Kat: What present can we buy Jamal?\n" +
      "Leo: A guitar! He loves playing the guitar.\n" +
      "Ben: No, let's buy him tickets for the football. He plays every weekend.\n" +
      "Nadia: Jamal's favourite hobby is taking photos. A camera!\n" +
      "Leo: Cameras are very expensive.\n" +
      "Amira: I agree with Nadia. Jamal hasn't got a good camera.\n\n" +
      "Jamal has got a lot of hobbies: football, the guitar, photos. And no one agrees again. So after work, Nadia and I get on the Tube and go shopping in the centre. We're looking at cameras, and they really are expensive. Then Nadia sees a cheap one. 'Kat, look! It's £80!'\n\n" +
      "But Nadia isn't looking at the camera now. She's looking behind me. There's a man at the window, and he's looking at the cameras. It's Jamal!",
    words: {
      present: { english: 'подарок' },
      playing: { english: 'играть (play): playing the guitar — играть на гитаре' },
      hobbies: { english: 'хобби, увлечения (hobby)' },
      really: { english: 'действительно / правда' },
    },
    expressions: {
      'go shopping': { english: 'ходить по магазинам' },
    },
    grammarNote:
      "«Let's buy him tickets» — после глагола английский ставит объектное местоимение him, а не he. По-русски «купим ему билеты», и форма тоже меняется, но в английском одно him отвечает и за «ему», и за «его»: buy him, look at him (посмотри на него).",
    comprehensionQuestions: [
      {
        question: 'Why does Nadia want a camera for Jamal?',
        questionTranslation: 'Почему Надя хочет подарить Джамалу камеру?',
        options: ['Cameras are cheap.', 'Amira has got a good camera.', 'He loves taking photos.'],
        correctIndex: 2,
      },
      {
        question: 'Why do Kat and Nadia go shopping?',
        questionTranslation: 'Почему Кат и Надя идут по магазинам?',
        options: ["The friends can't agree about the present.", 'Jamal wants a guitar.', 'Nadia wants a new phone.'],
        correctIndex: 0,
      },
      {
        question: 'Why is the man in the window a problem?',
        questionTranslation: 'Почему мужчина у витрины — проблема?',
        options: ['He is a thief.', 'He is Jamal, and the camera is a surprise.', 'He is Leo, and he hates cameras.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-5',
    title: 'Amira Always Agrees',
    titleTranslation: 'Амира всегда согласна',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "On Thursday night, Leo is playing the guitar and making a list of songs for the birthday party. He really loves singing.\n\n" +
      "Leo: Let's all sing together at the party!\n" +
      "Nadia: I hate singing. And Jamal hates it.\n" +
      "Leo: No, he loves it! He sings at work every day. Listen to him, Kat!\n" +
      "Kat: That's right. He sings his favourite songs at his table.\n" +
      "Amira: I agree with Leo.\n" +
      "Nadia: Do you like singing, Amira?\n" +
      "Amira: No. I agree with Nadia.\n" +
      "Kat: Amira, you can't agree with Leo AND with Nadia!\n" +
      "Amira: OK. Then let's have the party in Jamal's flat. Ben can take him to the football, and then they come home at seven. Can our mum come? Our family loves parties.\n\n" +
      "At eleven o'clock, Jamal writes to me. 'Kat, my mum is writing to me about Saturday. What's on Saturday?'",
    words: {
      singing: { english: 'пение (sing — петь)' },
      songs: { english: 'песни (song)' },
      together: { english: 'вместе' },
      mum: { english: 'мама' },
      family: { english: 'семья' },
    },
    expressions: {
      'listen to': { english: 'слушать' },
    },
    grammarNote:
      "«Do you like singing, Amira?» — по-русски вопрос можно задать одной интонацией: «Ты любишь петь?». В английском нужен помощник do в начале: Do you like…? А в ответе — I agree или I don't agree, без am: agree — это глагол.",
    comprehensionQuestions: [
      {
        question: 'What does Leo want at the party?',
        questionTranslation: 'Чего хочет Лео на вечеринке?',
        options: ['A lot of curry', 'Everyone singing songs', 'No music'],
        correctIndex: 1,
      },
      {
        question: 'What is funny about Amira?',
        questionTranslation: 'Что смешного в Амире?',
        options: ['She hates her family.', 'She is always at work.', 'She agrees with Leo, and then she agrees with Nadia.'],
        correctIndex: 2,
      },
      {
        question: "Why is Jamal's message a problem?",
        questionTranslation: 'Почему сообщение Джамала — проблема?',
        options: ["His mum's messages make him think about Saturday.", 'He hates parties.', 'He is in Glasgow on Saturday.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-6',
    title: 'Green Jumpers for Everyone',
    titleTranslation: 'Зелёные свитера для всех',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Jamal always wears his green jumper. Every day! On Friday morning, he's wearing it at work again. And Leo has got a new idea.\n\n" +
      "Leo: Clothes for the party! Let's all wear green jumpers, like Jamal!\n" +
      "Nadia: I hate wearing green. I've got a red dress for Saturday.\n" +
      "Ben: My green jumper is a bit small. Can we go shopping after work?\n" +
      "Amira: I agree with Leo. Jamal loves green.\n" +
      "Kat: Amira, you always agree with everyone!\n\n" +
      "I'm reading the chat at work, and Jamal is looking at me. 'Kat, Leo is busy on Saturday. Ben is busy. My family is busy. And my mum is writing to me every day. Why?'\n\n" +
      "I look at my phone. Then Jamal looks at me again. 'Kat, I hate surprise parties. Really.'",
    words: {
      wears: { english: 'носить (wear): he wears — он носит; he\'s wearing — на нём сейчас' },
      jumper: { english: 'свитер / джемпер' },
      clothes: { english: 'одежда' },
      dress: { english: 'платье' },
    },
    expressions: {
      'a bit': { english: 'немного / чуть-чуть' },
    },
    grammarNote:
      "«Jamal always wears his green jumper» — Present Simple: так бывает всегда. «He's wearing it at work again» — Present Continuous: на нём он прямо сейчас. По-русски скажем «он всегда ходит в зелёном свитере» и «сегодня он опять в нём» без всякой разницы во времени, а в английском always подсказывает Simple, а «сейчас» — Continuous.",
    comprehensionQuestions: [
      {
        question: "What is Leo's idea?",
        questionTranslation: 'Какая идея у Лео?',
        options: ['Everyone in green, like Jamal', 'A red dress for everyone', 'No jumpers at the party'],
        correctIndex: 0,
      },
      {
        question: "What is the problem with Ben's green jumper?",
        questionTranslation: 'Что не так с зелёным свитером Бена?',
        options: ["It isn't his.", 'It is red, not green.', "It's small for him."],
        correctIndex: 2,
      },
      {
        question: 'Why is Kat nervous now?',
        questionTranslation: 'Почему Кат теперь нервничает?',
        options: ['Jamal loves surprises.', "Jamal doesn't like surprise parties.", 'Jamal is reading her phone.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-7',
    title: 'Saturday at Seven',
    titleTranslation: 'Суббота, семь часов',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "It's Saturday afternoon, Jamal's birthday. The party is in Ben and Jamal's flat. It's Amira's idea, and this time everyone agrees. Ben and Jamal are at the football, so we've got the flat.\n\n" +
      "We're all wearing green clothes, but Nadia is in her red dress. She's in the kitchen, cooking a lot of curry. Leo is playing his songs. I've got the present: a camera for Jamal's favourite hobby.\n\n" +
      "At ten to seven, a message from Ben comes: 'Listen to me, everyone! We're near the flat. Jamal is a bit quiet. I think he knows.' Leo: 'Turn the lights off! He can't see us!' Now the lights are off, and everyone is quiet. We wait for them behind the door.\n\n" +
      "Then there's a new message, from Amira: 'I'm here! I'm at the door.' Amira? But Amira is in Glasgow!",
    words: {
      quiet: { english: 'тихий; молчаливый' },
      lights: { english: 'свет (light — лампа, свет)' },
      door: { english: 'дверь' },
    },
    expressions: {
      'wait for': { english: 'ждать (кого-то / чего-то)' },
    },
    splitExpressions: [
      { word1: 'turn', word2: 'off', display: 'turn … off', english: 'выключать' },
    ],
    grammarNote:
      "«We wait for them behind the door» — после предлогов for, with, at английский ставит объектное местоимение: them, him, me, us (не they, he). По-русски «ждём их» — без предлога, а в английском wait всегда с for: wait for them, wait for me.",
    comprehensionQuestions: [
      {
        question: 'Where is the party?',
        questionTranslation: 'Где вечеринка?',
        options: ['In a restaurant near the river', 'At the football', "In Jamal's flat"],
        correctIndex: 2,
      },
      {
        question: 'Where are the friends at ten to seven?',
        questionTranslation: 'Где друзья без десяти семь?',
        options: ['Behind the door, with the lights off', "In the kitchen, with Nadia's curry", 'At the football, with Ben'],
        correctIndex: 0,
      },
      {
        question: "Why is Amira's message a problem?",
        questionTranslation: 'Почему сообщение Амиры — проблема?',
        options: ['Amira hates parties.', 'Amira is in Glasgow, not at the door.', 'Amira is late.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a1m4-8',
    title: 'Surprise!',
    titleTranslation: 'Сюрприз!',
    level: 'A1', module: M, moduleTitle: MT,
    content:
      "Ben opens the door, and we turn the lights on. 'Surprise!' Jamal is in his green jumper, and he's laughing. Behind him are his mum and a woman. 'This is my sister, Amira.' 'Nice to meet you, Amira! So you're in our group chat!' Amira looks at us. 'What group chat?'\n\n" +
      "Jamal shows us an old phone. 'This is Amira's old phone. Now it's my phone, and it's got her old number. I can read all your messages!'\n\n" +
      "'No one agrees in this chat, so I agree with everyone.' 'But you hate surprise parties!' 'I don't hate them. I love them. And I love you all.'\n\n" +
      "Nadia's curry is great, and we're all singing and dancing together. Jamal takes a photo of us with our present, his new camera. Then he writes in the group chat: 'Kat's birthday is in July. Let's make a new group chat!'",
    words: {
      laughing: { english: 'смеяться (laugh): he\'s laughing — он смеётся' },
      old: { english: 'старый' },
      number: { english: 'номер (телефона)' },
    },
    expressions: {
      'nice to meet you': { english: 'приятно познакомиться' },
    },
    grammarNote:
      "«I don't hate them. I love them» — them заменяет surprise parties после глагола. По-русски «я их люблю», и легко сказать I love they, но после глагола всегда объектная форма: them, him, her, us, me.",
    comprehensionQuestions: [
      {
        question: 'Who is behind Jamal at the door?',
        questionTranslation: 'Кто стоит за Джамалом в дверях?',
        options: ["Kat's mum and Leo", 'His mum and his sister', 'Two friends from football'],
        correctIndex: 1,
      },
      {
        question: 'Why does "Amira" in the chat agree with everyone?',
        questionTranslation: 'Почему «Амира» в чате соглашается со всеми?',
        options: ['It is Jamal, and he wants everyone to be happy.', 'Amira can\'t read the messages.', 'It is Ben, and he is nervous.'],
        correctIndex: 0,
      },
      {
        question: 'What does Jamal think about surprise parties?',
        questionTranslation: 'Что Джамал думает о вечеринках-сюрпризах?',
        options: ['He hates them.', "He doesn't know about them.", 'He loves them.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
