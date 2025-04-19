// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // bind to all interfaces
    port: 5173,        // optional, defaults to 5173
    strictPort: true,  // fail if port is taken
  }
});
