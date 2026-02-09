import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProfileQuiz } from '@/components/features/ProfileQuiz'
import { copy } from '@/lib/copy'
import { profileKeys, type ProfileKey } from '@/lib/config'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const profileTitles: Record<ProfileKey, Record<Locale, string>> = {
  beginner: { fr: 'Je lance mon activité', en: "I'm launching my business", es: 'Estoy lanzando mi negocio' },
  pro: { fr: "J'ai déjà un site", en: 'I have a website', es: 'Ya tengo un sitio' },
  booking: { fr: 'Je veux automatiser mes RDV', en: 'I want to automate bookings', es: 'Quiero automatizar mis citas' },
  sales: { fr: 'Je veux vendre en ligne', en: 'I want to sell online', es: 'Quiero vender en línea' },
  custom: { fr: 'Projet sur-mesure', en: 'Custom project', es: 'Proyecto personalizado' },
}

const profileDescriptions: Record<ProfileKey, Record<Locale, string>> = {
  beginner: {
    fr: 'Répondez à quelques questions pour recevoir une recommandation personnalisée pour lancer votre présence en ligne.',
    en: 'Answer a few questions to receive a personalized recommendation to launch your online presence.',
    es: 'Responda unas preguntas para recibir una recomendación personalizada para lanzar su presencia en línea.',
  },
  pro: {
    fr: 'Répondez à quelques questions pour recevoir une recommandation personnalisée pour moderniser votre site web.',
    en: 'Answer a few questions to receive a personalized recommendation to modernize your website.',
    es: 'Responda unas preguntas para recibir una recomendación personalizada para modernizar su sitio web.',
  },
  booking: {
    fr: 'Répondez à quelques questions pour recevoir une recommandation personnalisée pour automatiser vos réservations.',
    en: 'Answer a few questions to receive a personalized recommendation to automate your bookings.',
    es: 'Responda unas preguntas para recibir una recomendación personalizada para automatizar sus reservas.',
  },
  sales: {
    fr: 'Répondez à quelques questions pour recevoir une recommandation personnalisée pour vendre en ligne.',
    en: 'Answer a few questions to receive a personalized recommendation to sell online.',
    es: 'Responda unas preguntas para recibir una recomendación personalizada para vender en línea.',
  },
  custom: {
    fr: 'Répondez à quelques questions pour recevoir une recommandation personnalisée pour votre application web, mobile ou cross-plateforme.',
    en: 'Answer a few questions to receive a personalized recommendation for your web, mobile, or cross-platform application.',
    es: 'Responda unas preguntas para recibir una recomendación personalizada para su aplicación web, móvil o multiplataforma.',
  },
}

const profileSubtitles: Record<ProfileKey, Record<Locale, string>> = {
  beginner: {
    fr: 'Quelques questions pour mieux comprendre votre projet et vous proposer la solution idéale.',
    en: 'A few questions to better understand your project and suggest the ideal solution.',
    es: 'Unas preguntas para entender mejor su proyecto y sugerirle la solución ideal.',
  },
  pro: {
    fr: 'Aidez-nous à comprendre votre situation actuelle pour une recommandation sur-mesure.',
    en: 'Help us understand your current situation for a custom recommendation.',
    es: 'Ayúdenos a comprender su situación actual para una recomendación personalizada.',
  },
  booking: {
    fr: 'Parlez-nous de votre activité pour que nous trouvions la meilleure solution d\'automatisation.',
    en: 'Tell us about your activity so we can find the best automation solution.',
    es: 'Cuéntenos sobre su actividad para encontrar la mejor solución de automatización.',
  },
  sales: {
    fr: 'Décrivez votre projet de vente en ligne pour recevoir une solution adaptée.',
    en: 'Describe your online sales project to receive a tailored solution.',
    es: 'Describa su proyecto de venta en línea para recibir una solución adaptada.',
  },
  custom: {
    fr: 'Décrivez votre projet d\'application sur-mesure pour recevoir un devis adapté à vos besoins.',
    en: 'Describe your custom application project to receive a quote tailored to your needs.',
    es: 'Describa su proyecto de aplicación personalizada para recibir un presupuesto adaptado a sus necesidades.',
  },
}

function isValidProfile(type: string): type is ProfileKey {
  return (profileKeys as readonly string[]).includes(type)
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; type: string }> }): Promise<Metadata> {
  const { locale, type } = await params
  if (!isValidProfile(type)) return {}
  const loc = locale as Locale
  return buildPageMetadata({
    locale: loc,
    path: `/profil/${type}`,
    title: profileTitles[type][loc],
    description: profileDescriptions[type][loc],
    noIndex: true,
  })
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string; type: string }> }) {
  const { locale, type } = await params
  if (!isValidProfile(type)) notFound()
  const loc = locale as Locale
  const t = copy[loc].useCases.cards[type]

  const diagnosticHint: Record<Locale, string> = {
    fr: 'Pas encore sûr ? Faites d\'abord notre diagnostic express pour évaluer votre projet.',
    en: 'Not sure yet? Take our express diagnostic to evaluate your project first.',
    es: '¿Aún no está seguro? Haga primero nuestro diagnóstico express para evaluar su proyecto.',
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h1 className="heading-2 text-anthracite mb-4">{t?.title ?? profileTitles[type][loc]}</h1>
          <p className="body-large max-w-xl mx-auto">{profileSubtitles[type][loc]}</p>
          {type === 'custom' && (
            <p className="text-sm text-gray-500 mt-4">
              {diagnosticHint[loc]}{' '}
              <Link href={`/${loc}/diagnostic?profile=custom`} className="text-violet font-medium hover:underline">
                {loc === 'fr' ? 'Diagnostic projet sur-mesure →' : loc === 'en' ? 'Custom project diagnostic →' : 'Diagnóstico proyecto personalizado →'}
              </Link>
            </p>
          )}
        </div>
        <ProfileQuiz locale={loc} profileType={type} />
      </div>
    </div>
  )
}
