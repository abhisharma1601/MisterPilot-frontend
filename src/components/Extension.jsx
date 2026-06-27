import { useInView } from '../hooks/useInView'

const FEATURES = [
  { icon: '💬', title: 'Codebase-aware chat', desc: 'The AI reads your entire workspace — ask questions, get explanations, request changes with full project context.' },
  { icon: '✅', title: 'Diff review before writes', desc: 'Every file edit shows as a diff card. You approve or reject every change before anything touches your disk.' },
  { icon: '🔍', title: 'Workspace search', desc: 'Powered by ripgrep — the AI can find any symbol, function, or pattern across your entire project instantly.' },
  { icon: '⌨️', title: 'Terminal execution', desc: 'Run shell commands, install packages, and start servers directly from the chat — no context switching needed.' },
  { icon: '🔒', title: 'PII filtering', desc: 'Emails, phone numbers, and sensitive data are automatically stripped server-side — processed in RAM, never stored.' },
  { icon: '🔌', title: 'MCP integrations', desc: 'Connect to GitHub, Playwright, PostgreSQL, or any MCP server. The AI gains access to external tools automatically.' },
]

const STEPS = [
  { num: '01', title: 'Install the extension', desc: 'Search "MisterPilot" in the VS Code Marketplace or use the link below. One click install.' },
  { num: '02', title: 'Add your API key', desc: 'Open VS Code settings → search "MisterPilot" → paste your API key from platform.misterpilot.online.' },
  { num: '03', title: 'Open the sidebar', desc: 'Click the MisterPilot icon in the activity bar. Ask anything about your code and start building.' },
]

export default function Extension() {
  const [headRef, headVisible] = useInView()
  const [stepsRef, stepsVisible] = useInView()

  return (
    <section className="section" id="extension" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">

        {/* Header */}
        <div ref={headRef} className={`fade-up ${headVisible ? 'visible' : ''}`} style={{ marginBottom: 56 }}>
          <div className="label">🖥 VS Code Extension</div>
          <h2 className="title">Your AI pair programmer,<br /><em>inside VS Code</em></h2>
          <p className="subtitle">
            Not a pop-up. Not a tab switch. MisterPilot lives in your sidebar, understands your codebase,
            and waits for you to ask — no configuration, no context pasting.
          </p>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
            target="_blank" rel="noreferrer"
            className="btn btn-primary"
          >
            Install on VS Code
          </a>
        </div>

        {/* Feature grid */}
        <div className="grid-3" style={{ marginBottom: 80 }}>
          {FEATURES.map((f, i) => {
            const [ref, vis] = useInView()
            return (
              <div key={f.title} ref={ref} className={`card fade-up ${vis ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="card-icon">{f.icon}</span>
                <div className="card-title">{f.title}</div>
                <div className="card-text">{f.desc}</div>
              </div>
            )
          })}
        </div>

        {/* Setup steps */}
        <div ref={stepsRef} className={`fade-up ${stepsVisible ? 'visible' : ''}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ margin: '0 auto 14px' }}>Setup in 3 steps</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Up and running in under 2 minutes</h3>
          </div>
          <div className="grid-3">
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, margin: '0 auto 16px',
                  background: 'rgba(127,255,110,0.1)', border: '1px solid rgba(127,255,110,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--mono)',
                }}>{s.num}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: '0.95rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</div>
                {i < STEPS.length - 1 && (
                  <div style={{ display: 'none' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
