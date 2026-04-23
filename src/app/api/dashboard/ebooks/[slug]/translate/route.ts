import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { getEbookContent, upsertEbookContent } from '@/lib/db'
import { getEbook } from '@/lib/ebooks'
import { translateJson, type Locale } from '@/lib/translate'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * Translates the FR content into the target locale and upserts it.
 * Body: { targetLocale: 'en' | 'es' }
 */
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const body = (await req.json().catch(() => null)) as { targetLocale?: Locale } | null
  if (!body?.targetLocale || !['en', 'es'].includes(body.targetLocale)) {
    return NextResponse.json({ error: 'targetLocale must be "en" or "es"' }, { status: 400 })
  }

  // Source = FR content: DB override → static fallback.
  const frDb = await getEbookContent(slug, 'fr')
  const staticEbook = getEbook(slug)

  if (!frDb && !staticEbook) {
    return NextResponse.json({ error: 'No FR content to translate from' }, { status: 404 })
  }

  const source = {
    title: frDb?.title ?? staticEbook?.title.fr ?? '',
    subtitle: frDb?.subtitle ?? staticEbook?.subtitle?.fr ?? '',
    excerpt: frDb?.excerpt ?? staticEbook?.excerpt.fr ?? '',
    category: frDb?.category ?? staticEbook?.category ?? '',
    chapters: frDb?.chapters ?? staticEbook?.chapters?.fr ?? [],
    features: frDb?.features ?? staticEbook?.features?.fr ?? [],
    stats: frDb?.stats ?? staticEbook?.stats?.fr ?? [],
    testimonial: frDb?.testimonial ?? staticEbook?.testimonial?.fr ?? null,
  }

  let translated: typeof source
  try {
    translated = await translateJson(source, 'fr', body.targetLocale, {
      context: `This is landing-page copy for an ebook titled "${source.title}". Keep marketing tone, professional, concise.`,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Translation failed' },
      { status: 502 },
    )
  }

  // Preserve non-translatable fields from FR (images, PDF, numbers).
  const frForNonText = frDb ?? null
  await upsertEbookContent({
    slug,
    locale: body.targetLocale,
    title: translated.title,
    subtitle: translated.subtitle,
    excerpt: translated.excerpt,
    category: translated.category || source.category,
    tags: frForNonText?.tags ?? staticEbook?.tags ?? [],
    imageUrl: frForNonText?.image_url ?? staticEbook?.image ?? null,
    pdfUrl: frForNonText?.pdf_url ?? null,
    pages: frForNonText?.pages ?? staticEbook?.pages ?? null,
    readingTime: frForNonText?.reading_time ?? null,
    chapters: translated.chapters,
    features: translated.features,
    stats: translated.stats,
    testimonial: translated.testimonial,
    isDbOnly: !staticEbook,
  })

  return NextResponse.json({ ok: true, targetLocale: body.targetLocale })
}
