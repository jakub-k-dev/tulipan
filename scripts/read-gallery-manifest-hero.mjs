/**
 * Read hero carousel sources from gallery.manifest.yaml (Node optimize script only).
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

/**
 * @param {string} siteRoot Absolute path to websites/main (parent of src/ and scripts/).
 * @returns {{ source: 'base' | 'assets', filename: string }[]}
 */
export function readHeroCarouselSlides(siteRoot) {
  const manifestPath = join(siteRoot, 'src', 'data', 'gallery.manifest.yaml');
  const doc = YAML.parse(readFileSync(manifestPath, 'utf8'));
  const slides = doc?.heroCarousel?.slides;
  if (!Array.isArray(slides) || slides.length !== 4) {
    throw new Error('gallery.manifest.yaml: heroCarousel.slides must be an array of length 4');
  }
  return slides.map((s, i) => {
    if (s?.source !== 'base' && s?.source !== 'assets') {
      throw new Error(`gallery.manifest.yaml: hero slide ${i + 1}: invalid source (use base or assets)`);
    }
    if (typeof s?.filename !== 'string' || !s.filename.trim()) {
      throw new Error(`gallery.manifest.yaml: hero slide ${i + 1}: missing filename`);
    }
    return { source: s.source, filename: s.filename };
  });
}
