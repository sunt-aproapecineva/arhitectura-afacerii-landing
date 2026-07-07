import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // portul vine din env (harness-ul de preview îl atribuie); fallback 5175
  server: { port: Number(process.env.PORT) || 5175 },
  resolve: {
    // o singură instanță de React (fix „Invalid hook call" din @paper-design/shaders-react)
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
