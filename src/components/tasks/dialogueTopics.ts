// Conversation topics for "Chat with Pip": the setup screen and the topic chips on Tasks.
import {
  Croissant, Signpost, ShoppingCart, Hand, CloudSun, Coffee, Bus, Stethoscope, CalendarClock, Briefcase,
  Users, Newspaper, MessageSquareWarning, CalendarDays, Scale, type LucideIcon,
} from 'lucide-react';
import type { Level } from './TaskFilters';

export const LEVEL_TOPICS: Record<Level, { dutch: string; english: string }[]> = {
  A1: [
    { dutch: 'At the bakery',        english: 'В пекарне' },
    { dutch: 'Asking for directions', english: 'Как пройти?' },
    { dutch: 'At the supermarket',   english: 'В супермаркете' },
    { dutch: 'Introducing yourself', english: 'Знакомство' },
    { dutch: 'The weather',          english: 'Погода' },
  ],
  A2: [
    { dutch: 'Ordering at a café',    english: 'Заказ в кафе' },
    { dutch: 'Taking the bus',        english: 'Поездка на автобусе' },
    { dutch: "At the doctor's",       english: 'У врача' },
    { dutch: 'Making an appointment', english: 'Запись на приём' },
    { dutch: 'At work',               english: 'На работе' },
  ],
  B1: [
    { dutch: 'A discussion at work',  english: 'Обсуждение на работе' },
    { dutch: 'Discussing the news',   english: 'Обсуждаем новости' },
    { dutch: 'Making a complaint',    english: 'Жалоба' },
    { dutch: 'Plans for the weekend', english: 'Планы на выходные' },
    { dutch: 'Defending an opinion',  english: 'Отстаиваем мнение' },
  ],
};

// Icons for the topic tiles on the setup screen (keyed by topic title).
export const TOPIC_ICONS: Record<string, LucideIcon> = {
  'At the bakery': Croissant,
  'Asking for directions': Signpost,
  'At the supermarket': ShoppingCart,
  'Introducing yourself': Hand,
  'The weather': CloudSun,
  'Ordering at a café': Coffee,
  'Taking the bus': Bus,
  "At the doctor's": Stethoscope,
  'Making an appointment': CalendarClock,
  'At work': Briefcase,
  'A discussion at work': Users,
  'Discussing the news': Newspaper,
  'Making a complaint': MessageSquareWarning,
  'Plans for the weekend': CalendarDays,
  'Defending an opinion': Scale,
};
