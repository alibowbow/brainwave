import * as THREE from 'three';
import { canvasTexture, KP_NOISE, lathe, taperedTube } from './kit';

/*
 * Night forest parts for the scops-owl porch: an original small owl built from
 * lathed and sculpted forms with procedural plumage, oak-like bark, clustered
 * leaf cards and the night-sky GLSL shared by the dome and the stream.
 */

/** Night sky radiance for a world direction (dome and water reflections). */
export const NIGHT_SKY_GLSL = /* glsl */ `
uniform vec3 uMoonDir;
vec3 nightSky(vec3 d, float moonDisk) {
  float h = d.y;
  float cm = dot(d, uMoonDir);
  vec3 col = mix(vec3(0.026, 0.04, 0.075), vec3(0.005, 0.01, 0.026), pow(clamp(h, 0.0, 1.0), 0.45));
  col += vec3(0.028, 0.04, 0.06) * pow(1.0 - clamp(h, 0.0, 1.0), 6.0);
  col += vec3(0.07, 0.09, 0.14) * pow(max(cm, 0.0), 14.0) + vec3(0.05, 0.06, 0.08) * pow(max(cm, 0.0), 4.0) + vec3(0.3, 0.36, 0.48) * pow(max(cm, 0.0), 700.0);
  if (moonDisk > 0.0 && cm > 0.99975) {
    vec3 t1 = normalize(cross(uMoonDir, vec3(0.0, 1.0, 0.0)));
    vec3 t2 = cross(t1, uMoonDir);
    vec2 q = vec2(dot(d, t1), dot(d, t2)) / 0.0218;
    float r = length(q);
    float maria = bwFbm3(vec3(q * 2.2, 3.0)) * 0.5 + 0.5;
    float limb = pow(max(1.0 - r * r, 0.0), 0.25);
    vec3 moon = vec3(10.0, 10.4, 11.0) * (0.68 + 0.32 * smoothstep(0.35, 0.7, maria)) * limb;
    col = mix(col, moon * moonDisk, smoothstep(1.0, 0.94, r));
  }
  return col;
}
`;

/** Clustered leaves on one alpha card: twig, ten to fourteen serrated leaves with veins. */
export function leafClusterTexture(seed: number) {
  let s = seed;
  const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  const texture = canvasTexture(512, 512, ctx => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.strokeStyle = 'rgba(70,60,45,1)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(256, 500); ctx.quadraticCurveTo(250, 300, 262, 90); ctx.stroke();
    const leaves = 11 + Math.floor(r() * 4);
    for (let i = 0; i < leaves; i++) {
      const t = i / leaves, side = i % 2 ? 1 : -1;
      const bx = 256 + (r() - .5) * 10, by = 470 - t * 380;
      const angle = -Math.PI / 2 + side * (.5 + r() * .7) + (r() - .5) * .3;
      const len = 120 + r() * 70, wid = len * (.32 + r() * .1);
      ctx.save(); ctx.translate(bx, by); ctx.rotate(angle);
      const tone = .7 + r() * .55;
      const g = ctx.createLinearGradient(0, -wid, 0, wid);
      g.addColorStop(0, `rgb(${70 * tone | 0},${118 * tone | 0},${58 * tone | 0})`);
      g.addColorStop(.5, `rgb(${98 * tone | 0},${150 * tone | 0},${78 * tone | 0})`);
      g.addColorStop(1, `rgb(${58 * tone | 0},${100 * tone | 0},${50 * tone | 0})`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0);
      const teeth = 9;
      for (let k = 1; k <= teeth; k++) { const u = k / teeth; const w = Math.sin(Math.pow(u, .8) * Math.PI) * wid * (k % 2 ? 1 : .9); ctx.lineTo(u * len, -w); }
      for (let k = teeth; k >= 1; k--) { const u = k / teeth; const w = Math.sin(Math.pow(u, .8) * Math.PI) * wid * (k % 2 ? 1 : .9); ctx.lineTo(u * len, w); }
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = `rgba(190,210,150,${.35})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * .95, 0); ctx.stroke();
      ctx.lineWidth = 1;
      for (let k = 1; k < 7; k++) { const u = k / 7 * len; ctx.beginPath(); ctx.moveTo(u, 0); ctx.lineTo(u + 18, -wid * .6); ctx.moveTo(u, 0); ctx.lineTo(u + 18, wid * .6); ctx.stroke(); }
      ctx.restore();
    }
  });
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/** Grey, ridged broadleaf bark with moss on the shaded side. */
export function oakBark(key: string) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .95 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vOkWorld;\nvarying vec3 vOkNormal;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvOkWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvOkNormal = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vOkWorld;\nvarying vec3 vOkNormal;\n${KP_NOISE}
float okHeight(vec3 p) { return bwRidged(vec3(p.x * 9.0, p.y * 2.2, p.z * 9.0)) * 0.7 + bwNoise(p * 40.0) * 0.12; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float okR = bwRidged(vec3(vOkWorld.x * 9.0, vOkWorld.y * 2.2, vOkWorld.z * 9.0));
vec3 okColor = mix(vec3(0.11, 0.105, 0.095), vec3(0.34, 0.33, 0.3), smoothstep(0.2, 0.8, okR));
float okMoss = smoothstep(0.1, 0.6, -vOkNormal.x * 0.6 + vOkNormal.z * 0.4 + bwNoise(vOkWorld * 2.0) * 0.6) * (1.0 - smoothstep(1.0, 5.0, vOkWorld.y));
okColor = mix(okColor, vec3(0.14, 0.2, 0.09) * (0.8 + 0.4 * bwNoise(vOkWorld * 12.0)), okMoss * 0.7);
float okLichen = smoothstep(0.62, 0.8, bwNoise(vOkWorld * 3.3 + 5.0));
okColor = mix(okColor, vec3(0.45, 0.48, 0.42), okLichen * 0.5);
diffuseColor.rgb *= okColor;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.006;
  float h0 = okHeight(vOkWorld);
  vec3 g = vec3(okHeight(vOkWorld + vec3(e, 0, 0)) - h0, okHeight(vOkWorld + vec3(0, e, 0)) - h0, okHeight(vOkWorld + vec3(0, 0, e)) - h0) / e;
  vec3 vg = (viewMatrix * vec4(g * 0.008, 0.0)).xyz;
  normal = normalize(normal - (vg - dot(vg, normal) * normal));
}`);
  };
  material.customProgramCacheKey = () => `kp-oak-bark-v1|${key}`;
  return material;
}

/** Forest floor: leaf litter, moss mounds, dark damp soil toward the stream. */
export function forestFloor(riverGlsl: string) {
  // Litter shadows itself at the leaf scale, so backlit grazing sheen stays faint (low specular).
  const material = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: .95, specularIntensity: .2 });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vFfWorld;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvFfWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vFfWorld;\n${KP_NOISE}\n${riverGlsl}
float ffHeight(vec3 p) { return bwValue(p * 7.0) * 0.6 + bwValue(p * 23.0) * 0.4; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 fp = vFfWorld;
float litter = bwValue(fp * 7.0);
float patches = bwFbm3(fp * 0.3);
vec3 leaves = mix(vec3(0.035, 0.028, 0.022), vec3(0.085, 0.066, 0.045), litter) * (0.75 + 0.5 * bwValue(fp * 23.0)) * (0.8 + 0.4 * bwValue(fp * 1.3));
vec3 moss = mix(vec3(0.03, 0.05, 0.02), vec3(0.065, 0.09, 0.035), bwValue(fp * 5.0));
vec3 ff = mix(leaves, moss, smoothstep(-0.05, 0.35, patches));
float bank = 1.0 - smoothstep(0.7, 2.2, abs(fp.x - riverX(fp.z)));
ff = mix(ff, vec3(0.07, 0.07, 0.06), bank * 0.6);
diffuseColor.rgb *= ff;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(1.0, 0.45, bank);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  const float e = 0.01;
  float h0 = ffHeight(vFfWorld);
  vec3 g = vec3(ffHeight(vFfWorld + vec3(e, 0, 0)) - h0, 0.0, ffHeight(vFfWorld + vec3(0, 0, e)) - h0) / e;
  vec3 vg = (viewMatrix * vec4(g * 0.01, 0.0)).xyz;
  normal = normalize(normal - (vg - dot(vg, normal) * normal));
}`);
  };
  material.customProgramCacheKey = () => 'kp-forest-floor-v1';
  return material;
}

export interface Owl {
  group: THREE.Group;
  head: THREE.Group;
  body: THREE.Object3D;
  lids: THREE.Mesh[];
  tufts: THREE.Object3D[];
}

/** Original small owl (~0.5 m with tufts), facing +Z. Plumage is procedural:
 * bark-grey ground, dark shaft streaks, fine vermiculation, pale scapular
 * spots, a paler facial disc rimmed darker, and yellow-orange eyes. */
export function buildOwl(): Owl {
  const group = new THREE.Group();
  const plumage = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .92 });
  plumage.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vOwl;\nvarying vec3 vOwlN;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvOwl = position;\nvOwlN = normal;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vOwl;\nvarying vec3 vOwlN;\n${KP_NOISE}
float owlFeather(vec3 p) {
  float a = atan(p.x, p.z);
  vec2 cell = vec2(a * 7.0, p.y * 26.0);
  vec2 id = floor(cell + vec2(0.0, floor(cell.x) * 0.5));
  vec2 f = fract(cell + vec2(0.0, floor(cell.x) * 0.5));
  return smoothstep(0.0, 0.9, f.y) * (0.7 + 0.3 * bwHash1(vec3(id, 1.0)));
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 op = vOwl;
float streak = smoothstep(0.55, 0.9, bwNoise(vec3(op.x * 60.0, op.y * 9.0, op.z * 60.0)));
float vermic = 0.5 + 0.5 * sin(op.y * 420.0 + bwNoise(op * 80.0) * 6.0);
float feather = owlFeather(op);
vec3 ground = mix(vec3(0.24, 0.21, 0.17), vec3(0.42, 0.38, 0.31), bwValue(op * 30.0));
ground *= 0.82 + 0.25 * feather;
ground = mix(ground, ground * 0.45, streak * 0.85);
ground *= 0.88 + 0.12 * vermic;
float spots = smoothstep(0.78, 0.92, bwValue(op * vec3(40.0, 18.0, 40.0))) * smoothstep(0.2, 0.32, op.y) * smoothstep(0.08, 0.13, abs(op.x));
ground = mix(ground, vec3(0.62, 0.58, 0.5), spots * 0.6);
diffuseColor.rgb *= ground;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  // Screen-space derivative bump of the feather relief.
  float fh = owlFeather(vOwl) * 0.0018 + bwNoise(vOwl * 260.0) * 0.00025;
  vec3 sx = dFdx(-vViewPosition), sy = dFdy(-vViewPosition);
  vec3 r1 = cross(sy, normal), r2 = cross(normal, sx);
  float det = dot(sx, r1);
  vec3 grad = sign(det) * (dFdx(fh) * r1 + dFdy(fh) * r2);
  normal = normalize(abs(det) * normal - grad);
}`);
  };
  plumage.customProgramCacheKey = () => 'kp-owl-plumage-v1';
  const disc = new THREE.MeshStandardMaterial({ color: '#8a8070', roughness: .95 });
  disc.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vDisc;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvDisc = position;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nvarying vec3 vDisc;\n${KP_NOISE}`).replace('#include <color_fragment>', `#include <color_fragment>
float rad = length(vDisc.xy);
float rays = 0.5 + 0.5 * sin(atan(vDisc.y, vDisc.x) * 38.0 + bwNoise(vDisc * 90.0) * 2.0);
diffuseColor.rgb *= mix(0.75, 1.15, rays * smoothstep(0.012, 0.05, rad)) * (1.0 - smoothstep(0.045, 0.06, rad) * 0.55);`);
  };
  disc.customProgramCacheKey = () => 'kp-owl-disc-v1';
  const dark = new THREE.MeshStandardMaterial({ color: '#2b2621', roughness: .85 });
  const beakMat = new THREE.MeshStandardMaterial({ color: '#3d3c36', roughness: .45 });
  const iris = new THREE.MeshStandardMaterial({ color: '#e5a72f', emissive: '#6b3a06', emissiveIntensity: .08, roughness: .4 });
  const pupil = new THREE.MeshStandardMaterial({ color: '#050505', roughness: .2 });
  const cornea = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: .03, metalness: 0, transparent: true, opacity: .25, clearcoat: 1, clearcoatRoughness: .02, depthWrite: false });
  const part = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, p: [number, number, number], s: [number, number, number] = [1, 1, 1], r: [number, number, number] = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...p); mesh.scale.set(...s); mesh.rotation.set(...r);
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  // Body: an egg-like lathe, fuller at the breast and narrower at the tail.
  const bodyGeo = lathe([[0, 0], [.07, .006], [.118, .05], [.138, .12], [.138, .2], [.124, .27], [.1, .32], [.06, .355], [0, .37]], 36);
  const bp = bodyGeo.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i);
    const breast = z > 0 ? 1 + .14 * Math.sin(Math.min(1, y / .3) * Math.PI) : .86;
    bp.setXYZ(i, x * .95, y, z * breast);
  }
  bodyGeo.computeVertexNormals();
  const body = part(bodyGeo, plumage, group, [0, .02, 0]);
  // Folded wings over the flanks, primaries crossing above the tail.
  for (const side of [-1, 1]) {
    const wing = part(lathe([[0, 0], [.05, .02], [.07, .1], [.068, .2], [.05, .28], [0, .32]], 18), plumage, group, [side * .1, .045, -.035], [.62, 1, 1], [-.12, 0, side * .1]);
    void wing;
    part(new THREE.ConeGeometry(.04, .14, 8), dark, group, [side * .045, .02, -.1], [1, 1, .45], [Math.PI - .35, 0, side * .2]);
  }
  part(new THREE.ConeGeometry(.055, .12, 10), plumage, group, [0, .0, -.075], [1, 1, .4], [Math.PI - .5, 0, 0]);
  // Feet gripping the branch.
  for (const side of [-1, 1]) for (let toe = 0; toe < 3; toe++) {
    part(new THREE.CapsuleGeometry(.008, .035, 3, 6), beakMat, group, [side * .035 + (toe - 1) * .012, -.008, .035], [1, 1, 1], [Math.PI / 2 - .5, 0, 0]);
  }
  // Head with a flattened face, facial disc, ear tufts, eyes and a small hooked beak.
  const head = new THREE.Group(); head.position.set(0, .39, .01); group.add(head);
  part(new THREE.SphereGeometry(.105, 32, 24), plumage, head, [0, 0, 0], [1.06, .94, .9]);
  for (const side of [-1, 1]) {
    const discMesh = part(new THREE.CircleGeometry(.058, 32), disc, head, [side * .043, -.008, .082], [1, 1.12, 1], [0, side * .32, 0]);
    discMesh.castShadow = false;
    part(new THREE.TorusGeometry(.058, .008, 6, 32), dark, head, [side * .043, -.008, .079], [1, 1.12, 1], [0, side * .32, 0]);
  }
  const tufts: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const tuft = new THREE.Group(); tuft.position.set(side * .062, .065, .02); tuft.rotation.set(-.15, 0, side * -.35); head.add(tuft);
    part(taperedTube([new THREE.Vector3(0, 0, 0), new THREE.Vector3(side * .008, .035, -.004), new THREE.Vector3(side * .02, .068, -.012)], t => .02 * (1 - t * .85), 8, 8), plumage, tuft, [0, 0, 0], [1, 1, .55]);
    tufts.push(tuft);
  }
  const lids: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const x = side * .041, z = .088;
    part(new THREE.SphereGeometry(.022, 20, 14), iris, head, [x, .006, z], [1, 1, .55]);
    part(new THREE.CircleGeometry(.0105, 18), pupil, head, [x, .006, z + .0125]).castShadow = false;
    part(new THREE.SphereGeometry(.0235, 20, 14), cornea, head, [x, .006, z + .001], [1, 1, .6]).castShadow = false;
    // Lid: a feathered cap that slides down over the eye when the owl blinks.
    // Hinged at the top of the eye, the dome grows downward to close.
    const lid = part(new THREE.SphereGeometry(.026, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), disc, head, [x, .028, z], [1, .05, .75], [0, 0, Math.PI]);
    lids.push(lid);
  }
  part(new THREE.ConeGeometry(.012, .038, 8), beakMat, head, [0, -.028, .095], [1, 1, .8], [Math.PI / 2 + .55, 0, 0]);
  return { group, head, body, lids, tufts };
}

