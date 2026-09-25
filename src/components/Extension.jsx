import Reveal, { SectionHead } from './Reveal'

const MARKETPLACE = 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot'

const CONTEXT = [
  { icon: '📄', title: 'Open files', desc: 'What you have open, and where your cursor is.' },
  { icon: '📁', title: 'Workspace structure', desc: 'How your project is laid out, file by file.' },
  { icon: '⎇', title: 'Git branch', desc: 'The branch you are on and what has changed.' },
  { icon: '▍', title: 'Selected code', desc: 'Highlight a block and just ask about "this".' },
  { icon: '🧩', title: 'Current project', desc: 'Language, framework and config — detected, not explained.' },
]

const METER = [
  { label: 'Workspace structure', tokens: 84, color: '#7fff6e' },
  { label: 'Open & referenced files', tokens: 212, color: '#4fd1c5' },
  { label: 'Git diff & diagnostics', tokens: 38, color: '#ffbd2e' },
  { label: 'Conversation history', tokens: 96, color: '#a78bfa' },
]
const METER_TOTAL = 1000

const TOOLS = [
  { icon: '✦', title: 'Copilot Chat compatible', desc: 'Keep the chat workflow you already know.' },
  { icon: '💬', title: 'AI chat', desc: 'Codebase-aware answers in the sidebar.' },
  { icon: '⚙️', title: 'Code generation', desc: 'From a one-liner to a whole feature.' },
  { icon: '🔎', title: 'Code review', desc: 'Catch bugs and smells before you commit.' },
  { icon: '📖', title: 'Code explanation', desc: 'Understand unfamiliar code in seconds.' },
  { icon: '♻️', title: 'Refactoring', desc: 'Safe, multi-file restructuring.' },
  { icon: '✅', title: 'Diff review before writes', desc: 'Approve every change before it hits disk.' },
  { icon: '⚠️', title: 'Diagnostics awareness', desc: 'Sees the same errors and warnings you do.' },
  { icon: '🗂', title: 'File discovery & browsing', desc: 'Finds files and walks directories itself.' },
  { icon: '📜', title: 'Large file reading', desc: 'Reads big files without choking or truncating.' },
  { icon: '🔍', title: 'Workspace search', desc: 'ripgrep-powered search across your project.' },
  { icon: '⌨️', title: 'Terminal execution', desc: 'Runs commands, installs, tests — in chat.' },
]

const STEPS = [
  { num: '01', title: 'Install the extension', desc: 'Search "MisterPilot" in the VS Code Marketplace. One-click install.' },
  { num: '02', title: 'Sign in or add your keys', desc: 'Use a MisterPilot account, or paste your own OpenAI, Claude or DeepSeek keys.' },
  { num: '03', title: 'Ask anything', desc: 'Open the MisterPilot sidebar. Auto picks the right model for you.' },
]

function WorkspaceMock() {
  return (
    <div className="code-block ws-mock">
      <div className="code-block-bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        <span className="code-file">checkout.ts — shop-api</span>
        <span className="chip" style={{ marginLeft: 'auto', fontSize: '0.65rem', padding: '2px 8px' }}>⎇ feat/payments</span>
      </div>
      <div className="ws-body">
        {/* Editor */}
        <div className="ws-editor">
          <pre style={{ padding: '18px 20px' }}><code>
            <span className="c-cm">{'// src/checkout.ts'}</span>{'\n'}
            <span className="c-kw">export async function</span> <span className="c-fn">applyDiscount</span>(cart, code) {'{'}{'\n'}
            {'  '}<span className="c-kw">const</span> promo = <span className="c-kw">await</span> <span className="c-fn">findPromo</span>(code){'\n'}
            <span className="ws-sel">{'  '}<span className="c-kw">if</span> (promo.expires {'<'} Date.<span className="c-fn">now</span>()) {'{'}</span>{'\n'}
            <span className="ws-sel">{'    '}<span className="c-kw">return</span> cart</span>{'\n'}
            <span className="ws-sel">{'  }'}</span>{'\n'}
            {'  '}<span className="c-kw">return</span> {'{'} ...cart, total: cart.total * (<span className="c-str">1</span> - promo.pct) {'}'}{'\n'}
            {'}'}
          </code></pre>
        </div>

        {/* Chat panel */}
        <div className="ws-chat">
          <div className="eyebrow" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>MisterPilot</span>
            <span style={{ color: 'var(--accent)' }}>Auto → Reasoning</span>
          </div>
          <div className="ws-msg">Why does the expired-promo test fail?</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', margin: '8px 0 14px' }}>
            <span className="chip" style={{ fontSize: '0.64rem' }}>📄 checkout.ts</span>
            <span className="chip" style={{ fontSize: '0.64rem' }}>▍ 3 lines selected</span>
            <span className="chip" style={{ fontSize: '0.64rem' }}>⎇ feat/payments</span>
          </div>
          {[
            ['get_diagnostics', '1 error'],
            ['find_files', 'promo*.ts · 2'],
            ['read_file', 'promo.ts · 1,240 ln'],
          ].map(([t, r]) => (
            <div key={t} className="ws-tool"><span style={{ color: 'var(--accent)' }}>▸</span> {t} <span style={{ marginLeft: 'auto', color: 'var(--text-dim)' }}>{r}</span></div>
          ))}
          <div className="ws-reply">
            <code style={{ color: 'var(--text)' }}>promo.expires</code> is an ISO string, so the comparison with <code style={{ color: 'var(--text)' }}>Date.now()</code> is always false.
          </div>
          <div className="ws-diff">
            <span>✎ checkout.ts <span style={{ color: 'var(--accent)' }}>+1</span> <span style={{ color: '#ff7b72' }}>−1</span></span>
            <span className="chip chip-accent" style={{ fontSize: '0.64rem' }}>Review diff</span>
          </div>
        </div>
      </div>

      <style>{`
        .ws-body { display: grid; grid-template-columns: 1.1fr 1fr; min-height: 340px; }
        .ws-editor { border-right: 1px solid var(--border); overflow: hidden; }
        .ws-editor pre { font-size: 0.74rem !important; line-height: 1.8 !important; }
        .ws-sel { background: rgba(127,255,110,0.08); display: inline-block; width: 100%; }
        .ws-chat { padding: 16px; background: #0c0c0c; font-size: 0.78rem; }
        .ws-msg { background: var(--surface-2); border: 1px solid var(--border-2); border-radius: 8px; padding: 9px 12px; color: var(--text); }
        .ws-tool {
          display: flex; gap: 8px; font-family: var(--mono); font-size: 0.68rem; color: var(--text-muted);
          padding: 6px 10px; border-left: 2px solid var(--border-2); margin-bottom: 4px;
        }
        .ws-reply { margin: 12px 0; color: var(--text-muted); line-height: 1.6; }
        .ws-reply code { font-family: var(--mono); font-size: 0.7rem; }
        .ws-diff {
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--mono); font-size: 0.7rem; color: var(--text-muted);
          border: 1px solid var(--border-2); border-radius: 8px; padding: 8px 10px;
        }
        @media (max-width: 768px) {
          .ws-body { grid-template-columns: 1fr; }
          .ws-editor { display: none; }
        }
      `}</style>
    </div>
  )
}

function ContextMeter() {
  const used = METER.reduce((s, m) => s + m.tokens, 0)
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="label" style={{ alignSelf: 'flex-start' }}>📐 Up to 1M tokens</div>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Built for large codebases</h3>
      <p className="card-text" style={{ marginBottom: 24 }}>
        Context windows up to 1 million tokens mean MisterPilot keeps your whole project and long sessions in view —
        less repeating yourself, better project awareness.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 8 }}>
        <span>Example session</span>
        <span><span style={{ color: 'var(--text)' }}>{used}K</span> / 1,000K</span>
      </div>
      <div className="ctx-bar" role="img" aria-label={`${used} thousand of 1 million tokens used`}>
        {METER.map(m => (
          <span key={m.label} style={{ width: `${(m.tokens / METER_TOTAL) * 100}%`, background: m.color }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: 16 }}>
        {METER.map(m => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <span className="dot-provider" style={{ background: m.color }} />
            <span style={{ flex: 1 }}>{m.label}</span>
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)' }}>{m.tokens}K</span>
          </div>
        ))}
      </div>

      <style>{`
        .ctx-bar { display: flex; height: 12px; border-radius: 999px; overflow: hidden; background: var(--surface-2); border: 1px solid var(--border); }
        .ctx-bar span { height: 100%; }
        .fade-up .ctx-bar span { transform-origin: left; transform: scaleX(0); transition: transform 1s ease 0.3s; }
        .fade-up.visible .ctx-bar span { transform: scaleX(1); }
      `}</style>
    </div>
  )
}

export default function Extension() {
  return (
    <section className="section" id="extension" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          label="🖥 VS Code Extension · Copilot Chat compatible"
          title={<>Your AI understands<br /><em>your workspace</em></>}
          subtitle="MisterPilot already knows your open files, project layout, git branch and selection — so you spend less time prompting and get more accurate answers."
        >
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <a href={MARKETPLACE} target="_blank" rel="noreferrer" className="btn btn-primary">Install on VS Code</a>
            <a href="/docs/#copilot-chat" className="btn btn-secondary">Use with Copilot Chat →</a>
          </div>
        </SectionHead>

        <Reveal style={{ marginBottom: 24 }}>
          <WorkspaceMock />
        </Reveal>

        <Reveal className="ext-context">
          <div className="card">
            <div className="eyebrow" style={{ marginBottom: 18 }}>Smart context, automatically</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CONTEXT.map(c => (
                <div key={c.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--accent)' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{c.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContextMeter />
        </Reveal>

        {/* More than chat */}
        <Reveal style={{ margin: '88px 0 32px', textAlign: 'center' }}>
          <h3 className="title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>More than <em>chat</em></h3>
          <p className="subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            A real toolset for autonomous coding: MisterPilot chains multiple tools per request to debug faster and edit smarter.
          </p>
        </Reveal>
        <div className="grid-4" style={{ marginBottom: 80 }}>
          {TOOLS.map((t, i) => (
            <Reveal key={t.title} delay={(i % 4) * 0.06} className="card" style={{ padding: 22 }}>
              <span className="card-icon" style={{ fontSize: '1.2rem', marginBottom: 10 }}>{t.icon}</span>
              <div className="card-title" style={{ fontSize: '0.88rem' }}>{t.title}</div>
              <div className="card-text" style={{ fontSize: '0.8rem' }}>{t.desc}</div>
            </Reveal>
          ))}
        </div>

        {/* Setup steps */}
        <Reveal style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '48px 40px' }} className="ext-steps">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ margin: '0 auto 14px' }}>Setup in 3 steps</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Up and running in under 2 minutes</h3>
          </div>
          <div className="grid-3">
            {STEPS.map(s => (
              <div key={s.num} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, margin: '0 auto 16px',
                  background: 'rgba(127,255,110,0.1)', border: '1px solid rgba(127,255,110,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--mono)',
                }}>{s.num}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: '0.95rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .ext-context { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 900px) {
          .ext-context { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .ext-steps { padding: 32px 18px !important; }
        }
      `}</style>
    </section>
  )
}
