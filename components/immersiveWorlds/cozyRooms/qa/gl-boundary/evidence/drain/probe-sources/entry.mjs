import '../recreation/entry.mjs';
import {LiveSceneHost} from '../../../../liveScene/liveSceneHost';
import {CozyEngine} from '../../engine';

// The imported diagnostic entry schedules the original QA UI with import().
// These wrappers install synchronously before that UI constructs its engine.
const probe=window.__cozyRecreation,phase=probe.phase;
const glIds=new WeakMap(),canvasIds=new WeakMap(),contextForCanvas=new WeakMap(),backingWrites=new WeakMap();
const contextRecords=new Map(),engineRecords=new Map();let contextSerial=0,canvasSerial=0,coverage=null;
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
  if(coverage?.active&&coverage.instance===engine.instance){coverage.valid=false;coverage.uncoveredEntries++;phase('old-render-after-fence-placement',{instance:engine.instance,contextId,renderEntries:stats.renderEntries,fencePlacedAt:coverage.placedAt});}
  try{const value=render.apply(this,args);stats.renderReturns++;stats.lastSubmitReturnAt=performance.now();stats.lastRendererMs=stats.lastSubmitReturnAt-stats.lastSubmitEntryAt;const info=renderer.info.render;stats.drawCallsSum+=info.calls;stats.trianglesSum+=info.triangles;stats.pointsSum+=info.points;stats.linesSum+=info.lines;return value;}catch(error){stats.renderThrows++;throw error;}
 };
 phase('gl-boundary-engine-context',{engineInstance:engine.instance,contextId,canvas:canvasState(engine.canvas)});
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
 return {engines:[...engineRecords.values()].map(value=>({...value})),contexts:[...contextRecords.values()].map(({canvas,...record})=>{const node=canvas.deref();return {...record,canvas:node?canvasState(node):{collected:true}};}),coverage:coverage?{...coverage}:null};
}

window.__glBoundary={summary,async drain(budgetMs){
 const started=performance.now(),canvas=document.querySelector('canvas.cozy-world-canvas');
 if(!canvas)throw new Error('Drain requires the existing old scene canvas');
 const gl=contextForCanvas.get(canvas),before=window.__cozyQA.inspect(),stats=engineRecords.get(before.instance);
 if(!gl||!stats)throw new Error('Existing context/submission counters were not observed');
 if(before.running)throw new Error('Old engine must be paused before drain');
 const signature=()=>{const d=window.__cozyQA.inspect();return JSON.stringify({instance:d.instance,frames:d.frames,time:d.time,running:d.running,canvas:canvasState(canvas),entries:stats.renderEntries,returns:stats.renderReturns,backingWrites:backingWrites.get(canvas)||0});};
 const initial=signature();
 const unchanged=()=>{if(document.querySelector('canvas.cozy-world-canvas')!==canvas||signature()!==initial)throw new Error('Old engine/canvas/frame/time/backing/CSS/submission state changed during drain');if(gl.isContextLost())throw new Error('Old context lost during drain');};
 const result={passed:false,budgetMs,startedAt:started,oldContextId:glIds.get(gl),before,submissionsBefore:{...stats},canvasBefore:canvasState(canvas),polls:0,timeoutExpiredCount:0,statusTransitions:[],clientWaitTotalMs:0,clientWaitMaxMs:0,deleteSyncCalls:0};
 phase('old-context-drain-start',{budgetMs,oldContextId:result.oldContextId,before,submissions:result.submissionsBefore,canvas:result.canvasBefore});
 let fence,failure;
 try{
  await new Promise(resolve=>setTimeout(resolve,180));unchanged();
  const fenceStart=performance.now();phase('fenceSync-entry',{contextId:result.oldContextId});
  fence=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);result.fenceSyncMs=performance.now()-fenceStart;
  phase('fenceSync-return',{contextId:result.oldContextId,durationMs:result.fenceSyncMs,nonnull:!!fence});
  if(!fence)throw new Error('fenceSync returned null; completion unproven');
  coverage={active:true,monitorUntil:'final-summary',valid:true,instance:before.instance,canvasId:canvasState(canvas).boundaryCanvasId,contextId:result.oldContextId,frames:before.frames,time:before.time,renderEntriesAtFence:stats.renderEntries,renderReturnsAtFence:stats.renderReturns,placedAt:performance.now(),uncoveredEntries:0,uncoveredBackingWrites:0,releaseAt:null,disposeEntryAt:null,disposeReturnAt:null};
  const flushStart=performance.now();phase('fence-flush-entry',{contextId:result.oldContextId});gl.flush();result.flushMs=performance.now()-flushStart;phase('fence-flush-return',{contextId:result.oldContextId,durationMs:result.flushMs});
  let previousStatus=null,lastProgress=started;
  while(true){
   await new Promise(resolve=>setTimeout(resolve,16));unchanged();
   if(performance.now()-started>=budgetMs)throw new Error(`Old-context drain incomplete at ${budgetMs} ms; no disposal/recreation comparison permitted`);
   const waitStart=performance.now(),status=gl.clientWaitSync(fence,0,0),durationMs=performance.now()-waitStart;
   result.polls++;result.clientWaitTotalMs+=durationMs;result.clientWaitMaxMs=Math.max(result.clientWaitMaxMs,durationMs);result.clientWaitLastMs=durationMs;if(result.polls===1)result.clientWaitFirstMs=durationMs;
   const label=status===gl.TIMEOUT_EXPIRED?'TIMEOUT_EXPIRED':status===gl.ALREADY_SIGNALED?'ALREADY_SIGNALED':status===gl.CONDITION_SATISFIED?'CONDITION_SATISFIED':status===gl.WAIT_FAILED?'WAIT_FAILED':`UNKNOWN_${status}`;
   if(status===gl.TIMEOUT_EXPIRED)result.timeoutExpiredCount++;
   if(label!==previousStatus){const change={status:label,at:performance.now(),poll:result.polls};result.statusTransitions.push(change);phase('fence-status',change);previousStatus=label;}
   if(performance.now()-started>=budgetMs)throw new Error(`Old-context drain exceeded ${budgetMs} ms after clientWaitSync; comparison incomplete`);
   if(status===gl.WAIT_FAILED)throw new Error('clientWaitSync WAIT_FAILED; completion unproven');
   if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED){result.status=label;result.signaledAt=performance.now();coverage.signaledAt=result.signaledAt;break;}
   if(status!==gl.TIMEOUT_EXPIRED)throw new Error(`Unexpected clientWaitSync status ${status}`);
   if(performance.now()-lastProgress>=1000){lastProgress=performance.now();phase('fence-progress',{elapsedMs:lastProgress-started,polls:result.polls,timeoutExpiredCount:result.timeoutExpiredCount});}
  }
  unchanged();result.after=window.__cozyQA.inspect();result.submissionsAfter={...stats};result.passed=true;
 }catch(error){failure=error;result.passed=false;result.error=plainError(error);phase('old-context-drain-failed',{error:result.error,elapsedMs:performance.now()-started,polls:result.polls});}
 finally{
  if(fence){result.deleteSyncCalls++;const deletionStart=performance.now();phase('fence-delete-entry',{contextId:result.oldContextId});try{gl.deleteSync(fence);result.deleteSyncMs=performance.now()-deletionStart;phase('fence-delete-return',{contextId:result.oldContextId,durationMs:result.deleteSyncMs});}catch(error){failure??=error;result.passed=false;result.deleteError=plainError(error);phase('fence-delete-throw',{error:result.deleteError});}}
  result.elapsedMs=performance.now()-started;window.__glBoundary.drainResult=result;phase('old-context-drain-result',result);
 }
 if(failure)throw failure;return result;
}};
phase('gl-boundary-ready',{apiMethods:['compileShader','linkProgram','getShaderParameter','getProgramParameter'],detailLimitPerMethod:DETAIL_LIMIT_PER_METHOD,untraced:'Other GL calls and internal browser/driver stages are not instrumented; timings alone do not identify their cause.'});
