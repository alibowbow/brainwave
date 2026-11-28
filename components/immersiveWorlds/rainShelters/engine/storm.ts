import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuilder } from './types';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3 } from '../../shared/render/noise';
import { applyWetSurface } from '../../shared/render/wetSurface';
import { createRainLayer, createRainSplashes, createRunoff, type RunoffStream } from '../../shared/render/rainStreaks';
import { assignProbe, captureProbe, captureSkyProbe, createMist, createSky } from './atmosphere';
import { applyFoliage, applyTimber, TimberSet } from './surfaces';
import { fernFronds, leafletGeometry } from './geometry';
import { createLantern } from './props';

/* Independent procedural artwork. No downloaded source, image, model or sound.
 * JEV S090: separate sky, distant water/rain atmosphere and near moving details.
 * JEV S092/O041: rain has depth and an exterior acoustic boundary; no lightning.
 * O078/O061: coherent low-amplitude wind across spatially distributed vegetation.
 * The storm is carried by a layered HDR cloud sky, sweeping rain curtains in the
 * mist volume and a bright clearing on the far horizon; it never flashes.
 */
const seedRandom = (seed: number) => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
  return (seed >>> 0) / 4294967296;
};

const DECK_EDGE_Z = -1.88;

export const buildStorm: WorldBuilder = ({ scene, camera }) => {
  const random = seedRandom(564932);
  const time = { value: 0 };
  scene.background = new THREE.Color('#5d6b6c');
  const disposables: { dispose(): void }[] = [];

  // ---- Storm sky and light -------------------------------------------------------
  const glowDirection = new THREE.Vector3(0.55, 0.22, -0.8).normalize();
  const sky = createSky({
    time, storm: true, zenith: new THREE.Color(0.3, 0.34, 0.4), horizon: new THREE.Color(1.0, 1.05, 1.1),
    cloudDark: new THREE.Color(0.15, 0.18, 0.21), cloudLight: new THREE.Color(1.35, 1.4, 1.45),
    glowDirection, glow: new THREE.Color(2.4, 2.0, 1.45), ground: new THREE.Color(0.06, 0.07, 0.05), coverage: 0.78, softness: 0.22, scale: 0.55, drift: 0.022, radius: 380, horizonFade: 0.045, glowPower: 14,
  });
  scene.add(sky.mesh);
  const key = new THREE.DirectionalLight('#e6e2d4', 1.0);
  key.name = 'storm-cloudlight';
  key.position.copy(glowDirection).multiplyScalar(40).setY(30); key.target.position.set(0, 0, -6);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -14, right: 14, top: 14, bottom: -12, near: 1, far: 90 });
  key.shadow.bias = -0.0008; key.shadow.normalBias = 0.03; key.shadow.radius = 4;
  // The world is static apart from foliage sway: render the key shadow once, and
  // again only while something that casts it moves (saves a pass every frame).
  key.shadow.autoUpdate = false; key.shadow.needsUpdate = true;
  scene.add(key, key.target);
  const fieldBounce = new THREE.PointLight('#a9b59a', 1.1, 8, 2);
  fieldBounce.position.set(0, 0.6, -1.4); scene.add(fieldBounce);
  const fallbackFill = new THREE.HemisphereLight('#cbdcda', '#6f6b51', 2.2);
  fallbackFill.visible = false; scene.add(fallbackFill);

  // ---- Field ------------------------------------------------------------------------
  const terrainGeo = new THREE.PlaneGeometry(230, 215, 160, 120); terrainGeo.rotateX(-Math.PI / 2);
  const pos = terrainGeo.attributes.position; const colors: number[] = [];
  const height = (x: number, z: number) => -0.5 + Math.sin(x * 0.035 + 0.5) * Math.sin(z * 0.019) * 2.8 + Math.sin(x * 0.072 - z * 0.038) * 1.1 + 0.08 * noise3(x * 0.3, 0, z * 0.3);
  const fieldColor = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    // Denser rows near the shelter.
    const t = (pos.getZ(i) + 107.5) / 215;
    const z = -2 - Math.pow(1 - t, 1.7) * 213 + 2;
    const x = pos.getX(i) * (0.2 + 0.8 * Math.min(1, -z / 40));
    pos.setXYZ(i, x, height(x, z), z);
    const v = 0.5 + 0.5 * Math.sin(x * 0.097 + z * 0.18 + Math.sin(x * 0.11));
    fieldColor.lerpColors(new THREE.Color('#4e6242'), new THREE.Color('#7a8a5c'), v * 0.55 + 0.2 * (fbm3(x * 0.05, 1, z * 0.05, 3) + 0.5));
    const furrow = Math.pow(0.5 + 0.5 * Math.cos(z * 0.67 + x * 0.026), 14) * 0.05;
    fieldColor.offsetHSL(0, 0, -furrow); colors.push(fieldColor.r, fieldColor.g, fieldColor.b);
  }
  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); terrainGeo.computeVertexNormals();
  const fieldMaterial = applyWetSurface(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }), {
    key: 'storm-field', time, wetness: 0.85, darkening: 0.7, wetRoughness: 0.5, puddles: 0.18, puddleSize: 2.2, rippleDensity: 7,
  });
  fieldMaterial.onBeforeCompile = ((previous) => (shader: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer) => {
    previous(shader, renderer);
    // Grass sward texture between the tussocks; fades out before it can shimmer.
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
{
  float fieldFoot = length(fwidth(vWetWorld));
  float sward = bwNoise(vec3(vWetWorld.xz * 3.0, 1.0)) * 0.5 + 0.5;
  float blades = mix(0.5, bwNoise(vec3(vWetWorld.x * 40.0, vWetWorld.z * 9.0, 3.0)) * 0.5 + 0.5, 1.0 - smoothstep(0.01, 0.04, fieldFoot));
  diffuseColor.rgb *= 0.72 + 0.35 * sward + 0.2 * blades;
}`);
  })(fieldMaterial.onBeforeCompile);
  const terrain = new THREE.Mesh(terrainGeo, fieldMaterial); terrain.receiveShadow = true; terrain.name = 'storm-field';
  scene.add(terrain);

  // Continuous soft hills behind the fields, receding into the storm.
  for (let layer = 0; layer < 3; layer++) {
    const z = -110 - layer * 30, verts: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 160; i++) {
      const x = -240 + i * 3;
      const top = 6 + Math.sin(i * 0.065 + layer * 2) * 5 + fbm3(i * 0.08, layer, 1, 3) * 4 + layer * 2.5;
      verts.push(x, top, z + noise3(i * 0.1, layer, 2) * 6, x, -9, z);
      if (i < 160) { const k = i * 2; indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3)); g.setIndex(indices); g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: [0x3c5042, 0x435548, 0x4a5c50][layer], roughness: 1, side: THREE.DoubleSide })));
  }

  // Wet grasses: rooted tussocks with folded, tapering blades.
  const grassRandom = seedRandom(68124);
  const tussockGeometry = (blades: number, rows: number) => {
    const bladeGeo = new THREE.BufferGeometry();
    const bladePositions: number[] = [], bladeIndices: number[] = [], bladeColors: number[] = [];
    for (let b = 0; b < blades; b++) {
      const direction = grassRandom() * Math.PI * 2, spread = Math.sqrt(grassRandom()) * 0.23;
      const bx = Math.cos(direction) * spread, bz = Math.sin(direction) * spread;
      const h = 0.26 + grassRandom() * 0.42, bend = 0.12 + grassRandom() * 0.3;
      const width = 0.008 + grassRandom() * 0.011, twist = (grassRandom() - 0.5) * 1.5;
      const tone = 0.78 + grassRandom() * 0.22, start = bladePositions.length / 3;
      for (let j = 0; j <= rows; j++) {
        const t = j / rows, angle = direction + twist * t;
        const cx = bx + Math.cos(direction) * t * t * bend, cz = bz + Math.sin(direction) * t * t * bend;
        const w = width * Math.pow(1 - t, 0.72) * (0.68 + Math.sin(t * Math.PI) * 0.55);
        const y = h * (t - 0.13 * t * t * t), fold = Math.sin(t * Math.PI) * width * 0.4;
        for (let edge = -1; edge <= 1; edge++) {
          const rib = edge === 0 ? fold : 0;
          bladePositions.push(cx + Math.cos(angle + Math.PI / 2) * w * edge + Math.cos(angle) * rib, y, cz + Math.sin(angle + Math.PI / 2) * w * edge + Math.sin(angle) * rib);
          const shade = (0.32 + 0.6 * Math.pow(t, 0.58)) * tone * (edge === 0 ? 1 : 0.86);
          bladeColors.push(shade, shade, shade);
        }
        if (j < rows) {
          const k = start + j * 3;
          bladeIndices.push(k, k + 1, k + 3, k + 1, k + 4, k + 3, k + 1, k + 2, k + 4, k + 2, k + 5, k + 4);
        }
      }
    }
    bladeGeo.setAttribute('position', new THREE.Float32BufferAttribute(bladePositions, 3));
    bladeGeo.setAttribute('color', new THREE.Float32BufferAttribute(bladeColors, 3));
    bladeGeo.setIndex(bladeIndices); bladeGeo.computeVertexNormals();
    return bladeGeo;
  };
  // Full tussocks near the shelter, lighter ones where a blade is a few pixels.
  const nearBlades = tussockGeometry(14, 5), farBlades = tussockGeometry(7, 3);
  const grassMat = applyWetSurface(applyFoliage(new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.5, side: THREE.DoubleSide }), {
    key: 'storm-grass', translucency: new THREE.Color(0.35, 0.5, 0.18), strength: 0.6,
  }), { key: 'storm-grass', time, wetness: 0.6, darkening: 0.85, wetRoughness: 0.25 });
  const grassTime = { value: 0 };
  grassMat.onBeforeCompile = ((previous) => (shader: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer) => {
    previous(shader, renderer);
    shader.uniforms.uGrassTime = grassTime;
    shader.vertexShader = 'uniform float uGrassTime;\n' + shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      float bx = instanceMatrix[3].x; float bz = instanceMatrix[3].z;
      // Gust fronts roll across the field from the left.
      float gust = 0.6 + 0.4 * sin(uGrassTime * 0.23 - bx * 0.05 + bz * 0.02);
      transformed.x += sin(uGrassTime * 0.65 + bx * 0.15 + bz * 0.11) * pow(max(position.y, 0.), 2.) * 0.22 * gust;
      transformed.z += sin(uGrassTime * 0.49 + bz * 0.16) * pow(max(position.y, 0.), 2.) * 0.1 * gust;`);
  })(grassMat.onBeforeCompile);
  const NEAR = 1700, FAR = 4400;
  const grass = new THREE.InstancedMesh(nearBlades, grassMat, NEAR), farGrass = new THREE.InstancedMesh(farBlades, grassMat, FAR);
  const dummy = new THREE.Object3D();
  const grassColor = new THREE.Color();
  const patches = Array.from({ length: 190 }, () => ({ x: (grassRandom() - 0.5) * 79, z: -12 - Math.pow(grassRandom(), 1.5) * 58, radius: 1.2 + grassRandom() * 3.2, tone: grassRandom() }));
  for (let i = 0; i < NEAR + FAR; i++) {
    let x: number, z: number;
    if (i < NEAR) { const d = Math.pow(grassRandom(), 1.15); x = (grassRandom() - 0.5) * (6 + d * 16); z = -2.25 - d * 13; }
    else {
      const patch = patches[i % patches.length], angle = grassRandom() * Math.PI * 2;
      const radius = Math.pow(grassRandom(), 0.65) * patch.radius;
      x = patch.x + Math.cos(angle) * radius; z = Math.min(-13, patch.z + Math.sin(angle) * radius * 0.73);
    }
    const scale = 0.6 + grassRandom() * 1.05;
    dummy.position.set(x, height(x, z) + 0.02, z);
    dummy.rotation.set((grassRandom() - 0.5) * 0.12, grassRandom() * Math.PI * 2, (grassRandom() - 0.5) * 0.12);
    dummy.scale.set(scale * (0.8 + grassRandom() * 0.34), scale, scale); dummy.updateMatrix();
    grassColor.setHSL(0.2 + grassRandom() * 0.06, 0.28 + grassRandom() * 0.22, 0.24 + grassRandom() * 0.08, THREE.SRGBColorSpace);
    const target = i < NEAR ? grass : farGrass, index = i < NEAR ? i : i - NEAR;
    target.setMatrixAt(index, dummy.matrix); target.setColorAt(index, grassColor);
  }
  farGrass.frustumCulled = false; farGrass.receiveShadow = true; scene.add(farGrass);
  grass.frustumCulled = false; grass.name = 'wet-field-tussocks'; grass.receiveShadow = true; scene.add(grass);

  // Summer flowers in the near grass: small pale heads on thin stems.
  const flowerGeo = new THREE.SphereGeometry(0.018, 6, 4); flowerGeo.scale(1, 0.55, 1);
  const flowers = new THREE.InstancedMesh(flowerGeo, applyWetSurface(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }), { key: 'storm-flower', time, wetness: 0.5, darkening: 0.9, wetRoughness: 0.2 }), 380);
  for (let i = 0; i < 380; i++) {
    const x = (grassRandom() - 0.5) * 12, z = -2.4 - Math.pow(grassRandom(), 1.2) * 16;
    dummy.position.set(x, height(x, z) + 0.28 + grassRandom() * 0.25, z); dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(0.8 + grassRandom() * 0.7); dummy.updateMatrix();
    flowers.setMatrixAt(i, dummy.matrix);
    flowers.setColorAt(i, grassColor.setHSL(grassRandom() < 0.6 ? 0.13 : 0.75, 0.35 + grassRandom() * 0.3, 0.62 + grassRandom() * 0.15, THREE.SRGBColorSpace));
  }
  scene.add(flowers);

  // Shelterbelt: each tree is a loose cluster of leafy lobes with ragged, see-through
  // edges, dissolving into the rain (one smooth blob per tree read as a row of bushes).
  const treeRandom = seedRandom(90123);
  // Welded, so the lobes shade smoothly at this lower tessellation.
  const crownSource = new THREE.IcosahedronGeometry(1, 3);
  crownSource.deleteAttribute('normal'); crownSource.deleteAttribute('uv');
  const crownGeo = mergeVertices(crownSource);
  crownSource.dispose();
  const cp = crownGeo.attributes.position;
  const crownColors: number[] = [];
  const point = new THREE.Vector3();
  for (let i = 0; i < cp.count; i++) {
    point.fromBufferAttribute(cp, i).normalize();
    const f = 1 + fbm3(point.x * 2.2, point.y * 2.2, point.z * 2.2, 4) * 0.32 + Math.max(0, noise3(point.x * 5, point.y * 5, point.z * 5)) * 0.12;
    cp.setXYZ(i, point.x * f, point.y * f * (point.y < -0.3 ? 0.7 : 1), point.z * f);
    const shade = 0.55 + 0.35 * Math.max(0, point.y) + 0.15 * (f - 1);
    crownColors.push(shade, shade, shade);
  }
  crownGeo.setAttribute('color', new THREE.Float32BufferAttribute(crownColors, 3));
  crownGeo.computeVertexNormals();
  const crownMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.75 });
  crownMaterial.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vCrownWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvCrownWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nvarying vec3 vCrownWorld;\n${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float crownLeaves = bwNoise(vCrownWorld * 1.6) * 0.5 + 0.5;
diffuseColor.rgb *= 0.65 + 0.55 * crownLeaves;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  // Toward its silhouette a lobe breaks into leaf clumps with sky between them.
  float facing = abs(dot(normal, normalize(vViewPosition)));
  float clumps = bwNoise(vCrownWorld * 1.7) * 0.5 + 0.5 + 0.3 * bwNoise(vCrownWorld * 4.3);
  if (clumps > 0.34 + facing * 1.25) discard;
  float foot = length(fwidth(vCrownWorld));
  float h = bwNoise(vCrownWorld * 2.4) + 0.5 * bwNoise(vCrownWorld * 5.1);
  vec3 pos = -vViewPosition; vec3 dpdx = dFdx(pos), dpdy = dFdy(pos);
  vec2 dh = vec2(dFdx(h), dFdy(h)) * 0.25 * (1.0 - smoothstep(0.1, 0.5, foot));
  vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx); float det = dot(dpdx, r1);
  normal = normalize(abs(det) * normal - sign(det) * (dh.x * r1 + dh.y * r2));
}`);
  };
  crownMaterial.customProgramCacheKey = () => 'storm-crowns-v3';
  const trees = 96, lobes = 7;
  const crowns = new THREE.InstancedMesh(crownGeo, crownMaterial, trees * lobes);
  const trunkGeometry = new THREE.CylinderGeometry(0.08, 0.17, 1, 7);
  const trunks = new THREE.InstancedMesh(trunkGeometry, new THREE.MeshStandardMaterial({ color: 0x3a3a30, roughness: 0.9 }), trees);
  for (let t = 0; t < trees; t++) {
    const distant = t >= 60, index = distant ? t - 60 : t;
    const x = distant ? -110 + index * 6.4 + treeRandom() * 4 : -95 + index * 3.2 + treeRandom() * 2;
    const z = distant ? -95 - treeRandom() * 16 : -62 + Math.sin(index * 0.33) * 7 + (treeRandom() - 0.5) * 7;
    const h = (distant ? 3.2 : 2.6) + treeRandom() * (distant ? 3.4 : 3.2), ground = height(x, z);
    dummy.position.set(x, ground + h * 0.35, z); dummy.rotation.set(0, treeRandom() * 0.4, (treeRandom() - 0.5) * 0.07);
    dummy.scale.set(1, h * 0.7, 1); dummy.updateMatrix(); trunks.setMatrixAt(t, dummy.matrix);
    const breadth = 0.82 + treeRandom() * 0.55, lean = (treeRandom() - 0.5) * 0.36;
    for (let c = 0; c < lobes; c++) {
      // A central mass, then lobes around it at uneven heights: some high and narrow,
      // some low and spreading, so every crown has its own ragged outline.
      const angle = c * 2.4 + treeRandom() * 1.2, reach = c === 0 ? 0 : 0.2 + treeRandom() * 0.24;
      const size = c === 0 ? 0.7 : 0.32 + treeRandom() * 0.26;
      const rise = c === 0 ? 0.78 : 0.48 + treeRandom() * 0.58;
      dummy.position.set(x + h * (lean * rise + Math.cos(angle) * reach * breadth), ground + h * rise, z + Math.sin(angle) * h * reach * 0.6);
      dummy.rotation.set(treeRandom() * 0.7, treeRandom() * Math.PI * 2, (treeRandom() - 0.5) * 0.7);
      dummy.scale.set(h * 0.39 * breadth * size, h * (0.36 + treeRandom() * 0.16) * size, h * (0.34 + treeRandom() * 0.11) * size);
      dummy.updateMatrix(); crowns.setMatrixAt(t * lobes + c, dummy.matrix);
      grassColor.setHSL(0.24 + treeRandom() * 0.04, distant ? 0.18 : 0.28, (distant ? 0.2 : 0.17) + treeRandom() * 0.06, THREE.SRGBColorSpace);
      crowns.setColorAt(t * lobes + c, grassColor);
    }
  }
  crowns.name = 'layered-shelterbelt-crowns'; crowns.castShadow = true; scene.add(crowns, trunks);

  // ---- The pavilion: deck, posts, roof frame ------------------------------------------
  const deckWood = applyWetSurface(applyTimber(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.72 }), {
    key: 'storm-deck', early: '#9a7a58', late: '#5e4128', rings: 28, weathering: 0.42,
  }), { key: 'storm-deck', time, wetness: 0.9, darkening: 0.6, wetRoughness: 0.12, puddles: 0.55, puddleSize: 0.35, rippleDensity: 12, ripples: 0.7,
    shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 1.45, softness: 0.22 } });
  const frameWood = applyWetSurface(applyTimber(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.75 }), {
    key: 'storm-frame', early: '#8d6c4c', late: '#4f3621', rings: 24, weathering: 0.3,
  }), { key: 'storm-frame', time, wetness: 0.7, darkening: 0.7, wetRoughness: 0.3, streaks: 0.6,
    shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 1.6, softness: 0.3 } });
  const deck = new TimberSet(5), frame = new TimberSet(17);
  deck.box(6.8, 0.24, 6.8, { x: 0, y: -0.19, z: 1.55 }, undefined, { grain: 'x' });
  for (let i = 0; i < 19; i++) {
    deck.box(0.336, 0.1, 6.8, { x: -3.22 + i * 0.357, y: -0.025 + random() * 0.006, z: 1.55 }, new THREE.Euler(0, (random() - 0.5) * 0.002, 0), { radius: 0.008, grain: 'z' });
  }
  deck.box(6.9, 0.24, 0.2, { x: 0, y: -0.04, z: DECK_EDGE_Z }, undefined, { radius: 0.015 });
  for (const [x, z] of [[-2.85, -1.13], [2.85, -1.13], [-2.85, 4.2], [2.85, 4.2]]) {
    frame.box(0.21, 3.38, 0.23, { x, y: 1.59, z }, undefined, { radius: 0.02, grain: 'y' });
    frame.box(0.25, 0.18, 0.27, { x, y: 0.15, z }, undefined, { radius: 0.015 });
    frame.box(0.13, 1.0, 0.13, { x: x - Math.sign(x) * 0.26, y: 2.75, z }, new THREE.Euler(0, 0, Math.sign(x) * -0.54), { radius: 0.012, grain: 'y' });
  }
  frame.box(6.15, 0.25, 0.27, { x: 0, y: 3.19, z: -1.13 }, undefined, { radius: 0.02 });
  frame.box(6.15, 0.25, 0.27, { x: 0, y: 3.57, z: 4.2 }, undefined, { radius: 0.02 });
  for (let i = 0; i < 7; i++) frame.box(0.14, 0.18, 6.15, { x: -2.75 + i * 0.916, y: 3.42, z: 1.4 }, new THREE.Euler(0.063, 0, 0), { radius: 0.012, grain: 'z' });
  // Stool beside the lantern.
  const stool = new TimberSet(29);
  stool.box(0.66, 0.08, 0.45, { x: 0, y: 0.53, z: 0 }, undefined, { radius: 0.012 });
  for (const sx of [-0.23, 0.23]) for (const sz of [-0.13, 0.13]) stool.box(0.07, 0.51, 0.08, { x: sx, y: 0.27, z: sz }, new THREE.Euler(0, 0, -Math.sign(sx) * 0.11), { radius: 0.01, grain: 'y' });
  const deckMesh = deck.build(deckWood, 'storm-deck');
  const frameMesh = frame.build(frameWood, 'storm-frame');
  const stoolMesh = stool.build(frameWood, 'storm-stool');
  scene.add(deckMesh, frameMesh, stoolMesh);

  // Corrugated roof sheets with formed cross-sections, weathered and wet.
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x737d78, metalness: 0.55, roughness: 0.5, side: THREE.DoubleSide });
  roofMat.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vRoofWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvRoofWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nvarying vec3 vRoofWorld;\n${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float rust = smoothstep(0.2, 0.7, bwFbm3(vec3(vRoofWorld.x * 2.0, vRoofWorld.z * 0.4, 1.0)) * 0.5 + 0.5 + 0.3 * (1.0 - smoothstep(-1.9, -1.3, vRoofWorld.z)));
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.32, 0.2, 0.12), rust * 0.55);`)
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor *= 1.0 - rust * 0.8;\nroughnessFactor = mix(roughnessFactor, 0.85, rust);');
  };
  roofMat.customProgramCacheKey = () => 'storm-roof-v2';
  const roofGeo = new THREE.PlaneGeometry(6.6, 6.4, 160, 4); roofGeo.rotateX(-Math.PI / 2);
  const rp = roofGeo.attributes.position;
  for (let i = 0; i < rp.count; i++) rp.setY(i, Math.sin(rp.getX(i) * 31) * 0.032 + rp.getZ(i) * 0.064);
  roofGeo.computeVertexNormals();
  const roof = new THREE.Mesh(roofGeo, roofMat); roof.position.set(0, 3.58, 1.35); roof.castShadow = true; scene.add(roof);
  const gutterMat = new THREE.MeshStandardMaterial({ color: 0x6d7570, metalness: 0.7, roughness: 0.35, side: THREE.DoubleSide });
  const gutter = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 6.55, 18, 1, true, 0, Math.PI), gutterMat);
  gutter.rotation.z = Math.PI / 2; gutter.position.set(0, 3.12, -1.87); scene.add(gutter);

  // ---- Awning: woven canvas, back-lit by the storm sky ------------------------------------
  const awningGeo = new THREE.PlaneGeometry(5.66, 1, 96, 18); const ap = awningGeo.attributes.position;
  for (let i = 0; i < ap.count; i++) ap.setZ(i, Math.sin(ap.getX(i) * 12.5) * 0.012 + 0.035 * Math.sin((ap.getY(i) + 0.5) * Math.PI) + 0.006 * noise3(ap.getX(i) * 4, ap.getY(i) * 6, 1));
  awningGeo.computeVertexNormals();
  const canvasMat = new THREE.MeshStandardMaterial({ color: '#b9ac8a', roughness: 0.9, side: THREE.DoubleSide });
  canvasMat.defines = { USE_UV: '' };
  canvasMat.onBeforeCompile = shader => {
    shader.uniforms.uTime = time;
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>\nuniform float uTime;\n${GLSL_NOISE}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec2 cq = vUv * vec2(5.66, 1.0);
float stripe = step(0.5, fract(cq.x * 1.6));
vec3 canvasTone = mix(vec3(1.0), vec3(0.42, 0.52, 0.45), stripe * 0.75);
vec2 th = cq * 260.0;
float weave = mix(0.5, 0.5 + 0.5 * sin(th.x * 6.2832) * sin(th.y * 6.2832), 1.0 - smoothstep(0.2, 0.55, max(fwidth(th.x), fwidth(th.y))));
float wetLine = smoothstep(0.35, 0.0, vUv.y) * (0.6 + 0.4 * bwNoise(vec3(cq * 6.0, 2.0)));
diffuseColor.rgb *= canvasTone * (0.9 + 0.1 * weave) * (1.0 - 0.25 * wetLine);
// Overcast light through the canvas, stronger where it is soaked thin.
totalEmissiveRadiance += vec3(1.5, 1.6, 1.65) * diffuseColor.rgb * (0.11 + 0.05 * wetLine) * (0.9 + 0.1 * weave);`);
  };
  canvasMat.customProgramCacheKey = () => 'storm-awning-v2';
  const awning = new THREE.Mesh(awningGeo, canvasMat); awning.position.set(0, 2.85, -1.32); awning.castShadow = true; scene.add(awning);
  const railSet = new TimberSet(43);
  railSet.box(5.74, 0.055, 0.06, { x: 0, y: 0, z: 0 }, undefined, { radius: 0.01 });
  const lowerRail = railSet.build(frameWood, 'storm-awning-rail'); lowerRail.position.set(0, 2.6, -1.32); scene.add(lowerRail);
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 5.72, 28), canvasMat); roll.rotation.z = Math.PI / 2; roll.position.set(0, 3.03, -1.32); scene.add(roll);
  const ropeMat = new THREE.MeshStandardMaterial({ color: 0xa69778, roughness: 1 });
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.4, 8), ropeMat); rope.position.set(0.84, 2.34, -1.24); scene.add(rope);
  const ropeLoop = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 28), ropeMat); ropeLoop.scale.y = 1.75; ropeLoop.position.set(0.84, 1.58, -1.24); scene.add(ropeLoop);
  const target = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.8, 0.4), new THREE.MeshBasicMaterial({ visible: false })); target.position.set(0.84, 2.15, -1.24); scene.add(target);
  let opening = 0.82, requestedOpening = 0.82;

  // ---- Near props: wet terracotta pot with a fern, stool and lantern ----------------------
  const clay = applyWetSurface(new THREE.MeshStandardMaterial({ color: '#a2603f', roughness: 0.82 }), { key: 'storm-clay', time, wetness: 0.55, darkening: 0.7, wetRoughness: 0.35, streaks: 0.4 });
  clay.onBeforeCompile = ((previous) => (shader: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer) => {
    previous(shader, renderer);
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vWetWorld;
  float mottle = bwFbm3(p * 6.0) * 0.5 + 0.5;
  float salts = smoothstep(0.55, 0.85, bwNoise(vec3(p.x * 9.0, p.y * 3.0, p.z * 9.0)) * 0.5 + 0.5) * smoothstep(0.5, 0.95, p.y);
  diffuseColor.rgb *= 0.82 + 0.3 * mottle;
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.75, 0.72, 0.64), salts * 0.45);
}`);
  })(clay.onBeforeCompile);
  const potProfile = [new THREE.Vector2(0.21, 0), new THREE.Vector2(0.28, 0.08), new THREE.Vector2(0.40, 0.40), new THREE.Vector2(0.42, 0.62), new THREE.Vector2(0.34, 0.84), new THREE.Vector2(0.29, 0.89), new THREE.Vector2(0.30, 0.96), new THREE.Vector2(0.34, 0.99), new THREE.Vector2(0.35, 1.03), new THREE.Vector2(0.30, 1.06), new THREE.Vector2(0.26, 1.01), new THREE.Vector2(0.255, 0.90), new THREE.Vector2(0.30, 0.77)];
  const potGeometry = new THREE.LatheGeometry(potProfile, 96);
  const ppos = potGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < ppos.count; i++) {
    const x = ppos.getX(i), y = ppos.getY(i), z = ppos.getZ(i), a = Math.atan2(z, x);
    // Hand-thrown: throwing rings and a slightly irregular wall.
    const k = 1 + 0.008 * Math.sin(y * 70) * (y < 0.85 ? 1 : 0) + 0.01 * noise3(Math.cos(a) * 2, y * 3, Math.sin(a) * 2);
    ppos.setXYZ(i, x * k, y, z * k);
  }
  potGeometry.computeVertexNormals();
  const pot = new THREE.Group(); scene.add(pot);
  const potBody = new THREE.Mesh(potGeometry, clay); potBody.position.y = 0.025; potBody.castShadow = potBody.receiveShadow = true; pot.add(potBody);
  const soil = new THREE.Mesh(new THREE.CircleGeometry(0.27, 40), applyWetSurface(new THREE.MeshStandardMaterial({ color: '#2c241c', roughness: 0.9 }), { key: 'storm-pot-soil', time, wetness: 1, darkening: 0.7, wetRoughness: 0.3 }));
  soil.rotation.x = -Math.PI / 2; soil.position.y = 0.86; pot.add(soil);
  const saucer = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.46, 0), new THREE.Vector2(0.52, 0.07), new THREE.Vector2(0.49, 0.075), new THREE.Vector2(0.44, 0.02), new THREE.Vector2(0, 0.02)], 64), clay);
  saucer.position.y = 0.035; saucer.castShadow = saucer.receiveShadow = true; pot.add(saucer);
  const fernStems: THREE.BufferGeometry[] = [], fernMatrices: THREE.Matrix4[] = [];
  fernFronds(new THREE.Vector3(0, 0.86, 0), 0.62, 11, random, fernStems, fernMatrices);
  const potLeafMat = applyWetSurface(applyFoliage(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4, side: THREE.DoubleSide }), { key: 'storm-pot-fern', translucency: new THREE.Color(0.5, 0.75, 0.3), strength: 0.7 }), { key: 'storm-pot-fern', time, wetness: 0.4, darkening: 0.85, wetRoughness: 0.2 });
  const potStems = new THREE.Mesh(mergeGeometries(fernStems)!, new THREE.MeshStandardMaterial({ color: '#4b5e2c', roughness: 0.6 }));
  fernStems.forEach(g => g.dispose()); pot.add(potStems);
  const potFern = new THREE.InstancedMesh(leafletGeometry(6, 0.22, 0.05), potLeafMat, fernMatrices.length);
  fernMatrices.forEach((m, i) => { potFern.setMatrixAt(i, m); potFern.setColorAt(i, grassColor.setHSL(0.22 + random() * 0.04, 0.45, 0.26 + random() * 0.06, THREE.SRGBColorSpace)); });
  potFern.castShadow = true; pot.add(potFern);
  const lantern = createLantern({ intensity: 2.4 });
  scene.add(lantern.group, lantern.light);
  const interiorParts: THREE.Object3D[] = [deckMesh, frameMesh, stoolMesh, roof, gutter, awning, lowerRail, roll, pot, lantern.group];

  // ---- Rain, gutter overflow, drips and splashes -------------------------------------------
  const rainSky = new THREE.Color(0.95, 1.02, 1.08);
  const wind = new THREE.Vector2(0.09, 0.03);
  const rainLayers = [
    createRainLayer({ time, count: 2000, min: new THREE.Vector3(-5, -0.7, -6.5), max: new THREE.Vector3(5, 4.5, -2.05), speed: 8.2, width: 0.0019, shutter: 0.03, radiance: rainSky, opacity: 0.6, boost: 1.9, seed: 21, wind, nearFade: 1.2 }),
    createRainLayer({ time, count: 7000, min: new THREE.Vector3(-14, -1, -22), max: new THREE.Vector3(14, 10, -6.5), speed: 8.5, width: 0.0016, shutter: 0.03, radiance: rainSky, opacity: 0.55, boost: 1.4, seed: 22, wind }),
    createRainLayer({ time, count: 12000, min: new THREE.Vector3(-45, -2, -70), max: new THREE.Vector3(45, 22, -22), speed: 9, width: 0.0015, shutter: 0.03, radiance: rainSky, opacity: 0.5, boost: 1, seed: 23, wind }),
  ];
  rainLayers.forEach(layer => scene.add(layer.mesh));
  const overflow: RunoffStream[] = [-2.4, -1.05, 0.35, 1.7, 2.9].map((x, i) => ({
    top: new THREE.Vector3(x, 3.06, -1.98), bottom: new THREE.Vector3(x + 0.03, height(x, -2.1) + 0.02, -2.08), width: 0.018 + (i % 2) * 0.012, flow: 0.55 + 0.1 * i,
  }));
  const runoff = createRunoff(overflow, { time, radiance: new THREE.Color(1.9, 2.0, 2.05), opacity: 0.8 });
  scene.add(runoff.mesh);
  const gutterDrips = createRainLayer({ time, count: 38, gravity: true, dripPause: 1.4, min: new THREE.Vector3(-3.2, -0.5, -1.99), max: new THREE.Vector3(3.2, 3.03, -1.95), width: 0.003, shutter: 0.02, radiance: new THREE.Color(1.5, 1.6, 1.65), opacity: 0.85, boost: 1.4, seed: 24 });
  const awningDrips = createRainLayer({ time, count: 26, gravity: true, dripPause: 2.5, min: new THREE.Vector3(-2.8, 0.0, -1.36), max: new THREE.Vector3(2.8, 2.6, -1.3), width: 0.0028, shutter: 0.02, radiance: new THREE.Color(1.4, 1.5, 1.55), opacity: 0.8, boost: 1.2, seed: 25 });
  scene.add(gutterDrips.mesh, awningDrips.mesh);
  const splashPoints: number[] = [];
  overflow.forEach(stream => { for (let k = 0; k < 3; k++) splashPoints.push(stream.bottom.x + (random() - 0.5) * 0.06, stream.bottom.y + 0.02, stream.bottom.z + (random() - 0.5) * 0.06); });
  for (let i = 0; i < 520; i++) {
    const x = (random() - 0.5) * (3 + i / 520 * 10), z = -2.15 - Math.pow(random(), 1.4) * 9;
    splashPoints.push(x, height(x, z) + 0.03, z);
  }
  const splashes = createRainSplashes({ points: splashPoints, time, size: 0.05, rate: 1.8, jitter: 0.12, radiance: new THREE.Color(1.0, 1.06, 1.1), opacity: 0.45, seed: 26 });
  scene.add(splashes.mesh);
  disposables.push(...rainLayers, runoff, gutterDrips, awningDrips, splashes);

  const raycaster = new THREE.Raycaster();
  const probes: THREE.WebGLRenderTarget[] = [];
  const rainObjects = () => [...rainLayers.map(l => l.mesh), runoff.mesh, gutterDrips.mesh, awningDrips.mesh, splashes.mesh];
  function update(t: number, dt: number) {
    time.value = t; grassTime.value = t;
    opening += (requestedOpening - opening) * Math.min(1, dt * 2.0);
    const drop = 0.18 + (1 - opening) * 0.86;
    if (Math.abs(awning.scale.y - drop) > 1e-4) key.shadow.needsUpdate = true;
    awning.scale.y = drop; awning.position.y = 3.02 - drop * 0.5; lowerRail.position.y = 3.02 - drop;
    awning.rotation.y = Math.sin(t * 0.31) * 0.003;
    // Drips leave the awning hem wherever it hangs.
    const rail = 3.02 - drop - 0.03;
    awningDrips.material.uniforms.uSize.value.y = rail - awningDrips.material.uniforms.uMin.value.y;
    lantern.update(t);
  }
  function resize(aspect: number) {
    camera.position.set(aspect < 0.8 ? 0.12 : 0, 1.48, 2.45);
    const portrait = aspect < 0.8;
    pot.position.set(portrait ? 0.61 : 1.11, 0, portrait ? -0.28 : 0.25);
    stoolMesh.position.set(portrait ? -0.39 : -1.6, 0.06, portrait ? -0.05 : 1.35);
    lantern.place(portrait ? -0.39 : -1.6, 0.65, portrait ? -0.05 : 1.35);
    fieldBounce.position.set(portrait ? 0.2 : 0, 0.6, -1.4);
    camera.fov = aspect < 0.8 ? 62 : 56; camera.near = 0.08; camera.far = 420;
    camera.lookAt(aspect < 0.8 ? -0.1 : 0, aspect < 0.8 ? 1.78 : 1.9, -27); camera.updateProjectionMatrix();
  }
  update(0, 0); resize(camera.aspect);
  return {
    update, resize,
    post: {
      exposure: 1.05, bloomStrength: 0.06, bloomThreshold: 0, aoStrength: 0.85, aoRadius: 0.4,
      saturation: 0.98, contrast: 1.12, shadowTint: [0.88, 0.96, 1.07], highlightTint: [1.02, 1.0, 0.97], vignette: 0.45, grain: 0.03,
    },
    createVolume: () => createMist({
      skyLight: new THREE.Color(0.5, 0.55, 0.58), glowLight: new THREE.Color(0.1, 0.085, 0.065), glowDirection,
      density: 0.012, heightFalloff: 0.2, groundY: -0.5,
      shelter: { normal: new THREE.Vector3(0, 0, -1), offset: 2.0, softness: 2.0 },
      maxDistance: 220, curtains: 2.0, curtainScale: 24, wind: new THREE.Vector2(1.6, 0.3),
    }),
    prepare(renderer, hdr) {
      if (!hdr) return;
      const skyProbe = captureSkyProbe(renderer, sky.material);
      probes.push(skyProbe);
      scene.environment = skyProbe.texture;
      const field = captureProbe(renderer, scene, new THREE.Vector3(0, 1.5, -8), rainObjects(), 128, 400);
      probes.push(field);
      scene.environment = field.texture;
      const inside = captureProbe(renderer, scene, new THREE.Vector3(0, 1.4, 1.2), rainObjects(), 128, 400);
      probes.push(inside);
      for (const part of interiorParts) assignProbe(part, inside.texture, 1);
    },
    setPostActive(active) {
      fallbackFill.visible = !active && !scene.environment;
      if (!active) { scene.fog = new THREE.FogExp2('#869e9a', 0.0085); [...rainLayers, gutterDrips, awningDrips].forEach(layer => layer.setBoost(1)); }
    },
    setViewHeight(pixels) { [...rainLayers, gutterDrips, awningDrips].forEach(layer => layer.setViewHeight(pixels)); },
    interact(x, y, explicit = false, immediate = false) {
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      if (!explicit && raycaster.intersectObjects([target, awning, lowerRail, rope, ropeLoop], false).length === 0) return null;
      requestedOpening = requestedOpening > 0.6 ? 0.26 : 0.9;
      if (immediate) opening = requestedOpening;
      return { action: 'awning', value: requestedOpening };
    },
    dispose() {
      disposables.forEach(d => d.dispose());
      probes.forEach(p => p.dispose());
      scene.environment = null;
    },
  };
};
