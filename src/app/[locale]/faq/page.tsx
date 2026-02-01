import type { Metadata } from 'next'
import { FAQContent } from './FAQContent'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].faq
  return { title: t.title, description: t.subtitle }
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <FAQContent locale={locale as Locale} />
}
