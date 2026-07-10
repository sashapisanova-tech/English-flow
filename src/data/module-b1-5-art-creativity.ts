import { ReadingText } from '@/types/dutch';

const M = 'b1-art-creativity' as const;
const MT = 'Kunst en wat het doet';

export const moduleB1_5Texts: ReadingText[] = [
  {
    id: 'b1m5-1',
    title: 'Het atelier in november',
    titleTranslation: 'The Studio in November',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Het was al donker buiten toen Lisa haar penseel neerlegde. Ze deed een stap achteruit. Het was moeilijk om te beslissen of het af was — of dat het überhaupt af kon zijn. Ze keek naar het doek dat al drie weken op de ezel stond.

Het was bijna klaar. Of het was helemaal niet klaar. Ze wist het niet meer.

De tentoonstelling opende over veertien dagen. Ze had zes werken klaarstaan voor de galerie, en dit was het zevende — het grootste, het moeilijkste, het enige waarvan ze zich afvroeg of ze het echt begreep. De andere zes had ze met meer vertrouwen gemaakt. Dit doek had ze begonnen zonder plan, en nu stond het er en keek haar aan op een manier die ze niet helemaal kon benoemen.

Ze dacht aan wat haar tekenleraar vroeger zei, toen ze nog op de middelbare school zat: je kunt een werk niet afmaken als je niet weet wat je ermee wilt zeggen. Ze had het toen logisch gevonden. Nu was ze er minder zeker van. Dit werk had iets gezegd terwijl ze het maakte — iets over verlies, over afstand, over de ruimte tussen mensen — maar of het dat ook zei aan een vreemde die er tegenover stond, dat wist ze niet.

Ze zette de ketel op. Terwijl het water opwarmde, bleef ze naar het doek kijken. De kleuren waren donker: grijs, oker, een lijn dieprood onderaan. Ze had het geschilderd in de weken na het gesprek met Fatima over thuisvoelen, over hier en daar tegelijk zijn. Misschien was dat te persoonlijk. Misschien was persoonlijk precies goed.

Ze schonk thee in en ging zitten. Morgen zou ze verder beslissen. Vanavond was het gewoon een doek dat naar haar keek.`,
    words: {
      penseel:      { english: 'paintbrush' },
      doek:         { english: 'canvas' },
      ezel:         { english: 'easel' },
      vertrouwen:   { english: 'confidence / trust' },
      benoemen:     { english: 'to name / put into words' },
      verlies:      { english: 'loss' },
      oker:         { english: 'ochre (yellow-brown colour)' },
    },
    comprehensionQuestions: [
      { question: 'Waarom twijfelt Lisa over het zevende doek?', options: ['Het is te groot voor de galerie', 'Het is het enige waarvan ze niet zeker weet of ze het begrijpt', 'Ze heeft het nog niet begonnen'], correctIndex: 1 },
      { question: 'Wat had haar tekenleraar vroeger gezegd?', options: ['Je moet altijd een plan hebben voordat je begint', 'Je kunt een werk niet afmaken als je niet weet wat je ermee wilt zeggen', 'Persoonlijke werken zijn altijd het sterkst'], correctIndex: 1 },
      { question: 'Waarover had Lisa het gesprek met Fatima gehad dat haar inspireerde?', options: ['Over het leren van Nederlands', 'Over thuisvoelen en hier en daar tegelijk zijn', 'Over koken en culturele verschillen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-2',
    title: 'Wat kunst met mensen doet',
    titleTranslation: 'What Art Does to People',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Kunst doet iets. Maar wat precies, en waarom reageert de ene persoon helemaal anders op een schilderij dan de andere?

Emotie en herkenning

Wanneer mensen naar beeldende kunst kijken, activeren ze hersengebieden die ook actief zijn bij het verwerken van emoties en sociale situaties. Een schilderij van een gezicht, een landschap of een abstracte kleurvlak kan gevoelens oproepen die de kijker niet had verwacht — en dat gevoel hoeft niets te maken te hebben met de bedoeling van de kunstenaar.

Onderzoekers noemen dit het esthetisch effect: de ervaring van schoonheid, onrust, herkenning of verbazing die een werk oproept. Die ervaring is deels universeel — veel mensen reageren sterker op bepaalde kleuren, vormen en compositieprincipes — maar deels ook diep persoonlijk. Wat iemand in een werk ziet, hangt samen met zijn eigen herinneringen, associaties en stemming op dat moment.

Waarom variatie interessant is

Het feit dat twee mensen hetzelfde werk heel anders kunnen beleven, wordt soms als een probleem gezien. Maar kunstwetenschappers en psychologen zien het juist als een kenmerk van krachtige kunst: werken die meerdere interpretaties toelaten, houden langer de aandacht vast en roepen meer na.

Een werk dat iedereen hetzelfde ziet, is informatief. Een werk dat mensen raakt op verschillende manieren, is iets anders — het wordt een spiegel.

Aanwezig zijn bij kunst

Onderzoek laat ook zien dat de context waarin je kunst bekijkt een groot verschil maakt. Mensen die bewust de tijd nemen om naar een werk te kijken — zonder haast, zonder telefoon — ervaren meer. Dat kost moeite. Maar het maakt een verschil voor wat je meeneemt.`,
    words: {
      beeldende:    { english: 'visual (art)' },
      hersengebieden: { english: 'brain areas' },
      esthetisch:   { english: 'aesthetic' },
      verbazing:    { english: 'amazement / wonder' },
      kenmerk:      { english: 'characteristic / feature' },
      spiegel:      { english: 'mirror' },
      haast:        { english: 'haste / rush' },
    },
    comprehensionQuestions: [
      { question: 'Wat is het "esthetisch effect" volgens de tekst?', options: ['De prijs van een kunstwerk', 'De ervaring van schoonheid, onrust, herkenning of verbazing die een werk oproept', 'De techniek die een kunstenaar gebruikt'], correctIndex: 1 },
      { question: 'Waarom zien kunstwetenschappers variatie in interpretatie als positief?', options: ['Omdat het werk dan makkelijker te begrijpen is', 'Omdat werken die meerdere interpretaties toelaten langer de aandacht vasthouden', 'Omdat iedereen het dan eens is over de betekenis'], correctIndex: 1 },
      { question: 'Wat vergroot de kans dat je meer ervaart bij het bekijken van kunst?', options: ['In een grote groep kijken', 'Bewust de tijd nemen zonder haast of telefoon', 'Vooraf veel over de kunstenaar lezen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-3',
    title: 'Het gesprek met de galerie',
    titleTranslation: 'The Meeting with the Gallery',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Lisa had twee keer de tekst van haar e-mail herschreven voordat ze hem had verstuurd. En nu zat ze tegenover Hester Vos, de coördinator van Galerie Nieuw Noord, in een klein kantoor achter de expositieruimte.

Hester was vriendelijk maar efficiënt. Ze had een notitieboek voor zich en stelde vragen die Lisa niet helemaal had verwacht.

„Hoe wil je de werken hangen? Heb je een voorkeur voor de volgorde?"

Lisa dacht na. „Ik had gedacht chronologisch, maar dat klopt misschien niet voor de kijker."

„Wat bedoel je?"

„Nou, de volgorde waarin ik ze heb gemaakt zegt iets over hoe ik dacht. Maar een bezoeker weet dat niet. Die ziet gewoon zes schilderijen. Misschien is een andere volgorde logischer voor hem."

Hester knikte en schreef iets op. „We kunnen dit samen doorlopen als de werken er hangen. Maar goed om al over na te denken." Ze keek op. „En de titels? Heb je die al?"

„Drie wel. De andere drie nog niet."

„We hebben ze uiterlijk een week van tevoren nodig voor de gedrukte kaarten."

Lisa knikte. Ze had het gevoel dat ze iets vergat om te vragen, maar wist niet wat. „Is er nog iets wat ik moet regelen? Praktisch bedoel ik."

„Verzekering van de werken tijdens transport — heb je dat?"

„Nee." Lisa aarzelde. „Hoe doe ik dat?"

Hester legde uit hoe het werkte. Lisa schreef mee in haar telefoon. Het was de eerste keer dat ze zich realiseerde dat een tentoonstelling organiseren niet alleen over de schilderijen ging. Er zat een wereld aan praktische dingen omheen die ze niet had voorzien.

„In ieder geval," zei Hester, „de werken die ik heb gezien zijn sterk. Vertrouw daarop."

Lisa bedankte haar. Buiten op straat bleef ze even staan. Sterk. Ze wist niet of ze het geloofde, maar het hielp toch iets om het gehoord te hebben.`,
    words: {
      expositieruimte: { english: 'exhibition space' },
      voorkeur:        { english: 'preference' },
      volgorde:        { english: 'order / sequence' },
      chronologisch:   { english: 'chronological' },
      verzekering:     { english: 'insurance' },
      voorzien:        { english: 'anticipated / foreseen' },
      uiterlijk:       { english: 'at the latest' },
    },
    comprehensionQuestions: [
      { question: 'Waarom overweegt Lisa de werken niet chronologisch te hangen?', options: ['De galerie verbiedt het', 'Een bezoeker weet de maakolgorde niet en een andere volgorde kan logischer zijn', 'Ze wil de zwakste werken verbergen'], correctIndex: 1 },
      { question: 'Wat vergat Lisa te regelen?', options: ['De uitnodigingen voor de opening', 'De verzekering van de werken tijdens transport', 'De titels van de schilderijen'], correctIndex: 1 },
      { question: 'Hoe voelt Lisa zich na het gesprek?', options: ['Teleurgesteld', 'Ze weet niet of ze Hesters compliment gelooft, maar het helpt', 'Volledig zeker van zichzelf'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-4',
    title: 'Anna en het grote doek',
    titleTranslation: 'Anna and the Large Canvas',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Op zondag bracht Lisa het grote doek naar Anna's appartement om het te laten zien. Ze had er behoefte aan dat iemand het zag voor de opening — niet om feedback te krijgen, maar gewoon om te weten hoe het in een andere ruimte voelde.

Anna hielp haar het doek tegen de muur te zetten. Ze deed een stap achteruit en keek.

Het werd stil.

Lisa zei niets. Ze lette op Anna's gezicht, op de kleine bewegingen die mensen maken als ze kijken: de ogen die ergens naartoe gaan, de kleine rimpel in het voorhoofd, de manier waarop iemand zijn hoofd kantelt.

„Wat is dit?" zei Anna uiteindelijk. Niet als kritiek. Als echte vraag.

„Ik weet het niet precies," zei Lisa. „Dat is het probleem, eigenlijk."

„Of het is niet het probleem," zei Anna. Ze keek nog even. „Ik zie iets wat me doet denken aan..." Ze stopte even. „Aan het gevoel dat je iemand mist die er toch is. Weet je dat?"

Lisa keek haar aan. Ze had het werk gemaakt vanuit een ander gevoel — ze had gedacht aan afstand, aan Fatima's verhaal over tegelijk hier en daar zijn. Maar Anna zag iets anders. En het klopte ook.

„Dat heb ik niet bedoeld," zei Lisa langzaam. „Maar dat maakt het niet minder waar."

Anna glimlachte. „Nee. Ik denk dat dat precies is hoe het werkt."

Ze bleven nog een tijdje voor het doek staan. Buiten reed een tram voorbij. Lisa dacht: misschien is het werk af. Niet omdat het klaar is, maar omdat het al iets doet zonder haar.`,
    words: {
      behoefte:    { english: 'need / desire' },
      rimpel:      { english: 'wrinkle / furrow' },
      voorhoofd:   { english: 'forehead' },
      kantelt:     { english: 'tilts' },
      missen:      { english: 'to miss' },
      afstand:     { english: 'distance' },
      tram:        { english: 'tram' },
    },
    comprehensionQuestions: [
      { question: 'Waarom brengt Lisa het doek naar Anna?', options: ['Om feedback te vragen', 'Gewoon om te zien hoe het in een andere ruimte voelde', 'Omdat de galerie het nog niet kan opslaan'], correctIndex: 1 },
      { question: 'Wat ziet Anna in het grote doek?', options: ['Iets over Fatima\'s leven in Marokko', 'Het gevoel dat je iemand mist die er toch is', 'Een abstracte compositie zonder betekenis'], correctIndex: 1 },
      { question: 'Waarom denkt Lisa dat het werk misschien af is?', options: ['Omdat Anna het mooi vindt', 'Omdat het al iets doet zonder haar erbij', 'Omdat de tentoonstelling morgen opent'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-5',
    title: 'Kunstenaar zijn in Nederland — de praktijk',
    titleTranslation: 'Being an Artist in the Netherlands — the Reality',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Beeldend kunstenaar zijn in Nederland is mogelijk. Maar het vraagt meer dan talent. Het vraagt ook doorzettingsvermogen, praktisch inzicht en de bereidheid om met onzekerheid te leven — financieel en artistiek.

Hoe kunstenaars inkomen verdienen

De meeste beeldend kunstenaars in Nederland hebben geen stabiel inkomen uit hun kunst alleen. Ze combineren: verkoop van werk, opdrachten, lessen geven, bijbanen in de culturele sector of daarbuiten. Een klein percentage leeft volledig van zijn artistieke praktijk, maar dat is eerder uitzondering dan regel.

De verkoop van werk via galeries gaat doorgaans via een percentage-verdeling: de galerie houdt een deel — vaak tussen de veertig en vijftig procent — en de kunstenaar ontvangt de rest. Voor beginnende kunstenaars die nog geen naam hebben opgebouwd, is dit soms de enige manier om zichtbaar te worden, ook al is het financieel niet altijd gunstig.

Ondersteuning en subsidies

Er zijn in Nederland verschillende fondsen die kunstenaars ondersteunen: het Mondriaan Fonds is het bekendste. Dit fonds geeft subsidies voor projecten, ontwikkeltrajecten en presentaties. Aanvragen is mogelijk, maar de procedure kost tijd en niet iedereen wordt gehonoreerd.

Gemeenten hebben ook culturele budgetten, en er zijn lokale fondsen en prijzen die beginnende kunstenaars kunnen aanvragen. Maar de concurrentie is groot en de beschikbare bedragen zijn beperkt.

Wat het betekent om te beginnen

Voor kunstenaars die net beginnen — zoals Lisa, die haar eerste echte tentoonstelling voorbereidt — is de eerste expositie vaak niet winstgevend. Het doel is eerder zichtbaarheid, ervaring, en het opbouwen van een netwerk. De kunstwereld is klein en persoonlijk: wie je kent en wie je werk kent, telt.`,
    words: {
      doorzettingsvermogen: { english: 'perseverance / determination' },
      bijbanen:     { english: 'side jobs / secondary jobs' },
      gehonoreerd:  { english: 'awarded / honoured' },
      subsidies:    { english: 'grants / subsidies' },
      winstgevend:  { english: 'profitable' },
      zichtbaarheid: { english: 'visibility' },
      concurrentie: { english: 'competition' },
    },
    comprehensionQuestions: [
      { question: 'Hoe verdienen de meeste beeldend kunstenaars in Nederland hun inkomen?', options: ['Volledig uit de verkoop van hun kunst', 'Door te combineren: verkoop, opdrachten, lessen en bijbanen', 'Via een vast salaris van een galerie'], correctIndex: 1 },
      { question: 'Hoeveel houdt een galerie doorgaans van de verkoopprijs?', options: ['Tien tot twintig procent', 'Veertig tot vijftig procent', 'Zeventig procent'], correctIndex: 1 },
      { question: 'Wat is het doel van een eerste expositie voor beginnende kunstenaars?', options: ['Zoveel mogelijk geld verdienen', 'Zichtbaarheid, ervaring en een netwerk opbouwen', 'Een subsidie aanvragen bij het Mondriaan Fonds'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-6',
    title: 'Marc en Lisa — het gesprek voor de opening',
    titleTranslation: 'Marc and Lisa — the Conversation Before the Opening',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Het was twee avonden voor de opening. Lisa en Marc zaten in het café. Marc had gevraagd of ze zin had om af te spreken — niet om over de tentoonstelling te praten, gewoon om even buiten te zijn.

Maar na een halfuur ging het er toch over.

„Ben je zenuwachtig?" vroeg Marc.

„Ja." Lisa nam een slok. „Eigenlijk wel heel erg."

„Waarvoor precies?"

Ze dacht even na. „Dat mensen er niets in zien. Of erger — dat ze beleefd zijn. Dat iemand zegt: oh, wat mooi, terwijl ze eigenlijk denken: ik snap er niets van."

Marc knikte langzaam. „Dat snap ik wel. Maar denk je dat dat erg is?"

„Ja. Toch wel."

„Hoe dan ook," zei Marc, „jij kunt niet controleren wat mensen zien. Dat weet je toch?"

„Dat weet ik. Maar het voelt anders als je er zelf bij staat."

Marc zweeg even. Lisa keek hem aan. Er was iets aan hem dat de laatste weken anders was — rustiger, meer aanwezig. Ze wist van Anna dat hij het moeilijk had gehad, dat hij had nagedacht over hoe hij zijn aandacht verdeelde. Het leek alsof hij echt luisterde nu, niet half.

„Ik geloof dat jij je werk beter kent dan je denkt," zei hij. „Ik heb het grote doek gezien bij Anna. Ik stond er gewoon voor en dacht: dit klopt. Ik kon je er niet bij vragen, maar ik had je er niet bij nodig."

Lisa keek naar haar glas. „Dat is eigenlijk het mooiste wat je kon zeggen."

„Nou, ik meen het gewoon."

„Dat maakt het nog mooier."

Ze lachten allebei. Buiten begon het te regenen. Niemand stond op.`,
    words: {
      zenuwachtig:  { english: 'nervous' },
      beleefd:      { english: 'polite' },
      controleren:  { english: 'to control / check' },
      aanwezig:     { english: 'present / attentive' },
      verdeelde:    { english: 'distributed / divided' },
      menen:        { english: 'to mean sincerely' },
      zweeg:        { english: 'was silent / fell silent' },
    },
    comprehensionQuestions: [
      { question: 'Waar is Lisa het meest bang voor bij de opening?', options: ['Dat niemand komt', 'Dat mensen beleefd zijn maar het werk eigenlijk niet begrijpen', 'Dat de schilderijen beschadigd raken'], correctIndex: 1 },
      { question: 'Wat is er de laatste weken anders aan Marc?', options: ['Hij werkt harder', 'Hij is rustiger en meer aanwezig', 'Hij ziet Lisa minder vaak'], correctIndex: 1 },
      { question: 'Wat zegt Marc over het grote doek bij Anna?', options: ['"Het is mijn favoriete schilderij aller tijden"', '"Ik stond er gewoon voor en dacht: dit klopt"', '"Ik snapte er ook niets van"'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-7',
    title: 'De opening',
    titleTranslation: 'The Opening',
    level: 'B1', module: M, moduleTitle: MT,
    content: `De avond zelf was anders dan Lisa had verwacht.

Ze had zich voorgesteld dat ze de hele avond zenuwachtig zou zijn, dat ze bij de deur zou staan en niet zou weten wat ze moest zeggen. Maar het liep anders. Er kwamen meer mensen dan ze had gedacht — zeventig, misschien tachtig. Sommigen kende ze. Veel niet.

Wat haar verraste, was hoe mensen bewogen. Ze liepen van werk naar werk, bleven soms lang staan bij één doek, gingen dan door. Niemand vroeg haar om uitleg. Dat had ze gevreesd — dat mensen vragen zouden stellen die ze niet kon beantwoorden. Maar de vragen die kwamen waren anders: wanneer heb je dit gemaakt, waar denk jij zelf aan als je dit ziet, is dit olie of acryl.

Het grote doek hing achteraan. Ze had het toch meegebracht, ook al had ze er lang over getwijfeld. Een vrouw die ze niet kende stond er lang voor. Lisa observeerde haar vanuit een afstand — zag hoe ze haar hoofd kantelde, hoe ze een stap dichterbij deed. Na een tijdje draaide de vrouw zich om en zei niets. Ze knikte alleen kort naar Lisa, alsof ze iets hadden gedeeld zonder woorden.

Anna, Tom, Fatima en Marc waren er allemaal. Marc stond een tijdje bij het kleinste schilderij — een interieur, bijna leeg, één raam. Lisa liep langs en hij zei: „Dit is mijn favoriet."

„Waarom?"

„Omdat de ruimte erin ademt."

Lisa begreep precies wat hij bedoelde. Ze had het zelf niet zo kunnen zeggen, maar het klopte.

Ze dronk haar wijn op en dacht: dit was het dan. Niet triomfantelijk. Gewoon: dit is wat het is.`,
    words: {
      verraste:       { english: 'surprised' },
      gevreesd:       { english: 'feared / dreaded' },
      acryl:          { english: 'acrylic (paint)' },
      observeerde:    { english: 'observed / watched' },
      triomfantelijk: { english: 'triumphantly' },
      ademt:          { english: 'breathes' },
      interieur:      { english: 'interior' },
    },
    comprehensionQuestions: [
      { question: 'Wat verraste Lisa het meest tijdens de opening?', options: ['Dat er maar tien mensen kwamen', 'Hoe mensen bewogen van werk naar werk en lang bleven staan', 'Dat niemand haar werk mooi vond'], correctIndex: 1 },
      { question: 'Wat deed de onbekende vrouw na het kijken naar het grote doek?', options: ['Ze stelde veel vragen aan Lisa', 'Ze knikte kort naar Lisa, alsof ze iets hadden gedeeld zonder woorden', 'Ze kocht het schilderij meteen'], correctIndex: 1 },
      { question: 'Welk schilderij is Marcs favoriet en waarom?', options: ['Het grote doek, omdat het zo persoonlijk is', 'Het kleinste schilderij — een interieur met één raam — omdat de ruimte erin ademt', 'Het eerste schilderij dat Lisa heeft gemaakt'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-8',
    title: 'Creativiteit en twijfel',
    titleTranslation: 'Creativity and Doubt',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Kunstenaars twijfelen. Niet soms, maar structureel. En dat is geen zwakte — het is een kenmerk van serieuze creatieve praktijk.

Wat onderzoek laat zien

Psychologen die creatieve processen bestuderen zeggen dat twijfel en creativiteit nauw met elkaar verbonden zijn. Mensen die creatief werk maken, zijn doorgaans sterk zelfkritisch — ze zien de kloof tussen wat ze willen maken en wat er daadwerkelijk op het doek, de pagina of het scherm staat. Die kloof is pijnlijk, maar ook noodzakelijk: het is precies die spanning die mensen dwingt om door te gaan, te verbeteren, nieuwe oplossingen te zoeken.

Een schrijver over het creatieve proces omschreef dit ooit treffend: mensen die net beginnen met creatief werk, hebben smaak. Ze weten wat goed is. Maar hun eigen werk haalt dat niveau nog niet. Dat verschil is tijdelijk — maar het is ook de reden waarom veel mensen ophouden. Ze vergissen zich: ze denken dat de twijfel betekent dat ze niet goed genoeg zijn. In werkelijkheid betekent het dat ze veeleisend zijn.

Twijfel als oriëntatie

Ervaren kunstenaars leren twijfel te gebruiken als oriëntatiemiddel. De vraag klopt dit? is niet hetzelfde als is dit mislukt? Het eerste is productief. Het tweede blokkeert.

Wat helpt, is het onderscheid maken tussen twijfel die informeert en twijfel die verlamt. De eerste soort leidt tot aanpassingen, nieuwe keuzes, betere werken. De tweede soort is vaak angst die zich vermomt als kritiek.

Waarom het niet verdwijnt

Zelfs succesvolle kunstenaars houden twijfelen. Ze leren er niet mee te stoppen, maar ermee om te gaan — te beseffen dat onzekerheid over het eigen werk geen signaal is dat het werk slecht is, maar dat het gemaakt is door iemand die het serieus neemt.`,
    words: {
      structureel:      { english: 'structural / ongoing' },
      zelfkritisch:     { english: 'self-critical' },
      kloof:            { english: 'gap / gulf' },
      veeleisend:       { english: 'demanding / high-standard' },
      oriëntatiemiddel: { english: 'navigational tool / point of reference' },
      verlamt:          { english: 'paralyses' },
      vermomt:          { english: 'disguises itself' },
    },
    comprehensionQuestions: [
      { question: 'Waarom vergissen beginnende creatievelingen zich volgens de tekst?', options: ['Ze denken dat twijfelen betekent dat ze niet goed genoeg zijn, terwijl het betekent dat ze veeleisend zijn', 'Ze stoppen te snel met een project', 'Ze luisteren te veel naar kritiek van anderen'], correctIndex: 0 },
      { question: 'Wat is het verschil tussen "klopt dit?" en "is dit mislukt?"?', options: ['Ze betekenen hetzelfde', 'De eerste vraag is productief, de tweede blokkeert', 'De tweede vraag is productiever'], correctIndex: 1 },
      { question: 'Wat leren ervaren kunstenaars over twijfel?', options: ['Hoe ze het kunnen vermijden', 'Dat het verdwijnt naarmate je beter wordt', 'Hoe ze ermee om kunnen gaan in plaats van ermee te stoppen'], correctIndex: 2 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-9',
    title: 'De dag erna',
    titleTranslation: 'The Day After',
    level: 'B1', module: M, moduleTitle: MT,
    content: `De dag na de opening stond Lisa laat op. Ze had goed geslapen — beter dan in weken. Ze maakte koffie en ging bij het raam zitten zonder haar telefoon te pakken.

Er waren berichten. Dat wist ze. Mensen die hadden geschreven na de avond. Ze zouden er straks wel zijn.

Ze dacht aan de vrouw die voor het grote doek had gestaan en niets had gezegd. Ze dacht aan Marc die had gezegd de ruimte erin ademt. Ze dacht aan Hester Vos, die haar bij de deur had ingehaald aan het einde van de avond en had gezegd dat er al twee mensen hadden gevraagd of werk te koop was.

Te koop. Ze had er niet bij stilgestaan.

Het was een vreemd gevoel — niet onaangenaam, maar vreemd. Haar werk had de kamer verlaten. Het bestond nu ook in de ogen van mensen die ze niet kende. Dat was wat ze had gewild, en toch voelde het anders dan ze had verwacht.

Ze schreef een kort berichtje aan Anna: gisterenavond was goed. Ik ben blij dat ik het heb gedaan.

Anna schreef terug: Dat wist ik al. Was jij de enige die het nog niet wist?

Lisa glimlachte. Ze realiseerde zich dat ze het inderdaad had gedaan — niet perfect, niet zonder twijfel, maar gedaan.

Ze pakte haar schetsboek dat al weken dicht had gelegen. Ze sloeg het open op een lege pagina.

Ze begon niet meteen te tekenen. Ze zat gewoon met het open boek in haar schoot en keek naar buiten, naar de straat die nat was van de regen van de nacht.

Na een tijdje pakte ze een potlood.`,
    words: {
      ingehaald:    { english: 'caught up with / intercepted' },
      stilgestaan:  { english: 'stood still at / considered' },
      onaangenaam:  { english: 'unpleasant' },
      schetsboek:   { english: 'sketchbook' },
      schoot:       { english: 'lap' },
      potlood:      { english: 'pencil' },
      verlaten:     { english: 'left / departed from' },
    },
    comprehensionQuestions: [
      { question: 'Wat had Hester Vos Lisa aan het einde van de avond verteld?', options: ['Dat de opening een mislukking was', 'Dat er al twee mensen hadden gevraagd of werk te koop was', 'Dat de galerie meer schilderijen nodig had'], correctIndex: 1 },
      { question: 'Hoe voelt Lisa dat haar werk nu in andermans ogen bestaat?', options: ['Heel trots en blij', 'Vreemd, niet onaangenaam maar anders dan verwacht', 'Verdrietig omdat het haar niet meer toebehoort'], correctIndex: 1 },
      { question: 'Wat doet Lisa aan het einde van de tekst?', options: ['Ze stuurt berichten aan alle bezoekers', 'Ze pakt een schetsboek en uiteindelijk een potlood', 'Ze belt haar moeder om over de opening te vertellen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m5-10',
    title: 'Wat het betekent',
    titleTranslation: 'What It Means',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Een week na de opening zaten Lisa en Fatima op het terras — het was koud, maar de zon scheen en Fatima had gezegd: we gaan buiten zitten, punt.

Lisa had de vragen die mensen hadden gesteld nog steeds in haar hoofd. Niet de mooie opmerkingen, maar de echte vragen. Een man had haar gevraagd: waarom schilder je? Ze had iets gezegd over kleuren en beelden, over dingen uitdrukken die je niet in woorden kunt zeggen. Hij had geknikt, maar ze had het gevoel gehad dat haar antwoord te netjes was.

„Waarom schilder je eigenlijk?" vroeg Fatima nu. Ze zei het zonder aanleiding, alsof ze de gedachte had geraden.

Lisa dacht na. Ze probeerde om dit keer eerlijker te zijn.

„Ik denk," zei ze langzaam, „dat ik schilder omdat ik anders niet weet wat ik denk. Alsof het pas bestaat als ik het heb gemaakt."

Fatima zweeg even. „Dat herken ik. Ik kook soms om hetzelfde te doen. Om iets te begrijpen dat ik niet kan zeggen."

Lisa keek haar aan. Ze had dat verband nooit gelegd.

„Is dat hetzelfde?"

„Ik denk van wel," zei Fatima. „Het materiaal is anders. Maar het gevoel dat je iets vasthoudt wat anders wegglijdt — dat is hetzelfde."

Ze zaten een tijdje zonder te praten. De zon verplaatste zich langzaam. Een kind op de stoep oefende met een step en viel, stond op, probeerde het opnieuw.

Lisa keek naar haar handen. Ze had nog verf onder haar nagels. Ze had gisteren al weer geschilderd — niet voor de galerie, niet voor iemand anders. Gewoon omdat ze het wilde.

Dat was eigenlijk het antwoord, besefte ze. Niet de opening, niet de reacties. Dit.`,
    words: {
      aanleiding:  { english: 'reason / prompt / trigger' },
      uitdrukken:  { english: 'to express' },
      netjes:      { english: 'neat / tidy / too polished' },
      verband:     { english: 'connection / link' },
      wegglijdt:   { english: 'slips away' },
      verplaatste: { english: 'moved / shifted' },
      besefte:     { english: 'realised' },
    },
    comprehensionQuestions: [
      { question: 'Waarom vond Lisa haar antwoord op "waarom schilder je?" te netjes?', options: ['Het was te lang', 'Het klopte technisch maar voelde niet echt eerlijk', 'Ze had de vraag niet begrepen'], correctIndex: 1 },
      { question: 'Welk verband legt Fatima tussen koken en schilderen?', options: ['Beide vragen veel geld', 'Beide zijn manieren om iets vast te houden wat anders wegglijdt', 'Beide leer je het best van je moeder'], correctIndex: 1 },
      { question: 'Wat is voor Lisa uiteindelijk het echte antwoord op waarom ze schildert?', options: ['De positieve reacties van bezoekers', 'De mogelijkheid om werk te verkopen', 'Dat ze het gewoon wilde — niet voor de galerie of voor anderen'], correctIndex: 2 },
    ],
    completed: false,
  },
];
