import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { TaskFilters, Level } from './TaskFilters';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AiTurn {
  role: 'ai';
  dutch: string;
  english: string;
}

interface UserTurn {
  role: 'user';
  text: string;
}

type Message = AiTurn | UserTurn;

interface AiResponse {
  dutch: string;
  english: string;
}

interface GrammarReview {
  overallImpression: string;
  strongPoints: string[];
  patternErrors: { type: string; example: string; correction: string; reason: string }[];
  oneThingToFocus: string;
}

const MAX_USER_TURNS = 5;

// ─── System prompt ─────────────────────────────────────────────────────────────

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
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 256,
      system: makeSystemPrompt(level, topic),
      messages: [{ role: 'user', content: 'Start the conversation with a Dutch greeting related to the topic.' }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as AiResponse;
}

async function sendTurn(
  level: Level,
  topic: string,
  history: Message[],
  userText: string,
): Promise<AiResponse & { ended: boolean }> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const apiMessages: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const msg of history) {
    if (msg.role === 'ai') {
      apiMessages.push({ role: 'assistant', content: JSON.stringify({ dutch: msg.dutch, english: msg.english }) });
    } else {
      apiMessages.push({ role: 'user', content: msg.text });
    }
  }
  apiMessages.push({ role: 'user', content: userText });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 512,
      system: makeSystemPrompt(level, topic),
      messages: apiMessages,
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  let rawText = data.content[0].text.trim();

  // Detect [END_CONVERSATION]
  const ended = rawText.includes('[END_CONVERSATION]');
  rawText = rawText.replace(/\[END_CONVERSATION\]/g, '').trim();

  const cleanRaw = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const parsed = JSON.parse(cleanRaw) as AiResponse;
  // Strip [END_CONVERSATION] from dutch field too if it slipped in
  parsed.dutch = parsed.dutch.replace(/\[END_CONVERSATION\]/g, '').trim();
  return { ...parsed, ended };
}

async function getGrammarReview(
  level: Level,
  topic: string,
  messages: Message[],
  pastErrorTypes: string[],
): Promise<GrammarReview> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const transcript = messages
    .map(m => m.role === 'user' ? `Learner: ${m.text}` : `AI: ${m.dutch}`)
    .join('\n');

  const system = `You are a Dutch language tutor reviewing a learner's conversation. Return JSON only: { "overallImpression": "...", "strongPoints": ["..."], "patternErrors": [{"type":"...","example":"...","correction":"...","reason":"..."}], "oneThingToFocus": "..." }
patternErrors = only errors appearing more than once OR one significant structural error, max 3. Tone: warm, specific, forward-looking.`;

  const userMsg = `Level: ${level}\nTopic: ${topic}\nConversation transcript:\n${transcript}\nPast error types: ${pastErrorTypes.join(', ') || 'none yet'}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as GrammarReview;
}

// ─── Component ────────────────────────────────────────────────────────────────

type Screen = 'config' | 'topic' | 'chat';

export function ContinueDialogueTask({ onBack }: { onBack: () => void }) {
  const { texts, pastErrors, addPastError } = useLearning();

  const recentTopics = useMemo(() =>
    texts
      .filter(t => t.completed)
      .slice(-3)
      .map(t => t.title),
    [texts]
  );

  const [screen, setScreen] = useState<Screen>('config');
  const [level, setLevel] = useState<Level>('A1');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userTurns, setUserTurns] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [review, setReview] = useState<GrammarReview | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const topicToUse = selectedTopic || (recentTopics[0] ?? 'Dagelijks leven');

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
      const aiMsg: AiTurn = { role: 'ai', dutch: response.dutch, english: response.english };
      setMessages(prev => [...prev, aiMsg]);

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
      const result = await getGrammarReview(
        level,
        topicToUse,
        messages,
        pastErrors.map(e => e.type),
      );
      setReview(result);
      setShowReviewButton(false);
      // Save pattern errors
      for (const pe of result.patternErrors) {
        addPastError({ type: pe.type, example: pe.example, date: new Date().toISOString() });
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
          <p className="text-sm text-muted-foreground mt-0.5">
            Hold a short Dutch conversation. Grammar review after 5 messages.
          </p>
        </div>

        <Card className="p-4">
          <TaskFilters
            level={level}
            theme="Dagelijks leven"
            onLevelChange={setLevel}
            onThemeChange={() => {}}
            hideTheme
          />
        </Card>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <Button
          className="w-full gap-2 py-5 text-base font-semibold"
          onClick={() => setScreen('topic')}
        >
          Choose topic
        </Button>
      </div>
    );
  }

  // ── Topic selection screen ───────────────────────────────────────────────────

  if (screen === 'topic') {
    const topicOptions = recentTopics.length > 0 ? recentTopics : ['Dagelijks leven', 'Familie', 'Hobby\'s'];

    return (
      <div className="animate-fade-in space-y-4 pb-6">
        <button onClick={() => setScreen('config')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>

        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Chat with AI</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Choose a topic for today's conversation.</p>
        </div>

        <div className="space-y-2">
          {topicOptions.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`w-full text-left rounded-xl border p-4 text-sm font-medium transition-colors ${
                (selectedTopic || topicOptions[0]) === topic
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </Card>
        )}

        <Button
          className="w-full gap-2 py-5 text-base font-semibold"
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? <span className="animate-pulse">Starting…</span> : `Start conversation`}
        </Button>
      </div>
    );
  }

  // ── Chat screen ──────────────────────────────────────────────────────────────

  return (
    <div className="animate-fade-in space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <button onClick={handleReset} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        {!conversationEnded && (
          <span className="text-xs text-muted-foreground">{userTurns} / {MAX_USER_TURNS}</span>
        )}
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
                {review.strongPoints.map((sp, i) => (
                  <li key={i} className="text-sm text-foreground">· {sp}</li>
                ))}
              </ul>
            </div>
          )}

          {review.patternErrors.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Patterns to work on</p>
              {review.patternErrors.map((pe, i) => (
                <div key={i} className="rounded-lg bg-secondary/50 p-3 space-y-1">
                  <p className="text-xs font-semibold text-foreground">{pe.type}</p>
                  <p className="text-xs text-muted-foreground">{pe.example} → <span className="text-foreground font-medium">{pe.correction}</span></p>
                  <p className="text-xs text-muted-foreground">{pe.reason}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground italic">{review.oneThingToFocus}</p>

          <Button className="w-full" onClick={handleReset}>
            Start new conversation
          </Button>
        </Card>
      )}

      {/* Input area */}
      {!conversationEnded ? (
        <div className="flex gap-2 items-end">
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder="Typ je antwoord in het Nederlands…"
            disabled={loading}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            rows={2}
            className="flex-1 rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none disabled:opacity-50"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={loading || !userInput.trim()}
            className="shrink-0 h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ) : showReviewButton ? (
        <Button
          className="w-full"
          onClick={handleGetReview}
          disabled={reviewLoading}
        >
          {reviewLoading ? <span className="animate-pulse">Loading review…</span> : 'See Grammar Review'}
        </Button>
      ) : null}
    </div>
  );
}
