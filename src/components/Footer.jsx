const LINKS = {
  Product: [
    { label: 'VS Code Extension', href: 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot', external: true },
    { label: 'API Engine', href: '#api' },
    { label: 'API Playground', href: 'https://engine.misterpilot.online/playground', external: true },
    { label: 'Platform Dashboard', href: 'https://platform.misterpilot.online', external: true },
  ],
  Developers: [
    { label: 'Documentation', href: 'https://platform.misterpilot.online/docs', external: true },
    { label: 'API Reference', href: 'https://platform.misterpilot.online/docs', external: true },
    { label: 'MCP Guide', href: '#mcp' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'Support', href: 'mailto:chiefmr12@gmail.com' },
    { label: 'GitHub', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '64px 32px 40px' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <img src="/icon.png" alt="MisterPilot" style={{ width: 28, height: 28, borderRadius: 7, display: 'block' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Mister<span style={{ color: 'var(--accent)' }}>Pilot</span></span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
              AI coding assistant built for developers. OpenAI-compatible API, VS Code extension, and pay-as-you-go pricing.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['OpenAI-Compatible', 'DeepSeek Powered', 'Privacy-First'].map(tag => (
                <span key={tag} style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-dim)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.04em' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 16 }}>{section}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                    style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>© 2026 MisterPilot. Built for developers, by developers.</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <code style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-dim)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 5 }}>
              engine.misterpilot.online/v1
            </code>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
