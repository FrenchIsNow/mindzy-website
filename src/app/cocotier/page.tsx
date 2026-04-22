import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { ProfileCard } from '@/components/features/ProfileCard'

export const metadata: Metadata = {
  title: 'Romuald Cocotier — Founder & AI Expert @ Mindzy',
  description: 'Connectez-vous avec Romuald Cocotier, fondateur de Mindzy et expert IA.',
}

const PAGE_URL = 'https://mindzy.me/cocotier'

// ── Replace placeholders with real values ──────────────────────────────────
const LINKS = {
  whatsapp: 'https://wa.me/33XXXXXXXXXX',       // e.g. https://wa.me/33612345678
  linkedin: 'https://linkedin.com/in/romuald-cocotier',
  wechat_id: 'romuald_cocotier',                 // WeChat ID shown as text + deep link
}
// ──────────────────────────────────────────────────────────────────────────

export default async function CocotierPage() {
  const qrSvg = await QRCode.toString(PAGE_URL, {
    type: 'svg',
    width: 220,
    margin: 1,
    color: { dark: '#1a0533', light: '#f5f0ff' },
  })

  return (
    <ProfileCard
      name="Romuald Cocotier"
      role="Founder & AI Expert"
      company="Mindzy"
      initials="RC"
      gradientFrom="#7C3AED"
      gradientTo="#4F46E5"
      links={[
        {
          platform: 'whatsapp',
          label: 'WhatsApp',
          href: LINKS.whatsapp,
          icon: 'whatsapp',
          color: '#25D366',
        },
        {
          platform: 'linkedin',
          label: 'LinkedIn',
          href: LINKS.linkedin,
          icon: 'linkedin',
          color: '#0A66C2',
        },
        {
          platform: 'wechat',
          label: `WeChat: ${LINKS.wechat_id}`,
          href: `weixin://dl/chat?${LINKS.wechat_id}`,
          icon: 'wechat',
          color: '#07C160',
        },
      ]}
      qrSvg={qrSvg}
      pageUrl={PAGE_URL}
    />
  )
}
