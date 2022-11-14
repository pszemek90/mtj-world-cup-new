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
        "short_name": "MTJ Katar 2022",
        "name": "",
        "icons":[
          {
            "src":"/android-chrome-192x192.png",
            "sizes":"192x192",
            "type":"image/png"
          },{
            "src":"/android-chrome-512x512.png",
            "sizes":"512x512",
            "type":"image/png"
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
      'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
      'balm-ui-css': 'balm-ui/dist/balm-ui.css'
    }
  }
})
