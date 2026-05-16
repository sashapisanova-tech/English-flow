import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

const GENERATE_SYSTEM = `You are a Dutch language teacher creating translation exercises for A1–A2 learners.
Given a list of Dutch vocabulary words the student has saved, write a short English paragraph (4–6 sentences) whose meaning naturally uses those words' English equivalents.
The student will translate this paragraph back into Dutch — so write English that can be cleanly translated using those Dutch words.

Rules:
- Simple, clear English. Short sentences (6–10 words each).
- Coherent narrative with a beginning and small resolution.
- Do NOT include Dutch words in the English text.

Return ONLY this JSON, nothing else:
{
  "english_text": "the paragraph in English",
  "hint_words": [
    { "dutch": "dutchWord", "english": "contextual English meaning", "in_flashcards": false }
  ]
}
hint_words: up to 6 Dutch words from the input list. For each, provide the Dutch word, its contextual English meaning in this specific text (not a generic dictionary definition), and set in_flashcards to false (the app will set this).`;

const CHECK_SYSTEM = `You are a Dutch language tutor checking a student's English-to-Dutch translation.
You will receive the English original, the student's Dutch attempt, and the target vocabulary they should use.

Evaluate:
1. Overall meaning — did they capture it?
2. Grammar errors: word order (V2 rule), verb conjugation, articles (de/het), spelling
3. Did they use the target Dutch vocabulary?

Return ONLY this JSON, nothing else:
{
  "score": "one short encouraging sentence about their effort",
  "corrections": [
    { "original": "wrong phrase from student", "corrected": "correct version", "explanation": "why, in simple English (max 15 words)" }
  ],
  "model_translation": "a clean Dutch translation of the English text",
  "words_used": ["dutchWord1", "dutchWord2"]
}
corrections can be [] if there are no errors. words_used lists the hint_words the student successfully used.`;

interface HintWord {
  dutch: string;
  english: string;
  in_flashcards: boolean;
}

interface GenerateResponse {
  english_text: string;
  hint_words: HintWord[];
}

interface CheckResponse {
  score: string;
  corrections: { original: string; corrected: string; explanation: string }[];
  model_translation: string;
  words_used: string[];
}

async function generateText(words: string[]): Promise<GenerateResponse> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: GENERATE_SYSTEM,
      messages: [{ role: 'user', content: `words: ${JSON.stringify(words)}` }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as GenerateResponse;
}

async function checkTranslation(english: string, dutch: string, hints: HintWord[]): Promise<CheckResponse> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');
  const userMsg = `English original: ${english}\nStudent's Dutch: ${dutch}\nTarget vocabulary: ${JSON.stringify(hints.map(h => h.dutch))}`;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: CHECK_SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as CheckResponse;
}

export function TranslateChallengeTask({ onBack }: { onBack: () => void }) {
  const { vocabulary } = useLearning();
  const savedWords = useMemo(() => Object.keys(vocabulary), [vocabulary]);

  const [generated, setGenerated] = useState<GenerateResponse | null>(null);
  const [studentText, setStudentText] = useState('');
  const [feedback, setFeedback] = useState<CheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVocab, setShowVocab] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setGenerated(null);
    setFeedback(null);
    setStudentText('');
    try {
      const result = await generateText(savedWords);
      // Mark which hint words the student already has in flashcards
      result.hint_words = result.hint_words.map(h => ({
        ...h,
        in_flashcards: !!vocabulary[h.dutch.toLowerCase()],
      }));
      setGenerated(result);
      setShowVocab(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Tasks → My Story first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheck() {
    if (!generated || !studentText.trim()) return;
    setLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const result = await checkTranslation(generated.english_text, studentText, generated.hint_words);
      setFeedback(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Tasks → My Story first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setGenerated(null);
    setStudentText('');
    setFeedback(null);
    setError(null);
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">{savedWords.length} words saved</Badge>
      </div>

      {/* Info card */}
      <Card className="bg-teal-50 border-teal-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🔄</span>
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Translate to Dutch</span>
        </div>
        <p className="text-xs text-teal-700">
          Claude writes a short English text using your saved words. Read it, then write your Dutch translation. Get instant AI feedback.
        </p>
      </Card>

      {savedWords.length === 0 ? (
        <Card className="p-6 text-center space-y-2">
          <p className="text-2xl">📚</p>
          <p className="font-medium text-foreground">No saved words yet</p>
          <p className="text-sm text-muted-foreground">Save words from reading texts first, then come back here.</p>
        </Card>
      ) : (
        <>
          {/* Step 1: generate */}
          {!generated && (
            <Button className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
              {loading ? <><span className="animate-spin">⏳</span> Generating text…</> : <><Sparkles className="h-4 w-4" /> Generate English text</>}
            </Button>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}

          {/* Step 2: read + translate */}
          {generated && !feedback && (
            <div className="space-y-3 animate-fade-in">
              <Card className="p-4 space-y-3 bg-blue-50 border-blue-200">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">English text — translate this to Dutch</p>
                <p className="text-sm leading-relaxed text-foreground">{generated.english_text}</p>
              </Card>

              {generated.hint_words.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowVocab(v => !v)}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    <span>📖 Vocabulary helper ({generated.hint_words.filter(h => !h.in_flashcards).length} new words)</span>
                    {showVocab ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </button>

                  {showVocab && (
                    <Card className="p-3 space-y-2 animate-fade-in">
                      {generated.hint_words.map((h, i) => (
                        <div key={i} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold text-sm ${h.in_flashcards ? 'text-orange-600' : 'text-foreground'}`}>{h.dutch}</span>
                            {h.in_flashcards && <span className="text-xs text-orange-500">(saved)</span>}
                          </div>
                          <span className="text-sm text-muted-foreground text-right">{h.english}</span>
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground pt-1 border-t border-border">
                        <span className="text-orange-600 font-medium">Orange</span> = already in your flashcards
                      </p>
                    </Card>
                  )}
                </div>
              )}

              <textarea
                value={studentText}
                onChange={e => setStudentText(e.target.value)}
                placeholder="Write your Dutch translation here…"
                className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                rows={6}
              />

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-1.5" /> New text
                </Button>
                <Button className="flex-1" onClick={handleCheck} disabled={loading || !studentText.trim()}>
                  {loading ? '⏳ Checking…' : 'Check translation'}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: feedback */}
          {feedback && generated && (
            <div className="space-y-3 animate-fade-in">
              <Card className="bg-blue-50 border-blue-200 p-4">
                <p className="text-sm text-blue-800 font-medium">{feedback.score}</p>
              </Card>

              {feedback.corrections.length > 0 ? (
                <Card className="p-4 space-y-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Corrections</h3>
                  {feedback.corrections.map((c, i) => (
                    <div key={i} className="space-y-1 pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-red-700 line-through">{c.original}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-green-700">{c.corrected}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">{c.explanation}</p>
                    </div>
                  ))}
                </Card>
              ) : (
                <Card className="p-4">
                  <p className="text-sm text-green-700 font-medium">✅ No errors — great translation!</p>
                </Card>
              )}

              <Card className="p-4 space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Model translation</h3>
                <p className="text-sm leading-relaxed text-foreground">{feedback.model_translation}</p>
              </Card>

              {feedback.words_used.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                    Words you used correctly ({feedback.words_used.length}/{generated.hint_words.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {feedback.words_used.map((w, i) => (
                      <span key={i} className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">{w}</span>
                    ))}
                  </div>
                </div>
              )}

              <Button className="w-full gap-2" onClick={handleReset}>
                <RotateCcw className="h-3.5 w-3.5" /> Try another text
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
