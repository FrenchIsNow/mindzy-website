# Services & Formations Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a `/services` page with digital solutions, AI agents, pricing table, branding, and formations preview sections; plus a dedicated `/formations` page with detailed training programs. Update navigation links from /pricing to /services.

**Architecture:** New route pages at `src/app/[locale]/services/page.tsx` and `src/app/[locale]/formations/page.tsx`. Each page composed of server-rendered section components. Copy strings follow `Record<Locale, string>` pattern inline in each component. Reuse existing UI primitives (Card, Button, Badge, Accordion).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, TypeScript

---

## Key References

- **UI Components:** `src/components/ui/Card.tsx` (Card, CardTitle, CardDescription, FeatureCard), `Button.tsx` (Button, ArrowIcon, CheckIcon), `Badge.tsx`, `Accordion.tsx` (Accordion, AccordionItem, AccordionTrigger, AccordionContent)
- **Layout:** `src/components/layout/Navigation.tsx` (nav links array at line 21-28), `Footer.tsx` (footer links at line 13-17)
- **Patterns:** `src/components/sections/Hero.tsx` (hero pattern), `UseCaseCards.tsx` (card grid pattern), `PricingTable.tsx` (pricing reuse), `CTASection.tsx` (CTA reuse)
- **Utils:** `cn()` from `src/lib/utils.ts`, `Locale` type from `src/lib/i18n.ts`, `buildPageMetadata` from `src/lib/seo.ts`
- **Messages:** `src/messages/fr.json`, `en.json`, `es.json` — nav.pricing key needs updating
- **Config:** `src/lib/config.ts` — `config.CALENDLY_URL` for booking CTAs

---

### Task 1: Create ServicesHero section component

**Files:**
- Create: `src/components/sections/ServicesHero.tsx`

**Step 1: Create the component**

```tsx
import { Badge } from '@/components/ui/Badge'
import type { Locale } from '@/lib/i18n'

const content: Record<string, { badge: string; title: string; titleHighlight: string; subtitle: string }> = {
  fr: {
    badge: 'Solutions digitales avancées',
    title: 'Développement de',
    titleHighlight: 'solutions digitales',
    subtitle: 'Pour les projets ambitieux nécessitant une architecture digitale avancée, scalable et orientée performance.',
  },
  en: {
    badge: 'Advanced digital solutions',
    title: 'Development of',
    titleHighlight: 'digital solutions',
    subtitle: 'For ambitious projects requiring advanced, scalable, performance-oriented digital architecture.',
  },
  es: {
    badge: 'Soluciones digitales avanzadas',
    title: 'Desarrollo de',
    titleHighlight: 'soluciones digitales',
    subtitle: 'Para proyectos ambiciosos que requieren una arquitectura digital avanzada, escalable y orientada al rendimiento.',
  },
}

export function ServicesHero({ locale }: { locale: Locale }) {
  const t = content[locale]

  return (
    <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-white" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-down mb-8">
            <Badge variant="gold" className="shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t.badge}
            </Badge>
          </div>

          <h1 className="heading-display text-anthracite mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t.title}{' '}
            <span className="text-gradient">{t.titleHighlight}</span>
          </h1>

          <p className="body-xl max-w-2xl mx-auto text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
```

**Step 2: Verify build**

Run: `npm run build` (or `npm run dev` and check no errors)

**Step 3: Commit**

```bash
git add src/components/sections/ServicesHero.tsx
git commit -m "feat: add ServicesHero section component"
```

---

### Task 2: Create DigitalSolutions section component

**Files:**
- Create: `src/components/sections/DigitalSolutions.tsx`

**Step 1: Create the component**

Server component with 6 solution cards in a grid + 4 pillars below. Uses Card and CheckIcon from existing UI. Solutions: apps web, apps mobiles, SaaS, marketplaces, dashboards, sites sur mesure. Pillars: UX, conversion, scalabilite, architecture. Copy in fr/en/es.

Each solution card: icon + title + short description. Each pillar: CheckIcon + label. Section intro: "Nous concevons des infrastructures digitales sur mesure adaptées à vos objectifs business."

Pattern to follow: see `UseCaseCards.tsx` for grid layout and card styling.

```tsx
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { CheckIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const sectionCopy: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  fr: {
    eyebrow: 'Solutions digitales',
    title: 'Développement de Solutions Digitales',
    subtitle: 'Nous concevons des infrastructures digitales sur mesure adaptées à vos objectifs business.',
  },
  en: {
    eyebrow: 'Digital solutions',
    title: 'Digital Solutions Development',
    subtitle: 'We design custom digital infrastructures tailored to your business objectives.',
  },
  es: {
    eyebrow: 'Soluciones digitales',
    title: 'Desarrollo de Soluciones Digitales',
    subtitle: 'Diseñamos infraestructuras digitales a medida adaptadas a sus objetivos de negocio.',
  },
}

const solutions = [
  {
    title: { fr: 'Applications web', en: 'Web applications', es: 'Aplicaciones web' },
    description: { fr: 'Applications performantes et évolutives sur mesure.', en: 'High-performance, scalable custom applications.', es: 'Aplicaciones de alto rendimiento y escalables a medida.' },
    gradient: 'from-violet-500 to-violet-600',
    iconBg: 'bg-violet-100',
    icon: (/* code icon */ <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>),
  },
  {
    title: { fr: 'Applications mobiles', en: 'Mobile applications', es: 'Aplicaciones móviles' },
    description: { fr: 'Apps iOS et Android natives ou cross-platform.', en: 'Native or cross-platform iOS and Android apps.', es: 'Apps iOS y Android nativas o multiplataforma.' },
    gradient: 'from-sage-500 to-sage-600',
    iconBg: 'bg-sage-100',
    icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>),
  },
  {
    title: { fr: 'Plateformes SaaS', en: 'SaaS platforms', es: 'Plataformas SaaS' },
    description: { fr: 'Solutions cloud multi-tenant scalables.', en: 'Scalable multi-tenant cloud solutions.', es: 'Soluciones cloud multi-tenant escalables.' },
    gradient: 'from-gold-dark to-gold',
    iconBg: 'bg-gold-light/50',
    icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>),
  },
  {
    title: { fr: 'Marketplaces', en: 'Marketplaces', es: 'Marketplaces' },
    description: { fr: 'Plateformes multi-vendeurs et écosystèmes.', en: 'Multi-vendor platforms and ecosystems.', es: 'Plataformas multi-vendedor y ecosistemas.' },
    gradient: 'from-rose-400 to-rose-500',
    iconBg: 'bg-rose-100',
    icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" /></svg>),
  },
  {
    title: { fr: 'Dashboards stratégiques', en: 'Strategic dashboards', es: 'Dashboards estratégicos' },
    description: { fr: 'Interfaces privées et outils de pilotage.', en: 'Private interfaces and management tools.', es: 'Interfaces privadas y herramientas de gestión.' },
    gradient: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-100',
    icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>),
  },
  {
    title: { fr: 'Sites web sur mesure', en: 'Custom websites', es: 'Sitios web a medida' },
    description: { fr: 'Corporate, premium, orientés conversion.', en: 'Corporate, premium, conversion-focused.', es: 'Corporate, premium, orientados a la conversión.' },
    gradient: 'from-amber-400 to-orange-500',
    iconBg: 'bg-amber-100',
    icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>),
  },
]

const pillars: Record<string, string[]> = {
  fr: ['Maximiser l\'expérience utilisateur', 'Optimiser la conversion', 'Assurer la scalabilité', 'Garantir une architecture technique robuste'],
  en: ['Maximize user experience', 'Optimize conversion', 'Ensure scalability', 'Guarantee robust technical architecture'],
  es: ['Maximizar la experiencia del usuario', 'Optimizar la conversión', 'Asegurar la escalabilidad', 'Garantizar una arquitectura técnica robusta'],
}

export function DigitalSolutions({ locale }: { locale: Locale }) {
  const t = sectionCopy[locale]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="container-wide relative">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((s, i) => (
            <Card key={i} variant="default" hover className={cn('group animate-fade-in-up')} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between mb-5">
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300', s.iconBg, 'text-gray-700 group-hover:scale-110')}>
                  {s.icon}
                </div>
              </div>
              <CardTitle className="mb-2">{s.title[locale]}</CardTitle>
              <CardDescription>{s.description[locale]}</CardDescription>
            </Card>
          ))}
        </div>

        {/* Pillars */}
        <div className="bg-gradient-to-br from-cream-50 via-white to-violet-50/30 rounded-2xl border border-gray-100 p-8 md:p-10">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            {locale === 'fr' ? 'Chaque solution est pensée pour' : locale === 'en' ? 'Every solution is designed to' : 'Cada solución está pensada para'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars[locale].map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-gray-100">
                <CheckIcon className="w-5 h-5 text-violet flex-shrink-0" />
                <span className="text-sm font-medium text-anthracite">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/DigitalSolutions.tsx
git commit -m "feat: add DigitalSolutions section component"
```

---

### Task 3: Create AIAgentsAutomation section component

**Files:**
- Create: `src/components/sections/AIAgentsAutomation.tsx`

**Step 1: Create the component**

Two-column layout. Left: AI Agents (5 items with CheckIcon). Right: Automation (5 items with CheckIcon). Section intro about intelligent systems. Uses Card component for each column.

AI Agents items (fr): Agents conversationnels internes, Agents d'analyse de données, Agents commerciaux automatisés, IA pour support client, Systèmes multi-agents spécialisés.

Automation items (fr): Systèmes complexes multi-outils, Architecture no-code/low-code/full-code, Orchestration d'API, Centralisation et structuration de la data, Automatisation complète des workflows.

All translated to en/es.

```tsx
import { Card, CardTitle } from '@/components/ui/Card'
import { CheckIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

// Copy and agent/automation items defined inline with Record<string, ...> pattern
// Follow the same structure as DigitalSolutions
```

Full implementation: server component, no "use client". Two Card columns side by side on desktop, stacked on mobile. Each card has a colored icon header, title, and a list of CheckIcon + label items.

**Step 2: Commit**

```bash
git add src/components/sections/AIAgentsAutomation.tsx
git commit -m "feat: add AIAgentsAutomation section component"
```

---

### Task 4: Create BrandingContent section component

**Files:**
- Create: `src/components/sections/BrandingContent.tsx`

**Step 1: Create the component**

Section with branding services list. Items: Positionnement stratégique, Identité visuelle, Direction artistique, Stratégie éditoriale, Création de contenu digital, Personal branding, Contenu orienté autorité & conversion. Closing statement: "Nous ne créons pas du contenu pour poster. Nous construisons des actifs stratégiques..."

Uses CheckIcon items in a 2-column list inside a gradient Card. All copy in fr/en/es.

**Step 2: Commit**

```bash
git add src/components/sections/BrandingContent.tsx
git commit -m "feat: add BrandingContent section component"
```

---

### Task 5: Create FormationsPreview section component

**Files:**
- Create: `src/components/sections/FormationsPreview.tsx`

**Step 1: Create the component**

4 summary cards linking to `/formations`:
1. LinkedIn (3 packs, from 190€)
2. Meta & TikTok (4 offres, from 190€)
3. Intelligence Artificielle (8h, 690€)
4. Formation Sur Mesure (sur devis)

Each card: icon, title, short description, price indicator, CTA button linking to `/${locale}/formations`. Uses Card with hover, gradient accents. TrackedLink for analytics.

**Step 2: Commit**

```bash
git add src/components/sections/FormationsPreview.tsx
git commit -m "feat: add FormationsPreview section component"
```

---

### Task 6: Create /services page route

**Files:**
- Create: `src/app/[locale]/services/page.tsx`

**Step 1: Create the page**

Compose all sections:

```tsx
import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/ServicesHero'
import { DigitalSolutions } from '@/components/sections/DigitalSolutions'
import { AIAgentsAutomation } from '@/components/sections/AIAgentsAutomation'
import { PricingTable } from '@/components/sections/PricingTable'
import { BrandingContent } from '@/components/sections/BrandingContent'
import { FormationsPreview } from '@/components/sections/FormationsPreview'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const meta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Services - Solutions digitales, IA & Formations',
    description: 'Découvrez nos services : développement digital, agents IA, automatisation, branding, création de contenu et formations stratégiques.',
  },
  en: {
    title: 'Mindzy | Services - Digital Solutions, AI & Training',
    description: 'Discover our services: digital development, AI agents, automation, branding, content creation and strategic training.',
  },
  es: {
    title: 'Mindzy | Servicios - Soluciones digitales, IA y Formación',
    description: 'Descubra nuestros servicios: desarrollo digital, agentes IA, automatización, branding, creación de contenido y formaciones estratégicas.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = meta[locale] || meta.fr
  return buildPageMetadata({ locale: locale as Locale, path: '/services', title: t.title, description: t.description })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <ServicesHero locale={locale as Locale} />
      <DigitalSolutions locale={locale as Locale} />
      <AIAgentsAutomation locale={locale as Locale} />
      <PricingTable locale={locale as Locale} />
      <BrandingContent locale={locale as Locale} />
      <FormationsPreview locale={locale as Locale} />
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
```

**Step 2: Test locally**

Run: `npm run dev` — navigate to `http://localhost:3000/fr/services`
Expected: All sections render without errors.

**Step 3: Commit**

```bash
git add src/app/[locale]/services/page.tsx
git commit -m "feat: add /services page route"
```

---

### Task 7: Create FormationsHero section component

**Files:**
- Create: `src/components/sections/FormationsHero.tsx`

**Step 1: Create the component**

Similar to ServicesHero but with formations-specific copy: "Des formations stratégiques conçues pour transformer l'acquisition, la performance marketing et l'intégration de l'intelligence artificielle en véritables leviers business."

Badge: "Formations Mindzy". Same gradient background pattern as ServicesHero.

**Step 2: Commit**

```bash
git add src/components/sections/FormationsHero.tsx
git commit -m "feat: add FormationsHero section component"
```

---

### Task 8: Create LinkedInFormation section component

**Files:**
- Create: `src/components/sections/LinkedInFormation.tsx`

**Step 1: Create the component**

`"use client"` — uses Accordion for expandable pack details.

3 packs displayed as cards:
- **Pack 1 - Fondations LinkedIn** (3h, 190€): profile optimization, positioning, content method
- **Pack 2 - Acquisition & Prospection** (4h, 290€): prospection methodology, Sales Navigator, pipeline
- **Pack 3 - LinkedIn Acquisition Mastery** (8h, 490€): Pack 1+2 + content strategy, 60-day plan, automation, KPIs

Each card shows: pack name, duration, price, CTA button. Accordion expands to show full programme details.

Import `Accordion, AccordionItem, AccordionTrigger, AccordionContent` from `@/components/ui/Accordion`.

All copy in fr/en/es.

**Step 2: Commit**

```bash
git add src/components/sections/LinkedInFormation.tsx
git commit -m "feat: add LinkedInFormation section component"
```

---

### Task 9: Create MetaTikTokFormation section component

**Files:**
- Create: `src/components/sections/MetaTikTokFormation.tsx`

**Step 1: Create the component**

`"use client"` — uses Accordion.

4 offers:
- **Offre 1 - Lancer sa Présence** (3h, 190€)
- **Offre 2 - Campagnes Rentables** (4h, 340€)
- **Offre 3 - Système d'Acquisition Complet** (8h, 590€)
- **Offre 4 - Machine à Leads Automatisée** (12h, 890€)

Same card+accordion pattern as LinkedInFormation. All copy in fr/en/es.

**Step 2: Commit**

```bash
git add src/components/sections/MetaTikTokFormation.tsx
git commit -m "feat: add MetaTikTokFormation section component"
```

---

### Task 10: Create AIFormation section component

**Files:**
- Create: `src/components/sections/AIFormation.tsx`

**Step 1: Create the component**

Single formation block (690€, 8h, 4 sessions). No accordion needed — display all 4 sessions as a vertical timeline or cards:
- Session 1: Diagnostic & Opportunités Stratégiques
- Session 2: Conception de l'Architecture IA
- Session 3: Implémentation Opérationnelle
- Session 4: Optimisation & Industrialisation

Each session shows: title, 3-4 bullet points, "Objectif atteint" result. Price and CTA at the bottom.

Server component. All copy in fr/en/es.

**Step 2: Commit**

```bash
git add src/components/sections/AIFormation.tsx
git commit -m "feat: add AIFormation section component"
```

---

### Task 11: Create CustomFormation section component

**Files:**
- Create: `src/components/sections/CustomFormation.tsx`

**Step 1: Create the component**

"Formation Sur Mesure" section. Uses Card variant="gradient". Content: description of custom training for enterprises, methodology (diagnostic, audit, programme, formation, suivi), examples list. CTA button linking to Calendly or contact.

Server component. All copy in fr/en/es.

**Step 2: Commit**

```bash
git add src/components/sections/CustomFormation.tsx
git commit -m "feat: add CustomFormation section component"
```

---

### Task 12: Create /formations page route

**Files:**
- Create: `src/app/[locale]/formations/page.tsx`

**Step 1: Create the page**

```tsx
import type { Metadata } from 'next'
import { FormationsHero } from '@/components/sections/FormationsHero'
import { LinkedInFormation } from '@/components/sections/LinkedInFormation'
import { MetaTikTokFormation } from '@/components/sections/MetaTikTokFormation'
import { AIFormation } from '@/components/sections/AIFormation'
import { CustomFormation } from '@/components/sections/CustomFormation'
import { CTASection } from '@/components/sections/CTASection'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const meta: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Mindzy | Formations - Réseaux sociaux, IA & Marketing digital',
    description: 'Formations stratégiques LinkedIn, Meta, TikTok, IA et marketing digital. De 190€ à 890€. Résultats concrets et applicables immédiatement.',
  },
  en: {
    title: 'Mindzy | Training - Social Media, AI & Digital Marketing',
    description: 'Strategic training for LinkedIn, Meta, TikTok, AI and digital marketing. From €190 to €890. Concrete, immediately applicable results.',
  },
  es: {
    title: 'Mindzy | Formación - Redes sociales, IA y Marketing digital',
    description: 'Formaciones estratégicas LinkedIn, Meta, TikTok, IA y marketing digital. De 190€ a 890€. Resultados concretos e inmediatamente aplicables.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = meta[locale] || meta.fr
  return buildPageMetadata({ locale: locale as Locale, path: '/formations', title: t.title, description: t.description })
}

export default async function FormationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <FormationsHero locale={locale as Locale} />
      <LinkedInFormation locale={locale as Locale} />
      <MetaTikTokFormation locale={locale as Locale} />
      <AIFormation locale={locale as Locale} />
      <CustomFormation locale={locale as Locale} />
      <CTASection locale={locale as Locale} variant="gradient" />
    </>
  )
}
```

**Step 2: Test locally**

Run: `npm run dev` — navigate to `http://localhost:3000/fr/formations`
Expected: All formation sections render correctly.

**Step 3: Commit**

```bash
git add src/app/[locale]/formations/page.tsx
git commit -m "feat: add /formations page route"
```

---

### Task 13: Update navigation links (pricing → services)

**Files:**
- Modify: `src/components/layout/Navigation.tsx:24` — change `/pricing` to `/services`
- Modify: `src/components/layout/Footer.tsx:14` — change `/pricing` link to `/services`
- Modify: `src/messages/fr.json` — change `nav.pricing` value to `"Services"`
- Modify: `src/messages/en.json` — change `nav.pricing` value to `"Services"`
- Modify: `src/messages/es.json` — change `nav.pricing` value to `"Servicios"`
- Modify: `src/messages/fr.json` — change `footer.links.pricing` to `"Services"`
- Modify: `src/messages/en.json` — change `footer.links.pricing` to `"Services"`
- Modify: `src/messages/es.json` — change `footer.links.pricing` to `"Servicios"`

**Step 1: Update Navigation.tsx**

Change line 24: `{ href: \`/${locale}/pricing\`, label: t.pricing },` → `{ href: \`/${locale}/services\`, label: t.pricing },`

Note: The key name `t.pricing` stays the same in code (it's just the JSON key), but the JSON value changes to "Services".

**Step 2: Update Footer.tsx**

Change line 14: `{ href: \`/${locale}/pricing\`, label: t.links.pricing },` → `{ href: \`/${locale}/services\`, label: t.links.pricing },`

**Step 3: Update message JSON files**

In all 3 locale files, change the nav.pricing and footer.links.pricing values.

**Step 4: Update CTASection.tsx**

Change the secondary CTA links from `/${locale}/pricing` to `/${locale}/services` (lines 60, 115, 159 approximately). Change label text:
- fr: "Voir les tarifs" → "Nos services"
- en: "View pricing" → "Our services"
- es: "Ver precios" → "Nuestros servicios"

**Step 5: Test navigation**

Run: `npm run dev` — click Services in nav, verify it goes to /services page.

**Step 6: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/Footer.tsx src/components/sections/CTASection.tsx src/messages/fr.json src/messages/en.json src/messages/es.json
git commit -m "feat: update navigation links from pricing to services"
```

---

### Task 14: Final build verification

**Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors.

**Step 3: Manual verification**

- Navigate `/fr/services` — all 7 sections render
- Navigate `/fr/formations` — all 6 sections render
- Test nav links in header and footer
- Test responsive layout on mobile viewport
- Test all 3 locales (fr, en, es)

**Step 4: Final commit if any fixes needed**
