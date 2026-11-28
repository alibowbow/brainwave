import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import type { WorldContent } from '../types';
import { applyFoliageShading, beforeMain, layerCanopy, withNoise } from '../../shared/render/foliageShading';
import { bambooSprayTexture, litterTexture, singleLeafTexture } from '../../shared/render/foliageTextures';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { applyRockSurface } from '../../shared/render/rockSurface';
import { concatGeometries } from '../../shared/render/treeGeometry';
import { seeded } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import {
  applyForestFloor, bakeEnvironment, bladeGeometry, createSky, createSun, createWoodsVolume, grassMaterial,
  instanced, litterGeometry, scatter, terrainGeometry, type Placement, type SkyOptions,
} from './woodsKit';

/** Sun high behind-left: light falls through the leaf sprays toward the viewer and glints on the stream. */
const TO_SUN = new THREE.Vector3(-0.45, 0.78, -0.45).normalize();
const srgb = (h: number, s: number, l: number) => new THREE.Color().setHSL(h, s, l, THREE.SRGBColorSpace);

const forestFloor = (x: number, z: number) => -0.035 + 0.10 * Math.sin(x * 0.27 + z * 0.12) + 0.03 * Math.sin(x * 3.7 + z);
const streamCenter = (z: number) => 0.14 + Math.sin(z * 0.103 + 0.6) * 1.26 + Math.sin(z * 0.25) * 0.23;
const streamWidth = (z: number) => 1.18 + Math.sin(z * 0.15) * 0.2;
const bankRockPatch = (z: number, side: number) => Math.sin(z * 0.72 + side * 1.7) + Math.sin(z * 1.63 - side * 0.8) * 0.46;

function ribbonGeometry(left: number, right: number, y: number, water = false, bank = false) {
  const vertices: number[] = [], indices: number[] = [], uvs: number[] = [];
  const slices = 160;
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
    }
    if (i < slices) {
      const k = i * 2;
      indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

/** Accumulates vertices for culms, branches and leaf cards with wind attributes. */
class Writer {
  positions: number[] = []; normals: number[] = []; uvs: number[] = []; colors: number[] = [];
  wind: number[] = []; phase: number[] = []; node: number[] = []; indices: number[] = [];
  get count() { return this.positions.length / 3; }
  vertex(p: THREE.Vector3, n: THREE.Vector3, u: number, v: number, c: THREE.Color, w: [number, number, number], ph: [number, number], node: [number, number] = [0, 0]) {
    this.positions.push(p.x, p.y, p.z); this.normals.push(n.x, n.y, n.z); this.uvs.push(u, v);
    this.colors.push(c.r, c.g, c.b); this.wind.push(...w); this.phase.push(...ph); this.node.push(...node);
  }
  geometry(withNode: boolean) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.normals, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    g.setAttribute('aWind', new THREE.Float32BufferAttribute(this.wind, 3));
    g.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(this.phase, 2));
    if (withNode) g.setAttribute('aNode', new THREE.Float32BufferAttribute(this.node, 2));
    g.setIndex(this.count > 65535 ? new THREE.Uint32BufferAttribute(this.indices, 1) : new THREE.Uint16BufferAttribute(this.indices, 1));
    return g;
  }
}

/** Polished culm: node lines, a pale sheath scar above each node, waxy bloom below, fine fibres and age spots. */
function applyCulmSurface<T extends THREE.MeshStandardMaterial>(material: T): T {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = beforeMain(shader.vertexShader, 'attribute vec2 aNode;\nvarying vec2 vNode;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvNode = aNode;');
    shader.fragmentShader = beforeMain(shader.fragmentShader, `${withNoise(shader.fragmentShader)}\nvarying vec2 vNode;\nfloat culmBloom = 0.0;\nfloat culmSpot = 0.0;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  float f = vNode.x;
  float w = max(fwidth(f) * 1.5, 0.006);
  float line = 1.0 - smoothstep(0.0, w * 1.5, min(f, 1.0 - f));
  float scar = smoothstep(0.0, w, f) * (1.0 - smoothstep(0.035, 0.07, f));
  culmBloom = smoothstep(0.62, 0.9, f) * (1.0 - smoothstep(0.96, 0.995, f)) * (0.55 + 0.45 * bwNoise(vBwWorld * vec3(9.0, 2.0, 9.0)));
  float fibre = bwNoise(vec3(vBwWorld.x * 95.0, vBwWorld.y * 1.4, vBwWorld.z * 95.0));
  culmSpot = smoothstep(0.5, 0.75, bwNoise(vBwWorld * vec3(13.0, 2.6, 13.0) + 4.0)) * (1.0 - smoothstep(1.0, 7.0, vBwWorld.y)) * 0.8;
  vec3 c = diffuseColor.rgb * (0.94 + 0.08 * fibre);
  c = mix(c, c * vec3(1.18, 1.14, 0.86) + vec3(0.03, 0.03, 0.0), scar * 0.8);
  c = mix(c, mix(c, vec3(0.5, 0.55, 0.48), 0.55), culmBloom * 0.75);
  c = mix(c, vec3(0.24, 0.24, 0.2), culmSpot * 0.6);
  c *= 1.0 - line * 0.65;
  diffuseColor.rgb = c;
}`).replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.72, max(culmBloom * 0.9, culmSpot));`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|lw-culm-v1`;
  return material;
}

export function createBamboo(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  const rng = seeded(241016), range = (a: number, b: number) => a + rng() * (b - a);
  const root = new THREE.Group(); root.name = 'Bamboo grove beside a clear stream'; scene.add(root);
  const time = { value: 0 };
  let environment: THREE.WebGLRenderTarget | null = null;

  const sky: SkyOptions = {
    zenith: new THREE.Color(0.55, 0.75, 1.0).multiplyScalar(1.3), horizon: new THREE.Color(0.85, 0.95, 0.85).multiplyScalar(1.05),
    ground: new THREE.Color(0.05, 0.07, 0.04), toSun: TO_SUN, sun: new THREE.Color(1, 0.95, 0.82).multiplyScalar(60),
    glow: new THREE.Color(1, 0.9, 0.7).multiplyScalar(1.4), wall: { color: new THREE.Color(0.1, 0.14, 0.09), height: 0.3 }, time,
  };
  root.add(createSky(sky, 150));
  scene.background = new THREE.Color(0.3, 0.38, 0.3);
  const fog = new THREE.FogExp2(0xffffff, 0.013);
  fog.color.setRGB(0.12, 0.16, 0.11);
  scene.fog = fog;
  const sun = createSun(scene, { toSun: TO_SUN, color: '#fff1cc', intensity: 6.5, target: new THREE.Vector3(0, 0, -4), box: [-16, 16, -14, 18], distance: 46, radius: 2.5, normalBias: 0.04 });
  // Objects kept out of the stream reflection (layer 1) still cast shadows.
  sun.shadow.camera.layers.enable(1);
  const canopy = layerCanopy({
    key: 'bamboo', toSun: TO_SUN, height: 11, scale: 0.11, cover: 0.2, softness: 0.1, floor: 0.06, time,
    clearings: [
      { target: new THREE.Vector3(0.7, 0.1, -7.5), radius: 2.4 }, { target: new THREE.Vector3(-2.4, 3.2, 2.2), radius: 1.3 },
      { target: new THREE.Vector3(2.8, 0, -15), radius: 2.2 }, { target: new THREE.Vector3(1.1, 1.3, 2.0), radius: 1.5 },
    ],
  });
  const wind = { time, mode: 'attribute' as const, sway: 0.32, flutter: 0.03, direction: [1, 0.25] as [number, number], speed: 0.8 };

  // ---- Ground, stream bed, banks and water -------------------------------------------------------
  const floorMaterial = applyFoliageShading(applyForestFloor(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), {
    key: 'bamboo-floor', soil: '#2e2418', litter: '#9a8050', litterDark: '#43351f', moss: '#4a6026', mossAmount: 0.3, bump: 0.6, carpet: { cells: 7, aspect: 7, cover: 0.95 },
  }), { key: 'bamboo-floor', canopy });
  const ground = new THREE.Mesh(terrainGeometry({ width: 100, zNear: 8, zFar: -75, columns: 170, rows: 160, height: forestFloor }), floorMaterial);
  ground.receiveShadow = true; ground.layers.set(1); root.add(ground);
  const bedMaterial = applyFoliageShading(applyRockSurface(new THREE.MeshStandardMaterial({ color: '#6b6c58', roughness: 0.6 }), {
    key: 'bamboo-bed', scale: 5, bump: 0.8, wetness: 1, drips: 0, stainAmount: 0.3, strata: 0, algae: '#4a5a2c', algaeAmount: 0.4, waterY: 0.12, wetBand: 0.2,
  }), { key: 'bamboo-bed', canopy });
  const bed = new THREE.Mesh(ribbonGeometry(-1.04, 1.04, 0.007), bedMaterial);
  bed.receiveShadow = true; root.add(bed);
  for (const side of [-1, 1]) {
    const bank = new THREE.Mesh(ribbonGeometry(side < 0 ? -1.64 : 0.98, side < 0 ? -0.98 : 1.64, 0.082, false, true), floorMaterial);
    bank.receiveShadow = true; root.add(bank);
  }

  const water = new Reflector(ribbonGeometry(-1.02, 1.02, 0, true), {
    textureWidth: 512, textureHeight: 512, multisample: 0, clipBias: 0.003, color: 0x2e4a40,
    shader: {
      uniforms: {
        tDiffuse: { value: null }, textureMatrix: { value: new THREE.Matrix4() }, color: { value: new THREE.Color('#2e4a40') }, uTime: { value: 0 },
        uSunDir: { value: TO_SUN.clone() }, uSunColor: { value: new THREE.Vector3(1, 0.93, 0.78).multiplyScalar(30) }, ...canopy.uniforms,
      },
      vertexShader: `uniform mat4 textureMatrix; varying vec4 vReflection; varying vec3 vWorld;
      void main(){vec4 world=modelMatrix*vec4(position,1.);vWorld=world.xyz;vReflection=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `${GLSL_NOISE}
      ${canopy.glsl}
      uniform sampler2D tDiffuse;uniform vec3 color;uniform float uTime;uniform vec3 uSunDir;uniform vec3 uSunColor;varying vec4 vReflection;varying vec3 vWorld;
      float flowH(vec2 p){
        // Ripples carried downstream (toward +z) with slow cross eddies.
        vec2 q=vec2(p.x,p.y-uTime*.45);
        return bwNoise(vec3(q*vec2(3.2,1.6),uTime*.12))*.6+bwNoise(vec3(q*vec2(7.5,4.0)+3.,uTime*.2))*.3+bwNoise(vec3(q*16.+7.,uTime*.35))*.1;
      }
      void main(){
        vec2 p=vWorld.xz;const float e=.02;float h=flowH(p);
        vec3 n=normalize(vec3((h-flowH(p+vec2(e,0.)))/e*.05,1.,(h-flowH(p+vec2(0.,e)))/e*.05));
        vec3 viewDirection=normalize(cameraPosition-vWorld);float fresnel=.02+.98*pow(1.-max(dot(n,viewDirection),0.),5.);
        vec2 uv=vReflection.xy/vReflection.w+n.xz*.03;
        vec3 reflected=texture2D(tDiffuse,uv).rgb;
        float sun=bwCanopy(vWorld);
        vec3 body=color*(.25+.75*sun)*(.5+.5*max(dot(n,uSunDir),0.));
        vec3 surface=mix(body,reflected,clamp(.15+fresnel,0.,1.));
        vec3 halfway=normalize(uSunDir+viewDirection);
        surface+=uSunColor*pow(max(dot(n,halfway),0.),900.)*sun;
        gl_FragColor=vec4(surface,.72+.25*fresnel);
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

  // Pebbles under the water and mossy rocks gathered along both banks.
  const pebbleRecords: Placement[] = [];
  for (let i = 0; i < 520; i++) {
    const z = range(-42, 8), x = streamCenter(z) + range(-0.95, 0.95) * streamWidth(z), size = range(0.03, 0.12);
    pebbleRecords.push({ x, y: 0.035, z, yaw: range(0, 6.28), scale: new THREE.Vector3(size * 1.6, size * 0.5, size), color: srgb(range(0.08, 0.2), range(0.06, 0.2), range(0.25, 0.48)) });
  }
  // Pebbles, litter and fine twigs stay out of the reflection pass (camera layer 1 only).
  camera.layers.enable(1);
  water.getReflectionCamera(camera).layers.set(0);
  const pebbles = instanced(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshStandardMaterial({ roughness: 0.3 }), pebbleRecords, { cast: false, receive: true });
  pebbles.layers.set(1); root.add(pebbles);
  const bankRandom = seeded(90419), bankRange = (a: number, b: number) => a + bankRandom() * (b - a);
  const rockParts: THREE.BufferGeometry[] = [];
  const rockVariants = [0, 1, 2, 3].map(i => boulderGeometry(71 + i, 2));
  for (let i = 0; i < 230; i++) {
    const z = range(-48, 8), side = rng() > 0.5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + range(-0.07, 0.63));
    if (bankRockPatch(z, side) < -0.16 || bankRandom() < 0.12) continue;
    const size = range(0.14, 0.45) * bankRange(0.6, 1.3), flatten = bankRange(0.36, 0.7);
    const g = rockVariants[i % 4].clone();
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3(x + side * bankRange(-0.25, 0.27), size * flatten * 0.55 + bankRange(-0.06, 0.03), z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(bankRange(-0.2, 0.2), range(0, 6.28), bankRange(-0.15, 0.15))),
      new THREE.Vector3(size * bankRange(1.0, 1.5), size * flatten, size * bankRange(0.75, 1.15))));
    const tint = srgb(range(0.1, 0.18), range(0.05, 0.12), range(0.42, 0.6));
    const colors = new Float32Array(g.attributes.position.count * 3);
    for (let k = 0; k < colors.length; k += 3) colors.set([tint.r, tint.g, tint.b], k);
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    rockParts.push(g);
  }
  const rockMaterial = applyFoliageShading(applyRockSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness: 0.85 }), {
    key: 'bamboo-rocks', scale: 2.4, bump: 1, stainAmount: 0.2, drips: 0.2, waterY: 0.12, wetBand: 0.25, algaeAmount: 0.5, moss: { color: '#486a22', amount: 0.75 },
  }), { key: 'bamboo-rocks', canopy });
  const rocks = new THREE.Mesh(concatGeometries(rockParts), rockMaterial);
  rocks.castShadow = true; rocks.receiveShadow = true; root.add(rocks);
  rockParts.forEach(g => g.dispose()); rockVariants.forEach(g => g.dispose());

  // ---- Culms, branches and leaf sprays ------------------------------------------------------------
  const culmWriter = new Writer(), branchWriter = new Writer(), leafWriter = new Writer();
  const culmWriterFar = new Writer(), leafWriterFar = new Writer();
  type Culm = { x: number; z: number; height: number; radius: number; near: boolean; reflect?: boolean };
  const culms: Culm[] = [];
  for (const side of [-1, 1]) {
    for (let clump = 0; clump < 30; clump++) {
      const z = clump < 8 ? range(-14, 6) : range(-57, -11);
      const x = streamCenter(z) + side * (streamWidth(z) + range(1.0, clump < 8 ? 8 : 15));
      const count = 2 + Math.floor(rng() * 4);
      for (let j = 0; j < count; j++) culms.push({ x: x + range(-0.7, 0.7), z: z + range(-0.8, 0.8), height: range(11, 18), radius: range(0.045, 0.09), near: false });
    }
  }
  culms.push({ x: -2.65, z: 3.25, height: 15.2, radius: 0.11, near: true }, { x: 2.88, z: 1.25, height: 16.4, radius: 0.12, near: true }, { x: -2.15, z: -2.8, height: 14, radius: 0.09, near: true });
  for (const c of culms) {
    c.near = c.near || (Math.hypot(c.x, c.z - 2) < 9);
    c.reflect = Math.abs(c.x - streamCenter(c.z)) < streamWidth(c.z) + 4.5;
  }
  const up = new THREE.Vector3(0, 1, 0);
  const tmp = new THREE.Vector3(), n = new THREE.Vector3();
  culms.forEach((culm, ci) => {
    // Culms near the water are mirrored by the stream; the rest skip the reflection pass (layer 1).
    const cw = culm.reflect ? culmWriter : culmWriterFar, lw = culm.reflect ? leafWriter : leafWriterFar;
    const lean: [number, number] = [range(-0.7, 0.7), range(-0.6, 0.6)];
    const phase = rng() * Math.PI * 2;
    const base = new THREE.Vector3(culm.x, forestFloor(culm.x, culm.z) - 0.08, culm.z);
    const color = srgb(range(0.19, 0.27), range(0.32, 0.5), range(0.26, 0.42));
    if (rng() < 0.12) color.copy(srgb(range(0.13, 0.17), 0.42, range(0.36, 0.46)));
    const H = culm.height, R = culm.radius;
    const centre = (y: number) => tmp.set(base.x + lean[0] * (y / H) ** 1.6, base.y + y, base.z + lean[1] * (y / H) ** 1.6);
    const flex = 0.85;
    const trunkW = (y: number) => flex * (y / H) ** 2;
    const nodes = Math.max(18, Math.min(40, Math.round(H / 0.42)));
    const weights = Array.from({ length: nodes }, (_, i) => 0.45 + 0.8 * Math.sin(Math.PI * Math.min(1, ((i + 0.5) / nodes) * 1.2)));
    const total = weights.reduce((a, b) => a + b, 0);
    const fractions = culm.near ? [0, 0.03, 0.12, 0.88, 1] : [0, 1];
    const radial = culm.near ? 12 : 6;
    let y0 = 0;
    for (let i = 0; i < nodes; i++) {
      const y1 = y0 + (weights[i] / total) * H;
      for (const f of fractions) {
        const y = y0 + (y1 - y0) * f;
        const taper = R * (1 - 0.42 * y / H);
        const ridge = culm.near ? 1 + 0.06 * Math.exp(-(((f - 0.012) / 0.02) ** 2)) - 0.012 * Math.exp(-(((f - 1) / 0.08) ** 2)) : 1;
        const c = centre(y).clone();
        const rowStart = cw.count;
        for (let j = 0; j <= radial; j++) {
          const a = (j / radial) * Math.PI * 2;
          n.set(Math.cos(a), 0, Math.sin(a));
          cw.vertex(c.clone().addScaledVector(n, taper * ridge), n, j / radial, y, color, [trunkW(y), 0, 0], [phase, phase], [f, i / nodes]);
        }
        if (f > 0 || i > 0) {
          const prev = rowStart - (radial + 1);
          for (let j = 0; j < radial; j++) cw.indices.push(prev + j, rowStart + j, prev + j + 1, prev + j + 1, rowStart + j, rowStart + j + 1);
        }
      }
      // Branches leave the upper nodes, alternating sides; leaf sprays hang from their twigs.
      const nodeY = y1;
      if (nodeY > H * 0.42 && nodeY < H * 0.97 && (culm.near || nodeY > H * 0.62 || i % 2 === ci % 2)) {
        const branchCount = rng() < 0.35 ? 2 : 1;
        for (let b = 0; b < branchCount; b++) {
          const azimuth = i * 2.4 + b * 2.6 + phase + range(-0.4, 0.4);
          const elevation = range(0.45, 0.85);
          const dir = new THREE.Vector3(Math.cos(azimuth) * Math.cos(elevation), Math.sin(elevation), Math.sin(azimuth) * Math.cos(elevation));
          const crown = Math.sin(Math.PI * (nodeY / H - 0.4) / 0.6);
          const length = (0.45 + 0.9 * crown) * range(0.8, 1.2);
          const start = centre(nodeY).clone();
          const w0 = trunkW(nodeY);
          const twigEnds: Array<{ p: THREE.Vector3; d: THREE.Vector3; w: number }> = [];
          const addTwig = (from: THREE.Vector3, d: THREE.Vector3, len: number, r: number, wBase: number) => {
            const end = from.clone().addScaledVector(d, len).add(new THREE.Vector3(0, -len * 0.12, 0));
            const side = new THREE.Vector3().crossVectors(d, up).normalize();
            const other = new THREE.Vector3().crossVectors(side, d).normalize();
            const s = branchWriter.count;
            for (let k = 0; k <= 2; k++) {
              const t = k / 2, p = from.clone().lerp(end, t), rr = r * (1 - t * 0.6);
              for (let j = 0; j <= 4; j++) {
                const a = (j / 4) * Math.PI * 2;
                const nn = side.clone().multiplyScalar(Math.cos(a)).addScaledVector(other, Math.sin(a));
                branchWriter.vertex(p.clone().addScaledVector(nn, rr), nn, j / 4, t, new THREE.Color(1, 1, 1), [w0, wBase + t * len * 0.35, 0], [phase, phase + b], [0, 0]);
              }
              if (k > 0) for (let j = 0; j < 4; j++) { const a0 = s + (k - 1) * 5 + j, a1 = s + k * 5 + j; branchWriter.indices.push(a0, a1, a0 + 1, a0 + 1, a1, a1 + 1); }
            }
            twigEnds.push({ p: end, d, w: wBase + len * 0.35 });
            return end;
          };
          addTwig(start, dir, length, 0.008 + R * 0.08, 0);
          for (const t of [0.45, 0.8]) {
            const from = start.clone().addScaledVector(dir, length * t);
            const d = dir.clone().applyAxisAngle(up, (t > 0.6 ? 1 : -1) * range(0.5, 0.9)).add(new THREE.Vector3(0, range(-0.15, 0.2), 0)).normalize();
            addTwig(from, d, length * range(0.35, 0.55), 0.005, length * t * 0.35);
          }
          for (const end of twigEnds) {
            const sprays = culm.near ? 2 : 1;
            for (let k = 0; k < sprays; k++) {
              const size = (culm.near ? 0.55 : 0.95) * range(0.85, 1.2);
              const hang = end.d.clone().multiplyScalar(0.55).add(new THREE.Vector3(range(-0.3, 0.3), -range(0.3, 0.75), range(-0.3, 0.3))).normalize();
              let face = new THREE.Vector3().crossVectors(hang, up);
              if (face.lengthSq() < 1e-4) face.set(1, 0, 0);
              face.normalize().applyAxisAngle(hang, range(-0.9, 0.9));
              const right = new THREE.Vector3().crossVectors(hang, face).normalize();
              const column = Math.floor(rng() * 2);
              const origin = end.p.clone().addScaledVector(hang, -size * 0.06);
              const shade = range(0.75, 1.05) * (0.6 + 0.4 * Math.min(1, nodeY / H + 0.2));
              const s = lw.count;
              for (let row = 0; row <= 2; row++) for (let col = 0; col <= 2; col++) {
                const u = col / 2, v = row / 2;
                const p = origin.clone().addScaledVector(right, (u - 0.5) * size).addScaledVector(hang, v * size)
                  .addScaledVector(face, (((u - 0.5) * 2) ** 2) * size * 0.08 - v * v * size * 0.1);
                const nn = face.clone().lerp(new THREE.Vector3(0, 1, 0), 0.45).normalize();
                lw.vertex(p, nn, (column + u) / 2, v, new THREE.Color(shade, shade, shade), [w0, end.w, 0.3 + 0.7 * v], [phase, phase + b], [0, 0]);
              }
              for (let row = 0; row < 2; row++) for (let col = 0; col < 2; col++) {
                const a = s + row * 3 + col;
                lw.indices.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
              }
            }
          }
        }
      }
      y0 = y1;
    }
  });
  const culmMaterial = applyFoliageShading(applyCulmSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness: 0.34, metalness: 0 })), { key: 'bamboo-culms', canopy, wind });
  const culmMesh = new THREE.Mesh(culmWriter.geometry(true), culmMaterial);
  culmMesh.castShadow = true; culmMesh.receiveShadow = true; root.add(culmMesh);
  const culmMeshFar = new THREE.Mesh(culmWriterFar.geometry(true), culmMaterial);
  culmMeshFar.castShadow = true; culmMeshFar.receiveShadow = true; culmMeshFar.layers.set(1); root.add(culmMeshFar);
  const twigMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ color: '#6d7a3c', roughness: 0.55 }), { key: 'bamboo-twigs', canopy, wind });
  const twigMesh = new THREE.Mesh(branchWriter.geometry(false), twigMaterial);
  twigMesh.castShadow = true; twigMesh.receiveShadow = true; twigMesh.layers.set(1); root.add(twigMesh);
  const sprayAtlas = bambooSprayTexture({ seed: 12, palette: { base: '#5c7f2c', light: '#9bbb4a', dark: '#36531c', stem: '#6d7438' } });
  const leafMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: sprayAtlas, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.45 }), {
    key: 'bamboo-leaves', canopy, wind, sharedNormals: true, coverage: true, translucency: { tint: '#f2ff8a', back: 0.85, forward: 2.0 },
  });
  const leafMesh = new THREE.Mesh(leafWriter.geometry(false), leafMaterial);
  leafMesh.castShadow = true; leafMesh.receiveShadow = true; root.add(leafMesh);
  const leafMeshFar = new THREE.Mesh(leafWriterFar.geometry(false), leafMaterial);
  leafMeshFar.castShadow = true; leafMeshFar.receiveShadow = true; leafMeshFar.layers.set(1); root.add(leafMeshFar);

  // ---- Streamside sedges and fallen bamboo leaves ---------------------------------------------------
  const sedgeWind = { time, mode: 'height' as const, height: 1, sway: 0.07, flutter: 0.015, direction: [1, 0.25] as [number, number], speed: 1 };
  const sedges = grassMaterial({ key: 'bamboo-sedge', canopy, wind: sedgeWind, roughness: 0.5, translucency: 0.6 });
  // Sedge tussocks hug the banks; the floor between culms is leaf litter.
  const tussocks = scatter(170, 34, r => {
    const z = 7 - r() * 40, side = r() > 0.5 ? 1 : -1;
    const x = streamCenter(z) + side * (streamWidth(z) + 0.05 + Math.pow(r(), 2.5) * 1.6);
    if (bankRockPatch(z, side) > 0.6 && r() < 0.5) return null;
    return { x, y: 0, z, yaw: 0, scale: new THREE.Vector3(), color: new THREE.Color() };
  });
  const sedgeRecords = scatter(6500, 33, r => {
    const t = tussocks[Math.floor(r() * tussocks.length)];
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.3;
    const x = t.x + Math.cos(a) * d, z = t.z + Math.sin(a) * d;
    const h = 0.25 + r() * 0.5;
    return { x, y: Math.max(0.06, forestFloor(x, z)) - 0.01, z, yaw: a + (r() - 0.5) * 0.8, tilt: 0.2 + r() * 0.5, scale: new THREE.Vector3(0.012 + r() * 0.008, h, h), color: srgb(0.19 + r() * 0.07, 0.42 + r() * 0.2, 0.24 + r() * 0.14) };
  });
  root.add(instanced(bladeGeometry(2, 0.55), sedges, sedgeRecords, { cast: false, receive: true }));
  const litterAtlas = litterTexture({ seed: 19, colors: ['#a48a54', '#7d6a40', '#c0a464', '#8e7a4e'], narrow: true });
  const litterMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: litterAtlas, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.8 }), { key: 'bamboo-litter', canopy, coverage: true });
  for (let cell = 0; cell < 4; cell++) {
    const records = scatter(1500, 700 + cell, r => {
      const z = 8 - Math.pow(r(), 1.3) * 26, side = r() > 0.5 ? 1 : -1;
      const x = streamCenter(z) + side * (streamWidth(z) + 0.25 + r() * 7);
      const s = 0.18 + r() * 0.12;
      return { x, y: forestFloor(x, z) + 0.012, z, yaw: r() * Math.PI * 2, tilt: (r() - 0.5) * 0.2, scale: new THREE.Vector3(s, s, s), color: srgb(0.1, 0.25, 0.5 + r() * 0.35) };
    });
    const litter = instanced(litterGeometry(cell), litterMaterial, records, { cast: false, receive: true });
    litter.layers.set(1); root.add(litter);
  }

  // ---- The reachable branch: a few large leaves on a spring ----------------------------------------
  const touchBranch = new THREE.Group(); touchBranch.name = 'Near bamboo leaves — gentle spring touch';
  touchBranch.position.set(1.44, 1.13, 2.05); touchBranch.rotation.z = -0.3;
  const touchTargets: THREE.Object3D[] = [];
  const nearLeafTexture = singleLeafTexture({ seed: 5, palette: { base: '#58802a', light: '#a2c450', dark: '#34521a', stem: '#6a7436' }, width: 96, height: 640, round: -0.25, fill: 0.44 });
  const nearLeafMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: nearLeafTexture, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.42 }), {
    key: 'bamboo-near-leaf', canopy, coverage: true, translucency: { tint: '#f4ff90', back: 0.9, forward: 2.0 },
  });
  const nearLeafGeometry = new THREE.PlaneGeometry(0.12, 0.52, 2, 8);
  nearLeafGeometry.translate(0, 0.26, 0);
  {
    const p = nearLeafGeometry.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i) / 0.06, y = p.getY(i) / 0.52; p.setZ(i, x * x * 0.014 - Math.sin(y * Math.PI * 0.72) * 0.06); }
    nearLeafGeometry.computeVertexNormals();
  }
  const nearLeaves: Placement[] = [], nearTwigs: Array<{ a: THREE.Vector3; b: THREE.Vector3; r: number }> = [];
  const stemEnd = new THREE.Vector3(-1.1, 0.56, -0.12);
  nearTwigs.push({ a: new THREE.Vector3(0.84, -0.33, 0.15), b: stemEnd, r: 0.016 });
  const leafQuaternions: THREE.Quaternion[] = [];
  for (let k = 0; k < 5; k++) {
    const p = new THREE.Vector3(0.55, -0.15, 0.10).lerp(stemEnd, k / 4);
    const dir = k % 2 ? 1 : -1;
    const end = p.clone().add(new THREE.Vector3(-0.25, dir * 0.12, range(0.07, 0.22)));
    nearTwigs.push({ a: p, b: end, r: 0.005 });
    for (let j = 0; j < 3; j++) {
      const direction = new THREE.Vector3(-0.85 + j * 0.64, range(-0.32, -0.09), range(-0.1, 0.35)).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), range(-0.5, 0.5)));
      leafQuaternions.push(q);
      const scale = range(0.64, 0.98);
      nearLeaves.push({ x: end.x - j * 0.035, y: end.y + j * 0.018, z: end.z, yaw: 0, scale: new THREE.Vector3(scale, scale, scale), color: srgb(0.235 + rng() * 0.025, 0.4, range(0.5, 0.62)) });
    }
  }
  const nearLeafMesh = new THREE.InstancedMesh(nearLeafGeometry, nearLeafMaterial, nearLeaves.length);
  nearLeaves.forEach((leaf, i) => {
    nearLeafMesh.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(leaf.x, leaf.y, leaf.z), leafQuaternions[i], leaf.scale));
    nearLeafMesh.setColorAt(i, leaf.color);
  });
  nearLeafMesh.castShadow = true; nearLeafMesh.receiveShadow = true; nearLeafMesh.computeBoundingSphere();
  nearLeafMesh.name = 'Touch bamboo leaves';
  const nearTwigMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.9, 1, 1, 6, 1), twigMaterial, nearTwigs.length);
  nearTwigs.forEach(({ a, b, r }, i) => {
    const d = b.clone().sub(a);
    nearTwigMesh.setMatrixAt(i, new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()), new THREE.Vector3(r, d.length(), r)));
  });
  nearTwigMesh.castShadow = true;
  const heroLeaf = new THREE.Mesh(nearLeafGeometry, nearLeafMaterial);
  heroLeaf.name = 'Reachable individual bamboo leaf';
  heroLeaf.position.set(-0.48, 0.25, 0.17);
  heroLeaf.rotation.set(0.94, -0.38, 0.68);
  heroLeaf.scale.set(1.25, 1.18, 1.18);
  heroLeaf.castShadow = true; heroLeaf.receiveShadow = true;
  touchBranch.add(nearTwigMesh, nearLeafMesh, heroLeaf);
  root.add(touchBranch); touchTargets.push(heroLeaf, nearLeafMesh);

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
    post: {
      exposure: 1.2, bloomStrength: 0.08, bloomThreshold: 0, aoStrength: 0.9, aoRadius: 0.6,
      saturation: 1.06, contrast: 1.1, shadowTint: [0.88, 1.0, 1.02], highlightTint: [1.05, 1.03, 0.92], vignette: 0.38, grain: 0.022,
    },
    prepare(renderer) { environment = bakeEnvironment(renderer, scene, sky, { intensity: 0.8, canopy: { color: new THREE.Color(0.07, 0.11, 0.05), cover: 0.7 } }); },
    createVolume: () => createWoodsVolume({
      canopy, toSun: TO_SUN, sun: new THREE.Color(1, 0.94, 0.78).multiplyScalar(2.4), ambient: new THREE.Color(0.1, 0.14, 0.1).multiplyScalar(0.6),
      haze: [0.0042, 0.025, -0.2, 75], mist: [0.02, 0.5, 0.12, 0.06], anisotropy: 0.68, steps: 30,
    }),
    update: (now, dt) => {
      time.value = now;
      waterMaterial.uniforms.uTime.value = now;
      waterMaterial.uniforms.uBwCanopyTime.value = now;
      const step = Math.min(dt, 0.04);
      springVelocity += (-springPosition * 16 - springVelocity * 4.7) * step;
      springPosition += springVelocity * step;
      touchBranch.rotation.z = -0.30 + Math.sin(now * 0.49) * 0.025 + springPosition;
      touchBranch.rotation.x = Math.sin(now * 0.36) * 0.018 + springPosition * 0.18;
    },
    dispose: () => { water.dispose(); environment?.dispose(); environment = null; },
  };
}
