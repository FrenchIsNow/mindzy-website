#!/usr/bin/env node
/**
 * Migration: add canonical_slug to blog_articles.
 *
 * canonical_slug = the .md filename (without extension), identical across fr/en/es.
 * This is the stable identifier that groups all translations of one article.
 *
 * Usage: node scripts/migrate-canonical-slug.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// load .env.local
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 1) continue
    const k = t.slice(0, i).trim(), v = t.slice(i + 1).trim()
    if (!process.env[k]) process.env[k] = v
  }
}

const { neon } = await import('@neondatabase/serverless')
const sql = neon(process.env.DATABASE_URL)

// Step 1 — add column
await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS canonical_slug TEXT`
console.log('✅  Column canonical_slug ready\n')

// Step 2 — build map: (locale, frontmatter_slug) → filename
// Read all .md files, extract the frontmatter slug field
const LOCALES = ['fr', 'en', 'es']
// map: `${locale}|${frontmatterSlug}` → filename (without .md)
const slugToFile = new Map()

for (const locale of LOCALES) {
  const dir = path.join(ROOT, 'content/blog', locale)
  if (!fs.existsSync(dir)) continue
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const match = raw.match(/^---\n([\s\S]*?)\n---/)
    if (!match) continue
    let frontmatterSlug = file.replace('.md', '') // fallback = filename
    for (const line of match[1].split('\n')) {
      if (line.startsWith('slug:')) {
        frontmatterSlug = line.slice(5).trim().replace(/^['"]|['"]$/g, '')
        break
      }
    }
    const canonical = file.replace('.md', '')
    slugToFile.set(`${locale}|${frontmatterSlug}`, canonical)
  }
}

console.log(`📂  Built slug→file map: ${slugToFile.size} entries\n`)

// Step 3 — fetch all articles missing canonical_slug
const articles = await sql`
  SELECT id, slug, locale FROM blog_articles
  WHERE canonical_slug IS NULL AND client_id = (SELECT id FROM dashboard_clients WHERE slug='mindzy' LIMIT 1)
`
console.log(`🔄  Updating ${articles.length} articles...\n`)

let updated = 0, skipped = 0

for (const row of articles) {
  const key = `${row.locale}|${row.slug}`
  const canonical = slugToFile.get(key)
  if (!canonical) {
    console.warn(`⚠️  No file match for ${key} — using slug as canonical`)
    await sql`UPDATE blog_articles SET canonical_slug = ${row.slug} WHERE id = ${row.id}`
    skipped++
    continue
  }
  await sql`UPDATE blog_articles SET canonical_slug = ${canonical} WHERE id = ${row.id}`
  updated++
}

console.log(`\n✅  Updated: ${updated}`)
console.log(`⚠️  Fallback (slug used): ${skipped}`)

// Step 4 — verify grouping
const groups = await sql`
  SELECT canonical_slug, array_agg(locale ORDER BY locale) as locales, COUNT(*) as cnt
  FROM blog_articles
  WHERE client_id = (SELECT id FROM dashboard_clients WHERE slug='mindzy' LIMIT 1)
  GROUP BY canonical_slug
  ORDER BY canonical_slug
  LIMIT 10
`
console.log('\n📊  Sample groups:')
for (const g of groups) {
  console.log(`  ${g.canonical_slug}: [${g.locales.join(', ')}]`)
}

process.exit(0)
