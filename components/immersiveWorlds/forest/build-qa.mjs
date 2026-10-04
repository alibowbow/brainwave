import { readFile, writeFile, readdir, rename, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const sceneDirectory = fileURLToPath(new URL('./', import.meta.url));
const repositoryDirectory = fileURLToPath(new URL('../../../', import.meta.url));
const outputDirectory = path.join(repositoryDirectory, 'public/immersive-worlds/forest/qa');

// An isolated preview entry only. Never load or mutate the app/PWA configuration.
await build({
  configFile: false,
  root: sceneDirectory,
  base: './',
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: outputDirectory,
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      input: path.join(sceneDirectory, 'harness.html'),
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'forest-qa.mjs',
        assetFileNames: '[name][extname]',
      },
    },
  },
});

// The app's existing precache matches *.js/*.css. Use an on-demand .mjs bundle
// and inline this tiny stylesheet so verification does not add a large precache.
let html = await readFile(path.join(outputDirectory, 'harness.html'), 'utf8');
for (const filename of await readdir(outputDirectory)) {
  if (!filename.endsWith('.css')) continue;
  const css = await readFile(path.join(outputDirectory, filename), 'utf8');
  html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/g, (tag) => tag.includes(filename) ? `<style>${css}</style>` : tag);
  await unlink(path.join(outputDirectory, filename));
}
await writeFile(path.join(outputDirectory, 'harness.html'), html);
await rename(path.join(outputDirectory, 'harness.html'), path.join(outputDirectory, 'index.html'));

const licenses = ['Brainwave forest QA preview dependency notices', 'The scene implementation is original. The following bundled dependencies retain their own licenses.'];
for (const dependency of ['three', 'react', 'react-dom', 'scheduler']) {
  const directory = path.join(repositoryDirectory, 'node_modules', dependency);
  const metadata = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
  licenses.push(`\n=== ${metadata.name} ${metadata.version} · ${metadata.license} ===\n${await readFile(path.join(directory, 'LICENSE'), 'utf8')}`);
}
await writeFile(path.join(outputDirectory, 'LICENSES.txt'), `${licenses.join('\n\n')}\n`);
const sourceFiles = ['ForestEngine.ts', 'forestStones.ts', 'ForestWorld.tsx', 'botany.ts', 'forestHost.ts', 'forestMath.ts', 'forest.css', 'harness.tsx'];
const hashes = {};
for (const filename of sourceFiles) hashes[filename] = createHash('sha256').update(await readFile(path.join(sceneDirectory, filename))).digest('hex');
await writeFile(path.join(outputDirectory, 'build-manifest.json'), JSON.stringify({
  source: 'Original procedural Three.js morning forest; no generated/downloaded imagery.',
  generatedAt: new Date().toISOString(), sourceSha256: hashes,
  bundleSha256: createHash('sha256').update(await readFile(path.join(outputDirectory, 'forest-qa.mjs'))).digest('hex'),
}, null, 2) + '\n');
console.log(`Forest QA preview written: ${outputDirectory}`);
