import type { ReadingText } from '@/types/dutch';

const M = 'a2-swipe-right' as const;
const MT = 'Swipe Right';

export const moduleA2_3Texts: ReadingText[] = [
  {
    id: 'a2m3-1',
    title: 'The App',
    titleTranslation: 'Приложение',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Anya was 28, she was from Yekaterinburg, and she worked in a bank in Liverpool. She was single and happy. Well, happy enough. Her best mate, Chloe, didn't agree at all. 'You go to work, you have lunch with your colleagues, you go to the gym, you go home,' Chloe said one Friday evening. 'Your life is more boring than my gran's, and you're definitely too young for a life like that. Give me your phone.'\n\n" +
      "Ten minutes later, Anya had a dating app and a profile. 'Now, write about yourself,' Chloe said. Anya wrote: 'I'm quiet and a bit shy.' 'No!' Chloe said. 'Be honest, but don't be boring. You're the funniest person I know, and you make the best soup in Liverpool. Put that in your profile.' Anya laughed, because Chloe was a nurse, and she was always honest. Too honest, sometimes.\n\n" +
      "Then they looked at the men. 'Too old. Too young. Why has he got a fish? That's silly,' Chloe said. 'Do you like this one?' Anya asked. 'He looks like my dentist.' After an hour, Anya was tired and Chloe was bored, but then Anya saw him.\n\n" +
      "His name was Ryan, he was 31, and he was taller than the others, and his smile was bigger. He was the most handsome man on the app, and Anya was too shy to say it, but she fancied him a bit. She liked his profile, and one minute later, her phone said: 'It's a match!' 'Yes!' Chloe shouted. 'I reckon he's the most handsome man in Liverpool.' Then a message arrived from Ryan: 'Hi Anya. Can I ask you out?'",
    words: {
      single: { english: 'одинокий, не в отношениях' },
      profile: { english: 'профиль, анкета' },
      shy: { english: 'стеснительный, застенчивый' },
      honest: { english: 'честный' },
      handsome: { english: 'красивый (о мужчине)' },
      enough: { english: 'достаточно (ставится после прилагательного: happy enough)' },
    },
    expressions: {
      'looks like': { english: 'похож на (look like)' },
      'ask you out': { english: 'пригласить на свидание (ask out)' },
    },
    grammarNote:
      "«He was taller than the others… He was the most handsome man on the app» — у коротких прилагательных сравнение через -er / -est (tall → taller → the tallest, funny → funnier → the funniest), у длинных — через more / the most (the most handsome). По-русски «выше», «самый красивый», а в английском форма зависит от длины слова. И не забудьте the: the most handsome, the funniest.",
    comprehensionQuestions: [
      {
        question: "Why does Chloe want Anya to have a dating app?",
        options: ["Anya's life is the same every day.", 'Anya wants a new job.', 'Chloe works for the app.'],
        correctIndex: 0,
      },
      {
        question: 'What does Chloe think about what Anya wrote on her profile?',
        options: ["It's too long.", "It's honest, but it's boring.", "It's very funny."],
        correctIndex: 1,
      },
      {
        question: 'Why does Anya choose Ryan?',
        options: ['He is the funniest man on the app.', 'He makes soup.', 'She thinks he is the most handsome man there.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-2',
    title: 'Ryan Types Fast',
    titleTranslation: 'Райан быстро печатает',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Ryan wrote loads of messages. On Saturday, he sent Anya twenty, and two of them were voice messages. He told her about his car, his gym and his new watch. 'My car is faster than my brother's,' he wrote, 'and my watch is more expensive than his car.' Anya didn't know what to say. 'Do you like cars?' he asked. 'Not really,' she wrote. 'I like books and long walks.' 'Cool,' he wrote, and then he told her about his car again.\n\n" +
      "On Sunday, Chloe came to the flat, and Anya showed her the messages. Chloe read them all and made a face. 'He likes to show off,' she said, 'and he asks you one question in twenty messages. That's annoying. Really annoying.' 'But he's so handsome,' Anya said. 'Maybe his personality is better when you meet him.' 'Maybe,' Chloe said. 'But a good face doesn't make a good personality.'\n\n" +
      "'OK,' Chloe said. 'But be clever. Meet him in a busy place, and tell me where you are. If he's awful, call me, and I'll say there's a problem with your flat.' 'That's a bit embarrassing,' Anya said. 'Being bored for three hours is more embarrassing,' Chloe said. 'And an awful date is the most embarrassing thing of all.'\n\n" +
      "That evening, Ryan sent another message: 'Let's eat out on Friday. I know the most expensive restaurant in Liverpool, and I'm going to book a table for eight o'clock.' Anya looked at Chloe. 'The most expensive restaurant,' Chloe said. 'Of course. I wonder why.'",
    words: {
      annoying: { english: 'раздражающий, надоедливый' },
      personality: { english: 'характер, личность' },
      clever: { english: 'умный, сообразительный' },
      embarrassing: { english: 'неловкий, стыдный (о ситуации)' },
      awful: { english: 'ужасный' },
    },
    expressions: {
      'show off': { english: 'хвастаться, выпендриваться' },
      'eat out': { english: 'поесть в ресторане / кафе' },
    },
    grammarNote:
      "«That's annoying… That's a bit embarrassing» — прилагательные на -ing описывают то, что вызывает чувство (annoying — раздражающий), а на -ed — того, кто это чувствует: I'm bored, she's annoyed. По-русски «скучный» и «мне скучно» — разные слова, а в английском разница только в окончании: boring / bored. Нельзя сказать I'm boring, если хочешь «мне скучно»!",
    comprehensionQuestions: [
      {
        question: "What is the problem with Ryan's messages?",
        options: ['They are too short.', 'He talks about himself, not about her.', 'He writes only at night.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Chloe want Anya to call her?',
        options: ['So Anya can leave if the date is bad', 'Chloe wants to meet Ryan.', 'There is a problem with the flat.'],
        correctIndex: 0,
      },
      {
        question: 'How does Chloe feel about the restaurant?',
        options: ['She is happy for Anya.', 'She wants to come too.', 'She is not surprised: it fits what Ryan is like.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-3',
    title: 'Date One',
    titleTranslation: 'Первое свидание',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Friday, Anya's bus was delayed, so she arrived at the restaurant at eight in a hurry. A man smiled at her from a table, but at first she didn't recognise him. He had Ryan's face, but he was older than his photos, and he was shorter than Anya. 'You look different,' she said. 'Those photos are from five years ago,' Ryan said. 'I look better now, right?'\n\n" +
      "The menu was huge, and everything on it was more expensive than Anya's shoes. Ryan ordered for both of them. 'You'll love it,' he said. The starter was tiny: three small leaves on a big white plate, and the starter disappeared in two seconds. Then Ryan talked about his car for forty minutes, and Anya tried to ask questions. 'Do you like your job?' 'It's OK. Did I tell you about my car?' 'Yes. Twice.'\n\n" +
      "With his dessert, he took a photo of himself and the food, because the dessert was 'great for the internet'. He was rude to the waiter all evening, and when the waiter brought the bill, Ryan looked at it for ages. 'Let's pay half each,' he said. 'And no tip. The waiter was too slow.' 'He wasn't slow. You were rude,' Anya thought. She smiled at the waiter and left a tip under her plate.\n\n" +
      "At ten, Chloe called. 'Is he awful?' 'Yes,' Anya said quietly. 'What a shame!' Chloe shouted. 'There's a big problem with your flat! Come home now!' On the bus home, Anya looked at the app again, and there was a new message from a man with no photo: 'Hi. Your profile is the funniest thing on this app. Ben.'",
    words: {
      starter: { english: 'закуска (первое блюдо в ресторане)' },
      dessert: { english: 'десерт' },
      tip: { english: 'чаевые' },
      rude: { english: 'грубый, невежливый' },
    },
    expressions: {
      'what a shame': { english: 'как жаль!' },
      'half each': { english: 'пополам (каждый платит половину)' },
    },
    grammarNote:
      "«He was older than his photos, and he was shorter than Anya» — сравнение: прилагательное + -er + than. По-русски «старше, чем на фото» или просто «старше своих фото», а в английском than нужно всегда. И «Do you like your job?» — в вопросе нужен do: не You like your job?, хотя по-русски порядок слов тот же, что в утверждении.",
    comprehensionQuestions: [
      {
        question: 'What is different about Ryan when Anya meets him?',
        options: ['He is younger and taller.', 'He is older, and he is not as tall as Anya.', 'He is friendlier.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Anya leave money under her plate?',
        options: ['She wants the waiter to get a tip.', 'She wants to pay for Ryan.', 'She forgot her bag.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Chloe say there is a problem with the flat?',
        options: ['The flat is very cold.', 'Chloe lost her keys.', 'It helps Anya to leave the date.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-4',
    title: 'Sympathetic',
    titleTranslation: 'Сочувствующий',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Saturday, Anya told Chloe everything about Ryan, and Chloe laughed so much that she couldn't stand up. 'Half each! And no tip! He's the rudest man in Liverpool.' 'It was the worst evening of my life,' Anya said. 'I was knackered when I got home. But look: a man called Ben wrote to me.'\n\n" +
      "Ben's profile had no photo, only a picture of a big brown dog. He was 29, and he worked in a park. Ben was the opposite of Ryan: quieter, funnier and more patient. His messages were short, but they were funny, and he always asked a question at the end, like a patient teacher. Anya and Ben wrote to each other all weekend, like old friends, not strangers. 'What's the most interesting thing about you?' he asked. 'I make the best soup in Liverpool,' she wrote. 'No way. My mum makes the best soup in Liverpool. But I'm ready to try yours. That's a promise.'\n\n" +
      "On Sunday, another man asked her out: Marcus, 30, a doctor. He was good-looking in his photos, his profile was perfect, and he wanted dinner on Wednesday. 'Marcus looks very sympathetic,' Anya said. 'Sympathetic?' Chloe asked. 'You mean good-looking? In English, sympathetic means he understands when you've got problems, like a good nurse.' 'Oh. Then he's good-looking, and perhaps sympathetic as well.' 'Fair enough,' Chloe said. 'A perfect profile and a perfect face. Lucky you.'\n\n" +
      "'And Ben?' Chloe asked. 'I get on with Ben,' Anya said, 'but he's got no photo, so his face is a secret. What if he's worse than Ryan?'",
    words: {
      patient: { english: 'терпеливый' },
      'good-looking': { english: 'привлекательный, симпатичный (о внешности)' },
      perfect: { english: 'идеальный' },
      sympathetic: { english: 'сочувствующий, отзывчивый (не «симпатичный»!)' },
    },
    expressions: {
      'fair enough': { english: 'справедливо, ладно, принято (разговорное)' },
      'get on with': { english: 'ладить с кем-то, находить общий язык' },
    },
    grammarNote:
      "«He's the rudest man in Liverpool… It was the worst evening of my life» — превосходная степень: the + -est (rude → the rudest) или неправильная форма: bad → worse → the worst, good → better → the best. По-русски «самый грубый», «худший» — а в английском the перед такими словами обязательно. И помните ложного друга: sympathetic — «сочувствующий», а «симпатичный» — good-looking.",
    comprehensionQuestions: [
      {
        question: "What is different about Ben's messages?",
        options: ['They are long and boring.', 'They are all about his dog.', 'They are funny, and he asks about Anya.'],
        correctIndex: 2,
      },
      {
        question: "Why does Chloe talk about the word 'sympathetic'?",
        options: ["Anya says 'Ryan' in the wrong way.", "Anya uses 'sympathetic' to mean 'good-looking'.", 'Anya writes too fast.'],
        correctIndex: 1,
      },
      {
        question: 'Why is Anya worried about Ben?',
        options: ["She doesn't know what he looks like.", "He doesn't like soup.", 'He is a doctor.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-5',
    title: 'Date Two',
    titleTranslation: 'Второе свидание',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Marcus was just like his photos: tall and polite, and he arrived early with flowers. The restaurant was quieter than Ryan's and more beautiful, but it was crowded, so they waited for a table. Marcus was a vegetarian, and he asked Anya about every dish on the menu. 'Do you like spicy food? The curry here is the tastiest in town, and it's vegetarian. It's my favourite dish.'\n\n" +
      "It was a perfect evening. Too perfect. Marcus talked about his work, his holidays and his plans. He was clever, he was kind, and he was more sympathetic than Ryan. But he never laughed. When Anya said something funny, he said, 'I see,' and he ate his salad. After an hour, she was bored. 'What's wrong with me?' she thought. 'He's perfect, and I'm bored. Actually, he's too polite for me.'\n\n" +
      "Then a message arrived from Ben: 'How's the perfect doctor? Is he more interesting than my dog?' Anya laughed so much that the people at the next table looked at her, and Marcus looked annoyed. 'Is something funny?' 'Sorry. It's my friend.' Marcus stayed annoyed for ten minutes.\n\n" +
      "At the end of the evening, Marcus paid for everything, left a big tip and took her to a taxi. 'I'll call you as soon as possible,' he said. On the way home, Anya wrote to Ben: 'He isn't more interesting than your dog.' Ben answered in ten seconds. 'Then come and meet her. Fancy a coffee in the park tomorrow? I'll be the man with the big brown dog.'",
    words: {
      polite: { english: 'вежливый' },
      vegetarian: { english: 'вегетарианец' },
      dish: { english: 'блюдо' },
      spicy: { english: 'острый (о еде)' },
      tastiest: { english: 'самый вкусный (tasty — вкусный)' },
      annoyed: { english: 'раздражённый' },
    },
    expressions: {
      "what's wrong": { english: 'что не так? что случилось?' },
      'as soon as possible': { english: 'как можно скорее' },
    },
    grammarNote:
      "«It was a perfect evening. Too perfect» — too значит «слишком» и ставится перед прилагательным: too perfect, too quiet. А enough — «достаточно» — ставится после: interesting enough. По-русски оба слова стоят перед прилагательным («слишком тихий», «достаточно интересный»), поэтому так легко ошибиться с enough.",
    comprehensionQuestions: [
      {
        question: 'What is good about Marcus?',
        options: ['He is very funny.', 'He is polite, kind and clever.', 'He is the shortest man on the app.'],
        correctIndex: 1,
      },
      {
        question: 'Why is Anya bored?',
        options: ['Marcus talks only about his car.', 'The food is awful.', "Marcus is perfect, but he doesn't laugh when she says funny things."],
        correctIndex: 2,
      },
      {
        question: 'Why does Marcus look annoyed?',
        options: ['Anya laughs at a message from another man.', 'Anya is late.', 'The food is too spicy.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-6',
    title: 'The Man with the Dog',
    titleTranslation: 'Мужчина с собакой',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Thursday morning, Anya walked to the park with a cup of coffee. She was more nervous than before her other dates. Then a big muddy dog ran towards her, took the bread from her bag and ran away with it. 'Biscuit! No!' a man shouted. 'Sorry! He stole it again!'\n\n" +
      "Anya stopped, because she knew that dog. Every morning, on her way to work, a big brown dog stole her breakfast, and every morning, a man with a beard and curly hair said sorry. Now the same man ran towards her, with the same beard and the same curly hair. 'You're Ben?' 'You're the breakfast girl?' They looked at each other, and they both started to laugh.\n\n" +
      "They walked in the park for two hours. Ben wasn't the most handsome man on the app, he wasn't as polite as Marcus, and he wasn't perfect, but he was the easiest to talk to. He was patient, he asked questions, and he listened to the answers. Anya felt relaxed for the first time in weeks, and Ben looked relaxed too. 'Why is there no photo on your profile?' she asked. 'I'm too shy,' Ben said. 'And Biscuit is more handsome than me.'\n\n" +
      "Before she left, Ben asked, 'Can we hang out again? Saturday?' 'I'd love to,' Anya said. On the way home, she called Chloe. 'He's the man with the dog from my street!' 'The breakfast thief?' Chloe shouted. 'Anya, that's brilliant! I'm chuffed for you.'",
    words: {
      beard: { english: 'борода' },
      curly: { english: 'кудрявый' },
      stole: { english: 'крал(а), украл(а) (steal — красть)' },
      relaxed: { english: 'расслабленный, спокойный' },
      towards: { english: 'к, по направлению к' },
    },
    expressions: {
      'hang out': { english: 'проводить время вместе, тусоваться' },
      "i'd love to": { english: 'с удовольствием!' },
    },
    grammarNote:
      "«Ben wasn't the most handsome… But he was the easiest to talk to» — у прилагательных на -y: easy → easier → the easiest, funny → the funniest. А «I'm too shy» — too + прилагательное: «слишком». По-русски «слишком застенчивый» — и в английском порядок такой же, но с enough наоборот: brave enough — «достаточно смелый».",
    comprehensionQuestions: [
      {
        question: 'Why does Anya know the dog?',
        options: ['It takes her breakfast every morning on her street.', 'It is her dog.', "She saw it on Chloe's phone."],
        correctIndex: 0,
      },
      {
        question: 'How is Ben different from the other men?',
        options: ['He is the most handsome.', 'He is a doctor.', 'It is easy to talk to him.'],
        correctIndex: 2,
      },
      {
        question: 'Why has Ben got no photo on his profile?',
        options: ["He doesn't like phones.", "He isn't confident about himself.", 'His dog took his phone.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-7',
    title: 'Too Good to Be True',
    titleTranslation: 'Слишком хорошо, чтобы быть правдой',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "For two weeks, Anya and Ben met every day. They walked Biscuit in the rain, they cooked soup, and they watched the worst films they could find, and Biscuit stole their pizza twice. Anya felt relaxed and happier than in years. 'It's too good,' she told Chloe. 'Something is going to go wrong. I can feel it.' 'You're the most worried person I know,' Chloe said. 'Just enjoy it.'\n\n" +
      "Then, on Friday, Anya walked past a café near the bank, and suddenly she stopped. Ben was inside, at a table by the window, with a young woman with long blonde hair. The blonde woman laughed, and Ben had her hand in his. Anya's face went hot, then freezing cold. She didn't go in. She walked to work, and all morning, she couldn't think about her work, and her colleagues noticed it.\n\n" +
      "At lunch, she called Chloe. 'He's going out with someone else. I saw them.' 'Are you sure? Perhaps it's nothing.' 'He had her hand in his, Chloe!' 'OK. Don't be jealous, not before you ask him. Jealous people do silly things. Tell him the truth: what you saw and how you feel.' 'And if he lies?' 'Then you'll know the truth. If you trust him, ask him.'\n\n" +
      "That evening, Ben sent a message: 'Dinner at mine tomorrow? I'd love you to meet a very important person.' Anya looked at her phone for a long time and wondered. A very important person?",
    words: {
      blonde: { english: 'светловолосая, блондинка' },
      jealous: { english: 'ревнивый: don\'t be jealous — не ревнуй' },
      truth: { english: 'правда' },
      lies: { english: 'врёт (lie — лгать)' },
      trust: { english: 'доверять' },
    },
    expressions: {
      'going out with': { english: 'встречается с (go out with — встречаться с кем-то)' },
      'someone else': { english: 'кто-то другой' },
    },
    grammarNote:
      "«Anya felt relaxed and happier than in years» — happy → happier: у прилагательных на -y буква y меняется на i. А «You're the most worried person I know» — worried длинное (по смыслу -ed), поэтому the most, а не worriedest. По-русски «самый тревожный человек из всех, кого я знаю», а в английском просто the most worried person I know — без «из всех, кого».",
    comprehensionQuestions: [
      {
        question: 'How does Anya feel about Ben at the start?',
        options: ['Bored', 'Very happy, but worried it will go wrong', 'Angry'],
        correctIndex: 1,
      },
      {
        question: 'What does Chloe tell Anya to do?',
        options: ['Talk to Ben about what she saw.', 'Stop seeing Ben.', 'Go out with Marcus again.'],
        correctIndex: 0,
      },
      {
        question: "Why is Anya worried after Ben's message?",
        options: ["She doesn't like dinner at his flat.", 'She is busy tomorrow.', 'She thinks the important person is the woman from the café.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'a2m3-8',
    title: 'Someone Special',
    titleTranslation: 'Кое-кто особенный',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "On Saturday, Anya stood outside Ben's door for five minutes. She was nervous, and she wanted to be brave. 'Be brave, and tell him the truth,' she thought. Then Biscuit opened the door with his nose, and she went in.\n\n" +
      "The young woman from the café was in the kitchen. 'Anya, this is Lucy,' Ben said, 'my little sister.' Lucy smiled. 'Finally! Ben talks about you all the time. Thanks for the soup, by the way. Ben brought me some, and it's the best soup in Liverpool.' Anya laughed, and her face went red. 'Ben… on Friday, I saw you two in the café. You had her hand in yours.' 'Yes,' Ben said. 'Lucy got a place at university that morning, and I was so proud of her. I'm sorry. Were you jealous?' 'A bit,' Anya said, and that was the truth. 'Sorry I didn't trust you.' 'It doesn't matter,' Ben said. 'I'm glad you asked. Really glad.'\n\n" +
      "Dinner was the funniest evening of the month. Biscuit stole a potato, Lucy told funny things about Ben as a child, and no one talked about cars. Anya felt relaxed, and she wasn't shy at all.\n\n" +
      "Later, at home, Anya opened the dating app for the last time and looked at her profile: 'I'm quiet and a bit shy.' She didn't need it now, so she touched 'delete', and the app was finally gone. 'Well?' Chloe asked on the phone. 'In fact,' Anya said, 'I'm not single now. And I think I'm going to fall in love with the breakfast thief.' 'Cheers to that, mate,' Chloe said.",
    words: {
      brave: { english: 'смелый, храбрый' },
      glad: { english: 'рад(а)' },
      delete: { english: 'удалить' },
      finally: { english: 'наконец-то' },
    },
    expressions: {
      'fall in love': { english: 'влюбиться' },
      'in fact': { english: 'на самом деле, вообще-то' },
    },
    grammarNote:
      "«Dinner was the funniest evening of the month» — превосходная степень с of: the funniest of the month, the best in Liverpool. По-русски «самый весёлый вечер за месяц», а в английском of the month или in Liverpool, никогда не from. И помните: the best — от good, the worst — от bad.",
    comprehensionQuestions: [
      {
        question: 'Who is the woman from the café?',
        options: ["Ben's sister", "Ben's girlfriend", "Chloe's friend"],
        correctIndex: 0,
      },
      {
        question: "Why did Ben have Lucy's hand in his?",
        options: ['She was sad about university.', 'He was happy about her good news.', 'She was cold.'],
        correctIndex: 1,
      },
      {
        question: 'Why does Anya delete the app?',
        options: ['Her profile is too boring.', 'Chloe tells her to.', 'She is with the right person now.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
