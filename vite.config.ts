import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/HeadHunter/',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.hh.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            proxyReq.setHeader('User-Agent', 'MyApp/1.0 (myapp@example.com)');
            console.log('Proxying request:', req.url);
          });
        },
      },
    },
  },
});