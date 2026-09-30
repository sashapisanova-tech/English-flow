import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TaskFilters, Level } from './TaskFilters';
import { claudeFetch } from '@/lib/ai';


// ─── Types ────────────────────────────────────────────────────────────────────

interface GapItem {
  sourceTitle: string;
  before: string;
  answer: string;       // correct answer, lowercase
  after: string;
  hint: string;         // empty = no hint shown
  explanation: string;  // "werkt — hij is third person singular, so werk + t"
  gapType: 'verb' | 'article' | 'preposition' | 'particle' | 'noun';
}

// ─── Gap generation ───────────────────────────────────────────────────────────

async function generateGaps(
  completedTexts: { title: string; sentences: string[] }[],
  weakWords: { word: string; stability: number }[],
  level: Level,
): Promise<GapItem[]> {

  // Pick up to 10 candidate sentences (4–14 words, from up to 3 texts)
  const candidates: { title: string; sentence: string }[] = [];
  for (const t of completedTexts.slice(0, 4)) {
    for (const s of t.sentences) {
      const wc = s.trim().split(/\s+/).length;
      if (wc >= 4 && wc <= 14) candidates.push({ title: t.title, sentence: s.trim() });
    }
    if (candidates.length >= 12) break;
  }

  if (candidates.length === 0) throw new Error('NO_SENTENCES');

  const weakWordList = weakWords.slice(0, 10).map(w => w.word).join(', ');

  const levelGuide = level === 'A1'
    ? `A1 rules:
- ONLY target: present-tense verb conjugations and very common prepositions (op, naar, bij, in, met, van).
- Hint format for verbs: "infinitive / subject pronoun" — e.g. "werken / hij".
- Hint for prepositions: English meaning — e.g. "to / towards".
- Do NOT target articles at A1.`
    : `A2 rules:
- Target (in priority order): verb conjugations, articles (de/het), prepositions, separable verb particles, subordinate clause final verb position.
- Hint for verbs: "infinitive / subject pronoun".
- Hint for articles: "" (empty — learner must recall with no hint).
- Hint for prepositions: English meaning.
- Hint for particles/word-order: short English description — e.g. "separable particle" or "verb at end".`;

  const system = `You are a Dutch grammar teacher building gap-fill exercises.

${levelGuide}

Gap selection priority:
1. Conjugated finite verb (highest priority)
2. Article (de / het) — A2 only
3. Preposition
4. Separable verb prefix/particle
5. Noun — ONLY if it appears in the weak-word list: [${weakWordList}]

Rules:
- Gap EXACTLY one word per sentence.
- Never gap a proper noun, name, or punctuation.
- Explanation format: "correct_word — reason" (max 12 words). Examples:
  "werkt — hij is third person singular, so werk + t"
  "het — muziek compound nouns often take het"
  "op — use op for days and fixed locations"
- If no suitable grammar target exists in a sentence, skip it.
- Return exactly 6 items if possible (fewer if not enough good sentences).

Return ONLY a JSON array — no markdown, no explanation:
[
  {
    "sourceTitle": "title of the text",
    "before": "sentence text before the gap",
    "answer": "the gapped word in lowercase",
    "after": "sentence text after the gap",
    "hint": "hint string or empty string",
    "explanation": "word — reason",
    "gapType": "verb|article|preposition|particle|noun"
  }
]`;

  const userMsg = candidates
    .map((c, i) => `${i + 1}. [${c.title}] ${c.sentence}`)
    .join('\n');

  const res = await claudeFetch({
    method: 'POST',
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim()
    .replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const parsed = JSON.parse(raw) as GapItem[];
  return parsed.filter(g => g.before !== undefined && g.answer && g.after !== undefined);
}

// ─── Sub-component: one gap input ────────────────────────────────────────────

interface GapInputProps {
  gap: GapItem;
  index: number;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  isCorrect: boolean | null;
}

function GapInput({ gap, index, value, onChange, submitted, isCorrect }: GapInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!submitted) inputRef.current?.focus();
  }, [submitted]);

  const borderColor =
    !submitted ? 'border-primary/50 focus:border-primary' :
    isCorrect  ? 'border-emerald-500' : 'border-red-400';

  const textColor =
    !submitted ? 'text-foreground' :
    isCorrect  ? 'text-emerald-700' : 'text-red-700';

  return (
    <div className="space-y-2">
      {/* Sentence with gap */}
      <div className="rounded-xl bg-secondary/30 px-4 py-3 text-sm leading-relaxed">
        <span className="text-muted-foreground text-xs font-medium mr-2">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span>{gap.before}</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={submitted}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={gap.hint || '…'}
          className={`mx-1 inline-block w-24 rounded border-b-2 bg-transparent px-1 py-0 text-sm text-center outline-none transition-colors ${borderColor} ${textColor} placeholder:text-muted-foreground/40 placeholder:text-[11px]`}
        />
        <span>{gap.after}</span>
      </div>

      {/* Feedback — only after submit */}
      {submitted && isCorrect === true && (
        <div className="flex items-center gap-2 px-1">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span className="text-xs font-medium text-emerald-700">Correct</span>
        </div>
      )}
      {submitted && isCorrect === false && (
        <div className="flex items-start gap-2 px-1">
          <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">
            <span className="font-semibold text-foreground">{gap.explanation}</span>
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GapFillTask({ onBack }: { onBack: () => void }) {
  const { texts, vocabulary } = useLearning();

  // Derive completed texts → sentences
  const completedTexts = useMemo(() =>
    texts
      .filter(t => t.completed)
      .slice(-5)
      .map(t => ({
        title: t.title,
        sentences: (t.content.match(/[^.!?]+[.!?]+/g) ?? []).map(s => s.trim()),
      })),
    [texts]
  );

  // Derive weak vocabulary
  const weakWords = useMemo(() =>
    Object.values(vocabulary)
      .filter(w => w.stability !== undefined ? w.stability < 5 : w.status === 'learning')
      .sort((a, b) => (a.stability ?? 0) - (b.stability ?? 0))
      .slice(0, 15)
      .map(w => ({ word: w.dutch, stability: w.stability ?? 0 })),
    [vocabulary]
  );

  const [level, setLevel] = useState<Level>('A1');
  const [gaps, setGaps] = useState<GapItem[]>([]);
  const [pairStart, setPairStart] = useState(0);       // index of first gap in current pair
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const currentPair = gaps.slice(pairStart, pairStart + 2);
  const hasMore = pairStart + 2 < gaps.length;

  function norm(s: string) {
    return s.toLowerCase().trim().replace(/[.,!?;:]/g, '');
  }

  const scores = currentPair.map((gap, i) =>
    norm(answers[pairStart + i] ?? '') === norm(gap.answer)
  );

  async function handleStart() {
    setLoading(true);
    setError(null);
    setGaps([]);
    setPairStart(0);
    setAnswers({});
    setSubmitted(false);
    try {
      const result = await generateGaps(completedTexts, weakWords, level);
      if (result.length === 0) throw new Error('Could not find suitable sentences. Try completing more texts first.');
      setGaps(result);
      setStarted(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(
        msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' :
        msg === 'NO_SENTENCES' ? 'Complete some reading texts first — gaps are generated from texts you have read.' :
        msg
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCheck() {
    if (currentPair.some((_, i) => !(answers[pairStart + i] ?? '').trim())) return;
    setSubmitted(true);
  }

  function handleContinue() {
    setPairStart(p => p + 2);
    setAnswers({});
    setSubmitted(false);
  }

  function handleReset() {
    setGaps([]);
    setPairStart(0);
    setAnswers({});
    setSubmitted(false);
    setStarted(false);
    setError(null);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="animate-fade-in space-y-4 pb-6">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Tasks
      </button>

      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">Gap Fill</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Fill in the grammar gaps from texts you've already read.
        </p>
      </div>

      {/* Config screen */}
      {!started && (
        <div className="space-y-4">
          <Card className="p-4">
            <TaskFilters
              level={level}
              theme="Dagelijks leven"
              onLevelChange={setLevel}
              onThemeChange={() => {}}
              hideTheme
            />
          </Card>

          {completedTexts.length === 0 ? (
            <Card className="p-5 text-center space-y-2">
              <p className="font-medium text-foreground">No completed texts yet</p>
              <p className="text-sm text-muted-foreground">
                Finish at least one reading text — gaps will be pulled from sentences you have already read.
              </p>
            </Card>
          ) : (
            <>
              <Card className="p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sentences from</p>
                <div className="flex flex-wrap gap-1.5">
                  {completedTexts.map(t => (
                    <span key={t.title} className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs text-foreground">
                      {t.title}
                    </span>
                  ))}
                </div>
              </Card>

              <Button
                className="w-full gap-2 py-5 text-base font-semibold"
                onClick={handleStart}
                disabled={loading}
              >
                {loading
                  ? 'Preparing gaps…'
                  : <><Sparkles className="h-5 w-5" /> Generate gap-fill</>
                }
              </Button>
            </>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}
        </div>
      )}

      {/* Exercise screen */}
      {started && gaps.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          {/* Progress */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>From: <span className="font-medium text-foreground">{currentPair[0]?.sourceTitle}</span></span>
            <span>{Math.min(pairStart + 2, gaps.length)} / {gaps.length}</span>
          </div>

          {/* Gap inputs */}
          <div className="space-y-3">
            {currentPair.map((gap, i) => (
              <GapInput
                key={pairStart + i}
                gap={gap}
                index={i}
                value={answers[pairStart + i] ?? ''}
                onChange={v => setAnswers(prev => ({ ...prev, [pairStart + i]: v }))}
                submitted={submitted}
                isCorrect={submitted ? scores[i] : null}
              />
            ))}
          </div>

          {/* Actions */}
          {!submitted ? (
            <Button
              className="w-full"
              onClick={handleCheck}
              disabled={currentPair.some((_, i) => !(answers[pairStart + i] ?? '').trim())}
            >
              Check
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1.5" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" /> Restart
              </Button>
              {hasMore ? (
                <Button className="flex-1" onClick={handleContinue}>
                  Next 2 →
                </Button>
              ) : (
                <Button className="flex-1" onClick={handleReset}>
                  Done · New session
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
