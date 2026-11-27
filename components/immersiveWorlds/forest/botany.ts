import * as THREE from 'three';
import { patchSurface } from '../shared/render/interiorSurface';

/** All surfaces are generated locally. No photographs, downloaded assets or shaders from examples. */
export interface ForestMaterials {
  leaf: THREE.MeshPhysicalMaterial;
  twig: THREE.MeshStandardMaterial;
  dew: THREE.MeshPhysicalMaterial;
  /** Trees, ground and stones now use world-space shaders (forestTrees, forestUndergrowth, forestStones). */
  bark?: THREE.MeshStandardMaterial;
  ground?: THREE.MeshStandardMaterial;
  rock?: THREE.MeshStandardMaterial;
  moss?: THREE.MeshStandardMaterial;
}

type Random = () => number;
const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;

/**
 * A broadleaf blade shaded in uv space (u across, v base to tip): midrib,
 * curving lateral veins, a faint areole net, yellowing margins and small
 * blemishes. Resolution independent, so veins stay crisp within arm's reach.
 */
const LEAF_BLADE = /* glsl */ `
vec2 lfUv = vSurfaceUv;
float lfS = lfUv.x * 2.0 - 1.0, lfA = abs(lfS), lfT = lfUv.y;
float lfPix = max(fwidth(lfS), 1e-4);
float lfMid = (1.0 - smoothstep(0.022, 0.022 + lfPix * 1.5, lfA)) * (1.0 - 0.6 * smoothstep(0.85, 1.0, lfT));
float lfPhase = (lfT - lfA * 0.38 - lfA * lfA * 0.2) * 9.0;
float lfPhasePix = max(fwidth(lfPhase), 1e-4);
float lfLat = 1.0 - smoothstep(0.035, 0.035 + lfPhasePix * 1.2, abs(fract(lfPhase) - 0.5));
lfLat *= smoothstep(0.03, 0.08, lfA) * (1.0 - smoothstep(0.8, 0.97, lfA)) * smoothstep(0.04, 0.12, lfT) * bwResolve(lfPhasePix);
float lfNet = bwNoise(vec3(lfUv * vec2(24.0, 48.0), 3.0));
float lfNetLine = (1.0 - smoothstep(0.05, 0.05 + fwidth(lfNet) * 1.5, abs(lfNet))) * bwResolve(fwidth(lfUv.y) * 48.0) * 0.5;
vec3 lfBase = mix(vec3(0.022, 0.07, 0.01), vec3(0.075, 0.14, 0.016), smoothstep(0.0, 1.0, lfA * 0.6 + lfT * 0.3));
lfBase *= 0.85 + 0.25 * bwNoise(vec3(lfUv * vec2(3.0, 6.0), 9.0));
float lfSpot = smoothstep(0.58, 0.78, bwNoise(vec3(lfUv * vec2(9.0, 18.0), 21.0)));
lfBase = mix(lfBase, vec3(0.11, 0.09, 0.03), lfSpot * 0.35);
lfBase = mix(lfBase, vec3(0.09, 0.1, 0.028), smoothstep(0.86, 1.0, lfA) * 0.45);
float lfVeins = max(lfMid, lfLat * 0.8);
diffuseColor.rgb *= mix(lfBase, vec3(0.15, 0.21, 0.055), lfVeins * 0.7) * (1.0 - lfNetLine * 0.2);`;

export function createForestMaterials(): ForestMaterials {
  // Wet near leaves: a waxy cuticle under a thin film of water (clearcoat).
  const leaf = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.55, metalness: 0, specularIntensity: 0.5, clearcoat: 0.2, clearcoatRoughness: 0.22, side: THREE.DoubleSide });
  patchSurface(leaf, {
    key: 'forest-near-leaf-blade',
    color: LEAF_BLADE,
    height: '-(lfMid * 0.0016 + lfLat * 0.0009 + lfNetLine * 0.00015)',
    roughness: 'roughnessFactor = clamp(roughnessFactor * (0.85 + 0.35 * lfVeins + 0.3 * lfSpot), 0.04, 1.0);',
  });
  return {
    leaf,
    twig: new THREE.MeshStandardMaterial({ color: '#58602f', roughness: 0.8 }),
    dew: new THREE.MeshPhysicalMaterial({ color: '#bed7c9', roughness: 0.075, metalness: 0.35, transmission: 0, transparent: true, opacity: 0.55, clearcoat: 1, clearcoatRoughness: 0, ior: 1.33 }),
  };
}

/** Near-only material detail: the same procedural blade, a little wetter, and analytic dew. */
export function createForegroundMaterials<T extends ForestMaterials>(materials: T): T {
  const leaf = materials.leaf.clone();
  leaf.clearcoat = .26; leaf.clearcoatRoughness = .18;
  // clone() does not preserve shader callbacks. Retain the engine's thin-leaf
  // lighting and group motion; dew must never gain a separate vertex wind.
  leaf.onBeforeCompile = materials.leaf.onBeforeCompile;
  leaf.customProgramCacheKey = () => `${materials.leaf.customProgramCacheKey()}-foreground-v2`;

  const dew = materials.dew.clone();
  dew.color.set('#e3ecd9'); dew.metalness = 0; dew.roughness = .075;
  dew.ior = 1.333; dew.clearcoat = 0; dew.opacity = 1;
  dew.transmission = 0; dew.transparent = true; dew.depthWrite = false;
  dew.onBeforeCompile = (shader) => {
    // Analytic water-surface transparency: retain a clear centre, a small
    // Fresnel rim and the real lights/environment's specular reflections.
    // No transmission pass, screen texture, extra light, bloom or glint sprite.
    shader.fragmentShader = shader.fragmentShader.replace('#include <opaque_fragment>', `
      float dewFacing = clamp(dot(normal, normalize(vViewPosition)), 0., 1.);
      float dewFresnel = .0204 + .9796 * pow(1. - dewFacing, 5.);
      float dewSpecular = max(max(totalSpecular.r, totalSpecular.g), totalSpecular.b);
      diffuseColor.a = .075 + .38 * dewFresnel + clamp(dewSpecular * .65, 0., .48);
      outgoingLight = diffuseColor.rgb * .055 + totalSpecular / max(diffuseColor.a, .075);
      #include <opaque_fragment>`);
  };
  dew.customProgramCacheKey = () => 'forest-foreground-dew-fresnel-v1';
  return { ...materials, leaf, dew } as T;
}

// A smooth surface only for the four plants within arm's reach. Preserve the
// original outline/length while rounding the fold and giving the tip a little weight.
function foregroundLeafPoint(t: number, side: number): THREE.Vector3 {
  const wave = Math.sin(Math.PI * t);
  // Ovate, widest below the middle and drawn out to a point; the margin undulates.
  const halfWidth = Math.pow(Math.sin(Math.PI * Math.pow(t, .82)), .8) * .3 * (1 - .16 * t * t) + .001;
  const margin = .011 * Math.pow(Math.abs(side), 3) * Math.sin(t * Math.PI * 7 + .6) * wave;
  const tipCurl = THREE.MathUtils.smoothstep(t, .72, 1) * .032;
  const midrib = .004 * Math.exp(-side * side * 48) * wave;
  const crossCurve = -.057 * side * side * wave;
  const fineFold = .0035 * Math.sin(t * Math.PI * 16 + Math.abs(side) * 1.6) * Math.abs(side) * wave;
  const twist = .014 * side * wave * Math.sin(t * Math.PI * .8);
  return new THREE.Vector3(side * halfWidth, t, wave * .085 + t * t * .07 - tipCurl + crossCurve + fineFold + twist + midrib + margin);
}

function foregroundLeafGeometry(): THREE.BufferGeometry {
  const rows = 24, columns = 12;
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let row = 0; row <= rows; row++) for (let col = 0; col <= columns; col++) {
    const t = row / rows, side = col / columns * 2 - 1;
    positions.push(...foregroundLeafPoint(t, side).toArray()); uvs.push(col / columns, t);
  }
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const a = row * (columns + 1) + col, b = a + columns + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

/** A solid curved blade. Geometry, rather than a rectangular transparent card, defines the outline. */
function leafGeometry(sections = 9, narrow = 1): THREE.BufferGeometry {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let row = 0; row <= sections; row++) {
    const t = row / sections;
    const halfWidth = Math.pow(Math.sin(Math.PI * t), 0.78) * 0.3 * narrow + 0.001;
    for (let col = 0; col <= 2; col++) {
      const side = col - 1;
      positions.push(side * halfWidth, t, Math.sin(t * Math.PI) * 0.085 - Math.abs(side) * halfWidth * 0.19 + t * t * 0.07);
      uvs.push(col / 2, t);
    }
  }
  for (let row = 0; row < sections; row++) for (let col = 0; col < 2; col++) {
    const a = row * 3 + col, b = a + 3;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

function tube(points: THREE.Vector3[], radii: number[], segments: number, rng: Random): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points);
  const rings = Math.max(points.length * 3, 9);
  const frames = curve.computeFrenetFrames(rings, false);
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const uneven = Array.from({ length: segments }, () => 0.92 + rng() * 0.16);
  for (let ring = 0; ring <= rings; ring++) {
    const t = ring / rings, point = curve.getPointAt(t);
    const radiusPosition = t * (radii.length - 1), lo = Math.floor(radiusPosition), hi = Math.min(lo + 1, radii.length - 1);
    const radius = THREE.MathUtils.lerp(radii[lo], radii[hi], radiusPosition - lo);
    for (let side = 0; side <= segments; side++) {
      const angle = side / segments * TAU;
      const r = radius * uneven[side % segments] * (1 + Math.sin(ring * 1.3 + side * 3.7) * 0.025);
      const p = point.clone().addScaledVector(frames.normals[ring], Math.cos(angle) * r).addScaledVector(frames.binormals[ring], Math.sin(angle) * r);
      positions.push(p.x, p.y, p.z); uvs.push(side / segments, t);
    }
  }
  for (let ring = 0; ring < rings; ring++) for (let side = 0; side < segments; side++) {
    const a = ring * (segments + 1) + side, b = a + segments + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

function merge(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], indices: number[] = [];
  let offset = 0;
  for (const geometry of parts) {
    const p = geometry.getAttribute('position'), n = geometry.getAttribute('normal'), uv = geometry.getAttribute('uv');
    for (let i = 0; i < p.count; i++) {
      positions.push(p.getX(i), p.getY(i), p.getZ(i));
      normals.push(n.getX(i), n.getY(i), n.getZ(i)); uvs.push(uv.getX(i), uv.getY(i));
    }
    const index = geometry.getIndex();
    if (index) for (let i = 0; i < index.count; i++) indices.push(index.getX(i) + offset);
    offset += p.count; geometry.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  out.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); out.setIndex(indices);
  out.computeBoundingSphere(); return out;
}

function leafMatrix(position: THREE.Vector3, direction: THREE.Vector3, normal: THREE.Vector3, length: number, width = 1): THREE.Matrix4 {
  const y = direction.clone().normalize();
  const x = y.clone().cross(normal).normalize();
  if (x.lengthSq() < 0.1) x.set(1, 0, 0);
  const z = x.clone().cross(y).normalize();
  const matrix = new THREE.Matrix4().makeBasis(x, y, z);
  matrix.scale(new THREE.Vector3(length * width, length, length)); matrix.setPosition(position);
  return matrix;
}

function colorLeaf(rng: Random, brighter = false) {
  return new THREE.Color().setHSL(0.19 + rng() * 0.075, 0.28 + rng() * 0.23, (brighter ? 0.6 : 0.49) + rng() * 0.2);
}

export function createBroadleafPlant(materials: Pick<ForestMaterials, 'leaf' | 'twig' | 'dew'>, rng: Random, scale = 1, foreground = false): THREE.Group {
  const group = new THREE.Group(); group.name = 'forest-broadleaf';
  const count = 5 + Math.floor(rng() * 3), stems: THREE.BufferGeometry[] = [], transforms: THREE.Matrix4[] = [], dewTransforms: THREE.Matrix4[] = [];
  for (let leaf = 0; leaf < count; leaf++) {
    const angle = leaf / count * TAU + rng() * 0.4;
    const rise = scale * (0.16 + rng() * 0.30), reach = scale * (0.12 + rng() * 0.18);
    const tip = new THREE.Vector3(Math.cos(angle) * reach, rise, Math.sin(angle) * reach);
    stems.push(tube([new THREE.Vector3(0, 0, 0), tip.clone().multiplyScalar(0.54).add(new THREE.Vector3(0, 0.055 * scale, 0)), tip], [0.012 * scale, 0.008 * scale, 0.004 * scale], 5, rng));
    const direction = new THREE.Vector3(Math.cos(angle), -0.1 - rng() * 0.2, Math.sin(angle));
    const bladeLength = (0.34 + rng() * 0.30) * scale;
    const matrix = leafMatrix(tip, direction, UP, bladeLength, 1.2 + rng() * 0.2); transforms.push(matrix);
    // A few discrete droplets; never a screen-wide sparkle/particle layer.
    for (let d = 0; d < 2; d++) {
      const t = 0.28 + rng() * 0.47, side = (rng() - 0.5) * 0.26;
      const size = scale * (0.009 + rng() * 0.007);
      if (foreground) {
        const halfWidth = Math.pow(Math.sin(Math.PI * t), .78) * .3 + .001;
        const bladeSide = side / halfWidth;
        const p = foregroundLeafPoint(t, bladeSide).applyMatrix4(matrix);
        const across = foregroundLeafPoint(t, bladeSide + .001).sub(foregroundLeafPoint(t, bladeSide - .001));
        const along = foregroundLeafPoint(t + .001, bladeSide).sub(foregroundLeafPoint(t - .001, bladeSide));
        const normal = across.cross(along).normalize().applyMatrix3(new THREE.Matrix3().getNormalMatrix(matrix)).normalize();
        const radius = size * .66;
        p.addScaledVector(normal, radius * .49);
        const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        // Slightly flattened spherical caps seat into the blade and follow its
        // local normal, rather than floating as uniformly upright white balls.
        dewTransforms.push(new THREE.Matrix4().compose(p, rotation, new THREE.Vector3(radius, radius, radius * .66)));
      } else {
        const p = new THREE.Vector3(side, t, Math.sin(t * Math.PI) * .085 - Math.abs(side) * .19 + t * t * .07 + .011).applyMatrix4(matrix);
        dewTransforms.push(new THREE.Matrix4().compose(p, new THREE.Quaternion(), new THREE.Vector3(size, size * .72, size)));
      }
    }
  }
  const stemMesh = new THREE.Mesh(merge(stems), materials.twig); stemMesh.castShadow = true; group.add(stemMesh);
  const leaves = new THREE.InstancedMesh(foreground ? foregroundLeafGeometry() : leafGeometry(12), materials.leaf, count); leaves.name = 'forest-broadleaf-leaves';
  transforms.forEach((matrix, i) => { leaves.setMatrixAt(i, matrix); leaves.setColorAt(i, colorLeaf(rng, true)); });
  leaves.instanceMatrix.needsUpdate = true; leaves.castShadow = true; leaves.receiveShadow = true; leaves.computeBoundingSphere(); group.add(leaves);
  const dew = new THREE.InstancedMesh(new THREE.SphereGeometry(1, foreground ? 16 : 8, foreground ? 10 : 5), materials.dew, dewTransforms.length); dew.name = 'forest-leaf-dew';
  dewTransforms.forEach((matrix, i) => dew.setMatrixAt(i, matrix)); dew.instanceMatrix.needsUpdate = true; dew.computeBoundingSphere(); group.add(dew);
  group.userData.foliage = leaves; group.userData.swaySeed = rng() * TAU;
  return group;
}
