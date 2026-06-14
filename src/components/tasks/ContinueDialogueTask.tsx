import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, BookmarkPlus, X, ChevronDown, Loader2, Sparkles } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useCustomSets } from '@/hooks/useCustomSets';
import { useAuth } from '@/context/AuthContext';
import { TaskFilters, Level } from './TaskFilters';
import { savePracticeSession } from '@/lib/practiceSession';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

// ─── Auto-translate helpers (shared with CustomSetEditor) ─────────────────────

async function fetchWordInfo(dutch: string): Promise<{ translation: string; article?: 'de' | 'het' }> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(dutch)}&langpair=nl|en`);
      const data = await res.json();
      return { translation: (data?.responseData?.translatedText as string) || '' };
    } catch { return { translation: '' }; }
  }
  try {
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
        max_tokens: 40,
        system: 'You are a Dutch dictionary. Reply with JSON only, no markdown: {"translation":"<1-4 word English translation>","article":"de" or "het" or null}. Use null for article if the word is not a noun.',
        messages: [{ role: 'user', content: `Dutch word: "${dutch}"` }],
      }),
    });
    if (!res.ok) return { translation: '' };
    const data = await res.json() as { content: { text: string }[] };
    const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(raw) as { translation: string; article?: string | null };
    return {
      translation: parsed.translation || '',
      article: parsed.article === 'de' ? 'de' : parsed.article === 'het' ? 'het' : undefined,
    };
  } catch { return { translation: '' }; }
}

async function generateExample(dutch: string): Promise<string> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') return '';
  try {
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
        max_tokens: 80,
        system: 'You are a Dutch language teacher. Generate ONE short, natural Dutch A1–A2 sentence using the given word. Return ONLY the Dutch sentence — no translation, no explanation.',
        messages: [{ role: 'user', content: `Word: ${dutch}` }],
      }),
    });
    if (!res.ok) return '';
    const data = await res.json() as { content: { text: string }[] };
    return data.content[0].text.trim();
  } catch { return ''; }
}

// ─── Level-aware topic suggestions ───────────────────────────────────────────

const LEVEL_TOPICS: Record<Level, { dutch: string; english: string }[]> = {
  A1: [
    { dutch: 'Bij de bakker',        english: 'At the bakery' },
    { dutch: 'Op straat vragen',     english: 'Asking on the street' },
    { dutch: 'In de supermarkt',     english: 'At the supermarket' },
    { dutch: 'Jezelf voorstellen',   english: 'Introducing yourself' },
    { dutch: 'Het weer',             english: 'The weather' },
  ],
  A2: [
    { dutch: 'In het café bestellen', english: 'Ordering at a café' },
    { dutch: 'Met de tram',           english: 'Taking the tram' },
    { dutch: 'Bij de dokter',         english: 'At the doctor' },
    { dutch: 'Een afspraak maken',    english: 'Making an appointment' },
    { dutch: 'Op het werk',           english: 'At work' },
  ],
  B1: [
    { dutch: 'Een discussie op het werk', english: 'A work discussion' },
    { dutch: 'Nieuws bespreken',          english: 'Discussing the news' },
    { dutch: 'Een klacht indienen',       english: 'Filing a complaint' },
    { dutch: 'Plannen voor het weekend',  english: 'Weekend plans' },
    { dutch: 'Een mening verdedigen',     english: 'Defending an opinion' },
  ],
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface AiTurn   { role: 'ai';   dutch: string; english: string; }
interface UserTurn { role: 'user'; text: string; }
type Message = AiTurn | UserTurn;

interface AiResponse { dutch: string; english: string; }

interface GrammarReview {
  overallImpression: string;
  strongPoints: string[];
  patternErrors: {
    type: string;
    typeDutch: string;
    example: string;
    correction: string;
    reason: string;
    reasonDutch: string;
  }[];
  oneThingToFocus: string;
  oneThingToFocusDutch: string;
}

const MAX_USER_TURNS = 5;

// ─── System prompt ────────────────────────────────────────────────────────────

function makeSystemPrompt(level: Level, topic: string): string {
  const levelGuide =
    level === 'A1'
      ? 'Use simple present tense, common vocabulary, short sentences.'
      : 'May use past tense, subordinate clauses.';

  return `You are a friendly Dutch conversation partner. Hold a natural, encouraging conversation in Dutch with a learner. Keep messages short (1–3 sentences). Stay on the given topic. Do NOT correct grammar mid-conversation — respond naturally. After exactly 5 learner messages, end the conversation warmly and write [END_CONVERSATION] on a new line.
${levelGuide}
Never switch to English. If learner writes English: respond 'Probeer het in het Nederlands!'
Topic: ${topic}

Return each response as JSON: {"dutch":"...","english":"..."}`;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function getOpeningMessage(level: Level, topic: string): Promise<AiResponse> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
    body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 256, system: makeSystemPrompt(level, topic), messages: [{ role: 'user', content: 'Start the conversation with a Dutch greeting related to the topic.' }] }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as AiResponse;
}

async function sendTurn(level: Level, topic: string, history: Message[], userText: string): Promise<AiResponse & { ended: boolean }> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const apiMessages: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const msg of history) {
    if (msg.role === 'ai') apiMessages.push({ role: 'assistant', content: JSON.stringify({ dutch: msg.dutch, english: msg.english }) });
    else apiMessages.push({ role: 'user', content: msg.text });
  }
  apiMessages.push({ role: 'user', content: userText });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
    body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 512, system: makeSystemPrompt(level, topic), messages: apiMessages }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  let rawText = data.content[0].text.trim();
  const ended = rawText.includes('[END_CONVERSATION]');
  rawText = rawText.replace(/\[END_CONVERSATION\]/g, '').trim();
  const cleanRaw = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const parsed = JSON.parse(cleanRaw) as AiResponse;
  parsed.dutch = parsed.dutch.replace(/\[END_CONVERSATION\]/g, '').trim();
  return { ...parsed, ended };
}

async function getGrammarReview(level: Level, topic: string, messages: Message[], pastErrorTypes: string[]): Promise<GrammarReview> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const transcript = messages.map(m => m.role === 'user' ? `Learner: ${m.text}` : `AI: ${m.dutch}`).join('\n');
  const system = `You are a Dutch language tutor reviewing a learner's conversation. Return JSON only, no markdown:
{
  "overallImpression": "2-3 sentences in English, warm and specific",
  "strongPoints": ["English", "English"],
  "patternErrors": [
    {
      "type": "error type in English",
      "typeDutch": "hetzelfde in het Nederlands",
      "example": "learner's Dutch sentence with error",
      "correction": "corrected Dutch sentence",
      "reason": "brief explanation in English",
      "reasonDutch": "korte uitleg in het Nederlands"
    }
  ],
  "oneThingToFocus": "one actionable tip in English",
  "oneThingToFocusDutch": "hetzelfde in het Nederlands"
}
patternErrors = only errors appearing more than once OR one significant structural error, max 3. Tone: warm, specific, forward-looking.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
    body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 800, system, messages: [{ role: 'user', content: `Level: ${level}\nTopic: ${topic}\nConversation transcript:\n${transcript}\nPast error types: ${pastErrorTypes.join(', ') || 'none yet'}` }] }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as GrammarReview;
}

// ─── Save Word Modal ──────────────────────────────────────────────────────────

interface SaveWordModalProps {
  onClose: () => void;
  onSave: (dutch: string, english: string, example: string, article: 'de' | 'het' | undefined, setId: string) => void;
  onCreateAndSave: (dutch: string, english: string, example: string, article: 'de' | 'het' | undefined, setTitle: string) => void;
  existingSets: { id: string; title: string; emoji: string }[];
}

function SaveWordModal({ onClose, onSave, onCreateAndSave, existingSets }: SaveWordModalProps) {
  const [dutch, setDutch] = useState('');
  const [english, setEnglish] = useState('');
  const [example, setExample] = useState('');
  const [article, setArticle] = useState<'de' | 'het' | undefined>(undefined);
  const [fetching, setFetching] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [mode, setMode] = useState<'pick' | 'new'>('pick');
  const [selectedSetId, setSelectedSetId] = useState(existingSets[0]?.id ?? '');
  const [newSetTitle, setNewSetTitle] = useState('');
  const [showSetPicker, setShowSetPicker] = useState(false);
  const lastFetchedRef = useRef('');

  const selectedSet = existingSets.find(s => s.id === selectedSetId);

  // Auto-fetch translation + article + example after user stops typing for 700ms
  useEffect(() => {
    const word = dutch.trim();
    if (!word || word === lastFetchedRef.current) return;
    const timer = setTimeout(async () => {
      lastFetchedRef.current = word;
      setFetching(true);
      const info = await fetchWordInfo(word);
      if (info.translation && !english.trim()) setEnglish(info.translation);
      if (info.article) setArticle(info.article);
      setFetching(false);
      setGenerating(true);
      const ex = await generateExample(word);
      if (ex) setExample(ex);
      setGenerating(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [dutch]);

  function handleSave() {
    if (!dutch.trim()) return;
    if (mode === 'pick' && selectedSetId) {
      onSave(dutch.trim(), english.trim(), example.trim(), article, selectedSetId);
    } else if (mode === 'new' && newSetTitle.trim()) {
      onCreateAndSave(dutch.trim(), english.trim(), example.trim(), article, newSetTitle.trim());
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-md bg-background rounded-2xl p-5 space-y-4 shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="font-heading font-bold text-foreground">Save a word</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>

        <div className="space-y-2">
          {/* Dutch word with article badge */}
          <div className="flex gap-2 items-center">
            {article && (
              <span className={`shrink-0 px-2.5 py-2 rounded-xl text-xs font-bold border ${article === 'de' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-pink-50 border-pink-200 text-pink-700'}`}>
                {article}
              </span>
            )}
            <input
              value={dutch}
              onChange={e => { setDutch(e.target.value); setArticle(undefined); setExample(''); lastFetchedRef.current = ''; }}
              placeholder="Dutch word or phrase…"
              autoFocus
              autoComplete="off"
              className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {fetching && <Loader2 className="h-4 w-4 text-muted-foreground animate-spin shrink-0" />}
          </div>

          {/* Translation */}
          <input
            value={english}
            onChange={e => setEnglish(e.target.value)}
            placeholder={fetching ? 'Fetching translation…' : 'Translation (optional)'}
            autoComplete="off"
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />

          {/* Example sentence */}
          <div className="relative">
            <input
              value={example}
              onChange={e => setExample(e.target.value)}
              placeholder={generating ? 'Generating example…' : 'Example sentence (optional)'}
              autoComplete="off"
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 pr-8 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {generating
              ? <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground animate-spin" />
              : dutch.trim() && (
                <button
                  onClick={async () => { setGenerating(true); const ex = await generateExample(dutch.trim()); if (ex) setExample(ex); setGenerating(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  title="Regenerate example"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </button>
              )
            }
          </div>
        </div>

        {/* Set picker */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button onClick={() => setMode('pick')} className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${mode === 'pick' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground'}`}>
              Add to existing set
            </button>
            <button onClick={() => setMode('new')} className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${mode === 'new' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground'}`}>
              Create new set
            </button>
          </div>

          {mode === 'pick' && (
            existingSets.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">No sets yet — create one first.</p>
            ) : (
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

        <Button className="w-full" onClick={handleSave}
          disabled={!dutch.trim() || fetching || (mode === 'pick' && !selectedSetId) || (mode === 'new' && !newSetTitle.trim())}>
          Save to flashcards
        </Button>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

type Screen = 'config' | 'topic' | 'chat';

export function ContinueDialogueTask({ onBack }: { onBack: () => void }) {
  const { texts, pastErrors, addPastError } = useLearning();
  const { sets: customSets, addWordToSet, createSet } = useCustomSets();
  const { user } = useAuth();

  const recentTopics = useMemo(() =>
    texts.filter(t => t.completed).slice(-3).map(t => t.title),
    [texts]
  );

  const [screen, setScreen] = useState<Screen>('config');
  const [level, setLevel] = useState<Level>('A1');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userTurns, setUserTurns] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [review, setReview] = useState<GrammarReview | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showSaveWord, setShowSaveWord] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const topicToUse = customTopic.trim() || selectedTopic || LEVEL_TOPICS[level][0].dutch;

  async function handleStart() {
    setLoading(true);
    setError(null);
    setMessages([]);
    setUserTurns(0);
    setConversationEnded(false);
    setShowReviewButton(false);
    setReview(null);
    try {
      const opening = await getOpeningMessage(level, topicToUse);
      setMessages([{ role: 'ai', dutch: opening.dutch, english: opening.english }]);
      setScreen('chat');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!userInput.trim() || loading || conversationEnded) return;
    const text = userInput.trim();
    setUserInput('');
    setError(null);
    const historyBeforeUser = [...messages];
    const newHistory: Message[] = [...messages, { role: 'user' as const, text }];
    setMessages(newHistory);
    const nextTurns = userTurns + 1;
    setUserTurns(nextTurns);
    setLoading(true);
    try {
      const response = await sendTurn(level, topicToUse, historyBeforeUser, text);
      setMessages(prev => [...prev, { role: 'ai', dutch: response.dutch, english: response.english }]);
      if (response.ended || nextTurns >= MAX_USER_TURNS) {
        setConversationEnded(true);
        setShowReviewButton(true);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGetReview() {
    setReviewLoading(true);
    setError(null);
    try {
      const result = await getGrammarReview(level, topicToUse, messages, pastErrors.map(e => e.type));
      setReview(result);
      setShowReviewButton(false);
      for (const pe of result.patternErrors) {
        addPastError({ type: pe.type, example: pe.example, date: new Date().toISOString() });
      }
      // Save session for AI tutor analysis
      if (user) {
        savePracticeSession({
          user_id: user.id,
          task_type: 'dialogue',
          level,
          grammar_focus: null,
          easy_count: 0,
          hard_count: result.patternErrors.length,
          correct_count: result.strongPoints.length,
          session_length: userTurns,
          hard_grammar_targets: result.patternErrors.map(e => e.type),
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'Add your Anthropic API key in the Me tab → Settings.' : msg);
    } finally {
      setReviewLoading(false);
    }
  }

  function handleReset() {
    setScreen('config');
    setMessages([]);
    setUserInput('');
    setUserTurns(0);
    setConversationEnded(false);
    setShowReviewButton(false);
    setReview(null);
    setError(null);
    setSelectedTopic('');
    setCustomTopic('');
  }

  function handleSaveWord(dutch: string, english: string, example: string, article: 'de' | 'het' | undefined, setId: string) {
    addWordToSet(setId, { dutch, english, example: example || undefined, article });
    setShowSaveWord(false);
  }

  function handleCreateAndSave(dutch: string, english: string, example: string, article: 'de' | 'het' | undefined, setTitle: string) {
    const newSet = createSet(setTitle, '💬');
    addWordToSet(newSet.id, { dutch, english, example: example || undefined, article });
    setShowSaveWord(false);
  }

  // ── Config screen ────────────────────────────────────────────────────────────

  if (screen === 'config') {
    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Chat with AI</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Hold a short Dutch conversation. Grammar review after 5 messages.</p>
        </div>
        <Card className="p-4">
          <TaskFilters level={level} theme="Dagelijks leven" onLevelChange={setLevel} onThemeChange={() => {}} hideTheme />
        </Card>
        {error && <Card className="border-red-200 bg-red-50 p-4"><p className="text-sm text-red-700">{error}</p></Card>}
        <Button className="w-full gap-2 py-5 text-base font-semibold" onClick={() => setScreen('topic')}>
          Choose topic
        </Button>
      </div>
    );
  }

  // ── Topic selection screen ───────────────────────────────────────────────────

  if (screen === 'topic') {
    const suggestedTopics = LEVEL_TOPICS[level];

    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Choose a topic</h2>
        </div>

        {/* Info note */}
        <div className="rounded-xl bg-muted/60 border border-border px-3.5 py-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Choose a real-life situation you'd like to practice — like ordering a coffee, asking for directions, or shopping at the market.
          </p>
        </div>

        {/* Level-aware suggested topics */}
        <div className="space-y-2">
          {suggestedTopics.map(topic => (
            <button
              key={topic.dutch}
              onClick={() => { setSelectedTopic(topic.dutch); setCustomTopic(''); }}
              className={`w-full text-left rounded-xl border p-3.5 transition-colors ${
                selectedTopic === topic.dutch && !customTopic
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <span className="text-sm font-medium block">{topic.dutch}</span>
              <span className="text-xs text-muted-foreground/70">{topic.english}</span>
            </button>
          ))}
        </div>

        {/* Custom topic */}
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground font-medium">Or type your own topic…</p>
          <input
            value={customTopic}
            onChange={e => { setCustomTopic(e.target.value); if (e.target.value) setSelectedTopic(''); }}
            placeholder="e.g. Buying a train ticket"
            autoComplete="off"
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {error && <Card className="border-red-200 bg-red-50 p-4"><p className="text-sm text-red-700">{error}</p></Card>}

        <Button
          className="w-full gap-2 py-5 text-base font-semibold"
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? <span className="animate-pulse">Starting…</span> : 'Start conversation'}
        </Button>
      </div>
    );
  }

  // ── Chat screen ──────────────────────────────────────────────────────────────

  return (
    <div className="animate-fade-in space-y-4 pb-6">
      {/* Save word modal */}
      {showSaveWord && (
        <SaveWordModal
          onClose={() => setShowSaveWord(false)}
          onSave={handleSaveWord}
          onCreateAndSave={handleCreateAndSave}
          existingSets={customSets}
        />
      )}

      <div className="flex items-center justify-between">
        <button onClick={handleReset} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <div className="flex items-center gap-3">
          {!conversationEnded && (
            <span className="text-xs text-muted-foreground">{userTurns} / {MAX_USER_TURNS}</span>
          )}
          <button
            onClick={() => setShowSaveWord(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary/10 transition-colors"
          >
            <BookmarkPlus className="h-3.5 w-3.5" /> Save word
          </button>
        </div>
      </div>

      {/* Topic badge */}
      <div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Topic: </span>
        <span className="text-xs font-semibold text-foreground">{topicToUse}</span>
      </div>

      {/* Message list */}
      <div className="space-y-3">
        {messages.map((msg, i) => {
          if (msg.role === 'ai') {
            return (
              <div key={i} className="flex flex-col items-start max-w-[85%]">
                <div className="bg-secondary rounded-2xl rounded-tl-sm px-3 py-2">
                  <p className="text-sm text-foreground">{msg.dutch}</p>
                </div>
                {msg.english && (
                  <p className="mt-0.5 px-1 text-xs text-muted-foreground italic">{msg.english}</p>
                )}
              </div>
            );
          } else {
            return (
              <div key={i} className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            );
          }
        })}

        {loading && (
          <div className="flex items-start max-w-[85%]">
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-3 py-2">
              <p className="text-sm text-muted-foreground animate-pulse">Thinking…</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      {/* Grammar review result */}
      {review && (
        <Card className="p-4 space-y-3 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Grammar review</p>
          <p className="text-sm text-foreground leading-relaxed">{review.overallImpression}</p>

          {review.strongPoints.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Strong points</p>
              <ul className="space-y-0.5">
                {review.strongPoints.map((sp, i) => <li key={i} className="text-sm text-foreground">· {sp}</li>)}
              </ul>
            </div>
          )}

          {review.patternErrors.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Patterns to work on</p>
              {review.patternErrors.map((pe, i) => (
                <div key={i} className="rounded-lg bg-secondary/50 p-3 space-y-1.5">
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-foreground">{pe.type}</p>
                    {pe.typeDutch && <p className="text-xs text-muted-foreground italic">{pe.typeDutch}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="line-through">{pe.example}</span>
                    {' → '}
                    <span className="text-foreground font-medium">{pe.correction}</span>
                  </p>
                  <div className="pt-0.5 border-t border-border/50 space-y-0.5">
                    <p className="text-xs text-muted-foreground">{pe.reason}</p>
                    {pe.reasonDutch && <p className="text-xs text-muted-foreground italic">{pe.reasonDutch}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-0.5">
            <p className="text-sm text-muted-foreground italic">{review.oneThingToFocus}</p>
            {review.oneThingToFocusDutch && (
              <p className="text-sm text-muted-foreground italic">{review.oneThingToFocusDutch}</p>
            )}
          </div>
          <Button className="w-full" onClick={handleReset}>Start new conversation</Button>
        </Card>
      )}

      {/* Input area */}
      {!conversationEnded ? (
        <div className="flex gap-2 items-end">
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Typ je antwoord in het Nederlands…"
            disabled={loading}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            rows={2}
            className="flex-1 rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none disabled:opacity-50"
          />
          <Button size="icon" onClick={handleSend} disabled={loading || !userInput.trim()} className="shrink-0 h-10 w-10">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ) : showReviewButton ? (
        <Button className="w-full" onClick={handleGetReview} disabled={reviewLoading}>
          {reviewLoading ? <span className="animate-pulse">Loading review…</span> : 'See Grammar Review'}
        </Button>
      ) : null}
    </div>
  );
}
