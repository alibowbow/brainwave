import * as T from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { HdrPipeline, type PostSettings } from '../shared/render/hdrPipeline';
import { FullscreenPass } from '../shared/render/targets';
import { loadCafeEnvironment } from './environment';
import { cafeFramebuffer, cafeTargetState, configureCafeTarget, preserveCafeReflectorState, requireCafeFramebuffer, restoreCafeTargetState, selectCafeTargetType, withCafeTargetState, type CafeTargetPreference } from './renderTargets';
import { LookSpring } from '../../liveScene/look';
import { buildCafe, cafeShot, type CafeInteraction } from './world';
import { cafeGlassShader, createCafeDepthVolume, createExteriorBokeh } from './glass';
import { bakeCafeProbes, type CafeProbes } from './probe';

export type CafePostPreference = 'auto' | 'off';

/** Warm interior, cool exterior: split-tone grade over the fitted ACES curve. */
export const CAFE_POST: Partial<PostSettings> = {
  exposure: 1.44,
  bloomStrength: .07,
  bloomThreshold: 0,
  aoStrength: .9,
  aoRadius: .32,
  saturation: 1.04,
  contrast: 1.06,
  shadowTint: [.95, .98, 1.06],
  highlightTint: [1.08, 1.0, .88],
  vignette: .38,
  grain: .03,
};

const KEY_INTENSITY = 5.2, LAMP_GLOW = 1.35, BOUNCE = .22, SHADE_EMISSIVE = 1.15;
const BULB = new T.Color('#ffd2a0').multiplyScalar(30);
const LAMP_TINT = new T.Color('#ffc58a');

/**
 * High-quality native-resolution renderer. No frame cap and no software-GPU
 * quality downgrade. Per frame: the scene without the glass into `target`
 * (refraction source, linear radiance plus depth), the exterior bokeh pass at
 * half resolution, then the full scene with the rain glass, either through the
 * shared HDR pipeline (half-float, AO, depth-of-field volume, bloom, grade) or
 * directly to the canvas when float targets are unavailable.
 */
export class CafeEngine {
  private readonly renderer:T.WebGLRenderer;
  private readonly camera=new T.PerspectiveCamera(45,1,.04,90);
  private readonly world=buildCafe();
  private readonly look=new LookSpring({yaw:.052,pitch:.027},{follow:.20,settle:1.35});
  private readonly raycaster=new T.Raycaster();
  private readonly target:T.WebGLRenderTarget;
  private readonly bokeh:T.WebGLRenderTarget;
  private readonly bokehMaterial:T.ShaderMaterial;
  private readonly pass=new FullscreenPass();
  private readonly capability:ReturnType<typeof selectCafeTargetType>;
  private targetChecks:ReturnType<typeof requireCafeFramebuffer>[]=[];
  private shadowTargets:Array<{label:string;target:T.WebGLRenderTarget}>=[];
  private targetFallbackReason:string|null=null;
  private readonly glass:Reflector;
  private environment:T.DataTexture|null=null;
  private probes:CafeProbes|null=null;
  private post:HdrPipeline|null=null;
  private volume:ReturnType<typeof createCafeDepthVolume>|null=null;
  private shot=cafeShot(0);
  private raf=0; private last=0;private ready=false;private disposed=false;private time=0;private width=1;private height=1;private ratio=1;
  private wipeAge=99;private cupPulse=0;private lampLevel=1;private lampTarget=1;
  private frames=0;
  private readonly lost=(event:Event)=>{event.preventDefault();this.onContextLost();};
  constructor(private readonly canvas:HTMLCanvasElement,private readonly onContextLost:()=>void,preference:CafeTargetPreference='auto',private readonly postPreference:CafePostPreference='auto') {
    this.renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=T.SRGBColorSpace;
    this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=CAFE_POST.exposure!;
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFShadowMap;
    this.renderer.shadowMap.autoUpdate=false;
    try { this.capability=selectCafeTargetType(this.renderer,preference); }
    catch(error){this.world.dispose();this.renderer.dispose();this.renderer.forceContextLoss();throw error;}
    this.target=configureCafeTarget(new T.WebGLRenderTarget(1,1,{depthBuffer:true}),this.capability.type);
    // Depth of the refraction pass: the bokeh pass and the drops use it to keep
    // only what lies beyond the glass. Sample-only, WebGL2 core.
    this.target.depthTexture=new T.DepthTexture(1,1,T.UnsignedIntType);
    // Mips let the bokeh gather read a pre-filtered source matched to its tap spacing.
    this.target.texture.generateMipmaps=true;this.target.texture.minFilter=T.LinearMipmapLinearFilter;
    this.bokeh=configureCafeTarget(new T.WebGLRenderTarget(1,1,{depthBuffer:false}),this.capability.type);
    this.bokehMaterial=createExteriorBokeh({glassZ:this.world.glass.z,lamps:this.world.exterior.lamps});
    this.bokehMaterial.uniforms.tColor.value=this.target.texture;
    this.bokehMaterial.uniforms.tDepth.value=this.target.depthTexture;
    // On a byte target highlights clip at 1; weight them more so discs still read.
    this.bokehMaterial.uniforms.uHighlightBoost.value=this.capability.type===T.HalfFloatType?.35:2.2;
    const g=this.world.glass;
    // Three's planar reflection utility provides correct moving perspective and oblique clipping.
    // Rain/refraction/condensation is an original shader; no reference-page source is used.
    // Reflector writes its `color` option into the shader's colour uniform (default 0x7F7F7F,
    // about .21 linear); the glass is a neutral transmitter, so pass white explicitly.
    this.glass=new Reflector(new T.PlaneGeometry(g.w,g.h),{color:0xffffff,textureWidth:512,textureHeight:512,multisample:0,clipBias:.003,shader:cafeGlassShader(new T.Vector2(g.w,g.h))});
    // Reflector's constructor creates a lazy HalfFloat target. Set its format
    // before setRenderTarget/initRenderTarget/any scene rendering can allocate it.
    configureCafeTarget(this.glass.getRenderTarget(),this.capability.type);
    preserveCafeReflectorState(this.glass);
    const u=this.glassUniforms;
    u.tSharp.value=this.target.texture;u.tSharpDepth.value=this.target.depthTexture;u.tBokeh.value=this.bokeh.texture;
    this.glass.position.set(g.x,g.y,g.z);this.world.scene.add(this.glass);this.glass.userData.interaction='window';this.world.interactables.push(this.glass);
    canvas.addEventListener('webglcontextlost',this.lost);
    canvas.dataset.engine='three-webgl2';canvas.dataset.lifecycle='created';
  }
  private get glassUniforms(){return (this.glass.material as T.ShaderMaterial).uniforms;}
  async init(){
    if(this.disposed)return;
    if(this.capability.type===T.HalfFloatType){
      // A code-generated probe of this café and its street (PMREM needs half-float targets).
      try{
        this.probes=withCafeTargetState(this.renderer,()=>bakeCafeProbes(this.renderer,{glass:this.world.glass,lamp:new T.Vector3(this.shot.lamp.x,this.shot.lamp.y+.39,this.shot.lamp.z),pendants:this.world.pendantPositions}));
      }catch{this.probes=null;}
    }
    if(this.probes){
      this.world.scene.environment=this.probes.room.texture;this.world.scene.environmentIntensity=1;
      this.world.exterior.setEnvironment(this.probes.street.texture);
    }else{
      let environment:T.DataTexture;
      try{environment=await loadCafeEnvironment();}catch(error){if(this.disposed)return;throw error;}
      if(this.disposed){environment.dispose();return;}
      // The baked RoomEnvironment is bright and neutral: keep it a dim fill so it
      // does not flatten the lamp-lit look on the byte path.
      this.environment=environment;this.world.scene.environment=environment;this.world.scene.environmentIntensity=.16;
    }
    if(this.disposed){this.probes?.dispose();this.probes=null;return;}
    // Match r186's actual PCF target: RGBA8 + depth comparison texture, no VSM
    // blur targets. Allocate/check each before the first shadow draw.
    const max=this.renderer.capabilities.maxTextureSize;
    this.world.shadowCasters.forEach((light,index)=>{
      const size=Math.min(index?1024:2048,max),shadow=light.shadow;
      shadow.mapSize.set(size,size);
      const target=configureCafeTarget(new T.WebGLRenderTarget(size,size),T.UnsignedByteType);
      target.depthTexture=new T.DepthTexture(size,size,T.UnsignedIntType);
      target.depthTexture.format=T.DepthFormat;target.depthTexture.compareFunction=T.LessEqualCompare;
      target.depthTexture.minFilter=target.depthTexture.magFilter=T.LinearFilter;
      shadow.map=target;this.shadowTargets.push({label:index?`pcf-shadow-${index}`:'pcf-shadow',target});
    });
    if(this.postPreference!=='off'&&this.capability.type===T.HalfFloatType){
      const lights=[...this.world.pendantPositions.map(position=>({position,color:new T.Color('#ffc98e'),strength:.0016})),{position:new T.Vector3(),color:LAMP_TINT.clone(),strength:.0009}];
      this.post=HdrPipeline.create(this.renderer,{settings:CAFE_POST,volume:()=>(this.volume=createCafeDepthVolume({color:this.target.texture,glass:this.world.glass,lights}))});
    }
    this.ready=true;this.setSize(this.width,this.height,this.ratio);this.renderer.shadowMap.needsUpdate=true;this.renderFrame(0);this.canvas.dataset.lifecycle='ready';
  }
  setSize(width:number,height:number,devicePixelRatio:number){
    this.width=Math.max(1,width);this.height=Math.max(1,height);this.ratio=Math.min(2,Math.max(1,devicePixelRatio));
    this.renderer.setPixelRatio(this.ratio);this.renderer.setSize(this.width,this.height,false);
    const pw=Math.round(this.width*this.ratio),ph=Math.round(this.height*this.ratio);
    this.target.setSize(pw,ph);
    this.bokeh.setSize(Math.max(1,Math.round(pw/2)),Math.max(1,Math.round(ph/2)));
    this.glass.getRenderTarget().setSize(Math.round(pw*.65),Math.round(ph*.65));
    this.glassUniforms.resolution.value.set(pw,ph);
    const b=this.bokehMaterial.uniforms;b.uSourceSize.value.set(pw,ph);b.uMaxRadius.value=Math.max(4,ph*.015);
    this.camera.aspect=this.width/this.height;this.renderer.shadowMap.needsUpdate=true;
    // Portrait keeps the near cup and table lamp together; wider views reveal the room to the right.
    const portrait=1-T.MathUtils.smoothstep(this.camera.aspect,.48,1.35);
    this.shot=this.world.arrange(portrait);
    this.camera.fov=this.shot.fov;this.camera.updateProjectionMatrix();
    if(this.ready){
      // Check real dimensions as well as the tiny capability probe. On a driver
      // allocation failure, discard HDR storage and select RGBA8 before reallocating.
      const scene=[[this.target,'refraction'],[this.bokeh,'bokeh'],[this.glass.getRenderTarget(),'reflection']] as const;
      const checks=scene.map(([target,label])=>cafeFramebuffer(this.renderer,target,label));
      if(this.capability.type===T.HalfFloatType&&checks.some(check=>!check.complete)){
        this.targetFallbackReason='HalfFloat framebuffer incomplete at scene dimensions';
        this.capability.type=T.UnsignedByteType;
        for(const [target] of scene){target.dispose();configureCafeTarget(target,T.UnsignedByteType);}
        // The pipeline relies on the same half-float storage; keep the direct path.
        this.post?.dispose();this.post=null;this.volume=null;
        this.bokehMaterial.uniforms.uHighlightBoost.value=2.2;
      }
      this.post?.setSize(this.width,this.height,this.ratio);
      this.targetChecks=[...scene.map(([target,label])=>requireCafeFramebuffer(this.renderer,target,label)),...this.shadowTargets.map(({target,label})=>requireCafeFramebuffer(this.renderer,target,label))];
      const env=this.probes?this.probes.room.texture:this.environment!,image=env.image as {width:number;height:number};
      this.canvas.dataset.targets=JSON.stringify({capability:this.capability,fallbackReason:this.targetFallbackReason,targets:this.targetChecks,environment:{kind:this.probes?'cafe-probe':'baked-cubeuv',type:env.type,internalFormat:env.internalFormat,mapping:env.mapping,width:image.width,height:image.height,runtimePmrem:!!this.probes}});
      this.canvas.dataset.post=this.post?JSON.stringify(this.post.report):'direct';
    }
  }
  renderFrame(dt:number){
    if(!this.ready||this.disposed)return;
    const step=Math.min(.05,Math.max(0,dt));this.time+=step;this.wipeAge+=step;this.look.update(step);
    this.cupPulse=Math.max(0,this.cupPulse-step*.4);this.lampLevel+= (this.lampTarget-this.lampLevel)*(1-Math.exp(-step*1.2));
    const w=this.world,level=this.lampLevel;
    w.update(this.time);
    w.steamUniforms.time.value=this.time;w.steamUniforms.pulse.value=this.cupPulse;
    w.steamUniforms.light.value.copy(LAMP_TINT).multiplyScalar(1.5*level);
    w.cup.rotation.z=Math.sin(this.time*3.0)*this.cupPulse*.012;
    w.key.intensity=KEY_INTENSITY*level;w.lampLight.intensity=LAMP_GLOW*level;w.bounce.intensity=BOUNCE*level;
    w.shadeMat.emissiveIntensity=SHADE_EMISSIVE*level;w.bulbMaterial.color.copy(BULB).multiplyScalar(level);
    const u=this.glassUniforms;
    u.time.value=this.time;u.wipeAge.value=this.wipeAge;
    u.lampPosition.value.copy(w.key.position);u.lampGlow.value.copy(LAMP_TINT).multiplyScalar(.28*level);
    if(this.volume){const lights=this.volume.uniforms.uLights.value as T.Vector4[];const last=lights[w.pendantPositions.length];last.set(w.key.position.x,w.key.position.y+.02,w.key.position.z,.0009*level);}
    this.camera.position.copy(this.shot.camera);
    this.camera.lookAt(this.shot.aim);this.camera.rotateY(this.look.yaw);this.camera.rotateX(this.look.pitch);this.camera.updateMatrixWorld();
    const b=this.bokehMaterial.uniforms;
    b.uInverseProjection.value.copy(this.camera.projectionMatrixInverse);b.uCameraWorld.value.copy(this.camera.matrixWorld);b.uTime.value=this.time;
    b.uViewProjection.value.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse);
    withCafeTargetState(this.renderer,()=>{
      try{
        this.glass.visible=false;this.renderer.setRenderTarget(this.target);this.renderer.render(w.scene,this.camera);
        this.pass.render(this.renderer,this.bokehMaterial,this.bokeh);
        this.glass.visible=true;
        if(this.post)this.post.render(w.scene,this.camera,this.time);
        else{this.renderer.setRenderTarget(null);this.renderer.render(w.scene,this.camera);}
      }finally{this.glass.visible=true;}
    });
    this.frames++;
    // Tiny read-only diagnostics support real lifecycle and WebGL verification in the isolated harness.
    this.canvas.dataset.frames=String(this.frames);this.canvas.dataset.time=this.time.toFixed(4);this.canvas.dataset.yaw=this.look.yaw.toFixed(5);
    this.canvas.dataset.cupPulse=this.cupPulse.toFixed(3);this.canvas.dataset.lamp=this.lampLevel.toFixed(3);this.canvas.dataset.wipeAge=this.wipeAge.toFixed(3);
    this.canvas.dataset.drawCalls=String(this.renderer.info.render.calls);this.canvas.dataset.triangles=String(this.renderer.info.render.triangles);
  }
  start(){if(this.raf||!this.ready||this.disposed)return;this.last=performance.now();this.canvas.dataset.running='true';
    const frame=(now:number)=>{if(this.disposed)return;this.renderFrame((now-this.last)/1000);this.last=now;this.raf=requestAnimationFrame(frame);};this.raf=requestAnimationFrame(frame);}
  stop(){cancelAnimationFrame(this.raf);this.raf=0;this.canvas.dataset.running='false';}
  drag(dx:number,dy:number){this.look.drag(dx,dy);}
  releaseDrag(){this.look.release();}
  interact(x:number,y:number):CafeInteraction|null {
    this.raycaster.setFromCamera(new T.Vector2(x*2-1,1-y*2),this.camera);
    const hit=this.raycaster.intersectObjects(this.world.interactables,false)[0];
    const kind=hit?.object.userData.interaction as CafeInteraction|undefined;
    if(kind==='window'&&hit.uv){this.glassUniforms.wipe.value.copy(hit.uv);this.wipeAge=0;}
    if(kind==='cup')this.cupPulse=1;
    if(kind==='lamp')this.lampTarget=this.lampTarget>.9?.78:1;
    return kind??null;
  }
  /** Harness-only: viewport-relative points (0..1) that land on each interactive object. */
  interactionPointsForQA(){
    // Start from each object's projected centre, then search outward with the
    // engine's own raycaster until the hit really is that object (never off-screen).
    const find=(kind:CafeInteraction,seed:T.Vector3)=>{
      const q=seed.clone().project(this.camera),sx=(q.x+1)/2,sy=(1-q.y)/2,pointer=new T.Vector2();
      for(let ring=0;ring<=24;ring++)for(let i=0,n=Math.max(1,ring*8);i<n;i++){
        const a=i/n*Math.PI*2,x=sx+Math.cos(a)*ring*.012,y=sy+Math.sin(a)*ring*.012;
        if(x<.03||x>.97||y<.03||y>.97)continue;
        this.raycaster.setFromCamera(pointer.set(x*2-1,1-y*2),this.camera);
        if(this.raycaster.intersectObjects(this.world.interactables,false)[0]?.object.userData.interaction===kind)return {x,y};
      }
      return {x:sx,y:sy};
    };
    const s=this.shot,g=this.world.glass,scale=s.lampScale;
    return {
      cup:find('cup',new T.Vector3(s.cup.x,s.cup.y+.07,s.cup.z+.04)),
      lamp:find('lamp',new T.Vector3(s.lamp.x,s.lamp.y+.43*scale,s.lamp.z+.12*scale)),
      window:find('window',new T.Vector3((s.cup.x+s.lamp.x)/2+.25,1.25,g.z)),
    };
  }
  /** Paused harness-only: move scene time forward (rain, steam, patrons) and draw one frame. */
  advanceForQA(seconds:number){
    if(this.raf||!this.ready)throw new Error('Advancing time requires a ready paused scene');
    const step=Math.max(0,Math.min(600,seconds));this.time+=step;this.wipeAge+=step;this.renderFrame(0);
    return {time:this.time};
  }
  /** Paused harness-only check of real GL target/face/mip restoration. */
  verifyTargetStateForQA(){
    if(this.raf||!this.ready)throw new Error('Target-state check requires a ready paused scene');
    const saved=cafeTargetState(this.renderer),probe=new T.WebGLCubeRenderTarget(16,{type:T.UnsignedByteType,depthBuffer:false,generateMipmaps:true,minFilter:T.LinearMipmapLinearFilter});
    const matches=()=>this.renderer.getRenderTarget()===probe&&this.renderer.getActiveCubeFace()===4&&this.renderer.getActiveMipmapLevel()===1;
    try{
      this.renderer.setRenderTarget(probe,4,1);
      const gl=this.renderer.getContext();if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw new Error('QA cube mip framebuffer incomplete');
      requireCafeFramebuffer(this.renderer,this.target,'state-probe');const probeRestored=matches();
      this.renderer.render(this.world.scene,this.camera);const reflectorRestored=matches();
      this.renderFrame(0);const frameRestored=matches();
      return {face:4,mip:1,probeRestored,reflectorRestored,frameRestored,glError:gl.getError()};
    }finally{restoreCafeTargetState(this.renderer,saved);probe.dispose();}
  }
  dispose(){if(this.disposed)return;this.stop();this.disposed=true;this.canvas.removeEventListener('webglcontextlost',this.lost);
    this.post?.dispose();this.post=null;this.volume=null;
    this.pass.dispose();this.bokehMaterial.dispose();this.bokeh.dispose();
    this.glass.dispose();this.target.depthTexture?.dispose();this.target.dispose();
    this.environment?.dispose();this.probes?.dispose();this.probes=null;
    this.world.dispose();this.renderer.dispose();this.renderer.forceContextLoss();this.canvas.dataset.lifecycle='disposed';}
}
