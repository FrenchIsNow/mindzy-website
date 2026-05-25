import type { Metadata } from 'next'
import { Outfit, Sora, Instrument_Serif, Instrument_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NavbarAI } from '@/components/layout/NavbarAI'
import { FooterAI } from '@/components/layout/FooterAI'
import { CookieConsent } from '@/components/CookieConsent'
import { ContactModalProvider } from '@/components/features/ContactFormModal'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { routerLocales, toLocale, type Locale } from '@/lib/i18n'
import { JsonLd, jsonLdOrganization, jsonLdWebsite, jsonLdLocalBusiness } from '@/lib/seo'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mindzy.me'),
  title: { default: 'Mindzy — The custom AI infrastructure built around your company', template: '%s | Mindzy' },
  description: 'Mindzy designs and builds AI infrastructures from scratch, inside any company that wants to integrate AI into its operations.',
  authors: [{ name: 'Mindzy', url: 'https://mindzy.me' }],
  creator: 'Mindzy',
  publisher: 'Mindzy',
  formatDetection: { email: false, telephone: false },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES'],
    url: 'https://mindzy.me',
    siteName: 'Mindzy',
    title: 'Mindzy — Custom AI infrastructure',
    description: 'AI infrastructures designed and built from scratch, around your tools, workflows, and governance rules.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mindzy — Custom AI infrastructure',
    description: 'AI infrastructures designed and built from scratch.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

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

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
  weight: ['400', '500', '600', '700'],
})

export async function generateStaticParams() {
  return routerLocales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!routerLocales.includes(locale as (typeof routerLocales)[number])) notFound()
  const translationLocale: Locale = toLocale(locale as (typeof routerLocales)[number])
  return (
    <html lang={locale} className={`${outfit.variable} ${sora.variable} ${instrumentSerif.variable} ${instrumentSans.variable}`} suppressHydrationWarning>
      <body className="antialiased" style={{ fontFamily: 'var(--font-instrument-sans), var(--font-sora), system-ui, sans-serif', background: 'var(--ai-bg)', color: 'var(--ai-fg)' }}>
        <GoogleAnalytics />
        <ContactModalProvider locale={translationLocale}>
          <JsonLd data={jsonLdOrganization()} />
          <JsonLd data={jsonLdWebsite()} />
          <JsonLd data={jsonLdLocalBusiness(translationLocale)} />
          <NavbarAI />
          <main className="min-h-screen">{children}</main>
          <FooterAI />
          <CookieConsent locale={translationLocale} />
        </ContactModalProvider>
        {/* Global scroll-reveal script — mirrors static site's global.js setupFades() */}
        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.12});
  function setup(){
    document.querySelectorAll('.ai-fade-in').forEach(function(el){io.observe(el);});
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',setup);
  } else {
    setup();
  }
})();
`}} />
      </body>
    </html>
  )
}
