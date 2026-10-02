import {
  AlarmClock, BookA, Brain, Briefcase, Building2, CalendarDays, ClipboardList, CloudSun, CornerDownRight,
  Drama, Globe, Hand, Handshake, Hash, HeartPulse, House, Landmark, Link2, MapPin, MessageCircle,
  MessageSquareQuote, MessagesSquare, MoveRight, Package, Palette, Plane, PoundSterling, Repeat, Scale,
  Shirt, Smartphone, Smile, Sparkles, UserRound, Users, UsersRound, UtensilsCrossed, Volleyball, Zap,
  type LucideIcon,
} from 'lucide-react';
import type { FlashcardSet } from '@/types/dutch';

/**
 * Icons for the prepared flashcard sets (shown in a soft accent tile instead
 * of the set's emoji). Matched on the topic part of the set id, e.g.
 * "a2-n-food-and-drink-1" → "food-and-drink". Custom sets keep their emoji.
 */
const TOPIC_ICONS: [topic: string, icon: LucideIcon][] = [
  // Core: little words, phrases
  ['hello', Hand],
  ['pronouns', Users],
  ['determiners', CornerDownRight],
  ['linking', Link2],
  ['prepositions', MapPin],
  ['when-and-how-often', Repeat],
  ['useful-adverbs', MoveRight],
  ['numbers', Hash],
  ['meeting-people', Handshake],
  ['useful-phrases', MessageSquareQuote],
  ['daily-routine', AlarmClock],
  // Topics
  ['people-and-family', UsersRound],
  ['describing-people', UserRound],
  ['home-and-daily-life', House],
  ['food-and-drink', UtensilsCrossed],
  ['money-and-shopping', PoundSterling],
  ['clothes', Shirt],
  ['town-and-directions', Building2],
  ['travel-and-transport', Plane],
  ['time-and-dates', CalendarDays],
  ['weather-and-nature', CloudSun],
  ['body-and-health', HeartPulse],
  ['work-and-study', Briefcase],
  ['free-time-and-sport', Volleyball],
  ['media-and-technology', Smartphone],
  ['countries-and-languages', Globe],
  ['nationalities', Globe],
  ['colours', Palette],
  ['feelings-and-thoughts', Brain],
  ['feelings', Smile],
  ['society', Landmark],
  ['crime-and-law', Scale],
  ['paperwork-and-officialdom', ClipboardList],
  ['communication-and-opinions', MessagesSquare],
  ['talking-and-discussing', MessageCircle],
  ['culture-and-traditions', Drama],
];

const CATEGORY_ICONS: Record<FlashcardSet['category'], LucideIcon> = {
  verbs: Zap,
  nouns: Package,
  adjectives: Sparkles,
  numbers: Hash,
  location: MapPin,
};

export function getSetIcon(set: Pick<FlashcardSet, 'id' | 'category' | 'folder'>): LucideIcon {
  const id = set.id.toLowerCase();
  const match = TOPIC_ICONS.find(([topic]) => id.includes(topic));
  if (match) return match[1];
  if (set.folder === 'Core') return BookA;
  return CATEGORY_ICONS[set.category] ?? Package;
}
