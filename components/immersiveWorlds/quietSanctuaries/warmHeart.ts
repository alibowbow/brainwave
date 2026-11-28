import * as THREE from 'three';
import type { SanctuaryBuilder } from './worldTypes';
import { applyTranslucency } from '../shared/render/translucentSurface';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { fbm3, noise3, seeded } from '../shared/render/noise';
import { createSnowfall } from '../shared/render/snowFall';
import { createWarmHaze } from './atmosphere';

/*
 * 포근한 심장 — an original, code-only shelter of living, translucent tissue. No external assets.
 * A soft tunnel of folded membrane narrows toward a glowing heart. Five iris folds arch
 * over it, one behind another: bands of tissue with ruffled, scalloped rims and radial
 * vessels. Light from beyond the walls and from the heart crosses them layer after layer
 * (Beer-Lambert: thin rims pass warm gold, roots, vessels and stacked layers deepen to rose
 * and crimson), drifts slowly through the tissue in soft patches and pours through their
 * openings as cones of light in the haze. Soft cushions of tissue cradle the viewer.
 * The space breathes: light swells and ebbs over seconds, membranes lift a centimetre or
 * two, never in step. A touch sends a slow ring of light and a soft ripple from the fingertip.
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
   * Living membrane: soft mottling and fine vessels (a branching net on the walls, radial
   * vessels on the iris folds, venation on the bud) thicken or thin the sheet the light
   * crosses; a satin sheen, never a wet film. Broad structure comes from the shared
   * noise volume, so the shader needs no per-pixel ALU noise at all.
   * A slow pulse of light travels along the veins; a touch spreads a ring of light.
   */
  interface TissueOptions {
    key: string; color: string; vein: string; thin: number; glow: number; roughness: number; lift: number;
    scale?: number; sheen?: number; bump?: number; outside?: number; satin?: number; specular?: number; coreGlow?: number;
    /** Vein pattern: petal venation, radial vessels from root to rim (iris folds), or a branching net. */
    veins?: 'petal' | 'radial' | 'net';
    /** Light gathered in the thin rolled rim (uv.y -> 1) of a fold, as light pipes along a thin edge. */
    rimGlow?: number;
    /** Optical depth of tissue the light crosses: thin sheets glow gold, thick or stacked layers deep rose and red. */
    depth?: number;
    /** Extra optical depth on the veins, which read as darker rose lines against the light. */
    veinDepth?: number;
    /** Extra outside light where the surface rises above the floor (the floor curling into the walls). */
    outsideRise?: number;
  }
  function tissue(o: TissueOptions) {
    const material = new THREE.MeshPhysicalMaterial({
      color: o.color, roughness: o.roughness, metalness: 0, clearcoat: o.satin ?? 0, clearcoatRoughness: .5,
      sheen: o.sheen ?? .4, sheenColor: new THREE.Color('#ffe6d8'), sheenRoughness: .75, specularIntensity: o.specular ?? .5,
      side: THREE.DoubleSide,
    });
    applyTranslucency(material, {
      key: `warm-tissue-${o.key}`, color: new THREE.Color(1.0, .76, .5), forward: 1.3, diffuse: 1.0, distortion: .22, power: 3,
      wrap: .55, wrapTint: new THREE.Color(1.0, .42, .36), uniforms: { ...life, uTissueNoise: { value: noise }, uCorePos: { value: core } },
      declarations: 'precision highp sampler3D; uniform sampler3D uTissueNoise; uniform vec3 uCorePos; uniform float uLifeTime; uniform float uBreath; uniform vec3 uTouchPos; uniform float uTouchAge; varying float vTissueThin; varying vec2 vTissueUv;'
        // Anti-aliased line at integer values of x: full strength while wider than a pixel, fading below.
        + 'float tissueLine(float x, float width) { float w = max(fwidth(x), 1e-4); float d = abs(fract(x + .5) - .5); return (1.0 - smoothstep(width - w, width + w, d)) * clamp(width / w, 0.0, 1.0); }',
      thickness: `
vec3 tp = vTranslucentWorld * ${f(o.scale ?? 1)};
vec4 tn = texture(uTissueNoise, tp * .085);
float tMottle = (tn.r - .5) * 1.2 + (tn.g - .5) * .6;
float tVein;
${o.veins === 'radial' ? `
// Radial vessels: primaries run from the root to the rim, wavering; finer ones branch off
// across the outer band, and a faint capillary net fills the thin rim.
vec2 fuv = vTissueUv;
float rWarp = (texture(uTissueNoise, vec3(fuv.x * 4.0, fuv.y * .9, tn.a * .3 + tp.z * .02)).g - .5);
float rSpacing = fuv.x * 48.0 + sin(fuv.x * 23.0) * 1.1 + rWarp * 1.5;
float rPrimary = tissueLine(rSpacing + fuv.y * .6, .035 + .04 * (1.0 - fuv.y)) * (1.0 - .55 * smoothstep(.5, 1.0, fuv.y)) * (.55 + .45 * tn.b);
float rBranch = tissueLine(rSpacing * 2.0 + .5 + rWarp * 2.4 - fuv.y * 1.3, .04) * smoothstep(.3, .6, fuv.y) * (1.0 - smoothstep(.85, 1.0, fuv.y)) * tn.g;
float rFade = clamp(1.4 - length(fwidth(vec2(fuv.x * 112.0, fuv.y * 6.0))) * .9, 0.0, 1.0);
float rNet = smoothstep(.93, .99, 1.0 - abs(texture(uTissueNoise, tp * .42 + .19).b * 2.0 - 1.0)) * smoothstep(.5, .9, fuv.y);
tVein = max(rPrimary * .75, max(rBranch * .45 * rFade, rNet * .2 * rFade));` : o.veins === 'petal' ? `
// Petal venation: a midrib, paired secondary veins sweeping toward the tip and margins,
// and fine fibres between them, all wavering a little like real tissue.
vec2 fuv = vTissueUv;
float fx = fuv.x * 2.0 - 1.0;
float fWarp = (texture(uTissueNoise, vec3(fuv.x * .9, fuv.y * .7, tn.a * .3 + tp.x * .02)).g - .5) * .5;
float fMid = tissueLine(fx * 3.2 + fWarp * .3, .022 + .02 * (1.0 - fuv.y)) * (1.0 - .6 * smoothstep(.5, 1.0, fuv.y));
float fSecondary = tissueLine(fuv.y * 5.0 - abs(fx) * (1.5 + .5 * fuv.y) + fWarp * 1.2, .022) * smoothstep(.04, .2, abs(fx)) * (1.0 - smoothstep(.6, .95, abs(fx))) * smoothstep(.0, .12, fuv.y) * (1.0 - .7 * fuv.y);
float fScale = 3.0 * (1.15 - fuv.y * .55);
float fFade = clamp(1.4 - length(fwidth(vec2(fuv.x * fScale * 16.0, fuv.y * 5.0))) * .8, 0.0, 1.0);
float fStreak = texture(uTissueNoise, vec3(fuv.x * fScale + fuv.y * .2, fuv.y * .32, tn.a * .5 + tp.x * .031 + tp.z * .017)).b;
tVein = max(max(fMid * .8, fSecondary * .55), smoothstep(.9, .985, 1.0 - abs(fStreak * 2.0 - 1.0)) * fFade * .35);` : `
// A branching network of soft vessels over the walls and floor, faded before it could alias.
vec3 tWarp = tp + (texture(uTissueNoise, tp * .19 + .37).rgb - .5) * 1.1;
float tRidge = 1.0 - abs(texture(uTissueNoise, tWarp * .07 + .5).g * 2.0 - 1.0);
float tFine = 1.0 - abs(texture(uTissueNoise, tp * .31 + .13).b * 2.0 - 1.0);
float tAa = clamp(1.4 - length(fwidth(tp)) * 9.0, 0.0, 1.0);
// Larger vessels where the ridge is sharpest, fine capillaries only close to them.
float tTrunk = smoothstep(.978, .996, tRidge);
tVein = max(tTrunk * .7, smoothstep(.985, .998, tFine) * smoothstep(.9, .97, tRidge) * .45 * tAa) * mix(.35, 1.0, tAa);`}
diffuseColor.rgb *= .9 + .2 * tMottle;
diffuseColor.rgb = mix(diffuseColor.rgb, ${glsl(o.vein)}, tVein * .24);
translucentThin = ${f(o.thin)} * vTissueThin * (1.0 - .2 * tVein) * (.9 + .2 * tMottle);
// Beer-Lambert through the tissue: red survives longest, so stacked or thick layers deepen to rose
// and crimson while thin margins pass warm gold.
float tDepth = ${f(o.depth ?? 1)} * (1.9 - vTissueThin * 1.55) * (1.0 - .32 * tMottle) + tVein * ${f(o.veinDepth ?? .6)};
vec3 tThrough = exp(-vec3(.42, 1.3, 2.4) * max(tDepth, 0.0));
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
// Transmitted light takes the colour of the tissue it crossed (see tDepth).
translucentTransmit = tThrough * clamp(translucentThin, 0.0, 1.0) * mix(diffuseColor.rgb, vec3(1.0), .45);
`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = bwSurfaceBump(-vViewPosition, normal, tVein * .0012 + tMottle * .004, ${f(o.bump ?? .5)});
`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float flow = .5 + .5 * sin(uLifeTime * .5 - dot(vTranslucentWorld, vec3(.03, .06, -.2)) * 3.0 + tMottle * 2.0);
  totalEmissiveRadiance += vec3(1.0, .5, .34) * tVein * ${f(o.glow)} * (.3 + .7 * flow * flow) * (.7 + .3 * uBreath);
  // Honey light filtering in from beyond the cocoon: brighter overhead and toward the core,
  // in soft patches where the membrane thins.
  vec3 wp = vTranslucentWorld;
  float field = (.5 + .5 * smoothstep(-.2, 4.2, wp.y)) * (.6 + .6 * smoothstep(1.0, 10.0, -wp.z));
  float drift = texture(uTissueNoise, wp * .05 + vec3(uLifeTime * .006, .3, uLifeTime * .004)).r * .65
    + texture(uTissueNoise, wp * .11 + vec3(-uLifeTime * .004, uLifeTime * .005, .37)).g * .35;
  field *= .42 + .95 * smoothstep(.32, .68, drift);
  float outside = ${f(o.outside ?? 0)} + ${f(o.outsideRise ?? 0)} * smoothstep(.05, .75, wp.y);
  totalEmissiveRadiance += vec3(1.6, 1.15, .8) * outside * field * translucentTransmit * (.82 + .25 * uBreath);
  // The core's light passing through the membranes closest to it: the glow of a sun in a bud.
  vec3 toCore = uCorePos - wp;
  totalEmissiveRadiance += vec3(2.4, 1.75, 1.05) * ${f(o.coreGlow ?? .25)} * translucentTransmit * (.82 + .3 * uBreath) / (dot(toCore, toCore) * .9 + .35);
  ${o.rimGlow ? `totalEmissiveRadiance += vec3(1.5, .92, .5) * ${f(o.rimGlow)} * smoothstep(.8, 1.0, vTissueUv.y) * smoothstep(.08, .3, vTissueUv.x) * smoothstep(.92, .7, vTissueUv.x) * (.5 + .5 * field) * (.8 + .3 * uBreath);` : ''}
  if (uTouchAge >= 0.0 && uTouchAge < 14.0) {
    float d = distance(vTranslucentWorld, uTouchPos);
    float r = uTouchAge * .5;
    float ring = exp(-pow((d - r) / (.2 + uTouchAge * .04), 2.0)) * exp(-uTouchAge * .26) * smoothstep(0.0, .5, uTouchAge);
    float bloom = exp(-d * d / (.12 + uTouchAge * .2)) * exp(-uTouchAge * .42) * smoothstep(0.0, .35, uTouchAge);
    totalEmissiveRadiance += vec3(1.0, .7, .46) * (ring * (1.2 + .8 * tVein) + bloom * .6) * (.7 + .5 * translucentThin);
  }
}
`);
    };
    const base = material.customProgramCacheKey.bind(material);
    material.customProgramCacheKey = () => `${base()}|warm-tissue-life-v4|${o.key}`;
    return material;
  }

  // Walls and floor are thick and stacked: mostly deep rose and crimson, gold only where they thin.
  const wallTissue = tissue({ key: 'wall', color: '#c27064', vein: '#a8484a', thin: .5, glow: .015, roughness: 1, specular: .15, sheen: .25, bump: 0, outside: 1.05, coreGlow: 3, lift: .018, scale: .9, depth: 1.55, veinDepth: .45 });
  const floorTissue = tissue({ key: 'floor', color: '#c27a6c', vein: '#9c4446', thin: .44, glow: .015, roughness: .9, specular: .3, satin: .05, sheen: .35, bump: .3, outside: .62, outsideRise: .62, coreGlow: 2.2, lift: .008, scale: 1.2, depth: 1.3, veinDepth: .4 });
  // Iris folds: thin, translucent bands; their rims glow gold, their roots deep rose.
  const veilHoney = tissue({ key: 'veil-honey', color: '#e0a894', vein: '#c8606a', thin: 1, glow: .04, roughness: .5, specular: .45, satin: .12, sheen: .45, bump: .5, outside: 1.3, coreGlow: .9, rimGlow: .45, lift: .03, veins: 'radial', depth: .7, veinDepth: .38 });
  const veilRose = tissue({ key: 'veil-rose', color: '#d89a92', vein: '#b85060', thin: .95, glow: .04, roughness: .52, specular: .45, satin: .1, sheen: .45, bump: .5, outside: 1.25, coreGlow: .9, rimGlow: .45, lift: .03, veins: 'radial', depth: .9, veinDepth: .42 });
  const budPetal = tissue({ key: 'bud', color: '#f0c0a4', vein: '#d8806a', thin: .8, glow: .04, roughness: .6, specular: .3, satin: 0, sheen: .4, bump: .4, outside: .15, coreGlow: .22, lift: .012, veins: 'petal', depth: .85, veinDepth: .3 });
  // Cushions of thick, soft tissue around the viewer: deep rose with a satin sheen, barely lit through.
  const cushion = tissue({ key: 'cushion', color: '#b0625a', vein: '#8c3c44', thin: .45, glow: .01, roughness: .5, specular: .55, satin: .4, sheen: 1, bump: .7, outside: .22, coreGlow: .6, lift: .008, scale: 1.5, depth: 1.6, veinDepth: .2 });
  const cushionUnder = tissue({ key: 'cushion-under', color: '#b86e66', vein: '#94404a', thin: .3, glow: .01, roughness: .8, specular: .3, satin: .1, sheen: .6, bump: .6, outside: .12, coreGlow: .3, lift: .008, scale: 1.5, depth: 1.7, veinDepth: .35 });

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
    const folds = fbm3(c * 1.25 + 4, s * 1.25, z * .2, 4) * .6 + fbm3(c * 3.1, s * 3.1 + 2, z * .55 + 9, 3) * .16 + Math.sin(Math.atan2(s, c) * 14 + z * .4) * .05;
    // Folds recess outward freely but barely bulge inward, so they never pierce the iris folds.
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

  const wallBase = (theta: number, z: number) => {
    const s = Math.sin(theta), c = Math.cos(theta);
    const prof = profile(z);
    const ry = THREE.MathUtils.lerp(1.75, 3.25, smooth(s, -.4, .4));
    const cx = .22 * Math.sin(z * .21), cy = centreY + .18 * Math.sin(z * .17 + 1) + (1 - prof) * .35;
    return { centre: new THREE.Vector2(cx, cy), offset: new THREE.Vector2(c * 4.35 * prof, s * ry * prof) };
  };
  // Iris folds: bands of tissue arching over the tunnel from the wall to a soft, scalloped rim,
  // each funnelled toward the heart and ruffled in broad pleats. Seen through one another they
  // are the layers the light crosses; the haze shows the cones of light their openings let through.
  const ringSpecs = [
    { z: 1.5, inner: .52, lobes: 5, seed: 3 },
    { z: -1.3, inner: .5, lobes: 6, seed: 7 },
    { z: -4.1, inner: .52, lobes: 5, seed: 11 },
    { z: -6.8, inner: .5, lobes: 7, seed: 17 },
    { z: -9.1, inner: .42, lobes: 6, seed: 23 },
  ];
  const rimOf = (spec: typeof ringSpecs[number], theta: number) => spec.inner + .07 * Math.sin(theta * spec.lobes + spec.seed) + .04 * Math.sin(theta * (spec.lobes * 2 + 1) + spec.seed * 1.7)
    + .05 * fbm3(theta * 2.2 + spec.seed, spec.seed * .7, .5, 3);
  const archStart = -.38, archEnd = Math.PI + .38;
  ringSpecs.forEach((spec, index) => {
    const random = seeded(3300 + spec.seed * 13);
    const pleats = 9 + Math.floor(random() * 5), phase = random() * TAU;
    const material = index % 2 ? veilRose : veilHoney;
    add(membrane(180, 28, (u, v) => {
      const theta = archStart + (archEnd - archStart) * u;
      // The band melts into the wall toward the floor at both ends of the arch.
      const ends = smooth(u, 0, .16) * (1 - smooth(u, .84, 1));
      const rim = THREE.MathUtils.lerp(1, rimOf(spec, theta), ends);
      // The root starts beyond the wall (hidden), so the band always grows out of the folds.
      const frac = THREE.MathUtils.lerp(1.3, rim, Math.pow(v, .85));
      const funnel = .55 * Math.pow(v, 1.2) * ends;
      const { centre, offset } = wallBase(theta, spec.z - funnel);
      const ruffle = (Math.sin(theta * pleats + phase + v * 1.3) * .2 * Math.pow(v, 1.4) + Math.sin(theta * pleats * 2.3 + phase * 1.7) * .07 * Math.sqrt(v)
        + Math.sin(theta * 41 + phase) * .025 * Math.pow(v, 3)) * ends;
      const n = fbm3(theta * 1.7 + spec.seed, v * 2, spec.seed * .3, 3);
      return point(centre.x + offset.x * frac, centre.y + offset.y * frac, spec.z - funnel + ruffle + n * .12 * v);
    }, (u, v) => .003 + .009 * (1 - v) * Math.sin(Math.PI * u), (u, v) => .3 + .7 * Math.pow(v, 1.6)), [material, material, material]);
  });
  // Warm daylight beyond the cocoon: broad sources well outside the wall, so their light
  // reaches the folds softly through wall and fold alike, never as a hot spot.
  const outsideLights = ([[Math.PI - .7, -2.6, 1.9], [.62, -4.2, 1.8], [Math.PI / 2 + .1, -7.5, 1.7]] as const).map(([theta, z, out]) => {
    const { centre, offset } = wallBase(theta, z);
    return point(centre.x + offset.x * out, centre.y + offset.y * out, z);
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
      const width = .62 * Math.pow(Math.sin(Math.PI * (.06 + .78 * v)), .5);
      const a = phi + (u - .5) * 2 * width;
      const r = .3 + reach * Math.pow(v, 1.3) - .12 * Math.pow(v, 6) - .06 * Math.sin(Math.PI * u) * Math.sin(Math.PI * v)
        + .035 * Math.sin(u * Math.PI * 3 + k) * Math.pow(v, .8) - .03 * Math.exp(-Math.pow((u - .5) / .1, 2)) * v;
      budLocal.set(Math.cos(a) * r, Math.sin(a) * r * 1.05, -.8 + 2.1 * v + noise3(u * 2 + k, v * 2, 3.3) * .07).applyQuaternion(budAxis);
      return budLocal.clone().add(core);
    }, (u) => .003 + .005 * Math.sin(Math.PI * u), (u, v) => .55 + .45 * v), [budPetal, budPetal, budPetal]);
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
    vertexColors: true, color: new THREE.Color(.8, .8, .8), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const silkMesh = new THREE.Mesh(silkGeometry, silkMaterial);
  silkMesh.name = 'Cocoon silk';
  habitat.add(silkMesh);

  // The nest: two soft cushions of tissue and a folded lip at the viewer's knees.
  for (let side = 0; side < 2; side++) {
    add(membrane(84, 76, (u, v) => {
      const sign = side === 0 ? -1 : 1;
      const innerCurve = .26 * Math.sin(v * Math.PI) + .12 * Math.sin(v * 4.7);
      const x = sign * (.68 + innerCurve + u * 3.6), z = 5.4 - v * 8.0 + side * .55;
      const taper = smooth(v, 0, .13) * (1 - smooth(v, .81, 1));
      const mound = Math.sin(u * Math.PI) ** .64;
      const loft = mound * (.47 + .24 * Math.sin(v * 3.8 + side)) + .09 * Math.sin(u * 10 + v * 3.5) * Math.sin(u * Math.PI) + fbm3(u * 3 + side, v * 4, 1.5, 3) * .08 * mound;
      return point(x, floorHeight(x, z) - .05 + loft * taper, z);
    }), [cushion, cushionUnder, cushionUnder]);
  }
  add(membrane(130, 44, (u, v) => {
    const x = (u - .5) * 6.6;
    const n = fbm3(u * 5, v * 2, 8.8, 3);
    return point(x, floorHeight(x, 2.2) + .2 + Math.sin(v * Math.PI) * (.22 + .09 * Math.sin(u * 9) + n * .06) + .024 * Math.sin(u * 44) * Math.sin(v * Math.PI), 1.65 + v * 1.45 + .18 * Math.sin(u * 7));
  }), [cushion, cushionUnder, cushionUnder]);

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
  // Gold at the heart, amber to rose at the rim: bright, but never a clipped white disc.
  vec3 heart = vec3(3.2, 2.15, 1.1), rim = vec3(1.3, .52, .27);
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
  const coreLight = new THREE.PointLight('#ffd0a0', 40, 0, 2); coreLight.position.copy(core).add(point(0, .5, 3.4)); scene.add(coreLight);
  const foldLights = outsideLights.map((position, i) => {
    const light = new THREE.PointLight(['#ffc490', '#ffb884', '#ffc08c'][i], [9, 8, 10][i], 0, 2);
    light.position.copy(position); scene.add(light); return light;
  });
  // A softer source behind the bud warms the alcove and shines through the bud's petals.
  const alcoveLight = new THREE.PointLight('#ffb884', 9, 0, 2); alcoveLight.position.copy(core).add(point(0, .15, -1.7)); scene.add(alcoveLight);
  const nearBounce = new THREE.PointLight('#ffb898', 1.6, 0, 2); nearBounce.position.set(0, .95, 3.4); scene.add(nearBounce);
  // Shade is rose and deep red, never grey.
  scene.add(new THREE.HemisphereLight('#ffd6c0', '#5a1a1e', .16));

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
      exposure: .98, bloomStrength: .16, bloomThreshold: 0, aoStrength: 0, aoRadius: .3,
      saturation: 1.02, contrast: 1.1, shadowTint: [1.1, .82, .9], highlightTint: [1.04, .99, .9], vignette: .5, grain: .02,
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
        noise, core: core.clone(), coreColor: new THREE.Color(1.0, .66, .4).multiplyScalar(2.5), coreGlow: .026,
        ambient: new THREE.Color(.05, .022, .016), density: .028, floorDensity: .5, gain: 1, maxDistance: 24,
        // Soft shafts escape between the bud's petals and fan out through the haze.
        rings: ringSpecs.map((spec) => {
          const { centre, offset } = wallBase(0, spec.z - .3);
          const prof = profile(spec.z - .3);
          return { z: spec.z - .3, centre: centre.clone(), radii: new THREE.Vector3(Math.abs(offset.x), 3.25 * prof, 1.75 * prof), inner: spec.inner, lobes: spec.lobes, seed: spec.seed };
        }),
        shafts: {
          basis: new THREE.Matrix3().setFromMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(budAxis)),
          // Gaps between the seven bud petals (petal k is centred on k / 7 turns + 0.2 rad).
          count: 7, phase: .2 + Math.PI / 7, strength: 1.2,
        },
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
      coreLight.intensity = 40 * (.86 + .22 * breath);
      alcoveLight.intensity = 9 * (.86 + .22 * breath);
      // The fold lights drift on their own slow phases, never in step with the core.
      foldLights[0].intensity = 9 * (.85 + .18 * warmBreath(elapsed * .83 + 2.1));
      foldLights[1].intensity = 8 * (.85 + .18 * warmBreath(elapsed * .71 + 4.4));
      foldLights[2].intensity = 10 * (.85 + .18 * warmBreath(elapsed * .77 + 3.3));
      silkMaterial.color.setScalar(.8 * (.85 + .25 * warmBreath(elapsed * .9 + 1.0)));
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
