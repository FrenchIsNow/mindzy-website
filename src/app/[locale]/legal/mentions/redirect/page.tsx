import { Suspense } from 'react'
import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { RedirectContent } from './RedirectContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<Locale, string> = {
    fr: 'Mentions légales — Site géré par Mindzy',
    en: 'Legal Notice — Website managed by Mindzy',
    es: 'Aviso legal — Sitio gestionado por Mindzy',
  }
  const descriptions: Record<Locale, string> = {
    fr: 'Mindzy prend en charge les obligations légales et la protection des sites web qu\'elle conçoit et héberge pour ses clients.',
    en: 'Mindzy handles the legal obligations and protection of the websites it designs and hosts for its clients.',
    es: 'Mindzy se encarga de las obligaciones legales y la protección de los sitios web que diseña y aloja para sus clientes.',
  }
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/legal/mentions/redirect',
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],
    noIndex: true,
  })
}

export default async function MentionsRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <Suspense>
      <RedirectContent locale={locale as Locale} />
    </Suspense>
  )
}
