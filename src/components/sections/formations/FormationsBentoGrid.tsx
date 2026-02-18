interface BentoItem {
  title: string
  subtitle: string
  description: string
}

interface FormationsBentoGridProps {
  badge: string
  title: string
  items: BentoItem[]
}

export function FormationsBentoGrid({ badge, title, items }: FormationsBentoGridProps) {
  return (
    <section className="bg-[#FAFAFF] py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-violet-600">{badge}</h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-[#1E1B4B] sm:text-5xl">
          {title}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <img
                alt=""
                src="/images/planification-strategie.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-violet-600">{items[0].subtitle}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1E1B4B]">{items[0].title}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">{items[0].description}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img
                alt=""
                src="/images/diffusion-planification.png"
                className="h-80 object-cover object-left lg:object-right"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-violet-600">{items[1].subtitle}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1E1B4B]">{items[1].title}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">{items[1].description}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-speed.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-violet-600">{items[2].subtitle}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1E1B4B]">{items[2].title}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">{items[2].description}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png"
                className="h-80 object-cover"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-violet-600">{items[3].subtitle}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1E1B4B]">{items[3].title}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">{items[3].description}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-network.png"
                className="h-80 object-cover"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-violet-600">{items[4].subtitle}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-[#1E1B4B]">{items[4].title}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">{items[4].description}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
