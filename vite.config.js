import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Lets components be imported as "@/components/..." instead of
      // counting ../ hops.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
