// Story covers in the Read tab: one icon per story, keyed by text id.
// New modules add their stories here; a story without an entry shows a book.
import {
  Armchair, Banana, BedDouble, Book, BookCopy, BookOpen, Bus, Cake, CakeSlice, Camera, Car,
  CircleDollarSign, ClipboardList, Clock, Coffee, Flag, Gift, Hotel, Medal, Milk, Pizza,
  PartyPopper, Refrigerator, Scissors, Shirt, Signpost, Siren, Smartphone, Star, ThumbsUp,
  Ticket, TrainFront, Trophy, Umbrella, UserRound, Users, House, type LucideIcon,
} from 'lucide-react';

const COVER_ICONS: Record<string, LucideIcon> = {
  // A1 · 1 New Flatmates
  'a1m1-1': TrainFront, 'a1m1-2': Refrigerator, 'a1m1-3': Milk, 'a1m1-4': BedDouble,
  'a1m1-5': ClipboardList, 'a1m1-6': Scissors, 'a1m1-7': Camera, 'a1m1-8': Siren,
  // A1 · 2 The Café Shift
  'a1m2-1': Coffee, 'a1m2-2': Armchair, 'a1m2-3': UserRound, 'a1m2-4': CircleDollarSign,
  'a1m2-5': Book, 'a1m2-6': CakeSlice, 'a1m2-7': BookCopy, 'a1m2-8': Star,
  // A1 · 3 Lost in London
  'a1m3-1': Smartphone, 'a1m3-2': Ticket, 'a1m3-3': Signpost, 'a1m3-4': Umbrella,
  'a1m3-5': Bus, 'a1m3-6': Hotel, 'a1m3-7': Clock, 'a1m3-8': Umbrella,
  // A1 · 4 The Group Chat
  'a1m4-1': PartyPopper, 'a1m4-2': Users, 'a1m4-3': Pizza, 'a1m4-4': Gift,
  'a1m4-5': ThumbsUp, 'a1m4-6': Shirt, 'a1m4-7': Clock, 'a1m4-8': PartyPopper,
  // A1 · 5 30-Day Challenge
  'a1m5-1': Trophy, 'a1m5-2': Banana, 'a1m5-3': Cake, 'a1m5-4': House,
  'a1m5-5': Medal, 'a1m5-6': Users, 'a1m5-7': Car, 'a1m5-8': Flag,
};

export function coverIcon(textId: string): LucideIcon {
  return COVER_ICONS[textId] ?? BookOpen;
}

/** Cover colours in turn: navy, red, gold (soft background + strong ink). */
export const COVER_TONES = [
  { bg: 'bg-accent', ink: 'text-primary' },
  { bg: 'bg-highlight-soft', ink: 'text-highlight' },
  { bg: 'bg-gold-soft', ink: 'text-gold-ink' },
] as const;
