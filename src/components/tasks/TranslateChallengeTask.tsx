import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookmarkPlus, X, ChevronDown, ChevronRight, Loader2, Pencil } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useCustomSets } from '@/hooks/useCustomSets';
import { useAuth } from '@/context/AuthContext';
import { Level, SetupHeader, SectionLabel, LevelSegmented, TopicChip, SetupFooter } from '@/components/tasks/TaskFilters';
import { savePracticeSession } from '@/lib/practiceSession';
import { PREPARED_LEVELS, getAllPreparedSets } from '@/data/preparedSets';
import { claudeFetch } from '@/lib/ai';

async function callClaude(system: string, user: string, maxTokens = 800): Promise<string> {
  const res = await claudeFetch({
    method: 'POST',
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  return data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'config' | 'translate' | 'feedback';
type Rating = 'easy' | 'hard';

interface GeneratedText {
  english: string;  // source text to translate (in Russian)
  hintWords: { english: string; dutch: string }[];  // english = Russian word from the text, dutch = English translation
}

interface Correction {
  original: string;
  corrected: string;
  tip: string;
}

interface TranslationFeedback {
  overallComment: string;
  corrections: Correction[];
  strengths: string[];
  rating: 'great' | 'good' | 'needs_work';
  grammarTargets: string[];  // for session tracking
}

// ─── Suggestions per level ────────────────────────────────────────────────────

const SUGGESTIONS: Record<Level, string[]> = {
  A1: ['at the bakery', 'my family', 'the weather today', 'at school', 'introducing myself', 'my morning routine', 'shopping for food'],
  A2: ['ordering at a café', 'a trip to the market', 'planning a weekend', 'a day at work', 'at the doctor', 'making plans with a friend', 'a short diary entry'],
  B1: ['a work meeting', 'discussing a news story', 'writing a formal email', 'defending an opinion', 'a job interview', 'life in the UK', 'a neighbourhood dispute'],
};

// Text length per level (matches LEVEL_GUIDE below), shown under the Generate button.
const LEVEL_LENGTH: Record<Level, string> = {
  A1: '3–5 short sentences',
  A2: '5–8 sentences',
  B1: '8–12 sentences',
};

// ─── API: generate English text ───────────────────────────────────────────────

const LEVEL_GUIDE: Record<Level, string> = {
  A1: `You are writing a very short, simple Russian text (3–5 sentences) that an absolute beginner, a native Russian speaker, will translate into British English.
Rules:
- Only simple present tense situations
- Very common vocabulary: everyday objects, basic actions, familiar places
- Short sentences (max 6 words each)
- NO past tense, NO complex grammar, NO subordinate clauses
- It should feel like a mini story or description a child could understand
- Good: "Меня зовут Сара. Я живу в Лондоне. У меня есть кошка. Кошка чёрная и белая. Мы пьём чай каждое утро."`,
  A2: `You are writing a short Russian text (5–8 sentences) for an elementary learner of British English (a native Russian speaker) to translate into English.
Rules:
- Mix of present and simple past tense
- Everyday situations with natural dialogue or narration
- Moderate sentence length (6–12 words)
- Can include common phrasal verbs, basic comparisons, times & days
- Should feel like a short diary entry, conversation recap, or simple story`,
  B1: `You are writing a Russian text (8–12 sentences) for an intermediate learner of British English (a native Russian speaker) to translate into English.
Rules:
- Natural flowing prose — like a short article excerpt, email, or story
- Include "потому что", "когда", "хотя", "пока" type structures
- Can include: present perfect contexts, modal verb situations, relative clauses
- Should feel genuinely useful and interesting to translate`,
};

async function generateText(
  level: Level,
  userPrompt: string,
  flashcardWords: string[],
  vocabContext: string,
  readingContext: string,
): Promise<GeneratedText> {
  const contextLines: string[] = [];

  if (userPrompt.trim()) {
    contextLines.push(`Topic/theme requested by the user: "${userPrompt.trim()}"`);
  }
  if (flashcardWords.length > 0) {
    contextLines.push(`Incorporate situations where these English words are needed in the translation (write their Russian meanings into the text): ${flashcardWords.slice(0, 20).join(', ')}`);
  }
  if (readingContext) {
    contextLines.push(`The learner is currently studying: "${readingContext}". Use related vocabulary and themes if no topic was specified.`);
  }
  if (!userPrompt.trim() && !flashcardWords.length && !readingContext) {
    contextLines.push(`Choose any engaging, everyday topic appropriate for ${level} level.`);
  }
  if (vocabContext) {
    contextLines.push(`English words the learner already knows (do NOT include these in hintWords): ${vocabContext}`);
  }

  const system = `${LEVEL_GUIDE[level]}

Return ONLY valid JSON, no markdown:
{
  "english": "the full Russian text to translate",
  "hintWords": [
    { "english": "Russian word or short phrase from the text", "dutch": "its British English translation" }
  ]
}
For hintWords: scan your Russian text and pick 3–8 content words or short phrases whose English translation the learner likely does NOT know yet (i.e. not in their known vocabulary). These are shown as vocabulary scaffolding. Skip extremely basic words (pronouns, "быть", "иметь", numbers 1–10, days of the week if already known). If the learner's vocabulary is empty, include the most useful/challenging content words from the text.`;

  const raw = await callClaude(system, contextLines.join('\n'), 700);
  return JSON.parse(raw) as GeneratedText;
}

// ─── API: check translation ───────────────────────────────────────────────────

const FEEDBACK_TONE: Record<Level, string> = {
  A1: `Be VERY warm and encouraging. This is a beginner — never list more than 2 corrections. Focus only on the most essential A1 grammar rule. Start with genuine praise. The tone should feel like a kind teacher, not a strict examiner.`,
  A2: `Be friendly and constructive. List 2–4 specific corrections with clear tips. Balance corrections with praise for what worked well.`,
  B1: `Be precise and thorough. Can list up to 5 corrections. Be specific about grammar rules. Still warm but more detailed.`,
};

async function checkTranslation(
  level: Level,
  englishText: string,
  dutchTranslation: string,
): Promise<TranslationFeedback> {
  const system = `You are a British English tutor evaluating a translation from Russian into English by a native Russian speaker. Write overallComment, tips and strengths in simple Russian; quote English phrases as they are. ${FEEDBACK_TONE[level]}

Return ONLY valid JSON, no markdown:
{
  "overallComment": "1–2 warm sentences in Russian summarising the translation quality",
  "corrections": [
    {
      "original": "the phrase the learner wrote (in English)",
      "corrected": "the better British English version",
      "tip": "one short explanation of why, in Russian"
    }
  ],
  "strengths": ["one specific thing they did well (in Russian)", "another if applicable"],
  "rating": "great" | "good" | "needs_work",
  "grammarTargets": ["grammar point 1", "grammar point 2"]
}
Notes:
- corrections: only real errors, not style differences. For A1 max 2, A2 max 4, B1 max 5.
- grammarTargets: the grammar patterns that had errors (e.g. "word order", "articles a/the", "present perfect"). Used for tracking. Empty array if no errors.
- If the translation is empty or clearly not English, set rating to "needs_work" and corrections to one entry asking them to try.`;

  const userMsg = `Level: ${level}

Original Russian text:
"${englishText}"

Learner's English translation:
"${dutchTranslation || '(empty — the learner did not write anything)'}"`;

  const raw = await callClaude(system, userMsg, 900);
  return JSON.parse(raw) as TranslationFeedback;
}

// ─── Save Word Modal ──────────────────────────────────────────────────────────

interface SaveWordModalProps {
  onClose: () => void;
  onSave: (dutch: string, english: string, setId: string) => void;
  onCreateAndSave: (dutch: string, english: string, setTitle: string) => void;
  existingSets: { id: string; title: string; emoji: string }[];
}

function SaveWordModal({ onClose, onSave, onCreateAndSave, existingSets }: SaveWordModalProps) {
  const [dutch, setDutch] = useState('');
  const [english, setEnglish] = useState('');
  const [mode, setMode] = useState<'pick' | 'new'>('pick');
  const [selectedSetId, setSelectedSetId] = useState(existingSets[0]?.id ?? '');
  const [newSetTitle, setNewSetTitle] = useState('');
  const [showSetPicker, setShowSetPicker] = useState(false);
  const selectedSet = existingSets.find(s => s.id === selectedSetId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-md bg-background rounded-2xl p-5 space-y-4 shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="font-heading font-bold text-foreground">Save a word</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-2">
          <input value={dutch} onChange={e => setDutch(e.target.value)} placeholder="English word or phrase…" autoFocus autoComplete="off"
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input value={english} onChange={e => setEnglish(e.target.value)} placeholder="Russian translation (optional)" autoComplete="off"
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <button onClick={() => setMode('pick')} className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${mode === 'pick' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground'}`}>Add to existing</button>
            <button onClick={() => setMode('new')} className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${mode === 'new' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground'}`}>Create new set</button>
          </div>
          {mode === 'pick' && (
            existingSets.length === 0 ? <p className="text-xs text-muted-foreground text-center py-2">No sets yet — create one first.</p> : (
              <div className="relative">
                <button onClick={() => setShowSetPicker(v => !v)} className="w-full flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground">
                  <span>{selectedSet ? `${selectedSet.emoji} ${selectedSet.title}` : 'Choose a set…'}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {showSetPicker && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                    {existingSets.map(s => (
                      <button key={s.id} onClick={() => { setSelectedSetId(s.id); setShowSetPicker(false); }} className="w-full text-left px-3 py-2.5 text-sm hover:bg-muted transition-colors">
                        {s.emoji} {s.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
          {mode === 'new' && (
            <input value={newSetTitle} onChange={e => setNewSetTitle(e.target.value)} placeholder="New set name…" autoComplete="off"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30" />
          )}
        </div>
        <Button className="w-full" onClick={() => {
          if (!dutch.trim()) return;
          if (mode === 'pick' && selectedSetId) onSave(dutch.trim(), english.trim(), selectedSetId);
          else if (mode === 'new' && newSetTitle.trim()) onCreateAndSave(dutch.trim(), english.trim(), newSetTitle.trim());
        }} disabled={!dutch.trim() || (mode === 'pick' && !selectedSetId) || (mode === 'new' && !newSetTitle.trim())}>
          Save to flashcards
        </Button>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded-lg ${className}`} />;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TranslateChallengeTask({ onBack }: { onBack: () => void }) {
  const { vocabulary, texts } = useLearning();
  const { sets, addWordToSet, createSet } = useCustomSets();
  const { user } = useAuth();

  // ── Config ────────────────────────────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>('config');
  const [level, setLevel] = useState<Level>('A2');
  const [userPrompt, setUserPrompt] = useState('');
  const [useFlashcardSet, setUseFlashcardSet] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  // prepared-set picker state
  const [selectedSetSource, setSelectedSetSource] = useState<'my' | 'prepared' | null>(null);
  const [selectedPreparedSetId, setSelectedPreparedSetId] = useState<string | null>(null);
  const [openMySets, setOpenMySets] = useState(false);
  const [openPreparedSets, setOpenPreparedSets] = useState(false);
  const [openPreparedLevel, setOpenPreparedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | null>(null);

  // ── Session ───────────────────────────────────────────────────────────────
  const [generatedText, setGeneratedText] = useState<GeneratedText | null>(null);
  const [generating, setGenerating] = useState(false);
  const [userTranslation, setUserTranslation] = useState('');
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState<TranslationFeedback | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSaveWord, setShowSaveWord] = useState(false);

  // ── Derived data ──────────────────────────────────────────────────────────
  const vocabPool = useMemo(() => {
    const fromTexts = texts.filter(t => t.completed).flatMap(t => Object.keys(t.words || {}));
    const saved = Object.values(vocabulary).map(w => w.dutch);
    return [...new Set([...fromTexts, ...saved])].slice(0, 60).join(', ');
  }, [texts, vocabulary]);

  const readingContext = useMemo(() => {
    const completed = texts.filter(t => t.completed);
    return completed.length > 0 ? completed[completed.length - 1].title ?? '' : '';
  }, [texts]);

  const selectedMySet = useMemo(() => sets.find(s => s.id === selectedSetId), [sets, selectedSetId]);
  const selectedPreparedSet = useMemo(() => {
    if (!selectedPreparedSetId) return null;
    return getAllPreparedSets().find(s => s.id === selectedPreparedSetId) ?? null;
  }, [selectedPreparedSetId]);
  const flashcardWords = useMemo(() => {
    if (!useFlashcardSet) return [];
    if (selectedSetSource === 'my') return selectedMySet?.words.map(w => w.dutch) ?? [];
    if (selectedSetSource === 'prepared') return selectedPreparedSet?.words.map(w => w.dutch) ?? [];
    return [];
  }, [useFlashcardSet, selectedSetSource, selectedMySet, selectedPreparedSet]);

  const suggestions = SUGGESTIONS[level];

  // ── Generate text ─────────────────────────────────────────────────────────
  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    setGeneratedText(null);
    setUserTranslation('');
    setFeedback(null);
    setRating(null);
    setScreen('translate');
    try {
      const result = await generateText(level, userPrompt, flashcardWords, vocabPool, readingContext);
      setGeneratedText(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Me → Settings.' : 'Could not generate text. Try again.');
    } finally {
      setGenerating(false);
    }
  }

  // ── Check translation ─────────────────────────────────────────────────────
  async function handleCheck() {
    if (!generatedText) return;
    setChecking(true);
    setError(null);
    try {
      const result = await checkTranslation(level, generatedText.english, userTranslation);
      setFeedback(result);
      setScreen('feedback');

      // Save session for AI tutor
      if (user) {
        savePracticeSession({
          user_id: user.id,
          task_type: 'translate',
          level,
          grammar_focus: userPrompt.trim() || null,
          easy_count: 0,
          hard_count: 0,
          correct_count: result.rating === 'great' ? 1 : 0,
          session_length: 1,
          hard_grammar_targets: result.grammarTargets,
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : '';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Me → Settings.' : 'Could not check translation. Try again.');
    } finally {
      setChecking(false);
    }
  }

  // ── Save word handlers ────────────────────────────────────────────────────
  function handleSaveWord(dutch: string, english: string, setId: string) {
    addWordToSet(setId, { dutch, english });
    setShowSaveWord(false);
  }
  function handleCreateAndSave(dutch: string, english: string, setTitle: string) {
    const newSet = createSet(setTitle, '📚');
    addWordToSet(newSet.id, { dutch, english });
    setShowSaveWord(false);
  }

  // ── After rating — update session ──────────────────────────────────────────
  function handleRate(r: Rating) {
    setRating(r);
    if (user && feedback) {
      savePracticeSession({
        user_id: user.id,
        task_type: 'translate',
        level,
        grammar_focus: userPrompt.trim() || null,
        easy_count: r === 'easy' ? 1 : 0,
        hard_count: r === 'hard' ? 1 : 0,
        correct_count: feedback.rating === 'great' ? 1 : 0,
        session_length: 1,
        hard_grammar_targets: feedback.grammarTargets,
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIG SCREEN
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'config') {
    const promptParts = userPrompt.split(',').map(p => p.trim()).filter(Boolean);
    const toggleSuggestion = (s: string) => setUserPrompt(prev => {
      const parts = prev.split(',').map(p => p.trim()).filter(Boolean);
      return parts.includes(s) ? parts.filter(p => p !== s).join(', ') : (prev.trim() ? `${prev.trim()}, ${s}` : s);
    });
    const selectedSetLabel = selectedSetSource === 'my' && selectedMySet
      ? `${selectedMySet.emoji} ${selectedMySet.title}`
      : selectedSetSource === 'prepared' && selectedPreparedSet
        ? `${selectedPreparedSet.emoji} ${selectedPreparedSet.title}`
        : null;
    const setRowClass = (on: boolean) => `w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${on ? 'bg-accent text-accent-foreground font-semibold' : 'text-foreground hover:bg-muted'}`;

    return (
      <>
      <div className="animate-fade-in flex flex-col gap-[22px]">
        <SetupHeader title="Translate to English" onBack={onBack} />

        {error && <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4"><p className="text-sm text-destructive">{error}</p></div>}

        {/* Level */}
        <div className="flex flex-col gap-2">
          <SectionLabel>Level</SectionLabel>
          <LevelSegmented level={level} onChange={l => { setLevel(l); setUserPrompt(''); }} />
          <p className="text-[13px] text-muted-foreground">
            {level === 'A1' && 'Very simple sentences, everyday vocabulary — great for beginners.'}
            {level === 'A2' && 'Short paragraphs, past tense, everyday situations.'}
            {level === 'B1' && 'Full paragraphs with complex grammar — subordinate clauses, perfect tense.'}
          </p>
        </div>

        {/* Topic — optional */}
        <div className="flex flex-col gap-2.5">
          <SectionLabel>Topic <span className="font-medium normal-case tracking-normal">(optional)</span></SectionLabel>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <TopicChip key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} selected={promptParts.includes(s)} onClick={() => toggleSuggestion(s)} />
            ))}
          </div>
          <label className="flex min-h-[46px] items-start gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3 focus-within:border-primary">
            <Pencil className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <textarea
              value={userPrompt}
              onChange={e => setUserPrompt(e.target.value)}
              placeholder="Or write your own topic"
              rows={1}
              className="min-w-0 flex-1 resize-none bg-transparent text-sm leading-snug text-foreground placeholder:text-muted-foreground focus:outline-none [field-sizing:content]"
            />
          </label>
        </div>

        {/* Flashcard set — optional */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <button
            role="switch"
            aria-checked={useFlashcardSet}
            onClick={() => {
              setUseFlashcardSet(v => !v);
              setSelectedSetId(null);
              setSelectedPreparedSetId(null);
              setSelectedSetSource(null);
              setOpenMySets(false);
              setOpenPreparedSets(false);
              setOpenPreparedLevel(null);
            }}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold text-foreground">Use my flashcard words</span>
              <span className="text-[13px] text-muted-foreground">
                {selectedSetLabel ? <>Words from <span className="font-medium text-foreground">{selectedSetLabel}</span></> : 'Adds words from a set you choose'}
              </span>
            </span>
            <span className={`relative h-[26px] w-11 shrink-0 rounded-full transition-colors ${useFlashcardSet ? 'bg-primary' : 'bg-track'}`}>
              <span className={`absolute top-[3px] h-5 w-5 rounded-full shadow-[0_1px_2px_hsl(var(--foreground)/0.25)] transition-all ${useFlashcardSet ? 'left-[21px] bg-primary-foreground' : 'left-[3px] bg-card'}`} />
            </span>
          </button>

          {useFlashcardSet && (
            <div className="divide-y divide-border border-t border-border">

              {/* ── My sets ── */}
              <div>
                <button
                  onClick={() => setOpenMySets(v => !v)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
                >
                  <span>My sets</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openMySets ? 'rotate-180' : ''}`} />
                </button>
                {openMySets && (
                  <div className="space-y-0.5 px-2 pb-2">
                    {sets.length === 0 ? (
                      <p className="px-2 py-2 text-xs text-muted-foreground">No sets yet — create one in Cards.</p>
                    ) : sets.map(s => (
                      <button key={s.id}
                        onClick={() => { setSelectedSetId(s.id); setSelectedPreparedSetId(null); setSelectedSetSource('my'); }}
                        className={setRowClass(selectedSetSource === 'my' && selectedSetId === s.id)}
                      >
                        {s.emoji} {s.title}
                        <span className="ml-2 text-xs opacity-60">{s.words.length} words</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Prepared sets ── */}
              <div>
                <button
                  onClick={() => setOpenPreparedSets(v => !v)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
                >
                  <span>Prepared sets</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openPreparedSets ? 'rotate-180' : ''}`} />
                </button>
                {openPreparedSets && (
                  <div className="space-y-0.5 px-2 pb-2">
                    {PREPARED_LEVELS.map(lvl => (
                      <div key={lvl.level}>
                        <button
                          onClick={() => lvl.available && setOpenPreparedLevel(openPreparedLevel === lvl.level ? null : lvl.level)}
                          disabled={!lvl.available}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${!lvl.available ? 'cursor-not-allowed opacity-40' : 'hover:bg-muted/50'}`}
                        >
                          <span className={`font-medium ${lvl.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {lvl.level}
                            {!lvl.available && <span className="ml-2 text-xs font-normal text-muted-foreground">coming soon</span>}
                          </span>
                          {lvl.available && (
                            openPreparedLevel === lvl.level
                              ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                              : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </button>

                        {lvl.available && openPreparedLevel === lvl.level && (
                          <div className="mb-1 ml-3 space-y-0.5 border-l border-border pl-2">
                            {lvl.sets.map(s => (
                              <button key={s.id}
                                onClick={() => { setSelectedPreparedSetId(s.id); setSelectedSetId(null); setSelectedSetSource('prepared'); }}
                                className={setRowClass(selectedSetSource === 'prepared' && selectedPreparedSetId === s.id)}
                              >
                                {s.emoji} {s.title}
                                <span className="ml-2 text-xs opacity-60">{s.words.length} words</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <SetupFooter
          label="Generate text"
          caption={`${LEVEL_LENGTH[level]} · takes a few seconds`}
          onClick={handleGenerate}
        />
      </div>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TRANSLATE SCREEN
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'translate') {
    return (
      <>
      <div className="animate-fade-in space-y-4 pb-8">
        <div className="flex items-center justify-between">
          <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{level}</span>
        </div>

        {error && <Card className="border-destructive/30 bg-destructive/5 p-4"><p className="text-sm text-destructive">{error}</p></Card>}

        {/* Source text card */}
        {generating ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            {level !== 'A1' && <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </>}
          </div>
        ) : generatedText ? (
          <Card className="p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Translate this into English</p>
            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{generatedText.english}</p>
            {/* Unknown word hints */}
            {generatedText.hintWords.length > 0 && (
              <div className="pt-2 border-t border-border/50 space-y-1.5">
                <p className="text-xs text-muted-foreground font-medium">New words in this text:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {generatedText.hintWords.map((w, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <span className="text-muted-foreground truncate">{w.english}</span>
                      <span className="text-muted-foreground/40 shrink-0">→</span>
                      <span className="font-medium text-foreground truncate">{w.dutch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : null}

        {/* Translation textarea */}
        {!generating && generatedText && (
          <>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your English translation</p>
              <textarea
                value={userTranslation}
                onChange={e => setUserTranslation(e.target.value)}
                placeholder="Write your English translation here…"
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                rows={level === 'A1' ? 4 : level === 'A2' ? 6 : 9}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <p className="text-xs text-muted-foreground px-1">Take your time — there's no timer. Write as naturally as you can.</p>
            </div>

            <Button
              className="w-full py-5 text-base font-semibold gap-2"
              onClick={handleCheck}
              disabled={checking || !userTranslation.trim()}
            >
              {checking ? <><Loader2 className="h-4 w-4 animate-spin" /> Checking…</> : 'Check my translation'}
            </Button>

            <button onClick={() => setShowSaveWord(true)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mx-auto">
              <BookmarkPlus className="h-3.5 w-3.5" /> Save a word while you work
            </button>
          </>
        )}
      </div>

      {showSaveWord && (
        <SaveWordModal onClose={() => setShowSaveWord(false)} onSave={handleSaveWord} onCreateAndSave={handleCreateAndSave} existingSets={sets} />
      )}
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FEEDBACK SCREEN
  // ─────────────────────────────────────────────────────────────────────────

  if (screen === 'feedback' && feedback) {
    const ratingColors = {
      great: { card: 'border-success/30 bg-success/10', label: 'text-success', badge: 'bg-success/15 text-success' },
      good: { card: 'border-primary/25 bg-accent', label: 'text-accent-foreground', badge: 'bg-card text-accent-foreground' },
      needs_work: { card: 'border-highlight/40 bg-highlight-soft', label: 'text-highlight-ink', badge: 'bg-highlight-soft text-highlight-ink' },
    }[feedback.rating];
    const ratingLabel = { great: 'Great job!', good: 'Good effort!', needs_work: 'Keep going!' }[feedback.rating];

    return (
      <>
      <div className="animate-fade-in space-y-4 pb-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Feedback</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{level}</span>
        </div>

        {/* Overall */}
        <Card className={`p-4 space-y-1 ${ratingColors.card}`}>
          <div className="flex items-center gap-2">
            <p className={`text-xs font-bold uppercase tracking-wide ${ratingColors.label}`}>{ratingLabel}</p>
            <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${ratingColors.badge}`}>{feedback.rating.replace('_', ' ')}</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{feedback.overallComment}</p>
        </Card>

        {/* Strengths */}
        {feedback.strengths.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What you did well</p>
            <ul className="space-y-1">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-success mt-0.5 shrink-0">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Corrections */}
        {feedback.corrections.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {level === 'A1' ? 'One thing to remember' : 'Corrections'}
            </p>
            {feedback.corrections.map((c, i) => (
              <Card key={i} className="p-3 space-y-1.5 border-border">
                <div className="flex gap-2 text-sm flex-wrap">
                  <span className="line-through text-muted-foreground">{c.original}</span>
                  <span className="text-muted-foreground/40">→</span>
                  <span className="font-medium text-foreground">{c.corrected}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.tip}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Your translation (collapsed reference) */}
        <details className="group">
          <summary className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors list-none flex items-center gap-1">
            <span className="group-open:rotate-90 inline-block transition-transform">›</span>
            View your translation
          </summary>
          <Card className="mt-2 p-3 bg-muted/30 border-border">
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{userTranslation}</p>
          </Card>
        </details>

        {/* Easy / Hard */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">How did it feel?</p>
          <div className="flex gap-2">
            <button onClick={() => handleRate('easy')}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${rating === 'easy' ? 'border-success bg-success/10 text-success' : 'border-border text-muted-foreground hover:border-success/50'}`}>
              Easy
            </button>
            <button onClick={() => handleRate('hard')}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${rating === 'hard' ? 'border-highlight bg-highlight-soft text-highlight-ink' : 'border-border text-muted-foreground hover:border-highlight/40'}`}>
              Hard
            </button>
          </div>
        </div>

        {/* Save word */}
        {rating === 'hard' ? (
          <button onClick={() => setShowSaveWord(true)}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-highlight/40 bg-highlight-soft px-3 py-2.5 text-sm font-medium text-highlight-ink hover:bg-highlight-soft transition-colors">
            <BookmarkPlus className="h-4 w-4" /> Save a word from this text
          </button>
        ) : (
          <button onClick={() => setShowSaveWord(true)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <BookmarkPlus className="h-3.5 w-3.5" /> Save a word
          </button>
        )}

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <Button className="w-full" onClick={() => {
            setScreen('config');
            setFeedback(null);
            setRating(null);
            setGeneratedText(null);
            setUserTranslation('');
            setError(null);
          }}>
            Try another text
          </Button>
          <Button variant="outline" className="w-full" onClick={onBack}>Back to Tasks</Button>
        </div>
      </div>

      {showSaveWord && (
        <SaveWordModal onClose={() => setShowSaveWord(false)} onSave={handleSaveWord} onCreateAndSave={handleCreateAndSave} existingSets={sets} />
      )}
      </>
    );
  }

  return null;
}
