import assert from 'node:assert/strict';
import path from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import {build,preview} from 'vite';
import react from '@vitejs/plugin-react';
import {chromium} from 'playwright-core';
import {browserArgs,sourceDigest} from '../followup/common.mjs';
import {qa,here,diagnosticPlugin,manifest,attachStream} from './instrumentation.mjs';

const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence/clean'));
const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-recreation-bundle');await mkdir(output,{recursive:true});
const transforms=[];await build({configFile:false,root:qa,base:'./',plugins:[react(),diagnosticPlugin(transforms)],build:{outDir:bundle,emptyOutDir:true,sourcemap:true,chunkSizeWarningLimit:1000}});
const report={...await manifest(bundle,transforms),passed:false,mode:'one clean winter cold first mount -> dispose -> fresh mount, same document; no screenshots/fences/animation, no retries',stages:[],errors:[]};
await writeFile(path.join(output,'diagnostic.json'),JSON.stringify(report,null,2));
if(process.env.COZY_BUILD_ONLY==='1'){console.log('Build-only probe verified',report.bundle.sha256);process.exit(0);}
const server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{host:'127.0.0.1',port:Number(process.env.COZY_PORT||4213),strictPort:true}});
let browser,page,stream;
async function bounded(promise,ms,label){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label}: external ${ms} ms deadline`)),ms);})]);}finally{clearTimeout(timer);}}
async function checkpoint(name){
 const data=await bounded(page.evaluate(()=>({inspect:window.__cozyQA.inspect(),snapshot:window.__cozyRecreation.snapshot()})),1000,`${name} observation`);
 report.stages.push({name,...data});stream.mark(`node-${name}`,data);await stream.flush();await writeFile(path.join(output,'diagnostic.json'),JSON.stringify(report,null,2));return data.inspect;
}
try{
 browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:browserArgs});report.browser=await browser.version();
 page=await browser.newPage({viewport:{width:960,height:700},deviceScaleFactor:1,serviceWorkers:'block'});page.setDefaultTimeout(120000);stream=await attachStream(page,output);
 stream.mark('node-first-mount-request');
 await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=nature%3Awinter_lodge`);
 await page.waitForSelector('.cozy-world[data-state="ready"] canvas');
 const initial=await checkpoint('first-mount-ready');assert.ok(initial.frames>0);assert.equal(initial.running,false);assert.ok(initial.triangles>5000);
 stream.mark('node-final-holder-unmount-request');await page.evaluate(()=>window.__cozyQA.setMounted(false));
 await page.waitForFunction(()=>window.__cozyQA.inspect()?.disposed===true,null,{timeout:30000,polling:100});
 const disposed=await checkpoint('disposed');assert.equal(disposed.lifetime.disposed,disposed.lifetime.created,'no engine remains after grace');
 stream.mark('node-fresh-mount-request');await stream.flush();await page.evaluate(()=>window.__cozyQA.setMounted(true));
 await page.waitForSelector('.cozy-world[data-state="ready"] canvas');
 const recreated=await checkpoint('fresh-mount-ready');assert.notEqual(recreated.instance,initial.instance,'fresh engine after disposal');
 assert.equal((await sourceDigest()).sha256,report.source.sha256,'production source fixed');
 const browserErrors=stream.events.filter(e=>['console-error','page-error','page-crash'].includes(e.type));assert.deepEqual(browserErrors,[]);
 report.passed=true;
}catch(error){report.errors.push(error.stack||String(error));stream?.mark('node-probe-failed',{error:error.stack||String(error)});if(page){try{await checkpoint('failure-state');}catch(e){report.failureObservationError=String(e);}}process.exitCode=1;}
finally{
 if(stream){await stream.flush();report.streamSummary={events:stream.events.length,lastEvent:stream.events.at(-1)};}
 await writeFile(path.join(output,'diagnostic.json'),JSON.stringify(report,null,2));
 // Final evidence is durable before cleanup; no follow-up browser work.
 if(browser){try{await bounded(browser.close(),10000,'browser close');}catch(error){report.cleanupError=String(error);await writeFile(path.join(output,'diagnostic.json'),JSON.stringify(report,null,2));}}
 await new Promise(resolve=>server.httpServer.close(resolve));
 console.log(JSON.stringify({passed:report.passed,output,lastEvent:report.streamSummary?.lastEvent?.type,errors:report.errors},null,2));
}
