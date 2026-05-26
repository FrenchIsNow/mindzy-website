import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Blog — Insights on AI infrastructure, integration & governance',
    description: 'Articles on AI infrastructure, integration patterns, model orchestration, governance, and operational AI from the team at Mindzy.',
  },
  fr: {
    title: "Blog — Infrastructure IA, intégration et gouvernance",
    description: "Articles sur l'infrastructure IA, les patterns d'intégration, l'orchestration des modèles, la gouvernance et l'IA opérationnelle par l'équipe Mindzy.",
  },
  es: {
    title: 'Blog — Infraestructura IA, integración y gobernanza',
    description: 'Artículos sobre infraestructura IA, patrones de integración, orquestación de modelos, gobernanza e IA operacional del equipo de Mindzy.',
  },
  de: {
    title: 'Blog — Einblicke in KI-Infrastruktur, Integration & Governance',
    description: 'Artikel über KI-Infrastruktur, Integrationsmuster, Modell-Orchestrierung, Governance und operative KI vom Mindzy-Team.',
  },
  it: {
    title: "Blog — Infrastruttura IA, integrazione e governance",
    description: "Articoli su infrastruttura IA, pattern di integrazione, orchestrazione dei modelli, governance e IA operativa dal team di Mindzy.",
  },
  pt: {
    title: 'Blog — Infraestrutura IA, integração e governança',
    description: 'Artigos sobre infraestrutura IA, padrões de integração, orquestração de modelos, governança e IA operacional da equipa Mindzy.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/blog', title: t.title, description: t.description })
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
