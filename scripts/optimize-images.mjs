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
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');

const progressiveJpeg = { progressive: true, mozjpeg: true };
const WEBP_DISPLAY = { quality: 95, effort: 4 };
const WEBP_PLACEHOLDER = { quality: 85, effort: 2 };
const WEBP_FULL = { quality: 95, effort: 4 };
const FULL_MAX_WIDTH = 1600;

function baseName(file) {
  return file.replace(/\.(jpe?g|webp)$/i, '');
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function main() {
  console.log('Optimizing images…');

  // 1. Hero: make progressive (same file, re-encoded)
  const heroPath = join(publicDir, 'hero', 'hero-background.jpg');
  try {
    const buf = await sharp(heroPath).jpeg(progressiveJpeg).toBuffer();
    await sharp(buf).toFile(heroPath);
    console.log('  hero-background.jpg → progressive');
  } catch (e) {
    console.warn('  hero:', e.message);
  }

  // 2. Gallery: WebP display (800w), placeholders (40w), full (1600w) — all for repo + progressive load
  const assetsDir = join(publicDir, 'assets');
  const displayDir = join(publicDir, 'gallery', 'display');
  const placeholdersDir = join(publicDir, 'gallery', 'placeholders');
  const fullDir = join(publicDir, 'gallery', 'full');
  await ensureDir(displayDir);
  await ensureDir(placeholdersDir);
  await ensureDir(fullDir);

  let files = [];
  try {
    files = (await readdir(assetsDir)).filter((f) => /\.(jpe?g|webp)$/i.test(f));
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

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
