'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { routingQuestion, commonQuestions, branchQuestions, branchResults } from '@/lib/diagnostic-data'
import { config } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import type { DiagnosticBranch, BranchingDiagnosticQuestion } from '@/lib/types'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

const uiCopy = {
  fr: {
    progress: 'Question',
    next: 'Suivant',
    back: 'Retour',
    restart: 'Recommencer',
    orientationLabel: 'Orientation recommandée',
    selectUpTo: (n: number) => `Sélectionnez jusqu'à ${n} options`,
    freeTextPlaceholder: 'Précisez votre besoin...',
    seeResult: 'Voir mon résultat',
    contactUs: 'Nous contacter',
    bookMeeting: 'Prendre rendez-vous',
    contactTitle: 'Dernière étape !',
    contactSubtitle: 'Laissez-nous vos coordonnées pour être recontacté par un expert.',
    nameLabel: 'Nom complet',
    emailLabel: 'Email',
    phoneLabel: 'Téléphone',
    messageLabel: 'Message (optionnel)',
    submitLabel: 'Envoyer ma demande',
    sending: 'Envoi en cours...',
    successTitle: 'Merci !',
    successMessage: 'Nous avons bien reçu votre demande. Un expert vous contactera sous 24h.',
    successCta: 'Retour à l\'accueil',
    errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
    retryLabel: 'Réessayer',
    invalidEmail: 'Email invalide',
  },
  en: {
    progress: 'Question',
    next: 'Next',
    back: 'Back',
    restart: 'Start over',
    orientationLabel: 'Recommended approach',
    selectUpTo: (n: number) => `Select up to ${n} options`,
    freeTextPlaceholder: 'Specify your need...',
    seeResult: 'See my result',
    contactUs: 'Contact us',
    bookMeeting: 'Book a meeting',
    contactTitle: 'Last step!',
    contactSubtitle: 'Leave your contact info so an expert can reach out to you.',
    nameLabel: 'Full name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    messageLabel: 'Message (optional)',
    submitLabel: 'Send my request',
    sending: 'Sending...',
    successTitle: 'Thank you!',
    successMessage: 'We received your request. An expert will contact you within 24h.',
    successCta: 'Back to home',
    errorMessage: 'An error occurred. Please try again.',
    retryLabel: 'Retry',
    invalidEmail: 'Invalid email',
  },
  es: {
    progress: 'Pregunta',
    next: 'Siguiente',
    back: 'Atrás',
    restart: 'Empezar de nuevo',
    orientationLabel: 'Orientación recomendada',
    selectUpTo: (n: number) => `Seleccione hasta ${n} opciones`,
    freeTextPlaceholder: 'Especifique su necesidad...',
    seeResult: 'Ver mi resultado',
    contactUs: 'Contáctenos',
    bookMeeting: 'Reservar una cita',
    contactTitle: '¡Último paso!',
    contactSubtitle: 'Déjenos sus datos para que un experto le contacte.',
    nameLabel: 'Nombre completo',
    emailLabel: 'Email',
    phoneLabel: 'Teléfono',
    messageLabel: 'Mensaje (opcional)',
    submitLabel: 'Enviar mi solicitud',
    sending: 'Enviando...',
    successTitle: '¡Gracias!',
    successMessage: 'Hemos recibido su solicitud. Un experto le contactará en 24h.',
    successCta: 'Volver al inicio',
    errorMessage: 'Ocurrió un error. Inténtelo de nuevo.',
    retryLabel: 'Reintentar',
    invalidEmail: 'Email inválido',
  },
}

export function DiagnosticQuiz({ locale }: { locale: Locale }) {
  const t = uiCopy[locale]

  const [step, setStep] = useState(0)
  const [branch, setBranch] = useState<DiagnosticBranch | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [freeText, setFreeText] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contact, setContact] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')

  const totalSteps = 5
  const progress = ((step + 1) / totalSteps) * 100

  function getCurrentQuestion(): BranchingDiagnosticQuestion | null {
    if (step === 0) return routingQuestion
    if (step === 1) return commonQuestions[0]
    if (step === 2) return commonQuestions[1]
    if (step === 3 && branch) return branchQuestions[branch][0]
    if (step === 4 && branch) return branchQuestions[branch][1]
    return null
  }

  const currentQuestion = getCurrentQuestion()

  function handleSingleSelect(questionId: string, value: string) {
    if (step === 0) {
      analytics.cta.diagnosticStart()
    }

    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (step === 0) {
      setBranch(value as DiagnosticBranch)
    }

    if (currentQuestion?.type === 'single') {
      if (step < totalSteps - 1) {
        setTimeout(() => setStep((s) => s + 1), 300)
      } else {
        setTimeout(() => {
          setShowResult(true)
          if (branch) analytics.cta.diagnosticComplete(0, 'low', branch)
        }, 300)
      }
    }
  }

  function handleMultiSelect(questionId: string, value: string) {
    const current = (answers[questionId] as string[] | undefined) || []
    const maxSelect = currentQuestion?.maxSelect || 2
    let updated: string[]

    if (current.includes(value)) {
      updated = current.filter((v) => v !== value)
    } else if (current.length < maxSelect) {
      updated = [...current, value]
    } else {
      return
    }

    setAnswers({ ...answers, [questionId]: updated })
  }

  function handleMultiNext() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1)
    } else {
      setShowResult(true)
      if (branch) analytics.cta.diagnosticComplete(0, 'low', branch)
    }
  }

  function canAdvance(): boolean {
    if (!currentQuestion) return false
    const answer = answers[currentQuestion.id]
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0
    }
    return !!answer
  }

  function handleBack() {
    if (step > 0) {
      setStep((s) => s - 1)
    }
  }

  function handleReset() {
    setStep(0)
    setBranch(null)
    setAnswers({})
    setFreeText('')
    setShowResult(false)
    setShowContactForm(false)
    setContact({ fullName: '', email: '', phone: '', message: '' })
    setFormState('idle')
    setEmailError('')
  }

  function handleCtaClick() {
    setShowContactForm(true)
  }

  async function handleSubmitContact(e: React.FormEvent) {
    e.preventDefault()
    setEmailError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contact.email)) {
      setEmailError(t.invalidEmail)
      return
    }

    setFormState('submitting')

    const serializedAnswers: Record<string, string> = {}
    for (const [key, value] of Object.entries(answers)) {
      serializedAnswers[key] = Array.isArray(value) ? value.join(', ') : value
    }
    if (freeText) {
      serializedAnswers['freeText'] = freeText
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileType: `diagnostic-${branch}`,
          locale,
          ...contact,
          ...serializedAnswers,
        }),
      })

      if (!response.ok) throw new Error('Failed')
      analytics.lead.generate('diagnostic_quiz', `branch-${branch}`)
      analytics.lead.formSubmit('diagnostic_quiz', true)
      setFormState('success')
    } catch {
      analytics.lead.formSubmit('diagnostic_quiz', false)
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="heading-3 text-anthracite mb-4">{t.successTitle}</h2>
            <p className="body-regular text-gray-600 mb-8 max-w-md mx-auto">{t.successMessage}</p>
            <Link href={`/${locale}`}>
              <Button variant="primary" size="lg">{t.successCta}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (formState === 'error') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center text-4xl">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="body-regular text-gray-600 mb-8">{t.errorMessage}</p>
            <Button variant="primary" size="lg" onClick={() => setFormState('idle')}>{t.retryLabel}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showContactForm && branch) {
    const result = branchResults[branch]
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card variant="elevated">
          <CardContent className="p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet to-purple-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="heading-3 text-anthracite mb-2">{t.contactTitle}</h2>
              <p className="body-regular text-gray-600">{t.contactSubtitle}</p>
            </div>

            <div className="mb-6 p-4 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-sm font-medium text-violet-700 mb-1">{result.title[locale]}</p>
              <p className="text-xs text-violet-600">{t.orientationLabel} : {result.orientation[locale]}</p>
            </div>

            <form onSubmit={handleSubmitContact} className="space-y-4">
              <Input
                label={t.nameLabel}
                value={contact.fullName}
                onChange={(e) => setContact((p) => ({ ...p, fullName: e.target.value }))}
                required
                placeholder="Jean Dupont"
              />
              <Input
                label={t.emailLabel}
                type="email"
                value={contact.email}
                onChange={(e) => { setContact((p) => ({ ...p, email: e.target.value })); setEmailError('') }}
                required
                placeholder="jean@example.com"
                error={emailError}
              />
              <Input
                label={t.phoneLabel}
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                required
                placeholder="+33 6 12 34 56 78"
              />
              <Input
                label={t.messageLabel}
                value={contact.message}
                onChange={(e) => setContact((p) => ({ ...p, message: e.target.value }))}
                placeholder={t.freeTextPlaceholder}
              />
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1"
                >
                  ← {t.back}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={formState === 'submitting' || !contact.fullName || !contact.email || !contact.phone}
                  className="flex-[2]"
                >
                  {formState === 'submitting' ? t.sending : t.submitLabel}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult && branch) {
    const result = branchResults[branch]
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-violet/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>

            <h2 className="heading-3 text-anthracite mb-4">{result.title[locale]}</h2>
            <p className="body-regular text-gray-600 mb-6">{result.text[locale]}</p>

            <div className="mb-8 p-4 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-sm font-medium text-violet-700">
                {t.orientationLabel} : {result.orientation[locale]}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={handleCtaClick}>
                {t.contactUs}
              </Button>
              <a href={config.CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="w-full">
                  {t.bookMeeting}
                </Button>
              </a>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 text-sm text-gray-400 hover:text-violet transition-colors underline underline-offset-2"
            >
              {t.restart}
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) return null

  const isMulti = currentQuestion.type === 'multiple'
  const selectedMulti = (answers[currentQuestion.id] as string[] | undefined) || []
  const selectedSingle = answers[currentQuestion.id] as string | undefined
  const showFreeTextField = currentQuestion.freeText && selectedSingle === 'other'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {t.progress} {step + 1}/{totalSteps}
          </span>
          <span className="text-sm font-medium text-violet">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card variant="elevated">
        <CardContent className="p-8">
          <h2 className="heading-3 text-anthracite mb-2 text-center">
            {currentQuestion.question[locale]}
          </h2>

          {isMulti && currentQuestion.maxSelect && (
            <p className="text-sm text-gray-400 text-center mb-6">
              {t.selectUpTo(currentQuestion.maxSelect)}
            </p>
          )}

          {!isMulti && <div className="mb-6" />}

          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = isMulti
                ? selectedMulti.includes(opt.value)
                : selectedSingle === opt.value

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    isMulti
                      ? handleMultiSelect(currentQuestion.id, opt.value)
                      : handleSingleSelect(currentQuestion.id, opt.value)
                  }
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    isSelected
                      ? 'border-violet bg-violet/5'
                      : 'border-gray-200 hover:border-violet/50 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {isMulti && (
                      <div
                        className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0',
                          isSelected
                            ? 'border-violet bg-violet'
                            : 'border-gray-300'
                        )}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                    <span className="font-medium text-anthracite">{opt.label[locale]}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {showFreeTextField && (
            <div className="mt-4">
              <Input
                label=""
                placeholder={t.freeTextPlaceholder}
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
              />
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isMulti && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleMultiNext}
                disabled={!canAdvance()}
              >
                {step === totalSteps - 1 ? t.seeResult : t.next}
              </Button>
            )}
            {step > 0 && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                ← {t.back}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
