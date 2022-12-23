import preact from '@preact/preset-vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [preact(), viteEslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
