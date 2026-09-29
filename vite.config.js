import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths so the build works on GitHub Pages
  // whether it's a user site or a project site.
  base: './',
})
