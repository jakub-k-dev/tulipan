// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// base '/' for root domain (e.g. fstulipan.sk). For GitHub project URL use base: '/tulipan/'.
export default defineConfig({
  site: 'https://fstulipan.sk',
  base: '/',
  // GitHub Pages serves /about/ (directory format) and 301s /about → keep every URL slash-terminated.
  trailingSlash: 'always',
  build: {
    // Inline all stylesheets to break critical request chain (Lighthouse: network dependency tree)
    inlineStylesheets: 'always',
  },
  integrations: [
    tailwind(),
    // /traditions is kept unlinked and noindex until its copy is updated.
    sitemap({ filter: (page) => !/\/traditions\/$/.test(page) }),
  ],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
