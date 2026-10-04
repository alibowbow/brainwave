import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The normal app, routing and PWA are intentionally untouched by this harness.
export default defineConfig({
  root: fileURLToPath(new URL('../../../', import.meta.url)),
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4178, strictPort: true },
  build: {
    outDir: fileURLToPath(new URL('./.harness-build', import.meta.url)),
    emptyOutDir: true,
    rollupOptions: { input: fileURLToPath(new URL('./harness.html', import.meta.url)) },
  },
});
