// Automatic checks for English Flow reading content, implementing the measurable
// rules of content/CONTENT_GUIDE.md (§6 level rules, §7 vocabulary, §10 questions).
// Things only a human or reviewer can judge (tone, grammar focus, naturalness) are not here.

import type { ReadingText } from '@/types/dutch';

export interface WordListEntry {
  word: string;
  pos: string;
  ru: string;
  topic: string;
  past?: string;
  pp?: string;
  plural?: string;
}

export interface WordLists {
  starter: WordListEntry[];
  a1: WordListEntry[];
  a2: WordListEntry[];
  b1: WordListEntry[];
}

export interface Issue {
  textId: string;
  message: string;
}

export interface CheckResult {
  errors: Issue[];
  warnings: Issue[];
  /** Per-text coverage numbers, for reports. */
  coverage: Record<string, { known: number; knownOrKey: number; unknown: string[] }>;
}

type LevelKey = 'a1' | 'a2' | 'b1';

const LEVEL_RULES: Record<LevelKey, { words: [number, number]; avgSentence: number; keys: [number, number]; paragraphs: [number, number] }> = {
  a1: { words: [80, 150], avgSentence: 10, keys: [4, 6], paragraphs: [2, 4] },
  a2: { words: [150, 250], avgSentence: 14, keys: [6, 8], paragraphs: [3, 5] },
  b1: { words: [250, 400], avgSentence: 20, keys: [7, 9], paragraphs: [4, 7] },
};

// A1 ramp (guide §6): absolute beginners start with much shorter texts
const A1_RAMP: Record<number, { words: [number, number]; avgSentence: number }> = {
  1: { words: [40, 80], avgSentence: 7 },
  2: { words: [60, 100], avgSentence: 10 },
};

const MIN_KNOWN = 0.9;
const MIN_KNOWN_OR_KEY = 0.98;
const MIN_FROM_LEVEL_LIST = 0.7;

const AMERICAN_SPELLINGS = [
  'color', 'colors', 'favorite', 'favorites', 'favor', 'center', 'centers', 'theater',
  'apartment', 'apartments', 'mom', 'vacation', 'elevator', 'cookie', 'cookies', 'candy',
  'sidewalk', 'gotten', 'neighbor', 'neighbors', 'traveled', 'traveling', 'canceled',
  'gray', 'program', 'catalog', 'math', 'soccer', 'trash', 'garbage', 'truck', 'faucet',
];

const CYRILLIC = /[а-яё]/i;

// ── Tokenising and lemmatising ────────────────────────────────────────────────

function normaliseApostrophes(s: string): string {
  return s.replace(/[’‘]/g, "'");
}

export function sentencesOf(content: string): string[] {
  return normaliseApostrophes(content)
    .split(/\n\s*\n/)
    .flatMap(p => p.match(/[^.!?…]+[.!?…]*["”»)]*/g) ?? [])
    .map(s => s.trim())
    .filter(s => /[A-Za-z0-9]/.test(s));
}

export function tokensOf(sentence: string): string[] {
  return sentence.match(/[A-Za-z]+(?:'[A-Za-z]+)?(?:-[A-Za-z]+)*|\d+(?:[.,:]\d+)*/g) ?? [];
}

const CONTRACTIONS: Record<string, string[]> = {
  "won't": ['will', 'not'], "can't": ['can', 'not'], "shan't": ['shall', 'not'],
  "let's": ['let', 'us'],
};

/** All plausible base forms of a lowercase word, most specific first. */
export function candidates(word: string, irregular: Map<string, string>): string[] {
  const w = normaliseApostrophes(word.toLowerCase());
  const out = new Set<string>([w]);
  const add = (s: string) => { if (s.length > 1) out.add(s); };

  if (CONTRACTIONS[w]) CONTRACTIONS[w].forEach(add);
  const apos = w.match(/^([a-z]+)'(s|m|re|ve|ll|d|t)$/);
  if (apos) {
    const base = apos[1];
    if (apos[2] === 't' && base.endsWith('n')) add(base.slice(0, -1)); // don't → do, isn't → is
    else add(base);
  }

  const irr = irregular.get(w);
  if (irr) add(irr);

  const strip = (suffix: string) => (w.endsWith(suffix) ? w.slice(0, -suffix.length) : null);
  const doubled = (stem: string) => (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2] ? stem.slice(0, -1) : null);

  for (const [suffix, replacements] of [
    ['ies', ['y']], ['ves', ['f', 'fe']], ['es', ['']], ['s', ['']],
    ['ied', ['y']], ['ed', ['', 'e']],
    ['ying', ['ie', 'y']], ['ing', ['', 'e']],
    ['iest', ['y']], ['est', ['', 'e']], ['ier', ['y']], ['er', ['', 'e']],
    ['ily', ['y']], ['ly', ['', 'le']],
  ] as [string, string[]][]) {
    const stem = strip(suffix);
    if (stem === null) continue;
    replacements.forEach(r => add(stem + r));
    const d = doubled(stem);
    if (d) add(d);
  }
  return [...out];
}

// ── Course model ─────────────────────────────────────────────────────────────

interface ParsedId { level: LevelKey; module: number; episode: number }

function parseId(id: string): ParsedId | null {
  const m = id.match(/^(a1|a2|b1)m(\d+)-(\d+)$/);
  return m ? { level: m[1] as LevelKey, module: Number(m[2]), episode: Number(m[3]) } : null;
}

/** Key items of a text as lowercase strings: single words, expressions, split pairs. */
function keyItems(t: ReadingText) {
  const words = Object.keys(t.words ?? {}).map(k => k.toLowerCase());
  const expressions = Object.keys(t.expressions ?? {}).map(k => k.toLowerCase());
  const splits = (t.splitExpressions ?? []).map(s => `${s.word1.toLowerCase()} ${s.word2.toLowerCase()}`);
  return { words, expressions, splits, all: [...words, ...expressions, ...splits] };
}

export function checkCourse(modules: ReadingText[][], lists: WordLists): CheckResult {
  const errors: Issue[] = [];
  const warnings: Issue[] = [];
  const coverage: CheckResult['coverage'] = {};
  const err = (textId: string, message: string) => errors.push({ textId, message });
  const warn = (textId: string, message: string) => warnings.push({ textId, message });

  // Irregular forms → base, from all lists
  const irregular = new Map<string, string>();
  const allListWords = new Set<string>();
  const levelWords: Record<'starter' | LevelKey, Set<string>> = { starter: new Set(), a1: new Set(), a2: new Set(), b1: new Set() };
  (Object.keys(levelWords) as ('starter' | LevelKey)[]).forEach(level => {
    for (const e of lists[level]) {
      const w = e.word.toLowerCase();
      levelWords[level].add(w);
      allListWords.add(w);
      for (const form of [e.past, e.pp, e.plural]) {
        if (form) form.toLowerCase().split(/\s*\/\s*/).forEach(f => irregular.set(f, w));
      }
    }
  });

  /** Canonical form used for comparing words: the first candidate found in any word list. */
  const canon = (w: string) => candidates(w, irregular).find(c => allListWords.has(c)) ?? w.toLowerCase();

  const known = new Set<string>();
  const addKnown = (item: string) => {
    item.toLowerCase().split(/\s+/).forEach(part => candidates(part, irregular).forEach(c => known.add(c)));
  };
  const isKnown = (token: string) => /^\d/.test(token) || candidates(token, irregular).some(c => known.has(c));

  lists.starter.forEach(e => addKnown(e.word));
  let knownLevel: LevelKey | null = null;
  const levelOrder: LevelKey[] = ['a1', 'a2', 'b1'];

  const seenIds = new Set<string>();
  const taughtKeys = new Map<string, string>(); // canonical key → text ID where taught
  const allTexts = modules.flat();
  const textIndex = new Map(allTexts.map((t, i) => [t.id, i]));
  const textLemmas = allTexts.map(t => {
    const set = new Set<string>();
    sentencesOf(t.content).forEach(s => tokensOf(s).forEach(tok => set.add(canon(tok))));
    return set;
  });
  const keyPresent = (key: string, textIdx: number) =>
    key.includes(' ')
      ? key.split(' ').every(part => textLemmas[textIdx].has(canon(part)))
      : textLemmas[textIdx].has(canon(key));

  modules.forEach((texts, mi) => {
    const moduleKeys: string[] = [];
    const answerPositions: number[] = [];
    const moduleId = texts[0]?.module ?? `module #${mi + 1}`;

    // Names: capitalised words that are never lowercase in the module and are in no word list
    const lowerSeen = new Set<string>();
    const capSeen = new Set<string>();
    texts.forEach(t => sentencesOf(t.content).forEach(s => tokensOf(s).forEach(tok => {
      if (/^[A-Z]/.test(tok)) capSeen.add(tok.toLowerCase()); else lowerSeen.add(tok.toLowerCase());
    })));
    const names = new Set([...capSeen].filter(w => !lowerSeen.has(w) && !allListWords.has(canon(w))));

    texts.forEach((t, ei) => {
      const id = t.id;
      const parsed = parseId(id);
      if (!parsed) { err(id, `ID must look like a1m1-1 (level, module, episode)`); return; }
      if (seenIds.has(id)) err(id, 'duplicate ID');
      seenIds.add(id);
      if (t.level.toLowerCase() !== parsed.level) err(id, `level ${t.level} doesn't match ID`);
      if (parsed.episode !== ei + 1) err(id, `episode number in ID should be ${ei + 1}`);
      if (t.module !== moduleId) err(id, `module should be ${moduleId} like the rest of the file`);
      if (!t.moduleTitle) err(id, 'moduleTitle missing');
      if (t.completed !== false) err(id, 'completed must be false');
      if (!CYRILLIC.test(t.titleTranslation ?? '')) err(id, 'titleTranslation must be Russian');

      // Words of lower levels become known when a new level starts
      if (knownLevel !== parsed.level) {
        levelOrder.slice(0, levelOrder.indexOf(parsed.level)).forEach(l => lists[l].forEach(e => addKnown(e.word)));
        knownLevel = parsed.level;
      }

      // ── Level rules ──
      const rules = { ...LEVEL_RULES[parsed.level], ...(parsed.level === 'a1' ? A1_RAMP[parsed.module] : {}) };
      const sentences = sentencesOf(t.content);
      const tokens = sentences.flatMap(tokensOf);
      const wordCount = tokens.length;
      if (wordCount < rules.words[0] || wordCount > rules.words[1]) err(id, `${wordCount} words; must be ${rules.words[0]}–${rules.words[1]}`);
      const avg = wordCount / Math.max(1, sentences.length);
      if (avg > rules.avgSentence) err(id, `average sentence is ${avg.toFixed(1)} words; max ${rules.avgSentence}`);
      const paragraphs = t.content.split(/\n\s*\n/).filter(p => p.trim()).length;
      if (paragraphs < rules.paragraphs[0] || paragraphs > rules.paragraphs[1]) err(id, `${paragraphs} paragraphs; must be ${rules.paragraphs[0]}–${rules.paragraphs[1]}`);

      // ── Key items ──
      const keys = keyItems(t);
      if (keys.all.length < rules.keys[0] || keys.all.length > rules.keys[1]) err(id, `${keys.all.length} key items (words + expressions); must be ${rules.keys[0]}–${rules.keys[1]}`);
      const minExpr = parsed.level === 'a1' ? 1 : 2;
      if (keys.expressions.length + keys.splits.length < minExpr) err(id, `needs at least ${minExpr} expression(s)`);

      const lowerTokens = tokens.map(tok => tok.toLowerCase());
      for (const w of keys.words) {
        if (w.includes(' ')) err(id, `"${w}" has several words; put it in expressions`);
        else if (!lowerTokens.includes(w)) err(id, `key word "${w}" is not in the text exactly as written`);
      }
      const joined = ` ${lowerTokens.join(' ')} `;
      for (const e of keys.expressions) {
        if (!joined.includes(` ${tokensOf(e).map(x => x.toLowerCase()).join(' ')} `)) err(id, `expression "${e}" is not in the text with its words together`);
      }
      for (const s of t.splitExpressions ?? []) {
        const together = sentences.some(sen => {
          const st = tokensOf(sen).map(x => x.toLowerCase());
          return st.includes(s.word1.toLowerCase()) && st.includes(s.word2.toLowerCase());
        });
        if (!together) err(id, `split expression "${s.word1} … ${s.word2}" needs both words in one sentence`);
      }
      const translations = [
        ...Object.entries(t.words ?? {}).map(([k, v]) => [k, v.english] as const),
        ...Object.entries(t.expressions ?? {}).map(([k, v]) => [k, v.english] as const),
        ...(t.splitExpressions ?? []).map(s => [`${s.word1} … ${s.word2}`, s.english] as const),
      ];
      for (const [k, tr] of translations) if (!CYRILLIC.test(tr ?? '')) err(id, `translation of "${k}" must be Russian`);

      // Taught only once in the course
      for (const k of keys.all) {
        const c = k.includes(' ') ? k : canon(k);
        const before = taughtKeys.get(c);
        if (before) err(id, `"${k}" was already taught in ${before}; recycle it instead`);
      }

      // ≥70% from this level's list (phrases match whole, words by base form)
      const inLevelList = keys.all.filter(k => levelWords[parsed.level].has(k) || levelWords[parsed.level].has(canon(k))).length;
      if (keys.all.length && inLevelList / keys.all.length < MIN_FROM_LEVEL_LIST) {
        err(id, `only ${inLevelList}/${keys.all.length} key items are in the ${parsed.level.toUpperCase()} word list; need ${Math.ceil(MIN_FROM_LEVEL_LIST * keys.all.length)}`);
      }

      // ── Coverage ──
      const keyParts = new Set<string>();
      keys.all.forEach(k => k.split(' ').forEach(p => candidates(p, irregular).forEach(c => keyParts.add(c))));
      let nKnown = 0, nKey = 0, counted = 0;
      const unknown: string[] = [];
      for (const tok of tokens) {
        if (names.has(tok.toLowerCase())) continue;
        counted++;
        if (isKnown(tok)) nKnown++;
        else if (candidates(tok, irregular).some(c => keyParts.has(c))) nKey++;
        else unknown.push(tok.toLowerCase());
      }
      const pk = nKnown / Math.max(1, counted);
      const pkk = (nKnown + nKey) / Math.max(1, counted);
      const unknownList = [...new Set(unknown)];
      coverage[id] = { known: pk, knownOrKey: pkk, unknown: unknownList };
      if (pk < MIN_KNOWN) err(id, `${(pk * 100).toFixed(1)}% known without help; need ${MIN_KNOWN * 100}%`);
      if (pkk < MIN_KNOWN_OR_KEY) err(id, `${(pkk * 100).toFixed(1)}% known or key; need ${MIN_KNOWN_OR_KEY * 100}%. Unknown: ${unknownList.join(', ')}`);

      // ── Recycling ──
      const idx = textIndex.get(id)!;
      if (ei >= 1) {
        const prevKeys = texts.slice(Math.max(0, ei - 2), ei).flatMap(p => keyItems(p).all);
        const reused = prevKeys.filter(k => keyPresent(k, idx)).length;
        const need = Math.min(3, prevKeys.length);
        if (reused < need) err(id, `reuses ${reused} key items from the previous two episodes; need ${need}`);
      }
      if (ei === 7) {
        const earlier = moduleKeys.filter(k => keyPresent(k, idx)).length;
        if (earlier < 10) err(id, `finale reuses ${earlier} module key items; need 10`);
      }

      // ── Questions ──
      const qs = t.comprehensionQuestions ?? [];
      if (qs.length !== 3) err(id, `${qs.length} questions; must be 3`);
      const lowerContent = normaliseApostrophes(t.content.toLowerCase());
      qs.forEach((q, qi) => {
        if (q.options.length !== 3) err(id, `question ${qi + 1} has ${q.options.length} options; must be 3`);
        if (!(q.correctIndex >= 0 && q.correctIndex < q.options.length)) err(id, `question ${qi + 1} correctIndex out of range`);
        else {
          answerPositions.push(q.correctIndex);
          const correct = normaliseApostrophes(q.options[q.correctIndex].toLowerCase()).replace(/[.!?]$/, '');
          if (correct.split(/\s+/).length >= 3 && lowerContent.includes(correct)) err(id, `question ${qi + 1}: correct answer is copied from the text; paraphrase it`);
        }
        if (parsed.level === 'a1' && !CYRILLIC.test(q.questionTranslation ?? '')) err(id, `question ${qi + 1} needs a Russian questionTranslation (A1)`);
      });

      if (!CYRILLIC.test(t.grammarNote ?? '')) err(id, 'grammarNote (in Russian) is missing');

      // ── British spelling ──
      const american = lowerTokens.filter(tok => AMERICAN_SPELLINGS.includes(tok));
      if (american.length) err(id, `American spelling/vocabulary: ${[...new Set(american)].join(', ')}`);

      // Everything in this text is known from the next text on
      keys.all.forEach(k => { taughtKeys.set(k.includes(' ') ? k : canon(k), id); addKnown(k); moduleKeys.push(k); });
    });

    // ── Module-level checks ──
    if (mi > 0) {
      const earlierKeys = modules.slice(0, mi).flat().flatMap(t => keyItems(t).all);
      const moduleIdx = texts.map(t => textIndex.get(t.id)!);
      const reused = earlierKeys.filter(k => moduleIdx.some(i => keyPresent(k, i))).length;
      if (reused < 8) err(String(moduleId), `module reuses ${reused} key items from earlier modules; need 8`);
    }
    if (texts.length === 8) {
      [0, 1, 2].forEach(pos => {
        const n = answerPositions.filter(p => p === pos).length;
        if (n < 5 || n > 11) err(String(moduleId), `correct answer is option ${pos + 1} in ${n} of ${answerPositions.length} questions; aim for about a third`);
      });
    } else {
      warn(String(moduleId), `module has ${texts.length} episodes; planned 8`);
    }
  });

  // ── Course-level: every key item should come back in at least 3 later texts ──
  allTexts.forEach((t, i) => {
    for (const k of keyItems(t).all) {
      const later = allTexts.slice(i + 1).filter((_, j) => keyPresent(k, i + 1 + j)).length;
      if (later < 3) warn(t.id, `"${k}" appears in ${later} later texts so far; target 3`);
    }
  });

  return { errors, warnings, coverage };
}

export function formatIssues(issues: Issue[]): string {
  return issues.map(i => `  ${i.textId}: ${i.message}`).join('\n');
}
