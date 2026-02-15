import { chromium } from 'playwright'
import { readFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public', 'images', 'portfolio')
const CSV_PATH = join(ROOT, 'data', 'portfolio.csv')

function parseCSVLine(line) {
  const fields = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') { current += '"'; i++ }
      else if (char === '"') inQuotes = false
      else current += char
    } else if (char === '"') inQuotes = true
    else if (char === ',') { fields.push(current); current = '' }
    else current += char
  }
  fields.push(current)
  return fields
}

function loadSites() {
  const content = readFileSync(CSV_PATH, 'utf-8')
  const lines = content.split('\n').filter((l) => l.trim())
  if (lines.length < 2) return []
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase())
  return lines.slice(1).map((line) => {
    const row = parseCSVLine(line)
    const get = (col) => row[headers.indexOf(col)]?.trim() || ''
    return { id: get('id'), title: get('title_fr'), url: get('url') }
  }).filter((s) => s.id && s.url)
}

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function capture() {
  mkdirSync(OUT_DIR, { recursive: true })
  const sites = loadSites()
  console.log(`Found ${sites.length} sites to capture\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    locale: 'fr-FR',
  })

  const results = []

  for (const site of sites) {
    const slug = slugify(site.title)
    const filename = `${slug}.jpg`
    const filepath = join(OUT_DIR, filename)

    console.log(`[${site.id}] ${site.title} → ${site.url}`)

    try {
      const page = await context.newPage()
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 })
      await page.waitForTimeout(1500)
      await page.screenshot({ path: filepath, type: 'jpeg', quality: 85 })
      await page.close()
      results.push({ id: site.id, title: site.title, filename, ok: true })
      console.log(`  ✓ saved ${filename}`)
    } catch (err) {
      console.log(`  ✗ failed: ${err.message}`)
      results.push({ id: site.id, title: site.title, filename, ok: false })
    }
  }

  await browser.close()

  console.log(`\n--- Results ---`)
  const ok = results.filter((r) => r.ok)
  const fail = results.filter((r) => !r.ok)
  console.log(`✓ ${ok.length} captured`)
  if (fail.length) {
    console.log(`✗ ${fail.length} failed:`)
    fail.forEach((r) => console.log(`  - ${r.title}`))
  }
}

capture().catch(console.error)
