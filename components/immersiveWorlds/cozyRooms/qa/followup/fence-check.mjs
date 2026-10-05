import assert from 'node:assert/strict';
import vm from 'node:vm';
import path from 'node:path';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {drainGPU,here,sha256} from './common.mjs';

// These controllable statuses test the QA diagnostic's interpretation and
// deadlines. They do not simulate renderer quality or certify a GPU scheduler.
function mock({statuses=[2],nullFence=false,lost=false,drift=false}={}){
 let deleted=0,waits=0,flushes=0,reads=0;
 const diagnostic=()=>({instance:1,frames:drift&&++reads>2?3:2,time:8,running:false});
 const gl={SYNC_GPU_COMMANDS_COMPLETE:10,ALREADY_SIGNALED:2,CONDITION_SATISFIED:3,TIMEOUT_EXPIRED:4,WAIT_FAILED:5,VERSION:6,RENDERER:7,VENDOR:8,getExtension:()=>null,getParameter:()=>'',fenceSync:()=>nullFence?null:{},flush:()=>flushes++,isContextLost:()=>lost,clientWaitSync:()=>statuses[Math.min(waits++,statuses.length-1)],deleteSync:()=>deleted++};
 const canvas={width:1280,height:850,getContext:()=>gl,getBoundingClientRect:()=>({x:0,y:0,width:1280,height:850})};
 const context=vm.createContext({document:{querySelector:()=>canvas},window:{__cozyQA:{inspect:diagnostic}},performance,setTimeout,innerWidth:1280,innerHeight:850,devicePixelRatio:1});
 return {page:{evaluate:(fn,arg)=>vm.runInContext(`(${fn.toString()})`,context)(arg)},state:()=>({deleted,waits,flushes})};
}
const results=[];
const ok=mock({statuses:[4,2]}),completed=await drainGPU(ok.page,1000);
assert.equal(completed.status,'ALREADY_SIGNALED');assert.equal(completed.polls,2);assert.deepEqual(ok.state(),{deleted:1,waits:2,flushes:1});
results.push({check:'TIMEOUT_EXPIRED then ALREADY_SIGNALED in later tasks',passed:true,...ok.state()});
const satisfied=mock({statuses:[3]});assert.equal((await drainGPU(satisfied.page,1000)).status,'CONDITION_SATISFIED');assert.equal(satisfied.state().deleted,1);
results.push({check:'CONDITION_SATISFIED is completion',passed:true,...satisfied.state()});
for(const [name,options,pattern,deletes] of [['WAIT_FAILED',{statuses:[5]},/WAIT_FAILED/,1],['null fence',{nullFence:true},/returned null/,0],['context loss',{lost:true},/context lost/,1],['state drift',{drift:true},/changed/,1]]){
 const m=mock(options);await assert.rejects(drainGPU(m.page,1000),pattern);assert.equal(m.state().deleted,deletes);
 results.push({check:`${name} fails without completion`,passed:true,...m.state()});
}
await assert.rejects(drainGPU({evaluate:()=>new Promise(()=>{})},20),/external 20 ms deadline/);
results.push({check:'Nonresolving page evaluation fails at external deadline',passed:true});
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence'));await mkdir(output,{recursive:true});
const report={passed:true,timestamp:new Date().toISOString(),method:'Node VM fault injection against the actual exported drainGPU function; no browser or production renderer exercised',commonSHA256:sha256(await readFile(path.join(here,'common.mjs'))),scriptSHA256:sha256(await readFile(new URL(import.meta.url))),results};
await writeFile(path.join(output,'fence-check.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
