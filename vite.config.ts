import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep font files as separate requests instead of base64 inside the render-blocking CSS
    assetsInlineLimit: (file) => (/\.woff2?$/.test(file) ? false : undefined),
  },
})
