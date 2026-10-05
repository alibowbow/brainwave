import {afterEach,beforeEach,describe,expect,it,vi,type Mock} from 'vitest';
import * as THREE from 'three';
import {CozyEngine} from '../../engine';
import type {WorldBuild} from '../../contracts';
import {LiveSceneHost,type LiveSceneHolder} from '../../../../liveScene/liveSceneHost';

type Image={width:number;height:number;aspect:number;time:number;value:number};
type Batch={image:Image;complete:boolean};
type Sync={batch:Batch;status:number;deleted:boolean};
interface RendererDouble {
  gl:CompletionGL;
  images:Image[];
  render:Mock<(scene:THREE.Scene,camera:THREE.PerspectiveCamera)=>void>;
  dispose:Mock<()=>void>;
}
const renderers=vi.hoisted(()=>({items:[] as RendererDouble[]}));

// Real Three scene/camera math plus a controllable completion protocol. These
// tests prove JavaScript contracts, not browser pixels or actual GPU execution.
class CompletionGL {
  readonly SYNC_GPU_COMMANDS_COMPLETE=0x9117;readonly ALREADY_SIGNALED=0x911a;
  readonly TIMEOUT_EXPIRED=0x911b;readonly CONDITION_SATISFIED=0x911c;readonly WAIT_FAILED=0x911d;
  batches:Batch[]=[];syncs:Sync[]=[];lost=false;
  submit(image:Image){
    expect(this.batches.filter(batch=>!batch.complete),'one unfinished batch').toHaveLength(0);
    this.batches.push({image,complete:false});
  }
  fenceSync=vi.fn((_condition:number,_flags:number):Sync|null=>{
    const sync={batch:this.batches.at(-1)!,status:this.TIMEOUT_EXPIRED,deleted:false};this.syncs.push(sync);return sync;
  });
  flush=vi.fn();isContextLost=vi.fn(()=>this.lost);
  clientWaitSync=vi.fn((sync:Sync,flags:number,timeout:number)=>{
    expect(flags).toBe(0);expect(timeout).toBe(0);expect(sync.deleted).toBe(false);return sync.status;
  });
  deleteSync=vi.fn((sync:Sync)=>{expect(sync.deleted).toBe(false);sync.deleted=true;});
  signal(){
    const batch=this.batches.find(batch=>!batch.complete);if(!batch)throw new Error('no submitted batch');
    batch.complete=true;
    for(const sync of this.syncs)if(sync.batch===batch&&!sync.deleted)sync.status=this.CONDITION_SATISFIED;
  }
}
vi.mock('three',async importOriginal=>{
  const actual=await importOriginal<typeof import('three')>();
  class Renderer {
    gl=new CompletionGL();images:Image[]=[];private size=new actual.Vector2(300,150);private ratio=1;
    shadowMap={enabled:false,type:0};info={render:{calls:0,triangles:0},memory:{geometries:0,textures:0}};
    constructor(private options:{canvas:HTMLCanvasElement}){renderers.items.push(this);}
    getContext(){return this.gl;}getPixelRatio(){return this.ratio;}getSize(target:THREE.Vector2){return target.copy(this.size);}
    setSize(width:number,height:number){
      expect(this.gl.batches.filter(batch=>!batch.complete),'no buffer reset ahead of completion').toHaveLength(0);
      this.size.set(width,height);this.options.canvas.width=width*this.ratio;this.options.canvas.height=height*this.ratio;
    }
    setPixelRatio(ratio:number){this.ratio=ratio;this.setSize(this.size.x,this.size.y);}
    render=vi.fn((scene:THREE.Scene,camera:THREE.PerspectiveCamera)=>{
      const image={width:this.options.canvas.width,height:this.options.canvas.height,
        aspect:camera.aspect,time:scene.userData.time,value:scene.userData.value};
      this.images.push(image);this.gl.submit(image);
    });
    dispose=vi.fn();
  }
  return {...actual,WebGLRenderer:Renderer};
});

class CanvasDouble extends EventTarget {
  dataset:Record<string,string>={};width=300;height=150;className='';isConnected=true;parentElement:unknown=null;
  setAttribute=vi.fn();remove(){this.isConnected=false;this.parentElement=null;}
}
const engines:CozyEngine[]=[];const callbacks=new Map<number,FrameRequestCallback>();let serial=0;
let doc:EventTarget&{hidden:boolean};
let win:EventTarget&{setTimeout:typeof setTimeout;clearTimeout:typeof clearTimeout;innerWidth:number;innerHeight:number;devicePixelRatio:number};
const observers:Array<{callback:ResizeObserverCallback;target:Element|null}>=[];
function tick(ms=16){
  vi.advanceTimersByTime(ms);const ready=[...callbacks.values()];callbacks.clear();
  for(const callback of ready)callback(performance.now());
}
function worldFixture(){
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,100);
  scene.userData.value=0;
  const update=vi.fn((time:number,_dt:number)=>{scene.userData.time=time;});
  const resize=vi.fn((aspect:number)=>{camera.aspect=aspect;camera.position.set(0,1.5,4);camera.lookAt(0,1.2,-2);});
  const interact=vi.fn((action:string)=>{
    scene.userData.value++;return {type:action,intensity:action==='zero'?0:.2};
  });
  const dispose=vi.fn();const world:WorldBuild={scene,camera,update,resize,interact,dispose};
  return {world,scene,camera,update,resize,interact,dispose};
}
async function fixture(){
  const parts=worldFixture(),canvas=new CanvasDouble(),onLost=vi.fn();
  const engine=new CozyEngine(canvas as unknown as HTMLCanvasElement,()=>parts.world,onLost);engines.push(engine);
  engine.setSize(960,700,1);await engine.init();
  const renderer=renderers.items.at(-1)!;
  return {...parts,canvas,engine,renderer,gl:renderer.gl,onLost};
}
async function hostFixture(){
  const parts=worldFixture(),canvas=new CanvasDouble();canvas.isConnected=false;
  Object.assign(doc,{createElement:()=>canvas});let engine:CozyEngine;
  const host=new LiveSceneHost({canvasClass:'cozy-test',isSupported:()=>true,create:(element,onLost)=>{
    engine=new CozyEngine(element,()=>parts.world,onLost);engines.push(engine);return engine;
  }});
  const mount={clientWidth:960,clientHeight:700,appendChild(child:CanvasDouble){child.parentElement=mount;child.isConnected=true;}};
  const holder:LiveSceneHolder={mount:mount as unknown as HTMLElement,running:false,onStatus:vi.fn()};
  const release=host.acquire(holder);await Promise.resolve();
  const renderer=renderers.items.at(-1)!;
  function resize(width:number,height:number,dpr=1){
    mount.clientWidth=width;mount.clientHeight=height;win.devicePixelRatio=dpr;
    const observer=observers.find(observer=>observer.target===holder.mount)!;
    observer.callback([],observer as unknown as ResizeObserver);
  }
  return {...parts,host,holder,mount,canvas,engine:engine!,renderer,gl:renderer.gl,release,resize};
}
function expectSettled(engine:CozyEngine,revision:number){
  const state=engine.diagnostics();
  expect(state.image).toMatchObject({requestedRevision:revision,submittedRevision:revision,completedRevision:revision,dirty:false,sizeDirty:false});
  expect(state.gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,failure:null});
  expect(state.gpu.submitted).toBe(state.gpu.completed);expect(state.running).toBe(false);
}
beforeEach(()=>{
  vi.useFakeTimers();renderers.items.length=0;callbacks.clear();observers.length=0;serial=0;
  doc=Object.assign(new EventTarget(),{hidden:false});
  win=Object.assign(new EventTarget(),{setTimeout,clearTimeout,innerWidth:960,innerHeight:700,devicePixelRatio:1});
  vi.stubGlobal('document',doc);vi.stubGlobal('window',win);
  vi.stubGlobal('requestAnimationFrame',vi.fn((callback:FrameRequestCallback)=>{const id=++serial;callbacks.set(id,callback);return id;}));
  vi.stubGlobal('cancelAnimationFrame',vi.fn((id:number)=>callbacks.delete(id)));
  vi.stubGlobal('ResizeObserver',class{
    target:Element|null=null;constructor(public callback:ResizeObserverCallback){observers.push(this);}
    observe(target:Element){this.target=target;}disconnect(){this.target=null;}
  });
});
afterEach(()=>{
  for(const engine of engines.splice(0))engine.dispose();
  vi.clearAllTimers();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks();
});

describe('CozyEngine required static image completion (protocol doubles only)',()=>{
  it('preserves the latest active ResizeObserver size when positive work is blocked and the shared host pauses',async()=>{
    const f=await hostFixture();expect(f.renderer.images).toHaveLength(1);
    const initial=f.engine.diagnostics();f.host.setRunning(f.holder,true);tick();
    expect(f.engine.diagnostics().gpu.pending).toBeGreaterThan(0);
    // The real shared host calls only setSize while the holder is active.
    f.resize(412,915);f.resize(673,841,2);tick();
    const requested=f.engine.diagnostics().image.requestedRevision;
    expect(requested).toBeGreaterThan(initial.image.submittedRevision);
    expect(f.engine.diagnostics().image).toMatchObject({dirty:true,sizeDirty:true});
    f.host.setRunning(f.holder,false);
    expect(f.engine.diagnostics().gpu.pending).toBe(0);expect(f.engine.diagnostics().running).toBe(false);
    tick(64);expect(f.renderer.images).toHaveLength(1);expect(f.canvas.width).toBe(960);
    expect(f.engine.diagnostics().time).toBe(initial.time);
    f.gl.signal();tick(16);
    expect(f.renderer.images).toHaveLength(2);
    expect(f.renderer.images[1]).toEqual({width:1346,height:1682,aspect:673/841,time:initial.time,value:0});
    expect(f.update).toHaveBeenLastCalledWith(initial.time,0);
    expect(f.engine.diagnostics().image).toMatchObject({requestedRevision:requested,submittedRevision:requested,
      completedRevision:initial.image.submittedRevision,dirty:false,sizeDirty:false});
    expect(f.engine.diagnostics().gpu).toMatchObject({pending:null,inFlight:1,pollScheduled:true});
    f.gl.signal();tick(16);expectSettled(f.engine,requested);
    expect(f.renderer.images).toHaveLength(2);expect(f.engine.diagnostics().time).toBe(initial.time);
  });

  it('acknowledges the initial submitted image only after a signal, without another render request',async()=>{
    const f=await fixture();const requested=f.engine.diagnostics().image.requestedRevision;
    f.engine.renderFrame(0);const submitted=f.engine.diagnostics();
    expect(submitted.image).toMatchObject({requestedRevision:requested,submittedRevision:requested});
    expect(submitted.image.completedRevision).toBeLessThan(requested);
    expect(submitted.gpu).toMatchObject({pending:null,inFlight:1,pollScheduled:true,completed:0});
    tick(64);expect(f.renderer.images).toHaveLength(1);expect(f.engine.diagnostics().image.completedRevision).toBeLessThan(requested);
    f.gl.signal();tick(16);expectSettled(f.engine,requested);
    expect(f.renderer.images).toHaveLength(1);expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);
    const polls=f.gl.clientWaitSync.mock.calls.length;tick(1000);
    expect(f.gl.clientWaitSync).toHaveBeenCalledTimes(polls);expect(f.renderer.images).toHaveLength(1);
  });

  it('coalesces several actions into the latest image while emitting each interaction result only once',async()=>{
    const f=await fixture();f.engine.renderFrame(0);const initial=f.engine.diagnostics();
    const callback=vi.fn();
    for(const action of ['lamp','zero','cup']){const event=f.engine.interact(action);if(event)callback(event);}
    const requested=f.engine.diagnostics().image.requestedRevision;
    expect(requested).toBeGreaterThan(initial.image.submittedRevision);
    expect(callback).toHaveBeenCalledTimes(3);expect(f.interact).toHaveBeenCalledTimes(3);
    expect(callback.mock.calls.map(([event])=>event)).toEqual([{type:'lamp',intensity:.2},{type:'zero',intensity:0},{type:'cup',intensity:.2}]);
    tick(32);expect(f.renderer.images).toHaveLength(1);
    f.gl.signal();tick(16);
    expect(f.renderer.images).toHaveLength(2);expect(f.renderer.images[1].value).toBe(3);
    expect(f.renderer.images[1].time).toBe(initial.time);
    expect(f.engine.diagnostics().image.completedRevision).toBe(initial.image.submittedRevision);
    f.gl.signal();tick(16);expectSettled(f.engine,requested);tick(1000);
    expect(callback).toHaveBeenCalledTimes(3);expect(f.interact).toHaveBeenCalledTimes(3);expect(f.renderer.images).toHaveLength(2);
  });

  it('binds each fence to its admitted revision when a new action arrives inside the renderer callback',async()=>{
    const f=await fixture(),draw=f.renderer.render.getMockImplementation()!;
    const admitted=f.engine.diagnostics().image.requestedRevision;
    const callback=vi.fn();
    f.renderer.render.mockImplementationOnce((scene,camera)=>{
      draw(scene,camera);const event=f.engine.interact('nested');if(event)callback(event);
    });
    f.engine.renderFrame(0);
    const latest=f.engine.diagnostics().image.requestedRevision;
    expect(latest).toBeGreaterThan(admitted);expect(f.renderer.images[0].value).toBe(0);
    expect(f.engine.diagnostics().image.submittedRevision).toBe(admitted);
    f.gl.signal();tick(16);
    expect(f.engine.diagnostics().image).toMatchObject({requestedRevision:latest,submittedRevision:latest,completedRevision:admitted});
    expect(f.renderer.images.map(image=>image.value)).toEqual([0,1]);
    f.gl.signal();tick(16);expectSettled(f.engine,latest);expect(callback).toHaveBeenCalledTimes(1);
  });

  it('suspends completion polling while hidden and acknowledges the same image on visibility return',async()=>{
    const f=await fixture();f.engine.renderFrame(0);const requested=f.engine.diagnostics().image.requestedRevision;
    doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));
    const polls=f.gl.clientWaitSync.mock.calls.length;f.gl.signal();tick(1000);
    expect(f.gl.clientWaitSync).toHaveBeenCalledTimes(polls);expect(f.gl.deleteSync).not.toHaveBeenCalled();
    expect(f.engine.diagnostics().image.completedRevision).toBeLessThan(requested);
    doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));tick(16);
    expectSettled(f.engine,requested);expect(f.renderer.images).toHaveLength(1);
  });

  it('fails an uncompleted final static image within the finite deadline even with pending=null',async()=>{
    const f=await fixture();f.engine.renderFrame(0);const submitted=f.engine.diagnostics().image.submittedRevision;
    expect(f.engine.diagnostics().gpu.pending).toBeNull();vi.advanceTimersByTime(120001);
    expect(f.onLost).toHaveBeenCalledTimes(1);expect(f.engine.diagnostics().gpu.failure).toMatch(/120000/);
    expect(f.engine.diagnostics().image.completedRevision).toBeLessThan(submitted);
    expect(f.engine.diagnostics().gpu).toMatchObject({pending:null,inFlight:0,pollScheduled:false,completed:0});
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);expect(f.gl.batches[0].complete).toBe(false);
    f.engine.renderFrame(0);f.engine.start();tick(1000);expect(f.renderer.images).toHaveLength(1);
  });

  it.each(['wait-failed','context-loss'])('never acknowledges a static image when %s clears its handle',async fault=>{
    const f=await fixture();f.engine.renderFrame(0);const submitted=f.engine.diagnostics().image.submittedRevision;
    if(fault==='wait-failed')f.gl.syncs[0].status=f.gl.WAIT_FAILED;
    else{f.gl.lost=true;f.canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true}));}
    tick(16);expect(f.onLost).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().image.completedRevision).toBeLessThan(submitted);
    expect(f.engine.diagnostics().gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,completed:0});
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);expect(f.gl.batches[0].complete).toBe(false);
  });

  it('disposes an unacknowledged static image without inventing completion or leaving callbacks',async()=>{
    const f=await fixture();f.engine.renderFrame(0);const before=f.engine.diagnostics();
    f.engine.dispose();f.engine.dispose();tick(120001);
    const after=f.engine.diagnostics();
    expect(after.image.completedRevision).toBe(before.image.completedRevision);
    expect(after.gpu).toMatchObject({inFlight:0,pending:null,pollScheduled:false,completed:0});
    expect(f.gl.deleteSync).toHaveBeenCalledTimes(1);expect(f.gl.batches[0].complete).toBe(false);
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);expect(f.dispose).toHaveBeenCalledTimes(1);
    expect(f.renderer.images).toHaveLength(1);expect(f.onLost).not.toHaveBeenCalled();expect(callbacks.size).toBe(0);
  });
});
