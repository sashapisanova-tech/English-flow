import type { ReadingText } from '@/types/dutch';

const M = 'b1-family-dinner' as const;
const MT = 'Family Dinner';

export const moduleB1_6Texts: ReadingText[] = [
  {
    id: 'b1m6-1',
    title: 'The Invitation',
    titleTranslation: 'Приглашение',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "The messages from my mum started on Monday morning, while I was on the bus to the museum where I work:\n\n" +
      "Mum: Masha, darling, are you coming on Sunday? Mum: Bring Callum. It's time. Mum: Grandma is cooking. Tell him that he must eat everything. Mum: Does he eat fish? Does he eat meat? Does he eat dill? Mum: Dad says hello. We need to catch up. Dad wants to ask him some questions. Mum: Don't be late.\n\n" +
      "I'm Masha, I'm 27, and my parents wanted to bring me up in Moscow, which they did until I was fourteen, when my family moved to London. Most of our relatives stayed in Russia. My boyfriend, Callum, is a teacher from Manchester whose family is very different from mine. His parents split up when he was ten, and his family dinners were short and quiet, usually in front of the TV. My family dinners take four hours, involve three generations and at least one argument about something from 1998, because every generation in my family remembers it differently. We had been together for eight months, and I had managed to put off this dinner for most of that time, because I knew that it would involve a lot of questions.\n\n" +
      "That evening, I tried to prepare him. 'My dad is an engineer who has an opinion about everything, and every toast is a speech,' I said. 'My mum is a doctor who will ask about your health. My brother Artyom, who is nineteen, will look at his phone the whole time. And my grandmother, who came from Moscow last year, doesn't speak much English, but she understands more than she pretends.' Callum listened carefully, which is one of the things that I love about him. 'And what do they want from me?' he asked. 'They want to know whether you're serious,' I said. 'In my family, that's a big question.'\n\n" +
      "He was quiet for a moment, considering this, and then he smiled. 'I've got four days to learn some Russian,' he said. 'What's the word for delicious?' 'Vkusno,' I said. 'You're going to need it, because Grandma puts dill in everything.' Another message arrived. Mum: Also, Grandma wants to know if his parents are married.",
    words: {
      generations: { english: 'поколения (generation)' },
      darling: { english: 'дорогая, милая (обращение)' },
      dill: { english: 'укроп' },
      involve: { english: 'включать, вовлекать' },
      serious: { english: 'серьёзный' },
      relatives: { english: 'родственники (relative)' },
    },
    expressions: {
      'split up': { english: 'расстались, развелись (split up)' },
    },
    splitExpressions: [
      { word1: 'bring', word2: 'up', display: 'bring … up', english: 'воспитывать, растить' },
    ],
    grammarNote:
      "«My boyfriend, Callum, is a teacher from Manchester whose family is very different from mine» — whose — «чей, у которого»: относится к человеку. А «the museum where I work» — where для мест: «где». По-русски «музей, где я работаю», «учитель, чья семья…» — те же слова, и это одно из мест, где английский и русский похожи. И «my parents wanted to bring me up in Moscow» — фразовый глагол bring up («воспитывать»): дополнение-местоимение стоит между частями — bring me up, а не bring up me.",
    comprehensionQuestions: [
      {
        question: "What do Mum's messages show about her?",
        options: ['She is relaxed about Sunday.', 'She is happy and wants everything to be right.', "She doesn't want Callum to come."],
        correctIndex: 1,
      },
      {
        question: "How are Callum's family dinners different from Masha's?",
        options: ['They are short and quiet.', 'They are longer.', 'They are always in a restaurant.'],
        correctIndex: 0,
      },
      {
        question: 'What does the family really want to find out, according to Masha?',
        options: ['If Callum can cook', 'If Callum speaks Russian', 'If Callum is serious about her'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-2',
    title: 'The Rules',
    titleTranslation: 'Правила',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Wednesday evening, I sat Callum down at my kitchen table and told him the rules of a Russian family dinner, which my family takes very seriously. Some of them were customs that I had grown up with, and some were simply the habits of my own family, but for Callum, whose relatives had never had a dinner longer than forty minutes, all of them were new.\n\n" +
      "'Rule one,' I said. 'Take your shoes off at the door. Grandma will give you house shoes, and you must wear them, even if they're pink. Rule two: bring flowers for my mum, but an odd number, three or five, never two or four. Rule three: never say no to food, even if it's full of dill. If Grandma offers you more, the polite answer is yes. Rule four: when Dad makes a toast, you stand up, you listen, and you drink.' 'Drink what?' 'A fruit drink that Grandma makes,' I said. 'Don't worry.'\n\n" +
      "Callum was nodding and writing everything down in a small book, as if he was preparing for an exam. 'What about table manners?' he asked. 'In my house, it was rude to talk with your mouth full.' 'In my house, it's rude not to talk,' I said. 'People interrupt each other all the time. It's not an argument, it's a debate. That's how we show that we care.' He looked worried, so I told him about every cultural difference that had surprised me in England: people saying sorry when you stand on their foot, dinner at six o'clock, and no one ever saying what they really think. 'That's a cultural difference too,' Callum said.\n\n" +
      "'Who do you take after?' he asked. 'Your mum or your dad?' 'Everyone says I take after my dad,' I said, 'which is why we argue so much. We're both stubborn, and we both think that we're always right.' Callum laughed. 'And your grandmother? What are her expectations?' I thought about it. 'Grandma moved here last year, after my grandfather died. She still hasn't managed to settle in, and she misses Moscow so much that Mum worries she's depressed. Settling in is hard at eighty-two. Her only expectation is that you're kind to me. And that you eat.'\n\n" +
      "On Saturday, Callum went to buy flowers, and I didn't go with him, because I trusted him. That was my first mistake.",
    words: {
      customs: { english: 'обычаи (custom)' },
      odd: { english: 'нечётный (odd number); странный' },
      stubborn: { english: 'упрямый' },
      expectations: { english: 'ожидания (expectation)' },
    },
    expressions: {
      'table manners': { english: 'манеры за столом' },
      'cultural difference': { english: 'культурное различие' },
      'take after': { english: 'быть похожим на (родственника)' },
      'settle in': { english: 'обжиться, освоиться (на новом месте)' },
    },
    grammarNote:
      "«Rules of a Russian family dinner, which my family takes very seriously» — which с запятой добавляет информацию о целом: это неопределительное придаточное, его можно убрать, и смысл предложения останется. А «a fruit drink that Grandma makes» — без запятой: that уточняет, какой именно напиток. По-русски в обоих случаях «который» и всегда запятая, а в английском запятая меняет смысл.",
    comprehensionQuestions: [
      {
        question: 'Why does Callum write everything down?',
        options: ['He wants to do everything right at the dinner.', 'He is a teacher and likes notes.', 'Masha asks him to.'],
        correctIndex: 0,
      },
      {
        question: "What does Masha say about interrupting in her family?",
        options: ['It means that people are angry.', 'It is very rude.', 'It shows that people care.'],
        correctIndex: 2,
      },
      {
        question: "What is Grandma's only expectation, according to Masha?",
        options: ['That Callum speaks Russian', 'That Callum is kind to Masha and eats', 'That Callum brings a present'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-3',
    title: 'Twelve Roses',
    titleTranslation: 'Двенадцать роз',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Callum arrived at my parents' house at one o'clock, with his shoes already in his hand and twelve beautiful red roses for my mother. I saw the roses and went cold. In Russia, you only bring two, four or six flowers, or twelve, to a funeral. My mum opened the door, saw the roses and went quiet.\n\n" +
      "'Twelve,' I said quietly to Callum. 'I told you: an odd number.' 'In the shop, they only sold them in twelves,' he said. 'I thought that more roses showed more respect.' I looked at my mum, whose face was trying very hard to be polite, and I made a decision. I took one rose out and gave it to Grandma. 'Eleven for Mum, one for Grandma. No one has died.' Grandma looked at the rose, then at Callum, and suddenly she laughed, which no one had heard her do for months.\n\n" +
      "After that small misunderstanding, my dad held Callum's hand like a man who was checking a bridge, and started his questions at once. 'What do your parents do? Where did you grow up? How much does a teacher earn in England?' I wanted to disappear, but Callum answered every question patiently. He told Dad about his background, about his mum, who is a nurse, and about his school in Peckham, where most of the children speak two languages at home. 'I thought that English people never talked at dinner,' Dad said. 'That's a stereotype,' Callum said, smiling, and he seemed to get on well with Dad after that.\n\n" +
      "While they talked, Grandma studied Callum from the corner. Then she said something to me in Russian, and I said it in English without thinking. 'Grandma says that you're very sympathetic.' Callum smiled, confused. 'Sympathetic? I haven't done anything yet.' Then I realised my mistake and made a quick correction. 'No, sorry. She means that you're good-looking. In Russian, the word that sounds like sympathetic is about your face, not about how you feel.' Grandma, who had understood every word, looked proud.\n\n" +
      "I was starting to feel that Callum might fit in better than I had expected, and that table manners were not going to be a problem. Then Dad gave everyone a fruit drink, looked at Callum over his glass and asked the question that I had been afraid of for eight months. 'So,' he said. 'When are you getting married?'",
    words: {
      roses: { english: 'розы (rose)' },
      funeral: { english: 'похороны' },
      respect: { english: 'уважение' },
      stereotype: { english: 'стереотип' },
      misunderstanding: { english: 'недоразумение' },
      background: { english: 'происхождение, прошлое, среда' },
    },
    expressions: {
      'fit in': { english: 'вписаться, прижиться' },
      'get on well with': { english: 'хорошо ладить с' },
    },
    grammarNote:
      "«I looked at my mum, whose face was trying very hard to be polite» — whose: «чей, у которой». «his school in Peckham, where most of the children speak two languages» — where для места. И ложный друг: sympathetic значит «сочувствующий», а «симпатичный» по-английски — nice-looking или good-looking.",
    comprehensionQuestions: [
      {
        question: 'Why is there a problem with the roses?',
        options: ['Mum does not like red.', 'In Russia, that number of flowers is for a funeral.', 'Roses are too expensive.'],
        correctIndex: 1,
      },
      {
        question: 'What does Masha do about the problem?',
        options: ['She gives one rose to Grandma, so there are eleven.', 'She throws the roses away.', 'She sends Callum back to the shop.'],
        correctIndex: 0,
      },
      {
        question: "What did Grandma really mean about Callum?",
        options: ['That he understands people\'s problems', 'That he is a good teacher', 'That he is good-looking'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-4',
    title: 'Three Bowls of Soup',
    titleTranslation: 'Три тарелки супа',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "I didn't answer Dad's question about getting married, and Grandma chose that moment to bring in the soup, which was red and full of dill. For my family, Sunday dinner is a big occasion, and the table was so full of dishes that there was hardly space for the plates: salads, a pile of bread, pickles, a cake, and the soup, which Grandma had been cooking since six in the morning. Callum looked at it all, and I could see that he was counting.\n\n" +
      "Mum lit the candles, and Dad stood up for the first toast. 'To the family,' he said, 'to our guest, and to the people who are not at this table.' Grandma looked down at her plate, because she was thinking of my grandfather, and for a moment, no one spoke.\n\n" +
      "Callum remembered rule three. When Grandma offered him more soup, he said yes. When she offered him a third bowl, he looked at me with frightened eyes and, in spite of being full, said yes again, because he didn't know our customs: you're allowed to refuse the third time. Grandma was delighted. 'Delicious,' he said in Russian, with an English accent, and she laughed. I knew then that he would fit in. She had been so homesick since she came to London, and cooking for people was the only thing that made her feel at home.\n\n" +
      "It was my brother Artyom who started the row, without intending to, and Dad and I, the two stubborn ones, carried it on. 'Masha's boss at the museum is giving her more hours,' he said, without looking up. Dad put down his spoon. 'They increase your hours, but not your small salary,' he said. 'Masha, a museum is a nice hobby, but your ideas about work are out of date. If you worked in a bank, you would earn three times more.' 'I can't stand banks,' I said. 'And I love my job, and I've got a good work-life balance.' 'Love doesn't pay the rent,' Dad said. Mum said our names in the voice that she uses for patients who won't take their medicine.\n\n" +
      "At that moment, Grandma stood up and took Callum by the arm. 'Come,' she said in English, which surprised everyone. 'Kitchen. You help me.' And she raised one hand at Dad and me, the way she used to when we were children.",
    words: {
      occasion: { english: 'событие, повод' },
      pickles: { english: 'соленья' },
      accent: { english: 'акцент' },
      delighted: { english: 'в восторге, очень довольный' },
      homesick: { english: 'тоскующий по дому' },
      row: { english: 'ссора (произносится как «рау»)' },
      raised: { english: 'подняла (raise)' },
    },
    expressions: {
      'out of date': { english: 'устаревший' },
      "can't stand": { english: 'терпеть не могу' },
    },
    grammarNote:
      "«the soup, which Grandma had been cooking since six in the morning» — which с запятой и Past Perfect Continuous: дополнительная информация о супе. А «If you worked in a bank, you would earn three times more» — второе условное (повторение): воображаемая ситуация. По-русски «если бы ты работала в банке, ты бы зарабатывала» — «бы» в обеих частях, а в английском would только в одной.",
    comprehensionQuestions: [
      {
        question: 'Why does Callum eat three bowls of soup?',
        options: ['He is very hungry.', "He thinks that saying no is rude, so he keeps saying yes.", 'Masha tells him to.'],
        correctIndex: 1,
      },
      {
        question: 'Why is cooking so important for Grandma?',
        options: ['It helps her feel at home in a new country.', 'She works as a cook.', 'Dad asks her to cook.'],
        correctIndex: 0,
      },
      {
        question: "What is Dad's opinion of Masha's job?",
        options: ['He is very proud of it.', 'He wants to work there too.', 'He thinks she should earn more in a different job.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-5',
    title: "Grandma's Recipe",
    titleTranslation: 'Бабушкин рецепт',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "In the kitchen, Grandma took an old book from a shelf, opened it carefully and pointed. Later, I put the page into English for Callum, and he asked me to write it down, so this is it:\n\n" +
      "Pelmeni, the way my mother made them in Moscow. For the dough, you need an egg, water and salt, and for the inside, you need raw meat and a little salt. Make the dough with your hands, never with a machine, because home-made dough has a different flavour. Make each one small, like an ear. In my childhood, the whole family sat at one table in winter and made hundreds of them together, and we talked and argued and laughed. My mother always said that pelmeni taste better when you make them with people you love. I believe it.\n\n" +
      "Callum had never made anything with dough before, and his first pelmeni looked very sad. Grandma took his hands in hers and showed him again, slowly, without words. She doesn't speak much English, but cooking has its own language, and after twenty minutes, he had made real progress: his pelmeni were almost beautiful, and Grandma approved. She said something in Russian, and he looked at me through the kitchen door. 'What did she say?' 'She said that you have good hands,' I said, 'and that you're more patient than Dad.'\n\n" +
      "I stood at the kitchen door and watched them. Grandma's mother tongue is Russian, and in London she had lost most of the things that she loved: her friends, her flat, her language, even her bread. She was homesick, and her culture shock had been much worse than mine at fourteen. But here, with dough on her face and an English boyfriend learning to make pelmeni, she looked happy for the first time since she arrived.\n\n" +
      "Then, from the other room, I heard my dad's voice again, louder now, and then my own name. Mum had tried to stop the row, and it hadn't worked. 'Masha!' Dad called. 'Come back. We haven't finished talking.' Grandma, who was delighted with her new student a minute before, looked at me and said nothing.",
    words: {
      pelmeni: { english: 'пельмени' },
      dough: { english: 'тесто' },
      raw: { english: 'сырой (о еде)' },
      'home-made': { english: 'домашний, сделанный дома' },
      flavour: { english: 'вкус, аромат' },
      childhood: { english: 'детство' },
    },
    expressions: {
      'mother tongue': { english: 'родной язык' },
      'culture shock': { english: 'культурный шок' },
    },
    grammarNote:
      "«pelmeni taste better when you make them with people you love» — придаточное без who / that: people (that) you love. Если «который» — дополнение, его можно опустить. По-русски «люди, которых ты любишь» — «которых» нужно всегда, а в английском people you love звучит естественнее. А «She said that you have good hands» — косвенная речь: иногда время не сдвигают, если это правда и сейчас.",
    comprehensionQuestions: [
      {
        question: "What does the recipe say about making pelmeni?",
        options: ['Use a machine to save time.', 'Make them by hand, and make them with people you love.', 'Buy the dough in a shop.'],
        correctIndex: 1,
      },
      {
        question: 'How does Grandma show Callum what to do?',
        options: ['She shows him with her hands, slowly, without words.', 'She gives him a book in English.', 'Masha shows him.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Masha watch Grandma with Callum?',
        options: ['She wants to learn the recipe.', "She doesn't trust Callum.", 'She sees Grandma happy for the first time since she arrived.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-6',
    title: 'The Row',
    titleTranslation: 'Ссора',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "I went back to the table, and the argument, which had started as a small one about money, turned into the row that we had been having for ten years. 'I gave up my career for this family,' Dad said. 'I was an engineer in Moscow, and here I drove a taxi for five years, so that you and Artyom could have a better life. And you work for a salary that wouldn't pay for this flat.' 'You keep saying that,' I said. 'If you were proud of me, you wouldn't talk about money every time.'\n\n" +
      "Mum tried to stop us, but it was too late. I told Dad about the pressure that I had felt since my culture shock at fourteen, when we arrived in London and I didn't speak a word of English: the pressure to be the best at school, the best at university, the best at everything, because my parents had given up so much. 'My upbringing was all about being the best,' I said. 'I admire you, Dad, but no one ever took into account what I wanted.' Dad looked shocked, as if I had hit him. 'That's not fair,' he said quietly. 'That's not fair, Masha.'\n\n" +
      "Artyom put his phone down for the first time all day. 'That's a good point,' he said to me. 'Can you both stop?' But we couldn't stop. Dad said that I was too English now, and that I had forgotten where I came from. I said that I didn't feel at home anywhere: too Russian for my English friends and too English for my own family. It was the question of identity that I had never revealed to anyone, and it was hard to say it now, in front of Callum.\n\n" +
      "I stood up and went out into the garden, where it was cold and dark and quiet, to let off steam. I expected Callum to follow me. Instead, through the window, I saw him walk into the big room, where my father was sitting alone at the table with his head in his hands. Callum sat down next to him. I couldn't hear what they were saying, but after a minute, Dad stood up, opened the balcony door and went outside, and Callum went with him.\n\n" +
      "I was too surprised to be angry. I didn't know that you could get used to my family so fast.",
    words: {
      pressure: { english: 'давление' },
      upbringing: { english: 'воспитание' },
      admire: { english: 'восхищаться' },
      shocked: { english: 'потрясённый, в шоке' },
      identity: { english: 'идентичность, самоощущение (кто ты)' },
    },
    expressions: {
      "that's a good point": { english: 'это верное замечание, тут ты прав' },
      'get used to': { english: 'привыкнуть к' },
    },
    grammarNote:
      "«the argument, which had started as a small one about money, turned into the row» — which с запятыми вставляет дополнительную информацию в середину предложения. А «the garden, where it was cold and dark» и «the big room, where my father was sitting» — where для места, тоже с запятой. По-русски «в сад, где было холодно» — так же, и здесь запятая в английском нужна, как в русском.",
    comprehensionQuestions: [
      {
        question: "Why does Dad talk about his career?",
        options: ['He wants Masha to understand what he gave up for the family.', 'He wants a new job.', 'He is proud of driving a taxi.'],
        correctIndex: 0,
      },
      {
        question: "What does Masha say about her identity?",
        options: ['She feels just Russian.', 'She feels just English.', 'She feels between the two cultures and does not belong to either.'],
        correctIndex: 2,
      },
      {
        question: 'What surprises Masha at the end?',
        options: ['Callum leaves the house.', 'Callum goes to talk to her father instead of following her.', 'Artyom goes to the garden.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-7',
    title: 'The Balcony',
    titleTranslation: 'Балкон',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Callum told me later what they said on the balcony, and Dad, who never talks about how he feels, told me the same story a year after that, so I know that it's true.\n\n" +
      "They stood in the cold for a long time without speaking. Then Dad said that he was sorry for the noise. 'In England, people don't shout at dinner,' he said. 'You must think we're strange.' Callum said that his own family never shouted, because they never talked at all, and that his parents' divorce was so quiet that he only found out about it from a letter. 'I'd prefer the shouting,' he said. 'At least you all care.'\n\n" +
      "Dad was quiet. Then he told Callum about Moscow, about the bridges that he had built, and about arriving in London at forty with two children, a wife whose work as a doctor wasn't accepted here, and an English that no one understood. 'My own upbringing was hard too,' he said, 'and I put too much pressure on her. I wasn't a native speaker. I was an immigrant, and I was nothing. I had to adapt, and I did, but it took years.' He said that his children had adapted faster, that they were bilingual now, and that sometimes, at dinner, they said funny things in English that he didn't understand. 'I'm proud of Masha,' he said. 'Very proud. I just can't tell her.'\n\n" +
      "'Why not?' Callum asked. Dad thought for a long time. 'Because if I tell her, she'll stop trying so hard,' he said. 'That's what my father thought too.' Callum looked at him. 'With respect,' he said, 'I don't think she needs to try harder. I think she needs to hear it. You've both got the same nationality, the same stubborn face and the same kind eyes. Go and tell her.'\n\n" +
      "A minute later, Dad came out into the garden, where I was still standing in the dark. He didn't say much. He put his coat on me, which is what he used to do when I was small, and he said, in Russian, 'I'm proud of you. I always have been. Let's make up.' My eyes were wet, and then we were hugging in the middle of Mum's vegetable bed. Through the window, I could see Callum and Grandma in the kitchen, making the last pelmeni and pretending not to watch.",
    words: {
      divorce: { english: 'развод' },
      adapt: { english: 'приспособиться, адаптироваться' },
      bilingual: { english: 'двуязычный' },
      nationality: { english: 'национальность, гражданство' },
      immigrant: { english: 'иммигрант' },
    },
    expressions: {
      'native speaker': { english: 'носитель языка' },
      'make up': { english: 'помириться' },
    },
    grammarNote:
      "«a wife whose work as a doctor wasn't accepted here» — whose («чей»): относится к человеку и показывает, что ему принадлежит. И фразовый глагол make up: «Let's make up» — «давай помиримся». У фразовых глаголов значение часто нельзя угадать по частям: make + up не «сделать вверх», а «помириться». По-русски такие значения передаются отдельными словами, поэтому фразовые глаголы стоит учить целиком, как новые слова.",
    comprehensionQuestions: [
      {
        question: "Why does Callum say he prefers the shouting?",
        options: ['He likes noise.', "In his family, people didn't talk, and shouting shows that people care.", 'He wants Dad to shout more.'],
        correctIndex: 1,
      },
      {
        question: "Why hasn't Dad told Masha that he is proud of her?",
        options: ['He is afraid that she will stop trying so hard.', 'He is not proud of her.', 'He does not speak English well.'],
        correctIndex: 0,
      },
      {
        question: "What is Callum's advice to Dad?",
        options: ['To shout more quietly at dinner', 'To learn better English', 'To tell Masha that he is proud of her'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m6-8',
    title: "Grandma's Letter",
    titleTranslation: 'Письмо от бабушки',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Two weeks later, a letter arrived at Callum's flat. It was in Russian, in Grandma's beautiful handwriting, and Callum brought it to me so that I could read it to him in English. This is what it said:\n\n" +
      "Dear Callum, Masha tells me that you are a teacher, which is the most important job in the world, and that you are learning Russian, which is the most difficult language in the world. I am writing to say thank you. When I came to London last year, I was homesick, and I thought that I was too old to adapt, to fit in or to settle in, and that I would always be a guest in someone else's country. Then you came to our dinner and made home-made pelmeni with me, and for one afternoon I felt at home. You respected our customs, even the ones about roses. In our family, food is how we say the things that are difficult to say. You understood that without words, which tells me that you are a caring person.\n\n" +
      "Our family is loud, and three generations argue at one table, but there is a bond between us, and now you are part of it, whether you like it or not. Please do a favour for an old woman: next time, bring an odd number of roses, and keep me up to date about your Russian. And please do not wait too long before you get engaged, because I would like to dance at your wedding while my legs still work. With love, Valentina.\n\n" +
      "I finished reading, and for a moment we didn't speak. 'Engaged?' Callum said at last. 'She doesn't waste time, your grandmother.' 'It runs in the family,' I said, and he laughed.\n\n" +
      "The next Sunday, we went back to my parents' house, and this time Callum cooked: pelmeni from Grandma's recipe, which he had been practising all week in his tiny kitchen. He brought five roses for Mum and one for Grandma. Dad, who had made up with me in the garden, made a toast to the cook and didn't mention money once. Mum told me later that she had never seen Grandma so happy since she arrived. Callum still has the letter. He keeps it in the small book where he wrote down my family's rules, and sometimes, when he thinks I'm not looking, he reads it again.",
    words: {
      handwriting: { english: 'почерк' },
      caring: { english: 'заботливый, добрый' },
      bond: { english: 'связь, близость (между людьми)' },
      engaged: { english: 'помолвлен: get engaged — обручиться' },
      wedding: { english: 'свадьба' },
    },
    expressions: {
      'do a favour': { english: 'сделать одолжение' },
      'up to date': { english: 'в курсе: keep me up to date — держи меня в курсе' },
    },
    grammarNote:
      "«you are a teacher, which is the most important job in the world» — which с запятой может относиться ко всей мысли: «что является самой важной работой». По-русски здесь тоже «что» или «а это», а не «который». И «the small book where he wrote down my family's rules» — where для места. Весь модуль в одной фразе: who — люди, which — вещи и целые мысли, where — места, whose — «чей».",
    comprehensionQuestions: [
      {
        question: 'Why does Grandma write to Callum?',
        options: ['To thank him for making her feel at home', 'To ask for money', 'To tell him to leave Masha'],
        correctIndex: 0,
      },
      {
        question: "What does Grandma say about food in her family?",
        options: ['It is not important.', 'It is how they say things that are difficult to say.', 'Only men cook.'],
        correctIndex: 1,
      },
      {
        question: 'How is the next Sunday dinner different?',
        options: ['No one comes.', 'They go to a restaurant.', 'Callum cooks, and the family is calmer and happier.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
