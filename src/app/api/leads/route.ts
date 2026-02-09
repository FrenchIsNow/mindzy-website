import { NextResponse } from 'next/server'

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

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

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL is not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const payload = {
      timestamp: new Date().toISOString(),
      profileType,
      fullName,
      email,
      phone,
      message: body.message || '',
      locale: body.locale || 'fr',
      ...Object.fromEntries(
        Object.entries(body).filter(
          ([key]) => !['profileType', 'fullName', 'email', 'phone', 'message', 'locale'].includes(key)
        )
      ),
    }

    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Google Sheets webhook error:', text)
      return NextResponse.json({ error: 'Failed to save data' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
