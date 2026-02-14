'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { copy } from '@/lib/copy'
import { faqItemsV2 } from '@/lib/faq-data'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

type FAQCat = 'all' | 'vision' | 'positionnement' | 'technique' | 'seo' | 'fonctionnalites' | 'autonomie' | 'accompagnement' | 'formation' | 'tarifs' | 'cas-specifiques' | 'decision' | 'confiance'

const categoryIcons: Record<FAQCat, string> = {
  all: '📋',
  vision: '💡',
  positionnement: '🎯',
  technique: '⚙️',
  seo: '🔍',
  fonctionnalites: '✨',
  autonomie: '🔑',
  accompagnement: '🤝',
  formation: '📚',
  tarifs: '💰',
  'cas-specifiques': '🧩',
  decision: '🧭',
  confiance: '🛡️',
}

export function FAQContent({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState<FAQCat>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const t = copy[locale].faq

  const cats: { value: FAQCat; label: string; icon: string }[] = Object.entries(t.allCategories).map(
    ([key, label]) => ({
      value: key as FAQCat,
      label,
      icon: categoryIcons[key as FAQCat] || '❓',
    })
  )

  const filtered = faqItemsV2.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category
    const matchesSearch = searchQuery === '' ||
      item.question[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer[locale].toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const ctaText = {
    fr: {
      stillQuestions: 'Vous avez encore des questions ?',
      contactUs: 'Notre équipe est disponible pour répondre à toutes vos questions. N\'hésitez pas à nous contacter.',
      scheduleCall: 'Échanger avec nous',
      contactPage: 'Voir les tarifs',
    },
    en: {
      stillQuestions: 'Still have questions?',
      contactUs: 'Our team is available to answer all your questions. Don\'t hesitate to contact us.',
      scheduleCall: 'Talk to us',
      contactPage: 'View pricing',
    },
    es: {
      stillQuestions: '¿Todavía tienes preguntas?',
      contactUs: 'Nuestro equipo está disponible para responder todas tus preguntas. No dudes en contactarnos.',
      scheduleCall: 'Hablar con nosotros',
      contactPage: 'Ver precios',
    },
  }

  const searchPlaceholder = {
    fr: 'Rechercher une question...',
    en: 'Search a question...',
    es: 'Buscar una pregunta...',
  }

  const noResults = {
    fr: 'Aucune question ne correspond à votre recherche.',
    en: 'No questions match your search.',
    es: 'Ninguna pregunta coincide con tu búsqueda.',
  }

  const questionsCount = {
    fr: `${filtered.length} question${filtered.length > 1 ? 's' : ''}`,
    en: `${filtered.length} question${filtered.length > 1 ? 's' : ''}`,
    es: `${filtered.length} pregunta${filtered.length > 1 ? 's' : ''}`,
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="violet" className="mb-4">FAQ</Badge>
          <h1 className="heading-1 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto text-gray-600">{t.subtitle}</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder[locale]}
              className="w-full px-5 py-4 pl-12 rounded-2xl border border-gray-200 bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-violet/50 focus:border-violet transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {cats.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => { setCategory(c.value); analytics.navigation.menuClick(`faq_filter_${c.value}`) }}
              className={cn(
                'px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                category === c.value
                  ? 'bg-violet text-white shadow-glow'
                  : 'bg-white text-gray-600 hover:bg-violet/5 hover:text-violet border border-gray-200'
              )}
            >
              <span>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-center text-sm text-gray-500 mb-6">
          {questionsCount[locale]}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {filtered.length > 0 ? (
            <Accordion type="single" defaultValue={filtered[0]?.id}>
              {filtered.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger value={item.id}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{categoryIcons[item.category as FAQCat] || '❓'}</span>
                      <span>{item.question[locale]}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent value={item.id}>
                    <p className="text-gray-600 leading-relaxed">{item.answer[locale]}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-500">{noResults[locale]}</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card variant="gradient" className="p-10 text-center max-w-2xl mx-auto">
            <h2 className="heading-3 text-anthracite mb-4">{ctaText[locale].stillQuestions}</h2>
            <p className="text-gray-600 mb-6">{ctaText[locale].contactUs}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/diagnostic`} onClick={() => analytics.cta.click('diagnostic_start', 'faq_cta')}>
                <Button variant="primary" size="lg">{ctaText[locale].scheduleCall}</Button>
              </Link>
              <Link href={`/${locale}/pricing`} onClick={() => analytics.cta.click('view_pricing', 'faq_cta')}>
                <Button variant="outline" size="lg">{ctaText[locale].contactPage}</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
