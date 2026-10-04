import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const qa = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(qa, '../../../..');

export default defineConfig({
  root,
  base: '/',
  plugins: [react()],
  build: {
    outDir: path.join(qa, 'dist'),
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: { input: path.join(qa, 'index.html') },
  },
  preview: { host: '127.0.0.1', port: 4179, strictPort: true },
});
