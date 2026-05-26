'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { FadeIn } from '@/components/animations/FadeIn'

const TRANSLATIONS = {
  en: {
    eyebrow: 'Model routing',
    h2_plain: 'Every task.',
    h2_em: 'The right model.',
    h2_end: 'Automatically.',
    desc_1: 'Mindzy operates three proprietary models —',
    desc_2: ', and routes each task to the best-fit model.',
    incoming: 'Incoming',
    completed: 'Completed',
    tasks: [
      'Classify incoming ticket',
      'Summarize Zoom meeting',
      'Extract invoice data',
      'Draft strategic proposal',
      'Triage support inbox',
      'Compare vendor contracts',
      'Generate follow-up email',
      'Run market analysis',
      'Draft customer reply',
      'Localize product description',
      'Translate UI strings',
      'Open-source code refactor',
    ],
  },
  fr: {
    eyebrow: 'Routage des modèles',
    h2_plain: 'Chaque tâche.',
    h2_em: 'Le bon modèle.',
    h2_end: 'Automatiquement.',
    desc_1: 'Mindzy exploite trois modèles propriétaires —',
    desc_2: "— et route chaque tâche vers le modèle le plus adapté.",
    incoming: 'Entrant',
    completed: 'Terminé',
    tasks: [
      'Classifier un ticket entrant',
      'Résumer une réunion Zoom',
      'Extraire des données de facture',
      'Rédiger une proposition stratégique',
      'Trier la boîte de support',
      'Comparer des contrats fournisseurs',
      'Générer un email de suivi',
      'Réaliser une analyse de marché',
      'Rédiger une réponse client',
      'Localiser une description produit',
      'Traduire des chaînes UI',
      'Refactoriser du code open-source',
    ],
  },
  es: {
    eyebrow: 'Enrutamiento de modelos',
    h2_plain: 'Cada tarea.',
    h2_em: 'El modelo correcto.',
    h2_end: 'Automáticamente.',
    desc_1: 'Mindzy opera tres modelos propietarios —',
    desc_2: '— y enruta cada tarea al modelo más adecuado.',
    incoming: 'Entrante',
    completed: 'Completado',
    tasks: [
      'Clasificar ticket entrante',
      'Resumir reunión de Zoom',
      'Extraer datos de factura',
      'Redactar propuesta estratégica',
      'Clasificar bandeja de soporte',
      'Comparar contratos de proveedores',
      'Generar email de seguimiento',
      'Realizar análisis de mercado',
      'Redactar respuesta a cliente',
      'Localizar descripción de producto',
      'Traducir cadenas de UI',
      'Refactorizar código open-source',
    ],
  },
  de: {
    eyebrow: 'Modell-Routing',
    h2_plain: 'Jede Aufgabe.',
    h2_em: 'Das richtige Modell.',
    h2_end: 'Automatisch.',
    desc_1: 'Mindzy betreibt drei proprietäre Modelle —',
    desc_2: '— und leitet jede Aufgabe zum passendsten Modell weiter.',
    incoming: 'Eingehend',
    completed: 'Abgeschlossen',
    tasks: [
      'Eingehendes Ticket klassifizieren',
      'Zoom-Meeting zusammenfassen',
      'Rechnungsdaten extrahieren',
      'Strategischen Vorschlag verfassen',
      'Support-Postfach sortieren',
      'Lieferantenverträge vergleichen',
      'Follow-up-E-Mail generieren',
      'Marktanalyse durchführen',
      'Kundenantwort verfassen',
      'Produktbeschreibung lokalisieren',
      'UI-Strings übersetzen',
      'Open-Source-Code refaktorieren',
    ],
  },
  it: {
    eyebrow: 'Instradamento modelli',
    h2_plain: 'Ogni attività.',
    h2_em: 'Il modello giusto.',
    h2_end: 'Automaticamente.',
    desc_1: 'Mindzy gestisce tre modelli proprietari —',
    desc_2: '— e instrada ogni attività al modello più adatto.',
    incoming: 'In arrivo',
    completed: 'Completato',
    tasks: [
      'Classificare ticket in arrivo',
      'Riassumere riunione Zoom',
      'Estrarre dati fattura',
      'Redigere proposta strategica',
      'Smistare casella di supporto',
      'Confrontare contratti fornitori',
      'Generare email di follow-up',
      'Eseguire analisi di mercato',
      'Redigere risposta cliente',
      'Localizzare descrizione prodotto',
      'Tradurre stringhe UI',
      'Refactoring codice open-source',
    ],
  },
  pt: {
    eyebrow: 'Roteamento de modelos',
    h2_plain: 'Cada tarefa.',
    h2_em: 'O modelo certo.',
    h2_end: 'Automaticamente.',
    desc_1: 'Mindzy opera três modelos proprietários —',
    desc_2: '— e roteia cada tarefa para o modelo mais adequado.',
    incoming: 'Entrada',
    completed: 'Concluído',
    tasks: [
      'Classificar ticket de entrada',
      'Resumir reunião do Zoom',
      'Extrair dados de fatura',
      'Redigir proposta estratégica',
      'Triagem da caixa de suporte',
      'Comparar contratos de fornecedores',
      'Gerar email de follow-up',
      'Realizar análise de mercado',
      'Redigir resposta ao cliente',
      'Localizar descrição de produto',
      'Traduzir strings de UI',
      'Refatorar código open-source',
    ],
  },
  ar: {
    eyebrow: 'توجيه النماذج',
    h2_plain: 'كل مهمة.',
    h2_em: 'النموذج الصحيح.',
    h2_end: 'تلقائياً.',
    desc_1: 'تشغّل Mindzy ثلاثة نماذج خاصة —',
    desc_2: '— وتوجّه كل مهمة إلى النموذج الأنسب.',
    incoming: 'وارد',
    completed: 'مكتمل',
    tasks: [
      'تصنيف التذكرة الواردة',
      'تلخيص اجتماع Zoom',
      'استخراج بيانات الفاتورة',
      'صياغة مقترح استراتيجي',
      'فرز صندوق بريد الدعم',
      'مقارنة عقود الموردين',
      'إنشاء بريد متابعة',
      'إجراء تحليل السوق',
      'صياغة رد على العميل',
      'ترجمة وصف المنتج',
      'ترجمة نصوص واجهة المستخدم',
      'إعادة هيكلة الكود مفتوح المصدر',
    ],
  },
  zh: {
    eyebrow: '模型路由',
    h2_plain: '每项任务。',
    h2_em: '正确的模型。',
    h2_end: '自动完成。',
    desc_1: 'Mindzy 运营三个专有模型——',
    desc_2: '——并将每项任务路由到最合适的模型。',
    incoming: '传入',
    completed: '已完成',
    tasks: [
      '分类传入工单',
      '总结 Zoom 会议',
      '提取发票数据',
      '起草战略提案',
      '分拣支持收件箱',
      '比较供应商合同',
      '生成跟进邮件',
      '进行市场分析',
      '起草客户回复',
      '本地化产品描述',
      '翻译 UI 字符串',
      '重构开源代码',
    ],
  },
  ja: {
    eyebrow: 'モデルルーティング',
    h2_plain: 'すべてのタスク。',
    h2_em: '最適なモデル。',
    h2_end: '自動で。',
    desc_1: 'Mindzy は3つの独自モデルを運用し—',
    desc_2: '——各タスクを最適なモデルにルーティングします。',
    incoming: '受信中',
    completed: '完了',
    tasks: [
      '受信チケットの分類',
      'Zoom ミーティングの要約',
      '請求書データの抽出',
      '戦略的提案の起草',
      'サポート受信トレイのトリアージ',
      'ベンダー契約の比較',
      'フォローアップメールの生成',
      '市場分析の実施',
      '顧客への返信起草',
      '製品説明のローカライズ',
      'UI 文字列の翻訳',
      'オープンソースコードのリファクタリング',
    ],
  },
  ru: {
    eyebrow: 'Маршрутизация моделей',
    h2_plain: 'Каждая задача.',
    h2_em: 'Правильная модель.',
    h2_end: 'Автоматически.',
    desc_1: 'Mindzy управляет тремя собственными моделями —',
    desc_2: '— и направляет каждую задачу к наиболее подходящей модели.',
    incoming: 'Входящие',
    completed: 'Выполнено',
    tasks: [
      'Классифицировать входящий тикет',
      'Резюмировать встречу в Zoom',
      'Извлечь данные из счёта',
      'Составить стратегическое предложение',
      'Сортировка поддержки',
      'Сравнить контракты поставщиков',
      'Сгенерировать письмо для follow-up',
      'Провести анализ рынка',
      'Написать ответ клиенту',
      'Локализовать описание продукта',
      'Перевести строки UI',
      'Рефакторинг открытого кода',
    ],
  },
}

const MODELS = [
  { id: 'mindfast', label: 'MindFast', proprietary: true },
  { id: 'minddeep', label: 'MindDeep', proprietary: true },
  { id: 'mind31',   label: 'Mind 3.1', proprietary: true },
  { id: 'claude',   label: 'Claude',   proprietary: false },
  { id: 'gpt',      label: 'GPT',      proprietary: false },
  { id: 'gemini',   label: 'Gemini',   proprietary: false },
  { id: 'mistral',  label: 'Mistral',  proprietary: false },
  { id: 'llama',    label: 'Llama',    proprietary: false },
]

const TASK_MODELS = [
  'mindfast', 'mind31', 'mindfast', 'minddeep', 'mindfast',
  'minddeep', 'mind31', 'claude', 'gpt', 'mistral', 'gemini', 'llama',
]

export function OrchestrationSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  const stageRef = useRef<HTMLDivElement>(null)
  const taskIdxRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    if (!stageRef.current) return
    const stage: HTMLDivElement = stageRef.current

    // Pause when off-screen
    const pauseObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { pausedRef.current = !e.isIntersecting })
      },
      { threshold: 0.05 }
    )
    pauseObs.observe(stage)

    const W = () => stage.clientWidth
    const H = () => stage.clientHeight

    // SVG overlay for route lines — created once, sits above everything
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgEl.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;'
    stage.appendChild(svgEl)

    // Place model nodes
    const nodeMap: Record<string, { el: HTMLElement; x: number; y: number }> = {}

    function placeModels() {
      Object.values(nodeMap).forEach(n => n.el.remove())
      Object.keys(nodeMap).forEach(k => delete nodeMap[k])
      const cx = W() / 2
      const cy = H() / 2
      const rx = Math.min(W(), H()) * 0.36
      const ry = Math.min(W(), H()) * 0.34
      MODELS.forEach((m, i) => {
        const a = (i / MODELS.length) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * rx
        const y = cy + Math.sin(a) * ry
        const el = document.createElement('button')
        el.type = 'button'
        el.textContent = m.label
        el.style.cssText = `position:absolute;transform:translate(-50%,-50%);border-radius:999px;padding:${
          m.proprietary ? '8px 14px' : '6px 10px'
        };font-size:11px;font-weight:${
          m.proprietary ? '600' : '500'
        };background:var(--ai-surface);border:1px solid ${
          m.proprietary
            ? 'color-mix(in srgb,var(--ai-accent) 40%,var(--ai-border))'
            : 'var(--ai-border)'
        };color:var(--ai-fg);left:${x}px;top:${y}px;cursor:default;transition:background 0.3s ease,border-color 0.3s ease,color 0.3s ease,box-shadow 0.3s ease;z-index:2;`
        if (m.proprietary) {
          el.style.boxShadow =
            'inset 0 0 0 1px color-mix(in srgb,var(--ai-accent) 12%,transparent)'
        }
        stage.appendChild(el)
        nodeMap[m.id] = { el, x, y }
      })
    }
    placeModels()

    // Queue column (left — Incoming)
    const queueHost = document.createElement('div')
    queueHost.style.cssText =
      'position:absolute;left:0;top:24px;bottom:24px;width:220px;display:flex;flex-direction:column;gap:8px;font-size:12px;color:var(--ai-fg-soft);padding:0 8px;z-index:4;overflow:hidden;'
    const qLabel = document.createElement('h5')
    qLabel.textContent = t.incoming
    qLabel.style.cssText =
      'font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ai-fg-soft);margin:0 0 6px;font-weight:500;flex-shrink:0;'
    queueHost.appendChild(qLabel)
    stage.appendChild(queueHost)

    // Done column (right — Completed)
    const doneHost = document.createElement('div')
    doneHost.style.cssText =
      'position:absolute;right:0;top:24px;bottom:24px;width:220px;display:flex;flex-direction:column;gap:8px;align-items:flex-end;font-size:12px;color:var(--ai-fg-soft);padding:0 8px;z-index:4;overflow:hidden;'
    const dLabel = document.createElement('h5')
    dLabel.textContent = t.completed
    dLabel.style.cssText =
      'font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ai-fg-soft);margin:0 0 6px;font-weight:500;flex-shrink:0;'
    doneHost.appendChild(dLabel)
    stage.appendChild(doneHost)

    function spawn() {
      if (pausedRef.current) return
      const idx = taskIdxRef.current % t.tasks.length
      const taskText = t.tasks[idx]
      const taskModelId = TASK_MODELS[taskIdxRef.current % TASK_MODELS.length]
      taskIdxRef.current++
      const model = nodeMap[taskModelId]
      if (!model) return

      // Add chip to queue column
      const qChip = document.createElement('div')
      qChip.textContent = taskText
      qChip.style.cssText =
        'background:var(--ai-bg-2);border:1px solid var(--ai-border);padding:8px 12px;border-radius:999px;font-size:12px;color:var(--ai-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;flex-shrink:0;'
      queueHost.appendChild(qChip)
      // Keep max 4 task chips (plus label = 5 children)
      while (queueHost.children.length > 5) {
        queueHost.children[1]?.remove()
      }

      // After a short hold, fly the chip to the model node
      setTimeout(() => {
        const qr = qChip.getBoundingClientRect()
        const sr = stage.getBoundingClientRect()
        const startX = qr.left - sr.left
        const startY = qr.top - sr.top
        qChip.remove()

        // Flying chip — starts at queue position, opacity 0
        const fly = document.createElement('div')
        fly.textContent = taskText
        fly.style.cssText = `position:absolute;left:${startX}px;top:${startY}px;opacity:0;background:var(--ai-surface);border:1px solid var(--ai-border);border-radius:999px;padding:8px 12px;font-size:12px;color:var(--ai-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;z-index:3;pointer-events:none;box-shadow:0 8px 24px -10px rgba(0,0,0,.2);`
        stage.appendChild(fly)

        // SVG route line from chip origin to model node
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        const cx = W() / 2
        const cy = H() / 2
        const d = `M ${startX + 60} ${startY + 14} Q ${cx} ${cy} ${model.x} ${model.y}`
        line.setAttribute('d', d)
        line.setAttribute('fill', 'none')
        line.setAttribute('stroke', 'var(--ai-accent)')
        line.setAttribute('stroke-width', '1')
        line.setAttribute('stroke-dasharray', '300')
        line.setAttribute('stroke-dashoffset', '300')
        line.setAttribute('opacity', '0.4')
        line.style.transition = 'stroke-dashoffset 1.05s ease-out, opacity 0.6s'
        svgEl.appendChild(line)

        // Trigger transitions on next frame
        requestAnimationFrame(() => {
          // Fly chip with spring easing + fade in
          fly.style.transition =
            'left 1.05s cubic-bezier(.34,1.56,.64,1), top 1.05s cubic-bezier(.34,1.56,.64,1), opacity 0.4s ease'
          fly.style.left = (model.x - 50) + 'px'
          fly.style.top = (model.y - 14) + 'px'
          fly.style.opacity = '1'

          // Draw the SVG route line
          line.setAttribute('stroke-dashoffset', '0')
        })

        // Model node receives chip — glow pulse
        setTimeout(() => {
          model.el.style.transition = 'all 0.3s ease'
          model.el.style.boxShadow =
            '0 0 0 6px color-mix(in srgb, var(--ai-accent) 20%, transparent)'
          model.el.style.background = 'var(--ai-accent)'
          model.el.style.color = '#fff'
          model.el.style.borderColor = 'var(--ai-accent)'

          // Fade glow back out after 1200ms
          setTimeout(() => {
            model.el.style.boxShadow = ''
            model.el.style.background = ''
            model.el.style.color = ''
            model.el.style.borderColor = ''
          }, 1200)
        }, 900)

        // Fade route line out after chip lands
        setTimeout(() => { line.style.opacity = '0' }, 1500)
        setTimeout(() => { line.remove() }, 2200)

        // Fade flying chip out
        setTimeout(() => {
          fly.style.transition = 'opacity 0.4s ease'
          fly.style.opacity = '0'
        }, 1600)

        // Remove fly chip and add to done column
        setTimeout(() => {
          fly.remove()
          const dChip = document.createElement('div')
          dChip.style.cssText =
            'background:var(--ai-bg-2);border:1px solid var(--ai-border);padding:8px 12px;border-radius:999px;font-size:12px;color:var(--ai-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;display:flex;align-items:center;flex-shrink:0;'
          const dot = document.createElement('span')
          dot.style.cssText =
            'width:6px;height:6px;border-radius:999px;background:var(--ai-accent);display:inline-block;margin-right:6px;flex-shrink:0;'
          const labelEl = document.createElement('span')
          labelEl.style.cssText =
            'overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;'
          labelEl.textContent = taskText
          const modelBadge = document.createElement('span')
          modelBadge.style.cssText =
            'color:var(--ai-fg-soft);font-size:10.5px;margin-left:6px;flex-shrink:0;'
          modelBadge.textContent =
            MODELS.find(m => m.id === taskModelId)?.label ?? ''
          dChip.appendChild(dot)
          dChip.appendChild(labelEl)
          dChip.appendChild(modelBadge)
          doneHost.appendChild(dChip)
          // Keep max 4 done chips (plus label = 5 children)
          while (doneHost.children.length > 5) {
            doneHost.children[1]?.remove()
          }
        }, 2500)
      }, 700)
    }

    spawn()
    const interval = setInterval(spawn, 2200)

    return () => {
      clearInterval(interval)
      pauseObs.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section className="py-16 md:py-[120px] border-t border-[var(--ai-border)]">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
        <div style={{ maxWidth: '740px', marginBottom: '56px' }}>
          <FadeIn>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ai-accent)',
              }}
            >
              {t.eyebrow}
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif-ai)',
                fontSize: 'clamp(34px,4.6vw,56px)',
                lineHeight: 1.08,
                marginTop: '14px',
              }}
            >
              {t.h2_plain} <em>{t.h2_em}</em> {t.h2_end}
            </h2>
            <p
              style={{
                marginTop: '24px',
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--ai-fg-muted)',
                maxWidth: '600px',
              }}
            >
              {t.desc_1}{' '}
              <strong>MindFast</strong>, <strong>MindDeep</strong>, and{' '}
              <strong>Mind 3.1</strong> {t.desc_2}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div style={{ overflowX: 'auto' }}>
          <div
            style={{
              borderRadius: '20px',
              background: 'var(--ai-surface)',
              border: '1px solid var(--ai-border)',
              padding: '32px',
              height: '560px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)',
              minWidth: '560px',
            }}
          >
            <div
              ref={stageRef}
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              {/* Radial glow behind central hub */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: '96px',
                  height: '96px',
                  borderRadius: '999px',
                  background:
                    'radial-gradient(circle, color-mix(in srgb,var(--ai-accent) 35%,transparent), transparent 70%)',
                  zIndex: 1,
                }}
              />
              {/* Central hub node */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '999px',
                  background: 'var(--ai-surface)',
                  border: '1px solid var(--ai-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <svg
                  viewBox="0 0 1008 874"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <g fill="var(--ai-accent)">
                    <path d="M505 0 L0 870 L653 260 Z" />
                    <path d="M683 311 L548 440 L1008 872 L747 421 L706 345 Z" />
                    <path d="M503 481 L644 615 L113 874 L79 874 Z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default OrchestrationSection
