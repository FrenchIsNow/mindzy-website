import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getMessages } from '@/lib/getMessages'
import { testimonials } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { PourquoiNous } from '@/components/sections/PourquoiNous'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { Engagements } from '@/components/sections/Engagements'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = locale as Locale
  const t = getMessages(l).whyUs
  const msg = getMessages(l).whyUs
  return buildPageMetadata({
    locale: l,
    path: '/pourquoi-nous',
    title: t.title,
    description: msg.metaDescription,
  })
}

export default async function PourquoiNousPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const l = locale as Locale
  const t = getMessages(l).whyUs
  const msg = getMessages(l).whyUs

  return (
    <div className="pt-32 pb-12">
      {/* Hero Section */}
      <section className="container-wide mb-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-1 text-anthracite mb-6">{t.title}</h1>
        </div>
      </section>

      {/* Why Us - 6 detailed blocks */}
      <PourquoiNous locale={locale as Locale} />

      {/* Process Timeline - 4 steps */}
      <ProcessTimeline locale={locale as Locale} />

      {/* Engagements - 4 commitments */}
      <Engagements locale={locale as Locale} />

    
      {/* Testimonials Preview */}
      <section className="bg-cream-50 py-16">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite mb-4">{msg.titles.testimonials}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} variant="elevated" className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.quote[l]}&rdquo;</p>
                <div>
                  <div className="font-semibold text-anthracite">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.profession[l]}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-white py-16">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite mb-4">{msg.titles.comparison}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
              <thead>
                <tr className="bg-anthracite text-white">
                  {msg.comparison.headers.map((header, i) => (
                    <th key={i} className={`px-6 py-4 text-left font-display ${i === 4 ? 'bg-violet' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {msg.comparison.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-6 py-4 ${j === 0 ? 'font-semibold text-anthracite' : 'text-gray-600'} ${j === 4 ? 'bg-violet/5 font-semibold text-violet' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

  
      {/* CTA Section */}
      <section className="container-wide py-16">
        <Card variant="gradient" className="p-12 text-center">
          <h2 className="heading-2 text-anthracite mb-4">{msg.titles.cta}</h2>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">{msg.titles.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/diagnostic`}>
              <Button variant="primary" size="lg">{msg.titles.ctaButton}</Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button variant="outline" size="lg">{msg.titles.ctaSecondary}</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
