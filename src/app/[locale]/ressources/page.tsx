import type { Metadata } from 'next'
import { RessourcesContent } from './RessourcesContent'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].resources
  return { title: t.title, description: t.subtitle }
}

export default async function RessourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <RessourcesContent locale={locale as Locale} />
}
