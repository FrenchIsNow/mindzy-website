import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { getMessages } from '@/lib/getMessages'
import { getBlogPost, getAllPostSlugs, getRelatedPosts } from '@/lib/blog'
import type { Locale } from '@/lib/i18n'
import { BlogContent } from '@/components/features/BlogContent'
import { buildPageMetadata, jsonLdBlogPosting, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'

export async function generateStaticParams() {
  return getAllPostSlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(locale as Locale, slug)
  if (!post) return { title: 'Article' }
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    section: post.category,
  })
}

const categoryColors: Record<string, 'default' | 'primary' | 'success' | 'violet'> = {
  seo: 'primary',
  marketing: 'success',
  business: 'violet',
  branding: 'default',
  sante: 'primary',
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = getBlogPost(locale as Locale, slug)
  if (!post) notFound()

  const t = getMessages(locale as Locale).blog
  const relatedPosts = getRelatedPosts(locale as Locale, slug, 3)

  const blogPostJsonLd = jsonLdBlogPosting({
    title: post.title,
    description: post.excerpt,
    url: `https://mindzy.me/${locale}/blog/${slug}`,
    image: post.image,
    datePublished: post.date,
    author: post.author,
  })

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: 'Mindzy', url: `https://mindzy.me/${locale}` },
    { name: 'Blog', url: `https://mindzy.me/${locale}/blog` },
    { name: post.title, url: `https://mindzy.me/${locale}/blog/${slug}` },
  ])

  return (
    <div className="pt-32 pb-20">
      <JsonLd data={blogPostJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="container-narrow">
        <div className="mb-8">
          <Link href={`/${locale}/blog`}>
            <Button variant="ghost" size="sm">← {getMessages(locale as Locale).common.back}</Button>
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={categoryColors[post.category] || 'default'}>{post.category}</Badge>
            <span className="text-sm text-gray-500">{post.readingTime} {t.readTime}</span>
          </div>
          <h1 className="heading-2 text-anthracite mb-4">{post.title}</h1>
          <p className="body-large text-gray-600">{post.excerpt}</p>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-violet/10 flex items-center justify-center text-violet font-semibold text-sm">M</div>
            <div>
              <div className="font-medium text-anthracite">{post.author}</div>
              <div className="text-sm text-gray-500">{post.date}</div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-gray-50 rounded-2xl mb-12 overflow-hidden relative">
          {post.image.endsWith('.svg') ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Article Content */}
        <BlogContent content={post.content} />

        {/* Footer CTA */}
        <footer className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600">{t.likedArticle || "Vous avez aimé cet article ?"}</p>
          <Link href={`/${locale}/diagnostic`}>
            <Button variant="primary" size="md">{getMessages(locale as Locale).hero.cta}</Button>
          </Link>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-wide mt-20">
          <h2 className="heading-3 text-anthracite mb-8 text-center">{t.relatedArticles || "Articles similaires"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/${locale}/blog/${relatedPost.slug}`}>
                <Card variant="outline" hover className="h-full">
                  <div className="aspect-video bg-gray-50 rounded-t-xl overflow-hidden relative">
                    {relatedPost.image.endsWith('.svg') ? (
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <Badge variant={categoryColors[relatedPost.category] || 'default'} size="sm">
                      {relatedPost.category}
                    </Badge>
                    <CardTitle className="text-base line-clamp-2 mt-2">{relatedPost.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{relatedPost.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-violet text-sm font-medium">{t.readMore} →</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
