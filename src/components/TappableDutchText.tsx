/**
 * TappableDutchText — renders Dutch text where each word is tappable.
 * Tapping a word fetches an AI translation and shows a small fixed popup with
 * a "Save to flashcards" button.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { claudeFetch } from '@/lib/ai';

// ─── Translation helper (shared cache) ────────────────────────────────────────
const cache: Record<string, string> = {};

async function translateWord(word: string): Promise<string> {
  const key = word.toLowerCase();
  if (cache[key]) return cache[key];
  try {
    { // Claude first; falls back to MyMemory below
      const res = await claudeFetch({
        method: 'POST',
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 40,
          system:
            'You are an English dictionary. Return only a simple 1–4 word definition or translation of the English word or short phrase, nothing else.',
          messages: [{ role: 'user', content: word }],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { content: { text: string }[] };
        const t = data.content[0].text.trim();
        cache[key] = t;
        return t;
      }
    }
    // Fallback to MyMemory
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=nl|en`,
    );
    const data = await res.json();
    const t = (data?.responseData?.translatedText as string) || '';
    cache[key] = t;
    return t;
  } catch {
    return '';
  }
}

// ─── Popup state ───────────────────────────────────────────────────────────────
interface PopupState {
  word: string;
  translation: string;
  loading: boolean;
  // viewport-relative coordinates
  anchorLeft: number;
  anchorTop: number;  // top of the word's rect
}

// ─── TappableWord ──────────────────────────────────────────────────────────────
function TappableWord({
  word,
  display,
  className,
  onShowPopup,
}: {
  word: string;
  display: string;
  className?: string;
  onShowPopup: (word: string, rect: DOMRect) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`cursor-pointer rounded px-0.5 transition-colors hover:bg-primary/10 active:bg-primary/20 ${className ?? ''}`}
      onClick={() => {
        if (ref.current) onShowPopup(word, ref.current.getBoundingClientRect());
      }}
    >
      {display}
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
interface TappableDutchTextProps {
  text: string;
  className?: string;
  /** Words to highlight in orange (e.g. saved vocabulary) */
  highlightWords?: Set<string>;
  /** Words to highlight in purple (e.g. new words) */
  newWords?: Set<string>;
}

function normalize(s: string) {
  return s.replace(/[.,!?;:"'«»''""()]/g, '').toLowerCase().trim();
}

export function TappableDutchText({
  text,
  className,
  highlightWords,
  newWords,
}: TappableDutchTextProps) {
  const { addWord, vocabulary } = useLearning();
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [savedNow, setSavedNow] = useState<Set<string>>(new Set());
  const popupRef = useRef<HTMLDivElement>(null);

  const tokens = text.split(/(\s+)/);

  const handleShowPopup = useCallback(async (word: string, rect: DOMRect) => {
    const popupW = 176; // 44 * 4
    const left = Math.max(8, Math.min(rect.left + rect.width / 2 - popupW / 2, window.innerWidth - popupW - 8));
    setPopup({ word, translation: '', loading: true, anchorLeft: left, anchorTop: rect.top });
    const t = await translateWord(word);
    setPopup(prev => prev && prev.word === word ? { ...prev, translation: t, loading: false } : prev);
  }, []);

  function handleSave() {
    if (!popup) return;
    addWord(popup.word, popup.translation || popup.word);
    setSavedNow(prev => new Set(prev).add(popup.word));
    setTimeout(() => setPopup(null), 900);
  }

  useEffect(() => {
    function onDown(e: PointerEvent) {
      if (popup && popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null);
      }
    }
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [popup]);

  const isSaved = popup ? savedNow.has(popup.word) || !!vocabulary[popup.word] : false;

  return (
    <>
      <span className={className}>
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const punct = tok.replace(/[a-zA-Zàáâãäåèéêëìíîïòóôõöùúûüýÿ]/gi, '');
          const clean = normalize(tok);
          if (!clean) return <span key={i}>{tok}</span>;
          const wordOnly = tok.replace(/[.,!?;:"'«»''""()]/g, '');

          const wordClass = highlightWords?.has(clean)
            ? 'font-semibold text-orange-500'
            : newWords?.has(clean)
            ? 'font-semibold text-purple-600 underline decoration-dotted underline-offset-2'
            : '';

          return (
            <span key={i}>
              <TappableWord word={clean} display={wordOnly} className={wordClass} onShowPopup={handleShowPopup} />
              {punct}
            </span>
          );
        })}
      </span>

      {/* Fixed popup — positioned relative to viewport */}
      {popup && (
        <div
          ref={popupRef}
          className="fixed z-[9999] w-44 animate-fade-in"
          style={{
            left: popup.anchorLeft,
            top: popup.anchorTop - 8,
            transform: 'translateY(-100%)',
          }}
          onPointerDown={e => e.stopPropagation()}
        >
          <div className="rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
            <div className="px-3 pt-2.5 pb-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Dutch</p>
              <p className="text-sm font-medium text-foreground">{popup.word}</p>
            </div>
            <div className="px-3 pb-2.5 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">English</p>
              {popup.loading
                ? <span className="flex items-center gap-1 text-xs text-muted-foreground italic"><Loader2 className="h-3 w-3 animate-spin" /> Translating…</span>
                : <p className="text-sm text-foreground">{popup.translation || '—'}</p>
              }
            </div>
            <button
              onPointerDown={e => { e.stopPropagation(); handleSave(); }}
              className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold transition-all ${
                isSaved ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {isSaved ? <><Check className="h-3.5 w-3.5" /> Saved!</> : <><BookmarkPlus className="h-3.5 w-3.5" /> Save to flashcards</>}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
