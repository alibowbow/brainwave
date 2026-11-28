import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuilder } from './types';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3, noise3 } from '../../shared/render/noise';
import { applyWetSurface } from '../../shared/render/wetSurface';
import { createRainLayer, createRainSplashes, createRunoff, type RunoffStream } from '../../shared/render/rainStreaks';
import { assignProbe, captureProbe, captureSkyProbe, createMist, createSky } from './atmosphere';
import { applyFoliage, applyTimber, TimberSet } from './surfaces';
import { fernFronds, leafletGeometry, limbGeometry } from './geometry';
import { createLantern } from './props';
import { buildTree, concatGeometries } from '../../shared/render/treeGeometry';
import { applyBarkSurface } from '../../shared/render/barkSurface';
import { applyFoliageShading, type FoliageWind } from '../../shared/render/foliageShading';
import { broadleafClusterTexture } from '../../shared/render/foliageTextures';
import { shrubGeometry, wetLeafMaterial } from './wetFoliage';

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
/** A farm track crosses the field from the near left and curves away to a gate in the hedge. */
const trackX = (z: number) => { const d = -z; return -4.5 + d * 0.08 + 3.5 * Math.sin(d * 0.035 + 0.3); };

/*
 * Gust fronts rolling across the field from the left: broad soft bands, about
 * 14 m apart, travelling at about 2 m/s. Grass bends and flattens as one passes
 * and shows its paler, glossier blade sides, so the waves read from far away.
 */
const GLSL_FIELD_WAVE = /* glsl */ `
float trackX(float z) { float d = -z; return -4.5 + d * 0.08 + 3.5 * sin(d * 0.035 + 0.3); }
float stormWave(vec2 p, float t) {
  float warp = bwNoise(vec3(p * 0.025, t * 0.015)) * 4.0;
  float front = p.x * 0.45 + p.y * 0.14 - t * 0.9 + warp;
  float w = 0.5 + 0.5 * sin(front);
  w *= w * w;
  return w * smoothstep(-0.35, 0.45, bwNoise(vec3(p * 0.04 + vec2(-t * 0.07, 0.0), 3.0)));
}
`;

/**
 * Distant rain veils: tall soft sheets of falling rain hanging from the deck,
 * gathered into bands that drift downwind across the field. Lighter than the
 * dark woods behind them and greyer than the bright clearing, as real veils are.
 */
function createRainVeils(time: { value: number }, color: THREE.Color, sheets: { z: number; width: number; height: number; opacity: number; seed: number }[]) {
  const group = new THREE.Group();
  const geometry = new THREE.PlaneGeometry(1, 1);
  geometry.translate(0, 0.5, 0);
  const materials = sheets.map(sheet => {
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: time, uColor: { value: color }, uOpacity: { value: sheet.opacity }, uSeed: { value: sheet.seed } },
      vertexShader: 'varying vec2 vUv;\nvarying vec3 vWorld;\nvoid main() { vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
      fragmentShader: /* glsl */ `
${GLSL_NOISE}
uniform float uTime, uOpacity, uSeed;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  float x = vWorld.x - uTime * 1.7;
  float band = bwNoise(vec3(x * 0.022, uSeed, uTime * 0.012)) * 0.7 + bwNoise(vec3(x * 0.07, uSeed + 3.0, uTime * 0.025)) * 0.3;
  band = smoothstep(-0.05, 0.5, band);
  // Fine streaks falling inside the veil, slanted by the wind.
  float streak = bwNoise(vec3((vWorld.x - vWorld.y * 0.12) * 1.3, vWorld.y * 0.06 + uTime * 0.8, uSeed)) * 0.5 + 0.5;
  float top = 1.0 - smoothstep(0.5 + 0.25 * bwNoise(vec3(x * 0.05, uSeed, 1.0)), 1.0, vUv.y);
  float sides = smoothstep(0.0, 0.18, vUv.x) * (1.0 - smoothstep(0.82, 1.0, vUv.x));
  float a = band * (0.65 + 0.35 * streak) * top * smoothstep(0.0, 0.05, vUv.y) * sides * uOpacity;
  if (a < 0.002) discard;
  gl_FragColor = vec4(uColor * a, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
      transparent: true, depthWrite: false, depthTest: true,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -2, sheet.z); mesh.scale.set(sheet.width, sheet.height, 1);
    mesh.renderOrder = 4; mesh.frustumCulled = false;
    group.add(mesh);
    return material;
  });
  return { group, dispose() { geometry.dispose(); materials.forEach(m => m.dispose()); } };
}

export const buildStorm: WorldBuilder = ({ scene, camera }) => {
  const random = seedRandom(564932);
  const time = { value: 0 };
  scene.background = new THREE.Color('#5d6b6c');
  const disposables: { dispose(): void }[] = [];

  // ---- Storm sky and light -------------------------------------------------------
  const glowDirection = new THREE.Vector3(0.55, 0.22, -0.8).normalize();
  // A heavy, low storm deck: dark rolls lit on their flanks from a far clearing.
  const sky = createSky({
    time, storm: true, heavy: true, zenith: new THREE.Color(0.22, 0.25, 0.3), horizon: new THREE.Color(1.05, 1.1, 1.15),
    cloudDark: new THREE.Color(0.11, 0.13, 0.16), cloudLight: new THREE.Color(0.95, 1.0, 1.06),
    glowDirection, glow: new THREE.Color(2.1, 1.8, 1.35), ground: new THREE.Color(0.06, 0.07, 0.05), coverage: 0.78, softness: 0.22, scale: 0.42, drift: 0.02, radius: 380, horizonFade: 0.045, glowPower: 10,
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
  fieldWave = stormWave(vWetWorld.xz, uWetTime);
  diffuseColor.rgb *= 1.0 + 0.8 * fieldWave;
  // The farm track: bare mud between grass verges, a grassy crown, and two wheel ruts
  // holding long puddles that mirror the bright clearing.
  float trackD = abs(vWetWorld.x - trackX(vWetWorld.z) + 0.15 * bwNoise(vec3(vWetWorld.xz * 0.6, 2.0)));
  float bare = 1.0 - smoothstep(0.95, 1.45, trackD);
  float crown = 1.0 - smoothstep(0.2, 0.42, trackD);
  float rutLine = abs(trackD - 0.74) + 0.05 * bwNoise(vec3(vWetWorld.xz * 2.5, 4.0));
  float rut = 1.0 - smoothstep(0.1, 0.2, rutLine);
  float pools = smoothstep(0.42, 0.6, bwNoise(vec3(vWetWorld.x * 1.1, 0.0, vWetWorld.z * 0.22)) * 0.5 + 0.5 + 0.12);
  fieldRut = rut * pools * smoothstep(-2.6, -3.6, vWetWorld.z);
  vec3 mud = vec3(0.19, 0.145, 0.1) * (0.75 + 0.4 * (bwNoise(vec3(vWetWorld.xz * 3.0, 6.0)) * 0.5 + 0.5));
  diffuseColor.rgb = mix(diffuseColor.rgb, mud, bare * (1.0 - crown * 0.75) * (1.0 - fieldWave * 0.5));
  fieldWave *= 1.0 - bare * (1.0 - crown);
}`).replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor *= 1.0 - 0.3 * fieldWave;')
      .replace('roughnessFactor = mix(roughnessFactor, 0.025, wetPuddle);', 'wetPuddle = max(wetPuddle, fieldRut);\ndiffuseColor.rgb *= mix(1.0, 0.5, fieldRut);\nroughnessFactor = mix(roughnessFactor, 0.025, wetPuddle);')
      .replace(/void\s+main\s*\(\s*\)\s*\{/, () => `float fieldWave = 0.0;\nfloat fieldRut = 0.0;\n${GLSL_FIELD_WAVE}\nvoid main() {`);
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
  const nearBlades = tussockGeometry(12, 4), farBlades = tussockGeometry(6, 2);
  const grassMat = applyWetSurface(applyFoliage(new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.5, side: THREE.DoubleSide }), {
    key: 'storm-grass', translucency: new THREE.Color(0.35, 0.5, 0.18), strength: 0.6,
  }), { key: 'storm-grass', time, wetness: 0.6, darkening: 0.85, wetRoughness: 0.25 });
  const grassTime = { value: 0 };
  grassMat.onBeforeCompile = ((previous) => (shader: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer) => {
    previous(shader, renderer);
    shader.uniforms.uGrassTime = grassTime;
    shader.vertexShader = shader.vertexShader.replace(/void\s+main\s*\(\s*\)\s*\{/, () => `uniform float uGrassTime;\nvarying float vFieldWave;\n${shader.vertexShader.includes('bwPcg3(') ? '' : GLSL_NOISE}\n${GLSL_FIELD_WAVE}\nvoid main() {`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      float bx = instanceMatrix[3].x; float bz = instanceMatrix[3].z;
      float wave = stormWave(vec2(bx, bz), uGrassTime);
      vFieldWave = wave;
      // Bend downwind (world +x) whatever the tussock's own rotation.
      vec3 downwind = normalize(transpose(mat3(instanceMatrix)) * vec3(1.0, 0.0, 0.3));
      float tip = pow(max(position.y, 0.), 2.);
      float flutter = sin(uGrassTime * 0.7 + bx * 0.15 + bz * 0.11) * 0.08 + sin(uGrassTime * 1.3 + bz * 0.4) * 0.03;
      transformed += downwind * tip * (0.06 + flutter + wave * 0.5);
      transformed.y -= tip * wave * 0.22;`);
    shader.fragmentShader = shader.fragmentShader.replace(/void\s+main\s*\(\s*\)\s*\{/, () => 'varying float vFieldWave;\nvoid main() {')
      .replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= 1.0 + 0.75 * vFieldWave;')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor *= 1.0 - 0.35 * vFieldWave;');
  })(grassMat.onBeforeCompile);
  const NEAR = 1250, FAR = 2800;
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
    // Keep the track's ruts clear; the verges grow tall right up to them.
    const off = x - trackX(z);
    if (Math.abs(off) < 1.15) x = trackX(z) + Math.sign(off || 1) * (1.15 + grassRandom() * 0.5);
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
    let x = (grassRandom() - 0.5) * 12; const z = -2.4 - Math.pow(grassRandom(), 1.2) * 16;
    if (Math.abs(x - trackX(z)) < 1.2) x += 2.6;
    dummy.position.set(x, height(x, z) + 0.28 + grassRandom() * 0.25, z); dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(0.8 + grassRandom() * 0.7); dummy.updateMatrix();
    flowers.setMatrixAt(i, dummy.matrix);
    flowers.setColorAt(i, grassColor.setHSL(grassRandom() < 0.6 ? 0.13 : 0.75, 0.35 + grassRandom() * 0.3, 0.62 + grassRandom() * 0.15, THREE.SRGBColorSpace));
  }
  scene.add(flowers);

  // Seed heads standing above the sward: pale stalks that ride the gust waves first.
  const headGeometry = (() => {
    const positions: number[] = [], shades: number[] = [], indices: number[] = [];
    const ring = (y: number, r: number) => { for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2; positions.push(Math.cos(a) * r, y, Math.sin(a) * r); shades.push(y > 0.7 ? 1 : 0.55, y > 0.7 ? 1 : 0.55, y > 0.7 ? 1 : 0.55); } };
    ring(0, 0.004); ring(0.72, 0.003); ring(0.78, 0.014); ring(0.92, 0.012); ring(1.0, 0.002);
    for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) {
      const a = r * 4 + k, b = r * 4 + (k + 1) % 4;
      indices.push(a, b, a + 4, b, b + 4, a + 4);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(shades, 3));
    g.setIndex(indices); g.computeVertexNormals(); return g;
  })();
  const HEADS = 1600;
  const heads = new THREE.InstancedMesh(headGeometry, grassMat, HEADS);
  for (let i = 0; i < HEADS; i++) {
    const d = Math.pow(grassRandom(), 1.3);
    let x = (grassRandom() - 0.5) * (5 + d * 22); const z = -2.4 - d * 17;
    if (Math.abs(x - trackX(z)) < 1.25) x = trackX(z) + (x < trackX(z) ? -1.3 : 1.3) - (grassRandom() - 0.5) * 0.3;
    const h = 0.62 + grassRandom() * 0.42;
    dummy.position.set(x, height(x, z), z); dummy.rotation.set((grassRandom() - 0.5) * 0.25, grassRandom() * 6.28, (grassRandom() - 0.5) * 0.25);
    dummy.scale.set(h, h, h); dummy.updateMatrix(); heads.setMatrixAt(i, dummy.matrix);
    heads.setColorAt(i, grassColor.setHSL(0.11 + grassRandom() * 0.06, 0.25 + grassRandom() * 0.15, 0.42 + grassRandom() * 0.12, THREE.SRGBColorSpace));
  }
  heads.frustumCulled = false; heads.receiveShadow = true; heads.name = 'storm-seed-heads'; scene.add(heads);

  // Field-edge woodland at several depths: a big field oak in the middle distance,
  // a hedgerow with copses along the far side of the field and taller trees and
  // poplars beyond. Crowns are leaf-cluster cards that sway together in the gusts.
  const treeRandom = seedRandom(90123);
  const tr = (a: number, b: number) => a + treeRandom() * (b - a);
  const beltWind: FoliageWind = { time, mode: 'attribute', sway: 0.22, flutter: 0.02, direction: [1, 0.25], speed: 0.55 };
  const beltAtlas = broadleafClusterTexture({ seed: 19, palette: { base: '#33502a', light: '#52713a', dark: '#1a2d16', stem: '#33302a' }, round: 0.35, leafScale: 0.9, density: 1.5 });
  const beltLeaves = wetLeafMaterial({ key: 'storm-belt', map: beltAtlas, wind: beltWind, roughness: 0.5, film: 0.35, translucency: { tint: '#b9d68c', back: 0.25, forward: 0.3 } });
  const beltBark = applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.88 }), {
    key: 'storm-bark', scale: 2, stretch: 4, depth: 0.0, plate: '#4c4842', fissure: '#16130f', wetness: 0.8,
  }), { key: 'storm-bark', wind: beltWind });
  disposables.push(beltAtlas);
  type Spot = { x: number; z: number; h: number; r: number; form: 'broadleaf' | 'column'; card: number; cards: number };
  const spots: Spot[] = [
    // The lone field oak and a younger one, the nearest depth cues.
    { x: -15, z: -34, h: 11, r: 0.45, form: 'broadleaf', card: 1.7, cards: 14 },
    { x: 19, z: -42, h: 8, r: 0.3, form: 'broadleaf', card: 1.7, cards: 13 },
  ];
  // Hedgerow along a curving field boundary, trees gathered in copses with gaps between.
  const hedgeLine = (x: number) => -52 + Math.sin(x * 0.045) * 6 + x * 0.06;
  for (const [cx, n] of [[-46, 4], [-30, 3], [-9, 5], [7, 2], [27, 4], [44, 3]] as [number, number][]) {
    for (let i = 0; i < n; i++) {
      const x = cx + tr(-6, 6), column = treeRandom() < 0.2;
      spots.push({ x, z: hedgeLine(x) + tr(-2.5, 2.5), h: column ? tr(9, 13) : tr(6, 10.5), r: tr(0.22, 0.36), form: column ? 'column' : 'broadleaf', card: 2.1, cards: 12 });
    }
  }
  // Far woodland edge and poplar rows, fading into the rain.
  for (let i = 0; i < 34; i++) {
    const x = -120 + i * 7.2 + tr(-2.5, 2.5), column = i % 5 === 2 || i % 7 === 0;
    spots.push({ x, z: -92 - tr(0, 18) + Math.sin(i * 0.7) * 5, h: column ? tr(13, 18) : tr(8, 14), r: tr(0.3, 0.45), form: column ? 'column' : 'broadleaf', card: 3.0, cards: 10 });
  }
  const treeBuilds = spots.map((spot, i) => buildTree({
    seed: 700 + i * 17, base: new THREE.Vector3(spot.x, height(spot.x, spot.z) - 0.1, spot.z), height: spot.h, radius: spot.r, form: spot.form,
    lean: [tr(-0.5, 0.8), tr(-0.3, 0.3)], gnarl: 0.45, flare: 0.4, crownStart: spot.form === 'column' ? 0.18 : 0.3 + tr(0, 0.1),
    limbs: i < 2 ? 7 : 5, levels: i < 2 ? 2 : 1, children: 3, spread: spot.form === 'column' ? 0.14 : 0.45, curl: spot.form === 'column' ? 0.5 : 0.1,
    radial: i < 2 ? 10 : 6, ringsPerMetre: i < 2 ? 1 : 0.4, displace: 0, barkScale: 2, barkStretch: 4, flex: 0.5,
    leaves: { cardsPerTwig: spot.cards, size: spot.card, reach: 0.85, crownNormals: 0.78, shade: [0.25, 1], fill: 0.8, skyward: 0.35 },
  }));
  // Clipped and wild hedge between the copses.
  const hedgeParts: THREE.BufferGeometry[] = [];
  for (let x = -62; x <= 62; x += tr(2.6, 3.6)) {
    const z = hedgeLine(x) + tr(-0.8, 0.8), s = tr(1.2, 1.9);
    if (Math.abs(x - trackX(z)) < 2.6) continue; // the gate
    hedgeParts.push(shrubGeometry(900 + Math.round(x * 3), new THREE.Vector3(x, height(x, z) + s * 0.45, z), new THREE.Vector3(s * 1.5, s * 0.75, s), 70, 1.3));
  }
  const crowns = new THREE.Mesh(concatGeometries([...treeBuilds.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g), ...hedgeParts]), beltLeaves);
  crowns.name = 'layered-shelterbelt-crowns'; crowns.castShadow = true; scene.add(crowns);
  const trunks = new THREE.Mesh(concatGeometries(treeBuilds.map(t => t.bark)), beltBark);
  trunks.name = 'storm-woodland-trunks'; scene.add(trunks);
  treeBuilds.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });
  hedgeParts.forEach(g => g.dispose());

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

  // An old post-and-wire fence follows the track out to the gate: leaning, weathered
  // posts and two sagging strands, the clearest measure of the field's depth.
  const fence = new TimberSet(61);
  const wireParts: THREE.BufferGeometry[] = [];
  const postTops: THREE.Vector3[] = [];
  for (let z = -4.2, k = 0; z > -51; z -= 2.5 + random() * 0.5, k++) {
    if (k === 6 || k === 13) continue; // a missing post or two
    const x = trackX(z) - 2.1 + (random() - 0.5) * 0.2, h = 1.15 + random() * 0.15, ground = height(x, z);
    const lean = new THREE.Euler((random() - 0.5) * 0.08, random() * 0.6, (random() - 0.5) * 0.1);
    fence.box(0.085 + random() * 0.03, h + 0.3, 0.09, { x, y: ground + (h - 0.3) / 2, z }, lean, { radius: 0.012, grain: 'y' });
    postTops.push(new THREE.Vector3(x, ground, z).add(new THREE.Vector3(Math.sin(lean.z) * -h, 0, Math.sin(lean.x) * h)).setY(ground + h));
  }
  const fenceMesh = fence.build(frameWood, 'storm-fence');
  fenceMesh.castShadow = true; fenceMesh.receiveShadow = true; scene.add(fenceMesh);
  for (const strand of [0.42, 0.78]) {
    for (let i = 0; i + 1 < postTops.length; i++) {
      const a = postTops[i], b = postTops[i + 1];
      const ya = a.y - (1.15 - strand), yb = b.y - (1.15 - strand);
      const mid = new THREE.Vector3((a.x + b.x) / 2, (ya + yb) / 2 - 0.05, (a.z + b.z) / 2);
      wireParts.push(limbGeometry([new THREE.Vector3(a.x, ya, a.z), mid, new THREE.Vector3(b.x, yb, b.z)], 0.004, 0.004, 3, 4));
    }
  }
  const wires = new THREE.Mesh(mergeGeometries(wireParts)!, new THREE.MeshStandardMaterial({ color: '#3a3734', metalness: 0.6, roughness: 0.4 }));
  wires.name = 'storm-fence-wire'; scene.add(wires);
  wireParts.forEach(g => g.dispose());

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
  // A brass wind chime hangs from the beam: five tuned tubes around a wooden striker and sail.
  const chime = new THREE.Group(); chime.position.set(0.58, 3.06, -1.16); scene.add(chime);
  const cordMat = new THREE.MeshStandardMaterial({ color: 0x8c7c62, roughness: 1 });
  const brass = new THREE.MeshStandardMaterial({ color: '#a9884e', metalness: 0.9, roughness: 0.28 });
  const chimeWood = new THREE.MeshStandardMaterial({ color: '#5b3f26', roughness: 0.62 });
  const cord = (length: number, x: number, y: number, z: number) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.0016, 0.0016, length, 4), cordMat); mesh.position.set(x, y - length / 2, z); return mesh;
  };
  chime.add(cord(0.34, 0, 0, 0));
  const chimeTop = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.074, 0.02, 24), chimeWood); chimeTop.position.y = -0.35; chime.add(chimeTop);
  const chimeTubes: THREE.Group[] = [];
  [0.36, 0.32, 0.285, 0.25, 0.22].forEach((length, i) => {
    const a = i / 5 * Math.PI * 2 + 0.3;
    const hanger = new THREE.Group(); hanger.position.set(Math.cos(a) * 0.052, -0.36, Math.sin(a) * 0.052);
    hanger.add(cord(0.035, 0, 0, 0));
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.0075, length, 14, 1, true), brass);
    tube.position.y = -0.035 - length / 2; tube.castShadow = true; hanger.add(tube);
    chime.add(hanger); chimeTubes.push(hanger);
  });
  chime.add(cord(0.2, 0, -0.36, 0));
  const striker = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.01, 20), chimeWood); striker.position.y = -0.53; chime.add(striker);
  chime.add(cord(0.12, 0, -0.535, 0));
  const sail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.1, 0.005), chimeWood); sail.position.y = -0.705; chime.add(sail);
  // Tapping around the chime or the awning raises or lowers the awning.
  const target = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.9, 0.4), new THREE.MeshBasicMaterial({ visible: false })); target.position.set(0.7, 2.1, -1.2); scene.add(target);
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
  const interiorParts: THREE.Object3D[] = [deckMesh, frameMesh, stoolMesh, roof, gutter, awning, lowerRail, roll, pot, lantern.group, chime];

  // ---- Rain, gutter overflow, drips and splashes -------------------------------------------
  // A drop shows the sky it refracts: under a dark deck the rain is greyer than the clearing.
  const rainSky = new THREE.Color(0.72, 0.78, 0.84);
  const wind = new THREE.Vector2(0.09, 0.03);
  // Thin, uneven threads that read against the dark field and woods and fade against the
  // bright clearing; the distant layers are a fine haze gathered into drifting veils.
  const rainLayers = [
    createRainLayer({ time, count: 1500, min: new THREE.Vector3(-5, -0.7, -6.5), max: new THREE.Vector3(5, 4.5, -2.05), speed: 8.2, width: 0.0019, shutter: 0.03, radiance: rainSky, opacity: 0.38, boost: 1.1, seed: 21, wind, nearFade: 1.2, variation: 1, occlusion: 0.9 }),
    createRainLayer({ time, count: 7000, min: new THREE.Vector3(-14, -1, -22), max: new THREE.Vector3(14, 10, -6.5), speed: 8.5, width: 0.0016, shutter: 0.03, radiance: rainSky, opacity: 0.45, boost: 1.15, seed: 22, wind, variation: 1, occlusion: 0.9, gusts: 0.5, gustScale: 9, gustDrift: new THREE.Vector2(1.6, 0.3) }),
    createRainLayer({ time, count: 14000, min: new THREE.Vector3(-45, -2, -70), max: new THREE.Vector3(45, 22, -22), speed: 9, width: 0.0015, shutter: 0.03, radiance: rainSky, opacity: 0.45, boost: 1, seed: 23, wind, variation: 1, occlusion: 0.85, gusts: 0.85, gustScale: 16, gustDrift: new THREE.Vector2(1.8, 0.3) }),
  ];
  rainLayers.forEach(layer => scene.add(layer.mesh));
  const veils = createRainVeils(time, new THREE.Color(0.62, 0.67, 0.72), [
    { z: -30, width: 110, height: 30, opacity: 0.22, seed: 1 },
    { z: -48, width: 150, height: 36, opacity: 0.28, seed: 2 },
    { z: -75, width: 220, height: 45, opacity: 0.32, seed: 3 },
    { z: -125, width: 330, height: 60, opacity: 0.36, seed: 4 },
  ]);
  scene.add(veils.group); disposables.push(veils);
  // The gutter overflows unevenly at its low seams: one heavy pour, a few dripping chains.
  const overflow: RunoffStream[] = [[-2.62, 0.25], [-1.1, 0.75], [0.42, 0.18], [1.95, 0.4], [2.9, 0.12]].map(([x, flow]) => ({
    top: new THREE.Vector3(x, 3.04, -1.98), bottom: new THREE.Vector3(x + 0.03, height(x, -2.1) + 0.02, -2.06 - flow * 0.08), width: 0.014 + flow * 0.03, flow,
  }));
  const runoff = createRunoff(overflow, { time, radiance: new THREE.Color(1.1, 1.17, 1.22), opacity: 0.7, chain: true, shutter: 0.015, occlusion: 0.6 });
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
  const rainObjects = () => [...rainLayers.map(l => l.mesh), runoff.mesh, gutterDrips.mesh, awningDrips.mesh, splashes.mesh, veils.group];
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
    // The chime turns and swings a little in the gusts; its tubes lag behind.
    chime.rotation.set(Math.sin(t * 0.53) * 0.035 + Math.sin(t * 1.17 + 1) * 0.012, Math.sin(t * 0.21) * 0.4, Math.sin(t * 0.61 + 2) * 0.03);
    chimeTubes.forEach((tube, i) => tube.rotation.set(Math.sin(t * 0.9 + i * 1.7) * 0.05, 0, Math.sin(t * 0.77 + i * 2.3) * 0.05));
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
    setViewHeight(pixels) { [...rainLayers, gutterDrips, awningDrips].forEach(layer => layer.setViewHeight(pixels)); runoff.setViewHeight(pixels); },
    interact(x, y, explicit = false, immediate = false) {
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      if (!explicit && raycaster.intersectObjects([target, awning, lowerRail, chime], true).length === 0) return null;
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
