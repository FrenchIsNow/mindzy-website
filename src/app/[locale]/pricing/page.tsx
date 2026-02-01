import type { Metadata } from 'next'
import { PricingTable } from '@/components/sections/PricingTable'
import { ROICalculator } from '@/components/features/ROICalculator'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import { config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].pricing
  return { title: t.title, description: t.subtitle }
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = copy[locale as Locale].pricing
  return (
    <div className="pt-24">
      <PricingTable locale={locale as Locale} />
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ROICalculator locale={locale as Locale} />
            <Card variant="elevated">
              <CardHeader><CardTitle>{t.customQuote.title}</CardTitle><CardDescription>{t.customQuote.description}</CardDescription></CardHeader>
              <CardContent>
                <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer"><Button variant="primary" size="lg" className="w-full">{t.customQuote.cta}</Button></a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
