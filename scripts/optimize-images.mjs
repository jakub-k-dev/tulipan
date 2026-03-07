#!/usr/bin/env node
/**
 * Optimize images for GitHub Pages: small files, no quality compromise, progressive loading.
 * - Hero: re-encode as progressive JPEG.
 * - Gallery assets: generate WebP only (display 800w, placeholder 40w, full 1600w for "open in new tab").
 *   WebP at quality 95 is visually lossless and much smaller than JPEG; all outputs stay under GitHub limits.
 * Run before build: npm run optimize-images
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');

const progressiveJpeg = { progressive: true, mozjpeg: true };
const WEBP_DISPLAY = { quality: 95, effort: 4 };
const WEBP_PLACEHOLDER = { quality: 85, effort: 2 };
const WEBP_FULL = { quality: 95, effort: 4 };
const FULL_MAX_WIDTH = 1600;
/** Hero: max long edge (covers 2× retina on large viewports); keeps file size sane, WebP much smaller than JPEG */
const HERO_MAX_LONG_EDGE = 2400;

function baseName(file) {
  return file.replace(/\.(jpe?g|webp)$/i, '');
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function main() {
  console.log('Optimizing images…');

  // 1. Hero: from cropped variant → resize to HERO_MAX_LONG_EDGE (sharp at 2×, small file), WebP + JPEG fallback
  const assetsDir = join(publicDir, 'assets');
  const heroSourceName = '20250614_171732 cropped 2.jpg';
  const heroSourcePath = join(assetsDir, heroSourceName);
  const heroDir = join(publicDir, 'hero');
  const heroPath = join(heroDir, 'hero-background.jpg');
  const heroWebpPath = join(heroDir, 'hero-background.webp');
  const heroAvifPath = join(heroDir, 'hero-background.avif');
  try {
    await ensureDir(heroDir);
    const heroMeta = await sharp(heroSourcePath).metadata();
    const w = heroMeta.width || 2400;
    const h = heroMeta.height || 1600;
    const scale = Math.min(1, HERO_MAX_LONG_EDGE / Math.max(w, h));
    const targetW = Math.round(w * scale);
    const targetH = Math.round(h * scale);
    const resize = { width: targetW, height: targetH, fit: 'inside' };
    const pipeline = sharp(heroSourcePath).resize(resize);
    // Hero: balanced quality for Lighthouse image delivery; AVIF smallest, then WebP, JPEG fallback
    await pipeline.clone().jpeg({ ...progressiveJpeg, quality: 80 }).toFile(heroPath);
    await pipeline.clone().webp({ quality: 75, effort: 4 }).toFile(heroWebpPath);
    await pipeline.clone().avif({ quality: 60, effort: 4 }).toFile(heroAvifPath);
    console.log('  hero: assets/' + heroSourceName + ' → ' + targetW + '×' + targetH + ' (.avif + .webp + .jpg)');
  } catch (e) {
    console.warn('  hero:', e.message);
  }

  // 2. Gallery: WebP display (800w), placeholders (40w), full (1600w) — all for repo + progressive load
  const displayDir = join(publicDir, 'gallery', 'display');
  const placeholdersDir = join(publicDir, 'gallery', 'placeholders');
  const fullDir = join(publicDir, 'gallery', 'full');
  await ensureDir(displayDir);
  await ensureDir(placeholdersDir);
  await ensureDir(fullDir);

  let files = [];
  try {
    files = (await readdir(assetsDir))
      .filter((f) => /\.(jpe?g|webp)$/i.test(f))
      .filter((f) => f !== heroSourceName); // exclude hero cropped (used only for hero)
  } catch {
    // no assets
  }

  for (const file of files) {
    const src = join(assetsDir, file);
    const base = baseName(file);
    const displayPath = join(displayDir, `${base}.webp`);
    const placeholderPath = join(placeholdersDir, `${base}.webp`);
    const fullPath = join(fullDir, `${base}.webp`);
    try {
      const pipeline = sharp(src, { failOnError: false });
      const meta = await pipeline.metadata();
      const w = meta.width || 800;

      await sharp(src, { failOnError: false })
        .resize(Math.min(800, w))
        .webp(WEBP_DISPLAY)
        .toFile(displayPath);

      await sharp(src, { failOnError: false })
        .resize(40)
        .webp(WEBP_PLACEHOLDER)
        .toFile(placeholderPath);

      await sharp(src, { failOnError: false })
        .resize(Math.min(FULL_MAX_WIDTH, w))
        .webp(WEBP_FULL)
        .toFile(fullPath);

      console.log(' ', file, '→ display + placeholder + full (.webp)');
    } catch (e) {
      console.warn('  ', file, e.message);
    }
  }

  // 3. Sponsors: convert cataj.png to WebP for smaller transfer (Lighthouse)
  const sponsorsDir = join(publicDir, 'sponsors');
  const catajPng = join(sponsorsDir, 'cataj.png');
  const catajWebp = join(sponsorsDir, 'cataj.webp');
  try {
    if (existsSync(catajPng)) {
      await sharp(catajPng).webp({ quality: 90, effort: 4 }).toFile(catajWebp);
      console.log('  sponsors: cataj.png → cataj.webp');
    }
  } catch (e) {
    console.warn('  sponsors cataj:', e.message);
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
