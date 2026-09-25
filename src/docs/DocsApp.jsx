import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SECTIONS, ENGINE, PLATFORM } from './content'

const GROUPS = SECTIONS.reduce((acc, s) => {
  (acc[s.group] ||= []).push(s)
  return acc
}, {})

function useActiveSection() {
  const [active, setActive] = useState(() => window.location.hash.slice(1) || SECTIONS[0].id)
  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => {
        const top = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive(top.target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return active
}

export default function DocsApp() {
  const active = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeTitle = SECTIONS.find(s => s.id === active)?.title ?? 'Contents'

  return (
    <>
      <Navbar />
      <div className="docs-shell">
        <button className="docs-mobile-toggle" onClick={() => setMenuOpen(o => !o)} aria-expanded={menuOpen}>
          <span><span style={{ color: 'var(--text-dim)' }}>Docs /</span> {activeTitle}</span>
          <span style={{ color: 'var(--accent)' }}>{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav className={`docs-nav ${menuOpen ? 'open' : ''}`} aria-label="Documentation">
          {Object.entries(GROUPS).map(([group, items]) => (
            <div key={group} className="docs-nav-group">
              <div className="eyebrow">{group}</div>
              {items.map(s => (
                <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                  {s.title}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <main className="docs-content">
          <header className="docs-hero">
            <div className="label">📚 Documentation</div>
            <h1>Build with <span style={{ color: 'var(--accent)' }}>MisterPilot</span></h1>
            <p>
              Everything you need to use the VS Code extension, plug MisterPilot into GitHub Copilot Chat,
              and call the OpenAI-compatible API — with OpenAI, Claude, DeepSeek and Auto routing.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
              <a href="#quickstart" className="btn btn-primary btn-sm">Quickstart →</a>
              <a href={PLATFORM} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">Get an API key</a>
              <code className="chip" style={{ alignSelf: 'center' }}>{ENGINE}</code>
            </div>
          </header>

          {SECTIONS.map(s => (
            <section key={s.id} id={s.id} className="docs-section">
              <div className="eyebrow" style={{ marginBottom: 6 }}>{s.group}</div>
              <h2><a href={`#${s.id}`}>{s.title}</a></h2>
              {s.body}
            </section>
          ))}
        </main>
      </div>
      <Footer />
    </>
  )
}
