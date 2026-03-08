import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getMessages } from '@/lib/getMessages'
import { getBlogPosts, getBlogCategories } from '@/lib/blog'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata, jsonLdBreadcrumb, jsonLdCollectionPage, JsonLd } from '@/lib/seo'
import { BlogCategoryFilter } from '@/components/features/BlogCategoryFilter'
import { BlogPostsGrid } from '@/components/features/BlogPostsGrid'

const blogDescriptions: Record<string, string> = {
  fr: 'Conseils, guides et stratégies pour développer votre activité en ligne. SEO & GEO, marketing digital, création de site web et réservation en ligne pour entrepreneurs.',
  en: 'Tips, guides and strategies to grow your business online. SEO & GEO, digital marketing, website creation and online booking tips for ambitious entrepreneurs.',
  es: 'Consejos, guías y estrategias para desarrollar tu negocio en línea. SEO & GEO, marketing digital, creación de sitios web y reservas en línea para emprendedores.',
}

const allLabels: Record<string, string> = { fr: 'Tous', en: 'All', es: 'Todos' }
const noPostsLabels: Record<string, string> = {
  fr: 'Aucun article dans cette catégorie.',
  en: 'No articles in this category.',
  es: 'No hay artículos en esta categoría.',
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

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = getMessages(locale as Locale).blog
  const posts = getBlogPosts(locale as Locale)
  const categories = getBlogCategories(locale as Locale)

  const collectionJsonLd = jsonLdCollectionPage(
    `https://mindzy.me/${locale}/blog`,
    blogDescriptions[locale] ? `Blog Mindzy` : 'Blog Mindzy',
    blogDescriptions[locale] || blogDescriptions.fr,
    posts.slice(0, 10).map(p => ({
      url: `https://mindzy.me/${locale}/blog/${p.slug}`,
      name: p.title,
    }))
  )

  const bcLabels: Record<string, { home: string; blog: string }> = {
    fr: { home: 'Accueil', blog: 'Blog' },
    en: { home: 'Home', blog: 'Blog' },
    es: { home: 'Inicio', blog: 'Blog' },
  }
  const bc = bcLabels[locale] || bcLabels.fr
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: bc.home, url: `https://mindzy.me/${locale}` },
    { name: bc.blog, url: `https://mindzy.me/${locale}/blog` },
  ])

  return (
    <div className="pt-32 pb-24">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Blog</p>
          <h1 className="heading-2 text-anthracite mb-4 text-balance">{t.title}</h1>
          <p className="body-large max-w-2xl mx-auto text-pretty">{t.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="divider mb-10" />

        <Suspense>
          <BlogCategoryFilter
            categories={categories}
            allLabel={allLabels[locale] || 'All'}
            totalCount={posts.length}
          />
          <BlogPostsGrid
            posts={posts}
            locale={locale}
            readTimeLabel={t.readTime}
            readMoreLabel={t.readMore}
            noPostsLabel={noPostsLabels[locale] || noPostsLabels.fr}
          />
        </Suspense>
      </div>
    </div>
  )
}
