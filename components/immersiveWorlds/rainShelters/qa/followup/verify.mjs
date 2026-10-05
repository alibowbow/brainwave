import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdir,readFile,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright-core';
const runnerRoot=path.dirname(fileURLToPath(import.meta.url));
const qaRoot=process.env.RAIN_QA_ROOT || runnerRoot;
const sourceRoot=process.env.RAIN_SOURCE_ROOT || path.resolve(runnerRoot,'../..');
const projectRoot=process.env.RAIN_PROJECT_ROOT || path.resolve(runnerRoot,'../../../../..');
const output=process.env.RAIN_OUTPUT || path.join(runnerRoot,'evidence');
const phase=process.env.RAIN_PHASE || 'after';
const stages=(process.env.RAIN_STAGES || 'capture').split(',');
const worlds=(process.env.RAIN_WORLDS || 'tent,window,porch,storm').split(',');
const modes=(process.env.RAIN_MODES || 'normal,byte').split(',');
const viewports={desktop:{width:1440,height:960},portrait:{width:390,height:844}};
const selectedViews=(process.env.RAIN_VIEWS || 'desktop,portrait').split(',');
const base='http://127.0.0.1:4187/';
const hash=b=>createHash('sha256').update(b).digest('hex');
async function walk(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name)).filter(e=>!['.bundle','evidence','node_modules'].includes(e.name)).map(async e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();}
const sourceHashes=Object.fromEntries(await Promise.all((await walk(sourceRoot)).filter(p=>/\.(tsx?|css|mjs|html)$/.test(p)).map(async p=>[path.relative(projectRoot,p),hash(await readFile(p))])));
const bundleHashes=Object.fromEntries(await Promise.all((await walk(path.join(qaRoot,'.bundle'))).map(async p=>[path.relative(path.join(qaRoot,'.bundle'),p),hash(await readFile(p))])));
const gitHead=execFileSync('git',['rev-parse','HEAD'],{cwd:projectRoot,encoding:'utf8'}).trim();
const report={schema:'rain-followup-segmented-qa-v1',phase,startedAt:new Date().toISOString(),gitHead,sourceHashes,sourceTreeSHA256:hash(JSON.stringify(sourceHashes)),bundleHashes,requested:{worlds,modes,stages,selectedViews},segments:[],limitations:['Emulated viewport/DPR1, no physical device validation.','SwiftShader evidence establishes pixels and behavior; no hardware FPS/thermal claim.','No auditory evaluation; no audio engine exists in this isolated fixture.','Visibility is synthetic document visibility override, explicitly not a native tab switch.','Original 64 segmented checks and failures are retained unchanged. These are additional segmented runs, not one uninterrupted full application pass.','GPU fences poll clientWaitSync(sync,0,0) in later tasks; no gl.finish/readPixels or GL method patch.','Lifecycle gate is 20000 ms removal to actual disposed/context-lost observation, including configured 5000 ms host grace.']};
await mkdir(output,{recursive:true});
const reportFile=path.join(output,`${phase}-${stages.join('-')}-${worlds.join('-')}-${modes.join('-')}.json`);
const save=()=>writeFile(reportFile,JSON.stringify(report,null,2)+'\n');
const tapTargets={tent:[0,0],window:[0,0],porch:[.238,-.428],storm:[.31,.02]};
const actions={tent:'opening',window:'glass-trace',porch:'basin-ripple',storm:'awning'};
const metric=page=>page.locator('.rain-shelter-canvas').evaluate(c=>({frame:+c.dataset.frame,time:+c.dataset.time,width:c.width,height:c.height,drawCalls:+c.dataset.drawCalls,triangles:+c.dataset.triangles}));
const snapshot=page=>page.evaluate(()=>window.__rainFollowupQA?.snapshot()??null);
const count=page=>page.locator('#qa-events').getAttribute('data-count').then(Number);
const event=page=>page.locator('#qa-events').getAttribute('data-events').then(JSON.parse).then(a=>a.at(-1));
const click=(page,id)=>page.locator(id).dispatchEvent('click');
const motion=(page,wanted)=>page.waitForFunction(w=>[...document.querySelectorAll('.rain-shelter')].at(-1)?.dataset.motion===w,wanted,{timeout:20000});
async function fence(page,budgetMs=90000){
 return await page.locator('.rain-shelter-canvas').evaluate(async(c,budget)=>{
  const gl=c.getContext('webgl2'),before={frame:+c.dataset.frame,time:+c.dataset.time,width:c.width,height:c.height};
  if(!gl)throw Error('No WebGL2 context');
  const startedAt=performance.now(),sync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0); if(!sync)throw Error('Null GPU completion fence'); gl.flush();let polls=0,status=gl.TIMEOUT_EXPIRED;
  try{
   while(performance.now()-startedAt<budget){
    await new Promise(r=>setTimeout(r,25)); polls++;status=gl.clientWaitSync(sync,0,0);
    if(gl.isContextLost())throw Error('Context lost while waiting for fence');
    if(status===gl.WAIT_FAILED)throw Error('GPU fence WAIT_FAILED');
    if(+c.dataset.frame!==before.frame||+c.dataset.time!==before.time)throw Error('Submission or simulation changed during paused GPU wait');
    if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED)return {status,elapsedMs:performance.now()-startedAt,polls,before,after:{frame:+c.dataset.frame,time:+c.dataset.time,width:c.width,height:c.height}};
   }
   throw Error(`GPU completion budget exhausted: ${performance.now()-startedAt} ms status=${status}`);
  }finally{gl.deleteSync(sync);}
 },budgetMs);
}
async function nativeTap(page,world){const b=await page.locator('.rain-shelter-canvas').boundingBox(); const [x,y]=tapTargets[world];await page.mouse.click(b.x+(x+1)*b.width/2,b.y+(1-y)*b.height/2);}
async function oneTap(page,world){const old=await count(page);await nativeTap(page,world);assert.equal(await count(page),old+1);assert.equal((await event(page)).action,actions[world]);return await event(page);}
async function pausedStable(page){const before=await metric(page);await page.waitForTimeout(500);const after=await metric(page);assert.equal(after.time,before.time);assert.equal(after.frame,before.frame);return {before,after};}
async function captured(page,result,label,showChrome=false){
 const start=Date.now();result.captureBudgetMs=120000;
 await page.evaluate(chrome=>{document.documentElement.dataset.qaCapture='true';if(chrome)document.documentElement.dataset.qaCaptureChrome='true';},showChrome);
 await page.evaluate(()=>document.fonts.ready);
 result.gpuCompletion=await fence(page,90000);
 const file=`${phase}-${result.world}-${result.mode}-${label}.png`,captureStart=Date.now();
 const bytes=await page.screenshot({path:path.join(output,file),animations:'disabled',timeout:Math.max(1,120000-(Date.now()-start))});
 assert.ok(bytes.length>10000);assert.equal(bytes.readUInt32BE(16),result.viewport.width);assert.equal(bytes.readUInt32BE(20),result.viewport.height);
 result.capture={file,sha256:hash(bytes),bytes:bytes.length,method:'Playwright native page screenshot (PNG)',pngWidth:bytes.readUInt32BE(16),pngHeight:bytes.readUInt32BE(20),captureMs:Date.now()-captureStart,combinedFenceAndCaptureMs:Date.now()-start,canvas:await metric(page)};
 result.captures??=[];result.captures.push({...result.capture,gpuCompletion:result.gpuCompletion});
 await page.evaluate(()=>{delete document.documentElement.dataset.qaCapture;delete document.documentElement.dataset.qaCaptureChrome;});
}
async function behaviorInput(page,result){
 await click(page,'#qa-static'); // active initially false; static3D now enabled before active
 await click(page,'#qa-active'); await motion(page,'paused');
 const staticBefore=await metric(page);await captured(page,result,'static-before');const beforePixels=result.capture.sha256;
 result.checks.push({name:'native visible sibling overlay tap',status:'passed',event:await oneTap(page,result.world)});
 const staticAfter=await metric(page);assert.equal(staticAfter.time,staticBefore.time);assert.equal(staticAfter.frame,staticBefore.frame+1);
 await captured(page,result,'static-after');assert.notEqual(result.capture.sha256,beforePixels);
 result.checks.push({name:'static native interaction redraws exactly once and changes actual PNG pixels',status:'passed',before:staticBefore,after:staticAfter});
 const before=await count(page);await page.locator('[data-qa-chrome-button]').click();assert.equal(await page.locator('#qa-events').getAttribute('data-chrome-clicks'),'1');
 await page.locator('[data-qa-chrome-input]').click({position:{x:80,y:8}});await page.keyboard.press('ArrowLeft');assert.notEqual(await page.locator('[data-qa-chrome-input]').inputValue(),'50');assert.equal(await count(page),before);
 result.checks.push({name:'native chrome button and range input excluded from scene gestures',status:'passed'});
 const b=await page.locator('.qa-drag-overlay').boundingBox(),x=b.x+b.width*.45,y=b.y+b.height*.52;
 await click(page,'#qa-static'); await motion(page,'running');
 await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+100,y+20,{steps:2});assert.equal(await page.locator('.rain-shelter').getAttribute('data-look'),'drag');await page.mouse.up();
 await click(page,'#qa-active'); await motion(page,'paused');assert.equal(await count(page),before);assert.equal(await page.locator('.rain-shelter').getAttribute('data-look'),null);
 result.checks.push({name:'native overlay drag begins bounded look and is not a tap',status:'passed'});
 result.postNativeMotionGpuCompletion=await fence(page);
 await click(page,'#qa-static');await click(page,'#qa-active');await motion(page,'paused');
 const cancellation=await page.locator('.qa-drag-overlay').evaluate(el=>{
  const b=el.getBoundingClientRect();const p={bubbles:true,isPrimary:true,pointerId:19,pointerType:'touch',button:0,clientX:b.width*.5,clientY:b.height*.5};
  el.dispatchEvent(new PointerEvent('pointerdown',p));window.dispatchEvent(new PointerEvent('pointercancel',p));window.dispatchEvent(new PointerEvent('pointerup',p));
  el.dispatchEvent(new PointerEvent('pointerdown',{...p,pointerId:20}));window.dispatchEvent(new FocusEvent('blur'));window.dispatchEvent(new PointerEvent('pointerup',{...p,pointerId:20}));
  return el.closest('[data-scene-surface]').querySelector('.rain-shelter').getAttribute('data-look');
 });assert.equal(cancellation,null);assert.equal(await count(page),before);
 result.checks.push({name:'synthetic pointercancel and blur disarm later pointerup',status:'passed',native:false});
 const first=await page.locator('.rain-shelter-canvas').elementHandle();await click(page,'#qa-second');await page.waitForSelector('#qa-second-holder .rain-shelter-canvas');assert.equal(await page.locator('.rain-shelter-canvas').evaluate((c,original)=>c===original,first),true);await oneTap(page,result.world);
 await click(page,'#qa-second');await page.waitForSelector('#qa-primary-holder .rain-shelter-canvas');assert.equal(await page.locator('.rain-shelter-canvas').evaluate((c,original)=>c===original,first),true);await oneTap(page,result.world);
 result.checks.push({name:'holder transfer and return retain identical canvas and one native tap event',status:'passed'});
 await click(page,'#qa-active');await motion(page,'paused');await captured(page,result,'post-native-chrome',true);
}
async function behaviorMotion(page,result){
 const initial=await metric(page);assert.equal(initial.time,0);assert.ok(initial.frame>=1);result.checks.push({name:'fresh active=false rendered first 3D frame',status:'passed',initial});
 result.checks.push({name:'paused frame and time remain stable',status:'passed',...(await pausedStable(page))});
 await click(page,'#qa-active');await motion(page,'running');await page.waitForFunction(old=>+document.querySelector('.rain-shelter-canvas').dataset.time>old,initial.time);await click(page,'#qa-active');await motion(page,'paused');
 result.checks.push({name:'active animation advances; pause freezes submissions and simulation',status:'passed',...(await pausedStable(page))});result.afterMotionFence=await fence(page);
 await page.emulateMedia({reducedMotion:'reduce'});await click(page,'#qa-active');await motion(page,'paused');result.checks.push({name:'active=true reduced motion remains paused',status:'passed',...(await pausedStable(page))});
 await page.emulateMedia({reducedMotion:'no-preference'});await motion(page,'running');await click(page,'#qa-static');await motion(page,'paused');result.checks.push({name:'static3D remains paused at full quality',status:'passed',...(await pausedStable(page))});
 await page.evaluate(()=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'});Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await click(page,'#qa-static');await motion(page,'paused');result.checks.push({name:'synthetic hidden state pauses active=true',status:'passed',actualTabSwitch:false,...(await pausedStable(page))});
 await page.evaluate(()=>{delete document.visibilityState;delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await motion(page,'running');await click(page,'#qa-active');await motion(page,'paused');result.checks.push({name:'synthetic visibility restore resumes then explicit pause stops',status:'passed'});result.finalGpuCompletion=await fence(page);
}
async function lifecycle(page,result){
 result.capturePerformed=false;result.hostConfiguredGraceMs=5000;result.lifecycleGateMs=20000;
 const first=await page.locator('.rain-shelter-canvas').elementHandle();
 result.preRemoval=await snapshot(page);result.preRemovalMetric=await metric(page);
 // Do not drain using screenshots or fences: this is the independent clean lifecycle case.
 const removedAt=await page.evaluate(()=>{const at=performance.now();window.__rainFollowupQA.mark('removal-request');document.querySelector('#qa-mounted').click();return at;});
 await page.waitForFunction(()=>document.querySelectorAll('.rain-shelter-canvas').length===0);
 result.removalObservedAt=await page.evaluate(()=>performance.now());result.removalRequestedAt=removedAt;
 try{
  await page.waitForFunction(()=>{const s=window.__rainFollowupQA.snapshot();return s.records.at(-1).disposed&&s.records.at(-1).contextLost;},null,{timeout:20000,polling:50});
  const data=await snapshot(page);result.firstDisposal=data;
  const record=data.records.at(-1),entry=record.events.find(e=>e.type==='dispose-entry'),exit=record.events.find(e=>e.type==='dispose-exit');
  result.timing={removeRequestToDisposeEntryMs:entry.at-removedAt,disposeCallMs:exit.elapsedMs,removeRequestToDisposeExitMs:exit.at-removedAt,contextLostObservedMs:data.at-removedAt,maxHeartbeatGapMs:data.maxHeartbeatGapMs};
  assert.ok(result.timing.removeRequestToDisposeExitMs<=20000);assert.equal(record.contextLost,true);
  result.checks.push({name:'first actual disposal completes within 20 s removal gate including five-second grace',status:'passed',timing:result.timing});
 }catch(error){result.firstDisposal=await snapshot(page);result.checks.push({name:'first actual disposal within 20 s removal gate',status:'failed',error:String(error)});result.checks.push({name:'fresh remount and second disposal cycle',status:'unrun',reason:'First cleanup gate failed; no dependent cycle requested.'});throw error;}
 await click(page,'#qa-mounted');await page.waitForSelector('.rain-shelter[data-state="ready"]',{timeout:240000});assert.equal(await page.locator('.rain-shelter-canvas').evaluate((c,o)=>c===o,first),false);assert.equal(+await page.locator('.rain-shelter-canvas').getAttribute('data-time'),0);
 result.checks.push({name:'expired-host remount creates fresh paused canvas',status:'passed'});
 const fresh=await metric(page);await click(page,'#qa-active');await motion(page,'running');await page.waitForFunction(old=>+document.querySelector('.rain-shelter-canvas').dataset.frame>=old+2,fresh.frame);await click(page,'#qa-active');await motion(page,'paused');
 const secondCanvas=await page.locator('.rain-shelter-canvas').elementHandle();await click(page,'#qa-second');await page.waitForSelector('#qa-second-holder .rain-shelter-canvas');await click(page,'#qa-second');await page.waitForSelector('#qa-primary-holder .rain-shelter-canvas');assert.equal(await page.locator('.rain-shelter-canvas').evaluate((c,o)=>c===o,secondCanvas),true);
 result.secondPreRemoval=await snapshot(page);result.secondMotion={before:fresh,after:await metric(page),holderTransfer:true,noScreenshot:true,noPreDisposalFence:true};
 const secondRemoved=await page.evaluate(()=>{const at=performance.now();window.__rainFollowupQA.mark('second-removal-request');document.querySelector('#qa-mounted').click();return at;});
 await page.waitForFunction(()=>document.querySelectorAll('.rain-shelter-canvas').length===0);
 await page.waitForFunction(()=>{const s=window.__rainFollowupQA.snapshot();return s.records.length===2&&s.records[1].disposed&&s.records[1].contextLost;},null,{timeout:20000,polling:50});
 result.secondDisposal=await snapshot(page);const r=result.secondDisposal.records[1],e=r.events.find(e=>e.type==='dispose-exit');assert.ok(e.at-secondRemoved<=20000);result.checks.push({name:'fresh remount second disposal meets same 20 s gate',status:'passed',removalToDisposeExitMs:e.at-secondRemoved});
}
for(const world of worlds)for(const mode of modes)for(const stage of stages)for(const view of(stage==='capture'?selectedViews:['desktop'])){
 const result={world,mode,stage,view,viewport:viewports[view],startedAt:new Date().toISOString(),status:'running',checks:[],errors:[],servedBundleHashes:{}};report.segments.push(result);await save();
 console.log(`START ${phase} ${world} ${mode} ${stage} ${view}`);
 const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH||'/workspace/scratch/2bd758a1b983/browser-runtime/chromium',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const context=await browser.newContext({viewport:result.viewport,deviceScaleFactor:1,serviceWorkers:'block'});const page=await context.newPage();page.setDefaultTimeout(20000);
 page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});const responsePromises=[];
 page.on('response',r=>{if(r.url().startsWith(base)&&(r.url().endsWith('.js')||r.url().endsWith('.css')))responsePromises.push(r.body().then(b=>{result.servedBundleHashes[r.url().slice(base.length)]=hash(b);}));});
 try{
  result.browser={version:browser.version(),backend:'SwiftShader requested',deviceScaleFactor:1};
  await page.goto(`${base}?world=${world}&paused=1&target=${mode==='byte'?'byte':'auto'}`,{waitUntil:'domcontentloaded',timeout:240000});
  await page.waitForSelector('.rain-shelter[data-state="ready"]',{timeout:240000});await motion(page,'paused');await page.waitForTimeout(100);
  result.renderer=await page.locator('.rain-shelter-canvas').evaluate(c=>{const gl=c.getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return {webgl2:true,vendor:ext&&gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),renderer:ext&&gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)};});
  result.readyMetric=await metric(page);result.readyTelemetry=await snapshot(page);
  if(result.readyTelemetry){
    const targets=result.readyTelemetry.records.at(-1).targets;
    assert.equal(targets.mode,mode==='byte'?'force-byte':'auto');
    for(const check of targets.checks){assert.equal(check.complete,true,check.label);assert.equal(check.status,36053);assert.equal(check.stateRestored,true);assert.equal(check.framebufferRestored,true);assert.deepEqual(check.glErrors,[]);assert.deepEqual(check.restorationErrors,[]);}
    if(world==='window'){
      const refraction=targets.checks.filter(c=>c.label==='window-refraction').at(-1);assert.ok(refraction);assert.equal(refraction.width,result.readyMetric.width);assert.equal(refraction.height,result.readyMetric.height);
      if(mode==='byte')assert.equal(refraction.storage,'unsigned-byte');
      else if(targets.capabilities.colorBufferFloat||targets.capabilities.colorBufferHalfFloat)assert.equal(refraction.storage,'half-float');
    }
    if(world==='window'||world==='porch'){const shadow=targets.checks.find(c=>c.label==='directional-shadow');assert.ok(shadow);assert.equal(shadow.width,1024);assert.equal(shadow.height,1024);assert.equal(shadow.storage,'unsigned-byte');}
    result.checks.push({name:'actual full-size target completeness, native capabilities and restored state',status:'passed',targets});
  }
  if(stage==='capture')await captured(page,result,view);
  else if(stage==='input')await behaviorInput(page,result);
  else if(stage==='motion')await behaviorMotion(page,result);
  else if(stage==='lifecycle')await lifecycle(page,result);
  else if(stage==='compatibility'){
    result.initialGpuCompletion=await fence(page);result.stateProbe=await page.evaluate(()=>window.__rainFollowupQA.stateProbe());
    const s=result.stateProbe;assert.equal(s.checked,true);assert.equal(s.sentinelStatus,36053);assert.equal(s.before.face,2);assert.equal(s.before.mip,1);assert.ok(s.before.target);
    for(const key of ['successful','exceptional','hotSuccessful','hotExceptional'])assert.deepEqual(s[key],s.before,key);
    assert.equal(s.caught,true);assert.equal(s.hotCaught,true);assert.equal(s.glError,0);
    if(s.actualRefraction){assert.deepEqual(s.actualRefraction.success,s.before);assert.deepEqual(s.actualRefraction.exception,s.before);assert.equal(s.actualRefraction.caught,true);}
    result.checks.push({name:'actual checked cube face2 mip1 normal+exception helper and owned refraction restoration',status:'passed'});result.finalGpuCompletion=await fence(page);
  }
  else throw Error(`Unknown stage ${stage}`);
  result.finalTelemetry=await snapshot(page);
  await Promise.all(responsePromises);for(const [f,h]of Object.entries(result.servedBundleHashes))assert.equal(h,bundleHashes[f],`served asset bound to disk ${f}`);
  assert.deepEqual(result.errors,[]);result.status='passed';
 }catch(error){result.status='failed';result.error=String(error?.stack||error);try{result.failureTelemetry=await snapshot(page);}catch(e){result.failureTelemetryError=String(e);}}
 finally{result.finishedAt=new Date().toISOString();await save();await context.close();await browser.close();console.log(`${result.status.toUpperCase()} ${world} ${mode} ${stage} ${view}${result.error?' '+result.error.split('\n')[0]:''}`);}
}
report.finishedAt=new Date().toISOString();report.status=report.segments.every(s=>s.status==='passed')?'passed':'failed';await save();console.log(`REPORT ${reportFile}`);if(report.status!=='passed')process.exitCode=1;
