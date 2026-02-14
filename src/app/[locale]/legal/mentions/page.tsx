import type { Metadata } from 'next'
import { copy } from '@/lib/copy'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = copy[locale as Locale].legal.mentions
  return buildPageMetadata({
    locale: locale as Locale,
    path: '/legal/mentions',
    title: t.title,
    description: t.title,
    noIndex: true,
  })
}

const legalContent: Record<Locale, { lastUpdateLabel: string; lastUpdate: string; sections: Record<string, { title: string; content: string[] }> }> = {
  fr: {
    lastUpdateLabel: 'Dernière mise à jour :',
    lastUpdate: '12 février 2026',
    sections: {
      editor: {
        title: '1. Éditeur du site',
        content: [
          'Le site mindzy.me est édité par la société :',
          '',
          'Dénomination sociale : UIVAZI OÜ',
          'Forme juridique : Osaühing (société à responsabilité limitée de droit estonien)',
          'Capital social : 1 euro',
          'Numéro d\'immatriculation : 17358237 (Registre du commerce estonien - e-äriregister)',
          'Siège social : Ruunaoja tn 3, Lasmäe linnaosa, Tallinn, Harju maakond, 11415, Estonie',
          'Adresse électronique : contact@mindzy.me',
          'Téléphone : +33 7 43 55 45 46',
        ],
      },
      host: {
        title: '3. Hébergeur',
        content: [
          'Le site mindzy.me est hébergé par :',
          '',
          'Raison sociale : Vercel Inc.',
          'Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis',
          'Site web : https://vercel.com',
        ],
      },
      intellectualProperty: {
        title: '4. Propriété intellectuelle',
        content: [
          'L\'ensemble du contenu du site mindzy.me (textes, images, graphismes, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de UIVAZI OÜ ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.',
          '',
          'Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit, est interdite sans l\'autorisation écrite préalable de UIVAZI OÜ.',
          '',
          'Toute exploitation non autorisée du site ou de son contenu constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.',
        ],
      },
      personalData: {
        title: '5. Données personnelles et protection de la vie privée',
        content: [
          '5.1 Responsable du traitement',
          '',
          'Le responsable du traitement des données personnelles collectées sur le site mindzy.me est UIVAZI OÜ, dont les coordonnées figurent à l\'article 1 des présentes.',
        ],
      },
    },
  },
  en: {
    lastUpdateLabel: 'Last updated:',
    lastUpdate: 'February 12, 2026',
    sections: {
      editor: {
        title: '1. Website Publisher',
        content: [
          'The mindzy.me website is published by:',
          '',
          'Company Name: UIVAZI OÜ',
          'Legal Form: Osaühing (Estonian private limited company)',
          'Share Capital: 1 euro',
          'Registration Number: 17358237 (Estonian Commercial Register - e-äriregister)',
          'Registered Office: Ruunaoja tn 3, Lasmäe linnaosa, Tallinn, Harju maakond, 11415, Estonia',
          'Email Address: contact@mindzy.me',
          'Phone Number: +33 7 43 55 45 46',
        ],
      },
      host: {
        title: '3. Host',
        content: [
          'The mindzy.me website is hosted by:',
          '',
          'Company Name: Vercel Inc.',
          'Address: 340 S Lemon Ave #4133, Walnut, CA 91789, United States',
          'Website: https://vercel.com',
        ],
      },
      intellectualProperty: {
        title: '4. Intellectual Property',
        content: [
          'All content of the mindzy.me website (texts, images, graphics, logos, icons, sounds, software, etc.) is the exclusive property of UIVAZI OÜ or its partners and is protected by French and international intellectual property laws.',
          '',
          'Any reproduction, representation, modification, publication, transmission or distortion, total or partial, of the site or its content, by any process whatsoever and on any medium whatsoever, is prohibited without the prior written authorization of UIVAZI OÜ.',
          '',
          'Any unauthorized exploitation of the site or its content would constitute infringement punishable by articles L.335-2 and following of the Intellectual Property Code.',
        ],
      },
      personalData: {
        title: '5. Personal Data and Privacy Protection',
        content: [
          '5.1 Data Controller',
          '',
          'The data controller for personal data collected on the mindzy.me website is UIVAZI OÜ, whose contact details appear in Article 1 hereof.',
        ],
      },
    },
  },
  es: {
    lastUpdateLabel: 'Última actualización:',
    lastUpdate: '12 de febrero de 2026',
    sections: {
      editor: {
        title: '1. Editor del sitio',
        content: [
          'El sitio mindzy.me es editado por la sociedad:',
          '',
          'Denominación social: UIVAZI OÜ',
          'Forma jurídica: Osaühing (sociedad de responsabilidad limitada de derecho estonio)',
          'Capital social: 1 euro',
          'Número de inscripción: 17358237 (Registro mercantil estonio - e-äriregister)',
          'Sede social: Ruunaoja tn 3, Lasmäe linnaosa, Tallinn, Harju maakond, 11415, Estonia',
          'Dirección electrónica: contact@mindzy.me',
          'Teléfono: +33 7 43 55 45 46',
        ],
      },
      host: {
        title: '3. Alojador',
        content: [
          'El sitio mindzy.me está alojado por:',
          '',
          'Razón social: Vercel Inc.',
          'Dirección: 340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos',
          'Sitio web: https://vercel.com',
        ],
      },
      intellectualProperty: {
        title: '4. Propiedad intelectual',
        content: [
          'Todo el contenido del sitio mindzy.me (textos, imágenes, gráficos, logos, iconos, sonidos, software, etc.) es propiedad exclusiva de UIVAZI OÜ o de sus socios y está protegido por las leyes francesas e internacionales relativas a la propiedad intelectual.',
          '',
          'Cualquier reproducción, representación, modificación, publicación, transmisión o desnaturalización, total o parcial, del sitio o de su contenido, por cualquier procedimiento que sea y en cualquier soporte que sea, está prohibida sin la autorización escrita previa de UIVAZI OÜ.',
          '',
          'Cualquier explotación no autorizada del sitio o de su contenido constituiría una falsificación sancionada por los artículos L.335-2 y siguientes del Código de la propiedad intelectual.',
        ],
      },
      personalData: {
        title: '5. Datos personales y protección de la vida privada',
        content: [
          '5.1 Responsable del tratamiento',
          '',
          'El responsable del tratamiento de los datos personales recogidos en el sitio mindzy.me es UIVAZI OÜ, cuyas coordenadas figuran en el artículo 1 de las presentes.',
        ],
      },
    },
  },
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  const t = copy[loc].legal.mentions
  const content = legalContent[loc]

  return (
    <div className="pt-32 pb-20">
      <div className="container-narrow">
        <h1 className="heading-2 text-anthracite mb-8">{t.title}</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">{content.lastUpdateLabel} {content.lastUpdate}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-anthracite mb-4">{content.sections.editor.title}</h2>
            <div className="space-y-2 text-gray-700">
              {content.sections.editor.content.map((paragraph, index) =>
                paragraph ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-anthracite mb-4">{content.sections.host.title}</h2>
            <div className="space-y-2 text-gray-700">
              {content.sections.host.content.map((paragraph, index) =>
                paragraph ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-anthracite mb-4">{content.sections.intellectualProperty.title}</h2>
            <div className="space-y-4 text-gray-700">
              {content.sections.intellectualProperty.content.map((paragraph, index) =>
                paragraph ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-anthracite mb-4">{content.sections.personalData.title}</h2>
            <div className="space-y-2 text-gray-700">
              {content.sections.personalData.content.map((paragraph, index) =>
                paragraph ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
