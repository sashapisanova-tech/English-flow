import { createContext, useContext, useEffect, useId, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, Plus, Volume2, Loader2 } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { playDutch } from '@/utils/playDutch';
import { toast } from '@/components/ui/sonner';
import type { SeparableVerbEntry } from '@/data/vocabulary';
import type { WordStatus } from '@/types/dutch';
import { claudeFetch } from '@/lib/ai';
import { lookupWord } from '@/lib/dictionary';

interface WordPopoverProps {
  word: string;
  display?: string;
  translation: string;
  plural?: string;
  example?: string;
  exampleTranslation?: string;
  status?: WordStatus;
  highlighted?: boolean;
  sentence?: string;
  separableVerb?: SeparableVerbEntry;
}

interface WordInfo { translation: string }
const wordInfoCache: Record<string, WordInfo> = {};

async function fetchWordInfo(word: string, sentence?: string): Promise<WordInfo> {
  const key = sentence ? `${word.toLowerCase()}||${sentence}` : word.toLowerCase();
  if (wordInfoCache[key]) return wordInfoCache[key];
  // Prepared translations first: instant, free, and no AI needed
  const local = lookupWord(word);
  if (local) {
    const info = { translation: local.base ? `${local.translation} (${local.base})` : local.translation };
    wordInfoCache[key] = info;
    return info;
  }
  try {
    { // AI only for words outside the prepared word lists
      const contextSentence = sentence && sentence.toLowerCase().includes(word.toLowerCase()) ? sentence : undefined;
      const userMsg = contextSentence
        ? `English word: "${word}" in context: "${contextSentence}"`
        : `English word: "${word}"`;
      const res = await claudeFetch({
        method: 'POST',
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 40,
          system: 'You are an English–Russian dictionary for learners of British English. Reply with JSON only, no markdown: {"translation":"<1-4 word Russian translation>"}. If a context sentence is given, translate the word as it is used in that sentence.',
          messages: [{ role: 'user', content: userMsg }],
        }),
      });
      if (res.ok) {
        const data = await res.json() as { content: { text: string }[] };
        const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        try {
          const parsed = JSON.parse(raw) as { translation: string };
          const info: WordInfo = { translation: parsed.translation || '' };
          wordInfoCache[key] = info;
          return info;
        } catch {
          wordInfoCache[key] = { translation: raw };
          return wordInfoCache[key];
        }
      }
    }
    // No unreliable public fallback: it returned junk translations
    return { translation: '' };
  } catch {
    return { translation: '' };
  }
}

export interface WordDetailsProps {
  word: string;
  translation: string;
  plural?: string;
  example?: string;
  exampleTranslation?: string;
  status?: WordStatus;
  sentence?: string;
  separableVerb?: SeparableVerbEntry;
}

/**
 * Lets a parent (ReadingView on laptops) show tapped words in a side panel
 * instead of a popover. When `select` returns true the word is handled there.
 */
export interface WordSelection {
  selectedId: string | null;
  select: (id: string, details: WordDetailsProps) => boolean;
}
export const WordSelectionContext = createContext<WordSelection | null>(null);

/** Word card body: word, listen, translation (prepared dictionary, then AI), Add to cards. */
export function WordDetails({
  word, translation, plural, example, exampleTranslation,
  status = 'new', sentence, separableVerb,
}: WordDetailsProps) {
  const { addWord, removeWord, vocabulary } = useLearning();
  const [liveTranslation, setLiveTranslation] = useState(translation);
  const [loading, setLoading] = useState(false);

  // For separable verbs, check saved state by infinitive
  const saveKey = separableVerb ? separableVerb.infinitive.split(' ')[0].toLowerCase() : word.toLowerCase();
  const isSaved = !!vocabulary[saveKey] && vocabulary[saveKey]?.status !== 'ignored';

  useEffect(() => {
    if (separableVerb) return; // no external translation needed
    if (translation) { setLiveTranslation(translation); return; }
    let cancelled = false;
    setLoading(true);
    fetchWordInfo(word, sentence)
      .then(info => { if (!cancelled) setLiveTranslation(info.translation || 'Перевод недоступен'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [word, translation, sentence, separableVerb]);

  const speak = () => {
    try { playDutch(separableVerb ? separableVerb.infinitive.split(' ')[0] : word); } catch {}
  };

  const effectiveExample = example || sentence;

  const toggleSave = () => {
    if (separableVerb) {
      const inf = separableVerb.infinitive.split(' ')[0];
      if (isSaved) {
        removeWord(inf);
        toast(`"${inf}" removed from cards`, { duration: 3000 });
      } else {
        addWord(inf, separableVerb.english, {
          example: effectiveExample,
          ...(sentence ? { sentenceSource: 'text' as const } : {}),
        });
        toast(`"${inf}" saved to learning`, {
          duration: 4000,
          action: { label: 'Undo', onClick: () => removeWord(inf) },
        });
      }
      return;
    }
    if (isSaved) {
      removeWord(word);
      toast(`"${word}" removed from cards`, { duration: 3000 });
    } else {
      addWord(word, liveTranslation || translation || word, {
        plural, example: effectiveExample, exampleTranslation,
        ...(sentence ? { sentenceSource: 'text' as const } : {}),
      });
      toast(`"${word}" saved to learning`, {
        duration: 4000,
        action: { label: 'Undo', onClick: () => removeWord(word) },
      });
    }
  };

  const statusLabel = status === 'known' ? 'Known' : status === 'learning' ? 'Learning' : 'New word';
  const shownWord = separableVerb ? separableVerb.infinitive : word;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          {separableVerb && (
            <span className="mb-1 self-start rounded-full bg-highlight-soft px-2.5 py-0.5 text-xs font-semibold text-highlight-ink">
              Phrasal verb
            </span>
          )}
          <span className="break-words font-heading text-[26px] font-semibold leading-tight text-foreground">{shownWord}</span>
          {!separableVerb && status !== 'ignored' && (
            <span className="text-sm text-muted-foreground">{statusLabel}</span>
          )}
        </div>
        <button
          type="button"
          onClick={speak}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-primary transition-transform hover:bg-accent/80 active:scale-95"
          aria-label={`Listen to "${shownWord}"`}
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>

      {separableVerb ? (
        <>
          <span className="font-heading text-[19px] italic text-foreground">{separableVerb.english}</span>
          <div className="space-y-1 rounded-lg border border-border bg-background p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">How it splits</p>
            <p className="text-sm text-foreground">
              <span className="font-semibold text-primary">{word}</span>
              <span className="text-muted-foreground"> … </span>
              <span className="font-semibold text-primary">{separableVerb.prefix}</span>
            </p>
            <p className="text-xs text-muted-foreground">The particle can go after the object</p>
          </div>
          {effectiveExample && (
            <p className="text-sm leading-relaxed text-muted-foreground">"{effectiveExample}"</p>
          )}
          <p className="text-xs text-muted-foreground">Saved as: <span className="font-semibold text-foreground">{separableVerb.infinitive.split(' ')[0]}</span></p>
        </>
      ) : (
        <>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Translating…
            </div>
          ) : (
            <span className="font-heading text-[19px] italic text-foreground">{liveTranslation || '—'}</span>
          )}
          {plural && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Plural:</span> {plural}
            </p>
          )}
          {effectiveExample && (
            <div className="space-y-0.5">
              <p className="text-sm leading-relaxed text-muted-foreground">"{effectiveExample}"</p>
              {exampleTranslation && (
                <p className="text-xs text-muted-foreground">{exampleTranslation}</p>
              )}
            </div>
          )}
        </>
      )}

      <button
        type="button"
        onClick={toggleSave}
        aria-pressed={isSaved}
        disabled={loading}
        className={`mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-all active:scale-[0.98] disabled:opacity-50 ${
          isSaved
            ? 'border border-border bg-card text-foreground hover:bg-secondary'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {isSaved
          ? <><Check className="h-[18px] w-[18px]" /> Saved to cards</>
          : <><Plus className="h-[18px] w-[18px]" /> Add to cards</>}
      </button>
    </div>
  );
}

export function WordPopover({
  word, display, translation, plural, example, exampleTranslation,
  status = 'new', highlighted = true, sentence, separableVerb,
}: WordPopoverProps) {
  const [open, setOpen] = useState(false);
  // Phones get a bottom sheet (design: 'reading'); tablets keep the anchored popover;
  // laptops (inside ReadingView) show the word in the side panel.
  // Decided at tap time so each word doesn't need its own media-query listener.
  const [asSheet, setAsSheet] = useState(false);
  const selection = useContext(WordSelectionContext);
  const id = useId();
  const inPanel = selection?.selectedId === id;

  const details: WordDetailsProps = {
    word, translation, plural, example, exampleTranslation, status, sentence, separableVerb,
  };

  const statusClass = separableVerb
    ? 'word-separable'
    : highlighted
      ? 'word-keyword'
      : status === 'known' ? 'word-known' : status === 'learning' ? 'word-learning' : 'word-plain';

  const openWord = () => {
    if (selection && window.matchMedia('(min-width: 1024px)').matches && selection.select(id, details)) {
      setOpen(false);
      return;
    }
    setAsSheet(window.matchMedia('(max-width: 767px)').matches);
    setOpen(true);
  };

  const shownWord = separableVerb ? separableVerb.infinitive : word;
  const content = <WordDetails {...details} />;

  const openClass = (open || inPanel) && !highlighted && !separableVerb
    ? ' bg-highlight-soft shadow-[inset_0_-2px_0_hsl(var(--highlight))]'
    : inPanel
      ? ' shadow-[inset_0_-2px_0_hsl(var(--highlight))]'
      : '';

  return (
    <>
      <Popover open={open && !asSheet} onOpenChange={o => { if (!o) setOpen(false); }}>
        <PopoverTrigger asChild>
          <span className={`word-clickable ${statusClass}${openClass}`} onClick={openWord}>
            {display ?? word}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-80 rounded-xl border-border bg-card p-5 animate-scale-in" align="center">
          {content}
        </PopoverContent>
      </Popover>

      {asSheet && (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-[22px] bg-card px-6 pt-2.5 shadow-[0_-10px_30px_-10px_hsl(var(--foreground)/0.25)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:duration-200 data-[state=open]:duration-300"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 2rem)' }}
            >
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
              <DialogPrimitive.Title className="sr-only">{shownWord}</DialogPrimitive.Title>
              {open && content}
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </>
  );
}
