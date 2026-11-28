import * as THREE from 'three';
import type { WorldBuild } from './contracts';
import { clothSheet, cushion, stoneBlock } from './geometry';
import { captureRoomProbe } from './lighting';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { createFabricMaterial } from '../shared/render/fabricSurface';
import { createGlazeMaterial, patchSurface } from '../shared/render/interiorSurface';
import { applyBarkSurface } from '../shared/render/barkSurface';
import { applyFoliageShading, beforeMain, type FoliageWind } from '../shared/render/foliageShading';
import { concatGeometries } from '../shared/render/treeGeometry';
import { GLSL_NOISE } from '../shared/render/glsl';
import { fbm3, noise3, seeded } from '../shared/render/noise';
import { cypressSprayAtlas, meadowAtlas, MEADOW_VARIANTS, oliveSprayAtlas, type MeadowVariant } from './gardenPaint';
import {
  OLIVE_BARK, TO_SUN, blobGeometry, groundBounce, buildCypress, buildOlive, createGardenVolume, farmhouseGeometry, groundY, groveOlive, instanceTufts, meadowDry,
  meadowLush, mergeCrowns, oliveCanopy, pathX, ridgeGeometry, ridgeSurface, shadowDecals, tuftGeometry, type Crown, type OliveSpec, type TuftPlacement,
} from './napGarden';

/*
 * 파워 냅: reclined on a teak chaise under a tensioned linen sail on a limestone
 * terrace, early afternoon. Beyond the low coping a meadow of dry gold and green
 * grass with drifts of poppies and chamomile runs past old olives with twisted,
 * split trunks to a grove on the rising slope, a lane of cypresses, farmhouses
 * with terracotta roofs and hills fading into blue distance under a clear sky.
 * The sun is a strong key light; one canopy function dapples the leaves, the
 * meadow, the terrace and the sail's transmitted glow. The shade is lit by the
 * sky and the sunlit garden (a radiance probe of the scene itself).
 * Original procedural work.
 */

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uSun;
varying vec3 vWorld;
void main() {
  vec3 d = normalize(vWorld - cameraPosition);
  float h = max(d.y, -0.05);
  // Clear Mediterranean afternoon: a deep, saturated zenith over a lighter horizon
  // that stays blue (linear radiance, graded by the HDR pipeline), a little paler
  // toward the sun's azimuth.
  float toward = dot(normalize(vec3(d.x, 0.0, d.z) + 1e-5), normalize(vec3(uSun.x, 0.0, uSun.z))) * 0.5 + 0.5;
  vec3 zenith = vec3(0.11, 0.31, 0.98), horizon = mix(vec3(0.3, 0.68, 2.1), vec3(0.52, 0.8, 1.95), pow(toward, 4.0));
  vec3 sky = mix(horizon, zenith, pow(clamp(h / 0.5, 0.0, 1.0), 0.6));
  // Only a thin, pale band right on the horizon line.
  sky = mix(sky, vec3(0.58, 0.84, 1.9), exp(-max(h, 0.0) * 60.0) * 0.45);
  // The sun's aureole brightens the sky on its side; the HDR disc itself is hidden
  // by the sail from the chaise and shows only in the radiance probe's highlights.
  float mu = max(dot(d, uSun), 0.0);
  sky += vec3(1.0, 0.9, 0.72) * (pow(mu, 6.0) * 0.36 + pow(mu, 20.0) * 1.8 + pow(mu, 400.0) * 30.0);
  // A few fair-weather cumulus low over the hills: bright sun side, blue-grey shade.
  vec2 cp = d.xz / max(h + 0.1, 0.04) * 0.55;
  float c = bwFbm5(vec3(cp * vec2(0.8, 1.5) + vec2(3.0, 1.0), 1.3));
  float cloud = smoothstep(0.3, 0.4, c) * smoothstep(0.035, 0.1, h) * (1.0 - smoothstep(0.3, 0.55, h));
  // Sunlit tops, cooler flat bases: lit from above-left, the base faces the shaded ground.
  float cLit = smoothstep(0.3, 0.52, c) * (0.6 + 0.4 * toward);
  vec3 cloudColor = mix(vec3(0.78, 0.9, 1.4), vec3(2.5, 2.4, 2.2), cLit);
  sky = mix(sky, cloudColor, cloud * 0.9);
  // Below the horizon (seen only by the radiance probe, behind the terrace): sunlit dry
  // fields, so shade facing away from the garden takes warm ground bounce, not sky blue.
  sky = mix(sky, vec3(0.4, 0.32, 0.2), smoothstep(0.0, -0.08, d.y));
  gl_FragColor = vec4(sky, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

// Independently authored geometry. No external model, image, shader or demo code.
// The garden is built in metres around a reclining viewer, not a miniature set.
function randomSeed(seed: number) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
}
function cylinderBetween(a: THREE.Vector3, b: THREE.Vector3, r: number, material: THREE.Material, top = r) {
  const d = b.clone().sub(a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, r, d.length(), 10), material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

/** A slightly folded narrow leaf with a raised central vein (rosemary in the pot). */
function leafGeometry() {
  const vertices: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let row = 0; row <= 5; row++) {
    const t = row / 5, width = Math.sin(t * Math.PI) * 0.035;
    for (let col = 0; col < 3; col++) {
      vertices.push((col - 1) * width, t * 0.17, Math.sin(t * Math.PI) * (col === 1 ? 0.009 : -0.005));
      uvs.push(col / 2, t);
    }
  }
  for (let row = 0; row < 5; row++) for (let col = 0; col < 2; col++) {
    const i = row * 3 + col;
    indices.push(i, i + 1, i + 3, i + 1, i + 4, i + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

const srgb = (h: number, s: number, l: number) => new THREE.Color().setHSL(h, s, l, THREE.SRGBColorSpace);

/**
 * Old olive bark is split by broad, deep furrows rather than hairline cracks:
 * widens barkSurface's fissure band (left as is if that line ever changes).
 */
function deepFurrows<T extends THREE.MeshStandardMaterial>(material: T, width: number): T {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.fragmentShader = shader.fragmentShader.replace('float fiss = 1.0 - smoothstep(0.0, 0.2, abs(n));', `float fiss = 1.0 - smoothstep(0.02, ${width.toFixed(3)}, abs(n));`);
  };
  const key = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${key()}|nap-furrows-${width}`;
  return material;
}

export function createNapTerraceWorld(): WorldBuild {
  const rng = randomSeed(48203);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#a9bfd3');
  const camera = new THREE.PerspectiveCamera(55, 1, 0.05, 520);
  const target = new THREE.Vector3();
  const timeUniform = { value: 0 };

  // ---- Garden: olives, cypresses and the canopy they cast --------------------------------------------
  const oliveSpecs: OliveSpec[] = [
    // The old tree at the terrace's left corner: its crown reaches over the sail.
    { seed: 81, x: -5.2, z: -5.6, strands: 3, girth: 0.5, split: 1.45, crown: 4.8, lean: [0.55, 0.9], open: 0.7, reach: 1.25, twist: 1.3, crownLean: [2.4, 2.2], gnarl: 1.3, scaffold: { limbs: 2, length: 2.7 }, detail: 'hero', leafSize: 0.44, cards: 10 },
    { seed: 832, x: 5.4, z: -10.2, strands: 2, girth: 0.36, split: 1.15, crown: 4.3, lean: [-0.2, 0.15], reach: 1.0, detail: 'mid', leafSize: 0.56, cards: 12 },
    { seed: 279, x: -1.6, z: -16.0, strands: 3, girth: 0.4, split: 1.0, crown: 3.9, reach: 0.95, detail: 'mid', leafSize: 0.6, cards: 11 },
    { seed: 11, x: -10.2, z: -12.2, strands: 2, girth: 0.4, split: 1.25, crown: 4.6, reach: 1.05, detail: 'mid', leafSize: 0.58, cards: 12 },
    { seed: 737, x: 10.4, z: -19.5, strands: 2, girth: 0.33, split: 1.0, crown: 4.0, detail: 'mid', leafSize: 0.64, cards: 10 },
    { seed: 622, x: 3.8, z: -25.5, strands: 1, girth: 0.3, split: 1.0, crown: 4.0, detail: 'mid', leafSize: 0.68, cards: 10 },
  ];
  const olives = oliveSpecs.map(buildOlive);
  const crowns: Crown[] = [...olives[0].crowns, ...olives.slice(1).map(o => mergeCrowns(o.crowns, 0.88))];
  // Leaves a metre or two above the sail and flags cast crisp dapples: a narrow transition width.
  const canopy = oliveCanopy({ crowns: crowns.map(c => ({ centre: c.centre, radius: c.radius.clone().multiplyScalar(0.92) })), density: 1.8, gaps: -0.04, softness: 0.1, fleck: 6.5, clump: 2.2, time: timeUniform });
  const treeWind: FoliageWind = { time: timeUniform, mode: 'attribute', sway: 0.12, flutter: 0.018, direction: [1, 0.35], speed: 0.75 };
  // Warm light bounced up from the sunlit meadow; the trunks, standing in it, take the most.
  const meadowBounce = new THREE.Color(1.0, 0.8, 0.5).multiplyScalar(0.3);
  const oliveBark = groundBounce(applyFoliageShading(deepFurrows(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), {
    key: 'nap-olive-bark', scale: OLIVE_BARK.scale, stretch: OLIVE_BARK.stretch, depth: 0.035, plate: '#bdb7a4', fissure: '#3b352c',
    lichen: { color: '#cfd0b8', amount: 0.5 }, moss: { color: '#6b6f3a', amount: 0.12, below: -0.2, side: new THREE.Vector3(0.5, 0, 0.8) },
  }), 0.36), { key: 'nap-olive-bark', canopy, wind: treeWind }), 'bark', meadowBounce.clone().multiplyScalar(2.2));
  const oliveMap = oliveSprayAtlas(11);
  // Waxy olive leaves: a tighter specular lobe glints in the sun; thin blades glow when backlit.
  const oliveLeaves = groundBounce(applyFoliageShading(new THREE.MeshStandardMaterial({ map: oliveMap, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.4, metalness: 0 }), {
    key: 'nap-olive-leaves', canopy, wind: treeWind, sharedNormals: true, coverage: true,
    translucency: { tint: '#e4f09a', back: 0.55, forward: 1.5 },
  }), 'leaves', meadowBounce.clone().multiplyScalar(0.7));
  const barkMesh = new THREE.Mesh(concatGeometries(olives.map(o => o.bark)), oliveBark);
  barkMesh.castShadow = true; barkMesh.receiveShadow = true; barkMesh.name = 'olive-bark'; scene.add(barkMesh);
  const leafMesh = new THREE.Mesh(concatGeometries(olives.map(o => o.leaves)), oliveLeaves);
  leafMesh.receiveShadow = true; leafMesh.name = 'olive-leaves'; scene.add(leafMesh);
  olives.forEach(o => { o.bark.dispose(); o.leaves.dispose(); });

  // The grove on the rising slope: three tree forms, instanced in planted rows.
  const groveRandom = seeded(5021);
  const groveForms = [groveOlive(401, 8, 0.95), groveOlive(402, 7, 1.0), groveOlive(403, 8, 0.9)];
  const groveSpots: Array<{ x: number; z: number; s: number; yaw: number }> = [];
  for (let row = 0; row < 7; row++) {
    const z0 = -31 - row * 6.2;
    for (let col = -9; col <= 9; col++) {
      const x = col * 6.4 + (row % 2) * 3.2 + (groveRandom() - 0.5) * 1.2, z = z0 + (groveRandom() - 0.5) * 1.2;
      if (Math.abs(x - 14.5 - (z + 30) * -0.12) < 3.2) continue; // the cypress lane
      // The path climbs on through the grove as a cart lane, opening a view of the far hills.
      if (Math.abs(x - pathX(z)) < 3.2 + row * 0.45) continue;
      if (groveRandom() < 0.08) continue;
      groveSpots.push({ x, z, s: 0.8 + groveRandom() * 0.45, yaw: groveRandom() * Math.PI * 2 });
    }
  }
  const groveMatrices: THREE.Matrix4[][] = [[], [], []];
  groveSpots.forEach((g, i) => groveMatrices[i % 3].push(new THREE.Matrix4().compose(new THREE.Vector3(g.x, groundY(g.x, g.z), g.z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), g.yaw), new THREE.Vector3(g.s, g.s * (0.9 + (i % 5) * 0.04), g.s))));
  groveForms.forEach((form, i) => {
    for (const [geometry, material] of [[form.bark, oliveBark], [form.leaves!, oliveLeaves]] as const) {
      const mesh = new THREE.InstancedMesh(geometry, material, groveMatrices[i].length);
      groveMatrices[i].forEach((m, j) => mesh.setMatrixAt(j, m));
      mesh.receiveShadow = true; mesh.castShadow = false; mesh.name = 'grove';
      mesh.computeBoundingSphere(); scene.add(mesh);
    }
  });

  // Italian cypresses: a lane climbing the slope on the right, a few on the left.
  const cypressSpots: Array<[number, number, number, number]> = [];
  for (let i = 0; i < 8; i++) { const z = -23 - i * 4.4; cypressSpots.push([14.5 + (z + 30) * -0.12 + (i % 2) * 0.4, z, 10 + ((i * 7) % 5) * 0.9, 1.0 + (i % 3) * 0.08]); }
  cypressSpots.push([-17.5, -28, 12.5, 1.1], [-20.2, -31.5, 11, 1.0], [-15.8, -33, 13.5, 1.15], [-4.5, -56, 11, 1.0], [-1.8, -58, 12, 1.05]);
  const cypresses = cypressSpots.map(([x, z, h, r], i) => buildCypress({ seed: 50 + i, base: new THREE.Vector3(x, groundY(x, z) - 0.3, z), height: h, radius: r, cards: Math.round(h * 26), size: 0.95 }));
  const cypressMap = cypressSprayAtlas(5);
  const cypressLeaves = applyFoliageShading(new THREE.MeshStandardMaterial({ map: cypressMap, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.75, metalness: 0 }), {
    key: 'nap-cypress', wind: { ...treeWind, sway: 0.08, flutter: 0.01 }, sharedNormals: true, coverage: true,
    translucency: { tint: '#c8d890', back: 0.2, forward: 0.4 },
  });
  const cypressLeafMesh = new THREE.Mesh(concatGeometries(cypresses.map(c => c.leaves)), cypressLeaves);
  cypressLeafMesh.receiveShadow = true; cypressLeafMesh.name = 'cypress'; scene.add(cypressLeafMesh);
  const cypressCore = new THREE.Mesh(concatGeometries(cypresses.map(c => { c.core.deleteAttribute('uv'); return c.core; })), new THREE.MeshStandardMaterial({ color: '#131c0d', roughness: 1 }));
  cypressCore.name = 'cypress-core'; scene.add(cypressCore);
  cypresses.forEach(c => { c.leaves.dispose(); c.core.dispose(); });

  // ---- Ground: meadow, path and grove slope --------------------------------------------------------
  const terrainPositions: number[] = [], terrainIndices: number[] = [];
  const rows = 96, columns = 110;
  for (let r = 0; r <= rows; r++) {
    const t = r / rows, z = -4.2 - 116 * t * t;
    for (let c = 0; c <= columns; c++) {
      const u = c / columns, x = (u - 0.5) * (34 + 300 * t);
      terrainPositions.push(x, groundY(x, z), z);
      if (r < rows && c < columns) { const a = r * (columns + 1) + c, b = a + columns + 1; terrainIndices.push(a, a + 1, b, a + 1, b + 1, b); }
    }
  }
  const terrainGeometry = new THREE.BufferGeometry();
  terrainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(terrainPositions, 3));
  terrainGeometry.setIndex(terrainIndices); terrainGeometry.computeVertexNormals();
  const terrainMaterial = applyFoliageShading(patchSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.95 }), {
    key: 'nap-meadow-v2',
    color: `
vec3 mp = vSurfaceWorld;
float mDry = smoothstep(-0.18, 0.3, bwFbm3(vec3(mp.x * 0.07 + 4.0, 0.5, mp.z * 0.07)));
float mLush = bwFbm3(vec3(mp.x * 0.16 + 9.0, 1.5, mp.z * 0.16));
float mFine = bwNoise(mp * 7.0) * bwResolve(length(fwidth(mp)) * 7.0);
float mClump = bwNoise(vec3(mp.x * 1.7, 2.0, mp.z * 1.7));
vec3 green = vec3(0.055, 0.13, 0.018), gold = vec3(0.5, 0.32, 0.085), soil = vec3(0.2, 0.13, 0.07);
// Green and gold meet over a short distance: patches, not a blend.
vec3 mColor = mix(green, gold, smoothstep(0.15, 0.75, mDry * 0.9 - mLush * 0.25));
mColor *= 0.78 + 0.2 * mClump + 0.08 * mFine;
mColor = mix(mColor, soil, smoothstep(0.35, 0.75, -mClump) * 0.35);
// Thatch between the tufts: last year's grass lies dark and matted in the shade of the new.
mColor *= 0.52 + 0.18 * smoothstep(-0.3, 0.5, mClump);
// Trodden path: pale dusty earth with pebbles, grass creeping in at its edges.
float mPathD = abs(mp.x - (1.4 + sin(((-mp.z - 4.6) / 0.6) * 0.092) * 2.5));
float mPathW = 0.48 + max(0.0, -mp.z) * 0.004 + 0.08 * bwNoise(mp * 1.3);
float mPath = (1.0 - smoothstep(mPathW * 0.7, mPathW * 1.25, mPathD)) * step(mp.z, -4.3) * (1.0 - smoothstep(64.0, 70.0, -mp.z));
float mPebble = step(0.74, bwValue(mp * 22.0)) * bwResolve(length(fwidth(mp)) * 22.0);
vec3 earth = vec3(0.4, 0.31, 0.2) * (0.85 + 0.15 * bwNoise(mp * 3.0)) * (1.0 + 0.25 * mPebble);
mColor = mix(mColor, earth, mPath);
// The grove floor: dry stubble and tilled earth between the planted rows.
float mGrove = smoothstep(26.0, 31.0, -mp.z);
vec3 mStubble = mix(vec3(0.27, 0.2, 0.09), vec3(0.17, 0.12, 0.07), smoothstep(-0.1, 0.6, bwNoise(mp * 0.4)));
mStubble = mix(mStubble, vec3(0.12, 0.13, 0.05), smoothstep(0.3, 0.7, bwNoise(mp * 0.13 + 4.0)) * 0.6);
mColor = mix(mColor, mStubble * (0.85 + 0.2 * mFine), mGrove * 0.8);
diffuseColor.rgb = mColor;`,
    height: 'mClump * 0.02 + mFine * 0.006',
    roughness: 'roughnessFactor = mix(roughnessFactor, 0.85, mPath);',
  }), { key: 'nap-meadow-v2', canopy });
  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial); terrain.receiveShadow = true; terrain.name = 'meadow-ground'; scene.add(terrain);

  // Meadow tufts: drawn cards in clumps, varied by the same low-frequency fields
  // the ground shader uses; a dense near band and a coarser far band (LOD).
  const meadowMap = meadowAtlas(7);
  const grassWind: FoliageWind = { time: timeUniform, mode: 'height', height: 1, sway: 0.05, flutter: 0.012, direction: [1, 0.35], speed: 0.8 };
  const grassMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: meadowMap, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.82, metalness: 0 }), {
    key: 'nap-meadow-tufts', canopy, wind: grassWind, sharedNormals: true, coverage: true,
    translucency: { tint: '#ecee92', back: 0.45, forward: 1.0 },
  });
  const near: Record<MeadowVariant, TuftPlacement[]> = { green: [], dry: [], mixed: [], poppy: [], daisy: [], lavender: [] };
  const far: Record<MeadowVariant, TuftPlacement[]> = { green: [], dry: [], mixed: [], poppy: [], daisy: [], lavender: [] };
  const meadowRandom = seeded(811);
  const tint = (variant: MeadowVariant, dry: number) => {
    const k = 0.7 + meadowRandom() * 0.42;
    // Sun-ripened gold leans warm; the green stays green, so the two read apart in the light.
    if (variant === 'dry') return new THREE.Color(k * (1.1 + dry * 0.06), k, k * (0.74 + meadowRandom() * 0.1));
    if (variant === 'mixed') return new THREE.Color(k * (1.02 + dry * 0.06), k, k * (0.8 + meadowRandom() * 0.1));
    if (variant === 'green') return new THREE.Color(k * 0.88, k * (1.08 - dry * 0.05), k * 0.72);
    return new THREE.Color(k, k * (1.02 - dry * 0.05), k * 0.95);
  };
  const place = (band: Record<MeadowVariant, TuftPlacement[]>, x: number, z: number, scale: number, stubble = false) => {
    const dry = meadowDry(x, z), lush = meadowLush(x, z);
    const pathD = Math.abs(x - pathX(z));
    // Thin and shorten toward the path; it is mown along its verges.
    const verge = THREE.MathUtils.smoothstep(pathD, 0.45, 2.2);
    if (meadowRandom() > 0.15 + 0.85 * verge) return;
    const poppy = THREE.MathUtils.smoothstep(fbm3(x * 0.11 + 21, 2.5, z * 0.11, 3), 0.22, 0.4);
    const daisy = THREE.MathUtils.smoothstep(fbm3(x * 0.09 - 7, 3.5, z * 0.09, 3), 0.2, 0.42) * (1 - dry * 0.6);
    let variant: MeadowVariant;
    const roll = meadowRandom();
    if (stubble) variant = meadowRandom() < 0.7 - lush * 0.3 ? 'dry' : 'mixed';
    else if (roll < poppy * 0.2) variant = 'poppy';
    else if (roll < poppy * 0.2 + daisy * 0.24) variant = 'daisy';
    else { const d = dry * 0.9 + (meadowRandom() - 0.5) * 0.3 - lush * 0.35; variant = d > 0.62 ? 'dry' : d > 0.3 ? 'mixed' : 'green'; }
    const height = (0.42 + meadowRandom() * 0.38 + dry * 0.18 + lush * 0.12) * (0.45 + 0.55 * verge) * scale;
    band[variant].push({ x, y: groundY(x, z) - 0.03, z, yaw: meadowRandom() * Math.PI * 2, width: height * (0.95 + meadowRandom() * 0.45), height, tint: tint(variant, dry) });
  };
  for (let i = 0; i < 6800; i++) {
    const z = -5.3 - Math.pow(meadowRandom(), 1.15) * 20, half = Math.min(26, 5 + -z * 0.95), x = (meadowRandom() - 0.5) * 2 * half;
    if (z > -6.8 && meadowRandom() < 0.6) continue; // hidden behind the coping
    place(near, x, z, 1);
  }
  for (let i = 0; i < 2600; i++) {
    const z = -25.3 - Math.pow(meadowRandom(), 0.9) * 12, half = Math.min(52, 6 + -z * 0.95), x = (meadowRandom() - 0.5) * 2 * half;
    place(far, x, z, 1.55);
  }
  // Sparse dry stubble on the grove slope, thinning toward the crest.
  for (let i = 0; i < 4200; i++) {
    const z = -37.3 - Math.pow(meadowRandom(), 1.3) * 28, half = Math.min(66, 6 + -z * 0.95), x = (meadowRandom() - 0.5) * 2 * half;
    place(far, x, z, 1.35, true);
  }
  // Lavender planted along the foot of the terrace, clear of the path.
  for (let i = 0; i < 30; i++) {
    const side = i < 15 ? -1 : 1, k = i % 15;
    const x = side < 0 ? -5.3 + k * 0.29 + (meadowRandom() - 0.5) * 0.12 : 2.55 + k * 0.2 + (meadowRandom() - 0.5) * 0.12;
    const z = -4.95 - (k % 2) * 0.42 - meadowRandom() * 0.15;
    const height = 0.62 + meadowRandom() * 0.18;
    near.lavender.push({ x, y: groundY(x, z) - 0.04, z, yaw: meadowRandom() * Math.PI * 2, width: height * 1.15, height, tint: new THREE.Color(0.9 + meadowRandom() * 0.15, 0.9 + meadowRandom() * 0.1, 0.95 + meadowRandom() * 0.1) });
  }
  MEADOW_VARIANTS.forEach((variant, column) => {
    if (near[variant].length) { const m = instanceTufts(tuftGeometry(column, MEADOW_VARIANTS.length, 3, 3, 30 + column), grassMaterial, near[variant]); m.name = `meadow-near-${variant}`; scene.add(m); }
    if (far[variant].length) { const m = instanceTufts(tuftGeometry(column, MEADOW_VARIANTS.length, 2, 1, 60 + column), grassMaterial, far[variant]); m.name = `meadow-far-${variant}`; scene.add(m); }
  });

  // ---- Distance: farmed ridges, a far blue range, farmhouses, more olives and cypresses -------------
  const ridgeMaterial = (key: string, base: string, detail: number) => patchSurface(new THREE.MeshStandardMaterial({ color: base, roughness: 1 }), {
    key,
    color: `
vec3 rp = vSurfaceWorld;
// Field patchwork: rotated plots of stubble, ploughed earth and dry pasture.
vec2 rq = mat2(0.94, -0.34, 0.34, 0.94) * rp.xz * vec2(0.035, 0.06);
vec2 rCell = floor(rq);
float rId = bwHash1(vec3(rCell, 3.0));
vec3 plot = rId < 0.35 ? vec3(0.3, 0.22, 0.1) : rId < 0.55 ? vec3(0.2, 0.12, 0.07) : rId < 0.8 ? vec3(0.24, 0.2, 0.1) : vec3(0.11, 0.13, 0.05);
float rEdge = 1.0 - smoothstep(0.0, 0.06, min(min(fract(rq.x), 1.0 - fract(rq.x)), min(fract(rq.y), 1.0 - fract(rq.y))));
vec3 rColor = mix(diffuseColor.rgb, plot, ${detail.toFixed(2)});
rColor = mix(rColor, vec3(0.1, 0.13, 0.06), rEdge * 0.55 * ${detail.toFixed(2)});
float rScrub = smoothstep(0.1, 0.5, bwFbm3(rp * 0.03 + 5.0));
rColor = mix(rColor, vec3(0.06, 0.08, 0.035), rScrub * 0.7);
rColor *= 0.85 + 0.25 * bwNoise(rp * 0.08);
diffuseColor.rgb = rColor;`,
  });
  const ridge0 = new THREE.Mesh(ridgeGeometry(0, -175, 95, 520, 180), ridgeMaterial('nap-ridge-near', '#6b6440', 1)); ridge0.name = 'ridge-near'; scene.add(ridge0);
  const ridge1 = new THREE.Mesh(ridgeGeometry(1, -330, 140, 900, 140), ridgeMaterial('nap-ridge-far', '#3e4a3a', 0.3)); ridge1.name = 'ridge-far'; scene.add(ridge1);
  // Olive groves and cypress lines on the near ridge: low blobs and cones.
  const blobRandom = seeded(7310);
  const blobs: THREE.Matrix4[] = [], cones: THREE.Matrix4[] = [];
  const decalSpots: Array<{ x: number; y: number; z: number; radius: number; height: number; strength: number; normal?: THREE.Vector3 }> = [];
  for (let i = 0; i < 1400 && blobs.length < 420; i++) {
    // Mostly on the upper slopes, which show above the grove's crest.
    const x = (blobRandom() - 0.5) * 320, z = -175 + 95 * (0.04 + Math.pow(blobRandom(), 1.6) * 0.6);
    // Planted in patches: a field mask, then snapped to rows along the contour.
    if (fbm3(x * 0.012, 7.5, z * 0.02, 3) < 0.02) continue;
    const rowZ = Math.round(z / 7) * 7 + (blobRandom() - 0.5) * 0.8;
    const y = ridgeSurface(0, -175, 95, x, rowZ);
    const s = 2.1 + blobRandom() * 0.8;
    blobs.push(new THREE.Matrix4().compose(new THREE.Vector3(x, y + s * 0.7, rowZ), new THREE.Quaternion(), new THREE.Vector3(s * 1.15, s * 0.85, s * 1.15)));
  }
  const houseSpots: Array<[number, number, number]> = [[-62, -128, 0.2], [38, -136, -0.3], [96, -146, 0.5], [-118, -150, -0.1]];
  for (const [hx, hz] of houseSpots) for (let k = 0; k < 4; k++) {
    const x = hx + (k - 1.5) * 4.5 + (blobRandom() - 0.5) * 2, z = hz + 9 + (blobRandom() - 0.5) * 3;
    const h = 11 + blobRandom() * 4;
    cones.push(new THREE.Matrix4().compose(new THREE.Vector3(x, ridgeSurface(0, -175, 95, x, z) - 0.5, z), new THREE.Quaternion(), new THREE.Vector3(1.6, h, 1.6)));
  }
  for (let k = 0; k < 9; k++) { const x = -20 + k * 5.2, z = -120 - k * 3.5; cones.push(new THREE.Matrix4().compose(new THREE.Vector3(x, ridgeSurface(0, -175, 95, x, z) - 0.5, z), new THREE.Quaternion(), new THREE.Vector3(1.5, 10 + (k % 3) * 1.5, 1.5))); }
  const farTreeMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness: 0.92 }), {
    key: 'nap-far-trees', color: 'diffuseColor.rgb *= 0.8 + 0.35 * bwNoise(vSurfaceWorld * 1.3);',
  });
  const blobMesh = new THREE.InstancedMesh(blobGeometry(3), farTreeMaterial, blobs.length);
  blobs.forEach((m, i) => { blobMesh.setMatrixAt(i, m); blobMesh.setColorAt(i, srgb(0.2 + blobRandom() * 0.05, 0.2, 0.13 + blobRandom() * 0.05)); });
  blobMesh.computeBoundingSphere(); blobMesh.name = 'far-groves'; scene.add(blobMesh);
  const coneGeometry = new THREE.ConeGeometry(0.5, 1, 7, 1, true); coneGeometry.translate(0, 0.5, 0);
  const coneColors = new Float32Array(coneGeometry.attributes.position.count * 3);
  for (let i = 0; i < coneGeometry.attributes.position.count; i++) { const ao = 0.55 + 0.45 * coneGeometry.attributes.position.getY(i); coneColors.set([ao, ao, ao], i * 3); }
  coneGeometry.setAttribute('color', new THREE.BufferAttribute(coneColors, 3));
  const coneMesh = new THREE.InstancedMesh(coneGeometry, farTreeMaterial, cones.length);
  cones.forEach((m, i) => { coneMesh.setMatrixAt(i, m); coneMesh.setColorAt(i, srgb(0.24, 0.3, 0.12)); });
  coneMesh.computeBoundingSphere(); coneMesh.name = 'far-cypress'; scene.add(coneMesh);
  const houses = new THREE.Mesh(farmhouseGeometry(houseSpots.map(([x, z, yaw], i) => ({
    x, z, yaw, y: ridgeSurface(0, -175, 95, x, z), w: 11 + i * 1.5, d: 7.5, h: 6 + (i % 2) * 2.5,
    wall: srgb(0.1 + i * 0.01, 0.32, 0.72), roof: srgb(0.035, 0.52, 0.42),
  }))), patchSurface(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), { key: 'nap-farmhouses', color: 'diffuseColor.rgb *= 0.88 + 0.18 * bwNoise(vSurfaceWorld * 0.9);' }));
  houses.name = 'farmhouses'; scene.add(houses);
  // Soft shadows under trees beyond the shadow map.
  const slopeNormal = (x: number, z: number) => new THREE.Vector3(groundY(x - 0.5, z) - groundY(x + 0.5, z), 1, groundY(x, z - 0.5) - groundY(x, z + 0.5)).normalize();
  for (const g of groveSpots) decalSpots.push({ x: g.x, y: groundY(g.x, g.z), z: g.z, radius: 1.9 * g.s, height: 2.6 * g.s, strength: 0.5, normal: slopeNormal(g.x, g.z) });
  for (const [x, z, h] of cypressSpots) decalSpots.push({ x, y: groundY(x, z), z, radius: 1.2, height: h * 0.4, strength: 0.5, normal: slopeNormal(x, z) });
  const decals = shadowDecals(decalSpots.map(s => {
    const offset = s.height / TO_SUN.y, sx = s.x - TO_SUN.x * offset, sz = s.z - TO_SUN.z * offset;
    return { ...s, y: groundY(sx, sz), normal: slopeNormal(sx, sz) };
  }));
  decals.name = 'grove-shadows'; scene.add(decals);

  // ---- Terrace, chaise, table, sail --------------------------------------------------------------------
  const warmWood = createWoodMaterial('#8a6440', { key: 'nap-teak', axis: 'z', objectSpace: true, rings: 36, figure: 0.55, pores: 0.45, wear: 0.35, varnish: 0.15, roughness: 0.6 });
  const stemMaterial = new THREE.MeshStandardMaterial({ color: '#5d5544', roughness: 0.95 });
  const chairLinen = createFabricMaterial('#d8ccb0', { key: 'nap-cushion', weave: 'plain', threads: [220, 220], heather: 0.7, threadContrast: 0.6, fuzz: 0.4, depth: 0.0006, sheen: 0.4, roughness: 0.9 });
  const throwLinen = createFabricMaterial('#7f9479', { key: 'nap-throw', weave: 'twill', threads: [160, 160], heather: 0.9, threadContrast: 0.6, fuzz: 0.5, depth: 0.0009, sheen: 0.5, sheenColor: '#d8e6cf', roughness: 0.92,
    pattern: 'fbBase *= 0.9 + 0.12 * step(0.82, fract(fbUv.x * 6.0)) - 0.05 * step(0.9, fract(fbUv.y * 6.0));' }, { side: THREE.DoubleSide });
  // The sail: linen lit from above. Its underside shows sunlight transmitted
  // through the weave, shaded by the olive crown over the terrace corner: the
  // same canopy function as the ground dapple, averaged over a few close taps.
  // `sailGain` scales the glow: the eye sees it in full, but the radiance probe
  // takes it at the light a real canvas passes (about a third of the sun), so
  // the shade beneath stays shade.
  const sailGain = { value: 1 };
  const sailMat = createFabricMaterial('#efe4c8', {
    key: 'nap-sail', weave: 'plain', threads: [2400, 1650], heather: 0.4, fuzz: 0.2, depth: 0.0005, roughness: 0.95,
    // Panel seams and the taped hem are two layers of cloth, so they pass less light; corner patches more so.
    pattern: `
vec2 sM = vec2(min(fbUv.x, 1.0 - fbUv.x) * 7.3, min(fbUv.y, 1.0 - fbUv.y) * 5.0);
float sSeam = abs(fract(fbUv.x * 5.0 + 0.5) - 0.5) * 7.3 / 5.0;
float sAa = fwidth(fbUv.x) * 7.3;
float sBand = 1.0 - smoothstep(0.012 - sAa, 0.012 + sAa, sSeam);
float sTape = 1.0 - smoothstep(0.045 - sAa, 0.045 + sAa, min(sM.x, sM.y));
float sPatch = 1.0 - smoothstep(0.42 - sAa, 0.42 + sAa, sM.x + sM.y);
fbBase *= 1.0 - 0.3 * max(sBand, sTape) - 0.25 * sPatch;`,
  }, { side: THREE.DoubleSide, emissive: '#ffffff', emissiveIntensity: 1 });
  const sailPrevious = sailMat.onBeforeCompile;
  sailMat.onBeforeCompile = (shader, renderer) => {
    sailPrevious.call(sailMat, shader, renderer);
    shader.uniforms.uNapSailGain = sailGain;
    shader.fragmentShader = beforeMain(shader.fragmentShader, 'uniform float uNapSailGain;').replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 sp = vSurfaceWorld + vec3(0.0, 0.03, 0.0);
  // Leaf-scale serration: a fine warp of the lookup breaks the cluster outlines into leaves.
  vec2 sw = vec2(bwNoise(sp * 23.0), bwNoise(sp * 23.0 + 7.3)) * 0.05 + vec2(bwNoise(sp * 8.0 + 3.1), bwNoise(sp * 8.0 + 5.7)) * 0.06;
  vec3 sq = sp + vec3(sw.x, 0.0, sw.y);
  // A few close taps: the leaves are a metre or two above the cloth, so their shadows stay crisp.
  float leaf = (bwCanopy(sq) + bwCanopy(sq + vec3(0.035, 0.0, 0.01)) + bwCanopy(sq + vec3(-0.015, 0.0, 0.032)) + bwCanopy(sq + vec3(-0.02, 0.0, -0.026))) * 0.25;
  float sunUp = max(dot(normalize(vSurfaceNormal), uBwToSun), 0.55);
  // The weave scatters a little more light straight on: the cloth glows brightest where
  // it lies between the eye and the sun, so the sun's side of the sail is felt.
  float forward = pow(max(dot(normalize(vSurfaceWorld - cameraPosition), uBwToSun), 0.0), 4.0);
  // Sunlight diffused through the weave glows warm and bright enough to bloom. Under the
  // leaf shadows the cloth still glows: skylight plus sun scattered sideways in the weave.
  vec3 through = vec3(1.0, 0.8, 0.5) * (leaf * sunUp * (3.2 + 4.0 * forward)) + vec3(0.95, 0.84, 0.66) * 0.72;
  totalEmissiveRadiance = diffuseColor.rgb * through * (0.92 + 0.08 * fbH) * uNapSailGain;
}`);
  };
  applyFoliageShading(sailMat, { key: 'nap-sail', canopy });
  const brass = patchSurface(new THREE.MeshStandardMaterial({ color: '#9a8257', metalness: 1, roughness: 0.38 }), {
    key: 'nap-brass', color: 'float brN = bwFbm3(vSurfaceWorld * 14.0); diffuseColor.rgb *= 0.7 + 0.3 * brN;', roughness: 'roughnessFactor = clamp(roughnessFactor + 0.2 * brN, 0.12, 1.0);',
  });
  const hemMat = createFabricMaterial('#c9bd9c', { key: 'nap-hem', weave: 'twill', threads: [500, 120], roughness: 0.9 });
  // Honed limestone flags: random rectangular stones, grass in the joints, sun-faded tops.
  const floorStone = applyFoliageShading(patchSurface(new THREE.MeshStandardMaterial({ color: '#c3b799', roughness: 0.72 }), {
    key: 'nap-flags',
    color: `
vec2 fp = vSurfaceWorld.xz;
float fRow = floor(fp.y / 0.74);
float fShift = bwHash1(vec3(fRow, 4.0, 1.0)) * 3.0;
float fx = fp.x + fShift;
float fW = 0.62 + 0.5 * bwHash1(vec3(fRow, floor(fx / 0.9), 2.0));
float fCol = floor(fx / fW);
vec2 fLocal = vec2(fract(fx / fW) * fW, fract(fp.y / 0.74) * 0.74);
vec2 fEdge = min(fLocal, vec2(fW, 0.74) - fLocal);
float fJoint = 1.0 - smoothstep(0.004, 0.012 + 0.006 * bwNoise(vSurfaceWorld * 9.0), min(fEdge.x, fEdge.y));
float fId = bwHash1(vec3(fRow, fCol, 7.0));
float fMacro = bwFbm3(vSurfaceWorld * 0.9 + fId * 13.0);
float fFine = bwNoise(vSurfaceWorld * 26.0);
vec3 fColor = diffuseColor.rgb * (0.86 + 0.22 * fId + 0.1 * fMacro + 0.04 * fFine);
// Fossil shell flecks and darker pits in the limestone.
fColor *= 1.0 - 0.25 * smoothstep(0.7, 0.95, bwValue(vSurfaceWorld * 60.0 + fId * 9.0));
float fMoss = fJoint * smoothstep(-0.1, 0.4, bwNoise(vSurfaceWorld * 3.0));
fColor = mix(fColor, vec3(0.13, 0.12, 0.09), fJoint * 0.8);
fColor = mix(fColor, vec3(0.2, 0.24, 0.12), fMoss * 0.6);
diffuseColor.rgb = fColor;`,
    height: '-fJoint * 0.004 + fMacro * 0.0015 + fFine * 0.0002',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.12 * fMacro + fJoint * 0.25, 0.3, 1.0);',
  }), { key: 'nap-flags', canopy });
  const coping = applyFoliageShading(patchSurface(new THREE.MeshStandardMaterial({ color: '#c9bea2', roughness: 0.8 }), {
    key: 'nap-coping', color: 'float cpN = bwFbm3(vSurfaceWorld * 2.2); diffuseColor.rgb *= 0.88 + 0.16 * cpN + 0.05 * bwNoise(vSurfaceWorld * 30.0);', height: 'cpN * 0.002',
  }), { key: 'nap-coping', canopy });
  // The sun: the one key light, its soft shadow map refreshed now and then. Strong
  // against the sky's fill (as in clear Mediterranean air), so sun and shade separate.
  const sun = new THREE.DirectionalLight(new THREE.Color(1.0, 0.92, 0.78), 8.4);
  sun.position.copy(TO_SUN).multiplyScalar(24).add(new THREE.Vector3(-0.5, 0, -3)); sun.target.position.set(-0.5, 0, -3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -11.5, right: 11.5, top: 11.5, bottom: -11.5, near: 4, far: 46 });
  sun.shadow.normalBias = 0.03; sun.shadow.bias = -0.0002; sun.shadow.radius = 3;
  // The garden barely moves: refresh the sun's shadow map now and then, not every frame.
  sun.shadow.autoUpdate = false; sun.shadow.needsUpdate = true;
  scene.add(sun, sun.target);
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(480, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: { uSun: { value: TO_SUN.clone() } },
    vertexShader: 'varying vec3 vWorld; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: SKY_FRAGMENT,
  }));
  skyDome.renderOrder = -10; skyDome.frustumCulled = false; scene.add(skyDome);
  const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(geometry, material); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
  };

  // An open terrace of honed limestone flags (one slab, jointed in the shader).
  const slab = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, 8.1), floorStone);
  slab.position.set(0, -0.17, -0.25); slab.receiveShadow = true; slab.castShadow = true; scene.add(slab);
  // Low edge of the terrace, kept below the seated line of sight: coped stone.
  const edgeMesh = (w: number, h: number, d: number, x: number, y: number, z: number, seed: number) => {
    const m = new THREE.Mesh(stoneBlock(w, h, d, seed, 0.25, 0.03, 0, 0.06), coping); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; scene.add(m); return m;
  };
  edgeMesh(11, 0.15, 0.45, 0, -0.015, -4.5, 1);
  edgeMesh(0.48, 0.64, 7.3, -5.1, 0.2, -0.9, 2);
  edgeMesh(0.48, 0.5, 7.3, 5.1, 0.12, -0.9, 3);

  // The viewer is actually in a long chaise. Close armrests and wrinkled linen
  // establish body scale; rounded padding and seams avoid primitive box furniture.
  const chair = new THREE.Group(); scene.add(chair);
  const seatCushion = new THREE.Mesh(cushion(1.23, 0.2, 2.8, 0.22, 48, 4), chairLinen);
  seatCushion.position.set(0, 0.44, 1.45); seatCushion.rotation.x = -0.042; seatCushion.castShadow = seatCushion.receiveShadow = true; chair.add(seatCushion);
  const pipeMat = createFabricMaterial('#a79e84', { key: 'nap-piping', weave: 'twill', threads: [500, 80], roughness: 0.85 });
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(stoneBlock(0.105, 0.115, 2.7, 70 + side, 0.05, 0.02, 0, 0.04), warmWood);
    arm.position.set(side * 0.76, 0.79, 1.2); arm.rotation.x = -0.055; arm.castShadow = true; arm.receiveShadow = true; chair.add(arm);
    for (const z of [-0.07, 2.35]) chair.add(cylinderBetween(new THREE.Vector3(side * 0.68, 0.12, z), new THREE.Vector3(side * 0.76, 0.81, z), 0.028, warmWood));
    const seam = cylinderBetween(new THREE.Vector3(side * 0.589, 0.5, 0.10), new THREE.Vector3(side * 0.589, 0.61, 2.80), 0.006, pipeMat);
    chair.add(seam);
  }
  // A draped sage throw folds over the near right arm and the recliner foot.
  const throwGeo = clothSheet(60, 70, (u, v, target) => {
    const x = (u - 0.5) * 1.1, t = 1 - v;
    const folds = 0.007 * Math.sin(x * 41 + t * 13) + 0.019 * Math.sin(x * 12 + t * 3) + 0.018 * Math.cos(t * 11 + x * 4) + noise3(x * 6, t * 6, 3) * 0.008;
    target.set(x + 0.24, 0.69 + folds - Math.max(0, x - 0.41) * 0.9, 0.25 + t * 1.48);
  }, 0.008, [1.1, 1.48]);
  const blanket = new THREE.Mesh(throwGeo, throwLinen); blanket.receiveShadow = blanket.castShadow = true; chair.add(blanket);
  // Visible fine fringe on the far hem, one merged mesh.
  const fringe: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 30; i++) {
    const x = -0.29 + i * 0.036;
    const a = new THREE.Vector3(x, 0.687, 0.25), b = new THREE.Vector3(x + 0.007, 0.665, 0.18 - rng() * 0.028);
    const d = b.clone().sub(a);
    const g = new THREE.CylinderGeometry(0.0021, 0.0021, d.length(), 5);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()));
    g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2); g.deleteAttribute('uv');
    fringe.push(g);
  }
  const fringeMesh = new THREE.Mesh(concatGeometries(fringe), throwLinen); fringe.forEach(g => g.dispose());
  fringeMesh.castShadow = fringeMesh.receiveShadow = true; chair.add(fringeMesh);

  // Low slatted side table: tea, a closed clothbound book and thick pottery.
  const table = new THREE.Group(); table.position.set(-1.35, 0, 0.56); table.rotation.y = -0.11; scene.add(table);
  const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.49, 0.065, 64), warmWood); tableTop.position.y = 0.66; tableTop.castShadow = tableTop.receiveShadow = true; table.add(tableTop);
  for (let i = 0; i < 3; i++) {
    const angle = i / 3 * Math.PI * 2;
    table.add(cylinderBetween(new THREE.Vector3(Math.cos(angle) * 0.40, 0.04, Math.sin(angle) * 0.40), new THREE.Vector3(Math.cos(angle) * 0.3, 0.64, Math.sin(angle) * 0.3), 0.025, warmWood));
  }
  const book = new THREE.Mesh(stoneBlock(0.39, 0.037, 0.28, 81, 0.02, 0.006, 0, 0.03), createFabricMaterial('#b8a880', { key: 'nap-book', weave: 'plain', threads: [500, 500], roughness: 0.8 })); book.position.set(0.02, 0.72, 0.10); book.rotation.y = -0.20; book.castShadow = true; table.add(book);
  const pages = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.03, 0.26), new THREE.MeshStandardMaterial({ color: '#e0d6bb', roughness: 0.92 })); pages.position.set(0.024, 0.72, 0.102); pages.rotation.y = -0.20; table.add(pages);
  const cupProfile = [new THREE.Vector2(0.065, 0), new THREE.Vector2(0.067, 0.015), new THREE.Vector2(0.081, 0.10), new THREE.Vector2(0.079, 0.133), new THREE.Vector2(0.073, 0.136), new THREE.Vector2(0.073, 0.121), new THREE.Vector2(0.061, 0.021)];
  const cupMat = createGlazeMaterial('#d2cdb2', { key: 'nap-cup', pool: '#9a9372', speckle: 0.7, scale: 6 });
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 40), cupMat); cup.position.set(-0.19, 0.70, -0.12); cup.castShadow = true; table.add(cup);
  const tea = new THREE.Mesh(new THREE.CircleGeometry(0.071, 40), new THREE.MeshPhysicalMaterial({ color: '#3a2a14', roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02 })); tea.rotation.x = -Math.PI / 2; tea.position.set(-0.19, 0.821, -0.12); table.add(tea);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.012, 8, 24, Math.PI * 1.7), cupMat); handle.position.set(-0.275, 0.774, -0.12); handle.rotation.z = Math.PI * 0.15; table.add(handle);

  // Architectural tensioned sail, real fabric geometry with a curved edge and
  // corner loads. A narrow rolled hem, ropes and fittings make its thickness legible.
  const sailGeo = new THREE.PlaneGeometry(7.3, 5.0, 48, 36);
  const sailBase = new Float32Array(sailGeo.attributes.position.count * 3);
  const sailPosition = sailGeo.attributes.position;
  const sailHeight = (u: number, v: number) => 3.08 - 0.38 * Math.sin(u * Math.PI) * Math.sin(v * Math.PI) + 0.13 * u - 0.13 * v;
  for (let i = 0; i < sailPosition.count; i++) {
    const u = (sailPosition.getX(i) + 3.65) / 7.3, v = (sailPosition.getY(i) + 2.5) / 5;
    const x = (u - 0.5) * 7.3, z = 1.9 - v * 5 + Math.sin(u * Math.PI) * 0.25 * v;
    const y = sailHeight(u, v);
    sailPosition.setXYZ(i, x, y, z); sailBase[i * 3] = x; sailBase[i * 3 + 1] = y; sailBase[i * 3 + 2] = z;
  }
  sailGeo.computeVertexNormals();
  const sail = new THREE.Mesh(sailGeo, sailMat); sail.castShadow = true; sail.receiveShadow = false; sail.userData.cozyAction = 'canopy'; scene.add(sail);
  for (const v of [0, 1]) {
    const pts = Array.from({ length: 40 }, (_, i) => { const u = i / 39; return new THREE.Vector3((u - 0.5) * 7.3, sailHeight(u, v) - 0.004, 1.9 - v * 5 + Math.sin(u * Math.PI) * 0.25 * v); });
    const hem = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.012, 6, false), hemMat); hem.userData.cozyAction = 'canopy'; scene.add(hem);
  }
  for (const side of [-1, 1]) {
    const post = cylinderBetween(new THREE.Vector3(side * 3.97, 0, -3.45), new THREE.Vector3(side * 3.97, 3.53, -3.45), 0.043, warmWood, 0.039); scene.add(post);
    scene.add(cylinderBetween(new THREE.Vector3(side * 3.65, sailHeight(side === 1 ? 1 : 0, 1), -3.1), new THREE.Vector3(side * 3.97, 3.48, -3.45), 0.013, hemMat));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.027, 0.006, 6, 16), brass); ring.position.set(side * 3.65, sailHeight(side === 1 ? 1 : 0, 1), -3.1); ring.rotation.x = Math.PI / 2; scene.add(ring);
  }

  // A terracotta rosemary pot fills the nearer side in portrait without obscuring
  // the depth of the garden. Its rounded body is lathed, with a rolled rim.
  const potMat = createGlazeMaterial('#a4704f', { key: 'nap-terracotta', pool: '#8a5a3c', speckle: 0.3, scale: 3 }, { clearcoat: 0, roughness: 0.85 });
  const pot = addMesh(new THREE.LatheGeometry([new THREE.Vector2(0.23, 0), new THREE.Vector2(0.24, 0.06), new THREE.Vector2(0.33, 0.47), new THREE.Vector2(0.35, 0.50), new THREE.Vector2(0.35, 0.55), new THREE.Vector2(0.31, 0.56), new THREE.Vector2(0.30, 0.51)], 40), potMat, 1.42, 0, -1.42);
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.305, 36), new THREE.MeshStandardMaterial({ color: '#3f3626', roughness: 1 })); soil.rotation.x = -Math.PI / 2; soil.position.set(1.42, 0.50, -1.42); scene.add(soil);
  const herbGroup = new THREE.Group(); herbGroup.position.set(1.42, 0, -1.42); scene.add(herbGroup);
  const herbMaterial = patchSurface(new THREE.MeshStandardMaterial({ color: '#68844f', roughness: 0.8, side: THREE.DoubleSide }), {
    key: 'nap-rosemary', color: 'diffuseColor.rgb = gl_FrontFacing ? diffuseColor.rgb : mix(diffuseColor.rgb, vec3(0.62, 0.66, 0.58), 0.55); diffuseColor.rgb *= 0.85 + 0.3 * bwNoise(vSurfaceWorld * 7.0);',
  });
  const herb = new THREE.InstancedMesh(leafGeometry(), herbMaterial, 1120);
  const dummy = new THREE.Object3D();
  const herbStems: THREE.BufferGeometry[] = [];
  for (let stem = 0; stem < 28; stem++) {
    const a = rng() * Math.PI * 2, radius = 0.12 + rng() * 0.24, h = 0.28 + rng() * 0.30;
    const start = new THREE.Vector3(Math.cos(a) * 0.08, 0.51, Math.sin(a) * 0.08);
    const end = new THREE.Vector3(Math.cos(a) * radius, 0.52 + h, Math.sin(a) * radius);
    const d = end.clone().sub(start);
    const g = new THREE.CylinderGeometry(0.002, 0.007, d.length(), 5);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()));
    g.translate((start.x + end.x) / 2, (start.y + end.y) / 2, (start.z + end.z) / 2); g.deleteAttribute('uv');
    herbStems.push(g);
    for (let leaf = 0; leaf < 40; leaf++) {
      const t = 0.16 + rng() * 0.84;
      dummy.position.copy(start).lerp(end, t).add(new THREE.Vector3((rng() - 0.5) * 0.12, (rng() - 0.5) * 0.08, (rng() - 0.5) * 0.12)); dummy.rotation.set(rng() * 1.5, a + leaf * 2.4, (rng() - 0.5) * 1.6); dummy.scale.set(0.33, 0.40, 0.33); dummy.updateMatrix(); herb.setMatrixAt(stem * 40 + leaf, dummy.matrix);
    }
  }
  const herbStemMesh = new THREE.Mesh(concatGeometries(herbStems), stemMaterial); herbStems.forEach(g => g.dispose());
  herbStemMesh.castShadow = true; herbGroup.add(herbStemMesh);
  herb.castShadow = true; herb.receiveShadow = true; herbGroup.add(herb);
  pot.name = 'hand-thrown-terracotta';

  // A barely visible length of pull cord is an alternate reachable touch target.
  const cord = cylinderBetween(new THREE.Vector3(1.46, 2.95, -1.4), new THREE.Vector3(1.46, 1.60, -1.4), 0.009, hemMat); cord.userData.cozyAction = 'canopy'; scene.add(cord);
  const cordGrip = addMesh(new THREE.CapsuleGeometry(0.028, 0.11, 4, 8), warmWood, 1.46, 1.57, -1.4); cordGrip.userData.cozyAction = 'canopy';
  let currentTime = 0, responseStarted = -20;

  const resize = (aspect: number) => {
    camera.aspect = aspect;
    // Portrait is composed from the recliner itself: close cloth and armrests at
    // the bottom, canopy at top, full-height living garden in the middle.
    const portrait = aspect < 0.85;
    camera.fov = portrait ? 62 : aspect > 1.9 ? 53 : 56;
    chair.scale.x = portrait ? 0.79 : 1;
    table.position.set(portrait ? -0.75 : -1.35, 0, portrait ? -0.18 : 0.56);
    cup.position.x = tea.position.x = portrait ? 0.13 : -0.19;
    handle.position.x = portrait ? 0.045 : -0.275;
    pot.position.x = soil.position.x = portrait ? 0.86 : 1.42;
    herbGroup.position.x = portrait ? 0.86 : 1.42;
    cord.position.x = cordGrip.position.x = portrait ? 0.69 : 1.46;
    camera.position.set(portrait ? 0.05 : 0.12, portrait ? 1.16 : 1.19, portrait ? 2.50 : 2.72);
    target.set(portrait ? 0.02 : -0.18, portrait ? 1.30 : 1.23, -5.2);
    camera.lookAt(target); camera.updateProjectionMatrix();
    sun.shadow.needsUpdate = true;
  };
  resize(1.6);
  let probe: THREE.WebGLRenderTarget | null = null;
  return {
    scene, camera, resize,
    post: {
      // Thresholded bloom: only the glowing sail, the aureole and glints spill light,
      // instead of a veil lifting every shadow. Warm highlights, cool shade.
      exposure: 0.94, bloomStrength: 0.18, bloomThreshold: 0.95, aoStrength: 0.75, aoRadius: 0.5,
      saturation: 1.14, contrast: 1.09, shadowTint: [0.94, 0.98, 1.05], highlightTint: [1.05, 1.0, 0.92], vignette: 0.28, grain: 0.018,
    },
    createVolume() {
      // Clear air near the terrace; blue aerial perspective only out at the far ridges,
      // converging on the horizon sky, warmer and brighter toward the sun. The sky gets a
      // short path so the haze does not grey it.
      return createGardenVolume({
        canopy, sun: new THREE.Color(1.0, 0.88, 0.7).multiplyScalar(0.22), ambient: new THREE.Color(0.3, 0.6, 1.55),
        haze: [0.0034, 0.012, -0.4, 480], clear: { start: 30, end: 150, near: 0.04 }, skyDistance: 190,
        sail: [2.95, -3.65, 3.65, -3.15, 2.05], anisotropy: 0.6, steps: 22,
      });
    },
    prepare(renderer) {
      // Sky, sail and sunlit garden as seen from the chaise light the shade.
      sailGain.value = 0.3;
      try { probe = captureRoomProbe(renderer, scene, new THREE.Vector3(0.1, 1.2, 1.4), 0.66, { far: 500 }); }
      finally { sailGain.value = 1; }
    },
    dispose() { probe?.dispose(); probe = null; },
    update(time: number, _dt: number) {
      if (Math.floor(time / 2.5) !== Math.floor(currentTime / 2.5)) sun.shadow.needsUpdate = true;
      currentTime = time;
      timeUniform.value = time;
      const response = Math.max(0, 1 - (time - responseStarted) / 5);
      for (let i = 0; i < sailPosition.count; i++) {
        const x = sailBase[i * 3], z = sailBase[i * 3 + 2];
        const edge = Math.sin((x / 7.3 + 0.5) * Math.PI) * Math.sin(Math.max(0, Math.min(1, (1.9 - z) / 5)) * Math.PI);
        sailPosition.setY(i, sailBase[i * 3 + 1] + Math.sin(time * 0.60 + x * 0.85 + z * 0.6) * (0.014 + response * 0.043) * edge);
      }
      sailPosition.needsUpdate = true;
      // Position changes remain under six centimetres; normals update only with
      // active animation, never requiring another renderer or animation loop.
      sailGeo.computeVertexNormals();
      herb.rotation.z = Math.sin(time * 0.45) * 0.004;
    },
    interact(action: string) {
      if (action !== 'canopy') return null;
      responseStarted = currentTime;
      return { type: 'canopy', intensity: 0.22 };
    },
  };
}
