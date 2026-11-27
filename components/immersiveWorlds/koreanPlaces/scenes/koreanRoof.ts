import * as THREE from 'three';
import { KP_NOISE } from './kit';

/*
 * A hip-and-gable (팔작) Korean roof, generated from its eave-distance profile:
 *   y = f(v), v = horizontal distance in from the nearest eave.
 * The four slopes are separate grids that meet exactly on the hip lines; the
 * upper end slopes stop at the gable foot, where a gable board closes the
 * roof. Corners lift (앙곡) and swing outward (안허리곡) near the eaves, so the
 * eave line curves upward toward each corner. Tiles are shaded procedurally in
 * world/slope space (convex cover rows over concave pan channels), with real
 * geometry for the silhouette: ridges, hips, end tiles and two-tier rafters.
 */

export interface RoofSpec {
  halfWidth: number;   // along x
  halfDepth: number;   // along z
  eaveY: number;
  ridgeY: number;
  /** Horizontal depth of the lower hipped end slopes. */
  hipDepth: number;
  lift: number;
  flare: number;
  /** Tile row spacing (m). */
  row?: number;
  /** Underside depth below the tiles (m). */
  thickness?: number;
  /** How far in from the eave the visible underside extends (m); Infinity = whole roof. */
  soffit?: number;
  detail?: number;
}

export interface RoofMaterials {
  tile: THREE.Material;
  ridge: THREE.Material;
  gable: THREE.Material;
  soffit: THREE.Material;
  rafter: THREE.Material;
  rafterEnd: THREE.Material;
  endTile: THREE.Material;
}

export function roofShape(spec: RoofSpec) {
  const { halfWidth: W, halfDepth: D, eaveY, ridgeY, hipDepth: xg, lift, flare } = spec;
  const f = (v: number) => eaveY + (ridgeY - eaveY) * Math.pow(THREE.MathUtils.clamp(v / D, 0, 1), 1.55);
  /** World position of a roof point from its undeformed plan (x, z) and eave distance v. */
  const point = (x: number, z: number, v: number, drop = 0) => {
    const c = Math.pow(Math.abs(x) / W, 4) * Math.pow(Math.abs(z) / D, 4);
    const w = Math.pow(Math.max(0, 1 - v / (D * .75)), 2);
    const s = 1 + flare * c * w;
    return new THREE.Vector3(x * s, f(v) + lift * c * w - drop, z * s);
  };
  return { f, point, W, D, xg };
}

const TILE_GLSL = /* glsl */ `
${KP_NOISE}
varying vec3 vTileWorld;
varying vec2 vTileUv;
float tileHeight(vec2 uv) {
  float row = uv.x / ROW;
  float local = fract(row) - 0.5;
  float cover = sqrt(max(0.0, 1.0 - pow(local / 0.24, 2.0)));
  float pan = -0.35 * (1.0 - abs(local) * 2.0);
  float course = fract(uv.y / 0.34 + bwHash1(vec3(floor(row), 3.0, 1.0)) * 0.6);
  float lap = smoothstep(0.0, 0.08, course) * 0.12 - course * 0.1;
  return max(cover, pan) + lap;
}
`;

/** Clay tile surface: cover rows, pan channels, staggered courses, lichen and grime. */
export function tileMaterial(key: string, params: THREE.MeshStandardMaterialParameters = {}, row = .3) {
  const material = new THREE.MeshStandardMaterial({ color: '#545b5b', roughness: .62, metalness: 0, ...params });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTileWorld;\nvarying vec2 vTileUv;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvTileWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvTileUv = uv;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n#define ROW ${row.toFixed(4)}\n${TILE_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float tRow = vTileUv.x / ROW;
float tLocal = fract(tRow) - 0.5;
float tCover = 1.0 - smoothstep(0.2, 0.26, abs(tLocal));
float tCourse = floor(vTileUv.y / 0.34 + bwHash1(vec3(floor(tRow), 3.0, 1.0)) * 0.6);
vec3 tH = bwHash3(vec3(floor(tRow), tCourse, 7.0));
float tLichen = smoothstep(0.35, 0.75, bwFbm3(vTileWorld * 0.9 + 3.0)) * (0.4 + 0.6 * tCover);
float tGrime = smoothstep(-0.2, 0.6, bwFbm3(vec3(vTileWorld.x * 0.6, vTileWorld.y * 2.5, vTileWorld.z * 0.6)));
vec3 tColor = diffuseColor.rgb * (0.82 + 0.3 * tH.x) * mix(0.62, 1.08, tCover);
tColor = mix(tColor, vec3(0.42, 0.44, 0.34), tLichen * 0.35);
tColor = mix(tColor, vec3(0.62, 0.62, 0.55), smoothstep(0.75, 0.95, bwNoise(vTileWorld * 6.0)) * 0.25 * tCover);
tColor *= 1.0 - 0.25 * tGrime * (1.0 - tCover);
diffuseColor.rgb = tColor;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor * 1.25, roughnessFactor * 0.78, tCover) + tLichen * 0.2;
roughnessFactor = clamp(roughnessFactor, 0.2, 1.0);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  vec3 dp1 = dFdx(-vViewPosition), dp2 = dFdy(-vViewPosition);
  vec2 du1 = dFdx(vTileUv), du2 = dFdy(vTileUv);
  vec3 dp2perp = cross(dp2, normal), dp1perp = cross(normal, dp1);
  vec3 T = dp2perp * du1.x + dp1perp * du2.x;
  vec3 B = dp2perp * du1.y + dp1perp * du2.y;
  float inv = inversesqrt(max(max(dot(T, T), dot(B, B)), 1e-12));
  T *= inv; B *= inv;
  const float e = 0.006;
  float h0 = tileHeight(vTileUv);
  float hx = (tileHeight(vTileUv + vec2(e, 0.0)) - h0) / e;
  float hy = (tileHeight(vTileUv + vec2(0.0, e)) - h0) / e;
  // Fade relief with distance so far rows do not alias into moire.
  float fade = 1.0 - smoothstep(0.02, 0.09, length(du1) + length(du2));
  normal = normalize(normal - (T * hx + B * hy) * 0.055 * fade);
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|kp-tile-v1|${key}`;
  return material;
}

interface Grid { positions: number[]; uvs: number[]; indices: number[] }
const grid = (): Grid => ({ positions: [], uvs: [], indices: [] });
function addGrid(g: Grid, nu: number, nv: number, at: (iu: number, iv: number) => { p: THREE.Vector3; uv: [number, number] }, flip: boolean) {
  const base = g.positions.length / 3;
  for (let iv = 0; iv <= nv; iv++) for (let iu = 0; iu <= nu; iu++) {
    const { p, uv } = at(iu, iv); g.positions.push(p.x, p.y, p.z); g.uvs.push(uv[0], uv[1]);
  }
  for (let iv = 0; iv < nv; iv++) for (let iu = 0; iu < nu; iu++) {
    const a = base + iv * (nu + 1) + iu, b = a + 1, c = a + nu + 1, d = c + 1;
    if (flip) g.indices.push(a, b, c, b, d, c); else g.indices.push(a, c, b, b, c, d);
  }
}
function toGeometry(g: Grid) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(g.positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(g.uvs, 2));
  geometry.setIndex(g.indices); geometry.computeVertexNormals();
  return geometry;
}

/** Build the roof as a group of meshes (static; bake it with the rest). */
export function buildRoof(spec: RoofSpec, materials: RoofMaterials) {
  const group = new THREE.Group();
  const { f, point, W, D, xg } = roofShape(spec);
  const row = spec.row ?? .3, thickness = spec.thickness ?? .34, soffit = Math.min(spec.soffit ?? Infinity, D);
  const detail = spec.detail ?? 1;
  const slopeLength = Math.hypot(D, spec.ridgeY - spec.eaveY) / D;
  const nu = Math.ceil(W * 2 / .25 * detail), nv = Math.ceil(D / .3 * detail);

  // Upper (tiled) and lower (soffit) surfaces for the four slopes.
  const top = grid(), under = grid();
  for (const side of [1, -1]) {
    // Long slopes (front/back): v from eave to ridge, x bounded by the hips.
    const face = (drop: number, vMax: number, target: Grid, flip: boolean) => addGrid(target, nu, Math.max(2, Math.ceil(nv * vMax / D)), (iu, iv) => {
      const v = iv / Math.max(2, Math.ceil(nv * vMax / D)) * vMax, u = iu / nu * 2 - 1;
      const x = u * (W - Math.min(v, xg)), z = side * (D - v);
      return { p: point(x, z, v, drop), uv: [x, v * slopeLength] };
    }, side > 0 ? !flip : flip);
    face(0, D, top, false);
    face(thickness, soffit, under, true);
    // Hipped end slopes.
    const nEnd = Math.ceil(D * 2 / .25 * detail), nvEnd = Math.max(2, Math.ceil(xg / .3 * detail));
    const end = (drop: number, vMax: number, target: Grid, flip: boolean) => addGrid(target, nEnd, nvEnd, (iu, iv) => {
      const v = iv / nvEnd * Math.min(xg, vMax), u = iu / nEnd * 2 - 1;
      const z = u * (D - v), x = side * (W - v);
      return { p: point(x, z, v, drop), uv: [z, v * slopeLength] };
    }, side > 0 ? flip : !flip);
    end(0, xg, top, false);
    end(thickness, soffit, under, true);
  }
  const tiles = new THREE.Mesh(toGeometry(top), materials.tile); tiles.castShadow = tiles.receiveShadow = true; group.add(tiles);
  const soffitMesh = new THREE.Mesh(toGeometry(under), materials.soffit); soffitMesh.castShadow = false; soffitMesh.receiveShadow = true; group.add(soffitMesh);

  // Gable boards (합각) closing the upper roof at each end.
  const gable = grid();
  for (const side of [1, -1]) {
    const n = 16, base = gable.positions.length / 3, xPlane = side * (W - xg);
    for (let i = 0; i <= n; i++) {
      const z = (i / n * 2 - 1) * (D - xg);
      const vTop = D - Math.abs(z);
      const upper = point(xPlane, z, vTop, .05), lower = point(side * (W - xg), z * (D - xg) / (D - xg), xg, .02);
      gable.positions.push(lower.x, lower.y, lower.z, upper.x, upper.y, upper.z); gable.uvs.push(z, 0, z, upper.y - lower.y);
      if (i < n) { const a = base + i * 2; if (side > 0) gable.indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); else gable.indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
  }
  const gableMesh = new THREE.Mesh(toGeometry(gable), materials.gable); gableMesh.castShadow = gableMesh.receiveShadow = true; group.add(gableMesh);

  // Ridge, gable-edge ridges and hip ridges.
  const tube = (points: THREE.Vector3[], radius: number, segments = 24, radial = 8) => {
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radial, false), materials.ridge);
    mesh.castShadow = mesh.receiveShadow = true; group.add(mesh); return mesh;
  };
  const ridgeLift = .2;
  const ridgePoints: THREE.Vector3[] = [];
  for (let k = 0; k <= 12; k++) {
    const x = (k / 12 * 2 - 1) * (W - xg);
    const e = Math.pow(Math.abs(x) / (W - xg), 6) * .22; // ends sweep up a little (망와)
    ridgePoints.push(new THREE.Vector3(x * 1.02, f(D) + ridgeLift + e, 0));
  }
  tube(ridgePoints, .17, 40, 10);
  const ridgeBase = new THREE.Mesh(new THREE.BoxGeometry((W - xg) * 2, .22, .42), materials.ridge);
  ridgeBase.position.set(0, f(D) + .04, 0); ridgeBase.castShadow = true; group.add(ridgeBase);
  for (const sx of [1, -1]) {
    for (const sz of [1, -1]) {
      const gablePoints: THREE.Vector3[] = [];
      for (let k = 0; k <= 8; k++) { const z = sz * (k / 8) * (D - xg); gablePoints.push(point(sx * (W - xg) * 1.004, z, D - Math.abs(z)).add(new THREE.Vector3(0, .1, 0))); }
      tube(gablePoints, .09, 16, 7);
      const hipPoints: THREE.Vector3[] = [];
      for (let k = 0; k <= 10; k++) { const v = xg * (1 - k / 10); hipPoints.push(point(sx * (W - v), sz * (D - v), v).add(new THREE.Vector3(0, .1, 0))); }
      const tip = hipPoints[hipPoints.length - 1].clone();
      hipPoints.push(tip.clone().add(new THREE.Vector3(sx * .18, .2, sz * .18)));
      tube(hipPoints, .1, 18, 7);
    }
  }

  // Eave fascia, end tiles and rafters (two tiers: long eave rafters, short upper ones).
  const fascia = grid();
  const endTiles: THREE.Matrix4[] = [], rafters: THREE.Matrix4[] = [], rafterEnds: THREE.Matrix4[] = [];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  const rafter = (a: THREE.Vector3, b: THREE.Vector3, radius: number, cap: boolean) => {
    const dir = b.clone().sub(a), length = dir.length(); dir.normalize();
    q.setFromUnitVectors(up, dir);
    m.compose(a.clone().add(b).multiplyScalar(.5), q, new THREE.Vector3(radius, length, radius)); rafters.push(m.clone());
    if (cap) { m.compose(a.clone().addScaledVector(dir, -.004), q.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)), new THREE.Vector3(radius, radius, 1)); rafterEnds.push(m.clone()); }
  };
  const tierSplit = Math.min(soffit, D * .5);
  for (const side of [1, -1]) {
    const fasciaFace = (along: (t: number) => { p: THREE.Vector3; out: THREE.Vector3 }, n: number, flip: boolean) => addGrid(fascia, n, 1, (iu, iv) => {
      const { p } = along(iu / n);
      return { p: p.clone().add(new THREE.Vector3(0, -iv * thickness * .55, 0)), uv: [iu / n, iv] };
    }, flip);
    fasciaFace(t => { const x = (t * 2 - 1) * W; return { p: point(x, side * D, 0, -.03), out: new THREE.Vector3(0, 0, side) }; }, 64, side < 0);
    fasciaFace(t => { const z = (t * 2 - 1) * D; return { p: point(side * W, z, 0, -.03), out: new THREE.Vector3(side, 0, 0) }; }, 48, side > 0);
    for (let x = -W + row * .5; x <= W; x += row) {
      const p = point(x, side * D, 0, -.02);
      m.compose(p, new THREE.Quaternion().setFromAxisAngle(up, side > 0 ? 0 : Math.PI), new THREE.Vector3(1, 1, 1)); endTiles.push(m.clone());
    }
    for (let z = -D + row * .5; z <= D; z += row) {
      const p = point(side * W, z, 0, -.02);
      m.compose(p, new THREE.Quaternion().setFromAxisAngle(up, side * Math.PI / 2), new THREE.Vector3(1, 1, 1)); endTiles.push(m.clone());
    }
    const spacing = .34;
    for (let x = -W + .25; x <= W - .25; x += spacing) {
      const vStart = .1;
      const lower = point(x, side * (D - vStart), vStart, thickness + .06), mid = point(x * (W - Math.min(tierSplit, xg)) / W, side * (D - tierSplit), tierSplit, thickness + .06);
      if (Math.abs(x) > W - Math.min(tierSplit, xg) + .1) continue;
      rafter(lower, mid, .062, true);
      if (soffit >= D) {
        const topPoint = point(x * (W - xg) / W, side * .02, D, thickness + .06);
        rafter(mid.clone().add(new THREE.Vector3(0, .02, 0)), topPoint, .055, false);
      }
    }
    for (let z = -D + .25; z <= D - .25; z += spacing) {
      const vStart = .1, vEnd = Math.min(xg, soffit);
      if (Math.abs(z) > D - vEnd + .05) continue;
      rafter(point(side * (W - vStart), z, vStart, thickness + .06), point(side * (W - vEnd), z, vEnd, thickness + .06), .062, true);
    }
  }
  const fasciaMesh = new THREE.Mesh(toGeometry(fascia), materials.ridge); fasciaMesh.castShadow = true; group.add(fasciaMesh);
  const endTileGeometry = new THREE.CylinderGeometry(.115, .115, .07, 14); endTileGeometry.rotateX(Math.PI / 2);
  const rafterGeometry = new THREE.CylinderGeometry(1, 1, 1, 9, 1, true);
  const capGeometry = new THREE.CircleGeometry(1, 16);
  // Instances are expanded into plain meshes so they bake with the static roof.
  const expand = (geometry: THREE.BufferGeometry, matrices: THREE.Matrix4[], material: THREE.Material, cast: boolean) => {
    for (const matrix of matrices) {
      const mesh = new THREE.Mesh(geometry, material); mesh.applyMatrix4(matrix); mesh.castShadow = cast; mesh.receiveShadow = true; group.add(mesh);
    }
  };
  expand(endTileGeometry, endTiles, materials.endTile, true);
  expand(rafterGeometry, rafters, materials.rafter, true);
  expand(capGeometry, rafterEnds, materials.rafterEnd, false);
  return { group, f, point };
}
