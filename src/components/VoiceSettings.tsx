import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Settings2, Volume2, Check, Loader2, X } from 'lucide-react';
import {
  getVoicePreset, setVoicePreset,
  VOICE_LABELS, type VoicePreset,
} from '@/utils/ttsSettings';
import { playDutch, stopDutch } from '@/utils/playDutch';

const PREVIEW_TEXT = "Hello! I'm your English Flow voice. Let's read together.";

export function VoiceSettings({ visible = false }: { visible?: boolean }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<VoicePreset>(getVoicePreset);
  const [previewing, setPreviewing] = useState<VoicePreset | null>(null);

  function handleSelectPreset(p: VoicePreset) {
    setPreset(p);
    setVoicePreset(p);
  }

  async function handlePreview(p: VoicePreset) {
    stopDutch();
    // Temporarily switch to the previewed preset
    const prev = getVoicePreset();
    setVoicePreset(p);
    setPreviewing(p);
    playDutch(PREVIEW_TEXT, {
      onEnd: () => {
        setVoicePreset(prev); // restore
        setVoicePreset(preset); // keep user's current selection
        setPreviewing(null);
      },
    });
  }

  return (
    <>
      {/* Trigger button — only shown when reading a text */}
      {visible && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-36 right-4 z-40 flex h-11 w-11 lg:bottom-28 lg:right-8 lg:[html[data-reading-panel]_&]:right-[calc(max(0px,(100vw-1160px)/2)+410px)] items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:bg-secondary active:scale-95"
          aria-label="Voice settings"
        >
          <Settings2 className="h-[18px] w-[18px] text-foreground" />
        </button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="mx-auto flex h-auto max-h-[85vh] max-w-lg flex-col overflow-y-auto rounded-t-2xl bg-background p-0">
          <SheetHeader className="shrink-0 px-5 pt-5 pb-3 text-left">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-heading text-[22px] font-semibold tracking-[-0.01em]">Voice settings</SheetTitle>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="-mr-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[13px] text-muted-foreground">Natural AI voices</p>
          </SheetHeader>

          <div className="flex flex-col gap-2 px-5 pb-6">
            <span className="pl-1 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              Choose a voice
            </span>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Voice">
              {(Object.entries(VOICE_LABELS) as [VoicePreset, typeof VOICE_LABELS[VoicePreset]][]).map(([id, info]) => {
                const selected = preset === id;
                return (
                  <div
                    key={id}
                    role="radio"
                    aria-checked={selected}
                    tabIndex={0}
                    onClick={() => handleSelectPreset(id)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectPreset(id); } }}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      selected ? 'border-primary bg-accent' : 'border-border bg-card hover:border-primary/40'
                    }`}
                  >
                    <div className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      selected ? 'bg-primary text-primary-foreground' : 'border-2 border-border'
                    }`}>
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[15px] font-semibold ${selected ? 'text-accent-foreground' : 'text-foreground'}`}>{info.name}</p>
                      <p className="text-[13px] text-muted-foreground">{info.desc}</p>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handlePreview(id); }}
                      disabled={!!previewing}
                      className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
                    >
                      {previewing === id
                        ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Playing…</>
                        : <><Volume2 className="h-3.5 w-3.5 text-primary" /> Preview</>
                      }
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="pt-2 text-center text-xs text-muted-foreground">
              Audio is cached per session — each text is only fetched once.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
