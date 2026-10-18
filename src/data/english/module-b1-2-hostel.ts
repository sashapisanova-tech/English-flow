import type { ReadingText } from '@/types/dutch';

const M = 'b1-hostel' as const;
const MT = 'Mystery at the Hostel';

export const moduleB1_2Texts: ReadingText[] = [
  {
    id: 'b1m2-1',
    title: 'Locker Six',
    titleTranslation: 'Шкафчик номер шесть',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "I arrived in Edinburgh on a wet Friday evening after a long journey by train from London, and before I went to the hostel, I read its reviews on my phone in a café near the station. I'm Ruslan, I'm 29, and I'm from Almaty. For the last year, I've been travelling in Europe with one backpack and a small budget, so my accommodation is always a hostel, and I always read the reviews first.\n\n" +
      "'Great location, five minutes from the castle, and the manager makes the best tea in Scotland.' ★★★★★  'Friendly people, but security is bad. Locker six doesn't lock!' ★★★\n\n" +
      "The hostel was in an old grey building in the middle of the city, and at reception a big man with a red beard was drinking tea and reading a book. 'Welcome! I'm Fergus, the manager,' he said. 'You're in room six, a shared room with four beds. Here's the internet password, and put your luggage in a locker, because security isn't great here at night.'\n\n" +
      "In room six, a young woman with a map of Scotland was sitting on the bed by the window, from which you could see the castle. 'Hi, I'm Ines,' she said. 'I'm from Porto, I've been here for a week, and my flight home is on Sunday.' The other two beds were empty, but there were bags on them. 'Two more guests,' Ines said. 'They're out.' There were four lockers on the wall, and when I tried the only free one, number six, the door didn't lock properly.\n\n" +
      "I went back to reception. 'Ah, locker six,' Fergus said. 'It's out of order. I'm going to repair it tomorrow. Keep an eye on your things tonight.' But when I came back, Ines had already taken locker six, because her own locker had no key. 'It's fine,' she said, and she put her red passport inside. 'Nobody steals passports.' So I kept my luggage under my bed.\n\n" +
      "That night, a noise woke me up at three o'clock, when the lights were off and someone was standing by the lockers with a phone light, opening and closing a door. I was too tired to look, and I went back to sleep. In the morning, Ines was standing in front of locker six with a white face. 'My passport,' she said. 'It's missing.' 'Missing? Are you sure?' I asked.",
    words: {
      manager: { english: 'управляющий, менеджер' },
      castle: { english: 'замок (крепость)' },
      security: { english: 'безопасность, охрана' },
      locker: { english: 'шкафчик (с замком)' },
      properly: { english: 'как следует, нормально' },
      missing: { english: 'пропавший: it\'s missing — его нет, пропал' },
    },
    expressions: {
      'out of order': { english: 'не работает, сломан' },
      'keep an eye on': { english: 'присматривать за, следить за' },
    },
    grammarNote:
      "«When I came back, Ines had already taken locker six» — Past Perfect (had + третья форма): одно прошлое действие случилось раньше другого. Сначала Инес заняла шкафчик, потом Руслан вернулся. По-русски достаточно сказать «уже заняла», а в английском для «более раннего прошлого» есть отдельное время.",
    comprehensionQuestions: [
      {
        question: 'Why does Ruslan stay in hostels?',
        options: ["He doesn't have much money for his travels.", 'He works in a hostel.', 'His friends are in hostels.'],
        correctIndex: 0,
      },
      {
        question: 'What is the problem with locker six?',
        options: ['It is too small.', "It doesn't lock, and Fergus hasn't repaired it yet.", 'Someone has got the key.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Ruslan not get up at three in the morning?',
        options: ['He thinks it is Ines.', 'He is in the shower.', 'He is too tired and goes back to sleep.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-2',
    title: 'Three Suspects',
    titleTranslation: 'Трое подозреваемых',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "We looked everywhere, under the beds, in Ines's bag, in the shared kitchen and in the shower, but the passport was missing. The locker door was closed, but it wasn't locked, because the lock was out of order and couldn't lock. 'Someone must have opened it in the night,' I said. 'With a lock like that, it was easy.' Ines sat down on her bed. 'My flight is tomorrow evening,' she said. 'Without a passport, I can't go home.'\n\n" +
      "By then, the other two guests in our room were awake. Henrik, a tall Swedish man with a guitar, had come back at four in the morning with his shoes covered in mud, and Maya, a quiet woman from Toronto, was packing her bag in a hurry without looking at anyone. 'I'm checking out at eleven,' she said. 'My flight is at two.' She seemed nervous, and to be honest, a bit suspicious.\n\n" +
      "Fergus came up from reception with a cup of tea for Ines and apologised. 'I'm responsible for locker six, and I meant to repair it last night, but I forgot.' 'Have you got cameras?' I asked. 'CCTV, yes, at the front door,' he said, looking embarrassed, 'but the CCTV has been out of order since Tuesday.' As a result, there was no video of the night, and the only security that we could rely on was Fergus and his tea.\n\n" +
      "'Pay attention to everything,' I told myself, and I looked at the room like a detective. Someone had walked to the lockers at three o'clock, because I had seen the phone light. It can't have been Ines, who was asleep, and it can't have been me, because I was half asleep, so it was probably one of the other two guests or someone from another room. I had two suspects. Henrik had come back late and dirty, and Maya was leaving early and in a hurry. Either of my suspects could be the thief, but a detective needs evidence, and I had no evidence at all.\n\n" +
      "'We should call the police,' Fergus said. 'The police are good at this.' Henrik laughed from his bed. 'The police are busy on Saturdays,' he said. 'They won't come for one passport.' Maya closed her bag, said nothing and walked out of the room so fast that it looked suspicious too.",
    words: {
      suspects: { english: 'подозреваемые (suspect)' },
      detective: { english: 'детектив, сыщик' },
      evidence: { english: 'доказательства, улики (неисчисляемое)' },
      CCTV: { english: 'камеры видеонаблюдения' },
      awake: { english: 'не спящий: were awake — уже проснулись' },
      asleep: { english: 'спящий: she was asleep — она спала' },
      suspicious: { english: 'подозрительный' },
    },
    expressions: {
      'pay attention to': { english: 'обращать внимание на' },
      'as a result': { english: 'в результате' },
    },
    grammarNote:
      "«Someone must have opened it… It can't have been Ines» — модальные глаголы вывода: must have + третья форма — «наверняка, точно (сделал)», can't have — «не может быть, чтобы». По-русски это слова «наверное», «не может быть», а в английском — конструкция с модальным глаголом. И заметьте: «The police are busy» — police во множественном числе, не the police is.",
    comprehensionQuestions: [
      {
        question: 'How could someone open locker six?',
        options: ['They had the key.', "The lock didn't work, so it was easy.", 'Fergus opened it.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Ruslan think of Henrik and Maya?',
        options: ['One came back very late and dirty, and the other is leaving early in a hurry.', 'They are Ines\'s friends.', 'They work at the hostel.'],
        correctIndex: 0,
      },
      {
        question: "Why doesn't the CCTV help?",
        options: ['It is only in the kitchen.', 'Fergus has lost the video.', 'It has not been working for days.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-3',
    title: 'The Police Are Busy',
    titleTranslation: 'У полиции много дел',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Henrik was right: the police are busy on Saturdays, and it was three hours before an officer arrived. Her name was PC Grant, a woman of about forty who wrote everything down in a small book while Ines told her the story. 'I'm afraid passport theft isn't rare in hostels,' she said. 'We see a theft like this every week in summer. The police are going to investigate, but I can't promise anything.'\n\n" +
      "'How can I sort this out?' Ines asked. 'It depends on your country,' PC Grant said. 'You'll need new papers from your embassy. The Portuguese embassy is in London, and it's closed at the weekend.' Ines looked miserable. 'So I'm going to miss my flight.' 'Probably,' the officer said, and before she left, she showed us the notes in her book:\n\n" +
      "Sat 10:40. Room 6. Passport missing from locker 6 (lock out of order). Owner: Ines Costa, 24, flight Sun. No CCTV. Nobody saw anything. Guests to check: 3.\n\n" +
      "When she left, Ines sat in the kitchen with a cup of tea that she didn't drink, looking anxious and very tired. She had been in Scotland for a week, alone, and she had loved every day of it, but now her last weekend was a disaster, and she was too miserable to eat.\n\n" +
      "I've always liked a good mystery. When I was a child in Almaty, I read every detective story in our flat two times, and for the last five years, my job was to find problems in apps before the users did. 'Ines,' I said, 'the police are busy, so let's investigate ourselves. Someone opened that locker at three o'clock, and if we figure out who, we'll find your passport.' She looked at me for a long moment. 'Really?' 'Really. This mystery has got an answer, and we're going to find it.'\n\n" +
      "We started with the room. Maya had already checked out and left for the airport with her luggage, so we couldn't ask her anything, but Henrik was still in bed, and his muddy shoes were by the door. When I asked him about last night, he sat up and smiled. 'You think I'm a thief and a liar? I wasn't near this hostel at three o'clock, and I can prove it.'",
    words: {
      theft: { english: 'кража' },
      investigate: { english: 'расследовать' },
      embassy: { english: 'посольство' },
      miserable: { english: 'несчастный, подавленный' },
      anxious: { english: 'встревоженный, тревожный' },
      prove: { english: 'доказать' },
      mystery: { english: 'загадка, тайна; детектив (о книге)' },
    },
    expressions: {
      "i'm afraid": { english: 'боюсь, что… (вежливо о плохих новостях)' },
      'it depends on': { english: 'это зависит от' },
    },
    grammarNote:
      "«She had been in Scotland for a week, alone, and she had loved every day of it» — Past Perfect: то, что было до момента рассказа (до кражи). А «The police are busy… The police are going to investigate» — police всегда во множественном числе: the police are, а не is. По-русски «полиция» — единственное число, поэтому хочется сказать the police is.",
    comprehensionQuestions: [
      {
        question: "Why can't PC Grant help much?",
        options: ['She thinks Ines is lying.', 'Passports go missing every week, and the police are very busy.', "She doesn't like hostels."],
        correctIndex: 1,
      },
      {
        question: 'Why is Ines going to miss her flight?',
        options: ["She can't get new papers before Sunday.", 'Her flight is cancelled.', 'She wants to stay in Scotland.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Ruslan think he can help?',
        options: ['He is a police officer.', 'He knows the thief.', 'He loves a good mystery, and his job was to find problems.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-4',
    title: "Henrik's Story",
    titleTranslation: 'История Хенрика',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Henrik showed us his phone. 'Here's my evidence,' he said. 'Last night, I played at a gig near the university, and it finished at two. Then my friends and I walked home through the park by the river, which was very muddy. Look at the time on this photo.' It was a photo of four smiling, wet people in front of the castle, which said 3:05, and he had shared it on social media at 3:07 with the words 'Best night in Edinburgh'.\n\n" +
      "'So you can't have been in our room at three,' I said slowly, because one of my suspects had a very good answer. 'No,' Henrik said. 'It takes forty minutes to walk from the castle to here, so I came in at about ten past four. Ask Fergus, who was still at reception and gave me a towel.' Fergus agreed that Henrik had arrived at about four, covered in mud, and had gone straight to bed, so apparently Fergus was a witness. With a witness and a photo, Henrik was definitely innocent.\n\n" +
      "Ines looked confused and asked what we were both thinking: 'Then who was at the lockers at three?' 'Let me point out one more thing,' Henrik said. 'When I came in, I went to the kitchen for some water, and someone was already there, sitting in the dark with a phone. I think it was a woman. I couldn't see her face in the dark, but she had a big jumper on, and she looked very upset. She didn't say anything, so I didn't either.'\n\n" +
      "I thought about it carefully, because the times were important: at three, someone had opened locker six, and at four, a woman had been in the kitchen in the dark, upset and alone. It didn't make sense yet, but it might be the same person, a person who apparently couldn't sleep. 'What colour was the jumper?' I asked. Henrik thought. 'Yellow, I think, with \"Toronto\" on it in big letters.'\n\n" +
      "Ines and I looked at each other, confused and a bit anxious, because we had both seen that jumper: Maya had worn it at breakfast, two hours before she checked out. But Maya couldn't be the thief, could she? She had seemed so quiet and so nice that it didn't make sense. Then Fergus called from the kitchen. 'Ruslan! Ines! Come here. Dougie has found something in the bin.'",
    words: {
      witness: { english: 'свидетель' },
      innocent: { english: 'невиновный' },
      apparently: { english: 'судя по всему, по-видимому' },
      confused: { english: 'сбитый с толку, растерянный' },
      dark: { english: 'темнота; тёмный (in the dark — в темноте)' },
    },
    expressions: {
      'make sense': { english: 'иметь смысл, быть понятным' },
      'point out': { english: 'указать (на что-то), обратить внимание' },
    },
    grammarNote:
      "«So you can't have been in our room at three» — can't have + третья форма: «не может быть, чтобы ты был» — вывод о прошлом, почти уверенный. «It might be the same person» — might: «возможно», вывод без уверенности. По-русски и то, и другое — вводные слова («не может быть», «может быть»), а в английском уверенность показывает сам модальный глагол: must — can't — might.",
    comprehensionQuestions: [
      {
        question: 'How does Henrik prove where he was at three o\'clock?',
        options: ['Fergus saw him at three.', 'He has a photo with the time on it, near the castle.', 'Ines saw him.'],
        correctIndex: 1,
      },
      {
        question: 'What did Henrik see in the kitchen?',
        options: ['A woman alone in the dark, and she looked upset', 'Ines with the passport', 'Fergus with a towel'],
        correctIndex: 0,
      },
      {
        question: 'Why are Ruslan and Ines surprised at the end?',
        options: ['Henrik has got the passport.', 'Dougie is the thief.', 'The jumper is like Maya\'s.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-5',
    title: 'The Clue in the Bin',
    titleTranslation: 'Улика в мусорном ведре',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Dougie, the hostel cleaner, was a small man of about sixty with a very loud laugh, who did the washing-up every morning and emptied the bins at twelve. 'Look what I've come across,' he said, and he held up an old red passport cover that didn't close any more. 'It was in the kitchen bin, under the coffee.'\n\n" +
      "Ines took it and looked inside. 'This isn't mine,' she said. 'Mine is new. I bought it last week in the shop at the castle, and it's got a Scottish flag on it.' Inside the old cover, someone had written a letter with a pen: M. 'M,' I said. 'Maya.' Nobody spoke for a moment, because it was our first real clue in this theft, and none of us liked it. A clue is not evidence, and this one didn't make sense yet.\n\n" +
      "'First of all, let's not assume anything,' Fergus said. 'Maya was a lovely guest who always made her bed.' 'Did she show you her passport when she checked out?' I asked. Fergus thought. 'Yes. I always look at passports when guests check out, and hers was in a new red cover with a Scottish flag on it, like the ones that they sell at the castle.' Ines put her hand over her mouth. 'That's the same as mine. The same cover, the same flag.'\n\n" +
      "I sat down at the kitchen table and tried to think clearly. Maya had thrown away an old red cover, and she had probably bought a new one at the castle shop, like Ines, so now there were two red covers with the same flag in the same room. Obviously, a thief doesn't keep the cover and throw away the passport, and obviously, nobody takes someone else's passport when they've got their own, so this mystery wasn't a normal theft. 'Ines,' I said, 'which locker was Maya's?'\n\n" +
      "'Number five,' Ines said, 'next to mine.' I looked at Fergus, and Fergus looked at the time: it was a quarter past twelve, Maya's flight was at two, and the airport was half an hour away by taxi. 'If she's at the airport now,' I said, 'she's probably checking in. Let's not assume, let's look. We need to open locker five before we do anything else.'",
    words: {
      cover: { english: 'обложка (для паспорта)' },
      flag: { english: 'флаг' },
      clue: { english: 'улика, подсказка' },
      assume: { english: 'предполагать, заранее считать' },
      obviously: { english: 'очевидно, конечно' },
    },
    expressions: {
      'come across': { english: 'наткнуться на, случайно найти' },
      'first of all': { english: 'прежде всего, во-первых' },
    },
    grammarNote:
      "«Maya had thrown away an old red cover, and she had probably bought a new one» — Past Perfect: Руслан восстанавливает, что случилось раньше. По-русски это просто прошедшее время («выбросила», «купила»), а в английском had + третья форма сразу показывает: это было ещё до того момента, о котором мы рассказываем.",
    comprehensionQuestions: [
      {
        question: 'Why is the old cover an important clue?',
        options: ['It has an M inside, and it is not Ines\'s.', 'It has Ines\'s name on it.', 'It is from Portugal.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Ines put her hand over her mouth?',
        options: ["She is tired.", "Maya's new cover looks just like hers.", 'She sees Maya.'],
        correctIndex: 1,
      },
      {
        question: 'What does Ruslan want to do next?',
        options: ['Call the police again', 'Go to the castle shop', "Look inside Maya's locker"],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-6',
    title: 'Locker Five',
    titleTranslation: 'Шкафчик номер пять',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Fergus, who had a key for every locker, opened locker five slowly. It wasn't empty: on the shelf, there was a new red passport cover with a Scottish flag on it, and inside it, there was a Canadian passport. It was Maya's. Ines's mouth was open. 'But if Maya's passport is here,' she said, 'then Maya has got mine.'\n\n" +
      "Now it all made sense to me. 'She didn't steal it,' I said. 'She took it by accident, and I'm certain of it. At three o'clock, Maya couldn't sleep, and Henrik saw her in the kitchen at four, upset and alone. She had a flight in the morning, and she must have been nervous. She must have gone to the lockers in the dark to look at her passport. Lockers five and six are next to each other, and locker six doesn't lock, so she opened the wrong one, took a red cover with a flag that looked just like hers and put it in her bag.' 'So she wasn't pretending to be nice,' Ines said slowly. 'She's just tired.'\n\n" +
      "'Then why didn't she notice?' Fergus asked. 'You look at your passport when you check out.' 'You looked at it,' I said. 'Did you open it, or did you just see the red cover?' Fergus's face went red. 'I just saw the cover,' he said, 'because I was busy with five guests at reception.' He wasn't pretending either: he felt that he had let Ines down.\n\n" +
      "I didn't want to accuse Maya of anything, and nobody should accuse a tired, nervous woman of theft, but I was almost certain now, and Ines had no time. 'She's going to try to check in with your passport,' I said. 'When the airport looks at the photo, they'll stop her, so she'll end up missing her flight, and you'll end up missing yours. We have to warn her.' Ines was already putting on her coat. 'How far is the airport?' 'Half an hour, if there's no traffic,' Fergus said. 'I'll call you a taxi.'\n\n" +
      "Five minutes later, Ines and I were sitting in the back of a taxi with Maya's passport in my pocket, and the driver looked at us in his mirror. 'Late for a flight?' 'Something like that,' I said. 'Can you go faster? We have to warn someone before it's too late.'",
    words: {
      shelf: { english: 'полка' },
      certain: { english: 'уверенный: I\'m certain — я уверен' },
      pretending: { english: 'притворяясь (pretend — притворяться)' },
      accuse: { english: 'обвинять' },
      warn: { english: 'предупредить' },
    },
    expressions: {
      'by accident': { english: 'случайно, нечаянно' },
      'end up': { english: 'в итоге оказаться (end up missing — в итоге опоздать)' },
      'something like that': { english: 'что-то вроде того' },
    },
    grammarNote:
      "«She must have been nervous. She must have gone to the lockers in the dark» — must have + третья форма: уверенный вывод о прошлом по уликам. По-русски «она, должно быть, нервничала» — вводное слово и прошедшее время, а в английском вывод встроен в глагол. Не путайте с must + инфинитив без have: She must be tired — «она, должно быть, устала (сейчас)».",
    comprehensionQuestions: [
      {
        question: 'What do they find in locker five?',
        options: ["Ines's passport", "Maya's own passport", 'Nothing'],
        correctIndex: 1,
      },
      {
        question: 'What does Ruslan think Maya did?',
        options: ['She took the wrong passport at night by mistake.', 'Maya stole the passport to sell it.', 'Fergus moved the passports.'],
        correctIndex: 0,
      },
      {
        question: 'Why do Ruslan and Ines need to hurry?',
        options: ['The taxi is waiting.', 'Fergus is angry.', 'Maya is going to try to fly with the wrong passport.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-7',
    title: 'Departures',
    titleTranslation: 'Вылет',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "The taxi drove at an awful speed, at every roundabout and past every lorry, and we arrived at the airport at a quarter to one. The departures area was full of people, luggage and noise, so we ran past the check-in desks until we found the one for Flight 412 to Toronto, with a departure at two.\n\n" +
      "Maya was standing at the desk, and she was not having a good day. The woman behind the desk was holding a red passport and looking at it, then at Maya, then at the passport again. 'I'm sorry,' she was saying, 'but this is not your passport. This passport belongs to someone from Portugal.' Maya's face was white. 'That's impossible,' she said. 'I had it in my locker, and it belongs to me.'\n\n" +
      "When I called her name, she turned and saw us, and for a second she looked frightened, until she saw what Ines was holding: a red cover with a Scottish flag, which was her own passport. 'Oh no,' she said quietly. 'Oh no, no, no. Ines, I'm so sorry. I didn't know. I swear I didn't know. I swear it on my life.' She was very upset, and this time I believed her.\n\n" +
      "We sat on the floor by the desk, and Maya told us everything. Her explanation was simple: she hadn't slept all night, because she was frightened of flying. At three o'clock, she had gone to the lockers to look at her passport for the tenth time. In the dark, she had opened locker six by mistake, because it didn't lock, and she had taken the first red cover that she saw. In the kitchen, she had thrown away her old cover, and she had sat there for an hour, because she was lonely and scared. 'I feel so ashamed,' she said, 'and I didn't look inside, not once.' 'Nobody's going to blame you,' Ines said.\n\n" +
      "Meanwhile, the woman at the desk had listened to every word. She took the two passports, looked at the photos and gave the right one to the right woman, and Maya looked so relieved that she almost cried. Then the woman smiled at her. 'You've still got an hour,' she said. 'And next time, check your passport in advance, before you leave. It belongs to you, so look at it.'",
    words: {
      departures: { english: 'вылеты (departure — вылет, отправление)' },
      belongs: { english: 'принадлежит (belong to)' },
      frightened: { english: 'испуганный: frightened of flying — боится летать' },
      swear: { english: 'клясться' },
      explanation: { english: 'объяснение' },
      ashamed: { english: 'стыдно: I feel ashamed — мне стыдно' },
    },
    expressions: {
      'in advance': { english: 'заранее' },
      'next time': { english: 'в следующий раз' },
    },
    grammarNote:
      "«At three o'clock, she had gone to the lockers… she had opened locker six by mistake… she had thrown away her old cover» — цепочка Past Perfect: Майя рассказывает, что случилось ночью, до сцены в аэропорту. По-русски хватает обычного прошедшего, а в английском had + третья форма отмечает: это было раньше основной истории.",
    comprehensionQuestions: [
      {
        question: 'What is the problem at the airport desk?',
        options: ['Maya is late.', "Maya's passport photo is not her.", 'The flight is cancelled.'],
        correctIndex: 1,
      },
      {
        question: 'Why did Maya go to the lockers at night?',
        options: ['She wanted to steal something.', 'She was looking for Ines.', 'She was afraid of flying and wanted to check her passport.'],
        correctIndex: 2,
      },
      {
        question: 'How does Ruslan feel about Maya now?',
        options: ['He believes she is honest.', 'He thinks she is lying.', 'He is angry with her.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m2-8',
    title: 'The Detective',
    titleTranslation: 'Детектив',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "That evening, Ines, Henrik and I sat in the kitchen with Fergus and Dougie, and Ines read us the message that Maya had sent from the plane, just before it took off: 'Thank you both. I'm so sorry. Please tell Fergus to repair locker six!' Fergus laughed. 'I've already repaired it,' he said. 'It took me five minutes. I meant to do it on Friday, and next time, I'll repair things in advance.'\n\n" +
      "'So how did you know?' Henrik asked me. 'It wasn't me, so who was it?' I told them like a detective at the end of a story. The phone light at three meant that someone had been at the lockers, and Henrik's photo proved that he was innocent. Henrik had seen a woman in a yellow jumper in the kitchen, and only Maya had that jumper. The old cover with an M was a clue, but it didn't make sense for a thief to throw away a cover and keep a passport, and Fergus had only seen a red cover when Maya checked out. 'So it couldn't be a theft,' I said. 'It must have been a mistake: two red covers with the same flag, one lock that didn't work, and one very tired person.'\n\n" +
      "Dougie clapped. 'Impressive. No wonder you like detective stories,' he said. 'You've got the brain for it.' Ines looked at me across the table. 'I was so miserable this morning,' she said, 'and I was certain that I was going to miss my flight. Now I'm going home tomorrow with my own passport. Thank you, Ruslan. I'll never forget this weekend.'\n\n" +
      "The next morning, I helped Ines with her luggage to the bus, and before she left, she wrote a new review and showed it to me: 'Lovely hostel, great tea, and the best detective in Scotland in room six.' ★★★★★ 'Let's keep in touch,' she said, 'and if you ever lose a passport, get in touch. I know someone who can solve it.'\n\n" +
      "When I came back, Fergus was waiting at reception. 'Stay another week for free,' he said. 'I need someone with a brain like yours to be in charge of security.' My phone rang, and it was PC Grant. 'I'm calling about the missing passport. The police are still investigating. Any news?' I smiled. 'I'm afraid the investigation is over, officer,' I said. 'The detective has already solved it.'",
    words: {
      clapped: { english: 'захлопал (clap — хлопать в ладоши)' },
      brain: { english: 'мозг, ум' },
      solve: { english: 'раскрыть, решить (загадку, проблему)' },
      investigation: { english: 'расследование' },
    },
    expressions: {
      'no wonder': { english: 'неудивительно' },
      'keep in touch': { english: 'оставаться на связи' },
      'get in touch': { english: 'связаться' },
    },
    grammarNote:
      "«It couldn't be a theft. It must have been a mistake» — весь модуль в двух предложениях: couldn't / can't — «не может быть», must have been — «наверняка было». А «the message that Maya had sent from the plane, just before it took off» — Past Perfect: сообщение пришло раньше, чем они сели на кухне. По-русски «прислала», «взлетел» — одно прошедшее время.",
    comprehensionQuestions: [
      {
        question: 'What does Fergus say about locker six?',
        options: ["It still doesn't work.", 'He has repaired it now, in five minutes.', 'He is going to buy new lockers.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Ruslan think it was a mistake, not a theft?',
        options: ['A thief does not throw away a cover and keep a passport.', 'Maya told him on Friday.', 'The police said so.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Ruslan smile at the end?',
        options: ['The police have found the thief.', 'Ines has missed her flight.', 'The police call to help, but he has already solved it.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
