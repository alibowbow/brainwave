import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const assetDir = path.resolve('dist/assets');
const files = await readdir(assetDir);

const findEntry = async (pattern) => {
  const matches = files.filter((file) => pattern.test(file));
  if (matches.length !== 1) {
    throw new Error(`Expected one ${pattern} entry asset, found ${matches.length}. Run npm run build first.`);
  }
  const file = matches[0];
  return { file, bytes: (await stat(path.join(assetDir, file))).size };
};

const budgets = [
  { label: 'initial JavaScript', entry: await findEntry(/^index-[\w-]+\.js$/), maxBytes: 410 * 1024 },
  { label: 'compiled CSS', entry: await findEntry(/^index-[\w-]+\.css$/), maxBytes: 135 * 1024 },
];

let failed = false;
for (const { label, entry, maxBytes } of budgets) {
  const size = `${(entry.bytes / 1024).toFixed(1)} KiB`;
  const limit = `${(maxBytes / 1024).toFixed(0)} KiB`;
  console.log(`${label}: ${size} / ${limit} (${entry.file})`);
  if (entry.bytes > maxBytes) failed = true;
}

if (failed) {
  console.error('Bundle budget exceeded. Split optional routes or remove unused client dependencies.');
  process.exitCode = 1;
}

// Budget alone cannot detect a small eager import that pulls every world in.
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const visited = new Set();
const optionalScene = /\/assets\/(?:world-|RainyWindowScene-|OilSeaScene-|three-)/;
const visit = (key) => {
  if (visited.has(key)) return;
  visited.add(key);
  const entry = manifest[key];
  if (!entry) throw new Error(`Missing build manifest entry: ${key}`);
  if (optionalScene.test(`/${entry.file}`)) throw new Error(`Scene renderer is eagerly imported: ${entry.file}`);
  for (const dependency of entry.imports ?? []) visit(dependency);
};
for (const [key, entry] of Object.entries(manifest)) if (entry.isEntry) visit(key);
const serviceWorker = await readFile('dist/sw.js', 'utf8');
for (const entry of Object.values(manifest)) {
  if (optionalScene.test(`/${entry.file}`) && serviceWorker.includes(entry.file)) {
    throw new Error(`Optional scene is in initial service-worker precache: ${entry.file}`);
  }
}
console.log('Scene chunks: absent from initial static imports and service-worker precache.');
