import * as THREE from 'three';
import type { WorldContent } from './types';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { boulderGeometry } from '../../shared/render/rockGeometry';
import { fbm3, seeded } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import { SEA_GLSL, SEA_SUN, applySeaShading } from './seaShading';
import { createReefRockMaterial, faceSites, ledgeSites, reefWallGeometry } from './seaReef';
import {
  anemoneGeometry, anemoneMaterial, brainCoralMaterial, cupCoralGeometry, cupCoralMaterial, domeGeometry, fanGeometry, fanMaterial, fanTexture,
  instanced, kelpGeometry, kelpMaterial, plateGeometry, plateMaterial, seaStarGeometry, seaStarMaterial, spongeMaterial, tubeSpongeGeometry, urchinGeometry, urchinMaterial, whipGeometry, whipMaterial,
} from './seaLife';
import { createJelly, createSchools, createSnowLayer } from './seaFauna';

/**
 * Original procedural temperate reef wall at about 13 m depth. No external
 * image, model or copied gallery source. Light enters from the surface 15 m
 * above as flickering shafts and caustics; the water absorbs red first, so the
 * reef sinks through teal into deep blue with distance.
 */

const VOLUME_FRAGMENT = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
${SEA_GLSL}
uniform vec3 uLight;
uniform float uDensity;
uniform float uExtinction;
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = min(surface, 60.0);
  float phase = bwPhase(dot(SEA_SUN_DIR, -rd), 0.6) * 12.5663706;
  const int STEPS = 32;
  float dt = maxT / float(STEPS);
  float jitter = bwIgn(gl_FragCoord.xy);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float scatterStep = 1.0 - exp(-uDensity * dt);
  float stepT = exp(-uExtinction * dt);
  for (int i = 0; i < STEPS; i++) {
    vec3 p = ro + rd * ((float(i) + jitter) * dt);
    float below = max(SEA_SURFACE - p.y, 0.0);
    float light = exp(-below * 0.075) * (0.08 + 1.75 * seaShaft(p, uTime));
    // Spectral absorption on the way from the scattering point to the eye.
    vec3 toEye = exp(-(SEA_SIGMA - 0.03) * (float(i) + jitter) * dt);
    scatter += transmittance * uLight * light * phase * scatterStep * toEye;
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;

const FLOOR_ORIGIN = new THREE.Vector2(6, -20);
/** Height of the sand slope at a world (x, z); falls away into the deep. */
function floorY(wx: number, wz: number) {
  const x = wx - FLOOR_ORIGIN.x, z = wz - FLOOR_ORIGIN.y;
  const ripple = Math.sin(x * 1.7 + fbm3(x * .1, 0, z * .1, 2) * 4) * .08;
  const fall = Math.max(0, -(wz + 6)) * .42 + Math.max(0, wx - 10) * .25;
  return -10.5 - fall + fbm3(x * .05, 1, z * .05, 4) * 2.2 + fbm3(x * .3, 2, z * .3, 2) * .35 + ripple;
}

export function createDeepSea(_renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(49, 1, 0.08, 140);
  camera.position.set(0, 1.55, 7.1);
  const target = new THREE.Vector3(0.05, 1.65, -13);
  camera.lookAt(target);
  const clock = { value: 0 };
  let pulse = 0, pulseTarget = 0;
  const rnd = seeded(62893);
  const waterColor = new THREE.Color('#06324a');
  scene.background = waterColor;

  // Daylight filters down from the surface; everything else is dim, cold scatter.
  scene.add(new THREE.HemisphereLight('#8ccac6', '#0a1820', 0.85));
  const daylight = new THREE.DirectionalLight('#cdf2dc', 3.6);
  daylight.position.copy(SEA_SUN).multiplyScalar(-30).add(new THREE.Vector3(-2, 0, -6));
  daylight.target.position.set(-2, 0, -6);
  daylight.castShadow = true; daylight.shadow.mapSize.set(2048, 2048);
  Object.assign(daylight.shadow.camera, { left: -16, right: 16, top: 18, bottom: -18, near: 1, far: 70 });
  daylight.shadow.bias = -.0004; daylight.shadow.normalBias = .04;
  daylight.shadow.autoUpdate = false; daylight.shadow.needsUpdate = true;
  scene.add(daylight, daylight.target);
  // Soft light scattered off the open water onto the near reef.
  const leftFill = new THREE.PointLight('#a4cec4', 14, 16, 2);
  leftFill.position.set(-1.4, 3.4, 3.6);
  scene.add(leftFill);
  // The bright open water to the right lights the reef's vertical faces softly.
  const openWater = new THREE.DirectionalLight('#5aa6b8', .75);
  openWater.position.set(12, 4, 4); openWater.target.position.set(-4, 0, -6);
  scene.add(openWater, openWater.target);
  const cold = new THREE.PointLight('#3a6fa8', 70, 40, 2);
  cold.position.set(5, 7, -14);
  scene.add(cold);

  // Enclosing water volume: the same in-scatter the reef fades into, and the bright surface above.
  const backgroundMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uTime: clock },
    vertexShader: `varying vec3 vDirection; void main(){ vDirection=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `precision highp float; varying vec3 vDirection; uniform float uTime;
      ${GLSL_NOISE}
      ${SEA_GLSL}
      void main(){ vec3 d=normalize(vDirection);
      vec3 c=seaBackground(d);
      // Snell's window: the sky compressed into a bright, rippling disc overhead.
      float window=smoothstep(.55,.85,d.y);
      vec2 q=d.xz/max(d.y,.2);
      float ripple=.6+.4*bwNoise(vec3(q*3.+vec2(uTime*.04,0.),uTime*.2))+.25*bwNoise(vec3(q*9.+3.,uTime*.35));
      c+=vec3(.25,.75,.8)*window*ripple*2.2;
      float sun=pow(max(0.,dot(d,-SEA_SUN_DIR)),18.);
      c+=vec3(1.4,1.9,1.8)*sun*ripple;
      gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
  });
  const background = new THREE.Mesh(new THREE.SphereGeometry(110, 48, 32), backgroundMat);
  background.renderOrder = -10; scene.add(background);

  // --- The reef wall and its fallen blocks ------------------------------------------
  const wallMaterial = applySeaShading(createReefRockMaterial({ key: 'sea-wall', cavity: true }), { key: 'sea-wall', caustics: 1, time: clock });
  const wall = new THREE.Mesh(reefWallGeometry(), wallMaterial);
  wall.name = 'deep-sea-reef-wall';
  wall.receiveShadow = true; wall.castShadow = true;
  scene.add(wall);
  const blockMaterial = applySeaShading(createReefRockMaterial({ key: 'sea-block', life: 1.1 }), { key: 'sea-block', caustics: 1, time: clock });
  const farMaterial = applySeaShading(createReefRockMaterial({ key: 'sea-far', life: .7, tint: '#c8ccc8' }), { key: 'sea-far', caustics: .6, time: clock });
  const shelves: Array<[number, number, number, number, number, number, number]> = [
    [-4.7, -2.7, 3.4, 3.2, 1.55, 3.3, 42], [-3.8, -2.3, -3.0, 3.0, 1.45, 3.4, 311],
    [-3.8, -4.7, -8, 3.0, 2.2, 4.8, 100], [-4.4, -8, -15, 3.8, 3.6, 5.8, 257],
    [-6, 1.8, -18, 3.2, 4.0, 5.2, 7], [-8, -1.8, -31, 5.2, 7.3, 8.1, 37],
  ];
  const foreground: THREE.Mesh[] = [];
  for (const [x, y, z, sx, sy, sz, seed] of shelves) {
    const rock = new THREE.Mesh(boulderGeometry(seed, z > -10 ? 22 : 12), z < -18 ? farMaterial : blockMaterial);
    rock.position.set(x, y, z); rock.scale.set(sx, sy, sz); rock.rotation.set(.05 * Math.sin(seed), seed * .71, .07 * Math.cos(seed));
    rock.castShadow = true; rock.receiveShadow = true; scene.add(rock);
    rock.updateMatrixWorld(true);
    if (z > -10) foreground.push(rock);
  }
  // Loose stones break the near ledge silhouette: four shapes, instanced.
  const pebbleMaterial = applySeaShading(createReefRockMaterial({ key: 'sea-pebble', life: .6 }), { key: 'sea-pebble', caustics: 1, time: clock });
  for (let variant = 0; variant < 4; variant++) {
    const items = [];
    for (let i = 0; i < 8; i++) {
      const x = -6.4 + rnd() * 4.3, z = 2.5 - rnd() * 7;
      items.push({ position: new THREE.Vector3(x, -1.45 + rnd() * .16, z), scale: new THREE.Vector3(.12 + rnd() * .45, .09 + rnd() * .23, .17 + rnd() * .37), spin: rnd() * 6 });
    }
    const pebbles = instanced(boulderGeometry(variant * 31 + 12, 6), pebbleMaterial, items, 'deep-sea-pebbles');
    pebbles.castShadow = true; pebbles.receiveShadow = true;
    scene.add(pebbles);
  }

  // A rippled sand slope far below gives the open water a ground and scale.
  const sand = applySeaShading(createRockMaterial('#9a9277', { key: 'sea-sand-v2', scale: 2.2, bump: .45, cavity: .2, strata: 0, stainAmount: .1, wetness: 1, drips: 0, dryRoughness: .9, wetRoughness: .85 }), { key: 'sea-sand', caustics: 1, time: clock });
  const floorGeometry = new THREE.PlaneGeometry(110, 110, 120, 120);
  floorGeometry.rotateX(-Math.PI / 2);
  const fp = floorGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < fp.count; i++) fp.setY(i, floorY(fp.getX(i) + FLOOR_ORIGIN.x, fp.getZ(i) + FLOOR_ORIGIN.y));
  floorGeometry.computeVertexNormals();
  const floor = new THREE.Mesh(floorGeometry, sand);
  floor.position.set(FLOOR_ORIGIN.x, 0, FLOOR_ORIGIN.y); floor.receiveShadow = true; floor.name = 'deep-sea-sand-floor';
  scene.add(floor);
  // Outcrops and far pinnacles on the slope: each layer sinks further into the blue.
  const outcrops: Array<[number, number, number, number, number, number, number]> = [
    [3.5, -11.6, -9, 2.6, 1.6, 2.2, 501], [9, -14.5, -19, 4.2, 2.6, 3.4, 502], [-.5, -15.5, -24, 3.4, 3.1, 3.0, 503],
    [13, -12, -34, 3.2, 8.5, 3.4, 504], [19, -14, -46, 4.4, 11, 4.2, 505], [6.5, -16, -50, 3.8, 7.5, 3.6, 506],
  ];
  const pinnacles: THREE.Mesh[] = [];
  for (const [x, y, z, sx, sy, sz, seed] of outcrops) {
    const rock = new THREE.Mesh(boulderGeometry(seed, 12), farMaterial);
    rock.position.set(x, y, z); rock.scale.set(sx, sy, sz); rock.rotation.y = seed;
    rock.castShadow = true; rock.receiveShadow = true; scene.add(rock);
    rock.updateMatrixWorld(true);
    pinnacles.push(rock);
  }

  // --- Life on the reef -------------------------------------------------------------------
  // Placement favours what the observer sees: desktop framing, and portrait where asked.
  const views = [[1.6, 49], [390 / 844, 56]].map(([aspect, fov]) => {
    const view = new THREE.PerspectiveCamera(fov, aspect, .08, 140);
    view.position.copy(camera.position); view.lookAt(target); view.updateMatrixWorld(true);
    return view;
  });
  const projected = new THREE.Vector3();
  const inView = (p: THREE.Vector3, margin = 1, view = 0) => {
    projected.copy(p).project(views[view]);
    return projected.z < 1 && Math.abs(projected.x) < margin && projected.y > -margin && projected.y < margin;
  };
  const ray = new THREE.Raycaster();
  const down = new THREE.Vector3(0, -1, 0);
  const normalMatrix = new THREE.Matrix3();
  /** Upward-facing points on the near blocks that the observer can actually see. */
  const blockTops = (count: number, seed: number, area: [number, number, number, number], minUp = .6, portrait = 0) => {
    const random = seeded(seed);
    const out: { position: THREE.Vector3; normal: THREE.Vector3 }[] = [];
    for (let attempt = 0; attempt < count * 40 && out.length < count; attempt++) {
      const x = area[0] + random() * (area[1] - area[0]), z = area[2] + random() * (area[3] - area[2]);
      ray.set(new THREE.Vector3(x, 6, z), down);
      const hit = ray.intersectObjects(foreground, false)[0];
      if (!hit?.face) continue;
      normalMatrix.getNormalMatrix(hit.object.matrixWorld);
      const normal = hit.face.normal.clone().applyMatrix3(normalMatrix).normalize();
      if (normal.y < minUp || !inView(hit.point, .97) || (out.length < portrait && !inView(hit.point, .95, 1))) continue;
      const toPoint = hit.point.clone().sub(camera.position);
      ray.set(camera.position, toPoint.clone().normalize());
      const first = ray.intersectObjects(foreground, false)[0];
      if (first && first.distance < toPoint.length() - .08) continue;
      out.push({ position: hit.point.clone(), normal });
    }
    return out;
  };
  const near: [number, number, number, number] = [-6.5, -.4, 3.5, -6.2];
  const shown = <T extends { position: THREE.Vector3 }>(list: T[]) => list.filter(site => inView(site.position, 1.08));
  const pick = <T>(list: T[], random: () => number) => list[Math.floor(random() * list.length)];
  const lifeRandom = seeded(707);

  // Giant kelp: a stand at the foot of the wall and a forest on the slope to the right.
  const kelpMat = kelpMaterial(clock);
  const kelpColors = ['#c9b37a', '#b9a86a', '#d6c48c', '#a99c62'];
  const kelpSites: { position: THREE.Vector3; scale: number; spin: number; color: string }[] = [];
  const kelpStand: Array<[number, number, number, number]> = [
    // x, z, base y, height: a stand rooted on the wall's foot and the near outcrop, a forest down the slope.
    [-2.2, -9.5, -8.4, 11], [-1.4, -12, -9.6, 12.5], [-2.6, -14.5, -10, 13], [-.6, -17.5, -11, 14], [-1.9, -20, -11.4, 13.5],
    [4.4, -10.6, -10.9, 12], [5.6, -12.4, -11.6, 12.5],
  ];
  for (const [x, z, y, h] of kelpStand) kelpSites.push({ position: new THREE.Vector3(x, y - .2, z), scale: h * (.92 + lifeRandom() * .16), spin: lifeRandom() * 6.3, color: pick(kelpColors, lifeRandom) });
  for (let i = 0; i < 9; i++) {
    const x = 7 + lifeRandom() * 12, z = -19 - lifeRandom() * 18;
    const base = floorY(x, z) - .3;
    kelpSites.push({ position: new THREE.Vector3(x, base, z), scale: Math.max(10, -base + 1 + lifeRandom() * 6), spin: lifeRandom() * 6.3, color: pick(kelpColors, lifeRandom) });
  }
  for (let variant = 0; variant < 3; variant++) {
    const kelp = instanced(kelpGeometry(17 + variant * 5), kelpMat, kelpSites.filter((_, i) => i % 3 === variant), 'deep-sea-kelp');
    kelp.frustumCulled = false;
    scene.add(kelp);
  }

  // Sea fans stand across the swell on ledges and on the near blocks.
  const fanColors = ['#7b3a8a', '#c4542e', '#d09a34', '#9a2f3a', '#b46a9a'];
  const fanMaps = [fanTexture(5), fanTexture(19)];
  const fanSites = [
    ...shown(ledgeSites(40, 31, [-6, 8], [0, -22])).slice(0, 18).map(site => ({ position: site.position, scale: 1.0 + lifeRandom() * 1.2 })),
    ...blockTops(3, 41, near, .5, 1).map(site => ({ position: site.position, scale: .7 + lifeRandom() * .4 })),
  ];
  fanMaps.forEach((map, variant) => {
    const items = fanSites.filter((_, i) => i % 2 === variant).map(site => ({
      position: site.position.clone().add(new THREE.Vector3(0, -.05, 0)), normal: new THREE.Vector3(0, 1, 0),
      scale: new THREE.Vector3(site.scale * (.9 + lifeRandom() * .3), site.scale, site.scale), spin: (lifeRandom() - .5) * 1.1, tilt: (lifeRandom() - .5) * .25, color: pick(fanColors, lifeRandom),
    }));
    const fans = instanced(fanGeometry(), fanMaterial(map, clock), items, 'deep-sea-fans');
    fans.frustumCulled = false;
    scene.add(fans);
  });

  // Tube sponges grow in clusters; brain corals and anemones settle on the ledges.
  const spongeColors = ['#c0884a', '#a05a8e', '#d0703a', '#a89070', '#8a62a8', '#c06a62'];
  const spongeItems: Parameters<typeof instanced>[2] = [];
  const clusterAt = (position: THREE.Vector3, normal: THREE.Vector3, size: number, vase = 1) => {
    const color = pick(spongeColors, lifeRandom);
    const n = 2 + Math.floor(lifeRandom() * 4);
    for (let k = 0; k < n; k++) {
      const offset = new THREE.Vector3((lifeRandom() - .5) * .5, 0, (lifeRandom() - .5) * .5).multiplyScalar(size * 1.5);
      const s = size * (.55 + lifeRandom() * .6);
      const w = s * (1.5 + lifeRandom() * .5) * vase;
      spongeItems.push({ position: position.clone().add(offset).add(new THREE.Vector3(0, -.04, 0)), normal: normal.clone().add(new THREE.Vector3((lifeRandom() - .5) * .6, 0, (lifeRandom() - .5) * .6)), scale: new THREE.Vector3(w, s * (.7 + lifeRandom() * .7) / Math.sqrt(vase), w), spin: lifeRandom() * 6, color });
    }
  };
  // On the ledges, broad vase sponges read better at a distance than slender tubes.
  shown(ledgeSites(80, 53, [-6, 9], [0, -24])).slice(0, 30).forEach(site => clusterAt(site.position, site.normal, .34 + lifeRandom() * .25, 1.8));
  blockTops(7, 59, near, .6, 3).forEach(site => clusterAt(site.position, site.normal, .22 + lifeRandom() * .14));
  scene.add(instanced(tubeSpongeGeometry(31), spongeMaterial(clock), spongeItems, 'deep-sea-sponges'));

  const brainItems = [
    ...shown(ledgeSites(50, 61, [-6, 8], [0, -22])).slice(0, 22).map(site => ({ position: site.position, normal: site.normal, s: .3 + lifeRandom() * .35 })),
    ...blockTops(4, 67, near, .6, 1).map(site => ({ position: site.position, normal: site.normal, s: .22 + lifeRandom() * .2 })),
  ].map(site => ({ position: site.position.clone().add(new THREE.Vector3(0, -.03, 0)), normal: site.normal, scale: new THREE.Vector3(site.s * 1.2, site.s, site.s), spin: lifeRandom() * 6, color: pick(['#b8a070', '#8a9a62', '#c09068', '#a09a80'], lifeRandom) }));
  const brains = instanced(domeGeometry(), brainCoralMaterial(clock), brainItems, 'deep-sea-brain-coral');
  brains.receiveShadow = true;
  scene.add(brains);

  const anemoneColors = ['#e07a9a', '#f0a070', '#d05a8a', '#f2d2c8', '#c86ad0'];
  const anemoneItems = [
    ...blockTops(16, 71, near, .55, 5).map(site => ({ ...site, s: .3 + lifeRandom() * .22 })),
    ...shown(ledgeSites(40, 73, [-4, 7], [0, -16])).slice(0, 14).map(site => ({ ...site, s: .28 + lifeRandom() * .15 })),
  ].map(site => ({ position: site.position.clone().add(new THREE.Vector3(0, -.03, 0)), normal: site.normal, scale: site.s, spin: lifeRandom() * 6, color: pick(anemoneColors, lifeRandom) }));
  const anemones = instanced(anemoneGeometry(9), anemoneMaterial(clock), anemoneItems, 'deep-sea-anemones');
  anemones.frustumCulled = false;
  scene.add(anemones);

  // Orange cup corals hang under the overhangs, where the shade suits them.
  const cupItems = shown(faceSites(140, 83, [-5, 9], [2, -20], [.02, .2])).slice(0, 70).map(site => ({ position: site.position.clone().addScaledVector(site.normal, -.03), normal: site.normal, scale: .5 + lifeRandom() * .45, spin: lifeRandom() * 6 }));
  blockTops(6, 87, near, .2, 2).forEach(site => cupItems.push({ position: site.position.clone().addScaledVector(site.normal, -.02), normal: site.normal, scale: .4 + lifeRandom() * .3, spin: lifeRandom() * 6 }));
  scene.add(instanced(cupCoralGeometry(3), cupCoralMaterial(clock), cupItems, 'deep-sea-cup-coral'));

  // Plates grow out of the faces in tiers, half their disc buried in the rock.
  const plateItems = shown(faceSites(220, 79, [-5, 9], [1, -22], [.4, .85])).slice(0, 34).map(site => {
    const s = .32 + lifeRandom() * .45;
    const out = new THREE.Vector3(site.normal.x, 0, site.normal.z).normalize();
    return { position: site.position.clone().addScaledVector(out, s * .4).add(new THREE.Vector3(0, -.02, 0)), normal: new THREE.Vector3(out.x * .12, 1, out.z * .12), scale: new THREE.Vector3(s, s * .7, s), spin: lifeRandom() * 6, color: pick(['#9a8a62', '#7a8a6a', '#a07a5a', '#8a7a8a'], lifeRandom) };
  });
  const plates = instanced(plateGeometry(13), plateMaterial(clock), plateItems, 'deep-sea-plates');
  plates.castShadow = true; plates.receiveShadow = true;
  scene.add(plates);

  // Sea whips sprout from the bulging faces, leaning out toward the light.
  const whipItems = shown(faceSites(200, 89, [-5, 9], [2, -24], [.35, .9])).slice(0, 60).map(site => ({
    position: site.position.clone().addScaledVector(site.normal, -.02), normal: site.normal.clone().lerp(new THREE.Vector3(0, 1, 0), .65).normalize(),
    scale: new THREE.Vector3(1.3, .4 + lifeRandom() * .55, 1.3), spin: lifeRandom() * 6, color: pick(['#d8a040', '#c8582a', '#e0c8a0', '#9a3a5a'], lifeRandom),
  }));
  const whips = instanced(whipGeometry(), whipMaterial(clock), whipItems, 'deep-sea-whips');
  whips.frustumCulled = false;
  scene.add(whips);

  // Sea stars and urchins on the near blocks.
  const starItems = blockTops(3, 97, [-5.5, -.8, 3.5, -4], .7, 1).map(site => ({ position: site.position.clone().add(new THREE.Vector3(0, -.015, 0)), normal: site.normal, scale: .3 + lifeRandom() * .08, spin: lifeRandom() * 6, color: pick(['#ffffff', '#ffd0c0', '#ffb0a0'], lifeRandom) }));
  shown(ledgeSites(20, 101, [-3, 5], [0, -10])).slice(0, 3).forEach(site => starItems.push({ position: site.position.clone(), normal: site.normal, scale: .18 + lifeRandom() * .06, spin: lifeRandom() * 6, color: '#ffffff' }));
  scene.add(instanced(seaStarGeometry(4), seaStarMaterial(clock), starItems, 'deep-sea-stars'));
  const urchinItems = blockTops(6, 103, near, .55, 2).map(site => ({ position: site.position.clone().add(new THREE.Vector3(0, .02, 0)), normal: site.normal, scale: .11 + lifeRandom() * .05, spin: lifeRandom() * 6 }));
  scene.add(instanced(urchinGeometry(7), urchinMaterial(clock), urchinItems, 'deep-sea-urchins'));

  // --- Open-water life -----------------------------------------------------------------------
  const mainJelly = createJelly(1.03, '#8fe0ee', 2, clock, .9);
  const home = new THREE.Vector3(1.25, 2.25, -5.1);
  mainJelly.group.position.copy(home); mainJelly.group.rotation.z = -.12;
  mainJelly.group.name = 'deep-sea-touch-organism'; mainJelly.bell.name = 'deep-sea-touch-bell';
  scene.add(mainJelly.group);
  const farJellies: { group: THREE.Group; home: THREE.Vector3; phase: number }[] = [];
  for (const [x, y, z, size, phase] of [[-1.0, 4.7, -18, .60, 3], [5.4, .5, -22, .77, 5], [2.2, 7, -31, .75, 1], [-.1, -1.1, -29, .56, 7]]) {
    const jelly = createJelly(size, '#7fd0e0', phase, clock, .75);
    const at = new THREE.Vector3(x, y, z); jelly.group.position.copy(at); scene.add(jelly.group);
    farJellies.push({ group: jelly.group, home: at, phase });
  }
  const schools = createSchools(clock);
  schools.forEach(school => scene.add(school.mesh));

  // Marine snow at three depths: soft near flakes, a mid layer and fine far specks.
  scene.add(createSnowLayer({ count: 520, min: new THREE.Vector3(-4.5, -2.5, .2), size: new THREE.Vector3(9, 8.5, 5.4), flake: .012, brightness: 2.4, seed: 3, time: clock, soft: 1 }).points);
  scene.add(createSnowLayer({ count: 3200, min: new THREE.Vector3(-10, -6, -16), size: new THREE.Vector3(22, 18, 16.2), flake: .01, brightness: 2.4, seed: 5, time: clock }).points);
  scene.add(createSnowLayer({ count: 3000, min: new THREE.Vector3(-18, -12, -50), size: new THREE.Vector3(40, 30, 34), flake: .014, brightness: 2.0, seed: 7, time: clock }).points);

  // Faint bioluminescent plankton drift in the dark water below the light.
  const glintCount = 420, glintPositions = new Float32Array(glintCount * 3), glintSeeds = new Float32Array(glintCount);
  for (let i = 0; i < glintCount; i++) { glintPositions.set([-1 + rnd() * 24, -14 + rnd() * 12, -6 - rnd() * 40], i * 3); glintSeeds[i] = rnd(); }
  const glintGeo = new THREE.BufferGeometry();
  glintGeo.setAttribute('position', new THREE.BufferAttribute(glintPositions, 3));
  glintGeo.setAttribute('seed', new THREE.BufferAttribute(glintSeeds, 1));
  scene.add(new THREE.Points(glintGeo, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: clock },
    vertexShader: `attribute float seed;uniform float uTime;varying float vGlow;
      void main(){vec3 p=position+vec3(sin(uTime*.05+seed*30.)*.4,sin(uTime*.03+seed*20.)*.5,0.);
      vec4 mv=modelViewMatrix*vec4(p,1.);
      vGlow=pow(.5+.5*sin(uTime*(.15+seed*.25)+seed*60.),3.)*(.4+seed*.6)*exp(-length(mv.xyz)*.03);
      gl_PointSize=clamp(30./-mv.z,1.,2.4);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vGlow;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(vec3(.2,.85,1.)*2.2*vGlow*(1.-smoothstep(0.,1.,d)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  })));

  // Fallback shafts for renderers without the HDR volume pass.
  const fallbackShafts: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: clock, uSeed: { value: i * 2.7 } },
      vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `precision highp float; varying vec2 vUv; uniform float uTime; uniform float uSeed;
        void main(){float width=mix(.42,.085,vUv.y);float x=(vUv.x-.5)/width;
        float beam=exp(-x*x*3.5)*smoothstep(0.,.23,vUv.y)*(1.-smoothstep(.92,1.,vUv.y));
        beam*=.8+.2*sin(vUv.y*19.+uTime*.6+uSeed);gl_FragColor=vec4(.27,.68,.71,beam*.075);}`,
    });
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(9 + i * 1.1, 33), mat);
    shaft.position.set(-1 + i * 4.0, 6, -22 - i * 3.4); shaft.rotation.z = -.15 - i * .035; shaft.renderOrder = 0;
    scene.add(shaft); fallbackShafts.push(shaft);
  }

  const interactTargets: THREE.Object3D[] = [mainJelly.bell];
  return {
    scene, camera, target,
    post: { exposure: 1.25, bloomStrength: .14, aoStrength: .9, aoRadius: .7, saturation: 1.08, contrast: 1.1, shadowTint: [.88, .98, 1.1], highlightTint: [1.0, 1.04, 1.02], vignette: .5, grain: .03 },
    createVolume(): VolumeEffect {
      return { material: new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX, fragmentShader: VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false,
        uniforms: { uLight: { value: new THREE.Vector3(.12, .42, .48) }, uDensity: { value: .03 }, uExtinction: { value: .006 } },
      }) };
    },
    setPostActive(active) { fallbackShafts.forEach(shaft => { shaft.visible = !active; }); },
    update(time, dt) {
      clock.value = time;
      pulseTarget = Math.max(0, pulseTarget - dt * .13);
      pulse += (pulseTarget - pulse) * (1 - Math.exp(-dt * 1.8));
      mainJelly.group.position.set(home.x + Math.sin(time * .047) * .16, home.y + Math.sin(time * .095) * .23, home.z);
      mainJelly.group.rotation.z = -.12 + Math.sin(time * .067) * .025;
      mainJelly.uniforms.uPulse.value = pulse;
      for (const item of farJellies) {
        item.group.position.y = item.home.y + Math.sin(time * .07 + item.phase) * .28;
        item.group.rotation.z = Math.sin(time * .043 + item.phase) * .08;
      }
      for (const school of schools) school.update(time);
    },
    interact(ray) {
      const hit = ray.intersectObjects(interactTargets, false)[0];
      if (!hit) return null;
      pulseTarget = .9;
      return { world: 'sea', kind: 'organism-pulse', strength: .28, pan: .18 };
    },
    resize(aspect) {
      // Portrait deliberately keeps the tactile left ledge and near organism together.
      camera.fov = aspect < .8 ? 56 : 49;
      camera.updateProjectionMatrix();
    },
  };
}

