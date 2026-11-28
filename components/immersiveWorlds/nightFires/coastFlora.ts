import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { noise3, ridged3 } from '../shared/render/noise';
import { seeded } from './scenery';

/*
 * Plants for the coast clearing (original):
 *  - tall pines with a bare, furrowed trunk and a high crown of tufted
 *    branch pads (needle-tuft cards drawn in code),
 *  - lavender clumps: grey-green leaves, wiry stems and flower spikes
 *    (alpha-to-coverage cards with florets drawn in code),
 *  - tussock grass.
 * Leaves, stems and spikes share one slow, unsynchronised wind so spikes stay
 * on their stems: per-vertex (stem base x, z, bend weight).
 */

const tau = Math.PI * 2;
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function rgbaTexture(width: number, height: number, data: Uint8Array) {
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Painter with anti-aliased discs into an RGBA buffer, keeping the most opaque sample. */
function painter(width: number, height: number) {
  const data = new Uint8Array(width * height * 4);
  const disc = (x: number, y: number, radius: number, color: THREE.Color, opacity = 1) => {
    const reach = Math.ceil(radius + 1.5);
    for (let dy = -reach; dy <= reach; dy++) for (let dx = -reach; dx <= reach; dx++) {
      const ix = Math.round(x) + dx, iy = Math.round(y) + dy;
      if (ix < 0 || iy < 0 || ix >= width || iy >= height) continue;
      const alpha = THREE.MathUtils.clamp(radius + 0.5 - Math.hypot(ix - x, iy - y), 0, 1) * opacity;
      if (alpha <= 0) continue;
      const i = (iy * width + ix) * 4;
      if (data[i + 3] / 255 >= alpha) continue;
      data[i] = Math.min(255, color.r * 255); data[i + 1] = Math.min(255, color.g * 255); data[i + 2] = Math.min(255, color.b * 255);
      data[i + 3] = Math.round(alpha * 255);
    }
  };
  const line = (x0: number, y0: number, x1: number, y1: number, w0: number, w1: number, color: (t: number) => THREE.Color) => {
    const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2);
    for (let k = 0; k <= steps; k++) { const t = k / steps; disc(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, w0 + (w1 - w0) * t, color(t)); }
  };
  return { data, disc, line };
}

/** A pine shoot: a twig with long paired needles swept forward and a brush at the tip. */
export function pineTuftTexture(seed: number, tint: THREE.ColorRepresentation = '#3c4f37') {
  const width = 256, height = 128;
  const random = seeded(seed);
  const { data, line } = painter(width, height);
  const base = new THREE.Color(tint);
  const twigs = [{ x0: 6, y0: 66, x1: 232, y1: 62 }];
  for (let k = 0; k < 3; k++) {
    const t = 0.3 + k * 0.2 + random() * 0.05, side = k % 2 ? 1 : -1;
    twigs.push({ x0: 6 + t * 226, y0: 66 - t * 4, x1: 6 + t * 226 + 46 + random() * 20, y1: 64 + side * (24 + random() * 10) });
  }
  for (const twig of twigs) {
    line(twig.x0, twig.y0, twig.x1, twig.y1, 1.5, 0.9, () => new THREE.Color('#3a2e22'));
    const along = Math.atan2(twig.y1 - twig.y0, twig.x1 - twig.x0);
    const length = Math.hypot(twig.x1 - twig.x0, twig.y1 - twig.y0);
    const count = Math.round(length / 1.6);
    for (let n = 0; n < count; n++) {
      const t = (n + random()) / count;
      const x = twig.x0 + (twig.x1 - twig.x0) * t, y = twig.y0 + (twig.y1 - twig.y0) * t;
      // Needles grow denser and longer toward the shoot's tip; older ones droop.
      if (random() > 0.35 + 0.65 * t) continue;
      for (const side of [-1, 1]) {
        const angle = along + side * (0.35 + random() * 0.55 - t * 0.15);
        const needle = (22 + random() * 16) * (0.7 + 0.45 * t);
        const shade = 0.7 + random() * 0.55;
        line(x, y, x + Math.cos(angle) * needle, y + Math.sin(angle) * needle, 0.8, 0.45, (s) => base.clone().multiplyScalar(shade).lerp(new THREE.Color('#7c8a5c'), s * 0.3));
      }
    }
    // Terminal brush.
    for (let k = 0; k < 14; k++) {
      const angle = along + (random() - 0.5) * 1.3, needle = 18 + random() * 14;
      line(twig.x1, twig.y1, twig.x1 + Math.cos(angle) * needle, twig.y1 + Math.sin(angle) * needle, 0.8, 0.45, () => base.clone().multiplyScalar(0.85 + random() * 0.4));
    }
  }
  return rgbaTexture(width, height, data);
}

export interface PineOptions { height: number; seed: number; crownStart?: number; lean?: [number, number]; girth?: number }

/** A tall pine in local space: bare furrowed trunk, high crown of upswept limbs ending in tuft pads. */
export function pineGeometry(o: PineOptions) {
  const random = seeded(o.seed * 131 + 7);
  const H = o.height, crown = o.crownStart ?? 0.55;
  const lean = o.lean ?? [(random() - 0.5) * 0.09 * H, (random() - 0.5) * 0.06 * H];
  const axis = (t: number) => V(lean[0] * t * t + Math.sin(t * 7 + o.seed) * 0.006 * H * t, t * H, lean[1] * t * t + Math.cos(t * 5 + o.seed) * 0.005 * H * t);
  const wood: THREE.BufferGeometry[] = [];
  const tube = (points: THREE.Vector3[], r0: number, r1: number, sides: number, furrow = 0) => {
    const curve = new THREE.CatmullRomCurve3(points);
    const segments = Math.max(3, points.length * (furrow ? 3 : 2));
    const frames = curve.computeFrenetFrames(segments, false);
    const positions: number[] = [], indices: number[] = [];
    for (let j = 0; j <= segments; j++) {
      const t = j / segments, c = curve.getPointAt(t);
      const radius = THREE.MathUtils.lerp(r0, r1, t);
      for (let i = 0; i <= sides; i++) {
        const a = i / sides * tau;
        const n = frames.normals[j].clone().multiplyScalar(Math.cos(a)).addScaledVector(frames.binormals[j], Math.sin(a));
        const k = furrow ? 0.9 + furrow * ridged3(Math.cos(a) * 2 + o.seed, t * H * 0.8, Math.sin(a) * 2, 3) : 1;
        const p = c.clone().addScaledVector(n, radius * k);
        positions.push(p.x, p.y, p.z);
        if (j < segments && i < sides) { const q = j * (sides + 1) + i; indices.push(q, q + sides + 1, q + 1, q + 1, q + sides + 1, q + sides + 2); }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    wood.push(g.toNonIndexed()); g.dispose();
  };
  const r0 = H * 0.0165 * (o.girth ?? 1);
  const trunkPoints = Array.from({ length: 12 }, (_, k) => axis(k / 11 * 0.985));
  trunkPoints[0].y -= 0.2;
  tube(trunkPoints, r0 * 1.25, r0 * 0.12, 14, 0.22);

  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], indices: number[] = [];
  const crownCentre = axis((crown + 1) / 2);
  const card = (centre: THREE.Vector3, along: THREE.Vector3, across: THREE.Vector3, size: number, padCentre: THREE.Vector3, shade: number) => {
    const start = positions.length / 3;
    for (const [u, v] of [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]]) {
      const p = centre.clone().addScaledVector(along, u * size).addScaledVector(across, v * size * 0.5);
      positions.push(p.x, p.y, p.z);
      // Volumetric normal: out of the pad and the crown, lifted toward the sky.
      const n = p.clone().sub(padCentre).multiplyScalar(0.7).add(p.clone().sub(crownCentre).setY(0).normalize().multiplyScalar(0.6)).add(V(0, 0.9, 0)).normalize();
      normals.push(n.x, n.y, n.z);
      uvs.push(u + 0.5, v + 0.5);
      colors.push(shade, shade * (0.95 + random() * 0.08), shade * (0.88 + random() * 0.12));
    }
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
  };
  const pad = (centre: THREE.Vector3, outward: THREE.Vector3, size: number, count: number) => {
    for (let k = 0; k < count; k++) {
      const spread = V((random() - 0.5) * size * 1.3, (random() - 0.35) * size * 0.45, (random() - 0.5) * size * 1.3);
      const c = centre.clone().add(spread);
      const dir = outward.clone().multiplyScalar(0.6).add(V(random() - 0.5, 0.35 + random() * 0.5, random() - 0.5)).normalize();
      const side = new THREE.Vector3().crossVectors(dir, V(0, 1, 0)).normalize();
      const roll = (random() - 0.5) * 1.6;
      const across = side.clone().multiplyScalar(Math.cos(roll)).add(V(0, Math.sin(roll), 0)).normalize();
      card(c, dir, across, size * (0.75 + random() * 0.5), centre, 0.6 + random() * 0.5);
    }
  };
  const limbs = Math.round(12 + H * 0.55);
  for (let b = 0; b < limbs; b++) {
    const t = crown + (0.96 - crown) * (b + random() * 0.6) / limbs;
    const start = axis(t);
    const azimuth = b * 2.39996 + (random() - 0.5) * 0.7;
    const out = V(Math.cos(azimuth), 0, Math.sin(azimuth));
    const u = (t - crown) / (1 - crown);
    const length = H * (0.07 + 0.1 * random()) * (0.45 + Math.sin(Math.min(1, u * 1.1 + 0.15) * Math.PI) * 0.75);
    const rise = 0.15 + random() * 0.4 + u * 0.3;
    const mid = start.clone().addScaledVector(out, length * 0.5).add(V(0, length * (rise * 0.4 - 0.08), 0));
    const end = start.clone().addScaledVector(out, length).add(V(0, length * rise, 0));
    const radius = r0 * (0.32 - u * 0.18) * (0.8 + random() * 0.4);
    tube([start, mid, end], radius, radius * 0.35, 6);
    const padSize = 0.55 + length * 0.22;
    pad(end.clone().add(V(0, padSize * 0.15, 0)), out, padSize, 10 + Math.floor(random() * 5));
    pad(start.clone().lerp(end, 0.6).add(V(0, padSize * 0.2, 0)), out, padSize * 0.8, 5 + Math.floor(random() * 3));
    const subs = 1 + Math.floor(random() * 2.5);
    for (let s = 0; s < subs; s++) {
      const from = start.clone().lerp(end, 0.45 + random() * 0.35);
      const turn = (random() - 0.5) * 1.8;
      const subOut = out.clone().applyAxisAngle(V(0, 1, 0), turn);
      const subEnd = from.clone().addScaledVector(subOut, length * (0.3 + random() * 0.25)).add(V(0, length * (0.12 + random() * 0.2), 0));
      tube([from, from.clone().lerp(subEnd, 0.5).add(V(0, 0.05, 0)), subEnd], radius * 0.5, radius * 0.2, 5);
      pad(subEnd, subOut, padSize * 0.85, 7 + Math.floor(random() * 3));
    }
  }
  // Leader tuft.
  pad(axis(0.995), V(0, 1, 0), 0.5, 7);
  // A few dead stubs on the bare trunk.
  for (let k = 0; k < 6; k++) {
    const t = 0.18 + random() * (crown - 0.22), a = random() * tau;
    const s = axis(t), e = s.clone().add(V(Math.cos(a) * 0.35, -0.05, Math.sin(a) * 0.35));
    tube([s, s.clone().lerp(e, 0.5), e], r0 * 0.12, r0 * 0.04, 4);
  }
  const foliage = new THREE.BufferGeometry();
  foliage.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  foliage.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  foliage.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  foliage.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  foliage.setIndex(indices);
  const merged = mergeGeometries(wood);
  wood.forEach((g) => g.dispose());
  return { wood: merged, foliage };
}

/* ------------------------------------------------------------------------- */
/* Lavender and grass with one shared wind                                    */
/* ------------------------------------------------------------------------- */

const GLSL_PLANT_WIND = /* glsl */ `
attribute vec3 aWind;
uniform float uPlantTime;
vec3 plantWind(vec3 p) {
  vec2 base = aWind.xy;
  float bend = aWind.z * aWind.z;
  float t = uPlantTime;
  // A slow gust drifting across the clearing, plus each stem's own lazy sway.
  float gust = 0.55 + 0.45 * sin(t * 0.23 + base.x * 0.31 - base.y * 0.17) * sin(t * 0.11 + base.y * 0.23);
  float sway = sin(t * 0.9 + base.x * 3.7 + base.y * 2.3) * 0.6 + sin(t * 1.53 + base.x * 1.9 - base.y * 4.1) * 0.4;
  return vec3(0.6, 0.0, 0.25) * (sway * 0.6 + gust * 0.5) * bend * 0.035 + vec3(0.0, -abs(sway) * bend * 0.004, 0.0);
}
`;

function windMaterial(material: THREE.MeshStandardMaterial, time: { value: number }, key: string) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPlantTime = time;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${GLSL_PLANT_WIND}`)
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += plantWind(transformed);')
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\nobjectNormal = normalize(objectNormal * 0.35 + vec3(0.0, 1.0, 0.0));');
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|coast-plant-wind-v1|${key}`;
  return material;
}

/** A lavender spike: whorls of florets on a fine stalk, tapering to the tip. */
function lavenderSpikeTexture(seed: number) {
  const width = 64, height = 256;
  const random = seeded(seed);
  const { data, disc, line } = painter(width, height);
  // Row 0 is the bottom of the card (v = 0): stalk below, florets in the upper part.
  line(32, 0, 32, 250, 1.2, 0.7, () => new THREE.Color('#5d6650'));
  const floret = [new THREE.Color('#ae88cc'), new THREE.Color('#c29cdc'), new THREE.Color('#9c76c0'), new THREE.Color('#d0b0e8'), new THREE.Color('#b690d2')];
  for (let y = 70; y < 250; y += 10 + random() * 4) {
    const u = (y - 70) / 180;
    // Whorls swell a little above the base and taper to the tip; the lowest one stands apart.
    const radius = (3.5 + 8 * Math.sin(Math.min(1, 0.25 + u * 1.2) * Math.PI * 0.5)) * (1 - u * 0.55);
    const gap = u < 0.12 ? -8 : 0;
    for (let k = 0; k < 8; k++) {
      const a = k / 8 * tau + random();
      const x = 32 + Math.cos(a) * radius, yy = y + gap + Math.sin(a) * 2.2 + random() * 2;
      const c = floret[Math.floor(random() * floret.length)].clone().multiplyScalar(0.75 + 0.45 * (Math.sin(a) * 0.5 + 0.5));
      disc(x, yy, 2.8 + random() * 1.8 - u * 0.8, c);
    }
  }
  return rgbaTexture(width, height, data);
}

export interface PlantPlacement { x: number; z: number; scale?: number }

/** Lavender clumps: leaves and stems in one mesh, flower spike cards in another, same wind. */
export function createLavender(clumps: PlantPlacement[], ground: (x: number, z: number) => number, time: { value: number }, seed = 3) {
  const random = seeded(seed * 977 + 1);
  const stemPos: number[] = [], stemCol: number[] = [], stemWind: number[] = [], stemIdx: number[] = [];
  const spikePos: number[] = [], spikeUv: number[] = [], spikeNor: number[] = [], spikeCol: number[] = [], spikeWind: number[] = [], spikeIdx: number[] = [];
  const ribbon = (base: THREE.Vector3, lean: THREE.Vector3, height: number, width: number, segments: number, color: THREE.Color, tip: THREE.Color, anchor: THREE.Vector3, top: number) => {
    const start = stemPos.length / 3;
    const side = V(-lean.z, 0, lean.x).normalize().multiplyScalar(width);
    if (side.lengthSq() < 1e-8) side.set(width, 0, 0);
    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const c = base.clone().addScaledVector(lean, t * t).add(V(0, height * t, 0));
      const w = 1 - t * 0.7;
      for (const k of [-1, 1]) {
        stemPos.push(c.x + side.x * w * k, c.y, c.z + side.z * w * k);
        const col = color.clone().lerp(tip, t);
        stemCol.push(col.r, col.g, col.b);
        stemWind.push(anchor.x, anchor.z, (c.y - anchor.y) / top);
      }
      if (s < segments) { const a = start + s * 2; stemIdx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    return base.clone().addScaledVector(lean, 1).add(V(0, height, 0));
  };
  for (const clump of clumps) {
    const scale = clump.scale ?? 1;
    const y0 = ground(clump.x, clump.z);
    const anchor = V(clump.x, y0, clump.z);
    const top = 0.55 * scale;
    // Grey-green needle leaves at the base.
    for (let l = 0; l < 24; l++) {
      const a = random() * tau, r = random() * 0.12 * scale;
      const base = V(clump.x + Math.cos(a) * r, y0, clump.z + Math.sin(a) * r);
      const lean = V(Math.cos(a), 0, Math.sin(a)).multiplyScalar((0.05 + random() * 0.07) * scale);
      ribbon(base, lean, (0.12 + random() * 0.13) * scale, 0.008 * scale, 2, new THREE.Color('#5c6852'), new THREE.Color('#a6b096'), anchor, top);
    }
    const stems = 22 + Math.floor(random() * 14);
    for (let s = 0; s < stems; s++) {
      const a = random() * tau, r = Math.sqrt(random()) * 0.13 * scale;
      const base = V(clump.x + Math.cos(a) * r, y0, clump.z + Math.sin(a) * r);
      const lean = V(Math.cos(a), 0, Math.sin(a)).multiplyScalar((0.06 + random() * 0.16) * scale);
      const height = (0.26 + random() * 0.2) * scale;
      const tipPoint = ribbon(base, lean, height, 0.0026 * scale, 3, new THREE.Color('#56614a'), new THREE.Color('#7f8768'), anchor, top);
      // Spike: two crossed cards continuing the stem.
      const dir = V(lean.x * 2 / Math.max(height, 1e-3), 1, lean.z * 2 / Math.max(height, 1e-3)).normalize();
      const spikeHeight = (0.11 + random() * 0.07) * scale, spikeWidth = 0.056 * scale;
      const hue = 1.05 + random() * 0.35;
      for (let c = 0; c < 2; c++) {
        const ang = random() * Math.PI + c * Math.PI / 2;
        const across = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang)).projectOnPlane(dir).normalize().multiplyScalar(spikeWidth / 2);
        const start = spikePos.length / 3;
        const n = V(Math.cos(ang + Math.PI / 2), 0.6, Math.sin(ang + Math.PI / 2)).normalize();
        for (const [u, v] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
          const p = tipPoint.clone().addScaledVector(dir, v * spikeHeight - 0.01 * scale).addScaledVector(across, (u - 0.5) * 2);
          spikePos.push(p.x, p.y, p.z);
          spikeUv.push(u, v);
          spikeNor.push(n.x, n.y, n.z);
          spikeCol.push(hue, hue, hue);
          spikeWind.push(anchor.x, anchor.z, (p.y - y0) / top);
        }
        spikeIdx.push(start, start + 1, start + 2, start, start + 2, start + 3);
      }
    }
  }
  const stemGeometry = new THREE.BufferGeometry();
  stemGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stemPos, 3));
  stemGeometry.setAttribute('color', new THREE.Float32BufferAttribute(stemCol, 3));
  stemGeometry.setAttribute('aWind', new THREE.Float32BufferAttribute(stemWind, 3));
  stemGeometry.setIndex(stemIdx);
  stemGeometry.computeVertexNormals();
  const spikeGeometry = new THREE.BufferGeometry();
  spikeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(spikePos, 3));
  spikeGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(spikeUv, 2));
  spikeGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(spikeNor, 3));
  spikeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(spikeCol, 3));
  spikeGeometry.setAttribute('aWind', new THREE.Float32BufferAttribute(spikeWind, 3));
  spikeGeometry.setIndex(spikeIdx);
  const stemMesh = new THREE.Mesh(stemGeometry, windMaterial(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, side: THREE.DoubleSide }), time, 'lavender-stems'));
  stemMesh.name = 'Lavender leaves and stems';
  const spikeMesh = new THREE.Mesh(spikeGeometry, windMaterial(new THREE.MeshStandardMaterial({
    map: lavenderSpikeTexture(seed + 40), vertexColors: true, alphaTest: 0.4, alphaToCoverage: true, side: THREE.DoubleSide, roughness: 0.7,
  }), time, 'lavender-spikes'));
  spikeMesh.name = 'Lavender flower spikes';
  for (const m of [stemMesh, spikeMesh]) { m.receiveShadow = true; m.castShadow = false; }
  return [stemMesh, spikeMesh];
}

/** Tussock grass: bent, tapering blades in clumps. */
export function createGrass(clumps: PlantPlacement[], ground: (x: number, z: number) => number, time: { value: number }, seed = 9) {
  const random = seeded(seed * 613 + 5);
  const positions: number[] = [], colors: number[] = [], wind: number[] = [], indices: number[] = [];
  for (const clump of clumps) {
    const scale = clump.scale ?? 1;
    const y0 = ground(clump.x, clump.z);
    const blades = 10 + Math.floor(random() * 10);
    const top = 0.35 * scale;
    for (let b = 0; b < blades; b++) {
      const a = random() * tau, r = random() * 0.13 * scale;
      const x = clump.x + Math.cos(a) * r, z = clump.z + Math.sin(a) * r;
      const y = ground(x, z) + 0.003;
      const height = (0.08 + Math.pow(random(), 1.4) * 0.26) * scale;
      const lean = (0.03 + random() * 0.12) * scale;
      const dx = Math.cos(a + (random() - 0.5)), dz = Math.sin(a + (random() - 0.5));
      const width = (0.006 + random() * 0.006) * scale;
      const color = new THREE.Color().setHSL(0.16 + random() * 0.08, 0.2 + random() * 0.2, 0.22 + random() * 0.12);
      const start = positions.length / 3;
      for (let s = 0; s <= 4; s++) {
        const t = s / 4;
        const cx = x + dx * lean * t * t, cz = z + dz * lean * t * t, cy = y + height * (t - 0.15 * t * t);
        const w = width * Math.pow(1 - t, 0.8) + 0.0004;
        for (const k of [-1, 1]) {
          positions.push(cx - dz * w * k, cy, cz + dx * w * k);
          colors.push(color.r * (0.65 + 0.5 * t), color.g * (0.65 + 0.5 * t), color.b * (0.7 + 0.4 * t));
          wind.push(clump.x, clump.z, (cy - y0) / top);
        }
        if (s < 4) { const q = start + s * 2; indices.push(q, q + 2, q + 1, q + 1, q + 2, q + 3); }
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('aWind', new THREE.Float32BufferAttribute(wind, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const grass = new THREE.Mesh(geometry, windMaterial(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88, side: THREE.DoubleSide }), time, 'coast-grass'));
  grass.name = 'Tussock grass';
  grass.receiveShadow = true;
  return grass;
}

/** Scatter helper: points inside a box, rejected by a predicate. */
export function scatter(count: number, seed: number, box: [number, number, number, number], accept: (x: number, z: number) => boolean, scale: [number, number] = [0.8, 1.2]) {
  const random = seeded(seed);
  const out: PlantPlacement[] = [];
  for (let attempt = 0; attempt < count * 30 && out.length < count; attempt++) {
    const x = box[0] + random() * (box[1] - box[0]), z = box[2] + random() * (box[3] - box[2]);
    if (!accept(x, z)) continue;
    out.push({ x, z, scale: scale[0] + random() * (scale[1] - scale[0]) * (0.7 + 0.3 * noise3(x * 0.4, z * 0.4, seed)) });
  }
  return out;
}
