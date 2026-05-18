import type { FlashcardSet, FlashcardSetWord } from '@/types/dutch';

function w(dutch: string, english: string, example: string, exampleTranslation: string, note?: string): FlashcardSetWord {
  return { dutch, english, example, exampleTranslation, ...(note ? { nounTip: note } : {}) };
}

export const a1CoreSet: FlashcardSet = {
  id: 'a1-core-50',
  emoji: '⭐',
  title: 'Core Words to Begin',
  category: 'nouns',
  level: 'A1',
  folder: 'Core',
  words: [
    // Pronouns
    w('ik',        'I',                    'Ik heet Anna.',             'My name is Anna.',                   'Always lowercase in Dutch, unlike English "I".'),
    w('je / jij',  'you (informal)',        'Wat doe jij?',              'What are YOU doing?',                '"Je" is the relaxed form. "Jij" adds emphasis.'),
    w('hij',       'he',                   'Hij werkt hier.',           'He works here.',                     'Used for men and many masculine objects.'),
    w('zij / ze',  'she / they',           'Ze woont in Amsterdam.',    'She lives in Amsterdam.',            '"Zij/ze" means both "she" and "they" — context makes it clear.'),
    w('wij / we',  'we',                   'We gaan naar huis.',        'We are going home.',                 '"We" is the casual form. "Wij" adds emphasis.'),
    w('u',         'you (formal)',          'Hoe gaat het met u?',       'How are you?',                       'Polite "you" — used with strangers, elderly, and in professional settings.'),
    // Articles
    w('de',        'the (de-word)',         'De man, de vrouw, de fiets.','The man, the woman, the bike.',    'One of two Dutch words for "the". Used for ~75% of all nouns.'),
    w('het',       'the (het-word)',        'Het kind, het huis, het water.','The child, the house, the water.','The other Dutch "the" — used for ~25% of nouns. Must be memorised per word.'),
    w('een',       'a / an',               'Ik zie een auto.',          'I see a car.',                       'The Dutch "a/an" — used the same way as in English.'),
    // Core verbs
    w('zijn',      'to be',                'Ik ben student. Hij is hier.','I am a student. He is here.',     'The most important Dutch verb. Also means "his" (zijn boek = his book).'),
    w('hebben',    'to have',              'Ik heb een vraag.',         'I have a question.',                 'Also used to form the past tense: "Ik heb gegeten" (I have eaten).'),
    w('worden',    'to become',            'Het wordt koud.',           'It is getting cold.',                'Used for change of state and the passive voice.'),
    w('gaan',      'to go',               'Ik ga naar school.',        'I am going to school.',              'Also used as a future helper: "Ik ga eten" (I am going to eat).'),
    w('kunnen',    'can / to be able to',  'Kun jij helpen?',           'Can you help?',                      'Modal verb — always pairs with another verb.'),
    w('willen',    'to want',              'Ik wil een koffie.',        'I want a coffee.',                   'Very useful for ordering food and making requests.'),
    w('moeten',    'must / have to',       'Je moet dit lezen.',        'You must read this.',                'Expresses obligation.'),
    w('zeggen',    'to say',              'Wat zeg jij?',              'What do you say?',                   'For reporting speech: "Hij zegt dat..." = He says that...'),
    w('komen',     'to come',             'Ze komt uit Nederland.',    'She comes from the Netherlands.',    'Movement toward. Often paired with "van" (from) or "naar" (to).'),
    w('zien',      'to see',              'Ik zie je morgen.',         'I will see you tomorrow.',           'Seeing with eyes, but also "I see/understand the problem".'),
    // Negation & emphasis
    w('niet',      'not',                 'Ik ben niet moe.',          'I am not tired.',                    'Goes AFTER the verb — different from English!'),
    w('geen',      'no / not a',          'Ik heb geen tijd.',         'I have no time.',                    'Negates nouns. Replaces "een": "Ik heb geen auto" (I have no car).'),
    w('wel',       'indeed / do (emphasis)','Ik ben wel moe.',         'I AM tired (actually).',             'The opposite of "niet". Adds emphasis or confirmation.'),
    w('ook',       'also / too',          'Ik woon ook in Amsterdam.', 'I also live in Amsterdam.'),
    w('nog',       'still / yet',         'Ben je nog hier?',          'Are you still here?',                '"Nog" = still ongoing. "Nog niet" = not yet.'),
    w('al',        'already',             'Het is al laat.',           'It is already late.',                'Something happened sooner than expected.'),
    // Adverbs & adjectives
    w('heel',      'very',                'Het is heel lekker.',       'It is very tasty.',                  'Also means "whole": "de hele dag" (the whole day).'),
    w('erg',       'very / awful',        'Ik ben erg blij.',          'I am very happy.',                   'Slightly more intense than "heel". Also means "awful" as adjective.'),
    w('zo',        'so / like this',      'Dat is zo leuk!',           'That is so nice!',                   '"Zo goed" = so good. "Doe het zo" = do it like this.'),
    w('nu',        'now',                 'Wat doe je nu?',            'What are you doing now?'),
    w('dan',       'then',                'Eerst eten, dan slapen.',    'First eat, then sleep.',             '"Als...dan..." = if...then...'),
    w('hier',      'here',                'Kom hier!',                 'Come here!',                         'This place, close to you.'),
    w('daar',      'there',               'Hij zit daar.',             'He is sitting there.',               'That place, farther away.'),
    // Conjunctions & question words
    w('en',        'and',                 'Ik lees en schrijf.',       'I read and write.'),
    w('maar',      'but',                 'Ik wil, maar ik kan niet.', 'I want to, but I cannot.'),
    w('of',        'or / whether',        'Wil je koffie of thee?',    'Do you want coffee or tea?',         'Also used in indirect questions: "Ik vraag of..." (I wonder whether...).'),
    w('dat',       'that',                'Ik weet dat je hier bent.', 'I know that you are here.',          'Points to something ("that house") or connects clauses.'),
    w('die',       'that / those / who',  'Die vrouw is mijn moeder.', 'That woman is my mother.',           'Points to de-words and people. "De man die..." = the man who...'),
    w('wat',       'what',                'Wat wil je doen?',          'What do you want to do?',            'Also means "something" informally: "Wil je wat eten?"'),
    w('wie',       'who',                 'Wie is dat?',               'Who is that?'),
    w('waar',      'where',               'Waar ga je naartoe?',       'Where are you going?'),
    w('wanneer',   'when',                'Wanneer begin je?',         'When do you start?'),
    w('hoe',       'how',                 'Hoe heet jij?',             'What is your name?',                 '"Hoe gaat het?" = How are you? One of the first phrases you will use.'),
    // Prepositions
    w('in',        'in / inside',         'Ik woon in Utrecht.',       'I live in Utrecht.',                 'Location inside something.'),
    w('op',        'on / at',             'Het boek ligt op de tafel.','The book is on the table.',          '"Op school" (at school), "op maandag" (on Monday).'),
    w('van',       'of / from',           'Ik kom van Nederland.',     'I am from the Netherlands.',         'Origin or belonging. "Het boek van Jan" = Jan\'s book.'),
    w('naar',      'to / towards',        'Ik ga naar huis.',          'I am going home.',                   'Direction of movement. Always use "naar" when going somewhere.'),
    w('met',       'with',                'Ik ga met jou.',            'I am going with you.',               '"Met de trein" = by train.'),
    w('voor',      'for / before',        'Dit is voor jou.',          'This is for you.',                   '"Voor het huis" = in front of the house.'),
    w('uit',       'out / from',          'Ik kom uit Engeland.',      'I come from England.',               'Also for origins: "Ik kom uit België" (I am from Belgium).'),
  ],
};
