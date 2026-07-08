# Ceylon Tour Range — UI Mockups (Phase 2: Design)

High-fidelity, browser-viewable mockups for every page in the project sitemap
(see `CTR.requirements.pdf`). Open `index.html` for a linked gallery of all 15 screens.

## Screens

| # | File | Sitemap page |
|---|------|--------------|
| 01 | `home.html` | Homepage |
| 02 | `login.html` | Login / Signup |
| 03 | `attractions.html` | Attractions Directory |
| 04 | `attraction-details.html` | Attraction Details |
| 05 | `hotels.html` | Hotels Directory |
| 06 | `hotel-details.html` | Hotel Details |
| 07 | `taxi.html` | Taxi Booking |
| 08 | `itinerary.html` | Itinerary Builder |
| 09 | `hotel-booking.html` | Hotel Booking (checkout) |
| 10 | `dashboard.html` | User Dashboard |
| 11 | `guide-portal.html` | Tour Guide Portal |
| 12 | `admin.html` | Admin Dashboard |
| 13 | `about.html` | About Us / Contact |
| 14 | `faq.html` | FAQs / Help Center |
| 15 | `legal.html` | Legal Pages |

Screens link to each other following the real user flows (e.g. hotel details →
checkout, attraction → itinerary), so the set doubles as a clickable prototype.

## Design system ("Tropical Modern")

Defined once in `assets/styles.css`; all screens share it.

- **Color** — deep ocean teal (`#0E5A54` primary, `#04211F` dark surfaces),
  sunset amber (`#F59E0B` → `#FF8A3D`) for CTAs, warm sand neutrals (`#FAF7F1`).
- **Type** — Fraunces (display headings) + Plus Jakarta Sans (UI/body), loaded
  from Google Fonts.
- **Components** — nav, buttons (primary/accent/ghost), cards, chips, badges,
  forms, search bar, tables, tabs, sidebar app shell, stats, timeline, map
  placeholder, accordion, checkout steps, footer.
- **Motion** — page fade-in, reveal-on-scroll (`.reveal` + `assets/mock.js`),
  card hover lift + image zoom, Ken Burns hero, animated map pins, nav underline
  and shadow transitions. Timing tokens: 200 / 350 / 600 ms, custom ease.
- **Imagery** — Unsplash photography of Sri Lanka (hotlinked, with fallbacks);
  replace with licensed/client photography before production.

## Importing into Figma

1. Install the free **html.to.design** plugin (and its browser extension) in Figma.
2. Open a screen in Chrome (double-click the HTML file).
3. In Figma: *Plugins → html.to.design → Import from URL / Capture tab*.
4. The screen arrives as an editable frame — real text layers, auto-layout-ish
   structure, and downloaded images. Repeat per screen.

Tip: import at 1440 px viewport width for desktop frames; resize the browser to
390 px and re-capture for mobile variants (the CSS is responsive).

## Notes

- Pure static HTML/CSS + ~40 lines of presentation-only JS. No build step.
- These are **design artifacts**, not production code; the production app lives
  in `src/`.
