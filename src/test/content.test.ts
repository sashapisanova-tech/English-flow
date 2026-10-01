import { describe, it, expect } from 'vitest';
import { checkCourse, formatIssues } from '@/lib/contentCheck';
import { englishModules } from '@/data/english';
import starter from '../../content/wordlists/starter.json';
import a1 from '../../content/wordlists/a1.json';
import a2 from '../../content/wordlists/a2.json';
import b1 from '../../content/wordlists/b1.json';

// Runs the content guide's measurable rules over every English module.
// Run alone with: npx vitest run src/test/content.test.ts
describe('English Flow content', () => {
  it('follows the content guide', () => {
    const { errors, warnings } = checkCourse(englishModules, { starter, a1, a2, b1 });
    if (warnings.length) console.warn(`Content warnings:\n${formatIssues(warnings)}`);
    expect(errors, `Content errors:\n${formatIssues(errors)}`).toEqual([]);
  });
});
