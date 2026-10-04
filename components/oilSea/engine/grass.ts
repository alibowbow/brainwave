import * as THREE from 'three';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { bleed, Raster } from './raster';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, coastDistance, fbm2, headlandFall, terrainHeight } from './world';

/** How many kinds of tuft the atlas holds (each plain, and in flower beside it). */
const TUFT_KINDS = 3;

/**
 * Tufts of long grass drawn once on a canvas, side by side: blades rising
 * from dark roots and bending over to the left under the wind, deep green
 * low down, fresh yellow-green towards their tips. Three kinds of tuft:
 * fine blades; broad blades arching over, each with a paler midrib; and
 * fine blades with tall stems gone to seed, their heads nodding. Beside
 * each tuft the same one in flower: small heads on the taller stems, each
 * a ring of petals round its centre, tipped towards the viewer or seen
 * edge on. The petals are drawn in white and the centres in magenta, for
 * the shader to colour as daisies, buttercups, poppies, cornflowers or
 * thrift (grass never has much blue in it, so the blue channel tells flower
 * from blade, even blurred at a distance, and blue over green tells a
 * centre from its petals).
 */
function drawTufts(size: number) {
  const tiles = TUFT_KINDS * 2;
  const canvas = document.createElement('canvas');
  canvas.width = size * tiles;
  canvas.height = size;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  if (!g) throw new Error('2D canvas unavailable');
  let s = 7;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let kind = 0; kind < TUFT_KINDS; kind++) {
    const left = kind * 2 * size;
    const broad = kind === 1;
    const seeding = kind === 2;
    const tips: { x: number; y: number }[] = [];
    const count = broad ? 96 : 130;
    for (let i = 0; i < count; i++) {
      const x0 = size * (0.3 + 0.62 * rand());
      const height = size * (0.4 + 0.56 * Math.pow(rand(), 0.6));
      const lean = size * (broad ? 0.16 + 0.34 * rand() : 0.1 + 0.3 * rand()) * (height / size);
      const width = size * (broad ? 0.009 + 0.011 * rand() : 0.005 + 0.008 * rand());
      const warm = rand();
      const green = rand() < 0.3 ? 1 : 0;
      const gradient = g.createLinearGradient(0, size, 0, size - height);
      gradient.addColorStop(0, `rgb(${18 + warm * 10}, ${34 + warm * 10}, 14)`);
      gradient.addColorStop(0.45, `rgb(${Math.round(58 + warm * 30 - green * 16)}, ${Math.round(92 + warm * 24 + green * 8)}, ${Math.round(34 + warm * 10 + green * 10)})`);
      gradient.addColorStop(1, `rgb(${Math.round(136 + warm * 54 - green * 40)}, ${Math.round(164 + warm * 30)}, ${Math.round(78 + warm * 24 + green * 12)})`);
      // A tapering blade that bends over to the left, in both tiles.
      const tipX = x0 - lean;
      const tipY = size - height;
      for (const offset of [left, left + size]) {
        g.fillStyle = gradient;
        g.beginPath();
        g.moveTo(offset + x0 - width, size);
        g.quadraticCurveTo(offset + x0 - width * 0.6, size - height * 0.62, offset + tipX, tipY);
        g.quadraticCurveTo(offset + x0 + width * 0.4, size - height * 0.62, offset + x0 + width, size);
        g.closePath();
        g.fill();
        if (broad && width > size * 0.013) {
          // The pale midrib of a broad blade, catching the light.
          g.strokeStyle = `rgba(${Math.round(170 + warm * 40)}, ${Math.round(190 + warm * 20)}, ${Math.round(100 + warm * 20)}, 0.55)`;
          g.lineWidth = width * 0.25;
          g.beginPath();
          g.moveTo(offset + x0, size - height * 0.15);
          g.quadraticCurveTo(offset + x0 - width * 0.1, size - height * 0.62, offset + tipX, tipY);
          g.stroke();
        }
      }
      if (height > size * 0.55) tips.push({ x: tipX, y: tipY });
    }
    if (seeding) {
      // Tall stems gone to seed: a loose, nodding head of spikelets on each, in both tiles.
      for (let i = 0; i < 14; i++) {
        const x0 = size * (0.32 + 0.56 * rand());
        const height = size * (0.84 + 0.14 * rand());
        const lean = size * (0.14 + 0.2 * rand());
        const tipX = x0 - lean;
        const tipY = size - height;
        const straw = rand();
        for (const offset of [left, left + size]) {
          g.strokeStyle = `rgb(${Math.round(150 + straw * 40)}, ${Math.round(150 + straw * 30)}, ${Math.round(70 + straw * 20)})`;
          g.lineWidth = size * 0.004;
          g.beginPath();
          g.moveTo(offset + x0, size);
          g.quadraticCurveTo(offset + x0 - lean * 0.2, size - height * 0.6, offset + tipX, tipY);
          g.stroke();
          g.fillStyle = `rgb(${Math.round(180 + straw * 30)}, ${Math.round(176 + straw * 24)}, ${Math.round(92 + straw * 14)})`;
          const spikelets = 7 + Math.floor(rand() * 5);
          for (let k = 0; k < spikelets; k++) {
            const t = k / spikelets;
            const sx = offset + tipX + (t - 0.2) * lean * 0.5 - size * 0.012 * t;
            const sy = tipY + t * size * 0.1 + size * 0.004 * Math.sin(k * 2.1);
            g.beginPath();
            g.ellipse(sx + (rand() - 0.5) * size * 0.01, sy, size * (0.006 + 0.004 * rand()), size * 0.0035, (rand() - 0.5) * 1.2, 0, Math.PI * 2);
            g.fill();
          }
        }
      }
    }
    // Flower heads on the taller stems of the flowering tile, a few of them still in bud.
    for (const tip of tips.slice(0, 12)) {
      const r = size * (0.024 + 0.016 * rand());
      const cx = left + size + Math.max(r * 2, tip.x);
      const cy = Math.max(r * 2, tip.y + r * 0.2);
      if (rand() < 0.2) {
        g.fillStyle = 'rgb(255, 255, 255)';
        g.beginPath();
        g.ellipse(cx, cy, r * 0.45, r * 0.6, 0, 0, Math.PI * 2);
        g.fill();
        continue;
      }
      // Tipped towards the viewer (1) or seen nearly edge on, and turned a little.
      const tilt = 0.3 + 0.7 * rand();
      const turn = (rand() - 0.5) * 0.9;
      const cos = Math.cos(turn);
      const sin = Math.sin(turn);
      const petals = 11 + Math.floor(rand() * 5);
      g.fillStyle = 'rgb(255, 255, 255)';
      for (let k = 0; k < petals; k++) {
        const a = ((k + 0.3 * rand()) / petals) * Math.PI * 2;
        const px = Math.cos(a) * r * 0.55;
        const py = Math.sin(a) * r * 0.55 * tilt;
        g.beginPath();
        g.ellipse(cx + px * cos - py * sin, cy + px * sin + py * cos, r * 0.5, r * 0.2, Math.atan2(Math.sin(a) * tilt, Math.cos(a)) + turn, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = 'rgb(255, 0, 255)';
      g.beginPath();
      g.ellipse(cx, cy, r * 0.32, r * 0.32 * Math.max(0.5, tilt), turn, 0, Math.PI * 2);
      g.fill();
    }
  }
  // Give the empty pixels the colour beside them, so the blades and flowers
  // keep their colour when the texture is shrunk instead of darkening.
  const width = size * tiles;
  const data = new Uint8Array(g.getImageData(0, 0, width, size).data.buffer);
  const flipped = new Uint8Array(data.length);
  const row = width * 4;
  for (let y = 0; y < size; y++) flipped.set(data.subarray(y * row, (y + 1) * row), (size - 1 - y) * row);
  bleed(flipped, width, size);
  const texture = new THREE.DataTexture(flipped, width, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.NoColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Gusts sweeping over the headland: bands of stronger wind, broad across
 * the wind and narrow along it, travelling with it (the way the grass is
 * blown, to the left of the view). 0 in the steady breeze, up to 1 in the
 * heart of a gust. Needs NOISE_GLSL and uTime; right is the view's right.
 */
const GUST_GLSL = /* glsl */ `
float gustAt(vec2 p, vec3 right) {
  vec2 wind = -normalize(right.xz);
  vec2 at = p - wind * uTime * 7.0;
  return smoothstep(0.5, 0.82, vnoise(vec2(dot(at, wind) * 0.07, dot(at, vec2(-wind.y, wind.x)) * 0.03)));
}
`;

/**
 * Long grass on the headland, in clumps: each clump a few cards of the drawn
 * tuft turned to the viewer, bent over by the wind and stirring in it, fresh
 * or deep or sunny green from one clump to the next, shaded in pockets, with
 * drifts of wild flowers. The sun shines through the tips.
 */
export function createGrass(sunDirection: THREE.Vector3, count: number) {
  const texture = drawTufts(512);
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
      attribute vec4 aTint;
      attribute vec2 aBloom;
      varying vec2 vUv;
      varying vec4 vTint;
      varying float vKind;
      varying float vSunlit;
      varying float vSweep;
      varying vec3 vLight;
      varying float vThrough;
      varying vec4 vHaze;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      ${CLOUD_SHADOW_GLSL}
      ${GUST_GLSL}
      void main() {
        vUv = vec2((aBloom.y + uv.x) / ${(TUFT_KINDS * 2).toFixed(1)}, uv.y);
        vKind = aBloom.x;
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
        float bend = uv.y * uv.y;
        float gust = sin(uTime * 1.3 + world.x * 0.15 + world.z * 0.11) * 0.6 + sin(uTime * 2.7 + world.x * 0.4) * 0.25;
        // Now and then a gust sweeps over, bending the blades further and flatter.
        float sweep = gustAt(world.xz, right);
        world.xyz -= right * (0.1 + 0.12 * gust + 0.3 * sweep) * bend * aTint.w;
        world.y -= 0.12 * sweep * bend * aTint.w;
        vSweep = sweep;
        // Light, air and the swathes of sun hardly change across a card, so
        // they are worked out here rather than for every pixel of it.
        vSunlit = cloudSun(world.xyz);
        vLight = lightGround(vec3(1.0), vec3(0.0, 1.0, 0.0), 0.85 * vSunlit);
        vThrough = pow(max(dot(normalize(cameraPosition - world.xyz), -uSunDir) * 0.5 + 0.5, 0.0), 3.0) * vSunlit;
        vHaze = hazeAt(world.xyz, cameraPosition);
        // Swathes where the sun comes through, and where it does not.
        vTint = vec4(aTint.rgb * mix(0.8, 1.22, smoothstep(0.32, 0.6, fbm3(world.xz * 0.03 + 9.0))), aTint.w);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tTuft;
      varying vec2 vUv;
      varying vec4 vTint;
      varying float vKind;
      varying float vSunlit;
      varying float vSweep;
      varying vec3 vLight;
      varying float vThrough;
      varying vec4 vHaze;
      // Petals and centre of each kind: daisy, buttercup, poppy, cornflower, thrift.
      vec3 petalColour(float kind) {
        if (kind < 0.5) return vec3(0.97, 0.97, 0.92);
        if (kind < 1.5) return vec3(1.0, 0.82, 0.12);
        if (kind < 2.5) return vec3(0.88, 0.14, 0.07);
        if (kind < 3.5) return vec3(0.36, 0.48, 0.95);
        return vec3(0.95, 0.56, 0.72);
      }
      vec3 centreColour(float kind) {
        if (kind < 0.5) return vec3(1.0, 0.76, 0.1);
        if (kind < 1.5) return vec3(0.9, 0.62, 0.06);
        if (kind < 2.5) return vec3(0.1, 0.07, 0.06);
        if (kind < 3.5) return vec3(0.2, 0.24, 0.62);
        return vec3(0.82, 0.4, 0.58);
      }
      void main() {
        vec4 tuft = texture2D(tTuft, vUv);
        if (tuft.a < 0.45) discard;
        // Where the blades only partly cover a texel (their edges, and the
        // whole tuft seen from afar) the gaps between them are in shadow.
        vec3 albedo = tuft.rgb * vTint.rgb * mix(0.68, 1.0, smoothstep(0.45, 0.95, tuft.a));
        // The sun shines through the tips.
        vec3 col = albedo * vLight + albedo * vec3(0.8, 1.0, 0.5) * vThrough * vUv.y * 0.9;
        col *= 0.72 + 0.28 * vUv.y;
        // Laid over by a gust, the blades turn their paler, glossier side up.
        col = mix(col, col * 1.2 + vec3(0.035, 0.045, 0.03) * vSunlit, vSweep * smoothstep(0.15, 0.9, vUv.y));
        // How much of this texel is flower head (the blades have little blue),
        // and how much of that is its centre (blue over green). The flowers
        // catch the sun like the grass, their petals glowing where it shines through.
        float petal = clamp((tuft.b - 0.46) / 0.4, 0.0, 1.0);
        if (petal > 0.0) {
          vec3 flower = mix(petalColour(vKind), centreColour(vKind), smoothstep(0.25, 0.75, tuft.b - tuft.g));
          col = mix(col, flower * (vLight * 0.8 + vThrough * 0.25), petal);
        }
        gl_FragColor = vec4(mix(col, vHaze.rgb, vHaze.a), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.InstancedMesh(card, material, count);
  const tints = new Float32Array(count * 4);
  const blooms = new Float32Array(count * 2);
  // Summer flowers (see petalColour in the shader).
  const DAISY = 0;
  const BUTTERCUP = 1;
  const POPPY = 2;
  const CORNFLOWER = 3;
  const THRIFT = 4;
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const palette = [
    [1.0, 1.0, 0.95], // fresh green
    [1.14, 1.1, 0.8], // sunny yellow-green
    [0.8, 0.92, 0.82], // deep green
    [0.64, 0.72, 0.62], // dark, in shadow
  ];
  let s = 12345;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  let placed = 0;
  for (let tries = 0; placed < count && tries < count * 4; tries++) {
    // A clump somewhere on the part of the headland in view, however far a
    // drag turns it (narrow screens also see more of the slope below).
    const distance = 5 + Math.pow(rand(), 0.8) * 175;
    const bearing = -0.36 + rand() * 1.36;
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
    // Near the viewer every blade shows, so the clumps are fuller there.
    const cards = 3 + Math.floor(rand() * 4) + Math.round(3 * near);
    const roll = rand();
    const kindOfTuft = roll < 0.45 ? 0 : roll < 0.8 ? 1 : 2;
    // Drifts of wild flowers, one kind to a drift.
    const bloom = fbm2(cx * 0.09 + 21.0, cz * 0.09, 3);
    const flowering = rand() < (bloom - 0.36) * 3.5;
    const drift = fbm2(cx * 0.012 + 5.0, cz * 0.012, 2);
    // Pink cushions of thrift along the cliff's edge and down its face.
    const edge = fall > 0.08 && fall < 0.75 && fbm2(cx * 0.05 + 2.0, cz * 0.05 + 8.0, 2) > 0.5;
    const flower = edge ? THRIFT : drift < 0.42 ? DAISY : drift < 0.52 ? BUTTERCUP : drift < 0.6 ? CORNFLOWER : drift < 0.66 ? POPPY : DAISY;
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
      blooms.set([flower, kindOfTuft * 2 + ((flowering || edge) && rand() < (edge ? 0.85 : 0.6) ? 1 : 0)], placed * 2);
      placed++;
    }
  }
  card.setAttribute('aTint', new THREE.InstancedBufferAttribute(tints, 4));
  card.setAttribute('aBloom', new THREE.InstancedBufferAttribute(blooms, 2));
  mesh.count = placed;
  mesh.frustumCulled = false;
  return { mesh, material, texture };
}

/** A bush drawn once: a mound of small leaves, dark inside, lit along its top. */
function drawBush(size: number, seed: number) {
  const image = new Raster(size, size);
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
    image.ellipse(x, y, size * (0.008 + 0.012 * rand()), size * (0.005 + 0.007 * rand()), rand() * Math.PI, 16 + light * 84, 38 + light * 128, 14 + light * 44);
  }
  image.bleed();
  return image.texture();
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
      varying float vSunlit;
      ${NOISE_GLSL}
      ${CLOUD_SHADOW_GLSL}
      ${GUST_GLSL}
      void main() {
        vUv = uv;
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        float gust = sin(uTime * 1.1 + world.x * 0.12 + world.z * 0.09);
        vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
        world.xyz -= right * (0.06 * gust + 0.1 * gustAt(world.xz, right)) * uv.y;
        vWorld = world.xyz;
        vSunlit = cloudSun(world.xyz);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tBush;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying float vSunlit;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec4 bush = texture2D(tBush, vUv);
        if (bush.a < 0.5) discard;
        vec3 albedo = bush.rgb * mix(vec3(0.85, 0.95, 0.85), vec3(1.08, 1.04, 0.86), vnoise(vWorld.xz * 0.2));
        float through = pow(max(dot(normalize(cameraPosition - vWorld), -uSunDir) * 0.5 + 0.5, 0.0), 3.0);
        vec3 col = lightGround(albedo, normalize(vec3(0.0, 1.0, 0.0) + (vUv.x - 0.5) * vec3(1.0, 0.0, 0.0)), (0.5 + 0.5 * vUv.y) * vSunlit);
        col += albedo * vec3(0.8, 1.0, 0.5) * through * vUv.y * 0.6 * vSunlit;
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
    const bearing = -0.4 + rand() * 1.45;
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
