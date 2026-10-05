/** QA-only prototype instrumentation; never imported by a production entry. */
import * as THREE from 'three';
import { ShelterEngine } from '../../engine/ShelterEngine';
import { getRainTargetDiagnostics, setRainTargetMode, captureRainTargetState, restoreRainTargetState, withRainTargetState, withRainRenderTargetState, checkRainFramebuffer } from '../../engine/renderTargets';

type EngineRecord = { id: number; engine: ShelterEngine; canvas: HTMLCanvasElement; events: Array<Record<string, unknown>>; frames: Array<Record<string, unknown>>; renderPasses: Array<Record<string, unknown>>; disposed: boolean };
const records: EngineRecord[] = [];
const registered = new WeakMap<ShelterEngine, EngineRecord>();
const query = new URLSearchParams(location.search);
let beats = 0, lastBeat = performance.now(), maxHeartbeatGapMs = 0;
const heartbeatGaps: Array<{at:number;gapMs:number}> = [];
setInterval(() => {
  const at=performance.now(), gapMs=at-lastBeat; beats++; lastBeat=at; maxHeartbeatGapMs=Math.max(maxHeartbeatGapMs,gapMs);
  if(gapMs>250) heartbeatGaps.push({at,gapMs});
}, 50);
function record(engine: ShelterEngine) {
  let item=registered.get(engine);
  if(!item) {
    item={id:records.length+1,engine,canvas:engine.renderer.domElement,events:[],frames:[],renderPasses:[],disposed:false}; records.push(item); registered.set(engine,item);
    const local=item;
    const render=engine.renderer.render;
    engine.renderer.render=function(scene,camera) {
      const start=performance.now(), target=this.getRenderTarget();
      try { return render.call(this,scene,camera); }
      finally { local.renderPasses.push({at:start,returnedAt:performance.now(),jsSubmissionMs:performance.now()-start,target:target?.texture.name??null,face:this.getActiveCubeFace(),mip:this.getActiveMipmapLevel(),drawCalls:this.info.render.calls,triangles:this.info.render.triangles}); }
    };
    item.canvas.addEventListener('webglcontextlost',()=>local.events.push({type:'context-loss-event',at:performance.now()}));
    new MutationObserver(() => {
      const connected=local.canvas.isConnected;
      if(local.events.at(-1)?.connected!==connected) local.events.push({type:'dom-observer',at:performance.now(),connected});
    }).observe(document.documentElement,{subtree:true,childList:true});
  }
  return item;
}
const originalInit=ShelterEngine.prototype.init;
ShelterEngine.prototype.init=async function() {
  const item=record(this); const start=performance.now(); item.events.push({type:'init-entry',at:start});
  setRainTargetMode(this.renderer,query.get('target')==='byte'?'force-byte':'auto');
  try { await originalInit.call(this); }
  finally { item.events.push({type:'init-exit',at:performance.now(),elapsedMs:performance.now()-start}); }
};
const originalRender=ShelterEngine.prototype.renderFrame;
ShelterEngine.prototype.renderFrame=function(dt:number) {
  const item=record(this), start=performance.now();
  try { return originalRender.call(this,dt); }
  finally { item.frames.push({at:start,returnedAt:performance.now(),jsSubmissionMs:performance.now()-start,dt,frame:Number(item.canvas.dataset.frame),time:Number(item.canvas.dataset.time),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles}); }
};
const originalDispose=ShelterEngine.prototype.dispose;
ShelterEngine.prototype.dispose=function() {
  const item=record(this), start=performance.now(); item.events.push({type:'dispose-entry',at:start});
  try { return originalDispose.call(this); }
  finally { item.disposed=true; item.events.push({type:'dispose-exit',at:performance.now(),elapsedMs:performance.now()-start,contextLost:this.renderer.getContext().isContextLost()}); }
};
const api={
  records,
  snapshot:()=>({at:performance.now(),beats,maxHeartbeatGapMs,heartbeatGaps,records:records.map(({id,canvas,engine,events,frames,renderPasses,disposed})=>({id,connected:canvas.isConnected,disposed,contextLost:engine.renderer.getContext().isContextLost(),canvas:{width:canvas.width,height:canvas.height,frame:Number(canvas.dataset.frame),time:Number(canvas.dataset.time)},events,frames,renderPasses,targets:getRainTargetDiagnostics(engine.renderer)}))}),
  mark:(type:string)=>{const at=performance.now(); records.forEach(r=>r.events.push({type,at}));return at;},
  stateProbe:()=>{
    const item=records.at(-1)!, renderer=item.engine.renderer, gl=renderer.getContext();
    const original=captureRainTargetState(renderer);
    const sentinel=new THREE.WebGLCubeRenderTarget(16,{type:THREE.UnsignedByteType,format:THREE.RGBAFormat,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    sentinel.texture.name='QA real cube state sentinel';
    const state=()=>{
      const s=captureRainTargetState(renderer);
      return {target:s.target?.texture.uuid??null,face:s.face,mip:s.mip,viewport:s.viewport.toArray(),currentViewport:s.currentViewport.toArray(),scissor:s.scissor.toArray(),currentScissor:s.currentScissor.toArray(),scissorTest:s.scissorTest,currentScissorTest:s.currentScissorTest,xr:s.xr,autoClear:s.autoClear,shadowAutoUpdate:s.shadowAutoUpdate};
    };
    try {
      const checked=checkRainFramebuffer(renderer,sentinel,'qa-cube-sentinel');
      renderer.setRenderTarget(sentinel,0,0);renderer.render(new THREE.Scene(),new THREE.PerspectiveCamera());
      renderer.setRenderTarget(sentinel,2,1);
      const sentinelStatus=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      const before=state();
      withRainTargetState(renderer,()=>{renderer.setRenderTarget(null);renderer.xr.enabled=!renderer.xr.enabled;renderer.setViewport(1,2,7,8);});
      const successful=state();let caught=false;
      try { withRainTargetState(renderer,()=>{renderer.setRenderTarget(null);renderer.autoClear=false;throw new Error('QA intentional state probe');}); }
      catch(error) { caught=error instanceof Error && error.message==='QA intentional state probe'; }
      const exceptional=state();
      withRainRenderTargetState(renderer,()=>renderer.setRenderTarget(null));const hotSuccessful=state();
      let hotCaught=false;try{withRainRenderTargetState(renderer,()=>{renderer.setRenderTarget(null);throw new Error('QA hot exception');});}catch(error){hotCaught=error instanceof Error&&error.message==='QA hot exception';}
      const hotExceptional=state();
      let actualRefraction=null;
      if(item.canvas.dataset.world==='window'){
        const recipe=(item.engine as unknown as {recipe:{update:(time:number,dt:number)=>void}}).recipe;
        recipe.update(Number(item.canvas.dataset.time),0);const passAfter=state();
        const render=renderer.render;let passCaught=false;
        renderer.render=function(scene,camera){if(this.getRenderTarget()?.texture.name==='rainShelters.windowRefraction')throw new Error('QA refraction render boundary');return render.call(this,scene,camera);};
        try {recipe.update(Number(item.canvas.dataset.time),0);}catch(error){passCaught=error instanceof Error&&error.message==='QA refraction render boundary';}finally{renderer.render=render;}
        actualRefraction={success:passAfter,exception:state(),caught:passCaught};
      }
      return {checked,sentinelStatus,sentinelFace:2,sentinelMip:1,before,successful,exceptional,caught,hotSuccessful,hotExceptional,hotCaught,actualRefraction,glError:gl.getError()};
    } finally {restoreRainTargetState(renderer,original);sentinel.dispose();}
  },
};
Object.assign(window,{__rainFollowupQA:api});
