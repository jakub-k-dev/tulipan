/**
 * Single source of truth: which /images/... paths the site needs on disk.
 * Expands each /images/gallery/full/*.webp into display + placeholders (same basename).
 *
 * Gallery files referenced only from `catalogue[].src` (not from imageGroups or events) are
 * excluded so prune can remove optimized outputs after an album is hidden while catalogue rows
 * keep `src` for the manager UI.
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import YAML from "yaml";

/**
 * @param {string} siteRoot - websites/main
 * @returns {Set<string>} paths like /images/gallery/full/foo.webp
 */
export function buildNeededImagePaths(siteRoot) {
  /** @type {Set<string>} */
  const needed = new Set();

  /**
   * @param {string} dir
   * @param {(f: string) => boolean} [filter]
   * @returns {string[]}
   */
  function walkSrcFiles(dir, filter) {
    /** @type {string[]} */
    const out = [];
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return out;
    }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...walkSrcFiles(p, filter));
      else if (!filter || filter(p)) out.push(p);
    }
    return out;
  }

  /**
   * @param {string} text
   */
  function extractImagePaths(text) {
    const re = /\/images\/[\w./\- %()]+\.(webp|jpe?g|png|avif|svg)/gi;
    let m;
    while ((m = re.exec(text))) {
      needed.add(m[0].replace(/\\/g, "/"));
    }
  }

  for (const f of walkSrcFiles(join(siteRoot, "src"), (p) =>
    /\.(ts|astro|yaml|yml|md|mdx|css|json)$/.test(p),
  )) {
    extractImagePaths(readFileSync(f, "utf8"));
  }

  subtractCatalogueOnlyGalleryFullPaths(siteRoot, needed);

  // Hero carousel: resolve catalogue IDs → gallery paths, then derive hero/ paths
  addHeroCarouselPaths(siteRoot, needed);

  for (const p of [
    "/images/logo.svg",
    "/images/sponsors/fpu.svg",
    "/images/sponsors/bsk.svg",
    "/images/sponsors/cataj.webp",
    "/images/sponsors/cataj.png",
    "/images/embroidery-pattern.png",
    "/images/embroidery-reference.png",
    "/images/embroidery-strip.png",
  ]) {
    needed.add(p);
  }

  /** Same basename as full/ → derive display + placeholder variants in all formats. */
  const toAdd = [];
  for (const p of needed) {
    const m = p.match(/^\/images\/gallery\/full\/(.+)\.webp$/i);
    if (m) {
      const base = m[1];
      // Full: AVIF + JPEG (alongside the WebP already in needed)
      toAdd.push(`/images/gallery/full/${base}.avif`);
      toAdd.push(`/images/gallery/full/${base}.jpg`);
      // Display: AVIF + JPEG
      toAdd.push(`/images/gallery/display/${base}.avif`);
      toAdd.push(`/images/gallery/display/${base}.jpg`);
      // Placeholder: WebP only (tiny blur-up)
      toAdd.push(`/images/gallery/placeholders/${base}.webp`);
    }
  }
  for (const p of toAdd) needed.add(p);

  return needed;
}

/**
 * Read heroCarousel.slides from manifest, resolve catalogue IDs to gallery paths,
 * then add hero/carousel-N.{avif,jpg} to needed set.
 * @param {string} siteRoot
 * @param {Set<string>} needed
 */
function addHeroCarouselPaths(siteRoot, needed) {
  const manifestPath = join(siteRoot, "src", "data", "gallery.manifest.yaml");
  let raw;
  try { raw = readFileSync(manifestPath, "utf8"); } catch { return; }
  let data;
  try { data = YAML.parse(raw); } catch { return; }
  const slides = data?.heroCarousel?.slides;
  if (!Array.isArray(slides)) return;
  const catById = new Map();
  for (const row of Array.isArray(data.catalogue) ? data.catalogue : []) {
    if (row && typeof row === "object" && row.id) catById.set(row.id, row);
  }
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    if (!s || typeof s !== "object") continue;
    const catId = s.catalogueId;
    if (!catId) continue;
    // Hero outputs
    const prefix = `/images/hero/carousel-${i + 1}`;
    needed.add(`${prefix}.avif`);
    needed.add(`${prefix}.jpg`);
    // Also ensure the source gallery full image stays (not pruned)
    const row = catById.get(catId);
    if (row && row.src) needed.add(row.src);
  }
}

/**
 * Remove `gallery/full/*.webp` paths that appear only under manifest `catalogue[].src`
 * (still present for tooling) but not under imageGroups or events — allows prune after hiding an album.
 * @param {string} siteRoot
 * @param {Set<string>} needed
 */
function subtractCatalogueOnlyGalleryFullPaths(siteRoot, needed) {
  const manifestPath = join(siteRoot, "src", "data", "gallery.manifest.yaml");
  let raw;
  try {
    raw = readFileSync(manifestPath, "utf8");
  } catch {
    return;
  }
  /** @type {unknown} */
  let data;
  try {
    data = YAML.parse(raw);
  } catch {
    return;
  }
  /** @type {Set<string>} */
  const structured = new Set();
  const m = /** @type {Record<string, unknown>} */ (data ?? {});
  for (const g of Array.isArray(m.imageGroups) ? m.imageGroups : []) {
    if (!g || typeof g !== "object") continue;
    for (const im of Array.isArray(/** @type {Record<string, unknown>} */ (g).images)
      ? /** @type {Record<string, unknown>} */ (g).images
      : []) {
      if (im && typeof im === "object" && /** @type {Record<string, unknown>} */ (im).src != null) {
        structured.add(String(/** @type {Record<string, unknown>} */ (im).src));
      }
    }
  }
  for (const ev of Array.isArray(m.events) ? m.events : []) {
    if (!ev || typeof ev !== "object") continue;
    const e = /** @type {Record<string, unknown>} */ (ev);
    for (const s of Array.isArray(e.imageSrcs) ? e.imageSrcs : []) structured.add(String(s));
    for (const s of Array.isArray(e.highlightSrcs) ? e.highlightSrcs : []) structured.add(String(s));
    for (const s of Array.isArray(e.demoAspectSrcs) ? e.demoAspectSrcs : []) structured.add(String(s));
  }
  for (const row of Array.isArray(m.catalogue) ? m.catalogue : []) {
    if (!row || typeof row !== "object") continue;
    const src = /** @type {Record<string, unknown>} */ (row).src;
    if (src == null || typeof src !== "string") continue;
    const p = src.trim();
    if (!/^\/images\/gallery\/full\/.+\.webp$/i.test(p)) continue;
    if (structured.has(p)) continue;
    needed.delete(p);
    const mm = p.match(/^\/images\/gallery\/full\/(.+\.webp)$/i);
    if (mm) {
      needed.delete(`/images/gallery/display/${mm[1]}`);
      needed.delete(`/images/gallery/placeholders/${mm[1]}`);
    }
  }
}

/**
 * @param {string} siteRoot
 * @param {string} webPath - /images/...
 */
export function webPathToPublicFile(siteRoot, webPath) {
  if (!webPath.startsWith("/images/")) return null;
  return join(siteRoot, "public", webPath.replace(/^\//, ""));
}
