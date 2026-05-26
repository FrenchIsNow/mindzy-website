'use client'

import { usePathname } from 'next/navigation'
import { FadeIn } from '@/components/animations/FadeIn'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const TRANSLATIONS = {
  en: {
    eyebrow: 'Architecture',
    h2_plain: 'Built progressively.',
    h2_em: 'Deployed safely.',
    h2_end: 'Adapted entirely.',
    desc: 'The Mindzy infrastructure assembles layer by layer — wrapping your tools, your models, and your governance into a single custom system.',
    caption: 'Every layer is custom-built for the client. No two Mindzy infrastructures are identical.',
    layers: {
      l5Label: 'MINDZY AI INFRASTRUCTURE',
      l4Label: 'GOVERNANCE · PERMISSIONS · VALIDATION · AUDIT',
      l4Tags: ['Validation rules', 'Audit log', 'Role hierarchy', 'Approvals'],
      l3Label: 'MODEL ORCHESTRATION',
      l2Label: 'MINDZY CONNECTORS',
      l1Label: 'YOUR COMPANY · TOOLS & SYSTEMS',
      l1Tools: ['CRM', 'Email + Calendar', 'Drive · Notion', 'ERP · Finance', 'Slack · Teams', 'Legacy · No-API'],
    },
  },
  fr: {
    eyebrow: 'Architecture',
    h2_plain: 'Construit progressivement.',
    h2_em: 'Déployé en toute sécurité.',
    h2_end: 'Adapté entièrement.',
    desc: "L'infrastructure Mindzy s'assemble couche par couche — intégrant vos outils, vos modèles et votre gouvernance dans un système unique sur mesure.",
    caption: 'Chaque couche est construite sur mesure pour le client. Deux infrastructures Mindzy ne sont jamais identiques.',
    layers: {
      l5Label: 'INFRASTRUCTURE IA MINDZY',
      l4Label: 'GOUVERNANCE · PERMISSIONS · VALIDATION · AUDIT',
      l4Tags: ['Règles de validation', "Journal d'audit", 'Hiérarchie des rôles', 'Approbations'],
      l3Label: 'ORCHESTRATION DES MODÈLES',
      l2Label: 'CONNECTEURS MINDZY',
      l1Label: 'VOTRE ENTREPRISE · OUTILS & SYSTÈMES',
      l1Tools: ['CRM', 'Email + Calendrier', 'Drive · Notion', 'ERP · Finance', 'Slack · Teams', 'Héritage · Sans-API'],
    },
  },
  es: {
    eyebrow: 'Arquitectura',
    h2_plain: 'Construido progresivamente.',
    h2_em: 'Desplegado con seguridad.',
    h2_end: 'Adaptado completamente.',
    desc: 'La infraestructura Mindzy se ensambla capa por capa — integrando tus herramientas, tus modelos y tu gobernanza en un sistema personalizado único.',
    caption: 'Cada capa está construida a medida para el cliente. No hay dos infraestructuras Mindzy idénticas.',
    layers: {
      l5Label: 'INFRAESTRUCTURA IA MINDZY',
      l4Label: 'GOBERNANZA · PERMISOS · VALIDACIÓN · AUDITORÍA',
      l4Tags: ['Reglas de validación', 'Registro de auditoría', 'Jerarquía de roles', 'Aprobaciones'],
      l3Label: 'ORQUESTACIÓN DE MODELOS',
      l2Label: 'CONECTORES MINDZY',
      l1Label: 'TU EMPRESA · HERRAMIENTAS Y SISTEMAS',
      l1Tools: ['CRM', 'Email + Calendario', 'Drive · Notion', 'ERP · Finanzas', 'Slack · Teams', 'Legado · Sin-API'],
    },
  },
  de: {
    eyebrow: 'Architektur',
    h2_plain: 'Schrittweise aufgebaut.',
    h2_em: 'Sicher bereitgestellt.',
    h2_end: 'Vollständig angepasst.',
    desc: 'Die Mindzy-Infrastruktur fügt sich Schicht für Schicht zusammen — und integriert Ihre Tools, Modelle und Governance in ein einziges maßgeschneidertes System.',
    caption: 'Jede Schicht wird individuell für den Kunden entwickelt. Keine zwei Mindzy-Infrastrukturen sind identisch.',
    layers: {
      l5Label: 'MINDZY KI-INFRASTRUKTUR',
      l4Label: 'GOVERNANCE · BERECHTIGUNGEN · VALIDIERUNG · AUDIT',
      l4Tags: ['Validierungsregeln', 'Prüfprotokoll', 'Rollenhierarchie', 'Genehmigungen'],
      l3Label: 'MODELL-ORCHESTRIERUNG',
      l2Label: 'MINDZY-KONNEKTOREN',
      l1Label: 'IHR UNTERNEHMEN · TOOLS & SYSTEME',
      l1Tools: ['CRM', 'E-Mail + Kalender', 'Drive · Notion', 'ERP · Finanzen', 'Slack · Teams', 'Legacy · Ohne-API'],
    },
  },
  it: {
    eyebrow: 'Architettura',
    h2_plain: 'Costruito progressivamente.',
    h2_em: 'Distribuito in sicurezza.',
    h2_end: 'Adattato interamente.',
    desc: "L'infrastruttura Mindzy si assembla strato per strato — integrando i tuoi strumenti, i tuoi modelli e la tua governance in un unico sistema personalizzato.",
    caption: 'Ogni strato è costruito su misura per il cliente. Nessuna infrastruttura Mindzy è identica a un\'altra.',
    layers: {
      l5Label: 'INFRASTRUTTURA AI MINDZY',
      l4Label: 'GOVERNANCE · PERMESSI · VALIDAZIONE · AUDIT',
      l4Tags: ['Regole di validazione', 'Registro audit', 'Gerarchia dei ruoli', 'Approvazioni'],
      l3Label: 'ORCHESTRAZIONE DEI MODELLI',
      l2Label: 'CONNETTORI MINDZY',
      l1Label: 'LA TUA AZIENDA · STRUMENTI E SISTEMI',
      l1Tools: ['CRM', 'Email + Calendario', 'Drive · Notion', 'ERP · Finanza', 'Slack · Teams', 'Legacy · Senza-API'],
    },
  },
  pt: {
    eyebrow: 'Arquitetura',
    h2_plain: 'Construído progressivamente.',
    h2_em: 'Implantado com segurança.',
    h2_end: 'Adaptado inteiramente.',
    desc: 'A infraestrutura Mindzy se monta camada por camada — integrando suas ferramentas, modelos e governança em um único sistema personalizado.',
    caption: 'Cada camada é construída sob medida para o cliente. Nenhuma infraestrutura Mindzy é idêntica a outra.',
    layers: {
      l5Label: 'INFRAESTRUTURA IA MINDZY',
      l4Label: 'GOVERNANÇA · PERMISSÕES · VALIDAÇÃO · AUDITORIA',
      l4Tags: ['Regras de validação', 'Registro de auditoria', 'Hierarquia de funções', 'Aprovações'],
      l3Label: 'ORQUESTRAÇÃO DE MODELOS',
      l2Label: 'CONECTORES MINDZY',
      l1Label: 'SUA EMPRESA · FERRAMENTAS E SISTEMAS',
      l1Tools: ['CRM', 'Email + Calendário', 'Drive · Notion', 'ERP · Finanças', 'Slack · Teams', 'Legado · Sem-API'],
    },
  },
  ar: {
    eyebrow: 'البنية التحتية',
    h2_plain: 'مبني تدريجياً.',
    h2_em: 'منشور بأمان.',
    h2_end: 'متكيف بالكامل.',
    desc: 'تتجمع بنية Mindzy التحتية طبقة تلو طبقة — لتدمج أدواتك ونماذجك وحوكمتك في نظام مخصص واحد.',
    caption: 'كل طبقة مبنية على مقاس العميل. لا توجد بنيتان Mindzy متطابقتان.',
    layers: {
      l5Label: 'بنية Mindzy الذكاء الاصطناعي',
      l4Label: 'الحوكمة · الصلاحيات · التحقق · المراجعة',
      l4Tags: ['قواعد التحقق', 'سجل المراجعة', 'التسلسل الهرمي', 'الموافقات'],
      l3Label: 'تنسيق النماذج',
      l2Label: 'موصلات Mindzy',
      l1Label: 'شركتك · الأدوات والأنظمة',
      l1Tools: ['CRM', 'البريد + التقويم', 'Drive · Notion', 'ERP · المالية', 'Slack · Teams', 'القديم · بدون-API'],
    },
  },
  zh: {
    eyebrow: '架构',
    h2_plain: '逐步构建。',
    h2_em: '安全部署。',
    h2_end: '完全适配。',
    desc: 'Mindzy 基础设施逐层组装——将您的工具、模型和治理整合进一个单一的定制系统。',
    caption: '每一层都为客户量身定制。没有两套 Mindzy 基础设施是相同的。',
    layers: {
      l5Label: 'MINDZY AI 基础设施',
      l4Label: '治理 · 权限 · 验证 · 审计',
      l4Tags: ['验证规则', '审计日志', '角色层级', '审批'],
      l3Label: '模型编排',
      l2Label: 'MINDZY 连接器',
      l1Label: '您的企业 · 工具与系统',
      l1Tools: ['CRM', '邮件 + 日历', 'Drive · Notion', 'ERP · 财务', 'Slack · Teams', '遗留 · 无-API'],
    },
  },
  ja: {
    eyebrow: 'アーキテクチャ',
    h2_plain: '段階的に構築。',
    h2_em: '安全にデプロイ。',
    h2_end: '完全に適応。',
    desc: 'Mindzy のインフラはレイヤーごとに組み上げられ、ツール、モデル、ガバナンスを単一のカスタムシステムに統合します。',
    caption: 'すべてのレイヤーはクライアント向けにカスタム構築されています。同じ Mindzy インフラは存在しません。',
    layers: {
      l5Label: 'MINDZY AI インフラ',
      l4Label: 'ガバナンス · 権限 · 検証 · 監査',
      l4Tags: ['検証ルール', '監査ログ', 'ロール階層', '承認'],
      l3Label: 'モデルオーケストレーション',
      l2Label: 'MINDZY コネクター',
      l1Label: '貴社 · ツールとシステム',
      l1Tools: ['CRM', 'メール + カレンダー', 'Drive · Notion', 'ERP · 財務', 'Slack · Teams', 'レガシー · API なし'],
    },
  },
  ru: {
    eyebrow: 'Архитектура',
    h2_plain: 'Построено постепенно.',
    h2_em: 'Развёрнуто безопасно.',
    h2_end: 'Адаптировано полностью.',
    desc: 'Инфраструктура Mindzy собирается слой за слоем — объединяя ваши инструменты, модели и систему управления в единую настроенную систему.',
    caption: 'Каждый слой создаётся под конкретного клиента. Никакие две инфраструктуры Mindzy не идентичны.',
    layers: {
      l5Label: 'ИНФРАСТРУКТУРА MINDZY ИИ',
      l4Label: 'УПРАВЛЕНИЕ · ПРАВА · ВАЛИДАЦИЯ · АУДИТ',
      l4Tags: ['Правила валидации', 'Журнал аудита', 'Иерархия ролей', 'Одобрения'],
      l3Label: 'ОРКЕСТРАЦИЯ МОДЕЛЕЙ',
      l2Label: 'КОННЕКТОРЫ MINDZY',
      l1Label: 'ВАША КОМПАНИЯ · ИНСТРУМЕНТЫ И СИСТЕМЫ',
      l1Tools: ['CRM', 'Почта + Календарь', 'Drive · Notion', 'ERP · Финансы', 'Slack · Teams', 'Устаревшие · Без-API'],
    },
  },
}

const archStyles = `
.arch-diagram .arch__layer { opacity: 0; transform: translateY(12px); transition: opacity .8s ease-out, transform .8s ease-out; }
.arch-diagram.is-built .arch__layer { opacity: 1; transform: translateY(0); }
.arch-diagram.is-built .arch__layer.l1 { transition-delay: 0ms; }
.arch-diagram.is-built .arch__layer.l2 { transition-delay: 120ms; }
.arch-diagram.is-built .arch__layer.l3 { transition-delay: 240ms; }
.arch-diagram.is-built .arch__layer.l4 { transition-delay: 360ms; }
.arch-diagram.is-built .arch__layer.l5 { transition-delay: 480ms; }
.arch-diagram .connector { stroke-dasharray: 220; stroke-dashoffset: 220; transition: stroke-dashoffset 1s ease-out; }
.arch-diagram.is-built .connector { stroke-dashoffset: 0; }
`

export function ArchitectureSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.25 })

  const l = t.layers

  return (
    <section className="py-16 md:py-[120px] border-t border-[var(--ai-border)]">
      <style>{archStyles}</style>
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
        <FadeIn>
          <div style={{ maxWidth: '740px', marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>{t.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1.08, marginTop: '14px' }}>
            {t.h2_plain} <em>{t.h2_em}</em> {t.h2_end}
          </h2>
          <p style={{ marginTop: '24px', fontSize: '18px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '600px' }}>
            {t.desc}
          </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div
            ref={ref}
            className={`arch-diagram${isIntersecting ? ' is-built' : ''}`}
            style={{ borderRadius: '20px', background: 'var(--ai-surface)', border: '1px solid var(--ai-border)', boxShadow: '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)', padding: 'clamp(20px,4vw,56px) clamp(16px,4vw,40px)' }}
          >
            <svg viewBox="0 0 1080 480" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--ai-grid-line, rgba(10,14,26,0.06))" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="1080" height="480" fill="url(#archGrid)"/>

              {/* Layer 5: Mindzy AI Infrastructure wrap */}
              <g className="arch__layer l5">
                <rect x="40" y="30" width="1000" height="420" rx="18" fill="none" stroke="var(--ai-accent)" strokeWidth="1.4" strokeDasharray="6 6"/>
                <rect x="60" y="14" width="240" height="32" rx="16" fill="var(--ai-accent)"/>
                <text x="180" y="35" textAnchor="middle" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="600" fill="#fff">{l.l5Label}</text>
              </g>

              {/* Layer 4: Governance */}
              <g className="arch__layer l4">
                <rect x="80" y="70" width="920" height="56" rx="12" fill="var(--ai-bg-3)" stroke="var(--ai-border)"/>
                <text x="100" y="103" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">{l.l4Label}</text>
                <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fill="var(--ai-fg)">
                  <rect x="500" y="86" width="120" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="560" y="102" textAnchor="middle">{l.l4Tags[0]}</text>
                  <rect x="632" y="86" width="100" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="682" y="102" textAnchor="middle">{l.l4Tags[1]}</text>
                  <rect x="744" y="86" width="120" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="804" y="102" textAnchor="middle">{l.l4Tags[2]}</text>
                  <rect x="876" y="86" width="100" height="24" rx="6" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="926" y="102" textAnchor="middle">{l.l4Tags[3]}</text>
                </g>
              </g>

              {/* Layer 3: Model orchestration */}
              <g className="arch__layer l3">
                <rect x="80" y="140" width="920" height="78" rx="12" fill="var(--ai-bg-3)" stroke="var(--ai-border)"/>
                <text x="100" y="172" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">{l.l3Label}</text>
                <g fontFamily="Instrument Sans, sans-serif" fontSize="11" fontWeight="500">
                  <g><rect x="240" y="180" width="80" height="26" rx="13" fill="var(--ai-accent)"/><text x="280" y="197" textAnchor="middle" fill="#fff">MindFast</text></g>
                  <g><rect x="328" y="180" width="86" height="26" rx="13" fill="var(--ai-accent)"/><text x="371" y="197" textAnchor="middle" fill="#fff">MindDeep</text></g>
                  <g><rect x="422" y="180" width="76" height="26" rx="13" fill="var(--ai-accent)"/><text x="460" y="197" textAnchor="middle" fill="#fff">Mind 3.1</text></g>
                  <g><rect x="514" y="180" width="56" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="542" y="197" textAnchor="middle" fill="var(--ai-fg)">GPT</text></g>
                  <g><rect x="578" y="180" width="64" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="610" y="197" textAnchor="middle" fill="var(--ai-fg)">Claude</text></g>
                  <g><rect x="650" y="180" width="64" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="682" y="197" textAnchor="middle" fill="var(--ai-fg)">Gemini</text></g>
                  <g><rect x="722" y="180" width="64" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="754" y="197" textAnchor="middle" fill="var(--ai-fg)">Mistral</text></g>
                  <g><rect x="794" y="180" width="56" height="26" rx="13" fill="var(--ai-surface)" stroke="var(--ai-border)"/><text x="822" y="197" textAnchor="middle" fill="var(--ai-fg)">Llama</text></g>
                </g>
              </g>

              {/* Layer 2: Connectors */}
              <g className="arch__layer l2">
                <rect x="80" y="232" width="920" height="56" rx="12" fill="var(--ai-bg-3)" stroke="var(--ai-border)"/>
                <text x="100" y="266" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">{l.l2Label}</text>
                <g fontFamily="ui-monospace,monospace" fontSize="10.5" fill="var(--ai-fg-muted)">
                  <text x="290" y="266">API</text><text x="330" y="266">Webhook</text><text x="400" y="266">RPA</text><text x="440" y="266">Browser</text><text x="510" y="266">SDK</text><text x="550" y="266">Email-bridge</text><text x="650" y="266">CSV-stream</text><text x="740" y="266">DB-tap</text><text x="810" y="266">Custom</text>
                </g>
              </g>
              <g className="arch__layer l2" fill="none" stroke="var(--ai-accent)" strokeWidth="0.8" opacity="0.45">
                <path className="connector" d="M180 288 L180 318"/>
                <path className="connector" d="M340 288 L340 318"/>
                <path className="connector" d="M500 288 L500 318"/>
                <path className="connector" d="M660 288 L660 318"/>
                <path className="connector" d="M820 288 L820 318"/>
              </g>

              {/* Layer 1: Client tools */}
              <g className="arch__layer l1">
                <rect x="80" y="318" width="920" height="118" rx="12" fill="var(--ai-surface)" stroke="var(--ai-border)"/>
                <text x="100" y="346" fontFamily="Instrument Sans, sans-serif" fontSize="12" fontWeight="500" fill="var(--ai-fg-muted)">{l.l1Label}</text>
                <g fontFamily="Instrument Sans, sans-serif" fontSize="11.5" fill="var(--ai-fg)">
                  <g><rect x="120" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="180" y="395" textAnchor="middle">{l.l1Tools[0]}</text></g>
                  <g><rect x="260" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="320" y="395" textAnchor="middle">{l.l1Tools[1]}</text></g>
                  <g><rect x="400" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="460" y="395" textAnchor="middle">{l.l1Tools[2]}</text></g>
                  <g><rect x="540" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="600" y="395" textAnchor="middle">{l.l1Tools[3]}</text></g>
                  <g><rect x="680" y="360" width="120" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="740" y="395" textAnchor="middle">{l.l1Tools[4]}</text></g>
                  <g><rect x="820" y="360" width="140" height="60" rx="10" fill="var(--ai-bg-3)"/><text x="890" y="395" textAnchor="middle">{l.l1Tools[5]}</text></g>
                </g>
              </g>
            </svg>
            <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--ai-fg-soft)', textAlign: 'center', fontStyle: 'italic' }}>
              {t.caption}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default ArchitectureSection
