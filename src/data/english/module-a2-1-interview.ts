import type { ReadingText } from '@/types/dutch';

const M = 'a2-interview' as const;
const MT = 'The Job Interview';

export const moduleA2_1Texts: ReadingText[] = [
  {
    id: 'a2m1-1',
    title: 'One Week to Go',
    titleTranslation: 'Осталась неделя',
    level: 'A2', module: M, moduleTitle: MT,
    content:
      "Three weeks ago, I sent my CV to forty companies in London. I'm Kirill, I'm 26, and I'm from St Petersburg. I moved to London last year. I usually work at home on my computer, and some days I only talk to my cat. I wanted a job in an office, with people.\n\n" +
      "Nobody answered. Then, last Friday, I got an email: 'Can you come for an interview next Friday at ten?' I read it three times. After that, I couldn't sit down, and I couldn't eat my breakfast.\n\n" +
      "My flatmate Femi helps people find jobs, so I showed her the email. 'Kirill, that's great news!' she said. 'You've got one week to get ready. Tell me: what experience have you got?' 'Four years. Apps for shops, cafés, even a bank.' 'Not bad. Now tell me about a time you were wrong.' 'I'm never wrong,' I said. Femi laughed. 'Yesterday you put salt in your tea! Actually, they always ask that in interviews.'\n\n" +
      "Now it's Sunday evening. Femi is sitting on the sofa with a list of fifty questions, and I'm standing in the kitchen in my best shirt. 'What if I make a mistake?' I ask. 'Then you make a mistake. Just do your best. Question one: tell me about yourself.' In Russian, I could talk about my work for hours. In English, I can't say a word.",
    words: {
      CV: { english: 'резюме' },
      companies: { english: 'компании, фирмы (company)' },
      interview: { english: 'собеседование (при приёме на работу)' },
      ago: { english: 'назад (three weeks ago — три недели назад)' },
      experience: { english: 'опыт (работы)' },
      actually: { english: 'вообще-то / на самом деле (не «актуально»!)' },
    },
    expressions: {
      'make a mistake': { english: 'ошибиться / сделать ошибку (make, не do)' },
      'do your best': { english: 'постараться изо всех сил / сделать всё, что можешь' },
    },
    grammarNote:
      "«Three weeks ago, I sent my CV… Last Friday, I got an email» — Past Simple с указанием, когда это было. ago ставится после срока: three weeks ago — «три недели назад», а last Friday идёт без предлога: не on last Friday. А could — прошедшее от can: I could talk about my work for hours, I couldn't sit down — «мог / не мог».",
    comprehensionQuestions: [
      {
        question: 'Why did Kirill send his CV to companies in London?',
        options: ['He wanted to work with people, not only with his cat.', "He didn't have a job.", 'Femi asked him to do it.'],
        correctIndex: 0,
      },
      {
        question: 'How did Kirill feel after he read the email?',
        options: ['He was tired and wanted to sleep.', 'He was angry about the time.', 'He was so happy that he forgot about food.'],
        correctIndex: 2,
      },
      {
        question: 'Why does Femi laugh?',
        options: ['Kirill wears his best shirt in the kitchen.', 'Kirill says he is never wrong, but yesterday he was.', 'Kirill has got only four years of experience.'],
        correctIndex: 1,
      },
    ],
    completed: false,
  },
];
