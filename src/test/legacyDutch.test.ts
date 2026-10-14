import { describe, it, expect } from 'vitest';
import { isLegacyDutchWord, isLegacyTextId, isLegacyTextProgress, isLegacyPracticeSession } from '@/lib/legacyDutch';

describe('Dutch Flow leftovers', () => {
  it('recognises Dutch saved words (English translation, Dutch word or example)', () => {
    expect(isLegacyDutchWord('heet', 'is called', 'Ik heet Anna.')).toBe(true);
    expect(isLegacyDutchWord('fiets', 'bicycle')).toBe(true);
    // An English-looking word with a Dutch example is Dutch-era data too
    expect(isLegacyDutchWord('water', 'water', 'Ik drink water.')).toBe(true);
  });
  it('keeps English Flow words (Russian translation)', () => {
    expect(isLegacyDutchWord('flatmate', 'сосед по квартире', 'Tom is my flatmate.')).toBe(false);
    expect(isLegacyDutchWord('heet', 'Перевод недоступен')).toBe(false);
  });
  it('keeps English words with English examples even without Russian', () => {
    expect(isLegacyDutchWord('kitchen', 'kitchen', 'The kitchen is small.')).toBe(false);
  });
  it('drops progress for texts that are not English Flow texts', () => {
    expect(isLegacyTextId('m1-1')).toBe(true);
    expect(isLegacyTextId('a2m9-3')).toBe(true);
    expect(isLegacyTextId('a1m1-1')).toBe(false);
  });
  it('drops Dutch-era progress on A2/B1 IDs that English Flow now reuses', () => {
    // Dutch Flow had a text a2m1-3 too; progress saved before English A2 existed is Dutch
    expect(isLegacyTextProgress('a2m1-3', '2026-09-30T10:00:00.000Z')).toBe(true);
    expect(isLegacyTextProgress('a2m1-3', undefined)).toBe(true);
    expect(isLegacyTextProgress('a2m1-3', '2026-10-15T10:00:00.000Z')).toBe(false);
    // A1 texts were English from the start, whatever the date
    expect(isLegacyTextProgress('a1m1-1', '2026-09-30T10:00:00.000Z')).toBe(false);
    expect(isLegacyTextProgress('m1-1', '2026-10-15T10:00:00.000Z')).toBe(true);
  });
  it('recognises Dutch grammar practice sessions', () => {
    expect(isLegacyPracticeSession({ grammar_focus: 'Word order (V2)', hard_grammar_targets: [] })).toBe(true);
    expect(isLegacyPracticeSession({ grammar_focus: null, hard_grammar_targets: ['de/het articles'] })).toBe(true);
    expect(isLegacyPracticeSession({ grammar_focus: 'present simple', hard_grammar_targets: ['articles'] })).toBe(false);
  });
});
