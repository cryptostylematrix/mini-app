import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = 'mini-app'

export default defineConfig({
  plugins: [react()],
  base: process.env.BUILD_LOCAL === 'true' ? './' : `/${repo}/`,
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'ton-core': ['@ton/core', '@ton/crypto', '@ton/ton'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@tonconnect/ui-react', 'lucide-react'],
          'i18n-vendor': [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  define: {
    'process.env': {},
  },
})