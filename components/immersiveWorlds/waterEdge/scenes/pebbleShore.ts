import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldScene, WaterEdgeInteraction } from '../contracts';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, ridged3, seeded } from '../../shared/render/noise';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { applyFoliage, crownGeometry, leafAtlas, type Crown } from '../render/foliage';
import { limbGeometry } from '../render/trees';
import { pebbleGeometry } from '../render/stones';
import { radianceProbe } from '../render/surfaces';

/*
 * Independently authored basalt pebble strand (몽돌 해변) at dawn. Metres; the
 * viewer sits low among the stones. The sun has just cleared the sea to the
 * front right: it is the only strong light, laying a glitter path over the
 * water, rim-lighting the wet pebbles and casting long shadows toward the
 * viewer. The sky is the ambient light, reflected in every wet stone through a
 * radiance probe of the same procedural sky. Shallow swash advances and
 * recedes over the stones and leaves them dark and glossy as it drains.
 */

const SUN_DIR = new THREE.Vector3(.17, .115, -.98).normalize();
const SUN = new THREE.Color(1.0, .78, .56);

const GLSL_SHORE = /* glsl */ `
uniform vec3 uSun;
float bed(vec2 p) {
  return .038 * (p.y + 1.7) + .018 * sin(p.x * .67) + .009 * sin(p.y * 1.3 + p.x * .2)
    - .09 * exp(-((p.x + .4) * .6) * ((p.x + .4) * .6)) * exp(-((p.y - .2) * .35) * ((p.y - .2) * .35));
}
float tideAt(float t) { return .076 + sin(t * .29 - .7) * .042 + sin(t * .14) * .009; }
float swashHeight(vec2 p, float t) {
  float tide = tideAt(t);
  return tide + (sin(p.x * .94 + p.y * 1.57 + t * .72) * .014 + sin(p.y * 4.1 - p.x * 1.3 + t * .88) * .006) * smoothstep(0.0, .8, tide - bed(p));
}
vec3 dawnSky(vec3 d, float t) {
  float hp = max(d.y, 0.0);
  float s = max(dot(d, uSun), 0.0);
  vec3 c = mix(vec3(0.9, 0.78, 0.66), vec3(0.2, 0.32, 0.5), pow(hp, 0.38));
  c += vec3(1.1, 0.6, 0.22) * pow(s, 8.0) * exp(-hp * 5.0);
  c += vec3(2.2, 1.4, 0.6) * pow(s, 220.0);
  c += vec3(70.0, 55.0, 36.0) * smoothstep(0.99955, 0.99978, s);
  // Altocumulus deck: cool grey bellies, warm edges toward the sun.
  vec2 cp = d.xz / (hp + 0.05) * 0.55 + vec2(t * 0.002, t * 0.0007);
  float shape = bwFbm3(vec3(cp * 0.9, 1.3)) + 0.25 * bwNoise(vec3(cp * 4.0, 2.1));
  float cloud = smoothstep(0.02, 0.45, shape) * smoothstep(0.015, 0.09, hp) * (1.0 - smoothstep(0.3, 0.65, hp));
  float lit = pow(s, 5.0);
  vec3 cloudColor = mix(vec3(0.42, 0.44, 0.5), vec3(2.6, 1.6, 0.85), lit) * (0.75 + 0.35 * bwNoise(vec3(cp * 6.0, 4.0)));
  c = mix(c, cloudColor, cloud * 0.78);
  // Horizon haze band.
  c = mix(c, vec3(0.85, 0.78, 0.72) + vec3(0.9, 0.5, 0.2) * pow(s, 4.0), exp(-hp * 30.0) * 0.5);
  return c;
}
`;

const SEA_VERTEX = /* glsl */ `
${GLSL_NOISE}
${GLSL_SHORE}
uniform float uTime;
varying vec3 vSeaWorld;
void main() {
  vec3 p = position;
  p.y = swashHeight(p.xz, uTime);
  vSeaWorld = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const SEA_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
${GLSL_SHORE}
uniform float uTime;
uniform vec3 uSunRadiance;
varying vec3 vSeaWorld;
vec2 swell(vec2 p, float t) {
  vec2 s = vec2(0.0);
  s += vec2(0.05, 0.99) * cos(dot(p, vec2(0.05, 0.99)) * 0.55 + t * 0.9) * 0.085;
  s += vec2(-0.3, 0.95) * cos(dot(p, vec2(-0.3, 0.95)) * 1.1 + t * 1.25) * 0.06;
  s += vec2(0.42, 0.9) * cos(dot(p, vec2(0.42, 0.9)) * 2.3 + t * 1.7) * 0.04;
  s += vec2(-0.7, 0.7) * cos(dot(p, vec2(-0.7, 0.7)) * 4.1 + t * 2.1) * 0.025;
  s += vec2(0.8, 0.6) * cos(dot(p, vec2(0.8, 0.6)) * 7.3 + t * 2.6) * 0.014;
  return s;
}
void main() {
  vec2 p = vSeaWorld.xz;
  float t = uTime;
  float depth = vSeaWorld.y - bed(p);
  if (depth < 0.0005) discard;
  vec3 toEye = cameraPosition - vSeaWorld;
  float dist = length(toEye);
  vec3 v = toEye / dist;
  // Swell grows with depth; the swash sheet carries only small ripples.
  float open = smoothstep(0.03, 0.9, depth);
  vec2 slope = swell(p, t) * open * (0.35 + 0.65 * smoothstep(1.0, 12.0, -p.y));
  slope += vec2(sin(p.x * 1.32 + p.y * 2.1 + t * .8) * .045 + sin(p.y * 5.6 + t * .98) * .022,
                cos(p.x * .91 - p.y * 1.45 + t * .52) * .07 + sin(p.x * 6.1 + p.y * 3.6 + t * .83) * .021) * (0.25 + 0.4 * (1.0 - open));
  vec3 q = vec3(p * 3.2, t * 0.45);
  float n0 = bwNoise(q);
  slope += vec2(bwNoise(q + vec3(0.05, 0.0, 0.0)) - n0, bwNoise(q + vec3(0.0, 0.05, 0.0)) - n0) / 0.05 * 0.006 / (1.0 + dist * 0.05);
  vec3 n = normalize(vec3(-slope.x, 1.0, -slope.y));
  float cosV = max(dot(n, v), 0.0);
  float fresnel = 0.02 + 0.98 * pow(clamp(1.0 - cosV, 0.0, 1.0), 5.0);
  vec3 r = reflect(-v, n);
  r.y = abs(r.y);
  vec3 sky = dawnSky(r, t);
  // Glitter: sun on sub-pixel facets, a lobe that widens with distance so the
  // far path stays continuous rather than aliasing.
  vec3 fine = normalize(n + vec3(bwNoise(vec3(p * 9.0, t * 0.9)), 0.0, bwNoise(vec3(p * 9.0 + 7.3, t * 0.9))) * 0.06);
  float lobe = mix(3000.0, 120.0, smoothstep(2.0, 70.0, dist));
  float glitter = pow(max(dot(reflect(-v, fine), uSun), 0.0), lobe) * lobe * 0.0011;
  // Body: shallow sheet is clear, deeper water turns blue-green and the sunward
  // faces of the swell glow with light scattered through them.
  vec3 body = mix(vec3(0.03, 0.07, 0.065), vec3(0.008, 0.03, 0.045), smoothstep(0.3, 4.0, depth));
  float through = pow(max(dot(-v, uSun) * 0.5 + 0.5, 0.0), 6.0) * max(slope.y * 6.0 + 0.3, 0.0) * open;
  body += vec3(0.08, 0.28, 0.22) * through * 0.6;
  vec3 col = mix(body, sky, fresnel) + uSunRadiance * glitter * fresnel * 2.0;
  // Foam lace at the moving swash edge and a few broken scraps behind it.
  float edge = depth + (bwValue(vec3(p.x * 2.7 + t * .06, p.y * .5, 0.0)) - .5) * .012;
  float lip = (1.0 - smoothstep(.004, .022, abs(edge - .015))) * smoothstep(.3, .62, bwValue(vec3(p.x * 6.5, p.y * 11.0 - t * .12, 1.0)));
  float lace = (1.0 - smoothstep(.005, .013, abs(edge - .06 - bwValue(vec3(p.x * 2.4, t * .07, 3.0)) * .03)));
  lace *= smoothstep(.5, .72, bwValue(vec3(p * vec2(14.0, 22.0), t * .06))) * .5;
  float bubbles = smoothstep(.62, .8, bwValue(vec3(p * 38.0, t * .2))) * (1.0 - smoothstep(.0, .09, depth)) * .45;
  float foam = clamp(lip * .7 + lace + bubbles, 0.0, .85);
  vec3 foamColor = vec3(.85, .86, .84) * (0.55 + 0.45 * max(dot(n, uSun) + 0.6, 0.0)) + vec3(1.0, .8, .55) * 0.25;
  col = mix(col, foamColor, foam);
  float sheet = 1.0 - exp(-depth * 9.0);
  float alpha = clamp(fresnel + sheet * 0.55 + open * 0.45, 0.0, 1.0) * smoothstep(0.0, 0.01, depth);
  alpha = max(alpha, foam * 0.9);
  gl_FragColor = vec4(col, alpha);
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

export function createPebbleShore(renderer: THREE.WebGLRenderer): WorldScene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(.9, .8, .7);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.035, 460);
  const raycaster = new THREE.Raycaster();
  const clock = { value: 0 };
  const scaleMatrix = new THREE.Object3D();

  // --- Sky, sun and the radiance probe built from the same sky. --------------
  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uSun: { value: SUN_DIR }, uTime: clock },
    vertexShader: 'varying vec3 vSkyWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vSkyWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: `${GLSL_NOISE}\n${GLSL_SHORE}\nuniform float uTime;varying vec3 vSkyWorld;
      void main(){vec3 d=normalize(vSkyWorld-cameraPosition);vec3 c=dawnSky(d,uTime);if(d.y<0.)c=vec3(.5,.48,.46);gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 64, 32), skyMaterial);
  sky.name = 'silver-morning-sky'; sky.frustumCulled = false; sky.renderOrder = -5;
  scene.add(sky);
  const environment = radianceProbe(renderer, probe => {
    probe.add(new THREE.Mesh(new THREE.SphereGeometry(30, 48, 24), new THREE.ShaderMaterial({
      side: THREE.BackSide, uniforms: { uSun: { value: SUN_DIR } },
      vertexShader: 'varying vec3 vSkyWorld;void main(){vSkyWorld=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: `${GLSL_NOISE}\n${GLSL_SHORE}\nvarying vec3 vSkyWorld;
        void main(){vec3 d=normalize(vSkyWorld);vec3 c=dawnSky(vec3(d.x,max(d.y,0.),d.z),0.);
          // Below the horizon: the sea's own reflection of the sky, then dark stones.
          if(d.y<0.)c=mix(c*.35+vec3(.02,.04,.05),vec3(.03,.03,.03),smoothstep(-.05,-.5,d.y));
          gl_FragColor=vec4(c,1.);}`,
    })));
  });
  scene.environment = environment.texture;
  scene.environmentIntensity = 1;

  const sun = new THREE.DirectionalLight(SUN, 4.6);
  sun.position.copy(SUN_DIR).multiplyScalar(30).add(new THREE.Vector3(0, 0, -.5));
  sun.target.position.set(0, 0, -.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 2.2, bottom: -2.2, near: 10, far: 50 });
  sun.shadow.normalBias = .012; sun.shadow.bias = -.0002; sun.shadow.radius = 2;
  scene.add(sun, sun.target);
  // Sunlit swash and bright stones throw a faint warm bounce into the shadowed near side.
  const bounce = new THREE.PointLight('#ffd2a0', 1.6, 6, 2);
  bounce.position.set(.6, .35, .4);
  scene.add(bounce);

  // --- Strand: a pebble carpet shader under real near-field pebbles. ----------
  const bedGeometry = new THREE.PlaneGeometry(120, 1, 240, 160);
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
  const bedMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .7, metalness: 0 });
  bedMaterial.onBeforeCompile = shader => {
    shader.uniforms.uTime = clock;
    shader.uniforms.uSun = { value: SUN_DIR };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBedWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvBedWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime;
varying vec3 vBedWorld;
${GLSL_NOISE}
${GLSL_SHORE}
// Packed rounded pebbles: nearest jittered cell centre, its radius and colour.
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
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 bedP = vBedWorld.xz * 6.5;
vec2 bedCentre; float bedGap;
vec4 cellInfo = pebbleCell(bedP, bedCentre, bedGap);
float stoneR = 0.36 + cellInfo.y * 0.16;
float dome = sqrt(max(1.0 - pow(cellInfo.w / stoneR, 2.0), 0.0));
float crevice = smoothstep(0.02, 0.14, bedGap) * smoothstep(0.0, 0.25, dome);
vec3 basalt = mix(vec3(0.035, 0.036, 0.035), vec3(0.11, 0.11, 0.105), cellInfo.x * cellInfo.x);
basalt *= 0.85 + 0.3 * bwNoise(vec3(vBedWorld.xz * 60.0, cellInfo.z * 9.0));
vec3 bedColor = mix(vec3(0.012, 0.012, 0.012), basalt, crevice);
float water = swashHeight(vBedWorld.xz, uTime);
float above = vBedWorld.y + dome * 0.03 - water;
float bedWet = 1.0 - smoothstep(0.0, 0.05 + 0.03 * cellInfo.y, above - max(0.0, tideAt(uTime - 3.0) - tideAt(uTime)) * 0.6);
bedColor *= mix(1.0, 0.55, bedWet);
diffuseColor.rgb = bedColor;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.62 + 0.12 * cellInfo.z, 0.1, bedWet) + (1.0 - crevice) * 0.3;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec2 g = (bedP - bedCentre) / stoneR * 1.6 * crevice;
  vec3 worldN = normalize(vec3(g.x, 1.0, g.y));
  vec3 viewN = normalize((viewMatrix * vec4(worldN, 0.0)).xyz);
  normal = normalize(mix(normal, viewN, 0.85));
}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  float under = smoothstep(0.0, 0.02, -above);
  reflectedLight.directSpecular *= 1.0 - 0.85 * under;
  reflectedLight.indirectSpecular *= 1.0 - 0.85 * under;
}`);
  };
  bedMaterial.customProgramCacheKey = () => 'pebble-carpet-v1';
  const bed = new THREE.Mesh(bedGeometry, bedMaterial);
  bed.receiveShadow = true; bed.name = 'sloped-gravel-strand';
  scene.add(bed);

  // Basalt is dielectric. Dry crowns are matte with a salt bloom; the swash
  // contact and its draining fringe turn dark and glassy.
  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .6, metalness: 0, vertexColors: true, envMapIntensity: 1 });
  stoneMaterial.onBeforeCompile = shader => {
    shader.uniforms.uTime = clock;
    shader.uniforms.uSun = { value: SUN_DIR };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vStoneLocal;\nvarying vec3 vStoneWorld;\nvarying float vStoneSeed;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vStoneLocal = position;
vec4 shoreWorld = vec4(transformed, 1.0);
vec3 stoneTint = vec3(1.0);
#ifdef USE_COLOR
  stoneTint = color;
#endif
#ifdef USE_INSTANCING
  shoreWorld = instanceMatrix * shoreWorld;
#endif
#ifdef USE_INSTANCING_COLOR
  stoneTint *= instanceColor;
#endif
// The mineral pattern is anchored to the stone, so the rolling pebble keeps it.
vStoneSeed = fract(dot(stoneTint, vec3(17.3, 11.7, 23.1)));
vStoneWorld = (modelMatrix * shoreWorld).xyz;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform float uTime;
varying vec3 vStoneLocal;
varying vec3 vStoneWorld;
varying float vStoneSeed;
${GLSL_NOISE}
${GLSL_SHORE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 stoneP = vStoneLocal * 2.2 + vec3(vStoneSeed * 17.3, vStoneSeed * 11.7, vStoneSeed * 23.1);
float broad = bwFbm3(stoneP * 0.8);
float speck = smoothstep(0.55, 0.8, bwNoise(stoneP * 14.0)) * (0.5 + 0.5 * vStoneSeed);
float vein = pow(max(1.0 - abs(bwNoise(stoneP * vec3(0.7, 2.6, 0.7) + 3.0)), 0.0), 40.0) * step(0.72, vStoneSeed);
float resolved = 1.0 - smoothstep(0.35, 1.4, length(fwidth(vStoneLocal)) * 60.0);
diffuseColor.rgb *= 0.86 + broad * 0.22 + (speck * 0.35 + vein * 0.9) * resolved;
float water = swashHeight(vStoneWorld.xz, uTime);
float draining = max(0.0, tideAt(uTime - 3.0) - tideAt(uTime));
float contact = 1.0 - smoothstep(-0.004, 0.006, vStoneWorld.y - water);
float damp = 1.0 - smoothstep(0.006, 0.05 + draining * 0.8, vStoneWorld.y - water);
// Salt bloom on dry crowns: a faint pale film.
float salt = smoothstep(0.08, 0.25, vStoneWorld.y - water) * smoothstep(0.2, 0.7, bwNoise(stoneP * 3.0 + 9.0)) * 0.25;
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.2, 0.2, 0.19), salt);
diffuseColor.rgb *= mix(1.0, 0.55, max(contact, damp * 0.85));`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
float dryR = 0.5 + vStoneSeed * 0.16 + broad * 0.08 + salt * 0.6;
roughnessFactor = mix(dryR, 0.12 + vStoneSeed * 0.05, damp);
roughnessFactor = mix(roughnessFactor, 0.06, contact);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  // Fine pitting, filtered to nothing below a pixel; a water film smooths it.
  float grain = bwNoise(stoneP * 9.0) * 0.6 + bwNoise(stoneP * 23.0) * 0.4;
  grain = mix(0.0, grain, resolved);
  vec3 sx = dFdx(-vViewPosition), sy = dFdy(-vViewPosition);
  vec3 gx = cross(sy, normal), gy = cross(normal, sx);
  float det = dot(sx, gx);
  vec3 gradient = sign(det) * (dFdx(grain) * gx + dFdy(grain) * gy);
  normal = normalize(max(abs(det), 1e-10) * normal - gradient * 0.0005 * (1.0 - damp * 0.8));
}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  // Under the sheet the stone's own gloss disappears; the water surface shows it.
  float under = smoothstep(0.0, 0.015, water - vStoneWorld.y);
  reflectedLight.directSpecular *= 1.0 - 0.85 * under;
  reflectedLight.indirectSpecular *= 1.0 - 0.85 * under;
}`);
  };
  stoneMaterial.customProgramCacheKey = () => 'water-edge-basalt-dawn-v1';

  // Pebble field: several shapes, packed shoulder to shoulder in two courses.
  const random = seeded(731923);
  const palette = [0x2e302e, 0x262827, 0x3a3b38, 0x1f2121, 0x444541, 0x323432, 0x292b2c, 0x555651, 0x3e3f3c];
  const variants = Array.from({ length: 7 }, (_, i) => pebbleGeometry(i * 11 + 2, i < 5 ? 3 : 2, .25 + (i % 3) * .15));
  const placements: { matrix: THREE.Matrix4; color: THREE.Color }[][] = variants.map(() => []);
  const rollPebblePosition = new THREE.Vector3(-0.18, 0, 1.36);
  const place = (x: number, z: number, size: number, lift: number, variant: number) => {
    const sx = size * (1 + random() * .55), sy = size * (.42 + random() * .25), sz = size * (.75 + random() * .45);
    scaleMatrix.position.set(x, bedHeight(x, z) + sy * lift, z);
    scaleMatrix.scale.set(sx, sy, sz);
    scaleMatrix.rotation.set((random() - .5) * .35, random() * Math.PI * 2, (random() - .5) * .3);
    scaleMatrix.updateMatrix();
    const c = new THREE.Color(palette[Math.floor(random() * palette.length)]);
    c.multiplyScalar(.85 + random() * .3);
    placements[variant].push({ matrix: scaleMatrix.matrix.clone(), color: c });
  };
  // Rows widen with distance to follow the view frustum; far rows use coarser shapes.
  for (const [spacing, zNear, zFar, lift, sizeRange] of [
    [.16, 3.7, -2.6, .3, [.055, .095]],
    [.25, 3.6, -2.0, .6, [.045, .08]],
    [.28, -2.2, -7, .45, [.08, .14]],
  ] as Array<[number, number, number, number, [number, number]]>) {
    for (let z = zNear; z > zFar; z -= spacing * .87) {
      const row = Math.round((zNear - z) / (spacing * .87));
      const xRange = 1.2 + (3.8 - z) * .95;
      for (let x = -xRange; x < xRange; x += spacing) {
        const px = x + (row % 2) * spacing * .5 + (random() - .5) * spacing * .45, pz = z + (random() - .5) * spacing * .4;
        if (Math.abs(px + .18) < .27 && Math.abs(pz - 1.36) < .2) continue;
        // A shallow channel of open water reaches in among the stones, so the
        // swash runs right up to the viewer instead of stopping mid-beach.
        const channel = Math.exp(-Math.pow((px + .35) * .64, 2)) * THREE.MathUtils.smoothstep(pz, -3.2, -2.4) * (1 - THREE.MathUtils.smoothstep(pz, 1.1, 1.5));
        if (random() < channel * (lift > .5 ? .95 : .72)) continue;
        const size = sizeRange[0] + random() * (sizeRange[1] - sizeRange[0]) + (random() < .05 ? .05 : 0);
        place(px, pz, size, lift, pz < 1.4 ? 5 + Math.floor(random() * 2) : Math.floor(random() * 5));
      }
    }
  }
  variants.forEach((geometry, v) => {
    const list = placements[v];
    const mesh = new THREE.InstancedMesh(geometry, stoneMaterial, list.length);
    list.forEach(({ matrix, color }, i) => { mesh.setMatrixAt(i, matrix); mesh.setColorAt(i, color); });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = `rounded-basalt-field-${v}`;
    mesh.computeBoundingSphere();
    scene.add(mesh);
  });

  // Foreground stones: larger, finely tessellated, each its own shape.
  const foregroundSpecs = [
    [-1.32, 2.35, .5, .2, .4, 3], [1.49, 2.49, .52, .21, .4, 1],
    [-1.19, .65, .28, .12, .24, 5], [1.7, 1.21, .33, .13, .28, 7],
    [-2.3, 1.39, .38, .17, .32, 4], [.85, 2.78, .3, .14, .25, 2],
    [2.59, .25, .42, .18, .36, 8], [-2.97, -.48, .46, .19, .38, 3],
    [1.53, -.61, .23, .1, .2, 5], [-.12, 2.82, .27, .1, .21, 6],
  ];
  const vertexTint = (geometry: THREE.BufferGeometry, color: THREE.Color) => {
    const colors = new Float32Array(geometry.getAttribute('position').count * 3);
    for (let j = 0; j < colors.length; j += 3) { colors[j] = color.r; colors[j + 1] = color.g; colors[j + 2] = color.b; }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  };
  foregroundSpecs.forEach(([x, z, sx, sy, sz, n], i) => {
    const geometry = pebbleGeometry(n * 31 + i, 7, .3 + (i % 3) * .12);
    vertexTint(geometry, new THREE.Color(palette[(i * 3) % palette.length]).multiplyScalar(.9 + (i % 4) * .08));
    const mesh = new THREE.Mesh(geometry, stoneMaterial);
    mesh.position.set(x, bedHeight(x, z) + sy * .55, z);
    mesh.scale.set(sx, sy, sz); mesh.rotation.set(.07 * (i % 3), n * .62, -.08);
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = `foreground-quartz-basalt-${i}`;
    scene.add(mesh);
  });

  const targetGeometry = pebbleGeometry(108, 8, .35);
  vertexTint(targetGeometry, new THREE.Color(0x3b3e3b));
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

  // --- Sea and swash: one surface, finer near the strand. --------------------
  const seaGeometry = (() => {
    const across = 160, along = 220, positions: number[] = [], indices: number[] = [];
    for (let j = 0; j <= along; j++) {
      const v = j / along, z = 8 - 330 * Math.pow(v, 2.4);
      for (let i = 0; i <= across; i++) {
        const u = i / across, x = (u * 2 - 1) * (14 + 300 * Math.pow(v, 1.5));
        positions.push(x, 0, z);
        if (i < across && j < along) { const k = j * (across + 1) + i; indices.push(k, k + 1, k + across + 1, k + 1, k + across + 2, k + across + 1); }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices);
    g.computeBoundingSphere();
    return g;
  })();
  const sunRadiance = new THREE.Vector3(SUN.r, SUN.g, SUN.b).multiplyScalar(40);
  const waterMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: true,
    uniforms: { uTime: clock, uSun: { value: SUN_DIR }, uSunRadiance: { value: sunRadiance } },
    vertexShader: SEA_VERTEX, fragmentShader: SEA_FRAGMENT,
  });
  const water = new THREE.Mesh(seaGeometry, waterMaterial);
  water.name = 'advancing-shallow-swash'; water.renderOrder = 2; water.frustumCulled = false;
  scene.add(water);

  // --- A basalt headland to the left and a low islet to the right. -----------
  const headlandMaterial = createRockMaterial('#4c4f49', {
    key: 'pebble-headland', scale: .35, bump: 1.6, stain: '#5d4a36', stainAmount: .3, cavity: .7, strata: .55,
    waterY: 0, wetBand: 1.4, wetness: 0, drips: .1, dryRoughness: .88, wetRoughness: .25, algae: '#2e3a28', algaeAmount: .5,
    moss: { color: '#3d4c2a', amount: .9 },
  });
  const headland = (originX: number, originZ: number, length: number, width: number, height: number, seed: number, name: string) => {
    const nu = 150, nv = 70, positions: number[] = [], indices: number[] = [];
    for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
      const u = i / nu, v = j / nv;
      const x = originX + (u - .5) * length, z = originZ + (v - .5) * width;
      const spine = Math.pow(Math.sin(Math.PI * u), .7) * Math.pow(Math.sin(Math.PI * v), .9);
      const crags = ridged3(x * .08 + seed, 0, z * .08, 4) * .9 + fbm3(x * .25, seed, z * .25, 3) * .25;
      // Steep cliffs where the land meets the sea, terraced by basalt flows.
      let y = height * Math.pow(spine, .55) * (.55 + .6 * crags);
      y = y - Math.sin(y * 2.2) * .18;
      positions.push(x, Math.max(y - .4, -.6), z);
      if (i < nu && j < nv) { const k = j * (nu + 1) + i; indices.push(k, k + nu + 1, k + 1, k + 1, k + nu + 1, k + nu + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    const mesh = new THREE.Mesh(g, headlandMaterial);
    mesh.name = name;
    scene.add(mesh);
    return mesh;
  };
  headland(-46, -58, 70, 34, 15, 3.1, 'weathered-headland-0');
  headland(-20, -52, 22, 12, 5, 7.7, 'weathered-headland-1');
  headland(32, -95, 16, 7, 2.6, 11.3, 'weathered-headland-2');
  // Wind-bent pines along the headland crest: sprig cards with crown normals.
  const crowns: Crown[] = [];
  const limbs: THREE.BufferGeometry[] = [];
  const pineRandom = seeded(9917);
  for (let i = 0; i < 150; i++) {
    const x = -68 + pineRandom() * 50, z = -70 + pineRandom() * 22;
    const u = (x + 46) / 70 + .5, v = (z + 58) / 34 + .5;
    if (u < .05 || u > .95 || v < .1 || v > .9) continue;
    const spine = Math.pow(Math.sin(Math.PI * u), .7) * Math.pow(Math.sin(Math.PI * v), .9);
    const crags = ridged3(x * .08 + 3.1, 0, z * .08, 4) * .9 + fbm3(x * .25, 3.1, z * .25, 3) * .25;
    let y = 15 * Math.pow(spine, .55) * (.55 + .6 * crags); y = y - Math.sin(y * 2.2) * .18 - .4;
    if (y < 2.5) continue;
    const h = 1.6 + pineRandom() * 2.2;
    limbs.push(limbGeometry([new THREE.Vector3(x, y - .5, z), new THREE.Vector3(x + .3, y + h * .6, z + .2), new THREE.Vector3(x + .6, y + h, z)], .2, .6, 5, i));
    const r = 2.2 + pineRandom() * 1.6;
    // Wind-pruned crowns: broad, flat-topped, leaning away from the sea.
    crowns.push({ centre: new THREE.Vector3(x + .6, y + h * .9, z), radii: new THREE.Vector3(r * 1.4, r * .62, r * 1.1), cards: 40, size: [1.5, 2.3], tint: new THREE.Color(.13, .18, .1) });
    crowns.push({ centre: new THREE.Vector3(x - r * .5, y + h * .45, z + r * .4), radii: new THREE.Vector3(r, r * .5, r), cards: 26, size: [1.4, 2.0], tint: new THREE.Color(.12, .17, .09) });
  }
  const pineAtlas = leafAtlas({ seed: 51, variants: 2, length: [.12, .2], width: .16, leavesPerTwig: 14, hsl: [.3, .35, .3], twigColor: '#3b3328' });
  const pineMaterial = applyFoliage(new THREE.MeshStandardMaterial({ map: pineAtlas, vertexColors: true, alphaTest: .45, alphaToCoverage: true, side: THREE.DoubleSide, roughness: .85 }), {
    key: 'shore-pines', time: clock, lightDirection: SUN_DIR, lightColor: SUN.clone().multiplyScalar(3), translucency: .6, wind: .08, crownNormals: true, specular: .3,
  });
  const pines = new THREE.Mesh(crownGeometry(crowns, 313, 2), pineMaterial);
  pines.name = 'headland-pines';
  scene.add(pines);
  const pineTrunks = new THREE.Mesh(mergeGeometries(limbs), new THREE.MeshStandardMaterial({ color: '#3a302a', roughness: .9 }));
  limbs.forEach(g => g.dispose());
  pineTrunks.name = 'headland-pine-trunks';
  scene.add(pineTrunks);

  // Water-worn driftwood and a washed-up kelp frond give quiet scale cues.
  const drift = limbGeometry([new THREE.Vector3(-.42, 0, 0), new THREE.Vector3(-.1, .02, .05), new THREE.Vector3(.18, 0, -.03), new THREE.Vector3(.43, .01, .02)], .032, .4, 9, 4.2);
  const driftwood = new THREE.Mesh(drift, createRockMaterial('#9b9284', { key: 'shore-driftwood', scale: 6, bump: .5, strata: 0, cavity: .4, stainAmount: .2, stain: '#6a5a48', dryRoughness: .85, wetRoughness: .3, drips: 0, algaeAmount: 0 }));
  driftwood.position.set(1.83, bedHeight(1.83, 1.8) + .04, 1.8); driftwood.rotation.y = .71;
  driftwood.castShadow = true; driftwood.receiveShadow = true; driftwood.name = 'water-worn-twig';
  scene.add(driftwood);
  const kelpGeometries: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 5; i++) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(.05 * (i - 2), .018, .15),
      new THREE.Vector3(.06 * (i - 2), .022, .31), new THREE.Vector3(.065 * (i - 2) + .03, .012, .41 + i * .025),
    ]);
    const points = curve.getPoints(16);
    const vertices: number[] = [], indices: number[] = [];
    points.forEach((point, j) => { const width = Math.sin(j / 16 * Math.PI) * .018; vertices.push(point.x - width, point.y, point.z, point.x + width, point.y, point.z); if (j < 16) { const a = j * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); g.setIndex(indices); g.computeVertexNormals();
    kelpGeometries.push(g);
  }
  const seaweed = new THREE.Group(); seaweed.name = 'washed-kelp-frond';
  const kelpMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3c22, roughness: .25, side: THREE.DoubleSide });
  kelpGeometries.forEach(g => seaweed.add(new THREE.Mesh(g, kelpMaterial)));
  seaweed.position.set(-1.54, bedHeight(-1.54, .36) + .03, .36); seaweed.rotation.y = -.48;
  scene.add(seaweed);

  function resize(width: number, height: number) {
    const portrait = width / height < .8;
    camera.aspect = width / height;
    camera.fov = portrait ? 58 : 55;
    camera.position.set(portrait ? -.05 : .05, portrait ? .67 : .72, portrait ? 3.35 : 3.25);
    // Portrait tilts toward the reachable waterline, keeping the horizon and
    // the tactile near stones rather than spending the frame on empty sky.
    camera.lookAt(portrait ? -.2 : -.32, portrait ? -.43 : -.2, portrait ? -1.25 : -2.65);
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
      exposure: 1.0, bloomStrength: .1, bloomThreshold: 0, aoStrength: 1, aoRadius: .22,
      saturation: 1.05, contrast: 1.1, shadowTint: [.86, .96, 1.12], highlightTint: [1.05, 1.0, .93], vignette: .32, grain: .025,
    },
    createVolume(): VolumeEffect {
      const material = new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: {
          uSunDir: { value: SUN_DIR.clone() }, uSunColor: { value: new THREE.Vector3(SUN.r, SUN.g, SUN.b).multiplyScalar(.6) },
          uAmbient: { value: new THREE.Vector3(.05, .058, .07) }, uHaze: { value: .0006 }, uMist: { value: .006 },
        },
      });
      return { material };
    },
    setPostActive(active) {
      scene.fog = active ? null : new THREE.FogExp2(0xb7aea3, .006);
      renderer.toneMappingExposure = active ? 1 : .95;
    },
    dispose: () => { environment.dispose(); pineAtlas.dispose(); },
  };
}

function bedHeight(x: number, z: number) { return .038 * (z + 1.7) + .018 * Math.sin(x * .67) + .009 * Math.sin(z * 1.3 + x * .2) - .09 * Math.exp(-Math.pow((x + .4) * .6, 2)) * Math.exp(-Math.pow((z - .2) * .35, 2)); }
