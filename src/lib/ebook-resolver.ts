import { getEbook, type Ebook, type EbookChapter, type EbookFeature, type EbookStat, type EbookTestimonial } from './ebooks'
import { listEbookContentForSlug, listDbOnlyEbookSlugs, type EbookContent } from './db'
import type { Locale } from './i18n'

const LOCALES: Locale[] = ['fr', 'en', 'es']

/**
 * Resolves an ebook for the public page by merging DB content over static data.
 * Returns an Ebook-shaped object so the rendering code doesn't change.
 */
export async function resolvePublicEbook(slug: string): Promise<Ebook | null> {
  const staticEbook = getEbook(slug)
  const dbRows = await listEbookContentForSlug(slug)

  if (!staticEbook && dbRows.length === 0) return null

  const byLocale = new Map<string, EbookContent>(dbRows.map(r => [r.locale, r]))

  const merge = <T>(
    field: 'title' | 'subtitle' | 'excerpt',
    fallback: Record<Locale, string> | undefined,
    defaultValue: T,
  ): Record<Locale, string> => {
    const out: Record<string, string> = {}
    for (const l of LOCALES) {
      const db = byLocale.get(l)?.[field]
      out[l] = db ?? fallback?.[l] ?? fallback?.fr ?? (defaultValue as unknown as string) ?? ''
    }
    return out as Record<Locale, string>
  }

  const mergeArr = <K extends 'chapters' | 'features' | 'stats'>(
    field: K,
    fallback: Record<Locale, EbookContent[K] extends Array<infer _R> | null ? EbookContent[K] extends null ? never : EbookContent[K] : never> | undefined,
  ): Record<Locale, EbookContent[K] extends null ? never : NonNullable<EbookContent[K]>> => {
    const out: Record<string, unknown> = {}
    for (const l of LOCALES) {
      const db = byLocale.get(l)?.[field]
      out[l] = db ?? fallback?.[l] ?? fallback?.fr ?? []
    }
    return out as Record<Locale, EbookContent[K] extends null ? never : NonNullable<EbookContent[K]>>
  }

  const mergeTestimonial = (): Record<Locale, EbookTestimonial> => {
    const out: Record<string, EbookTestimonial> = {}
    for (const l of LOCALES) {
      const db = byLocale.get(l)?.testimonial
      out[l] = db ?? staticEbook?.testimonial?.[l] ?? staticEbook?.testimonial?.fr ?? { quote: '', author: '', role: '' }
    }
    return out as Record<Locale, EbookTestimonial>
  }

  const primary = byLocale.get('fr') ?? dbRows[0]

  return {
    slug,
    title: merge('title', staticEbook?.title, slug),
    subtitle: merge('subtitle', staticEbook?.subtitle, ''),
    excerpt: merge('excerpt', staticEbook?.excerpt, ''),
    pages: primary?.pages ?? staticEbook?.pages ?? 0,
    category: primary?.category ?? staticEbook?.category ?? 'seo',
    tags: primary?.tags ?? staticEbook?.tags ?? [],
    image: primary?.image_url ?? staticEbook?.image ?? '/images/ebooks/default.svg',
    publishedDate: staticEbook?.publishedDate ?? primary?.updated_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    downloadCount: staticEbook?.downloadCount ?? 0,
    free: staticEbook?.free ?? true,
    pdfByLocale: staticEbook?.pdfByLocale,
    ctaLink: staticEbook?.ctaLink,
    chapters: mergeArr<'chapters'>('chapters', staticEbook?.chapters as Record<Locale, EbookChapter[]> | undefined) as Record<Locale, EbookChapter[]>,
    features: mergeArr<'features'>('features', staticEbook?.features as Record<Locale, EbookFeature[]> | undefined) as Record<Locale, EbookFeature[]>,
    stats: mergeArr<'stats'>('stats', staticEbook?.stats as Record<Locale, EbookStat[]> | undefined) as Record<Locale, EbookStat[]>,
    testimonial: mergeTestimonial(),
    cardOverride: staticEbook?.cardOverride,
    detailOverride: staticEbook?.detailOverride,
    // PDF URL for DB-only ebooks is the direct Blob URL stored on content.pdf_url
    // We encode it by abusing pdfByLocale so the existing render path reads it.
    ...(primary?.pdf_url && !staticEbook?.pdfByLocale ? { _dbPdfUrl: primary.pdf_url } : {}),
  } as Ebook & { _dbPdfUrl?: string }
}

export async function getAllResolvedEbookSlugs(): Promise<string[]> {
  const staticSlugs = getEbook('') ? [] : []  // placeholder to keep import used
  void staticSlugs
  const dbOnly = await listDbOnlyEbookSlugs()
  const fromStatic = (await import('./ebooks')).getAllEbookSlugs()
  return Array.from(new Set([...fromStatic, ...dbOnly]))
}
