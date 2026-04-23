'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Chapter = { num: string; title: string }
type Feature = { num: string; label: string; title: string; desc: string }
type Stat = { value: string; label: string }
type Testimonial = { quote: string; author: string; role: string }

type LocaleContent = {
  slug: string
  locale: string
  title: string
  subtitle: string
  excerpt: string
  category: string
  tags: string[]
  imageUrl: string
  pdfUrl: string
  pages: number | null
  readingTime: number | null
  chapters: Chapter[]
  features: Feature[]
  stats: Stat[]
  testimonial: Testimonial
  hasDbOverride: boolean
}

type Props = {
  slug: string
  initial: Record<'fr' | 'en' | 'es', LocaleContent>
  isDbOnly: boolean
}

const LOCALES = [
  { code: 'fr' as const, flag: '🇫🇷', label: 'Français' },
  { code: 'en' as const, flag: '🇬🇧', label: 'English' },
  { code: 'es' as const, flag: '🇪🇸', label: 'Español' },
]

export default function EbookContentEditor({ slug, initial }: Props) {
  const router = useRouter()
  const [locale, setLocale] = useState<'fr' | 'en' | 'es'>('fr')
  const [state, setState] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [translating, setTranslating] = useState<null | 'en' | 'es'>(null)
  const [uploading, setUploading] = useState<'pdf' | 'image' | null>(null)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  const current = state[locale]

  const updateCurrent = (patch: Partial<LocaleContent>) => {
    setState(s => ({ ...s, [locale]: { ...s[locale], ...patch } }))
  }

  async function save() {
    setSaving(true)
    setMsg('')
    setError('')
    const res = await fetch(`/api/dashboard/ebooks/${slug}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current),
    })
    setSaving(false)
    if (res.ok) {
      setMsg(`✓ Enregistré (${locale.toUpperCase()})`)
      router.refresh()
    } else {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Erreur')
    }
  }

  async function translate(target: 'en' | 'es') {
    if (!confirm(`Traduire le FR vers ${target.toUpperCase()} ? Le contenu ${target.toUpperCase()} existant sera remplacé.`)) return
    setTranslating(target)
    setMsg('')
    setError('')

    // Save FR first so translation uses the latest content.
    await fetch(`/api/dashboard/ebooks/${slug}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.fr),
    })

    const res = await fetch(`/api/dashboard/ebooks/${slug}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetLocale: target }),
    })
    setTranslating(null)
    if (res.ok) {
      setMsg(`✓ Traduit en ${target.toUpperCase()}`)
      router.refresh()
    } else {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Traduction échouée')
    }
  }

  async function upload(kind: 'pdf' | 'image', file: File) {
    setUploading(kind)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('kind', kind)
    fd.append('slug', slug)
    const res = await fetch('/api/dashboard/upload', { method: 'POST', body: fd })
    setUploading(null)
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Upload échoué')
      return
    }
    const { url } = await res.json()
    if (kind === 'pdf') updateCurrent({ pdfUrl: url })
    else updateCurrent({ imageUrl: url })
    setMsg(`✓ ${kind === 'pdf' ? 'PDF' : 'Image'} uploadé`)
  }

  const cls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'

  return (
    <div className="space-y-4">
      {/* Locale tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 w-fit">
          {LOCALES.map(l => (
            <button
              key={l.code}
              onClick={() => setLocale(l.code)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                locale === l.code
                  ? 'bg-white text-violet-700 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === 'fr' && (
                <span className="rounded bg-violet-100 px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600">source</span>
              )}
              {state[l.code].hasDbOverride && l.code !== 'fr' && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Traduit" />
              )}
            </button>
          ))}
        </div>

        {locale === 'fr' && (
          <div className="flex gap-2">
            <button
              onClick={() => translate('en')}
              disabled={translating !== null}
              className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-100 disabled:opacity-50"
            >
              {translating === 'en' ? 'Traduction…' : '🌐 Traduire → EN'}
            </button>
            <button
              onClick={() => translate('es')}
              disabled={translating !== null}
              className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 hover:bg-violet-100 disabled:opacity-50"
            >
              {translating === 'es' ? 'Traduction…' : '🌐 Traduire → ES'}
            </button>
          </div>
        )}
      </div>

      {(msg || error) && (
        <div className={`rounded-md px-3 py-2 text-sm ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {error || msg}
        </div>
      )}

      {/* Basic fields */}
      <Section title="Métadonnées">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Titre"><input value={current.title} onChange={e => updateCurrent({ title: e.target.value })} className={cls} /></Field>
          <Field label="Catégorie"><input value={current.category} onChange={e => updateCurrent({ category: e.target.value })} className={cls} /></Field>
          <Field label="Sous-titre" full><input value={current.subtitle} onChange={e => updateCurrent({ subtitle: e.target.value })} className={cls} /></Field>
          <Field label="Résumé (SEO)" full><textarea rows={2} value={current.excerpt} onChange={e => updateCurrent({ excerpt: e.target.value })} className={cls} /></Field>
          <Field label="Pages"><input type="number" value={current.pages ?? ''} onChange={e => updateCurrent({ pages: e.target.value ? Number(e.target.value) : null })} className={cls} /></Field>
          <Field label="Tags (séparés par virgule)">
            <input
              value={current.tags.join(', ')}
              onChange={e => updateCurrent({ tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
              className={cls}
            />
          </Field>
        </div>
      </Section>

      {/* Uploads — only shown on FR tab (shared across locales) */}
      {locale === 'fr' && (
        <Section title="Fichiers">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Fichier PDF</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="application/pdf"
                  disabled={uploading !== null}
                  onChange={e => e.target.files?.[0] && upload('pdf', e.target.files[0])}
                  className="flex-1 text-xs"
                />
              </div>
              {current.pdfUrl && (
                <a href={current.pdfUrl} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-violet-600 hover:underline">
                  {current.pdfUrl}
                </a>
              )}
              {uploading === 'pdf' && <div className="mt-1 text-xs text-slate-500">Upload…</div>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Image de couverture</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading !== null}
                  onChange={e => e.target.files?.[0] && upload('image', e.target.files[0])}
                  className="flex-1 text-xs"
                />
              </div>
              {current.imageUrl && (
                <div className="mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={current.imageUrl} alt="" className="h-20 rounded border border-slate-200" />
                </div>
              )}
              {uploading === 'image' && <div className="mt-1 text-xs text-slate-500">Upload…</div>}
            </div>
          </div>
        </Section>
      )}

      {/* Chapters */}
      <Section title="Chapitres" onAdd={() => updateCurrent({ chapters: [...current.chapters, { num: String(current.chapters.length + 1).padStart(2, '0'), title: '' }] })}>
        <div className="space-y-2">
          {current.chapters.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input value={c.num} onChange={e => {
                const next = [...current.chapters]; next[i] = { ...c, num: e.target.value }; updateCurrent({ chapters: next })
              }} placeholder="01" className={`${cls} w-20`} />
              <input value={c.title} onChange={e => {
                const next = [...current.chapters]; next[i] = { ...c, title: e.target.value }; updateCurrent({ chapters: next })
              }} placeholder="Titre du chapitre" className={cls} />
              <button onClick={() => updateCurrent({ chapters: current.chapters.filter((_, j) => j !== i) })} className="text-xs text-red-600">✕</button>
            </div>
          ))}
          {current.chapters.length === 0 && <p className="text-sm text-slate-500">Aucun chapitre.</p>}
        </div>
      </Section>

      {/* Features */}
      <Section title="Points forts" onAdd={() => updateCurrent({ features: [...current.features, { num: String(current.features.length + 1).padStart(2, '0'), label: '', title: '', desc: '' }] })}>
        <div className="space-y-3">
          {current.features.map((f, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-3">
              <div className="mb-2 grid grid-cols-3 gap-2">
                <input value={f.num} onChange={e => { const next = [...current.features]; next[i] = { ...f, num: e.target.value }; updateCurrent({ features: next }) }} placeholder="01" className={cls} />
                <input value={f.label} onChange={e => { const next = [...current.features]; next[i] = { ...f, label: e.target.value }; updateCurrent({ features: next }) }} placeholder="Label" className={cls} />
                <input value={f.title} onChange={e => { const next = [...current.features]; next[i] = { ...f, title: e.target.value }; updateCurrent({ features: next }) }} placeholder="Titre" className={cls} />
              </div>
              <textarea value={f.desc} onChange={e => { const next = [...current.features]; next[i] = { ...f, desc: e.target.value }; updateCurrent({ features: next }) }} rows={2} placeholder="Description" className={cls} />
              <button onClick={() => updateCurrent({ features: current.features.filter((_, j) => j !== i) })} className="mt-2 text-xs text-red-600">Supprimer</button>
            </div>
          ))}
          {current.features.length === 0 && <p className="text-sm text-slate-500">Aucun point fort.</p>}
        </div>
      </Section>

      {/* Stats */}
      <Section title="Statistiques" onAdd={() => updateCurrent({ stats: [...current.stats, { value: '', label: '' }] })}>
        <div className="space-y-2">
          {current.stats.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input value={s.value} onChange={e => { const next = [...current.stats]; next[i] = { ...s, value: e.target.value }; updateCurrent({ stats: next }) }} placeholder="40" className={`${cls} w-28`} />
              <input value={s.label} onChange={e => { const next = [...current.stats]; next[i] = { ...s, label: e.target.value }; updateCurrent({ stats: next }) }} placeholder="pages" className={cls} />
              <button onClick={() => updateCurrent({ stats: current.stats.filter((_, j) => j !== i) })} className="text-xs text-red-600">✕</button>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <Section title="Témoignage">
        <div className="space-y-2">
          <Field label="Citation" full>
            <textarea value={current.testimonial.quote} onChange={e => updateCurrent({ testimonial: { ...current.testimonial, quote: e.target.value } })} rows={3} className={cls} />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <input value={current.testimonial.author} onChange={e => updateCurrent({ testimonial: { ...current.testimonial, author: e.target.value } })} placeholder="Auteur" className={cls} />
            <input value={current.testimonial.role} onChange={e => updateCurrent({ testimonial: { ...current.testimonial, role: e.target.value } })} placeholder="Rôle / fonction" className={cls} />
          </div>
        </div>
      </Section>

      {/* Save bar */}
      <div className="sticky bottom-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-lg">
        <span className="text-xs text-slate-500">
          Locale actuelle : <strong>{locale.toUpperCase()}</strong>
          {!current.hasDbOverride && <span className="ml-2 rounded bg-slate-100 px-2 py-0.5">Contenu statique (non sauvegardé)</span>}
        </span>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? 'Enregistrement…' : `Enregistrer (${locale.toUpperCase()})`}
        </button>
      </div>
    </div>
  )
}

function Section({ title, onAdd, children }: { title: string; onAdd?: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
        {onAdd && <button onClick={onAdd} className="text-xs font-medium text-violet-600 hover:underline">+ Ajouter</button>}
      </div>
      {children}
    </div>
  )
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">{label}</label>
      {children}
    </div>
  )
}
