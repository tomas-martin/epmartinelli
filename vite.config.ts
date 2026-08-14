import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Para deploy en subfolder, cambiar base: '/nombre-carpeta/'
  base: '/',
})
