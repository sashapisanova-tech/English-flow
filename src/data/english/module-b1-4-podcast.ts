import type { ReadingText } from '@/types/dutch';

const M = 'b1-podcast' as const;
const MT = 'Podcast Hosts';

export const moduleB1_4Texts: ReadingText[] = [
  {
    id: 'b1m4-1',
    title: 'Episode One',
    titleTranslation: 'Выпуск первый',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "ZARA: Hello, and welcome to Strange But True, the podcast that is made in a student kitchen in York. I'm Zara, I'm 21, and I'm studying to be a journalist. NIKITA: And I'm Nikita, I'm 22, I'm from Riga, and I'm the one with the computer. In other words, Zara talks, and I make it work. ZARA: Every week, we look at a strange news story and ask one question: is it true? This week's story: a man in Hull who was stopped by the police for walking a sheep through a supermarket.\n\n" +
      "That was the first episode of our podcast. We made it on Nikita's phone under a coat, because a coat stops the noise from the street, and we had twelve listeners, nine of them from our families. My mum said that it was the best thing that she had ever heard. That didn't help, because my mum also says that about the weather forecast.\n\n" +
      "Nikita is the calmest person I know, but his English sometimes surprises people. In our second episode, he told the listeners that he had read about the sheep in a magazine near his flat. 'I know that the Russian word for a shop sounds like magazine,' I said after the episode, 'but in English a magazine is something that you read.' He went red. 'So I told our listeners that I buy bread in a magazine?' 'Twelve listeners,' I said. 'Don't worry.'\n\n" +
      "By the sixth episode, we had three hundred listeners, and some of them had started to send us stories. Most of them were silly, such as a cat that got a job at a train station or a dog that apparently drove a car. We checked each story carefully, because a good podcast, like a good journalist, should depend on the truth, and the truth should depend on facts.\n\n" +
      "Then, one evening in October, a message arrived from a listener called Jean. She lived in Whitby, an old town by the sea. 'Have you heard about the Black Dog of Whitby?' she asked. 'It's a legend that is three hundred years old. People say that it was seen again last week, near the sea. I saw it too.' Nikita looked at me. 'A legend,' he said. 'Now that's a story for our podcast.'",
    words: {
      podcast: { english: 'подкаст' },
      episode: { english: 'выпуск, эпизод' },
      listeners: { english: 'слушатели (listener)' },
      magazine: { english: 'журнал (не «магазин»!)' },
      legend: { english: 'легенда' },
    },
    expressions: {
      'in other words': { english: 'другими словами' },
      'depend on': { english: 'зависеть от' },
    },
    grammarNote:
      "«My mum said that it was the best thing that she had ever heard» — косвенная речь: после said время «сдвигается назад»: is → was, have heard → had heard. По-русски время не меняется («мама сказала, что это лучшее, что она слышала»), поэтому хочется сказать she said that it is. И ложный друг: magazine — «журнал», а «магазин» — shop.",
    comprehensionQuestions: [
      {
        question: "Why doesn't Zara trust her mum's opinion?",
        options: ['Her mum says that kind of thing about everything.', "Her mum didn't listen to the podcast.", 'Her mum wants a different podcast.'],
        correctIndex: 0,
      },
      {
        question: 'What mistake does Nikita make?',
        options: ['He says the sheep story is true.', "He uses 'magazine' to mean a shop.", 'He forgets to make the episode.'],
        correctIndex: 1,
      },
      {
        question: "Why does Nikita like Jean's message?",
        options: ['Jean wants to pay them.', 'He likes dogs.', 'He thinks the legend is a great story for the podcast.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-2',
    title: 'The Legend',
    titleTranslation: 'Легенда',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Monday, we went to the university library to do some research for the next episode, because a good story needs good sources, and a rumour from one of our listeners is not a source. A woman at the library helped us find three old books about Yorkshire, and by lunch our table was covered in notes from our research.\n\n" +
      "The legend is ancient, much older than the town's famous stories about Dracula. According to the oldest book, the Black Dog was first written about by a fisherman in 1720. It was said to be as big as a cow, with red eyes, and it was usually seen on the beach just before a storm. A fisherman who saw it was warned to stay at home, because the dog was believed to bring bad luck. As far as I know, no one has ever proved that it exists, but the story has been told for three hundred years, and it has never really disappeared.\n\n" +
      "'So what do we know?' Nikita asked, looking at our notes. 'We know that the legend is ancient, and that people believe in it,' I said. 'We don't know whether anyone has really seen anything, or whether it's all just a rumour.' 'It must be a big dog,' Nikita said. 'A real one. Black dogs exist, you know.' 'It might be,' I said. 'Or it might be a story that people like to tell when the weather is bad.'\n\n" +
      "That evening, I found something else on a local Whitby news website. The headline said 'Black Dog Seen Again?', and the article was about three people who said they had seen a huge dark animal near the sea at night. In the second paragraph, a woman called Jean said that she had seen it two times. Jean was the owner of a small café by the harbour. 'That's our listener,' Nikita said. 'So she's a witness, not just a rumour.'\n\n" +
      "I sent Jean a message, and she answered in ten minutes: 'Come on Saturday. I'll tell you everything, and I'll show you something special: a photo.' Nikita read it over my shoulder. 'This is going to take place in Whitby,' he said in his podcast voice. 'Saturday. Don't miss it.'",
    words: {
      research: { english: 'исследование, поиск информации' },
      sources: { english: 'источники (source)' },
      rumour: { english: 'слух' },
      ancient: { english: 'древний' },
      exists: { english: 'существует (exist)' },
      whether: { english: 'ли (в косвенном вопросе: whether anyone has… — видел ли кто-то)' },
      fisherman: { english: 'рыбак' },
    },
    expressions: {
      'as far as i know': { english: 'насколько я знаю' },
      'take place': { english: 'происходить, состояться' },
    },
    grammarNote:
      "«The Black Dog was first written about by a fisherman in 1720. It was said to be as big as a cow» — пассивный залог: was + третья форма. Важно, что случилось, а не кто это сделал. По-русски часто «о нём написал рыбак» или «говорили, что…», а в английском пассив звучит естественно: it was written about, it was said to be. А «the article was about three people who said they had seen» — косвенная речь со сдвигом времени.",
    comprehensionQuestions: [
      {
        question: 'Why do Zara and Nikita go to the library?',
        options: ['One message from a listener is not enough to trust a story.', 'They want to read about Dracula.', 'They have an exam.'],
        correctIndex: 0,
      },
      {
        question: 'What was the Black Dog believed to bring?',
        options: ['Money for the fisherman', 'Bad luck, often before a storm', 'Good weather'],
        correctIndex: 1,
      },
      {
        question: "What is Zara's opinion about the dog at this point?",
        options: ['She is sure it is real.', 'She thinks Jean is lying.', 'She thinks it might be real, or it might just be a story.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-3',
    title: 'Interviews in Whitby',
    titleTranslation: 'Интервью в Уитби',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Whitby was cold and windy, and the old houses by the harbour looked as if they were holding on to the hill. We had brought a microphone, and the plan was simple: Nikita was going to hold the microphone, and I was going to be the interviewer. We stopped people in the street and asked them whether they had ever seen the Black Dog.\n\n" +
      "Their answers were very different. An old fisherman said that he had worked by the sea for fifty years and had never seen anything bigger than a bird. A woman with a shopping bag told us that her grandmother used to see the dog before every storm, and that she still believed it. A young man asked if we were from TV, and when I said no, he walked away. One man refused to respond at all, even to a polite interviewer. 'Gossip,' he said, walking away. 'This town loves gossip.'\n\n" +
      "Then we went to Jean's café by the harbour. It was small and warm and almost empty. Jean was about sixty, with grey curly hair and a nervous smile. She made us tea and sat with us by the window. When I asked if she had really seen the dog, she didn't deny it. She told us that she had seen it two times, both times at night, near the old boat by the harbour. 'I swear it was as big as a cow,' she said. 'And it had red eyes.'\n\n" +
      "Then she took out her phone and showed us the photo. It was dark and not very clear, but there was something huge and black next to the boat, with two small red lights for eyes. Nikita looked at it for a long time. 'Can we use this?' I asked. 'As long as you say that it was taken in Whitby,' Jean said. 'And as long as you mention my café. Sooner or later, everyone is going to want to see this place.'\n\n" +
      "On the train home, Nikita was quiet. 'Something's strange,' he said. 'She was too nervous. And why does she want people to know about the café?' 'Maybe she's just proud,' I said. But I wasn't sure either. A good source shouldn't need a café in the story, and this was starting to feel like a rumour.",
    words: {
      interviewer: { english: 'интервьюер (тот, кто берёт интервью)' },
      respond: { english: 'ответить, отреагировать' },
      gossip: { english: 'сплетни' },
      deny: { english: 'отрицать' },
      harbour: { english: 'гавань, порт' },
      microphone: { english: 'микрофон' },
    },
    expressions: {
      'as long as': { english: 'при условии, что; если только' },
      'sooner or later': { english: 'рано или поздно' },
    },
    grammarNote:
      "«An old fisherman said that he had worked by the sea for fifty years… A young man asked if we were from TV» — косвенная речь: утверждения с said / told us that, вопросы — с asked if и прямым порядком слов (if we were, а не if were we). По-русски вопрос в косвенной речи вводится частицей «ли» («спросил, с телевидения ли мы»), а в английском — словом if или whether.",
    comprehensionQuestions: [
      {
        question: 'What do the interviews show?',
        options: ['Everyone in Whitby has seen the dog.', "People in Whitby have very different opinions about the dog.", 'No one in Whitby knows the legend.'],
        correctIndex: 1,
      },
      {
        question: 'What does Jean want in return for the photo?',
        options: ['Money from the podcast', 'A job on the podcast', 'The podcast should say where it was taken and mention her café.'],
        correctIndex: 2,
      },
      {
        question: 'Why is Nikita suspicious on the train?',
        options: ['Jean seemed nervous and talked a lot about her café.', 'The photo is too clear.', 'Jean didn\'t give them tea.'],
        correctIndex: 0,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-4',
    title: 'Fifty Thousand',
    titleTranslation: 'Пятьдесят тысяч',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "ZARA: This week on Strange But True, we went to Whitby to look for a dog that is said to be three hundred years old. We spoke to a fisherman, some people in the street and one very angry man, and then we met Jean. She owns a café by the harbour, and she told us that she had seen the Black Dog two times. She gave us this photo too, and you can see it on our page. NIKITA: Is it real? We honestly don't know yet. ZARA: Write and tell us what you think.\n\n" +
      "We published the episode on Tuesday evening, with Jean's photo on our social media page, and went to bed. When I woke up, my phone had stopped working, because it had received four thousand notifications. Overnight, the episode had been listened to fifty thousand times. The photo had been shared all over the internet, and our podcast was suddenly one of the ten biggest in the country. The rumour was now the news. Nikita rang me at seven. 'Zara,' he said, 'the news is everywhere. The news is about us.'\n\n" +
      "We tried all morning to go through the comments, but there were too many. A few of them seemed to stand out:\n\n" +
      "'Brilliant episode! I'm from Whitby, and my gran saw the dog in 1970.' 'Subscribed! When are you going back?' 'This photo is obviously fake. It's an ordinary dog with a torch behind it.' 'Can we visit the café?' 'That's not a legend. I know that dog.'\n\n" +
      "I read the last comment three times. It had been written by someone with no photo and a strange name, and there were no other messages from that account. 'What does that mean?' I asked. 'Someone knows something,' Nikita said. 'Or someone wants us to think that they know something.'\n\n" +
      "By lunch, the story had spread to three news websites, and it was still spreading, and I was starting to feel a bit sick. Our numbers were incredible, but I wasn't sure that our facts were accurate. A good journalist checks the story before publishing it, and we had published it first and asked questions later. 'We said that we didn't know whether it was real,' Nikita said. 'We were honest.' 'Were we?' I said. 'We put the photo on the page and let fifty thousand people choose. Now two thousand more people have subscribed.'",
    words: {
      published: { english: 'опубликовали (publish)' },
      subscribed: { english: 'подписался (subscribe)' },
      spread: { english: 'распространяться (spread — spread — spread)' },
      incredible: { english: 'невероятный' },
      accurate: { english: 'точный, достоверный' },
    },
    expressions: {
      'go through': { english: 'просмотреть, разобрать' },
      'stand out': { english: 'выделяться' },
    },
    grammarNote:
      "«Overnight, the episode had been listened to fifty thousand times. The photo had been shared all over the internet» — пассив в Past Perfect: had been + третья форма. Важно, что случилось с выпуском и фото, а не кто это сделал. И помните: «the news is everywhere» — news в английском единственного числа, хотя по-русски «новости» — множественное.",
    comprehensionQuestions: [
      {
        question: 'What changed after they published the episode?',
        options: ['No one listened to it.', 'It got lots of listeners overnight.', 'Jean asked them to delete it.'],
        correctIndex: 1,
      },
      {
        question: 'Why does the last comment worry Zara?',
        options: ['It suggests that someone knows the truth about the photo.', 'It is very rude.', 'It is from Jean.'],
        correctIndex: 0,
      },
      {
        question: 'What does Zara think they did wrong?',
        options: ['They spoke to too many people.', 'They used a bad microphone.', 'They published the photo before checking the facts.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-5',
    title: 'Fake News',
    titleTranslation: 'Фейковые новости',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Thursday, Nikita sent me a link with only one word: 'Look.' It was an article on a website that I had never heard of, and it had already been shared two hundred thousand times:\n\n" +
      "MONSTER DOG ATTACKS TOURISTS IN WHITBY. Visitors to the Yorkshire town have been warned to stay away from the beach after a huge black dog was seen near the harbour. According to the podcast Strange But True, the monster is as big as a cow and has red eyes. 'People are frightened,' said a local woman. More attacks are expected.\n\n" +
      "I felt cold, because every part of it was misleading. No one had been attacked, and there were no attacks. We had never said that people were frightened, and there was no monster, only us, two students with a microphone. The website had taken our story and turned it into fake news, and it had used our name to make the fake news look true. 'They can't do that,' I said. 'They just did,' Nikita said.\n\n" +
      "By Friday, the fake article was everywhere. A big London paper had picked it up, and journalists were calling us every hour. Hotels in Whitby told the press that people were cancelling their bookings, and the editor of the Whitby news website criticised us in a long article. She wrote that two students wanted to take advantage of an old legend to get famous, and that real people in a real town were paying for it. The press loved her misleading article about our misleading episode.\n\n" +
      "The worst part was that she was partly right. We hadn't written the fake news, but we had started it. I read her article in my room and felt awful, but feeling awful wasn't going to help anyone. 'We need to fix this,' I told Nikita. 'We can't just say that it wasn't our fault.' 'Then what do we do?' he asked. I didn't have an answer yet.\n\n" +
      "That evening, an email arrived from the university. It was short and polite: the head of our course would like to see us both on Monday morning, at nine o'clock. Nikita read it two times. 'That's not good, is it?' he said. 'No,' I said. 'That's not good at all.'",
    words: {
      monster: { english: 'чудовище, монстр' },
      attacks: { english: 'нападает; нападения (attack)' },
      misleading: { english: 'вводящий в заблуждение' },
      press: { english: 'пресса, журналисты' },
      editor: { english: 'редактор' },
      criticised: { english: 'раскритиковала (criticise)' },
    },
    expressions: {
      'fake news': { english: 'фейковые новости, ложь в новостях' },
      'take advantage of': { english: 'воспользоваться (часто нечестно)' },
    },
    grammarNote:
      "«Visitors… have been warned to stay away… a huge black dog was seen near the harbour» — так пишут новости: пассив (have been warned, was seen) скрывает, кто предупреждал и кто видел. Именно поэтому фейковые новости любят пассив — он звучит официально, но ничего не доказывает. А «She wrote that two students wanted to take advantage of an old legend to get famous, and that real people in a real town were paying for it» — косвенная речь: are paying → were paying.",
    comprehensionQuestions: [
      {
        question: 'What is wrong with the article?',
        options: ['It is about a different town.', "It changes the facts and uses the podcast's name to look true.", 'It says the dog is small.'],
        correctIndex: 1,
      },
      {
        question: "What is the editor's opinion of Zara and Nikita?",
        options: ['They used the legend to get famous, and the town is paying for it.', 'They are good journalists.', 'They wrote the fake article.'],
        correctIndex: 0,
      },
      {
        question: 'How does Zara feel about the editor\'s article?',
        options: ['She thinks it is all wrong.', 'She does not care.', 'She is upset, because it is partly true.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-6',
    title: 'Monday Morning',
    titleTranslation: 'Утро понедельника',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "The head of the department was a tall woman called Professor Okoro, and she had been a reporter for twenty years before she started to teach. She didn't shout. She asked us to sit down and showed us the fake article, the editor's article and our own episode on her laptop. 'Tell me everything,' she said. 'From the beginning.' So we did.\n\n" +
      "When we finished, she was quiet for a moment. 'This is a big issue,' she said, 'and I'm not going to pretend that it isn't, but I don't think you're bad people. I think you made a first mistake, the kind that every young reporter makes.''You published a photo before you had checked it, and someone else turned it into a lie.' She asked us if we had checked where the photo came from, and I had to say no. She asked whether we had spoken to anyone who could prove Jean's story, and Nikita had to say no too. 'An apology isn't enough,' she said. 'A good apology needs the truth.' 'You need to find out the truth and tell your listeners. That's the only reaction that will fix it, and it's the reaction that I expect from my students.'\n\n" +
      "We had planned to get rid of the episode, but Professor Okoro said that deleting it was the worst thing that we could do. 'If you delete it, people will think that you're hiding something,' she said. 'Look into it. Do your job.'\n\n" +
      "That afternoon, we sat in Nikita's room and looked at the photo again, this time properly. Nikita made it bigger on his computer, then bigger again, until it was hard to see anything. 'It must have been taken with a phone,' he said, 'and it can't have been taken from far away, because the boat is so close.' Then he stopped. 'Zara. Look at this.'\n\n" +
      "On the animal, there was something small and bright that was catching the light. It was a dog's name tag, and on the tag, in tiny letters that we could just read, there was a name: BRUNO. 'Monsters don't wear name tags,' Nikita said slowly. 'So it isn't a monster,' I said. 'It's someone's dog. And I think I know who might own it.'",
    words: {
      department: { english: 'кафедра, отдел' },
      issue: { english: 'проблема, вопрос' },
      apology: { english: 'извинение' },
      reaction: { english: 'реакция' },
      tag: { english: 'бирка, жетон (name tag)' },
    },
    expressions: {
      'get rid of': { english: 'избавиться от' },
      'look into': { english: 'изучить, разобраться (в вопросе)' },
    },
    grammarNote:
      "«She asked us if we had checked where the photo came from… She asked whether we had spoken to anyone» — косвенные вопросы: asked + if / whether + обычный порядок слов, и время сдвигается назад (had checked, had spoken). А «It must have been taken with a phone» — пассив с модальным глаголом: must have been + третья форма — «наверняка было снято».",
    comprehensionQuestions: [
      {
        question: "What is Professor Okoro's opinion of the students?",
        options: ['They are bad people.', 'They made a first mistake, but they are not bad people.', 'They did nothing wrong.'],
        correctIndex: 1,
      },
      {
        question: 'Why does she tell them not to delete the episode?',
        options: ['Deleting it will look like they are hiding something.', 'It is the best episode they have made.', 'The university likes it.'],
        correctIndex: 0,
      },
      {
        question: 'What do they discover in the photo?',
        options: ['The photo is from another town.', 'There are two dogs.', 'The animal has a name tag, so it is an ordinary dog.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-7',
    title: 'Bruno',
    titleTranslation: 'Бруно',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "We took the train to Whitby again on Wednesday. This time we didn't go to Jean's café first. We went to the house next to it, and a light was on in the kitchen. A big black dog came to the door first, loudly, and then an old man who walked slowly. 'Bruno, quiet,' he said, and he held the dog's name tag. Then he looked at us. 'You're the podcast people,' he said. 'I wrote that comment. I wondered when you were going to come.'\n\n" +
      "His name was Mr Harris, and he told us everything over a cup of tea. He said that Bruno was a Newfoundland, a very big but very gentle dog, and that he took him for a walk by the harbour every night. One evening in September, Jean had asked if she could take some photos of Bruno near the old boat. She had put a small red light behind his head, and she had said that it was for fun. 'I didn't think about it,' Mr Harris said. 'Then I saw my gentle dog on the news, in attacks on tourists.'\n\n" +
      "We went next door to the café. When Jean saw us, she knew why we had come, and she didn't deny it. She sat down, and for a long time, she didn't speak. Then she revealed the truth: the café was not doing well. Due to the rain and the big new coffee shops, she had had very few customers for two years, and she was struggling to pay the rent. Even though she had lived in Whitby all her life, she was going to lose her café. 'I owe everyone an apology,' she said. 'I thought that a little mystery might bring a few more people,' she said. 'I never intended this. I never intended monsters and attacks, and I never imagined the consequences.'\n\n" +
      "I believed her, and I felt sorry for her, but I was angry too, because people had been frightened and hotels had lost money. 'You lied to us,' I said quietly. 'Yes,' she said. 'And you didn't check. We both made a mistake.' It hurt, but she was right.\n\n" +
      "On the train home, we didn't speak for a long time. Then he asked the question that we were both thinking. 'What do we say in the next episode? If we tell the whole truth, Jean loses her café.'",
    words: {
      revealed: { english: 'раскрыла (reveal)' },
      consequences: { english: 'последствия (consequence)' },
      gentle: { english: 'мягкий, добрый (о характере)' },
      struggling: { english: 'с трудом справляясь (struggle — бороться, с трудом справляться)' },
      intended: { english: 'намеревалась, хотела (intend)' },
    },
    expressions: {
      'due to': { english: 'из-за, вследствие' },
      'even though': { english: 'хотя, несмотря на то что' },
    },
    grammarNote:
      "«He said that Bruno was a Newfoundland… Jean had asked if she could take some photos» — косвенная речь: is → was, can → could, asked → had asked. По-русски «он сказал, что Бруно — ньюфаундленд» — настоящее время сохраняется, а в английском после said время обычно сдвигается назад. Но заметьте: в живой речи, если что-то правда до сих пор, сдвиг иногда пропускают.",
    comprehensionQuestions: [
      {
        question: 'How did Jean make the photo?',
        options: ['She took photos of Bruno with a red light behind his head.', 'She found it on the internet.', 'Mr Harris took it.'],
        correctIndex: 0,
      },
      {
        question: 'Why did Jean do it?',
        options: ['She wanted to get famous.', 'She hates the podcast.', 'Her café was not doing well, and she hoped for more customers.'],
        correctIndex: 2,
      },
      {
        question: "What does Jean think about who is responsible?",
        options: ['It is only the website\'s fault.', 'Both she and the podcast made a mistake.', 'It is only Zara\'s fault.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m4-8',
    title: 'Strange But True',
    titleTranslation: 'Странно, но правда',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "ZARA: Welcome to a different kind of episode. Two weeks ago, we published a photo of a black dog in Whitby, and we said that we didn't know whether it was real. That wasn't enough. We should check our sources before we publish, and this time we didn't. The photo was taken by a café owner, and the dog is called Bruno. He is real, he's very gentle, and he has never attacked anyone. NIKITA: The fake article about monster attacks was not written by us, but it was based on our episode, so we have to take responsibility for our part. We're sorry, especially to the people of Whitby.\n\n" +
      "We had talked for hours about Jean. In the end, we didn't say her name, because Professor Okoro had pointed out that the story was about a rumour, not about one person. But Jean made her own decision. The day before the episode, she wrote a short apology on the window of the café and on social media. She said that she had made the photo herself, that she was sorry, and that Bruno was the best dog in Yorkshire.\n\n" +
      "The reaction surprised everyone. Our listeners praised the episode for its honesty, and even our university praised it. The editor of the Whitby news website wrote a new article too. This was the woman who had criticised us before, and now she announced that she had changed her mind. The correction episode, she wrote, was 'better than a hundred lectures about fake news'.\n\n" +
      "And then something strange but true began: people started coming to Whitby to meet Bruno. They came to the café to see the famous gentle dog, they bought coffee and cake, and they took photos with him, this time with no red lights. Jean's café was busier than it had been for years. 'Sooner or later,' Mr Harris told us, 'the truth makes a better story.'\n\n" +
      "Our podcast has eighty thousand listeners now. We still make it in a student kitchen, and we've made a correction our responsibility every time we get something wrong, and we still check every story three times. Nikita still says magazine when he means shop. And on the wall of our kitchen, there's a photo of a big black dog with a name tag, so that we never forget to make a difference with the truth, not with a rumour.",
    words: {
      responsibility: { english: 'ответственность' },
      praised: { english: 'хвалили (praise)' },
      announced: { english: 'объявила (announce)' },
      correction: { english: 'исправление, опровержение' },
      lectures: { english: 'лекции (lecture)' },
    },
    expressions: {
      'based on': { english: 'основанный на' },
      'make a difference': { english: 'менять что-то к лучшему, иметь значение' },
    },
    grammarNote:
      "«The fake article… was not written by us, but it was based on our episode» — пассив (was written, was based) для того, что важнее действия, чем исполнителя. А «She said that she had made the photo herself, that she was sorry» — косвенная речь со сдвигом времени. Весь модуль в двух предложениях: пассив рассказывает новости, а косвенная речь — что говорили люди.",
    comprehensionQuestions: [
      {
        question: 'What is the purpose of the last episode?',
        options: ['To tell the truth and take responsibility for their mistake', 'To get more listeners', 'To criticise Jean'],
        correctIndex: 0,
      },
      {
        question: 'Why does the editor change her mind?',
        options: ['The podcast paid her.', 'She thinks the correction episode helps people understand fake news.', 'She met Bruno.'],
        correctIndex: 1,
      },
      {
        question: 'How does the truth help Jean in the end?',
        options: ['She sells the café.', 'She moves to York.', 'People come to meet Bruno, and her café gets busy.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
