import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"; // ✅ Works in both CommonJS and ESM

// https://vitejs.dev/config/
export default defineConfig({
  // this has to map 1:1 with ts-config aliases
  resolve: {
    alias: {
      "base": path.resolve(__dirname, './src')
    },
  },
  plugins: [react()],
})
