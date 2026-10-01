import type { ReadingText } from '@/types/dutch';

// English Flow reading modules, in course order. The order matters: the content
// checker treats words taught in earlier modules as known in later ones.
export const englishModules: ReadingText[][] = [];

export const englishTexts: ReadingText[] = englishModules.flat();
