import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { TaskFilters, Level, Theme } from './TaskFilters';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

interface AiMessage {
  role: 'ai';
  dutch: string;
  english: string;
}

interface UserMessage {
  role: 'user';
  text: string;
}

type Message = AiMessage | UserMessage;

interface AiResponse {
  dutch: string;
  english: string;
}

function makeSystemPrompt(level: Level, theme: Theme) {
  return `You are a friendly Dutch conversation partner. The student is learning Dutch at level ${level}.
Theme/context for today's conversation: ${theme}.
Rules:
- Speak ONLY in Dutch (short, clear sentences appropriate to ${level})
- After each student reply, continue naturally and ask ONE follow-up question
- Keep your turns to 1-2 sentences max
- After the student's 3rd reply, write a warm closing sentence in Dutch, then on a new line write:
  [FEEDBACK]: Two brief grammar observations in English about the student's Dutch overall.
Return your Dutch text and a short English translation in this JSON:
{"dutch": "...", "english": "..."}`;
}

async function sendMessage(
  level: Level,
  theme: Theme,
  history: Message[],
  userText: string
): Promise<AiResponse> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  // Build message list for API
  const apiMessages: { role: 'user' | 'assistant'; content: string }[] = [];

  // Reconstruct history
  for (const msg of history) {
    if (msg.role === 'ai') {
      apiMessages.push({ role: 'assistant', content: JSON.stringify({ dutch: msg.dutch, english: msg.english }) });
    } else {
      apiMessages.push({ role: 'user', content: msg.text });
    }
  }

  // Add current user message
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
      system: makeSystemPrompt(level, theme),
      messages: apiMessages,
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as AiResponse;
}

async function getOpeningMessage(level: Level, theme: Theme): Promise<AiResponse> {
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
      system: makeSystemPrompt(level, theme),
      messages: [{ role: 'user', content: 'Start the conversation with a Dutch greeting and question related to the theme.' }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as AiResponse;
}

const MAX_USER_TURNS = 3;

type Screen = 'filter' | 'chat';

// Parse [FEEDBACK]: ... from the dutch field
function parseFeedback(dutch: string): { dutch: string; feedback: string | null } {
  const idx = dutch.indexOf('[FEEDBACK]:');
  if (idx === -1) return { dutch, feedback: null };
  return {
    dutch: dutch.slice(0, idx).trim(),
    feedback: dutch.slice(idx + '[FEEDBACK]:'.length).trim(),
  };
}

export function ContinueDialogueTask({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('filter');
  const [level, setLevel] = useState<Level>('A2');
  const [theme, setTheme] = useState<Theme>('Dagelijks leven');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userTurns, setUserTurns] = useState(0);
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const [conversationDone, setConversationDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleStart() {
    setLoading(true);
    setError(null);
    setMessages([]);
    setUserTurns(0);
    setFeedbackText(null);
    setConversationDone(false);
    try {
      const opening = await getOpeningMessage(level, theme);
      setMessages([{ role: 'ai', dutch: opening.dutch, english: opening.english }]);
      setScreen('chat');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in settings first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!userInput.trim() || loading) return;
    const text = userInput.trim();
    setUserInput('');
    setError(null);

    const newHistory: Message[] = [...messages, { role: 'user' as const, text }];
    setMessages(newHistory);
    const nextTurns = userTurns + 1;
    setUserTurns(nextTurns);
    setLoading(true);

    try {
      const aiHistory = messages; // history before user's new message
      const response = await sendMessage(level, theme, aiHistory, text);
      const { dutch, feedback } = parseFeedback(response.dutch);

      const aiMsg: AiMessage = { role: 'ai', dutch, english: response.english };
      setMessages(prev => [...prev, aiMsg]);

      if (feedback) {
        setFeedbackText(feedback);
        setConversationDone(true);
      } else if (nextTurns >= MAX_USER_TURNS) {
        setConversationDone(true);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in settings first.' : msg);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setScreen('filter');
    setMessages([]);
    setUserInput('');
    setUserTurns(0);
    setFeedbackText(null);
    setConversationDone(false);
    setError(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={screen === 'filter' ? onBack : handleReset}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        {screen === 'chat' && !conversationDone && (
          <span className="text-xs text-muted-foreground">Turn {userTurns} / {MAX_USER_TURNS}</span>
        )}
      </div>

      {/* Info card */}
      <Card className="bg-purple-50 border-purple-200 p-4">
        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-1">Chat with AI</p>
        <p className="text-xs text-purple-700">
          Have a short Dutch conversation with an AI partner. You get 3 turns, then receive grammar feedback.
        </p>
      </Card>

      {/* Filter screen */}
      {screen === 'filter' && (
        <div className="space-y-4">
          <TaskFilters level={level} theme={theme} onLevelChange={setLevel} onThemeChange={setTheme} />

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}

          <Button className="w-full" onClick={handleStart} disabled={loading}>
            {loading ? 'Starting conversation...' : 'Start conversation'}
          </Button>
        </div>
      )}

      {/* Chat screen */}
      {screen === 'chat' && (
        <div className="space-y-4 animate-fade-in">
          {/* Message list */}
          <div className="space-y-3">
            {messages.map((msg, i) => {
              if (msg.role === 'ai') {
                return (
                  <div key={i} className="flex flex-col items-start max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5">
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
                    <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 max-w-[85%]">
                      <p className="text-sm text-primary-foreground">{msg.text}</p>
                    </div>
                  </div>
                );
              }
            })}

            {loading && (
              <div className="flex items-start max-w-[85%]">
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5">
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Feedback block */}
          {feedbackText && (
            <Card className="p-4 bg-blue-50 border-blue-200 space-y-1">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Grammar feedback</p>
              <p className="text-sm text-blue-800">{feedbackText}</p>
            </Card>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </Card>
          )}

          {/* Input area */}
          {!conversationDone ? (
            <div className="flex gap-2 items-end">
              <textarea
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Typ je antwoord in het Nederlands…"
                disabled={loading}
                className="flex-1 rounded-xl border border-border bg-card p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none disabled:opacity-50"
                rows={2}
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
          ) : (
            <Button className="w-full" onClick={handleReset}>
              Start a new conversation
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
