import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Flame, Trophy, Timer } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';

const STREAK_KEY = 'dutch-challenge-streak';
const LAST_KEY = 'dutch-challenge-last';
const CHALLENGE_TIME = 180; // 3 minutes

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getStreak(): number {
  return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
}

function getLastDate(): string {
  return localStorage.getItem(LAST_KEY) || '';
}

function saveCompletion() {
  const last = getLastDate();
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = last === yesterday ? getStreak() + 1 : last === today ? getStreak() : 1;
  localStorage.setItem(STREAK_KEY, String(streak));
  localStorage.setItem(LAST_KEY, today);
  return streak;
}

// A1 word bank for the daily challenge word sprint
const DAILY_WORDS = [
  { dutch: 'huis', english: 'house' }, { dutch: 'water', english: 'water' },
  { dutch: 'goed', english: 'good' }, { dutch: 'groot', english: 'big' },
  { dutch: 'klein', english: 'small' }, { dutch: 'werken', english: 'to work' },
  { dutch: 'eten', english: 'to eat' }, { dutch: 'drinken', english: 'to drink' },
  { dutch: 'gaan', english: 'to go' }, { dutch: 'zien', english: 'to see' },
  { dutch: 'dag', english: 'day' }, { dutch: 'nacht', english: 'night' },
  { dutch: 'straat', english: 'street' }, { dutch: 'stad', english: 'city' },
  { dutch: 'fiets', english: 'bicycle' }, { dutch: 'trein', english: 'train' },
  { dutch: 'boek', english: 'book' }, { dutch: 'school', english: 'school' },
  { dutch: 'vriend', english: 'friend' }, { dutch: 'familie', english: 'family' },
];

type Phase = 'intro' | 'playing' | 'done' | 'already-done';

export function DailyChallengeTask({ onBack }: { onBack: () => void }) {
  const { vocabulary } = useLearning();
  const [phase, setPhase] = useState<Phase>(() => getLastDate() === todayStr() ? 'already-done' : 'intro');
  const [streak, setStreak] = useState(getStreak);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_TIME);
  const [queue] = useState(() => {
    const vocabWords = Object.entries(vocabulary).slice(0, 10).map(([dutch, v]) => ({ dutch, english: v.english || dutch }));
    const base = vocabWords.length >= 5 ? vocabWords : DAILY_WORDS;
    return [...base].sort(() => Math.random() - 0.5).slice(0, 15);
  });
  const [wordIdx, setWordIdx] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); finish(); return 0; }
        return t - 1;
      });
    }, 1000);
    inputRef.current?.focus();
    return () => clearInterval(timerRef.current!);
  }, [phase]); // eslint-disable-line

  function finish() {
    const newStreak = saveCompletion();
    setStreak(newStreak);
    setPhase('done');
  }

  function submitWord() {
    if (!input.trim() || wordIdx >= queue.length) return;
    const correct = input.trim().toLowerCase() === queue[wordIdx].dutch.toLowerCase();
    if (correct) setScore(s => s + 1);
    setAttempted(a => a + 1);
    setInput('');
    if (wordIdx + 1 >= queue.length) { clearInterval(timerRef.current!); finish(); }
    else setWordIdx(i => i + 1);
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerStr = `${mins}:${secs.toString().padStart(2, '0')}`;
  const timerColor = timeLeft <= 30 ? 'text-red-500' : timeLeft <= 60 ? 'text-amber-500' : 'text-foreground';

  if (phase === 'already-done') return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">Daily Challenge</Badge>
      </div>
      <div className="text-center py-8 space-y-4">
        <p className="text-6xl">✅</p>
        <h2 className="font-heading text-xl font-bold">Today's challenge done!</h2>
        <div className="flex items-center justify-center gap-2 text-orange-500">
          <Flame className="h-6 w-6 fill-orange-500" />
          <span className="font-heading text-3xl font-bold">{streak}</span>
          <span className="text-sm text-muted-foreground">day streak</span>
        </div>
        <p className="text-sm text-muted-foreground">Come back tomorrow to keep your streak going!</p>
      </div>
      <Button variant="outline" className="w-full" onClick={onBack}>Back to tasks</Button>
    </div>
  );

  if (phase === 'intro') return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Tasks
        </button>
        <Badge variant="secondary">Daily Challenge</Badge>
      </div>

      <Card className="bg-orange-50 border-orange-200 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🏆</span>
          <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Daily Challenge</span>
        </div>
        <p className="text-xs text-orange-700 leading-relaxed">
          One challenge per day · 3 minutes · type as many Dutch words as you can from English prompts. Build your streak!
        </p>
      </Card>

      {streak > 0 && (
        <Card className="p-4 flex items-center gap-3">
          <Flame className="h-8 w-8 text-orange-500 fill-orange-500 shrink-0" />
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">{streak} day streak</p>
            <p className="text-xs text-muted-foreground">Don't break it — complete today's challenge!</p>
          </div>
        </Card>
      )}

      <Button className="w-full gap-2" onClick={() => setPhase('playing')}>
        <Timer className="h-4 w-4" /> Start challenge
      </Button>
    </div>
  );

  if (phase === 'playing') return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <span className={`font-heading text-3xl font-bold tabular-nums ${timerColor}`}>{timerStr}</span>
        <span className="text-sm text-muted-foreground">{wordIdx + 1} / {queue.length}</span>
        <Badge variant="secondary">{score} ✓</Badge>
      </div>

      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-orange-500 transition-all" style={{ width: `${(timeLeft / CHALLENGE_TIME) * 100}%` }} />
      </div>

      <Card className="p-8 text-center space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">English</p>
        <p className="font-heading text-3xl font-bold text-foreground">{queue[wordIdx]?.english}</p>
      </Card>

      <div className="space-y-2">
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submitWord()}
          placeholder="Type the Dutch word…" autoComplete="off" autoCorrect="off" spellCheck={false}
          className="w-full rounded-xl border border-border px-4 py-3 text-center text-lg font-medium outline-none focus:border-primary transition-colors" />
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => { setAttempted(a => a + 1); setInput(''); if (wordIdx + 1 >= queue.length) { clearInterval(timerRef.current!); finish(); } else setWordIdx(i => i + 1); }}>Skip</Button>
          <Button className="flex-1" onClick={submitWord} disabled={!input.trim()}>Submit</Button>
        </div>
      </div>
    </div>
  );

  // Done
  return (
    <div className="animate-fade-in space-y-5">
      <div className="text-center py-4 space-y-3">
        <Trophy className="h-16 w-16 text-amber-500 mx-auto" />
        <h2 className="font-heading text-2xl font-bold">Challenge complete!</h2>
        <p className="text-muted-foreground"><span className="text-3xl font-bold text-primary">{score}</span> / {attempted} correct</p>
        <div className="flex items-center justify-center gap-2 text-orange-500 mt-2">
          <Flame className="h-6 w-6 fill-orange-500" />
          <span className="font-heading text-2xl font-bold">{streak} day streak</span>
        </div>
        {streak > 1 && <p className="text-sm text-muted-foreground">🔥 Come back tomorrow to keep it going!</p>}
      </div>
      <Button className="w-full" onClick={onBack}>Back to tasks</Button>
    </div>
  );
}
