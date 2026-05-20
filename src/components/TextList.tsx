import { Dispatch, SetStateAction, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/context/LearningContext';
import { BookOpen, CheckCircle2, ChevronRight, ArrowLeft, Folder, GraduationCap, Lock, Sparkles } from 'lucide-react';
import { ReadingText, Module, Level } from '@/types/dutch';
import { GenerateTextView } from '@/components/GenerateTextView';

interface TextListProps {
  onSelect: (text: ReadingText) => void;
  openLevel: Level | null;
  setOpenLevel: Dispatch<SetStateAction<Level | null>>;
  openModule: Module | null;
  setOpenModule: Dispatch<SetStateAction<Module | null>>;
}

const moduleInfo: { key: Module; number: number; label: string; emoji: string; level: Level }[] = [
  { key: 'daily-survival',        number: 1, label: 'Daily Survival',        emoji: '', level: 'A1' },
  { key: 'social-life',           number: 2, label: 'Social Life',           emoji: '', level: 'A1' },
  { key: 'transport-city',        number: 3, label: 'City & Movement',       emoji: '', level: 'A1' },
  { key: 'work-study',            number: 4, label: 'Work & Study',          emoji: '', level: 'A1' },
  { key: 'everyday-conversations',number: 5, label: 'Personal Development',  emoji: '', level: 'A1' },
  { key: 'a2-independence', number: 1, label: 'Everyday Independence', emoji: '', level: 'A2' },
  { key: 'a2-social',      number: 2, label: 'Social Interaction',    emoji: '', level: 'A2' },
  { key: 'a2-living',      number: 3, label: 'Leven in Nederland',    emoji: '', level: 'A2' },
  { key: 'a2-work',        number: 4, label: 'Werk & Studie',         emoji: '', level: 'A2' },
  { key: 'a2-adventures',  number: 5, label: 'Kleine Avonturen',      emoji: '', level: 'A2' },
];

const levelMeta: Record<Level, { subtitle: string }> = {
  A0: { subtitle: 'Starter' },
  A1: { subtitle: 'Beginner' },
  A2: { subtitle: 'Elementary' },
  B1: { subtitle: 'Intermediate' },
  B2: { subtitle: 'Upper-Intermediate' },
};

const levels: { key: Level; label: string; description: string; available: boolean }[] = [
  { key: 'A1', label: 'A1 — Beginner',     description: '50 texts · 5 modules', available: true },
  { key: 'A2', label: 'A2 — Elementary',   description: '50 texts · 5 modules', available: true },
  { key: 'B1', label: 'B1 — Intermediate', description: 'Coming soon',          available: false },
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

  // ===== TEXT LIST INSIDE A MODULE =====
  if (openLevel && openModule) {
    const mod = modules.find(m => m.key === openModule);
    if (!mod) return null;

    return (
      <div className="animate-fade-in space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setOpenModule(null)} className="-ml-2 gap-1">
          <ArrowLeft className="h-4 w-4" /> All modules
        </Button>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {openLevel} · Module {mod.number}
            </p>
            <h2 className="font-heading text-xl font-bold text-foreground">{mod.label}</h2>
          </div>
        </div>

        {mod.texts.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Texts for this module are coming soon.</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {mod.texts.map(text => (
              <Card
                key={text.id}
                onClick={() => onSelect(text)}
                className="card-hover cursor-pointer p-4 flex items-center justify-between active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                    {text.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-accent-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{text.title}</p>
                    <p className="text-xs text-muted-foreground">{text.titleTranslation}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {text.content.split(' ').length} words
                </span>
              </Card>
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

  // ===== MODULE FOLDERS GRID (inside a level) =====
  if (openLevel) {
    return (
      <div className="animate-fade-in space-y-3">
        <Button variant="ghost" size="sm" onClick={() => { setOpenLevel(null); setShowGenerator(false); }} className="-ml-2 gap-1">
          <ArrowLeft className="h-4 w-4" /> All levels
        </Button>

        <div className="flex items-center gap-3 pb-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Level</p>
            <h2 className="font-heading text-xl font-bold text-foreground">{openLevel} — {levelMeta[openLevel]?.subtitle ?? openLevel}</h2>
          </div>
        </div>

        {modules.map((mod, idx) => {
          const total = mod.texts.length;
          const done = mod.texts.filter(t => t.completed).length;
          const progressPct = total > 0 ? (done / total) * 100 : 0;

          return (
            <Card
              key={mod.key}
              onClick={() => setOpenModule(mod.key)}
              className="card-hover cursor-pointer p-4 active:scale-[0.98] transition-transform relative overflow-hidden"
            >
              <div className="absolute top-0 left-4 h-1.5 w-12 rounded-b-md bg-primary/40" />
              <div className="flex items-center gap-3 pt-1">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <Folder className="h-6 w-6 text-accent-foreground" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    Module {mod.number}
                  </p>
                  <p className="font-heading font-semibold text-foreground truncate">{mod.label}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary max-w-[140px]">
                      <div className="h-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                      {done}/{total}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
            </Card>
          );
        })}

        {/* Generate your own text — below the last module */}
        <Card
          onClick={() => setShowGenerator(true)}
          className="card-hover cursor-pointer p-4 active:scale-[0.98] transition-transform border-dashed border-primary/30 bg-primary/5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-primary">Generate your own text</p>
              <p className="text-xs text-muted-foreground">AI writes a custom {openLevel} text for you</p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary/60 shrink-0" />
          </div>
        </Card>
      </div>
    );
  }

  // ===== LEVEL FOLDERS (top) =====
  return (
    <div className="animate-fade-in space-y-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        Choose your level
      </p>
      {levels.map(lvl => (
        <Card
          key={lvl.key}
          onClick={() => lvl.available && setOpenLevel(lvl.key)}
          className={`p-4 flex items-center justify-between transition-transform ${
            lvl.available
              ? 'card-hover cursor-pointer active:scale-[0.98]'
              : 'opacity-60 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              {lvl.available ? (
                <GraduationCap className="h-6 w-6 text-primary" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">{lvl.label}</p>
              <p className="text-xs text-muted-foreground">{lvl.description}</p>
            </div>
          </div>
          {lvl.available && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
        </Card>
      ))}
    </div>
  );
}
