import { FadeIn } from '@/components/animations/FadeIn'

const TRANSLATIONS = {
  en: {
    eyebrow: 'Our approach',
    headline2: 'We build it around your company.',
    description: 'Every Mindzy engagement starts with a structured executive diagnosis of your business. We map your departments, your tools, your workflows, your bottlenecks, and your priorities, before any technology is proposed.',
    cta: 'See our 10-step process',
  },
  fr: {
    eyebrow: 'Notre approche',
    headline2: 'Nous la construisons autour de votre entreprise.',
    description: 'Chaque engagement Mindzy commence par un diagnostic exécutif structuré de votre activité. Nous cartographions vos départements, vos outils, vos flux de travail, vos goulots d\'étranglement et vos priorités, avant de proposer la moindre technologie.',
    cta: 'Voir notre processus en 10 étapes',
  },
  es: {
    eyebrow: 'Nuestro enfoque',
    headline2: 'La construimos alrededor de tu empresa.',
    description: 'Cada compromiso de Mindzy comienza con un diagnóstico ejecutivo estructurado de tu negocio. Mapeamos tus departamentos, tus herramientas, tus flujos de trabajo, tus cuellos de botella y tus prioridades, antes de proponer cualquier tecnología.',
    cta: 'Ver nuestro proceso de 10 pasos',
  },
  de: {
    eyebrow: 'Unser Ansatz',
    headline2: 'Wir bauen sie rund um Ihr Unternehmen.',
    description: 'Jedes Mindzy-Engagement beginnt mit einer strukturierten Unternehmensdiagnose. Wir kartieren Ihre Abteilungen, Ihre Tools, Ihre Arbeitsabläufe, Ihre Engpässe und Ihre Prioritäten, bevor eine Technologie vorgeschlagen wird.',
    cta: 'Unseren 10-Schritte-Prozess ansehen',
  },
  it: {
    eyebrow: 'Il nostro approccio',
    headline2: 'Le costruiamo intorno alla tua azienda.',
    description: 'Ogni impegno di Mindzy inizia con una diagnosi esecutiva strutturata della tua attività. Mappiamo i tuoi reparti, i tuoi strumenti, i tuoi flussi di lavoro, i tuoi colli di bottiglia e le tue priorità, prima di proporre qualsiasi tecnologia.',
    cta: 'Vedi il nostro processo in 10 fasi',
  },
  pt: {
    eyebrow: 'Nossa abordagem',
    headline2: 'Nós a construímos em torno da sua empresa.',
    description: 'Cada compromisso da Mindzy começa com um diagnóstico executivo estruturado do seu negócio. Mapeamos seus departamentos, ferramentas, fluxos de trabalho, gargalos e prioridades, antes de qualquer tecnologia ser proposta.',
    cta: 'Ver nosso processo de 10 etapas',
  },
  ar: {
    eyebrow: 'نهجنا',
    headline2: 'نحن نبنيها حول شركتك.',
    description: 'تبدأ كل مشاركة في Mindzy بتشخيص تنفيذي منظم لعملك. نرسم خريطة أقسامك وأدواتك وسير عملك واختناقاتك وأولوياتك، قبل اقتراح أي تقنية.',
    cta: 'اطلع على عمليتنا المكونة من 10 خطوات',
  },
  zh: {
    eyebrow: '我们的方法',
    headline2: '我们围绕您的公司构建它。',
    description: '每次与 Mindzy 的合作都从对您业务的结构化高管诊断开始。在提出任何技术方案之前，我们会全面了解您的部门、工具、工作流程、瓶颈和优先事项。',
    cta: '查看我们的 10 步流程',
  },
  ja: {
    eyebrow: '私たちのアプローチ',
    headline2: 'あなたの企業に合わせて構築します。',
    description: 'Mindzyの各エンゲージメントは、あなたのビジネスの構造化されたエグゼクティブ診断から始まります。技術を提案する前に、部門、ツール、ワークフロー、ボトルネック、優先事項をすべてマッピングします。',
    cta: '10ステップのプロセスを見る',
  },
  ru: {
    eyebrow: 'Наш подход',
    headline2: 'Мы строим её вокруг вашей компании.',
    description: 'Каждое взаимодействие с Mindzy начинается со структурированной диагностики вашего бизнеса на уровне руководства. Мы картируем ваши подразделения, инструменты, рабочие процессы, узкие места и приоритеты — до того, как будет предложена какая-либо технология.',
    cta: 'Ознакомиться с нашим 10-шаговым процессом',
  },
}

export function CustomDesignSection({ locale = 'en' }: { locale?: string }) {
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <section style={{ padding: '120px 0' }}>
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <FadeIn className="max-w-[920px] mx-auto text-center">
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>
            {t.eyebrow}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif-ai)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.32,
            margin: '18px auto 0',
            maxWidth: '18ch',
          }}>
            {t.headline2}
          </h2>
          <div style={{ margin: '48px auto 0', maxWidth: '720px', textAlign: 'left' }}>
            <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'var(--ai-fg-muted)' }}>
              {t.description}
            </p>
          </div>
          <a
            href={`/${locale}/process`}
            style={{
              marginTop: '48px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '15px', color: 'var(--ai-fg)',
              borderBottom: '1px solid var(--ai-border-strong)', paddingBottom: '4px',
            }}
            className="hover:text-[var(--ai-accent)] hover:border-[var(--ai-accent)] transition-colors group"
          >
            {t.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

export default CustomDesignSection
