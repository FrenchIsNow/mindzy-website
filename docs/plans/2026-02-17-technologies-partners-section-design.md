## Goal
Add a “Technologies & Partners” section to the home page directly after the Hero section, visually inspired by a honeycomb/hex logo layout around a central Mindzy badge. The section should be fully localized (fr/en/es) and automatically render whatever logo assets exist under `public/images/logo/`.

## Placement
`src/app/[locale]/page.tsx` renders the new section after `<Hero />` and before `<UseCaseCards />`.

## Content (i18n)
The section provides:
- Eyebrow label
- Title
- Subtitle (one short sentence)

All strings are defined inline in the section component using the existing `Record<Locale, ...>` pattern used across other sections.

## Data source (logos)
Logos are discovered at runtime on the server by reading `public/images/logo/` from the filesystem and filtering to supported image extensions.

Constraints:
- The section remains a Server Component (no `"use client"`).
- Logo paths are generated as `/images/logo/<encoded filename>` so filenames with spaces work reliably.

## Layout & styling
- Section uses the existing spacing utilities (`section-padding`, `container-wide`) for consistency.
- Desktop layout: 3 columns (left honeycomb, center Mindzy badge, right honeycomb).
- Mobile layout: center badge above, honeycomb collapses into a simple hex grid.
- Hex tiles use `clip-path: polygon(...)` with subtle border/backdrop and hover lift.
- The center badge prefers a Mindzy logo asset if present in `public/`; otherwise it renders a gradient hex with a monogram fallback.

## Accessibility
- Each logo tile includes `alt` text derived from a humanized filename.
- Decorative background elements are `aria-hidden`.

## Success criteria
- Section appears immediately after Hero on `/fr`, `/en`, `/es`.
- Logos in `public/images/logo/` appear automatically without code changes.
- No layout shift or image stretching; logos remain contained.
