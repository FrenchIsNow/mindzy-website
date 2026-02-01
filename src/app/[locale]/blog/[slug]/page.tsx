import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import { blogPosts } from '@/lib/config'
import type { Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return blogPosts.flatMap((post) => ['fr', 'en', 'es'].map((locale) => ({ locale, slug: post.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: 'Article' }
  return { title: post.title[locale as Locale], description: post.excerpt[locale as Locale] }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()
  const t = copy[locale as Locale].blog
  return (
    <div className="pt-32 pb-20">
      <article className="container-narrow">
        <div className="mb-8"><Link href={`/${locale}/blog`}><Button variant="ghost" size="sm">← {copy[locale as Locale].common.back}</Button></Link></div>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4"><Badge variant="primary">{post.category}</Badge><span className="text-sm text-gray-500">{post.readingTime} {t.readTime}</span></div>
          <h1 className="heading-2 text-anthracite mb-4">{post.title[locale as Locale]}</h1>
          <p className="body-large">{post.excerpt[locale as Locale]}</p>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100"><div className="w-10 h-10 rounded-full bg-violet/10 flex items-center justify-center text-violet font-semibold text-sm">M</div><div><div className="font-medium text-anthracite">{post.author}</div><div className="text-sm text-gray-500">{post.date}</div></div></div>
        </header>
        <div className="aspect-video bg-gray-100 rounded-2xl mb-12 flex items-center justify-center text-gray-400"><svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
        <div className="prose prose-lg max-w-none"><p className="lead">{post.excerpt[locale as Locale]}</p><h2>Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><h2>Points clés</h2><ul><li>Premier point</li><li>Deuxième point</li><li>Troisième point</li></ul><h2>Conclusion</h2><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p></div>
        <footer className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-gray-600">Vous avez aimé cet article ?</p><Link href={`/${locale}/diagnostic`}><Button variant="primary" size="md">{copy[locale as Locale].hero.cta}</Button></Link></footer>
      </article>
    </div>
  )
}
