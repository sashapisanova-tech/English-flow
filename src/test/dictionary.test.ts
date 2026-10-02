import { describe, it, expect } from 'vitest';
import { lookupWord } from '@/lib/dictionary';

describe('lookupWord (prepared EN → RU translations)', () => {
  it('translates contractions', () => {
    expect(lookupWord("I'm")?.translation).toContain('I am');
    expect(lookupWord('don’t')?.translation).toContain('do not');
  });
  it('finds list words in Russian', () => {
    expect(lookupWord('flatmate')?.translation).toMatch(/[а-я]/);
    expect(lookupWord('Fridge.')?.translation).toMatch(/холодильник/);
  });
  it('finds base forms of inflected words', () => {
    expect(lookupWord('went')?.base).toBe('go');
    expect(lookupWord('flatmates')?.base).toBe('flatmate');
  });
  it('keeps headwords whole (bed is not be + -ed)', () => {
    expect(lookupWord('bed')?.base).toBeUndefined();
  });
  it('finds list phrases', () => {
    expect(lookupWord('get up')?.translation).toMatch(/[а-я]/);
  });
  it('returns null for unknown words', () => {
    expect(lookupWord('xylophonic')).toBeNull();
  });
});
