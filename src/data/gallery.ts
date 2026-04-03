/**
 * Gallery images and events are driven by `gallery.manifest.yaml` (validated in gallery-manifest.ts).
 * Edit the YAML; stable `id` fields are for tooling and audit trails.
 */
import {
  loadGalleryManifest,
  manifestCarouselSlideCount,
  manifestToGalleryEvents,
  manifestToGalleryImages,
} from "./gallery-manifest";

/**
 * Gallery images: path, alt text (SK/EN), dimensions, optional date from filename (YYYY-MM-DD).
 * Dates from assets filenames (YYYYMMDD_HHMMSS) are used for grouping and captions.
 */
export interface GalleryImage {
  /** Stable id from manifest (optional for legacy callers; always set when loaded from YAML). */
  id?: string;
  src: string;
  altSk: string;
  altEn: string;
  width: number;
  height: number;
  /** ISO date if known (e.g. from filename); used for grouping and caption */
  date?: string;
  /** Fix wrong orientation: 90, 180, or 270 degrees clockwise */
  rotate?: 90 | 180 | 270;
}

const manifest = loadGalleryManifest();

/** Number of hero carousel slides configured in the manifest. */
export const carouselSlideCount: number = manifestCarouselSlideCount(manifest);

/** All gallery images: order follows `imageGroups` in gallery.manifest.yaml. */
export const galleryImages: GalleryImage[] = manifestToGalleryImages(manifest);

/** Format date for display (e.g. "14. jún 2025" / "14 June 2025") */
export function formatGalleryDate(
  isoDate: string,
  locale: "sk" | "en"
): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const monthName = date.toLocaleString(locale === "sk" ? "sk-SK" : "en-GB", {
    month: "long",
  });
  return locale === "sk"
    ? `${d}. ${monthName} ${y}`
    : `${monthName} ${d}, ${y}`;
}

/** Event/album: a dated group of photos (for timeline and event pages). Max 50 images per event (soft limit). */
export interface GalleryEvent {
  /** URL slug, e.g. "2025-06-14" or "ostatne" */
  slug: string;
  /** ISO date for sorting and display; legacy/other can use a placeholder */
  date: string;
  titleSk: string;
  titleEn: string;
  /** Full image src paths (match GalleryImage.src) — time order (e.g. by filename). Typical: 10–20; max 50. */
  imageSrcs: string[];
  /** Optional: subset of imageSrcs to show first (highlights). Order here = order at top. Rest follow in imageSrcs order. */
  highlightSrcs?: string[];
  /** Optional: main YouTube video (watch, youtu.be, or youtube.com/live URL). One per album for now. */
  videoUrl?: string;
  /** Optional: start time in seconds for embed (e.g. 585 for 9:45). */
  videoStartSeconds?: number;
  /** Optional: end time in seconds for embed (e.g. 938 for 15:38). */
  videoEndSeconds?: number;
  /** Optional: single place line (same for both locales when set). */
  place?: string;
  /** Optional: event location (legacy; use `place` for new content). */
  placeSk?: string;
  placeEn?: string;
  /** Optional: short event description (keep brief so details block stays compact) */
  descriptionSk?: string;
  descriptionEn?: string;
  /** Optional: second hero-column YouTube embed (desktop: two videos side by side). */
  videoUrl2?: string;
  /** Optional: trim range for second embed (when videoUrl2 is set). */
  video2StartSeconds?: number;
  video2EndSeconds?: number;
  /** When a single video shares the hero row with images: iframe on the left (default) or right. */
  heroVideoColumn?: "left" | "right";
  /** Optional: external links (shown in event details). */
  links?: { url: string; labelSk?: string; labelEn?: string }[];
  /** When true, album is omitted from public timeline and static event routes (still listed in `galleryEvents` for tooling). Shown in dev server so you can preview WIP albums. */
  draft?: boolean;
}

/** All events (including drafts). Newest-first order is defined in gallery.manifest.yaml. */
export const galleryEvents: GalleryEvent[] = manifestToGalleryEvents(manifest);

/** When false, gallery index shows construction message and no event pages are built. Set true in gallery.manifest.yaml to show gallery. */
export const galleryVisible = manifest.galleryVisible;

const isDev = import.meta.env.DEV;

/** Events to show in timeline and to generate event pages. Drafts: dev only. Demo album: dev only. */
export const galleryEventsForDisplay: GalleryEvent[] = galleryEvents.filter(
  (e) => {
    if (e.draft && !isDev) return false;
    if (!isDev && e.slug === "demo-50-aspect-ratios") return false;
    return true;
  }
);

/** Base name from a gallery full src (strips path prefix and .webp extension). */
function galleryBaseName(src: string): string | null {
  const m = src.match(/^\/images\/gallery\/full\/(.+)\.webp$/i);
  return m ? m[1] : null;
}

/** Display image AVIF path (800w). */
export function galleryDisplayAvif(img: GalleryImage): string | null {
  const base = galleryBaseName(img.src);
  return base ? `/images/gallery/display/${base}.avif` : null;
}

/** Display image JPEG fallback path (800w). */
export function galleryDisplayJpeg(img: GalleryImage): string {
  const base = galleryBaseName(img.src);
  return base ? `/images/gallery/display/${base}.jpg` : img.src;
}

/** Full image AVIF path (1600w). */
export function galleryFullAvif(img: GalleryImage): string | null {
  const base = galleryBaseName(img.src);
  return base ? `/images/gallery/full/${base}.avif` : null;
}

/** Full image JPEG fallback path (1600w). */
export function galleryFullJpeg(img: GalleryImage): string {
  const base = galleryBaseName(img.src);
  return base ? `/images/gallery/full/${base}.jpg` : img.src;
}

/** @deprecated Legacy: display WebP path. Use galleryDisplayAvif/Jpeg instead. */
export function galleryDisplaySrc(img: GalleryImage): string {
  return galleryDisplayJpeg(img);
}

/** Tiny placeholder for blur-up (asset images only). */
export function galleryPlaceholderSrc(img: GalleryImage): string | null {
  if (img.src.includes("/gallery/full/") && img.src.endsWith(".webp")) {
    const name = img.src.split("/").pop();
    return `/images/gallery/placeholders/${name}`;
  }
  return null;
}

/** Extract YouTube video ID for embed from watch, youtu.be, or youtube.com/live URL. */
export function getYoutubeEmbedId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const m = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

/** Build full YouTube embed URL (with optional start/end in seconds). */
export function getYoutubeEmbedUrlFromFields(
  videoUrl: string | undefined,
  startSeconds?: number,
  endSeconds?: number
): string | null {
  if (!videoUrl) return null;
  const id = getYoutubeEmbedId(videoUrl);
  if (!id) return null;
  const params = new URLSearchParams({ rel: "0" });
  if (startSeconds != null) params.set("start", String(startSeconds));
  if (endSeconds != null) params.set("end", String(endSeconds));
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

/** Build full YouTube embed URL for an event (with optional start/end in seconds). */
export function getYoutubeEmbedUrl(event: GalleryEvent): string | null {
  return getYoutubeEmbedUrlFromFields(
    event.videoUrl,
    event.videoStartSeconds,
    event.videoEndSeconds
  );
}

/** Get images for an event: highlights first (in highlightSrcs order), then rest in imageSrcs (time) order. */
export function getEventImages(event: GalleryEvent): GalleryImage[] {
  const bySrc = new Map(galleryImages.map((img) => [img.src, img]));
  const highlightSet = new Set(event.highlightSrcs ?? []);
  const restSrcs = event.imageSrcs.filter((src) => !highlightSet.has(src));

  const toImage = (src: string): GalleryImage | null => bySrc.get(src) ?? null;

  const highlights = (event.highlightSrcs ?? [])
    .map(toImage)
    .filter((img): img is GalleryImage => !!img);
  const rest = restSrcs
    .map(toImage)
    .filter((img): img is GalleryImage => !!img);
  return [...highlights, ...rest];
}

/** Get event by slug, or undefined. Searches all `galleryEvents` (including drafts). */
export function getEventBySlug(slug: string): GalleryEvent | undefined {
  return galleryEvents.find((e) => e.slug === slug);
}
