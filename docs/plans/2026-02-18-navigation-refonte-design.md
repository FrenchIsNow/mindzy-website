# Navigation Refonte Design - Mindzy

## Date: 2026-02-18

## Summary

Refonte complète de la navigation du site Mindzy inspirée d'aleo.agency : suppression des emojis, ajout d'un dropdown "Solutions" avec 4 services, création de 4 pages dédiées complètes.

## Navigation Structure

```
Solutions ▾  |  Portfolio  |  Pourquoi nous  |  Blog  |  FAQ      [FR ▾]  [Démarrer]
```

- Zero emojis in header/menu
- Language switcher keeps flag SVGs (not emojis)
- CTA "Démarrer" stays right-aligned

## Dropdown "Solutions"

- **Trigger:** Click to open (desktop + mobile), click outside to close
- **Desktop:** Panel positioned below "Solutions", 4 items in single column
- **Each item:** Lucide icon + bold title + gray subtitle
- **Mobile:** Accordion inside hamburger menu, tap expands items
- **Animation:** opacity 0→1, translateY -8→0, 200ms

### Items

| Title | Subtitle | Route | Icon |
|-------|----------|-------|------|
| Site web | Une vitrine digitale incontournable | /solutions/site-web | Globe |
| Solution sur mesure | Apps internes, mobile & agents IA | /solutions/sur-mesure | Wrench |
| Formations & Réseaux Sociaux | Boostez votre notoriété | /solutions/formations | GraduationCap |
| Logo & supports imprimés | Un univers à votre image | /solutions/branding | Palette |

## Page Template (each service page)

1. **Hero** — Title + subtitle + CTA + visual
2. **Features** — 3-4 cards (icon + title + description)
3. **Process** — 3 numbered steps
4. **Testimonial** — Relevant client quote
5. **Final CTA** — Call-to-action banner

## Routing

- `/[locale]/solutions/site-web`
- `/[locale]/solutions/sur-mesure`
- `/[locale]/solutions/formations`
- `/[locale]/solutions/branding`
- Old `/services` and `/formations` redirect to new routes

## Footer Update

Replace "Product" section with 4 new solution links.

## Decisions

- Label: "Solutions" (not "Nos Services")
- Routes: Grouped under /solutions/
- Content: Full pages (not placeholder)
- Dropdown: Click-based (not hover)
- Style: Clean, aleo-inspired, no emojis
