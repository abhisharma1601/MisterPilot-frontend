import { useState } from 'react'
import Reveal, { SectionHead } from './Reveal'

const PROVIDERS = [
  {
    name: 'OpenAI',
    color: '#e8e8e8',
    line: 'gpt-5.5 · gpt-5.4 · gpt-5.3-codex …',
    desc: 'Versatile, general-purpose coding and reasoning.',
  },
  {
    name: 'Claude',
    color: '#d97757',
    line: 'claude-opus-5-5 · claude-sonnet-5 · …',
    desc: 'Long-context understanding and careful, high-quality edits.',
  },
  {
    name: 'DeepSeek',
    color: '#4d6bfe',
    line: 'deepseek-v4-pro · deepseek-flash',
    desc: 'Outstanding price-to-performance for everyday coding.',
  },
]

const MODES = {
  credits: {
    tab: 'Use MisterPilot',
    title: 'One wallet for every model',
    desc: 'Top up once and use OpenAI, Claude and DeepSeek through MisterPilot. No separate provider accounts to set up.',
    points: [
      'Top up from ₹99 via UPI — no credit card',
      'Balance never expires, no monthly fee',
      'Per-request cost and token usage in your dashboard',
      'Works with Auto routing out of the box',
    ],
    cta: { label: 'Create free account →', href: 'https://platform.misterpilot.online' },
  },
  byok: {
    tab: 'Bring your own key',
    title: 'Use your own AI keys',
    desc: 'Already pay OpenAI, Anthropic or DeepSeek? Connect your keys and keep full control of billing and limits.',
    points: [
      'Connect OpenAI, Claude and DeepSeek API keys',
      'Billed directly by your provider',
      'Use existing credits, org limits and subscriptions',
      'Secure key management built in',
      'Auto routing runs on MisterPilot credits',
    ],
    cta: { label: 'Install extension →', href: 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot' },
  },
}

export default function Models() {
  const [mode, setMode] = useState('credits')
  const m = MODES[mode]

  return (
    <section className="section" id="models" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          label="🧠 Multi-provider"
          title={<>All your AI models.<br /><em>One workspace.</em></>}
          subtitle="OpenAI, Claude and DeepSeek from a single extension. No vendor lock-in, access to the latest models, and one consistent experience."
        />

        <div className="grid-3" style={{ marginBottom: 16 }}>
          {PROVIDERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span className="dot-provider" style={{ background: p.color, width: 10, height: 10 }} />
                <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{p.name}</span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 10 }}>{p.line}</div>
              <div className="card-text">{p.desc}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="card card-accent models-auto-strip" style={{ marginBottom: 64 }}>
          <span style={{ fontSize: '1.2rem' }}>⚡</span>
          <div style={{ flex: 1 }}>
            <strong>Or don't choose at all.</strong>{' '}
            <span style={{ color: 'var(--text-muted)' }}>MisterPilot Auto routes every request across all three providers for you.</span>
          </div>
          <a href="#auto" className="btn btn-ghost btn-sm">How Auto works</a>
        </Reveal>

        {/* BYOK */}
        <Reveal className="models-byok">
          <div>
            <div className="label">🔑 Bring your own key</div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 14 }}>
              Your keys or ours.<br /><span style={{ color: 'var(--accent)' }}>Your choice.</span>
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 400 }}>
              Pay as you go with MisterPilot credits, or plug in the API keys you already have.
              Switch any time — your workflow stays the same.
            </p>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="auto-tabs" role="tablist" aria-label="Billing mode">
              {Object.entries(MODES).map(([k, v]) => (
                <button key={k} role="tab" aria-selected={mode === k} className={`auto-tab ${mode === k ? 'active' : ''}`} onClick={() => setMode(k)}>
                  {v.tab}
                </button>
              ))}
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>{m.title}</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 20 }}>{m.desc}</p>
              <ul className="check-list" style={{ marginBottom: 24 }}>
                {m.points.map(p => <li key={p}>{p}</li>)}
              </ul>
              <a href={m.cta.href} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">{m.cta.label}</a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .models-auto-strip { display: flex; align-items: center; gap: 16px; padding: 18px 24px; font-size: 0.9rem; }
        .models-byok { display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; align-items: center; }
        @media (max-width: 900px) {
          .models-byok { grid-template-columns: 1fr; gap: 28px; }
        }
        @media (max-width: 640px) {
          .models-auto-strip { flex-direction: column; align-items: flex-start; text-align: left; }
          .models-auto-strip .btn { width: auto; }
        }
      `}</style>
    </section>
  )
}
