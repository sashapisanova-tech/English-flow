import { describe, it, expect } from 'vitest';
import { homeGreeting, ruDays, celebrationContent } from '@/lib/pip';

const base = { hour: 9, minutesToday: 0, goalMinutes: 10, streak: 0, daysSinceGoal: 0 };

describe("Pip's lines", () => {
  it('uses correct Russian plurals for days', () => {
    expect([1, 2, 5, 11, 21, 22, 25, 101].map(ruDays)).toEqual(
      ['1 день', '2 дня', '5 дней', '11 дней', '21 день', '22 дня', '25 дней', '101 день']);
  });
  it('welcomes people back after a break, without guilt', () => {
    const { pose, line } = homeGreeting({ ...base, daysSinceGoal: 4 }, 0);
    expect(pose).toBe('wave');
    expect(line.en).toMatch(/welcome back|good to see you/i);
    expect(line.en).not.toMatch(/miss|sad|disappoint|lost/i);
  });
  it('celebrates when the goal is already met', () => {
    expect(homeGreeting({ ...base, minutesToday: 12 }, 0).pose).toBe('happy');
  });
  it("doesn't say 'nice start' before a full minute", () => {
    expect(homeGreeting({ ...base, minutesToday: 0.2 }, 0).line.en).not.toMatch(/nice start/i);
  });
  it('shows the minutes left once practice has started', () => {
    expect(homeGreeting({ ...base, minutesToday: 6.2 }, 0).line.en).toMatch(/4 more min/);
  });
  it('gives each celebration its pose', () => {
    expect(celebrationContent({ kind: 'freeze', streak: 3 }).pose).toBe('snow');
    expect(celebrationContent({ kind: 'milestone', streak: 7 }).pose).toBe('celebrate');
    expect(celebrationContent({ kind: 'goal', minutes: 10, streak: 2 }, 0).pose).toBe('happy');
  });
});
