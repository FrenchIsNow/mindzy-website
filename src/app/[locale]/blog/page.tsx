import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { copy } from '@/lib/copy'
import { blogPosts } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].blog
  return { title: t.title, description: t.subtitle }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = copy[locale as Locale].blog
  return (
    <div className="pt-32 pb-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <Card variant="outline" hover className="h-full">
                <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center text-gray-400"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg></div>
                <CardHeader><div className="flex items-center gap-2 mb-2"><Badge variant="default" size="sm">{post.category}</Badge><span className="text-xs text-gray-500">{post.readingTime} {t.readTime}</span></div><CardTitle className="text-lg line-clamp-2">{post.title[locale as Locale]}</CardTitle><CardDescription className="line-clamp-2">{post.excerpt[locale as Locale]}</CardDescription></CardHeader>
                <CardContent className="pt-0"><div className="flex items-center justify-between text-sm"><span className="text-gray-500">{post.date}</span><span className="text-violet font-medium">{t.readMore} →</span></div></CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
