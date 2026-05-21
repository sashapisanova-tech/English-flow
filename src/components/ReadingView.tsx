import { useState, useMemo, useEffect, useRef } from 'react';
import { ReadingText } from '@/types/dutch';
import { WordPopover } from '@/components/WordPopover';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft, ArrowRight, Volume2, BookmarkPlus, Check,
  Mic, Loader2, Star, RotateCcw,
  CheckCircle, XCircle, Brain, ClipboardCheck,
  PenLine, Shuffle,
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { getKeywordsForText, getSeparableVerbsForText, getFixedExpressionsForText, getSplitExpressionsForText } from '@/data/vocabulary';
import type { SeparableVerbEntry, FixedExpressionEntry, SplitExpressionEntry } from '@/data/vocabulary';
import type { Level } from '@/types/dutch';
import { playDutch, stopDutch } from '@/utils/playDutch';

interface ReadingViewProps {
  text: ReadingText;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

interface PhrasePopup {
  text: string;
  x: number;
  anchorY: number;
  translation: string;
  translating: boolean;
}

// ─── Translation cache (AI-powered) ─────────────────────────────────────────
const translationCache: Record<string, string> = {};
async function fetchPhraseTranslation(phrase: string): Promise<string> {
  const key = phrase.toLowerCase();
  if (translationCache[key]) return translationCache[key];
  try {
    const apiKey = localStorage.getItem('dutch-app-anthropic-key') || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
    if (apiKey && apiKey !== 'your_api_key_here') {
      // Use Claude for contextual translation
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 60,
          system: 'You are a Dutch-to-English translator. Translate the given Dutch word or phrase into natural English within its context. Reply with ONLY the English translation, nothing else.',
          messages: [{ role: 'user', content: phrase }],
        }),
      });
      if (res.ok) {
        const data = await res.json() as { content: { text: string }[] };
        const t = data.content[0].text.trim();
        translationCache[key] = t;
        return t;
      }
    }
    // Fallback to MyMemory if no API key
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(phrase)}&langpair=nl|en`
    );
    const data = await res.json();
    const t = (data?.responseData?.translatedText as string) || '';
    translationCache[key] = t;
    return t;
  } catch { return ''; }
}

// ─── Level config ────────────────────────────────────────────────────────────

interface LevelConfig {
  maxOptions: number;   // choices per word-recall question
  maxQuestions: number; // max word-recall questions
  outlineStages: number;
  keyWordRange: string; // e.g. "5-6"
  evalContext: string;  // injected into evaluation prompt
}

function getLevelConfig(level: Level): LevelConfig {
  switch (level) {
    case 'A0': return {
      maxOptions: 2, maxQuestions: 3, outlineStages: 2, keyWordRange: '4-5',
      evalContext: 'The student is a complete beginner (A0). Focus ONLY on their language use — vocabulary choices and basic sentence structure. Do NOT mention missing content or story points. Be very encouraging.',
    };
    case 'A1': return {
      maxOptions: 3, maxQuestions: 4, outlineStages: 3, keyWordRange: '5-6',
      evalContext: 'The student is at A1 (beginner). Focus ONLY on language accuracy — vocabulary use and simple grammar. Note the single most important grammar point gently. Do NOT comment on whether content points were missed.',
    };
    case 'A2': return {
      maxOptions: 4, maxQuestions: 5, outlineStages: 3, keyWordRange: '6-8',
      evalContext: 'The student is at A2 (elementary). Focus ONLY on language: past tense accuracy, connectors (en, maar, want, omdat), and vocabulary. Do NOT mention missing story content.',
    };
    case 'B1': return {
      maxOptions: 4, maxQuestions: 6, outlineStages: 3, keyWordRange: '7-8',
      evalContext: 'The student is at B1 (intermediate). Focus ONLY on language quality: vocabulary variety, tense accuracy, subordinate clauses, and word order. Give specific grammar feedback. Ignore content gaps.',
    };
    case 'B2': return {
      maxOptions: 4, maxQuestions: 8, outlineStages: 4, keyWordRange: '8-10',
      evalContext: 'The student is at B2 (upper-intermediate). Focus ONLY on language precision: idiomatic expression, complex grammar, and style. Give detailed feedback on language, not content coverage.',
    };
    default: return {
      maxOptions: 3, maxQuestions: 4, outlineStages: 3, keyWordRange: '5-6',
      evalContext: 'Focus only on language use, not content. Be encouraging.',
    };
  }
}

// ─── Claude helper ────────────────────────────────────────────────────────────
async function callClaude(system: string, user: string, maxTokens = 512): Promise<string> {
  const apiKey = localStorage.getItem('dutch-app-anthropic-key') || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
  if (!apiKey || apiKey === 'your_api_key_here') throw new Error('NO_KEY');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  return data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
}

// ─── Types ───────────────────────────────────────────────────────────────────
type ExerciseTab = 'quiz' | 'words' | 'cloze' | 'builder' | 'retell';

interface ClozeSegment {
  type: 'text' | 'blank';
  content: string;   // Dutch word
  english: string;   // English translation (shown as hint in the text)
  blankIndex: number;
}

interface BuilderSentence {
  original: string[];
  scrambled: { word: string; idx: number }[];
}

interface RetrievalQuestion {
  english: string;
  correct: string;
  options: string[];
}

interface RetellingOutline { outline: string[]; key_words: { dutch: string; english: string }[] }
interface RetellingFeedback {
  score: number; covered_points: string[]; missing_points: string[];
  vocabulary_feedback: string; grammar_feedback: string; encouragement: string;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ReadingView({ text, onBack, onNext, onPrev }: ReadingViewProps) {
  const { markTextCompleted, vocabulary, addWord } = useLearning();

  // ── Phrase popup ──
  const [popup, setPopup] = useState<PhrasePopup | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');
  const popupRef = useRef<HTMLDivElement>(null);

  const [exprPopup, setExprPopup] = useState<{
    phrase: string; english: string; sentence: string; savedState: 'idle' | 'saved';
  } | null>(null);

  // ── TTS ──
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Exercise tabs ──
  const [activeTab, setActiveTab] = useState<ExerciseTab | null>(null);

  // ── Quiz state ──
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ── Word retrieval state ──
  const [retrievalAnswers, setRetrievalAnswers] = useState<Record<number, string>>({});
  const [retrievalSubmitted, setRetrievalSubmitted] = useState(false);

  // ── Cloze state ──
  const [clozeAnswers, setClozeAnswers] = useState<Record<number, string>>({});
  const [clozeSubmitted, setClozeSubmitted] = useState(false);

  // ── Sentence builder state ──
  const [builderIdx, setBuilderIdx] = useState(0);
  const [builderSelected, setBuilderSelected] = useState<number[]>([]); // indices into scrambled
  const [builderChecked, setBuilderChecked] = useState(false);
  const [builderScore, setBuilderScore] = useState(0);
  const [builderDone, setBuilderDone] = useState(false);

  // ── Retelling state ──
  type RetellingPhase = 'idle' | 'loading' | 'ready' | 'evaluating' | 'feedback';
  const [retellingPhase, setRetellingPhase] = useState<RetellingPhase>('idle');
  const [retellingData, setRetellingData] = useState<RetellingOutline | null>(null);
  const [retellingTranscript, setRetellingTranscript] = useState('');
  const [retellingFeedback, setRetellingFeedback] = useState<RetellingFeedback | null>(null);

  // ── Reset all exercise state when the text changes ──
  useEffect(() => {
    setActiveTab(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setRetrievalAnswers({});
    setRetrievalSubmitted(false);
    setClozeAnswers({});
    setClozeSubmitted(false);
    setBuilderIdx(0);
    setBuilderSelected([]);
    setBuilderChecked(false);
    setBuilderScore(0);
    setBuilderDone(false);
    setRetellingPhase('idle');
    setRetellingData(null);
    setRetellingTranscript('');
    setRetellingFeedback(null);
  }, [text.id]);

  // ── Vocab / text processing ──
  const keywords = useMemo(() => {
    const curated = getKeywordsForText(text.id);
    if (Object.keys(curated).length > 0) return curated;
    const fallback: Record<string, string> = {};
    Object.entries(text.words || {}).forEach(([k, v]) => { fallback[k] = v.english; });
    return fallback;
  }, [text.id, text.words]);

  const separableVerbs = useMemo(() => getSeparableVerbsForText(text.id), [text.id]);
  const fixedExpressions = useMemo(() => getFixedExpressionsForText(text.id), [text.id]);
  const splitExpressions = useMemo(() => getSplitExpressionsForText(text.id), [text.id]);

  const prefixToVerb = useMemo(() => {
    const map: Record<string, SeparableVerbEntry> = {};
    Object.values(separableVerbs).forEach(entry => {
      entry.prefix.split(' / ').forEach(p => { map[p.trim().toLowerCase()] = entry; });
    });
    return map;
  }, [separableVerbs]);

  const { tokens, sentenceForIndex } = useMemo(() => {
    // Normalise newlines → spaces for sentence detection so paragraph breaks
    // don't corrupt the position-tracking cursor logic.
    const normalised = text.content.replace(/\n+/g, ' ');
    const sentences = normalised.match(/[^.!?]+[.!?]?/g) ?? [normalised];
    const rawTokens = text.content.split(/(\s+)/);
    const map: string[] = [];
    let cursor = 0;
    let acc = '';
    rawTokens.forEach((tok, i) => {
      acc += tok.replace(/\n+/g, ' ');   // use normalised length for cursor maths
      while (cursor < sentences.length - 1 && acc.length > sentences.slice(0, cursor + 1).join('').length) {
        cursor++;
      }
      map[i] = (sentences[cursor] || '').trim();
    });
    return { tokens: rawTokens, sentenceForIndex: map };
  }, [text.content]);

  // Build per-sentence activity maps: a verb stem is only highlighted when its
  // detached prefix ALSO appears in the same sentence (and vice-versa).
  const separableActivity = useMemo(() => {
    // Group tokens by sentence
    const sentenceWords: Record<string, Set<string>> = {};
    tokens.forEach((tok, i) => {
      const sent = sentenceForIndex[i];
      const clean = tok.replace(/[.,!?;:'"()]/g, '').toLowerCase();
      if (!clean || /^\s+$/.test(tok)) return;
      if (!sentenceWords[sent]) sentenceWords[sent] = new Set();
      sentenceWords[sent].add(clean);
    });

    const activeVerbs   = new Map<string, Set<string>>(); // sentence → Set of active verb stems
    const activePrefixes = new Map<string, Set<string>>(); // sentence → Set of active prefixes

    Object.entries(sentenceWords).forEach(([sent, wordSet]) => {
      wordSet.forEach(word => {
        const verbEntry = separableVerbs[word];
        if (!verbEntry) return;
        const prefixes = verbEntry.prefix.split(' / ').map(p => p.trim().toLowerCase());
        const matchedPrefixes = prefixes.filter(p => wordSet.has(p));
        if (matchedPrefixes.length > 0) {
          if (!activeVerbs.has(sent)) activeVerbs.set(sent, new Set());
          activeVerbs.get(sent)!.add(word);
          matchedPrefixes.forEach(p => {
            if (!activePrefixes.has(sent)) activePrefixes.set(sent, new Set());
            activePrefixes.get(sent)!.add(p);
          });
        }
      });
    });
    return { activeVerbs, activePrefixes };
  }, [tokens, sentenceForIndex, separableVerbs]);

  // Build per-sentence split-expression activity: both words highlighted green
  // when they co-occur in the same sentence.
  const splitExpressionActivity = useMemo(() => {
    const active = new Map<string, SplitExpressionEntry>(); // key: `${sentence}::${word}`
    if (splitExpressions.length === 0) return active;

    const sentenceWords: Record<string, Set<string>> = {};
    tokens.forEach((tok, i) => {
      const sent = sentenceForIndex[i];
      const clean = tok.replace(/[.,!?;:'"()]/g, '').toLowerCase();
      if (!clean || /^\s+$/.test(tok)) return;
      if (!sentenceWords[sent]) sentenceWords[sent] = new Set();
      sentenceWords[sent].add(clean);
    });

    splitExpressions.forEach(entry => {
      Object.entries(sentenceWords).forEach(([sent, wordSet]) => {
        if (wordSet.has(entry.word1) && wordSet.has(entry.word2)) {
          active.set(`${sent}::${entry.word1}`, entry);
          active.set(`${sent}::${entry.word2}`, entry);
        }
      });
    });
    return active;
  }, [tokens, sentenceForIndex, splitExpressions]);

  // Pre-compute which token indices belong to fixed expressions
  const { expressionStartMap, expressionSkipSet } = useMemo(() => {
    const exprMap = new Map<number, { phrase: string; english: string; rangeEnd: number; displayText: string }>();
    const skipSet = new Set<number>();

    // Build list of non-whitespace tokens with their index
    const nonWsTokens: { idx: number; clean: string }[] = [];
    tokens.forEach((tok, i) => {
      if (/^\s+$/.test(tok)) return;
      const clean = tok.replace(/[.,!?;:'"«»""''()\[\]]+/g, '').toLowerCase();
      if (clean) nonWsTokens.push({ idx: i, clean });
    });

    Object.entries(fixedExpressions).forEach(([phrase, { english }]) => {
      const phraseWords = phrase.toLowerCase().split(/\s+/).filter(Boolean);
      for (let ni = 0; ni <= nonWsTokens.length - phraseWords.length; ni++) {
        let match = true;
        for (let pi = 0; pi < phraseWords.length; pi++) {
          if (nonWsTokens[ni + pi]?.clean !== phraseWords[pi]) { match = false; break; }
        }
        if (match) {
          const firstTokenIdx = nonWsTokens[ni].idx;
          const lastTokenIdx = nonWsTokens[ni + phraseWords.length - 1].idx;
          // Build display text from all tokens in range (including spaces)
          const displayText = tokens.slice(firstTokenIdx, lastTokenIdx + 1).join('');
          exprMap.set(firstTokenIdx, { phrase, english, rangeEnd: lastTokenIdx, displayText });
          for (let i = firstTokenIdx + 1; i <= lastTokenIdx; i++) {
            skipSet.add(i);
          }
        }
      }
    });

    return { expressionStartMap: exprMap, expressionSkipSet: skipSet };
  }, [tokens, fixedExpressions]);

  // ── Level config ──
  const levelConfig = useMemo(() => getLevelConfig(text.level), [text.level]);

  // ── Word retrieval quiz questions (count + options scaled to level) ──
  const retrievalQuestions = useMemo<RetrievalQuestion[]>(() => {
    const entries = Object.entries(text.words || {});
    if (entries.length < 2) return [];
    const { maxOptions, maxQuestions } = levelConfig;
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(maxQuestions, entries.length)).map(([dutch, { english }]) => {
      const others = entries.filter(([d]) => d !== dutch).map(([d]) => d);
      const distractorCount = Math.min(maxOptions - 1, others.length);
      const distractors = [...others].sort(() => Math.random() - 0.5).slice(0, distractorCount);
      return {
        english,
        correct: dutch,
        options: [dutch, ...distractors].sort(() => Math.random() - 0.5),
      };
    });
  }, [text.id, levelConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cloze segments ──
  const clozeSegments = useMemo<ClozeSegment[]>(() => {
    const wordKeys = Object.keys(text.words || {});
    if (wordKeys.length === 0) return [];
    const toBlank = [...wordKeys].sort(() => Math.random() - 0.5).slice(0, Math.min(7, wordKeys.length));
    const positions: { start: number; end: number; word: string }[] = [];
    let content = text.content;
    toBlank.forEach(w => {
      const rx = new RegExp(`\\b${w}\\b`, 'i');
      const m = rx.exec(content);
      if (m) positions.push({ start: m.index, end: m.index + m[0].length, word: m[0] });
    });
    positions.sort((a, b) => a.start - b.start);
    const deduped = positions.filter((p, i) => i === 0 || p.start >= positions[i - 1].end);
    const segs: ClozeSegment[] = [];
    let cursor = 0; let bi = 0;
    deduped.forEach(pos => {
      if (pos.start > cursor) segs.push({ type: 'text', content: content.slice(cursor, pos.start), english: '', blankIndex: -1 });
      segs.push({ type: 'blank', content: pos.word.toLowerCase(), english: (text.words?.[pos.word.toLowerCase()]?.english ?? pos.word.toLowerCase()), blankIndex: bi++ });
      cursor = pos.end;
    });
    if (cursor < content.length) segs.push({ type: 'text', content: content.slice(cursor), english: '', blankIndex: -1 });
    return segs;
  }, [text.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Builder sentences ──
  const builderSentences = useMemo<BuilderSentence[]>(() => {
    const raw = text.content.match(/[^.!?]+[.!?]/g) ?? [];
    const valid = raw.map(s => s.trim()).filter(s => {
      const ws = s.replace(/[.!?]$/, '').split(/\s+/).filter(Boolean);
      return ws.length >= 4 && ws.length <= 12;
    });
    const picked = [...valid].sort(() => Math.random() - 0.5).slice(0, Math.min(4, valid.length));
    return picked.map(sentence => {
      const words = sentence.replace(/[.!?]$/, '').split(/\s+/)
        .map(w => w.replace(/^["'«»""'']+|["'«»""'']+$/g, ''))
        .filter(w => w.length > 0);
      const indexed = words.map((w, i) => ({ word: w, idx: i }));
      const scrambled = [...indexed].sort(() => Math.random() - 0.5);
      return { original: words, scrambled };
    });
  }, [text.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Phrase popup handlers ────────────────────────────────────────────────

  function dismissPopup() {
    setPopup(null);
    setSaveState('idle');
    window.getSelection()?.removeAllRanges();
  }

  function handleSelectionEnd() {
    requestAnimationFrame(async () => {
      const sel = window.getSelection();
      const selected = sel?.toString().trim() ?? '';
      if (!selected || !selected.includes(' ') || selected.length < 4) return;
      const range = sel?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      const cardW = 224;
      const rawX = rect.left + rect.width / 2 - cardW / 2;
      const x = Math.max(8, Math.min(rawX, window.innerWidth - cardW - 8));
      setPopup({ text: selected, x, anchorY: rect.top - 8, translation: '', translating: true });
      setSaveState('idle');
      const t = await fetchPhraseTranslation(selected);
      setPopup(prev => prev ? { ...prev, translation: t, translating: false } : null);
    });
  }

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (popup && popupRef.current && !popupRef.current.contains(e.target as Node)) {
        dismissPopup();
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [popup]);

  function handleSavePhrase() {
    if (!popup || saveState === 'saved') return;
    addWord(popup.text, popup.translation || popup.text);
    setSaveState('saved');
    setTimeout(dismissPopup, 1400);
  }

  // ─── TTS ─────────────────────────────────────────────────────────────────

  function handlePlayText() {
    if (isPlaying) { stopDutch(); setIsPlaying(false); return; }
    playDutch(text.content, {
      rate: 0.82,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  }

  // ─── Text rendering ───────────────────────────────────────────────────────

  const renderText = () => {
    return tokens.map((token, i) => {
      // Skip tokens that are non-first parts of expressions
      if (expressionSkipSet.has(i)) return null;

      if (/^\s+$/.test(token)) {
        if (token.includes('\n\n')) return <span key={i} className="block mt-3" />;
        if (token.includes('\n'))   return <br key={i} />;
        return <span key={i}>{token}</span>;
      }

      // Check if this token starts a fixed expression
      const exprInfo = expressionStartMap.get(i);
      if (exprInfo) {
        const sentenceForExpr = sentenceForIndex[i];
        return (
          <span
            key={i}
            className="word-expression word-clickable"
            onClick={() => setExprPopup({ phrase: exprInfo.phrase, english: exprInfo.english, sentence: sentenceForExpr, savedState: 'idle' })}
          >
            {exprInfo.displayText}
          </span>
        );
      }

      // Separate leading punct, word body, trailing punct
      const leadMatch = token.match(/^[.,!?;:'"«»""''()\[\]]+/);
      const trailMatch = token.match(/[.,!?;:'"«»""''()\[\]]+$/);
      const leadPunct = leadMatch?.[0] ?? '';
      const trailPunct = trailMatch?.[0] ?? '';
      const wordOnly = token.slice(leadPunct.length, token.length - trailPunct.length);
      const clean = wordOnly.toLowerCase();
      if (!clean) return <span key={i}>{token}</span>;
      const sent = sentenceForIndex[i];

      // Split expression: both words green, shown individually
      const splitEntry = splitExpressionActivity.get(`${sent}::${clean}`);
      if (splitEntry) {
        return (
          <span key={i}>
            {leadPunct}
            <span
              className="word-expression word-clickable"
              onClick={() => setExprPopup({
                phrase: splitEntry.display ?? `${splitEntry.word1} … ${splitEntry.word2}`,
                english: splitEntry.english,
                sentence: sent,
                savedState: 'idle',
              })}
            >
              {wordOnly}
            </span>
            {trailPunct}
          </span>
        );
      }

      const sepVerb =
        (separableVerbs[clean] && separableActivity.activeVerbs.get(sent)?.has(clean) ? separableVerbs[clean] : undefined)
        ?? (prefixToVerb[clean] && separableActivity.activePrefixes.get(sent)?.has(clean) ? prefixToVerb[clean] : undefined);
      const keywordEnglish = !sepVerb ? keywords[clean] : undefined;
      const isKeyword = !!keywordEnglish;
      const vocabEntry = vocabulary[clean];
      const status = vocabEntry?.status || 'new';
      return (
        <span key={i}>
          {leadPunct}
          <WordPopover
            word={clean}
            display={wordOnly}
            translation={keywordEnglish ?? ''}
            status={status}
            highlighted={isKeyword}
            sentence={sent}
            separableVerb={sepVerb}
          />
          {trailPunct}
        </span>
      );
    });
  };

  // ─── Quiz ─────────────────────────────────────────────────────────────────

  function handleSubmitQuiz() {
    setQuizSubmitted(true);
    markTextCompleted(text.id);
  }

  // ─── Retelling ────────────────────────────────────────────────────────────

  function startRetelling() {
    setRetellingTranscript('');
    setRetellingFeedback(null);
    const { outlineStages } = levelConfig;
    const wordEntries = Object.entries(text.words || {}).slice(0, 8).map(([dutch, v]) => ({ dutch, english: v.english }));
    const outline = outlineStages === 2
      ? ['What happens first', 'How the story ends']
      : outlineStages >= 4
      ? ['How the story begins', 'What happens next', 'The key event or problem', 'How the story ends']
      : ['What happens at the beginning', 'What happens in the middle', 'How the story ends'];
    setRetellingData({ outline, key_words: wordEntries });
    setRetellingPhase('ready');
  }

  async function evaluateRetelling() {
    if (!retellingTranscript.trim() || !retellingData) return;
    setRetellingPhase('evaluating');
    try {
      const raw = await callClaude(
        `You are a Dutch language teacher giving feedback on a student's retelling. ${levelConfig.evalContext}
IMPORTANT: Evaluate ONLY the language quality — vocabulary richness, grammar accuracy, sentence structure, and word choices. Do NOT mention story content, missing plot points, or what the student forgot to include. The goal is language practice, not comprehension testing.
Return ONLY valid JSON, no markdown:
{"score":1-5,"covered_points":["specific Dutch phrases or words used well"],"missing_points":[],"vocabulary_feedback":"feedback on word choices only","grammar_feedback":"feedback on grammar and sentence structure only","encouragement":"motivating note about their Dutch language progress"}`,
        `TEXT LEVEL: ${text.level}\n\nORIGINAL STORY (for language reference):\n${text.content}\n\nSTUDENT'S DUTCH RETELLING:\n${retellingTranscript.trim()}`,
        600,
      );
      setRetellingFeedback(JSON.parse(raw) as RetellingFeedback);
      setRetellingPhase('feedback');
    } catch {
      setRetellingPhase('ready');
    }
  }

  function resetRetelling() {
    setRetellingPhase('idle');
    setRetellingTranscript('');
    setRetellingFeedback(null);
    setRetellingData(null);
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  const quizTotal = text.comprehensionQuestions?.length ?? 0;
  const retrievalTotal = retrievalQuestions.length;
  const retrievalScore = retrievalSubmitted
    ? Object.entries(retrievalAnswers).filter(([qi, ans]) => retrievalQuestions[+qi]?.correct === ans).length
    : 0;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Back + level + next/prev */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Badge className={`level-badge level-${text.level.toLowerCase()}`}>{text.level}</Badge>
        <div className="ml-auto flex items-center gap-1">
          {onPrev && (
            <Button variant="ghost" size="sm" onClick={onPrev} className="gap-1 text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Prev
            </Button>
          )}
          {onNext && (
            <Button variant="ghost" size="sm" onClick={onNext} className="gap-1 text-muted-foreground">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Title + Listen */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">{text.title}</h2>
          <p className="text-sm text-muted-foreground">{text.titleTranslation}</p>
        </div>
        <Button
          variant="outline" size="sm"
          onClick={handlePlayText}
          className={`shrink-0 gap-1.5 ${isPlaying ? 'border-primary text-primary' : ''}`}
        >
          <Volume2 className="h-4 w-4" />
          {isPlaying ? 'Stop' : 'Listen'}
        </Button>
      </div>

      {/* Floating phrase-save popup */}
      {popup && (
        <div
          ref={popupRef}
          className="fixed z-[70] animate-fade-in w-56"
          style={{ left: popup.x, top: popup.anchorY, transform: 'translateY(-100%)' }}
        >
          <div className="rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
            <div className="px-3 pt-3 pb-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Dutch</p>
              <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">{popup.text}</p>
            </div>
            <div className="px-3 pb-3 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">English</p>
              {popup.translating
                ? <p className="text-sm text-muted-foreground italic animate-pulse">Translating…</p>
                : <p className="text-sm text-foreground leading-snug">{popup.translation || '—'}</p>
              }
            </div>
            <button
              onPointerDown={e => { e.stopPropagation(); handleSavePhrase(); }}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                saveState === 'saved' ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {saveState === 'saved'
                ? <><Check className="h-4 w-4" /> Saved to flashcards!</>
                : <><BookmarkPlus className="h-4 w-4" /> Save to flashcards</>
              }
            </button>
            <button
              onPointerDown={e => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('dutch-chat-open', { detail: { message: `Explain this Dutch phrase for me: "${popup.text}"` } }));
                dismissPopup();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold bg-secondary text-foreground hover:bg-accent transition-all"
            >
              Ask Daan about this
            </button>
          </div>
          <div className="flex justify-center mt-0">
            <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-card"
              style={{ filter: 'drop-shadow(0 1px 0 hsl(var(--border)))' }} />
          </div>
        </div>
      )}

      {/* Expression popup */}
      {exprPopup && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center pb-6 px-4"
          onClick={() => setExprPopup(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 pt-4 pb-2 flex items-center gap-2">
              <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">fixed expression</span>
            </div>
            <div className="px-4 pb-3">
              <p className="font-heading text-lg font-bold text-foreground">{exprPopup.phrase}</p>
              <p className="text-base text-muted-foreground mt-0.5">{exprPopup.english}</p>
            </div>
            {exprPopup.sentence && (
              <div className="mx-4 mb-3 rounded-md bg-secondary p-3">
                <p className="text-sm font-medium italic text-secondary-foreground">"{exprPopup.sentence}"</p>
              </div>
            )}
            <div className="flex gap-2 px-4 pb-4">
              <button
                onClick={() => {
                  addWord(exprPopup.phrase, exprPopup.english, { example: exprPopup.sentence });
                  setExprPopup(prev => prev ? { ...prev, savedState: 'saved' } : null);
                  setTimeout(() => setExprPopup(null), 1400);
                }}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                  exprPopup.savedState === 'saved' ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                {exprPopup.savedState === 'saved' ? '✓ Saved!' : '＋ Save to flashcards'}
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('dutch-chat-open', { detail: { message: `Explain this Dutch expression for me: "${exprPopup.phrase}"` } }));
                  setExprPopup(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold bg-secondary text-foreground hover:bg-accent transition-all"
              >
                Ask Daan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading text */}
      <Card className="p-6 md:p-8" onMouseUp={handleSelectionEnd} onTouchEnd={handleSelectionEnd}>
        <div className="reading-text leading-[2.2]">{renderText()}</div>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Tap a word to translate · <span className="font-semibold text-foreground">Select a phrase</span> to save it ·{' '}
        <span className="font-semibold" style={{ color: 'hsl(var(--dutch-orange))' }}>Orange</span> = vocab ·{' '}
        <span className="font-semibold text-blue-600">Blue</span> = separable verb ·{' '}
        <span className="font-semibold text-green-600">Green</span> = fixed expression
      </p>

      {/* ── Practice exercises ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Practice exercises</p>

        {/* Tab row — scrollable so all 5 fit on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {/* 1 — Comprehension quiz */}
          {text.comprehensionQuestions && (
            <button
              onClick={() => setActiveTab(activeTab === 'quiz' ? null : 'quiz')}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
                activeTab === 'quiz' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
              }`}
            >
              <ClipboardCheck className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">Quiz</span>
              {quizSubmitted && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
            </button>
          )}

          {/* 2 — Word recall */}
          {retrievalTotal > 0 && (
            <button
              onClick={() => setActiveTab(activeTab === 'words' ? null : 'words')}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
                activeTab === 'words' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
              }`}
            >
              <Brain className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">Words</span>
              {retrievalSubmitted && <span className="text-[10px] text-emerald-600 font-bold">{retrievalScore}/{retrievalTotal}</span>}
            </button>
          )}

          {/* 3 — Cloze */}
          {clozeSegments.filter(s => s.type === 'blank').length > 0 && (
            <button
              onClick={() => setActiveTab(activeTab === 'cloze' ? null : 'cloze')}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
                activeTab === 'cloze' ? 'border-violet-500 bg-violet-50 text-violet-600' : 'border-border hover:border-violet-300 text-muted-foreground'
              }`}
            >
              <PenLine className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">Fill Gap</span>
              {clozeSubmitted && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
            </button>
          )}

          {/* 4 — Sentence builder */}
          {builderSentences.length > 0 && (
            <button
              onClick={() => setActiveTab(activeTab === 'builder' ? null : 'builder')}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
                activeTab === 'builder' ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-border hover:border-amber-300 text-muted-foreground'
              }`}
            >
              <Shuffle className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">Order</span>
              {builderDone && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
            </button>
          )}

          {/* 5 — Retell */}
          <button
            onClick={() => {
              setActiveTab(activeTab === 'retell' ? null : 'retell');
              if (activeTab !== 'retell' && retellingPhase === 'idle') startRetelling();
            }}
            className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
              activeTab === 'retell' ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-border hover:border-rose-300 text-muted-foreground'
            }`}
          >
            <Mic className="h-5 w-5" />
            <span className="text-[11px] font-semibold leading-tight">Retell</span>
            {retellingPhase === 'feedback' && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
          </button>
        </div>

        {/* ── Tab content ── */}

        {/* 1 — Comprehension quiz */}
        {activeTab === 'quiz' && text.comprehensionQuestions && (
          <Card className="animate-fade-in space-y-5 p-5">
            <h3 className="font-heading text-base font-semibold">Comprehension Quiz</h3>
            {text.comprehensionQuestions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="font-medium text-sm text-foreground">{q.question}</p>
                <div className="flex flex-col gap-1.5">
                  {q.options.map((opt, oi) => {
                    const selected = quizAnswers[qi] === oi;
                    const correct = quizSubmitted && q.correctIndex === oi;
                    const wrong = quizSubmitted && selected && q.correctIndex !== oi;
                    return (
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                        className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                          correct ? 'border-success bg-success/10 text-success' :
                          wrong ? 'border-destructive bg-destructive/10 text-destructive' :
                          selected ? 'border-primary bg-accent' :
                          'border-border hover:bg-secondary'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!quizSubmitted && (
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < quizTotal}
              >
                Submit answers
              </Button>
            )}
            {quizSubmitted && (
              <p className="text-sm font-medium text-success flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Text completed! Words saved to your vocabulary.
              </p>
            )}
          </Card>
        )}

        {/* 2 — Word retrieval */}
        {activeTab === 'words' && retrievalTotal > 0 && (
          <Card className="animate-fade-in space-y-5 p-5">
            <h3 className="font-heading text-base font-semibold">Word Recall</h3>
            <p className="text-xs text-muted-foreground -mt-3">
              Choose the Dutch word that matches each English meaning.
              {' '}<span className="font-medium">{levelConfig.maxOptions} choices</span> · {retrievalTotal} questions ({text.level})
            </p>
            {retrievalQuestions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  What is the Dutch word for <span className="font-bold">"{q.english}"</span>?
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options.map((opt, oi) => {
                    const selected = retrievalAnswers[qi] === opt;
                    const correct = retrievalSubmitted && opt === q.correct;
                    const wrong = retrievalSubmitted && selected && opt !== q.correct;
                    return (
                      <button
                        key={oi}
                        onClick={() => !retrievalSubmitted && setRetrievalAnswers(prev => ({ ...prev, [qi]: opt }))}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          correct ? 'border-success bg-success/10 text-success' :
                          wrong ? 'border-destructive bg-destructive/10 text-destructive' :
                          selected ? 'border-primary bg-primary/10 text-primary' :
                          'border-border hover:bg-secondary text-foreground'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!retrievalSubmitted && (
              <Button
                onClick={() => setRetrievalSubmitted(true)}
                disabled={Object.keys(retrievalAnswers).length < retrievalTotal}
              >
                Check answers
              </Button>
            )}
            {retrievalSubmitted && (
              <div className="space-y-2">
                <p className={`text-sm font-semibold ${retrievalScore === retrievalTotal ? 'text-success' : 'text-foreground'}`}>
                  {retrievalScore === retrievalTotal ? 'Perfect score!' : `${retrievalScore} / ${retrievalTotal} correct`}
                </p>
                <Button
                  variant="outline" size="sm" className="gap-2"
                  onClick={() => { setRetrievalAnswers({}); setRetrievalSubmitted(false); }}
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Try again
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* 3 — Cloze */}
        {activeTab === 'cloze' && clozeSegments.length > 0 && (() => {
          const blanks = clozeSegments.filter(s => s.type === 'blank');
          const normCloze = (s: string) => s.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
          const scores = blanks.map(b => normCloze(clozeAnswers[b.blankIndex] ?? '') === normCloze(b.content));
          const correctCount = scores.filter(Boolean).length;
          return (
            <Card className="animate-fade-in p-5 space-y-4">
              <div>
                <h3 className="font-heading text-base font-semibold">Fill the Gap</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Vocabulary words are hidden. Type them from memory.</p>
              </div>

              {/* Inline text with embedded gap inputs */}
              <div className="rounded-xl bg-secondary/30 p-4 text-sm leading-[3]">
                {clozeSegments.map((seg, i) => {
                  if (seg.type === 'text') return <span key={i}>{seg.content}</span>;
                  const answer = clozeAnswers[seg.blankIndex] ?? '';
                  const isCorrect = clozeSubmitted && scores[seg.blankIndex];
                  const isWrong   = clozeSubmitted && !scores[seg.blankIndex];
                  return (
                    <span key={i} className="inline-flex flex-col items-center mx-0.5 align-bottom">
                      <input
                        type="text"
                        value={answer}
                        onChange={e => !clozeSubmitted && setClozeAnswers(prev => ({ ...prev, [seg.blankIndex]: e.target.value }))}
                        placeholder={seg.english}
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        disabled={clozeSubmitted}
                        className={`w-20 rounded border-b-2 bg-transparent px-1 py-0 text-sm text-center outline-none transition-colors placeholder:text-[10px] placeholder:text-muted-foreground/60 ${
                          isCorrect ? 'border-emerald-500 text-emerald-700' :
                          isWrong   ? 'border-red-400 text-red-700' :
                          'border-primary/60 focus:border-primary'
                        }`}
                      />
                      {isWrong && (
                        <span className="text-[10px] font-semibold text-emerald-600 leading-none mt-0.5">{seg.content}</span>
                      )}
                    </span>
                  );
                })}
              </div>

              {!clozeSubmitted ? (
                <Button
                  className="w-full"
                  onClick={() => setClozeSubmitted(true)}
                  disabled={blanks.some(b => !clozeAnswers[b.blankIndex]?.trim())}
                >
                  Check answers
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className={`text-sm font-semibold ${correctCount === blanks.length ? 'text-emerald-600' : 'text-foreground'}`}>
                    {correctCount === blanks.length ? 'Perfect!' : `${correctCount} / ${blanks.length} correct`}
                  </p>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => { setClozeAnswers({}); setClozeSubmitted(false); }}>
                    <RotateCcw className="h-3.5 w-3.5" /> Try again
                  </Button>
                </div>
              )}
            </Card>
          );
        })()}

        {/* 4 — Sentence Builder */}
        {activeTab === 'builder' && builderSentences.length > 0 && (() => {
          const current = builderSentences[builderIdx];
          if (!current) return null;
          const availableIndices = current.scrambled.map((_, i) => i).filter(i => !builderSelected.includes(i));
          const selectedWords = builderSelected.map(i => current.scrambled[i].word);
          const isCorrect = selectedWords.join(' ') === current.original.join(' ');

          function handleBankTap(scrambledIdx: number) {
            if (builderChecked) return;
            setBuilderSelected(prev => [...prev, scrambledIdx]);
          }
          function handleAnswerTap(position: number) {
            if (builderChecked) return;
            setBuilderSelected(prev => prev.filter((_, i) => i !== position));
          }
          function handleCheck() {
            if (isCorrect) setBuilderScore(s => s + 1);
            setBuilderChecked(true);
          }
          function handleNext() {
            if (builderIdx + 1 >= builderSentences.length) {
              setBuilderDone(true);
            } else {
              setBuilderIdx(i => i + 1);
              setBuilderSelected([]);
              setBuilderChecked(false);
            }
          }
          function resetBuilder() {
            setBuilderIdx(0); setBuilderSelected([]); setBuilderChecked(false);
            setBuilderScore(0); setBuilderDone(false);
          }

          if (builderDone) {
            return (
              <Card className="animate-fade-in p-5 space-y-4 text-center">
                <p className="font-heading text-lg font-bold">
                  {builderScore === builderSentences.length ? 'Perfect word order!' : `${builderScore} / ${builderSentences.length} correct`}
                </p>
                <Button variant="outline" className="gap-2" onClick={resetBuilder}>
                  <RotateCcw className="h-4 w-4" /> Try again
                </Button>
              </Card>
            );
          }

          return (
            <Card className="animate-fade-in p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold">Sentence Builder</h3>
                <span className="text-xs text-muted-foreground">{builderIdx + 1} / {builderSentences.length}</span>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">Tap words in the correct Dutch order.</p>

              {/* Answer area */}
              <div className="min-h-[52px] rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 p-3 flex flex-wrap gap-1.5 items-center">
                {selectedWords.length === 0
                  ? <span className="text-xs text-amber-400 italic">Tap words below to build the sentence…</span>
                  : selectedWords.map((w, pos) => (
                    <button
                      key={pos}
                      onClick={() => handleAnswerTap(pos)}
                      className={`rounded-lg px-2.5 py-1 text-sm font-medium border transition-all active:scale-95 ${
                        builderChecked
                          ? isCorrect ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-red-100 border-red-400 text-red-800'
                          : 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))
                }
              </div>

              {/* Word bank */}
              <div className="flex flex-wrap gap-1.5">
                {availableIndices.map(si => (
                  <button
                    key={si}
                    onClick={() => handleBankTap(si)}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-sm font-medium hover:bg-secondary/70 active:scale-95 transition-all"
                  >
                    {current.scrambled[si].word}
                  </button>
                ))}
              </div>

              {builderChecked ? (
                <div className="space-y-2">
                  {!isCorrect && (
                    <p className="text-xs text-foreground">
                      <span className="font-semibold text-emerald-700">Correct: </span>
                      {current.original.join(' ')}.
                    </p>
                  )}
                  <Button className="w-full" onClick={handleNext}>
                    {builderIdx + 1 >= builderSentences.length ? 'See results' : 'Next →'}
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleCheck}
                  disabled={selectedWords.length !== current.original.length}
                >
                  Check order
                </Button>
              )}
            </Card>
          );
        })()}

        {/* 5 — Retell the story */}
        {activeTab === 'retell' && (
          <Card className="animate-fade-in p-5 space-y-4">
            <h3 className="font-heading text-base font-semibold">Retell the Story</h3>

            {(retellingPhase === 'ready' || retellingPhase === 'evaluating') && retellingData && (
              <div className="space-y-4">
                {/* Outline */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Outline</p>
                  <ol className="space-y-1.5">
                    {retellingData.outline.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                        {pt}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Key words */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key words</p>
                  <div className="flex flex-wrap gap-2">
                    {retellingData.key_words.map((kw, i) => (
                      <div key={i} className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1">
                        <span className="text-sm font-semibold text-foreground">{kw.dutch}</span>
                        <span className="text-xs text-muted-foreground ml-1.5">{kw.english}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text input */}
                <div className="space-y-2">
                  <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2">
                    <p className="text-xs font-semibold text-rose-700 flex items-center gap-1.5 mb-0.5">
                      <Mic className="h-3.5 w-3.5" /> Try speaking aloud first!
                    </p>
                    <p className="text-xs text-rose-600">
                      Speaking Dutch out loud — even at home — dramatically speeds up fluency. Retell the story out loud, then type it below for AI feedback.
                    </p>
                  </div>
                  <Textarea
                    value={retellingTranscript}
                    onChange={e => setRetellingTranscript(e.target.value)}
                    placeholder="Type the story in your own Dutch words…"
                    className="text-sm min-h-[100px]"
                    disabled={retellingPhase === 'evaluating'}
                  />
                  <Button
                    className="w-full gap-2"
                    onClick={evaluateRetelling}
                    disabled={!retellingTranscript.trim() || retellingPhase === 'evaluating'}
                  >
                    {retellingPhase === 'evaluating'
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Evaluating…</>
                      : <><Star className="h-4 w-4" /> Get feedback</>
                    }
                  </Button>
                </div>
              </div>
            )}

            {retellingPhase === 'feedback' && retellingFeedback && (
              <div className="space-y-4 animate-fade-in">
                {/* Score */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} className={`h-5 w-5 ${n <= retellingFeedback.score ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{retellingFeedback.score}/5</span>
                </div>

                {retellingFeedback.covered_points.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> What you covered</p>
                    {retellingFeedback.covered_points.map((p, i) => (
                      <p key={i} className="text-xs text-foreground ml-4">✓ {p}</p>
                    ))}
                  </div>
                )}

                {retellingFeedback.missing_points.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-amber-700 flex items-center gap-1"><XCircle className="h-3.5 w-3.5" /> To work on</p>
                    {retellingFeedback.missing_points.map((p, i) => (
                      <p key={i} className="text-xs text-foreground ml-4">→ {p}</p>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-foreground">
                  <p><span className="font-semibold">Vocabulary:</span> {retellingFeedback.vocabulary_feedback}</p>
                  <p><span className="font-semibold">Grammar:</span> {retellingFeedback.grammar_feedback}</p>
                  <p className="font-medium text-primary">{retellingFeedback.encouragement}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={resetRetelling}>
                    <RotateCcw className="h-3.5 w-3.5" /> Try again
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
