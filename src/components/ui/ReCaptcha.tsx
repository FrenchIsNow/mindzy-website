'use client'

import { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!SITE_KEY) return
    if (document.getElementById('recaptcha-v3-script')) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setIsReady(true))
      }
      return
    }

    const script = document.createElement('script')
    script.id = 'recaptcha-v3-script'
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.onload = () => {
      window.grecaptcha.ready(() => setIsReady(true))
    }
    document.head.appendChild(script)
  }, [])

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!SITE_KEY || !isReady) {
      console.warn('[reCAPTCHA] Not ready — siteKey:', !!SITE_KEY, 'isReady:', isReady)
      return null
    }
    try {
      const token = await window.grecaptcha.execute(SITE_KEY, { action })
      console.log('[reCAPTCHA] Token generated, length:', token?.length)
      return token
    } catch (err) {
      console.error('[reCAPTCHA] Execute error:', err)
      return null
    }
  }, [isReady])

  return { executeRecaptcha, isReady }
}
