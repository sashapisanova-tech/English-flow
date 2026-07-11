import { ReadingText } from '@/types/dutch';

const M = 'b1-nature-landscape' as const;
const MT = 'Natuur en het Nederlandse landschap';

export const moduleB1_6Texts: ReadingText[] = [
  {
    id: 'b1m6-1',
    title: 'Waarom hij ging',
    titleTranslation: 'Why He Left',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Daan had al weken het gevoel dat hij ergens naartoe moest. Niet naar een vergadering, niet naar een bouwplaats. Gewoon weg — naar een plek waar niets van hem was ontworpen.

Het idee begon na een gesprek met Tom, een paar weken na de tentoonstelling van Lisa. Ze waren op de fiets geweest, en Tom had iets gezegd over hoe hij de stad anders was gaan zien sindsdien — niet als iets wat er gewoon was, maar als iets wat was gemaakt. Dat heb ik jou geleerd, had Daan gedacht. Maar terwijl hij dat dacht, had hij zich gerealiseerd dat hij zelf al een tijdje niet buiten de stad was geweest. Niet echt.

Hij had een paar dagen vrij genomen. Hij had een klein huis gehuurd in Zeeland — vlak bij de kust, ver van Amsterdam. Hij had niemand gevraagd om mee te gaan, wat ongewoon was. Tom had dat opgemerkt.

"Je gaat alleen?"

"Ja."

"Waarom?"

Daan had even nagedacht over de manier waarop hij het moest uitleggen. "Ik denk dat ik ruimte nodig heb die ik niet zelf heb gemaakt. Dat klinkt vaag."

"Nee," zei Tom. "Dat klinkt eigenlijk heel logisch voor iemand die de hele dag dingen ontwerpt."

Daan had dat niet verwacht. Hij had een verdediging voorbereid. Die had hij niet nodig.

Op vrijdagochtend pakte hij een kleine tas, sloot zijn appartement af en nam de trein naar Middelburg. Terwijl de stad achter hem verdween en het landschap opener werd, voelde hij iets wat hij moeilijk kon benoemen — niet opluchting precies, maar iets wat erop leek. De horizon werd breder. De lucht nam meer ruimte in.

Hij keek naar buiten en dacht aan niets bijzonders.`,
    words: {
      sindsdien:   { english: 'since then' },
      opluchting:  { english: 'relief' },
      verdediging: { english: 'justification / defence' },
      vaag:        { english: 'vague' },
      bouwplaats:  { english: 'building site / construction site' },
      benoemen:    { english: 'to name / put into words' },
    },
    comprehensionQuestions: [
      { question: 'Waarom wil Daan de stad verlaten?', options: ['Hij heeft ruzie met collega\'s', 'Hij wil naar een plek waar niets van hem is ontworpen', 'Hij moet werken aan een project in Zeeland'], correctIndex: 1 },
      { question: 'Wat had Tom gezegd over de stad na de tentoonstelling?', options: ['Dat de stad te druk was geworden', 'Dat hij de stad anders was gaan zien — niet als iets wat er gewoon was, maar als iets wat was gemaakt', 'Dat hij ook graag weg wilde'], correctIndex: 1 },
      { question: 'Hoe reageerde Daan op de reactie van Tom op zijn uitleg?', options: ['Hij was teleurgesteld', 'Hij was verrast — hij had een verdediging voorbereid maar had die niet nodig', 'Hij was het niet eens met Tom'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-2',
    title: 'Een land dat zichzelf heeft gemaakt',
    titleTranslation: 'A Country That Made Itself',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Nederland is voor een groot deel geen natuur. Het is een constructie — letterlijk. Meer dan de helft van het land ligt onder zeeniveau of zou zonder waterbeheersing regelmatig overstromen. Wat er nu ligt — de polders, de weilanden, de steden — is het resultaat van eeuwen menselijk ingrijpen.

Polders en dijken

Een polder is een stuk land dat is drooggelegd door het water eruit te pompen en buiten te houden met dijken. De eerste polders dateren uit de middeleeuwen. In de zeventiende en achttiende eeuw werd de techniek steeds verder ontwikkeld. De Haarlemmermeer — nu een vlak polderlandschap met Schiphol erop — was vroeger een groot meer. In 1852 werd het drooggepompt.

Dit proces gaat door tot in de twintigste eeuw. De Zuiderzee, een grote binnenzee, werd afgesloten en deels drooggelegd. Dat leverde nieuwe provincies op: Flevoland, de jongste provincie van Nederland, bestaat geheel uit ingepolderd land.

Water als vijand en bondgenoot

De verhouding van de Nederlanders met water is complex. Water was eeuwenlang een bedreiging — overstromingen verwoestten dorpen, verdronken mensen, vernielden oogsten. Tegelijkertijd was water de bron van rijkdom: de zee maakte handel mogelijk, rivieren verbonden steden.

Die dubbele verhouding heeft iets bijzonders gedaan met de Nederlandse cultuur. Waterbeheer werd een gedeelde verantwoordelijkheid — iets wat de gemeenschap samen moest doen om te overleven. Het waterschap, een van de oudste democratische bestuursinstellingen van Nederland, stammen uit die traditie.

Wat dit betekent voor het landschap

Het Nederlandse landschap is een ontwerp. Niet van één architect, maar van generaties mensen die met water hebben geleefd. De manier waarop de weilanden liggen, de dijken lopen, de sloten graven — het is allemaal een keuze geweest.`,
    words: {
      zeeniveau:       { english: 'sea level' },
      waterbeheersing: { english: 'water management' },
      middeleeuwen:    { english: 'Middle Ages' },
      vijand:          { english: 'enemy' },
      bondgenoot:      { english: 'ally' },
      waterschap:      { english: 'water board / regional water authority' },
      stammen:         { english: 'to date back (to) / originate (from)' },
      ingepolderd:     { english: 'reclaimed (land)' },
    },
    comprehensionQuestions: [
      { question: 'Wat is een polder?', options: ['Een soort dijk', 'Een stuk land drooggelegd door water eruit te pompen en buiten te houden met dijken', 'Een provincie in het noorden van Nederland'], correctIndex: 1 },
      { question: 'Wat is er bijzonders aan Flevoland?', options: ['Het is de grootste provincie van Nederland', 'Het bestaat geheel uit ingepolderd land', 'Het heeft de meeste nationale parken'], correctIndex: 1 },
      { question: 'Wat deed de dubbele verhouding met water met de Nederlandse cultuur?', options: ['Het maakte Nederland arm', 'Waterbeheer werd een gedeelde verantwoordelijkheid — iets wat de gemeenschap samen moest doen', 'Het leidde tot veel conflicten'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-3',
    title: 'Tom belt',
    titleTranslation: 'Tom Calls',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Op de tweede avond in Zeeland zat Daan buiten voor het gehuurde huis. Het was koud maar droog. Ver weg was de zee te horen — niet als ruis, maar als iets dat in en uit ging, regelmatig.

Zijn telefoon trilde. Tom.

"Hoe is het daar?"

"Stil," zei Daan. "Heel stil."

"Is dat goed of slecht?"

"Goed, denk ik. Ik moet er nog aan wennen."

Tom lachte kort. "Ik heb nagedacht over wat je zei — dat het landschap hier ook een ontwerp is. Net als de stad."

"Ja."

"Maar dat vind ik eigenlijk ongemakkelijk," zei Tom. "Ik had gedacht dat natuur iets was wat er gewoon was. Iets wat niet door mensen was gemaakt."

"Dat snap ik wel," zei Daan. "Maar in Nederland bestaat dat bijna niet. Elk stuk grond is het resultaat van een beslissing. Dat had ik je eigenlijk al in module twee moeten uitleggen, toen we door de Jordaan fietsten."

"Dat had je kunnen doen," zei Tom droog. "Maar toen ging het over deuren."

Daan glimlachte. Daar had hij een punt. "Het verschil is," zei hij, "dat een gebouw één architect heeft, of een klein team. Een landschap heeft er duizenden gehad, over eeuwen. De reden waarom het zo plat is, waarom de dijken lopen zoals ze lopen — dat is het resultaat van beslissingen die mensen namen omdat ze geen andere keuze hadden."

"Dus het is geen ontwerp. Het is een noodzaak."

"Misschien allebei," zei Daan.

Tom zweeg even. "Ik ben het daar niet helemaal mee eens. Een noodzaak is iets wat je doet om te overleven. Een ontwerp is iets wat je kiest. Dat is anders."

"Je hebt een punt," zei Daan. "Maar ik denk dat die grens vager is dan je denkt."

Ze bleven nog even aan de telefoon. Buiten ging de zee door met zijn ritme.`,
    words: {
      ruis:        { english: 'noise / static' },
      noodzaak:    { english: 'necessity' },
      beslissingen: { english: 'decisions' },
      grens:       { english: 'boundary / border' },
    },
    comprehensionQuestions: [
      { question: 'Wat vindt Tom ongemakkelijk aan het gesprek?', options: ['Dat Daan alleen op vakantie is gegaan', 'Dat het landschap ook een ontwerp is, net als de stad', 'Dat Daan niet terugbelt'], correctIndex: 1 },
      { question: 'Wat is volgens Daan het verschil tussen een gebouw en een landschap?', options: ['Een gebouw is mooier', 'Een gebouw heeft één architect; een landschap heeft er duizenden gehad over eeuwen', 'Een landschap is goedkoper om te maken'], correctIndex: 1 },
      { question: 'Wat is het verschil tussen een noodzaak en een ontwerp, volgens Tom?', options: ['Er is geen verschil', 'Een noodzaak is wat je doet om te overleven; een ontwerp is wat je kiest', 'Een ontwerp is altijd duurder'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-4',
    title: 'Groen in een vol land',
    titleTranslation: 'Green in a Crowded Country',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Nederland is een van de dichtstbevolkte landen van Europa. Dat heeft gevolgen voor de ruimte die beschikbaar is voor natuur. Echte wildernis — ongerepte natuur zonder menselijk beheer — bestaat hier vrijwel niet. Wat wel bestaat, is beheerd groen: nationale parken, natuurgebieden, recreatiebossen. Maar ook die zijn het resultaat van keuzes en beleid.

Nationale parken

Nederland heeft twintig nationale parken, verspreid over het land. De Hoge Veluwe is het bekendste: een groot gebied met bossen, heide en zandverstuivingen in de provincie Gelderland. De Biesbosch in het zuiden is een uitgestrekt moerasgebied. De Waddenzee in het noorden is een Unesco-werelderfgoed.

Maar de meeste parken zijn relatief klein vergeleken met nationale parken in andere landen. En ze zijn omgeven door landbouw, snelwegen en bebouwing. De overgang van natuur naar stad is in Nederland vaak abrupt.

De stadsbewoner en de natuur

Veel Nederlandse stadsbewoners hebben een gecompliceerde verhouding met de natuur. Ze wonen in een van de meest stedelijke landen van de wereld, maar willen ook groen, stilte en ruimte — wat ze zoeken in parken, recreatiegebieden en weekendjes weg.

Dat verlangen is reëel, maar de verwachting is soms romantisch. Wie natuur zoekt als een plek zonder mensen, zonder geluid, zonder structuur, wordt in Nederland vaker teleurgesteld dan in landen met echte wildernissen.

Wat er toch is

En toch: er zijn plekken in Nederland die iets wezenlijks hebben. De kust van Zeeland. De uitgestrekte weilanden van Groningen. De stille heide van de Veluwe op een doordeweekse ochtend. Ze zijn niet wild. Maar ze zijn er wel, en ze doen iets met mensen die er de tijd voor nemen.`,
    words: {
      dichtbevolkt: { english: 'densely populated' },
      wildernis:    { english: 'wilderness' },
      ongerepte:    { english: 'untouched / pristine' },
      heide:        { english: 'heath / moorland' },
      verlangen:    { english: 'desire / longing' },
      wezenlijk:    { english: 'essential / fundamental' },
    },
    comprehensionQuestions: [
      { question: 'Waarom bestaat er vrijwel geen echte wildernis in Nederland?', options: ['Omdat het te koud is', 'Omdat het een van de dichtstbevolkte landen van Europa is en alle natuur beheerd wordt', 'Omdat de Nederlandse overheid het verboden heeft'], correctIndex: 1 },
      { question: 'Wat is de Hoge Veluwe?', options: ['Een moerasgebied in het zuiden', 'Een groot gebied met bossen, heide en zandverstuivingen in Gelderland', 'Een Unesco-werelderfgoed in het noorden'], correctIndex: 1 },
      { question: 'Waarom worden mensen die natuur zoeken in Nederland soms teleurgesteld?', options: ['Omdat de nationale parken niet gratis zijn', 'Omdat ze ongerepte natuur verwachten, maar alle natuur in Nederland beheerd is', 'Omdat het altijd regent'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-5',
    title: 'De boer op de dijk',
    titleTranslation: 'The Farmer on the Dike',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Op de derde dag wandelde Daan langs een dijk aan de rand van een polder. Het was vroeg — het licht was nog laag en geel. Hij had een thermos koffie mee en liep zonder plan.

Bij een hek stond een man van een jaar of zestig. Hij keek naar een sloot aan de andere kant van de dijk.

"Goedemorgen," zei Daan.

"Morgen." De man knikte. "U bent hier niet van hier."

Het was geen vraag. "Nee," zei Daan. "Ik ben architect. Uit Amsterdam."

De man keek hem aan. "Architect. En wat doet een architect hier?"

"Kijken," zei Daan.

De man leek dat een acceptabel antwoord te vinden. Hij wees naar de sloot. "Die heeft gisteren gemorst. Te veel water. Ik ga straks de pompinstallatie nakijken."

"Doet u dat zelf?"

"Wie anders?" Hij zei het zonder bitterheid. "Waterschap komt als het te laat is."

Daan keek naar de sloot. Het water stond hoog — hoger dan het land eromheen. Dat had hij gelezen, maar nu hij het zag, was het anders. Het land was lager dan het water. Dat was de realiteit van dit landschap: het water werd boven het hoofd gehouden door dijken en pompen en mensen die elke ochtend controleerden of alles nog klopte.

"Hoe lang woont u hier?" vroeg Daan.

"Mijn hele leven. Mijn vader ook. Zijn vader ook." Hij haalde zijn schouders op. "Dit land bestaat omdat mensen het hebben gemaakt. En het blijft bestaan omdat mensen het bijhouden."

Daan knikte. Hij dacht aan zijn eigen werk — de gebouwen die hij had ontworpen, de beslissingen die hij over ruimte en structuur had genomen. Dit was anders. Dit was niet één beslissing. Dit was een doorlopend gesprek met het water.

"Dank u wel," zei hij.

De man knikte al weer naar de sloot.`,
    words: {
      hek:              { english: 'fence / gate' },
      sloot:            { english: 'ditch' },
      bitterheid:       { english: 'bitterness' },
      knikte:           { english: 'nodded (knikken)' },
      nakijken:         { english: 'to check / inspect' },
      pompinstallatie:  { english: 'pump installation' },
    },
    comprehensionQuestions: [
      { question: 'Wat ontdekt Daan als hij naar de sloot kijkt?', options: ['Dat de sloot droog staat', 'Dat het land lager is dan het water — het water wordt boven het hoofd gehouden door dijken en pompen', 'Dat er vissen in zitten'], correctIndex: 1 },
      { question: 'Wat zegt de boer over waarom het land blijft bestaan?', options: ['Omdat de overheid het onderhoudt', 'Omdat mensen het bijhouden', 'Omdat de natuur zichzelf herstelt'], correctIndex: 1 },
      { question: 'Waaraan denkt Daan als hij luistert naar de boer?', options: ['Aan zijn vakantieplannen', 'Aan zijn eigen werk — de gebouwen die hij ontwierp en de beslissingen over ruimte en structuur', 'Aan Tom en Anna'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-6',
    title: 'Stilte als materiaal',
    titleTranslation: 'Silence as Material',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Op de vierde dag regende het. Daan bleef binnen en keek door het raam naar het land. In de stad dacht hij altijd in termen van ontwerp — hoe een gebouw eruitziet, hoe mensen erdoorheen bewegen, wat een ruimte doet met de mensen die erin zijn. Dat was zijn werk en hij hield ervan. Maar hier, tegenover dit landschap, merkte hij dat hij anders dacht. Niet in termen van ontwerp, maar in termen van aanwezigheid.

De stilte was het eerste wat hem had getroffen toen hij aankwam. Niet de afwezigheid van geluid — de wind was constant, en de vogels — maar de afwezigheid van spanning. In Amsterdam was er altijd iets dat om aandacht vroeg. Hier vroeg niets iets van hem. Hij was er gewoon.

Hij had eerder vaker alleen moeten reizen, besefte hij. Niet als vakantie, maar als noodzaak. De manier waarop hij altijd bezig was — met projecten, met mensen, met de vraag of zijn ontwerpen klopten — had hem iets gekost dat hij niet goed had kunnen benoemen. Nu begon hij het te begrijpen: het was herstel dat hij niet had toegelaten.

Hij dacht aan Anna, die na haar project had moeten leren om uit te rusten. Hij had dat destijds van een afstand gezien. Nu begreep hij het iets beter.

Hij pakte zijn schetsboek — niet om iets te ontwerpen, maar om te kijken. Hij tekende de horizon: een rechte lijn, het land plat, de lucht er bovenop. Het was het eenvoudigste wat hij ooit had getekend. Maar iets waarbij hij lang bleef zitten, zonder haast om het te verbeteren.`,
    words: {
      aanwezigheid: { english: 'presence' },
      afwezigheid:  { english: 'absence' },
      destijds:     { english: 'at the time / back then' },
      herstel:      { english: 'recovery / restoration' },
      spanning:     { english: 'tension / stress' },
    },
    comprehensionQuestions: [
      { question: 'Wat is het eerste wat Daan trof bij aankomst?', options: ['De afwezigheid van geluid', 'Niet de afwezigheid van geluid, maar de afwezigheid van spanning', 'Het slechte weer'], correctIndex: 1 },
      { question: 'Wat had Daan niet toegelaten, besefte hij?', options: ['Meer vrije tijd', 'Herstel', 'Nieuwe vriendschappen'], correctIndex: 1 },
      { question: 'Waarom tekent Daan de horizon in zijn schetsboek?', options: ['Om het te verkopen', 'Niet om iets te ontwerpen, maar om te kijken', 'Omdat zijn opdrachtgever erom vroeg'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-7',
    title: 'Waterbeheer als wereldmodel',
    titleTranslation: 'Water Management as a World Model',
    level: 'B1', module: M, moduleTitle: MT,
    content: `De manier waarop Nederland met water omgaat wordt internationaal bewonderd en bestudeerd. Wat in eeuwen van noodzaak is opgebouwd, is inmiddels een expertise geworden die landen over de hele wereld proberen toe te passen.

De Deltawerken

Na de watersnoodramp van 1953 — waarbij meer dan 1800 mensen in Zeeland en Zuid-Holland omkwamen — besloot de Nederlandse overheid tot een grootschalig ingrijpen. De Deltawerken, een reeks dammen, sluizen en stormvloedkeringen, werden gebouwd om de kustlijn te verkorten en de bevolking te beschermen.

De Maeslantkering bij Rotterdam is een van de meest spectaculaire bouwwerken: twee enorme stalen armen die zich sluiten als het waterpeil te hoog wordt. Ze zijn zo groot dat er een voetbalstadion in past. Ze zijn ook volledig automatisch en worden slechts enkele keren per decennium ingezet.

Klimaatverandering en de toekomst

Door klimaatverandering stijgt de zeespiegel. Dat is voor Nederland geen abstracte bedreiging maar een concrete uitdaging. De waterbeheerders — rijkswaterstaat, waterschappen, gemeenten — werken aan plannen voor de komende decennia. Die plannen gaan niet alleen over hogere dijken, maar ook over het anders inrichten van steden, het herstel van natuurlijke buffers, en het accepteren dat sommige plekken in de toekomst niet meer bewoonbaar zijn.

Wat anderen leren

Landen als Bangladesh, Vietnam en de Verenigde Staten — met kustgebieden die ook door stijgend water bedreigd worden — sturen vertegenwoordigers naar Nederland om te leren. De manier waarop Nederlanders met water omgaan, is niet alleen technisch. Het is ook cultureel: de bereidheid om samenwerking boven individuele belangen te stellen, de gewoonte om op lange termijn te denken.

Dat is geen vanzelfsprekendheid. Maar het is iets waarvoor Nederland bekend staat.`,
    words: {
      watersnoodramp:   { english: 'flood disaster' },
      grootschalig:     { english: 'large-scale' },
      stormvloedkering: { english: 'storm surge barrier' },
      kustlijn:         { english: 'coastline' },
      vertegenwoordigers: { english: 'representatives' },
      zeespiegel:       { english: 'sea level' },
    },
    comprehensionQuestions: [
      { question: 'Wat was de aanleiding voor de Deltawerken?', options: ['De Tweede Wereldoorlog', 'De watersnoodramp van 1953 waarbij meer dan 1800 mensen omkwamen', 'De stijging van de zeespiegel door klimaatverandering'], correctIndex: 1 },
      { question: 'Hoe werkt de Maeslantkering?', options: ['Het is een dam die permanent gesloten is', 'Twee enorme stalen armen die zich sluiten als het waterpeil te hoog wordt, volledig automatisch', 'Een reeks pompen die water wegpompen'], correctIndex: 1 },
      { question: 'Wat leren andere landen van Nederland naast de techniek?', options: ['Hoe je goedkoop dijken bouwt', 'De bereidheid tot samenwerking boven individuele belangen en de gewoonte om op lange termijn te denken', 'Hoe je met weinig water kunt leven'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-8',
    title: 'Terugkeer',
    titleTranslation: 'Return',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Op de vijfde dag reed Daan terug naar Amsterdam. De trein vertrok vroeg. Hij zat bij het raam.

Het landschap veranderde terwijl hij reed — het brede, open Zeeuwse land maakte langzaam plaats voor smallere weiden, daarna de eerste voorsteden, daarna de stad zelf. Hij zag de flatgebouwen aan de rand van Amsterdam. Het had een beter ontwerp kunnen zijn, dacht hij — maar het was een ontwerp. Hij was vijf dagen weg geweest. Hij vroeg zich af wat er anders zou zijn.

Er waren berichten van zijn collega's, van Tom, van Anna. Hij had ze gelezen maar nog niet beantwoord.

In Amsterdam nam hij de tram naar zijn appartement. De stad was luid na vijf dagen stilte. Niet onaangenaam — hij hield van de stad, dat was niet veranderd — maar anders dan hij hem kende. Als iemand die even weg is geweest en met andere ogen terugkomt.

Hij zette zijn tas neer en keek om zich heen in zijn appartement. Op zijn bureau lagen de tekeningen van een project dat hij de week erna moest presenteren. Hij zou er morgen naar kijken. Niet vanavond.

Vanavond schreef hij een berichtje aan Tom: Ik ben terug. Morgen koffie?

Tom antwoordde snel: Ja. Hoe was het?

Daan dacht even na over wat hij wilde zeggen. Hij had vijf dagen gehad om erover na te denken, en toch kon hij het niet goed onder woorden brengen.

Goed, schreef hij uiteindelijk. Ik vertel het je morgen.`,
    words: {
      voorsteden:   { english: 'suburbs' },
      beantwoorden: { english: 'to answer / reply to' },
      flatgebouwen: { english: 'apartment blocks' },
      onaangenaam:  { english: 'unpleasant' },
    },
    comprehensionQuestions: [
      { question: 'Hoe voelt de stad voor Daan na vijf dagen?', options: ['Vervelend — hij wil terug naar Zeeland', 'Luid maar niet onaangenaam — anders dan hij hem kende', 'Precies hetzelfde als altijd'], correctIndex: 1 },
      { question: 'Wat besluit Daan over het project op zijn bureau?', options: ['Hij begint er meteen aan', 'Hij kijkt er morgen naar, niet vanavond', 'Hij stuurt het naar een collega'], correctIndex: 1 },
      { question: 'Waarom kan Daan zijn vijf dagen niet goed beschrijven aan Tom?', options: ['Omdat hij te moe is', 'Omdat hij het na vijf dagen nadenken nog steeds niet goed onder woorden kan brengen', 'Omdat Tom het toch niet zou begrijpen'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-9',
    title: 'Wat landschap met mensen doet',
    titleTranslation: 'What Landscape Does to People',
    level: 'B1', module: M, moduleTitle: MT,
    content: `Mensen hebben ruimte nodig. Dat klinkt vanzelfsprekend, maar wat het precies betekent — en waarom sommige landschappen ons anders laten voelen dan andere — is een vraag die onderzoekers al decennia bezighoudt.

Herstellende omgevingen

Omgevingspsychologen onderscheiden herstellende omgevingen van gewone omgevingen. Een herstellende omgeving is een plek die de aandacht niet vraagt maar aantrekt — niet door urgentie, maar door interesse. Natuur werkt vaak zo: de beweging van water, de variatie in een bomenrij, de open horizon. Je kijkt zonder te hoeven opletten.

Dit onderscheid is belangrijk. In steden vraagt de omgeving voortdurend om gerichte aandacht: verkeer, mensen, informatie, beslissingen. Dat kost energie. In een natuurlijke omgeving kan de aandacht rusten — en daarmee herstelt ook het vermogen om je te concentreren.

De horizon

Onderzoekers hebben specifiek gekeken naar de invloed van open horizonten op welzijn. Mensen die in een open landschap staan — een strand, een weidse polder, een bergvlakte — rapporteren minder spanning, een rustiger ademhaling en een ander tijdsgevoel. De horizon geeft het brein het signaal dat er geen directe bedreiging is, dat er ruimte is om te ademen.

In Nederland is de horizon een bijzonder landschapskenmerk. Nergens in Europa is het land zo vlak, de lucht zo groot, de lijn tussen aarde en hemel zo duidelijk aanwezig.

Terug naar het gewone

Wat mensen uit zo'n omgeving meenemen, verdwijnt snel als ze naar de stad terugkeren. Maar onderzoek laat zien dat zelfs een korte periode in een herstellende omgeving een meetbaar effect heeft op concentratie, stemming en het vermogen om met spanning om te gaan.

Niet als oplossing voor alles. Maar als onderbreking die een meetbaar verschil maakt.`,
    words: {
      ademhaling:   { english: 'breathing' },
      stemming:     { english: 'mood' },
      welzijn:      { english: 'well-being' },
      weids:        { english: 'vast / expansive' },
      onderbreking: { english: 'interruption' },
      tijdsgevoel:  { english: 'sense of time' },
    },
    comprehensionQuestions: [
      { question: 'Wat is een herstellende omgeving?', options: ['Een omgeving die altijd stil is', 'Een plek die de aandacht niet vraagt maar aantrekt — niet door urgentie, maar door interesse', 'Een omgeving zonder mensen'], correctIndex: 1 },
      { question: 'Welk effect heeft een open horizon op mensen?', options: ['Mensen voelen zich eenzamer', 'Ze rapporteren minder spanning, een rustiger ademhaling en een ander tijdsgevoel', 'Ze worden sneller moe'], correctIndex: 1 },
      { question: 'Hoe lang duurt het effect van een herstellende omgeving?', options: ['Permanent — het effect verdwijnt nooit', 'Het verdwijnt snel, maar zelfs een korte periode heeft een meetbaar effect op concentratie en stemming', 'Minimaal een week'], correctIndex: 1 },
    ],
    completed: false,
  },
  {
    id: 'b1m6-10',
    title: 'Koffie met Tom',
    titleTranslation: 'Coffee with Tom',
    level: 'B1', module: M, moduleTitle: MT,
    content: `De volgende ochtend zaten Daan en Tom in het café bij het park. Het was vroeg nog, de tafels buiten leeg. Ze zaten binnen, met koffie.

"Dus," zei Tom. "Vertel."

Daan dacht even na. "Ik weet niet precies wat ik wil zeggen. Maar ik denk dat ik iets heb begrepen over hoe ik werk."

"Hoe bedoel je?"

"Ik ontwerp de hele dag ruimtes voor andere mensen. Ik denk na over hoe mensen zich bewegen, wat ze voelen als ze ergens zijn, welke keuzes ze onbewust maken omdat de ruimte ze daartoe uitnodigt. Maar ik doe dat allemaal vanuit een kamer. Vanuit tekeningen." Hij keek naar zijn kopje. "En ik was vergeten hoe het is om gewoon ergens te zijn. Zonder plan."

Tom knikte. Hij herinnerde zich het gesprek dat ze hadden gehad toen ze door de Jordaan fietsten — twee jaar geleden al bijna. Daan had hem geleerd om deuren te zien, gevels, de manier waarop een straat was gebouwd. Nu was het omgekeerd.

"Je hebt jezelf als kijker verloren," zei Tom.

Daan keek hem aan. "Dat is eigenlijk een goede omschrijving."

"Was het Zeeland?"

"Zeeland hielp. Maar het was meer de stilte, denk ik. De afwezigheid van iets waarvoor ik verantwoordelijk was." Hij zweeg even. "Ik snap nu beter waarom Anna na haar project zo lang nodig had. De spanning was er zo ingeslopen dat ze hem niet meer kon zien."

Tom zweeg. Buiten liep iemand voorbij met een hond die achter een duif aanging.

"Ga je het vaker doen?" vroeg Tom.

"Ja," zei Daan. "Ik had het eerder moeten doen."

Ze dronken hun koffie. Het werd langzaam drukker buiten.`,
    words: {
      omschrijving:    { english: 'description' },
      duif:            { english: 'dove / pigeon' },
      kijker:          { english: 'viewer / observer' },
      verantwoordelijk: { english: 'responsible' },
    },
    comprehensionQuestions: [
      { question: 'Wat bedoelt Tom met "Je hebt jezelf als kijker verloren"?', options: ['Daan kan niet meer goed zien', 'Daan ontwerpt ruimtes voor anderen maar was vergeten hoe het is om zelf ergens te zijn zonder plan', 'Daan is zijn schetsboek verloren'], correctIndex: 1 },
      { question: 'Wat begreep Daan nu beter over Anna?', options: ['Dat ze goed kan schilderen', 'Dat de spanning er zo ingeslopen was dat ze hem niet meer kon zien', 'Dat ze vaker op vakantie moest'], correctIndex: 1 },
      { question: 'Wat zegt Daan als Tom vraagt of hij het vaker gaat doen?', options: ['Misschien, hij denkt er nog over na', 'Ja, hij had het eerder moeten doen', 'Nee, het was te stil'], correctIndex: 1 },
    ],
    completed: false,
  },
];
