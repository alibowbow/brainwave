import * as THREE from 'three';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import type { CozyWorldId, WorldBuild, WorldFactory } from './contracts';

let serial=0;
const lifetime={created:0,disposed:0};
export class CozyEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private world: WorldBuild | null=null;
  private raf=0; private time=8; private last=0; private dead=false;
  private look=new THREE.Vector2(); private aim=new THREE.Vector2();
  private rotation=new THREE.Quaternion();
  private frames=0; private aspect=1;
  private ray=new THREE.Raycaster();
  readonly instance=++serial;
  constructor(private canvas:HTMLCanvasElement, private factory:WorldFactory, private onLost:()=>void) {
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.12;
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.canvas.addEventListener('webglcontextlost',this.contextLost);
    lifetime.created++;
  }
  private contextLost=(event:Event)=>{event.preventDefault();this.onLost();};
  async init(){this.world=this.factory();this.world.resize(this.aspect);this.rotation.copy(this.world.camera.quaternion);this.world.update(this.time,0);}
  setSize(width:number,height:number,dpr:number){
    this.aspect=Math.max(1,width)/Math.max(1,height);
    this.renderer.setPixelRatio(Math.min(2,Math.max(1,dpr)));
    this.renderer.setSize(Math.max(1,width),Math.max(1,height),false);
    if(this.world){this.world.resize(this.aspect);this.world.camera.aspect=this.aspect;this.world.camera.updateProjectionMatrix();this.rotation.copy(this.world.camera.quaternion);}
  }
  renderFrame(dt:number){
    if(!this.world||this.dead)return;
    const delta=Math.min(.05,Math.max(0,dt)); this.time+=delta;
    this.look.lerp(this.aim,delta===0?1:1-Math.exp(-delta*5));
    this.world.update(this.time,delta);
    this.world.camera.quaternion.copy(this.rotation).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(this.look.y,this.look.x,0,'YXZ')));
    this.renderer.render(this.world.scene,this.world.camera);
    this.frames++;this.canvas.dataset.frames=String(this.frames);this.canvas.dataset.instance=String(this.instance);
  }
  start(){if(this.raf||this.dead)return;this.last=performance.now();const frame=(now:number)=>{this.raf=0;if(this.dead)return;this.renderFrame((now-this.last)/1000);this.last=now;this.raf=requestAnimationFrame(frame);};this.raf=requestAnimationFrame(frame);}
  stop(){cancelAnimationFrame(this.raf);this.raf=0;this.last=0;}
  drag(dx:number,dy:number){this.aim.set(THREE.MathUtils.clamp(-dx*.22,-.18,.18),THREE.MathUtils.clamp(-dy*.17,-.11,.11));}
  releaseDrag(){this.aim.set(0,0);}
  interact(action:string){const event=this.world?.interact(action);if(event){this.renderFrame(0);return {...event,intensity:THREE.MathUtils.clamp(event.intensity,0,.35)};}return null;}
  tap(clientX:number,clientY:number){
    if(!this.world)return null;
    const rect=this.canvas.getBoundingClientRect();
    this.ray.setFromCamera(new THREE.Vector2((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1),this.world.camera);
    const hits=this.ray.intersectObjects(this.world.scene.children,true);
    for(const hit of hits){let object:THREE.Object3D|null=hit.object;while(object){if(typeof object.userData.cozyAction==='string')return this.interact(object.userData.cozyAction);object=object.parent;}
      // Non-interactive opaque objects genuinely occlude objects behind them.
      const materials=(hit.object as THREE.Mesh).material;const m=Array.isArray(materials)?materials[hit.face?.materialIndex??0]:materials;if(m&&!m.transparent)break;
    }return null;
  }
  diagnostics(){const targets:Array<{action:string;x:number;y:number;z:number}>=[];if(this.world){this.world.scene.updateMatrixWorld(true);this.world.scene.traverse(o=>{if(o.userData.cozyAction){const p=o.getWorldPosition(new THREE.Vector3()).project(this.world!.camera);targets.push({action:o.userData.cozyAction,x:(p.x+1)/2,y:(1-p.y)/2,z:p.z});}});}return {instance:this.instance,frames:this.frames,time:this.time,running:!!this.raf,targets,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,memory:{...this.renderer.info.memory},lifetime:{...lifetime}};}
  dispose(){if(this.dead)return;this.dead=true;this.stop();this.canvas.removeEventListener('webglcontextlost',this.contextLost);if(this.world){const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();this.world.scene.traverse(o=>{if(o instanceof THREE.InstancedMesh)o.dispose();if(o instanceof THREE.Light&&'shadow' in o)(o as THREE.DirectionalLight).shadow?.dispose();const m=o as THREE.Mesh;if(m.geometry)geometries.add(m.geometry);if(m.material){for(const material of Array.isArray(m.material)?m.material:[m.material])materials.add(material);}});for(const material of materials){for(const value of Object.values(material))if(value instanceof THREE.Texture)textures.add(value);if(material instanceof THREE.ShaderMaterial)for(const u of Object.values(material.uniforms))if(u.value instanceof THREE.Texture)textures.add(u.value);}for(const t of [this.world.scene.background,this.world.scene.environment])if(t instanceof THREE.Texture)textures.add(t);textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());this.world.dispose?.();this.world=null;}this.renderer.dispose();lifetime.disposed++;
    // dispose frees GPU resources. The detached canvas/context is left to the
    // browser: synchronous WEBGL_lose_context can stall SwiftShader indefinitely.
}
}
class CozyHost extends LiveSceneHost<CozyEngine>{
  tap(holder:LiveSceneHolder,x:number,y:number){return this.top===holder?this.engine?.tap(x,y):null;}
  action(holder:LiveSceneHolder,action:string){return this.top===holder?this.engine?.interact(action):null;}
  inspect(){return this.engine?.diagnostics()??{lifetime:{...lifetime},disposed:true};}
}
const hosts=new Map<CozyWorldId,CozyHost>();
export function cozyHost(id:CozyWorldId,factory:WorldFactory){let host=hosts.get(id);if(!host){host=new CozyHost({canvasClass:'cozy-world-canvas',isSupported:()=>typeof window!=='undefined'&&!!window.WebGLRenderingContext,create:(canvas,onLost)=>new CozyEngine(canvas,factory,onLost)});hosts.set(id,host);}return host;}
/** QA introspection, never schedules work or creates a renderer. */
export function inspectCozyWorld(id:CozyWorldId){return hosts.get(id)?.inspect()??null;}
