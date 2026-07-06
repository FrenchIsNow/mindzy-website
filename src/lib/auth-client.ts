import { createAuthClient } from 'better-auth/client'
import { adminClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  // Client-side requests should stay same-origin (avoids CORS when developing on localhost).
  baseURL: typeof window === 'undefined' ? process.env.NEXT_PUBLIC_SITE_URL : undefined,
  plugins: [adminClient()],
})

export type AuthClient = typeof authClient
