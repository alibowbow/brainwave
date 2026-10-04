import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { addRock, rockMaterial } from './environment';
import type { WorldContent } from './types';

/** Original procedural underwater space. No external image, model or copied gallery source. */
export function createDeepSea(_renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  const waterColor = new THREE.Color('#083f58');
  scene.background = waterColor;
  scene.fog = new THREE.FogExp2(waterColor, 0.024);
  const camera = new THREE.PerspectiveCamera(49, 1, 0.08, 140);
  camera.position.set(0, 1.55, 7.1);
  const target = new THREE.Vector3(0.05, 1.65, -13);
  camera.lookAt(target);
  const timers: { value: number }[] = [];
  let pulse = 0;
  const rnd = seeded(62893);

  scene.add(new THREE.HemisphereLight('#a8e9e2', '#0b2941', 1.75));
  const daylight = new THREE.DirectionalLight('#b1ebe7', 3.5);
  daylight.position.set(2, 14, 5);
  scene.add(daylight);
  const leftFill = new THREE.PointLight('#78cbcf', 22, 19, 1.4);
  leftFill.position.set(-1.8, 3.7, 3.4);
  scene.add(leftFill);
  const cold = new THREE.PointLight('#427aac', 45, 35, 1.2);
  cold.position.set(5, 7, -8);
  scene.add(cold);

  // An enclosing water volume rather than a visible swimming-pool surface.
  const backgroundMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec3 vDirection; void main(){ vDirection=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `precision highp float; varying vec3 vDirection; uniform float uTime;
      void main(){ vec3 d=normalize(vDirection); float up=smoothstep(-.45,.9,d.y);
      vec3 c=mix(vec3(.003,.015,.045),vec3(.016,.09,.16),up);
      float sun=pow(max(0.,dot(d,normalize(vec3(.23,.85,-.45)))),8.);
      c+=vec3(.020,.065,.070)*sun; gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
  });
  const background = new THREE.Mesh(new THREE.SphereGeometry(110, 36, 24), backgroundMat);
  background.renderOrder = -10; scene.add(background);

  // Continuous fractured wall: geometry runs far below the observation ledge.
  const stone = rockMaterial('#526765', 0.82);
  stone.onBeforeCompile = chainCaustics(stone.onBeforeCompile, timers);
  stone.customProgramCacheKey = () => 'deepwater-sea-caustic-rock-v1';
  const darkStone = rockMaterial('#374d51', 0.72);
  darkStone.onBeforeCompile = chainCaustics(darkStone.onBeforeCompile, timers);
  darkStone.customProgramCacheKey = () => 'deepwater-sea-caustic-rock-v1';
  const wall = new THREE.Mesh(wallGeometry(), stone);
  scene.add(wall);
  const shelves: Array<[number, number, number, number, number, number, number]> = [
    [-4.7, -2.7, 3.4, 3.2, 1.55, 3.3, 42], [-3.8, -2.3, -3.0, 3.0, 1.45, 3.4, 311],
    [-3.8, -4.7, -8, 3.0, 2.2, 4.8, 100], [-4.4, -8, -15, 3.8, 3.6, 5.8, 257],
    [-6, 1.8, -18, 3.2, 4.0, 5.2, 7], [-8, -1.8, -31, 5.2, 7.3, 8.1, 37],
  ];
  for (const [x,y,z,sx,sy,sz,seed] of shelves) {
    addRock(scene, [x,y,z], [sx,sy,sz], seed, z < -18 ? darkStone : stone);
  }
  // Fine loose stones break the near ledge silhouette, without repeated smooth pebbles.
  for (let i=0;i<28;i++) {
    const x=-6.4+rnd()*4.3, z=2.5-rnd()*7;
    addRock(scene, [x,-1.45+rnd()*.16,z], [.12+rnd()*.45,.09+rnd()*.23,.17+rnd()*.37], i*31+12, stone);
  }

  const coralGroups: THREE.Group[] = [];
  const fanColors = ['#8a5949','#a7795c','#716647'];
  const coralSites: [number,number,number,number][] = [[-1.7,-1.55,-2.7,.95],[-3.95,-.35,-1.5,.57],[-3.95,2.35,-4,.65],[-3.8,-2,-6,.8]];
  coralSites.forEach(([x,y,z,s],i)=>{
    const fan=makeSeaFan(fanColors[i%3], 94+i*71); fan.position.set(x,y,z); fan.scale.setScalar(s); fan.rotation.y=.15+i*.28;
    scene.add(fan); coralGroups.push(fan);
  });
  const spongeMat = new THREE.MeshStandardMaterial({color:'#8c8464',roughness:.86,metalness:.02});
  for(let i=0;i<12;i++){
    const sponge=new THREE.Mesh(spongeGeometry(i+31),spongeMat);
    const s=.24+rnd()*.26;
    sponge.scale.set(s,s*(.85+rnd()*.85),s);
    sponge.position.set(-3.4-rnd()*1.1,-1.43,.7-rnd()*3.0);
    sponge.rotation.z=-.2+rnd()*.4; sponge.rotation.y=rnd()*Math.PI;
    scene.add(sponge);
  }
  // Pale encrusting patches on the stone have irregular, fluted geometry and matte edges.
  const encrustMat=new THREE.MeshStandardMaterial({color:'#779084',roughness:.96,side:THREE.DoubleSide});
  for(let i=0;i<12;i++){
    const patch=new THREE.Mesh(rosetteGeometry(8+i),encrustMat);
    patch.position.set(-3.2-rnd()*1.1,-1.2+rnd()*.17,-rnd()*4);
    patch.scale.setScalar(.15+rnd()*.23); patch.rotation.y=rnd()*6;
    scene.add(patch);
  }

  // Distant shafts contain no sharp cone edges, luminous surface, or strobe.
  const shaftTime = { value:0 }; timers.push(shaftTime);
  for(let i=0;i<4;i++){
    const mat = new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{uTime:shaftTime,uSeed:{value:i*2.7}},
      vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`precision highp float; varying vec2 vUv; uniform float uTime; uniform float uSeed;
        void main(){float width=mix(.42,.085,vUv.y);float x=(vUv.x-.5)/width;
        float beam=exp(-x*x*3.5)*smoothstep(0.,.23,vUv.y)*(1.-smoothstep(.92,1.,vUv.y));
        beam*=.91+.09*sin(vUv.y*19.+uTime*.09+uSeed);gl_FragColor=vec4(.27,.68,.71,beam*.075);}`,
    });
    const shaft=new THREE.Mesh(new THREE.PlaneGeometry(9+i*1.1,33),mat);
    shaft.position.set(-1+i*4.0,6,-22-i*3.4);shaft.rotation.z=-.15-i*.035;shaft.renderOrder=0;
    scene.add(shaft);
  }

  const mainJelly=makeJellyfish(1.03, '#a4cfcf', 2, timers);
  const home=new THREE.Vector3(1.25,2.25,-5.1);
  mainJelly.group.position.copy(home); mainJelly.group.rotation.z=-.12;
  mainJelly.group.name='deep-sea-touch-organism'; mainJelly.bell.name='deep-sea-touch-bell';
  scene.add(mainJelly.group);
  const farJellies: {group:THREE.Group;home:THREE.Vector3;phase:number}[]=[];
  for(const [x,y,z,size,phase] of [[-1.0,4.7,-18,.60,3],[5.4,.5,-22,.77,5],[2.2,7,-31,.75,1],[-.1,-1.1,-29,.56,7]]){
    const jelly=makeJellyfish(size,'#739fa9',phase,timers);
    const at=new THREE.Vector3(x,y,z);jelly.group.position.copy(at);scene.add(jelly.group);
    farJellies.push({group:jelly.group,home:at,phase});
  }

  const fishGeo=fishGeometry();
  const fishMaterial=new THREE.MeshStandardMaterial({color:'#638b94',roughness:.46,metalness:.13});
  fishMaterial.onBeforeCompile=(shader)=>{
    const time={value:0};timers.push(time);shader.uniforms.uSeaTime=time;
    shader.vertexShader='uniform float uSeaTime;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\ntransformed.z += sin(position.x * 8. - uSeaTime * 1.7) * pow(max(0., .45-position.x), 1.5) * .08;`);
  };
  const fishes:{mesh:THREE.Mesh;origin:THREE.Vector3;phase:number;speed:number}[]=[];
  for(let i=0;i<34;i++){
    const mesh=new THREE.Mesh(fishGeo,fishMaterial);
    const z=-12-rnd()*25;
    const x=-2+rnd()*17;
    const y=-1.6+rnd()*5 + (i<9 ? 2 : 0);
    const s=.15+rnd()*.18;
    mesh.scale.setScalar(s);mesh.rotation.y=-.15+rnd()*.30;mesh.rotation.z=-.035+rnd()*.07;
    mesh.position.set(x,y,z);scene.add(mesh);
    fishes.push({mesh,origin:mesh.position.clone(),phase:rnd()*6.3,speed:.022+rnd()*.028});
  }

  const particleCount=540;
  const particlePositions=new Float32Array(particleCount*3);
  const particleSeeds=new Float32Array(particleCount);
  for(let i=0;i<particleCount;i++){
    particlePositions.set([-19+rnd()*38,-12+rnd()*32,-49+rnd()*53],i*3); particleSeeds[i]=rnd();
  }
  const particlesGeo=new THREE.BufferGeometry();
  particlesGeo.setAttribute('position',new THREE.BufferAttribute(particlePositions,3));
  particlesGeo.setAttribute('seed',new THREE.BufferAttribute(particleSeeds,1));
  const particleTime={value:0};timers.push(particleTime);
  const particlesMat=new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,uniforms:{uTime:particleTime},
    vertexShader:`attribute float seed; uniform float uTime; varying float vFade; varying float vSeed;
      void main(){vec3 p=position;p.x+=sin(uTime*.035+seed*18.+p.y*.2)*.22;p.y+=sin(uTime*.021+seed*11.)*.30;
      vec4 mv=modelViewMatrix*vec4(p,1.);vFade=exp(-length(mv.xyz)*.041)*(.14+seed*.27);vSeed=seed;
      gl_PointSize=clamp((8.+seed*11.)/-mv.z,1.,2.5);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`precision highp float;varying float vFade;varying float vSeed;void main(){float d=length(gl_PointCoord-.5);float a=(1.-smoothstep(.05,.5,d))*vFade;gl_FragColor=vec4(mix(vec3(.43,.67,.70),vec3(.73,.82,.79),vSeed),a);}`,
  });
  scene.add(new THREE.Points(particlesGeo,particlesMat));

  const interactTargets: THREE.Object3D[]=[mainJelly.bell];
  return {
    scene,camera,target,
    update(time,dt){
      for(const timer of timers) timer.value=time;
      pulse=Math.max(0,pulse-dt*.18);
      const breathe=1+Math.sin(time*.53)*.021+pulse*.038;
      mainJelly.group.position.set(home.x+Math.sin(time*.047)*.16,home.y+Math.sin(time*.095)*.23,home.z);
      mainJelly.group.rotation.z=-.12+Math.sin(time*.067)*.025;
      mainJelly.bell.scale.set(breathe,1-((breathe-1)*.45),breathe);
      mainJelly.material.opacity=.37+pulse*.09;
      mainJelly.material.emissiveIntensity=.12+pulse*.20;
      for(const item of farJellies){
        item.group.position.y=item.home.y+Math.sin(time*.07+item.phase)*.28;
        item.group.rotation.z=Math.sin(time*.043+item.phase)*.08;
      }
      for(const fish of fishes){
        fish.mesh.position.x=fish.origin.x+Math.sin(time*fish.speed+fish.phase)*2.1;
        fish.mesh.position.y=fish.origin.y+Math.sin(time*.08+fish.phase)*.10;
      }
      coralGroups.forEach((g,i)=>{g.rotation.z=Math.sin(time*.15+i)*.012;});
    },
    interact(ray){
      const hit=ray.intersectObjects(interactTargets,false)[0];
      if(!hit)return null;
      pulse=.9;
      return {world:'sea',kind:'organism-pulse',strength:.28,pan:.18};
    },
    resize(aspect){
      // Portrait deliberately keeps the tactile left ledge and near organism together.
      camera.fov=aspect<.8?56:49;
      camera.updateProjectionMatrix();
    },
  };
}

function seeded(seed:number){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}

function wallGeometry(){
  const rows=82,cols=104,positions:number[]=[],uvs:number[]=[],indices:number[]=[];
  for(let iy=0;iy<=rows;iy++)for(let iz=0;iz<=cols;iz++){
    const y=-16+iy/rows*34,z=7-iz/cols*66;
    const fissure=Math.pow(Math.abs(Math.sin(y*.52+z*.08)),8)*.72;
    const buttress=Math.exp(-Math.pow((z+5.5)/4.5,2))*1.42;
    const strata=.37*Math.sin(y*.77+z*.12)+.16*Math.sin(y*2.3+z*.19);
    const x=-4.75+buttress+strata+Math.sin(z*.28-y*.045)*.56+Math.sin(y*2.9+z*1.7)*.10-fissure;
    positions.push(x,y,z);uvs.push(iz/cols,iy/rows);
  }
  for(let iy=0;iy<rows;iy++)for(let iz=0;iz<cols;iz++){
    const a=iy*(cols+1)+iz,b=a+cols+1;indices.push(a,a+1,b,b,a+1,b+1);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}

function chainCaustics(original:THREE.MeshStandardMaterial['onBeforeCompile'],timers:{value:number}[]){
  return function(this:THREE.MeshStandardMaterial,shader:Parameters<THREE.MeshStandardMaterial['onBeforeCompile']>[0],renderer:THREE.WebGLRenderer){
    original.call(this,shader,renderer);
    const time={value:0};timers.push(time);shader.uniforms.uSeaCausticTime=time;
    shader.vertexShader='varying vec3 vSeaWorld;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvSeaWorld=(modelMatrix*vec4(transformed,1.)).xyz;');
    shader.fragmentShader='varying vec3 vSeaWorld; uniform float uSeaCausticTime;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <dithering_fragment>',`#include <dithering_fragment>
      float seaWave=sin(vSeaWorld.x*2.3+vSeaWorld.z*1.8+sin(vSeaWorld.y*1.8+uSeaCausticTime*.15))+sin(vSeaWorld.z*2.8-vSeaWorld.y*1.7-uSeaCausticTime*.12);
      float seaLine=pow(max(0.,1.-abs(seaWave)*.72),10.);
      float seaFade=exp(-max(0.,-vSeaWorld.z)*.023)*.07;
      gl_FragColor.rgb+=vec3(.45,.78,.75)*seaLine*seaFade;`);
  };
}

function makeSeaFan(color:string,seed:number){
  const group=new THREE.Group(),random=seeded(seed);
  const mat=new THREE.MeshStandardMaterial({color,roughness:.83});
  const grow=(start:THREE.Vector3,angle:number,length:number,width:number,level:number)=>{
    const end=start.clone().add(new THREE.Vector3(Math.sin(angle)*length,Math.cos(angle)*length,(random()-.5)*length*.22));
    const mid=start.clone().lerp(end,.52).add(new THREE.Vector3((random()-.5)*.05,0,.025));
    const curve=new THREE.CatmullRomCurve3([start,mid,end]);
    const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,6,width,4,false),mat);group.add(mesh);
    if(level>0){grow(end,angle-.3-random()*.22,length*(.64+random()*.16),width*.68,level-1);grow(end,angle+.23+random()*.23,length*(.67+random()*.12),width*.64,level-1);}
  };
  grow(new THREE.Vector3(),-.12,.42,.028,5);
  grow(new THREE.Vector3(0,.26,0),.69,.38,.019,4);
  grow(new THREE.Vector3(0,.21,0),-.75,.34,.016,4);
  mergeStaticChildren(group);
  return group;
}

/** Batch fine branches/ribs by material; hundreds of tiny details cost only a handful of draw calls. */
function mergeStaticChildren(group:THREE.Group,keep?:THREE.Object3D){
  const batches=new Map<THREE.Material,THREE.Mesh[]>();
  for(const object of group.children){
    if(object===keep || !(object instanceof THREE.Mesh) || Array.isArray(object.material))continue;
    const list=batches.get(object.material)||[];list.push(object);batches.set(object.material,list);
  }
  for(const [material,meshes] of batches){
    if(meshes.length<2)continue;
    const parts=meshes.map(mesh=>{
      const geometry=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();
      for(const key of Object.keys(geometry.attributes))if(key!=='position'&&key!=='normal')geometry.deleteAttribute(key);
      return geometry;
    });
    const merged=mergeGeometries(parts,false);
    for(const geometry of parts)geometry.dispose();
    if(!merged)continue;
    for(const mesh of meshes){group.remove(mesh);mesh.geometry.dispose();}
    group.add(new THREE.Mesh(merged,material));
  }
}

function spongeGeometry(seed:number){
  const random=seeded(seed);const p:THREE.Vector2[]=[];
  p.push(new THREE.Vector2(.15,0),new THREE.Vector2(.19,.18),new THREE.Vector2(.21,.43),new THREE.Vector2(.29,.83),new THREE.Vector2(.32,1.03),new THREE.Vector2(.30,1.08),new THREE.Vector2(.245,1.06),new THREE.Vector2(.23,.93),new THREE.Vector2(.20,.66));
  const g=new THREE.LatheGeometry(p,24);
  const a=g.getAttribute('position');
  for(let i=0;i<a.count;i++){const y=a.getY(i);const noise=1+Math.sin(Math.atan2(a.getX(i),a.getZ(i))*7+seed)*.055+random()*.032;a.setXYZ(i,a.getX(i)*noise+y*.12,a.getY(i),a.getZ(i)*noise);}
  g.computeVertexNormals();return g;
}

function rosetteGeometry(seed:number){
  const positions:number[]=[],indices:number[]=[];const n=40;
  for(let r=0;r<7;r++)for(let i=0;i<=n;i++){
    const a=i/n*Math.PI*2,s=r/6,rad=s*(.80+Math.sin(a*7+seed)*.15);
    positions.push(Math.cos(a)*rad,.08+s*.18+Math.sin(a*9)*s*s*.13,Math.sin(a)*rad);
  }
  for(let r=0;r<6;r++)for(let i=0;i<n;i++){const a=r*(n+1)+i,b=a+n+1;indices.push(a,b,a+1,a+1,b,b+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
}

function makeJellyfish(scale:number,color:string,seed:number,timers:{value:number}[]){
  const group=new THREE.Group();group.scale.setScalar(scale);
  const material=new THREE.MeshPhysicalMaterial({color,emissive:'#658f99',emissiveIntensity:.16,roughness:.3,metalness:0,transparent:true,opacity:.29,side:THREE.DoubleSide,depthWrite:false,clearcoat:.35,clearcoatRoughness:.2});
  const bell=new THREE.Mesh(bellGeometry(seed),material);bell.renderOrder=3;group.add(bell);
  const innerMat=new THREE.MeshStandardMaterial({color:'#b7a2b5',emissive:'#879cac',emissiveIntensity:.14,transparent:true,opacity:.33,roughness:.7,depthWrite:false});
  const fineMat=new THREE.MeshStandardMaterial({color:'#bddbd4',emissive:'#679caa',emissiveIntensity:.10,transparent:true,opacity:.23,roughness:.8,depthWrite:false});
  const time={value:0};timers.push(time);
  fineMat.onBeforeCompile=(shader)=>{
    shader.uniforms.uJellyTime=time;
    shader.vertexShader='uniform float uJellyTime;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\nfloat amount=clamp(-position.y*.24,0.,1.);transformed.x+=sin(position.y*2.5+uJellyTime*.4+${seed.toFixed(2)})*amount*.15;transformed.z+=cos(position.y*1.8+uJellyTime*.29)*amount*.12;`);
  };
  // Fine radial mesoglea ribs converge under the umbrella's apex.
  for(let k=0;k<24;k++){
    const a=k/24*Math.PI*2;const points:THREE.Vector3[]=[];
    for(let j=0;j<=12;j++){
      const t=j/12,r=t*.96;points.push(new THREE.Vector3(Math.cos(a)*r,.86*Math.sqrt(Math.max(0,1-r*r))-.07,Math.sin(a)*r));
    }
    group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),15,.0038,3,false),fineMat));
  }
  // Four soft horseshoe organs are visible through the translucent dome.
  for(let k=0;k<4;k++){
    const a=k/4*Math.PI*2;const points:THREE.Vector3[]=[];
    for(let j=0;j<=24;j++){
      const u=j/24*Math.PI*1.75+.2,px=.20+Math.cos(u)*.14,pz=Math.sin(u)*.11;
      points.push(new THREE.Vector3(Math.cos(a)*px-Math.sin(a)*pz,.51+Math.cos(u)*.018,Math.sin(a)*px+Math.cos(a)*pz));
    }
    group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),24,.026,5,false),innerMat));
  }
  // Scalloped rim, not a flat luminous disc.
  const rimPoints:THREE.Vector3[]=[];
  for(let k=0;k<=128;k++){const a=k/128*Math.PI*2,r=.97+.026*Math.sin(a*16);rimPoints.push(new THREE.Vector3(Math.cos(a)*r,.035+Math.sin(a*16)*.019,Math.sin(a)*r));}
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rimPoints),128,.013,4,false),fineMat));
  for(let k=0;k<25;k++){
    const a=k/25*Math.PI*2,points:THREE.Vector3[]=[];
    const len=1.35+(Math.sin(k*4.47+seed)*.5+.5)*1.45;
    for(let j=0;j<=22;j++){
      const t=j/22,spread=.95-t*.16;
      points.push(new THREE.Vector3(Math.cos(a)*spread+Math.sin(t*6+k)*t*.17,-t*len+.04,Math.sin(a)*spread+Math.cos(t*5+k)*t*.12));
    }
    group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),26,.004+k%3*.0015,3,false),fineMat));
  }
  // Ribbon-like oral arms hang inside the longer hair-fine marginal tentacles.
  const armMat=fineMat.clone();armMat.opacity=.33;
  for(let k=0;k<4;k++){
    const a=k*Math.PI/2;const g=oralArmGeometry(a,seed+k);
    group.add(new THREE.Mesh(g,armMat));
  }
  mergeStaticChildren(group,bell);
  return {group,bell,material};
}

function bellGeometry(seed:number){
  const p:number[]=[],uv:number[]=[],idx:number[]=[],n=80,m=30;
  for(let j=0;j<=m;j++)for(let i=0;i<=n;i++){
    const t=j/m,a=i/n*Math.PI*2,r=t*(1+Math.pow(t,7)*Math.sin(a*16+seed)*.025);
    const y=.90*Math.sqrt(Math.max(0,1-t*t))+.018*Math.sin(a*16)*Math.pow(t,8);
    p.push(Math.cos(a)*r,y,Math.sin(a)*r);uv.push(i/n,t);
  }
  for(let j=0;j<m;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+n+1;idx.push(a,b,a+1,a+1,b,b+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
function oralArmGeometry(angle:number,seed:number){
  const p:number[]=[],idx:number[]=[];const n=36;
  for(let i=0;i<=n;i++)for(let side=0;side<2;side++){
    const t=i/n,w=(1-t)*.12+.015,s=(side*2-1)*w;
    const x=Math.cos(angle)*(.16+t*.14)+Math.sin(t*9+seed)*t*.12;
    const z=Math.sin(angle)*(.16+t*.14)+Math.cos(t*8+seed)*t*.10;
    p.push(x+Math.cos(angle+t*9)*s,.20-t*1.85+Math.sin(t*38)*w*.18,z+Math.sin(angle+t*9)*s);
  }
  for(let i=0;i<n;i++){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g;
}
function fishGeometry(){
  const p:number[]=[],idx:number[]=[];const rings=15,radial=10;
  for(let i=0;i<=rings;i++)for(let j=0;j<=radial;j++){
    const t=i/rings,a=j/radial*Math.PI*2;
    const radius=Math.pow(Math.sin(t*Math.PI),.75)*.135;
    p.push(-.65+t*1.25,Math.cos(a)*radius,Math.sin(a)*radius*.56);
  }
  for(let i=0;i<rings;i++)for(let j=0;j<radial;j++){const a=i*(radial+1)+j,b=a+radial+1;idx.push(a,b,a+1,a+1,b,b+1);}
  const tri=(a:number[],b:number[],c:number[])=>{const start=p.length/3;p.push(...a,...b,...c);idx.push(start,start+1,start+2,start+2,start+1,start);};
  tri([-.59,0,0],[-.92,.23,.018],[-.87,-.22,-.018]);
  tri([-.3,.1,0],[.04,.25,0],[.16,.12,0]);
  tri([.16,-.06,.03],[-.12,-.19,.16],[-.24,-.04,.04]);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g;
}
