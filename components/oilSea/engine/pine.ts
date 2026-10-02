import * as THREE from 'three';
import { Raster } from './raster';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { LIGHT_GLSL } from './terrain';
import { terrainHeight } from './world';

/** Where the pine stands on the headland, in the right foreground. */
export const PINE_BASE = { x: 20.6, z: -24.5 };

interface Limb {
  points: THREE.Vector3[];
  radii: number[];
  /** How far along the tree's wood the limb starts (for its bark to run on from its parent's). */
  along?: number;
}

/**
 * A tapering tube along a path (rings of `sides` vertices), closed at its far
 * end with a little dome. Each vertex also carries where it lies on the bark:
 * how far round the limb, how far along it, and the limb's radius there.
 */
function tube(limb: Limb, sides: number, positions: number[], normals: number[], bark: number[], indices: number[]) {
  const { points, radii } = limb;
  const start = positions.length / 3;
  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const helper = new THREE.Vector3(0, 0, 1);
  let along = limb.along ?? 0;
  for (let i = 0; i < points.length; i++) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    if (i > 0) along += points[i].distanceTo(points[i - 1]);
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
      bark.push(s / sides, along, radii[i]);
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
  // The rounded end, so no limb shows as a cut pipe.
  const last = points.length - 1;
  const end = points[last].clone().addScaledVector(tangent, radii[last] * 0.7);
  const tip = positions.length / 3;
  positions.push(end.x, end.y, end.z);
  normals.push(tangent.x, tangent.y, tangent.z);
  bark.push(0, along + radii[last] * 0.7, radii[last] * 0.5);
  const ring = start + last * sides;
  for (let s = 0; s < sides; s++) indices.push(ring + s, tip, ring + ((s + 1) % sides));
}

/** How many clumps of needles the foliage atlas holds. */
const CLUMP_KINDS = 3;

/**
 * Clumps of pine foliage drawn once, side by side: feathery tufts of needles
 * heaped into a soft mass, lit along its top and sunward (left) edge, dark
 * green underneath; each clump a little different in shape.
 */
function drawClumps(size: number) {
  const image = new Raster(size * CLUMP_KINDS, size);
  let s = 99;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let kind = 0; kind < CLUMP_KINDS; kind++) {
    const x0 = kind * size;
    // Wider or rounder masses, a little lopsided.
    const wide = [0.38, 0.33, 0.36][kind];
    const tall = [0.22, 0.27, 0.24][kind];
    const tufts: { x: number; y: number }[] = [];
    for (let i = 0; i < 72; i++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      tufts.push({ x: 0.5 + Math.cos(a) * r * wide + (kind - 1) * 0.02 * Math.sin(a * 2), y: 0.56 + Math.sin(a) * r * tall });
    }
    // Lower tufts first, so the lit ones above overlap them.
    tufts.sort((a, b) => b.y - a.y);
    for (const tuft of tufts) {
      const light = Math.min(1, Math.max(0, 0.25 + (0.6 - tuft.y) * 2.2 + (0.5 - tuft.x) * 0.6 + (rand() - 0.5) * 0.3));
      for (let k = 0; k < 36; k++) {
        // Needles fan out from the tuft, mostly upwards and outwards, curving a little.
        const angle = -Math.PI / 2 + (rand() - 0.5) * 2.8;
        const length = size * (0.025 + 0.055 * rand());
        const px = x0 + (tuft.x + (rand() - 0.5) * 0.03) * size;
        const py = (tuft.y + (rand() - 0.5) * 0.02) * size;
        const tip = Math.min(1, light * (0.55 + 0.6 * rand()));
        const width = size * (0.003 + 0.003 * rand());
        const mx = px + Math.cos(angle) * length * 0.5 - size * 0.006;
        const my = py + Math.sin(angle) * length * 0.5;
        const r = 14 + tip * 104;
        const g = 34 + tip * 150;
        const b = 16 + tip * 56;
        image.stroke(px, py, mx, my, width, width, r, g, b);
        image.stroke(mx, my, px + Math.cos(angle) * length, py + Math.sin(angle) * length, width, width * 0.6, r, g, b);
      }
    }
  }
  image.bleed();
  return image.texture();
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
  // The finer details (twigs, roots, which clump of needles goes where) draw
  // on their own numbers, so they leave the tree's shape as it was.
  let d = 4096;
  const detail = () => {
    d = (d * 1664525 + 1013904223) >>> 0;
    return d / 4294967296;
  };
  const baseY = terrainHeight(PINE_BASE.x, PINE_BASE.z) - 0.4;
  const base = new THREE.Vector3(PINE_BASE.x, baseY, PINE_BASE.z);
  const limbs: Limb[] = [];
  const pads: Pad[] = [];
  // Seaward, as seen from the viewer: to the left of the picture.
  const seaward = new THREE.Vector3(-0.97, 0, -0.24).normalize();
  const jitter = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  const grow = (start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, depth: number, lift: number, along = 0) => {
    const limb: Limb = { points: [start.clone()], radii: [radius], along };
    const dir = direction.clone().normalize();
    const point = start.clone();
    const segments = depth === 0 ? 9 : 6;
    // A limb that forks narrows to its forks' width, so the wood runs on
    // unbroken; one that ends in needles thins to a twig.
    const forking = depth < 3 && length >= 1.4;
    const end = forking ? radius * 0.62 : Math.max(0.02, radius * 0.16);
    for (let i = 1; i <= segments; i++) {
      // Crooked: every segment turns a little; the wind pushes seaward, the light pulls up.
      jitter.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(depth === 0 ? 0.35 : 0.6);
      dir.add(jitter).addScaledVector(seaward, 0.1).addScaledVector(up, lift).normalize();
      point.addScaledVector(dir, length / segments);
      limb.points.push(point.clone());
      const t = i / segments;
      limb.radii.push(radius + (end - radius) * (forking ? t : Math.sqrt(t)));
    }
    limbs.push(limb);
    const tip = limb.points[segments];
    const reach = along + length;
    if (!forking) {
      pads.push({ at: tip.clone(), size: 0.9 + 0.7 * rand() + 0.15 * length, heading: dir.clone() });
      // Twigs spread from the tip into the needles, showing through the gaps.
      for (let k = 0; k < 3; k++) {
        const out = new THREE.Vector3(detail() - 0.5, 0.25 * (detail() - 0.3), detail() - 0.5).normalize();
        const twig: Limb = { points: [tip.clone()], radii: [end * 0.9], along: reach };
        const twigLength = 0.45 + 0.6 * detail();
        for (let i = 1; i <= 3; i++) {
          twig.points.push(tip.clone().addScaledVector(out, (twigLength * i) / 3).addScaledVector(up, 0.05 * i * i * (detail() - 0.4)));
          twig.radii.push(Math.max(0.012, end * 0.9 * (1 - (0.75 * i) / 3)));
        }
        limbs.push(twig);
      }
      return;
    }
    // Forks at the end (starting a little back inside it, so the join is
    // hidden), and a side branch or two along the way.
    const forkAt = tip.clone().addScaledVector(dir, -end * 0.8);
    for (let k = 0; k < 2; k++) {
      const turn = new THREE.Vector3(rand() - 0.5, (rand() - 0.3) * 0.8, rand() - 0.5).multiplyScalar(1.3);
      const child = dir.clone().add(turn).addScaledVector(seaward, 0.35).normalize();
      grow(forkAt, child, length * (0.55 + 0.2 * rand()), end, depth + 1, lift * 0.6, reach);
    }
    const sides = depth === 1 ? 2 : 1;
    for (let k = 0; k < sides; k++) {
      const u = 3 + Math.floor(rand() * (segments - 3));
      const from = limb.points[u];
      const child = new THREE.Vector3(rand() - 0.5, 0.1 + 0.3 * rand(), rand() - 0.5).multiplyScalar(1.4).add(seaward).normalize();
      grow(from, child, length * (0.4 + 0.2 * rand()), limb.radii[u] * 0.55, depth + 2, 0.02, along + (length * u) / segments);
    }
  };

  // The trunk leans seaward, flaring where it grips the ground, and forks
  // into a few great limbs: one climbing, one sweeping far out over the
  // slope, one low; smaller branches from them.
  const trunk: Limb = { points: [], radii: [] };
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    trunk.points.push(new THREE.Vector3(
      base.x - 1.6 * t - 1.8 * t * t + 0.25 * Math.sin(t * 7),
      base.y + 6.2 * t,
      base.z - 0.4 * t + 0.3 * Math.sin(t * 4),
    ));
    trunk.radii.push(0.6 - 0.24 * t + 0.4 * Math.pow(1 - t, 7));
  }
  limbs.push(trunk);
  const fork = trunk.points[12];
  grow(fork, new THREE.Vector3(-0.5, 0.85, 0.05), 5.6, 0.34, 1, 0.08, 6.4);
  grow(fork, new THREE.Vector3(-0.95, 0.22, 0.12), 7.4, 0.3, 1, 0.04, 6.4);
  grow(fork, new THREE.Vector3(0.1, 1, -0.15), 4.2, 0.26, 1, 0.1, 6.4);
  grow(trunk.points[6], new THREE.Vector3(-0.85, 0.12, 0.45), 5.6, 0.22, 1, 0.03, 3.2);
  // Roots gripping the headland, spreading out from the foot of the trunk.
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2 + detail() * 0.8;
    const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const root: Limb = { points: [], radii: [] };
    for (let i = 0; i <= 3; i++) {
      const at = base.clone().addScaledVector(out, 0.3 + 0.55 * i * (0.8 + 0.4 * detail()));
      at.y = terrainHeight(at.x, at.z) + 0.12 - 0.08 * i + (i === 0 ? 0.35 : 0);
      root.points.push(at);
      root.radii.push(0.3 * (1 - 0.28 * i));
    }
    limbs.push(root);
  }

  const positions: number[] = [];
  const normals: number[] = [];
  const bark: number[] = [];
  const indices: number[] = [];
  limbs.forEach((limb, i) => tube(limb, i === 0 ? 12 : limb.radii[0] > 0.12 ? 8 : 5, positions, normals, bark, indices));
  const wood = new THREE.BufferGeometry();
  wood.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  wood.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  wood.setAttribute('aBark', new THREE.Float32BufferAttribute(bark, 3));
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
      attribute vec3 aBark;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vBark;
      varying float vSunlit;
      ${NOISE_GLSL}
      ${CLOUD_SHADOW_GLSL}
      void main() {
        vec3 p = swayed(position);
        vSunlit = cloudSun(uBase);
        vWorld = p;
        vNormal = normal;
        vBark = aBark;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vBark;
      varying float vSunlit;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      // Pine bark: plates longer than they are wide, split by deep cracks
      // (the distance to a plate's edge, and which plate it is).
      vec2 plates(vec2 q) {
        vec2 i = floor(q);
        vec2 f = fract(q);
        float d1 = 8.0;
        float d2 = 8.0;
        float id = 0.0;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 g = vec2(float(x), float(y));
            vec2 o = g + hash22(i + g) - f;
            float d = dot(o, o);
            if (d < d1) { d2 = d1; d1 = d; id = hash12(i + g); } else if (d < d2) { d2 = d; }
          }
        }
        return vec2(sqrt(d2) - sqrt(d1), id);
      }
      void main() {
        vec3 n = normalize(vNormal);
        // On the bark itself, in metres: round the limb and along it.
        vec2 surface = vec2(vBark.x * 6.2832 * max(vBark.z, 0.05), vBark.y);
        vec2 plate = plates(surface / vec2(0.1, 0.34) + vec2(vnoise(surface * vec2(2.0, 0.7)) * 0.9, vnoise(surface * 3.0) * 0.5));
        // Old wood is deeply fissured; young limbs and twigs are smoother.
        float old = smoothstep(0.06, 0.3, vBark.z);
        float crack = (1.0 - smoothstep(0.02, 0.12, plate.x)) * old;
        // Plates grey-brown to a warm red-brown where the outer bark has flaked.
        vec3 albedo = mix(vec3(0.4, 0.31, 0.25), vec3(0.58, 0.39, 0.27), smoothstep(0.35, 0.95, plate.y) * old);
        albedo *= 0.88 + 0.24 * vnoise(surface * vec2(8.0, 2.5));
        albedo = mix(albedo, vec3(0.16, 0.12, 0.1), crack * 0.6);
        // Grey-green lichen on the upper sides of the old wood.
        float lichen = smoothstep(0.6, 0.78, fbm3(surface * 1.7 + 4.0)) * smoothstep(0.1, 0.6, n.y) * smoothstep(0.08, 0.2, vBark.z);
        albedo = mix(albedo, vec3(0.56, 0.6, 0.5), lichen * 0.7);
        // Undersides and the cracks' depths get little of the sky.
        float open = (0.55 + 0.45 * smoothstep(-0.7, 0.6, n.y)) * (1.0 - 0.25 * crack);
        vec3 col = lightGround(albedo, n, vSunlit) * 1.15 * open;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });

  // Foliage: at each branch tip a few clumps, drawn as soft masses facing the viewer.
  const clumpTexture = drawClumps(384);
  const quad = new THREE.PlaneGeometry(1, 1);
  const foliage = new THREE.InstancedBufferGeometry();
  foliage.index = quad.index;
  foliage.setAttribute('position', quad.getAttribute('position'));
  foliage.setAttribute('uv', quad.getAttribute('uv'));
  const clumpsPerPad = 4;
  const clumpData = new Float32Array(pads.length * clumpsPerPad * 4);
  const shadeData = new Float32Array(pads.length * clumpsPerPad * 4);
  const top = Math.max(...pads.map((pad) => pad.at.y));
  let n = 0;
  for (const pad of pads) {
    // Higher, outer pads are in the sun; low, inner ones in the crown's shade.
    const lit = Math.min(1, Math.max(0, 0.4 + 0.6 * (1 - (top - pad.at.y) / 11)));
    for (let c = 0; c < clumpsPerPad; c++) {
      const spread = pad.size * 0.8;
      const x = pad.at.x + (rand() - 0.5) * spread * 1.6;
      const rise = rand() - 0.4;
      const z = pad.at.z + (rand() - 0.5) * spread * 1.6;
      clumpData.set([x, pad.at.y + rise * spread * 0.45, z, pad.size * (0.75 + 0.5 * rand())], n * 4);
      shadeData.set([
        // The underside of a pad is in its own shade.
        lit * (0.85 + 0.15 * rand()) * (0.8 + 0.2 * Math.min(1, Math.max(0, rise * 2 + 0.6))),
        (rand() - 0.5) * 0.5,
        // Which clump (and a half if it is mirrored); its green, fresh yellow to old blue.
        Math.floor(detail() * CLUMP_KINDS) + (detail() < 0.5 ? 0.5 : 0),
        detail(),
      ], n * 4);
      n++;
    }
  }
  foliage.setAttribute('aClump', new THREE.InstancedBufferAttribute(clumpData, 4));
  foliage.setAttribute('aShade', new THREE.InstancedBufferAttribute(shadeData, 4));
  foliage.instanceCount = n;
  const needleMaterial = new THREE.ShaderMaterial({
    uniforms: { ...uniforms(), tClump: { value: clumpTexture } },
    vertexShader: /* glsl */ `
      ${sway}
      attribute vec4 aClump;
      attribute vec4 aShade;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vShade;
      varying float vHue;
      varying float vShadow;
      ${NOISE_GLSL}
      ${CLOUD_SHADOW_GLSL}
      void main() {
        vShadow = cloudShadow(uBase);
        float kind = floor(aShade.z);
        vUv = vec2((kind + (fract(aShade.z) > 0.25 ? 1.0 - uv.x : uv.x)) / ${CLUMP_KINDS.toFixed(1)}, uv.y);
        vHue = aShade.w;
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
      varying float vHue;
      varying float vShadow;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 clump = texture2D(tClump, vUv);
        if (clump.a < 0.5) discard;
        // The clump carries its own light and shade; the crown adds
        // sunlight above and shadow within. Each clump its own green:
        // old needles blue-green, fresh shoots yellower.
        vec3 col = clump.rgb * mix(vec3(0.56, 0.64, 0.66), vec3(1.18, 1.14, 0.96), vShade);
        col *= mix(vec3(0.9, 1.0, 1.1), vec3(1.1, 1.05, 0.84), vHue);
        vec3 albedo = clump.rgb;
        // The sun shines through the thin edges of the crown.
        float through = pow(max(dot(normalize(cameraPosition - vWorld), -uSunDir) * 0.5 + 0.5, 0.0), 4.0);
        col += albedo * vec3(0.7, 0.95, 0.45) * through * vShade * 0.4 * (1.0 - vShadow);
        col *= mix(vec3(1.0), vec3(0.6, 0.66, 0.8), vShadow);
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
