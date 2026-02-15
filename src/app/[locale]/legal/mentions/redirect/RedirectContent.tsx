'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

const copy: Record<Locale, {
  badge: string
  title: string
  subtitle: (site: string | null) => string
  intro: string
  sections: {
    title: string
    description: string
    icon: 'shield' | 'server' | 'lock' | 'scale'
  }[]
  editorTitle: string
  editorLines: string[]
  hostTitle: string
  hostLines: string[]
  contactTitle: string
  contactDescription: string
  contactEmail: string
  backLabel: string
  mindzyLabel: string
}> = {
  fr: {
    badge: 'Mentions légales',
    title: 'Ce site est conçu et géré par Mindzy',
    subtitle: (site) =>
      site
        ? `Les mentions légales du site ${site} sont prises en charge par Mindzy dans le cadre de la conception, de l'hébergement et de la maintenance du site.`
        : 'Les mentions légales de ce site sont prises en charge par Mindzy dans le cadre de la conception, de l\'hébergement et de la maintenance du site.',
    intro: 'Mindzy assure pour le compte de ses clients la conformité légale, la sécurité technique et la protection des données des sites qu\'elle conçoit.',
    sections: [
      {
        title: 'Protection & sécurité',
        description: 'Chaque site bénéficie d\'un certificat SSL, d\'une protection contre les attaques courantes et de mises à jour de sécurité régulières.',
        icon: 'shield',
      },
      {
        title: 'Hébergement européen',
        description: 'Les sites sont hébergés sur des serveurs situés en Europe (Vercel & Hostinger), garantissant une conformité avec les réglementations européennes.',
        icon: 'server',
      },
      {
        title: 'Conformité RGPD',
        description: 'Le traitement et le stockage des données personnelles respectent le Règlement Général sur la Protection des Données (RGPD).',
        icon: 'lock',
      },
      {
        title: 'Cadre juridique',
        description: 'Mindzy s\'assure que chaque site respecte les obligations légales en vigueur : mentions légales, politique de cookies, conditions d\'utilisation.',
        icon: 'scale',
      },
    ],
    editorTitle: 'Éditeur & prestataire technique',
    editorLines: [
      'Dénomination sociale : UIVAZI OÜ (opérant sous la marque Mindzy)',
      'Forme juridique : Osaühing (société à responsabilité limitée de droit estonien)',
      'Numéro d\'immatriculation : 17358237',
      'Siège social : Ruunaoja tn 3, Lasmäe linnaosa, Tallinn, Harju maakond, 11415, Estonie',
    ],
    hostTitle: 'Hébergement',
    hostLines: [
      'Infrastructure principale : Vercel Inc. — Région Europe (Paris, France)',
      'Infrastructure complémentaire : Hostinger International Ltd. — Serveurs Union européenne',
    ],
    contactTitle: 'Une question ?',
    contactDescription: 'Pour toute demande relative aux mentions légales, à la protection des données ou à la sécurité de ce site, vous pouvez nous contacter.',
    contactEmail: 'contact@mindzy.me',
    backLabel: 'Voir les mentions légales complètes de Mindzy',
    mindzyLabel: 'Découvrir Mindzy',
  },
  en: {
    badge: 'Legal Notice',
    title: 'This website is designed and managed by Mindzy',
    subtitle: (site) =>
      site
        ? `The legal notice for ${site} is handled by Mindzy as part of the design, hosting, and maintenance of the website.`
        : 'The legal notice for this website is handled by Mindzy as part of the design, hosting, and maintenance of the website.',
    intro: 'Mindzy ensures legal compliance, technical security, and data protection on behalf of its clients for the websites it designs.',
    sections: [
      {
        title: 'Protection & Security',
        description: 'Each website benefits from an SSL certificate, protection against common attacks, and regular security updates.',
        icon: 'shield',
      },
      {
        title: 'European Hosting',
        description: 'Websites are hosted on servers located in Europe (Vercel & Hostinger), ensuring compliance with European regulations.',
        icon: 'server',
      },
      {
        title: 'GDPR Compliance',
        description: 'The processing and storage of personal data complies with the General Data Protection Regulation (GDPR).',
        icon: 'lock',
      },
      {
        title: 'Legal Framework',
        description: 'Mindzy ensures that each website meets current legal obligations: legal notices, cookie policy, terms of use.',
        icon: 'scale',
      },
    ],
    editorTitle: 'Publisher & Technical Provider',
    editorLines: [
      'Company Name: UIVAZI OÜ (operating under the Mindzy brand)',
      'Legal Form: Osaühing (Estonian private limited company)',
      'Registration Number: 17358237',
      'Registered Office: Ruunaoja tn 3, Lasmäe linnaosa, Tallinn, Harju maakond, 11415, Estonia',
    ],
    hostTitle: 'Hosting',
    hostLines: [
      'Primary infrastructure: Vercel Inc. — Europe region (Paris, France)',
      'Secondary infrastructure: Hostinger International Ltd. — European Union servers',
    ],
    contactTitle: 'Have a question?',
    contactDescription: 'For any inquiries regarding the legal notice, data protection, or security of this website, please contact us.',
    contactEmail: 'contact@mindzy.me',
    backLabel: 'View Mindzy\'s full legal notice',
    mindzyLabel: 'Discover Mindzy',
  },
  es: {
    badge: 'Aviso legal',
    title: 'Este sitio web está diseñado y gestionado por Mindzy',
    subtitle: (site) =>
      site
        ? `El aviso legal de ${site} está gestionado por Mindzy en el marco del diseño, alojamiento y mantenimiento del sitio web.`
        : 'El aviso legal de este sitio web está gestionado por Mindzy en el marco del diseño, alojamiento y mantenimiento del sitio web.',
    intro: 'Mindzy garantiza la conformidad legal, la seguridad técnica y la protección de datos en nombre de sus clientes para los sitios web que diseña.',
    sections: [
      {
        title: 'Protección y seguridad',
        description: 'Cada sitio web cuenta con un certificado SSL, protección contra ataques comunes y actualizaciones de seguridad periódicas.',
        icon: 'shield',
      },
      {
        title: 'Alojamiento europeo',
        description: 'Los sitios están alojados en servidores ubicados en Europa (Vercel y Hostinger), garantizando el cumplimiento de las normativas europeas.',
        icon: 'server',
      },
      {
        title: 'Conformidad RGPD',
        description: 'El tratamiento y almacenamiento de datos personales cumple con el Reglamento General de Protección de Datos (RGPD).',
        icon: 'lock',
      },
      {
        title: 'Marco jurídico',
        description: 'Mindzy se asegura de que cada sitio web cumpla con las obligaciones legales vigentes: aviso legal, política de cookies, condiciones de uso.',
        icon: 'scale',
      },
    ],
    editorTitle: 'Editor y proveedor técnico',
    editorLines: [
      'Denominación social: UIVAZI OÜ (operando bajo la marca Mindzy)',
      'Forma jurídica: Osaühing (sociedad de responsabilidad limitada de derecho estonio)',
      'Número de inscripción: 17358237',
      'Sede social: Ruunaoja tn 3, Lasmäe linnaosa, Tallinn, Harju maakond, 11415, Estonia',
    ],
    hostTitle: 'Alojamiento',
    hostLines: [
      'Infraestructura principal: Vercel Inc. — Región Europa (París, Francia)',
      'Infraestructura complementaria: Hostinger International Ltd. — Servidores Unión Europea',
    ],
    contactTitle: '¿Tiene alguna pregunta?',
    contactDescription: 'Para cualquier consulta relativa al aviso legal, la protección de datos o la seguridad de este sitio web, puede contactarnos.',
    contactEmail: 'contact@mindzy.me',
    backLabel: 'Ver el aviso legal completo de Mindzy',
    mindzyLabel: 'Descubrir Mindzy',
  },
}

const icons = {
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  server: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  scale: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  ),
}

const colorMap = {
  shield: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  server: { bg: 'bg-violet-50', text: 'text-violet-600' },
  lock: { bg: 'bg-sky-50', text: 'text-sky-600' },
  scale: { bg: 'bg-amber-50', text: 'text-amber-600' },
}

export function RedirectContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams()
  const site = searchParams.get('site')
  const t = copy[locale]

  return (
    <div className="pt-32 pb-20 bg-cream-50 min-h-screen">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 text-violet-600 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            {t.badge}
          </span>

          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>

          {site && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-gray-600 mb-4">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span className="font-medium text-anthracite">{site}</span>
            </div>
          )}

          <p className="body-large max-w-2xl mx-auto mt-2">{t.subtitle(site)}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-8 mb-8">
          <p className="text-gray-600 leading-relaxed text-center mb-8">{t.intro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.sections.map((section) => (
              <div
                key={section.icon}
                className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[section.icon].bg} ${colorMap[section.icon].text}`}>
                  {icons[section.icon]}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-anthracite mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
            <h2 className="font-display font-semibold text-anthracite mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
              {t.editorTitle}
            </h2>
            <div className="space-y-2">
              {t.editorLines.map((line, i) => (
                <p key={i} className="text-sm text-gray-600">{line}</p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6">
            <h2 className="font-display font-semibold text-anthracite mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7" />
              </svg>
              {t.hostTitle}
            </h2>
            <div className="space-y-2">
              {t.hostLines.map((line, i) => (
                <p key={i} className="text-sm text-gray-600">{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-white rounded-2xl border border-violet-100 p-8 text-center mb-8">
          <h2 className="font-display text-lg font-semibold text-anthracite mb-2">{t.contactTitle}</h2>
          <p className="text-gray-500 mb-4 max-w-lg mx-auto">{t.contactDescription}</p>
          <a
            href={`mailto:${t.contactEmail}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {t.contactEmail}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/legal/mentions`}
            className="text-sm text-violet-600 hover:text-violet-700 underline underline-offset-4 transition-colors"
          >
            {t.backLabel}
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <Link
            href={`/${locale}`}
            className="text-sm text-gray-500 hover:text-anthracite transition-colors"
          >
            {t.mindzyLabel} &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
