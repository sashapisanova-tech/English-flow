import { it } from 'vitest';
import { checkCourse, formatIssues, sentencesOf, tokensOf } from '@/lib/contentCheck';
import { englishModules } from '@/data/english';
import starter from '../../content/wordlists/starter.json';
import a1 from '../../content/wordlists/a1.json';
import a2 from '../../content/wordlists/a2.json';
import b1 from '../../content/wordlists/b1.json';
it('cov', () => {
  const r = checkCourse(englishModules, { starter, a1, a2, b1 });
  for (const t of englishModules.at(-1)!) {
    const s = sentencesOf(t.content); const n = s.flatMap(tokensOf).length;
    const c = r.coverage[t.id];
    console.log('REPORT', t.id, 'w', n, 'avg', (n / s.length).toFixed(1), 'k', (c.known*100).toFixed(1), 'kk', (c.knownOrKey*100).toFixed(1), c.unknown.join(','));
  }
  console.log('REPORT errors\n' + formatIssues(r.errors.filter(e => e.textId.startsWith('a2m5') || e.textId.startsWith('a2-infl'))));
});
