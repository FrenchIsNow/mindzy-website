'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { analytics } from '@/lib/analytics'

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  trackEvent: string
  trackLocation: string
}

export function TrackedLink({ trackEvent, trackLocation, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        analytics.cta.click(trackEvent, trackLocation)
        onClick?.(e)
      }}
    >
      {children}
    </Link>
  )
}
