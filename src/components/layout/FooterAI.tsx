export function FooterAI() {
  return (
    <footer
      style={{
        background: 'var(--ai-bg-3)',
        borderTop: '1px solid var(--ai-border)',
        paddingTop: '80px',
        paddingBottom: '48px',
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-8">
        {/* 3-col grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12"
          style={{ borderBottom: '1px solid var(--ai-border)' }}
        >
          {/* Col 1: Brand */}
          <div>
            {/* Mindzy logo + name */}
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
              Mindzy designs and builds custom AI infrastructures, from scratch, around any company that wants to integrate AI into its operations.
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
              Site
            </h5>
            <ul className="grid gap-2.5">
              {[
                ['/', 'Home'],
                ['/en/process', 'Process'],
                ['/en/portfolio', 'Portfolio'],
                ['/en/about', 'About'],
                ['/en/blog', 'Blog'],
                ['/en/faq', 'FAQ'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href as string}
                    style={{
                      color: 'var(--ai-fg-muted)',
                      fontSize: '14px',
                    }}
                    className="hover:text-[var(--ai-fg)] transition-colors"
                  >
                    {label as string}
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
              Contact
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
          <span>© 2026 Mindzy. All rights reserved.</span>
          <span className="flex gap-4">
            <a
              href="#"
              className="hover:text-[var(--ai-fg)] transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="hover:text-[var(--ai-fg)] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-[var(--ai-fg)] transition-colors"
            >
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default FooterAI
