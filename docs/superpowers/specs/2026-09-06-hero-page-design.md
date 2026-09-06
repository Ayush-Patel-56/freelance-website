# Hero Page (Landing Screen) — Design Spec

Date: 2026-09-06
Status: Approved for planning

## Purpose

Recreate the first-screenful ("hero") of a Webflow portfolio site
(https://www.marekvataha.com/) as a React application — same layout,
same GSAP-driven animations and transitions — using original, fictional
placeholder content instead of the reference site's real identity,
photos, and project work.

This is the first sub-project of a larger portfolio site. Later
sections (case studies, about, contact, footer) are out of scope here
and will get their own spec/plan when we get to them.

## Reference findings

Inspected the live site's HTML/CSS/JS. Relevant facts that shape this
design:

- Built on Webflow, but the animation layer is **hand-written GSAP**
  (not Webflow's built-in IX2 interactions) — confirmed via inline
  `<script>` blocks using `gsap.timeline`, `gsap.utils.random`,
  `gsap.utils.toArray`, and `ScrollTrigger`-style scrubbing.
- Color tokens (CSS custom properties):
  - Brand primary/accent: `#f96f39` (orange)
  - Brand secondary/background: `#e9e7e3` (warm off-white)
  - Neutral black: `#191919`, neutral white: `#ffffff`
  - Various white/black alpha overlays for glass-card effects
    (e.g. `rgba(255,255,255,0.65)`, `rgba(25,25,25,0.3)`)
- Typography: custom font family "PP Mori" (Regular / Semibold), a
  commercial font we don't have a license for. Substituting **Inter**
  (Google Fonts) for body/headline text — a clean grotesk in the same
  spirit — and **Playfair Display Italic** (Google Fonts) for the
  cursive-style accent words ("designer,", "developer."), chosen over
  a full calligraphic script for legibility at large display sizes.
- Structure confirmed from source: a fixed navbar rendered as a single
  glass-pill button (logo + name) that, on click, expands a blurred
  backdrop and reveals a grid of "nav cards", each scattered in with a
  randomized rotation (`gsap.utils.random(-10, 10)` / `(-24, 24)` on
  close) and staggered timing.
- Hero section: a small pill-shaped tagline line, a large headline
  built from mixed text + two inline thumbnail images + cursive accent
  words, and two CTA buttons ("See My Work" filled, "Services"
  outlined).
- A large, low-opacity looping marquee of text sits behind/below the
  hero content near the bottom of the viewport.
- Bottom-left: social icon links. Bottom-right: a circular scroll-down
  affordance.
- `overflow-x: clip` on `html`/`body` — used to allow full-bleed
  decorative elements (like the marquee) without introducing horizontal
  scroll.

## Out of scope

- CMS/backend, real project data, contact form, multi-page routing.
- The navbar's animated circular "home" text-path SVG (nice-to-have,
  not required for a faithful first pass) — can be added later.
- Pixel-perfect font matching (PP Mori is proprietary).
- Automated visual regression tests — verification is manual, in
  a running dev server.

## Architecture

- **Build tool:** Vite (`npm create vite@latest` with the `react`
  template, JavaScript not TypeScript unless requested later).
- **Styling:** CSS Modules, one `.module.css` per component. A single
  `src/styles/tokens.css` holds the color/spacing custom properties
  (mirroring the reference's primitives above) imported globally.
- **Animation:** `gsap` + `@gsap/react`'s `useGSAP` hook for
  React-safe setup/cleanup; `ScrollTrigger` plugin registered once in
  `src/lib/gsap.js`.
- **Content:** placeholder persona and copy live in one file,
  `src/content/site.js`, exporting a plain object (name, tagline,
  headline parts, nav items, social links). Components read from it —
  no copy hardcoded inline — so swapping in real content later is a
  data change, not a component rewrite.

## Component breakdown

```
src/
  App.jsx
  content/site.js
  lib/gsap.js
  styles/tokens.css
  components/
    Navbar/
      Navbar.jsx
      Navbar.module.css       // glass pill button
      NavCard.jsx             // one scattered menu card
    Hero/
      Hero.jsx
      HeroTagline.jsx
      HeroHeadline.jsx        // text + inline images + accent words
      HeroActions.jsx         // CTA buttons
    BackgroundMarquee/
      BackgroundMarquee.jsx
    ScrollCue/
      ScrollCue.jsx           // bottom-right scroll arrow
    SocialLinks/
      SocialLinks.jsx         // bottom-left icon links
```

## Placeholder content

Fictional persona to stand in for the reference's real identity:

- Name: "Alex Rivera"
- Location line: "I'm Alex Rivera, Berlin based.."
- Headline: "BRAND & WEB [image] designer, WEBFLOW [image] developer."
  (mirrors the original's mixed text/image/cursive-word layout)
- Logo: a simple monogram built from the initial "A", styled like the
  reference's circular logo mark — no reuse of the original SVG.
- Hero inline images + project thumbnails: solid-color / CSS-gradient
  placeholder blocks (no scraped images), sized to match the
  reference's aspect ratios.
- Background marquee text: "Passion / Craft / Story" repeating, to
  match the rhythm of the original's bottom marquee.

## Animations

1. **Initial load:** tagline pill fades in first; headline
   text/images/buttons fade + slide up with a stagger (GSAP timeline
   on mount via `useGSAP`).
2. **Nav open:** click on the navbar pill triggers a GSAP timeline —
   blurred backdrop fades in, 3 nav cards scale/rotate in from center
   with `gsap.utils.random` rotation and staggered delay. Closing
   reverses the timeline (scatter back out with new random rotation).
3. **Hero inline images:** subtle scroll-linked parallax
   (`ScrollTrigger` with `scrub`) — images drift slightly slower/faster
   than the text as the user scrolls past the hero.
4. **Background marquee:** CSS/GSAP infinite horizontal loop at
   constant speed, low opacity, purely decorative (`aria-hidden`).
5. **Scroll cue:** small looping bounce (`yoyo: true, repeat: -1`).
6. **Accessibility:** a `prefers-reduced-motion` media query check
   (via a small `usePrefersReducedMotion` hook) disables the
   marquee loop, parallax, and bounce — content still renders fully
   static and readable.

## Testing / verification plan

No automated test suite for this visual layer (no meaningful assertions
to write against GSAP timelines at this stage). Verification is manual:

1. Run `npm run dev` and load the page in-browser.
2. Confirm layout matches the reference's proportions at a ~1900px
   desktop width, and reflows sensibly down to mobile widths.
3. Confirm each animation listed above actually fires: load-in
   stagger, nav open/close scatter, parallax on scroll, marquee loop,
   scroll-cue bounce.
4. Toggle OS-level "reduce motion" and confirm the loops/parallax stop
   while content remains visible and usable.
5. Check for horizontal scroll leakage (should be clipped like the
   reference).

## Open items for future sub-projects

- Additional page sections below the hero (case studies, about,
  contact, footer) — separate spec.
- Real content swap-in once placeholder structure is validated.
- Optional: circular animated "home" text-path SVG in the nav card.
