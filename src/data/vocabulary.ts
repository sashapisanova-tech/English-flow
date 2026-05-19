// Curated A1 keyword vocabulary per text (from dutch_a1_vocabulary.pdf).
// Keys must be exact lowercase token forms as they appear in the text content —
// the tokenizer matches word-by-word, so "kookt" ≠ "koken".

export type KeywordMap = Record<string, string>;

export const textKeywords: Record<string, KeywordMap> = {
  // ===== MODULE 1 — Daily Survival =====
  // Text 1: Mijn ochtend
  'm1-1': {
    heet: 'am called (my name is)', woon: 'I live', appartement: 'apartment', verdieping: 'floor / storey',
    ochtend: 'morning', keuken: 'kitchen', koffie: 'coffee',
    boterham: 'slice of bread', kaas: 'cheese', tas: 'bag',
    telefoon: 'phone', jas: 'coat', buiten: 'outside',
    koud: 'cold', tramhalte: 'tram stop',
  },
  // Text 2: Tom fietst naar zijn werk
  'm1-2': {
    heet: 'am called (my name is)', drink: 'I drink', thee: 'tea', yoghurt: 'yoghurt', fruit: 'fruit',
    poets: 'I brush', tanden: 'teeth', gezicht: 'face', klok: 'clock',
    fiets: 'bicycle', werk: 'work', straat: 'street',
    rustig: 'calm / quiet', mooie: 'beautiful / nice',
  },
  // Text 3: Bij de tramhalte
  'm1-3': {
    tramhalte: 'tram stop', staat: 'stands', zegt: 'says',
    goedemorgen: 'good morning', deuren: 'doors',
    stappen: 'step / board', zitten: 'to sit', naast: 'next to',
    rijdt: 'rides / drives', stad: 'city',
  },
  // Text 4: In de supermarkt
  'm1-4': {
    supermarkt: 'supermarket', mandje: 'basket', koopt: 'buys',
    melk: 'milk', brood: 'bread', appels: 'apples',
    tomaten: 'tomatoes', kassa: 'checkout / till',
    wacht: 'waits', betaalt: 'pays', kaart: 'card',
  },
  // Text 5: Tom kookt soep
  'm1-5': {
    kookt: 'cooks', soep: 'soup', snijdt: 'cuts / chops',
    ui: 'onion', wortel: 'carrot', pan: 'pot / pan',
    vuur: 'heat / fire', groenten: 'vegetables',
    wacht: 'waits', ruikt: 'smells', borden: 'plates',
    tafel: 'table', bezoek: 'visit',
  },
  // Text 6: Een rustige zaterdag
  'm1-6': {
    wakker: 'awake', schijnt: 'shines', voelt: 'feels',
    thee: 'tea', bank: 'sofa / couch', leest: 'reads',
    boek: 'book', schoon: 'clean', veegt: 'sweeps',
    vloer: 'floor', bloemen: 'flowers', belt: 'calls',
    ontspannen: 'relaxed',
  },
  // Text 7: Tom in het park
  'm1-7': {
    park: 'park', water: 'water', eenden: 'ducks',
    honden: 'dogs', bank: 'bench', boek: 'book',
    lucht: 'sky / air', wind: 'wind', zacht: 'soft / gentle',
    vriend: 'friend', café: 'café', drinken: 'to drink',
    fijne: 'nice / pleasant',
  },
  // Text 8: Een drukke dag
  'm1-8': {
    drukke: 'busy', snel: 'quickly / fast', boterham: 'slice of bread',
    buiten: 'outside', regent: 'rains', paraplu: 'umbrella',
    tramhalte: 'tram stop', vol: 'full / crowded', deur: 'door',
    moe: 'tired', thuis: 'at home', warme: 'warm',
    film: 'film / movie', grappig: 'funny', beter: 'better',
  },
  // Text 9: Koffie en taart
  'm1-9': {
    café: 'café', gezellig: 'cozy / convivial', bestellen: 'to order',
    taart: 'cake', lekker: 'tasty / nice', kiest: 'chooses',
    chocoladetaart: 'chocolate cake', appeltaart: 'apple cake',
    praten: 'to talk', week: 'week', muziek: 'music',
    warm: 'warm', binnen: 'inside', plek: 'place / spot',
    glimlacht: 'smiles',
  },
  // Text 10: Goedenacht
  'm1-10': {
    avond: 'evening', bed: 'bed', tanden: 'teeth',
    wekker: 'alarm clock', vroeg: 'early', denkt: 'thinks',
    kamer: 'room', stil: 'quiet / silent', licht: 'light',
    ogen: 'eyes', ademt: 'breathes',
  },

  // ===== MODULE 2 — Social Life =====
  // Text 11: Een bericht van Lisa
  'm2-1': {
    bericht: 'message', vriendin: 'female friend', tijd: 'time',
    glimlacht: 'smiles', stopt: 'stops',
    denkt: 'thinks', morgen: 'tomorrow', telefoon: 'phone', blij: 'happy',
  },
  // Text 12: Samen in het café
  'm2-2': {
    knuffel: 'hug', bestellen: 'to order', gemist: 'missed',
    vertelt: 'tells / shares', voorbij: 'past / by',
    gezellig: 'cozy / convivial', vaker: 'more often',
    absoluut: 'absolutely', betalen: 'to pay',
    winkel: 'shop / store', warm: 'warm',
  },
  // Text 13: Een verjaardag
  'm2-3': {
    verjaardag: 'birthday', feest: 'party', muziek: 'music',
    snacks: 'snacks', drank: 'drinks', cadeau: 'gift',
    reis: 'trip / journey', taart: 'cake',
    gemak: 'ease / comfort', avond: 'evening',
  },
  // Text 14: De bioscoop
  'm2-4': {
    bioscoop: 'cinema', ingang: 'entrance', kaartjes: 'tickets',
    zaal: 'hall / auditorium', donker: 'dark', verhaal: 'story',
    spannend: 'exciting / thrilling', aandachtig: 'attentively',
    einde: 'ending', verdrietig: 'sad', verlicht: 'lit up',
  },
  // Text 15: Lisa op bezoek
  'm2-5': {
    bezoek: 'visit', bloemen: 'flowers', vaas: 'vase',
    lunch: 'lunch', snijden: 'to cut', druk: 'busy',
    thee: 'tea', bank: 'sofa', herinneringen: 'memories',
    lachen: 'to laugh', glimlacht: 'smiles',
  },
  // Text 16: Een wandeling met Peter
  'm2-6': {
    buurman: 'male neighbour', wandelen: 'to walk',
    fris: 'fresh / cool', zonnig: 'sunny', buurt: 'neighbourhood',
    kent: 'knows', luistert: 'listens', vogels: 'birds',
    kiosk: 'kiosk / small stand', kennen: 'to know',
  },
  // Text 17: De sportclub
  'm2-7': {
    sportclub: 'sports club', zaal: 'hall / room',
    trainer: 'trainer / coach', welkom: 'welcome',
    oefeningen: 'exercises', makkelijk: 'easy',
    training: 'training / workout', donker: 'dark',
    blij: 'happy',
  },
  // Text 18: Een klein diner
  'm2-8': {
    organiseren: 'to organise', pasta: 'pasta',
    salade: 'salad', gasten: 'guests', wijn: 'wine',
    sfeer: 'atmosphere / vibe', gezellig: 'cozy / convivial',
    laat: 'late', grappig: 'funny',
  },
  // Text 19: Lisa heeft het moeilijk
  'm2-9': {
    belt: 'calls (phone)', klinkt: 'sounds', zwaar: 'heavy / tough',
    luistert: 'listens', moeilijk: 'difficult',
    langs: 'by / over (come by)', lief: 'sweet / kind',
    stuurt: 'sends', gesprek: 'conversation',
  },
  // Text 20: Op het terras
  'm2-10': {
    terras: 'outdoor terrace', limonade: 'lemonade / soft drink',
    muzikant: 'musician', gitaar: 'guitar', vrolijk: 'cheerful / upbeat',
    foto: 'photo', stuurt: 'sends', zomer: 'summer',
    strand: 'beach', schijnt: 'shines',
  },

  // ===== MODULE 3 — City & Movement =====
  // Text 21: Met de tram naar het centrum
  'm3-1': {
    centrum: 'city centre', tramhalte: 'tram stop',
    raam: 'window', winkels: 'shops',
    haltes: 'stops', plein: 'square / plaza',
    levendig: 'lively / vibrant', glimlacht: 'smiles',
    even: 'a moment / just', verder: 'further / on',
  },
  // Text 22: Tom fietst naar het park
  'm3-2': {
    rijdt: 'rides / drives', stopt: 'stops',
    rood: 'red', licht: 'light', wacht: 'waits', groen: 'green',
    passeert: 'passes', brug: 'bridge', boom: 'tree',
    ademt: 'breathes', frisse: 'fresh',
  },
  // Text 23: Winkelen met Lisa
  'm3-3': {
    winkels: 'shops', schoenen: 'shoes', duur: 'expensive',
    passen: 'to try on / to fit', koopt: 'buys',
    ijsje: 'ice cream', kiest: 'chooses', vanille: 'vanilla',
    aardbei: 'strawberry', gracht: 'canal', gezellig: 'pleasant / cozy',
  },
  // Text 24: Met de metro
  'm3-4': {
    metro: 'metro / subway', metrostation: 'metro station',
    kaartje: 'ticket', vol: 'crowded / full', bericht: 'message',
    onderweg: 'on the way', halte: 'stop', smalle: 'narrow', adres: 'address',
  },
  // Text 25: Op de markt
  'm3-5': {
    markt: 'market', druk: 'busy', kraampjes: 'market stalls',
    groenten: 'vegetables', fruit: 'fruit', bloemen: 'flowers',
    vers: 'fresh', brood: 'bread', ruikt: 'smells',
    smaakt: 'tastes', favoriete: 'favourite', langzaam: 'slowly',
    stukje: 'little piece',
  },
  // Text 26: Lisa komt met de trein
  'm3-6': {
    trein: 'train', raam: 'window', weiden: 'meadows / fields',
    dorpen: 'villages', station: 'station', uitgang: 'exit',
    zwaait: 'waves', knuffel: 'hug', welkom: 'welcome',
    bus: 'bus', nieuwsgierig: 'curious',
  },
  // Text 27: Een nieuwe route
  'm3-7': {
    route: 'route', proberen: 'to try', kanaal: 'canal',
    stil: 'still / quiet', grijs: 'grey', langzaam: 'slowly',
    lucht: 'sky / air', oranje: 'orange', energiek: 'energetic',
    brug: 'bridge', mooier: 'more beautiful', eenden: 'ducks',
  },
  // Text 28: De weg vragen
  'm3-8': {
    wijk: 'neighbourhood / district', straten: 'streets',
    internet: 'internet', pardon: 'excuse me',
    rechtdoor: 'straight ahead', links: 'left',
    bedankt: 'thanks', linksaf: 'to the left',
    gebouw: 'building', opgelucht: 'relieved',
  },
  // Text 29: Door het centrum
  'm3-9': {
    wandelen: 'to walk / stroll', grachten: 'canals',
    huizen: 'houses', plein: 'square', terras: 'outdoor terrace',
    bestellen: 'to order', ober: 'waiter', kopjes: 'cups',
    boten: 'boats', foto: 'photo', genieten: 'to enjoy',
  },
  // Text 30: Naar het concert
  'm3-10': {
    concert: 'concert', gebouw: 'building', vol: 'crowded',
    deur: 'door', borden: 'signs', plaatsen: 'seats',
    licht: 'light', muziek: 'music',
    kippenvel: 'goosebumps', prachtig: 'beautiful / magnificent',
    volgen: 'to follow',
  },

  // ===== MODULE 4 — Work & Study =====
  // Text 31: Op kantoor
  'm4-1': {
    kantoor: 'office', bureau: 'desk', laptop: 'laptop',
    notitieboek: 'notebook', berichten: 'messages',
    manager: 'manager', rapport: 'report',
    typt: 'types', notities: 'notes', collega: 'colleague',
  },
  // Text 32: In de bibliotheek
  'm4-2': {
    bibliotheek: 'library', stil: 'quiet / silent', tafel: 'table',
    aantekeningen: 'notes', student: 'student', rustig: 'quietly / calmly',
    moe: 'tired', buiten: 'outside', frisse: 'fresh',
    broodje: 'bread roll / sandwich', bakker: 'baker / bakery',
  },
  // Text 33: De vergadering
  'm4-3': {
    vergadering: 'meeting', team: 'team', ruimte: 'room / space',
    project: 'project', luistert: 'listens',
    vraag: 'question', antwoordt: 'answers', idee: 'idea',
    knikken: 'to nod', gemotiveerd: 'motivated', taak: 'task',
  },
  // Text 34: Een online les
  'm4-4': {
    docent: 'teacher / lecturer', geschiedenis: 'history',
    aantekeningen: 'notes', pauzeert: 'pauses',
    samenvatting: 'summary', stuurt: 'sends',
    sluit: 'closes', bank: 'sofa', tevreden: 'satisfied',
  },
  // Text 35: Een presentatie voorbereiden
  'm4-5': {
    presentatie: 'presentation', informatie: 'information',
    documenten: 'documents', verzamelt: 'collects / gathers', oefent: 'practises',
    hardop: 'out loud', duidelijk: 'clear / clearly',
    helpt: 'helps', kleuren: 'colours', klaar: 'ready',
  },
  // Text 36: In de boekwinkel
  'm4-6': {
    boekwinkel: 'bookshop', parttime: 'part-time',
    opent: 'opens', lichten: 'lights', planken: 'shelves',
    klant: 'customer / client', roman: 'novel', ordent: 'arranges / sorts',
    wijst: 'points to / directs', sectie: 'section', aankoop: 'purchase',
    kassa: 'checkout', sluit: 'closes',
  },
  // Text 37: De avondcursus
  'm4-7': {
    avondcursus: 'evening course', klas: 'class / classroom',
    bord: 'board / blackboard', woorden: 'words',
    oefenen: 'to practise', zinnen: 'sentences',
    gesprek: 'conversation', dagelijkse: 'daily', buurvrouw: 'female neighbour / classmate',
    fout: 'mistake', vriendelijk: 'friendly / kindly', trots: 'proud',
  },
  // Text 38: Een groepsproject
  'm4-8': {
    project: 'project', ontmoeten: 'to meet',
    bibliotheek: 'library', verdelen: 'to divide / distribute',
    inleiding: 'introduction', informatie: 'information',
    conclusie: 'conclusion', helpen: 'to help',
    sturen: 'to send', opgelucht: 'relieved', trots: 'proud',
  },
  // Text 39: Feedback krijgen
  'm4-9': {
    feedback: 'feedback', uitleg: 'explanation',
    duidelijk: 'clear', tip: 'tip', nerveus: 'nervous',
    opnieuw: 'again', ademt: 'breathes',
    klaar: 'ready', beter: 'better',
  },
  // Text 40: Werken in het café
  'm4-10': {
    verslag: 'report / essay', artikelen: 'articles', allebei: 'both',
    studie: 'study', idee: 'idea', sluiten: 'to close',
    bestellen: 'to order', weekend: 'weekend',
    moe: 'tired', tevreden: 'satisfied / content',
  },

  // ===== MODULE 5 — Personal Development =====
  // Text 41: Gezonder leven
  'm5-1': {
    gezonder: 'healthier', vroeger: 'earlier', glas: 'glass',
    oefeningen: 'exercises', woonkamer: 'living room',
    strekt: 'stretches', armen: 'arms', benen: 'legs',
    achtergrond: 'background', wakker: 'awake',
    energiek: 'energetic', yoghurt: 'yoghurt',
  },
  // Text 42: Drie goede dingen
  'm5-2': {
    gewoonte: 'habit', notitieboek: 'notebook',
    pen: 'pen', stil: 'quiet / still',
    rustig: 'calm', sluit: 'closes', slaapt: 'sleeps',
  },
  // Text 43: Een weekplanning
  'm5-3': {
    afspraken: 'appointments / plans', gebruikt: 'uses', blauw: 'blue',
    vrije: 'free', belangrijkste: 'most important',
    afrondt: 'finishes / completes', vinkje: 'tick / checkmark', helder: 'clear',
  },
  // Text 44: Fotografie
  'm5-4': {
    fotografie: 'photography', eenvoudige: 'simple',
    knielt: 'kneels', hoek: 'angle / corner',
    bekijkt: 'looks at / views', sommige: 'some',
  },
  // Text 45: Samen joggen
  'm5-5': {
    bewegen: 'to move / exercise', joggen: 'to jog',
    langzaam: 'slowly', lachen: 'to laugh', adem: 'breath',
    zwaarder: 'heavier / harder', stoppen: 'to stop',
    bank: 'bench', zwaar: 'tough / heavy', trots: 'proud',
  },
  // Text 46: Een nieuw recept
  'm5-6': {
    recept: 'recipe', groenten: 'vegetables', rijst: 'rice',
    kruiden: 'herbs / spices', stappen: 'steps',
    snijdt: 'cuts / chops', kookt: 'cooks / boils',
    mengt: 'mixes', ruikt: 'smells', proeft: 'tastes',
    heerlijk: 'delicious', trots: 'proud',
  },
  // Text 47: Rustiger worden
  'm5-7': {
    rustiger: 'calmer / quieter', telefoon: 'phone',
    dimt: 'dims', licht: 'light', bank: 'sofa',
    ademt: 'breathes', langzaam: 'slowly', stil: 'quiet',
    boek: 'book', normaal: 'normal',
  },
  // Text 48: Grote dromen
  'm5-8': {
    toekomst: 'future', reizen: 'to travel', taal: 'language',
    leren: 'to learn', papier: 'paper', motivatie: 'motivation',
    spaart: 'saves (money)', cursus: 'course',
    boekt: 'books', reis: 'trip / journey', dromen: 'dreams',
  },
  // Text 49: Lisa schildert
  'm5-9': {
    verf: 'paint', papier: 'paper', schilderen: 'to paint',
    kleuren: 'colours', resultaat: 'result',
    eenvoudig: 'simple', vrolijk: 'cheerful',
    foto: 'photo', talent: 'talent', geïnspireerd: 'inspired',
  },
  // Text 50: Onder de sterren
  'm5-10': {
    balkon: 'balcony', sterren: 'stars', lucht: 'sky / air',
    donker: 'dark', afgelopen: 'past', geleerd: 'learned',
    moeilijk: 'difficult', momenten: 'moments',
    vrienden: 'friends', plekken: 'places', gewoonten: 'habits',
  },
};

export function getKeywordsForText(textId: string): KeywordMap {
  return textKeywords[textId] || {};
}

// ─── Separable Verbs ────────────────────────────────────────────────────────
// Maps the conjugated VERB STEM token (as it appears in the text) to the
// full separable verb. Only the stem is highlighted; the separated prefix
// stays in its natural position. Clicking reveals the full infinitive.

export interface SeparableVerbEntry {
  infinitive: string;  // full form: "opstaan"
  english: string;     // "to get up"
  prefix: string;      // separated prefix: "op"
}

export const textSeparableVerbs: Record<string, Record<string, SeparableVerbEntry>> = {
  // Module 1
  'm1-1': {
    'sta':    { infinitive: 'opstaan',  english: 'to get up',         prefix: 'op'  },
    'doe':    { infinitive: 'aandoen',  english: 'to put on',          prefix: 'aan' },
  },
  'm1-3': {
    'stappen': { infinitive: 'instappen', english: 'to board / get on', prefix: 'in'  },
    'komt':    { infinitive: 'aankomen',  english: 'to arrive',          prefix: 'aan' },
    'gaan':    { infinitive: 'opengaan',  english: 'to open',            prefix: 'open'},
  },
  'm1-8': {
    'staat': { infinitive: 'opstaan',  english: 'to get up',          prefix: 'op'  },
    'doet':  { infinitive: 'uitdoen',  english: 'to take off',         prefix: 'uit' },
  },
  'm1-10': {
    'gaat':  { infinitive: 'uitgaan',      english: '(light) goes out', prefix: 'uit'     },
    'rijdt': { infinitive: 'voorbijrijden', english: 'to drive past',    prefix: 'voorbij' },
  },
  // Module 2
  'm2-1': {
    'stapt': { infinitive: 'uitstappen', english: 'to get off', prefix: 'uit' },
  },
  'm2-5': {
    'brengt': { infinitive: 'meebrengen', english: 'to bring along', prefix: 'mee' },
  },
  'm2-7': {
    'kom': { infinitive: 'terugkomen', english: 'to come back', prefix: 'terug' },
  },
  'm2-2': {
    'staat': { infinitive: 'opstaan', english: 'to get up', prefix: 'op' },
  },
  'm2-8': {
    'nodigen': { infinitive: 'uitnodigen', english: 'to invite', prefix: 'uit' },
    'brengt':  { infinitive: 'meebrengen', english: 'to bring along', prefix: 'mee' },
  },
  'm2-9': {
    'belt': { infinitive: 'opbellen', english: 'to call (phone)', prefix: 'op' },
    'kom':  { infinitive: 'langskomen', english: 'to come by / drop in', prefix: 'langs' },
    'komt': { infinitive: 'langskomen', english: 'to come by / drop in', prefix: 'langs' },
  },
  // Module 3
  'm3-1': {
    'stapt': { infinitive: 'instappen / uitstappen', english: 'to board / to get off', prefix: 'in / uit' },
    'komt':  { infinitive: 'aankomen', english: 'to arrive', prefix: 'aan' },
  },
  'm3-2': {
    'ademt': { infinitive: 'inademen', english: 'to breathe in', prefix: 'in' },
  },
  'm3-4': {
    'stapt': { infinitive: 'instappen / uitstappen', english: 'to board / to get off', prefix: 'in / uit' },
    'belt':  { infinitive: 'aanbellen', english: 'to ring the doorbell', prefix: 'aan' },
  },
  'm3-5': {
    'biedt': { infinitive: 'aanbieden', english: 'to offer', prefix: 'aan' },
  },
  'm3-6': {
    'komt': { infinitive: 'aankomen', english: 'to arrive', prefix: 'aan' },
  },
  'm3-7': {
    'staat': { infinitive: 'opstaan',           english: 'to get up',         prefix: 'op'       },
    'komt':  { infinitive: 'aankomen / opkomen', english: 'to arrive / to rise', prefix: 'aan / op' },
  },
  'm3-8': {
    'slaat': { infinitive: 'linksafslaan', english: 'to turn left', prefix: 'linksaf' },
  },
  'm3-10': {
    'stappen': { infinitive: 'uitstappen', english: 'to get off', prefix: 'uit' },
    'gaat':    { infinitive: 'uitgaan',    english: '(light) goes out', prefix: 'uit' },
  },
  // Module 4
  'm4-1': {
    'komt': { infinitive: 'aankomen',   english: 'to arrive',    prefix: 'aan'    },
    'gaan': { infinitive: 'verdergaan', english: 'to continue',  prefix: 'verder' },
  },
  'm4-2': {
    'staat': { infinitive: 'opstaan',   english: 'to get up',    prefix: 'op'     },
    'gaat':  { infinitive: 'teruggaan', english: 'to go back',   prefix: 'terug'  },
  },
  'm4-3': {
    'legt':    { infinitive: 'uitleggen',    english: 'to explain',        prefix: 'uit'  },
    'schrijft':{ infinitive: 'meeschrijven', english: 'to take notes along', prefix: 'mee' },
    'loopt':   { infinitive: 'teruglopen',   english: 'to walk back',      prefix: 'terug'},
  },
  'm4-4': {
    'legt': { infinitive: 'uitleggen', english: 'to explain', prefix: 'uit' },
  },
  'm4-6': {
    'zet':    { infinitive: 'aanzetten',  english: 'to turn on',       prefix: 'aan'    },
    'komt':   { infinitive: 'binnenkomen', english: 'to come in',       prefix: 'binnen' },
    'rekent': { infinitive: 'afrekenen',  english: 'to pay / check out', prefix: 'af'    },
  },
  'm4-9': {
    'werkt':   { infinitive: 'bijwerken',  english: 'to update / revise', prefix: 'bij' },
    'schrijft':{ infinitive: 'opschrijven', english: 'to write down',     prefix: 'op'  },
    'ademt':   { infinitive: 'inademen',   english: 'to breathe in',      prefix: 'in'  },
  },
  'm4-10': {
    'wisselen': { infinitive: 'uitwisselen', english: 'to exchange', prefix: 'uit' },
  },
  // Module 5
  'm5-1': {
    'staat': { infinitive: 'opstaan', english: 'to get up', prefix: 'op' },
  },
  'm5-2': {
    'denkt': { infinitive: 'nadenken', english: 'to think / reflect', prefix: 'na' },
  },
  'm5-3': {
    'schrijft': { infinitive: 'opschrijven', english: 'to write down', prefix: 'op' },
  },
  'm5-5': {
    'staan': { infinitive: 'opstaan', english: 'to get up', prefix: 'op' },
  },
  'm5-6': {
    'komt':    { infinitive: 'langskomen',  english: 'to come by / drop in', prefix: 'langs' },
    'schrijft':{ infinitive: 'opschrijven', english: 'to write down',        prefix: 'op'    },
  },
  'm5-7': {
    'legt': { infinitive: 'wegleggen', english: 'to put away', prefix: 'weg' },
  },
  'm5-8': {
    'schrijft': { infinitive: 'opschrijven', english: 'to write down', prefix: 'op' },
  },
  'm5-9': {
    'zet':     { infinitive: 'aanzetten',     english: 'to turn on',    prefix: 'aan'  },
    'schrijft':{ infinitive: 'terugschrijven', english: 'to write back', prefix: 'terug'},
  },
};

export function getSeparableVerbsForText(textId: string): Record<string, SeparableVerbEntry> {
  return textSeparableVerbs[textId] || {};
}

// ─── Fixed Expressions ──────────────────────────────────────────────────────
// Multi-word fixed expressions per text. Keys are the exact phrase as it
// appears in the text (lowercase). Used to render green highlights.

export interface FixedExpressionEntry {
  english: string;
}

export const textFixedExpressions: Record<string, Record<string, FixedExpressionEntry>> = {
  // Module 1
  'm1-3': {
    'naast elkaar':   { english: 'next to each other' },
    'door de stad':   { english: 'through the city' },
  },
  'm1-4': {
    'aan de beurt':   { english: "it's one's turn" },
    'tot ziens':      { english: 'goodbye / see you' },
  },
  'm1-5': {
    'op bezoek':      { english: 'on a visit / over' },
  },
  'm1-7': {
    'langs het water': { english: 'along the water' },
    'over het weekend': { english: 'about the weekend' },
    'na een tijdje':  { english: 'after a while' },
  },
  'm1-8': {
    'naar buiten':    { english: 'outside / out' },
  },
  'm1-10': {
    'aan haar dag':   { english: 'about her day' },
    'valt in slaap':  { english: 'falls asleep' },
  },
  // Module 2
  'm2-1': {
    'heb je morgen tijd': { english: 'do you have time tomorrow?' },
    'tot morgen':     { english: 'see you tomorrow' },
  },
  'm2-2': {
    'ik heb je gemist': { english: 'I missed you' },
  },
  'm2-3': {
    'op zijn gemak':  { english: 'at ease / comfortable' },
  },
  'm2-5': {
    'over vroeger':   { english: 'about the past' },
  },
  'm2-6': {
    'het eens':        { english: 'in agreement' },
    'vragen stellen':  { english: 'to ask questions' },
    'beter te leren kennen': { english: 'to get to know better' },
  },
  'm2-7': {
    'kom erbij':      { english: 'join in / come join us' },
  },
  'm2-8': {
    'samen aan tafel': { english: 'together at the table' },
    'niemand wil':    { english: 'nobody wants to' },
  },
  'm2-9': {
    'aan de hand':    { english: "what's going on / the matter" },
    'dat snap ik':    { english: 'I understand that' },
    'dat is lief':    { english: "that's sweet/kind" },
    'het moeilijk':   { english: 'a hard time / difficult' },
  },
  'm2-10': {
    'een foto':       { english: 'a photo' },
    'praten over':    { english: 'to talk about' },
    'alles voelt licht en goed': { english: 'everything feels light and good' },
  },
  // Module 3
  'm3-1': {
    'om zich heen':   { english: 'around / looking around' },
  },
  'm3-3': {
    'passen goed':    { english: 'fit well' },
    'langs de gracht': { english: 'along the canal' },
  },
  'm3-4': {
    'andere kant van de stad': { english: 'the other side of the city' },
    'ik ben onderweg':         { english: "I'm on my way" },
  },
  'm3-5': {
    'ruikt het naar': { english: 'it smells of' },
  },
  'm3-6': {
    'naar haar toe':            { english: 'toward her' },
    'geven elkaar een knuffel': { english: 'give each other a hug' },
    'om zich heen':             { english: 'around / looking around' },
  },
  'm3-7': {
    'op tijd': { english: 'on time' },
  },
  'm3-9': {
    'genieten van':      { english: 'to enjoy' },
    'stuur die naar mij': { english: 'send that to me' },
  },
  // Module 4
  'm4-3': {
    'stelt een vraag': { english: 'asks a question' },
  },
  'm4-5': {
    'er klaar voor': { english: 'ready for it' },
  },
  'm4-7': {
    'bijna goed':  { english: 'almost right' },
  },
  'm4-8': {
    'bijna klaar': { english: 'almost done' },
    'nog een keer': { english: 'once more' },
  },
  'm4-9': {
    'een beetje nerveus': { english: 'a bit nervous' },
    'nog beter':          { english: 'even better' },
    'er klaar voor':      { english: 'ready for it' },
  },
  'm4-10': {
    'aan het einde':    { english: 'at the end' },
    'moe maar tevreden': { english: 'tired but satisfied' },
  },
  // Module 5
  'm5-2': {
    'drie dingen op die goed gingen': { english: 'three things that went well' },
    'zit aan de tafel':               { english: 'sits at the table' },
    'een paar minuten':               { english: 'a few minutes' },
  },
  'm5-3': {
    'loopt een rondje': { english: 'goes for a jog / takes a lap' },
    'een goed gevoel':  { english: 'a good feeling' },
  },
  'm5-4': {
    "maakt foto's van":   { english: 'takes photos of' },
    'het juiste moment':  { english: 'the right moment' },
    'maar dat geeft niet': { english: "that's ok / never mind" },
  },
  'm5-5': {
    'we hebben het gedaan': { english: 'we did it' },
  },
  'm5-6': {
    'dit is heerlijk': { english: 'this is delicious' },
  },
  'm5-7': {
    'aan zijn telefoon zit': { english: 'is on his phone' },
  },
  'm5-8': {
    'ver weg':      { english: 'far away' },
    'stap voor stap': { english: 'step by step' },
  },
  'm5-10': {
    'heb veel geleerd':       { english: 'learned a lot' },
    'blij met hoe het gaat':  { english: 'happy with how things are going' },
  },
};

export function getFixedExpressionsForText(textId: string): Record<string, FixedExpressionEntry> {
  return textFixedExpressions[textId] || {};
}

// ─── Split Expressions ───────────────────────────────────────────────────────
// Two non-adjacent words in the same sentence that together form a fixed
// expression. Both words are highlighted green when they co-occur in a sentence.

export interface SplitExpressionEntry {
  word1: string;   // first word (lowercase token form)
  word2: string;   // second word (lowercase token form)
  english: string; // translation shown in popup
}

export const textSplitExpressions: Record<string, SplitExpressionEntry[]> = {
  'm3-2': [
    { word1: 'zet', word2: 'tegen', english: 'to lean against (zetten tegen)' },
  ],
  'm5-3': [
    { word1: 'geeft', word2: 'gevoel', english: 'gives a good feeling (een goed gevoel geven)' },
  ],
  'm5-4': [
    { word1: 'wacht', word2: 'op', english: 'waits for (wachten op)' },
  ],
};

export function getSplitExpressionsForText(textId: string): SplitExpressionEntry[] {
  return textSplitExpressions[textId] || [];
}
