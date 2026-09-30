export type VoicePreset = 'feminine' | 'male' | 'funny';

const VOICE_KEY    = 'english-tts-voice';

// OpenAI voice IDs for each preset
export const VOICE_MAP: Record<VoicePreset, string> = {
  feminine: 'nova',    // warm, clear female voice
  male:     'onyx',    // deep, measured male voice
  funny:    'fable',   // expressive, theatrical — reads like a storyteller
};

export const VOICE_LABELS: Record<VoicePreset, { emoji: string; name: string; desc: string }> = {
  feminine: { emoji: '', name: 'Nova',  desc: 'Warm & clear' },
  male:     { emoji: '', name: 'Onyx',  desc: 'Deep & calm' },
  funny:    { emoji: '', name: 'Fable', desc: 'Expressive & theatrical' },
};

export function getVoicePreset(): VoicePreset {
  return (localStorage.getItem(VOICE_KEY) as VoicePreset) || 'feminine';
}

export function setVoicePreset(v: VoicePreset) {
  localStorage.setItem(VOICE_KEY, v);
}

export function getOpenAIVoiceId(): string {
  return VOICE_MAP[getVoicePreset()];
}
