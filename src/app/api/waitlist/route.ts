import { NextResponse } from 'next/server'

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, locale } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheetName: 'AI Waitlist',
          name,
          email,
          company: company || '',
          role: role || '',
          locale: locale || 'fr',
          timestamp: new Date().toISOString(),
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
