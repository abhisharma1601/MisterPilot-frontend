import Reveal, { SectionHead } from './Reveal'

export const FAQS = [
  {
    q: 'What is MisterPilot Auto?',
    a: 'Auto is MisterPilot\'s automatic model selection. It looks at each request — the type of task, how complex it is and how much code it involves — and sends it to the most suitable model. Quick questions go to fast, low-cost models; big architectural work goes to frontier models. You can still pick a model manually whenever you want.',
  },
  {
    q: 'Which AI models can I use?',
    a: 'MisterPilot gives you models from OpenAI, Anthropic (Claude) and DeepSeek in one extension, including GPT-5.5, Claude Opus 5.5, Claude Sonnet 5 and DeepSeek V4 Pro. Use them through Auto, or choose one yourself. The full list is in the docs.',
  },
  {
    q: 'Can I use my own API keys?',
    a: 'Yes. Connect your own OpenAI, Claude or DeepSeek API keys and you are billed directly by that provider, using your existing credits and limits. Or skip the setup and use a MisterPilot wallet for everything — MisterPilot Auto runs on wallet credits.',
  },
  {
    q: 'How is MisterPilot different from Cursor, Windsurf or Claude Code?',
    a: 'MisterPilot is an extension for the VS Code you already use — not a separate editor to migrate to. You pay per token instead of a monthly seat, you can bring your own keys, and Auto routes each request across multiple providers so you are not locked into one vendor\'s models.',
  },
  {
    q: 'Does it work with GitHub Copilot Chat?',
    a: 'Yes. MisterPilot is Copilot Chat compatible, so the chat workflows you already use in VS Code carry over. Add MisterPilot as a custom endpoint in Copilot Chat and pick MisterPilot Auto — the docs walk through it step by step.',
  },
  {
    q: 'How large a codebase can it handle?',
    a: 'MisterPilot supports context windows of up to 1 million tokens, so it can keep large codebases and long-running conversations in view without losing track.',
  },
  {
    q: 'Is my code private?',
    a: 'The agent runs locally inside VS Code, so file reads, searches and edits happen on your machine. Messages sent to the model pass through server-side PII redaction that strips secrets and personal data in RAM — nothing is written to disk.',
  },
  {
    q: 'What is MCP?',
    a: 'The Model Context Protocol is an open standard for connecting AI to external tools. With MCP, MisterPilot can work with GitHub, databases, browsers, web fetch and your own internal services.',
  },
  {
    q: 'How much does it cost?',
    a: '₹0 per month. You pay only for the tokens you use, starting with a ₹99 UPI top-up that never expires. No credit card and no subscription. With your own keys, your provider bills you directly.',
  },
  {
    q: 'What is "Always Allow"?',
    a: 'An upcoming feature that lets you auto-approve safe agent operations — like reading files or running tests — while destructive actions such as deleting files or pushing code still require your confirmation.',
  },
]

export default function FAQ() {
  return (
    <section className="section" id="faq" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container faq-grid">
        <SectionHead
          label="❓ FAQ"
          title={<>Questions, <em>answered</em></>}
          subtitle="Everything you need to know before you install. Still curious? Email support any time."
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
            <a href="/docs/" className="btn btn-secondary btn-sm">Read the docs →</a>
            <a href="mailto:info@misterpilot.online" className="btn btn-ghost btn-sm">Contact support</a>
          </div>
        </SectionHead>

        <Reveal>
          {FAQS.map((f, i) => (
            <details key={f.q} className="faq-item" open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>

      <style>{`
        .faq-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 56px; align-items: start; }
        .faq-grid .faq-item:first-child summary { padding-top: 0; }
        @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr; gap: 0; } }
      `}</style>
    </section>
  )
}
