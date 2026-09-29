import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { SUN, terrainHeight, WORLD_GLSL } from './world';

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
 * How much of the low sun reaches each point of the land: marching from it
 * towards the sun over the height grid, the steepest rise on the way against
 * the sun's elevation, softened into a penumbra. Hills cast long evening
 * shadows over the valleys behind them.
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
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/** Lighting shared by the land, the grass and the pine: a low warm sun, a cool sky, haze with distance. */
export const LIGHT_GLSL = /* glsl */ `
uniform float uHaze;
vec3 lightGround(vec3 albedo, vec3 n, float sunlight) {
  float wrap = clamp((dot(n, uSunDir) + 0.15) / 1.15, 0.0, 1.0);
  vec3 sun = vec3(1.0, 0.76, 0.5) * 2.1 * wrap * sunlight;
  vec3 sky = vec3(0.56, 0.6, 0.76) * (0.42 + 0.2 * n.y);
  vec3 bounce = vec3(0.45, 0.33, 0.22) * 0.18;
  return albedo * (sun + sky + bounce);
}
vec3 addHaze(vec3 col, vec3 world, vec3 eye) {
  vec3 toEye = eye - world;
  float dist = length(toEye);
  vec3 dir = -toEye / dist;
  float haze = 1.0 - exp(-dist / 5200.0 * uHaze);
  vec3 air = mix(skyLight(vec3(dir.x, max(dir.y, 0.0) * 0.3, dir.z), 0.4), vec3(0.6, 0.62, 0.76), 0.5);
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
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vSun;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normal;
        vSun = aSun;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vSun;
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
        // Hills: green pasture and scrub, dry and golden where the sun has
        // baked them, dark woods in the folds.
        vec3 col = mix(vec3(0.34, 0.39, 0.17), vec3(0.52, 0.5, 0.24), smoothstep(0.3, 0.7, mid));
        float dry = smoothstep(0.45, 0.75, large + 0.25 * dot(n, uSunDir));
        col = mix(col, vec3(0.76, 0.62, 0.32), dry * 0.8);
        float woods = smoothstep(0.47, 0.6, fbm3(p * 0.02 + 5.0) + 0.16 * (vnoise(p * 0.12) - 0.5)) * smoothstep(40.0, 200.0, inland);
        col = mix(col, vec3(0.08, 0.13, 0.07), woods * 0.9);
        // Single trees and hedgerows dotted over the open slopes.
        float dots = smoothstep(0.66, 0.78, vnoise(p * 0.09 + 3.0)) * smoothstep(0.35, 0.55, fbm3(p * 0.006 + 1.0)) * smoothstep(60.0, 300.0, inland);
        col = mix(col, vec3(0.1, 0.15, 0.08), dots * 0.8);
        // The headland: olive grass over dark earth.
        float headland = smoothstep(8.0, 20.0, height) * smoothstep(-260.0, -150.0, p.y) * smoothstep(260.0, 160.0, p.x);
        col = mix(col, mix(vec3(0.22, 0.21, 0.1), vec3(0.36, 0.31, 0.15), mid), headland);
        // Sand, wet towards the water.
        float beach = smoothstep(52.0, 30.0, inland) * smoothstep(9.0, 4.5, height);
        col = mix(col, mix(vec3(0.96, 0.84, 0.64), vec3(0.88, 0.75, 0.56), fine), beach);
        col = mix(col, vec3(0.62, 0.55, 0.45), smoothstep(7.0, 0.5, inland) * smoothstep(2.5, 0.6, height));
        // Rock where the ground is steep.
        vec3 rock = mix(vec3(0.3, 0.26, 0.23), vec3(0.56, 0.47, 0.37), smoothstep(0.3, 0.8, fine + 0.3 * mid));
        col = mix(col, rock, smoothstep(0.36, 0.6, steep));
        col *= 0.9 + 0.2 * fine;
        col = lightGround(col, n, vSun);
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(buildTerrainGeometry(detail), material);
  mesh.frustumCulled = false;
  return { mesh, material };
}
