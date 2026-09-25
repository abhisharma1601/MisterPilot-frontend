import { Code, Callout, Table, Steps } from './ui'

export const ENGINE = 'https://engine.misterpilot.online/v1'
export const PLATFORM = 'https://platform.misterpilot.online'
export const MARKETPLACE = 'https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot'

const MODELS = [
  ['misterpilot-auto', 'MisterPilot', 'Picks the best model per request (see Auto routing)', '✓', '—'],
  ['deepseek-flash', 'DeepSeek', 'Fastest and cheapest — quick questions, small edits', '✓', '✓'],
  ['deepseek-v4-pro', 'DeepSeek', 'Default all-rounder for everyday coding', '✓', '✓'],
  ['gpt-5.4-nano', 'OpenAI', 'Tiny, high-volume tasks', '✓', '✓'],
  ['gpt-5.4-mini', 'OpenAI', 'Fast general coding and reasoning', '✓', '✓'],
  ['gpt-5.4', 'OpenAI', 'Strong general-purpose model', '✓', '✓'],
  ['gpt-5.5', 'OpenAI', 'Frontier reasoning for hard problems', '✓', '✓'],
  ['gpt-5.3-codex', 'OpenAI', 'Agentic coding and editing (never chosen by Auto)', '✓', '✓'],
  ['claude-haiku-4-5', 'Anthropic', 'Fast, low-cost Claude', '✓', '✓'],
  ['claude-sonnet-5', 'Anthropic', 'Excellent multi-file coding and refactoring', '✓', '✓'],
  ['claude-opus-5-5', 'Anthropic', 'Most capable — architecture and deep debugging', '✓', '✓'],
]

export const COPILOT_HOST = 'https://engine.misterpilot.online'

const COPILOT_MODELS_JSON = `
[
  {
    "name": "MisterPilot",
    "vendor": "customendpoint",
    "apiKey": "\${input:chat.lm.secret.xxxxxxx}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "misterpilot-auto",
        "name": "MisterPilot Auto",
        "url": "${COPILOT_HOST}",
        "toolCalling": true,
        "vision": false,
        "maxInputTokens": 200000,
        "maxOutputTokens": 32000
      },
      {
        "id": "deepseek-v4-pro",
        "name": "DeepSeek V4 Pro",
        "url": "${COPILOT_HOST}",
        "toolCalling": true,
        "vision": false,
        "maxInputTokens": 200000,
        "maxOutputTokens": 32000
      },
      {
        "id": "claude-sonnet-5",
        "name": "Claude Sonnet 5",
        "url": "${COPILOT_HOST}",
        "toolCalling": true,
        "vision": false,
        "maxInputTokens": 200000,
        "maxOutputTokens": 32000
      }
    ]
  }
]`

const PY = `
from openai import OpenAI

client = OpenAI(
    api_key="mp-your-misterpilot-key",
    base_url="${ENGINE}",
)

response = client.chat.completions.create(
    model="misterpilot-auto",
    messages=[
        {"role": "system", "content": "You are a senior Python reviewer."},
        {"role": "user", "content": "Review this function for bugs: ..."},
    ],
)

print(response.choices[0].message.content)`

const NODE = `
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.MISTERPILOT_API_KEY,
  baseURL: "${ENGINE}",
});

const response = await client.chat.completions.create({
  model: "deepseek-v4-pro",
  messages: [{ role: "user", content: "Write a debounce hook in TypeScript" }],
});

console.log(response.choices[0].message.content);`

const CURL = `
curl ${ENGINE}/chat/completions \\
  -H "Authorization: Bearer $MISTERPILOT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "misterpilot-auto",
    "messages": [{"role": "user", "content": "Explain Big-O of quicksort"}]
  }'`

const STREAM_PY = `
stream = client.chat.completions.create(
    model="deepseek-flash",
    messages=[{"role": "user", "content": "Explain recursion in one paragraph"}],
    stream=True,
)

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`

const STREAM_NODE = `
const stream = await client.chat.completions.create({
  model: "deepseek-flash",
  messages: [{ role: "user", content: "Explain recursion in one paragraph" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`

const TOOLS_PY = `
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Current weather for a city",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]

response = client.chat.completions.create(
    model="claude-sonnet-5",
    messages=[{"role": "user", "content": "Do I need an umbrella in Pune?"}],
    tools=tools,
)

call = response.choices[0].message.tool_calls[0]
print(call.function.name, call.function.arguments)`

const MODELS_CURL = `
curl ${ENGINE}/models \\
  -H "Authorization: Bearer $MISTERPILOT_API_KEY"`

const MCP_STDIO = `
"misterpilot.mcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx" }
  },
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp"]
  },
  "fetch": {
    "command": "uvx",
    "args": ["mcp-server-fetch"]
  }
}`

const MCP_HTTP = `
"misterpilot.mcpServers": {
  "internal-api": {
    "type": "http",
    "url": "https://your-mcp-server.com/mcp",
    "headers": { "Authorization": "Bearer your-token" }
  }
}`

const EXT_SETTINGS = `
// settings.json
{
  "misterpilot.contextWindow": 400000,
  "misterpilot.maxOutputTokens": 8192,
  "misterpilot.temperature": 0.2,
  "misterpilot.maxIterations": 40,
  "misterpilot.autoApprove.edits": true,
  "misterpilot.autoApprove.newFiles": false,
  "misterpilot.autoApprove.terminal": false
}`

const BYOK_PY = `
# Your own Anthropic key — billed by Anthropic, not MisterPilot.
client = OpenAI(api_key="sk-ant-...", base_url="${ENGINE}")
client.chat.completions.create(model="claude-sonnet-5", messages=[...])

# Your own DeepSeek key — use DeepSeek models with it.
client = OpenAI(api_key="sk-...", base_url="${ENGINE}")
client.chat.completions.create(model="deepseek-v4-pro", messages=[...])`

export const SECTIONS = [
  /* ───────────── Getting started ───────────── */
  {
    id: 'introduction', group: 'Getting started', title: 'Introduction',
    body: (
      <>
        <p>
          MisterPilot is an AI coding platform with three parts that share one account and one API key:
        </p>
        <ul>
          <li><strong>VS Code extension</strong>: an agent in your sidebar that reads, searches, edits and runs code in your workspace.</li>
          <li><strong>API engine</strong>: an OpenAI-compatible endpoint serving OpenAI, Claude and DeepSeek models, plus <code>misterpilot-auto</code>. It works with GitHub Copilot Chat, the OpenAI SDKs and any tool that speaks the OpenAI protocol.</li>
          <li><strong>Platform dashboard</strong>: API keys, wallet top-ups, usage and per-request costs.</li>
        </ul>
        <div className="docs-endpoint">
          <span className="eyebrow">Base URL</span>
          <code>{ENGINE}</code>
        </div>
        <div className="docs-cards">
          <a className="docs-card" href="#quickstart"><div className="docs-card-title">⚡ Quickstart →</div><div className="docs-card-text">From zero to your first answer in two minutes.</div></a>
          <a className="docs-card" href="#copilot-chat"><div className="docs-card-title">✦ Use with Copilot Chat →</div><div className="docs-card-text">Add MisterPilot models to the Copilot Chat model picker.</div></a>
          <a className="docs-card" href="#api-overview"><div className="docs-card-title">🔌 API reference →</div><div className="docs-card-text">Endpoints, auth, parameters and examples.</div></a>
          <a className="docs-card" href="#models"><div className="docs-card-title">🧠 Models →</div><div className="docs-card-text">Every model ID and when to use it.</div></a>
        </div>
      </>
    ),
  },
  {
    id: 'quickstart', group: 'Getting started', title: 'Quickstart',
    body: (
      <>
        <Steps>
          <li><strong>Create an account</strong>Sign up at <a href={PLATFORM} target="_blank" rel="noreferrer">platform.misterpilot.online</a> with Google or email.</li>
          <li><strong>Top up your wallet</strong>Add at least ₹99 via UPI. There is no monthly fee and your balance never expires.</li>
          <li><strong>Create an API key</strong>Generate a key in the dashboard. MisterPilot keys start with <code>mp-</code>.</li>
          <li><strong>Pick where to use it</strong>
            <ul style={{ marginTop: 6 }}>
              <li>In the <a href="#extension-setup">MisterPilot VS Code extension</a></li>
              <li>In <a href="#copilot-chat">GitHub Copilot Chat</a></li>
              <li>From your own code via the <a href="#api-overview">API</a></li>
            </ul>
          </li>
        </Steps>
        <Callout type="tip" title="Not sure which model to use?">
          Use <code>misterpilot-auto</code>. It scores each request and routes it to a model that fits, from fast DeepSeek models for quick questions up to Claude Opus for architecture work.
        </Callout>
      </>
    ),
  },
  {
    id: 'api-keys', group: 'Getting started', title: 'API keys',
    body: (
      <>
        <p>MisterPilot accepts two kinds of keys, in the extension, in Copilot Chat and in the API alike:</p>
        <Table
          head={['Key', 'Looks like', 'Billed by', 'Can use']}
          rows={[
            ['MisterPilot key', <code>mp-…</code>, 'Your MisterPilot wallet', <>All models, <strong>including</strong> <code>misterpilot-auto</code></>],
            ['Your own provider key (BYOK)', <><code>sk-…</code>, <code>sk-ant-…</code></>, 'Your provider directly', <>That provider's models. <strong>Not</strong> <code>misterpilot-auto</code></>],
          ]}
        />
        <p>
          Manage and revoke keys in the <a href={PLATFORM} target="_blank" rel="noreferrer">dashboard</a>. Treat keys like passwords:
          keep them in environment variables or VS Code's secret storage, never in source control.
        </p>
      </>
    ),
  },

  /* ───────────── VS Code extension ───────────── */
  {
    id: 'extension-setup', group: 'VS Code extension', title: 'Install & set up',
    body: (
      <>
        <p>Requires VS Code 1.85 or newer.</p>
        <Steps>
          <li><strong>Install</strong>Get <a href={MARKETPLACE} target="_blank" rel="noreferrer">MisterPilot from the Marketplace</a>, or search "MisterPilot" in the Extensions view (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>).</li>
          <li><strong>Set your key</strong>Open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS), run <strong>MisterPilot: Set API Key</strong> and paste your key. It is stored in VS Code's encrypted secret storage, not in settings.json.</li>
          <li><strong>Open the chat</strong>Click the MisterPilot icon in the activity bar.</li>
          <li><strong>Choose a model</strong>The model picker loads the models your key can use live from <code>/v1/models</code>. Choose <strong>misterpilot-auto</strong> to let Auto decide.</li>
          <li><strong>Ask</strong>Describe what you want: "why does this test fail?" or "add pagination to the orders endpoint".</li>
        </Steps>
        <h3>Commands</h3>
        <Table
          head={['Command', 'What it does']}
          rows={[
            ['MisterPilot: Set API Key', 'Store or replace your API key. Submit it empty to clear the key.'],
            ['MisterPilot: Set API Base URL', <>Point the extension at a different OpenAI-compatible endpoint. Leave it empty to use <code>{ENGINE}</code>.</>],
            ['MisterPilot: Configure MCP Servers', <>Open settings.json at <code>misterpilot.mcpServers</code>.</>],
          ]}
        />
      </>
    ),
  },
  {
    id: 'extension-usage', group: 'VS Code extension', title: 'Chat, context & diffs',
    body: (
      <>
        <p>
          The agent runs <strong>locally inside VS Code</strong>. File reads, searches, diagnostics and edits happen on your machine,
          and only model requests go to the engine. For each message the agent can chain up to 40 tool calls (configurable) until the task is done.
        </p>
        <h3>What the agent already knows</h3>
        <ul>
          <li>Your workspace layout and the files you have open</li>
          <li>Selected code and your current git branch</li>
          <li>Compiler and linter diagnostics from VS Code's language servers</li>
        </ul>
        <h3>Reviewing changes</h3>
        <p>
          Every file edit appears as a <strong>diff card</strong> that you approve or reject before anything is written to disk. Terminal commands
          also wait for your approval, unless you turn on <a href="#always-allow">Always Allow</a>.
        </p>
        <h3>Large codebases</h3>
        <p>
          Set the context window anywhere from <strong>128K to 1M tokens</strong> with the ⚙️ button in the chat panel or the <code>misterpilot.contextWindow</code> setting.
          When a conversation outgrows it, older history and bulky tool output are trimmed automatically so the session keeps working.
        </p>
        <Callout type="tip">
          Keep the context window at or below the model's own limit. Larger windows mean more tokens per request, and so more cost.
        </Callout>
      </>
    ),
  },
  {
    id: 'agent-tools', group: 'VS Code extension', title: 'Agent tools',
    body: (
      <>
        <p>These are the built-in tools the agent can call. MCP servers add more (see <a href="#mcp">MCP servers</a>).</p>
        <Table
          head={['Tool', 'What it does', 'Needs approval']}
          rows={[
            [<code>read_file</code>, 'Reads a file with line numbers. Large files are paged with offset/limit.', 'No'],
            [<code>list_directory</code>, 'Lists one directory (not recursive).', 'No'],
            [<code>list_files</code>, 'Recursive workspace tree, skipping dependency and build folders (max 500).', 'No'],
            [<code>find_files</code>, <>Glob search, e.g. <code>**/*.test.ts</code>. Respects files.exclude.</>, 'No'],
            [<code>search_code</code>, 'Exact-text search across the workspace with ripgrep (max 50 matches).', 'No'],
            [<code>get_diagnostics</code>, 'Errors and warnings from VS Code language servers.', 'No'],
            [<code>replace_in_file</code>, 'Replaces one exact, unique snippet: the preferred way to edit.', 'Yes (diff)'],
            [<code>write_file</code>, 'Creates a file, or overwrites one with full content.', 'Yes (diff)'],
            [<code>execute_terminal</code>, 'Runs a shell command in the workspace root; killed after a timeout.', 'Yes'],
          ]}
        />
      </>
    ),
  },
  {
    id: 'always-allow', group: 'VS Code extension', title: 'Approvals & Always Allow',
    body: (
      <>
        <p>
          By default you approve every edit, new file and terminal command. <strong>Always Allow</strong> lets you skip the approval
          for each kind of action separately:
        </p>
        <Table
          head={['Setting', 'Skips approval for']}
          rows={[
            [<code>misterpilot.autoApprove.edits</code>, 'Edits to existing files'],
            [<code>misterpilot.autoApprove.newFiles</code>, 'Creating new files'],
            [<code>misterpilot.autoApprove.terminal</code>, 'Terminal commands'],
          ]}
        />
        <Callout type="warn" title="Destructive commands always ask.">
          Even with terminal auto-approve on, commands like <code>rm -rf</code>, <code>git push --force</code> and <code>DROP TABLE</code> still need your confirmation.
        </Callout>
      </>
    ),
  },
  {
    id: 'mcp', group: 'VS Code extension', title: 'MCP servers',
    body: (
      <>
        <p>
          The <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">Model Context Protocol</a> connects the agent to external tools such as GitHub,
          browsers, databases or your own services. The config format is the same one Claude Desktop uses. Run <strong>MisterPilot: Configure MCP Servers</strong> or edit settings.json directly.
        </p>
        <h3>Local servers (stdio)</h3>
        <Code lang="jsonc" file="settings.json" code={MCP_STDIO} />
        <h3>Remote servers (HTTP)</h3>
        <Code lang="jsonc" file="settings.json" code={MCP_HTTP} />
        <p>
          Servers connect in the background when the chat panel opens, and their tools are discovered automatically. The agent sees them as
          <code>mcp__&lt;server&gt;__&lt;tool&gt;</code> and calls them when your request needs them, e.g. <em>"open a GitHub issue for the bug we just fixed"</em>.
        </p>
      </>
    ),
  },
  {
    id: 'extension-settings', group: 'VS Code extension', title: 'Settings reference',
    body: (
      <>
        <Table
          head={['Setting', 'Default', 'Description']}
          rows={[
            [<code>misterpilot.baseUrl</code>, <em>empty</em>, <>OpenAI-compatible base URL. Leave it empty to use the MisterPilot engine.</>],
            [<code>misterpilot.models</code>, <code>["deepseek-v4-pro", …]</code>, <>Fallback model list, used only when <code>GET /models</code> fails.</>],
            [<code>misterpilot.contextWindow</code>, '128000', 'Context window in tokens (128K–1M).'],
            [<code>misterpilot.maxOutputTokens</code>, '8192', 'Tokens reserved for each reply.'],
            [<code>misterpilot.temperature</code>, '0.2', 'Sampling temperature (0–2).'],
            [<code>misterpilot.maxIterations</code>, '40', 'Maximum model ↔ tool round trips per message before the agent pauses.'],
            [<code>misterpilot.terminalTimeoutSeconds</code>, '120', 'Agent-run commands are killed after this many seconds.'],
            [<code>misterpilot.mcpServers</code>, <code>{'{}'}</code>, <>MCP server definitions (see <a href="#mcp">MCP servers</a>).</>],
            [<code>misterpilot.autoApprove.*</code>, 'false', <>Always Allow switches (see <a href="#always-allow">Approvals</a>).</>],
          ]}
        />
        <Code lang="jsonc" file="settings.json" code={EXT_SETTINGS} />
      </>
    ),
  },

  /* ───────────── Copilot Chat ───────────── */
  {
    id: 'copilot-chat', group: 'GitHub Copilot Chat', title: 'Use MisterPilot in Copilot Chat',
    body: (
      <>
        <p>
          Already use GitHub Copilot Chat? Add MisterPilot as a <strong>custom endpoint</strong> and its models, including
          <code>misterpilot-auto</code>, appear in Copilot's model picker. Your chat UI, Ask/Edit/Agent modes and keybindings all stay the same.
        </p>
        <h3>Before you start</h3>
        <ul>
          <li>An up-to-date VS Code with the GitHub Copilot Chat extension, signed in to GitHub (the Copilot Free plan works).</li>
          <li>A MisterPilot key (<code>mp-…</code>) from the <a href={PLATFORM} target="_blank" rel="noreferrer">dashboard</a>.</li>
        </ul>
        <Steps>
          <li><strong>Open model management</strong>Open the Chat view (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>), click the model picker and choose <strong>Manage Models…</strong> (or run <strong>Chat: Manage Language Models</strong> from the Command Palette).</li>
          <li><strong>Add a custom endpoint</strong>Add a new <strong>custom endpoint</strong> provider, name it <strong>MisterPilot</strong>, use the <strong>Chat Completions</strong> API type and paste your MisterPilot key when asked. VS Code stores the key as a secret, not in plain text.</li>
          <li><strong>Add the models</strong>VS Code saves the provider in <code>chatLanguageModels.json</code> in your VS Code user folder. Open it and list the models you want under <code>models</code>:</li>
        </Steps>
        <Code lang="json" file="chatLanguageModels.json" code={COPILOT_MODELS_JSON} />
        <Table
          head={['Field', 'Value']}
          rows={[
            [<code>vendor</code>, <code>"customendpoint"</code>],
            [<code>apiType</code>, <code>"chat-completions"</code>],
            [<code>apiKey</code>, <>Filled in by VS Code (<code>{'${input:chat.lm.secret.…}'}</code>). Keep the value VS Code wrote. <strong>Don't</strong> paste your raw key here.</>],
            [<code>id</code>, <>An exact MisterPilot model ID from <a href="#models">Models</a>.</>],
            [<code>url</code>, <><code>{COPILOT_HOST}</code>, the host <strong>without</strong> <code>/v1</code>.</>],
            [<code>toolCalling</code>, <><code>true</code>. Needed for Agent mode.</>],
            [<code>maxInputTokens</code>, <>Context budget Copilot will use, e.g. <code>200000</code>.</>],
            [<code>maxOutputTokens</code>, <>Reply budget, e.g. <code>32000</code>.</>],
          ]}
        />
        <Table
          head={['OS', 'chatLanguageModels.json location']}
          rows={[
            ['Windows', <code>%APPDATA%\Code\User\chatLanguageModels.json</code>],
            ['macOS', <code>~/Library/Application Support/Code/User/chatLanguageModels.json</code>],
            ['Linux', <code>~/.config/Code/User/chatLanguageModels.json</code>],
          ]}
        />
        <Steps start={4}>
          <li><strong>Pick a model</strong>Save the file, then choose <strong>MisterPilot Auto</strong> (or any model you added) in the chat model picker.</li>
          <li><strong>Chat as usual</strong>Ask, Edit and Agent modes all work. Tool calling is supported, so Agent mode can edit files and run commands.</li>
        </Steps>
        <Callout type="tip" title="How Auto handles Copilot requests.">
          Copilot wraps every message in a large harness (tool catalogue, editor context, history). Auto scores only the words <strong>you</strong> typed,
          so a one-line rename still goes to a fast model. The chosen model is shown at the top of each Auto reply.
        </Callout>
        <Callout type="note" title="Models not showing up?">
          Make sure the file is valid JSON (an array of providers), every <code>id</code> is an exact model ID, and <code>url</code> has no <code>/v1</code>.
          Menu names can differ between VS Code versions, so update VS Code if you can't find the custom endpoint option. On Copilot Business/Enterprise, your org admin may need to allow custom models.
        </Callout>
        <h3>Other OpenAI-compatible tools</h3>
        <p>The same three values work in any tool with an "OpenAI compatible" provider, such as Cline, Roo Code, Continue, Zed, LangChain or LlamaIndex:</p>
        <Table
          head={['Field', 'Value']}
          rows={[
            ['Base URL', <code>{ENGINE}</code>],
            ['API key', <>Your <code>mp-…</code> key (or a provider key, see <a href="#byok">BYOK</a>)</>],
            ['Model ID', <>Any ID from <a href="#models">Models</a>, e.g. <code>misterpilot-auto</code></>],
          ]}
        />
      </>
    ),
  },

  /* ───────────── API ───────────── */
  {
    id: 'api-overview', group: 'API', title: 'API overview',
    body: (
      <>
        <p>
          The engine is a drop-in replacement for the OpenAI Chat Completions API. Point any OpenAI SDK at the base URL, pass your key and you're done.
        </p>
        <div className="docs-endpoint"><span className="eyebrow">Base URL</span><code>{ENGINE}</code></div>
        <Table
          head={['Method', 'Path', 'Description']}
          rows={[
            [<code>GET</code>, <code>/v1/models</code>, 'Lists the models your key can use.'],
            [<code>POST</code>, <code>/v1/chat/completions</code>, 'Chat completion, with streaming and tool calling.'],
          ]}
        />
        <h3>Authentication</h3>
        <p>Send your key as a bearer token (preferred), or as an <code>apikey</code> field in the JSON body:</p>
        <Code lang="text" code={'Authorization: Bearer mp-your-misterpilot-key'} />
        <h3>Quick example</h3>
        <Code tabs={[
          { label: 'Python', lang: 'python', code: PY },
          { label: 'Node.js', lang: 'js', code: NODE },
          { label: 'cURL', lang: 'bash', code: CURL },
        ]} />
        <p>Also try requests in the browser, with no code, in the <a href="https://engine.misterpilot.online/playground" target="_blank" rel="noreferrer">API Playground</a>.</p>
      </>
    ),
  },
  {
    id: 'chat-completions', group: 'API', title: 'Chat completions',
    body: (
      <>
        <p><code>POST /v1/chat/completions</code> accepts the standard OpenAI request body.</p>
        <Table
          head={['Parameter', 'Type', 'Default', 'Notes']}
          rows={[
            [<code>model</code>, 'string', <em>required</em>, <>A model ID from <a href="#models">Models</a>. Case-insensitive.</>],
            [<code>messages</code>, 'array', <em>required</em>, <><code>system</code>, <code>user</code>, <code>assistant</code> and <code>tool</code> roles.</>],
            [<code>stream</code>, 'boolean', 'false', 'Server-sent events, token by token.'],
            [<code>temperature</code>, 'number', '0.7', 'Ignored where a model only supports its default (OpenAI GPT-5.x, Claude 5 models).'],
            [<code>max_tokens</code>, 'integer', '8192', <>Reply budget. Converted to <code>max_completion_tokens</code> for OpenAI automatically.</>],
            [<code>tools</code>, 'array', '—', 'OpenAI-format function definitions.'],
            [<code>tool_choice</code>, 'string | object', '—', <><code>"auto"</code>, <code>"none"</code> or a specific function.</>],
          ]}
        />
        <p>Provider differences are handled for you, so the same request body works for every model.</p>
      </>
    ),
  },
  {
    id: 'streaming', group: 'API', title: 'Streaming',
    body: (
      <>
        <p>Set <code>stream: true</code> to receive tokens as they are generated. Streamed responses also report usage, so every request is metered accurately.</p>
        <Code tabs={[
          { label: 'Python', lang: 'python', code: STREAM_PY },
          { label: 'Node.js', lang: 'js', code: STREAM_NODE },
        ]} />
      </>
    ),
  },
  {
    id: 'tool-calling', group: 'API', title: 'Tool calling',
    body: (
      <>
        <p>
          Define functions in <code>tools</code>. The model replies with <code>tool_calls</code>, you run them, then send the results back as
          <code>tool</code> messages. This is exactly the OpenAI flow, and it works across providers.
        </p>
        <Code lang="python" file="tools.py" code={TOOLS_PY} />
      </>
    ),
  },
  {
    id: 'list-models', group: 'API', title: 'List models',
    body: (
      <>
        <p><code>GET /v1/models</code> returns the models your key can call, in OpenAI's <code>{'{ "object": "list", "data": [...] }'}</code> format.</p>
        <Code lang="bash" code={MODELS_CURL} />
        <ul>
          <li>A <strong>MisterPilot key</strong> sees <code>misterpilot-auto</code> and every supported model.</li>
          <li>A <strong>provider key</strong> sees the supported models, but not <code>misterpilot-auto</code>.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'errors', group: 'API', title: 'Errors',
    body: (
      <>
        <p>Errors use standard HTTP status codes, with a human-readable <code>detail</code> message.</p>
        <Table
          head={['Status', 'Meaning', 'What to do']}
          rows={[
            ['400', 'Unsupported model', <>Check the ID against <a href="#models">Models</a>. The message lists every valid ID.</>],
            ['401', 'Missing or invalid key, or low balance', 'Check the key, or top up your wallet in the dashboard.'],
            ['403', <><code>misterpilot-auto</code> called with a provider key</>, <>Auto needs a MisterPilot key. Use an <code>mp-…</code> key or call a model directly.</>],
            ['502', 'Upstream provider error', 'The provider failed. Retry, or try another model.'],
            ['503', 'Service temporarily unavailable', 'Retry with exponential backoff.'],
          ]}
        />
      </>
    ),
  },

  /* ───────────── Models ───────────── */
  {
    id: 'models', group: 'Models', title: 'Supported models',
    body: (
      <>
        <p>Use these IDs in the extension, Copilot Chat, or the <code>model</code> field of the API.</p>
        <Table
          head={['Model ID', 'Provider', 'Best for', 'MisterPilot key', 'Own key']}
          rows={MODELS.map(([id, ...rest]) => [<code>{id}</code>, ...rest])}
        />
        <Callout type="note">
          This list changes as providers ship new models. <code>GET /v1/models</code> is always the source of truth for your key.
          See per-request prices in your <a href={PLATFORM} target="_blank" rel="noreferrer">dashboard</a>.
        </Callout>
      </>
    ),
  },
  {
    id: 'auto-routing', group: 'Models', title: 'MisterPilot Auto',
    body: (
      <>
        <p>
          <code>misterpilot-auto</code> scores each request from <strong>1 to 20</strong> for engineering difficulty and sends it to the matching model.
          The score is based on the task (explain, edit, bug fix, feature, architecture…), its scope, security sensitivity and how much reasoning it needs.
        </p>
        <Table
          head={['Score', 'Typical request', 'Routed to']}
          rows={[
            ['1–3', '"Explain this function"', <code>deepseek-flash</code>],
            ['4–6', '"Add pagination to this endpoint"', <code>deepseek-v4-pro</code>],
            ['7–10', 'Multi-step bug fixes, focused refactors', <code>gpt-5.4-mini</code>],
            ['11–14', '"Implement OAuth login with refresh tokens"', <code>claude-sonnet-5</code>],
            ['15–17', 'Cross-cutting features, tricky debugging', <code>gpt-5.5</code>],
            ['18–20', '"Design a payment system for 10M users"', <code>claude-opus-5-5</code>],
          ]}
        />
        <ul>
          <li><strong>Conversation-aware:</strong> a follow-up in a hard conversation isn't dropped straight to a tiny model, and very long contexts get a stronger model.</li>
          <li><strong>Fallbacks:</strong> if the chosen model is unavailable, Auto falls back to <code>deepseek-v4-pro</code> instead of failing.</li>
          <li><strong>Transparent:</strong> the routed model is shown at the top of each reply.</li>
          <li><strong>Billing:</strong> you pay the price of the model Auto actually used.</li>
        </ul>
        <Callout type="warn" title="MisterPilot keys only.">
          Auto runs on MisterPilot infrastructure and is billed to your wallet, so it doesn't accept provider keys (the API returns 403).
        </Callout>
      </>
    ),
  },
  {
    id: 'byok', group: 'Models', title: 'Bring your own key',
    body: (
      <>
        <p>
          Already pay OpenAI, Anthropic or DeepSeek? Send your provider key instead of a MisterPilot key. The engine forwards it to that provider
          and <strong>MisterPilot doesn't bill you</strong> for those requests.
        </p>
        <ul>
          <li>The provider is chosen from the <strong>model</strong>, so use models from the provider your key belongs to.</li>
          <li><code>misterpilot-auto</code> isn't available with provider keys.</li>
        </ul>
        <Code lang="python" code={BYOK_PY} />
        <p>
          <strong>In the extension:</strong> run <strong>MisterPilot: Set API Key</strong> with your provider key and choose that provider's models in the picker.
        </p>
      </>
    ),
  },

  /* ───────────── Account ───────────── */
  {
    id: 'billing', group: 'Account', title: 'Billing & usage',
    body: (
      <>
        <Table
          head={['', '']}
          rows={[
            ['Monthly fee', '₹0 (pay as you go)'],
            ['Minimum top-up', '₹99 via UPI (no credit card)'],
            ['Balance expiry', 'Never'],
            ['What you pay', 'Tokens used × the price of the model that served the request'],
            ['Provider keys (BYOK)', 'Billed by your provider, not your MisterPilot wallet'],
          ]}
        />
        <p>
          The <a href={PLATFORM} target="_blank" rel="noreferrer">dashboard</a> shows real-time requests, token usage per model, per-request cost,
          activity logs and wallet history.
        </p>
        <Callout type="tip" title="Keep costs down:">
          use <code>misterpilot-auto</code> so simple questions go to cheap models, and keep <code>misterpilot.contextWindow</code> only as large as you need.
        </Callout>
      </>
    ),
  },
  {
    id: 'privacy', group: 'Account', title: 'Privacy & security',
    body: (
      <>
        <ul>
          <li><strong>Local agent:</strong> file reads, searches and edits happen on your machine. Only model requests leave it.</li>
          <li><strong>PII & secret redaction:</strong> requests through the engine are scanned for secrets and personal data (API keys, tokens, private keys, database URLs, emails, phone numbers…) and replaced with placeholders before they reach the model. Scanning happens in memory and nothing is written to disk.</li>
          <li><strong>Key storage:</strong> the extension keeps your key in VS Code's encrypted secret storage. MisterPilot's own provider credentials live in AWS Secrets Manager.</li>
          <li><strong>You approve changes:</strong> every edit is a diff you review, unless you opt into Always Allow.</li>
        </ul>
      </>
    ),
  },

  /* ───────────── Help ───────────── */
  {
    id: 'troubleshooting', group: 'Help', title: 'Troubleshooting',
    body: (
      <>
        <h3>"Invalid or Low Balance in MisterPilot API key"</h3>
        <p>Either the key is wrong or revoked, or your wallet is empty. Check the key in the dashboard and top up.</p>
        <h3>Model picker is empty or shows old models</h3>
        <p>
          The extension fetches <code>/v1/models</code> with your key. Check the key is set (<strong>MisterPilot: Set API Key</strong>) and that
          <code>misterpilot.baseUrl</code> is empty or correct. If the request fails, the <code>misterpilot.models</code> fallback list is shown instead.
        </p>
        <h3>"Unsupported model"</h3>
        <p>The model ID isn't in the <a href="#models">supported list</a>. The error message lists every valid ID.</p>
        <h3>403 when using misterpilot-auto</h3>
        <p>You're using a provider key. Auto needs an <code>mp-…</code> key.</p>
        <h3>The agent stops mid-task</h3>
        <p>It reached <code>misterpilot.maxIterations</code> (default 40). Reply "continue", or raise the limit.</p>
        <h3>A terminal command was killed</h3>
        <p>Commands time out after <code>misterpilot.terminalTimeoutSeconds</code> (default 120). Don't ask the agent to start servers or watchers. Run those yourself.</p>
        <h3>MCP tools don't appear</h3>
        <p>Make sure the server's command (<code>npx</code>, <code>uvx</code>…) is on your PATH, then reopen the chat panel. Connection errors are logged to <strong>Output → Log (Extension Host)</strong>.</p>
        <h3>Still stuck?</h3>
        <p>Email <a href="mailto:chiefmr12@gmail.com">support</a> with the error message and your extension version.</p>
      </>
    ),
  },
]
