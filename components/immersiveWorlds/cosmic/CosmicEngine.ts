import * as THREE from 'three';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import { HdrPipeline, type PostSettings } from '../shared/render/hdrPipeline';
import { createCosmicSky, COSMIC_PLANET_CENTER, COSMIC_SUN_COLOR, COSMIC_SUN_DIRECTION, COSMIC_SUN_IRRADIANCE } from './sky';
import { createGarden, seededRandom, COSMIC_DETAIL_LAYER } from './garden';
import { createDustVolume, type DustVolume } from './spaceDust';
import { prepareCosmicReflection, type CosmicReflectionMode } from './reflectionTarget';
import { createCosmicQualityState, advanceCosmicQuality, cosmicPostTier } from './qualityPolicy';

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

// The isolated harness can request the direct (pre-pipeline) path for QA comparisons.
let directPreferred=false;
export function preferDirectCosmicRendering(value:boolean){directPreferred=value;}

/** Shared HDR pipeline look: one star key, soft bloom on emissive sources, cool shadows. */
export const COSMIC_POST:Partial<PostSettings>={
  exposure:1.3,bloomStrength:.085,bloomThreshold:0,aoStrength:.8,aoRadius:.55,
  saturation:1.03,contrast:1.07,shadowTint:[.90,.96,1.10],highlightTint:[1.06,1.0,.91],vignette:.42,grain:.022,
};

export class CosmicEngine implements LiveSceneEngine {
  private renderer:THREE.WebGLRenderer;
  private scene=new THREE.Scene();
  private camera=new THREE.PerspectiveCamera(52,1,.1,300);
  private sky:ReturnType<typeof createCosmicSky>|null=null;
  private garden:ReturnType<typeof createGarden>|null=null;
  private post:HdrPipeline|null=null;
  private dust:DustVolume|null=null;
  private lightSeeds:THREE.Points|null=null;
  private seedLocations:THREE.Vector3[]=[];
  private pointUniforms:{[key:string]:THREE.IUniform}|null=null;
  private pulseLight=new THREE.PointLight('#9fe3d2',0,4.5,2);
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
  private qualityState=createCosmicQualityState();
  private reflection:ReturnType<typeof prepareCosmicReflection>|null=null;
  private ray=new THREE.Raycaster();
  private look=new LookSpring({yaw:.105,pitch:.06},{follow:.7,settle:3.2});
  private originalQuaternion=new THREE.Quaternion();
  private onLost:(event:Event)=>void;

  static isSupported(){return typeof window!=='undefined' && typeof WebGL2RenderingContext!=='undefined';}

  constructor(private options:{canvas:HTMLCanvasElement;onContextLost:()=>void;reflectionMode?:CosmicReflectionMode}){
    this.renderer=new THREE.WebGLRenderer({canvas:options.canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=COSMIC_POST.exposure!;
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFShadowMap;
    this.renderer.shadowMap.autoUpdate=false;
    this.renderer.setClearColor('#000000');
    this.camera.position.set(0,1.65,5.8);
    this.camera.lookAt(0,2.0,-20);
    this.camera.layers.enable(COSMIC_DETAIL_LAYER);
    this.ray.layers.enableAll();
    this.originalQuaternion.copy(this.camera.quaternion);
    this.onLost=(event)=>{event.preventDefault();if(!this.disposed)this.options.onContextLost();};
    options.canvas.addEventListener('webglcontextlost',this.onLost);
    options.canvas.dataset.renderer='three-webgl2';
  }

  async init(){
    if(this.disposed)return;
    this.sky=createCosmicSky();this.garden=createGarden({noise:this.sky.noise});
    // Reflector has not rendered/allocated yet. Choose a legal format and check
    // its actual framebuffer before compileAsync or the first reflection draw.
    this.reflection=prepareCosmicReflection(this.renderer,this.garden.water.getRenderTarget(),this.options.reflectionMode);
    this.scene.add(this.sky.group,this.garden.group);
    this.garden.setAspect(this.width/this.height);this.sky.group.rotation.y=this.width/this.height<.8?.18:0;
    // One-off bakes: nebula cube (half float) and band albedo; the nebula also
    // becomes the image-based ambient light, so shadowed faces take its colour.
    const environment=this.sky.prepare(this.renderer);
    if(environment){this.scene.environment=environment;this.scene.environmentIntensity=1.4;}
    else this.scene.add(new THREE.HemisphereLight('#4b5a7a','#1b1a24',.35));
    // One dominant key: the star. Shadow map covers the seated terrace.
    const key=new THREE.DirectionalLight(COSMIC_SUN_COLOR,COSMIC_SUN_IRRADIANCE);
    key.position.copy(COSMIC_SUN_DIRECTION).multiplyScalar(40).add(new THREE.Vector3(0,0,-1));
    key.target.position.set(0,0,-1);key.castShadow=true;
    key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-11;key.shadow.camera.right=11;
    key.shadow.camera.top=11;key.shadow.camera.bottom=-11;key.shadow.camera.near=10;key.shadow.camera.far=75;
    key.shadow.normalBias=.04;key.shadow.bias=-.0003;this.scene.add(key,key.target);
    // Coloured bounce from the sunlit side of the gas giant; no flat fill.
    const bounce=new THREE.DirectionalLight(new THREE.Color(.95,.76,.55),.5);
    bounce.position.copy(COSMIC_PLANET_CENTER).normalize().multiplyScalar(30);this.scene.add(bounce,this.pulseLight);
    this.buildSeeds();this.scene.updateMatrixWorld(true);
    if(!directPreferred){
      const sky=this.sky;
      this.post=HdrPipeline.create(this.renderer,{settings:COSMIC_POST,volume:()=>{
        this.dust=createDustVolume({noise:sky.noise,sun:COSMIC_SUN_DIRECTION,sunColor:COSMIC_SUN_COLOR.clone().multiply(new THREE.Color(.86,.92,1.0)).multiplyScalar(.030*COSMIC_SUN_IRRADIANCE),
          ambient:new THREE.Color(.006,.008,.014),density:.016,maxDistance:95});
        return this.dust;
      }});
    }
    this.applyPostTier();
    this.post?.setSize(this.width,this.height,this.renderer.getPixelRatio());
    this.garden.setPostActive(!!this.post);
    // Without the volume pass, a little aerial perspective keeps depth readable.
    if(!this.post)this.scene.fog=new THREE.FogExp2(new THREE.Color(.010,.012,.022),.0065);
    this.options.canvas.dataset.post=this.post?JSON.stringify(this.post.report):'direct';
    this.renderer.shadowMap.needsUpdate=true;
    // compileAsync can be cancelled safely by disposal after a rapid route change.
    await this.renderer.compileAsync(this.scene,this.camera);
    if(this.disposed)return;
    this.ready=true;this.renderFrame(0);
  }

  /** The reduced quality tier drops AO and shortens the dust march. */
  private applyPostTier(){
    const tier=cosmicPostTier(this.qualityState.quality);
    if(this.post)this.post.settings.aoStrength=tier.ao?COSMIC_POST.aoStrength!:0;
    this.dust?.setSteps(tier.volumeSteps);
  }

  private buildSeeds(){
    const random=seededRandom(312);const positions:number[]=[],phases:number[]=[],sizes:number[]=[],warmth:number[]=[];
    for(let i=0;i<90;i++){
      const p=new THREE.Vector3((random()-.5)*14,.35+random()*5.2,2.2-random()*20);
      this.seedLocations.push(p);positions.push(p.x,p.y,p.z);phases.push(random()*Math.PI*2);sizes.push(10+random()*16);warmth.push(random()<.7?1:0);
    }
    // A reachable light for keyboard and portrait view, quietly floating above the basin.
    this.seedLocations[0].set(.65,1.15,-1.2);positions.splice(0,3,.65,1.15,-1.2);
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geo.setAttribute('aPhase',new THREE.Float32BufferAttribute(phases,1));geo.setAttribute('aSize',new THREE.Float32BufferAttribute(sizes,1));
    geo.setAttribute('aWarm',new THREE.Float32BufferAttribute(warmth,1));
    this.pointUniforms={uTime:{value:0},uDpr:{value:1},uPulse:{value:new THREE.Vector3(0,0,0)},uAge:{value:20}};
    const mat=new THREE.ShaderMaterial({uniforms:this.pointUniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      vertexShader:`attribute float aPhase;attribute float aSize;attribute float aWarm;uniform float uTime;uniform float uDpr;uniform vec3 uPulse;uniform float uAge;
      varying float vGlow;varying vec3 vColor;
      void main(){vec3 p=position;p.x+=sin(uTime*.07+aPhase)*.12;p.y+=sin(uTime*.11+aPhase*1.3)*.075;p.z+=cos(uTime*.05+aPhase)*.09;
      float influence=exp(-distance(p,uPulse)*1.4)*sin(clamp(uAge/8.,0.,1.)*3.14159);
      float breath=.72+.28*sin(uTime*.23+aPhase*2.);
      vec4 view=modelViewMatrix*vec4(p,1.);float near=1.-smoothstep(9.,22.,-view.z);
      vGlow=(.42*breath+influence*1.8)*(.25+.75*near);vColor=mix(vec3(.78,.93,1.0),vec3(1.0,.78,.48),aWarm);
      gl_PointSize=clamp(aSize*uDpr*3.2/-view.z,2.,15.*uDpr);gl_Position=projectionMatrix*view;}`,
      fragmentShader:`varying float vGlow;varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);float mask=1.-smoothstep(.36,.5,d);
      vec3 c=vColor*vGlow*(exp(-d*d*48.)*1.6+exp(-d*d*11.)*.26);gl_FragColor=vec4(c,mask);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`
    });
    this.lightSeeds=new THREE.Points(geo,mat);this.lightSeeds.name='cosmic-near-light-seeds';this.scene.add(this.lightSeeds);
  }

  setSize(width:number,height:number,dpr:number){
    if(this.disposed)return;
    this.width=Math.max(1,width);this.height=Math.max(1,height);this.dpr=dpr;
    this.renderer.setPixelRatio(cosmicPixelRatio(this.width,this.height,dpr,this.qualityState.quality));
    this.renderer.setSize(this.width,this.height,false);
    this.post?.setSize(this.width,this.height,this.renderer.getPixelRatio());
    if(this.post)this.options.canvas.dataset.post=JSON.stringify(this.post.report);
    this.camera.aspect=this.width/this.height;
    this.garden?.setAspect(this.camera.aspect);if(this.sky)this.sky.group.rotation.y=this.camera.aspect<.8?.18:0;
    this.renderer.shadowMap.needsUpdate=true;
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
    this.pulseLight.intensity=envelope*1.2;
    if(this.pulse && this.pulse.age>=8)this.pulse=null;
    this.sky?.update(this.time);this.garden?.update(this.time,this.pulse);
    if(this.dust&&this.garden){this.garden.writeOccluders(this.dust.occluders);this.garden.writeMist(this.dust.mist);}
    if(this.pointUniforms){this.pointUniforms.uTime.value=this.time;this.pointUniforms.uAge.value=this.pulse?.age??20;if(this.pulse)this.pointUniforms.uPulse.value.copy(this.pulse.position);}
    if(this.post)this.post.render(this.scene,this.camera,this.time);
    else this.renderer.render(this.scene,this.camera);
    const data=this.options.canvas.dataset;
    data.frame=String(this.frame);data.time=this.time.toFixed(4);data.yaw=this.look.yaw.toFixed(5);data.pitch=this.look.pitch.toFixed(5);
    data.pulses=String(this.pulseCount);data.drawCalls=String(this.renderer.info.render.calls);data.triangles=String(this.renderer.info.render.triangles);
    data.ringShadowError=String(this.sky?.getShadowState().centerError??-1);
    const reflection=this.reflection?.getDiagnostics();
    data.reflectionFormat=reflection?.format??'uninitialized';
    data.reflectionComplete=String(reflection?.framebufferComplete??false);
    data.reflectionSize=String(reflection?.width??0);
    data.quality=String(this.qualityState.quality);
  }

  private tick=(now:number)=>{
    if(!this.running||this.disposed)return;
    const rawDt=this.lastFrame?(now-this.lastFrame)/1000:0;this.lastFrame=now;
    this.renderFrame(rawDt);
    // Accumulating/decaying frame pressure, not consecutive slow time. Pausing
    // retains the chosen quality and counters; only a new engine resets them.
    const previousQuality=this.qualityState.quality;
    this.qualityState=advanceCosmicQuality(this.qualityState,rawDt);
    if(this.qualityState.quality!==previousQuality){
      this.reflection?.setSize(this.qualityState.reflectionSize);
      this.applyPostTier();
      this.setSize(this.width,this.height,this.dpr);
    }
    this.raf=requestAnimationFrame(this.tick);
  };
  start(){if(this.running||this.disposed||!this.ready)return;this.running=true;this.lastFrame=0;this.options.canvas.dataset.running='true';this.raf=requestAnimationFrame(this.tick);}
  stop(){this.running=false;cancelAnimationFrame(this.raf);this.raf=0;this.lastFrame=0;this.look.release();this.options.canvas.dataset.running='false';}
  drag(dx:number,dy:number){if(this.running)this.look.drag(dx,dy);}
  releaseDrag(){this.look.release();}

  getDiagnostics(){return{reflection:this.reflection?.getDiagnostics()??null,shadow:this.sky?.getShadowState()??null,quality:{...this.qualityState},post:this.post?{...this.post.report}:null};}

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
    this.post?.dispose();this.post=null;this.dust=null;
    this.scene.environment=null;
    this.garden?.dispose();this.sky?.dispose();this.garden=null;this.sky=null;this.reflection=null;
    if(this.lightSeeds){this.lightSeeds.geometry.dispose();(this.lightSeeds.material as THREE.Material).dispose();this.lightSeeds=null;}
    this.scene.traverse(o=>{if(o instanceof THREE.Light && 'shadow' in o)(o as THREE.DirectionalLight).shadow?.dispose();});
    this.scene.clear();this.renderer.renderLists.dispose();this.renderer.dispose();this.renderer.forceContextLoss();
    this.options.canvas.dataset.disposed='true';
  }
}
