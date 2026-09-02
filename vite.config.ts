import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Import de solo-tipos: registra la ampliación de tipos de `UserConfig` con
// `ssgOptions` (declarada en el paquete) dentro de este proyecto de TypeScript.
import type {} from 'vite-react-ssg/node'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    script: 'async',
    dirStyle: 'flat',
    crittersOptions: false,
    onFinished() {
      // eslint-disable-next-line no-console
      console.log('✔ Rijo Suplidora — build estático (SSG) generado en /dist')
    },
  },
})
