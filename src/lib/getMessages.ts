import type { Locale } from './i18n'

import fr from '@/messages/fr.json'
import en from '@/messages/en.json'
import es from '@/messages/es.json'

const messages = { fr, en, es } as const

export function getMessages(locale: Locale) {
  return messages[locale]
}

export type Messages = ReturnType<typeof getMessages>
export type WhyUsMessages = Messages['whyUs']
export type WhyMindzyMessages = Messages['whyMindzy']
