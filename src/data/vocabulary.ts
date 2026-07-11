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

  // ===== B1 MODULE 1 — Slaap, stress en gewoonten =====
  'b1m1-1': {
    plafond: 'ceiling', leegte: 'emptiness / void', slok: 'sip',
    achterop: 'on the back (of a bike)', haast: 'rush / hurry',
  },
  'b1m1-2': {
    allesbehalve: 'anything but / far from', slaaptekort: 'sleep deficit',
    uitgeput: 'exhausted', ononderbroken: 'uninterrupted',
    verwerken: 'to process', versterkt: 'strengthened',
    onthoudt: 'retains / remembers', drukte: 'busyness',
    vertraagt: 'slows down',
  },
  'b1m1-3': {
    ruikt: 'smells (of)', zeep: 'soap', onaardig: 'unkind / matter-of-factly',
    vaststellend: 'matter-of-factly / stating a fact', diensten: 'work shifts',
    gewoonte: 'habit', ontspanning: 'relaxation',
  },
  'b1m1-4': {
    fronst: 'frowns', zwijgt: 'is silent / says nothing',
    spanning: 'tension / stress', realiseert: 'realises',
  },
  'b1m1-5': {
    nauwelijks: 'barely / hardly', signaal: 'signal / cue',
    beloning: 'reward', afleiding: 'distraction', wilskracht: 'willpower',
    besteden: 'to spend / devote', patroon: 'pattern',
    gedrag: 'behaviour', verergert: 'worsens', regelmaat: 'regularity',
  },
  'b1m1-6': {
    oppervlakte: 'surface', uitputting: 'exhaustion', oever: 'bank (of water)',
    kwartier: 'quarter hour', stilte: 'silence', redelijk: 'reasonably / fairly',
    getwijfeld: 'doubted / hesitated',
  },
  'b1m1-7': {
    kennelijk: 'apparently / evidently', luchtig: 'light-heartedly / casually',
    vermoeid: 'tired / fatigued', kapot: 'broken / worn out',
    passeerden: 'passed each other', verdieping: 'floor / storey',
  },
  'b1m1-8': {
    waakzaamheid: 'alertness / vigilance', bewustzijn: 'awareness / consciousness',
    verminderen: 'to reduce', gevolg: 'consequence / effect',
    tegenovergestelde: 'opposite', toestand: 'state / condition', eenvoudig: 'simple',
  },
  'b1m1-9': {
    wekker: 'alarm clock', notitieboek: 'notebook',
    herinnert: 'remembers', besluit: 'decides',
  },
  'b1m1-10': {
    overdreven: 'exaggerated', hardop: 'out loud', meent: 'means sincerely',
    zwaarte: 'heaviness / weight', roert: 'stirs', bezet: 'occupied / taken',
    droog: 'dryly / drily',
  },

  // ===== B1 MODULE 2 — Hoe steden veranderen =====
  'b1m2-1': {
    steiger: 'scaffolding', briefje: 'note / notice', trouw: 'loyalty',
    onrustig: 'restless / uneasy', huurprijzen: 'rent prices',
  },
  'b1m2-2': {
    kern: 'core', woningen: 'housing units / dwellings', tegelijkertijd: 'at the same time',
    verhuren: 'to rent out', betaalbaar: 'affordable', stijgen: 'to rise (of prices)',
    inkomens: 'incomes', bewoners: 'residents', gemeenschap: 'community',
    geleidelijk: 'gradually', beleid: 'policy', gemeente: 'municipality',
    beschermd: 'protected', oplossing: 'solution',
  },
  'b1m2-3': {
    rij: 'row', gracht: 'canal', fabriek: 'factory',
    eigenaar: 'owner', missen: 'to miss', verlies: 'loss',
  },
  'b1m2-4': {
    compacter: 'more terse / more compact', aanwezig: 'present', feit: 'fact',
    wandeling: 'walk / stroll', verhaal: 'story', ontdekken: 'to discover',
  },
  'b1m2-5': {
    geschiedenis: 'history', gedeelde: 'shared', leefbaar: 'livable',
    bedreigt: 'threatens', stedelijke: 'urban', leefbaarheid: 'liveability',
    verantwoordelijk: 'responsible', omgeving: 'environment / surroundings',
    groeten: 'to greet', onopvallende: 'inconspicuous', ondernemers: 'entrepreneurs',
    verhuizen: 'to move house', rand: 'edge / outskirts', herkennen: 'to recognise',
  },
  'b1m2-6': {
    prachtig: 'gorgeous / splendid', vernietigen: 'to destroy',
    kloppen: 'to ring true / be correct', aanval: 'attack',
    naïef: 'naive', vorm: 'shape / form', keuze: 'choice',
  },
  'b1m2-7': {
    bord: 'sign / board', zelfgemaakt: 'homemade / self-made', verdere: 'further',
    bijeenkomst: 'meeting / gathering', recht: 'right', verdrongen: 'displaced / pushed out',
    uiteindelijk: 'eventually', leidt: 'leads / chairs', huurverhogingen: 'rent increases',
    achteraan: 'at the back', aantekeningen: 'notes',
  },
  'b1m2-8': {
    verzet: 'resistance', bereiken: 'to achieve / reach', belangen: 'interests',
    uitstel: 'postponement / delay', grenzen: 'limits', vastgoedbedrijven: 'real estate companies',
    juridische: 'legal', bovendien: 'moreover', ingewikkelder: 'more complicated',
    woningbouw: 'housing development', ontwikkelaars: 'developers',
    strengere: 'stricter', aankoop: 'purchase', stem: 'voice',
  },
  'b1m2-9': {
    magere: 'meagre / slim', winst: 'gain / profit', deels: 'partly',
    markt: 'market', aandacht: 'attention', nieuwsgierig: 'curious',
  },
  'b1m2-10': {
    uitstapje: 'outing', oefening: 'exercise / practice', gevels: 'facades',
    hoogte: 'height', vervangen: 'replaced', gebruiker: 'user',
    verhoudingen: 'proportions', roest: 'rust', hek: 'fence',
    beseffen: 'to realise', ontworpen: 'designed', opeenstapeling: 'accumulation / pile-up',
    toevallig: 'accidental / by chance',
  },

  // ===== B1 MODULE 3 — Eten en gezondheid =====
  'b1m3-1': {
    aanrecht: 'kitchen counter', knoflook: 'garlic', snijden: 'to cut / chop',
    gedachten: 'thoughts', geur: 'smell / scent', vult: 'fills',
    specerijen: 'spices', komijn: 'cumin', kaneel: 'cinnamon',
    roert: 'stirs', sissen: 'to sizzle / hiss', bewolkt: 'cloudy / overcast',
    vastzet: 'settles / clings (of a smell)',
  },
  'b1m3-2': {
    brandstof: 'fuel', bereiden: 'to prepare / cook', eiwit: 'protein',
    koolhydraten: 'carbohydrates', peulvruchten: 'legumes / pulses', bevat: 'contains',
    toevoegingen: 'additives', beschikbaarheid: 'availability', aanpassingen: 'adjustments',
    haalbare: 'achievable / feasible', radicale: 'radical',
  },
  'b1m3-3': {
    gedekt: 'set / laid (table)', kleed: 'cloth / tablecloth', meegenomen: 'brought along',
    geometrische: 'geometric', gestoofde: 'stewed / braised', geroosterde: 'roasted',
    proef: 'taste / detect', benoemen: 'to name / identify', hartig: 'savoury',
    ondenkbaar: 'unthinkable', gelaagd: 'layered / complex', diplomatiek: 'diplomatic',
  },
  'b1m3-4': {
    eetcultuur: 'food culture', handelsnatie: 'trading nation', pragmatisch: 'pragmatic',
    verankerd: 'ingrained / anchored', porties: 'portions', presentatie: 'presentation',
    uitgebreide: 'extensive / elaborate', tafelen: 'to dine (at length)',
    aanbod: 'range / supply', duurzaamheid: 'sustainability',
  },
  'b1m3-5': {
    stilte: 'silence', streng: 'strict', feit: 'fact', discussie: 'discussion / argument',
    realiseert: 'realises', gemis: 'longing / sense of loss', tegelijk: 'at the same time',
    gedroogde: 'dried', vers: 'fresh',
  },
  'b1m3-6': {
    benoemen: 'to name / identify', opschept: 'serves oneself / helps oneself to more',
    nieuwsgierig: 'curious', verspil: 'waste', belooft: 'promises', aarzelt: 'hesitates',
    gerecht: 'dish / meal',
  },
  'b1m3-7': {
    beïnvloeden: 'to influence / affect', stemming: 'mood', vetzuren: 'fatty acids',
    vermoeidheid: 'fatigue / tiredness', grijpen: 'to reach (for)', behoefte: 'need',
    onregelmatige: 'irregular', 'kant-en-klaar': 'ready-made / convenience (food)',
  },
  'b1m3-8': {
    expres: 'on purpose / deliberately', bezig: 'busy / occupied',
    doorgeschilderd: 'painted without stopping', vensterbank: 'windowsill',
    neergezet: 'put down / placed', ezel: 'easel', onrustigs: 'something unsettling',
  },
  'b1m3-9': {
    verbondenheid: 'connection / togetherness', herkomst: 'origin / background',
    oproepen: 'to evoke / call up', bereiken: 'to reach', stabiele: 'stable',
    uitingen: 'expressions / manifestations', buitengesloten: 'excluded / left out',
    geleidelijk: 'gradually', spanning: 'tension',
  },
  'b1m3-10': {
    opdrachten: 'instructions / assignments', inhouden: 'to hold back / restrain oneself',
    afwassen: 'to do the dishes', onbekend: 'unfamiliar / unknown', teken: 'sign',
  },

  // ===== B1 MODULE 5 — Kunst en wat het doet =====
  'b1m5-1': {
    penseel: 'paintbrush', ezel: 'easel', tentoonstelling: 'exhibition',
    vertrouwen: 'confidence / trust', benoemen: 'to name / put into words', afstand: 'distance',
  },
  'b1m5-2': {
    hersengebieden: 'brain areas', landschap: 'landscape', kleurvlak: 'colour field / patch',
    bedoeling: 'intention', esthetische: 'aesthetic', verbazing: 'amazement / wonder',
    kenmerk: 'characteristic / feature', spiegel: 'mirror',
  },
  'b1m5-3': {
    voorkeur: 'preference', volgorde: 'order / sequence', bezoeker: 'visitor',
    uiterlijk: 'at the latest', regelen: 'to arrange / organise', verzekering: 'insurance',
  },
  'b1m5-4': {
    rimpel: 'wrinkle / furrow', voorhoofd: 'forehead', kantelt: 'tilts',
  },
  'b1m5-5': {
    doorzettingsvermogen: 'perseverance / determination', bereidheid: 'willingness',
    onzekerheid: 'uncertainty', opdrachten: 'commissions / assignments', bijbanen: 'side jobs',
    fondsen: 'funds', gehonoreerd: 'awarded / funded', concurrentie: 'competition',
    zichtbaarheid: 'visibility', winstgevend: 'profitable',
  },
  'b1m5-6': {
    zenuwachtig: 'nervous', beleefd: 'polite', verdeelde: 'distributed / divided',
  },
  'b1m5-7': {
    verraste: 'surprised', triomfantelijk: 'triumphantly', uitleg: 'explanation',
  },
  'b1m5-8': {
    kloof: 'gap / gulf', noodzakelijk: 'necessary', treffend: 'aptly / fittingly',
    smaak: 'taste', onderscheid: 'distinction', aanpassingen: 'adjustments',
    verlamt: 'paralyses', vermomt: 'disguises itself', veeleisend: 'demanding / high-standard',
  },
  'b1m5-9': {
    onaangenaam: 'unpleasant', schetsboek: 'sketchbook', potlood: 'pencil',
  },
  'b1m5-10': {
    opmerkingen: 'remarks / comments', geraden: 'guessed', verband: 'connection / link',
  },

  // ===== B1 MODULE 4 — Technologie en aandacht =====
  'b1m4-1': { ontwerper: 'designer', notificatie: 'notification', concentratie: 'concentration', stoort: 'disturbs / bothers', twijfelde: 'doubted / hesitated', dringend: 'urgent' },
  'b1m4-2': { hulpbron: 'resource', multitasking: 'multitasking', wissel: 'switch / shift', onderbreking: 'interruption', tijdsblokken: 'time blocks', schermtijd: 'screen time' },
  'b1m4-3': { kwijt: 'lost / gone', afgeleid: 'distracted', consequent: 'consistently', verveling: 'boredom', angst: 'anxiety / fear', gebaar: 'gesture / motion', automatisch: 'automatically' },
  'b1m4-4': { welzijn: 'well-being', eenduidig: 'unambiguous / clear-cut', vergelijking: 'comparison', ontevredenheid: 'dissatisfaction', prikkels: 'stimuli / triggers', omkeerbaar: 'reversible', correlationeel: 'correlational' },
  'b1m4-5': { bakje: 'small tray / box', verzet: 'resistance', bereikbaar: 'reachable / contactable', aangehouden: 'maintained / kept up', misloopt: 'misses out (on)', aanwezig: 'present', studeer: 'I study' },
  'b1m4-6': { afdwingt: 'compels / forces', herkent: 'recognises', leeg: 'empty', strategie: 'strategy', opvoeding: 'upbringing / parenting', prettig: 'pleasant / nice' },
  'b1m4-7': { maatstaf: 'standard / criterion', opgeteld: 'added up / in total', problematisch: 'problematic', verwerken: 'to process', signalen: 'signals', tijdslimieten: 'time limits', oprecht: 'sincere / genuine' },
  'b1m4-8': { oppakte: 'picked up', relatie: 'relationship', vergadering: 'meeting', stilte: 'silence', ongemakkelijk: 'uncomfortable / awkward', neiging: 'tendency / inclination', bladzijden: 'pages' },
  'b1m4-9': { gegevens: 'data / details', gebruikersvoorwaarden: 'terms of use', advertenties: 'advertisements', personaliseren: 'to personalise', toestemming: 'permission / consent', bewustzijn: 'awareness / consciousness' },
  'b1m4-10': { kraam: 'stall / stand', kleed: 'blanket / cloth', notitieboekje: 'notebook / notepad', pleidooi: 'plea / argument', verdragen: 'to bear / endure', afstand: 'distance', glimlacht: 'smiles' },

  // ===== B1 MODULE 6 — Natuur en het Nederlandse landschap =====
  'b1m6-1': { sindsdien: 'since then', opluchting: 'relief', verdediging: 'justification / defence', vaag: 'vague', bouwplaats: 'building site / construction site', benoemen: 'to name / put into words' },
  'b1m6-2': { zeeniveau: 'sea level', waterbeheersing: 'water management', middeleeuwen: 'Middle Ages', vijand: 'enemy', bondgenoot: 'ally', waterschap: 'water board / regional water authority', stammen: 'to date back (to) / originate (from)', ingepolderd: 'reclaimed (land)' },
  'b1m6-3': { ruis: 'noise / static', noodzaak: 'necessity', beslissingen: 'decisions', grens: 'boundary / border' },
  'b1m6-4': { dichtbevolkt: 'densely populated', wildernis: 'wilderness', ongerepte: 'untouched / pristine', heide: 'heath / moorland', verlangen: 'desire / longing', wezenlijk: 'essential / fundamental' },
  'b1m6-5': { hek: 'fence / gate', sloot: 'ditch', bitterheid: 'bitterness', knikte: 'nodded (knikken)', nakijken: 'to check / inspect', pompinstallatie: 'pump installation' },
  'b1m6-6': { aanwezigheid: 'presence', afwezigheid: 'absence', destijds: 'at the time / back then', herstel: 'recovery / restoration', spanning: 'tension / stress' },
  'b1m6-7': { watersnoodramp: 'flood disaster', grootschalig: 'large-scale', stormvloedkering: 'storm surge barrier', kustlijn: 'coastline', vertegenwoordigers: 'representatives', zeespiegel: 'sea level' },
  'b1m6-8': { voorsteden: 'suburbs', beantwoorden: 'to answer / reply to', flatgebouwen: 'apartment blocks', onaangenaam: 'unpleasant' },
  'b1m6-9': { ademhaling: 'breathing', stemming: 'mood', welzijn: 'well-being', weids: 'vast / expansive', onderbreking: 'interruption', tijdsgevoel: 'sense of time' },
  'b1m6-10': { omschrijving: 'description', duif: 'dove / pigeon', kijker: 'viewer / observer', verantwoordelijk: 'responsible' },
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
  'm2-6': {
    'spreekt': { infinitive: 'afspreken', english: 'to arrange / meet up', prefix: 'af' },
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
  // ===== A2 MODULE 1 — Everyday Independence =====
  'a2m1-1': {
    'rust':  { infinitive: 'uitrusten', english: 'to rest / recover', prefix: 'uit' },
  },
  'a2m1-4': {
    'denkt': { infinitive: 'nadenken',  english: 'to think it over',  prefix: 'na'  },
  },
  'a2m1-5': {
    'hangt': { infinitive: 'ophangen',   english: 'to hang up (the phone)',    prefix: 'op'  },
    'trekt': { infinitive: 'aantrekken', english: 'to put on (clothing)',       prefix: 'aan' },
    'zet':   { infinitive: 'opzetten',   english: 'to put on (e.g. a kettle)', prefix: 'op'  },
  },
  'a2m1-7': {
    'schrijft': { infinitive: 'opschrijven', english: 'to write down', prefix: 'op' },
    'pakt':     { infinitive: 'oppakken',    english: 'to pick up',    prefix: 'op' },
  },
  'a2m1-8': {
    'vult': { infinitive: 'invullen', english: 'to fill in', prefix: 'in' },
  },
  'a2m1-9': {
    'maakt': { infinitive: 'openmaken', english: 'to open', prefix: 'open' },
  },
  'a2m1-10': {
    'maak':  { infinitive: 'afmaken',    english: 'to finish',          prefix: 'af'  },
    'trekt': { infinitive: 'aantrekken', english: 'to put on (clothing)', prefix: 'aan' },
  },

  // ===== B1 MODULE 1 — Slaap, stress en gewoonten =====
  'b1m1-1': {
    wordt:    { infinitive: 'wakker worden',   english: 'to wake up',          prefix: 'wakker'  },
    staat:    { infinitive: 'opstaan',         english: 'to get up',           prefix: 'op'      },
    gaat:     { infinitive: 'doorgaan',        english: 'to continue / go on', prefix: 'door'    },
    fietst:   { infinitive: 'voorbijfietsen',  english: 'to cycle past',       prefix: 'voorbij' },
    vraagt:   { infinitive: 'zich afvragen',   english: 'to wonder',           prefix: 'af'      },
    schrijft: { infinitive: 'terugschrijven',  english: 'to write back',       prefix: 'terug'   },
    zet:      { infinitive: 'neerzetten',      english: 'to put down',         prefix: 'neer'    },
    drinkt:   { infinitive: 'opdrinken',       english: 'to drink up',         prefix: 'op'      },
  },
  'b1m1-2': {
    ruimen: { infinitive: 'opruimen',      english: 'to clear away / tidy up',  prefix: 'op'     },
    maken:  { infinitive: 'vastmaken',     english: 'to consolidate / fix',      prefix: 'vast'   },
    bouwt:  { infinitive: 'opbouwen',      english: 'to build up',               prefix: 'op'     },
    geven:  { infinitive: 'afgeven',       english: 'to emit / give off',         prefix: 'af'     },
    lost:   { infinitive: 'oplossen',      english: 'to solve / dissolve',        prefix: 'op'     },
    wordt:  { infinitive: 'wakker worden', english: 'to wake up',                 prefix: 'wakker' },
  },
  'b1m1-3': {
    klopt:   { infinitive: 'aankloppen',    english: 'to knock',            prefix: 'aan'     },
    kom:     { infinitive: 'binnenkomen',   english: 'to come in',          prefix: 'binnen'  },
    schenkt: { infinitive: 'inschenken',    english: 'to pour (in)',         prefix: 'in'      },
    ziet:    { infinitive: 'eruitzien',     english: 'to look / appear',     prefix: 'uit'     },
    denkt:   { infinitive: 'nadenken',      english: 'to think / reflect',   prefix: 'na'      },
    rijdt:   { infinitive: 'voorbijrijden', english: 'to drive / ride past', prefix: 'voorbij' },
  },
  'b1m1-4': {
    denkt: { infinitive: 'nadenken',   english: 'to think / reflect', prefix: 'na'    },
    kijkt: { infinitive: 'aankijken',  english: 'to look at',         prefix: 'aan'   },
    komt:  { infinitive: 'eruit komen', english: 'to come out',       prefix: 'eruit' },
  },
  'b1m1-5': {
    wordt:  { infinitive: 'wakker worden', english: 'to wake up',       prefix: 'wakker' },
    worden: { infinitive: 'bewust worden', english: 'to become aware',  prefix: 'bewust' },
  },
  'b1m1-6': {
    dacht: { infinitive: 'nadenken',   english: 'to think / reflect', prefix: 'na'  },
    keek:  { infinitive: 'aankijken',  english: 'to look at',         prefix: 'aan' },
    komen: { infinitive: 'erin komen', english: 'to get into it',     prefix: 'in'  },
  },
  'b1m1-7': {
    komt:   { infinitive: 'tegenkomen',       english: 'to run into / encounter', prefix: 'tegen'      },
    ziet:   { infinitive: 'eruitzien',        english: 'to look / appear',         prefix: 'uit'        },
    houdt:  { infinitive: 'openhouden',       english: 'to hold open',             prefix: 'open'       },
    vraagt: { infinitive: 'zich afvragen',    english: 'to wonder',                prefix: 'af'         },
    stapt:  { infinitive: 'instappen',        english: 'to step in',               prefix: 'in'         },
    haalt:  { infinitive: 'ophalen (schouders)', english: 'to shrug',              prefix: 'op'         },
  },
  'b1m1-8': {
    stralen: { infinitive: 'uitstralen', english: 'to emit / radiate',      prefix: 'uit' },
    denkt:   { infinitive: 'nadenken',   english: 'to think / reflect',     prefix: 'na'  },
    leggen:  { infinitive: 'wegleggen',  english: 'to put away / set aside', prefix: 'weg' },
  },
  'b1m1-9': {
    wordt:    { infinitive: 'wakker worden', english: 'to wake up',              prefix: 'wakker' },
    pakt:     { infinitive: 'oppakken',      english: 'to pick up',              prefix: 'op'     },
    legt:     { infinitive: 'terugleggen',   english: 'to put back',             prefix: 'terug'  },
    merkt:    { infinitive: 'opmerken',      english: 'to notice',               prefix: 'op'     },
    schrijft: { infinitive: 'opschrijven',   english: 'to write down',           prefix: 'op'     },
    houden:   { infinitive: 'volhouden',     english: 'to keep up / persevere',  prefix: 'vol'    },
  },
  'b1m1-10': {
    ziet:  { infinitive: 'eruitzien',         english: 'to look / appear',  prefix: 'uit'        },
    kijkt: { infinitive: 'aankijken',         english: 'to look at',        prefix: 'aan'        },
    lopen: { infinitive: 'voorbijlopen',      english: 'to walk past',      prefix: 'voorbij'    },
    leunt: { infinitive: 'achterover leunen', english: 'to lean back',      prefix: 'achterover' },
  },

  // ===== B1 MODULE 2 — Hoe steden veranderen =====
  'b1m2-1': {
    kijkt: { infinitive: 'aankijken',          english: 'to look at',      prefix: 'aan'        },
    haalt: { infinitive: 'schouders ophalen',  english: 'to shrug',        prefix: 'op'         },
    leunt: { infinitive: 'achterover leunen',  english: 'to lean back',    prefix: 'achterover' },
  },
  'b1m2-2': {
    grijpen: { infinitive: 'ingrijpen', english: 'to intervene', prefix: 'in' },
  },
  'b1m2-3': {
    gegaan: { infinitive: 'omhooggaan', english: 'to go up',   prefix: 'omhoog' },
    kijkt:  { infinitive: 'aankijken',  english: 'to look at', prefix: 'aan'    },
  },
  'b1m2-4': {
    vraag: { infinitive: 'zich afvragen', english: 'to wonder',             prefix: 'af'      },
    ziet:  { infinitive: 'aanzien',       english: 'to tell / notice from', prefix: 'aan'     },
    denkt: { infinitive: 'nadenken',      english: 'to think / reflect',    prefix: 'na'      },
    kijkt: { infinitive: 'aankijken',     english: 'to look at',            prefix: 'aan'     },
    rijdt: { infinitive: 'voorbijrijden', english: 'to drive / ride past',  prefix: 'voorbij' },
  },
  'b1m2-5': {
    roept: { infinitive: 'oproepen', english: 'to raise / evoke', prefix: 'op' },
  },
  'b1m2-6': {
    denkt: { infinitive: 'nadenken',          english: 'to think / reflect',     prefix: 'na'         },
    kijkt: { infinitive: 'aankijken',         english: 'to look at',             prefix: 'aan'        },
    haalt: { infinitive: 'schouders ophalen', english: 'to shrug',               prefix: 'op'         },
    laat:  { infinitive: 'loslaten',          english: 'to let go',              prefix: 'los'        },
    staan: { infinitive: 'stilstaan',         english: 'to stand still / pause', prefix: 'stil'       },
  },
  'b1m2-7': {
    schrijft: { infinitive: 'terugschrijven', english: 'to write back', prefix: 'terug' },
    ga:       { infinitive: 'meegaan',        english: 'to come along', prefix: 'mee'   },
    vraagt:   { infinitive: 'zich afvragen',  english: 'to wonder',     prefix: 'af'    },
  },
  'b1m2-9': {
    vraag: { infinitive: 'zich afvragen', english: 'to wonder',          prefix: 'af'     },
    gaan:  { infinitive: 'omhooggaan',   english: 'to go up',            prefix: 'omhoog' },
    gaat:  { infinitive: 'verdergaan',   english: 'to continue / go on', prefix: 'verder' },
    kijkt: { infinitive: 'aankijken',    english: 'to look at',          prefix: 'aan'    },
  },
  'b1m2-10': {
    ziet: { infinitive: 'eruitzien', english: 'to look / appear', prefix: 'uit' },
  },

  // ===== B1 MODULE 3 — Eten en gezondheid =====
  'b1m3-1': {
    ademt:  { infinitive: 'inademen',    english: 'to breathe in',     prefix: 'in'   },
    denken: { infinitive: 'nadenken',    english: 'to think / reflect', prefix: 'na'   },
    voegt:  { infinitive: 'toevoegen',   english: 'to add',             prefix: 'toe'  },
    houden: { infinitive: 'vasthouden',  english: 'to hold on to',      prefix: 'vast' },
  },
  'b1m3-2': {
    raakt: { infinitive: 'tekortraken', english: 'to run short of', prefix: 'tekort' },
  },
  'b1m3-3': {
    denkt: { infinitive: 'nadenken', english: 'to think / reflect', prefix: 'na' },
  },
  'b1m3-4': {
    valt: { infinitive: 'opvallen', english: 'to stand out / be noticeable', prefix: 'op' },
  },
  'b1m3-6': {
    denkt: { infinitive: 'nadenken',  english: 'to think / reflect', prefix: 'na'  },
    kijkt: { infinitive: 'aankijken', english: 'to look at',          prefix: 'aan' },
    biedt: { infinitive: 'aanbieden', english: 'to offer',            prefix: 'aan' },
    bouw:  { infinitive: 'opbouwen',  english: 'to build up',         prefix: 'op'  },
  },
  'b1m3-8': {
    gaat:   { infinitive: 'voorbijgaan',  english: 'to go by / pass',   prefix: 'voorbij' },
    stuurt: { infinitive: 'terugsturen',  english: 'to send back',       prefix: 'terug'   },
    houden: { infinitive: 'ophouden',     english: 'to stop / cease',    prefix: 'op'      },
  },
  'b1m3-9': {
    passen: { infinitive: 'aanpassen', english: 'to adapt',           prefix: 'aan'  },
    pas:    { infinitive: 'aanpassen', english: 'to adapt',           prefix: 'aan'  },
    houd:   { infinitive: 'vasthouden', english: 'to hold on to',     prefix: 'vast' },
  },
  'b1m3-10': {
    vegen:  { infinitive: 'opvegen',      english: 'to wipe up / mop up', prefix: 'op'     },
    denkt:  { infinitive: 'nadenken',     english: 'to think / reflect',  prefix: 'na'     },
    nemen:  { infinitive: 'overnemen',    english: 'to take over',        prefix: 'over'   },
    houdt:  { infinitive: 'tegenhouden',  english: 'to hold back / stop', prefix: 'tegen'  },
  },

  // ===== B1 MODULE 5 — Kunst en wat het doet =====
  'b1m5-1': {
    keek:   { infinitive: 'aankijken',  english: 'to look at',  prefix: 'aan' },
    zette:  { infinitive: 'opzetten',   english: 'to put on',   prefix: 'op'  },
    schonk: { infinitive: 'inschenken', english: 'to pour',     prefix: 'in'  },
  },
  'b1m5-2': {
    hangt:  { infinitive: 'samenhangen', english: 'to be connected (with)', prefix: 'samen' },
    houden: { infinitive: 'vasthouden',  english: 'to hold / maintain',     prefix: 'vast'  },
  },
  'b1m5-3': {
    dacht:  { infinitive: 'nadenken',    english: 'to think / reflect', prefix: 'na'  },
    schreef: { infinitive: 'opschrijven', english: 'to write down',      prefix: 'op'  },
    keek:   { infinitive: 'opkijken',    english: 'to look up',         prefix: 'op'  },
    legde:  { infinitive: 'uitleggen',   english: 'to explain',         prefix: 'uit' },
  },
  'b1m5-4': {
    keek: { infinitive: 'aankijken',     english: 'to look at',           prefix: 'aan'     },
    reed: { infinitive: 'voorbijrijden', english: 'to drive / ride past',  prefix: 'voorbij' },
  },
  'b1m5-6': {
    spreken: { infinitive: 'afspreken', english: 'to arrange to meet',           prefix: 'af'   },
    ging:    { infinitive: 'overgaan',  english: 'to turn to (a topic)',          prefix: 'over' },
    dacht:   { infinitive: 'nadenken',  english: 'to think / reflect',           prefix: 'na'   },
    keek:    { infinitive: 'aankijken', english: 'to look at',                   prefix: 'aan'  },
    stond:   { infinitive: 'opstaan',   english: 'to get up',                    prefix: 'op'   },
  },
  'b1m5-7': {
    gingen:  { infinitive: 'doorgaan',   english: 'to continue / go on', prefix: 'door'  },
    draaide: { infinitive: 'omdraaien',  english: 'to turn around',      prefix: 'om'    },
    liep:    { infinitive: 'langslopen', english: 'to walk past',        prefix: 'langs' },
    dronk:   { infinitive: 'opdrinken',  english: 'to drink up / finish', prefix: 'op'   },
  },
  'b1m5-8': {
    gaan: { infinitive: 'doorgaan', english: 'to continue / go on', prefix: 'door' },
  },
  'b1m5-9': {
    stond:   { infinitive: 'opstaan',        english: 'to get up',       prefix: 'op'    },
    schreef: { infinitive: 'terugschrijven', english: 'to write back',   prefix: 'terug' },
    sloeg:   { infinitive: 'openslaan',      english: 'to open (a book)', prefix: 'open' },
  },
  'b1m5-10': {
    dacht: { infinitive: 'nadenken',  english: 'to think / reflect', prefix: 'na'  },
    keek:  { infinitive: 'aankijken', english: 'to look at',         prefix: 'aan' },
    stond: { infinitive: 'opstaan',   english: 'to get up',          prefix: 'op'  },
  },

  // ===== B1 MODULE 4 — Technologie en aandacht =====
  'b1m4-1': {
    pakt:   { infinitive: 'oppakken',    english: 'to pick up',        prefix: 'op'    },
    legt:   { infinitive: 'terugleggen', english: 'to put back',       prefix: 'terug' },
    kijkt:  { infinitive: 'opkijken',    english: 'to look up',        prefix: 'op'    },
    staat:  { infinitive: 'opstaan',     english: 'to get up',         prefix: 'op'    },
    denken: { infinitive: 'nadenken',    english: 'to think / reflect', prefix: 'na'   },
  },
  'b1m4-2': {
    schakelen: { infinitive: 'uitschakelen', english: 'to switch off / disable', prefix: 'uit'  },
    houden:    { infinitive: 'vasthouden',   english: 'to hold on to / maintain', prefix: 'vast' },
  },
  'b1m4-3': {
    denkt: { infinitive: 'nadenken',    english: 'to think / reflect', prefix: 'na'    },
    kijkt: { infinitive: 'aankijken',   english: 'to look at',         prefix: 'aan'   },
    pakt:  { infinitive: 'oppakken',    english: 'to pick up',         prefix: 'op'    },
    legt:  { infinitive: 'terugleggen', english: 'to put back',        prefix: 'terug' },
  },
  'b1m4-4': {
    tonen: { infinitive: 'aantonen', english: 'to demonstrate / prove', prefix: 'aan' },
  },
  'b1m4-5': {
    zet: { infinitive: 'wegzetten', english: 'to put away', prefix: 'weg' },
  },
  'b1m4-6': {
    houd: { infinitive: 'aanhouden', english: 'to maintain / keep up', prefix: 'aan' },
    leg:  { infinitive: 'wegleggen', english: 'to put aside / put down', prefix: 'weg' },
  },
  'b1m4-8': {
    denkt: { infinitive: 'nadenken',   english: 'to think / reflect', prefix: 'na'   },
    pakt:  { infinitive: 'oppakken',   english: 'to pick up',         prefix: 'op'   },
    legt:  { infinitive: 'neerleggen', english: 'to put down',        prefix: 'neer' },
    raken: { infinitive: 'aanraken',   english: 'to touch',           prefix: 'aan'  },
  },
  'b1m4-10': {
    pakt: { infinitive: 'oppakken', english: 'to pick up', prefix: 'op' },
  },

  // ===== B1 MODULE 6 — Natuur en het Nederlandse landschap =====
  'b1m6-1': {
    sloot: { infinitive: 'afsluiten', english: 'to lock up / close off', prefix: 'af' },
    nam:   { infinitive: 'innemen',   english: 'to take up (space)',      prefix: 'in' },
  },
  'b1m6-2': {
    gaat:    { infinitive: 'doorgaan',    english: 'to continue',           prefix: 'door'  },
    leverde: { infinitive: 'opleveren',   english: 'to yield / produce',    prefix: 'op'    },
    houden:  { infinitive: 'buitenhouden', english: 'to keep out / keep at bay', prefix: 'buiten' },
  },
  'b1m6-3': {
    ging: { infinitive: 'doorgaan', english: 'to continue', prefix: 'door' },
  },
  'b1m6-5': {
    keek:   { infinitive: 'aankijken', english: 'to look at', prefix: 'aan' },
    haalde: { infinitive: 'ophalen',   english: 'to shrug (schouders ophalen)', prefix: 'op' },
  },
  'b1m6-6': {
    bleef:  { infinitive: 'binnenblijven', english: 'to stay inside',  prefix: 'binnen' },
    rusten: { infinitive: 'uitrusten',     english: 'to rest / recover', prefix: 'uit'  },
  },
  'b1m6-7': {
    passen: { infinitive: 'toepassen', english: 'to apply',              prefix: 'toe'  },
    gaan:   { infinitive: 'overgaan',  english: 'to be about (a topic)', prefix: 'over' },
  },
  'b1m6-8': {
    reed:  { infinitive: 'terugrijden', english: 'to drive / ride back', prefix: 'terug' },
    vroeg: { infinitive: 'afvragen',    english: 'to wonder',            prefix: 'af'    },
    zette: { infinitive: 'neerzetten',  english: 'to put down',          prefix: 'neer'  },
    dacht: { infinitive: 'nadenken',    english: 'to think / reflect',   prefix: 'na'    },
  },
  'b1m6-9': {
    gaan: { infinitive: 'omgaan', english: 'to deal with', prefix: 'om' },
  },
  'b1m6-10': {
    dacht: { infinitive: 'nadenken',    english: 'to think / reflect', prefix: 'na'    },
    keek:  { infinitive: 'aankijken',   english: 'to look at',         prefix: 'aan'   },
    liep:  { infinitive: 'voorbijlopen', english: 'to walk past',      prefix: 'voorbij' },
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
    'voelt zich op zijn gemak': { english: 'feels at ease / comfortable' },
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
    'maar niemand wil al naar huis': { english: 'nobody wants to go home yet' },
  },
  'm2-9': {
    'aan de hand':    { english: "what's going on / the matter" },
    'dat snap ik':    { english: 'I understand that' },
    'dat is lief':    { english: "that's sweet/kind" },
    'heeft het moeilijk': { english: 'is having a hard time' },
  },
  'm2-10': {
    'maakt een foto van': { english: 'takes a photo of' },
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
  // ===== A2 MODULE 1 — Everyday Independence =====
  'a2m1-1': {
    'dat is prima':                   { english: "that's fine / great" },
    'blij dat het niets ernstig is':  { english: 'glad nothing is seriously wrong' },
  },
  'a2m1-2': {
    'wat nu':           { english: 'what now?' },
    'ik ben iets later':{ english: "I'll be a bit late" },
    'geen probleem':    { english: 'no problem' },
  },
  'a2m1-3': {
    'ik kom eraan':      { english: "I'm on my way" },
    'helemaal vergeten': { english: 'completely forgot' },
  },
  'a2m1-4': {
    'reageert meteen':  { english: 'responds right away' },
    "met z'n drieën":   { english: 'just the three of us' },
  },
  'a2m1-5': {
    'doet het niet':    { english: "isn't working / doesn't work" },
    'er gebeurt niets': { english: 'nothing happens' },
    'zo snel mogelijk': { english: 'as soon as possible' },
    'kom maar':         { english: 'come on over' },
  },
  'a2m1-6': {
    'heeft last van zijn keel': { english: 'has a sore throat' },
    'niet op voorraad':         { english: 'not in stock' },
    'drie keer per dag':        { english: 'three times a day' },
  },
  'a2m1-7': {
    'dat spaart tijd':    { english: 'that saves time' },
    'eet je vanavond mee':{ english: 'are you joining for dinner tonight?' },
  },
  'a2m1-8': {
    'wat erg':        { english: 'how terrible!' },
    'toch vervelend': { english: 'still annoying though' },
  },
  'a2m1-9': {
    'begrijpt niet alles':      { english: "doesn't understand everything" },
    'zoekt het op':             { english: 'looks it up' },
    'het gaat inderdaad snel':  { english: 'it really goes quickly' },
  },
  'a2m1-10': {
    'goed idee':       { english: 'good idea' },
    'hoe was jouw dag':{ english: 'how was your day?' },
    'in plaats van':   { english: 'instead of' },
  },

  // ===== B1 MODULE 1 — Slaap, stress en gewoonten =====
  'b1m1-1': {
    'op volle kracht draaien': { english: 'to run at full capacity' },
    'voor het eerst in weken': { english: 'for the first time in weeks' },
    'geen zin':                { english: 'no motivation / not feel like it' },
    'gelijk had':              { english: 'to be right (gelijk hebben)' },
  },
  'b1m1-2': {
    'in slaap te vallen': { english: 'to fall asleep (in slaap vallen)' },
  },
  'b1m1-3': {
    'voelde zich schuldig': { english: 'felt guilty (zich schuldig voelen)' },
  },
  'b1m1-4': {
    'zonder inleiding':  { english: 'without preamble / without introduction' },
    'ongelijk heeft':    { english: 'to be wrong (ongelijk hebben)' },
    'niets bijzonders':  { english: 'nothing special / out of the ordinary' },
  },
  'b1m1-5': {
    'in de weg zitten':   { english: 'to get in the way' },
    'op de lange termijn':{ english: 'in the long run' },
  },
  'b1m1-6': {
    'op dezelfde toon': { english: 'in the same tone' },
    'aan gewend was':   { english: 'was used to (ergens aan gewend zijn)' },
  },
  'b1m1-7': {
    'een dag of twee': { english: 'a day or two' },
  },
  'b1m1-8': {
    'in de praktijk': { english: 'in practice' },
  },
  'b1m1-9': {
    'als een reflex': { english: 'like a reflex / automatically' },
    'het went':       { english: 'you get used to it' },
  },
  'b1m1-10': {
    'zonder scherpte': { english: 'without sharpness / harshness' },
    'dit telt ook':    { english: 'this counts too' },
  },

  // ===== B1 MODULE 2 — Hoe steden veranderen =====
  'b1m2-3': {
    'wel eens': { english: 'ever / at some point' },
  },
  'b1m2-4': {
    'ergens mee zit': { english: 'to be bothered by something' },
  },
  'b1m2-5': {
    'derde plekken':         { english: 'third places' },
    'zich verbonden voelen': { english: 'to feel connected to something' },
  },
  'b1m2-6': {
    'op zichzelf': { english: 'in itself' },
  },
  'b1m2-7': {
    'van in de vijftig': { english: "in one's fifties" },
    'zo nu en dan':      { english: 'every now and then' },
  },
  'b1m2-8': {
    'druk uitoefenen':   { english: 'to exert pressure' },
    'van buitenaf':      { english: 'from the outside' },
    'eisen stellen aan': { english: 'to make demands of' },
    'in ieder geval':    { english: 'in any case' },
  },
  'b1m2-9': {
    'ook al': { english: 'even though / even if' },
  },

  // ===== B1 MODULE 3 — Eten en gezondheid =====
  'b1m3-1': {
    'koken leer je met je handen': { english: 'cooking you learn with your hands' },
    'voor alles eromheen':         { english: 'for everything around it' },
  },
  'b1m3-2': {
    'het gaat om balans en variatie': { english: 'it is about balance and variety' },
    'tekort aan':                     { english: 'short of / lacking in' },
  },
  'b1m3-3': {
    'wat vind je van':               { english: 'what do you think of' },
    'dat is bij mij thuis ondenkbaar': { english: "that's unthinkable where I'm from" },
    'zoet en hartig gaan samen':     { english: 'sweet and savoury go together' },
  },
  'b1m3-4': {
    'het gaat om':    { english: 'it is about' },
    'iets rustigs aan': { english: 'something calm / restful about it' },
    'de standaard is': { english: 'the standard / norm is' },
  },
  'b1m3-5': {
    'als een feit':          { english: 'as a fact / matter-of-factly' },
    'zonder discussie':      { english: 'without discussion / unquestioningly' },
    'tegelijk hier en daar': { english: 'at once here and there' },
  },
  'b1m3-6': {
    'er goed in':             { english: 'good at it' },
    'het is vooral een gewoonte': { english: "it's mostly a habit" },
    'koken kost tijd':        { english: 'cooking takes time' },
  },
  'b1m3-7': {
    'in plaats van': { english: 'instead of' },
    'gevolgen voor': { english: 'consequences for' },
  },
  'b1m3-8': {
    'niet expres':      { english: 'not on purpose' },
    'dat snap ik niet': { english: "I don't understand that" },
    'als een compliment': { english: 'as a compliment' },
  },
  'b1m3-9': {
    'een grens vormen':     { english: 'to form a boundary / barrier' },
    'een vorm van identiteit': { english: 'a form of identity' },
  },
  'b1m3-10': {
    'een goed teken': { english: 'a good sign' },
    "met z'n allen":  { english: 'all together / as a group' },
  },

  // ===== B1 MODULE 5 — Kunst en wat het doet =====
  'b1m5-2': {
    'maakt een verschil': { english: 'makes a difference' },
  },
  'b1m5-3': {
    'een week van tevoren': { english: 'a week in advance' },
  },
  'b1m5-4': {
    'behoefte aan': { english: 'need for / desire for' },
  },
  'b1m5-5': {
    'eerder uitzondering dan regel': { english: 'more the exception than the rule' },
  },
  'b1m5-6': {
    'hoe dan ook': { english: 'anyhow / in any case' },
  },
  'b1m5-7': {
    'vanuit een afstand': { english: 'from a distance' },
  },
  'b1m5-8': {
    'in werkelijkheid': { english: 'in reality' },
  },
  'b1m5-10': {
    'zonder aanleiding': { english: 'without reason / out of the blue' },
  },

  // ===== B1 MODULE 4 — Technologie en aandacht =====
  'b1m4-1':  { 'in de gaten':        { english: 'aware of / onto (something)' } },
  'b1m4-3':  { 'meer in het moment': { english: 'more in the moment / more present' } },
  'b1m4-4':  { 'zich bewust zijn van': { english: 'to be aware of' } },
  'b1m4-7':  { 'in plaats van':      { english: 'instead of' } },
  'b1m4-8':  { 'aan niets bijzonders': { english: 'of nothing in particular' } },
  'b1m4-10': { 'op de achtergrond':  { english: 'in the background' } },

  // ===== B1 MODULE 6 — Natuur en het Nederlandse landschap =====
  'b1m6-1': { 'vrij genomen':         { english: 'took time off (vrij nemen)' } },
  'b1m6-5': { 'boven het hoofd':      { english: 'above one\'s head / at bay (water boven het hoofd houden)' } },
  'b1m6-7': { 'op lange termijn':     { english: 'in the long term' } },
  'b1m6-8': { 'onder woorden brengen': { english: 'to put into words' } },
};

export function getFixedExpressionsForText(textId: string): Record<string, FixedExpressionEntry> {
  return textFixedExpressions[textId] || {};
}

// ─── Split Expressions ───────────────────────────────────────────────────────
// Two non-adjacent words in the same sentence that together form a fixed
// expression. Both words are highlighted green when they co-occur in a sentence.

export interface SplitExpressionEntry {
  word1: string;    // first word (lowercase token form)
  word2: string;    // second word (lowercase token form)
  english: string;  // translation shown in popup
  display?: string; // optional override for the phrase shown in popup & saved to flashcards
}

export const textSplitExpressions: Record<string, SplitExpressionEntry[]> = {
  'm3-2': [
    { word1: 'zet', word2: 'tegen', english: 'to lean against (zetten tegen)' },
  ],
  'm5-3': [
    { word1: 'geeft', word2: 'gevoel', display: 'geeft … een goed gevoel', english: 'to give a good feeling' },
  ],
  'm5-4': [
    { word1: 'wacht', word2: 'op', english: 'waits for (wachten op)' },
  ],
};

export function getSplitExpressionsForText(textId: string): SplitExpressionEntry[] {
  return textSplitExpressions[textId] || [];
}
