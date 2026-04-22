import type { Metadata } from 'next'
import { ProfileCard } from '@/components/features/ProfileCard'

export const metadata: Metadata = {
  title: 'William Martel — Co-Founder @ Mindzy',
  description: 'Connectez-vous avec William Martel, co-fondateur de Mindzy.',
}

// ── Replace placeholders with real values ──────────────────────────────────
const LINKS = {
  whatsapp: 'https://wa.me/33XXXXXXXXXX',
  linkedin: 'https://linkedin.com/in/william-martel',
  wechat_id: 'william_martel',
}
// ──────────────────────────────────────────────────────────────────────────

export default function MartelPage() {
  return (
    <ProfileCard
      name="William Martel"
      role="Co-Founder"
      company="Mindzy"
      initials="WM"
      gradientFrom="#6D28D9"
      gradientTo="#8B5CF6"
      links={[
        { platform: 'whatsapp', label: 'WhatsApp', href: LINKS.whatsapp, icon: 'whatsapp', color: '#25D366' },
        { platform: 'linkedin', label: 'LinkedIn', href: LINKS.linkedin, icon: 'linkedin', color: '#0A66C2' },
        { platform: 'wechat', label: `WeChat: ${LINKS.wechat_id}`, href: `weixin://dl/chat?${LINKS.wechat_id}`, icon: 'wechat', color: '#07C160' },
      ]}
    />
  )
}
