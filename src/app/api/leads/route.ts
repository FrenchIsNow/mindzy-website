import { NextResponse } from 'next/server'

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

const KNOWN_FIELDS = ['profileType', 'fullName', 'email', 'phone', 'message', 'locale'] as const

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { profileType, fullName, email, phone } = body
    if (!profileType || !fullName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const quizAnswers: Record<string, string> = {}
    for (const [key, value] of Object.entries(body)) {
      if (!KNOWN_FIELDS.includes(key as (typeof KNOWN_FIELDS)[number]) && typeof value === 'string') {
        quizAnswers[key] = value
      }
    }

    const payload = {
      timestamp: new Date().toISOString(),
      profileType,
      fullName,
      email,
      phone,
      message: body.message || '',
      locale: body.locale || 'fr',
      ...quizAnswers,
    }

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.warn('[Leads API] GOOGLE_SHEETS_WEBHOOK_URL not configured — logging lead locally')
      console.log('[Leads API] Lead received:', JSON.stringify(payload, null, 2))
      return NextResponse.json({ success: true, warning: 'Stored locally only — Google Sheets not configured' })
    }

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('[Leads API] Google Sheets webhook error:', response.status, text)
      return NextResponse.json({ error: 'Failed to save data' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Leads API] Lead submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
