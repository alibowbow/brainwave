import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,writeFile} from 'node:fs/promises';
import {preview} from 'vite';
import {chromium} from 'playwright-core';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
// Run after verify.mjs. Uses its exact bundle, compares actual pixels with UI unfocused.
const root=path.dirname(fileURLToPath(import.meta.url));
const output=process.env.COZY_OUTPUT||'/tmp/cozy-qa-final';
const verification=JSON.parse(await readFile(path.join(output,'verification.json'),'utf8'));
assert.equal(verification.passed,true,'complete lifecycle verification first');
const server=await preview({configFile:false,root,build:{outDir:process.env.COZY_BUNDLE||'/tmp/cozy-qa-bundle'},preview:{port:Number(process.env.COZY_PORT||4201),host:'127.0.0.1',strictPort:true}});
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:800,height:600},deviceScaleFactor:1});page.setDefaultTimeout(120000);
const hash=b=>createHash('sha256').update(b).digest('hex');const results=[];const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {for(const world of ['relax','sleep_prep','power_nap','nature:winter_lodge']){
 await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=${encodeURIComponent(world)}`);await page.waitForSelector('[data-state="ready"]');
 const a=await page.screenshot();const first=await page.evaluate(()=>window.__cozyQA.inspect());
 await page.evaluate(()=>window.__cozyQA.setActive(true));await page.waitForFunction(n=>window.__cozyQA.inspect().frames>=n+12,first.frames);
 await page.evaluate(()=>window.__cozyQA.setActive(false));await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
 const b=await page.screenshot(),last=await page.evaluate(()=>window.__cozyQA.inspect());assert.notEqual(hash(a),hash(b),`${world}: animation changes actual rendered pixels`);
 results.push({world,beforeSHA256:hash(a),afterSHA256:hash(b),framesAdvanced:last.frames-first.frames,sceneTimeAdvanced:last.time-first.time});console.log('PIXEL MOTION PASS',world);
}assert.deepEqual(errors,[]);}finally{await writeFile(path.join(output,'motion-proof.json'),JSON.stringify({passed:results.length===4&&errors.length===0,bundleSHA256:verification.bundle.sha256,sourceSHA256:verification.source.sha256,browser:await browser.version(),method:'Same viewport, frozen frames before/after at least12 actual animation frames; no camera input or UI focus changes.',results,errors},null,2));await browser.close();await new Promise(r=>server.httpServer.close(r));}
