import type { Locale } from './i18n'

export interface Plan {
  id: 'basic' | 'pro' | 'business' | 'ecommerce'
  price: number
  setup: number
  pages: number
  articles: number
  booking: boolean
  payments: boolean
  products: number
  gmb: boolean
}

export interface PortfolioItem {
  id: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  category: 'therapist' | 'clinic' | 'coach' | 'ecom'
  profession: string
  image: string
  url?: string
  featured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  profession: Record<Locale, string>
  quote: Record<Locale, string>
  rating: number
}

export interface BlogPost {
  slug: string
  title: Record<Locale, string>
  excerpt: Record<Locale, string>
  category: string
  author: string
  date: string
  image: string
  readingTime: number
}

export interface FAQItem {
  id: string
  question: Record<Locale, string>
  answer: Record<Locale, string>
  category: 'general' | 'pricing' | 'technical' | 'support' | 'features' | 'process'
}

export interface DiagnosticQuestion {
  id: string
  question: Record<Locale, string>
  options: { value: string; label: Record<Locale, string>; score: number }[]
}

export interface DiagnosticResult {
  score: number
  level: 'low' | 'medium' | 'high'
  message: Record<Locale, string>
  recommendation: Plan['id']
}

export interface OnboardingStep {
  id: string
  question: Record<Locale, string>
  options: { value: string; label: Record<Locale, string>; icon?: string }[]
}

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
}

export interface ChatState {
  messages: ChatMessage[]
  step: 'initial' | 'diagnostic' | 'meeting' | 'whatsapp' | 'completed'
  isTyping: boolean
}

export interface WhatsAppInteractive {
  type: 'button' | 'list'
  header?: { type: 'text'; text: string }
  body: { text: string }
  footer?: { text: string }
  action: { buttons?: { type: 'reply'; reply: { id: string; title: string } }[]; button?: string; sections?: unknown[] }
}

export interface WhatsAppWebhookPayload {
  object: string
  entry?: { id: string; changes?: { value?: { messages?: WhatsAppIncomingMessage[] }; field: string }[] }[]
}

export interface WhatsAppIncomingMessage {
  from: string
  id: string
  timestamp: string
  type: string
  text?: { body: string }
  interactive?: { button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } }
  button?: { payload: string; text: string }
}

export interface Resource {
  id: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  type: string
  downloadUrl: string
  image: string
}

export interface BeforeAfterExample {
  id: string
  title: Record<Locale, string>
  profession: string
  before: { image: string; issues: Record<Locale, string[]> }
  after: { image: string; improvements: Record<Locale, string[]> }
  metrics: { label: Record<Locale, string>; value: string }[]
}
