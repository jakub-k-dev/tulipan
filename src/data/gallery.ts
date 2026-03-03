/**
 * Gallery images: path, alt text (SK/EN), dimensions, optional date from filename (YYYY-MM-DD).
 * Dates from assets filenames (YYYYMMDD_HHMMSS) are used for grouping and captions.
 */
export interface GalleryImage {
  src: string;
  altSk: string;
  altEn: string;
  width: number;
  height: number;
  /** ISO date if known (e.g. from filename); used for grouping and caption */
  date?: string;
}

/**
 * Asset images: source is JPG in public/images/assets (gitignored); site serves WebP from gallery/display, placeholders, full.
 * src = full-size WebP for "open in new tab"; display/placeholder used for progressive blur-up.
 */
const assetImages: GalleryImage[] = [
  { src: '/images/gallery/full/20250614_171736.webp', altSk: 'Folklórny súbor Tulipán, 14. jún 2025', altEn: 'Tulipan folklore group, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250614_172137.webp', altSk: 'Tulipán, 14. jún 2025', altEn: 'Tulipan, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250614_172159.webp', altSk: 'Vystúpenie Tulipán, 14. jún 2025', altEn: 'Tulipan performance, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250614_172321.webp', altSk: 'Folklórny súbor Tulipán, 14. jún 2025', altEn: 'Tulipan folklore group, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250614_172702.webp', altSk: 'Tulipán na podujatí, 14. jún 2025', altEn: 'Tulipan at event, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250614_172717.webp', altSk: 'Podujatie — Tulipán, 14. jún 2025', altEn: 'Event — Tulipan, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250614_175941.webp', altSk: 'Tulipán, 14. jún 2025', altEn: 'Tulipan, 14 June 2025', width: 800, height: 600, date: '2025-06-14' },
  { src: '/images/gallery/full/20250621_193057.webp', altSk: 'Folklórny súbor Tulipán, 21. jún 2025', altEn: 'Tulipan folklore group, 21 June 2025', width: 800, height: 600, date: '2025-06-21' },
  { src: '/images/gallery/full/20250621_193336.webp', altSk: 'Tulipán, 21. jún 2025', altEn: 'Tulipan, 21 June 2025', width: 800, height: 600, date: '2025-06-21' },
];

/** Existing gallery images (no date) */
const legacyImages: GalleryImage[] = [
  { src: '/images/gallery/group-photo.png', altSk: 'Členovia folklórneho súboru Tulipán', altEn: 'Tulipan folklore group members', width: 800, height: 600 },
  { src: '/images/gallery/tulipan-leto.png', altSk: 'Tulipán v lete', altEn: 'Tulipan in summer', width: 800, height: 600 },
  { src: '/images/gallery/event-1.png', altSk: 'Podujatie — folklórny súbor Tulipán', altEn: 'Event — Tulipan folklore group', width: 800, height: 600 },
  { src: '/images/gallery/event-2.png', altSk: 'Podujatie — Tulipán', altEn: 'Event — Tulipan', width: 800, height: 600 },
  { src: '/images/gallery/event-3.png', altSk: 'Vystúpenie Tulipán', altEn: 'Tulipan performance', width: 800, height: 600 },
  { src: '/images/gallery/event-4.png', altSk: 'Folklórny súbor Tulipán', altEn: 'Tulipan folklore group', width: 800, height: 600 },
  { src: '/images/gallery/event-5.png', altSk: 'Tulipán na podujatí', altEn: 'Tulipan at event', width: 800, height: 600 },
  { src: '/images/gallery/event-6.png', altSk: 'Tulipán — vystúpenie', altEn: 'Tulipan performance', width: 800, height: 600 },
  { src: '/images/gallery/page_112_0.jpg', altSk: 'Čatajská výšivka — zástera', altEn: 'Čataj embroidery — apron', width: 520, height: 338 },
  { src: '/images/gallery/page_113_0.jpg', altSk: 'Zástera a čepce s výšivkou', altEn: 'Apron and caps with embroidery', width: 513, height: 336 },
];

/** All gallery images: new dated assets first (newest date first), then legacy */
export const galleryImages: GalleryImage[] = [
  ...assetImages,
  ...legacyImages,
];

/** Display image for grid (800w WebP for assets; full for legacy). */
export function galleryDisplaySrc(img: GalleryImage): string {
  if (img.src.includes('/gallery/full/') && img.src.endsWith('.webp')) {
    const name = img.src.split('/').pop();
    return `/images/gallery/display/${name}`;
  }
  return img.src;
}

/** Tiny placeholder for blur-up (asset images only). */
export function galleryPlaceholderSrc(img: GalleryImage): string | null {
  if (img.src.includes('/gallery/full/') && img.src.endsWith('.webp')) {
    const name = img.src.split('/').pop();
    return `/images/gallery/placeholders/${name}`;
  }
  return null;
}

/** Format date for display (e.g. "14. jún 2025" / "14 June 2025") */
export function formatGalleryDate(isoDate: string, locale: 'sk' | 'en'): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const monthNamesSk = ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const names = locale === 'sk' ? monthNamesSk : monthNamesEn;
  return locale === 'sk' ? `${d}. ${names[m - 1]} ${y}` : `${names[m - 1]} ${d}, ${y}`;
}
