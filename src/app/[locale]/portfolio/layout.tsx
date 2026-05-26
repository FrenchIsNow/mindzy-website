import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Portfolio — Selected projects created by Mindzy',
    description: 'Selected websites, platforms, and digital systems delivered by Mindzy across legal, wellness, commerce, sport, investment, and creative verticals.',
  },
  fr: {
    title: 'Portfolio — Projets créés par Mindzy',
    description: "Sites web, plateformes et systèmes digitaux livrés par Mindzy dans les domaines juridique, bien-être, commerce, sport, investissement et création.",
  },
  es: {
    title: 'Portafolio — Proyectos creados por Mindzy',
    description: 'Sitios web, plataformas y sistemas digitales entregados por Mindzy en los sectores legal, bienestar, comercio, deporte, inversión y creativo.',
  },
  de: {
    title: 'Portfolio — Ausgewählte Mindzy-Projekte',
    description: 'Websites, Plattformen und digitale Systeme, die Mindzy in den Bereichen Recht, Wellness, Handel, Sport, Investment und Kreation geliefert hat.',
  },
  it: {
    title: 'Portfolio — Progetti selezionati realizzati da Mindzy',
    description: 'Siti web, piattaforme e sistemi digitali realizzati da Mindzy nei settori legale, benessere, commercio, sport, investimento e creativo.',
  },
  pt: {
    title: 'Portefólio — Projetos selecionados criados pela Mindzy',
    description: 'Sites, plataformas e sistemas digitais entregues pela Mindzy nos setores jurídico, bem-estar, comércio, desporto, investimento e criativo.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/portfolio', title: t.title, description: t.description })
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
