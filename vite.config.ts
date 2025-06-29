import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // Use library configuration
    const libConfig = require('./vite.config.lib.ts').default
    return libConfig
  }

  // Development configuration
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    optimizeDeps: {
      exclude: ['lucide-react']
    },
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist-demo',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['framer-motion'],
            icons: ['lucide-react']
          }
        }
      }
    }
  }
})