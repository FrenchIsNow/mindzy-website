import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getBlogPostsByCategory, getBlogCategories } from '@/lib/blog'
import { buildPageMetadata, jsonLdBreadcrumb, JsonLd } from '@/lib/seo'
import { getMessages } from '@/lib/getMessages'
import { locales, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  const params: { locale: string; category: string }[] = []
  for (const locale of locales) {
    const categories = getBlogCategories(locale)
    for (const { name } of categories) {
      params.push({ locale, category: name })
    }
  }
  return params
}

const categoryMeta: Record<string, Record<string, { title: string; description: string }>> = {
  seo: {
    fr: { title: 'Articles SEO & GEO — Mindzy Blog', description: 'Conseils et guides SEO pour améliorer votre visibilité sur Google et les moteurs IA.' },
    en: { title: 'SEO & GEO Articles — Mindzy Blog', description: 'Tips and guides to improve your visibility on Google and AI search engines.' },
    es: { title: 'Artículos SEO & GEO — Blog de Mindzy', description: 'Consejos y guías SEO para mejorar tu visibilidad en Google y los motores de búsqueda IA.' },
  },
  marketing: {
    fr: { title: 'Articles Marketing Digital — Mindzy Blog', description: 'Stratégies et conseils marketing pour développer votre activité en ligne.' },
    en: { title: 'Digital Marketing Articles — Mindzy Blog', description: 'Marketing strategies and tips to grow your business online.' },
    es: { title: 'Artículos de Marketing Digital — Blog de Mindzy', description: 'Estrategias y consejos de marketing para desarrollar tu negocio en línea.' },
  },
  business: {
    fr: { title: 'Articles Business — Mindzy Blog', description: 'Conseils business pour entrepreneurs et indépendants.' },
    en: { title: 'Business Articles — Mindzy Blog', description: 'Business advice for entrepreneurs and freelancers.' },
    es: { title: 'Artículos de Negocios — Blog de Mindzy', description: 'Consejos de negocios para emprendedores e independientes.' },
  },
  branding: {
    fr: { title: 'Articles Branding & Identité Visuelle — Mindzy Blog', description: 'Guides sur le branding, le logo et l\'identité visuelle pour entrepreneurs.' },
    en: { title: 'Branding & Visual Identity Articles — Mindzy Blog', description: 'Guides on branding, logo and visual identity for entrepreneurs.' },
    es: { title: 'Artículos de Branding e Identidad Visual — Blog de Mindzy', description: 'Guías sobre branding, logo e identidad visual para emprendedores.' },
  },
  sante: {
    fr: { title: 'Articles Santé & Bien-être — Mindzy Blog', description: 'Conseils web pour thérapeutes, praticiens de santé et professionnels du bien-être.' },
    en: { title: 'Health & Wellness Articles — Mindzy Blog', description: 'Web tips for therapists, health practitioners and wellness professionals.' },
    es: { title: 'Artículos de Salud y Bienestar — Blog de Mindzy', description: 'Consejos web para terapeutas, profesionales de salud y bienestar.' },
  },
}

const categoryColors: Record<string, 'default' | 'primary' | 'success' | 'violet'> = {
  seo: 'primary',
  marketing: 'success',
  business: 'violet',
  branding: 'default',
  sante: 'primary',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params
  const meta = categoryMeta[category]?.[locale] || categoryMeta[category]?.fr
  if (!meta) return { title: category }
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/blog/category/${category}`,
    title: meta.title,
    description: meta.description,
  })
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params
  const posts = getBlogPostsByCategory(locale as Locale, category)
  if (posts.length === 0) notFound()

  const t = getMessages(locale as Locale).blog
  const meta = categoryMeta[category]?.[locale] || categoryMeta[category]?.fr

  const bcLabels: Record<string, { home: string; blog: string }> = {
    fr: { home: 'Accueil', blog: 'Blog' },
    en: { home: 'Home', blog: 'Blog' },
    es: { home: 'Inicio', blog: 'Blog' },
  }
  const bc = bcLabels[locale] || bcLabels.fr
  const breadcrumbJsonLd = jsonLdBreadcrumb([
    { name: bc.home, url: `https://mindzy.me/${locale}` },
    { name: bc.blog, url: `https://mindzy.me/${locale}/blog` },
    { name: category, url: `https://mindzy.me/${locale}/blog/category/${category}` },
  ])

  return (
    <div className="pt-32 pb-20">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container-wide">
        <div className="mb-6">
          <Link href={`/${locale}/blog`}>
            <Button variant="ghost" size="sm">← {getMessages(locale as Locale).common.back}</Button>
          </Link>
        </div>
        <div className="text-center mb-12">
          <Badge variant={categoryColors[category] || 'default'} size="sm" className="mb-4">{category}</Badge>
          <h1 className="heading-2 text-anthracite mb-4">{meta?.title || category}</h1>
          <p className="body-large max-w-2xl mx-auto">{meta?.description}</p>
          <p className="text-sm text-gray-500 mt-2">{posts.length} article{posts.length > 1 ? 's' : ''}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <Card variant="outline" hover className="h-full">
                <div className="aspect-video bg-gray-50 rounded-t-xl overflow-hidden relative">
                  {post.image.endsWith('.svg') ? (
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
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
