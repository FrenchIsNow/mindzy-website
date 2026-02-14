import type { ChatMessage, ChatState } from './types'
import type { Locale } from './i18n'
import { getMessages } from './getMessages'

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
  return getMessages(locale).chatbot.welcome
}

export function processUserInput(input: string, locale: Locale): ConversationResponse {
  const lower = input.toLowerCase()
  const isCustomProject = lower.includes('application') || lower.includes('app') || lower.includes('mobile') || lower.includes('saas') || lower.includes('plateforme') || lower.includes('platform') || lower.includes('cross') || lower.includes('sur-mesure') || lower.includes('custom') || lower.includes('dashboard')
  if (isCustomProject) {
    const msg = locale === 'fr' ? 'Vous avez un projet d\'application sur-mesure ? Faites notre diagnostic spécialisé pour évaluer la maturité de votre projet.' : locale === 'en' ? 'You have a custom app project? Take our specialized diagnostic to evaluate your project maturity.' : '¿Tiene un proyecto de aplicación personalizada? Haga nuestro diagnóstico especializado para evaluar la madurez de su proyecto.'
    const label = locale === 'fr' ? 'Diagnostic projet sur-mesure' : locale === 'en' ? 'Custom project diagnostic' : 'Diagnóstico proyecto personalizado'
    return { message: msg, nextStep: 'diagnostic', actions: [{ type: 'link', label, url: `/${locale}/diagnostic?profile=custom` }] }
  }
  if (lower.includes('diagnostic') || lower.includes('audit')) return { message: getMessages(locale).chatbot.responses.diagnostic, nextStep: 'diagnostic', actions: [{ type: 'link', label: getMessages(locale).chatbot.buttons.startDiagnostic, url: `/${locale}/diagnostic` }] }
  if (lower.includes('rdv') || lower.includes('meeting') || lower.includes('rendez-vous')) return { message: getMessages(locale).chatbot.responses.meeting, nextStep: 'meeting', actions: [{ type: 'link', label: getMessages(locale).chatbot.buttons.bookMeeting, url: 'https://calendar.app.google/7ccvgBKCiRJgLXKL7' }] }
  if (lower.includes('whatsapp')) return { message: getMessages(locale).chatbot.responses.whatsapp, nextStep: 'whatsapp' }
  return { message: getMessages(locale).chatbot.responses.default, nextStep: 'initial' }
}

export function createMessage(text: string, sender: 'user' | 'bot'): ChatMessage {
  return { id: Date.now().toString(), text, sender }
}

export function createInitialState(): ChatState {
  return { messages: [], step: 'initial', isTyping: false }
}
