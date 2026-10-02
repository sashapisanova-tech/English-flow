import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { MessageCircleMore, Send, X } from 'lucide-react';
import { claudeFetch } from '@/lib/ai';



const SYSTEM_PROMPT = `You are Emma, a friendly British English tutor for beginners (A1–B1 level).
Your student is a native Russian speaker learning British English and may ask you anything about the language: grammar, vocabulary, pronunciation, word order, tenses, articles, prepositions, and more.

Rules:
- Explain in simple Russian. Write English examples in British English (British spelling) and add a Russian translation in brackets.
- If the student writes in English and clearly wants to practise, you may answer in simple English instead.
- Keep explanations short and simple. Use plain language.
- Always give at least one English example sentence.
- If asked about a word's meaning, give the contextual meaning, not a raw dictionary list.
- If asked about grammar (e.g. present perfect, conditionals, articles), explain with a clear pattern and example.
- Be warm, encouraging, and concise. Max 3 short paragraphs per reply.
- Do not ask multiple follow-up questions at once — at most one.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

async function sendMessage(messages: Message[]): Promise<string> {
  const res = await claudeFetch({
    method: 'POST',
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  return data.content[0].text.trim();
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hi! I\'m Emma, your English tutor. Ask me anything — grammar, vocabulary, pronunciation, or anything else about English!',
      }]);
    }
  }, [open]);

  useEffect(() => {
    function handleOpen(e: CustomEvent) {
      const msg = (e.detail as { message?: string })?.message ?? '';
      setOpen(true);
      if (msg) setInput(msg);
    }
    window.addEventListener('english-chat-open', handleOpen as EventListener);
    return () => window.removeEventListener('english-chat-open', handleOpen as EventListener);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setError(null);
    setLoading(true);
    try {
      const reply = await sendMessage(newMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg === 'NO_KEY' ? 'API key missing — add it in Tasks → My Story first.' : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const header = (title: ReactNode) => (
    <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 pb-3 pt-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-highlight-soft">
        <MessageCircleMore className="h-5 w-5 text-highlight" />
      </div>
      <div className="min-w-0 flex-1">
        {title}
        <p className="text-[13px] text-muted-foreground">Your English tutor · ask anything</p>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Close chat"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  const thread = (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-[15px] leading-relaxed ${
            msg.role === 'user'
              ? 'rounded-br-sm bg-primary text-primary-foreground'
              : 'rounded-bl-sm border border-border bg-card text-foreground'
          }`}>
            {msg.content}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="rounded-xl rounded-bl-sm border border-border bg-card px-3.5 py-2.5">
            <span className="flex h-5 items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </span>
          </div>
        </div>
      )}
      {error && <p className="text-center text-xs text-destructive">{error}</p>}
      <div ref={bottomRef} />
    </div>
  );

  const composer = (
    <>
      <div className="flex items-end gap-2">
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Ask about English grammar or vocabulary…" rows={1}
          className="max-h-32 flex-1 resize-none rounded-xl border border-border bg-card px-3.5 py-3 text-[15px] leading-snug text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          style={{ fieldSizing: 'content' } as React.CSSProperties} />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="h-[18px] w-[18px]" />
        </button>
      </div>
      <p className="mt-1.5 text-center text-xs text-muted-foreground">Enter to send · Shift+Enter for new line</p>
    </>
  );

  return (
    <>
      {/* Floating AI button (design: 'text' — navy circle with a red "AI" tag) */}
      {/* Phones: above the bottom tab bar. Laptops (no tab bar): bottom-right pill
          "Ask your tutor"; while a text is open (html[data-reading-panel]) a round
          button left of the reading side panel, as in FlowDesktop. */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-40 flex h-14 min-w-14 items-center justify-center gap-2.5 rounded-full bg-primary shadow-[0_8px_20px_-6px_hsl(var(--primary)/0.45)] transition-all hover:bg-primary/90 active:scale-95 lg:bottom-8 lg:right-8 lg:pl-[18px] lg:pr-[22px] lg:[html[data-reading-panel]_&]:right-[calc(max(0px,(100vw-1160px)/2)+404px)] lg:[html[data-reading-panel]_&]:p-0"
        aria-label="Open English tutor chat"
      >
        <MessageCircleMore className="h-[26px] w-[26px] shrink-0 text-primary-foreground" />
        <span className="hidden text-[15px] font-semibold text-primary-foreground lg:inline lg:[html[data-reading-panel]_&]:hidden">Ask your tutor</span>
        <span className="absolute -right-0.5 -top-0.5 flex h-5 items-center rounded-full border-2 border-background bg-highlight px-1.5 text-[10px] font-bold tracking-[0.04em] text-highlight-foreground lg:static lg:border-0 lg:[html[data-reading-panel]_&]:absolute lg:[html[data-reading-panel]_&]:border-2">
          AI
        </span>
      </button>

      {/* Desktop: fixed right panel — only rendered on desktop to avoid a backdrop */}
      {open && isDesktop && (
        <div className="fixed bottom-4 right-4 top-4 z-50 flex w-96 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl">
          {header(<p className="font-heading text-lg font-semibold leading-tight">Emma</p>)}
          {thread}
          <div className="shrink-0 border-t border-border px-4 py-3">{composer}</div>
        </div>
      )}

      {/* Mobile: bottom sheet */}
      <DialogPrimitive.Root open={open && !isDesktop} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[22px] bg-background shadow-[0_-10px_30px_-10px_hsl(var(--foreground)/0.25)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:duration-200 data-[state=open]:duration-300 md:hidden"
            style={{ height: 'min(80vh, calc(100dvh - env(safe-area-inset-top) - 2rem))' }}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-border" />
            {header(<DialogPrimitive.Title className="font-heading text-lg font-semibold leading-tight">Emma</DialogPrimitive.Title>)}
            {thread}
            <div className="shrink-0 border-t border-border px-4 pt-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
              {composer}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
