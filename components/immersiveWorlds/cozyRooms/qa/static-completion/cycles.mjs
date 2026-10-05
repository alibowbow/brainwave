import assert from 'node:assert/strict';
import {appendFileSync} from 'node:fs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {preview} from 'vite';
import {chromium} from 'playwright-core';
import {qa,root,browserArgs,verifiedManifest,gitHead,sha256,state} from '../followup/common.mjs';
import {completeStatic} from './completion.mjs';
import {assertFreshOutput} from './provenance.mjs';

// Explicitly revised contract copied from the immutable recreation-cycle runner.
// Use the unchanged original QA entry and the same final production bundle.
// This runner acknowledges production static-image completion before retaining
// every original lifecycle, trusted-input, and 180 ms stopped-stability check.
// It cannot establish a pass of the original fixed 180 ms stopped-observation contract.
const here=path.dirname(fileURLToPath(import.meta.url));
const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-static-completion-bundle');
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence','cycles'));
const world='nature:winter_lodge';
const READY_MS=120000,DISPOSE_MS=30000,HOST_GRACE_MS=5000;
const upstreamPath='components/immersiveWorlds/cozyRooms/qa/recreation-cycle/verify.mjs';
const upstreamSHA256='9f76b4973f7267af59e2e5769e41e549ea64ac2a1ca606181c29a7988acb80dc';
const viewport={width:960,height:700};
await assertFreshOutput(output,'recreation-cycle.json');
await assertFreshOutput(output,'progress.jsonl');
await mkdir(output,{recursive:true});
const reportFile=path.join(output,'recreation-cycle.json');
const progressFile=path.join(output,'progress.jsonl');
await writeFile(progressFile,'');
const report={passed:false,revisedContract:true,originalGateClaim:false,timestamp:new Date().toISOString(),gitHead:gitHead(),world,
  provenance:{upstreamPath,upstreamSHA256,runnerPath:path.relative(root,fileURLToPath(import.meta.url)),
    runnerSHA256:sha256(await readFile(fileURLToPath(import.meta.url))),
    completionSHA256:sha256(await readFile(path.join(here,'completion.mjs'))),
    provenanceHelperSHA256:sha256(await readFile(path.join(here,'provenance.mjs'))),
    commonSHA256:sha256(await readFile(path.join(qa,'followup/common.mjs')))},
  method:'Revised static-completion contract. One browser and one page, unmodified original QA entry and production bundle. Production request revision, submission, and GPU acknowledgement precede original 180 ms frame/clock stability checks. Initial actual animation then pause; two consecutive dispose/recreate/native-keyboard-input cycles; final disposal. No screenshots, harness-created GPU fences, canvas readback, forced context loss, or production instrumentation.',
  bounds:{readyMs:READY_MS,staticCompletionMs:READY_MS,stoppedStabilityMs:180,disposeMs:DISPOSE_MS,configuredHostGraceMs:HOST_GRACE_MS,
    note:'Original ready gate is followed by a separate bounded first-image acknowledgement. Existing 120 s stopped/input wrappers still include their 180 ms stability window; they are not extended.'},
  viewport:{...viewport,dpr:1},readyGates:[],identities:[],disposals:[],inputs:[],errors:[],limitations:[
    'This dedicated regression does not repeat the original chrome, drag, cancellation, hidden, reduced-motion, or holder-transfer suites.',
    'Disposal counters and return to a fresh engine do not measure physical GPU resource reclamation or hardware performance.',
  ]};
let browser,page,server,currentStage='setup',failure;
function progress(stage,detail={}){
  currentStage=stage;
  const record={timestamp:new Date().toISOString(),stage,...detail};
  appendFileSync(progressFile,`${JSON.stringify(record)}\n`);
  console.log('COZY_RECREATION_CYCLE',JSON.stringify(record));
}
async function bounded(operation,ms,label){
  let timer;
  try{return await Promise.race([operation,new Promise((_,reject)=>{
    timer=setTimeout(()=>reject(new Error(`${label} exceeded ${ms} ms; no retry in this browser`)),ms);
  })]);}finally{clearTimeout(timer);}
}
async function save(){await writeFile(reportFile,JSON.stringify(report,null,2));}
function remaining(deadline,label){
  const ms=deadline-performance.now();
  assert.ok(ms>0,`${label}: original absolute ${READY_MS} ms deadline exceeded`);
  return ms;
}
async function observe(){
  return page.evaluate(()=>{
    const raw=window.__cozyQA?.inspect?.()??null;
    const registry=window.__cozyRecreationCycle;
    const canvases=[...document.querySelectorAll('canvas')].map(canvas=>{
      if(!registry.canvasIds.has(canvas))registry.canvasIds.set(canvas,++registry.canvasSerial);
      const rect=canvas.getBoundingClientRect();
      return {id:registry.canvasIds.get(canvas),connected:canvas.isConnected,
        instance:canvas.dataset.instance??null,frames:canvas.dataset.frames??null,
        backing:{width:canvas.width,height:canvas.height},
        css:{width:rect.width,height:rect.height}};
    });
    const diagnostic=raw?{instance:raw.instance??null,disposed:raw.disposed===true,
      frames:raw.frames??null,time:raw.time??null,running:raw.running??false,
      taps:raw.taps??null,lastHit:raw.lastHit??null,drawCalls:raw.drawCalls??null,
      triangles:raw.triangles??null,memory:raw.memory??null,lifetime:raw.lifetime,
      image:raw.image??null,gpu:raw.gpu??null,phases:raw.phases??null,
      status:raw.status??null,retired:raw.retired??null}:null;
    return {at:performance.now(),diagnostic,canvases,
      events:window.__cozyQA?.events?.slice(-8)??[],eventCount:window.__cozyQA?.events?.length??0,
      dom:[...document.querySelectorAll('.cozy-world')].map(element=>({
        world:element.dataset.world,state:element.dataset.state,motion:element.dataset.motion,
        input:element.dataset.input??null,connected:element.isConnected,
        status:element.querySelector('[role="status"]')?.textContent?.slice(0,300)??null,
        canvasCount:element.querySelectorAll('canvas').length,
      })),nativeInput:registry?.nativeInput??[],disposalObservation:registry?.disposal??null};
  });
}
function assertReady(snapshot,generation){
  const d=snapshot.diagnostic;
  assert.ok(d&&!d.disposed,'ready engine exists');
  assert.equal(snapshot.dom.length,1,'one world holder');
  assert.equal(snapshot.dom[0].state,'ready');
  assert.equal(snapshot.dom[0].world,world);
  assert.equal(snapshot.canvases.length,1,'one live scene canvas');
  assert.equal(snapshot.canvases[0].connected,true);
  assert.equal(Number(snapshot.canvases[0].instance),d.instance,'canvas belongs to the ready engine');
  assert.ok(d.frames>0,'fresh ready engine submitted a real first frame');
  assert.ok(d.triangles>5000,'real spatial geometry remains enabled');
  assert.deepEqual(snapshot.canvases[0].backing,viewport,'native-size backing buffer');
  assert.deepEqual(d.lifetime,{created:generation+1,disposed:generation},'exact fresh-engine lifetime counters');
  assert.equal(d.running,false,'ready engine initially paused');
  assert.ok(!report.identities.some(old=>old.engine===d.instance),'engine identity is new');
  assert.ok(!report.identities.some(old=>old.canvas===snapshot.canvases[0].id),'canvas object is new');
  report.identities.push({generation,engine:d.instance,canvas:snapshot.canvases[0].id,ready:snapshot});
}
async function waitReady(generation){
  const readyGate={generation,timeoutMs:READY_MS,startedAtNodeMs:performance.now(),
    endedAtNodeMs:null,elapsedMs:null,passed:false,contract:'unchanged original ready selector gate'};
  report.readyGates.push(readyGate);
  progress(`generation-${generation}-ready-wait`,{readyGate});
  try{
    await bounded(page.waitForSelector('.cozy-world[data-state="ready"] canvas',{timeout:READY_MS}),READY_MS,'fresh ready');
    readyGate.passed=true;
  }finally{
    readyGate.endedAtNodeMs=performance.now();readyGate.elapsedMs=readyGate.endedAtNodeMs-readyGate.startedAtNodeMs;
    progress(`generation-${generation}-ready-selector-end`,{readyGate});
  }
  const snapshot=await bounded(observe(),READY_MS,'ready diagnostics');
  snapshot.readyGate=readyGate;
  assertReady(snapshot,generation);
  snapshot.completion=await completeStatic(page,{label:`generation ${generation} first image`,
    deadline:performance.now()+READY_MS,expectedInstance:snapshot.diagnostic.instance,
    onSample:completion=>progress(currentStage,{completion})});
  progress(`generation-${generation}-ready`,{instance:snapshot.diagnostic.instance,canvas:snapshot.canvases[0].id});
  await save();
  return snapshot;
}
async function assertStopped(label,{deadline=performance.now()+READY_MS,afterRevision=null,expectedInstance=null}={}){
  await page.waitForFunction(()=>!window.__cozyQA.inspect().running&&document.querySelector('.cozy-world')?.dataset.motion==='paused',null,{timeout:remaining(deadline,label)});
  const completion=await completeStatic(page,{label,deadline,afterRevision,expectedInstance,
    onSample:completion=>progress(currentStage,{completion})});
  const first=await observe();
  remaining(deadline,label);
  await page.waitForTimeout(180);
  const second=await observe();
  remaining(deadline,label);
  assert.equal(second.diagnostic.instance,first.diagnostic.instance);
  assert.equal(first.diagnostic.running,false,`${label}: acknowledged image stays paused`);
  assert.equal(second.diagnostic.running,false,`${label}: stable image stays paused`);
  assert.equal(second.canvases[0].id,first.canvases[0].id,`${label}: stopped canvas stays fixed`);
  assert.equal(second.diagnostic.frames,first.diagnostic.frames,`${label}: stopped frames stay fixed`);
  assert.equal(second.diagnostic.time,first.diagnostic.time,`${label}: stopped clock stays fixed`);
  assert.equal(first.diagnostic.image.requestedRevision,completion.requestRevision,`${label}: acknowledged request is still current`);
  assert.deepEqual(first.diagnostic.image,completion.diagnostic.image,`${label}: acknowledged image state stays fixed`);
  assert.deepEqual(second.diagnostic.image,first.diagnostic.image,`${label}: stopped image revisions stay fixed`);
  for(const key of ['submitted','completed','inFlight','pending','pollScheduled','failure']){
    assert.deepEqual(first.diagnostic.gpu[key],completion.diagnostic.gpu[key],`${label}: acknowledged GPU ${key} stays fixed`);
    assert.deepEqual(second.diagnostic.gpu[key],first.diagnostic.gpu[key],`${label}: GPU ${key} stays fixed`);
  }
  return {...second,completion};
}
async function dispose(generation){
  progress(`generation-${generation}-dispose-request`);
  const started=performance.now();
  const result=await bounded((async()=>{
    await page.evaluate(()=>{
      window.__cozyRecreationCycle.disposal={requestAt:performance.now(),detachedAt:null,lastAliveAt:null,firstDisposedAt:null};
      window.__cozyQA.setMounted(false);
    });
    await page.waitForFunction(()=>{
      const record=window.__cozyRecreationCycle.disposal;
      const raw=window.__cozyQA.inspect();
      if(!document.querySelector('canvas')&&record.detachedAt===null)record.detachedAt=performance.now();
      if(raw?.disposed===true){record.firstDisposedAt??=performance.now();return true;}
      record.lastAliveAt=performance.now();return false;
    },null,{timeout:Math.max(1,DISPOSE_MS-(performance.now()-started)),polling:100});
    return observe();
  })(),DISPOSE_MS,`generation ${generation} unmount to disposed`);
  assert.equal(result.diagnostic.disposed,true);
  assert.equal(result.canvases.length,0,'disposed world has no attached canvas');
  assert.equal(result.dom.length,0,'holder unmounted');
  assert.deepEqual(result.diagnostic.lifetime,{created:generation+1,disposed:generation+1},'every created engine disposed once');
  const timing=result.disposalObservation;
  assert.ok(timing.detachedAt!==null&&timing.firstDisposedAt!==null,'detachment and eventual disposal observed');
  assert.ok(timing.firstDisposedAt-timing.requestAt>=HOST_GRACE_MS-10,'host grace did not end early');
  assert.ok(timing.firstDisposedAt>=timing.detachedAt);
  const entry={generation,elapsedNodeMs:performance.now()-started,observed:result,
    timingNote:'Browser observation timestamps; no timer/dispose interception and no physical GPU reclamation claim.'};
  report.disposals.push(entry);
  progress(`generation-${generation}-disposed`,{elapsedMs:entry.elapsedNodeMs,lifetime:result.diagnostic.lifetime});
  await save();
}
async function freshInput(generation){
  progress(`generation-${generation}-static-input-setup`);
  const setupDeadline=performance.now()+READY_MS;
  await page.evaluate(()=>{window.__cozyQA.setStatic(true);window.__cozyQA.setActive(true);});
  const before=await bounded(assertStopped('fresh static frame',{deadline:setupDeadline}),remaining(setupDeadline,'fresh static input setup'),'fresh static input setup');
  assert.ok(before.diagnostic.frames>0);
  assert.equal(before.dom[0].input,'ready');
  const button=page.getByRole('button',{name:'찻잔 살짝 건드리기',exact:true});
  await button.waitFor({state:'attached',timeout:READY_MS});
  assert.equal(await button.isEnabled(),true,'active static world accepts its original accessible action');
  await button.focus();
  assert.equal(await button.evaluate(element=>document.activeElement===element),true);
  await page.evaluate(()=>{window.__cozyRecreationCycle.nativeInput=[];});
  progress(`generation-${generation}-native-enter`);
  const inputDeadline=performance.now()+READY_MS;
  const after=await bounded((async()=>{
    await page.keyboard.press('Enter');
    await page.waitForFunction(count=>window.__cozyQA.events.length>=count+1,before.eventCount,{timeout:remaining(inputDeadline,'native callback')});
    return assertStopped('post-input static frame',{deadline:inputDeadline,
      afterRevision:before.completion.requestRevision,expectedInstance:before.diagnostic.instance});
  })(),READY_MS,'native Enter through acknowledged stopped frame');
  assert.equal(after.eventCount,before.eventCount+1,'native Enter emits exactly one callback');
  const event=after.events.at(-1);
  assert.equal(event.world,world);
  assert.equal(event.type,'cup');
  assert.ok(Number.isFinite(event.intensity)&&event.intensity>0&&event.intensity<=.35,'callback intensity is bounded');
  assert.equal(after.diagnostic.instance,before.diagnostic.instance,'input uses fresh engine');
  assert.equal(after.canvases[0].id,before.canvases[0].id,'input uses fresh canvas');
  assert.equal(after.diagnostic.time,before.diagnostic.time,'static action does not advance ambient time');
  assert.equal(after.diagnostic.frames,before.diagnostic.frames+1,'one discrete action renders its stopped frame');
  const clicks=after.nativeInput.filter(e=>e.type==='click');
  assert.equal(clicks.length,1,'one browser click from native keyboard activation');
  assert.equal(clicks[0].isTrusted,true);
  assert.ok(after.nativeInput.some(e=>e.type==='keydown'&&e.key==='Enter'&&e.isTrusted),'trusted native Enter observed');
  report.inputs.push({generation,event,before,after,method:'Playwright native keyboard Enter on original focused cup action; trusted browser key/click events observed. No dispatched PointerEvent or debug action API.'});
  progress(`generation-${generation}-input-passed`,{event,instance:after.diagnostic.instance});
  await save();
}

try{
  progress('verify-source-and-bundle');
  assert.equal(sha256(await readFile(path.join(root,upstreamPath))),upstreamSHA256,'immutable upstream recreation runner matches copied provenance');
  report.manifest=await verifiedManifest(bundle);
  assert.equal(report.manifest.harness,'Unmodified original qa/index.html and qa/main.tsx; same Vite settings as verify.mjs');
  const originalFiles=['components/immersiveWorlds/cozyRooms/qa/main.tsx','components/immersiveWorlds/cozyRooms/qa/index.html','components/liveScene/liveSceneHost.ts'];
  report.unchangedFiles={};
  for(const file of originalFiles){
    const bytes=await readFile(path.join(root,file));
    assert.equal(sha256(bytes),sha256(execFileSync('git',['show',`HEAD:${file}`],{cwd:root})),'original QA entry and shared host remain unchanged');
    report.unchangedFiles[file]=sha256(bytes);
    if(file.endsWith('liveSceneHost.ts'))assert.ok(bytes.toString().includes('this.disposeTimer = window.setTimeout(() => this.teardown(), 5000);'),'original 5000 ms host grace');
  }
  // Reject diagnostic bundles even if somebody relabels their manifest. Vite's
  // source maps must contain the unmodified original entry and engine sources.
  const expectedSources=['components/immersiveWorlds/cozyRooms/qa/main.tsx','components/immersiveWorlds/cozyRooms/engine.ts','components/liveScene/liveSceneHost.ts'];
  const found=new Set();
  for(const file of report.manifest.bundle.files.filter(file=>file.endsWith('.map'))){
    const map=JSON.parse(await readFile(path.join(bundle,file),'utf8'));
    for(let i=0;i<map.sources.length;i++){
      for(const expected of expectedSources)if(map.sources[i].replaceAll('\\','/').endsWith(expected)){
        assert.equal(map.sourcesContent?.[i],await readFile(path.join(root,expected),'utf8'),`bundled original source: ${expected}`);found.add(expected);
      }
    }
  }
  assert.deepEqual([...found].sort(),expectedSources.sort(),'original entry/engine/host verified in bundle');
  server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4213),strictPort:true}});
  browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:browserArgs});
  report.browser=await browser.version();
  page=await browser.newPage({viewport,deviceScaleFactor:1,serviceWorkers:'block'});
  page.setDefaultTimeout(READY_MS);
  page.on('pageerror',error=>{report.errors.push(error.stack||String(error));progress(currentStage,{pageError:error.message});});
  page.on('console',message=>{if(message.type()==='error'&&!/favicon/.test(message.text())){report.errors.push(message.text());progress(currentStage,{consoleError:message.text()});}});
  page.on('crash',()=>{report.errors.push('Browser page crashed');progress(currentStage,{pageCrash:true});});
  await page.addInitScript(()=>{
    // Weak keys prove object identity without retaining disposed canvases.
    window.__cozyRecreationCycle={canvasIds:new WeakMap(),canvasSerial:0,nativeInput:[],disposal:null};
    for(const type of ['keydown','keyup','click'])document.addEventListener(type,event=>{
      if(event.target instanceof Element&&event.target.closest('.cozy-world-access button')){
        const records=window.__cozyRecreationCycle.nativeInput;
        records.push({type:event.type,key:event.key??null,isTrusted:event.isTrusted,at:performance.now()});
        if(records.length>24)records.shift();
      }
    },true);
  });
  await page.emulateMedia({reducedMotion:'no-preference'});
  progress('initial-navigation');
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=${encodeURIComponent(world)}`,{timeout:READY_MS});
  await waitReady(0);
  progress('initial-actual-animation');
  await state(page,'setActive',true);
  await page.waitForFunction(()=>window.__cozyQA.inspect().running,null,{timeout:READY_MS});
  const moving=await observe();
  await page.waitForFunction(frames=>window.__cozyQA.inspect().frames>=frames+3,moving.diagnostic.frames,{timeout:READY_MS});
  const pauseDeadline=performance.now()+READY_MS;
  await state(page,'setActive',false);
  const paused=await bounded(assertStopped('initial pause',{deadline:pauseDeadline}),remaining(pauseDeadline,'initial pause'),'initial pause');
  assert.ok(paused.diagnostic.time>moving.diagnostic.time,'actual animation advances the scene clock');
  assert.ok(paused.diagnostic.frames>=moving.diagnostic.frames+3,'at least three actual animated submissions');
  report.initialAnimation={moving,paused};
  progress('initial-animation-paused',{frames:paused.diagnostic.frames,time:paused.diagnostic.time});
  await dispose(0);
  for(let generation=1;generation<=2;generation++){
    progress(`generation-${generation}-mount-request`);
    await page.evaluate(()=>{window.__cozyQA.setActive(false);window.__cozyQA.setStatic(false);window.__cozyQA.setMounted(true);});
    await waitReady(generation);
    await freshInput(generation);
    await dispose(generation);
  }
  assert.equal(report.identities.length,3);
  assert.equal(new Set(report.identities.map(item=>item.engine)).size,3);
  assert.equal(new Set(report.identities.map(item=>item.canvas)).size,3);
  assert.equal(report.inputs.length,2);
  assert.equal(report.disposals.length,3,'final disposal follows second fresh input');
  assert.deepEqual(report.errors,[]);
  progress('verify-final-hashes');
  const finalManifest=await verifiedManifest(bundle);
  assert.equal(finalManifest.source.sha256,report.manifest.source.sha256,'production bytes stayed fixed for the whole run');
  assert.equal(finalManifest.bundle.sha256,report.manifest.bundle.sha256,'bundle bytes stayed fixed for the whole run');
  assert.equal(sha256(await readFile(path.join(root,upstreamPath))),upstreamSHA256,'original runner unchanged through revised run');
  assert.equal(sha256(await readFile(fileURLToPath(import.meta.url))),report.provenance.runnerSHA256,'revised runner unchanged through run');
  assert.equal(sha256(await readFile(path.join(here,'completion.mjs'))),report.provenance.completionSHA256,'completion helper unchanged through run');
  assert.equal(sha256(await readFile(path.join(here,'provenance.mjs'))),report.provenance.provenanceHelperSHA256,'provenance helper unchanged through run');
  assert.equal(sha256(await readFile(path.join(qa,'followup/common.mjs'))),report.provenance.commonSHA256,'original common helper unchanged through run');
  for(const [file,hash] of Object.entries(report.unchangedFiles))assert.equal(sha256(await readFile(path.join(root,file))),hash,`${file} unchanged through run`);
  report.finalGitHead=gitHead();
  report.passed=true;
  progress('regression-passed',{engines:report.identities.map(item=>item.engine),canvases:report.identities.map(item=>item.canvas),finalLifetime:report.disposals.at(-1).observed.diagnostic.lifetime});
}catch(error){
  failure=error;report.passed=false;report.failure={stage:currentStage,error:error.stack||String(error)};
  progress('regression-failed',report.failure);
  if(page){try{report.failureSnapshot=await bounded(observe(),1000,'failure DOM/status snapshot');}
    catch(observationError){report.failureSnapshotError=String(observationError);}}
}finally{
  await save();
  if(browser){try{await bounded(browser.close(),10000,'browser cleanup');}
    catch(error){report.passed=false;report.cleanupError=String(error);failure??=error;}}
  if(server){server.httpServer.closeAllConnections?.();await new Promise(resolve=>server.httpServer.close(resolve));}
  report.finishedAt=new Date().toISOString();await save();
}
if(failure)throw failure;
