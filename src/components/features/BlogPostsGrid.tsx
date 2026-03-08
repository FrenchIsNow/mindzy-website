'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { BlogPostMeta } from '@/lib/blog'

interface BlogPostsGridProps {
  posts: BlogPostMeta[]
  locale: string
  readTimeLabel: string
  readMoreLabel: string
  noPostsLabel: string
}

const categoryColors: Record<string, 'default' | 'primary' | 'success' | 'violet'> = {
  seo: 'primary',
  marketing: 'success',
  business: 'violet',
  branding: 'default',
  sante: 'primary',
}

function BlogCardFeatured({ post, locale, readTimeLabel, readMoreLabel }: { post: BlogPostMeta; locale: string; readTimeLabel: string; readMoreLabel: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="block group">
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 cursor-pointer">
        {/* Image */}
        <div className="aspect-[16/10] lg:aspect-auto bg-gray-50 overflow-hidden relative">
          {post.image.endsWith('.svg') ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full min-h-[240px] flex items-center justify-center bg-gradient-to-br from-violet-50 to-cream-50">
              <svg className="w-16 h-16 text-violet/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={categoryColors[post.category] || 'default'} size="sm" className="capitalize">
              {post.category}
            </Badge>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} {readTimeLabel}
            </span>
          </div>

          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-anthracite tracking-tight leading-tight mb-3 group-hover:text-violet transition-colors duration-200">
            {post.title}
          </h2>

          <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <time className="text-sm text-gray-400">{post.date}</time>
            <span className="text-violet font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
              {readMoreLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function BlogCard({ post, locale, readTimeLabel, readMoreLabel }: { post: BlogPostMeta; locale: string; readTimeLabel: string; readMoreLabel: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="block group h-full">
      <article className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 cursor-pointer flex flex-col">
        {/* Image */}
        <div className="aspect-[16/10] bg-gray-50 overflow-hidden relative shrink-0">
          {post.image.endsWith('.svg') ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-cream-50">
              <svg className="w-12 h-12 text-violet/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2.5 mb-3">
            <Badge variant={categoryColors[post.category] || 'default'} size="sm" className="capitalize">
              {post.category}
            </Badge>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} {readTimeLabel}
            </span>
          </div>

          <h3 className="font-display text-lg font-semibold text-anthracite tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-violet transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <time className="text-xs text-gray-400">{post.date}</time>
            <span className="text-violet font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              {readMoreLabel}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export function BlogPostsGrid({ posts, locale, readTimeLabel, readMoreLabel, noPostsLabel }: BlogPostsGridProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''

  const filtered = activeCategory ? posts.filter(p => p.category === activeCategory) : posts

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-500 text-lg">{noPostsLabel}</p>
      </div>
    )
  }

  const [featured, ...rest] = filtered

  return (
    <div className="space-y-8">
      {/* Featured (first) post — editorial wide card */}
      {featured && (
        <BlogCardFeatured
          post={featured}
          locale={locale}
          readTimeLabel={readTimeLabel}
          readMoreLabel={readMoreLabel}
        />
      )}

      {/* Remaining posts — 3-column grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readTimeLabel={readTimeLabel}
              readMoreLabel={readMoreLabel}
            />
          ))}
        </div>
      )}
    </div>
  )
}
