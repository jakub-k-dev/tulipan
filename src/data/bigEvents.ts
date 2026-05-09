/**
 * Big events: featured Tulipán-organized events that warrant their own permanent
 * page (`/events/[slug]`). The next upcoming one is featured on the home teaser
 * card and on the /events index. After it passes, it remains reachable at its
 * slug URL forever.
 *
 * Each entry's metadata lives here; the rich page body lives in a per-event
 * Astro component under `src/components/events/`, dispatched by `BigEventBody.astro`.
 */

export type BigEventLocaleStrings = {
  /** Title shown on cards and as page H1. */
  title: string;
  /** Human date (e.g. "16. mája 2026" / "16 May 2026"). */
  dateLabel: string;
  /** Short description for the home teaser. Keep to 1–3 sentences. */
  shortDescription: string;
  /** Label on the home-teaser CTA button. */
  cta: string;
};

export type BigEvent = {
  /** URL slug under /events/. Keep stable; URLs persist forever. */
  slug: string;
  /** ISO date of the event (start day). Used for sorting and "is upcoming". */
  dateISO: string;
  /** Place line shown on cards (same in both locales). */
  place: string;
  sk: BigEventLocaleStrings;
  en: BigEventLocaleStrings;
};

export const bigEvents: BigEvent[] = [
  {
    slug: '100-rokov-tulipan',
    dateISO: '2026-05-16',
    place: 'Čataj',
    sk: {
      title: '100 rokov folklórnej skupiny Tulipán',
      dateLabel: 'sobota 16. máj 2026',
      shortDescription:
        'Celodenné oslavy storočnice folklóru v Čataji: krojovaný sprievod, remeselné trhy, vystúpenia domácich i hosťujúcich súborov a večerný galaprogram. Vstup voľný.',
      cta: 'Viac o podujatí',
    },
    en: {
      title: '100 years of the Tulipán folklore group',
      dateLabel: 'Saturday, 16 May 2026',
      shortDescription:
        'A full-day celebration of a century of folklore in Čataj: costume procession, craft markets, performances by local and guest ensembles, and an evening gala. Free entry.',
      cta: 'More about the event',
    },
  },
];

/** Today as YYYY-MM-DD in local time. */
function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** The next big event whose date is today or later (earliest first), or null. */
export function getNextBigEvent(): BigEvent | null {
  const today = todayISO();
  const upcoming = bigEvents
    .filter((e) => e.dateISO >= today)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  return upcoming[0] ?? null;
}

/** Past big events, most recent first. */
export function getPastBigEvents(): BigEvent[] {
  const today = todayISO();
  return bigEvents
    .filter((e) => e.dateISO < today)
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getBigEventBySlug(slug: string): BigEvent | null {
  return bigEvents.find((e) => e.slug === slug) ?? null;
}
