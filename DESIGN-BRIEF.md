# Design A — Textile-first: embroidery as the soul

**Concept:** The site is built *around* a real folk embroidery. The reference image is the main visual and must drive layout and mood. Do not replicate the old “header + hero + article” structure; invent a new structure that makes the textile the star.

**Mandatory visual:** Use the image at **`public/images/embroidery-reference.png`** as a central element. Options (pick at least one and go bold): full-viewport or large-section **background** (fixed or parallax), hero that is *the textile* with content overlaid, or a split layout (e.g. textile one side, content the other). The palette from the image (gold/yellow base, rich red, green, blue, pink, white outlines) should drive your colors. You may use geometric bands from the textile as section dividers and floral motifs as decorative elements. The result should feel dense, crafted, and unmistakably folk-art-first.

**Structure:** Your choice — e.g. one-page scroll with sections, or multi-page where every key view touches the textile. No requirement to keep the previous site’s nav or section order; reorganise so the textile and content work together.

**Scroll effects (encouraged):** Parallax on the textile layer, reveal-on-scroll for content over the pattern, or sections that “stitch in” (animate in). Keep performance in mind (e.g. CSS or lightweight JS).

**Content constraints only:** Same information as context-website.md: Home, About us, Events, Gallery, Contact, Traditions. Bilingual SK/EN. Facts from `docs/context/context-cataj-tulipan-research.md`. Do **not** link to cataj.sk or cataj.eu. Everything else (order, layout, navigation, components) is up to you.

**Tech:** Astro, Tailwind OK. `npm run build` must succeed. Work only in this folder. Ignore any existing layout in the folder; implement the concept from this brief.
