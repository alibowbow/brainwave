import * as THREE from 'three';

/** All surfaces are generated locally. No photographs, downloaded assets or shaders from examples. */
export interface ForestMaterials {
  bark: THREE.MeshStandardMaterial;
  leaf: THREE.MeshPhysicalMaterial;
  ground: THREE.MeshStandardMaterial;
  rock: THREE.MeshStandardMaterial;
  moss: THREE.MeshStandardMaterial;
  twig: THREE.MeshStandardMaterial;
  dew: THREE.MeshPhysicalMaterial;
}

export interface TreeOptions {
  height: number;
  radius: number;
  detail?: 'near' | 'mid' | 'far' | boolean | number;
}

type Random = () => number;
const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;

function seeded(seed: number): Random {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function surface(size: number, paint: (ctx: CanvasRenderingContext2D, rng: Random) => void, seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  paint(ctx, seeded(seed));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function grain(ctx: CanvasRenderingContext2D, rng: Random, amount: number, radius: number, light: string, dark: string) {
  const size = ctx.canvas.width;
  for (let i = 0; i < amount; i++) {
    ctx.fillStyle = rng() > 0.52 ? light : dark;
    ctx.globalAlpha = 0.12 + rng() * 0.35;
    ctx.beginPath();
    ctx.ellipse(rng() * size, rng() * size, 0.3 + rng() * radius, 0.4 + rng() * radius, rng() * TAU, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function createForestMaterials(): ForestMaterials {
  const barkMap = surface(512, (ctx, rng) => {
    ctx.fillStyle = '#6c6856'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 170; i++) {
      const x = rng() * 512;
      const width = 1 + rng() * 12;
      ctx.strokeStyle = i % 3 === 0 ? '#373e32' : i % 3 === 1 ? '#93917b' : '#565a49';
      ctx.lineWidth = width;
      ctx.globalAlpha = 0.3 + rng() * 0.35;
      ctx.beginPath(); ctx.moveTo(x, -20);
      for (let y = 0; y < 550; y += 24) ctx.lineTo(x + Math.sin(y * 0.018 + i) * (3 + width), y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (let i = 0; i < 120; i++) {
      const x = rng() * 512, y = rng() * 512;
      ctx.strokeStyle = '#292f24'; ctx.lineWidth = 0.7 + rng();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 2, y + 6); ctx.lineTo(x + 2, y + 19 + rng() * 30); ctx.stroke();
    }
    grain(ctx, rng, 7000, 1.4, '#cbc4a1', '#252f26');
    // Pale lichen remains understated, so the bark reads as bark at close range.
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = '#b0b39b'; ctx.globalAlpha = 0.09 + rng() * 0.15;
      ctx.beginPath(); ctx.ellipse(rng() * 512, rng() * 512, 2 + rng() * 10, 3 + rng() * 7, rng(), 0, TAU); ctx.fill();
    }
  }, 7021);
  barkMap.repeat.set(2, 3);

  const leafMap = surface(256, (ctx, rng) => {
    const wash = ctx.createLinearGradient(0, 256, 180, 0);
    wash.addColorStop(0, '#4a713b'); wash.addColorStop(0.5, '#739d49'); wash.addColorStop(1, '#9fbf65');
    ctx.fillStyle = wash; ctx.fillRect(0, 0, 256, 256);
    grain(ctx, rng, 3600, 0.8, '#bfce83', '#365e38');
    ctx.lineWidth = 1.6; ctx.strokeStyle = 'rgba(202,216,142,.62)';
    ctx.beginPath(); ctx.moveTo(128, 260); ctx.quadraticCurveTo(123, 115, 128, -4); ctx.stroke();
    for (let row = 24; row < 245; row += 24) {
      for (const side of [-1, 1]) {
        const edge = 128 + side * Math.sin(Math.PI * row / 256) * 127;
        ctx.strokeStyle = 'rgba(183,202,119,.38)'; ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(128, row + 31); ctx.quadraticCurveTo(128 + side * 37, row + 15, edge, row - 13); ctx.stroke();
        for (let sub = 1; sub <= 3; sub++) {
          const sx = 128 + (edge - 128) * sub / 4;
          ctx.strokeStyle = 'rgba(166,186,107,.2)'; ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(sx, row + 31 - sub * 11); ctx.lineTo(sx + side * 14, row - sub * 10); ctx.stroke();
        }
      }
    }
  }, 8032);

  const leafBump = surface(256, (ctx) => {
    ctx.fillStyle = '#737373'; ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#c0c0c0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(128, 256); ctx.lineTo(128, 0); ctx.stroke();
    ctx.lineWidth = 1;
    for (let row = 24; row < 245; row += 24) for (const side of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(128, row + 31);
      ctx.quadraticCurveTo(128 + side * 37, row + 15, 128 + side * Math.sin(Math.PI * row / 256) * 127, row - 13); ctx.stroke();
    }
  }, 54);
  leafBump.colorSpace = THREE.NoColorSpace;

  const groundMap = surface(512, (ctx, rng) => {
    ctx.fillStyle = '#5c6040'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 240; i++) {
      const x = rng() * 512, y = rng() * 512, radius = 8 + rng() * 40;
      const spot = ctx.createRadialGradient(x, y, 0, x, y, radius);
      spot.addColorStop(0, i % 3 === 0 ? 'rgba(114,125,59,.55)' : 'rgba(49,55,37,.5)');
      spot.addColorStop(1, 'rgba(60,62,37,0)');
      ctx.fillStyle = spot; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    grain(ctx, rng, 18000, 1.6, '#a19465', '#2f392b');
    for (let i = 0; i < 650; i++) {
      ctx.strokeStyle = rng() > 0.5 ? '#90825c' : '#303d2b'; ctx.globalAlpha = 0.5; ctx.lineWidth = 0.4 + rng();
      const x = rng() * 512, y = rng() * 512;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rng() * 9 - 4, y + 2 + rng() * 13); ctx.stroke();
    }
  }, 1643);
  groundMap.repeat.set(10, 10);

  const rockMap = surface(512, (ctx, rng) => {
    ctx.fillStyle = '#939787'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 180; i++) {
      const x = rng() * 512, y = rng() * 512, radius = 8 + rng() * 65;
      const wash = ctx.createRadialGradient(x, y, 0, x, y, radius);
      wash.addColorStop(0, i % 2 ? 'rgba(63,72,64,.25)' : 'rgba(205,203,175,.36)');
      wash.addColorStop(1, 'rgba(100,110,91,0)');
      ctx.fillStyle = wash; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    grain(ctx, rng, 13000, 1.1, '#dad7bd', '#3c493e');
    ctx.strokeStyle = 'rgba(208,211,187,.2)'; ctx.lineWidth = 1.4;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath(); ctx.moveTo(rng() * 512, 0);
      for (let y = 0; y < 520; y += 40) ctx.lineTo((i * 77 + Math.sin(y / 90) * 39) % 512, y);
      ctx.stroke();
    }
  }, 9076);

  const mossMap = surface(256, (ctx, rng) => {
    ctx.fillStyle = '#506a32'; ctx.fillRect(0, 0, 256, 256);
    grain(ctx, rng, 12500, 1.2, '#a7ae5b', '#273f26');
    for (let i = 0; i < 900; i++) {
      const x = rng() * 256, y = rng() * 256;
      ctx.strokeStyle = rng() > 0.5 ? '#84944a' : '#3f572b'; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rng() * 3 - 1.5, y - 1 - rng() * 5); ctx.stroke();
    }
  }, 3363);
  mossMap.repeat.set(2, 2);

  return {
    bark: new THREE.MeshStandardMaterial({ color: '#c3baa3', map: barkMap, bumpMap: barkMap, bumpScale: 0.07, roughness: 0.93 }),
    leaf: new THREE.MeshPhysicalMaterial({ color: '#b9d593', map: leafMap, bumpMap: leafBump, bumpScale: 0.018, roughness: 0.48, metalness: 0, clearcoat: 0.26, clearcoatRoughness: 0.36, side: THREE.DoubleSide }),
    ground: new THREE.MeshStandardMaterial({ color: '#c0b79a', map: groundMap, bumpMap: groundMap, bumpScale: 0.08, roughness: 0.98 }),
    rock: new THREE.MeshStandardMaterial({ color: '#bdc1af', map: rockMap, bumpMap: rockMap, bumpScale: 0.035, roughness: 0.66 }),
    moss: new THREE.MeshStandardMaterial({ color: '#c0cd91', map: mossMap, bumpMap: mossMap, bumpScale: 0.035, roughness: 0.97 }),
    twig: new THREE.MeshStandardMaterial({ color: '#686b37', roughness: 0.89 }),
    dew: new THREE.MeshPhysicalMaterial({ color: '#bed7c9', roughness: 0.075, metalness: 0.35, transmission: 0, transparent: true, opacity: 0.55, clearcoat: 1, clearcoatRoughness: 0, ior: 1.33 }),
  };
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

export function createTree(materials: ForestMaterials, rng: Random, options: TreeOptions): THREE.Group {
  const { height, radius } = options;
  const detail = options.detail === 'far' || options.detail === false || options.detail === 0 ? 0 : options.detail === 'mid' || options.detail === 1 ? 1 : 2;
  const group = new THREE.Group(); group.name = 'forest-tree';
  const wood: THREE.BufferGeometry[] = [], leafTransforms: THREE.Matrix4[] = [];
  const lean = new THREE.Vector3((rng() - 0.5) * height * 0.135, 0, (rng() - 0.5) * height * 0.105);
  const trunk = [new THREE.Vector3(0, -0.12, 0), new THREE.Vector3(lean.x * 0.1, height * 0.2, lean.z * 0.1), new THREE.Vector3(lean.x * 0.35, height * 0.55, lean.z * 0.4), new THREE.Vector3(lean.x, height, lean.z)];
  wood.push(tube(trunk, [radius * 1.36, radius, radius * 0.67, radius * 0.15], detail === 2 ? 14 : 9, rng));
  if (detail > 0) {
    const roots = 5 + Math.floor(rng() * 3);
    for (let i = 0; i < roots; i++) {
      const angle = i / roots * TAU + rng() * 0.28, reach = radius * (3 + rng() * 2.3);
      wood.push(tube([new THREE.Vector3(Math.cos(angle) * radius * 0.2, radius * 0.72, Math.sin(angle) * radius * 0.2), new THREE.Vector3(Math.cos(angle) * reach * 0.45, 0.14, Math.sin(angle) * reach * 0.45), new THREE.Vector3(Math.cos(angle + 0.15) * reach, -0.04, Math.sin(angle + 0.15) * reach)], [radius * 0.32, radius * 0.19, 0.018], 7, rng));
    }
  }
  const branchCount = detail === 0 ? 7 : 10;
  for (let branch = 0; branch < branchCount; branch++) {
    const t = 0.4 + branch / branchCount * 0.49;
    const angle = branch * 2.39996 + rng() * 0.42;
    const reach = height * (0.14 + rng() * 0.11) * (1 - Math.max(0, t - 0.65) * 1.6);
    const start = new THREE.Vector3(lean.x * t * t, height * t, lean.z * t * t);
    const end = new THREE.Vector3(start.x + Math.cos(angle) * reach, start.y + height * (0.08 + rng() * 0.07), start.z + Math.sin(angle) * reach);
    const middle = start.clone().lerp(end, 0.53); middle.y -= height * 0.024;
    wood.push(tube([start, middle, end], [radius * (0.31 - t * 0.13), radius * 0.10, radius * 0.024], detail === 2 ? 8 : 6, rng));
    const secondaryCount = detail === 0 ? 2 : 3;
    for (let secondary = 0; secondary < secondaryCount; secondary++) {
      const from = start.clone().lerp(end, 0.5 + secondary * 0.2);
      const secondaryAngle = angle + (secondary - 1) * 0.88 + (rng() - 0.5) * 0.55;
      const tip = from.clone().add(new THREE.Vector3(Math.cos(secondaryAngle) * reach * 0.56, height * (0.035 + rng() * 0.06), Math.sin(secondaryAngle) * reach * 0.56));
      if (detail > 0) wood.push(tube([from, from.clone().lerp(tip, 0.5).add(new THREE.Vector3(0, -0.04, 0)), tip], [radius * 0.064, radius * 0.036, 0.009], 5, rng));
      const clusterCount = detail === 0 ? 32 : detail === 1 ? 46 : 58;
      for (let leaf = 0; leaf < clusterCount; leaf++) {
        const phase = rng() * TAU, radial = Math.sqrt(rng());
        const spread = reach * (0.30 + rng() * 0.09);
        const center = from.clone().lerp(tip, 0.45 + rng() * 0.67);
        const pos = center.add(new THREE.Vector3(Math.cos(phase) * spread * radial, (rng() - 0.5) * spread * 0.65, Math.sin(phase) * spread * radial));
        const direction = new THREE.Vector3(Math.cos(phase), (rng() - 0.5) * 0.9, Math.sin(phase));
        const normal = new THREE.Vector3((rng() - 0.5) * 0.75, 1, (rng() - 0.5) * 0.75);
        leafTransforms.push(leafMatrix(pos, direction, normal, height * (0.021 + rng() * 0.016), 0.9 + rng() * 0.45));
      }
    }
  }
  const trunkMesh = new THREE.Mesh(merge(wood), materials.bark); trunkMesh.name = 'forest-tree-bark'; trunkMesh.castShadow = detail > 0; trunkMesh.receiveShadow = true; group.add(trunkMesh);
  const leaves = new THREE.InstancedMesh(leafGeometry(detail === 0 ? 3 : detail === 1 ? 4 : 6), materials.leaf, leafTransforms.length);
  leaves.name = 'forest-tree-leaves';
  leafTransforms.forEach((matrix, i) => { leaves.setMatrixAt(i, matrix); leaves.setColorAt(i, colorLeaf(rng)); });
  leaves.instanceMatrix.needsUpdate = true; leaves.castShadow = detail > 0; leaves.receiveShadow = true; leaves.computeBoundingSphere(); group.add(leaves);
  group.userData.foliage = leaves; group.userData.swaySeed = rng() * TAU;
  return group;
}

export function createFern(materials: ForestMaterials, rng: Random, scale = 1): THREE.Group {
  const group = new THREE.Group(); group.name = 'forest-fern';
  const fronds = 6 + Math.floor(rng() * 3), transforms: THREE.Matrix4[] = [], stems: THREE.BufferGeometry[] = [];
  for (let frond = 0; frond < fronds; frond++) {
    const angle = frond / fronds * TAU + rng() * 0.3;
    const length = (0.52 + rng() * 0.4) * scale, lift = (0.2 + rng() * 0.13) * scale;
    const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const sideAxis = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
    const point = (t: number) => direction.clone().multiplyScalar(length * t).setY(0.055 * scale + Math.sin(t * Math.PI * 0.84) * lift);
    stems.push(tube([point(0), point(0.3), point(0.64), point(1)], [0.010 * scale, 0.007 * scale, 0.004 * scale, 0.001 * scale], 4, rng));
    for (let pinna = 0; pinna < 11; pinna++) {
      const t = 0.17 + pinna / 11 * 0.78;
      for (const side of [-1, 1]) {
        const p = point(t);
        const d = sideAxis.clone().multiplyScalar(side).addScaledVector(direction, 0.4 + t * 0.45).setY(0.06 - t * 0.18);
        const bladeLength = Math.sin(t * Math.PI) * (0.14 + 0.035 * rng()) * scale;
        transforms.push(leafMatrix(p, d, new THREE.Vector3(0, 1, 0), bladeLength, 0.53));
      }
    }
    transforms.push(leafMatrix(point(0.93), direction.clone().setY(-0.25), UP, 0.08 * scale, 0.46));
  }
  const stemMesh = new THREE.Mesh(merge(stems), materials.twig); group.add(stemMesh);
  const leaves = new THREE.InstancedMesh(leafGeometry(5, 0.9), materials.leaf, transforms.length); leaves.name = 'forest-fern-leaves';
  transforms.forEach((matrix, i) => { leaves.setMatrixAt(i, matrix); leaves.setColorAt(i, colorLeaf(rng, true)); });
  leaves.instanceMatrix.needsUpdate = true; leaves.castShadow = true; leaves.receiveShadow = true; leaves.computeBoundingSphere(); group.add(leaves);
  group.userData.foliage = leaves; group.userData.swaySeed = rng() * TAU;
  return group;
}

export function createBroadleafPlant(materials: ForestMaterials, rng: Random, scale = 1): THREE.Group {
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
      const p = new THREE.Vector3(side, t, Math.sin(t * Math.PI) * 0.085 - Math.abs(side) * 0.19 + t * t * 0.07 + 0.011).applyMatrix4(matrix);
      const size = scale * (0.009 + rng() * 0.007);
      dewTransforms.push(new THREE.Matrix4().compose(p, new THREE.Quaternion(), new THREE.Vector3(size, size * 0.72, size)));
    }
  }
  const stemMesh = new THREE.Mesh(merge(stems), materials.twig); stemMesh.castShadow = true; group.add(stemMesh);
  const leaves = new THREE.InstancedMesh(leafGeometry(12), materials.leaf, count); leaves.name = 'forest-broadleaf-leaves';
  transforms.forEach((matrix, i) => { leaves.setMatrixAt(i, matrix); leaves.setColorAt(i, colorLeaf(rng, true)); });
  leaves.instanceMatrix.needsUpdate = true; leaves.castShadow = true; leaves.receiveShadow = true; leaves.computeBoundingSphere(); group.add(leaves);
  const dew = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 5), materials.dew, dewTransforms.length); dew.name = 'forest-leaf-dew';
  dewTransforms.forEach((matrix, i) => dew.setMatrixAt(i, matrix)); dew.instanceMatrix.needsUpdate = true; dew.computeBoundingSphere(); group.add(dew);
  group.userData.foliage = leaves; group.userData.swaySeed = rng() * TAU;
  return group;
}
