import type { FlashcardSet, FlashcardSetWord } from '@/types/dutch';

function n(
  dutch: string,
  english: string,
  article: 'de' | 'het',
  plural: string,
  example: string,
  exampleTranslation: string,
  nounTip?: string,
): FlashcardSetWord {
  return {
    dutch, english, article,
    plural: plural === '-' ? undefined : plural,
    example, exampleTranslation, nounTip,
  };
}

function nset(id: string, emoji: string, title: string, words: FlashcardSetWord[]): FlashcardSet {
  return { id, emoji, title, category: 'nouns', level: 'A2', folder: 'Nouns', words };
}

export const a2NounSets: FlashcardSet[] = [

  nset('a2-people-society', '👥', 'People & Society', [
    n('burger',               'citizen / resident',            'de',  'burgers',               'De burger heeft recht op onderwijs.',             'The citizen has the right to education.',         'Also means "burger" (food) in informal speech.'),
    n('buurman',              'male neighbour',                'de',  'buren',                 'De buurman heeft een grote tuin.',                'The neighbour has a big garden.',                 'Female: de buurvrouw. Collective: de buren.'),
    n('collega',              'colleague',                     'de',  "collega's",              'Mijn collega helpt mij met het project.',         'My colleague helps me with the project.',          'Always de, even ending in -a. Plural with apostrophe.'),
    n('directeur',            'director / manager',            'de',  'directeuren',           'De directeur heeft een vergadering.',             'The director has a meeting.',                     'Female form: de directrice.'),
    n('vrijwilliger',         'volunteer',                     'de',  'vrijwilligers',          'De vrijwilliger werkt in het ziekenhuis.',        'The volunteer works in the hospital.',             'Vrijwilligerswerk = volunteer work.'),
    n('inwoner',              'inhabitant / resident',         'de',  'inwoners',              'De inwoners van Amsterdam fietsen veel.',         'The residents of Amsterdam cycle a lot.'),
    n('generatie',            'generation',                    'de',  'generaties',            'De jongere generatie gebruikt veel internet.',    'The younger generation uses the internet a lot.'),
    n('meerderheid',          'majority',                      'de',  'meerderheden',          'De meerderheid is het daarmee eens.',             'The majority agrees.',                            'Opposite: de minderheid (minority).'),
    n('individu',             'individual',                    'het', "individu's",             'Elk individu heeft rechten en plichten.',         'Each individual has rights and duties.',           'Formal/academic register. Plural with apostrophe.'),
    n('gemeenschap',          'community',                     'de',  'gemeenschappen',        'De lokale gemeenschap organiseert een feest.',    'The local community organises a party.'),
  ]),

  nset('a2-work-career', '💼', 'Work & Career', [
    n('vergadering',          'meeting',                       'de',  'vergaderingen',         'We hebben een vergadering om tien uur.',          'We have a meeting at ten o\'clock.',               'More formal than afspraak.'),
    n('salaris',              'salary',                        'het', 'salarissen',            'Mijn salaris wordt maandelijks betaald.',         'My salary is paid monthly.',                       'Loon is more general (wages / pay).'),
    n('functie',              'job title / function / role',   'de',  'functies',              'Wat is uw functie in dit bedrijf?',               'What is your job title in this company?'),
    n('contract',             'contract',                      'het', 'contracten',            'Hij tekent een nieuw contract.',                  'He signs a new contract.'),
    n('vakantie',             'holiday / vacation',            'de',  'vakanties',             'Ze gaat op vakantie naar Portugal.',              'She goes on holiday to Portugal.',                 'Op vakantie gaan = to go on holiday.'),
    n('bedrijf',              'company / business',            'het', 'bedrijven',             'Ze werkt bij een groot bedrijf in Rotterdam.',    'She works at a large company in Rotterdam.'),
    n('afdeling',             'department',                    'de',  'afdelingen',            'Ik werk op de marketingafdeling.',                'I work in the marketing department.'),
    n('deadline',             'deadline',                      'de',  'deadlines',             'De deadline is morgen om vijf uur.',              'The deadline is tomorrow at five o\'clock.',       'Widely used in Dutch workplaces, borrowed from English.'),
    n('project',              'project',                       'het', 'projecten',             'We werken samen aan een nieuw project.',          'We work together on a new project.'),
    n('ervaring',             'experience',                    'de',  'ervaringen',            'Hij heeft veel werkervaring.',                    'He has a lot of work experience.',                 'Werkervaring = work experience.'),
    n('sollicitatiegesprek',  'job interview',                 'het', 'sollicitatiegesprekken', 'Morgen heb ik een sollicitatiegesprek.',          'Tomorrow I have a job interview.',                 'Sollicitatiebrief = cover letter.'),
  ]),

  nset('a2-housing-city', '🏙️', 'Housing & City', [
    n('huurder',              'tenant / renter',               'de',  'huurders',              'De huurder betaalt elke maand huur.',             'The tenant pays rent every month.',               'Opposite: de verhuurder (landlord).'),
    n('verhuurder',           'landlord',                      'de',  'verhuurders',           'De verhuurder repareert de verwarming.',          'The landlord repairs the heating.',               'Huurcontract = rental contract.'),
    n('appartement',          'apartment / flat',              'het', 'appartementen',         'Ik huur een appartement in het centrum.',         'I rent an apartment in the city centre.',         'Also: de flat (more informal).'),
    n('wijk',                 'neighbourhood / district',      'de',  'wijken',                'Wij wonen in een rustige wijk.',                  'We live in a quiet neighbourhood.',               '"De Jordaan" is een wijk in Amsterdam.'),
    n('gemeentehuis',         'town hall / municipality office', 'het', 'gemeentehuizen',      'Je kunt je inschrijven bij het gemeentehuis.',    'You can register at the town hall.',              'Where you register as a resident (inschrijven).'),
    n('infrastructuur',       'infrastructure',                'de',  '-',                     'De infrastructuur in Nederland is goed.',         'The infrastructure in the Netherlands is good.',  'Uncountable in practice.'),
    n('centrum',              'city centre',                   'het', 'centra',                'We gaan winkelen in het centrum.',                'We go shopping in the city centre.'),
    n('buitenwijk',           'suburb / outskirts',            'de',  'buitenwijken',          'Ze wonen in een buitenwijk van Utrecht.',         'They live in a suburb of Utrecht.',               'Opposite of centrum.'),
    n('vergunning',           'permit / licence',              'de',  'vergunningen',          'Je hebt een vergunning nodig om te bouwen.',      'You need a permit to build.',                     'Bouwvergunning = building permit.'),
    n('renovatie',            'renovation',                    'de',  'renovaties',            'Het huis is in renovatie.',                       'The house is being renovated.'),
  ]),

  nset('a2-transport-travel', '🚆', 'Transport & Travel', [
    n('perron',               'platform (train)',              'het', 'perrons',               'De trein vertrekt vanaf perron vier.',            'The train departs from platform four.'),
    n('vertraging',           'delay',                         'de',  'vertragingen',          'De trein heeft tien minuten vertraging.',         'The train has a ten-minute delay.'),
    n('rijbewijs',            'driving licence',               'het', 'rijbewijzen',           'Ik wil mijn rijbewijs halen.',                    'I want to get my driving licence.'),
    n('ov-chipkaart',         'public transport card',         'de',  'ov-chipkaarten',        'Vergeet je ov-chipkaart niet in te checken.',     'Don\'t forget to check in with your travel card.', 'Dutch contactless card for trams, trains, buses and metro.'),
    n('fietsenstalling',      'bicycle storage / bike shed',   'de',  'fietsentallingen',      'Er is een grote fietsenstalling bij het station.', 'There is a large bicycle storage at the station.', 'Found at every Dutch train station.'),
    n('stoplicht',            'traffic light',                 'het', 'stoplichten',           'Stop bij het rode stoplicht.',                    'Stop at the red traffic light.'),
    n('afstand',              'distance',                      'de',  'afstanden',             'Wat is de afstand van Amsterdam naar Utrecht?',   'What is the distance from Amsterdam to Utrecht?'),
    n('reis',                 'journey / trip',                'de',  'reizen',                'De reis duurt twee uur met de trein.',            'The journey takes two hours by train.',           '"Een goede reis!" = Have a good journey!'),
    n('vliegtuig',            'aeroplane',                     'het', 'vliegtuigen',           'We reizen met het vliegtuig naar Barcelona.',     'We travel to Barcelona by plane.'),
    n('baggage',              'luggage / baggage',             'de',  '-',                     'Mijn baggage is te zwaar voor het vliegtuig.',    'My luggage is too heavy for the plane.',          'Uncountable. Handbagage = hand luggage.'),
  ]),

  nset('a2-food-eating', '🍽️', 'Food & Eating Out', [
    n('recept',               'recipe / prescription',         'het', 'recepten',              'Ik probeer een nieuw recept uit.',                'I am trying out a new recipe.',                   'Context determines meaning: cooking vs. pharmacy.'),
    n('ingrediënt',           'ingredient',                    'het', 'ingrediënten',          'Welke ingrediënten heb je nodig?',                'Which ingredients do you need?',                  'Usually used in plural.'),
    n('portie',               'portion / serving',             'de',  'porties',               'Een grote portie patat, alsjeblieft.',            'A large portion of chips, please.'),
    n('rekening',             'bill / invoice / account',      'de',  'rekeningen',            'Mag ik de rekening?',                             'Can I have the bill?',                            'Also: bankrekening (bank account).'),
    n('terras',               'terrace / outdoor seating',     'het', 'terrassen',             'We zitten buiten op het terras.',                 'We are sitting outside on the terrace.',          'Sitting outside a café is a national pastime.'),
    n('keuken',               'kitchen / cuisine',             'de',  'keukens',               'De Italiaanse keuken is mijn favoriet.',          'Italian cuisine is my favourite.',                'Also: the room in your house.'),
    n('gerecht',              'dish / course',                 'het', 'gerechten',             'Het hoofdgerecht is zalm met groenten.',          'The main course is salmon with vegetables.',      'Het hoofdgerecht = the main course.'),
    n('vegetariër',           'vegetarian (person)',           'de',  "vegetariërs",            'Ik ben vegetariër en eet geen vlees.',            'I am a vegetarian and don\'t eat meat.',          'Vegetarisch = vegetarian (adj). Veganist = vegan.'),
    n('dieet',                'diet',                          'het', 'diëten',                'Ze volgt een streng dieet.',                      'She follows a strict diet.',                      'Op dieet zijn = to be on a diet.'),
    n('allergie',             'allergy',                       'de',  'allergieën',            'Ik heb een allergie voor noten.',                 'I have an allergy to nuts.'),
  ]),

  nset('a2-health-body', '🏥', 'Health & Body', [
    n('huisarts',             'GP / family doctor',            'de',  'huisartsen',            'Ik maak een afspraak bij de huisarts.',           'I make an appointment with my GP.',              'First point of contact in Dutch healthcare.'),
    n('recept',               'prescription',                  'het', 'recepten',              'De dokter schrijft een recept voor.',             'The doctor writes a prescription.',               'Medical context. Same word as "recipe".'),
    n('apotheek',             'pharmacy',                      'de',  'apotheken',             'Ik haal mijn medicijnen bij de apotheek.',        'I collect my medication at the pharmacy.'),
    n('verzekering',          'insurance',                     'de',  'verzekeringen',         'Een zorgverzekering is verplicht in Nederland.',  'Health insurance is mandatory in the Netherlands.', 'Zorgverzekering = health insurance.'),
    n('klacht',               'complaint / symptom',           'de',  'klachten',              'Welke klachten heeft u?',                         'What symptoms do you have?',                     'Medical context: symptoms / complaints.'),
    n('bloed',                'blood',                         'het', '-',                     'De dokter neemt bloed af voor onderzoek.',        'The doctor takes blood for testing.',             'Uncountable. Bloeddruk = blood pressure.'),
    n('operatie',             'operation / surgery',           'de',  'operaties',             'Ze ondergaat morgen een operatie.',               'She undergoes an operation tomorrow.'),
    n('litteken',             'scar',                          'het', 'littekens',             'Hij heeft een litteken op zijn arm.',             'He has a scar on his arm.'),
    n('pil',                  'pill / tablet',                 'de',  'pillen',                'Ik slik elke dag een pil.',                       'I take a pill every day.',                        'Also colloquial for the contraceptive pill.'),
    n('afspraak',             'appointment',                   'de',  'afspraken',             'Ik heb een afspraak bij de dokter morgen.',       'I have an appointment with the doctor tomorrow.', 'Een afspraak maken bij de dokter.'),
  ]),

  nset('a2-education-learning', '🎓', 'Education & Learning', [
    n('cijfer',               'grade / mark / digit',          'het', 'cijfers',               'Ze heeft een goed cijfer gehaald.',               'She got a good grade.',                           'Dutch grading: 1–10. A 6 is a pass.'),
    n('opdracht',             'assignment / task',             'de',  'opdrachten',            'De opdracht moet morgen af zijn.',                'The assignment must be finished tomorrow.'),
    n('hoorcollege',          'lecture',                       'het', 'hoorcolleges',          'Het hoorcollege begint om negen uur.',            'The lecture starts at nine o\'clock.',             'Werkcollege = seminar / tutorial.'),
    n('scriptie',             'thesis / dissertation',         'de',  'scripties',             'Hij schrijft zijn scriptie over klimaatverandering.', 'He is writing his thesis about climate change.', 'Proefschrift = PhD dissertation.'),
    n('diploma',              'diploma / certificate',         'het', "diploma's",              'Ze heeft haar diploma gehaald.',                  'She got her diploma.',                            'Je diploma halen = to get your qualification.'),
    n('studie',               'studies / course of study',     'de',  'studies',               'Wat voor studie doe je?',                        'What are you studying?'),
    n('vak',                  'subject / course',              'het', 'vakken',                'Wiskunde is mijn moeilijkste vak.',               'Mathematics is my most difficult subject.'),
    n('stage',                'internship / placement',        'de',  'stages',                'Ik loop stage bij een marketingbedrijf.',         'I am doing an internship at a marketing company.', 'Pronounced "stazje". Stage lopen = to do an internship.'),
    n('tentamen',             'exam',                          'het', 'tentamens',             'Morgen heb ik een tentamen Nederlands.',          'Tomorrow I have a Dutch exam.',                   'University exam. Examen = secondary school exam.'),
    n('beurs',                'scholarship / grant',           'de',  'beurzen',               'Ze heeft een studiebeurs gekregen.',              'She received a study grant.',                     'Studiebeurs = study grant. Also: stock exchange.'),
  ]),

  nset('a2-money-finance', '💶', 'Money & Finance', [
    n('budget',               'budget',                        'het', 'budgetten',             'We moeten binnen het budget blijven.',            'We must stay within budget.'),
    n('schuld',               'debt / fault / blame',          'de',  'schulden',              'Hij heeft veel schulden.',                        'He has a lot of debts.',                          'Schulden maken = to get into debt. Also: "het is mijn schuld".'),
    n('lening',               'loan',                          'de',  'leningen',              'Ze heeft een lening afgesloten bij de bank.',     'She took out a loan at the bank.'),
    n('inkomen',              'income',                        'het', 'inkomens',              'Mijn inkomen is dit jaar gestegen.',              'My income has risen this year.',                  'Modaal inkomen = median income.'),
    n('belasting',            'tax',                           'de',  'belastingen',           'Je moet belasting betalen over je inkomen.',      'You have to pay tax on your income.',             'Belastingdienst = Dutch Tax Authority. BTW = VAT.'),
    n('korting',              'discount',                      'de',  'kortingen',             'Er is twintig procent korting in de uitverkoop.', 'There is a twenty percent discount in the sale.'),
    n('rekening',             'bill / account',                'de',  'rekeningen',            'Ik betaal de rekening via internetbankieren.',   'I pay the bill via internet banking.',            'Bankrekening = bank account.'),
    n('investering',          'investment',                    'de',  'investeringen',         'Het is een goede investering voor de toekomst.', 'It is a good investment for the future.'),
    n('bedrag',               'amount / sum',                  'het', 'bedragen',              'Welk bedrag wil je overmaken?',                  'What amount do you want to transfer?'),
    n('winst',                'profit / win',                  'de',  'winsten',               'Het bedrijf heeft dit jaar winst gemaakt.',       'The company made a profit this year.',            'Opposite: het verlies (loss).'),
  ]),

  nset('a2-nature-environment', '🌿', 'Nature & Environment', [
    n('klimaat',              'climate',                       'het', 'klimaten',              'Het klimaat verandert door CO₂-uitstoot.',        'The climate is changing due to CO₂ emissions.',  'Klimaatverandering = climate change.'),
    n('uitstoot',             'emissions',                     'de',  '-',                     'We moeten de CO₂-uitstoot verminderen.',          'We need to reduce CO₂ emissions.',               'Mostly used without plural.'),
    n('energie',              'energy',                        'de',  'energieën',             'Zonne-energie is duurzaam en schoon.',            'Solar energy is sustainable and clean.',          'Zonne-energie = solar energy. Windenergie = wind energy.'),
    n('afval',                'waste / rubbish',               'het', '-',                     'Je moet afval scheiden voor recycling.',          'You have to separate waste for recycling.',       'Uncountable. Afval scheiden = to separate waste.'),
    n('natuur',               'nature',                        'de',  '-',                     'In de natuur voel ik me vrij.',                   'In nature I feel free.',                          'Natuurgebied = nature reserve.'),
    n('bodem',                'soil / ground / bottom',        'de',  'bodems',                'Bodemvervuiling is een groot probleem.',          'Soil pollution is a big problem.'),
    n('overstroming',         'flood',                         'de',  'overstromingen',        'De overstroming veroorzaakte veel schade.',       'The flood caused a lot of damage.',               'Very relevant in the Netherlands.'),
    n('broeikaseffect',       'greenhouse effect',             'het', '-',                     'Het broeikaseffect maakt de aarde warmer.',       'The greenhouse effect makes the earth warmer.',   'Broeikas = greenhouse. Broeikasgas = greenhouse gas.'),
    n('biodiversiteit',       'biodiversity',                  'de',  '-',                     'De biodiversiteit neemt wereldwijd af.',          'Biodiversity is decreasing worldwide.',           'Mostly uncountable.'),
    n('zonnepaneel',          'solar panel',                   'het', 'zonnepanelen',          'Ze hebben zonnepanelen op het dak geïnstalleerd.', 'They have installed solar panels on the roof.',  'Very common in Dutch households.'),
  ]),

  nset('a2-technology-media', '💻', 'Technology & Media', [
    n('apparaat',             'device / appliance',            'het', 'apparaten',             'Mijn apparaat is kapot en moet gerepareerd worden.', 'My device is broken and needs to be repaired.', 'Mobiel apparaat = mobile device.'),
    n('applicatie',           'app / application',             'de',  'applicaties',           'Ik download een nieuwe applicatie voor mijn telefoon.', 'I download a new app for my phone.',         'Also: de app (informal).'),
    n('wachtwoord',           'password',                      'het', 'wachtwoorden',          'Ik ben mijn wachtwoord vergeten.',                'I forgot my password.'),
    n('verbinding',           'connection',                    'de',  'verbindingen',          'De internetverbinding is traag vandaag.',         'The internet connection is slow today.',          'Internetverbinding = internet connection.'),
    n('scherm',               'screen',                        'het', 'schermen',              'Het scherm van mijn laptop is stuk.',             'The screen of my laptop is broken.'),
    n('software',             'software',                      'de',  '-',                     'De software heeft een update nodig.',             'The software needs an update.',                   'Uncountable.'),
    n('netwerk',              'network',                       'het', 'netwerken',             'Ik breid mijn professionele netwerk uit.',        'I am expanding my professional network.'),
    n('printer',              'printer',                       'de',  'printers',              'De printer doet het niet meer.',                  'The printer is not working anymore.'),
    n('bestand',              'file (digital)',                 'het', 'bestanden',             'Sla het bestand op voordat je sluit.',            'Save the file before you close.',                'Een bestand openen / opslaan = to open / save a file.'),
    n('update',               'update',                        'de',  'updates',               'Er is een nieuwe update beschikbaar voor de app.', 'There is a new update available for the app.',  'Borrowed from English.'),
  ]),

  nset('a2-feelings-abstract', '💭', 'Feelings & Abstract Concepts', [
    n('vertrouwen',           'trust / confidence',            'het', '-',                     'Vertrouwen is de basis van een goede relatie.',  'Trust is the foundation of a good relationship.', 'Mostly uncountable. Vertrouwen hebben in iemand = to trust someone.'),
    n('mening',               'opinion',                       'de',  'meningen',              'Naar mijn mening is dat niet correct.',          'In my opinion that is not correct.',              'Naar mijn mening... = In my opinion...'),
    n('verwachting',          'expectation',                   'de',  'verwachtingen',         'Hij heeft hoge verwachtingen van zichzelf.',      'He has high expectations of himself.'),
    n('teleurstelling',       'disappointment',                'de',  'teleurstellingen',      'Het verlies was een grote teleurstelling.',       'The loss was a big disappointment.',             '"Wat een teleurstelling!" = What a disappointment!'),
    n('gevoel',               'feeling / sense',               'het', 'gevoelens',             'Ik heb een goed gevoel over dit project.',       'I have a good feeling about this project.'),
    n('jaloezie',             'jealousy',                      'de',  '-',                     'Jaloezie kan een relatie kapotmaken.',            'Jealousy can destroy a relationship.',            'Mostly uncountable. Jaloers = jealous (adj).'),
    n('trots',                'pride',                         'de',  '-',                     'Ze straalt van trots na haar diploma.',           'She beams with pride after her diploma.',         'Trots zijn op = to be proud of.'),
    n('angst',                'fear / anxiety',                'de',  'angsten',               'Hij heeft angst voor hoge plaatsen.',             'He has a fear of heights.',                       'Faalangst = fear of failure.'),
    n('hoop',                 'hope',                          'de',  '-',                     'Ze geeft de hoop niet op.',                       'She does not give up hope.',                      'Uncountable in this sense.'),
    n('geduld',               'patience',                      'het', '-',                     'Je hebt veel geduld nodig voor dit vak.',         'You need a lot of patience for this subject.',    'Uncountable.'),
  ]),

  nset('a2-social-cultural', '🎭', 'Social & Cultural Life', [
    n('evenement',            'event',                         'het', 'evenementen',           'Er is een groot evenement in de stad dit weekend.', 'There is a big event in the city this weekend.'),
    n('traditie',             'tradition',                     'de',  'tradities',             'Sinterklaas is een belangrijke Nederlandse traditie.', 'Sinterklaas is an important Dutch tradition.'),
    n('feest',                'party / celebration / holiday', 'het', 'feesten',               'We geven een feest voor haar verjaardag.',        'We are throwing a party for her birthday.',       'Nationale feestdag = national holiday.'),
    n('cultuur',              'culture',                       'de',  'culturen',              'Nederland heeft een rijke en diverse cultuur.',   'The Netherlands has a rich and diverse culture.', 'Multiculturele samenleving = multicultural society.'),
    n('museum',               'museum',                        'het', 'musea',                 'Het Rijksmuseum is een beroemd museum in Amsterdam.', 'The Rijksmuseum is a famous museum in Amsterdam.', 'Irregular plural: musea (not museumsen).'),
    n('tentoonstelling',      'exhibition',                    'de',  'tentoonstellingen',     'We bezoeken een tentoonstelling over Van Gogh.',  'We visit an exhibition about Van Gogh.'),
    n('concert',              'concert',                       'het', 'concerten',             'Vanavond ga ik naar een concert in het Concertgebouw.', 'Tonight I am going to a concert at the Concertgebouw.'),
    n('vereniging',           'association / club',            'de',  'verenigingen',          'Ik ben lid van een sportvereniging.',             'I am a member of a sports club.',                 'Studentenvereniging = student society.'),
    n('lidmaatschap',         'membership',                    'het', 'lidmaatschappen',       'Een lidmaatschap kost vijftien euro per maand.', 'A membership costs fifteen euros per month.'),
    n('vrijheid',             'freedom / liberty',             'de',  'vrijheden',             'Vrijheid van meningsuiting is een grondrecht.',   'Freedom of expression is a fundamental right.'),
  ]),

  nset('a2-places-geography', '🗺️', 'Places & Geography', [
    n('grens',                'border / limit',                'de',  'grenzen',               'We rijden over de grens naar België.',            'We drive across the border to Belgium.',          'Also figurative: grenzen stellen = to set limits.'),
    n('platteland',           'countryside / rural area',      'het', '-',                     'Op het platteland is het rustig en groen.',       'In the countryside it is quiet and green.',       'Opposite of de stad.'),
    n('regio',                'region',                        'de',  "regio's",                'Ik woon in de regio Amsterdam.',                  'I live in the Amsterdam region.'),
    n('provincie',            'province',                      'de',  'provincies',            'Groningen is een provincie in het noorden van Nederland.', 'Groningen is a province in the north of the Netherlands.', 'The Netherlands has 12 provincies.'),
    n('landschap',            'landscape / scenery',           'het', 'landschappen',          'Het Nederlandse landschap is vlak en groen.',     'The Dutch landscape is flat and green.'),
    n('haven',                'harbour / port',                'de',  'havens',                'Rotterdam heeft de grootste haven van Europa.',   'Rotterdam has the largest harbour in Europe.'),
    n('dijk',                 'dike / levee',                  'de',  'dijken',                'De dijken beschermen Nederland tegen overstromingen.', 'The dikes protect the Netherlands against floods.', 'Iconic Dutch word.'),
    n('kanaal',               'canal',                         'het', 'kanalen',               'Amsterdam heeft veel mooie grachten en kanalen.', 'Amsterdam has many beautiful canals.'),
    n('polder',               'polder (reclaimed land)',       'de',  'polders',               'Een groot deel van Nederland is polder.',         'A large part of the Netherlands is reclaimed land.', 'Land reclaimed from the sea or lake.'),
    n('gemeente',             'municipality',                  'de',  'gemeenten',             'Ik ga naar het gemeentehuis om me in te schrijven.', 'I go to the town hall to register.',             'Bij de gemeente werken = to work for the local council.'),
  ]),

  nset('a2-time-planning', '📅', 'Time & Planning', [
    n('agenda',               'diary / calendar / agenda',     'de',  "agenda's",               'Ik zet de afspraak in mijn agenda.',              'I put the appointment in my diary.',             'Also: the agenda of a meeting.'),
    n('schema',               'schedule / scheme / diagram',   'het', "schema's",               'We werken volgens een vast schema.',              'We work according to a fixed schedule.',          'Volgens schema = on schedule.'),
    n('periode',              'period / phase',                'de',  'periodes',              'In die periode was hij erg druk.',                'During that period he was very busy.'),
    n('fase',                 'phase / stage',                 'de',  'fasen',                 'We zitten nu in de laatste fase van het project.', 'We are now in the final phase of the project.'),
    n('moment',               'moment',                        'het', 'momenten',              'Op dit moment ben ik bezig met een rapport.',     'At this moment I am working on a report.',        'Op dit moment = at this moment / currently.'),
    n('gelegenheid',          'occasion / opportunity',        'de',  'gelegenheden',          'Bij gelegenheid praten we daar verder over.',     'On occasion we will discuss that further.',       'De gelegenheid aangrijpen = to seize the opportunity.'),
    n('afspraak',             'appointment / arrangement',     'de',  'afspraken',             'Ik heb een afspraak bij de huisarts om drie uur.', 'I have an appointment with my GP at three o\'clock.', 'Een afspraak maken = to make an appointment.'),
    n('uitstel',              'postponement / delay',          'het', '-',                     'De vergadering heeft uitstel gekregen.',          'The meeting has been postponed.',                 'Mostly uncountable. Uitstel vragen = to ask for an extension.'),
    n('herinnering',          'memory / reminder',             'de',  'herinneringen',         'Die dag bewaar ik als een mooie herinnering.',    'I keep that day as a beautiful memory.'),
    n('toekomst',             'future',                        'de',  '-',                     'In de toekomst wil ik mijn eigen bedrijf starten.', 'In the future I want to start my own company.',  'Uncountable.'),
  ]),

];
