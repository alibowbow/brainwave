import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { WorldContent } from '../types';

/** Original geometry / texture work. No externally sourced code or visual assets. */
function rng(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

function texture(size: number, paint: (ctx: CanvasRenderingContext2D, size: number) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  paint(ctx, size);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}

function leafMap() {
  const random = rng(72419);
  return texture(512, (ctx, s) => {
    const gradient = ctx.createLinearGradient(0, 0, s, s * 0.7);
    gradient.addColorStop(0, '#355d36');
    gradient.addColorStop(0.46, '#6e9450');
    gradient.addColorStop(0.54, '#87a764');
    gradient.addColorStop(1, '#31582f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 10500; i++) {
      ctx.fillStyle = `rgba(${random() > 0.4 ? '10,37,18' : '194,208,115'},${0.015 + random() * 0.08})`;
      const r = 0.4 + random() * 3;
      ctx.fillRect(random() * s, random() * s, r, r);
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(175,190,119,0.56)';
    ctx.beginPath(); ctx.moveTo(s * 0.5, s); ctx.lineTo(s * 0.5, 0); ctx.stroke();
    for (let row = 0; row < 22; row++) {
      const startY = s * (0.02 + row * 0.046);
      for (const side of [-1, 1]) {
        ctx.lineWidth = 1.7;
        ctx.strokeStyle = 'rgba(150,176,111,0.32)';
        ctx.beginPath();
        ctx.moveTo(s * 0.5, startY);
        ctx.bezierCurveTo(s * (0.5 + 0.10 * side), startY + s * 0.045, s * (0.5 + 0.33 * side), startY + s * 0.17, s * (0.5 + 0.5 * side), startY + s * 0.19);
        ctx.stroke();
        for (let j = 0; j < 7; j++) {
          const x = s * (0.5 + side * (0.035 + j * 0.062));
          const y = startY + s * (0.014 + j * 0.027);
          ctx.lineWidth = 0.7;
          ctx.strokeStyle = 'rgba(120,153,91,0.24)';
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + side * s * 0.073, y - s * 0.018); ctx.stroke();
        }
      }
    }
    // Broken reflections of tiny beads embedded in the cuticle.
    for (let i = 0; i < 110; i++) {
      const x = random() * s, y = random() * s, r = 0.6 + random() * 2.4;
      ctx.fillStyle = 'rgba(15,46,35,0.34)';
      ctx.beginPath(); ctx.ellipse(x, y, r, r * 1.35, -0.3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(222,245,229,0.43)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(x - r * 0.15, y - r * 0.2, r * 0.62, Math.PI, Math.PI * 1.7); ctx.stroke();
    }
  });
}

function barkMap(seed = 72929) {
  const random = rng(seed);
  const map = texture(512, (ctx, s) => {
    ctx.fillStyle = '#757971'; ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 1650; i++) {
      const x = random() * s, y = random() * s, length = 4 + random() * 100;
      ctx.lineWidth = 0.4 + random() * 8;
      ctx.strokeStyle = `rgba(${random() < 0.63 ? '31,34,29' : '151,151,132'},${0.08 + random() * 0.29})`;
      ctx.beginPath(); ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - 5 + random() * 10, y + length * 0.3, x - 5 + random() * 10, y + length * 0.7, x + random() * 5 - 2.5, y + length);
      ctx.stroke();
    }
    // Long, broken fissures connect the fine wet bark flakes without a uniform
    // printed stripe pattern; each trunk family receives an independent map.
    for (let i = 0; i < 92; i++) {
      const x = random() * s, y = random() * s, length = 38 + random() * 230;
      const drift = random() * 21 - 10.5;
      ctx.strokeStyle = `rgba(27,34,29,${0.15 + random() * 0.22})`;
      ctx.lineWidth = 0.65 + random() * 2.1;
      ctx.beginPath(); ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + drift, y + length * 0.28, x - drift * 0.5, y + length * 0.75, x + drift * 0.7, y + length); ctx.stroke();
      ctx.strokeStyle = 'rgba(167,174,154,0.14)'; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(x + 1.6, y + 2); ctx.lineTo(x + drift + 1.6, y + length * 0.28); ctx.stroke();
    }
    for (let i = 0; i < 5500; i++) {
      const x = random() * s, y = random() * s;
      const moss = Math.sin(x * 0.021 + Math.sin(y * 0.034)) > 0.62;
      ctx.fillStyle = moss ? `rgba(85,112,58,${random() * 0.6})` : `rgba(182,188,163,${random() * 0.23})`;
      ctx.fillRect(x, y, 0.7 + random() * 4, 1 + random() * 9);
    }
  });
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  return map;
}

function soilMap() {
  const random = rng(4471);
  const map = texture(256, (ctx, size) => {
    const pixels = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const px = x / size * Math.PI * 2, py = y / size * Math.PI * 2;
      const n = 0.5 + Math.sin(px * 3 + Math.cos(py * 2)) * 0.15
        + Math.sin(py * 4 + Math.cos(px * 3)) * 0.10
        + Math.sin(px * 13 + py * 9) * Math.sin(py * 7 - px * 4) * 0.035
        + (random() - 0.5) * 0.08;
      const p = (y * size + x) * 4;
      pixels.data[p] = 53 + n * 36;
      pixels.data[p + 1] = 56 + n * 34;
      pixels.data[p + 2] = 43 + n * 24;
      pixels.data[p + 3] = 255;
    }
    ctx.putImageData(pixels, 0, 0);
    for (let i = 0; i < 110; i++) {
      const x = random() * size, y = random() * size;
      ctx.strokeStyle = 'rgba(104,101,77,0.21)'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + random() * 10 - 5, y + random() * 7); ctx.stroke();
    }
  });
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(16, 16);
  return map;
}

/** A folded, continuous leaf, with an asymmetrical rolled margin and tapered tip. */
function broadLeaf(width = 1, length = 2, bend = 0.16, rows = 34, columns = 14) {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let i = 0; i <= rows; i++) {
    const v = i / rows;
    const outline = Math.pow(Math.sin(Math.PI * v), 0.68) * (0.975 + 0.025 * Math.sin(v * 14));
    for (let j = 0; j <= columns; j++) {
      const u = (j / columns) * 2 - 1;
      const x = u * width * outline * 0.5;
      const y = Math.sin(v * Math.PI) * bend - u * u * width * 0.044
        + Math.sin(v * 25 + (u > 0 ? 0 : 1.4)) * Math.pow(Math.abs(u), 3) * 0.008;
      positions.push(x + 0.035 * Math.sin(v * 3), y, v * length);
      uvs.push(j / columns, v);
    }
  }
  for (let i = 0; i < rows; i++) for (let j = 0; j < columns; j++) {
    const a = i * (columns + 1) + j, b = a + columns + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices); geo.computeVertexNormals();
  return geo;
}

function trunkShape(seed: number) {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const sides = 15, rings = 27;
  for (let j = 0; j <= rings; j++) {
    const y = j / rings;
    const taper = 1 - 0.31 * y - 0.39 * Math.pow(Math.max(0, (y - 0.80) / 0.20), 1.35);
    const flare = (0.8 + 0.30 * Math.pow(1 - y, 3) + 0.3 * Math.exp(-y * 22)) * taper;
    for (let i = 0; i <= sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const r = flare * (1 + 0.12 * Math.sin(a * 5 + seed) + 0.055 * Math.sin(a * 9 + y * 21 + seed));
      positions.push(Math.cos(a) * r + Math.sin(y * 2.4 + seed) * y * 0.25, y, Math.sin(a) * r + Math.sin(y * 3 + seed) * y * 0.16);
      uvs.push(i / sides * 2, y * 5);
    }
  }
  for (let j = 0; j < rings; j++) for (let i = 0; i < sides; i++) {
    const a = j * (sides + 1) + i, b = a + sides + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices); geo.computeVertexNormals();
  return geo;
}

/** Curled pinnate fronds are built as one crown, then instanced throughout the floor. */
function fernCrown(seed: number) {
  const random = rng(seed);
  const positions: number[] = [], colors: number[] = [], indices: number[] = [];
  const fronds = 5 + seed % 4;
  const color = new THREE.Color();
  const vertex = (p: THREE.Vector3, shade: number) => {
    positions.push(p.x, p.y, p.z);
    color.setRGB(0.21 * shade, 0.38 * shade, 0.15 * shade);
    colors.push(color.r, color.g, color.b);
    return positions.length / 3 - 1;
  };
  for (let f = 0; f < fronds; f++) {
    const theta = f / fronds * Math.PI * 2 + random() * 0.35;
    const length = 0.63 + random() * 0.66;
    const height = 0.32 + random() * 0.48;
    const curl = 1.7 + random() * 0.7;
    const lateralCurve = (random() - 0.5) * 0.32;
    const frondShade = 0.72 + random() * 0.37;
    const pinnaWidth = 0.78 + random() * 0.38;
    const forward = new THREE.Vector3(Math.sin(theta), 0, Math.cos(theta));
    const lateral = new THREE.Vector3(Math.cos(theta), 0, -Math.sin(theta));
    const center = (t: number) => forward.clone().multiplyScalar(length * Math.pow(t, 0.88))
      .addScaledVector(lateral, lateralCurve * t * t).setY(height * Math.sin(t * curl));
    for (let row = 0; row < 20; row++) {
      const t = 0.11 + row * 0.044;
      const a = center(t), b = center(t + 0.048);
      const ia = vertex(a.clone().addScaledVector(lateral, 0.008), 0.82);
      const ib = vertex(a.clone().addScaledVector(lateral, -0.008), 0.82);
      const ic = vertex(b.clone().addScaledVector(lateral, 0.006), 1.05);
      const id = vertex(b.clone().addScaledVector(lateral, -0.006), 1.05);
      indices.push(ia, ib, ic, ib, id, ic);
      for (const side of [-1, 1]) {
        const pinna = 0.18 * pinnaWidth * Math.pow(Math.sin(Math.PI * t), 0.76) * (1.08 - t * 0.42);
        const tip = a.clone().addScaledVector(lateral, side * pinna).addScaledVector(forward, 0.046).add(new THREE.Vector3(0, 0.032, 0));
        const ridge = a.clone().lerp(tip, 0.46).add(new THREE.Vector3(0, 0.012, 0));
        const v0 = vertex(a, (0.75 + t * 0.22) * frondShade), vm = vertex(ridge, 1.13 * frondShade), vt = vertex(tip, 1.25 * frondShade);
        let lastLeft = v0, lastRight = v0;
        for (let edge = 1; edge <= 4; edge++) {
          const s = edge / 5;
          const w = Math.sin(s * Math.PI) * 0.022 * (1 - t * 0.18);
          const midpoint = a.clone().lerp(tip, s);
          const vl = vertex(midpoint.clone().addScaledVector(forward, w), 0.96 * frondShade);
          const vr = vertex(midpoint.clone().addScaledVector(forward, -w), 0.82 * frondShade);
          indices.push(lastLeft, vl, vm, vm, vr, lastRight);
          lastLeft = vl; lastRight = vr;
        }
        indices.push(lastLeft, vt, vm, vm, vt, lastRight);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices); geo.computeVertexNormals();
  return geo;
}

function stoneShape(seed: number) {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const d = 0.94 + 0.11 * Math.sin(x * 5 + seed) * Math.cos(y * 4 + z * 6);
    pos.setXYZ(i, x * d, y * d * 0.60, z * d);
  }
  geo.computeVertexNormals(); return geo;
}

export function createRainyForest(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  const random = rng(382849);
  scene.background = new THREE.Color('#90b0af');
  scene.fog = new THREE.FogExp2('#8bafac', 0.035);
  camera.position.set(0, 1.34, 5.5);
  camera.fov = 57;
  camera.lookAt(0.1, 1.18, -8);
  camera.updateProjectionMatrix();

  scene.add(new THREE.HemisphereLight('#c7e5e2', '#60745d', 2.6));
  scene.add(new THREE.AmbientLight('#b7cdb9', 0.72));
  const skyLight = new THREE.DirectionalLight('#e0eeeb', 1.25);
  skyLight.position.set(-4, 12, -8);
  skyLight.castShadow = true;
  skyLight.shadow.mapSize.set(1024, 1024);
  skyLight.shadow.camera.left = -11; skyLight.shadow.camera.right = 11;
  skyLight.shadow.camera.top = 11; skyLight.shadow.camera.bottom = -11;
  skyLight.shadow.camera.near = 1; skyLight.shadow.camera.far = 34;
  skyLight.shadow.bias = -0.0004; skyLight.shadow.normalBias = 0.055;
  skyLight.shadow.radius = 3;
  scene.add(skyLight);
  const understoryLight = new THREE.PointLight('#bdd5b4', 4, 12, 1.2);
  understoryLight.position.set(-1.6, 3.5, 2.5); scene.add(understoryLight);

  const soil = soilMap(), bark = barkMap(), leaf = leafMap();
  const groundMaterial = new THREE.MeshStandardMaterial({ map: soil, bumpMap: soil, bumpScale: 0.015, roughness: 0.91, vertexColors: true });
  const terrain = new THREE.PlaneGeometry(80, 78, 110, 104);
  terrain.rotateX(-Math.PI / 2);
  const gp = terrain.attributes.position;
  const groundColors: number[] = [];
  for (let i = 0; i < gp.count; i++) {
    const x = gp.getX(i), z = gp.getZ(i) - 22;
    const bank = Math.max(0, Math.abs(x) - 1.5) * 0.023;
    const height = -0.09 + bank + 0.08 * Math.sin(x * 1.9 + z * 0.55) * Math.sin(z * 1.25 + x * 0.25);
    gp.setXYZ(i, x, height, z);
    const n = 0.74 + 0.18 * Math.sin(x * 0.8 + Math.cos(z)) + random() * 0.07;
    groundColors.push(n * 0.73, n * 0.83, n * 0.71);
  }
  terrain.setAttribute('color', new THREE.Float32BufferAttribute(groundColors, 3));
  terrain.computeVertexNormals();
  const ground = new THREE.Mesh(terrain, groundMaterial); ground.receiveShadow = true; scene.add(ground);

  const barkMaterial = new THREE.MeshStandardMaterial({ color: '#d2d2c4', map: bark, bumpMap: bark, bumpScale: 0.085, roughness: 0.96 });
  const barkVariants = [barkMaterial, ...[92817, 33149].map((seed, i) => {
    const map = barkMap(seed);
    map.offset.set(0.13 * (i + 1), 0.19 * (i + 1));
    map.repeat.set(0.85 + i * 0.2, 0.88 + i * 0.21);
    return new THREE.MeshStandardMaterial({ color: i ? '#b4c1ae' : '#c7beb0', map, bumpMap: map, bumpScale: i ? 0.07 : 0.10, roughness: 0.91 + i * 0.06 });
  })];
  const shapeSeeds = [0.2, 2.1, 4.7];
  const trunkGroups = shapeSeeds.map((seed, i) => new THREE.InstancedMesh(trunkShape(seed), barkVariants[i], 33));
  const dummy = new THREE.Object3D();
  const trunkPositions: Array<{ x: number; z: number; radius: number; height: number; top: THREE.Vector3 }> = [];
  const fixed = [
    [-3.2, 1.5, 0.7, 12], [3.8, 0.0, 0.6, 13], [-4.3, -6.5, 0.55, 15],
    [4.1, -9, 0.44, 14], [-1.9, -12, 0.42, 14], [1.7, -17, 0.37, 15],
  ];
  for (let g = 0; g < trunkGroups.length; g++) {
    const batch = trunkGroups[g];
    for (let i = 0; i < 33; i++) {
      const index = g * 33 + i;
      const preset = fixed[index];
      const z = preset ? preset[1] : -5 - random() * 52;
      let x = preset ? preset[0] : (random() - 0.5) * (26 + -z * 0.58);
      if (!preset && Math.abs(x) < 2.4 && z > -11) x += x < 0 ? -3 : 3;
      const radius = preset ? preset[2] : 0.22 + random() * 0.43;
      const height = preset ? preset[3] : 10 + random() * 11;
      dummy.position.set(x, -0.05, z); dummy.rotation.set(0.015 * (random() - 0.5), random() * 6.28, (random() - 0.5) * 0.035);
      dummy.scale.set(radius, height, radius * (0.85 + random() * 0.3)); dummy.updateMatrix();
      batch.setMatrixAt(i, dummy.matrix);
      batch.setColorAt(i, new THREE.Color().setHSL(0.23 + random() * 0.08, 0.09 + random() * 0.13, 0.59 + random() * 0.16));
      const top = new THREE.Vector3(Math.sin(2.4 + shapeSeeds[g]) * 0.25, 1, Math.sin(3 + shapeSeeds[g]) * 0.16).applyMatrix4(dummy.matrix);
      trunkPositions.push({ x, z, radius, height, top });
    }
    batch.castShadow = true; batch.receiveShadow = true; scene.add(batch);
  }

  const rootMaterial = new THREE.MeshStandardMaterial({ color: '#667758', map: bark, bumpMap: bark, bumpScale: 0.055, roughness: 0.96 });
  for (const tree of trunkPositions.slice(0, 6)) {
    for (let i = 0; i < 4; i++) {
      const angle = random() * 6.28, reach = 1.1 + random() * 1.45;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(tree.x, 0.85, tree.z),
        new THREE.Vector3(tree.x + Math.cos(angle) * tree.radius * 0.8, 0.22, tree.z + Math.sin(angle) * tree.radius * 0.8),
        new THREE.Vector3(tree.x + Math.cos(angle + 0.1) * reach * 0.7, 0.05, tree.z + Math.sin(angle + 0.1) * reach * 0.7),
        new THREE.Vector3(tree.x + Math.cos(angle + 0.2) * reach, -0.05, tree.z + Math.sin(angle + 0.2) * reach),
      ]);
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 14, tree.radius * 0.17, 7, false), rootMaterial);
      mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh);
    }
  }

  const fernMaterial = new THREE.MeshStandardMaterial({ color: '#a4b98b', roughness: 0.67, metalness: 0.0, side: THREE.DoubleSide, vertexColors: true });
  const fernBatches: THREE.InstancedMesh[] = [];
  const fernBases: THREE.Matrix4[][] = [];
  for (let group = 0; group < 3; group++) {
    const count = 72;
    const batch = new THREE.InstancedMesh(fernCrown(169 + group * 5), fernMaterial, count);
    const bases: THREE.Matrix4[] = [];
    for (let i = 0; i < count; i++) {
      let z = 4.6 - random() * 33;
      let x = (random() - 0.5) * (13 + Math.max(0, -z) * 0.55);
      if (Math.abs(x) < 1.2 && z > -12) x += x < 0 ? -1.8 : 1.8;
      // Six tactile fronds frame the lower view without walling off the opening.
      if (i < 2) { x = (group === 1 ? -1 : 1) * (1.25 + group * 0.37); z = 2.0 + i * 1.1; }
      if (i === 2) { x = group === 0 ? -0.86 : 1.20; z = group === 0 ? 4.05 : 4.35; }
      const s = i === 2 ? [0.69, 0.93, 0.78][group] : 0.46 + random() * 0.98;
      dummy.position.set(x, 0.04 + Math.max(0, Math.abs(x) - 1.5) * 0.022, z);
      dummy.rotation.set((random() - 0.5) * 0.1, random() * 6.28, (random() - 0.5) * 0.1);
      // Aspect and leaning vary per plant without disturbing the established
      // open wet path or its six framing crowns.
      const aspect = 0.80 + 0.18 * Math.sin(i * 2.7 + group);
      dummy.scale.set(s * (1.05 + group * 0.07), s * aspect, s * (0.88 + (i % 4) * 0.08)); dummy.updateMatrix();
      batch.setMatrixAt(i, dummy.matrix); bases.push(dummy.matrix.clone());
      batch.setColorAt(i, new THREE.Color().setHSL(0.20 + random() * 0.095, 0.19 + random() * 0.15, 0.39 + random() * 0.19));
    }
    batch.castShadow = false; batch.receiveShadow = true;
    scene.add(batch); fernBatches.push(batch); fernBases.push(bases);
  }

  // Branches connect the visible leaf clusters to actual trunks. Their rising,
  // curved taper interrupts the regimented verticals without closing the clearing.
  const branchTips: THREE.Vector3[] = [];
  const boughParts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 53; i++) {
    const tree = trunkPositions[i];
    for (let j = 0; j < 2; j++) {
      const angle = random() * Math.PI * 2;
      const reach = 1.4 + random() * 2.4;
      const height = 3.5 + random() * 2.5;
      const start = new THREE.Vector3(tree.x, height, tree.z);
      const elbow = new THREE.Vector3(tree.x + Math.cos(angle) * reach * 0.52, height + 0.7 + random() * 0.6, tree.z + Math.sin(angle) * reach * 0.52);
      const end = new THREE.Vector3(tree.x + Math.cos(angle + 0.08) * reach, height + 1.3 + random() * 1.1, tree.z + Math.sin(angle + 0.08) * reach);
      branchTips.push(end);
      const curve = new THREE.CatmullRomCurve3([start, elbow, end]);
      const geo = new THREE.TubeGeometry(curve, 14, tree.radius * (0.14 + random() * 0.11), 7, false);
      const pos = geo.attributes.position;
      for (let ring = 0; ring <= 14; ring++) {
        const t = ring / 14, center = curve.getPointAt(t), taper = 0.11 + Math.pow(1 - t, 0.74) * 0.89;
        for (let k = 0; k <= 7; k++) {
          const index = ring * 8 + k;
          pos.setXYZ(index, center.x + (pos.getX(index) - center.x) * taper, center.y + (pos.getY(index) - center.y) * taper, center.z + (pos.getZ(index) - center.z) * taper);
        }
      }
      geo.computeVertexNormals(); boughParts.push(geo);
    }
  }
  // The original low boughs left the upper trunk rings exposed in portrait.
  // A separate deterministic canopy stream extends each top into asymmetric,
  // tapered leaders; leaf sprays overlap those junctions in actual 3D.
  const crownRandom = rng(428871);
  const crownTips: THREE.Vector3[] = [];
  for (const tree of trunkPositions) {
    for (let fork = 0; fork < 3; fork++) {
      const angle = crownRandom() * Math.PI * 2;
      const reach = 1.3 + crownRandom() * 2.9;
      const start = tree.top.clone().add(new THREE.Vector3(0, -0.9 - fork * 0.38, 0));
      const elbow = tree.top.clone().add(new THREE.Vector3(Math.cos(angle) * reach * 0.37, 0.75 + crownRandom() * 0.85, Math.sin(angle) * reach * 0.37));
      const tip = tree.top.clone().add(new THREE.Vector3(Math.cos(angle) * reach, 1.3 + crownRandom() * 1.6, Math.sin(angle) * reach));
      const curve = new THREE.CatmullRomCurve3([start, elbow, tip]);
      const geo = new THREE.TubeGeometry(curve, 12, tree.radius * (0.32 - fork * 0.055), 6, false);
      const positions = geo.attributes.position;
      for (let ring = 0; ring <= 12; ring++) {
        const t = ring / 12, center = curve.getPointAt(t), taper = 0.045 + Math.pow(1 - t, 0.86) * 0.955;
        for (let side = 0; side <= 6; side++) {
          const index = ring * 7 + side;
          positions.setXYZ(index, center.x + (positions.getX(index) - center.x) * taper, center.y + (positions.getY(index) - center.y) * taper, center.z + (positions.getZ(index) - center.z) * taper);
        }
      }
      geo.computeVertexNormals(); boughParts.push(geo);
      crownTips.push(elbow, tip);
    }
  }
  const boughGeometry = mergeGeometries(boughParts);
  boughParts.forEach(g => g.dispose());
  if (boughGeometry) {
    const boughs = new THREE.Mesh(boughGeometry, barkMaterial);
    boughs.castShadow = true; boughs.receiveShadow = true; scene.add(boughs);
  }

  const leafMaterial = new THREE.MeshPhysicalMaterial({ color: '#c7d8ab', map: leaf, bumpMap: leaf, bumpScale: 0.009, roughness: 0.44, clearcoat: 0.42, clearcoatRoughness: 0.26, side: THREE.DoubleSide, emissive: '#6b8447', emissiveMap: leaf, emissiveIntensity: 0.36, sheen: 0.10, sheenColor: new THREE.Color('#aac7a4') });
  const canopyMaterial = new THREE.MeshStandardMaterial({ color: '#bfd0a4', map: leaf, roughness: 0.73, side: THREE.DoubleSide });
  const canopy = new THREE.InstancedMesh(broadLeaf(0.62, 1.18, 0.12, 16, 6), canopyMaterial, 580);
  for (let i = 0; i < 580; i++) {
    const tip = branchTips[Math.floor(i / 5.48) % branchTips.length];
    const angle = (i % 6) / 6 * Math.PI * 2 + random() * 0.7;
    dummy.position.copy(tip).add(new THREE.Vector3(Math.sin(angle) * 0.3, random() * 0.17, Math.cos(angle) * 0.3));
    dummy.rotation.set(-0.08 + (random() - 0.5) * 0.34, angle, (random() - 0.5) * 0.30);
    dummy.scale.setScalar(0.7 + random() * 0.55); dummy.updateMatrix();
    canopy.setMatrixAt(i, dummy.matrix);
    canopy.setColorAt(i, new THREE.Color().setHSL(0.25 + random() * 0.06, 0.24, 0.53 + random() * 0.15));
  }
  canopy.castShadow = true; canopy.receiveShadow = true; scene.add(canopy);
  const crownLeaves = new THREE.InstancedMesh(broadLeaf(0.74, 1.45, 0.15, 8, 4), canopyMaterial, crownTips.length * 5);
  for (let i = 0; i < crownLeaves.count; i++) {
    const tip = crownTips[Math.floor(i / 5)], angle = (i % 5) * 1.2566 + crownRandom() * 0.65;
    dummy.position.copy(tip).add(new THREE.Vector3(Math.sin(angle) * 0.32, crownRandom() * 0.28 - 0.1, Math.cos(angle) * 0.32));
    dummy.rotation.set(-0.3 + crownRandom() * 0.8, angle, (crownRandom() - 0.5) * 0.65);
    const scale = 0.82 + crownRandom() * 0.75;
    dummy.scale.set(scale, scale, scale * (0.8 + crownRandom() * 0.4)); dummy.updateMatrix();
    crownLeaves.setMatrixAt(i, dummy.matrix);
    crownLeaves.setColorAt(i, new THREE.Color().setHSL(0.23 + crownRandom() * 0.07, 0.19 + crownRandom() * 0.13, 0.41 + crownRandom() * 0.17));
  }
  crownLeaves.castShadow = true; crownLeaves.receiveShadow = true; scene.add(crownLeaves);

  // Closest broad leaves share the user's shelter; each has an actual curved stalk.
  const shelter = new THREE.Group(); scene.add(shelter);
  const nearLeaves: THREE.Mesh[] = [];
  const leafRest: THREE.Euler[] = [];
  const leafSpecifications = [
    { x: -2.48, y: 2.69, z: 0.8, width: 1.75, length: 3.15, yaw: 0.45, roll: -0.18, pitch: 0.10 },
    { x: 2.25, y: 2.84, z: 0.15, width: 1.62, length: 3.15, yaw: -0.42, roll: 0.21, pitch: 0.06 },
    { x: -0.6, y: 3.1, z: -0.25, width: 1.30, length: 2.8, yaw: 0.25, roll: -0.08, pitch: 0.04 },
    { x: 1.7, y: 0.90, z: 2.7, width: 1.28, length: 1.7, yaw: -1.8, roll: 0.20, pitch: -0.02 },
    { x: -1.7, y: 0.65, z: 3.2, width: 0.86, length: 1.7, yaw: 1.5, roll: -0.20, pitch: 0.0 },
  ];
  const petioleMaterial = new THREE.MeshStandardMaterial({ color: '#4c7250', roughness: 0.48 });
  for (const spec of leafSpecifications) {
    const mesh = new THREE.Mesh(broadLeaf(spec.width, spec.length, 0.14), leafMaterial);
    mesh.position.set(spec.x, spec.y, spec.z);
    mesh.rotation.set(spec.pitch, spec.yaw, spec.roll);
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData.interaction = 'leaf';
    shelter.add(mesh); nearLeaves.push(mesh); leafRest.push(mesh.rotation.clone());
    const stalk = new THREE.CatmullRomCurve3([
      new THREE.Vector3(spec.x * 1.15, 0.02, spec.z - 0.4),
      new THREE.Vector3(spec.x * 1.13, spec.y * 0.45, spec.z - 0.5),
      new THREE.Vector3(spec.x * 1.08, spec.y * 0.82, spec.z - 0.25),
      new THREE.Vector3(spec.x, spec.y, spec.z),
    ]);
    const stem = new THREE.Mesh(new THREE.TubeGeometry(stalk, 20, 0.023, 7, false), petioleMaterial);
    stem.castShadow = true; shelter.add(stem);
  }

  const stones = new THREE.InstancedMesh(stoneShape(2.7), new THREE.MeshStandardMaterial({ color: '#85958a', map: soil, bumpMap: soil, bumpScale: 0.065, roughness: 0.76 }), 60);
  for (let i = 0; i < 60; i++) {
    const z = 4.4 - random() * 30;
    let x = (random() - 0.5) * 15;
    if (Math.abs(x) < 1.3) x += x > 0 ? 1.8 : -1.8;
    const s = 0.09 + Math.pow(random(), 2) * 0.55;
    dummy.position.set(x, s * 0.16, z); dummy.scale.set(s * 1.3, s * 0.7, s);
    dummy.rotation.set(random() * 0.4, random() * 6.28, random() * 0.3); dummy.updateMatrix();
    stones.setMatrixAt(i, dummy.matrix);
    stones.setColorAt(i, new THREE.Color().setHSL(0.20, 0.08 + random() * 0.16, 0.35 + random() * 0.25));
  }
  stones.castShadow = true; stones.receiveShadow = true; scene.add(stones);
  const litterMaterial = new THREE.MeshStandardMaterial({ color: '#9b895f', map: leaf, roughness: 0.97, side: THREE.DoubleSide });
  const litter = new THREE.InstancedMesh(broadLeaf(0.12, 0.28, 0.018, 8, 4), litterMaterial, 230);
  for (let i = 0; i < litter.count; i++) {
    let x = (random() - 0.5) * 10;
    const z = 4.7 - random() * 18;
    if (Math.abs(x) < 1.22 && z < 2.2) x += x < 0 ? -1.4 : 1.4;
    const bank = Math.max(0, Math.abs(x) - 1.5) * 0.023;
    const y = -0.09 + bank + 0.08 * Math.sin(x * 1.9 + z * 0.55) * Math.sin(z * 1.25 + x * 0.25) + 0.016;
    dummy.position.set(x, y, z); dummy.rotation.set((random() - 0.5) * 0.17, random() * Math.PI * 2, (random() - 0.5) * 0.09);
    dummy.scale.setScalar(0.5 + random() * 0.7); dummy.updateMatrix(); litter.setMatrixAt(i, dummy.matrix);
    litter.setColorAt(i, new THREE.Color().setHSL(0.12 + random() * 0.09, 0.14 + random() * 0.16, 0.48 + random() * 0.2));
  }
  litter.receiveShadow = true; scene.add(litter);

  // Puddles are world-space pools with irregular shorelines, broad reflection, and gradient ripple normals.
  const puddleUniforms = {
    uTime: { value: 0 },
    uSky: { value: new THREE.Color('#6f9f98') },
    uBed: { value: new THREE.Color('#34423a') },
  };
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: puddleUniforms,
    vertexShader: `
      varying vec3 vWorld; varying vec3 vNormal; varying vec2 vUv;
      void main() { vUv=uv; vec4 world=modelMatrix*vec4(position,1.);vWorld=world.xyz;
        vNormal=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*world; }
    `,
    fragmentShader: `
      uniform float uTime;uniform vec3 uSky;uniform vec3 uBed;
      varying vec3 vWorld;varying vec3 vNormal;varying vec2 vUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float height(vec2 p){
        float h=sin(p.x*9.+uTime*.71)*sin(p.y*11.-uTime*.38)*.0017;
        vec2 grid=floor(p*1.8);
        for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
          vec2 id=grid+vec2(float(x),float(y));float seed=hash(id);
          vec2 center=(id+vec2(hash(id+3.1),hash(id+8.4)))/1.8;
          float age=mod(uTime*.47+seed*4.9,2.3);float r=distance(p,center);
          float wave=sin(r*58.-age*16.);float envelope=exp(-pow((r-age*.24)*13.,2.))*exp(-age*1.8);
          h+=wave*envelope*.008;
        }return h;
      }
      void main(){
        vec2 p=vWorld.xz;float e=.014;float h=height(p);
        vec3 n=normalize(vec3((h-height(p+vec2(e,0.)))/e,1.,(h-height(p+vec2(0.,e)))/e));
        vec3 view=normalize(cameraPosition-vWorld);float facing=clamp(dot(n,view),0.,1.);
        float fresnel=.13+.47*pow(1.-facing,3.);
        // Soft vertical canopy reflection is evaluated in world space, not a pasted sky image.
        float trunks=smoothstep(.82,.99,sin((p.x+n.x*.1)*6.4+sin(p.y*2.3)*1.3));
        float broken=sin(p.y*31.+uTime*.7+n.z*5.)*.013;
        vec3 reflected=uSky*(.78+broken)-vec3(.18,.20,.17)*trunks;
        float grit=hash(floor(p*83.))*.045;
        vec3 bed=uBed+vec3(grit*.86,grit*.76,grit*.5)+sin(p.x*13.+sin(p.y*9.))*.012;
        vec3 col=mix(bed,reflected,fresnel);
        vec3 light=normalize(vec3(-.3,1.,-.4));vec3 halfway=normalize(light+view);
        col+=vec3(.50,.60,.57)*pow(max(dot(n,halfway),0.),90.)*.19;
        float edge=1.-smoothstep(.77,.99,length(vUv*2.-1.));
        gl_FragColor=vec4(col,.92*edge);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
  });
  const waterPools = [ { x: 0.05, z: 0.05, rx: 1.07, rz: 2.0 }, { x: -0.45, z: -4.7, rx: 1.35, rz: 2.3 }, { x: 1.1, z: -10.2, rx: 1.1, rz: 2.0 } ];
  for (let p = 0; p < waterPools.length; p++) {
    const spec = waterPools[p];
    const geo = new THREE.CircleGeometry(1, 90);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 1; i < pos.count; i++) {
      const a = Math.atan2(pos.getZ(i), pos.getX(i));
      const r = 1 + Math.sin(a * 3 + p) * 0.12 + Math.sin(a * 7 - p) * 0.05;
      pos.setXYZ(i, pos.getX(i) * spec.rx * r, 0, pos.getZ(i) * spec.rz * r);
    }
    const mesh = new THREE.Mesh(geo, waterMaterial); mesh.position.set(spec.x, 0.065, spec.z); mesh.renderOrder = 2; scene.add(mesh);
  }

  // Rain is a single line batch and begins outside the broad-leaf shelter.
  const rainCount = 1150;
  const rainPositions = new Float32Array(rainCount * 6);
  const rainSpeeds = new Float32Array(rainCount);
  const rainSeeds: number[] = [];
  for (let i = 0; i < rainCount; i++) {
    const x = (random() - 0.5) * 27, y = random() * 13, z = -0.1 - random() * 35;
    rainPositions.set([x, y, z, x - 0.025, y + 0.17 + random() * 0.1, z], i * 6);
    rainSpeeds[i] = 3.3 + random() * 2.1;
    rainSeeds.push(y);
  }
  const rainGeo = new THREE.BufferGeometry(); rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: '#b8d8d7', transparent: true, opacity: 0.19, depthWrite: false }));
  rain.frustumCulled = false; scene.add(rain);

  // Three soft, low ground wisps weave between trees instead of obscuring the forest.
  const mistMap = texture(128, (ctx, s) => {
    const g = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
    g.addColorStop(0, 'rgba(215,239,225,0.48)'); g.addColorStop(0.4, 'rgba(215,239,225,0.20)'); g.addColorStop(1, 'rgba(215,239,225,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  });
  const mists: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(12 + i * 2, 1.6), new THREE.MeshBasicMaterial({ map: mistMap, transparent: true, opacity: 0.12 + i * 0.017, depthWrite: false, side: THREE.DoubleSide }));
    mesh.position.set(i % 2 === 0 ? -2 : 2, 0.8, -5 - i * 5.7); scene.add(mesh); mists.push(mesh);
  }

  // Tiny physical hanging droplets make the shelter's scale legible.
  const dropMaterial = new THREE.MeshPhysicalMaterial({ color: '#cbede3', roughness: 0.08, metalness: 0.05, transparent: true, opacity: 0.72, clearcoat: 1 });
  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), dropMaterial, 38);
  const beadBases: THREE.Vector3[] = [];
  const beadAttachments: Array<{ leaf: number; point: THREE.Vector3; size: number }> = [];
  shelter.updateMatrixWorld(true);
  for (let i = 0; i < 38; i++) {
    const leafMesh = nearLeaves[i % 3];
    const spec = leafSpecifications[i % 3];
    const t = 0.35 + random() * 0.58;
    const side = random() > 0.5 ? 1 : -1;
    const outline = Math.pow(Math.sin(Math.PI * t), 0.68) * (0.975 + 0.025 * Math.sin(t * 14));
    const local = new THREE.Vector3(side * spec.width * outline * 0.49, Math.sin(t*Math.PI)*0.14 - spec.width*0.044 - 0.014, t * spec.length);
    const s = 0.008 + random() * 0.005;
    beadAttachments.push({ leaf: i % 3, point: local.clone(), size: s });
    local.applyMatrix4(leafMesh.matrixWorld); beadBases.push(local);
    dummy.position.copy(local); dummy.rotation.set(0,0,0); dummy.scale.set(s, s * 1.6, s); dummy.updateMatrix(); beads.setMatrixAt(i, dummy.matrix);
  }
  scene.add(beads);

  const fallingCount = 46;
  const falling = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 6, 5), dropMaterial, fallingCount);
  const fallingOrigins: THREE.Vector3[] = [];
  const fallingStarts = new Float32Array(fallingCount);
  for (let i = 0; i < fallingCount; i++) {
    fallingOrigins.push(beadBases[i % beadBases.length].clone());
    fallingStarts[i] = -random() * 5;
    dummy.position.copy(fallingOrigins[i]); dummy.scale.setScalar(0); dummy.updateMatrix(); falling.setMatrixAt(i, dummy.matrix);
  }
  falling.frustumCulled = false; scene.add(falling);
  let touchedLeaf = -1, touchAt = -100, nextDrop = 0;
  const motion = new THREE.Matrix4();
  const euler = new THREE.Euler();

  return {
    interactionTargets: nearLeaves,
    interact(hit, time) {
      const index = nearLeaves.indexOf(hit.object as THREE.Mesh);
      if (index < 0 || time - touchAt < 0.45) return;
      touchedLeaf = index; touchAt = time;
      // A touch releases only a bounded handful of beads; no camera movement or flash.
      for (let j = 0; j < 12; j++) {
        const slot = (nextDrop++) % fallingCount;
        fallingOrigins[slot].copy(hit.point).add(new THREE.Vector3((random() - 0.5) * 0.32, 0.01, (random() - 0.5) * 0.3));
        fallingStarts[slot] = time + j * 0.027;
      }
    },
    update(time, dt) {
      puddleUniforms.uTime.value = time;
      for (let i = 0; i < rainCount; i++) {
        const y = ((rainSeeds[i] - time * rainSpeeds[i]) % 13 + 13) % 13;
        rainPositions[i * 6 + 1] = y;
        rainPositions[i * 6 + 4] = y + 0.19;
      }
      rainGeo.attributes.position.needsUpdate = true;
      for (let i = 0; i < nearLeaves.length; i++) {
        const sway = Math.sin(time * 0.44 + i * 1.7) * 0.010;
        const age = time - touchAt;
        const touch = i === touchedLeaf && age < 5 ? Math.sin(age * 8) * Math.exp(-age * 1.8) * 0.058 : 0;
        nearLeaves[i].rotation.copy(leafRest[i]); nearLeaves[i].rotation.x += sway + touch;
      }
      shelter.updateMatrixWorld(true);
      for (let i = 0; i < beadAttachments.length; i++) {
        const attachment = beadAttachments[i];
        beadBases[i].copy(attachment.point).applyMatrix4(nearLeaves[attachment.leaf].matrixWorld);
        dummy.position.copy(beadBases[i]); dummy.rotation.set(0, 0, 0);
        dummy.scale.set(attachment.size, attachment.size * 1.6, attachment.size);
        dummy.updateMatrix(); beads.setMatrixAt(i, dummy.matrix);
      }
      beads.instanceMatrix.needsUpdate = true;
      // Instance matrices preserve each independent plant's placement while flexing its crown.
      if (dt > 0) for (let g = 0; g < fernBatches.length; g++) {
        const batch = fernBatches[g];
        for (let i = 0; i < batch.count; i++) {
          euler.set(Math.sin(time * 0.63 + i * 0.72 + g) * 0.010, 0, Math.sin(time * 0.43 + i * 0.39) * 0.008);
          motion.makeRotationFromEuler(euler);
          dummy.matrix.multiplyMatrices(fernBases[g][i], motion); batch.setMatrixAt(i, dummy.matrix);
        }
        batch.instanceMatrix.needsUpdate = true;
      }
      for (let i = 0; i < mists.length; i++) mists[i].position.x = (i % 2 === 0 ? -2 : 2) + Math.sin(time * 0.045 + i) * 1.1;
      for (let i = 0; i < fallingCount; i++) {
        if (i > 12 && time - fallingStarts[i] > 6.8 + i * 0.08) { fallingStarts[i] = time + random() * 3.4; fallingOrigins[i].copy(beadBases[i % beadBases.length]); }
        const age = time - fallingStarts[i];
        const y = fallingOrigins[i].y - age * age * 2.7;
        if (age >= 0 && age < 1.8 && y > 0.09) {
          dummy.position.copy(fallingOrigins[i]); dummy.position.y = y;
          dummy.scale.set(0.012, 0.026 + Math.min(0.022, age * 0.02), 0.012);
        } else dummy.scale.setScalar(0);
        dummy.rotation.set(0,0,0); dummy.updateMatrix(); falling.setMatrixAt(i, dummy.matrix);
      }
      falling.instanceMatrix.needsUpdate = true;
    },
    resize(aspect) {
      // Portrait retains the leaf and wet path in the middle; widen vertical field only modestly.
      camera.fov = aspect < 0.75 ? 63 : 57;
      camera.updateProjectionMatrix();
    },
  };
}
