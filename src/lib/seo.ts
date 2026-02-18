import type { Metadata } from 'next'
import type { Locale } from './i18n'
import { locales } from './i18n'

const SITE_URL = 'https://mindzy.me'
const SITE_NAME = 'Mindzy'

const localeMap: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
}

export function buildCanonicalUrl(locale: Locale, path = ''): string {
  return `${SITE_URL}/${locale}${path}`
}

export function buildAlternates(locale: Locale, path = '') {
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${path}`
  }
  languages['x-default'] = `${SITE_URL}/fr${path}`
  return {
    canonical: buildCanonicalUrl(locale, path),
    languages,
  }
}

interface PageSeoParams {
  locale: Locale
  path?: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
}

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  image,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  section,
}: PageSeoParams): Metadata {
  const url = buildCanonicalUrl(locale, path)
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : undefined

  const metadata: Metadata = {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: localeMap[locale],
      alternateLocale: locales.filter(l => l !== locale).map(l => localeMap[l]),
      type: type === 'article' ? 'article' : 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }

  if (noIndex) {
    metadata.robots = { index: false, follow: false }
  }

  return metadata
}

export function jsonLdOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@mindzy.me',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Spanish'],
    },
    sameAs: ['https://linkedin.com/company/mindzy'],
  }
}

export function jsonLdWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['fr', 'en', 'es'],
  }
}

export function jsonLdLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: 'Agence de création de sites web professionnels pour entrepreneurs',
    email: 'contact@mindzy.me',
    priceRange: '€€',
    areaServed: {
      '@type': 'GeoShape',
      name: 'Europe',
    },
    knowsLanguage: ['fr', 'en', 'es'],
  }
}

interface BlogPostJsonLd {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
}

export function jsonLdBlogPosting({ title, description, url, image, datePublished, dateModified, author }: BlogPostJsonLd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}

interface FaqJsonLdItem {
  question: string
  answer: string
}

export function jsonLdFaqPage(items: FaqJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function jsonLdBreadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

interface ServiceOffer {
  name: string
  description: string
  price: number
  priceCurrency?: string
}

export function jsonLdService(offers: ServiceOffer[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: 'Web Design',
    areaServed: 'Europe',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design Plans',
      itemListElement: offers.map(offer => ({
        '@type': 'Offer',
        name: offer.name,
        description: offer.description,
        price: offer.price,
        priceCurrency: offer.priceCurrency || 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: offer.price,
          priceCurrency: offer.priceCurrency || 'EUR',
          unitText: 'MONTH',
        },
      })),
    },
  }
}

interface ReviewItem {
  name: string
  reviewBody: string
  ratingValue: number
}

export function jsonLdAggregateRating(reviews: ReviewItem[]) {
  const avg = reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviews.length
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Math.round(avg * 10) / 10,
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviews.length,
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Organization', name: r.name },
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.ratingValue,
        bestRating: 5,
      },
    })),
  }
}

export { JsonLd } from '@/components/ui/JsonLd'
