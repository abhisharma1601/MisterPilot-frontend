import { useInView } from '../hooks/useInView'

const STATS = [
  { val: '100/100', label: 'Standard tests', sub: 'Zero failures' },
  { val: '26/26', label: 'Adversarial bypass tests', sub: '100% caught' },
  { val: '48+', label: 'Regex patterns', sub: 'Across 21 entity types' },
  { val: '< 1ms', label: 'Scan time', sub: 'On 1KB of text' },
]

const ENTITY_GROUPS = [
  {
    label: 'Auth & Tokens',
    items: ['JWT tokens', 'HTTP Auth headers', 'OAuth tokens', 'Generic API keys', 'Generic tokens'],
  },
  {
    label: 'Cloud & Infrastructure',
    items: ['AWS keys (7 prefixes)', 'GCP / Google API keys', 'Database URLs (Postgres, MySQL, MongoDB, Redis)', 'Docker Hub PATs', 'DigitalOcean tokens'],
  },
  {
    label: 'Dev Platforms',
    items: ['GitHub tokens (5 formats)', 'GitLab tokens', 'Stripe keys (live + test)', 'Slack bot/user/app tokens', 'npm / PyPI tokens'],
  },
  {
    label: 'Services',
    items: ['SendGrid, Twilio, Mailgun, Mailchimp', 'Shopify, Telegram, Airtable, Linear', 'AI provider keys (OpenAI, Anthropic, OpenRouter, HuggingFace, Replicate)', 'PEM private keys (RSA, EC, OpenSSH, PKCS8)'],
  },
  {
    label: 'Personal Data',
    items: ['Email addresses (real domains only)', 'Phone numbers (US + international)', 'Social Security Numbers'],
  },
]

const BYPASS_HIGHLIGHTS = [
  { technique: 'HTML decimal entity', example: '&#65;KIA...', result: 'AWS_KEY' },
  { technique: 'URL percent encoding', example: '%41KIA...', result: 'AWS_KEY' },
  { technique: 'C-style comment split', example: 'AKIA/*cmt*/IOS...', result: 'AWS_KEY' },
  { technique: 'Emoji inline', example: 'AKIA❤IOS...', result: 'AWS_KEY' },
  { technique: 'Cyrillic homoglyph', example: 'AKIA...ЕXAMPLE', result: 'AWS_KEY' },
  { technique: 'Mixed obfuscation', example: 'A-&#75;IA\\t/*hmm*/IOS', result: 'AWS_KEY' },
]

export default function Privacy() {
  const [headRef, headVisible] = useInView()
  const [statsRef, statsVisible] = useInView()
  const [archRef, archVisible] = useInView()
  const [entRef, entVisible] = useInView()
  const [bypassRef, bypassVisible] = useInView()

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)', background: 'linear-gradient(180deg, var(--bg) 0%, rgba(127,255,110,0.015) 50%, var(--bg) 100%)' }}>
      <div className="container">

        {/* Header */}
        <div ref={headRef} className={`fade-up ${headVisible ? 'visible' : ''}`} style={{ marginBottom: 56 }}>
          <div className="label">🛡 PII Redaction · v2 · Deobfuscation-hardened</div>
          <h2 className="title">Your secrets are processed<br /><em>in RAM, never stored</em></h2>
          <p className="subtitle" style={{ maxWidth: 620 }}>
            Every message is scanned server-side in RAM before reaching the model.
            48+ patterns detect secrets in the first pass, then a second pass deobfuscates
            smuggled tokens — HTML entities, URL encoding, C-style comments,
            Cyrillic homoglyphs, emoji injection, and more.
          </p>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className={`fade-up privacy-stats ${statsVisible ? 'visible' : ''}`} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 64,
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="card card-accent" style={{ textAlign: 'center', transitionDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: '1.9rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-pass architecture */}
        <div ref={archRef} className={`fade-up ${archVisible ? 'visible' : ''}`} style={{ marginBottom: 64 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>Two-pass architecture</h3>
          <div className="two-pass-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', gap: 0, alignItems: 'center' }}>

            {/* Pass 1 */}
            <div className="card" style={{ borderColor: 'rgba(127,255,110,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>01</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Pattern scan</div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['48+ regex patterns scanned simultaneously', 'Overlaps resolved by priority (JWT 95 → Generic 70)', 'Replacements applied left-to-right', 'Matched secrets replaced with deterministic placeholders'].map(t => (
                  <li key={t} style={{ display: 'flex', gap: 8, fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '1.2rem' }}>→</div>

            {/* Pass 2 */}
            <div className="card" style={{ borderColor: 'rgba(127,255,110,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>02</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Deobfuscation scan</div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['HTML unescape + URL decode + strip C comments', 'Homoglyph normalization (Cyrillic → ASCII)', 'Whitespace / emoji / punctuation stripped', 'Re-scans cleaned text; skips already-caught tokens'].map(t => (
                  <li key={t} style={{ display: 'flex', gap: 8, fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Output strip */}
          <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center', padding: '14px 20px', borderRadius: 10, background: 'rgba(127,255,110,0.04)', border: '1px solid var(--accent-border)' }}>
            <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>↓</span>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)' }}>Sanitized output</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: 12 }}>Deterministic placeholders like <code style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text)' }}>EMAIL_B921</code> — same value always maps to same placeholder. Restorable via <code style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text)' }}>pipeline.restore()</code></span>
            </div>
          </div>
        </div>

        {/* Entity types */}
        <div ref={entRef} className={`fade-up ${entVisible ? 'visible' : ''}`} style={{ marginBottom: 64 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>21 entity types detected</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>Every category tested with real-world examples. Public keys and placeholder domains are intentionally excluded.</p>
          <div className="grid-3" style={{ gap: 12 }}>
            {ENTITY_GROUPS.map((g, i) => (
              <div key={g.label} className="card" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>{g.label}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {g.items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--border-2)', flexShrink: 0, marginTop: 1 }}>—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Privacy guarantees card */}
            <div className="card card-accent" style={{ gridColumn: 'span 1' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Privacy guarantees</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  ['⚡', 'Server-side', 'Scanning runs in RAM on our servers — nothing is written to disk'],
                  ['🔐', 'HMAC-SHA256', 'Placeholders use a secret key — originals can\'t be reversed'],
                  ['🚫', 'Never stored', 'Secrets are redacted and discarded — zero disk persistence'],
                  ['🔒', 'No plaintext transit', 'The LLM never sees the raw secret'],
                ].map(([icon, title, desc]) => (
                  <li key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Adversarial bypass table */}
        <div ref={bypassRef} className={`fade-up ${bypassVisible ? 'visible' : ''}`}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>Adversarial bypass: 26/26 caught</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 20 }}>
                Real-world smuggling techniques used to sneak secrets past regex filters — HTML entities, URL encoding, emoji injection, Cyrillic lookalikes, C-style comments, and combinations of all of them. Every single one caught.
              </p>
              <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(127,255,110,0.06)', border: '1px solid var(--accent-border)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--accent)' }}>100 / 100</strong> standard tests · <strong style={{ color: 'var(--accent)' }}>26 / 26</strong> adversarial · <strong style={{ color: 'var(--accent)' }}>0</strong> bypassed
              </div>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Bypass techniques caught</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {BYPASS_HIGHLIGHTS.map(row => (
                  <div key={row.technique} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 7, background: 'var(--surface-2)', border: '1px solid var(--border)', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>{row.technique}</div>
                      <code style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{row.example}</code>
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', padding: '2px 7px', borderRadius: 4, fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>✓ {row.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .privacy-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .two-pass-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .two-pass-grid > div:nth-child(2) { transform: rotate(90deg); padding: 8px 0; }
        }
        @media (max-width: 640px) {
          .privacy-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .privacy-stats { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          section[style*="linear-gradient"] > div > div:last-child > div:first-child > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
