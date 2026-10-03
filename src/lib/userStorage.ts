// Browser-side copies of a user's progress. They must never leak into another
// account: on sign-in we check who the data belongs to, and on sign-out we clear it.
// Device settings (theme, voice) are intentionally not listed and survive sign-out.

const OWNER_KEY = 'english-storage-owner';

const USER_DATA_KEYS = [
  'english-vocabulary-v1',
  'english-player-stats-v1',
  'english-text-progress-v1',
  'english-daily-goals-v1',
  'english-new-cards-today-v1',
  'english-active-time-v1',
  'english-daily-goal-minutes-v1',
  'english-past-errors-v1',
  'english-tutor-daily-cache',
  'english-tutor-daily-cache-v2',
  'english-daily-expression-v1',
  'english-translate-last-hard-grammar',
  'english-custom-sets-v1',
  'english-text-reads',
  'english-detected-level-history',
  'english-challenge-streak',
  'english-challenge-last',
  'english-app-onboarded-v1',
  'english-reading-onboarded-v2',
  'english-start-level-v1',
  'english-study-time-v1',
  'english-tip-text-finished-v1',
  'english-tip-cards-caught-up-v1',
  'english-tip-home-goal-v1',
];

export function clearUserData() {
  try {
    for (const key of USER_DATA_KEYS) localStorage.removeItem(key);
    localStorage.removeItem(OWNER_KEY);
  } catch { /* storage unavailable */ }
}

/**
 * Call when a session becomes active, before the app reads any progress.
 * Wipes local data that belongs to a different account.
 * `restored` = session was already active on page load (not a fresh sign-in):
 * data saved before owners were tracked is then assumed to be this user's.
 */
export function claimUserData(userId: string, restored: boolean) {
  try {
    const owner = localStorage.getItem(OWNER_KEY);
    if (owner === userId) return;
    if (owner !== null || !restored) clearUserData();
    localStorage.setItem(OWNER_KEY, userId);
  } catch { /* storage unavailable */ }
}
