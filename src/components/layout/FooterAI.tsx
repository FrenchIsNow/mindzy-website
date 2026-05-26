'use client'

import { usePathname } from 'next/navigation'

const TRANSLATIONS = {
  en: {
    desc: 'Mindzy designs and builds custom AI infrastructures, from scratch, around any company that wants to integrate AI into its operations.',
    siteCol: 'Site',
    links: [
      { href: '/', label: 'Home' },
      { href: '/process', label: 'Process' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/ai-employee', label: 'AI Employee' },
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Contact',
    copyright: '© 2026 Mindzy. All rights reserved.',
    legal: ['Legal Notice', 'Privacy', 'Terms'],
  },
  fr: {
    desc: 'Mindzy conçoit et construit des infrastructures IA sur mesure, de zéro, autour de toute entreprise souhaitant intégrer l\'IA dans ses opérations.',
    siteCol: 'Site',
    links: [
      { href: '/', label: 'Accueil' },
      { href: '/process', label: 'Processus' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/ai-employee', label: 'AI Employee' },
      { href: '/about', label: 'À propos' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Contact',
    copyright: '© 2026 Mindzy. Tous droits réservés.',
    legal: ['Mentions légales', 'Confidentialité', 'CGU'],
  },
  es: {
    desc: 'Mindzy diseña y construye infraestructuras de IA personalizadas, desde cero, para cualquier empresa que desee integrar la IA en sus operaciones.',
    siteCol: 'Site',
    links: [
      { href: '/', label: 'Inicio' },
      { href: '/process', label: 'Proceso' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/ai-employee', label: 'AI Employee' },
      { href: '/about', label: 'Sobre nosotros' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Contacto',
    copyright: '© 2026 Mindzy. Todos los derechos reservados.',
    legal: ['Aviso legal', 'Privacidad', 'Términos'],
  },
  de: {
    desc: 'Mindzy entwirft und baut maßgeschneiderte KI-Infrastrukturen von Grund auf für jedes Unternehmen, das KI in seine Abläufe integrieren möchte.',
    siteCol: 'Site',
    links: [
      { href: '/', label: 'Startseite' },
      { href: '/process', label: 'Prozess' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/ai-employee', label: 'AI Employee' },
      { href: '/about', label: 'Über uns' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Kontakt',
    copyright: '© 2026 Mindzy. Alle Rechte vorbehalten.',
    legal: ['Impressum', 'Datenschutz', 'AGB'],
  },
  it: {
    desc: 'Mindzy progetta e costruisce infrastrutture AI personalizzate, da zero, per qualsiasi azienda che voglia integrare l\'AI nelle proprie operazioni.',
    siteCol: 'Site',
    links: [
      { href: '/', label: 'Home' },
      { href: '/process', label: 'Processo' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/ai-employee', label: 'AI Employee' },
      { href: '/about', label: 'Chi siamo' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Contatto',
    copyright: '© 2026 Mindzy. Tutti i diritti riservati.',
    legal: ['Note legali', 'Privacy', 'Termini'],
  },
  pt: {
    desc: 'Mindzy projeta e constrói infraestruturas de IA personalizadas, do zero, para qualquer empresa que deseje integrar a IA em suas operações.',
    siteCol: 'Site',
    links: [
      { href: '/', label: 'Início' },
      { href: '/process', label: 'Processo' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/ai-employee', label: 'AI Employee' },
      { href: '/about', label: 'Sobre nós' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Contato',
    copyright: '© 2026 Mindzy. Todos os direitos reservados.',
    legal: ['Aviso legal', 'Privacidade', 'Termos'],
  },
  ar: {
    desc: 'تصمم Mindzy وتبني بنى تحتية للذكاء الاصطناعي مخصصة، من الصفر، حول أي شركة تريد دمج الذكاء الاصطناعي في عملياتها.',
    siteCol: 'الموقع',
    links: [
      { href: '/', label: 'الرئيسية' },
      { href: '/process', label: 'العملية' },
      { href: '/portfolio', label: 'المشاريع' },
      { href: '/ai-employee', label: 'موظف الذكاء الاصطناعي' },
      { href: '/about', label: 'من نحن' },
      { href: '/blog', label: 'المدونة' },
      { href: '/faq', label: 'الأسئلة الشائعة' },
    ],
    contactCol: 'تواصل معنا',
    copyright: '© 2026 Mindzy. جميع الحقوق محفوظة.',
    legal: ['إشعار قانوني', 'الخصوصية', 'الشروط'],
  },
  zh: {
    desc: 'Mindzy 从零开始为任何希望将 AI 融入运营的企业设计并构建定制 AI 基础设施。',
    siteCol: '导航',
    links: [
      { href: '/', label: '首页' },
      { href: '/process', label: '流程' },
      { href: '/portfolio', label: '作品集' },
      { href: '/ai-employee', label: 'AI 员工' },
      { href: '/about', label: '关于我们' },
      { href: '/blog', label: '博客' },
      { href: '/faq', label: '常见问题' },
    ],
    contactCol: '联系我们',
    copyright: '© 2026 Mindzy. 版权所有。',
    legal: ['法律声明', '隐私政策', '条款'],
  },
  ja: {
    desc: 'Mindzy は、AI を業務に統合したいあらゆる企業のために、ゼロからカスタム AI インフラを設計・構築します。',
    siteCol: 'サイト',
    links: [
      { href: '/', label: 'ホーム' },
      { href: '/process', label: 'プロセス' },
      { href: '/portfolio', label: 'ポートフォリオ' },
      { href: '/ai-employee', label: 'AI従業員' },
      { href: '/about', label: '会社概要' },
      { href: '/blog', label: 'ブログ' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'お問い合わせ',
    copyright: '© 2026 Mindzy. 無断複製・転載を禁じます。',
    legal: ['法的通知', 'プライバシー', '利用規約'],
  },
  ru: {
    desc: 'Mindzy проектирует и создаёт индивидуальные AI-инфраструктуры с нуля для любой компании, желающей интегрировать AI в свои операции.',
    siteCol: 'Сайт',
    links: [
      { href: '/', label: 'Главная' },
      { href: '/process', label: 'Процесс' },
      { href: '/portfolio', label: 'Портфолио' },
      { href: '/ai-employee', label: 'AI-сотрудник' },
      { href: '/about', label: 'О нас' },
      { href: '/blog', label: 'Блог' },
      { href: '/faq', label: 'FAQ' },
    ],
    contactCol: 'Контакты',
    copyright: '© 2026 Mindzy. Все права защищены.',
    legal: ['Правовая информация', 'Конфиденциальность', 'Условия'],
  },
}

export function FooterAI() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] ?? 'en'
  const t = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en

  return (
    <footer
      style={{
        background: 'var(--ai-bg-3)',
        borderTop: '1px solid var(--ai-border)',
        paddingTop: '80px',
        paddingBottom: '48px',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8">
        {/* 3-col grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12"
          style={{ borderBottom: '1px solid var(--ai-border)' }}
        >
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg
                viewBox="0 0 1008 874"
                width="32"
                height="32"
                style={{ color: 'var(--ai-accent)' }}
              >
                <g fill="currentColor">
                  <path d="M505 0 L0 870 L653 260 Z" />
                  <path d="M683 311 L548 440 L1008 872 L747 421 L706 345 Z" />
                  <path d="M503 481 L644 615 L113 874 L79 874 Z" />
                </g>
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-serif-ai)',
                  fontSize: '21px',
                  color: 'var(--ai-fg)',
                }}
              >
                Mindzy
              </span>
            </div>
            <p
              style={{
                color: 'var(--ai-fg-muted)',
                fontSize: '14px',
                lineHeight: 1.65,
                maxWidth: '32ch',
              }}
            >
              {t.desc}
            </p>
          </div>

          {/* Col 2: Site links */}
          <div>
            <h5
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ai-fg-soft)',
                marginBottom: '16px',
                fontWeight: 500,
              }}
            >
              {t.siteCol}
            </h5>
            <ul className="grid gap-2.5">
              {t.links.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href === '/' ? `/${locale}` : `/${locale}${href}`}
                    style={{
                      color: 'var(--ai-fg-muted)',
                      fontSize: '14px',
                    }}
                    className="hover:text-[var(--ai-fg)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h5
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ai-fg-soft)',
                marginBottom: '16px',
                fontWeight: 500,
              }}
            >
              {t.contactCol}
            </h5>
            <ul className="grid gap-2.5 text-sm" style={{ color: 'var(--ai-fg-muted)' }}>
              <li>
                <a
                  href="mailto:contact@mindzy.me"
                  className="hover:text-[var(--ai-accent)] transition-colors"
                >
                  contact@mindzy.me
                </a>
              </li>
              <li>
                <span>EU · Asia · USA</span>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/mindzy/"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-[var(--ai-accent)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between gap-3 pt-6 text-xs"
          style={{ color: 'var(--ai-fg-soft)' }}
        >
          <span>{t.copyright}</span>
          <span className="flex gap-4">
            <a href={`/${locale}/legal/mentions`} className="hover:text-[var(--ai-fg)] transition-colors">
              {t.legal[0]}
            </a>
            <a href="#" className="hover:text-[var(--ai-fg)] transition-colors">
              {t.legal[1]}
            </a>
            <a href="#" className="hover:text-[var(--ai-fg)] transition-colors">
              {t.legal[2]}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default FooterAI
