import * as THREE from 'three';
import type { SceneContent } from '../types';
import { createCheckedEnvironment } from '../environment';
import { createNightSky } from '../../shared/render/skyNight';
import { createNoiseVolume } from '../../shared/render/fireFlame';
import { FULLSCREEN_VERTEX } from '../../shared/render/targets';
import type { VolumeEffect } from '../../shared/render/hdrPipeline';
import { buildTree, concatGeometries, type TreeBuild } from '../../shared/render/treeGeometry';
import { applyFoliageShading } from '../../shared/render/foliageShading';
import { bambooSprayTexture, broadleafClusterTexture, litterTexture } from '../../shared/render/foliageTextures';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { fbm3, seeded } from '../../shared/render/noise';
import { bakeStatic, canvasTexture, glowTexture, lathe } from './kit';
import {
  cardCrown, cloudUniforms, createCanopySurfaceMaterial, faceCards, createCloudDome, createEarthMaterial, createPaddyWaterMaterial, createRenderMaterial, createRoadMaterial,
  createRoofTileMaterial, createTimberMaterial, fleabane, grassClump, inPaddy, PADDY_BACK, pathX, pineNeedleTexture, plantMaterial, riceHill, rosette,
  RIDGES, ROAD_HALF, RURAL_VOLUME_FRAGMENT, skylineTexture, YARD,
} from './ruralParts';

/*
 * A Korean countryside on an early-summer night: flooded paddies of newly
 * transplanted rice mirror a moonlit sky; a cracked concrete farm road bends
 * between earthen ridges toward a lit farmhouse under a zelkova and a pine
 * and oak hill. Everything is authored procedurally in this file and
 * ruralParts.ts; nothing is loaded.
 */

const deg = THREE.MathUtils.degToRad;
/** Toward the moon: azimuth from straight ahead (-z), elevation above the horizon. */
const moonDirection = (azimuth: number, elevation: number) => new THREE.Vector3(Math.sin(deg(azimuth)) * Math.cos(deg(elevation)), Math.sin(deg(elevation)), -Math.cos(deg(azimuth)) * Math.cos(deg(elevation)));
const MOON_ELEVATION = 18;
const MOON_COLOR = new THREE.Color('#c9d8ff');
const ROAD_Y = .34;
/** The farmyard sits on a raised plot above the paddies. */
const YARD_Y = .62;
const roadCrown = (lateral: number) => ROAD_Y + .05 * (1 - lateral * lateral);

export function createRuralScene(renderer?: THREE.WebGLRenderer): SceneContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#050a16');
  const directFog = new THREE.FogExp2('#0f1a2c', .0085);
  scene.fog = directFog;
  scene.userData.exposure = 1.2;
  const camera = new THREE.PerspectiveCamera(55, 1, .08, 1400);
  const random = seeded(18073);
  const time = { value: 0 };
  const textures: THREE.Texture[] = [];
  const own = <T extends THREE.Texture>(t: T) => { textures.push(t); return t; };
  const disposables: Array<{ dispose(): void }> = [];

  /* ------------------------------------------------------------------ sky */
  const noise = own(createNoiseVolume(48, 23));
  let moonDir = moonDirection(-22, MOON_ELEVATION);
  const sky = createNightSky({
    noise, zenith: '#081430', horizon: '#2a4163', brightness: 1.15,
    glow: { color: '#8ea6cf', direction: moonDir, intensity: .075, width: 3.2, height: .22 },
    airglow: .02,
    moon: { direction: moonDir, intensity: 46, radius: .018, halo: 1.1, color: '#fff4dc', sunDirection: moonDir.clone().negate() },
    galaxy: { pole: new THREE.Vector3(.75, .35, .56), centre: new THREE.Vector3(.45, .3, -.84), intensity: .01 },
    stars: { count: 2600, seed: 1987, intensity: .85, galacticFraction: .28, twinkle: .6 },
  });
  scene.add(sky.group);
  const clouds = cloudUniforms();
  scene.add(createCloudDome(sky.uniforms, clouds));

  /* --------------------------------------------------------------- lights */
  const moonlight = new THREE.DirectionalLight(MOON_COLOR, 2.1);
  moonlight.castShadow = true; moonlight.shadow.mapSize.set(2048, 2048);
  Object.assign(moonlight.shadow.camera, { left: -30, right: 30, top: 34, bottom: -26, near: 5, far: 180 });
  moonlight.shadow.radius = 3; moonlight.shadow.bias = -.0003; moonlight.shadow.normalBias = .035;
  moonlight.target.position.set(3, 0, -14);
  scene.add(moonlight, moonlight.target);
  const hemi = new THREE.HemisphereLight('#2c3f63', '#0b0f0c', .12); scene.add(hemi);

  /* ------------------------------------------------------------- terrain */
  const smooth = THREE.MathUtils.smoothstep;
  const yardMask = (x: number, z: number) => {
    const dx = Math.max(YARD.x0 - x, 0, x - YARD.x1), dz = Math.max(YARD.z0 - z, 0, z - YARD.z1);
    return 1 - smooth(Math.hypot(dx, dz), 0, 1.2);
  };
  const hillRise = (x: number, z: number) => Math.max(0, -z - 44) * (.16 + .05 * Math.sin(x * .05)) + fbm3(x * .04, 2, z * .04, 3) * 1.2 * smooth(-z, 40, 50);
  const groundY = (x: number, z: number) => {
    let y = -.12;
    const back = smooth(-z, -PADDY_BACK, -PADDY_BACK + 3);
    y = THREE.MathUtils.lerp(y, .3 + hillRise(x, z), back);
    y = THREE.MathUtils.lerp(y, YARD_Y, yardMask(x, z));
    return y;
  };
  {
    const xs: number[] = [], zs: number[] = [];
    for (let x = -110; x <= 110; x += x < -45 || x > 45 ? 3 : 1) xs.push(x);
    for (let z = 13; z >= -45; z -= 1) zs.push(z);
    const positions: number[] = [], indices: number[] = [];
    for (const z of zs) for (const x of xs) positions.push(x, groundY(x, z), z);
    for (let r = 0; r < zs.length - 1; r++) for (let c = 0; c < xs.length - 1; c++) {
      const a = r * xs.length + c, b = a + 1, d = a + xs.length, e = d + 1; indices.push(a, b, d, b, e, d);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    const ground = new THREE.Mesh(g, createEarthMaterial('fields', { grass: .8 })); ground.receiveShadow = true; ground.name = 'Fields'; scene.add(ground);
  }
  // Flooded paddies: one still sheet; ridges, road and yard rise through it.
  const water: THREE.Mesh<THREE.BufferGeometry, THREE.Material> = new THREE.Mesh(new THREE.PlaneGeometry(220, PADDY_BACK * -1 + 14, 1, 1).rotateX(-Math.PI / 2).translate(0, 0, (13 + PADDY_BACK - .5) / 2), new THREE.MeshBasicMaterial());
  water.name = 'Paddy water'; scene.add(water);

  /* ---------------------------------------------------------------- road */
  const lampPositions = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], lampColors = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  const roadMaterial = createRoadMaterial({ positions: lampPositions, colors: lampColors });
  const shoulderMaterial = createEarthMaterial('shoulder', { grass: .9, mud: 1 });
  {
    const columns = 15, positions: number[] = [], indices: number[] = [];
    const sPositions: number[] = [], sIndices: number[] = [];
    const rows: number[] = [];
    for (let z = 12.5; z > -23.6; z -= z > -2 ? .25 : .5) rows.push(z);
    // The last few metres climb onto the raised yard.
    const ramp = (z: number) => (YARD_Y - ROAD_Y + .04) * smooth(-z, 18.5, 23.4);
    rows.forEach((z, i) => {
      const cx = pathX(z), crumble = (s: number) => (random() - .5) * .07 + Math.sin(z * 3.1 + s) * .03;
      const left = -1 + crumble(1) / ROAD_HALF, right = 1 + crumble(2) / ROAD_HALF;
      for (let c = 0; c < columns; c++) {
        const lat = THREE.MathUtils.lerp(left, right, c / (columns - 1));
        positions.push(cx + lat * ROAD_HALF, roadCrown(lat) + ramp(z) + (random() - .5) * .004, z);
      }
      // Shoulders: the slab edge drops, then a grassy bank slopes into the paddy.
      for (const [side, edge] of [[-1, left], [1, right]] as const) {
        const base = cx + edge * ROAD_HALF;
        const ring = [[0, roadCrown(edge) - .005 + ramp(z)], [.01, ROAD_Y - .1 + ramp(z)], [.35 + random() * .1, ROAD_Y - .17 + random() * .03 + ramp(z) * .8], [.75 + random() * .15, .08 + ramp(z) * .5], [1.05 + random() * .2, -.08]];
        for (const [out, y] of ring) sPositions.push(base + side * out, y, z);
      }
      if (i < rows.length - 1) {
        for (let c = 0; c < columns - 1; c++) { const a = i * columns + c; indices.push(a, a + 1, a + columns, a + 1, a + columns + 1, a + columns); }
        for (let s = 0; s < 2; s++) for (let k = 0; k < 4; k++) {
          const a = i * 10 + s * 5 + k, b = a + 10;
          if (s === 0) sIndices.push(a, b, a + 1, a + 1, b, b + 1); else sIndices.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    const road = new THREE.Mesh(g, roadMaterial); road.receiveShadow = true; road.name = 'Farm road'; scene.add(road);
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sPositions, 3)); sg.setIndex(sIndices); sg.computeVertexNormals();
    const shoulders = new THREE.Mesh(sg, shoulderMaterial); shoulders.receiveShadow = true; shoulders.name = 'Road shoulders'; scene.add(shoulders);
  }

  /* -------------------------------------------------------------- ridges */
  const ridgeMaterial = createEarthMaterial('ridge', { grass: .75, mud: 1 });
  const ridgeTop: Array<[number, number]> = [];
  {
    const positions: number[] = [], indices: number[] = [];
    const profile: Array<[number, number]> = [[-.55, -.1], [-.36, .07], [-.2, .18], [0, .22], [.2, .18], [.36, .07], [.55, -.1]];
    for (const [x0, z0, x1, z1] of RIDGES) {
      const length = Math.hypot(x1 - x0, z1 - z0), steps = Math.ceil(length / .5);
      const ux = (x1 - x0) / length, uz = (z1 - z0) / length, nx = -uz, nz = ux;
      const base = positions.length / 3;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
        const wobble = Math.sin(t * length * .7 + x0) * .08 + (random() - .5) * .05, height = 1 + Math.sin(t * length * .43 + z0) * .12 + (random() - .5) * .1;
        for (const [o, y] of profile) positions.push(x + nx * (o * (1 + (random() - .5) * .15) + wobble), y * height, z + nz * (o + wobble));
        if (i % 2 === 0) ridgeTop.push([x + nx * wobble, z + nz * wobble]);
        if (i < steps) for (let k = 0; k < profile.length - 1; k++) {
          const a = base + i * profile.length + k, b = a + profile.length; indices.push(a, b, a + 1, a + 1, b, b + 1);
        }
      }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    // Faces can wind either way along a ridge direction; draw both sides.
    ridgeMaterial.side = THREE.DoubleSide;
    const ridges = new THREE.Mesh(g, ridgeMaterial); ridges.receiveShadow = true; ridges.castShadow = true; ridges.name = 'Paddy ridges'; scene.add(ridges);
  }

  /* ---------------------------------------------------------------- rice */
  const eye = new THREE.Vector3(0, 1.56, 10.4);
  const inView = (x: number, z: number, margin = 1.5) => z < eye.z - 1.2 && Math.abs(x - .3) < (eye.z - z) * 1.12 + margin;
  const touch = { value: new THREE.Vector3(1000, 1000, 0) };
  const riceMaterial = plantMaterial('rice', time, { height: .34, sway: .022, flutter: .006, translucency: '#a9c86a', roughness: .5, touch });
  {
    const lists: THREE.Matrix4[][] = [[], [], []];
    const tints: THREE.Color[][] = [[], [], []];
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    const place = (x: number, z: number, young: boolean) => {
      if (!inView(x, z) || !inPaddy(x, z, .1) || random() < (young ? .06 : .03)) return;
      const d = Math.hypot(x - eye.x, z - eye.z);
      if (d < 2.2) return;
      const lod = d < 13 ? 0 : d < 25 ? 1 : 2;
      const scale = (young ? .62 : .85) + random() * (young ? .2 : .35);
      p.set(x + (random() - .5) * .04, -.01, z + (random() - .5) * .04);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), random() * Math.PI * 2);
      s.set(scale, scale * (young ? .5 + random() * .16 : .85 + random() * .3), scale);
      lists[lod].push(m.compose(p, q, s).clone());
      const patch = .5 + .5 * Math.sin(x * .21 + z * .13) * Math.sin(x * .07 - z * .19);
      tints[lod].push(new THREE.Color().setHSL(.2 + patch * .05 + random() * .02, .3 + random() * .1, .3 + patch * .06 + random() * .06));
    };
    // Machine-transplanted rows: 30 cm apart, hills every 16 cm. Rows recede on the left and run across on the right.
    for (let x = -1.2; x > -62; x -= .3) for (let z = 9.6; z > PADDY_BACK; z -= .16) if (x < pathX(z)) place(x, z, z > -29.5);
    for (let z = 9.6; z > PADDY_BACK; z -= .3) for (let x = 1; x < 62; x += .16) if (x > pathX(z)) place(x, z, false);
    const shapes = [riceHill(11, 9, 3, .34), riceHill(12, 5, 2, .34), riceHill(13, 3, 1, .34)];
    lists.forEach((list, lod) => {
      const mesh = new THREE.InstancedMesh(shapes[lod], riceMaterial, list.length);
      list.forEach((matrix, i) => { mesh.setMatrixAt(i, matrix); mesh.setColorAt(i, tints[lod][i]); });
      mesh.castShadow = false; mesh.receiveShadow = lod < 2; mesh.computeBoundingSphere(); mesh.name = `Rice LOD${lod}`;
      scene.add(mesh); disposables.push(mesh);
    });
  }

  /* ------------------------------------------------------ fallen leaves */
  {
    const leafMap = own(litterTexture({ seed: 71, colors: ['#5f4a33', '#6e5a37', '#3f3324', '#74663f'] }));
    const card = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    const uv = card.attributes.uv as THREE.BufferAttribute;
    const leaves = new THREE.InstancedMesh(card, new THREE.MeshStandardMaterial({ map: leafMap, roughness: .8, alphaTest: .5, side: THREE.DoubleSide }), 140);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pos = new THREE.Vector3();
    for (let i = 0; i < 140; i++) {
      const z = 9 - Math.pow(random(), 1.6) * 30, lat = (random() * 2 - 1) * (random() < .6 ? 1 : .5), x = pathX(z) + lat * ROAD_HALF;
      pos.set(x, roadCrown(lat) + .006, z);
      q.setFromEuler(new THREE.Euler((random() - .5) * .3, random() * Math.PI * 2, (random() - .5) * .3));
      const size = .07 + random() * .06; sc.set(size, 1, size);
      leaves.setMatrixAt(i, m.compose(pos, q, sc));
      leaves.setColorAt(i, new THREE.Color().setHSL(.08 + random() * .05, .4, .35 + random() * .2));
    }
    // One quadrant of the 2x2 leaf atlas per card.
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * .5, uv.getY(i) * .5);
    leaves.receiveShadow = true; leaves.name = 'Fallen leaves'; scene.add(leaves); disposables.push(leaves);
  }

  /* ------------------------------------------------ grass and wildflowers */
  {
    const grassMaterial = plantMaterial('ridge-grass', time, { height: .45, sway: .03, translucency: '#b8d77a', roughness: .6 });
    const flowerMaterial = plantMaterial('fleabane', time, { height: .7, sway: .04, translucency: '#e6eedd', roughness: .7 });
    const near: THREE.Matrix4[] = [], far: THREE.Matrix4[] = [], flowers: THREE.Matrix4[] = [], rosettes: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
    const put = (list: THREE.Matrix4[], x: number, y: number, z: number, scale: number) => {
      p.set(x, y, z); q.setFromAxisAngle(up, random() * Math.PI * 2); s.set(scale, scale * (.8 + random() * .5), scale); list.push(m.compose(p, q, s).clone());
    };
    for (const [x, z] of ridgeTop) {
      if (!inView(x, z, 4)) continue;
      const d = Math.hypot(x - eye.x, z - eye.z);
      for (let k = 0; k < 2; k++) put(d < 16 ? near : far, x + (random() - .5) * .5, .1 + random() * .08, z + (random() - .5) * .5, .7 + random() * .6);
      if (random() < .16) put(flowers, x + (random() - .5) * .3, .18, z + (random() - .5) * .3, .8 + random() * .4);
    }
    for (let z = 12; z > -26; z -= .1) for (const side of [-1, 1]) {
      const d = Math.abs(z - eye.z);
      if (d > 18 && random() < .6) continue;
      if (d < 16 && random() < .6) {
        const o = .05 + random() * .8, rx = pathX(z) + side * (ROAD_HALF + o);
        put(rosettes, rx, o < .4 ? ROAD_Y - .14 : .08, z + (random() - .5) * .1, .45 + random() * .45);
      }
      const out = .2 + random() * .9, x = pathX(z) + side * (ROAD_HALF + out);
      if (!inView(x, z, 2)) continue;
      const y = out < .4 ? ROAD_Y - .15 : out < .8 ? .1 : -.04;
      put(d < 16 ? near : far, x, y, z, .7 + random() * .7 + (out > .8 ? .2 : 0));
      if (random() < .1) put(flowers, x + side * .2, y, z, .75 + random() * .45);
      // Weeds pushing through the cracked slab edge.
      if (random() < .22) put(d < 16 ? near : far, pathX(z) + side * (ROAD_HALF - .04 - random() * .14), ROAD_Y + .01, z, .3 + random() * .35);
    }
    // Grass in the transverse slab joints (every 4.8 m), thickest toward the edges.
    for (let k = 0; k < 9; k++) {
      const z = 2.4 - 4.8 * k;
      for (let i = 0; i < 14; i++) {
        const lat = (random() * 2 - 1), x = pathX(z) + lat * ROAD_HALF;
        if (Math.abs(lat) < .55 && random() < .7) continue;
        if (!inView(x, z, 1)) continue;
        put(Math.abs(z - eye.z) < 16 ? near : far, x, roadCrown(lat) - .01, z + (random() - .5) * .03, .25 + random() * .3 * Math.abs(lat));
      }
    }
    const parts: Array<[THREE.BufferGeometry, THREE.Material, THREE.Matrix4[], string]> = [
      [grassClump(21, 13, .36), grassMaterial, near, 'Grass near'], [grassClump(22, 6, .36), grassMaterial, far, 'Grass far'], [fleabane(23), flowerMaterial, flowers, 'Fleabane'],
      [rosette(24), grassMaterial, rosettes, 'Rosettes'],
    ];
    for (const [geometry, material, list, name] of parts) {
      const mesh = new THREE.InstancedMesh(geometry, material, list.length);
      list.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
      mesh.receiveShadow = true; mesh.castShadow = name === 'Grass near'; mesh.computeBoundingSphere(); mesh.name = name;
      scene.add(mesh); disposables.push(mesh);
    }
  }

  /* ------------------------------------------------------- trees and hills */
  const skylineSamples: Array<[number, number, number, number]> = [];
  const own2 = <T extends THREE.MeshStandardMaterial>(m: T) => { foliageMaterials.push(m); return m; };
  const leafAtlas = own(broadleafClusterTexture({ seed: 41, palette: { base: '#3f5c2c', light: '#5f7d3c', dark: '#26391b', stem: '#463a2b' }, round: .45 }));
  // Distant crowns use a denser atlas of smaller leaves so they read as foliage mass, not single leaves.
  const massAtlas = own(broadleafClusterTexture({ seed: 43, palette: { base: '#34502a', light: '#3f5e30', dark: '#283d1e', stem: '#3a3125' }, round: .5, leafScale: .55, density: 2.4 }));
  const pineAtlas = own(pineNeedleTexture(77));
  const foliageMaterials: THREE.MeshStandardMaterial[] = [];
  const foliage = (map: THREE.Texture, key: string, wind: boolean, tint = '#c4e08a', transmit = 1) => applyFoliageShading(own2(new THREE.MeshPhysicalMaterial({ map, vertexColors: true, side: THREE.DoubleSide, alphaTest: .5, alphaToCoverage: true, roughness: .92, envMapIntensity: .3, specularIntensity: .12 })), {
    key: `rural-${key}`, sharedNormals: true, coverage: true, translucency: { tint, back: .05 * transmit, forward: .06 * transmit },
    wind: wind ? { time, mode: 'attribute', sway: .05, flutter: .012, speed: .6 } : { time, mode: 'height', height: 6, sway: .02, flutter: .006, speed: .5 },
  });
  const crownMaterial = foliage(massAtlas, 'hill-crowns', false, '#b4cf86', .5);
  const pineMaterial = foliage(pineAtlas, 'hill-pines', false, '#a8c27a', .5);
  const barkMaterial = applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .9 }), { key: 'rural-bark', plate: '#5c574e', fissure: '#1d1915', lichen: { color: '#8c9478', amount: .25 }, moss: { color: '#34461f', amount: .3 } });
  // The village grove: an old zelkova by the lane, a persimmon in the yard and oaks behind the house.
  const groveSpecs: Array<[number, number, number, number, 'broadleaf' | 'column', number]> = [
    [-16, -42, 19, .85, 'broadleaf', .68], [14.2, -28.5, 6.8, .2, 'broadleaf', .45], [21, -44, 12, .4, 'broadleaf', .45],
    [3.5, -45.5, 13, .42, 'column', .3], [-30, -46, 10.5, .35, 'broadleaf', .45], [33, -42, 9, .3, 'broadleaf', .45],
  ];
  const grove: TreeBuild[] = groveSpecs.map(([x, z, h, r, form, spread], i) => buildTree({
    seed: 300 + i, base: new THREE.Vector3(x, groundY(x, z) - .1, z), height: h, radius: r, form,
    gnarl: i === 0 ? .5 : .35, flare: .6, crownStart: i === 0 ? .3 : .4, limbs: i === 0 ? 7 : 6, levels: i < 2 ? 2 : 1, children: 3, spread, curl: .25,
    radial: i === 0 ? 14 : 9, ringsPerMetre: 1.5, displace: 0, flex: .25,
    // The zelkova's leaves gather in clumps at the limb ends, with sky between them.
    leaves: i === 0
      ? { cardsPerTwig: 10, size: .95, reach: .45, crownNormals: 1, shade: [.15, 1], fill: 0 }
      : { cardsPerTwig: 14, size: i === 1 ? .8 : 1.0, reach: .8, crownNormals: 1, shade: [.2, 1], fill: .25 },
  }));
  grove.forEach(t => skylineSamples.push([t.crown.centre.x, t.crown.centre.y + t.crown.radius.y * .85, t.crown.centre.z, t.crown.radius.x * .9]));
  {
    const bark = new THREE.Mesh(concatGeometries(grove.map(t => t.bark)), barkMaterial); bark.castShadow = true; bark.receiveShadow = true; bark.name = 'Grove trunks'; scene.add(bark);
    const groveLeaves = foliage(massAtlas, 'grove-leaves', true, '#b4cf86', .7);
    const leaves = new THREE.Mesh(faceCards(concatGeometries(grove.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g)), eye, .55), groveLeaves);
    leaves.castShadow = true; leaves.receiveShadow = true; leaves.name = 'Grove leaves'; scene.add(leaves);
    grove.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });
  }
  // A bamboo grove behind the house: leaning culms and drooping leaf sprays.
  {
    const culms: THREE.BufferGeometry[] = [];
    const sprays: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < 34; i++) {
      const x = 9 + random() * 9, z = -38.6 - random() * 3.5, h = 7 + random() * 4.5, lean = new THREE.Vector3((random() - .3) * 1.6, 0, (random() - .5) * 1.2);
      const base = new THREE.Vector3(x, groundY(x, z) - .1, z), top = base.clone().add(new THREE.Vector3(lean.x, h, lean.z));
      const mid = base.clone().lerp(top, .5).add(new THREE.Vector3(lean.x * .15, 0, lean.z * .15));
      const curve = new THREE.CatmullRomCurve3([base, mid, top]);
      culms.push(new THREE.TubeGeometry(curve, 8, .035 + random() * .02, 5, false));
      for (let k = 0; k < 13; k++) {
        const t = .45 + .55 * (k / 13) + random() * .04;
        p.copy(curve.getPoint(Math.min(1, t))).add(new THREE.Vector3((random() - .5) * 1.2, (random() - .3) * .5, (random() - .5) * 1.2));
        q.setFromEuler(new THREE.Euler((random() - .5) * .7, random() * Math.PI * 2, (random() - .5) * .7));
        const size = 1.2 + random() * .7; s.set(size, size, size);
        sprays.push(m.compose(p, q, s).clone());
      }
      skylineSamples.push([top.x, top.y, top.z, 1.5]);
    }
    const culmMesh = new THREE.Mesh(concatGeometries(culms), new THREE.MeshStandardMaterial({ color: '#4c5a35', roughness: .45 }));
    culmMesh.castShadow = true; culmMesh.name = 'Bamboo culms'; scene.add(culmMesh); culms.forEach(g => g.dispose());
    const bambooAtlas = own(bambooSprayTexture({ seed: 61, palette: { base: '#4a6430', light: '#64803e', dark: '#2b3d1c', stem: '#4e5a32' } }));
    const card = new THREE.PlaneGeometry(1, 1).translate(0, .5, 0);
    const uv = card.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * .5);
    const sprayMesh = new THREE.InstancedMesh(card, foliage(bambooAtlas, 'bamboo', false, '#c2dc8a', .6), sprays.length);
    sprays.forEach((matrix, i) => { sprayMesh.setMatrixAt(i, matrix); sprayMesh.setColorAt(i, new THREE.Color().setHSL(.22 + random() * .04, .3, .3 + random() * .1)); });
    sprayMesh.castShadow = true; sprayMesh.receiveShadow = true; sprayMesh.name = 'Bamboo leaves'; sprayMesh.computeBoundingSphere(); scene.add(sprayMesh); disposables.push(sprayMesh);
  }
  // The wooded hill behind the village: oak and chestnut crowns with red pines standing above them on the crest.
  const hillY = (x: number, z: number) => {
    const crest = 15 + 6 * Math.sin(x * .021 + .7) + 4 * Math.sin(x * .047 + 2) + fbm3(x * .03, 7, 0, 3) * 5 - 9 * Math.exp(-(((x + 30) / 13) ** 2));
    const front = smooth(-z, 46, 82), back = 1 - smooth(-z, 92, 125);
    return groundY(x, Math.max(z, -60)) * (1 - front) + crest * front * back + Math.max(0, -z - 46) * .04;
  };
  {
    const xs: number[] = [], zs: number[] = [];
    for (let x = -170; x <= 170; x += 3) xs.push(x);
    for (let z = -45; z >= -126; z -= 3) zs.push(z);
    const positions: number[] = [], indices: number[] = [];
    for (const z of zs) for (const x of xs) positions.push(x, hillY(x, z), z);
    for (let r = 0; r < zs.length - 1; r++) for (let c = 0; c < xs.length - 1; c++) { const a = r * xs.length + c, b = a + 1, d = a + xs.length, e = d + 1; indices.push(a, b, d, b, e, d); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    const hill = new THREE.Mesh(g, createCanopySurfaceMaterial()); hill.name = 'Wooded hill'; scene.add(hill);
  }
  {
    const toViewer = new THREE.Vector3(0, .12, 1).normalize();
    const archetypes = [
      cardCrown(51, 170, new THREE.Vector3(3.2, 2.6, 3.2), .95, { view: toViewer }), cardCrown(52, 140, new THREE.Vector3(2.4, 2.9, 2.4), .9, { view: toViewer }),
      cardCrown(53, 95, new THREE.Vector3(2.2, 1.6, 2.2), .85, { view: toViewer }), cardCrown(54, 90, new THREE.Vector3(3.4, 1.4, 3.0), 1.0, { pads: 4, flat: .75, view: toViewer, facing: .45 }),
    ];
    const lists: THREE.Matrix4[][] = archetypes.map(() => []), tints: THREE.Color[][] = archetypes.map(() => []);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    const plant = (x: number, z: number, kind: number, scale: number, lift = 0) => {
      const ground = hillY(x, z);
      const r = [2.6, 2.9, 1.6, 1.4][kind] * scale;
      // Crowns keep their cards toward the viewer: only a small turn about the vertical.
      p.set(x, ground + r * .7 + lift, z); q.setFromEuler(new THREE.Euler((random() - .5) * .15, Math.atan2(eye.x - x, eye.z - z) + (random() - .5) * .5, (random() - .5) * .15));
      s.set(scale * (.85 + random() * .3), scale * (.85 + random() * .35), scale * (.85 + random() * .3));
      lists[kind].push(m.compose(p, q, s).clone());
      const hue = kind === 3 ? .27 : .22 + random() * .07, pale = kind < 3 && random() < .06;
      tints[kind].push(pale ? new THREE.Color().setHSL(.14, .22, .4) : new THREE.Color().setHSL(hue, .22 + random() * .14, kind === 3 ? .2 : .22 + random() * .1));
      skylineSamples.push([x, p.y + r * s.y / scale * .9, z, (kind === 3 ? 3.2 : 2.8) * scale]);
    };
    for (let z = -47; z > -95; z -= 4.6) for (let x = -150; x < 150; x += 4.8) {
      const jx = x + (random() - .5) * 3.2, jz = z + (random() - .5) * 3;
      if (Math.abs(jx - eye.x) > (eye.z - jz) * 1.25 + 8) continue;
      const crest = -jz > 70;
      // Stands and clearings: big masses broken by gaps, not an even texture.
      const stand = fbm3(jx * .025, 3, jz * .04, 3);
      if (stand < -.28 && random() < .55) continue;
      const kind = crest && random() < .18 ? 3 : random() < .45 ? 0 : random() < .6 ? 1 : 2;
      const emergent = random() < .1 ? 1.5 + random() * .5 : 1;
      plant(jx, jz, kind, (.7 + random() * .4 + Math.max(0, stand) * 1.2) * emergent, kind === 3 ? 2.5 + random() * 3 : (emergent - 1) * 6);
    }
    // Low shrubs and saplings close the hill foot behind the houses.
    for (let x = -75; x < 75; x += 2.2) plant(x + (random() - .5) * 1.5, -40.5 - random() * 4, 2, .55 + random() * .35);
    archetypes.forEach((geometry, kind) => {
      const mesh = new THREE.InstancedMesh(geometry, kind === 3 ? pineMaterial : crownMaterial, lists[kind].length);
      lists[kind].forEach((matrix, i) => { mesh.setMatrixAt(i, matrix); mesh.setColorAt(i, tints[kind][i]); });
      mesh.receiveShadow = true; mesh.computeBoundingSphere(); mesh.name = `Hill crowns ${kind}`; scene.add(mesh); disposables.push(mesh);
    });
    // Crooked red-pine trunks under the crest pads.
    const pineTrunks: THREE.BufferGeometry[] = [];
    lists[3].forEach(matrix => {
      const top = new THREE.Vector3().setFromMatrixPosition(matrix), ground = hillY(top.x, top.z) - .3;
      const lean = (random() - .5) * 1.4;
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(top.x, ground, top.z), new THREE.Vector3(top.x + lean * .5, (ground + top.y) / 2, top.z), new THREE.Vector3(top.x + lean, top.y - .6, top.z)]);
      pineTrunks.push(new THREE.TubeGeometry(curve, 6, .28, 5, false));
    });
    if (pineTrunks.length) {
      const trunks = new THREE.Mesh(concatGeometries(pineTrunks), new THREE.MeshStandardMaterial({ color: '#4a3326', roughness: .9 }));
      trunks.name = 'Pine trunks'; scene.add(trunks); pineTrunks.forEach(g => g.dispose());
    }
  }
  // Distant ridges, fading into the moonlit haze.
  const ridgeLayer = (z: number, base: number, amplitude: number, detail: number, color: string, seed: number) => {
    const positions: number[] = [], indices: number[] = [];
    const nx = 220, rows = 4;
    for (let r = 0; r <= rows; r++) for (let i = 0; i <= nx; i++) {
      const x = -900 + i * 1800 / nx;
      const crest = base + amplitude * (Math.sin(x * .004 + seed) * .55 + Math.sin(x * .0113 + seed * 2) * .3) + fbm3(x * .012, seed, 0, 4) * detail + Math.abs(fbm3(x * .09, seed + 3, 0, 2)) * detail * .25;
      const t = r / rows;
      positions.push(x, -2 + (crest + 2) * (1 - t * t), z + t * 60);
      if (r < rows && i < nx) { const a = r * (nx + 1) + i; indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2); }
      if (r === 0) skylineSamples.push([x, crest, z, 1800 / nx * .7]);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals();
    const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color, roughness: 1 })); mesh.name = 'Far ridge'; scene.add(mesh);
  };
  ridgeLayer(-260, 34, 22, 12, '#142019', 1.3);
  ridgeLayer(-520, 70, 40, 16, '#1a2630', 2.9);

  /* ----------------------------------------------------------- farmhouse */
  const house = new THREE.Group(); house.position.set(7.4, YARD_Y, -31.2); house.rotation.y = -.32; scene.add(house);
  {
    // Packed earth of the yard: worn paler where people walk, darker by the walls.
    const yard = new THREE.Mesh(new THREE.PlaneGeometry(YARD.x1 - YARD.x0 - .6, YARD.z1 - YARD.z0 - .6, 24, 24).rotateX(-Math.PI / 2), createEarthMaterial('yard', { grass: .2, packed: .9 }));
    yard.position.set((YARD.x0 + YARD.x1) / 2, YARD_Y + .015, (YARD.z0 + YARD.z1) / 2); yard.receiveShadow = true; yard.name = 'Yard'; scene.add(yard);
  }
  const plaster = createRenderMaterial('#d8d2c2', 'house', .9);
  const plinthMaterial = createRenderMaterial('#6f6c66', 'plinth', .2);
  const postWood = createTimberMaterial('posts', 'y', '#5a4634');
  const boardWood = createTimberMaterial('boards', 'x', '#7b654c');
  const darkWood = createTimberMaterial('frames', 'y', '#3a2c21');
  const box = (w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = house) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material); mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const W = 9.6, D = 5.6, WALL = 2.55, BASE = .5;
  box(W + .3, BASE, D + .3, plinthMaterial, 0, BASE / 2, 0);
  box(W, WALL, D, plaster, 0, BASE + WALL / 2, -.3);
  // Exposed timber posts and a lintel band, as on rebuilt rural houses.
  for (const x of [-W / 2, -W / 2 + 2.4, 0, W / 2 - 2.4, W / 2]) box(.2, WALL, .2, postWood, x, BASE + WALL / 2, D / 2 - .2);
  box(W + .1, .2, .22, postWood, 0, BASE + WALL - .1, D / 2 - .2);
  // 툇마루: a narrow wooden porch floor along the front.
  for (let i = 0; i < 6; i++) box(W - .2, .07, .16, boardWood, 0, BASE + .36, D / 2 - .18 + i * .17);
  for (const x of [-W / 2 + .3, -1.5, 1.5, W / 2 - .3]) box(.14, .38, .14, postWood, x, BASE + .14, D / 2 + .62);
  // Lattice doors with lit paper (창호지): two lit pairs and one dark pair behind the porch.
  const lattice = own(canvasTexture(128, 256, ctx => {
    ctx.fillStyle = '#f3e3c3'; ctx.fillRect(0, 0, 128, 256);
    const gradient = ctx.createRadialGradient(64, 150, 10, 64, 150, 160); gradient.addColorStop(0, 'rgba(255,240,210,.0)'); gradient.addColorStop(1, 'rgba(90,60,30,.35)');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 256);
    ctx.strokeStyle = '#3b2a1c'; ctx.lineWidth = 3;
    for (let x = 0; x <= 128; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke(); }
    for (let y = 0; y <= 256; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke(); }
    ctx.lineWidth = 8; ctx.strokeRect(0, 0, 128, 256); ctx.fillStyle = '#3b2a1c'; ctx.fillRect(0, 196, 128, 6);
  }));
  const litPaper = new THREE.MeshBasicMaterial({ map: lattice }); litPaper.color.setRGB(3.4, 2.15, 1.05, THREE.LinearSRGBColorSpace);
  const dimPaper = new THREE.MeshBasicMaterial({ map: lattice }); dimPaper.color.setRGB(.7, .42, .2, THREE.LinearSRGBColorSpace);
  const doorZ = D / 2 - .3 - .02 + .01;
  const doors = (x: number, material: THREE.Material) => {
    for (const dx of [-.46, .46]) {
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(.88, 1.72), material); pane.position.set(x + dx, BASE + .42 + .9, doorZ + .02); house.add(pane);
    }
    box(1.94, .1, .1, darkWood, x, BASE + .42 + 1.81, doorZ + .04); box(1.94, .1, .1, darkWood, x, BASE + .44, doorZ + .04);
    for (const dx of [-.95, 0, .95]) box(.08, 1.8, .08, darkWood, x + dx, BASE + .42 + .9, doorZ + .05);
  };
  doors(-2.1, litPaper); doors(.4, litPaper); doors(3.0, dimPaper);
  // A small high window on the gable end, lit.
  const sideWindow = new THREE.Mesh(new THREE.PlaneGeometry(.7, .55), litPaper); sideWindow.position.set(W / 2 + .01, BASE + 1.85, -.8); sideWindow.rotation.y = Math.PI / 2; house.add(sideWindow);
  box(.06, .65, .8, darkWood, W / 2 + .02, BASE + 1.85, -.8);
  // Roof: grey cement tiles on a gable, deep eaves over the porch, ridge cap and bargeboards.
  const pitch = deg(24), eave = 1.05, run = D / 2 + eave + .3, rise = Math.tan(pitch) * (D / 2 + .3), slopeLength = run / Math.cos(pitch);
  const ridgeY = BASE + WALL + rise + .05;
  for (const side of [1, -1]) {
    const tile = createRoofTileMaterial(side > 0 ? 'front' : 'back', new THREE.Vector3(0, -Math.sin(pitch), side * Math.cos(pitch)));
    const slab = box(W + 1.3, .14, slopeLength, tile, 0, ridgeY - Math.sin(pitch) * slopeLength / 2, -.3 + side * Math.cos(pitch) * slopeLength / 2);
    slab.rotation.x = side * pitch;
  }
  const ridgeCap = new THREE.Mesh(new THREE.CylinderGeometry(.17, .17, W + 1.4, 10), createRoofTileMaterial('cap', new THREE.Vector3(1, 0, 0)));
  ridgeCap.rotation.z = Math.PI / 2; ridgeCap.position.set(0, ridgeY + .06, -.3); ridgeCap.castShadow = true; house.add(ridgeCap);
  for (const side of [-1, 1]) {
    const gable = new THREE.Shape(); gable.moveTo(-D / 2, 0); gable.lineTo(D / 2, 0); gable.lineTo(0, rise); gable.lineTo(-D / 2, 0);
    const g = new THREE.Mesh(new THREE.ShapeGeometry(gable), plaster); g.position.set(side * W / 2 * .999, BASE + WALL, -.3); g.rotation.y = side * Math.PI / 2; g.receiveShadow = true; house.add(g);
    for (const s of [1, -1]) {
      const barge = box(.08, .26, slopeLength, darkWood, side * (W / 2 + .64), ridgeY - Math.sin(pitch) * slopeLength / 2 - .08, -.3 + s * Math.cos(pitch) * slopeLength / 2);
      barge.rotation.x = s * pitch;
    }
  }
  const fascia = box(W + 1.3, .22, .06, darkWood, 0, ridgeY - Math.tan(pitch) * run - .1, -.3 + run * Math.cos(pitch) * Math.cos(pitch) + .02);
  fascia.rotation.x = pitch;
  // Rafter tails under the eave, parallel to the roof.
  const rafterZ = D / 2 - .3 + eave * .5, rafterY = ridgeY - (rafterZ + .3) * Math.tan(pitch) - .16;
  for (let x = -W / 2 - .5; x <= W / 2 + .5; x += .45) box(.08, .1, eave + .3, darkWood, x, rafterY, rafterZ).rotation.x = pitch;
  // Eave gutter and a downpipe at the corner.
  const gutterY = ridgeY - Math.tan(pitch) * run - .2, gutterZ = -.3 + run + .02;
  const gutter = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, W + 1.2, 10, 1, true, 0, Math.PI), new THREE.MeshStandardMaterial({ color: '#7d8382', roughness: .45, metalness: .6, side: THREE.DoubleSide }));
  gutter.rotation.z = Math.PI / 2; gutter.rotation.x = Math.PI; gutter.position.set(0, gutterY, gutterZ); gutter.castShadow = true; house.add(gutter);
  const downpipe = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, gutterY, 8), gutter.material); downpipe.position.set(W / 2 + .5, gutterY / 2, gutterZ - .05); house.add(downpipe);
  // A low bench under the eave beside the door, a pair of rubber shoes on the stepping stone.
  box(1.5, .05, .32, boardWood, -3.6, BASE + .42 + .02, D / 2 + .9);
  for (const x of [-4.2, -3.0]) box(.06, .44, .26, postWood, x, BASE + .2, D / 2 + .9);
  box(1.0, .14, .5, plinthMaterial, -.8, BASE - .05, D / 2 + .95);
  for (const dx of [-.12, .12]) { const shoe = new THREE.Mesh(new THREE.CapsuleGeometry(.045, .16, 4, 8), new THREE.MeshStandardMaterial({ color: '#d9d4c8', roughness: .55 })); shoe.rotation.x = Math.PI / 2; shoe.position.set(-.8 + dx, BASE + .06, D / 2 + .95); shoe.scale.set(1, 1, .6); house.add(shoe); }
  // A bare bulb under the eave by the door: the yard light.
  const bulbPosition = new THREE.Vector3(1.45, BASE + WALL - .5, D / 2 + .35);
  const bulbMaterial = new THREE.MeshBasicMaterial(); bulbMaterial.color.setRGB(60, 36, 15, THREE.LinearSRGBColorSpace);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 10), bulbMaterial); bulb.position.copy(bulbPosition); house.add(bulb);
  const shade = new THREE.Mesh(lathe([[.03, .1], [.07, .07], [.15, -.01], [.155, -.02]], 20), new THREE.MeshStandardMaterial({ color: '#2f4a3c', roughness: .45, metalness: .3, side: THREE.DoubleSide }));
  shade.position.copy(bulbPosition).add(new THREE.Vector3(0, .02, 0)); house.add(shade);
  box(.02, .42, .02, darkWood, bulbPosition.x, bulbPosition.y + .3, bulbPosition.z);
  const lamp = new THREE.PointLight('#ffb067', 11, 22, 1.5); lamp.position.copy(bulbPosition).add(new THREE.Vector3(0, -.12, .05)); house.add(lamp);
  const doorGlow = new THREE.PointLight('#ff9e52', 4, 11, 1.6); doorGlow.position.set(-.8, BASE + 1.2, D / 2 + .7); house.add(doorGlow);
  const glow = own(glowTexture(64, 2.2));
  const bulbHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: '#ffbf7a', transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending }));
  bulbHalo.position.copy(bulbPosition); bulbHalo.scale.setScalar(.9); bulbHalo.userData.keep = true; house.add(bulbHalo);
  // 평상: a low wooden platform in the yard, and 장독대 jars on a stone stand.
  const platform = new THREE.Group(); platform.position.set(-3.2, 0, D / 2 + 2.4); platform.rotation.y = .3; house.add(platform);
  // A folded blanket and a tray left on the platform.
  box(.7, .06, .5, new THREE.MeshStandardMaterial({ color: '#6f4a52', roughness: .9 }), .4, .52, -.2, platform);
  box(.42, .03, .3, boardWood, -.5, .5, .15, platform);
  for (let i = 0; i < 9; i++) box(2.1, .05, .17, boardWood, 0, .46, -.72 + i * .18, platform);
  for (const x of [-.95, .95]) for (const z of [-.7, .7]) box(.1, .44, .1, postWood, x, .22, z, platform);
  const jarMaterial = new THREE.MeshPhysicalMaterial({ color: '#3a2418', roughness: .32, clearcoat: .8, clearcoatRoughness: .25 });
  const stand = new THREE.Group(); stand.position.set(W / 2 + 1.6, 0, -1.6); house.add(stand);
  box(2.0, .32, 1.4, plinthMaterial, 0, .16, 0, stand);
  const jar = (s: number) => lathe([[0, 0], [.16, .02], [.27, .2], [.31, .38], [.27, .56], [.16, .66], [.15, .7], [0, .7]].map(([r, y]) => [r * s, y * s] as [number, number]), 24);
  const lid = (s: number) => lathe([[0, .1], [.12, .08], [.2, .03], [.2, 0]].map(([r, y]) => [r * s, y * s] as [number, number]), 20);
  for (const [x, z, s] of [[-.6, -.3, 1.15], [.05, -.35, 1.0], [.62, -.25, .85], [-.35, .35, .8], [.3, .35, .7], [.75, .38, .55]]) {
    const j = new THREE.Mesh(jar(s), jarMaterial); j.position.set(x, .32, z); j.castShadow = true; j.receiveShadow = true; stand.add(j);
    const l = new THREE.Mesh(lid(s), jarMaterial); l.position.set(x, .32 + .7 * s, z); stand.add(l);
  }
  skylineSamples.push(
    ...[-W / 2 - .6, -W / 4, 0, W / 4, W / 2 + .6].map(x => {
      const p = new THREE.Vector3(x, ridgeY + .2, -.3).applyMatrix4(new THREE.Matrix4().compose(house.position, house.quaternion, new THREE.Vector3(1, 1, 1)));
      return [p.x, p.y, p.z, 1.4] as [number, number, number, number];
    }),
  );
  // Moths circling the bulb.
  const mothCount = 14, mothPositions = new Float32Array(mothCount * 3), mothData = new Float32Array(mothCount * 3);
  for (let i = 0; i < mothCount; i++) mothData.set([random() * 6.28, .7 + random() * .9, .12 + random() * .25], i * 3);
  const mothGeometry = new THREE.BufferGeometry(); mothGeometry.setAttribute('position', new THREE.BufferAttribute(mothPositions, 3)); mothGeometry.setAttribute('moth', new THREE.BufferAttribute(mothData, 3));
  const pointScale = { value: 600 };
  const moths = new THREE.Points(mothGeometry, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uRuralTime: time, uScale: pointScale },
    vertexShader: `attribute vec3 moth; uniform float uRuralTime; uniform float uScale; varying float vA;
      void main(){
        float t = uRuralTime * moth.y + moth.x;
        vec3 p = vec3(cos(t) * moth.z + sin(t * 2.3) * 0.05, sin(t * 1.7) * 0.12 - 0.05, sin(t) * moth.z * 0.8 + cos(t * 1.9) * 0.04);
        vA = 0.55 + 0.45 * sin(t * 9.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = max(1.5, uScale * 0.03 / max(-mv.z, 0.5));
      }`,
    fragmentShader: `varying float vA; void main(){ vec2 c = gl_PointCoord - 0.5; float a = exp(-dot(c, c) * 14.0); gl_FragColor = vec4(vec3(1.6, 1.25, 0.85) * a * vA, 1.0); }`,
  }));
  moths.position.copy(bulbPosition); moths.frustumCulled = false; moths.userData.keep = true; house.add(moths);

  /* ------------------------------------------------------ poles and wires */
  const concrete = createRenderMaterial('#9a9890', 'pole', -10);
  const steel = new THREE.MeshStandardMaterial({ color: '#3d4245', roughness: .5, metalness: .7 });
  const porcelain = new THREE.MeshPhysicalMaterial({ color: '#c9cfd2', roughness: .18, clearcoat: 1 });
  const wireMaterial = new THREE.MeshStandardMaterial({ color: '#16191b', roughness: .38, metalness: .5 });
  const poles = new THREE.Group(); scene.add(poles);
  const attach: THREE.Vector3[][] = [];
  const pole = (x: number, z: number, height: number, transformer: boolean) => {
    const g = new THREE.Group(); g.position.set(x, groundY(x, z) < 0 ? .2 : groundY(x, z), z); g.rotation.y = -.25; poles.add(g);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.13, .21, height, 16), concrete); shaft.position.y = height / 2; shaft.castShadow = true; shaft.receiveShadow = true; g.add(shaft);
    box(2.3, .09, .09, steel, 0, height - .45, .14, g);
    for (const s of [-1, 1]) { const brace = box(.04, .9, .04, steel, s * .45, height - .85, .14, g); brace.rotation.z = s * .55; }
    const tops: THREE.Vector3[] = [];
    for (const ix of [-1.0, -.35, 1.0]) {
      for (let k = 0; k < 3; k++) { const disc = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .045, 14), porcelain); disc.position.set(ix, height - .32 + k * .06, .14); g.add(disc); }
      tops.push(new THREE.Vector3(ix, height - .14, .14));
    }
    // Low-voltage rack lower on the pole.
    for (let k = 0; k < 3; k++) { const spool = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .09, 12), porcelain); spool.rotation.x = Math.PI / 2; spool.position.set(0, height - 2.2 - k * .32, .25); g.add(spool); tops.push(new THREE.Vector3(0, height - 2.2 - k * .32, .3)); }
    box(.06, .9, .06, steel, 0, height - 2.5, .2, g);
    if (transformer) {
      const can = new THREE.Mesh(new THREE.CylinderGeometry(.27, .27, .85, 18), new THREE.MeshStandardMaterial({ color: '#7d8584', roughness: .5, metalness: .6 }));
      can.position.set(0, height - 3.5, .42); can.castShadow = true; g.add(can);
    }
    for (let y = 1.8; y < height - 2.5; y += .45) { const step = box(.22, .025, .025, steel, 0, y, 0, g); step.rotation.y = (Math.round(y / .45) % 2) * Math.PI / 2; }
    g.updateMatrixWorld(true);
    attach.push(tops.map(t => t.clone().applyMatrix4(g.matrixWorld)));
    return g;
  };
  pole(7.0, -8.5, 10.4, false);
  pole(13.5, -33.5, 9.6, true);
  pole(-14, -36.5, 9.6, false);
  const wires: THREE.BufferGeometry[] = [];
  const span = (a: THREE.Vector3, b: THREE.Vector3, sag: number) => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24; points.push(a.clone().lerp(b, t).add(new THREE.Vector3(0, -sag * 4 * t * (1 - t), 0))); }
    wires.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 48, .011, 4, false));
  };
  const [p1, p2, p3] = attach;
  for (let k = 0; k < 6; k++) {
    span(p1[k], p2[k], k < 3 ? .55 : .7);
    // Toward the next pole behind the viewer, crossing the top of the frame.
    span(p1[k], p1[k].clone().add(new THREE.Vector3(9 + k * .1, -.4, 38)), k < 3 ? .9 : 1.1);
    span(p2[k], p3[k], k < 3 ? .8 : 1.0);
  }
  // Service drop from the transformer pole to the house eave.
  const eaveCorner = new THREE.Vector3(W / 2 - .2, BASE + WALL - .1, D / 2 - .3).applyMatrix4(new THREE.Matrix4().compose(house.position, house.quaternion, new THREE.Vector3(1, 1, 1)));
  span(p2[4], eaveCorner, .35);
  const wireMesh = new THREE.Mesh(concatGeometries(wires), wireMaterial); wireMesh.castShadow = true; wireMesh.name = 'Wires'; scene.add(wireMesh);
  wires.forEach(g => g.dispose());

  /* ----------------------------------------------------------- fireflies */
  const flyCount = 56, flyPositions: number[] = [], flyData: number[] = [];
  for (let i = 0; i < flyCount; i++) {
    let x = 0, z = 0;
    for (let tries = 0; tries < 8; tries++) { z = 7 - random() * 34; x = pathX(z) + (random() > .5 ? 1 : -1) * (ROAD_HALF + .6 + random() * 11); if (inView(x, z, 0)) break; }
    flyPositions.push(x, .35 + random() * 1.5, z);
    flyData.push(random() * 6.28, .45 + random() * .6, .1 + random() * .1);
  }
  const flyGeometry = new THREE.BufferGeometry();
  flyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(flyPositions, 3));
  flyGeometry.setAttribute('fly', new THREE.Float32BufferAttribute(flyData, 3));
  const flyMaterial = (mirror: boolean) => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uRuralTime: time, uScale: pointScale },
    vertexShader: `attribute vec3 fly; uniform float uRuralTime; uniform float uScale; varying float vGlow;
      void main(){
        vec3 p = position;
        float t = uRuralTime * fly.z + fly.x;
        p += vec3(sin(t * 1.3) * 0.5 + sin(t * 0.47) * 0.8, sin(t * 0.9) * 0.22, cos(t * 1.1) * 0.45);
        // Slow pulses: about a second of light, then a long dark rest, never in step.
        float cycle = fract(uRuralTime * fly.y * 0.22 + fly.x * 0.37);
        vGlow = smoothstep(0.0, 0.12, cycle) * (1.0 - smoothstep(0.22, 0.42, cycle));
        ${mirror ? 'p.y = -p.y; vGlow *= 0.35;' : ''}
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uScale * 0.14 / max(-mv.z, 0.5);
      }`,
    fragmentShader: `varying float vGlow; void main(){ vec2 c = gl_PointCoord - 0.5; float a = exp(-dot(c, c) * 26.0); gl_FragColor = vec4(vec3(2.2, 3.2, 0.9) * a * vGlow, 1.0); }`,
  });
  const fireflies = new THREE.Points(flyGeometry, flyMaterial(false)); fireflies.frustumCulled = false; fireflies.name = 'Fireflies'; scene.add(fireflies);
  const flyReflections = new THREE.Points(flyGeometry, flyMaterial(true)); flyReflections.frustumCulled = false; flyReflections.renderOrder = 1; flyReflections.name = 'Firefly reflections'; scene.add(flyReflections);

  /* ------------------------------------------------------ water and probe */
  const skyline = skylineTexture(eye, skylineSamples);
  own(skyline.texture);
  const waterMaterial = createPaddyWaterMaterial(sky.uniforms, clouds, skyline.texture, time);
  water.material.dispose(); water.material = waterMaterial;
  const lampWorld = new THREE.Vector3(), doorWorld = new THREE.Vector3(), sideWorld = new THREE.Vector3();
  const placeLamps = () => {
    house.updateMatrixWorld(true);
    lampWorld.copy(bulbPosition).applyMatrix4(house.matrixWorld);
    doorWorld.set(-.8, BASE + 1.3, doorZ + .05).applyMatrix4(house.matrixWorld);
    sideWorld.set(W / 2 + .02, BASE + 1.85, -.8).applyMatrix4(house.matrixWorld);
    waterMaterial.uniforms.uLampPos.value = lampPositions; waterMaterial.uniforms.uLampColor.value = lampColors;
    lampPositions[0].copy(lampWorld); lampPositions[1].copy(doorWorld); lampPositions[2].copy(sideWorld);
    lampColors[0].set(16, 9.5, 4.2); lampColors[1].set(3.2, 2.0, 1.0); lampColors[2].set(1.6, 1.0, .5);
  };
  // Radiance probe: the same night sky, the moon's glow and the dark treeline, as an HDR equirect.
  let environment: { texture: THREE.Texture; dispose(): void } | null = null;
  const bakeEnvironment = () => {
    if (!renderer || typeof renderer.getContext !== 'function') return;
    const width = 256, height = 128, data = new Uint16Array(width * height * 4);
    const zenith = (sky.uniforms.uSkyZenith.value as THREE.Vector3), horizon = (sky.uniforms.uSkyHorizon.value as THREE.Vector3);
    const dir = new THREE.Vector3();
    for (let j = 0; j < height; j++) for (let i = 0; i < width; i++) {
      const phi = ((i + .5) / width - .5) * Math.PI * 2, lat = ((j + .5) / height - .5) * Math.PI;
      dir.set(Math.cos(phi) * Math.cos(lat), Math.sin(lat), Math.sin(phi) * Math.cos(lat));
      const k = Math.pow(smooth(dir.y, -.04, .95), .6);
      let r = horizon.x + (zenith.x - horizon.x) * k, g = horizon.y + (zenith.y - horizon.y) * k, b = horizon.z + (zenith.z - horizon.z) * k;
      const c = Math.max(0, dir.dot(moonDir));
      const moonGlow = Math.pow(c, 40) * 2.2 + Math.pow(c, 6) * .06;
      r += moonGlow * .8; g += moonGlow * .85; b += moonGlow;
      const azimuth = Math.atan2(dir.x, -dir.z), bin = Math.floor((azimuth / (Math.PI * 2) + .5) * skyline.elevation.length) % skyline.elevation.length;
      const elevation = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1));
      if (elevation < 0) { r = .0035; g = .0045; b = .004; } else if (elevation < Math.max(skyline.elevation[bin], deg(2))) { r = .003; g = .0048; b = .0055; }
      const o = (j * width + i) * 4;
      data[o] = THREE.DataUtils.toHalfFloat(r); data[o + 1] = THREE.DataUtils.toHalfFloat(g); data[o + 2] = THREE.DataUtils.toHalfFloat(b); data[o + 3] = THREE.DataUtils.toHalfFloat(1);
    }
    const source = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.HalfFloatType);
    source.mapping = THREE.EquirectangularReflectionMapping; source.colorSpace = THREE.LinearSRGBColorSpace;
    source.magFilter = source.minFilter = THREE.LinearFilter; source.needsUpdate = true;
    try {
      environment = createCheckedEnvironment(renderer, source, 'rural');
      scene.environment = environment.texture; scene.environmentIntensity = 1.0;
      // Crowns are lit mostly by the moon; the open sky only fills them faintly.
      foliageMaterials.forEach(m => { m.envMap = environment!.texture; });
    } catch { environment = null; }
  };
  bakeEnvironment();

  // Static parts merge per material; the bulb, halo and moths stay live.
  bulb.userData.keep = true;
  bakeStatic(house, house);
  bakeStatic(poles, poles);

  /* ------------------------------------------------------------- runtime */
  const raycaster = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -.2), hit = new THREE.Vector3();
  let touchEnergy = 0;
  let volumeUniforms: Record<string, THREE.IUniform> | null = null;
  const setMoon = (azimuth: number, elevation = MOON_ELEVATION) => {
    moonDir = moonDirection(azimuth, elevation);
    (sky.uniforms.uMoonDir.value as THREE.Vector3).copy(moonDir);
    (sky.uniforms.uMoonSun.value as THREE.Vector3).copy(moonDir).negate().add(new THREE.Vector3(.12, 0, 0)).normalize();
    (sky.uniforms.uSkyGlowDir.value as THREE.Vector3).copy(moonDir).setY(0).normalize();
    moonlight.position.copy(moonlight.target.position).addScaledVector(moonDir, 90);
    if (volumeUniforms) (volumeUniforms.uMoonDir.value as THREE.Vector3).copy(moonDir);
  };
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    const portrait = aspect < .85;
    camera.fov = portrait ? 61 : 55;
    camera.position.set(portrait ? .1 : 0, 1.56, 10.4);
    camera.lookAt(portrait ? 1.1 : .45, portrait ? 4.1 : 3.3, -31);
    camera.updateProjectionMatrix();
    setMoon(portrait ? -6 : -22, portrait ? 25 : MOON_ELEVATION);
    const height = renderer?.domElement.height || 800;
    pointScale.value = height / (2 * Math.tan(deg(camera.fov) / 2));
    placeLamps();
  };
  resize(1.6);
  return {
    scene, camera, resize,
    post: { exposure: 1.42, bloomStrength: .11, bloomThreshold: 0, aoStrength: .6, aoRadius: .5, saturation: 1.02, contrast: 1.06, shadowTint: [.9, .96, 1.1], highlightTint: [1.06, 1.0, .92], vignette: .42, grain: .02 },
    update(t, dt) {
      time.value = t; sky.update(t); clouds.uCloudTime.value = t;
      touchEnergy *= Math.exp(-dt * 2.2); touch.value.z = touchEnergy;
    },
    interact(ndc) {
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return null;
      if (hit.z > 10 || hit.z < -8 || Math.abs(hit.x) > 13 || !inPaddy(hit.x, hit.z)) return null;
      touchEnergy = .7; touch.value.set(hit.x, hit.z, touchEnergy);
      return { scene: 'nature:rural_summer_night', type: 'grass', strength: .28, position: [hit.x, .2, hit.z] };
    },
    setPostActive(active) {
      scene.fog = active ? null : directFog;
      waterMaterial.uniforms.uFog.value = active ? 0 : 1;
      bulbHalo.visible = !active;
    },
    createVolume(): VolumeEffect {
      volumeUniforms = {
        uMoonDir: { value: moonDir.clone() }, uMoonColor: { value: new THREE.Vector3(MOON_COLOR.r, MOON_COLOR.g, MOON_COLOR.b).multiplyScalar(.22) },
        uAmbient: { value: new THREE.Vector3(.008, .012, .022) }, uLamp: { value: lampWorld }, uLampColor: { value: new THREE.Vector3(1, .55, .22).multiplyScalar(.08) },
        uHaze: { value: .0011 }, uMist: { value: .03 },
      };
      return { material: new THREE.ShaderMaterial({ vertexShader: FULLSCREEN_VERTEX, fragmentShader: RURAL_VOLUME_FRAGMENT, depthTest: false, depthWrite: false, toneMapped: false, uniforms: volumeUniforms }) };
    },
    dispose() {
      environment?.dispose(); textures.forEach(t => t.dispose());
      disposables.forEach(d => d.dispose());
      sky.dome.geometry.dispose();
    },
  };
}
