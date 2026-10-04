import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(qaRoot, '../../../..');
// Separate QA-only bundle; never enters the production app or PWA precache.
export default defineConfig({
  root: qaRoot,
  base: './',
  plugins: [react()],
  resolve: { alias: { '@': projectRoot } },
  server: { host: '127.0.0.1', port: 4175, strictPort: true, fs: { allow: [projectRoot] } },
  preview: { host: '127.0.0.1', port: 4175, strictPort: true },
  build: { outDir: path.join(qaRoot, '.bundle'), emptyOutDir: true },
});
