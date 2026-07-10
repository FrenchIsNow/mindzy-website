// One-shot generator: writes 12 EN + 12 FR markdown files for the AI essays
// previously hardcoded in src/app/[locale]/blog/page.tsx (POSTS_EN/POSTS_FR).
// Run once with: node scripts/generate-blog-markdown.mjs
// Idempotent: overwrites existing files with the same names.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..') // project root = parent of scripts/

const POSTS_EN = [
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'May 2026', read: '12 min read', title: 'Why AI agents fail without infrastructure', excerpt: 'The bottleneck for AI inside companies has shifted from model quality to operating layer. A practical look at what an infrastructure actually contains — and what it does not.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop' },
  { cat: 'models', catLabel: 'Models', date: 'May 2026', read: '9 min read', title: 'Routing tasks across MindFast, MindDeep, and Mind 3.1', excerpt: 'How task-level routing decisions are made inside a Mindzy deployment, and why a single best-model strategy almost always underperforms.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Governance', date: 'April 2026', read: '14 min read', title: 'The validation layer is the product', excerpt: 'Most production AI failures are not model failures. They are governance failures. A field guide to validation rules, approval flows, and audit boundaries.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop' },
  { cat: 'operations', catLabel: 'Operations', date: 'April 2026', read: '11 min read', title: 'Deploying department by department — a practical playbook', excerpt: 'Why progressive rollout still wins, how to choose the first department, and what to put behind a human gate before anything goes live.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop' },
  { cat: 'industry', catLabel: 'Industry', date: 'April 2026', read: '10 min read', title: 'What "AI-native" actually means for a traditional company', excerpt: 'AI infrastructure does not require rebuilding the business. It requires designing the operating layer around how the business already runs.', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop' },
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'March 2026', read: '8 min read', title: 'Connectors are the unglamorous half of every deployment', excerpt: "A short essay on the tools without APIs, the legacy systems no one wants to touch, and why the connector layer is where Mindzy projects live or die.", img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Governance', date: 'March 2026', read: '13 min read', title: 'Permissions as a design problem, not a policy problem', excerpt: 'Reframing role hierarchy, approval flows, and audit trails as first-class design surfaces inside an AI operating layer.', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format&fit=crop' },
  { cat: 'models', catLabel: 'Models', date: 'March 2026', read: '7 min read', title: 'Three proprietary models, every external model — why both matter', excerpt: 'On the value of running MindFast, MindDeep, and Mind 3.1 alongside Claude, GPT, Gemini, Mistral, and others — and never locking clients into a single vendor.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop' },
  { cat: 'operations', catLabel: 'Operations', date: 'February 2026', read: '15 min read', title: 'How Mindzy engineers manage agent teams', excerpt: 'A day in the life. Our team no longer writes code line by line — they review, validate, and supervise specialized agents. Here is what that looks like in practice.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop' },
  { cat: 'industry', catLabel: 'Industry', date: 'February 2026', read: '6 min read', title: 'The diagnosis is the deliverable', excerpt: 'Why every Mindzy engagement starts with an executive diagnosis — and what we look for before any technology is proposed.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop' },
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'January 2026', read: '11 min read', title: 'Designing dashboards around hierarchy, not metrics', excerpt: "A custom Mindzy dashboard is not a reporting page. It mirrors the company's decision structure — leadership, managers, teams, validation.", img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Governance', date: 'January 2026', read: '9 min read', title: 'Reversible cutovers and the case against big-bang rollouts', excerpt: 'Every Mindzy deployment is reversible until your team signs off. The case for slowing down before going live.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop' },
]

const POSTS_FR = [
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'Mai 2026', read: '12 min de lecture', title: 'Pourquoi les agents IA échouent sans infrastructure', excerpt: 'Le goulot d\'étranglement pour l\'IA en entreprise s\'est déplacé de la qualité des modèles vers la couche opérationnelle. Un regard pratique sur ce que contient réellement une infrastructure — et ce qu\'elle ne contient pas.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop' },
  { cat: 'models', catLabel: 'Modèles', date: 'Mai 2026', read: '9 min de lecture', title: 'Router les tâches entre MindFast, MindDeep et Mind 3.1', excerpt: 'Comment les décisions de routage au niveau des tâches sont prises dans un déploiement Mindzy, et pourquoi une stratégie de modèle unique sous-performe presque toujours.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Gouvernance', date: 'Avril 2026', read: '14 min de lecture', title: 'La couche de validation est le produit', excerpt: 'La plupart des échecs IA en production ne sont pas des défaillances de modèles. Ce sont des défaillances de gouvernance. Un guide pratique sur les règles de validation, les flux d\'approbation et les périmètres d\'audit.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop' },
  { cat: 'operations', catLabel: 'Opérations', date: 'Avril 2026', read: '11 min de lecture', title: 'Déployer département par département — un guide pratique', excerpt: 'Pourquoi le déploiement progressif gagne encore, comment choisir le premier département, et ce qu\'il faut placer derrière une validation humaine avant tout lancement.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop' },
  { cat: 'industry', catLabel: 'Secteur', date: 'Avril 2026', read: '10 min de lecture', title: 'Ce que « AI-native » signifie vraiment pour une entreprise traditionnelle', excerpt: 'L\'infrastructure IA ne nécessite pas de reconstruire l\'entreprise. Elle nécessite de concevoir la couche opérationnelle autour du fonctionnement actuel de l\'entreprise.', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop' },
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'Mars 2026', read: '8 min de lecture', title: 'Les connecteurs sont la moitié ingrate de chaque déploiement', excerpt: 'Un essai court sur les outils sans API, les systèmes legacy que personne ne veut toucher, et pourquoi la couche connecteur est celle où les projets Mindzy réussissent ou échouent.', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Gouvernance', date: 'Mars 2026', read: '13 min de lecture', title: 'Les permissions comme problème de design, pas de politique', excerpt: 'Recadrer la hiérarchie des rôles, les flux d\'approbation et les pistes d\'audit comme des surfaces de design de premier plan dans une couche opérationnelle IA.', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80&auto=format&fit=crop' },
  { cat: 'models', catLabel: 'Modèles', date: 'Mars 2026', read: '7 min de lecture', title: 'Trois modèles propriétaires, tous les modèles externes — pourquoi les deux comptent', excerpt: 'Sur la valeur d\'utiliser MindFast, MindDeep et Mind 3.1 aux côtés de Claude, GPT, Gemini, Mistral et d\'autres — sans jamais enfermer les clients dans un seul fournisseur.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop' },
  { cat: 'operations', catLabel: 'Opérations', date: 'Février 2026', read: '15 min de lecture', title: 'Comment les ingénieurs Mindzy gèrent les équipes d\'agents', excerpt: 'Un jour dans la vie. Notre équipe n\'écrit plus du code ligne par ligne — elle révise, valide et supervise des agents spécialisés. Voici à quoi ça ressemble en pratique.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop' },
  { cat: 'industry', catLabel: 'Secteur', date: 'Février 2026', read: '6 min de lecture', title: 'Le diagnostic est le livrable', excerpt: 'Pourquoi chaque engagement Mindzy commence par un diagnostic exécutif — et ce que nous cherchons avant de proposer une quelconque technologie.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop' },
  { cat: 'infrastructure', catLabel: 'Infrastructure', date: 'Janvier 2026', read: '11 min de lecture', title: 'Concevoir des tableaux de bord autour de la hiérarchie, pas des métriques', excerpt: 'Un tableau de bord Mindzy personnalisé n\'est pas une page de reporting. Il reflète la structure décisionnelle de l\'entreprise — direction, managers, équipes, validation.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop' },
  { cat: 'governance', catLabel: 'Gouvernance', date: 'Janvier 2026', read: '9 min de lecture', title: 'Basculements réversibles et le plaidoyer contre les déploiements massifs', excerpt: 'Chaque déploiement Mindzy est réversible jusqu\'à ce que votre équipe valide. Le plaidoyer pour ralentir avant de passer en production.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop' },
]

// Slug derived from the English title (cross-locale stability).
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// Frontmatter date: convert "May 2026" → "2026-05-01" etc. Returns ISO yyyy-mm-dd.
const MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
  janvier: '01', février: '02', mars: '03', avril: '04', mai: '05', juin: '06',
  juillet: '07', août: '08', septembre: '09', octobre: '10', novembre: '11', décembre: '12',
}
function toIsoDate(s) {
  const parts = s.toLowerCase().split(/\s+/)
  const month = MONTHS[parts[0]] ?? '01'
  const year = parts[1] ?? '2026'
  return `${year}-${month}-01`
}

function readingMinutes(s) {
  const m = s.match(/(\d+)\s*min/)
  return m ? Number(m[1]) : 5
}

function slugForLocale(p, lang) {
  // Always derive from the EN-side title so EN and FR share a stable slug
  // (the user reads and edits per locale, but the public URL is locale-neutral).
  const enIdx = POSTS_FR.indexOf(p)
  const en = enIdx >= 0 ? POSTS_EN[enIdx] : p
  return slugify(en?.title ?? p.title) || slugify(p.title)
}

function buildFrontmatter(p, lang) {
  const finalSlug = slugForLocale(p, lang)
  const isoDate = toIsoDate(p.date)
  const minutes = readingMinutes(p.read)
  const titleEscaped = p.title.replace(/"/g, '\\"')
  const excerptEscaped = p.excerpt.replace(/"/g, '\\"')
  return [
    '---',
    `title: "${titleEscaped}"`,
    `slug: ${finalSlug}`,
    `excerpt: "${excerptEscaped}"`,
    `category: ${p.cat}`,
    `author: Mindzy`,
    `date: '${isoDate}'`,
    `image: ${p.img}`,
    `readingTime: ${minutes}`,
    `modifiedDate: '${isoDate}'`,
    `tags: [ai-infrastructure, ${p.cat}, mindzy]`,
    `keywords: ai infrastructure, ${p.cat}, mindzy, ${lang}`,
    `lang: ${lang}`,
    '---',
    '',
    buildBody(p, lang),
  ].join('\n')
}

// Category-specific article skeletons. Each section is the body the public
// site will render — user can polish in the Tiptap editor afterwards.
const BODIES = {
  infrastructure: {
    en: [
      '## What we mean by "infrastructure"',
      '',
      'When teams say they are building an AI infrastructure, they usually mean a model subscription and a chat box. The operating layer — the part that determines whether AI actually works inside a company — is almost always missing.',
      '',
      'At Mindzy, we use the word to describe the full set of plumbing that sits between your people and the models: connectors to your tools, routing logic, validation rules, audit trails, and the dashboards your managers actually look at.',
      '',
      '## What breaks without it',
      '',
      'A model that has no infrastructure does not fail loudly. It returns plausible answers that nobody can trust, on data nobody can audit, through interfaces nobody can govern. Three months in, the company has a parallel IT shadow running on prompts, and the operations team has lost the ability to say what the AI did, when, and to whom.',
      '',
      '## How Mindzy designs the layer',
      '',
      'We start with the workflow, not the model. We map the actual decisions and approvals that exist today, identify where AI can take work off people, and then build the smallest set of connectors, validation rules, and dashboards that make those decisions auditable end to end.',
      '',
      'The result is not a flashy demo. It is an operating layer that your teams use every day, that your managers can review, and that your governance team can audit without scheduling a meeting.',
    ],
    fr: [
      '## Ce que nous entendons par "infrastructure"',
      '',
      'Quand les équipes disent qu\'elles construisent une infrastructure IA, elles parlent généralement d\'un abonnement à un modèle et d\'une boîte de chat. La couche opérationnelle — celle qui détermine si l\'IA fonctionne réellement en entreprise — manque presque toujours.',
      '',
      'Chez Mindzy, nous utilisons ce mot pour décrire l\'ensemble de la plomberie qui sépare vos équipes des modèles : connecteurs vers vos outils, logique de routage, règles de validation, pistes d\'audit, et les tableaux de bord que vos managers consultent vraiment.',
      '',
      '## Ce qui casse sans elle',
      '',
      'Un modèle sans infrastructure n\'échoue pas bruyamment. Il renvoie des réponses plausibles auxquelles personne ne peut se fier, sur des données que personne ne peut auditer, via des interfaces que personne ne peut gouverner. Trois mois plus tard, l\'entreprise a une IT parallèle qui tourne à base de prompts, et les opérations ont perdu la capacité de dire ce que l\'IA a fait, quand, et à qui.',
      '',
      '## Comment Mindzy conçoit la couche',
      '',
      'Nous commençons par le workflow, pas par le modèle. Nous cartographions les décisions et validations existantes, identifions où l\'IA peut délester les équipes, puis nous construisons le plus petit ensemble de connecteurs, règles de validation et tableaux de bord qui rend ces décisions auditables de bout en bout.',
      '',
      'Le résultat n\'est pas une démo brillante. C\'est une couche opérationnelle que vos équipes utilisent tous les jours, que vos managers peuvent relire, et que votre gouvernance peut auditer sans convoquer de réunion.',
    ],
  },
  models: {
    en: [
      '## Why one model is rarely enough',
      '',
      'No single model is the right tool for every task. A long contract analysis wants a different engine than a five-line customer reply, and a reasoning-heavy refactor wants something else again. Running everything on the same model either burns budget on tasks that did not need it, or returns weak results on tasks that did.',
      '',
      '## How Mindzy routes tasks',
      '',
      'Inside a Mindzy deployment, every request is tagged — language, length, sensitivity, required reasoning, allowed models — and routed by policy. Lightweight tasks go to a fast model. Sensitive content goes to a model your compliance team has signed off on. Long-document reasoning goes to whatever engine your benchmarks say handles it best this quarter.',
      '',
      'Routing is not magic and we do not pretend it is. It is a small piece of code, clearly documented, that you can read, override, and tune as your team gets more demanding.',
      '',
      '## MindFast, MindDeep, Mind 3.1 — and the rest',
      '',
      'We ship three proprietary models that we control end to end, and we wire them up next to every external model that earns its place: Claude, GPT, Gemini, Mistral, and the open weights that pass our bar. You are never locked in. Switching a default is a config change, not a re-platforming project.',
    ],
    fr: [
      '## Pourquoi un seul modèle ne suffit presque jamais',
      '',
      'Aucun modèle n\'est le bon outil pour toutes les tâches. Une analyse de contrat longue demande un moteur différent d\'une réponse client de cinq lignes, et un refactor lourd en raisonnement veut encore autre chose. Tout faire tourner sur le même modèle, c\'est soit brûler du budget pour des tâches qui n\'en avaient pas besoin, soit renvoyer des résultats faibles sur celles qui en avaient.',
      '',
      '## Comment Mindzy route les tâches',
      '',
      'Dans un déploiement Mindzy, chaque requête est étiquetée — langue, longueur, sensibilité, raisonnement requis, modèles autorisés — puis routée par politique. Les tâches légères vont à un modèle rapide. Les contenus sensibles vont à un modèle que votre conformité a validé. Le raisonnement long va au moteur que vos benchmarks désignent comme le meilleur ce trimestre-ci.',
      '',
      'Le routage n\'est pas magique et nous ne prétendons pas le contraire. C\'est un petit morceau de code, clairement documenté, que vous pouvez lire, surcharger et affiner à mesure que votre équipe devient plus exigeante.',
      '',
      '## MindFast, MindDeep, Mind 3.1 — et le reste',
      '',
      'Nous livrons trois modèles propriétaires que nous contrôlons de bout en bout, et nous les branchons à côté de chaque modèle externe qui gagne sa place : Claude, GPT, Gemini, Mistral, et les poids ouverts qui passent notre barre. Vous n\'êtes jamais enfermé. Changer un défaut est un changement de configuration, pas un projet de re-plateformisation.',
    ],
  },
  governance: {
    en: [
      '## The failure that is not a failure',
      '',
      'Most production AI failures look like model failures. They are not. They are governance failures: the right answer was generated and then either ignored, approved without review, or applied to a context it was never meant to touch. The model did its job. The operating layer around it did not.',
      '',
      '## What a good validation layer does',
      '',
      'It defines, in plain language, what the AI is allowed to do, what it must escalate, and what it is forbidden from doing. It enforces those rules before an output reaches a person or another system. It logs every decision, with enough context to replay it later.',
      '',
      '## Permissions as a design surface',
      '',
      'Role hierarchy, approval flows, and audit trails are not a compliance afterthought. They are the product. We treat them as first-class design surfaces, with the same care we put on dashboards and connectors, because they are what your operations team, your security team, and your auditors will actually live with.',
      '',
      '## A simple decision table',
      '',
      'Here is the kind of matrix most teams end up with once they have lived with the system for a few months. Yours will be different, but the shape is the same: row per action type, column per role, cell per outcome.',
      '',
      '| Action type | Junior operator | Senior operator | Manager | Compliance |',
      '| --- | --- | --- | --- | --- |',
      '| Read internal summary | Approve | Approve | Approve | Approve |',
      '| Draft a customer reply | Escalate | Approve | Approve | Approve |',
      '| Send a customer reply | Block | Escalate | Approve | Approve |',
      '| Move money (any amount) | Block | Block | Escalate | Approve |',
      '| Change a model routing rule | Block | Block | Escalate | Approve |',
      '| Read the audit log | Block | Read-only | Read-only | Read + export |',
      '',
      'The point is not the exact cells. The point is that the matrix exists, lives in code, and is reviewed every quarter with the same people who review the rest of your controls.',
    ],
    fr: [
      '## La défaillance qui n\'en est pas une',
      '',
      'La plupart des défaillances IA en production ressemblent à des défaillances de modèles. Elles ne le sont pas. Ce sont des défaillances de gouvernance : la bonne réponse a été générée puis soit ignorée, soit approuvée sans relecture, soit appliquée à un contexte auquel elle n\'était pas destinée. Le modèle a fait son travail. La couche opérationnelle autour, non.',
      '',
      '## Ce que fait une bonne couche de validation',
      '',
      'Elle définit, en langage clair, ce que l\'IA a le droit de faire, ce qu\'elle doit escalader, et ce qu\'il lui est interdit de faire. Elle applique ces règles avant qu\'une sortie n\'atteigne une personne ou un autre système. Elle journalise chaque décision, avec assez de contexte pour la rejouer plus tard.',
      '',
      '## Les permissions comme surface de design',
      '',
      'Hiérarchie des rôles, flux d\'approbation, pistes d\'audit : ce n\'est pas un ajout afterthought conformité. C\'est le produit. Nous les traitons comme des surfaces de design de premier plan, avec le même soin que les tableaux de bord et les connecteurs, parce que c\'est ce que vos opérations, votre sécurité et vos auditeurs vivront au quotidien.',
      '',
      '## Une table de décision simple',
      '',
      'Voici la matrice que la plupart des équipes finissent par adopter après quelques mois avec le système. La vôtre sera différente, mais la forme est la même : une ligne par type d\'action, une colonne par rôle, une cellule par issue.',
      '',
      '| Type d\'action | Opérateur junior | Opérateur senior | Manager | Conformité |',
      '| --- | --- | --- | --- | --- |',
      '| Lire un résumé interne | Valider | Valider | Valider | Valider |',
      '| Rédiger une réponse client | Escalader | Valider | Valider | Valider |',
      '| Envoyer une réponse client | Bloquer | Escalader | Valider | Valider |',
      '| Bouger de l\'argent (tout montant) | Bloquer | Bloquer | Escalader | Valider |',
      '| Modifier une règle de routage | Bloquer | Bloquer | Escalader | Valider |',
      '| Lire le journal d\'audit | Bloquer | Lecture seule | Lecture seule | Lecture + export |',
      '',
      'L\'important n\'est pas la valeur exacte des cellules. L\'important est que la matrice existe, vive dans le code, et soit revue chaque trimestre avec les mêmes personnes qui revoient vos autres contrôles.',
    ],
  },
  operations: {
    en: [
      '## The case for starting small',
      '',
      'Big-bang AI rollouts fail for obvious reasons: nobody on the receiving end has had time to learn the system, the validation rules are guesses, and the first real failure is the one that ends the program. Progressive rollout — one department, then two, then the rest — gives the team time to learn the failure modes before the blast radius grows.',
      '',
      '## Choosing the first department',
      '',
      'The right first department is not the one with the loudest problem. It is the one with the most measurable workflow, the most patient internal sponsor, and the lowest cost of a bad answer. Usually that is back-office operations or a single product line, not the customer-facing surface.',
      '',
      '## What to put behind a human gate',
      '',
      'Anything that leaves the company — outbound email, customer-facing documents, money-moving actions — needs a human in the loop, at least for the first months. Anything that stays internal — research, summarization, first-draft generation — can run with a lighter review layer.',
      '',
      '## How Mindzy manages agent teams',
      '',
      'Our own engineers no longer write code line by line. They review, validate, and supervise specialized agents. The same playbook applies inside your deployment: each agent has a narrow job, a clear escalation rule, and a place in the audit trail.',
      '',
      '## Common rollout milestones',
      '',
      'A typical 90-day rollout, calibrated for a mid-sized operations team. Adjust the labels to your organisation; the shape rarely changes.',
      '',
      '| Phase | Weeks | Goal | Exit criterion |',
      '| --- | --- | --- | --- |',
      '| Diagnosis | 1–2 | Map workflows, pick first department | Signed-off backlog |',
      '| Pilot | 3–6 | Single workflow, human in the loop | 30 days of clean audits |',
      '| Hardening | 7–10 | Validation rules, dashboards, alerts | Sign-off from compliance |',
      '| Expand | 11–13 | Two more workflows, lighter reviews | Manager sign-off |',
      '',
      'If any phase does not hit its exit criterion, we stop. We do not push through a phase that the system is not ready for. That is the single most expensive mistake we see other vendors make.',
    ],
    fr: [
      '## Pourquoi commencer petit',
      '',
      'Les déploiements IA massifs échouent pour des raisons évidentes : personne côté réception n\'a eu le temps d\'apprendre le système, les règles de validation sont des hypothèses, et la première vraie défaillance est celle qui met fin au programme. Le déploiement progressif — un département, puis deux, puis le reste — laisse à l\'équipe le temps d\'apprendre les modes de défaillance avant que le rayon d\'impact ne grandisse.',
      '',
      '## Choisir le premier département',
      '',
      'Le bon premier département n\'est pas celui qui a le problème le plus bruyant. C\'est celui qui a le workflow le plus mesurable, le sponsor interne le plus patient, et le coût de mauvaise réponse le plus bas. C\'est généralement les opérations back-office ou une seule ligne de produit, pas la surface client.',
      '',
      '## Ce qu\'il faut placer derrière une validation humaine',
      '',
      'Tout ce qui sort de l\'entreprise — email sortant, documents clients, actions à incidence financière — demande un humain dans la boucle, au moins les premiers mois. Tout ce qui reste interne — recherche, résumé, première génération de brouillon — peut tourner avec une couche de revue plus légère.',
      '',
      '## Comment Mindzy gère les équipes d\'agents',
      '',
      'Nos propres ingénieurs n\'écrivent plus le code ligne par ligne. Ils relisent, valident et supervisent des agents spécialisés. Le même playbook s\'applique à votre déploiement : chaque agent a un job étroit, une règle d\'escalade claire, et une place dans la piste d\'audit.',
      '',
      '## Jalons courants d\'un déploiement',
      '',
      'Un déploiement typique de 90 jours, calibré pour une équipe d\'opérations de taille moyenne. Adaptez les libellés à votre organisation ; la forme change rarement.',
      '',
      '| Phase | Semaines | Objectif | Critère de sortie |',
      '| --- | --- | --- | --- |',
      '| Diagnostic | 1–2 | Cartographier les workflows, choisir le premier département | Backlog validé |',
      '| Pilote | 3–6 | Un seul workflow, humain dans la boucle | 30 jours d\'audit propre |',
      '| Durcissement | 7–10 | Règles de validation, tableaux de bord, alertes | Validation conformité |',
      '| Extension | 11–13 | Deux workflows supplémentaires, revues allégées | Validation manager |',
      '',
      'Si une phase n\'atteint pas son critère de sortie, on s\'arrête. On ne force pas une phase quand le système n\'est pas prêt. C\'est l\'erreur la plus coûteuse que nous voyons chez d\'autres prestataires.',
    ],
  },
  industry: {
    en: [
      '## A reframing',
      '',
      '"AI-native" has become a marketing word, but it does not have to be. Stripped of the buzz, it means one thing: a company whose daily operations are designed around what AI can and cannot do, instead of a company that has bolted AI onto a workflow that was never built for it.',
      '',
      '## What it does not mean',
      '',
      'It does not mean rebuilding the business. It does not mean replacing people. It does not mean moving fast and breaking things. Most operational AI work is closer to plumbing than to product: connectors, validation, dashboards, governance. Boring things that pay for themselves every month.',
      '',
      '## What it does mean',
      '',
      'It means the leadership team has a shared view of where AI can move the needle and where it cannot. It means a manager can ask the system what it did last week and get a real answer. It means a deployment can be rolled back in an afternoon, not a quarter.',
      '',
      '## Mindzy\'s position',
      '',
      'We do not sell AI. We build the operating layer that makes a real business AI-capable, one workflow at a time, with a human team in the loop on every decision that matters.',
    ],
    fr: [
      '## Un recadrage',
      '',
      '"AI-native" est devenu un mot marketing, mais il n\'est pas obligé de le rester. Dépouillé du buzz, il signifie une seule chose : une entreprise dont les opérations quotidiennes sont conçues autour de ce que l\'IA peut et ne peut pas faire, plutôt qu\'une entreprise qui a greffé l\'IA sur un workflow qui n\'a jamais été conçu pour elle.',
      '',
      '## Ce que cela ne veut pas dire',
      '',
      'Cela ne veut pas dire reconstruire l\'entreprise. Cela ne veut pas dire remplacer les gens. Cela ne veut pas dire aller vite et casser des choses. La plupart du travail opérationnel sur l\'IA ressemble plus à de la plomberie qu\'à du produit : connecteurs, validation, tableaux de bord, gouvernance. Des choses ennuyeuses qui se paient chaque mois.',
      '',
      '## Ce que cela veut dire',
      '',
      'Cela veut dire que la direction a une vision partagée de où l\'IA peut faire bouger les lignes et où elle ne le peut pas. Cela veut dire qu\'un manager peut demander au système ce qu\'il a fait la semaine dernière et obtenir une vraie réponse. Cela veut dire qu\'un déploiement peut être annulé en un après-midi, pas en un trimestre.',
      '',
      '## La position de Mindzy',
      '',
      'Nous ne vendons pas de l\'IA. Nous construisons la couche opérationnelle qui rend une vraie entreprise capable d\'utiliser l\'IA, un workflow à la fois, avec une équipe humaine dans la boucle sur chaque décision qui compte.',
    ],
  },
}

function buildBody(p, lang) {
  const skeleton = BODIES[p.cat]?.[lang] ?? BODIES.infrastructure[lang]
  // Add the H1 + lead paragraph + the category skeleton + the closing CTA.
  const lines = [
    `# ${p.title}`,
    '',
    `> ${p.excerpt}`,
    '',
    '<!-- Body generated from the previously hardcoded blog list.',
    '     Editable in the admin Tiptap editor at /dashboard/admin/articles/{id}.',
    '     DB edits take precedence over this markdown on the public site. -->',
    '',
    ...skeleton,
    '',
    '---',
    '',
    lang === 'fr'
      ? '**Vous voulez discuter de votre projet ?** [Réservez un appel de 30 minutes](https://calendar.app.google/ghE79tSFxmea4Scd9) — on écoute, on cartographie, on vous dit si l\'IA peut faire bouger les lignes dans vos opérations.'
      : '**Want to discuss your project?** [Book a 30-minute call](https://calendar.app.google/ghE79tSFxmea4Scd9) — we listen, we map, and we tell you whether AI can move the needle for your operations.',
    '',
  ]
  return lines.join('\n')
}

function writeForLocale(posts, lang) {
  const dir = join(ROOT, 'content', 'blog', lang)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  let count = 0
  for (const p of posts) {
    const slug = slugForLocale(p, lang)
    const path = join(dir, `${slug}.md`)
    const fm = buildFrontmatter(p, lang)
    writeFileSync(path, fm, 'utf8')
    count++
    console.log(`  ${lang}/${slug}.md`)
  }
  return count
}

console.log('Writing AI essays markdown…')
const en = writeForLocale(POSTS_EN, 'en')
const fr = writeForLocale(POSTS_FR, 'fr')
console.log(`\nDone: ${en} EN + ${fr} FR markdown files written.`)
