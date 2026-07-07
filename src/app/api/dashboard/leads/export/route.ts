import { NextResponse } from 'next/server'
import { requireApiEditor } from '@/lib/auth'
import { exportLeadsToCSV, type LeadFilters } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const unauthorized = await requireApiEditor()
  if (unauthorized) return unauthorized
  const url = new URL(req.url)
  const filters: LeadFilters = {
    source: url.searchParams.get('source') || undefined,
    status: url.searchParams.get('status') || undefined,
    locale: url.searchParams.get('locale') || undefined,
    q: url.searchParams.get('q') || undefined,
  }
  const csv = await exportLeadsToCSV(filters)
  return new NextResponse(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="mindzy-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
