import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const here=path.dirname(fileURLToPath(import.meta.url));
export const qa=path.dirname(here),scene=path.dirname(qa),root=path.resolve(qa,'../../../..');
export const worlds=(process.env.COZY_WORLDS||'relax,sleep_prep,power_nap,nature:winter_lodge').split(',');
export const browserArgs=['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage'];
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function digest(dir,filter=()=>true){
  const files=[];
  async function visit(d){for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())await visit(p);else if(filter(p))files.push(p);}}
  await visit(dir);files.sort();const hash=createHash('sha256');
  const fileSHA256={};
  for(const p of files){const bytes=await readFile(p),name=path.relative(dir,p);hash.update(name).update('\0').update(bytes);fileSHA256[name]=sha256(bytes);}
  return {sha256:hash.digest('hex'),files:files.map(p=>path.relative(dir,p)),fileSHA256};
}
export const sourceDigest=()=>digest(scene,p=>/\.(ts|tsx|css)$/.test(p)&&!p.includes('/qa/'));
export const gitHead=()=>execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
export async function verifiedManifest(bundle){
  const manifest=JSON.parse(await readFile(process.env.COZY_MANIFEST||`${bundle}.manifest.json`,'utf8'));
  assert.equal((await sourceDigest()).sha256,manifest.source.sha256,'current production source matches built evidence source');
  assert.equal((await digest(bundle)).sha256,manifest.bundle.sha256,'bundle bytes match manifest');
  return manifest;
}
export const state=(page,key,value)=>page.evaluate(([k,v])=>window.__cozyQA[k](v),[key,value]);
export const inspect=page=>page.evaluate(()=>window.__cozyQA.inspect());

async function bounded(promise,budgetMs,label){
  let timer;
  try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label}: external ${budgetMs} ms deadline exceeded; discard browser, no later capture permitted`)),budgetMs);})]);}
  finally{clearTimeout(timer);}
}

// Observe completion of this canvas's existing GL command stream, without a
// render, readback, blocking finish(), or production scheduler change.
export async function drainGPU(page,budgetMs){
  const result=await bounded(page.evaluate(async budget=>{
    const canvas=document.querySelector('canvas');
    if(!canvas)throw new Error('GPU drain: no scene canvas');
    const gl=canvas.getContext('webgl2');
    if(!gl)throw new Error('GPU drain: existing WebGL2 context unavailable');
    const before=window.__cozyQA.inspect(),start=performance.now();
    if(before.running)throw new Error('GPU drain requires a paused scene');
    const rect=canvas.getBoundingClientRect();
    const signature=()=>{const r=canvas.getBoundingClientRect(),d=window.__cozyQA.inspect();return [d.instance,d.frames,d.time,d.running,canvas.width,canvas.height,r.x,r.y,r.width,r.height].join('|');};
    const original=signature();
    const ext=gl.getExtension('WEBGL_debug_renderer_info');
    const renderer={version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER),vendor:gl.getParameter(gl.VENDOR),unmaskedRenderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null};
    const sync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);
    if(!sync)throw new Error('GPU drain: fenceSync returned null');
    let polls=0,status=null;
    try{
      gl.flush();
      // WebGL sync cannot signal before the event loop regains control.
      await new Promise(resolve=>setTimeout(resolve,0));
      while(true){
        if(gl.isContextLost())throw new Error('GPU drain: context lost');
        if(document.querySelector('canvas')!==canvas||signature()!==original)throw new Error('GPU drain: canvas/frame/time/size changed');
        status=gl.clientWaitSync(sync,0,0);polls++;
        if(status===gl.WAIT_FAILED)throw new Error('GPU drain: WAIT_FAILED');
        if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED)break;
        if(status!==gl.TIMEOUT_EXPIRED)throw new Error(`GPU drain: unexpected status ${status}`);
        if(performance.now()-start>=budget)throw new Error(`GPU drain timed out within ${budget} ms; no screenshot queued`);
        await new Promise(resolve=>setTimeout(resolve,16));
      }
      return {elapsedMs:performance.now()-start,polls,status:status===gl.ALREADY_SIGNALED?'ALREADY_SIGNALED':'CONDITION_SATISFIED',before,after:window.__cozyQA.inspect(),renderer,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},backing:{width:canvas.width,height:canvas.height},css:{x:rect.x,y:rect.y,width:rect.width,height:rect.height}};
    }finally{gl.deleteSync(sync);}
  },budgetMs),budgetMs,'GPU drain');
  assert.equal(result.before.frames,result.after.frames);assert.equal(result.before.time,result.after.time);
  return result;
}

export async function capturePNG(page,file,budgetMs=120000){
  const start=performance.now();
  const before=await inspect(page);assert.equal(before.running,false);
  await page.waitForTimeout(400);
  const settled=await inspect(page);assert.equal(settled.frames,before.frames,'capture settling does not submit');assert.equal(settled.time,before.time);
  await page.waitForTimeout(500);
  assert.equal((await inspect(page)).frames,before.frames,'capture stillness does not submit');
  const drain=await drainGPU(page,Math.max(1,budgetMs-(performance.now()-start)));
  const remaining=budgetMs-(performance.now()-start);
  assert.ok(remaining>0,'GPU drain and screenshot share one bounded budget');
  const captureStart=performance.now();
  const bytes=await page.screenshot({path:file,type:'png',timeout:remaining});
  assert.ok(bytes.length>25000,'native rendered PNG has spatial detail');
  const after=await inspect(page);assert.equal(after.frames,before.frames);assert.equal(after.time,before.time);assert.equal(after.instance,before.instance);
  return {file:path.basename(file),sha256:sha256(bytes),bytes:bytes.length,method:'Playwright native viewport screenshot, Chromium surface PNG; no CSS changes or canvas substitution',budgetMs,gpuDrain:drain,captureMs:performance.now()-captureStart,totalMs:performance.now()-start};
}
