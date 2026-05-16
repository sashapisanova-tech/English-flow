import { ReadingText } from '@/types/dutch';
import { module1Texts } from './module1-daily-survival';
import { module2Texts } from './module2-social-life';
import { module3Texts } from './module3-city-movement';
import { module4Texts } from './module4-work-study';
import { module5Texts } from './module5-personal-development';

export const sampleTexts: ReadingText[] = [
  ...module1Texts,
  ...module2Texts,
  ...module3Texts,
  ...module4Texts,
  ...module5Texts,
];
