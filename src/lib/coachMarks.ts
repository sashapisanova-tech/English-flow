// Just-in-time tips (design/APP_TOUR.md §4): each tip shows once per account and
// never two at once. A tip "claims" the single slot; it counts as seen once shown.

export const TIP_KEYS = {
  /** Under a text, the first time the reader reaches its end. */
  textFinished: 'english-tip-text-finished-v1',
  /** Cards overview with nothing due. */
  cardsCaughtUp: 'english-tip-cards-caught-up-v1',
  /** Home goal ring, the first time Home shows after the tour. */
  homeGoal: 'english-tip-home-goal-v1',
} as const;

export type TipKey = (typeof TIP_KEYS)[keyof typeof TIP_KEYS];

let active: TipKey | null = null;
let blocked = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());

export function subscribeTips(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** While the tour is open no tip may show. */
export function setTipsBlocked(value: boolean) {
  if (blocked === value) return;
  blocked = value;
  emit();
}

export function tipSeen(key: TipKey): boolean {
  try { return localStorage.getItem(key) !== null; } catch { return true; }
}

/** Takes the tip slot for `key` if it is free and the tip hasn't been seen. */
export function claimTip(key: TipKey): boolean {
  if (blocked) {
    if (active === key) active = null;
    return false;
  }
  if (active === key) return true;
  if (active !== null || tipSeen(key)) return false;
  active = key;
  try { localStorage.setItem(key, 'true'); } catch { /* storage unavailable */ }
  emit();
  return true;
}

export function releaseTip(key: TipKey) {
  if (active !== key) return;
  active = null;
  emit();
}
