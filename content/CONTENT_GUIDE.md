# English Flow — Content Guide

The rulebook for every reading text in English Flow. Every writer (human or AI)
follows it; every reviewer checks against it. What to write lives in
[CURRICULUM.md](CURRICULUM.md); this file says how to write it.

The rules are based on what research on second-language learning shows works.
The reason for a rule is given in *italics* where it isn't obvious, so it can
be applied with judgement, not just mechanically.

---

## 1. The learner

- **Native language:** Russian. All translations are into Russian.
- **Target:** British English, A1 → B1.
- **Who:** self-learners of any age who don't want to pay for a tutor and want
  everything in one app. Goals vary: work, travel, moving abroad, films and
  the internet, general self-improvement.
- **Session:** 10–20 minutes a day, usually on a phone. One text should take
  2–6 minutes to read.

## 2. How a text is used in the app

Knowing this makes the rules below make sense.

1. The learner reads the text. **Key words** (the `words` field) are
   highlighted; tapping one shows the pre-written Russian translation
   instantly, with no internet request and no AI cost.
2. Tapping any *other* word or phrase asks the AI to translate it. That costs
   money and needs a connection, so a good text rarely makes the learner do this.
3. The learner can add key words to their flashcard deck, which brings them
   back over the following days and weeks (spaced repetition).
4. They answer the comprehension questions, then do exercises built from the
   same text (gap-fill, sentence builder, retelling).

## 3. Field glossary

Each text is one object in the module's file. What every field means:

| Field | What it is | Example |
|---|---|---|
| `id` | Unique ID: `<level>m<module>-<episode>`, level in lowercase | `'a1m1-3'` |
| `title` | Episode title in English, 2–6 words | `'The Missing Yoghurt'` |
| `titleTranslation` | That title in natural Russian, shown under the English title | `'Пропавший йогурт'` |
| `level` | `'A1'`, `'A2'` or `'B1'` | `'A1'` |
| `module` / `moduleTitle` | Module ID and display name, set once at the top of the file as `M` and `MT` | `'a1-flatmates'`, `'New Flatmates'` |
| `content` | The text itself. Paragraphs are separated by a blank line (`\n\n`) | |
| `words` | **The key words of this text**: the new words the learner should study, each with its Russian translation. The key is the word or phrase *exactly as it appears in the text* (that's what gets highlighted). The translation goes in a field that is, for historical reasons, called `english` | `flatmate: { english: 'сосед по квартире' }` |
| `words[…].example` / `exampleTranslation` | Optional: one more short example sentence and its Russian translation, used on the flashcard | |
| `expressions` | **Fixed expressions**: multi-word chunks whose words stand **next to each other** in the text, highlighted **green**. The key is the phrase exactly as it appears, lowercase; the value has `english` (the Russian translation) | `'by the way': { english: 'кстати' }` |
| `splitExpressions` | **Split expressions**: two words that belong together but are **separated** in the sentence, highlighted green when they appear in the same sentence. Mainly phrasal verbs with an object in the middle. `word1` and `word2` are the two words as they appear (lowercase), `display` is what the popup shows, `english` is the Russian translation | `{ word1: 'turn', word2: 'off', display: 'turn … off', english: 'выключать' }` for "turn it off" |
| `comprehensionQuestions` | 3 questions. Each has `question`, `options` (3 strings) and `correctIndex`: the position of the correct option, counting from 0 | `correctIndex: 2` = third option |
| `questionTranslation` | A1 only: the question in Russian *(new field, see §14)* | |
| `grammarNote` | 1–3 sentence grammar spotlight in Russian *(new field, see §8)* | |
| `completed` | Always `false` | |

## 4. Tone: young and casual

- Texts sound like real people in their 20s–30s: chats, plans, small dramas,
  jokes. Never like a textbook ("Mr Smith is a teacher. He has a red pen.").
- Humour, mild tension, and a small hook at the end of each text.
  *Curiosity and emotion improve attention and memory, and a learner who wants
  the next episode comes back tomorrow. Daily return is what makes learning work.*
- Casual British English grows with the level, **but only useful casual
  English**: words people really hear every day.
  - **A1:** neutral, friendly. No slang.
  - **A2:** a few very common informal words (*mate, cheers, fancy a…?, loo,
    sorted*). Each one counts as a key word.
  - **B1:** natural spoken English, phrasal verbs, light idioms. Texting
    abbreviations (*tbh, omw*) only inside message scenes, at most 2 per text,
    and **never** as key words. *They're easy to look up and have little learning value.*
- **Vary the wording.** Don't lean on filler words (*OK, very, nice, good, so*) or
  repeat the same sentence pattern; each module should sound richer than the
  last as the grammar grows. *(Owner's feedback on the pilot.)*
- **Never:** swearing, sexual content, politics, religion, alcohol as a main
  topic, mocking any nationality. Characters come from many countries; Russian-
  speaking characters appear regularly and are written with respect, without clichés.

## 5. Story per module

- Each module is one mini-series of 8 episodes with its own characters,
  setting and plot (see the curriculum).
- **Episode 1** introduces at most 3 named characters and the setting, and is
  the easiest text of the module. *Every new name adds memory load at the exact
  moment the learner is also meeting new words and grammar.*
- **Episodes 2–7** develop a problem, each ending with a hook.
- **Episode 8** resolves the story **and deliberately reuses at least 10 of the
  module's key words**. *Meeting words again in a new context is how they
  stick, so the finale doubles as a review.*
- Each episode makes sense on its own, because a learner may skip one.
- Names, ages, jobs and facts stay consistent. The character sheet in
  CURRICULUM.md is the source of truth.

## 6. Level rules

| | A1 | A2 | B1 |
|---|---|---|---|
| Text length | see the A1 ramp below | 150–250 words | 250–400 words |
| Average sentence | ≤ 10 words | ≤ 14 words | ≤ 20 words |
| Key words per text | 4–6 | 6–8 | 7–9 |
| Paragraphs | 2–4 | 3–5 | 4–7 |
| Dialogue | short lines | allowed freely | allowed freely, incl. text messages |

**A1 ramp**, because a real beginner knows almost nothing on day one:
- A1-1: 40–80 words, sentences ≤ 7 words.
- A1-2: 60–100 words.
- A1-3 to A1-5: 80–150 words.

### The coverage rule

Two numbers, both checked automatically:

1. **Known without any help: at least 90% at A1, 93% at A2, 95% at B1.** Key
   words count as unknown here. That's why there are so few key words per text.
   A1 is lower only because its texts are so short that a few key words are
   already a large share.
2. **At least 98% are known or key words.** In other words, words that are
   neither known nor glossed (the ones a learner would have to tap and ask the
   AI about) are at most 2 in every 100.

*Research on reading finds that below about 95% coverage readers stop
following the meaning and start decoding, and that around 98% is needed for
comfortable reading. Glossed key words help bridge the gap, which is why less
than 98% without help is acceptable as long as nearly everything else is known.
The computed numbers are optimistic (a learner has forgotten some "known" words),
so each level is set as high as its text length allows.*

"Known" has a precise meaning, so it can be checked:
- the **starter list**: function words, pronouns, numbers, days and the ~150
  most common words, plus international words like *taxi, pizza, internet*;
- every key word taught in **earlier** texts;
- the **level word lists** of **earlier** levels.

Names of people and places don't count. If a word is unknown and not
essential, replace it. If it's essential, make it a key word within the limit;
if that's not possible, simplify the sentence.

## 7. Vocabulary

### Choosing key words
- **At least 70% of key words come from the level word list**: the A1/A2/B1
  lists, which are also the app's flashcard sets. The rest are words the
  topic really needs. *Frequent words give the most return: a learner who
  knows the 2,000 most common words understands most everyday English. Rare
  topic words are taught only when the story needs them.*
- Prefer **useful chunks** over single words where that's how English is
  really used: *get up, look for, by the way, it's up to you, I'm not sure,
  make a decision*. *Fluent speakers store and retrieve whole phrases;
  learning chunks speeds up both understanding and speaking.*
- **Where chunks go:**
  - Single words → `words` (accent colour).
  - Chunks whose words stand together in the text → `expressions` (green).
  - Phrasal verbs or chunks split by another word (*turn **it** off*,
    *pick **Lena** up*) → `splitExpressions` (green).
  - Never list the same chunk in two fields.
- **Budget:** `words` + `expressions` + `splitExpressions` together stay within
  the key-word limit in §6. Aim for **at least 1 expression per text at A1 and
  2–3 at A2–B1**.
- **Words everyone already knows** (*OK, TV, pizza, taxi, internet*: the
  international words in the starter list) are never key items. Use them freely
  in texts: familiar words lower the reading load, especially at A1.
- Key-item slots are for **new vocabulary**. Grammar chunks made only of known
  words (*there is, have got*) are practised through the grammar focus and
  `grammarNote`, not taught as key items.
- Never repeat a headword as a key word across the course. If a word was
  already taught, recycle it instead.

### Recycling (spaced encounters)

*A word usually needs many encounters spread over time, often 8–12, before
it's really learned. One appearance is almost useless.*

- Every key word must appear again in **at least 3 later texts**: at least once
  in the same module and at least once in a later module.
- Each text reuses **at least 3 key words from the previous two episodes**.
- Each module reuses **at least 8 key words from earlier modules**.
- Recycled words appear in a slightly different form or context when possible
  (*flatmate → my flatmates*, *look for my keys → look for a job*).

## 8. Grammar

- Each module has a **grammar focus** (see the curriculum). Every episode uses
  it naturally **at least 4 times**. *Learners notice a structure when they see
  it several times within a short span.*
- Each episode also reuses grammar from the **previous two modules** at least
  twice (each module's "Review" line). *Grammar, like vocabulary, is forgotten
  unless it comes back.*
- No grammar from later modules, except fixed chunks a learner can memorise as
  a whole (*Would you like…?*, *I'd love to*, *I've got*).
- **Grammar spotlight (`grammarNote`):** each episode has a 1–3 sentence note
  **in Russian** that points at one sentence from the text and explains it,
  **comparing with Russian where they differ**. For example:
  > «*I've lost my keys* — Present Perfect: важен результат сейчас (ключей нет).
  > По-русски просто «я потерял», а в английском время выбирают по смыслу.»

  *Adults learn grammar faster with short explicit explanations than from
  exposure alone, and most errors of Russian speakers come from carrying
  Russian patterns over. Pointing at the difference prevents that.*

## 9. Russian-speaker traps

Texts give learners many correct examples of what Russian speakers typically
get wrong. Each module lists which traps to target, and each episode includes
at least one of them, used correctly and naturally.

1. **Articles:** *a / the / no article*. The biggest one; appears everywhere.
2. **Present perfect vs past simple:** *I've lost my keys* vs *I lost them yesterday*.
3. **Questions need an auxiliary:** *Do you like…?*, not *You like…?*
4. **Uncountable nouns:** *advice, information, news, furniture, homework*. No plural, no *a*.
5. **Agree is a verb:** *I agree*, not *I am agree*.
6. **No future after when/if:** *When I get home…*, not *When I will get home*.
7. **make vs do, say vs tell, borrow vs lend, win vs earn.**
8. **Prepositions:** *arrive in/at*, *depend on*, *at the weekend* (British), *listen to*.
9. **False friends:** *magazine, fabric, sympathetic, accurate, actual, decade, artist*.
10. **people / police are plural; news is singular.**

## 10. Comprehension questions

- Exactly **3 questions** per text, each with **3 options**, one correct.
- The questions follow the order of the text.
- **Questions test understanding, not copying.** The correct option is never a
  phrase copied from the text; it's a paraphrase. *Copy-matching can be done
  without understanding anything.*
- At least one question per text is about **why** something happened or **how
  someone feels**. *Inference questions make the learner process the meaning,
  which improves both comprehension and memory.*
- Wrong options are believable (mentioned in the text, or a likely
  misunderstanding), never silly.
- The correct answer's position varies: across a module, each of 0, 1 and 2 is
  correct roughly a third of the time.
- Questions use only known words and the text's key words (the checker enforces this).
- **Language:** simple English at all levels. At A1, each question also has a
  Russian translation (`questionTranslation`).

## 11. Translations (Russian)

All translations are written in advance and stored in the app.
*They're instant and free, and they don't depend on an AI call.*

- Translate the meaning **in this context**, not the dictionary's first entry.
  *fancy* in "Fancy a coffee?" → «хочешь…?», not «воображать».
- Give 1–2 Russian equivalents separated by " / " when that helps.
- Verbs: Russian infinitive (*borrow* → «одалживать / брать на время»).
- Chunks and phrasal verbs are translated as a whole.
- `titleTranslation` is a natural Russian title, not word-for-word.

## 12. Writing for listening

Texts are also read aloud by a British voice in the app.
- Avoid long noun chains and brackets; write the way people speak.
- Write numbers, times and prices the way people say them (*half past six, £4.50*).

## 13. Data format

Each module is one file `src/data/english/module-<level>-<n>-<slug>.ts` (e.g.
`module-a1-1-flatmates.ts`), added in course order to `englishModules` in
`src/data/english/index.ts`. It exports a
`ReadingText[]`, in the same shape the app already uses:

```ts
import { ReadingText } from '@/types/dutch';

const M = 'a1-flatmates' as const;
const MT = 'New Flatmates';

export const moduleA1_1Texts: ReadingText[] = [
  {
    id: 'a1m1-1',
    title: 'The Wrong Door',
    titleTranslation: 'Не та дверь',
    level: 'A1', module: M, moduleTitle: MT,
    content: 'Paragraph one.\n\nParagraph two.',
    words: {
      flatmate: { english: 'сосед по квартире' },   // `english` holds the Russian translation
      fridge:   { english: 'холодильник' },
    },
    expressions: {
      'get up': { english: 'вставать' },
    },
    splitExpressions: [
      { word1: 'turn', word2: 'off', display: 'turn … off', english: 'выключать' },
    ],
    comprehensionQuestions: [
      { question: 'Why is Lena late?', options: ['…', '…', '…'], correctIndex: 2 },
    ],
    completed: false,
  },
];
```

## 14. Code changes needed before mass production

These are app changes, not writing tasks; they're listed so writers know the
new fields are coming.
- Add `questionTranslation` (A1) and `grammarNote` to `ReadingText`, and show them in the app.
- Add `expressions` and `splitExpressions` to `ReadingText` and have the reader
  use them. In the Dutch app these live in `src/data/vocabulary.ts`, keyed by
  text ID, and **override the text's own `words`**. Those Dutch maps must be
  emptied, or Dutch words would appear on English texts whose IDs match
  (e.g. `b1m1-1`).
- Point the AI word translation at Russian. It currently asks for "simple
  language", and the fallback translator is set to Dutch → English.
- Replace the module list, word lists and grammar tags, which are still the Dutch content.
- Build the automatic checker for §6–§10: word counts, coverage, recycling,
  answer positions, field shapes.

## 15. Review checklist

The reviewer checks every item and sends back specific fixes.

Run the automatic checker first: `npx vitest run src/test/content.test.ts`.
It covers the measurable items; tone, grammar focus, naturalness and
translation quality still need the reviewer.

- [ ] Length, sentence length and key-word count are within the level limits.
- [ ] Coverage: known without help ≥ 90% (A1) / 93% (A2) / 95% (B1), and ≥ 98% known or key words (checker result).
- [ ] At least 70% of key words come from the level word list; no headword taught before.
- [ ] Every key word and expression appears in the text exactly as written; split expressions have both words in one sentence.
- [ ] Recycling: at least 3 words from the previous two episodes; module totals met.
- [ ] Grammar focus used at least 4 times; review grammar used; nothing from later modules.
- [ ] `grammarNote` points at a real sentence from the text and compares with Russian.
- [ ] At least one target trap appears correctly.
- [ ] Characters and facts are consistent with the character sheet.
- [ ] 3 questions, 3 options, paraphrased answers, at least one *why/feel* question.
- [ ] Russian translations are correct for this context.
- [ ] British spelling and vocabulary (*colour, flat, mum, autumn, queue*).
- [ ] Ends with a hook; episode 8 resolves and reuses at least 10 module key words.
- [ ] Would a 25-year-old actually want to read this? If not, rewrite.
