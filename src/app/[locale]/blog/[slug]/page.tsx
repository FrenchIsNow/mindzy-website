import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getMessages } from '@/lib/getMessages'
import { getRelatedPosts } from '@/lib/blog'
import { getPublicBlogPost, getAllPublicBlogSlugs } from '@/lib/blog-resolver'
import type { Locale } from '@/lib/i18n'
import { BlogContent } from '@/components/features/BlogContent'
import { TableOfContents, ReadingProgress } from '@/components/features/TableOfContents'
import { ShareButtons } from '@/components/features/ShareButtons'
import { buildPageMetadata, jsonLdBlogPosting, jsonLdBreadcrumb, jsonLdFaqPage, JsonLd } from '@/lib/seo'

export async function generateStaticParams() {
  return getAllPublicBlogSlugs()
}

// Allow slugs unknown at build time (newly-published DB articles) to render on demand.
export const dynamicParams = true

/** Extract FAQ Q&A pairs from markdown content (## FAQ heading followed by ### Q / answer blocks) */
function extractFaqPairs(content: string): { question: string; answer: string }[] {
  const faqSection = content.match(/##\s+FAQ[\s\S]*?(?=\n##\s|\n---\s*$|$)/i)?.[0]
  if (!faqSection) return []

  const pairs: { question: string; answer: string }[] = []
  const blocks = faqSection.split(/\n###\s+/).slice(1)
  for (const block of blocks) {
    const lines = block.trim().split('\n')
    const question = lines[0]?.trim()
    const answer = lines
      .slice(1)
      .join(' ')
      .replace(/\*\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim()
    if (question && answer) pairs.push({ question, answer })
  }
  return pairs
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPublicBlogPost(locale as Locale, slug)
  if (!post) return { title: 'Article' }
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.modifiedDate || post.date,
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

const copiedLabels: Record<string, string> = { fr: 'Copie !', en: 'Copied!', es: 'Copiado!' }

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPublicBlogPost(locale as Locale, slug)
  if (!post) notFound()

  const t = getMessages(locale as Locale).blog
  const relatedPosts = getRelatedPosts(locale as Locale, slug, 3)

  const blogPostJsonLd = jsonLdBlogPosting({
    title: post.title,
    description: post.excerpt,
    url: `https://mindzy.me/${locale}/blog/${slug}`,
    image: post.image,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    author: post.author,
    wordCount: post.wordCount,
    keywords: post.keywords,
    locale,
  })

  const faqPairs = extractFaqPairs(post.content)
  const faqJsonLd = faqPairs.length > 0 ? jsonLdFaqPage(faqPairs) : null

  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: 'Mindzy', url: `https://mindzy.me/${locale}` },
    { name: 'Blog', url: `https://mindzy.me/${locale}/blog` },
    { name: post.title, url: `https://mindzy.me/${locale}/blog/${slug}` },
  ])

  const shareUrl = `https://mindzy.me/${locale}/blog/${slug}`

  return (
    <>
      <ReadingProgress />

      <div className="pt-28 pb-24">
        <JsonLd data={blogPostJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        {faqJsonLd && <JsonLd data={faqJsonLd} />}

        {/* Breadcrumb nav */}
        <div className="container-wide mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href={`/${locale}/blog`} className="hover:text-violet transition-colors">Blog</Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/${locale}/blog/category/${post.category}`}
              className="hover:text-violet transition-colors capitalize"
            >
              {post.category}
            </Link>
          </nav>
        </div>

        {/* Article header — full width */}
        <header className="container-narrow mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Link href={`/${locale}/blog/category/${post.category}`}>
              <Badge variant={categoryColors[post.category] || 'default'} className="capitalize cursor-pointer">
                {post.category}
              </Badge>
            </Link>
            <span className="text-sm text-gray-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} {t.readTime}
            </span>
          </div>

          <h1 className="heading-1 text-anthracite mb-5 text-balance leading-[1.15]">{post.title}</h1>

          <p className="post-excerpt body-large text-gray-500 max-w-3xl text-pretty">{post.excerpt}</p>

          {/* Author + Share row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                M
              </div>
              <div>
                <div className="font-medium text-anthracite text-sm">{post.author}</div>
                <time className="text-xs text-gray-400">{post.date}</time>
              </div>
            </div>
            <ShareButtons
              url={shareUrl}
              title={post.title}
              copiedLabel={copiedLabels[locale] || 'Copied!'}
            />
          </div>
        </header>

        {/* Featured Image — wider than content */}
        <div className="container-wide mb-12">
          <div className="aspect-[21/9] bg-gray-50 rounded-2xl lg:rounded-3xl overflow-hidden relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content area with TOC sidebar */}
        <div className="container-wide">
          <div className="flex gap-16 items-start justify-center">
            {/* Main article content */}
            <article className="min-w-0 max-w-3xl flex-1">
              <BlogContent content={post.content} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-violet-50/80 via-cream-50/50 to-violet-50/30 rounded-2xl border border-violet/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-anthracite mb-1">
                      {t.likedArticle || "Vous avez aime cet article ?"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {locale === 'fr' ? 'Decouvrez comment Mindzy peut vous aider.' : locale === 'es' ? 'Descubre como Mindzy puede ayudarte.' : 'Discover how Mindzy can help you.'}
                    </p>
                  </div>
                  <Link href={`/${locale}/diagnostic`}>
                    <Button variant="primary" size="md">{getMessages(locale as Locale).hero.cta}</Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* Desktop TOC sidebar */}
            {post.readingTime >= 5 && (
              <TableOfContents
                content={post.content}
                label={locale === 'fr' ? 'Table des matieres' : locale === 'es' ? 'Tabla de contenidos' : 'Table of Contents'}
              />
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="container-wide mt-24">
            <div className="divider mb-12" />
            <h2 className="heading-3 text-anthracite mb-10 text-center">{t.relatedArticles || "Articles similaires"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/${locale}/blog/${relatedPost.slug}`} className="group block">
                  <article className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 cursor-pointer flex flex-col">
                    <div className="aspect-[16/10] bg-gray-50 overflow-hidden relative shrink-0">
                      {relatedPost.image.endsWith('.svg') ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-cream-50">
                          <svg className="w-10 h-10 text-violet/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <Badge variant={categoryColors[relatedPost.category] || 'default'} size="sm" className="capitalize self-start mb-2">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-display text-base font-semibold text-anthracite tracking-tight leading-snug line-clamp-2 mb-2 group-hover:text-violet transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{relatedPost.excerpt}</p>
                      <span className="text-violet text-sm font-medium mt-auto flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                        {t.readMore}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
