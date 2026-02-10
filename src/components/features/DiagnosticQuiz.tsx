'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { copy } from '@/lib/copy'
import { diagnosticQuestions, customDiagnosticQuestions, diagnosticProfessionOptions } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import type { DiagnosticResult } from '@/lib/types'
import { cn } from '@/lib/utils'
import { analytics } from '@/lib/analytics'

function calculateResult(answers: Record<string, number>, isCustom: boolean): DiagnosticResult {
  const questions = isCustom ? customDiagnosticQuestions : diagnosticQuestions
  const total = Object.values(answers).reduce((s, n) => s + n, 0)
  const max = questions.length * 2
  const pct = (total / max) * 100

  if (isCustom) {
    if (pct < 35) return { score: total, level: 'low', message: { fr: '', en: '', es: '' }, recommendation: 'custom' }
    if (pct < 65) return { score: total, level: 'medium', message: { fr: '', en: '', es: '' }, recommendation: 'custom' }
    return { score: total, level: 'high', message: { fr: '', en: '', es: '' }, recommendation: 'custom' }
  }

  if (pct < 40) return { score: total, level: 'low', message: { fr: '', en: '', es: '' }, recommendation: 'pro' }
  if (pct < 70) return { score: total, level: 'medium', message: { fr: '', en: '', es: '' }, recommendation: 'business' }
  return { score: total, level: 'high', message: { fr: '', en: '', es: '' }, recommendation: 'basic' }
}

const customResultCopy: Record<Locale, { low: { title: string; message: string }; medium: { title: string; message: string }; high: { title: string; message: string } }> = {
  fr: {
    low: { title: 'Projet en phase de conception', message: 'Votre projet est encore au stade de l\'idéation. Un accompagnement stratégique et technique vous aidera à définir les specs, choisir la bonne architecture et lancer un MVP solide.' },
    medium: { title: 'Projet bien défini', message: 'Votre projet a de bonnes fondations. Nous pouvons vous aider à accélérer le développement avec un MVP structuré et les bons choix technologiques.' },
    high: { title: 'Projet prêt à décoller', message: 'Votre projet est mature et bien structuré. Nous pouvons lancer le développement rapidement avec une architecture robuste et scalable.' },
  },
  en: {
    low: { title: 'Project in conception phase', message: 'Your project is still in the ideation stage. Strategic and technical guidance will help define specs, choose the right architecture, and launch a solid MVP.' },
    medium: { title: 'Well-defined project', message: 'Your project has a solid foundation. We can help you accelerate development with a structured MVP and the right tech choices.' },
    high: { title: 'Project ready for takeoff', message: 'Your project is mature and well-structured. We can start development quickly with a robust and scalable architecture.' },
  },
  es: {
    low: { title: 'Proyecto en fase de concepción', message: 'Su proyecto está aún en la etapa de ideación. Un acompañamiento estratégico y técnico le ayudará a definir las especificaciones, elegir la arquitectura correcta y lanzar un MVP sólido.' },
    medium: { title: 'Proyecto bien definido', message: 'Su proyecto tiene buenas bases. Podemos ayudarle a acelerar el desarrollo con un MVP estructurado y las decisiones tecnológicas correctas.' },
    high: { title: 'Proyecto listo para despegar', message: 'Su proyecto es maduro y bien estructurado. Podemos iniciar el desarrollo rápidamente con una arquitectura robusta y escalable.' },
  },
}

export function DiagnosticQuiz({ locale, profile }: { locale: Locale; profile?: string }) {
  const isCustom = profile === 'custom'
  const questions = isCustom ? customDiagnosticQuestions : diagnosticQuestions
  const hasProfessionStep = !isCustom
  const totalSteps = hasProfessionStep ? 1 + questions.length : questions.length

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [profession, setProfession] = useState<string | null>(null)
  const [professionOther, setProfessionOther] = useState('')
  const t = copy[locale].diagnostic
  const isProfessionStep = hasProfessionStep && step === 0
  const questionIndex = hasProfessionStep ? step - 1 : step
  const q = !isProfessionStep && questionIndex >= 0 ? questions[questionIndex] : null
  const progress = ((step + 1) / totalSteps) * 100

  const handleProfessionSelect = (value: string) => {
    setProfession(value)
    if (value !== 'other') setProfessionOther('')
  }

  const canAdvanceFromProfession = profession !== null && (profession !== 'other' || professionOther.trim() !== '')

  const handleProfessionNext = () => {
    if (!canAdvanceFromProfession) return
    if (step === 0 && Object.keys(answers).length === 0) analytics.cta.diagnosticStart()
    analytics.cta.diagnosticStep(1, totalSteps)
    setTimeout(() => setStep(1), 300)
  }

  const handleAnswer = (questionId: string, score: number) => {
    if (!hasProfessionStep && step === 0 && Object.keys(answers).length === 0) analytics.cta.diagnosticStart()
    analytics.cta.diagnosticStep(step + 1, totalSteps)
    const next = { ...answers, [questionId]: score }
    setAnswers(next)
    if (step < totalSteps - 1) {
      setTimeout(() => setStep((s) => s + 1), 300)
    } else {
      const res = calculateResult(next, isCustom)
      analytics.cta.diagnosticComplete(res.score, res.level, res.recommendation)
      setResult(res)
    }
  }

  if (result) {
    const levelCopy = isCustom ? customResultCopy[locale][result.level] : t.result[result.level]
    const ctaParams = new URLSearchParams({ recommendation: result.recommendation })
    if (profession) ctaParams.set('profession', profession)
    if (profession === 'other' && professionOther.trim()) ctaParams.set('professionOther', professionOther.trim())
    const ctaHref = isCustom
      ? `/${locale}/profil/custom`
      : `/${locale}/onboarding?${ctaParams.toString()}`
    const ctaLabel = isCustom
      ? (locale === 'fr' ? 'Décrire mon projet sur-mesure' : locale === 'en' ? 'Describe my custom project' : 'Describir mi proyecto personalizado')
      : t.cta

    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-violet/10 flex items-center justify-center text-4xl">
              {result.level === 'low' ? (isCustom ? '💡' : '🚀') : result.level === 'medium' ? (isCustom ? '🛠️' : '💪') : (isCustom ? '🚀' : '🎉')}
            </div>
            <h2 className="heading-3 text-anthracite mb-4">{levelCopy.title}</h2>
            <p className="body-regular mb-8">{levelCopy.message}</p>

            {isCustom && (
              <div className="mb-8 p-4 rounded-xl bg-gray-50 text-left">
                <h3 className="font-semibold text-anthracite mb-3 text-sm uppercase tracking-wider">
                  {locale === 'fr' ? 'Résumé de votre projet' : locale === 'en' ? 'Your project summary' : 'Resumen de su proyecto'}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {Object.entries(answers).map(([qId, score]) => {
                    const question = questions.find((qq) => qq.id === qId)
                    if (!question) return null
                    const selectedOption = question.options.find((o) => o.score === score)
                    return (
                      <div key={qId} className="flex items-start gap-2">
                        <span className="text-violet font-medium shrink-0">•</span>
                        <span>{selectedOption?.label[locale]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ctaHref} onClick={() => !isCustom && analytics.onboarding.start(result.recommendation)}>
                <Button variant="primary" size="lg">{ctaLabel}</Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={() => { setResult(null); setStep(0); setAnswers({}); setProfession(null); setProfessionOther(''); }}>
                {copy[locale].chatbot.buttons.restart}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-500">{t.progress} {step + 1}/{totalSteps}</span><span className="text-sm font-medium text-violet">{Math.round(progress)}%</span></div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-violet transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} /></div>
      </div>
      <Card variant="elevated">
        <CardContent className="p-8">
          {isProfessionStep ? (
            <>
              <h2 className="heading-3 text-anthracite mb-8 text-center">{t.professionQuestion}</h2>
              <div className="space-y-3">
                {diagnosticProfessionOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleProfessionSelect(opt.value)}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 text-left transition-all',
                      profession === opt.value ? 'border-violet bg-violet/5' : 'border-gray-200 hover:border-violet/50 hover:bg-gray-50'
                    )}
                  >
                    <span className="font-medium text-anthracite">{opt.label[locale]}</span>
                  </button>
                ))}
              </div>
              {profession === 'other' && (
                <div className="mt-6">
                  <Input
                    label=""
                    placeholder={t.otherProfessionPlaceholder}
                    value={professionOther}
                    onChange={(e) => setProfessionOther(e.target.value)}
                  />
                </div>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="lg" onClick={handleProfessionNext} disabled={!canAdvanceFromProfession}>
                  {t.next}
                </Button>
              </div>
            </>
          ) : q ? (
            <>
              <h2 className="heading-3 text-anthracite mb-8 text-center">{q.question[locale]}</h2>
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => handleAnswer(q.id, opt.score)} className={cn('w-full p-4 rounded-xl border-2 text-left transition-all', answers[q.id] === opt.score ? 'border-violet bg-violet/5' : 'border-gray-200 hover:border-violet/50 hover:bg-gray-50')}><span className="font-medium text-anthracite">{opt.label[locale]}</span></button>
                ))}
              </div>
              {step > 0 && <div className="mt-8 text-center"><Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>← {t.back}</Button></div>}
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
