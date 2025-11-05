import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mydoctor/',  // 这里填你的仓库名，前后带斜杠
  plugins: [react()],
})