import assert from 'node:assert/strict';
import {appendFileSync} from 'node:fs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {preview} from 'vite';
import {chromium} from 'playwright-core';
import {qa,root,browserArgs,verifiedManifest,gitHead,sha256} from '../followup/common.mjs';

// Conditional regression preparation. This file does not build, modify, or
// instrument production. Run only against an explicitly selected final bundle.
const here=path.dirname(fileURLToPath(import.meta.url));
const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-followup-bundle');
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence'));
const READY_MS=120000,DISPOSE_MS=30000,HOST_GRACE_MS=5000;
const world='nature:winter_lodge',viewport={width:960,height:700};
await mkdir(output,{recursive:true});
const reportFile=path.join(output,'context-loss.json'),progressFile=path.join(output,'progress.jsonl');
await writeFile(progressFile,'');
const report={passed:false,timestamp:new Date().toISOString(),gitHead:gitHead(),world,
  runnerSHA256:sha256(await readFile(fileURLToPath(import.meta.url))),
  commonSHA256:sha256(await readFile(path.join(qa,'followup/common.mjs'))),
  method:'One browser/page with the unchanged original QA entry. Existing scene contexts are actually lost using WEBGL_lose_context, once while running and once after pause. No synthetic context-loss event, production instrumentation, screenshots, readback, fences, or context restoration.',
  environmentLimit:'Driver context loss in a software WebGL browser. This is not a physical GPU fault, hardware reliability measurement, or proof of physical GPU reclamation.',
  bounds:{readyMs:READY_MS,disposeMs:DISPOSE_MS,configuredHostGraceMs:HOST_GRACE_MS},
  viewport:{...viewport,dpr:1},identities:[],cases:[],errors:[],warnings:[]};
let browserServer,browser,page,server,failure,currentStage='setup';
function progress(stage,detail={}){
  currentStage=stage;
  const record={timestamp:new Date().toISOString(),stage,...detail};
  appendFileSync(progressFile,`${JSON.stringify(record)}\n`);
  console.log('COZY_CONTEXT_LOSS',JSON.stringify(record));
}
async function bounded(operation,ms,label){
  let timer;
  try{return await Promise.race([operation,new Promise((_,reject)=>{
    timer=setTimeout(()=>reject(new Error(`${label} exceeded ${ms} ms; failed without retry`)),ms);
  })]);}finally{clearTimeout(timer);}
}
async function save(){await writeFile(reportFile,JSON.stringify(report,null,2));}
async function snapshot(){
  return page.evaluate(()=>{
    const registry=window.__cozyContextLoss;
    const raw=window.__cozyQA?.inspect?.()??null;
    const summary=raw?{instance:raw.instance??null,frames:raw.frames??null,time:raw.time??null,
      running:raw.running??false,disposed:raw.disposed===true,triangles:raw.triangles??null,
      lifetime:raw.lifetime}:null;
    const canvases=[...document.querySelectorAll('canvas')].map(canvas=>{
      if(!registry.canvasIds.has(canvas))registry.canvasIds.set(canvas,++registry.canvasSerial);
      return {id:registry.canvasIds.get(canvas),instance:Number(canvas.dataset.instance),
        frames:Number(canvas.dataset.frames),connected:canvas.isConnected,
        backing:{width:canvas.width,height:canvas.height}};
    });
    const held=registry?.pendingCanvas;
    return {at:performance.now(),summary,canvases,
      dom:[...document.querySelectorAll('.cozy-world')].map(element=>({world:element.dataset.world,
        state:element.dataset.state,motion:element.dataset.motion,input:element.dataset.input??null,
        status:element.querySelector('[role="status"]')?.textContent?.slice(0,300)??null,
        disabledActions:[...element.querySelectorAll('.cozy-world-access button')].map(button=>button.disabled)})),
      eventCount:window.__cozyQA?.events?.length??0,events:window.__cozyQA?.events?.slice(-8)??[],
      fault:registry?.fault??null,nativeInput:registry?.nativeInput??[],disposal:registry?.disposal??null,
      heldFaultCanvas:held?{id:registry.canvasIds.get(held),connected:held.isConnected,
        frames:Number(held.dataset.frames),contextLost:held.getContext('webgl2')?.isContextLost()??null}:null};
  });
}
async function ready(generation){
  progress(`generation-${generation}-ready-wait`);
  const value=await bounded((async()=>{
    await page.waitForSelector('.cozy-world[data-state="ready"] canvas',{timeout:READY_MS});
    return snapshot();
  })(),READY_MS,'fresh ready including diagnostics');
  assert.ok(value.summary&&!value.summary.disposed);
  assert.equal(value.summary.running,false);
  assert.ok(value.summary.frames>0&&value.summary.triangles>5000,'real spatial first frame');
  assert.deepEqual(value.summary.lifetime,{created:generation+1,disposed:generation});
  assert.equal(value.dom.length,1);assert.equal(value.dom[0].state,'ready');assert.equal(value.dom[0].world,world);
  assert.equal(value.canvases.length,1);assert.equal(value.canvases[0].connected,true);
  assert.equal(value.canvases[0].instance,value.summary.instance);
  assert.deepEqual(value.canvases[0].backing,viewport,'unchanged native backing size');
  assert.ok(!report.identities.some(item=>item.engine===value.summary.instance),'fresh engine identity');
  assert.ok(!report.identities.some(item=>item.canvas===value.canvases[0].id),'fresh canvas object');
  report.identities.push({generation,engine:value.summary.instance,canvas:value.canvases[0].id,ready:value});
  progress(`generation-${generation}-ready`,{instance:value.summary.instance,canvas:value.canvases[0].id});
  await save();return value;
}
async function mount(){
  await page.evaluate(()=>{window.__cozyQA.setActive(false);window.__cozyQA.setStatic(false);window.__cozyQA.setMounted(true);});
}
async function stopped(){
  await page.waitForFunction(()=>!window.__cozyQA.inspect().running&&document.querySelector('.cozy-world')?.dataset.motion==='paused',null,{timeout:READY_MS});
  const first=await snapshot();await page.waitForTimeout(180);const second=await snapshot();
  assert.equal(second.summary.instance,first.summary.instance);
  assert.equal(second.summary.frames,first.summary.frames,'stopped frames stay fixed');
  assert.equal(second.summary.time,first.summary.time,'stopped clock stays fixed');
  return second;
}
async function prepareFault(mode){
  progress(`${mode}-actual-animation`);
  return bounded((async()=>{
    await page.evaluate(()=>window.__cozyQA.setActive(true));
    await page.waitForFunction(()=>window.__cozyQA.inspect().running,null,{timeout:READY_MS});
    const moving=await snapshot();
    await page.waitForFunction(frames=>window.__cozyQA.inspect().frames>=frames+3,moving.summary.frames,{timeout:READY_MS});
    if(mode==='paused')await page.evaluate(()=>window.__cozyQA.setActive(false));
    const before=mode==='paused'?await stopped():await snapshot();
    assert.ok(before.summary.frames>=moving.summary.frames+3);
    assert.ok(before.summary.time>moving.summary.time,'actual scene time advances');
    assert.equal(before.summary.running,mode==='running');
    return {moving,before};
  })(),READY_MS,`${mode} animation and pre-loss state`);
}
async function lose(mode,generation){
  progress(`${mode}-driver-loss-request`);
  const start=performance.now();
  const result=await bounded((async()=>{
    await page.evaluate(mode=>{
      const registry=window.__cozyContextLoss,canvas=document.querySelector('canvas');
      if(!canvas)throw new Error('Missing existing scene canvas');
      const gl=canvas.getContext('webgl2');
      if(!gl||gl.isContextLost())throw new Error('Existing live WebGL2 context required');
      const extension=gl.getExtension('WEBGL_lose_context');
      if(!extension)throw new Error('WEBGL_lose_context unavailable; this case cannot be passed or skipped');
      const state=window.__cozyQA.inspect();
      if(state.running!==(mode==='running'))throw new Error('Scene motion changed before actual driver loss');
      const debug=gl.getExtension('WEBGL_debug_renderer_info');
      registry.fault={mode,requestAt:performance.now(),instance:state.instance,
        canvas:registry.canvasIds.get(canvas),framesBefore:state.frames,timeBefore:state.time,
        runningBefore:state.running,lossEvents:[],
        renderer:{version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER),
          unmaskedRenderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):null}};
      // This one temporary strong reference is released immediately after the
      // bounded loss/stop assertions, before unmount or any fresh construction.
      registry.pendingCanvas=canvas;
      canvas.addEventListener('webglcontextlost',function recordLoss(event){
        const target=event.currentTarget,context=target.getContext('webgl2');
        window.__cozyContextLoss.fault.lossEvents.push({at:performance.now(),isTrusted:event.isTrusted,
          contextLost:context?.isContextLost()??null,frames:Number(target.dataset.frames),
          canvas:window.__cozyContextLoss.canvasIds.get(target)});
      },{capture:true,once:true});
      extension.loseContext();
      registry.fault.loseContextReturnedAt=performance.now();
      registry.fault.isContextLostAfterCall=gl.isContextLost();
    },mode);
    await page.waitForFunction(()=>{
      const registry=window.__cozyContextLoss;
      return registry.fault.lossEvents.length>0&&window.__cozyQA.inspect()?.disposed===true&&
        document.querySelector('.cozy-world')?.dataset.state==='failed';
    },null,{timeout:Math.max(1,DISPOSE_MS-(performance.now()-start)),polling:100});
    const first=await snapshot();await page.waitForTimeout(250);const second=await snapshot();
    return {first,second};
  })(),DISPOSE_MS,`${mode} context loss to failed/disposed/stopped`);
  const {first,second}=result,event=first.fault.lossEvents[0];
  assert.equal(first.fault.lossEvents.length,1,'one actual context-loss event');
  assert.equal(second.fault.lossEvents.length,1,'no duplicate context-loss event');
  assert.equal(event.isTrusted,true,'browser-generated context loss is trusted');
  assert.equal(event.contextLost,true,'actual driver context is lost at event');
  assert.equal(first.heldFaultCanvas.contextLost,true);
  assert.equal(second.heldFaultCanvas.contextLost,true);
  assert.equal(first.heldFaultCanvas.id,event.canvas);
  assert.equal(first.heldFaultCanvas.frames,event.frames,'no submission after context-loss event');
  assert.equal(second.heldFaultCanvas.frames,event.frames,'lost canvas frames stay stopped');
  assert.equal(second.heldFaultCanvas.connected,false,'failed host removed lost canvas');
  for(const observation of [first,second]){
    assert.equal(observation.summary.disposed,true);
    assert.equal(observation.summary.running,false);
    assert.deepEqual(observation.summary.lifetime,{created:generation+1,disposed:generation+1});
    assert.equal(observation.canvases.length,0);
    assert.equal(observation.dom.length,1);assert.equal(observation.dom[0].state,'failed');
    assert.ok(observation.dom[0].status,'visible failed-state status text');
    assert.equal(observation.dom[0].input,null,'scene input listener removed');
    assert.ok(observation.dom[0].disabledActions.every(Boolean),'failed scene actions disabled');
  }
  await bounded(page.evaluate(()=>{window.__cozyContextLoss.pendingCanvas=null;}),1000,'release observed old canvas');
  result.elapsedMs=performance.now()-start;
  result.oldCanvasReferenceReleasedBeforeRecovery=true;
  progress(`${mode}-loss-verified`,{isTrusted:event.isTrusted,contextLost:event.contextLost,frames:event.frames,lifetime:second.summary.lifetime});
  return result;
}
async function input(generation){
  progress(`generation-${generation}-native-input`);
  return bounded((async()=>{
    await page.evaluate(()=>{window.__cozyQA.setStatic(true);window.__cozyQA.setActive(true);});
    const before=await stopped();
    assert.equal(before.dom[0].input,'ready');
    const button=page.getByRole('button',{name:'찻잔 살짝 건드리기',exact:true});
    assert.equal(await button.isEnabled(),true);await button.focus();
    assert.equal(await button.evaluate(element=>document.activeElement===element),true);
    await page.evaluate(()=>{window.__cozyContextLoss.nativeInput=[];});
    await page.keyboard.press('Enter');
    await page.waitForFunction(count=>window.__cozyQA.events.length>=count+1,before.eventCount,{timeout:READY_MS});
    const after=await stopped(),event=after.events.at(-1);
    assert.equal(after.eventCount,before.eventCount+1,'one native Enter callback');
    assert.equal(event.world,world);assert.equal(event.type,'cup');
    assert.ok(Number.isFinite(event.intensity)&&event.intensity>0&&event.intensity<=.35);
    assert.equal(after.summary.instance,before.summary.instance);assert.equal(after.canvases[0].id,before.canvases[0].id);
    assert.equal(after.summary.frames,before.summary.frames+1,'discrete action rendered a real stopped frame');
    assert.equal(after.summary.time,before.summary.time);
    const clicks=after.nativeInput.filter(event=>event.type==='click');
    assert.equal(clicks.length,1);assert.equal(clicks[0].isTrusted,true);
    assert.ok(after.nativeInput.some(event=>event.type==='keydown'&&event.key==='Enter'&&event.isTrusted));
    return {before,after,event,method:'Native browser Enter on original cup action, with trusted key/click observation'};
  })(),READY_MS,'fresh engine native input');
}
async function finalDispose(generation){
  progress(`generation-${generation}-final-dispose`);
  const start=performance.now();
  const observation=await bounded((async()=>{
    await page.evaluate(()=>{
      window.__cozyContextLoss.disposal={requestAt:performance.now(),detachedAt:null,disposedAt:null};
      window.__cozyQA.setMounted(false);
    });
    await page.waitForFunction(()=>{
      const record=window.__cozyContextLoss.disposal;
      if(!document.querySelector('canvas'))record.detachedAt??=performance.now();
      if(window.__cozyQA.inspect()?.disposed===true){record.disposedAt??=performance.now();return true;}
      return false;
    },null,{timeout:Math.max(1,DISPOSE_MS-(performance.now()-start)),polling:100});
    return snapshot();
  })(),DISPOSE_MS,'final normal disposal including diagnostics');
  assert.deepEqual(observation.summary.lifetime,{created:generation+1,disposed:generation+1});
  assert.equal(observation.summary.disposed,true);assert.equal(observation.dom.length,0);assert.equal(observation.canvases.length,0);
  assert.equal(observation.heldFaultCanvas,null,'old fault canvas was released before recovery');
  assert.ok(observation.disposal.detachedAt!==null);
  assert.ok(observation.disposal.disposedAt-observation.disposal.requestAt>=HOST_GRACE_MS-10,'normal host grace retained');
  progress(`generation-${generation}-final-disposed`,{lifetime:observation.summary.lifetime});
  return {observation,elapsedMs:performance.now()-start};
}

try{
  progress('verify-original-entry-and-bundle');report.manifest=await verifiedManifest(bundle);
  assert.equal(report.manifest.harness,'Unmodified original qa/index.html and qa/main.tsx; same Vite settings as verify.mjs');
  const originalFiles=['components/immersiveWorlds/cozyRooms/qa/main.tsx','components/immersiveWorlds/cozyRooms/qa/index.html','components/liveScene/liveSceneHost.ts'];
  report.unchangedFiles={};
  for(const file of originalFiles){
    const bytes=await readFile(path.join(root,file));
    assert.equal(sha256(bytes),sha256(execFileSync('git',['show',`HEAD:${file}`],{cwd:root})),`unchanged original ${file}`);
    report.unchangedFiles[file]=sha256(bytes);
    if(file.endsWith('liveSceneHost.ts'))assert.ok(bytes.toString().includes('this.disposeTimer = window.setTimeout(() => this.teardown(), 5000);'));
  }
  const expected=['components/immersiveWorlds/cozyRooms/qa/main.tsx','components/immersiveWorlds/cozyRooms/engine.ts','components/liveScene/liveSceneHost.ts'],found=new Set();
  for(const file of report.manifest.bundle.files.filter(file=>file.endsWith('.map'))){
    const map=JSON.parse(await readFile(path.join(bundle,file),'utf8'));
    for(let i=0;i<map.sources.length;i++)for(const name of expected)if(map.sources[i].replaceAll('\\','/').endsWith(name)){
      assert.equal(map.sourcesContent?.[i],await readFile(path.join(root,name),'utf8'),`untransformed bundle source ${name}`);found.add(name);
    }
  }
  assert.deepEqual([...found].sort(),expected.sort(),'original sources present in final bundle');
  server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4215),strictPort:true}});
  // The public BrowserServer process handle permits bounded cleanup of this
  // runner's own browser if the driver stops responding during actual loss.
  browserServer=await chromium.launchServer({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:browserArgs});
  browser=await chromium.connect(browserServer.wsEndpoint(),{timeout:READY_MS});
  report.browser=await browser.version();report.launch='Playwright launchServer/connect, unchanged shared Chromium flags';
  page=await browser.newPage({viewport,deviceScaleFactor:1,serviceWorkers:'block'});page.setDefaultTimeout(READY_MS);
  page.on('pageerror',error=>{report.errors.push(error.stack||String(error));progress(currentStage,{pageError:error.message});});
  page.on('console',message=>{
    if(message.type()==='error'&&!/favicon/.test(message.text())){report.errors.push(message.text());progress(currentStage,{consoleError:message.text()});}
    else if(message.type()==='warning')report.warnings.push(message.text());
  });
  page.on('crash',()=>{report.errors.push('Page crashed');progress(currentStage,{pageCrash:true});});
  await page.addInitScript(()=>{
    window.__cozyContextLoss={canvasIds:new WeakMap(),canvasSerial:0,pendingCanvas:null,fault:null,nativeInput:[],disposal:null};
    for(const type of ['keydown','keyup','click'])document.addEventListener(type,event=>{
      if(event.target instanceof Element&&event.target.closest('.cozy-world-access button')){
        const records=window.__cozyContextLoss.nativeInput;
        records.push({type:event.type,key:event.key??null,isTrusted:event.isTrusted,at:performance.now()});
        if(records.length>24)records.shift();
      }
    },true);
  });
  await page.emulateMedia({reducedMotion:'no-preference'});
  progress('initial-navigation');
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=${encodeURIComponent(world)}`,{timeout:READY_MS});
  for(const [index,mode] of ['running','paused'].entries()){
    const generation=index*2,result={mode,passed:false};report.cases.push(result);
    if(index>0)await bounded(mount(),READY_MS,'next case mount');
    result.initial=await ready(generation);result.motion=await prepareFault(mode);
    result.loss=await lose(mode,generation);await save();
    progress(`${mode}-failed-holder-unmount`);
    await bounded((async()=>{
      await page.evaluate(()=>window.__cozyQA.setMounted(false));
      await page.waitForFunction(()=>!document.querySelector('.cozy-world'),null,{timeout:DISPOSE_MS});
    })(),DISPOSE_MS,'failed holder unmount');
    await bounded(mount(),READY_MS,'fresh recovery mount');
    result.recovered=await ready(generation+1);result.input=await input(generation+1);
    result.finalDisposal=await finalDispose(generation+1);result.passed=true;
    progress(`${mode}-case-passed`);await save();
  }
  assert.equal(report.cases.length,2);assert.ok(report.cases.every(result=>result.passed));
  assert.equal(new Set(report.identities.map(item=>item.engine)).size,4);
  assert.equal(new Set(report.identities.map(item=>item.canvas)).size,4);
  assert.deepEqual(report.cases.at(-1).finalDisposal.observation.summary.lifetime,{created:4,disposed:4});
  assert.deepEqual(report.errors,[]);
  progress('verify-final-source-and-bundle');const finalManifest=await verifiedManifest(bundle);
  assert.equal(finalManifest.source.sha256,report.manifest.source.sha256,'production bytes stayed fixed for the whole run');
  assert.equal(finalManifest.bundle.sha256,report.manifest.bundle.sha256,'bundle bytes stayed fixed for the whole run');
  for(const [file,hash] of Object.entries(report.unchangedFiles))assert.equal(sha256(await readFile(path.join(root,file))),hash);
  report.finalGitHead=gitHead();report.passed=true;progress('context-loss-passed');
}catch(error){
  failure=error;report.passed=false;report.failure={stage:currentStage,error:error.stack||String(error)};
  progress('context-loss-failed',report.failure);
  if(page){try{report.failureSnapshot=await bounded(snapshot(),1000,'failure DOM/status snapshot');}
    catch(error){report.failureSnapshotError=String(error);}}
}finally{
  await save();
  if(browserServer){
    try{await bounded(browserServer.close(),10000,'owned browser cleanup');}
    catch(error){
      report.passed=false;report.cleanupError=String(error);failure??=error;
      try{await bounded(browserServer.kill(),5000,'owned browser forced cleanup');report.ownedBrowserKilled=true;}
      catch(killError){
        report.ownedBrowserKillError=String(killError);
        try{browserServer.process()?.kill('SIGKILL');report.ownedBrowserKillRequested=true;}
        catch(signalError){report.ownedBrowserSignalError=String(signalError);}
      }
    }
  }
  if(server){
    try{server.httpServer.closeAllConnections?.();await bounded(new Promise(resolve=>server.httpServer.close(resolve)),5000,'preview cleanup');}
    catch(error){report.passed=false;report.previewCleanupError=String(error);failure??=error;}
  }
  report.finishedAt=new Date().toISOString();await save();
}
if(failure)throw failure;
