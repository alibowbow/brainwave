import * as THREE from 'three';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, headlandPoint, noise2, SLOPE_RUN, terrainHeight } from './world';

/** A boulder: a ball pushed in and out by noise, flattened, with a few facets cut in. */
function boulderGeometry(seed: number) {
  const geometry = new THREE.IcosahedronGeometry(1, 3);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    const bump = 0.75 + 0.35 * noise2(v.x * 1.7 + seed, v.y * 1.7 + v.z * 1.3) + 0.12 * noise2(v.x * 5 + seed, v.z * 5 - v.y);
    v.multiplyScalar(bump);
    // Cut flat faces: clamp against a few planes.
    v.y = Math.min(v.y, 0.55 + 0.1 * noise2(v.x * 2, v.z * 2 + seed));
    v.x = Math.min(v.x, 0.8);
    v.y *= 0.62;
    position.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Rocks where the headland meets the water: dark boulders and ledges along
 * its foot, the sea washing round them, and a few breaking through the grass
 * higher up.
 */
export function createRocks(sunDirection: THREE.Vector3, count: number) {
  const geometry = boulderGeometry(3.7);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vLocal;
      void main() {
        vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vLocal = position;
        vNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vLocal;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      void main() {
        vec3 n = normalize(vNormal);
        float grain = vnoise(vLocal.xz * 6.0 + vLocal.y * 3.0) * 0.6 + vnoise(vWorld.xz * 0.9) * 0.4;
        vec3 albedo = mix(vec3(0.16, 0.13, 0.11), vec3(0.42, 0.35, 0.28), grain);
        // Lichen and dry grass on the tops.
        albedo = mix(albedo, vec3(0.5, 0.44, 0.24), smoothstep(0.6, 0.9, n.y) * 0.5);
        // Wet and dark where the sea reaches.
        albedo *= mix(0.55, 1.0, smoothstep(0.3, 1.6, vWorld.y));
        vec3 col = lightGround(albedo, n, 1.0);
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, count);
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
    mesh.setMatrixAt(placed++, matrix);
  }
  mesh.count = placed;
  mesh.frustumCulled = false;
  return { mesh, material };
}
