// What Pip says, and the celebration events that make Pip appear. Pip encourages and
// celebrates real progress; it never guilt-trips (content/CONTENT_GUIDE.md, design/APP_TOUR.md).

import type { PipPose } from '@/components/Pip';

export interface PipLine { en: string; ru: string }

const pick = <T,>(items: T[], seed: number) => items[Math.abs(seed) % items.length];

/** "1 день", "3 дня", "7 дней": Russian plural for days. */
export function ruDays(n: number): string {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} дня`;
  return `${n} дней`;
}

/** Seed that changes once a day, so the home line is stable for the day but varies. */
export const daySeed = (date = new Date()) => date.getFullYear() * 400 + date.getMonth() * 31 + date.getDate();

interface HomeState {
  hour: number;
  minutesToday: number;
  goalMinutes: number;
  streak: number;
  /** Days since the last day the goal was met (0 = today, 1 = yesterday, null = never). */
  daysSinceGoal: number | null;
}

/** Pip's one line on the home screen, with the pose to show. */
export function homeGreeting(s: HomeState, seed = daySeed()): { pose: PipPose; line: PipLine } {
  if (s.minutesToday >= s.goalMinutes) {
    return { pose: 'happy', line: pick([
      { en: "Goal done for today. Lovely work.", ru: 'Цель на сегодня выполнена. Отличная работа.' },
      { en: "That's today sorted. Fancy one more story?", ru: 'На сегодня готово. Может, ещё одну историю?' },
    ], seed) };
  }
  if (s.daysSinceGoal !== null && s.daysSinceGoal > 1) {
    return { pose: 'wave', line: pick([
      { en: "Welcome back! Let's pick up where you left off.", ru: 'С возвращением! Продолжим с того места, где остановились.' },
      { en: 'Good to see you again. Ten minutes is plenty.', ru: 'Рад снова вас видеть. Десяти минут вполне хватит.' },
    ], seed) };
  }
  // "Nice start" only after a real minute, so it never contradicts "0 of 10 min"
  if (s.minutesToday >= 1) {
    const left = Math.max(1, Math.ceil(s.goalMinutes - s.minutesToday));
    return { pose: 'happy', line: { en: `Nice start! Just ${left} more min today.`, ru: `Хорошее начало! Ещё ${left} мин на сегодня.` } };
  }
  if (s.streak >= 2) {
    return { pose: 'wave', line: { en: `${s.streak} days in a row. Let's keep it going!`, ru: `${ruDays(s.streak)} подряд. Продолжим!` } };
  }
  if (s.hour < 12) return { pose: 'wave', line: pick([
    { en: `Morning! ${s.goalMinutes} minutes of English today?`, ru: `Доброе утро! ${s.goalMinutes} минут английского сегодня?` },
    { en: 'Morning! A cup of tea and a short story?', ru: 'Доброе утро! Чашка чая и короткая история?' },
  ], seed) };
  if (s.hour >= 20) return { pose: 'sleepy', line: { en: 'A short story before bed?', ru: 'Короткая история перед сном?' } };
  return { pose: 'wave', line: pick([
    { en: `Hi! ${s.goalMinutes} minutes is all it takes today.`, ru: `Привет! Сегодня нужно всего ${s.goalMinutes} минут.` },
    { en: "Hello! Ready for today's story?", ru: 'Привет! Готовы к сегодняшней истории?' },
  ], seed) };
}

// ── Celebrations ────────────────────────────────────────────────────────────

export type Celebration =
  | { kind: 'goal'; minutes: number; streak: number }
  | { kind: 'milestone'; streak: number }
  | { kind: 'freeze'; streak: number }
  | { kind: 'story'; title: string; onNext?: () => void };

export const STREAK_MILESTONES = [7, 30, 100, 365];

const EVENT = 'english-pip-celebrate';

export function celebrate(c: Celebration) {
  window.dispatchEvent(new CustomEvent<Celebration>(EVENT, { detail: c }));
}

export function onCelebrate(handler: (c: Celebration) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<Celebration>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

/** Pose, title and line for a celebration sheet. */
export function celebrationContent(c: Celebration, seed = Date.now()): { pose: PipPose; title: PipLine; line: PipLine } {
  switch (c.kind) {
    case 'goal':
      return { pose: 'happy',
        title: { en: `${c.minutes} minutes done!`, ru: `${c.minutes} минут — готово!` },
        line: pick([
          { en: "That's how a habit is built: one day at a time.", ru: 'Так и появляется привычка — день за днём.' },
          { en: `Streak: ${c.streak} ${c.streak === 1 ? 'day' : 'days'}. See you tomorrow!`, ru: `Серия: ${ruDays(c.streak)}. До завтра!` },
        ], seed) };
    case 'milestone':
      return { pose: 'celebrate',
        title: { en: `${c.streak} days in a row!`, ru: `${ruDays(c.streak)} подряд!` },
        line: c.streak === 7
          ? { en: "A whole week! You've earned a streak freeze.", ru: 'Целая неделя! Вы получили заморозку серии.' }
          : { en: "That's real dedication. I'm proud of you.", ru: 'Вот это настойчивость. Я горжусь вами.' } };
    case 'freeze':
      return { pose: 'snow',
        title: { en: 'Your streak is safe', ru: 'Ваша серия сохранена' },
        line: { en: 'A freeze covered the missed day. Fresh start today!', ru: 'Заморозка покрыла пропущенный день. Сегодня — новый старт!' } };
    case 'story':
      return { pose: 'happy',
        title: { en: 'Story episode finished!', ru: 'Эпизод прочитан!' },
        line: { en: `"${c.title}": done. Want to know what happens next?`, ru: 'Готово. Хотите узнать, что будет дальше?' } };
  }
}
