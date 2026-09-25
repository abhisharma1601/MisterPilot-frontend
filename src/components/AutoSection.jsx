import { useState } from 'react'
import Reveal, { SectionHead } from './Reveal'

const FLOW = [
  { n: '01', title: 'You ask', desc: 'Type in chat like you always do. No model picker, no settings.' },
  { n: '02', title: 'Auto analyzes', desc: 'Task type, complexity and how much code the request touches.' },
  { n: '03', title: 'Best model answers', desc: 'Routed to the model that fits — across OpenAI, Claude and DeepSeek.' },
  { n: '04', title: 'Fallback if needed', desc: 'Provider slow or down? Auto retries on another model automatically.' },
]

const TIERS = [
  {
    key: 'fast',
    tab: 'Quick questions',
    model: 'Fast, low-cost models',
    why: 'Near-instant answers that cost a fraction of a frontier call.',
    prompts: ['What does this regex match?', 'Explain this error message', 'Rename this variable across the file', 'Write a docstring for this function'],
  },
  {
    key: 'reason',
    tab: 'Feature work',
    model: 'Strong reasoning models',
    why: 'Multi-step planning and reliable edits across several files.',
    prompts: ['Add pagination to the orders API', 'Why does this test fail only in CI?', 'Refactor this hook to use a reducer', 'Write integration tests for checkout'],
  },
  {
    key: 'frontier',
    tab: 'Architecture',
    model: 'Premium frontier models',
    why: 'Maximum capability when the problem spans the whole codebase.',
    prompts: ['Plan a REST → GraphQL migration', 'Split this monolith into services', 'Audit the auth flow for security gaps', 'Redesign the data model for multi-tenancy'],
  },
]

export default function AutoSection() {
  const [active, setActive] = useState(1)
  const tier = TIERS[active]

  return (
    <section className="section" id="auto">
      <div className="container">
        <SectionHead
          label="⚡ MisterPilot Auto"
          title={<>AI that picks <em>the right AI</em></>}
          subtitle="You shouldn't need a spreadsheet of benchmarks to fix a bug. Auto looks at what you're asking and sends it to the model that fits — so every request gets the best answer at the lowest sensible cost."
        />

        {/* Flow */}
        <Reveal className="auto-flow">
          {FLOW.map((f, i) => (
            <div key={f.n} className="auto-flow-step">
              <div className="auto-flow-head">
                <span className="auto-flow-num">{f.n}</span>
                {i < FLOW.length - 1 && <div className="flow-line auto-flow-line" />}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </Reveal>

        {/* Tier explorer */}
        <Reveal className="card auto-explorer" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="auto-tabs" role="tablist" aria-label="Request types">
            {TIERS.map((t, i) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={active === i}
                className={`auto-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                {t.tab}
              </button>
            ))}
          </div>

          <div className="auto-panel">
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Requests like</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tier.prompts.map(p => (
                  <div key={p} style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ color: 'var(--accent)', marginRight: 8 }}>›</span>{p}
                  </div>
                ))}
              </div>
            </div>

            <div className="auto-arrow" aria-hidden="true">→</div>

            <div style={{ alignSelf: 'center' }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Auto routes to</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--accent)', marginBottom: 8, lineHeight: 1.2 }}>{tier.model}</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 18 }}>{tier.why}</p>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Want a specific model instead? You can still pick one manually at any time.
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .auto-flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 48px; }
        .auto-flow-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .auto-flow-num {
          width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-dim); border: 1px solid var(--accent-border);
          color: var(--accent); font-family: var(--mono); font-weight: 800; font-size: 0.78rem;
        }
        .auto-flow-line { flex: 1; }
        .auto-panel { display: grid; grid-template-columns: 1fr 48px 1fr; gap: 16px; padding: 32px; }
        .auto-arrow { align-self: center; text-align: center; color: var(--accent); font-size: 1.4rem; }
        @media (max-width: 900px) {
          .auto-flow { grid-template-columns: repeat(2, 1fr); }
          .auto-flow-line { display: none; }
        }
        @media (max-width: 640px) {
          .auto-flow { grid-template-columns: 1fr; gap: 20px; }
          .auto-panel { grid-template-columns: 1fr; padding: 22px 18px; }
          .auto-arrow { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  )
}
