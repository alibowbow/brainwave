import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { cliffTop, headlandFall, SUN, terrainHeight, woodsDensity, WORLD_GLSL } from './world';

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
    // Towards the far edges of the grid the backdrop takes over, lit without cast shadows.
    const edge = Math.max(Math.min(1, Math.max(0, (x - GRID.east + 700) / 600)), Math.min(1, Math.max(0, (GRID.north + 1500 - z) / 1200)));
    visibility[i] = s * s * (3 - 2 * s) * (1 - edge) + edge;
  }
  return visibility;
}

/**
 * Which way to split a quad of the height grid in two: along the diagonal
 * whose ends are nearer in height (b–d, or else a–e), so the triangles run
 * along the slope's contours. Split the other way, a cliff or a ridge that
 * crosses the grid at a slant would be drawn as a row of teeth.
 */
function alongContour(positions: Float32Array, a: number, b: number, d: number, e: number) {
  return Math.abs(positions[b * 3 + 1] - positions[d * 3 + 1]) <= Math.abs(positions[a * 3 + 1] - positions[e * 3 + 1]);
}

/**
 * How high the cliffs rise by each point near a cliffed coast. The shader
 * paints the face up to just under it, so its top edge runs level even where
 * the triangles are too coarse to follow the cliff.
 */
function cliffTops(positions: Float32Array) {
  const tops = new Float32Array(positions.length / 3);
  for (let v = 0; v < tops.length; v++) tops[v] = cliffTop(positions[v * 3], positions[v * 3 + 2]);
  return new THREE.BufferAttribute(tops, 1);
}

/** The near land is a grid over this rectangle; beyond it the land goes on as the backdrop. */
const GRID = { west: -900, east: 3600, north: -9000, south: 140 };

export function buildTerrainGeometry(detail = 1) {
  const xs = axis(GRID.west, GRID.east, (x) => (1.2 + 0.03 * Math.abs(x - 40)) / detail);
  const zs = axis(GRID.north, GRID.south, (z) => (0.9 + 0.016 * Math.abs(z)) / detail);
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
      if (alongContour(positions, a, b, d, e)) indices.set([a, d, b, b, d, e], k);
      else indices.set([a, d, e, a, e, b], k);
      k += 6;
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
  geometry.setAttribute('aCliff', cliffTops(positions));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/**
 * The land beyond the grid, out to the horizon: far headlands and the
 * mountains inland. It is sampled round the viewer, by bearing (finely, so
 * the ridges stay sharp against the sky) and by distance (ever more coarsely),
 * starting where each bearing leaves the grid. Stretches under the sea are
 * left out; the land is lit without cast shadows.
 */
export function buildBackdropGeometry(detail = 1) {
  const bearings = axis(-0.75, 1.1, () => 0.0024 / detail);
  const rows = Math.round(80 * detail);
  const far = 34000;
  const columns = bearings.length;
  const positions = new Float32Array(columns * (rows + 1) * 3);
  let i = 0;
  for (let r = 0; r <= rows; r++) {
    for (const b of bearings) {
      const sin = Math.sin(b);
      const cos = Math.cos(b);
      // Where this bearing leaves the grid.
      const exit = Math.min(sin > 1e-6 ? GRID.east / sin : Infinity, sin < -1e-6 ? -GRID.west / -sin : Infinity, cos > 1e-6 ? -GRID.north / cos : Infinity);
      const near = Math.min(exit, far * 0.5);
      const distance = near * Math.pow(far / near, r / rows);
      const x = sin * distance;
      const z = -cos * distance;
      positions[i++] = x;
      positions[i++] = terrainHeight(x, z);
      positions[i++] = z;
    }
  }
  const indices: number[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 1; c++) {
      const a = r * columns + c;
      const b = a + 1;
      const d = a + columns;
      const e = d + 1;
      // Leave out what lies wholly under the sea.
      if (Math.max(positions[a * 3 + 1], positions[b * 3 + 1], positions[d * 3 + 1], positions[e * 3 + 1]) < -1) continue;
      if (alongContour(positions, a, b, d, e)) indices.push(a, b, d, b, e, d);
      else indices.push(a, b, e, a, e, d);
    }
  }
  const land = new Float32Array((positions.length / 3) * 2);
  for (let v = 0; v < positions.length / 3; v++) {
    if (positions[v * 3 + 1] < 0) continue;
    land[v * 2] = woodsDensity(positions[v * 3], positions[v * 3 + 2]);
    land[v * 2 + 1] = 1;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSun', new THREE.BufferAttribute(new Float32Array(positions.length / 3).fill(1), 1));
  geometry.setAttribute('aLand', new THREE.BufferAttribute(land, 2));
  geometry.setAttribute('aCliff', cliffTops(positions));
  geometry.setIndex(indices);
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
  // Far land fades into a blue a little deeper than the sky behind it, so
  // ridge after ridge stays readable against it, each paler than the last.
  // The air thins with height: high ground shows through more of it.
  float thin = exp(-max(0.0, 0.5 * (world.y + eye.y)) / 1500.0);
  float haze = (1.0 - exp(-dist / 6500.0 * uHaze * thin)) * 0.8 + (1.0 - exp(-dist / 60000.0)) * 0.12;
  vec3 air = mix(skyLight(vec3(dir.x, max(dir.y, 0.0) * 0.3, dir.z), 0.4), vec3(0.6, 0.7, 0.86), 0.55);
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
      attribute float aCliff;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vSun;
      varying vec2 vLand;
      varying float vCliff;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normal;
        vSun = aSun;
        vLand = aLand;
        vCliff = aCliff;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vSun;
      varying vec2 vLand;
      varying float vCliff;
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
        // Far away the land is painted by the stretch: forest and meadow,
        // alpine grass higher up, bare rock on the tops and crests.
        float farAway = smoothstep(2500.0, 6000.0, dist) * smoothstep(3.0, 20.0, height);
        if (farAway > 0.0) {
          float patchy = fbm3(p * 0.0012 + 7.0) + 0.15 * (vnoise(p * 0.006) - 0.5);
          vec3 far = mix(vec3(0.07, 0.18, 0.07), vec3(0.3, 0.44, 0.16), smoothstep(0.44, 0.6, patchy));
          far = mix(far, vec3(0.42, 0.5, 0.28), smoothstep(700.0, 1200.0, height) * 0.8);
          float bare = smoothstep(1100.0, 1700.0, height + 500.0 * (fbm3(p * 0.002) - 0.5)) + smoothstep(0.28, 0.5, steep) * smoothstep(350.0, 800.0, height);
          far = mix(far, mix(vec3(0.42, 0.4, 0.4), vec3(0.66, 0.64, 0.62), fbm3(p * 0.004)), min(1.0, bare));
          // The mountains, farther still, go blue: woods blue-green, rock blue-grey.
          far = mix(far, far * vec3(0.72, 0.86, 1.3) + vec3(0.0, 0.01, 0.04), smoothstep(9000.0, 20000.0, dist) * 0.7);
          col = mix(col, far, farAway);
        }
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
        // Cliffs along the headlands: pale rock streaked down the face, up
        // to a little under the cliff's top, then a cap of turf (painted to
        // the height the cliff rises to, since far off the land's triangles
        // are too coarse to follow its edge).
        float along = p.x + 0.7 * p.y;
        float rise = height / max(vCliff, 1.0);
        float edge = 0.9 + 0.1 * (vnoise(vec2(along * 0.005, 3.1)) - 0.5);
        float cliffFace = cliffiness(p.y) * smoothstep(15.0, 40.0, vCliff) * smoothstep(edge + 0.04, edge - 0.04, rise) * smoothstep(2.0, 10.0, height) * smoothstep(420.0, 280.0, inland) * smoothstep(1500.0, 3000.0, dist);
        // Gullies streak it; it is greyer and damp towards the foot.
        float gully = vnoise(vec2(along * 0.03, height * 0.008)) * 0.7 + vnoise(vec2(along * 0.11, height * 0.03)) * 0.3;
        vec3 chalk = mix(vec3(0.6, 0.58, 0.53), vec3(0.88, 0.86, 0.8), smoothstep(0.25, 0.75, gully));
        chalk = mix(chalk * vec3(0.78, 0.8, 0.8), chalk, smoothstep(0.04, 0.3, rise));
        col = mix(col, chalk, cliffFace);
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
  const backdrop = new THREE.Mesh(buildBackdropGeometry(detail), material);
  backdrop.frustumCulled = false;
  mesh.add(backdrop);
  return { mesh, material };
}
