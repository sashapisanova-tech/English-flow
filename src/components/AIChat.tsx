import { useState, useRef, useEffect, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, X } from 'lucide-react';
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
    window.addEventListener('dutch-chat-open', handleOpen as EventListener);
    return () => window.removeEventListener('dutch-chat-open', handleOpen as EventListener);
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

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 z-40 flex items-center justify-center rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-all active:scale-95"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 5rem)', width: 52, height: 52 }}
        aria-label="Open English tutor chat"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Desktop: fixed right sidebar — only rendered on desktop to avoid Sheet backdrop conflict */}
      {open && isDesktop && (
        <div className="flex fixed right-4 top-4 bottom-4 w-96 z-50 flex-col bg-background border border-border shadow-2xl rounded-2xl overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-border shrink-0 flex items-center justify-between">
            <div>
              <p className="text-base font-bold leading-tight">Emma — English Tutor</p>
              <p className="text-xs text-muted-foreground">Ask anything about English</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary text-secondary-foreground rounded-bl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                  <span className="flex gap-1 items-center h-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <div ref={bottomRef} />
          </div>
          <div className="px-4 py-3 border-t border-border shrink-0">
            <div className="flex gap-2 items-end">
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Ask about English grammar or vocabulary…" rows={1}
                className="flex-1 resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-32"
                style={{ fieldSizing: 'content' } as React.CSSProperties} />
              <Button size="sm" onClick={handleSend} disabled={!input.trim() || loading} className="h-10 w-10 shrink-0 p-0 rounded-xl">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      )}

      {/* Mobile: bottom sheet — only rendered on mobile to avoid backdrop on desktop */}
      <Sheet open={open && !isDesktop} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="md:hidden flex flex-col p-0 rounded-t-2xl" style={{ height: 'min(80vh, calc(100dvh - env(safe-area-inset-top) - 2rem))' }}>
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-base font-bold leading-tight">Emma — English Tutor</SheetTitle>
                <p className="text-xs text-muted-foreground">Ask anything about English</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary text-secondary-foreground rounded-bl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                  <span className="flex gap-1 items-center h-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <div ref={bottomRef} />
          </div>
          <div className="px-4 pt-2 border-t border-border shrink-0" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
            <div className="flex gap-2 items-end">
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Ask about English grammar or vocabulary…" rows={1}
                className="flex-1 resize-none rounded-xl border border-border bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 max-h-32"
                style={{ fieldSizing: 'content' } as React.CSSProperties} />
              <Button size="sm" onClick={handleSend} disabled={!input.trim() || loading} className="h-10 w-10 shrink-0 p-0 rounded-xl">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
