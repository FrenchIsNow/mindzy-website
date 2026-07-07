import { notFound } from 'next/navigation'
import { getWaitingListBySlug } from '@/lib/db'
import { locales, type Locale, defaultLocale } from '@/lib/i18n'
import WaitlistForm from './WaitlistForm'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function WaitingListLanding({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params
  const locale = (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale
  const list = await getWaitingListBySlug(slug)
  if (!list || list.status === 'archived') notFound()

  const fields = Array.isArray(list.form_fields) ? (list.form_fields as string[]) : ['email', 'firstName', 'lastName', 'company']
  const heroTitle = list.hero_title || list.name
  const heroSubtitle = list.hero_subtitle || list.description || ''
  const benefits = Array.isArray(list.benefits) ? (list.benefits as string[]) : []
  const thankYou = list.thank_you_message || 'Merci ! Vous êtes sur la liste.'
  const statusMessage = (list as { status_message?: string | null }).status_message
  const paused = list.status === 'paused'

  return (
    <div className="container-narrow section-padding">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-violet-600">Liste d&apos;attente</div>
          <h1 className="heading-3 mb-4">{heroTitle}</h1>
          {heroSubtitle && <p className="mb-6 text-lg text-slate-700">{heroSubtitle}</p>}

          {benefits.length > 0 && (
            <ul className="mb-6 space-y-2">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-violet-600">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {statusMessage && <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">{statusMessage}</p>}
          {paused && <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">Les inscriptions sont temporairement en pause.</p>}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-base font-semibold">Rejoignez la liste</h2>
          {list.thank_you_message && <p className="mb-4 text-xs text-slate-500">{thankYou}</p>}
          {paused ? (
            <p className="text-sm text-slate-600">Réouverture prochaine.</p>
          ) : (
            <WaitlistForm slug={slug} locale={locale} fields={fields} />
          )}
        </div>
      </div>
    </div>
  )
}
