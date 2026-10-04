import { chromium } from 'playwright-core';
import { preview } from 'vite';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

// QA is deliberately outside the application router. Start preview and browser
// together: restricted Work shells may each have an isolated loopback namespace.
const owned=resolve('components/immersiveWorlds/deepWater');
const output=resolve(process.env.DEEP_WATER_QA_OUTPUT||`${owned}/qa/evidence`);
const dist=resolve(process.env.DEEP_WATER_QA_DIST||'/tmp/deepwater-qa-dist');
await mkdir(output,{recursive:true});
async function manifest(root,source=false) {
 const items=[];
 async function walk(directory){for(const entry of await readdir(directory,{withFileTypes:true})){
  const path=resolve(directory,entry.name);
  if(entry.isDirectory()){if(entry.name!=='evidence')await walk(path);continue;}
  if(source&&!/\.(ts|tsx|css|html|mjs)$/.test(entry.name))continue;
  const bytes=await readFile(path);items.push({path:relative(root,path),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
 }}
 await walk(root);return items.sort((a,b)=>a.path.localeCompare(b.path));
}
const result={
 createdAt:new Date().toISOString(),
 baselineGitHead:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
 sourceManifest:await manifest(owned,true),bundleManifest:await manifest(dist),
 environment:{renderer:'Chromium headless / SwiftShader software WebGL2',deviceScaleFactor:1,viewportOnly:true,physicalFoldHardwareTested:false,hiddenState:'Synthetic document.hidden + visibilitychange; native tab switching not tested',pointerInput:'Playwright mouse and dispatched PointerEvent; scene raycasts and actual renderer used'},
 checks:[],screenshots:[],scenes:{},errors:[],
};
const server=process.env.DEEP_WATER_QA_BASE?null:await preview({configFile:'components/immersiveWorlds/deepWater/qa/vite.config.ts'});
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH||'/workspace/scratch/2bd758a1b983/browser-runtime/chromium',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
result.environment.browserVersion=browser.version();
const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1,serviceWorkers:'block'});
page.setDefaultTimeout(120000);
page.on('pageerror',error=>result.errors.push(error.message));
page.on('console',message=>{if(message.type()==='error')result.errors.push(message.text());});
const data=()=>page.locator('.deepwater-canvas').evaluate(c=>({...c.dataset,width:c.width,height:c.height}));
const check=(scene,name,condition,details)=>{assert.ok(condition,`${scene}: ${name}`);result.checks.push({scene,name,pass:true,...details===undefined?{}:{details}});console.log(`PASS ${scene}: ${name}`);};
const control=(method,value)=>page.evaluate(({method,value})=>window.__deepWaterQA[method](value),{method,value});
const waitRunning=()=>page.waitForFunction(()=>document.querySelector('canvas')?.dataset.running==='true');
const waitPaused=()=>page.waitForFunction(()=>document.querySelector('canvas')?.dataset.running==='false');
const waitFrames=async(n=2)=>{const before=Number((await data()).frames);await page.waitForFunction(({before,n})=>Number(document.querySelector('canvas')?.dataset.frames)>=before+n,{before,n});};
async function frozen(scene,name){await waitPaused();const before=await data();await page.waitForTimeout(180);const after=await data();check(scene,name,before.time===after.time&&before.frames===after.frames,{frames:after.frames,time:after.time});}
async function screenshot(scene,name,width,height){
 await page.setViewportSize({width,height});
 await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c?.width===width&&c?.height===height&&Number(c.dataset.frames)>0},{width,height});
 const file=`${scene}-${name}.png`;await page.screenshot({path:resolve(output,file)});
 const bytes=await readFile(resolve(output,file));const stats=await data();
 result.screenshots.push({scene,name,file,width,height,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,renderer:stats});
 check(scene,`${name} nonzero parent-filling native DPR 1 canvas`,stats.width===width&&stats.height===height&&Number(stats.triangles)>0);
 console.log(`SCREENSHOT ${resolve(output,file)}`);
}
try {
 for(const scene of (process.env.DEEP_WATER_SCENES||'waterfall,cave,sea').split(',')){
  const base=process.env.DEEP_WATER_QA_BASE||'http://127.0.0.1:4198';
  await page.goto(`${base}/?scene=${scene}&active=1&static`);
  await page.waitForSelector('.deepwater-world[data-state="ready"]');
  await waitPaused();
  check(scene,'static3D renders real first frame while active=true',Number((await data()).frames)>0&&Number((await data()).triangles)>0);
  await frozen(scene,'static3D does not animate');
  for(const [name,width,height] of [['desktop',1280,800],['portrait',390,844],['fold-inner',884,1104],['landscape',1104,884]])await screenshot(scene,name,width,height);
  await page.setViewportSize({width:800,height:600});
  await page.waitForFunction(()=>document.querySelector('canvas')?.width===800);
  await control('setActive',false);await control('setStatic',false);
  await frozen(scene,'active=false freezes renderer and simulation');
  await control('setActive',true);await waitRunning();await waitFrames();
  // Pause only for each readback so software WebGL does not accumulate an
  // unbounded queue while Chromium encodes PNGs. Both images follow real RAF
  // frames advanced with active=true; production rendering is unchanged.
  await control('setActive',false);await waitPaused();
  const frameA=await page.screenshot();const timeA=Number((await data()).time);
  await control('setActive',true);await waitRunning();await waitFrames(3);
  await control('setActive',false);await waitPaused();const frameB=await page.screenshot();
  check(scene,'active=true advances simulation and changes real pixels',Number((await data()).time)>timeA&&!frameA.equals(frameB));
  await control('setActive',true);await waitRunning();await waitFrames();
  // Find a visible interaction target using ordinary screen coordinates. No engine
  // interact call or synthetic callback is used: every attempt runs pointer handlers
  // and the scene raycaster. Failed target taps do not emit an event.
  const candidates=scene==='sea'?[[.63,.40],[.63,.43],[.60,.43],[.65,.40],[.60,.40],[.62,.45],[.66,.43],[.58,.43]]:[[.5,.68],[.5,.60],[.65,.63],[.36,.65],[.5,.75],[.65,.73],[.35,.75],[.52,.55]];
  let tap=null;
  for(const [x,y] of candidates){
   await page.evaluate(({x,y})=>{const root=document.querySelector('.deepwater-world');const r=root.getBoundingClientRect();const init={bubbles:true,isPrimary:true,pointerId:31,pointerType:'touch',button:0,clientX:r.left+x*r.width,clientY:r.top+y*r.height};root.dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointerup',init));},{x,y});
   const events=await page.evaluate(()=>window.__deepWaterQA.interactions);
   if(events.length){tap={x,y,event:events.at(-1)};break;}
  }
  check(scene,'tap reaches actual raycast and bounded interaction callback',!!tap&&tap.event.world===scene&&tap.event.strength>=0&&tap.event.strength<=1&&Math.abs(tap.event.pan)<=1,tap);
  result.scenes[scene]={interaction:tap};
  const eventCount=await page.evaluate(()=>window.__deepWaterQA.interactions.length);
  await page.waitForTimeout(700);
  await page.evaluate(()=>{const root=document.querySelector('.deepwater-world');const init={bubbles:true,isPrimary:true,pointerId:32,pointerType:'mouse',button:0,clientX:350,clientY:280};root.dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointermove',{...init,clientX:510,clientY:310}));});
  await waitFrames(2);
  check(scene,'bounded look drag turns real camera',Math.abs(Number((await data()).yaw))>.0001&&await page.locator('.deepwater-world').getAttribute('data-look')==='drag');
  await page.evaluate(()=>window.dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,isPrimary:true,pointerId:32,pointerType:'mouse',button:0,clientX:510,clientY:310})));
  check(scene,'pointer cancellation clears drag without tap',await page.locator('.deepwater-world').getAttribute('data-look')===null&&(await page.evaluate(()=>window.__deepWaterQA.interactions.length))===eventCount);
  await page.evaluate(()=>{const root=document.querySelector('.deepwater-world');const init={bubbles:true,isPrimary:true,pointerId:33,pointerType:'touch',button:0,clientX:350,clientY:280};root.dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointermove',{...init,clientX:440}));window.dispatchEvent(new PointerEvent('pointerup',{...init,clientX:440}));});
  check(scene,'completed drag is not treated as a tap',(await page.evaluate(()=>window.__deepWaterQA.interactions.length))===eventCount);
  await control('setActive',false);await frozen(scene,'pause after interaction freezes simulation');
  await page.mouse.click(400,400);
  check(scene,'paused pointer input emits no interaction',(await page.evaluate(()=>window.__deepWaterQA.interactions.length))===eventCount);
  await page.evaluate(()=>{window.__savedDeepWaterCanvas=document.querySelector('canvas');});
  await control('setSecondHolder',true);await page.waitForSelector('#second-holder canvas');
  check(scene,'second holder reuses exact canvas and one context',await page.evaluate(()=>document.querySelector('#second-holder canvas')===window.__savedDeepWaterCanvas&&document.querySelectorAll('canvas').length===1));
  await control('setSecondHolder',false);await page.waitForSelector('#primary-holder canvas');
  check(scene,'closing second holder returns original canvas',await page.evaluate(()=>document.querySelector('#primary-holder canvas')===window.__savedDeepWaterCanvas));
  await control('setActive',true);await waitRunning();await waitFrames();
  await page.emulateMedia({reducedMotion:'reduce'});await frozen(scene,'prefers-reduced-motion stops renderer');
  await page.emulateMedia({reducedMotion:'no-preference'});await waitRunning();await waitFrames();
  await page.evaluate(()=>document.documentElement.classList.add('reduce-motion'));await frozen(scene,'application reduce-motion class stops renderer');
  await page.evaluate(()=>document.documentElement.classList.remove('reduce-motion'));await waitRunning();await waitFrames();
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await frozen(scene,'synthetic document.hidden signal stops renderer');
  await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await waitRunning();await waitFrames();check(scene,'synthetic visible signal resumes renderer',true);
  await control('setActive',false);await waitPaused();
  for(let i=0;i<3;i++){
   await control('setMounted',false);await page.waitForFunction(()=>!document.querySelector('canvas'));
   await control('setMounted',true);await page.waitForSelector('.deepwater-world[data-state="ready"]');
   check(scene,`rapid mount cycle ${i+1} reuses original canvas`,await page.evaluate(()=>document.querySelector('canvas')===window.__savedDeepWaterCanvas));
  }
  await control('setMounted',false);await page.waitForFunction(()=>!document.querySelector('canvas'));
  result.scenes[scene].beforeDisposal=await page.evaluate(()=>({host:window.__deepWaterQA.diagnostics(),state:window.__deepWaterQA.state,savedCanvas:{...window.__savedDeepWaterCanvas.dataset}}));
  await page.waitForFunction(()=>window.__savedDeepWaterCanvas.dataset.disposed==='true',null,{polling:100,timeout:120000});
  result.scenes[scene].afterDisposal=await page.evaluate(()=>({host:window.__deepWaterQA.diagnostics(),savedCanvas:{...window.__savedDeepWaterCanvas.dataset}}));
  check(scene,'last holder release disposes GPU renderer after grace period',!result.scenes[scene].afterDisposal.host.hasEngine,{observedSoftwareElapsedMs:result.scenes[scene].afterDisposal.host.time-result.scenes[scene].beforeDisposal.host.time});
  await control('setMounted',true);await page.waitForSelector('.deepwater-world[data-state="ready"]');
  check(scene,'post-disposal remount creates new working canvas',await page.evaluate(()=>document.querySelector('canvas')!==window.__savedDeepWaterCanvas)&&Number((await data()).triangles)>0);
  result.scenes[scene].finalRenderer=await data();
 }
 check('all','zero JavaScript or shader errors',result.errors.length===0,result.errors);
 result.sourceManifestAfter=await manifest(owned,true);
 check('all','rendered source remained unchanged during QA',JSON.stringify(result.sourceManifest)===JSON.stringify(result.sourceManifestAfter));
 result.status='passed';
} catch(error){result.status='failed';result.failure=String(error?.stack||error);result.failureDiagnostics=await page.evaluate(()=>({host:window.__deepWaterQA?.diagnostics?.(),state:window.__deepWaterQA?.state,savedCanvas:window.__savedDeepWaterCanvas?{...window.__savedDeepWaterCanvas.dataset}:null})).catch(()=>null);console.log('FAILURE DIAGNOSTICS',JSON.stringify(result.failureDiagnostics));throw error;}
finally{await writeFile(resolve(output,'results.json'),JSON.stringify(result,null,2));await browser.close();if(server)await new Promise(resolve=>server.httpServer.close(resolve));console.log(`EVIDENCE ${resolve(output,'results.json')}`);}
