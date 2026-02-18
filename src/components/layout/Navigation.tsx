'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

interface NavigationProps {
  locale: Locale
  className?: string
  mobile?: boolean
  onNavigate?: () => void
}

const solutionRoutes = [
  { key: 'siteWeb' as const, href: '/solutions/site-web', icon: GlobeIcon },
  { key: 'surMesure' as const, href: '/solutions/sur-mesure', icon: WrenchIcon },
  { key: 'formations' as const, href: '/solutions/formations', icon: GraduationCapIcon },
  { key: 'branding' as const, href: '/solutions/branding', icon: PaletteIcon },
]

export function Navigation({ locale, className, mobile, onNavigate }: NavigationProps) {
  const pathname = usePathname()
  const t = getMessages(locale).nav
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: `/${locale}/portfolio`, label: t.portfolio },
    { href: `/${locale}/pourquoi-nous`, label: t.whyUs },
    { href: `/${locale}/blog`, label: t.blog },
    { href: `/${locale}/faq`, label: t.faq },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href
    return pathname.startsWith(href)
  }

  const isSolutionsActive = pathname.startsWith(`/${locale}/solutions`)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false)
      }
    }
    if (solutionsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [solutionsOpen])

  if (mobile) {
    return (
      <nav className={cn('items-start gap-1 px-4', className)}>
        {/* Solutions accordion */}
        <div className="animate-fade-in-up">
          <button
            type="button"
            onClick={() => setSolutionsOpen(!solutionsOpen)}
            className={cn(
              'flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
              isSolutionsActive
                ? 'text-violet bg-violet-50'
                : 'text-gray-600 hover:text-anthracite hover:bg-cream-100'
            )}
          >
            {t.solutions}
            <svg
              className={cn('w-4 h-4 transition-transform duration-200', solutionsOpen && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-200',
              solutionsOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="pl-4 py-1 space-y-1">
              {solutionRoutes.map((route) => {
                const item = (t as any).solutionsItems[route.key]
                const href = `/${locale}${route.href}`
                return (
                  <Link
                    key={route.key}
                    href={href}
                    onClick={() => {
                      analytics.navigation.menuClick(item.title)
                      setSolutionsOpen(false)
                      onNavigate?.()
                    }}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                      isActive(href)
                        ? 'text-violet bg-violet-50'
                        : 'text-gray-600 hover:text-anthracite hover:bg-cream-100'
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-500 flex-shrink-0">
                      <route.icon />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.subtitle}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Regular links */}
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => { analytics.navigation.menuClick(link.label); onNavigate?.() }}
            className={cn(
              'block w-full px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 animate-fade-in-up',
              isActive(link.href)
                ? 'text-violet bg-violet-50'
                : 'text-gray-600 hover:text-anthracite hover:bg-cream-100',
            )}
            style={{ animationDelay: `${(index + 1) * 50}ms` }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    )
  }

  // Desktop navigation
  return (
    <nav className={cn('items-center gap-1', className)}>
      {/* Solutions dropdown */}
      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={() => setSolutionsOpen(true)}
        onMouseLeave={() => setSolutionsOpen(false)}
      >
        <button
          type="button"
          onClick={() => setSolutionsOpen(!solutionsOpen)}
          className={cn(
            'relative inline-flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
            isSolutionsActive
              ? 'text-violet bg-violet-50'
              : 'text-gray-600 hover:text-anthracite hover:bg-cream-100'
          )}
        >
          {t.solutions}
          <svg
            className={cn('w-3.5 h-3.5 transition-transform duration-200', solutionsOpen && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {isSolutionsActive && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet" />
          )}
        </button>

        {/* Invisible bridge to prevent gap between button and dropdown */}
        <div className="absolute top-full left-0 h-2 w-full" />

        {/* Dropdown panel */}
        <div
          className={cn(
            'absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-elevated overflow-hidden transition-all duration-200 z-50',
            solutionsOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
        >
          <div className="p-2">
            {solutionRoutes.map((route) => {
              const item = (t as any).solutionsItems[route.key]
              const href = `/${locale}${route.href}`
              return (
                <Link
                  key={route.key}
                  href={href}
                  onClick={() => {
                    analytics.navigation.menuClick(item.title)
                    setSolutionsOpen(false)
                  }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group',
                    isActive(href)
                      ? 'bg-violet-50'
                      : 'hover:bg-cream-50'
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center text-violet-500 group-hover:from-violet-200 group-hover:to-violet-100 transition-all flex-shrink-0">
                    <route.icon />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-anthracite">{item.title}</div>
                    <div className="text-xs text-gray-400 leading-snug">{item.subtitle}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Regular links */}
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => analytics.navigation.menuClick(link.label)}
          className={cn(
            'relative inline-block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
            isActive(link.href)
              ? 'text-violet bg-violet-50'
              : 'text-gray-600 hover:text-anthracite hover:bg-cream-100',
          )}
        >
          {link.label}
          {isActive(link.href) && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet" />
          )}
        </Link>
      ))}
    </nav>
  )
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.59 5.59a2.121 2.121 0 01-3-3l5.59-5.59m0 0L21 3m-13.59 9.17a5.25 5.25 0 017.42-7.42" />
    </svg>
  )
}

function GraduationCapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  )
}
