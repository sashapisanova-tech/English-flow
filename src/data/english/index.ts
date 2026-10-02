import type { ReadingText } from '@/types/dutch';
import { moduleA1_1Texts } from './module-a1-1-flatmates';
import { moduleA1_2Texts } from './module-a1-2-cafe';
import { moduleA1_3Texts } from './module-a1-3-london';

// English Flow reading modules, in course order. The order matters: the content
// checker treats words taught in earlier modules as known in later ones.
export const englishModules: ReadingText[][] = [moduleA1_1Texts, moduleA1_2Texts, moduleA1_3Texts];

export const englishTexts: ReadingText[] = englishModules.flat();
