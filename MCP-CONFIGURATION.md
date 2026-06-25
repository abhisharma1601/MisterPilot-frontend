# MCP Configuration Guide

MisterPilot supports connecting to any MCP (Model Context Protocol) server, giving the AI access to external tools like GitHub, web browsing, databases, and more.

---

## How it works

Once configured, MisterPilot connects to your MCP servers in the background when you open the panel. Tools are discovered automatically and made available to the AI — it will call them whenever your request involves an external service.

---

## Where to configure

Open VS Code settings (`Ctrl+,` or `Cmd+,`) and search for **MisterPilot MCP Servers**, or edit `settings.json` directly:

```json
"misterpilot.mcpServers": {
  "server-name": { ... }
}
```

Each key is the name you give the server. The AI sees tools prefixed as `mcp__<server-name>__<tool>`.

---

## Two connection types

### 1. stdio (local process)

Runs a local command and communicates over stdin/stdout. This is the most common type — used for npm/npx packages and Python-based MCP servers.

```json
"misterpilot.mcpServers": {
  "my-server": {
    "command": "npx",
    "args": ["-y", "some-mcp-package"],
    "env": {
      "SOME_API_KEY": "your-key-here"
    }
  }
}
```

| Field | Required | Description |
|---|---|---|
| `command` | Yes | Executable to run (`npx`, `uvx`, `node`, `python`, etc.) |
| `args` | No | Arguments passed to the command |
| `env` | No | Extra environment variables for the process |

### 2. HTTP (remote server)

Connects to a running MCP server over HTTP. Use this for self-hosted or cloud-hosted MCP servers.

```json
"misterpilot.mcpServers": {
  "my-server": {
    "type": "http",
    "url": "https://your-mcp-server.com/mcp",
    "headers": {
      "Authorization": "Bearer your-token"
    }
  }
}
```

| Field | Required | Description |
|---|---|---|
| `type` | Yes | Must be `"http"` |
| `url` | Yes | Full URL to the MCP endpoint |
| `headers` | No | HTTP headers sent with every request (auth tokens, etc.) |

---

## Examples

### GitHub

Gives the AI access to your repos, issues, PRs, file search, and more. Uses the official GitHub MCP server.

**Prerequisites:** A GitHub Personal Access Token with the scopes you need (`repo`, `read:org`, etc.).

```json
"misterpilot.mcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

**What the AI can do:**
- List and search your repositories
- Read file contents from any branch
- Create and comment on issues
- Review and create pull requests
- Search code across GitHub

**Example prompt:** *"Open a GitHub issue in my repo for the bug we just fixed"*

---

### Playwright (browser automation)

Gives the AI a real browser it can control — navigate pages, click, fill forms, take screenshots, and scrape content.

**Prerequisites:** Node.js installed. Playwright will download browsers on first run.

```json
"misterpilot.mcpServers": {
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp"]
  }
}
```

**What the AI can do:**
- Navigate to any URL
- Click buttons, fill forms, submit
- Take screenshots
- Extract text and structured data from pages
- Test web UIs end-to-end

**Example prompt:** *"Go to my staging URL and check if the login flow works"*

---

### Filesystem (extended file access)

Gives the AI access to files outside the current workspace — useful for reading config files, shared libraries, or other projects.

```json
"misterpilot.mcpServers": {
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/path/to/allowed/directory"
    ]
  }
}
```

**Example prompt:** *"Check my ~/.ssh/config and suggest any improvements"*

---

### PostgreSQL

Gives the AI read access to a Postgres database — schema introspection and queries.

```json
"misterpilot.mcpServers": {
  "postgres": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-postgres",
      "postgresql://user:password@localhost:5432/mydb"
    ]
  }
}
```

**Example prompt:** *"Look at the users table schema and write a migration to add an email_verified column"*

---

### Fetch / Web search

Gives the AI the ability to fetch any URL or search the web.

```json
"misterpilot.mcpServers": {
  "fetch": {
    "command": "uvx",
    "args": ["mcp-server-fetch"]
  }
}
```

**Example prompt:** *"Fetch the latest release notes from the React changelog and summarise what's new"*

---

### Custom HTTP server (self-hosted)

If you've built your own MCP server and deployed it:

```json
"misterpilot.mcpServers": {
  "my-internal-tools": {
    "type": "http",
    "url": "https://tools.yourcompany.internal/mcp",
    "headers": {
      "Authorization": "Bearer eyJhbGci..."
    }
  }
}
```

---

## Multiple servers at once

You can configure as many servers as you need. MisterPilot connects to all of them in parallel on startup and merges their tools into a single list.

```json
"misterpilot.mcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
    }
  },
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp"]
  },
  "fetch": {
    "command": "uvx",
    "args": ["mcp-server-fetch"]
  }
}
```

---

## Checking connection status

The MisterPilot panel shows a status indicator for each configured server — green for connected, red for failed. You can also see how many tools each server exposed.

If a server fails to connect, MisterPilot will still work normally using its built-in tools. The failed server is skipped silently — check the VS Code output panel for error details.

---

## Troubleshooting

**Server won't connect**
- Make sure the command is installed: run `npx -y <package>` manually in a terminal to confirm it works
- Check that required env vars (API keys, tokens) are set correctly
- For `uvx` commands, ensure `uv` is installed (`pip install uv`)

**Tools not showing up**
- Open the MisterPilot panel and check the server status indicator
- Reload the VS Code window after changing settings (`Ctrl+Shift+P` → "Developer: Reload Window")

**AI not using MCP tools**
- Be specific in your prompt about what you need (e.g. "use GitHub to..." or "fetch the page at...")
- The AI will prefer local tools for local tasks and MCP tools for external services
