import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const TABS = [
  {
    id: 'python',
    label: 'Python',
    file: 'main.py',
    code: `<span class="c-kw">from</span> openai <span class="c-kw">import</span> OpenAI

client = <span class="c-fn">OpenAI</span>(
    api_key=<span class="c-str">"your_misterpilot_key"</span>,
    base_url=<span class="c-url">"https://engine.misterpilot.online/v1"</span>,
)

response = client.chat.completions.<span class="c-fn">create</span>(
    model=<span class="c-str">"deepseek-v4-pro"</span>,
    messages=[{<span class="c-key">"role"</span>: <span class="c-str">"user"</span>, <span class="c-key">"content"</span>: <span class="c-str">"Hello!"</span>}],
    temperature=<span class="c-str">0.7</span>,
    max_tokens=<span class="c-str">1024</span>,
)

<span class="c-fn">print</span>(response.choices[<span class="c-str">0</span>].message.content)`,
  },
  {
    id: 'stream',
    label: 'Streaming',
    file: 'stream.py',
    code: `<span class="c-kw">from</span> openai <span class="c-kw">import</span> OpenAI

client = <span class="c-fn">OpenAI</span>(
    api_key=<span class="c-str">"your_misterpilot_key"</span>,
    base_url=<span class="c-url">"https://engine.misterpilot.online/v1"</span>,
)

stream = client.chat.completions.<span class="c-fn">create</span>(
    model=<span class="c-str">"deepseek-v4-flash"</span>,
    messages=[{<span class="c-key">"role"</span>: <span class="c-str">"user"</span>, <span class="c-key">"content"</span>: <span class="c-str">"Explain recursion"</span>}],
    stream=<span class="c-kw">True</span>,
)

<span class="c-kw">for</span> chunk <span class="c-kw">in</span> stream:
    delta = chunk.choices[<span class="c-str">0</span>].delta.content
    <span class="c-kw">if</span> delta:
        <span class="c-fn">print</span>(delta, end=<span class="c-str">""</span>, flush=<span class="c-kw">True</span>)`,
  },
  {
    id: 'curl',
    label: 'cURL',
    file: 'request.sh',
    code: `curl <span class="c-url">https://engine.misterpilot.online/v1/chat/completions</span> \\
  -H <span class="c-str">"Authorization: Bearer &lt;key&gt;"</span> \\
  -H <span class="c-str">"Content-Type: application/json"</span> \\
  -d <span class="c-str">'{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7,
    "max_tokens": 1024
  }'</span>`,
  },
]

const MODELS = [
  { id: 'deepseek-v4-pro', badge: 'Default', desc: 'Highest capability. Best for complex reasoning, code generation, and architecture decisions.', accent: true },
  { id: 'deepseek-v4-flash', badge: 'Fast', desc: 'Faster responses at lower cost. Great for autocomplete, quick Q&A, and high-throughput use cases.', accent: false },
]

const AUTH_METHODS = [
  { priority: '1', method: 'Authorization header', example: 'Authorization: Bearer <key>' },
  { priority: '2', method: 'JSON body field', example: '"apikey": "<key>"' },
  { priority: '3', method: 'Config file', example: 'Default key in config.yaml' },
]

export default function ApiSection() {
  const [activeTab, setActiveTab] = useState('python')
  const [headRef, headVisible] = useInView()
  const [codeRef, codeVisible] = useInView()
  const [modelsRef, modelsVisible] = useInView()

  const tab = TABS.find(t => t.id === activeTab)

  return (
    <section className="section" id="api" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">

        {/* Header */}
        <div ref={headRef} className={`fade-up ${headVisible ? 'visible' : ''}`} style={{ marginBottom: 56 }}>
          <div className="label">⚡ API Engine</div>
          <h2 className="title">Drop-in OpenAI<br /><em>replacement</em></h2>
          <p className="subtitle">
            Change two lines. That's it. Point any OpenAI SDK at our endpoint and keep
            your existing code — PII filtering and pay-as-you-go billing included.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 18px', marginBottom: 16 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Endpoint</span>
            <code style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>https://engine.misterpilot.online/v1</code>
          </div>
        </div>

        {/* Code tabs */}
        <div ref={codeRef} className={`fade-up ${codeVisible ? 'visible' : ''}`} style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '7px 16px', borderRadius: 6, cursor: 'pointer',
                  fontFamily: 'var(--font)', fontSize: '0.82rem', fontWeight: 600,
                  background: activeTab === t.id ? 'var(--surface)' : 'transparent',
                  color: activeTab === t.id ? 'var(--text)' : 'var(--text-dim)',
                  border: activeTab === t.id ? '1px solid var(--border-2)' : '1px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="code-block">
            <div className="code-block-bar">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
              <span className="code-file">{tab.file}</span>
            </div>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: tab.code }} />
            </pre>
          </div>
        </div>

        {/* Models + Auth side by side */}
        <div ref={modelsRef} className={`fade-up models-auth-grid ${modelsVisible ? 'visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Models */}
          <div className="card">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 20 }}>Supported Models</div>
            {MODELS.map(m => (
              <div key={m.id} style={{
                padding: '16px', borderRadius: 8, marginBottom: 10,
                background: m.accent ? 'rgba(127,255,110,0.05)' : 'var(--surface-2)',
                border: `1px solid ${m.accent ? 'rgba(127,255,110,0.2)' : 'var(--border)'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <code style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: m.accent ? 'var(--accent)' : 'var(--text)' }}>{m.id}</code>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: m.accent ? 'var(--accent)' : 'var(--text-dim)', background: m.accent ? 'var(--accent-dim)' : 'var(--surface)', border: `1px solid ${m.accent ? 'var(--accent-border)' : 'var(--border)'}`, padding: '2px 8px', borderRadius: 4 }}>{m.badge}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Auth Methods */}
          <div className="card">
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 20 }}>Authentication (Priority Order)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AUTH_METHODS.map(a => (
                <div key={a.priority} style={{
                  padding: '14px 16px', borderRadius: 8,
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: 'rgba(127,255,110,0.1)', border: '1px solid rgba(127,255,110,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--mono)',
                    }}>{a.priority}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{a.method}</span>
                  </div>
                  <code style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.73rem', color: 'var(--text-dim)', padding: '6px 10px', background: '#0a0a0a', borderRadius: 5, overflowX: 'auto', whiteSpace: 'nowrap' }}>{a.example}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .models-auth-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
