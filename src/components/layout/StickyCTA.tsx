'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, ArrowIcon } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import { config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function StickyCTA({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false)
  const t = copy[locale].stickyCta

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-all duration-500',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      {/* Glass background */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-gray-100/50 shadow-soft">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Message with decorative icon */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="icon-circle-sm bg-violet-50 text-violet">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <p className="text-sm text-gray-700 font-medium">{t.message}</p>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href={`/${locale}/diagnostic`} className="flex-1 sm:flex-none">
                <Button variant="primary" size="md" className="w-full sm:w-auto" icon={<ArrowIcon />}>
                  {t.startButton}
                </Button>
              </Link>
              <a
                href={config.CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button variant="secondary" size="md" className="w-full sm:w-auto">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {t.meetingButton}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
