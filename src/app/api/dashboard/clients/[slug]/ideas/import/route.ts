import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/dashboard-auth'
import { getDashboardClientBySlug, bulkInsertBlogIdeas } from '@/lib/db'

export const runtime = 'nodejs'

/**
 * Parse a CSV string. Supports quoted fields with embedded commas and double-quote escaping.
 * Expected headers (case-insensitive, any order):
 *   question | category | subcategory | target | contentType | seoPriority | locale
 */
function parseCSV(text: string): Array<Record<string, string>> {
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else {
        field += c
      }
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\n' || c === '\r') {
        if (field !== '' || row.length > 0) { row.push(field); rows.push(row); row = []; field = '' }
        if (c === '\r' && text[i + 1] === '\n') i++
      } else {
        field += c
      }
    }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row) }
  if (rows.length === 0) return []

  const headers = rows[0].map(h => h.trim().toLowerCase())
  return rows.slice(1)
    .filter(r => r.some(cell => cell.trim().length > 0))
    .map(r => {
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => { obj[h] = (r[i] ?? '').trim() })
      return obj
    })
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }
  const { slug } = await params
  const client = await getDashboardClientBySlug(slug)
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const contentType = req.headers.get('content-type') || ''
  let csvText = ''
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'file field required' }, { status: 400 })
    }
    csvText = await file.text()
  } else if (contentType.includes('text/csv') || contentType.includes('text/plain')) {
    csvText = await req.text()
  } else {
    const body = (await req.json().catch(() => null)) as { csv?: string } | null
    if (!body?.csv) return NextResponse.json({ error: 'csv field required' }, { status: 400 })
    csvText = body.csv
  }

  const records = parseCSV(csvText)

  const keyMap = (key: string): string => {
    const k = key.toLowerCase().replace(/\s+/g, '')
    if (k === 'question' || k === 'questiontitrearticle' || k === 'title') return 'question'
    if (k === 'category' || k === 'categorie' || k === 'catégorie') return 'category'
    if (k === 'subcategory' || k === 'souscategorie' || k === 'sous-catégorie') return 'subcategory'
    if (k === 'target' || k === 'cible' || k === 'cibleprincipale') return 'target'
    if (k === 'contenttype' || k === 'typedecontenu' || k === 'type') return 'contentType'
    if (k === 'seopriority' || k === 'prioritéseo' || k === 'prioriteseo' || k === 'priority') return 'seoPriority'
    if (k === 'locale' || k === 'langue') return 'locale'
    return ''
  }

  const ideas = records
    .map(r => {
      const mapped: Record<string, string> = {}
      for (const [k, v] of Object.entries(r)) {
        const mk = keyMap(k)
        if (mk && v) mapped[mk] = v
      }
      return mapped
    })
    .filter(r => r.question && r.question.length > 0) as Array<{
      question: string
      category?: string
      subcategory?: string
      target?: string
      contentType?: string
      seoPriority?: string
      locale?: string
    }>

  const count = await bulkInsertBlogIdeas(client.id, ideas)
  return NextResponse.json({ ok: true, inserted: count, skipped: records.length - count })
}
