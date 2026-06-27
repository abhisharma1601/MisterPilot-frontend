import { useInView } from '../hooks/useInView'

const PATHS = [
  {
    icon: '🖥',
    title: 'VS Code Extension',
    subtitle: 'For developers who write code daily',
    steps: [
      { n: 1, text: 'Sign up at platform.misterpilot.online and top up ₹50 via UPI' },
      { n: 2, text: 'Generate an API key from the dashboard' },
      { n: 3, text: 'Install MisterPilot from the VS Code Marketplace' },
      { n: 4, text: 'Paste your API key in VS Code settings → MisterPilot' },
      { n: 5, text: 'Open the sidebar panel and ask your first question' },
    ],
    cta: { label: 'Install Extension', href: 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot' },
    accent: true,
  },
  {
    icon: '⚡',
    title: 'API / SDK',
    subtitle: 'For builders integrating DeepSeek into apps',
    steps: [
      { n: 1, text: 'Sign up at platform.misterpilot.online and top up your wallet' },
      { n: 2, text: 'Generate an API key' },
      { n: 3, text: 'pip install openai (already installed? skip this)' },
      { n: 4, text: 'Set base_url to engine.misterpilot.online/v1 in your client' },
      { n: 5, text: 'Start making requests — PII protection is automatic' },
    ],
    cta: { label: 'Get API Key', href: 'https://platform.misterpilot.online' },
    accent: false,
  },
]

export default function GetStarted() {
  const [headRef, headVisible] = useInView()

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div ref={headRef} className={`fade-up ${headVisible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="label" style={{ margin: '0 auto 16px' }}>🚀 Get Started</div>
          <h2 className="title">Ready in <em>5 minutes</em></h2>
          <p className="subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Pick your path. Both routes start with a free account — no credit card, no commitments.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: 64 }}>
          {PATHS.map((path, i) => {
            const [ref, vis] = useInView()
            return (
              <div
                key={path.title}
                ref={ref}
                className={`card fade-up ${vis ? 'visible' : ''} ${path.accent ? 'card-accent' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s`, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: '1.5rem' }}>{path.icon}</span>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 800 }}>{path.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{path.subtitle}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 24 }}>
                  {path.steps.map(s => (
                    <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        background: path.accent ? 'rgba(127,255,110,0.12)' : 'var(--surface-2)',
                        border: `1px solid ${path.accent ? 'rgba(127,255,110,0.25)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 800, color: path.accent ? 'var(--accent)' : 'var(--text-dim)',
                        fontFamily: 'var(--mono)', marginTop: 1,
                      }}>{s.n}</div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{s.text}</div>
                    </div>
                  ))}
                </div>

                <a href={path.cta.href} target="_blank" rel="noreferrer" className={`btn ${path.accent ? 'btn-primary' : 'btn-secondary'}`} style={{ alignSelf: 'flex-start' }}>
                  {path.cta.label} →
                </a>
              </div>
            )
          })}
        </div>

      <style>{`
        @media (max-width: 640px) {
          .grid-2 { gap: 12px; }
        }
      `}</style>

        {/* CTA banner */}
        {(() => {
          const [ref, vis] = useInView()
          return (
            <div ref={ref} className={`fade-up ${vis ? 'visible' : ''}`} style={{
              textAlign: 'center', padding: '56px 32px',
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(127,255,110,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div className="label" style={{ margin: '0 auto 16px' }}>No lock-in. Ever.</div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
                State-of-the-art coding intelligence<br />
                <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>at a fraction of the cost</em>
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
                No GitHub Copilot subscription. No Cursor seats. Just pay for tokens and build.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://platform.misterpilot.online" target="_blank" rel="noreferrer" className="btn btn-primary">Create free account</a>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
