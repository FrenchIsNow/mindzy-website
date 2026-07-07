'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Client = { id: number; name: string; slug: string }
type Idea = { id: number; question: string; locale?: string | null }
type Site = { id: number; slug: string; name: string }

export default function NewBlogArticleForm({ clients, ideas, sites }: { clients: Client[]; ideas: Idea[]; sites: Site[] }) {
  const router = useRouter()
  const [form, setForm] = useState({
    clientId: clients[0]?.id ?? 0,
    title: '',
    slug: '',
    excerpt: '',
    locale: 'fr',
    status: 'pending_review' as 'pending_review' | 'draft' | 'in_review' | 'published' | 'archived',
    ideaId: 0,
    blogSiteSlug: sites[0]?.slug ?? '',
    category: '',
    keyword: '',
  })
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
    if (!form.clientId) { setError('Client requis'); return }
    if (!form.title.trim()) { setError('Titre requis'); return }
    const slug = form.slug ? slugify(form.slug) : slugify(form.title)
    if (!slug) { setError('Slug invalide'); return }
    setSaving(true)
    const res = await fetch('/api/dashboard/articles', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        clientId: form.clientId,
        title: form.title.trim(),
        slug,
        excerpt: form.excerpt || undefined,
        locale: form.locale,
        status: form.status,
        ideaId: form.ideaId || undefined,
        blogSiteSlug: form.blogSiteSlug || undefined,
        category: form.category || undefined,
        keyword: form.keyword || undefined,
      }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Échec de la création')
      setSaving(false)
      return
    }
    const { article } = await res.json()
    router.push(`/dashboard/admin/clients/${clients.find(c => c.id === form.clientId)?.slug}?article=${article.id}`)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      {error && <div className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</div>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Client</label>
          <select className={inputCls} value={form.clientId} onChange={e => set('clientId', Number(e.target.value))}>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Blog site</label>
          <select className={inputCls} value={form.blogSiteSlug} onChange={e => set('blogSiteSlug', e.target.value)}>
            <option value="">— Aucun —</option>
            {sites.map(s => <option key={s.id} value={s.slug}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Titre *</label>
        <input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} required />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelCls}>Slug</label>
          <input className={inputCls} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="auto depuis le titre" />
        </div>
        <div>
          <label className={labelCls}>Locale</label>
          <select className={inputCls} value={form.locale} onChange={e => set('locale', e.target.value)}>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Chapô / extrait</label>
        <textarea className={inputCls} rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className={labelCls}>Statut</label>
          <select className={inputCls} value={form.status} onChange={e => set('status', e.target.value as typeof form.status)}>
            <option value="draft">Brouillon</option>
            <option value="pending_review">En revue</option>
            <option value="in_review">Relecture</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Catégorie</label>
          <input className={inputCls} value={form.category} onChange={e => set('category', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Mot-clé SEO</label>
          <input className={inputCls} value={form.keyword} onChange={e => set('keyword', e.target.value)} />
        </div>
      </div>

      {ideas.length > 0 && (
        <div>
          <label className={labelCls}>Idée d&apos;origine (optionnel)</label>
          <select className={inputCls} value={form.ideaId} onChange={e => set('ideaId', Number(e.target.value))}>
            <option value={0}>— Aucune —</option>
            {ideas.map(i => <option key={i.id} value={i.id}>{i.question.slice(0, 80)}</option>)}
          </select>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Annuler</button>
        <button type="submit" disabled={saving} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
          {saving ? 'Création…' : 'Créer l\'article'}
        </button>
      </div>
    </form>
  )
}
