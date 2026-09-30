import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { Raster } from './raster';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, coastDistance, farmland, fieldAt, headlandFall, noise2, terrainHeight, woodsDensity } from './world';

/** Tree images in the atlas: a broad round crown, a tall narrow one, a conifer, and a clump of several. */
const TILE = 256;
const KINDS = 4;

type Rand = () => number;

/** A crown heaped from leafy puffs, lit as spheres from the upper left, darker underneath. */
function drawCrown(image: Raster, x0: number, rand: Rand, puffs: { x: number; y: number; r: number }[], trunk: { x: number; top: number; width: number } | null) {
  if (trunk) image.stroke(x0 + trunk.x, TILE, x0 + trunk.x + (rand() - 0.5) * 6, trunk.top, trunk.width, trunk.width * 0.6, 43, 33, 24);
  const light = { x: -0.55, y: 0.6, z: 0.58 };
  const bottom = Math.max(...puffs.map((p) => p.y + p.r));
  const top = Math.min(...puffs.map((p) => p.y - p.r));
  // Back to front: lower puffs first, so the lit upper ones overlap them.
  const order = [...puffs].sort((a, b) => b.y - a.y);
  for (const puff of order) {
    const count = Math.round(puff.r * puff.r * 0.6);
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * puff.r;
      const px = puff.x + Math.cos(a) * r;
      const py = puff.y + Math.sin(a) * r;
      const nx = (px - puff.x) / puff.r;
      const ny = (puff.y - py) / puff.r;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const lambert = Math.max(0, nx * light.x + ny * light.y + nz * light.z);
      // The crown shades its own underside.
      const height = 1 - (py - top) / Math.max(1, bottom - top);
      const lit = Math.min(1, 0.12 + 0.75 * lambert * (0.45 + 0.55 * height) + 0.12 * rand());
      image.ellipse(x0 + px, py, 2.2 + 2.8 * rand(), 1.6 + 1.8 * rand(), rand() * Math.PI, 14 + lit * 118, 40 + lit * 150, 14 + lit * 50);
    }
  }
}

function drawAtlas() {
  const image = new Raster(TILE * KINDS, TILE);
  let s = 515;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const heap = (cx: number, cy: number, rx: number, ry: number, n: number, size: number) =>
    Array.from({ length: n }, () => {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      return { x: cx + Math.cos(a) * r * rx, y: cy + Math.sin(a) * r * ry, r: size * (0.7 + 0.5 * rand()) };
    });
  // A broad round crown on a short trunk.
  drawCrown(image, 0, rand, heap(128, 122, 60, 56, 16, 36), { x: 128, top: 180, width: 13 });
  // A tall narrow crown.
  drawCrown(image, TILE, rand, heap(128, 128, 26, 84, 14, 30), { x: 128, top: 215, width: 9 });
  // A conifer: tiers narrowing to a point.
  const tiers: { x: number; y: number; r: number }[] = [];
  for (let t = 0; t < 7; t++) {
    const y = 212 - t * 28;
    const half = 70 * (1 - t / 7.5);
    for (let k = 0; k < 4; k++) tiers.push({ x: 128 + (rand() - 0.5) * half * 1.4, y: y + (rand() - 0.5) * 10, r: 10 + half * 0.35 });
  }
  drawCrown(image, TILE * 2, rand, tiers, { x: 128, top: 60, width: 8 });
  // A clump of trees together, for the far woods.
  drawCrown(image, TILE * 3, rand, [...heap(70, 150, 34, 40, 8, 30), ...heap(168, 130, 40, 44, 10, 30), ...heap(118, 104, 38, 36, 8, 28)], null);
  return image.texture();
}

interface Tree {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  kind: number;
  tint: number;
}

/**
 * The trees on the hills: woods in the folds, copses, hedgerow trees along
 * the fields and a few standing alone, as camera-facing images of trees
 * swaying a little. Near ones are single trees; far off, where each would
 * be a speck, clumps stand in for several.
 */
export function createTrees(sunDirection: THREE.Vector3, count: number) {
  const texture = drawAtlas();
  let s = 777;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const trees: Tree[] = [];
  const yaw = CAMERA.yaw;
  for (let tries = 0; trees.length < count && tries < count * 40; tries++) {
    // Over the hills in view however far a drag turns it, fewer far away
    // (where clumps stand in for several trees).
    const bearing = yaw - 0.4 + rand() * 1.2;
    const distance = 160 + Math.pow(rand(), 1.6) * 4800;
    const x = CAMERA.x + Math.sin(bearing) * distance;
    const z = CAMERA.z - Math.cos(bearing) * distance;
    if (-coastDistance(x, z) < 70 || headlandFall(x, z) < 1) continue;
    let chance = woodsDensity(x, z);
    if (rand() >= chance) {
      // Hedgerows along the field borders, and now and then a tree on its own.
      const onBorder = fieldAt(x, z).border < 3.5;
      const alone = rand() < 0.004;
      if (!onBorder && !alone) continue;
      const h = terrainHeight(x, z);
      const slope = Math.hypot(terrainHeight(x + 4, z) - h, terrainHeight(x, z + 4) - h) / 4;
      const farm = farmland(x, z, slope);
      chance = onBorder ? 0.6 * farm * (noise2(x * 0.05, z * 0.05) > 0.35 ? 1 : 0.15) : farm;
      if (rand() >= chance) continue;
    }
    const far = Math.min(1, Math.max(0, (distance - 1400) / 2500));
    const kindRoll = rand();
    const kind = rand() < far * 0.8 ? 3 : kindRoll < 0.55 ? 0 : kindRoll < 0.75 ? 1 : kindRoll < 0.92 ? 2 : 3;
    const height = (10 + 7 * rand()) * (1 + 1.6 * far) * (kind === 1 ? 1.3 : 1);
    const aspect = kind === 0 ? 0.95 : kind === 1 ? 0.45 : kind === 2 ? 0.55 : 1.5;
    trees.push({ x, y: terrainHeight(x, z) - 0.6, z, width: height * aspect, height, kind, tint: rand() });
  }
  // Far to near is not needed (the images are cut out and write depth).
  const quad = new THREE.PlaneGeometry(1, 1);
  quad.translate(0, 0.5, 0);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = quad.index;
  geometry.setAttribute('position', quad.getAttribute('position'));
  geometry.setAttribute('uv', quad.getAttribute('uv'));
  const place = new Float32Array(trees.length * 4);
  const shape = new Float32Array(trees.length * 4);
  trees.forEach((tree, i) => {
    place.set([tree.x, tree.y, tree.z, tree.tint], i * 4);
    shape.set([tree.width, tree.height, tree.kind, rand()], i * 4);
  });
  geometry.setAttribute('aPlace', new THREE.InstancedBufferAttribute(place, 4));
  geometry.setAttribute('aShape', new THREE.InstancedBufferAttribute(shape, 4));
  geometry.instanceCount = trees.length;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      tTrees: { value: texture },
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      attribute vec4 aPlace;
      attribute vec4 aShape;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vTint;
      void main() {
        vec3 base = aPlace.xyz;
        vec3 toCamera = cameraPosition - base;
        toCamera.y = 0.0;
        toCamera = normalize(toCamera);
        vec3 right = vec3(toCamera.z, 0.0, -toCamera.x);
        vec3 p = base + right * position.x * aShape.x + vec3(0.0, position.y * aShape.y, 0.0);
        // The crowns sway a little in the wind.
        float sway = sin(uTime * 0.9 + base.x * 0.05 + base.z * 0.07 + aShape.w * 6.0) * 0.012 * aShape.y * position.y * position.y;
        p += right * sway;
        vUv = vec2((aShape.z + uv.x) / ${KINDS.toFixed(1)}, uv.y);
        vWorld = p;
        vTint = aPlace.w;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tTrees;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vTint;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 tree = texture2D(tTrees, vUv);
        if (tree.a < 0.5) discard;
        // Each tree a slightly different green: deeper, fresher, bluer.
        vec3 tint = mix(vec3(0.82, 0.95, 0.9), vec3(1.1, 1.06, 0.84), vTint);
        vec3 col = tree.rgb * tint;
        // The image carries its own light; the day adds the sky's blue in the shade.
        col = col * vec3(1.05, 1.03, 0.98) + vec3(0.01, 0.02, 0.05) * (1.0 - tree.g);
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return { mesh, material, texture };
}
