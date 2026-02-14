'use client'

import { forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface ReCaptchaProps {
  onChange?: (token: string | null) => void
  error?: string
}

export const ReCaptcha = forwardRef<ReCAPTCHA, ReCaptchaProps>(
  ({ onChange, error }, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    if (!siteKey) {
      console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured')
      return null
    }

    return (
      <div className="w-full">
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={ref}
            sitekey={siteKey}
            onChange={onChange}
            theme="light"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
      </div>
    )
  }
)

ReCaptcha.displayName = 'ReCaptcha'
