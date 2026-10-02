import { describe, it, expect, beforeEach } from 'vitest';
import { claimUserData, clearUserData } from '@/lib/userStorage';

const VOCAB = 'english-vocabulary-v1';

describe('userStorage', () => {
  beforeEach(() => localStorage.clear());

  it('clears progress when a different account signs in', () => {
    claimUserData('alice', false);
    localStorage.setItem(VOCAB, '{"huis":{}}');
    claimUserData('bob', false);
    expect(localStorage.getItem(VOCAB)).toBeNull();
  });

  it('keeps progress for the same account', () => {
    claimUserData('alice', false);
    localStorage.setItem(VOCAB, '{"huis":{}}');
    claimUserData('alice', true);
    expect(localStorage.getItem(VOCAB)).toBe('{"huis":{}}');
  });

  it('adopts untracked data only for an already-restored session', () => {
    localStorage.setItem(VOCAB, 'old');
    claimUserData('alice', true);
    expect(localStorage.getItem(VOCAB)).toBe('old');

    localStorage.clear();
    localStorage.setItem(VOCAB, 'old');
    claimUserData('bob', false);
    expect(localStorage.getItem(VOCAB)).toBeNull();
  });

  it('keeps device settings on sign-out', () => {
    localStorage.setItem('english-theme', 'dark');
    localStorage.setItem(VOCAB, 'x');
    clearUserData();
    expect(localStorage.getItem('english-theme')).toBe('dark');
    expect(localStorage.getItem(VOCAB)).toBeNull();
  });
});
