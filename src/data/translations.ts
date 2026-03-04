export type Locale = 'sk' | 'en';

export const nav = {
  sk: {
    home: 'Domov',
    about: 'O nás',
    events: 'Podujatia',
    gallery: 'Galéria',
    contact: 'Kontakt',
    traditions: 'Folklór a tradície',
    support: 'Podporiť',
  },
  en: {
    home: 'Home',
    about: 'About us',
    events: 'Events',
    gallery: 'Gallery',
    contact: 'Contact',
    traditions: 'Traditions & folk',
    support: 'Support us',
  },
} as const;

export const footer = {
  sk: {
    followUs: 'Sledujte nás',
    facebook: 'Facebook',
    instagram: 'Instagram',
    copyright: '© Folklórna skupina Tulipán Čataj, o. z. — Čataj',
  },
  en: {
    followUs: 'Follow us',
    facebook: 'Facebook',
    instagram: 'Instagram',
    copyright: '© Folklórna skupina Tulipán Čataj, o. z. — Čataj',
  },
} as const;

export const home = {
  sk: {
    title: 'Folklórna skupina Tulipán Čataj',
    subtitle: 'Čataj — tradícia, kroj a ornament',
    intro: 'Folklórna skupina Tulipán Čataj je občianske združenie a miestna folklórna skupina z obce Čataj. Nadväzujeme na miestne tradície Čataja.',
    ctaAbout: 'O nás',
    ctaEvents: 'Podujatia',
    sponsorsTitle: 'Naši podporovatelia',
    readMore: 'Viac →',
    galleryLink: 'Galéria →',
    calendarDetails: 'Kalendár a detaily →',
    contactLink: 'Kontaktovať →',
    teaserEvents: '16. mája 2026 — 100. výročie Folklórnej skupiny z Čataja v obci Čataj. Celodenný program, galaprogram, hosťia z Ploče.',
    teaserGallery: 'Fotografie z vystúpení a podujatí Folklórnej skupiny Tulipán Čataj.',
    teaserTraditions: 'Tradičný ornament a výšivka z Čataja a Veľkého Grobu. Evanjelický kroj a dedičstvo.',
    teaserContact: 'Napíšte nám alebo nás príďte pozrieť do Čataja.',
    heroAria: 'Úvod',
  },
  en: {
    title: 'Folklórna skupina Tulipán Čataj',
    subtitle: 'Čataj — tradition, costume & ornament',
    intro: 'Folklórna skupina Tulipán Čataj is a civic association and local folklore group from the village of Čataj. We continue the local traditions of Čataj.',
    ctaAbout: 'About us',
    ctaEvents: 'Events',
    sponsorsTitle: 'Our supporters',
    readMore: 'Read more →',
    galleryLink: 'Gallery →',
    calendarDetails: 'Calendar and details →',
    contactLink: 'Contact →',
    teaserEvents: '16 May 2026 — 100th anniversary of the Folklore Group from Čataj in the village of Čataj. All-day programme, gala, guests from Ploče.',
    teaserGallery: 'Photos from performances and events of the Tulipan folklore group, Čataj.',
    teaserTraditions: 'Traditional ornament and embroidery from Čataj and Veľký Grob. Evangelical costume and heritage.',
    teaserContact: 'Get in touch or visit us in Čataj.',
    heroAria: 'Introduction',
  },
} as const;

export const about = {
  sk: {
    title: 'O nás',
    body: 'Folklórna skupina Tulipán Čataj pôsobí v obci Čataj v okrese Senec. Sme občianske združenie a nadväzujeme na miestnu tradíciu kroja a výšivky.',
    recentHistoryTitle: 'Naša skupina',
    recentHistory: 'Folklórna skupina Tulipán Čataj existuje len niekoľko rokov; nadväzuje na tradíciu obce a folklórne dedičstvo Čataja. Od približne 2019 pôsobíme ako občianske združenie a vystupujeme v kroji s čatajským a veľkogrobským ornamentom. O staršej histórii obce a ľudovej kultúry píšeme na stránke Folklór a tradície.',
    groupPhotoAlt: 'Členovia Folklórnej skupiny Tulipán Čataj',
  },
  en: {
    title: 'About us',
    body: 'Folklórna skupina Tulipán Čataj is based in the village of Čataj, Senec district. We are a civic association and continue the local tradition of costume and embroidery.',
    recentHistoryTitle: 'Our group',
    recentHistory: 'The group has existed for a few years and continues the village tradition and folk heritage of Čataj. Since around 2019 we have been active as a civic association and perform in costume with the Čataj and Veľký Grob ornament. For the longer history of the village and folk culture, see the Traditions & folk page.',
    groupPhotoAlt: 'Tulipan folklore group members',
  },
} as const;

/** Timeline: village and folk culture from the 1994 book and research (context-source-book-1994, context-cataj-tulipan-research) */
export const timeline = {
  sk: [
    { year: '1244', text: 'Prvá písomná zmienka o Čataji (villa Chatey) v listine kráľa Belu IV.' },
    { year: '14. st.', text: 'Nemeckí kolonisti osídľujú obec; až do 18. st. bola väčšinou nemecká.' },
    { year: '1397', text: 'Prvá zmienka o čatajskej farnosti (ostrihomská arcidiecéza).' },
    { year: '1561', text: 'Vizitácia spomína prvých známych kňazov (Ambrusius, neskôr Emericius — plebanus Chatay).' },
    { year: '1672–1728', text: 'Pôsobenie čatajských farárov (Juraj Dullay, Michal Horváth, Michal Kiss a ďalší).' },
    { year: '1721', text: 'Postavený druhý kostol v Čataji (neskôr po požiari nahradený).' },
    { year: '1768', text: 'Čatajský farár Jozef Nagy dostáva tzv. kvartu (štvrtina desiatku); fara bohatne.' },
    { year: '1845', text: 'Postavený súčasný rímskokatolícky kostol sv. Margity (neoklasicistický); hlavný organizátor Ján Očovský.' },
    { year: '19. st.', text: 'Rozkvet čatajskej výšivky a kroja; malované ohniská v domoch; zlatá a strieborná výšivka „po niti“. Katarína Rášová (1876–1974) a Katarína Brinzová (1879–1976) — maliarky ornamentu (Viedeň, Brno, Martin).' },
    { year: '1926', text: 'Prvé zdokumentované vystúpenie folklórnej skupiny z Čataja (100. výročie v roku 2026).' },
    { year: '30. roky 20. st.', text: 'Pri prestavbách domov miznú malované ohniská; maliarky (Katarína Kanišová — dcéra Brinzovej) zachovávajú ornament na papieri a závesných obrazoch (sobašná sieň).' },
    { year: '50. – 60. roky', text: 'Kroje sa prestávajú bežne nosiť; výšivka pre ÚĽUV a družstvá ešte pokračuje.' },
    { year: '60. roky', text: 'Katarína Kanišová maluje závesný obraz pre sobášnu sieň obce (motív z čatajského ornamentu).' },
    { year: '2019', text: 'Ornament z Čataja a Veľkého Grobu zapísaný na Reprezentatívny zoznam nehmotného kultúrneho dedičstva Slovenska.' },
  ],
  en: [
    { year: '1244', text: 'First written mention of Čataj (villa Chatey) in a charter of King Béla IV.' },
    { year: '14th c.', text: 'German colonists settle the village; until the 18th century it was mostly German.' },
    { year: '1397', text: 'First mention of the Catholic parish in Čataj (Esztergom archdiocese).' },
    { year: '1561', text: 'Visitation records first known priests (Ambrusius, later Emericius — plebanus Chatay).' },
    { year: '1672–1728', text: 'Service of Čataj priests (Juraj Dullay, Michal Horváth, Michal Kiss, and others).' },
    { year: '1721', text: 'Second church built in Čataj (later replaced after a fire).' },
    { year: '1768', text: 'Čataj parish priest Jozef Nagy receives the so-called quarta (quarter tithe); parish grows wealthy.' },
    { year: '1845', text: 'Current Roman Catholic Church of St Margaret built (Neoclassical); main organiser Ján Očovský.' },
    { year: '19th c.', text: 'Flourishing of Čataj embroidery and costume; painted fireplaces in homes; gold and silver counted-thread embroidery. Katarína Rášová (1876–1974) and Katarína Brinzová (1879–1976) — ornament painters (Vienna, Brno, Martin).' },
    { year: '1926', text: 'First documented performance of the folklore group from Čataj (100th anniversary in 2026).' },
    { year: '1930s', text: 'Painted fireplaces disappear with house rebuilds; painters (Katarína Kanišová — Brinzová’s daughter) preserve ornament on paper and hanging pictures (wedding hall).' },
    { year: '1950s – 60s', text: 'Costumes cease to be worn daily; embroidery for ÚĽUV and cooperatives continues for a time.' },
    { year: '1960s', text: 'Katarína Kanišová paints hanging picture for the village wedding hall (Čataj ornament motif).' },
    { year: '2019', text: 'Ornament from Čataj and Veľký Grob inscribed on the Representative List of the Intangible Cultural Heritage of Slovakia.' },
  ],
} as const;

/** Upcoming event: 100th anniversary celebration, 16 May 2026 (from sponsor letter) */
export const upcomingEvent = {
  dateISO: '2026-05-16',
  sk: {
    dateLabel: '16. mája 2026',
    title: '100. výročie Folklórnej skupiny z Čataja',
    place: 'Čataj',
    shortDescription: 'Slávnostné celodenné podujatie: krojovaný sprievod obcou, workshopy ľudovej kultúry a tradičných jedál, večer galaprogram s vystúpeniami našej skupiny, domácich i hosťujúcich skupín (vrátane folklórnej skupiny z Ploče, Chorvátsko), spoločenská zábava.',
    description: 'V máji 2026 oslavujeme 100. výročie od prvého zdokumentovaného vystúpenia. Program má celodenný charakter v obci Čataj: krojovaný sprievod obcou, workshopy zamerané na ľudovú kultúru a tradičné jedlá; večer slávnostný galaprogram s vystúpením Folklórnej skupiny Tulipán Čataj, domácich i hosťujúcich skupín (vrátane medzinárodnej účasti – folklórna skupina z chorvátskeho mesta Ploče), po ktorom nasleduje spoločenská zábava. Podujatie je pod záštitou Bratislavského samosprávneho kraja a s odbornou podporou Fondu na podporu umenia.',
    cta: 'Viac o podujatí',
  },
  en: {
    dateLabel: '16 May 2026',
    title: '100th anniversary of the Folklore Group from Čataj',
    place: 'Čataj',
    shortDescription: 'All-day celebration: costume procession through the village, workshops on folk culture and traditional food, evening gala with performances by our group, local and guest ensembles (including a folklore group from Ploče, Croatia), followed by social dancing.',
    description: 'In May 2026 we celebrate 100 years since the first documented performance. The programme runs all day in the village of Čataj: costume procession through the village, workshops on folk culture and traditional food; in the evening a gala with performances by the Tulipan Folklore Group, local and guest ensembles (including international guests – a folklore group from Ploče, Croatia), followed by social dancing. The event is under the auspices of the Bratislava Self-Governing Region and with expert support from the Fund for the Support of the Arts.',
    cta: 'More about the event',
  },
} as const;

export const events = {
  sk: {
    title: 'Podujatia',
    upcoming: 'Najbližšie podujatia',
    noEvents: 'Žiadne ďalšie podujatia zatiaľ neboli zverejnené. Skontrolujte neskôr alebo nás kontaktujte.',
  },
  en: {
    title: 'Events',
    upcoming: 'Upcoming events',
    noEvents: 'No other events have been announced yet. Check back later or contact us.',
  },
} as const;

export const gallery = {
  sk: {
    title: 'Galéria',
    placeholder: 'Fotografie budú doplnené.',
    comingSoon: 'Galéria bude čoskoro doplnená.',
  },
  en: {
    title: 'Gallery',
    placeholder: 'Photos will be added.',
    comingSoon: 'Gallery will be updated soon.',
  },
} as const;

export const contact = {
  sk: {
    title: 'Kontakt',
    name: 'Folklórna skupina Tulipán Čataj, o. z.',
    place: 'Čataj',
    email: 'tulipancataj@gmail.com',
    formNote: 'Napíšte nám e‑mailom alebo nás nájdete na Facebooku a Instagrame.',
    supportTitle: 'Podporiť nás',
    supportIntro: 'Svoju podporu môžete poslať na účet:',
  },
  en: {
    title: 'Contact',
    name: 'Folklórna skupina Tulipán Čataj, o. z.',
    place: 'Čataj',
    email: 'tulipancataj@gmail.com',
    formNote: 'Send us an email or find us on Facebook and Instagram.',
    supportTitle: 'Support us',
    supportIntro: 'You can send your support to our account:',
  },
} as const;

export const traditions = {
  sk: {
    title: 'Folklór a tradície',
    heritageTitle: 'Ornament z Čataja a Veľkého Grobu',
    heritageBody: 'Tradičný ornament a výšivka z Čataja a Veľkého Grobu tvoria výnimočnú časť západoslovenského folklóru. Evanjelický (augsburský) kroj a ornament sa líšia od katolíckeho; výšivka „po niti“, zlatá a strieborná niť, trojrozmerný efekt a motívy (tulipán, ruže, srdcia, slnečnice) sú charakteristické pre toto dedičstvo. Od roku 2019 je ornament zapísaný na Reprezentatívnom zozname nehmotného kultúrneho dedičstva Slovenska.',
    historyTitle: 'História Čataja a ľudovej kultúry',
    historyIntro: 'Z knihy Čataj 750 (1994) a historických prameňov — kľúčové momenty obce a folklóru.',
  },
  en: {
    title: 'Traditions & folk',
    heritageTitle: 'Ornament from Čataj and Veľký Grob',
    heritageBody: 'The traditional ornament and embroidery from Čataj and Veľký Grob are a distinctive part of western Slovak folklore. The Evangelical (Augsburg) costume and ornament differ from the Catholic; counted-thread embroidery, gold and silver thread, 3D effect, and motifs (tulip, roses, hearts, sunflowers) are characteristic of this heritage. Since 2019 the ornament has been inscribed on the Representative List of the Intangible Cultural Heritage of Slovakia.',
    historyTitle: 'History of Čataj and folk culture',
    historyIntro: 'From the book Čataj 750 (1994) and historical sources — key moments of the village and folk culture.',
  },
} as const;

export function tNav(locale: Locale) {
  return nav[locale];
}
export function tFooter(locale: Locale) {
  return footer[locale];
}
export function tHome(locale: Locale) {
  return home[locale];
}
export function tAbout(locale: Locale) {
  return about[locale];
}
export function tEvents(locale: Locale) {
  return events[locale];
}
export function tGallery(locale: Locale) {
  return gallery[locale];
}
export function tContact(locale: Locale) {
  return contact[locale];
}
export function tTraditions(locale: Locale) {
  return traditions[locale];
}
export function tTimeline(locale: Locale) {
  return timeline[locale];
}
