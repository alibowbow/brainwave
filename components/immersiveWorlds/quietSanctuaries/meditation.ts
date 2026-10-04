import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import type { SanctuaryBuilder } from './worldTypes';

/** Original geometry and deterministic material maps. No downloaded artwork. */
export const buildMeditationCourt: SanctuaryBuilder = (renderer) => {
  const floatColorBuffer = renderer.extensions.has('EXT_color_buffer_float');
  const halfFloatColorBuffer = renderer.extensions.has('EXT_color_buffer_half_float');
  const supportsHalfFloatColor = floatColorBuffer || halfFloatColorBuffer;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#bdd1d4');
  scene.fog = new THREE.Fog('#c8d1c5', 23, 70);
  const camera = new THREE.PerspectiveCamera(51, 1, 0.06, 110);
  let seed = 4411;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const textures: THREE.Texture[] = [];

  // Broad sky and stone bounce for the metal's microfacets. Basin reflection below
  // uses the actual scene; this modest environment only supplies indirect light.
  const faces = Array.from({ length: 6 }, (_, face) => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 64);
    if (face === 2) { gradient.addColorStop(0, '#cbdfe2'); gradient.addColorStop(1, '#dfdac6'); }
    else if (face === 3) { gradient.addColorStop(0, '#82745d'); gradient.addColorStop(1, '#afa087'); }
    else { gradient.addColorStop(0, '#c3d8da'); gradient.addColorStop(.45, '#ded8c0'); gradient.addColorStop(1, '#97856a'); }
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 64, 64);
    if (face === 1 || face === 5) { ctx.fillStyle = '#eae1c9'; ctx.fillRect(8, 15, 13, 36); }
    return canvas;
  });
  const environment = new THREE.CubeTexture(faces); environment.colorSpace = THREE.SRGBColorSpace; environment.needsUpdate = true;
  // Three's automatic PMREM also allocates half-float color targets. On the byte
  // compatibility path retain direct/hemisphere lighting without invoking PMREM.
  scene.environment = supportsHalfFloatColor ? environment : null;
  scene.environmentIntensity = .42; textures.push(environment);

  function texture(kind: 'stone' | 'wood' | 'bronze' | 'soil', size = 256) {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const pixels = ctx.createImageData(size, size);
    const lattice = Array.from({ length: 33 * 33 }, () => random());
    const smoothNoise = (x: number, y: number, scale: number) => {
      const gx = x / size * scale, gy = y / size * scale;
      const ix = Math.floor(gx), iy = Math.floor(gy); let fx = gx - ix, fy = gy - iy;
      fx *= fx * (3 - 2 * fx); fy *= fy * (3 - 2 * fy);
      const a = lattice[(iy % 32) * 33 + ix % 32], b = lattice[(iy % 32) * 33 + (ix + 1) % 32];
      const c = lattice[((iy + 1) % 32) * 33 + ix % 32], d = lattice[((iy + 1) % 32) * 33 + (ix + 1) % 32];
      return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
    };
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      let value = 190 + (random() - 0.5) * 32;
      if (kind === 'wood') value = 134 + 21 * Math.sin(x * .31 + 2 * Math.sin(y * .012)) + 11 * Math.sin(x * 1.3 + Math.sin(y * .05)) + random() * 22;
      if (kind === 'stone') value = 209 + smoothNoise(x, y, 5) * 23 + smoothNoise(x, y, 17) * 13 + (random() - .5) * 9;
      if (kind === 'soil') value = 84 + random() * 80;
      if (kind === 'bronze') value = 165 + 14 * Math.sin(x * .7) * Math.sin(y * .7) + random() * 24;
      pixels.data[i] = value; pixels.data[i + 1] = value; pixels.data[i + 2] = value; pixels.data[i + 3] = 255;
    }
    ctx.putImageData(pixels, 0, 0);
    if (kind === 'stone') {
      for (let i = 0; i < 3500; i++) {
        ctx.fillStyle = random() < .56 ? 'rgba(80,76,64,0.20)' : 'rgba(255,255,248,0.29)';
        ctx.beginPath(); ctx.ellipse(random() * size, random() * size, .35 + random() * 1.7, .2 + random() * .9, random() * 3, 0, Math.PI * 2); ctx.fill();
      }
    }
    const map = new THREE.CanvasTexture(canvas); map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    textures.push(map); return map;
  }
  const stoneMap = texture('stone', 512); stoneMap.repeat.set(2, 2); stoneMap.colorSpace = THREE.SRGBColorSpace;
  const limewashMap = stoneMap.clone(); limewashMap.repeat.set(1.4, 1.4); textures.push(limewashMap);
  const woodMap = texture('wood'); woodMap.repeat.set(1, 3);
  const bronzeMap = texture('bronze'); bronzeMap.repeat.set(3, 1);
  const soilMap = texture('soil'); soilMap.repeat.set(4, 4);
  const limestone = new THREE.MeshStandardMaterial({ color: '#ded8c8', roughness: .93, map: stoneMap, bumpMap: stoneMap, bumpScale: .032 });
  const plaster = new THREE.MeshStandardMaterial({ color: '#d8d0bb', roughness: .96, map: limewashMap, bumpMap: limewashMap, bumpScale: .02 });
  const wornEdge = new THREE.MeshStandardMaterial({ color: '#c6bca7', roughness: .88, map: stoneMap, bumpMap: stoneMap, bumpScale: .020 });
  const warmWood = new THREE.MeshStandardMaterial({ color: '#6c4930', roughness: .73, map: woodMap, bumpMap: woodMap, bumpScale: .025 });
  const paleWood = new THREE.MeshStandardMaterial({ color: '#a17a50', roughness: .79, map: woodMap, bumpMap: woodMap, bumpScale: .025 });
  const brass = new THREE.MeshStandardMaterial({ color: '#b59856', metalness: .79, roughness: .32, bumpMap: bronzeMap, bumpScale: .015 });
  const soil = new THREE.MeshStandardMaterial({ color: '#514d36', roughness: 1, map: soilMap, bumpMap: soilMap, bumpScale: .035 });
  const bark = new THREE.MeshStandardMaterial({ color: '#655643', roughness: .97, map: woodMap, bumpMap: woodMap, bumpScale: .085 });
  const green = new THREE.MeshStandardMaterial({ color: '#626d3e', roughness: .84, side: THREE.DoubleSide });
  const leafSilver = new THREE.MeshStandardMaterial({ color: '#8f9671', roughness: .84, side: THREE.DoubleSide });
  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0, shadow = true) => {
    const object = new THREE.Mesh(geometry, material); object.position.set(x, y, z);
    object.castShadow = shadow; object.receiveShadow = true; scene.add(object); return object;
  };
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material) => mesh(new THREE.BoxGeometry(w, h, d), material, x, y, z);
  function branch(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number, material = bark) {
    const mid = a.clone().add(b).multiplyScalar(.5);
    const out = mesh(new THREE.CylinderGeometry(r1, r0, a.distanceTo(b), 9), material, mid.x, mid.y, mid.z);
    out.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); return out;
  }
  function organicBranch(points: THREE.Vector3[], radius: number, tipRadius: number) {
    const curve = new THREE.CatmullRomCurve3(points); const segments = Math.max(12, points.length * 9);
    const geometry = new THREE.TubeGeometry(curve, segments, radius, 9, false);
    const positions = geometry.getAttribute('position'); const vertex = new THREE.Vector3();
    for (let i = 0; i <= segments; i++) {
      const t = i / segments, center = curve.getPointAt(t), fraction = THREE.MathUtils.lerp(radius, tipRadius, t) / radius;
      for (let j = 0; j <= 9; j++) {
        const index = i * 10 + j; vertex.fromBufferAttribute(positions, index).sub(center).multiplyScalar(fraction).add(center);
        positions.setXYZ(index, vertex.x, vertex.y, vertex.z);
      }
    }
    geometry.computeVertexNormals(); return mesh(geometry, bark);
  }

  // The sky is spatial and lights the open portal; it is not a background picture.
  const sky = mesh(new THREE.SphereGeometry(85, 24, 12), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    vertexShader: 'varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: 'varying vec3 vPos; void main(){ float h=clamp(normalize(vPos).y*.9+.13,0.,1.); vec3 c=mix(vec3(.89,.81,.64),vec3(.43,.65,.72),pow(h,.56)); gl_FragColor=vec4(c,1.);\n #include <tonemapping_fragment>\n #include <colorspace_fragment>\n }',
  }), 0, 0, 0, false);
  sky.frustumCulled = false;
  scene.add(new THREE.HemisphereLight('#c9dce5', '#817662', 1.25));
  const sunlight = new THREE.DirectionalLight('#ffead0', 3.4); sunlight.position.set(-8.5, 8, 3.5);
  sunlight.castShadow = true; sunlight.shadow.mapSize.set(2048, 2048);
  Object.assign(sunlight.shadow.camera, { left: -11, right: 11, top: 10, bottom: -10, near: .1, far: 36 });
  sunlight.shadow.normalBias = .035; sunlight.shadow.bias = -.00012; sunlight.shadow.radius = 3;
  sunlight.target.position.set(0, 0, -3); scene.add(sunlight, sunlight.target);
  const bounce = new THREE.PointLight('#ffd999', 7, 7, 2); bounce.position.set(-3, 1.8, 1); scene.add(bounce);

  // Individually jointed large limestone slabs, with restrained variation.
  box(0, -.17, -4, 18, .28, 27, wornEdge);
  const floorGeometry = new THREE.BoxGeometry(1.16, .075, 1.39);
  const floorMaterial = limestone.clone(); floorMaterial.color.set('#d0c7b5');
  const paving = new THREE.InstancedMesh(floorGeometry, floorMaterial, 210);
  const dummy = new THREE.Object3D(); const tint = new THREE.Color();
  let pavingIndex = 0;
  for (let row = 0; row < 14; row++) for (let col = 0; col < 15; col++) {
    dummy.position.set((col - 7) * 1.185 + (row % 2) * .59, -.035 + random() * .006, 3.3 - row * 1.415);
    dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); paving.setMatrixAt(pavingIndex, dummy.matrix);
    tint.setHSL(.103 + random() * .012, .14 + random() * .035, .73 + random() * .08); paving.setColorAt(pavingIndex++, tint);
  }
  paving.receiveShadow = true; scene.add(paving);

  // Real arch masonry: an open center with separate curved overhead geometry.
  const archCenter = -.7, archRadius = 1.75, springHeight = 2.4, wallZ = -9.3;
  box(-5.05, 2.65, wallZ, 5.2, 5.3, .7, plaster);
  box(4.2, 2.65, wallZ, 6.3, 5.3, .7, plaster);
  const archShape = new THREE.Shape();
  archShape.moveTo(archCenter - archRadius, 5.3); archShape.lineTo(archCenter + archRadius, 5.3);
  archShape.lineTo(archCenter + archRadius, springHeight);
  archShape.absarc(archCenter, springHeight, archRadius, 0, Math.PI, false);
  archShape.lineTo(archCenter - archRadius, 5.3);
  const arch = mesh(new THREE.ExtrudeGeometry(archShape, { depth: .7, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .025, bevelThickness: .025, curveSegments: 48 }), plaster, 0, 0, wallZ - .35);
  arch.name = 'open-stone-arch';
  // Narrow limestone voussoirs articulate the opening rather than decorating a flat wall.
  const trimShape = new THREE.Shape();
  trimShape.absarc(0, 0, archRadius + .16, 0, Math.PI, false);
  trimShape.absarc(0, 0, archRadius, Math.PI, 0, true);
  trimShape.closePath();
  mesh(new THREE.ExtrudeGeometry(trimShape, { depth: .09, bevelEnabled: false, curveSegments: 64 }), wornEdge, archCenter, springHeight, wallZ + .36);
  box(archCenter - archRadius - .08, springHeight / 2, wallZ + .405, .16, springHeight, .1, wornEdge);
  box(archCenter + archRadius + .08, springHeight / 2, wallZ + .405, .16, springHeight, .1, wornEdge);
  box(0, 5.32, wallZ, 15.3, .15, .84, wornEdge);
  // A deeply recessed niche and low bench to the right.
  box(4.55, 1.06, -8.8, 3.7, .45, .88, limestone);
  box(4.55, .44, -8.8, 3.25, .84, .60, plaster);
  const nicheBack = new THREE.MeshStandardMaterial({ color: '#a89474', roughness: 1 });
  box(4.72, 2.43, -8.915, 1.16, 1.12, .05, nicheBack);
  box(4.06, 2.43, -8.74, .14, 1.28, .36, wornEdge); box(5.38, 2.43, -8.74, .14, 1.28, .36, wornEdge);
  box(4.72, 3.04, -8.74, 1.45, .14, .36, wornEdge); box(4.72, 1.82, -8.74, 1.45, .14, .36, wornEdge);

  // Pergola on one side; clear open sky and a changing band of real shadow on stone.
  box(-5.58, 2.15, -3.45, .44, 4.3, 12.3, plaster);
  box(6.1, .7, -3.7, .6, 1.4, 12.5, plaster);
  for (const z of [1.2, -3.1, -7.55]) {
    box(-3.52, 1.68, z, .18, 3.36, .21, warmWood);
    box(-3.52, .12, z, .32, .24, .34, limestone);
    box(-4.53, 3.34, z, 2.65, .20, .23, warmWood);
    branch(new THREE.Vector3(-3.52, 2.75, z), new THREE.Vector3(-4.15, 3.27, z), .055, .055, warmWood);
  }
  box(-3.48, 3.54, -3.18, .21, .25, 9.6, warmWood);
  box(-5.36, 3.54, -3.18, .21, .25, 9.6, warmWood);
  for (let i = 0; i < 23; i++) box(-4.38, 3.69, 1.48 - i * .43, 2.72, .1, .09, paleWood);
  // A timber bench anchors the near left edge and establishes human scale.
  box(-4.08, .47, -.35, .88, .10, 3.2, paleWood);
  box(-4.08, .22, .83, .7, .43, .16, warmWood); box(-4.08, .22, -1.48, .7, .43, .16, warmWood);

  // A continuous, bevelled stone basin. Its visible water has actual reflected geometry.
  function roundedRect(shape: THREE.Shape | THREE.Path, w: number, h: number, r: number) {
    shape.moveTo(-w / 2 + r, -h / 2); shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  }
  const rimShape = new THREE.Shape(); roundedRect(rimShape, 5.12, 5.56, .2);
  const basinHole = new THREE.Path(); roundedRect(basinHole, 4.55, 4.99, .14); rimShape.holes.push(basinHole);
  const rim = mesh(new THREE.ExtrudeGeometry(rimShape, { depth: .30, bevelEnabled: true, bevelSegments: 3, bevelSize: .035, bevelThickness: .035, curveSegments: 12 }), limestone, .05, .12, -2.1);
  rim.rotation.x = -Math.PI / 2; rim.name = 'hand-finished-basin-rim';
  box(.05, .09, -2.1, 5.09, .12, 5.53, wornEdge);
  const rippleUniforms = { color: { value: new THREE.Color('#82918a') }, tDiffuse: { value: null }, textureMatrix: { value: null }, uTime: { value: 0 }, uTouch: { value: new THREE.Vector3(.5, .5, -100) } };
  const water = new Reflector(new THREE.PlaneGeometry(4.57, 5.01), {
    textureWidth: 1024, textureHeight: 1024, clipBias: .004, multisample: 0,
    shader: {
      uniforms: rippleUniforms,
      vertexShader: `uniform mat4 textureMatrix; varying vec4 vRef; varying vec2 vSurface; varying vec3 vWorld;
        void main(){ vSurface=uv; vRef=textureMatrix*vec4(position,1.); vWorld=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform vec3 uTouch;
        varying vec4 vRef; varying vec2 vSurface; varying vec3 vWorld;
        void main(){
          vec2 p=vSurface; float age=max(0.,uTime-uTouch.z); vec2 d=(p-uTouch.xy)*vec2(4.57,5.01); float radius=length(d);
          float front=radius-age*.64;
          float envelope=exp(-front*front*23.)*exp(-age*.45)*smoothstep(0.,.10,age)*(1.-smoothstep(6.,9.,age));
          float wave=sin(front*27.)*envelope;
          float edge=smoothstep(0.,.065,min(min(p.x,1.-p.x),min(p.y,1.-p.y)));
          vec2 distort=vec2(sin(p.x*36.+p.y*17.+uTime*.3),cos(p.x*23.-p.y*29.+uTime*.27))*.0007;
          distort+=normalize(d+vec2(.0001))*wave*.004*edge;
          vec2 reflectionUv=vRef.xy/vRef.w+distort;
          vec3 reflection=texture2D(tDiffuse,reflectionUv).rgb;
          vec3 viewDir=normalize(cameraPosition-vWorld); float fresnel=pow(1.-max(viewDir.y,0.),2.1);
          vec3 waterColor=mix(vec3(.135,.235,.205),vec3(.25,.32,.245),.5+.5*sin(p.y*2.8));
          vec3 c=mix(waterColor,reflection,.48+fresnel*.45);
          c+=vec3(.095,.11,.082)*wave*edge;
          c=mix(c*.71,c,edge); gl_FragColor=vec4(c,1.);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    },
  });
  // Reflector r186 constructs an RGBA HalfFloat target, but WebGL2 alone does
  // not guarantee that RGBA16F is color-renderable. Enable the advertised
  // color-buffer extension and choose the target type before its first use.
  // The target is still unallocated here, so no stale GPU attachment survives.
  const reflectionTarget = water.getRenderTarget();
  reflectionTarget.texture.type = supportsHalfFloatColor
    ? THREE.HalfFloatType : THREE.UnsignedByteType;
  renderer.domElement.dataset.reflectionTargetType = reflectionTarget.texture.type === THREE.HalfFloatType ? 'half-float' : 'unsigned-byte';
  renderer.domElement.dataset.reflectionFloatExtension = String(floatColorBuffer);
  renderer.domElement.dataset.reflectionHalfFloatExtension = String(halfFloatColorBuffer);
  water.rotation.x = -Math.PI / 2; water.position.set(.05, .392, -2.1); water.name = 'bounded-reflective-water'; scene.add(water);
  const waterMaterial = water.material as THREE.ShaderMaterial;
  // One tiny carved spout, with a barely moving thread of water.
  box(-.98, .66, -5.14, .50, .40, .50, wornEdge);
  box(-.98, .78, -4.82, .17, .06, .72, brass);
  const trickle = mesh(new THREE.CylinderGeometry(.009, .013, .355, 7), new THREE.MeshPhysicalMaterial({ color: '#b7d0c8', roughness: .07, metalness: .10, transparent: true, opacity: .55 }), -.98, .588, -4.48, false);

  // Singing bowl made from a double-sided lathe profile, with rolled lip and separate foot.
  const bowlGroup = new THREE.Group(); bowlGroup.position.set(2.17, .47, .31); scene.add(bowlGroup);
  const profile = [[.075, 0], [.20, .018], [.28, .07], [.35, .16], [.39, .26], [.405, .31], [.39, .318], [.372, .27], [.329, .17], [.258, .09], [.175, .065], [.075, .06]].map(([x, y]) => new THREE.Vector2(x, y));
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(profile, 72), brass); bowl.castShadow = bowl.receiveShadow = true; bowlGroup.add(bowl); bowl.name = 'touch-brass-bowl';
  const lip = new THREE.Mesh(new THREE.TorusGeometry(.398, .009, 8, 72), brass); lip.rotation.x = Math.PI / 2; lip.position.y = .313; bowlGroup.add(lip);
  const foot = new THREE.Mesh(new THREE.TorusGeometry(.15, .024, 9, 48), brass); foot.rotation.x = Math.PI / 2; foot.position.y = .017; bowlGroup.add(foot);
  const striker = mesh(new THREE.CylinderGeometry(.032, .037, .68, 12), warmWood, 2.21, .49, -.38); striker.rotation.set(Math.PI / 2, 0, -.31);
  const strikerTip = mesh(new THREE.SphereGeometry(.061, 14, 9), new THREE.MeshStandardMaterial({ color: '#6c5847', roughness: 1 }), 2.31, .49, -.07); strikerTip.scale.set(1, 1, 1.5);

  // Mature, asymmetric olive tree. Fine lanceolate leaves are instanced, never blob foliage.
  const treeBase = new THREE.Vector3(3.98, 0, -5.25);
  box(4.21, .06, -5.45, 2.78, .12, 3.53, soil);
  for (const z of [-3.62, -7.28]) box(4.21, .105, z, 2.95, .21, .14, wornEdge);
  box(2.72, .105, -5.45, .14, .21, 3.8, wornEdge);
  const trunkPoints = [treeBase, new THREE.Vector3(3.84, .9, -5.26), new THREE.Vector3(4.03, 1.76, -5.29), new THREE.Vector3(3.69, 2.55, -5.40), new THREE.Vector3(3.81, 3.21, -5.51)];
  organicBranch(trunkPoints, .20, .055);
  for (let i = 0; i < 7; i++) {
    const a = i * .95;
    branch(treeBase.clone().add(new THREE.Vector3(0, .15, 0)), treeBase.clone().add(new THREE.Vector3(Math.cos(a) * .49, .035, Math.sin(a) * .48)), .10, .026);
  }
  const leafShape = new THREE.Shape(); leafShape.moveTo(0, -.1); leafShape.quadraticCurveTo(.05, -.01, 0, .12); leafShape.quadraticCurveTo(-.05, -.01, 0, -.1);
  const leafGeometry = new THREE.ShapeGeometry(leafShape, 3);
  const leaves = new THREE.InstancedMesh(leafGeometry, green, 1960); leaves.castShadow = true;
  const silverLeaves = new THREE.InstancedMesh(leafGeometry, leafSilver, 640); silverLeaves.castShadow = true;
  let leafIndex = 0, silverIndex = 0;
  const canopy = new THREE.Group(); scene.add(canopy); canopy.add(leaves, silverLeaves);
  for (let b = 0; b < 14; b++) {
    const theta = b * 2.399, reach = 1.03 + random() * .84;
    const start = trunkPoints[2 + b % 2];
    const tip = new THREE.Vector3(3.8 + Math.cos(theta) * reach, 2.8 + random() * 1.25, -5.4 + Math.sin(theta) * reach);
    const elbow = start.clone().lerp(tip, .56); elbow.y += .25;
    organicBranch([start, elbow, tip], .077, .009);
    for (let j = 0; j < 180; j++) {
      const a = random() * Math.PI * 2, r = Math.sqrt(random()) * .84;
      dummy.position.set(tip.x + Math.cos(a) * r, tip.y + (random() - .5) * .8, tip.z + Math.sin(a) * r * .76);
      dummy.rotation.set(random() * 2, random() * 6.28, random() * 6.28);
      const s = .65 + random() * .57; dummy.scale.set(s, s, s); dummy.updateMatrix();
      if (j % 4 === 0 && silverIndex < 640) silverLeaves.setMatrixAt(silverIndex++, dummy.matrix);
      else if (leafIndex < 1960) leaves.setMatrixAt(leafIndex++, dummy.matrix);
    }
  }
  leaves.count = leafIndex; silverLeaves.count = silverIndex;

  // Low planting and irregular pebbles soften the precise basin edge.
  const pebbleGeometry = new THREE.IcosahedronGeometry(1, 1);
  const pebbles = new THREE.InstancedMesh(pebbleGeometry, wornEdge, 76);
  for (let i = 0; i < 76; i++) {
    dummy.position.set(2.94 + random() * 2.6, .1 + random() * .035, -3.86 - random() * 3.07);
    dummy.rotation.set(random() * 3, random() * 3, random() * 3); dummy.scale.set(.035 + random() * .07, .025 + random() * .028, .04 + random() * .07); dummy.updateMatrix(); pebbles.setMatrixAt(i, dummy.matrix);
  }
  pebbles.castShadow = pebbles.receiveShadow = true; scene.add(pebbles);
  const grass = new THREE.InstancedMesh(new THREE.PlaneGeometry(.025, .28), green, 220);
  for (let i = 0; i < 220; i++) {
    const patch = i % 4, a = random() * 6.28, r = random() * .24;
    dummy.position.set(3.06 + patch * .66 + Math.cos(a) * r, .20, -3.98 + Math.sin(a) * r);
    dummy.rotation.set((random() - .5) * .6, random() * 6.28, (random() - .5) * .5); dummy.scale.set(1, .65 + random() * .7, 1); dummy.updateMatrix(); grass.setMatrixAt(i, dummy.matrix);
  }
  scene.add(grass);

  // Through the portal, a genuine distant garden leads to softly lit hills.
  const gardenMat = new THREE.MeshStandardMaterial({ color: '#758565', roughness: 1 });
  box(-.7, -.09, -22, 15, .12, 24, gardenMat);
  box(-.7, -.01, -17, 2.8, .045, 15, limestone);
  box(-4.4, .45, -18.5, .65, .9, 15, plaster); box(3.1, .45, -18.5, .65, .9, 15, plaster);
  const distantLeaves = new THREE.MeshStandardMaterial({ color: '#596c51', roughness: 1 });
  const cypressFoliage = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), distantLeaves, 240);
  let cypressIndex = 0;
  for (const [x, z, h] of [[-3.4, -13.8, 4.0], [2.0, -16.5, 4.5], [-2.7, -21.2, 4.7], [1.7, -24, 4.8]]) {
    mesh(new THREE.CylinderGeometry(.06, .1, h, 8), bark, x, h / 2, z);
    for (let i = 0; i < 60; i++) {
      const t = i / 60, a = i * 2.399, width = Math.pow(Math.sin(Math.PI * (t * .91 + .055)), .7) * (.44 - t * .20);
      dummy.position.set(x + Math.cos(a) * width * .5 + Math.sin(t * 5) * .065, .32 + t * h, z + Math.sin(a) * width * .5);
      dummy.rotation.set(random() * .3, a, random() * .3);
      dummy.scale.set(width * (.73 + random() * .17), .17 + width * .46, width * (.7 + random() * .22)); dummy.updateMatrix();
      cypressFoliage.setMatrixAt(cypressIndex, dummy.matrix); tint.setHSL(.285 + random() * .03, .17, .29 + random() * .09); cypressFoliage.setColorAt(cypressIndex++, tint);
    }
  }
  cypressFoliage.castShadow = cypressFoliage.receiveShadow = true; scene.add(cypressFoliage);
  for (let i = 0; i < 7; i++) {
    const hill = mesh(new THREE.SphereGeometry(1, 24, 12), new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(.30, .12, .43 + i * .022), roughness: 1 }), -20 + i * 7.5, -3.3, -40 - random() * 13, false);
    hill.scale.set(8 + random() * 5, 5 + random() * 6, 9);
  }

  const raycaster = new THREE.Raycaster(); let elapsed = 0; let bowlTouch = -100;
  return {
    scene, camera,
    resize(aspect) {
      camera.aspect = aspect;
      if (aspect < .85) {
        // Bring the near hand-height rim into the portrait, keeping arch and olive canopy above it.
        camera.fov = 53; camera.position.set(.77, 1.61, 3.86); camera.lookAt(.15, 1.15, -4.3);
        bowlGroup.position.set(.84, .47, .64);
      } else {
        camera.fov = aspect > 1.9 ? 49 : 53; camera.position.set(.55, 1.64, 4.16); camera.lookAt(.02, 1.42, -4.5);
        bowlGroup.position.set(2.17, .47, .31);
      }
      camera.updateProjectionMatrix();
    },
    update(time) {
      elapsed = time; waterMaterial.uniforms.uTime.value = time;
      canopy.rotation.z = Math.sin(time * .24) * .0025;
      canopy.rotation.y = Math.sin(time * .18) * .003;
      trickle.scale.x = .92 + Math.sin(time * 1.2) * .08;
      const bowlAge = time - bowlTouch;
      bowlGroup.rotation.z = bowlAge < 4 ? Math.sin(bowlAge * 7) * .0022 * Math.exp(-bowlAge) : 0;
    },
    interact(ndc) {
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(); raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects([bowl, water], false);
      if (!hits.length) return undefined;
      const hit = hits[0];
      if (hit.object === bowl) { bowlTouch = elapsed; return { kind: 'bowl', strength: .25, x: ndc.x }; }
      if (hit.uv) waterMaterial.uniforms.uTouch.value.set(hit.uv.x, hit.uv.y, elapsed);
      return { kind: 'water', strength: .24, x: ndc.x };
    },
    dispose() {
      water.getRenderTarget().dispose();
      // These procedural maps are shared by cloned scene materials. Texture.dispose is idempotent.
      textures.forEach((map) => map.dispose());
    },
  };
};
