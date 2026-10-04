import {chromium} from 'playwright-core';
import * as T from 'three';
import {createServer} from 'node:http';
import {resolve,extname,sep} from 'node:path';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const mode=process.env.CAFE_TARGETS||'auto';assert.ok(['auto','byte'].includes(mode));
const sourceCommit=git('rev-parse','HEAD');
const dirty=git('status','--porcelain','--untracked-files=all','--','components/immersiveWorlds/cafe','public/immersive-worlds/cafe').split('\n').filter(line=>line&&!line.includes('/qa/screenshots/')&&!line.includes('/qa/VALIDATION.md'));
assert.ok(!dirty.length||process.env.CAFE_QA_ALLOW_DIRTY==='1','Commit source and built pilot before final verification.');
const sha=buffer=>createHash('sha256').update(buffer).digest('hex');
const html=await readFile('public/immersive-worlds/cafe/pilot/index.html','utf8');
const bundle=html.match(/src="\.\/(cafe-pilot-[^"]+\.mjs)"/)[1];
const output=process.env.CAFE_OUTPUT||'/tmp/cafe-qa';await mkdir(output,{recursive:true});
// Serve immutable built bytes, with no dev transform, Vite client or hot reload.
const publicRoot=resolve('public');
const server=createServer(async(req,res)=>{try{
 const path=resolve(publicRoot,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!path.startsWith(publicRoot+sep)){res.writeHead(403).end();return;}
 const bytes=await readFile(path);res.setHeader('Content-Type',({'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json'})[extname(path)]||'application/octet-stream');res.end(bytes);
}catch{res.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const port=server.address().port;
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1});page.setDefaultTimeout(120000);
const errors=[];const result={verificationId:randomUUID(),startedAt:new Date().toISOString(),sourceCommit,sourceTree:git('rev-parse','HEAD^{tree}'),uncommitted:dirty.length>0,targetPreference:mode,bundle,bundleSha256:sha(await readFile('public/immersive-worlds/cafe/pilot/'+bundle)),environmentSha256:sha(await readFile('public/immersive-worlds/cafe/room-environment.hdr')),status:'running',checks:[],screenshots:[],errors};
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const data=()=>page.locator('.cafe-world-canvas').evaluate(c=>({...c.dataset,width:c.width,height:c.height}));
const press=name=>page.getByRole('button',{name,exact:true}).dispatchEvent('click');
const check=(message,condition)=>{assert.ok(condition,message);result.checks.push(message);console.log('PASS '+message);};
const waitFrames=async(n=2)=>{const f=Number((await data()).frames);await page.waitForFunction(f=>Number(document.querySelector('canvas')?.dataset.frames)>f+1,f);};
try{
 await page.goto(`http://127.0.0.1:${port}/immersive-worlds/cafe/pilot/index.html?paused&targets=${mode}`);await page.waitForSelector('.cafe-world[data-state="ready"]');
 check('real WebGL scene (not fallback)',(await data()).engine==='three-webgl2'&&Number((await data()).triangles)>30000);
 result.targetAudit=JSON.parse((await data()).targets);
 const expected=mode==='byte'?T.UnsignedByteType:T.HalfFloatType;
 check(mode==='byte'?'forced-byte reflection and refraction':'supported HalfFloat reflection and refraction',result.targetAudit.capability.type===expected&&result.targetAudit.targets.filter(t=>t.label!=='pcf-shadow').every(t=>t.type===expected));
 check('all scene framebuffers complete before drawing',result.targetAudit.targets.length===3&&result.targetAudit.targets.every(t=>t.complete&&t.status===36053));
 check('capability-safe prefiltered environment without runtime PMREM',result.targetAudit.environment.kind==='baked-cubeuv'&&result.targetAudit.environment.runtimePmrem===false&&result.targetAudit.environment.mapping===T.CubeUVReflectionMapping);
 result.targetState=await page.evaluate(()=>window.cafeQA.verifyTargetState());
 check('actual GL target, cube face 4 and mip 1 restored',result.targetState.probeRestored&&result.targetState.reflectorRestored&&result.targetState.frameRestored&&result.targetState.glError===0);
 for(const [name,width,height] of [['desktop',1280,850],['fold-portrait',412,915],['fold-inner-portrait',673,841],['fold-landscape',915,412]]){
   await page.setViewportSize({width,height});await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c.width===width&&c.height===height;},{width,height});
   await page.evaluate(()=>document.fonts.ready);const pixels=await page.screenshot({path:`${output}/${name}.png`});result.screenshots.push({name,width,height,bytes:pixels.length,sha256:sha(pixels),targets:JSON.parse((await data()).targets).targets});
   check(`${name}: native canvas dimensions`,(await data()).width===width&&(await data()).height===height);
 }
 await page.setViewportSize({width:800,height:600});await page.waitForTimeout(500);
 const frozen=await data();await page.waitForTimeout(400);check('active=false freezes simulation',frozen.time===(await data()).time);
 await press('Resume');await waitFrames();check('active=true advances actual rendered frames',Number((await data()).time)>Number(frozen.time));
 // Freeze each rendered sample only while reading pixels. Continuous SwiftShader
 // rendering can starve headless capture; both samples retain the same paused UI.
 await press('Pause');await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');const frameA=await page.screenshot();
 await press('Resume');await waitFrames();await press('Pause');await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');const frameB=await page.screenshot();check('rain/steam change real pixels',!frameA.equals(frameB));await press('Resume');
 await page.evaluate(()=>{const c=document.querySelector('canvas');window.savedCafeCanvas=c;const p={bubbles:true,isPrimary:true,pointerId:8,pointerType:'mouse',button:0,clientX:350,clientY:220};c.dispatchEvent(new PointerEvent('pointerdown',p));window.dispatchEvent(new PointerEvent('pointermove',{...p,clientX:510}));});
 await waitFrames();check('look drag turns the camera',Number((await data()).yaw)>.0001);const yawBefore=Number((await data()).yaw);
 await page.evaluate(()=>window.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,isPrimary:true,pointerId:8,pointerType:'mouse',button:0,clientX:510,clientY:220})));
 await page.waitForFunction(y=>Math.abs(Number(document.querySelector('canvas').dataset.yaw))<y*.6,yawBefore);check('release eases camera back',true);
 await press('Pause');await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');
 await press('Fullscreen holder');check('fullscreen moves same canvas',await page.evaluate(()=>document.querySelector('#fullscreen canvas')===window.savedCafeCanvas&&document.querySelectorAll('canvas').length===1));
 await press('Exit fullscreen');check('exit fullscreen returns same canvas',await page.evaluate(()=>document.querySelector('main canvas')===window.savedCafeCanvas));
 await press('Resume');await waitFrames();await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');const reduced=await data();await page.waitForTimeout(300);check('prefers-reduced-motion freezes simulation',reduced.time===(await data()).time);
 await page.emulateMedia({reducedMotion:'no-preference'});await waitFrames();await press('Reduced motion');await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');check('application reduced-motion class freezes simulation',true);await press('Reduced motion');await waitFrames();
 // The headless window stays foreground: emulate only the browser visibility signal,
 // and clearly record that this is an injected signal rather than a physical tab switch.
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');check('hidden visibility signal stops RAF',true);
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await waitFrames();check('visible signal resumes',true);
 // Tap raycasts at current shot coordinates. Coordinates come from camera projection,
 // not engine.interact calls, so pointer handlers and callback delivery are exercised.
 const width=800,height=600,a=width/height,p=1-T.MathUtils.smoothstep(a,.48,1.35);const camera=new T.PerspectiveCamera(43+7*p,a,.04,80);camera.position.set(T.MathUtils.lerp(.10,-.70,p),T.MathUtils.lerp(1.53,1.44,p),T.MathUtils.lerp(3.50,3.12,p));camera.lookAt(new T.Vector3(T.MathUtils.lerp(-.40,-1.35,p),1.30,-1.7));camera.updateMatrixWorld();const targets=[[-.64,1.03,1.45],[-1.15,1.46,.56],[-2,2,-1.55]].map(v=>{const q=new T.Vector3(...v).project(camera);return {x:(q.x+1)*width/2,y:(1-q.y)*height/2};});
 for(const [i,name] of ['cup','lamp','window'].entries()){const p=targets[i];await page.mouse.click(p.x,p.y);await page.waitForFunction(name=>document.querySelector('[data-interaction]').textContent===name,name);check(`${name} tap reaches optional callback`,true);}
 await press('Pause');await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');const paused=await data();await page.mouse.click(targets[0].x,targets[0].y);await page.waitForTimeout(200);check('paused tap causes no scene reaction',(await data()).cupPulse===paused.cupPulse);
 await press('Unmount');await page.waitForFunction(()=>!document.querySelector('.cafe-world-canvas'));await page.waitForFunction(()=>window.savedCafeCanvas.dataset.lifecycle==='disposed',{},{timeout:120000,polling:100});check('last release disposes renderer after host grace period',true);
 await press('Mount');await page.waitForSelector('.cafe-world[data-state="ready"]');check('remount creates a fresh working canvas',await page.evaluate(()=>document.querySelector('canvas')!==window.savedCafeCanvas));
 result.remountAudit=JSON.parse((await data()).targets);check('remount retains selected target policy and complete framebuffers',result.remountAudit.capability.type===expected&&result.remountAudit.targets.every(t=>t.complete));
 check('zero runtime or shader errors',errors.length===0);
 result.status='passed';
 result.note='Chromium 153, SwiftShader software WebGL2, DPR 1; Fold-like viewport emulation, not physical Fold. Hidden signal injected; native tab background behavior not independently exercised.';
}catch(error){result.status='failed';result.failure=String(error);throw error;}finally{result.finishedAt=new Date().toISOString();await writeFile(`${output}/results.json`,JSON.stringify(result,null,2)+'\n');await browser.close();await new Promise(resolve=>server.close(resolve));}
