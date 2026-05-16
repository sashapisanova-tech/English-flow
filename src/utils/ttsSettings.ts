export type VoicePreset = 'feminine' | 'male' | 'funny';

const VOICE_KEY    = 'dutch-tts-voice';
const OPENAI_KEY   = 'dutch-app-openai-key';

// OpenAI voice IDs for each preset
export const VOICE_MAP: Record<VoicePreset, string> = {
  feminine: 'nova',    // warm, clear female voice
  male:     'onyx',    // deep, measured male voice
  funny:    'fable',   // expressive, theatrical — reads like a storyteller
};

export const VOICE_LABELS: Record<VoicePreset, { emoji: string; name: string; desc: string }> = {
  feminine: { emoji: '👩', name: 'Nova',  desc: 'Warm & clear' },
  male:     { emoji: '🧔', name: 'Onyx',  desc: 'Deep & calm' },
  funny:    { emoji: '🎭', name: 'Fable', desc: 'Expressive & theatrical' },
};

export function getVoicePreset(): VoicePreset {
  return (localStorage.getItem(VOICE_KEY) as VoicePreset) || 'feminine';
}

export function setVoicePreset(v: VoicePreset) {
  localStorage.setItem(VOICE_KEY, v);
}

export function getOpenAIKey(): string {
  return localStorage.getItem(OPENAI_KEY) || import.meta.env.VITE_OPENAI_API_KEY || '';
}

export function setOpenAIKey(key: string) {
  if (key) localStorage.setItem(OPENAI_KEY, key);
  else localStorage.removeItem(OPENAI_KEY);
}

export function getOpenAIVoiceId(): string {
  return VOICE_MAP[getVoicePreset()];
}
