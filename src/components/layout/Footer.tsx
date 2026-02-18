'use client'

import Link from 'next/link'
import { getMessages } from '@/lib/getMessages'
import { config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { analytics } from '@/lib/analytics'

export function Footer({ locale }: { locale: Locale }) {
  const t = getMessages(locale).footer

  const links = {
    solutions: [
      { href: `/${locale}/solutions/site-web`, label: (t.links as any).siteWeb },
      { href: `/${locale}/solutions/sur-mesure`, label: (t.links as any).surMesure },
      { href: `/${locale}/solutions/formations`, label: (t.links as any).formations },
      { href: `/${locale}/solutions/branding`, label: (t.links as any).branding },
    ],
    resources: [
      { href: `/${locale}/portfolio`, label: t.links.portfolio },
      { href: `/${locale}/blog`, label: t.links.blog },
      { href: `/${locale}/faq`, label: t.links.faq },
    ],
    company: [
      { href: `/${locale}/pourquoi-nous`, label: (t.links as any).whyUs },
      { href: `/${locale}/avis-clients`, label: (t.links as any).reviews },
    ],
    legal: [
      { href: `/${locale}/legal/cgu`, label: t.links.cgu },
      { href: `/${locale}/legal/cgv`, label: t.links.cgv },
      { href: `/${locale}/legal/mentions`, label: t.links.mentions },
    ],
  }

  return (
    <footer className="bg-anthracite text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />

      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent" />

      <div className="container-wide relative">
        {/* Main footer content */}
        <div className="section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="col-span-2">
              <Link href={`/${locale}`} className="inline-block group">
                <span className="font-display text-3xl font-semibold tracking-tight">Mindzy</span>
                <span className="block w-0 h-0.5 bg-gradient-to-r from-violet to-violet-400 transition-all duration-300 group-hover:w-full mt-1" />
              </Link>
              <p className="mt-6 text-gray-400 leading-relaxed max-w-xs">
                {t.description}
              </p>

              {/* Contact email */}
              <a
                href={`mailto:${config.CONTACT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors group"
                onClick={() => analytics.footer.emailClick()}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="group-hover:underline">{config.CONTACT_EMAIL}</span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href={config.WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  aria-label="WhatsApp"
                  onClick={() => { analytics.footer.socialClick('whatsapp'); analytics.whatsapp.click('footer') }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href={config.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  aria-label="LinkedIn"
                  onClick={() => analytics.footer.socialClick('linkedin')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links columns */}
            {(['solutions', 'resources', 'company', 'legal'] as const).map((key) => (
              <div key={key}>
                <h4 className="font-semibold text-white mb-5">{t.sections[key]}</h4>
                <ul className="space-y-3">
                  {links[key].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors inline-block"
                        onClick={() => analytics.footer.linkClick(key, link.label)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Mindzy. {t.copyright}
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <svg className="w-4 h-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                SSL Secure
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                RGPD Compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
