import { NextRequest, NextResponse } from 'next/server'
import { sendTextMessage } from '@/lib/whatsapp'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const to = typeof body.to === 'string' ? body.to.replace(/\D/g, '') : ''
  const text = typeof body.text === 'string' ? body.text : ''
  if (!to || !text) return NextResponse.json({ ok: false, error: 'to and text required' }, { status: 400 })
  const ok = await sendTextMessage(to, text)
  return NextResponse.json({ ok })
}
