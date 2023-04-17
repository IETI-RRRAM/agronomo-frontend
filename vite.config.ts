import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'replace',
      transform(code) {
        return code.replace(/process\.env\.(\w+)/g, (match, p1) => {
          const value = process.env[p1];
          return value !== undefined ? JSON.stringify(value) : match;
        });
      },
    }
  ],
  resolve: {
    alias: {
      src: "/src",
      components: '/src/components',
    },
  },
})
