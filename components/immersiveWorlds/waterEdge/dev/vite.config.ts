import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const directory = path.dirname(fileURLToPath(import.meta.url));
const ownedRoot = path.dirname(directory);
function treeHash(root: string, keep: (name: string) => boolean) {
  const digest = createHash('sha256');
  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(dir, entry.name);
      const relative = path.relative(root, file);
      if (!keep(relative)) continue;
      if (entry.isDirectory()) walk(file);
      else if (/\.(tsx?|css|html)$/.test(relative)) digest.update(relative).update('\0').update(readFileSync(file)).update('\0');
    }
  }
  walk(root);
  return digest.digest('hex');
}
export default defineConfig({
  root: directory, publicDir: false, plugins: [react()],
  define: {
    __WATER_EDGE_SOURCE_SHA__: JSON.stringify(treeHash(ownedRoot, (name) => !/^(dev|qa)(\/|$)/.test(name))),
    __WATER_EDGE_HARNESS_SHA__: JSON.stringify(treeHash(directory, (name) => !/^(dist|node_modules)(\/|$)/.test(name))),
  },
  build: { outDir: path.join(directory, 'dist'), emptyOutDir: true },
  server: { host: '127.0.0.1', port: 4187 },
  preview: { host: '127.0.0.1', port: 4187 },
});
