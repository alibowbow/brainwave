import * as THREE from 'three';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import { createCosmicSky } from './sky';
import { createGarden, seededRandom } from './garden';

export interface CosmicTouch {
  kind: 'plant' | 'light' | 'water';
  position: readonly [number, number, number];
  strength: number;
}

/** High quality first, with measured sustained-pressure adaptation, never an FPS cap. */
export function cosmicPixelRatio(width:number,height:number,dpr:number,quality=1) {
  const area=Math.max(1,width*height);
  return Math.min(Math.max(.5,dpr),2,Math.sqrt(3_600_000/area))*quality;
}

export class CosmicEngine implements LiveSceneEngine {
  private renderer:THREE.WebGLRenderer;
  private scene=new THREE.Scene();
  private camera=new THREE.PerspectiveCamera(52,1,.1,300);
  private sky:ReturnType<typeof createCosmicSky>|null=null;
  private garden:ReturnType<typeof createGarden>|null=null;
  private lightSeeds:THREE.Points|null=null;
  private seedLocations:THREE.Vector3[]=[];
  private pointUniforms:{[key:string]:THREE.IUniform}|null=null;
  private pulseLight=new THREE.PointLight('#accfd0',0,4,2);
  private pulse:{position:THREE.Vector3;age:number}|null=null;
  private pulseCount=0;
  private lastPulse=-10;
  private time=0;
  private frame=0;
  private running=false;
  private disposed=false;
  private ready=false;
  private raf=0;
  private lastFrame=0;
  private width=1;private height=1;private dpr=1;
  private quality=1;private slowFor=0;private fastFor=0;
  private ray=new THREE.Raycaster();
  private look=new LookSpring({yaw:.105,pitch:.06},{follow:.7,settle:3.2});
  private originalQuaternion=new THREE.Quaternion();
  private onLost:(event:Event)=>void;

  static isSupported(){return typeof window!=='undefined' && typeof WebGL2RenderingContext!=='undefined';}

  constructor(private options:{canvas:HTMLCanvasElement;onContextLost:()=>void}){
    this.renderer=new THREE.WebGLRenderer({canvas:options.canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.12;
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate=false;
    this.renderer.setClearColor('#101a2b');
    this.camera.position.set(0,1.65,5.8);
    this.camera.lookAt(0,2.0,-20);
    this.originalQuaternion.copy(this.camera.quaternion);
    this.onLost=(event)=>{event.preventDefault();if(!this.disposed)this.options.onContextLost();};
    options.canvas.addEventListener('webglcontextlost',this.onLost);
    options.canvas.dataset.renderer='three-webgl2';
  }

  async init(){
    if(this.disposed)return;
    this.sky=createCosmicSky();this.garden=createGarden();this.scene.add(this.sky.group,this.garden.group);
    const hemi=new THREE.HemisphereLight('#b9d6e1','#394147',2.05);this.scene.add(hemi);
    this.scene.fog=new THREE.FogExp2('#344b5b',.009);
    const key=new THREE.DirectionalLight('#ffddb0',3.5);key.position.set(-7,12,8);key.castShadow=true;
    key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-14;key.shadow.camera.right=14;
    key.shadow.camera.top=15;key.shadow.camera.bottom=-14;key.shadow.camera.near=.5;key.shadow.camera.far=60;
    key.shadow.normalBias=.06;key.shadow.bias=-.0002;this.scene.add(key);
    const rim=new THREE.DirectionalLight('#88d9e8',1.8);rim.position.set(6,5,-12);this.scene.add(rim);
    const warm=new THREE.PointLight('#e7c896',20,10,2);warm.position.set(-3,2.8,.3);this.scene.add(warm,this.pulseLight);
    this.buildSeeds();this.scene.updateMatrixWorld(true);
    this.renderer.shadowMap.needsUpdate=true;
    // compileAsync can be cancelled safely by disposal after a rapid route change.
    await this.renderer.compileAsync(this.scene,this.camera);
    if(this.disposed)return;
    this.ready=true;this.renderFrame(0);
  }

  private buildSeeds(){
    const random=seededRandom(312);const positions:number[]=[],phases:number[]=[],sizes:number[]=[];
    for(let i=0;i<70;i++){
      const p=new THREE.Vector3((random()-.5)*13,.45+random()*5,2-random()*19);
      this.seedLocations.push(p);positions.push(p.x,p.y,p.z);phases.push(random()*Math.PI*2);sizes.push(13+random()*17);
    }
    // A reachable light for keyboard and portrait view, quietly floating above the basin.
    this.seedLocations[0].set(.65,1.15,-1.2);positions.splice(0,3,.65,1.15,-1.2);
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geo.setAttribute('aPhase',new THREE.Float32BufferAttribute(phases,1));geo.setAttribute('aSize',new THREE.Float32BufferAttribute(sizes,1));
    this.pointUniforms={uTime:{value:0},uDpr:{value:1},uPulse:{value:new THREE.Vector3(0,0,0)},uAge:{value:20}};
    const mat=new THREE.ShaderMaterial({uniforms:this.pointUniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      vertexShader:`attribute float aPhase;attribute float aSize;uniform float uTime;uniform float uDpr;uniform vec3 uPulse;uniform float uAge;varying float vGlow;
      void main(){vec3 p=position;p.x+=sin(uTime*.07+aPhase)*.1;p.y+=sin(uTime*.11+aPhase)*.065;
      float influence=exp(-distance(p,uPulse)*1.4)*sin(clamp(uAge/8.,0.,1.)*3.14159);
      vGlow=.45+influence*.4;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(aSize*uDpr*4./-mv.z,2.,21.*uDpr);gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`varying float vGlow;void main(){float d=length(gl_PointCoord-.5);float a=(exp(-d*d*40.)*.8+exp(-d*d*9.)*.16)*(1.-smoothstep(.3,.5,d));gl_FragColor=vec4(vec3(.61,.85,.82),a*vGlow);#include <tonemapping_fragment>\n#include <colorspace_fragment>}`.replace(';#include',';\n#include')
    });
    this.lightSeeds=new THREE.Points(geo,mat);this.lightSeeds.name='cosmic-near-light-seeds';this.scene.add(this.lightSeeds);
  }

  setSize(width:number,height:number,dpr:number){
    if(this.disposed)return;
    this.width=Math.max(1,width);this.height=Math.max(1,height);this.dpr=dpr;
    this.renderer.setPixelRatio(cosmicPixelRatio(this.width,this.height,dpr,this.quality));
    this.renderer.setSize(this.width,this.height,false);
    this.camera.aspect=this.width/this.height;
    this.camera.fov=this.camera.aspect<.8?63:52;
    // Portrait keeps the pond and overhead planet together, without orbiting away from the seat.
    this.camera.position.set(0,1.65,5.8);
    this.camera.lookAt(this.camera.aspect<.8?1.0:0,this.camera.aspect<.8?3.4:2.0,-20);
    this.originalQuaternion.copy(this.camera.quaternion);this.camera.updateProjectionMatrix();
    if(this.pointUniforms)this.pointUniforms.uDpr.value=this.renderer.getPixelRatio();
    this.options.canvas.dataset.dpr=this.renderer.getPixelRatio().toFixed(3);
  }

  renderFrame(dt:number){
    if(this.disposed || !this.ready)return;
    const safeDt=Math.min(Math.max(dt,0),.05);
    this.time+=safeDt;this.frame++;this.look.update(safeDt);
    this.camera.quaternion.copy(this.originalQuaternion);
    this.camera.rotateY(this.look.yaw);this.camera.rotateX(this.look.pitch);
    if(this.pulse)this.pulse.age+=safeDt;
    const envelope=this.pulse?Math.sin(Math.min(1,this.pulse.age/8)*Math.PI):0;
    this.pulseLight.intensity=envelope*.5;
    if(this.pulse && this.pulse.age>=8)this.pulse=null;
    this.sky?.update(this.time);this.garden?.update(this.time,this.pulse);
    if(this.pointUniforms){this.pointUniforms.uTime.value=this.time;this.pointUniforms.uAge.value=this.pulse?.age??20;if(this.pulse)this.pointUniforms.uPulse.value.copy(this.pulse.position);}
    this.renderer.render(this.scene,this.camera);
    const data=this.options.canvas.dataset;
    data.frame=String(this.frame);data.time=this.time.toFixed(4);data.yaw=this.look.yaw.toFixed(5);data.pitch=this.look.pitch.toFixed(5);
    data.pulses=String(this.pulseCount);data.drawCalls=String(this.renderer.info.render.calls);data.triangles=String(this.renderer.info.render.triangles);
  }

  private tick=(now:number)=>{
    if(!this.running||this.disposed)return;
    const rawDt=this.lastFrame?(now-this.lastFrame)/1000:0;this.lastFrame=now;
    this.renderFrame(rawDt);
    // Only sustained measured overload reduces resolution. 0.8 remains the minimum;
    // static/reduced-motion views retain the latest frame at native requested quality.
    if(rawDt>.034 && rawDt<.5){this.slowFor+=rawDt;this.fastFor=0;}else if(rawDt>0 && rawDt<.022){this.fastFor+=rawDt;this.slowFor=Math.max(0,this.slowFor-rawDt);}
    if(this.slowFor>8 && this.quality> .8){this.quality=.8;this.slowFor=0;this.garden?.setReflectionSize(768);this.setSize(this.width,this.height,this.dpr);}
    if(this.fastFor>24 && this.quality<1){this.quality=1;this.fastFor=0;this.garden?.setReflectionSize(1024);this.setSize(this.width,this.height,this.dpr);}
    this.raf=requestAnimationFrame(this.tick);
  };
  start(){if(this.running||this.disposed||!this.ready)return;this.running=true;this.lastFrame=0;this.options.canvas.dataset.running='true';this.raf=requestAnimationFrame(this.tick);}
  stop(){this.running=false;cancelAnimationFrame(this.raf);this.raf=0;this.lastFrame=0;this.look.release();this.options.canvas.dataset.running='false';}
  drag(dx:number,dy:number){if(this.running)this.look.drag(dx,dy);}
  releaseDrag(){this.look.release();}

  touch(x:number,y:number):CosmicTouch|null{
    if(!this.running||!this.garden||this.time-this.lastPulse<1.2)return null;
    this.ray.setFromCamera(new THREE.Vector2(x,y),this.camera);
    const hit=this.ray.intersectObjects(this.garden.interactables,false).find(h=>h.distance<18);
    if(hit)return this.emitPulse(hit.point,hit.object===this.garden.water?'water':'plant');
    const seed=this.seedLocations.find(p=>this.ray.ray.distanceToPoint(p)<.4 && this.ray.ray.direction.dot(p.clone().sub(this.camera.position))>0);
    return seed?this.emitPulse(seed,'light'):null;
  }
  touchNearest(){return this.running?this.emitPulse(this.seedLocations[0],'light'):null;}
  soundEvent(){if(this.running&&this.time-this.lastPulse>12)this.emitPulse(this.seedLocations[0],'light');}
  private emitPulse(position:THREE.Vector3,kind:CosmicTouch['kind']):CosmicTouch|null{
    if(this.time-this.lastPulse<1.2)return null;
    this.lastPulse=this.time;this.pulse={position:position.clone(),age:0};this.pulseCount++;
    this.pulseLight.position.copy(position).add(new THREE.Vector3(0,.2,0));
    return{kind,position:[position.x,position.y,position.z],strength:.35};
  }

  dispose(){
    if(this.disposed)return;this.stop();this.disposed=true;this.ready=false;
    this.options.canvas.removeEventListener('webglcontextlost',this.onLost);
    this.garden?.dispose();this.sky?.dispose();this.garden=null;this.sky=null;
    if(this.lightSeeds){this.lightSeeds.geometry.dispose();(this.lightSeeds.material as THREE.Material).dispose();this.lightSeeds=null;}
    this.scene.traverse(o=>{if(o instanceof THREE.Light && 'shadow' in o)(o as THREE.DirectionalLight).shadow?.dispose();});
    this.scene.clear();this.renderer.renderLists.dispose();this.renderer.dispose();this.renderer.forceContextLoss();
    this.options.canvas.dataset.disposed='true';
  }
}
