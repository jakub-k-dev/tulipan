# Tulipan website (Astro)

**This is an Astro site, not Jekyll.** To publish on GitHub Pages you must use the Actions workflow:

1. Repo **Settings** → **Pages** (under “Code and automation”).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main`; the “Deploy to GitHub Pages” workflow will build and deploy.

If Source is left as “Deploy from a branch”, GitHub runs Jekyll and the build will fail on `.astro` files.

**Lighthouse — cache & image size:** GitHub Pages does not send long-lived `Cache-Control` headers, so “Use efficient cache lifetimes” will show 10m TTL until you add **Cloudflare** in front: add your domain in Cloudflare (DNS → proxy on), then **Rules** → **Transform Rules** → **Modify response header**: when URL path matches `/images/*` or `/_astro/*`, set `Cache-Control` = `public, max-age=31536000, immutable`. Hero images are already WebP + JPEG at reduced quality for smaller transfer.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
