// Grammar focus per module (content/CURRICULUM.md), used by the AI tutor to pick practice.
// Keyed by the module part of the text ID: 'a1m1-3' → 'a1m1'.
const MODULE_TAGS: Record<string, string[]> = {
  a1m1: ['to be', 'have got', 'there is / there are', 'articles'],
  a1m2: ['present simple', 'questions with do/does', 'can / can\'t'],
  a1m3: ['prepositions of place and time', 'imperatives', 'question words'],
  a1m4: ['present continuous vs present simple', 'like + -ing', 'object pronouns'],
  a1m5: ['adverbs of frequency', 'was / were', 'past simple'],
  a2m1: ['past simple (irregular)', 'could', 'past time expressions'],
  a2m2: ['going to', 'present continuous for arrangements', 'will'],
  a2m3: ['comparatives and superlatives', 'too / enough', '-ed / -ing adjectives'],
  a2m4: ['countable / uncountable', 'much / many / a lot of', 'should / have to'],
  a2m5: ['present perfect (ever, never, just, already, yet)'],
  a2m6: ['past continuous vs past simple', 'first conditional', 'might'],
  b1m1: ['present perfect vs past simple', 'present perfect continuous'],
  b1m2: ['modals of deduction', 'past perfect'],
  b1m3: ['used to', 'gerunds and infinitives'],
  b1m4: ['passive', 'reported speech'],
  b1m5: ['second conditional', 'wish + past simple', 'zero conditional'],
  b1m6: ['relative clauses', 'phrasal verbs'],
  b1m7: ['should have / could have', 'mixed tense review'],
};

export function getGrammarTags(textId: string): string[] {
  return MODULE_TAGS[textId.split('-')[0]] ?? [];
}
