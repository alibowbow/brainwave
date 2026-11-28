import * as THREE from 'three';
import type { SanctuaryBuilder } from './worldTypes';
import { applyTranslucency } from '../shared/render/translucentSurface';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { fbm3, noise3, seeded } from '../shared/render/noise';
import { createSnowfall } from '../shared/render/snowFall';
import { createWarmHaze } from './atmosphere';

/*
 * 포근한 심장 — an original, code-only glowing cocoon. No external assets.
 * A gentle sun inside a bud of petals is the key light: its glow passes through
 * many thin, silk-like petals (wrapped, thin-sheet transmission with fine pale
 * venation), pools in a slow honey haze and catches cocoon silk and a satin
 * sheen. Peach, apricot and honey-gold, with soft rose only in the deepest
 * shade. The space breathes:
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
  scene.background = new THREE.Color('#3a1f14');
  // Direct (non-HDR) fallback keeps a warm fog; the volume pass replaces it.
  const fallbackFog = new THREE.FogExp2('#c08a68', .035);
  scene.fog = fallbackFog;
  const camera = new THREE.PerspectiveCamera(49, 1, .06, 80);
  const noise = createNoiseVolume(48, 23);
  const life = {
    uLifeTime: { value: 0 },
    uBreath: { value: warmBreath(0) },
    uTouchPos: { value: point(0, -50, 0) },
    uTouchAge: { value: -1 },
  };
  const core = point(-.05, 1.6, -11.6);

  /*
   * Silk-like living membrane: soft mottling and pale, fine venation (world-space on
   * the walls, long fibrous streaks along each petal) thin the sheet so light passes
   * through; a satin sheen, never a wet film. Broad structure comes from the shared
   * noise volume, so the shader needs no per-pixel ALU noise at all.
   * A slow pulse of light travels along the veins; a touch spreads a ring of light.
   */
  interface TissueOptions {
    key: string; color: string; vein: string; thin: number; glow: number; roughness: number; lift: number;
    scale?: number; sheen?: number; bump?: number; outside?: number; satin?: number; specular?: number; fibrous?: boolean; coreGlow?: number;
  }
  function tissue(o: TissueOptions) {
    const material = new THREE.MeshPhysicalMaterial({
      color: o.color, roughness: o.roughness, metalness: 0, clearcoat: o.satin ?? 0, clearcoatRoughness: .5,
      sheen: o.sheen ?? .4, sheenColor: new THREE.Color('#fff0dc'), sheenRoughness: .75, specularIntensity: o.specular ?? .5,
      side: THREE.DoubleSide,
    });
    applyTranslucency(material, {
      key: `warm-tissue-${o.key}`, color: new THREE.Color(1.0, .76, .5), forward: 1.3, diffuse: 1.0, distortion: .22, power: 3,
      wrap: .55, wrapTint: new THREE.Color(1.0, .66, .48), uniforms: { ...life, uTissueNoise: { value: noise }, uCorePos: { value: core } },
      declarations: 'precision highp sampler3D; uniform sampler3D uTissueNoise; uniform vec3 uCorePos; uniform float uLifeTime; uniform float uBreath; uniform vec3 uTouchPos; uniform float uTouchAge; varying float vTissueThin; varying vec2 vTissueUv;',
      thickness: `
vec3 tp = vTranslucentWorld * ${f(o.scale ?? 1)};
vec4 tn = texture(uTissueNoise, tp * .085);
float tMottle = (tn.r - .5) * 1.2 + (tn.g - .5) * .6;
float tVein;
${o.fibrous ? `
// Fine venation running the length of the petal and converging toward its tip,
// like leaf veins or silk fibres; faded before it could alias.
vec2 fuv = vTissueUv;
float fScale = 3.0 * (1.15 - fuv.y * .55);
float fFade = clamp(1.4 - length(fwidth(vec2(fuv.x * fScale * 16.0, fuv.y * 5.0))) * .8, 0.0, 1.0);
float fStreak = texture(uTissueNoise, vec3(fuv.x * fScale + fuv.y * .2, fuv.y * .32, tn.a * .5 + tp.x * .031 + tp.z * .017)).b;
tVein = smoothstep(.9, .985, 1.0 - abs(fStreak * 2.0 - 1.0)) * fFade;` : `
vec3 tWarp = tp + (texture(uTissueNoise, tp * .19 + .37).rgb - .5) * 1.1;
float tBig = 1.0 - abs(texture(uTissueNoise, tWarp * .1 + .5).g * 2.0 - 1.0);
tVein = smoothstep(.95, .992, tBig) * .6 * clamp(1.4 - length(fwidth(tp)) * 9.0, 0.0, 1.0);`}
diffuseColor.rgb *= .9 + .2 * tMottle;
diffuseColor.rgb = mix(diffuseColor.rgb, ${glsl(o.vein)}, tVein * .16);
translucentThin = ${f(o.thin)} * vTissueThin * (1.0 - .08 * tVein) * (.9 + .2 * tMottle);
`,
    });
    const previous = material.onBeforeCompile;
    material.onBeforeCompile = (shader, renderer) => {
      previous.call(material, shader, renderer);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute vec3 lift;\nattribute float thin;\nvarying float vTissueThin;\nvarying vec2 vTissueUv;\nuniform float uLifeTime; uniform float uBreath; uniform vec3 uTouchPos; uniform float uTouchAge;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  // Breathing lift along the mid-surface normal, phased across the chamber; a touch ripple.
  float phase = dot(position, vec3(.11, .17, -.29));
  float breathe = (uBreath - .5) * ${f(o.lift)} + sin(uLifeTime * .41 + phase * 2.0) * ${f(o.lift * .35)};
  float touch = 0.0;
  if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
    float d = distance(position, uTouchPos);
    float r = uTouchAge * .5;
    touch = exp(-pow((d - r) / .4, 2.0)) * exp(-uTouchAge * .3) * smoothstep(0.0, .5, uTouchAge) * .045;
  }
  transformed += lift * (breathe + touch);
  vTissueThin = thin;
  vTissueUv = uv;
}`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor * (.92 + .12 * tMottle), .2, 1.0);
`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, tVein * .0012 + tMottle * .004, ${f(o.bump ?? .5)});
`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float flow = .5 + .5 * sin(uLifeTime * .5 - dot(vTranslucentWorld, vec3(.03, .06, -.2)) * 3.0 + tMottle * 2.0);
  totalEmissiveRadiance += vec3(1.0, .74, .44) * tVein * ${f(o.glow)} * (.3 + .7 * flow * flow) * (.7 + .3 * uBreath);
  // Honey light filtering in from beyond the cocoon: brighter overhead and toward the core,
  // in soft patches where the membrane thins.
  vec3 wp = vTranslucentWorld;
  float field = (.5 + .5 * smoothstep(-.2, 4.2, wp.y)) * (.6 + .6 * smoothstep(1.0, 10.0, -wp.z));
  field *= .7 + .5 * smoothstep(.36, .64, texture(uTissueNoise, wp * .045 + vec3(.3, 0.0, uLifeTime * .0015)).r);
  totalEmissiveRadiance += vec3(1.45, 1.0, .66) * ${f(o.outside ?? 0)} * field * translucentTransmit * (.82 + .25 * uBreath);
  // The core's light passing through the membranes closest to it: the glow of a sun in a bud.
  vec3 toCore = uCorePos - wp;
  totalEmissiveRadiance += vec3(2.4, 1.75, 1.05) * ${f(o.coreGlow ?? .25)} * translucentTransmit * (.82 + .3 * uBreath) / (dot(toCore, toCore) * .9 + .35);
  if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
    float d = distance(vTranslucentWorld, uTouchPos);
    float r = uTouchAge * .5;
    float ring = exp(-pow((d - r) / (.2 + uTouchAge * .04), 2.0)) * exp(-uTouchAge * .26) * smoothstep(0.0, .5, uTouchAge);
    float bloom = exp(-d * d / (.12 + uTouchAge * .2)) * exp(-uTouchAge * .42) * smoothstep(0.0, .35, uTouchAge);
    totalEmissiveRadiance += vec3(1.0, .76, .48) * (ring * (1.2 + .8 * tVein) + bloom * .6) * (.7 + .5 * translucentThin);
  }
}
`);
    };
    const base = material.customProgramCacheKey.bind(material);
    material.customProgramCacheKey = () => `${base()}|warm-tissue-life-v2|${o.key}`;
    return material;
  }

  const wallTissue = tissue({ key: 'wall', color: '#eab493', vein: '#d9986c', thin: .36, glow: .03, roughness: 1, specular: .15, sheen: .25, bump: 0, outside: .72, coreGlow: 3, lift: .018, scale: .9 });
  const floorTissue = tissue({ key: 'floor', color: '#dca486', vein: '#c88c6c', thin: .25, glow: .03, roughness: .9, specular: .3, satin: .05, sheen: .35, bump: .3, outside: .3, lift: .008, scale: 1.2 });
  const honeyPetal = tissue({ key: 'honey', color: '#ffe5c6', vein: '#f2bd84', thin: 1, glow: .12, roughness: .55, specular: .45, satin: .1, sheen: .55, bump: .5, outside: 1.0, lift: .02, fibrous: true });
  const apricotPetal = tissue({ key: 'apricot', color: '#ffd4b0', vein: '#eca874', thin: .95, glow: .1, roughness: .55, specular: .45, satin: .1, sheen: .5, bump: .5, outside: .95, lift: .02, fibrous: true });
  const budPetal = tissue({ key: 'bud', color: '#ffdcb8', vein: '#f0b07a', thin: .8, glow: .1, roughness: .6, specular: .3, satin: 0, sheen: .4, bump: .4, outside: .2, coreGlow: 1, lift: .012, fibrous: true });
  const fallenPetal = tissue({ key: 'fallen', color: '#f6c6a2', vein: '#e3a27a', thin: .8, glow: .05, roughness: .7, specular: .3, satin: 0, sheen: .5, bump: .4, outside: .25, coreGlow: .1, lift: .004, fibrous: true });
  const blushPetal = tissue({ key: 'blush', color: '#fbcfbd', vein: '#e8a48a', thin: .9, glow: .1, roughness: .58, specular: .45, satin: .08, sheen: .5, bump: .5, outside: .9, lift: .02, fibrous: true });

  const knit = knitMaps();
  const lipKnit = { map: knit.map.clone(), normalMap: knit.normalMap.clone() };
  lipKnit.map.repeat.set(16, 4); lipKnit.normalMap.repeat.set(16, 4);
  const cloth = (maps: { map: THREE.Texture; normalMap: THREE.Texture }, color: string, key: string) => applyTranslucency(new THREE.MeshPhysicalMaterial({
    color, ...maps, normalScale: new THREE.Vector2(.9, .9), roughness: .95, sheen: .9,
    sheenColor: new THREE.Color('#fff0dc'), sheenRoughness: .7, side: THREE.DoubleSide,
  }), {
    key, color: new THREE.Color(1, .72, .5), forward: .25, diffuse: .45, distortion: .2, power: 2, wrap: .5, wrapTint: new THREE.Color(1, .66, .5),
    uniforms: life, declarations: 'uniform float uTouchAge; uniform vec3 uTouchPos;',
    // The blanket answers a touch too: a slow warm ring spreading through the knit.
    thickness: `
if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
  float d = distance(vTranslucentWorld, uTouchPos);
  float ring = exp(-pow((d - uTouchAge * .45) / (.2 + uTouchAge * .04), 2.0)) * exp(-uTouchAge * .3) * smoothstep(0.0, .5, uTouchAge);
  float bloom = exp(-d * d / (.08 + uTouchAge * .15)) * exp(-uTouchAge * .45) * smoothstep(0.0, .35, uTouchAge);
  translucentThin += ring * 2.0;
  totalEmissiveRadiance += vec3(1.0, .72, .45) * diffuseColor.rgb * (ring * .9 + bloom * .45);
}
`,
  });
  const clothMaterial = cloth(knit, '#fbebdc', 'warm-cloth');
  const clothUnder = cloth(knit, '#e6c2a6', 'warm-cloth-under');
  const lipMaterial = cloth(lipKnit, '#f8e8d8', 'warm-cloth-lip');

  const habitat = new THREE.Group(); scene.add(habitat);
  const targets: THREE.Object3D[] = [];
  function add(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], touch = true) {
    const mesh = new THREE.Mesh(geometry, material);
    habitat.add(mesh); if (touch) targets.push(mesh); return mesh;
  }

  // The cocoon: one continuous lofted wall with soft noise folds, narrowing to a throat
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
    const folds = fbm3(c * 1.25 + 4, s * 1.25, z * .2, 4) * .5 + fbm3(c * 3.1, s * 3.1 + 2, z * .55 + 9, 3) * .1;
    // Folds recess outward freely but barely bulge inward, so they never pierce the petals.
    const r = 1 + (folds > 0 ? folds : folds * .18) * floorCalm * .4;
    const cx = .22 * Math.sin(z * .21), cy = centreY + .18 * Math.sin(z * .17 + 1) + (1 - prof) * .35;
    return point(cx + c * 4.35 * prof * r, cy + s * ry * prof * r, z + fbm3(c * 2, s * 2, z * .4, 2) * .3 * floorCalm);
  };
  add(surface(180, 150, (u, v) => wallAt(-Math.PI / 2 + u * TAU, 6.4 - 23.2 * Math.pow(v, 1.18))), wallTissue);

  // A broad floor of soft membrane, curving up into the walls beneath the nest cloth.
  const floorHeight = (x: number, z: number) => -.12 + .07 * Math.sin(z * .53 + x * .39) + .06 * Math.cos(x * 1.1)
    + fbm3(x * .5, z * .5, 3.3, 3) * .12 + Math.pow(Math.abs(x) / 4.4, 3) * .9 + smooth(-z, 4, 10) * .55;
  add(surface(120, 130, (u, v) => {
    const x = (u - .5) * 9.6, z = 6.4 - 17.4 * Math.pow(v, 1.12);
    return point(x, floorHeight(x, z), z);
  }), floorTissue);

  // Petals: many thin, overlapping leaves in three tiers lining the walls and ceiling like
  // the inside of a flower bud, each pointing toward the core with its margins curling in.
  // Gaps between them show the glowing wall behind.
  const wallBase = (theta: number, z: number) => {
    const s = Math.sin(theta), c = Math.cos(theta);
    const prof = profile(z);
    const ry = THREE.MathUtils.lerp(1.75, 3.25, smooth(s, -.4, .4));
    const cx = .22 * Math.sin(z * .21), cy = centreY + .18 * Math.sin(z * .17 + 1) + (1 - prof) * .35;
    return { centre: new THREE.Vector2(cx, cy), offset: new THREE.Vector2(c * 4.35 * prof, s * ry * prof) };
  };
  const petalMaterials = [honeyPetal, apricotPetal, blushPetal];
  const tiers = [
    { near: 2.2, length: 6.6, count: 6, inset: .28, tip: .95, span: .66, phase: 0 },
    { near: -1.0, length: 6.2, count: 6, inset: .4, tip: .9, span: .6, phase: .5 },
    { near: -4.4, length: 4.9, count: 5, inset: .5, tip: .7, span: .66, phase: .25 },
  ];
  tiers.forEach((tier, t) => {
    for (let k = 0; k < tier.count; k++) {
      const seed = t * 11 + k + 1;
      const random = seeded(900 + seed * 31);
      // Sides and ceiling only: from just below the right horizon over to the left.
      const centre = -.22 + (Math.PI + .44) * (k + tier.phase + .5) / (tier.count + .5) + (random() - .5) * .12;
      const inset = tier.inset + (k % 2) * .07;
      const length = tier.length * (.88 + random() * .2);
      const geometry = membrane(40, 48, (u, v) => {
        const width = Math.pow(Math.sin(Math.PI * Math.pow(.05 + .95 * v, .75)), .6);
        const theta = centre + (u - .5) * tier.span * width;
        const z = tier.near - length * v;
        const n = fbm3(u * 2 + seed, v * 3, seed * .7, 3);
        const margin = 1 - Math.sin(Math.PI * u);
        const lift = inset + (tier.tip - inset) * Math.pow(v, 1.6) + margin * .14 * width + n * .07 + Math.sin(v * 20 + seed) * .025 * margin;
        const { centre: c, offset } = wallBase(theta, z);
        const k2 = Math.max(.12, 1 - lift / Math.max(offset.length(), .5));
        return point(c.x + offset.x * k2, c.y + offset.y * k2, z + n * .2);
      }, (u, v) => .003 + .006 * Math.sin(Math.PI * u) * (1 - v * .6),
      (u, v) => (.62 + .38 * Math.abs(u * 2 - 1)) * (.75 + .25 * v));
      add(geometry, [petalMaterials[(k + t) % 3], petalMaterials[(k + t + 1) % 3], petalMaterials[(k + t) % 3]]);
    }
  });
  // Two warm sources hide in the folds behind the nearest petals and shine through them.
  const backLights = [Math.PI - .55, .5].map((theta) => {
    const { centre, offset } = wallBase(theta, -1.2);
    return point(centre.x + offset.x * .975, centre.y + offset.y * .975, -1.2);
  });

  // The bud around the core: seven inner petals cup the light. Its axis tips up and a little
  // aside, so the seated viewer sees into a rounded, three-dimensional bloom.
  const budAxis = new THREE.Quaternion().setFromEuler(new THREE.Euler(-.42, .22, 0));
  const budLocal = new THREE.Vector3();
  for (let k = 0; k < 7; k++) {
    const random = seeded(4400 + k * 17);
    const phi = k / 7 * TAU + .2 + (random() - .5) * .25;
    const reach = .72 + random() * .16;
    add(membrane(28, 36, (u, v) => {
      // A half-open lotus: overlapping petals rise from behind the core and open toward the viewer.
      const width = .62 * Math.pow(Math.sin(Math.PI * (.08 + .9 * v)), .6);
      const a = phi + (u - .5) * 2 * width;
      const r = .3 + reach * Math.pow(v, 1.3) + .14 * Math.pow(v, 4) - .06 * Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
      budLocal.set(Math.cos(a) * r, Math.sin(a) * r * 1.05, -.8 + 2.1 * v + noise3(u * 2 + k, v * 2, 3.3) * .07).applyQuaternion(budAxis);
      return budLocal.clone().add(core);
    }, (u) => .003 + .005 * Math.sin(Math.PI * u), (u, v) => .55 + .45 * v), [budPetal, budPetal, budPetal]);
  }

  // A few fallen petals rest on the floor, catching light through their thin edges.
  for (let k = 0; k < 11; k++) {
    const random = seeded(5200 + k * 23);
    const cx = (random() - .5) * 2.4, cz = -1.2 - random() * 6.2, yaw = random() * TAU, size = .26 + random() * .22;
    add(membrane(12, 16, (u, v) => {
      const w = Math.pow(Math.sin(Math.PI * (.05 + .95 * v)), .7) * size * .42;
      const lx = (u - .5) * 2 * w, lz = (v - .5) * size * 1.6;
      const x = cx + Math.cos(yaw) * lx - Math.sin(yaw) * lz, z = cz + Math.sin(yaw) * lx + Math.cos(yaw) * lz;
      const curl = .06 * Math.pow(Math.abs(u * 2 - 1), 2) + .05 * Math.pow(v, 3) + .02 * Math.sin(v * 5 + k);
      return point(x, floorHeight(x, z) + .02 + curl, z);
    }, (u) => .002 + .003 * Math.sin(Math.PI * u), (u, v) => .75 + .25 * v), [fallenPetal, fallenPetal, fallenPetal]);
  }

  // Cocoon silk: a few delicate strands catching the light, always brighter than their surroundings.
  const silk: THREE.BufferGeometry[] = [];
  const silkSpecs: Array<[number, number, number, number, number]> = [
    // theta from, z from, theta to, z to, sag: draped between petals, never across the core
    [Math.PI - .5, -2.6, 2.1, -4.4, .55], [.45, -2.2, 1.15, -4.6, .5], [2.5, -5.4, 1.75, -7.6, .4],
    [.7, -5.0, 1.4, -7.2, .35], [1.25, -1.6, 1.95, -2.4, .3], [2.75, -6.8, 2.2, -8.8, .25],
    [.35, -6.4, .95, -8.6, .25], [1.6, -7.8, 2.05, -9.2, .2],
  ];
  silkSpecs.forEach(([t0, z0, t1, z1, sag], index) => {
    const random = seeded(7100 + index * 13);
    const at = (theta: number, z: number) => { const { centre, offset } = wallBase(theta, z); return point(centre.x + offset.x * .86, centre.y + offset.y * .86, z); };
    const a = at(t0, z0), b = at(t1, z1);
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const p = a.clone().lerp(b, t);
      p.y -= Math.pow(Math.sin(t * Math.PI), 1.3) * sag;
      p.x += noise3(t * 3 + index, index, 1.7) * .09;
      p.z += noise3(index, t * 3 + index, 4.1) * .09;
      points.push(p);
    }
    const tube = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 90, .0035 + random() * .003, 4, false);
    // Light gathers along the thread nearer the core and where it catches the light;
    // elsewhere the silk all but vanishes, so it never reads as a wire.
    const pos = tube.getAttribute('position'), uv = tube.getAttribute('uv');
    const colors = new Float32Array(pos.count * 4);
    const p = new THREE.Vector3();
    const phase = random() * 10;
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      const t = uv.getX(i);
      const near = .5 + 1.4 * Math.exp(-p.distanceTo(core) / 4.5);
      const glint = Math.max(0, Math.sin(t * 7 + phase)) ** 3 * .8 + Math.max(0, Math.sin(t * 19 + phase * 2)) ** 18 * 1.2;
      const ends = Math.min(1, t * 6, (1 - t) * 6);
      colors.set([near, near * .84, near * .6, (.12 + glint) * ends], i * 4);
    }
    tube.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    tube.deleteAttribute('uv'); tube.deleteAttribute('normal');
    silk.push(tube.toNonIndexed());
    tube.dispose();
  });
  const silkGeometry = new THREE.BufferGeometry();
  {
    const total = silk.reduce((sum, g) => sum + g.getAttribute('position').count, 0);
    const position = new Float32Array(total * 3), color = new Float32Array(total * 4);
    let offset = 0;
    for (const g of silk) {
      position.set(g.getAttribute('position').array as Float32Array, offset * 3);
      color.set(g.getAttribute('color').array as Float32Array, offset * 4);
      offset += g.getAttribute('position').count; g.dispose();
    }
    silkGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    silkGeometry.setAttribute('color', new THREE.BufferAttribute(color, 4));
  }
  const silkMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true, color: new THREE.Color(1.5, 1.5, 1.5), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const silkMesh = new THREE.Mesh(silkGeometry, silkMaterial);
  silkMesh.name = 'Cocoon silk';
  habitat.add(silkMesh);

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

  // The core: a gentle sun inside the bud, white-gold at its heart, honey at the rim.
  const coreUniforms = { uLifeTime: life.uLifeTime, uBreath: life.uBreath, uNoise: { value: noise } };
  const coreGeometry = new THREE.IcosahedronGeometry(1, 12);
  coreGeometry.scale(.62, .7, .62);
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
  float soft = dot(texture(uNoise, vLocal * .4 + vec3(0.0, uLifeTime * .006, 0.0)), vec4(.5, .3, .2, 0.0));
  vec3 heart = vec3(14.0, 11.5, 8.0), rim = vec3(3.2, 2.0, 1.0);
  vec3 c = mix(rim, heart, pow(facing, 1.4)) * (.92 + .16 * soft);
  c *= .86 + .22 * uBreath;
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  }));
  coreMesh.position.copy(core);
  scene.add(coreMesh);

  // One strong, motivated key (the core); fake bounce from the lit petals and walls; a dim ambient.
  const coreLight = new THREE.PointLight('#ffd8a4', 50, 0, 2); coreLight.position.copy(core).add(point(0, .1, 1.8)); scene.add(coreLight);
  const foldLights = backLights.map((position, i) => {
    const light = new THREE.PointLight(i ? '#ffbe86' : '#ffc890', i ? 4 : 5, 0, 2);
    light.position.copy(position); scene.add(light); return light;
  });
  // A softer source behind the bud warms the alcove and shines through the bud's petals.
  const alcoveLight = new THREE.PointLight('#ffc88e', 12, 0, 2); alcoveLight.position.copy(core).add(point(0, .15, -1.7)); scene.add(alcoveLight);
  const nearBounce = new THREE.PointLight('#ffd4b2', 6.5, 0, 2); nearBounce.position.set(-.4, 2.8, 2.9); scene.add(nearBounce);
  scene.add(new THREE.HemisphereLight('#ffe2c8', '#6a3a2a', .14));

  // Drifting motes, lit by the core when near it.
  const motes = createSnowfall({
    seed: 7713,
    keyDirection: core.clone().sub(point(0, 1.2, 4.5)).normalize(),
    keyColor: new THREE.Color(.03, .022, .012),
    ambient: new THREE.Color(.07, .05, .03),
    // Motes only ever add light: specks of glow, never dark dust against bright petals.
    additive: true,
    lights: [{ position: core.clone(), color: new THREE.Color(20, 13, 6) }],
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
      // No screen-space AO here: light passes through these membranes, so occlusion is weak,
      // and on the thin overhead petals seen at grazing angles the shared AO's depth-aware
      // blur keeps only horizontal neighbours, leaving its per-pixel rotation noise as fine
      // horizontal stripes. Skipping the pass also saves two half-resolution passes.
      exposure: .98, bloomStrength: .2, bloomThreshold: 0, aoStrength: 0, aoRadius: .3,
      saturation: .97, contrast: 1.1, shadowTint: [1.05, .88, .95], highlightTint: [1.05, 1.0, .9], vignette: .5, grain: .02,
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
  vec3 c = mix(vec3(.09, .05, .035), vec3(.3, .2, .12), smoothstep(-.6, .5, d.y));
  float toward = max(dot(d, uCore), 0.0);
  c += vec3(2.4, 1.7, .95) * pow(toward, 24.0) + vec3(.35, .24, .12) * pow(toward, 4.0);
  gl_FragColor = vec4(c, 1.0);
}`,
      }));
      probe.add(dome);
      const pmrem = new THREE.PMREMGenerator(renderer);
      environment = pmrem.fromScene(probe, 0, .1, 60);
      pmrem.dispose();
      dome.geometry.dispose(); (dome.material as THREE.Material).dispose();
      scene.environment = environment.texture;
      scene.environmentIntensity = .4;
    },
    createVolume() {
      haze = createWarmHaze({
        noise, core: core.clone(), coreColor: new THREE.Color(1.0, .76, .5).multiplyScalar(2.2), coreGlow: .055,
        ambient: new THREE.Color(.05, .03, .014), density: .02, floorDensity: .5, gain: 1, maxDistance: 24,
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
      coreLight.intensity = 50 * (.86 + .22 * breath);
      alcoveLight.intensity = 12 * (.86 + .22 * breath);
      // The fold lights drift on their own slow phases, never in step with the core.
      foldLights[0].intensity = 5 * (.85 + .18 * warmBreath(elapsed * .83 + 2.1));
      foldLights[1].intensity = 4 * (.85 + .18 * warmBreath(elapsed * .71 + 4.4));
      silkMaterial.color.setScalar(1.5 * (.85 + .25 * warmBreath(elapsed * .9 + 1.0)));
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
