'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/Card'
import { copy } from '@/lib/copy'
import { testimonials } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Testimonials({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const t = copy[locale].testimonials

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  return (
    <section className="section-padding bg-anthracite text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-800/10 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-wide relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="eyebrow text-violet-400 mb-4 block">Témoignages</span>
          <h2 className="heading-2 mb-4">{t.title}</h2>
          <p className="body-large text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon decoration */}
            <div className="absolute -top-8 -left-4 text-violet-500/20">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {testimonials.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  'transition-all duration-700',
                  i === active
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                )}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm" padding="lg">
                  {/* Stars */}
                  <div className="flex gap-1.5 mb-8">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg
                        key={j}
                        className={cn(
                          'w-6 h-6 transition-all duration-300',
                          j < item.rating ? 'text-gold' : 'text-gray-700'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-display text-2xl md:text-3xl text-white leading-relaxed mb-10">
                    &ldquo;{item.quote[locale]}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-violet/30">
                      {item.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{item.name}</div>
                      <div className="text-gray-400">{item.profession[locale]}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev button */}
            <button
              type="button"
              onClick={() => {
                setIsAutoPlaying(false)
                setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Précédent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActive(i)
                  }}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-500',
                    i === active
                      ? 'bg-gradient-to-r from-violet-400 to-violet w-10'
                      : 'bg-white/20 hover:bg-white/40 w-2.5'
                  )}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={() => {
                setIsAutoPlaying(false)
                next()
              }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Suivant"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust logos */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <p className="text-center text-sm text-gray-500 mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['Consultants', 'Entrepreneurs', 'Indépendants', 'PME', 'Startups'].map((name) => (
              <div key={name} className="text-white/60 font-display text-lg">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
