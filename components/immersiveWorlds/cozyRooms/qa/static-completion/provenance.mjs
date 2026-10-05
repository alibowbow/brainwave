import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import path from 'node:path';
import {qa,root,sha256,verifiedManifest} from '../followup/common.mjs';
const immutable={
  'components/immersiveWorlds/cozyRooms/qa/main.tsx':'993eb008caf0ccd05bfb39172274d6997e37bc990f7b177d744c66304de6ca15',
  'components/immersiveWorlds/cozyRooms/qa/index.html':'78f9c1916bba94ce57d449a7da43ffb3f692732cffaca6a2aaa9e0fee1aca7e6',
  'components/liveScene/liveSceneHost.ts':'a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684',
};
export async function assertFreshOutput(output,reportFile){
  const here=path.join(qa,'static-completion');
  if((output===qa||output.startsWith(qa+path.sep))&&output!==here&&!output.startsWith(here+path.sep))throw new Error('Revised evidence must not overwrite any original QA path');
  try{await access(path.join(output,reportFile));}catch(error){if(error.code==='ENOENT')return;throw error;}
  throw new Error(`Existing evidence is immutable: ${path.join(output,reportFile)}`);
}
export async function bindProvenance(bundle,files){
  const manifest=await verifiedManifest(bundle);
  assert.equal(manifest.harness,'Unmodified original qa/index.html and qa/main.tsx; same Vite settings as verify.mjs');
  const hashes={};
  for(const [file,expected] of Object.entries(immutable)){
    hashes[file]=sha256(await readFile(path.join(root,file)));assert.equal(hashes[file],expected,`${file}: immutable original entry/host`);
  }
  for(const file of files)hashes[path.relative(root,file)]=sha256(await readFile(file));
  const expectedSources=['components/immersiveWorlds/cozyRooms/qa/main.tsx','components/immersiveWorlds/cozyRooms/engine.ts','components/liveScene/liveSceneHost.ts'],found=new Set();
  for(const file of manifest.bundle.files.filter(f=>f.endsWith('.map'))){
    const map=JSON.parse(await readFile(path.join(bundle,file),'utf8'));
    for(let i=0;i<map.sources.length;i++)for(const expected of expectedSources)if(map.sources[i].replaceAll('\\','/').endsWith(expected)){
      assert.equal(map.sourcesContent?.[i],await readFile(path.join(root,expected),'utf8'),`${expected}: exact untransformed bundled source`);found.add(expected);
    }
  }
  assert.deepEqual([...found].sort(),expectedSources.sort(),'entry/engine/host source maps all present');
  return {sourceSHA256:manifest.source.sha256,bundleSHA256:manifest.bundle.sha256,hashes};
}
export async function assertProvenanceUnchanged(bundle,binding){
  const manifest=await verifiedManifest(bundle);
  assert.equal(manifest.source.sha256,binding.sourceSHA256,'source fixed throughout run');
  assert.equal(manifest.bundle.sha256,binding.bundleSHA256,'bundle fixed throughout run');
  for(const [file,hash]of Object.entries(binding.hashes))assert.equal(sha256(await readFile(path.join(root,file))),hash,`${file}: fixed throughout run`);
}
