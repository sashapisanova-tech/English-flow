// First-run tour (design/APP_TOUR.md, design/flow-series-7/TourPhone + TourLaptop):
// storage keys and the choices the tour saves. All keys are per account (USER_DATA_KEYS).
import type { Level, ReadingText } from '@/types/dutch';
import type { PipPose } from '@/components/Pip';

export const APP_ONBOARDING_KEY = 'english-app-onboarded-v1';
export const START_LEVEL_KEY = 'english-start-level-v1';
export const STUDY_TIME_KEY = 'english-study-time-v1';

/** Pip's pose on the welcome step. A flag pose will replace the wave later. */
export const TOUR_WELCOME_POSE: PipPose = 'flag';

export const TOUR_LEVELS = ['A1', 'A2', 'B1'] as const;
export type TourLevel = (typeof TOUR_LEVELS)[number];

export const STUDY_TIMES = ['After breakfast', 'On the way', 'Lunch break', 'Evening'] as const;
export type StudyTime = (typeof STUDY_TIMES)[number];

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* storage unavailable */ }
}

export function isTourDone(): boolean {
  return read(APP_ONBOARDING_KEY) !== null;
}
export function markTourDone() {
  write(APP_ONBOARDING_KEY, 'true');
}
export function resetTour() {
  write(APP_ONBOARDING_KEY, null);
}

/** Supabase user_metadata flag: the tour has opened once for this account (on any device). */
export const ONBOARDED_META_KEY = 'app_onboarded';
/** A login this close to the moment the account became usable is the registration itself. */
export const FIRST_SIGN_IN_WINDOW_MS = 5 * 60 * 1000;

/** The Supabase user fields the tour rule reads. */
export interface TourAccount {
  created_at?: string | null;
  email_confirmed_at?: string | null;
  last_sign_in_at?: string | null;
}

/**
 * True for the session that starts right after registering. Supabase sets `last_sign_in_at`
 * on every login (password or Google), not on reloads or token refreshes, so any later
 * login is far from the registration time. With email confirmation on, the confirm link is
 * the first login, so it is compared with `email_confirmed_at`.
 */
export function isFirstSignIn(account: TourAccount | null | undefined): boolean {
  if (!account) return false;
  const signIn = Date.parse(account.last_sign_in_at ?? '');
  const ready = Date.parse(account.email_confirmed_at ?? account.created_at ?? '');
  if (!Number.isFinite(signIn) || !Number.isFinite(ready)) return false;
  return Math.abs(signIn - ready) < FIRST_SIGN_IN_WINDOW_MS;
}

/**
 * The tour opens by itself only once, right after registering. Signing in again, on this
 * or another device, never shows it (it can still be replayed from Settings).
 */
export function shouldShowTour(state: { localDone: boolean; onboarded?: unknown; firstSignIn: boolean }): boolean {
  return !state.localDone && state.onboarded !== true && state.firstSignIn;
}

/** The level picked in the tour, or null when none was picked. */
export function getStartLevel(): TourLevel | null {
  const v = read(START_LEVEL_KEY);
  return (TOUR_LEVELS as readonly string[]).includes(v ?? '') ? (v as TourLevel) : null;
}
export function setStartLevel(level: TourLevel) {
  write(START_LEVEL_KEY, level);
}

export function getStudyTime(): StudyTime | null {
  const v = read(STUDY_TIME_KEY);
  return (STUDY_TIMES as readonly string[]).includes(v ?? '') ? (v as StudyTime) : null;
}
export function setStudyTime(time: StudyTime | null) {
  write(STUDY_TIME_KEY, time);
}

/** Episode 1 of the level's course: its first text in course order, or A1 episode 1 when the level has none yet. */
export function firstStoryFor(texts: ReadingText[], level: Level): ReadingText | undefined {
  const course = texts.filter(t => t.module);
  return course.find(t => t.level === level) ?? course.find(t => t.level === 'A1') ?? texts[0];
}
