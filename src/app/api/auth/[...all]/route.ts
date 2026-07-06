import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'
import { initDB } from '@/lib/db'

const betterAuthHandlers = toNextJsHandler(auth)

function withDB(handler: (req: Request) => Promise<Response>) {
  return async function (req: Request) {
    await initDB()
    try {
      return await handler(req)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[auth]', err)
      return Response.json({ error: message }, { status: 500 })
    }
  }
}

export const GET = withDB(betterAuthHandlers.GET)
export const POST = withDB(betterAuthHandlers.POST)
