import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';
import { terrainHeight } from './world';

/** Where the pine stands on the headland, in the right foreground. */
export const PINE_BASE = { x: 20.6, z: -24.5 };

interface Limb {
  points: THREE.Vector3[];
  radii: number[];
}

/** A tapering tube along a path (rings of `sides` vertices). */
function tube(limb: Limb, sides: number, positions: number[], normals: number[], indices: number[]) {
  const { points, radii } = limb;
  const start = positions.length / 3;
  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const helper = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < points.length; i++) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    tangent.subVectors(next, prev).normalize();
    helper.set(0, 0, 1);
    if (Math.abs(tangent.dot(helper)) > 0.9) helper.set(1, 0, 0);
    normal.crossVectors(tangent, helper).normalize();
    binormal.crossVectors(tangent, normal).normalize();
    for (let s = 0; s < sides; s++) {
      const a = (s / sides) * Math.PI * 2;
      const nx = Math.cos(a) * normal.x + Math.sin(a) * binormal.x;
      const ny = Math.cos(a) * normal.y + Math.sin(a) * binormal.y;
      const nz = Math.cos(a) * normal.z + Math.sin(a) * binormal.z;
      positions.push(points[i].x + nx * radii[i], points[i].y + ny * radii[i], points[i].z + nz * radii[i]);
      normals.push(nx, ny, nz);
    }
  }
  for (let i = 0; i < points.length - 1; i++) {
    for (let s = 0; s < sides; s++) {
      const a = start + i * sides + s;
      const b = start + i * sides + ((s + 1) % sides);
      const c = a + sides;
      const d = b + sides;
      indices.push(a, c, b, b, c, d);
    }
  }
}

/**
 * A clump of pine foliage drawn once on a canvas: feathery tufts of needles
 * heaped into a soft mass, lit gold along its top and sunward (left) edge,
 * dark olive underneath.
 */
function drawClump(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  let s = 99;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  g.lineCap = 'round';
  const tufts: { x: number; y: number }[] = [];
  for (let i = 0; i < 80; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    tufts.push({ x: 0.5 + Math.cos(a) * r * 0.36, y: 0.56 + Math.sin(a) * r * 0.24 });
  }
  // Lower tufts first, so the lit ones above overlap them.
  tufts.sort((a, b) => b.y - a.y);
  for (const tuft of tufts) {
    const light = Math.min(1, Math.max(0, 0.25 + (0.6 - tuft.y) * 2.2 + (0.5 - tuft.x) * 0.6 + (rand() - 0.5) * 0.3));
    for (let k = 0; k < 44; k++) {
      // Needles fan out from the tuft, mostly upwards and outwards.
      const angle = -Math.PI / 2 + (rand() - 0.5) * 2.8;
      const length = size * (0.025 + 0.055 * rand());
      const x0 = (tuft.x + (rand() - 0.5) * 0.03) * size;
      const y0 = (tuft.y + (rand() - 0.5) * 0.02) * size;
      const tip = Math.min(1, light * (0.55 + 0.6 * rand()));
      g.strokeStyle = `rgb(${Math.round(36 + tip * 200)}, ${Math.round(36 + tip * 140)}, ${Math.round(16 + tip * 54)})`;
      g.lineWidth = size * (0.003 + 0.003 * rand());
      g.beginPath();
      g.moveTo(x0, y0);
      g.quadraticCurveTo(x0 + Math.cos(angle) * length * 0.5 - size * 0.006, y0 + Math.sin(angle) * length * 0.5, x0 + Math.cos(angle) * length, y0 + Math.sin(angle) * length);
      g.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

interface Pad {
  at: THREE.Vector3;
  size: number;
  heading: THREE.Vector3;
}

/**
 * A wind-bent pine: a thick trunk leaning out towards the sea, forking into
 * crooked limbs that reach seaward and up, each ending in flat pads of
 * needle tufts. It sways a little, more towards its crown.
 */
export function createPine(sunDirection: THREE.Vector3) {
  let s = 2024;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const baseY = terrainHeight(PINE_BASE.x, PINE_BASE.z) - 0.4;
  const base = new THREE.Vector3(PINE_BASE.x, baseY, PINE_BASE.z);
  const limbs: Limb[] = [];
  const pads: Pad[] = [];
  // Seaward, as seen from the viewer: to the left of the picture.
  const seaward = new THREE.Vector3(-0.97, 0, -0.24).normalize();
  const jitter = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  const grow = (start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, depth: number, lift: number) => {
    const limb: Limb = { points: [start.clone()], radii: [radius] };
    const dir = direction.clone().normalize();
    const point = start.clone();
    const segments = depth === 0 ? 9 : 6;
    for (let i = 1; i <= segments; i++) {
      // Crooked: every segment turns a little; the wind pushes seaward, the light pulls up.
      jitter.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(depth === 0 ? 0.35 : 0.6);
      dir.add(jitter).addScaledVector(seaward, 0.1).addScaledVector(up, lift).normalize();
      point.addScaledVector(dir, length / segments);
      limb.points.push(point.clone());
      limb.radii.push(radius * (1 - (0.7 * i) / segments) + 0.01);
    }
    limbs.push(limb);
    const tip = limb.points[segments];
    if (depth >= 3 || length < 1.4) {
      pads.push({ at: tip.clone(), size: 0.9 + 0.7 * rand() + 0.15 * length, heading: dir.clone() });
      return;
    }
    // Forks near the end, and a side branch or two along the way.
    const forks = 2;
    for (let k = 0; k < forks; k++) {
      const turn = new THREE.Vector3(rand() - 0.5, (rand() - 0.3) * 0.8, rand() - 0.5).multiplyScalar(1.3);
      const child = dir.clone().add(turn).addScaledVector(seaward, 0.35).normalize();
      grow(tip, child, length * (0.55 + 0.2 * rand()), radius * 0.62, depth + 1, lift * 0.6);
    }
    const sides = depth === 1 ? 2 : 1;
    for (let k = 0; k < sides; k++) {
      const u = 3 + Math.floor(rand() * (segments - 3));
      const from = limb.points[u];
      const child = new THREE.Vector3(rand() - 0.5, 0.1 + 0.3 * rand(), rand() - 0.5).multiplyScalar(1.4).add(seaward).normalize();
      grow(from, child, length * (0.4 + 0.2 * rand()), limb.radii[u] * 0.55, depth + 2, 0.02);
    }
  };

  // The trunk leans seaward and forks into a few great limbs: one climbing,
  // one sweeping far out over the slope, one low; smaller branches from them.
  const trunk: Limb = { points: [], radii: [] };
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    trunk.points.push(new THREE.Vector3(
      base.x - 1.6 * t - 1.8 * t * t + 0.25 * Math.sin(t * 7),
      base.y + 6.2 * t,
      base.z - 0.4 * t + 0.3 * Math.sin(t * 4),
    ));
    trunk.radii.push(0.62 - 0.26 * t);
  }
  limbs.push(trunk);
  const fork = trunk.points[10];
  grow(fork, new THREE.Vector3(-0.5, 0.85, 0.05), 5.6, 0.34, 1, 0.08);
  grow(fork, new THREE.Vector3(-0.95, 0.22, 0.12), 7.4, 0.3, 1, 0.04);
  grow(fork, new THREE.Vector3(0.1, 1, -0.15), 4.2, 0.26, 1, 0.1);
  grow(trunk.points[5], new THREE.Vector3(-0.85, 0.12, 0.45), 5.6, 0.22, 1, 0.03);

  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  limbs.forEach((limb, i) => tube(limb, i === 0 ? 10 : limb.radii[0] > 0.12 ? 7 : 5, positions, normals, indices));
  const wood = new THREE.BufferGeometry();
  wood.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  wood.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  wood.setIndex(indices);

  const sway = /* glsl */ `
    uniform float uTime;
    uniform vec3 uBase;
    vec3 swayed(vec3 p) {
      float rise = max(p.y - uBase.y, 0.0) / 15.0;
      float gust = sin(uTime * 0.9 + p.x * 0.05) * 0.7 + sin(uTime * 2.1 + p.z * 0.3) * 0.3;
      return p + vec3(-0.22 * gust * rise * rise, 0.0, 0.07 * gust * rise * rise);
    }
  `;
  const uniforms = () => ({
    uSunDir: { value: sunDirection },
    uTime: { value: 0 },
    uHaze: { value: 1 },
    uBase: { value: base.clone() },
  });

  const woodMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms(),
    vertexShader: /* glsl */ `
      ${sway}
      varying vec3 vWorld;
      varying vec3 vNormal;
      void main() {
        vec3 p = swayed(position);
        vWorld = p;
        vNormal = normal;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec3 n = normalize(vNormal);
        // Furrowed bark, grey-brown, warm where the low sun catches it.
        // Deep furrows running along the trunk and limbs.
        float furrows = abs(vnoise(vec2(atan(n.z, n.x) * 5.0, vWorld.y * 1.5)) - 0.5) * 2.0;
        float bark = vnoise(vec2(vWorld.y * 5.0, atan(n.z, n.x) * 4.0)) * 0.5 + (1.0 - furrows) * 0.5;
        vec3 albedo = mix(vec3(0.05, 0.04, 0.035), vec3(0.28, 0.22, 0.17), bark * bark);
        vec3 col = lightGround(albedo, n, 0.75);
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });

  // Foliage: at each branch tip a few clumps, drawn as soft masses facing the viewer.
  const clumpTexture = drawClump(512);
  const quad = new THREE.PlaneGeometry(1, 1);
  const foliage = new THREE.InstancedBufferGeometry();
  foliage.index = quad.index;
  foliage.setAttribute('position', quad.getAttribute('position'));
  foliage.setAttribute('uv', quad.getAttribute('uv'));
  const clumpsPerPad = 4;
  const clumpData = new Float32Array(pads.length * clumpsPerPad * 4);
  const shadeData = new Float32Array(pads.length * clumpsPerPad * 2);
  const top = Math.max(...pads.map((pad) => pad.at.y));
  let n = 0;
  for (const pad of pads) {
    // Higher, outer pads are in the sun; low, inner ones in the crown's shade.
    const lit = Math.min(1, Math.max(0, 0.4 + 0.6 * (1 - (top - pad.at.y) / 11)));
    for (let c = 0; c < clumpsPerPad; c++) {
      const spread = pad.size * 0.8;
      clumpData.set([
        pad.at.x + (rand() - 0.5) * spread * 1.6,
        pad.at.y + (rand() - 0.4) * spread * 0.45,
        pad.at.z + (rand() - 0.5) * spread * 1.6,
        pad.size * (0.75 + 0.5 * rand()),
      ], n * 4);
      shadeData.set([lit * (0.85 + 0.15 * rand()), (rand() - 0.5) * 0.5], n * 2);
      n++;
    }
  }
  foliage.setAttribute('aClump', new THREE.InstancedBufferAttribute(clumpData, 4));
  foliage.setAttribute('aShade', new THREE.InstancedBufferAttribute(shadeData, 2));
  foliage.instanceCount = n;
  const needleMaterial = new THREE.ShaderMaterial({
    uniforms: { ...uniforms(), tClump: { value: clumpTexture } },
    vertexShader: /* glsl */ `
      ${sway}
      attribute vec4 aClump;
      attribute vec2 aShade;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vShade;
      void main() {
        vUv = uv;
        vec3 centre = swayed(aClump.xyz);
        // Facing the viewer, a little turned, wider than tall.
        vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
        vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
        float c = cos(aShade.y);
        float s = sin(aShade.y);
        vec2 corner = mat2(c, s, -s, c) * (position.xy * vec2(1.7, 1.0)) * aClump.w;
        vec3 p = centre + right * corner.x + up * corner.y;
        vWorld = p;
        vShade = aShade.x;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tClump;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vShade;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 clump = texture2D(tClump, vUv);
        if (clump.a < 0.5) discard;
        // The clump carries its own light and shade; the crown adds warm
        // evening light above and shadow within.
        vec3 col = clump.rgb * mix(vec3(0.5, 0.5, 0.52), vec3(1.22, 1.02, 0.74), vShade);
        vec3 albedo = clump.rgb;
        // The low sun shines through the thin edges of the crown.
        float through = pow(max(dot(normalize(cameraPosition - vWorld), -uSunDir) * 0.5 + 0.5, 0.0), 4.0);
        col += albedo * vec3(1.0, 0.72, 0.34) * through * vShade * 0.6;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const needles = new THREE.Mesh(foliage, needleMaterial);
  needles.frustumCulled = false;
  const woodMesh = new THREE.Mesh(wood, woodMaterial);
  woodMesh.frustumCulled = false;
  const group = new THREE.Group();
  group.add(woodMesh, needles);
  return { group, materials: [woodMaterial, needleMaterial], textures: [clumpTexture] };
}
