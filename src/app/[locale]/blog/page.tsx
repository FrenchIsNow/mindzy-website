import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getMessages } from '@/lib/getMessages'
import { getBlogPosts } from '@/lib/blog'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const blogDescriptions: Record<string, string> = {
  fr: 'Conseils, guides et stratégies pour développer votre activité en ligne. SEO, marketing digital, réservation en ligne et plus.',
  en: 'Tips, guides and strategies to grow your business online. SEO, digital marketing, online booking and more.',
  es: 'Consejos, guías y estrategias para desarrollar tu negocio en línea. SEO, marketing digital, reservas en línea y más.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).blog
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/blog',
    title: `${t.title} - Mindzy`,
    description: blogDescriptions[locale] || blogDescriptions.fr,
  })
}

const categoryColors: Record<string, 'default' | 'primary' | 'success' | 'violet'> = {
  seo: 'primary',
  marketing: 'success',
  business: 'violet',
  branding: 'default',
  sante: 'primary',
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).blog
  const posts = getBlogPosts(locale as Locale)

  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <Card variant="outline" hover className="h-full">
                <div className="aspect-video bg-gray-50 rounded-t-xl overflow-hidden relative">
                  {post.image.endsWith('.svg') ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={categoryColors[post.category] || 'default'} size="sm">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{post.readingTime} {t.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{post.date}</span>
                    <span className="text-violet font-medium">{t.readMore} →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
