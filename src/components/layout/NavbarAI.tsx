'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

const NAV_LINKS = [
  { href: '/en', label: 'Home' },
  { href: '/en/process', label: 'Process' },
  { href: '/en/portfolio', label: 'Portfolio' },
  { href: '/en/about', label: 'About' },
  { href: '/en/blog', label: 'Blog' },
  { href: '/en/faq', label: 'FAQ' },
  { href: '/en/ai-employee', label: 'AI Employee' },
]

export function NavbarAI() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

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
        <Link href="/en" className="flex items-center gap-2.5">
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

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-9 text-sm">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
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
                    ? {
                        textDecoration: 'underline',
                        textDecorationColor: 'var(--ai-accent)',
                        textUnderlineOffset: '4px',
                      }
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

          {/* English label */}
          <span style={{ fontSize: '13px', color: 'var(--ai-fg-muted)', cursor: 'pointer' }}>English</span>

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
            Book a Call
          </a>
        </div>
      </div>
    </header>
  )
}

export default NavbarAI
