import '../recreation/entry.mjs';
import {LiveSceneHost} from '../../../../liveScene/liveSceneHost';
import {CozyEngine} from '../../engine';

// The imported diagnostic entry schedules the original QA UI with import().
// These wrappers install synchronously before that UI constructs its engine.
const probe=window.__cozyRecreation,phase=probe.phase;
const glIds=new WeakMap(),canvasIds=new WeakMap(),contextForCanvas=new WeakMap(),backingWrites=new WeakMap();
const contextRecords=new Map(),engineRecords=new Map(),zeroDtRecords=new Map();let contextSerial=0,canvasSerial=0,coverage=null;
const DETAIL_LIMIT_PER_METHOD=64;
const plainError=error=>({name:error?.name||typeof error,message:error?.message||String(error),stack:error?.stack||null});
function canvasState(canvas){
 if(!canvasIds.has(canvas))canvasIds.set(canvas,++canvasSerial);
 return {boundaryCanvasId:canvasIds.get(canvas),connected:canvas.isConnected,parent:canvas.parentElement?.className??null,backingWidth:canvas.width,backingHeight:canvas.height,cssWidth:canvas.clientWidth,cssHeight:canvas.clientHeight,instance:canvas.dataset.instance??null};
}
function observeContext(gl,canvas){
 if(glIds.has(gl))return glIds.get(gl);
 const id=++contextSerial;glIds.set(gl,id);contextForCanvas.set(canvas,gl);
 const record={contextId:id,canvas:new WeakRef(canvas),createdAt:performance.now(),engineInstance:null,api:{},currentCall:null};contextRecords.set(id,record);
 phase('gl-boundary-context',{contextId:id,canvas:canvasState(canvas),contextLost:gl.isContextLost()});
 for(const method of ['compileShader','linkProgram','getShaderParameter','getProgramParameter']){
  const original=gl[method];
  gl[method]=function(...args){
   const aggregate=record.api[method]??={calls:0,returns:0,throws:0,totalMs:0,maxMs:0,lastMs:null,detailEventsCapped:false,pnames:{}};
   const call=++aggregate.calls,entryAt=performance.now(),pname=typeof args[1]==='number'?args[1]:null;
   if(pname!==null)aggregate.pnames[pname]=(aggregate.pnames[pname]||0)+1;
   record.currentCall={method,call,pname,entryAt};
   const detailed=call<=DETAIL_LIMIT_PER_METHOD;
   if(detailed)phase('gl-api-entry',{contextId:id,engineInstance:record.engineInstance,method,call,pname});
   else if(!aggregate.detailEventsCapped){aggregate.detailEventsCapped=true;phase('gl-api-details-capped',{contextId:id,method,limit:DETAIL_LIMIT_PER_METHOD});}
   const start=performance.now();
   try{
    const value=original.apply(this,args),durationMs=performance.now()-start;
    aggregate.returns++;aggregate.totalMs+=durationMs;aggregate.maxMs=Math.max(aggregate.maxMs,durationMs);aggregate.lastMs=durationMs;
    if(detailed)phase('gl-api-return',{contextId:id,engineInstance:record.engineInstance,method,call,pname,durationMs,result:typeof value==='number'||typeof value==='boolean'?value:null});
    record.currentCall=null;return value;
   }catch(error){aggregate.throws++;record.currentCall={...record.currentCall,error:plainError(error)};phase('gl-api-throw',{contextId:id,method,call,pname,durationMs:performance.now()-start,error:plainError(error)});throw error;}
  };
 }
 return id;
}
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(...args){const gl=getContext.apply(this,args);if(gl&&args[0]==='webgl2')observeContext(gl,this);return gl;};
for(const property of ['width','height']){
 const descriptor=Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,property);
 Object.defineProperty(HTMLCanvasElement.prototype,property,{...descriptor,set(value){
  if(this.classList.contains('cozy-world-canvas')){
   backingWrites.set(this,(backingWrites.get(this)||0)+1);
   if(coverage?.active&&canvasState(this).boundaryCanvasId===coverage.canvasId){coverage.valid=false;coverage.uncoveredBackingWrites++;phase('old-backing-write-after-fence-placement',{property,requestedValue:value,contextId:coverage.contextId});}
  }
  return descriptor.set.call(this,value);
 }});
}

const attachRenderer=probe.attachRenderer;
probe.attachRenderer=function(engine){
 attachRenderer(engine);
 const renderer=engine.renderer,contextId=observeContext(renderer.getContext(),engine.canvas),context=contextRecords.get(contextId);context.engineInstance=engine.instance;
 const stats={instance:engine.instance,contextId,canvasId:canvasState(engine.canvas).boundaryCanvasId,renderEntries:0,renderReturns:0,renderThrows:0,drawCallsSum:0,trianglesSum:0,pointsSum:0,linesSum:0,lastSubmitEntryAt:null,lastSubmitReturnAt:null,lastRendererMs:null};engineRecords.set(engine.instance,stats);
 const render=renderer.render;
 renderer.render=function(...args){
  stats.renderEntries++;stats.lastSubmitEntryAt=performance.now();
  if(coverage?.active&&coverage.instance===engine.instance){coverage.valid=false;coverage.uncoveredEntries++;if(coverage.signaledAt!==null)coverage.postSignalEntries++;phase('old-render-after-fence-placement',{instance:engine.instance,contextId,renderEntries:stats.renderEntries,fencePlacedAt:coverage.placedAt,afterFinalSignal:coverage.signaledAt!==null});}
  try{const value=render.apply(this,args);stats.renderReturns++;stats.lastSubmitReturnAt=performance.now();stats.lastRendererMs=stats.lastSubmitReturnAt-stats.lastSubmitEntryAt;const info=renderer.info.render;stats.drawCallsSum+=info.calls;stats.trianglesSum+=info.triangles;stats.pointsSum+=info.points;stats.linesSum+=info.lines;return value;}catch(error){stats.renderThrows++;throw error;}
 };
 phase('gl-boundary-engine-context',{engineInstance:engine.instance,contextId,canvas:canvasState(engine.canvas)});
};
const renderFrame=CozyEngine.prototype.renderFrame;
CozyEngine.prototype.renderFrame=function(...args){
 const stats=engineRecords.get(this.instance),state=()=>({frames:this.frames,time:this.time,running:!!this.raf,entries:stats?.renderEntries,returns:stats?.renderReturns,throws:stats?.renderThrows});
 const before=state(),entryAt=performance.now(),value=renderFrame.apply(this,args);
 if(args.length===1&&args[0]===0){
  const records=zeroDtRecords.get(this.instance)??[];zeroDtRecords.set(this.instance,records);
  const record={instance:this.instance,call:records.length+1,dt:0,entryAt,returnAt:performance.now(),before,after:state()};
  records.push(record);phase('observed-zero-dt-render-return',record);
 }
 return value;
};
const release=LiveSceneHost.prototype.release;
LiveSceneHost.prototype.release=function(...args){
 if(coverage?.active&&this.engine?.instance===coverage.instance){
  coverage.releaseAt=performance.now();coverage.framesAtRelease=this.engine.frames;coverage.timeAtRelease=this.engine.time;
  if(this.engine.frames!==coverage.frames||this.engine.time!==coverage.time)coverage.valid=false;
  phase('fence-coverage-at-final-release',{...coverage});
 }
 return release.apply(this,args);
};
const dispose=CozyEngine.prototype.dispose;
CozyEngine.prototype.dispose=function(...args){
 const tracked=coverage?.active&&coverage.instance===this.instance;
 if(tracked){coverage.disposeEntryAt=performance.now();coverage.countersAtDisposeEntry={...engineRecords.get(this.instance)};phase('fence-coverage-at-dispose-entry',{...coverage});}
 try{const value=dispose.apply(this,args);if(tracked){coverage.disposeReturnAt=performance.now();coverage.countersAtDisposeReturn={...engineRecords.get(this.instance)};if(this.frames!==coverage.frames||this.time!==coverage.time)coverage.valid=false;phase('fence-coverage-at-dispose-return',{...coverage});}return value;}catch(error){if(tracked){coverage.valid=false;coverage.disposeError=plainError(error);}throw error;}
};
function summary(){
 if(coverage){coverage.finalOldCounters={...engineRecords.get(coverage.instance)};if(coverage.finalOldCounters.renderEntries!==coverage.renderEntriesAtFence||coverage.finalOldCounters.renderReturns!==coverage.renderReturnsAtFence)coverage.valid=false;}
 return {engines:[...engineRecords.values()].map(value=>({...value,successfulZeroDtRecords:zeroDtRecords.get(value.instance)??[]})),contexts:[...contextRecords.values()].map(({canvas,...record})=>{const node=canvas.deref();return {...record,canvas:node?canvasState(node):{collected:true}};}),coverage:coverage?{...coverage}:null};
}

window.__glBoundary={summary,async drain(budgetMs){
 const started=performance.now(),deadlineAt=started+budgetMs,canvas=document.querySelector('canvas.cozy-world-canvas');
 if(!canvas)throw new Error('Drain requires the existing old scene canvas');
 const gl=contextForCanvas.get(canvas),before=window.__cozyQA.inspect(),stats=engineRecords.get(before.instance);
 if(!gl||!stats)throw new Error('Existing context/submission counters were not observed');
 if(before.running)throw new Error('Old engine must be paused before drain');
 const MAX_REPLACEMENTS=8;
 const result={version:2,passed:false,budgetMs,startedAt:started,deadlineAt,maxReplacements:MAX_REPLACEMENTS,replacements:0,oldContextId:glIds.get(gl),before,submissionsBefore:{...stats},canvasBefore:canvasState(canvas),fences:[],ownedSyncs:0,polls:0,timeoutExpiredCount:0,statusTransitions:[],clientWaitTotalMs:0,clientWaitMaxMs:0,deleteSyncCalls:0,acceptedZeroDtRecords:[]};
 const checkBudget=stage=>{if(performance.now()>=deadlineAt)throw new Error(`Old-context drain incomplete at absolute ${budgetMs} ms deadline (${stage}); no disposal/recreation comparison permitted`);};
 const invariant=()=>{const d=window.__cozyQA.inspect();return JSON.stringify({instance:d.instance,time:d.time,running:d.running,taps:d.taps,lastHit:d.lastHit,canvas:canvasState(canvas),backingWrites:backingWrites.get(canvas)||0});};
 const initialInvariant=invariant();
 const strictState=stage=>{
  checkBudget(stage);
  if(document.querySelector('canvas.cozy-world-canvas')!==canvas||contextForCanvas.get(canvas)!==gl||invariant()!==initialInvariant)throw new Error('Old engine/context/canvas/time/running/input/backing/CSS invariant changed during drain');
  if(gl.isContextLost())throw new Error('Old context lost during drain');
  checkBudget(`${stage}: context-state return`);
 };
 const counters=()=>({frames:window.__cozyQA.inspect().frames,entries:stats.renderEntries,returns:stats.renderReturns,throws:stats.renderThrows,zeroDtCount:zeroDtRecords.get(before.instance)?.length??0});
 let accepted=counters();
 function validateStaticIncrements(){
  strictState('validate completed submissions');
  const current=counters(),records=(zeroDtRecords.get(before.instance)??[]).slice(accepted.zeroDtCount);
  if(JSON.stringify(current)===JSON.stringify(accepted))return [];
  if(!records.length)throw new Error('Submission/frame change has no successful exact-zero-dt engine call record');
  let expected={...accepted};
  for(const record of records){
   const a=record.before,b=record.after;
   if(record.dt!==0||a.running||b.running||a.time!==before.time||b.time!==before.time||a.frames!==expected.frames||a.entries!==expected.entries||a.returns!==expected.returns||a.throws!==expected.throws||b.frames!==a.frames+1||b.entries!==a.entries+1||b.returns!==a.returns+1||b.throws!==a.throws)throw new Error('Late submission is not a contiguous successful paused renderFrame(0) with one completed renderer call');
   expected={frames:b.frames,entries:b.entries,returns:b.returns,throws:b.throws,zeroDtCount:expected.zeroDtCount+1};
  }
  if(JSON.stringify(current)!==JSON.stringify(expected))throw new Error('Unexplained frame/renderer counter increments remain after matching zero-dt records');
  accepted=current;result.acceptedZeroDtRecords.push(...records);return records;
 }
 phase('old-context-drain-start',{version:2,budgetMs,deadlineAt,maxReplacements:MAX_REPLACEMENTS,oldContextId:result.oldContextId,before,submissions:result.submissionsBefore,canvas:result.canvasBefore});
 let currentFence=null,failure,lastProgress=started;
 function deleteFence(reason){
  if(!currentFence)return;
  const {sync,record}=currentFence;currentFence=null;
  record.deleteCalls++;result.deleteSyncCalls++;record.deleteReason=reason;record.deleteEntryAt=performance.now();
  phase('fence-delete-entry',{contextId:result.oldContextId,fenceId:record.id,reason});
  const start=performance.now();
  try{gl.deleteSync(sync);record.deleteMs=performance.now()-start;record.deleteReturnAt=performance.now();record.deleteReturned=true;record.lifetimeMs=record.deleteReturnAt-record.createdAt;phase('fence-delete-return',{contextId:result.oldContextId,fenceId:record.id,durationMs:record.deleteMs,reason});}
  catch(error){record.deleteError=plainError(error);phase('fence-delete-throw',{fenceId:record.id,error:record.deleteError});throw error;}
 }
 function placeFence(reason,matchedRecords){
  strictState('before fence placement');
  const record={id:result.fences.length+1,reason,matchedZeroDtCalls:matchedRecords.map(r=>r.call),placementCounters:{...accepted},submissionsAtPlacement:{...stats},createdAt:performance.now(),nonnull:false,polls:0,timeoutExpiredCount:0,statusTransitions:[],clientWaitTotalMs:0,clientWaitMaxMs:0,deleteCalls:0,deleteReturned:false};
  result.fences.push(record);phase('fenceSync-entry',{contextId:result.oldContextId,fenceId:record.id,reason,placementCounters:record.placementCounters,matchedZeroDtCalls:record.matchedZeroDtCalls});
  const start=performance.now(),sync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);record.fenceSyncMs=performance.now()-start;record.nonnull=!!sync;
  if(sync){result.ownedSyncs++;currentFence={sync,record};}
  phase('fenceSync-return',{contextId:result.oldContextId,fenceId:record.id,durationMs:record.fenceSyncMs,nonnull:record.nonnull});
  checkBudget('fenceSync return');if(!sync)throw new Error('fenceSync returned null; completion unproven');
  if(!coverage)coverage={active:true,monitorUntil:'final-summary',valid:true,instance:before.instance,canvasId:canvasState(canvas).boundaryCanvasId,contextId:result.oldContextId,time:before.time,uncoveredEntries:0,uncoveredBackingWrites:0,postSignalEntries:0,acceptedLateZeroDtCalls:0,signaledAt:null,releaseAt:null,disposeEntryAt:null,disposeReturnAt:null};
  if(coverage.uncoveredBackingWrites||coverage.postSignalEntries)throw new Error('Terminal coverage violation cannot be repaired by fence replacement');
  Object.assign(coverage,{valid:true,frames:accepted.frames,renderEntriesAtFence:accepted.entries,renderReturnsAtFence:accepted.returns,placedAt:performance.now(),latestFenceId:record.id,acceptedLateZeroDtCalls:result.acceptedZeroDtRecords.length});
  phase('fence-flush-entry',{contextId:result.oldContextId,fenceId:record.id});
  const flushStart=performance.now();gl.flush();record.flushMs=performance.now()-flushStart;
  phase('fence-flush-return',{contextId:result.oldContextId,fenceId:record.id,durationMs:record.flushMs});checkBudget('flush return');
 }
 try{
  await new Promise(resolve=>setTimeout(resolve,180));
  const initialRecords=validateStaticIncrements();placeFence('initial covering current completed submissions',initialRecords);
  while(true){
   await new Promise(resolve=>setTimeout(resolve,16));
   const lateRecords=validateStaticIncrements();
   if(lateRecords.length){
    if(result.replacements>=MAX_REPLACEMENTS)throw new Error(`More than ${MAX_REPLACEMENTS} fence replacements required; comparison incomplete`);
    currentFence.record.supersededByZeroDtCalls=lateRecords.map(r=>r.call);currentFence.record.supersededAt=performance.now();
    phase('fence-replacement-required',{fenceId:currentFence.record.id,matchedZeroDtRecords:lateRecords,currentCounters:{...accepted},elapsedMs:performance.now()-started});
    deleteFence('superseded by observed successful paused zero-dt submissions');checkBudget('replacement deleteSync return');
    result.replacements++;placeFence('covers observed successful late renderFrame(0)',lateRecords);
    continue;
   }
   const {sync,record}=currentFence;checkBudget('before clientWaitSync');
   const waitStart=performance.now(),status=gl.clientWaitSync(sync,0,0),durationMs=performance.now()-waitStart;
   for(const owner of [result,record]){owner.polls++;owner.clientWaitTotalMs+=durationMs;owner.clientWaitMaxMs=Math.max(owner.clientWaitMaxMs,durationMs);owner.clientWaitLastMs=durationMs;if(owner.polls===1)owner.clientWaitFirstMs=durationMs;}
   const label=status===gl.TIMEOUT_EXPIRED?'TIMEOUT_EXPIRED':status===gl.ALREADY_SIGNALED?'ALREADY_SIGNALED':status===gl.CONDITION_SATISFIED?'CONDITION_SATISFIED':status===gl.WAIT_FAILED?'WAIT_FAILED':`UNKNOWN_${status}`;
   if(status===gl.TIMEOUT_EXPIRED){result.timeoutExpiredCount++;record.timeoutExpiredCount++;}
   if(label!==record.statusTransitions.at(-1)?.status){const change={fenceId:record.id,status:label,at:performance.now(),poll:record.polls};record.statusTransitions.push(change);result.statusTransitions.push(change);phase('fence-status',change);}
   checkBudget('clientWaitSync return');
   if(status===gl.WAIT_FAILED)throw new Error('clientWaitSync WAIT_FAILED; completion unproven');
   if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED){
    strictState('latest fence signaled');
    if(JSON.stringify(counters())!==JSON.stringify(record.placementCounters))throw new Error('Latest signaled fence does not cover current submission counters');
    result.status=label;result.signaledAt=performance.now();result.signaledFenceId=record.id;record.signaledAt=result.signaledAt;coverage.signaledAt=result.signaledAt;break;
   }
   if(status!==gl.TIMEOUT_EXPIRED)throw new Error(`Unexpected clientWaitSync status ${status}`);
   if(performance.now()-lastProgress>=1000){lastProgress=performance.now();phase('fence-progress',{fenceId:record.id,elapsedMs:lastProgress-started,replacements:result.replacements,polls:result.polls,timeoutExpiredCount:result.timeoutExpiredCount});}
  }
  result.after=window.__cozyQA.inspect();result.submissionsAfter={...stats};result.passed=true;result.completionClaim='Latest fence signaled covering latest observed completed submissions; post-signal coverage remains monitored through disposal and final summary';
 }catch(error){failure=error;result.passed=false;result.error=plainError(error);phase('old-context-drain-failed',{error:result.error,elapsedMs:performance.now()-started,polls:result.polls,replacements:result.replacements});}
 finally{
  try{deleteFence(failure?'drain failed':'latest covering fence signaled');if(!failure)checkBudget('final deleteSync return');}
  catch(error){failure??=error;result.passed=false;result.deleteError=plainError(error);}
  result.elapsedMs=performance.now()-started;result.allOwnedSyncsDeletedOnce=result.ownedSyncs===result.deleteSyncCalls&&result.fences.filter(f=>f.nonnull).every(f=>f.deleteCalls===1&&f.deleteReturned);
  if(!result.allOwnedSyncsDeletedOnce){failure??=new Error('Owned fence cleanup incomplete');result.passed=false;}
  window.__glBoundary.drainResult=result;phase('old-context-drain-result',result);
 }
 if(failure)throw failure;return result;
}};
phase('gl-boundary-ready',{apiMethods:['compileShader','linkProgram','getShaderParameter','getProgramParameter'],detailLimitPerMethod:DETAIL_LIMIT_PER_METHOD,untraced:'Other GL calls and internal browser/driver stages are not instrumented; timings alone do not identify their cause.'});
