import {chromium} from 'playwright-core';
import * as T from 'three';
import {createServer} from 'vite';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const output=process.env.CAFE_OUTPUT||'/tmp/cafe-qa';await mkdir(output,{recursive:true});
const server=await createServer({configFile:false,root:'public',server:{host:'127.0.0.1',port:4196}});await server.listen();
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1});page.setDefaultTimeout(120000);
const errors=[];const result={checks:[],screenshots:[],errors};
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const data=()=>page.locator('.cafe-world-canvas').evaluate(c=>({...c.dataset,width:c.width,height:c.height}));
const press=name=>page.getByRole('button',{name,exact:true}).dispatchEvent('click');
const check=(message,condition)=>{assert.ok(condition,message);result.checks.push(message);console.log('PASS '+message);};
const waitFrames=async(n=2)=>{const f=Number((await data()).frames);await page.waitForFunction(f=>Number(document.querySelector('canvas')?.dataset.frames)>f+1,f);};
try{
 await page.goto('http://127.0.0.1:4196/immersive-worlds/cafe/pilot/index.html?paused');await page.waitForSelector('.cafe-world[data-state="ready"]');
 check('real WebGL scene (not fallback)',(await data()).engine==='three-webgl2'&&Number((await data()).triangles)>30000);
 for(const [name,width,height] of [['desktop',1280,850],['fold-portrait',412,915],['fold-inner-portrait',673,841],['fold-landscape',915,412]]){
   await page.setViewportSize({width,height});await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c.width===width&&c.height===height;},{width,height});
   await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${output}/${name}.png`});result.screenshots.push({name,width,height});
   check(`${name}: native canvas dimensions`,(await data()).width===width&&(await data()).height===height);
 }
 await page.setViewportSize({width:800,height:600});await page.waitForTimeout(500);
 const frozen=await data();await page.waitForTimeout(400);check('active=false freezes simulation',frozen.time===(await data()).time);
 await press('Resume');await waitFrames();check('active=true advances actual rendered frames',Number((await data()).time)>Number(frozen.time));
 // Capture actual scene pixels on two running frames, rather than trusting a CSS flag.
 const frameA=await page.screenshot();await waitFrames();const frameB=await page.screenshot();check('rain/steam change real pixels',!frameA.equals(frameB));
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
 const width=800,height=600,a=width/height,p=1-T.MathUtils.smoothstep(a,.48,1.35);const camera=new T.PerspectiveCamera(45+23*p,a,.04,80);camera.position.set(T.MathUtils.lerp(.2,-1.6,p),1.67,T.MathUtils.lerp(4.3,5,p));camera.lookAt(new T.Vector3(T.MathUtils.lerp(-.08,.18,p),1.45,-1.7));camera.updateMatrixWorld();const targets=[[-.64,1.03,1.45],[-1.15,1.46,.56],[-2,2,-1.55]].map(v=>{const q=new T.Vector3(...v).project(camera);return {x:(q.x+1)*width/2,y:(1-q.y)*height/2};});
 for(const [i,name] of ['cup','lamp','window'].entries()){const p=targets[i];await page.mouse.click(p.x,p.y);await page.waitForFunction(name=>document.querySelector('[data-interaction]').textContent===name,name);check(`${name} tap reaches optional callback`,true);}
 await press('Pause');await page.waitForFunction(()=>document.querySelector('canvas').dataset.running==='false');const paused=await data();await page.mouse.click(targets[0].x,targets[0].y);await page.waitForTimeout(200);check('paused tap causes no scene reaction',(await data()).cupPulse===paused.cupPulse);
 await press('Unmount');await page.waitForFunction(()=>!document.querySelector('.cafe-world-canvas'));await page.waitForFunction(()=>window.savedCafeCanvas.dataset.lifecycle==='disposed',{},{timeout:120000,polling:100});check('last release disposes renderer after host grace period',true);
 await press('Mount');await page.waitForSelector('.cafe-world[data-state="ready"]');check('remount creates a fresh working canvas',await page.evaluate(()=>document.querySelector('canvas')!==window.savedCafeCanvas));
 check('zero runtime or shader errors',errors.length===0);
 result.note='Chromium 153, SwiftShader software WebGL2, DPR 1; Fold-like viewport emulation, not physical Fold. Hidden signal injected; native tab background behavior not independently exercised.';
}finally{await writeFile(`${output}/results.json`,JSON.stringify(result,null,2));await browser.close();await server.close();}
