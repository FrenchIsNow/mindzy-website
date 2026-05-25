'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'

const CSS = `
@keyframes mt-blink { 0%,100%{opacity:1}50%{opacity:0} }

.faq-hero { padding:128px 0 56px; text-align:center; }
.faq-hero h1 { font-family:var(--font-serif-ai); font-size:clamp(36px,5vw,64px); line-height:1.22; padding-bottom:0.1em; max-width:22ch; margin:18px auto 0; font-weight:400; letter-spacing:-0.02em; }
.faq-hero p { margin:24px auto 0; color:var(--ai-fg-muted); font-size:19px; max-width:560px; line-height:1.6; }

.faq-search { margin:40px auto 0; display:flex; align-items:center; gap:12px; padding:14px 20px; border:1px solid var(--ai-border); background:var(--ai-surface); border-radius:999px; max-width:520px; }
.faq-search svg { width:16px; height:16px; color:var(--ai-fg-soft); flex-shrink:0; }
.faq-search input { flex:1; border:0; background:transparent; font:inherit; font-size:15px; color:var(--ai-fg); outline:none; }
.faq-search input::placeholder { color:var(--ai-fg-soft); }

.faq-shell { display:grid; grid-template-columns:200px minmax(0,1fr); gap:56px; padding:64px 0 96px; }
@media(max-width:900px){.faq-shell{grid-template-columns:1fr;gap:24px;}}

.faq-nav { position:sticky; top:110px; align-self:start; font-size:14px; }
@media(max-width:900px){.faq-nav{display:none;}}
.faq-nav__title { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--ai-fg-soft); margin-bottom:14px; }
.faq-nav__list { display:grid; gap:4px; }
.faq-nav__list a { padding:6px 0; color:var(--ai-fg-muted); text-decoration:none; display:block; transition:color 160ms; }
.faq-nav__list a:hover { color:var(--ai-fg); }

.faq-category { padding:32px 0; border-top:1px solid var(--ai-border); }
.faq-category:first-of-type { border-top:0; padding-top:0; }
.faq-category h2 { font-family:var(--font-serif-ai); font-size:clamp(28px,3.2vw,36px); margin-bottom:18px; padding-bottom:0.04em; font-weight:400; letter-spacing:-0.02em; }

.faq-item { border-bottom:1px solid var(--ai-border); }
.faq-item__q { width:100%; text-align:left; padding:22px 8px 22px 0; display:grid; grid-template-columns:1fr 24px; align-items:center; gap:16px; font-size:17px; color:var(--ai-fg); background:transparent; border:0; cursor:pointer; transition:color 160ms; letter-spacing:-.005em; font-family:inherit; }
.faq-item__q:hover,.faq-item.is-open .faq-item__q { color:var(--ai-accent); }
.faq-item__q .chev { width:16px; height:16px; color:var(--ai-fg-soft); transition:transform 280ms cubic-bezier(.2,.7,.2,1),color 160ms; flex-shrink:0; }
.faq-item.is-open .faq-item__q .chev { transform:rotate(180deg); color:var(--ai-accent); }

.faq-item__a { overflow:hidden; height:0; transition:height 280ms ease-out; color:var(--ai-fg-muted); font-size:16px; line-height:1.65; }
.faq-item__inner { padding:0 8px 24px 0; max-width:72ch; }
.faq-item__inner p+p { margin-top:14px; }
.faq-item__inner .micro-cta { margin-top:18px; display:inline-flex; align-items:center; gap:6px; color:var(--ai-accent); font-weight:500; border-bottom:1px solid var(--ai-accent); padding-bottom:2px; font-size:14px; text-decoration:none; }

.faq-empty { padding:56px 0; text-align:center; color:var(--ai-fg-soft); font-size:15px; }

.eyebrow-faq { font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--ai-accent); }
`

const MORPH_INTERVAL = 3200
const MORPH_DURATION = 700
const MORPH_STEPS = 22

interface FaqItemTranslation {
  id: string
  q: string
  paragraphs: string[]
  cta?: { text: string; href: string; external?: boolean }
}

interface FaqCategoryTranslation {
  id: string
  title: string
  items: FaqItemTranslation[]
}

interface LocaleTranslation {
  hero: {
    eyebrow: string
    searchPlaceholder: string
    searchAriaLabel: string
    intro: string
    morphWords: string[]
    heading: string
    headingPrefix: string
    navTitle: string
    noResults: string
    noResultsLink: string
  }
  faqs: FaqCategoryTranslation[]
}

const TRANSLATIONS: Record<string, LocaleTranslation> = {
  en: {
    hero: {
      eyebrow: 'Frequently asked',
      searchPlaceholder: 'Search the FAQ…',
      searchAriaLabel: 'Search the FAQ',
      intro: 'The questions we hear most often during the diagnosis call. If yours is not here, the calendar is the fastest way to reach us.',
      morphWords: ['building AI infrastructure', 'governing AI agents', 'deploying AI systems', 'operating AI workflows', 'scaling AI teams'],
      heading: 'Questions about',
      headingPrefix: 'Questions about',
      navTitle: 'Categories',
      noResults: 'No questions matched. Try a different keyword, or',
      noResultsLink: 'ask us directly',
    },
    faqs: [
      {
        id: 'about', title: 'About Mindzy',
        items: [
          {
            id: 'a1',
            q: 'What does Mindzy actually do?',
            paragraphs: ['Mindzy designs and builds custom AI infrastructure inside companies that want to integrate AI into their operations. Each deployment is built from scratch, around the client\'s hierarchy, tools, and workflows. We do not ship a pre-packaged product.'],
          },
          {
            id: 'a2',
            q: 'Who is Mindzy for?',
            paragraphs: ['Any company that wants to integrate AI into its operations — from traditional industrial companies, service firms, and financial institutions to retailers, logistics operators, and digital-first organizations. The same method applies across industries.'],
          },
          {
            id: 'a3',
            q: 'Are you an agency or a software company?',
            paragraphs: ['Neither. We are an infrastructure team. Our engineers no longer write code line by line — they manage agent teams that build, deploy, and operate the infrastructure under human supervision. Every project we deliver, including this website, goes through that same process.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Scope & method',
        items: [
          {
            id: 's1',
            q: 'Do you have a standard product?',
            paragraphs: ['No. Every Mindzy infrastructure is 100% custom. No template. No pre-built stack. No generic playbook. The architecture is defined by your business, not by ours.'],
            cta: { text: 'See our 10-step process →', href: '/process' },
          },
          {
            id: 's2',
            q: 'What is the executive diagnosis?',
            paragraphs: ['Every engagement starts with a structured diagnosis. We meet leadership and key stakeholders, study your departments, tools, workflows, bottlenecks, decision structure, and business priorities — and answer one question: where can AI create the highest business impact with the lowest unnecessary disruption?'],
          },
          {
            id: 's3',
            q: 'How long does a typical engagement take?',
            paragraphs: ['Most first operational AI workforces go live within 30 to 90 days from kickoff. Cross-department rollouts and the full optimization roadmap unfold over the following quarters. Every timeline is scoped per project during diagnosis.'],
          },
        ],
      },
      {
        id: 'models', title: 'Models & data',
        items: [
          {
            id: 'm1',
            q: 'Which models does Mindzy use?',
            paragraphs: [
              'Mindzy operates three proprietary models — MindFast (fast, lightweight, high-volume tasks), MindDeep (deep reasoning, long-context synthesis), and Mind 3.1 (balanced general-purpose execution).',
              'Alongside these, we provide access to every major LLM on the market — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen, and others. The right model for the right task, decided in real time.',
            ],
          },
          {
            id: 'm2',
            q: 'Will we be locked into your models?',
            paragraphs: ['No. Clients are never locked in. The model orchestration layer routes tasks based on fit, cost, latency, and your routing preferences. You can pin specific tasks to specific external providers if your team prefers it.'],
          },
          {
            id: 'm3',
            q: 'Where does our data go?',
            paragraphs: ['Data residency, retention, and provider boundaries are defined during the architecture step. We support EU residency, customer-owned infrastructure, and SSO/IAM integrations. We do not train models on your data without explicit, scoped consent.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Governance',
        items: [
          {
            id: 'g1',
            q: 'How do humans stay in control?',
            paragraphs: ['Every action in the system falls into one of three categories: fully automated, suggested for human review, or gated behind a human approval. The governance step defines which is which, per workflow, per role, per data scope.'],
          },
          {
            id: 'g2',
            q: 'Is everything auditable?',
            paragraphs: ['Yes. Every agent action, model call, validation decision, and approval is recorded in an audit log surfaced in the dashboard. Sensitive workflows (finance, client data, contracts) carry stricter gates by default.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Deployment',
        items: [
          {
            id: 'd1',
            q: 'Will you connect to our existing tools?',
            paragraphs: ['Yes. CRM, email, calendars, Drive, Microsoft 365, Notion, Slack, spreadsheets, project management tools, ERPs, custom internal software. When a tool does not expose a public API, we build the connector. The system adapts to your environment, never the opposite.'],
          },
          {
            id: 'd2',
            q: 'Big-bang or progressive rollout?',
            paragraphs: ['Always progressive. We deploy department by department, workflow by workflow. Every cutover is reversible until your team signs off. We have never delivered a big-bang rollout — and we never will.'],
          },
          {
            id: 'd3',
            q: 'Do you train our teams?',
            paragraphs: ['Yes. Training is the ninth step of the method. Executives, managers, and team members each receive practical training adapted to their level of access and how they will interact with the system day-to-day.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Pricing',
        items: [
          {
            id: 'p1',
            q: 'How much does a Mindzy engagement cost?',
            paragraphs: ['Scoped after diagnosis. Because every infrastructure is custom-built around the client\'s specific workflows, hierarchy, tools, and validation rules, pricing is defined during the diagnosis phase rather than published as a list price.'],
            cta: { text: 'Book a diagnosis call →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'What does the diagnosis itself cost?',
            paragraphs: ['The first 30-minute exploratory call is free. The structured executive diagnosis itself is scoped against the size and complexity of the company. We will tell you the exact figure on the first call.'],
          },
        ],
      },
      {
        id: 'after', title: 'After launch',
        items: [
          {
            id: 'af1',
            q: 'What happens after the system goes live?',
            paragraphs: ['We deliver an optimization roadmap that identifies what has been implemented, what is working well, what to improve, and which workflows or departments to expand next. AI transformation is not a one-time installation — it is a capability your company keeps getting better at using.'],
          },
          {
            id: 'af2',
            q: 'Who owns the infrastructure once it\'s built?',
            paragraphs: ['You do. The custom dashboard, connectors, workflows, and governance configuration are yours. The proprietary Mindzy models remain under license, alongside whichever external models you choose to route to.'],
            cta: { text: 'Still have a question? Talk to us →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  fr: {
    hero: {
      eyebrow: 'Questions fréquentes',
      searchPlaceholder: 'Rechercher dans la FAQ…',
      searchAriaLabel: 'Rechercher dans la FAQ',
      intro: 'Les questions que nous entendons le plus souvent lors de l\'appel de diagnostic. Si la vôtre n\'est pas ici, le calendrier est le moyen le plus rapide de nous joindre.',
      morphWords: ['construire une infrastructure IA', 'gouverner des agents IA', 'déployer des systèmes IA', 'piloter des workflows IA', 'faire évoluer les équipes IA'],
      heading: 'Questions sur',
      headingPrefix: 'Questions sur',
      navTitle: 'Catégories',
      noResults: 'Aucune question ne correspond. Essayez un autre mot-clé, ou',
      noResultsLink: 'posez-nous la question directement',
    },
    faqs: [
      {
        id: 'about', title: 'À propos de Mindzy',
        items: [
          {
            id: 'a1',
            q: 'Que fait concrètement Mindzy ?',
            paragraphs: ['Mindzy conçoit et construit des infrastructures IA sur mesure au sein des entreprises qui souhaitent intégrer l\'intelligence artificielle dans leurs opérations. Chaque déploiement est construit de zéro, autour de la hiérarchie, des outils et des workflows du client. Nous ne livrons pas de produit pré-packagé.'],
          },
          {
            id: 'a2',
            q: 'À qui s\'adresse Mindzy ?',
            paragraphs: ['À toute entreprise souhaitant intégrer l\'IA dans ses opérations — des entreprises industrielles traditionnelles, aux cabinets de services et aux institutions financières, en passant par les enseignes retail, les opérateurs logistiques et les organisations nativement digitales. La même méthode s\'applique à tous les secteurs.'],
          },
          {
            id: 'a3',
            q: 'Êtes-vous une agence ou une société logicielle ?',
            paragraphs: ['Ni l\'un ni l\'autre. Nous sommes une équipe infrastructure. Nos ingénieurs n\'écrivent plus le code ligne par ligne — ils pilotent des équipes d\'agents qui construisent, déploient et opèrent l\'infrastructure sous supervision humaine. Chaque projet que nous livrons, y compris ce site, passe par ce même processus.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Périmètre & méthode',
        items: [
          {
            id: 's1',
            q: 'Avez-vous un produit standard ?',
            paragraphs: ['Non. Chaque infrastructure Mindzy est 100 % sur mesure. Pas de template. Pas de stack pré-construite. Pas de playbook générique. L\'architecture est définie par votre métier, pas par le nôtre.'],
            cta: { text: 'Voir notre processus en 10 étapes →', href: '/process' },
          },
          {
            id: 's2',
            q: 'Qu\'est-ce que le diagnostic exécutif ?',
            paragraphs: ['Chaque engagement démarre par un diagnostic structuré. Nous rencontrons la direction et les parties prenantes clés, étudions vos départements, outils, workflows, goulots d\'étranglement, structure de décision et priorités métier — et répondons à une seule question : où l\'IA peut-elle créer le plus fort impact business avec le minimum de disruption inutile ?'],
          },
          {
            id: 's3',
            q: 'Combien de temps dure une mission type ?',
            paragraphs: ['La plupart des premières forces de travail IA opérationnelles sont mises en production en 30 à 90 jours à compter du lancement. Les déploiements inter-départementaux et la feuille de route d\'optimisation complète se déroulent sur les trimestres suivants. Chaque calendrier est défini par projet lors du diagnostic.'],
          },
        ],
      },
      {
        id: 'models', title: 'Modèles & données',
        items: [
          {
            id: 'm1',
            q: 'Quels modèles Mindzy utilise-t-il ?',
            paragraphs: [
              'Mindzy opère trois modèles propriétaires — MindFast (rapide, léger, tâches à fort volume), MindDeep (raisonnement profond, synthèse longue portée) et Mind 3.1 (exécution polyvalente équilibrée).',
              'En parallèle, nous donnons accès à tous les grands LLM du marché — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen et d\'autres. Le bon modèle pour la bonne tâche, décidé en temps réel.',
            ],
          },
          {
            id: 'm2',
            q: 'Serons-nous enfermés dans vos modèles ?',
            paragraphs: ['Non. Les clients ne sont jamais verrouillés. La couche d\'orchestration des modèles route les tâches en fonction de l\'adéquation, du coût, de la latence et de vos préférences de routage. Vous pouvez ancrer des tâches spécifiques chez des fournisseurs externes spécifiques si votre équipe le préfère.'],
          },
          {
            id: 'm3',
            q: 'Où vont nos données ?',
            paragraphs: ['La résidence des données, la rétention et les périmètres fournisseurs sont définis lors de l\'étape architecture. Nous supportons la résidence en UE, l\'infrastructure propriétaire du client et les intégrations SSO/IAM. Nous n\'entraînons pas les modèles sur vos données sans consentement explicite et délimité.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Gouvernance',
        items: [
          {
            id: 'g1',
            q: 'Comment les humains gardent-ils le contrôle ?',
            paragraphs: ['Chaque action du système appartient à l\'une de trois catégories : entièrement automatisée, soumise à revue humaine, ou conditionnée à une approbation humaine. L\'étape gouvernance définit laquelle s\'applique, par workflow, par rôle, par périmètre de données.'],
          },
          {
            id: 'g2',
            q: 'Tout est-il auditable ?',
            paragraphs: ['Oui. Chaque action d\'agent, appel de modèle, décision de validation et approbation est enregistrée dans un journal d\'audit accessible depuis le tableau de bord. Les workflows sensibles (finance, données clients, contrats) disposent par défaut de contrôles plus stricts.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Déploiement',
        items: [
          {
            id: 'd1',
            q: 'Vous connectez-vous à nos outils existants ?',
            paragraphs: ['Oui. CRM, email, agendas, Drive, Microsoft 365, Notion, Slack, tableurs, outils de gestion de projet, ERP, logiciels internes sur mesure. Lorsqu\'un outil n\'expose pas d\'API publique, nous construisons le connecteur. Le système s\'adapte à votre environnement, jamais l\'inverse.'],
          },
          {
            id: 'd2',
            q: 'Déploiement big-bang ou progressif ?',
            paragraphs: ['Toujours progressif. Nous déployons département par département, workflow par workflow. Chaque bascule est réversible jusqu\'à la validation par votre équipe. Nous n\'avons jamais livré un déploiement big-bang — et nous ne le ferons jamais.'],
          },
          {
            id: 'd3',
            q: 'Formez-vous nos équipes ?',
            paragraphs: ['Oui. La formation est la neuvième étape de la méthode. Dirigeants, managers et collaborateurs reçoivent chacun une formation pratique adaptée à leur niveau d\'accès et à la façon dont ils interagiront avec le système au quotidien.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Tarification',
        items: [
          {
            id: 'p1',
            q: 'Combien coûte une mission Mindzy ?',
            paragraphs: ['Défini après le diagnostic. Parce que chaque infrastructure est construite sur mesure autour des workflows, de la hiérarchie, des outils et des règles de validation spécifiques du client, le tarif est défini lors de la phase de diagnostic plutôt que publié en liste de prix.'],
            cta: { text: 'Réserver un appel diagnostic →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'Combien coûte le diagnostic lui-même ?',
            paragraphs: ['Le premier appel exploratoire de 30 minutes est gratuit. Le diagnostic exécutif structuré est calibré en fonction de la taille et de la complexité de l\'entreprise. Nous vous communiquerons le montant exact lors du premier appel.'],
          },
        ],
      },
      {
        id: 'after', title: 'Après le lancement',
        items: [
          {
            id: 'af1',
            q: 'Que se passe-t-il après la mise en production du système ?',
            paragraphs: ['Nous livrons une feuille de route d\'optimisation qui identifie ce qui a été implémenté, ce qui fonctionne bien, ce qui est à améliorer, et quels workflows ou départements développer en priorité. La transformation IA n\'est pas une installation ponctuelle — c\'est une capacité que votre entreprise ne cesse de maîtriser davantage.'],
          },
          {
            id: 'af2',
            q: 'À qui appartient l\'infrastructure une fois construite ?',
            paragraphs: ['À vous. Le tableau de bord personnalisé, les connecteurs, les workflows et la configuration de gouvernance vous appartiennent. Les modèles propriétaires Mindzy restent sous licence, aux côtés des modèles externes vers lesquels vous choisissez de router.'],
            cta: { text: 'Une autre question ? Parlez-nous →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  es: {
    hero: {
      eyebrow: 'Preguntas frecuentes',
      searchPlaceholder: 'Buscar en las FAQ…',
      searchAriaLabel: 'Buscar en las FAQ',
      intro: 'Las preguntas que escuchamos con más frecuencia durante la llamada de diagnóstico. Si la suya no está aquí, el calendario es la forma más rápida de contactarnos.',
      morphWords: ['construir infraestructura de IA', 'gobernar agentes de IA', 'desplegar sistemas de IA', 'operar flujos de trabajo de IA', 'escalar equipos de IA'],
      heading: 'Preguntas sobre',
      headingPrefix: 'Preguntas sobre',
      navTitle: 'Categorías',
      noResults: 'Ninguna pregunta coincide. Pruebe con otra palabra clave, o',
      noResultsLink: 'pregúntenos directamente',
    },
    faqs: [
      {
        id: 'about', title: 'Acerca de Mindzy',
        items: [
          {
            id: 'a1',
            q: '¿Qué hace exactamente Mindzy?',
            paragraphs: ['Mindzy diseña y construye infraestructura de IA personalizada dentro de empresas que desean integrar la inteligencia artificial en sus operaciones. Cada despliegue se construye desde cero, en torno a la jerarquía, las herramientas y los flujos de trabajo del cliente. No entregamos un producto preempaquetado.'],
          },
          {
            id: 'a2',
            q: '¿Para quién es Mindzy?',
            paragraphs: ['Para cualquier empresa que quiera integrar la IA en sus operaciones — desde empresas industriales tradicionales, firmas de servicios e instituciones financieras, hasta minoristas, operadores logísticos y organizaciones nativas digitales. El mismo método se aplica en todos los sectores.'],
          },
          {
            id: 'a3',
            q: '¿Son una agencia o una empresa de software?',
            paragraphs: ['Ninguna de las dos. Somos un equipo de infraestructura. Nuestros ingenieros ya no escriben código línea por línea — gestionan equipos de agentes que construyen, despliegan y operan la infraestructura bajo supervisión humana. Cada proyecto que entregamos, incluido este sitio web, pasa por ese mismo proceso.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Alcance y método',
        items: [
          {
            id: 's1',
            q: '¿Tienen un producto estándar?',
            paragraphs: ['No. Cada infraestructura de Mindzy es 100 % personalizada. Sin plantillas. Sin pila preconstruida. Sin libro de jugadas genérico. La arquitectura la define su negocio, no el nuestro.'],
            cta: { text: 'Ver nuestro proceso de 10 pasos →', href: '/process' },
          },
          {
            id: 's2',
            q: '¿Qué es el diagnóstico ejecutivo?',
            paragraphs: ['Cada compromiso comienza con un diagnóstico estructurado. Nos reunimos con los líderes y las partes interesadas clave, estudiamos sus departamentos, herramientas, flujos de trabajo, cuellos de botella, estructura de decisión y prioridades de negocio — y respondemos a una sola pregunta: ¿dónde puede la IA crear el mayor impacto empresarial con la menor disrupción innecesaria?'],
          },
          {
            id: 's3',
            q: '¿Cuánto dura un compromiso típico?',
            paragraphs: ['La mayoría de las primeras fuerzas de trabajo de IA operativas entran en producción entre 30 y 90 días desde el inicio. Los despliegues entre departamentos y la hoja de ruta de optimización completa se desarrollan durante los trimestres siguientes. Cada cronograma se define por proyecto durante el diagnóstico.'],
          },
        ],
      },
      {
        id: 'models', title: 'Modelos y datos',
        items: [
          {
            id: 'm1',
            q: '¿Qué modelos utiliza Mindzy?',
            paragraphs: [
              'Mindzy opera tres modelos propietarios — MindFast (rápido, ligero, tareas de alto volumen), MindDeep (razonamiento profundo, síntesis de contexto largo) y Mind 3.1 (ejecución equilibrada de uso general).',
              'Junto a estos, proporcionamos acceso a todos los principales LLM del mercado — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen y otros. El modelo adecuado para la tarea adecuada, decidido en tiempo real.',
            ],
          },
          {
            id: 'm2',
            q: '¿Quedaremos atados a sus modelos?',
            paragraphs: ['No. Los clientes nunca quedan atados. La capa de orquestación de modelos enruta las tareas en función de la idoneidad, el coste, la latencia y sus preferencias de enrutamiento. Puede fijar tareas específicas a proveedores externos específicos si su equipo lo prefiere.'],
          },
          {
            id: 'm3',
            q: '¿Adónde van nuestros datos?',
            paragraphs: ['La residencia de datos, la retención y los límites de proveedores se definen durante la etapa de arquitectura. Admitimos residencia en la UE, infraestructura propiedad del cliente e integraciones SSO/IAM. No entrenamos modelos con sus datos sin consentimiento explícito y delimitado.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Gobernanza',
        items: [
          {
            id: 'g1',
            q: '¿Cómo mantienen el control los humanos?',
            paragraphs: ['Cada acción del sistema cae en una de tres categorías: totalmente automatizada, sugerida para revisión humana o condicionada a una aprobación humana. El paso de gobernanza define cuál aplica, por flujo de trabajo, por rol, por ámbito de datos.'],
          },
          {
            id: 'g2',
            q: '¿Todo es auditable?',
            paragraphs: ['Sí. Cada acción de agente, llamada a modelo, decisión de validación y aprobación queda registrada en un registro de auditoría accesible desde el panel de control. Los flujos de trabajo sensibles (finanzas, datos de clientes, contratos) tienen controles más estrictos por defecto.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Despliegue',
        items: [
          {
            id: 'd1',
            q: '¿Se conectarán a nuestras herramientas existentes?',
            paragraphs: ['Sí. CRM, correo electrónico, calendarios, Drive, Microsoft 365, Notion, Slack, hojas de cálculo, herramientas de gestión de proyectos, ERPs, software interno personalizado. Cuando una herramienta no expone una API pública, construimos el conector. El sistema se adapta a su entorno, nunca al contrario.'],
          },
          {
            id: 'd2',
            q: '¿Despliegue masivo o progresivo?',
            paragraphs: ['Siempre progresivo. Desplegamos departamento por departamento, flujo de trabajo por flujo de trabajo. Cada transición es reversible hasta que su equipo la aprueba. Nunca hemos realizado un despliegue masivo — y nunca lo haremos.'],
          },
          {
            id: 'd3',
            q: '¿Forman a nuestros equipos?',
            paragraphs: ['Sí. La formación es el noveno paso del método. Ejecutivos, gerentes y miembros del equipo reciben cada uno una formación práctica adaptada a su nivel de acceso y a cómo interactuarán con el sistema día a día.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Precios',
        items: [
          {
            id: 'p1',
            q: '¿Cuánto cuesta un compromiso con Mindzy?',
            paragraphs: ['Se define después del diagnóstico. Dado que cada infraestructura se construye a medida en torno a los flujos de trabajo, la jerarquía, las herramientas y las reglas de validación específicas del cliente, el precio se define durante la fase de diagnóstico en lugar de publicarse como tarifa de lista.'],
            cta: { text: 'Reservar una llamada de diagnóstico →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: '¿Cuánto cuesta el diagnóstico en sí?',
            paragraphs: ['La primera llamada exploratoria de 30 minutos es gratuita. El diagnóstico ejecutivo estructurado se calibra en función del tamaño y la complejidad de la empresa. Le diremos la cifra exacta en la primera llamada.'],
          },
        ],
      },
      {
        id: 'after', title: 'Tras el lanzamiento',
        items: [
          {
            id: 'af1',
            q: '¿Qué ocurre después de que el sistema entre en producción?',
            paragraphs: ['Entregamos una hoja de ruta de optimización que identifica qué se ha implementado, qué funciona bien, qué mejorar y qué flujos de trabajo o departamentos ampliar a continuación. La transformación por IA no es una instalación puntual — es una capacidad que su empresa sigue mejorando.'],
          },
          {
            id: 'af2',
            q: '¿Quién es propietario de la infraestructura una vez construida?',
            paragraphs: ['Usted. El panel de control personalizado, los conectores, los flujos de trabajo y la configuración de gobernanza son suyos. Los modelos propietarios de Mindzy permanecen bajo licencia, junto con los modelos externos que elija enrutar.'],
            cta: { text: '¿Tiene otra pregunta? Hable con nosotros →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  de: {
    hero: {
      eyebrow: 'Häufig gestellte Fragen',
      searchPlaceholder: 'FAQ durchsuchen…',
      searchAriaLabel: 'FAQ durchsuchen',
      intro: 'Die Fragen, die wir im Diagnosegespräch am häufigsten hören. Wenn Ihre nicht dabei ist, ist der Kalender der schnellste Weg, uns zu erreichen.',
      morphWords: ['KI-Infrastruktur aufbauen', 'KI-Agenten steuern', 'KI-Systeme einsetzen', 'KI-Workflows betreiben', 'KI-Teams skalieren'],
      heading: 'Fragen zu',
      headingPrefix: 'Fragen zu',
      navTitle: 'Kategorien',
      noResults: 'Keine passenden Fragen gefunden. Versuchen Sie ein anderes Stichwort, oder',
      noResultsLink: 'fragen Sie uns direkt',
    },
    faqs: [
      {
        id: 'about', title: 'Über Mindzy',
        items: [
          {
            id: 'a1',
            q: 'Was macht Mindzy eigentlich?',
            paragraphs: ['Mindzy entwirft und baut maßgeschneiderte KI-Infrastruktur in Unternehmen, die KI in ihre Abläufe integrieren möchten. Jede Implementierung wird von Grund auf neu aufgebaut — abgestimmt auf die Hierarchie, Werkzeuge und Workflows des Kunden. Wir liefern kein vorgefertigtes Produkt.'],
          },
          {
            id: 'a2',
            q: 'Für wen ist Mindzy geeignet?',
            paragraphs: ['Für jedes Unternehmen, das KI in seine Abläufe integrieren möchte — von traditionellen Industrieunternehmen, Dienstleistungsfirmen und Finanzinstituten bis hin zu Einzelhändlern, Logistikbetreibern und digital-nativen Organisationen. Dieselbe Methode gilt branchenübergreifend.'],
          },
          {
            id: 'a3',
            q: 'Sind Sie eine Agentur oder ein Softwareunternehmen?',
            paragraphs: ['Keines von beidem. Wir sind ein Infrastrukturteam. Unsere Ingenieure schreiben keinen Code mehr Zeile für Zeile — sie steuern Agenten-Teams, die die Infrastruktur unter menschlicher Aufsicht aufbauen, einsetzen und betreiben. Jedes Projekt, das wir liefern, einschließlich dieser Website, durchläuft denselben Prozess.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Umfang & Methode',
        items: [
          {
            id: 's1',
            q: 'Haben Sie ein Standardprodukt?',
            paragraphs: ['Nein. Jede Mindzy-Infrastruktur ist zu 100 % individuell. Keine Vorlage. Kein vorgefertigter Stack. Kein generisches Playbook. Die Architektur wird von Ihrem Unternehmen definiert, nicht von unserem.'],
            cta: { text: 'Unseren 10-Schritte-Prozess ansehen →', href: '/process' },
          },
          {
            id: 's2',
            q: 'Was ist die Executive-Diagnose?',
            paragraphs: ['Jedes Engagement beginnt mit einer strukturierten Diagnose. Wir treffen uns mit der Führungsebene und wichtigen Stakeholdern, analysieren Ihre Abteilungen, Werkzeuge, Workflows, Engpässe, Entscheidungsstrukturen und Geschäftsprioritäten — und beantworten eine Frage: Wo kann KI den größten Geschäftsnutzen mit der geringsten unnötigen Störung erzeugen?'],
          },
          {
            id: 's3',
            q: 'Wie lange dauert ein typisches Engagement?',
            paragraphs: ['Die meisten ersten operativen KI-Belegschaften gehen innerhalb von 30 bis 90 Tagen nach Projektstart in Betrieb. Abteilungsübergreifende Rollouts und die vollständige Optimierungs-Roadmap entfalten sich in den folgenden Quartalen. Jeder Zeitplan wird projektspezifisch während der Diagnose festgelegt.'],
          },
        ],
      },
      {
        id: 'models', title: 'Modelle & Daten',
        items: [
          {
            id: 'm1',
            q: 'Welche Modelle verwendet Mindzy?',
            paragraphs: [
              'Mindzy betreibt drei proprietäre Modelle — MindFast (schnell, leichtgewichtig, Hochvolumenaufgaben), MindDeep (tiefes Reasoning, Langkontext-Synthese) und Mind 3.1 (ausgewogene Allzweckausführung).',
              'Daneben bieten wir Zugang zu allen wichtigen LLMs auf dem Markt — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen und andere. Das richtige Modell für die richtige Aufgabe, in Echtzeit entschieden.',
            ],
          },
          {
            id: 'm2',
            q: 'Werden wir an Ihre Modelle gebunden sein?',
            paragraphs: ['Nein. Kunden werden nie gesperrt. Die Modell-Orchestrierungsschicht leitet Aufgaben basierend auf Eignung, Kosten, Latenz und Ihren Routing-Präferenzen weiter. Sie können spezifische Aufgaben an spezifische externe Anbieter binden, wenn Ihr Team das bevorzugt.'],
          },
          {
            id: 'm3',
            q: 'Wohin gehen unsere Daten?',
            paragraphs: ['Datenresidenz, Aufbewahrung und Anbieter-Grenzen werden während des Architekturschritts definiert. Wir unterstützen EU-Residenz, kundeneigene Infrastruktur und SSO/IAM-Integrationen. Wir trainieren keine Modelle auf Ihren Daten ohne explizite, umgrenzte Zustimmung.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Governance',
        items: [
          {
            id: 'g1',
            q: 'Wie behalten Menschen die Kontrolle?',
            paragraphs: ['Jede Aktion im System fällt in eine von drei Kategorien: vollständig automatisiert, zur menschlichen Überprüfung vorgeschlagen oder hinter einer menschlichen Genehmigung gesperrt. Der Governance-Schritt legt fest, was was ist — pro Workflow, pro Rolle, pro Datenbereich.'],
          },
          {
            id: 'g2',
            q: 'Ist alles prüfbar?',
            paragraphs: ['Ja. Jede Agentenaktion, jeder Modellaufruf, jede Validierungsentscheidung und jede Genehmigung wird in einem Prüfprotokoll aufgezeichnet, das im Dashboard zugänglich ist. Sensible Workflows (Finanzen, Kundendaten, Verträge) haben standardmäßig strengere Kontrollen.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Deployment',
        items: [
          {
            id: 'd1',
            q: 'Verbinden Sie sich mit unseren bestehenden Tools?',
            paragraphs: ['Ja. CRM, E-Mail, Kalender, Drive, Microsoft 365, Notion, Slack, Tabellenkalkulationen, Projektmanagement-Tools, ERPs, benutzerdefinierte interne Software. Wenn ein Tool keine öffentliche API bereitstellt, bauen wir den Konnektor. Das System passt sich Ihrer Umgebung an, nie umgekehrt.'],
          },
          {
            id: 'd2',
            q: 'Big-Bang oder schrittweiser Rollout?',
            paragraphs: ['Immer schrittweise. Wir deployen Abteilung für Abteilung, Workflow für Workflow. Jede Umstellung ist reversibel, bis Ihr Team sie abzeichnet. Wir haben noch nie einen Big-Bang-Rollout geliefert — und werden es auch nie tun.'],
          },
          {
            id: 'd3',
            q: 'Schulen Sie unsere Teams?',
            paragraphs: ['Ja. Die Schulung ist der neunte Schritt der Methode. Führungskräfte, Manager und Teammitglieder erhalten jeweils eine praktische Schulung, die auf ihr Zugriffsniveau und ihre tägliche Interaktion mit dem System abgestimmt ist.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Preisgestaltung',
        items: [
          {
            id: 'p1',
            q: 'Was kostet ein Mindzy-Engagement?',
            paragraphs: ['Wird nach der Diagnose festgelegt. Da jede Infrastruktur maßgeschneidert rund um die spezifischen Workflows, die Hierarchie, die Tools und die Validierungsregeln des Kunden aufgebaut wird, wird der Preis während der Diagnosephase definiert und nicht als Listenpreis veröffentlicht.'],
            cta: { text: 'Diagnosegespräch buchen →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'Was kostet die Diagnose selbst?',
            paragraphs: ['Das erste 30-minütige Erkundungsgespräch ist kostenlos. Die strukturierte Executive-Diagnose selbst wird anhand der Größe und Komplexität des Unternehmens kalkuliert. Wir nennen Ihnen den genauen Betrag beim ersten Gespräch.'],
          },
        ],
      },
      {
        id: 'after', title: 'Nach dem Launch',
        items: [
          {
            id: 'af1',
            q: 'Was passiert nach dem Go-Live des Systems?',
            paragraphs: ['Wir liefern eine Optimierungs-Roadmap, die aufzeigt, was implementiert wurde, was gut funktioniert, was verbessert werden sollte und welche Workflows oder Abteilungen als nächstes ausgebaut werden sollen. KI-Transformation ist keine einmalige Installation — es ist eine Fähigkeit, die Ihr Unternehmen immer besser einsetzt.'],
          },
          {
            id: 'af2',
            q: 'Wem gehört die Infrastruktur nach dem Aufbau?',
            paragraphs: ['Ihnen. Das individuelle Dashboard, die Konnektoren, die Workflows und die Governance-Konfiguration gehören Ihnen. Die proprietären Mindzy-Modelle bleiben lizenziert, zusammen mit den externen Modellen, zu denen Sie routen möchten.'],
            cta: { text: 'Noch eine Frage? Sprechen Sie mit uns →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  it: {
    hero: {
      eyebrow: 'Domande frequenti',
      searchPlaceholder: 'Cerca nelle FAQ…',
      searchAriaLabel: 'Cerca nelle FAQ',
      intro: 'Le domande che sentiamo più spesso durante la chiamata di diagnosi. Se la tua non è qui, il calendario è il modo più rapido per raggiungerci.',
      morphWords: ['costruire infrastruttura IA', 'governare agenti IA', 'distribuire sistemi IA', 'operare workflow IA', 'scalare team IA'],
      heading: 'Domande su',
      headingPrefix: 'Domande su',
      navTitle: 'Categorie',
      noResults: 'Nessuna domanda corrisponde. Prova un termine diverso, oppure',
      noResultsLink: 'chiedici direttamente',
    },
    faqs: [
      {
        id: 'about', title: 'Chi è Mindzy',
        items: [
          {
            id: 'a1',
            q: 'Cosa fa concretamente Mindzy?',
            paragraphs: ['Mindzy progetta e costruisce infrastrutture IA personalizzate all\'interno di aziende che vogliono integrare l\'intelligenza artificiale nelle loro operazioni. Ogni implementazione è costruita da zero, attorno alla gerarchia, agli strumenti e ai workflow del cliente. Non consegniamo un prodotto preconfezionato.'],
          },
          {
            id: 'a2',
            q: 'A chi si rivolge Mindzy?',
            paragraphs: ['A qualsiasi azienda che voglia integrare l\'IA nelle proprie operazioni — dalle aziende industriali tradizionali, agli studi di servizi e agli istituti finanziari, fino ai retailer, agli operatori logistici e alle organizzazioni digitalmente native. Lo stesso metodo si applica in tutti i settori.'],
          },
          {
            id: 'a3',
            q: 'Siete un\'agenzia o una società software?',
            paragraphs: ['Nessuna delle due. Siamo un team di infrastruttura. I nostri ingegneri non scrivono più codice riga per riga — gestiscono team di agenti che costruiscono, distribuiscono e operano l\'infrastruttura sotto supervisione umana. Ogni progetto che consegniamo, incluso questo sito, passa attraverso lo stesso processo.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Ambito e metodo',
        items: [
          {
            id: 's1',
            q: 'Avete un prodotto standard?',
            paragraphs: ['No. Ogni infrastruttura Mindzy è personalizzata al 100%. Nessun template. Nessuno stack precostruito. Nessun playbook generico. L\'architettura è definita dal vostro business, non dal nostro.'],
            cta: { text: 'Scopri il nostro processo in 10 fasi →', href: '/process' },
          },
          {
            id: 's2',
            q: 'Cos\'è la diagnosi esecutiva?',
            paragraphs: ['Ogni impegno inizia con una diagnosi strutturata. Incontriamo la leadership e i principali stakeholder, studiamo i vostri reparti, strumenti, workflow, colli di bottiglia, struttura decisionale e priorità aziendali — e rispondiamo a una sola domanda: dove può l\'IA creare il maggiore impatto aziendale con la minore disruption non necessaria?'],
          },
          {
            id: 's3',
            q: 'Quanto dura un impegno tipico?',
            paragraphs: ['La maggior parte delle prime forze lavoro operative IA vanno in produzione entro 30-90 giorni dall\'avvio. I rollout tra dipartimenti e la roadmap di ottimizzazione completa si sviluppano nei trimestri successivi. Ogni cronoprogramma viene definito per progetto durante la diagnosi.'],
          },
        ],
      },
      {
        id: 'models', title: 'Modelli e dati',
        items: [
          {
            id: 'm1',
            q: 'Quali modelli utilizza Mindzy?',
            paragraphs: [
              'Mindzy opera tre modelli proprietari — MindFast (veloce, leggero, attività ad alto volume), MindDeep (ragionamento profondo, sintesi di contesti lunghi) e Mind 3.1 (esecuzione bilanciata per uso generale).',
              'Accanto a questi, forniamo accesso a tutti i principali LLM sul mercato — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen e altri. Il modello giusto per il compito giusto, deciso in tempo reale.',
            ],
          },
          {
            id: 'm2',
            q: 'Saremo vincolati ai vostri modelli?',
            paragraphs: ['No. I clienti non sono mai vincolati. Il livello di orchestrazione dei modelli instrada le attività in base all\'adeguatezza, al costo, alla latenza e alle preferenze di routing. È possibile fissare attività specifiche a provider esterni specifici se il vostro team lo preferisce.'],
          },
          {
            id: 'm3',
            q: 'Dove vanno i nostri dati?',
            paragraphs: ['La residenza dei dati, la conservazione e i confini dei provider sono definiti durante la fase di architettura. Supportiamo la residenza nell\'UE, l\'infrastruttura di proprietà del cliente e le integrazioni SSO/IAM. Non addestriamo modelli sui vostri dati senza consenso esplicito e delimitato.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Governance',
        items: [
          {
            id: 'g1',
            q: 'Come mantengono il controllo gli esseri umani?',
            paragraphs: ['Ogni azione nel sistema rientra in una delle tre categorie: completamente automatizzata, suggerita per la revisione umana, o condizionata a un\'approvazione umana. La fase di governance definisce quale si applica, per workflow, per ruolo, per ambito di dati.'],
          },
          {
            id: 'g2',
            q: 'Tutto è verificabile?',
            paragraphs: ['Sì. Ogni azione dell\'agente, chiamata al modello, decisione di validazione e approvazione viene registrata in un registro di controllo accessibile dalla dashboard. I workflow sensibili (finanza, dati dei clienti, contratti) hanno controlli più severi per impostazione predefinita.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Distribuzione',
        items: [
          {
            id: 'd1',
            q: 'Vi collegate ai nostri strumenti esistenti?',
            paragraphs: ['Sì. CRM, email, calendari, Drive, Microsoft 365, Notion, Slack, fogli di calcolo, strumenti di project management, ERP, software interno personalizzato. Quando uno strumento non espone un\'API pubblica, costruiamo il connettore. Il sistema si adatta al vostro ambiente, mai il contrario.'],
          },
          {
            id: 'd2',
            q: 'Rollout big-bang o progressivo?',
            paragraphs: ['Sempre progressivo. Distribuiamo reparto per reparto, workflow per workflow. Ogni migrazione è reversibile finché il vostro team non approva. Non abbiamo mai consegnato un rollout big-bang — e non lo faremo mai.'],
          },
          {
            id: 'd3',
            q: 'Formate i nostri team?',
            paragraphs: ['Sì. La formazione è il nono passo del metodo. Dirigenti, manager e membri del team ricevono ciascuno una formazione pratica adattata al loro livello di accesso e a come interagiranno con il sistema giorno per giorno.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Prezzi',
        items: [
          {
            id: 'p1',
            q: 'Quanto costa un impegno con Mindzy?',
            paragraphs: ['Definito dopo la diagnosi. Poiché ogni infrastruttura è costruita su misura attorno ai workflow specifici del cliente, alla gerarchia, agli strumenti e alle regole di validazione, il prezzo viene definito durante la fase di diagnosi piuttosto che pubblicato come listino prezzi.'],
            cta: { text: 'Prenota una chiamata di diagnosi →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'Quanto costa la diagnosi stessa?',
            paragraphs: ['La prima chiamata esplorativa di 30 minuti è gratuita. La diagnosi esecutiva strutturata viene calibrata in base alle dimensioni e alla complessità dell\'azienda. Vi comunicheremo la cifra esatta alla prima chiamata.'],
          },
        ],
      },
      {
        id: 'after', title: 'Dopo il lancio',
        items: [
          {
            id: 'af1',
            q: 'Cosa succede dopo che il sistema va in produzione?',
            paragraphs: ['Consegniamo una roadmap di ottimizzazione che identifica cosa è stato implementato, cosa funziona bene, cosa migliorare e quali workflow o reparti espandere successivamente. La trasformazione IA non è un\'installazione una tantum — è una capacità che la vostra azienda continua a migliorare nell\'utilizzo.'],
          },
          {
            id: 'af2',
            q: 'A chi appartiene l\'infrastruttura una volta costruita?',
            paragraphs: ['A voi. La dashboard personalizzata, i connettori, i workflow e la configurazione di governance sono vostri. I modelli proprietari Mindzy rimangono in licenza, insieme ai modelli esterni verso cui scegliete di instradare.'],
            cta: { text: 'Hai ancora domande? Parla con noi →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  pt: {
    hero: {
      eyebrow: 'Perguntas frequentes',
      searchPlaceholder: 'Pesquisar nas FAQ…',
      searchAriaLabel: 'Pesquisar nas FAQ',
      intro: 'As perguntas que ouvimos com mais frequência durante a chamada de diagnóstico. Se a sua não estiver aqui, o calendário é a forma mais rápida de nos contactar.',
      morphWords: ['construir infraestrutura de IA', 'governar agentes de IA', 'implantar sistemas de IA', 'operar fluxos de trabalho de IA', 'escalar equipes de IA'],
      heading: 'Perguntas sobre',
      headingPrefix: 'Perguntas sobre',
      navTitle: 'Categorias',
      noResults: 'Nenhuma pergunta correspondente. Tente uma palavra-chave diferente, ou',
      noResultsLink: 'pergunte-nos diretamente',
    },
    faqs: [
      {
        id: 'about', title: 'Sobre a Mindzy',
        items: [
          {
            id: 'a1',
            q: 'O que a Mindzy faz exatamente?',
            paragraphs: ['A Mindzy projeta e constrói infraestrutura de IA personalizada dentro de empresas que desejam integrar inteligência artificial nas suas operações. Cada implementação é construída do zero, em torno da hierarquia, ferramentas e fluxos de trabalho do cliente. Não entregamos um produto pré-embalado.'],
          },
          {
            id: 'a2',
            q: 'Para quem é a Mindzy?',
            paragraphs: ['Para qualquer empresa que queira integrar IA nas suas operações — de empresas industriais tradicionais, firmas de serviços e instituições financeiras a varejistas, operadores logísticos e organizações nativas digitais. O mesmo método se aplica em todos os setores.'],
          },
          {
            id: 'a3',
            q: 'São uma agência ou uma empresa de software?',
            paragraphs: ['Nenhuma das duas. Somos uma equipa de infraestrutura. Os nossos engenheiros já não escrevem código linha por linha — gerem equipas de agentes que constroem, implantam e operam a infraestrutura sob supervisão humana. Cada projeto que entregamos, incluindo este site, passa pelo mesmo processo.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Âmbito e método',
        items: [
          {
            id: 's1',
            q: 'Têm um produto padrão?',
            paragraphs: ['Não. Cada infraestrutura Mindzy é 100% personalizada. Sem modelos. Sem stack pré-construída. Sem playbook genérico. A arquitetura é definida pelo seu negócio, não pelo nosso.'],
            cta: { text: 'Ver o nosso processo de 10 passos →', href: '/process' },
          },
          {
            id: 's2',
            q: 'O que é o diagnóstico executivo?',
            paragraphs: ['Cada compromisso começa com um diagnóstico estruturado. Reunimos com a liderança e as principais partes interessadas, estudamos os seus departamentos, ferramentas, fluxos de trabalho, gargalos, estrutura de decisão e prioridades de negócio — e respondemos a uma única pergunta: onde pode a IA criar o maior impacto empresarial com a menor disrupção desnecessária?'],
          },
          {
            id: 's3',
            q: 'Quanto tempo dura um compromisso típico?',
            paragraphs: ['A maioria das primeiras forças de trabalho de IA operacionais entra em produção entre 30 e 90 dias após o arranque. Os rollouts interdepartamentais e o roteiro de otimização completo desenvolvem-se nos trimestres seguintes. Cada cronograma é definido por projeto durante o diagnóstico.'],
          },
        ],
      },
      {
        id: 'models', title: 'Modelos e dados',
        items: [
          {
            id: 'm1',
            q: 'Quais modelos a Mindzy utiliza?',
            paragraphs: [
              'A Mindzy opera três modelos proprietários — MindFast (rápido, leve, tarefas de alto volume), MindDeep (raciocínio profundo, síntese de contexto longo) e Mind 3.1 (execução equilibrada de uso geral).',
              'Além disso, fornecemos acesso a todos os principais LLMs do mercado — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen e outros. O modelo certo para a tarefa certa, decidido em tempo real.',
            ],
          },
          {
            id: 'm2',
            q: 'Ficaremos presos nos vossos modelos?',
            paragraphs: ['Não. Os clientes nunca ficam presos. A camada de orquestração de modelos encaminha tarefas com base na adequação, custo, latência e nas suas preferências de roteamento. Pode fixar tarefas específicas a fornecedores externos específicos se a sua equipa preferir.'],
          },
          {
            id: 'm3',
            q: 'Para onde vão os nossos dados?',
            paragraphs: ['A residência de dados, a retenção e os limites de fornecedores são definidos durante a etapa de arquitetura. Suportamos residência na UE, infraestrutura de propriedade do cliente e integrações SSO/IAM. Não treinamos modelos com os seus dados sem consentimento explícito e delimitado.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Governança',
        items: [
          {
            id: 'g1',
            q: 'Como os humanos mantêm o controlo?',
            paragraphs: ['Cada ação no sistema cai numa de três categorias: totalmente automatizada, sugerida para revisão humana ou condicionada a uma aprovação humana. A etapa de governança define qual se aplica, por fluxo de trabalho, por função, por âmbito de dados.'],
          },
          {
            id: 'g2',
            q: 'Tudo é auditável?',
            paragraphs: ['Sim. Cada ação de agente, chamada de modelo, decisão de validação e aprovação é registada num registo de auditoria acessível no painel de controlo. Os fluxos de trabalho sensíveis (finanças, dados de clientes, contratos) têm controlos mais rigorosos por defeito.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Implementação',
        items: [
          {
            id: 'd1',
            q: 'Ligam-se às nossas ferramentas existentes?',
            paragraphs: ['Sim. CRM, email, calendários, Drive, Microsoft 365, Notion, Slack, folhas de cálculo, ferramentas de gestão de projetos, ERPs, software interno personalizado. Quando uma ferramenta não expõe uma API pública, construímos o conector. O sistema adapta-se ao vosso ambiente, nunca o contrário.'],
          },
          {
            id: 'd2',
            q: 'Rollout big-bang ou progressivo?',
            paragraphs: ['Sempre progressivo. Implementamos departamento por departamento, fluxo de trabalho por fluxo de trabalho. Cada migração é reversível até a vossa equipa aprovar. Nunca entregámos um rollout big-bang — e nunca o faremos.'],
          },
          {
            id: 'd3',
            q: 'Formam as nossas equipas?',
            paragraphs: ['Sim. A formação é o nono passo do método. Executivos, gestores e membros da equipa recebem cada um formação prática adaptada ao seu nível de acesso e à forma como irão interagir com o sistema no dia-a-dia.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Preços',
        items: [
          {
            id: 'p1',
            q: 'Quanto custa um compromisso com a Mindzy?',
            paragraphs: ['Definido após o diagnóstico. Como cada infraestrutura é construída à medida em torno dos fluxos de trabalho específicos do cliente, hierarquia, ferramentas e regras de validação, o preço é definido durante a fase de diagnóstico em vez de publicado como preço de tabela.'],
            cta: { text: 'Agendar uma chamada de diagnóstico →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'Quanto custa o próprio diagnóstico?',
            paragraphs: ['A primeira chamada exploratória de 30 minutos é gratuita. O diagnóstico executivo estruturado é calibrado em função do tamanho e complexidade da empresa. Diremos o valor exato na primeira chamada.'],
          },
        ],
      },
      {
        id: 'after', title: 'Após o lançamento',
        items: [
          {
            id: 'af1',
            q: 'O que acontece após o sistema entrar em produção?',
            paragraphs: ['Entregamos um roteiro de otimização que identifica o que foi implementado, o que está a funcionar bem, o que melhorar e quais fluxos de trabalho ou departamentos expandir a seguir. A transformação de IA não é uma instalação única — é uma capacidade que a sua empresa continua a melhorar na utilização.'],
          },
          {
            id: 'af2',
            q: 'Quem possui a infraestrutura depois de construída?',
            paragraphs: ['Vocês. O painel de controlo personalizado, os conectores, os fluxos de trabalho e a configuração de governança são vossos. Os modelos proprietários Mindzy permanecem sob licença, juntamente com os modelos externos para os quais escolhem encaminhar.'],
            cta: { text: 'Ainda tem dúvidas? Fale connosco →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  ar: {
    hero: {
      eyebrow: 'الأسئلة الشائعة',
      searchPlaceholder: 'البحث في الأسئلة الشائعة…',
      searchAriaLabel: 'البحث في الأسئلة الشائعة',
      intro: 'الأسئلة التي نسمعها في أغلب الأحيان خلال مكالمة التشخيص. إذا لم يكن سؤالك هنا، فإن التقويم هو أسرع طريقة للوصول إلينا.',
      morphWords: ['بناء بنية تحتية للذكاء الاصطناعي', 'إدارة وكلاء الذكاء الاصطناعي', 'نشر أنظمة الذكاء الاصطناعي', 'تشغيل سير عمل الذكاء الاصطناعي', 'توسيع فرق الذكاء الاصطناعي'],
      heading: 'أسئلة حول',
      headingPrefix: 'أسئلة حول',
      navTitle: 'الفئات',
      noResults: 'لا توجد أسئلة مطابقة. جرّب كلمة بحث مختلفة، أو',
      noResultsLink: 'اسألنا مباشرة',
    },
    faqs: [
      {
        id: 'about', title: 'عن Mindzy',
        items: [
          {
            id: 'a1',
            q: 'ما الذي تفعله Mindzy تحديداً؟',
            paragraphs: ['تصمم Mindzy وتبني بنية تحتية للذكاء الاصطناعي مخصصة داخل الشركات التي تريد دمج الذكاء الاصطناعي في عملياتها. يُبنى كل نشر من الصفر، حول التسلسل الهرمي وأدوات وسير عمل العميل. نحن لا نقدم منتجاً جاهزاً مسبقاً.'],
          },
          {
            id: 'a2',
            q: 'لمن تُوجَّه Mindzy؟',
            paragraphs: ['لأي شركة تريد دمج الذكاء الاصطناعي في عملياتها — من الشركات الصناعية التقليدية وشركات الخدمات والمؤسسات المالية إلى تجار التجزئة ومشغلي الخدمات اللوجستية والمنظمات الرقمية الأصيلة. تنطبق نفس المنهجية على جميع الصناعات.'],
          },
          {
            id: 'a3',
            q: 'هل أنتم وكالة أم شركة برمجيات؟',
            paragraphs: ['لسنا أياً منهما. نحن فريق بنية تحتية. لا يكتب مهندسونا الكود سطراً بسطر بعد الآن — يديرون فرق وكلاء تبني البنية التحتية وتنشرها وتشغلها تحت إشراف بشري. كل مشروع نقدمه، بما في ذلك هذا الموقع، يمر بنفس العملية.'],
          },
        ],
      },
      {
        id: 'scope', title: 'النطاق والمنهجية',
        items: [
          {
            id: 's1',
            q: 'هل لديكم منتج معياري؟',
            paragraphs: ['لا. كل بنية تحتية لـ Mindzy مخصصة 100٪. لا قوالب. لا حزمة تقنية جاهزة. لا دليل عمل عام. تُحدد الهندسة المعمارية من قِبل أعمالك، لا من قِبلنا.'],
            cta: { text: 'شاهد عمليتنا من 10 خطوات →', href: '/process' },
          },
          {
            id: 's2',
            q: 'ما هو التشخيص التنفيذي؟',
            paragraphs: ['يبدأ كل تعاون بتشخيص منظم. نلتقي بالقيادة وأصحاب المصلحة الرئيسيين، وندرس أقسامك وأدواتك وسير عملك وعقبات الإنتاجية وهيكل القرار والأولويات التجارية — ونجيب على سؤال واحد: أين يمكن للذكاء الاصطناعي أن يحقق أعلى تأثير تجاري بأقل قدر من الاضطراب غير الضروري؟'],
          },
          {
            id: 's3',
            q: 'كم يستغرق التعاون النموذجي؟',
            paragraphs: ['تبدأ معظم قوى العمل التشغيلية الأولى للذكاء الاصطناعي في العمل في غضون 30 إلى 90 يوماً من الانطلاق. تتكشف عمليات الطرح عبر الأقسام وخارطة طريق التحسين الكاملة على مدى الأرباع التالية. يُحدَّد كل جدول زمني لكل مشروع خلال مرحلة التشخيص.'],
          },
        ],
      },
      {
        id: 'models', title: 'النماذج والبيانات',
        items: [
          {
            id: 'm1',
            q: 'ما النماذج التي تستخدمها Mindzy؟',
            paragraphs: [
              'تشغّل Mindzy ثلاثة نماذج خاصة — MindFast (سريع وخفيف للمهام عالية الحجم)، وMindDeep (استدلال عميق وتوليف سياقات طويلة)، وMind 3.1 (تنفيذ متوازن للأغراض العامة).',
              'إلى جانب ذلك، نوفر الوصول إلى جميع نماذج اللغة الكبيرة الرئيسية في السوق — OpenAI وAnthropic وGoogle وMistral وMeta وxAI وDeepSeek وQwen وغيرها. النموذج المناسب للمهمة المناسبة، يُقرَّر في الوقت الفعلي.',
            ],
          },
          {
            id: 'm2',
            q: 'هل سنكون مقيّدين بنماذجكم؟',
            paragraphs: ['لا. لا يُقيَّد العملاء أبداً. تُوجِّه طبقة تنسيق النماذج المهام بناءً على الملاءمة والتكلفة والكمون وتفضيلات التوجيه لديك. يمكنك ربط مهام محددة بمزودين خارجيين محددين إذا فضّل فريقك ذلك.'],
          },
          {
            id: 'm3',
            q: 'أين تذهب بياناتنا؟',
            paragraphs: ['تُحدَّد مقيمة البيانات والاحتفاظ بها وحدود المزودين خلال خطوة الهندسة المعمارية. ندعم الإقامة في الاتحاد الأوروبي والبنية التحتية المملوكة للعميل وتكاملات SSO/IAM. لا نُدرّب النماذج على بياناتك دون موافقة صريحة ومحددة النطاق.'],
          },
        ],
      },
      {
        id: 'governance', title: 'الحوكمة',
        items: [
          {
            id: 'g1',
            q: 'كيف يبقى البشر في السيطرة؟',
            paragraphs: ['كل إجراء في النظام يقع ضمن إحدى ثلاث فئات: مؤتمت بالكامل، أو مقترح للمراجعة البشرية، أو مشروط بموافقة بشرية. تُحدد خطوة الحوكمة ما هو ما لكل سير عمل، ولكل دور، ولكل نطاق بيانات.'],
          },
          {
            id: 'g2',
            q: 'هل كل شيء قابل للتدقيق؟',
            paragraphs: ['نعم. كل إجراء وكيل واستدعاء نموذج وقرار تحقق وموافقة مسجّل في سجل تدقيق يظهر في لوحة التحكم. تحمل سير العمل الحساسة (المالية وبيانات العملاء والعقود) بوابات أكثر صرامة بشكل افتراضي.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'النشر',
        items: [
          {
            id: 'd1',
            q: 'هل ستتصلون بأدواتنا الحالية؟',
            paragraphs: ['نعم. CRM والبريد الإلكتروني والتقاويم وDrive وMicrosoft 365 وNotion وSlack وجداول البيانات وأدوات إدارة المشاريع وأنظمة ERP والبرامج الداخلية المخصصة. عندما لا تُتيح أداةٌ ما واجهة برمجية عامة، نبني الموصّل. يتكيف النظام مع بيئتك، وليس العكس.'],
          },
          {
            id: 'd2',
            q: 'طرح دفعة واحدة أم تدريجي؟',
            paragraphs: ['دائماً تدريجي. ننشر قسماً تلو الآخر، وسير عمل تلو الآخر. كل تحويل قابل للعكس حتى يوافق فريقك. لم نقدم قط طرحاً دفعةً واحدة — ولن نفعل ذلك أبداً.'],
          },
          {
            id: 'd3',
            q: 'هل تُدرّبون فرقنا؟',
            paragraphs: ['نعم. التدريب هو الخطوة التاسعة في المنهجية. يتلقى المديرون التنفيذيون والمدراء وأعضاء الفريق كلٌّ منهم تدريباً عملياً مُكيَّفاً وفق مستوى وصولهم وطريقة تفاعلهم مع النظام يومياً.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'التسعير',
        items: [
          {
            id: 'p1',
            q: 'كم تكلف مشاركة Mindzy؟',
            paragraphs: ['يُحدَّد بعد التشخيص. نظراً لأن كل بنية تحتية مبنية خصيصاً حول سير عمل العميل المحدد وتسلسله الهرمي وأدواته وقواعد التحقق لديه، يُحدَّد التسعير خلال مرحلة التشخيص بدلاً من نشره كسعر قائمة.'],
            cta: { text: 'احجز مكالمة تشخيص →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'كم يكلف التشخيص نفسه؟',
            paragraphs: ['المكالمة الاستكشافية الأولى مدتها 30 دقيقة ومجانية. يُقيَّم التشخيص التنفيذي المنظم بناءً على حجم وتعقيد الشركة. سنخبرك بالرقم الدقيق في المكالمة الأولى.'],
          },
        ],
      },
      {
        id: 'after', title: 'ما بعد الإطلاق',
        items: [
          {
            id: 'af1',
            q: 'ماذا يحدث بعد تشغيل النظام؟',
            paragraphs: ['نُسلِّم خارطة طريق تحسين تُحدد ما تم تطبيقه وما يعمل بشكل جيد وما يجب تحسينه وأي سير عمل أو أقسام يجب توسيعها لاحقاً. تحويل الذكاء الاصطناعي ليس تثبيتاً لمرة واحدة — إنه قدرة تزداد شركتك إتقاناً لاستخدامها.'],
          },
          {
            id: 'af2',
            q: 'من يمتلك البنية التحتية بعد بنائها؟',
            paragraphs: ['أنت. لوحة التحكم المخصصة والموصلات وسير العمل وإعدادات الحوكمة ملكك. تبقى نماذج Mindzy الخاصة تحت ترخيص، إلى جانب النماذج الخارجية التي تختار التوجيه إليها.'],
            cta: { text: 'لا تزال لديك سؤال؟ تحدث معنا →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  zh: {
    hero: {
      eyebrow: '常见问题',
      searchPlaceholder: '搜索常见问题…',
      searchAriaLabel: '搜索常见问题',
      intro: '这些是我们在诊断通话中最常听到的问题。如果您的问题不在这里，日历预约是联系我们的最快方式。',
      morphWords: ['构建AI基础设施', '治理AI智能体', '部署AI系统', '运营AI工作流', '扩展AI团队'],
      heading: '关于',
      headingPrefix: '关于',
      navTitle: '分类',
      noResults: '没有匹配的问题。请尝试其他关键词，或',
      noResultsLink: '直接向我们提问',
    },
    faqs: [
      {
        id: 'about', title: '关于Mindzy',
        items: [
          {
            id: 'a1',
            q: 'Mindzy具体做什么？',
            paragraphs: ['Mindzy为希望将AI融入运营的企业设计并构建定制化AI基础设施。每次部署都从零开始，围绕客户的组织架构、工具和工作流程构建。我们不提供预打包产品。'],
          },
          {
            id: 'a2',
            q: 'Mindzy适合哪些企业？',
            paragraphs: ['适合任何希望将AI整合到运营中的企业——从传统工业企业、服务公司、金融机构，到零售商、物流运营商和数字原生组织。同一套方法论适用于所有行业。'],
          },
          {
            id: 'a3',
            q: '你们是代理机构还是软件公司？',
            paragraphs: ['都不是。我们是一个基础设施团队。我们的工程师不再逐行编写代码——他们管理智能体团队，在人类监督下构建、部署和运营基础设施。我们交付的每个项目，包括这个网站，都经历同样的流程。'],
          },
        ],
      },
      {
        id: 'scope', title: '范围与方法',
        items: [
          {
            id: 's1',
            q: '你们有标准产品吗？',
            paragraphs: ['没有。每套Mindzy基础设施都是100%定制的。没有模板，没有预构建技术栈，没有通用手册。架构由您的业务定义，而非我们的。'],
            cta: { text: '查看我们的10步流程 →', href: '/process' },
          },
          {
            id: 's2',
            q: '什么是高管诊断？',
            paragraphs: ['每次合作都从结构化诊断开始。我们与领导层和关键利益相关者会面，研究您的部门、工具、工作流程、瓶颈、决策结构和业务优先级——并回答一个问题：AI在哪里能以最小的不必要中断创造最高的业务影响？'],
          },
          {
            id: 's3',
            q: '一次典型合作需要多长时间？',
            paragraphs: ['大多数首个运营AI团队在启动后30到90天内上线。跨部门推广和完整优化路线图将在随后几个季度展开。每个项目的时间表在诊断阶段单独确定。'],
          },
        ],
      },
      {
        id: 'models', title: '模型与数据',
        items: [
          {
            id: 'm1',
            q: 'Mindzy使用哪些模型？',
            paragraphs: [
              'Mindzy运营三个专有模型——MindFast（快速、轻量、高量任务）、MindDeep（深度推理、长上下文合成）和Mind 3.1（均衡通用执行）。',
              '此外，我们还提供市场上所有主流LLM的访问权限——OpenAI、Anthropic、Google、Mistral、Meta、xAI、DeepSeek、Qwen等。为正确的任务选择正确的模型，实时决定。',
            ],
          },
          {
            id: 'm2',
            q: '我们会被锁定在你们的模型中吗？',
            paragraphs: ['不会。客户永远不会被锁定。模型编排层根据适配性、成本、延迟和您的路由偏好来分配任务。如果您的团队倾向于某些外部服务商，可以将特定任务固定到特定外部提供商。'],
          },
          {
            id: 'm3',
            q: '我们的数据去哪里？',
            paragraphs: ['数据存储位置、保留期限和提供商边界在架构步骤中确定。我们支持欧盟数据驻留、客户自有基础设施以及SSO/IAM集成。未经明确的范围性同意，我们不会用您的数据训练模型。'],
          },
        ],
      },
      {
        id: 'governance', title: '治理',
        items: [
          {
            id: 'g1',
            q: '人类如何保持控制？',
            paragraphs: ['系统中的每个操作属于三类之一：完全自动化、建议人工审核，或需要人工批准才能执行。治理步骤按工作流程、角色和数据范围定义各类操作的归属。'],
          },
          {
            id: 'g2',
            q: '一切都可审计吗？',
            paragraphs: ['是的。每个智能体操作、模型调用、验证决策和审批都记录在仪表板上可查看的审计日志中。敏感工作流程（财务、客户数据、合同）默认具有更严格的审批门槛。'],
          },
        ],
      },
      {
        id: 'deployment', title: '部署',
        items: [
          {
            id: 'd1',
            q: '你们会连接我们现有的工具吗？',
            paragraphs: ['是的。CRM、电子邮件、日历、Drive、Microsoft 365、Notion、Slack、电子表格、项目管理工具、ERP、自定义内部软件。当工具不提供公共API时，我们会构建连接器。系统适应您的环境，而非相反。'],
          },
          {
            id: 'd2',
            q: '一次性上线还是渐进式推广？',
            paragraphs: ['始终是渐进式的。我们逐部门、逐工作流程部署。每次切换在您的团队签字确认之前都是可逆的。我们从未进行过一次性大规模上线——也永远不会。'],
          },
          {
            id: 'd3',
            q: '你们会培训我们的团队吗？',
            paragraphs: ['是的。培训是方法论的第九步。高管、管理者和团队成员各自接受针对其访问级别和日常与系统交互方式定制的实践培训。'],
          },
        ],
      },
      {
        id: 'pricing', title: '定价',
        items: [
          {
            id: 'p1',
            q: 'Mindzy合作的费用是多少？',
            paragraphs: ['在诊断后确定。由于每套基础设施都是围绕客户特定工作流程、组织架构、工具和验证规则定制构建的，定价在诊断阶段确定，而非作为标准价格列表公布。'],
            cta: { text: '预约诊断通话 →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: '诊断本身需要多少费用？',
            paragraphs: ['首次30分钟探索性通话是免费的。结构化高管诊断的费用根据公司的规模和复杂程度确定。我们会在第一次通话中告知您确切数字。'],
          },
        ],
      },
      {
        id: 'after', title: '上线后',
        items: [
          {
            id: 'af1',
            q: '系统上线后会发生什么？',
            paragraphs: ['我们会交付一份优化路线图，明确已实施的内容、运行良好的部分、需要改进的方面，以及接下来应扩展哪些工作流程或部门。AI转型不是一次性安装——而是您的公司不断提升的能力。'],
          },
          {
            id: 'af2',
            q: '基础设施构建完成后归谁所有？',
            paragraphs: ['归您所有。定制仪表板、连接器、工作流程和治理配置都属于您。Mindzy专有模型持续授权使用，连同您选择路由的外部模型。'],
            cta: { text: '还有问题？与我们交流 →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  ja: {
    hero: {
      eyebrow: 'よくある質問',
      searchPlaceholder: 'FAQを検索…',
      searchAriaLabel: 'FAQを検索',
      intro: '診断コール中に最もよく耳にする質問です。ご質問がここにない場合は、カレンダー予約が最も早くご連絡いただける方法です。',
      morphWords: ['AIインフラの構築', 'AIエージェントの管理', 'AIシステムの展開', 'AIワークフローの運用', 'AIチームのスケール'],
      heading: 'についての質問',
      headingPrefix: 'についての質問',
      navTitle: 'カテゴリ',
      noResults: '一致する質問がありませんでした。別のキーワードをお試しいただくか、',
      noResultsLink: '直接お問い合わせください',
    },
    faqs: [
      {
        id: 'about', title: 'Mindzyについて',
        items: [
          {
            id: 'a1',
            q: 'Mindzyは実際に何をしますか？',
            paragraphs: ['MindzyはAIを業務に組み込みたい企業のために、カスタムAIインフラを設計・構築します。各デプロイメントは、クライアントの組織階層、ツール、ワークフローに合わせてゼロから構築されます。パッケージ製品の提供は行っておりません。'],
          },
          {
            id: 'a2',
            q: 'Mindzyはどんな企業を対象としていますか？',
            paragraphs: ['AIを業務に統合したいあらゆる企業が対象です。伝統的な製造業、サービス会社、金融機関から、小売業者、物流事業者、デジタルネイティブな組織まで幅広く対応しています。同じ方法論があらゆる業界に適用できます。'],
          },
          {
            id: 'a3',
            q: '代理店ですか、それともソフトウェア会社ですか？',
            paragraphs: ['どちらでもありません。私たちはインフラチームです。エンジニアはもはやコードを一行一行書くのではなく、人間の監督のもとでインフラを構築・展開・運用するエージェントチームを管理しています。このウェブサイトを含め、私たちが納品するすべてのプロジェクトが同じプロセスを経ています。'],
          },
        ],
      },
      {
        id: 'scope', title: 'スコープと方法論',
        items: [
          {
            id: 's1',
            q: '標準製品はありますか？',
            paragraphs: ['ありません。すべてのMindzyインフラは100%カスタムです。テンプレートなし、既成スタックなし、汎用的なプレイブックなし。アーキテクチャはお客様のビジネスで定義され、私たちのビジネスではありません。'],
            cta: { text: '10ステッププロセスを見る →', href: '/process' },
          },
          {
            id: 's2',
            q: 'エグゼクティブ診断とは何ですか？',
            paragraphs: ['すべての取り組みは構造化された診断から始まります。経営幹部と主要なステークホルダーと会い、部門、ツール、ワークフロー、ボトルネック、意思決定構造、ビジネス優先事項を調査し、一つの質問に答えます：AIはどこで最小限の不必要な混乱で最大のビジネスインパクトを生み出せるか？'],
          },
          {
            id: 's3',
            q: '典型的な取り組みはどのくらいかかりますか？',
            paragraphs: ['ほとんどの最初の運用AIワークフォースは、キックオフから30〜90日以内に稼働します。部門横断的なロールアウトと完全な最適化ロードマップは、その後の四半期をかけて展開されます。各タイムラインは診断中にプロジェクトごとにスコープされます。'],
          },
        ],
      },
      {
        id: 'models', title: 'モデルとデータ',
        items: [
          {
            id: 'm1',
            q: 'Mindzyはどのモデルを使用していますか？',
            paragraphs: [
              'Mindzyは3つの独自モデルを運用しています。MindFast（高速・軽量・大量タスク向け）、MindDeep（深い推論・長文脈合成）、Mind 3.1（バランスの取れた汎用実行）です。',
              'これらに加え、市場のすべての主要LLMへのアクセスを提供しています。OpenAI、Anthropic、Google、Mistral、Meta、xAI、DeepSeek、Qwen、その他多数。適切なタスクに適切なモデルを、リアルタイムで決定します。',
            ],
          },
          {
            id: 'm2',
            q: 'あなたたちのモデルにロックインされますか？',
            paragraphs: ['いいえ。クライアントは決してロックインされません。モデルオーケストレーションレイヤーは、適合性、コスト、レイテンシ、ルーティング設定に基づいてタスクを振り分けます。チームが希望する場合は、特定のタスクを特定の外部プロバイダーに固定することもできます。'],
          },
          {
            id: 'm3',
            q: 'データはどこに行きますか？',
            paragraphs: ['データ所在地、保持、プロバイダーの境界はアーキテクチャステップで定義されます。EUデータ所在地、クライアント所有インフラ、SSO/IAM統合をサポートしています。明示的かつスコープされた同意なしにお客様のデータでモデルをトレーニングすることはありません。'],
          },
        ],
      },
      {
        id: 'governance', title: 'ガバナンス',
        items: [
          {
            id: 'g1',
            q: '人間はどのようにコントロールを維持しますか？',
            paragraphs: ['システムのすべてのアクションは3つのカテゴリのいずれかに分類されます：完全自動化、人間のレビュー推奨、人間の承認が必要。ガバナンスステップが、ワークフロー別、役割別、データスコープ別にどれが適用されるかを定義します。'],
          },
          {
            id: 'g2',
            q: 'すべて監査可能ですか？',
            paragraphs: ['はい。すべてのエージェントアクション、モデル呼び出し、検証決定、承認がダッシュボードの監査ログに記録されます。機密性の高いワークフロー（財務、顧客データ、契約）はデフォルトでより厳格なゲートを持ちます。'],
          },
        ],
      },
      {
        id: 'deployment', title: 'デプロイメント',
        items: [
          {
            id: 'd1',
            q: '既存のツールに接続しますか？',
            paragraphs: ['はい。CRM、メール、カレンダー、Drive、Microsoft 365、Notion、Slack、スプレッドシート、プロジェクト管理ツール、ERP、カスタム社内ソフトウェア。ツールが公開APIを持たない場合はコネクターを構築します。システムがお客様の環境に適応し、その逆ではありません。'],
          },
          {
            id: 'd2',
            q: '一括展開か段階的展開か？',
            paragraphs: ['常に段階的です。部門ごと、ワークフローごとに展開します。お客様のチームが承認するまで、すべての切り替えは元に戻せます。私たちは一括展開を実施したことがなく、今後も行いません。'],
          },
          {
            id: 'd3',
            q: 'チームのトレーニングはしますか？',
            paragraphs: ['はい。トレーニングは方法論の第9ステップです。エグゼクティブ、マネージャー、チームメンバーそれぞれが、アクセスレベルと日常的なシステムとのインタラクション方法に合わせた実践的なトレーニングを受けます。'],
          },
        ],
      },
      {
        id: 'pricing', title: '料金',
        items: [
          {
            id: 'p1',
            q: 'Mindzyの取り組みにかかる費用は？',
            paragraphs: ['診断後に確定します。各インフラはクライアント固有のワークフロー、階層、ツール、検証ルールに合わせてカスタム構築されるため、価格は診断フェーズで決定され、リスト価格として公開されるものではありません。'],
            cta: { text: '診断コールを予約する →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: '診断自体の費用は？',
            paragraphs: ['最初の30分の探索的コールは無料です。構造化されたエグゼクティブ診断は企業の規模と複雑さに応じてスコープされます。正確な金額は最初のコールでお伝えします。'],
          },
        ],
      },
      {
        id: 'after', title: 'ローンチ後',
        items: [
          {
            id: 'af1',
            q: 'システム稼働後はどうなりますか？',
            paragraphs: ['実装済みの内容、うまく機能していること、改善すべきこと、次に拡張すべきワークフローや部門を特定する最適化ロードマップを提供します。AIトランスフォーメーションは一度限りのインストールではなく、御社が使い続けるにつれて習熟度が上がる能力です。'],
          },
          {
            id: 'af2',
            q: '構築後のインフラは誰が所有しますか？',
            paragraphs: ['お客様です。カスタムダッシュボード、コネクター、ワークフロー、ガバナンス設定はすべてお客様のものです。Mindzy独自モデルはライセンスのもとで継続使用でき、お客様が選択した外部モデルも同様です。'],
            cta: { text: 'まだご質問がありますか？私たちに話してください →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },

  ru: {
    hero: {
      eyebrow: 'Часто задаваемые вопросы',
      searchPlaceholder: 'Поиск по FAQ…',
      searchAriaLabel: 'Поиск по FAQ',
      intro: 'Вопросы, которые мы слышим чаще всего на диагностическом звонке. Если вашего вопроса здесь нет, календарь — самый быстрый способ связаться с нами.',
      morphWords: ['строить AI-инфраструктуру', 'управлять AI-агентами', 'внедрять AI-системы', 'эксплуатировать AI-рабочие процессы', 'масштабировать AI-команды'],
      heading: 'Вопросы о',
      headingPrefix: 'Вопросы о',
      navTitle: 'Категории',
      noResults: 'Вопросов не найдено. Попробуйте другое ключевое слово или',
      noResultsLink: 'задайте нам вопрос напрямую',
    },
    faqs: [
      {
        id: 'about', title: 'О компании Mindzy',
        items: [
          {
            id: 'a1',
            q: 'Чем конкретно занимается Mindzy?',
            paragraphs: ['Mindzy проектирует и создаёт кастомную AI-инфраструктуру внутри компаний, желающих интегрировать искусственный интеллект в свои операции. Каждое внедрение строится с нуля вокруг иерархии, инструментов и рабочих процессов клиента. Мы не поставляем готовых упакованных продуктов.'],
          },
          {
            id: 'a2',
            q: 'Для кого предназначена Mindzy?',
            paragraphs: ['Для любой компании, желающей интегрировать ИИ в свои операции — от традиционных промышленных предприятий, сервисных фирм и финансовых учреждений до ритейлеров, логистических операторов и цифровых компаний. Один и тот же метод применяется во всех отраслях.'],
          },
          {
            id: 'a3',
            q: 'Вы агентство или IT-компания?',
            paragraphs: ['Ни то ни другое. Мы — команда инфраструктуры. Наши инженеры больше не пишут код строка за строкой — они управляют командами агентов, которые под человеческим надзором создают, внедряют и эксплуатируют инфраструктуру. Каждый проект, включая этот сайт, проходит через тот же процесс.'],
          },
        ],
      },
      {
        id: 'scope', title: 'Объём и методология',
        items: [
          {
            id: 's1',
            q: 'Есть ли у вас стандартный продукт?',
            paragraphs: ['Нет. Каждая инфраструктура Mindzy — 100% кастомная. Никаких шаблонов, никакого готового технологического стека, никаких универсальных playbook. Архитектура определяется вашим бизнесом, а не нашим.'],
            cta: { text: 'Ознакомьтесь с нашим 10-шаговым процессом →', href: '/process' },
          },
          {
            id: 's2',
            q: 'Что такое исполнительная диагностика?',
            paragraphs: ['Каждый проект начинается со структурированной диагностики. Мы встречаемся с руководством и ключевыми стейкхолдерами, изучаем ваши подразделения, инструменты, рабочие процессы, узкие места, структуру принятия решений и бизнес-приоритеты — и отвечаем на один вопрос: где ИИ может создать наибольший деловой эффект с минимальными излишними нарушениями?'],
          },
          {
            id: 's3',
            q: 'Сколько длится типичный проект?',
            paragraphs: ['Большинство первых операционных AI-команд запускаются в течение 30–90 дней с момента старта. Межведомственные внедрения и полная дорожная карта оптимизации разворачиваются в последующие кварталы. Каждый таймлайн определяется индивидуально в ходе диагностики.'],
          },
        ],
      },
      {
        id: 'models', title: 'Модели и данные',
        items: [
          {
            id: 'm1',
            q: 'Какие модели использует Mindzy?',
            paragraphs: [
              'Mindzy эксплуатирует три проприетарные модели — MindFast (быстрая, лёгкая, для высокообъёмных задач), MindDeep (глубокое рассуждение, синтез длинных контекстов) и Mind 3.1 (сбалансированное выполнение общего назначения).',
              'Помимо этого, мы обеспечиваем доступ ко всем крупнейшим LLM на рынке — OpenAI, Anthropic, Google, Mistral, Meta, xAI, DeepSeek, Qwen и другим. Правильная модель для правильной задачи — решение принимается в реальном времени.',
            ],
          },
          {
            id: 'm2',
            q: 'Будем ли мы привязаны к вашим моделям?',
            paragraphs: ['Нет. Клиенты никогда не оказываются в привязке. Слой оркестрации моделей маршрутизирует задачи по соответствию, стоимости, задержке и вашим предпочтениям маршрутизации. Вы можете закрепить конкретные задачи за конкретными внешними провайдерами, если ваша команда предпочитает это.'],
          },
          {
            id: 'm3',
            q: 'Куда уходят наши данные?',
            paragraphs: ['Место хранения данных, сроки хранения и границы провайдеров определяются на этапе архитектуры. Мы поддерживаем резидентность данных в ЕС, собственную инфраструктуру клиента и интеграции SSO/IAM. Мы не обучаем модели на ваших данных без явного и ограниченного по объёму согласия.'],
          },
        ],
      },
      {
        id: 'governance', title: 'Управление',
        items: [
          {
            id: 'g1',
            q: 'Как люди сохраняют контроль?',
            paragraphs: ['Каждое действие в системе попадает в одну из трёх категорий: полностью автоматическое, предложенное на рассмотрение человека или требующее одобрения человека. Этап управления определяет, что к чему относится — для каждого рабочего процесса, роли и области данных.'],
          },
          {
            id: 'g2',
            q: 'Всё ли поддаётся аудиту?',
            paragraphs: ['Да. Каждое действие агента, вызов модели, решение о валидации и одобрение фиксируются в журнале аудита, доступном на приборной панели. Чувствительные рабочие процессы (финансы, данные клиентов, контракты) по умолчанию имеют более строгие шлюзы.'],
          },
        ],
      },
      {
        id: 'deployment', title: 'Внедрение',
        items: [
          {
            id: 'd1',
            q: 'Вы подключитесь к нашим существующим инструментам?',
            paragraphs: ['Да. CRM, электронная почта, календари, Drive, Microsoft 365, Notion, Slack, электронные таблицы, инструменты управления проектами, ERP, специализированное внутреннее программное обеспечение. Если инструмент не предоставляет публичный API, мы создаём коннектор. Система адаптируется к вашей среде, а не наоборот.'],
          },
          {
            id: 'd2',
            q: 'Единовременное развёртывание или поэтапное?',
            paragraphs: ['Всегда поэтапное. Мы развёртываем подразделение за подразделением, рабочий процесс за рабочим процессом. Каждый переход обратим до тех пор, пока ваша команда его не подтвердит. Мы никогда не осуществляли единовременного развёртывания — и никогда не будем.'],
          },
          {
            id: 'd3',
            q: 'Вы обучаете наши команды?',
            paragraphs: ['Да. Обучение — девятый шаг методологии. Руководители, менеджеры и рядовые сотрудники получают практическое обучение, адаптированное под их уровень доступа и то, как они будут ежедневно взаимодействовать с системой.'],
          },
        ],
      },
      {
        id: 'pricing', title: 'Стоимость',
        items: [
          {
            id: 'p1',
            q: 'Сколько стоит проект Mindzy?',
            paragraphs: ['Определяется после диагностики. Поскольку каждая инфраструктура создаётся под конкретные рабочие процессы, иерархию, инструменты и правила валидации клиента, стоимость определяется на этапе диагностики, а не публикуется в виде прайс-листа.'],
            cta: { text: 'Записаться на диагностический звонок →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
          {
            id: 'p2',
            q: 'Сколько стоит сама диагностика?',
            paragraphs: ['Первый 30-минутный ознакомительный звонок бесплатный. Структурированная исполнительная диагностика рассчитывается исходя из размера и сложности компании. Точную сумму мы сообщим на первом звонке.'],
          },
        ],
      },
      {
        id: 'after', title: 'После запуска',
        items: [
          {
            id: 'af1',
            q: 'Что происходит после запуска системы?',
            paragraphs: ['Мы передаём дорожную карту оптимизации, в которой указывается, что было реализовано, что работает хорошо, что следует улучшить и какие рабочие процессы или подразделения расширять в следующую очередь. AI-трансформация — это не разовая установка, а компетенция, которой ваша компания овладевает всё лучше.'],
          },
          {
            id: 'af2',
            q: 'Кому принадлежит инфраструктура после создания?',
            paragraphs: ['Вам. Кастомная приборная панель, коннекторы, рабочие процессы и конфигурация управления принадлежат вам. Проприетарные модели Mindzy остаются на условиях лицензии, наряду с выбранными вами внешними моделями.'],
            cta: { text: 'Остались вопросы? Поговорите с нами →', href: 'https://calendar.app.google/ghE79tSFxmea4Scd9', external: true },
          },
        ],
      },
    ],
  },
}

function FaqItem({
  id,
  q,
  paragraphs,
  cta,
  locale,
  openId,
  setOpenId,
}: {
  id: string
  q: string
  paragraphs: string[]
  cta?: { text: string; href: string; external?: boolean }
  locale: string
  openId: string | null
  setOpenId: (v: string | null) => void
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLDivElement>(null)
  const isOpen = openId === id

  useEffect(() => {
    const a = aRef.current
    const inner = innerRef.current
    if (!a || !inner) return
    if (isOpen) {
      a.style.height = inner.offsetHeight + 'px'
    } else {
      a.style.height = '0'
    }
  }, [isOpen])

  const resolvedHref = cta
    ? cta.external
      ? cta.href
      : `/${locale}${cta.href}`
    : undefined

  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpenId(isOpen ? null : id)}>
        {q}
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div ref={aRef} className="faq-item__a">
        <div ref={innerRef} className="faq-item__inner">
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          {cta && resolvedHref && (
            <a
              className="micro-cta"
              href={resolvedHref}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {cta.text}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const params = useParams()
  const locale = (params.locale as string) ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  const [displayWord, setDisplayWord] = useState(t.hero.morphWords[0])
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const idxRef = useRef(0)
  const morphWordsRef = useRef(t.hero.morphWords)

  useEffect(() => {
    morphWordsRef.current = t.hero.morphWords
    idxRef.current = 0
    setDisplayWord(t.hero.morphWords[0])
  }, [locale, t.hero.morphWords])

  useEffect(() => {
    let cancelled = false
    function morph() {
      if (cancelled) return
      const words = morphWordsRef.current
      const from = words[idxRef.current]
      const to = words[(idxRef.current + 1) % words.length]
      let step = 0
      function tick() {
        if (cancelled) return
        step++
        const p = step / MORPH_STEPS
        if (p < 0.5) {
          const n = Math.round(from.length * (1 - p * 2))
          setDisplayWord(from.slice(0, n) || ' ')
        } else {
          const n = Math.round(to.length * ((p - 0.5) * 2))
          setDisplayWord(to.slice(0, n) || ' ')
        }
        if (step < MORPH_STEPS) {
          setTimeout(tick, MORPH_DURATION / MORPH_STEPS)
        } else {
          setDisplayWord(to)
          idxRef.current = (idxRef.current + 1) % words.length
          setTimeout(morph, MORPH_INTERVAL)
        }
      }
      tick()
    }
    const timer = setTimeout(morph, MORPH_INTERVAL)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [locale])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const q = search.trim().toLowerCase()

  const allHidden = q !== '' && t.faqs.every(cat => cat.items.every(item => !item.q.toLowerCase().includes(q)))

  return (
    <div style={{ background: 'var(--ai-bg)', paddingTop: '72px' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="faq-hero">
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="eyebrow-faq">{t.hero.eyebrow}</div>
          <h1>
            {t.hero.headingPrefix}{' '}
            <em style={{ fontStyle: 'italic', display: 'inline' }}>
              <span style={{ background: 'linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
                {displayWord}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '0.78em',
                  background: 'linear-gradient(to bottom,#7c3aed,#a78bfa)',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  borderRadius: '2px',
                  animation: 'mt-blink 1s ease-in-out infinite',
                }}
              />
            </em>.
          </h1>
          <p>{t.hero.intro}</p>
          <div className="faq-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              type="search"
              placeholder={t.hero.searchPlaceholder}
              aria-label={t.hero.searchAriaLabel}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="w-full max-w-[1200px] mx-auto px-8">
          <div className="faq-shell">
            <aside className="faq-nav">
              <div className="faq-nav__title">{t.hero.navTitle}</div>
              <div className="faq-nav__list">
                {t.faqs.map(cat => (
                  <a key={cat.id} href={`#${cat.id}`} onClick={e => handleNavClick(e, cat.id)}>
                    {cat.title}
                  </a>
                ))}
              </div>
            </aside>

            <div>
              {t.faqs.map(cat => {
                const visibleItems = cat.items.filter(item => {
                  if (!q) return true
                  return item.q.toLowerCase().includes(q)
                })
                if (visibleItems.length === 0) return null
                return (
                  <section key={cat.id} className="faq-category" id={cat.id}>
                    <h2>{cat.title}</h2>
                    {visibleItems.map(item => (
                      <FaqItem
                        key={item.id}
                        id={item.id}
                        q={item.q}
                        paragraphs={item.paragraphs}
                        cta={item.cta}
                        locale={locale}
                        openId={openId}
                        setOpenId={setOpenId}
                      />
                    ))}
                  </section>
                )
              })}
              {allHidden && (
                <div className="faq-empty">
                  {t.hero.noResults}{' '}
                  <a
                    href="https://calendar.app.google/ghE79tSFxmea4Scd9"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--ai-accent)', borderBottom: '1px solid var(--ai-accent)' }}
                  >
                    {t.hero.noResultsLink}
                  </a>.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
