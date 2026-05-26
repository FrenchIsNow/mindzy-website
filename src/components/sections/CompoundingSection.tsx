'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FadeIn } from '@/components/animations/FadeIn'

const TRANSLATIONS = {
  en: {
    eyebrow: 'Outcomes',
    h2_em: 'Infrastructure',
    h2_end: 'that compounds.',
    desc: 'Three ranges defined by Mindzy deployment patterns. Actual outcomes are scoped per project during the diagnosis phase.',
    footerNote: 'Ranges based on Mindzy deployment patterns. Actual outcomes are defined per project during the diagnosis phase.',
    counters: [
      { suffix: '%', label: 'Average reduction in time spent on repetitive workflows after the first deployment phase.' },
      { suffix: '×', label: 'Increase in CRM and reporting consistency observed across deployed departments.' },
      { suffix: ' days', label: 'Typical deployment window for the first operational AI workforce.' },
    ],
  },
  fr: {
    eyebrow: 'Résultats',
    h2_em: 'Une infrastructure',
    h2_end: 'qui se cumule.',
    desc: 'Trois plages définies par les déploiements Mindzy. Les résultats réels sont calibrés par projet lors de la phase de diagnostic.',
    footerNote: 'Plages basées sur les déploiements Mindzy. Les résultats réels sont définis par projet lors de la phase de diagnostic.',
    counters: [
      { suffix: '%', label: 'Réduction moyenne du temps consacré aux workflows répétitifs après la première phase de déploiement.' },
      { suffix: '×', label: 'Amélioration de la cohérence CRM et des rapports observée dans les départements déployés.' },
      { suffix: ' jours', label: 'Fenêtre de déploiement typique pour la première force de travail IA opérationnelle.' },
    ],
  },
  es: {
    eyebrow: 'Resultados',
    h2_em: 'Infraestructura',
    h2_end: 'que crece con el tiempo.',
    desc: 'Tres rangos definidos por los patrones de despliegue de Mindzy. Los resultados reales se delimitan por proyecto durante la fase de diagnóstico.',
    footerNote: 'Rangos basados en patrones de despliegue de Mindzy. Los resultados reales se definen por proyecto durante la fase de diagnóstico.',
    counters: [
      { suffix: '%', label: 'Reducción promedio del tiempo dedicado a flujos de trabajo repetitivos tras la primera fase de despliegue.' },
      { suffix: '×', label: 'Aumento en la consistencia de CRM e informes observado en los departamentos desplegados.' },
      { suffix: ' días', label: 'Ventana de despliegue típica para la primera fuerza de trabajo de IA operativa.' },
    ],
  },
  de: {
    eyebrow: 'Ergebnisse',
    h2_em: 'Infrastruktur',
    h2_end: 'die sich aufbaut.',
    desc: 'Drei Bereiche, die durch Mindzy-Bereitstellungsmuster definiert werden. Die tatsächlichen Ergebnisse werden pro Projekt in der Diagnosephase festgelegt.',
    footerNote: 'Bereiche basierend auf Mindzy-Bereitstellungsmustern. Die tatsächlichen Ergebnisse werden pro Projekt in der Diagnosephase festgelegt.',
    counters: [
      { suffix: '%', label: 'Durchschnittliche Reduzierung der Zeit für repetitive Workflows nach der ersten Bereitstellungsphase.' },
      { suffix: '×', label: 'Steigerung der CRM- und Berichtskonsistenz in den eingesetzten Abteilungen.' },
      { suffix: ' Tage', label: 'Typisches Bereitstellungsfenster für die erste operative KI-Belegschaft.' },
    ],
  },
  it: {
    eyebrow: 'Risultati',
    h2_em: 'Un\'infrastruttura',
    h2_end: 'che si accumula.',
    desc: 'Tre intervalli definiti dai modelli di distribuzione Mindzy. I risultati effettivi vengono calibrati per progetto durante la fase di diagnosi.',
    footerNote: 'Intervalli basati sui modelli di distribuzione Mindzy. I risultati effettivi vengono definiti per progetto durante la fase di diagnosi.',
    counters: [
      { suffix: '%', label: 'Riduzione media del tempo dedicato ai workflow ripetitivi dopo la prima fase di distribuzione.' },
      { suffix: '×', label: 'Aumento della coerenza CRM e dei report osservato nei reparti distribuiti.' },
      { suffix: ' giorni', label: 'Finestra di distribuzione tipica per la prima forza lavoro AI operativa.' },
    ],
  },
  pt: {
    eyebrow: 'Resultados',
    h2_em: 'Infraestrutura',
    h2_end: 'que se acumula.',
    desc: 'Três intervalos definidos pelos padrões de implantação Mindzy. Os resultados reais são definidos por projeto durante a fase de diagnóstico.',
    footerNote: 'Intervalos baseados nos padrões de implantação Mindzy. Os resultados reais são definidos por projeto durante a fase de diagnóstico.',
    counters: [
      { suffix: '%', label: 'Redução média no tempo gasto em fluxos de trabalho repetitivos após a primeira fase de implantação.' },
      { suffix: '×', label: 'Aumento na consistência de CRM e relatórios observado nos departamentos implantados.' },
      { suffix: ' dias', label: 'Janela de implantação típica para a primeira força de trabalho de IA operacional.' },
    ],
  },
  ar: {
    eyebrow: 'النتائج',
    h2_em: 'بنية تحتية',
    h2_end: 'تتراكم مع الوقت.',
    desc: 'ثلاثة نطاقات محددة بأنماط نشر Mindzy. تُحدَّد النتائج الفعلية لكل مشروع خلال مرحلة التشخيص.',
    footerNote: 'نطاقات مبنية على أنماط نشر Mindzy. تُحدَّد النتائج الفعلية لكل مشروع خلال مرحلة التشخيص.',
    counters: [
      { suffix: '%', label: 'متوسط تخفيض الوقت المستغرق في سير العمل المتكرر بعد مرحلة النشر الأولى.' },
      { suffix: '×', label: 'تحسن في اتساق CRM والتقارير عبر الأقسام المنشورة.' },
      { suffix: ' يوم', label: 'نافذة النشر المعتادة لأول فريق عمل ذكاء اصطناعي تشغيلي.' },
    ],
  },
  zh: {
    eyebrow: '成效',
    h2_em: '复利增长的',
    h2_end: '基础设施。',
    desc: '三个由 Mindzy 部署模式定义的区间。实际成效在诊断阶段按项目具体确定。',
    footerNote: '区间基于 Mindzy 部署模式。实际成效在诊断阶段按项目具体确定。',
    counters: [
      { suffix: '%', label: '首次部署阶段后，重复性工作流耗时的平均减少幅度。' },
      { suffix: '×', label: '在已部署部门中观察到的 CRM 和报告一致性提升幅度。' },
      { suffix: ' 天', label: '首个运营 AI 团队的典型部署周期。' },
    ],
  },
  ja: {
    eyebrow: '成果',
    h2_em: '複利で伸びる',
    h2_end: 'インフラ。',
    desc: 'Mindzy の導入パターンから導かれた3つのレンジです。実際の成果は診断フェーズでプロジェクトごとに定義されます。',
    footerNote: 'Mindzy 導入パターンに基づくレンジ。実際の成果は診断フェーズでプロジェクトごとに定義されます。',
    counters: [
      { suffix: '%', label: '最初の導入フェーズ後、繰り返しワークフローに費やす時間の平均削減率。' },
      { suffix: '×', label: '導入済み部門で観察された CRM とレポートの一貫性の向上倍率。' },
      { suffix: ' 日', label: '最初の運用 AI ワークフォースの典型的な導入期間。' },
    ],
  },
  ru: {
    eyebrow: 'Результаты',
    h2_em: 'Инфраструктура,',
    h2_end: 'которая накапливается.',
    desc: 'Три диапазона, определённых паттернами развёртывания Mindzy. Фактические результаты уточняются для каждого проекта в фазе диагностики.',
    footerNote: 'Диапазоны на основе паттернов развёртывания Mindzy. Фактические результаты определяются для каждого проекта в фазе диагностики.',
    counters: [
      { suffix: '%', label: 'Среднее сокращение времени на повторяющиеся рабочие процессы после первой фазы развёртывания.' },
      { suffix: '×', label: 'Повышение согласованности CRM и отчётности в развёрнутых подразделениях.' },
      { suffix: ' дней', label: 'Типичное окно развёртывания первой операционной AI-команды.' },
    ],
  },
}

const COUNTER_RANGES = [
  { from: 40, to: 60 },
  { from: 3, to: 5 },
  { from: 30, to: 90 },
]

function useCounterAnimation(from: number, to: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [lo, setLo] = useState(from)
  const [hi, setHi] = useState(to)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true
        const t0 = performance.now()
        const dur = 1600
        function step(t: number) {
          const p = Math.min(1, (t - t0) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setLo(Math.round(from * eased))
          setHi(Math.round(to * eased))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to])

  return { ref, lo, hi }
}

function Counter({ range, suffix, label }: { range: { from: number; to: number }; suffix: string; label: string }) {
  const { ref, lo, hi } = useCounterAnimation(range.from, range.to)
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(56px,7.4vw,104px)', lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: '18px' }}>
        {lo}
        <span style={{ display: 'inline-block', margin: '0 0.1em', color: 'var(--ai-accent)', fontStyle: 'italic' }}>–</span>
        {hi}
        <span style={{ fontSize: '0.5em', marginLeft: '0.06em', color: 'var(--ai-fg-muted)' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--ai-fg-muted)', maxWidth: '28ch' }}>{label}</div>
    </div>
  )
}

export function CompoundingSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <section className="py-16 md:py-[120px] border-t border-[var(--ai-border)]">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
        <FadeIn>
          <div style={{ maxWidth: '740px', marginBottom: 'clamp(28px,4vw,56px)' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>{t.eyebrow}</div>
            <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1.08, marginTop: '14px' }}>
              <em>{t.h2_em}</em> {t.h2_end}
            </h2>
            <p style={{ marginTop: '24px', fontSize: 'clamp(15px,2.5vw,18px)', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '600px' }}>
              {t.desc}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-[56px] mt-14">
          {COUNTER_RANGES.map((range, i) => (
            <Counter
              key={i}
              range={range}
              suffix={t.counters[i].suffix}
              label={t.counters[i].label}
            />
          ))}
        </div>

        <p style={{ marginTop: '36px', fontSize: '13px', color: 'var(--ai-fg-soft)', fontStyle: 'italic', textAlign: 'center', maxWidth: '720px', margin: '36px auto 0', lineHeight: 1.55 }}>
          {t.footerNote}
        </p>
      </div>
    </section>
  )
}

export default CompoundingSection
