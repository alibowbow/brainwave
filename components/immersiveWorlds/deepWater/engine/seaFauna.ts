import * as THREE from 'three';
import { seeded } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { SEA_GLSL, applySeaShading } from './seaShading';

/*
 * Free-swimming life for the deep-sea world (original code): distant fish
 * schools that drift across the blue and never come toward the observer,
 * glowing moon jellies with a pulsing translucent bell and trailing
 * tentacles, and marine snow in three depth layers.
 */

// --- Fish schools -----------------------------------------------------------------

function fishGeometry() {
  const p: number[] = [], idx: number[] = [];
  const rings = 11, radial = 8;
  for (let i = 0; i <= rings; i++) for (let j = 0; j <= radial; j++) {
    const t = i / rings, a = j / radial * Math.PI * 2;
    const radius = Math.pow(Math.sin(t * Math.PI), .7) * .14 * (1 - .25 * t);
    p.push(-.6 + t * 1.2, Math.cos(a) * radius, Math.sin(a) * radius * .45);
  }
  for (let i = 0; i < rings; i++) for (let j = 0; j < radial; j++) { const a = i * (radial + 1) + j, b = a + radial + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  const tri = (a: number[], b: number[], c: number[]) => { const s = p.length / 3; p.push(...a, ...b, ...c); idx.push(s, s + 1, s + 2, s + 2, s + 1, s); };
  tri([-.56, 0, 0], [-.88, .2, 0], [-.84, -.19, 0]);
  tri([-.25, .11, 0], [.02, .24, 0], [.12, .12, 0]);
  tri([-.2, -.1, 0], [-.02, -.2, 0], [.06, -.1, 0]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

export interface FishSchool { mesh: THREE.InstancedMesh; update(time: number): void }

/**
 * A school holds formation around a centre that loops slowly through the far
 * water on a flat ellipse. Each fish weaves a little on its own; the tail
 * beats in the vertex shader. The ellipse never comes nearer than `minZ`.
 */
export function createSchools(time: { value: number }) {
  const geometry = fishGeometry();
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .32, metalness: .35 });
  material.onBeforeCompile = shader => {
    shader.uniforms.uFishTime = time;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uFishTime;\nvarying float vFishSide;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  float id = float(gl_InstanceID);
  float beat = uFishTime * (2.2 + fract(id * .37) * .8) + id * 1.7;
  float tail = pow(max(0.0, .45 - position.x), 1.4);
  transformed.z += sin(position.x * 7.0 - beat) * tail * .16;
  vFishSide = position.y;
}`)
      .replace('#include <project_vertex>', `{
  // Each fish weaves slowly within the school.
  float id = float(gl_InstanceID);
  vec3 weave = vec3(sin(uFishTime * .21 + id * 2.3) * .35, sin(uFishTime * .33 + id * 1.1) * .18, cos(uFishTime * .17 + id * 3.7) * .35);
  transformed += weave / max(length(instanceMatrix[0].xyz), 1e-3);
}
#include <project_vertex>`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vFishSide;')
      .replace('#include <color_fragment>', `#include <color_fragment>
// Counter-shaded: dark blue back, silver flank, pale belly.
diffuseColor.rgb *= mix(vec3(0.75, 0.82, 0.85), vec3(0.10, 0.20, 0.30), smoothstep(-0.02, 0.1, vFishSide));`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  // Flank flashes as a fish turns into the light.
  vec3 sunDir = normalize(vec3(0.22, 1.0, -0.28));
  vec3 r = reflect(-normalize(vViewPosition), normal);
  vec3 sunView = normalize((viewMatrix * vec4(sunDir, 0.0)).xyz);
  totalEmissiveRadiance += vec3(0.45, 0.75, 0.78) * pow(max(dot(r, sunView), 0.0), 4.0) * (1.0 - smoothstep(-0.02, 0.1, vFishSide)) * 1.4;
}`);
  };
  material.customProgramCacheKey = () => 'sea-fish-v2';
  applySeaShading(material, { key: 'sea-fish', caustics: 0, time });

  const specs = [
    { count: 80, centre: new THREE.Vector3(6.5, 3.6, -21), radius: new THREE.Vector2(6, 1.5), speed: .016, spread: new THREE.Vector3(3.2, 1.1, 1.6), size: .34, seed: 11, phase: 0 },
    { count: 46, centre: new THREE.Vector3(-.5, 7.5, -33), radius: new THREE.Vector2(6, 1.6), speed: .012, spread: new THREE.Vector3(2.2, .8, 1.2), size: .36, seed: 23, phase: 2.2 },
    { count: 40, centre: new THREE.Vector3(9.5, -1.2, -17), radius: new THREE.Vector2(4, 1.2), speed: .02, spread: new THREE.Vector3(2, .7, 1.1), size: .3, seed: 37, phase: 4.1 },
  ];
  const schools: FishSchool[] = specs.map(spec => {
    const random = seeded(spec.seed);
    const mesh = new THREE.InstancedMesh(geometry, material, spec.count);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), color = new THREE.Color();
    for (let i = 0; i < spec.count; i++) {
      // A flattened lens of fish, densest at the core.
      const r = Math.cbrt(random()), a = random() * Math.PI * 2, b = Math.acos(random() * 2 - 1);
      const offset = new THREE.Vector3(Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)).multiplyScalar(r).multiply(spec.spread);
      const s = spec.size * (.75 + random() * .5);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (random() - .5) * .25);
      m.compose(offset, q, new THREE.Vector3(s, s, s));
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, color.setHSL(.53 + random() * .05, .25, .55 + random() * .25));
    }
    mesh.frustumCulled = false;
    mesh.name = 'deep-sea-fish-school';
    const update = (t: number) => {
      const a = t * spec.speed + spec.phase;
      mesh.position.set(spec.centre.x + Math.sin(a) * spec.radius.x, spec.centre.y + Math.sin(a * 1.7) * .6, spec.centre.z + Math.cos(a) * spec.radius.y);
      const vx = Math.cos(a) * spec.radius.x, vz = -Math.sin(a) * spec.radius.y;
      mesh.rotation.y = Math.atan2(-vz, vx);
    };
    update(0);
    return { mesh, update };
  });
  return schools;
}

// --- Moon jellies ------------------------------------------------------------------

const JELLY_PULSE = /* glsl */ `
uniform float uTime;
uniform float uPhase;
uniform float uPulse;
// Swimming stroke: a quick contraction, then a long slow relaxation.
float jellyStroke(float t) {
  float c = fract(t * 0.28 + uPhase);
  return smoothstep(0.0, 0.14, c) * (1.0 - smoothstep(0.14, 0.78, c));
}
`;

function bellGeometry(seed: number) {
  const p: number[] = [], uv: number[] = [], idx: number[] = [], n = 72, m = 28;
  for (let j = 0; j <= m; j++) for (let i = 0; i <= n; i++) {
    const t = j / m, a = i / n * Math.PI * 2;
    const r = t * (1 + Math.pow(t, 7) * Math.sin(a * 16 + seed) * .025);
    const y = .9 * Math.sqrt(Math.max(0, 1 - t * t)) * (1 - .1 * t * t) + .018 * Math.sin(a * 16) * Math.pow(t, 8);
    p.push(Math.cos(a) * r, y, Math.sin(a) * r); uv.push(i / n, t);
  }
  for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) { const a = j * (n + 1) + i, b = a + n + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

/** Hair-fine marginal tentacles and four frilled oral arms, as thin tubes; `tt` runs down each. */
function tentacleGeometry(seed: number) {
  const random = seeded(seed * 97 + 5);
  const pos: number[] = [], tt: number[] = [], tk: number[] = [], idx: number[] = [];
  const tube = (points: THREE.Vector3[], radius: (t: number) => number, sides: number, key: number) => {
    const start = pos.length / 3;
    const tangent = new THREE.Vector3(), side = new THREE.Vector3(), up = new THREE.Vector3();
    points.forEach((point, j) => {
      const t = j / (points.length - 1);
      tangent.subVectors(points[Math.min(j + 1, points.length - 1)], points[Math.max(j - 1, 0)]).normalize();
      side.crossVectors(tangent, new THREE.Vector3(.3, 0, 1)).normalize(); up.crossVectors(side, tangent);
      for (let k = 0; k < sides; k++) {
        const a = k / sides * Math.PI * 2, r = radius(t);
        pos.push(point.x + (side.x * Math.cos(a) + up.x * Math.sin(a)) * r, point.y + (side.y * Math.cos(a) + up.y * Math.sin(a)) * r, point.z + (side.z * Math.cos(a) + up.z * Math.sin(a)) * r);
        tt.push(t); tk.push(key);
      }
    });
    for (let j = 0; j < points.length - 1; j++) for (let k = 0; k < sides; k++) {
      const a = start + j * sides + k, b = start + j * sides + (k + 1) % sides;
      idx.push(a, a + sides, b, b, a + sides, b + sides);
    }
  };
  // Marginal tentacles hang from the scalloped rim.
  for (let k = 0; k < 32; k++) {
    const a = k / 32 * Math.PI * 2;
    const len = 1.6 + random() * 1.9;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 26; j++) { const t = j / 26; pts.push(new THREE.Vector3(Math.cos(a) * (.95 - t * .2), .03 - t * len, Math.sin(a) * (.95 - t * .2))); }
    tube(pts, t => .0075 * (1 - t * .55), 3, random());
  }
  // Oral arms: wider ribbons, rendered as flattened tubes with a frilled edge.
  for (let k = 0; k < 4; k++) {
    const a = k * Math.PI / 2 + .4;
    const pts: THREE.Vector3[] = [];
    for (let j = 0; j <= 30; j++) { const t = j / 30; pts.push(new THREE.Vector3(Math.cos(a) * (.14 + t * .16), .3 - t * 1.75, Math.sin(a) * (.14 + t * .16))); }
    tube(pts, t => (.07 * (1 - t) + .012) * (1 + .35 * Math.sin(t * 40 + k)), 5, 2 + k * .1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('tt', new THREE.Float32BufferAttribute(tt, 1));
  g.setAttribute('tk', new THREE.Float32BufferAttribute(tk, 1));
  g.setIndex(idx);
  return g;
}

/** A soft halo sprite: light scattered by the water around a glowing animal. */
function haloTexture() {
  const size = 64, data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const d = Math.hypot((x + .5) / size * 2 - 1, (y + .5) / size * 2 - 1);
    const v = Math.max(0, Math.exp(-d * d * 5) - .007);
    const k = (y * size + x) * 4; data[k] = data[k + 1] = data[k + 2] = 255; data[k + 3] = Math.round(255 * v);
  }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter; t.needsUpdate = true;
  return t;
}

export interface Jelly { group: THREE.Group; bell: THREE.Mesh; uniforms: { uPulse: { value: number }; uTrail: { value: THREE.Vector3 } } }

export function createJelly(scale: number, glow: THREE.ColorRepresentation, seed: number, time: { value: number }, brightness = 1): Jelly {
  const group = new THREE.Group();
  group.scale.setScalar(scale);
  const uniforms = {
    uTime: time, uPhase: { value: (seed * .173) % 1 }, uPulse: { value: 0 },
    uGlow: { value: new THREE.Color(glow).multiplyScalar(brightness) },
    uTrail: { value: new THREE.Vector3(.22, 0, -.12) },
  };
  const bellMaterial = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, side: THREE.DoubleSide, premultipliedAlpha: true,
    vertexShader: `${JELLY_PULSE}
      varying vec3 vWorld; varying vec3 vNormal; varying vec2 vUv; varying float vStroke;
      void main() {
        vUv = uv;
        float c = jellyStroke(uTime);
        vStroke = c;
        float t = uv.y;
        vec3 p = position;
        p.xz *= 1.0 - 0.13 * c * smoothstep(0.2, 1.0, t);
        p.y += 0.06 * c * (1.0 - t) - 0.05 * c * t * t;
        vec4 w = modelMatrix * vec4(p, 1.0);
        vWorld = w.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `${GLSL_NOISE}
      ${SEA_GLSL}
      uniform vec3 uGlow; uniform float uPulse; uniform float uTime;
      varying vec3 vWorld; varying vec3 vNormal; varying vec2 vUv; varying float vStroke;
      void main() {
        vec3 V = normalize(cameraPosition - vWorld);
        vec3 N = normalize(vNormal);
        if (!gl_FrontFacing) N = -N;
        float ndv = abs(dot(N, V));
        // Light travels further through the membrane at grazing angles: a glowing rim.
        float edge = pow(1.0 - ndv, 2.4);
        float u = vUv.x, t = vUv.y;
        float canals = pow(abs(cos(u * 3.14159265 * 16.0)), 60.0) * smoothstep(0.3, 0.9, t) * (1.0 - smoothstep(0.92, 1.0, t));
        float ring = smoothstep(0.83, 0.86, t) * (1.0 - smoothstep(0.86, 0.89, t));
        float rim = smoothstep(0.9, 0.995, t);
        // Four horseshoe gonads around the centre: the moon jelly's clover.
        vec2 q = t * vec2(cos(u * 6.2831853), sin(u * 6.2831853));
        float gonad = 0.0;
        for (int k = 0; k < 4; k++) {
          float a = float(k) * 1.5707963 + 0.785398;
          vec2 c = 0.3 * vec2(cos(a), sin(a));
          vec2 d = q - c;
          float horseshoe = smoothstep(0.035, 0.0, abs(length(d) - 0.11)) * smoothstep(-0.6, 0.2, dot(normalize(d), normalize(c)));
          gonad = max(gonad, horseshoe);
        }
        float mottle = 0.85 + 0.15 * bwNoise(vec3(vUv * vec2(24.0, 8.0), 3.0));
        float live = 1.0 + uPulse * 1.6 + vStroke * 0.35;
        vec3 color = uGlow * (0.03 + 0.8 * edge + 0.08 * canals + 0.4 * ring + 1.1 * rim) * mottle * live;
        color += vec3(0.85, 0.5, 0.95) * gonad * 0.55 * live;
        // Sunlight catching the top of the bell.
        color += vec3(0.25, 0.5, 0.5) * max(dot(N, -SEA_SUN_DIR), 0.0) * (0.1 + edge) * 0.3;
        float alpha = clamp(0.03 + 0.4 * edge + 0.25 * rim + 0.06 * canals + 0.35 * gonad, 0.0, 0.8);
        vec3 T = seaTransmit(vWorld, cameraPosition);
        vec3 lit = color * T + seaWater(vec3(0.0), vWorld, cameraPosition) * alpha;
        gl_FragColor = vec4(lit, alpha);
      }`,
  });
  const bell = new THREE.Mesh(bellGeometry(seed), bellMaterial);
  bell.renderOrder = 4;
  group.add(bell);

  const tentacleMaterial = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `${JELLY_PULSE}
      uniform vec3 uTrail;
      attribute float tt; attribute float tk;
      varying float vT; varying float vTk; varying vec3 vWorld;
      void main() {
        vT = tt; vTk = tk;
        vec3 p = position;
        // The rim's contraction runs down each tentacle as a wave.
        float wave = jellyStroke(uTime - tt * 1.1);
        p.xz *= 1.0 - 0.13 * wave * (1.0 - 0.5 * tt);
        p.y -= 0.05 * jellyStroke(uTime);
        float a = pow(tt, 1.25);
        p.x += sin(uTime * 0.5 - tt * 5.5 + tk * 6.28) * 0.17 * a;
        p.z += cos(uTime * 0.43 - tt * 4.6 + tk * 4.1) * 0.14 * a;
        // Drifting slowly upward, the animal trails its tentacles behind it.
        p += uTrail * pow(tt, 1.6) * (1.0 + 0.25 * sin(uTime * 0.3 + tk * 3.0));
        vec4 w = modelMatrix * vec4(p, 1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `${GLSL_NOISE}
      ${SEA_GLSL}
      uniform vec3 uGlow; uniform float uPulse; uniform float uTime;
      varying float vT; varying float vTk; varying vec3 vWorld;
      void main() {
        float beads = 0.8 + 0.2 * sin(vT * 90.0 - uTime * 1.5);
        float arm = step(1.5, vTk);
        vec3 c = uGlow * mix(0.55, 0.22, arm) * (1.0 - vT * 0.7) * beads * (1.0 + uPulse * 1.4);
        gl_FragColor = vec4(c * seaTransmit(vWorld, cameraPosition), 1.0);
      }`,
  });
  const tentacles = new THREE.Mesh(tentacleGeometry(seed), tentacleMaterial);
  tentacles.renderOrder = 3; tentacles.frustumCulled = false;
  group.add(tentacles);

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture(), color: new THREE.Color(glow).multiplyScalar(.09 * brightness), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: false }));
  halo.position.set(0, .35, 0); halo.scale.setScalar(4.2); halo.renderOrder = 2;
  group.add(halo);
  return { group, bell, uniforms };
}

// --- Marine snow and plankton ------------------------------------------------------------

export interface SnowLayer { points: THREE.Points }

/**
 * Detritus drifting in a box: sinking slowly, carried by the swell, and lit
 * only where a surface shaft passes through it. Positions wrap inside the box
 * so density never changes; flakes fade near the box faces instead of popping.
 */
export function createSnowLayer(options: { count: number; min: THREE.Vector3; size: THREE.Vector3; flake: number; brightness: number; seed: number; time: { value: number }; soft?: number }) {
  const random = seeded(options.seed);
  const positions = new Float32Array(options.count * 3), seeds = new Float32Array(options.count);
  for (let i = 0; i < options.count; i++) { positions.set([random(), random(), random()], i * 3); seeds[i] = random(); }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));
  geometry.boundingSphere = new THREE.Sphere(options.min.clone().addScaledVector(options.size, .5), options.size.length() * .6);
  const viewport = { value: 800 };
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: options.time, uBoxMin: { value: options.min }, uBoxSize: { value: options.size }, uFlake: { value: options.flake }, uBright: { value: options.brightness }, uViewport: viewport, uSoft: { value: options.soft ?? 0 } },
    vertexShader: `${GLSL_NOISE}
      ${SEA_GLSL}
      attribute float seed;
      uniform float uTime; uniform vec3 uBoxMin; uniform vec3 uBoxSize; uniform float uFlake; uniform float uBright; uniform float uViewport;
      varying vec3 vColor;
      void main() {
        vec3 world = uBoxMin + position * uBoxSize;
        world.y -= uTime * (0.02 + 0.035 * seed);
        world += seaSurge(world, uTime) * (0.3 + 0.25 * seed);
        world.x += sin(uTime * 0.13 + seed * 50.0) * 0.12;
        world.z += cos(uTime * 0.11 + seed * 31.0) * 0.12;
        vec3 q = mod(world - uBoxMin, uBoxSize) / uBoxSize;
        world = uBoxMin + q * uBoxSize;
        vec3 fadeIn = smoothstep(vec3(0.0), vec3(0.08), q) * (1.0 - smoothstep(vec3(0.92), vec3(1.0), q));
        float edge = fadeIn.x * fadeIn.y * fadeIn.z;
        vec4 mv = viewMatrix * vec4(world, 1.0);
        float dist = max(-mv.z, 0.05);
        float px = uFlake * (0.45 + seed * 1.1) * uViewport * projectionMatrix[1][1] * 0.5 / dist;
        gl_PointSize = clamp(px, 1.0, 30.0);
        // A flake smaller than a pixel fades instead of flickering.
        float cover = min(px * px, 1.0);
        float shaft = seaShaft(world, uTime);
        float light = exp(-max(SEA_SURFACE - world.y, 0.0) * 0.05);
        vec3 tint = mix(vec3(0.55, 0.85, 0.85), vec3(0.9, 0.97, 0.95), seed);
        vColor = tint * uBright * cover * edge * light * (0.18 + 1.7 * shaft) * seaTransmit(world, cameraPosition);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `uniform float uSoft;
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        // Near flakes are out of focus: a soft disc with a faint brighter edge.
        float core = 1.0 - smoothstep(mix(0.2, 0.7, uSoft), 1.0, d);
        float ring = uSoft * smoothstep(0.55, 0.85, d) * (1.0 - smoothstep(0.85, 1.0, d)) * 0.4;
        gl_FragColor = vec4(vColor * (core + ring), 1.0);
      }`,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.onBeforeRender = renderer => {
    const size = renderer.getDrawingBufferSize(SIZE);
    viewport.value = size.y;
  };
  return { points };
}
const SIZE = new THREE.Vector2();
