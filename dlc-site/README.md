# DL Collective Marketing — static website (HTML / CSS / vanilla JS)

**Formula applied:** `template2.zip` (Bread & Butter layout) = HOW · `reference.zip` (dl-collective.com) = WHAT + BRAND · `asset.zip` = FINAL FILES.

No frameworks, no build step, no Elementor. Open `index.html` or drop the folder on any static host.

```
dlc-site/
├── index.html          Home
├── who-we-are.html     Founders · who we work with · how we work · kind words · locations
├── what-we-do.html     Services grid + service menu
├── our-work.html       Portfolio feed
├── our-clients.html    Client grid + "Featured In"
├── contact.html        Contact rows · contact form · FAQs
├── careers.html        Social Media Intern role
├── styles.css          One stylesheet (base + per-page rules, tablet ≤1024px and mobile ≤767px breakpoints)
├── script.js           Off-canvas menu (open / close / Escape / backdrop, current-page highlight)
├── media/              Final assets from asset.zip (see ASSET-MANIFEST.md)
├── ASSET-MANIFEST.md
└── README.md
```

## Dependencies
- **Montserrat** from Google Fonts (`@import` at the top of `styles.css`) — the brand font from the reference site.
  To go fully offline, download the font and swap the `@import` for `@font-face` rules.
- Icons are inline SVG — nothing else is loaded from the web.

## Editing
- Page structure is plain semantic HTML: `<header>` (logo + hamburger + off-canvas `<nav>`), `<aside>` (floating
  social icons), `<main>` with one `<section>` per template block, `<footer>`.
- Every element has a readable class (`index-s2`, `index-s2-1-3` …) and its layout rules sit under the matching
  `/* ==== Page ==== */` comment in `styles.css`. Shared cosmetics (menu, tilt cards, hover captions, underline accent,
  form fields) are in the base block at the top of the stylesheet.
- Brand tokens used throughout: Primary `#095316` · Dark `#06381A` · Tint `#F1F6F2` · Grey `#F2F2F2` · Text `#1F1F1F` · Muted `#4A4A4A`.

## Things that still need a decision
| Item | Status |
|---|---|
| Contact form | Real `<form>` with all fields from the reference (name, email, phone, project details, package, service checkboxes). It has `action="#"` — point it at Formspree / Netlify Forms / your own endpoint. |
| Press logos | Only WFTV 9 was supplied; Tudo Para Brasileiros, Architectural Digest, Forbes and Windermere Wine & Dine are text cells ready to swap for logo files. |
| Social links | `https://www.instagram.com/` and `#socials` are placeholders — the reference didn't show the real URLs. |
| Portfolio / client filters | Plain link lists (as in the template screenshots); wire to anchors or separate pages if needed. |
| Favicon | `media/logos/dlc-logo.png` is used until a dedicated favicon is supplied. |
| Privacy Policy / Terms | Footer links point to `#`. |

## How the template was followed (HOW)
| Template section (wearebreadandbutter.com) | Rebuilt as |
|---|---|
| Logo top-left over hero, hamburger top-right, vertical social icons floating right | Header (absolute) + fixed socials + slide-in menu |
| Home hero: full-bleed photo, centered wordmark | Full-bleed hero collage, centered logo badge + reference headline/sub-line |
| "who we are": text left / rounded portrait right, uppercase arrow link | "We understand brands." / brand creator photo / "Meet The Founders ⟶" |
| "what we do": collage image left / paragraph + uppercase service list right | Studio photo / 8 services / "More Services ⟶" |
| "our work": dark section, heading left, scattered 3-image collage | Dark-green section with 3-image collage, "View All Projects ⟶" |
| "awards": photo background + overlay, centered heading, logo grid | "Our Clients Have Been Featured In" over the Orlando Magic event photo |
| Footer: logo + © left, 4 link columns right | Navigation · Explore · Contact · Work With Us (reference's light-grey footer) |
| Who We Are: hero with bottom-left label + script line | Hero over AllyCar photo, italic Montserrat tagline |
| "why b&b": landscape image + accent line + paragraphs / tall portrait right | "Meet The Founders" |
| "what we love": 2×3 circles with green category + list | "Who We Work With" (6 industries from the reference FAQ) |
| "how we do it": full-bleed image left / dark list right | "How We Work" (3 process steps + packages) |
| "pats on the back": photo bg, tilted testimonial cards | "Kind Words" (3 reference testimonials) |
| "find us here": centered intro + icon/label grid | "Orlando-based, clients worldwide" (5 service areas) |
| What We Do: heading+underline / list, 3×3 rounded grid with hover captions | "Our Services" + 9 service tiles (+ service-menu section) |
| Our Work: heading+underline / filter list, staggered large images with captions, CTA | 4 staggered projects + "Get In Touch" |
| Our Clients: heading / paragraph, tabs, 5-column grid, logos | 10 tiles + "Featured In" |
| Contact: four alternating image / heading / script rows | Need our help? · Looking to partner? · Have questions? · Ready to work? (+ form and FAQ sections) |

Decorative hand-drawn doodles and the handwritten script font are template-specific artwork, so they were not
carried over; those slots use the brand's Montserrat italic in brand green.
