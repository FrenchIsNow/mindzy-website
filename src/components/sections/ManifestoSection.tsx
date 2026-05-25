'use client'

import { usePathname } from 'next/navigation'
import { FadeIn } from '@/components/animations/FadeIn'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const TRANSLATIONS = {
  en: {
    eyebrow: 'What makes us different',
    h2line1: 'Most companies sell AI agents.',
    h2line2: 'We build AI infrastructure.',
    p1: 'An AI agent solves one task. An AI infrastructure runs your company. Mindzy designs the operating layer that connects every model, every tool, every department, and every workflow into a coherent system you actually control.',
    p2: 'Mindzy operates three proprietary models: <strong>MindFast</strong>, <strong>MindDeep</strong>, and <strong>Mind 3.1</strong>, and gives your teams access to every major model on the market: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen, and more. The right model for the right task, always.',
    nodes: {
      models: 'Models',
      tools: 'Tools',
      hierarchy: 'Hierarchy',
      security: 'Security',
      workflows: 'Workflows',
      governance: 'Governance',
    },
  },
  fr: {
    eyebrow: 'Ce qui nous distingue',
    h2line1: 'La plupart des entreprises vendent des agents IA.',
    h2line2: 'Nous construisons une infrastructure IA.',
    p1: 'Un agent IA résout une tâche. Une infrastructure IA fait tourner votre entreprise. Mindzy conçoit la couche opérationnelle qui connecte chaque modèle, chaque outil, chaque département et chaque flux de travail dans un système cohérent que vous contrôlez réellement.',
    p2: 'Mindzy opère trois modèles propriétaires : <strong>MindFast</strong>, <strong>MindDeep</strong> et <strong>Mind 3.1</strong>, et donne à vos équipes accès à tous les grands modèles du marché : OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen, et plus encore. Le bon modèle pour la bonne tâche, toujours.',
    nodes: {
      models: 'Modèles',
      tools: 'Outils',
      hierarchy: 'Hiérarchie',
      security: 'Sécurité',
      workflows: 'Workflows',
      governance: 'Gouvernance',
    },
  },
  es: {
    eyebrow: 'Lo que nos diferencia',
    h2line1: 'La mayoría de las empresas venden agentes de IA.',
    h2line2: 'Nosotros construimos infraestructura de IA.',
    p1: 'Un agente de IA resuelve una tarea. Una infraestructura de IA gestiona tu empresa. Mindzy diseña la capa operativa que conecta cada modelo, cada herramienta, cada departamento y cada flujo de trabajo en un sistema coherente que realmente controlas.',
    p2: 'Mindzy opera tres modelos propietarios: <strong>MindFast</strong>, <strong>MindDeep</strong> y <strong>Mind 3.1</strong>, y brinda a tus equipos acceso a todos los principales modelos del mercado: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen, y más. El modelo correcto para la tarea correcta, siempre.',
    nodes: {
      models: 'Modelos',
      tools: 'Herramientas',
      hierarchy: 'Jerarquía',
      security: 'Seguridad',
      workflows: 'Flujos',
      governance: 'Gobernanza',
    },
  },
  de: {
    eyebrow: 'Was uns unterscheidet',
    h2line1: 'Die meisten Unternehmen verkaufen KI-Agenten.',
    h2line2: 'Wir bauen KI-Infrastruktur.',
    p1: 'Ein KI-Agent löst eine Aufgabe. Eine KI-Infrastruktur führt Ihr Unternehmen. Mindzy entwirft die Betriebsschicht, die jedes Modell, jedes Tool, jede Abteilung und jeden Workflow in ein kohärentes System verbindet, das Sie wirklich kontrollieren.',
    p2: 'Mindzy betreibt drei proprietäre Modelle: <strong>MindFast</strong>, <strong>MindDeep</strong> und <strong>Mind 3.1</strong>, und gibt Ihren Teams Zugang zu allen wichtigen Modellen auf dem Markt: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen und mehr. Das richtige Modell für die richtige Aufgabe, immer.',
    nodes: {
      models: 'Modelle',
      tools: 'Tools',
      hierarchy: 'Hierarchie',
      security: 'Sicherheit',
      workflows: 'Workflows',
      governance: 'Governance',
    },
  },
  it: {
    eyebrow: 'Cosa ci distingue',
    h2line1: 'La maggior parte delle aziende vende agenti IA.',
    h2line2: 'Noi costruiamo infrastrutture IA.',
    p1: 'Un agente IA risolve un compito. Un\'infrastruttura IA gestisce la tua azienda. Mindzy progetta il livello operativo che connette ogni modello, ogni strumento, ogni reparto e ogni flusso di lavoro in un sistema coerente che controlli davvero.',
    p2: 'Mindzy opera tre modelli proprietari: <strong>MindFast</strong>, <strong>MindDeep</strong> e <strong>Mind 3.1</strong>, e dà ai tuoi team accesso a tutti i principali modelli sul mercato: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen e altri. Il modello giusto per il compito giusto, sempre.',
    nodes: {
      models: 'Modelli',
      tools: 'Strumenti',
      hierarchy: 'Gerarchia',
      security: 'Sicurezza',
      workflows: 'Flussi',
      governance: 'Governance',
    },
  },
  pt: {
    eyebrow: 'O que nos diferencia',
    h2line1: 'A maioria das empresas vende agentes de IA.',
    h2line2: 'Nós construímos infraestrutura de IA.',
    p1: 'Um agente de IA resolve uma tarefa. Uma infraestrutura de IA gerencia sua empresa. A Mindzy projeta a camada operacional que conecta cada modelo, cada ferramenta, cada departamento e cada fluxo de trabalho em um sistema coerente que você realmente controla.',
    p2: 'A Mindzy opera três modelos proprietários: <strong>MindFast</strong>, <strong>MindDeep</strong> e <strong>Mind 3.1</strong>, e dá às suas equipes acesso a todos os principais modelos do mercado: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen e mais. O modelo certo para a tarefa certa, sempre.',
    nodes: {
      models: 'Modelos',
      tools: 'Ferramentas',
      hierarchy: 'Hierarquia',
      security: 'Segurança',
      workflows: 'Fluxos',
      governance: 'Governança',
    },
  },
  ar: {
    eyebrow: 'ما يميزنا',
    h2line1: 'معظم الشركات تبيع وكلاء الذكاء الاصطناعي.',
    h2line2: 'نحن نبني بنية تحتية للذكاء الاصطناعي.',
    p1: 'وكيل الذكاء الاصطناعي يحل مهمة واحدة. البنية التحتية للذكاء الاصطناعي تدير شركتك. تصمم Mindzy الطبقة التشغيلية التي تربط كل نموذج وكل أداة وكل قسم وكل سير عمل في نظام متماسك تتحكم فيه فعلاً.',
    p2: 'تشغّل Mindzy ثلاثة نماذج خاصة: <strong>MindFast</strong> و<strong>MindDeep</strong> و<strong>Mind 3.1</strong>، وتمنح فرقك إمكانية الوصول إلى جميع النماذج الرئيسية في السوق: OpenAI وAnthropic وGoogle وMistral وMeta وxAI وDeepSeek وQwen والمزيد. النموذج المناسب للمهمة المناسبة، دائماً.',
    nodes: {
      models: 'النماذج',
      tools: 'الأدوات',
      hierarchy: 'التسلسل الهرمي',
      security: 'الأمان',
      workflows: 'سير العمل',
      governance: 'الحوكمة',
    },
  },
  zh: {
    eyebrow: '我们的与众不同之处',
    h2line1: '大多数公司销售 AI 代理。',
    h2line2: '我们构建 AI 基础设施。',
    p1: 'AI 代理解决一项任务。AI 基础设施运营您的公司。Mindzy 设计将每个模型、每个工具、每个部门和每个工作流程连接到您真正控制的连贯系统中的操作层。',
    p2: 'Mindzy 运营三个专有模型：<strong>MindFast</strong>、<strong>MindDeep</strong> 和 <strong>Mind 3.1</strong>，并让您的团队访问市场上所有主要模型：OpenAI、Anthropic、Google、Mistral、Meta、xAI、DeepSeek、Qwen 等。始终为正确的任务选择正确的模型。',
    nodes: {
      models: '模型',
      tools: '工具',
      hierarchy: '层级',
      security: '安全',
      workflows: '工作流',
      governance: '治理',
    },
  },
  ja: {
    eyebrow: '私たちの違い',
    h2line1: 'ほとんどの企業はAIエージェントを販売しています。',
    h2line2: '私たちはAIインフラを構築します。',
    p1: 'AIエージェントは一つのタスクを解決します。AIインフラはあなたの会社を動かします。Mindzyは、すべてのモデル、すべてのツール、すべての部門、すべてのワークフローを、あなたが実際にコントロールできる一貫したシステムに接続する運用レイヤーを設計します。',
    p2: 'Mindzyは3つの独自モデルを運用しています：<strong>MindFast</strong>、<strong>MindDeep</strong>、<strong>Mind 3.1</strong>。そして市場のすべての主要モデルへのアクセスを提供します：OpenAI、Anthropic、Google、Mistral、Meta、xAI、DeepSeek、Qwen など。常に適切なタスクに適切なモデルを。',
    nodes: {
      models: 'モデル',
      tools: 'ツール',
      hierarchy: '階層',
      security: 'セキュリティ',
      workflows: 'ワークフロー',
      governance: 'ガバナンス',
    },
  },
  ru: {
    eyebrow: 'Наше отличие',
    h2line1: 'Большинство компаний продают ИИ-агентов.',
    h2line2: 'Мы строим ИИ-инфраструктуру.',
    p1: 'ИИ-агент решает одну задачу. ИИ-инфраструктура управляет вашей компанией. Mindzy проектирует операционный слой, который соединяет каждую модель, каждый инструмент, каждый отдел и каждый рабочий процесс в единую систему, которую вы реально контролируете.',
    p2: 'Mindzy управляет тремя собственными моделями: <strong>MindFast</strong>, <strong>MindDeep</strong> и <strong>Mind 3.1</strong>, и предоставляет вашим командам доступ ко всем ведущим моделям на рынке: OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen и другим. Правильная модель для правильной задачи — всегда.',
    nodes: {
      models: 'Модели',
      tools: 'Инструменты',
      hierarchy: 'Иерархия',
      security: 'Безопасность',
      workflows: 'Процессы',
      governance: 'Управление',
    },
  },
}

export function ManifestoSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  const { ref, isIntersecting } = useIntersectionObserver<SVGSVGElement>({ threshold: 0.3 })

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <style>{`
.orbital-svg .arch__layer { opacity: 0; transform: translateY(12px); transition: opacity .8s ease-out, transform .8s ease-out; }
.orbital-svg.is-built .arch__layer { opacity: 1; transform: translateY(0); }
.orbital-svg .orbital__connectors line { stroke-dasharray: 220; stroke-dashoffset: 220; transition: stroke-dashoffset 1s ease-out; }
.orbital-svg.is-built .orbital__connectors line { stroke-dashoffset: 0; }
.orbital-svg .orbital__node { opacity: 0; transition: opacity 0.5s ease-out; }
.orbital-svg.is-built .orbital__node { opacity: 1; }
.orbital-svg.is-built .orbital__node:nth-child(1) { transition-delay: 0.2s; }
.orbital-svg.is-built .orbital__node:nth-child(2) { transition-delay: 0.35s; }
.orbital-svg.is-built .orbital__node:nth-child(3) { transition-delay: 0.5s; }
.orbital-svg.is-built .orbital__node:nth-child(4) { transition-delay: 0.65s; }
.orbital-svg.is-built .orbital__node:nth-child(5) { transition-delay: 0.8s; }
.orbital-svg.is-built .orbital__node:nth-child(6) { transition-delay: 0.95s; }
`}</style>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '80px', alignItems: 'center' }}
          className="grid-cols-1 md:[grid-template-columns:minmax(0,1.4fr)_minmax(0,1fr)]"
        >
          {/* Left column */}
          <FadeIn>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>{t.eyebrow}</div>
            <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(36px,5.2vw,64px)', lineHeight: 1.08, marginTop: '18px' }}>
              <em>{t.h2line1}</em><br />
              {t.h2line2}
            </h2>
            <p style={{ marginTop: '28px', fontSize: '19px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '60ch' }}>
              {t.p1}
            </p>
            <p
              style={{ marginTop: '28px', fontSize: '19px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '60ch' }}
              dangerouslySetInnerHTML={{ __html: t.p2 }}
            />
          </FadeIn>

          {/* Right column: orbital SVG */}
          <div>
            <svg
              ref={ref}
              className={`orbital-svg w-full aspect-square max-w-[420px] mx-auto${isIntersecting ? ' is-built' : ''}`}
              viewBox="-20 -20 400 400"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--ai-accent)" stopOpacity="0.16"/>
                  <stop offset="60%" stopColor="var(--ai-accent)" stopOpacity="0.04"/>
                  <stop offset="100%" stopColor="var(--ai-accent)" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="180" cy="180" r="170" fill="url(#orbGlow)"/>
              <circle cx="180" cy="180" r="120" fill="none" stroke="var(--ai-border)" strokeDasharray="2 6"/>
              <g className="orbital__connectors" stroke="var(--ai-accent)" strokeWidth="0.7">
                <line x1="180" y1="180" x2="180" y2="60"/>
                <line x1="180" y1="180" x2="284" y2="120"/>
                <line x1="180" y1="180" x2="284" y2="240"/>
                <line x1="180" y1="180" x2="180" y2="300"/>
                <line x1="180" y1="180" x2="76" y2="240"/>
                <line x1="180" y1="180" x2="76" y2="120"/>
              </g>
              <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--ai-fg)">
                <g className="orbital__node"><circle cx="180" cy="60" r="6" fill="var(--ai-accent)"/><text x="180" y="44" textAnchor="middle">{t.nodes.models}</text></g>
                <g className="orbital__node"><circle cx="284" cy="120" r="6" fill="var(--ai-accent)"/><text x="304" y="118" textAnchor="start">{t.nodes.tools}</text></g>
                <g className="orbital__node"><circle cx="284" cy="240" r="6" fill="var(--ai-accent)"/><text x="304" y="244" textAnchor="start">{t.nodes.hierarchy}</text></g>
                <g className="orbital__node"><circle cx="180" cy="300" r="6" fill="var(--ai-accent)"/><text x="180" y="320" textAnchor="middle">{t.nodes.security}</text></g>
                <g className="orbital__node"><circle cx="76" cy="240" r="6" fill="var(--ai-accent)"/><text x="56" y="244" textAnchor="end">{t.nodes.workflows}</text></g>
                <g className="orbital__node"><circle cx="76" cy="120" r="6" fill="var(--ai-accent)"/><text x="56" y="118" textAnchor="end">{t.nodes.governance}</text></g>
              </g>
              <circle cx="180" cy="180" r="42" fill="var(--ai-surface)" stroke="var(--ai-border-strong)"/>
              <text x="180" y="184" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--ai-accent)">Mindzy</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManifestoSection
