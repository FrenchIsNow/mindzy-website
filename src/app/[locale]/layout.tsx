import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { Chatbot } from '@/components/Chatbot'
import { locales, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()
  return (
    <>
      <Header locale={locale as Locale} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale as Locale} />
      <StickyCTA locale={locale as Locale} />
      <Chatbot locale={locale as Locale} />
    </>
  )
}
