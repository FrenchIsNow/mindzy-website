import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { copy } from '@/lib/copy'
import { testimonials } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getMessages } from '@/lib/getMessages'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const l = locale as Locale
  const t = copy[l].whyUs
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
  const t = copy[l].whyUs
  const msg = getMessages(l).whyUs

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container-wide mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="violet" className="mb-4">
            {msg.badge}
          </Badge>
          <h1 className="heading-1 text-anthracite mb-6">{t.title}</h1>
          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-wide mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {msg.stats.map((stat, i) => (
            <Card key={i} variant="elevated" className="text-center p-6 hover:shadow-glow transition-shadow">
              <div className="text-4xl md:text-5xl font-display font-bold text-violet mb-2">{stat.value}</div>
              <div className="font-semibold text-anthracite mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="container-wide mb-24">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-anthracite mb-4">{msg.titles.differentiators}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {msg.differentiators.map((item, i) => (
            <Card key={i} variant="outline" className="p-6 hover:border-violet/50 transition-colors">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-display font-semibold text-anthracite mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.details.map((detail, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-violet">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-cream-100 py-20 mb-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-anthracite mb-4">{msg.titles.comparison}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-soft overflow-hidden">
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

      {/* Process Section */}
      <section className="container-wide mb-24">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-anthracite mb-4">{msg.titles.process}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {msg.process.map((step, i) => (
            <div key={i} className="relative">
              <Card variant="glass" className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet/10 flex items-center justify-center">
                    <span className="font-display font-bold text-violet">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-anthracite mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Engagements Section */}
      <section className="container-wide mb-24">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-anthracite mb-4">{msg.titles.engagements}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {msg.engagements.map((engagement, i) => (
            <Card key={i} variant="elevated" className="p-6 border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-display font-semibold text-anthracite mb-2">{engagement.title}</h3>
                  <p className="text-gray-600">{engagement.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="bg-gradient-to-b from-violet-50 to-cream-50 py-20 mb-24">
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

      {/* CTA Section */}
      <section className="container-wide">
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
