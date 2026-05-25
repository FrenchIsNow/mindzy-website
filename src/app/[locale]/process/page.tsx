'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { GlassButton } from '@/components/ui/GlassButton'

const TRANSLATIONS = {
  en: {
    heroEyebrow: `Our method`,
    heroH1a: `We build your AI infrastructure.`,
    heroH1b: `In 10 Steps.`,
    heroLines: [
      `Every engagement starts with a diagnosis.`,
      `Every architecture is built around your company.`,
      `No template. No shortcuts.`,
    ],
    heroExplore: `Explore the process`,
    railTitle: `10 steps`,
    closingH2a: `No template.`,
    closingH2b: `No pre-built stack.`,
    closingH2c: `No generic playbook.`,
    closingBody: `Every Mindzy infrastructure is designed from scratch.\nThe diagnosis defines the architecture.\nThe architecture defines the build.`,
    closingCta: `Start with a diagnosis call →`,
    steps: [
      {
        eyebrow: `Step 01 — Diagnosis`,
        title: `Executive Diagnosis.`,
        essence: `We listen before we build.`,
        copy: `We meet your leadership, map your departments, and understand how work actually gets done — before any technology is proposed.`,
      },
      {
        eyebrow: `Step 02 — Blueprint`,
        title: `AI Transformation Blueprint.`,
        essence: `A plan built around your priorities.`,
        copy: `We define what to build, what to connect, and in what order — based on where AI creates the fastest, most measurable impact for your business.`,
      },
      {
        eyebrow: `Step 03 — Mapping`,
        title: `Department Mapping.`,
        essence: `Every team is different.`,
        copy: `Sales, operations, support, finance — each department has its own workflows, bottlenecks, and needs. We map them individually before designing anything.`,
      },
      {
        eyebrow: `Step 04 — Architecture`,
        title: `System Architecture.`,
        essence: `Structure before execution.`,
        copy: `We define the role of each assistant, the tools they connect to, the data they can access, and the validation rules that govern every action.`,
      },
      {
        eyebrow: `Step 05 — Command Center`,
        title: `Custom Dashboard & Hierarchy.`,
        essence: `Your company. Your command center.`,
        copy: `We build a dashboard designed around your hierarchy — not a generic interface. Leadership sees the global picture. Managers own their department. Teams execute.`,
      },
      {
        eyebrow: `Step 06 — Build`,
        title: `Build & Integration.`,
        essence: `We connect to your world.`,
        copy: `We build the system inside your existing environment — CRM, email, ERP, internal tools. When a connector doesn't exist, we build it.`,
      },
      {
        eyebrow: `Step 07 — Deployment`,
        title: `Deployment by Department.`,
        essence: `One department at a time.`,
        copy: `We deploy progressively — validate in real conditions, collect feedback, adjust, then expand. Confidence before scale.`,
      },
      {
        eyebrow: `Step 08 — Governance`,
        title: `Governance & Control.`,
        essence: `Humans stay in control.`,
        copy: `We define what the system can do alone, what it can suggest, and what always requires a human decision. Powerful, but supervised.`,
      },
      {
        eyebrow: `Step 09 — Training`,
        title: `Training & Adoption.`,
        essence: `Technology only works if people use it.`,
        copy: `We train your teams on daily usage — not on documentation. The AI workforce is positioned as support, not disruption.`,
      },
      {
        eyebrow: `Step 10 — Roadmap`,
        title: `Optimization Roadmap.`,
        essence: `Deployment is the beginning.`,
        copy: `We deliver a roadmap for what comes next — new workflows, expanded departments, deeper integrations. The infrastructure grows as your company learns to use it.`,
      },
    ],
  },
  fr: {
    heroEyebrow: `Notre méthode`,
    heroH1a: `Nous construisons votre infrastructure IA.`,
    heroH1b: `En 10 étapes.`,
    heroLines: [
      `Chaque engagement commence par un diagnostic.`,
      `Chaque architecture est conçue autour de votre entreprise.`,
      `Pas de modèle. Pas de raccourcis.`,
    ],
    heroExplore: `Explorer le processus`,
    railTitle: `10 étapes`,
    closingH2a: `Pas de modèle.`,
    closingH2b: `Pas de stack préconçue.`,
    closingH2c: `Pas de playbook générique.`,
    closingBody: `Chaque infrastructure Mindzy est conçue de zéro.\nLe diagnostic définit l'architecture.\nL'architecture définit la construction.`,
    closingCta: `Commencer par un appel de diagnostic →`,
    steps: [
      {
        eyebrow: `Étape 01 — Diagnostic`,
        title: `Diagnostic Exécutif.`,
        essence: `Nous écoutons avant de construire.`,
        copy: `Nous rencontrons votre direction, cartographions vos départements et comprenons comment le travail se fait réellement — avant de proposer toute technologie.`,
      },
      {
        eyebrow: `Étape 02 — Plan directeur`,
        title: `Plan de Transformation IA.`,
        essence: `Un plan construit autour de vos priorités.`,
        copy: `Nous définissons ce qu'il faut construire, connecter et dans quel ordre — en fonction des endroits où l'IA crée l'impact le plus rapide et le plus mesurable pour votre entreprise.`,
      },
      {
        eyebrow: `Étape 03 — Cartographie`,
        title: `Cartographie des Départements.`,
        essence: `Chaque équipe est différente.`,
        copy: `Ventes, opérations, support, finance — chaque département a ses propres processus, goulots d'étranglement et besoins. Nous les cartographions individuellement avant de concevoir quoi que ce soit.`,
      },
      {
        eyebrow: `Étape 04 — Architecture`,
        title: `Architecture Système.`,
        essence: `La structure avant l'exécution.`,
        copy: `Nous définissons le rôle de chaque assistant, les outils auxquels il se connecte, les données auxquelles il peut accéder et les règles de validation qui régissent chaque action.`,
      },
      {
        eyebrow: `Étape 05 — Centre de commande`,
        title: `Tableau de bord & Hiérarchie sur mesure.`,
        essence: `Votre entreprise. Votre centre de commande.`,
        copy: `Nous construisons un tableau de bord conçu autour de votre hiérarchie — pas une interface générique. La direction voit la vue d'ensemble. Les managers gèrent leur département. Les équipes exécutent.`,
      },
      {
        eyebrow: `Étape 06 — Construction`,
        title: `Construction & Intégration.`,
        essence: `Nous nous connectons à votre monde.`,
        copy: `Nous construisons le système dans votre environnement existant — CRM, e-mail, ERP, outils internes. Quand un connecteur n'existe pas, nous le créons.`,
      },
      {
        eyebrow: `Étape 07 — Déploiement`,
        title: `Déploiement par Département.`,
        essence: `Un département à la fois.`,
        copy: `Nous déployons progressivement — validons en conditions réelles, collectons les retours, ajustons, puis élargissons. La confiance avant l'échelle.`,
      },
      {
        eyebrow: `Étape 08 — Gouvernance`,
        title: `Gouvernance & Contrôle.`,
        essence: `Les humains gardent le contrôle.`,
        copy: `Nous définissons ce que le système peut faire seul, ce qu'il peut suggérer et ce qui nécessite toujours une décision humaine. Puissant, mais supervisé.`,
      },
      {
        eyebrow: `Étape 09 — Formation`,
        title: `Formation & Adoption.`,
        essence: `La technologie ne fonctionne que si les gens l'utilisent.`,
        copy: `Nous formons vos équipes à l'utilisation quotidienne — pas à la documentation. La force de travail IA est positionnée comme un soutien, pas une perturbation.`,
      },
      {
        eyebrow: `Étape 10 — Feuille de route`,
        title: `Feuille de route d'Optimisation.`,
        essence: `Le déploiement est le début.`,
        copy: `Nous livrons une feuille de route pour la suite — nouveaux processus, départements élargis, intégrations plus profondes. L'infrastructure évolue au fur et à mesure que votre entreprise apprend à l'utiliser.`,
      },
    ],
  },
  es: {
    heroEyebrow: `Nuestro método`,
    heroH1a: `Construimos su infraestructura de IA.`,
    heroH1b: `En 10 pasos.`,
    heroLines: [
      `Cada compromiso comienza con un diagnóstico.`,
      `Cada arquitectura se construye alrededor de su empresa.`,
      `Sin plantillas. Sin atajos.`,
    ],
    heroExplore: `Explorar el proceso`,
    railTitle: `10 pasos`,
    closingH2a: `Sin plantilla.`,
    closingH2b: `Sin stack predefinido.`,
    closingH2c: `Sin playbook genérico.`,
    closingBody: `Cada infraestructura Mindzy se diseña desde cero.\nEl diagnóstico define la arquitectura.\nLa arquitectura define la construcción.`,
    closingCta: `Comenzar con una llamada de diagnóstico →`,
    steps: [
      {
        eyebrow: `Paso 01 — Diagnóstico`,
        title: `Diagnóstico Ejecutivo.`,
        essence: `Escuchamos antes de construir.`,
        copy: `Nos reunimos con su liderazgo, mapeamos sus departamentos y entendemos cómo se realiza el trabajo realmente — antes de proponer cualquier tecnología.`,
      },
      {
        eyebrow: `Paso 02 — Plan`,
        title: `Plan de Transformación IA.`,
        essence: `Un plan construido alrededor de sus prioridades.`,
        copy: `Definimos qué construir, qué conectar y en qué orden — basándonos en dónde la IA crea el impacto más rápido y medible para su negocio.`,
      },
      {
        eyebrow: `Paso 03 — Mapeo`,
        title: `Mapeo de Departamentos.`,
        essence: `Cada equipo es diferente.`,
        copy: `Ventas, operaciones, soporte, finanzas — cada departamento tiene sus propios flujos de trabajo, cuellos de botella y necesidades. Los mapeamos individualmente antes de diseñar cualquier cosa.`,
      },
      {
        eyebrow: `Paso 04 — Arquitectura`,
        title: `Arquitectura del Sistema.`,
        essence: `Estructura antes de ejecución.`,
        copy: `Definimos el rol de cada asistente, las herramientas a las que se conecta, los datos a los que puede acceder y las reglas de validación que rigen cada acción.`,
      },
      {
        eyebrow: `Paso 05 — Centro de mando`,
        title: `Panel de control y Jerarquía personalizada.`,
        essence: `Su empresa. Su centro de mando.`,
        copy: `Construimos un panel diseñado alrededor de su jerarquía — no una interfaz genérica. El liderazgo ve el panorama global. Los gerentes gestionan su departamento. Los equipos ejecutan.`,
      },
      {
        eyebrow: `Paso 06 — Construcción`,
        title: `Construcción e Integración.`,
        essence: `Nos conectamos a su mundo.`,
        copy: `Construimos el sistema dentro de su entorno existente — CRM, correo electrónico, ERP, herramientas internas. Cuando no existe un conector, lo construimos.`,
      },
      {
        eyebrow: `Paso 07 — Implementación`,
        title: `Implementación por Departamento.`,
        essence: `Un departamento a la vez.`,
        copy: `Implementamos progresivamente — validamos en condiciones reales, recopilamos retroalimentación, ajustamos y luego expandimos. Confianza antes de escala.`,
      },
      {
        eyebrow: `Paso 08 — Gobernanza`,
        title: `Gobernanza y Control.`,
        essence: `Los humanos mantienen el control.`,
        copy: `Definimos qué puede hacer el sistema solo, qué puede sugerir y qué siempre requiere una decisión humana. Potente, pero supervisado.`,
      },
      {
        eyebrow: `Paso 09 — Formación`,
        title: `Formación y Adopción.`,
        essence: `La tecnología solo funciona si las personas la usan.`,
        copy: `Formamos a sus equipos en el uso diario — no en documentación. La fuerza de trabajo IA se posiciona como apoyo, no como disrupción.`,
      },
      {
        eyebrow: `Paso 10 — Hoja de ruta`,
        title: `Hoja de ruta de Optimización.`,
        essence: `La implementación es el comienzo.`,
        copy: `Entregamos una hoja de ruta para lo que viene después — nuevos flujos de trabajo, departamentos ampliados, integraciones más profundas. La infraestructura crece a medida que su empresa aprende a usarla.`,
      },
    ],
  },
  de: {
    heroEyebrow: `Unsere Methode`,
    heroH1a: `Wir bauen Ihre KI-Infrastruktur.`,
    heroH1b: `In 10 Schritten.`,
    heroLines: [
      `Jedes Projekt beginnt mit einer Diagnose.`,
      `Jede Architektur wird um Ihr Unternehmen herum aufgebaut.`,
      `Keine Vorlage. Keine Abkürzungen.`,
    ],
    heroExplore: `Den Prozess erkunden`,
    railTitle: `10 Schritte`,
    closingH2a: `Keine Vorlage.`,
    closingH2b: `Kein vorgefertigter Stack.`,
    closingH2c: `Kein generisches Playbook.`,
    closingBody: `Jede Mindzy-Infrastruktur wird von Grund auf neu konzipiert.\nDie Diagnose definiert die Architektur.\nDie Architektur definiert den Aufbau.`,
    closingCta: `Mit einem Diagnosegespräch beginnen →`,
    steps: [
      {
        eyebrow: `Schritt 01 — Diagnose`,
        title: `Executive-Diagnose.`,
        essence: `Wir hören zu, bevor wir bauen.`,
        copy: `Wir treffen Ihre Führungskräfte, kartieren Ihre Abteilungen und verstehen, wie Arbeit tatsächlich erledigt wird — bevor wir Technologie vorschlagen.`,
      },
      {
        eyebrow: `Schritt 02 — Blueprint`,
        title: `KI-Transformationsplan.`,
        essence: `Ein Plan, der auf Ihren Prioritäten aufbaut.`,
        copy: `Wir legen fest, was zu bauen, was zu verbinden und in welcher Reihenfolge — basierend darauf, wo KI den schnellsten und messbarsten Mehrwert für Ihr Unternehmen schafft.`,
      },
      {
        eyebrow: `Schritt 03 — Kartierung`,
        title: `Abteilungskartierung.`,
        essence: `Jedes Team ist anders.`,
        copy: `Vertrieb, Betrieb, Support, Finanzen — jede Abteilung hat ihre eigenen Arbeitsabläufe, Engpässe und Anforderungen. Wir kartieren sie einzeln, bevor wir irgendetwas entwerfen.`,
      },
      {
        eyebrow: `Schritt 04 — Architektur`,
        title: `Systemarchitektur.`,
        essence: `Struktur vor der Ausführung.`,
        copy: `Wir definieren die Rolle jedes Assistenten, die Tools, mit denen er sich verbindet, die Daten, auf die er zugreifen kann, und die Validierungsregeln, die jede Aktion steuern.`,
      },
      {
        eyebrow: `Schritt 05 — Kommandozentrale`,
        title: `Maßgeschneidertes Dashboard & Hierarchie.`,
        essence: `Ihr Unternehmen. Ihre Kommandozentrale.`,
        copy: `Wir bauen ein Dashboard, das auf Ihre Hierarchie zugeschnitten ist — keine generische Oberfläche. Die Führungsebene sieht das Gesamtbild. Manager leiten ihre Abteilung. Teams führen aus.`,
      },
      {
        eyebrow: `Schritt 06 — Entwicklung`,
        title: `Entwicklung & Integration.`,
        essence: `Wir verbinden uns mit Ihrer Welt.`,
        copy: `Wir bauen das System in Ihrer bestehenden Umgebung — CRM, E-Mail, ERP, interne Tools. Wenn ein Connector nicht existiert, bauen wir ihn.`,
      },
      {
        eyebrow: `Schritt 07 — Rollout`,
        title: `Rollout nach Abteilung.`,
        essence: `Eine Abteilung nach der anderen.`,
        copy: `Wir rollen schrittweise aus — validieren unter realen Bedingungen, sammeln Feedback, passen an und erweitern dann. Vertrauen vor Skalierung.`,
      },
      {
        eyebrow: `Schritt 08 — Governance`,
        title: `Governance & Kontrolle.`,
        essence: `Menschen behalten die Kontrolle.`,
        copy: `Wir definieren, was das System alleine tun kann, was es vorschlagen kann und was immer eine menschliche Entscheidung erfordert. Leistungsstark, aber überwacht.`,
      },
      {
        eyebrow: `Schritt 09 — Schulung`,
        title: `Schulung & Adoption.`,
        essence: `Technologie funktioniert nur, wenn Menschen sie nutzen.`,
        copy: `Wir schulen Ihre Teams in der täglichen Nutzung — nicht in der Dokumentation. Die KI-Arbeitskraft wird als Unterstützung positioniert, nicht als Störung.`,
      },
      {
        eyebrow: `Schritt 10 — Fahrplan`,
        title: `Optimierungsfahrplan.`,
        essence: `Der Rollout ist der Anfang.`,
        copy: `Wir liefern einen Fahrplan für das, was als Nächstes kommt — neue Arbeitsabläufe, erweiterte Abteilungen, tiefere Integrationen. Die Infrastruktur wächst, während Ihr Unternehmen sie nutzen lernt.`,
      },
    ],
  },
  it: {
    heroEyebrow: `Il nostro metodo`,
    heroH1a: `Costruiamo la tua infrastruttura AI.`,
    heroH1b: `In 10 passi.`,
    heroLines: [
      `Ogni incarico inizia con una diagnosi.`,
      `Ogni architettura è costruita intorno alla tua azienda.`,
      `Nessun modello. Nessuna scorciatoia.`,
    ],
    heroExplore: `Esplora il processo`,
    railTitle: `10 passi`,
    closingH2a: `Nessun modello.`,
    closingH2b: `Nessuno stack preconfezionato.`,
    closingH2c: `Nessun playbook generico.`,
    closingBody: `Ogni infrastruttura Mindzy è progettata da zero.\nLa diagnosi definisce l'architettura.\nL'architettura definisce la costruzione.`,
    closingCta: `Inizia con una chiamata di diagnosi →`,
    steps: [
      {
        eyebrow: `Passo 01 — Diagnosi`,
        title: `Diagnosi Esecutiva.`,
        essence: `Ascoltiamo prima di costruire.`,
        copy: `Incontriamo la tua leadership, mappiamo i tuoi reparti e capiamo come il lavoro viene effettivamente svolto — prima di proporre qualsiasi tecnologia.`,
      },
      {
        eyebrow: `Passo 02 — Blueprint`,
        title: `Piano di Trasformazione AI.`,
        essence: `Un piano costruito attorno alle tue priorità.`,
        copy: `Definiamo cosa costruire, cosa connettere e in quale ordine — basandoci su dove l'AI crea l'impatto più veloce e misurabile per il tuo business.`,
      },
      {
        eyebrow: `Passo 03 — Mappatura`,
        title: `Mappatura dei Reparti.`,
        essence: `Ogni team è diverso.`,
        copy: `Vendite, operazioni, supporto, finanza — ogni reparto ha i propri flussi di lavoro, colli di bottiglia e necessità. Li mappiamo individualmente prima di progettare qualsiasi cosa.`,
      },
      {
        eyebrow: `Passo 04 — Architettura`,
        title: `Architettura del Sistema.`,
        essence: `Struttura prima dell'esecuzione.`,
        copy: `Definiamo il ruolo di ogni assistente, gli strumenti a cui si connette, i dati a cui può accedere e le regole di validazione che governano ogni azione.`,
      },
      {
        eyebrow: `Passo 05 — Centro di comando`,
        title: `Dashboard e Gerarchia personalizzata.`,
        essence: `La tua azienda. Il tuo centro di comando.`,
        copy: `Costruiamo una dashboard progettata attorno alla tua gerarchia — non un'interfaccia generica. La leadership vede il quadro generale. I manager gestiscono il loro reparto. I team eseguono.`,
      },
      {
        eyebrow: `Passo 06 — Costruzione`,
        title: `Costruzione e Integrazione.`,
        essence: `Ci connettiamo al tuo mondo.`,
        copy: `Costruiamo il sistema nel tuo ambiente esistente — CRM, email, ERP, strumenti interni. Quando un connettore non esiste, lo costruiamo.`,
      },
      {
        eyebrow: `Passo 07 — Deployment`,
        title: `Deployment per Reparto.`,
        essence: `Un reparto alla volta.`,
        copy: `Distribuiamo progressivamente — validiamo in condizioni reali, raccogliamo feedback, aggiustiamo, poi espandiamo. Fiducia prima della scala.`,
      },
      {
        eyebrow: `Passo 08 — Governance`,
        title: `Governance e Controllo.`,
        essence: `Gli esseri umani rimangono in controllo.`,
        copy: `Definiamo cosa il sistema può fare da solo, cosa può suggerire e cosa richiede sempre una decisione umana. Potente, ma supervisionato.`,
      },
      {
        eyebrow: `Passo 09 — Formazione`,
        title: `Formazione e Adozione.`,
        essence: `La tecnologia funziona solo se le persone la usano.`,
        copy: `Formiamo i tuoi team sull'utilizzo quotidiano — non sulla documentazione. La forza lavoro AI è posizionata come supporto, non come disruzione.`,
      },
      {
        eyebrow: `Passo 10 — Roadmap`,
        title: `Roadmap di Ottimizzazione.`,
        essence: `Il deployment è l'inizio.`,
        copy: `Consegniamo una roadmap per il futuro — nuovi flussi di lavoro, reparti ampliati, integrazioni più profonde. L'infrastruttura cresce man mano che la tua azienda impara a usarla.`,
      },
    ],
  },
  pt: {
    heroEyebrow: `O nosso método`,
    heroH1a: `Construímos a sua infraestrutura de IA.`,
    heroH1b: `Em 10 passos.`,
    heroLines: [
      `Cada envolvimento começa com um diagnóstico.`,
      `Cada arquitetura é construída em torno da sua empresa.`,
      `Sem modelos. Sem atalhos.`,
    ],
    heroExplore: `Explorar o processo`,
    railTitle: `10 passos`,
    closingH2a: `Sem modelo.`,
    closingH2b: `Sem stack pré-construído.`,
    closingH2c: `Sem playbook genérico.`,
    closingBody: `Cada infraestrutura Mindzy é concebida de raiz.\nO diagnóstico define a arquitetura.\nA arquitetura define a construção.`,
    closingCta: `Começar com uma chamada de diagnóstico →`,
    steps: [
      {
        eyebrow: `Passo 01 — Diagnóstico`,
        title: `Diagnóstico Executivo.`,
        essence: `Ouvimos antes de construir.`,
        copy: `Reunimo-nos com a sua liderança, mapeamos os seus departamentos e compreendemos como o trabalho é realmente feito — antes de propor qualquer tecnologia.`,
      },
      {
        eyebrow: `Passo 02 — Plano`,
        title: `Plano de Transformação IA.`,
        essence: `Um plano construído em torno das suas prioridades.`,
        copy: `Definimos o que construir, o que conectar e em que ordem — com base em onde a IA cria o impacto mais rápido e mensurável para o seu negócio.`,
      },
      {
        eyebrow: `Passo 03 — Mapeamento`,
        title: `Mapeamento de Departamentos.`,
        essence: `Cada equipa é diferente.`,
        copy: `Vendas, operações, suporte, finanças — cada departamento tem os seus próprios fluxos de trabalho, estrangulamentos e necessidades. Mapeamo-los individualmente antes de conceber qualquer coisa.`,
      },
      {
        eyebrow: `Passo 04 — Arquitetura`,
        title: `Arquitetura do Sistema.`,
        essence: `Estrutura antes da execução.`,
        copy: `Definimos o papel de cada assistente, as ferramentas a que se conecta, os dados a que pode aceder e as regras de validação que regem cada ação.`,
      },
      {
        eyebrow: `Passo 05 — Centro de comando`,
        title: `Painel personalizado e Hierarquia.`,
        essence: `A sua empresa. O seu centro de comando.`,
        copy: `Construímos um painel concebido em torno da sua hierarquia — não uma interface genérica. A liderança vê o quadro global. Os gestores gerem o seu departamento. As equipas executam.`,
      },
      {
        eyebrow: `Passo 06 — Construção`,
        title: `Construção e Integração.`,
        essence: `Conectamo-nos ao seu mundo.`,
        copy: `Construímos o sistema no seu ambiente existente — CRM, e-mail, ERP, ferramentas internas. Quando um conector não existe, construímo-lo.`,
      },
      {
        eyebrow: `Passo 07 — Implementação`,
        title: `Implementação por Departamento.`,
        essence: `Um departamento de cada vez.`,
        copy: `Implementamos progressivamente — validamos em condições reais, recolhemos feedback, ajustamos e depois expandimos. Confiança antes da escala.`,
      },
      {
        eyebrow: `Passo 08 — Governação`,
        title: `Governação e Controlo.`,
        essence: `Os humanos mantêm o controlo.`,
        copy: `Definimos o que o sistema pode fazer sozinho, o que pode sugerir e o que requer sempre uma decisão humana. Poderoso, mas supervisionado.`,
      },
      {
        eyebrow: `Passo 09 — Formação`,
        title: `Formação e Adoção.`,
        essence: `A tecnologia só funciona se as pessoas a utilizarem.`,
        copy: `Formamos as suas equipas no uso diário — não na documentação. A força de trabalho IA é posicionada como suporte, não como disrupção.`,
      },
      {
        eyebrow: `Passo 10 — Roteiro`,
        title: `Roteiro de Otimização.`,
        essence: `A implementação é o começo.`,
        copy: `Entregamos um roteiro para o que vem a seguir — novos fluxos de trabalho, departamentos expandidos, integrações mais profundas. A infraestrutura cresce à medida que a sua empresa aprende a utilizá-la.`,
      },
    ],
  },
  ar: {
    heroEyebrow: `منهجنا`,
    heroH1a: `نبني بنيتك التحتية للذكاء الاصطناعي.`,
    heroH1b: `في 10 خطوات.`,
    heroLines: [
      `كل مشاركة تبدأ بتشخيص.`,
      `كل بنية تُبنى حول شركتك.`,
      `لا قوالب. لا اختصارات.`,
    ],
    heroExplore: `استكشف العملية`,
    railTitle: `10 خطوات`,
    closingH2a: `لا قالب.`,
    closingH2b: `لا مجموعة تقنيات جاهزة.`,
    closingH2c: `لا دليل تشغيل عام.`,
    closingBody: `كل بنية تحتية Mindzy مصممة من الصفر.\nالتشخيص يحدد البنية.\nالبنية تحدد الإنشاء.`,
    closingCta: `ابدأ بمكالمة تشخيص →`,
    steps: [
      {
        eyebrow: `الخطوة 01 — التشخيص`,
        title: `التشخيص التنفيذي.`,
        essence: `نستمع قبل أن نبني.`,
        copy: `نلتقي بقيادتكم، ونرسم خرائط أقسامكم، ونفهم كيف يُنجز العمل فعلياً — قبل اقتراح أي تقنية.`,
      },
      {
        eyebrow: `الخطوة 02 — المخطط`,
        title: `مخطط تحول الذكاء الاصطناعي.`,
        essence: `خطة مبنية حول أولوياتكم.`,
        copy: `نحدد ما يجب بناؤه وما يجب توصيله وبأي ترتيب — بناءً على حيث يخلق الذكاء الاصطناعي أسرع تأثير وأكثره قابلية للقياس على عملكم.`,
      },
      {
        eyebrow: `الخطوة 03 — الرسم`,
        title: `رسم خرائط الأقسام.`,
        essence: `كل فريق مختلف.`,
        copy: `المبيعات والعمليات والدعم والمالية — لكل قسم سير عمل وعقبات واحتياجات خاصة به. نرسم خرائطها بشكل فردي قبل تصميم أي شيء.`,
      },
      {
        eyebrow: `الخطوة 04 — البنية`,
        title: `بنية النظام.`,
        essence: `الهيكل قبل التنفيذ.`,
        copy: `نحدد دور كل مساعد والأدوات التي يتصل بها والبيانات التي يمكنه الوصول إليها وقواعد التحقق التي تحكم كل إجراء.`,
      },
      {
        eyebrow: `الخطوة 05 — مركز التحكم`,
        title: `لوحة التحكم المخصصة والتسلسل الهرمي.`,
        essence: `شركتكم. مركز تحكمكم.`,
        copy: `نبني لوحة تحكم مصممة حول تسلسلكم الهرمي — وليس واجهة عامة. القيادة ترى الصورة الكاملة. المديرون يديرون أقسامهم. الفرق تنفذ.`,
      },
      {
        eyebrow: `الخطوة 06 — البناء`,
        title: `البناء والتكامل.`,
        essence: `نتصل بعالمكم.`,
        copy: `نبني النظام داخل بيئتكم الحالية — CRM والبريد الإلكتروني وERP والأدوات الداخلية. عندما لا يوجد موصّل، نبنيه.`,
      },
      {
        eyebrow: `الخطوة 07 — النشر`,
        title: `النشر حسب القسم.`,
        essence: `قسم واحد في كل مرة.`,
        copy: `ننشر تدريجياً — نتحقق في ظروف حقيقية، ونجمع التغذية الراجعة، ونعدّل، ثم نوسّع. الثقة قبل الحجم.`,
      },
      {
        eyebrow: `الخطوة 08 — الحوكمة`,
        title: `الحوكمة والتحكم.`,
        essence: `البشر يبقون في السيطرة.`,
        copy: `نحدد ما يمكن للنظام فعله وحده، وما يمكنه اقتراحه، وما يتطلب دائماً قراراً بشرياً. قوي، لكن خاضع للإشراف.`,
      },
      {
        eyebrow: `الخطوة 09 — التدريب`,
        title: `التدريب والاعتماد.`,
        essence: `التكنولوجيا تعمل فقط إذا استخدمها الناس.`,
        copy: `ندرّب فرقكم على الاستخدام اليومي — لا على التوثيق. تُوضع قوة عمل الذكاء الاصطناعي كدعم، لا كتعطيل.`,
      },
      {
        eyebrow: `الخطوة 10 — خارطة الطريق`,
        title: `خارطة طريق التحسين.`,
        essence: `النشر هو البداية.`,
        copy: `نقدم خارطة طريق لما هو قادم — سير عمل جديدة وأقسام موسّعة وتكاملات أعمق. تنمو البنية التحتية مع تعلّم شركتكم استخدامها.`,
      },
    ],
  },
  zh: {
    heroEyebrow: `我们的方法`,
    heroH1a: `我们构建您的 AI 基础设施。`,
    heroH1b: `分 10 个步骤。`,
    heroLines: [
      `每次合作都从诊断开始。`,
      `每个架构都围绕您的公司构建。`,
      `没有模板。没有捷径。`,
    ],
    heroExplore: `探索流程`,
    railTitle: `10 个步骤`,
    closingH2a: `没有模板。`,
    closingH2b: `没有预建技术栈。`,
    closingH2c: `没有通用剧本。`,
    closingBody: `每个 Mindzy 基础设施都从零开始设计。\n诊断定义架构。\n架构定义构建。`,
    closingCta: `从诊断通话开始 →`,
    steps: [
      {
        eyebrow: `步骤 01 — 诊断`,
        title: `高管诊断。`,
        essence: `我们先听，再构建。`,
        copy: `我们与您的管理层会面，绘制部门地图，了解工作实际是如何完成的——在提出任何技术方案之前。`,
      },
      {
        eyebrow: `步骤 02 — 蓝图`,
        title: `AI 转型蓝图。`,
        essence: `围绕您的优先事项制定的计划。`,
        copy: `我们确定要构建什么、连接什么以及以什么顺序——基于 AI 为您的业务创造最快、最可量化影响的地方。`,
      },
      {
        eyebrow: `步骤 03 — 映射`,
        title: `部门映射。`,
        essence: `每个团队都不同。`,
        copy: `销售、运营、支持、财务——每个部门都有自己的工作流程、瓶颈和需求。在设计任何东西之前，我们单独对它们进行映射。`,
      },
      {
        eyebrow: `步骤 04 — 架构`,
        title: `系统架构。`,
        essence: `结构先于执行。`,
        copy: `我们定义每个助手的角色、它连接的工具、它可以访问的数据以及管理每个操作的验证规则。`,
      },
      {
        eyebrow: `步骤 05 — 指挥中心`,
        title: `定制仪表板与层级结构。`,
        essence: `您的公司。您的指挥中心。`,
        copy: `我们构建围绕您的层级结构设计的仪表板——而非通用界面。管理层看到全局。经理管理各自的部门。团队负责执行。`,
      },
      {
        eyebrow: `步骤 06 — 构建`,
        title: `构建与集成。`,
        essence: `我们连接到您的世界。`,
        copy: `我们在您现有的环境中构建系统——CRM、电子邮件、ERP、内部工具。当连接器不存在时，我们来构建它。`,
      },
      {
        eyebrow: `步骤 07 — 部署`,
        title: `按部门部署。`,
        essence: `每次一个部门。`,
        copy: `我们逐步部署——在真实条件下验证，收集反馈，调整，然后扩展。先建立信心，再扩大规模。`,
      },
      {
        eyebrow: `步骤 08 — 治理`,
        title: `治理与控制。`,
        essence: `人类保持控制权。`,
        copy: `我们定义系统可以独立做什么、可以建议什么，以及什么始终需要人工决策。强大，但受到监督。`,
      },
      {
        eyebrow: `步骤 09 — 培训`,
        title: `培训与采用。`,
        essence: `只有人们使用，技术才能发挥作用。`,
        copy: `我们培训您的团队日常使用——而非文档阅读。AI 劳动力被定位为支持，而非颠覆。`,
      },
      {
        eyebrow: `步骤 10 — 路线图`,
        title: `优化路线图。`,
        essence: `部署是开始。`,
        copy: `我们交付未来的路线图——新的工作流程、扩展的部门、更深层的集成。随着您的公司学会使用它，基础设施不断成长。`,
      },
    ],
  },
  ja: {
    heroEyebrow: `私たちの方法`,
    heroH1a: `お客様の AI インフラを構築します。`,
    heroH1b: `10 のステップで。`,
    heroLines: [
      `すべてのプロジェクトはまず診断から始まります。`,
      `すべてのアーキテクチャはお客様の会社を中心に構築されます。`,
      `テンプレートなし。近道なし。`,
    ],
    heroExplore: `プロセスを探る`,
    railTitle: `10 ステップ`,
    closingH2a: `テンプレートなし。`,
    closingH2b: `既製スタックなし。`,
    closingH2c: `汎用プレイブックなし。`,
    closingBody: `すべての Mindzy インフラはゼロから設計されます。\n診断がアーキテクチャを定義します。\nアーキテクチャが構築を定義します。`,
    closingCta: `診断コールから始める →`,
    steps: [
      {
        eyebrow: `ステップ 01 — 診断`,
        title: `エグゼクティブ診断。`,
        essence: `構築する前に傾聴します。`,
        copy: `リーダーシップと会議を行い、部門をマッピングし、テクノロジーを提案する前に実際の業務の流れを理解します。`,
      },
      {
        eyebrow: `ステップ 02 — ブループリント`,
        title: `AI 変革ブループリント。`,
        essence: `お客様の優先事項を中心とした計画。`,
        copy: `何を構築し、何を接続し、どの順序で行うかを定義します — AI がお客様のビジネスに最速かつ最も測定可能なインパクトをもたらす場所に基づいて。`,
      },
      {
        eyebrow: `ステップ 03 — マッピング`,
        title: `部門マッピング。`,
        essence: `すべてのチームは異なります。`,
        copy: `営業、オペレーション、サポート、財務 — 各部門には独自のワークフロー、ボトルネック、ニーズがあります。何かを設計する前に、個別にマッピングします。`,
      },
      {
        eyebrow: `ステップ 04 — アーキテクチャ`,
        title: `システムアーキテクチャ。`,
        essence: `実行前に構造を。`,
        copy: `各アシスタントの役割、接続するツール、アクセスできるデータ、すべてのアクションを管理するバリデーションルールを定義します。`,
      },
      {
        eyebrow: `ステップ 05 — コマンドセンター`,
        title: `カスタムダッシュボード & 階層構造。`,
        essence: `お客様の会社。お客様のコマンドセンター。`,
        copy: `汎用インターフェースではなく、お客様の階層に合わせたダッシュボードを構築します。経営陣は全体像を把握。マネージャーは自部門を管理。チームは実行。`,
      },
      {
        eyebrow: `ステップ 06 — 構築`,
        title: `構築 & 統合。`,
        essence: `お客様の世界に接続します。`,
        copy: `CRM、メール、ERP、社内ツールなど、既存の環境内にシステムを構築します。コネクタが存在しない場合は、私たちが構築します。`,
      },
      {
        eyebrow: `ステップ 07 — デプロイ`,
        title: `部門別デプロイ。`,
        essence: `一度に一部門ずつ。`,
        copy: `段階的にデプロイ — 実際の状況下で検証し、フィードバックを収集し、調整してから拡張します。規模拡大の前に信頼を築きます。`,
      },
      {
        eyebrow: `ステップ 08 — ガバナンス`,
        title: `ガバナンス & コントロール。`,
        essence: `人間がコントロールを維持します。`,
        copy: `システムが単独でできること、提案できること、常に人間の判断が必要なことを定義します。強力ですが、監督下に置かれます。`,
      },
      {
        eyebrow: `ステップ 09 — トレーニング`,
        title: `トレーニング & 導入。`,
        essence: `人々が使ってこそ、テクノロジーは機能します。`,
        copy: `ドキュメントではなく、日常の使用方法についてチームをトレーニングします。AI 人材はサポートとして位置づけられ、混乱をもたらすものではありません。`,
      },
      {
        eyebrow: `ステップ 10 — ロードマップ`,
        title: `最適化ロードマップ。`,
        essence: `デプロイは始まりです。`,
        copy: `次のステップのロードマップを提供します — 新しいワークフロー、拡張された部門、より深い統合。インフラはお客様の会社がその使い方を学ぶにつれて成長します。`,
      },
    ],
  },
  ru: {
    heroEyebrow: `Наш метод`,
    heroH1a: `Мы строим вашу ИИ-инфраструктуру.`,
    heroH1b: `В 10 шагов.`,
    heroLines: [
      `Каждый проект начинается с диагностики.`,
      `Каждая архитектура строится вокруг вашей компании.`,
      `Никаких шаблонов. Никаких сокращений.`,
    ],
    heroExplore: `Изучить процесс`,
    railTitle: `10 шагов`,
    closingH2a: `Никаких шаблонов.`,
    closingH2b: `Никакого готового стека.`,
    closingH2c: `Никаких универсальных сценариев.`,
    closingBody: `Каждая инфраструктура Mindzy разрабатывается с нуля.\nДиагностика определяет архитектуру.\nАрхитектура определяет построение.`,
    closingCta: `Начать с диагностического звонка →`,
    steps: [
      {
        eyebrow: `Шаг 01 — Диагностика`,
        title: `Исполнительная диагностика.`,
        essence: `Мы слушаем прежде чем строить.`,
        copy: `Мы встречаемся с вашим руководством, составляем карту отделов и понимаем, как на самом деле выполняется работа — прежде чем предлагать какие-либо технологии.`,
      },
      {
        eyebrow: `Шаг 02 — Блюпринт`,
        title: `Блюпринт трансформации ИИ.`,
        essence: `План, построенный вокруг ваших приоритетов.`,
        copy: `Мы определяем, что строить, что подключать и в какой последовательности — исходя из того, где ИИ создаёт наиболее быстрый и измеримый эффект для вашего бизнеса.`,
      },
      {
        eyebrow: `Шаг 03 — Картирование`,
        title: `Картирование отделов.`,
        essence: `Каждая команда отличается.`,
        copy: `Продажи, операции, поддержка, финансы — у каждого отдела свои процессы, узкие места и потребности. Мы картируем их по отдельности, прежде чем что-либо проектировать.`,
      },
      {
        eyebrow: `Шаг 04 — Архитектура`,
        title: `Системная архитектура.`,
        essence: `Структура прежде исполнения.`,
        copy: `Мы определяем роль каждого ассистента, инструменты, к которым он подключается, данные, к которым он может получить доступ, и правила валидации, управляющие каждым действием.`,
      },
      {
        eyebrow: `Шаг 05 — Командный центр`,
        title: `Индивидуальный дашборд и иерархия.`,
        essence: `Ваша компания. Ваш командный центр.`,
        copy: `Мы строим дашборд, разработанный под вашу иерархию — а не универсальный интерфейс. Руководство видит общую картину. Менеджеры управляют своим отделом. Команды выполняют задачи.`,
      },
      {
        eyebrow: `Шаг 06 — Разработка`,
        title: `Разработка и интеграция.`,
        essence: `Мы подключаемся к вашему миру.`,
        copy: `Мы строим систему внутри вашей существующей среды — CRM, почта, ERP, внутренние инструменты. Если коннектора не существует, мы его создаём.`,
      },
      {
        eyebrow: `Шаг 07 — Внедрение`,
        title: `Внедрение по отделам.`,
        essence: `По одному отделу за раз.`,
        copy: `Внедряем постепенно — проверяем в реальных условиях, собираем обратную связь, корректируем, затем расширяем. Уверенность прежде масштаба.`,
      },
      {
        eyebrow: `Шаг 08 — Управление`,
        title: `Управление и контроль.`,
        essence: `Люди сохраняют контроль.`,
        copy: `Мы определяем, что система может делать самостоятельно, что может предлагать и что всегда требует человеческого решения. Мощно, но под надзором.`,
      },
      {
        eyebrow: `Шаг 09 — Обучение`,
        title: `Обучение и внедрение.`,
        essence: `Технология работает только если люди её используют.`,
        copy: `Мы обучаем ваши команды ежедневному использованию — а не работе с документацией. ИИ-персонал позиционируется как поддержка, а не помеха.`,
      },
      {
        eyebrow: `Шаг 10 — Дорожная карта`,
        title: `Дорожная карта оптимизации.`,
        essence: `Внедрение — это начало.`,
        copy: `Мы предоставляем дорожную карту для следующих шагов — новые процессы, расширение отделов, более глубокие интеграции. Инфраструктура растёт по мере того, как ваша компания учится её использовать.`,
      },
    ],
  },
}

// ── All process-page CSS injected as a style tag ──
const CSS = `
  .process-hero { padding: 180px 0 64px; text-align: center; display: flex; flex-direction: column; align-items: center; }
  .process-hero .eyebrow { text-align: center; }
  .process-hero h1 { font-family: var(--font-serif-ai); font-size: clamp(36px,4.2vw,58px); line-height: 1.24; padding-bottom: 0.1em; max-width: 100%; white-space: nowrap; margin-top: 16px; text-align: center; font-weight: 400; letter-spacing: -0.02em; }
  @media (max-width: 700px) { .process-hero h1 { white-space: normal; font-size: clamp(32px,7vw,46px); } }
  .process-hero__lines { margin-top: 28px; display: grid; gap: 5px; text-align: center; list-style: none; padding: 0; margin-left: auto; margin-right: auto; }
  .process-hero__lines li { font-size: 16px; color: var(--ai-fg-muted); line-height: 1.5; }
  .process-hero__explore { display: inline-flex; align-items: center; gap: 8px; margin-top: 44px; font-size: 14px; font-weight: 500; color: var(--ai-accent); letter-spacing: 0.01em; text-decoration: none; transition: gap 160ms cubic-bezier(.2,.7,.2,1); }
  .process-hero__explore:hover { gap: 12px; }
  .process-hero__explore svg { transition: transform 160ms cubic-bezier(.2,.7,.2,1); }
  .process-hero__explore:hover svg { transform: translateY(3px); }

  .process-shell { display: grid; grid-template-columns: 260px minmax(0,1fr) 64px; gap: 40px; padding: 32px 0 96px; }
  @media (max-width: 1000px) { .process-shell { grid-template-columns: 1fr; gap: 0; padding-bottom: 64px; } }

  .process-rail { position: sticky; top: 100px; align-self: start; padding: 20px 0; font-size: 13px; }
  @media (max-width: 1000px) { .process-rail { display: none; } }
  .process-rail__title { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--ai-fg-soft); margin-bottom: 16px; }
  .process-rail__list { display: grid; gap: 2px; }
  .process-rail__item { display: grid; grid-template-columns: 14px 1fr; gap: 10px; align-items: center; padding: 7px 0; color: var(--ai-fg-muted); opacity: 0.4; transition: opacity 280ms cubic-bezier(.2,.7,.2,1), color 280ms cubic-bezier(.2,.7,.2,1); cursor: pointer; background: transparent; border: 0; text-align: left; font: inherit; width: 100%; }
  .process-rail__item:hover { opacity: 0.75; }
  .process-rail__item .dot { width: 5px; height: 5px; border-radius: 999px; background: var(--ai-fg-soft); margin-left: 5px; transition: background 280ms, width 280ms, height 280ms; }
  .process-rail__item.is-active { opacity: 1; color: var(--ai-accent); font-weight: 500; }
  .process-rail__item.is-active .dot { background: var(--ai-accent); width: 8px; height: 8px; margin-left: 3px; box-shadow: 0 0 0 3px color-mix(in srgb,var(--ai-accent) 16%,transparent); }
  .process-rail__num { font-family: var(--font-serif-ai); font-size: 11px; color: var(--ai-fg-soft); margin-right: 2px; }

  .process-progress { position: sticky; top: 100px; align-self: start; width: 2px; height: calc(100vh - 180px); background: var(--ai-border); border-radius: 999px; margin-left: auto; overflow: hidden; }
  @media (max-width: 1000px) { .process-progress { display: none; } }
  .process-progress__fill { width: 100%; background: var(--ai-accent); height: 0%; transition: height .12s linear; }

  .process-steps { display: grid; gap: 0; }
  .process-step { position: relative; min-height: 62vh; padding: 56px 0; display: grid; grid-template-columns: minmax(0,1fr) 260px; gap: 48px; align-items: center; }
  @media (max-width: 900px) { .process-step { grid-template-columns: 1fr; gap: 28px; min-height: auto; padding: 48px 0; } }
  .process-step + .process-step { border-top: 1px solid var(--ai-border); }
  .process-step__bg-num { position: absolute; top: 32px; left: -12px; font-family: var(--font-serif-ai); font-size: clamp(100px,12vw,160px); line-height: 1; color: var(--ai-fg); opacity: 0.05; pointer-events: none; user-select: none; z-index: 0; }
  .process-step__left { position: relative; z-index: 1; will-change: transform, opacity; }
  .process-step__body { max-width: 520px; }
  .process-step__eyebrow { font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ai-accent); font-weight: 500; margin-bottom: 14px; }
  .process-step__title { font-family: var(--font-serif-ai); font-size: clamp(34px,3.8vw,46px); line-height: 1.28; padding-bottom: 0.06em; letter-spacing: -0.015em; font-weight: 400; }
  .process-step__essence { font-family: var(--font-serif-ai); font-style: italic; font-size: 21px; line-height: 1.4; color: var(--ai-fg); opacity: 0.68; margin-top: 14px; padding-bottom: 0.04em; }
  .process-step__copy { margin-top: 20px; font-size: 16px; line-height: 1.68; color: var(--ai-fg-muted); max-width: 480px; }

  .process-anchor { position: relative; z-index: 1; border: 1px solid var(--ai-border); border-radius: 16px; background: var(--ai-surface); padding: 24px; aspect-ratio: 4/5; overflow: hidden; will-change: transform, opacity; }
  @media (max-width: 900px) { .process-anchor { aspect-ratio: 16/9; } }

  .anchor-org { display: grid; gap: 14px; padding-top: 8px; align-content: start; }
  .anchor-org__root { align-self: center; justify-self: center; padding: 10px 18px; border-radius: 10px; background: var(--ai-accent); color: #fff; font-size: 12px; font-weight: 500; }
  html[data-ai-theme="black"] .anchor-org__root { color: #0a0e1a; }
  .anchor-org__line { display: block; height: 18px; width: 1px; background: var(--ai-border-strong); margin: 0 auto; }
  .anchor-org__row { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
  .anchor-org__cell { text-align: center; padding: 10px 8px; border: 1px solid var(--ai-border); border-radius: 10px; font-size: 11.5px; color: var(--ai-fg-muted); background: var(--ai-bg-2); }

  .anchor-blueprint { background: repeating-linear-gradient(to right,transparent 0 39px,var(--ai-border) 39px 40px),repeating-linear-gradient(to bottom,transparent 0 39px,var(--ai-border) 39px 40px); border-radius: 12px; padding: 16px; display: grid; gap: 8px; }
  .anchor-blueprint__row { display: flex; align-items: center; gap: 8px; font-size: 10.5px; color: var(--ai-fg-muted); }
  .anchor-blueprint__row .tag { font-family: ui-monospace,monospace; background: var(--ai-surface); border: 1px solid var(--ai-border); border-radius: 4px; padding: 1px 6px; color: var(--ai-accent); }
  .anchor-blueprint__row .line { flex: 1; height: 1px; background: var(--ai-accent); opacity: 0.4; }

  .anchor-depts { display: grid; gap: 8px; align-content: start; }
  .anchor-dept { border: 1px solid var(--ai-border); border-radius: 10px; padding: 10px 12px; background: var(--ai-bg-2); font-size: 12px; display: grid; gap: 4px; }
  .anchor-dept__name { color: var(--ai-fg); font-weight: 500; font-size: 12.5px; }
  .anchor-dept__hint { color: var(--ai-fg-soft); font-size: 11px; }
  .anchor-dept:hover { border-color: var(--ai-accent); background: color-mix(in srgb,var(--ai-accent) 4%,var(--ai-bg-2)); }

  .anchor-arch { display: grid; gap: 6px; align-content: center; padding-top: 16px; }
  .anchor-arch__layer { padding: 10px 12px; border-radius: 8px; border: 1px solid var(--ai-border); background: var(--ai-bg-2); font-size: 11px; color: var(--ai-fg-muted); display: flex; justify-content: space-between; align-items: center; }
  .anchor-arch__layer.is-accent { border-color: color-mix(in srgb,var(--ai-accent) 50%,transparent); background: color-mix(in srgb,var(--ai-accent) 8%,var(--ai-bg-2)); color: var(--ai-accent); }
  .anchor-arch__layer .tag { font-family: ui-monospace,monospace; font-size: 10px; opacity: .65; }

  .anchor-dash { display: grid; grid-template-rows: auto auto 1fr; gap: 10px; padding: 12px; background: var(--ai-bg-2); border: 1px solid var(--ai-border); border-radius: 12px; height: 100%; }
  .anchor-dash__title { font-family: var(--font-serif-ai); font-size: 14px; }
  .anchor-dash__kpi-row { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .anchor-dash__kpi { background: var(--ai-surface); border: 1px solid var(--ai-border); border-radius: 6px; padding: 8px 10px; font-size: 10.5px; }
  .anchor-dash__kpi b { font-family: var(--font-serif-ai); font-size: 16px; display: block; color: var(--ai-fg); }
  .anchor-dash__rows { display: grid; gap: 4px; }
  .anchor-dash__lane { display: grid; grid-template-columns: 60px 1fr 12px; gap: 8px; align-items: center; font-size: 10.5px; padding: 5px 6px; background: var(--ai-surface); border: 1px solid var(--ai-border); border-radius: 6px; }
  .anchor-dash__bar { background: var(--ai-bg-3); height: 4px; border-radius: 999px; overflow: hidden; position: relative; }
  .anchor-dash__bar i { position: absolute; inset: 0; right: auto; background: var(--ai-accent); border-radius: 999px; }
  .anchor-dash__tick { width: 8px; height: 8px; border-radius: 999px; background: color-mix(in srgb,var(--ai-accent) 30%,transparent); }

  .anchor-tools { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; align-content: start; padding-top: 8px; }
  .anchor-tools__cell { padding: 14px 6px; text-align: center; border: 1px solid var(--ai-border); border-radius: 8px; background: var(--ai-bg-2); font-size: 11px; color: var(--ai-fg-muted); position: relative; }
  .anchor-tools__cell::after { content: ""; position: absolute; left: 50%; bottom: -7px; width: 1px; height: 7px; background: var(--ai-accent); opacity: 0.5; }
  .anchor-tools__hub { grid-column: 1/-1; margin-top: 4px; padding: 12px; text-align: center; background: var(--ai-accent); color: #fff; border-radius: 8px; font-size: 11.5px; font-weight: 500; }
  html[data-ai-theme="black"] .anchor-tools__hub { color: #0a0e1a; }

  .anchor-rollout { display: grid; gap: 10px; align-content: center; padding-top: 8px; }
  .anchor-rollout__row { display: grid; grid-template-columns: 80px 1fr; gap: 12px; font-size: 11.5px; align-items: center; }
  .anchor-rollout__row .dept { color: var(--ai-fg); }
  .anchor-rollout__row .bar { height: 6px; border-radius: 999px; background: var(--ai-bg-3); position: relative; overflow: hidden; }
  .anchor-rollout__row .bar::after { content: ""; position: absolute; inset: 0; right: auto; background: var(--ai-accent); border-radius: 999px; width: var(--w,0%); transition: width 1s cubic-bezier(.2,.7,.2,1); }

  .anchor-matrix { padding-top: 8px; }
  .anchor-matrix__row { display: grid; grid-template-columns: 1fr 60px 60px 60px; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--ai-border); font-size: 11.5px; }
  .anchor-matrix__row:last-child { border-bottom: 0; }
  .anchor-matrix__row.head { color: var(--ai-fg-soft); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
  .anchor-matrix__cell { text-align: center; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 4px; margin: 0 auto; }
  .anchor-matrix__cell.auto { background: color-mix(in srgb,var(--ai-accent) 14%,transparent); color: var(--ai-accent); }
  .anchor-matrix__cell.gate { background: color-mix(in srgb,var(--mindzy-gold) 24%,transparent); color: #8a6d12; }
  html[data-ai-theme="black"] .anchor-matrix__cell.gate { color: #e6c768; }
  .anchor-matrix__cell.human { background: var(--ai-bg-3); color: var(--ai-fg); }

  .anchor-roles { display: grid; gap: 10px; padding-top: 8px; }
  .anchor-role { display: grid; grid-template-columns: 36px 1fr auto; gap: 12px; align-items: center; padding: 10px 12px; border: 1px solid var(--ai-border); border-radius: 10px; background: var(--ai-bg-2); font-size: 12px; }
  .anchor-role__ico { width: 32px; height: 32px; border-radius: 999px; background: color-mix(in srgb,var(--ai-accent) 14%,transparent); color: var(--ai-accent); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-serif-ai); font-size: 14px; }
  .anchor-role__name { color: var(--ai-fg); }
  .anchor-role__access { color: var(--ai-fg-soft); font-size: 10.5px; letter-spacing: .04em; text-transform: uppercase; }

  .anchor-future { padding-top: 8px; display: grid; gap: 10px; }
  .anchor-future__row { display: grid; grid-template-columns: 64px 1fr; gap: 10px; align-items: center; font-size: 11.5px; }
  .anchor-future__row .when { font-family: var(--font-serif-ai); color: var(--ai-accent); font-size: 13px; }
  .anchor-future__row .what { border-left: 1px solid var(--ai-border); padding-left: 10px; color: var(--ai-fg-muted); }
  .anchor-future__row.is-now .what { border-color: var(--ai-accent); color: var(--ai-fg); }

  .process-close { padding: 100px 0 80px; border-top: 1px solid var(--ai-border); text-align: center; }
  .process-close h2 { font-family: var(--font-serif-ai); font-size: clamp(38px,5vw,62px); line-height: 1.26; max-width: 16ch; margin: 0 auto; padding-bottom: 0.1em; font-weight: 400; letter-spacing: -0.02em; }
  .process-close__body { margin: 32px auto 0; color: var(--ai-fg-muted); font-size: 17px; line-height: 1.7; max-width: 540px; }
  .process-close .btn-wrap { margin-top: 40px; display: flex; justify-content: center; }

  .eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ai-accent); }
`

const STEP_IDS = [
  'step-1', 'step-2', 'step-3', 'step-4', 'step-5',
  'step-6', 'step-7', 'step-8', 'step-9', 'step-10',
]

const STEP_NUMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

function buildAnchors() {
  return [
    (
      <div className="process-anchor anchor-org">
        <div className="anchor-org__root">Leadership</div>
        <span className="anchor-org__line" />
        <div className="anchor-org__row">
          <div className="anchor-org__cell">Sales</div>
          <div className="anchor-org__cell">Operations</div>
          <div className="anchor-org__cell">Support</div>
        </div>
        <div className="anchor-org__row">
          <div className="anchor-org__cell">Finance</div>
          <div className="anchor-org__cell">HR</div>
          <div className="anchor-org__cell">Admin</div>
        </div>
      </div>
    ),
    (
      <div className="process-anchor anchor-blueprint">
        {[['workflow','Lead qualification'],['tool','HubSpot · Gmail'],['model','MindFast'],['gate','Manager approval'],['kpi','Response time'],['phase','Pilot · 30 days']].map(([tag,label]) => (
          <div key={tag} className="anchor-blueprint__row"><span className="tag">{tag}</span><span className="line" /><span>{label}</span></div>
        ))}
      </div>
    ),
    (
      <div className="process-anchor anchor-depts">
        {[['Sales','Lead qualification · CRM enrichment · follow-ups'],['Operations','Dispatch · exception handling · SLA tracking'],['Administration','Invoice extraction · form automation · audit prep'],['Support','Triage · summarization · escalation routing'],['Management','Quarterly briefings · cross-team reporting']].map(([name,hint]) => (
          <div key={name} className="anchor-dept"><span className="anchor-dept__name">{name}</span><span className="anchor-dept__hint">{hint}</span></div>
        ))}
      </div>
    ),
    (
      <div className="process-anchor anchor-arch">
        <div className="anchor-arch__layer is-accent"><span>Mindzy AI Infrastructure</span><span className="tag">L5</span></div>
        <div className="anchor-arch__layer"><span>Governance · Validation · Audit</span><span className="tag">L4</span></div>
        <div className="anchor-arch__layer"><span>Model Orchestration</span><span className="tag">L3</span></div>
        <div className="anchor-arch__layer"><span>Mindzy Connectors</span><span className="tag">L2</span></div>
        <div className="anchor-arch__layer"><span>Your Tools &amp; Systems</span><span className="tag">L1</span></div>
      </div>
    ),
    (
      <div className="process-anchor anchor-dash">
        <div className="anchor-dash__title">acme.mindzy.local</div>
        <div className="anchor-dash__kpi-row">
          <div className="anchor-dash__kpi"><b>~50</b>workflows live</div>
          <div className="anchor-dash__kpi"><b>8</b>awaiting validation</div>
        </div>
        <div className="anchor-dash__rows">
          {[['Sales','30%'],['Ops','58%'],['Support','8%'],['Admin','42%']].map(([name,right]) => (
            <div key={name} className="anchor-dash__lane">
              <span>{name}</span>
              <span className="anchor-dash__bar"><i style={{right}} /></span>
              <span className="anchor-dash__tick" />
            </div>
          ))}
        </div>
      </div>
    ),
    (
      <div className="process-anchor anchor-tools">
        {['CRM','Gmail','Drive','ERP','Notion','Slack','Sheets','Calendar','Legacy'].map(t => <div key={t} className="anchor-tools__cell">{t}</div>)}
        <div className="anchor-tools__hub">Mindzy Connectors</div>
      </div>
    ),
    (
      <div className="process-anchor anchor-rollout">
        {[['Sales','100%'],['Operations','70%'],['Support','45%'],['Admin','15%'],['Finance','0%']].map(([dept,w]) => (
          <div key={dept} className="anchor-rollout__row">
            <span className="dept">{dept}</span>
            <span className="bar" style={{'--w': w} as React.CSSProperties} />
          </div>
        ))}
      </div>
    ),
    (
      <div className="process-anchor anchor-matrix">
        <div className="anchor-matrix__row head"><span>Action</span><span>Team</span><span>Manager</span><span>Lead</span></div>
        {[['Read CRM','auto','auto','auto'],['Draft email','auto','auto','auto'],['Send email','gate','auto','auto'],['Update CRM','gate','auto','auto'],['Approve invoice','human','gate','auto'],['Wire transfer','human','human','gate']].map(([action,...cells]) => (
          <div key={action} className="anchor-matrix__row">
            <span>{action}</span>
            {cells.map((c,i) => <span key={i} className={`anchor-matrix__cell ${c}`}>{c==='auto'?'✓':c==='gate'?'!':'·'}</span>)}
          </div>
        ))}
      </div>
    ),
    (
      <div className="process-anchor anchor-roles">
        {[['E','Executive','Global view'],['M','Manager','Department'],['T','Team member','Operational']].map(([ico,name,access]) => (
          <div key={name} className="anchor-role">
            <span className="anchor-role__ico">{ico}</span>
            <span className="anchor-role__name">{name}</span>
            <span className="anchor-role__access">{access}</span>
          </div>
        ))}
      </div>
    ),
    (
      <div className="process-anchor anchor-future">
        <div className="anchor-future__row is-now"><span className="when">Q1</span><span className="what">Sales workforce live · 3 workflows in production</span></div>
        <div className="anchor-future__row"><span className="when">Q2</span><span className="what">Operations rollout · CRM connector expansion</span></div>
        <div className="anchor-future__row"><span className="when">Q3</span><span className="what">Finance &amp; reconciliation workflows</span></div>
        <div className="anchor-future__row"><span className="when">Q4</span><span className="what">Cross-department orchestration · executive layer</span></div>
        <div className="anchor-future__row"><span className="when">Y2</span><span className="what">New workflows surfaced from quarterly reviews</span></div>
      </div>
    ),
  ]
}

export default function ProcessPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en
  const anchors = buildAnchors()

  useEffect(() => {
    // Ported directly from process.html script
    const rail  = document.getElementById('processRail')
    const items = rail ? Array.from(rail.querySelectorAll<HTMLElement>('.process-rail__item')) : []
    const steps = Array.from(document.querySelectorAll<HTMLElement>('.process-step'))
    const fill  = document.getElementById('processProgressFill') as HTMLElement | null

    items.forEach(it => {
      it.addEventListener('click', () => {
        const target = it.dataset.target
        if (target) {
          const el = document.getElementById(target)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id
            items.forEach(i => i.classList.toggle('is-active', i.dataset.target === id))
          }
        })
      }, { rootMargin: '-30% 0px -30% 0px', threshold: 0.01 })
      steps.forEach(s => io.observe(s))
    }

    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

    const pairs = steps.map(step => ({
      left:  step.querySelector<HTMLElement>('.process-step__left'),
      right: step.querySelector<HTMLElement>('.process-anchor'),
      bgNum: step.querySelector<HTMLElement>('.process-step__bg-num'),
    }))

    // Set initial hidden state
    pairs.forEach(({ left, right }) => {
      if (left)  { left.style.transform  = 'translateX(-52px)'; left.style.opacity  = '0' }
      if (right) { right.style.transform = 'translateX(52px)';  right.style.opacity = '0' }
    })

    function updateProgress() {
      if (!fill || !steps.length) return
      const first = steps[0].getBoundingClientRect().top + window.scrollY
      const last  = steps[steps.length - 1].getBoundingClientRect().bottom + window.scrollY
      const total = last - first
      const here  = Math.min(Math.max(window.scrollY + window.innerHeight * 0.5 - first, 0), total)
      fill.style.height = ((here / total) * 100).toFixed(1) + '%'
    }

    function updateAnimations() {
      const vh = window.innerHeight
      pairs.forEach(({ left, right, bgNum }, i) => {
        const rect = steps[i].getBoundingClientRect()
        const raw = (vh - rect.top) / (vh * 0.72)
        const p   = easeOutCubic(Math.max(0, Math.min(1, raw)))
        if (left) {
          left.style.transform = `translateX(${(1 - p) * -52}px)`
          left.style.opacity   = (p < 0.01 ? 0 : Math.min(1, p * 1.5)).toFixed(3)
        }
        if (right) {
          right.style.transform = `translateX(${(1 - p) * 52}px)`
          right.style.opacity   = (p < 0.01 ? 0 : Math.min(1, p * 1.5)).toFixed(3)
        }
        if (bgNum) bgNum.style.transform = `translateY(${(1 - p) * 16}px)`
      })
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateAnimations(); updateProgress(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateAnimations()
    updateProgress()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Hero */}
      <section className="process-hero">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="eyebrow">{t.heroEyebrow}</div>
          <h1>
            <em style={{ fontStyle: 'italic' }}>{t.heroH1a}</em><br />
            {t.heroH1b}
          </h1>
          <ul className="process-hero__lines">
            {t.heroLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <a href="#step-1" className="process-hero__explore">
            {t.heroExplore}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v10M3 8l4 4 4-4"/></svg>
          </a>
        </div>
      </section>

      {/* Steps shell */}
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="process-shell">
          {/* Left rail */}
          <aside className="process-rail" aria-label="Process steps">
            <div className="process-rail__title">{t.railTitle}</div>
            <div className="process-rail__list" id="processRail">
              {t.steps.map((s, i) => (
                <button key={STEP_IDS[i]} className={`process-rail__item${i === 0 ? ' is-active' : ''}`} data-target={STEP_IDS[i]}>
                  <span className="dot" />
                  <span><span className="process-rail__num">{STEP_NUMS[i]}</span>{s.title.replace('.','')}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Steps */}
          <div className="process-steps">
            {t.steps.map((s, i) => (
              <section key={STEP_IDS[i]} className="process-step" id={STEP_IDS[i]}>
                <div className="process-step__left">
                  <span className="process-step__bg-num" aria-hidden="true">{STEP_NUMS[i]}</span>
                  <div className="process-step__body">
                    <div className="process-step__eyebrow">{s.eyebrow}</div>
                    <h2 className="process-step__title">{s.title}</h2>
                    <p className="process-step__essence">{s.essence}</p>
                    <div className="process-step__copy"><p>{s.copy}</p></div>
                  </div>
                </div>
                {anchors[i]}
              </section>
            ))}
          </div>

          {/* Right progress bar */}
          <div className="process-progress" aria-hidden="true">
            <div className="process-progress__fill" id="processProgressFill" />
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <section className="process-close">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <h2>
            {t.closingH2a}<br />
            {t.closingH2b}<br />
            <em style={{ fontStyle: 'italic' }}>{t.closingH2c}</em>
          </h2>
          <p className="process-close__body">
            {t.closingBody.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="process-close .btn-wrap" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <GlassButton href="https://calendar.app.google/ghE79tSFxmea4Scd9" external>
              {t.closingCta}
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
