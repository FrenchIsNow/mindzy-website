'use client'

import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'

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

const TASKS = [
  { text: 'Classify incoming ticket',     model: 'mindfast' },
  { text: 'Summarize Zoom meeting',       model: 'mind31' },
  { text: 'Extract invoice data',         model: 'mindfast' },
  { text: 'Draft strategic proposal',     model: 'minddeep' },
  { text: 'Triage support inbox',         model: 'mindfast' },
  { text: 'Compare vendor contracts',     model: 'minddeep' },
  { text: 'Generate follow-up email',     model: 'mind31' },
  { text: 'Run market analysis',          model: 'claude' },
  { text: 'Draft customer reply',         model: 'gpt' },
  { text: 'Localize product description', model: 'mistral' },
  { text: 'Translate UI strings',         model: 'gemini' },
  { text: 'Open-source code refactor',    model: 'llama' },
]

export function OrchestrationSection() {
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
        el.style.cssText = `position:absolute;transform:translate(-50%,-50%);border-radius:999px;padding:${m.proprietary ? '8px 14px' : '6px 10px'};font-size:11px;font-weight:${m.proprietary ? '600' : '500'};background:var(--ai-surface);border:1px solid ${m.proprietary ? 'color-mix(in srgb,var(--ai-accent) 40%,var(--ai-border))' : 'var(--ai-border)'};color:var(--ai-fg);left:${x}px;top:${y}px;cursor:default;transition:background 0.2s,border-color 0.2s,color 0.2s,box-shadow 0.2s;`
        if (m.proprietary) {
          el.style.boxShadow = 'inset 0 0 0 1px color-mix(in srgb,var(--ai-accent) 12%,transparent)'
        }
        stage.appendChild(el)
        nodeMap[m.id] = { el, x, y }
      })
    }
    placeModels()

    // Queue host
    const queueHost = document.createElement('div')
    queueHost.style.cssText = 'position:absolute;left:0;top:24px;bottom:24px;width:220px;display:flex;flex-direction:column;gap:8px;font-size:12px;color:var(--ai-fg-soft);padding:0 8px;'
    const qLabel = document.createElement('h5')
    qLabel.textContent = 'Incoming'
    qLabel.style.cssText = 'font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ai-fg-soft);margin:0 0 6px;font-weight:500;'
    queueHost.appendChild(qLabel)
    stage.appendChild(queueHost)

    // Done host
    const doneHost = document.createElement('div')
    doneHost.style.cssText = 'position:absolute;right:0;top:24px;bottom:24px;width:220px;display:flex;flex-direction:column;gap:8px;align-items:flex-end;font-size:12px;color:var(--ai-fg-soft);padding:0 8px;'
    const dLabel = document.createElement('h5')
    dLabel.textContent = 'Completed'
    dLabel.style.cssText = 'font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ai-fg-soft);margin:0 0 6px;font-weight:500;'
    doneHost.appendChild(dLabel)
    stage.appendChild(doneHost)

    function spawn() {
      if (pausedRef.current) return
      const task = TASKS[taskIdxRef.current % TASKS.length]
      taskIdxRef.current++
      const model = nodeMap[task.model]
      if (!model) return

      // Create queue chip
      const qChip = document.createElement('div')
      qChip.textContent = task.text
      qChip.style.cssText = 'background:var(--ai-bg-2);border:1px solid var(--ai-border);padding:8px 12px;border-radius:999px;font-size:12px;color:var(--ai-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;'
      queueHost.appendChild(qChip)
      while (queueHost.children.length > 5) {
        queueHost.children[1]?.remove()
      }

      setTimeout(() => {
        const qr = qChip.getBoundingClientRect()
        const sr = stage.getBoundingClientRect()
        const startX = qr.left - sr.left
        const startY = qr.top - sr.top
        qChip.remove()

        const fly = document.createElement('div')
        fly.textContent = task.text
        fly.style.cssText = `position:absolute;left:${startX}px;top:${startY}px;background:var(--ai-surface);border:1px solid var(--ai-border);border-radius:999px;padding:8px 12px;font-size:12px;color:var(--ai-fg);white-space:nowrap;z-index:3;pointer-events:none;box-shadow:0 8px 24px -10px rgba(0,0,0,.2);transition:left 1.05s cubic-bezier(.34,1.56,.64,1),top 1.05s cubic-bezier(.34,1.56,.64,1),opacity .4s;`
        stage.appendChild(fly)

        requestAnimationFrame(() => {
          fly.style.left = (model.x - 50) + 'px'
          fly.style.top = (model.y - 14) + 'px'
        })

        setTimeout(() => {
          model.el.style.background = 'var(--ai-accent)'
          model.el.style.color = '#fff'
          model.el.style.borderColor = 'var(--ai-accent)'
        }, 900)

        setTimeout(() => {
          model.el.style.background = ''
          model.el.style.color = ''
          model.el.style.borderColor = ''
          fly.style.opacity = '0'
        }, 1600)

        setTimeout(() => {
          fly.remove()
          const dChip = document.createElement('div')
          dChip.innerHTML = `<span style="width:6px;height:6px;border-radius:999px;background:var(--ai-accent);display:inline-block;margin-right:6px;flex-shrink:0;"></span>${task.text}<span style="color:var(--ai-fg-soft);font-size:10.5px;margin-left:6px;">${MODELS.find(m => m.id === task.model)?.label ?? ''}</span>`
          dChip.style.cssText = 'background:var(--ai-bg-2);border:1px solid var(--ai-border);padding:8px 12px;border-radius:999px;font-size:12px;color:var(--ai-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;display:flex;align-items:center;'
          doneHost.appendChild(dChip)
          while (doneHost.children.length > 5) {
            doneHost.children[1]?.remove()
          }
        }, 2500)
      }, 700)
    }

    spawn()
    const interval = setInterval(spawn, 1600)

    return () => {
      clearInterval(interval)
      pauseObs.disconnect()
    }
  }, [])

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <div className="w-full max-w-[1200px] mx-auto px-8">
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
              Model routing
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif-ai)',
                fontSize: 'clamp(34px,4.6vw,56px)',
                lineHeight: 1.08,
                marginTop: '14px',
              }}
            >
              Every task. <em>The right model.</em> Automatically.
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
              Mindzy operates three proprietary models —{' '}
              <strong>MindFast</strong>, <strong>MindDeep</strong>, and{' '}
              <strong>Mind 3.1</strong> — and routes each task to the best-fit
              model.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div
            style={{
              borderRadius: '20px',
              background: 'var(--ai-surface)',
              border: '1px solid var(--ai-border)',
              padding: '32px',
              height: '560px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow:
                '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)',
            }}
          >
            <div
              ref={stageRef}
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              {/* Radial glow */}
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
              {/* Central core */}
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
        </FadeIn>
      </div>
    </section>
  )
}

export default OrchestrationSection
