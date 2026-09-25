import Reveal, { SectionHead } from './Reveal'

const BILLING = [
  { label: 'Minimum top-up', value: '₹99', sub: 'Start with as little as ₹99' },
  { label: 'Payment method', value: 'UPI', sub: 'No credit card required' },
  { label: 'Balance expiry', value: 'Never', sub: 'Your credit carries forward' },
  { label: 'Monthly fee', value: '₹0', sub: 'No subscription, ever' },
]

const COMPARE = [
  ['Monthly fee', '₹0', 'Fixed monthly subscription'],
  ['How you pay', 'Per token you actually use', 'Flat fee, with usage limits'],
  ['Minimum spend', '₹99 top-up that never expires', 'A full month, upfront'],
  ['Payment method', 'UPI — no credit card', 'Usually a credit card'],
  ['Bring your own API keys', 'Yes — OpenAI, Claude, DeepSeek', 'Varies by product and plan'],
  ['Automatic model routing', 'Yes — MisterPilot Auto', 'Varies'],
  ['Editor', 'The VS Code you already use', 'Often a separate or forked editor'],
]

const DASHBOARD = [
  { icon: '🔑', title: 'API Key Management', desc: 'Generate, revoke, and manage the full lifecycle of your keys.' },
  { icon: '📈', title: 'Real-time Request Tracking', desc: 'Live count of API calls and requests as they happen.' },
  { icon: '🧮', title: 'Token Usage Breakdown', desc: 'Per-model usage with daily and monthly trend charts.' },
  { icon: '💸', title: 'Per-request Cost Visibility', desc: 'See exactly what each call costs — no surprises.' },
  { icon: '📋', title: 'Activity Logs', desc: 'Timestamped history of every request with full details.' },
  { icon: '👛', title: 'Wallet & Top-up', desc: 'UPI-based wallet — top up anytime, track every transaction.' },
]

export default function Pricing() {
  return (
    <section className="section" id="pricing" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          center
          label="📊 Pricing"
          title={<>Pay for what you use.<br /><em>Nothing else.</em></>}
          subtitle="No subscriptions. No seats. No credit card. Top up with ₹99 via UPI — or bring your own keys — and let Auto keep your costs down."
        />

        {/* Hero pricing card */}
        <Reveal className="pricing-hero-card" style={{ marginBottom: 64 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(127,255,110,0.07) 0%, var(--surface) 100%)',
            border: '1px solid rgba(127,255,110,0.2)',
            borderRadius: 20, padding: '48px 40px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
          }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 10 }}>Pay as you go</div>
              <div style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
                ₹0<span style={{ fontSize: '1.4rem', color: 'var(--text-muted)', fontWeight: 600 }}>/month</span>
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
                Pay only for tokens consumed — and because Auto sends easy
                requests to low-cost models, each rupee goes further.
              </div>
              <ul className="check-list" style={{ marginBottom: 28 }}>
                <li>All providers and MisterPilot Auto included</li>
                <li>VS Code extension and API access</li>
                <li>Full usage dashboard</li>
              </ul>
              <a href="https://platform.misterpilot.online" target="_blank" rel="noreferrer" className="btn btn-primary">
                Create free account →
              </a>
            </div>
            <div className="pricing-billing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {BILLING.map(b => (
                <div key={b.label} style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--accent)', marginBottom: 4 }}>{b.value}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{b.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Comparison */}
        <Reveal style={{ textAlign: 'center', marginBottom: 28 }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>A cheaper way to code with frontier AI</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>How MisterPilot compares with typical subscription-based AI coding tools.</p>
        </Reveal>
        <Reveal className="cmp-wrap" style={{ marginBottom: 80 }}>
          <table className="cmp">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" className="hl">MisterPilot</th>
                <th scope="col">Typical AI IDE subscription</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([k, mp, other]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="hl yes">{mp}</td>
                  <td>{other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Dashboard */}
        <Reveal style={{ textAlign: 'center', marginBottom: 32 }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Everything in the dashboard</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full visibility into usage, costs, and keys — all in one place.</p>
        </Reveal>
        <div className="grid-3">
          {DASHBOARD.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.07} className="card">
              <span className="card-icon">{d.icon}</span>
              <div className="card-title">{d.title}</div>
              <div className="card-text">{d.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-hero-card > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 32px 24px !important;
          }
        }
        @media (max-width: 480px) {
          .pricing-billing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
