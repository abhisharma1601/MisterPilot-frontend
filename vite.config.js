import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// /docs → /docs/ so the docs page (docs/index.html) resolves with or without the slash.
const docsRedirect = () => {
  const redirect = (req, res, next) => {
    const [path, query] = req.url.split('?')
    if (path === '/docs') {
      res.statusCode = 301
      res.setHeader('Location', `/docs/${query ? `?${query}` : ''}`)
      return res.end()
    }
    next()
  }
  return {
    name: 'docs-redirect',
    configureServer: server => { server.middlewares.use(redirect) },
    configurePreviewServer: server => { server.middlewares.use(redirect) },
  }
}

export default defineConfig({
  plugins: [react(), docsRedirect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        docs: resolve(__dirname, 'docs/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    allowedHosts: ['misterpilot.online', 'www.misterpilot.online'],
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
})
