'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { BlogArticle, BlogIdea, BlogSite } from '@/lib/db'

export default function BlogSiteDetailView({
  site,
  clientId,
  sourceLocale,
  initialArticles,
  initialIdeas,
}: {
  site: BlogSite
  clientId: number
  sourceLocale: string
  initialArticles: BlogArticle[]
  initialIdeas: BlogIdea[]
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'articles' | 'ideas' | 'settings'>('articles')
  const [ideas, setIdeas] = useState<BlogIdea[]>(initialIdeas)
  const [statusFilter, setStatusFilter] = useState<'waiting' | 'done' | 'all'>('waiting')
  const [importing, setImporting] = useState(false)
  const [importMsg, setImportMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function addIdea(payload: {
    question: string
    category?: string
    subcategory?: string
    target?: string
    contentType?: string
    seoPriority?: string
    locale?: string
    source?: string
    dueDate?: string
    keyword?: string
  }) {
    const res = await fetch(`/api/dashboard/clients/${site.slug}/ideas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = await res.json()
      setIdeas(prev => [...prev, data.idea])
      return true
    }
    return false
  }

  async function setIdeaStatus(id: number, status: 'waiting' | 'done' | 'in_progress' | 'archived') {
    const res = await fetch(`/api/dashboard/ideas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setIdeas(prev => prev.map(i => (i.id === id ? { ...i, status } : i)))
    }
  }

  async function setIdeaDueDate(id: number, dueDate: string | null) {
    const res = await fetch(`/api/dashboard/ideas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ due_date: dueDate }),
    })
    if (res.ok) {
      setIdeas(prev => prev.map(i => (i.id === id ? { ...i, due_date: dueDate } : i)))
    }
  }

  async function deleteIdea(id: number) {
    if (!confirm('Supprimer cette idée ?')) return
    const res = await fetch(`/api/dashboard/ideas/${id}`, { method: 'DELETE' })
    if (res.ok) setIdeas(prev => prev.filter(i => i.id !== id))
  }

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    setImportMsg('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`/api/dashboard/clients/${site.slug}/ideas/import`, {
      method: 'POST',
      body: fd,
    })
    const data = await res.json()
    setImporting(false)
    if (res.ok) {
      setImportMsg(`${data.inserted} idée(s) importée(s), ${data.skipped ?? 0} ignorée(s).`)
      router.refresh()
    } else {
      setImportMsg(data.error || 'Import échoué')
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  const sourceLabel = sourceLocale.toUpperCase()

  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{site.name}</h1>
          <p className="text-sm text-slate-600">
            /{site.slug}
            {site.domain ? ` · ${site.domain}` : ''}
            {` · source: ${sourceLabel}`}
          </p>
        </div>
        <div className="flex gap-2">
          {site.is_default && (
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
              Par défaut
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 flex gap-1 border-b border-slate-200">
        <TabBtn active={tab === 'articles'} onClick={() => setTab('articles')}>
          Articles <span className="ml-1 text-xs text-slate-400">({initialArticles.length} {sourceLabel})</span>
        </TabBtn>
        <TabBtn active={tab === 'ideas'} onClick={() => setTab('ideas')}>
          Idées <span className="ml-1 text-xs text-slate-400">({ideas.length})</span>
        </TabBtn>
        <TabBtn active={tab === 'settings'} onClick={() => setTab('settings')}>Paramètres</TabBtn>
      </div>

      {tab === 'articles' && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
            <NewArticleForm clientId={clientId} siteSlug={site.slug} sourceLabel={sourceLabel} />
            <Link
              href={`/dashboard/admin/articles/import?clientId=${clientId}`}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ↑ Importer (bulk)
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {initialArticles.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Aucun article pour ce site.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Translations</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {initialArticles.map(a => (
                    <tr key={a.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-slate-500">/{a.slug}</div>
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                      <td className="px-4 py-3">
                        {a.canonical_slug ? (
                          <span className="text-xs text-violet-600">+ translations</span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{new Date(a.created_at).toLocaleDateString('fr-FR')}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/dashboard/admin/articles/${a.id}`} className="text-violet-600 hover:underline">Edit →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {tab === 'ideas' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              onChange={onImportFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={importing}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            >
              {importing ? 'Import…' : '↑ Importer CSV'}
            </button>
            <span className="text-xs text-slate-500">
              Colonnes : question, category, subcategory, target, contentType, seoPriority, locale
            </span>
            {importMsg && <span className="ml-auto text-sm text-emerald-700">{importMsg}</span>}
          </div>

          <NewIdeaForm onSubmit={addIdea} sourceLocale={sourceLocale} />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Filtrer :</span>
            {(['waiting', 'done', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  statusFilter === f
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'waiting' ? 'En attente' : f === 'done' ? 'Terminées' : 'Toutes'}
              </button>
            ))}
          </div>

          <IdeasTable
            ideas={ideas}
            statusFilter={statusFilter}
            onStatus={setIdeaStatus}
            onDueDate={setIdeaDueDate}
            onDelete={deleteIdea}
          />
        </div>
      )}

      {tab === 'settings' && <SettingsTab site={site} />}
    </>
  )
}

function NewArticleForm({ clientId, siteSlug, sourceLabel }: { clientId: number; siteSlug: string; sourceLabel: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  async function create(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setErr('')
    const res = await fetch('/api/dashboard/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        blogSiteSlug: siteSlug,
        title: title.trim() || 'New article',
        locale: sourceLabel.toLowerCase(),
      }),
    })
    setCreating(false)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setErr(d.error || 'Création impossible')
      return
    }
    const data = await res.json()
    router.push(`/dashboard/admin/articles/${data.article.id}`)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        + New article ({sourceLabel})
      </button>
    )
  }

  return (
    <form onSubmit={create} className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <input
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={`Article title (${sourceLabel})…`}
        className="min-w-[260px] flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-violet-500 focus:outline-none"
      />
      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{sourceLabel}</span>
      <button
        type="submit"
        disabled={creating}
        className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {creating ? '…' : 'Create & edit →'}
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); setTitle(''); setErr('') }}
        className="text-xs text-slate-500 hover:text-slate-700"
      >
        Cancel
      </button>
      {err && <span className="text-xs text-red-600 w-full">{err}</span>}
    </form>
  )
}

function TabBtn({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition ${
        active ? 'border-violet-600 text-violet-700' : 'border-transparent text-slate-600 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    idea: 'bg-slate-100 text-slate-700',
    waiting: 'bg-slate-100 text-slate-700',
    in_progress: 'bg-blue-100 text-blue-800',
    generating: 'bg-blue-100 text-blue-800',
    pending_review: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    published: 'bg-violet-100 text-violet-800',
    done: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    archived: 'bg-slate-100 text-slate-700',
  }
  const cls = map[status] || 'bg-slate-100 text-slate-700'
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{status.replace('_', ' ')}</span>
}

function SettingsTab({ site }: { site: BlogSite }) {
  const router = useRouter()
  const [name, setName] = useState(site.name)
  const [domain, setDomain] = useState(site.domain || '')
  const [isDefault, setIsDefault] = useState(site.is_default)
  const [settingsJson, setSettingsJson] = useState(JSON.stringify(site.settings || {}, null, 2))
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setSaving(true)
    setMsg('')
    let parsed: Record<string, unknown> = {}
    try { parsed = JSON.parse(settingsJson) } catch { setMsg('JSON invalide'); setSaving(false); return }
    const res = await fetch(`/api/dashboard/blog-sites/${site.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, domain: domain || null, is_default: isDefault, settings: parsed }),
    })
    setSaving(false)
    if (res.ok) {
      setMsg('Enregistré.')
      router.refresh()
    } else {
      const d = await res.json().catch(() => ({}))
      setMsg(d.error || 'Erreur')
    }
  }

  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Nom</label>
          <input value={name} onChange={e => setName(e.target.value)} className={cls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Domaine</label>
          <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="ex. mindzy.me" className={cls} />
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">Slug (non modifiable)</label>
          <input readOnly value={site.slug} className={`${cls} bg-slate-50 text-slate-600`} />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <input id="is_default" type="checkbox" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} />
          <label htmlFor="is_default" className="text-sm">Site par défaut</label>
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">Settings (JSON)</label>
          <textarea rows={6} value={settingsJson} onChange={e => setSettingsJson(e.target.value)} className={`${cls} font-mono text-xs`} />
        </div>
      </div>

      {msg && <div className="text-sm text-emerald-700">{msg}</div>}

      <div className="flex items-center justify-end border-t border-slate-200 pt-4">
        <button onClick={save} disabled={saving} className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}

const LOCALES = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ru'] as const

function NewIdeaForm({
  onSubmit,
  sourceLocale,
}: {
  onSubmit: (payload: {
    question: string
    category?: string
    subcategory?: string
    target?: string
    contentType?: string
    seoPriority?: string
    locale?: string
    source?: string
    dueDate?: string
    keyword?: string
  }) => Promise<boolean>
  sourceLocale: string
}) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [target, setTarget] = useState('')
  const [contentType, setContentType] = useState('')
  const [seoPriority, setSeoPriority] = useState('')
  const [locale, setLocale] = useState(sourceLocale)
  const [source, setSource] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [keyword, setKeyword] = useState('')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim()) return
    setSaving(true)
    setErr('')
    const ok = await onSubmit({
      question: question.trim(),
      category: category.trim() || undefined,
      subcategory: subcategory.trim() || undefined,
      target: target.trim() || undefined,
      contentType: contentType.trim() || undefined,
      seoPriority: seoPriority.trim() || undefined,
      locale: locale || undefined,
      source: source.trim() || undefined,
      dueDate: dueDate || undefined,
      keyword: keyword.trim() || undefined,
    })
    setSaving(false)
    if (ok) {
      setQuestion(''); setCategory(''); setSubcategory(''); setTarget('')
      setContentType(''); setSeoPriority(''); setSource(''); setDueDate(''); setKeyword('')
      setOpen(false)
    } else {
      setErr('Création impossible')
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        + Nouvelle idée
      </button>
    )
  }

  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-violet-500 focus:outline-none'
  const labelCls = 'mb-1 block text-[10px] font-medium uppercase tracking-wide text-slate-500'

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3">
        <label className={labelCls}>Question / titre *</label>
        <input
          autoFocus
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Quelle question cet article doit-il répondre ?"
          className={cls}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <div>
          <label className={labelCls}>Catégorie</label>
          <input value={category} onChange={e => setCategory(e.target.value)} className={cls} />
        </div>
        <div>
          <label className={labelCls}>Sous-catégorie</label>
          <input value={subcategory} onChange={e => setSubcategory(e.target.value)} className={cls} />
        </div>
        <div>
          <label className={labelCls}>Cible principale</label>
          <input value={target} onChange={e => setTarget(e.target.value)} placeholder="DRH, CEO, IT…" className={cls} />
        </div>
        <div>
          <label className={labelCls}>Type de contenu</label>
          <select value={contentType} onChange={e => setContentType(e.target.value)} className={cls}>
            <option value="">—</option>
            <option value="guide">Guide</option>
            <option value="tutorial">Tutoriel</option>
            <option value="listicle">Listicle</option>
            <option value="case_study">Case study</option>
            <option value="comparison">Comparatif</option>
            <option value="opinion">Tribune</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Priorité SEO</label>
          <select value={seoPriority} onChange={e => setSeoPriority(e.target.value)} className={cls}>
            <option value="">—</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Locale</label>
          <select value={locale} onChange={e => setLocale(e.target.value)} className={cls}>
            {LOCALES.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Source</label>
          <input value={source} onChange={e => setSource(e.target.value)} placeholder="client, audit…" className={cls} />
        </div>
        <div>
          <label className={labelCls}>Échéance</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={cls} />
        </div>
        <div>
          <label className={labelCls}>Mot-clé cible</label>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} className={cls} />
        </div>
      </div>
      {err && <div className="mt-2 text-xs text-red-600">{err}</div>}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? '…' : 'Ajouter (en attente)'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setQuestion(''); setErr('') }}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}

function IdeasTable({
  ideas,
  statusFilter,
  onStatus,
  onDueDate,
  onDelete,
}: {
  ideas: BlogIdea[]
  statusFilter: 'waiting' | 'done' | 'all'
  onStatus: (id: number, status: 'waiting' | 'done' | 'in_progress' | 'archived') => void
  onDueDate: (id: number, dueDate: string | null) => void
  onDelete: (id: number) => void
}) {
  const filtered = statusFilter === 'all' ? ideas : ideas.filter(i => i.status === statusFilter)
  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        {statusFilter === 'waiting' && 'Aucune idée en attente. Tout est traité.'}
        {statusFilter === 'done' && 'Aucune idée terminée pour l\'instant.'}
        {statusFilter === 'all' && 'Aucune idée. Importez un CSV ou ajoutez-en une ci-dessus.'}
      </div>
    )
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-3">N°</th>
            <th className="px-3 py-3">Catégorie</th>
            <th className="px-3 py-3">Sous-catégorie</th>
            <th className="px-3 py-3">Question (titre article)</th>
            <th className="px-3 py-3">Cible principale</th>
            <th className="px-3 py-3">Type de contenu</th>
            <th className="px-3 py-3">Priorité SEO</th>
            <th className="px-3 py-3">Statut</th>
            <th className="px-3 py-3">Échéance</th>
            <th className="px-3 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filtered.map((i, idx) => (
            <tr key={i.id}>
              <td className="px-3 py-3 font-mono text-xs text-slate-400">{idx + 1}</td>
              <td className="px-3 py-3 text-slate-600">{i.category || '—'}</td>
              <td className="px-3 py-3 text-slate-600">{i.subcategory || '—'}</td>
              <td className="px-3 py-3">
                <div className="font-medium">{i.question}</div>
                {i.target_keyword && <div className="text-[10px] text-slate-400">🎯 {i.target_keyword}</div>}
                {i.locale && <div className="text-[10px] uppercase text-slate-400">{i.locale}</div>}
              </td>
              <td className="px-3 py-3 text-slate-600">{i.target || '—'}</td>
              <td className="px-3 py-3 text-slate-600">{i.content_type || '—'}</td>
              <td className="px-3 py-3 text-slate-600">{i.seo_priority || '—'}</td>
              <td className="px-3 py-3">
                <button
                  onClick={() => onStatus(i.id, i.status === 'done' ? 'waiting' : 'done')}
                  title={i.status === 'done' ? 'Remettre en attente' : 'Marquer terminée'}
                >
                  <StatusBadge status={i.status} />
                </button>
              </td>
              <td className="px-3 py-3">
                <input
                  type="date"
                  value={i.due_date ? i.due_date.slice(0, 10) : ''}
                  onChange={e => onDueDate(i.id, e.target.value || null)}
                  className="rounded border border-slate-200 px-2 py-1 text-xs"
                />
              </td>
              <td className="px-3 py-3 text-right">
                <button onClick={() => onDelete(i.id)} className="text-xs text-red-600 hover:underline">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
