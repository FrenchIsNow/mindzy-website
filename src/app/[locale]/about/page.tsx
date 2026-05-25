'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { GlassButton } from '@/components/ui/GlassButton'
import { JsonLd, jsonLdBreadcrumb } from '@/lib/seo'

const FOUNDERS = [
  {
    '@type': 'Person',
    name: 'Romuald Cocotier',
    jobTitle: 'Founder & CEO · AI Expert',
    worksFor: { '@type': 'Organization', name: 'Mindzy' },
    url: 'https://mindzy.me/en/p/cocotier',
    sameAs: ['https://www.linkedin.com/in/r-cocotier/'],
  },
  {
    '@type': 'Person',
    name: 'William Martel',
    jobTitle: 'Founder & CFO · Fund Advisor',
    worksFor: { '@type': 'Organization', name: 'Mindzy' },
    url: 'https://mindzy.me/en/p/martel',
    sameAs: ['https://www.linkedin.com/in/williamartel/'],
  },
] as const

const aboutOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mindzy',
  url: 'https://mindzy.me',
  logo: 'https://mindzy.me/logo.svg',
  description:
    'Mindzy designs and deploys custom AI infrastructure for companies of all sizes and maturity levels — adapted to how each company actually works, with structure, validation, and human control at every step.',
  foundingDate: '2024',
  founder: FOUNDERS,
  email: 'contact@mindzy.me',
  sameAs: ['https://linkedin.com/company/mindzy'],
}

const TRANSLATIONS = {
  en: {
    heroEyebrow: `About`,
    heroHeadline: `AI infrastructure, built around your business.`,
    heroDesc: `Mindzy designs and deploys custom AI infrastructure for companies of all sizes and maturity levels. We adapt the technology to how each company actually works — with structure, validation, and human control at every step.`,
    heroCta: `Explore Our Services`,
    label01: `01 — Origin`,
    label02: `02 — Method`,
    label03: `03 — Vision`,
    label04: `04 — Founders`,
    s01h2a: `From digital execution to`,
    s01h2b: `operational infrastructure.`,
    s01p1: `Mindzy started by building websites, platforms, software, and automation systems for ambitious companies.`,
    s01p2: `Over time, we saw the same problem everywhere: companies were not missing tools — they were missing structure.`,
    s01p3: `Too many manual tasks. Too many disconnected systems. Too much operational friction.`,
    s01p4: `So we evolved from digital delivery to AI infrastructure.`,
    s01pullquote: `Today, we build the systems that help companies work faster, smarter, and with more control.`,
    s02h2a: `Diagnose first.`,
    s02h2b: `Deploy second.`,
    s02p1: `Every project starts with a clear audit of your company: tools, workflows, teams, bottlenecks, and priorities.`,
    s02p2: `Then we build a custom infrastructure adapted to your real operations.`,
    s02p3: `We deploy progressively:`,
    s02list: [
      `workflow by workflow;`,
      `department by department;`,
      `with validation rules;`,
      `with human control;`,
      `with measurable outcomes.`,
    ],
    s02p4: `No generic agents. No useless complexity. No disruptive rollout.`,
    s02p5: `Only practical infrastructure your team can understand, trust, and use.`,
    s03h2a: `AI should create`,
    s03h2b: `leverage, not chaos.`,
    s03p1: `Most companies do not need to become AI-native overnight. They need to integrate AI intelligently into the way they already work.`,
    s03p2: `The companies that win will be the ones using AI with structure: clear roles, permissions, integrations, dashboards, audit trails, and human validation.`,
    s03pullquote: `Without structure, AI adds noise. With the right infrastructure, AI becomes operational leverage.`,
    s03p3: `That is what Mindzy builds.`,
    s04h2a: `The people`,
    s04h2b: `behind the infrastructure.`,
    founderRoleCFO: `Founder — CFO`,
    founderRoleCEO: `Founder — CEO`,
    ctaHeadlineA: `Talk`,
    ctaHeadlineB: `to us`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 minutes. We listen first, we recommend second.`,
    ctaButton: `Book a call`,
  },
  fr: {
    heroEyebrow: `À propos`,
    heroHeadline: `Infrastructure IA, construite autour de votre entreprise.`,
    heroDesc: `Mindzy conçoit et déploie des infrastructures IA sur mesure pour les entreprises de toutes tailles et de tous niveaux de maturité. Nous adaptons la technologie à la façon dont chaque entreprise fonctionne réellement — avec structure, validation et contrôle humain à chaque étape.`,
    heroCta: `Explorer nos services`,
    label01: `01 — Origine`,
    label02: `02 — Méthode`,
    label03: `03 — Vision`,
    label04: `04 — Fondateurs`,
    s01h2a: `De l'exécution digitale à`,
    s01h2b: `l'infrastructure opérationnelle.`,
    s01p1: `Mindzy a commencé par concevoir des sites web, des plateformes, des logiciels et des systèmes d'automatisation pour des entreprises ambitieuses.`,
    s01p2: `Avec le temps, nous avons observé le même problème partout : les entreprises ne manquaient pas d'outils — elles manquaient de structure.`,
    s01p3: `Trop de tâches manuelles. Trop de systèmes déconnectés. Trop de friction opérationnelle.`,
    s01p4: `Nous avons donc évolué de la livraison digitale vers l'infrastructure IA.`,
    s01pullquote: `Aujourd'hui, nous construisons les systèmes qui aident les entreprises à travailler plus vite, plus intelligemment et avec plus de contrôle.`,
    s02h2a: `Diagnostiquer d'abord.`,
    s02h2b: `Déployer ensuite.`,
    s02p1: `Chaque projet débute par un audit clair de votre entreprise : outils, processus, équipes, goulots d'étranglement et priorités.`,
    s02p2: `Nous construisons ensuite une infrastructure sur mesure adaptée à vos opérations réelles.`,
    s02p3: `Nous déployons progressivement :`,
    s02list: [
      `processus par processus ;`,
      `département par département ;`,
      `avec des règles de validation ;`,
      `avec un contrôle humain ;`,
      `avec des résultats mesurables.`,
    ],
    s02p4: `Pas d'agents génériques. Pas de complexité inutile. Pas de déploiement brutal.`,
    s02p5: `Uniquement une infrastructure pratique que votre équipe peut comprendre, approuver et utiliser.`,
    s03h2a: `L'IA doit créer`,
    s03h2b: `du levier, pas du chaos.`,
    s03p1: `La plupart des entreprises n'ont pas besoin de devenir IA-natives du jour au lendemain. Elles doivent intégrer l'IA intelligemment dans leur façon de travailler.`,
    s03p2: `Les entreprises qui réussiront seront celles qui utilisent l'IA avec structure : rôles clairs, permissions, intégrations, tableaux de bord, pistes d'audit et validation humaine.`,
    s03pullquote: `Sans structure, l'IA génère du bruit. Avec la bonne infrastructure, l'IA devient un levier opérationnel.`,
    s03p3: `C'est ce que Mindzy construit.`,
    s04h2a: `Les personnes`,
    s04h2b: `derrière l'infrastructure.`,
    founderRoleCFO: `Fondateur — CFO`,
    founderRoleCEO: `Fondateur — CEO`,
    ctaHeadlineA: `Parlons`,
    ctaHeadlineB: `de vous`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 minutes. Nous écoutons d'abord, nous recommandons ensuite.`,
    ctaButton: `Réserver un appel`,
  },
  es: {
    heroEyebrow: `Acerca de`,
    heroHeadline: `Infraestructura de IA, construida alrededor de su empresa.`,
    heroDesc: `Mindzy diseña e implementa infraestructura de IA personalizada para empresas de todos los tamaños y niveles de madurez. Adaptamos la tecnología a la forma en que cada empresa realmente trabaja — con estructura, validación y control humano en cada paso.`,
    heroCta: `Explorar nuestros servicios`,
    label01: `01 — Origen`,
    label02: `02 — Método`,
    label03: `03 — Visión`,
    label04: `04 — Fundadores`,
    s01h2a: `De la ejecución digital a`,
    s01h2b: `la infraestructura operacional.`,
    s01p1: `Mindzy comenzó construyendo sitios web, plataformas, software y sistemas de automatización para empresas ambiciosas.`,
    s01p2: `Con el tiempo, vimos el mismo problema en todas partes: las empresas no carecían de herramientas — carecían de estructura.`,
    s01p3: `Demasiadas tareas manuales. Demasiados sistemas desconectados. Demasiada fricción operativa.`,
    s01p4: `Así evolucionamos de la entrega digital a la infraestructura de IA.`,
    s01pullquote: `Hoy, construimos los sistemas que ayudan a las empresas a trabajar más rápido, de forma más inteligente y con mayor control.`,
    s02h2a: `Diagnosticar primero.`,
    s02h2b: `Implementar después.`,
    s02p1: `Cada proyecto comienza con una auditoría clara de su empresa: herramientas, flujos de trabajo, equipos, cuellos de botella y prioridades.`,
    s02p2: `Luego construimos una infraestructura personalizada adaptada a sus operaciones reales.`,
    s02p3: `Implementamos de forma progresiva:`,
    s02list: [
      `flujo de trabajo por flujo de trabajo;`,
      `departamento por departamento;`,
      `con reglas de validación;`,
      `con control humano;`,
      `con resultados medibles.`,
    ],
    s02p4: `Sin agentes genéricos. Sin complejidad inútil. Sin implementación disruptiva.`,
    s02p5: `Solo infraestructura práctica que su equipo puede entender, confiar y usar.`,
    s03h2a: `La IA debe crear`,
    s03h2b: `apalancamiento, no caos.`,
    s03p1: `La mayoría de las empresas no necesitan volverse nativas en IA de la noche a la mañana. Necesitan integrar la IA de forma inteligente en su forma actual de trabajar.`,
    s03p2: `Las empresas que triunfen serán las que usen la IA con estructura: roles claros, permisos, integraciones, paneles de control, registros de auditoría y validación humana.`,
    s03pullquote: `Sin estructura, la IA genera ruido. Con la infraestructura correcta, la IA se convierte en apalancamiento operativo.`,
    s03p3: `Eso es lo que Mindzy construye.`,
    s04h2a: `Las personas`,
    s04h2b: `detrás de la infraestructura.`,
    founderRoleCFO: `Fundador — CFO`,
    founderRoleCEO: `Fundador — CEO`,
    ctaHeadlineA: `Hablemos`,
    ctaHeadlineB: `con nosotros`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 minutos. Primero escuchamos, luego recomendamos.`,
    ctaButton: `Reservar una llamada`,
  },
  de: {
    heroEyebrow: `Über uns`,
    heroHeadline: `KI-Infrastruktur, aufgebaut um Ihr Unternehmen.`,
    heroDesc: `Mindzy entwirft und implementiert maßgeschneiderte KI-Infrastruktur für Unternehmen jeder Größe und jedes Reifegrads. Wir passen die Technologie an die tatsächliche Arbeitsweise jedes Unternehmens an — mit Struktur, Validierung und menschlicher Kontrolle auf jedem Schritt.`,
    heroCta: `Unsere Leistungen entdecken`,
    label01: `01 — Ursprung`,
    label02: `02 — Methode`,
    label03: `03 — Vision`,
    label04: `04 — Gründer`,
    s01h2a: `Von der digitalen Umsetzung zur`,
    s01h2b: `operativen Infrastruktur.`,
    s01p1: `Mindzy begann damit, Websites, Plattformen, Software und Automatisierungssysteme für ambitionierte Unternehmen zu entwickeln.`,
    s01p2: `Mit der Zeit stellten wir überall dasselbe Problem fest: Unternehmen fehlte es nicht an Werkzeugen — ihnen fehlte die Struktur.`,
    s01p3: `Zu viele manuelle Aufgaben. Zu viele unverbundene Systeme. Zu viel operativer Reibungsverlust.`,
    s01p4: `So entwickelten wir uns von der digitalen Lieferung zur KI-Infrastruktur.`,
    s01pullquote: `Heute bauen wir die Systeme, die Unternehmen helfen, schneller, intelligenter und mit mehr Kontrolle zu arbeiten.`,
    s02h2a: `Erst diagnostizieren.`,
    s02h2b: `Dann implementieren.`,
    s02p1: `Jedes Projekt beginnt mit einer klaren Prüfung Ihres Unternehmens: Werkzeuge, Arbeitsabläufe, Teams, Engpässe und Prioritäten.`,
    s02p2: `Anschließend erstellen wir eine maßgeschneiderte Infrastruktur, die auf Ihre realen Abläufe abgestimmt ist.`,
    s02p3: `Wir implementieren schrittweise:`,
    s02list: [
      `Arbeitsablauf für Arbeitsablauf;`,
      `Abteilung für Abteilung;`,
      `mit Validierungsregeln;`,
      `mit menschlicher Kontrolle;`,
      `mit messbaren Ergebnissen.`,
    ],
    s02p4: `Keine generischen Agenten. Keine unnötige Komplexität. Kein disruptiver Rollout.`,
    s02p5: `Nur praktische Infrastruktur, die Ihr Team verstehen, vertrauen und nutzen kann.`,
    s03h2a: `KI sollte`,
    s03h2b: `Hebelwirkung erzeugen, nicht Chaos.`,
    s03p1: `Die meisten Unternehmen müssen nicht über Nacht KI-nativ werden. Sie müssen KI intelligent in ihre bestehende Arbeitsweise integrieren.`,
    s03p2: `Die erfolgreichen Unternehmen werden jene sein, die KI mit Struktur einsetzen: klare Rollen, Berechtigungen, Integrationen, Dashboards, Auditpfade und menschliche Validierung.`,
    s03pullquote: `Ohne Struktur erzeugt KI Lärm. Mit der richtigen Infrastruktur wird KI zur operativen Hebelkraft.`,
    s03p3: `Genau das baut Mindzy.`,
    s04h2a: `Die Menschen`,
    s04h2b: `hinter der Infrastruktur.`,
    founderRoleCFO: `Gründer — CFO`,
    founderRoleCEO: `Gründer — CEO`,
    ctaHeadlineA: `Sprechen Sie`,
    ctaHeadlineB: `mit uns`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 Minuten. Wir hören zuerst zu, dann empfehlen wir.`,
    ctaButton: `Gespräch buchen`,
  },
  it: {
    heroEyebrow: `Chi siamo`,
    heroHeadline: `Infrastruttura AI, costruita intorno alla tua azienda.`,
    heroDesc: `Mindzy progetta e implementa infrastrutture AI personalizzate per aziende di ogni dimensione e livello di maturità. Adattiamo la tecnologia al modo in cui ogni azienda lavora realmente — con struttura, validazione e controllo umano a ogni passo.`,
    heroCta: `Esplora i nostri servizi`,
    label01: `01 — Origine`,
    label02: `02 — Metodo`,
    label03: `03 — Visione`,
    label04: `04 — Fondatori`,
    s01h2a: `Dall'esecuzione digitale all'`,
    s01h2b: `infrastruttura operativa.`,
    s01p1: `Mindzy ha iniziato costruendo siti web, piattaforme, software e sistemi di automazione per aziende ambiziose.`,
    s01p2: `Nel tempo, abbiamo visto lo stesso problema ovunque: alle aziende non mancavano gli strumenti — mancava la struttura.`,
    s01p3: `Troppi compiti manuali. Troppi sistemi disconnessi. Troppo attrito operativo.`,
    s01p4: `Così siamo evoluti dalla consegna digitale all'infrastruttura AI.`,
    s01pullquote: `Oggi costruiamo i sistemi che aiutano le aziende a lavorare più velocemente, in modo più intelligente e con maggiore controllo.`,
    s02h2a: `Prima diagnosticare.`,
    s02h2b: `Poi implementare.`,
    s02p1: `Ogni progetto inizia con un audit chiaro della tua azienda: strumenti, flussi di lavoro, team, colli di bottiglia e priorità.`,
    s02p2: `Poi costruiamo un'infrastruttura personalizzata adattata alle tue operazioni reali.`,
    s02p3: `Implementiamo progressivamente:`,
    s02list: [
      `flusso di lavoro per flusso di lavoro;`,
      `dipartimento per dipartimento;`,
      `con regole di validazione;`,
      `con controllo umano;`,
      `con risultati misurabili.`,
    ],
    s02p4: `Nessun agente generico. Nessuna complessità inutile. Nessun rollout dirompente.`,
    s02p5: `Solo infrastruttura pratica che il tuo team può capire, fidarsi e usare.`,
    s03h2a: `L'AI dovrebbe creare`,
    s03h2b: `leva, non caos.`,
    s03p1: `La maggior parte delle aziende non ha bisogno di diventare AI-native dall'oggi al domani. Deve integrare l'AI in modo intelligente nel modo in cui già lavora.`,
    s03p2: `Le aziende che vinceranno saranno quelle che usano l'AI con struttura: ruoli chiari, permessi, integrazioni, dashboard, audit trail e validazione umana.`,
    s03pullquote: `Senza struttura, l'AI genera rumore. Con la giusta infrastruttura, l'AI diventa leva operativa.`,
    s03p3: `Questo è ciò che Mindzy costruisce.`,
    s04h2a: `Le persone`,
    s04h2b: `dietro l'infrastruttura.`,
    founderRoleCFO: `Fondatore — CFO`,
    founderRoleCEO: `Fondatore — CEO`,
    ctaHeadlineA: `Parliamo`,
    ctaHeadlineB: `con noi`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 minuti. Prima ascoltiamo, poi raccomandiamo.`,
    ctaButton: `Prenota una chiamata`,
  },
  pt: {
    heroEyebrow: `Sobre nós`,
    heroHeadline: `Infraestrutura de IA, construída em torno do seu negócio.`,
    heroDesc: `A Mindzy projeta e implementa infraestrutura de IA personalizada para empresas de todos os tamanhos e níveis de maturidade. Adaptamos a tecnologia à forma como cada empresa realmente trabalha — com estrutura, validação e controlo humano em cada etapa.`,
    heroCta: `Explorar os nossos serviços`,
    label01: `01 — Origem`,
    label02: `02 — Método`,
    label03: `03 — Visão`,
    label04: `04 — Fundadores`,
    s01h2a: `Da execução digital à`,
    s01h2b: `infraestrutura operacional.`,
    s01p1: `A Mindzy começou por construir websites, plataformas, software e sistemas de automação para empresas ambiciosas.`,
    s01p2: `Com o tempo, vimos o mesmo problema em todo o lado: as empresas não precisavam de mais ferramentas — precisavam de estrutura.`,
    s01p3: `Demasiadas tarefas manuais. Demasiados sistemas desconectados. Demasiado atrito operacional.`,
    s01p4: `Assim, evoluímos da entrega digital para a infraestrutura de IA.`,
    s01pullquote: `Hoje, construímos os sistemas que ajudam as empresas a trabalhar mais rápido, de forma mais inteligente e com maior controlo.`,
    s02h2a: `Diagnosticar primeiro.`,
    s02h2b: `Implementar depois.`,
    s02p1: `Cada projeto começa com uma auditoria clara da sua empresa: ferramentas, fluxos de trabalho, equipas, estrangulamentos e prioridades.`,
    s02p2: `Em seguida, construímos uma infraestrutura personalizada adaptada às suas operações reais.`,
    s02p3: `Implementamos progressivamente:`,
    s02list: [
      `fluxo de trabalho a fluxo de trabalho;`,
      `departamento a departamento;`,
      `com regras de validação;`,
      `com controlo humano;`,
      `com resultados mensuráveis.`,
    ],
    s02p4: `Sem agentes genéricos. Sem complexidade inútil. Sem implementação disruptiva.`,
    s02p5: `Apenas infraestrutura prática que a sua equipa pode compreender, confiar e utilizar.`,
    s03h2a: `A IA deve criar`,
    s03h2b: `alavancagem, não caos.`,
    s03p1: `A maioria das empresas não precisa de se tornar nativa em IA de um dia para o outro. Precisam de integrar a IA de forma inteligente na sua forma de trabalhar.`,
    s03p2: `As empresas que vencerão serão as que usam a IA com estrutura: papéis claros, permissões, integrações, dashboards, trilhas de auditoria e validação humana.`,
    s03pullquote: `Sem estrutura, a IA gera ruído. Com a infraestrutura certa, a IA torna-se alavancagem operacional.`,
    s03p3: `É isso que a Mindzy constrói.`,
    s04h2a: `As pessoas`,
    s04h2b: `por trás da infraestrutura.`,
    founderRoleCFO: `Fundador — CFO`,
    founderRoleCEO: `Fundador — CEO`,
    ctaHeadlineA: `Fale`,
    ctaHeadlineB: `connosco`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 minutos. Ouvimos primeiro, recomendamos depois.`,
    ctaButton: `Marcar uma chamada`,
  },
  ar: {
    heroEyebrow: `من نحن`,
    heroHeadline: `بنية تحتية للذكاء الاصطناعي، مبنية حول عملك.`,
    heroDesc: `تصمم Mindzy وتنشر بنية تحتية مخصصة للذكاء الاصطناعي للشركات من جميع الأحجام ومستويات النضج. نكيّف التكنولوجيا مع الطريقة الفعلية التي تعمل بها كل شركة — مع الهيكل والتحقق والتحكم البشري في كل خطوة.`,
    heroCta: `استكشف خدماتنا`,
    label01: `01 — النشأة`,
    label02: `02 — المنهج`,
    label03: `03 — الرؤية`,
    label04: `04 — المؤسسون`,
    s01h2a: `من التنفيذ الرقمي إلى`,
    s01h2b: `البنية التحتية التشغيلية.`,
    s01p1: `بدأت Mindzy ببناء مواقع الويب والمنصات والبرمجيات وأنظمة الأتمتة للشركات الطموحة.`,
    s01p2: `بمرور الوقت، رأينا نفس المشكلة في كل مكان: لم تكن الشركات تفتقر إلى الأدوات — كانت تفتقر إلى الهيكل.`,
    s01p3: `كثير من المهام اليدوية. كثير من الأنظمة المنفصلة. كثير من الاحتكاك التشغيلي.`,
    s01p4: `لذا تطورنا من التسليم الرقمي إلى البنية التحتية للذكاء الاصطناعي.`,
    s01pullquote: `اليوم، نبني الأنظمة التي تساعد الشركات على العمل بشكل أسرع وأذكى ومع مزيد من التحكم.`,
    s02h2a: `التشخيص أولاً.`,
    s02h2b: `النشر ثانياً.`,
    s02p1: `يبدأ كل مشروع بمراجعة واضحة لشركتك: الأدوات وسير العمل والفرق ونقاط الاختناق والأولويات.`,
    s02p2: `ثم نبني بنية تحتية مخصصة تتناسب مع عملياتك الفعلية.`,
    s02p3: `ننشر تدريجياً:`,
    s02list: [
      `سير عمل تلو الآخر؛`,
      `قسم تلو الآخر؛`,
      `مع قواعد التحقق؛`,
      `مع التحكم البشري؛`,
      `مع نتائج قابلة للقياس.`,
    ],
    s02p4: `لا وكلاء عامون. لا تعقيد غير ضروري. لا طرح تعطيلي.`,
    s02p5: `فقط بنية تحتية عملية يمكن لفريقك فهمها والثقة بها واستخدامها.`,
    s03h2a: `يجب أن يخلق الذكاء الاصطناعي`,
    s03h2b: `رافعة، لا فوضى.`,
    s03p1: `معظم الشركات لا تحتاج إلى أن تصبح متحضّرة بالذكاء الاصطناعي بين عشية وضحاها. تحتاج إلى دمج الذكاء الاصطناعي بذكاء في الطريقة التي تعمل بها بالفعل.`,
    s03p2: `الشركات التي ستنتصر ستكون تلك التي تستخدم الذكاء الاصطناعي مع الهيكل: أدوار واضحة وصلاحيات وتكاملات ولوحات تحكم ومسارات تدقيق والتحقق البشري.`,
    s03pullquote: `بدون هيكل، يضيف الذكاء الاصطناعي ضوضاء. مع البنية التحتية الصحيحة، يصبح الذكاء الاصطناعي رافعة تشغيلية.`,
    s03p3: `هذا ما تبنيه Mindzy.`,
    s04h2a: `الأشخاص`,
    s04h2b: `خلف البنية التحتية.`,
    founderRoleCFO: `مؤسس — المدير المالي`,
    founderRoleCEO: `مؤسس — الرئيس التنفيذي`,
    ctaHeadlineA: `تحدث`,
    ctaHeadlineB: `إلينا`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 دقيقة. نستمع أولاً، ثم نوصي.`,
    ctaButton: `احجز مكالمة`,
  },
  zh: {
    heroEyebrow: `关于我们`,
    heroHeadline: `围绕您的业务构建的 AI 基础设施。`,
    heroDesc: `Mindzy 为各种规模和成熟度的企业设计并部署定制化 AI 基础设施。我们将技术适配到每家企业实际的工作方式——在每个步骤都提供结构、验证和人工控制。`,
    heroCta: `探索我们的服务`,
    label01: `01 — 起源`,
    label02: `02 — 方法`,
    label03: `03 — 愿景`,
    label04: `04 — 创始人`,
    s01h2a: `从数字化执行到`,
    s01h2b: `运营基础设施。`,
    s01p1: `Mindzy 最初为雄心勃勃的企业构建网站、平台、软件和自动化系统。`,
    s01p2: `随着时间的推移，我们在各处看到同样的问题：企业并不缺乏工具——而是缺乏结构。`,
    s01p3: `太多手动任务。太多孤立系统。太多运营摩擦。`,
    s01p4: `因此我们从数字交付演进为 AI 基础设施。`,
    s01pullquote: `今天，我们构建帮助企业更快、更智能、更有控制地工作的系统。`,
    s02h2a: `先诊断。`,
    s02h2b: `再部署。`,
    s02p1: `每个项目都从对您公司的清晰审计开始：工具、工作流程、团队、瓶颈和优先事项。`,
    s02p2: `然后我们构建适合您实际运营的定制化基础设施。`,
    s02p3: `我们逐步部署：`,
    s02list: [
      `逐个工作流；`,
      `逐个部门；`,
      `带有验证规则；`,
      `带有人工控制；`,
      `具有可量化的成果。`,
    ],
    s02p4: `没有通用代理。没有无谓的复杂性。没有颠覆性部署。`,
    s02p5: `只有您的团队能够理解、信任和使用的实用基础设施。`,
    s03h2a: `AI 应该创造`,
    s03h2b: `杠杆，而非混乱。`,
    s03p1: `大多数企业不需要一夜之间成为 AI 原生企业。他们需要智能地将 AI 整合到现有的工作方式中。`,
    s03p2: `胜出的企业将是那些有结构地使用 AI 的企业：清晰的角色、权限、集成、仪表板、审计跟踪和人工验证。`,
    s03pullquote: `没有结构，AI 只会制造噪音。有了正确的基础设施，AI 就会成为运营杠杆。`,
    s03p3: `这正是 Mindzy 所构建的。`,
    s04h2a: `基础设施`,
    s04h2b: `背后的人。`,
    founderRoleCFO: `联合创始人 — 首席财务官`,
    founderRoleCEO: `联合创始人 — 首席执行官`,
    ctaHeadlineA: `与`,
    ctaHeadlineB: `我们交流`,
    ctaHeadlineEnd: `。`,
    ctaBody: `30 分钟。我们先倾听，再建议。`,
    ctaButton: `预约通话`,
  },
  ja: {
    heroEyebrow: `私たちについて`,
    heroHeadline: `ビジネスに合わせて構築された AI インフラ。`,
    heroDesc: `Mindzy は、あらゆる規模と成熟度の企業向けにカスタム AI インフラを設計・展開します。各企業の実際の働き方に合わせて技術を適応させ、すべてのステップで構造、検証、人間によるコントロールを提供します。`,
    heroCta: `サービスを見る`,
    label01: `01 — 起源`,
    label02: `02 — 方法`,
    label03: `03 — ビジョン`,
    label04: `04 — 創業者`,
    s01h2a: `デジタル実行から`,
    s01h2b: `運用インフラへ。`,
    s01p1: `Mindzy は、意欲的な企業のためにウェブサイト、プラットフォーム、ソフトウェア、自動化システムを構築することから始まりました。`,
    s01p2: `時が経つにつれ、私たちはどこでも同じ問題を目の当たりにしました。企業に欠けていたのはツールではなく、構造でした。`,
    s01p3: `手動タスクが多すぎる。切り離されたシステムが多すぎる。運用上の摩擦が多すぎる。`,
    s01p4: `そこで私たちはデジタル納品から AI インフラへと進化しました。`,
    s01pullquote: `今日、私たちは企業がより速く、よりスマートに、より多くのコントロールを持って働けるシステムを構築しています。`,
    s02h2a: `まず診断する。`,
    s02h2b: `次に展開する。`,
    s02p1: `すべてのプロジェクトは、御社の明確な監査から始まります：ツール、ワークフロー、チーム、ボトルネック、優先事項。`,
    s02p2: `その後、実際の業務に適応したカスタムインフラを構築します。`,
    s02p3: `段階的に展開します：`,
    s02list: [
      `ワークフローごとに；`,
      `部門ごとに；`,
      `検証ルールを設けて；`,
      `人間によるコントロールを維持して；`,
      `測定可能な成果を伴って。`,
    ],
    s02p4: `汎用エージェントなし。無駄な複雑さなし。混乱を招くロールアウトなし。`,
    s02p5: `チームが理解し、信頼し、使用できる実用的なインフラのみ。`,
    s03h2a: `AI は`,
    s03h2b: `レバレッジを生むべきで、混乱ではない。`,
    s03p1: `ほとんどの企業は一夜にして AI ネイティブになる必要はありません。すでに機能している働き方に AI をインテリジェントに統合する必要があります。`,
    s03p2: `勝つ企業は、AI を構造的に使用するものです：明確な役割、権限、統合、ダッシュボード、監査証跡、人間による検証。`,
    s03pullquote: `構造がなければ、AI はノイズを加えるだけです。適切なインフラがあれば、AI は運用上のレバレッジになります。`,
    s03p3: `それが Mindzy の構築するものです。`,
    s04h2a: `インフラを`,
    s04h2b: `支える人々。`,
    founderRoleCFO: `共同創業者 — CFO`,
    founderRoleCEO: `共同創業者 — CEO`,
    ctaHeadlineA: `お気軽に`,
    ctaHeadlineB: `ご相談ください`,
    ctaHeadlineEnd: `。`,
    ctaBody: `30 分間。まずお話を伺い、その後ご提案します。`,
    ctaButton: `通話を予約する`,
  },
  ru: {
    heroEyebrow: `О нас`,
    heroHeadline: `ИИ-инфраструктура, построенная вокруг вашего бизнеса.`,
    heroDesc: `Mindzy проектирует и внедряет кастомную ИИ-инфраструктуру для компаний любого размера и уровня зрелости. Мы адаптируем технологии к тому, как каждая компания работает в реальности — со структурой, валидацией и человеческим контролем на каждом этапе.`,
    heroCta: `Изучить наши услуги`,
    label01: `01 — Происхождение`,
    label02: `02 — Метод`,
    label03: `03 — Видение`,
    label04: `04 — Основатели`,
    s01h2a: `От цифрового исполнения к`,
    s01h2b: `операционной инфраструктуре.`,
    s01p1: `Mindzy начинал с разработки сайтов, платформ, программного обеспечения и систем автоматизации для амбициозных компаний.`,
    s01p2: `Со временем мы увидели одну и ту же проблему повсюду: компаниям не хватало не инструментов — им не хватало структуры.`,
    s01p3: `Слишком много ручных задач. Слишком много разрозненных систем. Слишком много операционных трений.`,
    s01p4: `Поэтому мы эволюционировали от цифровой доставки к ИИ-инфраструктуре.`,
    s01pullquote: `Сегодня мы строим системы, которые помогают компаниям работать быстрее, умнее и с большим контролем.`,
    s02h2a: `Сначала диагностика.`,
    s02h2b: `Потом внедрение.`,
    s02p1: `Каждый проект начинается с чёткого аудита вашей компании: инструменты, рабочие процессы, команды, узкие места и приоритеты.`,
    s02p2: `Затем мы строим кастомную инфраструктуру, адаптированную к вашим реальным операциям.`,
    s02p3: `Мы внедряем постепенно:`,
    s02list: [
      `рабочий процесс за рабочим процессом;`,
      `отдел за отделом;`,
      `с правилами валидации;`,
      `с человеческим контролем;`,
      `с измеримыми результатами.`,
    ],
    s02p4: `Никаких универсальных агентов. Никакой излишней сложности. Никакого разрушительного развёртывания.`,
    s02p5: `Только практичная инфраструктура, которую ваша команда может понять, которой можно доверять и которую можно использовать.`,
    s03h2a: `ИИ должен создавать`,
    s03h2b: `рычаг, а не хаос.`,
    s03p1: `Большинству компаний не нужно становиться ИИ-нативными за одну ночь. Им нужно интеллектуально интегрировать ИИ в существующий способ работы.`,
    s03p2: `Победят компании, использующие ИИ со структурой: чёткие роли, разрешения, интеграции, дашборды, аудиторские следы и человеческая валидация.`,
    s03pullquote: `Без структуры ИИ добавляет шум. С правильной инфраструктурой ИИ становится операционным рычагом.`,
    s03p3: `Именно это строит Mindzy.`,
    s04h2a: `Люди`,
    s04h2b: `за инфраструктурой.`,
    founderRoleCFO: `Основатель — CFO`,
    founderRoleCEO: `Основатель — CEO`,
    ctaHeadlineA: `Поговорите`,
    ctaHeadlineB: `с нами`,
    ctaHeadlineEnd: `.`,
    ctaBody: `30 минут. Сначала слушаем, потом рекомендуем.`,
    ctaButton: `Записаться на звонок`,
  },
}

const CSS = `
/* Hero */
.ab-hero { position:relative; padding:78px 0 0; background:var(--ai-bg-3); overflow:hidden; }
.ab-hero__grid-bg { position:absolute; inset:0; background-image:linear-gradient(to right,rgba(163,163,163,0.22) 1px,transparent 1px),linear-gradient(to bottom,rgba(163,163,163,0.22) 1px,transparent 1px); background-size:70px 70px; -webkit-mask-image:radial-gradient(ellipse 80% 50% at 50% 100%,#000 70%,transparent 110%); mask-image:radial-gradient(ellipse 80% 50% at 50% 100%,#000 70%,transparent 110%); z-index:0; opacity:0; transition:opacity 0.8s ease 0.6s; }
.ab-hero.is-loaded .ab-hero__grid-bg { opacity:1; }
.ab-hero__inner { position:relative; z-index:10; max-width:680px; margin:0 auto; text-align:center; padding:0 24px 56px; }
.ab-hero__eyebrow { color:var(--ai-accent); font-size:13px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:28px; display:flex; align-items:center; justify-content:center; gap:8px; opacity:0; transform:translateY(16px); transition:opacity 0.5s ease 0.1s,transform 0.5s ease 0.1s; }
.ab-hero.is-loaded .ab-hero__eyebrow { opacity:1; transform:translateY(0); }
.ab-hero__headline { font-family:var(--font-serif-ai); font-size:clamp(30px,5vw,56px); font-weight:400; line-height:1.22; letter-spacing:-0.02em; color:var(--ai-fg); margin:0 0 28px; }
.wr { display:inline-block; overflow:hidden; vertical-align:bottom; line-height:1.25; margin-right:0.28em; }
.wr__inner { display:inline-block; transform:translateY(108%); transition:transform 0.72s cubic-bezier(0.22,1,0.36,1); transition-delay:var(--d,0s); }
.ab-hero.is-loaded .wr__inner { transform:translateY(0); }
.ab-hero__desc { font-size:17px; line-height:1.7; color:var(--ai-fg-muted); margin:0 0 36px; opacity:0; transform:translateY(40px); filter:blur(8px); transition:opacity 0.7s ease var(--d,0s),transform 0.7s ease var(--d,0s),filter 0.7s ease var(--d,0s); }
.ab-hero.is-loaded .ab-hero__desc { opacity:1; transform:translateY(0); filter:blur(0); }
.ab-hero__cta-wrap { opacity:0; transition:opacity 0.6s ease var(--d,0s); }
.ab-hero.is-loaded .ab-hero__cta-wrap { opacity:1; }

/* Content sections */
.ab-section { padding:88px 0; border-top:1px solid var(--ai-border); }
.ab-section__grid { display:grid; grid-template-columns:1fr; gap:28px; }
@media(min-width:900px){.ab-section__grid{grid-template-columns:220px minmax(0,1fr);gap:64px;}}
.ab-section__label { font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--ai-fg-soft); }
@media(min-width:900px){.ab-section__label{position:sticky;top:100px;}}
.ab-section__content h2 { font-family:var(--font-serif-ai); font-size:clamp(28px,3.6vw,48px); font-weight:400; line-height:1.32; padding-bottom:0.1em; margin-bottom:22px; letter-spacing:-0.02em; }
.ab-section__content p { font-size:18px; line-height:1.65; color:var(--ai-fg-muted); max-width:64ch; }
.ab-section__content p+p { margin-top:16px; }
.pullquote { font-family:var(--font-serif-ai); font-size:25px; line-height:1.45; color:var(--ai-fg); border-left:1px solid var(--ai-accent); padding:4px 0 4px 22px; margin:28px 0; max-width:58ch; }
.method-list { list-style:none; padding:0; margin:20px 0 0; display:grid; gap:10px; }
.method-list li { display:flex; align-items:flex-start; gap:12px; font-size:18px; line-height:1.6; color:var(--ai-fg-muted); max-width:64ch; }
.method-list li::before { content:'—'; color:var(--ai-accent); flex-shrink:0; }

/* Scroll reveal */
.sr-item { opacity:0; transform:translateY(28px); transition:opacity 0.65s ease,transform 0.65s ease; transition-delay:var(--sd,0s); }
.sr-item.sr-visible { opacity:1; transform:translateY(0); }

/* Founders */
.founders-grid { display:grid; grid-template-columns:repeat(2,300px); gap:28px; margin-top:20px; }
@media(max-width:720px){.founders-grid{grid-template-columns:1fr;max-width:300px;}}
.founder-card { position:relative; background:var(--ai-bg); border-radius:28px; padding:36px 28px 28px; box-shadow:12px 12px 28px rgba(0,0,0,0.10),-12px -12px 28px rgba(255,255,255,0.88); transition:transform 480ms cubic-bezier(.2,.7,.2,1),box-shadow 480ms cubic-bezier(.2,.7,.2,1); cursor:default; overflow:hidden; }
html[data-ai-theme="black"] .founder-card { box-shadow:12px 12px 28px rgba(0,0,0,0.42),-12px -12px 28px rgba(255,255,255,0.04); }
.founder-card:hover { transform:scale(1.04) translateY(-6px); box-shadow:20px 20px 44px rgba(0,0,0,0.15),-20px -20px 44px rgba(255,255,255,0.96); }
html[data-ai-theme="black"] .founder-card:hover { box-shadow:20px 20px 44px rgba(0,0,0,0.58),-20px -20px 44px rgba(255,255,255,0.06); }
.founder-card::after { content:''; position:absolute; inset:0; border-radius:28px; border:1.5px solid color-mix(in srgb,var(--ai-accent) 45%,transparent); opacity:0; transition:opacity 480ms; pointer-events:none; }
.founder-card:hover::after { opacity:1; }
.founder-card__status { position:absolute; top:22px; right:22px; }
.status-dot { width:11px; height:11px; background:#22c55e; border-radius:50%; border:2px solid var(--ai-bg); position:relative; }
.status-dot::after { content:''; position:absolute; inset:-2px; border-radius:50%; background:#22c55e; animation:fc-ping 1.6s ease-out infinite; opacity:0.4; }
@keyframes fc-ping { 0%{transform:scale(1);opacity:0.4}75%,100%{transform:scale(2.4);opacity:0} }
.founder-card__badge { position:absolute; top:38px; right:20px; width:20px; height:20px; background:var(--ai-accent); border-radius:50%; display:flex; align-items:center; justify-content:center; transition:transform 0.35s,box-shadow 0.35s; }
.founder-card:hover .founder-card__badge { transform:scale(1.12) rotate(12deg); box-shadow:0 0 14px color-mix(in srgb,var(--ai-accent) 55%,transparent); }
.founder-card__badge svg { width:10px; height:10px; fill:white; display:block; }
.founder-card__avatar-wrap { display:flex; justify-content:center; margin-bottom:18px; }
.founder-card__avatar { width:88px; height:88px; border-radius:50%; background:var(--ai-bg); box-shadow:inset 6px 6px 14px rgba(0,0,0,0.09),inset -6px -6px 14px rgba(255,255,255,0.88); display:flex; align-items:center; justify-content:center; font-family:var(--font-serif-ai); font-size:28px; color:var(--ai-accent); position:relative; transition:transform 0.4s cubic-bezier(.2,.7,.2,1); }
html[data-ai-theme="black"] .founder-card__avatar { box-shadow:inset 6px 6px 14px rgba(0,0,0,0.38),inset -6px -6px 14px rgba(255,255,255,0.04); }
.founder-card:hover .founder-card__avatar { transform:scale(1.1); }
.founder-card__avatar::after { content:''; position:absolute; inset:-4px; border-radius:50%; border:2px solid var(--ai-accent); opacity:0; transition:opacity 0.4s; }
.founder-card:hover .founder-card__avatar::after { opacity:1; }
.founder-card__name { text-align:center; font-family:var(--font-serif-ai); font-size:21px; line-height:1.28; color:var(--ai-fg); transition:color 0.3s; }
.founder-card:hover .founder-card__name { color:var(--ai-accent); }
.founder-card__role { text-align:center; font-size:12px; color:var(--ai-fg-soft); margin-top:5px; letter-spacing:0.06em; text-transform:uppercase; }
.founder-card__linkedin { display:flex; justify-content:center; margin-top:20px; }
.founder-card__linkedin a { display:inline-flex; align-items:center; gap:7px; padding:9px 20px; border-radius:100px; background:var(--ai-bg); box-shadow:6px 6px 14px rgba(0,0,0,0.09),-6px -6px 14px rgba(255,255,255,0.85); font-size:12.5px; font-weight:500; color:var(--ai-accent); letter-spacing:0.02em; transition:box-shadow 0.3s,transform 0.3s; text-decoration:none; }
html[data-ai-theme="black"] .founder-card__linkedin a { box-shadow:6px 6px 14px rgba(0,0,0,0.35),-6px -6px 14px rgba(255,255,255,0.04); }
.founder-card__linkedin a:hover { box-shadow:2px 2px 6px rgba(0,0,0,0.07),-2px -2px 6px rgba(255,255,255,0.7); transform:scale(0.97); }
.founder-card__linkedin svg { width:13px; height:13px; flex-shrink:0; }

/* Final CTA */
.ab-close { padding:100px 0 80px; text-align:center; border-top:1px solid var(--ai-border); }
.ab-close h2 { font-family:var(--font-serif-ai); font-size:clamp(48px,6vw,80px); line-height:1.1; font-weight:400; letter-spacing:-0.02em; }
.ab-close p { margin:20px auto 0; color:var(--ai-fg-muted); font-size:18px; line-height:1.65; max-width:480px; }
`

const LINKEDIN_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

function FounderCard({
  initials,
  name,
  role,
  linkedin,
}: {
  initials: string
  name: string
  role: string
  linkedin: string
}) {
  return (
    <div className="founder-card sr-item">
      <div className="founder-card__status">
        <div className="status-dot" />
      </div>
      <div className="founder-card__badge" title="Verified">
        <svg viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="founder-card__avatar-wrap">
        <div className="founder-card__avatar">{initials}</div>
      </div>
      <div className="founder-card__name">{name}</div>
      <div className="founder-card__role">{role}</div>
      <div className="founder-card__linkedin">
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          {LINKEDIN_SVG}
          LinkedIn
        </a>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  useEffect(() => {
    // 1. Word-by-word vertical cut reveal
    const headline = document.getElementById('ab-headline')
    if (headline) {
      const text = headline.textContent?.trim() || ''
      const words = text.split(' ')
      headline.innerHTML = ''
      words.forEach((word, i) => {
        const wrap = document.createElement('span')
        wrap.className = 'wr'
        const inner = document.createElement('span')
        inner.className = 'wr__inner'
        inner.style.setProperty('--d', 0.3 + i * 0.2 + 's')
        inner.textContent = word
        wrap.appendChild(inner)
        headline.appendChild(wrap)
        if (i < words.length - 1) headline.appendChild(document.createTextNode(' '))
      })
    }

    // 2. Trigger hero is-loaded after 2 rAFs
    const hero = document.getElementById('ab-hero')
    if (hero) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hero.classList.add('is-loaded')
        })
      })
    }

    // 3. Scroll-reveal for .sr-item elements
    const srObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
            srObs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.sr-item').forEach((el, i) => {
      const siblings = el.parentElement?.querySelectorAll('.sr-item')
      const idx = siblings ? Array.from(siblings).indexOf(el as Element) : i
      ;(el as HTMLElement).style.setProperty('--sd', idx * 0.09 + 's')
      srObs.observe(el)
    })

    return () => srObs.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <JsonLd data={aboutOrgSchema} />
      {FOUNDERS.map(f => (
        <JsonLd key={f.name} data={{ '@context': 'https://schema.org', ...f }} />
      ))}
      <JsonLd
        data={jsonLdBreadcrumb([
          { name: 'Mindzy', url: `https://mindzy.me/${locale}` },
          { name: 'About', url: `https://mindzy.me/${locale}/about` },
        ])}
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="ab-hero" id="ab-hero">
        <div className="ab-hero__grid-bg" aria-hidden="true" />
        <div className="ab-hero__inner">
          <div className="ab-hero__eyebrow">{t.heroEyebrow}</div>
          <h1 className="ab-hero__headline" id="ab-headline">
            {t.heroHeadline}
          </h1>
          <p
            className="ab-hero__desc"
            style={{ '--d': '1.6s' } as React.CSSProperties}
          >
            {t.heroDesc}
          </p>
          <div
            className="ab-hero__cta-wrap"
            style={{ '--d': '1.9s' } as React.CSSProperties}
          >
            <GlassButton href={`/${locale}/portfolio`}>
              {t.heroCta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* 01 — Origin */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid">
            <div className="ab-section__label sr-item">{t.label01}</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                {t.s01h2a}{' '}
                <em style={{ fontStyle: 'italic' }}>{t.s01h2b}</em>
              </h2>
              <p className="sr-item">{t.s01p1}</p>
              <p className="sr-item">{t.s01p2}</p>
              <p className="sr-item">{t.s01p3}</p>
              <p className="sr-item">{t.s01p4}</p>
              <div className="pullquote sr-item">{t.s01pullquote}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Method */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid">
            <div className="ab-section__label sr-item">{t.label02}</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                {t.s02h2a} <em style={{ fontStyle: 'italic' }}>{t.s02h2b}</em>
              </h2>
              <p className="sr-item">{t.s02p1}</p>
              <p className="sr-item">{t.s02p2}</p>
              <p className="sr-item" style={{ marginTop: '24px' }}>
                {t.s02p3}
              </p>
              <ul className="method-list">
                {t.s02list.map(item => (
                  <li key={item} className="sr-item">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="sr-item" style={{ marginTop: '28px' }}>
                {t.s02p4}
              </p>
              <p className="sr-item">{t.s02p5}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Vision */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid">
            <div className="ab-section__label sr-item">{t.label03}</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                {t.s03h2a} <em style={{ fontStyle: 'italic' }}>{t.s03h2b}</em>
              </h2>
              <p className="sr-item">{t.s03p1}</p>
              <p className="sr-item">{t.s03p2}</p>
              <div className="pullquote sr-item">{t.s03pullquote}</div>
              <p className="sr-item">{t.s03p3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Founders */}
      <section className="ab-section">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="ab-section__grid" style={{ alignItems: 'start' }}>
            <div className="ab-section__label sr-item">{t.label04}</div>
            <div className="ab-section__content">
              <h2 className="sr-item">
                {t.s04h2a} <em style={{ fontStyle: 'italic' }}>{t.s04h2b}</em>
              </h2>
              <div className="founders-grid">
                <FounderCard
                  initials="WM"
                  name="William Martel"
                  role={t.founderRoleCFO}
                  linkedin="https://www.linkedin.com/in/williamartel/"
                />
                <FounderCard
                  initials="RC"
                  name="Romuald Cocotier"
                  role={t.founderRoleCEO}
                  linkedin="https://www.linkedin.com/in/r-cocotier/"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ab-close">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <h2>
            {t.ctaHeadlineA} <em style={{ fontStyle: 'italic' }}>{t.ctaHeadlineB}</em>{t.ctaHeadlineEnd}
          </h2>
          <p>{t.ctaBody}</p>
          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>
              {t.ctaButton}
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
