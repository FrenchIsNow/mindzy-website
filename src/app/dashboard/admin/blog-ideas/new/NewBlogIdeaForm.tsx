'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Client = { id: number; name: string; slug: string }
type Site = { id: number; slug: string; name: string }

export default function NewBlogIdeaForm({ clients, sites }: { clients: Client[]; sites: Site[] }) {
  const router = useRouter()
  const [form, setForm] = useState({
    clientId: clients[0]?.id ?? 0,
    blogSiteSlug: sites[0]?.slug ?? '',
    question: '',
    keyword: '',
    category: '',
    subcategory: '',
    target: '',
    contentType: 'article',
    seoPriority: 'medium',
    locale: 'fr',
    status: 'waiting' as 'waiting' | 'in_progress' | 'done' | 'archived',
    dueDate: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none'
  const labelCls = 'mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.clientId) { setError('Client requis'); return }
    if (!form.question.trim()) { setError('Question / angle requis'); return }
    setSaving(true)
    const res = await fetch('/api/dashboard/blog-ideas', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        clientId: form.clientId,
        blogSiteSlug: form.blogSiteSlug || null,
        question: form.question.trim(),
        keyword: form.keyword || null,
        category: form.category || null,
        subcategory: form.subcategory || null,
        target: form.target || null,
        contentType: form.contentType || null,
        seoPriority: form.seoPriority || null,
        locale: form.locale,
        status: form.status,
        dueDate: form.dueDate || null,
        source: 'manual',
      }),
    })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Échec de la création')
      setSaving(false)
      return
    }
    router.push('/dashboard/admin/blog-ideas')
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
        <label className={labelCls}>Question / angle *</label>
        <input className={inputCls} value={form.question} onChange={e => set('question', e.target.value)} required />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className={labelCls}>Mot-clé principal</label>
          <input className={inputCls} value={form.keyword} onChange={e => set('keyword', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Catégorie</label>
          <input className={inputCls} value={form.category} onChange={e => set('category', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Sous-catégorie</label>
          <input className={inputCls} value={form.subcategory} onChange={e => set('subcategory', e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className={labelCls}>Audience cible</label>
          <input className={inputCls} value={form.target} onChange={e => set('target', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Type de contenu</label>
          <select className={inputCls} value={form.contentType} onChange={e => set('contentType', e.target.value)}>
            <option value="article">Article</option>
            <option value="guide">Guide</option>
            <option value="case_study">Étude de cas</option>
            <option value="comparison">Comparatif</option>
            <option value="tutorial">Tutoriel</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Priorité SEO</label>
          <select className={inputCls} value={form.seoPriority} onChange={e => set('seoPriority', e.target.value)}>
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <div>
          <label className={labelCls}>Statut</label>
          <select className={inputCls} value={form.status} onChange={e => set('status', e.target.value as typeof form.status)}>
            <option value="waiting">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="done">Terminé</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Échéance</label>
          <input type="date" className={inputCls} value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Annuler</button>
        <button type="submit" disabled={saving} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
          {saving ? 'Création…' : 'Créer l\'idée'}
        </button>
      </div>
    </form>
  )
}
