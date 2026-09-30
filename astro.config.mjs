// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// base '/' for root domain (e.g. fstulipan.sk). For GitHub project URL use base: '/tulipan/'.
export default defineConfig({
  site: 'https://fstulipan.sk',
  base: '/',
  // GitHub Pages serves /about/ (directory format) and 301s /about → keep every URL slash-terminated.
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx' whitespace rules, which drop spaces between inline elements
  // ("19:00·Salónik"); keep the HTML-aware v6 behaviour.
  compressHTML: true,
  build: {
    // Inline all stylesheets to break critical request chain (Lighthouse: network dependency tree)
    inlineStylesheets: 'always',
  },
  integrations: [
    // /traditions is kept unlinked and noindex until its copy is updated.
    sitemap({ filter: (page) => !/\/traditions\/$/.test(page) }),
  ],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
