import {afterEach,beforeEach,describe,expect,it,vi,type Mock} from 'vitest';
import * as THREE from 'three';
import {CozyEngine} from '../../engine';
import type {WorldBuild} from '../../contracts';
import {LiveSceneHost,type LiveSceneHolder} from '../../../../liveScene/liveSceneHost';

interface RendererDouble {
  render:Mock<(scene:THREE.Scene,camera:THREE.Camera)=>void>;
  setSize:Mock<(width:number,height:number,updateStyle?:boolean)=>void>;
  setPixelRatio:Mock<(ratio:number)=>void>;
  dispose:Mock<()=>void>;
}
const rendererState=vi.hoisted(()=>({instances:[] as RendererDouble[]}));

// Keep Three's real vectors, camera, scene, meshes and disposal events. Only
// the WebGL boundary is replaced: these tests cannot establish GPU completion,
// browser timing, pixels, context-loss recovery, or physical resource release.
vi.mock('three',async importOriginal=>{
  const actual=await importOriginal<typeof import('three')>();
  class Renderer {
    private size=new actual.Vector2(300,150);
    private ratio=1;
    private canvas:HTMLCanvasElement;
    shadowMap={enabled:false,type:0};
    info={render:{calls:0,triangles:0},memory:{geometries:0,textures:0}};
    constructor(options:{canvas:HTMLCanvasElement}){this.canvas=options.canvas;rendererState.instances.push(this);}
    getSize(target:THREE.Vector2){return target.copy(this.size);}
    getPixelRatio(){return this.ratio;}
    setSize=vi.fn((width:number,height:number,_updateStyle?:boolean)=>{
      this.size.set(width,height);this.canvas.width=Math.floor(width*this.ratio);this.canvas.height=Math.floor(height*this.ratio);
    });
    // Model the existing Three API relationship: changing DPR also updates
    // the backing dimensions at the current logical size.
    setPixelRatio=vi.fn((ratio:number)=>{this.ratio=ratio;this.setSize(this.size.x,this.size.y,false);});
    render=vi.fn((_scene:THREE.Scene,_camera:THREE.Camera)=>{});
    dispose=vi.fn(()=>{});
  }
  return {...actual,WebGLRenderer:Renderer};
});

class CanvasDouble extends EventTarget {
  dataset:Record<string,string>={};
  width=300; height=150; className=''; parentElement:unknown=null;
  setAttribute=vi.fn();
  remove(){this.parentElement=null;}
  getBoundingClientRect(){return {left:0,top:0,width:960,height:700};}
}
function worldFixture(){
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,100);
  const material=new THREE.MeshStandardMaterial({color:'#334455'});
  const geometry=new THREE.BoxGeometry(1,1,1);scene.add(new THREE.Mesh(geometry,material));
  const resize=vi.fn((aspect:number)=>{
    camera.aspect=aspect;camera.position.set(0,1.5,4);camera.lookAt(0,1.3,-2);camera.updateProjectionMatrix();
  });
  const update=vi.fn((time:number,dt:number)=>{
    scene.userData.lastTime=time;scene.userData.settled=dt===0;
  });
  const interact=vi.fn((action:string)=>{
    if(action==='none')return null;
    material.color.offsetHSL(.07,0,0);
    return {type:'lamp',intensity:action==='zero'?0:.2};
  });
  const dispose=vi.fn();
  const world:WorldBuild={scene,camera,resize,update,interact,dispose};
  return {world,scene,camera,material,geometry,resize,update,interact,dispose};
}
const engines:CozyEngine[]=[];
let rafSerial=0;
const pendingFrames=new Map<number,FrameRequestCallback>();
function flushFrames(now:number){
  const callbacks=[...pendingFrames.values()];pendingFrames.clear();
  for(const callback of callbacks)callback(now);
}
async function fixture(){
  const parts=worldFixture(),canvas=new CanvasDouble();
  const factory=vi.fn(()=>parts.world);
  const engine=new CozyEngine(canvas as unknown as HTMLCanvasElement,factory,vi.fn());engines.push(engine);
  engine.setSize(960,700,1);await engine.init();
  const renderer=rendererState.instances.at(-1)!;
  return {...parts,canvas,factory,engine,renderer};
}
beforeEach(()=>{
  vi.useFakeTimers();rendererState.instances.length=0;pendingFrames.clear();rafSerial=0;
  vi.stubGlobal('requestAnimationFrame',vi.fn((callback:FrameRequestCallback)=>{
    const id=++rafSerial;pendingFrames.set(id,callback);return id;
  }));
  vi.stubGlobal('cancelAnimationFrame',vi.fn((id:number)=>pendingFrames.delete(id)));
});
afterEach(()=>{
  for(const engine of engines.splice(0))engine.dispose();
  vi.clearAllTimers();vi.useRealTimers();vi.unstubAllGlobals();vi.restoreAllMocks();
});

describe('CozyEngine static redraw behavior at the renderer boundary',()=>{
  it('initializes the world without claiming a frame, then submits the actual first frame',async()=>{
    const f=await fixture();
    expect(f.factory).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(1);
    expect(f.renderer.render).not.toHaveBeenCalled();expect(f.engine.diagnostics().frames).toBe(0);
    expect(f.canvas.dataset.frames).toBeUndefined();
    f.engine.renderFrame(0);
    expect(f.renderer.render).toHaveBeenCalledExactlyOnceWith(f.scene,f.camera);
    expect(f.update).toHaveBeenCalledTimes(2);expect(f.update).toHaveBeenLastCalledWith(8,0);
    expect(f.engine.diagnostics()).toMatchObject({frames:1,time:8});
    expect(f.canvas.dataset.frames).toBe('1');expect(f.canvas.dataset.instance).toBe(String(f.engine.instance));
  });

  it('ignores unchanged size/DPR duplicate zero requests without updating the world or inflating counters',async()=>{
    const f=await fixture();f.engine.renderFrame(0);
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    const sizes=f.renderer.setSize.mock.calls.length;
    for(let i=0;i<4;i++){f.engine.setSize(960,700,1);f.engine.renderFrame(0);}
    expect(f.renderer.setSize).toHaveBeenCalledTimes(sizes);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames,time:before.time});
    expect(f.canvas.dataset.frames).toBe(String(before.frames));expect(pendingFrames.size).toBe(0);
  });

  it('renders changed logical dimensions and actual DPR, then coalesces each unchanged repeat',async()=>{
    const f=await fixture();f.engine.renderFrame(0);
    for(const [width,height,dpr] of [[1000,700,1],[1000,720,1],[1000,720,2]]){
      const before=f.engine.diagnostics(),draws=f.renderer.render.mock.calls.length,updates=f.update.mock.calls.length;
      f.engine.setSize(width,height,dpr);f.engine.renderFrame(0);
      expect(f.canvas.width).toBe(width*dpr);expect(f.canvas.height).toBe(height*dpr);
      expect(f.renderer.render).toHaveBeenCalledTimes(draws+1);expect(f.update).toHaveBeenCalledTimes(updates+1);
      expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:before.time});
      f.engine.setSize(width,height,dpr);f.engine.renderFrame(0);
      expect(f.renderer.render).toHaveBeenCalledTimes(draws+1);expect(f.update).toHaveBeenCalledTimes(updates+1);
    }
    const draws=f.renderer.render.mock.calls.length;
    f.engine.setSize(1000,720,3);f.engine.renderFrame(0);
    expect(f.renderer.render).toHaveBeenCalledTimes(draws); // Effective DPR is still capped at 2.
  });

  it('renders every release/holder restoration even when the view was already centered',async()=>{
    const f=await fixture();f.engine.renderFrame(0);
    for(let i=0;i<3;i++){
      const before=f.engine.diagnostics();f.engine.releaseDrag();f.engine.setSize(960,700,1);f.engine.renderFrame(0);
      expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:before.time});
      f.engine.renderFrame(0);expect(f.engine.diagnostics().frames).toBe(before.frames+1);
    }
    expect(f.renderer.render).toHaveBeenCalledTimes(4);
  });

  it('keeps the shared host canvas and submits each same-size holder transfer/restoration',async()=>{
    const parts=worldFixture(),canvas=new CanvasDouble();let engine:CozyEngine;
    vi.stubGlobal('window',{setTimeout,clearTimeout,innerWidth:960,innerHeight:700,devicePixelRatio:1});
    vi.stubGlobal('document',{createElement:()=>canvas});
    vi.stubGlobal('ResizeObserver',class{observe(){}disconnect(){}});
    const host=new LiveSceneHost({canvasClass:'cozy-test',isSupported:()=>true,create:(element,onLost)=>{
      engine=new CozyEngine(element,()=>parts.world,onLost);engines.push(engine);return engine;
    }});
    const holder=():LiveSceneHolder=>{
      const mount={clientWidth:960,clientHeight:700,appendChild(child:CanvasDouble){child.parentElement=mount;}};
      return {mount:mount as unknown as HTMLElement,running:false,onStatus:vi.fn()};
    };
    const first=holder(),second=holder(),releaseFirst=host.acquire(first);await Promise.resolve();
    const initial=engine!.diagnostics();expect(initial.frames).toBe(1);expect(canvas.parentElement).toBe(first.mount);
    const releaseSecond=host.acquire(second);
    expect(canvas.parentElement).toBe(second.mount);
    expect(engine!.diagnostics()).toMatchObject({instance:initial.instance,frames:initial.frames+1,time:initial.time});
    releaseSecond();expect(canvas.parentElement).toBe(first.mount);
    expect(engine!.diagnostics()).toMatchObject({instance:initial.instance,frames:initial.frames+2,time:initial.time});
    expect(rendererState.instances).toHaveLength(1);
    releaseFirst();vi.advanceTimersByTime(5000);
    expect(rendererState.instances[0].dispose).toHaveBeenCalledTimes(1);
  });

  it.each(['lamp','zero'])('renders a real interaction event (%s), including zero intensity, once',async action=>{
    const f=await fixture();f.engine.renderFrame(0);
    const before=f.engine.diagnostics(),color=f.material.color.getHex(),updates=f.update.mock.calls.length;
    const event=f.engine.interact(action);
    expect(event).toEqual({type:'lamp',intensity:action==='zero'?0:.2});
    expect(f.material.color.getHex()).not.toBe(color);
    expect(f.renderer.render).toHaveBeenCalledTimes(2);expect(f.update).toHaveBeenCalledTimes(updates+1);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:before.time});
    f.engine.renderFrame(0);expect(f.renderer.render).toHaveBeenCalledTimes(2);
    expect(f.engine.interact('none')).toBeNull();expect(f.renderer.render).toHaveBeenCalledTimes(2);
  });

  it('lets the first zero after positive time settle the world before skipping later duplicates',async()=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.renderFrame(.02);
    expect(f.scene.userData.settled).toBe(false);
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    f.engine.renderFrame(0);
    expect(f.scene.userData.settled).toBe(true);expect(f.update).toHaveBeenCalledTimes(updates+1);
    expect(f.update).toHaveBeenLastCalledWith(before.time,0);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:before.time});
    f.engine.renderFrame(0);expect(f.update).toHaveBeenCalledTimes(updates+1);
  });

  it('snaps a partially eased camera on the first zero after motion and on release',async()=>{
    const f=await fixture();f.engine.renderFrame(0);const centered=f.camera.quaternion.clone();
    f.engine.drag(.5,-.3);f.engine.renderFrame(.02);const eased=f.camera.quaternion.clone();
    f.engine.renderFrame(0);const snapped=f.camera.quaternion.clone();
    expect(eased.angleTo(centered)).toBeGreaterThan(0);
    expect(snapped.angleTo(centered)).toBeGreaterThan(eased.angleTo(centered));
    f.engine.releaseDrag();f.engine.renderFrame(0);
    expect(f.camera.quaternion.angleTo(centered)).toBeLessThan(1e-7);
    const frames=f.engine.diagnostics().frames;f.engine.renderFrame(0);expect(f.engine.diagnostics().frames).toBe(frames);
  });

  it.each([.4,1e-12])('never drops zero draws with nonzero aim/look, even for displacement %s',async displacement=>{
    const f=await fixture();f.engine.renderFrame(0);
    const before=f.engine.diagnostics(),updates=f.update.mock.calls.length;
    f.engine.drag(displacement,0); // Nonzero aim, centered look.
    f.engine.renderFrame(0);f.engine.renderFrame(0); // Both remain nonzero.
    expect(f.engine.diagnostics().frames).toBe(before.frames+2);
    expect(f.update).toHaveBeenCalledTimes(updates+2);
    f.engine.drag(0,0); // Return aim to center without a release: look is still nonzero.
    f.engine.renderFrame(0);expect(f.engine.diagnostics().frames).toBe(before.frames+3);
    expect(f.update).toHaveBeenCalledTimes(updates+3);
    f.engine.renderFrame(0);expect(f.engine.diagnostics().frames).toBe(before.frames+3);
    expect(f.engine.diagnostics().time).toBe(before.time);
  });

  it('does not mistake a thrown positive render for a successful static frame',async()=>{
    const f=await fixture();f.engine.renderFrame(0);const before=f.engine.diagnostics();
    f.renderer.render.mockImplementationOnce(()=>{throw new Error('render failed');});
    expect(()=>f.engine.renderFrame(.02)).toThrow('render failed');
    const failed=f.engine.diagnostics();
    expect(failed.frames).toBe(before.frames);expect(f.canvas.dataset.frames).toBe(String(before.frames));
    expect(failed.time).toBeCloseTo(before.time+.02); // The world update happened; no successful draw is claimed.
    expect(f.update).toHaveBeenLastCalledWith(failed.time,.02);
    const updates=f.update.mock.calls.length;
    f.engine.renderFrame(0);expect(f.renderer.render).toHaveBeenCalledTimes(3);
    expect(f.update).toHaveBeenCalledTimes(updates+1);expect(f.update).toHaveBeenLastCalledWith(failed.time,0);
    expect(f.engine.diagnostics()).toMatchObject({frames:before.frames+1,time:failed.time});
    f.engine.renderFrame(0);expect(f.renderer.render).toHaveBeenCalledTimes(3);
  });

  it('does not leave deferred draws behind a skip, stop, or idempotent disposal',async()=>{
    const f=await fixture();f.engine.renderFrame(0);f.engine.renderFrame(0);
    expect(pendingFrames.size).toBe(0);
    f.engine.start();expect(pendingFrames.size).toBe(1);
    f.engine.stop();expect(pendingFrames.size).toBe(0);
    flushFrames(performance.now()+100);vi.advanceTimersByTime(1000);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);
    f.engine.releaseDrag();f.engine.start();expect(pendingFrames.size).toBe(1);
    const alreadyDispatched=[...pendingFrames.values()][0];
    const updates=f.update.mock.calls.length,lifetime=f.engine.diagnostics().lifetime;
    f.engine.dispose();f.engine.dispose();expect(pendingFrames.size).toBe(0);
    alreadyDispatched(performance.now()+16); // Even an obsolete callback cannot resurrect a disposed engine.
    f.engine.renderFrame(0);f.engine.start();flushFrames(performance.now()+100);vi.advanceTimersByTime(1000);
    expect(f.renderer.render).toHaveBeenCalledTimes(1);expect(f.update).toHaveBeenCalledTimes(updates);
    expect(f.renderer.dispose).toHaveBeenCalledTimes(1);expect(f.dispose).toHaveBeenCalledTimes(1);
    expect(f.engine.diagnostics().lifetime.disposed).toBe(lifetime.disposed+1);
    expect(pendingFrames.size).toBe(0);
  });
});
