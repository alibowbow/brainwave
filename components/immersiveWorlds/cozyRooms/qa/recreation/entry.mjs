import {CozyEngine} from '../../engine';
import {LiveSceneHost} from '../../../../liveScene/liveSceneHost';

const events=[],hosts=new Set(),canvases=new Map(),canvasIds=new WeakMap(),hostIds=new WeakMap(),contexts=new WeakMap();
let serial=0,sequence=0;const documentId=`${Date.now()}-${Math.random().toString(16).slice(2)}`;
const errorInfo=error=>error?{name:error.name||typeof error,message:error.message||String(error),stack:error.stack||null}:null;
function canvasInfo(canvas){
 if(!canvas)return null;if(!canvasIds.has(canvas)){const id=++serial;canvasIds.set(canvas,id);canvases.set(id,new WeakRef(canvas));}
 const gl=contexts.get(canvas);return {id:canvasIds.get(canvas),connected:canvas.isConnected,parent:canvas.parentElement?.className??null,backingWidth:canvas.width,backingHeight:canvas.height,cssWidth:canvas.clientWidth,cssHeight:canvas.clientHeight,instance:canvas.dataset.instance??null,frames:canvas.dataset.frames??null,contextPresent:!!gl,contextLost:gl?gl.isContextLost():null};
}
function engineInfo(engine){return engine?{instance:engine.instance,dead:engine.dead,frames:engine.frames,time:engine.time,running:!!engine.raf,hasWorld:!!engine.world,sceneId:engine.world?.scene?.uuid??null,canvas:canvasInfo(engine.canvas)}:null;}
function hostInfo(host){if(!hostIds.has(host))hostIds.set(host,++serial);hosts.add(host);return {id:hostIds.get(host),status:host.status,unsupported:host.unsupported,holders:host.holders?.length??null,timer:host.disposeTimer,canvas:canvasInfo(host.canvas),engine:engineInfo(host.engine)};}
function phase(type,detail={}){
 const {engine,host,error,...rest}=detail;
 const event={documentId,sequence:++sequence,type,at:performance.now(),...rest,...(engine?{engine:engineInfo(engine)}:{}),...(host?{host:hostInfo(host)}:{}),...(error?{error:errorInfo(error)}:{})};events.push(event);
 // Console protocol events are emitted before the observed operation begins.
 // Binding delivery is a second path; neither is awaited inside production.
 console.log('COZY_RECREATION '+JSON.stringify(event));
 try{window.__cozyRecreationSink?.(event)?.catch(()=>{});}catch{}
 return event;
}
window.__cozyRecreation={events,phase,snapshot:()=>({hosts:[...hosts].map(hostInfo),canvases:[...canvases].map(([id,ref])=>{const canvas=ref.deref();return canvas?canvasInfo(canvas):{id,collected:true};}),dom:[...document.querySelectorAll('.cozy-world')].map(e=>({state:e.dataset.state,motion:e.dataset.motion,world:e.dataset.world,connected:e.isConnected,width:e.clientWidth,height:e.clientHeight,canvasCount:e.querySelectorAll('canvas').length}))}),invokeFactory(engine,call){phase('factory-entry',{engine});try{const world=call();phase('factory-exit',{engine,worldSceneId:world.scene?.uuid,worldCameraId:world.camera?.uuid});return world;}catch(error){phase('factory-throw',{engine,error});throw error;}},attachRenderer(engine){
 const renderer=engine.renderer;
 for(const name of ['setPixelRatio','setSize','render']){
  const original=renderer[name];renderer[name]=function(...args){
   const detail={engine,args:args.map(v=>typeof v==='object'?v?.constructor?.name:v),programs:renderer.info.programs?.length??null,drawCalls:renderer.info.render.calls};
   phase(`renderer-${name}-entry`,detail);
   try{const value=original.apply(this,args);phase(`renderer-${name}-return`,{engine,programs:renderer.info.programs?.length??null,drawCalls:renderer.info.render.calls});return value;}catch(error){phase(`renderer-${name}-throw`,{engine,error});throw error;}
  };
 }
 // Preserve Three's default shader diagnostics. Installing a non-null callback
 // would suppress its own console error path, so stream that existing path.
 phase('shader-diagnostics-policy',{nativeConsolePreserved:true,customCallbackPresent:typeof renderer.debug.onShaderError==='function'});
}};
function wrap(prototype,name,label,kind){
 const original=prototype[name];if(typeof original!=='function')throw new Error(`Missing diagnostic method ${name}`);
 prototype[name]=function(...args){
  const owner={[kind]:this},detail={...owner,args:args.map(v=>typeof v==='object'?v?.constructor?.name: v)};
  phase(`${label}-entry`,detail);
  try{
   const value=original.apply(this,args);
   if(name==='init'&&value?.then){value.then(()=>phase(`${label}-resolved`,owner),error=>phase(`${label}-rejected`,{...owner,error}));}
   phase(`${label}-return`,detail);return value;
  }catch(error){phase(`${label}-throw`,{...owner,error});throw error;}
 };
}
for(const method of ['init','setSize','renderFrame','dispose'])wrap(CozyEngine.prototype,method,`engine-${method}`,'engine');
for(const method of ['acquire','release','ensureEngine','setStatus','fail','teardown','attachTop'])wrap(LiveSceneHost.prototype,method,`host-${method}`,'host');
for(const property of ['width','height']){
 const descriptor=Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,property);
 if(!descriptor?.set||!descriptor.configurable)throw new Error(`Canvas ${property} descriptor cannot be delegated`);
 Object.defineProperty(HTMLCanvasElement.prototype,property,{...descriptor,set(value){
  if(!this.classList.contains('cozy-world-canvas'))return descriptor.set.call(this,value);
  const oldValue=descriptor.get.call(this);phase('canvas-backing-write-entry',{canvas:canvasInfo(this),property,oldValue,requestedValue:value});
  try{const result=descriptor.set.call(this,value);phase('canvas-backing-write-return',{canvas:canvasInfo(this),property,oldValue,newValue:descriptor.get.call(this)});return result;}catch(error){phase('canvas-backing-write-throw',{canvas:canvasInfo(this),property,error});throw error;}
 }});
}
const getContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(...args){
 if(args[0]!=='webgl2')return getContext.apply(this,args);
 phase('getContext-entry',{canvas:canvasInfo(this),contextType:args[0]});
 try{const context=getContext.apply(this,args);if(context&&!contexts.has(this)){contexts.set(this,context);this.addEventListener('webglcontextlost',event=>phase('context-lost',{canvas:canvasInfo(this),isTrusted:event.isTrusted}));this.addEventListener('webglcontextrestored',event=>phase('context-restored',{canvas:canvasInfo(this),isTrusted:event.isTrusted}));}phase('getContext-return',{canvas:canvasInfo(this),returnedContext:!!context});return context;}catch(error){phase('getContext-throw',{canvas:canvasInfo(this),error});throw error;}
};
let last=performance.now();setInterval(()=>{const now=performance.now();phase('heartbeat',{lagMs:Math.max(0,now-last-1000)});last=now;},1000);
window.addEventListener('error',event=>phase('window-error',{error:event.error||new Error(event.message)}));
window.addEventListener('unhandledrejection',event=>phase('unhandled-rejection',{error:event.reason}));
phase('instrumentation-ready');
void import('../main.tsx');
