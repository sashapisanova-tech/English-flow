import { getOpenAIVoiceId } from '@/utils/ttsSettings';
import { speechFetch } from '@/lib/ai';

export interface PlayDutchOptions {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

// ─── Audio cache: avoids re-fetching the same text+voice combination ─────────
const AUDIO_CACHE_MAX = 50;
const audioCache = new Map<string, string>(); // key → object URL (LRU: oldest entry first)

function audioCacheSet(key: string, url: string) {
  if (audioCache.has(key)) audioCache.delete(key); // refresh position
  audioCache.set(key, url);
  if (audioCache.size > AUDIO_CACHE_MAX) {
    const oldest = audioCache.keys().next().value!;
    URL.revokeObjectURL(audioCache.get(oldest)!);
    audioCache.delete(oldest);
  }
}

function audioCacheGet(key: string): string | undefined {
  const url = audioCache.get(key);
  if (url) { audioCache.delete(key); audioCache.set(key, url); } // move to end (most recent)
  return url;
}

let currentAudio: HTMLAudioElement | null = null;

export function stopDutch() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

// ─── OpenAI TTS ───────────────────────────────────────────────────────────────
async function playWithOpenAI(text: string, options?: PlayDutchOptions): Promise<void> {
  const voice  = getOpenAIVoiceId();
  const cacheKey = `${voice}:${text}`;

  stopDutch();
  options?.onStart?.(); // fire immediately so UI shows Stop button while fetching

  let url = audioCacheGet(cacheKey);
  if (!url) {
    const res = await speechFetch({ voice, input: text, speed: 0.9 });
    if (!res.ok) throw new Error(`OpenAI TTS error ${res.status}`);
    const blob = await res.blob();
    url = URL.createObjectURL(blob);
    audioCacheSet(cacheKey, url);
  }

  const audio = new Audio(url);
  currentAudio = audio;
  audio.play();
  audio.onended = () => { currentAudio = null; options?.onEnd?.(); };
  audio.onerror = () => { currentAudio = null; options?.onEnd?.(); };
}

// ─── Browser TTS fallback ─────────────────────────────────────────────────────
let englishVoice: SpeechSynthesisVoice | null | undefined = undefined;

function resolveEnglishVoice(): SpeechSynthesisVoice | null {
  if (englishVoice !== undefined) return englishVoice;
  const voices = window.speechSynthesis.getVoices();
  englishVoice =
    // British English first: the app teaches British English
    voices.find(v => v.lang === 'en-GB') ??
    voices.find(v => v.lang.startsWith('en')) ??
    null;
  return englishVoice;
}

function playWithBrowser(text: string, options?: PlayDutchOptions): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-GB';
  utt.rate = options?.rate ?? 0.9;

  const voice = resolveEnglishVoice();
  if (voice) utt.voice = voice;

  if (options?.onStart) utt.onstart = options.onStart;
  if (options?.onEnd) { utt.onend = options.onEnd; utt.onerror = options.onEnd; }

  if (!voice && window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      englishVoice = undefined;
      const v = resolveEnglishVoice();
      if (v) utt.voice = v;
      window.speechSynthesis.speak(utt);
    }, { once: true });
    return;
  }

  window.speechSynthesis.speak(utt);
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function playDutch(text: string, options?: PlayDutchOptions): void {
  // OpenAI TTS is async — fire and forget; callers use onStart/onEnd callbacks
  playWithOpenAI(text, options).catch(() => {
    // If OpenAI fails, fall back to browser TTS
    playWithBrowser(text, options);
  });
}
