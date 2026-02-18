import { NextResponse } from 'next/server'

const WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_CONTACT_FORM_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { fullName, email, phone } = body
    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const payload = {
      sheetName: 'MINDZY_FORM_FILLED',
      timestamp: body.timestamp || new Date().toISOString(),
      profileType: body.profileType || 'pricing-contact',
      fullName,
      email,
      phone,
      message: body.message || '',
      locale: body.locale || 'fr',
      sector: body.business || '',
      plan: body.plan || '',
    }

    if (!WEBHOOK_URL) {
      console.warn('[Contact API] No webhook URL configured — logging locally')
      console.log('[Contact API] Contact received:', JSON.stringify(payload, null, 2))
      return NextResponse.json({ success: true })
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.log('[Contact API] Google Sheets error:', response.status, text)
      return NextResponse.json({ error: 'Failed to save data' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('[Contact API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
