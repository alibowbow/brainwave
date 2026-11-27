import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { fbm3, ridged3 } from '../../shared/render/noise';
import { canvasTexture, lathe, taperedTube, KP_NOISE } from './kit';
import { bracketTexture, PALETTE } from './dancheong';

/*
 * Temple building blocks. Original procedural interpretations of a Korean
 * mountain-temple bell pavilion, main hall, stone pagoda, stone lantern,
 * red pines and the mountain ridges around the valley.
 */

export type Rand = () => number;
export const add = (parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], position: [number, number, number] = [0, 0, 0], cast = true) => {
  const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...position);
  mesh.castShadow = cast; mesh.receiveShadow = true; parent.add(mesh); return mesh;
};
export const rounded = (w: number, h: number, d: number, r = .03, s = 2) => new RoundedBoxGeometry(w, h, d, s, Math.min(r, w / 2.2, h / 2.2, d / 2.2));

/* ------------------------------------------------------------------ ridges */

/** Mountain ridge layers. The crest function is mirrored exactly in GLSL so the
 * god-ray pass can test sun occlusion against the real silhouettes. */
/** Toward the low dawn sun: right of the hall, rising out of the valley. */
export const SUN = new THREE.Vector3(.33, .245, -.91).normalize();
const SUN_VIEW = new THREE.Vector3(.8, 1.62, 4.8);
// Each ridge dips into a saddle just left of the sun's line of sight, so the
// disk rises out of a V of ridges and its right-hand flank breaks the rays.
const saddle = (z: number, f: number[], offset: number) => {
  const x = SUN_VIEW.x + SUN.x / -SUN.z * (SUN_VIEW.z - z) - offset;
  return [Math.PI / 2 - x * f[0], -Math.PI / 2 - x * f[1], Math.PI / 2 - x * f[2]];
};
export const RIDGES = [
  { z: -78, base: 10, amp: 16, f: [.031, .083, .19], color: '#2e4638' },
  { z: -112, base: 20, amp: 24, f: [.022, .061, .15], color: '#3a5149' },
  { z: -155, base: 30, amp: 28, f: [.017, .047, .121], color: '#4c6064' },
  { z: -210, base: 41, amp: 34, f: [.012, .035, .09], color: '#62737c' },
].map((r, i) => ({ ...r, p: saddle(r.z, r.f, [6, 8, 10, 14][i]) }));
export function crest(layer: number, x: number) {
  const r = RIDGES[layer];
  const a = 1 - Math.abs(Math.sin(x * r.f[0] + r.p[0]));
  const b = .5 + .5 * Math.sin(x * r.f[1] + r.p[1]);
  const c = 1 - Math.abs(Math.sin(x * r.f[2] + r.p[2]));
  return r.base + r.amp * (.58 * Math.pow(a, 1.6) + .3 * b + .12 * c);
}
export const CREST_GLSL = `
float ridgeCrest(int l, float x) {
  ${RIDGES.map((r, i) => `if (l == ${i}) { float a = 1.0 - abs(sin(x * ${r.f[0]} + ${r.p[0].toFixed(6)})); float b = 0.5 + 0.5 * sin(x * ${r.f[1]} + ${r.p[1].toFixed(6)}); float c = 1.0 - abs(sin(x * ${r.f[2]} + ${r.p[2].toFixed(6)})); return ${r.base.toFixed(1)} + ${r.amp.toFixed(1)} * (0.58 * pow(a, 1.6) + 0.3 * b + 0.12 * c); }`).join('\n  ')}
  return 0.0;
}
const float RIDGE_Z0 = ${RIDGES[0].z.toFixed(1)}; const float RIDGE_Z1 = ${RIDGES[1].z.toFixed(1)}; const float RIDGE_Z2 = ${RIDGES[2].z.toFixed(1)}; const float RIDGE_Z3 = ${RIDGES[3].z.toFixed(1)};
`;

export function mountains() {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vMtWorld;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvMtWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vMtWorld;\n${KP_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float crowns = bwNoise(vMtWorld * 0.55) * 0.6 + bwNoise(vMtWorld * 1.7) * 0.4;
diffuseColor.rgb *= 0.78 + 0.42 * crowns;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec3 g = vec3(bwNoise(vMtWorld * 0.55 + vec3(0.3, 0.0, 0.0)), bwNoise(vMtWorld * 0.55 + vec3(0.0, 0.3, 0.0)), bwNoise(vMtWorld * 0.55 + vec3(0.0, 0.0, 0.3))) - bwNoise(vMtWorld * 0.55);
  vec3 vg = (viewMatrix * vec4(g * 0.9, 0.0)).xyz;
  normal = normalize(normal - (vg - dot(vg, normal) * normal));
}`);
  };
  material.customProgramCacheKey = () => 'kp-mountain-v1';
  RIDGES.forEach((r, layer) => {
    const nx = 220, nz = 26, positions: number[] = [], colors: number[] = [], indices: number[] = [];
    const rock = new THREE.Color('#8a8f86'), forest = new THREE.Color(r.color), dark = forest.clone().multiplyScalar(.7);
    for (let iz = 0; iz <= nz; iz++) for (let ix = 0; ix <= nx; ix++) {
      const x = -330 + ix * 660 / nx, dz = -20 + iz * 70 / nz; // dz > 0 toward the viewer
      const c = crest(layer, x);
      const fall = dz > 0 ? Math.exp(-Math.pow(dz / (18 + layer * 6), 2) * 1.3) : Math.exp(-Math.pow(dz / 26, 2));
      const gully = (ridged3(x * .03 + layer * 7, dz * .05, layer, 4) - .45) * r.amp * .22;
      const y = (c + 4) * fall - 4 + gully * fall * (1 - fall) * 2 + fbm3(x * .08, dz * .08, layer * 3, 3) * 1.4;
      positions.push(x, y, r.z + dz);
      const t = THREE.MathUtils.clamp((y - c * .7) / (c * .4), 0, 1);
      const col = dark.clone().lerp(forest, .5 + .5 * fbm3(x * .05, dz * .05, layer, 2)).lerp(rock, t * .08);
      colors.push(col.r, col.g, col.b);
      if (ix < nx && iz < nz) { const a = iz * (nx + 1) + ix; indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2); }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices); geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, material); mesh.receiveShadow = false; mesh.castShadow = false;
    group.add(mesh);
  });
  return group;
}

/* ---------------------------------------------------------------- brackets */

/** Side profile of a wing bracket arm (익공): long body, upturned beak-like tip. */
export function bracketProfile(length: number, height: number) {
  const s = new THREE.Shape();
  const L = length, Hh = height;
  s.moveTo(-L * .42, 0);
  s.lineTo(L * .2, 0);
  s.bezierCurveTo(L * .32, 0, L * .36, Hh * .3, L * .42, Hh * .62);
  s.bezierCurveTo(L * .47, Hh * .9, L * .55, Hh * 1.25, L * .6, Hh * 1.42);
  s.bezierCurveTo(L * .56, Hh * 1.42, L * .5, Hh * 1.25, L * .45, Hh * 1.05);
  s.lineTo(L * .38, Hh);
  s.lineTo(-L * .38, Hh);
  s.bezierCurveTo(-L * .44, Hh, -L * .46, Hh * .82, -L * .44, Hh * .68);
  s.bezierCurveTo(-L * .5, Hh * .66, -L * .5, Hh * .3, -L * .45, Hh * .26);
  s.bezierCurveTo(-L * .48, Hh * .12, -L * .46, 0, -L * .42, 0);
  return s;
}

export function bracketArm(length: number, height: number, thickness: number, material: THREE.Material | THREE.Material[]) {
  const shape = bracketProfile(length, height);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelThickness: .012, bevelSize: .01, bevelSegments: 2, curveSegments: 10 });
  geometry.translate(0, 0, -thickness / 2);
  // Cap UVs are shape coordinates: normalise to the unit profile the painting was drawn for.
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / length, uv.getY(i) / height);
  return new THREE.Mesh(geometry, material);
}

export function bracketMaterials() {
  const shape = bracketProfile(1, 1);
  const points = shape.getPoints(24);
  const bounds = new THREE.Box2().setFromPoints(points);
  const caps = new THREE.MeshStandardMaterial({ map: bracketTexture(points, bounds, .36), roughness: .8 });
  const sides = new THREE.MeshStandardMaterial({ color: PALETTE.noerok, roughness: .82 });
  return { caps, sides, bounds };
}

/* ------------------------------------------------------------------ pines */

export interface PineOutput { pads: THREE.Matrix4[]; padColors: THREE.Color[]; crowns: THREE.Vector4[] }

/** Korean red pine: crooked lofted trunk, layered branches and flat needle pads. */
export function pine(parent: THREE.Object3D, bark: THREE.Material, rand: Rand, base: THREE.Vector3, height: number, lean: number, out: PineOutput, detail = 1) {
  const pts: THREE.Vector3[] = [];
  const dir = rand() * Math.PI * 2;
  for (let i = 0; i <= 5; i++) {
    const t = i / 5;
    const bend = Math.sin(t * 2.4 + rand()) * .5 + lean * t * t;
    pts.push(new THREE.Vector3(base.x + Math.cos(dir) * bend + (rand() - .5) * .3 * t, base.y + t * height, base.z + Math.sin(dir) * bend * .6 + (rand() - .5) * .3 * t));
  }
  const r0 = .1 + height * .022;
  add(parent, taperedTube(pts, t => r0 * (1 - .72 * t) * (1 + .55 * Math.exp(-t * 30)), Math.round(18 * detail), Math.max(6, Math.round(10 * detail)),
    (p, t, a) => 1 + .06 * Math.sin(a * 5 + p.y * 3) * (1 - t)), bark);
  const curve = new THREE.CatmullRomCurve3(pts);
  const crownCentre = curve.getPoint(.82);
  out.crowns.push(new THREE.Vector4(crownCentre.x, crownCentre.y, crownCentre.z, height * .32));
  const branches = 6 + Math.floor(rand() * 4);
  for (let b = 0; b < branches; b++) {
    const t = .42 + b / branches * .55;
    const start = curve.getPoint(t);
    const a = b * 2.39 + rand() * .6;
    const reach = height * (.33 - t * .17) * (.8 + rand() * .4);
    const end = start.clone().add(new THREE.Vector3(Math.cos(a) * reach, reach * (.18 + rand() * .25), Math.sin(a) * reach));
    const mid = start.clone().lerp(end, .5).add(new THREE.Vector3(0, -reach * .12, 0));
    add(parent, taperedTube([start, mid, end], tt => r0 * .32 * (1 - tt * .7), Math.round(8 * detail), 5), bark);
    for (const k of [.55, 1]) pad(start.clone().lerp(end, k).add(new THREE.Vector3(0, .25, 0)), (k === 1 ? 1.25 : .85) * (1.1 - t * .3) * height / 11, rand, out);
  }
  pad(curve.getPoint(1).add(new THREE.Vector3(0, .1, 0)), 1.35 * height / 11, rand, out);
}

function pad(centre: THREE.Vector3, size: number, rand: Rand, out: PineOutput) {
  const o = new THREE.Object3D();
  const count = Math.round(16 + size * 10);
  const tint = .85 + rand() * .25;
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * size * 1.15;
    o.position.set(centre.x + Math.cos(a) * r, centre.y + (rand() - .35) * size * .45 - r * r * .08, centre.z + Math.sin(a) * r * .9);
    o.rotation.set(-Math.PI / 2 + (rand() - .5) * 1.1, rand() * Math.PI * 2, (rand() - .5) * .8, 'YXZ');
    const s = size * (.75 + rand() * .55);
    o.scale.set(s * 1.3, s, 1); o.updateMatrix();
    out.pads.push(o.matrix.clone());
    out.padColors.push(new THREE.Color().setHSL(.24 + rand() * .05, .32 + rand() * .15, (.2 + rand() * .1) * tint));
  }
}

export function needleTexture() {
  const texture = canvasTexture(256, 256, ctx => {
    ctx.clearRect(0, 0, 256, 256); ctx.lineCap = 'round';
    let s = 913; const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
    for (let cluster = 0; cluster < 26; cluster++) {
      const cx = 30 + r() * 196, cy = 30 + r() * 196, len = 22 + r() * 26;
      for (let n = 0; n < 34; n++) {
        const a = r() * Math.PI * 2, l = len * (.55 + r() * .5);
        const tone = 120 + r() * 110;
        ctx.strokeStyle = `rgba(${tone * .78 | 0},${tone | 0},${tone * .62 | 0},${.85 + r() * .15})`;
        ctx.lineWidth = .9 + r() * 1.2;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.quadraticCurveTo(cx + Math.cos(a) * l * .5 + (r() - .5) * 6, cy + Math.sin(a) * l * .5 + (r() - .5) * 6, cx + Math.cos(a) * l, cy + Math.sin(a) * l); ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(90,70,50,0.9)'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(cx - 6, cy + 4); ctx.lineTo(cx + 6, cy - 4); ctx.stroke();
    }
  });
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function barkMaterial() {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .92 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vBkWorld;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvBkWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vBkWorld;\n${KP_NOISE}
float barkHeight(vec3 p) {
  float plates = bwRidged(vec3(p.x * 6.0, p.y * 1.6, p.z * 6.0));
  return plates * 0.6 + bwNoise(p * 30.0) * 0.1;
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float bkPlates = bwRidged(vec3(vBkWorld.x * 6.0, vBkWorld.y * 1.6, vBkWorld.z * 6.0));
float bkUpper = smoothstep(2.5, 7.0, vBkWorld.y + bwNoise(vBkWorld * 0.7) * 1.5);
vec3 bkLow = mix(vec3(0.16, 0.13, 0.11), vec3(0.36, 0.31, 0.27), bkPlates);
vec3 bkHigh = mix(vec3(0.42, 0.17, 0.08), vec3(0.72, 0.38, 0.2), smoothstep(0.3, 0.8, bkPlates));
diffuseColor.rgb *= mix(bkLow, bkHigh, bkUpper) * (0.85 + 0.3 * bwNoise(vBkWorld * 3.0));`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.01;
  float h0 = barkHeight(vBkWorld);
  vec3 g = vec3(barkHeight(vBkWorld + vec3(e, 0, 0)) - h0, barkHeight(vBkWorld + vec3(0, e, 0)) - h0, barkHeight(vBkWorld + vec3(0, 0, e)) - h0) / e;
  vec3 vg = (viewMatrix * vec4(g * 0.012, 0.0)).xyz;
  normal = normalize(normal - (vg - dot(vg, normal) * normal));
}`);
  };
  material.customProgramCacheKey = () => 'kp-bark-v1';
  return material;
}

/* ------------------------------------------------------------ lattice door */

/** Carved flower-lattice door panel (꽃살문 style): diagonal lattice with
 * small rosettes at crossings, wood colour over a dark interior. */
export function latticeTexture() {
  return canvasTexture(256, 512, ctx => {
    ctx.fillStyle = '#2a211b'; ctx.fillRect(0, 0, 256, 512);
    ctx.fillStyle = '#7a6a55'; ctx.fillRect(0, 0, 256, 18); ctx.fillRect(0, 494, 256, 18); ctx.fillRect(0, 0, 14, 512); ctx.fillRect(242, 0, 14, 512);
    ctx.fillRect(0, 330, 256, 14);
    ctx.save(); ctx.beginPath(); ctx.rect(14, 18, 228, 312); ctx.clip();
    ctx.strokeStyle = '#a08a6c'; ctx.lineWidth = 5;
    for (let k = -512; k < 512; k += 32) {
      ctx.beginPath(); ctx.moveTo(k, 0); ctx.lineTo(k + 512, 512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(k + 512, 0); ctx.lineTo(k, 512); ctx.stroke();
    }
    for (let y = 18; y < 330; y += 32) for (let x = 14; x < 256; x += 32) {
      for (const [dx, dy] of [[0, 0], [16, 16]]) {
        ctx.fillStyle = '#b39d7c'; ctx.beginPath();
        for (let p = 0; p < 4; p++) { const a = p * Math.PI / 2; ctx.ellipse(x + dx + Math.cos(a) * 4, y + dy + Math.sin(a) * 4, 4, 2.6, a, 0, Math.PI * 2); }
        ctx.fill();
        ctx.fillStyle = '#c0533a'; ctx.beginPath(); ctx.arc(x + dx, y + dy, 2, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
    ctx.fillStyle = '#6b5c49'; ctx.fillRect(30, 360, 196, 120);
    ctx.strokeStyle = '#8c785e'; ctx.lineWidth = 4; ctx.strokeRect(40, 370, 176, 100);
  });
}

/* ------------------------------------------------------------------ pagoda */

/** Three-storey granite pagoda: two-tier base, body stones with corner pillars,
 * roof stones with stepped undersides and lifted corners, and a finial. */
export function pagoda(material: THREE.Material, parent: THREE.Object3D) {
  const group = new THREE.Group(); parent.add(group);
  let y = 0;
  const block = (w: number, h: number, r = .03) => { const m = add(group, rounded(w, h, w, r, 2), material, [0, y + h / 2, 0]); y += h; return m; };
  block(2.7, .32, .05); block(2.4, .55, .04); block(2.6, .16, .04);
  block(1.9, .5, .03); block(2.05, .14, .03);
  for (let storey = 0; storey < 3; storey++) {
    const w = .95 - storey * .12, h = storey === 0 ? .78 : .42 - storey * .02;
    block(w, h, .025);
    // Corner pillars carved on the body stone.
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(group, new THREE.BoxGeometry(.06, h * .96, .06), material, [sx * w / 2, y - h / 2, sz * w / 2]);
    // Stepped underside then a sloping roof stone with lifted corners.
    for (let k = 0; k < 4; k++) block(w + .16 + k * .13, .055, .01);
    const roofW = w + 1.05;
    const roof = new THREE.CylinderGeometry(roofW * .36, roofW * .72, .2, 4, 3);
    const p = roof.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const vx = p.getX(i), vy = p.getY(i), vz = p.getZ(i);
      const r = Math.hypot(vx, vz) / (roofW * .72);
      const corner = Math.pow(Math.abs(Math.cos(2 * Math.atan2(vz, vx))), 6);
      p.setY(i, vy + (vy < 0 ? corner * r * r * .09 : 0) - (1 - r) * .02);
    }
    roof.rotateY(Math.PI / 4); roof.computeVertexNormals();
    add(group, roof, material, [0, y + .1, 0]); y += .2;
    block(w * .55, .07, .015);
  }
  add(group, lathe([[0, 0], [.16, 0], [.17, .1], [.11, .16], [.1, .3], [.14, .36], [.12, .42], [.07, .46], [.06, .9], [.09, .95], [.05, 1.0], [.035, 1.3], [0, 1.34]], 12), material, [0, y, 0]);
  return group;
}

/** Octagonal granite lantern with a lotus base and a lit fire chamber. */
export function stoneLantern(material: THREE.Material, glow: THREE.Material, parent: THREE.Object3D) {
  const group = new THREE.Group(); parent.add(group);
  add(group, new THREE.CylinderGeometry(.62, .7, .2, 8), material, [0, .1, 0]);
  add(group, lathe([[.55, 0], [.58, .06], [.42, .2], [.24, .28], [0, .3]], 8), material, [0, .2, 0]);
  add(group, new THREE.CylinderGeometry(.13, .15, .95, 8), material, [0, .95, 0]);
  add(group, lathe([[0, 0], [.2, 0], [.42, .1], [.5, .22], [.46, .26], [0, .26]], 8), material, [0, 1.42, 0]);
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + Math.PI / 8;
    if (i % 2) add(group, new THREE.BoxGeometry(.16, .5, .1), material, [Math.cos(a) * .3, 1.93, Math.sin(a) * .3]).rotation.y = -a + Math.PI / 2;
  }
  add(group, new THREE.CylinderGeometry(.22, .22, .42, 8), glow, [0, 1.92, 0], false);
  const roof = new THREE.CylinderGeometry(.18, .7, .26, 8, 2);
  const p = roof.attributes.position;
  for (let i = 0; i < p.count; i++) { const r = Math.hypot(p.getX(i), p.getZ(i)) / .7; if (p.getY(i) < 0) p.setY(i, p.getY(i) + r * r * r * .07); }
  roof.computeVertexNormals();
  add(group, roof, material, [0, 2.3, 0]);
  add(group, lathe([[0, 0], [.12, 0], [.1, .08], [.14, .16], [.08, .24], [.03, .32], [0, .34]], 8), material, [0, 2.43, 0]);
  return group;
}

/** Lathe column with entasis (배흘림). */
export function columnGeometry(height: number, radius: number) {
  const profile: Array<[number, number]> = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const swell = 1 + .09 * Math.sin(Math.min(1, t / .75) * Math.PI) * (t < .75 ? 1 : 0) - .1 * t;
    profile.push([radius * swell, t * height]);
  }
  profile.unshift([0, 0]); profile.push([0, height]);
  return lathe(profile, 32);
}

