import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(here, '../../../..');

export default defineConfig({
  root: here,
  base: './',
  publicDir: false,
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4175, fs: { allow: [repository] } },
  preview: { host: '127.0.0.1', port: 4175 },
  build: {
    outDir: path.join(here, '.build'),
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      output: { manualChunks: (id) => id.includes('/node_modules/three/') ? 'three' : undefined },
    },
  },
});
