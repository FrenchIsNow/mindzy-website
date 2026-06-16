'use client'

import { useState } from 'react'
import { Button, ArrowIcon } from '@/components/ui/Button'

interface WaitlistFormProps {
  locale: string
}

const formContent = {
  fr: {
    firstNamePlaceholder: 'Prénom',
    lastNamePlaceholder: 'Nom',
    emailPlaceholder: 'Votre email professionnel',
    companyPlaceholder: 'Nom de votre entreprise',
    rolePlaceholder: 'Votre poste',
    roles: [
      'Dirigeant / CEO',
      'Directeur / Manager',
      'Responsable opérationnel',
      'Responsable marketing',
      'Responsable RH',
      'Autre',
    ],
    submitButton: 'Rejoindre la liste d\'attente',
    submitting: 'Inscription en cours...',
    successTitle: 'Vous êtes sur la liste !',
    successMessage: 'Merci pour votre intérêt. Vous serez parmi les premiers informés lors du lancement de la plateforme Mindzy AI. Nous vous contacterons prochainement.',
    errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
    privacy: 'Nous respectons votre vie privée. Aucun spam, uniquement des informations sur le lancement.',
  },
  en: {
    firstNamePlaceholder: 'First name',
    lastNamePlaceholder: 'Last name',
    emailPlaceholder: 'Your professional email',
    companyPlaceholder: 'Company name',
    rolePlaceholder: 'Your role',
    roles: [
      'Founder / CEO',
      'Director / Manager',
      'Operations lead',
      'Marketing lead',
      'HR lead',
      'Other',
    ],
    submitButton: 'Join the waitlist',
    submitting: 'Registering...',
    successTitle: 'You\'re on the list!',
    successMessage: 'Thank you for your interest. You\'ll be among the first to know when the Mindzy AI platform launches. We\'ll be in touch soon.',
    errorMessage: 'An error occurred. Please try again.',
    privacy: 'We respect your privacy. No spam, only launch updates.',
  },
  es: {
    firstNamePlaceholder: 'Nombre',
    lastNamePlaceholder: 'Apellido',
    emailPlaceholder: 'Tu email profesional',
    companyPlaceholder: 'Nombre de tu empresa',
    rolePlaceholder: 'Tu puesto',
    roles: [
      'Fundador / CEO',
      'Director / Manager',
      'Responsable de operaciones',
      'Responsable de marketing',
      'Responsable de RRHH',
      'Otro',
    ],
    submitButton: 'Unirse a la lista de espera',
    submitting: 'Registrando...',
    successTitle: '¡Estás en la lista!',
    successMessage: 'Gracias por tu interés. Serás de los primeros en saber cuándo se lance la plataforma Mindzy AI. Te contactaremos pronto.',
    errorMessage: 'Ocurrió un error. Por favor inténtalo de nuevo.',
    privacy: 'Respetamos tu privacidad. Sin spam, solo actualizaciones del lanzamiento.',
  },
}

export function WaitlistForm({ locale }: WaitlistFormProps) {
  const t = formContent[locale as keyof typeof formContent] || formContent.fr
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', role: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      })
      if (!res.ok) {
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-anthracite mb-3">{t.successTitle}</h3>
        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{t.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          required
          placeholder={t.firstNamePlaceholder}
          value={form.firstName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-anthracite placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
        />
        <input
          type="text"
          name="lastName"
          required
          placeholder={t.lastNamePlaceholder}
          value={form.lastName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-anthracite placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
        />
      </div>
      <input
        type="email"
        name="email"
        required
        placeholder={t.emailPlaceholder}
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-anthracite placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
      />
      <input
        type="text"
        name="company"
        placeholder={t.companyPlaceholder}
        value={form.company}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-anthracite placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-anthracite focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"
      >
        <option value="">{t.rolePlaceholder}</option>
        {t.roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      {status === 'error' && (
        <p className="text-rose-500 text-sm">{t.errorMessage}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={status === 'submitting' ? undefined : <ArrowIcon />}
        disabled={status === 'submitting'}
        className="w-full justify-center"
      >
        {status === 'submitting' ? t.submitting : t.submitButton}
      </Button>

      <p className="text-center text-gray-400 text-xs">{t.privacy}</p>
    </form>
  )
}
