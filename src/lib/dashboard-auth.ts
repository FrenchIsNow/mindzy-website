import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'mindzy_dashboard_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type Session =
  | { role: 'admin'; exp: number }
  | { role: 'client'; clientId: number; clientSlug: string; exp: number }

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never

function getSecret(): string {
  const s = process.env.DASHBOARD_SESSION_SECRET
  if (!s) throw new Error('DASHBOARD_SESSION_SECRET is not set')
  return s
}

function b64url(buf: Buffer | string): string {
  const b = typeof buf === 'string' ? Buffer.from(buf) : buf
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64')
}

function sign(payload: string): string {
  return b64url(crypto.createHmac('sha256', getSecret()).update(payload).digest())
}

export function createSessionToken(data: DistributiveOmit<Session, 'exp'>): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE
  const payload = b64url(JSON.stringify({ ...data, exp }))
  const sig = sign(payload)
  return `${payload}.${sig}`
}

export function verifySessionToken(token: string | undefined): Session | null {
  if (!token) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null
  const expectedSig = sign(payload)
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null
  } catch {
    return null
  }
  try {
    const data = JSON.parse(b64urlDecode(payload).toString()) as Session
    if (data.exp < Math.floor(Date.now() / 1000)) return null
    return data
  } catch {
    return null
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  return verifySessionToken(token)
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

// ─── Password hashing (scrypt, no external deps) ─────────────────────────────

export function hashPassword(plain: string): string {
  const salt = crypto.randomBytes(16)
  const key = crypto.scryptSync(plain, salt, 64)
  return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`
}

export function verifyPassword(plain: string, stored: string): boolean {
  const [algo, saltHex, keyHex] = stored.split('$')
  if (algo !== 'scrypt' || !saltHex || !keyHex) return false
  const salt = Buffer.from(saltHex, 'hex')
  const key = Buffer.from(keyHex, 'hex')
  const test = crypto.scryptSync(plain, salt, key.length)
  try {
    return crypto.timingSafeEqual(key, test)
  } catch {
    return false
  }
}

// ─── Route guards ────────────────────────────────────────────────────────────

export async function requireAdmin(): Promise<Session & { role: 'admin' }> {
  const s = await getSession()
  if (!s || s.role !== 'admin') {
    throw new Response('Unauthorized', { status: 401 })
  }
  return s
}

export async function requireClient(): Promise<Session & { role: 'client' }> {
  const s = await getSession()
  if (!s || s.role !== 'client') {
    throw new Response('Unauthorized', { status: 401 })
  }
  return s
}

export async function requireAuth(): Promise<Session> {
  const s = await getSession()
  if (!s) throw new Response('Unauthorized', { status: 401 })
  return s
}
