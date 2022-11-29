import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': 'http://app:4033/',
      '/rest': 'http://app:4033/'
    },
    hmr: {
      port: 3010
    },
    watch: {// Needed to prevent infinite loop when developing on Windows.
      usePolling: true
    }
  },
  plugins: [react()],
})
