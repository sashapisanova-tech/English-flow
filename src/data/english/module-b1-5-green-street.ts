import type { ReadingText } from '@/types/dutch';

const M = 'b1-green-street' as const;
const MT = 'The Green Street';

export const moduleB1_5Texts: ReadingText[] = [
  {
    id: 'b1m5-1',
    title: 'The Letter',
    titleTranslation: 'Письмо',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Olga Smirnova had lived on Ash Street in Leeds for six years, and in all that time, she had never really spoken to her neighbours. She knew the old man at number 9 by his beautiful garden, and she knew the boy at number 22 by the loud music from his window. She said hello to them, but she didn't know their names. She was a teacher at a school for young children, she was 38, and she was from Samara, and sometimes she wished that the street felt more like a home. She wished that she knew the people next door.\n\n" +
      "The only green space on Ash Street was the corner at the end, a small corner of land with three old trees, long grass and an old seat. Children played in the grass after school, people walked their dogs there, and in spring, the trees were full of life. No one knew who it belonged to. It had always just been there.\n\n" +
      "Then, one Monday in March, a letter from the local council arrived at every house:\n\n" +
      "Dear Resident, We would like to inform you that the company Brightway has asked for planning permission to build a car park on the land at the end of Ash Street. The car park would have sixty spaces. If you would like to comment, please write to the council by 30 April. Yours, Planning Department, Leeds City Council.\n\n" +
      "Olga read the letter two times, standing in her kitchen with her coat still on. If they built a car park there, the children would have no place to play, and the green space would be gone. The air on Ash Street was already bad enough, because of the traffic on the main road. She looked out of the window at the three trees and thought that if she did nothing, no one would. That evening, she did something that she had never done before. She made a group chat for the street and wrote one message: 'Has everyone seen the letter? Can we talk?'",
    words: {
      council: { english: 'городской совет, местные власти' },
      resident: { english: 'житель (дома, района)' },
      inform: { english: 'сообщить, уведомить (официально)' },
      grass: { english: 'трава' },
      air: { english: 'воздух' },
    },
    expressions: {
      'green space': { english: 'зелёная зона, сквер' },
      'planning permission': { english: 'разрешение на строительство' },
    },
    grammarNote:
      "«If they built a car park there, the children would have no place to play» — второе условное: if + прошедшее время, а во второй части would + глагол. Это воображаемая ситуация, которой пока нет. По-русски «если бы построили… дети бы не…» — с частицей «бы» в обеих частях, а в английском would только во второй части. И «she wished that the street felt more like a home» — после wish прошедшее время: wish + felt, а не wish + feels.",
    comprehensionQuestions: [
      {
        question: 'How did Olga know her neighbours before the letter?',
        options: ['She knew them very well.', 'Only from small things, not by name.', 'She had never seen them.'],
        correctIndex: 1,
      },
      {
        question: 'What does the letter say?',
        options: ['A company wants to build a car park on the green corner.', 'The council is going to plant more trees.', 'The street is going to be closed.'],
        correctIndex: 0,
      },
      {
        question: 'Why does Olga make a group chat?',
        options: ['She wants to sell her house.', 'She is bored.', 'She thinks that if she does nothing, no one else will do anything.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-2',
    title: 'The Group Chat',
    titleTranslation: 'Групповой чат',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "By the next morning, eighteen people had joined the group chat, and Olga discovered that her quiet street had a lot to say:\n\n" +
      "Sandra (No. 3): Honestly, I'm in favour of the car park. I drive for twenty minutes every night looking for a space. Gary (No. 17): I oppose everything that the council wants. On principle. Mr Patel (No. 9): If they cut down those trees, I will be very sad. I have watched them grow for forty years. Kwame (No. 22): Same. That corner is the only green thing on the street. Sandra (No. 3): Trees don't help when you have a baby and no place to park. Olga (No. 14): Can we have a real debate about this? In person? I want everyone to get involved.\n\n" +
      "Olga read the messages on the bus to school and felt both pleased and worried. She was pleased because people were finally talking, but worried because they disagreed so much. Gary opposes everything, she thought, but Sandra has a real reason. She understood Sandra's point of view. If she had a baby and no parking space, she would probably want a car park too. On the other hand, a car park for sixty cars would bring more traffic and more noise, and the children would lose the only place to play outside.\n\n" +
      "During lunch, she made a list of the benefits and disadvantages, like she did with the children in her class when they had to make a decision. The benefits of the car park were clear: more spaces for people with cars. The disadvantages were also clear: no trees, no grass, more cars and dirtier air. She wished that there was an answer that could help everyone, not just half of the street, and that the debate could end with a plan instead of a fight.\n\n" +
      "That evening, Mr Patel wrote again: 'I have a proposal, and it is a simple proposal. Come to my garden on Saturday at eleven. I will make tea, and we can talk properly. Everybody is welcome, even Gary.' Gary answered with one word: 'Fine.' Kwame wrote too: 'I'll come. I've got an idea, and if people like it, it might change everything.' Olga looked at the chat for a long time. For the first time in six years, she was looking forward to Saturday.",
    words: {
      oppose: { english: 'выступать против' },
      debate: { english: 'обсуждение, дебаты' },
      benefits: { english: 'плюсы, выгоды (benefit)' },
      disadvantages: { english: 'недостатки, минусы (disadvantage)' },
      proposal: { english: 'предложение (план, идея)' },
      principle: { english: 'принцип: on principle — из принципа' },
    },
    expressions: {
      'in favour of': { english: 'за (что-то), в поддержку' },
      'get involved': { english: 'участвовать, включиться' },
    },
    grammarNote:
      "«If she had a baby and no parking space, she would probably want a car park too» — второе условное: if + прошедшее время (had), would + глагол. Это не про прошлое! Речь о воображаемой ситуации сейчас. По-русски «если бы у неё был ребёнок, она бы тоже хотела…». А «She wished that there was an answer» — wish + прошедшее время для того, чего сейчас нет и чего хочется.",
    comprehensionQuestions: [
      {
        question: 'Why is Sandra in favour of the car park?',
        options: ['She works for Brightway.', "She often can't find a space to park.", 'She hates trees.'],
        correctIndex: 1,
      },
      {
        question: 'How does Olga feel about Sandra\'s opinion?',
        options: ['She understands it, even though she disagrees.', 'She thinks Sandra is wrong about everything.', 'She agrees with Sandra on everything.'],
        correctIndex: 0,
      },
      {
        question: 'What is the purpose of Mr Patel\'s message?',
        options: ['To sell his garden', 'To ask for money', 'To ask everyone to talk in person'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-3',
    title: "Mr Patel's Garden",
    titleTranslation: 'Сад мистера Пателя',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "Fourteen people came to Mr Patel's garden on Saturday, and Olga didn't recognise many of them. There were young parents with babies, two students from number 5, an old couple who had lived on the street for fifty years, and Gary. He stood by the door with his arms crossed. Mr Patel had made tea and Indian food for everyone, and for the first half hour, people just ate and talked like old friends.\n\n" +
      "Then Kwame stood up with a big drawing. He was seventeen and wanted to be an architect, and he had worked all week on this drawing of the corner. In his picture, the three old trees were still there, but next to them there was a small community garden with vegetables, a few benches and space for the children to play. At one end, there were eight parking spaces for the houses with no parking. 'If we did this,' he said nervously, 'no one would lose everything. It's a proposal for the whole community.' 'The trees would stay, and some people would get a space.'\n\n" +
      "No one spoke for a moment, and then Sandra spoke. 'Eight spaces is better than nothing,' she said slowly. 'If the parking problem was solved for the families with babies, I could live with that.' Even Gary looked interested, although he opposes most things. 'It depends on the council,' he said. 'And it depends on the money. Who pays for vegetables and benches?'\n\n" +
      "It was a good question, and no one had an answer at first. Then Mr Patel said that a lot of things in a community garden cost nothing: plants from people's gardens, old boxes and volunteers. 'In my village in Gujarat, the whole street looked after one garden,' he said. 'We can do the same.' The young parents said that they would raise money with a cake sale, and the students offered to make a website as well as signs for a campaign.\n\n" +
      "By the end of the afternoon, they had a plan with three parts: a list of names against the car park, a cleaner corner and Kwame's drawing for the council. 'If we're going to win,' Olga said, 'we need everyone. Pollution from the main road is already bad enough, and a car park would make it worse.' As people left, she noticed something new: they were saying goodbye to each other by name.",
    words: {
      architect: { english: 'архитектор' },
      community: { english: 'сообщество, местные жители' },
      volunteers: { english: 'волонтёры, добровольцы (volunteer)' },
      campaign: { english: 'кампания (за что-то)' },
      pollution: { english: 'загрязнение' },
      benches: { english: 'скамейки (bench)' },
    },
    expressions: {
      'raise money': { english: 'собирать деньги (на что-то)' },
      'as well as': { english: 'а также, как и' },
    },
    grammarNote:
      "«It depends on the council» — depend on: только с on, а не from или of. По-русски «зависит от», и хочется сказать depends from, но в английском — всегда on. А «If we did this, no one would lose everything» — второе условное: воображаемый план, которого пока нет. По-русски «если бы мы так сделали, никто бы не потерял всё».",
    comprehensionQuestions: [
      {
        question: "What is Kwame's idea?",
        options: ['A bigger car park', 'A garden next to the trees with a few parking spaces', 'A new house on the corner'],
        correctIndex: 1,
      },
      {
        question: 'Why does Sandra change her mind a little?',
        options: ['The plan gives some parking spaces to families who need them.', 'Gary tells her to.', 'She wants to grow vegetables.'],
        correctIndex: 0,
      },
      {
        question: "What does Olga notice at the end, and why is it important?",
        options: ['People are angry, so the plan will fail.', 'No one came, so the street does not care.', "People now know each other's names, so the street feels more like a community."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-4',
    title: 'The Petition',
    titleTranslation: 'Петиция',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "The students from number 5 wrote the petition that night, and by Monday it was on the internet and on paper in every shop on the main road:\n\n" +
      "SAVE THE ASH STREET CORNER. We, the residents of Ash Street, oppose the plan to build a car park on the green corner. In spite of being small, this land is home to three trees that are over a hundred years old, as well as many small animals and other wildlife. If you cut down trees, the air gets dirtier. If you build car parks, more people drive. We ask the council to reduce traffic, not to increase it, and to consider our own plan for a community garden. Please sign here.\n\n" +
      "Olga visited every house on the street that week, and she discovered that she loved it. Behind every door, there was a story. An old woman at number 30 had planted the first tree on the corner in 1960. A family from Poland had moved in only last month and didn't know anyone yet. A man who worked nights had never seen the corner in the day. Some people refused to sign, and one man closed the door before she could speak, but most people signed, and many of them said that they wished the city had more places like it.\n\n" +
      "Kwame spent the week doing something different. He took his drawing to school, and his teacher helped him turn it into a small model. The model showed the trees, the paths, the vegetable beds and the eight parking spaces, and it had tiny benches. He put a photo of it on the petition page, and in two days, the number of signatures went from two hundred to two thousand.\n\n" +
      "On Friday, Olga received a phone call from a journalist at the Leeds Evening News. She wanted to write about the campaign and the petition. 'If you can talk to me by tomorrow,' the journalist said, 'it'll be on page three on Monday.' Olga said yes, and then she sat on her stairs with cold hands. She had never been in the news before, and she wished that she wasn't so nervous. The number of signatures was still going up, and she wished that it could increase forever.",
    words: {
      petition: { english: 'петиция' },
      wildlife: { english: 'дикая природа, животные и птицы' },
      reduce: { english: 'уменьшать, сокращать' },
      consider: { english: 'рассмотреть, обдумать' },
      signatures: { english: 'подписи (signature)' },
      model: { english: 'макет, модель' },
      increase: { english: 'увеличить(ся), расти' },
    },
    expressions: {
      'in spite of': { english: 'несмотря на' },
      'cut down': { english: 'срубить (дерево)' },
    },
    grammarNote:
      "«If you cut down trees, the air gets dirtier» — нулевое условное: if + настоящее время в обеих частях. Так говорят о том, что верно всегда, как закон природы. По-русски тоже «если рубить деревья, воздух становится грязнее». А «many of them said that they wished the city had more places like it» — wish + прошедшее время (had): хотелось бы, но пока не так.",
    comprehensionQuestions: [
      {
        question: 'What does the petition ask the council to do?',
        options: ['To build more car parks', 'To reduce traffic and look at the residents\' garden plan', 'To cut down the trees'],
        correctIndex: 1,
      },
      {
        question: 'What does Olga discover when she visits the houses?',
        options: ['Everyone has a story, and most people support the campaign.', 'No one wants to talk to her.', 'Everyone wants a car park.'],
        correctIndex: 0,
      },
      {
        question: 'Why does the number of signatures grow so fast?',
        options: ['The council pays people to sign.', 'Olga visits every house in Leeds.', "People like the photo of Kwame's model."],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-5',
    title: 'Page Three',
    titleTranslation: 'Третья страница',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "On Monday morning, Olga bought the Leeds Evening News at the shop on the corner, and she read the article standing in the street:\n\n" +
      "NEIGHBOURS FIGHT FOR THEIR GREEN CORNER. Residents of a quiet street in Leeds are fighting a plan to build a car park on the only green space in the area. More than two thousand people have signed a petition, and a local student has designed a community garden instead of the car park. 'We aren't against cars,' said teacher Olga Smirnova. 'We're in favour of people. If there were more places like this corner, our cities would be better places to live.' Simon Hale of Brightway said that the car park would bring jobs and money to the area. 'On average, a car park like this one brings five jobs,' he said, 'and the council's policy is to support local companies.' If the plan is approved, construction will start in June. Citizens can give their opinion until the council meets to vote on the plan on 20 May.\n\n" +
      "Olga read her own words three times. They looked better than she remembered, and she felt proud, but she also felt a little sick. Now the whole city knew her name, and the people who wanted the car park knew it too. In the group chat, the messages came fast, and people talked about the petition, the vote and the signatures. 'You're famous!' Kwame wrote. 'Five jobs?' Gary wrote. 'For a car park? Rubbish.' Mr Patel sent a photo of the article on his fridge.\n\n" +
      "Not everyone was happy. That afternoon, a man from the next street stopped her outside the school. 'I read the paper,' he said. 'Some of us need parking. My mother is ninety, and I can't park near her house. Your trees won't help her.' Olga didn't know what to say. She told him about the eight spaces in Kwame's plan, and he listened, but he didn't look convinced.\n\n" +
      "That night, she couldn't sleep. She wished that every decision had a simple answer, and that you could make a street greener without making someone's life harder. At three in the morning, she heard a lorry in the street, and then a loud noise near the corner, but when she looked out of the window, she couldn't see anything in the dark.",
    words: {
      designed: { english: 'спроектировал (design)' },
      policy: { english: 'политика, курс (организации)' },
      vote: { english: 'голосовать' },
      citizens: { english: 'жители, граждане (citizen)' },
      construction: { english: 'строительство' },
    },
    expressions: {
      'instead of': { english: 'вместо' },
      'on average': { english: 'в среднем' },
    },
    grammarNote:
      "«If there were more places like this corner, our cities would be better places to live» — второе условное с were: в формальной речи were используют для всех лиц (if there were, if I were). По-русски «если бы таких мест было больше, в городах было бы лучше жить». А «She wished that every decision had a simple answer» — wish + прошедшее: хотелось бы, но в реальности не так.",
    comprehensionQuestions: [
      {
        question: 'What does Simon Hale say in the article?',
        options: ['The car park will bring jobs and help local companies.', 'Brightway is going to plant trees.', 'He agrees with the residents.'],
        correctIndex: 0,
      },
      {
        question: 'Why does the man from the next street disagree with Olga?',
        options: ['He hates trees.', 'He works for Brightway.', 'His old mother needs a parking space near her house.'],
        correctIndex: 2,
      },
      {
        question: 'How does Olga feel at the end of the day?',
        options: ['Happy and calm', 'Worried, because the problem is not simple for everyone', 'Angry with Kwame'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-6',
    title: 'Rubbish',
    titleTranslation: 'Мусор',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "In the morning, Olga understood what the noise had been. Someone had driven a lorry to the corner in the night and left a huge pile of rubbish under the three trees: old sofas, old chairs, bags and building waste. The grass was covered in litter, and one of the old benches had been destroyed. It was the worst damage that the corner had ever seen.\n\n" +
      "Kwame arrived first, and he was furious. 'They want it to look bad before the vote,' he said. 'If the corner looks like a rubbish tip, the council will say that no one cares about it.' 'We don't know who did it,' Olga said. 'We shouldn't guess.' But she wished that she knew, and she was angry too.\n\n" +
      "By nine o'clock, the group chat was full of photos, and by ten, half the street was standing on the corner. No one had organised anything, but people began to take up gloves and bags and to clear the rubbish. Gary, the man who opposed everything, arrived with a van and drove the old sofas to the recycling centre four times. The family from Poland brought sandwiches. Sandra came with her baby on her back and picked up plastic bags for two hours. 'I still want a parking space,' she told Olga, 'but nobody is going to destroy our street.'\n\n" +
      "At first, the work was slow, but by the afternoon, they started to make progress. They separated the rubbish for recycling, they cleaned the grass, and Mr Patel planted flowers next to the trees, for the wildlife. When a reporter from the Evening News came to take photos, the corner looked better than it had looked for years. 'If someone wants to make this place look bad,' Mr Patel told her, 'they're doing the opposite. Look at all these people. Look at the petition, too.'\n\n" +
      "That evening, Olga sat on the one bench that was still standing and looked at the clean corner. Her back hurt, her hands were dirty, and she was happier than she had been for months. Then her phone rang. It was the council. The meeting about the car park was now on Thursday, two weeks earlier, and the residents could send one person to speak. 'We'd like that person to be you,' Mr Patel wrote in the chat a minute later.",
    words: {
      pile: { english: 'куча, груда' },
      litter: { english: 'мусор (на улице)' },
      destroyed: { english: 'разрушена, уничтожена (destroy)' },
      damage: { english: 'ущерб, повреждение' },
      recycling: { english: 'переработка (отходов)' },
      separated: { english: 'разделили, рассортировали (separate)' },
    },
    expressions: {
      'take up': { english: 'взять (в руки); взяться за' },
      'make progress': { english: 'продвигаться, делать успехи' },
    },
    grammarNote:
      "«If the corner looks like a rubbish tip, the council will say that no one cares» — первое условное: реальная возможность, if + настоящее время, will во второй части. Сравните со вторым условным: If they built a car park, the children would lose… — это уже воображаемое. По-русски в обоих случаях можно сказать «если», а в английском время показывает, реально это или нет. И пассив: «one of the old benches had been destroyed» — had been + третья форма.",
    comprehensionQuestions: [
      {
        question: 'What does Kwame think the people with the rubbish wanted?',
        options: ['To make the corner look bad, so the council thinks no one cares about it', 'To help the campaign', 'To build benches'],
        correctIndex: 0,
      },
      {
        question: 'What is surprising when the street cleans the corner?',
        options: ['No one comes.', 'People who disagreed about the car park work together.', 'The council pays for it.'],
        correctIndex: 1,
      },
      {
        question: "What is Mr Patel's point about the rubbish?",
        options: ['The street looks bad now.', 'They should give up.', 'It has brought the street together.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-7',
    title: 'Two Minutes',
    titleTranslation: 'Две минуты',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "The council meeting was in a big room at the council, with long tables, bad coffee and about a hundred people. Half of Ash Street had come, and Kwame had brought his model in a box on the bus. Olga had prepared her speech for a week, and she had practised the speech in front of her class, and they had clapped politely. She had two minutes, and she was more nervous than on her first day as a teacher.\n\n" +
      "Simon Hale from Brightway spoke first. He was calm and well dressed, and he talked about jobs, money and parking problems in the area. Brightway wanted to take into account the residents' worries, he said, and it was ready to plant ten small trees next to the car park. It was a good speech, and Olga saw some people nodding. Then the chair of the meeting looked at her. 'Ms Smirnova, two minutes, please.'\n\n" +
      "Olga stood up, and for a second, she couldn't remember a single word. Then she looked at the model on the table, at the tiny trees and the tiny benches, and she put her paper down. 'Six weeks ago,' she said, 'I didn't know the names of my neighbours. Now I know fifty of them. I know that Mrs Hill planted the first tree on our corner in 1960. I know that Sandra needs a parking space for her baby, and Kwame's plan gives her one. I know that when someone left rubbish on our corner, forty people came to clean it. If you build a car park there, you won't just lose three trees. You'll lose the place that made us a community.' She stopped. 'You should come and see it on a Saturday.'\n\n" +
      "No one spoke for a moment, and then the room clapped,. The chair said that there would be a short discussion. Simon Hale asked whether the residents were ready to negotiate, and Mr Patel said that they were, as long as the trees stayed, after all the litter and the damage. After an hour of discussion, the chair announced that the council would put off the vote for one week, so that both groups could negotiate and look for a deal.\n\n" +
      "Outside, in the rain, Kwame hugged Olga, and Gary held her hand for a very long time. 'Not bad, teacher,' he said. 'Not bad at all.'",
    words: {
      speech: { english: 'речь, выступление' },
      nodding: { english: 'кивая (nod — кивать)' },
      discussion: { english: 'обсуждение' },
      negotiate: { english: 'вести переговоры, договариваться' },
      deal: { english: 'сделка, договорённость' },
    },
    expressions: {
      'take into account': { english: 'принимать во внимание, учитывать' },
      'put off': { english: 'отложить' },
    },
    grammarNote:
      "«If you build a car park there, you won't just lose three trees» — первое условное: реальная угроза, if + настоящее, will во второй части. Нельзя if you will build! Это главная ловушка: после if будущее время не ставится, хотя по-русски «если вы построите» — будущее. Сравните со вторым условным: If there were more places like this… — это мечта, а не реальный план.",
    comprehensionQuestions: [
      {
        question: 'Why does Olga put her paper down?',
        options: ['She forgets her speech, so she speaks without her paper.', 'The chair asks her to.', 'She wants to read Kwame\'s notes.'],
        correctIndex: 0,
      },
      {
        question: "What is the main point of Olga's speech?",
        options: ['Car parks are always bad.', 'Brightway is lying.', 'The corner made the street a community, and the plan helps everyone.'],
        correctIndex: 2,
      },
      {
        question: 'What does the council say at the end?',
        options: ['To build the car park', 'To wait a week so that both groups can talk', 'To close Ash Street'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
  {
    id: 'b1m5-8',
    title: 'The Green Corner',
    titleTranslation: 'Зелёный уголок',
    level: 'B1', module: M, moduleTitle: MT,
    content:
      "A week later, another letter from the council arrived at every house on Ash Street, and this time people opened it together, on the corner:\n\n" +
      "Dear Resident, Following discussions and a fair deal between the residents of Ash Street and Brightway, the council has approved a new plan for the land at the end of Ash Street. The three trees will stay. The land is going to be a community garden, with eight parking spaces for local families, and the residents will look after the garden. Brightway has agreed to call off its plans for a car park and to pay for new benches and solar lights. Both groups agreed to these conditions on 27 May. Planning Department, Leeds City Council.\n\n" +
      "For a moment, no one said anything. Then Sandra shouted, her baby laughed, and suddenly everyone was hugging everyone. Mr Patel's eyes were wet. 'If my wife could see this,' he said quietly, 'she would be so happy. She loved those trees.' Olga held his arm and didn't say anything, because there was nothing to say.\n\n" +
      "The garden opened in July. Kwame's drawing was hanging in the window of the corner shop, and he had been offered a summer job with architects in the city centre. The vegetable beds were planted by volunteers, the children painted the benches, and Gary built a small house for the wildlife, although he had opposed everything at the start. There was no litter on the corner now, only flowers. Every Saturday morning, people met on the corner to water the plants and catch up, and the council's approved plan, with its solar lights and its conditions, was on the wall next to the petition with its two thousand signatures.\n\n" +
      "Olga still thinks about the letter in March, when she didn't know anyone's name. In March, she didn't believe that the street could ever be a community. Now, when she walks home from school, people say hello and ask about her class, and she knows everyone's story. She wished, at the start, that the street felt more like a home. She doesn't need to wish for that any more.",
    words: {
      approved: { english: 'одобрил (approve)' },
      solar: { english: 'солнечный (на солнечной энергии)' },
      conditions: { english: 'условия (condition)' },
      hugging: { english: 'обнимая (hug — обнимать)' },
    },
    expressions: {
      'call off': { english: 'отменить' },
      'catch up': { english: 'наверстать, обменяться новостями' },
      'community garden': { english: 'общественный сад' },
    },
    grammarNote:
      "«If my wife could see this, she would be so happy» — второе условное: воображаемая ситуация, которой не может быть (жены мистера Пателя уже нет). А «She wished, at the start, that the street felt more like a home» — wish + прошедшее время. Весь модуль в одной мысли: if + прошедшее, would + глагол — для мечты; wish + прошедшее — для того, чего хочется, но пока нет.",
    comprehensionQuestions: [
      {
        question: 'What does the new plan include?',
        options: ['A garden with the trees, eight parking spaces and new benches', 'A car park with sixty spaces', 'A new building with flats'],
        correctIndex: 0,
      },
      {
        question: "Why are Mr Patel's eyes wet?",
        options: ['He is angry with Brightway.', 'He thinks of his wife. She loved the trees.', 'He wanted the car park.'],
        correctIndex: 1,
      },
      {
        question: 'How has Olga\'s life on the street changed?',
        options: ['She has moved away.', 'She is now famous all over the country.', 'She now knows her neighbours, and the street feels like home.'],
        correctIndex: 2,
      },
    ],
    completed: false,
  },
];
