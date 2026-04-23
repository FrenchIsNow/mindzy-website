import { NextResponse } from 'next/server'

// POST /api/funnel/lead — captures email leads from exit-intent popup.
// Wire up to Resend / Mailchimp / your CRM here.

export async function POST(req: Request) {
  try {
    const { email, slug, source } = await req.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    console.log('[Funnel Lead]', { email, slug, source })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Funnel Lead] Error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
