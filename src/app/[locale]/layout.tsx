import { Outfit, Sora } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyCTA } from '@/components/layout/StickyCTA'
import { CookieConsent } from '@/components/CookieConsent'
import { ContactModalProvider } from '@/components/features/ContactFormModal'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { locales, type Locale } from '@/lib/i18n'
import { JsonLd, jsonLdOrganization, jsonLdWebsite, jsonLdLocalBusiness } from '@/lib/seo'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700'],
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()
  return (
    <html lang={locale} className={`${outfit.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-cream-50">
        <GoogleAnalytics />
        <ContactModalProvider locale={locale as Locale}>
          <JsonLd data={jsonLdOrganization()} />
          <JsonLd data={jsonLdWebsite()} />
          <JsonLd data={jsonLdLocalBusiness()} />
          <Header locale={locale as Locale} />
          <main className="min-h-screen">{children}</main>
          <Footer locale={locale as Locale} />
          <StickyCTA locale={locale as Locale} />
          <CookieConsent locale={locale as Locale} />
        </ContactModalProvider>
      </body>
    </html>
  )
}
