import type { Metadata } from 'next'
import { ProfileCard } from '@/components/features/ProfileCard'

export const metadata: Metadata = {
  title: 'Romuald Cocotier — Founder & AI Expert @ Mindzy',
  description: 'Connectez-vous avec Romuald Cocotier, fondateur de Mindzy et expert IA.',
}

// ── Replace placeholders with real values ──────────────────────────────────
const LINKS = {
  whatsapp: 'https://wa.me/33767546794',
  linkedin: 'https://www.linkedin.com/in/r-cocotier/',
  wechat_id: 'Mr_cocotier',
}
// ──────────────────────────────────────────────────────────────────────────

export default function CocotierPage() {
  return (
    <ProfileCard
      name="Romuald Cocotier"
      title="CEO & Co-Founder"
      subtitle="AI Expert"
      company="Mindzy"
      initials="RC"
      links={[
        { platform: 'whatsapp', label: 'WhatsApp', href: LINKS.whatsapp, icon: 'whatsapp', color: '#25D366' },
        { platform: 'linkedin', label: 'LinkedIn', href: LINKS.linkedin, icon: 'linkedin', color: '#0A66C2' },
        { platform: 'wechat', label: `WeChat`, href: `weixin://dl/chat?${LINKS.wechat_id}`, icon: 'wechat', color: '#07C160' },
      ]}
    />
  )
}
