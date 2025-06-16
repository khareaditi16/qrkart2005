import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Add proxy to forward /api calls to the backend
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your Express server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
