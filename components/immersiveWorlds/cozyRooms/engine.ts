import * as THREE from 'three';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import type { CozyWorldId, WorldBuild, WorldFactory } from './contracts';

let serial=0;
const lifetime={created:0,disposed:0};
const retired:Array<Record<string,unknown>>=[];
export class CozyEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private world: WorldBuild | null=null;
  private raf=0; private time=8; private last=0; private dead=false;
  private look=new THREE.Vector2(); private aim=new THREE.Vector2();
  private rotation=new THREE.Quaternion();
  private rendererSize=new THREE.Vector2();
  private staticFrameCurrent=false;
  private gl:WebGL2RenderingContext;
  private sync:WebGLSync|null=null;
  private syncRevision=0;
  private image={requestedRevision:0,submittedRevision:0,completedRevision:0,requestedAt:0,submittedAt:0,completedAt:0};
  private pendingDt:number|null=null;
  private requestedSize:{width:number;height:number;dpr:number}|null=null;
  private sizeDirty=false;
  private poll:ReturnType<typeof setTimeout>|null=null;
  private animating=false;
  private submitting=false;
  private initialCall=false;
  private requestedFrame=false;
  private failure:string|null=null;
  private gpu={submitted:0,returned:0,completed:0,polls:0,timeouts:0,maxInFlight:0,lastSubmit:0,lastComplete:0,lastWait:'none',phase:'constructed'};
  private phases={constructorStart:performance.now(),constructorEnd:0,factoryStart:0,factoryEnd:0,initEnd:0,firstRenderStart:0,firstRenderEnd:0,disposeStart:0,disposeEnd:0};
  private cleanupErrors:string[]=[];
  private frames=0; private aspect=1;private taps=0;private lastHit='none';
  private ray=new THREE.Raycaster();
  readonly instance=++serial;
  constructor(private canvas:HTMLCanvasElement, private factory:WorldFactory, private onLost:()=>void) {
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.gl=this.renderer.getContext() as WebGL2RenderingContext;
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.12;
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.canvas.addEventListener('webglcontextlost',this.contextLost);
    if(typeof document!=='undefined')document.addEventListener?.('visibilitychange',this.visibilityChanged);
    this.phases.constructorEnd=performance.now();
    lifetime.created++;
  }
  private contextLost=(event:Event)=>{event.preventDefault();this.fail(new Error('Cozy WebGL context lost'),!this.initialCall);};
  async init(){
    if(this.dead||this.failure)return;
    try{
      this.gpu.phase='factory';this.phases.factoryStart=performance.now();this.requestImage();this.world=this.factory();this.phases.factoryEnd=performance.now();
      this.gpu.phase='init';this.world.resize(this.aspect);this.rotation.copy(this.world.camera.quaternion);this.world.update(this.time,0);
      this.gpu.phase='initialized';this.phases.initEnd=performance.now();
    }catch(error){this.fail(error,false);throw error;}
  }
  setSize(width:number,height:number,dpr:number){
    if(this.dead||this.failure)return;
    const w=Math.max(1,width),h=Math.max(1,height),ratio=Math.min(2,Math.max(1,dpr));
    this.aspect=w/h;
    const previous=this.requestedSize;
    if(!previous||previous.width!==w||previous.height!==h||previous.dpr!==ratio){
      this.requestedSize={width:w,height:h,dpr:ratio};this.sizeDirty=true;this.requestImage();
    }
    // Defer backing-buffer resets as well as draws until the previous batch
    // completes. The latest size is applied atomically with its required frame.
  }
  private requestImage(zeroTime=true){
    this.staticFrameCurrent=false;this.image.requestedRevision++;this.image.requestedAt=performance.now();
    if(zeroTime)this.pendingDt=0;
    if(this.requestedFrame&&this.world)this.schedulePoll();
  }
  private applySize(){
    if(!this.requestedSize||!this.sizeDirty)return;
    const {width:w,height:h,dpr:ratio}=this.requestedSize;
    // Three r186 setPixelRatio already calls setSize, and setSize rewrites the
    // backing buffer even for identical values. Keep real resize/DPR changes,
    // but do not reset it again on same-size holder/ResizeObserver callbacks.
    if(this.renderer.getPixelRatio()!==ratio){this.staticFrameCurrent=false;this.renderer.setPixelRatio(ratio);}
    this.renderer.getSize(this.rendererSize);
    if(this.rendererSize.x!==w||this.rendererSize.y!==h){this.staticFrameCurrent=false;this.renderer.setSize(w,h,false);}
    if(this.world){this.world.resize(this.aspect);this.world.camera.aspect=this.aspect;this.world.camera.updateProjectionMatrix();this.rotation.copy(this.world.camera.quaternion);}
    this.sizeDirty=false;
  }
  renderFrame(dt:number){
    if(!this.world||this.dead||this.failure)return;
    // A delayed same-size ResizeObserver can request the frame just submitted
    // by attachTop. Skip only a settled, unchanged zero-delta frame. The first
    // zero after animation still updates (sleep uses it to settle its state).
    if(dt===0&&this.staticFrameCurrent&&this.image.requestedRevision===this.image.submittedRevision&&this.look.x===0&&this.look.y===0&&this.aim.x===0&&this.aim.y===0)return;
    if(dt===0&&this.image.requestedRevision===this.image.submittedRevision)this.requestImage();
    // There is one latest request, never a queue of simulation steps. A required
    // static update wins over animation; world/time are untouched while blocked.
    if(this.pendingDt!==0)this.pendingDt=Math.min(.05,Math.max(0,dt));
    if(this.submitting)return;
    this.initialCall=!this.requestedFrame;this.requestedFrame=true;
    try{this.submitPending();}catch(error){
      this.fail(error,!this.initialCall);
      // The old shared host has no identity guard after its first renderFrame.
      // Initial errors throw to its promise catch, without a reentrant callback
      // that could publish failed and then be overwritten with ready.
      throw error;
    }finally{this.initialCall=false;}
  }
  private visible(){return this.canvas.isConnected!==false&&(typeof document==='undefined'||!document.hidden);}
  private clearPoll(){if(this.poll!==null){clearTimeout(this.poll);this.poll=null;}}
  private deleteFence(){const sync=this.sync;this.sync=null;this.syncRevision=0;if(sync)this.gl.deleteSync(sync);}
  private assertUsable(){if(this.dead||this.failure||this.gl.isContextLost())throw new Error(this.failure??'Cozy WebGL context lost or engine disposed');}
  private batchComplete(){
    this.assertUsable();
    if(!this.sync)return true;
    const status=this.gl.clientWaitSync(this.sync,0,0);this.gpu.polls++;
    this.assertUsable();
    if(status===this.gl.ALREADY_SIGNALED||status===this.gl.CONDITION_SATISFIED){
      this.gpu.lastWait=status===this.gl.ALREADY_SIGNALED?'ALREADY_SIGNALED':'CONDITION_SATISFIED';
      const revision=this.syncRevision;
      this.deleteFence();this.assertUsable();this.gpu.completed++;this.gpu.lastComplete=performance.now();
      if(revision>this.image.completedRevision){this.image.completedRevision=revision;this.image.completedAt=this.gpu.lastComplete;}
      return true;
    }
    if(status===this.gl.TIMEOUT_EXPIRED){
      this.gpu.lastWait='TIMEOUT_EXPIRED';this.gpu.timeouts++;
      if(performance.now()-this.gpu.lastSubmit>=120000)throw new Error('Cozy GPU batch incomplete after 120000 ms');
      return false;
    }
    this.gpu.lastWait=status===this.gl.WAIT_FAILED?'WAIT_FAILED':`unexpected ${status}`;
    throw new Error(`Cozy GPU fence ${this.gpu.lastWait}`);
  }
  private schedulePoll(){
    if(this.poll!==null||this.animating||this.dead||this.failure||(this.pendingDt===null&&!this.sync)||!this.visible())return;
    this.poll=setTimeout(()=>{
      this.poll=null;
      if(this.dead||this.failure||!this.visible())return;
      try{this.submitPending();}catch(error){this.fail(error);}
    },16);
  }
  private submitPending(){
    if(!this.world||!this.visible())return;
    if(!this.batchComplete()){this.schedulePoll();return;}
    this.clearPoll();
    // Observe the last submitted frame even when no redraw is pending. Fence
    // acknowledgment never updates world time or submits an extra frame.
    if(this.pendingDt===null)return;
    const delta=this.pendingDt;this.pendingDt=null;
    const revision=this.image.requestedRevision;
    this.applySize();
    this.assertUsable();
    this.staticFrameCurrent=false;
    this.time+=delta;
    this.look.lerp(this.aim,delta===0?1:1-Math.exp(-delta*5));
    this.world.update(this.time,delta);
    this.world.camera.quaternion.copy(this.rotation).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(this.look.y,this.look.x,0,'YXZ')));
    this.gpu.phase='render';this.gpu.submitted++;
    this.gpu.maxInFlight=Math.max(this.gpu.maxInFlight,this.gpu.submitted-this.gpu.completed);
    if(this.gpu.submitted===1)this.phases.firstRenderStart=performance.now();
    this.submitting=true;
    try{
      this.renderer.render(this.world.scene,this.world.camera);this.gpu.returned++;
      if(this.gpu.submitted===1)this.phases.firstRenderEnd=performance.now();
      if(this.dead||this.failure||this.gl.isContextLost())throw new Error(this.failure??'Cozy engine lost during render');
      this.gpu.lastSubmit=performance.now();this.gpu.phase='fence';
      const sync=this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE,0);
      if(!sync)throw new Error('Cozy GPU fenceSync returned null');
      if(this.dead||this.failure){this.gl.deleteSync(sync);throw new Error(this.failure??'Cozy engine disposed during fence creation');}
      this.sync=sync;this.gl.flush();
      if(this.dead||this.failure||this.gl.isContextLost())throw new Error(this.failure??'Cozy WebGL context lost after submission');
      this.syncRevision=revision;
      if(revision>this.image.submittedRevision){this.image.submittedRevision=revision;this.image.submittedAt=performance.now();}
    }finally{this.submitting=false;}
    this.frames++;this.canvas.dataset.frames=String(this.frames);this.canvas.dataset.instance=String(this.instance);
    this.staticFrameCurrent=delta===0;this.gpu.phase='submitted';
    this.schedulePoll();
  }
  private fail(error:unknown,notify=true){
    if(this.failure||this.dead)return;
    this.failure=error instanceof Error?error.message:String(error);this.gpu.phase='failed';
    this.animating=false;cancelAnimationFrame(this.raf);this.raf=0;this.last=0;this.clearPoll();this.pendingDt=null;this.staticFrameCurrent=false;
    try{this.deleteFence();}catch{/* Keep the original failure; never reuse this engine. */}
    if(notify)this.onLost();
  }
  private visibilityChanged=()=>{
    if(!this.visible()){this.clearPoll();cancelAnimationFrame(this.raf);this.raf=0;this.last=0;return;}
    this.last=performance.now();this.scheduleAnimation();this.schedulePoll();
  };
  private scheduleAnimation(){
    if(this.raf||!this.animating||this.dead||this.failure||!this.visible())return;
    this.raf=requestAnimationFrame(now=>{
      this.raf=0;if(!this.animating||this.dead||this.failure||!this.visible())return;
      const before=this.frames;
      try{this.renderFrame((now-this.last)/1000);}catch{return;}
      if(this.frames!==before)this.last=now;
      this.scheduleAnimation();
    });
  }
  start(){if(this.animating||this.dead||this.failure)return;this.animating=true;this.clearPoll();this.last=performance.now();this.scheduleAnimation();}
  stop(){
    this.animating=false;cancelAnimationFrame(this.raf);this.raf=0;this.last=0;this.clearPoll();
    // No unsubmitted animation state was applied. Freeze the last drawn time,
    // while retaining a genuine resize/input/holder request at exactly dt=0.
    if(this.sizeDirty||this.image.requestedRevision>this.image.submittedRevision)this.pendingDt=0;
    else if(this.pendingDt!==0)this.pendingDt=null;
    this.schedulePoll();
  }
  drag(dx:number,dy:number){if(!this.dead&&!this.failure)this.aim.set(THREE.MathUtils.clamp(-dx*.22,-.18,.18),THREE.MathUtils.clamp(-dy*.17,-.11,.11));}
  releaseDrag(){
    if(this.dead||this.failure)return;
    this.aim.set(0,0);this.requestImage(!this.animating);
  }
  interact(action:string){if(this.dead||this.failure)return null;const event=this.world?.interact(action);if(event){this.requestImage();this.renderFrame(0);return {...event,intensity:THREE.MathUtils.clamp(event.intensity,0,.35)};}return null;}
  tap(clientX:number,clientY:number){
    if(!this.world)return null;this.taps++;this.lastHit='none';
    const rect=this.canvas.getBoundingClientRect();
    this.ray.setFromCamera(new THREE.Vector2((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1),this.world.camera);
    const hits=this.ray.intersectObjects(this.world.scene.children,true);
    for(const hit of hits){let object:THREE.Object3D|null=hit.object;while(object){if(typeof object.userData.cozyAction==='string'){this.lastHit=object.userData.cozyAction;return this.interact(object.userData.cozyAction);}object=object.parent;}
      // Non-interactive opaque objects genuinely occlude objects behind them.
      const materials=(hit.object as THREE.Mesh).material;const m=Array.isArray(materials)?materials[hit.face?.materialIndex??0]:materials;if(m&&!m.transparent){this.lastHit='occluded:'+hit.object.type;break;}
    }return null;
  }
  diagnostics(){const targets:Array<{action:string;x:number;y:number;z:number}>=[];if(this.world){this.world.scene.updateMatrixWorld(true);this.world.scene.traverse(o=>{if(o.userData.cozyAction){const p=o.getWorldPosition(new THREE.Vector3()).project(this.world!.camera);targets.push({action:o.userData.cozyAction,x:(p.x+1)/2,y:(1-p.y)/2,z:p.z});}});}return {instance:this.instance,taps:this.taps,lastHit:this.lastHit,frames:this.frames,time:this.time,running:!!this.raf,image:this.imageSnapshot(),gpu:this.gpuSnapshot(),phases:{...this.phases},targets,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,memory:{...this.renderer.info.memory},lifetime:{...lifetime}};}
  private imageSnapshot(){return {...this.image,dirty:this.image.requestedRevision>this.image.submittedRevision,awaitingCompletion:this.image.submittedRevision>this.image.completedRevision,sizeDirty:this.sizeDirty};}
  private gpuSnapshot(){return {...this.gpu,inFlight:this.sync?1:0,unconfirmed:this.gpu.submitted-this.gpu.completed,pending:this.pendingDt,pollScheduled:this.poll!==null,failure:this.failure,cleanupErrors:[...this.cleanupErrors]};}
  dispose(){
    if(this.dead)return;
    this.phases.disposeStart=performance.now();this.dead=true;
    const clean=(action:()=>void)=>{try{action();}catch(error){this.cleanupErrors.push(error instanceof Error?error.message:String(error));}};
    // Cleanup is best-effort per resource: one throwing disposer must not strand
    // the renderer, fence, listeners or shared host's engine/canvas references.
    clean(()=>this.stop());this.pendingDt=null;this.clearPoll();
    clean(()=>this.deleteFence());
    clean(()=>this.canvas.removeEventListener('webglcontextlost',this.contextLost));
    if(typeof document!=='undefined')clean(()=>document.removeEventListener?.('visibilitychange',this.visibilityChanged));
    const world=this.world;this.world=null;
    if(world){
      const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
      clean(()=>world.scene.traverse(o=>{
        if(o instanceof THREE.InstancedMesh)clean(()=>o.dispose());
        if(o instanceof THREE.Light&&'shadow' in o)clean(()=>(o as THREE.DirectionalLight).shadow?.dispose());
        const mesh=o as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);
        if(mesh.material)for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material])materials.add(material);
      }));
      for(const material of materials){
        for(const value of Object.values(material))if(value instanceof THREE.Texture)textures.add(value);
        if(material instanceof THREE.ShaderMaterial)for(const uniform of Object.values(material.uniforms))if(uniform.value instanceof THREE.Texture)textures.add(uniform.value);
      }
      for(const texture of [world.scene.background,world.scene.environment])if(texture instanceof THREE.Texture)textures.add(texture);
      textures.forEach(texture=>clean(()=>texture.dispose()));geometries.forEach(geometry=>clean(()=>geometry.dispose()));materials.forEach(material=>clean(()=>material.dispose()));
      clean(()=>world.dispose?.());
    }
    clean(()=>this.renderer.dispose());lifetime.disposed++;
    this.phases.disposeEnd=performance.now();this.gpu.phase='disposed';
    retired.push({instance:this.instance,frames:this.frames,time:this.time,image:this.imageSnapshot(),gpu:this.gpuSnapshot(),phases:{...this.phases}});
    if(retired.length>8)retired.shift();
    // deleteSync/resource disposal do not establish GPU completion or physical
    // reclamation. No forced context loss; detached contexts belong to browser GC.
  }

}
class CozyHost extends LiveSceneHost<CozyEngine>{
  tap(holder:LiveSceneHolder,x:number,y:number){return this.top===holder?this.engine?.tap(x,y):null;}
  action(holder:LiveSceneHolder,action:string){return this.top===holder?this.engine?.interact(action):null;}
  inspect(){return {...(this.engine?.diagnostics()??{lifetime:{...lifetime},disposed:true}),status:this.status,retired:[...retired]};}
}
const hosts=new Map<CozyWorldId,CozyHost>();
export function cozyHost(id:CozyWorldId,factory:WorldFactory){let host=hosts.get(id);if(!host){host=new CozyHost({canvasClass:'cozy-world-canvas',isSupported:()=>typeof window!=='undefined'&&!!window.WebGLRenderingContext,create:(canvas,onLost)=>new CozyEngine(canvas,factory,onLost)});hosts.set(id,host);}return host;}
/** QA introspection, never schedules work or creates a renderer. */
export function inspectCozyWorld(id:CozyWorldId){return hosts.get(id)?.inspect()??null;}
