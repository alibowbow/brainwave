import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

// Start preview and browser in one process scope for executors that isolate
// loopback networking per command. No proxy or network permission changes.
const qaRoot = path.dirname(fileURLToPath(import.meta.url));
const server = await preview({ configFile: path.join(qaRoot, 'vite.config.ts') });
try {
  await import('./verify.mjs');
} finally {
  await new Promise((resolve) => server.httpServer.close(resolve));
}
