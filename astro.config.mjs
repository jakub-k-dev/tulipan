// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// Custom domain fstulipan.sk — base '/' so routing works at root. In repo Settings → Pages add Custom domain: fstulipan.sk.
export default defineConfig({
  site: 'https://fstulipan.sk',
  base: '/',
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
