const TRANSLATIONS = {
  en: {
    eyebrow: 'Use cases',
    h2: 'Built around real business operations.',
    desc: 'From sales to finance, support, operations, and management, Mindzy builds AI infrastructure around the workflows that actually move your company forward.',
    bottomCta: 'Book an infrastructure audit',
    cases: [
      {
        cat: 'Sales', title: 'Sales acceleration',
        desc: 'Qualify leads, enrich CRM data, prepare follow-ups, summarize calls, and automate pipeline updates without losing human control.',
        tags: ['Lead qualification','CRM enrichment','Follow-up automation','Meeting summaries'],
        cta: 'Build this workflow',
      },
      {
        cat: 'Operations', title: 'Operations automation',
        desc: 'Turn repetitive internal processes into structured workflows with clear validation, task routing, alerts, and execution tracking.',
        tags: ['Task routing','Process automation','Internal alerts','Workflow tracking'],
        cta: 'Automate operations',
      },
      {
        cat: 'Finance', title: 'Finance & reporting',
        desc: 'Automate reporting, invoice extraction, financial document review, data consolidation, and recurring management dashboards.',
        tags: ['Invoice extraction','Financial reporting','Data consolidation','Dashboard generation'],
        cta: 'Improve reporting',
      },
      {
        cat: 'Support', title: 'Customer support layer',
        desc: 'Connect support channels, classify requests, draft replies, route tickets, and escalate sensitive cases to the right human.',
        tags: ['Ticket classification','Reply drafting','Knowledge matching','Human escalation'],
        cta: 'Upgrade support',
      },
      {
        cat: 'Management', title: 'Executive command center',
        desc: 'Give leadership a real-time view of workflows, bottlenecks, pending validations, team activity, and operational performance.',
        tags: ['Workflow visibility','Pending approvals','Team activity','Performance insights'],
        cta: 'Create visibility',
      },
      {
        cat: 'Company-wide', title: 'Custom AI workforce',
        desc: 'Deploy AI assistants by department, connected to your tools, governed by your rules, and adapted to your internal hierarchy.',
        tags: ['Department assistants','Role-based access','Tool integrations','Human validation'],
        cta: 'Design your system',
      },
    ],
  },
  fr: {
    eyebrow: 'Cas d\'usage',
    h2: 'Construit autour des opérations réelles.',
    desc: 'Des ventes à la finance, en passant par le support, les opérations et la direction, Mindzy construit une infrastructure IA autour des workflows qui font vraiment avancer votre entreprise.',
    bottomCta: 'Réserver un audit d\'infrastructure',
    cases: [
      {
        cat: 'Commercial', title: 'Accélération des ventes',
        desc: 'Qualifiez vos leads, enrichissez les données CRM, préparez les suivis, résumez les appels et automatisez les mises à jour du pipeline sans perdre le contrôle humain.',
        tags: ['Qualification des leads','Enrichissement CRM','Automatisation des suivis','Résumés de réunions'],
        cta: 'Construire ce workflow',
      },
      {
        cat: 'Opérations', title: 'Automatisation des opérations',
        desc: 'Transformez les processus internes répétitifs en workflows structurés avec validation claire, routage des tâches, alertes et suivi d\'exécution.',
        tags: ['Routage des tâches','Automatisation des processus','Alertes internes','Suivi des workflows'],
        cta: 'Automatiser les opérations',
      },
      {
        cat: 'Finance', title: 'Finance & reporting',
        desc: 'Automatisez les rapports, l\'extraction de factures, la revue de documents financiers, la consolidation des données et les tableaux de bord de direction récurrents.',
        tags: ['Extraction de factures','Reporting financier','Consolidation des données','Génération de tableaux de bord'],
        cta: 'Améliorer le reporting',
      },
      {
        cat: 'Support', title: 'Couche de support client',
        desc: 'Connectez les canaux de support, classifiez les demandes, rédigez des réponses, routez les tickets et escaladez les cas sensibles vers la bonne personne.',
        tags: ['Classification des tickets','Rédaction de réponses','Correspondance de connaissances','Escalade humaine'],
        cta: 'Améliorer le support',
      },
      {
        cat: 'Direction', title: 'Centre de commandement exécutif',
        desc: 'Donnez à la direction une vue en temps réel des workflows, des goulots d\'étranglement, des validations en attente, de l\'activité des équipes et des performances opérationnelles.',
        tags: ['Visibilité des workflows','Approbations en attente','Activité des équipes','Insights de performance'],
        cta: 'Créer de la visibilité',
      },
      {
        cat: 'Toute l\'entreprise', title: 'Force de travail IA sur mesure',
        desc: 'Déployez des assistants IA par département, connectés à vos outils, gouvernés par vos règles et adaptés à votre hiérarchie interne.',
        tags: ['Assistants par département','Accès basé sur les rôles','Intégrations d\'outils','Validation humaine'],
        cta: 'Concevoir votre système',
      },
    ],
  },
  es: {
    eyebrow: 'Casos de uso',
    h2: 'Construido alrededor de operaciones empresariales reales.',
    desc: 'Desde ventas hasta finanzas, soporte, operaciones y dirección, Mindzy construye infraestructura de IA alrededor de los flujos de trabajo que realmente hacen avanzar tu empresa.',
    bottomCta: 'Reservar una auditoría de infraestructura',
    cases: [
      {
        cat: 'Ventas', title: 'Aceleración de ventas',
        desc: 'Califica leads, enriquece datos CRM, prepara seguimientos, resume llamadas y automatiza actualizaciones del pipeline sin perder el control humano.',
        tags: ['Calificación de leads','Enriquecimiento de CRM','Automatización de seguimientos','Resúmenes de reuniones'],
        cta: 'Construir este flujo',
      },
      {
        cat: 'Operaciones', title: 'Automatización de operaciones',
        desc: 'Convierte procesos internos repetitivos en flujos de trabajo estructurados con validación clara, enrutamiento de tareas, alertas y seguimiento de ejecución.',
        tags: ['Enrutamiento de tareas','Automatización de procesos','Alertas internas','Seguimiento de workflows'],
        cta: 'Automatizar operaciones',
      },
      {
        cat: 'Finanzas', title: 'Finanzas e informes',
        desc: 'Automatiza informes, extracción de facturas, revisión de documentos financieros, consolidación de datos y dashboards de gestión recurrentes.',
        tags: ['Extracción de facturas','Informes financieros','Consolidación de datos','Generación de dashboards'],
        cta: 'Mejorar los informes',
      },
      {
        cat: 'Soporte', title: 'Capa de soporte al cliente',
        desc: 'Conecta canales de soporte, clasifica solicitudes, redacta respuestas, enruta tickets y escala casos sensibles a la persona adecuada.',
        tags: ['Clasificación de tickets','Redacción de respuestas','Coincidencia de conocimiento','Escalada humana'],
        cta: 'Mejorar el soporte',
      },
      {
        cat: 'Dirección', title: 'Centro de mando ejecutivo',
        desc: 'Dale a la dirección una vista en tiempo real de los flujos de trabajo, cuellos de botella, validaciones pendientes, actividad del equipo y rendimiento operacional.',
        tags: ['Visibilidad de workflows','Aprobaciones pendientes','Actividad del equipo','Insights de rendimiento'],
        cta: 'Crear visibilidad',
      },
      {
        cat: 'Toda la empresa', title: 'Fuerza de trabajo IA personalizada',
        desc: 'Despliega asistentes IA por departamento, conectados a tus herramientas, gobernados por tus reglas y adaptados a tu jerarquía interna.',
        tags: ['Asistentes por departamento','Acceso basado en roles','Integraciones de herramientas','Validación humana'],
        cta: 'Diseñar tu sistema',
      },
    ],
  },
  de: {
    eyebrow: 'Anwendungsfälle',
    h2: 'Aufgebaut rund um reale Geschäftsabläufe.',
    desc: 'Von Vertrieb bis Finanzen, Support, Betrieb und Management — Mindzy baut KI-Infrastruktur um die Workflows, die Ihr Unternehmen wirklich voranbringen.',
    bottomCta: 'Infrastruktur-Audit buchen',
    cases: [
      {
        cat: 'Vertrieb', title: 'Vertriebsbeschleunigung',
        desc: 'Leads qualifizieren, CRM-Daten anreichern, Follow-ups vorbereiten, Gespräche zusammenfassen und Pipeline-Updates automatisieren, ohne die menschliche Kontrolle zu verlieren.',
        tags: ['Lead-Qualifizierung','CRM-Anreicherung','Follow-up-Automatisierung','Meeting-Zusammenfassungen'],
        cta: 'Diesen Workflow aufbauen',
      },
      {
        cat: 'Betrieb', title: 'Betriebsautomatisierung',
        desc: 'Repetitive interne Prozesse in strukturierte Workflows mit klarer Validierung, Aufgaben-Routing, Benachrichtigungen und Ausführungsverfolgung umwandeln.',
        tags: ['Aufgaben-Routing','Prozessautomatisierung','Interne Benachrichtigungen','Workflow-Tracking'],
        cta: 'Betrieb automatisieren',
      },
      {
        cat: 'Finanzen', title: 'Finanzen & Reporting',
        desc: 'Reporting, Rechnungsextraktion, Überprüfung von Finanzdokumenten, Datenkonsoli­dierung und wiederkehrende Management-Dashboards automatisieren.',
        tags: ['Rechnungsextraktion','Finanz-Reporting','Datenkonsolidierung','Dashboard-Generierung'],
        cta: 'Reporting verbessern',
      },
      {
        cat: 'Support', title: 'Kundensupport-Schicht',
        desc: 'Support-Kanäle verbinden, Anfragen klassifizieren, Antworten verfassen, Tickets weiterleiten und sensible Fälle an die richtige Person eskalieren.',
        tags: ['Ticket-Klassifizierung','Antwort-Erstellung','Wissensabgleich','Eskalation an Menschen'],
        cta: 'Support verbessern',
      },
      {
        cat: 'Management', title: 'Exekutives Kommandozentrum',
        desc: 'Der Führungsebene eine Echtzeit-Ansicht von Workflows, Engpässen, ausstehenden Freigaben, Teamaktivitäten und operativer Leistung geben.',
        tags: ['Workflow-Transparenz','Ausstehende Genehmigungen','Teamaktivität','Leistungs-Insights'],
        cta: 'Transparenz schaffen',
      },
      {
        cat: 'Unternehmensweit', title: 'Individuelle KI-Belegschaft',
        desc: 'KI-Assistenten nach Abteilung einsetzen, mit Ihren Tools verbunden, nach Ihren Regeln gesteuert und an Ihre interne Hierarchie angepasst.',
        tags: ['Abteilungsassistenten','Rollenbasierter Zugang','Tool-Integrationen','Menschliche Validierung'],
        cta: 'Ihr System gestalten',
      },
    ],
  },
  it: {
    eyebrow: 'Casi d\'uso',
    h2: 'Costruito attorno alle operazioni aziendali reali.',
    desc: 'Dalle vendite alla finanza, al supporto, alle operazioni e alla gestione, Mindzy costruisce infrastruttura AI attorno ai flussi di lavoro che fanno davvero avanzare la tua azienda.',
    bottomCta: 'Prenota un audit dell\'infrastruttura',
    cases: [
      {
        cat: 'Vendite', title: 'Accelerazione delle vendite',
        desc: 'Qualifica lead, arricchisci i dati CRM, prepara follow-up, riassumi le chiamate e automatizza gli aggiornamenti della pipeline senza perdere il controllo umano.',
        tags: ['Qualifica lead','Arricchimento CRM','Automazione follow-up','Riepiloghi riunioni'],
        cta: 'Costruire questo flusso',
      },
      {
        cat: 'Operazioni', title: 'Automazione delle operazioni',
        desc: 'Trasforma i processi interni ripetitivi in flussi di lavoro strutturati con validazione chiara, routing delle attività, avvisi e tracciamento dell\'esecuzione.',
        tags: ['Routing attività','Automazione processi','Avvisi interni','Tracciamento workflow'],
        cta: 'Automatizzare le operazioni',
      },
      {
        cat: 'Finanza', title: 'Finanza e reporting',
        desc: 'Automatizza reporting, estrazione fatture, revisione documenti finanziari, consolidamento dati e dashboard di gestione ricorrenti.',
        tags: ['Estrazione fatture','Reporting finanziario','Consolidamento dati','Generazione dashboard'],
        cta: 'Migliorare il reporting',
      },
      {
        cat: 'Supporto', title: 'Livello di supporto clienti',
        desc: 'Connetti i canali di supporto, classifica le richieste, redigi risposte, instrada i ticket ed escalation i casi sensibili alla persona giusta.',
        tags: ['Classificazione ticket','Redazione risposte','Corrispondenza conoscenza','Escalation umana'],
        cta: 'Potenziare il supporto',
      },
      {
        cat: 'Direzione', title: 'Centro di comando esecutivo',
        desc: 'Dai alla leadership una vista in tempo reale di flussi di lavoro, colli di bottiglia, validazioni in sospeso, attività del team e performance operativa.',
        tags: ['Visibilità workflow','Approvazioni in sospeso','Attività del team','Insights prestazioni'],
        cta: 'Creare visibilità',
      },
      {
        cat: 'Tutta l\'azienda', title: 'Forza lavoro AI personalizzata',
        desc: 'Distribuisci assistenti AI per reparto, connessi ai tuoi strumenti, governati dalle tue regole e adattati alla tua gerarchia interna.',
        tags: ['Assistenti per reparto','Accesso basato su ruoli','Integrazioni strumenti','Validazione umana'],
        cta: 'Progettare il tuo sistema',
      },
    ],
  },
  pt: {
    eyebrow: 'Casos de uso',
    h2: 'Construído em torno de operações empresariais reais.',
    desc: 'De vendas a finanças, suporte, operações e gestão, Mindzy constrói infraestrutura de IA em torno dos fluxos de trabalho que realmente fazem sua empresa avançar.',
    bottomCta: 'Agendar uma auditoria de infraestrutura',
    cases: [
      {
        cat: 'Vendas', title: 'Aceleração de vendas',
        desc: 'Qualifique leads, enriqueça dados de CRM, prepare follow-ups, resuma chamadas e automatize atualizações do pipeline sem perder o controle humano.',
        tags: ['Qualificação de leads','Enriquecimento de CRM','Automação de follow-up','Resumos de reuniões'],
        cta: 'Construir este fluxo',
      },
      {
        cat: 'Operações', title: 'Automação de operações',
        desc: 'Transforme processos internos repetitivos em fluxos de trabalho estruturados com validação clara, roteamento de tarefas, alertas e rastreamento de execução.',
        tags: ['Roteamento de tarefas','Automação de processos','Alertas internos','Rastreamento de workflows'],
        cta: 'Automatizar operações',
      },
      {
        cat: 'Finanças', title: 'Finanças e relatórios',
        desc: 'Automatize relatórios, extração de faturas, revisão de documentos financeiros, consolidação de dados e dashboards de gestão recorrentes.',
        tags: ['Extração de faturas','Relatórios financeiros','Consolidação de dados','Geração de dashboards'],
        cta: 'Melhorar relatórios',
      },
      {
        cat: 'Suporte', title: 'Camada de suporte ao cliente',
        desc: 'Conecte canais de suporte, classifique solicitações, redija respostas, encaminhe tickets e escale casos sensíveis para a pessoa certa.',
        tags: ['Classificação de tickets','Redação de respostas','Correspondência de conhecimento','Escalada humana'],
        cta: 'Melhorar o suporte',
      },
      {
        cat: 'Gestão', title: 'Centro de comando executivo',
        desc: 'Dê à liderança uma visão em tempo real de fluxos de trabalho, gargalos, validações pendentes, atividade da equipe e desempenho operacional.',
        tags: ['Visibilidade de workflows','Aprovações pendentes','Atividade da equipe','Insights de desempenho'],
        cta: 'Criar visibilidade',
      },
      {
        cat: 'Toda a empresa', title: 'Força de trabalho IA personalizada',
        desc: 'Implante assistentes de IA por departamento, conectados às suas ferramentas, governados pelas suas regras e adaptados à sua hierarquia interna.',
        tags: ['Assistentes por departamento','Acesso baseado em funções','Integrações de ferramentas','Validação humana'],
        cta: 'Projetar seu sistema',
      },
    ],
  },
  ar: {
    eyebrow: 'حالات الاستخدام',
    h2: 'مبني حول العمليات التجارية الحقيقية.',
    desc: 'من المبيعات إلى المالية والدعم والعمليات والإدارة، تبني Mindzy بنية تحتية للذكاء الاصطناعي حول سير العمل الذي يدفع شركتك إلى الأمام فعلاً.',
    bottomCta: 'احجز تدقيقًا في البنية التحتية',
    cases: [
      {
        cat: 'المبيعات', title: 'تسريع المبيعات',
        desc: 'أهّل العملاء المحتملين، وأثرِ بيانات CRM، وأعدّ المتابعات، ولخّص المكالمات، وأتمت تحديثات خط الأنابيب دون فقدان السيطرة البشرية.',
        tags: ['تأهيل العملاء المحتملين','إثراء CRM','أتمتة المتابعة','ملخصات الاجتماعات'],
        cta: 'بناء هذا السير',
      },
      {
        cat: 'العمليات', title: 'أتمتة العمليات',
        desc: 'حوّل العمليات الداخلية المتكررة إلى سير عمل منظم مع تحقق واضح وتوجيه المهام والتنبيهات وتتبع التنفيذ.',
        tags: ['توجيه المهام','أتمتة العمليات','التنبيهات الداخلية','تتبع سير العمل'],
        cta: 'أتمتة العمليات',
      },
      {
        cat: 'المالية', title: 'المالية والتقارير',
        desc: 'أتمت إعداد التقارير واستخراج الفواتير ومراجعة المستندات المالية وتوحيد البيانات ولوحات تحكم الإدارة المتكررة.',
        tags: ['استخراج الفواتير','التقارير المالية','توحيد البيانات','إنشاء لوحات التحكم'],
        cta: 'تحسين التقارير',
      },
      {
        cat: 'الدعم', title: 'طبقة دعم العملاء',
        desc: 'وصّل قنوات الدعم وصنّف الطلبات وابتكر الردود ووجّه التذاكر وصعّد الحالات الحساسة إلى الشخص المناسب.',
        tags: ['تصنيف التذاكر','صياغة الردود','مطابقة المعرفة','التصعيد البشري'],
        cta: 'تطوير الدعم',
      },
      {
        cat: 'الإدارة', title: 'مركز القيادة التنفيذي',
        desc: 'امنح القيادة رؤية فورية لسير العمل والاختناقات والتحقق المعلّق ونشاط الفريق والأداء التشغيلي.',
        tags: ['رؤية سير العمل','الموافقات المعلقة','نشاط الفريق','رؤى الأداء'],
        cta: 'إنشاء الرؤية',
      },
      {
        cat: 'على مستوى الشركة', title: 'قوى عمل ذكاء اصطناعي مخصصة',
        desc: 'انشر مساعدين ذكاء اصطناعي حسب القسم، متصلين بأدواتك، محكومين بقواعدك، ومتكيفين مع هيكلك الداخلي.',
        tags: ['مساعدو الأقسام','وصول قائم على الأدوار','تكامل الأدوات','التحقق البشري'],
        cta: 'تصميم نظامك',
      },
    ],
  },
  zh: {
    eyebrow: '应用场景',
    h2: '围绕真实业务运营构建。',
    desc: '从销售到财务、支持、运营和管理，Mindzy 围绕真正推动公司前进的工作流程构建 AI 基础设施。',
    bottomCta: '预约基础设施审计',
    cases: [
      {
        cat: '销售', title: '销售加速',
        desc: '在不失去人工控制的情况下，对线索进行资质筛查、丰富 CRM 数据、准备跟进、汇总通话并自动化管道更新。',
        tags: ['线索资质筛查','CRM 数据丰富','跟进自动化','会议摘要'],
        cta: '构建此工作流',
      },
      {
        cat: '运营', title: '运营自动化',
        desc: '将重复性内部流程转化为具有明确验证、任务路由、提醒和执行跟踪的结构化工作流。',
        tags: ['任务路由','流程自动化','内部提醒','工作流跟踪'],
        cta: '自动化运营',
      },
      {
        cat: '财务', title: '财务与报告',
        desc: '自动化报告、发票提取、财务文件审核、数据整合和定期管理仪表板。',
        tags: ['发票提取','财务报告','数据整合','仪表板生成'],
        cta: '改善报告',
      },
      {
        cat: '支持', title: '客户支持层',
        desc: '连接支持渠道、分类请求、起草回复、路由工单，并将敏感案例升级到合适的人员。',
        tags: ['工单分类','回复起草','知识匹配','人工升级'],
        cta: '升级支持',
      },
      {
        cat: '管理层', title: '高管指挥中心',
        desc: '为领导层提供工作流、瓶颈、待审批、团队活动和运营绩效的实时视图。',
        tags: ['工作流可视化','待审批','团队活动','绩效洞察'],
        cta: '创建可视化',
      },
      {
        cat: '全公司', title: '定制 AI 团队',
        desc: '按部门部署 AI 助手，连接您的工具，按您的规则管理，并适应您的内部层级结构。',
        tags: ['部门助手','基于角色的访问','工具集成','人工验证'],
        cta: '设计您的系统',
      },
    ],
  },
  ja: {
    eyebrow: 'ユースケース',
    h2: '実際のビジネス業務を中心に構築。',
    desc: '営業から財務、サポート、オペレーション、マネジメントまで、Mindzy は企業を本当に前進させるワークフローを中心に AI インフラを構築します。',
    bottomCta: 'インフラ監査を予約する',
    cases: [
      {
        cat: '営業', title: '営業加速',
        desc: '人間のコントロールを失わずに、リードを資格確認し、CRM データを充実させ、フォローアップを準備し、通話を要約し、パイプラインの更新を自動化します。',
        tags: ['リード資格確認','CRM データ充実','フォローアップ自動化','会議の要約'],
        cta: 'このワークフローを構築',
      },
      {
        cat: 'オペレーション', title: 'オペレーション自動化',
        desc: '繰り返しの社内プロセスを、明確な検証、タスクルーティング、アラート、実行トラッキングを備えた構造化されたワークフローに変換します。',
        tags: ['タスクルーティング','プロセス自動化','内部アラート','ワークフロートラッキング'],
        cta: 'オペレーションを自動化',
      },
      {
        cat: '財務', title: '財務とレポート',
        desc: 'レポート作成、請求書抽出、財務文書レビュー、データ統合、定期的な管理ダッシュボードを自動化します。',
        tags: ['請求書抽出','財務レポート','データ統合','ダッシュボード生成'],
        cta: 'レポートを改善',
      },
      {
        cat: 'サポート', title: 'カスタマーサポート層',
        desc: 'サポートチャネルを接続し、リクエストを分類し、返信を起草し、チケットをルーティングし、デリケートなケースを適切な担当者にエスカレーションします。',
        tags: ['チケット分類','返信起草','ナレッジマッチング','人間へのエスカレーション'],
        cta: 'サポートを強化',
      },
      {
        cat: '経営', title: 'エグゼクティブコマンドセンター',
        desc: 'リーダーシップにワークフロー、ボトルネック、保留中の承認、チーム活動、運営パフォーマンスのリアルタイムビューを提供します。',
        tags: ['ワークフロー可視性','承認待ち','チーム活動','パフォーマンスインサイト'],
        cta: '可視性を作成',
      },
      {
        cat: '全社', title: 'カスタム AI ワークフォース',
        desc: '部門ごとに AI アシスタントを展開し、ツールに接続し、ルールに従って管理し、社内の階層に適応させます。',
        tags: ['部門アシスタント','ロールベースのアクセス','ツール統合','人間による検証'],
        cta: 'システムを設計',
      },
    ],
  },
  ru: {
    eyebrow: 'Случаи применения',
    h2: 'Построено вокруг реальных бизнес-операций.',
    desc: 'От продаж до финансов, поддержки, операций и управления — Mindzy строит AI-инфраструктуру вокруг рабочих процессов, которые действительно двигают вашу компанию вперёд.',
    bottomCta: 'Заказать аудит инфраструктуры',
    cases: [
      {
        cat: 'Продажи', title: 'Ускорение продаж',
        desc: 'Квалифицируйте лиды, обогащайте данные CRM, готовьте follow-up, суммируйте звонки и автоматизируйте обновления воронки, сохраняя человеческий контроль.',
        tags: ['Квалификация лидов','Обогащение CRM','Автоматизация follow-up','Резюме встреч'],
        cta: 'Построить этот процесс',
      },
      {
        cat: 'Операции', title: 'Автоматизация операций',
        desc: 'Превращайте повторяющиеся внутренние процессы в структурированные рабочие потоки с чёткой валидацией, маршрутизацией задач, уведомлениями и отслеживанием.',
        tags: ['Маршрутизация задач','Автоматизация процессов','Внутренние уведомления','Отслеживание процессов'],
        cta: 'Автоматизировать операции',
      },
      {
        cat: 'Финансы', title: 'Финансы и отчётность',
        desc: 'Автоматизируйте отчётность, извлечение счетов, проверку финансовых документов, консолидацию данных и регулярные управленческие дашборды.',
        tags: ['Извлечение счетов','Финансовая отчётность','Консолидация данных','Генерация дашбордов'],
        cta: 'Улучшить отчётность',
      },
      {
        cat: 'Поддержка', title: 'Слой клиентской поддержки',
        desc: 'Подключайте каналы поддержки, классифицируйте запросы, составляйте ответы, маршрутизируйте тикеты и эскалируйте чувствительные кейсы нужному специалисту.',
        tags: ['Классификация тикетов','Составление ответов','Подбор знаний','Эскалация человеку'],
        cta: 'Улучшить поддержку',
      },
      {
        cat: 'Управление', title: 'Исполнительный командный центр',
        desc: 'Дайте руководству представление в реальном времени о рабочих процессах, узких местах, ожидающих согласованиях, активности команды и операционной эффективности.',
        tags: ['Прозрачность процессов','Ожидающие согласования','Активность команды','Аналитика эффективности'],
        cta: 'Создать прозрачность',
      },
      {
        cat: 'Для всей компании', title: 'Индивидуальная AI-команда',
        desc: 'Разворачивайте AI-ассистентов по подразделениям, подключённых к вашим инструментам, управляемых вашими правилами и адаптированных к вашей внутренней иерархии.',
        tags: ['Ассистенты по отделам','Доступ на основе ролей','Интеграция инструментов','Проверка человеком'],
        cta: 'Спроектировать систему',
      },
    ],
  },
}

const BOOK_URL = 'https://calendar.app.google/ghE79tSFxmea4Scd9'

export function UseCasesSection({ locale = 'en' }: { locale?: string }) {
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <section className="py-16 md:py-[120px]">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div style={{ maxWidth: '740px', marginBottom: '60px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ai-accent)' }}>{t.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.22, margin: '12px 0 18px', letterSpacing: '-0.015em' }}>
            {t.h2}
          </h2>
          <p style={{ color: 'var(--ai-fg-muted)', fontSize: '17px', lineHeight: 1.68, maxWidth: '620px' }}>
            {t.desc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.cases.map(card => (
            <div key={card.title} style={{
              background: 'var(--ai-surface)', border: '1px solid var(--ai-border)', borderRadius: '20px',
              padding: '28px 28px 26px', display: 'flex', flexDirection: 'column', gap: '14px',
              transition: 'border-color 160ms cubic-bezier(.2,.7,.2,1), box-shadow 280ms cubic-bezier(.2,.7,.2,1), transform 280ms cubic-bezier(.2,.7,.2,1)',
            }}
              className="hover:border-[rgba(124,58,237,0.22)] hover:shadow-[0_10px_40px_rgba(124,58,237,0.08)] hover:-translate-y-[3px]">

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '10.5px', letterSpacing: '.10em', textTransform: 'uppercase', color: 'var(--ai-accent)', fontWeight: 500 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--ai-accent)', opacity: .65, flexShrink: 0, display: 'block' }} />
                {card.cat}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif-ai)', fontSize: '20px', lineHeight: 1.25, letterSpacing: '-0.01em', margin: 0 }}>{card.title}</h3>

              <p style={{ color: 'var(--ai-fg-muted)', fontSize: '13.5px', lineHeight: 1.68, flex: 1, margin: 0 }}>{card.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {card.tags.map(tag => (
                  <span key={tag} style={{ padding: '3px 10px', border: '1px solid var(--ai-border)', borderRadius: '999px', fontSize: '10.5px', color: 'var(--ai-fg-soft)', background: 'var(--ai-bg-3)', letterSpacing: '0.01em' }}>{tag}</span>
                ))}
              </div>

              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--ai-accent)', fontSize: '13px', fontWeight: 500, marginTop: '6px', textDecoration: 'none' }}
                className="hover:gap-[9px] transition-all">
                {card.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '56px', textAlign: 'center' }}>
          <a
            href={BOOK_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '999px', background: 'var(--ai-accent)', color: '#fff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px color-mix(in srgb,var(--ai-accent) 38%,transparent)' }}
            className="hover:bg-[var(--ai-accent-hover)] hover:-translate-y-0.5 transition-all"
          >
            {t.bottomCta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection
