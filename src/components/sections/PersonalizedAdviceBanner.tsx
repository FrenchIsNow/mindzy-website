import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface PersonalizedAdviceBannerProps {
  locale: Locale
}

const content: Record<string, { title: string; highlight: string; description: string; cta: string }> = {
  fr: {
    title: 'Besoin de conseils',
    highlight: 'personnalisés',
    description: 'En 30 minutes, un expert analyse votre communication et vous apporte des conseils personnalisés et adaptés à votre entreprise.',
    cta: 'Prendre RDV gratuitement',
  },
  en: {
    title: 'Need',
    highlight: 'personalized advice',
    description: 'In 30 minutes, an expert analyzes your communication and provides personalized advice tailored to your business.',
    cta: 'Book a free call',
  },
  es: {
    title: 'Necesita consejos',
    highlight: 'personalizados',
    description: 'En 30 minutos, un experto analiza su comunicación y le brinda consejos personalizados y adaptados a su empresa.',
    cta: 'Reservar cita gratis',
  },
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 mr-2 fill-violet" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.75 2a.75.75 0 0 0-1.5 0v1.25H10.5a.75.75 0 0 0 0 1.5h3.75V6a.75.75 0 0 0 1.5 0V2Zm-13.5 8V6A2.75 2.75 0 0 1 5 3.25h1.25V2a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0V4.75H5c-.69 0-1.25.56-1.25 1.25v3.25h16.5V6c0-.69-.56-1.25-1.25-1.25h-.5a.75.75 0 0 1 0-1.5h.5A2.75 2.75 0 0 1 21.75 6v13A2.75 2.75 0 0 1 19 21.75H5A2.75 2.75 0 0 1 2.25 19v-9Zm1.5 9v-8.25h16.5V19c0 .69-.56 1.25-1.25 1.25H5c-.69 0-1.25-.56-1.25-1.25Z" />
    </svg>
  )
}

export function PersonalizedAdviceBanner({ locale }: PersonalizedAdviceBannerProps) {
  const t = content[locale] || content.fr

  return (
    <section className="section-padding !pt-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-violet-600 px-6 py-8 sm:p-8 md:p-10 lg:p-14 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-violet-400/10 rounded-full blur-2xl" />

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 justify-between relative md:items-center">
            <div className="md:flex-1 lg:flex-[1.1]">
              <h2 className="text-2xl sm:text-[1.75rem] md:text-[2rem] lg:text-[2.5rem] font-black text-white leading-tight">
                {t.title}{' '}
                <span className="font-bold font-display italic">{t.highlight}</span>
                {locale === 'fr' ? ' ?' : '?'}
              </h2>
            </div>

            <div className="md:flex-1">
              <p className="font-medium text-white/90 leading-relaxed text-base sm:text-lg max-w-md md:mx-auto">
                {t.description}
              </p>
            </div>

            <div className="md:flex-shrink-0">
              <Link
                href={`https://calendar.app.google/7ccvgBKCiRJgLXKL7`}
                className="py-3.5 px-6 rounded-full font-extrabold leading-5 inline-flex items-center justify-center text-sm sm:text-base transition-all duration-300 text-violet-600 bg-white border-2 border-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <CalendarIcon />
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
