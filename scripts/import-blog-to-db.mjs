#!/usr/bin/env node
/**
 * Import all existing Mindzy blog posts (content/blog/fr/*.md) into the
 * blog_articles DB table under the "mindzy" dashboard client.
 *
 * Usage:  node scripts/import-blog-to-db.mjs
 * Requires DATABASE_URL in .env.local
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// ── Load .env.local ──────────────────────────────────────────────────────────
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌  DATABASE_URL not set')
  process.exit(1)
}

// ── Neon client (dynamic import so ESM works) ────────────────────────────────
const { neon } = await import('@neondatabase/serverless')
const sql = neon(DATABASE_URL)

// ── Parse frontmatter (no external dependency) ───────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    let key = line.slice(0, colon).trim()
    let val = line.slice(colon + 1).trim().replace(/^['"]|['"]$/g, '')
    if (val === 'true') val = true
    else if (val === 'false') val = false
    else if (/^\d+$/.test(val)) val = parseInt(val)
    data[key] = val
  }
  return { data, content: match[2].trim() }
}

// ── Minimal Markdown → HTML ──────────────────────────────────────────────────
function mdToHtml(md) {
  let html = md
    // Headings
    .replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>')
    // Horizontal rule
    .replace(/^---+$/gm, '<hr/>')
    // Blockquote
    .replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')

  // Unordered lists
  html = html.replace(/((?:^[-*+]\s.+\n?)+)/gm, match => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^[-*+]\s/, '')}</li>`).join('')
    return `<ul>${items}</ul>`
  })

  // Ordered lists
  html = html.replace(/((?:^\d+\.\s.+\n?)+)/gm, match => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^\d+\.\s/, '')}</li>`).join('')
    return `<ol>${items}</ol>`
  })

  // Paragraphs (lines not already wrapped in a block tag)
  const blockTags = /^<(h[1-6]|ul|ol|li|blockquote|hr|img|pre|code)/
  html = html.split('\n\n').map(block => {
    block = block.trim()
    if (!block) return ''
    if (blockTags.test(block)) return block
    return `<p>${block.replace(/\n/g, ' ')}</p>`
  }).join('\n')

  return html
}

// ── Main ─────────────────────────────────────────────────────────────────────
const BLOG_DIR = path.join(ROOT, 'content/blog/fr')
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

console.log(`\n📚  Found ${files.length} blog posts in content/blog/fr/\n`)

// Get the mindzy client id
const clients = await sql`SELECT id FROM dashboard_clients WHERE slug = 'mindzy' LIMIT 1`
if (!clients.length) {
  console.error('❌  dashboard_clients row for "mindzy" not found. Run initDB first.')
  process.exit(1)
}
const clientId = clients[0].id
console.log(`✅  Mindzy client id: ${clientId}\n`)

// Get existing slugs to avoid duplicates
const existing = await sql`SELECT slug FROM blog_articles WHERE client_id = ${clientId}`
const existingSlugs = new Set(existing.map(r => r.slug))
console.log(`ℹ️   Already in DB: ${existingSlugs.size} articles\n`)

let inserted = 0
let skipped = 0
let errors = 0

for (const filename of files) {
  const filePath = path.join(BLOG_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = parseFrontmatter(raw)

  const slug = data.slug || filename.replace('.md', '')

  if (existingSlugs.has(slug)) {
    console.log(`⏭️   Skip (already in DB): ${slug}`)
    skipped++
    continue
  }

  const title = data.title || slug
  const excerpt = data.excerpt || data.meta_description || null
  const category = data.category || data.categorie || null
  const coverImageUrl = data.image || null
  const coverAlt = data.title || null
  const readingTime = data.readingTime ? parseInt(data.readingTime) : null
  const keywords = data.keywords ? [data.keywords] : []
  const publishedAt = data.date || data.date_publication || null

  const contentHtml = mdToHtml(content)

  try {
    await sql`
      INSERT INTO blog_articles (
        client_id, title, slug, excerpt, content_html,
        cover_image_url, cover_alt, keywords, category,
        reading_time, locale, status, published_at
      ) VALUES (
        ${clientId}, ${title}, ${slug}, ${excerpt}, ${contentHtml},
        ${coverImageUrl}, ${coverAlt}, ${keywords}, ${category},
        ${readingTime}, 'fr', 'published', ${publishedAt}
      )
    `
    console.log(`✅  Inserted: ${slug}`)
    inserted++
  } catch (err) {
    console.error(`❌  Error inserting ${slug}:`, err.message)
    errors++
  }
}

console.log(`
────────────────────────────────
✅  Inserted : ${inserted}
⏭️   Skipped  : ${skipped}
❌  Errors   : ${errors}
Total files  : ${files.length}
────────────────────────────────
`)
process.exit(errors > 0 ? 1 : 0)
