// Configurazione per Vercel (sito web vero, dominio proprio)
// Usata con: npm run build:web
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist-web',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          react:  ['react', 'react-dom'],
          leaflet: ['leaflet'],
        },
      },
    },
  },
});
