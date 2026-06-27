import { useEffect, useRef, useState } from 'react'

const SNIPPET = `<span class="c-kw">from</span> openai <span class="c-kw">import</span> OpenAI

client = <span class="c-fn">OpenAI</span>(
    api_key=<span class="c-str">"mp_••••••••••••••••"</span>,
    base_url=<span class="c-url">"https://engine.misterpilot.online/v1"</span>,
)

response = client.chat.completions.<span class="c-fn">create</span>(
    model=<span class="c-str">"deepseek-v4-pro"</span>,
    messages=[{
        <span class="c-key">"role"</span>: <span class="c-str">"user"</span>,
        <span class="c-key">"content"</span>: <span class="c-str">"Refactor this for performance"</span>,
    }],
    stream=<span class="c-kw">True</span>,
)

<span class="c-kw">for</span> chunk <span class="c-kw">in</span> response:
    <span class="c-fn">print</span>(chunk.choices[<span class="c-str">0</span>].delta.content, end=<span class="c-str">""</span>)`

export default function Hero() {
  const [chars, setChars] = useState(0)
  const plain = SNIPPET.replace(/<[^>]+>/g, '')
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setChars(c => {
        if (c >= plain.length) { clearInterval(timerRef.current); return c }
        return c + 1
      })
    }, 14)
    return () => clearInterval(timerRef.current)
  }, [])

  function buildHtml() {
    let visible = 0
    let result = ''
    let i = 0
    while (i < SNIPPET.length && visible < chars) {
      if (SNIPPET[i] === '<') {
        const end = SNIPPET.indexOf('>', i)
        result += SNIPPET.slice(i, end + 1)
        i = end + 1
      } else {
        result += SNIPPET[i]
        visible++
        i++
      }
    }
    return result
  }

  return (
    <section style={{ padding: '128px 32px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse at center, rgba(127,255,110,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

        {/* Left: text */}
        <div>
          <div className="label">⚡ OpenAI-Compatible · DeepSeek Powered</div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 20,
          }}>
            The AI coding<br />
            assistant <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>built for<br />developers</em>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 36, maxWidth: 420 }}>
            Drop-in replacement for the OpenAI API — powered by DeepSeek.
            Pay only for tokens you use — no subscriptions, no lock-in.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot"
              target="_blank" rel="noreferrer"
              className="btn btn-primary"
            >
              Install VS Code Extension
            </a>
            <a
              href="https://platform.misterpilot.online"
              target="_blank" rel="noreferrer"
              className="btn btn-secondary"
            >
              Get API Key →
            </a>
          </div>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { val: '₹0', label: 'Monthly fee' },
              { val: '₹50', label: 'Minimum top-up' },
              { val: '100%', label: 'PII redacted' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: code preview */}
        <div className="code-block" style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <div className="code-block-bar">
            <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            <span className="code-file">main.py</span>
          </div>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: buildHtml() }} />
            <span className="cursor">▊</span>
          </pre>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid > div:first-child > p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid > div:first-child > div:last-child {
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .hero-grid {
            gap: 32px !important;
          }
          .hero-grid > div:first-child > div:last-child {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
