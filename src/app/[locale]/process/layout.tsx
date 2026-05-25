import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  en: {
    title: 'Our 10-step process — How Mindzy builds AI infrastructure',
    description: 'Every engagement starts with a diagnosis. See the 10-step method Mindzy uses to design and deploy custom AI infrastructure inside any company.',
  },
  fr: {
    title: 'Notre processus en 10 étapes — Comment Mindzy construit votre IA',
    description: "Chaque engagement commence par un diagnostic. Découvrez la méthode en 10 étapes que Mindzy applique pour concevoir et déployer votre infrastructure IA sur mesure.",
  },
  es: {
    title: 'Nuestro proceso en 10 pasos — Cómo Mindzy construye tu IA',
    description: 'Cada compromiso comienza con un diagnóstico. Descubre el método en 10 pasos de Mindzy para diseñar y desplegar tu infraestructura IA personalizada.',
  },
  de: {
    title: 'Unser 10-Schritte-Prozess — Wie Mindzy KI-Infrastruktur baut',
    description: 'Jedes Engagement beginnt mit einer Diagnose. Entdecken Sie die 10-Schritte-Methode, mit der Mindzy maßgeschneiderte KI-Infrastruktur in Unternehmen entwirft und einsetzt.',
  },
  it: {
    title: 'Il nostro processo in 10 fasi — Come Mindzy costruisce la tua IA',
    description: 'Ogni impegno inizia con una diagnosi. Scopri il metodo in 10 fasi che Mindzy applica per progettare e distribuire la tua infrastruttura IA personalizzata.',
  },
  pt: {
    title: 'O nosso processo em 10 passos — Como a Mindzy constrói a sua IA',
    description: 'Cada compromisso começa com um diagnóstico. Descubra o método em 10 passos que a Mindzy aplica para projetar e implantar a sua infraestrutura IA personalizada.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale] ?? META.en!
  return buildPageMetadata({ locale: locale as Locale, path: '/process', title: t.title, description: t.description })
}

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children
}
