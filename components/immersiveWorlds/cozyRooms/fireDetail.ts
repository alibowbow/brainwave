import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { patchSurface } from '../shared/render/interiorSurface';
import { fbm3, noise3, seeded } from '../shared/render/noise';

/*
 * An original procedural wood fire, built for the HDR pipeline:
 *  - charred logs whose alligatored char cracks glow from inside, hottest
 *    underneath and on the flame side, each crack cell breathing on its own,
 *  - a bed of ash-skinned coals with slowly pulsing heat and a pale ash floor,
 *  - one ray-marched flame volume: domain-warped noise advected upward through
 *    a tileable 3D noise texture, a blackbody colour ramp and HDR emission so
 *    the bloom and tone curve read it as fire rather than as cards,
 *  - a few slow sparks, and one flicker signal that drives the fire light.
 * Motion is slow and continuous: no flashes, no flare-ups.
 */

type Triple = [number, number, number];
export type FireLog = { length: number; radius: number; position: Triple; rotation: Triple };
export type FireOptions = {
  seed: number;
  logs: FireLog[];
  bed: { width: number; depth: number; y: number; z: number };
  flame: { width: number; depth: number; y: number; z: number; height: number };
  /** Key light emitted by the flames. */
  light?: { intensity: number; distance?: number; shadow?: boolean; mapSize?: number; forward?: number; inner?: number };
  sparks?: number;
};

/** Tileable gradient noise in four channels (two frequencies each), one 32^3 volume. */
function noiseVolume(seed: number) {
  const size = 32, data = new Uint8Array(size * size * size * 4);
  const channels = [4, 8, 8, 16].map((period, channel) => {
    const random = seeded(seed * 31 + channel * 977);
    const grads = new Float32Array(period * period * period * 3);
    for (let i = 0; i < period ** 3; i++) {
      const z = random() * 2 - 1, a = random() * Math.PI * 2, r = Math.sqrt(1 - z * z);
      grads[i * 3] = r * Math.cos(a); grads[i * 3 + 1] = r * Math.sin(a); grads[i * 3 + 2] = z;
    }
    return { period, grads };
  });
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  for (let z = 0; z < size; z++) for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const index = ((z * size + y) * size + x) * 4;
    channels.forEach(({ period, grads }, channel) => {
      const px = x / size * period, py = y / size * period, pz = z / size * period;
      const ix = Math.floor(px), iy = Math.floor(py), iz = Math.floor(pz);
      const fx = px - ix, fy = py - iy, fz = pz - iz;
      let value = 0;
      for (let c = 0; c < 8; c++) {
        const ox = c & 1, oy = (c >> 1) & 1, oz = (c >> 2) & 1;
        const g = (((iz + oz) % period) * period + ((iy + oy) % period)) * period + ((ix + ox) % period);
        const dot = grads[g * 3] * (fx - ox) + grads[g * 3 + 1] * (fy - oy) + grads[g * 3 + 2] * (fz - oz);
        value += dot * (ox ? fade(fx) : 1 - fade(fx)) * (oy ? fade(fy) : 1 - fade(fy)) * (oz ? fade(fz) : 1 - fade(fz));
      }
      data[index + channel] = Math.round(THREE.MathUtils.clamp(value * 1.45 * 0.5 + 0.5, 0, 1) * 255);
    });
  }
  const texture = new THREE.Data3DTexture(data, size, size, size);
  texture.format = THREE.RGBAFormat; texture.type = THREE.UnsignedByteType;
  texture.wrapS = texture.wrapT = texture.wrapR = THREE.RepeatWrapping;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.unpackAlignment = 1; texture.needsUpdate = true;
  return texture;
}

/** Cellular char: F2-F1 edge distance on a cylinder wrapped around its axis. */
const GLSL_CHAR = /* glsl */ `
uniform float uFireTime;
uniform float uFireHeat;
uniform vec3 uFireCentre;
vec3 charCells(vec2 p, float wrap) {
  vec2 cell = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0; float id = 0.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 c = cell + vec2(float(i), float(j));
    vec2 key = vec2(wrap > 0.0 ? mod(c.x, wrap) : c.x, c.y);
    vec3 h = bwHash3(vec3(key, 19.0));
    vec2 o = vec2(float(i), float(j)) + 0.15 + 0.7 * h.xy - f;
    float d = dot(o, o);
    if (d < d1) { d2 = d1; d1 = d; id = h.z; } else if (d < d2) { d2 = d; }
  }
  return vec3(sqrt(d2) - sqrt(d1), id, sqrt(d1));
}
vec3 fireGlow(float t) {
  vec3 c = mix(vec3(0.55, 0.035, 0.004), vec3(1.0, 0.22, 0.025), smoothstep(0.0, 0.45, t));
  c = mix(c, vec3(1.0, 0.5, 0.12), smoothstep(0.45, 0.85, t));
  return mix(c, vec3(1.0, 0.78, 0.42), smoothstep(0.85, 1.0, t));
}
`;

const FLAME_VERTEX = /* glsl */ `
varying vec3 vLocal;
varying vec3 vEye;
void main() {
  vLocal = position;
  // Camera in the volume's local frame (the hearth group may be rotated).
  vEye = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function flameFragment(logs: number) {
  return /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise;
uniform float uTime;
uniform float uIntensity;
uniform float uResponse;
uniform vec3 uBox;
uniform vec3 uFlame;
uniform vec4 uLogCenter[${logs}];
uniform vec4 uLogAxis[${logs}];
varying vec3 vLocal;
varying vec3 vEye;
float fuelHit(vec3 ro, vec3 rd, vec4 center, vec4 axis) {
  vec3 p = ro - center.xyz;
  float da = dot(rd, axis.xyz), pa = dot(p, axis.xyz);
  float a = 1.0 - da * da, b = dot(rd, p) - da * pa, c = dot(p, p) - pa * pa - center.w * center.w;
  float result = 1e4;
  float disc = b * b - a * c;
  if (disc > 0.0 && a > 1e-5) { float t = (-b - sqrt(disc)) / a; if (t > 0.0 && abs(pa + t * da) < axis.w) result = t; }
  return result;
}
vec3 blackbody(float t) {
  vec3 c = mix(vec3(0.75, 0.05, 0.006), vec3(1.0, 0.27, 0.035), smoothstep(0.0, 0.35, t));
  c = mix(c, vec3(1.0, 0.56, 0.14), smoothstep(0.3, 0.7, t));
  return mix(c, vec3(1.0, 0.84, 0.55), smoothstep(0.7, 1.0, t));
}
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
void main() {
  vec3 ro = vEye, rd = normalize(vLocal - vEye);
  vec3 inv = 1.0 / rd;
  vec3 lo = vec3(-uBox.x * 0.5, 0.0, -uBox.z * 0.5), hi = vec3(uBox.x * 0.5, uBox.y, uBox.z * 0.5);
  vec3 t0 = (lo - ro) * inv, t1 = (hi - ro) * inv;
  vec3 tn = min(t0, t1), tf = max(t0, t1);
  float start = max(0.0, max(tn.x, max(tn.y, tn.z))), finish = min(tf.x, min(tf.y, tf.z));
  for (int i = 0; i < ${logs}; i++) finish = min(finish, fuelHit(ro, rd, uLogCenter[i], uLogAxis[i]));
  if (finish <= start) discard;
  const int STEPS = 30;
  float dt = (finish - start) / float(STEPS);
  float jitter = ign(gl_FragCoord.xy);
  vec3 light = vec3(0.0);
  float trans = 1.0;
  float time = uTime;
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * (start + (float(i) + jitter) * dt);
    float h = p.y / uFlame.y;
    if (h < 0.0 || h > 1.15) continue;
    // Footprint over the fuel, narrowing and leaning a little as gases rise.
    vec2 f = vec2(p.x / (uFlame.x * 0.5), p.z / (uFlame.z * 0.5));
    f /= max(1.0 - 0.45 * h, 0.3);
    float fx2 = f.x * f.x;
    float foot = max(1.0 - fx2 * fx2, 0.0) * max(1.0 - f.y * f.y, 0.0) - 0.15 * fx2 - max(f.y * f.y - 1.0, 0.0);
    // Upward advection through warped, layered noise; finer layers rise faster.
    vec3 q = vec3(p.x * 1.35, p.y * 0.9 - time * 0.62, p.z * 1.35);
    vec2 warp = texture(uNoise, q * 0.45 + vec3(0.13, -time * 0.05, 0.71)).gb - 0.5;
    q.xz += warp * 0.55 * (0.4 + h);
    float n = texture(uNoise, q).g * 0.55 + texture(uNoise, q * 2.03 + vec3(0.37, -time * 0.35, 0.19)).b * 0.3 + texture(uNoise, q * 4.1 + vec3(0.61, -time * 0.9, 0.43)).a * 0.15;
    // Separate tongues: a slow lateral wave that strengthens with height.
    float tongues = texture(uNoise, vec3(p.x * 2.6 + 0.3, p.y * 0.42 - time * 0.24, p.z * 1.2 + 0.8)).r;
    float shape = foot * 0.8 + (n - 0.5) * 2.0 + (tongues - 0.5) * 2.1 * h - h * 1.38 + 0.36 + uResponse * 0.05;
    // Fade before the bounding box so no tongue is ever cut by its faces.
    vec2 edge = abs(vec2(p.x, p.z)) / (vec2(uBox.x, uBox.z) * 0.5);
    float inside = (1.0 - smoothstep(0.72, 0.95, edge.x)) * (1.0 - smoothstep(0.7, 0.95, edge.y)) * (1.0 - smoothstep(0.88, 1.0, p.y / uBox.y));
    float density = smoothstep(0.0, 0.28, shape) * smoothstep(0.0, 0.07, h) * inside;
    if (density > 0.002) {
      float temp = clamp(shape * 1.55 + (1.0 - h) * 0.32 - 0.08, 0.0, 1.0);
      vec3 emit = blackbody(temp) * mix(0.3, 8.5, temp * temp * temp) * uIntensity;
      // A trace of blue where gas first burns over the fuel.
      emit += vec3(0.05, 0.12, 0.55) * smoothstep(0.12, 0.0, h) * density * 1.6;
      float a = density * dt * 26.0;
      light += trans * emit * a;
      trans *= exp(-a * 0.22);
    }
  }
  gl_FragColor = vec4(light, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
}

/** Slow, smooth flicker in roughly [0.86, 1.12]: summed incommensurate waves, no steps. */
export function fireFlicker(time: number) {
  return 1 + 0.055 * Math.sin(time * 1.63) + 0.04 * Math.sin(time * 2.71 + 1.3) + 0.026 * Math.sin(time * 4.37 + 0.4) + 0.016 * Math.sin(time * 6.93 + 2.1);
}

export function createFireDetail(options: FireOptions) {
  const random = seeded(options.seed);
  const group = new THREE.Group();
  const timeUniform = { value: 0 };
  const heatUniform = { value: 1 };
  const flameCentre = new THREE.Vector3(0, options.flame.y + options.flame.height * 0.25, options.flame.z);
  // Shaders compare against world positions; the fire group may be moved or turned.
  const centreUniform = { value: flameCentre.clone() };

  // --- Charred logs: one merged mesh, alligatored char, glowing crack cells. ----
  const logGeometries: THREE.BufferGeometry[] = [];
  const logCenters: THREE.Vector4[] = [], logAxes: THREE.Vector4[] = [];
  options.logs.forEach((definition, logIndex) => {
    const { length, radius, position, rotation } = definition;
    const geometry = new THREE.CylinderGeometry(radius * 0.88, radius, length, 28, 14, false);
    const p = geometry.attributes.position;
    const phase = logIndex * 1.93 + options.seed * 0.001;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const r = Math.hypot(x, z);
      if (r < 1e-6) continue;
      const a = Math.atan2(x, z);
      // Split face, knots and a lumpy outline instead of a turned dowel.
      const split = Math.pow(Math.max(0, Math.cos(a - phase)), 14) * 0.3;
      const knot = Math.exp(-((y / length - 0.2 * Math.sin(phase)) ** 2) / 0.004) * Math.pow(Math.max(0, Math.cos(a + phase * 2)), 6) * 0.18;
      const scale = 1 + 0.09 * noise3(Math.cos(a) * 1.6 + phase, y * 3.2, Math.sin(a) * 1.6) + 0.035 * noise3(Math.cos(a) * 5 + phase, y * 9, Math.sin(a) * 5) - split + knot;
      const bend = Math.sin(y / length * Math.PI + 0.6) * radius * 0.09;
      p.setXYZ(i, x * scale + bend, y, z * scale);
    }
    geometry.computeVertexNormals();
    // Ends of the logs are flat sawn faces; keep their own rings via the shader.
    const object = new THREE.Object3D();
    object.position.set(...position); object.rotation.set(...rotation); object.updateMatrix();
    geometry.applyMatrix4(object.matrix);
    // The shader needs the original local axis frame: store per-vertex log-space coordinates.
    const local = new Float32Array(p.count * 3);
    const inverse = object.matrix.clone().invert(), v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i).applyMatrix4(inverse); local[i * 3] = v.x; local[i * 3 + 1] = v.y + logIndex * 3.1; local[i * 3 + 2] = v.z; }
    geometry.setAttribute('logLocal', new THREE.BufferAttribute(local, 3));
    geometry.clearGroups();
    logGeometries.push(geometry);
    const axis = new THREE.Vector3(0, 1, 0).applyEuler(object.rotation);
    logCenters.push(new THREE.Vector4(position[0], position[1] - options.flame.y, position[2] - options.flame.z, radius * 0.9));
    logAxes.push(new THREE.Vector4(axis.x, axis.y, axis.z, length * 0.5));
  });
  const logMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#2a2622', roughness: 0.96, metalness: 0, emissive: '#ffffff', emissiveIntensity: 1 }), {
    key: `cozy-char-log-${options.logs.length}`,
    uniforms: { uFireTime: timeUniform, uFireHeat: heatUniform, uFireCentre: centreUniform },
    fragmentHeader: `${GLSL_CHAR}\nvarying vec3 vLogLocal;`,
    color: `
vec3 lgP = vLogLocal;
float lgR = length(lgP.xz);
float lgA = atan(lgP.x, lgP.z) / 6.2831853 + 0.5;
// Char blocks: about 3 cm, a little longer across the grain, wrapped around the log.
vec3 lgCell = charCells(vec2(lgA * 16.0, lgP.y * 19.0), 16.0);
float lgCrack = 1.0 - smoothstep(0.04, 0.16, lgCell.x);
float lgFine = (1.0 - smoothstep(0.0, 0.06, charCells(vec2(lgA * 44.0, lgP.y * 50.0), 44.0).x)) * bwResolve(length(fwidth(lgP)) * 50.0);
float lgAsh = smoothstep(0.35, 0.9, bwNoise(vec3(lgA * 9.0, lgP.y * 5.0, 3.0)) + 0.3 * vSurfaceNormal.y);
vec3 lgColor = mix(vec3(0.014, 0.013, 0.012), vec3(0.04, 0.037, 0.034), lgCell.y);
lgColor = mix(lgColor, vec3(0.2, 0.19, 0.18), lgAsh * 0.4 * (1.0 - lgCrack));
lgColor *= 1.0 - 0.75 * max(lgCrack, lgFine * 0.6);
diffuseColor.rgb = lgColor;
// Heat: underside and flame side of each log, near the coals; cells breathe slowly.
vec3 lgToFire = uFireCentre - vSurfaceWorld;
float lgBelow = smoothstep(0.25, -0.12, vSurfaceWorld.y - (uFireCentre.y - 0.12));
float lgFacing = clamp(dot(normalize(vSurfaceNormal), normalize(lgToFire)) * 0.5 + 0.5, 0.0, 1.0);
float lgBreath = 0.6 + 0.4 * sin(uFireTime * (0.35 + 0.4 * lgCell.y) + lgCell.y * 40.0);
float lgHeat = clamp(lgBelow * 0.8 + lgFacing * 0.45 - 0.18, 0.0, 1.0) * lgBreath * uFireHeat;`,
    height: '-(max(lgCrack, lgFine * 0.5)) * 0.004 + lgCell.z * 0.002',
    emissive: `totalEmissiveRadiance = fireGlow(lgHeat) * (lgCrack * 4.5 + lgFine * 1.2 + 0.05) * lgHeat * lgHeat * 2.2;`,
  });
  // The char shader reads the original log frame from a per-vertex attribute.
  const previousCompile = logMaterial.onBeforeCompile;
  logMaterial.onBeforeCompile = (shader, renderer) => {
    previousCompile.call(logMaterial, shader, renderer);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 logLocal;\nvarying vec3 vLogLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLogLocal = logLocal;');
  };
  const logsGeometry = mergeGeometries(logGeometries, false)!;
  // Centre the merged fuel on its own origin so its world position (used for
  // touch-target projection in QA) is the middle of the stack, not the hearth floor.
  logsGeometry.computeBoundingBox();
  const logsCentre = logsGeometry.boundingBox!.getCenter(new THREE.Vector3());
  logsGeometry.translate(-logsCentre.x, -logsCentre.y, -logsCentre.z);
  const logs = new THREE.Mesh(logsGeometry, logMaterial);
  logs.position.copy(logsCentre);
  logGeometries.forEach(geometry => geometry.dispose());
  logs.castShadow = false; logs.receiveShadow = true;
  logs.userData.cozyAction = 'log';
  logs.name = 'cozy-fire-logs';
  group.add(logs);

  // --- Coal bed: irregular chunks with ash skins and breathing fissures. -------
  const coalGeometry: THREE.BufferGeometry[] = [];
  const coalCount = Math.round(130 * options.bed.width / 1.9);
  const matrix = new THREE.Matrix4(), quaternion = new THREE.Quaternion();
  const position = new THREE.Vector3(), scale = new THREE.Vector3();
  for (let i = 0; i < coalCount; i++) {
    const size = options.bed.width * (0.012 + random() * 0.024);
    const geometry = new THREE.IcosahedronGeometry(size, 2);
    const vertices = geometry.attributes.position;
    for (let j = 0; j < vertices.count; j++) {
      const x = vertices.getX(j), y = vertices.getY(j), z = vertices.getZ(j);
      const warp = 1 + fbm3(x / size * 0.9 + i, y / size * 0.9, z / size * 0.9, 3) * 0.32;
      vertices.setXYZ(j, x * warp, y * warp, z * warp);
    }
    geometry.deleteAttribute('uv');
    const x = (random() - 0.5) * options.bed.width, z = (random() - 0.5) * options.bed.depth;
    const mound = 1 - Math.min(1, (x / (options.bed.width * 0.5)) ** 2 + (z / (options.bed.depth * 0.5)) ** 2);
    position.set(x, options.bed.y + size * 0.25 + random() * 0.02 + mound * 0.03, options.bed.z + z);
    scale.set(1 + random() * 0.5, 0.42 + random() * 0.4, 0.7 + random() * 0.5);
    quaternion.setFromEuler(new THREE.Euler(random() * 0.5, random() * Math.PI, random() * 0.5));
    matrix.compose(position, quaternion, scale); geometry.applyMatrix4(matrix);
    geometry.computeVertexNormals();
    coalGeometry.push(geometry);
  }
  // Ash floor beneath the coals: a soft, slightly domed disc.
  const ashGeometry = new THREE.CircleGeometry(1, 48, 0, Math.PI * 2);
  ashGeometry.rotateX(-Math.PI / 2);
  const ap = ashGeometry.attributes.position;
  for (let i = 0; i < ap.count; i++) {
    const x = ap.getX(i), z = ap.getZ(i), r = Math.hypot(x, z);
    ap.setXYZ(i, x * options.bed.width * 0.6, options.bed.y - 0.012 + (1 - r * r) * 0.018 + noise3(x * 4, 0, z * 4) * 0.006, options.bed.z + z * options.bed.depth * 0.62);
  }
  ashGeometry.deleteAttribute('uv');
  ashGeometry.computeVertexNormals();
  coalGeometry.push(ashGeometry.toNonIndexed());
  ashGeometry.dispose();
  const bedMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#3a3530', roughness: 1, metalness: 0, emissive: '#ffffff', emissiveIntensity: 1 }), {
    key: 'cozy-coal-bed',
    uniforms: { uFireTime: timeUniform, uFireHeat: heatUniform, uFireCentre: centreUniform },
    fragmentHeader: GLSL_CHAR,
    color: `
vec3 cbP = vSurfaceWorld;
vec3 cbCell = charCells(vec2(cbP.x * 22.0 + cbP.y * 9.0, cbP.z * 22.0 - cbP.y * 7.0), 0.0);
float cbCrack = 1.0 - smoothstep(0.05, 0.3, cbCell.x);
float cbUp = clamp(vSurfaceNormal.y, 0.0, 1.0);
float cbAsh = smoothstep(0.2, 0.8, cbUp * 0.8 + bwNoise(cbP * 21.0) * 0.5);
vec3 cbColor = mix(vec3(0.016, 0.015, 0.014), vec3(0.24, 0.23, 0.22), cbAsh * 0.6);
cbColor *= 1.0 - 0.6 * cbCrack;
diffuseColor.rgb = cbColor;
float cbDist = length((cbP - uFireCentre) * vec3(1.0, 0.0, 1.6));
float cbHot = smoothstep(${(options.bed.width * 0.62).toFixed(3)}, 0.05, cbDist);
float cbBreath = 0.55 + 0.45 * sin(uFireTime * (0.22 + 0.35 * cbCell.y) + cbCell.y * 31.0);
float cbHeat = clamp(cbHot * (0.6 + 0.4 * cbBreath) * (1.0 - 0.45 * cbAsh), 0.0, 1.0) * uFireHeat;`,
    height: '-cbCrack * 0.003',
    emissive: 'totalEmissiveRadiance = fireGlow(cbHeat) * (cbCrack * 3.0 + 0.9) * cbHeat * cbHeat * 2.2;',
  });
  const coals = new THREE.Mesh(mergeGeometries(coalGeometry, false)!, bedMaterial);
  coalGeometry.forEach(geometry => geometry.dispose());
  coals.receiveShadow = true; coals.name = 'cozy-fire-coals';
  group.add(coals);

  // --- Flame volume. ------------------------------------------------------------
  const { flame } = options;
  const box = new THREE.Vector3(flame.width * 1.4, flame.height * 1.2, flame.depth * 1.7);
  const noise = noiseVolume(options.seed);
  const volumeMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
    uniforms: {
      uNoise: { value: noise }, uTime: timeUniform, uIntensity: { value: 1 }, uResponse: { value: 0 },
      uBox: { value: box }, uFlame: { value: new THREE.Vector3(flame.width, flame.height, flame.depth) },
      uLogCenter: { value: logCenters }, uLogAxis: { value: logAxes },
    },
    vertexShader: FLAME_VERTEX,
    fragmentShader: flameFragment(options.logs.length),
  });
  const volumeGeometry = new THREE.BoxGeometry(box.x, box.y, box.z); volumeGeometry.translate(0, box.y * 0.5, 0);
  const volume = new THREE.Mesh(volumeGeometry, volumeMaterial);
  volume.position.set(0, flame.y, flame.z); volume.renderOrder = 2; volume.frustumCulled = false; volume.name = 'cozy-fire-flames';
  group.add(volume);

  // --- Sparks: a few slow embers lifting on the draught. ------------------------
  const sparkCount = options.sparks ?? 26;
  const sparkSeeds = new Float32Array(sparkCount * 4);
  for (let i = 0; i < sparkCount; i++) sparkSeeds.set([(random() - 0.5) * flame.width * 0.8, (random() - 0.5) * flame.depth * 0.8, random(), 0.5 + random() * 0.5], i * 4);
  const sparkGeometry = new THREE.BufferGeometry();
  sparkGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sparkCount * 3), 3));
  sparkGeometry.setAttribute('seed', new THREE.BufferAttribute(sparkSeeds, 4));
  const sparkMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: timeUniform, uHeight: { value: flame.height * 1.9 }, uPixel: { value: 1 } },
    vertexShader: `uniform float uTime; uniform float uHeight; uniform float uPixel; attribute vec4 seed; varying float vGlow;
      void main() {
        float life = fract(uTime * 0.075 * seed.w + seed.z);
        vec3 p = vec3(seed.x, ${flame.y.toFixed(3)} + 0.12 + life * uHeight, ${flame.z.toFixed(3)} + seed.y);
        p.x += sin(uTime * 0.7 * seed.w + seed.z * 40.0) * 0.06 * life + sin(seed.z * 91.0) * 0.12 * life;
        p.z += cos(uTime * 0.53 + seed.z * 23.0) * 0.04 * life;
        // Only a third of the seeds are alight at any moment, each for part of its rise.
        float alight = step(0.66, fract(seed.z * 7.13 + floor(uTime * 0.075 * seed.w + seed.z) * 0.618));
        vGlow = alight * smoothstep(0.0, 0.08, life) * pow(1.0 - life, 1.6);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp(5.0 / -mv.z, 1.0, 3.0) * uPixel;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `varying float vGlow; void main() { float d = length(gl_PointCoord - 0.5) * 2.0; gl_FragColor = vec4(vec3(5.0, 1.9, 0.45) * vGlow * (1.0 - smoothstep(0.2, 1.0, d)), 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  });
  const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
  sparks.frustumCulled = false; sparks.renderOrder = 3; sparks.name = 'cozy-fire-sparks';
  group.add(sparks);

  // --- Light: the flames are the key light of the room. ------------------------
  const lightOptions = { intensity: 6, distance: 0, shadow: false, mapSize: 512, forward: 0.12, inner: 0.6, ...options.light };
  const light = new THREE.PointLight('#ff8f42', lightOptions.intensity, lightOptions.distance, 2);
  light.position.set(0, flame.y + flame.height * 0.36, flame.z + flame.depth * 0.5 + lightOptions.forward);
  // Close glow of the flames on the firebox and fuel; short range, no shadow.
  const inner = new THREE.PointLight('#ff7a2e', lightOptions.inner, flame.width * 1.6, 2);
  inner.position.set(0, flame.y + flame.height * 0.5, flame.z + flame.depth * 0.1);
  group.add(inner);
  if (lightOptions.shadow) {
    light.castShadow = true;
    light.shadow.mapSize.set(lightOptions.mapSize, lightOptions.mapSize);
    light.shadow.radius = 6; light.shadow.bias = -0.002; light.shadow.normalBias = 0.02;
    light.shadow.camera.near = 0.08; light.shadow.camera.far = 14;
    // The fire light does not move; only its intensity breathes.
    light.shadow.autoUpdate = false; light.shadow.needsUpdate = true;
  }
  group.add(light);

  let flicker = 1;
  return {
    group, light, flameCentre,
    /** The current flicker multiplier, for bounce lights that follow the fire. */
    get flicker() { return flicker; },
    update(time: number, response: number) {
      timeUniform.value = time;
      group.updateWorldMatrix(true, false);
      centreUniform.value.copy(flameCentre).applyMatrix4(group.matrixWorld);
      flicker = fireFlicker(time) + response * 0.05;
      volumeMaterial.uniforms.uIntensity.value = 0.92 + (flicker - 1) * 1.3;
      volumeMaterial.uniforms.uResponse.value = response;
      heatUniform.value = 0.94 + (flicker - 1) * 0.6 + response * 0.12;
      light.intensity = lightOptions.intensity * flicker;
      inner.intensity = lightOptions.inner * (0.8 + 0.2 * flicker + (flicker - 1) * 0.8);
      return flicker;
    },
    setPixelRatio(ratio: number) { sparkMaterial.uniforms.uPixel.value = ratio; },
  };
}
