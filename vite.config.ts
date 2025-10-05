import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  base: '/chess/', // <- REQUIRED for GitHub Pages project sites
  resolve: {
    alias: {
      base: path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
})

