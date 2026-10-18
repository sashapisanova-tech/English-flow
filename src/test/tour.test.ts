import { describe, it, expect } from 'vitest';
import { isFirstSignIn, shouldShowTour } from '@/lib/tour';

const at = (iso: string) => new Date(iso).toISOString();
const REGISTERED = '2026-10-18T10:00:00Z';

describe('isFirstSignIn', () => {
  it('is true for the login that comes with registering (email, no confirmation)', () => {
    expect(isFirstSignIn({ created_at: at(REGISTERED), email_confirmed_at: at(REGISTERED), last_sign_in_at: at('2026-10-18T10:00:01Z') })).toBe(true);
  });

  it('is true for a first Google sign-in', () => {
    expect(isFirstSignIn({ created_at: at(REGISTERED), email_confirmed_at: at('2026-10-18T10:00:00.5Z'), last_sign_in_at: at('2026-10-18T10:00:01Z') })).toBe(true);
  });

  it('is true for the first login via the confirmation link, hours after signing up', () => {
    expect(isFirstSignIn({ created_at: at(REGISTERED), email_confirmed_at: at('2026-10-18T15:00:00Z'), last_sign_in_at: at('2026-10-18T15:00:02Z') })).toBe(true);
  });

  it('is false when signing in again an hour later', () => {
    expect(isFirstSignIn({ created_at: at(REGISTERED), email_confirmed_at: at(REGISTERED), last_sign_in_at: at('2026-10-18T11:00:00Z') })).toBe(false);
  });

  it('is false when signing in again days later, on any device', () => {
    expect(isFirstSignIn({ created_at: at('2026-09-01T10:00:00Z'), email_confirmed_at: at('2026-09-01T10:00:00Z'), last_sign_in_at: at(REGISTERED) })).toBe(false);
  });

  it('is false when dates are missing', () => {
    expect(isFirstSignIn(null)).toBe(false);
    expect(isFirstSignIn({ created_at: at(REGISTERED), last_sign_in_at: null })).toBe(false);
  });
});

describe('shouldShowTour', () => {
  it('shows the tour only on the first sign-in of an account that has not had it', () => {
    expect(shouldShowTour({ localDone: false, firstSignIn: true })).toBe(true);
    expect(shouldShowTour({ localDone: false, firstSignIn: false })).toBe(false);
    expect(shouldShowTour({ localDone: false, onboarded: true, firstSignIn: true })).toBe(false);
    expect(shouldShowTour({ localDone: true, firstSignIn: true })).toBe(false);
  });
});
