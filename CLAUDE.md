# Tulipan site — Claude Code instructions (Astro repo)

See also: `../../CLAUDE.md` (project root — workflow rules, context files, image policy).

## Tech stack

Astro + Tailwind, bilingual (SK/EN). Live at fstulipan.sk (base `/`).

## Key commands

Run from `websites/main/`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server at localhost:4321 |
| `npm run build` | Production build to `./dist/` (also runs optimize-images + prune) |
| `npm run optimize-images` | Generate optimized hero/gallery WebP, prune unreferenced outputs |
| `npm run optimize-images -- --no-prune` | Generate without pruning |
| `npm run clean-unused-images` | Prune unreferenced image outputs standalone |

## Git

Push from here: `cd websites/main && git add ... && git commit ... && git push`

GitHub Pages deploys via GitHub Actions (not "Deploy from a branch" — that runs Jekyll and fails on .astro files).

## Gallery data

Gallery lives in `src/data/gallery.manifest.yaml`. Do not hand-edit `gallery.ts` arrays directly. Validated in `gallery-manifest.ts`, consumed by `gallery.ts`.

## Deploy notes

- GitHub Pages does not send long-lived `Cache-Control` headers. Cloudflare in front is deferred — see `../../docs/notes/cache-headers-github-pages.md`.
- After route changes, run `npm run build` to regenerate the sitemap (`@astrojs/sitemap`).
