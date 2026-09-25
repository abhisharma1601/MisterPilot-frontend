import { useEffect, useState } from 'react'

const MARKETPLACE = 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot'

const REQUESTS = [
  { prompt: 'What does this regex actually match?', task: 'Quick question', complexity: 'Low', context: '1.2K', tier: 0 },
  { prompt: 'Add refresh-token rotation to the auth service', task: 'Feature build', complexity: 'Medium', context: '48K', tier: 1 },
  { prompt: 'Plan a migration of this monolith to event-driven services', task: 'Architecture', complexity: 'High', context: '612K', tier: 2 },
]

const TIERS = [
  { name: 'Fast model', meta: 'Lowest latency · lowest cost', example: 'e.g. DeepSeek Flash' },
  { name: 'Reasoning model', meta: 'Multi-step coding & debugging', example: 'e.g. DeepSeek Pro' },
  { name: 'Frontier model', meta: 'Maximum capability', example: 'e.g. Claude · GPT' },
]

// 3 phases per request: prompt → analyzing → routed
function useRouterCycle() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % (REQUESTS.length * 3)), 1300)
    return () => clearInterval(t)
  }, [])
  return { req: REQUESTS[Math.floor(step / 3)], phase: step % 3 }
}

function AutoRouterDemo() {
  const { req, phase } = useRouterCycle()
  const analyzing = phase >= 1
  const routed = phase === 2

  return (
    <div className="code-block router-demo" aria-label="MisterPilot Auto routing a request to the best model">
      <div className="code-block-bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        <span className="code-file">MisterPilot · Auto</span>
        <span className="chip chip-accent" style={{ marginLeft: 'auto', fontSize: '0.65rem', padding: '2px 8px' }}>● live</span>
      </div>

      <div style={{ padding: 22 }}>
        {/* Prompt */}
        <div className="eyebrow" style={{ marginBottom: 8 }}>Your request</div>
        <div key={req.prompt} className="router-prompt">
          <span style={{ color: 'var(--accent)', marginRight: 8 }}>›</span>{req.prompt}
        </div>

        {/* Analysis */}
        <div className="eyebrow" style={{ margin: '20px 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
          Auto analyzes
          {phase === 1 && <span className="router-spinner" />}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 26 }}>
          {[['task', req.task], ['complexity', req.complexity], ['context', `${req.context} tokens`]].map(([k, v], i) => (
            <span key={k} className="chip" style={{ opacity: analyzing ? 1 : 0.25, transition: `opacity 0.3s ${i * 0.12}s` }}>
              <span style={{ color: 'var(--text-dim)' }}>{k}:</span> {analyzing ? v : '…'}
            </span>
          ))}
        </div>

        {/* Tiers */}
        <div className="eyebrow" style={{ margin: '20px 0 8px' }}>Routes to</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TIERS.map((t, i) => {
            const active = routed && req.tier === i
            return (
              <div key={t.name} className={`router-tier ${active ? 'active' : ''}`}>
                <span className="router-led" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: active ? 'var(--text)' : 'var(--text-muted)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{t.meta}</div>
                </div>
                <span className="router-example">{active ? '✓ selected' : t.example}</span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .router-prompt {
          font-family: var(--mono); font-size: 0.82rem; color: var(--text);
          background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
          padding: 12px 14px; animation: prompt-in 0.4s ease;
        }
        @keyframes prompt-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .router-spinner {
          width: 10px; height: 10px; border-radius: 50%;
          border: 2px solid var(--accent-border); border-top-color: var(--accent);
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .router-tier {
          display: flex; align-items: center; gap: 12px; padding: 11px 14px;
          border-radius: 8px; background: var(--surface); border: 1px solid var(--border);
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .router-tier.active {
          border-color: var(--accent-border); background: rgba(127,255,110,0.06);
          box-shadow: 0 0 24px rgba(127,255,110,0.08);
        }
        .router-led { width: 8px; height: 8px; border-radius: 50%; background: var(--border-2); flex-shrink: 0; transition: background 0.3s; }
        .router-tier.active .router-led { background: var(--accent); animation: pulse-ring 1.2s ease-out infinite; }
        .router-example { font-family: var(--mono); font-size: 0.68rem; color: var(--text-dim); white-space: nowrap; }
        .router-tier.active .router-example { color: var(--accent); font-weight: 600; }
        @media (max-width: 400px) { .router-example { display: none; } }
      `}</style>
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{ padding: '128px 32px 88px', position: 'relative', overflow: 'hidden' }} className="hero">
      <div style={{
        position: 'absolute', top: -220, left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 640,
        background: 'radial-gradient(ellipse at center, rgba(127,255,110,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center', position: 'relative' }}>
        <div className="hero-copy">
          <a href="#auto" className="label" style={{ textDecoration: 'none' }}>
            <span style={{ background: 'var(--accent)', color: '#000', borderRadius: 999, padding: '1px 7px', marginLeft: -6 }}>New</span>
            MisterPilot Auto is here →
          </a>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.9rem)', fontWeight: 900,
            letterSpacing: '-0.045em', lineHeight: 1.04, marginBottom: 22,
          }}>
            Stop choosing models.<br />
            <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Start building.</em>
          </h1>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 34, maxWidth: 480 }}>
            MisterPilot reads every request and routes it to the right AI model —
            fast models for quick questions, frontier models for hard problems.
            OpenAI, Claude and DeepSeek in one VS Code extension.
            Bring your own keys or pay as you go.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <a href={MARKETPLACE} target="_blank" rel="noreferrer" className="btn btn-primary">
              Install free for VS Code
            </a>
            <a href="#auto" className="btn btn-secondary">
              See how Auto works →
            </a>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 44 }}>
            Free to install · No subscription · Top up from ₹99 or bring your own keys
          </div>

          <div className="hero-stats" style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            {[
              { val: '1M', label: 'Token context' },
              { val: '3', label: 'AI providers' },
              { val: '₹0', label: 'Monthly fee' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <AutoRouterDemo />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-copy { text-align: center; }
          .hero-copy p { margin-left: auto; margin-right: auto; }
          .hero-ctas, .hero-stats { justify-content: center; }
        }
        @media (max-width: 640px) {
          .hero { padding: 104px 16px 56px !important; }
          .hero-stats { gap: 24px !important; }
        }
      `}</style>
    </section>
  )
}
