import Image from 'next/image'
import { readdir, access } from 'node:fs/promises'
import path from 'node:path'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export async function TechnologiesPartners({ locale }: { locale: Locale }) {
  const content: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
    fr: {
      eyebrow: 'Nos partenaires',
      title: 'Ils nous font confiance',
      subtitle: 'Des outils et partenaires reconnus qui propulsent chacun de nos projets.',
    },
    en: {
      eyebrow: 'Our partners',
      title: 'They trust us',
      subtitle: 'Proven tools and partners that power every project we deliver.',
    },
    es: {
      eyebrow: 'Nuestros partners',
      title: 'Confían en nosotros',
      subtitle: 'Herramientas y partners reconocidos que impulsan cada proyecto que entregamos.',
    },
  }

  const t = content[locale]
  const logos = await getPartnerLogos()

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-violet-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sage-50/50 to-transparent" />
      </div>

      <div className="container-wide relative">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="eyebrow mb-4 block">{t.eyebrow}</span>
          <h2 className="heading-2 text-anthracite mb-4">{t.title}</h2>
          <p className="body-large text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <LogoCard key={`${logo.fileName}-${index}`} imageSrc={logo.src} imageAlt={logo.alt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoCard({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  return (
    <div
      className={cn(
        'group relative flex items-center justify-center flex-shrink-0',
        'w-32 md:w-40 lg:w-44 h-20 md:h-24 lg:h-28 mx-3 md:mx-4',
        'bg-gray-50/80 border border-gray-200/60 rounded-lg p-4 md:p-5',
        'transition-all duration-500 ease-out',
        'hover:bg-white hover:border-violet-300/40 hover:shadow-lg hover:shadow-violet-100/50',
        'hover:-translate-y-1'
      )}
    >
      <div className="relative w-full h-full opacity-80 transition-opacity duration-500 group-hover:opacity-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
          className="object-contain transition-all duration-500"
        />
      </div>
    </div>
  )
}

async function getPartnerLogos(): Promise<PartnerLogo[]> {
  const directoryPath = path.join(process.cwd(), 'public', 'images', 'logo')
  const entries = await readdir(directoryPath, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => isSupportedImageFile(fileName))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
      fileName,
      src: `/images/logo/${encodeURIComponent(fileName)}`,
      alt: humanizeLogoName(fileName),
    }))
}

async function findMindzyLogoSrc(): Promise<string | null> {
  const candidates = [
    'logo.svg',
    'logo.png',
    'logo.webp',
    'mindzy.svg',
    'mindzy.png',
    'mindzy.webp',
    'images/logo.svg',
    'images/logo.png',
    'images/logo.webp',
    'images/mindzy.svg',
    'images/mindzy.png',
    'images/mindzy.webp',
    'images/brand/logo.svg',
    'images/brand/logo.png',
    'images/brand/logo.webp',
  ]

  for (const candidate of candidates) {
    try {
      await access(path.join(process.cwd(), 'public', candidate))
      return `/${candidate.split('/').map(encodeURIComponent).join('/')}`
    } catch {}
  }

  return null
}

function isSupportedImageFile(fileName: string) {
  const lower = fileName.toLowerCase()
  return lower.endsWith('.png') || lower.endsWith('.webp') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.svg')
}

function stripExtensions(fileName: string) {
  let base = fileName
  while (true) {
    const ext = path.extname(base).toLowerCase()
    if (!ext) break
    if (!['.png', '.webp', '.jpg', '.jpeg', '.svg'].includes(ext)) break
    base = base.slice(0, -ext.length)
  }
  return base
}

function humanizeLogoName(fileName: string) {
  const base = stripExtensions(fileName)
  const cleaned = base
    .replace(/brandlogos\.net/gi, ' ')
    .replace(/\b(?:logo|logos?)\b/gi, ' ')
    .replace(/\b\d{4}\b/g, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return cleaned || 'Partner logo'
}

interface PartnerLogo {
  fileName: string
  src: string
  alt: string
}
