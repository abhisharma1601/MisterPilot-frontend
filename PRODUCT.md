# MisterPilot — Product Overview

> *"Your AI coding assistant, built for developers."*  
> Built for developers, by developers. State-of-the-art coding intelligence at a fraction of the cost.

---

## What MisterPilot Is

MisterPilot is a **DeepSeek API gateway + AI coding platform** with three distinct product surfaces:

1. **API Engine** — OpenAI-compatible proxy to DeepSeek models with built-in PII protection
2. **VS Code Extension** — Agentic AI coding assistant embedded directly in the editor
3. **Platform Dashboard** — Pay-as-you-go billing, usage analytics, and API key management

---

## 1. API Engine

**Endpoint:** `https://engine.misterpilot.online/v1`  
**Drop-in replacement** for the OpenAI API — change `base_url` and API key, nothing else.

### Chat Completions

```
POST /v1/chat/completions
```

**Authentication** (resolved in priority order):
1. `Authorization: Bearer <key>` header
2. `"apikey"` field in the JSON body
3. Default key from `config.yaml`

### Supported Models

| Model | Description |
|---|---|
| `deepseek-v4-pro` | Default — highest capability |
| `deepseek-v4-flash` | Faster, lighter responses |
| Any DeepSeek model | Accessible via your DeepSeek API key |

### Integration Methods

**Python (OpenAI SDK)**
```python
from openai import OpenAI

client = OpenAI(
    api_key="your_misterpilot_key",
    base_url="https://engine.misterpilot.online/v1",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "Hello"}],
    temperature=0.7,
    max_tokens=1024,
)
```

**Streaming**
```python
stream = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Explain recursion"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
```

**cURL**
```bash
curl https://engine.misterpilot.online/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-pro","messages":[{"role":"user","content":"Hello"}]}'
```

### Key Parameters
- `temperature` — controls randomness (e.g. `0.7`)
- `max_tokens` — cap on response length (e.g. `256`–`1024`)
- `stream` — `true` for token-by-token streaming
- `messages` — array with `system` and `user` roles

---

## 2. PII Protection

Every message is **automatically scanned and redacted** before it reaches the model.  
No configuration required — on by default for all requests.

**Redacted data types:**
- Email addresses
- Phone numbers
- IP addresses
- Credit card numbers
- Social Security Numbers (SSNs)

---

## 3. VS Code Extension

An **agentic AI coding assistant** embedded in the VS Code sidebar.

**Install:** [VS Code Marketplace → MisterPilot](https://marketplace.visualstudio.com/items?itemName=MisterPilot.misterpilot)

### Setup (3 steps)
1. Install the extension from the VS Code Marketplace
2. Configure your MisterPilot API key in extension settings
3. Open the sidebar chat and start coding

### Features

| Feature | Description |
|---|---|
| **Sidebar Chat** | Conversational AI with full codebase comprehension |
| **Diff Review** | Every file edit shown as a diff card — you approve before any write |
| **Workspace Search** | Searches your entire workspace using ripgrep for symbols and code |
| **Terminal Execution** | Runs terminal commands directly within the extension |
| **Local Execution** | All file operations happen on your machine |
| **PII Filtering** | Personal data is redacted before any message leaves your machine |

### Why it's different
- No expensive subscription — uses your MisterPilot API key (pay per use)
- You approve every code change before it's written to disk
- Works offline for file operations; only API calls leave the machine

---

## 4. Platform Dashboard

**URL:** `https://platform.misterpilot.online`

The control centre for billing, usage, and API key management.

### Billing Model

| | |
|---|---|
| **Model** | Pay As You Go — no monthly subscription |
| **Minimum top-up** | ₹50 |
| **Payment** | UPI wallet |
| **Balance expiry** | Never |
| **Credit card required** | No |

> Pay only for actual token usage. Your balance carries forward indefinitely.

### Dashboard Features

- **API Key Management** — generate, revoke, and manage key lifecycle
- **Real-time Request Tracking** — live count of API calls
- **Token Usage Breakdown** — per model, daily and monthly trends
- **Cost Visualization** — per-request cost visibility
- **Recent Activity Logs** — timestamped history of requests
- **Wallet Balance** — current credit, top-up history

### Authentication
- Google Sign-In
- Email / password

---

## 5. API Playground

**URL:** `https://engine.misterpilot.online/playground`

A browser-based interface to test the API directly — no SDK or terminal required.  
Supports both streaming and non-streaming modes with full parameter control.

---

## Quick Reference

| Surface | URL |
|---|---|
| API Engine | `https://engine.misterpilot.online/v1` |
| Documentation | `https://platform.misterpilot.online/docs` |
| API Playground | `https://engine.misterpilot.online/playground` |
| Platform Dashboard | `https://platform.misterpilot.online` |
| VS Code Extension | VS Code Marketplace → search "MisterPilot" |

---

## Target Audience

- **Individual developers** who want AI coding assistance without a costly Copilot/Cursor subscription
- **Teams** building LLM-powered applications on DeepSeek models via an OpenAI-compatible interface
- **Builders** who need privacy guarantees (PII filtering) without self-hosting a proxy
