export type Locale = 'sk' | 'en';

export const nav = {
  sk: {
    home: 'Domov',
    about: 'O nás',
    events: 'Podujatia',
    gallery: 'Galéria',
    contact: 'Kontakt',
    traditions: 'Folklór a tradície',
  },
  en: {
    home: 'Home',
    about: 'About us',
    events: 'Events',
    gallery: 'Gallery',
    contact: 'Contact',
    traditions: 'Traditions & folk',
  },
} as const;

export const footer = {
  sk: {
    heritage: 'Ornament z Čataja a Veľkého Grobu je na Reprezentatívnom zozname nehmotného kultúrneho dedičstva Slovenska (2019).',
    linkHeritage: 'Viac o dedičstve',
  },
  en: {
    heritage: 'Ornament from Čataj and Veľký Grob is on the Representative List of the Intangible Cultural Heritage of Slovakia (2019).',
    linkHeritage: 'More about the heritage',
  },
} as const;

export const home = {
  sk: {
    title: 'Folklórny súbor Tulipán',
    subtitle: 'Čataj — tradícia, kroj a ornament',
    intro: 'Tulipán je občianske združenie a miestny folklórny súbor z obce Čataj. Nadväzujeme na dedičstvo čatajského a veľkogrobského ornamentu a kroja.',
    ctaAbout: 'O nás',
    ctaEvents: 'Podujatia',
  },
  en: {
    title: 'Tulipan Folklore Group',
    subtitle: 'Čataj — tradition, costume & ornament',
    intro: 'Tulipan is a civic association and local folklore group from the village of Čataj. We continue the heritage of the Čataj and Veľký Grob ornament and costume.',
    ctaAbout: 'About us',
    ctaEvents: 'Events',
  },
} as const;

export const about = {
  sk: {
    title: 'O nás',
    body: 'Folklórny súbor Tulipán pôsobí v obci Čataj v okrese Senec. Sme občianske združenie a nadväzujeme na miestnu tradíciu kroja a výšivky. Čataj je známy výnimočným ornamentom (ornament z Čataja a Veľkého Grobu je od roku 2019 na Reprezentatívnom zozname nehmotného kultúrneho dedičstva Slovenska). Text bude doplnený.',
  },
  en: {
    title: 'About us',
    body: 'The Tulipan folklore group is based in the village of Čataj, Senec district. We are a civic association and continue the local tradition of costume and embroidery. Čataj is known for its distinctive ornament (the ornament from Čataj and Veľký Grob has been on the Representative List of the Intangible Cultural Heritage of Slovakia since 2019). Content to be added.',
  },
} as const;

/** Upcoming event: 100th anniversary celebration, 16 May 2026 (from sponsor letter) */
export const upcomingEvent = {
  dateISO: '2026-05-16',
  sk: {
    dateLabel: '16. mája 2026',
    title: '100. výročie Folklórnej skupiny z Čataja',
    place: 'Čataj',
    shortDescription: 'Slávnostné celodenné podujatie: krojovaný sprievod obcou, workshopy ľudovej kultúry a tradičných jedál, večer galaprogram s vystúpeniami našej skupiny, domácich i hosťujúcich súborov (vrátane folklórnej skupiny z Ploče, Chorvátsko), spoločenská zábava.',
    description: 'V máji 2026 oslavujeme 100. výročie od prvého zdokumentovaného vystúpenia. Program má celodenný charakter v obci Čataj: krojovaný sprievod obcou, workshopy zamerané na ľudovú kultúru a tradičné jedlá; večer slávnostný galaprogram s vystúpením Folklórnej skupiny Tulipán, domácich i hosťujúcich súborov (vrátane medzinárodnej účasti – folklórna skupina z chorvátskeho mesta Ploče), po ktorom nasleduje spoločenská zábava. Podujatie je pod záštitou Bratislavského samosprávneho kraja a s odbornou podporou Fondu na podporu umenia.',
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
  },
  en: {
    title: 'Gallery',
    placeholder: 'Photos will be added.',
  },
} as const;

export const contact = {
  sk: {
    title: 'Kontakt',
    name: 'Folklórny súbor Tulipán, o. z.',
    place: 'Čataj',
    email: 'Kontaktný e‑mail bude doplnený.',
    formNote: 'Formulár alebo kontaktné údaje budú doplnené.',
  },
  en: {
    title: 'Contact',
    name: 'Tulipan Folklore Group, civic association',
    place: 'Čataj',
    email: 'Contact email to be added.',
    formNote: 'Form or contact details will be added.',
  },
} as const;

export const traditions = {
  sk: {
    title: 'Folklór a tradície',
    heritageTitle: 'Ornament z Čataja a Veľkého Grobu',
    heritageBody: 'Tradičný ornament a výšivka z Čataja a Veľkého Grobu tvoria výnimočnú časť západoslovenského folklóru. Evanjelický (augsburský) kroj a ornament sa líšia od katolíckeho; výšivka „po niti“, zlatá a strieborná niť, trojrozmerný efekt a motívy (tulipán, ruže, srdcia, slnečnice) sú charakteristické pre toto dedičstvo. Od roku 2019 je ornament zapísaný na Reprezentatívnom zozname nehmotného kultúrneho dedičstva Slovenska.',
    linkIch: 'Viac na portáli Ľudová kultúra',
  },
  en: {
    title: 'Traditions & folk',
    heritageTitle: 'Ornament from Čataj and Veľký Grob',
    heritageBody: 'The traditional ornament and embroidery from Čataj and Veľký Grob are a distinctive part of western Slovak folklore. The Evangelical (Augsburg) costume and ornament differ from the Catholic; counted-thread embroidery, gold and silver thread, 3D effect, and motifs (tulip, roses, hearts, sunflowers) are characteristic of this heritage. Since 2019 the ornament has been inscribed on the Representative List of the Intangible Cultural Heritage of Slovakia.',
    linkIch: 'More on the Folk Culture portal',
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
