import assert from 'node:assert/strict';
import {mkdir,readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build,preview} from 'vite';
import react from '@vitejs/plugin-react';
import {chromium} from 'playwright-core';
import {verifyChrome} from '../chrome-checks.mjs';
import {diagnosticPlugin,attachStream,manifest} from './instrumentation.mjs';
const diagnosticTransforms=[];
const qa=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),root=path.resolve(qa,'../../../..');
const output=path.resolve(process.env.COZY_OUTPUT||'/tmp/cozy-qa-final');const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-qa-bundle');await mkdir(output,{recursive:true});
async function digest(dir,filter=()=>true){const files=[];async function visit(d){for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())await visit(p);else if(filter(p))files.push(p);}}await visit(dir);files.sort();const hash=createHash('sha256');for(const p of files)hash.update(path.relative(dir,p)).update('\0').update(await readFile(p));return {sha256:hash.digest('hex'),files:files.map(p=>path.relative(dir,p))};}
const source=await digest(path.dirname(qa),p=>/\.(ts|tsx|css)$/.test(p)&&!p.includes('/qa/'));
await build({configFile:false,root:qa,base:'./',plugins:[react(),diagnosticPlugin(diagnosticTransforms)],build:{outDir:bundle,emptyOutDir:true,sourcemap:true,chunkSizeWarningLimit:1000}});
const bundleDigest=await digest(bundle);
const server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4201),strictPort:true}});
const address=server.httpServer.address();const base=`http://127.0.0.1:${address.port}`;
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1,serviceWorkers:'block'});page.setDefaultTimeout(120000);
const diagnosticStream=await attachStream(page,output);
const diagnosticManifest=await manifest(bundle,diagnosticTransforms);
await writeFile(path.join(output,'instrumentation-manifest.json'),JSON.stringify(diagnosticManifest,null,2));
assert.equal(diagnosticManifest.bundle.sha256,process.env.COZY_EXPECTED_BUNDLE,'same instrumented bundle as clean probe');
assert.equal(diagnosticManifest.source.sha256,process.env.COZY_EXPECTED_SOURCE,'same production source as clean probe');
const worlds=(process.env.COZY_WORLDS||'relax,sleep_prep,power_nap,nature:winter_lodge').split(',');
const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errors.push(m.text());});
const inspect=()=>page.evaluate(()=>window.__cozyQA.inspect());
const state=(key,value)=>page.evaluate(([key,value])=>window.__cozyQA[key](value),[key,value]);
const freeze=async()=>{await state('setActive',false);await page.waitForFunction(()=>document.querySelector('.cozy-world').dataset.motion==='paused');const first=await inspect();await page.waitForTimeout(180);const second=await inspect();assert.equal(second.frames,first.frames,'paused RAF does not advance');return second;};
const input=async(type,x,y,id=81)=>page.evaluate(({type,x,y,id})=>{const target=type==='pointerdown'?document.querySelector('canvas'):window;target.dispatchEvent(new PointerEvent(type,{bubbles:true,isPrimary:true,pointerId:id,pointerType:'touch',button:0,clientX:x,clientY:y}));},{type,x,y,id});
try {
for(const world of worlds){
  console.log('START',world);await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1280,height:850});
  await page.goto(`${base}/?world=${encodeURIComponent(world)}`);await page.waitForSelector('.cozy-world[data-state="ready"]');
  let d=await inspect();assert.ok(d.frames>0);assert.equal(d.running,false);assert.ok(d.triangles>5000,'real spatial scene geometry');
  const snapshots=[];
  const sizes=[['desktop',1280,850],['portrait',412,915]];
  if(world==='power_nap')sizes.push(['fold-inner-viewport',673,841]);if(world==='nature:winter_lodge')sizes.push(['landscape-viewport',915,412]);
  for(const [name,width,height] of sizes){await page.setViewportSize({width,height});await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c.width===width&&c.height===height;},{width,height});const file=`${world.replace(':','-')}-${name}.png`;const png=await page.screenshot({path:path.join(output,file)});assert.ok(png.length>25000,'rendered PNG has spatial detail');snapshots.push({file,width,height,sha256:createHash('sha256').update(png).digest('hex')});}
  await page.setViewportSize({width:960,height:700});await page.waitForFunction(()=>document.querySelector('canvas').width===960);
  await state('setActive',true);await page.waitForFunction(()=>window.__cozyQA.inspect().running);d=await inspect();await page.waitForFunction(n=>window.__cozyQA.inspect().frames>=n+3,d.frames);assert.ok((await inspect()).time>d.time,'motion advances actual scene clock');
  console.log('Motion verified',world);await state('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  // Direct touch hits actual visible geometry, not a debug action API.
  const before=await page.evaluate(()=>window.__cozyQA.events.length);d=await inspect();let touched=null,touchPoint=null;
  for(const t of d.targets.filter(t=>t.x>.02&&t.x<.98&&t.y>.02&&t.y<.98&&t.z<1)){
    for(const [dx,dy] of [[0,0],[-12,0],[12,0],[0,-12],[0,12]]){
      const x=t.x*960+dx,y=t.y*700+dy;await page.evaluate(({x,y})=>{const init={bubbles:true,isPrimary:true,pointerId:91,pointerType:'touch',button:0,clientX:x,clientY:y};document.querySelector('canvas').dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointerup',init));},{x,y});
      if(await page.evaluate(n=>window.__cozyQA.events.length>n,before)){touched=t.action;touchPoint={x,y};break;}
    }if(touched)break;
  }
  assert.ok(touched,`${world} visible mesh responds to touch`);
  console.log('Touch verified',world,touched);await state('setStatic',false);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  const afterTouch=await page.evaluate(()=>window.__cozyQA.events.length);
  await input('pointerdown',480,350);await input('pointermove',570,380);await page.waitForFunction(()=>document.querySelector('.cozy-world').dataset.look==='drag');await input('pointerup',570,380);
  assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),afterTouch,'drag is never tap');assert.equal(await page.locator('.cozy-world').getAttribute('data-look'),null);
  await input('pointerdown',480,350);await input('pointercancel',480,350);assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),afterTouch,'cancel is never tap');
  // Cancel a drag that returns to its origin: maximum excursion, not final distance.
  await input('pointerdown',480,350);await input('pointermove',530,350);await input('pointermove',480,350);await input('pointerup',480,350);assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),afterTouch);
  // Keyboard access invokes all advertised bounded scene actions.
  await state('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  const buttons=page.locator('.cozy-world-access button');for(let i=0;i<await buttons.count();i++){const n=await page.evaluate(()=>window.__cozyQA.events.length);await buttons.nth(i).focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n+1,'each keyboard control dispatches exactly one event');assert.equal(await page.evaluate(()=>window.__cozyQA.events.at(-1).world),world);}
  await state('setStatic',false);
  assert.ok(await page.evaluate(()=>window.__cozyQA.events.every(e=>e.intensity>=0&&e.intensity<=.35)));
  await page.locator('body').click({position:{x:2,y:2}});
  const chromeChecks=await verifyChrome(page,world,touchPoint);console.log('Chrome overlay verified',world);
  if(world==='relax'){const file='relax-chrome-visible.png';const png=await page.screenshot({path:path.join(output,file)});snapshots.push({file,width:960,height:700,sha256:createHash('sha256').update(png).digest('hex')});}
  await state('setChrome',false);await state('setStatic',false);const paused=await freeze();console.log('Inputs/pause verified',world);
  await state('setSecond',true);await page.waitForSelector('.second canvas');assert.equal(await page.locator('canvas').count(),1);assert.equal((await inspect()).instance,paused.instance,'second holder reuses same WebGL engine');
  console.log('Second holder verified',world);await state('setSecond',false);await page.waitForSelector('main canvas');assert.equal((await inspect()).instance,paused.instance);
  await state('setActive',true);await page.waitForFunction(()=>window.__cozyQA.inspect().running);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!window.__cozyQA.inspect().running);const reduced=await inspect();await page.waitForTimeout(160);assert.equal((await inspect()).frames,reduced.frames);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>window.__cozyQA.inspect().running);await state('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);assert.ok((await inspect()).frames>0,'static3D retains actual frame');await state('setStatic',false);
  // Explicitly synthetic visibility event; not misreported as real background tab.
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  const hidden=await inspect();await page.waitForTimeout(160);assert.equal((await inspect()).frames,hidden.frames);
  await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  await freeze();
  console.log('Motion policies verified',world);for(let i=0;i<3;i++){await state('setMounted',false);await page.waitForFunction(()=>!document.querySelector('canvas'));await state('setMounted',true);await page.waitForSelector('.cozy-world[data-state="ready"] canvas');assert.equal((await inspect()).instance,paused.instance,'rapid remount reuses renderer');}
  const end=await inspect();await state('setMounted',false);console.log('Final holder detached',world,await page.locator('canvas').count());await page.waitForFunction(()=>window.__cozyQA.inspect()?.disposed===true,null,{timeout:30000,polling:100});const disposed=await inspect();assert.equal(disposed.lifetime.disposed,disposed.lifetime.created,'no engine remains after grace');
  await state('setMounted',true);await page.waitForSelector('.cozy-world[data-state="ready"] canvas');assert.notEqual((await inspect()).instance,end.instance,'fresh engine after disposal');
  results.push({world,snapshots,checks:[...chromeChecks,'real3D-first-frame','active-animation','direct-touch-'+touched,'keyboard-actions','bounded-intensity','drag-not-tap','returning-drag-not-tap','pointer-cancel','paused-clock','same-canvas-second-holder','reduced-motion','static3D','synthetic-hidden','rapid-remount','delayed-disposal','recreate-after-disposal'],render:d});console.log('PASS',world);
}
assert.deepEqual(errors,[]);
} catch (error) {
const failure={passed:false,error:error.stack||String(error),lastEvent:diagnosticStream.events.at(-1)};
diagnosticStream.mark('node-original-sequence-failed',{error:failure.error});await diagnosticStream.flush();
await writeFile(path.join(output,'failure.json'),JSON.stringify(failure,null,2));
let observationDeadline;
try {failure.snapshot=await Promise.race([page.evaluate(()=>({snapshot:window.__cozyRecreation?.snapshot?.()??null,inspect:window.__cozyQA?.inspect?.()??null})),new Promise((_,reject)=>{observationDeadline=setTimeout(()=>reject(new Error('Failure DOM/state observation exceeded 1000 ms')),1000);})]);}
catch (observationError) {failure.observationError=String(observationError);}
finally {clearTimeout(observationDeadline);}
await writeFile(path.join(output,'failure.json'),JSON.stringify(failure,null,2));
await diagnosticStream.flush();throw error;
} finally {
const report={passed:results.length===worlds.length&&errors.length===0,worlds,timestamp:new Date().toISOString(),gitHead:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),source,bundle:bundleDigest,browser:await browser.version(),renderer:'SwiftShader software WebGL; no device FPS or thermal claims',visibility:'synthetic document.hidden and visibilitychange; not actual browser tab switching',fold:'viewport emulation only; no Fold hardware tested',results,errors};
await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));await diagnosticStream.flush();await browser.close();await new Promise(r=>server.httpServer.close(r));
}
