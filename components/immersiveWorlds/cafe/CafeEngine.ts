import * as T from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { LookSpring } from '../../liveScene/look';
import { buildCafe, type CafeInteraction } from './world';

/** High-quality native-resolution renderer. No frame cap and no software-GPU quality downgrade. */
export class CafeEngine {
  private readonly renderer:T.WebGLRenderer;
  private readonly camera=new T.PerspectiveCamera(45,1,.04,80);
  private readonly world=buildCafe();
  private readonly look=new LookSpring({yaw:.052,pitch:.027},{follow:.20,settle:1.35});
  private readonly raycaster=new T.Raycaster();
  private readonly target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:true});
  private readonly glass:Reflector;
  private readonly environment:T.WebGLRenderTarget;
  private raf=0; private last=0;private ready=false;private disposed=false;private time=0;private width=1;private height=1;private ratio=1;
  private wipeAge=99;private cupPulse=0;private lampLevel=1;private lampTarget=1;
  private frames=0;
  private readonly lost=(event:Event)=>{event.preventDefault();this.onContextLost();};
  constructor(private readonly canvas:HTMLCanvasElement,private readonly onContextLost:()=>void) {
    this.renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=T.SRGBColorSpace;
    this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.02;
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate=false;
    const environmentScene=new RoomEnvironment();const pmrem=new T.PMREMGenerator(this.renderer);
    this.environment=pmrem.fromScene(environmentScene,.035);this.world.scene.environment=this.environment.texture;this.world.scene.environmentIntensity=.27;environmentScene.dispose();pmrem.dispose();
    const g=this.world.glass;
    // Three's planar reflection utility provides correct moving perspective and oblique clipping.
    // Rain/refraction below is an original shader; no reference-page source is used.
    this.glass=new Reflector(new T.PlaneGeometry(g.w,g.h),{textureWidth:512,textureHeight:512,multisample:0,clipBias:.003,shader:{
      name:'CafeRainGlass',uniforms:{color:{value:new T.Color('#e5eced')},tDiffuse:{value:null},textureMatrix:{value:new T.Matrix4()},sceneColor:{value:null},resolution:{value:new T.Vector2(1,1)},time:{value:0},wipe:{value:new T.Vector2(-2,-2)},wipeAge:{value:99}},
      vertexShader:`varying vec2 vUv;varying vec4 vReflect;uniform mat4 textureMatrix;void main(){vUv=uv;vReflect=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`uniform sampler2D tDiffuse,sceneColor;uniform vec2 resolution,wipe;uniform float time,wipeAge;varying vec2 vUv;varying vec4 vReflect;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      vec4 drops(vec2 uv,vec2 grid,float speed){vec2 p=uv*grid;vec2 id=floor(p);float h=hash(vec2(id.x,2.));p.y+=time*speed*(.3+h);id=floor(p);vec2 q=fract(p)-.5;h=hash(id);q.x-=(h-.5)*.62;q.y-=(hash(id+7.)-.5)*.44;float r=.075+.11*hash(id+8.);vec2 n=q/vec2(r,r*(1.05+speed*3.));float d=length(n);float body=1.-smoothstep(.72,1.,d);float keep=step(.55,h);float trail=exp(-abs(q.x)*230.)*smoothstep(.02,.08,q.y)*(1.-smoothstep(.08,.5,q.y))*step(.01,speed)*.15;float rim=smoothstep(.66,.84,d)*(1.-smoothstep(.84,1.05,d))*keep;return vec4(n*body*.006*keep,(body+trail)*keep,rim);}
      vec3 blurred(vec2 uv,float radius){vec2 px=radius/resolution;vec3 c=texture2D(sceneColor,uv).rgb*.24;c+=texture2D(sceneColor,uv+vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(px.x,0)).rgb*.12;c+=texture2D(sceneColor,uv+vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv-vec2(0,px.y)).rgb*.12;c+=texture2D(sceneColor,uv+px*.7).rgb*.07;c+=texture2D(sceneColor,uv-px*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(-px.x,px.y)*.7).rgb*.07;c+=texture2D(sceneColor,uv+vec2(px.x,-px.y)*.7).rgb*.07;return c;}
      void main(){vec4 a=drops(vUv,vec2(81.,47.),0.);vec4 b=drops(vUv+vec2(.12,.34),vec2(29.,18.),.095);vec4 beads=drops(vUv+.37,vec2(137.,83.),0.);vec2 shift=a.xy+b.xy+beads.xy*.24;vec2 screen=gl_FragCoord.xy/resolution;float water=clamp(a.z+b.z+beads.z*.3,0.,1.);float edge=pow(abs(vUv.x-.5)*2.,3.)*.065+pow(1.-vUv.y,4.)*.065;vec2 wipeDelta=(vUv-wipe)*vec2(1.8,1.);float clearPatch=exp(-dot(wipeDelta,wipeDelta)/.016)*exp(-wipeAge*.075);float fog=edge*(1.-clearPatch);vec3 outside=blurred(clamp(screen+shift,vec2(.01),vec2(.99)),mix(3.4,1.,water)+fog*26.);vec2 mirror=vReflect.xy/vReflect.w+shift*.3;vec3 inside=texture2D(tDiffuse,mirror).rgb;vec3 c=mix(outside,inside,.035+edge*.15);c=mix(c,vec3(.17,.22,.25),fog);c*=1.-(a.w+b.w)*.12;c+=vec3(.58,.66,.69)*max(0.,-shift.y)*7.;c+=vec3(.7,.78,.81)*pow(max(0.,shift.y)*150.,3.)*.055;gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>}`,

    }});
    (this.glass.material as T.ShaderMaterial).uniforms.sceneColor.value=this.target.texture;
    this.glass.position.set(g.x,g.y,g.z);this.world.scene.add(this.glass);this.glass.userData.interaction='window';this.world.interactables.push(this.glass);
    canvas.addEventListener('webglcontextlost',this.lost);
    canvas.dataset.engine='three-webgl2';canvas.dataset.lifecycle='created';
  }
  async init(){if(this.disposed)return;this.ready=true;this.setSize(this.width,this.height,this.ratio);this.renderer.shadowMap.needsUpdate=true;this.renderFrame(0);this.canvas.dataset.lifecycle='ready';}
  setSize(width:number,height:number,devicePixelRatio:number){
    this.width=Math.max(1,width);this.height=Math.max(1,height);this.ratio=Math.min(2,Math.max(1,devicePixelRatio));
    this.renderer.setPixelRatio(this.ratio);this.renderer.setSize(this.width,this.height,false);
    this.target.setSize(Math.round(this.width*this.ratio),Math.round(this.height*this.ratio));
    this.glass.getRenderTarget().setSize(Math.round(this.width*this.ratio*.65),Math.round(this.height*this.ratio*.65));
    const shader=this.glass.material as T.ShaderMaterial;shader.uniforms.resolution.value.set(this.width*this.ratio,this.height*this.ratio);
    this.camera.aspect=this.width/this.height;this.renderer.shadowMap.needsUpdate=true;
    // Portrait keeps the near cup and table lamp together; wider views reveal the room to the right.
    this.camera.fov=43+7*(1-T.MathUtils.smoothstep(this.camera.aspect,.48,1.35));this.camera.updateProjectionMatrix();
  }
  renderFrame(dt:number){
    if(!this.ready||this.disposed)return;
    const step=Math.min(.05,Math.max(0,dt));this.time+=step;this.wipeAge+=step;this.look.update(step);
    this.cupPulse=Math.max(0,this.cupPulse-step*.4);this.lampLevel+= (this.lampTarget-this.lampLevel)*(1-Math.exp(-step*1.2));
    this.world.steamUniforms.time.value=this.time;this.world.steamUniforms.pulse.value=this.cupPulse;
    this.world.cup.rotation.z=Math.sin(this.time*3.0)*this.cupPulse*.006;
    this.world.lampLight.intensity=2.6*this.lampLevel;this.world.shadeMat.emissiveIntensity=.24*this.lampLevel;
    (this.glass.material as T.ShaderMaterial).uniforms.time.value=this.time;
    (this.glass.material as T.ShaderMaterial).uniforms.wipeAge.value=this.wipeAge;
    const portrait=1-T.MathUtils.smoothstep(this.camera.aspect,.48,1.35);
    this.camera.position.set(T.MathUtils.lerp(.10,-.70,portrait),T.MathUtils.lerp(1.53,1.44,portrait),T.MathUtils.lerp(3.50,3.12,portrait));
    const aim=new T.Vector3(T.MathUtils.lerp(-.40,-1.35,portrait),1.30,-1.7);
    this.world.cup.position.x=this.world.saucer.position.x=this.world.steam.position.x=this.world.cupContact.position.x=T.MathUtils.lerp(-.64,-.93,portrait);
    this.world.lamp.position.x=this.world.lampLight.position.x=this.world.key.position.x=this.world.lampContact.position.x=T.MathUtils.lerp(-1.15,-1.29,portrait);
    this.world.key.target.position.x=this.world.cup.position.x+.16;
    this.world.lamp.scale.setScalar(T.MathUtils.lerp(1,.8,portrait));
    this.camera.lookAt(aim);this.camera.rotateY(this.look.yaw);this.camera.rotateX(this.look.pitch);this.camera.updateMatrixWorld();
    this.glass.visible=false;this.renderer.setRenderTarget(this.target);this.renderer.render(this.world.scene,this.camera);
    this.glass.visible=true;this.renderer.setRenderTarget(null);this.renderer.render(this.world.scene,this.camera);
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
    if(kind==='window'&&hit.uv){(this.glass.material as T.ShaderMaterial).uniforms.wipe.value.copy(hit.uv);this.wipeAge=0;}
    if(kind==='cup')this.cupPulse=1;
    if(kind==='lamp')this.lampTarget=this.lampTarget>.9?.78:1;
    return kind??null;
  }
  dispose(){if(this.disposed)return;this.stop();this.disposed=true;this.canvas.removeEventListener('webglcontextlost',this.lost);this.glass.dispose();this.target.dispose();this.environment.dispose();this.world.dispose();this.renderer.dispose();this.renderer.forceContextLoss();this.canvas.dataset.lifecycle='disposed';}
}
