'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { FadeIn } from '@/components/animations/FadeIn'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const TRANSLATIONS = {
  en: {
    eyebrow: 'Command center',
    h2_1: 'Command center',
    h2_2: 'built around your hierarchy.',
    desc: "Every Mindzy dashboard is custom-designed for the client's departments, roles, and validation rules.",
    topBarSub: 'Example view — anonymized client setup',
    departments: 'Departments',
    deptList: ['Sales', 'Operations', 'Support', 'Administration', 'Management'],
    today: 'Today',
    workflowsInProgress: '~40–60 workflows in progress',
    awaitingValidation: '8 awaiting validation',
    workflowsLabel: 'Workflows — Sales',
    pendingValidation: 'Pending validation',
    activity: 'Activity',
    footerNote: 'Each Mindzy dashboard is custom-designed for the client. This is a representative example.',
    lanes: [
      { name: 'Lead qualification',  label: 'in progress' },
      { name: 'Proposal drafting',   label: 'awaiting validation' },
      { name: 'CRM enrichment',      label: 'in progress' },
      { name: 'Meeting summaries',   label: 'completed' },
      { name: 'Follow-up sequences', label: 'in progress' },
    ],
    streamItems: [
      'Lead qualification batch completed',
      'Meeting summary ready for review',
      'Invoice extraction awaiting validation',
      'CRM update pending manager approval',
      'Follow-up sequence sent to qualified leads',
      'Quarterly briefing draft ready',
      'Support inbox triage completed',
      'Vendor contract comparison synthesized',
    ],
    pending: [
      { kind: 'approval', text: 'Invoice extraction · batch awaiting validation', time: '2m' },
      { kind: 'approval', text: 'CRM update pending manager approval', time: '7m' },
      { kind: 'review',   text: 'Meeting summary ready for review', time: '14m' },
    ],
    justNow: 'just now',
  },
  fr: {
    eyebrow: 'Centre de commande',
    h2_1: 'Centre de commande',
    h2_2: 'construit autour de votre hiérarchie.',
    desc: "Chaque tableau de bord Mindzy est conçu sur mesure pour les départements, les rôles et les règles de validation du client.",
    topBarSub: 'Vue exemple — configuration client anonymisée',
    departments: 'Départements',
    deptList: ['Commercial', 'Opérations', 'Support', 'Administration', 'Direction'],
    today: "Aujourd'hui",
    workflowsInProgress: '~40–60 workflows en cours',
    awaitingValidation: '8 en attente de validation',
    workflowsLabel: 'Workflows — Commercial',
    pendingValidation: 'En attente de validation',
    activity: 'Activité',
    footerNote: 'Chaque tableau de bord Mindzy est conçu sur mesure pour le client. Ceci est un exemple représentatif.',
    lanes: [
      { name: 'Qualification des leads',  label: 'en cours' },
      { name: 'Rédaction de proposition', label: 'en attente de validation' },
      { name: 'Enrichissement CRM',       label: 'en cours' },
      { name: 'Résumés de réunion',       label: 'terminé' },
      { name: 'Séquences de suivi',       label: 'en cours' },
    ],
    streamItems: [
      'Lot de qualification des leads terminé',
      'Résumé de réunion prêt à examiner',
      'Extraction de facture en attente de validation',
      'Mise à jour CRM en attente d\'approbation',
      'Séquence de suivi envoyée aux leads qualifiés',
      'Projet de bilan trimestriel prêt',
      'Triage de la boîte support terminé',
      'Comparaison de contrats fournisseurs synthétisée',
    ],
    pending: [
      { kind: 'approval', text: 'Extraction de facture · lot en attente de validation', time: '2m' },
      { kind: 'approval', text: 'Mise à jour CRM en attente d\'approbation', time: '7m' },
      { kind: 'review',   text: 'Résumé de réunion prêt à examiner', time: '14m' },
    ],
    justNow: 'à l\'instant',
  },
  es: {
    eyebrow: 'Centro de mando',
    h2_1: 'Centro de mando',
    h2_2: 'construido alrededor de tu jerarquía.',
    desc: "Cada panel de Mindzy está diseñado a medida para los departamentos, roles y reglas de validación del cliente.",
    topBarSub: 'Vista de ejemplo — configuración de cliente anonimizada',
    departments: 'Departamentos',
    deptList: ['Ventas', 'Operaciones', 'Soporte', 'Administración', 'Dirección'],
    today: 'Hoy',
    workflowsInProgress: '~40–60 flujos de trabajo en curso',
    awaitingValidation: '8 en espera de validación',
    workflowsLabel: 'Flujos de trabajo — Ventas',
    pendingValidation: 'Validación pendiente',
    activity: 'Actividad',
    footerNote: 'Cada panel de Mindzy está diseñado a medida para el cliente. Este es un ejemplo representativo.',
    lanes: [
      { name: 'Calificación de leads',   label: 'en curso' },
      { name: 'Redacción de propuesta',  label: 'en espera de validación' },
      { name: 'Enriquecimiento de CRM',  label: 'en curso' },
      { name: 'Resúmenes de reuniones',  label: 'completado' },
      { name: 'Secuencias de seguimiento', label: 'en curso' },
    ],
    streamItems: [
      'Lote de calificación de leads completado',
      'Resumen de reunión listo para revisión',
      'Extracción de factura en espera de validación',
      'Actualización de CRM pendiente de aprobación',
      'Secuencia de seguimiento enviada a leads calificados',
      'Borrador de informe trimestral listo',
      'Clasificación de bandeja de soporte completada',
      'Comparación de contratos de proveedores sintetizada',
    ],
    pending: [
      { kind: 'approval', text: 'Extracción de factura · lote en espera de validación', time: '2m' },
      { kind: 'approval', text: 'Actualización de CRM pendiente de aprobación', time: '7m' },
      { kind: 'review',   text: 'Resumen de reunión listo para revisión', time: '14m' },
    ],
    justNow: 'ahora mismo',
  },
  de: {
    eyebrow: 'Kommandozentrale',
    h2_1: 'Kommandozentrale',
    h2_2: 'aufgebaut nach Ihrer Hierarchie.',
    desc: "Jedes Mindzy-Dashboard wird individuell für die Abteilungen, Rollen und Validierungsregeln des Kunden gestaltet.",
    topBarSub: 'Beispielansicht — anonymisierte Client-Konfiguration',
    departments: 'Abteilungen',
    deptList: ['Vertrieb', 'Betrieb', 'Support', 'Verwaltung', 'Management'],
    today: 'Heute',
    workflowsInProgress: '~40–60 Workflows in Bearbeitung',
    awaitingValidation: '8 warten auf Freigabe',
    workflowsLabel: 'Workflows — Vertrieb',
    pendingValidation: 'Ausstehende Freigabe',
    activity: 'Aktivität',
    footerNote: 'Jedes Mindzy-Dashboard wird individuell für den Kunden gestaltet. Dies ist ein repräsentatives Beispiel.',
    lanes: [
      { name: 'Lead-Qualifizierung',      label: 'in Bearbeitung' },
      { name: 'Angebotsentwurf',          label: 'wartet auf Freigabe' },
      { name: 'CRM-Anreicherung',         label: 'in Bearbeitung' },
      { name: 'Besprechungszusammenfassungen', label: 'abgeschlossen' },
      { name: 'Follow-up-Sequenzen',      label: 'in Bearbeitung' },
    ],
    streamItems: [
      'Lead-Qualifizierungscharge abgeschlossen',
      'Besprechungszusammenfassung bereit zur Überprüfung',
      'Rechnungsextraktion wartet auf Freigabe',
      'CRM-Aktualisierung wartet auf Manager-Genehmigung',
      'Follow-up-Sequenz an qualifizierte Leads gesendet',
      'Quartalsbericht-Entwurf bereit',
      'Support-Postfach-Triage abgeschlossen',
      'Lieferantenvertragsvergleich synthetisiert',
    ],
    pending: [
      { kind: 'approval', text: 'Rechnungsextraktion · Charge wartet auf Freigabe', time: '2m' },
      { kind: 'approval', text: 'CRM-Aktualisierung wartet auf Manager-Genehmigung', time: '7m' },
      { kind: 'review',   text: 'Besprechungszusammenfassung bereit zur Überprüfung', time: '14m' },
    ],
    justNow: 'gerade eben',
  },
  it: {
    eyebrow: 'Centro di controllo',
    h2_1: 'Centro di controllo',
    h2_2: 'costruito attorno alla tua gerarchia.',
    desc: "Ogni dashboard Mindzy è progettata su misura per i reparti, i ruoli e le regole di validazione del cliente.",
    topBarSub: 'Vista di esempio — configurazione cliente anonimizzata',
    departments: 'Reparti',
    deptList: ['Vendite', 'Operazioni', 'Supporto', 'Amministrazione', 'Direzione'],
    today: 'Oggi',
    workflowsInProgress: '~40–60 flussi di lavoro in corso',
    awaitingValidation: '8 in attesa di validazione',
    workflowsLabel: 'Flussi di lavoro — Vendite',
    pendingValidation: 'Validazione in sospeso',
    activity: 'Attività',
    footerNote: 'Ogni dashboard Mindzy è progettata su misura per il cliente. Questo è un esempio rappresentativo.',
    lanes: [
      { name: 'Qualifica dei lead',       label: 'in corso' },
      { name: 'Redazione proposta',       label: 'in attesa di validazione' },
      { name: 'Arricchimento CRM',        label: 'in corso' },
      { name: 'Riepiloghi riunioni',      label: 'completato' },
      { name: 'Sequenze di follow-up',    label: 'in corso' },
    ],
    streamItems: [
      'Batch qualifica lead completato',
      'Riepilogo riunione pronto per la revisione',
      'Estrazione fattura in attesa di validazione',
      'Aggiornamento CRM in attesa di approvazione',
      'Sequenza di follow-up inviata ai lead qualificati',
      'Bozza del briefing trimestrale pronta',
      'Triage casella di supporto completato',
      'Confronto contratti fornitori sintetizzato',
    ],
    pending: [
      { kind: 'approval', text: 'Estrazione fattura · batch in attesa di validazione', time: '2m' },
      { kind: 'approval', text: 'Aggiornamento CRM in attesa di approvazione', time: '7m' },
      { kind: 'review',   text: 'Riepilogo riunione pronto per la revisione', time: '14m' },
    ],
    justNow: 'proprio ora',
  },
  pt: {
    eyebrow: 'Central de comando',
    h2_1: 'Central de comando',
    h2_2: 'construída em torno da sua hierarquia.',
    desc: "Cada painel Mindzy é personalizado para os departamentos, funções e regras de validação do cliente.",
    topBarSub: 'Vista de exemplo — configuração de cliente anonimizada',
    departments: 'Departamentos',
    deptList: ['Vendas', 'Operações', 'Suporte', 'Administração', 'Gestão'],
    today: 'Hoje',
    workflowsInProgress: '~40–60 fluxos de trabalho em andamento',
    awaitingValidation: '8 aguardando validação',
    workflowsLabel: 'Fluxos de trabalho — Vendas',
    pendingValidation: 'Validação pendente',
    activity: 'Atividade',
    footerNote: 'Cada painel Mindzy é personalizado para o cliente. Este é um exemplo representativo.',
    lanes: [
      { name: 'Qualificação de leads',    label: 'em andamento' },
      { name: 'Elaboração de proposta',   label: 'aguardando validação' },
      { name: 'Enriquecimento de CRM',    label: 'em andamento' },
      { name: 'Resumos de reuniões',      label: 'concluído' },
      { name: 'Sequências de follow-up',  label: 'em andamento' },
    ],
    streamItems: [
      'Lote de qualificação de leads concluído',
      'Resumo de reunião pronto para revisão',
      'Extração de fatura aguardando validação',
      'Atualização de CRM aguardando aprovação do gestor',
      'Sequência de follow-up enviada para leads qualificados',
      'Rascunho do briefing trimestral pronto',
      'Triagem da caixa de suporte concluída',
      'Comparação de contratos de fornecedores sintetizada',
    ],
    pending: [
      { kind: 'approval', text: 'Extração de fatura · lote aguardando validação', time: '2m' },
      { kind: 'approval', text: 'Atualização de CRM aguardando aprovação do gestor', time: '7m' },
      { kind: 'review',   text: 'Resumo de reunião pronto para revisão', time: '14m' },
    ],
    justNow: 'agora mesmo',
  },
  ar: {
    eyebrow: 'مركز القيادة',
    h2_1: 'مركز القيادة',
    h2_2: 'مبني حول هيكلك التنظيمي.',
    desc: "كل لوحة تحكم Mindzy مصممة خصيصًا لأقسام العميل وأدواره وقواعد التحقق الخاصة به.",
    topBarSub: 'عرض مثال — إعداد عميل مجهول الهوية',
    departments: 'الأقسام',
    deptList: ['المبيعات', 'العمليات', 'الدعم', 'الإدارة', 'الإدارة العليا'],
    today: 'اليوم',
    workflowsInProgress: '~٤٠–٦٠ سير عمل قيد التنفيذ',
    awaitingValidation: '٨ في انتظار التحقق',
    workflowsLabel: 'سير العمل — المبيعات',
    pendingValidation: 'في انتظار التحقق',
    activity: 'النشاط',
    footerNote: 'كل لوحة تحكم Mindzy مصممة خصيصًا للعميل. هذا مثال تمثيلي.',
    lanes: [
      { name: 'تأهيل العملاء المحتملين', label: 'قيد التنفيذ' },
      { name: 'صياغة العروض',           label: 'في انتظار التحقق' },
      { name: 'إثراء بيانات CRM',       label: 'قيد التنفيذ' },
      { name: 'ملخصات الاجتماعات',      label: 'مكتمل' },
      { name: 'تسلسلات المتابعة',       label: 'قيد التنفيذ' },
    ],
    streamItems: [
      'اكتملت دفعة تأهيل العملاء المحتملين',
      'ملخص الاجتماع جاهز للمراجعة',
      'استخراج الفاتورة في انتظار التحقق',
      'تحديث CRM في انتظار موافقة المدير',
      'تم إرسال تسلسل المتابعة إلى العملاء المؤهلين',
      'مسودة الإحاطة الفصلية جاهزة',
      'اكتمل فرز صندوق بريد الدعم',
      'تمت مقارنة عقود الموردين',
    ],
    pending: [
      { kind: 'approval', text: 'استخراج الفاتورة · دفعة في انتظار التحقق', time: '٢د' },
      { kind: 'approval', text: 'تحديث CRM في انتظار موافقة المدير', time: '٧د' },
      { kind: 'review',   text: 'ملخص الاجتماع جاهز للمراجعة', time: '١٤د' },
    ],
    justNow: 'الآن',
  },
  zh: {
    eyebrow: '指挥中心',
    h2_1: '指挥中心',
    h2_2: '围绕您的组织架构构建。',
    desc: "每个 Mindzy 仪表板都根据客户的部门、角色和审批规则定制设计。",
    topBarSub: '示例视图 — 匿名客户配置',
    departments: '部门',
    deptList: ['销售', '运营', '支持', '行政', '管理层'],
    today: '今天',
    workflowsInProgress: '约 40–60 个工作流进行中',
    awaitingValidation: '8 个待审批',
    workflowsLabel: '工作流 — 销售',
    pendingValidation: '待审批',
    activity: '活动',
    footerNote: '每个 Mindzy 仪表板都为客户定制设计。这是一个代表性示例。',
    lanes: [
      { name: '线索资质筛查',  label: '进行中' },
      { name: '提案起草',      label: '待审批' },
      { name: 'CRM 数据丰富', label: '进行中' },
      { name: '会议纪要',      label: '已完成' },
      { name: '跟进序列',      label: '进行中' },
    ],
    streamItems: [
      '线索资质筛查批次已完成',
      '会议纪要已准备好审阅',
      '发票提取待审批',
      'CRM 更新待经理审批',
      '跟进序列已发送给合格线索',
      '季度简报草稿已准备好',
      '支持收件箱分拣已完成',
      '供应商合同比较已综合',
    ],
    pending: [
      { kind: 'approval', text: '发票提取 · 批次待审批', time: '2分钟' },
      { kind: 'approval', text: 'CRM 更新待经理审批', time: '7分钟' },
      { kind: 'review',   text: '会议纪要已准备好审阅', time: '14分钟' },
    ],
    justNow: '刚刚',
  },
  ja: {
    eyebrow: 'コントロールセンター',
    h2_1: 'コントロールセンター',
    h2_2: '組織階層に合わせて構築。',
    desc: "各 Mindzy ダッシュボードは、クライアントの部門、役職、承認ルールに合わせてカスタム設計されています。",
    topBarSub: 'サンプルビュー — 匿名化されたクライアント設定',
    departments: '部門',
    deptList: ['営業', 'オペレーション', 'サポート', '管理', '経営'],
    today: '本日',
    workflowsInProgress: '約40〜60件のワークフロー進行中',
    awaitingValidation: '8件が承認待ち',
    workflowsLabel: 'ワークフロー — 営業',
    pendingValidation: '承認待ち',
    activity: 'アクティビティ',
    footerNote: '各 Mindzy ダッシュボードはクライアント向けにカスタム設計されています。これは代表的な例です。',
    lanes: [
      { name: 'リード資格確認',      label: '進行中' },
      { name: '提案書作成',          label: '承認待ち' },
      { name: 'CRM データ強化',      label: '進行中' },
      { name: '会議の要約',          label: '完了' },
      { name: 'フォローアップシーケンス', label: '進行中' },
    ],
    streamItems: [
      'リード資格確認バッチ完了',
      '会議の要約がレビュー待ち',
      '請求書抽出が承認待ち',
      'CRM 更新がマネージャー承認待ち',
      'フォローアップシーケンスを資格リードに送信済み',
      '四半期ブリーフィング草稿準備完了',
      'サポート受信トレイのトリアージ完了',
      'ベンダー契約比較が完了',
    ],
    pending: [
      { kind: 'approval', text: '請求書抽出 · バッチ承認待ち', time: '2分' },
      { kind: 'approval', text: 'CRM 更新がマネージャー承認待ち', time: '7分' },
      { kind: 'review',   text: '会議の要約がレビュー待ち', time: '14分' },
    ],
    justNow: 'たった今',
  },
  ru: {
    eyebrow: 'Центр управления',
    h2_1: 'Центр управления',
    h2_2: 'построен под вашу иерархию.',
    desc: "Каждая панель управления Mindzy разрабатывается под отделы, роли и правила валидации конкретного клиента.",
    topBarSub: 'Пример представления — анонимизированная конфигурация клиента',
    departments: 'Отделы',
    deptList: ['Продажи', 'Операции', 'Поддержка', 'Администрация', 'Руководство'],
    today: 'Сегодня',
    workflowsInProgress: '~40–60 рабочих процессов в работе',
    awaitingValidation: '8 ожидают проверки',
    workflowsLabel: 'Рабочие процессы — Продажи',
    pendingValidation: 'Ожидают проверки',
    activity: 'Активность',
    footerNote: 'Каждая панель управления Mindzy разрабатывается под клиента. Это репрезентативный пример.',
    lanes: [
      { name: 'Квалификация лидов',    label: 'в работе' },
      { name: 'Составление предложения', label: 'ожидает проверки' },
      { name: 'Обогащение CRM',         label: 'в работе' },
      { name: 'Резюме встреч',          label: 'завершено' },
      { name: 'Последовательности follow-up', label: 'в работе' },
    ],
    streamItems: [
      'Пакет квалификации лидов завершён',
      'Резюме встречи готово к проверке',
      'Извлечение счёта ожидает проверки',
      'Обновление CRM ожидает одобрения менеджера',
      'Последовательность follow-up отправлена квалифицированным лидам',
      'Черновик квартального брифинга готов',
      'Сортировка поддержки завершена',
      'Сравнение контрактов поставщиков обобщено',
    ],
    pending: [
      { kind: 'approval', text: 'Извлечение счёта · пакет ожидает проверки', time: '2м' },
      { kind: 'approval', text: 'Обновление CRM ожидает одобрения менеджера', time: '7м' },
      { kind: 'review',   text: 'Резюме встречи готово к проверке', time: '14м' },
    ],
    justNow: 'только что',
  },
}

const LANE_WIDTHS = [0.72, 0.38, 0.86, 1.0, 0.55]
const LANE_STATUSES = ['running', 'waiting', 'running', 'done', 'running'] as const

export function DashboardSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  const { ref: sectionRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 })
  const barsRef = useRef<(HTMLElement | null)[]>([])
  const streamRef = useRef<HTMLDivElement>(null)
  const streamIdxRef = useRef(0)

  // Animate lane bars when section enters viewport
  useEffect(() => {
    if (!isIntersecting) return
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      bar.style.transition = 'transform 1.1s cubic-bezier(.2,.7,.2,1)'
      bar.style.transform = `scaleX(${LANE_WIDTHS[i] ?? 0.5})`
    })
  }, [isIntersecting])

  // Stream animation
  useEffect(() => {
    const streamEl = streamRef.current
    if (!streamEl) return

    // Seed 3 initial items
    for (let k = 0; k < 3; k++) {
      const text = t.streamItems[k % t.streamItems.length]
      const node = document.createElement('div')
      node.style.cssText = 'display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:start;font-size:13px;'
      node.innerHTML = `<span style="width:8px;height:8px;border-radius:999px;background:var(--ai-accent);margin-top:6px;display:block;"></span><span>${text}</span><span style="color:var(--ai-fg-soft);font-size:11px;">${['2m','7m','14m'][k] || ''}</span>`
      streamEl.appendChild(node)
    }

    const interval = setInterval(() => {
      if (!streamEl.isConnected) { clearInterval(interval); return }
      const text = t.streamItems[streamIdxRef.current % t.streamItems.length]
      streamIdxRef.current++
      const node = document.createElement('div')
      node.style.cssText = 'display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:start;font-size:13px;opacity:0;transition:opacity 0.5s;'
      node.innerHTML = `<span style="width:8px;height:8px;border-radius:999px;background:var(--ai-accent);margin-top:6px;display:block;"></span><span>${text}</span><span style="color:var(--ai-fg-soft);font-size:11px;">${t.justNow}</span>`
      streamEl.prepend(node)
      requestAnimationFrame(() => { node.style.opacity = '1' })
      while (streamEl.children.length > 5) streamEl.lastElementChild?.remove()
    }, 4200)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--ai-border)' }}>
      <div ref={sectionRef} className="w-full max-w-[1200px] mx-auto px-8">
        {/* Section head */}
        <FadeIn>
          <div style={{ maxWidth: '740px', marginBottom: '56px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>{t.eyebrow}</div>
            <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(34px,4.6vw,56px)', lineHeight: 1.08, marginTop: '14px' }}>
              <em>{t.h2_1}</em> {t.h2_2}
            </h2>
            <p style={{ marginTop: '24px', fontSize: '18px', lineHeight: 1.6, color: 'var(--ai-fg-muted)', maxWidth: '600px' }}>
              {t.desc}
            </p>
          </div>
        </FadeIn>

        {/* Dashboard card */}
        <FadeIn delay={200}>
          <div style={{ borderRadius: '20px', background: 'var(--ai-surface)', border: '1px solid var(--ai-border)', overflow: 'hidden', boxShadow: '0 1px 0 rgba(10,14,26,0.04),0 14px 40px -20px rgba(10,14,26,0.12)' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--ai-border)', fontSize: '12.5px', color: 'var(--ai-fg-muted)', background: 'var(--ai-bg-2)' }}>
            <span style={{ display: 'inline-flex', gap: '6px' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: '10px', height: '10px', borderRadius: '999px', background: c, display: 'block' }} />)}
            </span>
            <span style={{ fontFamily: 'ui-monospace,monospace', fontSize: '12px' }}>acme.mindzy.local — workforce</span>
            <span style={{ color: 'var(--ai-fg-soft)' }}>{t.topBarSub}</span>
          </div>

          {/* 3-column body */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 280px', minHeight: '480px' }}>
            {/* Sidebar */}
            <div style={{ padding: '22px 20px', borderRight: '1px solid var(--ai-border)', background: 'var(--ai-bg-2)' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '12px' }}>{t.departments}</div>
              <ul style={{ display: 'grid', gap: '4px', fontSize: '13.5px' }}>
                {t.deptList.map((d, i) => (
                  <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', borderRadius: '8px', color: i === 0 ? 'var(--ai-accent)' : 'var(--ai-fg-muted)', background: i === 0 ? 'color-mix(in srgb, var(--ai-accent) 12%, transparent)' : 'transparent', fontWeight: i === 0 ? 500 : 400, cursor: 'pointer' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: 'currentColor', opacity: .6, display: 'block', flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '8px', marginTop: '24px' }}>{t.today}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--ai-fg-muted)', lineHeight: 1.4 }}>{t.workflowsInProgress}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--ai-fg-muted)', marginTop: '6px' }}>{t.awaitingValidation}</div>
            </div>

            {/* Main lanes */}
            <div style={{ padding: '24px', borderRight: '1px solid var(--ai-border)' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '14px' }}>{t.workflowsLabel}</div>
              <div style={{ display: 'grid', gap: '10px' }}>
                {t.lanes.map((lane, i) => (
                  <div key={lane.name} style={{ display: 'grid', gridTemplateColumns: '130px 1fr auto', alignItems: 'center', gap: '14px', padding: '12px 14px', border: '1px solid var(--ai-border)', borderRadius: '12px', background: 'var(--ai-bg-2)', fontSize: '13px' }}>
                    <span style={{ fontWeight: 500 }}>{lane.name}</span>
                    <div style={{ height: '6px', borderRadius: '999px', background: 'var(--ai-bg-3)', position: 'relative', overflow: 'hidden' }}>
                      <i ref={el => { barsRef.current[i] = el }} style={{ position: 'absolute', inset: 0, right: 'auto', background: 'var(--ai-accent)', borderRadius: '999px', transformOrigin: 'left center', transform: 'scaleX(0)' }} />
                    </div>
                    <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '999px', background: LANE_STATUSES[i] === 'running' ? 'color-mix(in srgb,var(--ai-accent) 14%,transparent)' : LANE_STATUSES[i] === 'waiting' ? 'color-mix(in srgb,var(--mindzy-gold) 18%,transparent)' : 'var(--ai-bg-3)', color: LANE_STATUSES[i] === 'running' ? 'var(--ai-accent)' : LANE_STATUSES[i] === 'waiting' ? '#8a6d12' : 'var(--ai-fg-muted)' }}>
                      {lane.label}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '8px', marginTop: '24px' }}>{t.pendingValidation}</div>
              <ul style={{ display: 'grid', gap: '8px' }}>
                {t.pending.map((p, i) => (
                  <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '12px', padding: '10px 12px', border: '1px solid var(--ai-border)', borderRadius: '10px', background: 'var(--ai-bg-2)', fontSize: '13px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '999px', fontWeight: 500, background: p.kind === 'approval' ? 'color-mix(in srgb,var(--mindzy-gold) 18%,transparent)' : 'color-mix(in srgb,var(--ai-accent) 14%,transparent)', color: p.kind === 'approval' ? '#8a6d12' : 'var(--ai-accent)' }}>{p.kind}</span>
                    <span>{p.text}</span>
                    <span style={{ color: 'var(--ai-fg-soft)', fontSize: '11.5px' }}>{p.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activity stream */}
            <div style={{ padding: '22px', background: 'var(--ai-bg-2)' }}>
              <h4 style={{ fontSize: '12px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ai-fg-soft)', marginBottom: '16px' }}>{t.activity}</h4>
              <div ref={streamRef} style={{ display: 'grid', gap: '14px' }} />
            </div>
          </div>

          {/* Note */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--ai-border)', background: 'var(--ai-bg-2)', fontSize: '12px', color: 'var(--ai-fg-soft)', letterSpacing: '.01em' }}>
            {t.footerNote}
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default DashboardSection
