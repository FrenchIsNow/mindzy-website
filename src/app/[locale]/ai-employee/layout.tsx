import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'AI Employee as a Service — Custom AI workforce | Mindzy',
    description: "Mindzy is building a platform to deploy custom AI employees for real business roles — designed around your tools, workflows, and governance rules.",
  },
  fr: {
    title: 'AI Employee as a Service — Force de travail IA sur mesure',
    description: "Mindzy construit une plateforme pour déployer des employés IA sur mesure dans de vrais rôles métier — conçue autour de vos outils, workflows et règles de gouvernance.",
  },
  es: {
    title: 'AI Employee as a Service — Fuerza de trabajo IA personalizada',
    description: 'Mindzy construye una plataforma para desplegar empleados IA personalizados en roles empresariales reales — diseñada en torno a tus herramientas, workflows y reglas de gobernanza.',
  },
  de: {
    title: 'AI Employee as a Service — Maßgeschneiderte KI-Belegschaft',
    description: 'Mindzy entwickelt eine Plattform, um maßgeschneiderte KI-Mitarbeiter für echte Geschäftsrollen einzusetzen — abgestimmt auf Ihre Tools, Workflows und Governance-Regeln.',
  },
  it: {
    title: 'AI Employee as a Service — Forza lavoro IA personalizzata',
    description: 'Mindzy sta costruendo una piattaforma per distribuire dipendenti IA personalizzati in ruoli aziendali reali — progettata intorno ai tuoi strumenti, workflow e regole di governance.',
  },
  pt: {
    title: 'AI Employee as a Service — Força de trabalho IA personalizada',
    description: 'A Mindzy está a construir uma plataforma para implementar funcionários IA personalizados em papéis empresariais reais — concebida em torno das suas ferramentas, workflows e regras de governança.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/ai-employee', title: t.title, description: t.description })
}

export default function AIEmployeeLayout({ children }: { children: React.ReactNode }) {
  return children
}
