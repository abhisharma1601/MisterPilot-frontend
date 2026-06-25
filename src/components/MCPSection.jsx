import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const INTEGRATIONS = [
  {
    icon: '🐙',
    name: 'GitHub',
    desc: 'List repos, read files, create issues, review PRs, and search code — all from the chat.',
    config: `<span class="c-str">"github"</span>: {
  <span class="c-key">"command"</span>: <span class="c-str">"npx"</span>,
  <span class="c-key">"args"</span>: [<span class="c-str">"-y"</span>, <span class="c-str">"@modelcontextprotocol/server-github"</span>],
  <span class="c-key">"env"</span>: {
    <span class="c-key">"GITHUB_PERSONAL_ACCESS_TOKEN"</span>: <span class="c-str">"ghp_xxxx"</span>
  }
}`,
    prompt: '"Open a GitHub issue for the bug we just fixed"',
  },
  {
    icon: '🎭',
    name: 'Playwright',
    desc: 'Give the AI a real browser — navigate pages, click, fill forms, take screenshots, scrape data.',
    config: `<span class="c-str">"playwright"</span>: {
  <span class="c-key">"command"</span>: <span class="c-str">"npx"</span>,
  <span class="c-key">"args"</span>: [<span class="c-str">"-y"</span>, <span class="c-str">"@playwright/mcp"</span>]
}`,
    prompt: '"Go to my staging URL and test the login flow"',
  },
  {
    icon: '🗄️',
    name: 'PostgreSQL',
    desc: 'Introspect your schema, run queries, and write migrations with full database context.',
    config: `<span class="c-str">"postgres"</span>: {
  <span class="c-key">"command"</span>: <span class="c-str">"npx"</span>,
  <span class="c-key">"args"</span>: [<span class="c-str">"-y"</span>, <span class="c-str">"@modelcontextprotocol/server-postgres"</span>,
    <span class="c-str">"postgresql://user:pass@localhost/mydb"</span>]
}`,
    prompt: '"Write a migration to add email_verified to users table"',
  },
  {
    icon: '🌐',
    name: 'Web Fetch',
    desc: 'Fetch any URL or search the web. Great for pulling docs, changelogs, or API references.',
    config: `<span class="c-str">"fetch"</span>: {
  <span class="c-key">"command"</span>: <span class="c-str">"uvx"</span>,
  <span class="c-key">"args"</span>: [<span class="c-str">"mcp-server-fetch"</span>]
}`,
    prompt: '"Fetch the React changelog and summarise what\'s new"',
  },
]

export default function MCPSection() {
  const [active, setActive] = useState(0)
  const [headRef, headVisible] = useInView()
  const [bodyRef, bodyVisible] = useInView()

  const intg = INTEGRATIONS[active]

  return (
    <section className="section" id="mcp" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">

        <div ref={headRef} className={`fade-up ${headVisible ? 'visible' : ''}`} style={{ marginBottom: 56 }}>
          <div className="label">🔌 MCP Integrations</div>
          <h2 className="title">Connect the AI to<br /><em>anything</em></h2>
          <p className="subtitle">
            MCP (Model Context Protocol) lets MisterPilot talk to external tools — GitHub, databases, browsers,
            or your own internal services. Configure once, use everywhere.
          </p>
        </div>

        <div ref={bodyRef} className={`fade-up ${bodyVisible ? 'visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>

          {/* Left: integration list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {INTEGRATIONS.map((intg, i) => (
              <button
                key={intg.name}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: active === i ? 'rgba(127,255,110,0.07)' : 'transparent',
                  borderLeft: `2px solid ${active === i ? 'var(--accent)' : 'transparent'}`,
                  transition: 'all 0.15s', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{intg.icon}</span>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: active === i ? 'var(--text)' : 'var(--text-muted)' }}>{intg.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2, lineHeight: 1.4 }}>{intg.desc.slice(0, 40)}…</div>
                </div>
              </button>
            ))}

            <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>+ Any MCP server</span><br />
              HTTP or stdio — if it speaks MCP, MisterPilot connects to it.
            </div>
          </div>

          {/* Right: config + details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: '1.6rem' }}>{intg.icon}</span>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{intg.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{intg.desc}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
              settings.json
            </div>
            <div className="code-block" style={{ marginBottom: 16 }}>
              <div className="code-block-bar">
                <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
                <span className="code-file">settings.json → misterpilot.mcpServers</span>
              </div>
              <pre style={{ padding: '16px 20px', fontFamily: 'var(--mono)', fontSize: '0.8rem', lineHeight: 1.7, color: '#c9d1d9', overflowX: 'auto' }}>
                <code dangerouslySetInnerHTML={{ __html: intg.config }} />
              </pre>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: 8, background: 'rgba(127,255,110,0.05)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '0.9rem' }}>💬</span>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Example prompt</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{intg.prompt}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #mcp .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
