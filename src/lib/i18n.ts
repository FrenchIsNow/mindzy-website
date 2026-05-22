// Translation locales — have full content dictionaries (fr/en/es)
export const locales = ['fr', 'en', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

// All router locales — used for URL routing and generateStaticParams
export const routerLocales = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ru'] as const
export type RouterLocale = (typeof routerLocales)[number]
export function isValidRouterLocale(locale: string): locale is RouterLocale {
  return routerLocales.includes(locale as RouterLocale)
}
// Map any router locale to its translation locale (new locales fall back to English)
export function toLocale(locale: RouterLocale): Locale {
  return isValidLocale(locale) ? locale : 'en'
}
