// ─── Shared journal API utility ───────────────────────────────────────────────

const API_KEY_STORAGE = 'english-app-anthropic-key';

function getSavedKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || (import.meta as any).env?.VITE_ANTHROPIC_API_KEY || '';
}

export interface JournalPrompt {
  prompt_nl: string;
  prompt_en: string;
  targetWords: string[];
}

export interface JournalFeedback {
  wellDone: string;
  corrections: { original: string; corrected: string; reason: string }[];
  rewrittenVersion: string;
  detectedLevel: string;
  mainWeakness: string;
  suggestion: string;
}

/**
 * generateJournalPrompt
 * anchored=true → strong reference to specific scene/character (GuidedJournal)
 * anchored=false → reference topic/situation from text (MicroJournal)
 * Uses Haiku.
 */
export async function generateJournalPrompt(
  level: string,
  completedTexts: { title: string; excerpt: string }[],
  weakWords: { dutch: string; english: string }[],
  anchored: boolean,
): Promise<JournalPrompt> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const textContext = completedTexts.length > 0
    ? completedTexts.map(t => `- "${t.title}": ${t.excerpt}`).join('\n')
    : 'No completed texts yet — use general daily life topics.';

  const wordList = weakWords.slice(0, 10).map(w => `${w.dutch} (${w.english})`).join(', ');

  const anchorInstruction = anchored
    ? `IMPORTANT: Strongly reference a specific scene, character, or pivotal moment from ONE of the completed texts listed above. The prompt must name or clearly evoke that specific element.`
    : `Reference the topic or situation from one of the completed texts (no need to name a specific scene).`;

  const system = `You are a Dutch language teacher creating a personalised journaling prompt.

Student level: ${level}
Completed texts:
${textContext}

Vocabulary words the student is still learning:
${wordList || 'none yet'}

${anchorInstruction}

Create a prompt that:
1. Asks a personal, open-ended question (max 2–3 sentences in Dutch)
2. Naturally encourages using 2–4 of the vocabulary words listed above
3. Matches the level: short simple present for A1, can use past tense / subordinate clauses for A2+

Return ONLY this JSON, no markdown:
{
  "prompt_nl": "The prompt in Dutch (2–3 sentences)",
  "prompt_en": "English translation of the prompt",
  "targetWords": ["word1", "word2", "word3"]
}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system,
      messages: [{ role: 'user', content: 'Generate my journaling prompt.' }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as JournalPrompt;
}

/**
 * evaluateJournalResponse
 * Uses Sonnet (claude-sonnet-4-5).
 */
export async function evaluateJournalResponse(
  level: string,
  prompt: JournalPrompt,
  userResponse: string,
  pastErrors: { type: string }[],
): Promise<JournalFeedback> {
  const key = getSavedKey();
  if (!key || key === 'your_api_key_here') throw new Error('NO_KEY');

  const system = `You are a warm, encouraging Dutch language tutor reviewing a student's journal entry.

Rules:
- Focus only on the 1–2 most important grammar errors. Ignore minor issues.
- A1: only flag wrong verb conjugation (present tense) and missing main verb. Forgive article errors.
- A2: flag word order, verb conjugation, tense consistency, and de/het errors.
- Always rewrite the student's full text correctly.
- Detect the student's actual writing level (A1 / A2 / B1) from the text quality.
- Be specific and warm throughout.

Return ONLY this JSON, no markdown:
{
  "wellDone": "one sentence about what the student did well",
  "corrections": [
    { "original": "exact phrase from student", "corrected": "correct version", "reason": "why — max 12 words" }
  ],
  "rewrittenVersion": "the student's full text rewritten correctly in Dutch",
  "detectedLevel": "A1 or A2 or B1",
  "mainWeakness": "one short noun phrase e.g. 'verb-final in subordinate clauses'",
  "suggestion": "one actionable sentence about what to practise next"
}
corrections can be [] if there are no significant errors.`;

  const pastErrorTypes = pastErrors.slice(-10).map(e => e.type).join(', ') || 'none yet';

  const safeResponse = userResponse.slice(0, 2000);

  const userMsg = `Level: ${level}
Prompt given: ${prompt.prompt_nl}
Target words: ${prompt.targetWords.join(', ')}
Student's Dutch response:
${safeResponse}
Past error types to keep in mind: ${pastErrorTypes}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 900,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json() as { content: { text: string }[] };
  const raw = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(raw) as JournalFeedback;
}
