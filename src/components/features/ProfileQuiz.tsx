'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ReCaptcha } from '@/components/ui/ReCaptcha'
import { profileQuestions, type ProfileKey } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

const profileMeta: Record<ProfileKey, { icon: string; gradient: string }> = {
  beginner: { icon: '🚀', gradient: 'from-violet to-purple-600' },
  pro: { icon: '⚡', gradient: 'from-blue-500 to-indigo-600' },
  booking: { icon: '📅', gradient: 'from-emerald-500 to-teal-600' },
  sales: { icon: '🛒', gradient: 'from-orange-500 to-red-500' },
  custom: { icon: '💻', gradient: 'from-cyan-500 to-blue-600' },
}

const contactCopy: Record<Locale, { title: string; subtitle: string; name: string; email: string; phone: string; message: string; submit: string; back: string; sending: string; recaptchaRequired: string }> = {
  fr: { title: 'Dernière étape !', subtitle: 'Laissez-nous vos coordonnées pour recevoir votre recommandation personnalisée.', name: 'Nom complet', email: 'Email', phone: 'Téléphone', message: 'Message (optionnel)', submit: 'Recevoir ma recommandation', back: 'Retour', sending: 'Envoi en cours...', recaptchaRequired: 'Veuillez compléter le captcha' },
  en: { title: 'Last step!', subtitle: 'Leave your contact info to receive your personalized recommendation.', name: 'Full name', email: 'Email', phone: 'Phone', message: 'Message (optional)', submit: 'Get my recommendation', back: 'Back', sending: 'Sending...', recaptchaRequired: 'Please complete the captcha' },
  es: { title: '¡Último paso!', subtitle: 'Déjenos sus datos para recibir su recomendación personalizada.', name: 'Nombre completo', email: 'Email', phone: 'Teléfono', message: 'Mensaje (opcional)', submit: 'Recibir mi recomendación', back: 'Volver', sending: 'Enviando...', recaptchaRequired: 'Por favor complete el captcha' },
}

const successCopy: Record<Locale, { title: string; message: string; cta: string }> = {
  fr: { title: 'Merci ! 🎉', message: 'Nous avons bien reçu vos réponses. Un expert vous contactera sous 24h avec une recommandation sur-mesure.', cta: 'Retour à l\'accueil' },
  en: { title: 'Thank you! 🎉', message: 'We received your answers. An expert will contact you within 24h with a custom recommendation.', cta: 'Back to home' },
  es: { title: '¡Gracias! 🎉', message: 'Hemos recibido sus respuestas. Un experto le contactará en 24h con una recomendación personalizada.', cta: 'Volver al inicio' },
}

const errorCopy: Record<Locale, { message: string; retry: string }> = {
  fr: { message: 'Une erreur est survenue. Veuillez réessayer.', retry: 'Réessayer' },
  en: { message: 'An error occurred. Please try again.', retry: 'Retry' },
  es: { message: 'Ocurrió un error. Inténtelo de nuevo.', retry: 'Reintentar' },
}

const progressCopy: Record<Locale, { step: string; question: string; contact: string }> = {
  fr: { step: 'Étape', question: 'Question', contact: 'Coordonnées' },
  en: { step: 'Step', question: 'Question', contact: 'Contact info' },
  es: { step: 'Paso', question: 'Pregunta', contact: 'Datos de contacto' },
}

export function ProfileQuiz({ locale, profileType }: { locale: Locale; profileType: ProfileKey }) {
  const questions = profileQuestions[profileType]
  const totalSteps = questions.length + 1
  const meta = profileMeta[profileType]
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [contact, setContact] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [emailError, setEmailError] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState('')

  const isContactStep = step === questions.length
  const progress = ((step + 1) / totalSteps) * 100
  const pt = progressCopy[locale]
  const ct = contactCopy[locale]
  const st = successCopy[locale]
  const et = errorCopy[locale]

  const handleAnswer = (questionId: string, value: string) => {
    if (step === 0 && Object.keys(answers).length === 0) analytics.profile.quizStart()
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 300)
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setRecaptchaError('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contact.email)) {
      setEmailError(locale === 'fr' ? 'Email invalide' : locale === 'en' ? 'Invalid email' : 'Email inválido')
      return
    }

    if (!recaptchaToken) {
      setRecaptchaError(ct.recaptchaRequired)
      return
    }

    setFormState('submitting')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileType,
          locale,
          recaptchaToken,
          ...contact,
          ...answers,
        }),
      })

      if (!response.ok) throw new Error('Failed')
      analytics.lead.generate('profile_quiz', profileType)
      analytics.lead.formSubmit('profile_quiz', true)
      setFormState('success')
    } catch {
      analytics.lead.formSubmit('profile_quiz', false)
      setFormState('error')
    } finally {
      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
    }
  }

  if (formState === 'success') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-violet/10 flex items-center justify-center text-4xl">✅</div>
            <h2 className="heading-3 text-anthracite mb-4">{st.title}</h2>
            <p className="body-regular mb-8 max-w-md mx-auto">{st.message}</p>
            <Link href={`/${locale}`}><Button variant="primary" size="lg">{st.cta}</Button></Link>
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
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center text-4xl">❌</div>
            <p className="body-regular mb-8">{et.message}</p>
            <Button variant="primary" size="lg" onClick={() => setFormState('idle')}>{et.retry}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {pt.step} {step + 1}/{totalSteps} — {isContactStep ? pt.contact : `${pt.question} ${step + 1}`}
          </span>
          <span className="text-sm font-medium text-violet">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-violet transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {isContactStep ? (
        <Card variant="elevated" className="animate-fade-in-up">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className={cn('w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl', meta.gradient)}>
                {meta.icon}
              </div>
              <h2 className="heading-3 text-anthracite mb-2">{ct.title}</h2>
              <p className="body-regular text-gray-600">{ct.subtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={ct.name}
                value={contact.fullName}
                onChange={(e) => setContact((p) => ({ ...p, fullName: e.target.value }))}
                required
                placeholder="Jean Dupont"
              />
              <Input
                label={ct.email}
                type="email"
                value={contact.email}
                onChange={(e) => { setContact((p) => ({ ...p, email: e.target.value })); setEmailError('') }}
                required
                placeholder="jean@example.com"
                error={emailError}
              />
              <Input
                label={ct.phone}
                type="tel"
                value={contact.phone}
                onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                required
                placeholder="+33 6 12 34 56 78"
              />
              <Textarea
                label={ct.message}
                value={contact.message}
                onChange={(e) => setContact((p) => ({ ...p, message: e.target.value }))}
                placeholder={locale === 'fr' ? 'Précisez votre besoin...' : locale === 'en' ? 'Describe your need...' : 'Describa su necesidad...'}
              />
              <ReCaptcha
                ref={recaptchaRef}
                onChange={(token) => {
                  setRecaptchaToken(token)
                  setRecaptchaError('')
                }}
                error={recaptchaError}
              />
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" size="lg" onClick={handleBack} className="flex-1">← {ct.back}</Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={formState === 'submitting' || !contact.fullName || !contact.email || !contact.phone}
                  className="flex-[2]"
                >
                  {formState === 'submitting' ? ct.sending : ct.submit}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card variant="elevated" className="animate-fade-in-up">
          <CardContent className="p-8">
            <h2 className="heading-3 text-anthracite mb-8 text-center">{questions[step].question[locale]}</h2>
            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleAnswer(questions[step].id, opt.value)}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4',
                    answers[questions[step].id] === opt.value
                      ? 'border-violet bg-violet/5'
                      : 'border-gray-200 hover:border-violet/50 hover:bg-gray-50'
                  )}
                >
                  {opt.icon && <span className="text-2xl flex-shrink-0">{opt.icon}</span>}
                  <span className="font-medium text-anthracite">{opt.label[locale]}</span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <div className="mt-8 text-center">
                <Button variant="ghost" size="sm" onClick={handleBack}>← {ct.back}</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
