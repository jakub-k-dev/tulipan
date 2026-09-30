// Tailwind 3 via PostCSS (replaces @astrojs/tailwind, which doesn't support Astro 6+).
// src/styles/global.css holds the @tailwind directives.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
