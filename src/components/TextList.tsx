import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { ArrowRight, ChevronRight, CircleCheck, Search, Sparkles, X } from 'lucide-react';
import { ReadingText, Module, Level } from '@/types/dutch';
import { GenerateTextView } from '@/components/GenerateTextView';
import { getContinueText } from '@/lib/continueReading';

interface TextListProps {
  onSelect: (text: ReadingText) => void;
  openLevel: Level | null;
  setOpenLevel: Dispatch<SetStateAction<Level | null>>;
}

// Module keys match the `module` field of the texts (content/CURRICULUM.md)
const moduleInfo: { key: Module; number: number; label: string; level: Level }[] = [
  { key: 'a1-flatmates',     number: 1, label: 'New Flatmates',             level: 'A1' },
  { key: 'a1-cafe',          number: 2, label: 'The Café Shift',            level: 'A1' },
  { key: 'a1-london',        number: 3, label: 'Lost in London',            level: 'A1' },
  { key: 'a1-group-chat',    number: 4, label: 'The Group Chat',            level: 'A1' },
  { key: 'a1-challenge',     number: 5, label: '30-Day Challenge',          level: 'A1' },
  { key: 'a2-interview',     number: 1, label: 'The Job Interview',         level: 'A2' },
  { key: 'a2-festival',      number: 2, label: 'Festival Weekend',          level: 'A2' },
  { key: 'a2-swipe-right',   number: 3, label: 'Swipe Right',               level: 'A2' },
  { key: 'a2-flat-hunting',  number: 4, label: 'Flat Hunting',              level: 'A2' },
  { key: 'a2-influencer',    number: 5, label: 'The Influencer Experiment', level: 'A2' },
  { key: 'a2-road-trip',     number: 6, label: 'Road Trip to Scotland',     level: 'A2' },
  { key: 'b1-startup',       number: 1, label: 'The Startup',               level: 'B1' },
  { key: 'b1-hostel',        number: 2, label: 'Mystery at the Hostel',     level: 'B1' },
  { key: 'b1-burnout',       number: 3, label: 'Burnout',                   level: 'B1' },
  { key: 'b1-podcast',       number: 4, label: 'Podcast Hosts',             level: 'B1' },
  { key: 'b1-green-street',  number: 5, label: 'The Green Street',          level: 'B1' },
  { key: 'b1-family-dinner', number: 6, label: 'Family Dinner',             level: 'B1' },
  { key: 'b1-year-abroad',   number: 7, label: 'One Year Abroad',           level: 'B1' },
];

const LEVELS: Level[] = ['A1', 'A2', 'B1'];

/** Learners at this stage read about 80 words a minute. */
function readingMinutes(text: ReadingText): number {
  return Math.max(1, Math.round(text.content.split(/\s+/).length / 80));
}

const number = (i: number) => String(i + 1).padStart(2, '0');

export function TextList({ onSelect, openLevel, setOpenLevel }: TextListProps) {
  const { texts } = useLearning();
  const [showGenerator, setShowGenerator] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const level = openLevel ?? 'A1';
  const continueText = useMemo(() => getContinueText(texts), [texts]);

  const modules = moduleInfo
    .filter(mod => mod.level === level)
    .map(mod => ({ ...mod, texts: texts.filter(t => t.module === mod.key) }));

  // ===== AI TEXT GENERATOR =====
  if (showGenerator) {
    return (
      <div className="lg:mx-auto lg:w-full lg:max-w-[720px]">
        <GenerateTextView
          level={level}
          onBack={() => setShowGenerator(false)}
          onTextGenerated={(text) => {
            setShowGenerator(false);
            onSelect(text);
          }}
        />
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const results = q
    ? texts.filter(t => t.title.toLowerCase().includes(q) || t.titleTranslation?.toLowerCase().includes(q))
    : [];

  function openSearch() {
    setSearching(true);
    setTimeout(() => searchRef.current?.focus(), 0);
  }

  function closeSearch() {
    setSearching(false);
    setQuery('');
  }

  const levelSwitch = (
    <div className="grid grid-cols-3 gap-1 rounded-xl bg-track p-1 lg:w-[240px]" role="tablist" aria-label="Level">
      {LEVELS.map(lvl => {
        const active = lvl === level;
        return (
          <button
            key={lvl}
            role="tab"
            aria-selected={active}
            onClick={() => setOpenLevel(lvl)}
            className={`h-9 rounded-[9px] text-sm transition-colors ${
              active ? 'bg-card font-semibold text-foreground shadow-[0_1px_3px_hsl(20_30%_10%/0.12)]' : 'font-medium text-muted-foreground hover:text-foreground'
            }`}
          >
            {lvl}
          </button>
        );
      })}
    </div>
  );

  const searchButton = (
    <button onClick={openSearch} aria-label="Search stories" className="-mr-2.5 rounded-xl p-2.5 text-foreground transition-colors hover:bg-secondary lg:mr-0 lg:text-muted-foreground lg:hover:text-foreground">
      <Search className="h-[22px] w-[22px] lg:h-5 lg:w-5" strokeWidth={2.25} />
    </button>
  );

  return (
    <div className="animate-fade-in flex flex-col gap-[22px] lg:mx-auto lg:w-full lg:max-w-[800px] lg:gap-7">
      {/* Header: title, level switch (laptop) and search */}
      <div className="flex min-h-11 items-center justify-between gap-3">
        {searching ? (
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3">
            <Search className="h-[18px] w-[18px] shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Escape') closeSearch(); }}
              placeholder="Search stories"
              aria-label="Search stories"
              className="h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
            <button onClick={closeSearch} aria-label="Close search" className="-mr-1.5 rounded-lg p-1.5 text-muted-foreground hover:text-foreground">
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-heading text-[28px] font-semibold leading-tight tracking-[-0.015em] text-foreground lg:text-[36px] lg:tracking-[-0.02em]">Library</h1>
            <div className="flex items-center gap-2">
              <div className="hidden lg:block">{levelSwitch}</div>
              {searchButton}
            </div>
          </>
        )}
      </div>

      {searching ? (
        <SearchResults query={q} results={results} onSelect={onSelect} />
      ) : (
        <>
          {/* Phones: level switch under the title */}
          <div className="lg:hidden">{levelSwitch}</div>

          {/* Continue reading */}
          {continueText && (
            <ContinueCard
              text={continueText.text}
              label={continueText.label}
              cta={continueText.cta}
              onRead={() => onSelect(continueText.text)}
            />
          )}

          {/* Modules: numbered story lists */}
          {modules.map(mod => {
            const done = mod.texts.filter(t => t.completed).length;
            return (
              <section key={mod.key} className="flex flex-col gap-1" aria-label={mod.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="min-w-0 font-heading text-lg font-semibold leading-tight text-foreground">{mod.label}</h2>
                  <span className="shrink-0 text-[13px] text-muted-foreground">
                    {mod.texts.length ? `${done} of ${mod.texts.length} read` : 'Coming soon'}
                  </span>
                </div>
                {mod.texts.length > 0 && (
                  <div className="flex flex-col">
                    {mod.texts.map((text, i) => (
                      <button
                        key={text.id}
                        onClick={() => onSelect(text)}
                        className="group flex items-center gap-3.5 border-t border-border px-0.5 py-3.5 text-left first:border-t-0"
                      >
                        <span className="w-[22px] shrink-0 font-heading text-[15px] text-muted-foreground">{number(i)}</span>
                        <span className="flex min-w-0 flex-1 flex-col gap-px">
                          <span className="truncate text-[15px] font-semibold text-foreground group-hover:text-primary">{text.title}</span>
                          <span className="text-xs text-muted-foreground">{readingMinutes(text)} min</span>
                        </span>
                        {text.completed ? (
                          <CircleCheck className="h-5 w-5 shrink-0 fill-success text-card" aria-label="Read" />
                        ) : text.id === continueText?.text.id ? (
                          <span className="shrink-0 rounded-full bg-highlight-soft px-2 py-[3px] text-[11px] font-semibold text-highlight-ink">New</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {/* Generate your own text */}
          <button
            onClick={() => setShowGenerator(true)}
            className="flex items-center gap-3 self-start rounded-xl border border-dashed border-primary/40 bg-card px-4 py-3 text-left transition-colors hover:bg-secondary/50"
          >
            <Sparkles className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
            <span className="flex flex-col">
              <span className="text-[15px] font-semibold text-foreground">Generate your own text</span>
              <span className="text-[13px] text-muted-foreground">AI writes a {level} story for you</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

function ContinueCard({ text, label, cta, onRead }: { text: ReadingText; label: string; cta: string; onRead: () => void }) {
  const { texts } = useLearning();
  const moduleTexts = texts.filter(t => t.module === text.module);
  const position = moduleTexts.findIndex(t => t.id === text.id) + 1;
  const done = moduleTexts.filter(t => t.completed).length;
  const pct = moduleTexts.length ? (done / moduleTexts.length) * 100 : 0;

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card px-[18px] py-4 lg:px-6 lg:py-[22px]">
      <span className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">{label}</span>
      <span className="font-heading text-xl font-semibold leading-tight text-foreground lg:text-2xl">{text.title}</span>
      {position > 0 && (
        <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
          <div
            className="h-1 flex-1 overflow-hidden rounded-full bg-track"
            role="progressbar"
            aria-label={`${done} of ${moduleTexts.length} stories read in this module`}
            aria-valuenow={Math.round(pct)}
          >
            <div className="h-full rounded-full bg-highlight" style={{ width: `${pct}%` }} />
          </div>
          <span className="whitespace-nowrap">Story {position} of {moduleTexts.length}</span>
        </div>
      )}
      <button
        onClick={onRead}
        className="mt-1 flex h-[46px] items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:scale-[0.99] lg:w-[200px]"
      >
        {cta} <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function SearchResults({ query, results, onSelect }: { query: string; results: ReadingText[]; onSelect: (text: ReadingText) => void }) {
  if (!query) {
    return <p className="text-sm text-muted-foreground">Type a story title, in English or Russian.</p>;
  }
  if (results.length === 0) {
    return <p className="text-sm text-muted-foreground">No stories match “{query}”.</p>;
  }
  return (
    <div className="flex flex-col">
      {results.map(text => {
        const mod = moduleInfo.find(m => m.key === text.module);
        return (
          <button
            key={text.id}
            onClick={() => onSelect(text)}
            className="group flex items-center gap-3.5 border-t border-border px-0.5 py-3.5 text-left first:border-t-0"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                {text.level}{mod ? ` · ${mod.label}` : ''}
              </span>
              <span className="truncate text-[15px] font-semibold text-foreground group-hover:text-primary">{text.title}</span>
              {text.titleTranslation && <span className="truncate text-[13px] text-muted-foreground">{text.titleTranslation}</span>}
            </span>
            {text.completed
              ? <CircleCheck className="h-5 w-5 shrink-0 fill-success text-card" aria-label="Read" />
              : <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  );
}
