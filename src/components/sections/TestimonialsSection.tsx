import { cn } from '@/lib/utils'
import { testimonials as configTestimonials } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

const sectionCopy = {
  fr: {
    badge: 'Témoignages',
    title: 'Ce que disent nos clients',
  },
  en: {
    badge: 'Testimonials',
    title: 'What our clients say about us',
  },
  es: {
    badge: 'Testimonios',
    title: 'Lo que dicen nuestros clientes',
  },
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = [
  'bg-violet-100 text-violet-700',
  'bg-indigo-100 text-indigo-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-cyan-100 text-cyan-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-sky-100 text-sky-700',
]

interface TestimonialsSectionProps {
  locale?: Locale
  featured?: {
    quote: string
    author: string
    role: string
  }
}

export function TestimonialsSection({ locale = 'fr', featured }: TestimonialsSectionProps) {
  const t = sectionCopy[locale]

  const featuredItem = featured ?? {
    quote: configTestimonials[1].quote[locale],
    author: configTestimonials[1].name,
    role: configTestimonials[1].profession[locale],
  }

  const gridItems = configTestimonials.filter((_, i) => !featured ? i !== 1 : true)

  const columns: { quote: string; author: string; role: string; colorIdx: number }[][] = [[], [], [], []]
  gridItems.forEach((item, i) => {
    columns[i % 4].push({
      quote: item.quote[locale],
      author: item.name,
      role: item.profession[locale],
      colorIdx: i % avatarColors.length,
    })
  })

  return (
    <div className="relative isolate bg-[#FAFAFF] py-24 sm:py-32">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden size-full mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200 sm:block"
      >
        <defs>
          <pattern
            x="50%"
            y={0}
            id="testimonials-grid-pattern"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={0} className="overflow-visible fill-gray-50">
          <path
            d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#testimonials-grid-pattern)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-linear-to-tr from-[#c084fc] to-[#7c3aed]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="-ml-88 aspect-1313/771 w-328.25 flex-none origin-top-right rotate-30 bg-linear-to-tr from-[#c084fc] to-[#7c3aed] xl:mr-[calc(50%-12rem)] xl:ml-0"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-violet-600">{t.badge}</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-[#1E1B4B] sm:text-5xl">
              {t.title}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-6 text-lg font-semibold tracking-tight text-[#1E1B4B] sm:p-12 sm:text-xl/8">
                <p>{`"${featuredItem.quote}"`}</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                <div className={cn('flex size-10 flex-none items-center justify-center rounded-full text-sm font-bold', avatarColors[0])}>
                  {getInitials(featuredItem.author)}
                </div>
                <div className="flex-auto">
                  <div className="font-semibold text-[#1E1B4B]">{featuredItem.author}</div>
                  <div className="text-gray-500">{featuredItem.role}</div>
                </div>
              </figcaption>
            </figure>
            {columns.map((column, colIdx) => (
              <div
                key={colIdx}
                className={cn(
                  colIdx === 0 || colIdx === 3 ? 'xl:row-span-2' : 'xl:row-start-1',
                  'space-y-8',
                )}
              >
                {column.map((item) => (
                  <figure
                    key={item.author}
                    className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                  >
                    <blockquote className="text-gray-900">
                      <p>{`"${item.quote}"`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <div className={cn('flex size-10 flex-none items-center justify-center rounded-full text-xs font-bold', avatarColors[item.colorIdx])}>
                        {getInitials(item.author)}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1E1B4B]">{item.author}</div>
                        <div className="text-gray-500">{item.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
