import type { FlashcardSet, FlashcardSetWord } from '@/types/dutch';

function adj(
  dutch: string,
  english: string,
  inflected: string | null,
  example: string,
  exampleTranslation: string,
  note?: string,
): FlashcardSetWord {
  return {
    dutch,
    english,
    ...(inflected ? { inflected } : { neverInflects: true }),
    example,
    exampleTranslation,
    ...(note ? { nounTip: note } : {}),
  };
}

function aset(id: string, emoji: string, title: string, words: FlashcardSetWord[]): FlashcardSet {
  return { id, emoji, title, category: 'adjectives', level: 'A2', folder: 'Adjectives', words };
}

export const a2AdjectiveSets: FlashcardSet[] = [

  aset('a2-adj-health-body', '💪', 'Health & the Body', [
    adj('gezond',       'healthy',                  'gezonde',          'Groente eten is gezond.',              'Eating vegetables is healthy.'),
    adj('ongezond',     'unhealthy',                'ongezonde',        'Veel suiker is ongezond.',             'A lot of sugar is unhealthy.'),
    adj('ziek',         'ill / sick',               'zieke',            'Ik voel me ziek.',                    'I feel sick.',                       'ziek before a noun: een zieke patiënt'),
    adj('fit',          'fit / in shape',           'fitte',            'Hij is heel fit.',                    'He is very fit.'),
    adj('moe',          'tired',                    null,               'Ik ben erg moe.',                     'I am very tired.',                   'moe never takes -e before a noun'),
    adj('pijnlijk',     'painful',                  'pijnlijke',        'Mijn knie is pijnlijk.',              'My knee is painful.'),
    adj('zwanger',      'pregnant',                 'zwangere',         'Ze is zwanger.',                      'She is pregnant.',                   'zwanger never has a comparative'),
    adj('allergisch',   'allergic',                 'allergische',      'Ik ben allergisch voor noten.',       'I am allergic to nuts.'),
    adj('doof',         'deaf',                     'dove',             'Hij is aan één oor doof.',            'He is deaf in one ear.',             'doof → dove before noun (d-rule)'),
    adj('blind',        'blind',                    'blinde',           'Ze is blind geboren.',                'She was born blind.'),
  ]),

  aset('a2-adj-personality', '🤝', 'Personality & Social Behaviour', [
    adj('verlegen',     'shy / timid',              null,               'Ze is verlegen op feestjes.',         'She is shy at parties.',             'verlegen never adds -e'),
    adj('zelfverzekerd','self-confident',            'zelfverzekerde',   'Hij is heel zelfverzekerd.',         'He is very self-confident.'),
    adj('geduldig',     'patient',                  'geduldige',        'Ze is een geduldige leraar.',         'She is a patient teacher.'),
    adj('ongeduldig',   'impatient',                'ongeduldige',      'Hij wordt snel ongeduldig.',         'He becomes impatient quickly.'),
    adj('nieuwsgierig', 'curious',                  'nieuwsgierige',    'Het kind is nieuwsgierig.',          'The child is curious.'),
    adj('zorgzaam',     'caring',                   'zorgzame',         'Ze is erg zorgzaam.',                'She is very caring.'),
    adj('bescheiden',   'modest / humble',          null,               'Hij is bescheiden over zijn succes.', 'He is modest about his success.',   'bescheiden never adds -e'),
    adj('arrogant',     'arrogant',                 'arrogante',        'Hij gedraagt zich arrogant.',        'He behaves arrogantly.'),
    adj('sociaal',      'social / sociable',        'sociale',          'Ze is een sociaal persoon.',         'She is a sociable person.'),
    adj('betrouwbaar',  'reliable / trustworthy',   'betrouwbare',      'Hij is een betrouwbare vriend.',     'He is a reliable friend.'),
  ]),

  aset('a2-adj-feelings', '🧠', 'Feelings & Mental States', [
    adj('teleurgesteld','disappointed',             'teleurgestelde',   'Ik ben teleurgesteld.',              'I am disappointed.',                 'no comparative in common use'),
    adj('opgelucht',    'relieved',                 'opgeluchte',       'Ze is opgelucht.',                   'She is relieved.'),
    adj('jaloers',      'jealous',                  'jaloerse',         'Hij is jaloers op zijn broer.',      'He is jealous of his brother.'),
    adj('trots',        'proud',                    'trotse',           'Ze is trots op haar resultaat.',     'She is proud of her result.',        'trots → trotse before noun'),
    adj('beschaamd',    'ashamed / embarrassed',    'beschaamde',       'Hij voelt zich beschaamd.',          'He feels ashamed.'),
    adj('zenuwachtig',  'nervous',                  'zenuwachtige',     'Ze is zenuwachtig voor het examen.', 'She is nervous before the exam.'),
    adj('hopeloos',     'hopeless',                 'hopeloze',         'De situatie is hopeloos.',           'The situation is hopeless.',         'hopeloos → hopeloze before noun'),
    adj('hoopvol',      'hopeful',                  'hoopvolle',        'Hij is hoopvol over de toekomst.',  'He is hopeful about the future.'),
    adj('dankbaar',     'grateful',                 'dankbare',         'Ze is dankbaar voor de hulp.',      'She is grateful for the help.'),
    adj('eenzaam',      'lonely',                   'eenzame',          'Hij voelt zich eenzaam.',            'He feels lonely.'),
  ]),

  aset('a2-adj-work-study', '💼', 'Work & Study', [
    adj('succesvol',    'successful',               'succesvolle',      'Ze heeft een succesvolle carrière.', 'She has a successful career.'),
    adj('ambitieus',    'ambitious',                'ambitieuze',       'Hij is erg ambitieus.',              'He is very ambitious.',              'ambitieus → ambitieuze before noun'),
    adj('verantwoordelijk', 'responsible',          'verantwoordelijke','Ze is verantwoordelijk voor het project.', 'She is responsible for the project.'),
    adj('creatief',     'creative',                 'creatieve',        'Hij is heel creatief.',              'He is very creative.'),
    adj('praktisch',    'practical',                'praktische',       'Ze is een praktisch persoon.',       'She is a practical person.'),
    adj('theoretisch',  'theoretical',              'theoretische',     'Het is een theoretisch probleem.',   'It is a theoretical problem.'),
    adj('ervaren',      'experienced',              null,               'Ze is een ervaren arts.',            'She is an experienced doctor.',      'ervaren never adds -e or comparative'),
    adj('onervaren',    'inexperienced',            null,               'Hij is nog onervaren.',              'He is still inexperienced.'),
    adj('bekwaam',      'capable / competent',      'bekwame',          'Ze is een bekwame manager.',         'She is a capable manager.'),
    adj('flexibel',     'flexible',                 'flexibele',        'Je moet flexibel zijn.',             'You have to be flexible.'),
  ]),

  aset('a2-adj-society-people', '🌍', 'Society & People', [
    adj('rijk',         'rich / wealthy',           'rijke',            'Hij is een rijke zakenman.',         'He is a wealthy businessman.'),
    adj('arm',          'poor',                     'arme',             'Ze komt uit een arm gezin.',         'She comes from a poor family.'),
    adj('populair',     'popular',                  'populaire',        'Ze is populair op school.',          'She is popular at school.'),
    adj('bekend',       'well-known / familiar',    'bekende',          'Hij is een bekende acteur.',         'He is a well-known actor.'),
    adj('onbekend',     'unknown / unfamiliar',     'onbekende',        'Het adres is mij onbekend.',         'The address is unknown to me.'),
    adj('openbaar',     'public',                   'openbare',         'Het is een openbaar park.',          'It is a public park.',               'openbaar never has a comparative'),
    adj('privé',        'private',                  null,               'Dit is een privé gesprek.',          'This is a private conversation.',    'privé never inflects'),
    adj('gelijk',       'equal / right',            'gelijke',          'We hebben gelijke rechten.',         'We have equal rights.',              'gelijk also means "right" (Je hebt gelijk)'),
    adj('vrij',         'free',                     'vrije',            'Vrijdag ben ik vrij.',               'I am free on Friday.',               'vrij = free (time) or free (cost)'),
    adj('verplicht',    'obligatory / required',    'verplichte',       'Het bijwonen is verplicht.',         'Attendance is obligatory.'),
  ]),

  aset('a2-adj-nature-environment', '🌿', 'Nature & Environment', [
    adj('natuurlijk',   'natural',                  'natuurlijke',      'Het is een natuurlijk product.',     'It is a natural product.',           'also used as filler: "naturally"'),
    adj('kunstmatig',   'artificial',               'kunstmatige',      'Het is een kunstmatige smaak.',     'It is an artificial flavour.'),
    adj('vuil',         'dirty / polluted',         'vuile',            'De rivier is vuil.',                 'The river is polluted.',             'vuil is stronger / more formal than vies'),
    adj('schoon',       'clean',                    'schone',           'De lucht is schoon hier.',           'The air is clean here.'),
    adj('stil',         'quiet / still',            'stille',           'Het bos is stil.',                   'The forest is quiet.',               'stil → stille before noun'),
    adj('lawaaierig',   'noisy / loud',             'lawaaierige',      'De straat is lawaaierig.',           'The street is noisy.'),
    adj('gevaarlijk',   'dangerous',                'gevaarlijke',      'De weg is gevaarlijk.',              'The road is dangerous.'),
    adj('veilig',       'safe',                     'veilige',          'Het is veilig hier.',                'It is safe here.'),
    adj('steil',        'steep',                    'steile',           'De berg is steil.',                  'The mountain is steep.'),
    adj('vlak',         'flat / level',             'vlakke',           'Het land is vlak.',                  'The land is flat.'),
  ]),

  aset('a2-adj-food-taste', '🍽️', 'Food & Taste', [
    adj('zoet',         'sweet',                    'zoete',            'De appel is zoet.',                  'The apple is sweet.'),
    adj('zuur',         'sour / acidic',            'zure',             'De citroen is zuur.',                'The lemon is sour.',                 'zuur → zure before noun'),
    adj('bitter',       'bitter',                   'bittere',          'De koffie is bitter.',               'The coffee is bitter.'),
    adj('zout',         'salty',                    'zoute',            'De soep is te zout.',                'The soup is too salty.'),
    adj('pittig',       'spicy / hot',              'pittige',          'Het eten is pittig.',                'The food is spicy.',                 'also: pittig = sharp / tough'),
    adj('mild',         'mild',                     'milde',            'De saus is mild.',                   'The sauce is mild.'),
    adj('vet',          'fatty / greasy',           'vette',            'Dit vlees is erg vet.',              'This meat is very fatty.'),
    adj('mager',        'lean / low-fat',           'magere',           'Ik koop magere yoghurt.',            'I buy low-fat yoghurt.',             'mager for people = skinny (use carefully)'),
    adj('rijp',         'ripe',                     'rijpe',            'De mango is rijp.',                  'The mango is ripe.'),
    adj('rauw',         'raw / uncooked',           'rauwe',            'Ik eet geen rauw vlees.',            'I do not eat raw meat.'),
  ]),

  aset('a2-adj-housing-space', '🏠', 'Housing & Space', [
    adj('comfortabel',    'comfortable',            'comfortabele',     'De bank is comfortabel.',            'The sofa is comfortable.'),
    adj('oncomfortabel',  'uncomfortable',          'oncomfortabele',   'Het bed is oncomfortabel.',          'The bed is uncomfortable.'),
    adj('gezellig',       'cosy / pleasant / sociable', 'gezellige',    'Het café is gezellig.',             'The café is cosy.',                  'gezellig is a key Dutch cultural concept'),
    adj('ongezellig',     'unpleasant / unwelcoming',   'ongezellige',  'De kamer voelt ongezellig.',        'The room feels unwelcoming.'),
    adj('ruim',           'spacious',               'ruime',            'Het appartement is ruim.',           'The apartment is spacious.'),
    adj('krap',           'cramped / tight',        'krappe',           'De keuken is krap.',                 'The kitchen is cramped.',            'krap also means tight (budget, time)'),
    adj('licht',          'light / bright',         'lichte',           'De kamer is licht.',                 'The room is bright.'),
    adj('donker',         'dark',                   'donkere',          'De gang is donker.',                 'The hallway is dark.'),
    adj('leeg',           'empty',                  'lege',             'De kamer staat nog leeg.',           'The room is still empty.'),
    adj('ingericht',      'furnished',              'ingerichte',       'Het appartement is ingericht.',      'The apartment is furnished.',        'past participle used as adjective'),
  ]),

  aset('a2-adj-travel-transport', '✈️', 'Travel & Transport', [
    adj('ver',            'far',                    'verre',            'De bestemming is ver.',              'The destination is far.'),
    adj('bereikbaar',     'accessible / reachable', 'bereikbare',       'Het centrum is goed bereikbaar.',    'The centre is easily accessible.'),
    adj('onbereikbaar',   'unreachable / inaccessible', 'onbereikbare', 'Het gebied is onbereikbaar.',       'The area is inaccessible.'),
    adj('rechtstreeks',   'direct (no stop)',        'rechtstreekse',    'Er is een rechtstreekse vlucht.',   'There is a direct flight.',          'rechtstreeks never has a comparative'),
    adj('vertraagd',      'delayed',                'vertraagde',       'De trein is vertraagd.',             'The train is delayed.'),
    adj('op tijd',        'on time',                null,               'De bus is op tijd.',                 'The bus is on time.',                'op tijd: two words, does not inflect'),
    adj('internationaal', 'international',          'internationale',   'Het is een internationale vlucht.',  'It is an international flight.'),
    adj('lokaal',         'local',                  'lokale',           'Ik neem het lokale busje.',          'I take the local bus.'),
    adj('druk',           'busy / crowded',         'drukke',           'Het vliegveld is druk.',             'The airport is busy.'),
    adj('rustig',         'quiet / calm',           'rustige',          'Het treinstation is rustig.',        'The train station is quiet.'),
  ]),

  aset('a2-adj-opinions-evaluation', '💬', 'Opinions & Evaluation', [
    adj('interessant',    'interesting',            'interessante',     'Het boek is interessant.',           'The book is interesting.'),
    adj('saai',           'boring / dull',          'saaie',            'De film is saai.',                   'The film is boring.'),
    adj('nuttig',         'useful',                 'nuttige',          'Dat is nuttige informatie.',         'That is useful information.'),
    adj('nutteloos',      'useless',                'nutteloze',        'Deze app is nutteloos.',             'This app is useless.',               'nutteloos → nutteloze before noun'),
    adj('belangrijk',     'important',              'belangrijke',      'Dit is een belangrijke vraag.',      'This is an important question.'),
    adj('onbelangrijk',   'unimportant',            'onbelangrijke',    'Het detail is onbelangrijk.',        'The detail is unimportant.'),
    adj('duidelijk',      'clear / obvious',        'duidelijke',       'De uitleg is duidelijk.',            'The explanation is clear.'),
    adj('onduidelijk',    'unclear',                'onduidelijke',     'De instructies zijn onduidelijk.',   'The instructions are unclear.'),
    adj('bijzonder',      'special / extraordinary','bijzondere',       'Dit is een bijzonder moment.',       'This is a special moment.'),
    adj('gewoon',         'ordinary / normal / just','gewone',          'Het is een gewoon huis.',            'It is an ordinary house.',           'gewoon also means "just" (Ik doe het gewoon)'),
  ]),

];
