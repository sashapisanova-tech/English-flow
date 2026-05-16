import { useState, useEffect, useMemo, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Zap, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { useCustomSets } from '@/hooks/useCustomSets';
import { flashcardSets } from '@/data/flashcardSets';

const WORD_COUNT = 10;
const TIME_LIMIT = 60;

interface WordEntry { dutch: string; english: string }
type Phase = 'setup' | 'running' | 'done';

export function WordSprintTask({ onBack }: { onBack: () => void }) {
  const { vocabulary } = useLearning();
  const { sets: customSets } = useCustomSets();

  const [phase, setPhase] = useState<Phase>('setup');
  const [source, setSource] = useState<'vocab' | string>('vocab');
  const [showPicker, setShowPicker] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [queue, setQueue] = useState<WordEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ word: WordEntry; correct: boolean }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSets = useMemo(() => {
    const builtIn = flashcardSets.map(s => ({ id: s.id, title: s.title, emoji: s.emoji, words: s.words.map(w => ({ dutch: w.dutch, english: w.english })) }));
    const custom = customSets.map(s => ({ id: s.id, title: s.title, emoji: s.emoji, words: s.words.map(w => ({ dutch: w.dutch, english: w.english })) }));
    return [...custom, ...builtIn];
  }, [customSets]);

  const selectedSet = allSets.find(s => s.id === source);
  const myWords = useMemo<WordEntry[]>(() => Object.entries(vocabulary).map(([dutch, v]) => ({ dutch, english: v.english || dutch })), [vocabulary]);
  const pool = source === 'vocab' ? myWords : (selectedSet?.words ?? []);
  const canStart = pool.length >= 2;

  function startSprint() {
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(WORD_COUNT, pool.length));
    setQueue(shuffled);
    setIdx(0); setInput(''); setResults([]); setTimeLeft(TIME_LIMIT);
    setPhase('running');
  }

  useEffect(() => {
    if (phase !== 'running') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); setPhase('done'); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  useEffect(() => { if (phase === 'running') inputRef.current?.focus(); }, [idx, phase]);

  function advance(correct: boolean) {
    const word = queue[idx];
    const newResults = [...results, { word, correct }];
    setResults(newResults);
    setInput('');
    if (idx + 1 >= queue.length) { clearInterval(timerRef.current!); setPhase('done'); }
    else setIdx(i => i + 1);
  }

  function submit() { if (!input.trim()) return; advance(input.trim().toLowerCase() === queue[idx].dutch.toLowerCase()); }

  const score = results.filter(r => r.correct).length;

  if (phase === 'setup') return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">Word Sprint</Badge>
      </div>

      <Card className="bg-yellow-50 border-yellow-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">⚡</span>
          <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">Word Sprint</span>
        </div>
        <p className="text-xs text-yellow-700">60 seconds · up to 10 words · English → Dutch. Type as fast as you can!</p>
      </Card>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Word source</p>
        <button onClick={() => setSource('vocab')}
          className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${source === 'vocab' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
          <span className="text-xl">📝</span>
          <div>
            <p className="text-sm font-medium">My vocabulary</p>
            <p className="text-xs text-muted-foreground">{myWords.length} words saved</p>
          </div>
        </button>

        <div className="rounded-xl border border-border overflow-hidden">
          <button className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm" onClick={() => setShowPicker(v => !v)}>
            <span className="font-medium">{selectedSet ? `${selectedSet.emoji} ${selectedSet.title}` : 'Choose a flashcard set…'}</span>
            {showPicker ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showPicker && (
            <div className="max-h-48 overflow-y-auto divide-y divide-border">
              {allSets.map(s => (
                <button key={s.id} onClick={() => { setSource(s.id); setShowPicker(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left ${source === s.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-secondary'}`}>
                  <span>{s.emoji}</span><span>{s.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{s.words.length}w</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button className="w-full gap-2" onClick={startSprint} disabled={!canStart}>
        <Zap className="h-4 w-4" /> Start sprint!
      </Button>
      {!canStart && <p className="text-center text-xs text-muted-foreground">Need at least 2 words to start.</p>}
    </div>
  );

  if (phase === 'running' && idx < queue.length) {
    const word = queue[idx];
    const timerColor = timeLeft <= 10 ? 'text-red-500' : timeLeft <= 20 ? 'text-amber-500' : 'text-foreground';
    return (
      <div className="animate-fade-in space-y-5">
        <div className="flex items-center justify-between">
          <span className={`font-heading text-3xl font-bold tabular-nums ${timerColor}`}>{timeLeft}s</span>
          <span className="text-sm text-muted-foreground">{idx + 1} / {queue.length}</span>
          <Badge variant="secondary">{score} ✓</Badge>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${(idx / queue.length) * 100}%` }} />
        </div>
        <Card className="p-8 text-center space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">English</p>
          <p className="font-heading text-3xl font-bold text-foreground">{word.english}</p>
        </Card>
        <div className="space-y-2">
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Type the Dutch word…" autoComplete="off" autoCorrect="off" spellCheck={false}
            className="w-full rounded-xl border border-border px-4 py-3 text-center text-lg font-medium outline-none focus:border-primary transition-colors" />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => advance(false)}>Skip</Button>
            <Button className="flex-1" onClick={submit} disabled={!input.trim()}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="text-center py-4 space-y-2">
        <p className="text-5xl">{score === queue.length ? '🏆' : score >= queue.length * 0.7 ? '⚡' : '💪'}</p>
        <h2 className="font-heading text-2xl font-bold">{score === queue.length ? 'Perfect sprint!' : score >= queue.length * 0.7 ? 'Great speed!' : 'Keep training!'}</h2>
        <p className="text-muted-foreground"><span className="text-3xl font-bold text-primary">{score}</span> / {queue.length} correct</p>
      </div>
      {results.some(r => !r.correct) && (
        <Card className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Missed words</p>
          {results.filter(r => !r.correct).map((r, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{r.word.english}</span>
              <span className="font-semibold">{r.word.dutch}</span>
            </div>
          ))}
        </Card>
      )}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={() => setPhase('setup')}><RotateCcw className="h-4 w-4" /> Setup</Button>
        <Button className="flex-1 gap-2" onClick={startSprint}><Zap className="h-4 w-4" /> Sprint again</Button>
      </div>
    </div>
  );
}
