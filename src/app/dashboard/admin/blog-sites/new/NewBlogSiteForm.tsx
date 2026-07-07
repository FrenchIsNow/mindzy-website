'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewBlogSiteForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', slug: '', domain: '', isDefault: false })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none'
  const labelCls = 'mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500'

  function slugify(input: string) {
    return input.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 80)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const slug = form.slug ? slugify(form.slug) : slugify(form.name)
    if (!slug || !form.name.trim()) {
      setError('Nom et slug requis')
      return
    }
    setSaving(true)
    const res = await fetch('/api/dashboard/blog-sites', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, name: form.name.trim(), domain: form.domain || null, is_default: form.isDefault }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Échec de la création')
      setSaving(false)
      return
    }
    const { site } = await res.json()
    router.push(`/dashboard/admin/blog-sites/${site.slug}`)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      {error && <div className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Nom</label>
          <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Slug</label>
          <input className={inputCls} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="ex: mindzy" />
        </div>
        <div>
          <label className={labelCls}>Domaine personnalisé (optionnel)</label>
          <input className={inputCls} value={form.domain} onChange={e => set('domain', e.target.value)} placeholder="blog.example.com" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isDefault} onChange={e => set('isDefault', e.target.checked)} />
            Site par défaut
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Annuler</button>
        <button type="submit" disabled={saving} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
          {saving ? 'Création…' : 'Créer le site'}
        </button>
      </div>
    </form>
  )
}
