import type { ReadingText } from '@/types/dutch';

const M = 'a2-festival' as const;
const MT = 'Festival Weekend';

export const moduleA2_2Texts: ReadingText[] = [
  {
    id: 'a2m2-1',
    title: 'The Forecast',
    titleTranslation: 'Прогноз погоды',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "It's Thursday evening, and Leo is standing in our kitchen with a long list in his hand. 'This is the plan,' he says. 'We're leaving at eight tomorrow morning, and the train gets in at eleven. At twelve, we're going to put up the tent, and at one, we're having lunch.' Leo always prepares a plan, and last year he made one for his birthday party.\n\n" +
      "I'm Alina. I'm 22, I'm from Riga, and I study in Manchester. Tomorrow, my flatmates and I are going to our first festival: three days of music, and three nights in a tent! I'm really looking forward to it, because my favourite band is playing on Sunday, and I'm going to be at the front.\n\n" +
      "Sam isn't listening to Leo, because he's looking at his phone. 'Bad news. The forecast says rain, all weekend.' 'Then we'll buy wellies,' Leo says, and he writes 'wellies' on his plan. 'How about umbrellas too?' I say. 'Good idea. Let's make sure we've got everything.' 'Fancy a cup of tea before bed?' Sam asks. Sam always fancies a cup of tea. 'Wait,' I say. 'Sam, is your phone OK?' He shows us: 4%. 'It's fine,' he says. 'It's always at 4%. It's a hard-working phone.'\n\n" +
      "'And who's bringing the tent?' I ask. 'My cousin,' Leo says. 'It's OK, she'll be there, and at least she knows about tents.' Sam looks up from his phone. 'Your cousin? She loses everything!'",
    words: {
      festival: { english: 'фестиваль' },
      band: { english: 'группа (музыкальная)' },
      forecast: { english: 'прогноз (погоды)' },
      wellies: { english: 'резиновые сапоги (разговорное, британское)' },
      fancy: { english: 'хочешь…? (Fancy a cup of tea? — Хочешь чаю?)' },
      tent: { english: 'палатка' },
    },
    expressions: {
      'looking forward to': { english: 'ждать с нетерпением (look forward to)' },
      'how about': { english: 'как насчёт…?' },
    },
    grammarNote:
      "«We're leaving at eight… At twelve, we're going to put up the tent» — о будущем по-английски говорят по-разному. Present Continuous (we're leaving) — то, о чём уже договорились, есть время и билеты. going to — план, намерение. А will — решение, принятое прямо сейчас: «Then we'll buy wellies». По-русски везде просто «мы уедем / купим».",
    comprehensionQuestions: [
      {
        question: 'What kind of person is Leo?',
        options: ['He likes to do things without a plan.', 'He wants to know the time of everything.', "He doesn't like music."],
        correctIndex: 1,
      },
      {
        question: 'What does Leo say when he hears the forecast?',
        options: ["They aren't going to the festival.", 'They will take a taxi.', 'They will get wellies before they go.'],
        correctIndex: 2,
      },
      {
        question: "Why is Sam worried about Leo's cousin?",
        options: ['She often loses things, and she has got the tent.', "She doesn't like festivals.", "She hasn't got a phone."],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-2',
    title: 'Mud',
    titleTranslation: 'Грязь',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "The train is delayed, and the rain starts when we get off on the platform. By one o'clock, we're standing outside the festival in a queue of five thousand people. It's a huge queue, and everyone is wet. When Leo looks at his plan, it's wet too. 'We'll be OK,' he says. 'Lunch is going to be at two now.'\n\n" +
      "Inside, the festival is huge and crowded. There's music in five big tents, food from twenty countries, and mud. A lot of mud. Our wellies are brown in two minutes. At the campsite, we wait for Leo's cousin. 'She'll turn up,' Leo says, and at three, she does, with a big green bag. 'Alright, mates? I'm Jess. Sorry, I met a dog on the train, and we're friends now.' Jess never prepares.\n\n" +
      "The tent is in the bag, but how do you put up a tent? Jess doesn't know, and we don't know. After half an hour, the tent is still in the mud, and we're laughing too much to work. Then two old men from the next tent come to help. 'Don't worry, mates. We'll sort it out,' one says, and in ten minutes, our tent is standing. 'Cheers!' we all say.\n\n" +
      "That evening, I'm walking back from the toilets when I hear music from a tiny tent near the trees. Only ten or twelve people are there, and a woman in a big hat is singing. I stop, because I know that song. And I know that singer.",
    words: {
      queue: { english: 'очередь (британское)' },
      huge: { english: 'огромный' },
      mud: { english: 'грязь (на земле)' },
      campsite: { english: 'кемпинг, палаточный лагерь' },
      mates: { english: 'друзья, приятели (mate — разговорное британское обращение)' },
      cheers: { english: 'спасибо! (разговорное британское)' },
    },
    expressions: {
      'turn up': { english: 'появиться, прийти' },
    },
    splitExpressions: [
      { word1: 'sort', word2: 'out', display: 'sort … out', english: 'разобраться, всё уладить' },
    ],
    grammarNote:
      "«The rain starts when we get off» — после when и if будущее время не ставится, даже если речь о будущем: when we get there, а не when we will get there. По-русски «когда мы приедем» — будущее, а в английском здесь Present Simple. Будущее — только в главной части: When we get there, we'll have lunch.",
    comprehensionQuestions: [
      {
        question: "What is wrong with Leo's plan?",
        options: ['Everything is later than on the plan.', 'Everything is at the right time.', 'Leo loses his plan on the train.'],
        correctIndex: 0,
      },
      {
        question: 'Why is Jess late?',
        options: ['She lost the tent.', 'She went to the wrong festival.', 'She stopped because of an animal on the train.'],
        correctIndex: 2,
      },
      {
        question: 'Who helps with the tent?',
        options: ['People from the festival', 'Two men from the tent next to theirs', 'They do it without help.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-3',
    title: 'The Tiny Stage',
    titleTranslation: 'Маленькая сцена',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "I run back to the tent and shout, 'Come with me! Now!' Leo looks at his plan, because Leo is strict about plans. 'It's nine, and at nine, we're going to bed. Tomorrow is a big day.' 'Leo, please. Ten minutes.' In the end, they all come.\n\n" +
      "The stage is tiny: one light, two guitars and the woman in the big hat. There are only twenty people in the audience, and half of the audience is eating chips. 'That's Kat Rivers,' I say. 'She's the singer from Blue Harbour, my favourite band, and they're playing on Sunday on the big stage.' 'Then why is she singing here, for twenty people, in the rain?' Sam asks. 'I've no idea. But I recognise her voice. It's definitely her. Definitely.'\n\n" +
      "Leo laughs: 'Alina, at first you said the man in the queue was a famous actor.' 'He was!' 'He was a teacher from Leeds.' 'I reckon she's just a woman in a hat,' Jess says. 'You'll see,' I say confidently. 'When the song ends, I'm going to talk to her. If it's her, I'll ask for a photo.' I expect her to say hello to the audience after the song.\n\n" +
      "But after the last song, the woman says 'Thank you' and walks behind the stage, and then she isn't there. We walk back to the campsite, past hundreds of tents: red, blue, yellow, green. Then Leo suddenly stops and says, 'Where's our tent?' Our green tent isn't there, and there's only mud.",
    words: {
      stage: { english: 'сцена' },
      audience: { english: 'публика, зрители' },
      recognise: { english: 'узнавать (британское написание)' },
      voice: { english: 'голос' },
      definitely: { english: 'точно, определённо' },
      reckon: { english: 'думать, считать (разговорное: I reckon… — по-моему, …)' },
    },
    expressions: {
      "i've no idea": { english: 'понятия не имею' },
      'at first': { english: 'сначала, поначалу' },
    },
    grammarNote:
      "«When the song ends, I'm going to talk to her. If it's her, I'll ask for a photo» — после when и if — Present Simple (ends, it's), хотя речь о будущем. По-русски «когда песня закончится» — будущее время, а в английском нельзя when the song will end. Будущее — только во второй части: I'm going to talk, I'll ask.",
    comprehensionQuestions: [
      {
        question: "Why doesn't Leo want to go at first?",
        options: ["He doesn't like music.", 'He is cold and wet.', "It's time for bed on his plan."],
        correctIndex: 2,
      },
      {
        question: 'Why does Sam think the woman is not Kat?',
        options: ["A famous singer doesn't sing for twenty people in the rain.", 'Kat has got a different hat.', 'Kat is in another country.'],
        correctIndex: 0,
      },
      {
        question: 'Why do the friends think Alina is wrong?',
        options: ['She never goes to festivals.', 'She was wrong about a famous person before.', "She doesn't know the band."],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-4',
    title: "Where's Our Tent?",
    titleTranslation: 'Где наша палатка?',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "It's eleven o'clock, and it's freezing. Our tent isn't there: it disappeared. 'Maybe a dog took it,' Jess says. 'A dog can't take a tent,' Leo says. 'Calm down, everyone.' 'I've no idea where it is,' Sam says, and he takes out his phone. 'I'll use it as a torch.' 'Sam, it's at 4%!' 'It'll be fine.' Two minutes later, his torch is at 2%.\n\n" +
      "'OK,' Leo says. 'New plan. We're going to look everywhere, and we're going to share the task. Jess and Sam, you take the left, and Alina and I will take the right. When we find it, we'll shout.'\n\n" +
      "For an hour, we look at every green tent on the campsite, and there are hundreds. At twelve, I open a green tent, and a man inside shouts at me in German. 'Sorry!' I say, and I run. At one, Sam's phone goes black, and his torch disappears too. We're wet, tired and freezing, and our wellies are full of mud. 'I'm going to give up,' I say. 'We'll sleep in the food tent.' 'Why don't we ask someone?' Leo says. 'At one in the morning?' I wonder what Kat is doing now. She's probably sleeping in a warm hotel.\n\n" +
      "Then Jess stops. She looks at the trees, then at the toilets, then at us, and suddenly she realises something. 'Er… everyone? I think I made a mistake.' 'What mistake?' Leo asks, and he looks worried. Jess looks at her feet. 'I think this isn't our campsite.'",
    words: {
      freezing: { english: 'ледяной; очень холодно (it\'s freezing — жуткий холод)' },
      disappeared: { english: 'исчезла (disappear — исчезать)' },
      torch: { english: 'фонарик (британское; в США — flashlight)' },
      everywhere: { english: 'везде, повсюду' },
      realises: { english: 'понимает, осознаёт (realise)' },
    },
    expressions: {
      'give up': { english: 'сдаться, бросить (попытки)' },
      "why don't we": { english: 'давай…? / почему бы нам не…?' },
    },
    grammarNote:
      "«I'll use it as a torch» — will для решения, которое человек принимает прямо сейчас. А «We're going to look everywhere» — going to: план уже есть. По-русски в обоих случаях «я посвечу / мы поищем», а в английском выбор формы показывает, решили вы только что или заранее.",
    comprehensionQuestions: [
      {
        question: "Why is Sam's phone a problem?",
        options: ["It doesn't work in the rain.", "It's going to stop working soon.", 'Sam lost it.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Alina run from the green tent?',
        options: ['A man inside is angry with her.', 'It is full of water.', 'She sees Kat inside.'],
        correctIndex: 0,
      },
      {
        question: 'How does Jess feel at the end?',
        options: ['Happy, because she found the tent', 'Tired, because it is late', 'Bad, because it is her mistake'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-5',
    title: 'Four Per Cent',
    titleTranslation: 'Четыре процента',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "We sleep in the big food tent, on chairs, with fifty other wet people, but it's freezing, so we only try to sleep. When the sun comes out at seven, I'm knackered, and so are the others. 'There are two campsites,' Jess says, 'A and B. Our tent is definitely in A. Well, perhaps.' The problem is that campsite A has got two thousand tents.\n\n" +
      "'Wait,' Leo says. 'Sam, you took a photo of our tent yesterday, with the number next to it!' 'Yes! But my phone is dead at the moment.' There's a tent where you can charge your phone, but it's crowded, and the queue is huge. 'We're going to be here for ages,' Sam says. 'Never mind. I'll wait with you,' I say. Leo and Jess are going to get breakfast for all of us.\n\n" +
      "In front of us, there's a woman in a big hat, and her phone is dead too. 'Phones always run out of battery at festivals,' she says. 'Sam's battery is at 4% all year,' I say. She laughs, and I recognise that laugh. 'Where are you from?' she asks. 'Riga,' I say.\n\n" +
      "'When it's our turn, we'll charge both phones together,' she says. 'Thank you,' I say. 'Excuse me… are you…?' She looks behind her, because she doesn't want anyone to hear. Then she speaks very quietly, so only I can hear. 'I'm Kat. Please don't tell anyone.'",
    words: {
      knackered: { english: 'вымотанный, без сил (разговорное британское)' },
      perhaps: { english: 'может быть, возможно' },
      dead: { english: 'разряженный (о телефоне); мёртвый' },
      anyone: { english: 'кто-нибудь; (в отрицании) никто: don\'t tell anyone — никому не говори' },
      battery: { english: 'батарея, аккумулятор' },
    },
    expressions: {
      'at the moment': { english: 'сейчас, в данный момент' },
      'run out of': { english: 'закончиться, израсходовать (run out of battery — разрядиться)' },
    },
    grammarNote:
      "«When it's our turn, we'll charge both phones» — снова when + Present Simple, а будущее (we'll) — во второй части. И ещё: «Leo and Jess are going to get breakfast» — going to: они уже решили. По-русски «они пойдут за завтраком» — просто будущее, без такой разницы.",
    comprehensionQuestions: [
      {
        question: 'Why does Sam need to charge his phone?',
        options: ['There is a photo of their tent on it.', 'He wants to call his mum.', 'He wants to listen to music.'],
        correctIndex: 0,
      },
      {
        question: 'How does Alina feel in the morning?',
        options: ['Happy and ready for the day', 'Very tired after a night with no sleep', 'Angry with Sam'],
        correctIndex: 1,
      },
      {
        question: 'Why does the woman speak quietly?',
        options: ['Sam is sleeping.', 'She is tired.', "She doesn't want other people to know who she is."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-6',
    title: "Don't Tell Anyone",
    titleTranslation: 'Никому не говори',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Kat tells me everything. 'Blue Harbour has got a new album, and tonight we're going to play it for the first time, on the tiny stage, for two hundred people. It's a secret. If everyone finds out, fifty thousand people will come.' 'I promise I won't tell anyone,' I say. 'Come at nine,' she says, 'and bring your friends.' Then her phone is charged, and she leaves. I'm so surprised.\n\n" +
      "Sam's battery is at 20% now, and he finds the photo: our tent, next to the number A14. Ten minutes later, we're standing in front of it. It's there, but it's full of water, and my sleeping bag is swimming. 'It doesn't matter,' Jess says. 'Perhaps we're lucky. The wrong campsite was good for us: we didn't sleep in a tent full of water!'\n\n" +
      "I want to tell my friends about Kat, but I made a promise, so I only say, 'Tonight at nine, we're going to the tiny stage. All of us.' Leo looks at his plan. 'At nine, the Silver Lines are playing on the big stage, and they're on the plan.' 'Leo, please. It's important.' 'Why?' 'I can't say. It's a secret.' Leo looks disappointed.\n\n" +
      "'OK,' Sam says. 'Let's make a decision. Hands up for the tiny stage.' Two hands go up: Jess's and Sam's. Leo looks at us for a long time, and then he puts his plan in his bag. 'Fine,' he says. 'I'm going to the big stage, without you.'",
    words: {
      album: { english: 'альбом' },
      secret: { english: 'секрет, тайна' },
      promise: { english: 'обещать: I promise — обещаю' },
      lucky: { english: 'везучий: we\'re lucky — нам повезло' },
    },
    expressions: {
      'sleeping bag': { english: 'спальный мешок' },
      "it doesn't matter": { english: 'неважно, ничего страшного' },
      'make a decision': { english: 'принять решение (make, не take и не do)' },
    },
    grammarNote:
      "«If everyone finds out, fifty thousand people will come» — первая часть с if — в Present Simple (finds out), а будущее — только во второй: will come. По-русски «если все узнают» — будущее время, поэтому хочется сказать if everyone will find out. Так нельзя. А «I promise I won't tell» — won't = will not.",
    comprehensionQuestions: [
      {
        question: 'Why is tonight a secret?',
        options: ["The band doesn't like the tiny stage.", 'Kat is not in the band any more.', 'The band wants a small audience for the new songs.'],
        correctIndex: 2,
      },
      {
        question: 'What is the problem with the tent?',
        options: ['It is in campsite B.', 'There is water inside.', 'A man took it.'],
        correctIndex: 1,
      },
      {
        question: "Why doesn't Alina tell her friends about Kat?",
        options: ['She made a promise to Kat.', 'She is not sure it was Kat.', 'Leo is angry with her.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-7',
    title: "Nine O'Clock",
    titleTranslation: 'Девять часов',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "At nine, the tiny stage looks the same: one light, two guitars. But tonight there are loads of people, maybe two hundred, and the crowd is quiet. Then four people come on stage, and a man at the front shouts, 'No way! It's Blue Harbour!', and then everyone is shouting.\n\n" +
      "For an hour, they play the new album, and every song is brilliant. Kat sings, the crowd sings as well, and the rain stops. Jess is dancing with a stranger in a yellow hat, a very friendly stranger. Sam takes out his phone, because he wants to film it. 'It's at 3%,' he says, 'but I'll film one song. Just one.' 'Leo is going to be so angry,' Jess says. 'When he hears about this, he'll eat his plan.'\n\n" +
      "Before the last song, Kat stops. 'This morning, my phone was dead,' she says. 'In the queue, I met a girl, and I told her about tonight. She didn't tell anyone. This song is for her: the girl from Riga.' Everyone turns to look, and my face goes red. 'That's her!' Jess shouts, and she picks me up. 'She's from Riga!' I'm so proud that I can't speak.\n\n" +
      "After the gig, Leo calls, and for a long time, he doesn't say anything. Then he says, 'Alina. Everyone at the big stage is talking about a secret gig, a brilliant secret gig. Please tell me you weren't there.' 'By the way,' Sam says behind me, 'my phone's dead again.'",
    words: {
      loads: { english: 'куча, много (разговорное: loads of people)' },
      crowd: { english: 'толпа' },
      brilliant: { english: 'отличный, потрясающий (британское разговорное)' },
      stranger: { english: 'незнакомец, незнакомый человек' },
      gig: { english: 'концерт, выступление (разговорное)' },
    },
    expressions: {
      'as well': { english: 'тоже, также (в конце фразы)' },
      'by the way': { english: 'кстати' },
    },
    grammarNote:
      "«When he hears about this, he'll eat his plan» — when + Present Simple, а will — во второй части. И «Leo is going to be so angry» — going to бывает и предсказанием, когда для него есть причина прямо сейчас: Лео пропускает концерт. По-русски — просто «он разозлится».",
    comprehensionQuestions: [
      {
        question: 'Who is the man at the front shouting about?',
        options: ['Leo', 'The band on the stage', 'A stranger in a yellow hat'],
        correctIndex: 1,
      },
      {
        question: 'Why does Kat sing the last song for Alina?',
        options: ['Alina loves the band.', 'Alina is from Riga.', "Alina didn't tell anyone about the gig."],
        correctIndex: 2,
      },
      {
        question: 'How does Leo feel on the phone?',
        options: ['He is sad because he missed the gig.', 'He is happy for Alina.', 'He is angry about the rain.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m2-8',
    title: 'Sunday',
    titleTranslation: 'Воскресенье',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Sunday morning, Leo isn't talking. He's sitting outside our tent with his plan in his hands. Last night, he stood at the big stage with three thousand people and watched the Silver Lines. 'They were fine,' he says. 'Just fine.' He's gutted and disappointed.\n\n" +
      "'Leo, I wanted to tell you, but I promised Kat.' 'I know. Sam showed me the video. Well, he showed me ten seconds, and then his phone went black.' Leo looks at his plan for a long time, then walks to the bin and throws it away. 'No more plans,' he says. 'I'm hard-working, but I'm not good at fun, and I want to improve. Tonight, we're going to see Blue Harbour. After that, we'll see. It's up to you.'\n\n" +
      "That night, there are fifty thousand people in the crowd, and the four of us are at the front, in the mud and in our wellies. Kat sings the new album, and this time Leo sings as well. Before the last song, Kat looks at the audience, then right at me, and smiles. Leo's mouth is open. 'She knows you!' 'I told you,' I say, and I'm so chuffed.\n\n" +
      "On Monday, we go home on the train, wet, muddy and chuffed. Sam's phone is muddy and dead. Leo takes out a pen. 'No plans, Leo!' I say. 'It isn't a plan,' he says. 'It's a list of festivals for next year. And if Jess brings the tent again, I'll bring a map.'",
    words: {
      gutted: { english: 'очень расстроенный (разговорное британское)' },
      bin: { english: 'мусорное ведро, урна' },
      muddy: { english: 'грязный, в грязи' },
      chuffed: { english: 'очень довольный (разговорное британское)' },
    },
    expressions: {
      'throws it away': { english: 'выбрасывает (throw away)' },
      "it's up to you": { english: 'решать тебе / как хочешь' },
    },
    grammarNote:
      "«Tonight, we're going to see Blue Harbour. After that, we'll see» — going to: план уже есть; we'll see: «посмотрим», решения пока нет. А «If Jess brings the tent again, I'll bring a map» — if + Present Simple, как и во всём модуле. Запомните: не if Jess will bring.",
    comprehensionQuestions: [
      {
        question: 'Why is Leo sad on Sunday morning?',
        options: ['He missed the secret gig because of his plan.', 'He lost his wellies.', 'The Silver Lines did not play.'],
        correctIndex: 0,
      },
      {
        question: 'What does Leo do with his plan?',
        options: ['He gives it to Alina.', 'He writes a new one for Sunday.', 'He puts it in the bin.'],
        correctIndex: 2,
      },
      {
        question: 'What is different about Leo at the end?',
        options: ["He doesn't want to go to festivals again.", "He doesn't need a plan now, but he still likes lists.", 'He wants to be a singer.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
];
