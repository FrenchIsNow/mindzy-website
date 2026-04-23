import { NextResponse } from 'next/server'
import { createSessionToken, setSessionCookie, verifyPassword } from '@/lib/dashboard-auth'
import { getDashboardClientByEmail } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    identifier?: string
    password?: string
  } | null

  const identifier = body?.identifier?.trim()
  const password = body?.password

  if (!identifier || !password) {
    return NextResponse.json({ error: 'Identifiant et mot de passe requis' }, { status: 400 })
  }

  // Admin check: identifier matches DASHBOARD_ADMIN_EMAIL (or username) + password matches.
  const adminEmail = process.env.DASHBOARD_ADMIN_EMAIL
  const adminPwd = process.env.DASHBOARD_ADMIN_PASSWORD
  if (adminEmail && adminPwd && identifier.toLowerCase() === adminEmail.toLowerCase()) {
    if (password !== adminPwd) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
    }
    const token = createSessionToken({ role: 'admin' })
    await setSessionCookie(token)
    return NextResponse.json({ ok: true, redirect: '/dashboard/admin' })
  }

  // Client: look up by email.
  const client = await getDashboardClientByEmail(identifier)
  if (!client || !client.active || !verifyPassword(password, client.password_hash)) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  const token = createSessionToken({
    role: 'client',
    clientId: client.id,
    clientSlug: client.slug,
  })
  await setSessionCookie(token)
  return NextResponse.json({ ok: true, redirect: '/dashboard/client' })
}
