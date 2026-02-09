'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Navigation } from './Navigation'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

export function Header({ locale }: { locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = copy[locale].nav

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-gray-100/50'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative group">
            <span className="font-display text-2xl font-semibold text-anthracite tracking-tight">
              Mindzy
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet to-violet-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <Navigation locale={locale} className="hidden lg:flex" />

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />

            {/* CTA Button - Desktop */}
            <Link href={`/${locale}/diagnostic`} className="hidden sm:block" onClick={() => analytics.cta.click('diagnostic_start', 'header')}>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowIcon />}
              >
                {t.cta}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className={cn(
                'lg:hidden p-2 rounded-xl transition-colors',
                mobileOpen ? 'bg-violet/10 text-violet' : 'hover:bg-cream-100'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 rounded-b-2xl shadow-elevated py-6">
            <Navigation locale={locale} className="flex flex-col" mobile onNavigate={() => setMobileOpen(false)} />

            {/* Mobile CTA */}
            <div className="px-6 pt-6 mt-4 border-t border-gray-100">
              <Link href={`/${locale}/diagnostic`} onClick={() => { setMobileOpen(false); analytics.cta.click('diagnostic_start', 'header_mobile') }}>
                <Button variant="primary" size="lg" className="w-full" icon={<ArrowIcon />}>
                  {t.cta}
                </Button>
              </Link>

              {/* Trust badges in mobile */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  150+ clients
                </span>
                <span className="w-px h-4 bg-gray-200" />
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9/5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
