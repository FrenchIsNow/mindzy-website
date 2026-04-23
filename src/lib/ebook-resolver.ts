import { getEbook, type Ebook, type EbookChapter, type EbookFeature, type EbookStat, type EbookTestimonial } from './ebooks'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { listEbookContentForSlug, listDbOnlyEbookSlugs, getCatalogEntry, type EbookContent, type CatalogEntry } from './db'
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

/**
 * Resolves pricing for an ebook. DB catalog wins over the static `.free` flag.
 * Returns effective price (post-promo if code matches), original price for strikethrough,
 * and an is_free flag so templates can render the correct badge.
 */
export async function resolveEbookPricing(slug: string, opts?: { staticFree?: boolean }) {
  let entry: CatalogEntry | null = null
  if (process.env.DATABASE_URL) {
    try {
      entry = await getCatalogEntry(slug)
    } catch {
      entry = null
    }
  }
  const isFree = entry ? entry.is_free : (opts?.staticFree ?? true)
  return {
    isFree,
    priceCents: entry?.price_cents ?? null,
    originalPriceCents: entry?.original_price_cents ?? null,
    currency: entry?.currency ?? 'eur',
    promoCode: entry?.promo_code ?? null,
    promoDiscountPct: entry?.promo_discount_pct ?? null,
    promoExpiresAt: entry?.promo_expires_at ?? null,
    hasUpsell: entry?.has_upsell ?? false,
    upsellSlug: entry?.upsell_slug ?? null,
    upsellPriceCents: entry?.upsell_price_cents ?? null,
    stripePriceId: entry?.stripe_price_id ?? null,
  }
}

export async function getAllResolvedEbookSlugs(): Promise<string[]> {
  const fromStatic = (await import('./ebooks')).getAllEbookSlugs()
  // Build-time safety: if DATABASE_URL isn't set or the DB is unreachable,
  // fall back to static slugs only. DB-only ebooks will render on first visit
  // thanks to `dynamicParams = true` on the page.
  if (!process.env.DATABASE_URL) return fromStatic
  try {
    const dbOnly = await listDbOnlyEbookSlugs()
    return Array.from(new Set([...fromStatic, ...dbOnly]))
  } catch {
    return fromStatic
  }
}
