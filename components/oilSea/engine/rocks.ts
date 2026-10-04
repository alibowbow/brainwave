import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, headlandPoint, noise2, SLOPE_RUN, terrainHeight } from './world';

/** How many different boulders the rocks are drawn from. */
const SHAPES = 3;

/** How many rocks at the water's edge the sea foams round. */
export const WATERLINE_ROCKS = 24;

/** A rock standing in the water: where, and how far it reaches (metres). */
export interface WaterlineRock {
  x: number;
  z: number;
  radius: number;
}

/**
 * A boulder: a lump pushed in and out by noise and split along a few
 * fracture planes into flat faces with rounded edges, then squashed. Its
 * vertices are shared, so it is shaded smoothly between the faces.
 */
function boulderGeometry(seed: number) {
  const geometry = mergeVertices(new THREE.IcosahedronGeometry(1, 3).deleteAttribute('normal').deleteAttribute('uv'));
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  // Fracture planes: which way each faces, and how far out it cuts.
  const planes: { n: THREE.Vector3; d: number }[] = [];
  for (let i = 0; i < 5; i++) {
    const a = seed * 3.1 + i * 2.39;
    const up = -0.35 + 0.9 * noise2(seed * 7 + i, 1.3);
    planes.push({ n: new THREE.Vector3(Math.cos(a), up, Math.sin(a)).normalize(), d: 0.62 + 0.2 * noise2(seed * 5, i * 1.7) });
  }
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    const bump = 0.8 + 0.28 * noise2(v.x * 1.5 + seed, v.y * 1.5 + v.z * 1.2) + 0.08 * noise2(v.x * 4.6 + seed, v.z * 4.6 - v.y * 2);
    v.multiplyScalar(bump);
    // Cut along the planes, keeping a little of the rounding at their edges.
    for (const plane of planes) {
      const over = v.dot(plane.n) - plane.d;
      if (over > 0) v.addScaledVector(plane.n, -over * 0.85);
    }
    v.y *= 0.62;
    position.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Rocks where the headland meets the water: grey boulders and ledges along
 * its foot, the sea washing round them, and a few breaking through the grass
 * higher up. Their stone is layered and cracked, crusted on top with
 * orange and grey-green lichen, dark and weedy where the sea reaches.
 */
export function createRocks(sunDirection: THREE.Vector3, count: number) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vLocal;
      varying float vSeed;
      varying float vSunlit;
      ${NOISE_GLSL}
      ${CLOUD_SHADOW_GLSL}
      void main() {
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vSunlit = cloudSun(world.xyz);
        vLocal = position;
        vSeed = fract(instanceMatrix[3].x * 0.137 + instanceMatrix[3].z * 0.071);
        vNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vLocal;
      varying float vSeed;
      varying float vSunlit;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      // The stone's relief, for the light to pick out: knobs and hollows, and finer pitting.
      float relief(vec2 q, float y) {
        return vnoise(q * 3.0 + y) * 0.6 + vnoise(q * 0.9 - y * 0.5) * 0.4 + 0.25 * vnoise(q * 11.0 + y * 4.0);
      }
      void main() {
        vec3 n = normalize(vNormal);
        // Patterns laid out in metres, whatever the rock's size.
        vec3 w = vWorld + vSeed * 31.0;
        // Grey stone, warmer or cooler from rock to rock, grainy; its knobs
        // and pits tilt the surface a little, so the light models them.
        float grain = relief(w.xz, w.y);
        float e = 0.04;
        vec2 slope = vec2(relief(w.xz + vec2(e, 0.0), w.y) - grain, relief(w.xz + vec2(0.0, e), w.y) - grain) / e;
        n = normalize(n - vec3(slope.x, 0.0, slope.y) * 0.12);
        vec3 stone = mix(vec3(0.42, 0.41, 0.4), vec3(0.52, 0.49, 0.45), vSeed);
        vec3 albedo = stone * (0.78 + 0.3 * grain);
        // Its beds: faint bands across the rock, and a few cracks.
        float bed = vLocal.y * 14.0 + vLocal.x * 3.0 + vnoise(w.xz * 0.6) * 1.5;
        albedo *= 0.94 + 0.06 * sin(bed * 3.1416);
        float crack = 1.0 - smoothstep(0.008, 0.03, abs(vnoise(w.xz * 0.45 + w.y * 0.3) - 0.5));
        albedo *= 1.0 - 0.35 * crack;
        // Lichen crusts on the tops: grey-green, and small patches of orange.
        float top = smoothstep(0.4, 0.85, n.y);
        float green = smoothstep(0.52, 0.66, fbm3(w.xz * 1.1 + 9.0)) * top;
        float orange = smoothstep(0.6, 0.68, fbm3(w.xz * 2.2 + 3.0)) * top;
        albedo = mix(albedo, vec3(0.58, 0.63, 0.5), green * 0.6);
        albedo = mix(albedo, vec3(0.8, 0.57, 0.22), orange * 0.7);
        // The splash zone: barnacles speckle the stone, and below them weed
        // hangs in dark olive strands; where the sea reaches it is wet and dark.
        float height = vWorld.y;
        float splash = smoothstep(1.6, 0.9, height) * smoothstep(0.1, 0.5, height);
        float barnacle = smoothstep(0.84, 0.9, vnoise(w.xz * 38.0 + w.y * 30.0)) * splash;
        albedo = mix(albedo, vec3(0.74, 0.72, 0.66), barnacle * 0.8);
        float strands = vnoise(vec2(w.x * 9.0 + w.z * 7.0, w.y * 1.6)) * 0.6 + vnoise(vec2(w.x * 21.0 - w.z * 5.0, w.y * 3.0)) * 0.4;
        float weed = smoothstep(1.1, 0.5, height) * smoothstep(0.35, 0.7, strands + 0.3 * vnoise(vWorld.xz * 2.0));
        albedo = mix(albedo, vec3(0.15, 0.17, 0.08), weed * 0.85);
        float wet = smoothstep(2.0, 0.7, height);
        albedo *= 1.0 - 0.38 * wet;
        vec3 col = lightGround(albedo, n, vSunlit);
        // Wet stone gives back the sky and a glint of the sun.
        vec3 v = normalize(cameraPosition - vWorld);
        vec3 r = reflect(-v, n);
        float fresnel = 0.04 + 0.5 * pow(1.0 - max(dot(n, v), 0.0), 4.0);
        col = mix(col, skyLight(vec3(r.x, abs(r.y), r.z), 0.3), fresnel * wet * 0.6);
        col += vec3(1.0, 0.97, 0.9) * pow(max(dot(r, uSunDir), 0.0), 60.0) * wet * vSunlit * 0.8;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });
  const group = new THREE.Group();
  const meshes = Array.from({ length: SHAPES }, (_, i) => {
    const mesh = new THREE.InstancedMesh(boulderGeometry(3.7 + i * 5.3), material, Math.ceil(count / SHAPES));
    mesh.count = 0;
    mesh.frustumCulled = false;
    group.add(mesh);
    return mesh;
  });
  let s = 881;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const scale = new THREE.Vector3();
  let placed = 0;
  const waterline: WaterlineRock[] = [];
  for (let tries = 0; placed < count && tries < count * 30; tries++) {
    // Along the headland's foot, clustered; now and then higher up the slope.
    const onSlope = rand() < 0.2;
    const along = -40 + rand() * 420;
    const down = onSlope ? SLOPE_RUN * (0.35 + 0.5 * rand()) : SLOPE_RUN - 2 + Math.pow(rand(), 1.5) * 16;
    if (noise2(along * 0.045, onSlope ? 7.3 : 1.1) < (onSlope ? 0.62 : 0.5)) continue;
    const { x, z } = headlandPoint(down, along);
    const dx = x - CAMERA.x;
    const dz = z - CAMERA.z;
    const bearing = Math.atan2(dx, -dz);
    if (bearing < -0.45 || bearing > 1.05) continue;
    const size = (onSlope ? 1.2 : 1.0) + Math.pow(rand(), 2.5) * (onSlope ? 2.5 : 7);
    const ground = Math.max(terrainHeight(x, z), -1.2);
    position.set(x, ground + size * 0.12, z);
    euler.set((rand() - 0.5) * 0.4, rand() * Math.PI * 2, (rand() - 0.5) * 0.4);
    quaternion.setFromEuler(euler);
    scale.set(size * (0.8 + 0.5 * rand()), size * (0.7 + 0.5 * rand()), size * (0.8 + 0.5 * rand()));
    matrix.compose(position, quaternion, scale);
    const mesh = meshes[placed % SHAPES];
    mesh.setMatrixAt(mesh.count++, matrix);
    placed++;
    if (ground < 0.9) waterline.push({ x, z, radius: 0.4 * (scale.x + scale.z) });
  }
  // The biggest of the rocks standing in the water, for the sea to foam round.
  waterline.sort((a, b) => b.radius - a.radius);
  return { mesh: group, material, waterline: waterline.slice(0, WATERLINE_ROCKS) };
}
