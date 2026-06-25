import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: '60px',
      background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
      transition: 'background 0.25s, border-color 0.25s, backdrop-filter 0.25s',
    }}>
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/icon.png" alt="MisterPilot" style={{ width: 28, height: 28, borderRadius: 7, display: 'block' }} />
        <span style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
          Mister<span style={{ color: 'var(--accent)' }}>Pilot</span>
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-links">
        {[
          { label: 'Extension', href: '#extension' },
          { label: 'API', href: '#api' },
          { label: 'MCP', href: '#mcp' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Docs', href: 'https://platform.misterpilot.online/docs', external: true },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            style={{
              fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none',
              padding: '6px 12px', borderRadius: 6,
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--text)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
            onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.background = 'transparent' }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a
          href="https://platform.misterpilot.online"
          target="_blank" rel="noreferrer"
          style={{
            fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none',
            padding: '6px 14px', border: '1px solid var(--border-2)', borderRadius: 6,
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#333'; e.target.style.color = 'var(--text)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border-2)'; e.target.style.color = 'var(--text-muted)' }}
        >
          Sign in
        </a>
        <a
          href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
          target="_blank" rel="noreferrer"
          className="btn btn-primary btn-sm"
        >
          Get Extension
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
