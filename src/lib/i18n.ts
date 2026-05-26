// Translation locales — have full content dictionaries
export const locales = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ru'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

// All router locales — same as locales (all have full translations)
export const routerLocales = locales
export type RouterLocale = Locale
export function isValidRouterLocale(locale: string): locale is RouterLocale {
  return isValidLocale(locale)
}
// Map any router locale to its translation locale
export function toLocale(locale: RouterLocale): Locale {
  return locale
}
