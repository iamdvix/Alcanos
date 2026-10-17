import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages sirve el sitio en https://usuario.github.io/Alcanos/, no en la raíz.
// "base" debe coincidir con el nombre exacto del repositorio (respeta mayúsculas).
export default defineConfig({
  base: '/Alcanos/',
  plugins: [vue(), tailwindcss()],
})
