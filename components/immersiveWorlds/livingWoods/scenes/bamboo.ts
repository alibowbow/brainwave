import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { WorldContent } from '../types';

/** Original, deterministic geometry. No downloaded scene, texture, or gallery code. */
function randomSource(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let a = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    a ^= a + Math.imul(a ^ (a >>> 7), 61 | a);
    return ((a ^ (a >>> 14)) >>> 0) / 4294967296;
  };
}

function bambooTexture() {
  const w = 128, h = 256, bytes = new Uint8Array(w * h * 4);
  const roughness = new Uint8Array(bytes.length), relief = new Uint8Array(bytes.length);
  const rng = randomSource(523);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const angle = x / w * Math.PI * 2, noise = rng() - 0.5;
    // Fine discontinuous fibres and wax bloom, not broad painted vertical stripes.
    const fibre = Math.sin(angle * 29 + Math.sin(y * 0.041) * 0.28) * 0.006
      + Math.sin(angle * 47 - y * 0.009) * 0.003;
    const bloom = Math.sin(angle * 3 + Math.sin(y * 0.037)) * Math.sin(y * 0.021 + angle) * 0.022;
    const edge = Math.exp(-y / 10) * 0.027;
    const value = THREE.MathUtils.clamp(0.875 + fibre + bloom + noise * 0.012 - edge, 0.78, 0.94);
    bytes[i] = 255 * value; bytes[i + 1] = 254 * value;
    bytes[i + 2] = 235 * value; bytes[i + 3] = 255;
    const r = 255 * THREE.MathUtils.clamp(0.87 + bloom * 1.7 + noise * 0.045, 0.78, 0.97);
    const b = 255 * (0.5 + fibre * 4 + noise * 0.09);
    roughness[i] = roughness[i + 1] = roughness[i + 2] = r; roughness[i + 3] = 255;
    relief[i] = relief[i + 1] = relief[i + 2] = b; relief[i + 3] = 255;
  }
  const make = (data: Uint8Array, color = false) => {
    const texture = new THREE.DataTexture(data, w, h);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    if (color) texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true; texture.needsUpdate = true;
    return texture;
  };
  return { map: make(bytes, true), roughnessMap: make(roughness), bumpMap: make(relief) };
}

function groundTexture() {
  const size = 128, data = new Uint8Array(size * size * 4), random = randomSource(621);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const coarse = Math.sin(x * 0.098 + Math.sin(y * 0.13) * 1.8) * Math.sin(y * 0.112 + Math.cos(x * 0.08));
    const fine = Math.sin(x * 0.62 + y * 0.82) * Math.sin(y * 0.58 - x * 0.34);
    const value = Math.floor((0.72 + coarse * 0.12 + fine * 0.045 + random() * 0.055) * 255);
    data[i] = data[i + 1] = data[i + 2] = value; data[i + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true; texture.needsUpdate = true;
  return texture;
}

const forestFloor = (x: number, z: number) => -0.035 + 0.10 * Math.sin(x * 0.27 + z * 0.12) + 0.03 * Math.sin(x * 3.7 + z);

function leafGeometry() {
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  const steps = 6;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const width = Math.sin(Math.PI * t) ** 0.7 * 0.041 * (1 - t * 0.22);
    const y = t * 0.62, bend = -Math.sin(t * Math.PI * 0.72) * 0.07;
    positions.push(-width, y, bend, 0, y, bend + width * 0.22, width, y, bend);
    uv.push(0, t, 0.5, t, 1, t);
    if (i < steps) for (let j = 0; j < 2; j++) {
      const a = i * 3 + j;
      indices.push(a, a + 3, a + 1, a + 1, a + 3, a + 4);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

type Instance = { position: THREE.Vector3; quaternion?: THREE.Quaternion; scale: THREE.Vector3; color?: THREE.Color };
function instances(geometry: THREE.BufferGeometry, material: THREE.Material, records: Instance[], shadows = true) {
  const mesh = new THREE.InstancedMesh(geometry, material, records.length);
  const m = new THREE.Matrix4(), identity = new THREE.Quaternion();
  records.forEach((r, index) => {
    m.compose(r.position, r.quaternion ?? identity, r.scale);
    mesh.setMatrixAt(index, m);
    if (r.color) mesh.setColorAt(index, r.color);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = shadows; mesh.receiveShadow = true;
  mesh.computeBoundingSphere();
  return mesh;
}

function orientedSegment(a: THREE.Vector3, b: THREE.Vector3, radius: number, color?: THREE.Color): Instance {
  const direction = b.clone().sub(a);
  return {
    position: a.clone().add(b).multiplyScalar(0.5),
    quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize()),
    scale: new THREE.Vector3(radius, direction.length(), radius), color,
  };
}

const streamCenter = (z: number) => 0.14 + Math.sin(z * 0.103 + 0.6) * 1.26 + Math.sin(z * 0.25) * 0.23;
const streamWidth = (z: number) => 1.18 + Math.sin(z * 0.15) * 0.2;
const bankRockPatch = (z: number, side: number) => Math.sin(z * 0.72 + side * 1.7) + Math.sin(z * 1.63 - side * 0.8) * 0.46;

function ribbonGeometry(left: number, right: number, y: number, water = false, bank = false) {
  const vertices: number[] = [], indices: number[] = [], uvs: number[] = [], colors: number[] = [];
  const slices = 120;
  for (let i = 0; i <= slices; i++) {
    const z = 10 - i / slices * 73;
    const center = streamCenter(z), width = streamWidth(z);
    for (let side = 0; side < 2; side++) {
      const offset = side === 0 ? left : right;
      const edge = bank ? Math.sin(z * 0.73 + offset * 4.1) * 0.105 + Math.sin(z * 1.91 - offset) * 0.045 : 0;
      const x = center + width * offset + edge;
      const h = y + (water ? 0 : Math.sin(z * 0.64 + offset) * (bank ? 0.048 : 0.03));
      if (water) vertices.push(x, -z, 0); else vertices.push(x, h, z);
      uvs.push(side, i / slices * 20);
      const light = 0.77 + Math.sin(z * 1.4 + offset * 3.9) * 0.07;
      colors.push(light, light, light);
    }
    if (i < slices) {
      const k = i * 2;
      // Both XY water and XZ banks face their visible surface: +Z before
      // water's -PI/2 rotation, +Y for banks whose z decreases per slice.
      indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

export function createBamboo(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  const rng = randomSource(241016), range = (a: number, b: number) => a + rng() * (b - a);
  const root = new THREE.Group(); root.name = 'Bamboo grove beside a clear stream'; scene.add(root);
  scene.background = new THREE.Color('#c3d5bd');
  scene.fog = new THREE.FogExp2('#aec7af', 0.023);
  const sky = new THREE.HemisphereLight('#dce9d0', '#344735', 2.05); root.add(sky);
  const sun = new THREE.DirectionalLight('#fff0b9', 3.8);
  sun.position.set(-7, 17, -12); sun.target.position.set(0, 0, -4);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -15; sun.shadow.camera.right = 15;
  sun.shadow.camera.top = 18; sun.shadow.camera.bottom = -14;
  sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 60;
  sun.shadow.normalBias = 0.065; sun.shadow.bias = -0.0003;
  sun.shadow.radius = 3; root.add(sun, sun.target);
  const bounce = new THREE.DirectionalLight('#b8d7d7', 0.55);
  bounce.position.set(4, 5, 7); root.add(bounce);

  const earthTexture = groundTexture(); earthTexture.repeat.set(22, 28);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#b1b097', map: earthTexture, bumpMap: earthTexture, bumpScale: 0.055, roughness: 1, vertexColors: true });
  const groundGeometry = new THREE.PlaneGeometry(80, 95, 40, 44); groundGeometry.rotateX(-Math.PI / 2);
  const pos = groundGeometry.attributes.position;
  const groundColors: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i) - 20;
    pos.setZ(i, z);
    pos.setY(i, forestFloor(x, z));
    const c = new THREE.Color('#827652').lerp(new THREE.Color('#435844'), (Math.sin(x * 0.75 + z * 0.2) + 1) * 0.3);
    groundColors.push(c.r, c.g, c.b);
  }
  groundGeometry.setAttribute('color', new THREE.Float32BufferAttribute(groundColors, 3));
  groundGeometry.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeometry, groundMaterial); ground.receiveShadow = true; root.add(ground);

  const bed = new THREE.Mesh(ribbonGeometry(-1.04, 1.04, 0.007), new THREE.MeshStandardMaterial({ color: '#8b9a82', roughness: 0.86, vertexColors: true }));
  bed.receiveShadow = true; root.add(bed);
  const bankTexture = groundTexture(); bankTexture.repeat.set(1.4, 3.1);
  const bankMaterial = new THREE.MeshStandardMaterial({ color: '#626449', map: bankTexture, bumpMap: bankTexture, bumpScale: 0.026, roughness: 0.98, vertexColors: true });
  for (const side of [-1, 1]) {
    const bank = new THREE.Mesh(ribbonGeometry(side < 0 ? -1.64 : 0.98, side < 0 ? -0.98 : 1.64, 0.082, false, true), bankMaterial);
    bank.receiveShadow = true; root.add(bank);
  }

  const water = new Reflector(ribbonGeometry(-1.02, 1.02, 0, true), {
    textureWidth: 512, textureHeight: 512, multisample: 0, clipBias: 0.003,
    shader: {
      uniforms: { tDiffuse: { value: null }, textureMatrix: { value: new THREE.Matrix4() }, color: { value: new THREE.Color('#5d8679') }, uTime: { value: 0 } },
      vertexShader: `uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld;
      void main(){vec4 world=modelMatrix*vec4(position,1.);vWorld=world.xyz;vReflection=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `uniform sampler2D tDiffuse;uniform vec3 color;uniform float uTime;varying vec4 vReflection;varying vec3 vWorld;
      void main(){vec2 p=vWorld.xz;float a=sin(p.y*5.7-uTime*.72+p.x*3.2);float b=sin(p.y*10.4-uTime*.91-p.x*4.1);
      vec3 n=normalize(vec3((a+b)*.014,1.,cos(p.y*5.7-uTime*.72)*.034));
      vec3 viewDirection=normalize(cameraPosition-vWorld);float fresnel=pow(1.-max(dot(n,viewDirection),0.),3.);
      vec2 uv=vReflection.xy/vReflection.w+n.xz*.014;
      vec3 reflected=texture2D(tDiffuse,uv).rgb;
      vec3 surface=mix(color*.58,reflected,.49+fresnel*.44);
      float caustic=pow(max(0.,sin(p.x*11.+a*.9+p.y*4.8-uTime*.42)*sin(p.y*8.9+b*.8-uTime*.68)),10.);
      surface+=vec3(.17,.19,.13)*caustic*(1.-fresnel);
      gl_FragColor=vec4(surface,.57+.32*fresnel);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
    },
  });
  water.name = 'Clear moving stream with real bamboo reflections';
  water.rotation.x = -Math.PI / 2; water.position.y = 0.115;
  const waterMaterial = water.material as THREE.ShaderMaterial;
  waterMaterial.transparent = true; waterMaterial.depthWrite = false;
  water.renderOrder = 2; root.add(water);

  const rockRecords: Instance[] = [], pebbleRecords: Instance[] = [], mossRecords: Instance[] = [];
  // Separate randomness preserves the original culm, canopy and touch-branch layout.
  const bankRandom = randomSource(90419), bankRange = (a: number, b: number) => a + bankRandom() * (b - a);
  const rockSource = new THREE.IcosahedronGeometry(1, 2);
  rockSource.deleteAttribute('normal'); rockSource.deleteAttribute('uv');
  const rockGeometry = mergeVertices(rockSource); rockSource.dispose();
  const rp = rockGeometry.attributes.position;
  for (let i = 0; i < rp.count; i++) {
    const x = rp.getX(i), y = rp.getY(i), z = rp.getZ(i);
    const wobble = 1 + Math.sin(x * 3.2 + y * 2.7 + z * 3.9) * 0.09;
    rp.setXYZ(i, x * wobble, y * wobble, z * wobble);
  }
  rockGeometry.computeVertexNormals();
  for (let i = 0; i < 260; i++) {
    const z = range(-53, 8), side = rng() > 0.5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + range(-0.07, 0.63));
    const size = range(0.14, 0.49) * (z < -27 ? 1.15 : 1);
    const color = new THREE.Color().setHSL(range(0.12, 0.20), range(0.055, 0.13), range(0.19, 0.32));
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(range(-0.2, 0.2), range(0, 6.28), range(-0.1, 0.1)));
    const mossColor = rng() > 0.2 ? new THREE.Color().setHSL(range(0.21, 0.27), 0.3, range(0.18, 0.3)) : null;
    // Irregular rock pockets leave real soil and vegetation gaps along each shore.
    if (bankRockPatch(z, side) < -0.16 || bankRandom() < 0.12) continue;
    const scale = size * bankRange(0.57, 1.38), flatten = bankRange(0.36, 0.73);
    const edgeX = x + side * bankRange(-0.25, 0.27), submersion = bankRange(-0.075, 0.045);
    const rockY = scale * 0.19 + submersion;
    const rockScale = new THREE.Vector3(scale * bankRange(1.04, 1.52), scale * flatten, scale * bankRange(0.72, 1.17));
    q.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(bankRange(-0.18, 0.18), 0, bankRange(-0.13, 0.13))));
    rockRecords.push({ position: new THREE.Vector3(edgeX, rockY, z), quaternion: q, scale: rockScale, color });
    if (mossColor && rockY + rockScale.y > 0.19) mossRecords.push({ position: new THREE.Vector3(edgeX - 0.02, rockY + rockScale.y * 0.49, z), quaternion: q, scale: new THREE.Vector3(rockScale.x * 0.77, rockScale.y * 0.44, rockScale.z * 0.76), color: mossColor });
  }
  for (let i = 0; i < 510; i++) {
    const z = range(-42, 8), x = streamCenter(z) + range(-0.95, 0.95) * streamWidth(z), size = range(0.03, 0.12);
    pebbleRecords.push({ position: new THREE.Vector3(x, 0.035, z), scale: new THREE.Vector3(size * 1.6, size * 0.5, size), color: new THREE.Color().setHSL(range(0.08, 0.2), range(0.06, 0.2), range(0.28, 0.52)) });
  }
  root.add(instances(rockGeometry, new THREE.MeshStandardMaterial({ roughness: 0.74, color: '#ffffff' }), rockRecords));
  root.add(instances(rockGeometry, new THREE.MeshStandardMaterial({ roughness: 0.92, color: '#ffffff' }), mossRecords));
  root.add(instances(rockGeometry, new THREE.MeshStandardMaterial({ roughness: 0.46, color: '#ffffff' }), pebbleRecords, false));

  const bambooMaps = bambooTexture();
  const culmMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', ...bambooMaps, bumpScale: 0.0045, roughness: 0.94, metalness: 0 });
  const nodeMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.88 });
  const nodeShadeMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.97 });
  const sheathMaterial = new THREE.MeshStandardMaterial({ color: '#9d966c', roughness: 0.98, side: THREE.DoubleSide });
  const twigMaterial = new THREE.MeshStandardMaterial({ color: '#728250', roughness: 0.87 });
  const leafMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.82, side: THREE.DoubleSide });
  // Local leaf midrib and thin translucent edges remain material cues at close range.
  leafMaterial.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      float midrib = 1.0-smoothstep(0.008,0.042,abs(vUv.x-.5));
      diffuseColor.rgb*=mix(.78,1.10,sin(vUv.x*3.14159));
      diffuseColor.rgb+=vec3(.032,.037,.007)*midrib;
    `);
  };
  // Force UV availability even though leaf colors are purely procedural.
  leafMaterial.defines = { USE_UV: '' };

  const culms: Instance[] = [], nodes: Instance[] = [], nodeShadows: Instance[] = [], distantNodes: Instance[] = [], distantNodeShadows: Instance[] = [], sheaths: Instance[] = [], twigs: Instance[] = [], leaves: Instance[] = [];
  const cylinder = new THREE.CylinderGeometry(0.96, 1, 1, 12, 1);
  const twigGeometry = new THREE.CylinderGeometry(0.90, 1, 1, 6, 1);
  const nodeGeometry = new THREE.TorusGeometry(1, 0.055, 4, 12); nodeGeometry.rotateX(Math.PI / 2);
  const sheathGeometry = new THREE.BufferGeometry();
  sheathGeometry.setAttribute('position', new THREE.Float32BufferAttribute([-0.075, 0, 0, 0.07, 0, 0, 0.035, 0.19, 0.026, -0.01, 0.29, 0.05], 3));
  sheathGeometry.setIndex([0, 1, 2, 0, 2, 3]); sheathGeometry.computeVertexNormals();
  const leafGeo = leafGeometry();
  const culmPositions: { x: number; z: number; height: number; radius: number }[] = [];
  // Individual clumps, varied gaps, and tilted parent axes avoid a repeating pole grid.
  for (let side of [-1, 1]) {
    for (let clump = 0; clump < 31; clump++) {
      const z = clump < 8 ? range(-14, 6) : range(-57, -11);
      const x = streamCenter(z) + side * (streamWidth(z) + range(1.0, clump < 8 ? 8 : 15));
      const count = 2 + Math.floor(rng() * 4);
      for (let j = 0; j < count; j++) culmPositions.push({ x: x + range(-0.7, 0.7), z: z + range(-0.8, 0.8), height: range(10.5, 18.8), radius: range(0.085, 0.19) });
    }
  }
  // Tactile large foreground culms create the seated, human-scale framing.
  culmPositions.push({ x: -2.65, z: 3.25, height: 15.2, radius: 0.19 }, { x: 2.88, z: 1.25, height: 16.4, radius: 0.20 }, { x: -2.15, z: -2.8, height: 14, radius: 0.145 });
  culmPositions.forEach((culm, ci) => {
    const leanX = range(-0.75, 0.75), leanZ = range(-0.65, 0.65);
    const segmentLength = range(0.72, 1.06), count = Math.ceil(culm.height / segmentLength);
    const baseColor = new THREE.Color().setHSL(range(0.20, 0.29), range(0.26, 0.44), range(0.26, 0.47));
    const pointAt = (y: number) => new THREE.Vector3(culm.x + leanX * (y / culm.height) ** 1.45, y, culm.z + leanZ * y / culm.height);
    for (let k = 0; k < count; k++) {
      const y0 = k * segmentLength, y1 = Math.min((k + 1) * segmentLength, culm.height);
      const radius = culm.radius * (1 - k / count * 0.36);
      const a = pointAt(y0), b = pointAt(y1);
      culms.push(orientedSegment(a, b, radius, baseColor));
      const nearCulm = culm.z > -10 && Math.abs(culm.x) < 6;
      const nodeColor = baseColor.clone().lerp(new THREE.Color('#b1ac76'), 0.23 + Math.sin(ci + k * 1.8) * 0.035);
      (nearCulm ? nodes : distantNodes).push({ position: a.clone().add(new THREE.Vector3(0, 0.013, 0)), scale: new THREE.Vector3(radius * 1.036, radius * 0.86, radius * 1.036), color: nodeColor });
      (nearCulm ? nodeShadows : distantNodeShadows).push({ position: a, scale: new THREE.Vector3(radius * 1.02, radius * 0.37, radius * 1.02), color: baseColor.clone().multiplyScalar(0.70) });
      if (y0 < 5.5 && ci % 3 === 0) {
        const angle = range(0, 6.28), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, range(-0.15, 0.15)));
        sheaths.push({ position: a.clone().add(new THREE.Vector3(Math.sin(angle) * radius, -0.15, Math.cos(angle) * radius)), quaternion: q, scale: new THREE.Vector3(range(0.8, 1.3), range(0.85, 1.4), 1) });
      }
      if (k < 4 || k % 3 !== ci % 3 || rng() < 0.34) continue;
      const angle = range(0, Math.PI * 2), span = range(0.8, 1.6);
      const tip = a.clone().add(new THREE.Vector3(Math.cos(angle) * span, range(0.18, 0.7), Math.sin(angle) * span));
      twigs.push(orientedSegment(a, tip, range(0.013, 0.023)));
      for (let t = 0; t < 4; t++) {
        const origin = a.clone().lerp(tip, 0.24 + t * 0.22);
        const theta = angle + (t % 2 ? 1 : -1) * range(0.5, 1.05);
        const twigEnd = origin.clone().add(new THREE.Vector3(Math.cos(theta) * 0.64, range(-0.1, 0.28), Math.sin(theta) * 0.64));
        twigs.push(orientedSegment(origin, twigEnd, 0.006));
        for (let l = 0; l < 4; l++) {
          const p = origin.clone().lerp(twigEnd, 0.24 + l * 0.23);
          const yaw = theta + (l % 2 ? 1 : -1) * 0.66;
          const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(range(0.7, 1.4), yaw, range(-0.45, 0.45)));
          const scale = range(0.65, 1.10);
          leaves.push({ position: p, quaternion: q, scale: new THREE.Vector3(scale, scale, scale), color: new THREE.Color().setHSL(range(0.20, 0.29), range(0.4, 0.58), range(0.23, 0.40)) });
        }
      }
    }
  });
  root.add(instances(cylinder, culmMaterial, culms));
  root.add(instances(nodeGeometry, nodeMaterial, nodes));
  root.add(instances(nodeGeometry, nodeShadeMaterial, nodeShadows));
  const distantNodeGeometry = new THREE.CylinderGeometry(1.04, 1.02, 0.11, 8, 1, true);
  root.add(instances(distantNodeGeometry, nodeMaterial, distantNodes));
  root.add(instances(distantNodeGeometry, nodeShadeMaterial, distantNodeShadows));
  root.add(instances(sheathGeometry, sheathMaterial, sheaths));
  const branchMesh = instances(twigGeometry, twigMaterial, twigs); root.add(branchMesh);
  const leafMesh = instances(leafGeo, leafMaterial, leaves); root.add(leafMesh);
  const windUniform = { value: 0 };
  for (const mat of [twigMaterial, leafMaterial]) {
    const oldCompile = mat.onBeforeCompile.bind(mat);
    mat.onBeforeCompile = (shader, renderer) => {
      oldCompile(shader, renderer);
      shader.uniforms.bambooTime = windUniform;
      shader.vertexShader = `uniform float bambooTime;\n${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', `
        vec4 mvPosition = vec4(transformed,1.0);
        #ifdef USE_INSTANCING
          mvPosition=instanceMatrix*mvPosition;
        #endif
        float movement=smoothstep(1.8,9.0,mvPosition.y);
        mvPosition.x+=sin(bambooTime*.42+mvPosition.z*.17+mvPosition.y*.33)*.07*movement;
        mvPosition.z+=sin(bambooTime*.31+mvPosition.x*.21)*.035*movement;
        mvPosition=modelViewMatrix*mvPosition;
        gl_Position=projectionMatrix*mvPosition;
      `);
    };
  }

  // Near streamside grasses and fallen leaves make the forest floor legible.
  const grassRecords: Instance[] = [], litterRecords: Instance[] = [];
  for (let i = 0; i < 1600; i++) {
    const z = range(-34, 7), side = rng() > 0.5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + range(0.42, 3.5));
    const scale = range(0.3, 0.65);
    grassRecords.push({ position: new THREE.Vector3(x, forestFloor(x, z) + 0.025, z), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(range(-0.38, 0.38), range(0, 6.28), range(-0.6, 0.6))), scale: new THREE.Vector3(scale * 0.65, scale, scale), color: new THREE.Color().setHSL(range(0.19, 0.25), 0.36, range(0.26, 0.43)) });
  }
  for (let i = 0; i < 1350; i++) {
    const z = range(-27, 9), side = rng() > 0.5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + range(0.3, 8));
    litterRecords.push({ position: new THREE.Vector3(x, forestFloor(x, z) + 0.016, z), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, range(0, 6.28))), scale: new THREE.Vector3(0.8, range(0.6, 1.0), 0.5), color: new THREE.Color().setHSL(range(0.09, 0.15), 0.28, range(0.29, 0.46)) });
  }
  // Small rooted sedge groups soften exposed banks; gaps remain between groups.
  for (const side of [-1, 1]) for (let tuft = 0; tuft < 42; tuft++) {
    const z = bankRange(-34, 6.5);
    if (bankRockPatch(z, side) > 0.45) continue;
    const x = streamCenter(z) + side * (streamWidth(z) + bankRange(0.06, 0.45));
    for (let blade = 0; blade < 7; blade++) {
      const scale = bankRange(0.42, 0.86), yaw = bankRange(0, Math.PI * 2);
      grassRecords.push({ position: new THREE.Vector3(x + bankRange(-0.09, 0.09), Math.max(0.065, forestFloor(x, z)), z + bankRange(-0.12, 0.12)), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(bankRange(-0.42, 0.42), yaw, bankRange(-0.48, 0.48))), scale: new THREE.Vector3(scale * 0.55, scale, scale), color: new THREE.Color().setHSL(bankRange(0.19, 0.24), 0.34, bankRange(0.23, 0.37)) });
    }
  }
  root.add(instances(leafGeo, new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide, roughness: 0.95 }), grassRecords));
  root.add(instances(leafGeo, new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide, roughness: 1 }), litterRecords, false));

  // Interactive branch is a real spatial object, distinct from passive canopy instances.
  const touchBranch = new THREE.Group(); touchBranch.name = 'Near bamboo leaves — gentle spring touch';
  touchBranch.position.set(1.44, 1.13, 2.05); touchBranch.rotation.z = -0.3;
  const touchTargets: THREE.Object3D[] = [];
  const nearLeaves: Instance[] = [], nearTwigs: Instance[] = [];
  const stemEnd = new THREE.Vector3(-1.1, 0.56, -0.12);
  nearTwigs.push(orientedSegment(new THREE.Vector3(0.84, -0.33, 0.15), stemEnd, 0.018));
  for (let k = 0; k < 5; k++) {
    const p = new THREE.Vector3(0.55, -0.15, 0.10).lerp(stemEnd, k / 4);
    const dir = k % 2 ? 1 : -1;
    const end = p.clone().add(new THREE.Vector3(-0.25, dir * 0.12, range(0.07, 0.22)));
    nearTwigs.push(orientedSegment(p, end, 0.005));
    for (let j = 0; j < 3; j++) {
      const direction = new THREE.Vector3(-0.85 + j * 0.64, range(-0.32, -0.09), range(-0.1, 0.35)).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), range(-0.5, 0.5)));
      const scale = range(0.64, 0.98);
      nearLeaves.push({ position: end.clone().add(new THREE.Vector3(j * -0.035, j * 0.018, 0)), quaternion: q, scale: new THREE.Vector3(scale, scale, scale), color: new THREE.Color().setHSL(0.235 + rng() * 0.025, 0.48, range(0.29, 0.43)) });
    }
  }
  const nearLeafMesh = instances(leafGeo, leafMaterial, nearLeaves);
  nearLeafMesh.name = 'Touch bamboo leaves';
  const heroLeafMaterial = leafMaterial.clone();
  heroLeafMaterial.defines = { ...leafMaterial.defines };
  heroLeafMaterial.color.set('#688a36');
  heroLeafMaterial.onBeforeCompile = leafMaterial.onBeforeCompile;
  const heroLeaf = new THREE.Mesh(leafGeo, heroLeafMaterial);
  heroLeaf.name = 'Reachable individual bamboo leaf';
  heroLeaf.position.set(-0.48, 0.25, 0.17);
  heroLeaf.rotation.set(0.94, -0.38, 0.68);
  heroLeaf.scale.set(1.25, 1.18, 1.18);
  heroLeaf.castShadow = true; heroLeaf.receiveShadow = true;
  touchBranch.add(instances(twigGeometry, twigMaterial, nearTwigs), nearLeafMesh, heroLeaf);
  root.add(touchBranch); touchTargets.push(heroLeaf, nearLeafMesh);

  // Soft projected patches drift with the canopy, not a flashing/fullscreen effect.
  const dappleMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: windUniform },
    vertexShader: `varying vec3 vPosition;void main(){vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform float uTime;varying vec3 vPosition;float hash(vec2 p){return fract(sin(dot(p,vec2(17.17,43.73)))*17341.17);}
    void main(){vec2 p=vPosition.xy*.85+vec2(sin(uTime*.15)*.08,cos(uTime*.11)*.05);vec2 cell=floor(p);vec2 f=fract(p)-.5;float h=hash(cell);float r=length(f*vec2(1.,1.8));float a=(1.-smoothstep(.08,.35,r))*step(.57,h)*.15;gl_FragColor=vec4(.94,.95,.61,a);}`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const dapples = new THREE.Mesh(new THREE.PlaneGeometry(30, 54), dappleMaterial);
  dapples.rotation.x = -Math.PI / 2; dapples.position.set(0, 0.16, -17); dapples.renderOrder = 3; root.add(dapples);

  let springPosition = 0, springVelocity = 0;
  const resize = (aspect: number) => {
    touchBranch.position.x = aspect < 0.8 ? 0.55 : 1.44;
    camera.position.set(aspect < 0.8 ? -0.12 : -0.25, aspect < 0.8 ? 1.30 : 1.35, 5.6);
    camera.fov = aspect < 0.8 ? 62 : 58;
    camera.lookAt(aspect < 0.8 ? 0.30 : 0.48, aspect < 0.8 ? 2.70 : 2.80, -10.5);
    camera.updateProjectionMatrix();
  };
  resize(camera.aspect);
  return {
    interactionTargets: touchTargets,
    interact: () => { springVelocity = Math.max(-0.9, springVelocity - 0.7); },
    resize,
    update: (time, dt) => {
      windUniform.value = time;
      waterMaterial.uniforms.uTime.value = time;
      const step = Math.min(dt, 0.04);
      springVelocity += (-springPosition * 16 - springVelocity * 4.7) * step;
      springPosition += springVelocity * step;
      touchBranch.rotation.z = -0.30 + Math.sin(time * 0.49) * 0.025 + springPosition;
      touchBranch.rotation.x = Math.sin(time * 0.36) * 0.018 + springPosition * 0.18;
    },
    dispose: () => { water.dispose(); },
  };
}
