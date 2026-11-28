import * as THREE from 'three';
import { createPool } from './environment';
import type { WorldContent } from './types';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { fbm3, ridged3 } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { bakeWaterfallTextures } from './waterfallTextures';
import { createBoil, createFalls, createMist, createSpray, type FallShape, type FlowUniforms } from './waterfallFlow';
import { WATERFALL_POOL_FRAGMENT, waterfallPoolUniforms } from './waterfallPool';
import { wetByFalls } from './waterfallRock';

const SUN_TOWARD = new THREE.Vector3(-18, 34, 13).normalize();
// The notch the river pours through: its rim height and its face (lip z) across
// x, fitted to the cliff mesh so each curtain column leaves the rock it sits on.
const notchLip = (x: number) => 20.66 + .25 * Math.max(0, .72 - x) - .3 * THREE.MathUtils.clamp(x - .72, 0, .8) - .6 * Math.max(0, x - 1.52);
const notchFace = (x: number) => -26.75 + .95 * THREE.MathUtils.smoothstep(x, .85, 1.7);
const FALL_FOOT = new THREE.Vector3(0.72, 0.4, -22.2);
const SIDE_FOOT = new THREE.Vector3(-7.0, 0.6, -22.2);
// The valley breeze that carries spray and mist toward the outlet (m/s).
const WIND = new THREE.Vector3(0.14, 0, 0.18);
// Main curtain, its veil and strands, the two jets that peel off its edges,
// and the small seep on the left wall. Back to front: one merged mesh draws them in this order.
const FALL_SHEETS: FallShape[] = [
  { x: .72, top: 20.66, base: .16, width: 2.7, spread: .32, z: -26.85, throw: 1.95, seed: .37, density: .9, kind: 0, lip: notchLip, face: x => notchFace(x) - .1 },
  { x: -7.0, top: 7.16, base: .3, width: .34, spread: .5, z: -23.32, throw: .8, seed: 6.6, density: .7, kind: 0 },
  { x: .72, top: 20.66, base: .16, width: 2.48, spread: .45, z: -26.75, throw: 2.1, seed: 1.7, density: 1, kind: 1, lip: notchLip, face: notchFace },
  { x: -7.0, top: 7.16, base: .3, width: .36, spread: .5, z: -23.25, throw: .9, seed: 7.9, density: .9, kind: 1 },
  { x: -.95, top: 20.55, base: .16, width: .44, spread: .8, z: -26.75, throw: 1.9, seed: 4.1, density: .85, kind: 3, drift: -.55 },
  { x: 2.12, top: 20.06, base: .16, width: .42, spread: .8, z: -25.7, throw: 2.2, seed: 5.3, density: .9, kind: 3, drift: .65 },
  { x: .66, top: 20.6, base: .16, width: 1.9, spread: .42, z: -26.69, throw: 2.3, seed: 2.9, density: .85, kind: 2, lip: notchLip, face: x => notchFace(x) + .06 },
];
const MAIN_FALL = FALL_SHEETS[2];

/** Slow, aperiodic swell of the fall's flow; spray, mist and ripples follow it. */
export function fallSurge(time: number) {
  return THREE.MathUtils.clamp(.5 + .32 * Math.sin(time * .53 + .4) * Math.sin(time * .21 + 1.3) + .18 * Math.sin(time * 1.37), 0, 1);
}

// Sunlit spray plume at the foot of the fall, a faint valley haze, and shafts
// of sun broken by the canopy above the gorge rim. The plume is marched on its
// own, finely, inside a sphere around the foot; it billows upward and leans
// with the same breeze and surge as the mist billboards and spray particles.
const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform vec3 uToSun;
uniform vec3 uSun;
uniform vec3 uSky;
uniform vec3 uFoot;
uniform vec3 uWind;
uniform float uSpray;
uniform float uSurge;
uniform float uHaze;
float canopy(vec3 p) {
  float travel = (24.0 - p.y) / max(uToSun.y, 0.2);
  vec2 s = p.xz + uToSun.xz * travel;
  return smoothstep(-0.15, 0.45, bwNoise(vec3(s * 0.12, 3.0)) * 0.75 + bwNoise(vec3(s * 0.4, 9.0)) * 0.25);
}
float plume(vec3 p) {
  vec3 o = p - uFoot;
  float h = max(o.y, 0.0);
  vec2 lateral = (o.xz - uWind.xz * h * 1.4 - vec2(0.0, 0.6)) / vec2(2.0 + h * 0.42, 1.5 + h * 0.3);
  float shape = exp(-dot(lateral, lateral)) * exp(-h * 0.3) * smoothstep(-0.7, 0.2, o.y);
  if (shape < 0.004) return 0.0;
  vec3 drift = vec3(uWind.x, 0.9, uWind.z + 0.2) * uTime;
  vec3 q = p - drift;
  float billow = bwValue(q * 0.5) * 0.62 + bwValue(q * 1.25 + 7.0) * 0.38;
  return uSpray * shape * smoothstep(0.25, 0.8, billow + shape * 0.45) * (0.7 + 0.45 * uSurge);
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 70.0);
  if (rd.y < -1e-4) maxT = min(maxT, (0.03 - ro.y) / rd.y);
  float phase = bwPhase(dot(-uToSun, -rd), 0.55) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy);
  // Plume bounds.
  vec3 centre = uFoot + vec3(uWind.x * 4.0, 3.4, 1.0 + uWind.z * 4.0);
  const float RADIUS = 7.5;
  vec3 oc = ro - centre;
  float b = dot(oc, rd), disc = b * b - dot(oc, oc) + RADIUS * RADIUS;
  float m0 = 0.0, m1 = 0.0;
  if (disc > 0.0) { float r = sqrt(disc); m0 = max(-b - r, 0.0); m1 = min(-b + r, maxT); }
  float split = m1 > m0 ? 0.5 * (m0 + m1) : 1e9;
  const int STEPS = 32;
  float dt = maxT / float(STEPS);
  vec3 before = vec3(0.0), after = vec3(0.0);
  float tBefore = 1.0, tAfter = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float t = (float(i) + jitter) * dt;
    vec3 p = ro + rd * t;
    float haze = uHaze * exp(-max(p.y, 0.0) * 0.12) * (0.6 + 0.4 * bwValue(p * 0.08 + uTime * 0.01));
    vec3 radiance = (uSun * phase * canopy(p) + uSky) * haze;
    float stepT = exp(-haze * dt);
    vec3 add = radiance * (1.0 - stepT) / max(haze, 1e-4);
    if (t < split) { before += tBefore * add; tBefore *= stepT; }
    else { after += tAfter * add; tAfter *= stepT; }
  }
  vec3 mist = vec3(0.0);
  float tMist = 1.0;
  if (m1 > m0) {
    const int MIST = 16;
    float mdt = (m1 - m0) / float(MIST);
    float sun = canopy(centre) * (0.45 + 0.55 * phase);
    for (int i = 0; i < MIST; i++) {
      vec3 p = ro + rd * (m0 + (float(i) + jitter) * mdt);
      float density = plume(p);
      if (density <= 0.0) continue;
      // Spray is lit through itself: denser and lower parts are a little greyer.
      float self = exp(-density * 1.6) * (0.7 + 0.3 * smoothstep(0.0, 6.0, p.y - uFoot.y));
      vec3 radiance = (uSun * sun * (0.55 + 0.45 * self) + uSky * 1.5) * density;
      float stepT = exp(-density * mdt);
      mist += tMist * radiance * (1.0 - stepT) / max(density, 1e-4);
      tMist *= stepT;
    }
  }
  gl_FragColor = vec4(before + tBefore * (mist + tMist * after), tBefore * tMist * tAfter);
}
`;

/** Original geometry/materials. Metres, Y up; the observer rests above the pool's near lip. */
export function createWaterfall(renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#c5dce0');
  scene.fog = new THREE.FogExp2('#98b9ac', 0.012);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.06, 130);
  camera.position.set(0, 2.15, 8.4);
  const target = new THREE.Vector3(0.75, 5.45, -21);
  camera.lookAt(target);
  const timeUniform = { value: 0 };
  const rnd = seeded(83111);
  const occluders: THREE.Object3D[] = [];
  const textures = bakeWaterfallTextures(renderer);
  const fog = scene.fog as THREE.FogExp2;
  const flow: FlowUniforms = {
    time: timeUniform, surge: { value: fallSurge(0) },
    toSun: { value: SUN_TOWARD.clone() },
    // Radiance of sunlit and sky-lit white water, matched to the key light.
    sunColor: { value: new THREE.Color(1.0, .94, .84).multiplyScalar(2.6) },
    skyColor: { value: new THREE.Color(.42, .55, .62) },
    fogColor: { value: fog.color.clone() }, fogDensity: { value: fog.density },
    foot: { value: FALL_FOOT.clone() }, sideFoot: { value: SIDE_FOOT.clone() }, wind: { value: WIND.clone() },
    viewport: { value: new THREE.Vector2(1280, 800) },
  };
  const wetZones = { fall: { x: MAIN_FALL.x, top: MAIN_FALL.top, halfWidth: 1.35 }, foot: FALL_FOOT, seep: { x: SIDE_FOOT.x, top: 7.16, z: -18.2 } };
  const sky = new THREE.Mesh(new THREE.SphereGeometry(98, 28, 16), new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform }, side: THREE.BackSide, depthWrite: false,
    vertexShader: `varying vec3 vSky;void main(){vSky=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 vSky;uniform float uTime;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
      void main(){vec3 d=normalize(vSky);float elevation=max(0.,d.y);
        vec3 c=mix(vec3(1.1,1.35,1.4),vec3(.42,.7,1.0),pow(elevation,.6));
        vec2 q=d.xz/max(.12,d.y)*1.4+vec2(uTime*.0015,0.);float cloud=n(q)*.65+n(q*2.04)*.25+n(q*4.1)*.1;
        float veil=smoothstep(.53,.76,cloud)*smoothstep(.02,.2,elevation)*.65;
        gl_FragColor=vec4(mix(c,vec3(2.4,2.35,2.1),veil),1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }));
  scene.add(sky);

  scene.add(new THREE.HemisphereLight('#bfe0e6', '#3b3a2c', 0.55));
  const sunlight = new THREE.DirectionalLight('#ffe6b8', 5.2);
  sunlight.position.set(-18, 34, 13);
  sunlight.target.position.set(1, 6, -19);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048, 2048);
  sunlight.shadow.camera.left = -27;
  sunlight.shadow.camera.right = 27;
  sunlight.shadow.camera.top = 29;
  sunlight.shadow.camera.bottom = -22;
  sunlight.shadow.camera.near = 1;
  sunlight.shadow.camera.far = 90;
  sunlight.shadow.normalBias = .16;
  sunlight.shadow.bias = -.0005;
  sunlight.shadow.radius = 3;
  // Static cliff/shore occlusion is cached; centimetre-scale leaf sway does not need a whole gorge shadow pass.
  sunlight.shadow.autoUpdate = false;
  sunlight.shadow.needsUpdate = true;
  scene.add(sunlight, sunlight.target);
  const bounce = new THREE.DirectionalLight('#9fd6c8', 0.55);
  bounce.position.set(5, 6, 8);
  scene.add(bounce);

  // The gorge is one continuous weathered face, not a row of detached boulders.
  const wallMaterial = createRockMaterial('#858a80', { key: 'waterfall-cliff', moss: { color: '#55702a', amount: .85 }, scale: .8, bump: 1.3, stain: '#6b5a3c', stainAmount: .4, cavity: .6, strata: .8, waterY: .025, wetBand: 1.6, drips: .45, dryRoughness: .84, wetRoughness: .2, algae: '#3a4a28', algaeAmount: .5 });
  wallMaterial.vertexColors = true;
  wallMaterial.side = THREE.DoubleSide;
  wallMaterial.shadowSide = THREE.FrontSide;
  wetByFalls(wallMaterial, timeUniform, wetZones, 'cliff');
  const cliffPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-15, 0, 13), new THREE.Vector3(-14, 0, -4),
    new THREE.Vector3(-10.8, 0, -15.5), new THREE.Vector3(-6.3, 0, -25.2),
    new THREE.Vector3(0.5, 0, -27.0), new THREE.Vector3(7.4, 0, -22.4),
    new THREE.Vector3(12, 0, -13.8), new THREE.Vector3(15, 0, -1),
    new THREE.Vector3(18, 0, 12),
  ]);
  const cliffGeo = new THREE.BufferGeometry();
  const wallVertices: number[] = [], wallColors: number[] = [], wallIndices: number[] = [];
  const nc = 260, nr = 150;
  const stoneColor = new THREE.Color();
  for (let row = 0; row <= nr; row++) {
    for (let col = 0; col <= nc; col++) {
      const u = col / nc;
      const p = cliffPath.getPoint(u);
      const normal = new THREE.Vector3(-p.x, 0, -10 - p.z).normalize();
      const height = 21.7 + Math.sin(u * 15 + 1) * 2.4 + Math.sin(u * 41) * 1.0 + Math.sin(u * 77) * .4 - 4.15 * Math.exp(-Math.pow((u - .50) * 19, 2));
      const y = -2 + row / nr * (height + 2);
      const ledge = Math.pow(0.5 + 0.5 * Math.sin(y * 1.08 + u * 21 + noise2(u * 8, y * .12, 3) * 2.1), 9) * (.25 + .75 * Math.pow(Math.sin(u * 29), 2));
      const broad = noise2(u * 17, y * 0.18, 39) * 1.5 + noise2(u * 42, y * 0.32, 18) * 0.7 + Math.sin(u * 51 + Math.sin(y * .09) * .35) * .65;
      const fine = noise2(u * 100, y * 2.2, 86) * 0.22;
      const cuts = Math.pow(Math.max(0, Math.cos(u * 112 + Math.sin(y * 0.15) * .6)), 12) * .8;
      const eroded = fbm3(p.x * .22, y * .22, p.z * .22, 4) * .9 + (ridged3(p.x * .5, y * .55, p.z * .5, 3) - .3) * .6;
      const projection = broad + fine + ledge * .75 - cuts + eroded;
      wallVertices.push(p.x + normal.x * projection, y, p.z + normal.z * projection);
      const wetChannel = Math.exp(-Math.pow((u - .50) * 17, 2));
      const damp = Math.max(0, 1 - y / 7) * .22 + wetChannel * .14;
      const green = Math.max(0, noise2(u * 23, y * 0.34, 8) - .18) * .58;
      const brightness = .92 - damp - cuts * .08 + ledge * .05;
      stoneColor.setRGB(brightness * (1 - green * 0.57), brightness * (1 - green * 0.03), brightness * (1 - green * 0.62));
      wallColors.push(stoneColor.r, stoneColor.g, stoneColor.b);
      if (row < nr && col < nc) {
        const a = row * (nc + 1) + col, b = a + nc + 1;
        wallIndices.push(a, a + 1, b, a + 1, b + 1, b);
      }
    }
  }
  cliffGeo.setAttribute('position', new THREE.Float32BufferAttribute(wallVertices, 3));
  cliffGeo.setAttribute('color', new THREE.Float32BufferAttribute(wallColors, 3));
  cliffGeo.setIndex(wallIndices);
  cliffGeo.computeVertexNormals();
  const cliff = new THREE.Mesh(cliffGeo, wallMaterial);
  cliff.castShadow = cliff.receiveShadow = true;
  scene.add(cliff);
  occluders.push(cliff);

  const bankMaterial = createRockMaterial('#6a6d60', { key: 'waterfall-bank', moss: { color: '#4f6c27', amount: .55 }, scale: 1.1, bump: 1.1, cavity: .5, strata: .3, waterY: .025, wetBand: .7, drips: .1, dryRoughness: .86, wetRoughness: .22, algaeAmount: .5 });
  bankMaterial.vertexColors = true;
  bankMaterial.side = THREE.DoubleSide;
  bankMaterial.shadowSide = THREE.FrontSide;
  wetByFalls(bankMaterial, timeUniform, wetZones, 'bank');
  addBank(-1);
  addBank(1);
  // The cropped foreground shelf establishes the seated, human-scale viewpoint.
  const ledgeMat = createRockMaterial('#767a6b', { key: 'waterfall-ledge', moss: { color: '#5a742c', amount: .7 }, scale: 1.3, bump: 1.4, cavity: .65, strata: .35, waterY: .025, wetBand: .8, wetness: .15, drips: .2, dryRoughness: .8, wetRoughness: .18, algaeAmount: .45 });
  const boulder = (position: [number, number, number], scale: [number, number, number], seed: number, material: THREE.Material, detail: number) => {
    const mesh = new THREE.Mesh(boulderGeometry(seed, detail), material);
    mesh.position.set(...position); mesh.scale.set(...scale); mesh.rotation.y = seed * .71;
    mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh);
    return mesh;
  };
  occluders.push(boulder([-2.9, -.4, 4.9], [3.25, 1.05, 2.4], 177, ledgeMat, 20));
  occluders.push(boulder([3.1, -.35, 5.8], [2.95, 1.05, 2.3], 232, ledgeMat, 20));
  const dampStone = createRockMaterial('#5a665c', { key: 'waterfall-damp', moss: { color: '#4f6a28', amount: .8 }, scale: 1.2, bump: 1.3, cavity: .6, strata: .3, waterY: .025, wetBand: .9, wetness: .3, drips: .2, dryRoughness: .75, wetRoughness: .16, algaeAmount: .5 });
  wetByFalls(dampStone, timeUniform, wetZones, 'damp');

  const rockPositions: [number, number, number, number, number, number][] = [
    [-8, 0.1, -1, 2.2, 1.2, 2], [-6.8, -0.2, -9, 1.9, 0.9, 1.7],
    [7.4, 0, -6, 2.3, 1.1, 2.7], [6.5, -0.1, -14, 1.9, 0.9, 1.5],
    [-5.2, -0.2, -20.8, 1.9, 1.4, 1.2], [4.8, -0.45, -22.1, 2.1, 1.2, 1.8],

  ];
  rockPositions.forEach((p, i) => {
    const rock = boulder([p[0], p[1], p[2]], [p[3], p[4], p[5]], 300 + i, dampStone, 14);
    rock.rotation.y = i * 0.83;
    occluders.push(rock);
  });

  const pool = createPool(renderer, scene, {
    width: 37, depth: 46, y: 0.025, color: '#2a8a7f', position: [0, 0.025, -8], distortion: 0.88,
    clear: { deepColor: '#06302c', glow: { x: FALL_FOOT.x, z: FALL_FOOT.z, radius: 4.2, color: new THREE.Color(.75, .95, .9).multiplyScalar(1.4) }, lightDirection: SUN_TOWARD, glint: 5 },
    surface: { fragmentShader: WATERFALL_POOL_FRAGMENT, uniforms: waterfallPoolUniforms(textures, flow) },
  });
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(33, 44, 1, 1), new THREE.MeshStandardMaterial({ color: '#174b45', roughness: 1 }));
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.set(0, -1.8, -8);
  scene.add(bottom);

  // Layered curtains, plunge boil, spray and mist: all animated on the GPU from the scene clock.
  scene.add(createFalls(FALL_SHEETS, textures, flow));
  scene.add(createBoil(textures, flow, new THREE.Vector2(2.7, 1.5), .04));
  const spray = createSpray({ plunge: 1400, edge: 360, side: 120, floating: 240 }, MAIN_FALL, flow, rnd);
  scene.add(spray.mesh);
  const billows = createMist({ plunge: 52, side: 5 }, textures, flow, rnd, .025);
  scene.add(billows.mesh);

  // Fallback spray cards for renderers without the HDR volume pass.
  const mistCards: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform, uSeed: { value: i * 4.21 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform float uTime,uSeed;void main(){vec2 p=vUv*2.-1.;
        p.y += sin(p.x*4.2+uTime*.19+uSeed)*.12;
        float a=exp(-dot(p*vec2(1.12,1.6),p*vec2(1.12,1.6))*2.7);
        float w=.72+.18*sin(p.x*7.+p.y*4.+uTime*.17+uSeed)+.1*sin(p.x*13.-uTime*.11+uSeed);
        gl_FragColor=vec4(.74,.87,.83,a*w*.14);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    const mist = new THREE.Mesh(new THREE.PlaneGeometry(7.6 + i * 1.2, 2.1 + i * .12), mat);
    mist.position.set(FALL_FOOT.x + .1 - i * 0.32, .68 + i * .08, FALL_FOOT.z + .5 + i * .65);
    mist.rotation.y = i * 0.13;
    scene.add(mist); mistCards.push(mist);
  }

  const foliage = makeFoliage();
  scene.add(foliage);

  function addBank(side: number) {
    const nx = 35, nz = 67;
    const pos: number[] = [], col: number[] = [], idx: number[] = [];
    for (let j = 0; j <= nz; j++) {
      const z = 15 - j / nz * 42;
      const edge = (4.6 + 0.9 * Math.sin(z * 0.24 + side) + 1.2 * Math.sin(z * 0.1)) * side;
      for (let i = 0; i <= nx; i++) {
        const v = i / nx;
        const x = edge + v * side * 11;
        const n = noise2(x * 0.67, z * 0.67, 16);
        const shelf = Math.pow(Math.max(0, Math.sin(x * 3 + z * 0.4)), 7) * 0.13;
        const y = -0.45 + v * 3.2 + n * (0.10 + v * 0.30) + shelf;
        pos.push(x, y, z);
        const moss = Math.max(0, noise2(x * 0.5, z * 0.8, 9));
        col.push(.65 - moss * .16, .7 - moss * .04, .56 - moss * .2);
        if (j < nz && i < nx) {
          const a = j * (nx + 1) + i, b = a + nx + 1;
          if (side < 0) idx.push(a, b, a + 1, a + 1, b, b + 1);
          else idx.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, bankMaterial); mesh.castShadow = mesh.receiveShadow = true;
    scene.add(mesh); occluders.push(mesh);
  }

  function makeFoliage() {
    const positions: number[] = [], colors: number[] = [], bends: number[] = [], indices: number[] = [];
    const stemPositions: number[] = [];
    const localRandom = seeded(324912);
    const leafColor = new THREE.Color();
    const up = new THREE.Vector3(0, 1, 0);
    function leaf(base: THREE.Vector3, direction: THREE.Vector3, length: number, width: number, hue: number, bend = 1) {
      const d = direction.clone().normalize();
      const side = new THREE.Vector3().crossVectors(d, up).normalize();
      if (side.lengthSq() < .1) side.set(1, 0, 0);
      const normal = new THREE.Vector3().crossVectors(side, d).normalize();
      const verts: THREE.Vector3[][] = [];
      const steps = Math.abs(base.z) < 8 && Math.abs(base.x) < 6 ? 6 : 3;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const center = base.clone().addScaledVector(d, t * length).addScaledVector(normal, Math.sin(t * Math.PI) * length * .12);
        const half = Math.sin(Math.PI * Math.pow(t, .8)) * width;
        verts.push([center.clone().addScaledVector(side, -half).addScaledVector(normal, -half * .18), center.clone().addScaledVector(normal, half * .08), center.clone().addScaledVector(side, half).addScaledVector(normal, -half * .18)]);
      }
      leafColor.setHSL(.235 + hue * .07, .35 + hue * .20, .18 + hue * .11);
      function push(v: THREE.Vector3, value: number) {
        positions.push(v.x, v.y, v.z); colors.push(leafColor.r * value, leafColor.g * value, leafColor.b * value); bends.push(bend);
      }
      const start = positions.length / 3;
      for (const row of verts) { push(row[0], .88); push(row[1], 1.08); push(row[2], 1.12); }
      for (let s = 0; s < steps; s++) {
        for (let sideIdx = 0; sideIdx < 2; sideIdx++) {
          const a = start + s * 3 + sideIdx, b = a + 3;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    function fern(x: number, y: number, z: number, size: number, seed: number) {
      const r = seeded(seed); const base = new THREE.Vector3(x, y, z);
      const fronds = 7 + Math.floor(r() * 4);
      for (let f = 0; f < fronds; f++) {
        const angle = f / fronds * Math.PI * 2 + r() * .28;
        const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
        const across = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
        const length = size * (.75 + r() * .47);
        let previous = base.clone();
        for (let n = 1; n <= 15; n++) {
          const t = n / 15;
          const point = base.clone().addScaledVector(radial, length * t * .80);
          point.y += length * (Math.sin(t * 2.4) * .56 + t * .10);
          stemPositions.push(previous.x, previous.y, previous.z, point.x, point.y, point.z);
          previous = point;
          if (n > 1) {
            const bladeLength = length * (.27 * Math.sin(t * Math.PI) + .015);
            for (const sign of [-1, 1]) {
              const dir = across.clone().multiplyScalar(sign).addScaledVector(radial, .48 + t * .30);
              dir.y = .14 - t * .32;
              leaf(point, dir, bladeLength, bladeLength * .135, .2 + r() * .7, t);
            }
          }
        }
      }
    }
    // The two closest ferns have readable stems and paired leaflets, well away from the centre of attention.
    fern(-2.8, .54, 3.8, 1.65, 400);
    fern(2.0, .58, 4.0, 1.4, 401);
    fern(-4.5, .25, 1.6, 1.16, 404);
    fern(4.3, .17, -.3, 1.38, 405);
    fern(-3.25, .38, 6.2, 1.1, 408);
    for (let i = 0; i < 42; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 7 - localRandom() * 31;
      const edge = 4.6 + .9 * Math.sin(z * .24 + side) + 1.2 * Math.sin(z * .1);
      fern(side * (edge + .55 + localRandom() * 2.5), .1 + localRandom() * .45, z, .60 + localRandom() * .8, 430 + i);
    }
    // Narrow creeping vines occupy sheltered fissures rather than a uniform curtain.
    for (let i = 0; i < 23; i++) {
      const u = .10 + localRandom() * .8;
      const p = cliffPath.getPoint(u);
      const inward = new THREE.Vector3(-p.x, 0, -10 - p.z).normalize();
      p.addScaledVector(inward, 1.05);
      p.y = 10 + localRandom() * 12;
      const total = 1.4 + localRandom() * 4.7;
      let previous = p.clone();
      for (let n = 1; n <= 20; n++) {
        const current = p.clone().add(new THREE.Vector3(Math.sin(n * .38 + i) * .17, -n / 20 * total, Math.cos(n * .24 + i) * .11));
        stemPositions.push(previous.x, previous.y, previous.z, current.x, current.y, current.z);
        previous = current;
        const d = inward.clone().multiplyScalar(.35).add(new THREE.Vector3(n % 2 ? -.9 : .9, -.1, .1));
        leaf(current, d, .18 + localRandom() * .22, .060, .25 + localRandom() * .55, .3);
      }
    }
    // Small trees break the cliff skyline; individual leaves, rather than spherical crowns.
    for (const [u, scale] of [[.14, 2.8], [.25, 2.2], [.36, 2.0], [.65, 2.6], [.76, 3.2], [.87, 2.6]]) {
      const trunk = cliffPath.getPoint(u);
      trunk.y = 21.5 + Math.sin(u * 15 + 1) * 2.4 + Math.sin(u * 41) * 1.0 + Math.sin(u * 77) * .4;
      const inward = new THREE.Vector3(-trunk.x, 0, -10 - trunk.z).normalize();
      trunk.addScaledVector(inward, .35);
      const wood = new THREE.Mesh(new THREE.CylinderGeometry(.028 * scale, .05 * scale, scale, 7), new THREE.MeshStandardMaterial({ color: '#534e37', roughness: .97 }));
      wood.position.copy(trunk).add(new THREE.Vector3(0, scale * .5, 0));
      wood.rotation.z = localRandom() * .18 - .09;
      scene.add(wood);
      for (let cluster = 0; cluster < 8; cluster++) {
        const angle = cluster * 2.39;
        const height = scale * (.60 + localRandom() * .55);
        const tip = trunk.clone().add(new THREE.Vector3(Math.sin(angle) * scale * .63, height, Math.cos(angle) * scale * .51));
        const attach = trunk.clone().add(new THREE.Vector3(0, height * .56, 0));
        stemPositions.push(attach.x, attach.y, attach.z, tip.x, tip.y, tip.z);
        for (let n = 0; n < 78; n++) {
          const pos = tip.clone().add(new THREE.Vector3((localRandom() - .5) * scale, (localRandom() - .5) * scale * .48, (localRandom() - .5) * scale));
          const dir = new THREE.Vector3(localRandom() - .5, .25 + localRandom() * .5, localRandom() - .5);
          leaf(pos, dir, .16 + localRandom() * .15, .05 + localRandom() * .045, localRandom(), .3);
        }
      }
    }
    const group = new THREE.Group();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('aBend', new THREE.Float32BufferAttribute(bends, 1));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ color: '#c4dca2', vertexColors: true, side: THREE.DoubleSide, roughness: .6, metalness: 0, emissive: '#2a4a12', emissiveIntensity: .35 });
    mat.onBeforeCompile = shader => {
      shader.uniforms.uForestTime = timeUniform;
      shader.vertexShader = 'uniform float uForestTime; attribute float aBend;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nfloat sway=sin(uForestTime*.38+position.z*.15)+sin(uForestTime*.63+position.x*.19)*.3; transformed.x += sway*.030*aBend; transformed.z += cos(uForestTime*.31+position.x*.13)*.018*aBend;');
    };
    mat.customProgramCacheKey = () => 'waterfall-ferns-v1';
    const leaves = new THREE.Mesh(geo, mat); leaves.castShadow = leaves.receiveShadow = true;
    group.add(leaves);
    const stemGeo = new THREE.BufferGeometry();
    stemGeo.setAttribute('position', new THREE.Float32BufferAttribute(stemPositions, 3));
    group.add(new THREE.LineSegments(stemGeo, new THREE.LineBasicMaterial({ color: '#607143', transparent: true, opacity: .78 })));
    return group;
  }

  let lastTap = -100;
  return {
    scene, camera, target,
    post: { exposure: .95, bloomStrength: .08, aoStrength: 1, aoRadius: .8, saturation: 1.1, contrast: 1.16, shadowTint: [.9, 1.0, 1.04], highlightTint: [1.06, 1.02, .92], vignette: .4, grain: .025 },
    createVolume(): VolumeEffect {
      return { material: new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          uToSun: { value: SUN_TOWARD.clone() }, uSun: { value: new THREE.Vector3(2.2, 2.0, 1.6) }, uSky: { value: new THREE.Vector3(.16, .24, .26) },
          uFoot: { value: FALL_FOOT.clone() }, uWind: flow.wind, uSurge: flow.surge, uSpray: { value: .4 }, uHaze: { value: .005 },
        },
      }) };
    },
    setPostActive(active) { mistCards.forEach(card => { card.visible = !active; }); },
    update(time) { timeUniform.value = time; flow.surge.value = fallSurge(time); pool.update(time); },
    interact(ray, time) {
      if (time - lastTap < .55) return null;
      const hit = ray.intersectObject(pool.mesh, false)[0];
      if (!hit || hit.distance > 23 || Math.abs(hit.point.x) > 5.7 || hit.point.z < -18 || hit.point.z > 7.5) return null;
      const obstruction = ray.intersectObjects(occluders, false)[0];
      if (obstruction && obstruction.distance < hit.distance - .03) return null;
      lastTap = time;
      pool.ripple(hit.point.x, hit.point.z, time);
      return { world: 'waterfall', kind: 'pool-ripple', strength: .22, pan: THREE.MathUtils.clamp(hit.point.x / 8, -.55, .55) };
    },
    resize(aspect) {
      const portrait = aspect < .82;
      camera.position.set(portrait ? .40 : 0, portrait ? 2.05 : 2.15, portrait ? 8.8 : 8.4);
      target.set(portrait ? .70 : .75, portrait ? 5.3 : 5.45, -21);
      camera.fov = portrait ? 62 : aspect > 2 ? 52 : 56;
      camera.aspect = aspect; camera.updateProjectionMatrix(); camera.lookAt(target);
      const canvas = renderer.domElement;
      const height = canvas.height || 800;
      flow.viewport.value.set(canvas.width || Math.round(height * aspect), height);
      spray.setPixelScale(typeof renderer.getPixelRatio === 'function' ? renderer.getPixelRatio() : 1);
    },
    dispose() { pool.dispose(); textures.dispose(); },
  };
}

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
function noise2(x: number, y: number, seed: number) {
  const hash = (a: number, b: number) => {
    const n = Math.sin(a * 127.1 + b * 311.7 + seed * 53.17) * 43758.5453;
    return n - Math.floor(n);
  };
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return (THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), sx), THREE.MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), sx), sy) - .5) * 2;
}
