'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Chapter = { num: string; title: string }
type Feature = { num: string; label: string; title: string; desc: string }

export default function NewEbookWizard() {
  const router = useRouter()
  const [form, setForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    excerpt: '',
    category: 'seo',
    tags: '',
    pages: 0,
    imageUrl: '',
    pdfUrl: '',
    chapters: [] as Chapter[],
    features: [] as Feature[],
  })
  const [uploading, setUploading] = useState<'pdf' | 'image' | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'

  async function upload(kind: 'pdf' | 'image', file: File) {
    if (!form.slug) {
      setError('Définissez un slug avant d\'uploader')
      return
    }
    setUploading(kind)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('kind', kind)
    fd.append('slug', form.slug)
    const res = await fetch('/api/dashboard/upload', { method: 'POST', body: fd })
    setUploading(null)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Upload échoué')
      return
    }
    const { url } = await res.json()
    if (kind === 'pdf') set('pdfUrl', url)
    else set('imageUrl', url)
  }

  async function submit() {
    if (!form.slug || !form.title) {
      setError('Slug et titre requis')
      return
    }
    if (!form.pdfUrl) {
      setError('Uploadez d\'abord le PDF')
      return
    }

    setSaving(true)
    setError('')

    // Step 1: Create the FR content entry (is_db_only = true since no static fallback).
    const contentRes = await fetch(`/api/dashboard/ebooks/${form.slug}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale: 'fr',
        title: form.title,
        subtitle: form.subtitle,
        excerpt: form.excerpt,
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        imageUrl: form.imageUrl,
        pdfUrl: form.pdfUrl,
        pages: form.pages || null,
        chapters: form.chapters,
        features: form.features,
        stats: [],
        testimonial: { quote: '', author: '', role: '' },
      }),
    })

    if (!contentRes.ok) {
      const d = await contentRes.json().catch(() => ({}))
      setError(d.error || 'Erreur création contenu')
      setSaving(false)
      return
    }

    // Step 2: Register in catalog as free & active.
    await fetch(`/api/dashboard/ebooks/${form.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_free: true, is_active: true, currency: 'eur' }),
    })

    setSaving(false)
    router.push(`/dashboard/admin/ebooks/${form.slug}/edit`)
    router.refresh()
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Informations</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug (unique)" required>
            <input
              value={form.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="guide-marketing-2026"
              className={cls}
              required
            />
          </Field>
          <Field label="Catégorie">
            <select value={form.category} onChange={e => set('category', e.target.value)} className={cls}>
              <option value="seo">SEO</option>
              <option value="marketing">Marketing</option>
              <option value="business">Business</option>
              <option value="branding">Branding</option>
            </select>
          </Field>
          <Field label="Titre" required full>
            <input value={form.title} onChange={e => set('title', e.target.value)} className={cls} required />
          </Field>
          <Field label="Sous-titre" full>
            <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={cls} />
          </Field>
          <Field label="Résumé" full>
            <textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className={cls} />
          </Field>
          <Field label="Pages">
            <input type="number" value={form.pages} onChange={e => set('pages', Number(e.target.value))} className={cls} />
          </Field>
          <Field label="Tags (virgule)">
            <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="seo, guide, 2026" className={cls} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Fichiers</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">PDF</label>
            <input type="file" accept="application/pdf" disabled={uploading !== null || !form.slug} onChange={e => e.target.files?.[0] && upload('pdf', e.target.files[0])} className="text-xs" />
            {uploading === 'pdf' && <div className="mt-1 text-xs text-slate-500">Upload…</div>}
            {form.pdfUrl && <a href={form.pdfUrl} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-emerald-700">✓ {form.pdfUrl}</a>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Couverture</label>
            <input type="file" accept="image/*" disabled={uploading !== null || !form.slug} onChange={e => e.target.files?.[0] && upload('image', e.target.files[0])} className="text-xs" />
            {uploading === 'image' && <div className="mt-1 text-xs text-slate-500">Upload…</div>}
            {form.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.imageUrl} alt="" className="mt-2 h-20 rounded border border-slate-200" />
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Chapitres</h3>
          <button
            onClick={() => set('chapters', [...form.chapters, { num: String(form.chapters.length + 1).padStart(2, '0'), title: '' }])}
            className="text-xs font-medium text-violet-600 hover:underline"
          >
            + Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {form.chapters.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input value={c.num} onChange={e => { const next = [...form.chapters]; next[i] = { ...c, num: e.target.value }; set('chapters', next) }} className={`${cls} w-20`} />
              <input value={c.title} onChange={e => { const next = [...form.chapters]; next[i] = { ...c, title: e.target.value }; set('chapters', next) }} placeholder="Titre du chapitre" className={cls} />
              <button onClick={() => set('chapters', form.chapters.filter((_, j) => j !== i))} className="text-xs text-red-600">✕</button>
            </div>
          ))}
          {form.chapters.length === 0 && <p className="text-sm text-slate-500">Vous pourrez aussi les ajouter plus tard dans l&apos;éditeur complet.</p>}
        </div>
      </div>

      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={saving || !form.slug || !form.title}
          className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? 'Création…' : 'Créer l\'ebook'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, full, required, children }: { label: string; full?: boolean; required?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}
