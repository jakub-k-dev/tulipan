/**
 * Single source of truth: which /images/... paths the site needs on disk.
 * Expands each /images/gallery/full/*.webp into display + placeholders (same basename).
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

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

  for (let i = 1; i <= 4; i++) {
    for (const ext of ["jpg", "webp", "avif"]) {
      needed.add(`/images/hero/carousel-${i}.${ext}`);
    }
  }

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

  /** Same basename as full/ → site serves display/ + placeholders/ WebP. */
  const toAdd = [];
  for (const p of needed) {
    const m = p.match(/^\/images\/gallery\/full\/(.+\.webp)$/i);
    if (m) {
      const name = m[1];
      toAdd.push(`/images/gallery/display/${name}`);
      toAdd.push(`/images/gallery/placeholders/${name}`);
    }
  }
  for (const p of toAdd) needed.add(p);

  return needed;
}

/**
 * @param {string} siteRoot
 * @param {string} webPath - /images/...
 */
export function webPathToPublicFile(siteRoot, webPath) {
  if (!webPath.startsWith("/images/")) return null;
  return join(siteRoot, "public", webPath.replace(/^\//, ""));
}
