import { readFileSync } from 'fs'
import { join } from 'path'
import type { PortfolioItem } from './types'
import type { Locale } from './i18n'
import { portfolioItems as fallbackItems } from './config'

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_PORTFOLIO_ID
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY
const SHEET_NAME = process.env.GOOGLE_SHEETS_PORTFOLIO_SHEET || 'Portfolio'

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
}

function parseRow(headers: string[], row: string[]): PortfolioItem | null {
  const get = (col: string) => row[headers.indexOf(col)]?.trim() || ''

  const id = get('id')
  if (!id) return null

  const tagsRaw = get('tags') || get('category') || get('profession')
  const tags = parseTags(tagsRaw)
  if (tags.length === 0) return null

  return {
    id,
    title: {
      fr: get('title_fr') || get('title'),
      en: get('title_en') || get('title'),
      es: get('title_es') || get('title'),
    } as Record<Locale, string>,
    description: {
      fr: get('description_fr') || get('description'),
      en: get('description_en') || get('description'),
      es: get('description_es') || get('description'),
    } as Record<Locale, string>,
    tags,
    profession: get('profession'),
    image: get('image') || '/images/portfolio/placeholder-1.jpg',
    url: get('url') || undefined,
    featured: get('featured')?.toLowerCase() === 'true' || get('featured') === '1',
  }
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        current += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current)
  return fields
}

function loadFromCSV(): PortfolioItem[] {
  try {
    const csvPath = join(process.cwd(), 'data', 'portfolio.csv')
    const content = readFileSync(csvPath, 'utf-8')
    const lines = content.split('\n').filter((l) => l.trim())

    if (lines.length < 2) return []

    const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase())

    return lines
      .slice(1)
      .map((line) => parseRow(headers, parseCSVLine(line)))
      .filter((item): item is PortfolioItem => item !== null)
  } catch {
    return []
  }
}

async function fetchFromSheet(): Promise<PortfolioItem[]> {
  if (!SPREADSHEET_ID || !API_KEY) return []

  try {
    const range = encodeURIComponent(SHEET_NAME)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mindzy.me'
    const res = await fetch(url, {
      headers: { Referer: siteUrl },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => null)
      console.log('[Google Sheets] Failed to fetch portfolio:', res.status, errBody?.error?.message || res.statusText)
      return []
    }

    const data = await res.json()
    const rows: string[][] = data.values

    if (!rows || rows.length < 2) return []

    const headers = rows[0].map((h: string) => h.trim().toLowerCase())

    return rows
      .slice(1)
      .map((row) => parseRow(headers, row))
      .filter((item): item is PortfolioItem => item !== null)
  } catch (err) {
    console.log('[Google Sheets] Fetch error:', err)
    return []
  }
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const sheetItems = await fetchFromSheet()
  if (sheetItems.length > 0) return sheetItems

  console.warn('[Portfolio] Google Sheets unavailable, falling back to local CSV')
  const csvItems = loadFromCSV()
  if (csvItems.length > 0) return csvItems

  console.warn('[Portfolio] CSV empty or missing, falling back to config')
  return fallbackItems
}
