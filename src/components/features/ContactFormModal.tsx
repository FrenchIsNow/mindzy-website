'use client'

import { useState, useCallback, useEffect, createContext, useContext } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const copy = {
  fr: {
    title: 'Contactez-nous',
    subtitle: 'Remplissez le formulaire et nous vous répondrons sous 24h.',
    name: 'Nom complet',
    business: 'Secteur d\'activité',
    email: 'Email',
    phone: 'Téléphone',
    message: 'Message',
    namePlaceholder: 'Jean Dupont',
    businessPlaceholder: 'Ex : Thérapeute, Coach, Restaurant...',
    emailPlaceholder: 'jean@exemple.fr',
    phonePlaceholder: '+33 6 12 34 56 78',
    messagePlaceholder: 'Décrivez votre projet ou votre besoin...',
    submit: 'Envoyer',
    sending: 'Envoi en cours...',
    success: 'Message envoyé ! Nous vous recontacterons rapidement.',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    close: 'Fermer',
  },
  en: {
    title: 'Contact us',
    subtitle: 'Fill out the form and we\'ll get back to you within 24h.',
    name: 'Full name',
    business: 'Industry / Sector',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    namePlaceholder: 'John Doe',
    businessPlaceholder: 'E.g. Therapist, Coach, Restaurant...',
    emailPlaceholder: 'john@example.com',
    phonePlaceholder: '+1 234 567 890',
    messagePlaceholder: 'Describe your project or needs...',
    submit: 'Send',
    sending: 'Sending...',
    success: 'Message sent! We\'ll get back to you shortly.',
    error: 'Something went wrong. Please try again.',
    close: 'Close',
  },
  es: {
    title: 'Contáctenos',
    subtitle: 'Complete el formulario y le responderemos en 24h.',
    name: 'Nombre completo',
    business: 'Sector de actividad',
    email: 'Email',
    phone: 'Teléfono',
    message: 'Mensaje',
    namePlaceholder: 'Juan García',
    businessPlaceholder: 'Ej: Terapeuta, Coach, Restaurante...',
    emailPlaceholder: 'juan@ejemplo.es',
    phonePlaceholder: '+34 612 345 678',
    messagePlaceholder: 'Describa su proyecto o necesidad...',
    submit: 'Enviar',
    sending: 'Enviando...',
    success: '¡Mensaje enviado! Le contactaremos pronto.',
    error: 'Ha ocurrido un error. Inténtelo de nuevo.',
    close: 'Cerrar',
  },
}

interface ContactModalContextValue {
  open: (planId?: string) => void
}

const ContactModalContext = createContext<ContactModalContextValue>({ open: () => {} })

export function useContactModal() {
  return useContext(ContactModalContext)
}

export function ContactModalProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>()

  const open = useCallback((planId?: string) => {
    setSelectedPlan(planId)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}
      {isOpen && <ContactFormModal locale={locale} planId={selectedPlan} onClose={close} />}
    </ContactModalContext.Provider>
  )
}

function ContactFormModal({ locale, planId, onClose }: { locale: Locale; planId?: string; onClose: () => void }) {
  const t = copy[locale]
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.currentTarget)
    const payload = {
      timestamp: new Date().toISOString(),
      profileType: 'pricing-contact',
      fullName: formData.get('name') as string,
      business: formData.get('business') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      plan: planId || '',
      locale,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label={t.close}
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-display font-semibold text-anthracite">{t.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-anthracite font-medium">{t.success}</p>
              <button
                onClick={onClose}
                className="mt-4 text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={t.name} name="name" placeholder={t.namePlaceholder} required />
                <FormField label={t.business} name="business" placeholder={t.businessPlaceholder} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={t.email} name="email" type="email" placeholder={t.emailPlaceholder} required />
                <FormField label={t.phone} name="phone" type="tel" placeholder={t.phonePlaceholder} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.message}</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={t.messagePlaceholder}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-anthracite placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-rose-500">{t.error}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t.sending : t.submit}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-anthracite',
          'placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100',
          'outline-none transition-all'
        )}
      />
    </div>
  )
}
