// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// base '/' for root domain (e.g. fstulipan.sk). For GitHub project URL use base: '/tulipan/'.
export default defineConfig({
  site: 'https://fstulipan.sk',
  base: '/',
  build: {
    inlineStylesheets: 'auto', // inline small CSS to reduce render-blocking (Lighthouse)
  },
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
