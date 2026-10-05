import {chromium} from 'playwright-core';
import strictAssert from 'node:assert/strict';
import {mkdir,readFile,writeFile,appendFile,readdir} from 'node:fs/promises';
import {appendFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {qa,root,sourceDigest,digest,sha256,gitHead} from '../followup/common.mjs';

// Invoke the original group with NODE_OPTIONS="--import=<absolute-this-file>"
// so every spawned Node world runner inherits this observer. Neither the original
// test file nor the browser bundle is rewritten. There are no GL calls here.
const preloadFile=fileURLToPath(import.meta.url),sessions=new Set();
const SNAPSHOT_MS=1000,FINAL_OBSERVATION_MS=1000,TOTAL_OBSERVATION_MS=5000;
const serializeError=error=>({name:error?.name??typeof error,message:error?.message??String(error),stack:error?.stack??null});
const bounded=async(promise,ms,label)=>{let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label}: ${ms} ms observation deadline`)),ms);})]);}finally{clearTimeout(timer);}};
const originalLaunch=chromium.launch;
function captureFailure(session,event){
 session.report.firstFailure??=event;session.append(event);
 // Preserve the first failure before original finally/cleanup can block.
 try{writeFileSync(path.join(session.directory,'first-failure.json'),JSON.stringify(session.report.firstFailure,null,2));}catch{}
}
for(const method of ['ok','equal','notEqual','deepEqual']){
 const original=strictAssert[method];
 strictAssert[method]=function(...args){
  try{return original.apply(this,args);}catch(error){
   for(const session of sessions)captureFailure(session,{type:'original-assertion-failed',method,observedAt:new Date().toISOString(),error:serializeError(error)});
   throw error;
  }
 };
}

async function identities(){
 const bundle=path.resolve(process.env.COZY_BUNDLE||'/tmp/cozy-qa-bundle');
 const files=['verify.mjs','verify-group.mjs','chrome-checks.mjs','index.html','main.tsx'];
 const hashes=Object.fromEntries(await Promise.all(files.map(async name=>[name,sha256(await readFile(path.join(qa,name)))])));
 return {gitHead:gitHead(),source:await sourceDigest(),bundlePath:bundle,bundle:await digest(bundle),originalFiles:hashes,sharedHostSHA256:sha256(await readFile(path.join(root,'components/liveScene/liveSceneHost.ts'))),preloadSHA256:sha256(await readFile(preloadFile))};
}

async function createSession(browser,startIdentity){
 const output=path.resolve(process.env.COZY_OUTPUT||'/tmp/cozy-qa-final'),directory=path.join(output,'passive-observation');
 await mkdir(directory,{recursive:true});
 const streamFile=path.join(directory,'events.jsonl');await writeFile(streamFile,'');
 const report={schemaVersion:1,method:'Original verify/verify-group files and untransformed browser bundle, with a Node preload observing public Playwright plumbing, delegated strict-assertion methods and an added 1 Hz in-page diagnostics/DOM sampler.',
  limitations:['Sampling invokes the existing inspect() path and reads DOM geometry; it adds CPU/IPC/timing overhead and is not a zero-instrumentation execution.',
   'Only assert.ok/equal/notEqual/deepEqual are delegated to their original methods, recording failure then rethrowing the same error. Comparison expressions, expected values and assertion behavior are unchanged.',
   'No renderer, GL method, production timer/scheduler, production source or gate timeout is replaced. No extra GL call, fence, readback or scene render is requested.',
   'The sampler cannot execute while the page thread is synchronously blocked. Internal boundaries and GL states are available only if production diagnostics retain them.',
   'GPU counts are production-reported diagnostics, not independently counted native draw calls or proof of physical GPU memory reclamation.',
   'Original gate outcome and observation completeness are separate; observer failure never converts a failed original gate into a pass.'],
  timestamp:new Date().toISOString(),sampleIntervalMs:SNAPSHOT_MS,finalObservationMs:FINAL_OBSERVATION_MS,totalBeforeCloseObservationMs:TOTAL_OBSERVATION_MS,identityAtStart:startIdentity,pages:[],firstFailure:null,firstOperationFailure:null,uncaughtFailure:null,observerErrors:[],originalReport:null,pngComparison:[],reconciliationComplete:false};
 let queue=Promise.resolve(),saveQueue=Promise.resolve(),writeError=null;const records=[],seen=new Map(),conflicts=[];
 function append(event,delivery='node'){
  const key=event.documentId&&event.sequence?`${event.documentId}:${event.sequence}`:null,serialized=JSON.stringify(event);
  if(key&&seen.has(key)){if(seen.get(key)!==serialized)conflicts.push({key,incoming:event,delivery});return;}
  if(key)seen.set(key,serialized);
  const record={receivedAt:new Date().toISOString(),delivery,...event};records.push(record);
  queue=queue.then(()=>appendFile(streamFile,`${JSON.stringify(record)}\n`)).catch(error=>{writeError??=serializeError(error);});
 }
 const flush=async()=>{await queue;if(writeError)throw new Error(`Observer write failed: ${writeError.message}`);};
 const save=()=>{saveQueue=saveQueue.catch(()=>{}).then(async()=>{await flush();if(session.observationTimedOut)report.observationComplete=false;await writeFile(path.join(directory,'observation.json'),JSON.stringify(report,null,2));});return saveQueue;};
 const session={report,append,save,flush,directory,output,browser,pages:[],records,conflicts};sessions.add(session);
 append({type:'observer-browser-created',identity:startIdentity});await save();
 return session;
}

function samplePage(){
 if(window.__cozyPassiveObservation)return;
 const events=[],documentId=`${Date.now()}-${Math.random().toString(16).slice(2)}`,canvasIds=new WeakMap(),retired=new Map();
 let sequence=0,canvasSerial=0,lastAt=performance.now(),timer;
 function scalar(value,depth=0){
  if(value===null||typeof value==='string'||typeof value==='boolean')return value;
  if(typeof value==='number')return Number.isFinite(value)?value:String(value);
  if(depth>8)return '[depth limit]';
  if(Array.isArray(value))return value.slice(-128).map(item=>scalar(item,depth+1));
  if(value&&typeof value==='object'){const out={};for(const [key,item]of Object.entries(value))if(key!=='targets'&&typeof item!=='function')out[key]=scalar(item,depth+1);return out;}
  return null;
 }
 function emit(type,detail={}){
  const event={documentId,sequence:++sequence,type,at:performance.now(),...detail};events.push(event);
  // Binding delivery is never awaited by application or sampling code.
  try{window.__cozyPassiveSink?.(event)?.catch(()=>{});}catch{}
  return event;
 }
 function sample(reason){
  const now=performance.now();let diagnostic=null,inspectError=null;
  try{diagnostic=scalar(window.__cozyQA?.inspect?.()??null);}catch(error){inspectError={name:error?.name,message:error?.message,stack:error?.stack};}
  if(diagnostic?.instance)retired.set(diagnostic.instance,diagnostic);
  const canvases=[...document.querySelectorAll('canvas')].map(canvas=>{
   if(!canvasIds.has(canvas))canvasIds.set(canvas,++canvasSerial);
   const rect=canvas.getBoundingClientRect();return{id:canvasIds.get(canvas),instance:canvas.dataset.instance??null,frames:canvas.dataset.frames??null,connected:canvas.isConnected,backingWidth:canvas.width,backingHeight:canvas.height,cssWidth:rect.width,cssHeight:rect.height};
  });
  const dom=[...document.querySelectorAll('.cozy-world')].map(element=>({world:element.dataset.world,state:element.dataset.state,motion:element.dataset.motion,input:element.dataset.input??null,status:element.querySelector('[role="status"]')?.textContent?.slice(0,300)??null,canvasCount:element.querySelectorAll('canvas').length}));
  emit('sample',{reason,lagMs:Math.max(0,now-lastAt-1000),diagnostic,inspectError,canvases,dom});lastAt=now;
 }
 window.addEventListener('error',event=>emit('window-error',{message:event.message,error:scalar(event.error?{name:event.error.name,message:event.error.message,stack:event.error.stack}:null)}));
 window.addEventListener('unhandledrejection',event=>emit('unhandled-rejection',{error:scalar(event.reason?{name:event.reason.name,message:event.reason.message,stack:event.reason.stack}:null)}));
 document.addEventListener('webglcontextlost',event=>{const canvas=event.target;if(!(canvas instanceof HTMLCanvasElement))return;if(!canvasIds.has(canvas))canvasIds.set(canvas,++canvasSerial);emit('context-lost-event',{isTrusted:event.isTrusted,canvasId:canvasIds.get(canvas),instance:canvas.dataset?.instance??null,frames:canvas.dataset?.frames??null});},true);
 window.__cozyPassiveObservation={events,retainedInstances:retired,finish(){clearInterval(timer);sample('before-original-browser-close');return{events,retainedInstances:[...retired.values()]};}};
 emit('observer-installed',{intervalMs:1000,noExtraGLCalls:true});
 timer=setInterval(()=>sample('interval'),1000);
}

async function attachPage(session,page){
 const pageId=session.pages.length+1;session.pages.push({page,pageId,evaluate:page.evaluate.bind(page)});session.report.pages.push({pageId});
 await page.exposeBinding('__cozyPassiveSink',(_,event)=>session.append({pageId,...event},'binding'));
 await page.addInitScript(samplePage);
 page.on('pageerror',error=>session.append({type:'page-error',pageId,error:serializeError(error)}));
 page.on('crash',()=>session.append({type:'page-crash',pageId}));
 page.on('console',message=>{if(message.type()==='error')session.append({type:'console-error',pageId,message:message.text()});});
 function rejected(method,argument,start,error){
  const event={type:'original-operation-rejected',pageId,method,startedAt:new Date(start).toISOString(),observedAt:new Date().toISOString(),argument,error:serializeError(error)};
  session.report.firstOperationFailure??=event;captureFailure(session,event);
  void session.save().catch(writeError=>session.report.observerErrors.push(serializeError(writeError)));
 }
 // Preserve each original promise outcome and error object. Capture failures
 // before verify.mjs enters its finally block and may stall in browser.close.
 for(const method of ['goto','waitForSelector','waitForFunction','evaluate','screenshot']){
  const original=page[method];
  page[method]=function(...args){
   const start=Date.now();
   let result;try{result=original.apply(this,args);}catch(error){record(error);throw error;}
   return result.catch(error=>{record(error);throw error;});
   function record(error){
    rejected(method,typeof args[0]==='string'?args[0].slice(0,500):method==='screenshot'?args[0]?.path??null:typeof args[0],start,error);
    // No awaited diagnostic call or delay is inserted into the rejection path.
   }
  };
 }
 // Cover only the additional public APIs used by original verify/chrome-checks.
 const press=page.keyboard.press;
 page.keyboard.press=function(...args){const start=Date.now();return press.apply(this,args).catch(error=>{rejected('keyboard.press',args[0],start,error);throw error;});};
 const locator=page.locator,wrappedLocators=new WeakSet();
 function wrapLocator(value,label){
  if(wrappedLocators.has(value))return value;wrappedLocators.add(value);
  for(const method of ['count','getAttribute','focus','click']){const original=value[method];value[method]=function(...args){const start=Date.now();return original.apply(this,args).catch(error=>{rejected(`locator.${method}`,label,start,error);throw error;});};}
  const nth=value.nth;value.nth=function(index){return wrapLocator(nth.call(this,index),`${label}.nth(${index})`);};return value;
 }
 page.locator=function(...args){return wrapLocator(locator.apply(this,args),String(args[0]).slice(0,500));};
 session.append({type:'observer-page-attached',pageId});
}

async function finishSession(session){
 if(session.finished)return;session.finished=true;
 const {report}=session;report.beforeOriginalCloseAt=new Date().toISOString();
 for(const {page,pageId,evaluate}of session.pages){
  const reconciliation={pageId,complete:false,recovered:0,error:null};report.pages.find(p=>p.pageId===pageId).reconciliation=reconciliation;
  try{
   // Call the unmodified implementation saved before attaching failure hooks.
   const snapshot=await bounded(evaluate(()=>window.__cozyPassiveObservation?.finish()??null),FINAL_OBSERVATION_MS,'final passive snapshot');
   if(!snapshot)throw new Error('No in-page passive observation installed');
   const oldCount=session.records.length;
   for(const event of snapshot.events)session.append({pageId,...event},'reconciliation');
   reconciliation.recovered=session.records.length-oldCount;await session.flush();
   const bytes=await readFile(path.join(session.directory,'events.jsonl')),disk=bytes.toString('utf8').trim().split('\n').filter(Boolean).map(line=>JSON.parse(line));
   const byKey=new Map(),duplicates=[];
   for(const {receivedAt,delivery,...event}of disk)if(event.documentId&&event.sequence){const key=`${event.documentId}:${event.sequence}`;if(byKey.has(key))duplicates.push(key);else byKey.set(key,JSON.stringify(event));}
   const expected=snapshot.events.map(event=>({pageId,...event})),documentId=expected[0]?.documentId,watermark=Math.max(0,...expected.map(event=>event.sequence));
   const sourceIds=new Set(expected.map(event=>event.sequence));
   const missing=Array.from({length:watermark},(_,index)=>index+1).filter(id=>!sourceIds.has(id)||!byKey.has(`${documentId}:${id}`));
   const mismatches=expected.filter(event=>byKey.get(`${event.documentId}:${event.sequence}`)!==JSON.stringify(event)).map(event=>event.sequence);
   const otherDocuments=[...new Set(disk.filter(event=>event.pageId===pageId&&event.documentId&&event.documentId!==documentId).map(event=>event.documentId))];
   Object.assign(reconciliation,{documentId,watermark,sourceEvents:expected.length,missing,mismatches,unreconciledEarlierDocuments:otherDocuments,duplicateKeys:duplicates,conflicts:session.conflicts,eventsSHA256:sha256(JSON.stringify(expected)),readbackSHA256:sha256(bytes),readbackBytes:bytes.length,scope:'Actual disk read-back through this page snapshot watermark; subsequent Node/cleanup events are outside this array claim. Use original verify-group one-world-per-browser mode; earlier page documents cannot be declared reconciled.'});
   reconciliation.complete=watermark>0&&expected.length===watermark&&missing.length===0&&mismatches.length===0&&duplicates.length===0&&session.conflicts.length===0&&otherDocuments.length===0;
   await writeFile(path.join(session.directory,`page-${pageId}-events.json`),JSON.stringify(expected,null,2));
   await writeFile(path.join(session.directory,`page-${pageId}-retained-instances.json`),JSON.stringify(snapshot.retainedInstances,null,2));
   await writeFile(path.join(session.directory,`page-${pageId}-readback.jsonl`),bytes);
  }catch(error){reconciliation.complete=false;reconciliation.error=serializeError(error);}
 }
 try{report.identityAtEnd=await identities();report.identityUnchanged=report.identityAtStart.source.sha256===report.identityAtEnd.source.sha256&&report.identityAtStart.bundle.sha256===report.identityAtEnd.bundle.sha256&&JSON.stringify(report.identityAtStart.originalFiles)===JSON.stringify(report.identityAtEnd.originalFiles)&&report.identityAtStart.sharedHostSHA256===report.identityAtEnd.sharedHostSHA256&&report.identityAtStart.preloadSHA256===report.identityAtEnd.preloadSHA256;}catch(error){report.identityUnchanged=false;report.observerErrors.push(serializeError(error));}
 try{const file=path.join(session.output,'verification.json');const bytes=await readFile(file);const original=JSON.parse(bytes);report.originalReport={path:'../verification.json',sha256:sha256(bytes),passed:original.passed,worlds:original.worlds,completedResults:original.results.length,errors:original.errors,sourceSHA256:original.source.sha256,bundleSHA256:original.bundle.sha256};}catch(error){report.originalReportError=serializeError(error);}
 report.originalReportBound=!!report.originalReport&&report.originalReport.sourceSHA256===report.identityAtStart.source.sha256&&report.originalReport.bundleSHA256===report.identityAtStart.bundle.sha256;
 const approved=path.join(qa,'followup/evidence/final'),worlds=(process.env.COZY_WORLDS||'relax,sleep_prep,power_nap,nature:winter_lodge').split(',');
 const expected=(await readdir(approved)).filter(name=>name.endsWith('.png')&&worlds.some(world=>name.startsWith(world.replace(':','-')+'-')));
 report.pngCoverage={expectedFiles:expected,missingFiles:[],additionalOutputFiles:[]};
 for(const name of expected){
  let bytes;try{bytes=await readFile(path.join(session.output,name));}catch(error){if(error.code==='ENOENT'){report.pngCoverage.missingFiles.push(name);continue;}throw error;}
  const reference=await readFile(path.join(approved,name));report.pngComparison.push({file:name,bytes:bytes.length,sha256:sha256(bytes),approvedSHA256:sha256(reference),byteIdentical:bytes.equals(reference),reference:path.relative(session.directory,path.join(approved,name))});
 }
 for(const name of (await readdir(session.output)).filter(name=>name.endsWith('.png')&&!expected.includes(name))){const bytes=await readFile(path.join(session.output,name));report.pngCoverage.additionalOutputFiles.push({file:name,bytes:bytes.length,sha256:sha256(bytes)});}
 report.pngCoverage.allExpectedPresent=report.pngCoverage.missingFiles.length===0;
 report.pngCoverage.allExpectedByteIdentical=report.pngCoverage.allExpectedPresent&&report.pngComparison.every(image=>image.byteIdentical);
 report.reconciliationComplete=report.pages.length>0&&report.pages.every(page=>page.reconciliation?.complete);
 report.observationComplete=report.reconciliationComplete&&report.identityUnchanged&&report.originalReportBound&&report.observerErrors.length===0&&!session.observationTimedOut;
 session.append({type:'before-original-browser-close',originalPassed:report.originalReport?.passed??null,observationComplete:report.observationComplete});await session.save();
}

chromium.launch=async function(...args){
 const identity=await identities(),browser=await originalLaunch.apply(this,args);
 const session=await createSession(browser,identity),newPage=browser.newPage,close=browser.close;
 browser.newPage=async function(...pageArgs){const page=await newPage.apply(this,pageArgs);await attachPage(session,page);return page;};
 browser.close=async function(...closeArgs){
  try{await bounded(finishSession(session),TOTAL_OBSERVATION_MS,'entire before-close observation');}catch(error){session.observationTimedOut=true;session.report.observerErrors.push(serializeError(error));session.report.observationComplete=false;void session.save().catch(()=>{});}
  session.append({type:'original-browser-close-entry'});
  try{const value=await close.apply(this,closeArgs);session.report.originalBrowserCloseReturnedAt=new Date().toISOString();session.append({type:'original-browser-close-return'});await bounded(session.save(),TOTAL_OBSERVATION_MS,'post-close observation save').catch(()=>{});return value;}
  catch(error){session.report.originalBrowserCloseError=serializeError(error);session.append({type:'original-browser-close-rejected',error:serializeError(error)});await bounded(session.save(),TOTAL_OBSERVATION_MS,'close-failure observation save').catch(()=>{});throw error;}
 };
 return browser;
};
process.on('uncaughtExceptionMonitor',(error,origin)=>{
 // Node will exit after this monitor; asynchronous writes are not sufficient.
 for(const session of sessions){
  session.report.uncaughtFailure={origin,error:serializeError(error)};
  try{appendFileSync(path.join(session.directory,'events.jsonl'),JSON.stringify({receivedAt:new Date().toISOString(),delivery:'node',type:'uncaught-original-failure',origin,error:serializeError(error)})+'\n');writeFileSync(path.join(session.directory,'observation.json'),JSON.stringify(session.report,null,2));}catch{}
 }
});
