'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { routingQuestion, commonQuestions, branchQuestions, branchResults } from '@/lib/diagnostic-data'
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
  },
}

export function DiagnosticQuiz({ locale }: { locale: Locale }) {
  const t = uiCopy[locale]

  const [step, setStep] = useState(0)
  const [branch, setBranch] = useState<DiagnosticBranch | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [freeText, setFreeText] = useState('')
  const [showResult, setShowResult] = useState(false)

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
  }

  if (showResult && branch) {
    const result = branchResults[branch]
    return (
      <div className="max-w-2xl mx-auto">
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
              <Link href={`/${locale}/diagnostic`}>
                <Button variant="primary" size="lg">
                  {result.cta[locale]}
                </Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={handleReset}>
                {t.restart}
              </Button>
            </div>
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
