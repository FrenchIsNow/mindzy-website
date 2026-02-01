import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import { blogPosts } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return blogPosts.slice(0, 3).flatMap((post) => ['fr', 'en', 'es'].map((locale) => ({ locale, slug: post.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Formation' }
  return { title: `Formation: ${post.title[locale as Locale]}`, description: post.excerpt[locale as Locale] }
}

export default async function AcademyPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()
  return (
    <div className="pt-32 pb-20">
      <article className="container-narrow">
        <div className="mb-8"><Link href={`/${locale}/academy`}><Button variant="ghost" size="sm">← {copy[locale as Locale].common.back}</Button></Link></div>
        <header className="mb-12"><Badge variant="primary" className="mb-4">Formation</Badge><h1 className="heading-2 text-anthracite mb-4">{post.title[locale as Locale]}</h1><p className="body-large">{post.excerpt[locale as Locale]}</p></header>
        <div className="aspect-video bg-gradient-to-br from-violet/20 to-violet/5 rounded-2xl mb-12 flex items-center justify-center"><div className="text-center"><svg className="w-16 h-16 mx-auto text-violet/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p className="text-violet/70 font-medium">Vidéo de formation</p></div></div>
        <div className="prose prose-lg max-w-none"><h2>Ce que vous allez apprendre</h2><ul><li>Fondamentaux</li><li>Meilleures pratiques</li><li>Exemples concrets</li></ul></div>
        <footer className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-gray-600">Prêt à passer à l&apos;action ?</p><Link href={`/${locale}/diagnostic`}><Button variant="primary" size="md">{copy[locale as Locale].hero.cta}</Button></Link></footer>
      </article>
    </div>
  )
}
