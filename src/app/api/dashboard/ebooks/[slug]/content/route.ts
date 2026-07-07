import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import { getEbookContent, listEbookContentForSlug, upsertEbookContent } from '@/lib/db'
import { getEbook } from '@/lib/ebooks'

export const runtime = 'nodejs'

/**
 * GET: returns the merged content for all locales (DB override → static fallback).
 * Response: { locales: { fr: {...}, en: {...}, es: {...} } }
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const rows = await listEbookContentForSlug(slug)
  const staticEbook = getEbook(slug)

  const byLocale: Record<string, unknown> = {}
  for (const locale of ['fr', 'en', 'es'] as const) {
    const db = rows.find(r => r.locale === locale)
    const s = staticEbook
    byLocale[locale] = {
      slug,
      locale,
      title: db?.title ?? s?.title[locale] ?? '',
      subtitle: db?.subtitle ?? s?.subtitle?.[locale] ?? '',
      excerpt: db?.excerpt ?? s?.excerpt[locale] ?? '',
      category: db?.category ?? s?.category ?? '',
      tags: db?.tags ?? s?.tags ?? [],
      imageUrl: db?.image_url ?? s?.image ?? '',
      pdfUrl: db?.pdf_url ?? null,
      pages: db?.pages ?? s?.pages ?? null,
      readingTime: db?.reading_time ?? null,
      chapters: db?.chapters ?? s?.chapters?.[locale] ?? [],
      features: db?.features ?? s?.features?.[locale] ?? [],
      stats: db?.stats ?? s?.stats?.[locale] ?? [],
      testimonial: db?.testimonial ?? s?.testimonial?.[locale] ?? null,
      isDbOnly: db?.is_db_only ?? !staticEbook,
      hasDbOverride: Boolean(db),
      htmlContent: db?.html_content ?? '',
      articleUrl: db?.article_url ?? '',
    }
  }
  return NextResponse.json({ locales: byLocale })
}

/**
 * PUT: upserts ebook content for a specific locale.
 * Body: { locale, title, subtitle, excerpt, category, tags, imageUrl, pdfUrl, pages, readingTime, chapters, features, stats, testimonial, htmlContent, articleUrl }
 */
export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized
  const { slug } = await params
  const body = (await req.json().catch(() => null)) as {
    locale?: string
    [k: string]: unknown
  } | null
  if (!body?.locale || !['fr', 'en', 'es'].includes(body.locale)) {
    return NextResponse.json({ error: 'locale must be fr|en|es' }, { status: 400 })
  }

  const isDbOnly = !getEbook(slug)

  await upsertEbookContent({
    slug,
    locale: body.locale,
    title: body.title as string | null,
    subtitle: body.subtitle as string | null,
    excerpt: body.excerpt as string | null,
    category: body.category as string | null,
    tags: body.tags as string[] | null,
    imageUrl: body.imageUrl as string | null,
    pdfUrl: body.pdfUrl as string | null,
    pages: body.pages as number | null,
    readingTime: body.readingTime as number | null,
    chapters: body.chapters as { num: string; title: string }[] | null,
    features: body.features as { num: string; label: string; title: string; desc: string }[] | null,
    stats: body.stats as { value: string; label: string }[] | null,
    testimonial: body.testimonial as { quote: string; author: string; role: string } | null,
    metaTitle: body.metaTitle as string | null,
    metaDescription: body.metaDescription as string | null,
    geoMetadata: body.geoMetadata as Record<string, unknown> | null,
    htmlContent: body.htmlContent as string | null,
    articleUrl: body.articleUrl as string | null,
    isDbOnly,
  })

  // Check if existing content in other locales needs to be upgraded to is_db_only consistency.
  // Keep this lazy: we only set is_db_only when inserting; reads fall back to static when needed.

  return NextResponse.json({ ok: true })
}
