import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhook, parseWebhookPayload, processIncomingMessage, sendTextMessage } from '@/lib/whatsapp'

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('hub.mode')
  const token = request.nextUrl.searchParams.get('hub.verify_token')
  const challenge = request.nextUrl.searchParams.get('hub.challenge')
  const result = verifyWebhook(mode, token, challenge)
  if (result === null) return new NextResponse('Forbidden', { status: 403 })
  return new NextResponse(result, { headers: { 'Content-Type': 'text/plain' } })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (body.object !== 'whatsapp_business_account') return NextResponse.json({ ok: true })
  const message = parseWebhookPayload(body)
  if (!message) return NextResponse.json({ ok: true })
  const reply = await processIncomingMessage(message)
  await sendTextMessage(message.from.replace(/\D/g, ''), reply)
  return NextResponse.json({ ok: true })
}
