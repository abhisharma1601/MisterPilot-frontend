import { useState } from 'react'

const KEYWORDS = new Set([
  'from', 'import', 'const', 'let', 'await', 'async', 'for', 'in', 'of', 'if', 'else', 'return',
  'True', 'False', 'None', 'true', 'false', 'null', 'def', 'print', 'new', 'export', 'function',
])

// Tiny, dependency-free highlighter: comments, strings, JSON keys, numbers, keywords.
const TOKEN = /(\/\/[^\n]*|#(?![0-9a-f]{3,6}\b)[^\n]*)|("(?:[^"\\\n]|\\.)*"(?=\s*:)|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]+\b)/g

function highlight(code, lang) {
  if (lang === 'text') return code
  const out = []
  let last = 0
  let m
  let i = 0
  while ((m = TOKEN.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const [tok, com, str, num, word] = m
    // Shell/JSON have no // or # comments mid-URL; only treat # as a comment at line start or after space.
    if (com && (lang === 'json' || (com.startsWith('//') && /:$/.test(code.slice(0, m.index))))) {
      out.push(tok)
    } else if (com) out.push(<span key={i++} className="tok-com">{tok}</span>)
    else if (str) {
      const isKey = /^"/.test(str) && /^\s*:/.test(code.slice(m.index + str.length))
      out.push(<span key={i++} className={isKey ? 'tok-key' : 'tok-str'}>{tok}</span>)
    } else if (num) out.push(<span key={i++} className="tok-num">{tok}</span>)
    else if (word && KEYWORDS.has(word) && lang !== 'bash') out.push(<span key={i++} className="tok-kw">{tok}</span>)
    else out.push(tok)
    last = m.index + tok.length
  }
  out.push(code.slice(last))
  return out
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch { /* clipboard blocked — leave the button as is */ }
  }
  return <button className={`doc-copy ${done ? 'done' : ''}`} onClick={copy}>{done ? '✓ Copied' : 'Copy'}</button>
}

/** A code block. Pass `code` + `lang` + `file`, or `tabs: [{label, code, lang, file}]`. */
export function Code({ code, lang = 'text', file, tabs }) {
  const [active, setActive] = useState(0)
  const cur = tabs ? tabs[active] : { code, lang, file }
  const text = cur.code.replace(/^\n/, '').replace(/\s+$/, '')
  return (
    <div className="code-block doc-code">
      <div className="code-block-bar">
        <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
        {tabs ? (
          <div className="doc-code-tabs" role="tablist">
            {tabs.map((t, i) => (
              <button key={t.label} role="tab" aria-selected={i === active} className={`doc-code-tab ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
                {t.label}
              </button>
            ))}
          </div>
        ) : cur.file && <span className="code-file">{cur.file}</span>}
        <CopyButton text={text} />
      </div>
      <pre><code>{highlight(text, cur.lang || 'text')}</code></pre>
    </div>
  )
}

export function Callout({ type = 'note', title, children }) {
  const icon = { note: 'ℹ️', tip: '💡', warn: '⚠️' }[type]
  return (
    <div className={`callout ${type}`}>
      <span className="callout-icon">{icon}</span>
      <div>{title && <strong>{title} </strong>}{children}</div>
    </div>
  )
}

export function Table({ head, rows }) {
  return (
    <div className="cmp-wrap">
      <table className="cmp">
        <thead><tr>{head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Steps({ start = 1, children }) {
  return <ol className="docs-steps" style={{ counterReset: `step ${start - 1}` }}>{children}</ol>
}
