import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { ArrowRight, Check, ChevronRight, Search, Sparkles, X } from 'lucide-react';
import { ReadingText, Module, Level } from '@/types/dutch';
import { GenerateTextView } from '@/components/GenerateTextView';
import { getContinueText } from '@/lib/continueReading';
import { getTextReadHistory } from '@/lib/textReadHistory';
import { coverIcon, COVER_TONES } from '@/data/english/covers';

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

const levels: { key: Level; name: string }[] = [
  { key: 'A1', name: 'Beginner' },
  { key: 'A2', name: 'Elementary' },
  { key: 'B1', name: 'Intermediate' },
];

/** Learners at this stage read about 80 words a minute. */
function readingMinutes(text: ReadingText): number {
  return Math.max(1, Math.round(text.content.split(/\s+/).length / 80));
}

export function TextList({ onSelect, openLevel, setOpenLevel }: TextListProps) {
  const { texts } = useLearning();
  const [showGenerator, setShowGenerator] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const level = openLevel ?? 'A1';
  const continueText = useMemo(() => getContinueText(texts), [texts]);
  const history = useMemo(() => getTextReadHistory(), []);

  const modulesFor = (lvl: Level) =>
    moduleInfo
      .filter(mod => mod.level === lvl)
      .map(mod => ({ ...mod, texts: texts.filter(t => t.module === mod.key) }));
  const modules = modulesFor(level);

  const eyebrow = 'text-[11px] font-bold uppercase tracking-[0.08em]';

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

  return (
    <div className="animate-fade-in flex flex-col gap-5 lg:gap-7">
      {/* Header: title + search */}
      <div className="flex min-h-11 items-center justify-between gap-2">
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
            <button onClick={openSearch} aria-label="Search stories" className="-mr-2.5 rounded-xl p-2.5 text-foreground transition-colors hover:bg-secondary">
              <Search className="h-[22px] w-[22px]" strokeWidth={2.25} />
            </button>
          </>
        )}
      </div>

      {searching ? (
        <SearchResults query={q} results={results} onSelect={onSelect} />
      ) : (
        <>
          {/* Continue hero */}
          {continueText ? (
            <ContinueHero
              text={continueText.text}
              label={continueText.label}
              cta={continueText.cta}
              onRead={() => onSelect(continueText.text)}
            />
          ) : (
            <div className="flex flex-col gap-2 rounded-[14px] bg-hero p-[18px] text-hero-foreground">
              <span className={`${eyebrow} opacity-80`}>All read</span>
              <span className="font-heading text-[23px] font-semibold leading-tight">You've read every story</span>
              <span className="text-[13px] opacity-85">New modules are on the way. Meanwhile, ask the AI for a story of your own.</span>
            </div>
          )}

          {/* Levels */}
          <div className="flex gap-2 lg:gap-3" role="tablist" aria-label="Level">
            {levels.map(lvl => {
              const levelTexts = modulesFor(lvl.key).flatMap(m => m.texts);
              const done = levelTexts.filter(t => t.completed).length;
              const total = levelTexts.length;
              const active = lvl.key === level;
              return (
                <button
                  key={lvl.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setOpenLevel(lvl.key)}
                  className={`flex flex-1 flex-col gap-1.5 rounded-xl px-3 pb-3.5 pt-3 text-left transition-colors lg:px-4 ${
                    active ? 'bg-hero text-hero-foreground' : 'border border-border bg-card hover:bg-secondary/50'
                  }`}
                >
                  <span className="font-heading text-2xl font-semibold leading-none">{lvl.key}</span>
                  <span className={`text-xs ${active ? 'opacity-85' : 'text-muted-foreground'}`}>{lvl.name}</span>
                  <div className={`mt-1 h-1 overflow-hidden rounded-full ${active ? 'bg-white/25' : 'bg-track'}`}>
                    <div
                      className={`h-full rounded-full ${active ? 'bg-white' : 'bg-primary'}`}
                      style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className={`text-[11px] ${active ? 'opacity-85' : 'text-muted-foreground'}`}>
                    {total ? `${done} of ${total}` : 'Coming soon'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Modules with story covers */}
          {modules.map(mod => {
            const done = mod.texts.filter(t => t.completed).length;
            return (
              <section key={mod.key} className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="min-w-0 font-heading text-[19px] font-semibold leading-tight text-foreground">
                    Module {mod.number} · {mod.label}
                  </h2>
                  <span className="shrink-0 text-[13px] text-muted-foreground">
                    {mod.texts.length ? `${done} of ${mod.texts.length}` : 'Coming soon'}
                  </span>
                </div>
                {mod.texts.length > 0 && (
                  <div className="-mx-5 flex snap-x gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-8 lg:overflow-visible lg:px-0">
                    {mod.texts.map((text, i) => (
                      <StoryCover
                        key={text.id}
                        text={text}
                        index={i}
                        badge={text.completed ? 'done' : text.id === continueText?.text.id && !history[text.id] ? 'new' : null}
                        onSelect={onSelect}
                      />
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

function ContinueHero({ text, label, cta, onRead }: { text: ReadingText; label: string; cta: string; onRead: () => void }) {
  const { texts } = useLearning();
  const mod = moduleInfo.find(m => m.key === text.module);
  const moduleTexts = texts.filter(t => t.module === text.module);
  const position = moduleTexts.findIndex(t => t.id === text.id) + 1;
  const done = moduleTexts.filter(t => t.completed).length;
  const pct = moduleTexts.length ? (done / moduleTexts.length) * 100 : 0;

  return (
    <div className="relative flex min-h-[170px] flex-col gap-2 overflow-hidden rounded-[14px] bg-hero p-[18px] text-hero-foreground lg:min-h-[200px] lg:p-6">
      <HeroSkyline />
      <span className="relative text-[11px] font-bold uppercase tracking-[0.08em] opacity-80">
        {label}{mod ? ` · Module ${mod.number}` : ''}
      </span>
      <span className="relative max-w-[240px] font-heading text-[23px] font-semibold leading-tight lg:max-w-[420px] lg:text-[28px]">{text.title}</span>
      <span className="relative text-[13px] opacity-85">
        {position > 0 ? `Story ${position} of ${moduleTexts.length} · ` : ''}about {readingMinutes(text)} min
      </span>
      <div className="relative mt-auto flex items-center gap-3 pt-1">
        <div
          className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/25"
          role="progressbar"
          aria-label={`${done} of ${moduleTexts.length} stories read in this module`}
          aria-valuenow={Math.round(pct)}
        >
          <div className="h-full rounded-full bg-[hsl(354_90%_72%)]" style={{ width: `${pct}%` }} />
        </div>
        <button
          onClick={onRead}
          className="flex h-[38px] shrink-0 items-center gap-1.5 rounded-[10px] bg-white px-4 text-sm font-semibold text-[hsl(220_62%_28%)] transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          {cta === 'Continue' ? 'Read' : cta} <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function StoryCover({ text, index, badge, onSelect }: {
  text: ReadingText;
  index: number;
  badge: 'done' | 'new' | null;
  onSelect: (text: ReadingText) => void;
}) {
  const Icon = coverIcon(text.id);
  const tone = COVER_TONES[index % COVER_TONES.length];
  return (
    <button
      onClick={() => onSelect(text)}
      className="group flex w-[132px] shrink-0 snap-start flex-col gap-2 text-left lg:w-auto"
      aria-label={`Story ${index + 1}: ${text.title}${badge === 'done' ? ', read' : ''}`}
    >
      <div className={`relative flex h-[150px] w-full flex-col overflow-hidden rounded-xl p-3 transition-transform group-hover:-translate-y-0.5 group-active:scale-[0.98] ${tone.bg}`}>
        <span className={`font-heading text-[40px] font-semibold leading-none opacity-90 ${tone.ink}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon className={`absolute bottom-2.5 right-2.5 h-[46px] w-[46px] ${tone.ink}`} strokeWidth={1.5} />
        {badge === 'done' && (
          <span className="absolute right-2.5 top-2.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-white">
            <Check className="h-3 w-3 text-success" strokeWidth={3.5} />
          </span>
        )}
        {badge === 'new' && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-white px-[7px] py-[3px] text-[10px] font-bold tracking-[0.04em] text-[hsl(354_72%_34%)]">
            NEW
          </span>
        )}
      </div>
      <span className="line-clamp-2 font-heading text-[15px] font-semibold leading-tight text-foreground">{text.title}</span>
    </button>
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
    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3">
      {results.map(text => {
        const mod = moduleInfo.find(m => m.key === text.module);
        const Icon = coverIcon(text.id);
        return (
          <button
            key={text.id}
            onClick={() => onSelect(text)}
            className="card-hover flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 text-left active:scale-[0.99]"
          >
            <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] bg-accent">
              {text.completed
                ? <Check className="h-5 w-5 text-success" strokeWidth={2.5} />
                : <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                {text.level}{mod ? ` · Module ${mod.number} · ${mod.label}` : ''}
              </span>
              <span className="font-heading text-base font-semibold leading-tight text-foreground">{text.title}</span>
              {text.titleTranslation && <span className="truncate text-[13px] text-muted-foreground">{text.titleTranslation}</span>}
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />
          </button>
        );
      })}
    </div>
  );
}

/** Faint London skyline (Big Ben, the Eye, rooftops) in the corner of the hero. */
function HeroSkyline() {
  return (
    <svg viewBox="0 0 360 90" width="100%" height="90" preserveAspectRatio="xMaxYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 block opacity-[0.18]" aria-hidden="true">
      <g fill="#fff">
        <path d="M300 90V30h-4V18h4v-6l10-12 10 12v6h4v12h-4v60z" />
        <path d="M196 90V62h6v-6h6v6h14v-6h6v6h14v-6h6v6h12v-6h6v6h22v28z" />
        <path d="M326 90V64h10v-6h6v6h18v26z" />
      </g>
      <circle cx="140" cy="54" r="32" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M140 22v64M108 54h64M117 31l46 46M163 31l-46 46" stroke="#fff" strokeWidth="1" />
      <path d="M140 54l-12 36M140 54l12 36" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}
