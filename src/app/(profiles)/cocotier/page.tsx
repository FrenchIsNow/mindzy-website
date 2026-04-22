import type { Metadata } from 'next'
import { ProfileCard } from '@/components/features/ProfileCard'

export const metadata: Metadata = {
  title: 'Romuald Cocotier — Founder & AI Expert @ Mindzy',
  description: 'Connectez-vous avec Romuald Cocotier, fondateur de Mindzy et expert IA.',
}

// ── Replace placeholders with real values ──────────────────────────────────
const LINKS = {
  whatsapp: 'https://wa.me/33XXXXXXXXXX',
  linkedin: 'https://linkedin.com/in/romuald-cocotier',
  wechat_id: 'romuald_cocotier',
}
// ──────────────────────────────────────────────────────────────────────────

export default function CocotierPage() {
  return (
    <ProfileCard
      name="Romuald Cocotier"
      role="Founder & AI Expert"
      company="Mindzy"
      initials="RC"
      gradientFrom="#7C3AED"
      gradientTo="#4F46E5"
      links={[
        { platform: 'whatsapp', label: 'WhatsApp', href: LINKS.whatsapp, icon: 'whatsapp', color: '#25D366' },
        { platform: 'linkedin', label: 'LinkedIn', href: LINKS.linkedin, icon: 'linkedin', color: '#0A66C2' },
        { platform: 'wechat', label: `WeChat: ${LINKS.wechat_id}`, href: `weixin://dl/chat?${LINKS.wechat_id}`, icon: 'wechat', color: '#07C160' },
      ]}
    />
  )
}
