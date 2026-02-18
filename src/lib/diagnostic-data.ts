import type {
  DiagnosticBranch,
  BranchingDiagnosticQuestion,
  DiagnosticBranchResult,
} from './types'

// ---------------------------------------------------------------------------
// Q1 — SITUATION ACTUELLE (routing question)
// ---------------------------------------------------------------------------
export const routingQuestion: BranchingDiagnosticQuestion = {
  id: 'q1',
  question: {
    fr: 'Où en êtes-vous aujourd\'hui dans votre projet ?',
    en: 'Where are you today with your project?',
    es: '¿En qué punto se encuentra hoy con su proyecto?',
  },
  type: 'single',
  options: [
    {
      value: 'A',
      label: {
        fr: 'Je démarre un projet ou une activité',
        en: 'I am starting a project or a business',
        es: 'Estoy iniciando un proyecto o una actividad',
      },
    },
    {
      value: 'B',
      label: {
        fr: 'J\'ai déjà un projet en place',
        en: 'I already have a project in place',
        es: 'Ya tengo un proyecto en marcha',
      },
    },
    {
      value: 'C',
      label: {
        fr: 'Je souhaite faire évoluer un existant',
        en: 'I want to evolve an existing project',
        es: 'Quiero hacer evolucionar un proyecto existente',
      },
    },
    {
      value: 'D',
      label: {
        fr: 'J\'ai un besoin spécifique ou complexe',
        en: 'I have a specific or complex need',
        es: 'Tengo una necesidad específica o compleja',
      },
    },
    {
      value: 'E',
      label: {
        fr: 'Je souhaite me former ou former mes équipes',
        en: 'I want to train myself or my teams',
        es: 'Quiero formarme o formar a mis equipos',
      },
    },
  ],
}

// ---------------------------------------------------------------------------
// Q2 & Q3 — Common questions (shared across all branches)
// ---------------------------------------------------------------------------
export const commonQuestions: BranchingDiagnosticQuestion[] = [
  // Q2 — NIVEAU DE STRUCTURATION
  {
    id: 'q2',
    question: {
      fr: 'À quel point votre besoin est-il déjà structuré ?',
      en: 'How structured is your need already?',
      es: '¿Qué tan estructurada está ya su necesidad?',
    },
    type: 'single',
    options: [
      {
        value: 'structured',
        label: {
          fr: 'Le besoin est clair et formalisé',
          en: 'The need is clear and formalized',
          es: 'La necesidad es clara y está formalizada',
        },
      },
      {
        value: 'partial',
        label: {
          fr: 'Le besoin est partiellement défini',
          en: 'The need is partially defined',
          es: 'La necesidad está parcialmente definida',
        },
      },
      {
        value: 'unclear',
        label: {
          fr: 'Le besoin doit être cadré et clarifié',
          en: 'The need must be framed and clarified',
          es: 'La necesidad debe ser enmarcada y clarificada',
        },
      },
    ],
  },
  // Q3 — NIVEAU DE COORDINATION
  {
    id: 'q3',
    question: {
      fr: 'Quel niveau de coordination nécessite votre projet ?',
      en: 'What level of coordination does your project require?',
      es: '¿Qué nivel de coordinación requiere su proyecto?',
    },
    type: 'single',
    options: [
      {
        value: 'solo-simple',
        label: {
          fr: 'Je suis seul, le projet reste simple',
          en: 'I am alone, the project remains simple',
          es: 'Estoy solo, el proyecto sigue siendo simple',
        },
      },
      {
        value: 'solo-complex',
        label: {
          fr: 'Je suis seul, mais le projet est structurant',
          en: 'I am alone, but the project is substantial',
          es: 'Estoy solo, pero el proyecto es estructurante',
        },
      },
      {
        value: 'team',
        label: {
          fr: 'Plusieurs personnes ou équipes sont impliquées',
          en: 'Several people or teams are involved',
          es: 'Varias personas o equipos están involucrados',
        },
      },
      {
        value: 'external',
        label: {
          fr: 'Des partenaires externes sont concernés',
          en: 'External partners are involved',
          es: 'Hay socios externos involucrados',
        },
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Branch-specific questions (Q4 & Q5 per branch)
// ---------------------------------------------------------------------------
export const branchQuestions: Record<
  DiagnosticBranch,
  [BranchingDiagnosticQuestion, BranchingDiagnosticQuestion]
> = {
  // -----------------------------------------------------------------------
  // BRANCHE A — DÉMARRAGE
  // -----------------------------------------------------------------------
  A: [
    // Q4A — Nature du projet
    {
      id: 'q4a',
      question: {
        fr: 'Quel type de projet souhaitez-vous lancer ?',
        en: 'What type of project do you want to launch?',
        es: '¿Qué tipo de proyecto desea lanzar?',
      },
      type: 'multiple',
      maxSelect: 2,
      options: [
        {
          value: 'website',
          label: {
            fr: 'Site de présentation ou institutionnel',
            en: 'Showcase or institutional website',
            es: 'Sitio de presentación o institucional',
          },
        },
        {
          value: 'app',
          label: {
            fr: 'Application ou plateforme',
            en: 'Application or platform',
            es: 'Aplicación o plataforma',
          },
        },
        {
          value: 'internal',
          label: {
            fr: 'Système interne ou outil métier',
            en: 'Internal system or business tool',
            es: 'Sistema interno o herramienta profesional',
          },
        },
        {
          value: 'unknown',
          label: {
            fr: 'Je ne sais pas encore',
            en: 'I don\'t know yet',
            es: 'Aún no lo sé',
          },
        },
      ],
    },
    // Q5A — Enjeux prioritaires
    {
      id: 'q5a',
      question: {
        fr: 'Qu\'attendez-vous principalement de ce projet ?',
        en: 'What do you mainly expect from this project?',
        es: '¿Qué espera principalmente de este proyecto?',
      },
      type: 'multiple',
      maxSelect: 2,
      options: [
        {
          value: 'foundations',
          label: {
            fr: 'Poser des bases solides',
            en: 'Lay solid foundations',
            es: 'Sentar bases sólidas',
          },
        },
        {
          value: 'credibility',
          label: {
            fr: 'Être crédible et professionnel',
            en: 'Be credible and professional',
            es: 'Ser creíble y profesional',
          },
        },
        {
          value: 'structure',
          label: {
            fr: 'Structurer mon activité',
            en: 'Structure my business',
            es: 'Estructurar mi actividad',
          },
        },
        {
          value: 'guidance',
          label: {
            fr: 'Être accompagné et conseillé',
            en: 'Be guided and advised',
            es: 'Ser acompañado y asesorado',
          },
        },
      ],
    },
  ],

  // -----------------------------------------------------------------------
  // BRANCHE B — EXISTANT
  // -----------------------------------------------------------------------
  B: [
    // Q4B — État de l'existant
    {
      id: 'q4b',
      question: {
        fr: 'Votre projet actuel est-il aligné avec votre activité aujourd\'hui ?',
        en: 'Is your current project aligned with your business today?',
        es: '¿Su proyecto actual está alineado con su actividad hoy?',
      },
      type: 'single',
      options: [
        {
          value: 'yes',
          label: {
            fr: 'Oui, globalement',
            en: 'Yes, overall',
            es: 'Sí, en general',
          },
        },
        {
          value: 'partial',
          label: {
            fr: 'Partiellement',
            en: 'Partially',
            es: 'Parcialmente',
          },
        },
        {
          value: 'no',
          label: {
            fr: 'Non, plus vraiment',
            en: 'No, not really anymore',
            es: 'No, ya no realmente',
          },
        },
      ],
    },
    // Q5B — Points de friction
    {
      id: 'q5b',
      question: {
        fr: 'Quels sont aujourd\'hui les principaux points de blocage ?',
        en: 'What are the main pain points today?',
        es: '¿Cuáles son los principales puntos de bloqueo hoy?',
      },
      type: 'multiple',
      maxSelect: 2,
      options: [
        {
          value: 'clarity',
          label: {
            fr: 'Manque de clarté ou de structure',
            en: 'Lack of clarity or structure',
            es: 'Falta de claridad o de estructura',
          },
        },
        {
          value: 'evolution',
          label: {
            fr: 'Difficulté à faire évoluer le projet',
            en: 'Difficulty evolving the project',
            es: 'Dificultad para hacer evolucionar el proyecto',
          },
        },
        {
          value: 'manual',
          label: {
            fr: 'Fonctionnement trop manuel',
            en: 'Too many manual processes',
            es: 'Funcionamiento demasiado manual',
          },
        },
        {
          value: 'coherence',
          label: {
            fr: 'Manque de cohérence globale',
            en: 'Lack of overall coherence',
            es: 'Falta de coherencia global',
          },
        },
      ],
    },
  ],

  // -----------------------------------------------------------------------
  // BRANCHE C — ÉVOLUTION
  // -----------------------------------------------------------------------
  C: [
    // Q4C — Nature de l'évolution
    {
      id: 'q4c',
      question: {
        fr: 'Que souhaitez-vous faire évoluer en priorité ?',
        en: 'What do you want to evolve as a priority?',
        es: '¿Qué desea hacer evolucionar de manera prioritaria?',
      },
      type: 'multiple',
      maxSelect: 2,
      options: [
        {
          value: 'features',
          label: {
            fr: 'Fonctionnalités',
            en: 'Features',
            es: 'Funcionalidades',
          },
        },
        {
          value: 'organization',
          label: {
            fr: 'Organisation interne',
            en: 'Internal organization',
            es: 'Organización interna',
          },
        },
        {
          value: 'ux',
          label: {
            fr: 'Expérience utilisateur',
            en: 'User experience',
            es: 'Experiencia de usuario',
          },
        },
        {
          value: 'architecture',
          label: {
            fr: 'Architecture globale',
            en: 'Overall architecture',
            es: 'Arquitectura global',
          },
        },
      ],
    },
    // Q5C — Mode d'accompagnement
    {
      id: 'q5c',
      question: {
        fr: 'Comment souhaitez-vous être accompagné ?',
        en: 'How would you like to be supported?',
        es: '¿Cómo desea ser acompañado?',
      },
      type: 'single',
      options: [
        {
          value: 'global',
          label: {
            fr: 'Accompagnement global',
            en: 'Comprehensive support',
            es: 'Acompañamiento global',
          },
        },
        {
          value: 'collaborative',
          label: {
            fr: 'Travail collaboratif',
            en: 'Collaborative work',
            es: 'Trabajo colaborativo',
          },
        },
        {
          value: 'targeted',
          label: {
            fr: 'Intervention ciblée',
            en: 'Targeted intervention',
            es: 'Intervención específica',
          },
        },
      ],
    },
  ],

  // -----------------------------------------------------------------------
  // BRANCHE D — COMPLEXE
  // -----------------------------------------------------------------------
  D: [
    // Q4D — Nature du besoin
    {
      id: 'q4d',
      question: {
        fr: 'Quelle est la nature principale de votre besoin ?',
        en: 'What is the main nature of your need?',
        es: '¿Cuál es la naturaleza principal de su necesidad?',
      },
      type: 'single',
      freeText: true,
      options: [
        {
          value: 'app',
          label: {
            fr: 'Application ou plateforme',
            en: 'Application or platform',
            es: 'Aplicación o plataforma',
          },
        },
        {
          value: 'internal',
          label: {
            fr: 'Système interne',
            en: 'Internal system',
            es: 'Sistema interno',
          },
        },
        {
          value: 'hybrid',
          label: {
            fr: 'Projet hybride',
            en: 'Hybrid project',
            es: 'Proyecto híbrido',
          },
        },
        {
          value: 'other',
          label: {
            fr: 'Autre',
            en: 'Other',
            es: 'Otro',
          },
        },
      ],
    },
    // Q5D — Enjeu principal
    {
      id: 'q5d',
      question: {
        fr: 'Quel est l\'enjeu principal de ce projet ?',
        en: 'What is the main challenge of this project?',
        es: '¿Cuál es el desafío principal de este proyecto?',
      },
      type: 'single',
      options: [
        {
          value: 'structuring',
          label: {
            fr: 'Structuration',
            en: 'Structuring',
            es: 'Estructuración',
          },
        },
        {
          value: 'reliability',
          label: {
            fr: 'Fiabilité',
            en: 'Reliability',
            es: 'Fiabilidad',
          },
        },
        {
          value: 'scalability',
          label: {
            fr: 'Scalabilité',
            en: 'Scalability',
            es: 'Escalabilidad',
          },
        },
        {
          value: 'clarity',
          label: {
            fr: 'Clarté et pilotage',
            en: 'Clarity and steering',
            es: 'Claridad y dirección',
          },
        },
      ],
    },
  ],

  // -----------------------------------------------------------------------
  // BRANCHE E — FORMATION
  // -----------------------------------------------------------------------
  E: [
    // Q4E — Domaine de formation
    {
      id: 'q4e',
      question: {
        fr: 'Dans quel domaine souhaitez-vous vous former ?',
        en: 'In which area would you like to get trained?',
        es: '¿En qué área desea formarse?',
      },
      type: 'multiple',
      maxSelect: 2,
      options: [
        {
          value: 'linkedin',
          label: {
            fr: 'LinkedIn & Social Selling',
            en: 'LinkedIn & Social Selling',
            es: 'LinkedIn & Social Selling',
          },
        },
        {
          value: 'social-media',
          label: {
            fr: 'Réseaux sociaux (Meta, TikTok…)',
            en: 'Social media (Meta, TikTok…)',
            es: 'Redes sociales (Meta, TikTok…)',
          },
        },
        {
          value: 'ai',
          label: {
            fr: 'Intelligence artificielle',
            en: 'Artificial intelligence',
            es: 'Inteligencia artificial',
          },
        },
        {
          value: 'marketing',
          label: {
            fr: 'Marketing digital global',
            en: 'Overall digital marketing',
            es: 'Marketing digital global',
          },
        },
      ],
    },
    // Q5E — Objectif principal
    {
      id: 'q5e',
      question: {
        fr: 'Quel est votre objectif principal ?',
        en: 'What is your main objective?',
        es: '¿Cuál es su objetivo principal?',
      },
      type: 'single',
      options: [
        {
          value: 'skills',
          label: {
            fr: 'Acquérir de nouvelles compétences',
            en: 'Acquire new skills',
            es: 'Adquirir nuevas competencias',
          },
        },
        {
          value: 'strategy',
          label: {
            fr: 'Structurer ma stratégie digitale',
            en: 'Structure my digital strategy',
            es: 'Estructurar mi estrategia digital',
          },
        },
        {
          value: 'growth',
          label: {
            fr: 'Monter en puissance sur les réseaux',
            en: 'Scale up on social media',
            es: 'Crecer en las redes sociales',
          },
        },
        {
          value: 'ai-integration',
          label: {
            fr: 'Intégrer l\'IA dans mon activité',
            en: 'Integrate AI into my business',
            es: 'Integrar la IA en mi actividad',
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Branch results
// ---------------------------------------------------------------------------
export const branchResults: Record<DiagnosticBranch, DiagnosticBranchResult> = {
  A: {
    branch: 'A',
    title: {
      fr: 'Structurer un projet sur des bases solides',
      en: 'Structure a project on solid foundations',
      es: 'Estructurar un proyecto sobre bases sólidas',
    },
    text: {
      fr: 'Votre situation montre un besoin de cadrage et d\'accompagnement afin de poser des bases claires et cohérentes. L\'objectif est de construire un projet adapté à votre activité, sans précipitation.',
      en: 'Your situation shows a need for framing and support in order to lay clear and coherent foundations. The goal is to build a project suited to your business, without rushing.',
      es: 'Su situación muestra una necesidad de encuadre y acompañamiento para sentar bases claras y coherentes. El objetivo es construir un proyecto adaptado a su actividad, sin precipitación.',
    },
    orientation: {
      fr: 'Accompagnement sur mesure avec phase de cadrage.',
      en: 'Tailored support with a framing phase.',
      es: 'Acompañamiento a medida con fase de encuadre.',
    },
    cta: {
      fr: 'Échanger sur mon projet',
      en: 'Discuss my project',
      es: 'Hablar sobre mi proyecto',
    },
  },
  B: {
    branch: 'B',
    title: {
      fr: 'Faire évoluer l\'existant avec méthode',
      en: 'Evolve the existing project methodically',
      es: 'Hacer evolucionar lo existente con método',
    },
    text: {
      fr: 'Votre projet est déjà en place mais nécessite des ajustements pour rester aligné avec vos besoins actuels. Une analyse ciblée permettra d\'améliorer la clarté et la cohérence globale.',
      en: 'Your project is already in place but requires adjustments to stay aligned with your current needs. A targeted analysis will help improve clarity and overall coherence.',
      es: 'Su proyecto ya está en marcha pero necesita ajustes para mantenerse alineado con sus necesidades actuales. Un análisis específico permitirá mejorar la claridad y la coherencia global.',
    },
    orientation: {
      fr: 'Audit et accompagnement évolutif.',
      en: 'Audit and progressive support.',
      es: 'Auditoría y acompañamiento evolutivo.',
    },
    cta: {
      fr: 'Discuter de l\'évolution de mon projet',
      en: 'Discuss the evolution of my project',
      es: 'Hablar sobre la evolución de mi proyecto',
    },
  },
  C: {
    branch: 'C',
    title: {
      fr: 'Faire évoluer un projet de manière structurée',
      en: 'Evolve a project in a structured way',
      es: 'Hacer evolucionar un proyecto de manera estructurada',
    },
    text: {
      fr: 'Votre besoin concerne une évolution réfléchie de l\'existant. Une approche progressive permettra d\'assurer une transition fluide et maîtrisée.',
      en: 'Your need involves a thoughtful evolution of the existing project. A progressive approach will ensure a smooth and controlled transition.',
      es: 'Su necesidad se refiere a una evolución reflexiva de lo existente. Un enfoque progresivo permitirá asegurar una transición fluida y controlada.',
    },
    orientation: {
      fr: 'Accompagnement ciblé et collaboratif.',
      en: 'Targeted and collaborative support.',
      es: 'Acompañamiento específico y colaborativo.',
    },
    cta: {
      fr: 'Planifier un échange',
      en: 'Schedule a discussion',
      es: 'Planificar un intercambio',
    },
  },
  D: {
    branch: 'D',
    title: {
      fr: 'Un projet nécessitant une approche sur mesure',
      en: 'A project requiring a tailored approach',
      es: 'Un proyecto que requiere un enfoque a medida',
    },
    text: {
      fr: 'Votre projet présente des enjeux spécifiques nécessitant une approche personnalisée et structurée dès les premières phases.',
      en: 'Your project presents specific challenges that require a personalized and structured approach from the earliest phases.',
      es: 'Su proyecto presenta desafíos específicos que requieren un enfoque personalizado y estructurado desde las primeras fases.',
    },
    orientation: {
      fr: 'Phase de cadrage approfondie et accompagnement dédié.',
      en: 'In-depth framing phase and dedicated support.',
      es: 'Fase de encuadre profunda y acompañamiento dedicado.',
    },
    cta: {
      fr: 'Échanger de manière confidentielle',
      en: 'Discuss confidentially',
      es: 'Hablar de manera confidencial',
    },
  },
  E: {
    branch: 'E',
    title: {
      fr: 'Monter en compétences pour accélérer votre croissance',
      en: 'Build skills to accelerate your growth',
      es: 'Desarrollar competencias para acelerar su crecimiento',
    },
    text: {
      fr: 'Votre besoin porte sur la montée en compétences dans le digital. Nos formations stratégiques — LinkedIn, réseaux sociaux, IA — sont conçues pour produire des résultats concrets et mesurables.',
      en: 'Your need focuses on building digital skills. Our strategic training programs — LinkedIn, social media, AI — are designed to deliver concrete and measurable results.',
      es: 'Su necesidad se centra en el desarrollo de competencias digitales. Nuestras formaciones estratégicas — LinkedIn, redes sociales, IA — están diseñadas para producir resultados concretos y medibles.',
    },
    orientation: {
      fr: 'Formation personnalisée avec accompagnement opérationnel.',
      en: 'Personalized training with hands-on support.',
      es: 'Formación personalizada con acompañamiento operativo.',
    },
    cta: {
      fr: 'Découvrir nos formations',
      en: 'Discover our training programs',
      es: 'Descubrir nuestras formaciones',
    },
  },
}
