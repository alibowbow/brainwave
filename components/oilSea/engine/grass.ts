import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, coastDistance, fbm2, headlandFall, terrainHeight } from './world';

/**
 * A tuft of long grass drawn once on a canvas: blades rising from dark
 * roots and bending over to the left under the wind, olive low down, dry
 * gold towards their tips.
 */
function drawTuft(size: number, seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = 0; i < 120; i++) {
    const x0 = size * (0.3 + 0.62 * rand());
    const height = size * (0.4 + 0.58 * Math.pow(rand(), 0.6));
    const lean = size * (0.1 + 0.3 * rand()) * (height / size);
    const width = size * (0.007 + 0.012 * rand());
    const warm = rand();
    const green = rand() < 0.3 ? 1 : 0;
    const gradient = g.createLinearGradient(0, size, 0, size - height);
    gradient.addColorStop(0, `rgb(${30 + warm * 14}, ${34 + warm * 10}, 16)`);
    gradient.addColorStop(0.45, `rgb(${Math.round(92 + warm * 50 - green * 30)}, ${Math.round(86 + warm * 28 + green * 14)}, ${38 + warm * 12})`);
    gradient.addColorStop(1, `rgb(${Math.round(196 + warm * 50 - green * 56)}, ${Math.round(150 + warm * 44 - green * 8)}, ${Math.round(70 + warm * 36 - green * 10)})`);
    g.fillStyle = gradient;
    // A tapering blade that bends over to the left.
    const tipX = x0 - lean;
    const tipY = size - height;
    g.beginPath();
    g.moveTo(x0 - width, size);
    g.quadraticCurveTo(x0 - width * 0.6, size - height * 0.62, tipX, tipY);
    g.quadraticCurveTo(x0 + width * 0.4, size - height * 0.62, x0 + width, size);
    g.closePath();
    g.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Long grass on the headland, in clumps: each clump a few cards of the drawn
 * tuft turned to the viewer, bent over by the wind and stirring in it, olive
 * or gold or pale and dry from one clump to the next, the ground showing
 * dark between them. The low sun shines through the tips.
 */
export function createGrass(sunDirection: THREE.Vector3, count: number) {
  const texture = drawTuft(256, 7);
  const card = new THREE.PlaneGeometry(1, 1, 1, 3);
  card.translate(0, 0.5, 0);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tTuft: { value: texture },
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      attribute vec4 aTint;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec4 vTint;
      void main() {
        vUv = uv;
        vTint = aTint;
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
        float bend = uv.y * uv.y;
        float gust = sin(uTime * 1.3 + world.x * 0.15 + world.z * 0.11) * 0.6 + sin(uTime * 2.7 + world.x * 0.4) * 0.25;
        world.xyz -= right * (0.1 + 0.12 * gust) * bend * aTint.w;
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tTuft;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec4 vTint;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 tuft = texture2D(tTuft, vUv);
        if (tuft.a < 0.45) discard;
        vec3 albedo = tuft.rgb * vTint.rgb;
        // Swathes where the low sun comes through, and where it does not.
        albedo *= mix(0.8, 1.22, smoothstep(0.32, 0.6, fbm3(vWorld.xz * 0.03 + 9.0)));
        float through = pow(max(dot(normalize(cameraPosition - vWorld), -uSunDir) * 0.5 + 0.5, 0.0), 3.0);
        vec3 col = lightGround(albedo, vec3(0.0, 1.0, 0.0), 0.85) + albedo * vec3(1.0, 0.84, 0.52) * through * vUv.y * 1.35;
        col *= 0.72 + 0.28 * vUv.y;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.InstancedMesh(card, material, count);
  const tints = new Float32Array(count * 4);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const palette = [
    [1.22, 1.0, 0.7], // gold
    [1.32, 1.12, 0.82], // pale and dry
    [0.9, 0.95, 0.58], // olive
    [0.78, 0.72, 0.5], // dark, in shadow
  ];
  let s = 12345;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  let placed = 0;
  for (let tries = 0; placed < count && tries < count * 4; tries++) {
    // A clump somewhere on the part of the headland in view.
    const distance = 5 + Math.pow(rand(), 0.8) * 175;
    const bearing = -0.05 + rand() * 0.95;
    const cx = Math.sin(bearing) * distance;
    const cz = -Math.cos(bearing) * distance;
    const fall = headlandFall(cx, cz);
    if (fall > 0.85 || coastDistance(cx, cz) > -6) continue;
    // Bare rock breaks through lower down the slopes.
    if (fbm2(cx * 0.05, cz * 0.05, 3) < 0.2 + 0.35 * Math.max(0, fall)) continue;
    // Taller near the viewer, where every tuft shows.
    const near = Math.max(0, 1 - distance / 40);
    const clumpHeight = (0.8 + 0.7 * rand()) * (1 + 1.2 * near);
    const radius = clumpHeight * (0.5 + 0.6 * rand());
    const kind = fbm2(cx * 0.06 + 3.0, cz * 0.06, 3) + (rand() - 0.5) * 0.25;
    // Pockets in the shade of the slope and the scrub.
    const pocket = fbm2(cx * 0.035 + 7.0, cz * 0.035, 3) < 0.37;
    const tint = pocket ? palette[3] : kind < 0.33 ? palette[2] : kind < 0.56 ? palette[0] : kind < 0.66 ? palette[1] : palette[rand() < 0.7 ? 0 : 3];
    const cards = 3 + Math.floor(rand() * 4);
    for (let c = 0; c < cards && placed < count; c++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * radius;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      position.set(x, terrainHeight(x, z) - 0.05, z);
      // Turned to the viewer, give or take.
      quaternion.setFromAxisAngle(up, Math.atan2(CAMERA.x - x, CAMERA.z - z) + (rand() - 0.5) * 1.1);
      const height = clumpHeight * (0.7 + 0.5 * rand());
      scale.set(height * (1.1 + 0.5 * rand()), height, 1);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(placed, matrix);
      const shade = (pocket ? 0.72 : 0.84) + 0.28 * rand();
      tints.set([tint[0] * shade, tint[1] * shade, tint[2] * shade, height], placed * 4);
      placed++;
    }
  }
  card.setAttribute('aTint', new THREE.InstancedBufferAttribute(tints, 4));
  mesh.count = placed;
  mesh.frustumCulled = false;
  return { mesh, material, texture };
}

/** A bush drawn once on a canvas: a mound of small leaves, dark inside, lit along its top. */
function drawBush(size: number, seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = 0; i < 1600; i++) {
    // Points in a mound: a half-ellipse sitting on the bottom edge.
    const a = Math.PI * (0.02 + 0.96 * rand());
    const r = Math.sqrt(rand());
    const x = size * (0.5 + Math.cos(a) * r * 0.46);
    const y = size * (1 - Math.sin(a) * r * 0.8);
    const top = Math.sin(a) * r;
    const light = Math.min(1, 0.08 + 0.9 * Math.pow(top, 1.6) * rand() + 0.12 * rand());
    const red = Math.round(26 + light * 120);
    const green = Math.round(36 + light * 112);
    const blue = Math.round(14 + light * 38);
    g.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    g.beginPath();
    g.ellipse(x, y, size * (0.008 + 0.012 * rand()), size * (0.005 + 0.007 * rand()), rand() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/** Dark scrub in clumps among the grass: crossed cards of the drawn bush, stirring in the wind. */
export function createShrubs(sunDirection: THREE.Vector3, count: number) {
  const texture = drawBush(256, 17);
  const card = new THREE.PlaneGeometry(1, 1, 1, 2);
  card.translate(0, 0.5, 0);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tBush: { value: texture },
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float gust = sin(uTime * 1.1 + world.x * 0.12 + world.z * 0.09);
        world.x -= 0.06 * gust * uv.y;
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tBush;
      varying vec2 vUv;
      varying vec3 vWorld;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 bush = texture2D(tBush, vUv);
        if (bush.a < 0.5) discard;
        vec3 albedo = bush.rgb * mix(vec3(0.85, 0.95, 0.75), vec3(1.1, 0.95, 0.7), vnoise(vWorld.xz * 0.2));
        float through = pow(max(dot(normalize(cameraPosition - vWorld), -uSunDir) * 0.5 + 0.5, 0.0), 3.0);
        vec3 col = lightGround(albedo, normalize(vec3(0.0, 1.0, 0.0) + (vUv.x - 0.5) * vec3(1.0, 0.0, 0.0)), 0.5 + 0.5 * vUv.y);
        col += albedo * vec3(1.0, 0.7, 0.35) * through * vUv.y * 0.8;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.InstancedMesh(card, material, count * 2);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  let s = 4242;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  let placed = 0;
  for (let tries = 0; placed < count * 2 && tries < count * 40; tries++) {
    const distance = 10 + Math.pow(rand(), 0.8) * 190;
    const bearing = -0.1 + rand() * 1.05;
    const x = Math.sin(bearing) * distance;
    const z = -Math.cos(bearing) * distance;
    if (headlandFall(x, z) > 0.8 || coastDistance(x, z) > -6) continue;
    // In clumps.
    if (fbm2(x * 0.045 + 11.0, z * 0.045, 3) < 0.4) continue;
    const width = 2 + rand() * 3;
    const height = width * (0.45 + 0.3 * rand());
    position.set(x, terrainHeight(x, z) - 0.15, z);
    const turn = rand() * Math.PI;
    for (let k = 0; k < 2; k++) {
      quaternion.setFromAxisAngle(up, turn + (k * Math.PI) / 2);
      scale.set(width, height, 1);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(placed++, matrix);
    }
  }
  mesh.count = placed;
  mesh.frustumCulled = false;
  return { mesh, material, texture };
}
