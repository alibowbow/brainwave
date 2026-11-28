import * as THREE from 'three';
import type { WorldScene, WaterEdgeInteraction } from '../contracts';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, seeded } from '../../shared/render/noise';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { limbGeometry } from '../render/trees';
import { beachStoneGeometry, pebbleGeometry, type BeachStoneShape } from '../render/stones';
import { radianceProbe } from '../render/surfaces';
import { GLSL_DAWN_SKY, GLSL_SHORE, bedHeight } from './pebbleShoreGlsl';
import { cliffGeometry, cliffMaterial, shellGeometry, shellMaterial, wrackGeometry, type Strand } from './pebbleShoreLand';

/*
 * Independently authored mixed-shingle strand at dawn. Metres; the viewer sits
 * low among the stones. The sun has just cleared the sea to the front right:
 * it lays a glitter path over the swell, rim-lights the stones and throws long
 * shadows toward the viewer. Small wavelets steepen over the shallowing bed,
 * spill into foam and run up the strand as swash; the backwash drains away and
 * leaves the stones it covered dark and glassy for a few seconds before they
 * dry back to their pale, matte colours. A stratified headland with a turf
 * cap closes the bay to the left.
 *
 * Shader cost added over a plain lit surface: the shore model (a handful of
 * hashes and exponentials) in the sea, bed and stone shaders, sky clouds (two
 * warped fBm lookups in the sky dome, one cheap one in sea reflections).
 */

const SUN_DIR = new THREE.Vector3(.27, .125, -.955).normalize();
const SUN = new THREE.Color(1.0, .78, .56);
const SKY_PRELUDE = `${GLSL_NOISE}\n${GLSL_SHORE}\n${GLSL_DAWN_SKY}`;

const SEA_VERTEX = /* glsl */ `
${GLSL_NOISE}
${GLSL_SHORE}
uniform float uTime;
varying vec3 vSeaWorld;
float swellHeight(vec2 p, float t) {
  return sin(dot(p, vec2(0.08, 0.997)) * 0.42 + t * 0.62) * 0.09
       + sin(dot(p, vec2(-0.35, 0.937)) * 0.7 + t * 0.85 + 1.3) * 0.055
       + sin(dot(p, vec2(0.5, 0.866)) * 1.15 + t * 1.1 + 2.1) * 0.032;
}
void main() {
  vec3 p = position;
  float D = SW_SWL - bed(p.xz);
  float open = smoothstep(0.4, 2.5, D) * (1.0 - smoothstep(40.0, 90.0, -p.z));
  p.y = shoreLevel(p.xz, uTime) + swellHeight(p.xz, uTime) * open;
  vSeaWorld = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const SEA_FRAGMENT = /* glsl */ `
${SKY_PRELUDE}
uniform float uTime;
uniform vec3 uSunRadiance;
varying vec3 vSeaWorld;
/** Slope of one long-crested wave train, faded once a pixel spans a fair part of its wavelength. */
vec2 train(vec2 p, float t, vec2 dir, float k, float a, float w, float ph, float foot) {
  return dir * (a * k) * cos(dot(p, dir) * k + t * w + ph) * (1.0 - smoothstep(0.18, 0.42, foot * k / 6.2832));
}
vec2 swellSlope(vec2 p, float t, float foot) {
  vec2 g = train(p, t, vec2(0.08, 0.997), 0.42, 0.16, 0.62, 0.0, foot);
  g += train(p, t, vec2(-0.35, 0.937), 0.7, 0.1, 0.85, 1.3, foot);
  g += train(p, t, vec2(0.5, 0.866), 1.15, 0.058, 1.1, 2.1, foot);
  g += train(p, t, vec2(-0.7, 0.714), 2.6, 0.012, 1.6, 0.0, foot);
  g += train(p, t, vec2(0.83, 0.558), 4.3, 0.0065, 2.05, 0.7, foot);
  g += train(p, t, vec2(0.2, 0.98), 6.8, 0.0038, 2.6, 4.0, foot);
  g += train(p, t, vec2(-0.5, 0.866), 11.0, 0.002, 3.3, 2.2, foot);
  return g;
}
void main() {
  vec2 p = vSeaWorld.xz;
  float t = uTime;
  float bedY = bed(p);
  float D = SW_SWL - bedY;
  Shore sh = shoreAt(p, t);
  // Grit and small stones break the waterline into a ragged, meandering edge.
  float depth = sh.level - bedY - (bwNoise(vec3(p * 3.1, 0.7)) * 0.006 + bwNoise(vec3(p * 11.0, 1.9)) * 0.003);
  if (depth < 0.0005) discard;
  vec3 toEye = cameraPosition - vSeaWorld;
  float dist = length(toEye);
  vec3 v = toEye / dist;
  vec2 fp = max(vec2(abs(dFdx(p.x)) + abs(dFdy(p.x)), abs(dFdx(p.y)) + abs(dFdy(p.y))), vec2(0.002));
  float foot = max(fp.x, fp.y);
  float fine = 1.0 - smoothstep(0.03, 0.25, foot);
  float open = smoothstep(0.4, 2.5, D);
  // Surface slope: the surf and swash by differences of the shore model,
  // swell and wind waves analytically, capillary chop from noise.
  vec2 g = vec2(0.0);
  if (D < 5.0) {
    float e = clamp(foot, 0.03, 0.2);
    g = vec2(shoreLevel(p + vec2(e, 0.0), t) - sh.level, shoreLevel(p + vec2(0.0, e), t) - sh.level) / e;
  }
  g += swellSlope(p, t, foot) * open;
  // Wind ripples and a coarser cross-chop, each faded once it is sub-pixel.
  vec3 q = vec3(p * vec2(2.4, 3.4), t * 0.5);
  float n0 = bwNoise(q);
  vec2 rip = vec2(bwNoise(q + vec3(0.07, 0.0, 0.0)) - n0, bwNoise(q + vec3(0.0, 0.07, 0.0)) - n0) / 0.07;
  g += rip * 0.022 * (1.0 - smoothstep(0.03, 0.14, foot)) * (0.7 + 0.6 * (1.0 - open));
  vec3 cq = vec3(p * vec2(0.55, 0.8) + vec2(t * 0.05, t * 0.11), t * 0.16);
  float c0 = bwNoise(cq);
  vec2 chop = vec2(bwNoise(cq + vec3(0.1, 0.0, 0.0)) - c0, bwNoise(cq + vec3(0.0, 0.1, 0.0)) - c0) / 0.1;
  g += chop * vec2(0.09, 0.13) * (1.0 - smoothstep(0.25, 0.9, foot)) * (0.3 + 0.7 * open);
  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  float cosV = max(dot(n, v), 0.0);
  float fresnel = 0.02 + 0.98 * pow(clamp(1.0 - cosV, 0.0, 1.0), 5.0);
  vec3 r = reflect(-v, n);
  r.y = abs(r.y) + 0.002;
  // Rough-sea masking: at grazing views wave crests hide the troughs and the
  // effective mirror dims toward the horizon (Beckmann-Smith, view and light).
  float cotV = v.y / max(sqrt(1.0 - v.y * v.y), 1e-3);
  float roughA = cotV / ((0.04 + 0.12 * open) * 1.414);
  float lambda = roughA < 1.6 ? (1.0 - 1.259 * roughA + 0.396 * roughA * roughA) / (3.535 * roughA + 2.181 * roughA * roughA) : 0.0;
  float masking = 1.0 / (1.0 + 2.0 * lambda);
  vec3 sky = dawnSky(normalize(r), t, false) * fresnel * masking;
  // Unresolved waves: their faces tilted toward the viewer mirror higher,
  // darker sky and reflect less, so the far sea is not a uniform sheet.
  float su = 0.15 * smoothstep(0.03, 0.7, foot) * open;
  float fresnelMean = fresnel;
  if (su > 0.002) {
    vec3 n2 = normalize(n + normalize(vec3(v.x, 0.0, v.z)) * su);
    float f2 = 0.02 + 0.98 * pow(clamp(1.0 - max(dot(n2, v), 0.0), 0.0, 1.0), 5.0);
    vec3 r2 = reflect(-v, n2);
    r2.y = abs(r2.y) + 0.002;
    sky = mix(sky, dawnSky(normalize(r2), t, false) * f2 * masking, 0.55);
    fresnelMean = mix(fresnel, f2, 0.55);
  }
  // Sun glitter: the share of unresolved facets tilted to mirror the sun (a
  // slope distribution around the resolved surface), broken into facets that
  // flash at about pixel size at every distance.
  vec3 hv = normalize(v + uSun);
  vec2 dev = -hv.xz / hv.y - g;
  // Facets the resolved surface already tilts toward the sun flash sharply;
  // the unresolved remainder makes a faint, broad, twinkling path.
  float sharp2 = 0.0012 + 0.003 * smoothstep(0.05, 1.0, foot);
  float sharp = exp(-dot(dev, dev) / sharp2) / (3.14159 * sharp2);
  float broad2 = mix(0.008, 0.03, open);
  float broad = exp(-dot(dev, dev) / broad2) / (3.14159 * broad2);
  float spark = pow(bwValue(vec3(p / (fp * 3.2), t * 1.1)), 6.0) * 9.0;
  float fSun = 0.02 + 0.98 * pow(1.0 - max(dot(hv, v), 0.0), 5.0);
  vec3 glint = uSunRadiance * fSun * (sharp * 0.003 + broad * spark * 0.009);
  // Body: clear over the stones, blue-green with depth; backlit crests glow.
  vec3 body = mix(vec3(0.03, 0.075, 0.07), vec3(0.006, 0.022, 0.036), smoothstep(0.15, 2.5, depth));
  float through = pow(max(dot(-v, uSun) * 0.5 + 0.5, 0.0), 5.0);
  float crest = clamp(sh.wave / 0.07, 0.0, 1.0);
  body += vec3(0.07, 0.3, 0.2) * through * (crest * 2.4 + 0.4 * open * clamp(g.y * 5.0, 0.0, 1.0));
  // Foam: whitewater on spilling crests and the bores they become, trails of
  // lace behind them, a bubbly lip on the uprush, lace carried up the strand
  // and streaks drawn back by the backwash.
  float lace = foamLace(p * vec2(1.0, 1.7) + vec2(0.0, -t * 0.35), t);
  // Old foam from earlier breakers lingers over the whole surf zone, drifting in.
  float surfZone = smoothstep(0.4, 0.12, D) * smoothstep(-0.05, 0.05, D);
  float residual = surfZone * foamLace(p * vec2(0.8, 1.3) + vec2(3.1, -t * 0.22), t * 0.7) * 0.55;
  float surf = sh.white * (0.72 + 0.4 * lace) + sh.trail * (lace * 1.5 + 0.12) + residual;
  float uprush = 1.0 - smoothstep(SW_UP * 0.8, SW_UP * 1.4, sh.s);
  float swashZone = 1.0 - smoothstep(0.0, 0.3, D);
  float lip = (1.0 - smoothstep(0.0, 0.02, depth)) * (0.4 + 0.6 * uprush) * swashZone;
  vec2 sq = p - vec2(0.0, sh.swash / 0.038 * 0.75);
  float sheetLace = foamLace(sq * vec2(1.4, 2.3) + 7.0, t) * exp(-sh.s * SW_T / 5.0) * swashZone;
  float streaks = smoothstep(0.45, 0.9, bwNoise(vec3(p.x * 8.0, sq.y * 1.1, t * 0.1))) * (1.0 - uprush) * swashZone * exp(-max(sh.s - SW_UP, 0.0) * SW_T / 4.0) * 0.5;
  float bubbles = smoothstep(0.62, 0.82, bwValue(vec3(sq * 34.0, t * 0.3))) * (1.0 - smoothstep(0.0, 0.05, depth)) * fine * swashZone;
  float lines = smoothstep(0.84, 0.97, 1.0 - abs(bwNoise(vec3(p.x * 0.3, p.y * 0.09, 2.0)))) * smoothstep(-24.0, -8.0, p.y) * (1.0 - smoothstep(-7.0, -4.0, p.y));
  float foam = clamp(surf + lip * (0.6 + 0.6 * lace) + sheetLace * 1.1 + streaks + bubbles * 0.5 + lines * (0.25 + lace) * 0.5, 0.0, 0.96);
  float wrap = dot(n, uSun) * 0.5 + 0.5;
  vec3 foamColor = vec3(0.52, 0.55, 0.6) * (0.55 + 0.45 * wrap) + vec3(1.0, 0.72, 0.45) * (0.15 + 0.8 * through);
  // Premultiplied: mirrored sky, plus the water column hiding the bed by its
  // refracted path length; foam covers both.
  float cosT = sqrt(1.0 - (1.0 - cosV * cosV) / 1.77);
  float column = 1.0 - exp(-depth / max(cosT, 0.2) * 3.2);
  float edge = smoothstep(0.0, 0.006, depth);
  vec3 rgb = (sky + (1.0 - fresnelMean) * column * body) * edge;
  float alpha = (fresnelMean + (1.0 - fresnelMean) * column) * edge;
  rgb = rgb * (1.0 - foam) + foamColor * foam;
  alpha = alpha * (1.0 - foam) + foam;
  gl_FragColor = vec4(rgb + glint * (1.0 - foam) * edge, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uAmbient;
uniform float uHaze;
uniform float uMist;
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 420.0);
  float jitter = bwIgn(gl_FragCoord.xy);
  float cosTheta = dot(rd, uSunDir);
  float phase = (bwPhase(cosTheta, 0.78) * 0.6 + bwPhase(cosTheta, 0.2) * 0.4) * 12.5663706;
  const int STEPS = 26;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float previous = 0.0;
  for (int i = 0; i < STEPS; i++) {
    float t = maxT * pow((float(i) + jitter) / float(STEPS), 2.2);
    float dt = t - previous; previous = t;
    vec3 p = ro + rd * t;
    float h = max(p.y, 0.0);
    // Broad sea haze plus low banks of morning mist lying on the water offshore.
    float banks = smoothstep(0.35, 0.75, bwValue(vec3(p.x * 0.012 + uTime * 0.004, 0.0, p.z * 0.02)));
    float density = uHaze * exp(-h * 0.035) + uMist * exp(-h * 0.45) * banks * smoothstep(-6.0, -40.0, p.z);
    vec3 radiance = uSunColor * phase + uAmbient;
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

/** Rock types of the shingle, by share: basalt, granite, slate, ochre sandstone, quartz, banded, jasper, greenstone, limestone. */
const STONE_TYPES = [.18, .27, .12, .11, .07, .06, .05, .05, .09];
const STONE_GLSL = /* glsl */ `
vec3 stoneAlbedo(float type, float seed, vec3 lp, vec3 unit, float res, out float rough) {
  int k = int(type + 0.5);
  float mottle = bwFbm3(lp * 14.0 + seed * 31.0);
  float grainA = bwNoise(lp * 140.0 + seed * 7.0);
  float grainB = bwNoise(lp * 95.0 + 13.0 + seed * 5.0);
  vec3 c;
  if (k == 0) { c = vec3(0.045, 0.046, 0.05) * (0.85 + 0.3 * mottle); c *= 1.0 - 0.4 * smoothstep(0.55, 0.8, grainA) * res; rough = 0.62; }
  else if (k == 1) {
    c = vec3(0.25, 0.23, 0.21) * (0.9 + 0.2 * mottle);
    if (seed > 0.6) c *= vec3(1.14, 0.94, 0.85);
    c = mix(c, vec3(0.025), smoothstep(0.45, 0.72, grainA) * 0.85 * res);
    c = mix(c, vec3(0.52, 0.5, 0.47), smoothstep(0.5, 0.78, grainB) * 0.6 * res);
    rough = 0.78;
  }
  else if (k == 2) { c = vec3(0.085, 0.095, 0.112) * (0.86 + 0.14 * sin(unit.y * 38.0 + mottle * 5.0)); rough = 0.55; }
  else if (k == 3) { c = mix(vec3(0.36, 0.22, 0.11), vec3(0.3, 0.22, 0.15), seed) * (0.84 + 0.26 * sin(length(unit.xz) * 9.0 + mottle * 5.0)); c *= 0.9 + 0.2 * grainA * res; rough = 0.9; }
  else if (k == 4) { c = vec3(0.64, 0.62, 0.57) * (0.92 + 0.1 * mottle); c = mix(c, vec3(0.55, 0.37, 0.2), smoothstep(0.2, 0.6, bwFbm3(lp * 22.0 + seed * 9.0)) * 0.55); rough = 0.4; }
  else if (k == 5) { c = vec3(0.12, 0.12, 0.125) * (0.85 + 0.3 * mottle); rough = 0.6; }
  else if (k == 6) { c = vec3(0.19, 0.08, 0.055) * (0.85 + 0.3 * mottle); rough = 0.55; }
  else if (k == 7) { c = vec3(0.078, 0.092, 0.072) * (0.85 + 0.3 * mottle); c = mix(c, vec3(0.2, 0.25, 0.18), smoothstep(0.6, 0.85, grainB) * res * 0.6); rough = 0.62; }
  else { c = vec3(0.37, 0.36, 0.33) * (0.9 + 0.15 * mottle); c *= 1.0 - 0.35 * smoothstep(0.6, 0.85, grainA) * res; rough = 0.86; }
  // Quartz veins: one or two broad bands on banded stones, a single thin vein on a few others.
  vec3 vn = normalize(vec3(sin(seed * 40.0), 0.5 + seed, cos(seed * 40.0)));
  float vd = dot(unit, vn) + mottle * 0.07;
  float o1 = seed * 0.9 - 0.45;
  float vein = 0.0;
  if (k == 5) vein = (1.0 - smoothstep(0.1, 0.14, abs(vd - o1))) + (1.0 - smoothstep(0.05, 0.08, abs(vd - o1 - 0.5))) * step(0.4, seed);
  else if (seed > 0.88 && k != 4) vein = 1.0 - smoothstep(0.018, 0.035, abs(vd - o1 * 0.6));
  vein = clamp(vein, 0.0, 1.0);
  c = mix(c, vec3(0.6, 0.58, 0.54), vein * 0.85);
  rough = mix(rough, 0.45, vein);
  return c * (0.88 + 0.24 * fract(seed * 13.7));
}
`;

interface Spot { x: number; z: number; y: number; sx: number; sy: number; sz: number; yaw: number; pitch: number; roll: number; type: number; seed: number; shape: number; reach: number }
const SHAPES: BeachStoneShape[] = ['egg', 'disc', 'blade', 'round', 'angular'];
const SHAPE_SHARE = [.3, .25, .15, .15, .15];
const pick = (shares: number[], u: number) => { let acc = 0; for (let i = 0; i < shares.length; i++) { acc += shares[i]; if (u < acc) return i; } return shares.length - 1; };

export function createPebbleShore(renderer: THREE.WebGLRenderer): WorldScene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(.9, .8, .7);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.035, 460);
  const raycaster = new THREE.Raycaster();
  const clock = { value: 0 };
  const sunUniform = { value: SUN_DIR };

  // --- Sky, sun and the radiance probe built from the same sky. --------------
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uSun: sunUniform, uTime: clock },
    vertexShader: 'varying vec3 vSkyWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vSkyWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: `${SKY_PRELUDE}\nuniform float uTime;varying vec3 vSkyWorld;
      void main(){vec3 d=normalize(vSkyWorld-cameraPosition);vec3 c=dawnSky(d,uTime,true);if(d.y<0.)c=vec3(.5,.48,.46);gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 64, 32), skyMaterial);
  sky.name = 'dawn-sky-with-cloud-deck'; sky.frustumCulled = false; sky.renderOrder = -5;
  scene.add(sky);
  const environment = radianceProbe(renderer, probe => {
    probe.add(new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), new THREE.ShaderMaterial({
      side: THREE.BackSide, uniforms: { uSun: { value: SUN_DIR } },
      vertexShader: 'varying vec3 vSkyWorld;void main(){vSkyWorld=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: `${SKY_PRELUDE}\nvarying vec3 vSkyWorld;
        void main(){vec3 d=normalize(vSkyWorld);vec3 c=dawnSky(vec3(d.x,max(d.y,0.),d.z),0.,true);
          // Below the horizon: the sea's own reflection of the sky, then the strand.
          if(d.y<0.)c=mix(c*.35+vec3(.02,.04,.05),vec3(.05,.045,.04),smoothstep(-.05,-.5,d.y));
          gl_FragColor=vec4(c,1.);}`,
    })));
  });
  scene.environment = environment.texture;
  scene.environmentIntensity = .85;

  const sun = new THREE.DirectionalLight(SUN, 4.6);
  sun.position.copy(SUN_DIR).multiplyScalar(30).add(new THREE.Vector3(0, 0, .5));
  sun.target.position.set(0, 0, .5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 1.6, bottom: -1.6, near: 10, far: 50 });
  sun.shadow.normalBias = .01; sun.shadow.bias = -.0002; sun.shadow.radius = 2;
  scene.add(sun, sun.target);
  // Sunlit swash and pale stones throw a faint warm bounce into the shadowed near side.
  const bounce = new THREE.PointLight('#ffd2a0', 1.4, 6, 2);
  bounce.position.set(.6, .35, .4);
  scene.add(bounce);

  // --- Strand bed: sand, grit and gravel between the stones; shingle offshore.
  const bedGeometry = new THREE.PlaneGeometry(80, 1, 200, 150);
  // The mesh sits 2 cm under bedHeight(), so set-in stones never z-fight it.
  bedGeometry.rotateX(-Math.PI / 2);
  {
    const bp = bedGeometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < bp.count; i++) {
      const x = bp.getX(i), v = .5 - bp.getZ(i);
      const z = 6 - 66 * Math.pow(v, 1.8);
      bp.setXYZ(i, x, bedHeight(x, z) - .02, z);
    }
    bedGeometry.computeVertexNormals();
  }
  const bedMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .8, metalness: 0 });
  bedMaterial.onBeforeCompile = shader => {
    shader.uniforms.uTime = clock;
    shader.uniforms.uSun = sunUniform;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBedWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvBedWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime;
varying vec3 vBedWorld;
${GLSL_NOISE}
${GLSL_SHORE}
// Packed rounded grains: nearest jittered cell centre, its radius and colour.
vec4 pebbleCell(vec2 p, out vec2 centre, out float gap) {
  vec2 cell = floor(p);
  float best = 1e9, second = 1e9;
  vec3 bestHash = vec3(0.0);
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 c = cell + vec2(float(i), float(j));
    vec3 h = bwHash3(vec3(c, 7.0));
    vec2 o = c + 0.2 + h.xy * 0.6;
    vec2 d = (p - o) * vec2(1.0, 0.8 + h.z * 0.4);
    float dd = dot(d, d);
    if (dd < best) { second = best; best = dd; centre = o; bestHash = h; } else if (dd < second) second = dd;
  }
  gap = sqrt(second) - sqrt(best);
  return vec4(bestHash, sqrt(best));
}
vec3 gravelColor(vec3 h) {
  float k = floor(h.x * 7.0);
  vec3 c = k < 1.0 ? vec3(0.05, 0.05, 0.055) : k < 2.0 ? vec3(0.23, 0.21, 0.19) : k < 3.0 ? vec3(0.09, 0.1, 0.115)
    : k < 4.0 ? vec3(0.32, 0.21, 0.11) : k < 5.0 ? vec3(0.56, 0.54, 0.5) : k < 6.0 ? vec3(0.19, 0.075, 0.045) : vec3(0.16, 0.16, 0.15);
  return c * (0.8 + 0.4 * h.y);
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 bw = vBedWorld;
vec2 bp = bw.xz;
float footprint = length(fwidth(bp));
float fineA = 1.0 - smoothstep(0.004, 0.014, footprint);
float fineB = 1.0 - smoothstep(0.015, 0.05, footprint);
// Sand: grey-ochre with dark and pale grains.
vec3 sand = vec3(0.27, 0.235, 0.19) * (0.85 + 0.2 * bwNoise(vec3(bp * 3.1, 1.0)));
sand *= 1.0 + bwNoise(vec3(bp * 160.0, 2.0)) * 0.3 * fineA;
// Gravel (2-3 cm) in drifts, fading to its mean colour where sub-pixel.
vec2 gc; float gGap;
vec4 gcell = pebbleCell(bp * 32.0, gc, gGap);
float gR = 0.3 + 0.16 * gcell.y;
float gDome = sqrt(max(1.0 - pow(gcell.w / gR, 2.0), 0.0));
float gravelCover = smoothstep(-0.25, 0.25, bwFbm3(vec3(bp * 1.4, 4.0)) + 0.1);
float gravel = step(0.3, gcell.z) * gravelCover * smoothstep(0.0, 0.1, gDome);
vec3 gravelMean = vec3(0.2, 0.17, 0.145);
vec3 bedColor = mix(sand, mix(gravelMean, gravelColor(gcell.xyz) * (0.6 + 0.4 * gDome), fineB), mix(gravelCover * 0.55, gravel, fineB));
// Shingle carpet offshore, beyond the modelled stones.
vec2 cc; float cGap;
vec4 cell = pebbleCell(bp * 6.5, cc, cGap);
float cR = 0.36 + cell.y * 0.16;
float cDome = sqrt(max(1.0 - pow(cell.w / cR, 2.0), 0.0));
float carpet = (1.0 - smoothstep(-3.2, -2.2, bp.y)) * smoothstep(0.0, 0.15, cDome);
bedColor = mix(bedColor, gravelColor(cell.xyz) * (0.55 + 0.45 * cDome), carpet);
// Shell grit: pale chips.
float chip = step(0.986, bwHash1(vec3(floor(bp * 70.0), 5.0))) * fineA;
bedColor = mix(bedColor, vec3(0.72, 0.68, 0.62), chip * 0.85);
// Wrack line: dark seaweed debris where the highest swash stops.
float wrack = exp(-pow((bw.y - SW_SWL - 0.108) / 0.012, 2.0)) * smoothstep(0.05, 0.5, bwNoise(vec3(bp * vec2(4.0, 9.0), 6.0)));
wrack *= mix(0.5, smoothstep(0.25, 0.6, bwValue(vec3(bp * 45.0, 7.0))), fineB);
bedColor = mix(bedColor, vec3(0.035, 0.028, 0.014), wrack * 0.9);
// Wet: covered now, glassy for a few seconds after draining, damp for longer.
Shore bedShore = shoreAt(bp, uTime);
float bedAge = swDryAge(bp.x, bw.y, uTime);
float bedFilm = max(exp(-bedAge / 3.5), smoothstep(0.0, 0.006, bedShore.level - bw.y));
float bedDamp = max(exp(-bedAge / 35.0), 1.0 - smoothstep(SW_SWL + 0.05, SW_SWL + 0.13, bw.y));
bedColor *= mix(1.0, 0.5, max(bedDamp, bedFilm));
diffuseColor.rgb = bedColor;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(mix(0.92, 0.42, bedDamp), 0.08, bedFilm);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec2 g = (bp * 32.0 - gc) / gR * gravel * 1.1 * fineB + (bp * 6.5 - cc) / cR * carpet * 1.4;
  vec3 viewN = normalize((viewMatrix * vec4(normalize(vec3(g.x, 1.0, g.y)), 0.0)).xyz);
  normal = normalize(mix(normal, viewN, 0.8));
}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  float under = smoothstep(0.0, 0.02, bedShore.level - bw.y);
  reflectedLight.directSpecular *= 1.0 - 0.85 * under;
  reflectedLight.indirectSpecular *= 1.0 - 0.85 * under;
}`);
  };
  bedMaterial.customProgramCacheKey = () => 'pebble-strand-bed-v2';
  const bed = new THREE.Mesh(bedGeometry, bedMaterial);
  bed.receiveShadow = true; bed.name = 'sand-and-grit-strand';
  scene.add(bed);

  // --- Stone material: nine rock types, dry pale and matte, wet dark and glassy.
  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .6, metalness: 0, envMapIntensity: .8 });
  stoneMaterial.onBeforeCompile = shader => {
    shader.uniforms.uTime = clock;
    shader.uniforms.uSun = sunUniform;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 aStone;\nvarying vec3 vStoneLocal;\nvarying vec3 vStoneWorld;\nvarying vec4 vStone;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vStoneLocal = position;
vStone = aStone;
vec4 shoreWorld = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  shoreWorld = instanceMatrix * shoreWorld;
#endif
vStoneWorld = (modelMatrix * shoreWorld).xyz;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime;
varying vec3 vStoneLocal;
varying vec3 vStoneWorld;
varying vec4 vStone;
${GLSL_NOISE}
${GLSL_SHORE}
${STONE_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 stoneP = vStoneLocal * vStone.z;
float resolved = 1.0 - smoothstep(0.0012, 0.005, length(fwidth(stoneP)));
float dryRough;
vec3 albedo = stoneAlbedo(vStone.x, vStone.y, stoneP, vStoneLocal, resolved, dryRough);
Shore stoneShore = shoreAt(vStoneWorld.xz, uTime);
float stoneAge = swDryAge(vStoneWorld.x, vStoneWorld.y, uTime);
float under = smoothstep(0.0, 0.006, stoneShore.level - vStoneWorld.y);
float film = max(exp(-stoneAge / 3.5), under);
float damp = max(exp(-stoneAge / 35.0), 1.0 - smoothstep(SW_SWL + 0.05, SW_SWL + 0.13, vStoneWorld.y));
float lum = dot(albedo, vec3(0.2126, 0.7152, 0.0722));
// Dry crowns carry a faint salt-and-dust bloom; water darkens and saturates.
vec3 dry = mix(albedo, vec3(lum), 0.12) * 1.06 + 0.012;
vec3 wet = max(mix(vec3(lum), albedo, 1.3), 0.0) * (0.42 + 0.3 * lum);
diffuseColor.rgb = mix(dry, wet, max(damp, film));
// Big stones low on the strand carry a slick of green weed and a few barnacles.
float bigStone = smoothstep(0.16, 0.26, vStone.z) * (1.0 - smoothstep(SW_SWL + 0.06, SW_SWL + 0.14, bed(vStoneWorld.xz)));
float slick = bigStone * (1.0 - smoothstep(0.02, 0.09 + 0.05 * bwNoise(stoneP * 9.0), vStoneWorld.y - bed(vStoneWorld.xz))) * smoothstep(-0.2, 0.3, bwFbm3(stoneP * 6.0));
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.03, 0.06, 0.018) * (0.7 + 0.6 * bwNoise(stoneP * 30.0)), slick);
float barnacle = bigStone * smoothstep(0.62, 0.8, bwNoise(stoneP * 70.0)) * smoothstep(0.03, 0.08, vStoneWorld.y - bed(vStoneWorld.xz)) * (1.0 - smoothstep(0.1, 0.16, vStoneWorld.y - bed(vStoneWorld.xz))) * resolved;
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.4, 0.36), barnacle * 0.8);
// Stones nest into the grit: their lower flanks see little sky.
float stoneAO = mix(0.3, 1.0, smoothstep(-0.004, vStone.z * 0.55, vStoneWorld.y - bed(vStoneWorld.xz)));
// A collar of foam where the moving sheet meets a stone.
float collar = exp(-pow((vStoneWorld.y - stoneShore.level) / 0.005, 2.0)) * smoothstep(0.003, 0.02, stoneShore.level - bed(vStoneWorld.xz));
collar *= (1.0 - 0.7 * smoothstep(SW_UP, SW_UP + 0.25, stoneShore.s)) * smoothstep(0.35, 0.65, bwValue(vec3(vStoneWorld.xz * 55.0, uTime * 0.6)));
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.78, 0.8, 0.8), collar * 0.85);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(dryRough, 0.3, damp);
roughnessFactor = mix(roughnessFactor, 0.05, film);
roughnessFactor = mix(roughnessFactor, 0.7, collar);
roughnessFactor = mix(roughnessFactor, 0.15, slick);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  // Fine pitting, filtered to nothing below a pixel; a water film smooths it.
  float grain = (bwNoise(stoneP * 60.0) * 0.6 + bwNoise(stoneP * 150.0) * 0.4) * resolved;
  vec3 sx = dFdx(-vViewPosition), sy = dFdy(-vViewPosition);
  vec3 gx = cross(sy, normal), gy = cross(normal, sx);
  float det = dot(sx, gx);
  vec3 gradient = sign(det) * (dFdx(grain) * gx + dFdy(grain) * gy);
  normal = normalize(max(abs(det), 1e-10) * normal - gradient * 0.0006 * (1.0 - film * 0.85));
}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  // Under the sheet the stone's own gloss disappears; the water surface shows it.
  reflectedLight.directSpecular *= 1.0 - 0.85 * under;
  reflectedLight.indirectSpecular *= (1.0 - 0.85 * under) * mix(0.45, 1.0, stoneAO);
  reflectedLight.indirectDiffuse *= stoneAO;
}`);
  };
  stoneMaterial.customProgramCacheKey = () => 'water-edge-mixed-shingle-v2';
  const stoneAttribute = (geometry: THREE.BufferGeometry, type: number, seed: number, size: number) => {
    const count = geometry.getAttribute('position').count, data = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) data.set([type, seed, size, 0], i * 4);
    geometry.setAttribute('aStone', new THREE.BufferAttribute(data, 4));
  };

  // --- Shingle: packed by dart throwing, coarse at the berm, sorted finer down
  // the swash face, with sand and grit drifts between.
  const random = seeded(731923);
  const spots: Spot[] = [];
  const grid = new Map<number, number[]>();
  const cellSize = .3;
  const cellKey = (i: number, j: number) => (i + 2000) * 8192 + (j + 2000);
  const near = (x: number, z: number, reach: number, visit: (spot: Spot) => boolean | void) => {
    const i0 = Math.floor((x - reach) / cellSize), i1 = Math.floor((x + reach) / cellSize);
    const j0 = Math.floor((z - reach) / cellSize), j1 = Math.floor((z + reach) / cellSize);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) for (const k of grid.get(cellKey(i, j)) ?? []) if (visit(spots[k])) return true;
    return false;
  };
  const occupy = (spot: Spot) => {
    spots.push(spot);
    const k = cellKey(Math.floor(spot.x / cellSize), Math.floor(spot.z / cellSize));
    let list = grid.get(k); if (!list) grid.set(k, list = []);
    list.push(spots.length - 1);
  };
  const fits = (x: number, z: number, reach: number) => !near(x, z, reach + .16, spot => Math.hypot(spot.x - x, spot.z - z) < (spot.reach + reach) * .86);
  const reserve = (x: number, z: number, reach: number) => occupy({ x, z, y: -9, sx: 0, sy: 0, sz: 0, yaw: 0, pitch: 0, roll: 0, type: 0, seed: 0, shape: -1, reach });
  /** Top of the stones (or the bed) at a point, for draping weed and shells. */
  const bedMesh = (x: number, z: number) => bedHeight(x, z) - .02;
  const surfaceAt = (x: number, z: number) => {
    let top = bedMesh(x, z);
    near(x, z, .2, spot => {
      if (spot.shape < 0) return;
      const dx = x - spot.x, dz = z - spot.z, c = Math.cos(spot.yaw), s = Math.sin(spot.yaw);
      const lx = dx * c - dz * s, lz = dx * s + dz * c;
      const q = (lx / spot.sx) ** 2 + (lz / spot.sz) ** 2;
      if (q < 1) top = Math.max(top, spot.y + spot.sy * Math.sqrt(1 - q) * .96);
    });
    return top;
  };
  const rollPebblePosition = new THREE.Vector3(-0.18, 0, 1.36);
  reserve(rollPebblePosition.x, rollPebblePosition.z, .2);
  const foregroundSpecs: Array<[number, number, number, number, number, number, number]> = [
    // x, z, half extents, detail seed, rock type
    [-1.32, 2.35, .5, .2, .4, 3, 1], [1.49, 2.49, .52, .21, .4, 1, 5],
    [-1.19, .65, .28, .12, .24, 5, 1], [1.7, 1.21, .33, .13, .28, 7, 3],
    [-2.3, 1.39, .38, .17, .32, 4, 8], [.85, 2.78, .3, .14, .25, 2, 2],
    [2.59, .25, .42, .18, .36, 8, 0], [-2.97, -.48, .46, .19, .38, 3, 8],
    [1.53, -.61, .23, .1, .2, 5, 4], [-.12, 2.82, .27, .1, .21, 6, 6],
  ];
  foregroundSpecs.forEach(([x, z, sx, , sz]) => reserve(x, z, Math.max(sx, sz) * .92));
  const throwStones = (count: number, zNear: number, zFar: number, rMin: number, rMax: number, cover: (x: number, z: number) => number) => {
    for (let n = 0; n < count; n++) {
      const z = zFar + (zNear - zFar) * Math.sqrt(random());
      const half = 1.3 + (3.9 - z) * .95;
      const x = (random() * 2 - 1) * half;
      if (random() > cover(x, z)) continue;
      const r = rMin + (rMax - rMin) * Math.pow(random(), 1.6);
      const shape = pick(SHAPE_SHARE, random());
      const [w, h] = shape === 0 ? [.6 + random() * .2, .5 + random() * .15] : shape === 1 ? [.8 + random() * .15, .3 + random() * .12]
        : shape === 2 ? [.45 + random() * .15, .3 + random() * .1] : shape === 3 ? [.85 + random() * .15, .7 + random() * .15] : [.65 + random() * .25, .5 + random() * .2];
      const reach = r * (1 + w) * .5;
      if (!fits(x, z, reach)) continue;
      const sy = r * h;
      occupy({ x, z, y: bedHeight(x, z) - .02 + sy * (.25 + random() * .25) + Math.min(.015, sy * .5), sx: r, sy, sz: r * w, yaw: random() * Math.PI * 2,
        pitch: (random() - .5) * .22 + (z < 1.2 ? .08 : 0), roll: (random() - .5) * .2, type: pick(STONE_TYPES, random()), seed: random(), shape, reach });
    }
  };
  const patches = (x: number, z: number) => THREE.MathUtils.smoothstep(fbm3(x * .9, 3.1, z * .9, 3), -.28, .2);
  const channel = (x: number, z: number) => Math.exp(-Math.pow((x + .35) * .64, 2)) * THREE.MathUtils.smoothstep(z, -3.2, -2.4) * (1 - THREE.MathUtils.smoothstep(z, 1.1, 1.5));
  const zoneCover = (x: number, z: number) => (z > 1.5 ? .97 : z > -1 ? .78 : .5) * (.35 + .65 * patches(x, z)) * (1 - channel(x, z) * .75);
  throwStones(1400, 3.8, .8, .085, .14, (x, z) => zoneCover(x, z) * .9);
  throwStones(9000, 3.8, -3, .045, .085, zoneCover);
  throwStones(9000, 3.8, -2.2, .025, .045, zoneCover);
  throwStones(7000, 3.8, .7, .012, .025, (x, z) => Math.hypot(x - .05, z - 3.25) < 2.9 ? zoneCover(x, z) : 0);

  // Level of detail by size and distance; only the near shingle casts shadows.
  const eye = new THREE.Vector2(.05, 3.25);
  const lodDetail = [4, 2, 1];
  const groups = new Map<string, Spot[]>();
  for (const spot of spots) {
    if (spot.shape < 0) continue;
    const d = eye.distanceTo(new THREE.Vector2(spot.x, spot.z));
    const lod = spot.sx > .065 && d < 2.6 ? 0 : (spot.sx > .03 && d < 4.2) || d < 1.9 ? 1 : 2;
    // Variant 1 of the middle level stays out of the shadow pass (farther stones).
    const variant = lod === 0 ? (spot.seed > .5 ? 1 : 0) : lod === 1 ? (d > 3.1 ? 1 : 0) : 0;
    const key = `${spot.shape}-${lod}-${variant}`;
    let list = groups.get(key); if (!list) groups.set(key, list = []);
    list.push(spot);
  }
  const placer = new THREE.Object3D();
  groups.forEach((list, key) => {
    const [shape, lod, variant] = key.split('-').map(Number);
    const geometry = beachStoneGeometry(17 + shape * 31 + (lod === 0 ? variant * 7 : 0), lodDetail[lod], SHAPES[shape]);
    const data = new Float32Array(list.length * 4);
    const mesh = new THREE.InstancedMesh(geometry, stoneMaterial, list.length);
    list.forEach((spot, i) => {
      placer.position.set(spot.x, spot.y, spot.z);
      placer.rotation.set(spot.pitch, spot.yaw, spot.roll, 'YXZ');
      placer.scale.set(spot.sx, spot.sy, spot.sz);
      placer.updateMatrix();
      mesh.setMatrixAt(i, placer.matrix);
      data.set([spot.type, spot.seed, spot.sx, 0], i * 4);
    });
    geometry.setAttribute('aStone', new THREE.InstancedBufferAttribute(data, 4));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = lod === 0 || (lod === 1 && variant === 0); mesh.receiveShadow = true; mesh.name = `mixed-shingle-${SHAPES[shape]}-lod${lod}-${variant}`;
    mesh.computeBoundingSphere();
    scene.add(mesh);
  });

  // Foreground stones: larger, finely tessellated, each its own shape and rock.
  foregroundSpecs.forEach(([x, z, sx, sy, sz, n, type], i) => {
    const geometry = pebbleGeometry(n * 31 + i, 7, .3 + (i % 3) * .12);
    stoneAttribute(geometry, type, (i * .137 + .05) % 1, sx);
    const mesh = new THREE.Mesh(geometry, stoneMaterial);
    mesh.position.set(x, bedHeight(x, z) + sy * .55, z);
    mesh.scale.set(sx, sy, sz); mesh.rotation.set(.07 * (i % 3), n * .62, -.08);
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = `foreground-shore-stone-${i}`;
    scene.add(mesh);
    occupy({ x, z, y: mesh.position.y, sx, sy, sz, yaw: mesh.rotation.y, pitch: 0, roll: 0, type, seed: 0, shape: 0, reach: 0 });
  });

  const targetGeometry = pebbleGeometry(108, 8, .35);
  stoneAttribute(targetGeometry, 1, .93, .19);
  const rollPebble = new THREE.Mesh(targetGeometry, stoneMaterial);
  rollPebble.name = 'touch-to-roll-near-pebble';
  rollPebblePosition.y = bedHeight(rollPebblePosition.x, rollPebblePosition.z) + .07;
  rollPebble.position.copy(rollPebblePosition); rollPebble.scale.set(.19, .1, .16);
  rollPebble.rotation.set(.1, .44, .06);
  rollPebble.castShadow = true; rollPebble.receiveShadow = true;
  scene.add(rollPebble);
  let rollStarted = -100;
  let rollBaseX = rollPebblePosition.x;
  let rollBaseRotation = rollPebble.rotation.z;
  let rollDirection = 1;
  let nextDirection = 1;

  // --- Sea, surf and swash: one surface, finest across the surf zone. -------
  const seaGeometry = (() => {
    const across = 150, positions: number[] = [], indices: number[] = [];
    const rowsZ: number[] = [];
    for (let z = 3.0; z > -9; z -= .1) rowsZ.push(z);
    for (let k = 1; k <= 90; k++) rowsZ.push(-9 - 321 * Math.pow(k / 90, 2.2));
    rowsZ.forEach((z, j) => {
      const half = 1.8 + Math.max(0, 3.9 - z) * 1.05;
      for (let i = 0; i <= across; i++) {
        positions.push((i / across * 2 - 1) * half, 0, z);
        if (i < across && j < rowsZ.length - 1) { const k = j * (across + 1) + i; indices.push(k, k + 1, k + across + 1, k + 1, k + across + 2, k + across + 1); }
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices);
    g.computeBoundingSphere();
    return g;
  })();
  const sunRadiance = new THREE.Vector3(SUN.r, SUN.g, SUN.b).multiplyScalar(40);
  const waterMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: true,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    uniforms: { uTime: clock, uSun: sunUniform, uSunRadiance: { value: sunRadiance } },
    vertexShader: SEA_VERTEX, fragmentShader: SEA_FRAGMENT,
  });
  const water = new THREE.Mesh(seaGeometry, waterMaterial);
  water.name = 'surf-and-swash'; water.renderOrder = 2; water.frustumCulled = false;
  scene.add(water);

  // --- A stratified headland with a turf cap to the left, a stack and an islet.
  const rock = cliffMaterial('pebble-headland', clock);
  const cliffs: Array<[string, Parameters<typeof cliffGeometry>[0]]> = [
    ['stratified-headland', { cx: -50, cz: -63, a: 32, b: 15, height: 16, seed: 3.1, taperEast: .45, segments: 220, rows: 70, capRows: 12 }],
    ['headland-spur', { cx: -17.5, cz: -53, a: 9, b: 5.5, height: 8, seed: 7.7, taperEast: .3, segments: 120, rows: 40, capRows: 6, talus: 3.5 }],
    ['sea-stack', { cx: -5.5, cz: -48, a: 2.8, b: 2.2, height: 6.2, seed: 5.2, segments: 56, rows: 34, capRows: 4, talus: 1.6 }],
    ['distant-islet', { cx: 44, cz: -125, a: 11, b: 4, height: 3.4, seed: 11.3, taperEast: .2, segments: 90, rows: 22, capRows: 5, talus: 2 }],
  ];
  cliffs.forEach(([name, options]) => {
    const mesh = new THREE.Mesh(cliffGeometry(options), rock);
    mesh.name = name; mesh.receiveShadow = false;
    scene.add(mesh);
  });

  // --- Strand detail: wrack draped over the stones, shells, a driftwood twig.
  const weedRandom = seeded(4471);
  const strands: Strand[] = [];
  const clumps: Array<[number, number, number]> = [[-1.35, .45, 7], [.95, .15, 6], [2.25, 1.05, 5], [-2.55, 1.6, 6], [.35, -.55, 5], [1.55, 1.95, 4], [-.7, 2.05, 3], [-3.4, .4, 5]];
  const strandPoint = (x: number, z: number) => new THREE.Vector3(x, surfaceAt(x, z) + .004, z);
  clumps.forEach(([cx, cz, count]) => {
    const heading = weedRandom() * Math.PI * 2;
    for (let s = 0; s < count; s++) {
      let a = heading + (weedRandom() - .5) * 2.2, x = cx + (weedRandom() - .5) * .05, z = cz + (weedRandom() - .5) * .05;
      const length = 9 + Math.floor(weedRandom() * 9), step = .022 + weedRandom() * .01;
      const points = [strandPoint(x, z)];
      for (let k = 0; k < length; k++) {
        a += (weedRandom() - .5) * .5;
        x += Math.cos(a) * step; z += Math.sin(a) * step;
        points.push(strandPoint(x, z));
        if (k === 5 && weedRandom() > .4) {
          // Fucus forks dichotomously.
          let b = a + .6, bx = x, bz = z;
          const branch = [points[points.length - 1].clone()];
          for (let m = 0; m < 6; m++) { b += (weedRandom() - .5) * .4; bx += Math.cos(b) * step; bz += Math.sin(b) * step; branch.push(strandPoint(bx, bz)); }
          strands.push({ points: branch, width: .007 });
          a -= .3;
        }
      }
      strands.push({ points, width: .008 + weedRandom() * .005 });
    }
  });
  const weedMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .3, metalness: 0, side: THREE.DoubleSide });
  weedMaterial.onBeforeCompile = shader => {
    shader.uniforms.uTime = clock;
    shader.uniforms.uSun = sunUniform;
    shader.uniforms.uSunRadiance = { value: sunRadiance };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute float aSway;
attribute float aSide;
uniform float uTime;
varying vec3 vWeedWorld;
varying float vWeedSide;
${GLSL_NOISE}
${GLSL_SHORE}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  // Swash drags covered fronds up the strand, the backwash combs them back.
  vec3 w = (modelMatrix * vec4(transformed, 1.0)).xyz;
  float cover = smoothstep(0.0, 0.01, shoreLevel(w.xz, uTime) - w.y);
  float flow = swashLevel(w.x, uTime) - swashLevel(w.x, uTime - 0.6);
  transformed.z += clamp(flow * 2.5, -0.03, 0.03) * aSway * cover;
  transformed.y += 0.006 * aSway * cover * (0.5 + 0.5 * sin(uTime * 2.1 + w.x * 9.0));
}`)
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWeedWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvWeedSide = aSide;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform vec3 uSunRadiance;
varying vec3 vWeedWorld;
varying float vWeedSide;
${GLSL_NOISE}
${GLSL_SHORE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float rib = 1.0 - smoothstep(0.0, 0.25, abs(vWeedSide));
vec3 frond = mix(vec3(0.075, 0.055, 0.018), vec3(0.12, 0.09, 0.025), smoothstep(-0.4, 0.5, bwNoise(vWeedWorld * 30.0)));
diffuseColor.rgb = frond * (0.85 + 0.3 * rib);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  // Thin fronds glow olive-gold when the low sun shines through them.
  float back = pow(max(dot(normalize(vWeedWorld - cameraPosition), uSun), 0.0), 4.0);
  totalEmissiveRadiance += uSunRadiance * vec3(0.012, 0.008, 0.0015) * (back * 0.9 + 0.1);
}`);
  };
  weedMaterial.customProgramCacheKey = () => 'pebble-wrack-v1';
  const wrack = new THREE.Mesh(wrackGeometry(strands), weedMaterial);
  wrack.name = 'wrack-strands'; wrack.castShadow = true; wrack.receiveShadow = true;
  scene.add(wrack);

  const shells = new THREE.Group(); shells.name = 'scattered-shells';
  const shellMat = shellMaterial();
  const shellShapes = [shellGeometry(3, 'cockle'), shellGeometry(8, 'cockle'), shellGeometry(5, 'limpet')];
  const shellSpots: Array<[number, number, number, number, boolean]> = [
    [.42, 2.15, 0, .032, false], [-.58, 1.82, 1, .036, true], [1.05, 1.62, 2, .026, false], [-1.62, 2.72, 0, .038, false],
    [.15, 1.0, 1, .03, true], [2.05, 2.25, 0, .034, false], [-.95, .95, 2, .024, false], [.72, 2.92, 1, .04, true], [-2.15, 2.05, 0, .03, true],
    [.3, 2.55, 2, .028, false], [-.32, 2.4, 0, .034, false],
  ];
  shellSpots.forEach(([x0, z0, kind, size, flipped], i) => {
    // Shells settle into the gaps between stones, not on their crowns.
    let x = x0, z = z0;
    for (let k = 0; k < 60 && surfaceAt(x, z) - bedMesh(x, z) > .006; k++) {
      const a = k * 2.4, r = .012 * k;
      x = x0 + Math.cos(a) * r; z = z0 + Math.sin(a) * r;
    }
    if (surfaceAt(x, z) - bedMesh(x, z) > .006) return;
    const mesh = new THREE.Mesh(shellShapes[kind], shellMat);
    mesh.scale.setScalar(size);
    mesh.position.set(x, bedMesh(x, z) + (flipped ? size * .5 : .001), z);
    mesh.rotation.set(flipped ? Math.PI - .25 : .12 + (i % 3) * .1, i * 2.17, (i % 2) * .2 - .1);
    mesh.castShadow = true; mesh.receiveShadow = true;
    shells.add(mesh);
  });
  scene.add(shells);

  const drift = limbGeometry([new THREE.Vector3(-.42, 0, 0), new THREE.Vector3(-.1, .02, .05), new THREE.Vector3(.18, 0, -.03), new THREE.Vector3(.43, .01, .02)], .032, .4, 9, 4.2);
  const driftwood = new THREE.Mesh(drift, createRockMaterial('#9b9284', { key: 'shore-driftwood', scale: 6, bump: .5, strata: 0, cavity: .4, stainAmount: .2, stain: '#6a5a48', dryRoughness: .85, wetRoughness: .3, drips: 0, algaeAmount: 0 }));
  driftwood.position.set(1.83, surfaceAt(1.83, 1.8) + .015, 1.8); driftwood.rotation.y = .71;
  driftwood.castShadow = true; driftwood.receiveShadow = true; driftwood.name = 'water-worn-twig';
  scene.add(driftwood);

  function resize(width: number, height: number) {
    const portrait = width / height < .8;
    camera.aspect = width / height;
    camera.fov = portrait ? 58 : 55;
    camera.position.set(portrait ? -.05 : .05, portrait ? .67 : .72, portrait ? 3.35 : 3.25);
    // Portrait turns slightly toward the sun's path and tilts down to the
    // reachable waterline, keeping the horizon and the near stones.
    camera.lookAt(portrait ? .3 : -.32, portrait ? -.43 : -.2, portrait ? -1.25 : -2.65);
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  }
  function update(time: number, _dt: number) {
    clock.value = time;
    if (time - rollStarted >= 0 && time - rollStarted < 2.2) {
      renderer.shadowMap.needsUpdate = true;
      const t = Math.min(1, (time - rollStarted) / 1.7);
      const ease = 1 - Math.pow(1 - t, 3);
      const rocking = Math.sin(t * Math.PI * 5) * (1 - t) * .035;
      rollPebble.position.x = rollBaseX + rollDirection * .19 * ease;
      rollPebble.position.y = bedHeight(rollPebble.position.x, rollPebble.position.z) + .07 + Math.sin(t * Math.PI) * .027;
      rollPebble.rotation.z = rollBaseRotation - rollDirection * ease * .62 + rocking;
    }
  }
  function interact(x: number, y: number, time: number): WaterEdgeInteraction | null {
    if (time - rollStarted < 2.2) return null;
    camera.updateMatrixWorld(); scene.updateMatrixWorld(true);
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    if (!raycaster.intersectObject(rollPebble, false).length) return null;
    rollStarted = time; rollBaseX = rollPebble.position.x; rollBaseRotation = rollPebble.rotation.z;
    rollDirection = nextDirection; nextDirection *= -1;
    return { world: 'pebble-shore', kind: 'pebble-roll', strength: .24, position: { x: rollPebble.position.x, z: rollPebble.position.z } };
  }
  resize(1400, 900);
  update(0, 0);
  return {
    scene, camera, resize, update, interact,
    post: {
      exposure: .9, bloomStrength: .1, bloomThreshold: 0, aoStrength: 1, aoRadius: .2,
      saturation: 1.05, contrast: 1.13, shadowTint: [.86, .96, 1.12], highlightTint: [1.05, 1.0, .93], vignette: .3, grain: .025,
    },
    createVolume(): VolumeEffect {
      const material = new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          uSunDir: { value: SUN_DIR.clone() }, uSunColor: { value: new THREE.Vector3(SUN.r, SUN.g, SUN.b).multiplyScalar(.6) },
          uAmbient: { value: new THREE.Vector3(.05, .058, .07) }, uHaze: { value: .0008 }, uMist: { value: .006 },
        },
      });
      return { material };
    },
    setPostActive(active) {
      scene.fog = active ? null : new THREE.FogExp2(0xb7aea3, .006);
      renderer.toneMappingExposure = active ? 1 : .95;
    },
    dispose: () => { environment.dispose(); },
  };
}
