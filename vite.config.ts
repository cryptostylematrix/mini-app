import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.BUILD_LOCAL === 'true' ? "./" : "/",
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          // TON библиотеки
          'ton-core': ['@ton/core', '@ton/crypto', '@ton/ton'],
          // React и роутинг
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI библиотеки
          'ui-vendor': ['@tonconnect/ui-react', 'lucide-react'],
          // i18n
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  define: {
    'process.env': {},
  },
})