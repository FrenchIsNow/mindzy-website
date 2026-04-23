import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { requireAdmin } from '@/lib/dashboard-auth'

export const runtime = 'nodejs'

const MAX_PDF_BYTES = 50 * 1024 * 1024 // 50 MB
const MAX_IMAGE_BYTES = 10 * 1024 * 1024 // 10 MB

/**
 * Accepts multipart form-data with fields:
 *   file  – the File to upload
 *   kind  – "pdf" | "image"
 *   slug  – ebook slug, used as path prefix (letters, digits, dashes only)
 *
 * Returns { url } of the uploaded blob.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin()
  } catch (e) {
    return e as Response
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN not configured. Create a Blob store on Vercel and add the token to .env.local.' },
      { status: 500 },
    )
  }

  const form = await req.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })

  const file = form.get('file')
  const kind = String(form.get('kind') || '')
  const slug = String(form.get('slug') || '').toLowerCase().replace(/[^a-z0-9-]/g, '')

  if (!(file instanceof File)) return NextResponse.json({ error: 'file required' }, { status: 400 })
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

  const isPdf = kind === 'pdf'
  const isImage = kind === 'image'
  if (!isPdf && !isImage) return NextResponse.json({ error: 'kind must be "pdf" or "image"' }, { status: 400 })

  const maxBytes = isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES
  if (file.size > maxBytes) {
    return NextResponse.json({ error: `File too large (> ${maxBytes / 1024 / 1024} MB)` }, { status: 413 })
  }

  if (isPdf && file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'PDF file required' }, { status: 400 })
  }
  if (isImage && !file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Image file required' }, { status: 400 })
  }

  const ext = isPdf ? 'pdf' : (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = isPdf ? `ebooks/${slug}.${ext}` : `ebooks/covers/${slug}.${ext}`

  const blob = await put(path, file, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type,
  })

  return NextResponse.json({ url: blob.url, pathname: blob.pathname })
}
