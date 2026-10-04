import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import type { ForestInteraction } from './forestHost';
import { createForestMaterials, createTree, createFern, createBroadleafPlant } from './botany';
import { forestRandom, groundHeight, pondRadius, forestPixelRatio, FOREST_LOOK, FOREST_FEEL } from './forestMath';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

/** Original, seated eye-height woodland. All geometry and maps are generated locally. */
export class ForestEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(55, 1, 0.06, 120);
  private look = new LookSpring(FOREST_LOOK, FOREST_FEEL);
  private rng = forestRandom();
  private clock = { value: 0 };
  private time = 0;
  private frame = 0;
  private request = 0;
  private last = 0;
  private running = false;
  private disposed = false;
  private ready = false;
  private reflection!: Reflector;
  private waterUniforms!: Record<string, THREE.IUniform>;
  private plants: THREE.Group[] = [];
  private birds: THREE.Group[] = [];
  private leafHitTime = -20;
  private leafHit: THREE.Group | null = null;
  private raycaster = new THREE.Raycaster();
  private onInteraction?: (event: ForestInteraction) => void;
  private resources: { dispose(): void }[] = [];
  private onLost: (event: Event) => void;

  constructor(private canvas: HTMLCanvasElement, onContextLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    // Count both the planar reflection pass and the main pass honestly.
    this.renderer.info.autoReset = false;
    this.onLost = (event) => { event.preventDefault(); this.stop(); onContextLost(); };
    canvas.addEventListener('webglcontextlost', this.onLost);
    canvas.dataset.frames = '0';
    canvas.dataset.time = '0';
    canvas.dataset.waterHits = '0';
    canvas.dataset.leafHits = '0';
  }

  async init() {
    this.buildWorld();
    this.ready = true;
    this.renderer.shadowMap.needsUpdate = true;
    // Async compilation leaves React responsive while drivers prepare shaders.
    try { await this.renderer.compileAsync(this.scene, this.camera); }
    catch (error) { if (!this.disposed) throw error; }
  }

  private buildWorld() {
    const random = this.rng;
    const materials = createForestMaterials();
    this.scene.background = new THREE.Color('#b5c7a7');
    this.scene.fog = new THREE.Fog('#bccab0', 10, 72);
    this.camera.position.set(0, 1.42, 5.0);
    this.camera.lookAt(0, 1.65, -9);

    this.scene.add(new THREE.HemisphereLight('#e2eed4', '#646447', 2.05));
    const sun = new THREE.DirectionalLight('#fff1c9', 3.8);
    sun.position.set(8, 13, -18);
    sun.target.position.set(-2, 0, 1);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -17, right: 17, top: 21, bottom: -17, near: 1, far: 65 });
    sun.shadow.bias = -0.00035; sun.shadow.normalBias = 0.035;
    this.scene.add(sun, sun.target);
    const fill = new THREE.DirectionalLight('#bcdad4', 0.58);
    fill.position.set(-8, 5, 6); this.scene.add(fill);

    // A real sky dome is visible between crowns and provides the wet-leaf environment.
    const skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { sun: { value: V(8, 13, -18).normalize() } },
      vertexShader: 'varying vec3 vDir; void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: `varying vec3 vDir; uniform vec3 sun; void main(){vec3 d=normalize(vDir);float h=max(0.,d.y);vec3 c=mix(vec3(.72,.77,.59),vec3(.39,.64,.70),pow(h,.7));float s=max(0.,dot(d,sun));c+=vec3(1.,.82,.46)*pow(s,32.)*.65+vec3(1.,.94,.72)*pow(s,700.)*2.;gl_FragColor=vec4(c,1.);#include <tonemapping_fragment>\n#include <colorspace_fragment>}`.replace(';#include', ';\n#include'),
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(90, 24, 16), skyMaterial); this.scene.add(sky);
    const envScene = new THREE.Scene();
    envScene.add(new THREE.Mesh(new THREE.SphereGeometry(30, 24, 16), skyMaterial));
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const environment = pmrem.fromScene(envScene, 0.05, 0.1, 80);
    this.scene.environment = environment.texture; this.scene.environmentIntensity = 0.55;
    this.resources.push(environment); pmrem.dispose();
    (envScene.children[0] as THREE.Mesh).geometry.dispose();

    const ground = new THREE.PlaneGeometry(115, 115, 150, 150);
    ground.rotateX(-Math.PI / 2); ground.translate(0, 0, -32);
    const gp = ground.attributes.position;
    const colors: number[] = [];
    for (let i = 0; i < gp.count; i++) {
      const x = gp.getX(i), z = gp.getZ(i); gp.setY(i, groundHeight(x, z));
      const moss = (Math.sin(x * 0.72 + z * 0.23) + Math.sin(z * 0.9 - x * .23)) * .25 + .5;
      const c = new THREE.Color().lerpColors(new THREE.Color('#60523b'), new THREE.Color('#5f7233'), moss);
      if (pondRadius(x, z) < 1) c.lerp(new THREE.Color('#3c4538'), .55);
      colors.push(c.r, c.g, c.b);
    }
    ground.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); ground.computeVertexNormals();
    const groundMat = materials.ground.clone(); groundMat.color.set('#ffffff'); groundMat.vertexColors = true;
    const floor = new THREE.Mesh(ground, groundMat); floor.receiveShadow = true; this.scene.add(floor);

    const treeLayout = [
      [-3.7, -0.2, 13, .60], [3.85, -1.8, 14, .67], [-6.3, -5.8, 16, .63], [5.9, -8, 15, .61],
      [-2.8, -9.8, 13.5, .41], [1.7, -12.6, 15.6, .40], [-7.8, -14, 16, .47], [8.2, -15, 17, .6],
      [-4.7, -19, 17, .50], [4.8, -23, 18, .48], [-.9, -25, 17, .43], [-10, -25, 19, .55],
      [11, -28, 18, .51], [-7, -32, 18, .47], [2.3, -35, 19, .43], [-3.5, -40, 21, .5],
      [8, -43, 22, .50], [-14, -38, 22, .61], [16, -41, 22, .65], [-10, -52, 22, .4],
      [.7, -53, 23, .37], [5, -62, 24, .41], [-7, -67, 24, .44], [15, -59, 23, .46],
    ];
    for (let i = 0; i < treeLayout.length; i++) {
      const [x, z, height, radius] = treeLayout[i];
      const tree = createTree(materials, random, { height, radius, detail: i < 5 ? 'near' : i < 12 ? 'mid' : 'far' });
      tree.position.set(x, groundHeight(x, z), z); tree.rotation.y = random() * Math.PI * 2;
      this.scene.add(tree);
    }

    // Root-level leaves move in independent low-amplitude breezes, never cycling seasons.
    materials.leaf.onBeforeCompile = (shader) => {
      shader.uniforms.forestTime = this.clock;
      shader.vertexShader = 'uniform float forestTime;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        vec4 windOrigin=vec4(position,1.);
        #ifdef USE_INSTANCING
          windOrigin=instanceMatrix*windOrigin;
        #endif
        windOrigin=modelMatrix*windOrigin;
        float phase=windOrigin.x*.61+windOrigin.z*.42;
        transformed.x+=sin(forestTime*.63+phase)*.012;
        transformed.z+=sin(forestTime*.47+phase*1.7)*.009;`);
    };
    materials.leaf.customProgramCacheKey = () => 'forest-leaf-wind-v1';

    this.addRocks(materials.rock);
    this.addWater();

    for (let i = 0; i < 36; i++) {
      const angle = random() * Math.PI * 2;
      const distance = 3.7 + random() * 12;
      const x = Math.cos(angle) * distance, z = Math.sin(angle) * distance - 5;
      if (z > 3 || pondRadius(x, z) < 1.1) continue;
      const fern = createFern(materials, random, .65 + random() * .9);
      fern.position.set(x, groundHeight(x,z) + .015, z); fern.rotation.y = random() * 6.28;
      this.scene.add(fern);
    }
    // Large, physically near leaves frame the sitting place without blocking the pool.
    for (const [x,z,s] of [[-1.65,3.22,1.10],[1.95,3.02,.95],[-2.95,1.4,1.2],[2.85,.7,.92],[-2.1,-2.8,.8]]) {
      const plant = createBroadleafPlant(materials, random, s);
      plant.position.set(x, groundHeight(x,z), z); plant.rotation.y = random() * 6.28;
      plant.userData.baseRotation = plant.rotation.z;
      this.plants.push(plant); this.scene.add(plant);
    }

    // Low moss hummocks and leaf litter break up the ground into tactile near-field detail.
    const litterGeo = new THREE.PlaneGeometry(.12, .26, 1, 2); litterGeo.rotateX(-Math.PI/2);
    const litterMat = new THREE.MeshStandardMaterial({ color:'#776443', roughness:.94, side:THREE.DoubleSide });
    const litter = new THREE.InstancedMesh(litterGeo,litterMat,380);
    const dummy = new THREE.Object3D(); let count=0;
    for (let i=0;i<540 && count<380;i++) {
      const x=(random()-.5)*28,z=random()*-35+4;
      if (pondRadius(x,z)<1.12) continue;
      dummy.position.set(x,groundHeight(x,z)+.025,z);
      dummy.rotation.set((random()-.5)*.24,random()*6.28,(random()-.5)*.2);
      dummy.scale.setScalar(.45+random()*1.6);dummy.updateMatrix();litter.setMatrixAt(count++,dummy.matrix);
    }
    litter.count=count; this.scene.add(litter);
    this.addFallenWood(materials.bark);
    this.addBirds();
    this.addSunrays();
    this.addMotes();
  }

  private addRocks(base: THREE.MeshStandardMaterial) {
    const geometries: THREE.BufferGeometry[] = [];
    const random=this.rng;
    const add = (x:number,z:number,s:number,flat=.66) => {
      const g=new THREE.IcosahedronGeometry(1,2);const p=g.attributes.position;const color:number[]=[];
      for(let i=0;i<p.count;i++) {
        const px=p.getX(i),py=p.getY(i),pz=p.getZ(i);
        const n=1+.1*Math.sin(px*8+pz*5)*Math.cos(py*7)+.055*Math.sin(pz*18+px*11);
        p.setXYZ(i,px*n,py*n*flat,pz*n*.85);
        const moss=THREE.MathUtils.smoothstep(py+.18*Math.sin(px*8)*Math.cos(pz*9),.12,.78);
        const c=new THREE.Color('#777c6a').lerp(new THREE.Color('#647736'),moss*.88);
        c.multiplyScalar(.8+random()*.3);color.push(c.r,c.g,c.b);
      }
      g.setAttribute('color',new THREE.Float32BufferAttribute(color,3));g.computeVertexNormals();
      g.scale(s,s,s);g.rotateY(random()*6.28);g.translate(x,groundHeight(x,z)+s*.12,z);geometries.push(g);
    };
    [[-2.45,1.8,.73],[2.6,1.0,.77],[-2.25,-2.1,.56],[1.8,-3.45,.69],[-.72,2.91,.33],[.58,3.07,.38],[-3.1,-4.9,.8],[3.4,-6.1,1.1]].forEach(([x,z,s])=>add(x,z,s));
    for(let i=0;i<76;i++) {
      const a=random()*6.28,r=.9+random()*.32;
      add(Math.cos(a)*2.55*r-.18,Math.sin(a)*3.45*r-.55,.08+random()*.22);
    }
    for(let i=0;i<70;i++){const x=(random()-.5)*4,z=(random()-.5)*5-.5;add(x,z,.035+random()*.09,.6);}
    const g=mergeGeometries(geometries);geometries.forEach(item=>item.dispose());
    const mat=base.clone();mat.color.set('white');mat.vertexColors=true;mat.roughness=.65;
    const stones=new THREE.Mesh(g,mat);stones.castShadow=true;stones.receiveShadow=true;this.scene.add(stones);
  }

  private addWater() {
    const shape=new THREE.Shape();
    for(let i=0;i<=100;i++) {
      const a=i/100*Math.PI*2,r=1+.045*Math.sin(a*5)+.025*Math.sin(a*9);
      const x=Math.cos(a)*2.6*r-.18,y=Math.sin(a)*3.48*r+.55;
      if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);
    }
    const shader={
      name:'ForestWater',
      uniforms:{color:{value:new THREE.Color('#719478')},tDiffuse:{value:null},textureMatrix:{value:new THREE.Matrix4()},time:{value:0},ripple:{value:new THREE.Vector3(0,0,-100)}},
      vertexShader:`uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld; void main(){vReflection=textureMatrix*vec4(position,1.); vWorld=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`
        uniform sampler2D tDiffuse; uniform float time; uniform vec3 ripple; varying vec4 vReflection; varying vec3 vWorld;
        void main(){
          vec2 p=vWorld.xz; float age=time-ripple.z;float dist=length(p-ripple.xy);
          float pulse=sin(dist*26.-age*4.2)*exp(-pow((dist-age*.39)*2.5,2.))*exp(-age*.85)*step(0.,age);
          vec2 flow=vec2(sin(p.y*8.+time*.52)+sin(p.x*14.+p.y*3.+time*.37),cos(p.x*9.-time*.43))*.0016;
          vec2 uv=vReflection.xy/vReflection.w+flow+normalize(p-ripple.xy+.0001)*pulse*.004;
          vec3 reflected=texture2D(tDiffuse,uv).rgb;
          vec3 view=normalize(cameraPosition-vWorld);float fresnel=.24+.63*pow(1.-max(0.,view.y),3.);
          float caustic=pow(max(0.,sin(p.x*14.+sin(p.y*10.+time*.37))+cos(p.y*15.+time*.3))*.5,9.);
          vec3 bed=mix(vec3(.09,.14,.075),vec3(.22,.27,.15),.5+.5*sin(p.x*8.)*cos(p.y*12.));
          vec3 c=mix(bed,reflected,fresnel)+vec3(.47,.50,.27)*caustic*.11;
          c+=vec3(.13,.14,.10)*max(0.,pulse)*.32;
          gl_FragColor=vec4(c,.90);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    };
    this.reflection=new Reflector(new THREE.ShapeGeometry(shape,48),{textureWidth:1024,textureHeight:1024,clipBias:.004,multisample:0,shader});
    this.reflection.rotation.x=-Math.PI/2;this.reflection.position.y=.075;
    const mat=this.reflection.material as THREE.ShaderMaterial;mat.transparent=true;mat.depthWrite=false;
    this.waterUniforms=mat.uniforms;this.reflection.renderOrder=1;
    this.scene.add(this.reflection);
  }

  private addFallenWood(material:THREE.MeshStandardMaterial) {
    const g=new THREE.CylinderGeometry(.18,.24,3.6,16,8);g.rotateZ(Math.PI/2);
    const log=new THREE.Mesh(g,material);log.position.set(-2.8,.59,-5.2);log.rotation.y=-.32;
    log.castShadow=true;log.receiveShadow=true;this.scene.add(log);
  }

  private addBirds() {
    const bodyMat=new THREE.MeshStandardMaterial({color:'#6c6b4d',roughness:.86});
    const breastMat=new THREE.MeshStandardMaterial({color:'#b6b393',roughness:.9});
    const eyeMat=new THREE.MeshStandardMaterial({color:'#202923',roughness:.28});
    for(const [x,y,z] of [[-1.68,.93,-5.42]]) {
      const bird=new THREE.Group();
      const body=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),bodyMat);body.scale.set(.8,1,1.35);bird.add(body);
      const chest=new THREE.Mesh(new THREE.SphereGeometry(.096,10,8),breastMat);chest.position.set(0,-.01,.06);chest.scale.set(.76,.9,1);bird.add(chest);
      const head=new THREE.Mesh(new THREE.SphereGeometry(.075,10,8),bodyMat);head.position.set(0,.12,.08);bird.add(head);
      const beak=new THREE.Mesh(new THREE.ConeGeometry(.021,.075,6),eyeMat);beak.rotation.x=Math.PI/2;beak.position.set(0,.12,.17);bird.add(beak);
      const tail=new THREE.Mesh(new THREE.ConeGeometry(.055,.24,5),bodyMat);tail.rotation.x=-1.2;tail.position.set(0,-.04,-.2);bird.add(tail);
      for(const x of [-.036,.036]) {
        const leg=new THREE.Mesh(new THREE.CylinderGeometry(.006,.004,.09,4),eyeMat);leg.position.set(x,-.13,.01);bird.add(leg);
      }
      bird.position.set(x,y,z);bird.rotation.y=.65;this.birds.push(bird);this.scene.add(bird);
    }
  }

  private addSunrays() {
    const material=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
      uniforms:{},
      vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:'varying vec2 vUv;void main(){float edge=pow(sin(vUv.x*3.14159),2.);float end=smoothstep(0.,.15,vUv.y)*(1.-smoothstep(.62,1.,vUv.y));gl_FragColor=vec4(.88,.84,.58,edge*end*.034);}',
    });
    for(let i=0;i<5;i++){
      const start=V(5.3+i*.74,11,-14.5-i*1.5),end=V(-3.2+i*.65,.1,3-i*.6);
      const center=start.clone().add(end).multiplyScalar(.5);const len=start.distanceTo(end);
      const ray=new THREE.Mesh(new THREE.PlaneGeometry(.32+i*.16,len),material);
      ray.position.copy(center);ray.quaternion.setFromUnitVectors(V(0,1,0),start.clone().sub(end).normalize());this.scene.add(ray);
    }
  }

  private addMotes() {
    const pos:number[]=[], phase:number[]=[];
    for(let i=0;i<42;i++){pos.push((this.rng()-.5)*15,this.rng()*6+.7,-this.rng()*25);phase.push(this.rng()*6.28);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('phase',new THREE.Float32BufferAttribute(phase,1));
    const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{time:this.clock},
      vertexShader:'uniform float time;attribute float phase;varying float fade;void main(){vec3 p=position;p.x+=sin(time*.15+phase)*.17;p.y+=sin(time*.19+phase)*.13;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(14./-mv.z,1.,2.6);fade=.1+.15*pow(max(0.,sin(phase+time*.12)),2.);}',
      fragmentShader:'varying float fade;void main(){float a=1.-smoothstep(.08,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.9,.87,.65,a*fade);}',
    });this.scene.add(new THREE.Points(g,mat));
  }

  setSize(width:number,height:number,devicePixelRatio:number){
    if(this.disposed)return;
    this.renderer.setPixelRatio(forestPixelRatio(width,height,devicePixelRatio));
    this.renderer.setSize(Math.max(1,width),Math.max(1,height),false);
    this.camera.aspect=width/Math.max(1,height);
    // Preserve the near pool + canopy in narrow folded screens, without zooming into a trunk.
    this.camera.fov=this.camera.aspect<.8?66:55;this.camera.updateProjectionMatrix();
    this.canvas.dataset.dpr=String(this.renderer.getPixelRatio());
  }

  renderFrame(dt:number){
    if(!this.ready||this.disposed)return;
    const step=Math.max(0,Math.min(dt,.05));this.time+=step;this.clock.value=this.time;
    this.look.update(step);
    this.camera.lookAt(Math.sin(this.look.yaw)*14,1.65+this.look.pitch*14,-9);
    this.waterUniforms.time.value=this.time;
    for(let i=0;i<this.plants.length;i++){
      const plant=this.plants[i];const age=this.time-this.leafHitTime;
      const touch=plant===this.leafHit&&age<5?Math.sin(age*5.5)*Math.exp(-age*1.15)*.045:0;
      plant.rotation.z=(plant.userData.baseRotation||0)+Math.sin(this.time*.48+i*1.8)*.007+touch;
    }
    for(let i=0;i<this.birds.length;i++)this.birds[i].rotation.y=.65+Math.sin(this.time*.21+i*2.1)*.09;
    this.renderer.info.reset();this.renderer.render(this.scene,this.camera);this.frame++;
    Object.assign(this.canvas.dataset,{frames:String(this.frame),time:this.time.toFixed(4),lookYaw:this.look.yaw.toFixed(5),lookPitch:this.look.pitch.toFixed(5),drawCalls:String(this.renderer.info.render.calls),triangles:String(this.renderer.info.render.triangles)});
  }

  start(){
    if(this.running||this.disposed)return;this.running=true;this.canvas.dataset.running='true';this.last=performance.now();
    const tick=(now:number)=>{if(!this.running)return;const dt=(now-this.last)/1000;this.last=now;this.renderFrame(dt);this.request=requestAnimationFrame(tick);};
    this.request=requestAnimationFrame(tick);
  }
  stop(){this.running=false;cancelAnimationFrame(this.request);this.request=0;this.canvas.dataset.running='false';this.look.release();}
  drag(dx:number,dy:number){if(this.running)this.look.drag(dx,dy);}
  releaseDrag(){this.look.release();}
  setOnInteraction(callback:((event:ForestInteraction)=>void)|undefined){this.onInteraction=callback;}
  touch(x:number,y:number){
    if(!this.running||this.disposed)return;
    this.raycaster.setFromCamera(new THREE.Vector2(x,y),this.camera);
    const leaf=this.raycaster.intersectObjects(this.plants,true)[0];
    const water=this.raycaster.intersectObject(this.reflection)[0];
    if(leaf&&(!water||leaf.distance<water.distance)){
      let group:THREE.Object3D=leaf.object;while(group.parent&&!this.plants.includes(group as THREE.Group))group=group.parent;
      this.leafHit=group as THREE.Group;this.leafHitTime=this.time;
      this.canvas.dataset.leafHits=String(Number(this.canvas.dataset.leafHits)+1);
      this.onInteraction?.({kind:'leaf',position:leaf.point.toArray() as [number,number,number],strength:.18});
    }else if(water){
      this.waterUniforms.ripple.value.set(water.point.x,water.point.z,this.time);
      this.canvas.dataset.waterHits=String(Number(this.canvas.dataset.waterHits)+1);
      this.onInteraction?.({kind:'water',position:water.point.toArray() as [number,number,number],strength:.22});
    }
  }

  dispose(){
    if(this.disposed)return;this.stop();this.disposed=true;this.ready=false;this.onInteraction=undefined;
    this.canvas.removeEventListener('webglcontextlost',this.onLost);
    const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
    this.scene.traverse(object=>{
      const mesh=object as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);
      if(mesh.material)for(const m of Array.isArray(mesh.material)?mesh.material:[mesh.material])materials.add(m);
      if(object instanceof THREE.Light&&'shadow' in object)(object as THREE.DirectionalLight).shadow?.dispose();
    });
    for(const m of materials){for(const value of Object.values(m))if(value instanceof THREE.Texture)textures.add(value);m.dispose();}
    geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());
    this.reflection?.getRenderTarget().dispose();this.resources.forEach(r=>r.dispose());
    this.renderer.renderLists.dispose();this.renderer.dispose();this.renderer.forceContextLoss();this.scene.clear();
    this.canvas.dataset.disposed='true';
  }
}
