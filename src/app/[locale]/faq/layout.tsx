import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'FAQ — Questions about custom AI infrastructure | Mindzy',
    description: 'Answers to the questions companies ask before integrating AI: models, governance, data residency, pricing, deployment, and post-launch optimization.',
  },
  fr: {
    title: "FAQ — Vos questions sur l'infrastructure IA sur mesure",
    description: "Les réponses aux questions que les entreprises posent avant d'intégrer l'IA : modèles, gouvernance, résidence des données, tarifs, déploiement et optimisation.",
  },
  es: {
    title: 'FAQ — Preguntas sobre la infraestructura IA personalizada',
    description: 'Respuestas a las preguntas que las empresas hacen antes de integrar IA: modelos, gobernanza, residencia de datos, precios, despliegue y optimización.',
  },
  de: {
    title: 'FAQ — Fragen zu maßgeschneiderter KI-Infrastruktur | Mindzy',
    description: 'Antworten auf die Fragen, die Unternehmen vor der KI-Integration stellen: Modelle, Governance, Datenresidenz, Preise, Deployment und Optimierung.',
  },
  it: {
    title: 'FAQ — Domande sull’infrastruttura IA personalizzata | Mindzy',
    description: "Risposte alle domande che le aziende pongono prima di integrare l'IA: modelli, governance, residenza dei dati, prezzi, distribuzione e ottimizzazione.",
  },
  pt: {
    title: 'FAQ — Perguntas sobre infraestrutura IA personalizada | Mindzy',
    description: 'Respostas às perguntas que as empresas fazem antes de integrar IA: modelos, governança, residência de dados, preços, implementação e otimização.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/faq', title: t.title, description: t.description })
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
