import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { headlandFall, SUN, terrainHeight, woodsDensity, WORLD_GLSL } from './world';

/** Grid lines from `from` to `to`, `spacing(v)` apart: dense near the viewer, sparse far away. */
function axis(from: number, to: number, spacing: (v: number) => number) {
  const out = [from];
  let v = from;
  while (v < to) {
    v = Math.min(to, v + spacing(v));
    out.push(v);
  }
  return out;
}

/** Index of the grid line at or below v, through a lookup table of 1 m buckets. */
function locator(lines: number[]) {
  const first = lines[0];
  const last = lines[lines.length - 1];
  const table = new Int32Array(Math.ceil(last - first) + 1);
  let i = 0;
  for (let b = 0; b < table.length; b++) {
    while (i < lines.length - 2 && lines[i + 1] <= first + b) i++;
    table[b] = i;
  }
  return (v: number) => {
    let i = table[Math.min(table.length - 1, Math.max(0, Math.floor(v - first)))];
    while (i < lines.length - 2 && lines[i + 1] <= v) i++;
    return i;
  };
}

/**
 * How much of the sun reaches each point of the land: marching from it
 * towards the sun over the height grid, the steepest rise on the way against
 * the sun's elevation, softened into a penumbra. Hills shade the steep
 * valleys behind them.
 */
function sunVisibility(xs: number[], zs: number[], positions: Float32Array) {
  const columns = xs.length;
  const column = locator(xs);
  const row = locator(zs);
  const heightAt = (x: number, z: number) => {
    if (x <= xs[0] || x >= xs[columns - 1] || z <= zs[0] || z >= zs[zs.length - 1]) return -40;
    const c = column(x);
    const r = row(z);
    const fx = (x - xs[c]) / (xs[c + 1] - xs[c]);
    const fz = (z - zs[r]) / (zs[r + 1] - zs[r]);
    const a = positions[(r * columns + c) * 3 + 1];
    const b = positions[(r * columns + c + 1) * 3 + 1];
    const d = positions[((r + 1) * columns + c) * 3 + 1];
    const e = positions[((r + 1) * columns + c + 1) * 3 + 1];
    return (a + (b - a) * fx) * (1 - fz) + (d + (e - d) * fx) * fz;
  };
  const horizontal = Math.hypot(SUN.x, SUN.z);
  const sx = SUN.x / horizontal;
  const sz = SUN.z / horizontal;
  const rise = SUN.y / horizontal;
  const visibility = new Float32Array(positions.length / 3);
  for (let i = 0; i < visibility.length; i++) {
    const x = positions[i * 3];
    const h = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    if (h < -0.5) {
      visibility[i] = 1;
      continue;
    }
    let steepest = -1;
    for (let t = 6; t < 3000; t *= 1.3) {
      const slope = (heightAt(x + sx * t, z + sz * t) - h - 0.8) / t;
      if (slope > steepest) steepest = slope;
      if (steepest > rise + 0.04) break;
    }
    const s = Math.min(1, Math.max(0, (rise + 0.035 - steepest) / 0.07));
    visibility[i] = s * s * (3 - 2 * s);
  }
  return visibility;
}

export function buildTerrainGeometry(detail = 1) {
  const xs = axis(-900, 3600, (x) => (1.2 + 0.03 * Math.abs(x - 40)) / detail);
  const zs = axis(-9000, 140, (z) => (0.9 + 0.016 * Math.abs(z)) / detail);
  const columns = xs.length;
  const rows = zs.length;
  const positions = new Float32Array(columns * rows * 3);
  let i = 0;
  for (const z of zs) {
    for (const x of xs) {
      positions[i++] = x;
      positions[i++] = terrainHeight(x, z);
      positions[i++] = z;
    }
  }
  const indices = new Uint32Array((columns - 1) * (rows - 1) * 6);
  let k = 0;
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < columns - 1; c++) {
      const a = r * columns + c;
      const b = a + 1;
      const d = a + columns;
      const e = d + 1;
      indices[k++] = a;
      indices[k++] = d;
      indices[k++] = b;
      indices[k++] = b;
      indices[k++] = d;
      indices[k++] = e;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSun', new THREE.BufferAttribute(sunVisibility(xs, zs, positions), 1));
  // What grows where: the woods, and whether the ground is off the headland (so may be farmed).
  const land = new Float32Array((positions.length / 3) * 2);
  for (let v = 0; v < positions.length / 3; v++) {
    const x = positions[v * 3];
    const z = positions[v * 3 + 2];
    if (positions[v * 3 + 1] < 0) continue;
    land[v * 2] = woodsDensity(x, z);
    const fall = headlandFall(x, z);
    land[v * 2 + 1] = Math.min(1, Math.max(0, (fall - 0.9) / 0.4));
  }
  geometry.setAttribute('aLand', new THREE.BufferAttribute(land, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/** Lighting shared by the land, the grass and the pine: a high summer sun, a blue sky, haze with distance. */
export const LIGHT_GLSL = /* glsl */ `
uniform float uHaze;
vec3 lightGround(vec3 albedo, vec3 n, float sunlight) {
  float wrap = clamp((dot(n, uSunDir) + 0.2) / 1.2, 0.0, 1.0);
  vec3 sun = vec3(1.0, 0.96, 0.88) * 1.5 * wrap * sunlight;
  vec3 sky = vec3(0.52, 0.66, 0.92) * (0.36 + 0.24 * n.y);
  vec3 bounce = vec3(0.36, 0.38, 0.26) * 0.14;
  return albedo * (sun + sky + bounce);
}
vec3 addHaze(vec3 col, vec3 world, vec3 eye) {
  vec3 toEye = eye - world;
  float dist = length(toEye);
  vec3 dir = -toEye / dist;
  float haze = 1.0 - exp(-dist / 6000.0 * uHaze);
  vec3 air = mix(skyLight(vec3(dir.x, max(dir.y, 0.0) * 0.3, dir.z), 0.4), vec3(0.72, 0.82, 0.94), 0.5);
  return mix(col, air, haze);
}
`;

export function createTerrain(sunDirection: THREE.Vector3, detail = 1) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float aSun;
      attribute vec2 aLand;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vSun;
      varying vec2 vLand;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normal;
        vSun = aSun;
        vLand = aLand;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vSun;
      varying vec2 vLand;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${WORLD_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec3 n = normalize(vNormal);
        vec2 p = vWorld.xz;
        float inland = -coastDistance(p);
        float height = vWorld.y;
        float steep = 1.0 - n.y;
        float large = fbm3(p * 0.004);
        float mid = fbm3(p * 0.03);
        float fine = vnoise(p * 0.25);
        // Hills: summer pasture and scrub, hay-coloured where it has been
        // cut or the soil is thin, dark woods in the folds.
        vec3 col = mix(vec3(0.24, 0.4, 0.14), vec3(0.4, 0.52, 0.2), smoothstep(0.3, 0.7, mid));
        // Mottled: the pasture is never one green.
        col *= 0.84 + 0.3 * fbm3(p * 0.012 + 3.3) + 0.1 * (vnoise(p * 0.08) - 0.5);
        float dry = smoothstep(0.5, 0.8, large + 0.25 * dot(n, uSunDir));
        col = mix(col, vec3(0.62, 0.62, 0.3), dry * 0.45);
        // Fields on the gentler slopes, each its own crop or pasture, with
        // rows or mowing stripes across it and a hedgerow round it.
        float dist = length(vWorld - cameraPosition);
        float farm = vLand.y * smoothstep(120.0, 220.0, inland) * smoothstep(0.25, 0.12, steep) * (1.0 - smoothstep(0.15, 0.45, vLand.x));
        if (farm > 0.0) {
          vec3 field = fieldAt(p);
          float kind = field.x;
          vec3 crop = kind < 0.32 ? vec3(0.3, 0.47, 0.17) : kind < 0.56 ? vec3(0.21, 0.4, 0.13) : kind < 0.78 ? vec3(0.46, 0.56, 0.22) : kind < 0.9 ? vec3(0.72, 0.66, 0.36) : vec3(0.58, 0.62, 0.36);
          float angle = field.y * 3.1416;
          float rows = sin(dot(p, vec2(cos(angle), sin(angle))) * 0.9);
          crop *= 1.0 + 0.07 * rows * smoothstep(1400.0, 500.0, dist);
          crop *= 0.94 + 0.12 * vnoise(p * 0.05 + field.xy * 50.0);
          float hedge = 1.0 - smoothstep(2.0, 6.0, field.z);
          crop = mix(crop, vec3(0.07, 0.18, 0.06), hedge * 0.85);
          col = mix(col, crop, farm);
        }
        // The ground under the woods, dark and mossy (the trees stand on it).
        col = mix(col, vec3(0.05, 0.14, 0.05), smoothstep(0.1, 0.6, vLand.x) * 0.9);
        // The headland: olive grass over dark earth.
        float headland = smoothstep(8.0, 20.0, height) * smoothstep(-260.0, -150.0, p.y) * smoothstep(260.0, 160.0, p.x);
        col = mix(col, mix(vec3(0.15, 0.25, 0.08), vec3(0.25, 0.36, 0.12), mid), headland);
        // Sand, wet towards the water.
        float beach = smoothstep(52.0, 30.0, inland) * smoothstep(9.0, 4.5, height);
        col = mix(col, mix(vec3(0.97, 0.91, 0.76), vec3(0.9, 0.83, 0.67), fine), beach);
        float wet = smoothstep(7.0, 0.5, inland) * smoothstep(2.5, 0.6, height);
        col = mix(col, vec3(0.62, 0.6, 0.54), wet);
        // Rock where the ground is steep.
        vec3 rock = mix(vec3(0.32, 0.3, 0.28), vec3(0.6, 0.57, 0.51), smoothstep(0.3, 0.8, fine + 0.3 * mid));
        col = mix(col, rock, smoothstep(0.36, 0.6, steep));
        col *= 0.9 + 0.2 * fine;
        col = lightGround(col, n, vSun);
        // Wet sand gives back the sky.
        vec3 view = normalize(vWorld - cameraPosition);
        col = mix(col, skyLight(vec3(view.x, abs(view.y) + 0.15, view.z), 0.3), wet * 0.3);
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(buildTerrainGeometry(detail), material);
  mesh.frustumCulled = false;
  return { mesh, material };
}
