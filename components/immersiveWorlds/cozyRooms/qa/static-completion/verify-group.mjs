import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {sha256} from '../followup/common.mjs';
import {assertFreshOutput} from './provenance.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence','four-world'));
if(output.startsWith(path.dirname(here)+path.sep)&&!output.startsWith(here+path.sep))throw new Error('Revised output must not overwrite another QA evidence directory');
await assertFreshOutput(output,'verification.json');await mkdir(output,{recursive:true});
const reports=[],executions=[];
// One invocation per world, no retry. Retain failed and previously unrun worlds.
for(const world of ['relax','sleep_prep','power_nap','nature:winter_lodge']){
  const dir=path.join(output,world.replace(':','-'));await mkdir(dir,{recursive:true});
  const startedAt=new Date().toISOString();
  const outcome=await new Promise(resolve=>{
    const child=spawn(process.execPath,[path.join(here,'verify.mjs')],{stdio:'inherit',env:{...process.env,COZY_OUTPUT:dir,COZY_WORLDS:world}});
    child.on('error',error=>resolve({code:null,error:String(error)}));child.on('exit',(code,signal)=>resolve({code,signal}));
  });
  const execution={world,startedAt,finishedAt:new Date().toISOString(),...outcome};executions.push(execution);
  await writeFile(path.join(dir,'execution-status.json'),JSON.stringify(execution,null,2));
  try{
    const report=JSON.parse(await readFile(path.join(dir,'verification.json'),'utf8'));
    assert.equal(report.revisedContract,true);assert.equal(report.originalGateClaim,false);
    if(reports.length){assert.equal(report.source.sha256,reports[0].source.sha256);assert.equal(report.bundle.sha256,reports[0].bundle.sha256);assert.equal(report.provenance.runnerSHA256,reports[0].provenance.runnerSHA256);assert.equal(report.provenance.completionSHA256,reports[0].provenance.completionSHA256);}
    for(const result of report.results)for(const snapshot of result.snapshots)await copyFile(path.join(dir,snapshot.file),path.join(output,snapshot.file));
    reports.push(report);
  }catch(error){execution.reportError=String(error);}
  await writeFile(path.join(output,'checkpoint.json'),JSON.stringify({revisedContract:true,originalGateClaim:false,executions,reports},null,2));
}
const report={passed:reports.length===4&&reports.every(r=>r.passed)&&executions.every(e=>e.code===0&&!e.reportError),revisedContract:true,originalGateClaim:false,timestamp:new Date().toISOString(),isolatedBrowsers:true,
  provenance:{groupSHA256:sha256(await readFile(fileURLToPath(import.meta.url)))},worlds:executions.map(e=>e.world),source:reports[0]?.source??null,bundle:reports[0]?.bundle??null,
  results:reports.flatMap(r=>r.results),errors:reports.flatMap(r=>r.errors),executions,perWorldReports:reports};
await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));
if(!report.passed)throw new Error('Revised four-world contract failed; preserved reports do not retroactively pass the original contract');
console.log('PASS: revised completion contract in all four isolated browsers');
