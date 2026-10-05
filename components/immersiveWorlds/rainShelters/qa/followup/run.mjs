import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.RAIN_QA_ROOT || qaRoot;
const server = await preview({ configFile: path.join(root, 'vite.config.ts'), preview: { host: '127.0.0.1', port: 4187, strictPort: true } });
try { await import('./verify.mjs'); }
finally { await new Promise(resolve => server.httpServer.close(resolve)); }
