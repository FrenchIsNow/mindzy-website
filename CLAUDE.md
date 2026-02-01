# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mindzy is a Next.js 16 + React 19 multilingual SaaS marketing website for a service that creates premium websites for therapists and wellness practitioners. Supports French (default), English, and Spanish.

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Architecture

### Locale-Based Routing
- Middleware (`src/middleware.ts`) detects locale from `Accept-Language` header and routes to `/[locale]/...`
- All routes are under `src/app/[locale]/`
- Content uses `Record<Locale, string>` pattern for translations
- Copy strings in `src/lib/copy.ts`, locale config in `src/lib/i18n.ts`

### Component Organization
```
src/components/
├── ui/         # Atomic components (Button, Card, Badge, Input, Accordion)
├── layout/     # Header, Footer, Navigation, LanguageSwitcher, StickyCTA
├── sections/   # Full-width page sections (Hero, Testimonials, PricingTable)
├── features/   # Interactive components (DiagnosticQuiz, OnboardingWizard, BeforeAfterSlider)
└── Chatbot.tsx # AI chatbot (client component)
```

### Centralized Configuration
`src/lib/config.ts` contains all business data:
- Pricing plans (4 tiers)
- Portfolio items (40+)
- Blog posts, FAQ items, testimonials
- Diagnostic quiz questions with scoring
- Onboarding wizard steps

### API Routes
- `/api/whatsapp/send` - POST endpoint for WhatsApp messages
- `/api/whatsapp/webhook` - Webhook handler for incoming messages

### Type Definitions
All data models in `src/lib/types.ts`: Plan, PortfolioItem, Testimonial, BlogPost, FAQItem, DiagnosticQuestion, OnboardingStep, ChatMessage/ChatState, etc.

## Styling

- Tailwind CSS with custom color palette (anthracite, violet shades)
- Global CSS in `src/app/globals.css` with custom utilities: `.container-narrow`, `.container-wide`, `.section-padding`, `.heading-*`
- Use `cn()` from `src/lib/utils.ts` for dynamic class composition (clsx + tailwind-merge)

## Key Patterns

- **Server components by default**, `"use client"` only for interactive components
- **Path alias**: `@/*` maps to `./src/*`
- **i18n**: All user-facing strings must support fr/en/es locales
- **Button variants**: primary, secondary, ghost, outline (polymorphic component)

## Environment Variables

Required for WhatsApp integration:
```
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_VERIFY_TOKEN
WHATSAPP_API_VERSION=v18.0
NEXT_PUBLIC_SITE_URL=https://mindzy.me
```
