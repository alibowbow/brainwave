import * as THREE from 'three';
import type { WorldBuilder } from './types';
import { createRainRefractionTarget, withRainRenderTargetState } from './renderTargets';
import { gardenFoliageMaterial, gardenLeafGeometry, gardenSepalGeometry } from './gardenFoliage';

/* Original procedural geometry and shaders. No third-party art assets. */
const random = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

function grainTexture(base: string, kind: 'wood' | 'earth' | 'stone', seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const rnd = random(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < (kind === 'wood' ? 1600 : 20000); i++) {
    const x = rnd() * 512, y = rnd() * 512;
    ctx.fillStyle = `rgba(${rnd() < 0.5 ? '255,238,205' : '24,31,20'},${rnd() * 0.16})`;
    if (kind === 'wood') {
      ctx.beginPath();
      ctx.ellipse(x, y, 0.12 + rnd() * 0.55, 18 + rnd() * 240, 0.015 * Math.sin(x), 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, 1 + rnd() * 4, 1 + rnd() * 5);
    }
  }
  if (kind === 'wood') {
    for (let i = 0; i < 3; i++) {
      const x = 60 + rnd() * 370, y = rnd() * 512;
      for (let r = 3; r < 25; r += 2) {
        ctx.strokeStyle = `rgba(41,26,14,${0.09 - r * 0.002})`;
        ctx.beginPath(); ctx.ellipse(x, y, r * 0.32, r, -0.06, 0, Math.PI * 2); ctx.stroke();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function leafGeometry() {
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  const segments = 14;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const width = Math.pow(Math.sin(t * Math.PI), 0.75) * 0.45 * (i % 2 ? 0.87 : 1);
    for (let j = 0; j < 3; j++) {
      const side = j - 1;
      positions.push(side * width, t, (side ? -0.055 : 0.028) * Math.sin(t * Math.PI) + 0.12 * t * t);
      uv.push(j / 2, t);
    }
  }
  for (let i = 0; i < segments; i++) for (let j = 0; j < 2; j++) {
    const a = i * 3 + j, b = a + 3;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

function petalGeometry() {
  const p: number[] = [], uv: number[] = [], ix: number[] = [];
  const rows = 7, columns = 7;
  for (let row = 0; row <= rows; row++) {
    const t = row / rows;
    // Broad rounded sepals, slightly pinched where the four lobes meet.
    const width = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.52) * (0.44 + t * 0.20);
    for (let col = 0; col <= columns; col++) {
      const q = col / columns * 2 - 1;
      p.push(q * width, t, 0.055 * Math.sin(t * Math.PI) + 0.065 * q * q * t - 0.055 * t * t);
      uv.push(col / columns, t);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    const a = r * (columns + 1) + c, b = a + columns + 1;
    ix.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(ix); g.computeVertexNormals();
  return g;
}

export const buildWindow: WorldBuilder = ({ scene, camera, renderer }) => {
  const rnd = random(83059);
  scene.background = new THREE.Color('#a6bab6');
  scene.fog = new THREE.FogExp2('#b4c5bf', 0.021);
  const garden = new THREE.Group(); scene.add(garden);
  const textures: THREE.Texture[] = [];
  const texture = (base: string, kind: 'wood' | 'earth' | 'stone', seed: number) => {
    const t = grainTexture(base, kind, seed); textures.push(t); return t;
  };
  const woodTex = texture('#82745e', 'wood', 13);
  const wood = new THREE.MeshStandardMaterial({ map: woodTex, color: '#c7c4b3', roughness: 0.68, bumpMap: woodTex, bumpScale: 0.018 });
  const sillTex = woodTex.clone(); sillTex.center.set(0.5, 0.5); sillTex.rotation = Math.PI / 2; sillTex.repeat.set(1, 3); textures.push(sillTex);
  const sillWood = new THREE.MeshStandardMaterial({ map: sillTex, color: '#c7c4b3', roughness: 0.65, bumpMap: sillTex, bumpScale: 0.008 });
  const darkWood = new THREE.MeshStandardMaterial({ map: woodTex, color: '#67543c', roughness: 0.74, bumpMap: woodTex, bumpScale: 0.012 });
  const earthTex = texture('#434c33', 'earth', 32);
  earthTex.repeat.set(8, 8);
  const earth = new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.98, bumpMap: earthTex, bumpScale: 0.07 });
  const stoneTex = texture('#78817a', 'stone', 55);
  const stone = new THREE.MeshStandardMaterial({ map: stoneTex, color: '#b5b6a7', roughness: 0.72, bumpMap: stoneTex, bumpScale: 0.042 });
  const bronze = new THREE.MeshStandardMaterial({ color: '#655b41', roughness: 0.42, metalness: 0.62 });
  const leafMat = gardenFoliageMaterial('leaf');
  const petalMat = gardenFoliageMaterial('sepal');
  const glassOccluders: THREE.Object3D[] = [];
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material, parent: THREE.Object3D = scene) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z); mesh.castShadow = mesh.receiveShadow = true; parent.add(mesh); if (parent === scene) glassOccluders.push(mesh); return mesh;
  };
  const rod = (a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D = garden) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.72, radius, a.distanceTo(b), 7), mat);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); parent.add(mesh); return mesh;
  };
  const hemi = new THREE.HemisphereLight('#d8edf0', '#748052', 1.5); scene.add(hemi);
  const daylight = new THREE.DirectionalLight('#e7f4f4', 1.8); daylight.position.set(-3, 7, 2);
  daylight.castShadow = true; daylight.shadow.mapSize.set(1024, 1024);
  daylight.shadow.camera.left = -8; daylight.shadow.camera.right = 8; daylight.shadow.camera.top = 7; daylight.shadow.camera.bottom = -4;
  daylight.shadow.bias = -0.002; daylight.shadow.normalBias = 0.035;
  daylight.shadow.radius = 3; scene.add(daylight);
  const roomLight = new THREE.PointLight('#ffdaa4', 2.7, 7, 2); roomLight.position.set(1.7, 2.5, 2.7); scene.add(roomLight);

  // A real, closed timber sash. The single off-centre stile leaves a broad portrait view.
  box(6.9, 0.18, 0.66, 0, 0.57, 0.12, darkWood);
  const sill = box(6.8, 0.11, 1.15, 0, 0.67, 0.44, sillWood);
  sill.geometry.translate(0, 0, 0);
  box(0.26, 3.9, 0.3, -3.02, 2.0, 0.02, wood);
  box(0.26, 3.9, 0.3, 3.02, 2.0, 0.02, wood);
  box(6.3, 0.28, 0.35, 0, 3.67, 0.02, wood);
  box(0.13, 2.82, 0.17, -0.63, 2.16, 0.08, wood);
  box(5.8, 0.075, 0.15, 0, 2.93, 0.08, wood);
  // Inset retaining strips, grain edges, mortise pegs and the restrained aged latch.
  for (const x of [-2.85, 2.85]) box(0.035, 2.94, 0.06, x, 2.14, 0.17, darkWood);
  for (const y of [0.80, 3.5]) box(5.7, 0.035, 0.06, 0, y, 0.17, darkWood);
  for (const x of [-3.03, 3.03, -0.63]) for (const y of [0.88, 3.35]) {
    const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 10), darkWood);
    peg.rotation.x = Math.PI / 2; peg.position.set(x, y, 0.183); scene.add(peg);
  }
  box(0.06, 0.19, 0.02, -0.625, 1.63, 0.18, bronze);
  box(0.13, 0.025, 0.037, -0.57, 1.64, 0.205, bronze);
  const plaster = new THREE.MeshStandardMaterial({ color: '#c9bfac', roughness: 0.96 });
  box(2.5, 5, 0.2, -4.40, 2.0, 0.05, plaster); box(2.5, 5, 0.2, 4.40, 2.0, 0.05, plaster);
  box(9, 1.3, 0.2, 0, -0.11, 0.07, plaster);

  // A quiet object of the garden, close enough to read ceramic thickness and a wet rim.
  const bowlProfile = [new THREE.Vector2(0.035, 0), new THREE.Vector2(0.16, 0.016), new THREE.Vector2(0.24, 0.085), new THREE.Vector2(0.254, 0.13), new THREE.Vector2(0.24, 0.137), new THREE.Vector2(0.222, 0.09), new THREE.Vector2(0.148, 0.036), new THREE.Vector2(0.04, 0.025)];
  const ceramic = new THREE.MeshStandardMaterial({ color: '#92a8a0', roughness: 0.29, metalness: 0.05 });
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(bowlProfile, 40), ceramic);
  bowl.position.set(0.38, 0.733, 0.44); bowl.receiveShadow = bowl.castShadow = true; scene.add(bowl);
  const bowlWater = new THREE.Mesh(new THREE.CircleGeometry(0.197, 40), new THREE.MeshPhysicalMaterial({ color: '#627f79', roughness: 0.08, metalness: 0.25, clearcoat: 1, transparent: true, opacity: 0.85 }));
  bowlWater.rotation.x = -Math.PI / 2; bowlWater.position.set(0.38, 0.82, 0.44); scene.add(bowlWater);
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Mesh(petalGeometry(), new THREE.MeshStandardMaterial({ color: i === 1 ? '#a4a1d2' : '#8da6d0', side: THREE.DoubleSide, roughness: 0.72 }));
    p.rotation.set(-Math.PI / 2, 0, rnd() * 6.28); p.scale.setScalar(0.075);
    p.position.set(0.31 + rnd() * 0.13, 0.822, 0.38 + rnd() * 0.13); scene.add(p);
  }

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(25, 26, 48, 48), earth);
  const gp = ground.geometry.attributes.position;
  for (let i = 0; i < gp.count; i++) {
    const x = gp.getX(i), y = gp.getY(i); gp.setZ(i, Math.sin(x * 1.2) * Math.cos(y * 0.55) * 0.10 + Math.sin(x * 2.8 + y) * 0.025);
  }
  ground.geometry.computeVertexNormals(); ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.1, -10); ground.receiveShadow = true; garden.add(ground);
  // Irregular wet stepping stones recede between asymmetrical flower beds.
  for (let i = 0; i < 10; i++) {
    const z = -1.3 - i * 0.91, x = -0.18 + Math.sin(i * 0.63) * 1.12;
    const g = new THREE.CylinderGeometry(0.46 + rnd() * 0.13, 0.50 + rnd() * 0.12, 0.09 + rnd() * 0.04, 7);
    const rock = new THREE.Mesh(g, stone); rock.position.set(x, -0.012, z); rock.rotation.y = rnd() * 5; rock.scale.z = 0.65 + rnd() * 0.21;
    rock.castShadow = rock.receiveShadow = true; garden.add(rock);
  }
  const stemMat = new THREE.MeshStandardMaterial({ color: '#536746', roughness: 0.94 });
  const leafG = leafGeometry();
  const foliageRandom = random(38291); // Keep the established distant garden/rain placement deterministic.
  const leavesData: { pos: THREE.Vector3; q: THREE.Quaternion; scale: THREE.Vector3; color: THREE.Color }[] = [];
  const petalsData: { pos: THREE.Vector3; q: THREE.Quaternion; scale: THREE.Vector3; color: THREE.Color }[] = [];
  const eye = new THREE.Vector3(0, 1.6, 3.2);
  const bases = [
    [-1.36, -2.6, 1.87, 0.535], [-3.6, -4.0, 1.40, 0.61], [-1.8, -5.4, 1.13, 0.56],
    [1.42, -2.7, 1.44, 0.62], [3.2, -3.6, 1.57, 0.555], [2.6, -5.8, 1.16, 0.59],
  ];
  bases.forEach(([bx, bz, height, hue], bushIndex) => {
    for (let stem = 0; stem < 7; stem++) {
      const angle = stem * 2.39996 + bushIndex, rad = 0.26 + rnd() * 0.6;
      const top = new THREE.Vector3(bx + Math.cos(angle) * rad, height * (0.63 + rnd() * 0.38), bz + Math.sin(angle) * rad * 0.72);
      const root = new THREE.Vector3(bx + (rnd() - 0.5) * 0.28, -0.05, bz + (rnd() - 0.5) * 0.3);
      rod(root, top, 0.017 + rnd() * 0.009, stemMat);
      for (let j = 0; j < 11; j++) {
        const t = 0.17 + j * 0.068, pos = root.clone().lerp(top, t);
        const outward = new THREE.Vector3(Math.cos(angle + j * 2.4) * 0.65, 0.20 + rnd() * 0.38, Math.sin(angle + j * 2.4) * 0.5);
        const length = 0.34 + rnd() * 0.32;
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward.normalize());
        q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 1.8 - 0.9));
        leavesData.push({ pos, q, scale: new THREE.Vector3(length * (0.72 + foliageRandom() * 0.25), length, length), color: new THREE.Color().setHSL(0.26 + rnd() * 0.07, 0.33 + rnd() * 0.16, 0.22 + rnd() * 0.13) });
      }
      const bloomRadius = 0.20 + rnd() * 0.11;
      const forward = eye.clone().sub(top).normalize().lerp(new THREE.Vector3(0, 1, 0), 0.35).normalize();
      const basisQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), forward);
      const floretCount = bushIndex === 0 || bushIndex === 3 ? 45 : 32;
      for (let f = 0; f < floretCount; f++) {
        const polar = Math.acos(1 - (f + 0.5) / (floretCount + 2)), azimuth = f * 2.39996;
        const normal = new THREE.Vector3(Math.sin(polar) * Math.cos(azimuth), Math.sin(polar) * Math.sin(azimuth), Math.cos(polar));
        const centre = normal.clone().multiplyScalar(bloomRadius * (0.88 + rnd() * 0.25));
        centre.x *= 0.92 + foliageRandom() * 0.13;
        centre.y *= 0.82 + foliageRandom() * 0.17;
        centre.z *= 0.75 + foliageRandom() * 0.17;
        centre.applyQuaternion(basisQ).add(top);
        const flowerQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().applyQuaternion(basisQ));
        const spin = rnd() * Math.PI * 2, size = 0.065 + rnd() * 0.027;
        const c = new THREE.Color().setHSL(hue + 0.05 + rnd() * 0.035, 0.40 + rnd() * 0.22, 0.45 + rnd() * 0.16);
        for (let petal = 0; petal < 4; petal++) {
          const q = flowerQ.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), spin + petal * Math.PI / 2 + (foliageRandom() - 0.5) * 0.19));
          q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), (foliageRandom() - 0.5) * 0.22));
          const sepalLength = size * (0.83 + foliageRandom() * 0.32);
          petalsData.push({ pos: centre, q, scale: new THREE.Vector3(size * (0.84 + foliageRandom() * 0.22), sepalLength, size), color: c.clone().offsetHSL((foliageRandom() - 0.5) * 0.012, 0, (foliageRandom() - 0.5) * 0.032) });
        }
      }
    }
  });
  const leaves = new THREE.Group(), petals = new THREE.Group();
  leaves.name = 'hydrangea-curved-leaves'; petals.name = 'hydrangea-irregular-sepals';
  const dummy = new THREE.Object3D();
  // Four actual curved surfaces prevent scale/color changes from repeating one primitive.
  for (const [group, data, geometry, mat] of [
    [leaves, leavesData, gardenLeafGeometry, leafMat],
    [petals, petalsData, gardenSepalGeometry, petalMat],
  ] as const) for (let variant = 0; variant < 4; variant++) {
    const instances = data.filter((_, i) => i % 4 === variant);
    const mesh = new THREE.InstancedMesh(geometry(variant), mat, instances.length);
    instances.forEach((d, i) => {
      dummy.position.copy(d.pos); dummy.quaternion.copy(d.q); dummy.scale.copy(d.scale); dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, d.color);
    });
    mesh.castShadow = mesh.receiveShadow = true; group.add(mesh);
  }
  garden.add(leaves, petals);
  // The far boundary is a textured Japanese garden wall and irregular bamboo, not a city grid.
  const wallTex = texture('#a8b2a1', 'stone', 18); wallTex.repeat.set(5, 1);
  const gardenWall = new THREE.MeshStandardMaterial({ map: wallTex, color: '#c4c8b7', roughness: 0.97, bumpMap: wallTex, bumpScale: 0.016 });
  box(24, 1.5, 0.23, 0, 0.58, -11.5, gardenWall, garden);
  const cap = box(24.3, 0.12, 0.64, 0, 1.37, -11.5, new THREE.MeshStandardMaterial({ color: '#59675e', roughness: 0.88 }), garden); cap.rotation.z = 0.002;
  const bambooMat = new THREE.MeshStandardMaterial({ color: '#7f9266', roughness: 0.76 });
  const bambooLeaves: THREE.Matrix4[] = [];
  for (let i = 0; i < 29; i++) {
    const x = -11 + i * 0.79 + rnd() * 0.25, h = 3.8 + rnd() * 3.8, z = -12.8 - rnd() * 3.4;
    const start = new THREE.Vector3(x, 0, z), tip = new THREE.Vector3(x + (rnd() - 0.5) * 1.1, h, z + rnd() * 0.8);
    rod(start, tip, 0.045 + rnd() * 0.018, bambooMat);
    for (let n = 0; n < 7; n++) {
      const centre = start.clone().lerp(tip, 0.42 + n * 0.077);
      const side = n % 2 ? 1 : -1, end = centre.clone().add(new THREE.Vector3(side * (0.9 + rnd()), 0.1 + rnd() * 0.4, rnd() - 0.5));
      rod(centre, end, 0.009, stemMat);
      for (let f = 0; f < 9; f++) {
        dummy.position.copy(centre).lerp(end, (f + 1) / 10);
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(side * (f % 2 ? 0.2 : 0.9), -0.12 - rnd() * 0.7, 0.4).normalize());
        dummy.scale.set(0.09, 0.48 + rnd() * 0.23, 0.3); dummy.updateMatrix(); bambooLeaves.push(dummy.matrix.clone());
      }
    }
  }
  const bambooLeafMesh = new THREE.InstancedMesh(leafG, new THREE.MeshStandardMaterial({ color: '#4f7355', roughness: 0.95, side: THREE.DoubleSide }), bambooLeaves.length);
  bambooLeaves.forEach((m, i) => bambooLeafMesh.setMatrixAt(i, m)); garden.add(bambooLeafMesh);

  // Broad-leaf trees overlap behind the wall; branch-led clumps avoid a repeated sphere hedge.
  const canopyMatrices: THREE.Matrix4[] = [], canopyColors: THREE.Color[] = [];
  const barkMat = new THREE.MeshStandardMaterial({ map: woodTex, color: '#58624c', roughness: 0.97, bumpMap: woodTex, bumpScale: 0.025 });
  for (const [tx, tz, height] of [[-9, -13, 6.7], [-3.5, -13.8, 7.4], [3.4, -14.3, 7.2], [9.2, -12, 7.0]]) {
    const base = new THREE.Vector3(tx, 0, tz), trunkTop = new THREE.Vector3(tx + 0.45, height * 0.65, tz - 0.25);
    rod(base, trunkTop, 0.17, barkMat);
    for (let branch = 0; branch < 9; branch++) {
      const angle = branch * 2.4, spread = 1.1 + rnd() * 1.5;
      const fork = base.clone().lerp(trunkTop, 0.5 + rnd() * 0.43);
      const tip = new THREE.Vector3(tx + Math.cos(angle) * spread, height * (0.57 + rnd() * 0.43), tz + Math.sin(angle) * spread * 0.7);
      rod(fork, tip, 0.047, barkMat);
      for (let l = 0; l < 76; l++) {
        const leafCentre = fork.clone().lerp(tip, 0.42 + rnd() * 0.71);
        leafCentre.x += (rnd() - 0.5) * 1.75; leafCentre.y += (rnd() - 0.5) * 0.95; leafCentre.z += (rnd() - 0.5) * 1.45;
        dummy.position.copy(leafCentre);
        dummy.rotation.set(rnd() * 1.7 - 0.85, rnd() * 2.2 - 1.1, rnd() * 6.28);
        const size = 0.45 + rnd() * 0.40;
        dummy.scale.set(size * 0.7, size, size); dummy.updateMatrix(); canopyMatrices.push(dummy.matrix.clone());
        canopyColors.push(new THREE.Color().setHSL(0.25 + rnd() * 0.05, 0.26 + rnd() * 0.2, 0.15 + rnd() * 0.12));
      }
    }
  }
  const canopy = new THREE.InstancedMesh(leafG, new THREE.MeshStandardMaterial({ color: '#e5ebd5', roughness: 0.88, side: THREE.DoubleSide }), canopyMatrices.length);
  canopyMatrices.forEach((m, i) => { canopy.setMatrixAt(i, m); canopy.setColorAt(i, canopyColors[i]); });
  canopy.receiveShadow = true; garden.add(canopy);

  // Small ground plants, wet pebbles and ferns establish scale between path and flower beds.
  const fernMatrices: THREE.Matrix4[] = [];
  for (let clump = 0; clump < 26; clump++) {
    const z = -1.6 - rnd() * 8, pathX = -0.18 + Math.sin((-z - 1.3) / 0.91 * 0.63) * 1.12;
    const x = pathX + (clump % 2 ? 1 : -1) * (0.71 + rnd() * 1.0);
    for (let frond = 0; frond < 6; frond++) {
      const angle = frond * 1.047 + clump, direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      for (let pair = 1; pair <= 7; pair++) for (const side of [-1, 1]) {
        const t = pair / 8, span = 0.17 * Math.sin(t * Math.PI);
        dummy.position.set(x + direction.x * t * 0.46, 0.02 + Math.sin(t * Math.PI * 0.7) * 0.35, z + direction.z * t * 0.46);
        const out = new THREE.Vector3(direction.z * side, 0.10, -direction.x * side);
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), out.normalize());
        dummy.scale.set(span * 0.62, span, span); dummy.updateMatrix(); fernMatrices.push(dummy.matrix.clone());
      }
    }
  }
  const ferns = new THREE.InstancedMesh(leafG, new THREE.MeshStandardMaterial({ color: '#657b43', side: THREE.DoubleSide, roughness: 0.83 }), fernMatrices.length);
  fernMatrices.forEach((m, i) => ferns.setMatrixAt(i, m)); ferns.receiveShadow = true; garden.add(ferns);
  const pebbleGeo = new THREE.IcosahedronGeometry(1, 1), pebbleMatrices: THREE.Matrix4[] = [];
  for (let i = 0; i < 110; i++) {
    const z = -1.35 - rnd() * 9, pathX = -0.18 + Math.sin((-z - 1.3) / 0.91 * 0.63) * 1.12;
    dummy.position.set(pathX + (rnd() - 0.5) * 1.65, -0.015, z);
    dummy.rotation.set(rnd(), rnd() * 6, rnd());
    const size = 0.025 + rnd() * 0.055; dummy.scale.set(size * 1.3, size * 0.55, size); dummy.updateMatrix(); pebbleMatrices.push(dummy.matrix.clone());
  }
  const pebbles = new THREE.InstancedMesh(pebbleGeo, stone, pebbleMatrices.length);
  pebbleMatrices.forEach((m, i) => pebbles.setMatrixAt(i, m)); pebbles.receiveShadow = true; garden.add(pebbles);

  // Low-contrast rain is placed in depth behind the glass.
  const rainCount = 1000, rainP = new Float32Array(rainCount * 6), rainSeed = new Float32Array(rainCount * 3);
  for (let i = 0; i < rainCount; i++) { rainSeed[i * 3] = rnd() * 19 - 9.5; rainSeed[i * 3 + 1] = rnd() * 7; rainSeed[i * 3 + 2] = -0.8 - rnd() * 13; }
  const rainGeo = new THREE.BufferGeometry(); rainGeo.setAttribute('position', new THREE.BufferAttribute(rainP, 3));
  const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: '#d8e8e3', transparent: true, opacity: 0.28, depthWrite: false })); garden.add(rain);

  // Screen-space refraction comes from this same 3D scene and camera, not a backdrop image.
  const refraction = createRainRefractionTarget(renderer);
  const glassUniforms = {
    uScene: { value: null as THREE.Texture | null }, uResolution: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 },
    uTouch: { value: new THREE.Vector2(-2, -2) }, uTouchStrength: { value: 0 },
  };
  const glassMat = new THREE.ShaderMaterial({
    uniforms: glassUniforms, transparent: false, depthWrite: true, toneMapped: true,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      uniform sampler2D uScene; uniform vec2 uResolution; uniform float uTime; uniform vec2 uTouch; uniform float uTouchStrength; varying vec2 vUv;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      vec3 drops(vec2 uv, vec2 density, float layer){
        vec2 p=uv*density; vec2 cell=floor(p); float seed=h(cell+layer);
        vec2 q=fract(p)-vec2(0.18+seed*0.60,0.24+h(cell+2.2)*0.5);
        float r=0.040+0.090*pow(h(cell+1.7),1.7); q.y*=0.80+seed*0.22;
        float d=length(q)/r; float mask=(1.0-smoothstep(0.76,1.0,d))*step(0.34,seed);
        // A shallow cap bends the real scene most at the rim; no opaque green bead fill.
        float curvature=sqrt(max(0.06,1.0-min(d*d,0.94)));
        return vec3(q*mask/(r*curvature),mask);
      }
      void main(){
        vec2 screenUv=gl_FragCoord.xy/uResolution;
        vec3 a=drops(vUv,vec2(38.0,22.0),0.0), b=drops(vUv,vec2(19.0,11.0),8.1);
        vec2 refractNormal=a.xy*0.0014+b.xy*0.0025;
        float stream=0.0; vec2 streamN=vec2(0.0);
        for(int i=0;i<7;i++){
          float fi=float(i); float seed=fract(sin(fi*72.13+9.8)*199.73);
          float head=1.1-fract(uTime*(0.027+seed*0.016)+seed)*1.3;
          float x=0.06+fi*0.147+sin(vUv.y*17.0+fi)*0.003;
          float dx=vUv.x-x; float tail=smoothstep(head-0.018,head+0.025,vUv.y)*(1.0-smoothstep(head+0.23,head+0.58,vUv.y));
          float s=exp(-pow(dx/0.0015,2.0))*tail;
          stream=max(stream,s); streamN.x+=sign(dx)*s*0.006;
          vec2 qp=(vUv-vec2(x,head))*vec2(1.0,0.66); float dd=length(qp)/0.009;
          float bead=1.0-smoothstep(0.72,1.0,dd); refractNormal+=qp*bead*0.72;
        }
        vec2 traceDelta=(vUv-uTouch)*vec2(1.5,1.0);
        float clear=exp(-dot(traceDelta,traceDelta)*135.0)*uTouchStrength;
        refractNormal=(refractNormal+streamN)*(1.0-clear*0.88);
        vec3 bg=texture2D(uScene,clamp(screenUv+refractNormal,vec2(0.002),vec2(0.998))).rgb;
        float fineHighlight=pow(max(0.0,(a.x+a.y*0.8)*0.52),5.0)*a.z;
        float largeHighlight=pow(max(0.0,(b.x+b.y*0.8)*0.52),5.0)*b.z;
        float edgeLight=min(0.075,fineHighlight*0.030+largeHighlight*0.048)+stream*0.027;
        float mist=(0.012+pow(1.0-vUv.y,3.0)*0.018)*(1.0-clear);
        bg=mix(bg,vec3(0.64,0.73,0.70),mist)+edgeLight*(1.0-clear);
        gl_FragColor=vec4(bg,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(5.72, 2.69), glassMat);
  glass.position.set(0, 2.15, -0.012); scene.add(glass);
  const raycaster = new THREE.Raycaster(), viewport = new THREE.Vector2();
  let traceAge = 100, currentTime = 0;
  const resize = (aspect: number) => {
    camera.fov = aspect < 0.85 ? 51 : 49;
    camera.position.set(aspect < 0.85 ? -0.08 : 0.12, aspect < 0.85 ? 1.42 : 1.47, aspect < 0.85 ? 3.15 : 3.05);
    camera.lookAt(aspect < 0.85 ? -0.07 : 0, aspect < 0.85 ? 1.45 : 1.38, -3.5);
    camera.updateProjectionMatrix();
  };
  return {
    resize,
    update(time, dt) {
      currentTime = time; traceAge += dt;
      glassUniforms.uTime.value = time; glassUniforms.uTouchStrength.value = Math.max(0, 1 - traceAge / 8);
      garden.rotation.y = Math.sin(time * 0.19) * 0.00045;
      bambooLeafMesh.rotation.z = Math.sin(time * 0.28) * 0.0025;
      canopy.rotation.z = Math.sin(time * 0.16) * 0.0009;
      leaves.rotation.z = Math.sin(time * 0.37) * 0.0017; petals.rotation.z = Math.sin(time * 0.37) * 0.0017;
      for (let i = 0; i < rainCount; i++) {
        const j = i * 6, s = i * 3;
        const y = ((rainSeed[s + 1] - time * 4.7) % 7 + 7) % 7;
        rainP[j] = rainSeed[s] + y * 0.042; rainP[j + 1] = y; rainP[j + 2] = rainSeed[s + 2];
        rainP[j + 3] = rainP[j] + 0.009; rainP[j + 4] = y + 0.14; rainP[j + 5] = rainP[j + 2];
      }
      rainGeo.attributes.position.needsUpdate = true;
      renderer.getDrawingBufferSize(viewport);
      const target = refraction.ensure(Math.max(1, viewport.x), Math.max(1, viewport.y));
      glassUniforms.uScene.value = target.texture; glassUniforms.uResolution.value.copy(viewport);
      const glassVisible = glass.visible;
      try {
        glass.visible = false;
        withRainRenderTargetState(renderer, () => {
          renderer.setRenderTarget(target, 0, 0); renderer.clear(); renderer.render(scene, camera);
        });
      } finally { glass.visible = glassVisible; }
    },
    interact(x, y, explicit) {
      if (explicit) glassUniforms.uTouch.value.set(0.52, 0.43);
      else {
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const hit = raycaster.intersectObjects([glass, ...glassOccluders], false)[0];
        if (!hit?.uv || hit.object !== glass) return null;
        glassUniforms.uTouch.value.copy(hit.uv);
      }
      traceAge = 0;
      return { action: 'glass-trace', value: 0.65 + Math.sin(currentTime) * 0.1 };
    },
    dispose() { refraction.dispose(); textures.forEach(t => t.dispose()); },
  };
};
