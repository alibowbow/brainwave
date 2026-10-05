// Revised completion contract; immutable original sequence provenance is checked below.
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {appendFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {preview} from 'vite';
import {chromium} from 'playwright-core';
import {verifyChrome} from '../chrome-checks.mjs';
import {verifiedManifest,sha256} from '../followup/common.mjs';
import {bounded,completeAndStable,completionSnapshot,COMPLETION_MS,revisedContract} from './completion.mjs';
import {assertFreshOutput,bindProvenance,assertProvenanceUnchanged} from './provenance.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)),qa=path.dirname(here),root=path.resolve(qa,'../../../..');
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence','original-sequence'));const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-static-completion-bundle');await assertFreshOutput(output,'verification.json');await mkdir(output,{recursive:true});
const manifest=await verifiedManifest(bundle),source=manifest.source,bundleDigest=manifest.bundle;
const upstreamSHA256='87d6993d9fe2ff1f122706f523c9d2e1ba3e3591c2ed2d781d26a7bb4d49bad8';
assert.equal(sha256(await readFile(path.join(qa,'verify.mjs'))),upstreamSHA256,'immutable original full sequence');
const provenance={upstreamPath:'qa/verify.mjs',upstreamSHA256,runnerSHA256:sha256(await readFile(fileURLToPath(import.meta.url))),completionSHA256:sha256(await readFile(path.join(here,'completion.mjs'))),chromeSHA256:sha256(await readFile(path.join(qa,'chrome-checks.mjs')))};
const binding=await bindProvenance(bundle,[fileURLToPath(import.meta.url),path.join(here,'completion.mjs'),path.join(here,'provenance.mjs'),path.join(qa,'verify.mjs'),path.join(qa,'chrome-checks.mjs'),path.join(qa,'followup/common.mjs')]);
const progressFile=path.join(output,'progress.jsonl');await writeFile(progressFile,'');
let currentStage='setup',failure=null,failureSnapshot=null;const completions=[],lifecycles=[];
function progress(record){currentStage=record.label??record.stage??currentStage;appendFileSync(progressFile,JSON.stringify({timestamp:new Date().toISOString(),...record})+'\n');}
const settle=(label,options={})=>completeAndStable(page,{label,onSample:progress,...options});
const server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4201),strictPort:true}});
const address=server.httpServer.address();const base=`http://127.0.0.1:${address.port}`;
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const browserVersion=await browser.version();
const page=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1,serviceWorkers:'block'});page.setDefaultTimeout(120000);
const worlds=(process.env.COZY_WORLDS||'relax,sleep_prep,power_nap,nature:winter_lodge').split(',');
const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errors.push(m.text());});
const inspect=()=>page.evaluate(()=>window.__cozyQA.inspect());
const state=(key,value)=>page.evaluate(([key,value])=>window.__cozyQA[key](value),[key,value]);
const freeze=async()=>{const deadline=performance.now()+COMPLETION_MS;await state('setActive',false);await page.waitForFunction(()=>document.querySelector('.cozy-world').dataset.motion==='paused'&&!window.__cozyQA.inspect().running);const acknowledged=await settle('paused required image',{deadline});completions.push(acknowledged);return acknowledged.diagnostic;};
const input=async(type,x,y,id=81)=>page.evaluate(({type,x,y,id})=>{const target=type==='pointerdown'?document.querySelector('canvas'):window;target.dispatchEvent(new PointerEvent(type,{bubbles:true,isPrimary:true,pointerId:id,pointerType:'touch',button:0,clientX:x,clientY:y}));},{type,x,y,id});
try {
for(const world of worlds){
  console.log('START',world);await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1280,height:850});
  await page.goto(`${base}/?world=${encodeURIComponent(world)}`);await page.waitForSelector('.cozy-world[data-state="ready"]');
  completions.push(await settle(`${world}: initial image`));
  let d=await inspect();assert.ok(d.frames>0);assert.equal(d.running,false);assert.ok(d.triangles>5000,'real spatial scene geometry');
  const snapshots=[];
  const sizes=[['desktop',1280,850],['portrait',412,915]];
  if(world==='power_nap')sizes.push(['fold-inner-viewport',673,841]);if(world==='nature:winter_lodge')sizes.push(['landscape-viewport',915,412]);
  for(const [name,width,height] of sizes){const deadline=performance.now()+COMPLETION_MS;await page.setViewportSize({width,height});await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c.width===width&&c.height===height;},{width,height});completions.push(await settle(`${world}: ${name} resized image`,{deadline,expectedSize:{width,height,cssWidth:width,cssHeight:height}}));const file=`${world.replace(':','-')}-${name}.png`;const png=await page.screenshot({path:path.join(output,file)});assert.ok(png.length>25000,'rendered PNG has spatial detail');snapshots.push({file,width,height,sha256:createHash('sha256').update(png).digest('hex')});}
  await page.setViewportSize({width:960,height:700});await page.waitForFunction(()=>document.querySelector('canvas').width===960);
  completions.push(await settle(`${world}: input viewport`,{expectedSize:{width:960,height:700,cssWidth:960,cssHeight:700}}));
  await state('setActive',true);await page.waitForFunction(()=>window.__cozyQA.inspect().running);d=await inspect();await page.waitForFunction(n=>window.__cozyQA.inspect().frames>=n+3,d.frames);assert.ok((await inspect()).time>d.time,'motion advances actual scene clock');
  console.log('Motion verified',world);const motionStopDeadline=performance.now()+COMPLETION_MS;await state('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  const touchBaseline=await settle(`${world}: motion-to-static image`,{deadline:motionStopDeadline});
  // Direct touch hits actual visible geometry, not a debug action API.
  const before=await page.evaluate(()=>window.__cozyQA.events.length);d=await inspect();let touched=null,touchPoint=null;const touchDeadline=performance.now()+COMPLETION_MS;
  for(const t of d.targets.filter(t=>t.x>.02&&t.x<.98&&t.y>.02&&t.y<.98&&t.z<1)){
    for(const [dx,dy] of [[0,0],[-12,0],[12,0],[0,-12],[0,12]]){
      const x=t.x*960+dx,y=t.y*700+dy;await page.evaluate(({x,y})=>{const init={bubbles:true,isPrimary:true,pointerId:91,pointerType:'touch',button:0,clientX:x,clientY:y};document.querySelector('canvas').dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointerup',init));},{x,y});
      if(await page.evaluate(n=>window.__cozyQA.events.length>n,before)){touched=t.action;touchPoint={x,y};break;}
    }if(touched)break;
  }
  assert.ok(touched,`${world} visible mesh responds to touch`);
  assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),before+1,'touch emits exactly one callback');
  completions.push(await settle(`${world}: direct-touch image`,{deadline:touchDeadline,afterRevision:touchBaseline.requestRevision,expectedInstance:touchBaseline.diagnostic.instance,expectedCanvasId:touchBaseline.canvasId}));
  console.log('Touch verified',world,touched);await state('setStatic',false);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  const afterTouch=await page.evaluate(()=>window.__cozyQA.events.length);
  await input('pointerdown',480,350);await input('pointermove',570,380);await page.waitForFunction(()=>document.querySelector('.cozy-world').dataset.look==='drag');await input('pointerup',570,380);
  assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),afterTouch,'drag is never tap');assert.equal(await page.locator('.cozy-world').getAttribute('data-look'),null);
  await input('pointerdown',480,350);await input('pointercancel',480,350);assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),afterTouch,'cancel is never tap');
  // Cancel a drag that returns to its origin: maximum excursion, not final distance.
  await input('pointerdown',480,350);await input('pointermove',530,350);await input('pointermove',480,350);await input('pointerup',480,350);assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),afterTouch);
  // Keyboard access invokes all advertised bounded scene actions.
  await state('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  const buttons=page.locator('.cozy-world-access button');for(let i=0;i<await buttons.count();i++){const beforeImage=await settle(`${world}: keyboard ${i} baseline`),deadline=performance.now()+COMPLETION_MS;const n=await page.evaluate(()=>window.__cozyQA.events.length);await buttons.nth(i).focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n+1,'each keyboard control dispatches exactly one event');assert.equal(await page.evaluate(()=>window.__cozyQA.events.at(-1).world),world);completions.push(await settle(`${world}: keyboard ${i} image`,{deadline,afterRevision:beforeImage.requestRevision,expectedInstance:beforeImage.diagnostic.instance,expectedCanvasId:beforeImage.canvasId}));assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n+1,'completion does not duplicate keyboard callback');}
  await state('setStatic',false);
  assert.ok(await page.evaluate(()=>window.__cozyQA.events.every(e=>e.intensity>=0&&e.intensity<=.35)));
  await page.locator('body').click({position:{x:2,y:2}});
  const chromeChecks=await verifyChrome(page,world,touchPoint);console.log('Chrome overlay verified',world);
  completions.push(await settle(`${world}: chrome final image`));
  if(world==='relax'){const file='relax-chrome-visible.png';const png=await page.screenshot({path:path.join(output,file)});snapshots.push({file,width:960,height:700,sha256:createHash('sha256').update(png).digest('hex')});}
  await state('setChrome',false);await state('setStatic',false);const paused=await freeze();console.log('Inputs/pause verified',world);
  await state('setSecond',true);await page.waitForSelector('.second canvas');assert.equal(await page.locator('canvas').count(),1);assert.equal((await inspect()).instance,paused.instance,'second holder reuses same WebGL engine');completions.push(await settle(`${world}: second holder image`,{expectedInstance:paused.instance}));
  console.log('Second holder verified',world);await state('setSecond',false);await page.waitForSelector('main canvas');assert.equal((await inspect()).instance,paused.instance);completions.push(await settle(`${world}: restored holder image`,{expectedInstance:paused.instance}));
  await state('setActive',true);await page.waitForFunction(()=>window.__cozyQA.inspect().running);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!window.__cozyQA.inspect().running);const reduced=await settle(`${world}: reduced-motion image`);completions.push(reduced);await page.waitForTimeout(160);assert.equal((await inspect()).frames,reduced.diagnostic.frames);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>window.__cozyQA.inspect().running);await state('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);assert.ok((await inspect()).frames>0,'static3D retains actual frame');completions.push(await settle(`${world}: static3D image`));await state('setStatic',false);
  // Explicitly synthetic visibility event; not misreported as real background tab.
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  const hidden=await inspect();await page.waitForTimeout(180);const hiddenAfter=await inspect();assert.equal(hiddenAfter.frames,hidden.frames);assert.equal(hiddenAfter.time,hidden.time,'hidden scene clock stays fixed');
  await state('setStatic',true);await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});completions.push(await settle(`${world}: visible static resume image`));await state('setStatic',false);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  await freeze();
  console.log('Motion policies verified',world);for(let i=0;i<3;i++){await state('setMounted',false);await page.waitForFunction(()=>!document.querySelector('canvas'));await state('setMounted',true);await page.waitForSelector('.cozy-world[data-state="ready"] canvas');assert.equal((await inspect()).instance,paused.instance,'rapid remount reuses renderer');completions.push(await settle(`${world}: rapid remount ${i} image`,{expectedInstance:paused.instance}));}
  // Additional revised-contract regression after all fixed-pose captures.
  const resizeBaseline=await settle(`${world}: active-resize baseline`);await state('setActive',true);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  const resizeDeadline=performance.now()+COMPLETION_MS;await page.setViewportSize({width:980,height:720});await state('setActive',false);await page.waitForFunction(()=>!window.__cozyQA.inspect().running,null,{timeout:Math.max(1,resizeDeadline-performance.now())});
  const resized=await settle(`${world}: active resize then stop`,{deadline:resizeDeadline,afterRevision:resizeBaseline.requestRevision,expectedInstance:resizeBaseline.diagnostic.instance,expectedCanvasId:resizeBaseline.canvasId,expectedSize:{width:980,height:720,cssWidth:980,cssHeight:720}});completions.push(resized);
  const restoreDeadline=performance.now()+COMPLETION_MS;await page.setViewportSize({width:960,height:700});completions.push(await settle(`${world}: restored size after stop`,{deadline:restoreDeadline,expectedInstance:resized.diagnostic.instance,expectedCanvasId:resized.canvasId,expectedSize:{width:960,height:700,cssWidth:960,cssHeight:700}}));
  const end=await inspect();const lifecycle={world,oldBeforeUnmount:end,clock:'Node performance.now for gate boundaries; production phases use page performance.now',unmountRequestedAtNode:performance.now()};lifecycles.push(lifecycle);progress({label:`${world}: final disposal`,lifecycle});
  await state('setMounted',false);console.log('Final holder detached',world,await page.locator('canvas').count());await page.waitForFunction(()=>window.__cozyQA.inspect()?.disposed===true,null,{timeout:30000,polling:100});const disposed=await inspect();lifecycle.disposedObservedAtNode=performance.now();lifecycle.oldDisposed=disposed;assert.equal(disposed.lifetime.disposed,disposed.lifetime.created,'no engine remains after grace');
  lifecycle.freshMountRequestedAtNode=performance.now();await state('setMounted',true);lifecycle.freshReadyGate={boundMs:120000,startedAtNode:performance.now(),passed:false};progress({label:`${world}: original fresh-ready gate`,lifecycle});
  try{await page.waitForSelector('.cozy-world[data-state="ready"] canvas',{timeout:120000});lifecycle.freshReadyGate.passed=true;}finally{lifecycle.freshReadyGate.endedAtNode=performance.now();lifecycle.freshReadyGate.elapsedMs=lifecycle.freshReadyGate.endedAtNode-lifecycle.freshReadyGate.startedAtNode;progress({label:`${world}: original fresh-ready gate result`,lifecycle});}
  lifecycle.freshReady=await inspect();assert.notEqual(lifecycle.freshReady.instance,end.instance,'fresh engine after disposal');const freshCompleted=await settle(`${world}: fresh image after original ready gate`);completions.push(freshCompleted);lifecycle.freshAcknowledged=freshCompleted;
  results.push({world,snapshots,checks:[...chromeChecks,'real3D-first-frame','active-animation','direct-touch-'+touched,'keyboard-actions','bounded-intensity','drag-not-tap','returning-drag-not-tap','pointer-cancel','paused-clock','same-canvas-second-holder','reduced-motion','static3D','synthetic-hidden','rapid-remount','delayed-disposal','recreate-after-disposal'],render:freshCompleted.diagnostic,originalSequenceRenderSnapshot:d,lifecycle});console.log('PASS',world);
}
assert.deepEqual(errors,[]);
} catch(error){failure={stage:currentStage,error:String(error),stack:error?.stack};progress({stage:currentStage,type:'failure',failure});try{failureSnapshot=await bounded(completionSnapshot(page),performance.now()+1000,'failure snapshot');}catch(snapshotError){failureSnapshot={unavailable:String(snapshotError)};}throw error;} finally {
let identityError=null;try{await assertProvenanceUnchanged(bundle,binding);}catch(error){identityError=String(error);}
const report={passed:!failure&&!identityError&&results.length===worlds.length&&errors.length===0,revisedContract:true,originalGateClaim:false,contract:revisedContract,provenance,binding,completions,lifecycles,failure,failureSnapshot,identityError,worlds,timestamp:new Date().toISOString(),gitHead:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),source,bundle:bundleDigest,browser:browserVersion,renderer:'SwiftShader software WebGL; no device FPS or thermal claims',visibility:'synthetic document.hidden and visibilitychange; not actual browser tab switching',fold:'viewport emulation only; no Fold hardware tested',results,errors};
await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));try{await bounded(browser.close(),performance.now()+10000,'browser close');}catch(error){report.passed=false;report.cleanupError=String(error);}finally{server.httpServer.closeAllConnections?.();await new Promise(r=>server.httpServer.close(r));await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));}if(!report.passed&&!failure)throw new Error(report.cleanupError??identityError??'revised verification failed');
}
