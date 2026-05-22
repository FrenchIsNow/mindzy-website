import { Outfit, Sora, Instrument_Serif, Instrument_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NavbarAI } from '@/components/layout/NavbarAI'
import { FooterAI } from '@/components/layout/FooterAI'
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
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()
  return (
    <html lang={locale} className={`${outfit.variable} ${sora.variable} ${instrumentSerif.variable} ${instrumentSans.variable}`} suppressHydrationWarning>
      <body className="antialiased" style={{ fontFamily: 'var(--font-instrument-sans), var(--font-sora), system-ui, sans-serif', background: 'var(--ai-bg)', color: 'var(--ai-fg)' }}>
        <GoogleAnalytics />
        <ContactModalProvider locale={locale as Locale}>
          <JsonLd data={jsonLdOrganization()} />
          <JsonLd data={jsonLdWebsite()} />
          <JsonLd data={jsonLdLocalBusiness(locale)} />
          <NavbarAI />
          <main className="min-h-screen">{children}</main>
          <FooterAI />
          <StickyCTA locale={locale as Locale} />
          <CookieConsent locale={locale as Locale} />
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
