# Project — combined preferences

This folder is the **combined** site from the four design variants. It keeps what you liked and drops what you didn’t.

**From A (textile):** Embroidery image as background (hero, page heroes, content bands). **Header/footer use bright red** (group color) instead of gold — so the textile stays, red is the main UI color.

**From B (single-page scroll):** Home has **scroll sections** (About, Events, Gallery, Traditions, Contact) with anchors and “Viac →” / “Read more →” links. You get a **one-page scroll feel on home** but **separate pages** still exist (nav goes to /about, /events, etc.). Smooth scroll for anchor links.

**From C (museum cards):** Only the **hover-reveal on images** was kept. Used on the **Gallery** page: image cards scale and overlay lifts on hover (no museum card grid).

**From D (editorial):** **Full-width content on PC** — main content uses `max-w-[90rem]` (90rem) so it’s wide on large screens.

**Run:** `npm install` then `npm run dev` (default port 4321, or `npm run dev -- --port 4330` to avoid conflict with design variants).

**Build:** `npm run build`
