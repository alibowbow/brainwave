import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const qa=path.dirname(fileURLToPath(import.meta.url)),out=path.resolve(process.env.COZY_OUTPUT||'/tmp/cozy-qa-final');
await mkdir(out,{recursive:true});const reports=[];
// Each software-WebGL browser has a finite lifetime. Keep all world evidence
// even if a later browser/driver stalls; no server or CI file outside ownership.
for(const world of ['relax','sleep_prep','power_nap','nature:winter_lodge']){
 const dir=path.join(out,world.replace(':','-'));await mkdir(dir,{recursive:true});
 await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[path.join(qa,'verify.mjs')],{stdio:'inherit',env:{...process.env,COZY_OUTPUT:dir,COZY_WORLDS:world}});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(`${world} verification exited ${code}`)));});
 const report=JSON.parse(await readFile(path.join(dir,'verification.json'),'utf8'));assert.equal(report.passed,true);
 if(reports.length){assert.equal(report.source.sha256,reports[0].source.sha256);assert.equal(report.bundle.sha256,reports[0].bundle.sha256);}
 for(const result of report.results)for(const snapshot of result.snapshots)await copyFile(path.join(dir,snapshot.file),path.join(out,snapshot.file));
 reports.push(report);await writeFile(path.join(out,'checkpoint.json'),JSON.stringify({completed:reports.map(r=>r.worlds[0]),reports},null,2));
}
const result={...reports[0],timestamp:new Date().toISOString(),worlds:reports.flatMap(r=>r.worlds),results:reports.flatMap(r=>r.results),errors:reports.flatMap(r=>r.errors),isolatedBrowsers:true};
await writeFile(path.join(out,'verification.json'),JSON.stringify(result,null,2));console.log('PASS: all four isolated Cozy Rooms browsers');
