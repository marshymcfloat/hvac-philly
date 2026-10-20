import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '')
  const proxyTarget = String(env.API_PROXY_TARGET || env.api_proxy_target || process.env.API_PROXY_TARGET || 'http://127.0.0.1:18080').trim().replace(/\/$/, '')
  return {
    plugins: [vue(), tailwindcss()],
    build: { target: 'esnext', cssMinify: true, modulePreload: { polyfill: false } },
    server: {
      host: '0.0.0.0', port: 3000, strictPort: true,
      watch: { usePolling: true },
      proxy: { '/v1': { target: proxyTarget, changeOrigin: true } },
    },
    preview: { port: 3000, strictPort: true },
  }
})
