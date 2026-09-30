import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { CAMERA, fbm2, noise2 } from './world';

/** One cloud image in the atlas, in texels. */
const TILE_W = 256;
const TILE_H = 128;
const COLUMNS = 4;
const ROWS = 2;

interface Puff {
  x: number;
  y: number;
  r: number;
}

type Rand = () => number;

/** Puffs heaped on a flat base: a cumulus seen from the side. */
function heap(rand: Rand): { puffs: Puff[]; base: number } {
  const puffs: Puff[] = [];
  const base = 24 + rand() * 8;
  const span = 150 + rand() * 60;
  const x0 = (TILE_W - span) / 2;
  const count = 12 + Math.floor(rand() * 10);
  for (let i = 0; i < count; i++) {
    const u = rand();
    const middle = 1 - Math.pow(2 * u - 1, 2);
    const r = 12 + 30 * middle * (0.55 + 0.45 * rand());
    puffs.push({ x: x0 + u * span, y: base + r * 0.55 + 38 * middle * rand(), r });
  }
  return { puffs, base };
}

/** A long low bank of small puffs: stratocumulus. */
function bank(rand: Rand): { puffs: Puff[]; base: number } {
  const puffs: Puff[] = [];
  const base = 34 + rand() * 10;
  const count = 26 + Math.floor(rand() * 10);
  for (let i = 0; i < count; i++) {
    const u = rand();
    const middle = 1 - Math.pow(2 * u - 1, 2);
    const r = 8 + 14 * (0.4 + 0.6 * middle) * rand();
    puffs.push({ x: 20 + u * (TILE_W - 40), y: base + r * 0.6 + 14 * middle * rand(), r });
  }
  return { puffs, base };
}

/**
 * Bakes the cloud atlas: for every tile a height field (the front surface
 * of the heaped puffs, blended smoothly, flattened at the base, its edges
 * eaten away by noise), stored as the surface normal (rg), the thickness (b)
 * and the coverage (a). The shader lights it for wherever the cloud hangs.
 */
function bakeAtlas() {
  const width = TILE_W * COLUMNS;
  const height = TILE_H * ROWS;
  const data = new Uint8Array(width * height * 4);
  const field = new Float32Array(TILE_W * TILE_H);
  let seed = 7;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let tile = 0; tile < COLUMNS * ROWS; tile++) {
    const { puffs, base } = tile < 5 ? heap(rand) : bank(rand);
    const ox = rand() * 100;
    const oy = rand() * 100;
    let peak = 1;
    for (let y = 0; y < TILE_H; y++) {
      for (let x = 0; x < TILE_W; x++) {
        // Smooth union of the puffs' front surfaces.
        let sum = 0;
        for (const p of puffs) {
          const d2 = (x - p.x) * (x - p.x) + (y - p.y) * (y - p.y);
          if (d2 < p.r * p.r) {
            const h = Math.sqrt(p.r * p.r - d2);
            sum += h * h * h * h;
          }
        }
        let h = Math.pow(sum, 0.25);
        // Cauliflower billows on the surface, ragged edges, a flat base.
        h += 5 * (fbm2(x * 0.06 + ox, y * 0.06 + oy, 3) - 0.5) + 2.5 * (noise2(x * 0.22 + ox, y * 0.22) - 0.5);
        h -= 9 * fbm2(x * 0.025 + oy, y * 0.025 + ox, 3);
        h *= Math.min(1, Math.max(0, (y - base + 3) / 9));
        // Keep a clear margin so neighbouring tiles never bleed together.
        const margin = Math.min(x, TILE_W - 1 - x, y, TILE_H - 1 - y);
        h *= Math.min(1, Math.max(0, (margin - 2) / 10));
        field[y * TILE_W + x] = Math.max(0, h);
        peak = Math.max(peak, h);
      }
    }
    const column = tile % COLUMNS;
    const row = Math.floor(tile / COLUMNS);
    for (let y = 0; y < TILE_H; y++) {
      for (let x = 0; x < TILE_W; x++) {
        const at = (px: number, py: number) => field[Math.min(TILE_H - 1, Math.max(0, py)) * TILE_W + Math.min(TILE_W - 1, Math.max(0, px))];
        const h = at(x, y);
        const dx = (at(x + 1, y) - at(x - 1, y)) * 0.5;
        const dy = (at(x, y + 1) - at(x, y - 1)) * 0.5;
        const length = Math.hypot(dx, dy, 1);
        const i = ((row * TILE_H + y) * width + column * TILE_W + x) * 4;
        data[i] = Math.round((-dx / length * 0.5 + 0.5) * 255);
        data[i + 1] = Math.round((-dy / length * 0.5 + 0.5) * 255);
        data[i + 2] = Math.round(Math.min(1, h / peak) * 255);
        // Soft edges: coverage builds up over the first few texels of thickness.
        data[i + 3] = Math.round(Math.min(1, Math.max(0, h / 7)) * 255);
      }
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.NoColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/** How far the clouds drift across the view, in metres per second at any distance. */
const DRIFT_SPEED = 6;

/*
 * The summer clouds: cloud images hung in a layer over the sea and the
 * land, upright and turned to the viewer. Perspective does the rest: near
 * clouds high and large, far ones small, flattened and crowded along the
 * horizon, where they fade into the haze. Each is lit where it hangs:
 * bright white where the sun strikes it, blue-grey in its own shade.
 */
export function createClouds(sunDirection: THREE.Vector3, count: number) {
  const texture = bakeAtlas();
  let seed = 404;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const forward = new THREE.Vector3(Math.sin(CAMERA.yaw), 0, -Math.cos(CAMERA.yaw));
  const lateral = new THREE.Vector3(-forward.z, 0, forward.x);
  interface Cloud { depth: number; side: number; altitude: number; width: number; height: number; tile: number; flip: number }
  const clouds: Cloud[] = [];
  while (clouds.length < count) {
    // Pick where in the sky it shows, then how far off that puts it
    // (low clouds are far away, over the horizon; high ones close).
    const elevation = 0.005 + Math.pow(rand(), 1.3) * 0.2;
    const depth = Math.min(55000, Math.max(3000, (1500 / Math.tan(elevation)) * (0.7 + 0.6 * rand())));
    const side = (rand() * 2 - 1) * depth;
    // Clouds gather in groups: a big heap with smaller ones beside it.
    const group = 1 + Math.floor(rand() * rand() * 4);
    for (let k = 0; k < group && clouds.length < count; k++) {
      const angular = (0.07 + 1.3 * elevation) * (0.6 + 0.9 * rand()) * (k === 0 ? 1 : 0.55 + 0.3 * rand());
      const width = depth * angular;
      const flatten = 0.4 + 0.6 * Math.min(1, elevation / 0.12);
      const low = elevation < 0.03 && rand() < 0.6;
      const tile = low ? 5 + Math.floor(rand() * 3) : Math.floor(rand() * 5);
      const d = depth * (1 + (k === 0 ? 0 : (rand() - 0.3) * 0.08));
      clouds.push({
        depth: d,
        side: side + (k === 0 ? 0 : (rand() - 0.5) * width * 1.6),
        altitude: d * Math.tan(elevation) + (k === 0 ? 0 : (rand() - 0.6) * width * 0.25),
        width,
        height: width * 0.5 * flatten,
        tile,
        flip: rand() < 0.5 ? -1 : 1,
      });
    }
  }
  // Far to near, so nearer clouds are drawn over farther ones.
  clouds.sort((a, b) => b.depth - a.depth);

  const quad = new THREE.PlaneGeometry(1, 1);
  quad.translate(0, 0.5, 0);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = quad.index;
  geometry.setAttribute('position', quad.getAttribute('position'));
  geometry.setAttribute('uv', quad.getAttribute('uv'));
  const place = new Float32Array(clouds.length * 4);
  const size = new Float32Array(clouds.length * 4);
  clouds.forEach((cloud, i) => {
    place.set([cloud.depth, cloud.side, cloud.altitude, cloud.depth], i * 4);
    const column = cloud.tile % COLUMNS;
    const row = Math.floor(cloud.tile / COLUMNS);
    size.set([cloud.width, cloud.height, cloud.flip, column + row * COLUMNS], i * 4);
  });
  geometry.setAttribute('aPlace', new THREE.InstancedBufferAttribute(place, 4));
  geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(size, 4));
  geometry.instanceCount = clouds.length;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      tClouds: { value: texture },
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uForward: { value: forward },
      uLateral: { value: lateral },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uForward;
      uniform vec3 uLateral;
      attribute vec4 aPlace;
      attribute vec4 aSize;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec3 vRight;
      varying float vFlip;
      varying float vFade;
      void main() {
        // Drifting sideways, round and round a band wider than any view.
        float span = aPlace.w;
        float side = mod(aPlace.y + uTime * ${DRIFT_SPEED.toFixed(1)} + span, 2.0 * span) - span;
        vFade = smoothstep(span, span * 0.8, abs(side));
        vec3 centre = vec3(cameraPosition.x, 0.0, cameraPosition.z) + uForward * aPlace.x + uLateral * side + vec3(0.0, aPlace.z, 0.0);
        vec3 toCamera = cameraPosition - centre;
        toCamera.y = 0.0;
        toCamera = normalize(toCamera);
        vec3 right = vec3(toCamera.z, 0.0, -toCamera.x);
        vec3 p = centre + right * position.x * aSize.x + vec3(0.0, position.y * aSize.y, 0.0);
        float tile = aSize.w;
        vec2 cell = vec2(mod(tile, ${COLUMNS.toFixed(1)}), floor(tile / ${COLUMNS.toFixed(1)}));
        vec2 local = vec2(aSize.z > 0.0 ? uv.x : 1.0 - uv.x, uv.y);
        vUv = (cell + local) / vec2(${COLUMNS.toFixed(1)}, ${ROWS.toFixed(1)});
        vFlip = aSize.z;
        vRight = right;
        vWorld = p;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tClouds;
      varying vec2 vUv;
      varying vec3 vWorld;
      varying vec3 vRight;
      varying float vFlip;
      varying float vFade;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      void main() {
        vec4 cloud = texture2D(tClouds, vUv);
        float alpha = cloud.a * vFade;
        if (alpha < 0.004) discard;
        vec3 toCamera = normalize(cameraPosition - vWorld);
        vec2 slope = (cloud.rg * 2.0 - 1.0) * vec2(vFlip, 1.0);
        vec3 n = normalize(vRight * slope.x + vec3(0.0, slope.y, 0.0) + toCamera * sqrt(max(0.0, 1.0 - dot(slope, slope))));
        float thick = cloud.b;
        // Sunlight on the side that faces it, wrapping a little round the billows.
        float lit = clamp((dot(n, uSunDir) + 0.5) / 1.5, 0.0, 1.0);
        // Before the sun: light scattered forwards through the thin edges.
        float before = pow(max(dot(-toCamera, uSunDir), 0.0), 6.0);
        float silver = before * pow(1.0 - thick, 1.5);
        vec3 shade = vec3(0.7, 0.76, 0.88);
        vec3 light = vec3(1.1, 1.09, 1.06);
        vec3 col = mix(shade, light, lit * (1.0 - 0.55 * before * thick));
        // Lit from the blue sky above as well; shaded in the dense core and underneath.
        col += vec3(0.06, 0.08, 0.12) * smoothstep(0.0, 0.8, n.y);
        col *= 1.0 - 0.1 * smoothstep(0.3, 1.0, thick) - 0.14 * smoothstep(0.0, -0.7, n.y);
        col += vec3(1.0, 0.98, 0.92) * silver * 1.2;
        // Far clouds sink into the haze along the horizon.
        vec3 dir = -toCamera;
        float dist = length(cameraPosition - vWorld);
        float haze = 1.0 - exp(-dist / 38000.0);
        col = mix(col, skyBase(vec3(dir.x, max(dir.y, 0.0), dir.z)), haze * 0.75);
        alpha *= 1.0 - 0.45 * haze;
        gl_FragColor = vec4(col * alpha, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -0.5;
  return { mesh, material, texture };
}
