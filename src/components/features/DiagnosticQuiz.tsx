'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { copy } from '@/lib/copy'
import { diagnosticQuestions } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import type { DiagnosticResult } from '@/lib/types'
import { cn } from '@/lib/utils'

function calculateResult(answers: Record<string, number>): DiagnosticResult {
  const total = Object.values(answers).reduce((s, n) => s + n, 0)
  const max = diagnosticQuestions.length * 2
  const pct = (total / max) * 100
  if (pct < 40) return { score: total, level: 'low', message: { fr: '', en: '', es: '' }, recommendation: 'pro' }
  if (pct < 70) return { score: total, level: 'medium', message: { fr: '', en: '', es: '' }, recommendation: 'business' }
  return { score: total, level: 'high', message: { fr: '', en: '', es: '' }, recommendation: 'basic' }
}

export function DiagnosticQuiz({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const t = copy[locale].diagnostic
  const q = diagnosticQuestions[step]
  const progress = ((step + 1) / diagnosticQuestions.length) * 100

  const handleAnswer = (questionId: string, score: number) => {
    const next = { ...answers, [questionId]: score }
    setAnswers(next)
    if (step < diagnosticQuestions.length - 1) setTimeout(() => setStep((s) => s + 1), 300)
    else setResult(calculateResult(next))
  }

  if (result) {
    const levelCopy = t.result[result.level]
    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" className="text-center">
          <CardContent className="p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-violet/10 flex items-center justify-center text-4xl">{result.level === 'low' ? '🚀' : result.level === 'medium' ? '💪' : '🎉'}</div>
            <h2 className="heading-3 text-anthracite mb-4">{levelCopy.title}</h2>
            <p className="body-regular mb-8">{levelCopy.message}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/onboarding?recommendation=${result.recommendation}`}><Button variant="primary" size="lg">{t.cta}</Button></Link>
              <Button variant="secondary" size="lg" onClick={() => { setResult(null); setStep(0); setAnswers({}); }}>{copy[locale].chatbot.buttons.restart}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-500">{t.progress} {step + 1}/{diagnosticQuestions.length}</span><span className="text-sm font-medium text-violet">{Math.round(progress)}%</span></div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-violet transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} /></div>
      </div>
      <Card variant="elevated">
        <CardContent className="p-8">
          <h2 className="heading-3 text-anthracite mb-8 text-center">{q.question[locale]}</h2>
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button key={opt.value} type="button" onClick={() => handleAnswer(q.id, opt.score)} className={cn('w-full p-4 rounded-xl border-2 text-left transition-all', answers[q.id] === opt.score ? 'border-violet bg-violet/5' : 'border-gray-200 hover:border-violet/50 hover:bg-gray-50')}><span className="font-medium text-anthracite">{opt.label[locale]}</span></button>
            ))}
          </div>
          {step > 0 && <div className="mt-8 text-center"><Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>← {t.back}</Button></div>}
        </CardContent>
      </Card>
    </div>
  )
}
