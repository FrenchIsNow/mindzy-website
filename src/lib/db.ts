import { neon } from '@neondatabase/serverless'

// ─── Client ───────────────────────────────────────────────────────────────────

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  return neon(url)
}

// ─── Schema init (idempotent) ─────────────────────────────────────────────────

let _initialized = false

export async function initDB() {
  if (_initialized) return
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS audit_requests (
      id          SERIAL PRIMARY KEY,
      email       TEXT NOT NULL,
      name        TEXT NOT NULL,
      site_url    TEXT NOT NULL,
      locale      TEXT NOT NULL DEFAULT 'fr',
      funnel_slug TEXT,
      status      TEXT NOT NULL DEFAULT 'pending',  -- pending | in_progress | delivered
      notes       TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS ebook_leads (
      id          SERIAL PRIMARY KEY,
      email       TEXT NOT NULL,
      name        TEXT NOT NULL,
      phone       TEXT,
      company     TEXT,
      ebook_slug  TEXT NOT NULL,
      locale      TEXT NOT NULL DEFAULT 'fr',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS ebook_orders (
      id                  SERIAL PRIMARY KEY,
      stripe_session_id   TEXT UNIQUE,
      email               TEXT NOT NULL,
      name                TEXT NOT NULL,
      ebook_slug          TEXT NOT NULL,
      locale              TEXT NOT NULL DEFAULT 'fr',
      amount_cents        INTEGER NOT NULL,
      currency            TEXT NOT NULL DEFAULT 'eur',
      has_order_bump      BOOLEAN DEFAULT FALSE,
      upsell_accepted     BOOLEAN DEFAULT FALSE,
      upsell_amount_cents INTEGER,
      status              TEXT NOT NULL DEFAULT 'pending',  -- pending | paid | refunded
      promo_code          TEXT,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ebook_catalog is the source of truth for pricing, promos, and upsell config.
  // Content (chapters, descriptions, images) stays in src/lib/ebooks.ts.
  await sql`
    CREATE TABLE IF NOT EXISTS ebook_catalog (
      id                   SERIAL PRIMARY KEY,
      slug                 TEXT UNIQUE NOT NULL,
      is_free              BOOLEAN DEFAULT TRUE,
      price_cents          INTEGER,           -- null when free
      original_price_cents INTEGER,           -- crossed-out anchor price
      currency             TEXT DEFAULT 'eur',
      promo_code           TEXT,              -- exact code to enter at checkout
      promo_discount_pct   INTEGER,           -- e.g. 20 = 20% off
      promo_expires_at     TIMESTAMPTZ,       -- null = never expires
      is_active            BOOLEAN DEFAULT TRUE,
      has_upsell           BOOLEAN DEFAULT FALSE,
      upsell_price_cents   INTEGER,
      upsell_slug          TEXT,              -- slug of the upsell product/funnel
      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // Seed catalog with known ebooks (no-op if already present)
  await sql`
    INSERT INTO ebook_catalog (slug, is_free) VALUES
      ('lancer-presence-digitale-2026', TRUE),
      ('seo-geo-expert-guide',          FALSE)
    ON CONFLICT (slug) DO NOTHING
  `

  // GEO ebook: paid, 27€ (was 49€), with upsell audit at 97€
  await sql`
    UPDATE ebook_catalog SET
      is_free              = FALSE,
      price_cents          = 2700,
      original_price_cents = 4900,
      currency             = 'eur',
      has_upsell           = TRUE,
      upsell_price_cents   = 9700,
      upsell_slug          = 'geo-audit'
    WHERE slug = 'seo-geo-expert-guide'
      AND price_cents IS NULL
  `

  _initialized = true
}

// ─── Audit requests ───────────────────────────────────────────────────────────

export async function saveAuditRequest(data: {
  email: string
  name: string
  siteUrl: string
  locale: string
  funnelSlug?: string
}): Promise<number> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO audit_requests (email, name, site_url, locale, funnel_slug)
    VALUES (${data.email}, ${data.name}, ${data.siteUrl}, ${data.locale}, ${data.funnelSlug ?? null})
    RETURNING id
  `
  return rows[0].id as number
}

export async function getPendingAudits() {
  await initDB()
  const sql = getSql()
  return sql`
    SELECT * FROM audit_requests WHERE status = 'pending' ORDER BY created_at DESC
  `
}

export async function updateAuditStatus(id: number, status: 'pending' | 'in_progress' | 'delivered', notes?: string) {
  const sql = getSql()
  await sql`
    UPDATE audit_requests
    SET status = ${status}, notes = ${notes ?? null}, updated_at = NOW()
    WHERE id = ${id}
  `
}

// ─── Ebook leads (free downloads) ────────────────────────────────────────────

export async function saveEbookLead(data: {
  email: string
  name: string
  phone?: string
  company?: string
  ebookSlug: string
  locale: string
}): Promise<number> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO ebook_leads (email, name, phone, company, ebook_slug, locale)
    VALUES (${data.email}, ${data.name}, ${data.phone ?? null}, ${data.company ?? null}, ${data.ebookSlug}, ${data.locale})
    RETURNING id
  `
  return rows[0].id as number
}

export async function getEbookLeads(ebookSlug?: string) {
  await initDB()
  const sql = getSql()
  if (ebookSlug) {
    return sql`SELECT * FROM ebook_leads WHERE ebook_slug = ${ebookSlug} ORDER BY created_at DESC`
  }
  return sql`SELECT * FROM ebook_leads ORDER BY created_at DESC`
}

// ─── Ebook orders (paid) ──────────────────────────────────────────────────────

export async function saveEbookOrder(data: {
  stripeSessionId: string
  email: string
  name: string
  ebookSlug: string
  locale: string
  amountCents: number
  currency: string
  hasOrderBump: boolean
  promoCode?: string
}): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    INSERT INTO ebook_orders
      (stripe_session_id, email, name, ebook_slug, locale, amount_cents, currency, has_order_bump, promo_code)
    VALUES
      (${data.stripeSessionId}, ${data.email}, ${data.name}, ${data.ebookSlug},
       ${data.locale}, ${data.amountCents}, ${data.currency}, ${data.hasOrderBump}, ${data.promoCode ?? null})
    ON CONFLICT (stripe_session_id) DO NOTHING
  `
}

export async function markOrderPaid(stripeSessionId: string): Promise<void> {
  const sql = getSql()
  await sql`
    UPDATE ebook_orders SET status = 'paid' WHERE stripe_session_id = ${stripeSessionId}
  `
}

export async function markUpsellAccepted(stripeSessionId: string, upsellAmountCents: number): Promise<void> {
  const sql = getSql()
  await sql`
    UPDATE ebook_orders
    SET upsell_accepted = TRUE, upsell_amount_cents = ${upsellAmountCents}
    WHERE stripe_session_id = ${stripeSessionId}
  `
}

export async function getEbookOrders(ebookSlug?: string) {
  await initDB()
  const sql = getSql()
  if (ebookSlug) {
    return sql`SELECT * FROM ebook_orders WHERE ebook_slug = ${ebookSlug} ORDER BY created_at DESC`
  }
  return sql`SELECT * FROM ebook_orders ORDER BY created_at DESC`
}

// ─── Ebook catalog ────────────────────────────────────────────────────────────

export interface CatalogEntry {
  id: number
  slug: string
  is_free: boolean
  price_cents: number | null
  original_price_cents: number | null
  currency: string
  promo_code: string | null
  promo_discount_pct: number | null
  promo_expires_at: string | null
  is_active: boolean
  has_upsell: boolean
  upsell_price_cents: number | null
  upsell_slug: string | null
}

export async function getCatalogEntry(slug: string): Promise<CatalogEntry | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM ebook_catalog WHERE slug = ${slug} AND is_active = TRUE
  `
  return (rows[0] as CatalogEntry) ?? null
}

export async function getAllCatalogEntries(): Promise<CatalogEntry[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM ebook_catalog ORDER BY id`
  return rows as CatalogEntry[]
}

export async function upsertCatalogEntry(data: Partial<CatalogEntry> & { slug: string }): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    INSERT INTO ebook_catalog (
      slug, is_free, price_cents, original_price_cents, currency,
      promo_code, promo_discount_pct, promo_expires_at,
      is_active, has_upsell, upsell_price_cents, upsell_slug, updated_at
    ) VALUES (
      ${data.slug},
      ${data.is_free ?? true},
      ${data.price_cents ?? null},
      ${data.original_price_cents ?? null},
      ${data.currency ?? 'eur'},
      ${data.promo_code ?? null},
      ${data.promo_discount_pct ?? null},
      ${data.promo_expires_at ?? null},
      ${data.is_active ?? true},
      ${data.has_upsell ?? false},
      ${data.upsell_price_cents ?? null},
      ${data.upsell_slug ?? null},
      NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      is_free              = EXCLUDED.is_free,
      price_cents          = EXCLUDED.price_cents,
      original_price_cents = EXCLUDED.original_price_cents,
      currency             = EXCLUDED.currency,
      promo_code           = EXCLUDED.promo_code,
      promo_discount_pct   = EXCLUDED.promo_discount_pct,
      promo_expires_at     = EXCLUDED.promo_expires_at,
      is_active            = EXCLUDED.is_active,
      has_upsell           = EXCLUDED.has_upsell,
      upsell_price_cents   = EXCLUDED.upsell_price_cents,
      upsell_slug          = EXCLUDED.upsell_slug,
      updated_at           = NOW()
  `
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the effective price in cents after applying an active promo code. */
export function applyPromo(entry: CatalogEntry, code: string): number {
  if (!entry.promo_code || !entry.price_cents) return entry.price_cents ?? 0
  if (entry.promo_code.toLowerCase() !== code.toLowerCase()) return entry.price_cents
  if (entry.promo_expires_at && new Date(entry.promo_expires_at) < new Date()) return entry.price_cents
  const discount = entry.promo_discount_pct ?? 0
  return Math.round(entry.price_cents * (1 - discount / 100))
}
