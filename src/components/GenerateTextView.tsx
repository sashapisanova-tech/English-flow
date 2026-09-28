import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Sparkles, Shuffle } from 'lucide-react';
import { ReadingText } from '@/types/dutch';
import { useCustomSets } from '@/hooks/useCustomSets';

interface GenerateTextViewProps {
  level: 'A1' | 'A2' | string;
  onBack: () => void;
  onTextGenerated: (text: ReadingText) => void;
}

const THEMES_BY_LEVEL: Record<string, string[]> = {
  A1: ['Dagelijkse routine', 'Eten & drinken', 'Thuis', 'Het weer', 'Winkelen', 'Vrije tijd', 'Op school', 'Familie'],
  default: ['Werk', 'Reizen', 'Gezondheid', 'In de stad', 'Vriendschappen', 'Technologie', 'Natuur', "Hobby's"],
};

const GRAMMAR_TAGS = [
  'Present tense',
  'Past tense',
  'Modal verbs',
  'Separable verbs',
  'Prepositions',
  'Adjectives',
];

const WORD_COUNT_OPTIONS = [50, 80, 100, 120, 150];

type ThemeMode = 'suggested' | 'custom' | 'surprise';
type TextType = 'narrative' | 'dialogue' | 'poem';

export function GenerateTextView({ level, onBack, onTextGenerated }: GenerateTextViewProps) {
  const { sets } = useCustomSets();

  const suggestedThemes = level === 'A1' ? THEMES_BY_LEVEL.A1 : THEMES_BY_LEVEL.default;

  const [wordCount, setWordCount] = useState<number>(80);
  const [themeMode, setThemeMode] = useState<ThemeMode>('suggested');
  const [selectedTheme, setSelectedTheme] = useState<string>(suggestedThemes[0]);
  const [customTheme, setCustomTheme] = useState<string>('');
  const [textType, setTextType] = useState<TextType>('narrative');
  const [flashcardWords, setFlashcardWords] = useState<string[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [grammarFocus, setGrammarFocus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggleGrammarTag(tag: string) {
    setGrammarFocus(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  function handleSetSelect(setId: string) {
    if (setId === '') {
      setSelectedSetId(null);
      setFlashcardWords([]);
      return;
    }
    const found = sets.find(s => s.id === setId);
    if (found) {
      setSelectedSetId(setId);
      setFlashcardWords(found.words.map(w => w.dutch));
    }
  }

  async function handleGenerate() {
    const apiKey =
      localStorage.getItem('english-app-anthropic-key') ||
      (import.meta as any).env?.VITE_ANTHROPIC_API_KEY ||
      '';

    if (!apiKey || apiKey === 'your_api_key_here') {
      setError('Add your Anthropic API key in Settings (Me tab) to generate texts.');
      return;
    }

    let effectiveTheme: string;
    if (themeMode === 'surprise') {
      const randomThemes = suggestedThemes;
      effectiveTheme = randomThemes[Math.floor(Math.random() * randomThemes.length)];
    } else if (themeMode === 'custom') {
      // Strip anything that isn't letters, spaces, digits, or common punctuation
      // to prevent prompt injection via the custom theme field
      effectiveTheme = customTheme.trim().replace(/[^\p{L}\p{N}\s\-'&]/gu, '').slice(0, 100) || 'Dagelijkse routine';
    } else {
      effectiveTheme = selectedTheme;
    }

    const textTypeDesc =
      textType === 'dialogue'
        ? 'Dialogue between 2-3 people (format: "Name: text")'
        : textType === 'poem'
        ? 'Short poem (4-8 lines, may rhyme)'
        : 'Narrative / short story';

    const levelGuide = level === 'A1'
      ? 'A1 (beginner): very simple sentences, present tense, high-frequency words only (top 500 English words), short sentences max 10 words'
      : 'A2 (elementary): simple past tense allowed, everyday vocabulary, slightly varied sentence length';

    const prompt = `Write a high-quality English reading text for a ${level} language learner.

SPECIFICATIONS:
- Word count: ~${wordCount} words
- Text type: ${textTypeDesc}
- Theme: ${effectiveTheme}
- Level: ${levelGuide}
${grammarFocus.length > 0 ? `- Grammar to demonstrate: ${grammarFocus.join(', ')}` : ''}
${flashcardWords.length > 0 ? `- Naturally incorporate some of these words where they fit: ${flashcardWords.slice(0, 15).join(', ')}` : ''}

QUALITY REQUIREMENTS (strictly enforce):
1. Every English sentence must be 100% grammatically correct
2. Every word must be semantically appropriate — no nonsensical word choices to force a rhyme or fill space
3. If poem: use a consistent AABB or ABAB rhyme scheme; every rhyme must make real semantic sense; never use an obscure or wrong word just to rhyme
4. If dialogue: natural, realistic conversation; name each speaker clearly ("Anna:", "Tom:")
5. If narrative: clear beginning–middle–end; coherent story
6. All punctuation must follow standard English rules
7. Double-check every sentence for grammar errors before returning

Return ONLY a JSON object — no markdown fences, no explanation, just the raw JSON:
{
  "title": "English title",
  "titleTranslation": "Translation of title in the learner's language",
  "content": "The complete English text",
  "words": {
    "english_word": { "english": "definition or translation", "example": "exact sentence from the text containing this word" }
  },
  "comprehensionQuestions": [
    { "question": "Question about the text?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0 }
  ]
}

"words": include 6–10 vocabulary items that are genuinely useful for a ${level} learner. Keys must be lowercase English words exactly as they appear in the content.
"comprehensionQuestions": 2–3 questions that require reading comprehension to answer (not trivially obvious).`;

    setLoading(true);
    setError('');

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
          model: 'claude-sonnet-4-5',
          max_tokens: 2000,
          system:
            'You are an expert English language teacher and native English writer. You create pedagogically sound, grammatically perfect reading texts for language learners. You always verify English grammar and word choice before returning. You respond with valid JSON only — no markdown fences, no explanation, just the raw JSON object.',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }

      const data = (await res.json()) as { content: { text: string }[] };
      const raw = data.content[0].text
        .trim()
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/, '');

      let parsed: any;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new Error('Failed to parse the generated text. Please try again.');
      }

      const generated: ReadingText = {
        id: `generated-${Date.now()}`,
        title: parsed.title,
        titleTranslation: parsed.titleTranslation,
        level: level as any,
        module: undefined,
        content: parsed.content,
        words: parsed.words ?? {},
        comprehensionQuestions: parsed.comprehensionQuestions ?? [],
        completed: false,
      };

      onTextGenerated(generated);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in space-y-4 pb-8">
      {/* Back button */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>

      {/* Header */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Generate Text
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">Level: {level}</p>
      </div>

      {/* Word count */}
      <Card className="p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Word count</p>
        <div className="flex flex-wrap gap-2">
          {WORD_COUNT_OPTIONS.map(count => (
            <button
              key={count}
              onClick={() => setWordCount(count)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                wordCount === count
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </Card>

      {/* Theme */}
      <Card className="p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Theme</p>

        {/* Theme mode tabs */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {(['suggested', 'custom', 'surprise'] as ThemeMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setThemeMode(mode)}
              className={`flex-1 py-2 text-xs font-semibold transition-all capitalize ${
                themeMode === mode
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              {mode === 'suggested' ? 'Suggested' : mode === 'custom' ? 'My theme' : 'Surprise'}
            </button>
          ))}
        </div>

        {/* Suggested themes */}
        {themeMode === 'suggested' && (
          <div className="grid grid-cols-2 gap-2">
            {suggestedThemes.map(theme => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`rounded-lg border px-3 py-2 text-sm text-left transition-all ${
                  selectedTheme === theme
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        )}

        {/* Custom theme */}
        {themeMode === 'custom' && (
          <Input
            value={customTheme}
            onChange={e => setCustomTheme(e.target.value)}
            placeholder="Describe your theme..."
            className="text-sm"
            maxLength={100}
          />
        )}

        {/* Surprise */}
        {themeMode === 'surprise' && (
          <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3">
            <Shuffle className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">AI will choose a random theme</p>
          </div>
        )}
      </Card>

      {/* Text type */}
      <Card className="p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Text type</p>
        <div className="flex flex-wrap gap-2">
          {([
            { value: 'narrative', label: 'Narrative' },
            { value: 'dialogue', label: 'Dialogue' },
            { value: 'poem', label: 'Poem' },
          ] as { value: TextType; label: string }[]).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTextType(value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                textType === value
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {/* Vocabulary set (optional) */}
      {sets.length > 0 && (
        <Card className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Vocabulary set <span className="normal-case font-normal">(optional)</span>
          </p>
          <select
            value={selectedSetId ?? ''}
            onChange={e => handleSetSelect(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
          >
            <option value="">None</option>
            {sets.map(set => (
              <option key={set.id} value={set.id}>
                {set.emoji} {set.title} ({set.words.length} words)
              </option>
            ))}
          </select>
          {flashcardWords.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {flashcardWords.length} words will be suggested to the AI
            </p>
          )}
        </Card>
      )}

      {/* Grammar focus (optional) */}
      <Card className="p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Grammar focus <span className="normal-case font-normal">(optional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {GRAMMAR_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleGrammarTag(tag)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                grammarFocus.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>

      {/* Generate button */}
      <Button
        className="w-full gap-2 py-5 text-base font-semibold"
        onClick={handleGenerate}
        disabled={loading || (themeMode === 'custom' && !customTheme.trim())}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate Text
          </>
        )}
      </Button>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive text-center px-2">{error}</p>
      )}
    </div>
  );
}
