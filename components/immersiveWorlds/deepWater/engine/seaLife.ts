import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { noise3, seeded } from '../../shared/render/noise';
import { applyTranslucency } from '../../shared/render/translucentSurface';
import { applySeaShading, applySway } from './seaShading';

/*
 * Sessile reef life, all instanced and built in code: giant kelp, gorgonian
 * sea fans, tube sponges, brain and cup corals, sea whips, anemones, sea stars
 * and urchins. Flexible forms sway with the shared surge in the vertex
 * shader; nothing is rebuilt on the CPU per frame.
 */

type Placement = { position: THREE.Vector3; normal?: THREE.Vector3; scale: number | THREE.Vector3; spin?: number; tilt?: number; color?: THREE.ColorRepresentation };

const UP = new THREE.Vector3(0, 1, 0);

/** Fill an InstancedMesh from placements; each instance's +y follows its normal. */
export function instanced(geometry: THREE.BufferGeometry, material: THREE.Material, items: Placement[], name: string) {
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, items.length));
  mesh.count = items.length;
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), spin = new THREE.Quaternion(), s = new THREE.Vector3(), color = new THREE.Color();
  items.forEach((item, i) => {
    q.setFromUnitVectors(UP, (item.normal ?? UP).clone().normalize());
    spin.setFromAxisAngle(UP, item.spin ?? 0);
    q.multiply(spin);
    if (item.tilt) q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), item.tilt));
    if (typeof item.scale === 'number') s.setScalar(item.scale); else s.copy(item.scale);
    m.compose(item.position, q, s);
    mesh.setMatrixAt(i, m);
    if (item.color !== undefined) mesh.setColorAt(i, color.set(item.color));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.name = name;
  mesh.computeBoundingSphere();
  return mesh;
}

// --- Giant kelp ---------------------------------------------------------------

/** One kelp plant of unit height: a wandering stipe hung with ruffled, gas-buoyed blades. */
export function kelpGeometry(seed: number) {
  const random = seeded(seed);
  const pos: number[] = [], h: number[] = [], blade: number[] = [], idx: number[] = [];
  const lean = new THREE.Vector2(random() - .5, random() - .5).multiplyScalar(.06);
  const axis = (t: number) => new THREE.Vector3(Math.sin(t * 6 + seed) * .012 + lean.x * t * t, t, Math.cos(t * 5 + seed * 2) * .012 + lean.y * t * t);
  // Stipe: a thin four-sided cord.
  const segs = 40, r = .0028;
  for (let j = 0; j <= segs; j++) {
    const t = j / segs, c = axis(t);
    for (let k = 0; k < 4; k++) {
      const a = k / 4 * Math.PI * 2;
      pos.push(c.x + Math.cos(a) * r * (1 - t * .4), c.y, c.z + Math.sin(a) * r * (1 - t * .4)); h.push(t); blade.push(0);
    }
  }
  for (let j = 0; j < segs; j++) for (let k = 0; k < 4; k++) {
    const a = j * 4 + k, b = j * 4 + (k + 1) % 4;
    idx.push(a, a + 4, b, b, a + 4, b + 4);
  }
  // Blades spiral up the stipe, each a three-strip ribbon with a wavy margin.
  const blades = 34;
  const stream = random() * Math.PI * 2;
  for (let i = 0; i < blades; i++) {
    const t0 = .06 + (i / blades) * .9 + (random() - .5) * .012;
    const base = axis(t0);
    // Two-ranked blades on alternating sides, all streaming a little down-current.
    const around = stream + (i % 2 ? 1 : -1) * (1.1 + random() * .5);
    const out = new THREE.Vector3(Math.cos(around), 0, Math.sin(around));
    const length = (.1 + random() * .05) * (1 - t0 * .3);
    const width = .0085 + random() * .004;
    const lift = 1.18 + random() * .25; // blades lie close along the stipe
    const dir = out.clone().multiplyScalar(Math.cos(lift)).add(new THREE.Vector3(0, Math.sin(lift), 0)).normalize();
    const side = new THREE.Vector3().crossVectors(dir, UP).normalize();
    const start = pos.length / 3;
    const steps = 9;
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const droop = u * u * .5 * length;
      const centre = base.clone().addScaledVector(dir, u * length).addScaledVector(out, .004 + droop * .4).add(new THREE.Vector3(0, -droop * .25, 0));
      // Narrow stalk with a gas float, then a long wrinkled blade tapering to a point.
      const w = width * (u < .1 ? .35 + u * 3 : Math.pow(Math.sin(Math.PI * Math.min(1, (u - .1) / .9 * .82 + .18)), .9));
      const ruffle = Math.sin(u * 31 + i * 1.7) * .0028 * Math.min(1, u * 3);
      for (const across of [-1, 0, 1]) {
        const p = centre.clone().addScaledVector(side, across * w).add(new THREE.Vector3(0, across === 0 ? .0015 : ruffle * across, across === 0 ? 0 : ruffle));
        pos.push(p.x, p.y, p.z); h.push(t0 + u * length * .5); blade.push(u);
      }
    }
    for (let s = 0; s < steps; s++) for (let c = 0; c < 2; c++) {
      const a = start + s * 3 + c, b = a + 3;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('kelpH', new THREE.Float32BufferAttribute(h, 1));
  g.setAttribute('kelpBlade', new THREE.Float32BufferAttribute(blade, 1));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export function kelpMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .5, metalness: 0, side: THREE.DoubleSide });
  applyTranslucency(material, { key: 'sea-kelp', color: '#e2c25a', forward: 1.6, diffuse: 1.0, distortion: .2, power: 2.5, wrap: .6, wrapTint: '#c8b050' });
  applySway(material, {
    key: 'sea-kelp', time, amount: 1.25, flutter: .012,
    declarations: 'attribute float kelpH; attribute float kelpBlade;',
    bend: 'kelpH',
  });
  // Blades flutter about their stipe a little faster than the swell.
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', `transformed.xz += vec2(sin(uSwayTime * 1.3 + kelpH * 19.0 + position.x * 40.0), cos(uSwayTime * 1.1 + kelpH * 17.0 + position.z * 40.0)) * kelpBlade * 0.006;
#include <project_vertex>`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
diffuseColor.rgb *= vec3(0.62, 0.40, 0.11);`);
  };
  applySeaShading(material, { key: 'sea-kelp', caustics: .45, time });
  return material;
}

// --- Gorgonian sea fans -------------------------------------------------------

/** A lace fan drawn in code: radiating ribs joined by a fine reticulated mesh. */
export function fanTexture(seed: number, size = 256) {
  const data = new Uint8Array(size * size * 4);
  const random = seeded(seed);
  const ribs = Array.from({ length: 9 }, (_, i) => ({ a: -1.2 + i * .3 + (random() - .5) * .14, w: random() }));
  const hash = (x: number, y: number) => { const s = Math.sin(x * 127.1 + y * 311.7 + seed) * 43758.5453; return s - Math.floor(s); };
  for (let py = 0; py < size; py++) for (let px = 0; px < size; px++) {
    const u = (px + .5) / size * 2 - 1, v = (py + .5) / size;
    const r = Math.hypot(u * .95, v), a = Math.atan2(u, v + .02);
    // Ragged fan outline with a short trunk below.
    const edge = .97 + .05 * noise3(Math.cos(a) * 3 + seed, Math.sin(a) * 3, 1.7) - .1 * Math.abs(a) ** 2.2;
    const inFan = 1 - smoothstep(edge - .05, edge, r);
    // Reticulated mesh: cell borders in stretched polar space.
    const gx = a * 9.5 + noise3(u * 3, v * 3, seed) * .5, gy = r * 15;
    const ix = Math.floor(gx), iy = Math.floor(gy);
    let f1 = 9, f2 = 9;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const cx = ix + i + .15 + .7 * hash(ix + i, iy + j), cy = iy + j + .15 + .7 * hash(iy + j + 3, ix + i);
      const d = Math.hypot(gx - cx, (gy - cy) * .8);
      if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) f2 = d;
    }
    const net = 1 - smoothstep(.07, .16, f2 - f1);
    let rib = 0;
    for (const rb of ribs) {
      const curve = rb.a + Math.sin(r * 5 + rb.w * 6) * .05;
      const d = Math.abs(a - curve) * r;
      const width = .016 * (1.4 - r) + .004;
      rib = Math.max(rib, (1 - smoothstep(width * .5, width, d)) * smoothstep(.02, .1, r));
    }
    const trunk = (1 - smoothstep(.018, .03, Math.abs(u))) * (1 - smoothstep(.06, .14, v));
    const alpha = Math.min(1, Math.max(net * inFan * smoothstep(.06, .16, r), rib * inFan, trunk));
    const shade = .72 + .28 * noise3(u * 30, v * 30, seed) + .15 * rib;
    const k = (py * size + px) * 4;
    data[k] = data[k + 1] = data[k + 2] = Math.round(255 * Math.min(1, shade));
    data[k + 3] = Math.round(255 * alpha);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter; texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
function smoothstep(a: number, b: number, x: number) { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }

/** A slightly cupped card of unit height, base at the origin. */
export function fanGeometry() {
  const g = new THREE.PlaneGeometry(1, 1, 8, 10);
  g.translate(0, .5, 0);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); p.setZ(i, x * x * .22 + Math.sin(y * 3) * .03); }
  g.computeVertexNormals();
  return g;
}

export function fanMaterial(map: THREE.Texture, time: { value: number }) {
  // No alpha threshold: with multisampling, alpha becomes partial coverage, so a
  // distant fan's mip-averaged lace stays a translucent fan instead of vanishing.
  const material = new THREE.MeshStandardMaterial({ map, color: '#ffffff', roughness: .85, side: THREE.DoubleSide, alphaToCoverage: true });
  applyTranslucency(material, { key: 'sea-fan', color: '#ffb08a', forward: 1.1, diffuse: .8, power: 2.5, wrap: .5 });
  applySway(material, { key: 'sea-fan', time, amount: .32, flutter: .02, bend: 'position.y' });
  applySeaShading(material, { key: 'sea-fan', caustics: .5, time });
  return material;
}

// --- Sponges, corals and other encrusting life ---------------------------------

export function tubeSpongeGeometry(seed: number) {
  const random = seeded(seed);
  const p = [[.15, 0], [.19, .18], [.21, .43], [.27, .83], [.3, 1.0], [.29, 1.06], [.24, 1.05], [.22, .93], [.19, .66], [.12, .5]].map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(p, 16);
  const a = g.getAttribute('position');
  for (let i = 0; i < a.count; i++) { const y = a.getY(i); const n = 1 + Math.sin(Math.atan2(a.getX(i), a.getZ(i)) * 7 + seed) * .05 + random() * .03; a.setXYZ(i, a.getX(i) * n + y * .08, y, a.getZ(i) * n); }
  g.computeVertexNormals();
  return g;
}

export function spongeMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .93, metalness: 0, side: THREE.DoubleSide });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vSpongeP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvSpongeP = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vSpongeP;').replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 sp = vSpongeP * 38.0;
  float grain = sin(sp.x * 1.9 + sin(sp.z * .73)) * sin(sp.y * 2.2 + cos(sp.x * .39)) * sin(sp.z * 1.7 + sin(sp.y * .5));
  float pores = smoothstep(.45, .8, grain);
  // The open, dark lumen inside the tube.
  float inner = gl_FrontFacing ? 0.0 : 1.0;
  diffuseColor.rgb *= (.82 + .18 * sin(vSpongeP.y * 13.0)) * (1.0 - pores * .45) * mix(1.0, .25, inner);
}`);
  };
  material.customProgramCacheKey = () => 'sea-sponge-v2';
  applySeaShading(material, { key: 'sea-sponge', caustics: .6, time });
  return material;
}

/** Brain coral: a low dome whose meandering ridges are drawn in the shader. */
export function domeGeometry() {
  const g = new THREE.SphereGeometry(1, 30, 10, 0, Math.PI * 2, 0, Math.PI * .5);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i); const n = 1 + noise3(x * 1.8, y * 1.8, z * 1.8) * .1; p.setXYZ(i, x * n, y * n * .62 - .04, z * n); }
  g.computeVertexNormals();
  return g;
}

export function brainCoralMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .8, metalness: 0 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vBrainP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvBrainP = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vBrainP;\nfloat brainRidge;')
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 q = vBrainP * 7.0;
  float warp = sin(q.x * 1.3 + sin(q.z * 1.1)) + sin(q.z * 1.7 + sin(q.y * 2.3 + q.x)) ;
  brainRidge = abs(sin(q.x * 2.1 + q.z * 1.4 + warp * 1.6));
  float valley = 1.0 - smoothstep(0.15, 0.55, brainRidge);
  diffuseColor.rgb *= mix(vec3(1.0), vec3(0.45, 0.55, 0.35), valley) * (0.85 + 0.15 * sin(q.y * 3.0));
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float hgt = smoothstep(0.1, 0.7, brainRidge) * 0.02;
  vec3 dx = dFdx(-vViewPosition), dy = dFdy(-vViewPosition);
  vec3 r1 = cross(dy, normal), r2 = cross(normal, dx);
  float det = dot(dx, r1);
  vec3 grad = sign(det) * (dFdx(hgt) * r1 + dFdy(hgt) * r2);
  normal = normalize(abs(det) * normal - grad);
}`);
  };
  material.customProgramCacheKey = () => 'sea-brain-coral-v1';
  applySeaShading(material, { key: 'sea-brain', caustics: .7, time });
  return material;
}

/** Orange cup corals: a clump of short calcareous cups, each crowned by a polyp disc. */
export function cupCoralGeometry(seed: number) {
  const random = seeded(seed);
  const parts: THREE.BufferGeometry[] = [];
  // A low cushion of squat cups, packed together and splayed outward.
  for (let i = 0; i < 15; i++) {
    const a = random() * Math.PI * 2, d = Math.sqrt(random()) * .42;
    const h = .07 + random() * .1, r = .055 + random() * .03;
    const cup = new THREE.CylinderGeometry(r, r * .8, h, 8, 1, true);
    cup.translate(0, h / 2, 0);
    const crown = new THREE.CircleGeometry(r * 1.25, 10);
    crown.rotateX(-Math.PI / 2); crown.translate(0, h + .005, 0);
    const p = crown.attributes.position as THREE.BufferAttribute;
    for (let k = 1; k < p.count; k++) p.setY(k, p.getY(k) + Math.sin(k * 2.1) * .012);
    const piece = mergeGeometries([cup.toNonIndexed(), crown.toNonIndexed()].map(g => { g.deleteAttribute('uv'); return g; }))!;
    const crownFlag: number[] = [];
    const cupCount = cup.toNonIndexed().attributes.position.count;
    for (let k = 0; k < piece.attributes.position.count; k++) crownFlag.push(k >= cupCount ? 1 : 0);
    piece.setAttribute('polyp', new THREE.Float32BufferAttribute(crownFlag, 1));
    piece.rotateZ(-Math.cos(a) * d * 1.4 + (random() - .5) * .3); piece.rotateX(Math.sin(a) * d * 1.4 + (random() - .5) * .3);
    piece.translate(Math.cos(a) * d, 0, Math.sin(a) * d);
    parts.push(piece); cup.dispose(); crown.dispose();
  }
  const g = mergeGeometries(parts)!;
  parts.forEach(p => p.dispose());
  g.computeVertexNormals();
  return g;
}

export function cupCoralMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .7, metalness: 0, emissive: '#000000' });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float polyp;\nvarying float vPolyp;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvPolyp = polyp;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vPolyp;')
      .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= mix(vec3(0.78, 0.30, 0.08), vec3(1.0, 0.62, 0.16), vPolyp);')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vec3(0.16, 0.06, 0.01) * vPolyp;');
  };
  material.customProgramCacheKey = () => 'sea-cup-coral-v1';
  applySeaShading(material, { key: 'sea-cup', caustics: .3, time });
  return material;
}

/**
 * Encrusting plate: a thin, wavy shelf of unit radius that grows out from the
 * rock in tiers, its pale growing margin slightly upturned.
 */
export function plateGeometry(seed: number) {
  const random = seeded(seed);
  const rings = 7, around = 40, pos: number[] = [], edge: number[] = [], idx: number[] = [];
  const lobes = 3 + Math.floor(random() * 3), phase = random() * 6.28;
  for (let surface = 0; surface < 2; surface++) {
    const start = pos.length / 3;
    for (let j = 0; j <= rings; j++) for (let i = 0; i <= around; i++) {
      const t = j / rings, a = i / around * Math.PI * 2;
      const reach = .78 + .22 * Math.sin(a * lobes + phase) + .06 * Math.sin(a * 11 + seed);
      const r = t * reach;
      const wave = Math.sin(a * 7 + phase) * .07 * t * t + t * t * t * .1;
      pos.push(Math.cos(a) * r, wave - surface * (.035 * (1 - t * .6)), Math.sin(a) * r);
      edge.push(t);
    }
    for (let j = 0; j < rings; j++) for (let i = 0; i < around; i++) {
      const a = start + j * (around + 1) + i, b = a + around + 1;
      if (surface === 0) idx.push(a, b, a + 1, a + 1, b, b + 1); else idx.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('plateEdge', new THREE.Float32BufferAttribute(edge, 1));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export function plateMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .82, metalness: 0 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float plateEdge;\nvarying float vPlateEdge;\nvarying vec3 vPlateP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvPlateEdge = plateEdge; vPlateP = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vPlateEdge;\nvarying vec3 vPlateP;')
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  // Concentric growth lines and a pale, living margin.
  float growth = 0.9 + 0.1 * sin(length(vPlateP.xz) * 46.0);
  float pores = 0.9 + 0.1 * sin(vPlateP.x * 160.0) * sin(vPlateP.z * 160.0);
  diffuseColor.rgb *= growth * pores;
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.92, 0.86, 0.74), smoothstep(0.86, 1.0, vPlateEdge) * 0.7);
}`);
  };
  material.customProgramCacheKey = () => 'sea-plate-v1';
  applySeaShading(material, { key: 'sea-plate', caustics: .8, time });
  return material;
}

/** Sea whip: a slender tapering rod of unit height. */
export function whipGeometry() {
  const g = new THREE.CylinderGeometry(.008, .026, 1, 6, 12, false);
  g.translate(0, .5, 0);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const y = p.getY(i); p.setX(i, p.getX(i) + Math.sin(y * 2.6) * .16 * y); p.setZ(i, p.getZ(i) + (1 - Math.cos(y * 2.0)) * .08); }
  g.computeVertexNormals();
  return g;
}

export function whipMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .75 });
  applySway(material, { key: 'sea-whip', time, amount: .4, flutter: .03, bend: 'position.y' });
  applySeaShading(material, { key: 'sea-whip', caustics: .4, time });
  return material;
}

// --- Anemones -----------------------------------------------------------------

/** Column, oral disc and three whorls of tapering tentacles; `tentacle` runs 0 (base) to 1 (tip). */
export function anemoneGeometry(seed: number) {
  const random = seeded(seed);
  const pos: number[] = [], tent: number[] = [], idx: number[] = [];
  const push = (x: number, y: number, z: number, t: number) => { pos.push(x, y, z); tent.push(t); return pos.length / 3 - 1; };
  // Column: a short flared cylinder.
  const sides = 18;
  const profile = [[.32, -.05], [.3, .1], [.28, .26], [.33, .36], [.36, .4]];
  profile.forEach(([r, y]) => { for (let k = 0; k <= sides; k++) { const a = k / sides * Math.PI * 2; push(Math.cos(a) * r, y, Math.sin(a) * r, 0); } });
  for (let j = 0; j < profile.length - 1; j++) for (let k = 0; k < sides; k++) { const a = j * (sides + 1) + k, b = a + sides + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  // Oral disc.
  const centre = push(0, .38, 0, 0);
  const rimStart = pos.length / 3;
  for (let k = 0; k <= sides; k++) { const a = k / sides * Math.PI * 2; push(Math.cos(a) * .35, .4, Math.sin(a) * .35, 0); }
  for (let k = 0; k < sides; k++) idx.push(centre, rimStart + k + 1, rimStart + k);
  // Tentacles.
  const whorls: [number, number, number][] = [[10, .14, .34], [16, .24, .42], [20, .33, .48]];
  for (const [count, ring, length] of whorls) for (let i = 0; i < count; i++) {
    const a = (i + random() * .4) / count * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const len = length * (.85 + random() * .3);
    const segs = 6, s4 = 4, r0 = .048;
    const start = pos.length / 3;
    for (let j = 0; j <= segs; j++) {
      const t = j / segs;
      const out = ring + Math.sin(t * 1.4) * len * .55;
      const up = .4 + Math.sin(t * 1.25) * len * .9 - t * t * len * .25;
      const c = dir.clone().multiplyScalar(out).add(new THREE.Vector3(0, up, 0));
      const radius = r0 * (1 - t * .55);
      const side = new THREE.Vector3(-dir.z, 0, dir.x);
      for (let k = 0; k < s4; k++) {
        const b = k / s4 * Math.PI * 2;
        const off = side.clone().multiplyScalar(Math.cos(b) * radius).add(new THREE.Vector3(0, Math.sin(b) * radius, 0));
        push(c.x + off.x, c.y + off.y, c.z + off.z, t);
      }
    }
    const tip = push(...dir.clone().multiplyScalar(ring + Math.sin(1.4) * len * .55 + .01).add(new THREE.Vector3(0, .4 + Math.sin(1.25) * len * .9 - len * .25, 0)).toArray() as [number, number, number], 1);
    for (let j = 0; j < segs; j++) for (let k = 0; k < s4; k++) {
      const a2 = start + j * s4 + k, b2 = start + j * s4 + (k + 1) % s4;
      idx.push(a2, b2, a2 + s4, b2, b2 + s4, a2 + s4);
    }
    for (let k = 0; k < s4; k++) idx.push(start + segs * s4 + k, start + segs * s4 + (k + 1) % s4, tip);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('tentacle', new THREE.Float32BufferAttribute(tent, 1));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export function anemoneMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .55, metalness: 0, side: THREE.DoubleSide });
  applyTranslucency(material, { key: 'sea-anemone', color: '#ffd0d8', forward: .9, diffuse: .6, wrap: .7, wrapTint: '#ff9fb0' });
  applySway(material, { key: 'sea-anemone', time, amount: .22, flutter: .05, bend: 'tentacle', declarations: 'attribute float tentacle; varying float vTentacle;' });
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvTentacle = tentacle;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vTentacle;')
      .replace('#include <color_fragment>', `#include <color_fragment>
diffuseColor.rgb = mix(diffuseColor.rgb * mix(0.55, 1.0, step(0.001, vTentacle)), vec3(1.0, 0.92, 0.9), smoothstep(0.7, 1.0, vTentacle) * 0.75);`)
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * smoothstep(0.75, 1.0, vTentacle) * 0.22;');
  };
  applySeaShading(material, { key: 'sea-anemone', caustics: .5, time });
  return material;
}

// --- Sea stars and urchins --------------------------------------------------------

/** Five tapering arms with a domed back; slightly irregular so no two look stamped. */
export function seaStarGeometry(seed: number) {
  const random = seeded(seed);
  const pos: number[] = [], idx: number[] = [];
  const rings = 9, around = 110;
  const armLen = Array.from({ length: 5 }, () => .85 + random() * .25);
  const reach = (a: number) => {
    const k = ((a / (Math.PI * 2)) * 5 + 100) % 5;
    const arm = Math.floor(k + .5) % 5;
    const d = Math.abs(k - Math.round(k));
    return .26 + (armLen[arm] - .26) * Math.pow(Math.max(0, 1 - d * 2.15), 1.6);
  };
  pos.push(0, .13, 0);
  for (let j = 1; j <= rings; j++) for (let i = 0; i < around; i++) {
    const t = j / rings, a = i / around * Math.PI * 2;
    const r = reach(a) * t;
    const curl = Math.max(0, t - .7) ** 2 * (random() * .02 + .12);
    const height = .13 * Math.pow(1 - t * t, .55) * (1 - .35 * t) + curl;
    pos.push(Math.cos(a) * r, height + .004 * noise3(Math.cos(a) * r * 30, Math.sin(a) * r * 30, seed), Math.sin(a) * r);
  }
  for (let i = 0; i < around; i++) idx.push(0, 1 + (i + 1) % around, 1 + i);
  for (let j = 1; j < rings; j++) for (let i = 0; i < around; i++) {
    const a = 1 + (j - 1) * around + i, b = 1 + (j - 1) * around + (i + 1) % around;
    idx.push(a, b, a + around, b, b + around, a + around);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export function seaStarMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .75 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vStarP;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvStarP = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vStarP;\nfloat starBump;')
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec2 q = vStarP.xz * 22.0;
  vec2 cell = fract(q + 0.5 * floor(q.yx * 0.5)) - 0.5;
  starBump = 1.0 - smoothstep(0.12, 0.3, length(cell));
  float centre = 1.0 - smoothstep(0.0, 0.25, length(vStarP.xz));
  diffuseColor.rgb *= mix(vec3(0.95, 0.32, 0.12), vec3(1.0, 0.72, 0.45), starBump * 0.6) * (0.9 + 0.2 * centre);
}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float hgt = starBump * 0.008;
  vec3 dx = dFdx(-vViewPosition), dy = dFdy(-vViewPosition);
  vec3 r1 = cross(dy, normal), r2 = cross(normal, dx);
  float det = dot(dx, r1);
  normal = normalize(abs(det) * normal - sign(det) * (dFdx(hgt) * r1 + dFdy(hgt) * r2));
}`);
  };
  material.customProgramCacheKey = () => 'sea-star-v1';
  applySeaShading(material, { key: 'sea-star', caustics: .7, time });
  return material;
}

/** A round test bristling with long spines. */
export function urchinGeometry(seed: number) {
  const random = seeded(seed);
  const body = new THREE.IcosahedronGeometry(.5, 2);
  body.scale(1, .7, 1);
  const parts: THREE.BufferGeometry[] = [body.toNonIndexed()];
  const up = new THREE.Vector3();
  for (let i = 0; i < 90; i++) {
    const y = random() * 1.1 - .15, a = random() * Math.PI * 2, r = Math.sqrt(Math.max(0, 1 - y * y));
    up.set(Math.cos(a) * r, y, Math.sin(a) * r).normalize();
    const len = .7 + random() * .6;
    const spine = new THREE.ConeGeometry(.018, len, 4, 1, true);
    spine.translate(0, len / 2 + .3, 0);
    spine.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP, up));
    spine.scale(1, .7, 1);
    parts.push(spine.toNonIndexed()); spine.dispose();
  }
  parts.forEach(p => { p.deleteAttribute('uv'); p.deleteAttribute('normal'); });
  const g = mergeGeometries(parts)!;
  parts.forEach(p => p.dispose()); body.dispose();
  g.computeVertexNormals();
  return g;
}

export function urchinMaterial(time: { value: number }) {
  const material = new THREE.MeshStandardMaterial({ color: '#3a1838', roughness: .45, metalness: .05 });
  applySeaShading(material, { key: 'sea-urchin', caustics: .4, time });
  return material;
}
