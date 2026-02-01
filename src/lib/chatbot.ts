import type { ChatMessage, ChatState } from './types'
import type { Locale } from './i18n'
import { copy } from './copy'

export type ConversationStep = 'initial' | 'diagnostic' | 'meeting' | 'whatsapp' | 'completed'

export interface ConversationContext {
  locale: Locale
  currentStep: ConversationStep
  userData: { hasWebsite?: boolean; needBooking?: boolean }
}

export interface ConversationResponse {
  message: string
  nextStep: ConversationStep
  actions?: { type: 'link' | 'button'; label: string; url?: string }[]
}

export function getInitialMessage(locale: Locale): string {
  return copy[locale].chatbot.welcome
}

export function processUserInput(input: string, locale: Locale): ConversationResponse {
  const lower = input.toLowerCase()
  if (lower.includes('diagnostic') || lower.includes('audit')) return { message: copy[locale].chatbot.responses.diagnostic, nextStep: 'diagnostic', actions: [{ type: 'link', label: copy[locale].chatbot.buttons.startDiagnostic, url: `/${locale}/diagnostic` }] }
  if (lower.includes('rdv') || lower.includes('meeting') || lower.includes('rendez-vous')) return { message: copy[locale].chatbot.responses.meeting, nextStep: 'meeting', actions: [{ type: 'link', label: copy[locale].chatbot.buttons.bookMeeting, url: 'https://calendly.com/mindzy/consultation' }] }
  if (lower.includes('whatsapp')) return { message: copy[locale].chatbot.responses.whatsapp, nextStep: 'whatsapp' }
  return { message: copy[locale].chatbot.responses.default, nextStep: 'initial' }
}

export function createMessage(text: string, sender: 'user' | 'bot'): ChatMessage {
  return { id: Date.now().toString(), text, sender }
}

export function createInitialState(): ChatState {
  return { messages: [], step: 'initial', isTyping: false }
}
