import * as THREE from 'three';
import { GLSL_COAST_SKY, type CoastSkyUniforms } from './coastSky';

/*
 * The sea inlet below the camp (original). One analytic shore shared by the
 * terrain mesh (CPU) and the water shader (GPU), so the waterline, the lapping
 * swash and the foam all agree with the pebbles they run over.
 *
 * The water is never a still mirror:
 *  - eight wind-wave trains with deep-water dispersion travel toward the
 *    shore; each fades by its own footprint along its direction, so crests
 *    that run toward the eye stay sharp far away and move the reflections,
 *  - wind ripples from the noise volume drift and evolve, broken by slow
 *    calm slicks (cat's paws), filtered by pixel footprint and handed to a
 *    slope-variance glint so far ripples still stretch highlights into streaks,
 *  - near the shore the swell gives way to small wavelets; a quick run-up and
 *    slow drain moves the waterline over the beach, with lace foam on the edge,
 *    around rocks and posts,
 *  - the reflection is the drawn sky (clouds included), the far hills from a
 *    precomputed skyline, and the nearby trees and jetty from analytic shapes.
 * Output is premultiplied: shallow water lets the firelit pebbles show through.
 */

/** Mean sea level relative to the camp ground (metres). */
export const SEA_LEVEL = -0.55;
const BANK_RISE = -SEA_LEVEL - 0.11 * 2.4;
const f = (n: number) => n.toFixed(5);

/** z of the mean waterline at x: a small cove, a pine point on the left, a forested shore running out on the right. */
export function shoreZ(x: number) {
  const s = THREE.MathUtils.smoothstep;
  const right = x - 3.6;
  return -3.5 - 6.2 * Math.exp(-(((x + 8.0) / 2.4) ** 2)) + 2.4 * s(-x, 9.5, 15) - 0.7 * s(x, -2, 3) - 1.4 * (right + Math.sqrt(right * right + 0.5))
    + 0.22 * Math.sin(x * 0.9 + 0.4) + 0.1 * Math.sin(x * 2.3 + 1);
}

/** Beach and seabed height from the landward distance to the mean waterline. */
export function shoreProfile(d: number) {
  const h = SEA_LEVEL + 0.11 * Math.min(d, 2.4) + 0.08 * Math.min(d, 0) + BANK_RISE * THREE.MathUtils.smoothstep(d, 1.5, 3.3);
  return Math.max(h, SEA_LEVEL - 3);
}

export const GLSL_SHORE = /* glsl */ `
float coastShoreZ(float x) {
  float right = x - 3.6;
  return -3.5 - 6.2 * exp(-((x + 8.0) * (x + 8.0)) / 5.76) + 2.4 * smoothstep(9.5, 15.0, -x) - 0.7 * smoothstep(-2.0, 3.0, x) - 1.4 * (right + sqrt(right * right + 0.5))
    + 0.22 * sin(x * 0.9 + 0.4) + 0.1 * sin(x * 2.3 + 1.0);
}
float coastBed(vec2 p) {
  float d = p.y - coastShoreZ(p.x);
  float h = ${f(SEA_LEVEL)} + 0.11 * min(d, 2.4) + 0.08 * min(d, 0.0) + ${f(BANK_RISE)} * smoothstep(1.5, 3.3, d);
  return max(h, ${f(SEA_LEVEL - 3)});
}
/** Swash: a quick run-up and a slow drain, two unsynchronised trains along the shore. */
float coastLapPhase(vec2 p, float t, float period, float along, float offset) {
  float s = p.x * 0.9 + p.y * 0.25;
  return fract(t / period - s * along + offset);
}
float coastRun(float a) { return smoothstep(0.0, 0.2, a) * (1.0 - smoothstep(0.2, 1.0, a)); }
float coastLap(vec2 p, float t) {
  return 0.026 * coastRun(coastLapPhase(p, t, 5.7, 0.071, 0.0)) + 0.016 * coastRun(coastLapPhase(p, t, 8.3, 0.047, 0.37)) - 0.012;
}
`;

const WATER_VERTEX = /* glsl */ `
${GLSL_SHORE}
uniform float uTime;
varying vec3 vWorld;
varying float vShoreDistance;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  float d = world.z - coastShoreZ(world.x);
  vShoreDistance = d;
  // Open water rides on the swell; by the shore the plane sits just above the highest swash.
  float open = 1.0 - smoothstep(-2.2, -0.6, d);
  float t = uTime;
  float swell = sin(dot(world.xz, vec2(0.205, 0.82)) - t * 2.27) * 0.03 + sin(dot(world.xz, vec2(-0.45, 1.29)) - t * 2.96) * 0.014;
  world.y = ${f(SEA_LEVEL)} + mix(0.032, swell, open);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const MAX_WATER_TREES = 12;
export const MAX_WATER_ROCKS = 12;

const WATER_FRAGMENT = /* glsl */ `
precision highp float;
${GLSL_COAST_SKY}
${GLSL_SHORE}
uniform float uTime;
uniform sampler2D uSkyline;
uniform vec3 uHill;
uniform vec3 uScatter;
uniform vec3 uFirePos;
uniform vec3 uFireColor;
uniform vec3 uLampPos;
uniform vec3 uLampColor;
uniform vec3 uFarLight[2];
uniform vec3 uFarColor[2];
uniform vec4 uTrees[${MAX_WATER_TREES}];
uniform vec4 uRocks[${MAX_WATER_ROCKS}];
uniform vec3 uDeckMin;
uniform vec3 uDeckMax;
uniform vec3 uSilhouette;
uniform float uWaveAngle[8];
uniform float uWaveLength[8];
uniform float uWaveSteep[8];
varying vec3 vWorld;
varying float vShoreDistance;

// Ripple height from the noise volume; two drifting, evolving layers.
float rippleHeight(vec2 p, float t) {
  float a = texture(uSkyNoise, vec3(p * 0.21 + vec2(0.021, 0.034) * t, t * 0.013)).g;
  float b = texture(uSkyNoise, vec3(p * vec2(0.55, 0.47) + vec2(-0.028, 0.051) * t, 0.5 + t * 0.021)).b;
  return (a - 0.5) * 0.026 + (b - 0.5) * 0.012;
}
float reflectedOccluder(vec3 p, vec3 r) {
  float hit = 0.0;
  for (int i = 0; i < ${MAX_WATER_TREES}; i++) {
    vec4 tree = uTrees[i];
    if (tree.z <= 0.0) continue;
    vec2 c = tree.xy - p.xz;
    float rr = max(dot(r.xz, r.xz), 1e-5);
    float t = dot(c, r.xz) / rr;
    if (t <= 0.0) continue;
    float lateral = length(p.xz + r.xz * t - tree.xy);
    float y = p.y + r.y * t - ${f(SEA_LEVEL)};
    float u = y / tree.z;
    if (u > 1.0) continue;
    // Positive radius: spruce cone from near the ground; negative: pine with a high, rounded crown and bare trunk.
    float radius = tree.w > 0.0 ? tree.w * clamp((1.0 - u) * 1.15, 0.0, 1.0) * smoothstep(0.0, 0.06, u)
      : max(-tree.w * sqrt(max(0.0, sin(3.14159 * clamp((u - 0.5) / 0.5, 0.0, 1.0)))), 0.22 * (1.0 - u));
    // Soft edge, wider with distance so the silhouette never aliases.
    hit = max(hit, 1.0 - smoothstep(radius * 0.8, radius * 1.05 + t * 0.004, lateral));
  }
  // The jetty: a box over the water.
  vec3 inv = 1.0 / (r + vec3(1e-5));
  vec3 t0 = (uDeckMin - p) * inv, t1 = (uDeckMax - p) * inv;
  vec3 tmin = min(t0, t1), tmax = max(t0, t1);
  float tn = max(max(tmin.x, tmin.y), tmin.z), tf = min(min(tmax.x, tmax.y), tmax.z);
  if (tf > max(tn, 0.0)) hit = 1.0;
  return hit;
}
void main() {
  vec2 p = vWorld.xz;
  float t = uTime;
  vec3 view = cameraPosition - vWorld;
  float distanceToEye = length(view);
  vec3 V = view / distanceToEye;
  float footprint = max(length(dFdx(p)), length(dFdy(p)));

  // Shore: dynamic level over the analytic bed.
  float bed = coastBed(p);
  float lap = coastLap(p, t);
  float shoreD = vShoreDistance;
  float nearShore = smoothstep(-3.5, -0.4, shoreD);
  float level = ${f(SEA_LEVEL)} + lap * nearShore;
  float depth = level - bed;
  float edgeWidth = 0.0025 + footprint * 0.02;
  if (depth < -edgeWidth) discard;
  float wetEdge = smoothstep(-edgeWidth, edgeWidth, depth);

  // Swell, fading as it shoals; wavelets take over by the shore.
  float open = 1.0 - smoothstep(-2.2, -0.6, shoreD);
  vec2 dpx = dFdx(p), dpy = dFdy(p);
  vec2 slope = vec2(0.0);
  float variance = 0.0005;
  // Calm slicks drift slowly over the inlet: the short waves die down inside them.
  float slick = smoothstep(0.38, 0.64, texture(uSkyNoise, vec3(p * 0.0062 + vec2(0.0011, 0.0019) * t, 0.31 + t * 0.0012)).r);
  // Eight wind-wave trains, deep-water dispersion. Each fades by its own footprint
  // along its direction, so crests that run toward the eye stay sharp far away.
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    float angle = uWaveAngle[i];
    vec2 dir = vec2(sin(angle), cos(angle));
    float wavelength = uWaveLength[i];
    float k = 6.2831853 / wavelength;
    float amplitude = wavelength * uWaveSteep[i] / 6.2831853 * mix(1.0, mix(0.3, 1.0, slick), step(2.0, 4.5 - wavelength)) * mix(0.35, 1.0, open);
    float w = sqrt(9.81 * k) * 0.78;
    float a = dot(p, dir) * k - w * t + fi * 1.73;
    float fp = length(vec2(dot(dpx, dir), dot(dpy, dir)));
    float fade = 1.0 - smoothstep(wavelength * 0.12, wavelength * 0.45, fp);
    float slopeAmp = amplitude * k;
    slope += dir * cos(a) * slopeAmp * fade;
    variance += 0.5 * slopeAmp * slopeAmp * (1.0 - fade);
  }
  float footprintFine = sqrt(length(dpx) * length(dpy));
  // Wavelets with crests along the shore, arriving every second or so.
  float shoal = smoothstep(-4.0, -1.0, shoreD) * (1.0 - smoothstep(-0.2, 0.3, shoreD));
  float wk = 6.2831853 / 0.9;
  slope += vec2(0.0, cos(shoreD * wk - t * 3.4 + sin(p.x * 0.7) * 1.5) * wk * 0.006) * shoal / (1.0 + footprint * footprint * 9.0);

  // Capillary ripples from the noise volume near the eye; their variance survives as roughness.
  float rippleAmp = mix(0.28, 1.0, slick) * (0.6 + 0.4 * nearShore);
  float e = 0.09;
  float h0 = rippleHeight(p, t);
  vec2 ripple = vec2(rippleHeight(p + vec2(e, 0.0), t) - h0, rippleHeight(p + vec2(0.0, e), t) - h0) / e * rippleAmp;
  float resolve = 1.0 / (1.0 + pow(footprintFine / 0.04, 2.0));
  slope += ripple * resolve;
  variance += dot(ripple, ripple) * (1.0 - resolve) * 0.5;

  vec3 n = normalize(vec3(-slope.x, 1.0, -slope.y));
  float nv = max(dot(n, V), 0.0);
  float fresnel = 0.02 + 0.98 * pow(1.0 - nv, 5.0);
  vec3 r = reflect(-V, n);
  r.y = max(r.y, 0.004);

  // Sky, far hills from the skyline, nearby trees and the jetty from shapes.
  vec3 reflected = coastSky(r);
  float azimuth = atan(r.x, -r.z);
  vec4 skyline = texture(uSkyline, vec2(azimuth / 3.2 + 0.5, 0.5));
  float ridge = skyline.r * 0.12;
  float elevation = asin(clamp(r.y, 0.0, 1.0));
  float soft = 0.004 + footprint * 0.001 + sqrt(variance) * 0.2;
  float hill = 1.0 - smoothstep(ridge - soft, ridge + soft, elevation);
  // Hills seen through the same haze that veils them in the view: lighter with distance and toward their crests.
  vec3 hillHaze = coastSkyBase(normalize(vec3(r.x, 0.015, r.z))) * 0.5;
  vec3 hillColor = mix(uHill, hillHaze, mix(0.2, 0.85, smoothstep(0.1, 0.95, skyline.g)));
  hillColor = mix(hillColor, hillHaze, smoothstep(0.0, ridge + 1e-3, elevation) * 0.3);
  reflected = mix(reflected, hillColor, hill);
  float near = reflectedOccluder(vWorld, r);
  reflected = mix(reflected, uSilhouette, near);

  // A distant cabin's lights: slope-space Beckmann glints stretch into wavering columns.
  vec3 glints = vec3(0.0);
  vec2 meanSlope = -n.xz / n.y;
  for (int i = 0; i < 2; i++) {
    vec3 L = normalize(uFarLight[i] - vWorld);
    vec3 H = normalize(L + V);
    vec2 facet = H.xz / max(H.y, 1e-3);
    vec2 offset = facet - meanSlope;
    float D = exp(-dot(offset, offset) / (2.0 * variance)) / (6.2831853 * variance * pow(max(H.y, 0.05), 4.0));
    glints += uFarColor[i] * D * fresnel / max(4.0 * nv, 0.05) * (1.0 - hill) * (1.0 - near);
  }

  // Shallow water: the bed shows through, darkening with depth and grazing view.
  float transmit = exp(-max(depth, 0.0) * 9.0 / max(V.y, 0.12)) * nearShore;
  vec3 toFire = uFirePos - vWorld;
  float fireFall = 1.0 / (dot(toFire, toFire) + 1.0);
  vec3 toLamp = uLampPos - vWorld;
  float lampFall = 1.0 / (dot(toLamp, toLamp) + 0.6);
  vec3 warm = uFireColor * fireFall + uLampColor * lampFall;
  vec3 scatter = uScatter + warm * 0.025;

  // Foam: the swash edge, the drain lace behind it, rings around rocks and posts.
  float lace = texture(uSkyNoise, vec3(p * 0.62 + vec2(0.0, t * 0.012), t * 0.035)).r;
  float laceFine = texture(uSkyNoise, vec3(p * 1.7 - vec2(t * 0.01, 0.0), 0.7 + t * 0.05)).g;
  float bubbles = smoothstep(0.48, 0.66, lace * 0.6 + laceFine * 0.55);
  float edgeFoam = (1.0 - smoothstep(0.0, 0.007 + 0.006 * laceFine, depth)) * (0.35 + 0.65 * bubbles) * 0.8;
  float drain = (1.0 - smoothstep(0.0, 0.02, depth)) * smoothstep(0.55, 0.8, lace * 0.6 + laceFine * 0.55) * 0.5;
  float rockFoam = 0.0;
  for (int i = 0; i < ${MAX_WATER_ROCKS}; i++) {
    vec4 rock = uRocks[i];
    if (rock.z <= 0.0) continue;
    float dist = length(p - rock.xy) - rock.z;
    float pulse = 0.55 + 0.45 * sin(t * 1.3 + rock.w + dot(p, vec2(0.7, 2.3)));
    rockFoam = max(rockFoam, (1.0 - smoothstep(0.0, 0.05 + 0.12 * pulse * laceFine, dist)) * smoothstep(0.42, 0.7, lace * 0.5 + laceFine * 0.7) * (0.35 + 0.45 * pulse));
  }
  float foam = clamp(max(max(edgeFoam, drain) * nearShore, rockFoam), 0.0, 1.0) / (1.0 + footprint * 1.5);
  vec3 foamColor = coastSkyBase(vec3(0.0, 1.0, 0.0)) * 0.22 + coastSkyBase(normalize(vec3(uSkyGlowDir.x, 0.3, uSkyGlowDir.z))) * 0.12 + warm * 0.12;

  vec3 surface = fresnel * reflected + glints;
  vec3 body = (1.0 - fresnel) * (1.0 - transmit) * scatter;
  vec3 color = mix(surface + body, foamColor, foam);
  float alpha = mix(1.0 - (1.0 - fresnel) * transmit, 1.0, foam);
  gl_FragColor = vec4(color * wetEdge, alpha * wetEdge);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface CoastWaterOptions {
  sky: CoastSkyUniforms;
  skyline: THREE.DataTexture;
  fire: THREE.Vector3;
  lamp: THREE.Vector3;
  farLights: Array<{ position: THREE.Vector3; color: THREE.Vector3 }>;
  trees: THREE.Vector4[];
  rocks: THREE.Vector4[];
  deck: THREE.Box3;
}

/** Water grid: fine by the camp and the cove, geometric spacing toward the horizon. */
function waterGeometry() {
  const xs: number[] = [], zs: number[] = [];
  for (let x = -16; x <= 10.001; x += 0.4) xs.push(x);
  for (let x = 10.4, step = 0.5; x < 600; step *= 1.12, x += step) xs.push(x);
  for (let x = -16.4, step = 0.5; x > -600; step *= 1.12, x -= step) xs.unshift(x);
  for (let z = 1; z >= -14; z -= 0.3) zs.push(z);
  for (let z = -14.4, step = 0.4; z > -590; step *= 1.09, z -= step) zs.push(z);
  const positions: number[] = [], indices: number[] = [];
  for (const z of zs) for (const x of xs) positions.push(x, 0, z);
  const w = xs.length;
  for (let j = 0; j < zs.length - 1; j++) for (let i = 0; i < w - 1; i++) {
    const a = j * w + i;
    // Skip quads under the land (bed above the highest swash everywhere in the quad).
    const corners = [[xs[i], zs[j]], [xs[i + 1], zs[j]], [xs[i], zs[j + 1]], [xs[i + 1], zs[j + 1]]];
    if (corners.every(([x, z]) => shoreProfile(z - shoreZ(x)) > SEA_LEVEL + 0.12)) continue;
    // Rows run away from the camera (toward -z): this winding faces up.
    indices.push(a, a + 1, a + w, a + 1, a + w + 1, a + w);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function createCoastWater(o: CoastWaterOptions) {
  const pad = <T>(items: T[], count: number, empty: () => T) => { const out = items.slice(0, count); while (out.length < count) out.push(empty()); return out; };
  const uniforms = {
    ...o.sky,
    uTime: { value: 0 },
    uSkyline: { value: o.skyline },
    uHill: { value: new THREE.Vector3(0.008, 0.007, 0.014) },
    uScatter: { value: new THREE.Vector3(0.0016, 0.0022, 0.004) },
    uFirePos: { value: o.fire.clone() },
    uFireColor: { value: new THREE.Vector3(1.6, 0.62, 0.2) },
    uLampPos: { value: o.lamp.clone() },
    uLampColor: { value: new THREE.Vector3(0.35, 0.2, 0.08) },
    uFarLight: { value: pad(o.farLights.map((l) => l.position.clone()), 2, () => new THREE.Vector3(0, -100, 0)) },
    uFarColor: { value: pad(o.farLights.map((l) => l.color.clone()), 2, () => new THREE.Vector3()) },
    uTrees: { value: pad(o.trees, MAX_WATER_TREES, () => new THREE.Vector4()) },
    uRocks: { value: pad(o.rocks, MAX_WATER_ROCKS, () => new THREE.Vector4()) },
    uDeckMin: { value: o.deck.min.clone() },
    uDeckMax: { value: o.deck.max.clone() },
    uSilhouette: { value: new THREE.Vector3(0.004, 0.0035, 0.007) },
    // Wind-wave spectrum: directions (radians from shoreward), wavelengths (m) and steepness.
    uWaveAngle: { value: [-0.25, 0.45, -0.95, 1.2, 0.15, -0.6, 0.85, -1.4] },
    uWaveLength: { value: [7.0, 4.3, 2.8, 1.9, 1.3, 0.95, 0.7, 0.52] },
    uWaveSteep: { value: [0.01, 0.012, 0.014, 0.016, 0.018, 0.02, 0.02, 0.02] },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: WATER_VERTEX, fragmentShader: WATER_FRAGMENT,
    transparent: true, depthWrite: true,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
    blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
  });
  const mesh = new THREE.Mesh(waterGeometry(), material);
  mesh.name = 'Sea inlet: swell, ripples and lapping shore';
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  return { mesh, uniforms, material, update(time: number, fireFlicker: number) { uniforms.uTime.value = time; uniforms.uFireColor.value.set(1.6, 0.62, 0.2).multiplyScalar(fireFlicker); } };
}

/**
 * Highest elevation (by azimuth, from a point on the water) of the given
 * geometries, plus normalised distance, for reflecting distant land.
 */
export function buildSkyline(sources: Array<{ geometry: THREE.BufferGeometry; matrices?: THREE.Matrix4[]; top?: number }>, reference: THREE.Vector3, bins = 512) {
  const range = 1.6, maxElevation = 0.12;
  const elevations = new Float32Array(bins), distances = new Float32Array(bins).fill(1);
  const p = new THREE.Vector3();
  const consider = (x: number, y: number, z: number) => {
    const dx = x - reference.x, dz = z - reference.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 1) return;
    const bin = Math.round((Math.atan2(dx, -dz) / (range * 2) + 0.5) * (bins - 1));
    if (bin < 0 || bin >= bins) return;
    const elevation = Math.atan2(y - reference.y, distance);
    if (elevation > elevations[bin]) { elevations[bin] = elevation; distances[bin] = Math.min(1, distance / 450); }
  };
  for (const source of sources) {
    const position = source.geometry.attributes.position as THREE.BufferAttribute;
    if (source.matrices) {
      // Instanced trees: only the apex matters.
      for (const matrix of source.matrices) { p.set(0, source.top ?? 1, 0).applyMatrix4(matrix); consider(p.x, p.y, p.z); }
    } else {
      for (let i = 0; i < position.count; i++) consider(position.getX(i), position.getY(i), position.getZ(i));
    }
  }
  const data = new Uint8Array(bins * 4);
  for (let i = 0; i < bins; i++) {
    let e = 0, d = 0, w = 0;
    for (let k = -2; k <= 2; k++) {
      const j = THREE.MathUtils.clamp(i + k, 0, bins - 1), weight = 3 - Math.abs(k);
      e += elevations[j] * weight; d += distances[j] * weight; w += weight;
    }
    data[i * 4] = Math.round(THREE.MathUtils.clamp(e / w / maxElevation, 0, 1) * 255);
    data[i * 4 + 1] = Math.round(THREE.MathUtils.clamp(d / w, 0, 1) * 255);
    data[i * 4 + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, bins, 1, THREE.RGBAFormat);
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}
