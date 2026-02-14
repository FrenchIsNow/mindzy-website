import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getMessages } from '@/lib/getMessages'
import { blogPosts } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const content: Record<string, { title: string; subtitle: string; description: string }> = {
  fr: { title: 'Academy', subtitle: 'Formations et tutoriels pour votre présence en ligne', description: 'Formations gratuites et tutoriels pour développer votre présence en ligne. SEO, marketing digital, réservation en ligne et stratégie web.' },
  en: { title: 'Academy', subtitle: 'Training and tutorials for your online presence', description: 'Free training and tutorials to grow your online presence. SEO, digital marketing, online booking and web strategy.' },
  es: { title: 'Academy', subtitle: 'Formación y tutoriales para tu presencia en línea', description: 'Formaciones gratuitas y tutoriales para desarrollar tu presencia en línea. SEO, marketing digital, reservas en línea y estrategia web.' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = content[locale]
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/academy',
    title: t.title,
    description: t.description,
  })
}

export default async function AcademyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = content[locale]
  const t = getMessages(locale as Locale).blog
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{c.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, i) => (
            <Link key={post.slug} href={`/${locale}/academy/${post.slug}`}>
              <Card variant="outline" hover className="h-full">
                <div className="aspect-video bg-gradient-to-br from-violet/20 to-violet/5 rounded-t-xl flex items-center justify-center"><span className="text-5xl font-bold text-violet/30">{String(i + 1).padStart(2, '0')}</span></div>
                <CardHeader><Badge variant="primary" size="sm" className="mb-2">Formation</Badge><CardTitle className="text-lg line-clamp-2">{post.title[locale as Locale]}</CardTitle><CardDescription className="line-clamp-2">{post.excerpt[locale as Locale]}</CardDescription></CardHeader>
                <CardContent className="pt-0"><span className="text-violet font-medium text-sm">{t.readMore} →</span></CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
