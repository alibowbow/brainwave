import * as THREE from 'three';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { Raster } from './raster';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, coastDistance, farmland, fieldAt, headlandFall, noise2, terrainHeight, woodsDensity } from './world';

/**
 * Tree images in the atlas: two broad round crowns, a poplar, a slender open
 * tree, a spruce, a cypress, and two clumps of several trees for the far woods.
 */
const TILE = 256;
const KINDS = 8;
const BROAD = [0, 1];
const TALL = [2, 3];
const CONIFER = [4, 5];
const CLUMP = [6, 7];
/** Width of each kind of tree for its height. */
const ASPECT = [0.95, 0.9, 0.42, 0.52, 0.58, 0.32, 1.5, 1.6];

type Rand = () => number;
type Colour = [number, number, number];

interface Cluster {
  x: number;
  y: number;
  r: number;
}

interface Limb {
  from: [number, number];
  to: [number, number];
  width: number;
}

interface CrownStyle {
  /** Leaves in shade and in the sun (0..255). */
  shade: Colour;
  sun: Colour;
  /** How much each cluster's own roundness shows against the crown as a whole. */
  lumpy: number;
  /** Gaps where the sky shows through. */
  holes: number;
  /** Size of a leaf dab, in pixels. */
  leaf: number;
  bark?: Colour;
}

/** Leaf clusters heaped in an ellipse. */
function heap(rand: Rand, cx: number, cy: number, rx: number, ry: number, n: number, size: number): Cluster[] {
  return Array.from({ length: n }, () => {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    return { x: cx + Math.cos(a) * r * rx, y: cy + Math.sin(a) * r * ry, r: size * (0.7 + 0.5 * rand()) };
  });
}

/**
 * A crown painted leaf by leaf: clusters of small dabs with ragged edges,
 * lit as one mass from the upper left (with a little of each cluster's own
 * roundness), in shadow deep inside and underneath, with a few gaps where the
 * sky shows through. The trunk and limbs go down first and show in the gaps.
 */
function paintCrown(image: Raster, x0: number, rand: Rand, clusters: Cluster[], style: CrownStyle, limbs: Limb[]) {
  const bark = style.bark ?? [46, 36, 27];
  for (const limb of limbs) image.stroke(x0 + limb.from[0], limb.from[1], x0 + limb.to[0], limb.to[1], limb.width, limb.width * 0.45, ...bark);
  const left = Math.min(...clusters.map((c) => c.x - c.r));
  const right = Math.max(...clusters.map((c) => c.x + c.r));
  const top = Math.min(...clusters.map((c) => c.y - c.r));
  const bottom = Math.max(...clusters.map((c) => c.y + c.r));
  const cx = (left + right) / 2;
  const cy = (top + bottom) / 2;
  const rx = (right - left) / 2;
  const ry = (bottom - top) / 2;
  const light = { x: -0.55, y: 0.62, z: 0.56 };
  const holes = Array.from({ length: style.holes }, () => {
    const a = rand() * Math.PI * 2;
    const r = 0.3 + 0.5 * rand();
    return { x: cx + Math.cos(a) * r * rx * 0.75, y: cy + Math.sin(a) * r * ry * 0.75, r: 2 + 3 * rand() };
  });
  // Rear, lower clusters first, so the lit ones overlap them.
  for (const cluster of [...clusters].sort((a, b) => b.y - a.y)) {
    const hue = rand() - 0.5;
    const phase = rand() * Math.PI * 2;
    const lobes = 2 + Math.floor(rand() * 3);
    const count = Math.round(cluster.r * cluster.r * 0.48);
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2;
      // A ragged edge: the cluster's reach wobbles round it, and a few leaves stray past it.
      const reach = cluster.r * (0.84 + 0.12 * Math.sin(a * lobes + phase) + 0.07 * Math.sin(a * 7 + phase * 2));
      const r = Math.pow(rand(), 0.55) * reach * (rand() < 0.04 ? 1.2 : 1);
      const px = cluster.x + Math.cos(a) * r;
      const py = cluster.y + Math.sin(a) * r;
      let open = false;
      for (const h of holes) open ||= (px - h.x) ** 2 + (py - h.y) ** 2 < h.r * h.r;
      if (open) continue;
      const mx = (px - cx) / rx;
      const my = (cy - py) / ry;
      const mz = Math.sqrt(Math.max(0, 1 - mx * mx - my * my));
      const lx = (px - cluster.x) / cluster.r;
      const ly = (cluster.y - py) / cluster.r;
      const lz = Math.sqrt(Math.max(0, 1 - lx * lx - ly * ly));
      const nx = mx + (lx - mx) * style.lumpy;
      const ny = my + (ly - my) * style.lumpy;
      const nz = mz + (lz - mz) * style.lumpy;
      const length = Math.hypot(nx, ny, nz) || 1;
      const lambert = Math.max(0, (nx * light.x + ny * light.y + nz * light.z) / length);
      // Leaves at the heart of a cluster sit in its shadow.
      const outer = Math.min(1, r / reach);
      const lit = Math.min(1, Math.max(0, 0.05 + 0.92 * lambert * (0.5 + 0.5 * outer) + 0.16 * (rand() - 0.5)));
      image.ellipse(
        x0 + px, py,
        style.leaf * (0.7 + 0.6 * rand()), style.leaf * (0.45 + 0.35 * rand()), rand() * Math.PI,
        style.shade[0] + (style.sun[0] - style.shade[0]) * lit + hue * 18,
        style.shade[1] + (style.sun[1] - style.shade[1]) * lit + hue * 6,
        style.shade[2] + (style.sun[2] - style.shade[2]) * lit - hue * 10,
      );
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
  const broad: CrownStyle = { shade: [16, 40, 18], sun: [138, 178, 62], lumpy: 0.4, holes: 4, leaf: 2.6 };
  // Two broad round crowns on stout trunks, their limbs fanning up into them.
  paintCrown(image, 0, rand, heap(rand, 128, 112, 66, 52, 30, 30), broad, [
    { from: [128, 256], to: [126, 160], width: 13 },
    { from: [126, 196], to: [92, 136], width: 6 },
    { from: [127, 190], to: [162, 132], width: 6 },
    { from: [126, 176], to: [120, 104], width: 5 },
  ]);
  paintCrown(image, TILE, rand, [...heap(rand, 118, 110, 58, 60, 26, 28), ...heap(rand, 168, 136, 24, 24, 5, 22)], { ...broad, shade: [18, 44, 24], sun: [128, 172, 70], lumpy: 0.35, holes: 3, leaf: 2.4 }, [
    { from: [130, 256], to: [128, 152], width: 11 },
    { from: [128, 186], to: [98, 120], width: 5 },
    { from: [129, 180], to: [168, 126], width: 5 },
  ]);
  // A poplar: a tall narrow column.
  paintCrown(image, TILE * 2, rand, heap(rand, 128, 122, 20, 92, 34, 22), { shade: [18, 44, 20], sun: [124, 168, 58], lumpy: 0.3, holes: 1, leaf: 2 }, [
    { from: [128, 256], to: [128, 196], width: 8 },
  ]);
  // A slender, open tree with a pale trunk.
  paintCrown(image, TILE * 3, rand, heap(rand, 128, 108, 36, 72, 28, 19), { shade: [24, 50, 22], sun: [150, 186, 74], lumpy: 0.45, holes: 4, leaf: 2, bark: [168, 160, 146] }, [
    { from: [128, 256], to: [130, 112], width: 7 },
    { from: [129, 170], to: [104, 120], width: 3 },
    { from: [130, 150], to: [152, 104], width: 3 },
  ]);
  // A spruce: drooping tiers narrowing to a point, dark and blue-green.
  const tiers: Cluster[] = [];
  for (let t = 0; t < 9; t++) {
    const y = 232 - t * 22;
    const half = 78 * (1 - t / 9.5);
    for (let k = -2; k <= 2; k++) tiers.push({ x: 128 + k * half * 0.36 + (rand() - 0.5) * 6, y: y + Math.abs(k) * 5 + (rand() - 0.5) * 6, r: 9 + half * 0.2 });
  }
  tiers.push({ x: 128, y: 34, r: 9 });
  paintCrown(image, TILE * 4, rand, tiers, { shade: [12, 34, 26], sun: [72, 120, 76], lumpy: 0.25, holes: 0, leaf: 2.2 }, [
    { from: [128, 256], to: [128, 40], width: 7 },
  ]);
  // A cypress: a dark narrow flame.
  const flame: Cluster[] = [];
  for (let i = 0; i < 13; i++) {
    const y = 238 - i * 16.5;
    const half = 30 * Math.pow(1 - i / 13, 0.8) + 4;
    for (const side of [-1, 1]) flame.push({ x: 128 + side * half * 0.38 + (rand() - 0.5) * 4, y: y + (rand() - 0.5) * 6, r: half * 0.78 });
  }
  paintCrown(image, TILE * 5, rand, flame, { shade: [12, 32, 18], sun: [76, 114, 52], lumpy: 0.3, holes: 0, leaf: 1.8 }, [
    { from: [128, 256], to: [128, 216], width: 6 },
  ]);
  // Clumps of trees together, for the far woods.
  paintCrown(image, TILE * 6, rand, [...heap(rand, 70, 152, 30, 36, 12, 28), ...heap(rand, 166, 132, 36, 40, 15, 28), ...heap(rand, 118, 106, 34, 32, 12, 26)], { ...broad, holes: 2 }, []);
  paintCrown(image, TILE * 7, rand, [...heap(rand, 60, 162, 28, 30, 10, 26), ...heap(rand, 110, 130, 32, 36, 12, 28), ...heap(rand, 166, 144, 34, 34, 12, 27), ...heap(rand, 208, 168, 22, 26, 7, 22)], { ...broad, shade: [16, 42, 24], sun: [120, 166, 70], holes: 2 }, []);
  image.bleed();
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
    const pick = (kinds: number[]) => kinds[Math.floor(rand() * kinds.length)];
    const roll = rand();
    const kind = rand() < far * 0.8 ? pick(CLUMP) : roll < 0.5 ? pick(BROAD) : roll < 0.68 ? pick(TALL) : roll < 0.84 ? pick(CONIFER) : pick(CLUMP);
    const height = (8 + 10 * rand()) * (1 + 1.6 * far) * (kind === 2 ? 1.35 : kind === 5 ? 1.15 : 1);
    // Mirrored at random (a negative width), so no two neighbours look alike.
    const width = height * ASPECT[kind] * (0.9 + 0.2 * rand()) * (rand() < 0.5 ? -1 : 1);
    trees.push({ x, y: terrainHeight(x, z) - 0.6, z, width, height, kind, tint: rand() });
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
      varying float vShadow;
      ${NOISE_GLSL}
      ${CLOUD_SHADOW_GLSL}
      void main() {
        vec3 base = aPlace.xyz;
        vShadow = cloudShadow(base);
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
      varying float vShadow;
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
        // Under a cloud's shadow only the sky's cooler light is left.
        col *= mix(vec3(1.0), vec3(0.6, 0.66, 0.8), vShadow);
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return { mesh, material, texture };
}
