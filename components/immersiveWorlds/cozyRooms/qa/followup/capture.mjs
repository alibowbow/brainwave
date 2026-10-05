import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {preview} from 'vite';
import {chromium} from 'playwright-core';
import {qa,worlds,browserArgs,verifiedManifest,gitHead,state,inspect,capturePNG,drainGPU} from './common.mjs';

const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-followup-bundle');
const output=path.resolve(process.env.COZY_OUTPUT||path.join(qa,'followup/evidence'));
const manifest=await verifiedManifest(bundle);await mkdir(output,{recursive:true});
const nativeInput=process.env.COZY_INTERACTIONS!=='0',cold=process.env.COZY_CAPTURE_COLD!=='0';
const server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4207),strictPort:true}});
const base=`http://127.0.0.1:${server.httpServer.address().port}`;
const report={...manifest,passed:false,timestamp:new Date().toISOString(),gitHead:gitHead(),results:[],errors:[],scope:'Isolated original QA harness; not the integrated app. Native browser input and PNGs. Fold dimensions are viewport emulation only. No hidden-tab claim.'};
let browser;
try{
 for(const world of worlds){
  console.log('FOLLOWUP START',world);
  browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:browserArgs});
  const page=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1,hasTouch:true,serviceWorkers:'block'});page.setDefaultTimeout(30000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/favicon/.test(m.text()))errors.push(m.text());});
  await page.goto(`${base}/?world=${encodeURIComponent(world)}`);await page.waitForSelector('.cozy-world[data-state="ready"][data-input="ready"]');
  const result={world,browser:await browser.version(),snapshots:[],input:null};report.results.push(result);
  if(cold){
   const sizes=[['desktop',1280,850],['portrait',412,915]];
   if(world==='power_nap')sizes.push(['fold-inner-viewport',673,841]);
   if(world==='nature:winter_lodge')sizes.push(['landscape-viewport',915,412]);
   for(const [name,width,height] of sizes){
    await page.setViewportSize({width,height});await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c?.width===width&&c?.height===height;},{width,height});
    console.log('CAPTURE cold',world,name);
    result.snapshots.push(await capturePNG(page,path.join(output,`${world.replace(':','-')}-${name}.png`)));
    await writeFile(path.join(output,'followup-capture.json'),JSON.stringify(report,null,2));
   }
  }
  if(nativeInput){
   await page.setViewportSize({width:960,height:700});await page.waitForFunction(()=>document.querySelector('canvas')?.width===960);
   await state(page,'setStatic',true);await state(page,'setActive',true);await state(page,'setChrome',true);await page.waitForSelector('main>[data-scene-drag]');
   await page.evaluate(()=>{window.__cozyNativeEvents=[];for(const type of ['pointerdown','pointermove','pointerup'])document.addEventListener(type,event=>window.__cozyNativeEvents.push({type,isTrusted:event.isTrusted,pointerType:event.pointerType,target:event.target.hasAttribute?.('data-scene-drag')?'overlay':event.target.tagName}),true);});
   const beforeEvents=await page.evaluate(()=>window.__cozyQA.events.length),d=await inspect(page);let point;
   for(const target of d.targets.filter(t=>t.x>.02&&t.x<.98&&t.y>.02&&t.y<.93&&t.z<1)){
    for(const [dx,dy] of [[0,0],[-12,0],[12,0],[0,-12],[0,12]]){
     const p={x:target.x*960+dx,y:target.y*700+dy};
     const hit=await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.hasAttribute('data-scene-drag'),p);if(!hit)continue;
     await page.mouse.click(p.x,p.y);
     if(await page.evaluate(n=>window.__cozyQA.events.length>n,beforeEvents)){point=p;break;}
    }if(point)break;
   }
   assert.ok(point,'trusted mouse hits visible scene geometry through chrome');
   assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),beforeEvents+1,'native mouse tap exactly once');
   await page.touchscreen.tap(point.x,point.y);
   assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),beforeEvents+2,'trusted touchscreen tap exactly once');
   // Drain interaction draws before motion, so the post-input PNG diagnoses a
   // short native sequence without inheriting screenshot work or old motion.
   await drainGPU(page,120000);
   const pre=await inspect(page);await state(page,'setStatic',false);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
   await page.mouse.move(480,300);await page.mouse.down();await page.mouse.move(555,320);await page.waitForFunction(()=>document.querySelector('.cozy-world').dataset.look==='drag');
   await page.waitForFunction(n=>window.__cozyQA.inspect().frames>=n+3,pre.frames);
   await page.mouse.up();await state(page,'setActive',false);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
   const post=await inspect(page);assert.ok(post.time>pre.time,'native drag sequence runs actual animation');
   assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),beforeEvents+2,'native drag does not tap');
   assert.equal(await page.locator('.cozy-world').getAttribute('data-look'),null);
   const trusted=await page.evaluate(()=>window.__cozyNativeEvents);
   assert.ok(trusted.every(e=>e.isTrusted),'supplemental input events are browser trusted');
   assert.ok(trusted.some(e=>e.pointerType==='mouse'&&e.type==='pointerdown'&&e.target==='overlay'));
   assert.ok(trusted.some(e=>e.pointerType==='touch'&&e.type==='pointerdown'&&e.target==='overlay'));
   // Chrome controls must retain their own action under native input.
   const clicks=await page.evaluate(()=>window.__cozyQA.chromeClicks());await page.locator('main .qa-controls button').click();
   assert.equal(await page.evaluate(()=>window.__cozyQA.chromeClicks()),clicks+1);
   assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),beforeEvents+2);
   result.input={checks:['trusted-mouse-overlay-tap','trusted-touch-overlay-tap','trusted-mouse-overlay-drag-not-tap','native-chrome-button-own-action'],point,before:pre,after:post,events:trusted};
   console.log('CAPTURE post-native-input',world);
   result.snapshots.push(await capturePNG(page,path.join(output,`${world.replace(':','-')}-post-native-input-chrome.png`)));
  }
  assert.deepEqual(errors,[]);result.passed=true;console.log('FOLLOWUP PASS',world);
  await browser.close();browser=null;
  await writeFile(path.join(output,'followup-capture.json'),JSON.stringify(report,null,2));
 }
 await verifiedManifest(bundle);report.passed=true;
}catch(error){report.errors.push(error.stack||String(error));throw error;}
finally{
 await writeFile(path.join(output,'followup-capture.json'),JSON.stringify(report,null,2));
 // A timed-out capture is terminal for its browser: no fallback screenshot or
 // lifecycle evidence is attempted on a potentially contaminated GPU queue.
 if(browser)await browser.close();await new Promise(resolve=>server.httpServer.close(resolve));
}
