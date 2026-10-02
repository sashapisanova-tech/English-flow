import { describe, it, expect } from 'vitest';
import { candidates, checkCourse, sentencesOf, tokensOf, type WordLists } from '@/lib/contentCheck';
import type { ReadingText } from '@/types/dutch';

const lists: WordLists = {
  starter: ['a', 'the', 'is', 'are', 'she', 'he', 'it', 'in', 'and', 'my', 'this', 'not', 'do', 'you', 'have', 'i', 'here', 'very', 'big', 'small', 'room']
    .map(word => ({ word, pos: 'general', ru: 'x', topic: 'general' })),
  a1: [
    { word: 'flatmate', pos: 'noun', ru: 'сосед', topic: 'home' },
    { word: 'kitchen', pos: 'noun', ru: 'кухня', topic: 'home' },
    { word: 'fridge', pos: 'noun', ru: 'холодильник', topic: 'home' },
    { word: 'go', pos: 'verb', ru: 'идти', topic: 'general', past: 'went', pp: 'gone' },
    { word: 'get up', pos: 'phrase', ru: 'вставать', topic: 'general' },
  ],
  a2: [],
  b1: [],
};

function text(overrides: Partial<ReadingText>): ReadingText {
  return {
    id: 'a1m1-1',
    title: 'Test',
    titleTranslation: 'Тест',
    level: 'A1',
    module: 'a1-test' as ReadingText['module'],
    moduleTitle: 'Test',
    content: 'This is my flatmate.\n\nHe is in the kitchen.',
    words: { flatmate: { english: 'сосед' }, kitchen: { english: 'кухня' } },
    comprehensionQuestions: [],
    grammarNote: 'Пример.',
    completed: false,
    ...overrides,
  };
}

const messages = (t: ReadingText) => checkCourse([[t]], lists).errors.map(e => e.message).join('\n');

describe('candidates', () => {
  const irregular = new Map([['went', 'go']]);
  it('finds base forms of inflected words', () => {
    expect(candidates('flatmates', irregular)).toContain('flatmate');
    expect(candidates('stopped', irregular)).toContain('stop');
    expect(candidates('making', irregular)).toContain('make');
    expect(candidates('cities', irregular)).toContain('city');
    expect(candidates('went', irregular)).toContain('go');
  });
  it('expands contractions', () => {
    expect(candidates("don't", irregular)).toContain('do');
    expect(candidates("she's", irregular)).toContain('she');
    expect(candidates("can't", irregular)).toContain('can');
    expect(candidates("didn't", new Map([['did', 'do']]))).toContain('do');
  });
});

describe('tokensOf', () => {
  it('keeps accented letters inside words', () => {
    expect(tokensOf('The café is open.')).toEqual(['The', 'café', 'is', 'open']);
  });
});

describe('sentencesOf', () => {
  it('splits on sentence ends and paragraphs', () => {
    expect(sentencesOf('Hi. How are you?\n\nFine!')).toEqual(['Hi.', 'How are you?', 'Fine!']);
  });
});

describe('checkCourse', () => {
  it('reports a key word missing from the text', () => {
    expect(messages(text({ words: { fridge: { english: 'холодильник' } } }))).toMatch(/"fridge" is not in the text/);
  });

  it('accepts key words that appear in the text', () => {
    expect(messages(text({}))).not.toMatch(/is not in the text/);
  });

  it('asks for multi-word keys to move to expressions', () => {
    expect(messages(text({ words: { 'get up': { english: 'вставать' } } }))).toMatch(/put it in expressions/);
  });

  it('flags unknown words in coverage', () => {
    const msg = messages(text({ content: 'This is my flatmate.\n\nHe is in the garden.' }));
    expect(msg).toMatch(/Unknown: .*garden/);
  });

  it('treats names as neither known nor unknown', () => {
    const { coverage } = checkCourse([[text({ content: 'Lena is my flatmate.\n\nLena is in the kitchen.' })]], lists);
    expect(coverage['a1m1-1'].unknown).not.toContain('lena');
  });

  it("treats a name's possessive form as a name", () => {
    const q = { question: "Is it Lena's?", questionTranslation: 'Это Ленино?', options: ['Yes', 'No', 'Here'], correctIndex: 0 };
    expect(messages(text({ content: 'Lena is my flatmate.\n\nLena is in the kitchen.', comprehensionQuestions: [q] }))).not.toMatch(/lena's/);
  });

  it('flags a correct answer copied from the text', () => {
    const q = { question: 'Where is he?', questionTranslation: 'Где он?', options: ['In the room', 'in the kitchen', 'Here'], correctIndex: 1 };
    expect(messages(text({ comprehensionQuestions: [q] }))).toMatch(/copied from the text/);
  });

  it('flags question words the learner has not met yet', () => {
    const q = { question: 'Where is the garden?', questionTranslation: 'Где сад?', options: ['Here', 'In the room', 'Not here'], correctIndex: 0 };
    expect(messages(text({ comprehensionQuestions: [q] }))).toMatch(/question 1 uses words not taught yet: .*garden/);
  });

  it('requires Russian question translations at A1', () => {
    const q = { question: 'Who is he?', options: ['A', 'B', 'C'], correctIndex: 0 };
    expect(messages(text({ comprehensionQuestions: [q] }))).toMatch(/questionTranslation/);
  });

  it('flags American spelling', () => {
    expect(messages(text({ content: 'This is my flatmate.\n\nHe is in the apartment.' }))).toMatch(/American spelling.*apartment/);
  });

  it("doesn't reduce list headwords to shorter words (bed is not be + -ed)", () => {
    const withBed: WordLists = { ...lists, a1: [...lists.a1, { word: 'bed', pos: 'noun', ru: 'кровать', topic: 'home' }] };
    const { coverage } = checkCourse([[text({ content: 'This is my flatmate.\n\nHe is in the bed.' })]], withBed);
    expect(coverage['a1m1-1'].unknown).toContain('bed');
  });

  it("doesn't treat I'm as a name", () => {
    const { coverage } = checkCourse([[text({ content: "I'm in the kitchen.\n\nThis is my flatmate." })]], lists);
    expect(coverage['a1m1-1'].known).toBe(1 - 2 / 8);
  });

  it('counts a repeated key word as unknown only once', () => {
    const { coverage } = checkCourse([[text({ content: 'This is my flatmate. My flatmate is here.\n\nHe is in the kitchen.' })]], lists);
    // 13 words: flatmate (first) and kitchen are key; the second flatmate counts as known
    expect(coverage['a1m1-1'].known).toBeCloseTo(11 / 13);
  });

  it('flags a word taught twice', () => {
    const second = text({ id: 'a1m1-2', words: { flatmates: { english: 'соседи' } }, content: 'My flatmates are here.\n\nThe kitchen is small.' });
    const errors = checkCourse([[text({}), second]], lists).errors.map(e => e.message).join('\n');
    expect(errors).toMatch(/"flatmates" was already taught in a1m1-1/);
  });

  it('counts recycled words from earlier episodes', () => {
    const second = text({ id: 'a1m1-2', words: { fridge: { english: 'холодильник' } }, content: 'The fridge is big.\n\nIt is very small.' });
    const errors = checkCourse([[text({}), second]], lists).errors.map(e => e.message).join('\n');
    expect(errors).toMatch(/reuses 0 key items from the previous two episodes; need 2/);
  });
});
