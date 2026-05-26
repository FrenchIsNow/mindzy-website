import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'About Mindzy — The team building custom AI infrastructure',
    description: 'Meet Mindzy, the AI infrastructure firm. We design custom AI systems for companies of all sizes — with structure, validation, and human control at every step.',
  },
  fr: {
    title: "À propos — L'équipe qui construit votre infrastructure IA",
    description: "Découvrez Mindzy, l'équipe qui conçoit des infrastructures IA sur mesure pour les entreprises — avec structure, validation et contrôle humain à chaque étape.",
  },
  es: {
    title: 'Acerca de Mindzy — El equipo que construye infraestructura IA',
    description: 'Conoce a Mindzy, el equipo que diseña infraestructura IA personalizada para empresas — con estructura, validación y control humano en cada paso.',
  },
  de: {
    title: 'Über Mindzy — Das Team hinter Ihrer KI-Infrastruktur',
    description: 'Lernen Sie Mindzy kennen, das Team, das maßgeschneiderte KI-Infrastruktur für Unternehmen entwirft — mit Struktur, Validierung und menschlicher Kontrolle in jedem Schritt.',
  },
  it: {
    title: 'Chi siamo — Il team che costruisce la tua infrastruttura IA',
    description: 'Scopri Mindzy, il team che progetta infrastrutture IA personalizzate per le aziende — con struttura, validazione e controllo umano in ogni fase.',
  },
  pt: {
    title: 'Sobre a Mindzy — A equipa por trás da sua infraestrutura IA',
    description: 'Conheça a Mindzy, a equipa que projeta infraestrutura IA personalizada para empresas — com estrutura, validação e controlo humano em cada passo.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/about', title: t.title, description: t.description })
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
