import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir,writeFile,appendFile,readFile} from 'node:fs/promises';
import {diagnosticPlugin as previousPlugin,manifest as previousManifest} from '../recreation/instrumentation.mjs';
import {digest,sha256,sourceDigest} from '../followup/common.mjs';

export const here=path.dirname(fileURLToPath(import.meta.url));
export const DRAIN_MS=120000,EXTERNAL_DRAIN_MS=125000;
export function diagnosticPlugin(transforms=[]){
 const plugin=previousPlugin(transforms);
 return {...plugin,name:'cozy-old-context-drain-boundaries',transformIndexHtml:{order:'pre',handler(html){const needle='src="./main.tsx"';assert.equal(html.split(needle).length,2,'original QA entry anchor');return html.replace(needle,'src="./gl-boundary/entry.mjs"');}}};
}
export async function manifest(bundle,transforms){return {...await previousManifest(bundle,transforms),glBoundaryScripts:await digest(here,p=>p.endsWith('.mjs')&&!p.includes('/evidence/')&&!path.basename(p).startsWith('.generated-')),intervention:{drainBudgetMs:DRAIN_MS,externalDrainMs:EXTERNAL_DRAIN_MS,insertion:'After all three rapid-remount iterations, immediately before the original final const end=await inspect()/setMounted(false).',meaning:'One diagnostic intervention; not an unchanged original-gate pass. A signaled fence proves completion of preceding old-context GL commands, not physical memory reclamation or presentation.'}};}
export async function bounded(promise,ms,label){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label}: external ${ms} ms deadline; comparison ends without retry`)),ms);})]);}finally{clearTimeout(timer);}}

export async function attachStream(page,output){
 await mkdir(output,{recursive:true});const file=path.join(output,'phases.jsonl');await writeFile(file,'');
 const records=[],byKey=new Map(),conflicts=[];let queue=Promise.resolve(),writeError=null;
 const keyOf=event=>event.documentId&&event.sequence?`${event.documentId}:${event.sequence}`:null;
 function append(event,delivery){
  const key=keyOf(event),serialized=JSON.stringify(event);
  if(key&&byKey.has(key)){if(byKey.get(key).serialized!==serialized)conflicts.push({key,previous:byKey.get(key).event,incoming:event,delivery});return false;}
  if(key)byKey.set(key,{event,serialized});
  const record={receivedAt:new Date().toISOString(),delivery,...event};records.push(record);
  queue=queue.then(()=>appendFile(file,JSON.stringify(record)+'\n')).catch(error=>{writeError??=error;});return true;
 }
 const flush=async()=>{await queue;if(writeError)throw writeError;};
 page.on('console',message=>{const text=message.text();if(text.startsWith('COZY_RECREATION ')){try{append(JSON.parse(text.slice(16)),'console');}catch(error){append({type:'stream-decode-error',message:String(error),text},'node');}}else if(message.type()==='error')append({type:'console-error',message:text},'node');});
 page.on('pageerror',error=>append({type:'page-error',message:error.stack||String(error)},'node'));page.on('crash',()=>append({type:'page-crash'},'node'));
 await page.exposeBinding('__cozyRecreationSink',(_,event)=>append(event,'binding'));
 return {records,mark:(type,detail={})=>append({type,...detail},'node'),flush,async reconcile(label,timeoutMs=3000){
  const before=records.length,result={label,complete:false,recovered:0,conflicts:[],error:null};
  try{
   const snapshot=await bounded(page.evaluate(()=>({events:window.__cozyRecreation?.events??[],snapshot:window.__cozyRecreation?.snapshot?.()??null,inspect:window.__cozyQA?.inspect?.()??null,boundary:window.__glBoundary?.summary?.()??null,drain:window.__glBoundary?.drainResult??null})),timeoutMs,`${label} reconciliation`);
   const documents=new Map();
   for(const event of snapshot.events){if(append(event,'reconciliation'))result.recovered++;if(event.documentId&&event.sequence){const list=documents.get(event.documentId)||[];list.push(event.sequence);documents.set(event.documentId,list);}}
   await flush();
   const bytes=await readFile(file),diskRecords=bytes.toString('utf8').trim().split('\n').filter(Boolean).map(line=>JSON.parse(line)),diskByKey=new Map(),diskDuplicates=[],diskConflicts=[];
   for(const record of diskRecords){const {receivedAt,delivery,...event}=record,key=keyOf(event);if(!key)continue;const serialized=JSON.stringify(event);if(diskByKey.has(key)){diskDuplicates.push(key);if(diskByKey.get(key)!==serialized)diskConflicts.push(key);}else diskByKey.set(key,serialized);}
   const diskContentMismatches=[];
   for(const event of snapshot.events){const key=keyOf(event);if(key&&diskByKey.get(key)!==JSON.stringify(event))diskContentMismatches.push(key);}
   result.documents=[...documents].map(([documentId,sequences])=>{const max=Math.max(...sequences),set=new Set(sequences),throughWatermark=Array.from({length:max},(_,i)=>i+1);return{documentId,watermark:max,sourceEvents:sequences.length,sourceUnique:set.size,missing:throughWatermark.filter(id=>!set.has(id)||!diskByKey.has(`${documentId}:${id}`)),persistedUniqueThroughWatermark:throughWatermark.filter(id=>diskByKey.has(`${documentId}:${id}`)).length};});
   await writeFile(path.join(output,'phases-readback.jsonl'),bytes);
   result.disk={file:'phases.jsonl',readbackCopy:'phases-readback.jsonl',sha256AtReadback:sha256(bytes),bytesAtReadback:bytes.length,recordsAtReadback:diskRecords.length,uniqueSequencedEvents:diskByKey.size,duplicateKeys:diskDuplicates,conflictingKeys:diskConflicts,contentMismatches:diskContentMismatches,scope:'Read-back bytes before node-reconciliation marker and cleanup; full event identity/content comparison only through each in-page document watermark. Later heartbeats are outside this snapshot claim.'};
   result.conflicts=conflicts;result.complete=result.documents.length>0&&result.documents.every(d=>d.missing.length===0&&d.sourceUnique===d.sourceEvents)&&conflicts.length===0&&diskDuplicates.length===0&&diskConflicts.length===0&&diskContentMismatches.length===0;
   result.snapshot=snapshot;result.sourceEventsSHA256=sha256(JSON.stringify(snapshot.events));result.persistedRecordsBefore=before;
   await writeFile(path.join(output,'reconciled-events.json'),JSON.stringify(snapshot.events,null,2));
  }catch(error){result.complete=false;result.error=error.stack||String(error);}
  append({type:'node-reconciliation',label,complete:result.complete,recovered:result.recovered,error:result.error},'node');
  await flush();await writeFile(path.join(output,'reconciliation.json'),JSON.stringify(result,null,2));return result;
 }};
}
export async function drainBeforeFinalUnmount(page,stream,output){
 stream.mark('node-diagnostic-intervention-start',{pageBudgetMs:DRAIN_MS,externalBudgetMs:EXTERNAL_DRAIN_MS,position:'after rapid remounts, before final unmount'});await stream.flush();
 try{const result=await bounded(page.evaluate(ms=>window.__glBoundary.drain(ms),DRAIN_MS),EXTERNAL_DRAIN_MS,'old-context fence drain');await writeFile(path.join(output,'drain.json'),JSON.stringify(result,null,2));assert.equal(result.passed,true,'old-context fence must signal before comparison continues');assert.equal(result.deleteSyncCalls,1,'fence cleanup exactly once');stream.mark('node-diagnostic-intervention-signaled',{elapsedMs:result.elapsedMs,status:result.status});await stream.flush();return result;}
 catch(error){await writeFile(path.join(output,'drain-failure.json'),JSON.stringify({passed:false,error:error.stack||String(error),lastEvent:stream.records.at(-1),comparisonContinued:false},null,2));stream.mark('node-diagnostic-intervention-failed',{error:error.stack||String(error),comparisonContinued:false});await stream.flush();throw error;}
}
export async function finalizeDiagnostic(page,browser,server,stream,output,report,bundle){
 const reconciliation=await stream.reconcile('before-browser-cleanup',report.passed?3000:1000);
 report.diagnosticOnly=true;report.originalGateClaim=false;report.reconciliation={complete:reconciliation.complete,recovered:reconciliation.recovered,error:reconciliation.error};
 report.boundary=reconciliation.snapshot?.boundary??null;report.drain=reconciliation.snapshot?.drain??null;
 try{const initial=JSON.parse(await readFile(path.join(output,'instrumentation-manifest.json'),'utf8')),finalSource=await sourceDigest(),finalBundle=await digest(bundle);report.identity={sourceAtStart:initial.source.sha256,sourceAtEnd:finalSource.sha256,bundleAtStart:initial.bundle.sha256,bundleAtEnd:finalBundle.sha256,unchanged:initial.source.sha256===finalSource.sha256&&initial.bundle.sha256===finalBundle.sha256};}catch(error){report.identity={unchanged:false,error:error.stack||String(error)};}
 report.passed=report.passed&&reconciliation.complete&&report.identity.unchanged&&report.drain?.passed===true&&report.boundary?.coverage?.valid===true&&report.boundary.coverage.releaseAt!==null&&report.boundary.coverage.disposeReturnAt!==null;
 await writeFile(path.join(output,'diagnostic-sequence.json'),JSON.stringify(report,null,2));
 try{await bounded(browser.close(),10000,'browser cleanup');}catch(error){report.cleanupError=String(error);report.passed=false;process.exitCode=1;}
 server.httpServer.closeAllConnections?.();await new Promise(resolve=>server.httpServer.close(resolve));
 await stream.flush();await writeFile(path.join(output,'diagnostic-sequence.json'),JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
}
