import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Build-time optimizations to reduce bundle size and speed up production loads
  build: {
    target: 'es2019', // reasonable modern target for smaller output
    minify: 'esbuild',
    cssCodeSplit: true,
    // avoid inlining larger assets into JS bundles
    assetsInlineLimit: 1024,
    // skip compressed size reporting to speed up the build
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // split vendor chunks to enable better long-term caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom'))
              return 'vendor_react'
            if (id.includes('framer-motion') || id.includes('lucide-react')) return 'vendor_motion'
            if (id.includes('xlsx')) return 'vendor_xlsx'
            return 'vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
