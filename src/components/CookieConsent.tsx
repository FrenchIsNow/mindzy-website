'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const CONSENT_KEY = 'mindzy_cookie_consent'

const content: Record<string, { title: string; message: string; accept: string; decline: string; settings: string }> = {
  fr: {
    title: 'Cookies & confidentialit\u00e9',
    message: 'Nous utilisons des cookies analytiques pour am\u00e9liorer votre exp\u00e9rience. Aucune donn\u00e9e personnelle n\u2019est vendue.',
    accept: 'Accepter',
    decline: 'Refuser',
    settings: 'En savoir plus',
  },
  en: {
    title: 'Cookies & Privacy',
    message: 'We use analytics cookies to improve your experience. No personal data is sold.',
    accept: 'Accept',
    decline: 'Decline',
    settings: 'Learn more',
  },
  es: {
    title: 'Cookies y privacidad',
    message: 'Usamos cookies anal\u00edticas para mejorar tu experiencia. No se vende ning\u00fan dato personal.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    settings: 'M\u00e1s informaci\u00f3n',
  },
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false)
  const t = content[locale] || content.fr

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    } else if (stored === 'granted' && GA_MEASUREMENT_ID) {
      updateConsent(true)
    }
  }, [])

  const updateConsent = (granted: boolean) => {
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
    })
  }

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted')
    updateConsent(true)
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'denied')
    updateConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={cn(
      'fixed bottom-20 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-[60] sm:max-w-sm',
      'animate-fade-in-up'
    )}>
      <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-5">
        <h3 className="font-display font-semibold text-anthracite text-sm mb-2">{t.title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">{t.message}</p>
        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={handleAccept} className="flex-1 text-xs">{t.accept}</Button>
          <Button variant="ghost" size="sm" onClick={handleDecline} className="flex-1 text-xs">{t.decline}</Button>
        </div>
      </div>
    </div>
  )
}
