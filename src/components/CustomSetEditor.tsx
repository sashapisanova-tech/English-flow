import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Trash2, Sparkles, Loader2, ChevronRight, Pencil } from 'lucide-react';
import type { CustomSet, CustomWord } from '@/hooks/useCustomSets';
import { claudeFetch } from '@/lib/ai';


const EMOJI_OPTIONS = ['📝','🌍','🍎','🏠','🚀','💼','🎵','🐾','🌿','⚡','🏖️','🎯','🔤','💬','🧳'];

interface WordInfo { translation: string; article?: 'de' | 'het' }

async function fetchWordInfo(dutch: string): Promise<WordInfo> {
  try {
    const res = await claudeFetch({
      method: 'POST',
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 40,
        system: 'You are an English–Russian dictionary. Reply with JSON only, no markdown: {"translation":"<1-4 word Russian translation>"}.',
        messages: [{ role: 'user', content: `English word: "${dutch}"` }],
      }),
    });
    if (!res.ok) return { translation: '' };
    const data = await res.json() as { content: { text: string }[] };
    const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(raw) as { translation: string };
    return { translation: parsed.translation || '' };
  } catch { return { translation: '' }; }
}

async function generateExample(dutch: string): Promise<string> {
  try {
    const res = await claudeFetch({
      method: 'POST',
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 80,
        system: 'You are an English language teacher. Generate ONE short, natural British English A1–A2 sentence using the given word. Return ONLY the English sentence — no translation, no explanation.',
        messages: [{ role: 'user', content: `Word: ${dutch}` }],
      }),
    });
    if (!res.ok) return '';
    const data = await res.json() as { content: { text: string }[] };
    return data.content[0].text.trim();
  } catch { return ''; }
}

interface Props {
  set: CustomSet;
  onBack: () => void;
  onAddWord: (setId: string, word: CustomWord) => void;
  onRemoveWord: (setId: string, dutch: string) => void;
  onUpdateWord: (setId: string, oldDutch: string, updated: CustomWord) => void;
  onStartPractice: (set: CustomSet) => void;
  onDelete: (id: string) => void;
}

export function CustomSetEditor({ set, onBack, onAddWord, onRemoveWord, onUpdateWord, onStartPractice, onDelete }: Props) {
  const [dutch, setDutch] = useState('');
  const [english, setEnglish] = useState('');
  const [example, setExample] = useState('');
  const [article, setArticle] = useState<'de' | 'het' | undefined>(undefined);
  const [generating, setGenerating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [addError, setAddError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  // Edit state
  const [editingDutch, setEditingDutch] = useState<string | null>(null);
  const [editDutch, setEditDutch] = useState('');
  const [editEnglish, setEditEnglish] = useState('');
  const [editExample, setEditExample] = useState('');
  const [editArticle, setEditArticle] = useState<'de' | 'het' | undefined>(undefined);
  const [confirmDeleteWord, setConfirmDeleteWord] = useState<string | null>(null);

  async function handleDutchBlur() {
    const word = dutch.trim();
    if (!word) return;
    setFetching(true);
    const info = await fetchWordInfo(word);
    if (info.translation && !english.trim()) setEnglish(info.translation);
    if (info.article) setArticle(info.article);
    setFetching(false);
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
    if (!d || !e) { setAddError('Enter both the English word and the Russian translation.'); return; }
    if (set.words.some(w => w.dutch.toLowerCase() === d.toLowerCase())) {
      setAddError('Word already in this set.'); return;
    }
    onAddWord(set.id, { dutch: d, english: e, example: example.trim() || undefined, article });
    setDutch(''); setEnglish(''); setExample(''); setArticle(undefined); setAddError('');
  }

  function startEdit(word: CustomWord) {
    setEditingDutch(word.dutch);
    setEditDutch(word.dutch);
    setEditEnglish(word.english);
    setEditExample(word.example || '');
    setEditArticle(word.article);
    setConfirmDeleteWord(null);
  }

  function saveEdit() {
    if (!editingDutch || !editDutch.trim() || !editEnglish.trim()) return;
    onUpdateWord(set.id, editingDutch, {
      dutch: editDutch.trim(),
      english: editEnglish.trim(),
      example: editExample.trim() || undefined,
      article: editArticle,
    });
    setEditingDutch(null);
  }

  return (
    <div className="animate-fade-in space-y-4 pb-6">
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
            <label className="text-xs text-muted-foreground mb-1 block">English word</label>
            <div className="flex gap-2">
              <Input
                value={dutch}
                onChange={e => { setDutch(e.target.value); setArticle(undefined); }}
                onBlur={handleDutchBlur}
                placeholder="e.g. bicycle"
                className="text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1 block">
              Russian {fetching && <Loader2 className="h-3 w-3 animate-spin" />}
            </label>
            <Input
              value={english}
              onChange={e => setEnglish(e.target.value)}
              placeholder="e.g. велосипед"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5 block">
              <Sparkles className="h-3 w-3 text-purple-500" />
              Example sentence
              {generating && <Loader2 className="h-3 w-3 animate-spin" />}
              {!generating && !example && dutch.trim() && (
                <button className="text-xs text-primary underline underline-offset-2"
                  onClick={async () => {
                    setGenerating(true);
                    const ex = await generateExample(dutch.trim());
                    if (ex) setExample(ex);
                    setGenerating(false);
                  }}>Generate</button>
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
          disabled={!dutch.trim() || !english.trim() || generating || fetching}
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
            <Card key={word.dutch} className="p-3">
              {editingDutch === word.dutch ? (
                // ── Edit mode ──
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-muted-foreground mb-0.5 block">English</label>
                      <div className="flex gap-1.5">
                        <input value={editDutch} onChange={e => setEditDutch(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground mb-0.5 block">Russian</label>
                      <input value={editEnglish} onChange={e => setEditEnglish(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground mb-0.5 block">Example</label>
                    <input value={editExample} onChange={e => setEditExample(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 h-7 text-xs" onClick={saveEdit}
                      disabled={!editDutch.trim() || !editEnglish.trim()}>Save</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingDutch(null)}>Cancel</Button>
                  </div>
                </div>
              ) : confirmDeleteWord === word.dutch ? (
                // ── Delete confirm ──
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground truncate">Remove "{word.dutch}"?</p>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setConfirmDeleteWord(null)} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1">Cancel</button>
                    <button onClick={() => { onRemoveWord(set.id, word.dutch); setConfirmDeleteWord(null); }}
                      className="text-xs font-semibold text-white bg-destructive px-3 py-1 rounded-md">Remove</button>
                  </div>
                </div>
              ) : (
                // ── Normal row ──
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">{word.dutch}</span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-sm text-muted-foreground">{word.english}</span>
                    </div>
                    {word.example && (
                      <p className="text-xs text-muted-foreground italic mt-0.5 leading-relaxed">"{word.example}"</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(word)} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => { setConfirmDeleteWord(word.dutch); setEditingDutch(null); }} className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded hover:bg-destructive/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
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
              <button onClick={() => setConfirmDelete(false)} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1">Cancel</button>
              <button onClick={() => { onDelete(set.id); onBack(); }} className="text-xs font-semibold text-white bg-destructive px-3 py-1 rounded-md">Delete</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="h-3.5 w-3.5" /> Delete this set
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
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Set name</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Food & Drinks" autoFocus />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">Icon</label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map(e => (
              <button key={e} onClick={() => setEmoji(e)}
                className={`text-xl rounded-lg p-1.5 transition-all ${emoji === e ? 'bg-primary/15 ring-2 ring-primary' : 'hover:bg-secondary'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" disabled={!title.trim()} onClick={() => onCreate(title.trim(), emoji)}>
          Create Set
        </Button>
      </Card>
    </div>
  );
}
