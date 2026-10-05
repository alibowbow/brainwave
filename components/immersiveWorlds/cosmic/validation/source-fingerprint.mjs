import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

export const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url));
export async function hashFile(relativePath) {
  return createHash('sha256').update(await readFile(path.join(repoRoot, relativePath))).digest('hex');
}
async function walk(directory) {
  const files=[];
  for(const entry of await readdir(path.join(repoRoot,directory),{withFileTypes:true})){
    if(entry.name==='screenshots'||entry.name.startsWith('correction-20261004'))continue;
    const relative=path.posix.join(directory,entry.name);
    if(entry.isDirectory())files.push(...await walk(relative));else files.push(relative);
  }
  return files;
}
export async function sourceFingerprint() {
  const source=(await walk('components/immersiveWorlds/cosmic')).filter(p=>/\.(ts|tsx|mjs|css|html)$/.test(p));
  const bundle=(await walk('public/immersive-worlds/cosmic/preview')).filter(p=>/\.(mjs|css|html|woff2)$/.test(p));
  const dependencies=['package.json','package-lock.json','components/liveScene/liveSceneHost.ts','components/liveScene/look.ts','components/liveScene/useLookDrag.ts','components/useSceneMotion.ts','node_modules/three/examples/jsm/objects/Reflector.js'];
  const files={};
  for(const p of [...source,...bundle,...dependencies].sort())files[p]=await hashFile(p);
  const digest=createHash('sha256').update(JSON.stringify(files)).digest('hex');
  const head=execFileSync('git',['rev-parse','HEAD'],{cwd:repoRoot,encoding:'utf8'}).trim();
  return {algorithm:'sha256',digest,checkoutHead:head,files};
}
