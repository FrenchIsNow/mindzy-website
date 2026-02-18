import type { Locale } from '@/lib/i18n'

const content = {
  fr: {
    badge: 'Le constat',
    title: 'Se rendre visible en ligne quand on est une TPE,',
    titleHighlight: 'ça relève du parcours du combattant.',
    subtitle:
      'Vous excellez dans votre métier, mais le numérique reste un terrain miné. La majorité des petites entreprises partagent exactement les mêmes frustrations.',
    mission: {
      title: 'Des prestataires traditionnels inadaptés à votre réalité',
      p1: 'Prix élevés, délais longs, suivi permanent — les agences et freelances généralistes ne comprennent pas les contraintes d\'une petite structure locale.',
      p2: 'Vous méritez mieux que d\'enchaîner les devis et les compromis sans résultat.',
    },
    painPoints: [
      {
        title: 'Le digital, un métier à part entière',
        desc: 'Référencement, publicité en ligne, réseaux sociaux, maintenance de site… Autant de compétences spécialisées qui ne s\'improvisent pas entre deux rendez-vous clients.',
      },
      {
        title: 'Multiplier les interlocuteurs, c\'est épuisant',
        desc: 'Un graphiste par-ci, un développeur par-là, un community manager ailleurs — la coordination devient vite un second emploi à temps plein.',
      },
    ],
    statsTitle: 'Les chiffres parlent d\'eux-mêmes',
    statsSubtitle: 'La réalité des petites entreprises face au numérique.',
    stats: [
      { value: '72%', label: 'des TPE jugent le digital complexe' },
      { value: '3,5h', label: 'perdues chaque semaine à coordonner' },
      { value: '67%', label: 'n\'ont aucune stratégie digitale' },
    ],
  },
  en: {
    badge: 'The reality',
    title: 'Getting visible online as a small business',
    titleHighlight: 'feels like an obstacle course.',
    subtitle:
      'You excel at your craft, but the digital world remains a minefield. Most small businesses share exactly the same frustrations.',
    mission: {
      title: 'Traditional providers out of touch with your reality',
      p1: 'Sky-high rates, endless timelines and exhausting follow-ups — generalist agencies and freelancers don\'t grasp the constraints of a small local business. You deserve support designed for your scale, not a copy-paste enterprise solution.',
      p2: 'The result: you pile up quotes, chase reminders and settle for compromises, never getting the quality or responsiveness your business demands.',
    },
    painPoints: [
      {
        title: 'Digital is a profession in its own right',
        desc: 'SEO, online ads, social media, site maintenance… These are specialized skills that can\'t be improvised between client appointments.',
      },
      {
        title: 'Juggling multiple providers is draining',
        desc: 'A designer here, a developer there, a community manager somewhere else — coordination quickly becomes a full-time job on its own.',
      },
    ],
    statsTitle: 'The numbers speak for themselves',
    statsSubtitle: 'The reality small businesses face with digital.',
    stats: [
      { value: '72%', label: 'of small businesses find digital complex' },
      { value: '3.5h', label: 'wasted every week coordinating' },
      { value: '67%', label: 'have no digital strategy at all' },
    ],
  },
  es: {
    badge: 'La realidad',
    title: 'Hacerse visible online siendo una pequeña empresa',
    titleHighlight: 'se siente como una carrera de obstáculos.',
    subtitle:
      'Destacas en tu oficio, pero el mundo digital sigue siendo un campo minado. La mayoría de las pequeñas empresas comparten exactamente las mismas frustraciones.',
    mission: {
      title: 'Proveedores tradicionales desconectados de tu realidad',
      p1: 'Precios desorbitados, plazos interminables y seguimiento agotador — las agencias y freelances generalistas no entienden las limitaciones de un pequeño negocio local. Mereces un acompañamiento pensado para tu escala, no una solución genérica de gran empresa.',
      p2: 'El resultado: acumulas presupuestos, persigues respuestas y te conformas con compromisos, sin obtener nunca la calidad ni la rapidez que tu negocio necesita.',
    },
    painPoints: [
      {
        title: 'Lo digital es una profesión en sí misma',
        desc: 'SEO, publicidad online, redes sociales, mantenimiento web… Son competencias especializadas que no se improvisan entre citas con clientes.',
      },
      {
        title: 'Coordinar múltiples proveedores es agotador',
        desc: 'Un diseñador aquí, un desarrollador allá, un community manager en otro lado — la coordinación se convierte rápidamente en un trabajo a tiempo completo.',
      },
    ],
    statsTitle: 'Las cifras hablan por sí solas',
    statsSubtitle: 'La realidad de las pequeñas empresas frente a lo digital.',
    stats: [
      { value: '72%', label: 'de pymes consideran el digital complejo' },
      { value: '3,5h', label: 'perdidas cada semana coordinando' },
      { value: '67%', label: 'no tienen estrategia digital' },
    ],
  },
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function PainPoints({ locale }: { locale: Locale }) {
  const t = content[locale]

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <p className="text-base/7 font-semibold text-violet">{t.badge}</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-anthracite sm:text-5xl font-display">
            {t.title}{' '}
            <span className="text-violet">{t.titleHighlight}</span>
          </h2>
          <p className="mt-6 text-xl/8 text-balance text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <div className="flex items-start gap-3 mb-4">
              <StarIcon />
              <h3 className="text-2xl font-semibold tracking-tight text-pretty text-anthracite font-display">
                {t.mission.title}
              </h3>
            </div>
            <p className="mt-6 text-base/7 text-gray-600 pl-8">
              {t.mission.p1}
            </p>
            <p className="mt-8 text-base/7 text-gray-600 pl-8">
              {t.mission.p2}
            </p>

            {t.painPoints.map((point, i) => (
              <div key={i} className="mt-10">
                <div className="flex items-start gap-3 mb-3">
                  <StarIcon />
                  <h3 className="text-lg font-semibold text-anthracite font-display">
                    {point.title}
                  </h3>
                </div>
                <p className="text-base/7 text-gray-600 pl-8">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 xl:gap-8">
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?&auto=format&fit=crop&crop=center&w=560&h=560&q=90"
                  className="block size-full object-cover"
                />
              </div>
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?&auto=format&fit=crop&crop=center&w=560&h=560&q=90"
                  className="block size-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?&auto=format&fit=crop&crop=center&w=560&h=560&q=90"
                  className="block size-full object-cover"
                />
              </div>
              <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-40">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?&auto=format&fit=crop&crop=center&w=560&h=560&q=90"
                  className="block size-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-anthracite sm:text-5xl font-display">
                {t.statsTitle}
              </h2>
              <p className="mt-4 text-lg/8 text-gray-600">
                {t.statsSubtitle}
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
              {t.stats.map((stat, i) => (
                <div key={i} className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm/6 font-semibold text-gray-600">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-anthracite font-display">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
