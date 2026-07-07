import { betterAuth } from 'better-auth'
import { admin } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthMiddleware, APIError } from 'better-auth/api'
import { getSessionCookie } from 'better-auth/cookies'
import { headers as nextHeaders } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from './drizzle'

export type UserRole = 'admin' | 'editor' | 'viewer'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_SITE_URL!, 'http://localhost:3000'].filter(Boolean),
  plugins: [admin()],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'editor',
        required: true,
      },
      isActive: {
        type: 'boolean',
        defaultValue: true,
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Public self-registration is disabled. Admins create users via the admin plugin.
      if (ctx.path === '/sign-up/email') {
        throw new APIError('FORBIDDEN', {
          message: 'Public sign-up is disabled.',
        })
      }
    }),
  },
})

export type Session = typeof auth.$Infer.Session

/**
 * Validate a session from the current request headers.
 * Use in Server Components and Server Actions.
 */
export async function getSession() {
  return auth.api.getSession({ headers: await nextHeaders() })
}

/**
 * Return the active session only if the user has one of the allowed roles.
 * Throws a 401/403 APIError otherwise.
 */
export async function requireRole(...allowed: UserRole[]) {
  const session = await getSession()
  if (!session?.user) {
    throw new APIError('UNAUTHORIZED', { message: 'Authentication required.' })
  }
  const role = (session.user.role ?? 'editor') as UserRole
  if (!allowed.includes(role)) {
    throw new APIError('FORBIDDEN', { message: 'Insufficient permissions.' })
  }
  if (session.user.isActive === false) {
    throw new APIError('FORBIDDEN', { message: 'Account is disabled.' })
  }
  return session
}

export async function requireAdmin() {
  return requireRole('admin')
}

export async function requireEditor() {
  return requireRole('admin', 'editor')
}

export async function requireViewer() {
  return requireRole('admin', 'editor', 'viewer')
}

/**
 * API helpers that return a NextResponse on authorization failure so API routes
 * can early-return with a proper JSON error.
 */
export async function requireApiRole(...allowed: UserRole[]) {
  try {
    await requireRole(...allowed)
    return null
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unauthorized'
    const status = err instanceof APIError && typeof err.status === 'number' ? err.status : 401
    return NextResponse.json({ error: message }, { status })
  }
}

export async function requireApiAdmin() {
  return requireApiRole('admin')
}

export async function requireApiEditor() {
  return requireApiRole('admin', 'editor')
}

export async function requireApiViewer() {
  return requireApiRole('admin', 'editor', 'viewer')
}

/**
 * Lightweight cookie check for middleware (Edge-safe, no DB round-trip).
 */
export { getSessionCookie }
