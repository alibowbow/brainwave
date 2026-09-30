import * as THREE from 'three';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';

/**
 * A gull wheeling over the bay: it circles a point that wanders slowly
 * about, rising and sinking a little on the breeze, now gliding on bent
 * wings, now flapping for a while.
 */
export interface Gull {
  /** The point it circles, in metres (y is its height). */
  x: number;
  y: number;
  z: number;
  /** Radius of its circle, metres. */
  radius: number;
  /** Airspeed, metres per second; the sign is the way round it flies. */
  speed: number;
  /** Where it starts on its circle (radians), and a seed for its wanderings. */
  phase: number;
  seed: number;
}

/** How far the point a gull circles wanders from its place, metres. */
export const GULL_WANDER = 18;

/**
 * How much larger than life the gulls are drawn: at life size they would
 * be specks the brushwork paints over, as a painter would not.
 */
const SIZE = 3.5;

// Over the water below the headland and the near beach, two of them above
// the headland's top against the far land and the sky: all clear of the
// ground and never close enough to the viewer to fill the view.
export const GULLS: Gull[] = [
  { x: -5, y: 40, z: -125, radius: 18, speed: 8, phase: 0.4, seed: 0.13 },
  { x: 15, y: 42, z: -170, radius: 22, speed: -7.5, phase: 2.1, seed: 0.57 },
  { x: -45, y: 36, z: -200, radius: 24, speed: -8.5, phase: 4.0, seed: 0.91 },
  { x: 62, y: 68, z: -105, radius: 16, speed: 7.5, phase: 1.2, seed: 0.33 },
  { x: -5, y: 68, z: -90, radius: 14, speed: 7, phase: 5.3, seed: 0.72 },
  { x: 120, y: 44, z: -260, radius: 28, speed: -8.5, phase: 3.1, seed: 0.46 },
];

/** Where a gull is at time t (the shader flies it the same way). */
export function gullPosition(gull: Gull, t: number) {
  const s = gull.seed * 6.2832;
  const cx = gull.x + GULL_WANDER * Math.sin(t * 0.021 + s);
  const cy = gull.y + 4 * Math.sin(t * 0.11 + s * 2);
  const cz = gull.z + GULL_WANDER * Math.cos(t * 0.017 + s * 3);
  const theta = gull.phase + (gull.speed / gull.radius) * t;
  return { x: cx + Math.cos(theta) * gull.radius, y: cy, z: cz + Math.sin(theta) * gull.radius };
}

/** Where the wing bends (the wrist), metres out from the shoulder. */
const WRIST = 0.38;

/**
 * One gull, 1.5 m across the wings, facing +z. Its body and tail are built
 * as they are; its wings are laid out flat as (side, distance out from the
 * shoulder, fore and aft) for the shader to raise, bend and beat.
 */
function gullGeometry() {
  const positions: number[] = [];
  const wings: number[] = [];
  const parts: number[] = [];
  const add = (x: number, y: number, z: number, part: number, side = 0, span = 0) => {
    positions.push(x, y, z);
    wings.push(side, span, z);
    parts.push(part);
  };
  const triangle = (a: number[], b: number[], c: number[]) => {
    for (const v of [a, b, c]) add(v[0], v[1], v[2], 0);
  };
  // Body: a slim spindle, head forward; a short square tail.
  const head = [0, 0.02, 0.3];
  const neck = [0, 0.05, 0.14];
  const breast = [0, -0.05, 0.06];
  const left = [-0.06, 0, 0.04];
  const right = [0.06, 0, 0.04];
  const back = [0, 0.03, -0.2];
  const vent = [0, -0.02, -0.18];
  triangle(head, left, neck);
  triangle(head, neck, right);
  triangle(head, breast, left);
  triangle(head, right, breast);
  triangle(neck, left, back);
  triangle(neck, back, right);
  triangle(breast, vent, left);
  triangle(breast, right, vent);
  triangle(left, vent, back);
  triangle(right, back, vent);
  triangle([-0.05, 0.01, -0.18], [0.05, 0.01, -0.18], [0.06, 0.0, -0.34]);
  triangle([-0.05, 0.01, -0.18], [0.06, 0.0, -0.34], [-0.06, 0.0, -0.34]);
  // Wings: broad inner arm, then the hand narrowing and swept back to a point.
  const outline = [
    [0, 0.11, -0.12],
    [0.2, 0.11, -0.13],
    [WRIST, 0.1, -0.1],
    [0.56, 0.02, -0.09],
    [0.72, -0.1, -0.12],
  ];
  for (const side of [-1, 1]) {
    for (let i = 0; i < outline.length - 1; i++) {
      const [s0, lead0, trail0] = outline[i];
      const [s1, lead1, trail1] = outline[i + 1];
      const quad = [
        [s0, lead0],
        [s1, lead1],
        [s1, trail1],
        [s0, lead0],
        [s1, trail1],
        [s0, trail0],
      ];
      for (const [span, z] of quad) add(0, 0, z, 1, side, span);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aWing', new THREE.Float32BufferAttribute(wings, 3));
  geometry.setAttribute('aPart', new THREE.Float32BufferAttribute(parts, 1));
  return geometry;
}

/**
 * Gulls wheeling over the bay, small in the painting: white heads and
 * bodies, grey backs and wings, black wing tips. They glide on wings held
 * in a shallow M and bank into their turns, and now and then flap.
 */
export function createGulls(sunDirection: THREE.Vector3, count = GULLS.length) {
  const gulls = GULLS.slice(0, count);
  const base = gullGeometry();
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', base.getAttribute('position'));
  geometry.setAttribute('aWing', base.getAttribute('aWing'));
  geometry.setAttribute('aPart', base.getAttribute('aPart'));
  const flight = new Float32Array(gulls.length * 4);
  const pace = new Float32Array(gulls.length * 4);
  gulls.forEach((gull, i) => {
    flight.set([gull.x, gull.y, gull.z, gull.radius], i * 4);
    pace.set([gull.speed / gull.radius, gull.phase, 2.6 + 0.6 * gull.seed, gull.seed * 6.2832], i * 4);
  });
  geometry.setAttribute('aFlight', new THREE.InstancedBufferAttribute(flight, 4));
  geometry.setAttribute('aPace', new THREE.InstancedBufferAttribute(pace, 4));
  geometry.instanceCount = gulls.length;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      attribute vec3 aWing;
      attribute float aPart;
      attribute vec4 aFlight;
      attribute vec4 aPace;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vWingPart;
      varying float vTip;
      ${NOISE_GLSL}
      void main() {
        float t = uTime;
        float s = aPace.w;
        // Circling a point that wanders (as gullPosition does).
        vec3 centre = vec3(
          aFlight.x + ${GULL_WANDER.toFixed(1)} * sin(t * 0.021 + s),
          aFlight.y + 4.0 * sin(t * 0.11 + s * 2.0),
          aFlight.z + ${GULL_WANDER.toFixed(1)} * cos(t * 0.017 + s * 3.0));
        float theta = aPace.y + aPace.x * t;
        vec3 radial = vec3(cos(theta), 0.0, sin(theta));
        vec3 at = centre + radial * aFlight.w;
        // Heading round the circle, banked in towards its centre.
        vec3 forward = normalize(vec3(-sin(theta), 0.0, cos(theta)) * sign(aPace.x));
        vec3 up = normalize(vec3(0.0, 1.0, 0.0) - radial * 0.32);
        vec3 right = normalize(cross(forward, up));
        up = cross(right, forward);
        // Gliding on wings held in a shallow M; now and then a spell of flapping.
        float flapping = smoothstep(0.6, 0.78, vnoise(vec2(t * 0.12, s * 7.0)));
        float beat = t * aPace.z * 6.2832;
        float arm = mix(0.14, 0.12 + 0.6 * sin(beat), flapping);
        float hand = mix(-0.42, -0.1 + 0.4 * sin(beat - 0.9), flapping);
        vec3 local = position;
        vec3 normal = vec3(0.0, 1.0, 0.0);
        vWingPart = aPart;
        vTip = 0.0;
        if (aPart > 0.5) {
          float span = aWing.y;
          float inner = min(span, ${WRIST.toFixed(2)});
          float outer = max(span - ${WRIST.toFixed(2)}, 0.0);
          float angle = span > ${WRIST.toFixed(2)} ? arm + hand : arm;
          vec2 q = vec2(cos(arm), sin(arm)) * inner + vec2(cos(arm + hand), sin(arm + hand)) * outer;
          local = vec3(aWing.x * (0.05 + q.x), q.y, aWing.z);
          normal = vec3(-aWing.x * sin(angle), cos(angle), 0.0);
          vTip = smoothstep(0.55, 0.62, span);
        }
        local *= ${SIZE.toFixed(2)};
        vec3 world = at + right * local.x + up * local.y + forward * local.z;
        vNormal = right * normal.x + up * normal.y + forward * normal.z;
        vWorld = world;
        gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vWingPart;
      varying float vTip;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      ${CLOUD_SHADOW_GLSL}
      void main() {
        vec3 n = normalize(vNormal);
        // Seen from above: grey back and wings; from below: white.
        bool above = dot(n, cameraPosition - vWorld) > 0.0;
        if (!above) n = -n;
        vec3 albedo = vWingPart > 0.5 ? (above ? vec3(0.7, 0.73, 0.77) : vec3(0.95, 0.95, 0.94)) : vec3(0.97, 0.97, 0.95);
        albedo = mix(albedo, vec3(0.07, 0.07, 0.08), vTip);
        // Sun from above, the sky all round, and from below the light
        // thrown up off the bright sea, which with the sun glowing through
        // the thin feathers keeps an underside white.
        float sun = clamp((dot(n, uSunDir) + 0.3) / 1.3, 0.0, 1.0) * cloudSun(vWorld);
        float through = max(dot(-n, uSunDir), 0.0) * 0.35;
        vec3 light = vec3(1.0, 0.97, 0.9) * 1.25 * sun + vec3(0.55, 0.63, 0.74) * (0.5 + 0.2 * n.y) + vec3(0.5, 0.55, 0.58) * (0.5 - 0.5 * n.y) + through;
        gl_FragColor = vec4(addHaze(albedo * light, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  base.dispose();
  return { mesh, material };
}
