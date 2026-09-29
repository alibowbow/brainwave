import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';
import { coastDistance, fbm2, headlandFall, terrainHeight } from './world';

/** A tuft of dry grass drawn once on a canvas: blades from olive roots to sunlit golden tips. */
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
  for (let i = 0; i < 140; i++) {
    const x0 = size * (0.1 + 0.8 * rand());
    const height = size * (0.35 + 0.62 * rand());
    const lean = (rand() - 0.15) * size * 0.4;
    const width = size * (0.006 + 0.012 * rand());
    const warm = rand();
    const green = rand() < 0.3 ? 1 : 0;
    const gradient = g.createLinearGradient(0, size, 0, size - height);
    gradient.addColorStop(0, `rgba(${34 + warm * 16}, ${38 + warm * 12}, 18, 1)`);
    gradient.addColorStop(0.5, `rgba(${Math.round(95 + warm * 45 - green * 30)}, ${Math.round(88 + warm * 25 + green * 10)}, ${40 + warm * 10}, 1)`);
    gradient.addColorStop(1, `rgba(${Math.round(200 + warm * 45 - green * 50)}, ${Math.round(150 + warm * 42 - green * 5)}, ${66 + warm * 34}, 1)`);
    g.strokeStyle = gradient;
    g.lineWidth = width;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x0, size);
    g.quadraticCurveTo(x0 + lean * 0.2, size - height * 0.6, x0 + lean, size - height);
    g.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Grass on the headland: crossed cards of tufts, thick near the viewer,
 * swaying in the wind off the sea and glowing where the low sun shines
 * through the blades.
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
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float bend = uv.y * uv.y;
        float gust = sin(uTime * 1.3 + world.x * 0.15 + world.z * 0.11) * 0.6 + sin(uTime * 2.7 + world.x * 0.4) * 0.25;
        world.x += (0.18 + 0.12 * gust) * bend;
        world.z += 0.05 * gust * bend;
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tTuft;
      varying vec2 vUv;
      varying vec3 vWorld;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 tuft = texture2D(tTuft, vUv);
        if (tuft.a < 0.45) discard;
        float patchy = fbm3(vWorld.xz * 0.05);
        float dark = fbm3(vWorld.xz * 0.018 + 4.0);
        float sunlit = fbm3(vWorld.xz * 0.03 + 9.0);
        vec3 albedo = tuft.rgb * mix(vec3(1.0), vec3(0.66, 0.8, 0.52), smoothstep(0.45, 0.68, patchy) * 0.85);
        albedo *= mix(1.0, 0.58, smoothstep(0.45, 0.62, dark));
        // Swathes where the low sun comes through, and where it does not.
        albedo *= mix(0.78, 1.28, smoothstep(0.32, 0.6, sunlit));
        // The low sun shines through the tips.
        float through = pow(max(dot(normalize(cameraPosition - vWorld), -uSunDir) * 0.5 + 0.5, 0.0), 3.0);
        vec3 col = lightGround(albedo, vec3(0.0, 1.0, 0.0), 0.8) + albedo * vec3(1.0, 0.7, 0.35) * through * vUv.y * 1.2;
        col *= 0.8 + 0.2 * vUv.y;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.InstancedMesh(card, material, count);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  let s = 12345;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  let placed = 0;
  for (let tries = 0; placed < count && tries < count * 8; tries++) {
    // Over the part of the headland the viewer looks across: its face and top, right of the view.
    const distance = 6 + Math.pow(rand(), 0.85) * 170;
    const bearing = -0.05 + rand() * 0.95;
    const x = Math.sin(bearing) * distance;
    const z = -Math.cos(bearing) * distance;
    const fall = headlandFall(x, z);
    if (fall > 0.85 || coastDistance(x, z) > -6) continue;
    // Bare rock breaks through lower down the slopes.
    if (fbm2(x * 0.05, z * 0.05, 3) < 0.2 + 0.35 * Math.max(0, fall)) continue;
    if (fbm2(x * 0.08, z * 0.08, 3) < 0.26) continue;
    const y = terrainHeight(x, z);
    position.set(x, y - 0.05, z);
    quaternion.setFromAxisAngle(up, rand() * Math.PI);
    const size = 0.9 + Math.pow(rand(), 2) * 1.2;
    scale.set(size * 1.4, size * (0.7 + rand() * 0.55), 1);
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(placed++, matrix);
  }
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
