import * as THREE from 'three';
import { seeded } from '../shared/render/noise';
import { patchSurface } from '../shared/render/interiorSurface';
import { applyForestSurface, fbm2, valueNoise2, WATER_LEVEL, type ForestLightUniforms } from './forestLight';
import { frondGeometry, grassClumpGeometry, litterLeafGeometry } from './forestFoliage';
import { GLSL_GROUND, groundHeight, pondRadius } from './forestMath';

/*
 * The forest floor in layers: a world-space litter/moss/soil ground shader,
 * thousands of instanced fern fronds, grass and sedge tufts, fallen leaves and
 * twigs, plus leaves floating on the pool. Every repeated element is one
 * instanced draw; nothing uses line primitives.
 */

const TAU = Math.PI * 2;

/** Ground under the seat and out to the far trees: denser near the camera. */
export function createGroundGeometry() {
  const columns = 220, rows = 210;
  const positions: number[] = [], indices: number[] = [];
  for (let r = 0; r <= rows; r++) {
    const v = r / rows;
    const z = 9 - 100 * Math.pow(v, 1.55);
    const halfWidth = 14 + 46 * Math.pow(v, 0.9);
    for (let c = 0; c <= columns; c++) {
      const u = c / columns * 2 - 1;
      const x = Math.sign(u) * Math.pow(Math.abs(u), 1.25) * halfWidth;
      positions.push(x, groundHeight(x, z), z);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    const a = r * (columns + 1) + c, b = a + columns + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/**
 * World-space forest floor: leaf litter in several browns, cushion moss in
 * damp hollows, dark humus, a wet muddy margin and a silty pool bed. Relief
 * is a height field turned into a surface-gradient bump.
 */
export function createGroundMaterial(uniforms: ForestLightUniforms) {
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.95, metalness: 0 });
  patchSurface(material, {
    key: 'forest-floor',
    fragmentHeader: GLSL_GROUND,
    color: `
vec3 gP = vSurface;
float gPix = length(fwidth(gP));
float gMacro = bwNoise(vec3(gP.xz * 0.11, 2.0));
float gMid = bwNoise(vec3(gP.xz * 0.7, 5.0));
float gLeafCells = bwNoise(vec3(gP.xz * 7.5, 1.0));
float gLeafTone = bwNoise(vec3(gP.xz * 3.1, 9.0));
float gFine = bwNoise(vec3(gP.xz * 24.0, 3.0)) * bwResolve(gPix * 24.0);
float gAbove = gP.y - ${WATER_LEVEL.toFixed(3)};
float gPond = forestPondRadius(gP.xz);
// Leaf litter: overlapping leaves of last autumn, from ochre to dark umber.
vec3 litterA = vec3(0.2, 0.12, 0.05), litterB = vec3(0.1, 0.065, 0.03), litterC = vec3(0.26, 0.17, 0.07);
vec3 litter = mix(litterB, litterA, smoothstep(-0.5, 0.5, gLeafTone));
litter = mix(litter, litterC, smoothstep(0.35, 0.7, gLeafCells) * 0.6);
litter *= 0.72 + 0.45 * smoothstep(-0.6, 0.6, gLeafCells) * bwResolve(gPix * 7.5) + 0.12 * gFine;
// Moss cushions, greener in hollows and near the water.
float mossMask = smoothstep(0.05, 0.4, gMacro * 0.7 + gMid * 0.5 + 0.25 * smoothstep(1.9, 1.05, gPond));
vec3 moss = mix(vec3(0.04, 0.07, 0.015), vec3(0.11, 0.16, 0.03), smoothstep(-0.4, 0.6, gMid + gFine * 0.4));
vec3 humus = vec3(0.055, 0.042, 0.03) * (0.8 + 0.4 * gMid);
vec3 gColor = mix(humus, litter, smoothstep(-0.55, -0.15, gMacro + 0.3 * gLeafTone));
gColor = mix(gColor, moss, mossMask * 0.85);
// Muddy margin and silty bed under the water.
float gShore = smoothstep(-0.03, 0.22, gAbove + 0.05 * gMid);
vec3 silt = mix(vec3(0.075, 0.062, 0.042), vec3(0.13, 0.11, 0.07), smoothstep(-0.4, 0.6, gMid + 0.3 * gFine));
gColor = mix(silt, gColor, gShore);
float gWet = (1.0 - smoothstep(0.0, 0.32, gAbove + 0.06 * gMid)) * gShore;
gColor *= mix(1.0, 0.55, gWet);
diffuseColor.rgb = gColor;`,
    height: '(smoothstep(-0.6, 0.6, gLeafCells) * 0.006 * bwResolve(gPix * 7.5) + gMid * 0.02 + mossMask * bwNoise(vec3(gP.xz * 13.0, 7.0)) * 0.004 * bwResolve(gPix * 13.0) + gFine * 0.0015) * gShore',
    roughness: 'roughnessFactor = clamp(mix(mix(0.92, 0.98, mossMask), 0.32, gWet), 0.04, 1.0) * mix(0.9, 1.0, gShore);',
  });
  return applyForestSurface(material, uniforms, { key: 'forest-floor', underwater: true });
}

function scatter(count: number, random: () => number, place: () => [number, number] | null) {
  const result: Array<[number, number]> = [];
  for (let i = 0; i < count * 6 && result.length < count; i++) { const p = place(); if (p) result.push(p); }
  return result;
}

export interface Undergrowth { group: THREE.Group; dispose(): void }

export function createUndergrowth(uniforms: ForestLightUniforms, seed: number): Undergrowth {
  const random = seeded(seed);
  const group = new THREE.Group(); group.name = 'forest-undergrowth';
  const dummy = new THREE.Object3D();
  const plantMaterial = (key: string, translucency: number, sway: number, roughness = 0.72) => applyForestSurface(
    new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness, side: THREE.DoubleSide }),
    uniforms, { key, translucency, sway, rooted: true, flutter: sway * 0.25 });

  // --- Ferns: rosettes of arched fronds, densest along the banks and in damp shade.
  const fernSpots = scatter(170, random, () => {
    const angle = random() * TAU, distance = 2.9 + Math.pow(random(), 0.8) * 22;
    const x = Math.cos(angle) * distance * 1.1 - 0.2, z = Math.sin(angle) * distance - 6;
    if (z > 4.2 || pondRadius(x, z) < 1.12) return null;
    // Avoid the seat and the line of sight to the pool.
    if (z > 1.5 && Math.abs(x) < 1.6) return null;
    if (fbm2(x * 0.18 + 4.1, z * 0.18 + 2.2, 2) < -0.12 && pondRadius(x, z) > 1.8) return null;
    return [x, z];
  });
  const near: THREE.Matrix4[] = [], far: THREE.Matrix4[] = [], nearColor: THREE.Color[] = [], farColor: THREE.Color[] = [];
  for (const [x, z] of fernSpots) {
    const size = (0.55 + random() * 0.65) * (pondRadius(x, z) < 1.8 ? 1.15 : 1);
    const fronds = 7 + Math.floor(random() * 5);
    const tint = new THREE.Color().setHSL(0.2 + random() * 0.06, 0.6 + random() * 0.2, 0.82 + random() * 0.2);
    const isNear = Math.hypot(x, z - 5) < 9;
    for (let f = 0; f < fronds; f++) {
      const yaw = f / fronds * TAU + random() * 0.5;
      dummy.position.set(x, groundHeight(x, z) - 0.01, z);
      dummy.rotation.set(0, yaw, 0.15 + random() * 0.45, 'YXZ');
      const length = size * (0.75 + random() * 0.45);
      dummy.scale.set(length, length * (0.85 + random() * 0.3), length);
      dummy.updateMatrix();
      (isNear ? near : far).push(dummy.matrix.clone());
      (isNear ? nearColor : farColor).push(tint.clone().offsetHSL((random() - 0.5) * 0.02, 0, (random() - 0.5) * 0.08));
    }
  }
  const fernMaterial = plantMaterial('forest-fern', 0.9, 0.05);
  for (const [matrices, colors, pinnae, name] of [[near, nearColor, 22, 'forest-ferns-near'], [far, farColor, 11, 'forest-ferns-far']] as const) {
    const mesh = new THREE.InstancedMesh(frondGeometry(pinnae), fernMaterial, Math.max(1, matrices.length));
    mesh.count = matrices.length; mesh.name = name;
    matrices.forEach((m, i) => { mesh.setMatrixAt(i, m); mesh.setColorAt(i, colors[i]); });
    mesh.castShadow = name === 'forest-ferns-near'; mesh.receiveShadow = true; mesh.computeBoundingSphere();
    group.add(mesh);
  }

  // --- Grass and sedge tufts: in the open, sunnier ground and at the water's edge.
  const grassSpots = scatter(1500, random, () => {
    const x = (random() - 0.5) * 44, z = 5 - Math.pow(random(), 0.85) * 46;
    const pond = pondRadius(x, z);
    if (pond < 1.06 || (z > 2.2 && Math.abs(x) < 1.3)) return null;
    const open = valueNoise2(x * 0.3 + 7, z * 0.3 + 1) * 0.5 + 0.5;
    if (random() > open * 0.9 + (pond < 1.5 ? 0.5 : 0)) return null;
    return [x, z];
  });
  const grass = new THREE.InstancedMesh(grassClumpGeometry(7, 11), plantMaterial('forest-grass', 0.8, 0.04, 0.68), grassSpots.length);
  grass.name = 'forest-grass';
  grassSpots.forEach(([x, z], i) => {
    dummy.position.set(x, groundHeight(x, z) - 0.02, z); dummy.rotation.set(0, random() * TAU, 0);
    const h = (0.18 + random() * 0.4) * (pondRadius(x, z) < 1.4 ? 1.5 : 1);
    dummy.scale.set(h * (0.8 + random() * 0.6), h, h * (0.8 + random() * 0.6)); dummy.updateMatrix();
    grass.setMatrixAt(i, dummy.matrix);
    grass.setColorAt(i, new THREE.Color().setHSL(0.17 + random() * 0.08, 0.55, 0.75 + random() * 0.35));
  });
  grass.receiveShadow = true; grass.computeBoundingSphere(); group.add(grass);

  // --- Fallen leaves: curled, multi-coloured, densest near the viewer.
  const leafGeometry = litterLeafGeometry(0.1);
  const litterMaterial = applyForestSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.86, side: THREE.DoubleSide }), uniforms, { key: 'forest-litter', translucency: 0.25 });
  const litterSpots = scatter(3200, random, () => {
    const x = (random() - 0.5) * 26, z = 5.5 - Math.pow(random(), 1.4) * 30;
    if (pondRadius(x, z) < 1.04) return null;
    return [x, z];
  });
  const litter = new THREE.InstancedMesh(leafGeometry, litterMaterial, litterSpots.length); litter.name = 'forest-litter';
  const palette = ['#7a4a1e', '#94622a', '#5c3a1a', '#a67a34', '#6b5a2a', '#4e3618', '#8a3e1c', '#6f7a34'];
  litterSpots.forEach(([x, z], i) => {
    dummy.position.set(x, groundHeight(x, z) + 0.012, z);
    dummy.rotation.set((random() - 0.5) * 0.3, random() * TAU, (random() - 0.5) * 0.3);
    dummy.scale.setScalar(0.05 + random() * 0.07); dummy.updateMatrix();
    litter.setMatrixAt(i, dummy.matrix);
    litter.setColorAt(i, new THREE.Color(palette[Math.floor(random() * palette.length)]).multiplyScalar(0.75 + random() * 0.4));
  });
  litter.receiveShadow = true; litter.computeBoundingSphere(); group.add(litter);

  // --- Twigs: thin three-sided sticks lying in the litter.
  const twigGeometry = new THREE.CylinderGeometry(0.5, 0.7, 1, 4, 1, true); twigGeometry.rotateZ(Math.PI / 2);
  const twigMaterial = applyForestSurface(new THREE.MeshStandardMaterial({ color: '#3a2c1e', roughness: 0.9 }), uniforms, { key: 'forest-twig' });
  const twigSpots = scatter(320, random, () => {
    const x = (random() - 0.5) * 22, z = 5 - Math.pow(random(), 1.3) * 24;
    return pondRadius(x, z) < 1.05 ? null : [x, z];
  });
  const twigs = new THREE.InstancedMesh(twigGeometry, twigMaterial, twigSpots.length); twigs.name = 'forest-twigs';
  twigSpots.forEach(([x, z], i) => {
    const length = 0.15 + random() * 0.5, radius = 0.006 + random() * 0.012;
    dummy.position.set(x, groundHeight(x, z) + radius * 0.6, z); dummy.rotation.set(0, random() * TAU, (random() - 0.5) * 0.08);
    dummy.scale.set(length, radius * 2, radius * 2); dummy.updateMatrix(); twigs.setMatrixAt(i, dummy.matrix);
  });
  twigs.receiveShadow = true; twigs.computeBoundingSphere(); group.add(twigs);

  return { group, dispose() { /* All geometry and materials are owned by the scene graph. */ } };
}

/**
 * A handful of leaves floating on the pool, drifting very slowly in small
 * loops on the shader clock. They never travel toward the viewer.
 */
export function createFloatingLeaves(uniforms: ForestLightUniforms, seed: number) {
  const random = seeded(seed);
  const geometry = litterLeafGeometry(0.06);
  const count = 22;
  const drift = new Float32Array(count * 4);
  const material = applyForestSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.45, side: THREE.DoubleSide }), uniforms, { key: 'forest-floating-leaf', translucency: 0.3 });
  const chained = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    chained.call(material, shader, renderer);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec4 aDrift;')
      .replace('#ifdef USE_INSTANCING\nmvPosition = instanceMatrix * mvPosition;\n#endif', `#ifdef USE_INSTANCING
mvPosition = instanceMatrix * mvPosition;
#endif
{
  // Slow loops (minutes per cycle) and a slight bob on the pool surface.
  float a = uForestTime * aDrift.z + aDrift.x;
  vec2 loopOffset = vec2(cos(a), sin(a) * 0.6) * aDrift.y;
  mvPosition.xz += loopOffset - vec2(cos(aDrift.x), sin(aDrift.x) * 0.6) * aDrift.y;
  mvPosition.y += sin(uForestTime * 0.7 + aDrift.w) * 0.0025;
}`);
  };
  const leaves = new THREE.InstancedMesh(geometry, material, count); leaves.name = 'forest-floating-leaves';
  const dummy = new THREE.Object3D();
  const palette = ['#9a6a2a', '#7c8a34', '#b07a2a', '#6b4a1e', '#5f7a2a'];
  for (let i = 0; i < count; i++) {
    const angle = random() * TAU, r = Math.sqrt(random()) * 0.72;
    const x = Math.cos(angle) * 2.55 * r - 0.18, z = Math.sin(angle) * 3.45 * r - 0.55;
    dummy.position.set(x, WATER_LEVEL + 0.004, z); dummy.rotation.set(0, random() * TAU, 0);
    dummy.scale.setScalar(0.08 + random() * 0.06); dummy.updateMatrix();
    leaves.setMatrixAt(i, dummy.matrix);
    leaves.setColorAt(i, new THREE.Color(palette[i % palette.length]).multiplyScalar(0.8 + random() * 0.3));
    drift.set([random() * TAU, 0.08 + random() * 0.12, (random() > 0.5 ? 1 : -1) * (0.012 + random() * 0.01), random() * TAU], i * 4);
  }
  geometry.setAttribute('aDrift', new THREE.InstancedBufferAttribute(drift, 4));
  leaves.receiveShadow = true; leaves.renderOrder = 2; leaves.computeBoundingSphere();
  return leaves;
}
