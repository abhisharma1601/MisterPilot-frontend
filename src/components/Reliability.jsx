import Reveal, { SectionHead } from './Reveal'

const ITEMS = [
  { icon: '🧾', title: 'Reliable billing', desc: 'Every request metered and charged accurately against your wallet.' },
  { icon: '📡', title: 'Streaming support', desc: 'Token-by-token streaming in the extension and the API.' },
  { icon: '📊', title: 'Usage tracking', desc: 'Tokens, requests and cost per model — in real time.' },
  { icon: '🔁', title: 'Automatic fallbacks', desc: 'If a provider fails, requests are retried on another model.' },
  { icon: '🔐', title: 'AWS secrets management', desc: 'Provider credentials stored in AWS Secrets Manager.' },
  { icon: '🛡', title: 'PII redaction', desc: 'Secrets and personal data stripped in RAM before any model sees them.' },
  { icon: '👤', title: 'Authentication', desc: 'Google Sign-In or email and password.' },
  { icon: '☁️', title: 'Cloud-hosted platform', desc: 'Nothing to self-host. Dashboard, API and billing, managed.' },
]

export default function Reliability() {
  return (
    <section className="section" id="reliability" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          center
          label="🏗 Enterprise reliability"
          title={<>Built for <em>production</em></>}
          subtitle="Not a weekend wrapper. The infrastructure behind MisterPilot is built so your team can depend on it every day."
        />
        <div className="grid-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 4) * 0.06} className="card">
              <span className="card-icon">{it.icon}</span>
              <div className="card-title">{it.title}</div>
              <div className="card-text">{it.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
