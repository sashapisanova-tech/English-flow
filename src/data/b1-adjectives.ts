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
  return { id, emoji, title, category: 'adjectives', level: 'B1', folder: 'Adjectives', words };
}

export const b1AdjectiveSets: FlashcardSet[] = [

  aset('b1-adj-personality', '🪞', 'Personality (nuanced)', [
    adj('eigenwijs',     'stubborn / opinionated',   'eigenwijze',       'Hij is eigenwijs en luistert niet.',           'He is stubborn and does not listen.',          'eigenwijs → eigenwijze before noun; can be charming or annoying'),
    adj('meegaand',     'easygoing / compliant',     'meegaande',        'Ze is heel meegaand in de groep.',             'She is very easygoing in the group.'),
    adj('vasthoudend',  'persistent / tenacious',    'vasthoudende',     'Hij is vasthoudend als hij iets wil.',         'He is persistent when he wants something.'),
    adj('naïef',        'naive',                     'naïeve',           'Ze was naïef om hem te vertrouwen.',           'She was naive to trust him.',                  'naïef → naïeve before noun'),
    adj('cynisch',      'cynical',                   'cynische',         'Hij is cynisch over de politiek.',             'He is cynical about politics.'),
    adj('introvert',    'introverted',               'introverte',       'Ze is introvert maar heel vriendelijk.',       'She is introverted but very friendly.'),
    adj('extravert',    'extroverted',               'extraverte',       'Hij is extravert en houdt van feestjes.',      'He is extroverted and loves parties.'),
    adj('impulsief',    'impulsive',                 'impulsieve',       'Ze doet impulsieve aankopen.',                 'She makes impulsive purchases.',               'impulsief → impulsieve before noun'),
    adj('beredeneerd',  'reasoned / considered',     'beredeneerde',     'Zijn beslissing was beredeneerd.',             'His decision was considered.'),
    adj('gedreven',     'driven / motivated',        null,               'Ze is een gedreven student.',                  'She is a driven student.',                     'past participle as adjective — never adds -e'),
  ]),

  aset('b1-adj-emotions', '💭', 'Emotions & inner life', [
    adj('verward',       'confused / bewildered',    'verwarde',         'Ik ben een beetje verward.',                   'I am a bit confused.'),
    adj('overweldigd',   'overwhelmed',              'overweldigde',     'Ze voelt zich overweldigd door het werk.',     'She feels overwhelmed by the work.'),
    adj('gefrustreerd',  'frustrated',               'gefrustreerde',    'Hij is gefrustreerd door de vertraging.',     'He is frustrated by the delay.'),
    adj('nostalgisch',   'nostalgic',                'nostalgische',     'Ze wordt nostalgisch van oude foto\'s.',       'She feels nostalgic looking at old photos.'),
    adj('melancholisch', 'melancholic',              'melancholische',   'Hij is in een melancholische stemming.',       'He is in a melancholic mood.'),
    adj('geïrriteerd',   'irritated',                'geïrriteerde',     'Ze was geïrriteerd door het lawaai.',         'She was irritated by the noise.'),
    adj('enthousiast',   'enthusiastic',             'enthousiaste',     'De studenten zijn enthousiast.',               'The students are enthusiastic.',               'enthousiast → enthousiaste before noun'),
    adj('apathisch',     'apathetic',                'apathische',       'Hij reageerde apathisch op het nieuws.',       'He reacted apathetically to the news.'),
    adj('gespannen',     'tense / stressed',         null,               'Ze is gespannen voor de presentatie.',         'She is tense before the presentation.',        'never adds -e'),
    adj('ontspannen',    'relaxed',                  null,               'Na de vakantie voel ik me ontspannen.',        'After the holiday I feel relaxed.',            'never adds -e'),
  ]),

  aset('b1-adj-thinking', '🔍', 'Thinking & reasoning', [
    adj('logisch',       'logical',                  'logische',         'Zijn redenering is logisch.',                  'His reasoning is logical.'),
    adj('onlogisch',     'illogical',                'onlogische',       'Die beslissing is onlogisch.',                 'That decision is illogical.'),
    adj('objectief',     'objective',                'objectieve',       'Een rechter moet objectief zijn.',             'A judge must be objective.',                   'objectief → objectieve before noun'),
    adj('subjectief',    'subjective',               'subjectieve',      'Smaak is subjectief.',                         'Taste is subjective.'),
    adj('kritisch',      'critical',                 'kritische',        'Ze is kritisch over de resultaten.',           'She is critical about the results.',           'critical in the analytical sense, not criticising'),
    adj('analytisch',    'analytical',               'analytische',      'Hij denkt analytisch.',                        'He thinks analytically.'),
    adj('intuïtief',     'intuitive',                'intuïtieve',       'Ze heeft een intuïtief gevoel voor taal.',     'She has an intuitive feel for language.'),
    adj('realistisch',   'realistic',                'realistische',     'We moeten realistisch zijn.',                  'We need to be realistic.'),
    adj('idealistisch',  'idealistic',               'idealistische',    'Hij is idealistisch over de wereld.',          'He is idealistic about the world.'),
    adj('abstract',      'abstract',                 'abstracte',        'Dit concept is te abstract.',                  'This concept is too abstract.'),
  ]),

  aset('b1-adj-society', '⚖️', 'Society, ethics & values', [
    adj('eerlijk',         'fair / honest',           'eerlijke',         'De verdeling moet eerlijk zijn.',              'The distribution must be fair.',               'eerlijk = fair (just) as well as honest'),
    adj('oneerlijk',       'unfair / dishonest',      'oneerlijke',       'Het systeem is oneerlijk.',                    'The system is unfair.'),
    adj('rechtvaardig',    'just / righteous',        'rechtvaardige',    'De straf moet rechtvaardig zijn.',             'The punishment must be just.'),
    adj('onrechtvaardig',  'unjust',                  'onrechtvaardige',  'Dit beleid is onrechtvaardig.',                'This policy is unjust.'),
    adj('tolerant',        'tolerant',                'tolerante',        'Nederland staat bekend als tolerant.',         'The Netherlands is known for being tolerant.'),
    adj('intolerant',      'intolerant',              'intolerante',      'Ze gedroeg zich intolerant.',                  'She behaved intolerantly.'),
    adj('democratisch',    'democratic',              'democratische',    'Het is een democratisch land.',                'It is a democratic country.'),
    adj('autoritair',      'authoritarian',           'autoritaire',      'Hij heeft een autoritaire stijl.',             'He has an authoritarian style.'),
    adj('corrupt',         'corrupt',                 'corrupte',         'De politicus bleek corrupt te zijn.',          'The politician turned out to be corrupt.'),
    adj('integer',         'principled / of integrity','integere',        'Ze staat bekend als integer.',                 'She is known as principled.',                  'integer → integere before noun'),
  ]),

  aset('b1-adj-work', '🎯', 'Work, education & achievement', [
    adj('competitief',    'competitive',              'competitieve',     'De markt is zeer competitief.',                'The market is very competitive.'),
    adj('coöperatief',    'cooperative',              'coöperatieve',     'De studenten waren coöperatief.',              'The students were cooperative.'),
    adj('systematisch',   'systematic',               'systematische',    'Ze werkt op een systematische manier.',        'She works in a systematic way.'),
    adj('willekeurig',    'random / arbitrary',       'willekeurige',     'De volgorde was willekeurig.',                 'The order was random.'),
    adj('grondig',        'thorough',                 'grondige',         'Hij deed een grondig onderzoek.',              'He did a thorough investigation.'),
    adj('oppervlakkig',   'superficial / shallow',    'oppervlakkige',    'De analyse was oppervlakkig.',                 'The analysis was superficial.'),
    adj('efficiënt',      'efficient',                'efficiënte',       'Ze werkt op een efficiënte manier.',           'She works in an efficient way.',               'efficiënt → efficiënte before noun'),
    adj('inefficiënt',    'inefficient',              'inefficiënte',     'Het systeem is inefficiënt.',                  'The system is inefficient.'),
    adj('innovatief',     'innovative',               'innovatieve',      'Het bedrijf is innovatief.',                   'The company is innovative.'),
    adj('verouderd',      'outdated / obsolete',      'verouderde',       'De methode is verouderd.',                     'The method is outdated.'),
  ]),

  aset('b1-adj-health', '🌱', 'Health, wellbeing & lifestyle', [
    adj('chronisch',        'chronic',                'chronische',       'Hij heeft chronische rugpijn.',                'He has chronic back pain.',                    'no comparative in common use'),
    adj('acuut',            'acute / urgent',         'acute',            'Het is een acuut probleem.',                   'It is an acute problem.',                      'acuut → acute before noun'),
    adj('kwetsbaar',        'vulnerable',             'kwetsbare',        'Ouderen zijn kwetsbaar voor kou.',             'Elderly people are vulnerable to cold.'),
    adj('weerbaar',         'resilient / assertive',  'weerbare',         'Ze is weerbaar en gaat goed om met tegenslag.','She is resilient and handles setbacks well.'),
    adj('mentaal',          'mental',                 'mentale',          'Mentale gezondheid is belangrijk.',            'Mental health is important.'),
    adj('fysiek',           'physical',               'fysieke',          'De fysieke belasting is hoog.',                'The physical load is high.'),
    adj('verslaafd',        'addicted',               'verslaafde',       'Hij is verslaafd aan roken.',                  'He is addicted to smoking.',                   'verslaafd always takes -e before noun'),
    adj('nuchter',          'sober / level-headed',   'nuchtere',         'Hij beoordeelt dingen nuchter.',               'He assesses things in a level-headed way.',    'nuchter = sober (not drunk) or matter-of-fact'),
    adj('actief',           'active',                 'actieve',          'Ze leidt een actief leven.',                   'She leads an active life.',                    'actief → actieve before noun'),
    adj('passief',          'passive',                'passieve',         'Hij neemt een passieve houding aan.',          'He takes a passive attitude.'),
  ]),

  aset('b1-adj-environment', '♻️', 'Environment & sustainability', [
    adj('duurzaam',          'sustainable',           'duurzame',         'We kiezen voor duurzame energie.',             'We choose sustainable energy.'),
    adj('vervuilend',        'polluting',             'vervuilende',      'Deze industrie is vervuilend.',                'This industry is polluting.'),
    adj('milieuvriendelijk', 'eco-friendly',          'milieuvriendelijke','Ze rijdt in een milieuvriendelijke auto.',    'She drives an eco-friendly car.'),
    adj('schadelijk',        'harmful / damaging',    'schadelijke',      'Roken is schadelijk voor de gezondheid.',      'Smoking is harmful to health.'),
    adj('onschadelijk',      'harmless',              'onschadelijke',    'Het middel is onschadelijk voor mensen.',      'The substance is harmless to humans.'),
    adj('hernieuwbaar',      'renewable',             'hernieuwbare',     'Zonne-energie is hernieuwbaar.',               'Solar energy is renewable.'),
    adj('uitputbaar',        'exhaustible',           'uitputbare',       'Olie is een uitputbare grondstof.',            'Oil is an exhaustible resource.'),
    adj('bedreigd',          'threatened / endangered','bedreigde',        'De soort is bedreigd.',                       'The species is endangered.'),
    adj('beschermd',         'protected',             'beschermde',       'Dit gebied is beschermd.',                     'This area is protected.'),
    adj('bewust',            'aware / conscious',     'bewuste',          'Ze is bewust bezig met haar verbruik.',        'She is consciously aware of her consumption.'),
  ]),

  aset('b1-adj-media', '📱', 'Media, culture & technology', [
    adj('digitaal',       'digital',                  'digitale',         'We leven in een digitale wereld.',             'We live in a digital world.'),
    adj('analoog',        'analogue',                 'analoge',          'Hij heeft nog een analoog horloge.',           'He still has an analogue watch.'),
    adj('actueel',        'current / topical',        'actuele',          'Dit is een actueel onderwerp.',                'This is a topical issue.',                     'actueel → actuele before noun'),
    adj('fictief',        'fictional',                'fictieve',         'Het verhaal is fictief.',                      'The story is fictional.'),
    adj('werkelijk',      'real / actual',            'werkelijke',       'Is dit werkelijk gebeurd?',                    'Did this really happen?'),
    adj('invloedrijk',    'influential',              'invloedrijke',     'Hij is een invloedrijke journalist.',          'He is an influential journalist.'),
    adj('onbeduidend',    'insignificant / minor',    'onbeduidende',     'Het was een onbeduidend incident.',            'It was a minor incident.'),
    adj('tendentieus',    'biased / tendentious',     'tendentieuze',     'Het artikel is tendentieus.',                  'The article is biased.',                       'tendentieus → tendentieuze before noun'),
    adj('neutraal',       'neutral',                  'neutrale',         'De toon van het bericht is neutraal.',         'The tone of the message is neutral.'),
    adj('visueel',        'visual',                   'visuele',          'Zij leert het beste via visuele middelen.',    'She learns best through visual means.'),
  ]),

  aset('b1-adj-economy', '💶', 'Economy & daily life', [
    adj('betaalbaar',    'affordable',                'betaalbare',       'Die woning is betaalbaar.',                    'That housing is affordable.'),
    adj('onbetaalbaar',  'unaffordable / priceless',  'onbetaalbare',     'De huurprijzen zijn onbetaalbaar geworden.',  'The rents have become unaffordable.',          'can also mean "priceless" — context determines'),
    adj('winstgevend',   'profitable',                'winstgevende',     'Het bedrijf is winstgevend.',                  'The company is profitable.'),
    adj('verliesgevend', 'loss-making',               'verliesgevende',   'De afdeling is verliesgevend.',                'The department is loss-making.'),
    adj('economisch',    'economic / economical',     'economische',      'De economische situatie is stabiel.',          'The economic situation is stable.',            'economisch = economic (context) or economical (frugal)'),
    adj('verspillend',   'wasteful',                  'verspillende',     'Dit proces is verspillend.',                   'This process is wasteful.'),
    adj('zuinig',        'thrifty / economical',      'zuinige',          'Ze is zuinig met geld.',                       'She is thrifty with money.',                   'zuinig also = stingy in informal use'),
    adj('haalbaar',      'feasible / achievable',     'haalbare',         'Het plan is haalbaar.',                        'The plan is feasible.'),
    adj('onhaalbaar',    'unfeasible / unattainable', 'onhaalbare',       'De deadline is onhaalbaar.',                   'The deadline is unattainable.'),
    adj('afhankelijk',   'dependent',                 'afhankelijke',     'Het land is afhankelijk van import.',          'The country is dependent on imports.'),
  ]),

  aset('b1-adj-abstract', '🎚️', 'Abstract qualities & degree', [
    adj('aanzienlijk',    'considerable / significant','aanzienlijke',    'Er is een aanzienlijk verschil.',              'There is a considerable difference.'),
    adj('verwaarloosbaar','negligible',                'verwaarloosbare',  'Het effect is verwaarloosbaar.',               'The effect is negligible.'),
    adj('overbodig',      'superfluous / unnecessary', 'overbodige',       'Die stap is overbodig.',                       'That step is superfluous.'),
    adj('noodzakelijk',   'necessary / essential',    'noodzakelijke',    'Samenwerking is noodzakelijk.',                'Cooperation is necessary.'),
    adj('tijdrovend',     'time-consuming',           'tijdrovende',      'Het is een tijdrovend proces.',                'It is a time-consuming process.'),
    adj('omstreden',      'controversial',            null,               'Het besluit is omstreden.',                    'The decision is controversial.',               'never adds -e; no comparative'),
    adj('onomstreden',    'uncontested / undisputed', null,               'Zijn reputatie is onomstreden.',               'His reputation is undisputed.',                'never adds -e'),
    adj('geldig',         'valid',                    'geldige',          'Je paspoort is nog geldig.',                   'Your passport is still valid.'),
    adj('ongeldig',       'invalid',                  'ongeldige',        'Het ticket is ongeldig.',                      'The ticket is invalid.'),
    adj('tegengesteld',   'opposite / contrary',      'tegengestelde',    'Ze hebben tegengestelde meningen.',            'They have opposing opinions.',                 'past participle — always takes -e before noun'),
  ]),

];
