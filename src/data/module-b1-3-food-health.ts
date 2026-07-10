import { ReadingText } from '@/types/dutch';

const M = 'b1-food-health' as const;
const MT = 'Eten en gezondheid';

export const moduleB1_3Texts: ReadingText[] = [
  {
    id: 'b1m3-1',
    title: 'Wat er in de pan gaat',
    titleTranslation: 'What Goes in the Pan',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Op zaterdagochtend staat Fatima in haar keuken. Op het aanrecht liggen uien, koriander, knoflook, een blik tomaten en een stuk lamsvlees. Ze heeft dit recept honderden keren gezien — haar moeder maakte het elke vrijdag, en haar grootmoeder daarvoor ook.

Ze begint te snijden. De ui eerst, dan de knoflook. Het helpt om te snijden — de beweging is vertrouwd, en de gedachten worden rustiger terwijl haar handen bezig zijn. De geur vult de keuken en ze ademt even diep in. Het ruikt naar thuis — niet naar het appartement op de eerste etage, maar naar het andere thuis, het oudere.

Fatima heeft Lisa uitgenodigd voor het avondeten. En Anna ook, als Anna wil. Fatima heeft het aangeboden zonder er lang over na te denken, maar nu ze hier staat, realiseert ze zich dat het iets anders voelt dan gewoon koken. Ze wil dat het goed is. Ze wil dat zij begrijpen wat ze eten.

Ze doet de ui in de pan. Het vet is warm en de ui begint meteen te sissen. Fatima roert langzaam. Ze denkt aan haar moeder die altijd zei: je kunt een recept lezen, maar koken leer je met je handen.

Ze voegt de knoflook toe, dan de specerijen. Komijn, paprika, een beetje kaneel. De keuken verandert. De geur wordt zwaarder, voller, iets dat zich vastzet.

Buiten is het bewolkt. De dag is grijs. Maar in de keuken is het warm en het ruikt naar iets dat tijd heeft gekost.

Ze roert nog een keer en probeert om het gevoel vast te houden — dit moment, deze geur, deze stilte. Ze denkt: dit is een goede maaltijd. Niet alleen voor het eten. Voor alles eromheen.`,
    words: {
      aanrecht:    { english: 'kitchen counter' },
      vertrouwd:   { english: 'familiar / trusted' },
      sissen:      { english: 'to sizzle / hiss' },
      roeren:      { english: 'to stir' },
      geur:        { english: 'smell / scent' },
      specerijen:  { english: 'spices' },
      vastzet:     { english: 'settles / clings (of a smell)' },
    },
    comprehensionQuestions: [
      { question: 'Wat ligt er op het aanrecht in Fatima\'s keuken?', options: ['Groenten en vis', 'Uien, koriander, knoflook, tomaten en lamsvlees', 'Brood en kaas'], correctIndex: 1 },
      { question: 'Wie heeft Fatima uitgenodigd voor het avondeten?', options: ['Alleen Lisa', 'Lisa en Anna', 'Tom en Marc'], correctIndex: 1 },
      { question: 'Wat zei Fatima\'s moeder altijd?', options: ['Goede specerijen zijn het belangrijkste', 'Je kunt een recept lezen, maar koken leer je met je handen', 'Koken is moeilijk zonder oefening'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-2',
    title: 'Wat we eten en waarom',
    titleTranslation: 'What We Eat and Why',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Voeding is brandstof. Maar het is ook veel meer dan dat. Wat mensen eten, hoe ze het bereiden en met wie ze aan tafel zitten, zegt iets over wie ze zijn en waar ze vandaan komen.

De basis van gezond eten

Het lichaam heeft eiwitten, koolhydraten, vetten, vitaminen en mineralen nodig. Geen van deze groepen is slecht — het gaat om balans en variatie. Een maaltijd die veel groenten, peulvruchten, volkoren granen en een bron van eiwit bevat, geeft het lichaam wat het nodig heeft.

Bewerkt voedsel — producten met veel suiker, zout en toevoegingen — is niet per se gevaarlijk in kleine hoeveelheden, maar wordt een probleem als het de basis van de voeding wordt. Het lichaam raakt dan tekort aan voedingsstoffen die het nodig heeft voor herstel, concentratie en energie.

Eetgewoonten zijn meer dan keuzes

Wat mensen eten, wordt sterk beïnvloed door opvoeding, cultuur, inkomen en beschikbaarheid. Iemand die is opgegroeid met dagelijks vers gekookte maaltijden, heeft andere gewoonten dan iemand die altijd snel at tussen andere verplichtingen door.

Dat betekent dat het veranderen van eetgewoonten mogelijk is, maar niet eenvoudig. Kleine, haalbare aanpassingen werken beter dan radicale veranderingen die niemand volhoudt.

Bewust eten

Steeds meer mensen proberen bewuster te eten — niet als dieet, maar als aandacht. Langzamer eten, merken wat je lekker vindt en waarom, nadenken over waar voedsel vandaan komt. Dat klinkt eenvoudig. Maar in een drukke dag is het iets wat je moet oefenen, net als andere gewoonten.`,
    words: {
      brandstof:       { english: 'fuel' },
      eiwitten:        { english: 'proteins' },
      peulvruchten:    { english: 'legumes / pulses' },
      bewerkt:         { english: 'processed' },
      voedingsstoffen: { english: 'nutrients' },
      haalbare:        { english: 'achievable / feasible' },
      bewust:          { english: 'conscious / mindful' },
    },
    comprehensionQuestions: [
      { question: 'Wat heeft het lichaam nodig volgens de tekst?', options: ['Alleen eiwitten en vitaminen', 'Eiwitten, koolhydraten, vetten, vitaminen en mineralen', 'Veel suiker en vet'], correctIndex: 1 },
      { question: 'Waarom is bewerkt voedsel een probleem?', options: ['Het is altijd gevaarlijk', 'Het is een probleem als het de basis van de voeding wordt', 'Het heeft te weinig calorieën'], correctIndex: 1 },
      { question: 'Wat bedoelt de tekst met "bewust eten"?', options: ['Een streng dieet volgen', 'Met aandacht eten en nadenken over wat je eet', 'Alleen biologisch voedsel kopen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-3',
    title: 'Het avondeten',
    titleTranslation: 'The Dinner',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Lisa en Anna komen om zeven uur. Fatima heeft de tafel gedekt met een kleed dat ze uit Marokko heeft meegenomen — oranje met kleine geometrische patronen. Ze zet het eten in het midden: een grote schaal met het gestoofde lamsvlees, een schaal couscous, een kommetje geroosterde groenten.

„Wat ruikt dit goed," zegt Lisa. Ze gaat zitten en kijkt naar de schalen. „Heb jij dit allemaal zelf gemaakt?"

„Ja. Het is niet zo moeilijk. Alleen tijd."

Anna kijkt naar de tafel. „Bij ons thuis aten we altijd apart. Ieder z'n eigen bord. Dit is anders."

„Zo eten wij altijd," zegt Fatima. „Alles in het midden. Je pakt wat je wilt."

Ze beginnen te eten. Een tijdje zeggen ze weinig — het eten vraagt aandacht. Dan zegt Lisa: „Wat zit er precies in? Ik proef iets wat ik niet kan benoemen."

„Kaneel," zegt Fatima. „En komijn. En een beetje gember."

„Kaneel in hartig eten," zegt Anna. „Dat is bij mij thuis ondenkbaar."

„Bij ons is het heel normaal. Zoet en hartig gaan samen. Dat is een verschil met de Nederlandse keuken, denk ik."

„Wat vind je van de Nederlandse keuken?" vraagt Lisa.

Fatima denkt even na. Ze wil eerlijk zijn maar niet onbeleefd. „Eenvoudig," zegt ze uiteindelijk. „Niet slecht. Maar minder... gelaagd."

Lisa lacht. „Dat is diplomatiek."

„Ik leer het nog," zegt Fatima droog.

Ze eten verder. De schalen worden langzaam leeg. Buiten begint het te regenen.`,
    words: {
      kleed:       { english: 'cloth / tablecloth' },
      gestoofd:    { english: 'stewed / braised' },
      benoemen:    { english: 'to name / identify' },
      hartig:      { english: 'savoury' },
      gelaagd:     { english: 'layered / complex' },
      diplomatiek: { english: 'diplomatic' },
      gember:      { english: 'ginger' },
    },
    comprehensionQuestions: [
      { question: 'Hoe heeft Fatima de tafel gedekt?', options: ['Met een wit kleed', 'Met een oranje kleed met geometrische patronen uit Marokko', 'Zonder kleed'], correctIndex: 1 },
      { question: 'Welk ingrediënt kan Lisa niet benoemen?', options: ['Knoflook', 'Kaneel', 'Gember'], correctIndex: 1 },
      { question: 'Wat zegt Fatima over de Nederlandse keuken?', options: ['Het is slecht', 'Het is eenvoudig maar minder gelaagd', 'Het is haar favoriete keuken'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-4',
    title: 'De Nederlandse eetcultuur',
    titleTranslation: 'Dutch Food Culture',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Wie voor het eerst in Nederland eet, valt één ding snel op: het is anders dan in de meeste andere landen. Niet slechter — anders. En die verschillen zeggen iets interessants over de Nederlandse cultuur.

Brood als basis

De gemiddelde Nederlander eet twee keer per dag brood: 's ochtends en 's middags. Pas 's avonds wordt er warm gegeten. In veel andere culturen is dit omgekeerd, of wordt er meerdere keren per dag warm gegeten.

Dit patroon heeft historische wortels. Nederland was een handelsnatie — snel, efficiënt, pragmatisch. Een boterham met kaas is makkelijk te maken en geeft energie. Dat die gewoonte eeuwen later nog steeds de standaard is, zegt iets over hoe diep eetgewoonten verankerd zijn.

Portie en presentatie

Nederlanders eten over het algemeen kleinere porties dan mensen in zuidelijke Europese landen of in het Midden-Oosten en Noord-Afrika. De presentatie is ook eenvoudiger — het gaat om de smaak en de voeding, minder om het ritueel rondom de maaltijd.

Voor mensen die zijn opgegroeid met uitgebreide eettafels, veel schalen en lang tafelen kan de Nederlandse manier van eten eerst kaal aanvoelen. Maar er is ook iets rustigs aan: eten is eten, niet een prestatie.

Wat verandert

De Nederlandse eetcultuur verandert. Steden als Amsterdam hebben een enorm aanbod aan internationale keukens. Jongere generaties koken vaker met ingrediënten uit andere culturen. Bewust eten en duurzaamheid zijn belangrijke thema's geworden.

De boterham met kaas is er nog. Maar hij deelt de tafel tegenwoordig met veel meer.`,
    words: {
      handelsnatie: { english: 'trading nation' },
      boterham:     { english: 'slice of bread / sandwich' },
      verankerd:    { english: 'ingrained / anchored' },
      portie:       { english: 'portion' },
      tafelen:      { english: 'to dine (at length)' },
      kaal:         { english: 'bare / sparse' },
      aanbod:       { english: 'range / supply' },
    },
    comprehensionQuestions: [
      { question: 'Wanneer eten Nederlanders gemiddeld warm?', options: ['\'s Ochtends', '\'s Middags', '\'s Avonds'], correctIndex: 2 },
      { question: 'Waarom is de boterham met kaas zo populair?', options: ['Het is de goedkoopste optie', 'Het past bij de efficiënte, pragmatische handelscultuur', 'Nederlanders houden niet van warm eten'], correctIndex: 1 },
      { question: 'Wat verandert er in de Nederlandse eetcultuur?', options: ['Nederlanders eten nu vaker brood', 'Er is meer aanbod van internationale keukens', 'De porties worden groter'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-5',
    title: 'Fatima belt haar moeder',
    titleTranslation: 'Fatima Calls Her Mother',
    level: 'B1', module: M, moduleTitle: MT,
    content: `De volgende ochtend belt Fatima haar moeder. Het is zondag, en op zondag bellen ze altijd — dat is al zo sinds Fatima naar Nederland is gekomen.

„Hoe was het eten?" vraagt haar moeder meteen. Fatima had haar de avond ervoor een berichtje gestuurd met een foto van de tafel.

„Goed. Ze vonden het lekker."

„Hebben ze de couscous goed gegeten?"

„Alles op. De schalen waren leeg."

Haar moeder lacht. Fatima herinnert zich hoe die lach klinkt in een echte kamer — niet via een telefoon, maar gewoon aanwezig, in de keuken in Casablanca, met het licht dat 's middags door het raam komt. Het is moeilijk om dat gevoel te beschrijven aan iemand die het niet kent.

„Heb je het recept precies gedaan zoals ik het je heb geleerd?"

„Bijna," zegt Fatima. „Ik had geen verse koriander, dus ik heb gedroogde gebruikt."

Een korte stilte. „Gedroogde koriander is niet hetzelfde."

„Nee. Maar het was wel lekker."

„Volgende keer vers." Haar moeder zegt het zonder discussie, maar niet streng. Gewoon als een feit.

Fatima glimlacht. Ze vraagt naar haar broer, naar de buren, of het warm is. Haar moeder vertelt. Fatima luistert en kijkt uit het raam naar de Amsterdamse straat, die nat en grijs is na de regen van gisteravond.

Er is een moment waarop ze zich realiseert dat ze tegelijk hier en daar is — in de keuken in Amsterdam en in de keuken in Casablanca — en ze weet niet precies welk gevoel groter is: het thuisgevoel dat het gesprek geeft, of het gemis dat erna komt.

Ze blijven nog lang aan de telefoon.`,
    words: {
      berichtje:   { english: 'text message / little message' },
      gedroogde:   { english: 'dried' },
      vers:        { english: 'fresh' },
      glimlacht:   { english: 'smiles' },
      thuisgevoel: { english: 'feeling of home / belonging' },
      gemis:       { english: 'longing / sense of loss' },
      aanwezig:    { english: 'present / there' },
    },
    comprehensionQuestions: [
      { question: 'Wanneer belt Fatima haar moeder?', options: ['Elke dag', 'Elke zondag', 'Elke vrijdag'], correctIndex: 1 },
      { question: 'Welk ingrediënt had Fatima niet vers?', options: ['Komijn', 'Koriander', 'Knoflook'], correctIndex: 1 },
      { question: 'Welke twee gevoelens beschrijft Fatima aan het einde?', options: ['Blij en verdrietig', 'Thuisgevoel en gemis', 'Trots en teleurstelling'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-6',
    title: 'Tom en het eten',
    titleTranslation: 'Tom and Food',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Tom heeft van Fatima gehoord wat ze heeft gemaakt. Lisa heeft hem de foto gestuurd en hij had meteen geschreven: Waarom was ik niet uitgenodigd?

Fatima had teruggeschreven: Volgende keer jij ook.

Die volgende keer is twee weken later, op een vrijdagavond. Tom komt met Marc, en Fatima heeft opnieuw gekookt — dit keer een andere maaltijd, met aubergine en kikkererwten en een saus die hij niet kan benoemen maar waarvan hij twee keer opschept.

„Wat eet jij normaal?" vraagt Fatima aan Tom. Ze is nieuwsgierig, niet kritisch.

Tom denkt na. „Pasta. Brood. Af en toe soep. Soms iets uit de oven."

„Kook jij dat zelf?"

„Soms. Maar eerlijk gezegd kook ik weinig. Ik eet meer dan dat ik kook."

Marc knikt. „Tom heeft altijd iets in de koelkast wat hij 'nog moet opmaken'."

Tom lacht. „Dat klopt. Ik verspil te veel."

Fatima kijkt hem aan. „Koken is niet zo moeilijk als je denkt. Het is vooral een gewoonte. Als je het vaker doet, wordt het makkelijker."

„Dat zeg jij. Jij bent er goed in."

„Ik ben er goed in omdat ik het al mijn hele leven doe. Mijn moeder heeft me leren koken toen ik acht was." Ze pakt de schaal en biedt hem nog een keer aan. „Begin met één recept. Dat je echt goed leert. Dan heb je altijd iets."

„Mag ik dit recept?" vraagt Tom.

„Als je belooft het echt te maken."

Tom aarzelt. „Ik weet niet of ik er goed in ben. Koken kost tijd, en ik doe het al zo weinig dat ik niet weet waar ik moet beginnen als het om een maaltijd als deze gaat."

„Dat is precies waarom je moet beginnen," zegt Fatima. „Niet met dit gerecht — dit is te veel voor de eerste keer. Maar met iets eenvoudigs. Iets wat je kunt bereiden zonder nadenken. Dan bouw je het op."

Tom kijkt naar de schaal. „Oké," zegt hij uiteindelijk. „Beloofd."`,
    words: {
      aubergine:    { english: 'aubergine / eggplant' },
      kikkererwten: { english: 'chickpeas' },
      opschept:     { english: 'serves oneself / helps oneself to more' },
      verspillen:   { english: 'to waste' },
      aarzelt:      { english: 'hesitates' },
      gerecht:      { english: 'dish / meal' },
      bereiden:     { english: 'to prepare / cook' },
    },
    comprehensionQuestions: [
      { question: 'Waarom was Tom niet bij het eerste avondeten?', options: ['Hij was ziek', 'Fatima had hem niet uitgenodigd', 'Hij was op reis'], correctIndex: 1 },
      { question: 'Wat zegt Marc over Tom?', options: ['Tom kookt graag', 'Tom heeft altijd iets in de koelkast wat hij nog moet opmaken', 'Tom eet heel weinig'], correctIndex: 1 },
      { question: 'Wat adviseert Fatima aan Tom?', options: ['Een kookles te volgen', 'Te beginnen met één recept dat hij echt goed leert', 'Elke dag een nieuw gerecht te proberen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-7',
    title: 'Eten en hoe het ons beïnvloedt',
    titleTranslation: 'Food and How It Affects Us',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Wat we eten heeft gevolgen voor hoe we ons voelen — niet alleen fysiek, maar ook mentaal. Die verbinding is sterker dan veel mensen denken.

Het brein en voeding

Het brein heeft veel energie nodig: ongeveer twintig procent van alle calorieën die het lichaam verbruikt, gaat naar de hersenen. Maar niet alle voeding geeft het brein dezelfde kwaliteit energie. Suiker geeft een snelle piek — gevolgd door een dip. Complexe koolhydraten, zoals volkorenbrood en peulvruchten, geven langzamer en stabieler energie.

Bepaalde voedingsstoffen spelen ook een directe rol in de aanmaak van stoffen die stemming en concentratie beïnvloeden. Omega-3 vetzuren, te vinden in vette vis en walnoten, zijn belangrijk voor de hersenfunctie. IJzer en vitamine B12 beïnvloeden vermoeidheid en concentratie.

Eten en stress

Stress beïnvloedt ook wat mensen eten. Onder druk grijpen veel mensen naar snelle, calorierijke voeding — zoet, zout, vet. Dat is geen zwakte, maar biologie: het stresshormoon cortisol verhoogt de behoefte aan energie.

Het probleem is dat dit patroon op lange termijn averechts werkt. Te weinig groenten, te veel bewerkt voedsel en onregelmatige maaltijden versterken de gevolgen van stress in plaats van ze te verminderen.

Wat helpt

Regelmatig eten — drie maaltijden op vaste tijden — geeft het lichaam structuur en voorkomt energiedips. Maaltijden bereiden in plaats van kant-en-klaar kopen geeft meer controle over ingrediënten.

En samen eten helpt. Niet alleen voor de voeding, maar voor alles eromheen.`,
    words: {
      hersenen:     { english: 'brain / brains' },
      calorieën:    { english: 'calories' },
      piek:         { english: 'peak / spike' },
      cortisol:     { english: 'cortisol (stress hormone)' },
      averechts:    { english: 'counterproductive / the opposite effect' },
      energiedips:  { english: 'energy dips / crashes' },
      vetzuren:     { english: 'fatty acids' },
    },
    comprehensionQuestions: [
      { question: 'Hoeveel procent van de calorieën gaat naar de hersenen?', options: ['Tien procent', 'Twintig procent', 'Dertig procent'], correctIndex: 1 },
      { question: 'Waarom grijpen mensen onder stress naar calorierijk voedsel?', options: ['Omdat ze lui zijn', 'Omdat cortisol de behoefte aan energie verhoogt', 'Omdat gezond eten te duur is'], correctIndex: 1 },
      { question: 'Wat helpt volgens de tekst om energiedips te voorkomen?', options: ['Veel suiker eten', 'Regelmatig eten op vaste tijden', 'Minder slapen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-8',
    title: 'Lisa en het schilderen zonder eten',
    titleTranslation: 'Lisa and Painting Without Eating',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Lisa vergeet soms te eten als ze schildert. Niet expres — ze merkt het gewoon niet. Ze is bezig, de tijd gaat voorbij, en pas als het al vijf uur is geweest, realiseert ze zich dat ze alleen koffie heeft gehad. Omdat ze had doorgeschilderd zonder even te stoppen, is er de hele middag niets anders in haar hoofd geweest.

Fatima weet dit inmiddels. Op een woensdagmiddag stuurt ze een berichtje: Heb je al gegeten?

Lisa kijkt naar haar scherm. Het is half vier. Koffie, stuurt ze terug.

Tien minuten later klopt Fatima op de deur met een bord. Er liggen plakjes brood op: kaas, wat gesneden groenten. Niets bijzonders. Maar het is eten.

„Je kunt niet de hele dag schilderen zonder iets te eten," zegt Fatima.

„Ik vergeet het gewoon," zegt Lisa. Ze neemt een hap, terwijl ze het bord had neergezet op de vensterbank zodat ze kon blijven staan. „Dank je."

„Dat snap ik niet," zegt Fatima. Ze gaat op de stoel bij het raam zitten. „Bij ons thuis was eten nooit iets wat je vergat. Het was het midden van de dag. Alles stopte voor de maaltijd. Het was ook moeilijk om op te houden met wat je deed — maar je deed het."

„Hier ook vroeger, denk ik," zegt Lisa. „Maar ik woon alleen. Er is niemand die zegt: kom aan tafel."

Fatima kijkt naar het schilderij op de ezel. Het is groot — donkere kleuren, iets onrustigs erin. „Wat is dat?"

„Weet ik nog niet precies," zegt Lisa. „Dat is het probleem."

„Of het is interessant," zegt Fatima.

Lisa kijkt opzij. „Jij klinkt als Anna."

„Neem dat als een compliment."

Lisa lacht en neemt nog een hap. Het brood is gewoon brood, maar het helpt.`,
    words: {
      doorgeschilderd: { english: 'painted without stopping / painted through' },
      inmiddels:       { english: 'by now / in the meantime' },
      hap:             { english: 'bite (of food)' },
      vensterbank:     { english: 'windowsill' },
      ezel:            { english: 'easel' },
      bijzonders:      { english: 'special / out of the ordinary' },
      onrustigs:       { english: 'something restless / unsettling' },
    },
    comprehensionQuestions: [
      { question: 'Waarom vergeet Lisa te eten?', options: ['Ze is op dieet', 'Ze is zo gefocust op schilderen dat ze de tijd vergeet', 'Ze heeft geen honger'], correctIndex: 1 },
      { question: 'Wat brengt Fatima mee als ze aanklopt?', options: ['Een warme maaltijd', 'Een bord met brood, kaas en groenten', 'Een kopje koffie'], correctIndex: 1 },
      { question: 'Wat zegt Lisa over haar schilderij?', options: ['Het is af', 'Ze weet nog niet precies wat het is', 'Het is mislukt'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-9',
    title: 'Voedsel en identiteit',
    titleTranslation: 'Food and Identity',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Eten is nooit alleen voeding. Het is ook herinnering, cultuur, verbondenheid en identiteit. Wat mensen eten — en hoe, en met wie — is een van de meest persoonlijke dingen die er zijn.

Voedsel als verbinding

Voor mensen die ver van huis wonen, is eten een van de sterkste verbindingen met hun herkomst. Een geur kan een herinnering oproepen die taal niet kan bereiken. Het bereiden van een vertrouwd recept is soms meer dan koken — het is een manier om contact te houden met iets wat ver weg is.

Onderzoekers die studeren naar migratie en identiteit beschrijven voedsel als een van de meest stabiele culturele uitingen. Taal verandert, kleding verandert, gewoonten passen zich aan — maar het recept van je moeder blijft.

Eten als grens

Tegelijk kunnen eetgewoonten ook een grens vormen. Mensen die anders eten dan de mensen om hen heen, kunnen zich buitengesloten voelen. Of ze voelen druk om zich aan te passen — om te eten wat er gegeten wordt, om geen moeite te zijn.

Dat is een spanning die veel mensen kennen die in een nieuw land wonen. Hoever pas je je aan, en wat houd je vast? Er is geen eenvoudig antwoord. Sommige mensen kiezen er bewust voor om hun eetgewoonten te bewaren als een vorm van identiteit. Anderen passen zich geleidelijk aan en merken pas later dat er iets veranderd is — niet door een beslissing, maar gewoon door de tijd.

Gedeelde tafels

Maar eten kan ook een brug zijn. Een maaltijd delen met mensen die anders zijn opgegroeid, openstaan voor een geur die je niet kent, vragen stellen over wat er in de pan zit — dat zijn kleine maar echte momenten van verbinding.

Aan tafel zijn talen niet altijd nodig.`,
    words: {
      verbondenheid:  { english: 'connection / togetherness' },
      herkomst:       { english: 'origin / background' },
      uitingen:       { english: 'expressions / manifestations' },
      buitengesloten: { english: 'excluded / left out' },
      geleidelijk:    { english: 'gradually' },
      identiteit:     { english: 'identity' },
      bewaren:        { english: 'to preserve / keep' },
    },
    comprehensionQuestions: [
      { question: 'Wat beschrijven onderzoekers als een van de meest stabiele culturele uitingen?', options: ['Taal', 'Kleding', 'Voedsel'], correctIndex: 2 },
      { question: 'Waarom kunnen eetgewoonten een grens vormen?', options: ['Omdat eten duur is in een nieuw land', 'Omdat mensen die anders eten zich buitengesloten kunnen voelen', 'Omdat eten tijd kost'], correctIndex: 1 },
      { question: 'Wat is de boodschap van "Gedeelde tafels"?', options: ['Eten is alleen voor thuis', 'Een maaltijd delen kan een brug zijn tussen mensen', 'Taal is de beste manier om te verbinden'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m3-10',
    title: 'Na het eten',
    titleTranslation: 'After the Meal',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Het is een donderdagavond. Anna, Tom, Lisa, Marc en Fatima zitten na het eten aan Fatima's tafel. De schalen zijn leeg. Iemand heeft de laatste stukjes brood gebruikt om de saus op te vegen — dat vindt Fatima altijd een goed teken.

Marc heeft thee gezet, want Fatima had gevraagd of iemand dat wilde doen terwijl zij even ging zitten.

„Je kookt altijd voor iedereen," zegt Anna. „Maar je laat nooit iemand helpen."

„Ik kook graag," zegt Fatima. „Helpen in mijn keuken is... ingewikkeld."

„Hoezo?"

Fatima denkt na. „Iedereen doet het anders. En als iemand iets anders doet, moet ik me inhouden om het niet over te nemen."

Tom lacht. „Dat is eerlijk."

„Maar ik kan wel afwassen," zegt Marc.

„Dat mag," zegt Fatima. „Afwassen doe ik niet graag."

Ze lachen. Buiten is het donker. De regen is gestopt.

Lisa kijkt naar de lege schalen. „Ik denk elke keer als ik hier eet dat ik vaker zelf moet koken. Echt koken, bedoel ik. Niet alleen brood of pasta."

„Wat houdt je tegen?" vraagt Fatima.

„Tijd. En het idee dat het moeilijk is."

„Het is niet moeilijk," zegt Fatima. „Het is alleen onbekend. Dat is een verschil."

Anna knikt langzaam. Ze denkt aan wat Ria haar een paar weken geleden zei — dat de meeste belangrijke dingen dingen zijn die je leert. Koken, rusten, aanwezig zijn. Het zijn allemaal gewoonten die je oefent.

„Misschien moeten we een avond koken met z'n allen," zegt Tom.

„Ja," zegt Fatima. „Maar dan in mijn keuken. En ik geef de opdrachten."`,
    words: {
      saus:        { english: 'sauce' },
      ingewikkeld: { english: 'complicated' },
      inhouden:    { english: 'to hold back / restrain oneself' },
      afwassen:    { english: 'to do the dishes / wash up' },
      onbekend:    { english: 'unfamiliar / unknown' },
      opdrachten:  { english: 'instructions / assignments' },
      aanwezig:    { english: 'present' },
    },
    comprehensionQuestions: [
      { question: 'Waarom is helpen in Fatima\'s keuken "ingewikkeld"?', options: ['De keuken is te klein', 'Ze moet zich inhouden als iemand iets anders doet', 'Ze kookt altijd alleen'], correctIndex: 1 },
      { question: 'Wie biedt aan om af te wassen?', options: ['Tom', 'Anna', 'Marc'], correctIndex: 2 },
      { question: 'Wat stelt Tom voor aan het einde?', options: ['Vaker bij een restaurant te eten', 'Een avond koken met z\'n allen', 'Fatima een kookboek te geven'], correctIndex: 1 },
    ],
    completed: false,
  },
];
