import assert from 'node:assert/strict';
import {appendFileSync} from 'node:fs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {preview} from 'vite';
import {chromium} from 'playwright-core';
import {qa,browserArgs,verifiedManifest,sha256} from '../followup/common.mjs';
import {bounded,completeAndStable,completionSnapshot,COMPLETION_MS,revisedContract} from './completion.mjs';
import {assertFreshOutput,bindProvenance,assertProvenanceUnchanged} from './provenance.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence','motion'));
const verificationPath=path.resolve(process.env.COZY_VERIFICATION||path.join(here,'evidence','four-world','verification.json'));
const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-static-completion-bundle');
if(output.startsWith(qa+path.sep)&&!output.startsWith(here+path.sep))throw new Error('Revised output must not overwrite another QA evidence directory');
await assertFreshOutput(output,'motion-proof.json');await mkdir(output,{recursive:true});
const report={passed:false,revisedContract:true,originalGateClaim:false,contract:revisedContract,timestamp:new Date().toISOString(),results:[],errors:[],failure:null,
  method:'Original 12-actual-frame pixel comparison, with production revision/GPU acknowledgement and 180 ms stable frames before each native screenshot. Same unfocused viewport, no extra GL calls/fences/readback or camera input.',
  provenance:{upstreamSHA256:'e59372d22b411f232de2712093e9f6e452b5b6d4379b77dea48ecb0b8467cf38',runnerSHA256:sha256(await readFile(fileURLToPath(import.meta.url))),completionSHA256:sha256(await readFile(path.join(here,'completion.mjs')))}};
const save=()=>writeFile(path.join(output,'motion-proof.json'),JSON.stringify(report,null,2));
const progressFile=path.join(output,'progress.jsonl');await writeFile(progressFile,'');
const progress=record=>appendFileSync(progressFile,JSON.stringify({timestamp:new Date().toISOString(),...record})+'\n');
let server,browser,page,binding;
try{
  assert.equal(sha256(await readFile(path.join(qa,'motion-proof.mjs'))),report.provenance.upstreamSHA256,'immutable original motion proof');
  const verificationBytes=await readFile(verificationPath),verification=JSON.parse(verificationBytes);
  report.verification={path:verificationPath,sha256:sha256(verificationBytes),passed:verification.passed};
  assert.equal(verification.revisedContract,true);assert.equal(verification.originalGateClaim,false);
  assert.equal(verification.passed,true,'complete revised four-world verification first');
  assert.deepEqual(verification.worlds,['relax','sleep_prep','power_nap','nature:winter_lodge']);
  const manifest=await verifiedManifest(bundle);report.manifest=manifest;
  assert.equal(verification.source.sha256,manifest.source.sha256,'motion uses exact revised verified source');
  assert.equal(verification.bundle.sha256,manifest.bundle.sha256,'motion uses exact revised verified bundle');
  binding=await bindProvenance(bundle,[fileURLToPath(import.meta.url),path.join(here,'completion.mjs'),path.join(here,'provenance.mjs'),path.join(qa,'motion-proof.mjs'),path.join(qa,'followup/common.mjs')]);report.binding=binding;
  server=await preview({configFile:false,root:qa,build:{outDir:bundle},preview:{port:Number(process.env.COZY_PORT||4201),host:'127.0.0.1',strictPort:true}});
  browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:browserArgs});report.browser=await browser.version();
  page=await browser.newPage({viewport:{width:800,height:600},deviceScaleFactor:1});page.setDefaultTimeout(120000);
  page.on('pageerror',error=>report.errors.push(error.message));
  for(const world of verification.worlds){
    await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/?world=${encodeURIComponent(world)}`);await page.waitForSelector('[data-state="ready"]',{timeout:120000});
    const first=await completeAndStable(page,{label:`${world}: motion before`,onSample:progress});
    const a=await page.screenshot({path:path.join(output,`${world.replace(':','-')}-before.png`)});
    await page.evaluate(()=>window.__cozyQA.setActive(true));await page.waitForFunction(n=>window.__cozyQA.inspect().frames>=n+12,first.diagnostic.frames,{timeout:120000});
    const deadline=performance.now()+COMPLETION_MS;await page.evaluate(()=>window.__cozyQA.setActive(false));await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
    const last=await completeAndStable(page,{label:`${world}: motion after`,deadline,expectedInstance:first.diagnostic.instance,expectedCanvasId:first.canvasId,onSample:progress});
    const b=await page.screenshot({path:path.join(output,`${world.replace(':','-')}-after.png`)});
    assert.notEqual(sha256(a),sha256(b),`${world}: animation changes actual rendered pixels`);
    assert.ok(last.diagnostic.frames-first.diagnostic.frames>=12);assert.ok(last.diagnostic.time>first.diagnostic.time);
    report.results.push({world,beforeSHA256:sha256(a),afterSHA256:sha256(b),framesAdvanced:last.diagnostic.frames-first.diagnostic.frames,sceneTimeAdvanced:last.diagnostic.time-first.diagnostic.time,first,last});await save();
  }
  assert.deepEqual(report.errors,[]);await assertProvenanceUnchanged(bundle,binding);report.passed=report.results.length===4;
}catch(error){report.failure={error:String(error),stack:error?.stack};if(page)try{report.failureSnapshot=await bounded(completionSnapshot(page),performance.now()+1000,'motion failure snapshot');}catch(snapshotError){report.failureSnapshot={unavailable:String(snapshotError)};}else report.browserLaunched=false;throw error;}
finally{await save();if(browser)try{await bounded(browser.close(),performance.now()+10000,'motion browser close');}catch(error){report.passed=false;report.cleanupError=String(error);}if(server){server.httpServer.closeAllConnections?.();await new Promise(resolve=>server.httpServer.close(resolve));}await save();if(report.cleanupError)throw new Error(report.cleanupError);}
