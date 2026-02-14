import type { Metadata } from 'next'
import { FAQContent } from './FAQContent'
import { getMessages } from '@/lib/getMessages'
import { faqItems } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdFaqPage, JsonLd } from '@/lib/seo'

const faqDescriptions: Record<string, string> = {
  fr: 'Réponses à toutes vos questions sur la création de site web avec Mindzy. Tarifs, délais, fonctionnalités, support technique et plus.',
  en: 'Answers to all your questions about website creation with Mindzy. Pricing, timelines, features, technical support and more.',
  es: 'Respuestas a todas tus preguntas sobre la creación de sitios web con Mindzy. Precios, plazos, funcionalidades, soporte técnico y más.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).faq
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/faq',
    title: t.title,
    description: faqDescriptions[locale] || faqDescriptions.fr,
  })
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqJsonLd = jsonLdFaqPage(
    faqItems.map(item => ({
      question: item.question[locale as Locale],
      answer: item.answer[locale as Locale],
    }))
  )
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FAQContent locale={locale as Locale} />
    </>
  )
}
