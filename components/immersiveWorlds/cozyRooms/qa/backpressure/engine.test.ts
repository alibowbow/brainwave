import {afterEach,beforeEach,describe,expect,it,vi,type Mock} from 'vitest';
import * as THREE from 'three';
import {CozyEngine} from '../../engine';
import type {WorldBuild} from '../../contracts';
import {LiveSceneHost,type LiveSceneHolder} from '../../../../liveScene/liveSceneHost';

type Batch={id:number,complete:boolean};
type Sync={batch:Batch,status:number,deleted:boolean};
interface RendererDouble {
  gl:GLDouble;
  render:Mock<(scene:THREE.Scene,camera:THREE.Camera)=>void>;
  setSize:Mock<(width:number,height:number,updateStyle?:boolean)=>void>;
  dispose:Mock<()=>void>;
}
const renderers=vi.hoisted(()=>({items:[] as RendererDouble[]}));

// A deterministic WebGL protocol double, not GPU evidence. In particular,
// deleting a sync does NOT complete its batch or free submission capacity.
class GLDouble {
  readonly SYNC_GPU_COMMANDS_COMPLETE=0x9117;
  readonly ALREADY_SIGNALED=0x911a;
  readonly TIMEOUT_EXPIRED=0x911b;
  readonly CONDITION_SATISFIED=0x911c;
  readonly WAIT_FAILED=0x911d;
  batches:Batch[]=[];
  syncs:Sync[]=[];
  lost=false;
  get outstanding(){return this.batches.filter(batch=>!batch.complete);}
  submit(){
    expect(this.outstanding,'never submit a second unfinished GPU batch').toHaveLength(0);
    this.batches.push({id:this.batches.length+1,complete:false});
  }
  fenceSync=vi.fn((_condition:number,_flags:number):Sync|null=>{
    const batch=this.batches.at(-1);if(!batch)throw new Error('fence without submitted work');
    const sync={batch,status:this.TIMEOUT_EXPIRED,deleted:false};this.syncs.push(sync);return sync;
  });
  flush=vi.fn();
  clientWaitSync=vi.fn((sync:Sync,flags:number,timeout:number)=>{
    expect(flags).toBe(0);expect(timeout).toBe(0);
    expect(sync.deleted,'do not poll a deleted sync').toBe(false);return sync.status;
  });
  deleteSync=vi.fn((sync:Sync)=>{
    expect(sync.deleted,'delete each sync at most once').toBe(false);sync.deleted=true;
  });
  isContextLost=vi.fn(()=>this.lost);
  signal(){
    const batch=this.outstanding[0];if(!batch)throw new Error('no outstanding batch to signal');
    batch.complete=true;
    for(const sync of this.syncs)if(sync.batch===batch&&!sync.deleted)sync.status=this.CONDITION_SATISFIED;
  }
}
vi.mock('three',async importOriginal=>{
  const actual=await importOriginal<typeof import('three')>();
  class Renderer {
    gl=new GLDouble();private size=new actual.Vector2(300,150);private ratio=1;
    shadowMap={enabled:false,type:0};info={render:{calls:0,triangles:0},memory:{geometries:0,textures:0}};
    constructor(private options:{canvas:HTMLCanvasElement}){renderers.items.push(this);}
    getContext(){return this.gl;}
    getPixelRatio(){return this.ratio;}
    getSize(target:THREE.Vector2){return target.copy(this.size);}
    setSize=vi.fn((width:number,height:number,_updateStyle?:boolean)=>{
      expect(this.gl.outstanding,'defer backing-buffer mutation while a batch is unfinished').toHaveLength(0);
      this.size.set(width,height);this.options.canvas.width=width*this.ratio;this.options.canvas.height=height*this.ratio;
    });
    setPixelRatio(ratio:number){this.ratio=ratio;this.setSize(this.size.x,this.size.y,false);}
    render=vi.fn((_scene:THREE.Scene,_camera:THREE.Camera)=>this.gl.submit());
    dispose=vi.fn();
  }
  return {...actual,WebGLRenderer:Renderer};
});

class CanvasDouble extends EventTarget {
  dataset:Record<string,string>={};width=300;height=150;className='';isConnected=true;parentElement:unknown=null;
  setAttribute=vi.fn();
  remove(){this.isConnected=false;this.parentElement=null;}
  getBoundingClientRect(){return {left:0,top:0,width:960,height:700};}
}
const engines:CozyEngine[]=[];
const callbacks=new Map<number,FrameRequestCallback>();let nextRAF=0;
let documentDouble:EventTarget&{hidden:boolean};
function step(ms=16){
  vi.advanceTimersByTime(ms);
  const pending=[...callbacks.values()];callbacks.clear();
  for(const callback of pending)callback(performance.now());
}
function makeWorld(){
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,100);
  const geometry=new THREE.BoxGeometry(),material=new THREE.MeshStandardMaterial({color:'#445566'});
  scene.add(new THREE.Mesh(geometry,material));
  const update=vi.fn((time:number,dt:number)=>{scene.userData.time=time;scene.userData.settled=dt===0;});
  const resize=vi.fn((aspect:number)=>{camera.aspect=aspect;camera.position.set(0,1.5,4);camera.lookAt(0,1.2,-2);});
  const interact=vi.fn((action:string)=>action==='none'?null:{type:action,intensity:action==='zero'?0:.2});
  const cleanup=vi.fn();const world:WorldBuild={scene,camera,update,resize,interact,dispose:cleanup};
  return {world,scene,camera,geometry,material,update,resize,interact,cleanup};
}
async function fixture(){
  const parts=makeWorld(),canvas=new CanvasDouble(),factory=vi.fn(()=>parts.world),onLost=vi.fn();
  const engine=new CozyEngine(canvas as unknown as HTMLCanvasElement,factory,onLost);engines.push(engine);
  engine.setSize(960,700,1);await engine.init();
  const renderer=renderers.items.at(-1)!;
  return {...parts,engine,canvas,factory,onLost,renderer,gl:renderer.gl};
}
beforeEach(()=>{
  vi.useFakeTimers();renderers.items.length=0;callbacks.clear();nextRAF=0;
  documentDouble=Object.assign(new EventTarget(),{hidden:false});vi.stubGlobal('document',documentDouble);
  vi.stubGlobal('window',Object.assign(new EventTarget(),{setTimeout,clearTimeout,innerWidth:960,innerHeight:700,devicePixelRatio:1}));
  vi.stubGlobal('requestAnimationFrame',vi.fn((callback:FrameRequestCallback)=>{const id=++nextRAF;callbacks.set(id,callback);return id;}));
  vi.stubGlobal('cancelAnimationFrame',vi.fn((id:number)=>callbacks.delete(id)));
});
afterEach(()=>{
  for(const engine of engines.splice(0)){try{engine.dispose();}catch{/* Throwing-cleanup assertions belong to their own test. */}}
  vi.clearAllTimers();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks();
});

describe('CozyEngine one-batch completion backpressure (protocol doubles only)',()=>{
  it('bounds the initial, direct positive, static and active paths without advancing blocked world state',async()=>{
    const f=await fixture();expect(f.renderer.render).not.toHaveBeenCalled();
    f.engine.renderFrame(0);expect(f.renderer.render).toHaveBeenCalledTimes(1);
    expect(f.gl.fenceSync).toHaveBeenCalledExactlyOnceWith(f.gl.SYNC_GPU_COMMANDS_COMPLETE,0);
    expect(f.gl.flush).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:1,maxInFlight:1,submitted:1,returned:1,completed:0});
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    f.engine.start();
    for(let i=0;i<5;i++){f.engine.renderFrame(.02);f.engine.releaseDrag();f.engine.renderFrame(0);step();}
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(f.update).toHaveBeenCalledTimes(updates);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames,time:before.time});
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:1,pending:0,completed:0});
    f.engine.stop();f.gl.signal();step(32);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    expect(f.update).toHaveBeenCalledTimes(updates+1);expect(f.update).toHaveBeenLastCalledWith(before.time,0);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:before.time,running:false});
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);expect(f.gl.outstanding).toHaveLength(1);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:1,maxInFlight:1,submitted:2,returned:2,completed:1,pending:null});
  });

  it('uses only the latest real size/DPR and retains the final paused interaction frame',async()=>{
    const f=await fixture();f.engine.renderFrame(0);
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length,sizes=f.renderer.setSize.mock.calls.length;
    for(const [width,height,dpr] of [[412,915,1],[673,841,2],[915,412,1]]){
      f.engine.setSize(width,height,dpr);f.engine.renderFrame(0);
    }
    expect(f.engine.interact('zero')).toEqual({type:'zero',intensity:0});
    f.engine.stop();step(64);
    expect(f.renderer.setSize).toHaveBeenCalledTimes(sizes);expect(f.canvas.width).toBe(960);expect(f.canvas.height).toBe(700);
    expect(f.update).toHaveBeenCalledTimes(updates);expect(f.engine.diagnostics().running).toBe(false);
    f.gl.signal();step(32);
    expect(f.canvas.width).toBe(915);expect(f.canvas.height).toBe(412);
    expect(f.camera.aspect).toBeCloseTo(915/412);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);expect(f.update).toHaveBeenLastCalledWith(before.time,0);
    expect(f.engine.diagnostics()).toMatchObject({time:before.time,frames:before.frames+1,running:false});
    step(64);expect(f.renderer.render).toHaveBeenCalledTimes(2);
  });

  it('drops unsubmitted positive time on stop but observes completion without another draw',async()=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.start();step(32);step(32);
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    f.engine.stop();const polls=f.gl.clientWaitSync.mock.calls.length;
    step(1000);
    expect(f.gl.clientWaitSync.mock.calls.length).toBeGreaterThan(polls);expect(f.gl.deleteSync).not.toHaveBeenCalled();
    expect(f.update).toHaveBeenCalledTimes(updates);expect(f.engine.diagnostics()).toMatchObject({frames:before.frames,time:before.time,running:false});
    f.gl.signal();step(1000);expect(f.renderer.render).toHaveBeenCalledTimes(1);
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().gpu).toMatchObject({completed:1,inFlight:0,pending:null,pollScheduled:false});
    f.engine.start();step(16);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().time-before.time).toBeGreaterThan(0);
    expect(f.engine.diagnostics().time-before.time).toBeLessThanOrEqual(.05);
  });

  it.each(['hidden','detached'])('suspends pending static polling while %s and renders the latest requested state after return',async condition=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.releaseDrag();f.engine.renderFrame(0);f.engine.stop();
    if(condition==='hidden')documentDouble.hidden=true;else f.canvas.isConnected=false;
    const before=f.engine.diagnostics(),polls=f.gl.clientWaitSync.mock.calls.length;
    step(1000);expect(f.gl.clientWaitSync).toHaveBeenCalledTimes(polls);expect(f.renderer.render).toHaveBeenCalledTimes(1);
    f.gl.signal();if(condition==='hidden')documentDouble.hidden=false;else f.canvas.isConnected=true;
    f.engine.releaseDrag();f.engine.renderFrame(0);step(32);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:before.time,running:false});
  });

  it('renders an initially hidden zero request on visibility restoration alone',async()=>{
    const f=await fixture();documentDouble.hidden=true;
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    f.engine.renderFrame(0);step(1000);
    expect(f.renderer.render).not.toHaveBeenCalled();expect(f.update).toHaveBeenCalledTimes(updates);
    expect(f.engine.diagnostics().gpu).toMatchObject({pending:0,inFlight:0,pollScheduled:false});
    documentDouble.hidden=false;documentDouble.dispatchEvent(new Event('visibilitychange'));
    step(32); // No second renderFrame, start, resize or holder request.
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates+1);
    expect(f.update).toHaveBeenLastCalledWith(before.time,0);
    expect(f.engine.diagnostics()).toMatchObject({frames:1,time:before.time,running:false});
    expect(f.engine.diagnostics().gpu).toMatchObject({pending:null,inFlight:1,maxInFlight:1});
    expect(f.onLost).not.toHaveBeenCalled();
  });

  it('notifies the real host if the first actual draw fails after hidden initialization returned',async()=>{
    const parts=makeWorld(),canvas=new CanvasDouble();canvas.isConnected=false;documentDouble.hidden=true;
    Object.assign(documentDouble,{createElement:()=>canvas});vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){}});
    let engine:CozyEngine;
    const host=new LiveSceneHost({canvasClass:'cozy-test',isSupported:()=>true,create:(element,onLost)=>{
      engine=new CozyEngine(element,()=>parts.world,onLost);engines.push(engine);
      renderers.items.at(-1)!.gl.fenceSync.mockReturnValueOnce(null);return engine;
    }});
    const mount={clientWidth:960,clientHeight:700,appendChild(child:CanvasDouble){child.parentElement=mount;child.isConnected=true;}};
    const onStatus=vi.fn();host.acquire({mount:mount as unknown as HTMLElement,running:false,onStatus});
    await Promise.resolve();await Promise.resolve();
    expect(onStatus).toHaveBeenLastCalledWith('ready');expect(renderers.items[0].render).not.toHaveBeenCalled();
    documentDouble.hidden=false;documentDouble.dispatchEvent(new Event('visibilitychange'));step(32);
    expect(onStatus).toHaveBeenLastCalledWith('failed');expect(canvas.parentElement).toBeNull();
    expect(renderers.items[0].render).toHaveBeenCalledTimes(1);expect(renderers.items[0].dispose).toHaveBeenCalledTimes(1);
    expect(engine!.diagnostics()).toMatchObject({frames:0,running:false});
    expect(engine!.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false});
    step(1000);expect(onStatus).toHaveBeenLastCalledWith('failed');expect(renderers.items[0].render).toHaveBeenCalledTimes(1);
  });

  it('never enters renderer.render if the first backing-size write loses its context',async()=>{
    const f=await fixture(),updates=f.update.mock.calls.length;
    f.renderer.setSize.mockImplementationOnce(()=>{
      f.gl.lost=true;f.canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true}));
    });
    expect(()=>f.engine.renderFrame(0)).toThrow(/context lost/i);
    expect(f.renderer.render).not.toHaveBeenCalled();expect(f.gl.fenceSync).not.toHaveBeenCalled();
    expect(f.update).toHaveBeenCalledTimes(updates);expect(f.engine.diagnostics().frames).toBe(0);
    expect(f.engine.diagnostics().gpu).toMatchObject({submitted:0,returned:0,inFlight:0,pending:null,pollScheduled:false});
    expect(f.onLost).not.toHaveBeenCalled(); // The initial call throws into the host promise catch.
    f.engine.renderFrame(0);f.engine.start();step(1000);expect(f.renderer.render).not.toHaveBeenCalled();
  });

  it.each(['context-loss','dispose'])('does not create a fence or count a frame after reentrant %s inside render',async mode=>{
    const f=await fixture();f.engine.renderFrame(0);f.gl.signal();f.engine.releaseDrag();
    const before=f.engine.diagnostics();
    f.onLost.mockImplementation(()=>f.engine.dispose());
    f.renderer.render.mockImplementationOnce(()=>{
      f.gl.submit();
      if(mode==='context-loss'){
        f.gl.lost=true;f.canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true}));
      }else f.engine.dispose();
    });
    expect(()=>f.engine.renderFrame(0)).toThrow();
    expect(f.renderer.render).toHaveBeenCalledTimes(2);expect(f.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(f.gl.flush).toHaveBeenCalledTimes(1);expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().frames).toBe(before.frames);expect(f.canvas.dataset.frames).toBe(String(before.frames));
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,submitted:2,completed:1});
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);expect(f.cleanup).toHaveBeenCalledTimes(1);
    expect(f.onLost).toHaveBeenCalledTimes(mode==='context-loss'?1:0);
    f.engine.renderFrame(0);f.engine.start();step(1000);expect(f.renderer.render).toHaveBeenCalledTimes(2);
  });

  it('coalesces nested render callbacks without entering a second unfinished batch',async()=>{
    const f=await fixture(),before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    f.renderer.render.mockImplementationOnce(()=>{
      f.gl.submit();f.engine.renderFrame(.02);f.engine.renderFrame(0);f.engine.renderFrame(.04);
    });
    f.engine.renderFrame(0);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.gl.fenceSync).toHaveBeenCalledTimes(1);
    expect(f.update).toHaveBeenCalledTimes(updates+1);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:1,pending:0,maxInFlight:1});
    step(64);expect(f.renderer.render).toHaveBeenCalledTimes(1);
    f.gl.signal();step(32);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);expect(f.update).toHaveBeenCalledTimes(updates+2);
    expect(f.update).toHaveBeenLastCalledWith(before.time,0);
    expect(f.engine.diagnostics()).toMatchObject({frames:2,time:before.time,running:false});
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:1,pending:null,maxInFlight:1,completed:1});
    step(64);expect(f.renderer.render).toHaveBeenCalledTimes(2);
  });

  it('fails a requested completion after a finite deadline instead of silently opening another slot',async()=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.releaseDrag();f.engine.renderFrame(0);f.engine.stop();
    vi.advanceTimersByTime(120001);
    expect(f.onLost).toHaveBeenCalledTimes(1);expect(f.renderer.render).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,completed:0,pollScheduled:false});
    expect(f.engine.diagnostics().gpu.failure).toMatch(/120000/);
    expect(f.gl.outstanding).toHaveLength(1); // Handle cleanup did not claim GPU completion.
    f.engine.renderFrame(0);f.engine.start();step(1000);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(callbacks.size).toBe(0);
  });

  it.each(['wait-failed','context-lost','wait-throw'])('treats %s as terminal failure, not completed work',async fault=>{
    const f=await fixture();f.engine.renderFrame(0);const updates=f.update.mock.calls.length;
    if(fault==='wait-failed')f.gl.syncs[0].status=f.gl.WAIT_FAILED;
    else if(fault==='context-lost')f.gl.lost=true;
    else f.gl.clientWaitSync.mockImplementationOnce(()=>{throw new Error('driver wait threw');});
    try{f.engine.releaseDrag();f.engine.renderFrame(0);}catch{/* Synchronous callers may receive the reported terminal error. */}
    step(32);expect(f.onLost).toHaveBeenCalledTimes(1);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates);
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,completed:0,pollScheduled:false});
    expect(f.engine.diagnostics().gpu.failure).not.toBeNull();
    f.engine.renderFrame(0);f.engine.start();step(1000);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.onLost).toHaveBeenCalledTimes(1);
  });

  it.each(['null-fence','fence-throw','flush-throw'])('reports %s during initial submission and throws before the host can call it ready',async fault=>{
    const f=await fixture();
    if(fault==='null-fence')f.gl.fenceSync.mockReturnValueOnce(null);
    else if(fault==='fence-throw')f.gl.fenceSync.mockImplementationOnce(()=>{throw new Error('fence failed');});
    else f.gl.flush.mockImplementationOnce(()=>{throw new Error('flush failed');});
    expect(()=>f.engine.renderFrame(0)).toThrow();
    // Initial errors reach the unchanged shared host through its promise
    // catch, avoiding a reentrant failed callback overwritten by ready.
    expect(f.onLost).not.toHaveBeenCalled();
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,completed:0,pollScheduled:false});
    const updates=f.update.mock.calls.length;
    f.engine.renderFrame(0);f.engine.start();step(1000);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates);
    expect(callbacks.size).toBe(0);
    if(fault==='flush-throw')expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
  });

  it('keeps the unchanged shared host failed after an initial fence failure, with no false ready',async()=>{
    const parts=makeWorld(),canvas=new CanvasDouble();canvas.isConnected=false;let engine:CozyEngine;
    Object.assign(documentDouble,{createElement:()=>canvas});vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){}});
    const host=new LiveSceneHost({canvasClass:'cozy-test',isSupported:()=>true,create:(element,onLost)=>{
      engine=new CozyEngine(element,()=>parts.world,onLost);engines.push(engine);
      renderers.items.at(-1)!.gl.fenceSync.mockReturnValueOnce(null);return engine;
    }});
    const mount={clientWidth:960,clientHeight:700,appendChild(child:CanvasDouble){child.parentElement=mount;child.isConnected=true;}};
    const onStatus=vi.fn();host.acquire({mount:mount as unknown as HTMLElement,running:false,onStatus});
    await Promise.resolve();await Promise.resolve();await Promise.resolve();
    expect(onStatus).toHaveBeenCalledWith('failed');expect(onStatus).not.toHaveBeenCalledWith('ready');
    expect(canvas.parentElement).toBeNull();expect(renderers.items[0].dispose).toHaveBeenCalledTimes(1);
    expect(engine!.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false});
    engine!.renderFrame(0);engine!.start();step(32);expect(renderers.items[0].render).toHaveBeenCalledTimes(1);
  });

  it('rejects an initialization exception terminally without allocating or drawing on a later call',async()=>{
    const canvas=new CanvasDouble(),onLost=vi.fn();
    const factory=vi.fn(()=>{throw new Error('factory initialization failed');});
    const engine=new CozyEngine(canvas as unknown as HTMLCanvasElement,factory,onLost);engines.push(engine);
    engine.setSize(960,700,1);
    await expect(engine.init()).rejects.toThrow('factory initialization failed');
    expect(factory).toHaveBeenCalledTimes(1);
    expect(engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,failure:'factory initialization failed'});
    await engine.init();engine.renderFrame(0);engine.start();step(1000);
    expect(factory).toHaveBeenCalledTimes(1);expect(renderers.items.at(-1)!.render).not.toHaveBeenCalled();
    expect(callbacks.size).toBe(0);
  });

  it('handles a context-loss callback even while a stopped outstanding batch has no pending request',async()=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.stop();
    const updates=f.update.mock.calls.length;f.gl.lost=true;
    // Unit-level event stimulus only; the dedicated browser suite establishes
    // actual WEBGL_lose_context behavior and trusted driver events.
    const event=new Event('webglcontextlost',{cancelable:true});f.canvas.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);expect(f.onLost).toHaveBeenCalledTimes(1);
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,completed:0});
    f.engine.renderFrame(0);f.engine.start();step(1000);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates);
  });

  it('cancels pending static work and deletes an unsignaled handle once on repeated disposal',async()=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.releaseDrag();f.engine.renderFrame(0);f.engine.start();
    const updates=f.update.mock.calls.length,lifetime=f.engine.diagnostics().lifetime;
    const staleCallbacks=[...callbacks.values()];
    f.engine.dispose();f.engine.dispose();
    for(const callback of staleCallbacks)callback(performance.now()+16);
    step(120001);f.engine.renderFrame(0);f.engine.start();
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);expect(f.gl.outstanding).toHaveLength(1);
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);expect(f.cleanup).toHaveBeenCalledTimes(1);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates);
    expect(f.engine.diagnostics().lifetime.disposed).toBe(lifetime.disposed+1);expect(callbacks.size).toBe(0);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,completed:0});
  });

  it.each(['delete-sync','world-cleanup'])('finishes independent teardown and prevents resurrection when %s throws',async fault=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.releaseDrag();f.engine.renderFrame(0);f.engine.start();
    if(fault==='delete-sync')f.gl.deleteSync.mockImplementationOnce(()=>{throw new Error('delete failed');});
    else f.cleanup.mockImplementationOnce(()=>{throw new Error('world cleanup failed');});
    expect(()=>f.engine.dispose()).not.toThrow();
    const deleted=f.gl.deleteSync.mock.calls.length;
    f.engine.dispose();f.engine.renderFrame(0);f.engine.start();step(1000);
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(deleted);expect(deleted).toBe(1);
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);expect(f.cleanup).toHaveBeenCalledTimes(1);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(callbacks.size).toBe(0);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false});
    expect(f.engine.diagnostics().gpu.cleanupErrors).toEqual([fault==='delete-sync'?'delete failed':'world cleanup failed']);
  });

  it('coalesces paused same-canvas holder movement and still renders the final restored holder',async()=>{
    const parts=makeWorld(),canvas=new CanvasDouble();canvas.isConnected=false;let engine:CozyEngine;
    Object.assign(documentDouble,{createElement:()=>canvas});vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){}});
    const host=new LiveSceneHost({canvasClass:'cozy-test',isSupported:()=>true,create:(element,onLost)=>{
      engine=new CozyEngine(element,()=>parts.world,onLost);engines.push(engine);return engine;
    }});
    const holder=(width:number,height:number):LiveSceneHolder=>{
      const mount={clientWidth:width,clientHeight:height,appendChild(child:CanvasDouble){child.parentElement=mount;child.isConnected=true;}};
      return {mount:mount as unknown as HTMLElement,running:false,onStatus:vi.fn()};
    };
    const a=holder(960,700),b=holder(412,915),releaseA=host.acquire(a);await Promise.resolve();
    const renderer=renderers.items.at(-1)!,before=engine!.diagnostics();expect(renderer.render).toHaveBeenCalledTimes(1);
    const releaseB=host.acquire(b);releaseB();
    expect(canvas.parentElement).toBe(a.mount);expect(renderer.render).toHaveBeenCalledTimes(1);expect(renderers.items).toHaveLength(1);
    renderer.gl.signal();step(32);
    expect(renderer.render).toHaveBeenCalledTimes(2);expect(canvas.width).toBe(960);expect(canvas.height).toBe(700);
    expect(engine!.diagnostics()).toMatchObject({instance:before.instance,frames:before.frames+1,time:before.time,running:false});
    releaseA();vi.advanceTimersByTime(5000);expect(renderer.dispose).toHaveBeenCalledTimes(1);
  });

  it('cannot construct a world or submit a late init continuation after host retention disposes it',async()=>{
    const parts=makeWorld(),factory=vi.fn(()=>parts.world),canvas=new CanvasDouble();canvas.isConnected=false;
    Object.assign(documentDouble,{createElement:()=>canvas});vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){}});
    let finish!:()=>void;const gate=new Promise<void>(resolve=>{finish=resolve;});let engine:CozyEngine;
    const host=new LiveSceneHost({canvasClass:'cozy-test',isSupported:()=>true,create:(element,onLost)=>{
      engine=new CozyEngine(element,factory,onLost);engines.push(engine);
      const init=engine.init.bind(engine);engine.init=async()=>{await gate;await init();};return engine;
    }});
    const mount={clientWidth:960,clientHeight:700,appendChild(child:CanvasDouble){child.parentElement=mount;child.isConnected=true;}};
    const holder:LiveSceneHolder={mount:mount as unknown as HTMLElement,running:false,onStatus:vi.fn()};
    const release=host.acquire(holder);release();vi.advanceTimersByTime(5000);
    expect(renderers.items[0].dispose).toHaveBeenCalledTimes(1);
    finish();await gate;await Promise.resolve();await Promise.resolve();step(32);
    expect(factory).not.toHaveBeenCalled();expect(renderers.items[0].render).not.toHaveBeenCalled();
    expect(holder.onStatus).not.toHaveBeenCalledWith('ready');expect(callbacks.size).toBe(0);
  });
});
