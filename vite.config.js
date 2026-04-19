import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist'
  },
  esbuild: {
    loader: 'jsx',
    include: /\.(js|jsx|ts|tsx)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})