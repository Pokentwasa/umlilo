# Um-Lilo — Private School Tshisa Nyama

An immersive, editorial one-page site for Um-Lilo, a Woodstock (Cape Town)
tshisa nyama built around the idea of **Around the Fire** — food, fire,
people, sport and community, told as one continuous scroll rather than a
stock hospitality template.

## Stack

- **Next.js 16** (App Router, server-rendered, static export of the home route)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `app/globals.css`)
- **GSAP + ScrollTrigger + Draggable** for scroll-driven motion, gated behind
  `gsap.matchMedia()` so pinned/horizontal effects only run on desktop
  viewports with `prefers-reduced-motion: no-preference`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

- `data/` — CMS-ready content (menu, gallery, events, site info), kept
  separate from presentation so a real CMS can replace it later without
  touching components.
- `components/` — one component per homepage section (`Hero`, `FoodSection`,
  `Imbizo`, `MatchDay`, `SoundEnergy`, `Story`, `Gallery`, `Visit`,
  `FinalMoment`), plus shared motion/UI primitives (`Cursor`, `EmberThread`,
  `ImagePlaceholder`, `GrainOverlay`).
- `lib/` — GSAP setup (`gsap.ts`), the SEO schema builders (`schema.ts`), and
  a small SSR-safe media query hook.

## Photography placeholders

No real photography exists yet. Every image slot renders through
`components/ImagePlaceholder.tsx` as a textured, captioned frame (an
"annotated contact sheet" treatment) describing exactly what should be
shot there — see the `placeholder` fields in `data/menu.ts` and
`data/gallery.ts`. Swap each one for `next/image` once photography is
available; nothing else needs to change.

## Accessibility & motion

Every scroll-pinned or horizontal-scroll sequence has a non-pinned,
fully-accessible fallback for touch devices and for visitors with
`prefers-reduced-motion: reduce`. The custom cursor only renders for
fine-pointer/hover-capable devices and never blocks native interaction.
