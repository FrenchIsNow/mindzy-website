import type { Locale } from '@/lib/i18n'

export function FormationsHero({ locale }: { locale: Locale }) {
  const content = {
    fr: {
      badge: 'Formations Mindzy',
      titleStart: 'Formations ',
      titleHighlight: 'stratégiques',
      subtitle:
        'Des formations stratégiques conçues pour transformer l\'acquisition, la performance marketing et l\'intégration de l\'intelligence artificielle en véritables leviers business.',
      extra:
        'Chaque module peut être suivi indépendamment ou combiné dans un programme complet.',
    },
    en: {
      badge: 'Mindzy Training',
      titleStart: 'Strategic ',
      titleHighlight: 'training programs',
      subtitle:
        'Strategic training programs designed to transform acquisition, marketing performance and AI integration into real business levers.',
      extra:
        'Each module can be taken independently or combined into a complete program.',
    },
    es: {
      badge: 'Formaciones Mindzy',
      titleStart: 'Formaciones ',
      titleHighlight: 'estratégicas',
      subtitle:
        'Formaciones estratégicas diseñadas para transformar la adquisición, el rendimiento del marketing y la integración de la inteligencia artificial en verdaderas palancas de negocio.',
      extra:
        'Cada módulo puede seguirse de forma independiente o combinarse en un programa completo.',
    },
  }

  const t = content[locale]

  return (
    <section
      className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0ECFF 0%, #E8F0FF 50%, #F5ECFF 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-20 -left-20 w-[450px] h-[450px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(167,139,250,0.25)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(147,197,253,0.2)', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-3xl animate-blob"
        style={{ background: 'rgba(253,164,175,0.15)', animationDelay: '4s' }}
      />

      <div className="container-narrow relative">
        <div className="text-center">
          {/* Eyebrow */}
          <span className="text-violet-500 text-xs font-medium uppercase tracking-widest mb-4 block">
            {t.badge}
          </span>

          {/* Main heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-[#1E1B4B] mb-6">
            {t.titleStart}
            <span className="text-violet-600">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl leading-relaxed max-w-2xl mx-auto text-gray-500 mb-6">
            {t.subtitle}
          </p>

          {/* Extra info in frosted pill */}
          <span className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-full px-5 py-2 text-sm text-gray-500 mt-6 inline-block">
            {t.extra}
          </span>
        </div>
      </div>
    </section>
  )
}
