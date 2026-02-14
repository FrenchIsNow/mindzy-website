'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { getMessages } from '@/lib/getMessages'
import { resources } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { analytics } from '@/lib/analytics'

export function RessourcesContent({ locale }: { locale: Locale }) {
  const [email, setEmail] = useState('')
  const t = getMessages(locale).resources
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((r) => (
              <Card key={r.id} variant="outline" hover>
                <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center text-gray-400"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                <CardHeader><Badge variant="default" size="sm" className="mb-2 w-fit">{r.type.toUpperCase()}</Badge><CardTitle className="text-lg">{r.title[locale]}</CardTitle><CardDescription>{r.description[locale]}</CardDescription></CardHeader>
                <CardFooter className="pt-0"><Button variant="secondary" size="sm" className="w-full" onClick={() => analytics.external.linkClick(r.id, r.title[locale], 'resources_download')}>{t.download}</Button></CardFooter>
              </Card>
            ))}
          </div>
          <Card variant="elevated" className="lg:col-span-1 sticky top-24">
            <CardHeader><CardTitle>Newsletter</CardTitle><CardDescription>Recevez nos conseils par email</CardDescription></CardHeader>
            <CardContent><form onSubmit={(e) => { e.preventDefault(); analytics.lead.formSubmit('newsletter', true); analytics.lead.generate('newsletter') }} className="space-y-4"><Input type="email" placeholder={t.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required /><Button variant="primary" size="md" className="w-full" type="submit">{t.emailCta}</Button></form></CardContent>
            <CardFooter><Link href={`/${locale}/onboarding`} className="w-full"><Button variant="ghost" size="sm" className="w-full">{getMessages(locale).hero.cta} →</Button></Link></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
