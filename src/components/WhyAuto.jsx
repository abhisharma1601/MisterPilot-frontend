import Reveal, { SectionHead } from './Reveal'

const ROWS = [
  ['Choosing a model', 'You decide, on every request', 'Automatic'],
  ['Simple questions', 'Often sent to an expensive model', 'Fast, low-cost model'],
  ['Hard problems', 'Often sent to an underpowered model', 'Frontier model'],
  ['Multiple providers', 'Separate apps, keys and bills', 'One extension, one wallet'],
  ['Provider slow or down', 'You wait or switch tools', 'Automatic fallback'],
  ['Knowing what you spent', 'Guesswork', 'Cost per request, tracked'],
]

const BENEFITS = [
  { icon: '🎯', title: 'Better answers', desc: 'Hard problems get the strongest reasoning. Easy ones get speed.' },
  { icon: '💸', title: 'Lower costs', desc: 'Stop paying frontier prices for questions a fast model nails.' },
  { icon: '🔀', title: 'No model-switching', desc: 'No dropdowns, no tabs, no second-guessing mid-flow.' },
  { icon: '🤖', title: 'Fully automatic', desc: 'Works out of the box. Override manually whenever you want.' },
]

export default function WhyAuto() {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <SectionHead
          center
          label="Why auto routing"
          title={<>One request.<br /><em>The best model every time.</em></>}
          subtitle="Using one model for everything means overpaying for easy work and underpowering hard work. Auto fixes both."
        />

        <Reveal className="cmp-wrap" style={{ marginBottom: 32 }}>
          <table className="cmp">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Picking models manually</th>
                <th scope="col" className="hl">MisterPilot Auto</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, manual, auto]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="no">{manual}</td>
                  <td className="hl yes">{auto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <div className="grid-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07} className="card">
              <span className="card-icon">{b.icon}</span>
              <div className="card-title">{b.title}</div>
              <div className="card-text">{b.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
