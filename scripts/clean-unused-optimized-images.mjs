#!/usr/bin/env node
/**
 * Remove optimized files under public/images/ that are not referenced anywhere in src/
 * (including paths in gallery.manifest.yaml and other YAML under src/).
 * Skips public/images/assets/ (gitignored originals).
 * Gallery full/*.webp implies display/ + placeholders/ with the same basename.
 *
 * Usage: node scripts/clean-unused-optimized-images.mjs [--dry-run]
 */
import { readdirSync, unlinkSync } from "fs";
import { join, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { buildNeededImagePaths } from "./referenced-image-paths.mjs";

/**
 * @param {string} imagesRoot
 * @param {string} dir
 * @param {(f: string) => boolean} [filter]
 * @returns {string[]}
 */
function walkFiles(imagesRoot, dir, filter) {
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
    if (e.isDirectory()) {
      if (p === join(imagesRoot, "assets")) continue;
      out.push(...walkFiles(imagesRoot, p, filter));
    } else if (!filter || filter(p)) {
      out.push(p);
    }
  }
  return out;
}

/**
 * @param {string} siteRoot - websites/main
 * @param {{ dryRun?: boolean }} [opts]
 * @returns {{ removed: number, paths: string[] }} paths are relative to siteRoot
 */
export function pruneUnusedOptimizedImages(siteRoot, opts = {}) {
  const dryRun = Boolean(opts.dryRun);
  const imagesRoot = join(siteRoot, "public", "images");
  const needed = buildNeededImagePaths(siteRoot);
  /** @type {string[]} */
  const toRemove = [];

  for (const abs of walkFiles(imagesRoot, imagesRoot)) {
    const relWeb =
      "/images/" + relative(imagesRoot, abs).replace(/\\/g, "/");
    if (!needed.has(relWeb)) {
      toRemove.push(abs);
    }
  }

  toRemove.sort();

  if (dryRun) {
    return {
      removed: 0,
      paths: toRemove.map((p) => relative(siteRoot, p)),
    };
  }

  let n = 0;
  for (const p of toRemove) {
    try {
      unlinkSync(p);
      n++;
    } catch (e) {
      console.error("Failed:", p, e);
    }
  }
  return { removed: n, paths: toRemove.map((p) => relative(siteRoot, p)) };
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const siteRoot = join(__dirname, "..");
  const dryRun = process.argv.includes("--dry-run");
  const { removed, paths } = pruneUnusedOptimizedImages(siteRoot, { dryRun });

  if (dryRun) {
    console.log(
      `Dry run: would remove ${paths.length} file(s) under public/images/ (excluding assets/).`,
    );
    for (const p of paths) console.log("  ", p);
    process.exit(0);
  }

  console.log(
    `Removed ${removed} unused file(s) under public/images/ (assets/ left untouched).`,
  );
}
