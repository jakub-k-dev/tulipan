import YAML from 'yaml';
import { z } from 'zod';
import type { GalleryEvent, GalleryImage } from './gallery';
import manifestRaw from './gallery.manifest.yaml?raw';

const heroSlideSchema = z.object({
  id: z.string().min(1),
  source: z.enum(['base', 'assets']),
  filename: z.string().min(1),
});

const manifestImageSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  altSk: z.string(),
  altEn: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  date: z.string().optional(),
  rotate: z.union([z.literal(90), z.literal(180), z.literal(270)]).optional(),
});

const manifestEventSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    draft: z.boolean().optional(),
    date: z.string(),
    titleSk: z.string(),
    titleEn: z.string(),
    placeSk: z.string().optional(),
    placeEn: z.string().optional(),
    descriptionSk: z.string().optional(),
    descriptionEn: z.string().optional(),
    videoUrl: z.string().optional(),
    videoStartSeconds: z.number().optional(),
    videoEndSeconds: z.number().optional(),
    imageSrcs: z.array(z.string()).optional(),
    highlightSrcs: z.array(z.string()).optional(),
    demoAspectSrcs: z.array(z.string()).optional(),
    demoRepeatCount: z.number().int().positive().optional(),
    demoHighlightIndices: z.tuple([z.number().int().min(0), z.number().int().min(0)]).optional(),
  })
  .superRefine((ev, ctx) => {
    const hasList = !!(ev.imageSrcs && ev.imageSrcs.length > 0);
    const hasDemo = !!(ev.demoAspectSrcs && ev.demoAspectSrcs.length > 0 && ev.demoRepeatCount);
    if (hasList === hasDemo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Each event needs exactly one of: non-empty imageSrcs OR demoAspectSrcs + demoRepeatCount',
        path: ['imageSrcs'],
      });
    }
  });

const manifestSchema = z.object({
  version: z.literal(1),
  galleryVisible: z.boolean(),
  heroCarousel: z.object({
    slides: z.array(heroSlideSchema).length(4),
  }),
  imageGroups: z.array(
    z.object({
      id: z.string().min(1),
      images: z.array(manifestImageSchema),
    }),
  ),
  events: z.array(manifestEventSchema),
});

export type GalleryManifestV1 = z.infer<typeof manifestSchema>;

function parseManifest(raw: unknown): GalleryManifestV1 {
  const parsed = manifestSchema.safeParse(raw);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid gallery.manifest.yaml (schema)');
  }
  const m = parsed.data;

  const allSrcs = new Set<string>();
  for (const g of m.imageGroups) {
    for (const img of g.images) {
      if (allSrcs.has(img.src)) {
        throw new Error(`gallery.manifest.yaml: duplicate image src: ${img.src}`);
      }
      allSrcs.add(img.src);
    }
  }

  const slugs = new Set<string>();
  for (const ev of m.events) {
    if (slugs.has(ev.slug)) {
      throw new Error(`gallery.manifest.yaml: duplicate event slug: ${ev.slug}`);
    }
    slugs.add(ev.slug);
  }

  for (const ev of m.events) {
    const srcs =
      ev.imageSrcs ??
      Array.from({ length: ev.demoRepeatCount! }, () => ev.demoAspectSrcs!).flat();
    for (const s of srcs) {
      if (!allSrcs.has(s)) {
        throw new Error(`gallery.manifest.yaml: event "${ev.slug}" references unknown src: ${s}`);
      }
    }
    if (ev.highlightSrcs) {
      for (const h of ev.highlightSrcs) {
        if (!allSrcs.has(h)) {
          throw new Error(`gallery.manifest.yaml: event "${ev.slug}" highlight unknown src: ${h}`);
        }
      }
    }
    if (ev.demoAspectSrcs && ev.demoHighlightIndices) {
      const [a, b] = ev.demoHighlightIndices;
      const len = ev.demoAspectSrcs.length;
      if (a >= len || b >= len) {
        throw new Error(`gallery.manifest.yaml: event "${ev.slug}" demoHighlightIndices out of range`);
      }
    }
  }

  return m;
}

let cachedManifest: GalleryManifestV1 | null = null;

export function loadGalleryManifest(): GalleryManifestV1 {
  if (cachedManifest) return cachedManifest;
  const raw = YAML.parse(manifestRaw);
  cachedManifest = parseManifest(raw);
  return cachedManifest;
}

export type ManifestGalleryImage = z.infer<typeof manifestImageSchema>;
export type ManifestGalleryEvent = z.infer<typeof manifestEventSchema>;

export function manifestToGalleryImages(m: GalleryManifestV1): GalleryImage[] {
  const out: GalleryImage[] = [];
  for (const g of m.imageGroups) {
    for (const img of g.images) {
      out.push({
        id: img.id,
        src: img.src,
        altSk: img.altSk,
        altEn: img.altEn,
        width: img.width,
        height: img.height,
        date: img.date,
        rotate: img.rotate,
      });
    }
  }
  return out;
}

export function manifestToGalleryEvents(m: GalleryManifestV1): GalleryEvent[] {
  return m.events.map(manifestEventToGalleryEvent);
}

function manifestEventToGalleryEvent(ev: ManifestGalleryEvent): GalleryEvent {
  let imageSrcs: string[];
  let highlightSrcs: string[] | undefined;

  if (ev.demoAspectSrcs && ev.demoRepeatCount) {
    imageSrcs = Array.from({ length: ev.demoRepeatCount }, () => [...ev.demoAspectSrcs!]).flat();
    const idx = ev.demoHighlightIndices ?? [0, 3];
    highlightSrcs = [ev.demoAspectSrcs[idx[0]]!, ev.demoAspectSrcs[idx[1]]!];
  } else {
    imageSrcs = ev.imageSrcs!;
    highlightSrcs = ev.highlightSrcs;
  }

  return {
    slug: ev.slug,
    date: ev.date,
    titleSk: ev.titleSk,
    titleEn: ev.titleEn,
    placeSk: ev.placeSk,
    placeEn: ev.placeEn,
    descriptionSk: ev.descriptionSk,
    descriptionEn: ev.descriptionEn,
    videoUrl: ev.videoUrl,
    videoStartSeconds: ev.videoStartSeconds,
    videoEndSeconds: ev.videoEndSeconds,
    imageSrcs,
    highlightSrcs,
    draft: ev.draft,
  };
}
