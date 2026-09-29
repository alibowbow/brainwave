import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLSL_NOISE } from './glsl';
import {
  GLASS_BOTTOM, GLASS_Z, LAMP_BASE, MUG_POSITION, MULLION_WIDTH, MULLION_X, PLANT_POSITION, VASE_POSITION,
} from './layout';
import {
  createLampShadowUniforms, createOcclusionUniforms, patchMaterial, type LampShadowUniforms, type OcclusionUniforms,
} from './materials';
import { mulberry32, range, type Rng } from './random';
import type { BakedTextures } from './textures';

/** Warm 2700 K lamp light in linear sRGB. */
export const LAMP_COLOR = new THREE.Color(1.0, 0.64, 0.34);

const CASTER_LAYER = 2;

export interface Interior {
  group: THREE.Group;
  lamp: {
    light: THREE.SpotLight;
    bulb: THREE.Vector3;
    direction: THREE.Vector3;
    angle: number;
  };
  windowLight: THREE.RectAreaLight;
  windowLightBase: number;
  shadowUniforms: LampShadowUniforms;
  occlusionUniforms: OcclusionUniforms;
  environmentScene: THREE.Scene;
  /** Render the static lamp depth map used by every PCSS receiver. */
  renderLampShadow(renderer: THREE.WebGLRenderer, size: number): void;
  update(time: number, camera: THREE.PerspectiveCamera, focal: number): void;
  dispose(): void;
}

const v = (x: number, y: number) => new THREE.Vector2(x, y);

/** Catmull-Rom resampling of a 2D profile for smooth lathes. */
function smoothProfile(points: THREE.Vector2[], samplesPerSegment = 4) {
  const curve = new THREE.SplineCurve(points);
  return curve.getPoints((points.length - 1) * samplesPerSegment);
}

function lathe(points: THREE.Vector2[], segments = 72, smooth = true) {
  const geometry = new THREE.LatheGeometry(smooth ? smoothProfile(points) : points, segments);
  // Put the seam at the back, away from the camera.
  geometry.rotateY(Math.PI);
  return geometry;
}

function markCaster(object: THREE.Object3D) {
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) child.layers.enable(CASTER_LAYER);
  });
}

/** Heart-shaped pothos leaf on a radial grid so it can bend and fold. */
function leafGeometry(rng: Rng, length: number, widthRatio: number) {
  const W = length * widthRatio;
  const outlineKeys = [
    [0, 1.0], [0.07, 0.94], [0.23, 0.78], [0.4, 0.55], [0.48, 0.33], [0.46, 0.14], [0.33, 0.0], [0.17, -0.045], [0.05, 0.0], [0, 0.07],
  ];
  const right = outlineKeys.map(([x, y]) => new THREE.Vector3(x * W / 0.48 * 0.5, y * length, 0));
  const left = right.slice(1, -1).reverse().map((p) => new THREE.Vector3(-p.x, p.y, 0));
  const loop = new THREE.CatmullRomCurve3([...right, ...left], true, 'centripetal', 0.5);
  const outline = loop.getPoints(96).map((p) => new THREE.Vector2(p.x, p.y));
  const center = new THREE.Vector2(0, length * 0.42);
  const angles = 40;
  const rings = 5;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const rayHit = (angle: number) => {
    const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
    let best = Infinity;
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i];
      const b = outline[(i + 1) % outline.length];
      const e = new THREE.Vector2().subVectors(b, a);
      const denom = dir.x * e.y - dir.y * e.x;
      if (Math.abs(denom) < 1e-9) continue;
      const ac = new THREE.Vector2().subVectors(a, center);
      const t = (ac.x * e.y - ac.y * e.x) / denom;
      const s = (ac.x * dir.y - ac.y * dir.x) / denom;
      if (t > 0 && s >= 0 && s <= 1) best = Math.min(best, t);
    }
    return Number.isFinite(best) ? best : length * 0.3;
  };
  const fold = range(rng, 0.18, 0.42);
  const droop = range(rng, 0.08, 0.34) * (rng() < 0.2 ? -0.6 : 1);
  const wave = range(rng, 0.0008, 0.0022);
  const wavePhase = rng() * 6.28;
  const place = (x: number, y: number) => {
    const ax = Math.abs(x) / (W * 0.5);
    const along = y / length;
    let z = Math.abs(x) * fold;
    z -= droop * along * along * length;
    z += Math.sin(along * 7 + wavePhase) * ax * ax * wave;
    positions.push(x, y, z);
    uvs.push(x / length, along);
  };
  place(center.x, center.y);
  for (let r = 1; r <= rings; r++) {
    for (let a = 0; a < angles; a++) {
      const angle = (a / angles) * Math.PI * 2;
      const reach = rayHit(angle) * Math.pow(r / rings, 0.92);
      place(center.x + Math.cos(angle) * reach, center.y + Math.sin(angle) * reach);
    }
  }
  const ringStart = (r: number) => 1 + (r - 1) * angles;
  for (let a = 0; a < angles; a++) indices.push(0, ringStart(1) + a, ringStart(1) + ((a + 1) % angles));
  for (let r = 1; r < rings; r++) {
    for (let a = 0; a < angles; a++) {
      const a0 = ringStart(r) + a;
      const a1 = ringStart(r) + ((a + 1) % angles);
      const b0 = ringStart(r + 1) + a;
      const b1 = ringStart(r + 1) + ((a + 1) % angles);
      indices.push(a0, b0, b1, a0, b1, a1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** One page block of an open notebook, curving down into the gutter. */
function pageBlock(width: number, length: number, stack: number, side: -1 | 1) {
  const segU = 28;
  const segV = 6;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const heightAt = (u: number) => stack * (1 - Math.exp(-u * 15)) + 0.0028 * Math.sin(Math.PI * Math.min(1, u * 1.05));
  for (let j = 0; j <= segV; j++) {
    for (let i = 0; i <= segU; i++) {
      const u = i / segU;
      const w = j / segV;
      positions.push(side * u * width, heightAt(u), (w - 0.5) * length);
      uvs.push(side < 0 ? 0.5 - u * 0.5 : 0.5 + u * 0.5, 1 - w);
    }
  }
  const row = segU + 1;
  for (let j = 0; j < segV; j++) {
    for (let i = 0; i < segU; i++) {
      const a = j * row + i;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      if (side > 0) indices.push(a, c, b, b, c, d);
      else indices.push(a, b, c, b, d, c);
    }
  }
  // Near edge of the stack, facing the viewer.
  const base = positions.length / 3;
  for (let i = 0; i <= segU; i++) {
    const u = i / segU;
    positions.push(side * u * width, 0, length / 2, side * u * width, heightAt(u), length / 2);
    uvs.push(0.5, 0.02, 0.5, 0.03);
  }
  for (let i = 0; i < segU; i++) {
    const a = base + i * 2;
    if (side > 0) indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    else indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  // Outer edge.
  const outer = positions.length / 3;
  for (let j = 0; j <= segV; j++) {
    const z = (j / segV - 0.5) * length;
    positions.push(side * width, 0, z, side * width, heightAt(1), z);
    uvs.push(0.5, 0.02, 0.5, 0.03);
  }
  for (let j = 0; j < segV; j++) {
    const a = outer + j * 2;
    if (side > 0) indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    else indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return { geometry, heightAt };
}

const STEAM_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const STEAM_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  vec2 p = vUv;
  float t = uTime * 0.11 + uSeed * 10.0;
  vec2 q = vec2(p.x * 2.2, p.y * 1.6 - t * 1.4);
  float warp = fbm(q * 1.3 + vec2(uSeed * 3.0, -t * 0.6));
  float n = fbm(vec2(q.x * 1.7 + warp * 1.6, q.y * 0.9 + warp * 0.4));
  float sway = (warp - 0.5) * 0.38 * p.y + sin(p.y * 5.0 + t * 3.0 + uSeed * 4.0) * 0.04 * p.y;
  float width = mix(0.06, 0.3, p.y);
  float column = exp(-pow((p.x - 0.5 - sway) / width, 2.0));
  float fade = smoothstep(0.0, 0.14, p.y) * (1.0 - smoothstep(0.45, 1.0, p.y));
  float density = smoothstep(0.42, 0.82, n) * column * fade;
  gl_FragColor = vec4(uColor * density, 1.0);
}
`;

const DUST_VERTEX = /* glsl */ `
attribute vec4 aSeed;
uniform float uTime;
uniform vec3 uBulb;
uniform vec3 uDirection;
uniform float uCosOuter;
uniform float uCosInner;
uniform float uFocal;
varying float vGlow;
void main() {
  vec3 p = position;
  float t = uTime * (0.35 + aSeed.x * 0.4);
  p.x += sin(t * 0.21 + aSeed.y * 6.2831) * 0.018 + sin(t * 0.53 + aSeed.z * 4.0) * 0.006;
  p.z += cos(t * 0.17 + aSeed.z * 6.2831) * 0.016;
  p.y += mod(aSeed.w * 0.3 + t * 0.004, 0.3) - 0.15 + sin(t * 0.3 + aSeed.x * 7.0) * 0.01;
  vec3 toMote = p - uBulb;
  float d = length(toMote);
  float cone = smoothstep(uCosOuter, uCosInner, dot(toMote / d, uDirection));
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed.y * 1.7) + aSeed.w * 30.0);
  vGlow = cone * twinkle / (d * d * 30.0 + 0.4);
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  float size = (0.00045 + aSeed.x * 0.0009) * uFocal / max(-view.z, 0.05);
  // Sub-pixel motes keep their energy instead of shimmering.
  vGlow *= min(1.0, size * size);
  gl_PointSize = max(size, 1.0);
  gl_Position = projectionMatrix * view;
}
`;

const DUST_FRAGMENT = /* glsl */ `
uniform vec3 uColor;
varying float vGlow;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = dot(c, c) * 4.0;
  float soft = exp(-r * 3.0);
  gl_FragColor = vec4(uColor * vGlow * soft, 1.0);
}
`;

const BEAM_VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const BEAM_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uBulb;
uniform vec3 uDirection;
uniform float uCosOuter;
uniform float uTime;
uniform vec3 uColor;
varying vec3 vWorld;
void main() {
  vec3 view = normalize(vWorld - cameraPosition);
  // March a few steps through the cone behind this fragment to gather in-scattered light.
  float sum = 0.0;
  for (int i = 0; i < 12; i++) {
    vec3 p = vWorld + view * (float(i) + 0.5) * 0.03;
    vec3 toP = p - uBulb;
    float d = length(toP);
    float along = dot(toP, uDirection);
    float cone = smoothstep(uCosOuter, uCosOuter + 0.12, along / d);
    float haze = 0.55 + 0.45 * vnoise(p.xz * 18.0 + p.y * 7.0 + uTime * 0.05);
    sum += cone * haze * step(0.0, p.y) / (d * d * 14.0 + 0.25);
  }
  gl_FragColor = vec4(uColor * sum / 12.0, 1.0);
}
`;

export function buildInterior(textures: BakedTextures, seed = 11): Interior {
  const rng = mulberry32(seed);
  const group = new THREE.Group();
  const disposables: { dispose(): void }[] = [];
  const shadow = createLampShadowUniforms();
  const occlusion = createOcclusionUniforms();
  const track = <T extends { dispose(): void }>(item: T) => { disposables.push(item); return item; };
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, cast = true) => {
    const mesh = new THREE.Mesh(track(geometry), material);
    if (cast) mesh.layers.enable(CASTER_LAYER);
    group.add(mesh);
    return mesh;
  };

  // ---------- Desk and window frame ----------
  const deskMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    map: textures.deskAlbedo,
    roughnessMap: textures.deskSurface,
    normalMap: textures.deskNormal,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness: 1,
    metalness: 0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.38,
    specularIntensity: 0.4,
  }), { lampShadow: shadow, occlusion }));
  add(new THREE.PlaneGeometry(2.6, 1.3).rotateX(-Math.PI / 2).translate(0, 0, 0.03), deskMaterial, false);

  const frameMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.014, 0.0145, 0.016),
    metalness: 0.7,
    roughness: 0.34,
    clearcoat: 0.25,
    clearcoatRoughness: 0.25,
  }), { lampShadow: shadow, occlusion, groundContact: true }));
  const rail = add(new RoundedBoxGeometry(6.8, GLASS_BOTTOM + 0.004, 0.11, 3, 0.008), frameMaterial, false);
  rail.position.set(0, (GLASS_BOTTOM + 0.004) / 2 - 0.004, GLASS_Z - 0.012);
  for (const x of MULLION_X) {
    const mullion = add(new RoundedBoxGeometry(MULLION_WIDTH, 2.9, 0.11, 3, 0.008), frameMaterial, false);
    mullion.position.set(x, GLASS_BOTTOM + 1.45, GLASS_Z - 0.012);
  }
  // A slim glazing bead where each pane meets the frame.
  const beadMaterial = track(new THREE.MeshStandardMaterial({ color: new THREE.Color(0.006, 0.006, 0.007), roughness: 0.55 }));
  const bead = add(new THREE.BoxGeometry(6.8, 0.006, 0.012), beadMaterial, false);
  bead.position.set(0, GLASS_BOTTOM + 0.003, GLASS_Z + 0.006);
  for (const x of MULLION_X) {
    for (const side of [-1, 1]) {
      const edge = add(new THREE.BoxGeometry(0.006, 2.8, 0.012), beadMaterial, false);
      edge.position.set(x + side * (MULLION_WIDTH / 2 + 0.003), GLASS_BOTTOM + 1.4, GLASS_Z + 0.006);
    }
  }

  // ---------- Desk lamp ----------
  const lampBase = new THREE.Vector3(LAMP_BASE.x, 0, LAMP_BASE.z);
  const joint = new THREE.Vector3(LAMP_BASE.x + 0.02, 0.462, LAMP_BASE.z - 0.005);
  const shadeTop = joint.clone().add(new THREE.Vector3(-0.014, -0.006, 0.008));
  const direction = new THREE.Vector3(-0.46, -0.835, 0.3).normalize();
  const bulb = shadeTop.clone().addScaledVector(direction, 0.046);
  const lampBody = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.006, 0.006, 0.0066),
    roughness: 0.52,
    clearcoat: 0.18,
    clearcoatRoughness: 0.38,
  }), { lampShadow: shadow, groundContact: true }));
  const base = add(lathe([v(0, 0), v(0.072, 0), v(0.0758, 0.0016), v(0.0772, 0.0055), v(0.0768, 0.0112), v(0.0748, 0.0146), v(0.069, 0.0162), v(0.03, 0.0174), v(0, 0.018)], 96), lampBody);
  base.position.copy(lampBase);
  const stemHeight = joint.y - 0.016;
  const stem = add(new THREE.CylinderGeometry(0.0052, 0.0052, stemHeight, 24).translate(0, stemHeight / 2 + 0.016, 0), lampBody);
  stem.position.set(joint.x, 0, joint.z);
  const collar = add(new THREE.CylinderGeometry(0.0085, 0.011, 0.012, 32).translate(0, 0.022, 0), lampBody);
  collar.position.set(joint.x, 0, joint.z);
  const knuckle = add(new THREE.SphereGeometry(0.0088, 24, 16), lampBody);
  knuckle.position.copy(joint);
  const neckLength = joint.distanceTo(shadeTop) + 0.012;
  const neck = add(new THREE.CylinderGeometry(0.0046, 0.0046, neckLength, 16), lampBody);
  neck.position.copy(joint).lerp(shadeTop, 0.5);
  neck.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), shadeTop.clone().sub(joint).normalize());

  const shadeLength = 0.128;
  const topRadius = 0.0265;
  const openRadius = 0.0625;
  const outerProfile: THREE.Vector2[] = [v(0, 0.0032), v(0.0105, 0.0032), v(0.019, 0.0014), v(0.0243, -0.0032), v(topRadius, -0.0105)];
  for (let i = 1; i <= 10; i++) {
    const t = i / 10;
    outerProfile.push(v(topRadius + (openRadius - topRadius) * Math.pow(t, 0.92), -0.0105 - t * (shadeLength - 0.0105)));
  }
  const shadeGroup = new THREE.Group();
  shadeGroup.position.copy(shadeTop);
  shadeGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction);
  group.add(shadeGroup);
  // Lathe normals follow the profile direction: outer runs rim → top so it faces outward,
  // the lining runs top → rim so it faces the axis.
  const shadeOuter = new THREE.Mesh(track(new THREE.LatheGeometry([...outerProfile].reverse(), 96)), lampBody);
  shadeOuter.layers.enable(CASTER_LAYER);
  shadeGroup.add(shadeOuter);
  const shadeInnerMaterial = track(patchMaterial(new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.8, 0.78, 0.74),
    roughness: 0.6,
    emissive: LAMP_COLOR,
  }), {
    uniforms: { uBulb: { value: bulb }, uShadeGlow: { value: 0.045 } },
    fragmentHeader: 'uniform vec3 uBulb;\nuniform float uShadeGlow;',
    fragmentEmissive: `
      vec3 rwToBulb = uBulb - vWPos;
      float rwRho2 = dot(rwToBulb, rwToBulb);
      float rwCos = max(dot(normalize(vWNormal), rwToBulb * inversesqrt(rwRho2)), 0.0);
      totalEmissiveRadiance *= uShadeGlow * (0.25 + 0.75 * rwCos) / (rwRho2 + 0.0006);`,
  }));
  const innerProfile = outerProfile.slice(3).map((p) => v(Math.max(0, p.x - 0.0012), p.y));
  const shadeInner = new THREE.Mesh(track(new THREE.LatheGeometry(innerProfile, 96)), shadeInnerMaterial);
  shadeGroup.add(shadeInner);
  const rimMaterial = track(new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.02, 0.019, 0.018), roughness: 0.3, metalness: 0.6 }));
  const rimMesh = new THREE.Mesh(track(new THREE.TorusGeometry(openRadius, 0.0012, 10, 128).rotateX(Math.PI / 2)), rimMaterial);
  rimMesh.position.y = -shadeLength;
  shadeGroup.add(rimMesh);
  const bulbMaterial = track(new THREE.MeshBasicMaterial({ color: LAMP_COLOR.clone().multiplyScalar(55) }));
  const bulbMesh = new THREE.Mesh(track(new THREE.SphereGeometry(0.017, 32, 16)), bulbMaterial);
  bulbMesh.position.copy(bulb);
  group.add(bulbMesh);

  const angle = Math.atan(openRadius / (shadeLength - 0.046)) * 0.98;
  const spot = new THREE.SpotLight(LAMP_COLOR, 8.5, 0, angle, 0.72, 2);
  spot.position.copy(bulb);
  spot.target.position.copy(bulb).add(direction);
  group.add(spot, spot.target);

  const bounce = new THREE.PointLight(new THREE.Color(1.0, 0.62, 0.36), 0.05, 1.1, 2);
  bounce.position.set(0.19, 0.05, -0.07);
  group.add(bounce);

  const windowLight = new THREE.RectAreaLight(new THREE.Color(0.42, 0.56, 1.0), 0.5, 3.2, 1.3);
  windowLight.position.set(0.05, 0.75, GLASS_Z - 0.01);
  windowLight.lookAt(0.05, 0.45, 1.0);
  group.add(windowLight);
  group.add(new THREE.HemisphereLight(new THREE.Color(0.08, 0.1, 0.16), new THREE.Color(0.02, 0.015, 0.012), 0.12));

  // ---------- Mug with coffee and steam ----------
  const mugMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.016, 0.016, 0.018),
    map: textures.ceramicTone,
    roughnessMap: textures.ceramicSurface,
    roughness: 0.62,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
  }), { lampShadow: shadow, groundContact: true }));
  const mug = new THREE.Group();
  mug.position.set(MUG_POSITION.x, 0, MUG_POSITION.z);
  group.add(mug);
  const mugBody = new THREE.Mesh(track(lathe([
    v(0, 0.0016), v(0.028, 0.0016), v(0.0335, 0), v(0.0368, 0.0012), v(0.0386, 0.005), v(0.0393, 0.012), v(0.0399, 0.04),
    v(0.0405, 0.07), v(0.041, 0.09), v(0.0409, 0.0936), v(0.0401, 0.0953), v(0.0389, 0.0957), v(0.0377, 0.095), v(0.0371, 0.0926),
    v(0.0365, 0.07), v(0.0357, 0.04), v(0.0347, 0.018), v(0.032, 0.0106), v(0.02, 0.0093), v(0, 0.009),
  ], 96)), mugMaterial);
  mugBody.layers.enable(CASTER_LAYER);
  mug.add(mugBody);
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0386, 0.079, 0), new THREE.Vector3(0.0525, 0.0826, 0), new THREE.Vector3(0.0648, 0.0716, 0),
    new THREE.Vector3(0.0676, 0.052, 0), new THREE.Vector3(0.0622, 0.0322, 0), new THREE.Vector3(0.0488, 0.0226, 0), new THREE.Vector3(0.0378, 0.0238, 0),
  ]);
  const handle = new THREE.Mesh(track(new THREE.TubeGeometry(handleCurve, 72, 0.0047, 18).scale(1, 1, 1.45)), mugMaterial);
  handle.layers.enable(CASTER_LAYER);
  handle.rotation.y = -0.12;
  mug.add(handle);
  const coffeeMaterial = track(new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.018, 0.008, 0.004), roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.03 }));
  const coffee = new THREE.Mesh(track(new THREE.CircleGeometry(0.0364, 48).rotateX(-Math.PI / 2)), coffeeMaterial);
  coffee.position.y = 0.079;
  mug.add(coffee);

  const steamMaterials: THREE.ShaderMaterial[] = [];
  const steamGroup = new THREE.Group();
  steamGroup.position.set(MUG_POSITION.x, 0.1, MUG_POSITION.z);
  group.add(steamGroup);
  for (let i = 0; i < 3; i++) {
    const material = track(new THREE.ShaderMaterial({
      vertexShader: STEAM_VERTEX,
      fragmentShader: STEAM_FRAGMENT,
      uniforms: { uTime: { value: 0 }, uSeed: { value: i * 0.37 + 0.1 }, uColor: { value: LAMP_COLOR.clone().multiplyScalar(0.11).add(new THREE.Color(0.008, 0.011, 0.018)) } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    steamMaterials.push(material);
    const plume = new THREE.Mesh(track(new THREE.PlaneGeometry(0.075, 0.2).translate(0, 0.1, 0)), material);
    plume.position.set((i - 1) * 0.008, 0, (i - 1) * 0.006);
    plume.userData.billboard = true;
    steamGroup.add(plume);
  }

  // ---------- Plant ----------
  const potMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.03, 0.031, 0.034),
    map: textures.ceramicTone,
    roughnessMap: textures.ceramicSurface,
    roughness: 1.2,
    clearcoat: 0.1,
    clearcoatRoughness: 0.6,
  }), { lampShadow: shadow, groundContact: true }));
  const pot = add(lathe([
    v(0, 0.0), v(0.058, 0.0), v(0.072, 0.005), v(0.087, 0.026), v(0.096, 0.06), v(0.0955, 0.098), v(0.0905, 0.125), v(0.0885, 0.1355),
    v(0.0858, 0.1382), v(0.0826, 0.1366), v(0.0812, 0.13), v(0.0806, 0.12), v(0, 0.12),
  ], 96), potMaterial);
  pot.position.set(PLANT_POSITION.x, 0, PLANT_POSITION.z);
  const soilMaterial = track(new THREE.MeshStandardMaterial({ color: new THREE.Color(0.012, 0.008, 0.005), roughness: 1 }));
  const soil = add(new THREE.CircleGeometry(0.081, 40).rotateX(-Math.PI / 2), soilMaterial, false);
  soil.position.set(PLANT_POSITION.x, 0.121, PLANT_POSITION.z);

  const stemPieces: THREE.BufferGeometry[] = [];
  const leafPieces: THREE.BufferGeometry[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  const toCamera = new THREE.Vector3(0.35, 0.1, 1).normalize();
  const vines = 16;
  for (let i = 0; i < vines; i++) {
    const azimuth = (i / vines) * Math.PI * 2 + range(rng, -0.25, 0.25);
    const outward = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth));
    const start = new THREE.Vector3(PLANT_POSITION.x, 0.12, PLANT_POSITION.z).addScaledVector(outward, range(rng, 0.008, 0.045));
    const height = range(rng, 0.1, 0.3);
    const reach = range(rng, 0.06, 0.19);
    const droopAmount = range(rng, 0.0, 0.1);
    const points = [
      start.clone(),
      start.clone().addScaledVector(up, height * 0.45).addScaledVector(outward, reach * 0.12),
      start.clone().addScaledVector(up, height * 0.85).addScaledVector(outward, reach * 0.48),
      start.clone().addScaledVector(up, height).addScaledVector(outward, reach * 0.85),
      start.clone().addScaledVector(up, height - droopAmount).addScaledVector(outward, reach * 1.12),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    stemPieces.push(new THREE.TubeGeometry(curve, 28, 0.0021, 6));
    const leafTs = [0.16, 0.3, 0.44, 0.58, 0.72, 0.86, 0.99].filter((t, index) => index === 6 || rng() < 0.78);
    leafTs.forEach((t, index) => {
      const node = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      const side = new THREE.Vector3().crossVectors(tangent, up).normalize().multiplyScalar(index % 2 === 0 ? 1 : -1);
      if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
      const petioleDir = new THREE.Vector3().addScaledVector(outward, 0.55).addScaledVector(side, 0.65).addScaledVector(up, 0.45).normalize();
      const petioleLength = range(rng, 0.012, 0.028);
      const leafBase = node.clone().addScaledVector(petioleDir, petioleLength);
      stemPieces.push(new THREE.TubeGeometry(new THREE.LineCurve3(node, leafBase), 3, 0.0014, 5));

      const length = range(rng, 0.048, 0.078) * (t > 0.9 ? 0.8 : 1);
      const leaf = leafGeometry(rng, length, range(rng, 0.74, 0.86));
      const along = new THREE.Vector3().addScaledVector(petioleDir, 0.8).addScaledVector(outward, 0.3).addScaledVector(up, range(rng, -0.35, 0.55)).normalize();
      const facing = new THREE.Vector3().addScaledVector(up, 0.7).addScaledVector(toCamera, 0.55).addScaledVector(outward, 0.2)
        .add(new THREE.Vector3(range(rng, -0.3, 0.3), 0, range(rng, -0.3, 0.3)));
      const normal = facing.sub(along.clone().multiplyScalar(facing.dot(along))).normalize();
      const across = new THREE.Vector3().crossVectors(along, normal).normalize();
      const basis = new THREE.Matrix4().makeBasis(across, along, normal);
      basis.setPosition(leafBase);
      leaf.applyMatrix4(basis);
      const tint = new Float32Array(leaf.getAttribute('position').count).fill(rng());
      leaf.setAttribute('aLeafTint', new THREE.BufferAttribute(tint, 1));
      leafPieces.push(leaf);
    });
  }
  const stemMaterial = track(patchMaterial(new THREE.MeshStandardMaterial({ color: new THREE.Color(0.05, 0.075, 0.028), roughness: 0.6 }), { lampShadow: shadow }));
  const stems = new THREE.Mesh(track(mergeGeometries(stemPieces)), stemMaterial);
  stems.layers.enable(CASTER_LAYER);
  group.add(stems);
  for (const piece of stemPieces) piece.dispose();

  const windowGlow = new THREE.Color(0.045, 0.06, 0.1);
  const leafMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.036, 0.1, 0.03),
    roughness: 0.38,
    clearcoat: 0.55,
    clearcoatRoughness: 0.28,
    side: THREE.DoubleSide,
  }), {
    lampShadow: shadow,
    uniforms: { uWindowGlow: { value: windowGlow } },
    vertexHeader: 'attribute float aLeafTint;\nvarying float vLeafTint;\nvarying vec2 vLeafUv;',
    vertexMain: 'vLeafTint = aLeafTint;\n  vLeafUv = uv;',
    fragmentHeader: `varying float vLeafTint;\nvarying vec2 vLeafUv;\nuniform vec3 uWindowGlow;\n${GLSL_NOISE}`,
    fragmentColor: `
      float rwAx = abs(vLeafUv.x);
      float rwMidrib = 1.0 - smoothstep(0.0, 0.01, rwAx);
      float rwVein = (1.0 - smoothstep(0.02, 0.07, abs(fract(vLeafUv.y * 5.0 - pow(rwAx, 0.75) * 5.5) - 0.5))) * (1.0 - smoothstep(0.1, 0.32, rwAx)) * smoothstep(0.03, 0.08, rwAx);
      vec3 rwTint = mix(vec3(0.82, 1.0, 0.78), vec3(1.35, 1.25, 0.72), vLeafTint);
      diffuseColor.rgb *= rwTint * (1.0 + rwMidrib * 0.55 + rwVein * 0.12);
      float rwVariegation = smoothstep(0.62, 0.8, fbm(vec2(vLeafUv.x * 9.0 + vLeafUv.y * 3.0, vLeafUv.y * 4.0) + vLeafTint * 17.0));
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.3, 0.34, 0.08), rwVariegation * 0.3);
    `,
    fragmentOutput: `
      {
        vec3 rwN = normalize(vWNormal) * (gl_FrontFacing ? 1.0 : -1.0);
        vec3 rwToWindow = normalize(vec3(vWPos.x * 0.7, max(vWPos.y, 0.3) + 0.25, ${GLASS_Z.toFixed(2)}) - vWPos);
        float rwBack = max(0.0, dot(-rwN, rwToWindow));
        outgoingLight += uWindowGlow * diffuseColor.rgb * vec3(9.0, 13.0, 5.0) * rwBack * (1.0 - rwMidrib * 0.5) * (0.7 + 0.6 * rwVein);
      }
    `,
  }));
  const leaves = new THREE.Mesh(track(mergeGeometries(leafPieces)), leafMaterial);
  leaves.layers.enable(CASTER_LAYER);
  group.add(leaves);
  for (const piece of leafPieces) piece.dispose();

  // ---------- Vase ----------
  const vaseMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.29, 0.28, 0.265),
    map: textures.ceramicTone,
    roughnessMap: textures.ceramicSurface,
    roughness: 1.5,
  }), { lampShadow: shadow, groundContact: true }));
  const vase = add(lathe([
    v(0, 0), v(0.03, 0), v(0.0362, 0.004), v(0.0418, 0.028), v(0.0432, 0.058), v(0.0372, 0.098), v(0.0215, 0.124), v(0.0138, 0.136),
    v(0.0126, 0.149), v(0.0146, 0.1575), v(0.0128, 0.1605), v(0.0098, 0.156), v(0.0094, 0.13), v(0, 0.128),
  ], 96), vaseMaterial);
  vase.position.set(VASE_POSITION.x, 0, VASE_POSITION.z);

  // ---------- Open notebook with a pen ----------
  const notebookCenter = new THREE.Vector3(-0.035, 0, 0.02);
  const notebookAngle = -0.07;
  const notebook = new THREE.Group();
  notebook.position.copy(notebookCenter);
  notebook.rotation.y = notebookAngle;
  group.add(notebook);
  const paperMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    map: textures.paper,
    roughness: 0.88,
    sheen: 0.4,
    sheenRoughness: 0.8,
    sheenColor: new THREE.Color(0.6, 0.58, 0.55),
  }), { lampShadow: shadow, occlusion }));
  const pageWidth = 0.148;
  const pageLength = 0.21;
  const stack = 0.0062;
  const coverThickness = 0.0028;
  let pageHeight = (_u: number) => 0;
  for (const side of [-1, 1] as const) {
    const block = pageBlock(pageWidth, pageLength, stack, side);
    pageHeight = block.heightAt;
    const pages = new THREE.Mesh(track(block.geometry), paperMaterial);
    pages.position.y = coverThickness;
    pages.layers.enable(CASTER_LAYER);
    notebook.add(pages);
  }
  const coverMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.018, 0.02, 0.026),
    normalMap: textures.cloth,
    normalScale: new THREE.Vector2(0.35, 0.35),
    roughness: 0.82,
    sheen: 0.5,
    sheenColor: new THREE.Color(0.1, 0.11, 0.14),
  }), { lampShadow: shadow, occlusion }));
  const cover = new THREE.Mesh(track(new RoundedBoxGeometry(pageWidth * 2 + 0.01, coverThickness, pageLength + 0.008, 2, 0.0012)), coverMaterial);
  cover.position.y = coverThickness / 2;
  cover.layers.enable(CASTER_LAYER);
  notebook.add(cover);

  const penBodyMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.01, 0.012, 0.016), roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.08 }), { lampShadow: shadow }));
  const penMetalMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.75, 0.62, 0.42), metalness: 1, roughness: 0.22 }), { lampShadow: shadow }));
  const pen = new THREE.Group();
  const penY = coverThickness + pageHeight(0.62) + 0.0045;
  pen.position.set(0.072, penY, 0.012);
  pen.rotation.set(0, 0.62, Math.PI / 2);
  notebook.add(pen);
  const penBody = new THREE.Mesh(track(new THREE.CylinderGeometry(0.0043, 0.0043, 0.118, 24)), penBodyMaterial);
  const penCap = new THREE.Mesh(track(new THREE.CylinderGeometry(0.0045, 0.0045, 0.012, 24)), penMetalMaterial);
  penCap.position.y = 0.062;
  const penTip = new THREE.Mesh(track(new THREE.ConeGeometry(0.0043, 0.016, 24)), penMetalMaterial);
  penTip.position.y = -0.067;
  penTip.rotation.x = Math.PI;
  const penClip = new THREE.Mesh(track(new THREE.BoxGeometry(0.0016, 0.042, 0.003)), penMetalMaterial);
  penClip.position.set(0.0048, 0.042, 0);
  for (const part of [penBody, penCap, penTip, penClip]) {
    part.layers.enable(CASTER_LAYER);
    pen.add(part);
  }

  // ---------- Closed book ----------
  const bookCenter = new THREE.Vector3(-0.44, 0, 0.035);
  const bookAngle = 0.2;
  const book = new THREE.Group();
  book.position.copy(bookCenter);
  book.rotation.y = bookAngle;
  group.add(book);
  const bookCoverMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.012, 0.018, 0.034),
    normalMap: textures.cloth,
    normalScale: new THREE.Vector2(0.4, 0.4),
    roughness: 0.78,
    sheen: 0.6,
    sheenColor: new THREE.Color(0.08, 0.1, 0.16),
  }), { lampShadow: shadow, occlusion, groundContact: true }));
  const bookPagesMaterial = track(patchMaterial(new THREE.MeshPhysicalMaterial({ color: new THREE.Color(0.55, 0.52, 0.46), roughness: 0.9 }), { lampShadow: shadow, occlusion }));
  const bookW = 0.16;
  const bookL = 0.235;
  const bookH = 0.026;
  const coverT = 0.0028;
  const lower = new THREE.Mesh(track(new RoundedBoxGeometry(bookW, coverT, bookL, 2, 0.001)), bookCoverMaterial);
  lower.position.y = coverT / 2;
  const upper = lower.clone();
  upper.position.y = bookH - coverT / 2;
  const spine = new THREE.Mesh(track(new RoundedBoxGeometry(0.006, bookH, bookL, 2, 0.002)), bookCoverMaterial);
  spine.position.set(-bookW / 2 + 0.002, bookH / 2, 0);
  const block = new THREE.Mesh(track(new THREE.BoxGeometry(bookW - 0.008, bookH - coverT * 2, bookL - 0.008)), bookPagesMaterial);
  block.position.set(0.001, bookH / 2, 0);
  for (const part of [lower, upper, spine, block]) {
    part.layers.enable(CASTER_LAYER);
    book.add(part);
  }

  // ---------- Occluders for the analytic desk occlusion ----------
  occlusion.uAoCylinders.value[0].set(MUG_POSITION.x, MUG_POSITION.z, 0.041, 0.095);
  occlusion.uAoCylinders.value[1].set(LAMP_BASE.x, LAMP_BASE.z, 0.077, 0.018);
  occlusion.uAoCylinders.value[2].set(PLANT_POSITION.x, PLANT_POSITION.z, 0.095, 0.14);
  occlusion.uAoCylinders.value[3].set(VASE_POSITION.x, VASE_POSITION.z, 0.042, 0.16);
  occlusion.uAoCylinders.value[4].set(joint.x, joint.z, 0.009, 0.46);
  occlusion.uAoBoxes.value[0].set(notebookCenter.x, notebookCenter.z, pageWidth + 0.005, pageLength / 2 + 0.004);
  occlusion.uAoBoxShape.value[0].set(notebookAngle, 0.009);
  occlusion.uAoBoxes.value[1].set(bookCenter.x, bookCenter.z, bookW / 2, bookL / 2);
  occlusion.uAoBoxShape.value[1].set(bookAngle, bookH);
  occlusion.uAoBoxes.value[2].set(0, GLASS_Z - 0.012, 3.4, 0.055);
  occlusion.uAoBoxShape.value[2].set(0, GLASS_BOTTOM);

  // ---------- Light in the air: dust motes and a faint beam ----------
  const cosOuter = Math.cos(angle);
  const cosInner = Math.cos(angle * 0.55);
  const moteCount = 220;
  const motePositions = new Float32Array(moteCount * 3);
  const moteSeeds = new Float32Array(moteCount * 4);
  for (let i = 0; i < moteCount; i++) {
    motePositions.set([range(rng, -0.05, 0.46), range(rng, 0.03, 0.4), range(rng, -0.42, 0.06)], i * 3);
    moteSeeds.set([rng(), rng(), rng(), rng()], i * 4);
  }
  const moteGeometry = track(new THREE.BufferGeometry());
  moteGeometry.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  moteGeometry.setAttribute('aSeed', new THREE.BufferAttribute(moteSeeds, 4));
  const dustMaterial = track(new THREE.ShaderMaterial({
    vertexShader: DUST_VERTEX,
    fragmentShader: DUST_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uBulb: { value: bulb },
      uDirection: { value: direction },
      uCosOuter: { value: cosOuter },
      uCosInner: { value: cosInner },
      uFocal: { value: 1000 },
      uColor: { value: LAMP_COLOR.clone().multiplyScalar(1.6) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  const dust = new THREE.Points(moteGeometry, dustMaterial);
  dust.frustumCulled = false;
  group.add(dust);

  const beamMaterial = track(new THREE.ShaderMaterial({
    vertexShader: BEAM_VERTEX,
    fragmentShader: BEAM_FRAGMENT,
    uniforms: {
      uBulb: { value: bulb },
      uDirection: { value: direction },
      uCosOuter: { value: cosOuter },
      uTime: { value: 0 },
      uColor: { value: LAMP_COLOR.clone().multiplyScalar(0.012) },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  }));
  const beamLength = bulb.y / -direction.y;
  const beamGeometry = new THREE.CylinderGeometry(0.03, Math.tan(angle) * beamLength, beamLength, 48, 1, true).translate(0, -beamLength / 2, 0);
  const beam = new THREE.Mesh(track(beamGeometry), beamMaterial);
  beam.position.copy(bulb);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction);
  beam.renderOrder = 5;
  group.add(beam);

  // ---------- Environment used for reflections and soft fill ----------
  const environmentScene = new THREE.Scene();
  environmentScene.background = new THREE.Color(0.0015, 0.0017, 0.0024);
  const roomMaterial = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(0.003, 0.0028, 0.0026), side: THREE.BackSide }));
  const room = new THREE.Mesh(track(new THREE.BoxGeometry(5, 3, 5).translate(0, 1.2, 1.9)), roomMaterial);
  environmentScene.add(room);
  const windowEnvMaterial = track(new THREE.ShaderMaterial({
    vertexShader: BEAM_VERTEX,
    fragmentShader: /* glsl */ `
      ${GLSL_NOISE}
      varying vec3 vWorld;
      void main() {
        float h = vWorld.y;
        vec3 sky = mix(vec3(0.035, 0.05, 0.1), vec3(0.012, 0.018, 0.04), smoothstep(0.4, 2.4, h));
        float band = exp(-pow((h - 0.3) / 0.12, 2.0));
        float lights = smoothstep(0.55, 0.95, vnoise(vec2(vWorld.x * 12.0, h * 18.0)));
        vec3 color = sky + vec3(0.12, 0.16, 0.3) * band + vec3(0.5, 0.55, 0.7) * lights * (0.2 + band) * smoothstep(2.0, 0.2, h) * 0.35;
        gl_FragColor = vec4(color, 1.0);
      }`,
    side: THREE.DoubleSide,
  }));
  const windowEnv = new THREE.Mesh(track(new THREE.PlaneGeometry(6.8, 2.6).translate(0, 1.38, GLASS_Z - 0.01)), windowEnvMaterial);
  environmentScene.add(windowEnv);
  const deskEnvMaterial = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(0.012, 0.007, 0.004) }));
  environmentScene.add(new THREE.Mesh(track(new THREE.PlaneGeometry(2.6, 1.3).rotateX(-Math.PI / 2).translate(0, 0, 0.03)), deskEnvMaterial));
  const poolMaterial = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(0.16, 0.09, 0.045) }));
  const pool = new THREE.Mesh(track(new THREE.CircleGeometry(0.22, 32).rotateX(-Math.PI / 2)), poolMaterial);
  pool.position.set(0.2, 0.001, -0.16);
  environmentScene.add(pool);
  const envBulbMaterial = track(new THREE.MeshBasicMaterial({ color: LAMP_COLOR.clone().multiplyScalar(30) }));
  const envBulb = new THREE.Mesh(track(new THREE.SphereGeometry(0.05, 16, 8)), envBulbMaterial);
  envBulb.position.copy(bulb);
  environmentScene.add(envBulb);

  // ---------- Static lamp depth map for PCSS ----------
  const shadowCamera = new THREE.PerspectiveCamera(96, 1, 0.03, 1.6);
  shadowCamera.position.copy(bulb);
  shadowCamera.up.set(0, 0, -1);
  shadowCamera.lookAt(bulb.clone().add(direction));
  shadowCamera.updateMatrixWorld();
  shadowCamera.layers.set(CASTER_LAYER);
  const depthMaterial = track(new THREE.MeshDepthMaterial({ side: THREE.DoubleSide }));
  let depthTarget: THREE.WebGLRenderTarget | null = null;

  const renderLampShadow = (renderer: THREE.WebGLRenderer, size: number) => {
    depthTarget?.dispose();
    const depthTexture = new THREE.DepthTexture(size, size, THREE.FloatType);
    depthTexture.minFilter = THREE.NearestFilter;
    depthTexture.magFilter = THREE.NearestFilter;
    depthTarget = new THREE.WebGLRenderTarget(size, size, { depthBuffer: true, depthTexture, type: THREE.UnsignedByteType });
    const scene = new THREE.Scene();
    scene.overrideMaterial = depthMaterial;
    const parent = group.parent;
    scene.add(group);
    const clearAlpha = renderer.getClearAlpha();
    renderer.setRenderTarget(depthTarget);
    renderer.setClearColor(0xffffff, 1);
    renderer.clear();
    renderer.render(scene, shadowCamera);
    renderer.setClearAlpha(clearAlpha);
    renderer.setRenderTarget(null);
    scene.remove(group);
    parent?.add(group);
    shadow.tLampDepth.value = depthTexture;
    shadow.uLampNear.value = shadowCamera.near;
    shadow.uLampFar.value = shadowCamera.far;
    shadow.uLampSize.value = 0.056 / (2 * Math.tan((shadowCamera.fov * Math.PI) / 360));
    shadow.uLampShadowTexel.value = 1 / size;
    shadow.uLampShadowMatrix.value.set(
      0.5, 0.0, 0.0, 0.5,
      0.0, 0.5, 0.0, 0.5,
      0.0, 0.0, 0.5, 0.5,
      0.0, 0.0, 0.0, 1.0,
    ).multiply(shadowCamera.projectionMatrix).multiply(shadowCamera.matrixWorldInverse);
  };

  const billboard = new THREE.Vector3();
  return {
    group,
    lamp: { light: spot, bulb, direction, angle },
    windowLight,
    windowLightBase: windowLight.intensity,
    shadowUniforms: shadow,
    occlusionUniforms: occlusion,
    environmentScene,
    renderLampShadow,
    update(time, camera, focal) {
      for (const material of steamMaterials) material.uniforms.uTime.value = time;
      dustMaterial.uniforms.uTime.value = time;
      dustMaterial.uniforms.uFocal.value = focal;
      beamMaterial.uniforms.uTime.value = time;
      steamGroup.children.forEach((plume) => {
        billboard.copy(camera.position);
        billboard.y = plume.getWorldPosition(new THREE.Vector3()).y;
        plume.lookAt(billboard);
      });
    },
    dispose() {
      depthTarget?.dispose();
      for (const item of disposables) item.dispose();
    },
  };
}
