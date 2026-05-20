import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings2, Volume2, Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';
import {
  getVoicePreset, setVoicePreset, getOpenAIKey, setOpenAIKey,
  VOICE_LABELS, type VoicePreset,
} from '@/utils/ttsSettings';
import { playDutch, stopDutch } from '@/utils/playDutch';

const PREVIEW_TEXT = 'Hoi! Mijn naam is Daan. Ik help je Nederlands leren.';

export function VoiceSettings({ visible = false }: { visible?: boolean }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<VoicePreset>(getVoicePreset);
  const [keyInput, setKeyInput] = useState('');
  const [savedKey, setSavedKey] = useState(getOpenAIKey);
  const [showKey, setShowKey] = useState(false);
  const [previewing, setPreviewing] = useState<VoicePreset | null>(null);

  function handleSelectPreset(p: VoicePreset) {
    setPreset(p);
    setVoicePreset(p);
  }

  function handleSaveKey() {
    const trimmed = keyInput.trim();
    setOpenAIKey(trimmed);
    setSavedKey(trimmed);
    setKeyInput('');
  }

  function handleRemoveKey() {
    setOpenAIKey('');
    setSavedKey('');
    setKeyInput('');
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
          className="fixed bottom-36 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-md hover:bg-secondary transition-all active:scale-95"
          aria-label="Voice settings"
        >
          <Settings2 className="h-4.5 w-4.5 text-muted-foreground" style={{ width: 18, height: 18 }} />
        </button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] flex flex-col p-0 rounded-t-2xl overflow-y-auto">
          <SheetHeader className="px-5 pt-5 pb-4 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                <SheetTitle className="text-base font-bold">Voice Settings</SheetTitle>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {savedKey
                ? 'OpenAI TTS active — natural Dutch voices'
                : 'Browser TTS active — add an OpenAI key for natural voices'}
            </p>
          </SheetHeader>

          <div className="px-5 py-5 space-y-6 overflow-y-auto">

            {/* Voice picker */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Choose a voice</p>
              <div className="flex flex-col gap-2">
                {(Object.entries(VOICE_LABELS) as [VoicePreset, typeof VOICE_LABELS[VoicePreset]][]).map(([id, info]) => (
                  <div
                    key={id}
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 transition-all cursor-pointer ${
                      preset === id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                    }`}
                    onClick={() => handleSelectPreset(id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{info.name}</p>
                      <p className="text-xs text-muted-foreground">{info.desc}</p>
                    </div>
                    {preset === id && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                    <button
                      onClick={e => { e.stopPropagation(); handlePreview(id); }}
                      disabled={!!previewing}
                      className="shrink-0 flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      {previewing === id
                        ? <><Loader2 className="h-3 w-3 animate-spin" /> Playing…</>
                        : <><Volume2 className="h-3 w-3" /> Preview</>
                      }
                    </button>
                  </div>
                ))}
              </div>
              {!savedKey && (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Voice preview requires an OpenAI key. Without it, your browser's default Dutch voice is used.
                </p>
              )}
            </div>

            {/* OpenAI key */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">OpenAI API key</p>
              {savedKey ? (
                <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 px-3 py-2.5">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Key saved ✓</p>
                    <p className="text-xs text-muted-foreground font-mono">sk-…{savedKey.slice(-4)}</p>
                  </div>
                  <button
                    onClick={handleRemoveKey}
                    className="text-xs text-destructive underline underline-offset-2 hover:opacity-80"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Get a free key at <span className="font-mono font-bold">platform.openai.com</span> → API Keys.
                    Costs ~$0.01 per reading text. Stored only in your browser.
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showKey ? 'text' : 'password'}
                        placeholder="sk-proj-..."
                        value={keyInput}
                        onChange={e => setKeyInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSaveKey()}
                        className="pr-9 text-sm font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(v => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button onClick={handleSaveKey} disabled={!keyInput.trim()}>Save</Button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center pb-2">
              Audio is cached per session — each text is only fetched once.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
