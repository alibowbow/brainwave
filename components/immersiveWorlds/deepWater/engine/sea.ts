import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldContent } from './types';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { fbm3, ridged3 } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';

/** Original procedural underwater space. No external image, model or copied gallery source. */
const SURFACE_Y = 15;
const SUN_DIRECTION = new THREE.Vector3(-.22, -1, .28).normalize();

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform vec3 uSunDirection;
uniform vec3 uLight;
uniform float uSurfaceY;
uniform float uDensity;
// Light reaching depth p, broken into shafts by the moving surface above.
float shafts(vec3 p) {
  float travel = (uSurfaceY - p.y) / max(-uSunDirection.y, 0.2);
  vec2 s = p.xz - uSunDirection.xz * travel;
  float n = bwNoise(vec3(s * 0.32, uTime * 0.05)) * 0.7 + bwNoise(vec3(s * 0.85 + 7.0, uTime * 0.08)) * 0.3;
  return smoothstep(0.05, 0.6, n + 0.12);
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 60.0);
  float phase = bwPhase(dot(uSunDirection, -rd), 0.6) * 12.5663706;
  const int STEPS = 32;
  float dt = maxT / float(STEPS);
  float jitter = bwIgn(gl_FragCoord.xy);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * ((float(i) + jitter) * dt);
    float below = max(uSurfaceY - p.y, 0.0);
    float light = exp(-below * 0.075) * (0.22 + 1.5 * shafts(p));
    float stepT = exp(-uDensity * dt);
    scatter += transmittance * uLight * light * phase * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

export function createDeepSea(_renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  const waterColor = new THREE.Color('#063349');
  scene.background = waterColor;
  scene.fog = new THREE.FogExp2(waterColor, 0.016);
  const camera = new THREE.PerspectiveCamera(49, 1, 0.08, 140);
  camera.position.set(0, 1.55, 7.1);
  const target = new THREE.Vector3(0.05, 1.65, -13);
  camera.lookAt(target);
  const timers: { value: number }[] = [];
  const clock = { value: 0 }; timers.push(clock);
  let pulse = 0, pulseTarget = 0;
  const rnd = seeded(62893);

  // Daylight filters down from the surface; everything else is dim, cold scatter.
  scene.add(new THREE.HemisphereLight('#5fb8c8', '#020b14', 0.5));
  const daylight = new THREE.DirectionalLight('#a6efe8', 3.4);
  daylight.position.copy(SUN_DIRECTION).multiplyScalar(-30).add(new THREE.Vector3(-2, 0, -6));
  daylight.target.position.set(-2, 0, -6);
  daylight.castShadow = true; daylight.shadow.mapSize.set(2048, 2048);
  Object.assign(daylight.shadow.camera, { left: -16, right: 16, top: 18, bottom: -18, near: 1, far: 70 });
  daylight.shadow.bias = -.0004; daylight.shadow.normalBias = .04;
  daylight.shadow.autoUpdate = false; daylight.shadow.needsUpdate = true;
  scene.add(daylight, daylight.target);
  const leftFill = new THREE.PointLight('#5fb6bf', 12, 16, 2);
  leftFill.position.set(-1.8, 3.7, 3.4);
  scene.add(leftFill);
  const cold = new THREE.PointLight('#3a6fa8', 70, 40, 2);
  cold.position.set(5, 7, -14);
  scene.add(cold);

  // Enclosing water volume: dark depths below, a bright rippling surface above.
  const backgroundMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uTime: clock, uSun: { value: SUN_DIRECTION.clone().negate() } },
    vertexShader: `varying vec3 vDirection; void main(){ vDirection=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `precision highp float; varying vec3 vDirection; uniform float uTime; uniform vec3 uSun;
      ${GLSL_NOISE}
      void main(){ vec3 d=normalize(vDirection); float up=smoothstep(-.5,.95,d.y);
      vec3 c=mix(vec3(.002,.012,.035),vec3(.02,.11,.19),up);
      // Snell's window: the sky compressed into a bright, rippling disc overhead.
      float window=smoothstep(.55,.85,d.y);
      vec2 q=d.xz/max(d.y,.2);
      float ripple=.6+.4*bwNoise(vec3(q*3.,uTime*.12))+.25*bwNoise(vec3(q*9.+3.,uTime*.2));
      c+=vec3(.25,.75,.8)*window*ripple*2.2;
      float sun=pow(max(0.,dot(d,uSun)),18.);
      c+=vec3(1.4,1.9,1.8)*sun*ripple;
      gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
  });
  const background = new THREE.Mesh(new THREE.SphereGeometry(110, 48, 32), backgroundMat);
  background.renderOrder = -10; scene.add(background);

  // Caustics thrown by the surface land on everything that faces up.
  const caustics = { centre: new THREE.Vector3(-4, 60, -8), radius: 90, color: new THREE.Color(.55, 1.0, .95).multiplyScalar(1.1), time: clock };
  const stone = createRockMaterial('#5c706b', { key: 'sea-stone', caustics, scale: 1.1, bump: 1.3, stain: '#4c5a40', stainAmount: .35, cavity: .65, strata: .45, wetness: 1, drips: 0, dryRoughness: .7, wetRoughness: .55 });
  const darkStone = createRockMaterial('#3c5155', { key: 'sea-dark-stone', caustics, scale: .9, bump: 1.1, cavity: .55, strata: .35, wetness: 1, drips: 0, dryRoughness: .7, wetRoughness: .6 });
  const sand = createRockMaterial('#9a9277', { key: 'sea-sand', caustics, scale: 2.2, bump: .45, cavity: .2, strata: 0, stainAmount: .1, wetness: 1, drips: 0, dryRoughness: .9, wetRoughness: .85 });
  const wall = new THREE.Mesh(wallGeometry(), stone);
  wall.receiveShadow = true;
  scene.add(wall);
  const shelves: Array<[number, number, number, number, number, number, number]> = [
    [-4.7, -2.7, 3.4, 3.2, 1.55, 3.3, 42], [-3.8, -2.3, -3.0, 3.0, 1.45, 3.4, 311],
    [-3.8, -4.7, -8, 3.0, 2.2, 4.8, 100], [-4.4, -8, -15, 3.8, 3.6, 5.8, 257],
    [-6, 1.8, -18, 3.2, 4.0, 5.2, 7], [-8, -1.8, -31, 5.2, 7.3, 8.1, 37],
  ];
  for (const [x,y,z,sx,sy,sz,seed] of shelves) {
    const rock = new THREE.Mesh(boulderGeometry(seed, z > -10 ? 20 : 12), z < -18 ? darkStone : stone);
    rock.position.set(x, y, z); rock.scale.set(sx, sy, sz); rock.rotation.set(.05 * Math.sin(seed), seed * .71, .07 * Math.cos(seed));
    rock.castShadow = true; rock.receiveShadow = true; scene.add(rock);
  }
  // Fine loose stones break the near ledge silhouette.
  for (let i=0;i<28;i++) {
    const x=-6.4+rnd()*4.3, z=2.5-rnd()*7;
    const pebble = new THREE.Mesh(boulderGeometry(i*31+12, 6), stone);
    pebble.position.set(x,-1.45+rnd()*.16,z); pebble.scale.set(.12+rnd()*.45,.09+rnd()*.23,.17+rnd()*.37); pebble.rotation.y = rnd() * 6;
    pebble.castShadow = true; pebble.receiveShadow = true; scene.add(pebble);
  }
  // A rippled sand floor far below gives the open water a ground and scale.
  const floorGeometry = new THREE.PlaneGeometry(110, 110, 180, 180);
  floorGeometry.rotateX(-Math.PI / 2);
  const fp = floorGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i), z = fp.getZ(i);
    const ripple = Math.sin(x * 1.7 + fbm3(x * .1, 0, z * .1, 2) * 4) * .08;
    // The slope falls away into the deep, so the floor never meets a hard horizon.
    const worldZ = z - 20, worldX = x + 6;
    const fall = Math.max(0, -(worldZ + 6)) * .42 + Math.max(0, worldX - 10) * .25;
    fp.setY(i, -10.5 - fall + fbm3(x * .05, 1, z * .05, 4) * 2.2 + fbm3(x * .3, 2, z * .3, 2) * .35 + ripple);
  }
  floorGeometry.computeVertexNormals();
  const floor = new THREE.Mesh(floorGeometry, sand);
  floor.position.set(6, 0, -20); floor.receiveShadow = true; floor.name = 'deep-sea-sand-floor';
  scene.add(floor);
  // A few half-buried outcrops on the slope, lit from above like the wall.
  for (const [x, y, z, sx, sy, sz, seed] of [[3.5, -11.6, -9, 2.6, 1.6, 2.2, 501], [9, -14.5, -19, 4.2, 2.6, 3.4, 502], [-.5, -15.5, -24, 3.4, 3.1, 3.0, 503]]) {
    const rock = new THREE.Mesh(boulderGeometry(seed, 12), stone);
    rock.position.set(x, y, z); rock.scale.set(sx, sy, sz); rock.rotation.y = seed;
    rock.castShadow = true; rock.receiveShadow = true; scene.add(rock);
  }
  const coralGroups: THREE.Group[] = [];
  const fanColors = ['#8a5949','#a7795c','#716647'];
  const coralSites: [number,number,number,number][] = [[-1.7,-1.55,-2.7,.95],[-3.95,-.35,-1.5,.57],[-3.95,2.35,-4,.65],[-3.8,-2,-6,.8]];
  coralSites.forEach(([x,y,z,s],i)=>{
    const fan=makeSeaFan(fanColors[i%3], 94+i*71); fan.position.set(x,y,z); fan.scale.setScalar(s); fan.rotation.y=.15+i*.28;
    scene.add(fan); coralGroups.push(fan);
  });
  const spongeMat = new THREE.MeshStandardMaterial({color:'#8c8464',roughness:.92,metalness:0});
  spongeMat.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec3 vSpongeP;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvSpongeP=position;');
    shader.fragmentShader='varying vec3 vSpongeP;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      vec3 sp=vSpongeP*43.;
      float spongeGrain=sin(sp.x*1.9+sin(sp.z*.73))*sin(sp.y*2.2+cos(sp.x*.39))*sin(sp.z*1.7+sin(sp.y*.5));
      float pores=smoothstep(.48,.79,spongeGrain);
      diffuseColor.rgb *= .80+.16*sin(vSpongeP.y*11.+vSpongeP.z*5.)-pores*.34;
    `);
  };
  spongeMat.customProgramCacheKey=()=> 'deepwater-sponge-pores-v1';
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

  // Fallback shafts for renderers without the HDR volume pass.
  const shaftTime = { value:0 }; timers.push(shaftTime);
  const fallbackShafts: THREE.Mesh[] = [];
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
    scene.add(shaft); fallbackShafts.push(shaft);
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

  const particleCount=1400;
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
      ${GLSL_NOISE}
      void main(){vec3 p=position;p.x+=sin(uTime*.035+seed*18.+p.y*.2)*.22;p.y+=sin(uTime*.021+seed*11.)*.30-mod(uTime*.01*(.5+seed),2.);
      // Marine snow glints where a surface shaft passes through it.
      vec2 s=p.xz-vec2(-.22,.28)*(${SURFACE_Y.toFixed(1)}-p.y);
      float shaft=smoothstep(.05,.6,bwNoise(vec3(s*.32,uTime*.05))*.7+bwNoise(vec3(s*.85+7.,uTime*.08))*.3+.12);
      vec4 mv=modelViewMatrix*vec4(p,1.);vFade=exp(-length(mv.xyz)*.045)*(.12+seed*.25)*(.35+1.6*shaft);vSeed=seed;
      gl_PointSize=clamp((9.+seed*12.)/-mv.z,1.,2.8);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`precision highp float;varying float vFade;varying float vSeed;void main(){float d=length(gl_PointCoord-.5);float a=(1.-smoothstep(.05,.5,d))*vFade;gl_FragColor=vec4(mix(vec3(.5,.8,.82),vec3(.85,.95,.92),vSeed)*1.6,a);}`,
  });
  scene.add(new THREE.Points(particlesGeo,particlesMat));

  // Faint bioluminescent plankton drift in the dark water below the light.
  const glintCount=420,glintPositions=new Float32Array(glintCount*3),glintSeeds=new Float32Array(glintCount);
  for(let i=0;i<glintCount;i++){glintPositions.set([-1+rnd()*24,-14+rnd()*12,-6-rnd()*40],i*3);glintSeeds[i]=rnd();}
  const glintGeo=new THREE.BufferGeometry();
  glintGeo.setAttribute('position',new THREE.BufferAttribute(glintPositions,3));
  glintGeo.setAttribute('seed',new THREE.BufferAttribute(glintSeeds,1));
  scene.add(new THREE.Points(glintGeo,new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uTime:clock},
    vertexShader:`attribute float seed;uniform float uTime;varying float vGlow;
      void main(){vec3 p=position+vec3(sin(uTime*.05+seed*30.)*.4,sin(uTime*.03+seed*20.)*.5,0.);
      vec4 mv=modelViewMatrix*vec4(p,1.);
      vGlow=pow(.5+.5*sin(uTime*(.15+seed*.25)+seed*60.),3.)*(.4+seed*.6);
      gl_PointSize=clamp(30./-mv.z,1.,2.4);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`varying float vGlow;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(vec3(.2,.85,1.)*2.2*vGlow*(1.-smoothstep(0.,1.,d)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  })));

  const interactTargets: THREE.Object3D[]=[mainJelly.bell];
  return {
    scene,camera,target,
    post: { exposure: 1.2, bloomStrength: .11, aoStrength: .9, aoRadius: .7, saturation: 1.05, contrast: 1.1, shadowTint: [.88, .98, 1.1], highlightTint: [1.0, 1.04, 1.02], vignette: .5, grain: .03 },
    createVolume(): VolumeEffect {
      return { material: new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: { uSunDirection: { value: SUN_DIRECTION.clone() }, uLight: { value: new THREE.Vector3(.12, .42, .48) }, uSurfaceY: { value: SURFACE_Y }, uDensity: { value: .03 } },
      }) };
    },
    setPostActive(active) { fallbackShafts.forEach(shaft => { shaft.visible = !active; }); },
    update(time,dt){
      for(const timer of timers) timer.value=time;
      pulseTarget=Math.max(0,pulseTarget-dt*.13);
      pulse+=(pulseTarget-pulse)*(1-Math.exp(-dt*1.8));
      const breathe=1+Math.sin(time*.53)*.021+pulse*.038;
      mainJelly.group.position.set(home.x+Math.sin(time*.047)*.16,home.y+Math.sin(time*.095)*.23,home.z);
      mainJelly.group.rotation.z=-.12+Math.sin(time*.067)*.025;
      mainJelly.bell.scale.set(breathe,1-((breathe-1)*.45),breathe);
      mainJelly.material.opacity=.37+pulse*.09;
      mainJelly.material.emissiveIntensity=.35+pulse*.9;
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
      pulseTarget=.9;
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
  const rows=150,cols=190,positions:number[]=[],uvs:number[]=[],indices:number[]=[];
  for(let iy=0;iy<=rows;iy++)for(let iz=0;iz<=cols;iz++){
    const y=-16+iy/rows*34,z=7-iz/cols*66;
    const fissure=Math.pow(Math.abs(Math.sin(y*.52+z*.08)),8)*.72;
    const buttress=Math.exp(-Math.pow((z+5.5)/4.5,2))*1.42;
    const strata=.37*Math.sin(y*.77+z*.12)+.16*Math.sin(y*2.3+z*.19);
    const eroded=fbm3(y*.16,z*.16,3.1,4)*1.1+(ridged3(y*.42,z*.42,8.3,3)-.3)*.55+fbm3(y*1.3,z*1.3,1.7,2)*.12;
    const x=-4.75+buttress+strata*.7+Math.sin(z*.28-y*.045)*.4-fissure*.8+eroded;
    positions.push(x,y,z);uvs.push(iz/cols,iy/rows);
  }
  for(let iy=0;iy<rows;iy++)for(let iz=0;iz<cols;iz++){
    const a=iy*(cols+1)+iz,b=a+cols+1;indices.push(a,a+1,b,b,a+1,b+1);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
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
  const material=new THREE.MeshPhysicalMaterial({color,emissive:'#6fb6c8',emissiveIntensity:.16,roughness:.3,metalness:0,transparent:true,opacity:.29,side:THREE.DoubleSide,depthWrite:false,clearcoat:.35,clearcoatRoughness:.2});
  const bell=new THREE.Mesh(bellGeometry(seed),material);bell.renderOrder=3;group.add(bell);
  const innerMat=new THREE.MeshStandardMaterial({color:'#b7a2b5',emissive:'#c38fd6',emissiveIntensity:.9,transparent:true,opacity:.33,roughness:.7,depthWrite:false});
  const fineMat=new THREE.MeshStandardMaterial({color:'#bddbd4',emissive:'#7fd6e6',emissiveIntensity:.7,transparent:true,opacity:.23,roughness:.8,depthWrite:false});
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
