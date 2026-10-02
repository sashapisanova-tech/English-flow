import { Dispatch, SetStateAction, useState } from 'react';
import { useLearning } from '@/context/LearningContext';
import { BookOpen, CheckCircle2, ChevronRight, ChevronLeft, Folder, GraduationCap, Lock, Sparkles } from 'lucide-react';
import { ReadingText, Module, Level } from '@/types/dutch';
import { GenerateTextView } from '@/components/GenerateTextView';

interface TextListProps {
  onSelect: (text: ReadingText) => void;
  openLevel: Level | null;
  setOpenLevel: Dispatch<SetStateAction<Level | null>>;
  openModule: Module | null;
  setOpenModule: Dispatch<SetStateAction<Module | null>>;
}

// Module keys match the `module` field of the texts (content/CURRICULUM.md)
const moduleInfo: { key: Module; number: number; label: string; emoji: string; level: Level }[] = [
  { key: 'a1-flatmates',     number: 1, label: 'New Flatmates',            emoji: '', level: 'A1' },
  { key: 'a1-cafe',          number: 2, label: 'The Café Shift',           emoji: '', level: 'A1' },
  { key: 'a1-london',        number: 3, label: 'Lost in London',           emoji: '', level: 'A1' },
  { key: 'a1-group-chat',    number: 4, label: 'The Group Chat',           emoji: '', level: 'A1' },
  { key: 'a1-challenge',     number: 5, label: '30-Day Challenge',         emoji: '', level: 'A1' },
  { key: 'a2-interview',     number: 1, label: 'The Job Interview',        emoji: '', level: 'A2' },
  { key: 'a2-festival',      number: 2, label: 'Festival Weekend',         emoji: '', level: 'A2' },
  { key: 'a2-swipe-right',   number: 3, label: 'Swipe Right',              emoji: '', level: 'A2' },
  { key: 'a2-flat-hunting',  number: 4, label: 'Flat Hunting',             emoji: '', level: 'A2' },
  { key: 'a2-influencer',    number: 5, label: 'The Influencer Experiment', emoji: '', level: 'A2' },
  { key: 'a2-road-trip',     number: 6, label: 'Road Trip to Scotland',    emoji: '', level: 'A2' },
  { key: 'b1-startup',       number: 1, label: 'The Startup',              emoji: '', level: 'B1' },
  { key: 'b1-hostel',        number: 2, label: 'Mystery at the Hostel',    emoji: '', level: 'B1' },
  { key: 'b1-burnout',       number: 3, label: 'Burnout',                  emoji: '', level: 'B1' },
  { key: 'b1-podcast',       number: 4, label: 'Podcast Hosts',            emoji: '', level: 'B1' },
  { key: 'b1-green-street',  number: 5, label: 'The Green Street',         emoji: '', level: 'B1' },
  { key: 'b1-family-dinner', number: 6, label: 'Family Dinner',            emoji: '', level: 'B1' },
  { key: 'b1-year-abroad',   number: 7, label: 'One Year Abroad',          emoji: '', level: 'B1' },
];

const levelMeta: Record<Level, { subtitle: string }> = {
  A0: { subtitle: 'Starter' },
  A1: { subtitle: 'Beginner' },
  A2: { subtitle: 'Elementary' },
  B1: { subtitle: 'Intermediate' },
  B2: { subtitle: 'Upper-Intermediate' },
};

const levels: { key: Level; label: string; description: string; available: boolean }[] = [
  { key: 'A1', label: 'A1 — Beginner',     description: '40 texts · 5 modules', available: true },
  { key: 'A2', label: 'A2 — Elementary',   description: '48 texts · 6 modules', available: true },
  { key: 'B1', label: 'B1 — Intermediate', description: '56 texts · 7 modules', available: true },
];

export function TextList({ onSelect, openLevel, setOpenLevel, openModule, setOpenModule }: TextListProps) {
  const { texts } = useLearning();
  const [showGenerator, setShowGenerator] = useState(false);

  const modules = moduleInfo
    .filter(mod => mod.level === (openLevel ?? 'A1'))
    .map(mod => ({
      ...mod,
      texts: texts.filter(t => t.module === mod.key),
    }));

  const eyebrow = 'text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground';
  const rowCard = 'flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 text-left transition-colors';
  const rowInteractive = 'card-hover cursor-pointer active:scale-[0.99]';
  const iconTile = 'grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] bg-accent';
  const backButton = 'flex items-center gap-1 self-start -ml-1 rounded-lg px-1 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground';

  // ===== TEXT LIST INSIDE A MODULE =====
  if (openLevel && openModule) {
    const mod = modules.find(m => m.key === openModule);
    if (!mod) return null;
    const done = mod.texts.filter(t => t.completed).length;

    return (
      <div className="animate-fade-in flex flex-col gap-4">
        <button onClick={() => setOpenModule(null)} className={backButton}>
          <ChevronLeft className="h-4 w-4" /> All modules
        </button>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-highlight-soft px-[9px] py-[3px] text-xs font-semibold text-highlight-ink">{openLevel}</span>
            <span className="text-[13px] text-muted-foreground">Module {mod.number}{mod.texts.length > 0 ? ` · ${done} of ${mod.texts.length} read` : ''}</span>
          </div>
          <h2 className="font-heading text-[22px] font-semibold leading-tight text-foreground">{mod.label}</h2>
        </div>

        {mod.texts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Texts for this module are coming soon.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {mod.texts.map((text, i) => (
              <button
                key={text.id}
                onClick={() => onSelect(text)}
                className={`${rowCard} ${rowInteractive}`}
              >
                <div className={iconTile}>
                  {text.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success" strokeWidth={1.75} />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className={eyebrow}>Story {i + 1} · {text.content.split(' ').length} words</span>
                  <span className="font-heading text-base font-semibold leading-tight text-foreground">{text.title}</span>
                  {text.titleTranslation && (
                    <span className="truncate text-[13px] text-muted-foreground">{text.titleTranslation}</span>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ===== AI TEXT GENERATOR =====
  if (openLevel && showGenerator) {
    return (
      <GenerateTextView
        level={openLevel}
        onBack={() => setShowGenerator(false)}
        onTextGenerated={(text) => {
          setShowGenerator(false);
          onSelect(text);
        }}
      />
    );
  }

  // ===== MODULE LIST (inside a level) =====
  if (openLevel) {
    return (
      <div className="animate-fade-in flex flex-col gap-4">
        <button onClick={() => { setOpenLevel(null); setShowGenerator(false); }} className={backButton}>
          <ChevronLeft className="h-4 w-4" /> All levels
        </button>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-highlight-soft px-[9px] py-[3px] text-xs font-semibold text-highlight-ink">{openLevel}</span>
            <span className="text-[13px] text-muted-foreground">Level</span>
          </div>
          <h2 className="font-heading text-[22px] font-semibold leading-tight text-foreground">{levelMeta[openLevel]?.subtitle ?? openLevel}</h2>
        </div>

        <div className="flex flex-col gap-2">
          {modules.map(mod => {
            const total = mod.texts.length;
            const done = mod.texts.filter(t => t.completed).length;
            const progressPct = total > 0 ? (done / total) * 100 : 0;

            return (
              <button
                key={mod.key}
                onClick={() => total > 0 && setOpenModule(mod.key)}
                disabled={total === 0}
                className={`${rowCard} ${total > 0 ? rowInteractive : 'cursor-default opacity-60'}`}
              >
                <div className={iconTile}>
                  <Folder className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className={eyebrow}>Module {mod.number}</span>
                  <span className="truncate font-heading text-base font-semibold leading-tight text-foreground">{mod.label}</span>
                  <div className="mt-1 flex items-center gap-2.5">
                    <div className="h-1.5 max-w-[160px] flex-1 overflow-hidden rounded-full bg-track">
                      <div className="h-full rounded-full bg-highlight transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {total > 0 ? `${done} of ${total}` : 'Coming soon'}
                    </span>
                  </div>
                </div>
                {total > 0
                  ? <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />
                  : <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>
            );
          })}
        </div>

        {/* Generate your own text — below the last module */}
        <button
          onClick={() => setShowGenerator(true)}
          className={`${rowCard} ${rowInteractive} border-dashed border-primary/40`}
        >
          <div className={iconTile}>
            <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.75} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="font-heading text-base font-semibold leading-tight text-foreground">Generate your own text</span>
            <span className="text-[13px] text-muted-foreground">AI writes a custom {openLevel} text for you</span>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  // ===== LEVELS (top) =====
  return (
    <div className="animate-fade-in flex flex-col gap-2">
      <span className={`${eyebrow} pb-1 text-xs`}>Choose your level</span>
      {levels.map(lvl => {
        const levelModules = new Set(moduleInfo.filter(m => m.level === lvl.key).map(m => m.key));
        const levelTexts = texts.filter(t => t.module && levelModules.has(t.module));
        const done = levelTexts.filter(t => t.completed).length;
        return (
          <button
            key={lvl.key}
            onClick={() => lvl.available && setOpenLevel(lvl.key)}
            disabled={!lvl.available}
            className={`${rowCard} ${lvl.available ? rowInteractive : 'cursor-not-allowed opacity-60'}`}
          >
            <div className={iconTile}>
              {lvl.available ? (
                <GraduationCap className="h-5 w-5 text-primary" strokeWidth={1.75} />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={eyebrow}>{lvl.description}</span>
              <span className="font-heading text-base font-semibold leading-tight text-foreground">{lvl.label}</span>
              {levelTexts.length > 0 && (
                <span className="text-[13px] text-muted-foreground">{done} of {levelTexts.length} read</span>
              )}
            </div>
            {lvl.available && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  );
}
