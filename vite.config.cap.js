// Configurazione per Capacitor (app iOS e Android)
// Usata con: npm run build:cap
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-cap',
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
