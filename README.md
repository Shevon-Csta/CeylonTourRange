# Ceylon Tour Range by Nonis

A themed trip planner for Sri Lanka. A tourist picks a trail — Coastal,
Heritage, Wild, or Modern — and gets a ready-made day-by-day itinerary with
transport, hotels, and dining already suggested, which they can then
customize.

This repo is the **UI build only** at this stage. No backend, no real
bookings, no auth yet — see [Stages](#stages) below.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | Component-based, so every screen maps to its own file; built-in image optimization matters since this site is photo-heavy; SSR/SSG helps SEO for a tourism site. |
| Styling | Tailwind CSS v4 | Design tokens live in one place ([`src/app/globals.css`](src/app/globals.css)) instead of scattered across files. |
| Animation | [Motion](https://motion.dev) (`motion/react`, formerly Framer Motion) | Subtle transitions and hover states — see "Animation" below. |
| Icons | lucide-react | Consistent icon set, tree-shakeable. |
| Linting | ESLint (`eslint-config-next`) | Enforced on every file, not just a suggestion. |

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

> Dependencies aren't installed in this delivered copy — `node_modules` is
> never committed (see `.gitignore`). Run `npm install` once after cloning.

## Project structure

```
src/
  app/                     Routes (Next.js App Router — one folder per URL)
    page.tsx               Home
    trails/page.tsx        Explore Trails (all four, grid view)
    trails/[slug]/page.tsx Trail Overview (dynamic — one per trail)
    plan/page.tsx           Trip Builder
    trips/page.tsx          My Trips (saved itineraries — empty state for now)
    about/, contact/        Static pages
    layout.tsx              Root layout — wraps every page in Navbar + Footer
    globals.css              Design tokens (brand + per-trail color palettes)

  components/
    layout/                 Navbar, Footer, SocialLinks
    home/                   Hero, TrailShowcase, HowItWorks
    trails/                 TrailCard, TrailHero, DayByDayPreview
    plan/                   TripBuilder
    ui/                     Container, SectionHeading, Button, PlaceholderImage
                             — generic pieces used across multiple pages

  lib/
    types.ts                 Shared types (Trail, ItineraryDay, ...)
    site.ts                  Brand name (SITE_NAME / BRAND_NAME / BRAND_SUFFIX)
                               — every page title, the navbar, and the footer
                               read from here. Change the name once, here.
    data/trails.ts            The four trails' content — routes, day-by-day,
                               activities, vehicle notes. Edit this file to
                               change trail content; no component code needed.
```

The rule of thumb: **page files stay thin** (they fetch/select data and
lay out components); the actual UI lives in `components/`; content lives in
`lib/data/`. If you need to change what a trail says, edit
`lib/data/trails.ts` — you should never need to touch a `.tsx` file just to
change wording. Same goes for the brand name: edit `lib/site.ts`, not a
grep-and-replace across the app.

## Design tokens

Colors are defined once in [`globals.css`](src/app/globals.css) and reused
everywhere as Tailwind utilities (`bg-brand-primary`, `text-coastal`, etc.)
or, where Tailwind can't generate a class dynamically (trail-driven colors),
as `var(--color-...)` in an inline style. See the comment at the top of
that file for the naming pattern.

| Palette | Used for |
|---|---|
| `brand-*` | Site-wide — nav, buttons, footer |
| `coastal-*` | Coastal Ceylon trail |
| `heritage-*` | Heritage Ceylon trail |
| `wild-*` | Wild Ceylon trail |
| `modern-*` | Modern Ceylon trail |

Fonts: **Baloo 2** for headings (`font-display`) — rounded and friendly,
fits a colorful tourism brand. **Inter** for body text (`font-sans`) —
clean and readable at small sizes.

## Imagery

No licensed photography exists yet. Every image on the site is currently a
[`PlaceholderImage`](src/components/ui/PlaceholderImage.tsx) — a colored
block in the relevant trail's palette with a label describing what should
go there (e.g. "Coastal — Galle Fort").

To replace one: drop the real file into
`public/images/trails/<trail-slug>/`, then swap the `<PlaceholderImage />`
for a Next `<Image />` pointing at it, keeping the same `className` (aspect
ratio / rounding). Nothing else in the layout needs to change.

Suggested shot list per trail is in `lib/data/trails.ts` (`activities` and
`days` fields double as a shot list — whale watching, Galle Fort, Sigiriya,
etc.).

## Animation

Kept deliberately restrained — page-load fades/slides on the hero, a
mobile-menu expand/collapse, hover lift on trail cards. Nothing that gets
in the way of reading the content. Add more via `motion/react` following
the pattern already in `Hero.tsx` and `Navbar.tsx`.

## Stages

1. **Structure** *(this commit)* — routing skeleton for every core screen,
   design tokens, layout shell, trail data model. Content and layouts are
   a first pass, not final.
2. **Functioning UI** *(next)* — full layouts, real imagery, richer
   animation, the Trip Builder actually seeded from a selected trail,
   hotel/restaurant suggestion panel. Still no backend — everything runs
   on local/mock data.
3. **Backend** *(later, separate phase)* — real accounts, bookings,
   payments, and content management. Out of scope until Stage 2 is signed
   off.

## Notes / open items

- Social links in the footer are placeholders (`href="#"`) — swap in real
  handles when available.
- The "brine fishing" activity under Coastal Ceylon has been interpreted as
  traditional stilt fishing (Koggala/Ahangama coast) — flag if that's wrong.
- Full reasoning behind the four trails (day-by-day logic, how they combine
  for a longer stay, open questions for Mayura) lives in
  `CTR_Trip_Planner_Reference.docx` in the parent folder.
