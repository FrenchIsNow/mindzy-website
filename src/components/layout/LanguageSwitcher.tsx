'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const labels: Record<Locale, { flag: string; label: string; fullName: string }> = {
  fr: { flag: '🇫🇷', label: 'FR', fullName: 'Français' },
  en: { flag: '🇬🇧', label: 'EN', fullName: 'English' },
  es: { flag: '🇪🇸', label: 'ES', fullName: 'Español' },
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchTo = (loc: Locale) => {
    router.push(`/${loc}${pathname.replace(`/${locale}`, '') || '/'}`)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200',
          open
            ? 'bg-violet-50 text-violet'
            : 'text-gray-600 hover:text-anthracite hover:bg-cream-100'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="text-base">{labels[locale].flag}</span>
        <span>{labels[locale].label}</span>
        <svg
          className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute right-0 top-full mt-2 bg-white rounded-xl shadow-elevated border border-gray-100 py-2 min-w-[140px] transition-all duration-200 origin-top-right z-50',
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        )}
      >
        {locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors',
              loc === locale
                ? 'text-violet bg-violet-50'
                : 'text-gray-600 hover:text-anthracite hover:bg-cream-50'
            )}
          >
            <span className="text-base">{labels[loc].flag}</span>
            <span className="flex-1 text-left">{labels[loc].fullName}</span>
            {loc === locale && (
              <svg className="w-4 h-4 text-violet" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
