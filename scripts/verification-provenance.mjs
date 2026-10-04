// Extracted from the cold gallery's SHA256 source/dist snapshots.
// Node-only reads and response bodies: no browser evaluation or input.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const relevant = file => /^(App\.|index\.|components\/|services\/|hooks\/|utils\/|data\/|types\/|public\/|styles\/|scripts\/|package|vite\.|tsconfig|\.github\/)/.test(file);
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else if (entry.isFile()) files.push(file);
  }
  return files.sort();
}
export async function sourceSnapshot(repoRoot, { excludeDirs = [] } = {}) {
  const excluded = excludeDirs.map(dir => path.resolve(repoRoot, dir));
  if (excluded.includes(path.resolve(repoRoot))) throw new Error('A QA output exclusion cannot exclude the repository root');
  const included = file => !excluded.some(dir => { const absolute = path.resolve(repoRoot, file); return absolute === dir || absolute.startsWith(dir + path.sep); });
  const git = (...args) => execFileSync('git', ['-C', repoRoot, ...args], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).trimEnd();
  const paths = git('ls-files', '--cached', '--others', '--exclude-standard', '-z').split('\0').filter(Boolean)
    .filter(file => !file.startsWith('dist/') && !file.startsWith('node_modules/') && included(file));
  const sourceFiles = {};
  for (const file of [...new Set(paths)].sort()) {
    try { sourceFiles[file] = sha(await readFile(path.join(repoRoot, file))); }
    catch (error) { if (error.code !== 'ENOENT') throw error; sourceFiles[file] = 'DELETED'; }
  }
  const distFiles = {};
  for (const file of await walk(path.join(repoRoot, 'dist'))) distFiles[path.relative(path.join(repoRoot, 'dist'), file).split(path.sep).join('/')] = sha(await readFile(file));
  const changed = [...git('diff', 'HEAD', '--name-only', '-z').split('\0'), ...git('ls-files', '--others', '--exclude-standard', '-z').split('\0')].filter(Boolean);
  return { head: git('rev-parse', 'HEAD'), tree: git('rev-parse', 'HEAD^{tree}'), status: git('status', '--porcelain'),
    excludedQaOutputDirs: excluded, dirtyRelevantFiles: [...new Set(changed)].filter(file => included(file) && relevant(file)).sort(), sourceFiles, distFiles,
    sourceDigest: sha(JSON.stringify(sourceFiles)), distDigest: sha(JSON.stringify(distFiles)) };
}
async function bounded(run, ms, label) {
  let timer;
  try { return await Promise.race([run(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms}ms`)), ms); })]); }
  finally { clearTimeout(timer); }
}
export async function beginVerificationProvenance({ repoRoot = process.cwd(), baseUrl, outputDirs = [] }) {
  const snapshotOptions = { excludeDirs: [...outputDirs, 'components/immersiveWorlds/forest/qa/ci-output'] };
  const data = { before: await sourceSnapshot(repoRoot, snapshotOptions), served: [], errors: [],
    scope: 'Current working-tree bytes and actual document/script/stylesheet response bodies; historical owner checkpoints are labels only.',
    buildCausality: 'Matching source/dist hashes bind the observed files. The CI build step or separately retained build log must establish that these source bytes built this dist.',
    standaloneScope: 'Public owner bundles are hashed as their own served surface. Development-harness transforms are recorded without claiming byte equality to production dist.' };
  const origin = new URL(baseUrl).origin, pending = new Set();
  const attach = (page, surface) => {
    page.on('response', response => {
      const resourceType = response.request().resourceType();
      if (!['document', 'script', 'stylesheet'].includes(resourceType) || response.status() !== 200) return;
      const url = new URL(response.url());
      if (!['http:', 'https:'].includes(url.protocol)) return;
      const task = bounded(async () => {
        const body = await response.body();
        const file = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
        const distFile = file.endsWith('/') ? file + 'index.html' : file;
        const sameOrigin = url.origin === origin;
        const expectedSha256 = sameOrigin ? data.before.distFiles[distFile] ?? null : null;
        data.served.push({ surface, url: response.url(), resourceType, bytes: body.length, sha256: sha(body),
          distFile: sameOrigin ? distFile : null, expectedSha256,
          matchesDist: expectedSha256 ? sha(body) === expectedSha256 : null,
          binding: expectedSha256 ? 'exact-dist-bytes' : 'served-bytes-only; no source-transform equivalence claimed' });
      }, 10_000, 'served response hashing').catch(error => data.errors.push({ surface, url: response.url(), message: String(error) }));
      pending.add(task); task.finally(() => pending.delete(task));
    });
  };
  const finish = async () => {
    await Promise.allSettled([...pending]);
    data.after = await sourceSnapshot(repoRoot, snapshotOptions);
    data.sourceStable = data.before.sourceDigest === data.after.sourceDigest;
    data.distStable = data.before.distDigest === data.after.distDigest;
    const app = data.served.filter(record => record.surface === 'application');
    data.applicationBound = app.some(record => record.resourceType === 'script') && app.every(record => record.matchesDist === true);
    data.valid = data.sourceStable && data.distStable && data.applicationBound && !data.errors.length;
    return data.valid;
  };
  return { data, attach, finish };
}
