import * as THREE from 'three';
import type { SanctuaryBuilder } from './worldTypes';
import { applyTranslucency } from '../shared/render/translucentSurface';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { fbm3, noise3, seeded } from '../shared/render/noise';
import { createSnowfall } from '../shared/render/snowFall';
import { createWarmHaze } from './atmosphere';

/*
 * 포근한 심장 — an original, code-only natural-fantasy chamber. No external assets.
 * One warm core deep in the chamber is the key light: its glow passes through
 * layered, veined membranes (wrapped, thin-sheet transmission), pools in a
 * slow amber haze, and catches a wet film on every fold. The space breathes:
 * light swells and ebbs over seconds, a faint pulse flows along the veins,
 * and membranes lift by a centimetre or two, never in step.
 * A touch sends a slow ring of light and a soft ripple out from the fingertip.
 */

const point = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const smooth = THREE.MathUtils.smoothstep;
const TAU = Math.PI * 2;

/** Gentle breathing in [0, 1]: two incommensurate periods, no sharp beats. */
export const warmBreath = (t: number) => 0.5 + 0.5 * (0.78 * Math.sin(t * 0.62) + 0.22 * Math.sin(t * 0.23 + 1.3));

type Field = (u: number, v: number) => number;
/**
 * A lofted grid surface. `lift` (the surface normal) drives breathing on both faces alike;
 * `thin` scales how much light passes through (thin free edges, thicker roots).
 */
function surface(nu: number, nv: number, at: (u: number, v: number) => THREE.Vector3, thin: Field = () => 1) {
  const positions: number[] = [], uvs: number[] = [], thins: number[] = [], indices: number[] = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
    const p = at(i / nu, j / nv);
    positions.push(p.x, p.y, p.z); uvs.push(i / nu, j / nv); thins.push(thin(i / nu, j / nv));
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + nu + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); g.setIndex(indices);
  g.setAttribute('thin', new THREE.Float32BufferAttribute(thins, 1));
  g.computeVertexNormals();
  g.setAttribute('lift', g.getAttribute('normal').clone());
  return g;
}

/** Two continuous faces and a closed, thin rounded edge: no alpha cut-outs or floating rims. */
function membrane(nu: number, nv: number, at: (u: number, v: number) => THREE.Vector3, thickness: Field = (u, v) => .012 + .014 * Math.sin(u * Math.PI) ** 2 + .004 * Math.sin(v * 11 + u * 5) ** 2, thin: Field = () => 1) {
  const base = surface(nu, nv, at, thin);
  const p = base.getAttribute('position'), n = base.getAttribute('normal'), uv = base.getAttribute('uv'), th = base.getAttribute('thin');
  const positions: number[] = [], uvs: number[] = [], lift: number[] = [], thins: number[] = [], indices: number[] = [];
  for (let face = 0; face < 2; face++) for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i), v = uv.getY(i);
    const t = thickness(u, v) * (face === 0 ? 1 : -1);
    positions.push(p.getX(i) + n.getX(i) * t, p.getY(i) + n.getY(i) * t, p.getZ(i) + n.getZ(i) * t);
    uvs.push(u, v); lift.push(n.getX(i), n.getY(i), n.getZ(i)); thins.push(th.getX(i));
  }
  const src = base.getIndex()!;
  for (let i = 0; i < src.count; i++) indices.push(src.getX(i));
  const faceCount = indices.length;
  for (let i = 0; i < src.count; i += 3) indices.push(src.getX(i) + p.count, src.getX(i + 2) + p.count, src.getX(i + 1) + p.count);
  const edgeStart = indices.length;
  const edge = (a: number, b: number) => { indices.push(a, a + p.count, b, b, a + p.count, b + p.count); };
  for (let i = 0; i < nu; i++) { edge(i + 1, i); edge(nv * (nu + 1) + i, nv * (nu + 1) + i + 1); }
  for (let j = 0; j < nv; j++) { edge(j * (nu + 1), (j + 1) * (nu + 1)); edge((j + 1) * (nu + 1) + nu, j * (nu + 1) + nu); }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('lift', new THREE.Float32BufferAttribute(lift, 3));
  geometry.setAttribute('thin', new THREE.Float32BufferAttribute(thins, 1));
  geometry.setIndex(indices);
  // Front face, reverse face and the rounded edge take materials 0, 1 and 2.
  geometry.addGroup(0, faceCount, 0); geometry.addGroup(faceCount, faceCount, 1); geometry.addGroup(edgeStart, indices.length - edgeStart, 2);
  geometry.computeVertexNormals(); base.dispose();
  return geometry;
}

/** A soft knitted blanket for the nest: V-shaped stitches with fuzzy yarn (tangent-space maps). */
function knitMaps() {
  const size = 512, stitches = 16, cell = size / stitches;
  const col = new Uint8Array(size * size * 4), normal = new Uint8Array(size * size * 4), heights = new Float32Array(size * size);
  const rand = seeded(9172);
  const tone = Array.from({ length: stitches * stitches }, () => .9 + rand() * .1);
  const fuzz = new Float32Array(size * size).map(() => rand() - .5);
  const lobe = (x: number, y: number, cx: number, tilt: number) => {
    const dx = x - cx, dy = y - .5;
    const a = dx * Math.cos(tilt) - dy * Math.sin(tilt), b = dx * Math.sin(tilt) + dy * Math.cos(tilt);
    return Math.exp(-(a * a) / (.034) - (b * b) / (.16));
  };
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const sx = (x % cell) / cell, sy = (y % cell) / cell;
    const h = Math.max(lobe(sx, sy, .29, .42), lobe(sx, sy, .71, -.42));
    const yarn = Math.sin((sx * 2 + sy * 9) * Math.PI) * .04;
    heights[y * size + x] = h * (.92 + yarn) + fuzz[y * size + x] * .05;
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4, h = heights[y * size + x];
    const t = tone[Math.floor(y / cell) * stitches + Math.floor(x / cell)];
    const v = Math.round((.62 + .38 * Math.min(1, h)) * t * 255);
    col[i] = v; col[i + 1] = Math.round(v * .97); col[i + 2] = Math.round(v * .93); col[i + 3] = 255;
    const dx = heights[y * size + (x + 1) % size] - heights[y * size + (x + size - 1) % size];
    const dy = heights[((y + 1) % size) * size + x] - heights[((y + size - 1) % size) * size + x];
    normal[i] = Math.max(0, Math.min(255, 128 + Math.round(dx * 260))); normal[i + 1] = Math.max(0, Math.min(255, 128 + Math.round(dy * 260)));
    normal[i + 2] = 255; normal[i + 3] = 255;
  }
  const map = new THREE.DataTexture(col, size, size, THREE.RGBAFormat);
  const normalMap = new THREE.DataTexture(normal, size, size, THREE.RGBAFormat);
  for (const tex of [map, normalMap]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(9, 20);
    tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true; tex.anisotropy = 4; tex.needsUpdate = true;
  }
  map.colorSpace = THREE.SRGBColorSpace;
  return { map, normalMap };
}

const glsl = (c: THREE.ColorRepresentation) => {
  const color = new THREE.Color(c);
  return `vec3(${color.r.toFixed(4)}, ${color.g.toFixed(4)}, ${color.b.toFixed(4)})`;
};
const f = (n: number) => n.toFixed(4);

export const buildWarmHeart: SanctuaryBuilder = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1c0806');
  // Direct (non-HDR) fallback keeps a warm fog; the volume pass replaces it.
  const fallbackFog = new THREE.FogExp2('#5a2a1e', .045);
  scene.fog = fallbackFog;
  const camera = new THREE.PerspectiveCamera(49, 1, .06, 80);
  const noise = createNoiseVolume(48, 23);
  const life = {
    uLifeTime: { value: 0 },
    uBreath: { value: warmBreath(0) },
    uTouchPos: { value: point(0, -50, 0) },
    uTouchAge: { value: -1 },
  };
  const core = point(-.05, 1.6, -11.9);

  /*
   * Living tissue: world-space veins (ridged noise), mottling and cell texture
   * drive albedo, thinness (light through), a raised bump and a wet clear coat.
   * A slow pulse travels outward along the veins; a touch adds a ring of light.
   */
  interface TissueOptions { key: string; color: string; vein: string; thin: number; glow: number; roughness: number; clearcoat: number; lift: number; scale?: number; sheen?: number; bump?: number; outside?: number }
  function tissue(o: TissueOptions) {
    const material = new THREE.MeshPhysicalMaterial({
      color: o.color, roughness: o.roughness, metalness: 0, clearcoat: o.clearcoat, clearcoatRoughness: .22,
      sheen: o.sheen ?? .35, sheenColor: new THREE.Color('#ffc9b0'), sheenRoughness: .55, side: THREE.DoubleSide,
    });
    applyTranslucency(material, {
      key: `warm-tissue-${o.key}`, color: new THREE.Color(1.0, .52, .3), forward: 1.25, diffuse: .95, distortion: .22, power: 3.2,
      wrap: .55, wrapTint: new THREE.Color(1.0, .38, .26), uniforms: { ...life, uTissueNoise: { value: noise } },
      declarations: 'precision highp sampler3D; uniform sampler3D uTissueNoise; uniform float uLifeTime; uniform float uBreath; uniform vec3 uTouchPos; uniform float uTouchAge; varying float vTissueThin;',
      thickness: `
vec3 tp = vTranslucentWorld * ${f(o.scale ?? 1)};
// Broad structure comes from the shared noise volume (one fetch holds four octaves),
// which keeps the per-pixel ALU noise to two fine layers on a phone GPU.
vec4 tn = texture(uTissueNoise, tp * .085);
vec4 tw = texture(uTissueNoise, tp * .19 + .37);
float tMottle = (tn.r - .5) * 1.5 + (tn.g - .5) * .75;
vec3 tWarp = tp + (tw.rgb - .5) * 1.1;
float tBig = 1.0 - abs(texture(uTissueNoise, tWarp * .1 + .5).g * 2.0 - 1.0);
float tSmall = 1.0 - abs(texture(uTissueNoise, tWarp * .33 + .13).b * 2.0 - 1.0);
float tAA = clamp(1.4 - length(fwidth(tp)) * 9.0, 0.0, 1.0);
float tVein = clamp(smoothstep(.93, .99, tBig) * .9 + .45 * smoothstep(.95, .995, tSmall) * smoothstep(.4, .62, tn.a) * tAA, 0.0, 1.0);
float tCells = bwNoise(tp * 7.5) * tAA;
// Fine silky fibrils running along the chamber, faded before they alias.
float tFibre = bwNoise(vec3(tp.x * 34.0, tp.y * 34.0, tp.z * 2.2)) * clamp(1.4 - length(fwidth(tp)) * 40.0, 0.0, 1.0);
diffuseColor.rgb *= .8 + .28 * tMottle + .05 * tCells + .06 * tFibre;
diffuseColor.rgb = mix(diffuseColor.rgb, ${glsl(o.vein)}, tVein * .5);
translucentThin = ${f(o.thin)} * vTissueThin * (1.0 - .22 * tVein) * (.85 + .3 * tMottle) * (.92 + .16 * tFibre);
`,
    });
    const previous = material.onBeforeCompile;
    material.onBeforeCompile = (shader, renderer) => {
      previous.call(material, shader, renderer);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute vec3 lift;\nattribute float thin;\nvarying float vTissueThin;\nuniform float uLifeTime; uniform float uBreath; uniform vec3 uTouchPos; uniform float uTouchAge;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  // Breathing lift along the mid-surface normal, phased across the chamber; a touch ripple.
  float phase = dot(position, vec3(.11, .17, -.29));
  float breathe = (uBreath - .5) * ${f(o.lift)} + sin(uLifeTime * .41 + phase * 2.0) * ${f(o.lift * .35)};
  float touch = 0.0;
  if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
    float d = distance(position, uTouchPos);
    float r = uTouchAge * .55;
    touch = exp(-pow((d - r) / .45, 2.0)) * exp(-uTouchAge * .33) * smoothstep(0.0, .5, uTouchAge) * .03;
  }
  transformed += lift * (breathe + touch);
  vTissueThin = thin;
}`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor * (.8 + .35 * tCells + .25 * tVein), .12, 1.0);
`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, tVein * .006 + tMottle * .008 + tCells * .0014 + tFibre * .0004, ${f(o.bump ?? 1)});
`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float flow = .5 + .5 * sin(uLifeTime * .55 - dot(vTranslucentWorld, vec3(.03, .08, -.24)) * 3.0 + tMottle * 2.4);
  totalEmissiveRadiance += vec3(1.0, .42, .16) * tVein * ${f(o.glow)} * (.2 + .8 * flow * flow) * (.65 + .35 * uBreath);
  // Warm light filtering in from beyond the walls: brighter overhead and toward the core,
  // in soft patches where tissue thins. Veins read as darker threads against it.
  vec3 wp = vTranslucentWorld;
  float field = (.45 + .55 * smoothstep(-.2, 4.2, wp.y)) * (.55 + .7 * smoothstep(1.0, 10.0, -wp.z));
  field *= .55 + .75 * smoothstep(.36, .64, texture(uTissueNoise, wp * .045 + vec3(.3, 0.0, uLifeTime * .0015)).r);
  totalEmissiveRadiance += vec3(1.5, .66, .66) * ${f(o.outside ?? 0)} * field * translucentTransmit * (.8 + .3 * uBreath);
  if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
    float d = distance(vTranslucentWorld, uTouchPos);
    float r = uTouchAge * .55;
    float ring = exp(-pow((d - r) / (.3 + uTouchAge * .05), 2.0)) * exp(-uTouchAge * .3) * smoothstep(0.0, .6, uTouchAge);
    float bloom = exp(-d * d / (.15 + uTouchAge * .25)) * exp(-uTouchAge * .45) * smoothstep(0.0, .4, uTouchAge);
    totalEmissiveRadiance += vec3(1.0, .55, .26) * (ring * (.35 + 1.1 * tVein) + bloom * .35) * (.6 + .4 * translucentThin);
  }
}
`);
    };
    const base = material.customProgramCacheKey.bind(material);
    material.customProgramCacheKey = () => `${base()}|warm-tissue-life-v1|${o.key}`;
    return material;
  }

  const wallTissue = tissue({ key: 'wall', color: '#c4838a', vein: '#a8303a', thin: .3, glow: .05, roughness: .85, clearcoat: 0, lift: .018, scale: .9, bump: .1, outside: .6, sheen: .12 });
  const veilTissue = tissue({ key: 'veil', color: '#fbdccc', vein: '#cc3a36', thin: 1.0, glow: .12, roughness: .42, clearcoat: .5, lift: .022, sheen: .5, bump: .7, outside: .9 });
  const roseTissue = tissue({ key: 'rose', color: '#f5b8b8', vein: '#c0303c', thin: .85, glow: .1, roughness: .44, clearcoat: .5, lift: .02, sheen: .45, bump: .7, outside: .8 });
  const floorTissue = tissue({ key: 'floor', color: '#b47a72', vein: '#a03038', thin: .22, glow: .04, roughness: .62, clearcoat: .3, lift: .008, scale: 1.2, bump: .5, outside: .15 });

  const knit = knitMaps();
  const lipKnit = { map: knit.map.clone(), normalMap: knit.normalMap.clone() };
  lipKnit.map.repeat.set(16, 4); lipKnit.normalMap.repeat.set(16, 4);
  const cloth = (maps: { map: THREE.Texture; normalMap: THREE.Texture }, color: string, key: string) => applyTranslucency(new THREE.MeshPhysicalMaterial({
    color, ...maps, normalScale: new THREE.Vector2(.9, .9), roughness: .95, sheen: .9,
    sheenColor: new THREE.Color('#ffe3cc'), sheenRoughness: .7, side: THREE.DoubleSide,
  }), {
    key, color: new THREE.Color(1, .6, .42), forward: .25, diffuse: .45, distortion: .2, power: 2, wrap: .5, wrapTint: new THREE.Color(1, .52, .4),
    uniforms: life, declarations: 'uniform float uTouchAge; uniform vec3 uTouchPos;',
    // The blanket answers a touch too: a slow warm ring spreading through the knit.
    thickness: `
if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
  float d = distance(vTranslucentWorld, uTouchPos);
  float ring = exp(-pow((d - uTouchAge * .45) / (.22 + uTouchAge * .04), 2.0)) * exp(-uTouchAge * .35) * smoothstep(0.0, .6, uTouchAge);
  float bloom = exp(-d * d / (.08 + uTouchAge * .15)) * exp(-uTouchAge * .5) * smoothstep(0.0, .4, uTouchAge);
  translucentThin += ring * 2.0;
  totalEmissiveRadiance += vec3(1.0, .5, .24) * diffuseColor.rgb * (ring * .45 + bloom * .3);
}
`,
  });
  const clothMaterial = cloth(knit, '#f7e4d4', 'warm-cloth');
  const clothUnder = cloth(knit, '#d8ad95', 'warm-cloth-under');
  const lipMaterial = cloth(lipKnit, '#f4e0cf', 'warm-cloth-lip');

  const habitat = new THREE.Group(); scene.add(habitat);
  const targets: THREE.Object3D[] = [];
  function add(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], touch = true) {
    const mesh = new THREE.Mesh(geometry, material);
    habitat.add(mesh); if (touch) targets.push(mesh); return mesh;
  }

  // The chamber: one continuous lofted wall with deep noise folds, narrowing to a throat
  // before the core's alcove and closing behind it. More rings near the viewer.
  const centreY = 1.35;
  const profile = (z: number) => {
    let p = THREE.MathUtils.lerp(1, .58, smooth(-z, 3.2, 9.4));
    p = THREE.MathUtils.lerp(p, .8, smooth(-z, 10.2, 12.4));
    return p * Math.sqrt(THREE.MathUtils.clamp((z + 16.6) / 3.6, 0, 1));
  };
  const wallAt = (theta: number, z: number) => {
    const s = Math.sin(theta), c = Math.cos(theta);
    const prof = profile(z);
    const ry = THREE.MathUtils.lerp(1.75, 3.25, smooth(s, -.4, .4));
    const floorCalm = smooth(s, -.95, -.45);
    const folds = fbm3(c * 1.25 + 4, s * 1.25, z * .2, 4) * .55 + fbm3(c * 3.1, s * 3.1 + 2, z * .55 + 9, 3) * .14;
    const pleat = .07 * Math.sin(theta * 6 + z * .35 + fbm3(c, s, z * .3 + 3, 2) * 4) * smooth(s, -.3, .3);
    const r = 1 + (folds + pleat) * floorCalm * .4;
    const cx = .22 * Math.sin(z * .21), cy = centreY + .18 * Math.sin(z * .17 + 1) + (1 - prof) * .35;
    return point(cx + c * 4.35 * prof * r, cy + s * ry * prof * r, z + fbm3(c * 2, s * 2, z * .4, 2) * .35 * floorCalm);
  };
  add(surface(232, 176, (u, v) => wallAt(-Math.PI / 2 + u * TAU, 6.4 - 23.2 * Math.pow(v, 1.18))), wallTissue);

  // A broad floor of soft tissue, curving up into the walls beneath the nest cloth.
  const floorHeight = (x: number, z: number) => -.12 + .07 * Math.sin(z * .53 + x * .39) + .06 * Math.cos(x * 1.1)
    + fbm3(x * .5, z * .5, 3.3, 3) * .12 + Math.pow(Math.abs(x) / 4.4, 3) * .9 + smooth(-z, 4, 10) * .55;
  add(surface(150, 170, (u, v) => {
    const x = (u - .5) * 9.6, z = 6.4 - 17.4 * Math.pow(v, 1.12);
    return point(x, floorHeight(x, z), z);
  }), floorTissue);

  // Petals: layered translucent leaves growing from the walls, tapering to points along
  // their length, each free edge curling inward. Gaps between them show the glowing wall.
  const wallBase = (theta: number, z: number) => {
    const s = Math.sin(theta), c = Math.cos(theta);
    const prof = profile(z);
    const ry = THREE.MathUtils.lerp(1.75, 3.25, smooth(s, -.4, .4));
    const cx = .22 * Math.sin(z * .21), cy = centreY + .18 * Math.sin(z * .17 + 1) + (1 - prof) * .35;
    return { centre: new THREE.Vector2(cx, cy), offset: new THREE.Vector2(c * 4.35 * prof, s * ry * prof) };
  };
  interface PetalSpec { from: number; to: number; near: number; far: number; inset: number; seed: number; materials: THREE.Material[] }
  const petals: PetalSpec[] = [
    { from: Math.PI + .16, to: Math.PI - .88, near: 1.2, far: -6.4, inset: .85, seed: 1, materials: [veilTissue, roseTissue, veilTissue] },
    { from: -.2, to: .92, near: .6, far: -7.6, inset: .85, seed: 2, materials: [roseTissue, veilTissue, roseTissue] },
    { from: 2.55, to: 1.62, near: -2.6, far: -9.0, inset: .8, seed: 3, materials: [roseTissue, veilTissue, roseTissue] },
    { from: .42, to: 1.45, near: -4.4, far: -9.6, inset: .7, seed: 4, materials: [veilTissue, roseTissue, veilTissue] },
    { from: Math.PI + .1, to: Math.PI - .75, near: -6.0, far: -9.8, inset: .55, seed: 5, materials: [veilTissue, roseTissue, veilTissue] },
  ];
  const backLights: THREE.Vector3[] = [];
  for (const o of petals) {
    add(membrane(92, 84, (u, v) => {
      const taper = Math.pow(Math.sin(Math.PI * (.04 + .92 * v)), .7);
      const along = fbm3(v * 2.4 + o.seed * 3.1, o.seed, 2.2, 3);
      const theta = o.from + (o.to - o.from) * u * taper * (1 + along * .2);
      const z = o.near + (o.far - o.near) * v;
      const n = fbm3(u * 2.1 + o.seed * 5, v * 3.3, o.seed * .7, 4);
      // Cupped across its width, with a raised rib running its length.
      const rib = Math.exp(-(((u - .34) / .045) ** 2)) * .035 * taper;
      const lift = -.12 + o.inset * Math.pow(u, 1.3) * taper * (.8 + .3 * Math.sin(v * Math.PI * 2 + o.seed)) + n * .16 * u + Math.sin(u * Math.PI) * .24 * taper + rib;
      const curl = Math.pow(u, 5) * .3 * taper;
      const { centre, offset } = wallBase(theta, z);
      const radius = offset.length();
      const k = Math.max(.15, 1 - lift / Math.max(radius, .5));
      const ripple = .04 * Math.sin(u * 11 + v * 13 + n * 4) * u;
      // A ruffled free edge, like the rim of a petal.
      const ruffle = Math.sin(v * 27 + o.seed * 2 + n * 5) * .14 * Math.pow(u, 2.5) * taper;
      return point(centre.x + offset.x * k + ripple, centre.y + offset.y * k - curl + ripple * .5 + ruffle * .5, z + n * .35 + ruffle + curl * .4 * Math.sign(o.far - o.near));
    }, undefined, (u, v) => (.4 + .6 * Math.pow(u, .7)) * (.6 + .4 * Math.sin(Math.PI * v)) * (1 - .45 * Math.exp(-(((u - .34) / .03) ** 2)))), o.materials);
    // A warm source hidden in the fold behind each petal back-lights it.
    const { centre, offset } = wallBase(o.from + (o.to - o.from) * .4, (o.near + o.far) / 2);
    backLights.push(point(centre.x + offset.x * (1 - o.inset * .25 / Math.max(offset.length(), .5)), centre.y + offset.y * (1 - o.inset * .25 / Math.max(offset.length(), .5)), (o.near + o.far) / 2));
  }

  // Iris veils around the throat: two continuous rings (no radial seams to read as
  // sticks), cupped toward the core, with soft scalloped openings that let it show.
  const throatZ = -9.6;
  for (let k = 0; k < 2; k++) {
    const zBase = throatZ - .35 - k * .95;
    const prof = profile(zBase);
    const cx = .22 * Math.sin(zBase * .21), cy = centreY + .18 * Math.sin(zBase * .17 + 1) + (1 - prof) * .35;
    add(membrane(192, 40, (u, v) => {
      const theta = u * TAU + k * .9;
      const s = Math.sin(theta), c = Math.cos(theta);
      const ry = THREE.MathUtils.lerp(1.75, 3.25, smooth(s, -.4, .4));
      // The opening: wide scallops plus noise, a little smaller on the second ring.
      const open = (k ? .4 : .5) + .12 * Math.sin(theta * 3 + k * 2) + .07 * Math.sin(theta * 7 + 1.3 + k) + noise3(c * 1.6 + k, s * 1.6, 3.1) * .1;
      const radius = (1.03 - v * (1 - open)) * (1 + noise3(c * 3, s * 3, v * 2 + k) * .05 * v);
      const cup = Math.sin(v * Math.PI * .9) * .5 + v * v * .35;
      return point(cx + c * 4.35 * prof * radius, cy + s * ry * prof * radius, zBase - cup + noise3(c * 2.2, s * 2.2 + k, v * 3) * .22);
    }, (u, v) => .008 + .012 * (1 - v * .7), (u, v) => .45 + .55 * v), [veilTissue, roseTissue, veilTissue]);
  }

  // The nest: two soft cloth mounds and a folded lip at the viewer's knees.
  for (let side = 0; side < 2; side++) {
    add(membrane(84, 76, (u, v) => {
      const sign = side === 0 ? -1 : 1;
      const innerCurve = .26 * Math.sin(v * Math.PI) + .12 * Math.sin(v * 4.7);
      const x = sign * (.68 + innerCurve + u * 3.6), z = 5.4 - v * 8.0 + side * .55;
      const taper = smooth(v, 0, .13) * (1 - smooth(v, .81, 1));
      const mound = Math.sin(u * Math.PI) ** .64;
      const loft = mound * (.47 + .24 * Math.sin(v * 3.8 + side)) + .09 * Math.sin(u * 10 + v * 3.5) * Math.sin(u * Math.PI) + fbm3(u * 3 + side, v * 4, 1.5, 3) * .08 * mound;
      return point(x, floorHeight(x, z) - .05 + loft * taper, z);
    }), [clothMaterial, clothUnder, clothUnder]);
  }
  add(membrane(130, 44, (u, v) => {
    const x = (u - .5) * 6.6;
    const n = fbm3(u * 5, v * 2, 8.8, 3);
    return point(x, floorHeight(x, 2.2) + .2 + Math.sin(v * Math.PI) * (.22 + .09 * Math.sin(u * 9) + n * .06) + .024 * Math.sin(u * 44) * Math.sin(v * Math.PI), 1.65 + v * 1.45 + .18 * Math.sin(u * 7));
  }), [lipMaterial, clothUnder, clothUnder]);

  // The warm core: an HDR heart of light with slow inner currents; never a flat blob.
  const coreUniforms = { uLifeTime: life.uLifeTime, uBreath: life.uBreath, uNoise: { value: noise } };
  const coreGeometry = new THREE.IcosahedronGeometry(1, 5);
  {
    const pos = coreGeometry.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const k = 1 + fbm3(x * 1.4, y * 1.4, z * 1.4, 3) * .16;
      pos.setXYZ(i, x * k * .74, y * k * .9, z * k * .74);
    }
    coreGeometry.computeVertexNormals();
  }
  const coreMesh = new THREE.Mesh(coreGeometry, new THREE.ShaderMaterial({
    uniforms: coreUniforms,
    vertexShader: /* glsl */ `
varying vec3 vNormalV; varying vec3 vViewV; varying vec3 vLocal;
void main() {
  vLocal = position;
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  vViewV = -view.xyz; vNormalV = normalMatrix * normal;
  gl_Position = projectionMatrix * view;
}`,
    fragmentShader: /* glsl */ `
precision highp sampler3D;
uniform sampler3D uNoise; uniform float uLifeTime; uniform float uBreath;
varying vec3 vNormalV; varying vec3 vViewV; varying vec3 vLocal;
void main() {
  float facing = clamp(dot(normalize(vNormalV), normalize(vViewV)), 0.0, 1.0);
  vec3 q = vLocal * .55 + vec3(0.0, uLifeTime * .012, uLifeTime * .007);
  float n = dot(texture(uNoise, q), vec4(.5, .3, .2, 0.0));
  float currents = smoothstep(.35, .75, n);
  float depth = pow(facing, 1.6);
  vec3 deep = vec3(5.5, 2.3, 1.0), hot = vec3(16.0, 10.0, 5.6), rim = vec3(2.4, .7, .45);
  vec3 c = mix(rim, mix(deep, hot, currents * .7 + depth * .3), depth);
  c *= .82 + .3 * uBreath;
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  }));
  coreMesh.position.copy(core);
  scene.add(coreMesh);

  // One strong, motivated key (the core); fake bounce from the lit veils and walls; a dim ambient.
  const coreLight = new THREE.PointLight('#ffc996', 80, 0, 2); coreLight.position.copy(core).add(point(0, .1, 1.0)); scene.add(coreLight);
  // Two folds hide warm sources that shine through the nearest petals.
  const foldLights = [backLights[0], backLights[1]].map((position, i) => {
    const light = new THREE.PointLight(i ? '#ff9686' : '#ffae84', i ? 9 : 11, 0, 2);
    light.position.copy(position); scene.add(light); return light;
  });
  const nearBounce = new THREE.PointLight('#ffc2a0', 6, 0, 2); nearBounce.position.set(-.4, 2.8, 2.9); scene.add(nearBounce);
  scene.add(new THREE.HemisphereLight('#ffcdb2', '#3a130d', .12));

  // Drifting motes, lit by the core when near it.
  const motes = createSnowfall({
    seed: 7713,
    keyDirection: core.clone().sub(point(0, 1.2, 4.5)).normalize(),
    keyColor: new THREE.Color(.02, .009, .004),
    ambient: new THREE.Color(.03, .014, .008),
    lights: [{ position: core.clone(), color: new THREE.Color(22, 9, 3) }],
    layers: [
      { count: 380, min: point(-3.4, -.1, -12), max: point(3.4, 4.2, 3.6), size: [.012, .03], speed: [-.035, .03], sway: .35, softness: .5, opacity: .8, brightness: 1.6, focus: 1.6 },
      { count: 70, min: point(-1.6, .4, .6), max: point(1.8, 2.6, 3.4), size: [.012, .026], speed: [-.025, .02], sway: .25, softness: .9, opacity: .4, brightness: 1.4, focus: 2.2 },
    ],
  });
  scene.add(motes.group);

  let environment: THREE.WebGLRenderTarget | null = null;
  let haze: ReturnType<typeof createWarmHaze> | null = null;
  const raycaster = new THREE.Raycaster();
  let now = 0, touchAt = -100;
  function resize(aspect: number) {
    camera.aspect = aspect;
    if (aspect < .85) { camera.fov = 60; camera.position.set(.1, 1.2, 4.6); camera.lookAt(-.08, 1.6, -5.2); }
    else { camera.fov = aspect > 1.9 ? 46 : 50; camera.position.set(.1, 1.24, 4.55); camera.lookAt(-.12, 1.62, -4.9); }
    camera.updateProjectionMatrix();
  }
  resize(1);
  return {
    scene, camera, resize,
    post: {
      exposure: 1.05, bloomStrength: .2, bloomThreshold: 0, aoStrength: .75, aoRadius: .55,
      saturation: .98, contrast: 1.12, shadowTint: [.9, .86, 1.12], highlightTint: [1.04, 1.0, .95], vignette: .5, grain: .022,
    },
    prepare(renderer) {
      // A warm radiance probe: the chamber's glow for wet reflections, never a flat fill.
      const probe = new THREE.Scene();
      const dome = new THREE.Mesh(new THREE.SphereGeometry(20, 48, 24), new THREE.ShaderMaterial({
        side: THREE.BackSide, uniforms: { uCore: { value: core.clone().sub(point(0, 1.2, 4.5)).normalize() } },
        vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: `uniform vec3 uCore; varying vec3 vDir;
void main(){
  vec3 d = normalize(vDir);
  vec3 c = mix(vec3(.05, .014, .01), vec3(.22, .07, .05), smoothstep(-.6, .5, d.y));
  float toward = max(dot(d, uCore), 0.0);
  c += vec3(2.6, .95, .3) * pow(toward, 24.0) + vec3(.35, .12, .05) * pow(toward, 4.0);
  gl_FragColor = vec4(c, 1.0);
}`,
      }));
      probe.add(dome);
      const pmrem = new THREE.PMREMGenerator(renderer);
      environment = pmrem.fromScene(probe, 0, .1, 60);
      pmrem.dispose();
      dome.geometry.dispose(); (dome.material as THREE.Material).dispose();
      scene.environment = environment.texture;
      scene.environmentIntensity = .45;
    },
    createVolume() {
      haze = createWarmHaze({
        noise, core: core.clone(), coreColor: new THREE.Color(1.0, .6, .42).multiplyScalar(2.2), coreGlow: .055,
        ambient: new THREE.Color(.04, .018, .02), density: .05, floorDensity: .8, gain: 1, maxDistance: 24,
      });
      return haze;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update(elapsed) {
      now = elapsed;
      const breath = warmBreath(elapsed);
      life.uLifeTime.value = elapsed;
      life.uBreath.value = breath;
      life.uTouchAge.value = touchAt < 0 ? -1 : elapsed - touchAt;
      coreLight.intensity = 80 * (.86 + .22 * breath);
      // The fold lights drift on their own slow phases, never in step with the core.
      foldLights[0].intensity = 11 * (.85 + .18 * warmBreath(elapsed * .83 + 2.1));
      foldLights[1].intensity = 9 * (.85 + .18 * warmBreath(elapsed * .71 + 4.4));
      coreMesh.scale.setScalar(1 + .025 * (breath - .5));
      motes.update(elapsed);
      if (haze) {
        haze.uniforms.uBreath.value = breath;
        haze.uniforms.uTouchAge.value = life.uTouchAge.value;
        haze.uniforms.uTouchPos.value.copy(life.uTouchPos.value);
      }
    },
    interact(ndc) {
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(true); raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(targets, false)[0];
      if (!hit) return undefined;
      touchAt = now; life.uTouchPos.value.copy(hit.point); life.uTouchAge.value = 0;
      return { kind: 'warmth', strength: .27, x: THREE.MathUtils.clamp(ndc.x, -1, 1) };
    },
    dispose() {
      environment?.dispose(); environment = null;
      // The haze material belongs to the pipeline; the noise volume it shares is released here (a repeat dispose is a no-op).
      noise.dispose();
    },
  };
};
