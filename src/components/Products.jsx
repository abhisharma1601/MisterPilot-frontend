import { useInView } from '../hooks/useInView'

const PRODUCTS = [
  {
    icon: '⚡',
    label: 'API Engine',
    title: 'OpenAI-compatible API',
    desc: 'Point any OpenAI SDK at our endpoint. Change base_url and API key — that\'s it. Backed by DeepSeek with built-in PII filtering.',
    href: '#api',
    tag: 'engine.misterpilot.online/v1',
    accent: true,
  },
  {
    icon: '🖥',
    label: 'VS Code Extension',
    title: 'AI assistant in your editor',
    desc: 'Full codebase comprehension, diff review before any write, workspace-wide search, and terminal execution — all from the sidebar.',
    href: '#extension',
    tag: 'Marketplace',
  },
  {
    icon: '📊',
    label: 'Platform Dashboard',
    title: 'Pay-as-you-go billing',
    desc: 'Top up with ₹50 minimum via UPI. Track usage, manage API keys, and view per-request costs — no credit card, no expiry.',
    href: 'https://platform.misterpilot.online',
    tag: 'platform.misterpilot.online',
    external: true,
  },
]

export default function Products() {
  const [ref, visible] = useInView()

  return (
    <section className="section section-sm" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div ref={ref} className={`fade-up ${visible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label" style={{ margin: '0 auto 16px' }}>What we offer</div>
          <h2 className="title">Three surfaces, <em>one platform</em></h2>
          <p className="subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Everything you need to build with AI — from a chat interface in your editor to a scalable API for your product.
          </p>
        </div>

        <div className="grid-3">
          {PRODUCTS.map((p, i) => {
            const [cardRef, cardVisible] = useInView()
            return (
              <a
                key={p.label}
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noreferrer' : undefined}
                ref={cardRef}
                className={`card fade-up ${cardVisible ? 'visible' : ''} ${p.accent ? 'card-accent' : ''}`}
                style={{
                  textDecoration: 'none', display: 'flex', flexDirection: 'column',
                  transitionDelay: `${i * 0.1}s`,
                  cursor: 'pointer',
                }}
              >
                <span className="card-icon">{p.icon}</span>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: p.accent ? 'var(--accent)' : 'var(--text-dim)', marginBottom: 8 }}>{p.label}</div>
                <div className="card-title" style={{ fontSize: '1.05rem', marginBottom: 10 }}>{p.title}</div>
                <div className="card-text" style={{ flex: 1 }}>{p.desc}</div>
                <div style={{ marginTop: 20, fontSize: '0.75rem', fontFamily: 'var(--mono)', color: p.accent ? 'var(--accent)' : 'var(--text-dim)', background: p.accent ? 'var(--accent-dim)' : 'var(--surface-2)', border: `1px solid ${p.accent ? 'var(--accent-border)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px', display: 'inline-block' }}>
                  {p.tag}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
