import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      VitePWA({
        manifest: {
        "short_name": "MTJ Euro 2024",
        "name": "",
        "icons":[
          {
            "src":"/android-chrome-192x192.png",
            "sizes":"192x192",
            "type":"image/png",
            "purpose": "any"
          },{
            "src":"/android-chrome-512x512.png",
            "sizes":"512x512",
            "type":"image/png",
            "purpose": "any"
          }, {
            "src": "/android-chrome-512x512-maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }],
        "start_url": "/",
        "display": "standalone",
        "theme_color":"#ffffff",
        "background_color":"#ffffff",
        "orientation": "portrait-primary"
      }})

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    target: 'esnext'
  }
})
