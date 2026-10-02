# ASSET-MANIFEST.md — DL Collective Marketing (static HTML build)

All website media comes from **asset.zip** (the final-asset source). Files were copied unmodified; only the
filenames were changed for organisation. Nothing from `reference.zip` or `template2.zip` is used as a site asset
(those two archives were screenshots used for content/branding and layout analysis only).

Package layout:

```
media/
├── images/   (18 photos / graphics)
└── logos/    (brand logo + press logo)
```

| Final file (media/) | Type | Pixels | Used on | Location on page | Source (original filename) |
|---|---|---|---|---|---|
| `logos/dlc-logo.png` | Logo | 750×698 | All pages | Header → image (white badge); Home → Hero → image; Footer → image; Off-canvas menu (menu panel) | asset.zip → `logo.png` |
| `logos/featured-wftv9.png` | Press logo | 1536×1024 | Home, Our Clients | Home → "Featured In" → logo grid; Our Clients → "Featured In" → logo grid | asset.zip → `ChatGPT+Image+Feb+10,+2026,+04_47_32+PM.png` |
| `images/home-hero-collage.png` | Image (hero) | 2500×1406 | Home | Home → Hero → section background image | asset.zip → `1 (14).png` |
| `images/about-brand-creator.png` | Image | 1000×1250 | Home | Home → "We understand brands." → right column image | asset.zip → `ChatGPT+Image+Jul+1,+2026,+11_13_39+PM (4).png` |
| `images/founders-lauren-danly.png` | Image | 1086×1448 | Who We Are | Who We Are → "Meet The Founders" → right column image | asset.zip → `ChatGPT+Image+Jul+11,+2026,+02_48_41+PM.png` |
| `images/studio-camera-setup.png` | Image | 750×563 | Home, What We Do, Our Work | Home → "Solutions that drive growth." → left column Image; What We Do → grid tile "Consulting & Resources"; Our Work → feed item "Studio Production" | asset.zip → `ChatGPT+Image+Jul+5,+2026,+01_28_42+PM.png` |
| `images/contact-lauren-laptop.png` | Image | 1122×1402 | Who We Are, What We Do, Contact | Who We Are → circle "Professional Services"; What We Do → grid tile "Email Marketing"; Contact → row 1 "Need our help?" Image | asset.zip → `ChatGPT+Image+Jul+5,+2026,+01_56_48+PM.png` |
| `images/work-photography-studio.jpg` | Image | 736×981 | Home, What We Do, Our Clients | Home → work collage (center); What We Do → grid tile "Photography & Videography"; Our Clients → grid tile | asset.zip → `Photo.jpg` |
| `images/work-videography-rig.jpg` | Image | 736×1307 | Home, Who We Are, Careers | Home → work collage (right); Who We Are → "How We Work" → left column section background image; Careers → right column Image | asset.zip → `Video.jpg` |
| `images/client-orlando-magic-event.jpg` | Image | 1000×668 | Home, Who We Are, Our Work, Our Clients | Home → "Featured In" → section background image; Who We Are → Founders left Image + circle "Growing Startups"; Our Work → feed item; Our Clients → grid tile | asset.zip → `SYF10.16#2+(1) (3).jpg` |
| `images/portrait-lauren-city-sm.png` | Image | 750×1121 | Contact, Careers | Contact → row 4 "Ready to work?" Image; Careers → right column Image | asset.zip → `Screenshot+2026-06-22+at+10.39.07 AM (3).png` |
| `images/portrait-lauren-city.png` | Image | 1000×1495 | Who We Are, What We Do, Our Clients | Who We Are → circle "Retail Brands"; What We Do → grid tile "Paid Ads"; Our Clients → grid tile | asset.zip → `Screenshot+2026-06-22+at+10.39.07 AM (4).png` |
| `images/client-allycar-cadillac-sm.png` | Image | 1000×563 | Who We Are, Our Clients | Who We Are → "Who We Work With" → circle "Service-Based Companies"; Our Clients → grid tile "AllyCar" | asset.zip → `Untitled+design+(6) (16).png` |
| `images/client-allycar-cadillac.png` | Image (hero) | 1500×844 | Who We Are, Our Work | Who We Are → Hero → section background image; Our Work → feed item "AllyCar" | asset.zip → `Untitled+design+(6) (20).png` |
| `images/client-food-plating.jpg` | Image | 1000×1500 | Who We Are, What We Do, Our Clients | Who We Are → "Kind Words" → section background image; What We Do → grid tile "SEO"; Our Clients → grid tile | asset.zip → `caption.jpg` |
| `images/client-brunch-board.jpg` | Image | 1000×1500 | Who We Are, What We Do, Our Clients | Who We Are → circle "Hospitality"; What We Do → grid tile "Influencer Marketing"; Our Clients → grid tile | asset.zip → `i-really-a-peach-iate.jpg` |
| `images/social-what-clients-are-saying.jpg` | Image | 1080×1350 | What We Do, Our Clients | What We Do → grid tile "Social Media Management"; Our Clients → grid tile | asset.zip → `image-asset (1).jpeg` |
| `images/social-new-client-questionnaire.jpg` | Image | 720×900 | What We Do, Our Clients, Contact | What We Do → grid tile "Branding"; Our Clients → grid tile; Contact → row 2 "Looking to partner?" Image | asset.zip → `image-asset (2).jpeg` |
| `images/social-why-your-aesthetic-works.jpg` | Image | 1080×1350 | What We Do, Our Clients, Contact | What We Do → grid tile "Content Creation"; Our Clients → grid tile; Contact → row 3 "Have questions?" Image | asset.zip → `image-asset.jpeg` |
| `images/client-custom-home-kitchen.png` | Image | 1000×667 | Home, Who We Are, Our Work, Our Clients | Home → "Work that speaks for itself" collage (left); Who We Are → circle "Real Estate"; Our Work → feed item "Dean Allen Company"; Our Clients → grid tile | asset.zip → `0bb95906-58fe-4ab7-a8ac-8efac06e70ec (3).png` |

## Assets in asset.zip that are NOT used
None — all 20 supplied files are placed. (`.DS_Store` and `__MACOSX` resource forks were discarded.)

## Logo
`asset.zip/logo.png` is the final logo (green outline "DLC — Marketing Agency" on a transparent background).
Because it is green-on-transparent, it sits on a **white rounded badge** (white badge) in the
header and in the Home hero so it stays legible over dark photography; on the light footer it is used flat.
The reference site's wordmark ("DL COLLECTIVE MARKETING") was not supplied as a file and was not recreated.

## Favicon
No favicon was supplied in asset.zip. `logos/dlc-logo.png` is referenced as the favicon in the preview and is the
`<link rel="icon">` in every page until a dedicated favicon is provided.

## Press / "Featured In" logos
Only **WFTV 9** was supplied (`logos/featured-wftv9.png`). The other four outlets shown in the reference —
Tudo Para Brasileiros, Architectural Digest, Forbes, Windermere Wine & Dine — are set as **text headings** in the same
grid cells, ready to be swapped for logo files when supplied. No stock or downloaded logos were used.

## Fonts
Brand font (reference): **Montserrat** (400 / 500 / 600 / 700 + italics). No font files were supplied in asset.zip, so
Montserrat is loaded from Google Fonts (via `@import` at the top of styles.css) rather than bundled.

## Image fitting
Where an asset's aspect ratio differs from the template slot (e.g. portrait photos in square circles, wide photos in
portrait tiles) the template's slot dimensions were kept and the asset is fitted non-destructively with the Image
widget's Height + Object Fit controls (or section background image-size cover). Originals remain untouched in `media/`.

## Optimisation note (optional)
Several PNGs are large (`home-hero-collage.png` ≈ 7 MB). They were deliberately left as supplied; if page speed
matters, run them through an image optimiser or WebP converter before deploying — this does not change any placement in the pages.
