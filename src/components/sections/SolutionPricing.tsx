import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const sectionCopy = {
  fr: {
    title: 'Des solutions',
    titleAccent: 'clés en main',
    titleEnd: ', adaptées à vos besoins',
    from: 'à partir de',
    perMonth: 'HT par mois',
    fixed: 'HT',
    cta: 'Découvrir',
  },
  en: {
    title: 'Turnkey',
    titleAccent: 'solutions',
    titleEnd: ', tailored to your needs',
    from: 'starting from',
    perMonth: 'excl. VAT / month',
    fixed: 'excl. VAT',
    cta: 'Discover',
  },
  es: {
    title: 'Soluciones',
    titleAccent: 'llave en mano',
    titleEnd: ', adaptadas a tus necesidades',
    from: 'desde',
    perMonth: 'sin IVA / mes',
    fixed: 'sin IVA',
    cta: 'Descubrir',
  },
}

const solutions = [
  {
    title: { fr: 'Site web', en: 'Website', es: 'Sitio web' },
    price: '49€',
    priceType: 'monthly' as const,
    description: {
      fr: 'Boostez votre activité grâce à un site internet professionnel, optimisé SEO et pensé pour convertir.',
      en: 'Boost your business with a professional website, SEO optimized and designed to convert.',
      es: 'Impulsa tu actividad con un sitio web profesional, optimizado SEO y diseñado para convertir.',
    },
    href: '/solutions/site-web',
  },
  {
    title: { fr: 'Branding', en: 'Branding', es: 'Branding' },
    price: '79€',
    priceType: 'fixed' as const,
    description: {
      fr: 'Logo, identité visuelle et charte graphique pour une image professionnelle et cohérente.',
      en: 'Logo, visual identity and brand guidelines for a professional and cohesive image.',
      es: 'Logo, identidad visual y guía de marca para una imagen profesional y coherente.',
    },
    href: '/solutions/branding',
  },
  {
    title: { fr: 'Formations & Réseaux', en: 'Training & Social', es: 'Formación y Redes' },
    price: '190€',
    priceType: 'fixed' as const,
    description: {
      fr: 'Développez votre notoriété et gagnez en crédibilité pour attirer de nouveaux clients.',
      en: 'Build your reputation and credibility to attract new clients.',
      es: 'Desarrolla tu notoriedad y gana credibilidad para atraer nuevos clientes.',
    },
    href: '/solutions/formations',
  },
  {
    title: { fr: 'Solution sur mesure', en: 'Custom solution', es: 'Solución a medida' },
    price: '2000€',
    priceType: 'fixed' as const,
    description: {
      fr: 'Apps internes, mobile et agents IA. Des solutions techniques avancées pour automatiser et scaler.',
      en: 'Internal apps, mobile and AI agents. Advanced technical solutions to automate and scale.',
      es: 'Apps internas, móvil y agentes IA. Soluciones técnicas avanzadas para automatizar y escalar.',
    },
    href: '/solutions/sur-mesure',
  },
]

export function SolutionPricing({ locale }: { locale: Locale }) {
  const t = sectionCopy[locale]

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-wide">
        <h2 className="heading-2 text-anthracite text-center mb-12 lg:mb-16">
          {t.title}{' '}
          <span className="text-gradient font-bold">{t.titleAccent}</span>
          {t.titleEnd}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {solutions.map((sol, i) => (
            <div
              key={sol.href}
              className="group bg-violet-50/40 border-2 border-violet-100 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:border-violet-200 hover:shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Content */}
              <div className="py-10 px-6 flex flex-col items-center text-center flex-1">
                <h3 className="font-display text-xl font-semibold text-anthracite">
                  {sol.title[locale]}
                </h3>

                <p className="text-sm font-medium text-violet-600 mt-2">
                  {t.from}
                </p>

                <div className="text-violet-600 mt-1.5 flex items-baseline justify-center gap-1">
                  <span className="font-display text-[3.5rem] leading-none font-bold">
                    {sol.price}
                  </span>
                  <span className="text-xs font-bold leading-tight text-left">
                    {sol.priceType === 'monthly' ? t.perMonth : t.fixed}
                  </span>
                </div>

                <p className="text-gray-500 text-[15px] leading-relaxed mt-5 text-balance flex-1">
                  {sol.description[locale]}
                </p>

                <div className="mt-auto pt-6">
                  <Link href={`/${locale}${sol.href}`}>
                    <Button variant="primary" size="md" icon={<ArrowIcon />}>
                      {t.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
