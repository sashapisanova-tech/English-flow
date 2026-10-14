import type { ReadingText } from '@/types/dutch';

const M = 'a2-road-trip' as const;
const MT = 'Road Trip to Scotland';

export const moduleA2_6Texts: ReadingText[] = [
  {
    id: 'a2m6-1',
    title: 'The Yellow Car',
    titleTranslation: 'Жёлтая машина',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "I was making breakfast when Amara called. 'Vera, we've got a problem. Kevin's car is dead, so we're going in mine.' Amara's car is yellow, very old and very small: it's the tiniest car in London. 'A road trip to Scotland in that?' I asked. 'With Kevin?' 'You've got a better idea?'\n\n" +
      "I'm Vera. I'm 32, I'm from Tashkent, and I work for a small tea company in London. Kevin is our boss. He's 60, and he has worked for the company for thirty years, but he isn't keen on parties. On Thursday, the three of us were going to drive to the Highlands, far up in Scotland. Kevin thought it was for a big meeting, but it wasn't. It was his surprise retirement party. Everyone from the company was going to be there on Friday at seven, and my task was to get him there without a word about the retirement party.\n\n" +
      "At eight, we set off. Kevin's luggage didn't fit in the car, so he had his suitcase on his legs, and I had the rest of his luggage on mine. Amara was driving and singing, and Kevin was looking at his phone. 'The sat nav says nine hours,' he said. 'If we don't stop, we'll arrive at five.' 'That's a long journey,' I said. 'We might need to stop for the toilet.' 'Follow the sat nav and don't stop,' Kevin said.\n\n" +
      "'I've never been late for anything in thirty years,' Kevin said, 'and I'm not going to start now. Make sure we're there by five.' Amara stopped singing, because on the motorway in front of us, there were red lights. Hundreds of them.",
    words: {
      journey: { english: 'поездка, путешествие (в дороге)' },
      retirement: { english: 'выход на пенсию' },
      luggage: { english: 'багаж (неисчисляемое: some luggage)' },
      motorway: { english: 'автомагистраль, шоссе (британское)' },
    },
    expressions: {
      'set off': { english: 'отправиться в путь, выехать' },
      'road trip': { english: 'поездка на машине, автопутешествие' },
      'sat nav': { english: 'навигатор (в машине)' },
    },
    grammarNote:
      "«I was making breakfast when Amara called» — Past Continuous (was making) — действие, которое шло, а Past Simple (called) — то, что его прервало. По-русски «я готовила завтрак, когда позвонила Амара» — несовершенный и совершенный вид. В английском похожая пара: was + -ing для фона, простое прошедшее для события.",
    comprehensionQuestions: [
      {
        question: "Why are they going in Amara's car?",
        options: ["Kevin's car isn't working.", "Amara's car is the biggest.", 'Vera has no car.'],
        correctIndex: 0,
      },
      {
        question: 'What is the secret?',
        options: ['The meeting is in London.', 'The trip is really for a party for Kevin.', 'Amara is leaving the company.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Amara stop singing at the end?',
        options: ['Kevin asks her to stop.', 'She is tired.', 'She sees a lot of cars stopped in front of them.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-2',
    title: 'Traffic Jam',
    titleTranslation: 'Пробка',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "We sat in the traffic jam for two hours behind a lorry, and all we could see was the back of the lorry. Amara was eating crisps, I was reading my emails, and Kevin was talking to his sat nav. 'Find a faster road,' he told it. 'Recalculating,' it said. 'If we stay on the motorway, we'll be late,' Kevin said, and he looked annoyed. 'If we leave it, we might get lost.'\n\n" +
      "While we were waiting, my phone rang. It was Kevin's wife, Linda, and she knew about the retirement party. 'Is he there?' she asked quietly. 'Yes,' I said. 'Don't say anything!' 'What's she saying?' Kevin asked. 'It's my mum,' I lied. 'She's asking about the forecast. While I'm in Scotland, she wants me to wear a coat.'\n\n" +
      "At last, the cars started to move, and Amara drove at the fastest speed of her tiny car. On every roundabout, the car made a strange noise, and at every roundabout, the noise was louder. 'Slow down!' Kevin shouted. 'It's a car, not a plane! At this speed, the car isn't going to make it.' 'You wanted to go faster,' Amara said. 'Not like this!'\n\n" +
      "At three o'clock, we stopped at a petrol station near Manchester. There was still a long way to Scotland, and we were four hours late. Kevin was looking at the map on his phone. 'There's a shorter road in the hills,' he said. 'If we take it, we'll save an hour, and the hills are beautiful at this time of year.' Amara and I looked at each other, because we didn't like that idea. 'Fair enough,' Amara said. 'But if we get lost, don't complain.'",
    words: {
      lorry: { english: 'грузовик (британское; в США — truck)' },
      speed: { english: 'скорость' },
      roundabout: { english: 'круговой перекрёсток (кольцо)' },
      noise: { english: 'шум, звук' },
      while: { english: 'пока, в то время как' },
      hills: { english: 'холмы (hill)' },
    },
    expressions: {
      'traffic jam': { english: 'пробка' },
      'slow down': { english: 'сбавить скорость, притормозить' },
    },
    grammarNote:
      "«If we stay on the motorway, we'll be late» — первое условное: if + Present Simple, а в другой части will. Это реальная ситуация в будущем. А «we might get lost» — might значит «может быть, возможно»: не точно, как will. По-русски «если мы останемся… мы опоздаем» — будущее в обеих частях, а в английском после if — настоящее.",
    comprehensionQuestions: [
      {
        question: 'Why does Vera say it is her mum on the phone?',
        options: ["Kevin can't know about the party.", 'Her mum calls her every day.', 'Linda is angry.'],
        correctIndex: 0,
      },
      {
        question: "Why does Kevin shout at Amara?",
        options: ['She is eating crisps.', 'She is singing.', 'She drives too fast for her small car.'],
        correctIndex: 2,
      },
      {
        question: 'How do Vera and Amara feel about the road in the hills?',
        options: ['They think it is a great idea.', 'They are not happy about it.', 'They want to go there by train.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-3',
    title: 'The Wrong Turn',
    titleTranslation: 'Не тот поворот',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "The road in the hills was beautiful: green hills, small walls and a lot of countryside, with no petrol stations, no shops and no people. After an hour, the road was a path, then the path was mud, and soon the mud was everywhere. 'Turn left,' said the sat nav, but there was no road on the left. There was only a cow.\n\n" +
      "'We're lost,' Amara said. 'We aren't lost,' Kevin said. 'The sat nav knows where we are.' 'The sat nav wants us to drive into a cow! No one lives in this countryside.' I looked at my phone, but there was no signal, so I couldn't contact anyone. Kevin got out of the car and looked at the map. 'This might be the wrong direction,' he said quietly. 'Every direction looks the same here.'\n\n" +
      "While Kevin was studying the map, the cow walked up to the car and looked in at me, and I was a bit scared. Amara started to laugh, and she couldn't stop, and then I started too. Kevin looked at us, and for the first time in thirty years, I saw him laugh too. 'All right,' he said. 'I give up. Amara, you choose the way.' Amara filmed the cow for her social media, and by the evening, the cow video was going viral.\n\n" +
      "We turned and drove back to the road. On the way, my phone found a signal for ten seconds, and a message arrived from Linda: 'The cake is ready. Everyone is coming at seven. If you're late, the band will go home!' I put the phone away before Kevin could see it. We were five hours late, and I was worried.",
    words: {
      countryside: { english: 'сельская местность' },
      path: { english: 'тропинка, дорожка' },
      signal: { english: 'сигнал (связи)' },
      direction: { english: 'направление' },
      cow: { english: 'корова' },
    },
    expressions: {
      'on the way': { english: 'по дороге' },
      'got out': { english: 'вышел (из машины) (get out)' },
    },
    grammarNote:
      "«While Kevin was studying the map, the cow walked up to the car» — while + Past Continuous — длинное действие на фоне, Past Simple — короткое событие. По-русски «пока Кевин изучал карту, корова подошла» — тоже два разных вида. Запомните: после while — обычно was / were + -ing.",
    comprehensionQuestions: [
      {
        question: 'What is wrong with the sat nav?',
        options: ['It tells them to drive into a cow.', 'It does not work in Scotland.', 'It speaks too quietly.'],
        correctIndex: 0,
      },
      {
        question: 'What is surprising about Kevin in this part?',
        options: ['He drives the car.', 'He laughs, and he lets Amara choose the way.', 'He is angry with the cow.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Vera put her phone away?',
        options: ['The signal is gone.', 'She wants to read the map.', "Linda's message is about the party."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-4',
    title: 'Sheep',
    titleTranslation: 'Овцы',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "We crossed into Scotland at nine in the evening. It was getting late, and the fog was coming down from the hills. I was driving now, carefully and slowly, because I couldn't see far in the fog. Amara was sleeping in the back, and Kevin was telling me about his first day at the company, thirty years ago. 'I was so nervous,' he said. 'I put tea on my boss's shirt by mistake.' 'Have you ever thought about stopping work?' I asked carefully. 'Never,' he said. 'What can I do all day at home?'\n\n" +
      "While I was thinking about his answer, something white came out of the fog. Then another one, and another. Sheep. Twenty sheep, standing in the middle of the road. I stopped the car, and the sheep looked at us, and no one moved. There was no signal, of course. 'Be careful,' Kevin said. 'They might go if we wait.'\n\n" +
      "We waited for twenty minutes, but the sheep didn't go. Kevin got out of the car to move them, and he fell straight into the mud. He came back with mud on his trousers and his shoes, and he looked embarrassed. 'Take off your shoes,' I said. 'Not in my clean car!' Amara shouted from the back. She wasn't sleeping now.\n\n" +
      "Finally, a man arrived with a dog, and the sheep walked away towards the hills. 'You won't get to Inverness tonight,' the man said. 'The forecast says there's a storm coming, and it's going to be a big storm. There's a B&B nearby, in the next village. If you're lucky, they'll have a room available.'",
    words: {
      fog: { english: 'туман' },
      sheep: { english: 'овца, овцы (мн. число тоже sheep)' },
      storm: { english: 'буря, шторм' },
      carefully: { english: 'осторожно' },
      nearby: { english: 'поблизости, рядом' },
    },
    expressions: {
      'take off': { english: 'снять (одежду, обувь)' },
      'in the middle of': { english: 'посреди, в середине' },
    },
    grammarNote:
      "«While I was thinking about his answer, something white came out of the fog» — снова пара: was thinking (длилось) + came out (случилось вдруг). И «Twenty sheep» — sheep во множественном числе без -s: one sheep, twenty sheep. По-русски «овца — овцы», а в английском слово не меняется, как и fish.",
    comprehensionQuestions: [
      {
        question: "Why does Vera ask Kevin about stopping work?",
        options: ['She wants his job.', 'She is bored.', 'She knows about his retirement party.'],
        correctIndex: 2,
      },
      {
        question: 'What goes wrong when Kevin tries to move the sheep?',
        options: ['He falls into mud.', 'The sheep run away.', 'He loses his phone.'],
        correctIndex: 0,
      },
      {
        question: 'Why does the man say they should stop?',
        options: ['The road is closed.', 'The weather is going to be very bad.', 'The car is too small.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-5',
    title: 'The B&B',
    titleTranslation: 'Гостевой дом',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "The B&B was a small white cottage with a red door, and when we arrived at eleven, the storm was starting. A woman in a big jumper opened the door. 'Come in, come in! I'm Mrs MacLeod. You look awful.' Kevin's trousers were still brown with mud, and he looked knackered.\n\n" +
      "Reception was her kitchen table, and there, we tried to check in. 'I've only got one double room and a sofa,' Mrs MacLeod said. 'Is that all right?' It wasn't, but there was no other accommodation nearby, and we couldn't find accommodation at midnight. Amara and I took the room, and Kevin took the sofa. 'I've slept in worse places,' he said.\n\n" +
      "Mrs MacLeod made us tea and toast, and the toast was a bit burnt, but it was the tastiest toast of my life. While she was cooking, the lights went out. 'The storm,' she said. 'No electricity again.' She found some candles and a torch, and we sat with the candles in the cosy cottage kitchen. Kevin was quiet for a long time. Then he said, 'Do you know what? This is the best evening I've had for years.' 'Better than a meeting?' I asked. 'Much better.'\n\n" +
      "Before bed, I checked my phone. There was a tiny signal, and a message from Linda: 'How is it going?' And there was an email for Kevin. Linda sent it to all of us by mistake: 'Kevin, your retirement party starts at seven tomorrow. Don't be late!' I looked up from my phone, and Kevin was looking at his phone too.",
    words: {
      cottage: { english: 'коттедж, домик (в деревне)' },
      reception: { english: 'стойка регистрации, ресепшен' },
      accommodation: { english: 'жильё (на время поездки); неисчисляемое' },
      candles: { english: 'свечи (candle)' },
    },
    expressions: {
      'check in': { english: 'зарегистрироваться (в гостинице)' },
      'double room': { english: 'номер с двуспальной кроватью' },
    },
    grammarNote:
      "«When we arrived at eleven, the storm was starting» — arrive at + время или место (at eleven, at the station), а arrive in + город или страну (arrive in Scotland). Не arrive to! По-русски «приехать в» всегда одинаково. И accommodation, как advice, неисчисляемое: no other accommodation, а не accommodations.",
    comprehensionQuestions: [
      {
        question: 'Why does Kevin sleep on the sofa?',
        options: ['He likes sofas.', 'There is only one room with a bed.', 'Mrs MacLeod asks him to.'],
        correctIndex: 1,
      },
      {
        question: 'How does Kevin feel about the evening?',
        options: ['He enjoys it more than anything for a long time.', 'He is angry about the storm.', 'He is worried about the meeting.'],
        correctIndex: 0,
      },
      {
        question: 'Why is the email a problem?',
        options: ['It is about the weather.', 'It is about a different meeting.', 'It tells Kevin about his surprise party.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-6',
    title: 'The Secret',
    titleTranslation: 'Секрет',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Kevin didn't say anything about the email. He said good night and went to the sofa, and I didn't sleep at all. 'Has he read it?' Amara asked quietly in the night. 'I don't know. He was looking at his phone.' 'If he knows, he might not come.' 'Why?' 'He doesn't want to stop work. You heard him.' I wondered about that for hours.\n\n" +
      "In the morning, the storm was over, and the sun was coming up over the wild hills of the coast. We had to check out at ten. Kevin was already in the kitchen with Mrs MacLeod, and they were laughing about something. When he saw us, he stood up. 'Right,' he said. 'Let's go. We've got a long way to go. For the meeting.' He looked at me, and I couldn't read his face.\n\n" +
      "The car didn't start. 'It's the cold,' Mrs MacLeod said. 'My cousin is a mechanic. He might come in an hour, and he can repair anything.' The mechanic came in two hours, not one. While he was working on the car, Kevin walked to the end of the garden, past the cottage, and looked at the view: the wild hills, the coast, the long empty road. In the distance, there were sheep, and I thought about the distance to Inverness. I went and stood next to him.\n\n" +
      "'Vera,' he said, without looking at me. 'Can I ask you something? Is there really a meeting tonight?' I looked carefully at the coast for a long time. I wanted to lie, but Kevin always told the truth, and I didn't want to lie to him now.",
    words: {
      mechanic: { english: 'механик, автомеханик' },
      wild: { english: 'дикий' },
      coast: { english: 'побережье' },
      distance: { english: 'расстояние (in the distance — вдали)' },
    },
    expressions: {
      'check out': { english: 'выехать (из гостиницы)' },
      'a long way': { english: 'далеко, долгий путь' },
    },
    grammarNote:
      "«In the morning… the sun was coming up over the wild hills… They were laughing about something» — Past Continuous часто рисует картинку: что происходило, когда история продолжилась. По-русски «вставало солнце, они смеялись» — несовершенный вид. А «The car didn't start» — Past Simple: одно событие.",
    comprehensionQuestions: [
      {
        question: 'Why is Amara worried in the night?',
        options: ['She thinks Kevin might not go to the party if he knows.', 'She is cold.', 'The storm is very bad.'],
        correctIndex: 0,
      },
      {
        question: "Why can't Vera understand Kevin in the morning?",
        options: ['He speaks too fast.', 'He is laughing too much.', 'She is not sure if he read the email.'],
        correctIndex: 2,
      },
      {
        question: 'What does Vera want to do at the end?',
        options: ['To drive home', 'To tell Kevin the truth', 'To call Linda'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-7',
    title: 'No More Secrets',
    titleTranslation: 'Больше никаких секретов',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "'No,' I said. 'There isn't a meeting. It's your retirement party. Linda and everyone at the company planned it. I'm sorry, Kevin. I didn't want you to find out like this.' Kevin was quiet, and then he smiled. 'I know,' he said. 'I read the email last night, and Linda told me a month ago. She can't keep a secret. She never could.' 'Let's get out of here,' Amara said from the car.\n\n" +
      "'You knew?' 'I knew. I was going to say I was ill, because I didn't want a party, and I didn't want to stop work.' He looked at the hills again. 'But I was lying on that sofa last night, and I was listening to the storm, and I was thinking. I've worked for thirty years, and I've never seen nature like this: hills, sea, sheep. I've never been anywhere. This is my chance to see things before I'm too old, and I'm not going to lose this chance. Maybe it's time to grow up.' I believed him, and I was glad.\n\n" +
      "Behind us, the car started. 'Fixed!' shouted the mechanic. 'So,' I said. 'Are we going to the party?' 'If we leave now,' Kevin said, 'we'll arrive at six. And I'm driving.' 'You?' 'Yes. And no sat nav. Amara can sing, and I'll keep my eyes on the road.'\n\n" +
      "Mrs MacLeod gave us a bag of sandwiches for the journey and some cake. She baked it that morning. It was a long way, but Kevin drove, faster than Amara and much better. We drove along the coast, and at ten to seven, we arrived at a hotel by the water, the most beautiful place I've ever seen, with nature everywhere. There were lights in every window.",
    words: {
      keep: { english: 'хранить, держать (keep a secret — хранить секрет)' },
      nature: { english: 'природа' },
      anywhere: { english: 'где-нибудь; (в отрицании) нигде' },
      chance: { english: 'шанс, возможность' },
    },
    expressions: {
      'get out': { english: 'выбираться, уходить (Let\'s get out of here — Пойдём отсюда)' },
      'grow up': { english: 'взрослеть, вырасти' },
    },
    grammarNote:
      "«I was lying on that sofa… I was listening to the storm, and I was thinking» — несколько действий в Past Continuous подряд: всё это шло одновременно, как фон. А «I've never been anywhere» — Present Perfect: опыт за всю жизнь. По-русски «я нигде не был» — с двойным отрицанием, а в английском never + anywhere, одно отрицание.",
    comprehensionQuestions: [
      {
        question: 'How did Kevin know about the party?',
        options: ['Amara told him.', 'He read the email, and Linda told him before.', 'Mrs MacLeod told him.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Kevin change his mind about the party?',
        options: ['He wants to start seeing the world.', 'He likes cake.', 'Linda is angry with him.'],
        correctIndex: 0,
      },
      {
        question: 'What is different about the drive to the hotel?',
        options: ['Amara drives very fast.', 'They use the sat nav.', 'Kevin drives, and he drives well.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m6-8',
    title: 'Seven O\'Clock',
    titleTranslation: 'Семь часов',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "When Kevin opened the door, eighty people shouted, 'Surprise!' He looked surprised, and he was very good at it. Linda saw his trousers. 'Kevin! Why are you covered in mud?' 'Sheep,' he said, and everyone laughed. Linda looked pleased, and Kevin looked pleased too.\n\n" +
      "It was a brilliant party with a big crowd. A band was playing, there was a huge cake like a cup of tea, and Kevin danced with Mrs MacLeod. She came too. While we were eating, Linda told me something. 'He called me this morning from the B&B. He said, \"Let's not wait. Let's go everywhere.\"'\n\n" +
      "Then Kevin stood up to speak. 'Thirty years ago, I put tea on my boss,' he said. 'Yesterday, I fell into the mud. I've made a lot of mistakes in my career. But I've worked with brilliant people, and I've had a long and successful career. Thank you, Amara, for your tiny yellow car and this road trip: the traffic jam, the fog, the storm. And thank you, Vera, for telling me the truth.' Linda gave him a present: a hat. 'Try on your present!' she said, and he did. 'Now I've got a chance to see nature and grow up. Next year, Linda and I are going to see all of Scotland. Without a sat nav.'\n\n" +
      "On Sunday, Amara and I set off back to London. It was a long journey, and on the motorway we sat in a traffic jam again, but no one minded. While we were waiting, Amara turned on the radio. 'If Kevin calls,' she said, 'tell him we're lost.'",
    words: {
      minded: { english: 'был против (mind — возражать: no one minded — никто не возражал)' },
      career: { english: 'карьера' },
      successful: { english: 'успешный' },
      pleased: { english: 'довольный' },
    },
    expressions: {
      'try on': { english: 'примерить' },
      'covered in mud': { english: 'весь в грязи' },
    },
    grammarNote:
      "«While we were eating, Linda told me something» — while + Past Continuous (фон) и Past Simple (событие). А «If Kevin calls, tell him we're lost» — после if — Present Simple, даже о будущем. Весь модуль в двух предложениях: was / were + -ing для того, что шло, и if + настоящее для того, что может случиться.",
    comprehensionQuestions: [
      {
        question: 'Why is Kevin good at looking surprised?',
        options: ['He already knew about the party.', 'He is an actor.', 'No one told him.'],
        correctIndex: 0,
      },
      {
        question: "What are Kevin's plans for next year?",
        options: ['To work for thirty more years', 'To see all of Scotland with Linda', 'To buy a yellow car'],
        correctIndex: 1,
      },
      {
        question: "Why does Amara say 'tell him we're lost'?",
        options: ['They really are lost.', 'The car is not working.', 'Kevin was always worried about being late, and now it is funny.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
