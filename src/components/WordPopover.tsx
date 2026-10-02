import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkPlus, Volume2, Loader2 } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { playDutch } from '@/utils/playDutch';
import { toast } from '@/components/ui/sonner';
import type { SeparableVerbEntry } from '@/data/vocabulary';
import { claudeFetch } from '@/lib/ai';
import { lookupWord } from '@/lib/dictionary';

interface WordPopoverProps {
  word: string;
  display?: string;
  translation: string;
  plural?: string;
  example?: string;
  exampleTranslation?: string;
  status?: 'new' | 'learning' | 'known';
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

export function WordPopover({
  word, display, translation, plural, example, exampleTranslation,
  status = 'new', highlighted = true, sentence, separableVerb,
}: WordPopoverProps) {
  const [open, setOpen] = useState(false);
  const { addWord, removeWord, vocabulary } = useLearning();
  const [liveTranslation, setLiveTranslation] = useState(translation);
  const [loading, setLoading] = useState(false);

  // For separable verbs, check saved state by infinitive
  const saveKey = separableVerb ? separableVerb.infinitive.split(' ')[0].toLowerCase() : word.toLowerCase();
  const isSaved = !!vocabulary[saveKey] && vocabulary[saveKey]?.status !== 'ignored';

  const statusClass = separableVerb
    ? 'word-separable'
    : highlighted
      ? 'word-keyword'
      : status === 'known' ? 'word-known' : status === 'learning' ? 'word-learning' : 'word-plain';

  useEffect(() => {
    if (!open) return;
    if (separableVerb) return; // no external translation needed
    if (translation) { setLiveTranslation(translation); return; }
    setLoading(true);
    fetchWordInfo(word, sentence)
      .then(info => setLiveTranslation(info.translation || 'Перевод недоступен'))
      .finally(() => setLoading(false));
  }, [open, word, translation, sentence, separableVerb]);

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span className={`word-clickable ${statusClass}`} onClick={() => setOpen(true)}>
          {display ?? word}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-72 animate-scale-in" align="center">
        <div className="space-y-3">

          {separableVerb ? (
            // ── Phrasal verb layout (only when the text provides verb data) ──
            <>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-700">phrasal verb</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground">{separableVerb.infinitive}</h4>
                <p className="text-base text-muted-foreground">{separableVerb.english}</p>
              </div>
              <div className="rounded-md bg-blue-50 border border-blue-100 p-3 space-y-1">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">How it splits</p>
                <p className="text-sm text-foreground">
                  <span className="font-bold text-blue-600">{word}</span>
                  <span className="text-muted-foreground"> … </span>
                  <span className="font-bold text-blue-600">{separableVerb.prefix}</span>
                </p>
                <p className="text-xs text-muted-foreground">The particle can go after the object</p>
              </div>
              {effectiveExample && (
                <div className="rounded-md bg-secondary p-3">
                  <p className="text-sm font-medium italic text-secondary-foreground">"{effectiveExample}"</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">Saved as: <span className="font-semibold text-foreground">{separableVerb.infinitive.split(' ')[0]}</span></p>
            </>
          ) : (
            // ── Regular word layout ──
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-lg font-semibold text-foreground">{word}</h4>
                </div>
                {status !== 'ignored' && (
                  <span className={`level-badge ${status === 'known' ? 'bg-success text-success-foreground' : status === 'learning' ? 'bg-warning text-warning-foreground' : 'bg-accent text-accent-foreground'}`}>
                    {status}
                  </span>
                )}
              </div>
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Translating…
                </div>
              ) : (
                <p className="text-base text-muted-foreground">{liveTranslation || '—'}</p>
              )}
              {plural && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Plural:</span> {plural}
                </p>
              )}
              {effectiveExample && (
                <div className="rounded-md bg-secondary p-3">
                  <p className="text-sm font-medium italic text-secondary-foreground">"{effectiveExample}"</p>
                  {exampleTranslation && (
                    <p className="mt-1 text-xs text-muted-foreground">{exampleTranslation}</p>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={speak}>
              <Volume2 className="h-3.5 w-3.5" />
              Listen
            </Button>
            <Button
              size="sm"
              variant={isSaved ? 'secondary' : 'default'}
              className="flex-1 gap-1.5"
              onClick={toggleSave}
              aria-pressed={isSaved}
              disabled={loading}
            >
              {isSaved ? (
                <><Bookmark className="h-3.5 w-3.5 fill-current" /> Saved</>
              ) : (
                <><BookmarkPlus className="h-3.5 w-3.5" /> Save</>
              )}
            </Button>
          </div>

        </div>
      </PopoverContent>
    </Popover>
  );
}
