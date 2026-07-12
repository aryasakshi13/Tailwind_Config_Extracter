import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({manifest})
      
  ],

  server: {
    port: 5173,          // Explicitly locks the frontend dev server to port 5173
    strictPort: true,    // Prevents Vite from switching ports if 5173 momentarily blinks
    // hmr: {
    //   protocol: 'ws',    // Forces standard WebSocket protocol connection
    //   host: 'localhost', // Hardcodes the host so the extension bypasses chrome-extension:// lookups
    //   port: 5173,        // Pairs the HMR listener directly back to your frontend Vite hub
    // },

     hmr: {
      port: 5173,       
      
    },
  },
})
