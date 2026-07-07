'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Chapter = { num: string; title: string }
type Feature = { num: string; label: string; title: string; desc: string }
type Stat = { value: string; label: string }
type Testimonial = { quote: string; author: string; role: string }

const ALL_FORM_FIELDS = [
  { key: 'email', label: 'Email' },
  { key: 'firstName', label: 'Prénom' },
  { key: 'lastName', label: 'Nom' },
  { key: 'company', label: 'Entreprise' },
  { key: 'role', label: 'Poste' },
  { key: 'phone', label: 'Téléphone' },
] as const

export default function NewEbookWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    excerpt: '',
    category: 'marketing',
    tags: '',
    pages: 0,
    imageUrl: '',
    pdfUrl: '',
    readingTime: 0,
    chapters: [] as Chapter[],
    features: [] as Feature[],
    stats: [] as Stat[],
    testimonial: { quote: '', author: '', role: '' } as Testimonial,
    status: 'draft' as 'draft' | 'scheduled' | 'published' | 'archived',
    scheduledAt: '',
    publishedAt: '',
    metaTitle: '',
    metaDescription: '',
    geoKeywords: '',
    canonicalSlug: '',
    ogImageUrl: '',
    formFields: ['email', 'firstName', 'lastName', 'company', 'role'],
    thankYouRedirectUrl: '',
    calendlyUrl: '',
  })
  const [uploading, setUploading] = useState<'pdf' | 'image' | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(p => ({ ...p, [k]: v }))
  const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none'
  const labelCls = 'mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500'

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

  function validateForStep(s: number): string {
    if (s === 1) {
      if (!form.slug || !form.title) return 'Slug et titre sont requis'
      if (!['draft', 'scheduled', 'published', 'archived'].includes(form.status)) return 'Statut invalide'
      if (form.status === 'scheduled' && !form.scheduledAt) return 'Date de planification requise'
    }
    if (s === 2) {
      if (!form.pdfUrl) return 'Uploadez le PDF'
    }
    return ''
  }

  function goNext() {
    const err = validateForStep(step)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setStep(p => Math.min(p + 1, 5))
  }

  async function submit() {
    const err = validateForStep(1) || validateForStep(2)
    if (err) {
      setError(err)
      return
    }
    setSaving(true)
    setError('')

    const now = new Date().toISOString()
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
        readingTime: form.readingTime || null,
        chapters: form.chapters,
        features: form.features,
        stats: form.stats,
        testimonial: form.testimonial,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        geoMetadata: form.geoKeywords ? { keywords: form.geoKeywords.split(',').map(k => k.trim()).filter(Boolean) } : {},
      }),
    })

    if (!contentRes.ok) {
      const d = await contentRes.json().catch(() => ({}))
      setError(d.error || 'Erreur création contenu')
      setSaving(false)
      return
    }

    const catalogRes = await fetch(`/api/dashboard/ebooks/${form.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        is_free: true,
        is_active: true,
        currency: 'eur',
        status: form.status,
        scheduled_at: form.scheduledAt || null,
        published_at: form.status === 'published' ? (form.publishedAt || now) : form.publishedAt || null,
        seo_title: form.metaTitle || form.title,
        seo_description: form.metaDescription || form.excerpt,
        geo_keywords: form.geoKeywords ? form.geoKeywords.split(',').map(k => k.trim()).filter(Boolean) : null,
        canonical_slug: form.canonicalSlug || form.slug,
        og_image_url: form.ogImageUrl || form.imageUrl || null,
        form_fields: form.formFields,
        thank_you_redirect_url: form.thankYouRedirectUrl || null,
        calendly_url: form.calendlyUrl || null,
      }),
    })

    if (!catalogRes.ok) {
      const d = await catalogRes.json().catch(() => ({}))
      setError(d.error || 'Erreur création catalogue')
      setSaving(false)
      return
    }

    setSaving(false)
    router.push(`/dashboard/admin/ebooks/${form.slug}`)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <StepIndicator current={step} />

      {step === 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">1. Identité & planification</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug (unique)" required full={false}>
              <input
                value={form.slug}
                onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="guide-marketing-2026"
                className={inputCls}
                required
              />
            </Field>
            <Field label="Catégorie">
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                <option value="marketing">Marketing</option>
                <option value="seo">SEO</option>
                <option value="geo">GEO</option>
                <option value="business">Business</option>
                <option value="branding">Branding</option>
              </select>
            </Field>
            <Field label="Titre" required full>
              <input value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} required />
            </Field>
            <Field label="Sous-titre" full>
              <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Résumé" full>
              <textarea rows={3} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Pages">
              <input type="number" value={form.pages} onChange={e => set('pages', Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Temps de lecture (min)">
              <input type="number" value={form.readingTime} onChange={e => set('readingTime', Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Tags (virgule)" full>
              <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="seo, guide, 2026" className={inputCls} />
            </Field>
            <Field label="Statut" full={false}>
              <select value={form.status} onChange={e => set('status', e.target.value as typeof form.status)} className={inputCls}>
                <option value="draft">Brouillon</option>
                <option value="scheduled">Planifié</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </Field>
            {form.status === 'scheduled' && (
              <Field label="Date de publication">
                <input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={e => set('scheduledAt', e.target.value)}
                  className={inputCls}
                />
              </Field>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">2. Fichiers</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>PDF *</label>
                <input type="file" accept="application/pdf" disabled={uploading !== null || !form.slug} onChange={e => e.target.files?.[0] && upload('pdf', e.target.files[0])} className="text-xs" />
                {uploading === 'pdf' && <div className="mt-1 text-xs text-slate-500">Upload…</div>}
                {form.pdfUrl && <a href={form.pdfUrl} target="_blank" rel="noreferrer" className="mt-1 block truncate text-xs text-emerald-700">✓ {form.pdfUrl}</a>}
              </div>
              <div>
                <label className={labelCls}>Couverture</label>
                <input type="file" accept="image/*" disabled={uploading !== null || !form.slug} onChange={e => e.target.files?.[0] && upload('image', e.target.files[0])} className="text-xs" />
                {uploading === 'image' && <div className="mt-1 text-xs text-slate-500">Upload…</div>}
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="" className="mt-2 h-20 rounded border border-slate-200" />
                )}
              </div>
            </div>
          </div>

          <ListSection
            title="Chapitres"
            items={form.chapters}
            add={() => set('chapters', [...form.chapters, { num: String(form.chapters.length + 1).padStart(2, '0'), title: '' }])}
            onRemove={i => set('chapters', form.chapters.filter((_, idx) => idx !== i))}
            render={(c, i) => (
              <div className="flex gap-2">
                <input value={c.num} onChange={e => updateArray(form.chapters, i, { ...c, num: e.target.value }, v => set('chapters', v))} className={`${inputCls} w-20`} />
                <input value={c.title} onChange={e => updateArray(form.chapters, i, { ...c, title: e.target.value }, v => set('chapters', v))} placeholder="Titre du chapitre" className={inputCls} />
              </div>
            )}
          />

          <ListSection
            title="Features"
            items={form.features}
            add={() => set('features', [...form.features, { num: String(form.features.length + 1).padStart(2, '0'), label: '', title: '', desc: '' }])}
            onRemove={i => set('features', form.features.filter((_, idx) => idx !== i))}
            render={(f, i) => (
              <div className="grid grid-cols-12 gap-2">
                <input value={f.num} onChange={e => updateArray(form.features, i, { ...f, num: e.target.value }, v => set('features', v))} className={`${inputCls} col-span-2`} />
                <input value={f.label} onChange={e => updateArray(form.features, i, { ...f, label: e.target.value }, v => set('features', v))} placeholder="Label" className={`${inputCls} col-span-3`} />
                <input value={f.title} onChange={e => updateArray(form.features, i, { ...f, title: e.target.value }, v => set('features', v))} placeholder="Titre" className={`${inputCls} col-span-7`} />
                <textarea
                  rows={2}
                  value={f.desc}
                  onChange={e => updateArray(form.features, i, { ...f, desc: e.target.value }, v => set('features', v))}
                  placeholder="Description"
                  className={`${inputCls} col-span-12`}
                />
              </div>
            )}
          />

          <ListSection
            title="Statistiques"
            items={form.stats}
            add={() => set('stats', [...form.stats, { value: '', label: '' }])}
            onRemove={i => set('stats', form.stats.filter((_, idx) => idx !== i))}
            render={(s, i) => (
              <div className="flex gap-2">
                <input value={s.value} onChange={e => updateArray(form.stats, i, { ...s, value: e.target.value }, v => set('stats', v))} placeholder="Valeur" className={inputCls} />
                <input value={s.label} onChange={e => updateArray(form.stats, i, { ...s, label: e.target.value }, v => set('stats', v))} placeholder="Label" className={inputCls} />
              </div>
            )}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Témoignage</h3>
            <div className="space-y-3">
              <textarea rows={2} value={form.testimonial.quote} onChange={e => set('testimonial', { ...form.testimonial, quote: e.target.value })} placeholder="Citation" className={inputCls} />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.testimonial.author} onChange={e => set('testimonial', { ...form.testimonial, author: e.target.value })} placeholder="Auteur" className={inputCls} />
                <input value={form.testimonial.role} onChange={e => set('testimonial', { ...form.testimonial, role: e.target.value })} placeholder="Rôle" className={inputCls} />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">3. SEO / GEO</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Meta titre" full>
              <input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="Titre affiché dans Google" className={inputCls} />
            </Field>
            <Field label="Meta description" full>
              <textarea rows={3} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} placeholder="Description affichée dans Google" className={inputCls} />
            </Field>
            <Field label="Mots-clés GEO (virgule)" full>
              <input value={form.geoKeywords} onChange={e => set('geoKeywords', e.target.value)} placeholder="chatgpt, visibilité ia, seo 2026" className={inputCls} />
            </Field>
            <Field label="Slug canonique" full={false}>
              <input value={form.canonicalSlug} onChange={e => set('canonicalSlug', e.target.value)} placeholder={form.slug} className={inputCls} />
            </Field>
            <Field label="URL image Open Graph" full={false}>
              <input value={form.ogImageUrl} onChange={e => set('ogImageUrl', e.target.value)} placeholder="https://mindzy.me/og-image.png" className={inputCls} />
            </Field>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">4. Formulaire & redirection</h3>
          <div className="mb-4">
            <label className={labelCls}>Champs du formulaire de téléchargement</label>
            <div className="flex flex-wrap gap-3">
              {ALL_FORM_FIELDS.map(({ key, label }) => (
                <label key={key} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.formFields.includes(key)}
                    onChange={e => {
                      const next = e.target.checked
                        ? [...form.formFields, key]
                        : form.formFields.filter(f => f !== key)
                      set('formFields', next)
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="URL de redirection après téléchargement" full>
              <input value={form.thankYouRedirectUrl} onChange={e => set('thankYouRedirectUrl', e.target.value)} placeholder="https://calendly.com/... ou /merci" className={inputCls} />
            </Field>
            <Field label="URL Calendly" full>
              <input value={form.calendlyUrl} onChange={e => set('calendlyUrl', e.target.value)} placeholder="https://calendly.com/..." className={inputCls} />
            </Field>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">5. Aperçu & publication</h3>
          <div className="space-y-2 text-sm">
            <PreviewRow label="Slug" value={form.slug} />
            <PreviewRow label="Titre" value={form.title} />
            <PreviewRow label="Statut" value={form.status} />
            <PreviewRow label="PDF" value={form.pdfUrl || '—'} />
            <PreviewRow label="Couverture" value={form.imageUrl || '—'} />
            <PreviewRow label="Champs du formulaire" value={form.formFields.join(', ')} />
            <PreviewRow label="Redirection" value={form.thankYouRedirectUrl || form.calendlyUrl || '—'} />
            <PreviewRow label="Mots-clés GEO" value={form.geoKeywords || '—'} />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            En cliquant sur Publier, le lead magnet sera créé en base avec le contenu FR. Vous pourrez ensuite le traduire et l'éditer depuis la fiche détail.
          </p>
        </div>
      )}

      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(p => Math.max(p - 1, 1))}
          disabled={step === 1}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          Précédent
        </button>
        {step < 5 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-violet-600 px-6 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            Suivant
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? 'Publication…' : 'Publier'}
          </button>
        )}
      </div>
    </div>
  )
}

function StepIndicator({ current }: { current: number }) {
  const steps = ['Identité', 'Contenu', 'SEO/GEO', 'Formulaire', 'Aperçu']
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const n = i + 1
        const active = n === current
        const done = n < current
        return (
          <div key={s} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${active ? 'bg-violet-600 text-white' : done ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500'}`}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">{done ? '✓' : n}</span>
            {s}
          </div>
        )
      })}
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

function ListSection<T>({
  title,
  items,
  add,
  onRemove,
  render,
}: {
  title: string
  items: T[]
  add: () => void
  onRemove: (index: number) => void
  render: (item: T, index: number) => React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
        <button type="button" onClick={add} className="text-xs font-medium text-violet-600 hover:underline">+ Ajouter</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grow">{render(item, i)}</div>
            <button type="button" onClick={() => onRemove(i)} className="text-xs text-red-600">✕</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">Aucun élément.</p>}
      </div>
    </div>
  )
}

function updateArray<T>(arr: T[], index: number, value: T, setter: (next: T[]) => void) {
  const next = [...arr]
  next[index] = value
  setter(next)
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-slate-500">{label}:</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  )
}
