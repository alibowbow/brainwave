import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// QA only: never included in the application router or public assets.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  publicDir: false,
  plugins: [react()],
  build: { outDir: process.env.DEEP_WATER_QA_DIST || '/tmp/deepwater-qa-dist', emptyOutDir: true },
  server: { host: '127.0.0.1', port: 4198, strictPort: true },
  preview: { host: '127.0.0.1', port: 4198, strictPort: true },
});
