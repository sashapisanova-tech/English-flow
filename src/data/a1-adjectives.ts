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
  return { id, emoji, title, category: 'adjectives', level: 'A1', folder: 'Adjectives', words };
}

export const a1AdjectiveSets: FlashcardSet[] = [

  aset('a1-adj-size', '📐', 'Size & Quantity', [
    adj('groot',  'big / large',    'grote',   'Amsterdam is een grote stad.',  'Amsterdam is a big city.',    'groot → grote before a noun'),
    adj('klein',  'small / little', 'kleine',  'Mijn kamer is klein.',          'My room is small.'),
    adj('lang',   'long / tall',    'lange',   'Hij is heel lang.',             'He is very tall.',            'lang = tall for people, long for objects'),
    adj('kort',   'short',          'korte',   'De les is kort.',               'The lesson is short.'),
    adj('breed',  'wide / broad',   'brede',   'De weg is breed.',              'The road is wide.'),
    adj('smal',   'narrow',         'smalle',  'De straat is smal.',            'The street is narrow.'),
    adj('hoog',   'high / tall',    'hoge',    'De boom is hoog.',              'The tree is tall.'),
    adj('laag',   'low',            'lage',    'De prijs is laag.',             'The price is low.'),
    adj('dik',    'thick / fat',    'dikke',   'De muur is dik.',               'The wall is thick.',          'dik for people = fat; use carefully'),
    adj('dun',    'thin / slim',    'dunne',   'Het papier is dun.',            'The paper is thin.'),
  ]),

  aset('a1-adj-weather', '🌡️', 'Temperature & Weather', [
    adj('warm',    'warm / hot',     'warme',    'Het is warm buiten.',       'It is warm outside.'),
    adj('koud',    'cold',           'koude',    'Mijn handen zijn koud.',    'My hands are cold.'),
    adj('heet',    'very hot',       'hete',     'De soep is heet.',          'The soup is very hot.',       'heet = hotter than warm'),
    adj('fris',    'fresh / cool',   'frisse',   'Het is fris buiten.',       'It is cool outside.'),
    adj('nat',     'wet',            'natte',    'Mijn jas is nat.',          'My coat is wet.'),
    adj('droog',   'dry',            'droge',    'Het weer is droog.',        'The weather is dry.'),
    adj('zonnig',  'sunny',          'zonnige',  'Het is zonnig vandaag.',    'It is sunny today.'),
    adj('bewolkt', 'cloudy',         'bewolkte', 'Het is bewolkt.',           'It is cloudy.',               'No comparative commonly used'),
    adj('mistig',  'foggy',          'mistige',  'Het is mistig.',            'It is foggy.'),
    adj('helder',  'clear / bright', 'heldere',  'De lucht is helder.',       'The sky is clear.'),
  ]),

  aset('a1-adj-appearance', '✨', 'Appearance & Beauty', [
    adj('mooi',       'beautiful / nice',  'mooie',      'Ze heeft een mooi huis.',    'She has a beautiful house.'),
    adj('lelijk',     'ugly',              'lelijke',    'Het gebouw is lelijk.',      'The building is ugly.'),
    adj('schoon',     'clean / beautiful', 'schone',     'De kamer is schoon.',        'The room is clean.',        'schoon = clean in everyday use'),
    adj('vies',       'dirty / gross',     'vieze',      'Mijn handen zijn vies.',     'My hands are dirty.'),
    adj('netjes',     'neat / tidy',       'nette',      'Je kamer is netjes.',        'Your room is neat.'),
    adj('rommelig',   'messy',             'rommelige',  'Mijn bureau is rommelig.',   'My desk is messy.'),
    adj('nieuw',      'new',               'nieuwe',     'Ik heb een nieuwe fiets.',   'I have a new bicycle.'),
    adj('oud',        'old',               'oude',       'Het huis is oud.',           'The house is old.',         'oud for people = elderly (polite)'),
    adj('jong',       'young',             'jonge',      'Ze is jong.',                'She is young.'),
    adj('vers',       'fresh',             'verse',      'Het brood is vers.',         'The bread is fresh.'),
  ]),

  aset('a1-adj-feelings', '😊', 'Feelings & Emotions', [
    adj('blij',        'happy / glad',       'blije',        'Ik ben blij.',           'I am happy.'),
    adj('verdrietig',  'sad',                'verdrietige',  'Ze is verdrietig.',      'She is sad.'),
    adj('boos',        'angry',              'boze',         'Hij is boos.',           'He is angry.',        'boos → boze before noun'),
    adj('bang',        'scared / afraid',    'bange',        'Ik ben bang.',           'I am scared.'),
    adj('moe',         'tired',              null,           'Ik ben heel moe.',       'I am very tired.',    'moe does not add -e before noun'),
    adj('uitgerust',   'rested',             'uitgeruste',   'Ik ben uitgerust.',      'I am well-rested.'),
    adj('tevreden',    'satisfied / content',null,           'Ze is tevreden.',        'She is satisfied.',   'tevreden never adds -e'),
    adj('ongerust',    'worried',            'ongeruste',    'Hij is ongerust.',       'He is worried.'),
    adj('opgewonden',  'excited',            null,           'Ze is opgewonden.',      'She is excited.'),
    adj('rustig',      'calm / quiet',       'rustige',      'De kamer is rustig.',    'The room is quiet.'),
  ]),

  aset('a1-adj-character', '🧠', 'Character & Personality', [
    adj('aardig',       'kind / nice',      'aardige',        'Ze is heel aardig.',              'She is very kind.'),
    adj('vriendelijk',  'friendly',         'vriendelijke',   'De leraar is vriendelijk.',       'The teacher is friendly.'),
    adj('grappig',      'funny',            'grappige',       'Hij is grappig.',                 'He is funny.'),
    adj('serieus',      'serious',          'serieuze',       'Ze is serieus.',                  'She is serious.'),
    adj('slim',         'clever / smart',   'slimme',         'Hij is slim.',                    'He is clever.'),
    adj('dom',          'stupid / dumb',    'domme',          'Dat is een domme vraag.',         'That is a stupid question.', 'use carefully — can be rude'),
    adj('lui',          'lazy',             'luie',           'Hij is lui.',                     'He is lazy.'),
    adj('hardwerkend',  'hardworking',      'hardwerkende',   'Ze is hardwerkend.',              'She is hardworking.'),
    adj('eerlijk',      'honest',           'eerlijke',       'Hij is eerlijk.',                 'He is honest.'),
    adj('lief',         'sweet / dear',     'lieve',          'Wat een lief kind.',              'What a sweet child.'),
  ]),

  aset('a1-adj-quality', '⭐', 'Quality & Condition', [
    adj('goed',        'good',              'goede',       'Het weer is goed.',             'The weather is good.',        'irregular: goed → beter → best'),
    adj('slecht',      'bad',               'slechte',     'Het is slecht weer.',           'It is bad weather.'),
    adj('lekker',      'tasty / nice',      'lekkere',     'De soep is lekker.',            'The soup is tasty.',          'lekker has many uses: nice, good, tasty'),
    adj('heerlijk',    'delicious / wonderful','heerlijke','Het eten is heerlijk.',         'The food is delicious.'),
    adj('vreselijk',   'terrible',          'vreselijke',  'Het weer is vreselijk.',        'The weather is terrible.'),
    adj('geweldig',    'great / fantastic', 'geweldige',   'Het concert was geweldig.',     'The concert was fantastic.'),
    adj('prima',       'fine / great',      null,          'Dat is prima.',                 'That is fine.',               'prima never inflects'),
    adj('kapot',       'broken',            'kapotte',     'Mijn fiets is kapot.',          'My bike is broken.'),
    adj('heel',        'whole / intact',    'hele',        'De taart is nog heel.',         'The cake is still whole.',    'hele before noun'),
    adj('perfect',     'perfect',           'perfecte',    'Het is perfect.',               'It is perfect.'),
  ]),

  aset('a1-adj-speed', '⚡', 'Speed & Difficulty', [
    adj('snel',       'fast / quick',      'snelle',      'De trein is snel.',          'The train is fast.'),
    adj('langzaam',   'slow',              'langzame',    'Loop niet zo langzaam.',     'Do not walk so slowly.'),
    adj('makkelijk',  'easy',              'makkelijke',  'Dit is makkelijk.',          'This is easy.'),
    adj('moeilijk',   'difficult / hard',  'moeilijke',   'De toets is moeilijk.',      'The test is difficult.'),
    adj('zwaar',      'heavy / difficult', 'zware',       'De tas is zwaar.',           'The bag is heavy.',           'zwaar = heavy (weight) or hard (effort)'),
    adj('licht',      'light / easy',      'lichte',      'De tas is licht.',           'The bag is light.',           'licht = light in weight or brightness'),
    adj('druk',       'busy / crowded',    'drukke',      'Het centrum is druk.',       'The city centre is busy.'),
    adj('leeg',       'empty',             'lege',        'De fles is leeg.',           'The bottle is empty.'),
    adj('vol',        'full',              'volle',       'De trein is vol.',           'The train is full.'),
    adj('genoeg',     'enough',            null,          'Dat is genoeg.',             'That is enough.',             'genoeg never inflects'),
  ]),

  aset('a1-adj-distance', '📍', 'Distance & Position', [
    adj('ver',          'far',             'verre',   'Het station is ver.',                   'The station is far.'),
    adj('dichtbij',     'nearby / close',  null,      'De supermarkt is dichtbij.',            'The supermarket is nearby.'),
    adj('links',        'left',            null,      'Ga links.',                             'Go left.',                'links/rechts do not inflect'),
    adj('rechts',       'right',           null,      'Het kantoor is rechts.',                'The office is on the right.'),
    adj('recht',        'straight',        'rechte',  'Loop rechtdoor.',                       'Walk straight ahead.'),
    adj('open',         'open',            null,      'De winkel is open.',                    'The shop is open.',       'open never inflects'),
    adj('dicht',        'closed / shut',   'dichte',  'De deur is dicht.',                     'The door is closed.',     'dicht = closed, also = dense'),
    adj('binnen',       'inside',          null,      'Kom binnen.',                           'Come inside.',            'used as adverb too'),
    adj('buiten',       'outside',         null,      'De kinderen spelen buiten.',            'The children play outside.'),
    adj('midden',       'middle',          'middelste','Sta in het midden.',                   'Stand in the middle.'),
  ]),

  aset('a1-adj-time', '🕐', 'Age & Time', [
    adj('vroeg',         'early',       'vroege',       'Ik sta vroeg op.',              'I get up early.'),
    adj('laat',          'late',        'late',         'Je bent laat.',                 'You are late.'),
    adj('klaar',         'ready / finished', 'klare',   'Ben je klaar?',                'Are you ready?'),
    adj('bezig',         'busy / occupied',  'bezige',  'Ik ben bezig.',                'I am busy.'),
    adj('recent',        'recent',      'recente',      'Dit is recent nieuws.',         'This is recent news.'),
    adj('modern',        'modern',      'moderne',      'Het is een modern gebouw.',     'It is a modern building.'),
    adj('traditioneel',  'traditional', 'traditionele', 'Het is een traditioneel recept.', 'It is a traditional recipe.'),
    adj('dagelijks',     'daily',       'dagelijkse',   'Mijn dagelijkse routine.',      'My daily routine.',  'dagelijks never changes form'),
    adj('tijdelijk',     'temporary',   'tijdelijke',   'Dit is tijdelijk.',             'This is temporary.'),
    adj('permanent',     'permanent',   'permanente',   'De baan is permanent.',         'The job is permanent.'),
  ]),

  aset('a1-adj-colors', '🎨', 'Colors', [
    adj('rood',    'red',     'rode',   'Een rode appel.',       'A red apple.'),
    adj('blauw',   'blue',    'blauwe', 'Hij heeft blauwe ogen.','He has blue eyes.'),
    adj('groen',   'green',   'groene', 'Het gras is groen.',    'The grass is green.'),
    adj('geel',    'yellow',  'gele',   'Een gele jas.',         'A yellow coat.'),
    adj('oranje',  'orange',  null,     'Een oranje fiets.',     'An orange bicycle.',  'oranje never changes form'),
    adj('paars',   'purple',  'paarse', 'Ze draagt een paarse jurk.','She wears a purple dress.'),
    adj('roze',    'pink',    null,     'Een roze bloem.',       'A pink flower.',      'roze never changes form'),
    adj('zwart',   'black',   'zwarte', 'Een zwarte kat.',       'A black cat.'),
    adj('wit',     'white',   'witte',  'Een wit hemd.',         'A white shirt.'),
    adj('grijs',   'grey',    'grijze', 'Een grijs gebouw.',     'A grey building.'),
  ]),

];
