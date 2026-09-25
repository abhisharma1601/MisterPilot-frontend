import Reveal, { SectionHead } from './Reveal'

const LOCAL = [
  { icon: '⚡', title: 'Faster responses', desc: 'File reads, searches and diagnostics happen on your machine — no round-trip for every step.' },
  { icon: '🛡', title: 'Better reliability', desc: 'Fewer moving parts between the agent and your code means fewer things that can break.' },
  { icon: '🎛', title: 'More control', desc: 'The agent works inside your VS Code, with your files, your terminal and your permissions.' },
]

const PERMISSIONS = [
  { op: 'Read files', cmd: 'read_file', allow: true },
  { op: 'Search workspace', cmd: 'rg "useAuth"', allow: true },
  { op: 'Run tests', cmd: 'npm test', allow: true },
  { op: 'Delete files', cmd: 'rm -rf dist/', allow: false },
  { op: 'Push to remote', cmd: 'git push', allow: false },
]

export default function AgentSection() {
  return (
    <section className="section" id="agent" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          label="🤖 Local agent"
          title={<>Your agent runs<br /><em>where your code lives</em></>}
          subtitle="The MisterPilot coding agent executes inside VS Code instead of relying on a remote backend for every action. Only model calls leave your machine."
        />

        <div className="grid-3" style={{ marginBottom: 64 }}>
          {LOCAL.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.08} className="card">
              <span className="card-icon">{l.icon}</span>
              <div className="card-title">{l.title}</div>
              <div className="card-text">{l.desc}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="agent-allow">
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <span className="badge-soon">Coming soon</span>
              <span className="eyebrow">Always Allow</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 14 }}>
              Automation without<br /><span style={{ color: 'var(--accent)' }}>losing control</span>
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20, maxWidth: 420 }}>
              Auto-approve the safe stuff — reading files, searching, running tests — so the agent keeps moving.
              Destructive actions still stop and ask. Every time.
            </p>
            <ul className="check-list">
              <li>Per-operation approval rules</li>
              <li>Dangerous commands always protected</li>
              <li>Diff review stays on for every file write</li>
            </ul>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Agent permissions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PERMISSIONS.map(p => (
                <div key={p.op} className="perm-row">
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.op}</div>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{p.cmd}</code>
                  </div>
                  {p.allow
                    ? <span className="chip chip-accent">✓ Always allow</span>
                    : <span className="chip" style={{ color: '#ffbd2e', borderColor: 'rgba(255,189,46,0.25)', background: 'rgba(255,189,46,0.06)' }}>🔒 Ask every time</span>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .agent-allow { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .perm-row {
          display: flex; justify-content: space-between; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 8px; background: var(--surface-2); border: 1px solid var(--border);
        }
        @media (max-width: 900px) { .agent-allow { grid-template-columns: 1fr; gap: 28px; } }
        @media (max-width: 400px) { .perm-row { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </section>
  )
}
