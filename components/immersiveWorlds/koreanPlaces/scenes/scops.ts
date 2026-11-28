import * as THREE from 'three';
import type { SceneContent, WorldInteraction } from '../types';
import { createCheckedEnvironment } from '../environment';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { fbm3, seeded } from '../../shared/render/noise';
import { applyFoliage, applyWeathering, applyWood, bakeStatic, glowTexture, KP_NOISE, lathe, taperedTube } from './kit';
import { buildOwl, forestFloor, leafClusterTexture, NIGHT_SKY_GLSL, oakBark } from './scopsParts';

/** Toward the moon: low over the far ridge, up and to the left of the stream. */
const MOON = new THREE.Vector3(-.17, .25, -.95).normalize();
const MOON_COLOR = new THREE.Color('#a9c2ff');
// Meanders right near the porch, then bends left under the moon so its light can lie on the water.
const riverX = (z: number) => 3.3 + Math.sin((-z - 10) * .074) * 2.6 + Math.max(0, z + 12) * .22 - 9 * THREE.MathUtils.smoothstep(-z, 16, 45);
const RIVER_GLSL = 'float riverX(float z) { return 3.3 + sin((-z - 10.0) * 0.074) * 2.6 + max(0.0, z + 12.0) * 0.22 - 9.0 * smoothstep(16.0, 45.0, -z); }';

const SKY_FRAGMENT = /* glsl */ `
${KP_NOISE}
${NIGHT_SKY_GLSL}
uniform float uTime;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  vec3 col = nightSky(d, 1.0);
  // Faint band of the galaxy and high moonlit cloud wisps.
  vec3 band = normalize(vec3(0.55, 0.62, 0.56));
  float mw = exp(-pow(dot(d, band) / 0.2, 2.0)) * (0.45 + 0.55 * bwFbm3(d * 7.0)) * smoothstep(0.05, 0.3, d.y);
  col += vec3(0.012, 0.014, 0.022) * mw;
  vec2 uv = d.xz / (max(d.y, 0.0) + 0.14);
  float n = bwFbm5(vec3(uv * vec2(0.8, 1.9) + vec2(uTime * 0.002, 0.0), 4.0));
  float cloud = smoothstep(0.08, 0.5, n) * smoothstep(0.03, 0.12, d.y) * (1.0 - smoothstep(0.3, 0.55, d.y));
  vec3 cloudCol = vec3(0.012, 0.016, 0.026) + vec3(0.22, 0.26, 0.34) * pow(max(dot(d, uMoonDir), 0.0), 9.0);
  col = mix(col, cloudCol, cloud * 0.7);
  gl_FragColor = vec4(col, 1.0);
}`;

const WATER_FRAGMENT = /* glsl */ `
${KP_NOISE}
${NIGHT_SKY_GLSL}
uniform float uTime;
uniform vec3 uLantern;
uniform vec3 uLanternColor;
uniform float uFog;
uniform vec3 uFogColor;
varying vec3 vWorld;
float waterHeight(vec2 p) {
  float t = uTime;
  return bwNoise(vec3(p * vec2(1.4, 0.55) + vec2(0.0, t * 0.32), t * 0.05)) * 0.6
       + bwNoise(vec3(p * vec2(4.2, 2.0) + vec2(t * 0.05, t * 0.55), 1.7)) * 0.25
       + bwNoise(vec3(p * 11.0 + vec2(0.0, t * 0.8), 3.1)) * 0.08;
}
void main() {
  vec3 V = normalize(cameraPosition - vWorld);
  vec2 p = vWorld.xz;
  const float e = 0.03;
  float h0 = waterHeight(p);
  vec2 g = vec2(waterHeight(p + vec2(e, 0.0)) - h0, waterHeight(p + vec2(0.0, e)) - h0) / e;
  float dist = length(cameraPosition - vWorld);
  vec3 n = normalize(vec3(-g.x * 0.05, 1.0, -g.y * 0.05) * vec3(1.0 / (1.0 + dist * 0.04), 1.0, 1.0 / (1.0 + dist * 0.04)));
  vec3 R = reflect(-V, n);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, V), 0.0), 5.0);
  // Overhanging canopy darkens most reflected sky; gaps let the moonlit sky through.
  float canopy = smoothstep(0.1, 0.55, bwFbm3(vec3(vWorld.xz * 0.18 + R.xz * 3.0, 1.0)));
  vec3 refl = nightSky(normalize(R), 0.0) * mix(0.45, 1.0, canopy);
  // The moonlit mist lying over the stream is mirrored as a soft silver band.
  refl += vec3(0.045, 0.06, 0.095) * smoothstep(0.35, 0.0, R.y) * (0.6 + 0.4 * canopy);
  float moonGlint = pow(max(dot(R, uMoonDir), 0.0), 900.0) * 6.0 + pow(max(dot(R, uMoonDir), 0.0), 60.0) * 0.12;
  refl += vec3(0.75, 0.85, 1.0) * moonGlint * canopy;
  vec3 toLamp = uLantern - vWorld;
  float lamp = pow(max(dot(R, normalize(toLamp)), 0.0), 220.0) * 3.0 / (1.0 + dot(toLamp, toLamp) * 0.08);
  vec3 col = vec3(0.004, 0.008, 0.01) + refl * fres + uLanternColor * lamp * fres;
  col = mix(col, uFogColor, uFog * (1.0 - exp(-dist * 0.022)));
  gl_FragColor = vec4(col, 1.0);
}`;

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${KP_NOISE}
${RIVER_GLSL}
uniform vec3 uMoonDir;
uniform vec3 uMoonColor;
uniform vec3 uAmbient;
uniform vec3 uLantern;
uniform vec3 uLanternColor;
uniform float uHaze;
uniform float uMist;
float canopy(vec3 p) {
  if (p.y > 9.0) return 1.0;
  float travel = (8.5 - p.y) / max(uMoonDir.y, 0.15);
  vec2 s = p.xz + uMoonDir.xz * travel;
  return smoothstep(0.05, 0.55, bwNoise(vec3(s * 0.16, 2.0)) * 0.7 + bwNoise(vec3(s * 0.55, 7.0)) * 0.3);
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 95.0);
  float cosT = dot(rd, uMoonDir);
  float phase = (0.55 * bwPhase(cosT, 0.55) + 0.45 * bwPhase(cosT, 0.1)) * 12.5663706;
  float jitter = bwIgn(gl_FragCoord.xy);
  const int STEPS = 32;
  vec3 scatter = vec3(0.0);
  float T = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float s = (float(i) + jitter) / float(STEPS);
    float t = maxT * s * s;
    float dt = maxT * 2.0 * max(s, 0.5 / float(STEPS)) / float(STEPS);
    vec3 p = ro + rd * t;
    float y = p.y + 0.9;
    float haze = uHaze * exp(-max(y, 0.0) / 9.0);
    float stream = 1.0 - smoothstep(0.8, 3.0, abs(p.x - riverX(p.z)));
    float drift = smoothstep(0.35, 0.75, bwValue(p * vec3(0.16, 0.5, 0.16) + vec3(uTime * 0.03, 0.0, uTime * 0.012)));
    float mist = uMist * exp(-max(y, 0.0) / (0.5 + stream * 0.6)) * (0.1 + 0.9 * drift) * (0.3 + stream * 1.6) * smoothstep(-6.0, -12.0, p.z);
    float density = haze + mist;
    vec3 toLamp = uLantern - p;
    vec3 lamp = uLanternColor / (1.0 + dot(toLamp, toLamp) * 1.6);
    vec3 radiance = (uMoonColor * phase * canopy(p) + uAmbient + lamp) * density;
    float stepT = exp(-density * dt);
    scatter += T * radiance * (1.0 - stepT) / max(density, 1e-6);
    T *= stepT;
  }
  gl_FragColor = vec4(scatter, T);
}`;

/** Original procedural Korean forest-edge porch at night. All textures are authored here. */
export function createScopsScene(renderer: THREE.WebGLRenderer): SceneContent {
  let seed = 78219;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0a1220');
  const directFog = new THREE.FogExp2('#142235', .018);
  scene.fog = directFog;
  scene.userData.exposure = 1.35;
  const camera = new THREE.PerspectiveCamera(53, 1, .08, 420);
  const staticRoot = new THREE.Group(); scene.add(staticRoot);
  const textures: THREE.Texture[] = [];
  const own = <T extends THREE.Texture>(t: T) => { textures.push(t); return t; };
  const add = (parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], p: [number, number, number] = [0, 0, 0], cast = true) => {
    const m = new THREE.Mesh(geometry, material); m.position.set(...p); m.castShadow = cast; m.receiveShadow = true; parent.add(m); return m;
  };
  /** Timber with softly rounded long edges (extruded along Z). */
  const plank = (w: number, h: number, d: number, r = .015) => {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2); shape.lineTo(w / 2 - r, -h / 2); shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r); shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); shape.lineTo(-w / 2, -h / 2 + r); shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false, curveSegments: 3 }); g.translate(0, 0, -d / 2); return g;
  };

  /* --------------------------------------------------------------- lights */
  const sky = new THREE.Mesh(new THREE.SphereGeometry(380, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uMoonDir: { value: MOON.clone() }, uTime: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: SKY_FRAGMENT,
  }));
  sky.renderOrder = -10; sky.frustumCulled = false; scene.add(sky);
  // Stars: many faint points with a few brighter ones, each twinkling slowly on its own phase.
  const starRand = seeded(9917);
  const starPositions: number[] = [], starData: number[] = [];
  for (let i = 0; i < 2200; i++) {
    const u = starRand() * 2 - 1, a = starRand() * Math.PI * 2, y = Math.abs(u) * .96 + .04;
    const r = Math.sqrt(1 - y * y);
    const d = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    if (d.dot(MOON) > .985) continue;
    starPositions.push(d.x * 350, d.y * 350, d.z * 350);
    const b = Math.pow(starRand(), 6);
    starData.push(.15 + b * 3.2, starRand() * 6.28, .4 + starRand() * .9);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeo.setAttribute('star', new THREE.Float32BufferAttribute(starData, 3));
  const starMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uTime: { value: 0 }, uScale: { value: 1 } },
    vertexShader: `attribute vec3 star; uniform float uTime; uniform float uScale; varying float vB;
      void main(){ vB = star.x * (0.78 + 0.22 * sin(uTime * star.z + star.y)) * smoothstep(0.02, 0.2, normalize(position).y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = (1.6 + star.x * 0.5) * uScale; }`,
    fragmentShader: `varying float vB; void main(){ vec2 c = gl_PointCoord - 0.5; float a = exp(-dot(c, c) * 18.0); gl_FragColor = vec4(vec3(0.75, 0.82, 1.0) * vB * a, 1.0); }`,
  });
  const stars = new THREE.Points(starGeo, starMat); stars.renderOrder = -9; stars.frustumCulled = false; scene.add(stars);

  const hemi = new THREE.HemisphereLight('#2c3e60', '#0b0d0a', .22); scene.add(hemi);
  const moonLight = new THREE.DirectionalLight(MOON_COLOR, .95);
  moonLight.target.position.set(0, 0, -6); moonLight.position.copy(moonLight.target.position).addScaledVector(MOON, 40);
  moonLight.castShadow = true; moonLight.shadow.mapSize.set(2048, 2048);
  Object.assign(moonLight.shadow.camera, { left: -14, right: 14, top: 12, bottom: -12, near: 10, far: 80 });
  moonLight.shadow.radius = 3; moonLight.shadow.normalBias = .03; moonLight.shadow.bias = -.0003;
  scene.add(moonLight, moonLight.target);
  const envCanvas = document.createElement('canvas'); envCanvas.width = 256; envCanvas.height = 128;
  const envCtx = envCanvas.getContext('2d')!; const envGradient = envCtx.createLinearGradient(0, 0, 0, 128);
  envGradient.addColorStop(0, '#1b2740'); envGradient.addColorStop(.46, '#41506a'); envGradient.addColorStop(.52, '#1f2a24'); envGradient.addColorStop(1, '#0d100c');
  envCtx.fillStyle = envGradient; envCtx.fillRect(0, 0, 256, 128);
  const moonGlow = envCtx.createRadialGradient(57, 54, 1, 57, 54, 40); moonGlow.addColorStop(0, 'rgba(200,215,255,.9)'); moonGlow.addColorStop(1, 'rgba(200,215,255,0)');
  envCtx.fillStyle = moonGlow; envCtx.fillRect(0, 0, 256, 128);
  const envTexture = new THREE.CanvasTexture(envCanvas); envTexture.colorSpace = THREE.SRGBColorSpace; envTexture.mapping = THREE.EquirectangularReflectionMapping;
  const checkedEnvironment = createCheckedEnvironment(renderer, envTexture, 'scops'); scene.environment = checkedEnvironment.texture; scene.environmentIntensity = .35;

  /* ---------------------------------------------------------- materials */
  const deckWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'z', plank: { across: 'x', width: .48, offset: 4.59 }, light: '#6f5a46', dark: '#3e3126', polish: .5, rings: 26, roughness: [.55, .72], key: 'porch-deck' });
  const frameWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#5d4c3c', dark: '#33281f', rings: 9, roughness: [.7, .85], key: 'porch-frame-x' });
  const postWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'y', light: '#5d4c3c', dark: '#33281f', rings: 9, roughness: [.7, .85], key: 'porch-post' });
  const tableWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#7a5a3d', dark: '#3f2c1d', polish: 1, rings: 14, roughness: [.35, .5], key: 'scops-table' });
  const bark = oakBark('scops');
  const stone = createRockMaterial('#7f8279', { key: 'scops-stream-stone', scale: 1.6, bump: .9, stainAmount: .1, cavity: .55, waterY: -.66, wetBand: .35, wetRoughness: .18, algae: '#2e3a22', algaeAmount: .5, moss: { color: '#3b4a24', amount: .55 } });

  /* ------------------------------------------------------------- porch */
  for (let i = 0; i < 19; i++) {
    const board = add(staticRoot, plank(.465, .11, 6.7), deckWood, [-4.35 + i * .48, -.065 + (random() - .5) * .006, 3.2]);
    board.rotation.y = (random() - .5) * .0012;
  }
  add(staticRoot, plank(9.25, .3, .26), frameWood, [0, -.18, -.17]);
  // Posts are extruded along Z, then stood upright.
  const post = (x: number, y: number, z: number, w: number, h: number) => { const m = add(staticRoot, plank(w, w, h), postWood, [x, y, z]); m.rotation.x = Math.PI / 2; return m; };
  post(-3.85, 1.7, .04, .32, 3.4); post(4.15, 1.7, .1, .27, 3.4);
  add(staticRoot, plank(8.5, .31, .34), frameWood, [.15, 3.26, .04]);
  // Eave overhead: rafters and boards seen from below frame the top of the view.
  add(staticRoot, new THREE.BoxGeometry(10.5, .06, 5.0), frameWood, [.15, 3.62, 2.2]);
  for (let i = 0; i < 26; i++) { const r = add(staticRoot, new THREE.CylinderGeometry(.055, .06, 5.2, 10), frameWood, [-4.9 + i * .4, 3.52, 2.1]); r.rotation.x = Math.PI / 2 - .12; }
  for (const x of [-3.78, 4.07]) {
    const brace = add(staticRoot, plank(.17, 1.07, .18), frameWood, [x + (x < 0 ? .29 : -.29), 2.89, .05]); brace.rotation.z = x < 0 ? -.7 : .7;
  }
  add(staticRoot, plank(1.0, .15, .85), deckWood, [3.65, -.3, -.6]);
  post(4.08, .35, -.12, .16, .83); post(4.08, .35, 2.8, .16, .83);
  add(staticRoot, plank(.2, .16, 3.2), frameWood, [4.08, .81, 1.32]);

  /* ------------------------------------------------------------ terrain */
  const groundHeight = (x: number, z: number) => {
    let height = -.8 + Math.sin(x * .31 + z * .17) * .18 + Math.cos(z * .27) * .12 + fbm3(x * .15, 0, z * .15, 3) * .15;
    if (z < 1 && z > -90) {
      const distance = Math.abs(x - riverX(z));
      height += Math.exp(-Math.pow((distance - 1.15) / .65, 2)) * .2;
      height = THREE.MathUtils.lerp(height, -1.1, 1 - THREE.MathUtils.smoothstep(distance, .57, 1.07));
    }
    return height + Math.max(0, -z - 45) * .05 * (1 + fbm3(x * .05, 3, z * .05, 2));
  };
  // Non-uniform grid: 25 cm cells near the porch and stream (the bed is ~1 m wide), coarse far away.
  const span = (ranges: Array<[number, number, number]>) => { const out: number[] = []; for (const [a, b, step] of ranges) for (let v = a; step > 0 ? v < b - 1e-6 : v > b + 1e-6; v += step) out.push(v); out.push(ranges[ranges.length - 1][1]); return out; };
  const xs = span([[-55, -22, 1.5], [-22, 22, .25], [22, 55, 1.5]]);
  const zs = span([[8, -26, -.25], [-26, -62, -.6], [-62, -110, -1.6]]);
  const gPositions: number[] = [], gIndices: number[] = [];
  for (const z of zs) for (const x of xs) gPositions.push(x, groundHeight(x, z), z);
  for (let r = 0; r < zs.length - 1; r++) for (let c = 0; c < xs.length - 1; c++) {
    const a = r * xs.length + c, b = a + 1, d = a + xs.length, e = d + 1;
    gIndices.push(a, b, d, b, e, d);
  }
  const groundGeo = new THREE.BufferGeometry();
  groundGeo.setAttribute('position', new THREE.Float32BufferAttribute(gPositions, 3)); groundGeo.setIndex(gIndices);
  groundGeo.computeVertexNormals();
  add(staticRoot, groundGeo, forestFloor(RIVER_GLSL), [0, 0, 0], false);
  const riverVertices: number[] = [], riverIndices: number[] = [];
  for (let i = 0; i <= 140; i++) {
    const z = 1 - i * .65, width = .84 + Math.sin(i * .091) * .12 + Math.sin(i * .73) * .055;
    for (let k = 0; k <= 4; k++) riverVertices.push(riverX(z) - width + k / 4 * width * 2, -.66, z);
    if (i < 140) for (let k = 0; k < 4; k++) { const a = i * 5 + k; riverIndices.push(a, a + 1, a + 5, a + 1, a + 6, a + 5); }
  }
  const riverGeo = new THREE.BufferGeometry(); riverGeo.setAttribute('position', new THREE.Float32BufferAttribute(riverVertices, 3)); riverGeo.setIndex(riverIndices); riverGeo.computeVertexNormals();
  const lanternWorld = new THREE.Vector3(1.15, 1.0, 1.5);
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uMoonDir: { value: MOON.clone() }, uLantern: { value: lanternWorld }, uLanternColor: { value: new THREE.Vector3(1, .55, .2) }, uFog: { value: 1 }, uFogColor: { value: new THREE.Color('#142235').convertSRGBToLinear() } },
    vertexShader: 'varying vec3 vWorld; void main(){ vec4 p = modelMatrix * vec4(position, 1.0); vWorld = p.xyz; gl_Position = projectionMatrix * viewMatrix * p; }',
    fragmentShader: WATER_FRAGMENT,
  });
  const water = add(staticRoot, riverGeo, waterMaterial, [0, 0, 0], false); water.receiveShadow = false; water.userData.keep = true;
  // Stream stones and a few larger mossy boulders.
  const stoneGeos = [0, 1, 2, 3, 4].map(s => boulderGeometry(s + 11, 2));
  for (let i = 0; i < 70; i++) {
    const z = 1 - random() * 60, side = random() > .5 ? 1 : -1;
    const s = .18 + random() * .3;
    const m = add(staticRoot, stoneGeos[i % 5].clone(), stone, [riverX(z) + side * (.8 + random() * .4), -.62, z]);
    m.scale.set(s * 1.4, s * .55, s * (.8 + random() * .5)); m.rotation.y = random() * 6.28;
  }
  for (let i = 0; i < 10; i++) {
    const z = -2 - random() * 20, x = (random() - .5) * 18;
    if (Math.abs(x - riverX(z)) < 2) continue;
    const m = add(staticRoot, stoneGeos[i % 5].clone(), stone, [x, groundHeight(x, z) + .1, z]);
    const s = .5 + random() * .7; m.scale.set(s * 1.3, s * .6, s); m.rotation.y = random() * 6.28;
  }
  stoneGeos.forEach(g => g.dispose());
  // Distant ridges stand as dark layered silhouettes above the trees.
  for (let layer = 0; layer < 3; layer++) {
    const positions: number[] = [], indices: number[] = [];
    const nx = 160, nz = 10;
    for (let iz = 0; iz <= nz; iz++) for (let ix = 0; ix <= nx; ix++) {
      const x = -180 + ix * 360 / nx, dz = iz / nz * 30;
      const crest = 9 + layer * 6 + Math.sin(x * .035 + layer * 1.7) * (4 + layer) + Math.sin(x * .09 + layer) * 1.6 + fbm3(x * .05, layer, 0, 3) * 3;
      positions.push(x, -1 + crest * Math.exp(-Math.pow(dz / 14, 2)), -70 - layer * 28 + dz);
      if (ix < nx && iz < nz) { const a = iz * (nx + 1) + ix; indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    add(staticRoot, g, new THREE.MeshStandardMaterial({ color: ['#1c2a22', '#223230', '#2a3c40'][layer], roughness: 1 }), [0, 0, 0], false);
  }

  /* ------------------------------------------------------------- forest */
  const leafMaps = [own(leafClusterTexture(31)), own(leafClusterTexture(77))];
  const leafMats = leafMaps.map((map, i) => applyFoliage(new THREE.MeshStandardMaterial({ map, color: '#ffffff', roughness: .75, side: THREE.DoubleSide, alphaTest: .45, alphaToCoverage: true }), { translucency: '#7ea86a', wrap: .5, key: `scops-leaves-${i}` }));
  const cardGeo = new THREE.PlaneGeometry(1, 1);
  const leafMatrices: THREE.Matrix4[][] = [[], []], leafColors: THREE.Color[][] = [[], []];
  const o = new THREE.Object3D();
  const cluster = (centre: THREE.Vector3, radius: number, count: number, size: number) => {
    for (let j = 0; j < count; j++) {
      const a = random() * Math.PI * 2, r = Math.pow(random(), .6) * radius;
      o.position.set(centre.x + Math.cos(a) * r, centre.y + (random() - .4) * radius * .7, centre.z + Math.sin(a) * r * .8);
      o.rotation.set(-Math.PI / 2 + (random() - .5) * 1.8, random() * Math.PI * 2, (random() - .5) * 1.2, 'YXZ');
      const s = size * (.7 + random() * .6); o.scale.set(s, s, s); o.updateMatrix();
      const k = j % 2; leafMatrices[k].push(o.matrix.clone());
      leafColors[k].push(new THREE.Color().setHSL(.23 + random() * .07, .25 + random() * .25, .2 + random() * .14));
    }
  };
  const limb = (a: THREE.Vector3, b: THREE.Vector3, r1: number, r2: number, sides = 9) => {
    const mid = a.clone().lerp(b, .5); const len = a.distanceTo(b);
    mid.x += (random() - .5) * len * .1; mid.z += (random() - .5) * len * .09;
    // A minimum radius keeps twigs wider than a half-resolution mist texel (no bright hairlines).
    return add(staticRoot, taperedTube([a, mid, b], t => Math.max(.014, THREE.MathUtils.lerp(r1, r2, t)), len > .3 ? 10 : 4, sides), bark);
  };
  const treePositions: [number, number, number][] = [[-3.7, -.55, -3.8], [-7, -.5, -8], [7.8, -.55, -13], [-11, -.6, -16], [13, -.6, -24], [-9, -.6, -28], [-15, -.6, -40], [17, -.6, -43]];
  treePositions.forEach(([x, y, z], index) => {
    const h = index === 0 ? 5.8 : 6 + random() * 4, r = index === 0 ? .34 : .24 + random() * .18;
    const a = new THREE.Vector3(x, -1.05, z), b = new THREE.Vector3(x + .25, y + h * .56, z + .18), c = new THREE.Vector3(x - .08, y + h, z - .23);
    add(staticRoot, taperedTube([a, a.clone().lerp(b, .5).add(new THREE.Vector3(.08, 0, 0)), b, c], t => r * (1 - .65 * t) * (1 + .5 * Math.exp(-t * 25)), 18, index < 3 ? 14 : 9,
      (p, t, ang) => 1 + .05 * Math.sin(ang * 6 + p.y * 2) * (1 - t)), bark);
    for (let k = 0; k < 7; k++) {
      const level = .36 + k * .075, start = new THREE.Vector3(x + .12, y + h * level, z), angle = k * 2.36 + index;
      const end = new THREE.Vector3(x + Math.cos(angle) * (1.7 + random() * 1.4), y + h * level + 1.1, z + Math.sin(angle) * 2);
      if (index === 0 && k === 0) { end.y -= .36; end.z -= .18; }
      limb(start, end, r * .24, .025);
      cluster(end, 1.2 + random() * .7, 55, .95 + index * .02);
    }
    cluster(c, 1.5, 60, 1.0);
  });
  // The owl's branch: one continuous limb in front of the forest, no approach.
  const branchA = new THREE.Vector3(-3.7, 1.84, -3.8), branchB = new THREE.Vector3(-1.6, 2.25, -4.7), branchC = new THREE.Vector3(.8, 2.37, -6.0);
  add(staticRoot, taperedTube([branchA, branchA.clone().lerp(branchB, .5).add(new THREE.Vector3(0, .05, 0)), branchB, branchB.clone().lerp(branchC, .5).add(new THREE.Vector3(0, .02, 0)), branchC], t => THREE.MathUtils.lerp(.135, .025, t), 30, 12), bark);
  limb(new THREE.Vector3(-2.7, 2.05, -4.1), new THREE.Vector3(-2.4, 3.4, -4.4), .06, .016);
  limb(new THREE.Vector3(-.1, 2.32, -5.5), new THREE.Vector3(.9, 2.88, -5.9), .032, .012);
  cluster(new THREE.Vector3(.8, 2.95, -5.9), .65, 34, .8);
  cluster(new THREE.Vector3(-2.45, 3.25, -4.4), .7, 38, .85);
  const overhangA = new THREE.Vector3(-3.56, 3.25, -3.94), overhangB = new THREE.Vector3(-.8, 3.98, -5.12), overhangC = new THREE.Vector3(1.4, 4.45, -6.2);
  limb(overhangA, overhangB, .083, .039); limb(overhangB, overhangC, .039, .012);
  for (let i = 0; i < 5; i++) {
    const t = .15 + i * .19, p = overhangB.clone().lerp(overhangC, t), tip = p.clone().add(new THREE.Vector3(.15, .25 + (i % 2) * .22, i % 2 ? .5 : -.45));
    limb(p, tip, .016, .003, 5); cluster(tip, .55, 30, .75);
  }
  for (let i = 0; i < 34; i++) {
    const x = (random() - .5) * 30, z = -2 - random() * 38; if (Math.abs(x - riverX(z)) < 1.6) continue;
    const h = .25 + random() * 1.15, rr = .55 + random() * .85, centre = new THREE.Vector3(x, groundHeight(x, z) + .3 + h * .55, z);
    limb(new THREE.Vector3(x, groundHeight(x, z), z), centre.clone().add(new THREE.Vector3(.12, h * .4, .05)), .025, .005, 5);
    cluster(centre, rr, 26, .7 + random() * .2);
  }
  for (let i = 0; i < 22; i++) {
    const x = (random() - .5) * 65, z = -19 - random() * 37; if (Math.abs(x - riverX(z)) < 2) continue;
    const h = 3.4 + random() * 5.0;
    add(staticRoot, taperedTube([new THREE.Vector3(x, -1, z), new THREE.Vector3(x + (random() - .5) * .5, h * .5, z + .2), new THREE.Vector3(x + (random() - .5) * .9, h, z + .5)], t => .09 * (1 - t * .7) + .04, 8, 6), bark);
    cluster(new THREE.Vector3(x, h * .72, z), 1.6 + random(), 34, 1.3);
    cluster(new THREE.Vector3(x, h, z), 1.2 + random(), 30, 1.2);
  }
  for (let i = 0; i < 38; i++) {
    const x = -42 + i * 2.24, z = -42 - random() * 14, h = 3.3 + random() * 3.3;
    cluster(new THREE.Vector3(x, h, z), 1.8 + random() * .8, 30, 1.6);
    cluster(new THREE.Vector3(x + .6, h - 1.4, z - .3), 1.9, 24, 1.5);
  }
  // Keep a natural opening around the perch so the owl reads in both compositions.
  const sightlines = [new THREE.Vector3(0, 1.33, 4.05), new THREE.Vector3(.22, 1.22, 3.6)];
  const owlAt = new THREE.Vector3(-1.28, 2.55, -4.84);
  leafMatrices.forEach((list, k) => {
    const kept: THREE.Matrix4[] = [], keptColors: THREE.Color[] = [];
    list.forEach((matrix, i) => {
      const e = matrix.elements, x = e[12], y = e[13], z = e[14], size = Math.hypot(e[0], e[1], e[2]);
      const blocks = sightlines.some(eye => {
        const t = (z - eye.z) / (owlAt.z - eye.z); if (t <= 0 || t > 1.4) return false;
        const dx = x - THREE.MathUtils.lerp(eye.x, owlAt.x, t), dy = y - THREE.MathUtils.lerp(eye.y, owlAt.y, t);
        const rx = .32 * t + size * .5, ry = .45 * t + size * .4; return dx * dx / (rx * rx) + dy * dy / (ry * ry) < 1;
      });
      if (!blocks) { kept.push(matrix); keptColors.push(leafColors[k][i]); }
    });
    const canopyMesh = new THREE.InstancedMesh(cardGeo, leafMats[k], kept.length);
    kept.forEach((m, i) => { canopyMesh.setMatrixAt(i, m); canopyMesh.setColorAt(i, keptColors[i]); });
    canopyMesh.castShadow = true; canopyMesh.receiveShadow = true; canopyMesh.name = `canopy-${k}`; scene.add(canopyMesh);
  });
  // Grass and ferns frame the view below the decking.
  const grassGeo = new THREE.BufferGeometry(); grassGeo.setAttribute('position', new THREE.Float32BufferAttribute([-.03, 0, 0, .03, 0, 0, .014, .3, -.012, .026, .6, -.06], 3)); grassGeo.setIndex([0, 1, 2, 1, 3, 2]); grassGeo.computeVertexNormals();
  const grassMat = applyFoliage(new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide, roughness: .9 }), { translucency: '#26381c', wrap: .4, key: 'scops-grass' });
  const grasses = new THREE.InstancedMesh(grassGeo, grassMat, 4200);
  for (let i = 0; i < 4200; i++) {
    const cl = Math.floor(i / 35), cx = Math.sin(cl * 13.61) * 14, cz = -1 - (Math.cos(cl * 7.23) * .5 + .5) * 34;
    let x = cx + (random() - .5) * 2.4; const z = cz + (random() - .5) * 2;
    if (Math.abs(x - riverX(z)) < 1.2) x += 3.2;
    o.position.set(x, groundHeight(x, z), z); o.rotation.set(0, random() * Math.PI * 2, (random() - .5) * .8); o.scale.setScalar(.35 + random() * .75); o.updateMatrix();
    grasses.setMatrixAt(i, o.matrix); grasses.setColorAt(i, new THREE.Color().setHSL(.22 + random() * .07, .3, .16 + random() * .12));
  }
  grasses.receiveShadow = true; scene.add(grasses);
  const fernMatrices: THREE.Matrix4[] = [];
  for (const [x, z, s] of [[-2.7, -1.2, 1], [2.9, -2, .9], [-4.1, -2.7, 1.2], [5, -3.5, 1.3], [-1.6, -1.7, .8], [-6, -4.5, 1.1], [6.5, -6, 1]]) {
    for (let frond = 0; frond < 7; frond++) {
      const a = frond * .9 + .4, start = new THREE.Vector3(x, groundHeight(x, z), z), end = new THREE.Vector3(x + Math.sin(a) * s, groundHeight(x, z) + .7 + frond * .04, z + Math.cos(a) * s);
      for (let k = 1; k < 10; k++) for (const side of [-1, 1]) {
        const t = k / 11, pos = start.clone().lerp(end, t); pos.y += Math.sin(t * Math.PI) * .25 * s - t * t * .3 * s;
        const sz = Math.sin(t * Math.PI) * .3 * s;
        o.position.set(pos.x + Math.cos(a) * sz * .5 * side, pos.y, pos.z - Math.sin(a) * sz * .5 * side);
        o.rotation.set(-Math.PI / 2 + .3, a + (side > 0 ? .7 : -.7), 0); o.scale.set(sz, .3, .4); o.updateMatrix(); fernMatrices.push(o.matrix.clone());
      }
    }
  }
  // Fallen leaves in drifts break up the moonlit floor (flat, so they never stand as hairlines).
  const litterMat = new THREE.MeshStandardMaterial({ map: leafMaps[1], color: '#ffffff', roughness: .9, alphaTest: .5, alphaToCoverage: true, side: THREE.DoubleSide });
  const litterCount = 1800, litter = new THREE.InstancedMesh(cardGeo, litterMat, litterCount);
  for (let i = 0; i < litterCount; i++) {
    let x = (random() - .5) * 24; const z = -.6 - Math.pow(random(), .8) * 24;
    if (Math.abs(x - riverX(z)) < 1.3) x += x < riverX(z) ? -1.6 : 1.6;
    o.position.set(x, groundHeight(x, z) + .012, z); o.rotation.set(-Math.PI / 2 + (random() - .5) * .25, 0, random() * 6.28);
    o.scale.setScalar(.35 + random() * .45); o.updateMatrix(); litter.setMatrixAt(i, o.matrix);
    litter.setColorAt(i, new THREE.Color().setHSL(.07 + random() * .07, .35 + random() * .2, .32 + random() * .18));
  }
  litter.receiveShadow = true; scene.add(litter);
  const ferns = new THREE.InstancedMesh(cardGeo, leafMats[0], fernMatrices.length); fernMatrices.forEach((m, i) => ferns.setMatrixAt(i, m)); ferns.receiveShadow = true; scene.add(ferns);

  /* ---------------------------------------------------------------- owl */
  const owl = buildOwl();
  owl.group.position.set(-1.28, 2.29, -4.84); owl.group.rotation.y = .12; owl.group.scale.setScalar(1.22);
  scene.add(owl.group);
  // Soft moonlit-sky bounce from the open stream side: reveals plumage without a spotlight.
  const owlFill = new THREE.PointLight('#8fa6d8', .5, 2.6, 2); owlFill.position.set(-.7, 2.75, -3.7); scene.add(owlFill);
  const lidMeshes = owl.lids;
  // Merge the static plumage (wings, tail, feet); the body and head keep animating.
  owl.body.userData.keep = true;
  owl.head.traverse(object => { object.userData.keep = true; });
  bakeStatic(owl.group, owl.group);

  /* ------------------------------------------------------------ lantern */
  const table = new THREE.Group(); table.position.set(1.15, 0, 1.5); scene.add(table);
  add(table, plank(.84, .085, .69), tableWood, [0, .4, 0]);
  for (const x of [-.32, .32]) for (const z of [-.24, .24]) { const leg = add(table, plank(.065, .065, .39), tableWood, [x, .2, z]); leg.rotation.x = Math.PI / 2; }
  const lantern = new THREE.Group(); lantern.position.set(0, .45, 0); table.add(lantern);
  const brass = applyWeathering(new THREE.MeshStandardMaterial({ color: '#b39a62', metalness: .9, roughness: .38 }), { key: 'brass', mottle: .3, bump: .4, scale: 6 });
  const darkMetal = applyWeathering(new THREE.MeshStandardMaterial({ color: '#2d302b', metalness: .6, roughness: .55 }), { key: 'dark-metal', mottle: .3, scale: 6 });
  const glowing = new THREE.MeshStandardMaterial({ color: '#ffcf8a', emissive: '#ff9a3c', emissiveIntensity: 6, roughness: .8 });
  add(lantern, new THREE.CylinderGeometry(.15, .17, .11, 32), brass, [0, .05, 0]);
  add(lantern, new THREE.CylinderGeometry(.11, .115, .07, 32), new THREE.MeshStandardMaterial({ color: '#3a2e1c', roughness: .5, metalness: .1 }), [0, .126, 0]);
  const glass = new THREE.MeshPhysicalMaterial({ color: '#fff3dc', transparent: true, opacity: .16, roughness: .05, metalness: 0, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false, emissive: '#ffb066', emissiveIntensity: .02 });
  add(lantern, lathe([[.135, 0], [.142, .04], [.13, .16], [.112, .27], [.103, .31]], 32), glass, [0, .145, 0], false);
  const flame = add(lantern, new THREE.SphereGeometry(.029, 16, 12), glowing, [0, .215, 0], false); flame.scale.set(.55, 1.6, .55); flame.userData.keep = true;
  add(lantern, new THREE.CylinderGeometry(.004, .004, .03, 6), darkMetal, [0, .18, 0], false);
  for (const side of [-1, 1]) add(lantern, taperedTube([new THREE.Vector3(side * .165, .08, 0), new THREE.Vector3(side * .16, .27, 0), new THREE.Vector3(side * .155, .47, 0)], () => .011, 8, 8), darkMetal);
  add(lantern, new THREE.CylinderGeometry(.065, .17, .095, 32), darkMetal, [0, .5, 0]);
  add(lantern, new THREE.CylinderGeometry(.055, .065, .055, 16), brass, [0, .575, 0]);
  add(lantern, new THREE.TorusGeometry(.16, .009, 8, 40, Math.PI), darkMetal, [0, .58, 0]);
  add(lantern, new THREE.CylinderGeometry(.026, .026, .06, 12), brass, [.175, .076, 0]).rotation.z = Math.PI / 2;
  const lanternLight = new THREE.PointLight('#ff9d55', 3.8, 7, 1.8); lanternLight.position.set(1.15, 1.3, 1.78); lanternLight.castShadow = false; scene.add(lanternLight);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: own(glowTexture(64, 2.4)), color: '#ffb36b', transparent: true, opacity: .35, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo.position.set(0, .22, 0); halo.scale.set(.9, .9, 1); lantern.add(halo);
  const dishMat = new THREE.MeshPhysicalMaterial({ color: '#5f6c62', roughness: .35, clearcoat: .8 });
  add(table, lathe([[0, 0], [.08, 0], [.115, .028], [.11, .03], [.07, .006], [0, .006]], 32), dishMat, [-.27, .44, .08]);
  for (let i = 0; i < 2; i++) { const p = add(table, new THREE.SphereGeometry(.045, 14, 10), stone, [-.29 + i * .07, .47, .08]); p.scale.y = .4; }
  const raycaster = new THREE.Raycaster();
  const touchProxy = add(lantern, new THREE.SphereGeometry(.32, 12, 10), new THREE.MeshBasicMaterial({ visible: false }), [0, .34, 0], false); touchProxy.scale.y = 1.4; touchProxy.userData.keep = true;

  /* ------------------------------------------------------------- baking */
  bakeStatic(staticRoot, scene);
  bakeStatic(table, table);

  let brightness = 1, targetBrightness = 1, brightnessStep = 1, lastTime = 0, nextBlink = 4.1, blinkUntil = -1, callStart = -100;
  let volumeLantern: THREE.Vector3 | null = null;
  const lanternBase = 3.8;
  const applyBrightness = () => {
    lanternLight.intensity = lanternBase * brightness; glowing.emissiveIntensity = 3 + brightness * 4;
    halo.material.opacity = .18 + brightness * .17;
    if (volumeLantern) volumeLantern.set(1, .55, .2).multiplyScalar(.09 * brightness);
    waterMaterial.uniforms.uLanternColor.value.set(1, .55, .2).multiplyScalar(brightness);
  };
  function resize(aspect: number) {
    camera.aspect = aspect;
    if (aspect < .8) { camera.fov = 58; camera.position.set(.22, 1.22, 3.6); camera.lookAt(.2, 1.35, -5.8); table.position.set(.37, 0, .84); lanternLight.position.set(.37, 1.3, 1.12); }
    else { camera.fov = 52; camera.position.set(0, 1.33, 4.05); camera.lookAt(.2, 1.15, -10); table.position.set(1.15, 0, 1.5); lanternLight.position.set(1.15, 1.3, 1.78); }
    lanternWorld.set(table.position.x, 1.0, table.position.z);
    starMat.uniforms.uScale.value = Math.max(1, Math.min(2, (renderer.domElement.height || 720) / 720));
    camera.updateProjectionMatrix(); scene.updateMatrixWorld(true);
  }
  resize(1.6);
  const skyUniforms = (sky.material as THREE.ShaderMaterial).uniforms;
  function update(time: number, dt: number) {
    lastTime = time; waterMaterial.uniforms.uTime.value = time; skyUniforms.uTime.value = time; starMat.uniforms.uTime.value = time;
    brightness = THREE.MathUtils.damp(brightness, targetBrightness, 5, Math.min(dt, .1)); applyBrightness();
    // A slow, gentle flame breath: never a flicker or flash.
    flame.scale.set(.55, 1.6 + Math.sin(time * 1.3) * .05 + Math.sin(time * 2.1) * .03, .55);
    if (time > nextBlink) { blinkUntil = time + .18; nextBlink = time + 6.3 + random() * 12; }
    const closing = time < blinkUntil ? Math.sin((blinkUntil - time) / .18 * Math.PI) : 0;
    lidMeshes.forEach(lid => { lid.scale.y = .05 + closing; });
    const callAge = time - callStart, callWeight = callAge >= 0 && callAge < 1.35 ? Math.sin(callAge / 1.35 * Math.PI) : 0;
    owl.head.rotation.y = Math.sin(time * .12) * .12 + Math.sin(time * .047) * .08;
    owl.head.rotation.x = callWeight * -.065;
    owl.body.scale.y = 1 + callWeight * .03;
    owl.tufts.forEach((t, i) => { t.rotation.x = -.15 + Math.sin(time * .2 + i) * .03; });
  }
  function interact(ndc: THREE.Vector2): WorldInteraction | null {
    raycaster.setFromCamera(ndc, camera); scene.updateMatrixWorld(true);
    if (!raycaster.intersectObject(touchProxy, false).length) return null;
    brightnessStep = (brightnessStep + 1) % 3; targetBrightness = [.55, 1, 1.35][brightnessStep];
    // Immediate adjustment also works when the host is holding a reduced-motion static frame.
    brightness = targetBrightness; applyBrightness();
    const p = new THREE.Vector3(); lantern.getWorldPosition(p);
    return { scene: 'nature:scops_night', type: 'lantern', strength: targetBrightness / 1.35, position: p.toArray() as [number, number, number] };
  }
  return {
    scene, camera, resize, update, interact,
    dispose() { checkedEnvironment.dispose(); textures.forEach(t => t.dispose()); },
    audioEvent(type: 'scops-call') { if (type === 'scops-call') callStart = lastTime; },
    post: {
      exposure: 1.45, bloomStrength: .12, bloomThreshold: 0, aoStrength: .9, aoRadius: .6,
      saturation: .95, contrast: 1.08, shadowTint: [.86, .95, 1.16], highlightTint: [1.1, 1.0, .86], vignette: .55, grain: .03,
    },
    setPostActive(active) {
      scene.fog = active ? null : directFog;
      waterMaterial.uniforms.uFog.value = active ? 0 : 1;
    },
    createVolume(): VolumeEffect {
      volumeLantern = new THREE.Vector3();
      applyBrightness();
      return { material: new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          uMoonDir: { value: MOON.clone() }, uMoonColor: { value: new THREE.Vector3(MOON_COLOR.r, MOON_COLOR.g, MOON_COLOR.b).multiplyScalar(.32) },
          uAmbient: { value: new THREE.Vector3(.012, .018, .03) }, uLantern: { value: lanternWorld }, uLanternColor: { value: volumeLantern },
          uHaze: { value: .005 }, uMist: { value: .035 },
        },
      }) };
    },
  };
}
