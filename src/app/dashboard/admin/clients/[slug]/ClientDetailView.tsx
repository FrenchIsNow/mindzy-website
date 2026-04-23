'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { BlogIdea, BlogArticle, DashboardClient } from '@/lib/db'

type SafeClient = Omit<DashboardClient, 'password_hash'>

export default function ClientDetailView({
  client,
  initialIdeas,
  initialArticles,
}: {
  client: SafeClient
  initialIdeas: BlogIdea[]
  initialArticles: BlogArticle[]
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'articles' | 'ideas' | 'settings'>('articles')
  const [ideas, setIdeas] = useState<BlogIdea[]>(initialIdeas)
  const [newIdea, setNewIdea] = useState('')
  const [importing, setImporting] = useState(false)
  const [importMsg, setImportMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function addIdea(e: React.FormEvent) {
    e.preventDefault()
    if (!newIdea.trim()) return
    const res = await fetch(`/api/dashboard/clients/${client.slug}/ideas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: newIdea }),
    })
    if (res.ok) {
      const data = await res.json()
      setIdeas(prev => [...prev, data.idea])
      setNewIdea('')
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
    const res = await fetch(`/api/dashboard/clients/${client.slug}/ideas/import`, {
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

  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{client.name}</h1>
          <p className="text-sm text-slate-600">
            /{client.slug} · {client.locale} · {client.frequency} ({client.posts_per_cycle}/cycle)
          </p>
          {client.site_url && (
            <a href={client.site_url} target="_blank" rel="noreferrer" className="text-xs text-violet-600 hover:underline">
              {client.site_url}
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${client.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
            {client.active ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-1 border-b border-slate-200">
        <TabBtn active={tab === 'articles'} onClick={() => setTab('articles')}>
          Articles <span className="ml-1 text-xs text-slate-400">({initialArticles.length})</span>
        </TabBtn>
        <TabBtn active={tab === 'ideas'} onClick={() => setTab('ideas')}>
          Idées <span className="ml-1 text-xs text-slate-400">({ideas.length})</span>
        </TabBtn>
        <TabBtn active={tab === 'settings'} onClick={() => setTab('settings')}>Paramètres</TabBtn>
      </div>

      {tab === 'articles' && (
        <>
          {client.slug === 'mindzy' && (
            <div className="mb-4 flex justify-end">
              <Link
                href="/dashboard/admin/articles/import"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              >
                + Importer des articles
              </Link>
            </div>
          )}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {initialArticles.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Aucun article pour ce client.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Titre</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Créé</th>
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
                      <td className="px-4 py-3 text-slate-600">{new Date(a.created_at).toLocaleDateString('fr-FR')}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/dashboard/admin/articles/${a.id}`} className="text-violet-600 hover:underline">Éditer →</Link>
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

          <form onSubmit={addIdea} className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-4">
            <input
              value={newIdea}
              onChange={e => setNewIdea(e.target.value)}
              placeholder="Nouvelle idée d'article…"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
              Ajouter
            </button>
          </form>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {ideas.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                Aucune idée. Importez un CSV ou ajoutez-en une ci-dessus.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">Catégorie</th>
                    <th className="px-4 py-3">Priorité</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ideas.map(i => (
                    <tr key={i.id}>
                      <td className="px-4 py-3">{i.question}</td>
                      <td className="px-4 py-3 text-slate-600">{i.category || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{i.seo_priority || '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={i.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => deleteIdea(i.id)} className="text-xs text-red-600 hover:underline">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {tab === 'settings' && <SettingsTab client={client} />}
    </>
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
    generating: 'bg-blue-100 text-blue-800',
    pending_review: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    published: 'bg-violet-100 text-violet-800',
    rejected: 'bg-red-100 text-red-800',
  }
  const cls = map[status] || 'bg-slate-100 text-slate-700'
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{status.replace('_', ' ')}</span>
}

function SettingsTab({ client }: { client: SafeClient }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: client.name,
    email: client.email || '',
    domain: client.domain || '',
    personality: client.personality || '',
    targetAudience: client.target_audience || '',
    siteUrl: client.site_url || '',
    locale: client.locale,
    frequency: client.frequency,
    postsPerCycle: client.posts_per_cycle,
    ingestUrl: client.ingest_url || '',
    ingestToken: client.ingest_token || '',
    personaPrompt: client.persona_prompt || '',
    active: client.active,
    password: '',
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function save() {
    setSaving(true)
    setMsg('')
    const payload: Record<string, unknown> = { ...form }
    if (!payload.password) delete payload.password
    const res = await fetch(`/api/dashboard/clients/${client.slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

  async function deleteClient() {
    if (!confirm(`Supprimer définitivement ${client.name} et tous ses articles ?`)) return
    const res = await fetch(`/api/dashboard/clients/${client.slug}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/dashboard/admin')
      router.refresh()
    }
  }

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="mb-1 block text-sm font-medium">Nom</label><input value={form.name} onChange={e => set('name', e.target.value)} className={cls} /></div>
        <div><label className="mb-1 block text-sm font-medium">Email</label><input value={form.email} onChange={e => set('email', e.target.value)} className={cls} /></div>
        <div><label className="mb-1 block text-sm font-medium">Site</label><input value={form.siteUrl} onChange={e => set('siteUrl', e.target.value)} className={cls} /></div>
        <div><label className="mb-1 block text-sm font-medium">Domaine</label><input value={form.domain} onChange={e => set('domain', e.target.value)} className={cls} /></div>
        <div><label className="mb-1 block text-sm font-medium">Personnalité</label><input value={form.personality} onChange={e => set('personality', e.target.value)} className={cls} /></div>
        <div><label className="mb-1 block text-sm font-medium">Audience</label><input value={form.targetAudience} onChange={e => set('targetAudience', e.target.value)} className={cls} /></div>
        <div>
          <label className="mb-1 block text-sm font-medium">Locale</label>
          <select value={form.locale} onChange={e => set('locale', e.target.value)} className={cls}>
            <option value="fr">Français</option><option value="en">English</option><option value="es">Español</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Fréquence</label>
          <select value={form.frequency} onChange={e => set('frequency', e.target.value)} className={cls}>
            <option value="daily">Quotidienne</option><option value="weekly">Hebdomadaire</option><option value="monthly">Mensuelle</option>
          </select>
        </div>
        <div><label className="mb-1 block text-sm font-medium">Articles/cycle</label><input type="number" min={1} value={form.postsPerCycle} onChange={e => set('postsPerCycle', Number(e.target.value))} className={cls} /></div>
        <div>
          <label className="mb-1 block text-sm font-medium">État</label>
          <select value={form.active ? '1' : '0'} onChange={e => set('active', e.target.value === '1')} className={cls}>
            <option value="1">Actif</option><option value="0">Inactif</option>
          </select>
        </div>
        <div className="col-span-2"><label className="mb-1 block text-sm font-medium">URL d&apos;ingest</label><input value={form.ingestUrl} onChange={e => set('ingestUrl', e.target.value)} placeholder="https://client.com/api/blog/ingest" className={cls} /></div>
        <div className="col-span-2"><label className="mb-1 block text-sm font-medium">Token d&apos;ingest</label><input value={form.ingestToken} onChange={e => set('ingestToken', e.target.value)} className={cls} /></div>
        <div className="col-span-2"><label className="mb-1 block text-sm font-medium">Persona prompt</label><textarea rows={4} value={form.personaPrompt} onChange={e => set('personaPrompt', e.target.value)} className={cls} /></div>
        <div className="col-span-2"><label className="mb-1 block text-sm font-medium">Nouveau mot de passe (laisser vide pour ne pas changer)</label><input type="text" value={form.password} onChange={e => set('password', e.target.value)} className={cls} /></div>
      </div>

      {msg && <div className="text-sm text-emerald-700">{msg}</div>}

      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <button onClick={deleteClient} className="text-sm text-red-600 hover:underline">Supprimer ce client</button>
        <button onClick={save} disabled={saving} className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}
