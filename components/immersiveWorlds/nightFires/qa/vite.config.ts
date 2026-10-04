import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../../../../', import.meta.url));
export default defineConfig({
  root,
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: 'components/immersiveWorlds/nightFires/qa/build',
    emptyOutDir: true,
    rollupOptions: { input: 'components/immersiveWorlds/nightFires/qa/index.html' },
  },
  server: { host: '127.0.0.1', port: 4189 },
  preview: { host: '127.0.0.1', port: 4190 },
});
