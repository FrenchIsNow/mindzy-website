import type { Metadata } from 'next'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].legal.cgu
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/legal/cgu',
    title: t.title,
    description: t.title,
    noIndex: true,
  })
}

export default async function CGUPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = copy[locale as Locale].legal.cgu
  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <h1 className="heading-2 text-anthracite mb-8">{t.title}</h1>
        <div className="prose prose-lg max-w-none">
          <p className="lead">Dernière mise à jour : Janvier 2025</p>
          <h2>Article 1 - Objet</h2>
          <p>Les présentes CGU définissent les modalités d&apos;utilisation du site mindzy.me et des services Mindzy.</p>
          <h2>Article 2 - Acceptation</h2>
          <p>L&apos;utilisation du site implique l&apos;acceptation des présentes CGU.</p>
          <h2>Article 3 - Services</h2>
          <p>Mindzy propose des services de création et gestion de sites web pour professionnels du bien-être.</p>
          <h2>Article 4 - Propriété intellectuelle</h2>
          <p>L&apos;ensemble des éléments du site sont protégés par le droit de la propriété intellectuelle.</p>
          <h2>Article 5 - Données personnelles</h2>
          <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, rectification et suppression de vos données.</p>
          <h2>Contact</h2>
          <p>contact@mindzy.me</p>
        </div>
      </div>
    </div>
  )
}
