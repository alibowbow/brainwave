#!/usr/bin/env node
/** Actual-app native-input acceptance.
 * Run only after the integration owner says the server/build is ready:
 * SCENE_QA_SERVER_READY=1 SCENE_BASE_URL=http://127.0.0.1:4173 \
 * SCENE_BROWSER_PATH=/path/to/chromium node /absolute/path/to/this-file.mjs
 * SCENE_REPO, SCENE_INPUT_OUTPUT, SCENE_INPUT_CASES=cafe,meditation,waterfall,womb,deep-sea
 * SCENE_INPUT_VIEWPORT=1280x850 and SCENE_INPUT_CONFIG=/absolute/custom-cases.json are optional.
 * Never calls engine interaction/render methods or dispatches DOM PointerEvents.
 * Only observational DOM reads/listeners; mouse/keyboard/CDP trusted touch do all input.
 * Source provenance includes dirty working bytes AND actual served JS/CSS response hashes.
 * A stale build cannot be certified by HEAD alone; the owner must also match served hashes.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

if (process.argv.includes('--help')) {
  console.log('Set SCENE_QA_SERVER_READY=1 only after server-ready instruction. See source header for options.');
  process.exit(0);
}
assert.equal(process.env.SCENE_QA_SERVER_READY, '1', 'Draft is gated: integration owner must confirm server ready before GPU execution.');
const REPO = path.resolve(process.env.SCENE_REPO || '.');
const requireFromRepo = createRequire(path.join(REPO, 'package.json'));
const { chromium } = requireFromRepo('playwright-core');
const THREE = requireFromRepo('three');
const BASE = (process.env.SCENE_BASE_URL || 'http://127.0.0.1:4173').replace(/\/?$/, '/');
const OUTPUT = path.resolve(process.env.SCENE_INPUT_OUTPUT || path.join(process.env.RUNNER_TEMP || '/tmp', 'brainwave-native-input'));
assert.ok(!OUTPUT.startsWith(REPO + path.sep), 'This draft writes evidence outside the shared repository only.');
const [width, height] = (process.env.SCENE_INPUT_VIEWPORT || '1280x850').split('x').map(Number);
assert.ok(width >= 320 && height >= 320 && width <= 2560 && height <= 2560, 'Viewport must be explicit, valid native CSS pixels.');
const VIEWPORT = { width, height };
const TIMEOUT = 60_000, CAPTURE_TIMEOUT = 30_000;
const COMMON = [[.5,.72],[.5,.86],[.28,.78],[.72,.78],[.5,.55],[.3,.5],[.7,.5]];
const WATER = [[.5,.68],[.5,.60],[.65,.63],[.36,.65],[.5,.75],[.65,.73],[.35,.75],[.52,.55]];
const SEA = [[.63,.40],[.63,.43],[.60,.43],[.65,.40],[.60,.40],[.62,.45],[.66,.43],[.58,.43]];
let CASES = [
  { key:'cafe', id:'amb:focus_cafe', title:'카페 집중', mode:'player', route:'#/play/amb/focus_cafe', family:'cafe', candidates:COMMON },
  { key:'meditation', id:'meditation', title:'마음 챙김', mode:'player', route:'#/play/meditation', family:'quiet', candidates:COMMON },
  { key:'waterfall', id:'amb:waterfall_valley', title:'폭포 계곡', mode:'player', route:'#/play/amb/waterfall_valley', family:'deep', candidates:WATER },
  { key:'womb', id:'nature:womb', title:'포근한 심장', mode:'nature', route:'#/nature', family:'quiet', candidates:COMMON },
  { key:'deep-sea', id:'nature:deep_sea', title:'깊은 바다', mode:'nature', route:'#/nature', family:'deep', candidates:SEA },
];
if (process.env.SCENE_INPUT_CONFIG) CASES = JSON.parse(await readFile(process.env.SCENE_INPUT_CONFIG, 'utf8'));
if (process.env.SCENE_INPUT_CASES) { const wanted = new Set(process.env.SCENE_INPUT_CASES.split(',')); CASES = CASES.filter(c => wanted.has(c.key)); }
assert.ok(CASES.length, 'No cases selected.');
for (const c of CASES) assert.ok(c.id && c.key && c.route && c.candidates?.length, 'Each case needs id/key/route/candidates.');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const git = (...args) => execFileSync('git', ['-C', REPO, ...args], { encoding:'utf8' }).trim();
async function sourceSnapshot() {
  const files = git('ls-files', '--cached', '--others', '--exclude-standard').split('\n')
    .filter(f => /\.(?:tsx?|mjs|css|json)$/.test(f) && !/^(?:public|artifacts|dist)\//.test(f)).sort();
  const hashes = {};
  for (const file of files) { try { hashes[file] = sha(await readFile(path.join(REPO, file))); } catch (e) { if (e.code !== 'ENOENT') throw e; hashes[file] = 'DELETED'; } }
  return { head:git('rev-parse','HEAD'), tree:git('rev-parse','HEAD^{tree}'), status:git('status','--porcelain'), workingSourceSha256:sha(JSON.stringify(hashes)), files:hashes };
}
const report = { status:'running', startedAt:new Date().toISOString(), baseUrl:BASE, viewport:VIEWPORT, sourceBefore:await sourceSnapshot(), scriptSha256:sha(await readFile(fileURLToPath(import.meta.url))),
  environment:{input:'Playwright mouse/keyboard and Chromium CDP Input.dispatchTouchEvent; no DOM synthetic pointer events', physicalDevice:false, nativeFullscreen:'Observed when Nature requests it; app immersive is CSS dialog', visibility:'Chrome hide only; no injected document.hidden', rendering:'Production source/buffer quality unchanged'}, cases:[], errors:[], servedResources:[], limitations:['Candidate raycasts are verified through real callback counters; misses are recorded, never converted to success.','Software GPU timing is not physical device performance.','Source/served-byte fingerprints identify the run; HEAD alone does not prove a production build matches dirty source.'] };
await mkdir(OUTPUT, { recursive:true });
const persist = () => writeFile(path.join(OUTPUT,'results.json'), JSON.stringify(report,null,2)+'\n');
await persist();
let browser, currentPage;
const resourceTasks = new Set();
async function bounded(task, ms, label) { let timer; try { return await Promise.race([task(),new Promise((_,reject) => { timer=setTimeout(()=>reject(new Error(`${label} exceeded ${ms}ms`)),ms); })]); } finally { clearTimeout(timer); } }
async function closeBounded(context) { await bounded(()=>context.close(),10_000,'context close').catch(e=>report.errors.push({kind:'cleanup',message:String(e)})); }
function surfaceSelector(mode) { return mode==='immersive' ? '[role="dialog"][aria-label="몰입 화면"]' : mode==='nature' ? '.sound-stage[data-scene-surface]' : 'section[data-scene-surface]'; }
function slotSelector(c, mode) { return `${surfaceSelector(mode)} [data-immersive-world-id="${c.id}"]`; }
const slot = (page,c,mode) => page.locator(slotSelector(c,mode)).first();
async function read(page,c,mode) {
  return slot(page,c,mode).evaluate(el => {
    const world=el.querySelector('[data-state]'),canvas=el.querySelector('canvas'),r=canvas?.getBoundingClientRect();
    const surface=el.closest('[data-scene-surface]');
    return { callbacks:Number(el.dataset.worldCallbacks), state:world?.dataset.state, motion:world?.dataset.motion,
      look:world?.dataset.look??null, canvas:canvas?{...canvas.dataset}:null, time:Number(canvas?.dataset.time??canvas?.dataset.elapsed??0),
      frame:Number(canvas?.dataset.frames??canvas?.dataset.frame??0), touchAction:surface?getComputedStyle(surface).touchAction:null, canvasTouchAction:canvas?getComputedStyle(canvas).touchAction:null, worldTouchAction:world?getComputedStyle(world).touchAction:null,
      rect:r?{x:r.x,y:r.y,width:r.width,height:r.height}:null };
  });
}
async function waitReady(page,c,mode) {
  await slot(page,c,mode).waitFor({timeout:TIMEOUT});
  await page.waitForFunction(selector=>{const s=document.querySelector(selector),w=s?.querySelector('[data-state]');return w?.dataset.state==='ready'||w?.dataset.state==='failed';},slotSelector(c,mode),{timeout:TIMEOUT});
  const s=await read(page,c,mode);assert.equal(s.state,'ready','Real world must be ready, never fallback');assert.ok(s.rect?.width>0&&s.rect.height>0&&s.frame>0);return s;
}
async function waitMotion(page,c,mode,running) {
  await page.waitForFunction(({selector,running})=>document.querySelector(selector)?.querySelector('[data-motion]')?.getAttribute('data-motion')===(running?'running':'paused'),{selector:slotSelector(c,mode),running},{timeout:TIMEOUT});
}
async function advance(page,c,mode,seconds=.75) {
  const before=await read(page,c,mode);
  await page.waitForFunction(({selector,t,seconds})=>{const d=document.querySelector(selector)?.querySelector('canvas')?.dataset;return Number(d?.time??d?.elapsed??0)>=t+seconds;},{selector:slotSelector(c,mode),t:before.time,seconds},{timeout:TIMEOUT});
  await page.waitForTimeout(750); // Also respect wall-clock guarded owners. No clock override.
}
async function chromeState(page,mode) {
  return page.evaluate(({surface,mode})=>{
    if(mode==='nature'){const e=document.querySelector('.sound-studio');return {visible:e?.dataset.controls!=='hidden',dataControls:e?.dataset.controls};}
    const e=document.querySelector(`${surface} > [data-scene-drag]`);if(!e)return null;const s=getComputedStyle(e);return {visible:s.visibility!=='hidden'&&Number(s.opacity)>.01,pointerEvents:s.pointerEvents,visibility:s.visibility,opacity:s.opacity,className:e.className};
  },{surface:surfaceSelector(mode),mode});
}
async function point(page,c,mode,nx,ny) { const r=(await read(page,c,mode)).rect;return {x:r.x+nx*r.width,y:r.y+ny*r.height,nx,ny}; }
async function inspectHit(page,c,mode,p) {
  return page.evaluate(({selector,x,y})=>{const s=document.querySelector(selector),hit=document.elementFromPoint(x,y);return {inside:!!s?.contains(hit),tag:hit?.tagName,control:!!hit?.closest('button,input,select,textarea,a[href],[role="button"],[contenteditable="true"]'),trace:hit?.className};},{selector:slotSelector(c,mode),...p});
}
async function reveal(page,c,mode) {
  const p=await point(page,c,mode,.08,.35);await page.mouse.move(p.x,p.y);
  await page.waitForFunction(({surface,mode})=>{if(mode==='nature')return document.querySelector('.sound-studio')?.getAttribute('data-controls')!=='hidden';const e=document.querySelector(`${surface} > [data-scene-drag]`);return e&&getComputedStyle(e).visibility!=='hidden'&&Number(getComputedStyle(e).opacity)>.01;},{surface:surfaceSelector(mode),mode},{timeout:2500}).catch(()=>{});
  const cs=await chromeState(page,mode);assert.equal(cs?.visible,true,`Reveal must reach chrome: ${JSON.stringify({p,cs,hit:await inspectHit(page,c,mode,p),diagnostics:await read(page,c,mode)})}`);return p;
}
async function hide(page,c,mode) {
  // Native click on scene blurs focused chrome. Its callback, if any, is setup only.
  const p=await point(page,c,mode,.10,.36),hit=await inspectHit(page,c,mode,p);assert.ok(hit.inside&&!hit.control,'Unfocus point must hit scene');
  await page.mouse.click(p.x,p.y);const began=Date.now();await page.waitForTimeout(1000);assert.equal((await chromeState(page,mode))?.visible,true,'Not a tap-to-hide toggle');
  await page.waitForFunction(({surface,mode})=>{if(mode==='nature')return document.querySelector('.sound-studio')?.getAttribute('data-controls')==='hidden';const e=document.querySelector(`${surface} > [data-scene-drag]`);return e&&getComputedStyle(e).visibility==='hidden';},{surface:surfaceSelector(mode),mode},{timeout:10_000});
  const elapsedMs=Date.now()-began;assert.ok(elapsedMs>=3000,'Chrome must hide by its3.6s timer, not immediately');return {elapsedMs,expectedTimerMs:3600,...await chromeState(page,mode)};
}
function cafeProjected(r) {
  const aspect=r.width/r.height,p=1-THREE.MathUtils.smoothstep(aspect,.48,1.35),cam=new THREE.PerspectiveCamera(43+7*p,aspect,.04,80);
  cam.position.set(THREE.MathUtils.lerp(.10,-.70,p),THREE.MathUtils.lerp(1.53,1.44,p),THREE.MathUtils.lerp(3.50,3.12,p));
  cam.lookAt(new THREE.Vector3(THREE.MathUtils.lerp(-.40,-1.35,p),1.30,-1.7));cam.updateMatrixWorld();
  // Pure geometry projection from owner QA; never reads/calls runtime engine objects.
  return [[THREE.MathUtils.lerp(-.64,-.93,p),1.03,1.45],[THREE.MathUtils.lerp(-1.15,-1.29,p),1.46,.56],[-2,2,-1.55]].map(v=>{const q=new THREE.Vector3(...v).project(cam);return [(q.x+1)/2,(1-q.y)/2];});
}
const touchSessions = new WeakMap();
async function touch(page,type,p) {
  let cdp=touchSessions.get(page);
  if(!cdp){cdp=await page.context().newCDPSession(page);touchSessions.set(page,cdp);}
  // Chromium owns a touch stream per CDP session. Detaching between start/end
  // cancels that stream and does not represent a physical gesture.
  await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:['touchEnd','touchCancel'].includes(type)?[]:[{x:p.x,y:p.y,id:1,radiusX:1,radiusY:1,force:1}]});
}
async function tapOnce(page,c,mode,hidden=false,nativeTouch=false) {
  await advance(page,c,mode);if(hidden){await hide(page,c,mode);await advance(page,c,mode);}else await reveal(page,c,mode);
  const r=(await read(page,c,mode)).rect,candidates=c.family==='cafe'?[...cafeProjected(r),...c.candidates]:c.candidates,attempts=[];
  for(const [nx,ny] of candidates){
    if(!(nx>.03&&nx<.97&&ny>.03&&ny<.92))continue;
    if(hidden&&attempts.length){await hide(page,c,mode);await advance(page,c,mode);}
    const p=await point(page,c,mode,nx,ny),hit=await inspectHit(page,c,mode,p);if(!hit.inside||hit.control){attempts.push({nx,ny,skip:'covered or control',hit});continue;}
    const before=await read(page,c,mode),chromeBefore=await chromeState(page,mode);
    assert.equal(chromeBefore.visible,!hidden,'Chrome precondition must hold immediately before input');
    if(nativeTouch){await touch(page,'touchStart',p);await touch(page,'touchEnd',p);}else await page.mouse.click(p.x,p.y);
    await page.waitForTimeout(180);const after=await read(page,c,mode),delta=after.callbacks-before.callbacks;
    attempts.push({nx,ny,hit,chromeBefore,delta});assert.ok(delta===0||delta===1,'One native tap must never emit duplicate callbacks');
    if(delta===1)return {point:p,attempts,input:nativeTouch?'CDP native touch':'Playwright mouse',before,after};
  }
  throw new Error(`No callback-producing raycast target: ${JSON.stringify(attempts)}`);
}
async function dragAndCancel(page,c,mode,p) {
  await advance(page,c,mode);const before=await read(page,c,mode),dx=Math.min(75,before.rect.width*.12),dy=-Math.min(35,before.rect.height*.06);
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+dx,p.y+dy,{steps:8});
  await page.waitForFunction(selector=>document.querySelector(selector)?.querySelector('[data-look="drag"]'),slotSelector(c,mode),{timeout:10_000});
  const held=await read(page,c,mode);assert.equal(held.callbacks,before.callbacks);
  await page.mouse.move(p.x,p.y,{steps:8});await page.mouse.up();await page.waitForTimeout(200);
  assert.equal((await read(page,c,mode)).callbacks,before.callbacks,'Out-and-back drag must not become tap');
  await touch(page,'touchStart',p);await touch(page,'touchMove',{...p,x:p.x+dx,y:p.y+dy});await touch(page,'touchCancel',p);await page.waitForTimeout(200);
  const cancelled=await read(page,c,mode);assert.equal(cancelled.callbacks,before.callbacks,'Native touchCancel must not produce callback');assert.equal(cancelled.look,null,'Cancel clears drag state');
  return {before,held,cancelled};
}
async function controlButtons(page,c,mode) {
  await reveal(page,c,mode);const surface=page.locator(mode==='nature'?'.sound-studio':surfaceSelector(mode));
  const pauseName=mode==='nature'?'정지':'일시정지',before=await read(page,c,mode);
  if(mode!=='nature'){const selected=surface.getByRole('button',{name:'자연 보기',exact:true});await selected.click();assert.equal(await selected.getAttribute('aria-pressed'),'true');assert.equal((await read(page,c,mode)).callbacks,before.callbacks,'Mode control emits zero scene callbacks');}
  const pause=surface.getByRole('button',{name:pauseName,exact:true}).first();await pause.click();await waitMotion(page,c,mode,false);
  assert.equal((await read(page,c,mode)).callbacks,before.callbacks,'Pause control emits zero scene callbacks');
  await surface.getByRole('button',{name:'재생',exact:true}).first().click();await waitMotion(page,c,mode,true);
  assert.equal((await read(page,c,mode)).callbacks,before.callbacks,'Play control emits zero scene callbacks');
  // Reach a genuine chrome control exclusively with native Tab; do not call focus().
  let focused=false;const focusTrace=[];
  for(let i=0;i<45;i++){await page.keyboard.press('Tab');focused=await page.evaluate(({surface,pauseName})=>{const e=document.activeElement;return !!document.querySelector(surface)?.contains(e)&&e?.tagName==='BUTTON'&&(e.getAttribute('aria-label')||e.textContent.trim())===pauseName;},{surface:mode==='nature'?'.sound-studio':surfaceSelector(mode),pauseName});focusTrace.push(await page.evaluate(()=>({tag:document.activeElement?.tagName,label:document.activeElement?.getAttribute('aria-label'),text:document.activeElement?.textContent?.trim().slice(0,50)})));if(focused)break;}
  assert.ok(focused,`Pause control reachable by native Tab: ${JSON.stringify(focusTrace)}`);await page.waitForTimeout(4100);assert.equal((await chromeState(page,mode)).visible,true,'Focused controls stay visible beyond hide deadline');
  await page.keyboard.press('Space');await waitMotion(page,c,mode,false);assert.equal((await read(page,c,mode)).callbacks,before.callbacks,'Keyboard Space control emits zero callbacks');
  await page.keyboard.press('Space');await waitMotion(page,c,mode,true);return {callbacksUnchanged:true,keyboard:'Tab + Space',focusHeldMs:4100};
}
async function screenshot(page,c,mode,label) {
  await reveal(page,c,mode);const surface=page.locator(mode==='nature'?'.sound-studio':surfaceSelector(mode));
  await surface.getByRole('button',{name:mode==='nature'?'정지':'일시정지',exact:true}).first().click();await waitMotion(page,c,mode,false);
  const before=await read(page,c,mode),filename=`${c.key}-${mode}-${label}.png`;
  const bytes=await bounded(()=>page.screenshot({type:'png',timeout:CAPTURE_TIMEOUT}),CAPTURE_TIMEOUT+1000,'native compositor PNG');
  await writeFile(path.join(OUTPUT,filename),bytes);const entry={filename,sha256:sha(bytes),bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sourceSha256:report.sourceBefore.workingSourceSha256,diagnostics:before};
  await surface.getByRole('button',{name:'재생',exact:true}).first().click();await waitMotion(page,c,mode,true);return entry;
}
async function details(page,c) {
  await reveal(page,c,'player');const before=await read(page,c,'player');await page.getByRole('button',{name:'세션 세부 조절 열기',exact:true}).click();
  const opened=await read(page,c,'player');assert.equal(opened.touchAction,'pan-y');assert.equal(opened.worldTouchAction,'pan-y','Owned root must not suppress vertical scroll');assert.equal(opened.canvasTouchAction,'pan-y','Canvas must preserve vertical scroll');assert.equal(opened.callbacks,before.callbacks);
  await page.getByRole('button',{name:'세션 조절 닫기',exact:true}).click();assert.equal((await read(page,c,'player')).touchAction,'none');assert.equal((await read(page,c,'player')).callbacks,before.callbacks);return {opened:'pan-y',closed:'none',callbacksUnchanged:true};
}
async function step(result,name,fn) { const s={name,status:'running',startedAt:new Date().toISOString()};result.checks.push(s);await persist();try{s.evidence=await bounded(fn,180_000,name);s.status='passed';return s.evidence;}catch(e){s.status='failed';s.error=String(e);throw e;}finally{s.finishedAt=new Date().toISOString();await persist();} }
async function auditSurface(page,c,mode,result) {
  await waitReady(page,c,mode);await waitMotion(page,c,mode,true);
  if(mode!=='nature')assert.equal((await chromeState(page,mode)).pointerEvents,'none','Cover must pass through; controls override locally');
  await step(result,`${mode}: visible chrome1tap1callback`,()=>tapOnce(page,c,mode));
  const hidden=await step(result,`${mode}:3.6s hidden chrome native touch1tap1callback`,()=>tapOnce(page,c,mode,true,true));
  await step(result,`${mode}: out-and-back drag and native cancel callback0`,()=>dragAndCancel(page,c,mode,hidden.point));
  await step(result,`${mode}: controls+keyboard+focus callback0`,()=>controlButtons(page,c,mode));
  await step(result,`${mode}: source-bound actual-app PNG`,()=>screenshot(page,c,mode,'chrome'));
}
async function setupObserver(context) {
  await context.addInitScript(()=>{
    const trace={events:[],callbacks:[]};window.__integrationNativeInputAudit=trace;const seen=new WeakSet();let slotId=0;
    const attach=()=>document.querySelectorAll('[data-immersive-world-id]').forEach(el=>{if(seen.has(el))return;seen.add(el);const id=++slotId;let last=Number(el.getAttribute('data-world-callbacks')||0);new MutationObserver(()=>{const next=Number(el.getAttribute('data-world-callbacks')||0);if(next>last)trace.callbacks.push({slot:id,world:el.getAttribute('data-immersive-world-id'),delta:next-last,connected:el.isConnected,time:performance.now()});last=next;}).observe(el,{attributes:true,attributeFilter:['data-world-callbacks']});});
    new MutationObserver(attach).observe(document,{subtree:true,childList:true});
    for(const type of ['pointermove','pointerdown','pointerup','pointercancel','click'])document.addEventListener(type,e=>{trace.events.push({type,trusted:e.isTrusted,pointerType:e.pointerType,x:e.clientX,y:e.clientY,time:performance.now(),tag:e.target?.tagName});if(trace.events.length>500)trace.events.shift();},true);
  });
}
async function openCase(page,c) {
  await page.goto(new URL(c.route,BASE).toString(),{waitUntil:'domcontentloaded',timeout:TIMEOUT});
  if(c.mode==='nature'){
    await page.locator('.sound-mix-grid').getByRole('button',{name:new RegExp(c.title)}).click();await waitReady(page,c,'nature');
    await page.locator('.sound-studio').getByRole('button',{name:'재생',exact:true}).first().click();await waitMotion(page,c,'nature',true);
    await page.getByRole('button',{name:'장면만 보기',exact:true}).click();await page.getByRole('dialog',{name:'자연 장면만 보기',exact:true}).waitFor();
  }else{
    await waitReady(page,c,'player');await page.waitForFunction(()=>!document.querySelector('[data-playback-hint="starting"]'),undefined,{timeout:TIMEOUT});
    const blocked=page.getByRole('button',{name:'눌러서 재생',exact:true});
    if(await blocked.count())await blocked.click();else{const play=page.getByRole('button',{name:'재생',exact:true});if(await play.count())await play.first().click();}
    await waitMotion(page,c,'player',true);
  }
}
try {
  browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH||undefined,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage','--autoplay-policy=document-user-activation-required']});
  for(const c of CASES){
    const result={key:c.key,worldId:c.id,status:'running',checks:[],errors:[]};report.cases.push(result);await persist();
    const context=await browser.newContext({viewport:VIEWPORT,deviceScaleFactor:1,hasTouch:true,serviceWorkers:'block'});await setupObserver(context);const page=await context.newPage();currentPage=page;page.setDefaultTimeout(TIMEOUT);
    page.on('pageerror',e=>result.errors.push({kind:'runtime',message:e.message}));page.on('console',m=>{if(m.type()==='error')result.errors.push({kind:'console',message:m.text()});});
    page.on('response',response=>{if(!/\.(?:m?js|[cm]?tsx?|css)(?:\?|$)/.test(response.url())||!response.ok())return;const task=bounded(async()=>{const b=await response.body();report.servedResources.push({case:c.key,url:response.url(),status:response.status(),bytes:b.length,sha256:sha(b)});},15_000,'served resource hash').catch(e=>result.errors.push({kind:'resource-fingerprint',message:String(e)}));resourceTasks.add(task);task.finally(()=>resourceTasks.delete(task));});
    try{
      await step(result,'native route+playback startup',()=>openCase(page,c));
      await auditSurface(page,c,c.mode,result);
      if(c.mode==='player'){
        await step(result,'detailsOpen retains pan-y',()=>details(page,c));
        const canvas=await slot(page,c,'player').locator('canvas').elementHandle();
        const oldCallbacks=(await read(page,c,'player')).callbacks;
        await step(result,'native immersive entry preserves canvas/controlcallback0',async()=>{await page.getByRole('button',{name:'전체 화면 보기',exact:true}).click();await waitReady(page,c,'immersive');assert.equal(await canvas.evaluate(el=>el===document.querySelector('[aria-label="몰입 화면"] canvas')),true);assert.equal((await read(page,c,'player')).callbacks,oldCallbacks);return {sameCanvas:true};});
        await auditSurface(page,c,'immersive',result);
        await step(result,'Escape during held touch cancels old holder callback0',async()=>{
          await advance(page,c,'immersive');const tap=await point(page,c,'immersive',.5,.6);const old=(await read(page,c,'player')).callbacks;
          const count=await page.evaluate(()=>window.__integrationNativeInputAudit.callbacks.reduce((n,e)=>n+e.delta,0));
          await touch(page,'touchStart',tap);await page.keyboard.press('Escape');await page.getByRole('dialog',{name:'몰입 화면',exact:true}).waitFor({state:'detached'});await touch(page,'touchEnd',tap);await page.waitForTimeout(250);
          assert.equal((await read(page,c,'player')).callbacks,old);assert.equal(await page.evaluate(()=>window.__integrationNativeInputAudit.callbacks.reduce((n,e)=>n+e.delta,0)),count);assert.equal(await canvas.evaluate(el=>el===document.querySelector('section[data-scene-surface] canvas')),true);return {sameCanvas:true,callbacksUnchanged:true};});
        await canvas.dispose();
      }else{
        await step(result,'browser Back during held native touch cancels callback0',async()=>{
          await advance(page,c,'nature');const p=await point(page,c,'nature',.5,.6),before=(await read(page,c,'nature')).callbacks;
          await touch(page,'touchStart',p);await page.goBack({waitUntil:'domcontentloaded',timeout:TIMEOUT});await page.getByRole('dialog',{name:'자연 장면만 보기',exact:true}).waitFor({state:'detached'});await touch(page,'touchEnd',p);await page.waitForTimeout(250);
          assert.equal((await read(page,c,'nature')).callbacks,before);return {callbacksUnchanged:true,hash:await page.evaluate(()=>location.hash)};});
      }
      result.inputTrace=await page.evaluate(()=>window.__integrationNativeInputAudit);assert.ok(result.inputTrace.events.length);assert.ok(result.inputTrace.events.every(e=>e.trusted),'Every observed pointer/click must be browser-trusted');assert.equal(result.errors.length,0,JSON.stringify(result.errors));result.status='passed';
    }catch(e){result.status='failed';result.failure=String(e);try{result.inputTrace=await bounded(()=>page.evaluate(()=>window.__integrationNativeInputAudit),3000,'failure trace');}catch{} }
    finally{await closeBounded(context);await persist();}
  }
} catch(e) {report.errors.push({kind:'fatal',message:String(e)});}
finally {
  if(browser)await bounded(()=>browser.close(),10_000,'browser close').catch(e=>report.errors.push({kind:'cleanup',message:String(e)}));
  await Promise.allSettled([...resourceTasks]);report.sourceAfter=await sourceSnapshot();report.sourceStable=report.sourceAfter.workingSourceSha256===report.sourceBefore.workingSourceSha256;
  report.status=report.cases.length===CASES.length&&report.cases.every(c=>c.status==='passed')&&!report.errors.length&&report.sourceStable?'passed':'failed';
  report.finishedAt=new Date().toISOString();await persist();console.log(JSON.stringify({status:report.status,cases:report.cases.map(c=>({key:c.key,status:c.status,failure:c.failure})),output:OUTPUT,sourceStable:report.sourceStable},null,2));
  process.exitCode=report.status==='passed'?0:1;
}
