import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { NOISE_GLSL, SKY_GLSL } from './sky';
import { CLOUD_SHADOW_GLSL } from './clouds';
import { LIGHT_GLSL } from './terrain';

type Colour = [number, number, number];

interface Boat {
  x: number;
  z: number;
  /** Half the length of the stretch of water it sails to and fro along x, in metres. */
  range: number;
  /** Seconds for a full there and back. */
  period: number;
  size: number;
  sail: Colour;
  hull: Colour;
}

// Out on the open water in view, clear of the surf: one fairly near, the
// rest farther off, the last by the bay's headland.
export const BOATS: Boat[] = [
  { x: -255, z: -1080, range: 160, period: 1300, size: 1.3, sail: [0.97, 0.96, 0.93], hull: [0.94, 0.94, 0.92] },
  { x: -250, z: -2290, range: 110, period: 1100, size: 1.2, sail: [0.84, 0.5, 0.32], hull: [0.18, 0.24, 0.4] },
  { x: -880, z: -3290, range: 260, period: 1900, size: 1.6, sail: [0.97, 0.96, 0.93], hull: [0.94, 0.94, 0.92] },
  { x: -330, z: -5990, range: 200, period: 2300, size: 1.8, sail: [0.97, 0.96, 0.93], hull: [0.2, 0.22, 0.3] },
];

/** A sailing boat, bow towards +x: hull, mainsail and jib, a mast between. About ten metres long. */
function boatGeometry(boat: Boat, index: number) {
  const parts: THREE.BufferGeometry[] = [];
  const colour = (geometry: THREE.BufferGeometry, c: Colour) => {
    const g = geometry.index ? geometry.toNonIndexed() : geometry;
    g.deleteAttribute('uv');
    const colours = new Float32Array(g.attributes.position.count * 3);
    for (let i = 0; i < colours.length; i += 3) colours.set(c, i);
    g.setAttribute('color', new THREE.BufferAttribute(colours, 3));
    g.setAttribute('aBoat', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(index), 1));
    parts.push(g);
  };
  const s = boat.size;
  colour(new THREE.BoxGeometry(10 * s, 1.6 * s, 3 * s).translate(0, 0.4 * s, 0), boat.hull);
  // Sails: flat triangles (the material draws both sides).
  const sail = (points: number[], c: Colour) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(points.map((v) => v * s), 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 2));
    g.computeVertexNormals();
    colour(g, c);
  };
  sail([-3.4, 1.4, 0, 0.6, 1.4, 0, 0.6, 12.5, 0], boat.sail);
  sail([1.1, 1.4, 0.05, 4.8, 1.4, 0.05, 1.1, 10.5, 0.05], boat.sail);
  colour(new THREE.BoxGeometry(0.25 * s, 12 * s, 0.25 * s).translate(0.8 * s, 6.8 * s, 0), [0.3, 0.28, 0.26]);
  return mergeGeometries(parts, false);
}

/**
 * A few sailing boats out on the bay, gliding slowly to and fro along their
 * stretch of water, rocking on the swell.
 */
export function createBoats(sunDirection: THREE.Vector3) {
  const geometry = mergeGeometries(BOATS.map((boat, i) => boatGeometry(boat, i)), false);
  geometry.computeBoundingSphere();
  const place = BOATS.map((b) => new THREE.Vector4(b.x, b.z, b.range, (Math.PI * 2) / b.period));
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDir: { value: sunDirection },
      uTime: { value: 0 },
      uHaze: { value: 1 },
      uPlace: { value: place },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform vec4 uPlace[${BOATS.length}];
      attribute float aBoat;
      attribute vec3 color;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying vec3 vColour;
      void main() {
        vec4 place = uPlace[int(aBoat + 0.5)];
        float phase = uTime * place.w + aBoat * 1.7;
        // To and fro: heading one way, then turning back.
        float heading = cos(phase) >= 0.0 ? 1.0 : -1.0;
        vec3 p = position;
        p.x *= heading;
        // Rocking on the swell, heeling a little to the wind.
        float roll = 0.08 + 0.05 * sin(uTime * 0.9 + aBoat * 2.1);
        float pitch = 0.03 * sin(uTime * 0.7 + aBoat);
        p = vec3(p.x, p.y * cos(roll) - p.z * sin(roll), p.y * sin(roll) + p.z * cos(roll));
        p = vec3(p.x * cos(pitch) - p.y * sin(pitch), p.x * sin(pitch) + p.y * cos(pitch), p.z);
        vec3 n = normal;
        n.x *= heading;
        vec3 world = vec3(place.x + place.z * sin(phase), p.y, place.y) + vec3(p.x, 0.0, p.z);
        vWorld = world;
        vNormal = n;
        vColour = color;
        gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
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
        vec3 n = normalize(vNormal);
        // Sails are thin: lit on whichever side is seen (a boat heading back
        // is mirrored, so the facing of its triangles says nothing).
        n = dot(n, cameraPosition - vWorld) < 0.0 ? -n : n;
        vec3 col = lightGround(vColour, n, cloudSun(vWorld)) * 1.1;
        gl_FragColor = vec4(addHaze(col, vWorld, cameraPosition), 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return { mesh, material };
}
