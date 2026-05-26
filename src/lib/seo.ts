import type { Metadata } from 'next'
import type { Locale } from './i18n'
import { locales } from './i18n'

const SITE_URL = 'https://mindzy.me'
const SITE_NAME = 'Mindzy'

const localeMap: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  ar: 'ar_SA',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ru: 'ru_RU',
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
    metadata.robots = { index: false, follow: true }
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
    description:
      'Mindzy designs and builds custom AI infrastructure inside companies — connected to their tools, governed by their rules, and deployed around their real workflows.',
    slogan: 'The custom AI infrastructure built around your company.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@mindzy.me',
      contactType: 'customer service',
      availableLanguage: [
        'French', 'English', 'Spanish', 'German', 'Italian',
        'Portuguese', 'Arabic', 'Chinese', 'Japanese', 'Russian',
      ],
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
    description:
      'Mindzy designs and builds custom AI infrastructure inside companies that want to integrate AI into their operations. No template. No pre-built stack.',
    inLanguage: [...locales],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/en/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

const serviceAreaByLocale: Record<string, { name: string; sameAs: string }[]> = {
  fr: [
    { name: 'France', sameAs: 'https://www.wikidata.org/wiki/Q142' },
    { name: 'Belgique', sameAs: 'https://www.wikidata.org/wiki/Q31' },
    { name: 'Suisse', sameAs: 'https://www.wikidata.org/wiki/Q39' },
    { name: 'Canada', sameAs: 'https://www.wikidata.org/wiki/Q16' },
  ],
  en: [
    { name: 'United Kingdom', sameAs: 'https://www.wikidata.org/wiki/Q145' },
    { name: 'Canada', sameAs: 'https://www.wikidata.org/wiki/Q16' },
    { name: 'United States', sameAs: 'https://www.wikidata.org/wiki/Q30' },
    { name: 'Australia', sameAs: 'https://www.wikidata.org/wiki/Q408' },
  ],
  es: [
    { name: 'España', sameAs: 'https://www.wikidata.org/wiki/Q29' },
    { name: 'México', sameAs: 'https://www.wikidata.org/wiki/Q96' },
    { name: 'Argentina', sameAs: 'https://www.wikidata.org/wiki/Q414' },
    { name: 'Colombia', sameAs: 'https://www.wikidata.org/wiki/Q739' },
  ],
}

const descriptionByLocale: Record<string, string> = {
  fr: "Mindzy conçoit et déploie des infrastructures IA sur mesure à l'intérieur des entreprises — connectées à vos outils, gouvernées par vos règles, déployées autour de vos vrais flux de travail.",
  en: 'Mindzy designs and builds custom AI infrastructure inside companies — connected to your tools, governed by your rules, deployed around your real workflows.',
  es: 'Mindzy diseña e implementa infraestructuras de IA personalizadas dentro de las empresas — conectadas a tus herramientas, gobernadas por tus reglas, desplegadas alrededor de tus flujos de trabajo reales.',
  de: 'Mindzy entwirft und implementiert maßgeschneiderte KI-Infrastrukturen innerhalb von Unternehmen — verbunden mit Ihren Tools, geregelt durch Ihre Regeln, eingesetzt rund um Ihre realen Arbeitsabläufe.',
  it: 'Mindzy progetta e implementa infrastrutture IA personalizzate all\'interno delle aziende — connesse ai tuoi strumenti, governate dalle tue regole, distribuite intorno ai tuoi veri flussi di lavoro.',
  pt: 'A Mindzy projeta e implementa infraestruturas de IA personalizadas dentro das empresas — conectadas às suas ferramentas, governadas pelas suas regras, implantadas em torno dos seus fluxos de trabalho reais.',
  ar: 'تصمم Mindzy وتنشر بنى تحتية مخصصة للذكاء الاصطناعي داخل الشركات — متصلة بأدواتك، تحكمها قواعدك، ومنتشرة حول سير عملك الحقيقي.',
  zh: 'Mindzy 在企业内部设计并部署量身定制的 AI 基础设施——与您的工具无缝连接，遵循您的规则，围绕您的真实工作流程部署。',
  ja: 'Mindzyは企業内にカスタムAIインフラストラクチャを設計・展開します — あなたのツールに接続し、あなたのルールに従い、実際のワークフローに合わせて展開されます。',
  ru: 'Mindzy проектирует и внедряет индивидуальные ИИ-инфраструктуры внутри компаний — подключённые к вашим инструментам, управляемые вашими правилами и развёрнутые вокруг ваших реальных рабочих процессов.',
}

export function jsonLdLocalBusiness(locale = 'fr') {
  const areas = serviceAreaByLocale[locale] || serviceAreaByLocale.fr
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/og-image.png`,
    description: descriptionByLocale[locale] || descriptionByLocale.fr,
    email: 'contact@mindzy.me',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Credit Card, Bank Transfer',
    areaServed: areas.map(area => ({
      '@type': 'Country',
      name: area.name,
      sameAs: area.sameAs,
    })),
    knowsLanguage: [...locales],
    serviceType: [
      'AI Infrastructure',
      'AI Integration',
      'AI Workflow Automation',
      'AI Model Orchestration',
      'AI Governance',
      'Enterprise AI Consulting',
    ],
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
  wordCount?: number
  keywords?: string
  locale?: string
}

export function jsonLdBlogPosting({ title, description, url, image, datePublished, dateModified, author, wordCount, keywords, locale }: BlogPostJsonLd) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: locale || 'fr',
    ...(wordCount && { wordCount }),
    ...(keywords && { keywords }),
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
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.post-excerpt', 'article p:first-of-type'],
    },
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

interface HowToStep {
  name: string
  text: string
  url?: string
}

export function jsonLdHowTo(params: { name: string; description: string; totalTime?: string; steps: HowToStep[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    ...(params.totalTime && { totalTime: params.totalTime }),
    step: params.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
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
    serviceType: 'AI Infrastructure',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Infrastructure Engagements',
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

export function jsonLdCollectionPage(url: string, name: string, description: string, items: { url: string; name: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url,
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: item.url,
      name: item.name,
    })),
  }
}

export function jsonLdSpeakablePage(url: string, cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

export { JsonLd } from '@/components/ui/JsonLd'
