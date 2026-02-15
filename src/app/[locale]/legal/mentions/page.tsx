import type { Metadata } from 'next'
import { getMessages } from '@/lib/getMessages'
import type { Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getMessages(locale as Locale).legal.mentions
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
          'Les sites conçus et gérés par Mindzy sont hébergés sur des serveurs situés en Europe, via les infrastructures suivantes :',
          '',
          'Hébergeur principal :',
          'Raison sociale : Vercel Inc.',
          'Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis',
          'Site web : https://vercel.com',
          'Région de déploiement : Europe (Paris, France — cdg1)',
          '',
          'Hébergeur complémentaire :',
          'Raison sociale : Hostinger International Ltd.',
          'Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre',
          'Site web : https://www.hostinger.fr',
          'Serveurs : Union européenne',
          '',
          'Les données sont traitées et stockées conformément au Règlement Général sur la Protection des Données (RGPD).',
        ],
      },
      intellectualProperty: {
        title: '4. Propriété intellectuelle',
        content: [
          'L\'ensemble du contenu du site mindzy.me (textes, images, graphismes, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de Mindzy ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.',
          '',
          'Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit, est interdite sans l\'autorisation écrite préalable de Mindzy.',
          '',
          'Toute exploitation non autorisée du site ou de son contenu constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.',
        ],
      },
      personalData: {
        title: '5. Données personnelles et protection de la vie privée',
        content: [
          '5.1 Responsable du traitement',
          '',
          'Le responsable du traitement des données personnelles collectées sur le site mindzy.me est Mindzy, dont les coordonnées figurent à l\'article 1 des présentes.',
          '',
          '5.2 Données collectées',
          '',
          'Dans le cadre de l\'utilisation du site mindzy.me, Mindzy est susceptible de collecter les catégories de données suivantes : nom, prénom, adresse électronique, numéro de téléphone, données de navigation (adresse IP, type de navigateur, pages consultées).',
          '',
          '5.3 Finalités du traitement',
          '',
          'Les données personnelles collectées sont utilisées pour les finalités suivantes :',
          '• Répondre aux demandes de contact et de devis',
          '• Assurer la gestion de la relation client',
          '• Améliorer l\'expérience utilisateur et la navigation sur le site',
          '• Envoyer des communications commerciales (avec consentement préalable)',
          '',
          '5.4 Durée de conservation',
          '',
          'Les données personnelles sont conservées pendant une durée maximale de 3 ans à compter du dernier contact avec l\'utilisateur, sauf obligation légale de conservation plus longue.',
          '',
          '5.5 Droits des utilisateurs',
          '',
          'Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : droit d\'accès, de rectification, d\'effacement, de limitation du traitement, de portabilité des données et d\'opposition. Pour exercer ces droits, vous pouvez nous contacter à l\'adresse : contact@mindzy.me.',
          '',
          '5.6 Cookies',
          '',
          'Le site mindzy.me utilise des cookies pour améliorer l\'expérience de navigation. Vous pouvez paramétrer votre navigateur pour refuser les cookies. Pour plus d\'informations, consultez notre politique de cookies.',
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
          'Websites designed and managed by Mindzy are hosted on servers located in Europe, through the following infrastructures:',
          '',
          'Primary host:',
          'Company Name: Vercel Inc.',
          'Address: 340 S Lemon Ave #4133, Walnut, CA 91789, United States',
          'Website: https://vercel.com',
          'Deployment region: Europe (Paris, France — cdg1)',
          '',
          'Secondary host:',
          'Company Name: Hostinger International Ltd.',
          'Address: 61 Lordou Vironos Street, 6023 Larnaca, Cyprus',
          'Website: https://www.hostinger.com',
          'Servers: European Union',
          '',
          'Data is processed and stored in compliance with the General Data Protection Regulation (GDPR).',
        ],
      },
      intellectualProperty: {
        title: '4. Intellectual Property',
        content: [
          'All content of the mindzy.me website (texts, images, graphics, logos, icons, sounds, software, etc.) is the exclusive property of Mindzy or its partners and is protected by French and international intellectual property laws.',
          '',
          'Any reproduction, representation, modification, publication, transmission or distortion, total or partial, of the site or its content, by any process whatsoever and on any medium whatsoever, is prohibited without the prior written authorization of Mindzy.',
          '',
          'Any unauthorized exploitation of the site or its content would constitute infringement punishable by articles L.335-2 and following of the Intellectual Property Code.',
        ],
      },
      personalData: {
        title: '5. Personal Data and Privacy Protection',
        content: [
          '5.1 Data Controller',
          '',
          'The data controller for personal data collected on the mindzy.me website is Mindzy, whose contact details appear in Article 1 hereof.',
          '',
          '5.2 Data Collected',
          '',
          'When using the mindzy.me website, Mindzy may collect the following categories of data: last name, first name, email address, phone number, browsing data (IP address, browser type, pages visited).',
          '',
          '5.3 Purposes of Processing',
          '',
          'Personal data collected is used for the following purposes:',
          '• Responding to contact and quote requests',
          '• Managing customer relationships',
          '• Improving user experience and site navigation',
          '• Sending marketing communications (with prior consent)',
          '',
          '5.4 Data Retention Period',
          '',
          'Personal data is retained for a maximum of 3 years from the last contact with the user, unless a longer legal retention obligation applies.',
          '',
          '5.5 User Rights',
          '',
          'In accordance with the General Data Protection Regulation (GDPR), you have the following rights: right of access, rectification, erasure, restriction of processing, data portability and objection. To exercise these rights, you can contact us at: contact@mindzy.me.',
          '',
          '5.6 Cookies',
          '',
          'The mindzy.me website uses cookies to improve the browsing experience. You can configure your browser to refuse cookies. For more information, please refer to our cookie policy.',
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
          'Los sitios diseñados y gestionados por Mindzy están alojados en servidores ubicados en Europa, a través de las siguientes infraestructuras:',
          '',
          'Alojador principal:',
          'Razón social: Vercel Inc.',
          'Dirección: 340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos',
          'Sitio web: https://vercel.com',
          'Región de despliegue: Europa (París, Francia — cdg1)',
          '',
          'Alojador complementario:',
          'Razón social: Hostinger International Ltd.',
          'Dirección: 61 Lordou Vironos Street, 6023 Larnaca, Chipre',
          'Sitio web: https://www.hostinger.es',
          'Servidores: Unión Europea',
          '',
          'Los datos se procesan y almacenan de conformidad con el Reglamento General de Protección de Datos (RGPD).',
        ],
      },
      intellectualProperty: {
        title: '4. Propiedad intelectual',
        content: [
          'Todo el contenido del sitio mindzy.me (textos, imágenes, gráficos, logos, iconos, sonidos, software, etc.) es propiedad exclusiva de Mindzy o de sus socios y está protegido por las leyes francesas e internacionales relativas a la propiedad intelectual.',
          '',
          'Cualquier reproducción, representación, modificación, publicación, transmisión o desnaturalización, total o parcial, del sitio o de su contenido, por cualquier procedimiento que sea y en cualquier soporte que sea, está prohibida sin la autorización escrita previa de Mindzy.',
          '',
          'Cualquier explotación no autorizada del sitio o de su contenido constituiría una falsificación sancionada por los artículos L.335-2 y siguientes del Código de la propiedad intelectual.',
        ],
      },
      personalData: {
        title: '5. Datos personales y protección de la vida privada',
        content: [
          '5.1 Responsable del tratamiento',
          '',
          'El responsable del tratamiento de los datos personales recogidos en el sitio mindzy.me es Mindzy, cuyas coordenadas figuran en el artículo 1 de las presentes.',
          '',
          '5.2 Datos recogidos',
          '',
          'En el marco de la utilización del sitio mindzy.me, Mindzy es susceptible de recoger las siguientes categorías de datos: apellido, nombre, dirección electrónica, número de teléfono, datos de navegación (dirección IP, tipo de navegador, páginas consultadas).',
          '',
          '5.3 Finalidades del tratamiento',
          '',
          'Los datos personales recogidos se utilizan para las siguientes finalidades:',
          '• Responder a las solicitudes de contacto y presupuesto',
          '• Gestionar la relación con el cliente',
          '• Mejorar la experiencia del usuario y la navegación en el sitio',
          '• Enviar comunicaciones comerciales (con consentimiento previo)',
          '',
          '5.4 Duración de la conservación',
          '',
          'Los datos personales se conservan durante un período máximo de 3 años a partir del último contacto con el usuario, salvo obligación legal de conservación más larga.',
          '',
          '5.5 Derechos de los usuarios',
          '',
          'De conformidad con el Reglamento General de Protección de Datos (RGPD), usted dispone de los siguientes derechos: derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad de los datos y oposición. Para ejercer estos derechos, puede contactarnos en: contact@mindzy.me.',
          '',
          '5.6 Cookies',
          '',
          'El sitio mindzy.me utiliza cookies para mejorar la experiencia de navegación. Puede configurar su navegador para rechazar las cookies. Para más información, consulte nuestra política de cookies.',
        ],
      },
    },
  },
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  const t = getMessages(loc).legal.mentions
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
                  /^\d+\.\d+\s/.test(paragraph) ? (
                    <h3 key={index} className="text-lg font-semibold text-violet-700 mt-6 mb-2">{paragraph}</h3>
                  ) : (
                    <p key={index}>{paragraph}</p>
                  )
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
