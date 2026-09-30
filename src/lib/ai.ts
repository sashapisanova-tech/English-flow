import { supabase } from '@/lib/supabase';

// All AI calls go through the `ai` Supabase Edge Function, which holds the API keys.
const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai`;

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${data.session?.access_token ?? ''}`,
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  };
}

/** Drop-in replacement for fetch('https://api.anthropic.com/v1/messages', init). */
export async function claudeFetch(init: { method?: string; body: string }): Promise<Response> {
  return fetch(`${AI_FUNCTION_URL}/claude`, {
    method: 'POST',
    headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
    body: init.body,
  });
}

/** OpenAI text-to-speech. Returns the audio response. */
export async function speechFetch(body: { voice: string; input: string; speed?: number }): Promise<Response> {
  return fetch(`${AI_FUNCTION_URL}/speech`, {
    method: 'POST',
    headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

/** OpenAI Whisper transcription. `form` must contain `file` (and optionally `language`). */
export async function transcribeFetch(form: FormData): Promise<Response> {
  return fetch(`${AI_FUNCTION_URL}/transcribe`, {
    method: 'POST',
    headers: await authHeaders(),
    body: form,
  });
}
