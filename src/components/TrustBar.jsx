import Reveal from './Reveal'

const WORKS_WITH = [
  { name: 'VS Code', glyph: '◧' },
  { name: 'Copilot Chat', glyph: '✦' },
  { name: 'OpenAI', glyph: '◎', color: '#e8e8e8' },
  { name: 'Claude', glyph: '✳', color: '#d97757' },
  { name: 'DeepSeek', glyph: '◆', color: '#4d6bfe' },
  { name: 'MCP', glyph: '⌬' },
]

const PROOF = [
  { val: '100%', label: 'PII test pass rate' },
  { val: '1M', label: 'Tokens of context' },
  { val: '< 2 min', label: 'Install to first answer' },
  { val: 'UPI', label: 'No credit card needed' },
]

export default function TrustBar() {
  return (
    <section className="section-sm" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: '#0b0b0b' }}>
      <div className="container">
        <Reveal style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>Works with the tools you already use</div>
          <div className="trust-logos">
            {WORKS_WITH.map(w => (
              <span key={w.name} className="trust-logo">
                <span style={{ color: w.color || 'var(--accent)', fontSize: '1.05rem' }}>{w.glyph}</span>
                {w.name}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="trust-proof">
          {PROOF.map(p => (
            <div key={p.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text)' }}>{p.val}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: 2 }}>{p.label}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .trust-logos { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px 36px; }
        .trust-logo {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 1rem; font-weight: 700; letter-spacing: -0.01em; color: var(--text-muted);
        }
        .trust-proof {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
          margin-top: 40px; padding-top: 32px; border-top: 1px dashed var(--border);
        }
        @media (max-width: 640px) {
          .trust-logos { gap: 10px 22px; }
          .trust-logo { font-size: 0.88rem; }
          .trust-proof { grid-template-columns: repeat(2, 1fr); gap: 24px 12px; }
        }
      `}</style>
    </section>
  )
}
