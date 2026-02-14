import type { Metadata } from 'next'
import { RessourcesContent } from './RessourcesContent'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const resourceDescriptions: Record<string, string> = {
  fr: 'Téléchargez gratuitement nos guides SEO, checklists de lancement et templates pour créer votre présence en ligne professionnelle.',
  en: 'Download our free SEO guides, launch checklists and templates to create your professional online presence.',
  es: 'Descarga gratis nuestras guías SEO, checklists de lanzamiento y plantillas para crear tu presencia profesional en línea.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).resources
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/ressources',
    title: t.title,
    description: resourceDescriptions[locale] || resourceDescriptions.fr,
  })
}

export default async function RessourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <RessourcesContent locale={locale as Locale} />
}
