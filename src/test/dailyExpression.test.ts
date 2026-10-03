import { describe, it, expect } from 'vitest';
import { canGenerate, withNewExpression, parseExpression, newerState, buildPrompt, EMPTY_STATE } from '@/lib/dailyExpression';

const item = { expression: 'fancy a cuppa?', translation: 'хочешь чаю?', note: 'Неформально.', example: 'Fancy a cuppa before work?', exampleTranslation: 'Хочешь чаю перед работой?', level: 'A2' };

describe('expression of the day', () => {
  it('allows one expression per day', () => {
    expect(canGenerate(EMPTY_STATE, '2026-10-03')).toBe(true);
    const s = withNewExpression(EMPTY_STATE, item, '2026-10-03');
    expect(canGenerate(s, '2026-10-03')).toBe(false);
    expect(canGenerate(s, '2026-10-04')).toBe(true);
  });
  it('keeps a history without duplicates, newest first', () => {
    let s = withNewExpression(EMPTY_STATE, item, '2026-10-01');
    s = withNewExpression(s, { ...item, expression: 'sorted' }, '2026-10-02');
    s = withNewExpression(s, { ...item, expression: 'Fancy a cuppa?' }, '2026-10-03');
    expect(s.history).toEqual(['Fancy a cuppa?', 'sorted']);
  });
  it('sends the history so the AI avoids repeats', () => {
    expect(buildPrompt('A2', ['sorted']).user).toMatch(/don't repeat\): sorted/);
  });
  it('accepts a valid reply (also inside a code block)', () => {
    const raw = '```json\n' + JSON.stringify(item) + '\n```';
    expect(parseExpression(raw, 'A2')?.expression).toBe('fancy a cuppa?');
  });
  it('rejects replies with the wrong languages or broken JSON', () => {
    expect(parseExpression(JSON.stringify({ ...item, translation: 'do you want tea' }), 'A2')).toBeNull();
    expect(parseExpression(JSON.stringify({ ...item, expression: 'хочешь чаю' }), 'A2')).toBeNull();
    expect(parseExpression('not json', 'A2')).toBeNull();
  });
  it('prefers the newer of device and account copies', () => {
    const a = withNewExpression(EMPTY_STATE, item, '2026-10-02');
    const b = withNewExpression(EMPTY_STATE, item, '2026-10-03');
    expect(newerState(a, b).date).toBe('2026-10-03');
    expect(newerState(EMPTY_STATE, a).date).toBe('2026-10-02');
  });
});
