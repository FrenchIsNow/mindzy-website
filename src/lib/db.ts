import { neon } from '@neondatabase/serverless'
import { ebooks as staticEbooks } from './ebooks'
import type { Locale } from './i18n'

// ─── Client ───────────────────────────────────────────────────────────────────

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  return neon(url)
}

// ─── Better Auth tables (idempotent) ─────────────────────────────────────────

async function initAuthTables(sql: ReturnType<typeof getSql>) {
  await sql`
    CREATE TABLE IF NOT EXISTS "user" (
      id              TEXT PRIMARY KEY,
      name            TEXT NOT NULL,
      email           TEXT NOT NULL UNIQUE,
      email_verified  BOOLEAN NOT NULL DEFAULT FALSE,
      image           TEXT,
      role            TEXT NOT NULL DEFAULT 'editor',
      is_active       BOOLEAN NOT NULL DEFAULT TRUE,
      banned          BOOLEAN NOT NULL DEFAULT FALSE,
      ban_reason      TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS user_email_idx ON "user"(email)`
  await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS banned BOOLEAN NOT NULL DEFAULT FALSE`
  await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS ban_reason TEXT`

  await sql`
    CREATE TABLE IF NOT EXISTS "session" (
      id              TEXT PRIMARY KEY,
      expires_at      TIMESTAMPTZ NOT NULL,
      token           TEXT NOT NULL UNIQUE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_address      TEXT,
      user_agent      TEXT,
      user_id         TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS session_userId_idx ON "session"(user_id)`

  await sql`
    CREATE TABLE IF NOT EXISTS "account" (
      id                          TEXT PRIMARY KEY,
      account_id                  TEXT NOT NULL,
      provider_id                 TEXT NOT NULL,
      user_id                     TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      access_token                TEXT,
      refresh_token               TEXT,
      id_token                    TEXT,
      access_token_expires_at     TIMESTAMPTZ,
      refresh_token_expires_at    TIMESTAMPTZ,
      scope                       TEXT,
      password                    TEXT,
      created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS account_userId_idx ON "account"(user_id)`

  await sql`
    CREATE TABLE IF NOT EXISTS "verification" (
      id              TEXT PRIMARY KEY,
      identifier      TEXT NOT NULL,
      value           TEXT NOT NULL,
      expires_at      TIMESTAMPTZ NOT NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS verification_identifier_idx ON "verification"(identifier)`
}

async function seedDefaultAdmin(sql: ReturnType<typeof getSql>) {
  const password = process.env.ADMIN_INITIAL_PASSWORD
  if (!password) return

  const existing = await sql`SELECT id FROM "user" WHERE role = 'admin' AND is_active = TRUE LIMIT 1`
  if (existing.length > 0) return

  // Dynamic import avoids a hard module-level dependency on Better Auth env vars.
  const { auth } = await import('./auth')
  await auth.api.createUser({
    body: {
      email: 'contact@mindzy.me',
      password,
      name: 'Mindzy Admin',
      role: 'admin',
    },
  })
}

// ─── Schema init (idempotent) ─────────────────────────────────────────────────

let _initialized = false

export async function initDB() {
  if (_initialized) return
  const sql = getSql()

  await initAuthTables(sql)

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

  // ─── AI Waitlist ────────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS ai_waitlist (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      company    TEXT,
      role       TEXT,
      locale     TEXT NOT NULL DEFAULT 'fr',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_ai_waitlist_email ON ai_waitlist(email)`

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

  // ─── Waiting list (AI Employee early-access signups) ───────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist_entries (
      id           SERIAL PRIMARY KEY,
      first_name   TEXT NOT NULL,
      last_name    TEXT NOT NULL,
      email        TEXT NOT NULL,
      role         TEXT,
      company      TEXT,
      company_size TEXT,
      use_case     TEXT,
      locale       TEXT NOT NULL DEFAULT 'fr',
      source       TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_entries_email ON waitlist_entries(LOWER(email))`
  await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_entries_created ON waitlist_entries(created_at DESC)`

  // Self-blog: Mindzy's own articles are managed as a special "mindzy" client.
  // Seed on first init so the admin always sees "Mon blog" in the sidebar.
  // Password is a random string; admin manages this via the Paramètres tab.
  await sql`
    INSERT INTO dashboard_clients (slug, name, email, locale, frequency, posts_per_cycle, password_hash)
    SELECT 'mindzy', 'Mindzy (mon blog)', 'self@mindzy.me', 'fr', 'weekly', 1,
      'scrypt$0000000000000000000000000000000000000000000000000000000000000000$0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    WHERE NOT EXISTS (SELECT 1 FROM dashboard_clients WHERE slug = 'mindzy')
  `

  await initCMSMigration(sql)

  await seedDefaultAdmin(sql)
  // Mark initialization complete before seeding static ebooks so that any
  // nested `initDB()` calls (made by DB helpers used in the seed) return early.
  _initialized = true
  await seedStaticEbooksToCatalog()
}

// ─── CMS migration (idempotent, additive) ─────────────────────────────────────

async function initCMSMigration(sql: ReturnType<typeof getSql>) {
  // ── Blog Sites ─────────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS blog_sites (
      id          SERIAL PRIMARY KEY,
      slug        TEXT UNIQUE NOT NULL,
      name        TEXT NOT NULL,
      domain      TEXT,
      is_default  BOOLEAN NOT NULL DEFAULT FALSE,
      settings    JSONB NOT NULL DEFAULT '{}',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_sites_slug ON blog_sites(slug)`
  await sql`CREATE INDEX IF NOT EXISTS idx_blog_sites_default ON blog_sites(is_default)`

  // Default Mindzy site.
  await sql`
    INSERT INTO blog_sites (slug, name, domain, is_default)
    SELECT 'mindzy', 'Mindzy Blog', 'mindzy.me', TRUE
    WHERE NOT EXISTS (SELECT 1 FROM blog_sites WHERE slug = 'mindzy')
  `

  // Link ideas/articles to sites.
  await sql`ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS blog_site_id INTEGER REFERENCES blog_sites(id) ON DELETE SET NULL`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS blog_site_id INTEGER REFERENCES blog_sites(id) ON DELETE SET NULL`

  // Backfill blog_site_id from dashboard_clients slug mapping.
  await sql`
    UPDATE blog_ideas
    SET blog_site_id = (
      SELECT bs.id FROM blog_sites bs
      JOIN dashboard_clients dc ON dc.slug = bs.slug
      WHERE dc.id = blog_ideas.client_id
    )
    WHERE blog_site_id IS NULL
  `
  await sql`
    UPDATE blog_articles
    SET blog_site_id = (
      SELECT bs.id FROM blog_sites bs
      JOIN dashboard_clients dc ON dc.slug = bs.slug
      WHERE dc.id = blog_articles.client_id
    )
    WHERE blog_site_id IS NULL
  `

  // Ensure every dashboard_client has an implicit blog site (non-default).
  await sql`
    INSERT INTO blog_sites (slug, name, domain, is_default)
    SELECT dc.slug, dc.name || ' Blog', dc.domain, FALSE
    FROM dashboard_clients dc
    WHERE NOT EXISTS (SELECT 1 FROM blog_sites bs WHERE bs.slug = dc.slug)
  `

  // ── Unified Leads ──────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id              SERIAL PRIMARY KEY,
      email           TEXT NOT NULL,
      first_name      TEXT,
      last_name       TEXT,
      company         TEXT,
      role            TEXT,
      phone           TEXT,
      locale          TEXT NOT NULL DEFAULT 'fr',
      source          TEXT NOT NULL,
      source_detail   JSONB DEFAULT '{}',
      status          TEXT NOT NULL DEFAULT 'new',
      tags            TEXT[],
      notes           JSONB DEFAULT '[]',
      gdpr_consent    BOOLEAN DEFAULT FALSE,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(LOWER(email))`
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source)`
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC)`

  await sql`ALTER TABLE ebook_leads ADD COLUMN IF NOT EXISTS lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL`
  await sql`ALTER TABLE ebook_leads ADD COLUMN IF NOT EXISTS role TEXT`
  await sql`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL`

  // Backfill ebook leads.
  await sql`
    WITH inserted AS (
      INSERT INTO leads (email, first_name, last_name, company, locale, source, source_detail, status, gdpr_consent)
      SELECT
        LOWER(el.email),
        split_part(el.name, ' ', 1),
        NULLIF(split_part(el.name, ' ', 2), ''),
        el.company,
        el.locale,
        'ebook',
        jsonb_build_object('ebook_slug', el.ebook_slug, 'original_id', el.id),
        'new',
        TRUE
      FROM ebook_leads el
      WHERE el.lead_id IS NULL
      RETURNING id, source_detail->>'original_id' AS original_id
    )
    UPDATE ebook_leads
    SET lead_id = inserted.id
    FROM inserted
    WHERE ebook_leads.id = inserted.original_id::int
  `

  // Backfill waitlist entries.
  await sql`
    WITH inserted AS (
      INSERT INTO leads (email, first_name, last_name, company, role, locale, source, source_detail, status, gdpr_consent)
      SELECT
        LOWER(we.email),
        we.first_name,
        we.last_name,
        we.company,
        we.role,
        we.locale,
        'waitlist',
        jsonb_build_object('waiting_list_slug', COALESCE(we.source, 'ai-employee'), 'original_id', we.id),
        'new',
        TRUE
      FROM waitlist_entries we
      WHERE we.lead_id IS NULL
      RETURNING id, source_detail->>'original_id' AS original_id
    )
    UPDATE waitlist_entries
    SET lead_id = inserted.id
    FROM inserted
    WHERE waitlist_entries.id = inserted.original_id::int
  `

  // ── Ebooks ─────────────────────────────────────────────────────────────────
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft'`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS author_id INTEGER`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS seo_title TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS seo_description TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS geo_keywords TEXT[]`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS canonical_slug TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS og_image_url TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS form_fields JSONB DEFAULT '["email","firstName","lastName","company","role"]'`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS thank_you_redirect_url TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS calendly_url TEXT`
  await sql`ALTER TABLE ebook_catalog ADD COLUMN IF NOT EXISTS download_count INTEGER NOT NULL DEFAULT 0`

  await sql`ALTER TABLE ebook_content ADD COLUMN IF NOT EXISTS meta_title TEXT`
  await sql`ALTER TABLE ebook_content ADD COLUMN IF NOT EXISTS meta_description TEXT`
  await sql`ALTER TABLE ebook_content ADD COLUMN IF NOT EXISTS geo_metadata JSONB DEFAULT '{}'`

  // Set sensible defaults for already-active ebooks.
  await sql`
    UPDATE ebook_catalog
    SET status = 'published', published_at = COALESCE(published_at, created_at)
    WHERE is_active = TRUE AND status = 'draft'
  `

  // ── Waiting Lists v2 ─────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS waiting_lists (
      id                  SERIAL PRIMARY KEY,
      slug                TEXT UNIQUE NOT NULL,
      name                TEXT NOT NULL,
      description         TEXT,
      locale              TEXT NOT NULL DEFAULT 'fr',
      status              TEXT NOT NULL DEFAULT 'active',
      form_fields         JSONB DEFAULT '["firstName","lastName","email","company","role","companySize","useCase"]',
      hero_title          TEXT,
      hero_subtitle       TEXT,
      benefits            JSONB DEFAULT '[]',
      thank_you_message   TEXT,
      redirect_url        TEXT,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_waiting_lists_slug ON waiting_lists(slug)`
  await sql`CREATE INDEX IF NOT EXISTS idx_waiting_lists_status ON waiting_lists(status)`

  await sql`ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS waiting_list_id INTEGER REFERENCES waiting_lists(id) ON DELETE SET NULL`

  // Default legacy list for the existing AI-employee waitlist.
  await sql`
    INSERT INTO waiting_lists (slug, name, description, locale, status, hero_title, hero_subtitle)
    SELECT 'ai-employee',
           'AI Employee Waitlist',
           'Early access to the Mindzy AI employee platform.',
           'fr',
           'active',
           'Rejoignez la liste d’accès anticipé',
           'Soyez parmi les premiers à déployer un collaborateur IA dans votre entreprise.'
    WHERE NOT EXISTS (SELECT 1 FROM waiting_lists WHERE slug = 'ai-employee')
  `
  await sql`
    UPDATE waitlist_entries
    SET waiting_list_id = (SELECT id FROM waiting_lists WHERE slug = 'ai-employee')
    WHERE waiting_list_id IS NULL
  `

  // ── Blog Articles & Ideas enhancements ───────────────────────────────────
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS author_id INTEGER`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS blocks JSONB DEFAULT '[]'`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS seo_title TEXT`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS seo_description TEXT`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS geo_keywords TEXT[]`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS og_image_url TEXT`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS related_article_slugs TEXT[]`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS internal_links JSONB DEFAULT '[]'`
  await sql`ALTER TABLE blog_articles ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ`

  await sql`ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS assigned_to INTEGER`
  await sql`ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS target_keyword TEXT`
  await sql`ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS due_date DATE`
  await sql`ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual'`
  await sql`ALTER TABLE blog_ideas ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium'`

  // Status normalisation for ideas: legacy idea/planned → waiting; article-only statuses → in_progress.
  await sql`
    UPDATE blog_ideas
    SET status = CASE
      WHEN status IN ('idea', 'planned') THEN 'waiting'
      WHEN status IN ('generating', 'pending_review', 'approved', 'published', 'rejected') THEN 'in_progress'
      ELSE status
    END
    WHERE status NOT IN ('waiting', 'in_progress', 'done', 'archived')
  `

  // Drop and recreate constraints idempotently. Swallow 42710 (duplicate_object)
  // in case a prior failed run left the constraint committed.
  // ponytail: identifiers inlined — neon's tagged template only parameterizes values,
  // and these table names are a hardcoded allowlist we own. Switch to .query() if
  // we ever need dynamic table names.
  const tables = ['blog_ideas', 'blog_articles', 'ebook_catalog', 'waiting_lists', 'leads'] as const
  const constraints: Record<typeof tables[number], string> = {
    blog_ideas: "CHECK (status IN ('waiting','in_progress','done','archived'))",
    blog_articles: "CHECK (status IN ('draft','scheduled','published','archived','pending_review','approved','rejected'))",
    ebook_catalog: "CHECK (status IN ('draft','scheduled','published','archived'))",
    waiting_lists: "CHECK (status IN ('active','paused','archived'))",
    leads: "CHECK (status IN ('new','contacted','qualified','converted','archived'))",
  }
  try {
    for (const t of tables) {
      await sql(`ALTER TABLE ${t} DROP CONSTRAINT IF EXISTS ${t}_status_check`)
    }
    for (const t of tables) {
      await sql(`ALTER TABLE ${t} ADD CONSTRAINT ${t}_status_check ${constraints[t]}`)
    }
  } catch (err) {
    if ((err as { code?: string })?.code === '42710') return // already in place
    throw err
  }
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
  blog_site_id: number | null
  question: string
  category: string | null
  subcategory: string | null
  target: string | null
  content_type: string | null
  seo_priority: string | null
  locale: string | null
  status: string
  scheduled_for: string | null
  assigned_to: number | null
  target_keyword: string | null
  due_date: string | null
  source: string
  priority: string
  created_at: string
}

export async function createBlogIdea(data: {
  clientId: number
  blogSiteId?: number | null
  question: string
  category?: string
  subcategory?: string
  target?: string
  contentType?: string
  seoPriority?: string
  locale?: string
  status?: 'waiting' | 'in_progress' | 'done' | 'archived'
  source?: string
  dueDate?: string | null
  keyword?: string | null
}): Promise<BlogIdea> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO blog_ideas (
      client_id, blog_site_id, question, category, subcategory, target,
      content_type, seo_priority, locale, status, source, due_date, keyword
    ) VALUES (
      ${data.clientId}, ${data.blogSiteId ?? null}, ${data.question},
      ${data.category ?? null}, ${data.subcategory ?? null}, ${data.target ?? null},
      ${data.contentType ?? null}, ${data.seoPriority ?? null}, ${data.locale ?? null},
      ${data.status ?? 'waiting'}, ${data.source ?? null}, ${data.dueDate ?? null}, ${data.keyword ?? null}
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
      status       = COALESCE(${data.status ?? null}, status),
      source       = COALESCE(${data.source ?? null}, source),
      due_date     = COALESCE(${data.due_date ?? null}, due_date),
      target_keyword = COALESCE(${data.target_keyword ?? null}, target_keyword)
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
  blog_site_id: number | null
  idea_id: number | null
  author_id: number | null
  title: string
  slug: string
  canonical_slug: string | null
  excerpt: string | null
  content_html: string
  blocks: unknown[] | null
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
  seo_title: string | null
  seo_description: string | null
  geo_keywords: string[] | null
  og_image_url: string | null
  related_article_slugs: string[] | null
  internal_links: unknown[] | null
  scheduled_at: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export async function createBlogArticle(data: {
  clientId: number
  blogSiteId?: number | null
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
      client_id, blog_site_id, idea_id, title, slug, canonical_slug, excerpt, content_html,
      cover_image_url, cover_alt, keywords, category, reading_time,
      locale, status, drive_md_url, drive_image_url, sheet_row_id
    ) VALUES (
      ${data.clientId}, ${data.blogSiteId ?? null}, ${data.ideaId ?? null}, ${data.title}, ${data.slug},
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

export async function listBlogArticlesForClient(clientId: number, sourceLocale?: string): Promise<BlogArticle[]> {
  await initDB()
  const sql = getSql()
  const rows = sourceLocale
    ? await sql`SELECT * FROM blog_articles WHERE client_id = ${clientId} AND locale = ${sourceLocale} ORDER BY created_at DESC`
    : await sql`SELECT * FROM blog_articles WHERE client_id = ${clientId} ORDER BY created_at DESC`
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
      blocks          = COALESCE(${data.blocks as unknown ?? null}, blocks),
      cover_image_url = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
      cover_alt       = COALESCE(${data.cover_alt ?? null}, cover_alt),
      keywords        = COALESCE(${data.keywords ?? null}, keywords),
      category        = COALESCE(${data.category ?? null}, category),
      reading_time    = COALESCE(${data.reading_time ?? null}, reading_time),
      locale          = COALESCE(${data.locale ?? null}, locale),
      status          = COALESCE(${data.status ?? null}, status),
      client_notes    = COALESCE(${data.client_notes ?? null}, client_notes),
      seo_title       = COALESCE(${data.seo_title ?? null}, seo_title),
      seo_description = COALESCE(${data.seo_description ?? null}, seo_description),
      geo_keywords    = COALESCE(${data.geo_keywords as unknown ?? null}, geo_keywords),
      og_image_url    = COALESCE(${data.og_image_url ?? null}, og_image_url),
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

/**
 * Upsert a lead + ebook_lead for a download form.
 *
 * Dedup rules:
 * - `leads`: one row per email (case-insensitive). Update in place, COALESCE
 *   incoming values over stored ones so partial forms merge into the existing
 *   record instead of overwriting a known field with null.
 * - `ebook_leads`: one row per (email, slug). Same COALESCE pattern.
 *
 * Returns the leadId and ebookLeadId so the API can link them.
 */
export async function upsertEbookLeadForDownload(data: {
  email: string
  firstName?: string | null
  lastName?: string | null
  company?: string | null
  role?: string | null
  phone?: string | null
  ebookSlug: string
  locale: string
}): Promise<{ leadId: number; ebookLeadId: number }> {
  await initDB()
  const sql = getSql()

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ') || null

  // 1. Find or create the global lead row.
  const existing = await sql`
    SELECT id, source_detail FROM leads WHERE LOWER(email) = LOWER(${data.email}) LIMIT 1
  `
  let leadId: number
  if (existing[0]) {
    leadId = existing[0].id as number
    // Merge: COALESCE on every field so a partial form never clobbers known data.
    // Append this ebook slug to source_detail.ebook_slugs (deduped, lowercased).
    const priorDetail = (existing[0].source_detail as Record<string, unknown> | null) ?? {}
    const priorSlugs = Array.isArray(priorDetail.ebook_slugs) ? (priorDetail.ebook_slugs as string[]) : []
    const slugLower = data.ebookSlug.toLowerCase()
    const nextSlugs = priorSlugs.includes(slugLower) ? priorSlugs : [...priorSlugs, slugLower]
    await sql`
      UPDATE leads SET
        first_name   = COALESCE(${data.firstName ?? null}::text, first_name),
        last_name    = COALESCE(${data.lastName ?? null}::text, last_name),
        company      = COALESCE(${data.company ?? null}::text, company),
        role         = COALESCE(${data.role ?? null}::text, role),
        phone        = COALESCE(${data.phone ?? null}::text, phone),
        locale       = COALESCE(${data.locale}::text, locale),
        source_detail = ${JSON.stringify({ ...priorDetail, ebook_slugs: nextSlugs })}::jsonb,
        updated_at   = NOW()
      WHERE id = ${leadId}
    `
  } else {
    const inserted = await sql`
      INSERT INTO leads (email, first_name, last_name, company, role, phone, locale, source, source_detail, status, gdpr_consent)
      VALUES (
        ${data.email},
        ${data.firstName ?? null},
        ${data.lastName ?? null},
        ${data.company ?? null},
        ${data.role ?? null},
        ${data.phone ?? null},
        ${data.locale},
        ${'ebook'},
        ${{ ebook_slugs: [data.ebookSlug.toLowerCase()] }},
        ${'new'},
        ${true}
      )
      RETURNING id
    `
    leadId = inserted[0].id as number
  }

  // 2. Find or create the ebook_lead row.
  const existingEl = await sql`
    SELECT id FROM ebook_leads WHERE LOWER(email) = LOWER(${data.email}) AND ebook_slug = ${data.ebookSlug} LIMIT 1
  `
  let ebookLeadId: number
  if (existingEl[0]) {
    ebookLeadId = existingEl[0].id as number
    await sql`
      UPDATE ebook_leads SET
        name    = COALESCE(${fullName}::text, name),
        company = COALESCE(${data.company ?? null}::text, company),
        lead_id = ${leadId}
      WHERE id = ${ebookLeadId}
    `
  } else {
    const inserted = await sql`
      INSERT INTO ebook_leads (email, name, phone, company, role, ebook_slug, locale, lead_id)
      VALUES (
        ${data.email},
        ${fullName},
        ${data.phone ?? null},
        ${data.company ?? null},
        ${data.role ?? null},
        ${data.ebookSlug},
        ${data.locale},
        ${leadId}
      )
      RETURNING id
    `
    ebookLeadId = inserted[0].id as number
  }

  // 3. Keep both FKs consistent.
  await sql`UPDATE leads SET source_detail = source_detail || ${JSON.stringify({ ebook_lead_id: ebookLeadId })}::jsonb WHERE id = ${leadId}`
  await sql`UPDATE ebook_leads SET lead_id = ${leadId} WHERE id = ${ebookLeadId}`

  return { leadId, ebookLeadId }
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
  status: string
  scheduled_at: string | null
  published_at: string | null
  author_id: number | null
  seo_title: string | null
  seo_description: string | null
  geo_keywords: string[] | null
  canonical_slug: string | null
  og_image_url: string | null
  form_fields: unknown[] | null
  thank_you_redirect_url: string | null
  calendly_url: string | null
  download_count: number
  stripe_product_id?: string | null
  stripe_price_id?: string | null
  created_at: string
  updated_at: string
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
      is_active, has_upsell, upsell_price_cents, upsell_slug,
      status, scheduled_at, published_at, author_id,
      seo_title, seo_description, geo_keywords, canonical_slug, og_image_url,
      form_fields, thank_you_redirect_url, calendly_url, download_count, updated_at
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
      ${data.status ?? 'published'},
      ${data.scheduled_at ?? null},
      ${data.published_at ?? null},
      ${data.author_id ?? null},
      ${data.seo_title ?? null},
      ${data.seo_description ?? null},
      ${data.geo_keywords ?? null},
      ${data.canonical_slug ?? null},
      ${data.og_image_url ?? null},
      ${data.form_fields ?? null},
      ${data.thank_you_redirect_url ?? null},
      ${data.calendly_url ?? null},
      ${data.download_count ?? 0},
      NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      is_free                  = EXCLUDED.is_free,
      price_cents              = EXCLUDED.price_cents,
      original_price_cents     = EXCLUDED.original_price_cents,
      currency                 = EXCLUDED.currency,
      promo_code               = EXCLUDED.promo_code,
      promo_discount_pct       = EXCLUDED.promo_discount_pct,
      promo_expires_at         = EXCLUDED.promo_expires_at,
      is_active                = EXCLUDED.is_active,
      has_upsell               = EXCLUDED.has_upsell,
      upsell_price_cents       = EXCLUDED.upsell_price_cents,
      upsell_slug              = EXCLUDED.upsell_slug,
      status                   = EXCLUDED.status,
      scheduled_at             = EXCLUDED.scheduled_at,
      published_at             = EXCLUDED.published_at,
      author_id                = EXCLUDED.author_id,
      seo_title                = EXCLUDED.seo_title,
      seo_description          = EXCLUDED.seo_description,
      geo_keywords             = EXCLUDED.geo_keywords,
      canonical_slug           = EXCLUDED.canonical_slug,
      og_image_url             = EXCLUDED.og_image_url,
      form_fields              = EXCLUDED.form_fields,
      thank_you_redirect_url   = EXCLUDED.thank_you_redirect_url,
      calendly_url             = EXCLUDED.calendly_url,
      download_count           = EXCLUDED.download_count,
      updated_at               = NOW()
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
  meta_title: string | null
  meta_description: string | null
  geo_metadata: Record<string, unknown> | null
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
  metaTitle?: string | null
  metaDescription?: string | null
  geoMetadata?: Record<string, unknown> | null
  isDbOnly?: boolean
}): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    INSERT INTO ebook_content (
      slug, locale, title, subtitle, excerpt, category, tags,
      image_url, pdf_url, pages, reading_time,
      chapters, features, stats, testimonial,
      meta_title, meta_description, geo_metadata, is_db_only, updated_at
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
      ${data.metaTitle ?? null},
      ${data.metaDescription ?? null},
      ${data.geoMetadata ? JSON.stringify(data.geoMetadata) : null}::jsonb,
      ${data.isDbOnly ?? false},
      NOW()
    )
    ON CONFLICT (slug, locale) DO UPDATE SET
      title           = EXCLUDED.title,
      subtitle        = EXCLUDED.subtitle,
      excerpt         = EXCLUDED.excerpt,
      category        = EXCLUDED.category,
      tags            = EXCLUDED.tags,
      image_url       = EXCLUDED.image_url,
      pdf_url         = EXCLUDED.pdf_url,
      pages           = EXCLUDED.pages,
      reading_time    = EXCLUDED.reading_time,
      chapters        = EXCLUDED.chapters,
      features        = EXCLUDED.features,
      stats           = EXCLUDED.stats,
      testimonial     = EXCLUDED.testimonial,
      meta_title      = EXCLUDED.meta_title,
      meta_description= EXCLUDED.meta_description,
      geo_metadata    = EXCLUDED.geo_metadata,
      is_db_only      = EXCLUDED.is_db_only,
      updated_at      = NOW()
  `
}

export async function deleteEbookContent(slug: string): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM ebook_content WHERE slug = ${slug}`
}

async function seedStaticEbooksToCatalog(): Promise<void> {
  const sql = getSql()
  for (const ebook of staticEbooks) {
    // Skip if this static ebook has already been seeded. This preserves any
    // admin edits to catalog status, SEO fields, or locale content.
    const existing = await sql`SELECT 1 FROM ebook_catalog WHERE slug = ${ebook.slug} LIMIT 1`
    if (existing.length > 0) continue

    // Insert the catalog entry once per static ebook.
    await sql`
      INSERT INTO ebook_catalog (
        slug, is_free, is_active, currency, status, published_at,
        calendly_url, download_count, updated_at
      ) VALUES (
        ${ebook.slug}, ${ebook.free}, ${true}, ${'eur'}, ${'published'},
        ${ebook.publishedDate ?? new Date().toISOString().slice(0, 10)},
        ${ebook.ctaLink ?? null}, ${ebook.downloadCount ?? 0}, NOW()
      )
      ON CONFLICT (slug) DO NOTHING
    `

    // Insert locale-specific content for every locale that has a title.
    const locales = Object.keys(ebook.title) as Locale[]
    for (const locale of locales) {
      const title = ebook.title[locale] ?? ebook.title.fr ?? null
      const subtitle = ebook.subtitle[locale] ?? null
      const excerpt = ebook.excerpt[locale] ?? null
      const chapters = ebook.chapters[locale] ?? null
      const features = ebook.features[locale] ?? null
      const stats = ebook.stats[locale] ?? null
      const testimonial = ebook.testimonial[locale] ?? null
      const pdfFile = ebook.pdfByLocale?.[locale]
      await sql`
        INSERT INTO ebook_content (
          slug, locale, title, subtitle, excerpt, category, tags,
          image_url, pdf_url, pages, chapters, features, stats, testimonial,
          is_db_only, updated_at
        ) VALUES (
          ${ebook.slug}, ${locale}, ${title}, ${subtitle}, ${excerpt},
          ${ebook.category}, ${ebook.tags}, ${ebook.image},
          ${pdfFile ? `/ebooks/${pdfFile}` : null}, ${ebook.pages},
          ${chapters ? JSON.stringify(chapters) : null}::jsonb,
          ${features ? JSON.stringify(features) : null}::jsonb,
          ${stats ? JSON.stringify(stats) : null}::jsonb,
          ${testimonial ? JSON.stringify(testimonial) : null}::jsonb,
          ${false}, NOW()
        )
        ON CONFLICT (slug, locale) DO NOTHING
      `
    }
  }
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

// ─── Waiting list (AI Employee early-access signups) ─────────────────────────

export interface WaitlistEntry {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string | null
  company: string | null
  company_size: string | null
  use_case: string | null
  locale: string
  source: string | null
  waiting_list_id: number | null
  lead_id: number | null
  created_at: string
}

export async function saveWaitlistEntry(data: {
  firstName: string
  lastName: string
  email: string
  role?: string | null
  company?: string | null
  companySize?: string | null
  useCase?: string | null
  locale?: string
  source?: string | null
  waitingListId?: number | null
}): Promise<number> {
  await initDB()
  const sql = getSql()
  let listId = data.waitingListId
  if (listId === undefined || listId === null) {
    const listRows = await sql`SELECT id FROM waiting_lists WHERE slug = 'ai-employee' LIMIT 1`
    listId = listRows[0]?.id as number | undefined ?? null
  }
  const rows = await sql`
    INSERT INTO waitlist_entries
      (first_name, last_name, email, role, company, company_size, use_case, locale, source, waiting_list_id)
    VALUES
      (${data.firstName}, ${data.lastName}, ${data.email},
       ${data.role ?? null}, ${data.company ?? null}, ${data.companySize ?? null},
       ${data.useCase ?? null}, ${data.locale ?? 'fr'}, ${data.source ?? null},
       ${listId})
    RETURNING id
  `
  return rows[0].id as number
}

export async function listWaitlistEntries(): Promise<WaitlistEntry[]> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM waitlist_entries ORDER BY created_at DESC`
  return rows as WaitlistEntry[]
}

export async function deleteWaitlistEntry(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM waitlist_entries WHERE id = ${id}`
}


/** Returns the effective price in cents after applying an active promo code. */
export function applyPromo(entry: CatalogEntry, code: string): number {
  if (!entry.promo_code || !entry.price_cents) return entry.price_cents ?? 0
  if (entry.promo_code.toLowerCase() !== code.toLowerCase()) return entry.price_cents
  if (entry.promo_expires_at && new Date(entry.promo_expires_at) < new Date()) return entry.price_cents
  const discount = entry.promo_discount_pct ?? 0
  return Math.round(entry.price_cents * (1 - discount / 100))
}

// ─── CMS v2 entities ─────────────────────────────────────────────────────────

export interface BlogSite {
  id: number
  slug: string
  name: string
  domain: string | null
  is_default: boolean
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Lead {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  company: string | null
  role: string | null
  phone: string | null
  locale: string
  source: string
  source_detail: Record<string, unknown>
  status: string
  tags: string[] | null
  notes: unknown[] | null
  gdpr_consent: boolean
  created_at: string
  updated_at: string
}

export interface WaitingList {
  id: number
  slug: string
  name: string
  description: string | null
  locale: string
  status: string
  form_fields: unknown[] | null
  hero_title: string | null
  hero_subtitle: string | null
  benefits: unknown[] | null
  thank_you_message: string | null
  redirect_url: string | null
  created_at: string
  updated_at: string
}

export async function listBlogSites(): Promise<BlogSite[]> {
  await initDB()
  const sql = getSql()
  return sql`SELECT * FROM blog_sites ORDER BY is_default DESC, name ASC` as unknown as Promise<BlogSite[]>
}

export async function getBlogSiteBySlug(slug: string): Promise<BlogSite | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM blog_sites WHERE slug = ${slug} LIMIT 1`
  return (rows[0] as BlogSite) ?? null
}

export async function listLeads(limit = 100, offset = 0): Promise<Lead[]> {
  await initDB()
  const sql = getSql()
  return sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}` as unknown as Promise<Lead[]>
}

export async function listWaitingLists(): Promise<WaitingList[]> {
  await initDB()
  const sql = getSql()
  return sql`SELECT * FROM waiting_lists ORDER BY created_at DESC` as unknown as Promise<WaitingList[]>
}

export async function getWaitingListBySlug(slug: string): Promise<WaitingList | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM waiting_lists WHERE slug = ${slug} LIMIT 1`
  return (rows[0] as WaitingList) ?? null
}

// ─── Waiting list mutations ───────────────────────────────────────────────────

export interface WaitingListInput {
  slug: string
  name: string
  description?: string | null
  locale?: string
  status?: 'active' | 'paused' | 'archived'
  form_fields?: string[] | null
  hero_title?: string | null
  hero_subtitle?: string | null
  benefits?: string[] | null
  thank_you_message?: string | null
  redirect_url?: string | null
}

export async function createWaitingList(data: WaitingListInput): Promise<WaitingList> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO waiting_lists
      (slug, name, description, locale, status, form_fields, hero_title, hero_subtitle, benefits, thank_you_message, redirect_url)
    VALUES (
      ${data.slug}, ${data.name}, ${data.description ?? null}, ${data.locale ?? 'fr'},
      ${data.status ?? 'active'},
      ${(data.form_fields as unknown) ?? null},
      ${data.hero_title ?? null}, ${data.hero_subtitle ?? null},
      ${(data.benefits as unknown) ?? null},
      ${data.thank_you_message ?? null}, ${data.redirect_url ?? null}
    )
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      status = EXCLUDED.status,
      form_fields = EXCLUDED.form_fields,
      hero_title = EXCLUDED.hero_title,
      hero_subtitle = EXCLUDED.hero_subtitle,
      benefits = EXCLUDED.benefits,
      thank_you_message = EXCLUDED.thank_you_message,
      redirect_url = EXCLUDED.redirect_url,
      updated_at = NOW()
    RETURNING *
  `
  return rows[0] as WaitingList
}

export async function updateWaitingList(id: number, data: Partial<WaitingListInput>): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE waiting_lists SET
      name = COALESCE(${data.name ?? null}, name),
      description = COALESCE(${data.description ?? null}, description),
      status = COALESCE(${data.status ?? null}, status),
      form_fields = COALESCE(${data.form_fields as unknown ?? null}, form_fields),
      hero_title = COALESCE(${data.hero_title ?? null}, hero_title),
      hero_subtitle = COALESCE(${data.hero_subtitle ?? null}, hero_subtitle),
      benefits = COALESCE(${data.benefits as unknown ?? null}, benefits),
      thank_you_message = COALESCE(${data.thank_you_message ?? null}, thank_you_message),
      redirect_url = COALESCE(${data.redirect_url ?? null}, redirect_url),
      updated_at = NOW()
    WHERE id = ${id}
  `
}

export async function deleteWaitingList(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM waiting_lists WHERE id = ${id}`
}

export async function countWaitlistEntriesForList(listId: number): Promise<number> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT COUNT(*)::int AS c FROM waitlist_entries WHERE waiting_list_id = ${listId}`
  return (rows[0]?.c as number) ?? 0
}

// ─── Blog site mutations ──────────────────────────────────────────────────────

export interface BlogSiteInput {
  slug: string
  name: string
  domain?: string | null
  is_default?: boolean
  settings?: Record<string, unknown>
}

export async function createBlogSite(data: BlogSiteInput): Promise<BlogSite> {
  await initDB()
  const sql = getSql()
  if (data.is_default) {
    await sql`UPDATE blog_sites SET is_default = FALSE WHERE is_default = TRUE`
  }
  const rows = await sql`
    INSERT INTO blog_sites (slug, name, domain, is_default, settings)
    VALUES (${data.slug}, ${data.name}, ${data.domain ?? null}, ${data.is_default ?? false}, ${(data.settings as unknown) ?? {}})
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      domain = EXCLUDED.domain,
      is_default = EXCLUDED.is_default,
      settings = EXCLUDED.settings,
      updated_at = NOW()
    RETURNING *
  `
  return rows[0] as BlogSite
}

export async function updateBlogSite(id: number, data: Partial<BlogSiteInput>): Promise<void> {
  await initDB()
  const sql = getSql()
  if (data.is_default) {
    await sql`UPDATE blog_sites SET is_default = FALSE WHERE id <> ${id}`
  }
  await sql`
    UPDATE blog_sites SET
      name = COALESCE(${data.name ?? null}, name),
      domain = COALESCE(${data.domain ?? null}, domain),
      is_default = COALESCE(${data.is_default ?? null}, is_default),
      settings = COALESCE(${data.settings as unknown ?? null}, settings),
      updated_at = NOW()
    WHERE id = ${id}
  `
}

export async function deleteBlogSite(id: number): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`DELETE FROM blog_sites WHERE id = ${id}`
}

// ─── Lead mutations + filters + export ────────────────────────────────────────

export interface LeadInput {
  email: string
  first_name?: string | null
  last_name?: string | null
  company?: string | null
  role?: string | null
  phone?: string | null
  locale?: string
  source: string
  source_detail?: Record<string, unknown>
  status?: string
  tags?: string[] | null
  gdpr_consent?: boolean
}

export async function createLead(data: LeadInput): Promise<Lead> {
  await initDB()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO leads (email, first_name, last_name, company, role, phone, locale, source, source_detail, status, tags, gdpr_consent)
    VALUES (
      ${data.email.toLowerCase()},
      ${data.first_name ?? null}, ${data.last_name ?? null},
      ${data.company ?? null}, ${data.role ?? null}, ${data.phone ?? null},
      ${data.locale ?? 'fr'},
      ${data.source},
      ${(data.source_detail as unknown) ?? {}},
      ${data.status ?? 'new'},
      ${(data.tags as unknown) ?? null},
      ${data.gdpr_consent ?? true}
    )
    RETURNING *
  `
  return rows[0] as Lead
}

export async function updateLead(id: number, data: Partial<LeadInput> & { notes?: unknown[] }): Promise<void> {
  await initDB()
  const sql = getSql()
  await sql`
    UPDATE leads SET
      first_name = COALESCE(${data.first_name ?? null}, first_name),
      last_name = COALESCE(${data.last_name ?? null}, last_name),
      company = COALESCE(${data.company ?? null}, company),
      role = COALESCE(${data.role ?? null}, role),
      phone = COALESCE(${data.phone ?? null}, phone),
      status = COALESCE(${data.status ?? null}, status),
      tags = COALESCE(${data.tags as unknown ?? null}, tags),
      notes = COALESCE(${(data.notes as unknown) ?? null}, notes),
      updated_at = NOW()
    WHERE id = ${id}
  `
}

export async function getLeadById(id: number): Promise<Lead | null> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT * FROM leads WHERE id = ${id} LIMIT 1`
  return (rows[0] as Lead) ?? null
}

export interface LeadFilters {
  source?: string
  status?: string
  locale?: string
  q?: string
  limit?: number
  offset?: number
}

export async function listLeadsFiltered(filters: LeadFilters = {}): Promise<{ rows: Lead[]; total: number }> {
  await initDB()
  const sql = getSql()
  const limit = filters.limit ?? 100
  const offset = filters.offset ?? 0

  // ponytail: Neon's tagged template returns a NeonQueryPromise whose SQL+params
  // live on `.parameterizedQuery`, not as direct properties. Reading `c.query`
  // yields undefined and crashes the renumber step.
  const conds: ReturnType<typeof sql>[] = []
  if (filters.source) conds.push(sql`source = ${filters.source}`)
  if (filters.status) conds.push(sql`status = ${filters.status}`)
  if (filters.locale) conds.push(sql`locale = ${filters.locale}`)
  if (filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    conds.push(sql`(LOWER(email) LIKE ${term} OR LOWER(COALESCE(first_name, '')) LIKE ${term} OR LOWER(COALESCE(last_name, '')) LIKE ${term} OR LOWER(COALESCE(company, '')) LIKE ${term})`)
  }

  // Renumber: rewrite each fragment's $N to $M where M is the running offset.
  // ponytail: neon's ordinary `sql(string, params)` form binds by sequential
  // $N position — concatenating fragments whose .query already has $1/$2 would
  // misalign the outer LIMIT/OFFSET placeholders.
  let paramOffset = 0
  const renumbered: string[] = []
  const allParams: unknown[] = []
  for (const c of conds) {
    const fragment = c.parameterizedQuery
    const rewritten = fragment.query.replace(/\$(\d+)/g, (_, n) => `$${Number(n) + paramOffset}`)
    renumbered.push(rewritten)
    allParams.push(...fragment.params)
    paramOffset += fragment.params.length
  }
  const whereClause = renumbered.length ? `WHERE ${renumbered.join(' AND ')}` : ''

  const rows = await sql(
    `SELECT * FROM leads ${whereClause} ORDER BY created_at DESC LIMIT $${paramOffset + 1} OFFSET $${paramOffset + 2}`,
    [...allParams, limit, offset],
  )
  const totalRows = await sql(
    `SELECT COUNT(*)::int AS c FROM leads ${whereClause}`,
    allParams,
  )
  return { rows: rows as Lead[], total: (totalRows[0]?.c as number) ?? 0 }
}

export async function countLeadsBySource(): Promise<Record<string, number>> {
  await initDB()
  const sql = getSql()
  const rows = await sql`SELECT source, COUNT(*)::int AS c FROM leads GROUP BY source`
  const out: Record<string, number> = {}
  for (const r of rows) out[r.source as string] = r.c as number
  return out
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function exportLeadsToCSV(filters: LeadFilters = {}): Promise<string> {
  const { rows } = await listLeadsFiltered({ ...filters, limit: 10000, offset: 0 })
  const headers = ['id', 'created_at', 'email', 'first_name', 'last_name', 'company', 'role', 'phone', 'locale', 'source', 'status', 'tags', 'source_detail']
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push([
      r.id,
      r.created_at,
      r.email,
      r.first_name,
      r.last_name,
      r.company,
      r.role,
      r.phone,
      r.locale,
      r.source,
      r.status,
      (r.tags ?? []).join('|'),
      JSON.stringify(r.source_detail ?? {}),
    ].map(csvEscape).join(','))
  }
  return lines.join('\n')
}

// ─── Cross-client helpers for admin pipeline views ────────────────────────────

export interface BlogIdeaWithSite extends BlogIdea {
  site_slug?: string | null
  site_name?: string | null
}

export async function listAllLeadsForAdmin(limit = 200): Promise<Lead[]> {
  await initDB()
  const sql = getSql()
  return sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit}` as unknown as Promise<Lead[]>
}
