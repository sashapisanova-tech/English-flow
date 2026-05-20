import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Trash2, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import type { CustomSet, CustomWord } from '@/hooks/useCustomSets';

const API_KEY_STORAGE = 'dutch-app-anthropic-key';
function getSavedKey() {
  return localStorage.getItem(API_KEY_STORAGE) || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
}

const EMOJI_OPTIONS = ['📝','🌍','🍎','🏠','🚀','💼','🎵','🐾','🌿','⚡','🏖️','🎯','🔤','💬','🧳'];

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
        system: 'You are a Dutch language teacher. Generate ONE short, natural Dutch A1–A2 sentence using the given word. Return ONLY the Dutch sentence — no translation, no explanation, no punctuation beyond the sentence itself.',
        messages: [{ role: 'user', content: `Word: ${dutch}` }],
      }),
    });
    if (!res.ok) return '';
    const data = await res.json() as { content: { text: string }[] };
    return data.content[0].text.trim();
  } catch { return ''; }
}

async function autoTranslate(dutch: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(dutch)}&langpair=nl|en`
    );
    const data = await res.json();
    return (data?.responseData?.translatedText as string) || '';
  } catch { return ''; }
}

interface Props {
  set: CustomSet;
  onBack: () => void;
  onAddWord: (setId: string, word: CustomWord) => void;
  onRemoveWord: (setId: string, dutch: string) => void;
  onStartPractice: (set: CustomSet) => void;
  onDelete: (id: string) => void;
}

export function CustomSetEditor({ set, onBack, onAddWord, onRemoveWord, onStartPractice, onDelete }: Props) {
  const [dutch, setDutch] = useState('');
  const [english, setEnglish] = useState('');
  const [example, setExample] = useState('');
  const [generating, setGenerating] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [addError, setAddError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleDutchBlur() {
    const word = dutch.trim();
    if (!word) return;
    // Auto-translate if english is empty
    if (!english.trim()) {
      setTranslating(true);
      const t = await autoTranslate(word);
      if (t) setEnglish(t);
      setTranslating(false);
    }
    // AI example
    if (!example.trim()) {
      setGenerating(true);
      const ex = await generateExample(word);
      if (ex) setExample(ex);
      setGenerating(false);
    }
  }

  function handleAdd() {
    const d = dutch.trim();
    const e = english.trim();
    if (!d || !e) { setAddError('Enter both Dutch and English.'); return; }
    if (set.words.some(w => w.dutch.toLowerCase() === d.toLowerCase())) {
      setAddError('Word already in this set.'); return;
    }
    onAddWord(set.id, { dutch: d, english: e, example: example.trim() || undefined });
    setDutch(''); setEnglish(''); setExample(''); setAddError('');
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Flashcards
        </button>
        <span className="text-xl">{set.emoji}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">{set.title}</h2>
          <p className="text-xs text-muted-foreground">{set.words.length} word{set.words.length !== 1 ? 's' : ''}</p>
        </div>
        {set.words.length > 0 && (
          <Button size="sm" onClick={() => onStartPractice(set)} className="gap-1.5">
            Practice <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Add word form */}
      <Card className="p-4 space-y-3 bg-secondary/40">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Add a word</p>

        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Dutch word</label>
            <Input
              value={dutch}
              onChange={e => setDutch(e.target.value)}
              onBlur={handleDutchBlur}
              placeholder="e.g. fiets"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1 block">
              English {translating && <Loader2 className="h-3 w-3 animate-spin" />}
            </label>
            <Input
              value={english}
              onChange={e => setEnglish(e.target.value)}
              placeholder="e.g. bicycle"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5 block">
              <Sparkles className="h-3 w-3 text-purple-500" />
              Example sentence
              {generating && <Loader2 className="h-3 w-3 animate-spin" />}
              {!generating && !example && dutch.trim() && (
                <button
                  className="text-xs text-primary underline underline-offset-2"
                  onClick={async () => {
                    setGenerating(true);
                    const ex = await generateExample(dutch.trim());
                    if (ex) setExample(ex);
                    setGenerating(false);
                  }}
                >Generate</button>
              )}
            </label>
            <Input
              value={example}
              onChange={e => setExample(e.target.value)}
              placeholder="AI will generate one after you enter the word…"
              className="text-sm"
            />
          </div>
        </div>

        {addError && <p className="text-xs text-red-600">{addError}</p>}

        <Button
          className="w-full gap-1.5"
          onClick={handleAdd}
          disabled={!dutch.trim() || !english.trim() || generating || translating}
        >
          <Plus className="h-4 w-4" /> Add word
        </Button>
      </Card>

      {/* Word list */}
      {set.words.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">No words yet — add your first one above.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {set.words.map(word => (
            <Card key={word.dutch} className="p-3 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground">{word.dutch}</span>
                  <span className="text-muted-foreground text-xs">·</span>
                  <span className="text-sm text-muted-foreground">{word.english}</span>
                </div>
                {word.example && (
                  <p className="text-xs text-muted-foreground italic mt-0.5 leading-relaxed">"{word.example}"</p>
                )}
              </div>
              <button
                onClick={() => onRemoveWord(set.id, word.dutch)}
                className="shrink-0 text-muted-foreground hover:text-destructive transition-colors mt-0.5"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Delete set */}
      <div className="pt-2 border-t border-border">
        {confirmDelete ? (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5">
            <p className="text-sm text-destructive font-medium">Delete "{set.title}"?</p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Cancel
              </button>
              <button
                onClick={() => { onDelete(set.id); onBack(); }}
                className="text-xs font-semibold text-white bg-destructive hover:bg-destructive/90 transition-colors px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete this set
          </button>
        )}
      </div>
    </div>
  );
}

// ── Create Set Modal ─────────────────────────────────────────────────────────
interface CreateSetProps {
  onCancel: () => void;
  onCreate: (title: string, emoji: string) => void;
}

export function CreateSetModal({ onCancel, onCreate }: CreateSetProps) {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📝');

  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-heading text-lg font-bold">New Flashcard Set</h2>
      </div>

      <Card className="p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
            Set name
          </label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Food & Drinks"
            autoFocus
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
            Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map(e => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className={`text-xl rounded-lg p-1.5 transition-all ${emoji === e ? 'bg-primary/15 ring-2 ring-primary' : 'hover:bg-secondary'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          disabled={!title.trim()}
          onClick={() => onCreate(title.trim(), emoji)}
        >
          Create Set
        </Button>
      </Card>
    </div>
  );
}
