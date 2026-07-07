import { NextResponse } from 'next/server'
import { requireApiAdmin } from '@/lib/auth'
import { deleteWaitlistEntry } from '@/lib/db'

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireApiAdmin()
  if (unauthorized) return unauthorized

  const { id } = await params
  const num = Number(id)
  if (!Number.isFinite(num)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  await deleteWaitlistEntry(num)
  return NextResponse.json({ success: true })
}
