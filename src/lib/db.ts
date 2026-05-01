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

  // ─── Dashboard: clients (multi-tenant blog review) ──────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS dashboard_clients (
      id              SERIAL PRIMARY KEY,
      slug            TEXT UNIQUE NOT NULL,
      name            TEXT NOT NULL,
      email           TEXT,
      domain          TEXT,
      personality     TEXT,
      target_audience TEXT,
      site_url        TEXT,
      locale          TEXT NOT NULL DEFAULT 'fr',
      persona_prompt  TEXT,
      frequency       TEXT NOT NULL DEFAULT 'monthly',
      posts_per_cycle INTEGER NOT NULL DEFAULT 4,
      ingest_url      TEXT,
      ingest_token    TEXT,
      password_hash   TEXT NOT NULL,
      active          BOOLEAN NOT NULL DEFAULT TRUE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS blog_ideas (
      id            SERIAL PRIMARY KEY,
      client_id     INTEGER NOT NULL REFERENCES dashboard_clients(id) ON DELETE CASCADE,
      question      TEXT NOT NULL,
      category      TEXT,
      subcategory   TEXT,
      target        TEXT,
      content_type  TEXT,
      seo_priority  TEXT,
      locale        TEXT,
      status        TEXT NOT NULL DEFAULT 'idea',
      scheduled_for DATE,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_ideas_client ON blog_ideas(client_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_ideas_status ON blog_ideas(status)`

  await sql`
    CREATE TABLE IF NOT EXISTS blog_articles (
      id              SERIAL PRIMARY KEY,
      client_id       INTEGER NOT NULL REFERENCES dashboard_clients(id) ON DELETE CASCADE,
      idea_id         INTEGER REFERENCES blog_ideas(id) ON DELETE SET NULL,
      title           TEXT NOT NULL,
      slug            TEXT NOT NULL,
      excerpt         TEXT,
      content_html    TEXT NOT NULL DEFAULT '',
      cover_image_url TEXT,
      cover_alt       TEXT,
      keywords        TEXT[],
      category        TEXT,
      reading_time    INTEGER,
      locale          TEXT NOT NULL DEFAULT 'fr',
      status          TEXT NOT NULL DEFAULT 'pending_review',
      client_notes    TEXT,
      drive_md_url    TEXT,
      drive_image_url TEXT,
      sheet_row_id    TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      published_at    TIMESTAMPTZ
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_articles_client ON blog_articles(client_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status)`
  // canonical_slug was added via migration; ensure it exists for fresh deployments too
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS canonical_slug TEXT`
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_articles_canonical ON blog_articles(canonical_slug)`

  // ─── Services / products catalog (used as upsells) ──────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id                SERIAL PRIMARY KEY,
      slug              TEXT UNIQUE NOT NULL,
      name              TEXT NOT NULL,
      description       TEXT,
      price_cents       INTEGER NOT NULL DEFAULT 0,
      currency          TEXT NOT NULL DEFAULT 'eur',
      is_active         BOOLEAN NOT NULL DEFAULT TRUE,
      stripe_product_id TEXT,
      stripe_price_id   TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS stripe_product_id TEXT`
  await sql`ALTER TABLE services ADD COLUMN IF NOT EXISTS stripe_price_id TEXT`
  await sql`ALTER TABLE services DROP COLUMN IF EXISTS url`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS stripe_product_id TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS stripe_price_id TEXT`

  // Seed the GEO audit service — referenced by the seo-geo-expert-guide ebook as upsell.
  await sql`
    INSERT INTO services (slug, name, description, price_cents, currency)
    SELECT 'geo-audit', 'Audit GEO personnalisé',
           'Audit complet de votre visibilité sur les IA génératives (ChatGPT, Perplexity, Claude). Recommandations actionnables pour devenir la source citée dans votre domaine.',
           9700, 'eur'
    WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'geo-audit')
  `

  // ─── Profiles (linktree-style founder / team cards) ────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id          SERIAL PRIMARY KEY,
      slug        TEXT UNIQUE NOT NULL,
      name        TEXT NOT NULL,
      title       TEXT,
      subtitle    TEXT,
      company     TEXT,
      initials    TEXT,
      photo_url   TEXT,
      links       JSONB NOT NULL DEFAULT '[]'::jsonb,
      is_active   BOOLEAN NOT NULL DEFAULT TRUE,
      seo_title   TEXT,
      seo_desc    TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS photo_url TEXT`

  // Seed the two founder profiles (no-op if already present).
  await sql`
    INSERT INTO profiles (slug, name, title, subtitle, company, initials, links, seo_title, seo_desc)
    SELECT 'cocotier', 'Romuald Cocotier', 'CEO & Co-Founder', 'AI Expert', 'Mindzy', 'RC',
      '[
        {"platform":"whatsapp","label":"WhatsApp","href":"https://wa.me/33767546794","icon":"whatsapp","color":"#25D366"},
        {"platform":"linkedin","label":"LinkedIn","href":"https://www.linkedin.com/in/r-cocotier/","icon":"linkedin","color":"#0A66C2"},
        {"platform":"wechat","label":"WeChat","href":"weixin://dl/chat?Mr_cocotier","icon":"wechat","color":"#07C160"}
      ]'::jsonb,
      'Romuald Cocotier — Founder & AI Expert @ Mindzy',
      'Connectez-vous avec Romuald Cocotier, fondateur de Mindzy et expert IA.'
    WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE slug = 'cocotier')
  `
  await sql`
    INSERT INTO profiles (slug, name, title, subtitle, company, initials, links, seo_title, seo_desc)
    SELECT 'martel', 'William Martel', 'CFO & Co-Founder', 'Fund Advisor', 'Mindzy', 'WM',
      '[
        {"platform":"whatsapp","label":"WhatsApp","href":"https://wa.me/33682765387","icon":"whatsapp","color":"#25D366"},
        {"platform":"linkedin","label":"LinkedIn","href":"https://www.linkedin.com/in/williamartel/","icon":"linkedin","color":"#0A66C2"},
        {"platform":"wechat","label":"WeChat: Mr_Denze","href":"weixin://dl/chat?Mr_Denze","icon":"wechat","color":"#07C160"}
      ]'::jsonb,
      'William Martel — Co-Founder @ Mindzy',
      'Connectez-vous avec William Martel, co-fondateur de Mindzy.'
    WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE slug = 'martel')
  `

  // ─── Ebook content (editable landing-page copy, multi-locale) ──────────────
  // Keyed by (slug, locale). Stores the fields that back `/[locale]/ebooks/[slug]`.
  // Also holds the PDF + cover URLs (Vercel Blob) for ebooks created from the dashboard.
  await sql`
    CREATE TABLE IF NOT EXISTS ebook_content (
      id              SERIAL PRIMARY KEY,
      slug            TEXT NOT NULL,
      locale          TEXT NOT NULL,
      title           TEXT,
      subtitle        TEXT,
      excerpt         TEXT,
      category        TEXT,
      tags            TEXT[],
      image_url       TEXT,
      pdf_url         TEXT,
      pages           INTEGER,
      reading_time    INTEGER,
      chapters        JSONB,              -- [{num, title}]
      features        JSONB,              -- [{num, label, title, desc}]
      stats           JSONB,              -- [{value, label}]
      testimonial     JSONB,              -- {quote, author, role}
      is_db_only      BOOLEAN NOT NULL DEFAULT FALSE, -- true when no static fallback exists
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (slug, locale)
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_ebook_content_slug ON ebook_content(slug)`

  // Self-blog: Mindzy's own articles are managed as a special "mindzy" client.
  // Seed on first init so the admin always sees "Mon blog" in the sidebar.
  // Password is a random string; admin manages this via the Paramètres tab.
  await sql`
    INSERT INTO dashboard_clients (slug, name, email, locale, frequency, posts_per_cycle, password_hash)
    SELECT 'mindzy', 'Mindzy (mon blog)', 'self@mindzy.me', 'fr', 'weekly', 1,
      'scrypt$0000000000000000000000000000000000000000000000000000000000000000$0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    WHERE NOT EXISTS (SELECT 1 FROM dashboard_clients WHERE slug = 'mindzy')
  `

  _initialized = true
}

// ─── Dashboard: clients ──────────────────────────────────────────────────────

export interface DashboardClient {
  id: number
  slug: string
  name: string
  email: string | null
  domain: string | null
  personality: string | null
  target_audience: string | null
  site_url: string | null
  locale: string
  persona_prompt: string | null
  frequency: string
  posts_per_cycle: number
  ingest_url: string | null
  ingest_token: string | null
  password_hash: string
  active: boolean
  created_at: string
  updated_at: string
}

export async function createDashboardClient(data: {
  slug: string
  name: string
  email?: string
  domain?: string
  personality?: string
  targetAudience?: string
  siteUrl?: string
  locale?: string
  personaPrompt?: string
  frequency?: string
  postsPerCycle?: number
  ingestUrl?: string
  ingestToken?: string
  passwordHash: string
}): Promise<DashboardClient> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO dashboard_clients (
      slug, name, email, domain, personality, target_audience,
      site_url, locale, persona_prompt, frequency, posts_per_cycle,
      ingest_url, ingest_token, password_hash
    ) VALUES (
      ${data.slug}, ${data.name}, ${data.email ?? null}, ${data.domain ?? null},
      ${data.personality ?? null}, ${data.targetAudience ?? null},
      ${data.siteUrl ?? null}, ${data.locale ?? 'fr'}, ${data.personaPrompt ?? null},
      ${data.frequency ?? 'monthly'}, ${data.postsPerCycle ?? 4},
      ${data.ingestUrl ?? null}, ${data.ingestToken ?? null}, ${data.passwordHash}
    )
    RETURNING *
  `
  return rows[0] as DashboardClient
}

export async function listDashboardClients(): Promise<DashboardClient[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM dashboard_clients ORDER BY created_at DESC`
  return rows as DashboardClient[]
}

export async function getDashboardClientBySlug(slug: string): Promise<DashboardClient | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM dashboard_clients WHERE slug = ${slug} LIMIT 1`
  return (rows[0] as DashboardClient) ?? null
}

export async function getDashboardClientByEmail(email: string): Promise<DashboardClient | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM dashboard_clients WHERE LOWER(email) = LOWER(${email}) LIMIT 1`
  return (rows[0] as DashboardClient) ?? null
}

export async function getDashboardClientById(id: number): Promise<DashboardClient | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM dashboard_clients WHERE id = ${id} LIMIT 1`
  return (rows[0] as DashboardClient) ?? null
}

export async function updateDashboardClient(
  id: number,
  data: Partial<Omit<DashboardClient, 'id' | 'created_at' | 'updated_at'>>,
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE dashboard_clients SET
      name            = COALESCE(${data.name ?? null}, name),
      email           = COALESCE(${data.email ?? null}, email),
      domain          = COALESCE(${data.domain ?? null}, domain),
      personality     = COALESCE(${data.personality ?? null}, personality),
      target_audience = COALESCE(${data.target_audience ?? null}, target_audience),
      site_url        = COALESCE(${data.site_url ?? null}, site_url),
      locale          = COALESCE(${data.locale ?? null}, locale),
      persona_prompt  = COALESCE(${data.persona_prompt ?? null}, persona_prompt),
      frequency       = COALESCE(${data.frequency ?? null}, frequency),
      posts_per_cycle = COALESCE(${data.posts_per_cycle ?? null}, posts_per_cycle),
      ingest_url      = COALESCE(${data.ingest_url ?? null}, ingest_url),
      ingest_token    = COALESCE(${data.ingest_token ?? null}, ingest_token),
      password_hash   = COALESCE(${data.password_hash ?? null}, password_hash),
      active          = COALESCE(${data.active ?? null}, active),
      updated_at      = NOW()
    WHERE id = ${id}
  `
}

export async function deleteDashboardClient(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM dashboard_clients WHERE id = ${id}`
}

// ─── Dashboard: blog ideas ───────────────────────────────────────────────────

export interface BlogIdea {
  id: number
  client_id: number
  question: string
  category: string | null
  subcategory: string | null
  target: string | null
  content_type: string | null
  seo_priority: string | null
  locale: string | null
  status: string
  scheduled_for: string | null
  created_at: string
}

export async function createBlogIdea(data: {
  clientId: number
  question: string
  category?: string
  subcategory?: string
  target?: string
  contentType?: string
  seoPriority?: string
  locale?: string
}): Promise<BlogIdea> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO blog_ideas (
      client_id, question, category, subcategory, target,
      content_type, seo_priority, locale
    ) VALUES (
      ${data.clientId}, ${data.question}, ${data.category ?? null},
      ${data.subcategory ?? null}, ${data.target ?? null},
      ${data.contentType ?? null}, ${data.seoPriority ?? null}, ${data.locale ?? null}
    )
    RETURNING *
  `
  return rows[0] as BlogIdea
}

export async function bulkInsertBlogIdeas(
  clientId: number,
  ideas: Array<{
    question: string
    category?: string
    subcategory?: string
    target?: string
    contentType?: string
    seoPriority?: string
    locale?: string
  }>,
): Promise<number> {
  if (ideas.length === 0) return 0
  await initDB()
  const sql = getSql()
  let count = 0
  for (const idea of ideas) {
    await sql`
      INSERT INTO blog_ideas (
        client_id, question, category, subcategory, target,
        content_type, seo_priority, locale
      ) VALUES (
        ${clientId}, ${idea.question}, ${idea.category ?? null},
        ${idea.subcategory ?? null}, ${idea.target ?? null},
        ${idea.contentType ?? null}, ${idea.seoPriority ?? null}, ${idea.locale ?? null}
      )
    `
    count++
  }
  return count
}

export async function listBlogIdeas(clientId: number): Promise<BlogIdea[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM blog_ideas WHERE client_id = ${clientId} ORDER BY created_at ASC
  `
  return rows as BlogIdea[]
}

export async function getBlogIdea(id: number): Promise<BlogIdea | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM blog_ideas WHERE id = ${id} LIMIT 1`
  return (rows[0] as BlogIdea) ?? null
}

export async function updateBlogIdea(
  id: number,
  data: Partial<Omit<BlogIdea, 'id' | 'client_id' | 'created_at'>>,
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE blog_ideas SET
      question     = COALESCE(${data.question ?? null}, question),
      category     = COALESCE(${data.category ?? null}, category),
      subcategory  = COALESCE(${data.subcategory ?? null}, subcategory),
      target       = COALESCE(${data.target ?? null}, target),
      content_type = COALESCE(${data.content_type ?? null}, content_type),
      seo_priority = COALESCE(${data.seo_priority ?? null}, seo_priority),
      locale       = COALESCE(${data.locale ?? null}, locale),
      status       = COALESCE(${data.status ?? null}, status)
    WHERE id = ${id}
  `
}

export async function deleteBlogIdea(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM blog_ideas WHERE id = ${id}`
}

// ─── Dashboard: blog articles ────────────────────────────────────────────────

export interface BlogArticle {
  id: number
  client_id: number
  idea_id: number | null
  title: string
  slug: string
  canonical_slug: string | null
  excerpt: string | null
  content_html: string
  cover_image_url: string | null
  cover_alt: string | null
  keywords: string[] | null
  category: string | null
  reading_time: number | null
  locale: string
  status: string
  client_notes: string | null
  drive_md_url: string | null
  drive_image_url: string | null
  sheet_row_id: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export async function createBlogArticle(data: {
  clientId: number
  ideaId?: number | null
  title: string
  slug: string
  canonicalSlug?: string
  excerpt?: string
  contentHtml?: string
  coverImageUrl?: string
  coverAlt?: string
  keywords?: string[]
  category?: string
  readingTime?: number
  locale?: string
  status?: string
  driveMdUrl?: string
  driveImageUrl?: string
  sheetRowId?: string
}): Promise<BlogArticle> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO blog_articles (
      client_id, idea_id, title, slug, canonical_slug, excerpt, content_html,
      cover_image_url, cover_alt, keywords, category, reading_time,
      locale, status, drive_md_url, drive_image_url, sheet_row_id
    ) VALUES (
      ${data.clientId}, ${data.ideaId ?? null}, ${data.title}, ${data.slug},
      ${data.canonicalSlug ?? null}, ${data.excerpt ?? null}, ${data.contentHtml ?? ''},
      ${data.coverImageUrl ?? null}, ${data.coverAlt ?? null},
      ${data.keywords ?? null}, ${data.category ?? null}, ${data.readingTime ?? null},
      ${data.locale ?? 'fr'}, ${data.status ?? 'pending_review'},
      ${data.driveMdUrl ?? null}, ${data.driveImageUrl ?? null}, ${data.sheetRowId ?? null}
    )
    RETURNING *
  `
  return rows[0] as BlogArticle
}

export async function getArticleTranslations(canonicalSlug: string, clientId: number): Promise<BlogArticle[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM blog_articles
    WHERE canonical_slug = ${canonicalSlug} AND client_id = ${clientId}
    ORDER BY CASE locale WHEN 'fr' THEN 1 WHEN 'en' THEN 2 WHEN 'es' THEN 3 ELSE 4 END
  `
  return rows as BlogArticle[]
}

export async function listBlogArticlesForClient(clientId: number): Promise<BlogArticle[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM blog_articles WHERE client_id = ${clientId} ORDER BY created_at DESC
  `
  return rows as BlogArticle[]
}

export async function getBlogArticle(id: number): Promise<BlogArticle | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM blog_articles WHERE id = ${id} LIMIT 1`
  return (rows[0] as BlogArticle) ?? null
}

export async function updateBlogArticle(
  id: number,
  data: Partial<Omit<BlogArticle, 'id' | 'client_id' | 'created_at' | 'updated_at'>>,
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE blog_articles SET
      title           = COALESCE(${data.title ?? null}, title),
      slug            = COALESCE(${data.slug ?? null}, slug),
      excerpt         = COALESCE(${data.excerpt ?? null}, excerpt),
      content_html    = COALESCE(${data.content_html ?? null}, content_html),
      cover_image_url = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
      cover_alt       = COALESCE(${data.cover_alt ?? null}, cover_alt),
      keywords        = COALESCE(${data.keywords ?? null}, keywords),
      category        = COALESCE(${data.category ?? null}, category),
      reading_time    = COALESCE(${data.reading_time ?? null}, reading_time),
      locale          = COALESCE(${data.locale ?? null}, locale),
      status          = COALESCE(${data.status ?? null}, status),
      client_notes    = COALESCE(${data.client_notes ?? null}, client_notes),
      published_at    = COALESCE(${data.published_at ?? null}, published_at),
      updated_at      = NOW()
    WHERE id = ${id}
  `
}

export async function deleteBlogArticle(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM blog_articles WHERE id = ${id}`
}

// ─── Services / products ─────────────────────────────────────────────────────

export interface Service {
  id: number
  slug: string
  name: string
  description: string | null
  price_cents: number
  currency: string
  is_active: boolean
  stripe_product_id: string | null
  stripe_price_id: string | null
  created_at: string
  updated_at: string
}

export async function updateServiceStripeIds(
  id: number,
  ids: { productId: string; priceId: string },
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE services
    SET stripe_product_id = ${ids.productId}, stripe_price_id = ${ids.priceId}, updated_at = NOW()
    WHERE id = ${id}
  `
}

export async function updateCatalogStripeIds(
  slug: string,
  ids: { productId: string; priceId: string },
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE ebook_catalog
    SET stripe_product_id = ${ids.productId}, stripe_price_id = ${ids.priceId}, updated_at = NOW()
    WHERE slug = ${slug}
  `
}

export async function listServices(activeOnly = false): Promise<Service[]> {
  await initDB()
  const sql = getSql()
  const rows = activeOnly
    ? await sql`SELECT * FROM services WHERE is_active = TRUE ORDER BY name ASC`
    : await sql`SELECT * FROM services ORDER BY name ASC`
  return rows as Service[]
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM services WHERE slug = ${slug} LIMIT 1`
  return (rows[0] as Service) ?? null
}

export async function createService(data: {
  slug: string
  name: string
  description?: string
  priceCents: number
  currency?: string
}): Promise<Service> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO services (slug, name, description, price_cents, currency)
    VALUES (${data.slug}, ${data.name}, ${data.description ?? null}, ${data.priceCents},
            ${data.currency ?? 'eur'})
    RETURNING *
  `
  return rows[0] as Service
}

export async function updateService(
  id: number,
  data: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>,
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE services SET
      name         = COALESCE(${data.name ?? null}, name),
      description  = COALESCE(${data.description ?? null}, description),
      price_cents  = COALESCE(${data.price_cents ?? null}, price_cents),
      currency     = COALESCE(${data.currency ?? null}, currency),
      is_active    = COALESCE(${data.is_active ?? null}, is_active),
      updated_at   = NOW()
    WHERE id = ${id}
  `
}

export async function deleteService(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM services WHERE id = ${id}`
}

export async function countArticlesForClient(clientId: number): Promise<{ total: number; pending: number; approved: number; published: number }> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'pending_review')::int AS pending,
      COUNT(*) FILTER (WHERE status = 'approved')::int AS approved,
      COUNT(*) FILTER (WHERE status = 'published')::int AS published
    FROM blog_articles WHERE client_id = ${clientId}
  `
  return rows[0] as { total: number; pending: number; approved: number; published: number }
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
  stripe_product_id?: string | null
  stripe_price_id?: string | null
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

// ─── Ebook content (editable landing-page copy per locale) ──────────────────

export interface EbookChapter { num: string; title: string }
export interface EbookFeature { num: string; label: string; title: string; desc: string }
export interface EbookStat { value: string; label: string }
export interface EbookTestimonial { quote: string; author: string; role: string }

export interface EbookContent {
  id: number
  slug: string
  locale: string
  title: string | null
  subtitle: string | null
  excerpt: string | null
  category: string | null
  tags: string[] | null
  image_url: string | null
  pdf_url: string | null
  pages: number | null
  reading_time: number | null
  chapters: EbookChapter[] | null
  features: EbookFeature[] | null
  stats: EbookStat[] | null
  testimonial: EbookTestimonial | null
  is_db_only: boolean
  updated_at: string
}

export async function getEbookContent(slug: string, locale: string): Promise<EbookContent | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM ebook_content WHERE slug = ${slug} AND locale = ${locale} LIMIT 1
  `
  return (rows[0] as EbookContent) ?? null
}

export async function listEbookContentForSlug(slug: string): Promise<EbookContent[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM ebook_content WHERE slug = ${slug}`
  return rows as EbookContent[]
}

export async function listDbOnlyEbookSlugs(): Promise<string[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT DISTINCT slug FROM ebook_content WHERE is_db_only = TRUE`
  return (rows as Array<{ slug: string }>).map(r => r.slug)
}

export async function upsertEbookContent(data: {
  slug: string
  locale: string
  title?: string | null
  subtitle?: string | null
  excerpt?: string | null
  category?: string | null
  tags?: string[] | null
  imageUrl?: string | null
  pdfUrl?: string | null
  pages?: number | null
  readingTime?: number | null
  chapters?: EbookChapter[] | null
  features?: EbookFeature[] | null
  stats?: EbookStat[] | null
  testimonial?: EbookTestimonial | null
  isDbOnly?: boolean
}): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    INSERT INTO ebook_content (
      slug, locale, title, subtitle, excerpt, category, tags,
      image_url, pdf_url, pages, reading_time,
      chapters, features, stats, testimonial, is_db_only, updated_at
    ) VALUES (
      ${data.slug}, ${data.locale},
      ${data.title ?? null}, ${data.subtitle ?? null}, ${data.excerpt ?? null},
      ${data.category ?? null}, ${data.tags ?? null},
      ${data.imageUrl ?? null}, ${data.pdfUrl ?? null},
      ${data.pages ?? null}, ${data.readingTime ?? null},
      ${data.chapters ? JSON.stringify(data.chapters) : null}::jsonb,
      ${data.features ? JSON.stringify(data.features) : null}::jsonb,
      ${data.stats ? JSON.stringify(data.stats) : null}::jsonb,
      ${data.testimonial ? JSON.stringify(data.testimonial) : null}::jsonb,
      ${data.isDbOnly ?? false},
      NOW()
    )
    ON CONFLICT (slug, locale) DO UPDATE SET
      title        = EXCLUDED.title,
      subtitle     = EXCLUDED.subtitle,
      excerpt      = EXCLUDED.excerpt,
      category     = EXCLUDED.category,
      tags         = EXCLUDED.tags,
      image_url    = EXCLUDED.image_url,
      pdf_url      = EXCLUDED.pdf_url,
      pages        = EXCLUDED.pages,
      reading_time = EXCLUDED.reading_time,
      chapters     = EXCLUDED.chapters,
      features     = EXCLUDED.features,
      stats        = EXCLUDED.stats,
      testimonial  = EXCLUDED.testimonial,
      is_db_only   = EXCLUDED.is_db_only,
      updated_at   = NOW()
  `
}

export async function deleteEbookContent(slug: string): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM ebook_content WHERE slug = ${slug}`
}

// ─── Profiles (linktree-style founder cards) ────────────────────────────────

export type ProfileLink = {
  platform: string
  label: string
  href: string
  icon: 'whatsapp' | 'linkedin' | 'wechat' | 'email' | 'web' | 'phone' | 'instagram'
  color: string
}

export interface Profile {
  id: number
  slug: string
  name: string
  title: string | null
  subtitle: string | null
  company: string | null
  initials: string | null
  photo_url: string | null
  links: ProfileLink[]
  is_active: boolean
  seo_title: string | null
  seo_desc: string | null
  created_at: string
  updated_at: string
}

export async function listProfiles(): Promise<Profile[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM profiles ORDER BY created_at DESC`
  return rows as Profile[]
}

export async function getProfile(slug: string): Promise<Profile | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM profiles WHERE slug = ${slug} LIMIT 1`
  return (rows[0] as Profile) ?? null
}

export async function createProfile(data: {
  slug: string
  name: string
  title?: string
  subtitle?: string
  company?: string
  initials?: string
  links?: ProfileLink[]
  seoTitle?: string
  seoDesc?: string
}): Promise<Profile> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO profiles (slug, name, title, subtitle, company, initials, links, seo_title, seo_desc)
    VALUES (
      ${data.slug}, ${data.name}, ${data.title ?? null}, ${data.subtitle ?? null},
      ${data.company ?? null}, ${data.initials ?? null},
      ${JSON.stringify(data.links ?? [])}::jsonb,
      ${data.seoTitle ?? null}, ${data.seoDesc ?? null}
    )
    RETURNING *
  `
  return rows[0] as Profile
}

export async function updateProfile(
  id: number,
  data: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>,
): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE profiles SET
      name      = COALESCE(${data.name ?? null}, name),
      title     = COALESCE(${data.title ?? null}, title),
      subtitle  = COALESCE(${data.subtitle ?? null}, subtitle),
      company   = COALESCE(${data.company ?? null}, company),
      initials  = COALESCE(${data.initials ?? null}, initials),
      links     = COALESCE(${data.links ? JSON.stringify(data.links) : null}::jsonb, links),
      is_active = COALESCE(${data.is_active ?? null}, is_active),
      seo_title = COALESCE(${data.seo_title ?? null}, seo_title),
      seo_desc  = COALESCE(${data.seo_desc ?? null}, seo_desc),
      updated_at = NOW()
    WHERE id = ${id}
  `
  // photo_url uses direct assignment so null explicitly clears the photo (COALESCE can't do this)
  if ('photo_url' in data) {
    await sql`UPDATE profiles SET photo_url = ${data.photo_url ?? null} WHERE id = ${id}`
  }
}

export async function deleteProfile(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM profiles WHERE id = ${id}`
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
