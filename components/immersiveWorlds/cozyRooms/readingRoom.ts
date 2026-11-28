import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clothSheet, cushion, withLocalFrame } from './geometry';
import { roundedBlock } from './roomTrim';
import { patchSurface } from '../shared/render/interiorSurface';
import { noise3 } from '../shared/render/noise';

/*
 * Furnishing for the hearth room as a reading room: a built-in bookcase of
 * many different books (cloth, leather and paper jackets, gilt bands, title
 * labels, a few lying in stacks or leaning), a leather wingback with a knitted
 * throw over its arm, a mantel clock and a basket of split logs.
 * Geometry is merged per material; books carry their own frame so one shader
 * draws each spine. Original procedural work.
 */

const BOOK_COLORS = ['#5a1f1b', '#2c3e33', '#1f2a40', '#7a5a2a', '#c9b88f', '#6b3a22', '#1c1b1a', '#46525a', '#6e2a35', '#3e4a2c', '#8c7a5a', '#a1866a', '#2f2a3c', '#9a4a2a', '#d4c8ae'];

/** Book spines from a local frame: gilt bands and a title label on the spine (+z), page edges on top. */
export function createBookMaterial(key: string) {
  const material = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.62, metalness: 0, vertexColors: true, clearcoat: 0.15, clearcoatRoughness: 0.5, sheen: 0.25, sheenColor: '#d0c0a0' });
  return patchSurface(material, {
    key: `books|${key}`,
    localAttribute: true,
    color: `
vec3 bkP = vSurface;
vec3 bkN = vSurfaceNormal;
float bkSeed = fract(vColor.r * 13.7 + vColor.g * 7.3 + vColor.b * 3.1);
vec3 bkColor = diffuseColor.rgb * (0.9 + 0.15 * bwNoise(vSurfaceWorld * 60.0));
float bkGilt = 0.0;
float bkSpine = step(0.5, bkN.z);
if (bkSpine > 0.5) {
  float y = bkP.y;
  // Raised bands and gilt rules toward head and tail, a title label on some.
  float bands = step(0.4, bkSeed) * (1.0 - smoothstep(0.004, 0.012, abs(abs(y) - 0.38))) + step(0.65, bkSeed) * (1.0 - smoothstep(0.003, 0.009, abs(abs(y) - 0.31)));
  float label = step(0.55, fract(bkSeed * 3.7)) * (1.0 - smoothstep(0.08, 0.1, abs(y - 0.12))) * (1.0 - smoothstep(0.3, 0.36, abs(bkP.x)));
  float lettering = label * step(0.5, fract(y * 60.0 + bkSeed * 9.0)) * step(abs(bkP.x), 0.18) * (1.0 - smoothstep(0.05, 0.06, abs(y - 0.12)));
  bkColor = mix(bkColor, mix(vec3(0.1, 0.08, 0.06), vec3(0.75, 0.68, 0.52), step(0.4, fract(bkSeed * 5.1))), label * 0.85);
  bkGilt = max(bands, lettering * 0.8) * step(0.25, bkSeed);
  bkColor = mix(bkColor, vec3(0.78, 0.6, 0.3), bkGilt);
  // Wear on the spine edges and a faded top where light has fallen for years.
  bkColor *= 1.0 - 0.25 * smoothstep(0.38, 0.5, abs(bkP.x));
  bkColor *= mix(1.0, 1.15, smoothstep(0.2, 0.5, y) * step(0.7, bkSeed));
}
// Page block on the top and bottom faces, inset from the boards.
float bkPages = step(0.5, abs(bkN.y)) * (1.0 - smoothstep(0.36, 0.42, bkP.x)) * step(bkP.z, 0.44);
bkColor = mix(bkColor, vec3(0.72, 0.66, 0.54) * (0.85 + 0.15 * sin(bkP.x * 300.0)), bkPages);
diffuseColor.rgb = bkColor;`,
    roughness: 'roughnessFactor = mix(roughnessFactor, 0.28, bkGilt);',
    lights: '#ifdef USE_CLEARCOAT\nmaterial.clearcoat *= 1.0 - bkPages;\n#endif',
  });
}

/** One upright or lying book: a box with a local frame normalised to its size, tinted by colour. */
function bookGeometry(w: number, h: number, d: number, color: THREE.Color) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.deleteAttribute('uv');
  const p = g.attributes.position;
  // Local frame in units of the book's own size, so the shader's bands scale with it.
  const local = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) local.set([p.getX(i) / w, p.getY(i) / h, p.getZ(i) / d], i * 3);
  g.setAttribute('surfaceLocal', new THREE.BufferAttribute(local, 3));
  g.setAttribute('surfaceLocalNormal', g.getAttribute('normal').clone());
  const colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) colors.set([color.r, color.g, color.b], i * 3);
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return g;
}

export interface ShelfRun {
  /** Left and right ends of the usable shelf (x), the shelf top (y) and the front edge (z, books face +z). */
  x0: number; x1: number; y: number; front: number;
  /** Clear height above the shelf. */
  clear: number;
  depth: number;
}

/** Fills shelf runs with books: varied heights, thicknesses and colours, stacks, leaners and gaps. */
export function fillShelves(runs: ShelfRun[], random: () => number, gaps: (run: number, x: number) => boolean = () => false) {
  const books: THREE.BufferGeometry[] = [];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(1, 1, 1), v = new THREE.Vector3();
  const pick = () => new THREE.Color(BOOK_COLORS[Math.floor(random() * BOOK_COLORS.length)]).multiplyScalar(0.7 + random() * 0.45);
  runs.forEach((run, r) => {
    let x = run.x0 + 0.01;
    // Each shelf has its own family of sizes (sets, paperbacks, folios).
    const family = random();
    while (x < run.x1 - 0.03) {
      if (gaps(r, x)) { x += 0.05; continue; }
      const roll = random();
      if (roll < 0.07 && run.x1 - x > 0.3) {
        // A stack lying flat.
        const n = 3 + Math.floor(random() * 4);
        let y = run.y;
        const sw = 0.2 + random() * 0.08, sd = Math.min(run.depth - 0.02, 0.15 + random() * 0.06);
        for (let k = 0; k < n; k++) {
          const t = 0.025 + random() * 0.025;
          const g = bookGeometry(sw * (0.88 + random() * 0.14), t, sd * (0.9 + random() * 0.1), pick());
          // Lying: the spine (+z of the book) faces the room, rotated so its long side runs along x.
          g.applyMatrix4(m.compose(v.set(x + sw / 2 + (random() - 0.5) * 0.015, y + t / 2, run.front - sd / 2 - 0.01), q.setFromEuler(e.set(0, (random() - 0.5) * 0.12, 0)), s));
          books.push(g); y += t;
        }
        x += sw + 0.02;
        continue;
      }
      const h = Math.min(run.clear - 0.02, (family < 0.3 ? 0.2 : family < 0.7 ? 0.25 : 0.3) * (0.82 + random() * 0.32));
      const w = 0.018 + random() * random() * 0.05;
      const d = Math.min(run.depth - 0.02, h * (0.62 + random() * 0.12));
      if (roll > 0.965 && x > run.x0 + 0.2) {
        // A leaner, resting on its neighbour.
        const lean = 0.25 + random() * 0.2;
        const g = bookGeometry(w, h, d, pick());
        g.applyMatrix4(m.compose(v.set(x + Math.sin(lean) * h / 2 + w / 2, run.y + Math.cos(lean) * h / 2 + Math.sin(lean) * w / 2, run.front - d / 2 - 0.01), q.setFromEuler(e.set(0, 0, -lean)), s));
        books.push(g);
        x += Math.sin(lean) * h + w + 0.06;
        continue;
      }
      const g = bookGeometry(w, h, d, pick());
      g.applyMatrix4(m.compose(v.set(x + w / 2, run.y + h / 2, run.front - d / 2 - 0.004 - random() * 0.02), q.setFromEuler(e.set(0, (random() - 0.5) * 0.04, (random() - 0.5) * 0.015)), s));
      books.push(g);
      x += w + 0.0015;
    }
  });
  const merged = mergeGeometries(books.map(g => g.toNonIndexed()), false)!;
  books.forEach(g => g.dispose());
  return merged;
}

/** Worn leather: fine pebbled grain, creases where the body sits, darker in folds, polished on high points. */
export function createLeatherMaterial(key: string, color: THREE.ColorRepresentation) {
  const material = new THREE.MeshPhysicalMaterial({ color, roughness: 0.48, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.35, sheen: 0.3, sheenColor: '#c08a5a' });
  return patchSurface(material, {
    key: `leather|${key}`,
    objectSpace: true,
    color: `
vec3 ltP = vSurface;
float ltGrain = bwNoise(ltP * 160.0) * bwResolve(length(fwidth(ltP)) * 160.0);
float ltWear = bwFbm3(ltP * 4.0);
float ltCrease = pow(1.0 - abs(bwNoise(ltP * vec3(6.0, 14.0, 6.0) + 3.0)), 8.0);
vec3 ltColor = diffuseColor.rgb * (0.82 + 0.18 * ltWear) * (1.0 - 0.25 * ltCrease);
// Polished, paler leather on the worn high points.
ltColor = mix(ltColor, ltColor * vec3(1.35, 1.25, 1.1), smoothstep(0.25, 0.7, ltWear) * 0.35);
diffuseColor.rgb = ltColor;`,
    height: '(ltGrain * 0.00012 - ltCrease * 0.0006)',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.18 * ltCrease - 0.12 * smoothstep(0.25, 0.7, ltWear), 0.2, 1.0);',
  });
}

/** A leather wingback in its own frame (front faces +z, seat centre at the origin on the floor). */
export function wingbackChair() {
  const leather: THREE.BufferGeometry[] = [], wood: THREE.BufferGeometry[] = [];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  const put = (g: THREE.BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) => g.applyMatrix4(m.compose(new THREE.Vector3(x, y, z), q.setFromEuler(e.set(rx, ry, rz)), new THREE.Vector3(1, 1, 1)));
  leather.push(put(cushion(0.84, 0.28, 0.74, 0.2, 40, 1), 0, 0.3, 0.02));
  // Seat cushion, slightly sagging in the middle.
  const seat = cushion(0.62, 0.15, 0.6, 0.32, 40, 2);
  { const p = seat.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i), y = p.getY(i); if (y > 0) p.setY(i, y - 0.025 * Math.exp(-(x * x) / 0.05 - (z * z) / 0.06)); } seat.computeVertexNormals(); }
  leather.push(put(seat, 0, 0.5, 0.07));
  // Tall back, gently curved, with a deep buttoned roll at the top.
  const back = cushion(0.78, 0.82, 0.2, 0.28, 48, 3);
  { const p = back.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    let dz = -x * x * 0.35;
    // Buttons: a diamond grid of shallow dimples on the face.
    if (z > 0) { const gx = x / 0.13, gy = y / 0.13 + (Math.floor(x / 0.13 + 0.5) % 2) * 0.5; const fx = gx - Math.round(gx), fy = gy - Math.round(gy); dz -= 0.014 * Math.exp(-(fx * fx + fy * fy) * 40); }
    p.setZ(i, z + dz); } back.computeVertexNormals(); }
  leather.push(put(back, 0, 0.94, -0.31, -0.12));
  // A shaped crest rail along the top of the back.
  leather.push(put(cushion(0.7, 0.12, 0.16, 0.45, 32, 12), 0, 1.36, -0.37, -0.12));
  // Wings sweeping forward from the back into the arms.
  for (const side of [-1, 1]) {
    const wing = cushion(0.1, 0.5, 0.44, 0.3, 32, 4 + side);
    { const p = wing.attributes.position; for (let i = 0; i < p.count; i++) { const y = p.getY(i), z = p.getZ(i); p.setZ(i, z * (0.7 + 0.6 * Math.max(0, y / 0.25 + 0.5) * 0.5)); p.setX(i, p.getX(i) + side * Math.max(0, z) * 0.12); } wing.computeVertexNormals(); }
    leather.push(put(wing, side * 0.4, 1.0, -0.12, 0, 0, side * 0.06));
    // Rolled arm: a block and a scrolled front.
    leather.push(put(cushion(0.11, 0.2, 0.66, 0.26, 32, 6 + side), side * 0.39, 0.56, 0.05));
    leather.push(put(cushion(0.15, 0.1, 0.7, 0.5, 32, 8 + side), side * 0.41, 0.67, 0.06));
    // Turned front legs, square back legs.
    const leg = new THREE.LatheGeometry([[0.0, 0], [0.026, 0], [0.03, 0.03], [0.022, 0.07], [0.028, 0.11], [0.03, 0.16], [0.0, 0.16]].map(([r, h]) => new THREE.Vector2(r, h)), 12);
    wood.push(put(leg, side * 0.34, 0, 0.3));
    wood.push(put(roundedBlock(0.05, 0.16, 0.05, 0.006), side * 0.34, 0.08, -0.32, -0.15));
  }
  const leatherGeometry = mergeGeometries(leather.map(g => { if (g.getAttribute('uv')) g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }), false)!;
  const woodGeometry = mergeGeometries(wood.map(g => { if (g.getAttribute('uv')) g.deleteAttribute('uv'); return g.index ? g.toNonIndexed() : g; }), false)!;
  leather.forEach(g => g.dispose()); wood.forEach(g => g.dispose());
  return { leather: leatherGeometry, wood: woodGeometry };
}

/** A knitted throw hanging over the chair's right arm (chair frame), uv in metres. */
export function armThrow() {
  return clothSheet(40, 70, (u, v, out) => {
    // Across the arm (x) and along it (z): the middle lies on the arm, both sides fall.
    const along = (u - 0.5) * 0.55, across = (v - 0.5) * 1.3;
    const armTop = 0.73, armX = 0.41;
    const a = Math.abs(across);
    let x: number, y: number;
    if (a < 0.12) { x = armX + across; y = armTop + 0.012 * Math.cos(across / 0.12 * Math.PI / 2); }
    else {
      const fall = a - 0.12;
      const side = Math.sign(across);
      // Inner side falls onto the seat; outer side hangs to the floor.
      const limit = side < 0 ? 0.24 : 0.6;
      const drop = Math.min(fall, limit) + Math.max(0, fall - limit) * 0.15;
      x = armX + side * (0.12 + 0.03 * Math.min(1, fall / 0.06)) + (side < 0 ? -Math.max(0, fall - limit) * 0.9 : Math.max(0, fall - limit) * 0.2);
      y = armTop - drop;
    }
    const folds = Math.sin(along * 22 + a * 3) * 0.018 * Math.min(1, Math.max(0, a - 0.12) / 0.2) + noise3(along * 5, a * 5, 3) * 0.008;
    out.set(x + folds * Math.sign(across), Math.max(0.02, y), along + 0.05 + folds * 0.5);
  }, 0.014, [0.55, 1.3]);
}

/** A mantel clock: an arched walnut case, a brass bezel, a painted dial with hands. Frame: face toward +z, base at y = 0. */
export function mantelClock() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.13, 0); shape.lineTo(0.13, 0); shape.lineTo(0.13, 0.16);
  shape.absarc(0, 0.16, 0.13, 0, Math.PI, false);
  shape.lineTo(-0.13, 0);
  const caseGeometry = new THREE.ExtrudeGeometry(shape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 3, curveSegments: 32 });
  caseGeometry.translate(0, 0.02, -0.045);
  caseGeometry.deleteAttribute('uv');
  const plinth = roundedBlock(0.3, 0.025, 0.12, 0.006);
  plinth.translate(0, 0.0125, 0);
  const wood = mergeGeometries([caseGeometry.toNonIndexed(), plinth.toNonIndexed()], false)!;
  caseGeometry.dispose(); plinth.dispose();
  const bezel = new THREE.TorusGeometry(0.085, 0.009, 10, 48); bezel.translate(0, 0.17, 0.058);
  const dial = new THREE.CircleGeometry(0.082, 48); dial.translate(0, 0.17, 0.054);
  return { wood, bezel, dial };
}

/** Painted clock dial: Roman hour ticks and two blued hands at ten past ten. */
export function createDialMaterial(key: string, centre: THREE.Vector3) {
  return patchSurface(new THREE.MeshStandardMaterial({ color: '#e8e0cc', roughness: 0.5 }), {
    key: `dial|${key}`,
    objectSpace: true,
    color: `
vec2 dl = (vSurface.xy - vec2(${centre.x.toFixed(4)}, ${centre.y.toFixed(4)})) / 0.082;
float dr = length(dl), da = atan(dl.x, dl.y);
float tick = (1.0 - smoothstep(0.012, 0.03, abs(fract(da / 6.28318 * 12.0 + 0.5) - 0.5) * dr * 6.28 / 12.0 * 12.0)) * step(0.72, dr) * step(dr, 0.88);
float minute = (1.0 - smoothstep(0.004, 0.012, abs(fract(da / 6.28318 * 60.0 + 0.5) - 0.5) * dr)) * step(0.9, dr) * step(dr, 0.95);
vec2 hourDir = vec2(sin(5.3), cos(5.3)), minDir = vec2(sin(1.05), cos(1.05));
float hourHand = (1.0 - smoothstep(0.02, 0.035, abs(dot(dl, vec2(hourDir.y, -hourDir.x))))) * step(0.0, dot(dl, hourDir)) * step(dot(dl, hourDir), 0.5);
float minHand = (1.0 - smoothstep(0.012, 0.025, abs(dot(dl, vec2(minDir.y, -minDir.x))))) * step(0.0, dot(dl, minDir)) * step(dot(dl, minDir), 0.75);
float ink = max(max(tick, minute), max(hourHand, minHand));
diffuseColor.rgb = mix(diffuseColor.rgb * (0.92 + 0.08 * bwNoise(vSurface * 200.0)), vec3(0.05, 0.06, 0.1), ink);
diffuseColor.rgb *= 1.0 - 0.15 * smoothstep(0.75, 1.0, dr);`,
  });
}

/** A round woven basket (twill-woven material reads the uv) of split logs, base at y = 0. */
export function logBasket(random: () => number) {
  const basket = new THREE.LatheGeometry([[0, 0.01], [0.24, 0.01], [0.28, 0.04], [0.3, 0.2], [0.31, 0.32], [0.33, 0.335], [0.32, 0.345], [0.29, 0.33], [0.28, 0.2], [0.26, 0.05], [0, 0.04]].map(([r, h]) => new THREE.Vector2(r, h)), 56);
  const uv = basket.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1.9, uv.getY(i) * 0.6);
  const logs: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 9; i++) {
    const r = 0.04 + random() * 0.03, len = 0.48 + random() * 0.1;
    const shapeLog = new THREE.Shape();
    const wedge = random() < 0.55 ? Math.PI * (0.6 + random() * 0.5) : Math.PI * 2, a0 = random() * 6.28;
    if (wedge < Math.PI * 2) shapeLog.moveTo(0, 0);
    for (let k = 0; k <= 14; k++) { const a = a0 + wedge * k / 14; const rr = r * (1 + noise3(Math.cos(a) * 2, Math.sin(a) * 2, i) * 0.07); if (k === 0 && wedge >= Math.PI * 2) shapeLog.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); else shapeLog.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    shapeLog.closePath();
    const g = new THREE.ExtrudeGeometry(shapeLog, { depth: len, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 1, curveSegments: 14 });
    g.translate(0, 0, -len / 2); g.deleteAttribute('uv'); g.computeVertexNormals(); withLocalFrame(g);
    const local = g.getAttribute('surfaceLocal');
    for (let k = 0; k < local.count; k++) local.setZ(k, local.getZ(k) + i * 4.7);
    const layer = Math.floor(i / 4);
    const upright = i >= 7;
    const m = new THREE.Matrix4().compose(upright ? new THREE.Vector3(-0.1 + (i - 7) * 0.16, 0.3, -0.12) : new THREE.Vector3(-0.18 + (i % 4) * 0.12 + layer * 0.05, 0.24 + layer * 0.11 + random() * 0.02, (random() - 0.5) * 0.05), new THREE.Quaternion().setFromEuler(upright ? new THREE.Euler(Math.PI / 2 - 0.35, random() * 3, 0.1) : new THREE.Euler(random() * 0.3 - 0.15, Math.PI / 2 + (random() - 0.5) * 0.4, random() * 3)), new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    logs.push(g);
  }
  const logGeometry = mergeGeometries(logs, false)!; logs.forEach(g => g.dispose());
  return { basket, logs: logGeometry };
}
