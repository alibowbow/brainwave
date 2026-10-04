import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { WorldScene } from '../contracts';

/** Original procedural Korean woodland stream. No third-party code or image assets. */
export function createSummerValley(renderer: THREE.WebGLRenderer): WorldScene {
  let seed = 42891;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#aac9bd');
  scene.fog = new THREE.FogExp2('#b6c9b4', 0.017);
  const camera = new THREE.PerspectiveCamera(53, 1, 0.08, 110);
  const clock = { value: 0 };
  const ripple = { value: new THREE.Vector4(0, 0, -100, 0) };
  const streamCenter = (z: number) => Math.sin((z + 4) * 0.11) * 1.7 + Math.sin(z * 0.23) * 0.38;
  const streamWidth = (z: number) => 2.5 + Math.sin(z * 0.2) * 0.25 + Math.max(0, z + 3) * 0.05;
  const waterY = 0.08;
  const yBank = (x: number, z: number) => {
    const distance = Math.max(0, Math.abs(x - streamCenter(z)) - streamWidth(z));
    return 0.04 + Math.min(distance * 0.40, 2.1) + Math.sin(z * .42 + x * .62) * .10 * Math.min(distance, 1)
      + Math.sin(x * 1.9 + z * .35) * .065 * Math.min(distance, 1);
  };
  const light = new THREE.DirectionalLight('#fff0bc', 3.1);
  light.position.set(-8, 16, -8);
  light.target.position.set(0, 0, -6);
  light.castShadow = true;
  light.shadow.mapSize.set(2048, 2048);
  Object.assign(light.shadow.camera, { left: -16, right: 16, top: 15, bottom: -15, near: 1, far: 48 });
  light.shadow.normalBias = .035;
  light.shadow.bias = -.0002;
  light.shadow.radius = 3;
  scene.add(light, light.target, new THREE.HemisphereLight('#c6e5ed', '#536d41', 1.45));
  const bounce = new THREE.DirectionalLight('#8dbcca', .55);
  bounce.position.set(7, 5, 8); scene.add(bounce);

  const noiseGLSL = `
    float hash31(vec3 p) { p = fract(p * .1031); p += dot(p, p.yzx + 33.33); return fract((p.x + p.y) * p.z); }
    float noise3(vec3 p) {
      vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
      return mix(mix(mix(hash31(i), hash31(i+vec3(1,0,0)), f.x), mix(hash31(i+vec3(0,1,0)), hash31(i+vec3(1,1,0)), f.x), f.y),
        mix(mix(hash31(i+vec3(0,0,1)), hash31(i+vec3(1,0,1)), f.x), mix(hash31(i+vec3(0,1,1)), hash31(i+vec3(1,1,1)), f.x), f.y), f.z);
    }
    float stoneFbm(vec3 p) { return noise3(p)*.55 + noise3(p*2.07)*.28 + noise3(p*4.13)*.12 + noise3(p*8.21)*.05; }
    float caustic(vec2 p, float t) {
      p *= 3.3;
      p += vec2(sin(p.y * .7 + t*.35), cos(p.x*.8-t*.27))*.45;
      float a = abs(sin(p.x*1.7 + sin(p.y*1.7+t*.42)));
      float b = abs(sin(p.y*1.4 - cos(p.x*1.8-t*.37)));
      return pow(1.-min(a,b), 11.)*.60 + pow(1.-abs(a-b), 19.)*.2;
    }
  `;
  function naturalMaterial(color: string, mode: 'stone' | 'soil' | 'wood') {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: .91, metalness: 0 });
    mat.onBeforeCompile = shader => {
      shader.uniforms.uValleyTime = clock;
      shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vValleyWorld;\nvarying vec3 vValleyNormal;');
      shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
        vec4 vp = vec4(transformed, 1.);
        #ifdef USE_INSTANCING
        vp = instanceMatrix * vp;
        #endif
        vValleyWorld = (modelMatrix * vp).xyz;
        vValleyNormal = normalize(mat3(modelMatrix) * objectNormal);
      `);
      shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
        uniform float uValleyTime; varying vec3 vValleyWorld; varying vec3 vValleyNormal;
        ${noiseGLSL}`);
      const stone = `
        float grit = stoneFbm(vValleyWorld*17.);
        float broad = stoneFbm(vValleyWorld*3.1);
        float grain = noise3(vValleyWorld*137.);
        float vein = smoothstep(.68,.71,noise3(vValleyWorld*vec3(4.,13.,4.))+sin(vValleyWorld.y*19.+broad*9.)*.13);
        diffuseColor.rgb *= .68 + grit*.46 + grain*.17;
        diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.47,.48,.40),vein*.22);
        float wet = 1. - smoothstep(.065,.18,vValleyWorld.y);
        diffuseColor.rgb *= mix(1.,.56,wet);
        float moss = smoothstep(.54,.72,broad + max(vValleyNormal.y,0.)*.12) * smoothstep(.12,.38,vValleyWorld.y);
        diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.105,.18,.045)*(1.+grit*.48),moss*.93);
        float inWater = 1. - smoothstep(-.01,.07,vValleyWorld.y);
        diffuseColor.rgb += vec3(.21,.30,.15) * caustic(vValleyWorld.xz,uValleyTime) * inWater;
      `;
      const soil = `
        float broad = stoneFbm(vValleyWorld*2.1);
        float grain = noise3(vValleyWorld*55.);
        diffuseColor.rgb *= .71 + broad*.58 + grain*.16;
        diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.095,.15,.029),smoothstep(.35,.67,broad)*.82);
      `;
      const wood = `
        float grain = stoneFbm(vValleyWorld*vec3(12.,.7,12.));
        float seams = smoothstep(.39,.46,noise3(vValleyWorld*vec3(23.,1.1,23.)));
        diffuseColor.rgb *= .51 + grain*.84 + seams*.17;
        float moss = smoothstep(.49,.66,stoneFbm(vValleyWorld*2.7))*(1.-smoothstep(.3,2.,vValleyWorld.y));
        diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.10,.16,.045),moss*.72);
      `;
      shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>\n${mode === 'stone' ? stone : mode === 'soil' ? soil : wood}`);
      if (mode === 'stone') shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(.86,.24,1.-smoothstep(.065,.18,vValleyWorld.y));');
    };
    mat.customProgramCacheKey = () => `valley-${mode}-v2`;
    return mat;
  }
  const soilMat = naturalMaterial('#66634b', 'soil');
  const barkMat = naturalMaterial('#766a52', 'wood');
  const rockMat = naturalMaterial('#afa99a', 'stone');

  // Curving independent banks and a continuously visible, shallow riverbed.
  for (const side of [-1, 1]) {
    const bank = new THREE.PlaneGeometry(24, 68, 56, 100);
    bank.rotateX(-Math.PI / 2);
    const a = bank.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const u = (a.getX(i) + 12) / 24;
      const z = a.getZ(i) - 18;
      const x = streamCenter(z) + side * (streamWidth(z) + u * 24);
      a.setXYZ(i, x, yBank(x, z), z);
    }
    if (side < 0 && bank.index) {
      for (let i = 0; i < bank.index.count; i += 3) {
        const a = bank.index.getX(i), b = bank.index.getX(i + 2);
        bank.index.setX(i, b); bank.index.setX(i + 2, a);
      }
    }
    bank.computeVertexNormals();
    const mesh = new THREE.Mesh(bank, soilMat); mesh.receiveShadow = true; scene.add(mesh);
  }
  const bedGeometry = new THREE.PlaneGeometry(10, 67, 36, 170);
  bedGeometry.rotateX(-Math.PI / 2);
  const bp = bedGeometry.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), z = bp.getZ(i) - 17;
    bp.setXYZ(i, x + streamCenter(z), -.35 + Math.sin(x * 2 + z) * .025 + Math.cos(z * .8) * .03, z);
  }
  bedGeometry.computeVertexNormals();
  const bed = new THREE.Mesh(bedGeometry, naturalMaterial('#ada884', 'stone'));
  bed.receiveShadow = true; scene.add(bed);

  function roundedStone(detail: number) {
    const geo = new THREE.IcosahedronGeometry(1, detail);
    const a = geo.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const x = a.getX(i), y = a.getY(i), z = a.getZ(i);
      const n = 1 + Math.sin(x * 4.7 + z * 2) * .045 + Math.sin(y * 6.9 - x * 2.5) * .035 + Math.sin(z * 8.1 + y) * .025;
      a.setXYZ(i, x * n, y * n, z * n);
    }
    // PolyhedronGeometry is unindexed: weld coincident corners before computing
    // vertex normals, otherwise every pebble shows a triangular planar facet.
    geo.deleteAttribute('normal'); geo.deleteAttribute('uv');
    const smooth = mergeVertices(geo, .0001); geo.dispose();
    smooth.computeVertexNormals(); return smooth;
  }
  const dummy = new THREE.Object3D();
  const stones = new THREE.InstancedMesh(roundedStone(2), rockMat, 1550);
  const stoneColors = ['#a69e84', '#7b8277', '#c5bba2', '#717e7b', '#988775', '#b9afa0'];
  for (let i = 0; i < 1550; i++) {
    const z = 11 - random() * 61;
    const edge = (random() * 2 - 1) * (streamWidth(z) + 1.0);
    const x = streamCenter(z) + edge;
    const bank = Math.abs(edge) > streamWidth(z);
    const size = .08 + Math.pow(random(), 2) * .28;
    dummy.position.set(x, bank ? yBank(x, z) + size * .10 : -.30 + size * .34, z);
    dummy.rotation.set(random() * .45, random() * Math.PI, random() * .28);
    dummy.scale.set(size * (1 + random() * .7), size * (.30 + random() * .38), size * (.75 + random() * .6));
    dummy.updateMatrix(); stones.setMatrixAt(i, dummy.matrix);
    stones.setColorAt(i, new THREE.Color(stoneColors[Math.floor(random() * stoneColors.length)]));
  }
  stones.receiveShadow = true; scene.add(stones);

  const boulderGeo = roundedStone(4);
  const boulderObjects: THREE.Mesh[] = [];
  const boulders: Array<[number, number, number, number, number, number]> = [
    [-2.18,.22,3.2,1.23,.77,1.13], [2.24,.11,1.8,.93,.56,1.2],
    [-3.0,.30,-.35,1.22,.75,1.04], [2.62,.19,-2.4,.89,.67,.98],
    [.6,-.065,-5.8,.54,.31,.74], [-2.6,.17,-8.3,.81,.46,1.02],
    [-.85,-.02,-10.7,.60,.25,.70], [2.3,.27,-14.2,1.3,.61,1.0],
    [-2.8,.24,-18.5,1.3,.7,1.2], [.35,.08,-22.4,.9,.38,.7],
    [-.75,.10,5.8,.70,.33,.61], [3.53,.54,4.3,1.18,.85,1.05],
  ];
  for (const [x, y, z, sx, sy, sz] of boulders) {
    const mesh = new THREE.Mesh(boulderGeo, rockMat);
    mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz);
    mesh.rotation.set(random() * .16, random() * 6, random() * .12);
    mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh); boulderObjects.push(mesh);
  }

  // Trees use branching tapered tubes and individual curved leaves, no canopy balls.
  const trunkGeos: THREE.BufferGeometry[] = [];
  const leafPlacements: Array<{ p: THREE.Vector3; scale: number; angle: number }> = [];
  const addBranch = (start: THREE.Vector3, end: THREE.Vector3, radius: number, bend = .1) => {
    const mid = start.clone().lerp(end, .52); mid.x += bend;
    const lower = start.clone().lerp(end, .24); lower.z -= bend * .52;
    const upper = start.clone().lerp(end, .80); upper.x -= bend * .35;
    const curve = new THREE.CatmullRomCurve3([start, lower, mid, upper, end]);
    const geometry = new THREE.TubeGeometry(curve, 7, radius, 7, false);
    const p = geometry.attributes.position;
    // Taper each generated longitudinal ring towards the twig.
    for (let ring = 0; ring <= 7; ring++) {
      const center = curve.getPointAt(ring / 7);
      const taper = 1 - ring / 7 * .71;
      for (let j = 0; j < 8; j++) {
        const k = ring * 8 + j;
        p.setXYZ(k, center.x + (p.getX(k)-center.x)*taper, center.y + (p.getY(k)-center.y)*taper, center.z + (p.getZ(k)-center.z)*taper);
      }
    }
    geometry.computeVertexNormals(); trunkGeos.push(geometry);
  };
  for (let i = 0; i < 79; i++) {
    const side = i % 2 ? -1 : 1;
    const z = i < 9 ? 5 - i * 3.6 + random() * 3 : -3 - random() * 48;
    const x = streamCenter(z) + side * (streamWidth(z) + 1.5 + random() * (i < 9 ? 5 : 16));
    const ground = yBank(x, z) - .12;
    const h = 5.5 + Math.pow(random(), .8) * 8.5;
    const radius = (i < 14 ? .24 : .13) + random() * (i < 14 ? .35 : .27);
    const base = new THREE.Vector3(x, ground, z);
    const tip = new THREE.Vector3(x + (random()-.5)*2.1, ground + h, z + (random()-.5)*1.7);
    addBranch(base, tip, radius, side * (.27 + random() * .48));
    for (let branch = 0; branch < 6; branch++) {
      const height = .35 + branch * .097;
      const start = base.clone().lerp(tip, height);
      const angle = random() * Math.PI * 2;
      const length = 1.6 + random() * 2.8;
      const end = start.clone().add(new THREE.Vector3(Math.cos(angle)*length, 1.0 + random()*1.8, Math.sin(angle)*length));
      addBranch(start, end, radius * .36, .12);
      for (let twig = 0; twig < 3; twig++) {
        const twigStart = start.clone().lerp(end,.46+twig*.16);
        const twigEnd = twigStart.clone().add(new THREE.Vector3((random()-.5)*2.8, .7+random()*.9, (random()-.5)*2.8));
        addBranch(twigStart, twigEnd, radius * .10, .07);
        const number = i < 24 ? 36 : 20;
        for (let j = 0; j < number; j++) {
          const p = twigStart.clone().lerp(twigEnd, .22+random()*.92);
          p.add(new THREE.Vector3((random()-.5)*1.3,(random()-.5)*.65,(random()-.5)*1.3));
          leafPlacements.push({p, scale:.30+random()*.36,angle:random()*Math.PI*2});
        }
      }
    }
    if (i < 17) for (let root = 0; root < 4; root++) {
      const a = root * 1.5 + random();
      const rx = x+Math.cos(a)*(radius*3.5), rz=z+Math.sin(a)*(radius*3.5);
      addBranch(new THREE.Vector3(x,ground+.18,z),new THREE.Vector3(rx,yBank(rx,rz)+.025,rz),radius*.35,.03);
    }
  }
  // Asymmetric midstory closes the forest's empty horizon and layers real leaves
  // between the ground ferns and tall canopy rather than floating canopy masses.
  for (let i = 0; i < 94; i++) {
    const z = i < 26 ? -40 - random() * 13 : 3 - random() * 42;
    const side = i % 2 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + .9 + random() * 12);
    const ground = yBank(x, z);
    const height = 1.15 + random() * 2.2;
    const base = new THREE.Vector3(x, ground, z);
    for (let branch = 0; branch < 6; branch++) {
      const angle = random() * Math.PI * 2;
      const end = base.clone().add(new THREE.Vector3(Math.cos(angle) * height * .65, height * (.55 + random() * .45), Math.sin(angle) * height * .65));
      addBranch(base, end, .026 + random() * .024, .12);
      for (let cluster = 0; cluster < 3; cluster++) {
        const center = base.clone().lerp(end, .48 + cluster * .25);
        for (let j = 0; j < 16; j++) {
          const p = center.clone().add(new THREE.Vector3((random()-.5)*1.15,(random()-.5)*.65,(random()-.5)*1.15));
          leafPlacements.push({ p, scale:.29+random()*.28, angle:random()*Math.PI*2 });
        }
      }
    }
  }
  const trunkMerged = mergeGeometries(trunkGeos);
  trunkGeos.forEach(g => g.dispose());
  const trees = new THREE.Mesh(trunkMerged, barkMat); trees.castShadow = trees.receiveShadow = true; scene.add(trees);

  const leafGeo = new THREE.BufferGeometry();
  leafGeo.setAttribute('position', new THREE.Float32BufferAttribute([
    0,0,0, -.34,.10,.34, 0,.15,.43,
    0,0,0, 0,.15,.43, .34,.10,.34,
    -.34,.10,.34, 0,.015,1, 0,.15,.43,
    0,.15,.43, 0,.015,1, .34,.10,.34,
  ],3));
  leafGeo.computeVertexNormals();
  const foliageMat = new THREE.MeshStandardMaterial({color:'#c4d9a0', roughness:.82, side:THREE.DoubleSide});
  foliageMat.onBeforeCompile = shader => {
    shader.uniforms.uValleyTime = clock;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uValleyTime;\nvarying float vLeafEdge;');
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      vLeafEdge = abs(position.x)*2.9;
      #ifdef USE_INSTANCING
      vec3 anchor = instanceMatrix[3].xyz;
      transformed.y += sin(uValleyTime*.61 + anchor.x*.32 + anchor.z*.27) * .085 * position.z;
      #endif
    `);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vLeafEdge;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= .79 + vLeafEdge*.27;');
  };
  foliageMat.customProgramCacheKey = () => 'valley-leaves-v2';
  const leaves = new THREE.InstancedMesh(leafGeo, foliageMat, leafPlacements.length);
  const leafColor = new THREE.Color();
  leafPlacements.forEach((leaf, i) => {
    dummy.position.copy(leaf.p); dummy.rotation.set((random()-.5)*.7,leaf.angle,(random()-.5)*.6);
    dummy.scale.setScalar(leaf.scale); dummy.updateMatrix(); leaves.setMatrixAt(i,dummy.matrix);
    leafColor.setHSL(.22+random()*.065,.39+random()*.19,.27+random()*.16); leaves.setColorAt(i,leafColor);
  });
  leaves.castShadow = leaves.receiveShadow = true; scene.add(leaves);

  // Near ferns: ascending arched fronds with paired tapered pinnae.
  const fernPositions: number[] = [];
  const fernColors: number[] = [];
  const fernColorsTemp = new THREE.Color();
  function addBlade(base: THREE.Vector3, tip: THREE.Vector3, width: number, color: THREE.Color) {
    const direction = tip.clone().sub(base);
    const perpendicular = new THREE.Vector3(-direction.z,0,direction.x).normalize().multiplyScalar(width);
    const mid = base.clone().lerp(tip,.40); mid.y += width*.45;
    const a=mid.clone().add(perpendicular), b=mid.clone().sub(perpendicular);
    const crease=mid.clone(); crease.y += width*.4;
    for (const p of [base,a,crease, base,crease,b, a,tip,crease, crease,tip,b]) {
      fernPositions.push(p.x,p.y,p.z); fernColors.push(color.r,color.g,color.b);
    }
  }
  for (let f = 0; f < 58; f++) {
    const z = 6 - random() * 37;
    const side = random() > .5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z)+.23+random()*2.8);
    const ground = yBank(x,z);
    const size = .60 + random()*.55;
    for (let frond=0;frond<8;frond++) {
      const angle=frond*Math.PI*.25+random()*.4;
      const length=size*(.68+random()*.40);
      const point=(u:number) => new THREE.Vector3(x+Math.cos(angle)*u*length,ground+Math.sin(u*Math.PI*.70)*length*.76,z+Math.sin(angle)*u*length);
      for(let j=1;j<12;j++) {
        const u=j/13;
        const base=point(u);
        const leafLength=Math.sin(u*Math.PI)*length*.30;
        for(const sign of [-1,1]) {
          const a=angle+sign*1.05;
          const tip=base.clone().add(new THREE.Vector3(Math.cos(a)*leafLength,.025+u*.02,Math.sin(a)*leafLength));
          fernColorsTemp.setHSL(.23+random()*.025,.42,.24+u*.15);
          addBlade(base,tip,leafLength*.16,fernColorsTemp);
        }
      }
    }
  }
  const fernGeo=new THREE.BufferGeometry();
  fernGeo.setAttribute('position',new THREE.Float32BufferAttribute(fernPositions,3));
  fernGeo.setAttribute('color',new THREE.Float32BufferAttribute(fernColors,3)); fernGeo.computeVertexNormals();
  const ferns=new THREE.Mesh(fernGeo,new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:.82}));
  ferns.castShadow=ferns.receiveShadow=true; scene.add(ferns);

  // Grass grows in irregular clumps and does not cross the clear stream channel.
  const grassPositions:number[]=[];
  const grassColors:number[]=[];
  for(let i=0;i<4200;i++) {
    const z=8-random()*59, side=random()>.5?1:-1;
    const x=streamCenter(z)+side*(streamWidth(z)+.15+random()*9);
    const y=yBank(x,z), h=.10+random()*.36, w=.008+random()*.01;
    const a=random()*Math.PI*2, dx=Math.cos(a)*w, dz=Math.sin(a)*w;
    const bendX=Math.sin(a+.5)*h*.28,bendZ=Math.cos(a)*h*.2;
    grassPositions.push(x-dx,y,z-dz,x+dx,y,z+dz,x+bendX,y+h,z+bendZ);
    leafColor.setHSL(.20+random()*.065,.31+random()*.3,.20+random()*.19);
    for(let j=0;j<3;j++)grassColors.push(leafColor.r,leafColor.g,leafColor.b);
  }
  const grassGeo=new THREE.BufferGeometry(); grassGeo.setAttribute('position',new THREE.Float32BufferAttribute(grassPositions,3));
  grassGeo.setAttribute('color',new THREE.Float32BufferAttribute(grassColors,3)); grassGeo.computeVertexNormals();
  const grasses=new THREE.Mesh(grassGeo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.93,side:THREE.DoubleSide}));
  grasses.receiveShadow=true; scene.add(grasses);

  const sky = new THREE.Mesh(new THREE.SphereGeometry(90,24,12),new THREE.ShaderMaterial({
    side:THREE.BackSide,depthWrite:false,
    vertexShader:'varying vec3 vDirection; void main(){vDirection=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec3 vDirection; void main(){
      vec3 d=normalize(vDirection); float h=max(d.y,0.);
      vec3 col=mix(vec3(.69,.79,.69),vec3(.35,.61,.68),pow(h,.65));
      float sunlight=pow(max(dot(d,normalize(vec3(-8.,16.,-8.))),0.),18.);
      col+=vec3(.22,.17,.06)*sunlight;
      gl_FragColor=vec4(col,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    `,
  })); scene.add(sky);

  // Clear surface: Fresnel forest reflection, directional micro-ripples and a local impulse.
  // Reflected foliage is captured once from the actual 3D environment, not a sky image.
  const reflectionTarget = new THREE.WebGLCubeRenderTarget(256,{generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter,type:THREE.HalfFloatType});
  const reflectionCamera = new THREE.CubeCamera(.1,100,reflectionTarget);
  reflectionCamera.position.set(0,.22,-5);
  reflectionCamera.update(renderer,scene);
  const refractionTarget = new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});
  const refractionSize = new THREE.Vector2(1,1);
  const waterMat = new THREE.ShaderMaterial({
    depthWrite:true,side:THREE.DoubleSide,
    uniforms:{uValleyTime:clock,uImpulse:ripple,uReflection:{value:reflectionTarget.texture},uRefraction:{value:refractionTarget.texture},uResolution:{value:refractionSize}},
    vertexShader:`
      uniform float uValleyTime; uniform vec4 uImpulse; varying vec3 vWaterWorld;
      float impulse(vec2 p) {
        float elapsed=uValleyTime-uImpulse.z;
        float d=length(p-uImpulse.xy);
        return sin(d*18.-elapsed*3.5)*exp(-pow((d-elapsed*.70)*2.2,2.))*exp(-elapsed*.55)*.014*step(0.,elapsed)*uImpulse.w;
      }
      void main(){
        vec3 p=position;
        p.y+=sin(p.z*3.1+uValleyTime*.47+sin(p.x*1.4))*.009+sin(p.x*4.1-p.z*1.5+uValleyTime*.35)*.004;
        p.y+=impulse(p.xz);
        vWaterWorld=(modelMatrix*vec4(p,1.)).xyz;
        gl_Position=projectionMatrix*viewMatrix*vec4(vWaterWorld,1.);
      }
    `,
    fragmentShader:`
      uniform float uValleyTime; uniform vec4 uImpulse; uniform samplerCube uReflection;
      uniform sampler2D uRefraction; uniform vec2 uResolution;
      varying vec3 vWaterWorld;
      float heightAt(vec2 p) {
        float a=sin(p.y*3.1+uValleyTime*.47+sin(p.x*1.4))*.014;
        a+=sin(p.x*5.1-p.y*2.1+uValleyTime*.35)*.009;
        a+=sin(p.x*14.+p.y*11.-uValleyTime*.6)*.0017;
        float elapsed=uValleyTime-uImpulse.z;
        float d=length(p-uImpulse.xy);
        a+=sin(d*18.-elapsed*3.5)*exp(-pow((d-elapsed*.70)*2.2,2.))*exp(-elapsed*.55)*.014*step(0.,elapsed)*uImpulse.w;
        return a;
      }
      void main(){
        vec2 p=vWaterWorld.xz; float e=.022;
        vec3 n=normalize(vec3(heightAt(p-vec2(e,0))-heightAt(p+vec2(e,0)),e*2.,heightAt(p-vec2(0,e))-heightAt(p+vec2(0,e))));
        vec3 eye=normalize(cameraPosition-vWaterWorld);
        float fresnel=.018+.78*pow(1.-max(dot(eye,n),0.),4.);
        vec3 reflected=textureCube(uReflection,reflect(-eye,n)).rgb;
        vec2 uv=gl_FragCoord.xy/uResolution;
        vec2 offset=n.xz*.011*min(1.,2.5/length(cameraPosition-vWaterWorld));
        vec3 bedColor=texture2D(uRefraction,clamp(uv+offset,vec2(.001),vec2(.999))).rgb;
        bedColor*=vec3(.92,.98,.94);
        vec3 col=mix(bedColor,reflected,.035+fresnel*.55);
        float sunlight=pow(max(dot(reflect(-normalize(vec3(-8.,16.,-8.)),n),eye),0.),210.);
        col+=vec3(1.,.92,.65)*sunlight*.55;
        gl_FragColor=vec4(col,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const waterGeometry=new THREE.PlaneGeometry(1,66,38,240); waterGeometry.rotateX(-Math.PI/2);
  const wp=waterGeometry.attributes.position;
  for(let i=0;i<wp.count;i++) {
    const z=wp.getZ(i)-18, x=streamCenter(z)+wp.getX(i)*streamWidth(z)*2.15;
    wp.setXYZ(i,x,waterY,z);
  }
  waterGeometry.computeVertexNormals();
  const water=new THREE.Mesh(waterGeometry,waterMat); water.renderOrder=5; scene.add(water);

  // Small fish stay below the surface and steer gently after an impulse.
  const fishMaterial=new THREE.MeshStandardMaterial({color:'#626652',roughness:.62,metalness:.12});
  const fishBodyGeo=new THREE.SphereGeometry(1,12,7);
  const tailGeometry=new THREE.BufferGeometry();
  tailGeometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,-.078,.034,-.06,-.078,-.034,-.06,0,0,0,-.078,-.034,-.06,-.09,0,.07],3));
  tailGeometry.computeVertexNormals();
  const tailMaterial=new THREE.MeshStandardMaterial({color:'#686f55',roughness:.78,side:THREE.DoubleSide});
  const fish:Array<{group:THREE.Group;tail:THREE.Mesh;origin:THREE.Vector3;phase:number;heading:number;turn:number;targetTurn:number}> = [];
  for(let i=0;i<8;i++) {
    const group=new THREE.Group();
    const body=new THREE.Mesh(fishBodyGeo,fishMaterial); body.scale.set(.095,.024,.027); group.add(body);
    const tail=new THREE.Mesh(tailGeometry,tailMaterial); tail.position.x=-.085; group.add(tail);
    const origin=new THREE.Vector3((random()-.5)*2.1,-.13-random()*.055,1.5-random()*7);
    group.position.copy(origin); group.rotation.y=random()*6;
    scene.add(group);fish.push({group,tail,origin,phase:random()*6,heading:group.rotation.y,turn:0,targetTurn:0});
  }

  // Thin moving highlights downstream of rocks, restrained enough to remain restful.
  const glints:number[]=[];
  for(let i=0;i<100;i++) {
    const z=4-random()*28;
    glints.push(streamCenter(z)+(random()-.5)*streamWidth(z)*1.6,waterY+.025,z);
  }
  const glintGeometry=new THREE.BufferGeometry();glintGeometry.setAttribute('position',new THREE.Float32BufferAttribute(glints,3));
  const glintMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uValleyTime:clock},
    vertexShader:`uniform float uValleyTime; varying float vAlpha;void main(){vec3 p=position;p.z+=sin(uValleyTime*.23+p.x)*.14;vAlpha=.17+.16*sin(uValleyTime*.65+p.z*1.8);vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=clamp(12./-mv.z,1.,2.4);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:'varying float vAlpha;void main(){float a=1.-smoothstep(.05,.50,length(gl_PointCoord-.5));gl_FragColor=vec4(.93,.96,.75,a*vAlpha);}',
  });
  const glintPoints=new THREE.Points(glintGeometry,glintMaterial);glintPoints.renderOrder=6;scene.add(glintPoints);
  // Full native-size scene-color refraction. This is invoked after the shared
  // runtime applies bounded camera look, so refraction and the main view agree.
  // The shadow map is reused; refraction never doubles the static forest shadow pass.
  water.onBeforeRender=()=>{
    renderer.getDrawingBufferSize(refractionSize);
    if(refractionTarget.width!==refractionSize.x||refractionTarget.height!==refractionSize.y)refractionTarget.setSize(refractionSize.x,refractionSize.y);
    const oldTarget=renderer.getRenderTarget();
    const oldAutoUpdate=renderer.shadowMap.autoUpdate;
    const oldNeedsUpdate=renderer.shadowMap.needsUpdate;
    water.visible=false; glintPoints.visible=false;
    renderer.shadowMap.autoUpdate=false; renderer.shadowMap.needsUpdate=false;
    renderer.setRenderTarget(refractionTarget);
    renderer.render(scene,camera);
    renderer.setRenderTarget(oldTarget);
    renderer.shadowMap.autoUpdate=oldAutoUpdate; renderer.shadowMap.needsUpdate=oldNeedsUpdate;
    water.visible=true; glintPoints.visible=true;
  };
  const raycaster=new THREE.Raycaster();
  const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-waterY);
  const hit=new THREE.Vector3();
  function resize(width:number,height:number) {
    const portrait=width/height<.8;
    camera.aspect=width/height;
    camera.fov=portrait?59:53;
    camera.position.set(portrait?.20:.32,portrait?1.42:1.30,portrait?6.95:6.65);
    camera.lookAt(portrait?.05:-.30,portrait?.16:.78,portrait?-3.0:-8.0);
    camera.updateProjectionMatrix();
  }
  resize(16,9);
  return {
    scene,camera,resize,
    update(time,dt){
      clock.value=time;
      fish.forEach(f=>{
        const step=Math.min(dt,.1);
        f.targetTurn*=Math.exp(-step*.15);
        f.turn+=(f.targetTurn-f.turn)*(1-Math.exp(-step*.75));
        f.group.position.set(f.origin.x+Math.sin(time*.13+f.phase)*.44,f.origin.y+Math.sin(time*.20+f.phase)*.008,f.origin.z+Math.cos(time*.12+f.phase)*.28);
        f.group.rotation.y=f.heading+Math.sin(time*.11+f.phase)*.26+f.turn;
        f.tail.rotation.y=Math.sin(time*2.5+f.phase)*.16;
      });
    },
    interact(x,y,time){
      raycaster.setFromCamera(new THREE.Vector2(x,y),camera);
      if(!raycaster.ray.intersectPlane(plane,hit)||hit.z>6.4||hit.z<-36||Math.abs(hit.x-streamCenter(hit.z))>streamWidth(hit.z))return null;
      const obstruction=raycaster.intersectObjects(boulderObjects,false)[0];
      if(obstruction&&obstruction.distance<raycaster.ray.origin.distanceTo(hit)-.018)return null;
      ripple.value.set(hit.x,hit.z,time,1);
      fish.forEach(f=>{const distance=f.group.position.distanceTo(hit);if(distance<3)f.targetTurn=THREE.MathUtils.clamp(f.targetTurn+(f.origin.x>hit.x?1:-1)*.42*(1-distance/3),-.6,.6);});
      return {world:'summer-valley',kind:'ripple',strength:.35,position:{x:hit.x,z:hit.z}};
    },
    dispose(){reflectionTarget.dispose();refractionTarget.dispose();},
  };
}
