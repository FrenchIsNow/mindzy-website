import type { Metadata } from 'next'
import { ProfileCard } from '@/components/features/ProfileCard'

export const metadata: Metadata = {
  title: 'William Martel — Co-Founder @ Mindzy',
  description: 'Connectez-vous avec William Martel, co-fondateur de Mindzy.',
}

// ── Replace placeholders with real values ──────────────────────────────────
const LINKS = {
  whatsapp: 'https://wa.me/33682765387',
  linkedin: 'https://www.linkedin.com/in/williamartel/',
  wechat_id: 'Mr_Denze',
}
// ──────────────────────────────────────────────────────────────────────────

export default function MartelPage() {
  return (
    <ProfileCard
      name="William Martel"
      title="CFO & Co-Founder"
      subtitle="Fund Advisor"
      company="Mindzy"
      initials="WM"
      links={[
        { platform: 'whatsapp', label: 'WhatsApp', href: LINKS.whatsapp, icon: 'whatsapp', color: '#25D366' },
        { platform: 'linkedin', label: 'LinkedIn', href: LINKS.linkedin, icon: 'linkedin', color: '#0A66C2' },
        { platform: 'wechat', label: `WeChat: ${LINKS.wechat_id}`, href: `weixin://dl/chat?${LINKS.wechat_id}`, icon: 'wechat', color: '#07C160' },
      ]}
    />
  )
}
