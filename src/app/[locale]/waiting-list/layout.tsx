import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Join the AI Employee waiting list | Mindzy',
    description: "Be among the first companies to access Mindzy's AI Employee platform. Reserve early access to the custom AI workforce designed around your business.",
  },
  fr: {
    title: "Liste d'attente AI Employee | Mindzy",
    description: "Soyez parmi les premières entreprises à accéder à la plateforme AI Employee de Mindzy. Réservez votre accès anticipé à la force de travail IA sur mesure.",
  },
  es: {
    title: 'Lista de espera AI Employee | Mindzy',
    description: 'Sé de las primeras empresas en acceder a la plataforma AI Employee de Mindzy. Reserva acceso anticipado a la fuerza de trabajo IA personalizada.',
  },
  de: {
    title: 'Warteliste AI Employee | Mindzy',
    description: 'Seien Sie eines der ersten Unternehmen, das Zugang zur AI-Employee-Plattform von Mindzy erhält. Sichern Sie sich frühzeitigen Zugang zur maßgeschneiderten KI-Belegschaft.',
  },
  it: {
    title: "Lista d'attesa AI Employee | Mindzy",
    description: "Sii tra le prime aziende ad accedere alla piattaforma AI Employee di Mindzy. Riserva l'accesso anticipato alla forza lavoro IA personalizzata.",
  },
  pt: {
    title: 'Lista de espera AI Employee | Mindzy',
    description: 'Esteja entre as primeiras empresas a aceder à plataforma AI Employee da Mindzy. Reserve acesso antecipado à força de trabalho IA personalizada.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/waiting-list', title: t.title, description: t.description })
}

export default function WaitingListLayout({ children }: { children: React.ReactNode }) {
  return children
}
