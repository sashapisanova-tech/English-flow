import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ReadingText } from '@/types/dutch';
import { recordTextRead } from '@/lib/textReadHistory';
import { WordPopover, WordDetails, WordSelectionContext } from '@/components/WordPopover';
import type { WordDetailsProps, WordSelection } from '@/components/WordPopover';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft, ArrowRight, Volume2, Check, Plus, ChevronLeft, Pause, Lightbulb, MessageCircleMore,
  Mic, Loader2, Star, RotateCcw,
  CheckCircle, XCircle, Brain, ClipboardCheck,
  PenLine, Shuffle, Eye, Sparkles, X,
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { toast } from 'sonner';
import { getKeywordsForText, getSeparableVerbsForText, getFixedExpressionsForText, getSplitExpressionsForText } from '@/data/vocabulary';
import type { SeparableVerbEntry, FixedExpressionEntry, SplitExpressionEntry } from '@/data/vocabulary';
import type { Level } from '@/types/dutch';
import { playDutch, stopDutch } from '@/utils/playDutch';
import { lookupWord } from '@/lib/dictionary';
import { claudeFetch } from '@/lib/ai';

interface ReadingViewProps {
  text: ReadingText;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

/** What the laptop side panel shows (lg only; phones and tablets use popups). */
type PanelItem =
  | { kind: 'word'; id: string; details: WordDetailsProps }
  | { kind: 'expr'; id: string; phrase: string; english: string; sentence: string };

const isLaptop = () => window.matchMedia('(min-width: 1024px)').matches;

interface PhrasePopup {
  text: string;
  x: number;
  anchorY: number;
  translation: string;
  translating: boolean;
  position: 'left' | 'above' | 'below';
}

// ─── Translation cache (AI-powered) ─────────────────────────────────────────
const translationCache: Record<string, string> = {};
async function fetchPhraseTranslation(phrase: string): Promise<string> {
  const key = phrase.toLowerCase();
  if (translationCache[key]) return translationCache[key];
  // Prepared translations first (single words and list phrases like "get up")
  const local = lookupWord(phrase);
  if (local) return (translationCache[key] = local.base ? `${local.translation} (${local.base})` : local.translation);
  try {
    { // Claude first; falls back to MyMemory below
      // Use Claude for contextual translation
      const res = await claudeFetch({
        method: 'POST',
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 60,
          system: 'You are a helpful language translator. Translate the given English word or phrase into natural, simple Russian. Reply with ONLY the Russian translation, nothing else.',
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
    // No unreliable public fallback: it returned junk translations
    return '';
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
      evalContext: 'The student is at A2 (elementary). Focus ONLY on language: past tense accuracy, connectors (and, but, because, so), and vocabulary. Do NOT mention missing story content.',
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
  const res = await claudeFetch({
    method: 'POST',
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
  content: string;   // English word
  english: string;   // Russian translation (shown as hint in the text)
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
  const { markTextCompleted, vocabulary, addWord, removeWord } = useLearning();

  // ── Phrase popup ──
  const [popup, setPopup] = useState<PhrasePopup | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');
  const popupRef = useRef<HTMLDivElement>(null);
  const exprPopupRef = useRef<HTMLDivElement>(null);

  const [exprPopup, setExprPopup] = useState<{
    phrase: string; english: string; sentence: string; savedState: 'idle' | 'saved';
    x: number; anchorY: number; position: 'left' | 'above' | 'below';
  } | null>(null);

  // ── Laptop side panel (selected word / expression) ──
  const [panelItem, setPanelItem] = useState<PanelItem | null>(null);
  const selectWord = useCallback((id: string, details: WordDetailsProps) => {
    setPanelItem({ kind: 'word', id, details });
    return true;
  }, []);
  const wordSelection = useMemo<WordSelection>(() => ({
    selectedId: panelItem?.kind === 'word' ? panelItem.id : null,
    select: selectWord,
  }), [panelItem, selectWord]);

  // ── TTS ──
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Exercise tabs ──
  const [activeTab, setActiveTab] = useState<ExerciseTab | null>(null);
  const [isTextRevealed, setIsTextRevealed] = useState(false);

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
  type RetellingPhase = 'idle' | 'loading' | 'ready' | 'submitted' | 'evaluating' | 'feedback';
  const [retellingPhase, setRetellingPhase] = useState<RetellingPhase>('idle');
  const [retellingData, setRetellingData] = useState<RetellingOutline | null>(null);
  const [retellingTranscript, setRetellingTranscript] = useState('');
  const [retellingTranslation, setRetellingTranslation] = useState<string | null>(null);
  const [retellingFeedback, setRetellingFeedback] = useState<RetellingFeedback | null>(null);

  // Track every text open in localStorage for the AI tutor
  useEffect(() => { recordTextRead(text.id); }, [text.id]);

  // ── Reset all exercise state when the text changes ──
  useEffect(() => {
    setActiveTab(null);
    setPanelItem(null);
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
    setRetellingTranslation(null);
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
  // Texts carry their own expressions; the per-ID maps in vocabulary.ts are the legacy source
  const fixedExpressions = useMemo(() => text.expressions ?? getFixedExpressionsForText(text.id), [text.id, text.expressions]);
  const splitExpressions = useMemo(() => text.splitExpressions ?? getSplitExpressionsForText(text.id), [text.id, text.splitExpressions]);

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

  function computePopupPos(rect: DOMRect, popupWidth: number, estimatedHeight = 180):
    { x: number; anchorY: number; position: 'left' | 'above' | 'below' } {
    const isMobile = window.innerWidth < 768;
    if (!isMobile && rect.left >= popupWidth + 20) {
      return { x: Math.max(8, rect.left - popupWidth - 12), anchorY: rect.top + rect.height / 2, position: 'left' };
    }
    const rawX = rect.left + rect.width / 2 - popupWidth / 2;
    const x = Math.max(8, Math.min(rawX, window.innerWidth - popupWidth - 8));
    if (rect.top >= estimatedHeight + 16) {
      return { x, anchorY: rect.top - 8, position: 'above' };
    }
    return { x, anchorY: rect.bottom + 8, position: 'below' };
  }

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
      const { x, anchorY, position } = computePopupPos(rect, 224, 180);
      setPopup({ text: selected, x, anchorY, translation: '', translating: true, position });
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
      if (exprPopup && exprPopupRef.current && !exprPopupRef.current.contains(e.target as Node)) {
        setExprPopup(null);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [popup, exprPopup]);

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

  const selectedMark = ' shadow-[inset_0_-2px_0_hsl(var(--highlight))]';
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
            className={`word-expression word-clickable${panelItem?.id === `expr-${i}` ? selectedMark : ''}`}
            onClick={(e) => {
              if (isLaptop()) {
                setPanelItem({ kind: 'expr', id: `expr-${i}`, phrase: exprInfo.phrase, english: exprInfo.english, sentence: sentenceForExpr });
                return;
              }
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const { x, anchorY, position } = computePopupPos(rect, 288, 220);
              setExprPopup({ phrase: exprInfo.phrase, english: exprInfo.english, sentence: sentenceForExpr, savedState: 'idle', x, anchorY, position });
            }}
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
              className={`word-expression word-clickable${panelItem?.id === `split-${i}` ? selectedMark : ''}`}
              onClick={(e) => {
                if (isLaptop()) {
                  setPanelItem({
                    kind: 'expr', id: `split-${i}`,
                    phrase: splitEntry.display ?? `${splitEntry.word1} … ${splitEntry.word2}`,
                    english: splitEntry.english,
                    sentence: sent,
                  });
                  return;
                }
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const { x, anchorY, position } = computePopupPos(rect, 288, 220);
                setExprPopup({
                  phrase: splitEntry.display ?? `${splitEntry.word1} … ${splitEntry.word2}`,
                  english: splitEntry.english,
                  sentence: sent,
                  savedState: 'idle',
                  x, anchorY, position,
                });
              }}
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

  async function startRetelling() {
    setRetellingTranscript('');
    setRetellingFeedback(null);
    setRetellingTranslation(null);
    const { outlineStages } = levelConfig;
    const wordEntries = Object.entries(text.words || {}).slice(0, 8).map(([dutch, v]) => ({ dutch, english: v.english }));
    const outline = outlineStages === 2
      ? ['What happens first', 'How the story ends']
      : outlineStages >= 4
      ? ['How the story begins', 'What happens next', 'The key event or problem', 'How the story ends']
      : ['What happens at the beginning', 'What happens in the middle', 'How the story ends'];
    setRetellingData({ outline, key_words: wordEntries });
    setRetellingPhase('loading');
    try {
      const translation = await callClaude(
        'You are a helpful translator. Translate the English text naturally and fluently into simple Russian. Return ONLY the Russian translation, no explanation.',
        text.content,
        400,
      );
      setRetellingTranslation(translation);
    } catch {
      setRetellingTranslation(null);
    }
    setRetellingPhase('ready');
  }

  async function evaluateRetelling() {
    if (!retellingTranscript.trim() || !retellingData) return;
    setRetellingPhase('evaluating');
    try {
      const raw = await callClaude(
        `You are a British English teacher giving feedback on a retelling written in English by a native Russian speaker. ${levelConfig.evalContext}
Write vocabulary_feedback, grammar_feedback and encouragement in simple Russian; quote the student's English words and corrections in English.
IMPORTANT: Evaluate ONLY the language quality — vocabulary richness, grammar accuracy, sentence structure, and word choices. Do NOT mention story content, missing plot points, or what the student forgot to include. The goal is language practice, not comprehension testing.
Return ONLY valid JSON, no markdown:
{"score":1-5,"covered_points":["specific English phrases or words used well (quoted in English)"],"missing_points":[],"vocabulary_feedback":"feedback on word choices only (in Russian)","grammar_feedback":"feedback on grammar and sentence structure only (in Russian)","encouragement":"motivating note about their English language progress (in Russian)"}`,
        `TEXT LEVEL: ${text.level}\n\nORIGINAL STORY (for language reference):\n${text.content}\n\nSTUDENT'S ENGLISH RETELLING:\n${retellingTranscript.trim()}`,
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
    setRetellingTranslation(null);
    setRetellingFeedback(null);
    setRetellingData(null);
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  const quizTotal = text.comprehensionQuestions?.length ?? 0;
  const retrievalTotal = retrievalQuestions.length;
  const retrievalScore = retrievalSubmitted
    ? Object.entries(retrievalAnswers).filter(([qi, ans]) => retrievalQuestions[+qi]?.correct === ans).length
    : 0;

  const wordCount = text.content.split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 100));
  const keyWordCount = Object.keys(keywords).length;
  // Side panel list: the text's key words, then its fixed expressions
  const newWords: [string, string][] = [
    ...Object.entries(keywords),
    ...Object.entries(fixedExpressions).map(([phrase, { english }]) => [phrase, english] as [string, string]),
  ];

  return (
    <WordSelectionContext.Provider value={wordSelection}>
    <div className="animate-fade-in lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10">
    {/* Left column: the text, prev/next and practice exercises */}
    <div className="flex min-w-0 flex-col gap-6">
      {/* Header: back · listen (design: 'text') */}
      <div className="-mx-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="grid h-11 w-11 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary lg:flex lg:w-auto lg:gap-1 lg:rounded-xl lg:px-2.5 lg:text-sm lg:font-medium lg:text-muted-foreground lg:hover:text-foreground"
          aria-label="Back to texts"
        >
          <ChevronLeft className="h-6 w-6 lg:h-5 lg:w-5" />
          <span className="hidden lg:inline">All texts</span>
        </button>
        <button
          type="button"
          onClick={handlePlayText}
          className={`flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors ${
            isPlaying
              ? 'border-primary bg-accent text-accent-foreground'
              : 'border-border bg-card text-foreground hover:bg-secondary'
          }`}
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary" />}
          {isPlaying ? 'Stop' : 'Listen'}
        </button>
      </div>

      {/* Meta + title */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <span className={`level-${text.level.toLowerCase()} rounded-full px-2.5 py-0.5 text-xs font-semibold`}>{text.level}</span>
          <span>
            {readMinutes} min read{keyWordCount > 0 && ` · ${keyWordCount} key word${keyWordCount !== 1 ? 's' : ''}`}
          </span>
        </div>
        <div className="space-y-1">
          <h2 className="font-heading text-[26px] font-semibold leading-tight tracking-[-0.015em] text-foreground lg:text-[38px] lg:leading-[1.15] lg:tracking-[-0.02em]">{text.title}</h2>
          {text.titleTranslation && <p className="text-sm text-muted-foreground">{text.titleTranslation}</p>}
        </div>
      </div>

      {/* Floating phrase-save popup */}
      {popup && (
        <div
          ref={popupRef}
          className="fixed z-[70] animate-fade-in w-56"
          style={{
            left: popup.x,
            top: popup.anchorY,
            transform: popup.position === 'left' ? 'translateY(-50%)' : popup.position === 'above' ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          {/* Up arrow when popup is below the selection */}
          {popup.position === 'below' && (
            <div className="flex justify-center">
              <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-card"
                style={{ filter: 'drop-shadow(0 -1px 0 hsl(var(--border)))' }} />
            </div>
          )}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="space-y-2 p-4">
              <p className="line-clamp-2 font-heading text-lg font-semibold leading-snug text-foreground">{popup.text}</p>
              {popup.translating
                ? <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Translating…</p>
                : <p className="font-heading text-base italic leading-snug text-foreground">{popup.translation || '—'}</p>
              }
            </div>
            <div className="flex flex-col gap-2 px-4 pb-4">
              <button
                onPointerDown={e => { e.stopPropagation(); handleSavePhrase(); }}
                className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                  saveState === 'saved' ? 'border border-border bg-card text-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {saveState === 'saved'
                  ? <><Check className="h-4 w-4" /> Saved to cards</>
                  : <><Plus className="h-4 w-4" /> Add to cards</>
                }
              </button>
              <button
                onPointerDown={e => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent('english-chat-open', { detail: { message: `Explain this English phrase for me: "${popup.text}"` } }));
                  dismissPopup();
                }}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/80"
              >
                <MessageCircleMore className="h-4 w-4" /> Ask Emma about this
              </button>
            </div>
          </div>
          {/* Right arrow when popup is to the left of the selection (desktop) */}
          {popup.position === 'left' && (
            <div
              className="absolute top-1/2 -translate-y-1/2 h-0 w-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-card"
              style={{ right: '-8px', filter: 'drop-shadow(1px 0 0 hsl(var(--border)))' }}
            />
          )}
          {/* Down arrow when popup is above the selection */}
          {popup.position === 'above' && (
            <div className="flex justify-center">
              <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-card"
                style={{ filter: 'drop-shadow(0 1px 0 hsl(var(--border)))' }} />
            </div>
          )}
        </div>
      )}

      {/* Expression popup — positioned near the clicked phrase */}
      {exprPopup && (
        <div
          ref={exprPopupRef}
          className="fixed z-[70] animate-fade-in w-72"
          style={{
            left: exprPopup.x,
            top: exprPopup.anchorY,
            transform: exprPopup.position === 'left' ? 'translateY(-50%)' : exprPopup.position === 'above' ? 'translateY(-100%)' : 'translateY(0)',
          }}
        >
          {/* Up arrow when popup is below the phrase */}
          {exprPopup.position === 'below' && (
            <div className="flex justify-center">
              <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-card"
                style={{ filter: 'drop-shadow(0 -1px 0 hsl(var(--border)))' }} />
            </div>
          )}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            <div className="space-y-2 p-4 pb-3">
              <span className="inline-block rounded-full bg-highlight-soft px-2.5 py-0.5 text-xs font-semibold text-highlight-ink">Expression</span>
              <p className="font-heading text-[22px] font-semibold leading-tight text-foreground">{exprPopup.phrase}</p>
              <p className="font-heading text-[17px] italic text-foreground">{exprPopup.english}</p>
              {exprPopup.sentence && (
                <p className="text-sm leading-relaxed text-muted-foreground">"{exprPopup.sentence}"</p>
              )}
            </div>
            <div className="flex gap-2 px-4 pb-4">
              {(() => {
                const exprKey = exprPopup.phrase.toLowerCase();
                const exprSaved = !!vocabulary[exprKey] && vocabulary[exprKey]?.status !== 'ignored';
                return (
                  <button
                    onClick={() => {
                      if (exprSaved) {
                        removeWord(exprKey);
                        toast(`"${exprPopup.phrase}" removed from cards`, { duration: 3000 });
                      } else {
                        addWord(exprKey, exprPopup.english, { example: exprPopup.sentence });
                        toast(`"${exprPopup.phrase}" saved to learning`, {
                          duration: 4000,
                          action: { label: 'Undo', onClick: () => removeWord(exprKey) },
                        });
                      }
                    }}
                    className={`flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                      exprSaved ? 'border border-border bg-card text-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {exprSaved
                      ? <><Check className="h-4 w-4" /> Saved</>
                      : <><Plus className="h-4 w-4" /> Add to cards</>
                    }
                  </button>
                );
              })()}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('english-chat-open', { detail: { message: `Explain this English expression for me: "${exprPopup.phrase}"` } }));
                  setExprPopup(null);
                }}
                className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/80"
              >
                <MessageCircleMore className="h-4 w-4" /> Ask Emma
              </button>
            </div>
          </div>
          {/* Right arrow when popup is to the left of the phrase (desktop) */}
          {exprPopup.position === 'left' && (
            <div
              className="absolute top-1/2 -translate-y-1/2 h-0 w-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-card"
              style={{ right: '-8px', filter: 'drop-shadow(1px 0 0 hsl(var(--border)))' }}
            />
          )}
          {/* Down arrow when popup is above the phrase */}
          {exprPopup.position === 'above' && (
            <div className="flex justify-center">
              <div className="h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-card"
                style={{ filter: 'drop-shadow(0 1px 0 hsl(var(--border)))' }} />
            </div>
          )}
        </div>
      )}

      {/* Reading text */}
      <div className="relative">
        <Card
          className={`rounded-xl px-5 py-6 md:p-8 lg:border-0 lg:bg-transparent lg:p-0${activeTab !== null ? ' select-none' : ''}${activeTab !== null && !isTextRevealed ? ' cursor-pointer' : ''}`}
          onMouseDown={() => { if (activeTab !== null) setIsTextRevealed(true); }}
          onTouchStart={() => { if (activeTab !== null) setIsTextRevealed(true); }}
          onMouseUp={() => { setIsTextRevealed(false); handleSelectionEnd(); }}
          onTouchEnd={() => { setIsTextRevealed(false); handleSelectionEnd(); }}
          onMouseLeave={() => setIsTextRevealed(false)}
        >
          <div className={`font-heading text-lg leading-[1.9] text-foreground lg:text-xl lg:leading-[1.75] transition-[filter] duration-150${activeTab !== null && !isTextRevealed ? ' blur-sm' : ''}`}>
            {renderText()}
          </div>
          {text.grammarNote && (
            <div className="mt-6 flex lg:mt-8 gap-3 rounded-xl bg-accent px-4 py-3.5">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent-foreground">Grammar spotlight</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{text.grammarNote}</p>
              </div>
            </div>
          )}
        </Card>
        {activeTab !== null && !isTextRevealed && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl">
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
              <Eye className="h-3.5 w-3.5" /> Press to read
            </span>
          </div>
        )}
      </div>

      {/* Previous / next text (design: 'text' — "Next page" bar). Phones: after the
          exercises; laptops: right under the text, as in FlowDesktop 'read'. */}
      {(onPrev || onNext) && (
        <div className="order-last flex items-center gap-3 pt-2 lg:order-none lg:justify-between lg:pt-0">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary lg:flex lg:h-[46px] lg:w-auto lg:gap-2 lg:px-[18px] lg:text-[15px] lg:font-semibold"
              aria-label="Previous text"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden lg:inline">Previous</span>
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card text-[15px] font-semibold text-foreground transition-colors hover:bg-secondary lg:ml-auto lg:h-[46px] lg:flex-none lg:border-primary lg:bg-primary lg:px-5 lg:text-primary-foreground lg:hover:bg-primary/90"
            >
              Next text <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* ── Practice exercises ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Practice exercises</p>
          {activeTab !== null && (
            <button
              onClick={() => { setActiveTab(null); setIsTextRevealed(false); }}
              className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
            >
              <X className="h-3 w-3" /> Exit task
            </button>
          )}
        </div>

        {/* Tab row — centered, wraps on very small screens */}
        <div className="flex gap-2 flex-wrap justify-center pb-1">
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
              {quizSubmitted && <span className="text-[10px] text-success font-bold">✓</span>}
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
              {retrievalSubmitted && <span className="text-[10px] text-success font-bold">{retrievalScore}/{retrievalTotal}</span>}
            </button>
          )}

          {/* 3 — Cloze */}
          {clozeSegments.filter(s => s.type === 'blank').length > 0 && (
            <button
              onClick={() => setActiveTab(activeTab === 'cloze' ? null : 'cloze')}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
                activeTab === 'cloze' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
              }`}
            >
              <PenLine className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">Fill Gap</span>
              {clozeSubmitted && <span className="text-[10px] text-success font-bold">✓</span>}
            </button>
          )}

          {/* 4 — Sentence builder */}
          {builderSentences.length > 0 && (
            <button
              onClick={() => setActiveTab(activeTab === 'builder' ? null : 'builder')}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
                activeTab === 'builder' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
              }`}
            >
              <Shuffle className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-tight">Order</span>
              {builderDone && <span className="text-[10px] text-success font-bold">✓</span>}
            </button>
          )}

          {/* 5 — Retell */}
          <button
            onClick={() => {
              setActiveTab(activeTab === 'retell' ? null : 'retell');
              if (activeTab !== 'retell' && retellingPhase === 'idle') startRetelling();
            }}
            className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 px-3 text-center transition-all shrink-0 min-w-[72px] ${
              activeTab === 'retell' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/40 text-muted-foreground'
            }`}
          >
            <Mic className="h-5 w-5" />
            <span className="text-[11px] font-semibold leading-tight">Retell</span>
            {retellingPhase === 'feedback' && <span className="text-[10px] text-success font-bold">✓</span>}
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
                {q.questionTranslation && (
                  <p className="-mt-1 text-xs text-muted-foreground">{q.questionTranslation}</p>
                )}
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
              Choose the English word that matches each meaning.
              {' '}<span className="font-medium">{levelConfig.maxOptions} choices</span> · {retrievalTotal} questions ({text.level})
            </p>
            {retrievalQuestions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  What is the English word for <span className="font-bold">"{q.english}"</span>?
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
                          isCorrect ? 'border-success text-success' :
                          isWrong   ? 'border-destructive text-destructive' :
                          'border-primary/60 focus:border-primary'
                        }`}
                      />
                      {isWrong && (
                        <span className="text-[10px] font-semibold text-success leading-none mt-0.5">{seg.content}</span>
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
                  <p className={`text-sm font-semibold ${correctCount === blanks.length ? 'text-success' : 'text-foreground'}`}>
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
              <p className="text-xs text-muted-foreground -mt-2">Tap the words in the correct order.</p>

              {/* Answer area */}
              <div className="min-h-[52px] rounded-xl border-2 border-dashed border-primary/30 bg-accent/40 p-3 flex flex-wrap gap-1.5 items-center">
                {selectedWords.length === 0
                  ? <span className="text-xs text-muted-foreground italic">Tap words below to build the sentence…</span>
                  : selectedWords.map((w, pos) => (
                    <button
                      key={pos}
                      onClick={() => handleAnswerTap(pos)}
                      className={`rounded-lg px-2.5 py-1 text-sm font-medium border transition-all active:scale-95 ${
                        builderChecked
                          ? isCorrect ? 'bg-success/10 border-success text-success' : 'bg-destructive/10 border-destructive text-destructive'
                          : 'bg-accent border-primary/40 text-accent-foreground hover:bg-accent/70'
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
                      <span className="font-semibold text-success">Correct: </span>
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

            {/* Loading translation */}
            {retellingPhase === 'loading' && (
              <div className="flex items-center gap-2 py-4 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Preparing translation…</span>
              </div>
            )}

            {/* Ready — write retelling */}
            {retellingPhase === 'ready' && retellingData && (
              <div className="space-y-4">
                    {/* Russian translation */}
                {retellingTranslation && (
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Russian translation</p>
                    <div className="rounded-xl border border-border bg-background p-3">
                      <p className="text-sm text-foreground/80 leading-relaxed">{retellingTranslation}</p>
                    </div>
                  </div>
                )}

                {/* Key words */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Key words & phrases</p>
                  <div className="flex flex-wrap gap-2">
                    {retellingData.key_words.map((kw, i) => (
                      <div key={i} className="rounded-lg border border-border bg-background px-2.5 py-1.5">
                        <span className="text-sm font-semibold text-foreground">{kw.dutch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outline */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Outline</p>
                  <ol className="space-y-1.5">
                    {retellingData.outline.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                        {pt}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Text input */}
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Your retelling in English</p>
                  <Textarea
                    value={retellingTranscript}
                    onChange={e => setRetellingTranscript(e.target.value)}
                    placeholder="Write the story in your own English words…"
                    className="text-sm min-h-[110px]"
                  />
                  <Button
                    className="w-full"
                    onClick={() => setRetellingPhase('submitted')}
                    disabled={!retellingTranscript.trim()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}

            {/* Submitted — compare original with retelling */}
            {retellingPhase === 'submitted' && retellingData && (
              <div className="space-y-4 animate-fade-in">
                {/* Unblurred original */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Original</p>
                  <div className="rounded-xl border border-success/30 bg-success/5 p-3">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{text.content}</p>
                  </div>
                </div>

                {/* Student's retelling */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Your retelling</p>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{retellingTranscript}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setRetellingPhase('ready')}>
                    <PenLine className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button className="flex-1 gap-2" onClick={evaluateRetelling}>
                    <Sparkles className="h-4 w-4" /> Get AI feedback
                  </Button>
                </div>
              </div>
            )}

            {/* Evaluating */}
            {retellingPhase === 'evaluating' && (
              <div className="flex items-center gap-2 py-4 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Evaluating your retelling…</span>
              </div>
            )}

            {/* Feedback */}
            {retellingPhase === 'feedback' && retellingFeedback && retellingData && (
              <div className="space-y-4 animate-fade-in">
                {/* Score */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} className={`h-5 w-5 ${n <= retellingFeedback.score ? 'fill-highlight text-highlight' : 'text-border'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{retellingFeedback.score}/5</span>
                </div>

                {retellingFeedback.covered_points.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-success flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> What you covered</p>
                    {retellingFeedback.covered_points.map((p, i) => (
                      <p key={i} className="text-xs text-foreground ml-4">✓ {p}</p>
                    ))}
                  </div>
                )}

                {retellingFeedback.missing_points.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-highlight-ink flex items-center gap-1"><XCircle className="h-3.5 w-3.5" /> To work on</p>
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

                {/* Compare texts */}
                <details className="rounded-xl border border-border overflow-hidden">
                  <summary className="cursor-pointer px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide bg-secondary/30 hover:bg-secondary/50 transition-colors flex items-center gap-1.5">
                    <Eye className="h-3 w-3" /> Compare texts
                  </summary>
                  <div className="p-3 space-y-3">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Original</p>
                      <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">{text.content}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Your retelling</p>
                      <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">{retellingTranscript}</p>
                    </div>
                  </div>
                </details>

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

    {/* Laptop side panel (design: FlowDesktop 'read'): selected word + new words on this page */}
    <aside className="hidden lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100dvh-7.5rem)] lg:flex-col lg:gap-6 lg:overflow-y-auto lg:rounded-xl lg:border lg:border-border lg:bg-card lg:p-6">
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">Selected word</span>
        {panelItem?.kind === 'word' && (
          <WordDetails key={panelItem.id} {...panelItem.details} />
        )}
        {panelItem?.kind === 'expr' && (() => {
          const exprKey = panelItem.phrase.toLowerCase();
          const exprSaved = !!vocabulary[exprKey] && vocabulary[exprKey]?.status !== 'ignored';
          return (
            <div key={panelItem.id} className="flex flex-col gap-3">
              <span className="self-start rounded-full bg-highlight-soft px-2.5 py-0.5 text-xs font-semibold text-highlight-ink">Expression</span>
              <span className="break-words font-heading text-[26px] font-semibold leading-tight text-foreground">{panelItem.phrase}</span>
              <span className="font-heading text-[19px] italic text-foreground">{panelItem.english}</span>
              {panelItem.sentence && (
                <p className="text-sm leading-relaxed text-muted-foreground">"{panelItem.sentence}"</p>
              )}
              <button
                type="button"
                onClick={() => {
                  if (exprSaved) {
                    removeWord(exprKey);
                    toast(`"${panelItem.phrase}" removed from cards`, { duration: 3000 });
                  } else {
                    addWord(exprKey, panelItem.english, { example: panelItem.sentence });
                    toast(`"${panelItem.phrase}" saved to learning`, {
                      duration: 4000,
                      action: { label: 'Undo', onClick: () => removeWord(exprKey) },
                    });
                  }
                }}
                aria-pressed={exprSaved}
                className={`mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-all active:scale-[0.98] ${
                  exprSaved ? 'border border-border bg-card text-foreground hover:bg-secondary' : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {exprSaved
                  ? <><Check className="h-[18px] w-[18px]" /> Saved to cards</>
                  : <><Plus className="h-[18px] w-[18px]" /> Add to cards</>}
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('english-chat-open', { detail: { message: `Explain this English expression for me: "${panelItem.phrase}"` } }))}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80"
              >
                <MessageCircleMore className="h-4 w-4" /> Ask Emma
              </button>
            </div>
          );
        })()}
        {!panelItem && (
          <p className="rounded-xl border border-dashed border-border px-3.5 py-3 text-sm leading-snug text-muted-foreground">
            Tap any word in the text to see its translation here.
          </p>
        )}
      </div>

      {newWords.length > 0 && (
        <div className="flex flex-col">
          <span className="pb-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">New words on this page</span>
          {newWords.map(([w, ru]) => (
            <div key={w} className="flex justify-between gap-3 border-t border-border py-2.5">
              <span className="font-heading text-base font-semibold text-foreground">{w}</span>
              <span className="text-right text-sm text-muted-foreground">{ru}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
    </div>
    </WordSelectionContext.Provider>
  );
}
