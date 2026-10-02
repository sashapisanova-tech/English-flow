// Prepared English → Russian dictionary built from the course word lists
// (content/wordlists). Tapping a word looks it up here first: instant, free and
// offline. Only words that aren't in the lists fall back to the AI.

import starter from '../../content/wordlists/starter.json';
import a1 from '../../content/wordlists/a1.json';
import a2 from '../../content/wordlists/a2.json';
import b1 from '../../content/wordlists/b1.json';
import { candidates, type WordListEntry } from '@/lib/contentCheck';

export interface DictionaryHit {
  /** Russian translation. */
  translation: string;
  /** Base form when it differs from the tapped word (went → go). */
  base?: string;
}

// Contractions aren't list headwords; translate them with their full form
const CONTRACTIONS: Record<string, string> = {
  "i'm": 'я (= I am)', "you're": 'ты / вы (= you are)', "he's": 'он (= he is / he has)',
  "she's": 'она (= she is / she has)', "it's": 'это (= it is)', "we're": 'мы (= we are)',
  "they're": 'они (= they are)', "that's": 'это (= that is)', "there's": 'есть, имеется (= there is)',
  "what's": 'что (= what is)', "who's": 'кто (= who is)', "where's": 'где (= where is)',
  "let's": 'давай(те) (= let us)', "i've": 'я / у меня (= I have)', "you've": 'ты / вы (= you have)',
  "we've": 'мы / у нас (= we have)', "they've": 'они / у них (= they have)',
  "i'll": 'я (буду) (= I will)', "you'll": 'ты (будешь) (= you will)', "he'll": 'он (будет) (= he will)',
  "she'll": 'она (будет) (= she will)', "we'll": 'мы (будем) (= we will)', "they'll": 'они (будут) (= they will)',
  "i'd": 'я бы (= I would / I had)', "you'd": 'ты бы (= you would / you had)',
  "don't": 'не (= do not)', "doesn't": 'не (= does not)', "didn't": 'не (в прошлом) (= did not)',
  "isn't": 'не (= is not)', "aren't": 'не (= are not)', "wasn't": 'не был(а) (= was not)',
  "weren't": 'не были (= were not)', "haven't": 'не (= have not)', "hasn't": 'не (= has not)',
  "can't": 'не могу / нельзя (= cannot)', "couldn't": 'не мог(ла) (= could not)',
  "won't": 'не буду (= will not)', "wouldn't": 'не стал(а) бы (= would not)',
  "shouldn't": 'не следует (= should not)', "mustn't": 'нельзя (= must not)',
  // Interjections common in dialogue
  oh: 'о!, ах!', wow: 'ух ты!', hmm: 'хм', ha: 'ха', oops: 'ой', ouch: 'ай!',
};

const entries = new Map<string, WordListEntry>();
const irregular = new Map<string, string>();
for (const list of [starter, a1, a2, b1] as WordListEntry[][]) {
  for (const e of list) {
    const w = e.word.toLowerCase();
    if (!entries.has(w)) entries.set(w, e);
    for (const form of [e.past, e.pp, e.plural]) {
      if (form) form.toLowerCase().split(/\s*\/\s*/).forEach(f => { if (!irregular.has(f)) irregular.set(f, w); });
    }
  }
}

/** Looks up a word or phrase; returns null when it isn't in the prepared lists. */
export function lookupWord(text: string): DictionaryHit | null {
  const w = text.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/^[^a-zà-ÿ']+|[^a-zà-ÿ']+$/g, '');
  if (!w) return null;
  if (CONTRACTIONS[w]) return { translation: CONTRACTIONS[w] };
  const exact = entries.get(w);
  if (exact) return { translation: exact.ru };
  // Inflected forms: flatmates → flatmate, went → go, cities → city
  for (const c of candidates(w, irregular)) {
    const e = entries.get(c);
    if (e) return { translation: e.ru, base: e.word };
  }
  return null;
}
