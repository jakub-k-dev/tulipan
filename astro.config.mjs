// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// base '/tulipan/' for GitHub project URL (jakub-k-dev.github.io/tulipan). When using only custom domain fstulipan.sk, switch to base: '/' and redeploy.
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
