import type { ReadingText } from '@/types/dutch';

const M = 'a2-flat-hunting' as const;
const MT = 'Flat Hunting';

export const moduleA2_4Texts: ReadingText[] = [
  {
    id: 'a2m4-1',
    title: 'Two Weeks',
    titleTranslation: 'Две недели',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "The letter came on a Monday. Our landlord was going to sell the house, and we had to move out in two weeks. Two weeks! Could we find something in time? Jake read the letter three times. 'Mira, that's impossible,' he said. 'Nobody can find a flat in Bristol in two weeks.'\n\n" +
      "I'm Mira. I'm 25, I'm from Moldova, and I'm a designer. Jake is my best friend from university, and we pay the rent half each. He's an English teacher at a school, and his colleagues say he's the most patient person in the building. Well, he was. That evening, we looked at flats on the internet for four hours. There weren't many flats in our area, and the rent was much more expensive than before. 'We can't afford this one,' Jake said. 'Or this one. Or any of them. In fact, we can't afford Bristol.'\n\n" +
      "Then I called my mum, because she always has a lot of advice. 'You should look in a different area,' she said. 'You don't have to live in the centre. And you have to see every flat before you pay any money.' 'Thanks, Mum,' I said. 'That's good advice.' 'I've got some more,' she said, and she talked for forty minutes. It was a bit annoying, but I expected that.\n\n" +
      "At twelve at night, Jake suddenly shouted. 'Mira! Look at this one!' It was a big flat with two bedrooms, a garden and a new kitchen. It was near the centre, and the rent was cheaper than our old flat, so we could easily afford it. 'It's perfect,' Jake said. I looked at the photos for a long time. 'It's too perfect,' I said.",
    words: {
      landlord: { english: 'хозяин квартиры, арендодатель' },
      area: { english: 'район' },
      rent: { english: 'арендная плата, квартплата' },
      afford: { english: 'позволить себе (по деньгам): can\'t afford — не по карману' },
      advice: { english: 'совет, советы (неисчисляемое: some advice, не an advice)' },
    },
    expressions: {
      'move out': { english: 'съехать (с квартиры)' },
      'in time': { english: 'вовремя, успеть к сроку' },
    },
    grammarNote:
      "«She always has a lot of advice… That's good advice» — advice неисчисляемое: нельзя an advice или advices. Говорят some advice, a lot of advice, a piece of advice. По-русски «совет» и «советы» — обычные слова с числом, поэтому хочется сказать an advice. Так же с information и furniture.",
    comprehensionQuestions: [
      {
        question: 'Why do Mira and Jake need a new flat?',
        options: ['Their flat is too small.', 'Their landlord is going to sell the house.', 'They want to live in the centre.'],
        correctIndex: 1,
      },
      {
        question: "What does Mira's mum tell them?",
        options: ['To look for a flat in a different area', 'To live with her', 'To pay before they see a flat'],
        correctIndex: 0,
      },
      {
        question: 'Why is Mira not happy about the perfect flat?',
        options: ['It is too far from the centre.', 'It has got only one bedroom.', 'She thinks it is too good, and something is wrong.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-2',
    title: 'Too Good to Be True',
    titleTranslation: 'Слишком хорошо, чтобы быть правдой',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Jake wrote to the landlord that night. His name was Mr Smith, and he answered in five minutes. 'Thank you for your email. The flat is still available, but a lot of people want it, so someone else can take it soon. I live abroad at the moment, so you can't see it. Please send me a deposit of £900 as soon as possible, and I'll post you the keys.'\n\n" +
      "'Brilliant,' Jake said. 'Let's pay now. I'd rather pay today than lose it tomorrow.' 'Wait,' I said. 'It's too good to be true. Remember Mum's advice? We have to see every flat before we pay any money. Can we really trust a man abroad?' 'Your mum isn't looking for a flat in two weeks,' Jake said. 'There aren't many flats like this one, and it's definitely available.'\n\n" +
      "I read the email again. There wasn't much information about Mr Smith: no phone number, no address, only an email. And the photos of the flat looked a bit too nice. I looked for one of the photos on the internet, and in ten seconds, I found the same photo on a website for a hotel in Spain. 'Jake,' I said. 'I reckon this is fake. The photos are fake, and maybe Mr Smith is fake too.'\n\n" +
      "Jake looked at my screen for a long time. 'No way,' he said. 'Perhaps the flat is real, and Mr Smith just took the photos from the hotel?' 'Perhaps,' I said. 'Let's find out. The address is in the advert. Tomorrow morning, we're going to go there and see the real thing.'",
    words: {
      available: { english: 'свободный, доступный (о квартире, товаре)' },
      abroad: { english: 'за границей' },
      deposit: { english: 'залог, депозит' },
      fake: { english: 'фальшивый, поддельный' },
      real: { english: 'настоящий, реальный' },
    },
    expressions: {
      "i'd rather": { english: 'я бы лучше…, я предпочёл бы…' },
      'too good to be true': { english: 'слишком хорошо, чтобы быть правдой' },
    },
    grammarNote:
      "«There wasn't much information… There aren't many flats like this one» — much — с неисчисляемыми (information, money, time), many — с исчисляемыми во множественном числе (flats, people). По-русски в обоих случаях «много», а в английском выбор зависит от слова. И information — без -s: не informations.",
    comprehensionQuestions: [
      {
        question: 'What does Mr Smith want?',
        options: ['He wants money before they see the flat.', 'He wants them to see the flat first.', 'He wants to meet them in Spain.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Jake want to pay today?',
        options: ['He has got a lot of money.', 'He knows Mr Smith.', 'He is worried another person will get the flat.'],
        correctIndex: 2,
      },
      {
        question: 'What does Mira find out about the photos?',
        options: ['They are photos of her old flat.', 'They come from a hotel website.', 'They are very old.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-3',
    title: 'The Fifth Person',
    titleTranslation: 'Пятый человек',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "The next morning, we found the address: a real house on a quiet street, with blue windows and a red door. 'See?' Jake said. 'It's real!' A woman of about sixty with curly grey hair opened the door. She looked at us, then at Jake's phone. 'Let me guess,' she said. 'Mr Smith? The flat with the garden?' 'Yes!' 'You're the fifth person this week. There's no Mr Smith. This is my house, and there's no flat for rent here. What a shame.'\n\n" +
      "Her name was Mrs Okafor, and she was the kindest person in the neighbourhood. She asked us in for tea. 'Did you send him any money?' she asked. 'No,' I said. 'Luckily, my mum gives a lot of advice.' Jake looked at the floor, because it was a bit embarrassing for him. 'Two people last week paid him,' Mrs Okafor said. 'The police know about it, but they can't find him. You have to be careful on the internet. Careful people don't send money to strangers.' 'I'm glad we didn't pay,' Jake said quietly.\n\n" +
      "Then she told us about another flat. 'There's a flat on the fourth floor of my brother's house, two streets away. It isn't beautiful, and it isn't new, but the rent is fair. In this neighbourhood, a fair rent is rare.' 'Can we see it?' 'Of course. But you should know one thing. The landlord, Mr Price, is a good man, but he's difficult to deal with.' 'Why?' Jake asked. Mrs Okafor laughed. 'He never answers his phone.'",
    words: {
      neighbourhood: { english: 'район, округа; соседи' },
      luckily: { english: 'к счастью' },
      careful: { english: 'осторожный: be careful — будь осторожен' },
      fair: { english: 'справедливый, честный (о цене)' },
    },
    expressions: {
      'deal with': { english: 'иметь дело с кем-то, справляться с чем-то' },
      'let me guess': { english: 'дай угадаю' },
    },
    grammarNote:
      "«You have to be careful… But you should know one thing» — have to — «надо, обязательно» (правило, без выбора), а should — «стоит, лучше бы» (совет). По-русски и то и другое часто «надо», а в английском should мягче. И «Did you send him any money?» — any в вопросах и отрицаниях, some — в утверждениях: I've got some money.",
    comprehensionQuestions: [
      {
        question: 'Why does Mrs Okafor know about Mr Smith?',
        options: ['Mr Smith is her brother.', 'She saw him on the internet.', 'Other people came to her house because of the same advert.'],
        correctIndex: 2,
      },
      {
        question: 'How does Jake feel when Mrs Okafor talks about the money?',
        options: ['Angry with Mira', 'Bad, because he wanted to pay', 'Happy, because he paid'],
        correctIndex: 1,
      },
      {
        question: 'What is the problem with the new flat?',
        options: ['It is difficult to talk to the landlord.', 'It is too expensive.', 'It is in another city.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-4',
    title: 'No Answer',
    titleTranslation: 'Нет ответа',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Mrs Okafor gave us Mr Price's number, and I called him at ten, but there was no answer. I called again at twelve, at two and at four, and there was still no answer. Jake left a voice message: 'Hello, Mr Price. We'd like to see the flat. Please ring us back.' Nobody rang back.\n\n" +
      "On Wednesday, we called eleven times. On Thursday, we sent him an email, a text and a letter. 'This is the most annoying man in Bristol,' Jake said. 'It's rude not to answer. We should complain to someone.' 'Who can we complain to?' I asked. 'He's the landlord. And he's real, at least. Not like Mr Smith. We just have to be patient.' We tried to contact him in every way, but we only had nine days left, and we didn't have much time for this.\n\n" +
      "On Friday, Mrs Okafor called us. 'He's here,' she said. 'Hurry up!' Luckily, it wasn't far, so we ran there in a hurry. 'Remember,' she said at the door, 'he's difficult to deal with.' Mr Price was in the garden behind the house with an old bike, and his hands were black. He was about seventy, with a big grey beard, and he walked slowly towards us. 'Mr Price? We called you twenty times!' 'Did you?' he said. 'I don't really use my phone. Take your time, take your time. Do you want to see the flat?'\n\n" +
      "We went up four floors, and Mr Price stopped at the door and looked at us. 'Before you go in,' he said, 'I have to tell you something. The flat has got a few problems. Only a few.'",
    words: {
      complain: { english: 'жаловаться' },
      ring: { english: 'звонить (по телефону, британское разговорное)' },
      contact: { english: 'связаться с кем-то' },
      few: { english: 'несколько (a few problems — несколько проблем)' },
    },
    expressions: {
      'take your time': { english: 'не торопись' },
      'hurry up': { english: 'поторопиться: Hurry up! — Быстрее!' },
    },
    grammarNote:
      "«We didn't have much time… The flat has got a few problems» — much — с неисчисляемыми (time, money), а a few — «несколько», с исчисляемыми (problems, days). По-русски «немного времени» и «несколько проблем» — разные слова, и в английском тоже: a little time, a few problems. Не путайте: few problems без a значит «мало проблем».",
    comprehensionQuestions: [
      {
        question: "Why can't they talk to Mr Price?",
        options: ['He is abroad.', "He doesn't answer his phone or emails.", 'He is ill.'],
        correctIndex: 1,
      },
      {
        question: 'How does Jake feel on Thursday?',
        options: ['Relaxed', 'Happy', 'Annoyed'],
        correctIndex: 2,
      },
      {
        question: 'Why does Mr Price stop at the door?',
        options: ['He wants to tell them that the flat is not perfect.', 'He forgot the keys.', 'He is tired after the stairs.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-5',
    title: 'A Few Problems',
    titleTranslation: 'Несколько проблем',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "The flat had two bedrooms, a small kitchen and a big window, and from the window you could see all of Bristol. Luckily, it was furnished: there was an old sofa and two beds. 'It's beautiful,' I said. 'Wait,' Mr Price said, and he opened the bathroom door. It was dark, so he used a torch. There was damp on the walls, and black mould in one corner. 'And the boiler is old,' he said. 'Sometimes there isn't any hot water. You have to turn on the heating early in the morning, and sometimes the heating doesn't turn on at all.'\n\n" +
      "Jake and I looked at each other. The flat was older than our old flat, and the bathroom was worse, with all that damp and mould. But the rent was fair, the cheapest in the area, and at least the window was the best in Bristol. 'Can you repair the boiler?' Jake asked. 'I can try,' Mr Price said. 'It's only a few problems. I'm good with old things, and I'm an old thing myself.' I expected Jake to say no, but he laughed.\n\n" +
      "We went outside to talk. 'Should we take it?' I asked. 'We haven't got any other flats,' Jake said, 'and we've only got eight days.' 'Mum says we shouldn't take a flat with mould.' 'Your mum doesn't have to live in a hotel next week,' Jake said. 'Fair enough,' I said.\n\n" +
      "In the end, we made a decision. 'We'll take it,' I told Mr Price. 'But we had better clean the bathroom first. And can you repair the boiler before Saturday?' Mr Price smiled for the first time. 'Good. You can move in on Saturday. And you don't have to pay a deposit. Mrs Okafor says you're good people.'",
    words: {
      furnished: { english: 'с мебелью, меблированный' },
      heating: { english: 'отопление' },
      damp: { english: 'сырость; сырой' },
      mould: { english: 'плесень (британское написание)' },
      boiler: { english: 'бойлер, котёл (для горячей воды и отопления)' },
      repair: { english: 'ремонтировать, чинить' },
    },
    expressions: {
      'turn on': { english: 'включать' },
      'had better': { english: 'лучше бы, стоит (совет с оттенком «иначе будет плохо»)' },
    },
    grammarNote:
      "«You have to turn on the heating… you don't have to pay a deposit» — have to — «нужно», а don't have to — «не нужно, не обязательно». Внимание: это не то же самое, что mustn't («нельзя»)! По-русски «не надо платить» может значить и «не обязательно», и «нельзя», а в английском это разные вещи.",
    comprehensionQuestions: [
      {
        question: 'What is good about the flat?',
        options: ['The bathroom is new.', 'The boiler works well.', 'It is cheap, and you can see all of Bristol from it.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Jake want to take the flat?',
        options: ['They have got very little time to find another one.', 'He likes old flats.', 'Mira’s mum likes it.'],
        correctIndex: 0,
      },
      {
        question: "Why don't they have to pay a deposit?",
        options: ['Mr Price forgot.', 'Mrs Okafor said they are good people.', 'The flat is too old.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-6',
    title: 'Moving Day',
    titleTranslation: 'День переезда',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Saturday morning, we were ready to move in. We had forty boxes, two bikes, loads of furniture and no car. 'My uncle has got a van,' Jake said. 'I'll ask him to lend it to us.' His uncle said yes, but only until two o'clock. 'You can borrow it,' he said, 'but bring it back with petrol in it.' 'Cheers!' Jake said, and we drove the van to the new flat in a hurry.\n\n" +
      "Moving was harder than we expected. Mrs Okafor's brother's house had no lift, and our flat was on the fourth floor. The boxes were heavy, and Jake's books were the heaviest of all. Every time I picked a box up, I wanted to put it down again. 'Why have you got so many books?' I asked on the stairs. 'Why have you got so many shoes?' he asked. 'Carry on!' I said. By one o'clock, everything was inside, and we were knackered.\n\n" +
      "Then we realised: there was no kettle, no cups and no milk. 'We should buy some things,' Jake said. 'We haven't got any money left,' I said. 'The van needs petrol, and we can't borrow money from your uncle too.' Just then, there was someone at the door. It was Mrs Okafor, with a kettle, two cups and some biscuits. 'I can lend you these until you go shopping,' she said. 'Welcome to the neighbourhood.'\n\n" +
      "That evening, I wanted a hot shower, so I turned on the water and waited. And waited. It was freezing. 'Jake?' I called. 'Is your water hot?' 'No,' he said from the kitchen. 'And the heating doesn't work. The boiler is dead again.'",
    words: {
      lend: { english: 'одалживать, давать на время (кому-то)' },
      borrow: { english: 'брать на время, занимать (у кого-то)' },
      petrol: { english: 'бензин (британское; в США — gas)' },
      heavy: { english: 'тяжёлый' },
      kettle: { english: 'чайник (электрический)' },
      van: { english: 'фургон' },
    },
    expressions: {
      'carry on': { english: 'продолжать' },
      'move in': { english: 'въехать (в квартиру)' },
    },
    grammarNote:
      "«I'll ask him to lend it to us… You can borrow it» — lend — «давать на время» (кому-то), borrow — «брать на время» (у кого-то). По-русски часто одно слово «одолжить» на оба случая, поэтому легко сказать Can you borrow me…? — это ошибка. Правильно: Can you lend me…? или Can I borrow…?",
    comprehensionQuestions: [
      {
        question: "What does Jake's uncle ask for?",
        options: ['Money for the van', 'The van back by two, with petrol in it', 'Help with his boxes'],
        correctIndex: 1,
      },
      {
        question: 'Why is moving so difficult?',
        options: ['There is no lift, and the flat is on the fourth floor.', 'The van is too small.', 'It is raining.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Mrs Okafor bring a kettle and cups?',
        options: ['She wants to sell them.', 'She wants tea with Mr Price.', 'Mira and Jake have not got these things.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-7',
    title: 'Bills',
    titleTranslation: 'Счета',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Mr Price came on Sunday with a big bag. He talked to the boiler for two hours and repaired it, and by lunch there was hot water. 'It's old,' he said, 'but it isn't dead.' We gave him a cup of tea in Mrs Okafor's cup, because we still had to give it back.\n\n" +
      "Then the bills started to arrive: first the electricity, then the gas, then the internet, and then the council tax. Jake sat at the kitchen table with all the letters and a pen. 'OK,' he said. 'We need a budget. How much money do we need every month?' 'I don't know,' I said. 'A lot?' 'Too much,' Jake said. 'Electricity is expensive, and gas is worse. With a budget, we can save money every month. We shouldn't waste electricity. Lights off when you leave a room, and don't turn on the heating at night. Short showers. And we're going to eat out only on Fridays. Vegetables are cheaper than meat, so we're probably going to be vegetarian.' 'How short are the showers?' 'Very short.'\n\n" +
      "On Wednesday, another letter came from the gas company. I opened it and sat down. 'Jake. We owe them £640.' 'For one week? That's impossible!' 'It says we used more gas than a small hotel.' Jake took the letter, and he looked annoyed. 'This is a mistake. Someone made a mistake with the numbers.' 'Or the boiler is eating gas on purpose,' I said.\n\n" +
      "We called the gas company and waited for forty minutes, and then the call ended. Jake put the letter in the bin and his head on the table. 'I'd rather live in the van,' he said.",
    words: {
      gas: { english: 'газ' },
      electricity: { english: 'электричество' },
      budget: { english: 'бюджет' },
      save: { english: 'экономить, копить' },
      waste: { english: 'тратить впустую' },
      owe: { english: 'быть должным: we owe them — мы им должны' },
    },
    expressions: {
      'council tax': { english: 'муниципальный налог (в Великобритании)' },
      'on purpose': { english: 'нарочно, специально' },
    },
    grammarNote:
      "«How much money do we need every month?» — How much — с неисчисляемыми (money, time, gas), How many — с исчисляемыми (bills, rooms). По-русски «сколько» — одно слово на всё. И «We shouldn't waste electricity» — shouldn't = «не стоит», совет, а не запрет.",
    comprehensionQuestions: [
      {
        question: 'What does Mr Price do on Sunday?',
        options: ['He brings them a kettle.', 'He pays the bills.', 'He fixes the boiler.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Jake want short showers?',
        options: ['The water is cold.', 'They need to save money.', 'There is mould in the bathroom.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Jake think the gas bill is wrong?',
        options: ['It is much too big for one week.', 'They paid it last week.', 'The flat has got no gas.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m4-8',
    title: 'Home',
    titleTranslation: 'Дом',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Thursday, Mrs Okafor came up for tea and saw the gas bill on the table. Jake took it out of the bin for her. She read it and laughed. 'This isn't your bill,' she said. 'Look at the name. It's for the last tenant. He moved out a year ago, and he never paid. Mr Price was too generous with him, and the gas company always sends his letters here.' Jake looked at me. 'So I don't have to live in the van,' he said quietly. He was so glad.\n\n" +
      "I called the gas company again. This time, a man answered in five minutes, and he was very sympathetic. 'You don't have to pay this,' he said. 'It's the last tenant's bill.' I danced in the kitchen.\n\n" +
      "On Saturday, we had a small party to celebrate. We didn't have much money, so we made soup and bought some bread. There was a vegetarian starter, spicy soup and a cake for dessert. Mrs Okafor came, and this time we lent her our kettle. Our landlord, Mr Price, came with a new shower. 'A present,' he said. 'Don't waste the hot water.' Jake borrowed six chairs from the neighbours, and we sat in our tiny, damp, cosy flat, with all of Bristol in the window. We didn't owe anyone anything. 'Mrs Okafor likes to look after everyone on this street,' Jake said. 'It's easy to make friends here.' In fact, half the street came to hang out in our kitchen, and we were chuffed.\n\n" +
      "Later, I called my mum. 'Well?' she asked. 'Is the flat good?' I looked at the mould in the corner, the old sofa and my friends. 'It isn't perfect,' I said. 'But it's home, and it's cosy. And Mum? Thanks for the advice.'",
    words: {
      tenant: { english: 'жилец, арендатор' },
      celebrate: { english: 'праздновать, отмечать' },
      cosy: { english: 'уютный (британское написание)' },
      generous: { english: 'щедрый' },
    },
    expressions: {
      'look after': { english: 'заботиться о ком-то, присматривать' },
      'make friends': { english: 'заводить друзей, подружиться' },
    },
    grammarNote:
      "«We didn't have much money, so we made soup and bought some bread» — much — с неисчисляемыми в отрицаниях (not much money), some — в утверждениях (some bread). Bread тоже неисчисляемое: нельзя a bread, только some bread или a loaf of bread. По-русски «хлеб» — без числа, так что здесь ошибиться легче с bread-s.",
    comprehensionQuestions: [
      {
        question: 'Why is the gas bill not for Mira and Jake?',
        options: ['It is for Mrs Okafor.', 'It is for the man in the flat before them.', 'It is for Mr Price.'],
        correctIndex: 1,
      },
      {
        question: 'What does Mr Price bring to the party?',
        options: ['Something for the bathroom', 'Six chairs', 'Soup'],
        correctIndex: 0,
      },
      {
        question: 'How does Mira feel about the flat at the end?',
        options: ['She wants to move out.', 'She thinks it is perfect.', "She knows it has problems, but she's happy there."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
