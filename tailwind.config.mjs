/** @type {import('tailwindcss').Config} */
/** Project: textile + bright red (group color), full-width, scroll sections + separate pages, hover-reveal */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* Bright red = group color (header, primary CTAs) */
        groupRed: '#dc2626',
        groupRedDark: '#b91c1c',
        /* Textile base and neutrals */
        textile: {
          base: '#c9a227',       /* gold/yellow base (dominant in embroidery) */
          gold: '#d4a017',
          goldLight: '#e5c76b',
          mustard: '#b8860b',
          cream: '#faf6f0',
          outline: '#fffef9',    /* white outlines */
        },
        heritage: {
          cream: '#faf6f0',
          brown: '#2c1810',
          charcoal: '#3d3028',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      animation: {
        'reveal': 'reveal 0.6s ease-out forwards',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
