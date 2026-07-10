// De-duplicate in-flight AI requests for the same word
const pendingGenerations = new Set<string>();

/** Find the sentence in a Dutch text that contains the given word. */
export function extractSentence(content: string, word: string): string | null {
  const sentences = content.match(/[^.!?]+[.!?]*/g) ?? [];
  const wordLower = word.toLowerCase();
  const found = sentences.find(s => s.toLowerCase().includes(wordLower));
  return found ? found.trim() : null;
}

/**
 * Ask Claude Haiku to generate a short Dutch example sentence for a word.
 * Returns null silently on any error or missing API key.
 * Non-blocking: callers should fire-and-forget with .catch(() => {}).
 */
export async function generateExampleSentence(dutch: string, english: string): Promise<string | null> {
  if (pendingGenerations.has(dutch)) return null;
  const apiKey = localStorage.getItem('dutch-app-anthropic-key') || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
  if (!apiKey || apiKey === 'your_api_key_here') return null;

  pendingGenerations.add(dutch);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 80,
        system: 'You are a Dutch language teacher. Write one short, natural Dutch sentence (max 15 words) that clearly uses the given word in context. Reply with the sentence only — no quotes, no explanation.',
        messages: [{
          role: 'user',
          content: `Dutch word: "${dutch}" (English: "${english}"). Write one example sentence in Dutch.`,
        }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content: { text: string }[] };
    const sentence = data.content[0].text.trim().replace(/^["']|["']$/g, '');
    return sentence || null;
  } catch {
    return null;
  } finally {
    pendingGenerations.delete(dutch);
  }
}
