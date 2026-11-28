import * as THREE from 'three';
import type { SceneContent, WorldInteraction } from '../types';
import { createCheckedEnvironment } from '../environment';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { fbm3, seeded } from '../../shared/render/noise';
import { applyFoliage, applyWeathering, applyWood, bakeStatic, glowTexture, KP_NOISE, lathe, taperedTube } from './kit';
import { broadleafClusterTexture, fernFrondTexture, litterTexture } from '../../shared/render/foliageTextures';
import { cardCrown, grassClump, plantMaterial } from './ruralParts';
import { buildOwl, forestFloor, NIGHT_SKY_GLSL, oakBark } from './scopsParts';

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
${RIVER_GLSL}
uniform float uTime;
uniform vec3 uLantern;
uniform vec3 uLanternColor;
uniform float uFog;
uniform vec3 uFogColor;
uniform vec4 uRocks[8];
varying vec3 vWorld;
// Downstream (toward the porch) along the stream's local direction.
vec2 flowDir(float z) { return normalize(vec2((riverX(z + 0.25) - riverX(z - 0.25)) * 2.0, 1.0)); }
float waterHeight(vec2 p, vec2 f, float footprint) {
  vec2 across = vec2(-f.y, f.x);
  float a = dot(p, across), l = dot(p, f);
  float t = uTime;
  // Long streaks combed out by the current, carried downstream at different speeds.
  float h = bwNoise(vec3(a * 2.6, l * 0.75 - t * 0.55, t * 0.06)) * 0.55;
  h += bwNoise(vec3(a * 6.5, l * 2.2 - t * 1.1, 2.0 + t * 0.1)) * 0.3 / (1.0 + footprint * 6.0);
  h += bwNoise(vec3(a * 15.0, l * 9.0 - t * 1.7, 5.0)) * 0.12 / (1.0 + footprint * 25.0);
  // Standing waves and riffles behind each stone.
  for (int i = 0; i < 8; i++) {
    vec2 d = p - uRocks[i].xy;
    float r = uRocks[i].z;
    float down = dot(d, f), side = dot(d, across);
    float wake = exp(-side * side / (r * r * 0.9)) * smoothstep(-r, 0.0, down) * exp(-max(down, 0.0) / (r * 4.0));
    h += wake * sin(down * 9.0 / r - t * 0.6) * 0.5;
  }
  return h;
}
float foamAmount(vec2 p, vec2 f) {
  vec2 across = vec2(-f.y, f.x);
  float foam = 0.0;
  for (int i = 0; i < 8; i++) {
    vec2 d = p - uRocks[i].xy;
    float r = uRocks[i].z;
    float down = dot(d, f), side = dot(d, across);
    float bow = exp(-pow((length(d) - r * 1.05) / (r * 0.25), 2.0)) * smoothstep(0.3 * r, -0.6 * r, down);
    float wake = exp(-side * side / (r * r * (0.5 + max(down, 0.0) * 0.8))) * smoothstep(0.0, r * 0.6, down) * exp(-max(down, 0.0) / (r * 5.0));
    foam += bow * 0.9 + wake * 0.8;
  }
  // Foam breaks into drifting flecks and lines.
  float flecks = smoothstep(0.05, 0.55, bwNoise(vec3(dot(p, across) * 7.0, dot(p, f) * 2.5 - uTime * 0.9, uTime * 0.15)) + 0.2);
  return clamp(foam, 0.0, 1.0) * flecks;
}
void main() {
  vec3 V = normalize(cameraPosition - vWorld);
  vec2 p = vWorld.xz;
  vec2 f = flowDir(p.y);
  float footprint = max(length(dFdx(p)), length(dFdy(p)));
  float e = clamp(footprint, 0.02, 0.2);
  float h0 = waterHeight(p, f, footprint);
  vec2 g = vec2(waterHeight(p + vec2(e, 0.0), f, footprint) - h0, waterHeight(p + vec2(0.0, e), f, footprint) - h0) / e;
  float dist = length(cameraPosition - vWorld);
  vec3 n = normalize(vec3(-g.x * 0.07, 1.0, -g.y * 0.07));
  vec3 R = reflect(-V, n);
  R.y = abs(R.y);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, V), 0.0), 5.0);
  // Overhanging canopy darkens most reflected sky; gaps let the moonlit sky through.
  float canopy = smoothstep(0.1, 0.55, bwFbm3(vec3(vWorld.xz * 0.18 + R.xz * 3.0, 1.0)));
  vec3 refl = nightSky(normalize(R), 0.0) * mix(0.5, 1.15, canopy);
  // The moonlit mist lying over the stream is mirrored as a soft silver band.
  refl += vec3(0.03, 0.04, 0.062) * smoothstep(0.35, 0.0, R.y) * (0.6 + 0.4 * canopy);
  // The far bank's trees fill the low reflections with darkness; their crowns break up toward the sky.
  float bank = 1.0 - smoothstep(0.1, 0.34, R.y + (canopy - 0.5) * 0.16);
  refl = mix(refl, vec3(0.003, 0.0045, 0.006), bank * 0.88);
  // Moon glitter: small facets on the moving surface flash where they face the moon.
  vec2 cell = floor(vec2(dot(p, vec2(-f.y, f.x)) * 14.0, dot(p, f) * 6.0 - uTime * 2.2));
  vec3 facet = bwHash3(vec3(cell, floor(uTime * 1.5)));
  vec3 nf = normalize(n + vec3((facet.x - 0.5) * 0.95, 0.0, (facet.y - 0.5) * 0.95));
  vec3 Rf = reflect(-V, nf);
  float glitter = pow(max(dot(Rf, uMoonDir), 0.0), 110.0) * step(0.5, facet.z) / (1.0 + footprint * 12.0);
  float moonGlint = pow(max(dot(R, uMoonDir), 0.0), 900.0) * 6.0 + pow(max(dot(R, uMoonDir), 0.0), 60.0) * 0.14;
  refl += vec3(0.75, 0.85, 1.0) * (moonGlint + glitter * 9.0) * canopy * (1.0 - bank * 0.5);
  vec3 toLamp = uLantern - vWorld;
  float lamp = pow(max(dot(R, normalize(toLamp)), 0.0), 120.0) * 3.5 / (1.0 + dot(toLamp, toLamp) * 0.06);
  // Shallow, clear water over a stony bed near the banks.
  float edge = smoothstep(0.35, 1.25, abs(p.x - riverX(p.y)));
  vec3 bed = mix(vec3(0.003, 0.005, 0.006), vec3(0.01, 0.011, 0.009) * (0.6 + 0.8 * bwValue(vec3(p * 6.0, 1.0))), edge);
  vec3 col = bed * (1.0 - fres) + refl * fres + uLanternColor * lamp * fres;
  // Moon- and sky-lit foam.
  float foam = foamAmount(p, f);
  col = mix(col, vec3(0.15, 0.17, 0.21) * (0.7 + 0.6 * canopy) + uLanternColor * 0.08 / (1.0 + dot(toLamp, toLamp) * 0.1), foam * 0.9);
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

  const hemi = new THREE.HemisphereLight('#2f4468', '#0b0d0a', .3); scene.add(hemi);
  const moonLight = new THREE.DirectionalLight(MOON_COLOR, 1.9);
  moonLight.target.position.set(0, 0, -6); moonLight.position.copy(moonLight.target.position).addScaledVector(MOON, 40);
  moonLight.castShadow = true; moonLight.shadow.mapSize.set(2048, 2048);
  Object.assign(moonLight.shadow.camera, { left: -14, right: 14, top: 12, bottom: -12, near: 10, far: 80 });
  moonLight.shadow.radius = 3; moonLight.shadow.normalBias = .03; moonLight.shadow.bias = -.0003;
  scene.add(moonLight, moonLight.target);
  const envCanvas = document.createElement('canvas'); envCanvas.width = 256; envCanvas.height = 128;
  const envCtx = envCanvas.getContext('2d')!; const envGradient = envCtx.createLinearGradient(0, 0, 0, 128);
  envGradient.addColorStop(0, '#1b2740'); envGradient.addColorStop(.46, '#41506a'); envGradient.addColorStop(.52, '#1f2a24'); envGradient.addColorStop(1, '#0d100c');
  envCtx.fillStyle = envGradient; envCtx.fillRect(0, 0, 256, 128);
  const moonGlow = envCtx.createRadialGradient(57, 54, 1, 57, 54, 16); moonGlow.addColorStop(0, 'rgba(200,215,255,.6)'); moonGlow.addColorStop(1, 'rgba(200,215,255,0)');
  envCtx.fillStyle = moonGlow; envCtx.fillRect(0, 0, 256, 128);
  const envTexture = new THREE.CanvasTexture(envCanvas); envTexture.colorSpace = THREE.SRGBColorSpace; envTexture.mapping = THREE.EquirectangularReflectionMapping;
  const checkedEnvironment = createCheckedEnvironment(renderer, envTexture, 'scops'); scene.environment = checkedEnvironment.texture; scene.environmentIntensity = .4;

  /* ---------------------------------------------------------- materials */
  const deckWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'z', plank: { across: 'x', width: .48, offset: 4.59 }, light: '#6f5a46', dark: '#3e3126', polish: .5, rings: 26, roughness: [.55, .72], key: 'porch-deck' });
  const frameWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#5d4c3c', dark: '#33281f', rings: 9, roughness: [.7, .85], key: 'porch-frame-x' });
  const postWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'y', light: '#5d4c3c', dark: '#33281f', rings: 9, roughness: [.7, .85], key: 'porch-post' });
  const tableWood = applyWood(new THREE.MeshStandardMaterial({ color: '#ffffff' }), { axis: 'x', light: '#7a5a3d', dark: '#3f2c1d', polish: 1, rings: 14, roughness: [.35, .5], key: 'scops-table' });
  const bark = oakBark('scops');
  const stone = createRockMaterial('#8d8e86', { key: 'scops-stream-stone-v2', scale: 1.6, bump: 1.1, stainAmount: .12, cavity: .6, waterY: -.66, wetBand: .45, wetness: .25, dryRoughness: .62, wetRoughness: .07, algae: '#2e3a22', algaeAmount: .35, moss: { color: '#3b4a24', amount: .3 } });

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
      height += Math.exp(-Math.pow((distance - 1.55) / .65, 2)) * .2;
      height = THREE.MathUtils.lerp(height, -1.1, 1 - THREE.MathUtils.smoothstep(distance, .8, 1.45));
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
    const z = 1 - i * .65, width = 1.5 + Math.sin(i * .091) * .12 + Math.sin(i * .73) * .055;
    for (let k = 0; k <= 4; k++) riverVertices.push(riverX(z) - width + k / 4 * width * 2, -.66, z);
    if (i < 140) for (let k = 0; k < 4; k++) { const a = i * 5 + k; riverIndices.push(a, a + 1, a + 5, a + 1, a + 6, a + 5); }
  }
  const riverGeo = new THREE.BufferGeometry(); riverGeo.setAttribute('position', new THREE.Float32BufferAttribute(riverVertices, 3)); riverGeo.setIndex(riverIndices); riverGeo.computeVertexNormals();
  const lanternWorld = new THREE.Vector3(1.15, 1.0, 1.5);
  // Stones standing in the current: each throws a bow wave and a foaming wake.
  const midRocks = [[-2.6, .3, .34], [-5.2, -.35, .42], [-8.4, .2, .3], [-11.6, -.25, .46], [-15, .3, .36], [-18.6, -.1, .5], [-23, .25, .4], [-28, -.3, .45]].map(([z, o, r]) => new THREE.Vector4(riverX(z) + o, z, r, 0));
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uMoonDir: { value: MOON.clone() }, uLantern: { value: lanternWorld }, uLanternColor: { value: new THREE.Vector3(1, .55, .2) }, uFog: { value: 1 }, uFogColor: { value: new THREE.Color('#142235').convertSRGBToLinear() }, uRocks: { value: midRocks } },
    vertexShader: 'varying vec3 vWorld; void main(){ vec4 p = modelMatrix * vec4(position, 1.0); vWorld = p.xyz; gl_Position = projectionMatrix * viewMatrix * p; }',
    fragmentShader: WATER_FRAGMENT,
  });
  const water = add(staticRoot, riverGeo, waterMaterial, [0, 0, 0], false); water.receiveShadow = false; water.userData.keep = true;
  // Stream stones and a few larger mossy boulders.
  const stoneGeos = [0, 1, 2, 3, 4].map(s => boulderGeometry(s + 11, 2));
  for (let i = 0; i < 90; i++) {
    const z = 1 - random() * 60, side = random() > .5 ? 1 : -1;
    const s = .16 + random() * .32;
    const m = add(staticRoot, stoneGeos[i % 5].clone(), stone, [riverX(z) + side * (1.2 + random() * .5), -.66 + s * .12, z]);
    m.scale.set(s * 1.3, s * (.7 + random() * .25), s * (.85 + random() * .45)); m.rotation.set((random() - .5) * .4, random() * 6.28, (random() - .5) * .4);
  }
  const bigStoneGeos = [0, 1, 2].map(k => boulderGeometry(k + 31, 3));
  midRocks.forEach(({ x, y: z, z: r }, i) => {
    const m = add(staticRoot, bigStoneGeos[i % 3].clone(), stone, [x, -.7 + r * .18, z]);
    m.scale.set(r * 2.3, r * 1.25, r * 2.0); m.rotation.set((random() - .5) * .3, random() * 6.28, (random() - .5) * .3);
  });
  bigStoneGeos.forEach(g => g.dispose());
  for (let i = 0; i < 10; i++) {
    const z = -2 - random() * 20, x = (random() - .5) * 18;
    if (Math.abs(x - riverX(z)) < 2) continue;
    const m = add(staticRoot, stoneGeos[i % 5].clone(), stone, [x, groundHeight(x, z) + .1, z]);
    const s = .5 + random() * .7; m.scale.set(s * 1.3, s * .6, s); m.rotation.y = random() * 6.28;
  }
  stoneGeos.forEach(g => g.dispose());
  // Distant ridges stand as dark layered silhouettes above the trees.
  const ridgeCrowns: THREE.Matrix4[] = [];
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
    if (layer < 2) {
      // Crowns along the crest give the ridge a wooded skyline.
      for (let x = -95; x < 95; x += layer ? 3.4 : 2.6) {
        const crest = 9 + layer * 6 + Math.sin(x * .035 + layer * 1.7) * (4 + layer) + Math.sin(x * .09 + layer) * 1.6 + fbm3(x * .05, layer, 0, 3) * 3;
        for (let k = 0; k < 3; k++) {
          const dz = 2 + k * 3.5 + random() * 2, z = -70 - layer * 28 + dz;
          const top = -1 + crest * Math.exp(-Math.pow(dz / 14, 2));
          const s = (1.4 + random() * .9) * (1 + layer * .3);
          ridgeCrowns.push(new THREE.Matrix4().compose(new THREE.Vector3(x + (random() - .5) * 2, top + s * 1.1, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (random() - .5) * .5), new THREE.Vector3(s, s * (.9 + random() * .4), s)));
        }
      }
    }
  }

  /* ------------------------------------------------------------- forest */
  const leafMaps = [
    own(broadleafClusterTexture({ seed: 31, palette: { base: '#3f5d2a', light: '#62823c', dark: '#25391a', stem: '#463a2b' }, round: .35, leafScale: .72, density: 1.7 })),
    own(broadleafClusterTexture({ seed: 77, palette: { base: '#466230', light: '#6c8a44', dark: '#29401c', stem: '#4a3c2c' }, round: .5, leafScale: .7, density: 1.8 })),
  ];
  const leafMats = leafMaps.map((map, i) => applyFoliage(new THREE.MeshStandardMaterial({ map, color: '#ffffff', roughness: .82, side: THREE.DoubleSide, alphaTest: .5, alphaToCoverage: true }), { translucency: '#9cc47a', wrap: .5, key: `scops-leaves-v2-${i}` }));
  const cardGeo = new THREE.PlaneGeometry(1, 1);
  { const uv = cardGeo.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * .5); }
  const leafMatrices: THREE.Matrix4[][] = [[], []], leafColors: THREE.Color[][] = [[], []];
  const o = new THREE.Object3D();
  const cluster = (centre: THREE.Vector3, radius: number, baseCount: number, baseSize: number) => {
    const count = Math.round(baseCount * 1.7), size = baseSize * .68;
    for (let j = 0; j < count; j++) {
      const a = random() * Math.PI * 2, r = Math.pow(random(), .6) * radius;
      o.position.set(centre.x + Math.cos(a) * r, centre.y + (random() - .4) * radius * .7, centre.z + Math.sin(a) * r * .8);
      o.rotation.set(-Math.PI / 2 + (random() - .5) * 1.8, random() * Math.PI * 2, (random() - .5) * 1.2, 'YXZ');
      const s = size * (.7 + random() * .6); o.scale.set(s, s, s); o.updateMatrix();
      const k = j % 2; leafMatrices[k].push(o.matrix.clone());
      // Outer leaves catch more moonlight than the shaded crown interior.
      const outer = Math.min(1, r / Math.max(radius, .01));
      leafColors[k].push(new THREE.Color().setHSL(.22 + random() * .08, .28 + random() * .22, .14 + outer * .14 + random() * .1));
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
  {
    const crownGeo = cardCrown(91, 70, new THREE.Vector3(2.2, 1.9, 2.2), 1.2, { view: new THREE.Vector3(0, .1, 1).normalize() });
    const crowns = new THREE.InstancedMesh(crownGeo, applyFoliage(new THREE.MeshStandardMaterial({ map: leafMaps[0], vertexColors: true, roughness: .85, side: THREE.DoubleSide, alphaTest: .5, alphaToCoverage: true }), { translucency: '#7fa45e', wrap: .4, key: 'scops-ridge-crowns' }), ridgeCrowns.length);
    ridgeCrowns.forEach((m, i) => { crowns.setMatrixAt(i, m); crowns.setColorAt(i, new THREE.Color().setHSL(.24 + random() * .06, .25, .18 + random() * .1)); });
    crowns.computeBoundingSphere(); crowns.name = 'Ridge crowns'; scene.add(crowns);
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
  const grassTime = { value: 0 };
  const grassMat = plantMaterial('scops-grass', grassTime, { height: .5, sway: .025, translucency: '#7fa05a', roughness: .65 });
  const grassCount = 1500;
  const grasses = new THREE.InstancedMesh(grassClump(41, 12, .5), grassMat, grassCount);
  for (let i = 0; i < grassCount; i++) {
    const cl = Math.floor(i / 12), cx = Math.sin(cl * 13.61) * 14, cz = -1 - (Math.cos(cl * 7.23) * .5 + .5) * 34;
    let x = cx + (random() - .5) * 3; const z = cz + (random() - .5) * 2.6;
    if (Math.abs(x - riverX(z)) < 1.6) x += 3.4;
    o.position.set(x, groundHeight(x, z) - .02, z); o.rotation.set(0, random() * Math.PI * 2, 0); o.scale.setScalar(.6 + random() * .8); o.updateMatrix();
    grasses.setMatrixAt(i, o.matrix); grasses.setColorAt(i, new THREE.Color().setHSL(.2 + random() * .07, .3, .28 + random() * .16));
  }
  grasses.receiveShadow = true; scene.add(grasses);
  // Ferns: arching fronds on bent cards, several crowns along the stream banks.
  const fernMatrices: THREE.Matrix4[] = [];
  const fernSpots: Array<[number, number, number]> = [[-2.7, -1.2, 1], [2.9, -2, .9], [-4.1, -2.7, 1.2], [-1.6, -1.7, .8], [-6, -4.5, 1.1], [6.5, -6, 1], [1.6, -7.5, .9], [-3.2, -9.5, 1.1], [6.8, -11, 1], [1.2, -14, 1.1], [-5.5, -13, 1.2]];
  for (const [x, z, s] of fernSpots) {
    if (Math.abs(x - riverX(z)) < 1.7) continue;
    const fronds = 9 + Math.floor(random() * 4);
    for (let frond = 0; frond < fronds; frond++) {
      const a = frond / fronds * Math.PI * 2 + random() * .3;
      o.position.set(x, groundHeight(x, z) - .02, z);
      o.rotation.set(0, a, 0, 'YXZ'); o.rotateX(-.35 - random() * .35);
      const length = s * (.75 + random() * .45); o.scale.set(length * .34, length, length);
      o.updateMatrix(); fernMatrices.push(o.matrix.clone());
    }
  }
  // Fallen leaves in drifts break up the moonlit floor (flat, so they never stand as hairlines).
  const litterMap = own(litterTexture({ seed: 23, colors: ['#5a4030', '#6b5534', '#3a2c22', '#7a6a4a'] }));
  const litterMat = new THREE.MeshStandardMaterial({ map: litterMap, color: '#ffffff', roughness: .85, alphaTest: .5, alphaToCoverage: true, side: THREE.DoubleSide });
  const litterCard = new THREE.PlaneGeometry(1, 1);
  { const uv = litterCard.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * .5, uv.getY(i) * .5); }
  const litterCount = 2600, litter = new THREE.InstancedMesh(litterCard, litterMat, litterCount);
  for (let i = 0; i < litterCount; i++) {
    let x = (random() - .5) * 24; const z = -.6 - Math.pow(random(), .8) * 24;
    if (Math.abs(x - riverX(z)) < 1.3) x += x < riverX(z) ? -1.6 : 1.6;
    o.position.set(x, groundHeight(x, z) + .012, z); o.rotation.set(-Math.PI / 2 + (random() - .5) * .25, 0, random() * 6.28);
    o.scale.setScalar(.16 + random() * .14); o.updateMatrix(); litter.setMatrixAt(i, o.matrix);
    litter.setColorAt(i, new THREE.Color().setHSL(.07 + random() * .05, .3 + random() * .2, .3 + random() * .25));
  }
  litter.receiveShadow = true; scene.add(litter);
  const fernMap = own(fernFrondTexture({ seed: 19, palette: { base: '#3c6326', light: '#5f8a38', dark: '#223b16', stem: '#4b5a2a' } }));
  const fernMat = applyFoliage(new THREE.MeshStandardMaterial({ map: fernMap, color: '#ffffff', roughness: .7, side: THREE.DoubleSide, alphaTest: .5, alphaToCoverage: true }), { translucency: '#8fb46a', wrap: .5, key: 'scops-fern' });
  // A frond card that rises and arches over: base at the origin, tip curling down.
  const frondGeo = new THREE.PlaneGeometry(1, 1, 1, 8).translate(0, .5, 0);
  { const fp = frondGeo.attributes.position as THREE.BufferAttribute; for (let i = 0; i < fp.count; i++) { const t = fp.getY(i); fp.setXYZ(i, fp.getX(i) * (1 - t * .3), Math.sin(t * 1.9) * .62, -(1 - Math.cos(t * 1.9)) * .62); } frondGeo.computeVertexNormals(); }
  const ferns = new THREE.InstancedMesh(frondGeo, fernMat, fernMatrices.length); fernMatrices.forEach((m, i) => ferns.setMatrixAt(i, m)); ferns.receiveShadow = true; ferns.castShadow = true; scene.add(ferns);

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
    lastTime = time; waterMaterial.uniforms.uTime.value = time; skyUniforms.uTime.value = time; starMat.uniforms.uTime.value = time; grassTime.value = time;
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
      exposure: 1.5, bloomStrength: .12, bloomThreshold: 0, aoStrength: .85, aoRadius: .6,
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
          uHaze: { value: .0022 }, uMist: { value: .03 },
        },
      }) };
    },
  };
}
