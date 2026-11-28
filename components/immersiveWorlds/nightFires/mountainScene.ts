import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldRecipe } from './worldTypes';
import { seeded, mesh, stoneMaterial, barkMaterial } from './scenery';
import { createNoiseVolume, createHeatShimmer, applyHeatShimmer, fireFlicker } from '../shared/render/fireFlame';
import { noise3 } from '../shared/render/noise';
import { bakeNightEnvironment } from '../shared/render/skyNight';
import { createNightVolume } from './atmosphere';
import { boulderGeometry, coniferGeometry, createFoliageMaterial, createGroundMaterial, createTerrainMaterial, distantSpruceGeometry, needleSprayTexture, ridgeGeometry } from './landscape';
import { createCoastSky } from './coastSky';
import { buildSkyline, createCoastWater, GLSL_SHORE, SEA_LEVEL, shoreProfile, shoreZ } from './coastWater';
import { teepeeHearth } from './coastHearth';
import { createCampChair, createCrate, createDeck, createEnamelMug, createHurricaneLantern, createLogPile } from './coastProps';
import { createGrass, createLavender, pineGeometry, pineTuftTexture, scatter } from './coastFlora';

/*
 * 모닥불 밤 (amb:campfire_night): a campfire on a low bank above a sea inlet at
 * the end of twilight, composed after the session's own card art. A seated,
 * first-person view across the fire toward the water: violet sky with pink-lit
 * cloud and the first stars, layered hazy hills, tall pines on the left, a
 * conifer stand on the right, a weathered deck with a canvas chair, firewood,
 * a crate, an old lantern and an enamel mug among lavender.
 * The world id stays 'mountain' for the registry and session bridge.
 */

const direction = (azimuthDegrees: number, elevationDegrees: number) => {
  const a = THREE.MathUtils.degToRad(azimuthDegrees), e = THREE.MathUtils.degToRad(elevationDegrees);
  return new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const s = THREE.MathUtils.smoothstep;

/** Camp ground: the shore profile, a gently rolling bank top, land rising into the forest on the right. */
export function coastGround(x: number, z: number) {
  const d = z - shoreZ(x);
  let h = shoreProfile(d);
  const land = s(d, 2.8, 4.6);
  const camp = Math.exp(-(x * x / 14 + (z - 0.6) * (z - 0.6) / 16));
  const roll = (Math.sin(x * 0.43 + z * 0.25) * 0.06 + Math.cos(z * 0.48 - x * 0.19) * 0.05 + noise3(x * 0.55, 1.3, z * 0.55) * 0.06) * (1 - camp * 0.85);
  const rise = Math.max(0, x - 5) * 0.06 + Math.max(0, z - 6) * 0.05 + Math.max(0, -x - 9) * 0.05 + Math.max(0, d - 12) * 0.03;
  h += land * (roll + rise);
  return h;
}

/** A grid denser where the camera looks closely, coarser toward the edges. */
function axis(dense: [number, number], step: number, outer: [number, number], growth: number) {
  const values: number[] = [];
  for (let v = dense[0]; v <= dense[1] + 1e-6; v += step) values.push(v);
  for (let v = dense[1], d = step; v < outer[1]; ) { d *= growth; v = Math.min(outer[1], v + d); values.push(v); }
  for (let v = dense[0], d = step; v > outer[0]; ) { d *= growth; v = Math.max(outer[0], v - d); values.unshift(v); }
  return values;
}

export function buildMountainWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.name = 'Coast clearing — campfire by the sea at nightfall';
  // Direct (non-HDR) fallback keeps a simple violet fog; the volume pass replaces it.
  const fallbackFog = new THREE.FogExp2('#3d3554', 0.0045);
  scene.fog = fallbackFog;
  scene.userData.exposure = 1.3;
  const noise = createNoiseVolume(48, 7);
  const firePosition: [number, number, number] = [0, coastGround(0, 0.9) - 0.01, 0.9];
  const shimmer = createHeatShimmer(V(firePosition[0], 0.9, firePosition[2]), 0.42, 2.6, 0.0022);
  const plantTime = { value: 0 };

  // Late twilight: the sun is a few degrees down, a little left of the view.
  const glowDirection = direction(-16, 0);
  const sky = createCoastSky({
    noise, glowDirection,
    zenith: '#1d2152', middle: '#595191', horizon: '#b497b6', glow: '#d29aa0',
    cloudLit: '#f0a8c2', cloudShade: '#4a4170', brightness: 0.5, cover: 0.72,
    stars: { count: 1800, seed: 3121, intensity: 2.0, twinkle: 0.7 },
  });
  scene.add(sky.group);

  // One soft key from the afterglow; the fire and the lantern are the warm keys.
  const twilight = new THREE.DirectionalLight('#b5a3dc', 0.42);
  twilight.position.copy(glowDirection).setY(0.3).normalize().multiplyScalar(60);
  twilight.castShadow = true;
  twilight.shadow.mapSize.set(2048, 2048);
  Object.assign(twilight.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 140 });
  twilight.shadow.normalBias = 0.03;
  twilight.shadow.bias = -0.0002;
  twilight.shadow.radius = 6;
  twilight.target.position.set(0, 0, -2);
  scene.add(twilight, twilight.target);

  // Ground: one continuous mesh from the camp over the bank and beach into the shallows.
  const xs = axis([-14, 10], 0.2, [-46, 64], 1.14);
  const zs = axis([-12, 6], 0.2, [-90, 18], 1.12);
  const groundPositions: number[] = [], groundIndex: number[] = [];
  for (const z of zs) for (const x of xs) groundPositions.push(x, coastGround(x, z), z);
  const w = xs.length;
  for (let j = 0; j < zs.length - 1; j++) for (let i = 0; i < w - 1; i++) {
    const a = j * w + i;
    const ys = [a, a + 1, a + w, a + w + 1].map((k) => groundPositions[k * 3 + 1]);
    // Deep seabed is hidden by opaque water: leave it out.
    if (ys.every((y) => y < SEA_LEVEL - 0.9)) continue;
    groundIndex.push(a, a + w, a + 1, a + 1, a + w, a + w + 1);
  }
  const groundGeometry = new THREE.BufferGeometry();
  groundGeometry.setAttribute('position', new THREE.Float32BufferAttribute(groundPositions, 3));
  groundGeometry.setIndex(groundIndex);
  groundGeometry.computeVertexNormals();
  const lapTime = { value: 0 };
  const earth = createGroundMaterial({
    key: 'coast-clearing', soil: '#54463e', litter: '#62574c', litterAmount: 0.35, grass: '#4b5134', grassAmount: 0.62, grassBias: 0.0,
    pebble: '#8a8279', pebbleAmount: 0.15, hearth: { centre: V(...firePosition), radius: 0.95 }, wetBelow: SEA_LEVEL + 0.035, wetBand: 0.03,
  });
  // The beach: pebbly below the bank, darkened and glossy where the swash has just drained.
  const groundCompile = earth.onBeforeCompile;
  earth.onBeforeCompile = (shader, renderer) => {
    groundCompile.call(earth, shader, renderer);
    shader.uniforms.uLapTime = lapTime;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform float uLapTime;\n${GLSL_SHORE}`)
      .replace('diffuseColor.rgb *= gColor;', `{
  float shoreD = vGroundWorld.z - coastShoreZ(vGroundWorld.x);
  float beach = 1.0 - smoothstep(${(SEA_LEVEL + 0.17).toFixed(3)}, ${(SEA_LEVEL + 0.34).toFixed(3)}, vGroundWorld.y + gMid * 0.04);
  vec3 shingle = vec3(0.36, 0.33, 0.31) * (0.62 + 0.45 * gFine + 0.25 * gGrain) * mix(vec3(1.0), vec3(1.08, 0.98, 0.9), gMid * 0.5 + 0.5);
  gColor = mix(gColor, shingle, beach * 0.85);
  float level = ${SEA_LEVEL.toFixed(3)} + coastLap(vGroundWorld.xz, uLapTime) * smoothstep(-3.5, -0.4, shoreD);
  // A film that drains for a few centimetres above the instantaneous waterline.
  float film = 1.0 - smoothstep(0.0, 0.03, vGroundWorld.y - level);
  float lapWet = max(film, 1.0 - smoothstep(${(SEA_LEVEL + 0.01).toFixed(3)}, ${(SEA_LEVEL + 0.03).toFixed(3)}, vGroundWorld.y)) * beach;
  gWet = max(gWet, lapWet);
  gColor *= mix(1.0, 0.55, lapWet);
}
diffuseColor.rgb *= gColor;`);
  };
  const terrain = new THREE.Mesh(groundGeometry, earth);
  terrain.name = 'Camp bank, beach and shallows';
  terrain.receiveShadow = true;
  scene.add(terrain);

  // Layered hills across the water, softened by distance in the volume pass.
  const hillGeometries: THREE.BufferGeometry[] = [];
  function hills(name: string, o: Parameters<typeof ridgeGeometry>[0], rock: string, forest: string) {
    const geometry = ridgeGeometry(o);
    hillGeometries.push(geometry);
    const material = applyHeatShimmer(createTerrainMaterial({ key: `coast-${name}`, rock, forest, treeLine: 60, bump: 0.7 }), shimmer, `coast-${name}`);
    const ridge = new THREE.Mesh(geometry, material);
    ridge.name = name;
    ridge.receiveShadow = true;
    scene.add(ridge);
    return geometry;
  }
  hills('Far hills', { z: -545, width: 1150, depth: 70, base: -1.5, peaks: [[-420, 30, 130], [-190, 40, 150], [40, 26, 120], [250, 36, 140], [450, 28, 130]], seed: 211, relief: 0.22, crest: 0.5, segments: [300, 28] }, '#4d4a5c', '#2a2b33');
  hills('Middle hills', { z: -400, width: 860, depth: 60, base: -1.2, peaks: [[-300, 22, 95], [-110, 27, 85], [95, 13, 70], [300, 21, 95]], seed: 223, relief: 0.25, crest: 0.48, segments: [260, 26] }, '#42404d', '#22262a');
  hills('Far shore', { x: 30, z: -372, width: 220, depth: 26, base: -1.1, peaks: [[-50, 5, 30], [10, 4, 26], [60, 6, 30]], seed: 229, relief: 0.3, crest: 0.45, taper: 0.3, segments: [140, 16] }, '#3b3a44', '#1d2224');
  hills('Left headland', { x: -170, z: -235, width: 270, depth: 54, base: -1.0, peaks: [[-70, 15, 50], [25, 11, 42], [90, 6, 30]], seed: 233, relief: 0.32, crest: 0.45, taper: 0.28, segments: [170, 24] }, '#3a3944', '#1b2022');
  hills('Island', { x: -24, z: -128, width: 56, depth: 20, base: -0.9, peaks: [[-4, 3.6, 12], [9, 2.4, 10]], seed: 239, relief: 0.3, crest: 0.5, taper: 0.38, segments: [70, 12] }, '#3a3944', '#1b2022');

  // Spruce on the island and along the forested shore on the right, instanced. The far
  // shores stay as soft forested silhouettes: lone spires at 300 m read as a comb.
  const spruce = distantSpruceGeometry(11);
  const farPlacements: THREE.Matrix4[] = [];
  const forestRandom = seeded(4410);
  hillGeometries.slice(2).forEach((geometry, index) => {
    const position = geometry.attributes.position as THREE.BufferAttribute, normal = geometry.attributes.normal as THREE.BufferAttribute;
    const quota = [0, 0, 70][index];
    for (let attempt = 0, placed = 0; attempt < 8000 && placed < quota; attempt++) {
      const i = Math.floor(forestRandom() * position.count);
      if (normal.getY(i) < 0.7 || position.getY(i) < SEA_LEVEL + 0.4) continue;
      const h = 1.8 + Math.pow(forestRandom(), 2) * 3.2;
      const width = h * (0.3 + forestRandom() * 0.16);
      farPlacements.push(new THREE.Matrix4().compose(V(position.getX(i) + (forestRandom() - 0.5) * 2, position.getY(i) - 0.3, position.getZ(i) + (forestRandom() - 0.5) * 2),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, forestRandom() * 6.28, 0)), V(width, h, width)));
      placed++;
    }
  });
  // The right-hand shore: spires receding into the distance behind the deck.
  for (let attempt = 0, placed = 0; attempt < 6000 && placed < 170; attempt++) {
    const x = 6 + forestRandom() * 70, z = -18 - forestRandom() * 150;
    const d = z - shoreZ(x);
    if (d < 1.5) continue;
    const h = 9 + Math.pow(forestRandom(), 1.5) * 9 + Math.min(d, 30) * 0.1;
    const width = h * (0.22 + forestRandom() * 0.1);
    farPlacements.push(new THREE.Matrix4().compose(V(x, coastGround(x, z) - 0.3, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((forestRandom() - 0.5) * 0.04, forestRandom() * 6.28, 0)), V(width, h, width)));
    placed++;
  }
  const farForest = new THREE.InstancedMesh(spruce, applyHeatShimmer(new THREE.MeshStandardMaterial({ color: '#1b211f', roughness: 0.95, side: THREE.DoubleSide }), shimmer, 'coast-far-spruce'), farPlacements.length);
  farPlacements.forEach((matrix, i) => farForest.setMatrixAt(i, matrix));
  farForest.name = 'Distant spruce';
  farForest.receiveShadow = true;
  scene.add(farForest);
  const skyline = buildSkyline([...hillGeometries.map((geometry) => ({ geometry })), { geometry: spruce, matrices: farPlacements, top: 1.05 }], V(0, SEA_LEVEL, -40));

  // Framing trees: pines on the point at the left, a spruce stand on the right.
  const pineSpray = pineTuftTexture(57, '#36472f');
  const pineFoliage = createFoliageMaterial(pineSpray, 'coast-pine');
  const pineBark = barkMaterial('#5d4636', 'coast-pine-bark', { furrows: 7, lichen: 0.18 });
  const spruceFoliage = createFoliageMaterial(needleSprayTexture(31, '#334a32'), 'coast-spruce');
  const spruceBark = barkMaterial('#4f4237', 'coast-spruce-bark', { furrows: 6, lichen: 0.25 });
  // [x, z, height, seed, crown start]
  const pines: Array<[number, number, number, number, number, number]> = [[-8.4, -7.4, 15.5, 61, 0.3, 1], [-6.4, -5.0, 12, 67, 0.52, 0.55], [-7.9, -8.2, 13, 71, 0.42, 0.75]];
  const spruces: Array<[number, number, number, number]> = [
    [4.9, -6.4, 9.5, 101], [6.4, -9.6, 12.5, 107], [5.6, -12.5, 10.5, 113], [8.3, -8.2, 13.5, 127], [7.6, -14.6, 12, 131],
    [9.6, -12, 15, 137], [10.8, -16.5, 13, 139], [12.6, -10.4, 16, 149], [9.4, -20.5, 14, 151], [13.8, -18.8, 15.5, 157], [7.2, -24, 13, 163],
  ];
  const woodParts: THREE.BufferGeometry[] = [], pineParts: THREE.BufferGeometry[] = [], spruceWood: THREE.BufferGeometry[] = [], spruceParts: THREE.BufferGeometry[] = [];
  for (const [x, z, height, seed, crownStart, girth] of pines) {
    const { wood, foliage } = pineGeometry({ height, seed, crownStart, girth });
    const matrix = new THREE.Matrix4().compose(V(x, coastGround(x, z), z), new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), seed * 1.37), V(1, 1, 1));
    wood.applyMatrix4(matrix); foliage.applyMatrix4(matrix);
    woodParts.push(wood); pineParts.push(foliage);
  }
  for (const [x, z, height, seed] of spruces) {
    const { wood, foliage } = coniferGeometry({ height, seed, spread: 0.17 + (seed % 5) * 0.012, clearTrunk: 0.12 + (seed % 3) * 0.03 });
    const matrix = new THREE.Matrix4().compose(V(x, coastGround(x, z), z), new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), seed * 1.37), V(1, 1, 1));
    wood.applyMatrix4(matrix); foliage.applyMatrix4(matrix);
    spruceWood.push(wood); spruceParts.push(foliage);
  }
  const pineTrunks = mesh(mergeGeometries(woodParts), pineBark);
  const pineCrowns = mesh(mergeGeometries(pineParts), pineFoliage);
  const spruceTrunks = mesh(mergeGeometries(spruceWood), spruceBark);
  const spruceCrowns = mesh(mergeGeometries(spruceParts), spruceFoliage);
  [...woodParts, ...pineParts, ...spruceWood, ...spruceParts].forEach((g) => g.dispose());
  pineTrunks.name = 'Pine trunks'; pineCrowns.name = 'Pine crowns'; spruceTrunks.name = 'Spruce trunks'; spruceCrowns.name = 'Spruce crowns';
  scene.add(pineTrunks, pineCrowns, spruceTrunks, spruceCrowns);

  // The deck runs from the bank out over the water.
  const deckLayout = { x0: -1.9, x1: 3.7, z0: -1.0, z1: -7.0, top: 0.24 };
  const deck = createDeck(deckLayout, coastGround);
  scene.add(deck.group);
  const chair = createCampChair();
  scene.add(chair);
  const logPile = createLogPile();
  const crate = createCrate();
  const lamp = createHurricaneLantern();
  lamp.group.scale.setScalar(1.2);
  const mug = createEnamelMug();
  mug.scale.setScalar(1.4);
  chair.scale.setScalar(1.08);
  scene.add(logPile, crate, lamp.group, mug);

  // Shingle on the beach and a few rocks standing in the shallows, with foam around them.
  const shingle = stoneMaterial('#8b847b', { key: 'coast-shingle', scale: 6, bump: 0.8, stain: '#5b4a3a', stainAmount: 0.15, cavity: 0.4, strata: 0.08, drips: 0, waterY: SEA_LEVEL + 0.02, wetBand: 0.1, algaeAmount: 0.15, dryRoughness: 0.8, wetRoughness: 0.12 });
  const pebbleParts: THREE.BufferGeometry[] = [];
  const pebbleRandom = seeded(2731);
  for (let i = 0, placed = 0; i < 4000 && placed < 340; i++) {
    const x = -10 + pebbleRandom() * 13.5;
    const d = -0.4 + Math.pow(pebbleRandom(), 1.3) * 2.2;
    const z = shoreZ(x) + d;
    if (x > deckLayout.x0 - 0.2 && z < deckLayout.z0) continue;
    const size = 0.022 + Math.pow(pebbleRandom(), 2.2) * 0.1;
    const g = boulderGeometry(3000 + i, 1, 6, 0.06);
    g.deleteAttribute('uv');
    g.applyMatrix4(new THREE.Matrix4().compose(V(x, coastGround(x, z) + size * 0.25, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(pebbleRandom() * 0.4, pebbleRandom() * 6, pebbleRandom() * 0.4)), V(size * (1 + pebbleRandom() * 0.5), size * (0.4 + pebbleRandom() * 0.3), size)));
    pebbleParts.push(g);
    placed++;
  }
  // Gravel and a few fist-sized stones scattered over the camp ground.
  for (let i = 0; i < 70; i++) {
    const angle = pebbleRandom() * Math.PI * 2, radius = 1.15 + Math.pow(pebbleRandom(), 1.3) * 3.6;
    const x = firePosition[0] + Math.cos(angle) * radius, z = firePosition[2] + Math.sin(angle) * radius;
    if (z - shoreZ(x) < 3 || z > 2.9 || (x > deckLayout.x0 - 0.1 && z < deckLayout.z0 + 0.1)) continue;
    const size = 0.018 + Math.pow(pebbleRandom(), 2.5) * 0.07;
    const g = boulderGeometry(3900 + i, 1, 6, 0.08);
    g.deleteAttribute('uv');
    g.applyMatrix4(new THREE.Matrix4().compose(V(x, coastGround(x, z) + size * 0.2, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(pebbleRandom() * 0.3, pebbleRandom() * 6, pebbleRandom() * 0.3)), V(size * 1.3, size * 0.55, size)));
    pebbleParts.push(g);
  }
  const rocks: Array<[number, number, number, number]> = [[-3.3, -4.5, 0.3, 0.2], [-4.6, -5.3, 0.42, 0.24], [-2.5, -5.4, 0.2, 0.13], [-5.8, -7.5, 0.48, 0.28], [-1.4, -4.7, 0.17, 0.11], [-8.7, -10.4, 0.42, 0.24]];
  const rockUniforms: THREE.Vector4[] = [];
  rocks.forEach(([x, z, r, h], i) => {
    const g = boulderGeometry(5100 + i * 7, 5, 8, 0.12);
    g.deleteAttribute('uv');
    g.applyMatrix4(new THREE.Matrix4().compose(V(x, SEA_LEVEL - 0.12 + h * 0.5, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0.05, i * 1.9, 0.04)), V(r, h, r * 0.85)));
    pebbleParts.push(g);
    rockUniforms.push(new THREE.Vector4(x, z, r * 0.92, i * 2.1));
  });
  const pebbles = mesh(mergeGeometries(pebbleParts), shingle);
  pebbleParts.forEach((g) => g.dispose());
  pebbles.castShadow = false;
  pebbles.name = 'Shingle and rocks in the shallows';
  scene.add(pebbles);

  // The fire.
  const hearth = teepeeHearth(firePosition, { noise, lightIntensity: 9.5, bounceIntensity: 1.9, shadowMapSize: 1024 });
  hearth.group.name = 'Campfire by the sea: touch the logs to stoke it';
  // Only nearby props need the fire's soft shadows; distant trees stay out of its cube map.
  hearth.light.shadow.camera.far = 7.5;
  scene.add(hearth.group);

  // A cabin's lights on the far shore: tiny here, long wavering streaks on the water.
  const farLights = [
    { position: V(17.5, SEA_LEVEL + 1.1, -369), color: new THREE.Vector3(1.0, 0.62, 0.28).multiplyScalar(0.035) },
    { position: V(20.2, SEA_LEVEL + 1.35, -370), color: new THREE.Vector3(1.0, 0.7, 0.36).multiplyScalar(0.02) },
  ];
  const farGeometry = new THREE.BufferGeometry();
  farGeometry.setAttribute('position', new THREE.Float32BufferAttribute(farLights.flatMap((l) => l.position.toArray()), 3));
  farGeometry.setAttribute('color', new THREE.Float32BufferAttribute([1.0, 0.6, 0.28, 0.75, 0.5, 0.26].map((c) => c * 40), 3));
  const farPixelRatio = { value: 1 };
  const farBulbs = new THREE.Points(farGeometry, new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: farPixelRatio },
    vertexShader: `uniform float uPixelRatio; attribute vec3 color; varying vec3 vColor;
void main() { vColor = color; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = 3.2 * uPixelRatio; }`,
    fragmentShader: `varying vec3 vColor;
void main() { float d = length(gl_PointCoord - 0.5) * 2.0; gl_FragColor = vec4(vColor * exp(-d * d * 3.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  farBulbs.name = 'Far cabin lights';
  farBulbs.onBeforeRender = (renderer) => { farPixelRatio.value = Math.min(2, renderer.getPixelRatio()); };
  scene.add(farBulbs);

  // Water, with the trees, rocks and jetty it reflects or wraps in foam.
  const trees = [
    ...pines.map(([x, z, h]) => new THREE.Vector4(x, z, h, -h * 0.2)),
    ...spruces.slice(0, 9).map(([x, z, h, seed]) => new THREE.Vector4(x, z, h, h * (0.17 + (seed % 5) * 0.012))),
  ];
  const postFoam = deck.posts.filter(([x, z]) => coastGround(x, z) < SEA_LEVEL + 0.02).slice(0, 12 - rockUniforms.length).map(([x, z], i) => new THREE.Vector4(x, z, 0.075, 7 + i * 1.3));
  const water = createCoastWater({
    sky: sky.uniforms, skyline, fire: V(firePosition[0], 0.55, firePosition[2]), lamp: V(0, 0.2, 0),
    farLights, trees, rocks: [...rockUniforms, ...postFoam], deck: deck.bounds,
  });
  scene.add(water.mesh);

  // Lavender and grass: the foreground corners, the bank edge, around the deck and the woodpile.
  const awayFromCamp = (x: number, z: number) => Math.hypot(x - firePosition[0], z - firePosition[2]) > 1.35 && !(x > deckLayout.x0 - 0.25 && x < deckLayout.x1 + 0.25 && z < deckLayout.z0 + 0.2 && z > deckLayout.z1);
  const onLand = (x: number, z: number) => z - shoreZ(x) > 1.9;
  // Keep clear of the props in both layouts (desktop and portrait positions).
  const propSpots: Array<[number, number, number]> = [[-1.75, 1.6, 0.42], [-1.15, 1.95, 0.3], [-1.85, 2.35, 0.45], [-1.2, 2.6, 0.3], [-0.85, 2.9, 0.4], [-0.62, 2.45, 0.42], [-0.26, 2.72, 0.3], [2.15, 1.45, 0.55], [1.18, 1.85, 0.55], [2.95, -0.15, 0.75], [1.7, -0.3, 0.75]];
  const clearOfProps = (x: number, z: number) => propSpots.every(([px, pz, r]) => Math.hypot(x - px, z - pz) > r);
  const lavenderClumps = [
    ...scatter(22, 11, [-2.5, -0.55, 2.0, 3.4], (x, z) => awayFromCamp(x, z) && clearOfProps(x, z), [1.15, 1.55]),
    ...scatter(12, 12, [-3.0, -1.95, 0.0, 1.9], (x, z) => awayFromCamp(x, z) && clearOfProps(x, z), [1.0, 1.35]),
    ...scatter(18, 13, [0.7, 2.7, 2.15, 3.4], (x, z) => awayFromCamp(x, z) && clearOfProps(x, z), [1.0, 1.35]),
    ...scatter(8, 14, [1.5, 3.6, 0.5, 2.0], (x, z) => awayFromCamp(x, z) && clearOfProps(x, z), [0.65, 0.85]),
    ...scatter(30, 17, [-6.5, -1.6, -2.6, 0.2], (x, z) => onLand(x, z) && awayFromCamp(x, z), [0.75, 1.1]),
    ...scatter(14, 19, [3.6, 6.5, -4.5, 1.2], (x, z) => onLand(x, z) && awayFromCamp(x, z) && clearOfProps(x, z), [0.8, 1.1]),
  ];
  scene.add(...createLavender(lavenderClumps, coastGround, plantTime));
  // The narrow portrait frame sees the ground just in front of the seat: a few clumps only it shows.
  const portraitLavender = createLavender([
    ...scatter(5, 41, [-1.3, -0.85, 2.95, 3.45], (x, z) => clearOfProps(x, z), [1.1, 1.4]),
    ...scatter(5, 43, [0.35, 1.05, 2.95, 3.45], (x, z) => clearOfProps(x, z), [1.1, 1.4]),
  ], coastGround, plantTime, 5);
  scene.add(...portraitLavender);
  const grassClumps = [
    ...scatter(230, 29, [-8, 7, -5, 3.6], (x, z) => onLand(x, z) && awayFromCamp(x, z) && clearOfProps(x, z) && Math.hypot(x - firePosition[0], z - firePosition[2]) > 1.6, [0.8, 1.4]),
    ...scatter(70, 31, [-10, -5, -9, 0], (x, z) => onLand(x, z), [0.9, 1.5]),
  ];
  scene.add(createGrass(grassClumps, coastGround, plantTime));

  let environment: THREE.WebGLRenderTarget | null = null;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  const place = (object: THREE.Object3D, x: number, z: number, yaw: number, lift = 0) => {
    object.position.set(x, coastGround(x, z) + lift, z);
    object.rotation.set(0, yaw, 0);
    object.updateMatrixWorld(true);
  };
  return {
    scene,
    view: (aspect) => {
      // Portrait brings the lantern, mug and firewood into a narrower semicircle instead of cropping them.
      const portrait = aspect < 0.85;
      for (const plant of portraitLavender) plant.visible = portrait;
      if (portrait) {
        place(lamp.group, -0.62, 2.45, 0.4);
        place(mug, -0.26, 2.72, -0.6, -0.004);
        place(logPile, 1.7, -0.3, -0.75);
        place(crate, 1.18, 1.85, -0.3);
        place(chair, 1.2, -2.2, -0.45, deckLayout.top - coastGround(1.2, -2.2));
      } else {
        place(lamp.group, -1.75, 1.6, 0.4);
        place(mug, -1.15, 1.95, -0.6, -0.004);
        place(logPile, 2.95, -0.15, -0.75);
        place(crate, 2.15, 1.45, -0.25);
        place(chair, 1.6, -2.1, -0.55, deckLayout.top - coastGround(1.6, -2.1));
      }
      water.uniforms.uLampPos.value.copy(lamp.light.getWorldPosition(new THREE.Vector3()));
      return portrait
        ? { position: [0.06, 1.4, 5.5], target: [-0.05, -0.1, -12], fov: 64 }
        : { position: [0.15, 1.28, 4.8], target: [-0.1, -0.04, -12], fov: 50 };
    },
    targets: [{ object: hearth.target, kind: 'log-embers' }],
    interact: (kind) => {
      if (kind !== 'log-embers') return 0;
      hearth.stoke();
      return 0.32;
    },
    post: {
      exposure: 1.3, bloomStrength: 0.09, bloomThreshold: 0, aoStrength: 0.8, aoRadius: 0.5,
      saturation: 1.06, contrast: 1.05, shadowTint: [0.95, 0.93, 1.1], highlightTint: [1.07, 1.0, 0.92], vignette: 0.42, grain: 0.024,
    },
    prepare(renderer) {
      environment = bakeNightEnvironment(renderer, sky.dome, '#17141d');
      scene.environment = environment.texture;
      scene.environmentIntensity = 2.0;
    },
    createVolume() {
      const volume = createNightVolume({
        noise, moonDirection: glowDirection.clone().setY(0.08).normalize(),
        moon: new THREE.Color(0.016, 0.0105, 0.014), ambient: new THREE.Color(0.022, 0.018, 0.036),
        fogDensity: 0.0045, fogHeight: 22, fogBase: SEA_LEVEL, maxDistance: 590,
        mist: { y: SEA_LEVEL + 0.4, thickness: 1.3, density: 0.008, start: 24, tint: new THREE.Color(0.95, 0.9, 1.05) },
        glow: { position: hearth.glow, color: new THREE.Color(1.0, 0.46, 0.17), density: 0.011 },
        smoke: { base: V(firePosition[0], 1.05, firePosition[2]), radius: 0.12, height: 4.2, density: 0.26, wind: new THREE.Vector2(0.1, -0.05), fireLight: new THREE.Color(1.0, 0.42, 0.14).multiplyScalar(0.65) },
      });
      volumeUniforms = volume.uniforms;
      return volume;
    },
    setPostActive(active) { scene.fog = active ? null : fallbackFog; },
    update: (elapsed, dt) => {
      hearth.update(elapsed, dt);
      sky.update(elapsed);
      lamp.update(elapsed);
      const flicker = fireFlicker(elapsed, firePosition[0]);
      water.update(elapsed, flicker);
      lapTime.value = elapsed;
      plantTime.value = elapsed;
      shimmer.uniforms.uHeatTime.value = elapsed;
      if (volumeUniforms) volumeUniforms.uFlicker.value = flicker;
    },
    dispose() { environment?.dispose(); environment = null; },
  };
}
