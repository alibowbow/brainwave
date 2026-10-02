import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { LIGHT_GLSL } from './terrain';
import { CAMERA, coastDistance, farmland, fieldAt, headlandFall, terrainHeight } from './world';

type Colour = [number, number, number];

const WALLS: Colour[] = [
  [0.93, 0.91, 0.86],
  [0.95, 0.9, 0.78],
  [0.88, 0.84, 0.76],
  [0.96, 0.95, 0.93],
];
const ROOFS: Colour[] = [
  [0.72, 0.32, 0.2],
  [0.66, 0.28, 0.18],
  [0.5, 0.46, 0.44],
  [0.78, 0.42, 0.26],
];

/** The lighthouse on the bay's northern headland, above the cliff where it shows from the viewer's hill. */
export const LIGHTHOUSE = { x: 22, z: -3795 };

/** A gable roof: a prism one unit wide and deep, its ridge along z, one unit high. */
function roofGeometry() {
  const p = [
    // Two slopes.
    -0.5, 0, -0.5, 0, 1, -0.5, 0, 1, 0.5,
    -0.5, 0, -0.5, 0, 1, 0.5, -0.5, 0, 0.5,
    0.5, 0, -0.5, 0.5, 0, 0.5, 0, 1, 0.5,
    0.5, 0, -0.5, 0, 1, 0.5, 0, 1, -0.5,
    // Gable ends.
    -0.5, 0, 0.5, 0, 1, 0.5, 0.5, 0, 0.5,
    0.5, 0, -0.5, 0, 1, -0.5, -0.5, 0, -0.5,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * The buildings of the coast, far and small: a village on the slope above
 * the far end of the beach with its church, farmhouses and barns among the
 * fields on the hills, and a lighthouse on the bay's northern headland.
 * One mesh, coloured per vertex, lit like the land.
 */
export function createBuildings(sunDirection: THREE.Vector3) {
  let s = 4711;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const box = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  box.deleteAttribute('uv');
  const roof = roofGeometry();
  const cylinder = new THREE.CylinderGeometry(0.78, 1, 1, 14, 1).translate(0, 0.5, 0);
  cylinder.deleteAttribute('uv');
  const cone = new THREE.ConeGeometry(1, 1, 14).translate(0, 0.5, 0);
  cone.deleteAttribute('uv');
  const pyramid = new THREE.ConeGeometry(0.72, 1, 4).rotateY(Math.PI / 4).translate(0, 0.5, 0);
  pyramid.deleteAttribute('uv');
  const parts: THREE.BufferGeometry[] = [];
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const add = (base: THREE.BufferGeometry, x: number, y: number, z: number, yaw: number, sx: number, sy: number, sz: number, colour: Colour) => {
    const part = base.clone();
    quaternion.setFromAxisAngle(up, yaw);
    matrix.compose(new THREE.Vector3(x, y, z), quaternion, new THREE.Vector3(sx, sy, sz));
    part.applyMatrix4(matrix);
    const colours = new Float32Array(part.attributes.position.count * 3);
    for (let i = 0; i < colours.length; i += 3) colours.set(colour, i);
    part.setAttribute('color', new THREE.BufferAttribute(colours, 3));
    parts.push(part.index ? part.toNonIndexed() : part);
  };
  const slopeAt = (x: number, z: number) => {
    const h = terrainHeight(x, z);
    return { h, slope: Math.hypot(terrainHeight(x + 5, z) - h, terrainHeight(x, z + 5) - h) / 5, gx: terrainHeight(x + 5, z) - h, gz: terrainHeight(x, z + 5) - h };
  };
  /** A house set into the slope, turned along it; its walls reach down to the lower ground. */
  const house = (x: number, z: number, width: number, depth: number, height: number, wall: Colour, roofColour: Colour, pitch = 0.45) => {
    const ground = slopeAt(x, z);
    const yaw = Math.atan2(ground.gx, ground.gz) + (rand() < 0.5 ? 0 : Math.PI / 2) + (rand() - 0.5) * 0.3;
    const drop = ground.slope * Math.max(width, depth) * 0.6;
    add(box, x, ground.h - drop, z, yaw, width, height + drop, depth, wall);
    add(roof, x, ground.h + height, z, yaw, width * 1.12, width * pitch, depth * 1.08, roofColour);
  };

  // The village on the slope above the far end of the beach.
  const village = { x: 250, z: -2720 };
  let houses = 0;
  for (let tries = 0; houses < 34 && tries < 600; tries++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 190;
    const x = village.x + Math.cos(a) * r * 0.8;
    const z = village.z + Math.sin(a) * r * 1.3;
    if (-coastDistance(x, z) < 55) continue;
    if (slopeAt(x, z).slope > 0.5) continue;
    const width = 7 + rand() * 6;
    house(x, z, width, width * (1.2 + 0.5 * rand()), 5 + rand() * 4, WALLS[Math.floor(rand() * WALLS.length)], ROOFS[Math.floor(rand() * ROOFS.length)]);
    houses++;
  }
  // Its church: a nave, and a tower with a spire.
  {
    const x = village.x + 30;
    const z = village.z - 20;
    const ground = slopeAt(x, z);
    const yaw = Math.atan2(ground.gx, ground.gz);
    house(x, z, 11, 24, 10, [0.95, 0.93, 0.88], [0.5, 0.46, 0.44], 0.55);
    const tx = x + Math.sin(yaw) * 13;
    const tz = z + Math.cos(yaw) * 13;
    const th = terrainHeight(tx, tz);
    add(box, tx, th - 3, tz, yaw, 6, 27, 6, [0.94, 0.92, 0.87]);
    add(pyramid, tx, th + 24, tz, yaw, 6.2, 13, 6.2, [0.44, 0.42, 0.42]);
  }

  // Farmhouses and barns among the fields on the hills.
  let farms = 0;
  for (let tries = 0; farms < 12 && tries < 4000; tries++) {
    const bearing = CAMERA.yaw + 0.1 + rand() * 0.6;
    const distance = 350 + rand() * 1800;
    const x = CAMERA.x + Math.sin(bearing) * distance;
    const z = CAMERA.z - Math.cos(bearing) * distance;
    if (-coastDistance(x, z) < 150 || headlandFall(x, z) < 1.2) continue;
    const ground = slopeAt(x, z);
    if (ground.slope > 0.25 || farmland(x, z, ground.slope) < 0.5) continue;
    // By a hedge, as farms are.
    const border = fieldAt(x, z).border;
    if (border < 8 || border > 30) continue;
    house(x, z, 9 + rand() * 4, 15 + rand() * 6, 6 + rand() * 2, WALLS[Math.floor(rand() * WALLS.length)], ROOFS[Math.floor(rand() * 2)]);
    // A barn beside it.
    const bx = x + (rand() - 0.5) * 50;
    const bz = z + (rand() - 0.5) * 50;
    house(bx, bz, 12 + rand() * 4, 22 + rand() * 8, 7, [0.58, 0.42, 0.32], [0.46, 0.44, 0.42], 0.4);
    farms++;
  }

  // The lighthouse, and its keeper's cottage.
  {
    const { x, z } = LIGHTHOUSE;
    const h = terrainHeight(x, z);
    add(cylinder, x, h - 2, z, 0, 6.5, 42, 6.5, [0.97, 0.97, 0.95]);
    add(cylinder, x, h + 20, z, 0, 5.8, 8, 5.8, [0.8, 0.16, 0.12]);
    add(cylinder, x, h + 38, z, 0, 5.6, 1.5, 5.6, [0.22, 0.24, 0.26]);
    add(cylinder, x, h + 39.5, z, 0, 3.8, 6, 3.8, [0.24, 0.3, 0.34]);
    add(cone, x, h + 45.5, z, 0, 4.6, 6, 4.6, [0.8, 0.16, 0.12]);
    house(x + 22, z + 16, 10, 16, 6, [0.97, 0.97, 0.95], [0.8, 0.16, 0.12]);
  }

  const geometry = mergeGeometries(parts, false);
  geometry.computeBoundingSphere();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute vec3 color;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vColour;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normal;
        vColour = color;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vColour;
      ${NOISE_GLSL}
      ${SKY_GLSL}
      ${LIGHT_GLSL}
      ${CLOUD_SHADOW_GLSL}
      void main() {
        vec3 col = lightGround(vColour, normalize(vNormal), cloudSun(vWorld));
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  for (const base of [box, roof, cylinder, cone, pyramid]) base.dispose();
  return { mesh, material };
}
