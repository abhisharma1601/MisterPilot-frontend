import { useInView } from '../hooks/useInView'

const BILLING = [
  { icon: '₹', label: 'Minimum top-up', value: '₹50', sub: 'Start with as little as ₹50' },
  { icon: '📱', label: 'Payment method', value: 'UPI', sub: 'No credit card required' },
  { icon: '♾️', label: 'Balance expiry', value: 'Never', sub: 'Your credit carries forward' },
  { icon: '0', label: 'Monthly fee', value: '₹0', sub: 'No subscription, ever' },
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
  const [headRef, headVisible] = useInView()
  const [cardRef, cardVisible] = useInView()
  const [dashRef, dashVisible] = useInView()

  return (
    <section className="section" id="pricing" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">

        {/* Header */}
        <div ref={headRef} className={`fade-up ${headVisible ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="label" style={{ margin: '0 auto 16px' }}>📊 Pricing</div>
          <h2 className="title">Pay for what you use.<br /><em>Nothing else.</em></h2>
          <p className="subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            No monthly seat fees. No per-user pricing. No surprises.
            Top up your wallet and spend it at your own pace.
          </p>
        </div>

        {/* Hero pricing card */}
        <div ref={cardRef} className={`fade-up ${cardVisible ? 'visible' : ''}`} style={{ marginBottom: 48 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(127,255,110,0.07) 0%, var(--surface) 100%)',
            border: '1px solid rgba(127,255,110,0.2)',
            borderRadius: 20, padding: '48px 40px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
                ₹0<span style={{ fontSize: '1.4rem', color: 'var(--text-muted)', fontWeight: 600 }}>/month</span>
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
                Pay only for actual tokens consumed.<br />
                Start with ₹50. Use it whenever you want.
              </div>
              <a href="https://platform.misterpilot.online" target="_blank" rel="noreferrer" className="btn btn-primary">
                Create free account →
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {BILLING.map(b => (
                <div key={b.label} style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--accent)', marginBottom: 4 }}>{b.value}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{b.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard section */}
        <div ref={dashRef} className={`fade-up ${dashVisible ? 'visible' : ''}`}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Everything in the dashboard</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full visibility into usage, costs, and keys — all in one place.</p>
          </div>
          <div className="grid-3">
            {DASHBOARD.map((d, i) => {
              const [ref, vis] = useInView()
              return (
                <div key={d.title} ref={ref} className={`card fade-up ${vis ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                  <span className="card-icon">{d.icon}</span>
                  <div className="card-title">{d.title}</div>
                  <div className="card-text">{d.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #pricing .container > div:nth-child(2) > div {
            grid-template-columns: 1fr !important;
          }
          #pricing .container > div:nth-child(2) > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
