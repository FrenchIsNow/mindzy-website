import type { WhatsAppWebhookPayload, WhatsAppIncomingMessage, WhatsAppInteractive } from './types'

const WHATSAPP_API_URL = 'https://graph.facebook.com'

function getConfig() {
  return {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    apiVersion: process.env.WHATSAPP_API_VERSION || 'v18.0',
  }
}

export async function sendTextMessage(to: string, text: string): Promise<boolean> {
  const config = getConfig()
  if (!config.phoneNumberId || !config.accessToken) return false
  try {
    const res = await fetch(`${WHATSAPP_API_URL}/${config.apiVersion}/${config.phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', to, type: 'text', text: { body: text } }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function sendTemplateMessage(to: string, templateName: string, languageCode = 'fr'): Promise<boolean> {
  const config = getConfig()
  if (!config.phoneNumberId || !config.accessToken) return false
  try {
    const res = await fetch(`${WHATSAPP_API_URL}/${config.apiVersion}/${config.phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', to, type: 'template', template: { name: templateName, language: { code: languageCode } } }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function sendInteractiveMessage(to: string, interactive: WhatsAppInteractive): Promise<boolean> {
  const config = getConfig()
  if (!config.phoneNumberId || !config.accessToken) return false
  try {
    const res = await fetch(`${WHATSAPP_API_URL}/${config.apiVersion}/${config.phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', recipient_type: 'individual', to, type: 'interactive', interactive }),
    })
    return res.ok
  } catch {
    return false
  }
}

export function verifyWebhook(mode: string | null, token: string | null, challenge: string | null): string | null {
  return mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN ? challenge : null
}

export function parseWebhookPayload(payload: WhatsAppWebhookPayload): WhatsAppIncomingMessage | null {
  try {
    const value = payload.entry?.[0]?.changes?.[0]?.value
    return value?.messages?.[0] ?? null
  } catch {
    return null
  }
}

export function getMessageText(message: WhatsAppIncomingMessage): string | null {
  if (message.type === 'text') return message.text?.body ?? null
  if (message.type === 'interactive') return message.interactive?.button_reply?.title ?? message.interactive?.list_reply?.title ?? null
  if (message.type === 'button') return message.button?.text ?? null
  return null
}

export async function processIncomingMessage(message: WhatsAppIncomingMessage): Promise<string> {
  const text = (getMessageText(message) ?? '').toLowerCase()
  if (text.includes('diagnostic') || text.includes('audit')) return 'Faites votre diagnostic : https://mindzy.me/fr/diagnostic'
  if (text.includes('prix') || text.includes('tarif')) return 'Tarifs : https://mindzy.me/fr/pricing — à partir de 49€/mois HT.'
  if (text.includes('rdv') || text.includes('meeting')) return 'Réservez un créneau : https://calendly.com/mindzy/consultation'
  if (text.includes('bonjour') || text.includes('hello')) return 'Bonjour ! Tapez "diagnostic", "prix" ou "rdv" pour en savoir plus.'
  return 'Merci pour votre message. Tapez "diagnostic", "prix" ou "rdv", ou visitez https://mindzy.me'
}
