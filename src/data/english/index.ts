import type { ReadingText } from '@/types/dutch';
import { moduleA1_1Texts } from './module-a1-1-flatmates';
import { moduleA1_2Texts } from './module-a1-2-cafe';
import { moduleA1_3Texts } from './module-a1-3-london';
import { moduleA1_4Texts } from './module-a1-4-group-chat';
import { moduleA1_5Texts } from './module-a1-5-challenge';
import { moduleA2_1Texts } from './module-a2-1-interview';
import { moduleA2_2Texts } from './module-a2-2-festival';
import { moduleA2_3Texts } from './module-a2-3-swipe-right';
import { moduleA2_4Texts } from './module-a2-4-flat-hunting';
import { moduleA2_5Texts } from './module-a2-5-influencer';
import { moduleA2_6Texts } from './module-a2-6-road-trip';
import { moduleB1_1Texts } from './module-b1-1-startup';
import { moduleB1_2Texts } from './module-b1-2-hostel';

// English Flow reading modules, in course order. The order matters: the content
// checker treats words taught in earlier modules as known in later ones.
export const englishModules: ReadingText[][] = [moduleA1_1Texts, moduleA1_2Texts, moduleA1_3Texts, moduleA1_4Texts, moduleA1_5Texts, moduleA2_1Texts, moduleA2_2Texts, moduleA2_3Texts, moduleA2_4Texts, moduleA2_5Texts, moduleA2_6Texts, moduleB1_1Texts, moduleB1_2Texts];

export const englishTexts: ReadingText[] = englishModules.flat();
