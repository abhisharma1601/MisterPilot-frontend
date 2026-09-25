import Reveal, { SectionHead } from './Reveal'

const MARKETPLACE = 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot'

const PATHS = [
  {
    icon: '🖥',
    title: 'VS Code Extension',
    subtitle: 'For developers who write code daily',
    steps: [
      { n: 1, text: 'Install MisterPilot from the VS Code Marketplace' },
      { n: 2, text: 'Sign in and top up ₹99 via UPI — or add your own OpenAI, Claude or DeepSeek keys' },
      { n: 3, text: 'Open the MisterPilot sidebar' },
      { n: 4, text: 'Leave the model on Auto' },
      { n: 5, text: 'Ask your first question — Auto picks the right model' },
    ],
    cta: { label: 'Install Extension', href: MARKETPLACE },
    accent: true,
  },
  {
    icon: '⚡',
    title: 'API / SDK',
    subtitle: 'For builders integrating AI into their apps',
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
  return (
    <section className="section" id="get-started" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          center
          label="🚀 Get Started"
          title={<>Ready in <em>2 minutes</em></>}
          subtitle="Pick your path. Both start with a free account — no credit card, no commitments."
        />

        <div className="grid-2" style={{ marginBottom: 64 }}>
          {PATHS.map((path, i) => (
            <Reveal
              key={path.title}
              delay={i * 0.12}
              className={`card ${path.accent ? 'card-accent' : ''}`}
              style={{ display: 'flex', flexDirection: 'column' }}
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
            </Reveal>
          ))}
        </div>

        {/* Final CTA */}
        <Reveal className="final-cta" style={{
          textAlign: 'center', padding: '72px 32px',
          background: 'var(--surface)', border: '1px solid var(--accent-border)', borderRadius: 20,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)', width: 560, height: 360, background: 'radial-gradient(ellipse, rgba(127,255,110,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="label" style={{ margin: '0 auto 18px', position: 'relative' }}>One extension. Every major AI provider.</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 14, position: 'relative' }}>
            Stop choosing models.<br />
            <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Start building.</em>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>
            The best model for every task, automatically — without a Copilot subscription or Cursor seat.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href={MARKETPLACE} target="_blank" rel="noreferrer" className="btn btn-primary">Install free for VS Code</a>
            <a href="https://platform.misterpilot.online" target="_blank" rel="noreferrer" className="btn btn-secondary">Create free account</a>
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: 18, position: 'relative' }}>
            ₹0/month · Top up from ₹99 · Or bring your own keys
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .grid-2 { gap: 12px; }
          .final-cta { padding: 48px 18px !important; }
        }
      `}</style>
    </section>
  )
}
