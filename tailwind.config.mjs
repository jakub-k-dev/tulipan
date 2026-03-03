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
        /* Rich red, green, blue, pink from embroidery */
        embroidery: {
          red: '#b91c1c',
          redRich: '#991b1b',
          green: '#166534',
          greenLight: '#22c55e',
          blue: '#1d4ed8',
          blueLight: '#3b82f6',
          pink: '#db2777',
          pinkLight: '#ec4899',
          /* legacy names for compatibility */
          ochre: '#c9a227',
          ochreLight: '#e5c76b',
          ochreBright: '#f0d04a',
          maroon: '#7f1d1d',
          maroonBright: '#991b1b',
          crimson: '#b91c1c',
          gold: '#d4a017',
          goldFlat: '#c9a227',
          outline: '#fffef9',
          royal: '#1d4ed8',
          fuchsia: '#db2777',
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
      backgroundImage: {
        'embroidery-hero': 'url("/images/embroidery-reference.png")',
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
