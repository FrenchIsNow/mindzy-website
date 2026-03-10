'use client'

import { analytics } from '@/lib/analytics'

interface CalendlyLinkProps {
  href: string
  trackSource: string
  className?: string
  children: React.ReactNode
}

export function CalendlyLink({ href, trackSource, className, children }: CalendlyLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.calendly.click(trackSource)}
      className={className}
    >
      {children}
    </a>
  )
}
