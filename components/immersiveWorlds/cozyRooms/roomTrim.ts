import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { glslFloat, glslVec3, patchSurface } from '../shared/render/interiorSurface';

/*
 * Interior joinery for the cozy rooms, built from 2D profiles: skirting
 * boards, dado and picture rails, cornices, architraves, applied panel
 * mouldings and picture frames. A profile is a list of [inset, relief] points
 * (metres inward from the outer edge, metres out from the wall); it is swept
 * along straight runs, and rectangular frames get true mitred corners. Normals
 * come from the 2D profile, smooth across gentle curves and split at sharp
 * arrises, so a rail catches a crisp highlight on its bead and a soft one on
 * its ogee. Plus a wallpaper surface with an embossed half-drop pattern.
 * Original procedural work.
 */

export type Profile = Array<[number, number]>;

interface PreparedProfile { points: Profile; normals: Array<[number, number]> }

/** Splits a profile at sharp corners and gives each point its outward 2D normal. */
function prepare(profile: Profile, sharp = 0.6): PreparedProfile {
  const segment = (i: number): [number, number] => {
    const dx = profile[i + 1][0] - profile[i][0], dy = profile[i + 1][1] - profile[i][1];
    const l = Math.hypot(dx, dy) || 1;
    // Outward: the tangent turned a quarter anticlockwise (material lies under the run).
    return [-dy / l, dx / l];
  };
  const points: Profile = [], normals: Array<[number, number]> = [];
  for (let i = 0; i < profile.length; i++) {
    const before = i > 0 ? segment(i - 1) : null, after = i < profile.length - 1 ? segment(i) : null;
    if (before && after) {
      const cos = before[0] * after[0] + before[1] * after[1];
      if (cos < Math.cos(sharp)) {
        points.push(profile[i], profile[i]); normals.push(before, after);
        continue;
      }
      const nx = before[0] + after[0], ny = before[1] + after[1], l = Math.hypot(nx, ny) || 1;
      points.push(profile[i]); normals.push([nx / l, ny / l]);
    } else {
      points.push(profile[i]); normals.push((before ?? after)!);
    }
  }
  return { points, normals };
}

/**
 * Sweeps a profile between two edge points. `inward` points from the outer edge
 * into the moulding, `out` away from the wall. `mitre` (per end) shifts each
 * profile point along the run by its inset, for 45-degree corners.
 */
function sweep(p: PreparedProfile, a: THREE.Vector3, b: THREE.Vector3, inward: THREE.Vector3, out: THREE.Vector3, mitre: [number, number] = [0, 0]) {
  const along = b.clone().sub(a).normalize();
  const n = p.points.length;
  const positions = new Float32Array(n * 2 * 3), normals = new Float32Array(n * 2 * 3), uvs = new Float32Array(n * 2 * 2);
  const v = new THREE.Vector3(), nn = new THREE.Vector3();
  const length = a.distanceTo(b);
  for (let i = 0; i < n; i++) {
    const [inset, relief] = p.points[i], [ni, nr] = p.normals[i];
    nn.copy(inward).multiplyScalar(ni).addScaledVector(out, nr).normalize();
    for (let e = 0; e < 2; e++) {
      v.copy(e ? b : a).addScaledVector(inward, inset).addScaledVector(out, relief).addScaledVector(along, (e ? -1 : 1) * mitre[e] * inset);
      positions.set([v.x, v.y, v.z], (i * 2 + e) * 3);
      normals.set([nn.x, nn.y, nn.z], (i * 2 + e) * 3);
      uvs.set([e * length, inset + relief], (i * 2 + e) * 2);
    }
  }
  const index: number[] = [];
  const pa = new THREE.Vector3(), pb = new THREE.Vector3(), pc = new THREE.Vector3(), face = new THREE.Vector3(), vn = new THREE.Vector3();
  for (let i = 0; i < n - 1; i++) {
    if (p.points[i][0] === p.points[i + 1][0] && p.points[i][1] === p.points[i + 1][1]) continue;
    const a0 = i * 2, a1 = i * 2 + 1, b0 = i * 2 + 2, b1 = i * 2 + 3;
    pa.fromArray(positions, a0 * 3); pb.fromArray(positions, b0 * 3); pc.fromArray(positions, a1 * 3);
    face.subVectors(pb, pa).cross(pc.sub(pa));
    vn.fromArray(normals, a0 * 3).add(new THREE.Vector3().fromArray(normals, b0 * 3));
    if (face.dot(vn) >= 0) index.push(a0, b0, a1, a1, b0, b1); else index.push(a0, a1, b0, a1, b1, b0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setIndex(index);
  return g;
}

const merge = (parts: THREE.BufferGeometry[]) => {
  const merged = mergeGeometries(parts, false)!;
  parts.forEach(g => g.dispose());
  return merged;
};

/**
 * A straight run along +x from -length/2 to length/2 on the plane z = 0, the
 * profile's inset measured upward from y = 0 (skirting, dado rail) or, with
 * `down`, downward from y = 0 (cornice). End caps close exposed ends.
 */
export function straightMoulding(profile: Profile, length: number, options: { down?: boolean; caps?: boolean } = {}) {
  const p = prepare(profile);
  const inward = new THREE.Vector3(0, options.down ? -1 : 1, 0), out = new THREE.Vector3(0, 0, 1);
  const parts = [sweep(p, new THREE.Vector3(-length / 2, 0, 0), new THREE.Vector3(length / 2, 0, 0), inward, out)];
  if (options.caps) {
    const shape = new THREE.Shape(profile.map(([i, r]) => new THREE.Vector2(i, r)));
    for (const side of [-1, 1]) {
      const cap = new THREE.ShapeGeometry(shape);
      // Shape x = inset, y = relief: map into (y, z) at the end of the run.
      const pos = cap.attributes.position;
      for (let k = 0; k < pos.count; k++) {
        const inset = pos.getX(k), relief = pos.getY(k);
        pos.setXYZ(k, side * length / 2, (options.down ? -1 : 1) * inset, relief);
      }
      cap.computeVertexNormals();
      // Face the cap outward along the run.
      const nrm = cap.attributes.normal;
      if (Math.sign(nrm.getX(0)) !== side) { const idx = cap.index!; for (let k = 0; k < idx.count; k += 3) { const t = idx.getX(k + 1); idx.setX(k + 1, idx.getX(k + 2)); idx.setX(k + 2, t); } cap.computeVertexNormals(); }
      parts.push(cap.toNonIndexed());
      cap.dispose();
    }
    const nonIndexed = parts.map((g, i) => (i === 0 ? g.toNonIndexed() : g));
    parts[0].dispose();
    return merge(nonIndexed);
  }
  return parts[0];
}

/**
 * A mitred rectangular frame in the wall plane z = 0 around [x0, x1] x [y0, y1]
 * (the outer edge). `sides` = [bottom, right, top, left]; an omitted side leaves
 * square ends on its neighbours (an architrave standing on a sill).
 */
export function frameMoulding(profile: Profile, x0: number, y0: number, x1: number, y1: number, sides: [boolean, boolean, boolean, boolean] = [true, true, true, true]) {
  const p = prepare(profile);
  const out = new THREE.Vector3(0, 0, 1);
  const corners = [new THREE.Vector3(x0, y0, 0), new THREE.Vector3(x1, y0, 0), new THREE.Vector3(x1, y1, 0), new THREE.Vector3(x0, y1, 0)];
  const inwards = [new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, -1, 0), new THREE.Vector3(1, 0, 0)];
  const parts: THREE.BufferGeometry[] = [];
  for (let s = 0; s < 4; s++) {
    if (!sides[s]) continue;
    const a = corners[s], b = corners[(s + 1) % 4];
    const mitre: [number, number] = [sides[(s + 3) % 4] ? 1 : 0, sides[(s + 1) % 4] ? 1 : 0];
    parts.push(sweep(p, a, b, inwards[s], out, mitre));
  }
  return merge(parts);
}

/** Moves a wall-local geometry (x along the wall, y up, z out of it) onto a wall. */
export function onWall(geometry: THREE.BufferGeometry, origin: THREE.Vector3, yaw: number) {
  geometry.rotateY(yaw);
  geometry.translate(origin.x, origin.y, origin.z);
  return geometry;
}

// ---- Profiles (metres) -------------------------------------------------------------------------

/** Moulded skirting: plinth, a quirk, an ogee and a small round at the top. */
export const SKIRTING: Profile = [[0, 0], [0, 0.021], [0.118, 0.021], [0.124, 0.017], [0.128, 0.017], [0.134, 0.0205], [0.142, 0.0195], [0.15, 0.0155], [0.156, 0.0125], [0.162, 0.0095], [0.168, 0.0085], [0.172, 0.006], [0.175, 0.0035], [0.176, 0]];
/** Chair (dado) rail: a fillet, a bold bead and a cove. */
export const DADO_RAIL: Profile = [[0, 0], [0, 0.006], [0.008, 0.01], [0.012, 0.016], [0.018, 0.021], [0.026, 0.024], [0.034, 0.024], [0.042, 0.021], [0.048, 0.016], [0.052, 0.01], [0.055, 0.008], [0.06, 0.004], [0.062, 0]];
/** Cornice: a cove under a fillet and a small bead where it meets the ceiling. */
export const CORNICE: Profile = [[0, 0], [0, 0.012], [0.012, 0.016], [0.018, 0.02], [0.024, 0.032], [0.032, 0.048], [0.044, 0.062], [0.06, 0.074], [0.08, 0.082], [0.1, 0.086], [0.104, 0.092], [0.112, 0.094], [0.118, 0.094], [0.118, 0]];
/** A small cornice for furniture tops. */
export const CORNICE_SMALL: Profile = [[0, 0], [0, 0.01], [0.01, 0.014], [0.02, 0.026], [0.03, 0.036], [0.042, 0.042], [0.05, 0.046], [0.055, 0.046], [0.055, 0]];
/** Applied panel moulding (bolection-lite): a small ogee frame. */
export const PANEL_MOULD: Profile = [[0, 0], [0, 0.006], [0.004, 0.011], [0.009, 0.0135], [0.015, 0.012], [0.02, 0.008], [0.026, 0.004], [0.03, 0.002], [0.032, 0]];
/** Window or door architrave: a flat face stepping up to a bead at the outer edge. */
export const ARCHITRAVE: Profile = [[0, 0], [0, 0.018], [0.004, 0.024], [0.01, 0.026], [0.016, 0.024], [0.02, 0.019], [0.03, 0.019], [0.032, 0.016], [0.066, 0.014], [0.068, 0.011], [0.078, 0.011], [0.078, 0]];
/** A picture frame: a raised outer lip, a scoop and an inner slip. */
export const PICTURE_FRAME: Profile = [[0, 0], [0, 0.03], [0.004, 0.036], [0.01, 0.038], [0.016, 0.036], [0.022, 0.03], [0.03, 0.024], [0.04, 0.022], [0.046, 0.022], [0.046, 0.016], [0.052, 0.016], [0.052, 0.01]];

// ---- Wallpaper ----------------------------------------------------------------------------------

export interface WallpaperOptions {
  key: string;
  /** Printed motif colour (a paler or darker tone of the ground). */
  ink: THREE.ColorRepresentation;
  /** Pattern repeat in metres (width, height). */
  repeat?: [number, number];
  /** Strip width: faint butt seams between drops. */
  strip?: number;
  /** Emboss depth in metres. */
  emboss?: number;
}

/**
 * Embossed wallpaper on a uv in metres (PlaneGeometry with scaled uv): a
 * half-drop ogee lattice with a small flower in each lozenge, printed in a
 * satin ink that catches light at a grazing angle, faint paper seams.
 */
export function createWallpaperMaterial(ground: THREE.ColorRepresentation, options: WallpaperOptions, params: THREE.MeshStandardMaterialParameters = {}) {
  const [rw, rh] = options.repeat ?? [0.265, 0.37];
  const material = new THREE.MeshStandardMaterial({ color: ground, roughness: 0.86, metalness: 0, ...params });
  return patchSurface(material, {
    key: `wallpaper|${options.key}`,
    color: `
vec2 wpUv = vSurfaceUv;
vec2 wpG = wpUv / vec2(${glslFloat(rw)}, ${glslFloat(rh)});
wpG.y += mod(floor(wpG.x), 2.0) * 0.5;
vec2 wpC = fract(wpG) - 0.5;
vec2 wpPx = fwidth(wpG);
float wpAa = max(wpPx.x, wpPx.y) * 1.2 + 0.004;
// Ogee lattice: two mirrored S-curves per cell.
float wpOgee = abs(abs(wpC.x) - (0.27 + 0.19 * cos(wpC.y * 6.28318)));
float wpLine = 1.0 - smoothstep(0.018, 0.018 + wpAa, wpOgee);
// A small four-petalled flower and leaf pair in each lozenge.
float wpR = length(wpC * vec2(1.0, 0.8));
float wpA = atan(wpC.y, wpC.x);
float wpPetal = 1.0 - smoothstep(0.0, wpAa, wpR - 0.075 * (0.55 + 0.45 * abs(cos(wpA * 2.0))));
float wpEye = 1.0 - smoothstep(0.0, wpAa, wpR - 0.018);
vec2 wpL = vec2(abs(wpC.x) - 0.07, wpC.y + 0.1);
float wpLeaf = 1.0 - smoothstep(0.0, wpAa, length(wpL * vec2(2.4, 1.0)) - 0.06);
float wpDots = 1.0 - smoothstep(0.0, wpAa, length(fract(wpG * vec2(1.0, 2.0) + 0.25) - 0.5) - 0.022);
float wpInk = clamp(max(max(wpLine, wpPetal * (1.0 - wpEye * 0.6)), max(wpLeaf * 0.85, wpDots * 0.6)), 0.0, 1.0);
// Fade the print to its average tone before it can alias.
float wpFade = 1.0 - smoothstep(0.08, 0.3, max(wpPx.x, wpPx.y));
wpInk = mix(0.16, wpInk, wpFade);
float wpPaper = bwNoise(vec3(wpUv * 60.0, 1.0)) * bwResolve(length(fwidth(wpUv)) * 60.0);
float wpSeam = 1.0 - smoothstep(0.0006, 0.0018, abs(fract(wpUv.x / ${glslFloat(options.strip ?? 0.53)} + 0.5) - 0.5) * ${glslFloat(options.strip ?? 0.53)});
vec3 wpColor = mix(diffuseColor.rgb, ${glslVec3(options.ink)}, wpInk * 0.6);
wpColor *= 0.96 + 0.04 * wpPaper + 0.05 * bwFbm3(vec3(wpUv * 0.7, 3.0));
wpColor *= 1.0 - 0.12 * wpSeam;
diffuseColor.rgb = wpColor;`,
    height: `(wpInk * ${glslFloat(options.emboss ?? 0.0004)} + wpPaper * 0.00003 - wpSeam * 0.0002)`,
    roughness: 'roughnessFactor = clamp(roughnessFactor - 0.32 * wpInk * wpFade, 0.3, 1.0);',
  });
}

/**
 * A box of exact extents with rounded arrises and flat, true faces: joinery,
 * painted timber and furniture carcasses (stoneBlock adds chisel relief).
 */
export function roundedBlock(w: number, h: number, d: number, bevel = 0.004, step = 0.06) {
  const base = new THREE.BoxGeometry(w, h, d, Math.max(2, Math.ceil(w / step)), Math.max(2, Math.ceil(h / step)), Math.max(2, Math.ceil(d / step)));
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const g = mergeVertices(base); base.dispose();
  const p = g.attributes.position as THREE.BufferAttribute;
  const ex = w / 2, ey = h / 2, ez = d / 2;
  const r = Math.min(bevel, ex * 0.45, ey * 0.45, ez * 0.45);
  const v = new THREE.Vector3(), inner = new THREE.Vector3(), n = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    inner.set(THREE.MathUtils.clamp(v.x, -ex + r, ex - r), THREE.MathUtils.clamp(v.y, -ey + r, ey - r), THREE.MathUtils.clamp(v.z, -ez + r, ez - r));
    n.subVectors(v, inner);
    const len = n.length();
    if (len > 1e-6) v.copy(inner).addScaledVector(n.divideScalar(len), r);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/** PlaneGeometry whose uv runs in metres (for wallpaper and plaster that read uv). */
export function metricPlane(width: number, height: number, segments: [number, number] = [1, 1], offset: [number, number] = [0, 0]) {
  const g = new THREE.PlaneGeometry(width, height, segments[0], segments[1]);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * width + offset[0], uv.getY(i) * height + offset[1]);
  return g;
}

/** A wall with rectangular openings (window, door), uv in metres. */
export function wallWithOpenings(width: number, height: number, openings: Array<{ x0: number; y0: number; x1: number; y1: number }>, uvOffset: [number, number] = [0, 0]) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0); shape.lineTo(width / 2, 0); shape.lineTo(width / 2, height); shape.lineTo(-width / 2, height); shape.closePath();
  for (const o of openings) {
    const hole = new THREE.Path();
    hole.moveTo(o.x0, o.y0); hole.lineTo(o.x1, o.y0); hole.lineTo(o.x1, o.y1); hole.lineTo(o.x0, o.y1); hole.closePath();
    shape.holes.push(hole);
  }
  const g = new THREE.ShapeGeometry(shape);
  const pos = g.attributes.position, uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) + width / 2 + uvOffset[0], pos.getY(i) + uvOffset[1]);
  return g;
}
