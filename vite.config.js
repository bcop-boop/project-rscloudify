import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Allow ngrok + Cloudflare tunnel domains (Vite blocks unknown hosts by default)
const allowedHosts = ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.dev', '.ngrok.io', '.orpheustools.app']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // `@/…` → src/…  (shadcn / 21st.dev components import from "@/components/ui/…")
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: true, allowedHosts },
  preview: { host: true, allowedHosts },
})
