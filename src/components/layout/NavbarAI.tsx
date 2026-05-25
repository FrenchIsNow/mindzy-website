'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BOOK_CALL: Record<string, string> = {
  en: 'Book a Call',
  fr: 'Réserver un appel',
  es: 'Reservar una llamada',
  de: 'Anruf buchen',
  it: 'Prenota una chiamata',
  pt: 'Agendar uma chamada',
  ar: 'احجز مكالمة',
  zh: '预约通话',
  ja: '通話を予約',
  ru: 'Записаться на звонок',
}

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh', label: '简体中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
]


function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const currentLabel = LOCALES.find(l => l.code === currentLocale)?.label ?? 'English'

  function switchLocale(locale: string) {
    const segments = pathname.split('/')
    segments[1] = locale
    const href = segments.join('/') || '/'
    setOpen(false)
    window.location.href = href
  }

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onOutsideClick)
    return () => document.removeEventListener('click', onOutsideClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', fontSize: '13px' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 10px', color: 'var(--ai-fg-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}
        className="hover:text-[var(--ai-fg)] transition-colors"
      >
        {currentLabel}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transition: 'transform 160ms', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M2 4l3 3 3-3"/>
        </svg>
      </button>

      {open && (
        <div
          style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--ai-bg-2)', border: '1px solid var(--ai-border)', borderRadius: '12px', padding: '6px', boxShadow: '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)', minWidth: '160px', zIndex: 100 }}
          onClick={e => e.stopPropagation()}
        >
          {LOCALES.map(locale => {
            const isActive = locale.code === currentLocale
            return (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', color: isActive ? 'var(--ai-fg)' : 'var(--ai-fg-muted)', fontWeight: isActive ? 500 : 400, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                className="hover:bg-[var(--ai-bg-3)] hover:text-[var(--ai-fg)] transition-colors"
              >
                {locale.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

const NAV_LABELS: Record<string, string[]> = {
  en: ['Home', 'Process', 'Portfolio', 'About', 'Blog', 'FAQ', 'AI Employee'],
  fr: ['Accueil', 'Processus', 'Portfolio', 'À propos', 'Blog', 'FAQ', 'AI Employee'],
  es: ['Inicio', 'Proceso', 'Portfolio', 'Nosotros', 'Blog', 'FAQ', 'AI Employee'],
  de: ['Startseite', 'Prozess', 'Portfolio', 'Über uns', 'Blog', 'FAQ', 'AI Employee'],
  it: ['Home', 'Processo', 'Portfolio', 'Chi siamo', 'Blog', 'FAQ', 'AI Employee'],
  pt: ['Início', 'Processo', 'Portfolio', 'Sobre nós', 'Blog', 'FAQ', 'AI Employee'],
  ar: ['الرئيسية', 'العملية', 'المشاريع', 'من نحن', 'المدونة', 'FAQ', 'AI Employee'],
  zh: ['首页', '流程', '作品集', '关于我们', '博客', 'FAQ', 'AI Employee'],
  ja: ['ホーム', 'プロセス', 'ポートフォリオ', '会社概要', 'ブログ', 'FAQ', 'AI Employee'],
  ru: ['Главная', 'Процесс', 'Портфолио', 'О нас', 'Блог', 'FAQ', 'AI Employee'],
}

const NAV_PATHS = [
  { path: '', idx: 0 },
  { path: '/process', idx: 1 },
  { path: '/portfolio', idx: 2 },
  { path: '/about', idx: 3 },
  { path: '/blog', idx: 4 },
  { path: '/faq', idx: 5 },
  { path: '/ai-employee', idx: 6 },
]

export function NavbarAI() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  // Extract current locale from pathname (e.g. /en/about → "en")
  const currentLocale = pathname.split('/')[1] ?? 'en'

  useEffect(() => {
    const stored = localStorage.getItem('mindzy-theme')
    const dark = stored === 'black'
    setIsDark(dark)
    document.documentElement.setAttribute('data-ai-theme', dark ? 'black' : '')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-ai-theme', isDark ? 'black' : '')
    localStorage.setItem('mindzy-theme', isDark ? 'black' : '')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'border-b border-[var(--ai-border)]' : ''}`}
      style={{
        backdropFilter: 'saturate(1.4) blur(14px)',
        background: 'color-mix(in srgb, var(--ai-bg) 80%, transparent)',
        padding: '18px 0',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-8 flex items-center justify-between gap-7">
        {/* Logo + Brand */}
        <Link href={`/${currentLocale}`} className="flex items-center gap-2.5">
          <svg viewBox="0 0 1008 874" width="22" height="22" aria-hidden="true">
            <g fill="#7c3aed">
              <path d="M505 0 L0 870 L653 260 Z" />
              <path d="M683 311 L548 440 L1008 872 L747 421 L706 345 Z" />
              <path d="M503 481 L644 615 L113 874 L79 874 Z" />
            </g>
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-serif-ai)',
              fontSize: '19px',
              letterSpacing: '-0.01em',
            }}
          >
            Mindzy
          </span>
        </Link>

        {/* Center nav links — locale-aware */}
        <nav className="hidden md:flex items-center gap-9 text-sm">
          {NAV_PATHS.map(({ path, idx }) => {
            const href = `/${currentLocale}${path}`
            const isActive = pathname === href || (path === '' && pathname === `/${currentLocale}`)
            const label = (NAV_LABELS[currentLocale] ?? NAV_LABELS.en)[idx]
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive
                    ? 'text-[var(--ai-fg)]'
                    : 'text-[var(--ai-fg-muted)] hover:text-[var(--ai-fg)]'
                }`}
                style={
                  isActive
                    ? { textDecoration: 'underline', textDecorationColor: 'var(--ai-accent)', textUnderlineOffset: '4px' }
                    : undefined
                }
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Theme toggle + English + CTA */}
        <div className="flex items-center gap-3.5">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center rounded-full border border-[var(--ai-border)] bg-[var(--ai-bg-3)] text-[var(--ai-fg-muted)] hover:text-[var(--ai-fg)] transition-colors"
            style={{ width: '34px', height: '34px' }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Locale switcher */}
          <LocaleSwitcher currentLocale={currentLocale} />

          {/* Book a Call — glass button */}
          <a
            href="https://calendar.app.google/ghE79tSFxmea4Scd9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'rgba(20,20,40,0.88)',
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(14px) saturate(180%)',
              WebkitBackdropFilter: 'blur(14px) saturate(180%)',
              border: '1px solid rgba(20,20,40,0.12)',
              boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.90), inset 0 -1px 0 rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08)',
              padding: '10px 18px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {BOOK_CALL[currentLocale] ?? BOOK_CALL.en}
          </a>
        </div>
      </div>
    </header>
  )
}

export default NavbarAI
