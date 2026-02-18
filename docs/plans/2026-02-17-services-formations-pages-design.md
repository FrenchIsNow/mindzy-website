# Services & Formations Pages Design

**Date**: 2026-02-17
**Status**: Approved

## Overview

Replace the pricing concept with a comprehensive services page at `/services` and a dedicated formations page at `/formations`. Keep the existing PricingTable component for website plans.

## Pages

### `/services` (src/app/[locale]/services/page.tsx)

**Sections in order:**

1. **ServicesHero** — "Pour les projets ambitieux..." intro with gradient background, badge
2. **DigitalSolutions** — Grid of 6 service cards (apps web, mobiles, SaaS, marketplaces, dashboards, sites sur mesure) + 4 pillars (UX, conversion, scalabilite, architecture)
3. **AIAgentsAutomation** — Two-column layout: AI Agents (5 items) | Automation (5 items)
4. **PricingTable** (existing) — Website pricing plans, reused as-is
5. **BrandingContent** — Branding & content creation services with strategic positioning
6. **FormationsPreview** — 4 summary cards (LinkedIn, Meta/TikTok, IA, Sur mesure) with CTA to /formations
7. **CTASection** (existing) — gradient variant

### `/formations` (src/app/[locale]/formations/page.tsx)

**Sections in order:**

1. **FormationsHero** — "Des formations strategiques..." intro
2. **LinkedInFormation** — 3 packs (Fondations 190€, Acquisition 290€, Mastery 490€) with expandable details
3. **MetaTikTokFormation** — 4 offers (190€, 340€, 590€, 890€) with expandable details
4. **AIFormation** — 4 sessions detail (690€ total)
5. **CustomFormation** — "Sur mesure" section with devis CTA
6. **CTASection** (existing)

## Technical Approach

- Server components by default
- Copy inline with `Record<Locale, string>` pattern (fr/en/es)
- Reuse existing UI components (Card, Button, Badge, Accordion)
- Update navigation links from /pricing to /services
- New section components in `src/components/sections/`

## New Components

- `src/components/sections/ServicesHero.tsx`
- `src/components/sections/DigitalSolutions.tsx`
- `src/components/sections/AIAgentsAutomation.tsx`
- `src/components/sections/BrandingContent.tsx`
- `src/components/sections/FormationsPreview.tsx`
- `src/components/sections/FormationsHero.tsx`
- `src/components/sections/LinkedInFormation.tsx`
- `src/components/sections/MetaTikTokFormation.tsx`
- `src/components/sections/AIFormation.tsx`
- `src/components/sections/CustomFormation.tsx`

## Navigation Updates

- Update Header nav links: /pricing → /services
- Update CTASection secondary CTA: "Voir les tarifs" → "Voir nos services" pointing to /services
- Add /formations link where relevant
