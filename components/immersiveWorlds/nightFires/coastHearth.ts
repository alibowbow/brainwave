import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { fbm3, noise3 } from '../shared/render/noise';
import { createEmbers, createFlame, fireFlicker, type FlameOccluder } from '../shared/render/fireFlame';
import { boulderGeometry } from './landscape';
import { createWoodMaterial } from '../shared/render/woodSurface';
import { charMaterial, charredLogGeometry, emberBedMaterial, mesh, seeded, stoneMaterial, type Hearth } from './scenery';
import { framed } from './coastProps';

const tau = Math.PI * 2;

/**
 * A teepee fire in a ring of big, rounded beach stones (original): split logs
 * leaning together over a bed of coals, the shared ray-marched flame and GPU
 * embers, a flickering key light with soft shadows and a low bounce light.
 */
export function teepeeHearth(position: [number, number, number], options: { noise: THREE.Data3DTexture; lightIntensity?: number; bounceIntensity?: number; shadowMapSize?: number }): Hearth {
  const group = new THREE.Group();
  group.position.set(...position);
  group.name = 'Teepee campfire';
  const time = { value: 0 }, boost = { value: 0 };
  const random = seeded(51871);
  const centre = new THREE.Vector3(...position);

  // Rounded, sea-worn stones: few fracture planes, gentle erosion, sunk into the soil.
  const ringRadius = 0.74;
  const stones: THREE.BufferGeometry[] = [];
  const count = 12;
  for (let i = 0; i < count; i++) {
    const angle = i / count * tau + (random() - 0.5) * 0.12;
    const r = ringRadius + (random() - 0.5) * 0.05;
    const half: [number, number, number] = [0.14 + random() * 0.09, 0.09 + random() * 0.07, 0.12 + random() * 0.07];
    const g = boulderGeometry(610 + i * 13, 5, 5, 0.11);
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3(Math.cos(angle) * r, half[1] * 0.62, Math.sin(angle) * r),
      new THREE.Quaternion().setFromEuler(new THREE.Euler((random() - 0.5) * 0.2, -angle + Math.PI / 2 + (random() - 0.5) * 0.3, (random() - 0.5) * 0.15)),
      new THREE.Vector3(...half),
    ));
    stones.push(g);
  }
  const ring = mesh(mergeGeometries(stones), stoneMaterial('#a39b93', {
    key: 'coast-hearth-ring', scale: 3.2, bump: 1.1, stain: '#5a4234', stainAmount: 0.18, cavity: 0.5, strata: 0.08, drips: 0, dryRoughness: 0.8,
  }, { centre, radius: ringRadius }));
  stones.forEach((g) => g.dispose());
  ring.name = 'Ring of rounded beach stones';
  group.add(ring);

  // Ash bed, a low displaced mound whose heat falls off from the centre.
  const rings = 16, sides = 48;
  const bedPositions: number[] = [], bedHeat: number[] = [], bedIndex: number[] = [];
  for (let j = 0; j <= rings; j++) for (let i = 0; i <= sides; i++) {
    const q = j / rings, a = i / sides * tau, r = q * 0.66;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    bedPositions.push(x, 0.012 + 0.045 * Math.exp(-q * q * 4) + fbm3(x * 6, 0.3, z * 6, 3) * 0.011 * (1 - q * 0.5) - 0.02 * Math.pow(q, 6), z);
    bedHeat.push(THREE.MathUtils.clamp(1.05 - q * 1.3 + fbm3(x * 4, 1.7, z * 4, 2) * 0.3, 0, 1));
    if (j < rings && i < sides) { const n = j * (sides + 1) + i; bedIndex.push(n, n + sides + 1, n + 1, n + 1, n + sides + 1, n + sides + 2); }
  }
  const bedGeometry = new THREE.BufferGeometry();
  bedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bedPositions, 3));
  bedGeometry.setAttribute('aHeat', new THREE.Float32BufferAttribute(bedHeat, 1));
  bedGeometry.setIndex(bedIndex);
  bedGeometry.computeVertexNormals();
  const bed = mesh(bedGeometry, emberBedMaterial(time, boost, 'ash'));
  bed.castShadow = false;
  bed.name = 'Ash bed';
  group.add(bed);

  const coals: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 38; i++) {
    const a = random() * tau, r = Math.pow(random(), 0.8) * 0.4, s = 0.025 + random() * 0.04;
    const g = boulderGeometry(1300 + i, 2, 6);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, 0.03 + 0.05 * Math.exp(-r * r * 9) + s * 0.4, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(random() * 3, random() * 3, random() * 3)), new THREE.Vector3(s * 1.3, s * 0.7, s)));
    g.setAttribute('aHeat', new THREE.Float32BufferAttribute(new Array(g.attributes.position.count).fill(THREE.MathUtils.clamp(1.1 - r * 1.7 + (random() - 0.5) * 0.35, 0.05, 1)), 1));
    coals.push(g);
  }
  const coalMesh = mesh(mergeGeometries(coals), emberBedMaterial(time, boost, 'coal'));
  coals.forEach((g) => g.dispose());
  coalMesh.castShadow = false;
  coalMesh.name = 'Glowing coals';
  group.add(coalMesh);

  // Teepee: split wedges of firewood (pith at the apex, bark on the round back)
  // leaning together; sooted and glowing where they stand in the coals.
  const logs = new THREE.Group();
  logs.name = 'Teepee of split logs';
  const f = (n: number) => n.toFixed(4);
  const split = createWoodMaterial('#b08a64', { key: 'coast-teepee', axis: 'y', localFrame: true, pith: [0, 0], bark: '#3a2b20', rings: 85, figure: 0.55, pores: 0.3, wear: 0.08, bump: 1.4, roughness: 0.8 });
  const splitCompile = split.onBeforeCompile;
  split.onBeforeCompile = (shader, renderer) => {
    splitCompile.call(split, shader, renderer);
    shader.uniforms.uCharTime = time;
    shader.uniforms.uCharBoost = boost;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uCharTime;\nuniform float uCharBoost;')
      .replace('diffuseColor.rgb = wdColor;', `diffuseColor.rgb = wdColor;
float ctHeat = 0.0, ctCrack = 0.0;
{
  vec3 fp = vSurfaceWorld - vec3(${f(position[0])}, ${f(position[1])}, ${f(position[2])});
  float n1 = bwNoise(vSurfaceWorld * 9.0);
  float soot = 1.0 - smoothstep(0.14, 0.5, fp.y + n1 * 0.07);
  vec3 charColor = vec3(0.03, 0.025, 0.022) * (0.75 + 0.5 * bwNoise(vSurfaceWorld * 31.0));
  diffuseColor.rgb = mix(diffuseColor.rgb, charColor, soot * 0.92);
  float ash = smoothstep(0.3, 0.7, bwNoise(vSurfaceWorld * 24.0 + 4.0)) * soot * smoothstep(0.03, 0.25, fp.y);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.2, 0.19, 0.18), ash * 0.55);
  ctHeat = 1.0 - smoothstep(0.04, 0.26, fp.y + n1 * 0.05);
  ctCrack = smoothstep(0.78, 0.93, bwRidged(vSurfaceWorld * vec3(16.0, 7.0, 16.0)));
}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float breath = 0.55 + 0.45 * smoothstep(-0.5, 0.6, bwNoise(vec3(vSurfaceWorld.xz * 5.0, uCharTime * 0.23)));
  totalEmissiveRadiance += mix(vec3(0.9, 0.12, 0.01), vec3(1.0, 0.45, 0.08), ctHeat) * (ctCrack * 5.0 + 0.25) * ctHeat * ctHeat * breath * (1.0 + 0.35 * uCharBoost);
}`);
  };
  const occluders: FlameOccluder[] = [];
  const apex = new THREE.Vector3(0.02, 0.5, -0.02);
  const feet = 7;
  const wedges: THREE.BufferGeometry[] = [];
  for (let i = 0; i < feet; i++) {
    const angle = i / feet * tau + 0.35 + (random() - 0.5) * 0.25;
    const footRadius = 0.34 + random() * 0.05;
    const foot = new THREE.Vector3(Math.cos(angle) * footRadius, 0.04 + random() * 0.02, Math.sin(angle) * footRadius);
    const top = apex.clone().add(new THREE.Vector3((random() - 0.5) * 0.1, (random() - 0.5) * 0.08, (random() - 0.5) * 0.1));
    const direction = top.clone().sub(foot).normalize();
    // Run a little past the crossing, as stacked wood does.
    const end = top.clone().addScaledVector(direction, 0.07 + random() * 0.07);
    const length = foot.distanceTo(end);
    const R = 0.085 + random() * 0.03, open = 1.6 + random() * 0.6;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let k = 0; k <= 10; k++) {
      const a = -open / 2 + open * k / 10;
      const r = R * (1 + noise3(Math.cos(a) * 3 + i, Math.sin(a) * 3, 0.5) * 0.06);
      shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 1, steps: 6, curveSegments: 4 });
    g.rotateX(-Math.PI / 2);
    g.translate(-R * 0.45, -length / 2, 0);
    framed(g);
    const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle + Math.PI + (random() - 0.5) * 1.2);
    const tilt = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    const mid = foot.clone().add(end).multiplyScalar(0.5);
    g.applyMatrix4(new THREE.Matrix4().compose(mid, tilt.multiply(spin), new THREE.Vector3(1, 1, 1)));
    wedges.push(g);
    if (occluders.length < 6) occluders.push({ a: foot.clone(), b: end.clone(), radius: R * 0.5 });
  }
  const teepee = mesh(mergeGeometries(wedges), split);
  wedges.forEach((g) => g.dispose());
  // The fire's own wood barely shadows its light (the flame is a volume): no shadow streaks.
  teepee.castShadow = false;
  logs.add(teepee);
  // Two burnt-through chunks glowing in the coal bed.
  const charMat = charMaterial(time, boost);
  for (const [x, z, yaw, length] of [[-0.06, 0.04, 0.6, 0.46], [0.08, -0.05, 2.3, 0.4]] as Array<[number, number, number, number]>) {
    const geometry = charredLogGeometry(length, 0.055, x * 10 + 3);
    const data = geometry.attributes.aLog as THREE.BufferAttribute;
    for (let v = 0; v < data.count; v++) data.setZ(v, THREE.MathUtils.clamp(0.55 + noise3(v * 0.37, x * 9, 1.1) * 0.35, 0.2, 0.92));
    const chunk = mesh(geometry, charMat, [x, 0.09, z], [0, yaw, Math.PI / 2]);
    chunk.castShadow = false;
    logs.add(chunk);
    if (occluders.length < 8) {
      const axis = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)).multiplyScalar(length / 2);
      occluders.push({ a: new THREE.Vector3(x, 0.09, z).sub(axis), b: new THREE.Vector3(x, 0.09, z).add(axis), radius: 0.05 });
    }
  }
  group.add(logs);

  const flame = createFlame({ noise: options.noise, height: 1.55, radius: 0.32, occluders, seed: 41, intensity: 1.05 });
  flame.mesh.position.y = 0.04;
  group.add(flame.mesh);
  for (const v of [...flame.uniforms.uCapA.value, ...flame.uniforms.uCapB.value]) v.y -= 0.04;
  const embers = createEmbers({ count: 120, radius: 0.26, spawnY: 0.32, rise: 1.9, seed: 4417, rate: 0.3, size: 9 });
  group.add(embers.points);

  const lightIntensity = options.lightIntensity ?? 10;
  const light = new THREE.PointLight('#ff9a52', lightIntensity, 0, 2);
  light.position.set(0, 0.62, 0);
  light.castShadow = true;
  light.shadow.mapSize.set(options.shadowMapSize ?? 1024, options.shadowMapSize ?? 1024);
  light.shadow.radius = 6;
  light.shadow.bias = -0.003;
  light.shadow.normalBias = 0.025;
  light.shadow.camera.near = 0.08;
  light.shadow.camera.far = 30;
  group.add(light);
  const bounceIntensity = options.bounceIntensity ?? 1.6;
  const bounce = new THREE.PointLight('#ff6a2a', bounceIntensity, 4.5, 2);
  bounce.position.set(0, 0.16, 0);
  group.add(bounce);

  let stokeBoost = 0, clock = 0;
  const glow = new THREE.Vector3(0, 0.45, 0).add(centre);
  return {
    group, target: logs, light, bounce, glow,
    update(t, dt) {
      clock = t;
      const step = THREE.MathUtils.clamp(dt, 0, 0.08);
      stokeBoost = Math.max(0, stokeBoost - step * 0.22);
      const swell = THREE.MathUtils.smoothstep(stokeBoost, 0, 1);
      time.value = t;
      boost.value = swell;
      flame.uniforms.uTime.value = t;
      flame.uniforms.uBoost.value = swell;
      embers.uniforms.uTime.value = t;
      light.intensity = lightIntensity * fireFlicker(t, position[0]) * (1 + swell * 0.18);
      bounce.intensity = bounceIntensity * (0.92 + 0.08 * fireFlicker(t * 0.4, 9.1)) * (1 + swell * 0.12);
    },
    stoke() {
      stokeBoost = Math.min(1, stokeBoost + 0.55);
      embers.stoke(clock, 0.3);
      return 0.5;
    },
  };
}
