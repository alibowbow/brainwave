import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

// Combine retained waterfall/sea evidence with the cave-only visual revision.
// No unrelated scene is marked re-tested: exact unchanged runtime source hashes
// justify retaining its original verified screenshots and lifecycle results.
const directory=resolve(process.env.DEEP_WATER_QA_OUTPUT||'components/immersiveWorlds/deepWater/qa/evidence');
const initial=JSON.parse(await readFile(resolve(directory,'results-before-aperture.json'),'utf8'));
const cave=JSON.parse(await readFile(resolve(directory,'results-after-aperture.json'),'utf8'));
assert.equal(initial.status,'passed');assert.equal(cave.status,'passed');
assert.equal(initial.checks.length,77);assert.equal(cave.checks.length,27);
const oldFiles=new Map(initial.sourceManifest.map(item=>[item.path,item]));
const newFiles=new Map(cave.sourceManifest.map(item=>[item.path,item]));
const runtime=path=>!path.startsWith('qa/')&&!path.endsWith('.test.ts')&&/\.(ts|tsx|css)$/.test(path);
const changedRuntime=[];const unchangedRuntime=[];const allChanges=[];
for(const path of new Set([...oldFiles.keys(),...newFiles.keys()])){
 const before=oldFiles.get(path),after=newFiles.get(path);
 if(before?.sha256!==after?.sha256){allChanges.push({path,before:before?.sha256??null,after:after?.sha256??null});if(runtime(path))changedRuntime.push(path);}
 else if(runtime(path))unchangedRuntime.push({path,sha256:after.sha256});
}
assert.deepEqual(changedRuntime.sort(),['engine/cave.ts'],'Only the local cave implementation may change when retaining waterfall/sea runtime checks');
const screenshots=[...initial.screenshots.filter(item=>item.scene!=='cave'),...cave.screenshots];
assert.equal(screenshots.length,12);
for(const item of screenshots){
 const bytes=await readFile(resolve(directory,item.file));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),item.sha256,`Final PNG must match its own capture: ${item.file}`);
}
const scenes={waterfall:initial.scenes.waterfall,cave:cave.scenes.cave,sea:initial.scenes.sea};
const checks=[...initial.checks.filter(item=>item.scene==='waterfall'||item.scene==='sea'),...cave.checks];
const result={
 status:'passed',createdAt:new Date().toISOString(),effectiveChecks:checks.length,
 evidenceRuns:[{file:'results-before-aperture.json',baselineGitHead:initial.baselineGitHead,checks:77,retainedScenes:['waterfall','sea'],supersededScene:'cave'},{file:'results-after-aperture.json',baselineGitHead:cave.baselineGitHead,checks:27,retainedScenes:['cave']}],
 sourceAudit:{passed:true,changedRuntime,unchangedRuntime:unchangedRuntime.sort((a,b)=>a.path.localeCompare(b.path)),allChanges,meaning:'Waterfall, sea, shared deepWater engine, environment, host, view and CSS bytes are unchanged. Their original screenshots and lifecycle checks remain authoritative. Cave screenshots and checks come from the fresh post-aperture bundle.'},
 baselineGitHead:cave.baselineGitHead,sourceManifest:cave.sourceManifest,bundleManifest:cave.bundleManifest,
 environment:cave.environment,checks,screenshots,scenes,errors:[...initial.errors,...cave.errors],
 limitations:['Fold sizes are viewport emulations, not physical hardware.','document.hidden was injected; native background tab switching was not tested.','Second-holder canvas ownership was tested, not the integrated app native Fullscreen API.','Renderer readback and teardown timings are from shared CPU SwiftShader and are not target-device performance claims.'],
};
assert.equal(result.effectiveChecks,77);assert.equal(result.errors.length,0);
await writeFile(resolve(directory,'results.json'),JSON.stringify(result,null,2));
console.log(`PASS retained-scene source audit; ${result.effectiveChecks} effective checks, ${screenshots.length} matching PNGs; ${resolve(directory,'results.json')}`);
