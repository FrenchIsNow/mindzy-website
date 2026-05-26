import type { Locale } from './i18n'

import fr from '@/messages/fr.json'
import en from '@/messages/en.json'
import es from '@/messages/es.json'
import de from '@/messages/de.json'
import it from '@/messages/it.json'
import pt from '@/messages/pt.json'
import ar from '@/messages/ar.json'
import zh from '@/messages/zh.json'
import ja from '@/messages/ja.json'
import ru from '@/messages/ru.json'

const messages = { fr, en, es, de, it, pt, ar, zh, ja, ru } as const

export function getMessages(locale: Locale) {
  return messages[locale]
}

export type Messages = ReturnType<typeof getMessages>
