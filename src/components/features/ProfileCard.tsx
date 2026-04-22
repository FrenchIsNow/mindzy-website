import Link from 'next/link'

type LinkItem = {
  platform: string
  label: string
  href: string
  icon: 'whatsapp' | 'linkedin' | 'wechat'
  color: string
}

interface ProfileCardProps {
  name: string
  role: string
  company: string
  initials: string
  gradientFrom: string
  gradientTo: string
  links: LinkItem[]
  qrSvg: string
  pageUrl: string
}

function PlatformIcon({ icon }: { icon: LinkItem['icon'] }) {
  if (icon === 'whatsapp') return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
  if (icon === 'linkedin') return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
  // wechat
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.186-.065l1.755-1.025a.868.868 0 01.421-.111c.113 0 .226.017.334.048a6.37 6.37 0 001.928.3c.23 0 .455-.014.678-.039-.229-.661-.351-1.362-.351-2.09 0-3.747 3.56-6.787 7.952-6.787.276 0 .548.017.815.048C15.636 4.685 12.432 2.188 8.69 2.188zm-2.49 3.309c.546 0 .99.444.99.99a.99.99 0 01-.99.99.99.99 0 01-.99-.99c0-.546.443-.99.99-.99zm4.962 0c.547 0 .99.444.99.99a.99.99 0 01-.99.99.99.99 0 01-.99-.99c0-.546.444-.99.99-.99zM15.07 9.178c-3.735 0-6.762 2.666-6.762 5.954 0 3.286 3.027 5.952 6.762 5.952.724 0 1.42-.1 2.072-.282a.768.768 0 01.368.043l1.496.875a.28.28 0 00.158.054.252.252 0 00.25-.252c0-.062-.025-.12-.04-.181l-.334-1.262a.508.508 0 01.183-.568C20.573 18.42 21.83 16.78 21.83 14.9c-.001-3.288-3.028-5.722-6.76-5.722zm-2.34 2.872c.468 0 .846.38.846.846a.846.846 0 01-.846.846.847.847 0 01-.847-.846c0-.467.38-.846.847-.846zm4.666 0c.467 0 .846.38.846.846a.846.846 0 01-.846.846.847.847 0 01-.847-.846c0-.467.38-.846.847-.846z"/>
    </svg>
  )
}

export function ProfileCard({
  name, role, company, initials, gradientFrom, gradientTo, links, qrSvg, pageUrl,
}: ProfileCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%)' }}>

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: gradientFrom }} />
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: gradientTo }} />
      </div>

      <div className="relative w-full max-w-sm mx-auto flex flex-col gap-4">

        {/* Header card */}
        <div className="rounded-3xl overflow-hidden text-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          {/* Gradient strip */}
          <div className="h-20" style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }} />
          {/* Avatar */}
          <div className="-mt-10 flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-2xl ring-4 ring-[#0f0f1a]"
              style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}>
              {initials}
            </div>
          </div>
          <div className="px-6 pb-6">
            <h1 className="text-xl font-bold text-white mb-1">{name}</h1>
            <p className="text-sm font-medium" style={{ color: gradientFrom }}>{role}</p>
            <p className="text-xs text-gray-400 mt-0.5">{company}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 rounded-2xl font-medium text-sm text-white transition-all duration-200 active:scale-95 hover:opacity-90"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white"
                style={{ background: link.color }}>
                <PlatformIcon icon={link.icon} />
              </span>
              <span className="flex-1 text-left">{link.label}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* QR Code card */}
        <div className="rounded-3xl p-6 text-center flex flex-col items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">Scanner pour partager</p>
          <div
            className="w-[180px] h-[180px] rounded-2xl overflow-hidden p-2"
            style={{ background: '#f5f0ff' }}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
          <p className="text-[11px] text-gray-500 break-all">{pageUrl}</p>
        </div>

        {/* Mindzy branding */}
        <div className="text-center pt-2">
          <Link href="https://mindzy.me" target="_blank" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <span>Propulsé par</span>
            <span className="font-semibold text-gray-300">Mindzy</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
