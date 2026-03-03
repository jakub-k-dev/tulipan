// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// For GitHub Pages project site: https://<user>.github.io/tulipan — set base to '/tulipan/'. For custom domain or user site use base: '/'.
export default defineConfig({
  site: 'https://jakub-k-dev.github.io',
  base: '/tulipan/',
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
