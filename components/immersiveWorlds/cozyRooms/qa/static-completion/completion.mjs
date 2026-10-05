import assert from 'node:assert/strict';

export const COMPLETION_MS=120000;
export const STABLE_MS=180;
export const revisedContract='bounded required-image revision/submission/GPU acknowledgement, then 180 ms exact frame/time/revision stability';
export async function bounded(operation,deadline,label){
  const remaining=deadline-performance.now();
  if(remaining<=0)throw new Error(`${label}: absolute completion deadline exhausted`);
  let timer;
  try{return await Promise.race([operation,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error(`${label}: absolute completion deadline exceeded; discard browser, no retry`)),remaining);})]);}
  finally{clearTimeout(timer);}
}
export async function completionSnapshot(page){
  return page.evaluate(()=>{
    const d=window.__cozyQA?.inspect?.()??null;
    const registry=window.__cozyStaticCompletion??={ids:new WeakMap(),nextId:0};
    const canvases=[...document.querySelectorAll('canvas')].map(canvas=>{
      if(!registry.ids.has(canvas))registry.ids.set(canvas,++registry.nextId);
      const rect=canvas.getBoundingClientRect();
      return {id:registry.ids.get(canvas),connected:canvas.isConnected,instance:Number(canvas.dataset.instance),
        width:canvas.width,height:canvas.height,cssWidth:rect.width,cssHeight:rect.height};
    });
    const diagnostic=d?Object.fromEntries(Object.entries(d).filter(([key])=>key!=='targets')):null;
    return {at:performance.now(),diagnostic,canvasId:canvases.length===1?canvases[0].id:null,canvases,
      requestRevision:d?.image?.requestedRevision??null,submittedRevision:d?.image?.submittedRevision??null,completedRevision:d?.image?.completedRevision??null,
      eventCount:window.__cozyQA?.events?.length??null,
      dom:[...document.querySelectorAll('.cozy-world')].map(el=>({state:el.dataset.state,motion:el.dataset.motion,input:el.dataset.input??null,status:el.querySelector('[role="status"]')?.textContent??null}))};
  });
}
export function assertAcknowledged(snapshot,label='required static image'){
  const d=snapshot.diagnostic,g=d?.gpu,i=d?.image;
  assert.ok(d&&!d.disposed&&d.status==='ready',`${label}: live ready host`);
  assert.equal(snapshot.canvases.length,1,`${label}: one canvas`);
  assert.equal(snapshot.canvases[0].connected,true,`${label}: connected canvas`);
  assert.equal(snapshot.canvases[0].instance,d.instance,`${label}: canvas/engine identity`);
  assert.equal(d.running,false,`${label}: no active animation`);
  assert.ok(d.frames>0,`${label}: real rendered frame`);
  assert.equal(g?.failure,null,`${label}: no GPU failure`);
  assert.ok(i?.requestedRevision>0,`${label}: real requested image revision`);
  assert.equal(i.requestedRevision,i.submittedRevision,`${label}: latest requested image submitted`);
  assert.equal(i.requestedRevision,i.completedRevision,`${label}: latest image GPU acknowledged`);
  assert.equal(i.dirty,false,`${label}: no unsent image`);assert.equal(i.sizeDirty,false,`${label}: latest size applied`);
  assert.ok(Number.isFinite(i.requestedAt)&&Number.isFinite(i.submittedAt)&&Number.isFinite(i.completedAt),`${label}: production image phase timestamps`);
  assert.ok(i.submittedAt>=i.requestedAt&&i.completedAt>=i.submittedAt,`${label}: ordered request/submission/acknowledgement`);
  assert.ok(i.completedAt-i.requestedAt<=COMPLETION_MS,`${label}: image request acknowledged within 120000 ms`);
  assert.equal(g.submitted,g.completed,`${label}: every submitted batch signaled`);
  assert.equal(g.inFlight,0,`${label}: no retained incomplete fence`);
  assert.equal(g.pending,null,`${label}: no pending image request`);
  assert.equal(g.pollScheduled,false,`${label}: no residual completion timer`);
  assert.ok(g.maxInFlight<=1,`${label}: one batch admission bound`);
}
export function assertStableImage(before,after,label='static image'){
  assertAcknowledged(before,label);assertAcknowledged(after,label);
  assert.equal(after.diagnostic.instance,before.diagnostic.instance,`${label}: same engine`);
  assert.equal(after.canvasId,before.canvasId,`${label}: same canvas object`);
  assert.equal(after.diagnostic.frames,before.diagnostic.frames,`${label}: frames stable after acknowledgement`);
  assert.equal(after.diagnostic.time,before.diagnostic.time,`${label}: scene time stable after acknowledgement`);
  assert.deepEqual(after.diagnostic.image,before.diagnostic.image,`${label}: revisions stable after acknowledgement`);
  assert.equal(after.diagnostic.gpu.submitted,before.diagnostic.gpu.submitted,`${label}: no later submission`);
  assert.equal(after.diagnostic.gpu.completed,before.diagnostic.gpu.completed,`${label}: completion count stable`);
  assert.deepEqual(after.canvases,before.canvases,`${label}: backing/CSS dimensions stable`);
}
export async function completeStatic(page,{label='required static image',deadline=performance.now()+COMPLETION_MS,afterRevision=null,expectedInstance=null,expectedCanvasId=null,expectedSize=null,onSample=()=>{}}={}){
  const started=performance.now();let first=null,last=null,previous=null,lastLog=-Infinity,polls=0;
  const emit=(type,detail={})=>onSample({type,label,atNode:performance.now(),elapsedMs:performance.now()-started,...detail});
  emit('completion-start',{deadline,afterRevision,expectedInstance,expectedCanvasId,expectedSize});
  try{
    await bounded(page.waitForFunction(()=>window.__cozyQA?.inspect?.()?.running===false,null,{timeout:Math.max(1,deadline-performance.now()),polling:50}),deadline,`${label}: actual paused boundary`);
    while(true){
      last=await bounded(completionSnapshot(page),deadline,label);polls++;
      const d=last.diagnostic,g=d?.gpu,i=d?.image;
      if(d?.status==='failed'||g?.failure||d?.disposed)throw new Error(`${label}: terminal host/GPU failure: ${g?.failure??d?.status??'disposed'}`);
      if(!d||!i||!g)throw new Error(`${label}: required production diagnostics unavailable`);
      if(!first){
        first=last;expectedInstance??=d.instance;expectedCanvasId??=last.canvasId;
        // Preserve the earliest observed unfinished request's original clock.
        // Later coalesced revisions never restart or extend this wait budget.
        if(i.completedRevision<i.requestedRevision&&Number.isFinite(i.requestedAt))deadline=Math.min(deadline,performance.now()+COMPLETION_MS-(last.at-i.requestedAt));
      }
      assert.equal(d.instance,expectedInstance,`${label}: engine identity remains fixed`);
      assert.equal(last.canvasId,expectedCanvasId,`${label}: canvas identity remains fixed`);
      assert.equal(last.canvases.length,1,`${label}: one retained canvas`);
      assert.equal(last.canvases[0].connected,true,`${label}: canvas remains connected`);
      assert.equal(d.running,false,`${label}: remains actually paused through acknowledgement`);
      assert.equal(d.time,first.diagnostic.time,`${label}: scene clock fixed throughout acknowledgement wait`);
      assert.ok(Number.isInteger(i.requestedRevision)&&Number.isInteger(i.submittedRevision)&&Number.isInteger(i.completedRevision),`${label}: integer image revisions`);
      assert.ok(i.completedRevision<=i.submittedRevision&&i.submittedRevision<=i.requestedRevision,`${label}: ordered image revisions`);
      assert.ok(g.completed<=g.returned&&g.returned<=g.submitted,`${label}: ordered batch accounting`);
      assert.ok(g.maxInFlight<=1&&g.submitted-g.completed<=1,`${label}: at most one incomplete batch`);
      if(previous){
        const p=previous.diagnostic,pi=p.image,pg=p.gpu;
        for(const key of ['requestedRevision','submittedRevision','completedRevision'])assert.ok(i[key]>=pi[key],`${label}: ${key} monotonic`);
        for(const key of ['submitted','returned','completed'])assert.ok(g[key]>=pg[key],`${label}: ${key} count monotonic`);
        const frameDelta=d.frames-p.frames,submitDelta=g.submitted-pg.submitted;
        assert.equal(frameDelta,submitDelta,`${label}: every new frame is one real submitted static batch`);
        assert.equal(frameDelta,g.returned-pg.returned,`${label}: submitted static batches returned`);
        assert.ok(frameDelta>=0&&frameDelta<=i.submittedRevision-pi.submittedRevision,`${label}: every additional static batch advances a required revision`);
      }
      if(performance.now()-lastLog>=1000){emit('completion-poll',{polls,snapshot:last});lastLog=performance.now();}
      const size=last.canvases[0];
      const sizeMatches=!expectedSize||(size.width===expectedSize.width&&size.height===expectedSize.height&&size.cssWidth===expectedSize.cssWidth&&size.cssHeight===expectedSize.cssHeight);
      const acknowledged=d.status==='ready'&&!d.running&&i.requestedRevision>0&&i.requestedRevision===i.submittedRevision&&i.requestedRevision===i.completedRevision&&!i.dirty&&!i.sizeDirty&&g.failure===null&&g.submitted===g.completed&&g.inFlight===0&&g.pending===null&&g.pollScheduled===false;
      if(acknowledged&&sizeMatches&&(afterRevision===null||i.requestedRevision>afterRevision)){
        assertAcknowledged(last,label);emit('completion-acknowledged',{polls,snapshot:last});
        return {...last,label,polls,elapsedMs:performance.now()-started,deadline};
      }
      previous=last;
      await bounded(new Promise(resolve=>setTimeout(resolve,50)),deadline,label);
    }
  }catch(error){emit('completion-failed',{polls,lastSnapshot:last,error:String(error),stack:error?.stack});throw error;}
}
export async function completeAndStable(page,options={}){
  const before=await completeStatic(page,options);
  // This fixed observation window proves quiescence only AFTER real completion.
  await page.waitForTimeout(STABLE_MS);
  const after=await bounded(completionSnapshot(page),performance.now()+1000,`${options.label??'static image'} stable snapshot`);
  assertStableImage(before,after,options.label);
  options.onSample?.({type:'static-stability-verified',label:options.label,before,after,stableMs:STABLE_MS});
  return after;
}
