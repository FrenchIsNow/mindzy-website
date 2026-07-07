// One-off seed: push the EU AI Act HTML report into ebook_content for the
// `eu-ai-act-2024` slug, and make sure its deliverable_types are correct
// (fr=page, en=pdf, es=pdf). The catalog row itself is created by initDB().
//
// Run: DATABASE_URL=... npx tsx scripts/seed-eu-ai-act.mjs
//
// Reads: /Users/levelup/Downloads/eu_ai_act_rapport_complet_mindzy.html
// (skip with: SEED_EU_AI_ACT_SKIP=1)
//
// Idempotent — safe to re-run.

import { readFileSync, existsSync } from 'node:fs'
import { neon } from '@neondatabase/serverless'

const SLUG = 'eu-ai-act-2024'
const SOURCE = '/Users/levelup/Downloads/eu_ai_act_rapport_complet_mindzy.html'

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return m ? m[1] : html
}

async function main() {
  if (process.env.SEED_EU_AI_ACT_SKIP === '1') {
    console.log('SEED_EU_AI_ACT_SKIP=1 — nothing to do.')
    return
  }
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set. Copy .env.local into the shell first.')
  }
  if (!existsSync(SOURCE)) {
    console.warn(`Source file not found at ${SOURCE} — skipping body seed.`)
    console.warn('Set SEED_EU_AI_ACT_SKIP=1 once the file is in place, or check the path.')
    return
  }

  const raw = readFileSync(SOURCE, 'utf8')
  const body = extractBody(raw)
  console.log(`Source: ${SOURCE} — ${(raw.length / 1024).toFixed(1)} KB total, body ${(body.length / 1024).toFixed(1)} KB`)

  const sql = neon(url)

  // 1. Ensure the catalog row has the right deliverable_types.
  // Pass JSON values as strings + ::jsonb cast — matches the project's neon() pattern
  // (Neon's HTTP client serializes JS values via JSON.stringify, so a raw object
  // would arrive as a JSON-encoded text without the ::jsonb cast).
  const formFieldsJson = JSON.stringify(['email', 'firstName', 'lastName', 'company'])
  const deliverableTypesJson = JSON.stringify({ fr: 'page', en: 'pdf', es: 'pdf' })

  await sql`
    INSERT INTO ebook_catalog (
      slug, is_free, is_active, currency, status, published_at,
      form_fields, deliverable_types, updated_at
    ) VALUES (
      ${SLUG}, true, true, 'eur', 'published', NOW(),
      ${formFieldsJson}::jsonb,
      ${deliverableTypesJson}::jsonb,
      NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      deliverable_types = EXCLUDED.deliverable_types,
      form_fields = EXCLUDED.form_fields,
      updated_at = NOW()
  `
  console.log('  ✓ ebook_catalog row ensured with deliverable_types = { fr: page, en: pdf, es: pdf }')

  // 2. Upsert the FR content with the HTML body.
  await sql`
    INSERT INTO ebook_content (
      slug, locale, title, subtitle, excerpt, category,
      html_content, is_db_only, updated_at
    ) VALUES (
      ${SLUG}, ${'fr'},
      ${'Règlement (UE) 2024/1689 — Rapport Complet AI Act'},
      ${"Le guide opérationnel de la conformité à l'AI Act pour les entreprises."},
      ${"Synthèse exécutive, classification par niveau de risque, obligations opérationnelles, sanctions, et roadmap de mise en conformité."},
      ${'juridique'},
      ${body},
      true, NOW()
    )
    ON CONFLICT (slug, locale) DO UPDATE SET
      html_content = EXCLUDED.html_content,
      title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      excerpt = EXCLUDED.excerpt,
      category = EXCLUDED.category,
      is_db_only = true,
      updated_at = NOW()
  `
  console.log('  ✓ ebook_content[fr] updated with HTML body')

  console.log('\nDone. Visit /fr/ebooks/eu-ai-act-2024 to see the rendered report.')
}

main().catch(err => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
