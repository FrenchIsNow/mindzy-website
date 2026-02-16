import Link from 'next/link'
import Image from 'next/image'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { getPortfolioItems } from '@/lib/google-sheets'

export async function FeaturedPortfolio({ locale }: { locale: Locale }) {
  const portfolioItems = await getPortfolioItems()
  const featured = portfolioItems.filter((item) => item.featured).slice(0, 6)

  const content = {
    fr: {
      eyebrow: 'Nos réalisations',
      title: 'Des sites qui convertissent',
      subtitle: 'Découvrez les projets que nous avons réalisés pour des entrepreneurs comme vous.',
      cta: 'Voir tout le portfolio',
      viewProject: 'Voir le projet',
    },
    en: {
      eyebrow: 'Our work',
      title: 'Websites that convert',
      subtitle: 'Discover the projects we\'ve built for entrepreneurs like you.',
      cta: 'View full portfolio',
      viewProject: 'View project',
    },
    es: {
      eyebrow: 'Nuestro trabajo',
      title: 'Sitios que convierten',
      subtitle: 'Descubre los proyectos que hemos realizado para emprendedores como tú.',
      cta: 'Ver todo el portfolio',
      viewProject: 'Ver proyecto',
    },
  }

  const t = content[locale]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-wide">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow mb-4 block">{t.eyebrow}</span>
            <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
            <p className="body-large max-w-xl">{t.subtitle}</p>
          </div>
          <Link href={`/${locale}/portfolio`} className="flex-shrink-0">
            <Button variant="secondary" size="lg" icon={<ArrowIcon />}>
              {t.cta}
            </Button>
          </Link>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, index) => (
            <Link
              key={item.id}
              href={`/${locale}/portfolio#${item.id}`}
              className={cn(
                'group relative block rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]',
                'animate-fade-in-up'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.image && item.image !== '/images/portfolio/placeholder-1.jpg' ? (
                <Image
                  src={item.image}
                  alt={item.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className={cn(
                  'absolute inset-0',
                  index % 6 === 0 && 'bg-gradient-to-br from-violet-100 to-violet-200',
                  index % 6 === 1 && 'bg-gradient-to-br from-sage-100 to-sage-200',
                  index % 6 === 2 && 'bg-gradient-to-br from-cream-200 to-cream-300',
                  index % 6 === 3 && 'bg-gradient-to-br from-rose-100 to-rose-200',
                  index % 6 === 4 && 'bg-gradient-to-br from-violet-50 to-cream-100',
                  index % 6 === 5 && 'bg-gradient-to-br from-sage-50 to-violet-100',
                )} />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-anthracite/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Top: Category badge */}
                <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Badge variant="primary" className="bg-white/90 text-violet border-0">
                    {item.profession}
                  </Badge>
                </div>

                {/* Bottom: Title and arrow */}
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {item.title[locale]}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{t.viewProject}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            </Link>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="40+" label="Sites livrés" />
            <StatItem value="98%" label="Satisfaction client" />
            <StatItem value="4.9/5" label="Note moyenne" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="group">
      <div className="font-display text-3xl sm:text-4xl font-semibold text-anthracite mb-1 group-hover:text-violet transition-colors">
        {value}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}
