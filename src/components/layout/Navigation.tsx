'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface NavigationProps {
  locale: Locale
  className?: string
  mobile?: boolean
  onNavigate?: () => void
}

export function Navigation({ locale, className, mobile, onNavigate }: NavigationProps) {
  const pathname = usePathname()
  const t = copy[locale].nav

  const links = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/portfolio`, label: t.portfolio },
    { href: `/${locale}/pricing`, label: t.pricing },
    { href: `/${locale}/pourquoi-nous`, label: t.whyUs },
    { href: `/${locale}/blog`, label: t.blog },
    { href: `/${locale}/faq`, label: t.faq },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={cn('items-center', mobile ? 'gap-1 px-4' : 'gap-1', className)}>
      {links.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            'relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
            mobile ? 'block w-full' : 'inline-block',
            isActive(link.href)
              ? 'text-violet bg-violet-50'
              : 'text-gray-600 hover:text-anthracite hover:bg-cream-100',
            // Stagger animation for mobile
            mobile && 'animate-fade-in-up',
          )}
          style={mobile ? { animationDelay: `${index * 50}ms` } : undefined}
        >
          {link.label}
          {/* Active indicator dot for desktop */}
          {!mobile && isActive(link.href) && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet" />
          )}
        </Link>
      ))}
    </nav>
  )
}
