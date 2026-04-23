'use client'

import { useState } from 'react'

interface ParsedArticle {
  title: string
  slug: string
  excerpt?: string
  contentHtml: string
  coverImageUrl?: string
  coverAlt?: string
  category?: string
  readingTime?: number
  locale: string
  status?: string
}

interface ImportResult {
  inserted: number
  skipped: number
  errors: string[]
}

function parseMarkdown(text: string): { frontmatter: Record<string, any>; content: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, content: text }
  }

  const [, frontmatterText, content] = match
  const frontmatter: Record<string, any> = {}

  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
      const lowerKey = key.trim().toLowerCase()

      if (lowerKey === 'title') frontmatter.title = value
      if (lowerKey === 'slug') frontmatter.slug = value
      if (lowerKey === 'excerpt' || lowerKey === 'meta_description') frontmatter.excerpt = value
      if (lowerKey === 'category' || lowerKey === 'categorie') frontmatter.category = value
      if (lowerKey === 'image') frontmatter.coverImageUrl = value
      if (lowerKey === 'readingtime' || lowerKey === 'reading_time') frontmatter.readingTime = parseInt(value, 10)
      if (lowerKey === 'lang' || lowerKey === 'locale') frontmatter.locale = value
      if (lowerKey === 'status') frontmatter.status = value
    }
  })

  return { frontmatter, content }
}

function mdToHtml(md: string): string {
  let html = md
    .replace(/^### (.*?)$/gm, '<h3 style="font-size:20px;font-weight:bold;margin-top:1.5rem;margin-bottom:0.5rem">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 style="font-size:24px;font-weight:bold;margin-top:2rem;margin-bottom:1rem">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 style="font-size:32px;font-weight:bold;margin-top:2rem;margin-bottom:1rem">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/, '<ul style="list-style-type:disc;margin-left:2rem">$1</ul>')
    .replace(/^> (.*?)$/gm, '<blockquote style="border-left:4px solid #cbd5e1;padding-left:1rem;margin:1rem 0;color:#64748b">$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')

  return html
}

export default function BulkImportForm({ clientId }: { clientId: number }) {
  const [step, setStep] = useState<'parse' | 'preview' | 'import'>('parse')
  const [textarea, setTextarea] = useState('')
  const [articles, setArticles] = useState<ParsedArticle[]>([])
  const [locale, setLocale] = useState('fr')
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set())
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)

  async function handleParse() {
    const blocks = textarea.split('---\n---').map(b => b.trim()).filter(Boolean)

    const parsed: ParsedArticle[] = []
    for (const block of blocks) {
      const { frontmatter, content } = parseMarkdown(`---\n${block}`)
      if (!frontmatter.title || !frontmatter.slug) continue

      const html = mdToHtml(content)
      parsed.push({
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt,
        contentHtml: html,
        coverImageUrl: frontmatter.coverImageUrl,
        coverAlt: frontmatter.title,
        category: frontmatter.category,
        readingTime: frontmatter.readingTime,
        locale: frontmatter.locale || locale,
        status: frontmatter.status || 'pending_review',
      })
    }

    setArticles(parsed)
    setSelectedIndices(new Set(parsed.map((_, i) => i)))
    setStep('preview')
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    let combined = textarea

    for (const file of files) {
      const text = await file.text()
      combined += '\n---\n---\n' + text
    }

    setTextarea(combined)
  }

  async function handleImport() {
    const toImport = articles.filter((_, i) => selectedIndices.has(i))
    if (toImport.length === 0) return

    setImporting(true)
    try {
      const res = await fetch('/api/dashboard/articles/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          locale,
          articles: toImport,
        }),
      })

      const data = (await res.json()) as ImportResult
      setResult(data)
      setStep('import')
    } catch (err) {
      setResult({
        inserted: 0,
        skipped: 0,
        errors: [err instanceof Error ? err.message : 'Unknown error'],
      })
      setStep('import')
    }
    setImporting(false)
  }

  return (
    <div className="space-y-6">
      {step === 'parse' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="mb-4 text-lg font-semibold">Étape 1: Coller ou importer des articles</h2>
          <p className="mb-4 text-sm text-slate-600">Collez du markdown brut ou importez des fichiers .md séparés par ---</p>
          <textarea
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
            placeholder="Collez du markdown ici..."
            rows={10}
            className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm"
          />
          <div className="flex gap-3">
            <label className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-200">
              📁 Importer des fichiers
              <input
                type="file"
                multiple
                accept=".md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={handleParse}
              disabled={!textarea.trim()}
              className="rounded-lg bg-violet-600 px-6 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              Analyser
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="mb-4 text-lg font-semibold">Étape 2: Aperçu et sélection</h2>

          <div className="mb-6 flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">Langue par défaut:</label>
            <select
              value={locale}
              onChange={e => setLocale(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIndices.size === articles.length}
              onChange={e => {
                if (e.target.checked) {
                  setSelectedIndices(new Set(articles.map((_, i) => i)))
                } else {
                  setSelectedIndices(new Set())
                }
              }}
              className="h-4 w-4 rounded border-slate-300"
            />
            <label className="text-sm font-medium text-slate-700">Tout sélectionner</label>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">✓</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Titre</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Slug</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Catégorie</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Mots</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-700">Langue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((article, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIndices.has(i)}
                        onChange={e => {
                          const newIndices = new Set(selectedIndices)
                          if (e.target.checked) {
                            newIndices.add(i)
                          } else {
                            newIndices.delete(i)
                          }
                          setSelectedIndices(newIndices)
                        }}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{article.title}</td>
                    <td className="px-4 py-3 text-slate-600">{article.slug}</td>
                    <td className="px-4 py-3 text-slate-600">{article.category || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{Math.ceil(article.contentHtml.length / 5)}</td>
                    <td className="px-4 py-3 text-slate-600">{article.locale.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep('parse')}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Retour
            </button>
            <button
              onClick={handleImport}
              disabled={selectedIndices.size === 0 || importing}
              className="rounded-lg bg-violet-600 px-6 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {importing ? 'Importation...' : `Importer ${selectedIndices.size} articles`}
            </button>
          </div>
        </div>
      )}

      {step === 'import' && result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="mb-4 text-lg font-semibold">Étape 3: Résultat</h2>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-emerald-50 p-4">
              <div className="text-2xl font-bold text-emerald-700">{result.inserted}</div>
              <div className="text-sm text-emerald-600">Insérés</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="text-2xl font-bold text-amber-700">{result.skipped}</div>
              <div className="text-sm text-amber-600">Ignorés (doublon)</div>
            </div>
            <div className="rounded-lg bg-red-50 p-4">
              <div className="text-2xl font-bold text-red-700">{result.errors.length}</div>
              <div className="text-sm text-red-600">Erreurs</div>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="mb-2 font-medium text-red-900">Erreurs:</h3>
              <ul className="space-y-1 text-sm text-red-800">
                {result.errors.map((err, i) => (
                  <li key={i}>• {err}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => {
              setStep('parse')
              setTextarea('')
              setArticles([])
              setResult(null)
              setSelectedIndices(new Set())
            }}
            className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-medium text-white hover:bg-slate-900"
          >
            Nouvelle importation
          </button>
        </div>
      )}
    </div>
  )
}
