import * as THREE from 'three';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { createFabricMaterial } from '../shared/render/fabricSurface';
import { createGlazeMaterial, createPlasterMaterial, glslFloat, glslVec3, patchSurface } from '../shared/render/interiorSurface';

/*
 * Café surfaces. Every material is evaluated procedurally in the fragment
 * shader (world or object space), so nothing tiles, blurs up close or needs an
 * image file: varnished and stained timber, lime plaster, running-bond brick,
 * linen, velvet, glazed stoneware, brushed brass and rain-wet asphalt. The
 * shared wood, fabric and interior surfaces are reused; brick, brass, coffee
 * and the wet street are small café-owned patches on the same building blocks.
 */
export interface CafeMaterials {
  /** Varnished oak for the window table and counter tops (grain along x). */
  oak: THREE.MeshStandardMaterial;
  /** Dark stained timber, grain along x (rails, sills, shelves). */
  darkWood: THREE.MeshStandardMaterial;
  /** Dark stained timber, grain along y (posts, legs, mullions). */
  darkWoodV: THREE.MeshStandardMaterial;
  /** Wide varnished floor boards. */
  floor: THREE.MeshStandardMaterial;
  plaster: THREE.MeshStandardMaterial;
  brick: THREE.MeshStandardMaterial;
  /** Natural linen (napkin, curtains, shade cloth); uv in metres. */
  fabric: THREE.MeshStandardMaterial;
  /** Deep green cotton velvet for seats; uv in metres. */
  velvet: THREE.MeshStandardMaterial;
  /** Cream speckled stoneware (object space). */
  ceramic: THREE.MeshPhysicalMaterial;
  /** Unglazed foot ring clay. */
  clay: THREE.MeshStandardMaterial;
  brass: THREE.MeshPhysicalMaterial;
  chrome: THREE.MeshPhysicalMaterial;
  coffee: THREE.MeshPhysicalMaterial;
  leather: THREE.MeshStandardMaterial;
  pavement: THREE.MeshPhysicalMaterial;
  foliage: THREE.MeshStandardMaterial;
  soil: THREE.MeshStandardMaterial;
  textures: THREE.Texture[];
  dispose(): void;
}

/** Brushed brass: fine directional streaks and a soft tarnish in low-lying areas. */
function createBrass(color: THREE.ColorRepresentation, key: string, roughness = 0.3) {
  const material = new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness });
  return patchSurface(material, {
    key: `brass|${key}`,
    color: `
float brStreak = bwNoise(vec3(vSurface.xz * vec2(4.0, 4.0), vSurface.y * 380.0)) * bwResolve(length(fwidth(vSurface)) * 380.0);
float brTarnish = smoothstep(0.1, 0.8, bwFbm3(vSurface * 6.0 + 2.0));
diffuseColor.rgb *= (0.93 + 0.07 * brStreak) * mix(1.0, 0.72, brTarnish * 0.55);`,
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.08 * brStreak + 0.18 * brTarnish, 0.08, 1.0);',
  });
}

/** Running-bond brick with recessed lime mortar, per-brick tone and chipped arrises. */
function createBrick(color: THREE.ColorRepresentation, mortar: THREE.ColorRepresentation, key: string) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.88 });
  return patchSurface(material, {
    key: `brick|${key}`,
    color: `
// Course along y; the brick run follows whichever horizontal axis the wall faces.
vec3 bkN = abs(normalize(vSurfaceNormal));
vec2 bkP = vec2(bkN.x > bkN.z ? vSurface.z : vSurface.x, vSurface.y);
vec2 bkSize = vec2(0.215, 0.075);
float bkRow = floor(bkP.y / bkSize.y);
float bkX = bkP.x / bkSize.x + 0.5 * mod(bkRow, 2.0) + 0.13 * bwHash1(vec3(bkRow, 3.0, 1.0));
vec2 bkCell = vec2(floor(bkX), bkRow);
vec2 bkF = vec2(fract(bkX) * bkSize.x, fract(bkP.y / bkSize.y) * bkSize.y);
float bkJoint = 0.0095;
float bkEdge = min(min(bkF.x, bkSize.x - bkF.x), min(bkF.y, bkSize.y - bkF.y));
float bkChip = bwNoise(vec3(bkP * 60.0, 1.0)) * 0.004;
float bkPix = max(length(fwidth(bkP)), 1e-5);
float bkBody = smoothstep(bkJoint, bkJoint + max(0.004, bkPix * 1.5), bkEdge + bkChip);
float bkId = bwHash1(vec3(bkCell, 5.0));
float bkBurn = bwFbm3(vec3(bkP * 7.0, bkId * 10.0));
vec3 bkColor = diffuseColor.rgb * (0.72 + 0.5 * bkId) * (0.9 + 0.18 * bkBurn);
bkColor = mix(bkColor, bkColor * vec3(0.78, 0.7, 0.66), smoothstep(0.55, 0.95, bwHash1(vec3(bkCell, 9.0))) * 0.6);
float bkSoot = smoothstep(0.2, 0.9, bwFbm3(vec3(bkP * 0.6, 4.0)));
bkColor *= 1.0 - 0.25 * bkSoot;
vec3 bkMortar = ${glslVec3(mortar)} * (0.85 + 0.2 * bwNoise(vec3(bkP * 90.0, 2.0)));
diffuseColor.rgb = mix(bkMortar, bkColor, bkBody);`,
    height: '(bkBody * 0.006 + bkBurn * 0.0006 * bkBody) ',
    roughness: 'roughnessFactor = clamp(mix(0.97, roughnessFactor - 0.08 * bkBurn, bkBody), 0.4, 1.0);',
  });
}

/**
 * Rain-wet asphalt: world-space puddles become near-mirror patches, the
 * aggregate stays rough between them, and a slow ripple field (rain hitting
 * the water) roughens the puddles without ever looking like a grid.
 */
function createWetStreet(key: string) {
  const time = { value: 0 };
  const material = new THREE.MeshPhysicalMaterial({ color: '#2a2d30', roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.06 });
  patchSurface(material, {
    key: `wet-street|${key}`,
    uniforms: { uRainTime: time },
    fragmentHeader: 'uniform float uRainTime;',
    color: `
vec2 wsP = vSurfaceWorld.xz;
float wsPuddle = smoothstep(0.02, 0.32, bwFbm3(vec3(wsP * 0.32, 1.7)) + 0.12 * bwNoise(vec3(wsP * 2.1, 3.0)));
float wsAgg = bwValue(vec3(wsP * 140.0, 0.0)) * bwResolve(length(fwidth(wsP)) * 140.0);
float wsRipple = bwNoise(vec3(wsP * 9.0, uRainTime * 0.9));
vec3 wsColor = diffuseColor.rgb * (0.86 + 0.28 * wsAgg) * mix(1.0, 0.55, wsPuddle);
diffuseColor.rgb = wsColor;`,
    height: '(wsAgg * 0.0012 * (1.0 - wsPuddle) + wsRipple * 0.00025 * wsPuddle)',
    roughness: 'roughnessFactor = mix(clamp(roughnessFactor + 0.3 * wsAgg, 0.2, 1.0), 0.05 + 0.04 * abs(wsRipple), wsPuddle);',
    lights: `#ifdef USE_CLEARCOAT
material.clearcoat *= mix(0.35, 1.0, wsPuddle);
#endif`,
  });
  material.userData.rainTime = time;
  return material;
}

/** A flat white: tan crema, a darker rim and a soft microfoam heart poured into it. */
function createCoffee(key: string) {
  const material = new THREE.MeshPhysicalMaterial({ color: '#4a2812', roughness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.08 });
  return patchSurface(material, {
    key: `coffee|${key}`,
    objectSpace: true,
    color: `
vec2 cfP = vSurface.xz / ${glslFloat(0.0715)};
float cfR = length(cfP);
float cfSwirl = bwFbm3(vec3(cfP * 3.0, 2.0));
// Heart: two lobes and a point, drawn toward the handle side, with a pulled stem.
vec2 cfH = vec2(cfP.x * 1.15, cfP.y + 0.08);
float cfHeart = length(vec2(abs(cfH.x) - 0.2, cfH.y + 0.05 - 0.55 * abs(cfH.x))) - 0.32;
float cfStem = abs(cfP.x + 0.02 * sin(cfP.y * 9.0)) - 0.025 * (1.0 - smoothstep(-0.2, 0.7, cfP.y));
float cfFoam = 1.0 - smoothstep(-0.04, 0.07, min(cfHeart + 0.05 * cfSwirl, max(cfStem, cfP.y - 0.75)));
float cfRim = smoothstep(0.78, 1.0, cfR);
vec3 cfCrema = mix(vec3(0.34, 0.18, 0.075), vec3(0.2, 0.1, 0.04), cfRim) * (0.9 + 0.2 * cfSwirl);
vec3 cfColor = mix(cfCrema, vec3(0.6, 0.48, 0.34) * (0.92 + 0.1 * cfSwirl), cfFoam * (1.0 - cfRim) * 0.9);
cfColor *= 0.94 + 0.1 * bwNoise(vec3(cfP * 70.0, 1.0)) * bwResolve(length(fwidth(cfP)) * 70.0);
diffuseColor.rgb = cfColor;`,
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.4 * cfFoam, 0.05, 1.0);',
  });
}

/**
 * Varnished flat-sawn oak for horizontal tops (grain along world x). A glued
 * panel of wide boards: each has its own tone and an inclined pith just under
 * the surface, so growth rings open into cathedral arches that drift along the
 * length. Relief stays microscopic: the varnish coat is what you see.
 */
function createSlabOak(color: THREE.ColorRepresentation, key: string) {
  const material = new THREE.MeshPhysicalMaterial({ color, roughness: 0.5, clearcoat: 0.55, clearcoatRoughness: 0.16 });
  return patchSurface(material, {
    key: `slab-oak|${key}`,
    color: `
float soX = vSurfaceWorld.x, soZ = vSurfaceWorld.z;
float soBoard = floor((soZ + 7.0) / 0.31);
float soH = bwHash1(vec3(soBoard, 7.0, 3.0));
float soCentre = (soBoard + 0.5) * 0.31 - 7.0 + (soH - 0.5) * 0.14 + 0.025 * sin(soX * 1.3 + soH * 6.0);
float soDepth = 0.02 + 0.05 * fract(soH * 7.3) + 0.028 * sin(soX * (0.7 + 0.4 * soH) + soH * 4.0);
float soWarp = bwFbm3(vec3(soX * 0.8, soZ * 3.0, soH * 5.0)) * 0.01 + bwNoise(vec3(soX * 5.0, soZ * 26.0, 1.0)) * 0.0016;
float soR = sqrt((soZ - soCentre) * (soZ - soCentre) + soDepth * soDepth) + soWarp;
float soRings = soR * (95.0 + 45.0 * soH);
float soF = fract(soRings);
float soLate = smoothstep(0.5, 0.82, soF) * (1.0 - smoothstep(0.86, 1.0, soF));
soLate = mix(0.32, soLate, bwResolve(fwidth(soRings) * 1.5));
float soZf = fwidth(soZ);
float soFibre = bwNoise(vec3(soX * 7.0, soZ * 480.0, 2.0)) * bwResolve(soZf * 480.0);
float soPore = smoothstep(0.62, 0.95, bwValue(vec3(soX * 45.0, soZ * 820.0, 5.0))) * bwResolve(soZf * 820.0);
float soRay = smoothstep(0.8, 0.98, bwValue(vec3(soX * 14.0, soZ * 160.0, 9.0))) * bwResolve(soZf * 160.0);
float soTone = 0.9 + 0.18 * (soH - 0.5) + 0.1 * bwFbm3(vec3(soX * 0.6, soZ * 1.4, 3.0));
vec3 soColor = diffuseColor.rgb * soTone;
soColor = mix(soColor, soColor * vec3(0.6, 0.5, 0.42), soLate * 0.78);
soColor *= (0.96 + 0.07 * soFibre) * (1.0 - 0.22 * soPore) * (1.0 + 0.08 * soRay);
float soWear = smoothstep(0.35, 0.85, bwFbm3(vec3(soX * 1.6, soZ * 1.6, 8.0)));
diffuseColor.rgb = soColor;`,
    height: '(-soPore * 0.00006 + soFibre * 0.000015)',
    roughness: 'roughnessFactor = clamp(roughnessFactor + 0.12 * soPore + 0.06 * soLate + 0.12 * soWear, 0.05, 1.0);',
    lights: `#ifdef USE_CLEARCOAT
material.clearcoatRoughness = clamp(material.clearcoatRoughness + 0.14 * soWear, 0.0, 1.0);
#endif`,
  });
}

export function makeCafeMaterials(): CafeMaterials {
  const oak = createSlabOak('#8f6a44', 'cafe-oak');
  oak.name = 'Cafe varnished oak';
  const darkWood = createWoodMaterial('#4a3222', { key: 'cafe-dark-x', axis: 'x', rings: 130, figure: 0.5, pores: 0.35, wear: 0.12, varnish: 0.45, roughness: 0.5 }, { clearcoatRoughness: 0.22 });
  darkWood.name = 'Cafe stained walnut (horizontal grain)';
  const darkWoodV = createWoodMaterial('#4a3222', { key: 'cafe-dark-y', axis: 'y', rings: 130, figure: 0.5, pores: 0.35, wear: 0.12, varnish: 0.45, roughness: 0.5 }, { clearcoatRoughness: 0.22 });
  darkWoodV.name = 'Cafe stained walnut (vertical grain)';
  const floor = createWoodMaterial('#6a4a33', { key: 'cafe-floor', axis: 'z', rings: 110, figure: 0.55, pores: 0.4, wear: 0.35, varnish: 0.4, roughness: 0.48,
    planks: { width: 0.165, length: 1.9, bevel: 0.0035, tone: 0.34 } }, { clearcoatRoughness: 0.2 });
  floor.name = 'Cafe varnished floor boards';
  const plaster = createPlasterMaterial('#9c8468', { key: 'cafe-plaster', floorY: 0, stains: 0.45, bump: 1.1 });
  plaster.name = 'Cafe warm lime plaster';
  const brick = createBrick('#8a4f37', '#a59886', 'cafe-brick');
  brick.name = 'Cafe exposed brick';
  const fabric = createFabricMaterial('#b8ab92', { key: 'cafe-linen', weave: 'plain', threads: [420, 420], heather: 0.55, threadContrast: 0.5, fuzz: 0.45, depth: 0.0004, sheen: 0.4, roughness: 0.9 });
  fabric.name = 'Cafe woven linen';
  const velvet = createFabricMaterial('#2c473c', { key: 'cafe-velvet', weave: 'velvet', threads: [260, 260], heather: 0.7, fuzz: 0.55, depth: 0.0005, sheen: 1, sheenColor: '#9cc2ac', roughness: 0.85 });
  velvet.name = 'Cafe green cotton velvet';
  const ceramic = createGlazeMaterial('#e6ddcb', { key: 'cafe-cup', speckle: 0.45, pool: '#c4a983' }, { roughness: 0.28, clearcoat: 0.9, clearcoatRoughness: 0.07 });
  ceramic.name = 'Cafe speckled stoneware';
  const clay = new THREE.MeshStandardMaterial({ color: '#8d725a', roughness: 0.95 });
  clay.name = 'Cafe unglazed foot ring';
  const brass = createBrass('#c79b5c', 'cafe-brass', 0.3);
  brass.name = 'Cafe brushed brass';
  const chrome = new THREE.MeshPhysicalMaterial({ color: '#d6d8da', metalness: 1, roughness: 0.16 });
  chrome.name = 'Cafe espresso chrome';
  const coffee = createCoffee('cafe-coffee');
  coffee.name = 'Cafe fresh coffee';
  const leather = new THREE.MeshStandardMaterial({ color: '#5e3a24', roughness: 0.7 });
  leather.name = 'Cafe cognac leather';
  const pavement = createWetStreet('cafe-street');
  pavement.name = 'Cafe rain-wet street';
  const foliage = new THREE.MeshStandardMaterial({ color: '#33573a', roughness: 0.62, side: THREE.DoubleSide });
  foliage.name = 'Cafe deep green foliage';
  const soil = new THREE.MeshStandardMaterial({ color: '#2a1f17', roughness: 1 });
  soil.name = 'Cafe potting soil';

  const materials = new Set<THREE.Material>([oak, darkWood, darkWoodV, floor, plaster, brick, fabric, velvet, ceramic, clay, brass, chrome, coffee, leather, pavement, foliage, soil]);
  const textures: THREE.Texture[] = [];
  let disposed = false;
  return {
    oak, darkWood, darkWoodV, floor, plaster, brick, fabric, velvet, ceramic, clay, brass, chrome, coffee, leather, pavement, foliage, soil, textures,
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const material of materials) material.dispose();
      for (const texture of new Set(textures)) texture.dispose();
    },
  };
}

/**
 * Box and slab UVs in metres, chosen per face from the dominant normal axis,
 * so woven surfaces keep the same thread size on every face.
 */
export function metricUv(geometry: THREE.BufferGeometry) {
  const position = geometry.getAttribute('position');
  const normal = geometry.getAttribute('normal');
  const uv = geometry.getAttribute('uv');
  if (!position || !normal || !uv) return geometry;
  for (let i = 0; i < position.count; i++) {
    const nx = Math.abs(normal.getX(i)), ny = Math.abs(normal.getY(i)), nz = Math.abs(normal.getZ(i));
    const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
    if (nx >= ny && nx >= nz) uv.setXY(i, z, y);
    else if (ny >= nz) uv.setXY(i, x, z);
    else uv.setXY(i, x, y);
  }
  uv.needsUpdate = true;
  return geometry;
}
