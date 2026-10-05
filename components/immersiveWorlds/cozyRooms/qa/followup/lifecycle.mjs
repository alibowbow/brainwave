import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {build,preview} from 'vite';
import react from '@vitejs/plugin-react';
import {chromium} from 'playwright-core';
import {here,qa,worlds,browserArgs,sourceDigest,digest,gitHead,state,inspect} from './common.mjs';

const bundle=path.resolve(process.env.COZY_LIFECYCLE_BUNDLE||'/tmp/cozy-followup-lifecycle-bundle');
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence'));await mkdir(output,{recursive:true});
const source=await sourceDigest();
await build({configFile:false,root:here,base:'./',plugins:[react()],build:{outDir:bundle,emptyOutDir:true,sourcemap:true,chunkSizeWarningLimit:1000}});
const server=await preview({configFile:false,root:here,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4209),strictPort:true}});
const report={passed:false,timestamp:new Date().toISOString(),gitHead:gitHead(),source,bundle:await digest(bundle),method:'Separate clean browser per world; at least 3 actual animated submissions then pause and holder roundtrip. No screenshots, GPU fences, canvas readback, forced context loss, or other capture work. QA-only wrappers record original host 5000 ms timer, connected canvas or ancestor detachment after delegated Node.removeChild/Element.remove returns, CozyEngine.dispose entry/exit, context-loss events and heartbeat.',results:[],errors:[]};
let browser,activePage,activeResult;
try{
 for(const world of worlds){
  console.log('CLEAN LIFECYCLE START',world);
  browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:browserArgs});
  const page=await browser.newPage({viewport:{width:960,height:700},deviceScaleFactor:1,serviceWorkers:'block'});page.setDefaultTimeout(30000);activePage=page;
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errors.push(m.text());});
  const result={world,browser:await browser.version(),passed:false,states:{},events:[],errors};report.results.push(result);activeResult=result;
  const observe=async label=>{
    const snapshot=await page.evaluate(()=>({state:window.__cozyQA.inspect(),events:window.__cozyLifecycle.events,canvasCount:document.querySelectorAll('canvas').length}));
    result.states[label]={state:snapshot.state,canvasCount:snapshot.canvasCount};result.events=snapshot.events;
    return snapshot.state;
  };
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=${encodeURIComponent(world)}`);await page.waitForSelector('.cozy-world[data-state="ready"] canvas');
  const initial=await observe('initial');result.initial=initial;assert.equal(initial.running,false);
  await page.evaluate(()=>{window.__cozyLifecycle.canvas=document.querySelector('canvas');});
  await state(page,'setActive',true);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  const moving=await observe('moving');result.moving=moving;await page.waitForFunction(n=>window.__cozyQA.inspect().frames>=n+3,moving.frames);
  await state(page,'setActive',false);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  const paused=await observe('paused');result.paused=paused;assert.ok(paused.time>moving.time,'clean lifecycle follows actual animation');
  await page.waitForTimeout(180);assert.equal((await observe('paused-after-180ms')).frames,paused.frames,'paused RAF does not advance');
  // Same clean holder movement as the baseline assertions, before final release.
  await state(page,'setSecond',true);await page.waitForSelector('.second canvas');
  const second=await observe('second-holder');assert.equal(result.states['second-holder'].canvasCount,1);assert.equal(second.instance,initial.instance);
  result.retainedCanvas=await page.evaluate(()=>document.querySelector('canvas')===window.__cozyLifecycle.canvas);assert.equal(result.retainedCanvas,true);
  await state(page,'setSecond',false);await page.waitForSelector('main canvas');assert.equal((await observe('restored-holder')).instance,initial.instance);
  await page.evaluate(()=>window.__cozyLifecycle.mark('final-unmount-request'));
  await state(page,'setMounted',false);await page.waitForFunction(()=>!document.querySelector('canvas'));
  // The 30 s eventual-disposal bound is exactly the existing original runner's
  // bound. It does not become a claim of resource release at 5000 ms.
  await page.waitForFunction(()=>window.__cozyQA.inspect()?.disposed===true,null,{timeout:30000,polling:100});
  await page.waitForTimeout(200);
  const disposed=await observe('disposed');result.disposed=disposed;
  const events=result.events;
  const request=events.find(e=>e.type==='final-unmount-request');
  const removal=events.find(e=>e.type==='canvas-removal'&&e.at>=request.at);
  const scheduled=events.find(e=>e.type==='retention-timer-scheduled'&&e.at>=request.at);
  const fired=events.find(e=>e.type==='retention-timer-fire'&&e.id===scheduled?.id);
  const entry=events.find(e=>e.type==='dispose-entry'&&e.at>=request.at);
  const exit=events.find(e=>e.type==='dispose-exit'&&e.at>=request.at);
  result.phases={request:request||null,removal:removal||null,scheduled:scheduled||null,fired:fired||null,entry:entry||null,exit:exit||null};
  assert.equal(disposed.lifetime.created,disposed.lifetime.disposed);
  assert.ok(removal&&scheduled&&fired&&entry&&exit,'all distinct lifecycle phases observed');
  assert.equal(scheduled.configuredDelayMs,5000);
  assert.ok(fired.at-scheduled.at>=4990,'retention timer did not dispose early');
  assert.ok(entry.at>=fired.at&&exit.at>=entry.at,'timer fire precedes disposal entry and exit');
  assert.equal(events.filter(e=>e.type==='dispose-entry').length,1,'one engine disposal');
  const contextLoss=events.find(e=>e.type==='context-loss-observed')||null;
  assert.deepEqual(errors,[]);
  Object.assign(result,{passed:true,initial,moving,paused,disposed,events,metrics:{configuredRetentionMs:5000,removalToTimerFireMs:fired.at-removal.at,timerDelayMs:fired.at-scheduled.at,removalToDisposeEntryMs:entry.at-removal.at,disposeDurationMs:exit.at-entry.at,removalToDisposeExitMs:exit.at-removal.at,contextLoss:contextLoss?{observed:true,at:contextLoss.at,removalToContextLossMs:contextLoss.at-removal.at}:{observed:false,reason:'Engine deliberately does not force WEBGL_lose_context; no context-loss event was observed during this bounded run. Dispose return does not prove physical GPU reclamation.'},maxHeartbeatLagMs:Math.max(0,...events.filter(e=>e.type==='heartbeat').map(e=>e.lagMs))}});
  console.log('CLEAN LIFECYCLE PASS',world,result.metrics);
  await browser.close();browser=null;activePage=null;activeResult=null;await writeFile(path.join(output,'clean-lifecycle.json'),JSON.stringify(report,null,2));
 }
 assert.equal((await sourceDigest()).sha256,source.sha256,'production source remained fixed throughout lifecycle run');
 report.passed=true;
}catch(error){
 report.errors.push(error.stack||String(error));
 if(activeResult){
  activeResult.failure=error.stack||String(error);
  if(activePage){
   let deadline;
   try{
    const snapshot=await Promise.race([
     activePage.evaluate(()=>({state:window.__cozyQA?.inspect?.()??null,events:window.__cozyLifecycle?.events??[],dom:[...document.querySelectorAll('.cozy-world')].map(element=>({state:element.dataset.state,motion:element.dataset.motion,canvases:element.querySelectorAll('canvas').length}))})),
     new Promise((_,reject)=>{deadline=setTimeout(()=>reject(new Error('Failure-state observation exceeded 1000 ms; browser discarded without capture')),1000);}),
    ]);
    activeResult.failureSnapshot=snapshot;activeResult.events=snapshot.events;
   }catch(observationError){activeResult.failureSnapshotError=String(observationError);}
   finally{clearTimeout(deadline);}
  }
 }
 throw error;
}
finally{await writeFile(path.join(output,'clean-lifecycle.json'),JSON.stringify(report,null,2));if(browser)await browser.close();await new Promise(resolve=>server.httpServer.close(resolve));}
