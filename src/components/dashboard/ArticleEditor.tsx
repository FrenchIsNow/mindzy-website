'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TiptapEditor from './TiptapEditor'
import type { BlogArticle } from '@/lib/db'

type Role = 'admin' | 'client'

const LOCALE_LABELS: Record<string, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'FR' },
  en: { flag: '🇬🇧', label: 'EN' },
  es: { flag: '🇪🇸', label: 'ES' },
}

function LocaleTabs({ article, translations, role }: { article: BlogArticle; translations: BlogArticle[]; role: Role }) {
  if (translations.length <= 1) return null
  const base = role === 'admin' ? '/dashboard/admin/articles' : '/dashboard/client/articles'
  return (
    <div className="mb-4 flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit">
      {translations.map(t => {
        const info = LOCALE_LABELS[t.locale] ?? { flag: '🌐', label: t.locale.toUpperCase() }
        const isActive = t.id === article.id
        const isFr = t.locale === 'fr'
        return (
          <Link
            key={t.id}
            href={`${base}/${t.id}`}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? 'bg-white text-violet-700 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>{info.flag}</span>
            <span>{info.label}</span>
            {isFr && (
              <span className="rounded bg-violet-100 px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600">
                source
              </span>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default function ArticleEditor({
  article,
  role,
  translations = [],
}: {
  article: BlogArticle
  role: Role
  translations?: BlogArticle[]
}) {
  const router = useRouter()
  const [title, setTitle] = useState(article.title)
  const [slug, setSlug] = useState(article.slug)
  const [excerpt, setExcerpt] = useState(article.excerpt || '')
  const [contentHtml, setContentHtml] = useState(article.content_html || '')
  const [notes, setNotes] = useState(article.client_notes || '')
  const [status, setStatus] = useState(article.status)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tab, setTab] = useState<'edition' | 'preview'>('edition')

  async function save() {
    setSaving(true)
    setMsg('')
    const res = await fetch(`/api/dashboard/articles/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        content_html: contentHtml,
        client_notes: notes,
      }),
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

  async function changeStatus(newStatus: string) {
    setSaving(true)
    setMsg('')
    // Save content first so the status change captures the latest edits.
    await fetch(`/api/dashboard/articles/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, excerpt, content_html: contentHtml, client_notes: notes }),
    })
    const res = await fetch(`/api/dashboard/articles/${article.id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    })
    setSaving(false)
    if (res.ok) {
      setStatus(newStatus)
      setMsg(`Statut : ${newStatus}`)
      router.refresh()
    } else {
      const d = await res.json().catch(() => ({}))
      setMsg(d.error || 'Erreur')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <LocaleTabs article={article} translations={translations} role={role} />

        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setTab('edition')}
            className={`px-4 py-3 text-sm font-medium transition ${
              tab === 'edition'
                ? 'border-b-2 border-violet-600 text-violet-700'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Édition
          </button>
          <button
            onClick={() => setTab('preview')}
            className={`px-4 py-3 text-sm font-medium transition ${
              tab === 'preview'
                ? 'border-b-2 border-violet-600 text-violet-700'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Aperçu
          </button>
        </div>

        {tab === 'edition' && (
          <div className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Titre</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-lg font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Slug</label>
                  <input
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Locale</label>
                  <input readOnly value={article.locale} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Extrait (SEO)</label>
                <textarea
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <TiptapEditor value={contentHtml} onChange={setContentHtml} />
          </div>
        )}

        {tab === 'preview' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <article className="max-w-none">
              {article.cover_image_url && (
                <div className="mb-8 -mx-8 -mt-8 overflow-hidden rounded-t-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.cover_image_url} alt={article.cover_alt || ''} className="w-full h-auto" />
                </div>
              )}
              <h1 className="mb-4 text-4xl font-bold text-slate-900">{title}</h1>
              {excerpt && <p className="mb-6 text-lg italic text-slate-500">{excerpt}</p>}
              <div className="mb-6 flex flex-wrap gap-3">
                {article.category && (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {article.category}
                  </span>
                )}
                {article.reading_time && (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {article.reading_time} min
                  </span>
                )}
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {article.locale.toUpperCase()}
                </span>
              </div>
              <div
                className="prose prose-slate prose-lg max-w-none text-slate-700"
                style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: '#374151',
                }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </article>
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Statut</h3>
          <StatusBadge status={status} />
          {article.cover_image_url && (
            <div className="mt-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Image de couverture</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.cover_image_url} alt={article.cover_alt || ''} className="w-full rounded-lg" />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Notes</h3>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={5}
            placeholder={role === 'client' ? 'Commentaires pour l&apos;admin…' : 'Notes internes…'}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5">
          <button
            onClick={save}
            disabled={saving}
            className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 disabled:opacity-50"
          >
            {saving ? 'Enregistrement…' : 'Enregistrer le brouillon'}
          </button>

          {role === 'client' && status === 'pending_review' && (
            <>
              <button
                onClick={() => changeStatus('approved')}
                disabled={saving}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                ✓ Valider l&apos;article
              </button>
              <button
                onClick={() => changeStatus('rejected')}
                disabled={saving}
                className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                Rejeter
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              {status !== 'approved' && (
                <button onClick={() => changeStatus('approved')} disabled={saving} className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">
                  Marquer comme approuvé
                </button>
              )}
              {status !== 'published' && (
                <button onClick={() => changeStatus('published')} disabled={saving} className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50">
                  Publier →
                </button>
              )}
              {status !== 'rejected' && (
                <button onClick={() => changeStatus('rejected')} disabled={saving} className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50">
                  Rejeter
                </button>
              )}
            </>
          )}

          {msg && <div className="pt-1 text-center text-xs text-emerald-700">{msg}</div>}
        </div>
      </aside>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    pending_review: { cls: 'bg-amber-100 text-amber-800', label: 'En attente de validation' },
    approved: { cls: 'bg-emerald-100 text-emerald-800', label: 'Approuvé' },
    published: { cls: 'bg-violet-100 text-violet-800', label: 'Publié' },
    rejected: { cls: 'bg-red-100 text-red-800', label: 'Rejeté' },
  }
  const s = map[status] || { cls: 'bg-slate-100 text-slate-700', label: status }
  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${s.cls}`}>{s.label}</span>
}
