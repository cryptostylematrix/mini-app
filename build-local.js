// Скрипт для создания билда с относительными путями (для локального открытия)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build } from 'vite'

const localConfig = defineConfig({
  plugins: [react()],
  base: "./", // Относительные пути для локального открытия
  build: {
    outDir: 'build-local',
    rollupOptions: {
      output: {
        manualChunks: {
          'ton-core': ['@ton/core', '@ton/crypto', '@ton/ton'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@tonconnect/ui-react', 'lucide-react'],
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

console.log('Сборка билда с относительными путями для локального открытия...')
build(localConfig).then(() => {
  console.log('✅ Билд готов в папке build-local/')
  console.log('Теперь можно открыть build-local/index.html напрямую в браузере')
})
