// Server-side proxy for Claude and OpenAI, so API keys never reach the browser.
// Only signed-in users can call it.
//
//   POST /functions/v1/ai/claude      → Anthropic Messages API (JSON body)
//   POST /functions/v1/ai/speech      → OpenAI text-to-speech (JSON body, returns audio)
//   POST /functions/v1/ai/transcribe  → OpenAI Whisper (multipart form, returns JSON)
//
// Secrets (set with `supabase secrets set ...`): ANTHROPIC_API_KEY, OPENAI_API_KEY

import { createClient } from 'npm:@supabase/supabase-js@2';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const OPENAI_API_KEY    = Deno.env.get('OPENAI_API_KEY') ?? '';

// Limits so a signed-in user can't use the keys for arbitrary, expensive requests
const ALLOWED_CLAUDE_MODELS = new Set(['claude-haiku-4-5-20251001', 'claude-sonnet-4-5']);
const MAX_TOKENS_CAP        = 2048;
const MAX_TTS_CHARS         = 1500;
const MAX_AUDIO_BYTES       = 10 * 1024 * 1024;

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getUser(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
  );
  const { data, error } = await supabase.auth.getUser(token);
  return error ? null : data.user;
}

async function handleClaude(req: Request) {
  const body = await req.json();
  if (!ALLOWED_CLAUDE_MODELS.has(body.model)) return json({ error: { message: 'Model not allowed' } }, 400);
  body.max_tokens = Math.min(Number(body.max_tokens) || 1024, MAX_TOKENS_CAP);
  delete body.stream;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  return new Response(res.body, {
    status: res.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleSpeech(req: Request) {
  const { voice, input, speed } = await req.json();
  if (typeof input !== 'string' || input.length > MAX_TTS_CHARS) {
    return json({ error: { message: 'Text too long' } }, 400);
  }
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'tts-1', voice, input, speed }),
  });
  return new Response(res.body, {
    status: res.status,
    headers: { ...corsHeaders, 'Content-Type': res.headers.get('Content-Type') ?? 'audio/mpeg' },
  });
}

async function handleTranscribe(req: Request) {
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File) || file.size > MAX_AUDIO_BYTES) {
    return json({ error: { message: 'Recording missing or too large' } }, 400);
  }
  const out = new FormData();
  out.append('file', file);
  out.append('model', 'whisper-1');
  const language = form.get('language');
  if (typeof language === 'string') out.append('language', language);

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: out,
  });
  return new Response(res.body, {
    status: res.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')    return json({ error: { message: 'Method not allowed' } }, 405);

  const user = await getUser(req);
  if (!user) return json({ error: { message: 'Please sign in' } }, 401);

  const route = new URL(req.url).pathname.split('/').pop();
  try {
    switch (route) {
      case 'claude':     return await handleClaude(req);
      case 'speech':     return await handleSpeech(req);
      case 'transcribe': return await handleTranscribe(req);
      default:           return json({ error: { message: 'Not found' } }, 404);
    }
  } catch (e) {
    return json({ error: { message: e instanceof Error ? e.message : 'Server error' } }, 500);
  }
});
