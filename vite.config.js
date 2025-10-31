import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/UrbanStyle/', // ✅ must match your repo name exactly (case-sensitive)
})
