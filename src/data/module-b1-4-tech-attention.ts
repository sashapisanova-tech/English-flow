import { ReadingText } from '@/types/dutch';

const M = 'b1-tech-attention' as const;
const MT = 'Technologie en aandacht';

export const moduleB1_4Texts: ReadingText[] = [
  {
    id: 'b1m4-1',
    title: 'De telefoon in de zak',
    titleTranslation: 'The Phone in the Pocket',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Marc werkt als grafisch ontwerper bij een klein bureau in Amsterdam. Hij werkt veel alleen — aan zijn bureau, met zijn scherm, en zijn telefoon naast zijn laptop. De telefoon ligt er altijd. Niet omdat hij het per se nodig heeft, maar omdat hij er altijd is, zoals een glas water of een pen.

Maar hij merkt iets. Als hij diep in een ontwerp zit — echt geconcentreerd, de wereld een beetje vergeten — dan gaat zijn telefoon. Een berichtje. Een notificatie. Niet altijd iets belangrijks. Soms zelfs helemaal niets. Maar hij pakt hem op. En dan is hij weg uit die concentratie, en het duurt daarna een tijdje voor hij er weer in zit.

Hij heeft dit al een tijdje in de gaten, maar heeft er nog niets mee gedaan. Het voelt te klein om over na te denken. En toch, als hij eerlijk is, stoort het hem.

Op een ochtend legt hij de telefoon aan de andere kant van de kamer. Gewoon als experiment. Hij gaat zitten, opent zijn project en begint te werken.

Na een uur kijkt hij op. Het is stil. Hij heeft geen telefoon gecheckt. Het werk ligt voor hem, iets verder dan gewoonlijk, iets concreter. Hij heeft een beslissing gemaakt waar hij al een tijdje over twijfelde.

Hij staat op, loopt naar de andere kant van de kamer, pakt zijn telefoon. Er zijn drie berichten. Geen van alle zijn ze dringend.

Hij legt de telefoon terug en gaat verder.`,
    words: {
      ontwerper:    { english: 'designer' },
      notificatie:  { english: 'notification' },
      concentratie: { english: 'concentration / focus' },
      'in de gaten': { english: 'noticed / aware of' },
      stoort:       { english: 'bothers / disturbs' },
      twijfelde:    { english: 'doubted / hesitated' },
      dringend:     { english: 'urgent' },
    },
    comprehensionQuestions: [
      { question: 'Wat merkt Marc als hij geconcentreerd werkt?', options: ['Hij vergeet te eten', 'Zijn telefoon verstoort zijn concentratie', 'Hij wordt moe'], correctIndex: 1 },
      { question: 'Wat doet Marc als experiment?', options: ['Hij zet zijn telefoon uit', 'Hij legt zijn telefoon aan de andere kant van de kamer', 'Hij werkt zonder laptop'], correctIndex: 1 },
      { question: 'Hoe dringend zijn de drie berichten die Marc na een uur ontvangt?', options: ['Allemaal dringend', 'Geen van alle dringend', 'Één dringend bericht'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-2',
    title: 'Aandacht in de digitale tijd',
    titleTranslation: 'Attention in the Digital Age',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Aandacht is een beperkte hulpbron. Net als tijd, energie of geld — er is een maximum, en wat je eraan geeft, is niet meer beschikbaar voor iets anders.

Hoe aandacht werkt

Het brein kan zich diep concentreren op één ding tegelijk. Wat wij "multitasking" noemen, is eigenlijk snel schakelen tussen taken — en bij elke wissel gaat er iets verloren. Focustijd, mentale energie, de draad van een gedachte.

Onderzoekers hebben aangetoond dat het gemiddeld meer dan twintig minuten duurt om na een onderbreking weer volledig geconcentreerd te zijn. Dat betekent dat één notificatie een uur werk kan kosten — niet omdat het bericht lang is, maar omdat de hersenen tijd nodig hebben om terug te keren naar diepe focus.

Technologie en aandacht

Moderne technologie is ontworpen om aandacht te vragen en vast te houden. Notificaties, eindeloze scrollfuncties, aanbevelingsalgoritmen — al deze systemen zijn gebouwd om zo lang mogelijk in gebruik te blijven. Dat is geen bijwerking. Het is het doel.

Dit betekent niet dat technologie per se slecht is. Maar het betekent wel dat een smartphone of sociale media niet neutraal zijn — ze oefenen druk uit op hoe mensen hun aandacht verdelen.

Wat mensen kunnen doen

Veel mensen die zich bewust zijn van dit probleem, kiezen voor strategieën als tijdsblokken — vaste periodes van focuswerk zonder onderbreking. Anderen schakelen notificaties uit, laten hun telefoon in een andere kamer, of gebruiken apps die hun schermtijd bijhouden.

De kern is hetzelfde: aandacht is actief beheren, niet passief volgen.`,
    words: {
      hulpbron:         { english: 'resource' },
      multitasking:     { english: 'multitasking' },
      wissel:           { english: 'switch / changeover' },
      onderbreking:     { english: 'interruption' },
      aanbevelingsalgoritmen: { english: 'recommendation algorithms' },
      tijdsblokken:     { english: 'time blocks' },
      schermtijd:       { english: 'screen time' },
    },
    comprehensionQuestions: [
      { question: 'Hoelang duurt het gemiddeld om na een onderbreking weer volledig geconcentreerd te zijn?', options: ['Vijf minuten', 'Meer dan twintig minuten', 'Een uur'], correctIndex: 1 },
      { question: 'Waarom zijn notificaties en scrollfuncties in apps ingebouwd?', options: ['Om gebruikers te helpen', 'Om zo lang mogelijk aandacht vast te houden', 'Om technologie veiliger te maken'], correctIndex: 1 },
      { question: 'Wat is de kern van de aanbeveling in de tekst?', options: ['Technologie vermijden', 'Aandacht actief beheren', 'Minder werken'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-3',
    title: 'Marc en Tom in het café',
    titleTranslation: 'Marc and Tom at the Café',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Het is een vrijdagmiddag. Marc en Tom zitten in een café in de Jordaan. Tom heeft een biertje. Marc heeft koffie. Op tafel liggen hun telefoons — allebei met het scherm naar beneden, want dat had Marc voorgesteld toen ze binnenkwamen.

„Wat heb jij de laatste tijd gedaan?" vraagt Tom.

Marc denkt na. „Gewerkt. Nagedacht over mijn telefoon."

Tom kijkt hem aan. „Over je telefoon?"

„Ik probeer te begrijpen hoeveel tijd ik ermee kwijt ben. En of ik dat wil."

„En?"

„Meer dan ik dacht," zegt Marc. „Niet in uren per dag — dat valt mee. Maar in momenten. Steeds even checken. Steeds afgeleid worden. Dat merk je pas als je het niet meer doet."

Tom knikt langzaam. „Ik heb dat ook een tijdje geprobeerd. Maar ik ben er niet consequent mee."

„Ik ook niet," zegt Marc. „Maar ik probeer het te begrijpen. Waarom doe ik het? Verveling? Gewoonte? Angst om iets te missen?"

„Waarschijnlijk alle drie," zegt Tom.

„Ja." Marc neemt een slok koffie. „Het gekke is dat ik me beter voel als ik er minder op kijk. Rustiger. Meer in het moment. En toch doe ik het steeds weer."

Tom pakt zijn telefoon op — met het scherm naar beneden, legt hem dan terug. Het gebaar is automatisch, en hij glimlacht een beetje om zichzelf.

„Zie je," zegt Marc.

„Ja," zegt Tom. „Ik zie het."

Ze blijven zitten. Het café is druk om hen heen. Ze laten de telefoons liggen en blijven praten.`,
    words: {
      kwijt:        { english: 'lost to / spent on' },
      afgeleid:     { english: 'distracted' },
      consequent:   { english: 'consistent / disciplined' },
      verveling:    { english: 'boredom' },
      angst:        { english: 'fear / anxiety' },
      gebaar:       { english: 'gesture' },
      automatisch:  { english: 'automatic / instinctive' },
    },
    comprehensionQuestions: [
      { question: 'Waarom legt Marc zijn telefoon met het scherm naar beneden?', options: ['Het scherm is kapot', 'Hij wil de afleiding verminderen', 'Hij wacht op een belangrijk bericht'], correctIndex: 1 },
      { question: 'Wat zegt Marc dat hij merkt als hij minder op zijn telefoon kijkt?', options: ['Hij wordt productiever op werk', 'Hij voelt zich rustiger en meer in het moment', 'Hij mist belangrijke berichten'], correctIndex: 1 },
      { question: 'Wat doet Tom automatisch aan het einde van de scène?', options: ['Hij stuurt een bericht', 'Hij pakt zijn telefoon op en legt hem terug', 'Hij staat op om te vertrekken'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-4',
    title: 'Wat het onderzoek zegt',
    titleTranslation: 'What the Research Says',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Er is de afgelopen jaren veel onderzoek gedaan naar de effecten van sociale media en smartphones op welzijn, aandacht en mentale gezondheid. De resultaten zijn niet eenduidig — maar er zijn patronen.

Sociale media en vergelijking

Meerdere studies tonen aan dat intensief gebruik van sociale media samenhangt met hogere niveaus van angst en ontevredenheid, vooral bij jongeren. Een mogelijke verklaring is sociale vergelijking: mensen zien selectieve, positieve representaties van andermans leven en meten hun eigen leven daaraan af.

Dit effect is niet universeel. Mensen die sociale media actief gebruiken — om contact te houden, te creëren, te communiceren — rapporteren andere ervaringen dan mensen die passief scrollen.

Aandacht en concentratie

Onderzoek naar aandacht laat zien dat regelmatig gebruik van notificatie-gestuurde technologie het moeilijker maakt om langdurig gefocust te blijven. De hersenen raken gewend aan frequente prikkels — en worden onrustig als die prikkels uitblijven.

Interessant is dat dit patroon omkeerbaar is. Mensen die bewust periodes van gefocust werk inbouwen — zonder telefoon, zonder notificaties — rapporteren na enkele weken dat diep werken makkelijker wordt.

Wat we nog niet weten

Veel onderzoek op dit gebied is correlationeel: het toont verbanden, geen oorzaken. Het is niet altijd duidelijk of sociale media angst veroorzaken, of dat mensen die al angstiger zijn vaker sociale media gebruiken.

Wat wel duidelijk is: technologie beïnvloedt gedrag. En bewust omgaan met die beïnvloeding is mogelijk — maar vereist een actieve keuze.`,
    words: {
      welzijn:         { english: 'wellbeing' },
      eenduidig:       { english: 'unambiguous / clear-cut' },
      vergelijking:    { english: 'comparison' },
      ontevredenheid:  { english: 'dissatisfaction' },
      prikkels:        { english: 'stimuli / triggers' },
      omkeerbaar:      { english: 'reversible' },
      correlationeel:  { english: 'correlational' },
    },
    comprehensionQuestions: [
      { question: 'Waarom hangt intensief gebruik van sociale media samen met meer angst?', options: ['Omdat sociale media gevaarlijk zijn', 'Omdat mensen hun leven vergelijken met selectieve positieve representaties van anderen', 'Omdat mensen te weinig slapen door sociale media'], correctIndex: 1 },
      { question: 'Wat toont onderzoek naar aandacht aan?', options: ['Smartphones maken mensen intelligenter', 'Regelmatig gebruik van notificaties maakt het moeilijker om langdurig gefocust te blijven', 'Technologie heeft geen effect op concentratie'], correctIndex: 1 },
      { question: 'Wat weten onderzoekers nog niet zeker?', options: ['Of technologie gedrag beïnvloedt', 'Of sociale media angst veroorzaken of dat angstigere mensen vaker sociale media gebruiken', 'Of smartphones nuttig zijn'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-5',
    title: 'De muziekschool zonder telefoon',
    titleTranslation: 'The Music School Without Phones',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Anna geeft vioolles aan een kleine muziekschool in het centrum. Ze heeft leerlingen van acht tot zeventien jaar. Al een paar jaar heeft ze een regel: tijdens de les gaat de telefoon in een bakje bij de deur. Niet in de zak, niet op tafel — in het bakje.

In het begin was er verzet. Vooral van de oudere leerlingen, die gewend waren altijd bereikbaar te zijn. Een meisje van vijftien zei eens: maar wat als er iets gebeurt? Anna had gevraagd: wat verwacht je dat er in dertig minuten kan gebeuren? Het meisje had nagedacht. Niets, eigenlijk, had ze gezegd. Maar het voelt raar om het niet te weten.

Dat was het eerlijke antwoord, vond Anna. Niet de telefoon zelf was het probleem — maar het gevoel dat je iets misloopt als je er niet bij bent.

Ze had de regel aangehouden. En na een paar lessen merkten de leerlingen iets. Ze waren meer aanwezig. Ze maakten meer fouten — omdat ze minder afgeleid waren en daardoor meer risico namen. En ze speelden beter.

„Muziek vraagt aandacht," zegt Anna soms als ze het uitlegt. „Niet de helft van je aandacht. Alles."

Een van haar oudste leerlingen — een jongen van zeventien — had haar na een les gevraagd: kunt u die regel ook voor thuis maken? Ik studeer ook beter als de telefoon weg is, maar ik zet hem zelf niet weg.

Anna had gelachen. „Dat kan ik niet voor je doen. Maar je weet nu hoe het voelt. Dat is al veel."`,
    words: {
      bakje:        { english: 'small tray / box' },
      verzet:       { english: 'resistance / opposition' },
      bereikbaar:   { english: 'reachable / available' },
      aangehouden:  { english: 'maintained / kept up' },
      misloopt:     { english: 'misses out on' },
      aanwezig:     { english: 'present / attentive' },
      studeert:     { english: 'practises / studies' },
    },
    comprehensionQuestions: [
      { question: 'Wat is Anna\'s regel tijdens vioolles?', options: ['Telefoons mogen alleen voor noodgevallen gebruikt worden', 'Telefoons gaan in een bakje bij de deur', 'Telefoons moeten stil worden gezet'], correctIndex: 1 },
      { question: 'Wat merkten de leerlingen na een paar lessen zonder telefoon?', options: ['Ze waren minder gemotiveerd', 'Ze waren meer aanwezig en speelden beter', 'Ze misten de telefoon te erg om te focussen'], correctIndex: 1 },
      { question: 'Wat vroeg de jongen van zeventien aan Anna?', options: ['Of hij thuis ook viool mocht spelen', 'Of ze de regel ook voor thuis kon maken', 'Of hij de telefoon soms mocht gebruiken'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-6',
    title: 'Fatima en het scherm',
    titleTranslation: 'Fatima and the Screen',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Fatima heeft een gewoonte die ze niet altijd bewust maakt: als ze thuiskomt, legt ze haar telefoon op de keukentafel. Niet in haar zak, niet op het bureau — op de keukentafel. En dan doet ze iets anders. Soms kookt ze, soms leest ze, soms belt ze haar moeder.

Het is geen bewuste strategie. Het is iets wat ze heeft overgehouden van haar opvoeding. Thuis in Casablanca had haar vader een simpele regel: aan tafel geen schermen. Die regel gold voor de televisie, voor de computer, later voor de telefoon. Het was gewoon zo.

Hier heeft ze geen vader die de regel afdwingt. Ze doet het zelf. Niet altijd — er zijn avonden waarop ze anderhalf uur door haar telefoon scrolt en zich daarna leeg voelt. Maar die avonden herkent ze inmiddels. Ze voelen anders dan de avonden waarop ze iets heeft gedaan.

Op een avond vraagt Lisa haar hoe ze ermee omgaat. Ze zitten samen te eten en Lisa heeft haar telefoon al drie keer opgepakt tijdens het gesprek — en hem elke keer weer weggelegd.

„Het is gewoon een gewoonte," zegt Fatima. „Mijn vader had een regel. Ik houd die regel aan. Maar ik vind het ook prettig — ik voel me beter als ik de telefoon even niet check."

Lisa kijkt naar haar eigen telefoon. „Ik zou dat ook willen. Maar ik weet niet hoe ik begin."

„Begin klein," zegt Fatima. „Één uur. Gewoon één uur zonder."

„En als ik hem toch pak?"

„Dan pak je hem. En daarna leg je hem weg. Je hoeft het niet perfect te doen."`,
    words: {
      afdwingt:   { english: 'enforces' },
      herkent:    { english: 'recognises' },
      leeg:       { english: 'empty / drained' },
      strategie:  { english: 'strategy' },
      aanhoudt:   { english: 'maintains / keeps up' },
      opvoeding:  { english: 'upbringing' },
      prettig:    { english: 'pleasant / nice' },
    },
    comprehensionQuestions: [
      { question: 'Waarom legt Fatima haar telefoon op de keukentafel als ze thuiskomt?', options: ['Ze is hem vergeten in haar tas', 'Het is een gewoonte uit haar opvoeding', 'Ze heeft geen stopcontact in haar slaapkamer'], correctIndex: 1 },
      { question: 'Hoe voelt Fatima zich op avonden dat ze lang door haar telefoon scrolt?', options: ['Ontspannen', 'Leeg', 'Energiek'], correctIndex: 1 },
      { question: 'Wat adviseert Fatima aan Lisa?', options: ['Haar telefoon permanent thuis te laten', 'Klein beginnen: één uur zonder telefoon, en het niet perfect te doen', 'Een app te downloaden die haar schermtijd beperkt'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-7',
    title: 'Schermtijd: cijfers en context',
    titleTranslation: 'Screen Time: Numbers and Context',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Schermtijd is een begrip dat steeds vaker in discussies over gezondheid en technologie opduikt. Maar wat betekent het precies, en wat zeggen de cijfers ons?

Wat we weten

Gemiddeld kijken volwassenen in Nederland meerdere uren per dag op een scherm — smartphone, laptop, televisie bij elkaar opgeteld. Voor jongeren tussen twaalf en achttien jaar ligt dat gemiddelde nog hoger.

Maar schermtijd is geen eenduidige maatstaf. Twee uur videobellen met familie is iets anders dan twee uur passief scrollen door sociale media. Werken op een laptop is iets anders dan spelletjes spelen. Het gaat niet alleen om de tijd, maar om wat je doet en hoe je je daarna voelt.

Wanneer wordt het een probleem?

Onderzoekers spreken van problematisch schermgebruik als het ten koste gaat van slaap, beweging, sociaal contact of andere activiteiten. Als schermen worden gebruikt om negatieve gevoelens te vermijden in plaats van te verwerken. Als iemand moeite heeft om te stoppen, ook als hij of zij dat wil.

Dit zijn signalen, geen diagnoses. Maar ze kunnen helpen om eigen patronen te herkennen.

Wat werkt

Er is geen universele aanbeveling voor het exacte aantal uren. Wat beter werkt dan tijdslimieten stellen, is bewust kijken naar de kwaliteit van schermgebruik: wat doe ik, wanneer, waarom, en hoe voel ik me erna?

Die vragen klinken eenvoudig. Maar ze oprecht beantwoorden kost oefening.`,
    words: {
      maatstaf:      { english: 'measure / standard' },
      opgeteld:      { english: 'added up / combined' },
      problematisch: { english: 'problematic' },
      verwerken:     { english: 'to process / cope with' },
      signalen:      { english: 'signals / signs' },
      tijdslimieten: { english: 'time limits' },
      oprecht:       { english: 'honestly / sincerely' },
    },
    comprehensionQuestions: [
      { question: 'Waarom is schermtijd geen eenduidige maatstaf?', options: ['Omdat telefoons niet precies meten hoe lang je kijkt', 'Omdat twee uur videobellen anders is dan twee uur scrollen', 'Omdat jongeren altijd meer schermtijd hebben dan volwassenen'], correctIndex: 1 },
      { question: 'Wanneer is schermgebruik problematisch?', options: ['Als je meer dan twee uur per dag op een scherm kijkt', 'Als het ten koste gaat van slaap, beweging of sociaal contact', 'Als je telefoon een grote batterij heeft'], correctIndex: 1 },
      { question: 'Wat werkt beter dan tijdslimieten stellen?', options: ['Schermen helemaal vermijden', 'Bewust kijken naar de kwaliteit van schermgebruik', 'Alleen schermen gebruiken voor werk'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-8',
    title: 'Marc beslist iets',
    titleTranslation: 'Marc Decides Something',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Het is een dinsdagavond. Marc zit aan zijn bureau. Hij heeft zijn werk gedaan, zijn scherm is leeg, en hij heeft zijn telefoon in zijn hand — niet omdat hij iets moest doen, maar omdat hij hem oppakte. Automatisch, zoals altijd.

Hij kijkt ernaar. Hij legt hem neer.

Al een paar weken denkt hij na over zijn relatie met zijn telefoon. Niet op een grote manier — hij heeft geen plan gemaakt, geen lijsten geschreven. Maar hij heeft opgelet. Hoe vaak hij hem oppakt. Op welke momenten. Wat hij daarna voelt.

En hij heeft iets gemerkt: hij pakt de telefoon het vaakst op als hij net iets heeft afgemaakt. Het moment na het werk, na een vergadering, na een gesprek. Alsof hij meteen ergens heen moet, meteen iets moet doen, de stilte niet kan laten bestaan.

Dat is het, denkt hij. Niet de berichten. Niet de apps. De stilte.

Hij legt de telefoon weg en laat de stilte bestaan. Het is ongemakkelijk, dan minder ongemakkelijk, dan gewoon aanwezig. Hij denkt aan niets bijzonders. Zijn gedachten bewegen langzaam, zonder richting.

Na een kwartier pakt hij een boek. Hij leest een paar bladzijden. Dan gaat het licht uit.

De volgende ochtend werkt hij twee uur zonder zijn telefoon aan te raken. Het gaat goed. Niet perfect — hij moet er soms aan denken, voelt even de neiging — maar goed.

Hij stuurt Tom een berichtje: ik denk dat ik het snap nu.

Tom schrijft terug: wat?

Marc denkt even na. Dan schrijft hij: de stilte.`,
    words: {
      oppakte:      { english: 'picked up' },
      relatie:      { english: 'relationship' },
      vergadering:  { english: 'meeting' },
      stilte:       { english: 'silence' },
      ongemakkelijk: { english: 'uncomfortable' },
      neiging:      { english: 'urge / tendency' },
      bladzijden:   { english: 'pages' },
    },
    comprehensionQuestions: [
      { question: 'Wanneer pakt Marc zijn telefoon het vaakst op?', options: ['Als hij een bericht ontvangt', 'Na het moment dat hij iets heeft afgemaakt', 'Als hij zich verveelt tijdens het werk'], correctIndex: 1 },
      { question: 'Wat ontdekt Marc over de echte reden dat hij zijn telefoon pakt?', options: ['Hij wil berichten lezen', 'Hij kan de stilte niet laten bestaan', 'Hij heeft zijn telefoon nodig voor zijn werk'], correctIndex: 1 },
      { question: 'Wat schrijft Marc aan het einde aan Tom?', options: ['Dat hij zijn telefoon heeft uitgeschakeld', '"de stilte"', '"ik ga minder werken"'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-9',
    title: 'Gegevens en privacy',
    titleTranslation: 'Data and Privacy',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Elke keer dat je een app gebruikt, een website bezoekt of iets zoekt op je telefoon, wordt er informatie verzameld. Dat is geen geheim — het staat in de gebruikersvoorwaarden. Maar de meeste mensen lezen die niet, en begrijpen niet precies wat er met hun gegevens gebeurt.

Wat er wordt verzameld

Apps en platforms verzamelen allerlei soorten gegevens: wat je zoekt, hoelang je iets bekijkt, waar je bent, wat je koopt, met wie je communiceert. Deze gegevens worden gebruikt om advertenties te personaliseren, maar ook voor onderzoek, risicomodellen en het verbeteren van algoritmen.

In Europa biedt de AVG (Algemene Verordening Gegevensbescherming) meer bescherming dan in veel andere landen. Bedrijven moeten toestemming vragen, gegevens mogen niet onbeperkt worden bewaard, en gebruikers hebben het recht om te weten wat er over hen is opgeslagen.

Wat mensen doen — en niet doen

In de praktijk accepteren de meeste mensen cookies en gebruikersvoorwaarden zonder ze te lezen. Dat is begrijpelijk — de teksten zijn lang en ingewikkeld, en weigeren betekent vaak dat je de service niet kunt gebruiken.

Maar bewustzijn helpt. Weten welke apps toegang hebben tot je locatie, microfoon of camera is een eerste stap. In de instellingen van de meeste telefoons kun je dit controleren en aanpassen.

Privacy is geen alles-of-niets keuze. Kleine aanpassingen — minder apps, meer controle over toestemmingen — geven al meer grip op wat er met je gegevens gebeurt.`,
    words: {
      gegevens:        { english: 'data / personal data' },
      gebruikersvoorwaarden: { english: 'terms of service' },
      advertenties:    { english: 'advertisements' },
      personaliseren:  { english: 'to personalise' },
      toestemming:     { english: 'permission / consent' },
      bewustzijn:      { english: 'awareness' },
      toestemmingen:   { english: 'permissions' },
    },
    comprehensionQuestions: [
      { question: 'Wat beschermt de AVG in Europa?', options: ['Het verbiedt alle dataverzameling', 'Het biedt meer bescherming voor persoonlijke gegevens dan in veel andere landen', 'Het maakt sociale media gratis'], correctIndex: 1 },
      { question: 'Waarom accepteren mensen gebruikersvoorwaarden zonder ze te lezen?', options: ['Ze zijn onverschillig over privacy', 'De teksten zijn lang en ingewikkeld, en weigeren betekent vaak geen toegang', 'Ze weten dat ze toch niets te verbergen hebben'], correctIndex: 1 },
      { question: 'Wat is een eerste stap om meer controle over privacy te krijgen?', options: ['Alle apps verwijderen', 'Weten welke apps toegang hebben tot locatie, microfoon of camera', 'Geen gebruik maken van internet'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m4-10',
    title: 'Een middag in het Vondelpark',
    titleTranslation: 'An Afternoon in Vondelpark',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Het is een zonnige zaterdag in juni. Anna heeft voorgesteld om naar het Vondelpark te gaan. Niet voor iets bijzonders — gewoon buiten zijn. Lisa, Tom, Marc en Fatima zijn meegekomen.

Ze vinden een plek op het gras. Iemand heeft een kleed meegenomen. Tom heeft iets te drinken gekocht bij de kraam bij de ingang. Ze gaan zitten.

In het begin is er nog wat gepraat over werk, over de week, over kleine dingen. Maar na een tijdje wordt het stiller. Marc liegt op zijn rug en kijkt naar de lucht. Lisa tekent iets in een notitieboekje. Fatima heeft haar ogen dicht. Tom leest.

Anna kijkt om zich heen. Om haar heen liggen telefoons — maar niemand pakt ze op. Het is geen afspraak. Het is gewoon zo gegaan.

Ze denkt aan wat ze de afgelopen maanden heeft meegemaakt — haar leerlingen die beter speelden zonder telefoon, de gesprekken over aandacht, Marc die zijn stilte leerde verdragen. Ze heeft nooit een groot pleidooi gehouden voor minder schermtijd. Ze heeft gewoon kleine dingen gezegd, kleine keuzes gemaakt.

Misschien werkt dat beter, denkt ze.

„Wat denk je?" vraagt Tom. Hij heeft zijn boek neergelegd.

„Niets," zegt Anna. Ze glimlacht. „Dat is het fijne."

De middag gaat langzaam. Het gras is warm. Ergens verderop speelt iemand gitaar. De stad maakt geluid op de achtergrond — maar zacht, op afstand. Het voelt goed om hier te zijn, zonder ergens anders te willen zijn.`,
    words: {
      kraam:        { english: 'stall / kiosk' },
      kleed:        { english: 'blanket / cloth' },
      notitieboekje: { english: 'notebook' },
      pleidooi:     { english: 'plea / argument' },
      verdragen:    { english: 'to endure / tolerate' },
      afstand:      { english: 'distance' },
      glimlacht:    { english: 'smiles' },
    },
    comprehensionQuestions: [
      { question: 'Waarom gaan ze naar het Vondelpark?', options: ['Voor een picknick met gepland programma', 'Gewoon om buiten te zijn, zonder bijzonder doel', 'Voor een fotoshoot'], correctIndex: 1 },
      { question: 'Wat merkt Anna op terwijl ze in het park zit?', options: ['Dat iedereen op zijn telefoon kijkt', 'Dat er telefoons liggen maar niemand ze oppakt', 'Dat het te druk is in het park'], correctIndex: 1 },
      { question: 'Wat antwoordt Anna als Tom vraagt wat ze denkt?', options: ['"Ik denk aan de leerlingen"', '"Niets — dat is het fijne"', '"Ik wil naar huis"'], correctIndex: 1 },
    ],
    completed: false,
  },
];
