import * as THREE from 'three';
import type { SceneContent } from '../types';
import { bakeStatic, KP_NOISE } from './kit';

/** Original spatial interpretation of the approved rural-ghibli-v9 composition.
 * All forms, textures and animation below are authored procedurally for this scene.
 * The image is a composition and palette reference only; it is never rendered.
 * Style: original soft-banded 3D toon shading (no outlines), moon rim light,
 * HDR moon, warm windows and slow fireflies for the bloom pass.
 */
const LIGHT_DIR = new THREE.Vector3(-.32, .8, -.5).normalize();

/** Soft three-step ramp: shadow, mid and lit bands with narrow smooth shoulders. */
function toonRamp() {
  const size = 256, data = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    const t = i / (size - 1);
    const v = .34 + .3 * THREE.MathUtils.smoothstep(t, .42, .5) + .36 * THREE.MathUtils.smoothstep(t, .66, .74);
    data[i] = Math.round(v * 255);
  }
  const texture = new THREE.DataTexture(data, size, 1, THREE.RedFormat);
  texture.minFilter = texture.magFilter = THREE.LinearFilter; texture.needsUpdate = true;
  return texture;
}

export function createRuralScene(renderer?: THREE.WebGLRenderer): SceneContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#102a55');
  scene.fog = new THREE.FogExp2('#1d3b5e', 0.0062);
  scene.userData.exposure = .95;
  const camera = new THREE.PerspectiveCamera(55, 1, 0.08, 320);
  const random = seeded(18073);
  const ramp = toonRamp();
  const rim = { color: { value: new THREE.Color('#9fc0ff') }, dir: { value: LIGHT_DIR.clone() } };
  const time = { value: 0 };

  /** Toon material: banded moonlight (with shadows), sky fill from the hemisphere,
   * a moon-side rim and an optional painterly world-space mottle. */
  const toon = (color: THREE.ColorRepresentation, o: { vertexColors?: boolean; side?: THREE.Side; rim?: number; mottle?: number; scale?: number; key: string; vertex?: string; fragment?: string; uniforms?: Record<string, THREE.IUniform> }) => {
    const material = new THREE.MeshToonMaterial({ color, gradientMap: ramp, vertexColors: !!o.vertexColors, side: o.side ?? THREE.FrontSide });
    material.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, { uRimColor: rim.color, uRimDir: rim.dir, uRuralTime: time }, o.uniforms ?? {});
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vRuralWorld;\nvarying vec3 vRuralNormal;\nuniform float uRuralTime;\n' + (o.vertex ? 'varying float vRuralWave;\nuniform vec3 uRuralTouch;' : ''))
        .replace('#include <begin_vertex>', `#include <begin_vertex>\n${o.vertex ?? ''}`)
        .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 rw = vec4(transformed, 1.0); vec3 rn = objectNormal;
  #ifdef USE_INSTANCING
    rw = instanceMatrix * rw; rn = mat3(instanceMatrix) * rn;
  #endif
  vRuralWorld = (modelMatrix * rw).xyz; vRuralNormal = normalize(mat3(modelMatrix) * rn);
}`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>\nvarying vec3 vRuralWorld;\nvarying vec3 vRuralNormal;\nuniform vec3 uRimColor;\nuniform vec3 uRimDir;\nuniform float uRuralTime;\n${o.vertex ? 'varying float vRuralWave;' : ''}\n${KP_NOISE}`)
        .replace('#include <color_fragment>', `#include <color_fragment>
${o.mottle ? `diffuseColor.rgb *= 1.0 + ${o.mottle.toFixed(3)} * (bwNoise(vRuralWorld * ${(o.scale ?? .5).toFixed(3)}) * 0.7 + bwNoise(vRuralWorld * ${((o.scale ?? .5) * 3.1).toFixed(3)}) * 0.3);` : ''}
${o.fragment ?? ''}`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 rN = normalize(vRuralNormal);
  #ifdef DOUBLE_SIDED
    rN *= gl_FrontFacing ? 1.0 : -1.0;
  #endif
  vec3 rV = normalize(cameraPosition - vRuralWorld);
  float fres = pow(1.0 - clamp(abs(dot(rN, rV)), 0.0, 1.0), 3.0);
  float toward = smoothstep(-0.1, 0.7, dot(rN, uRimDir));
  totalEmissiveRadiance += diffuseColor.rgb * uRimColor * fres * toward * ${(o.rim ?? .6).toFixed(3)};
}`);
    };
    material.customProgramCacheKey = () => `kp-rural-toon-v1|${o.key}`;
    return material;
  };
  const emissive = (r: number, g: number, b: number, extra: THREE.MeshBasicMaterialParameters = {}) => {
    const material = new THREE.MeshBasicMaterial({ ...extra }); material.color.setRGB(r, g, b, THREE.LinearSRGBColorSpace); return material;
  };
  const material = {
    soil: toon('#14402f', { mottle: .35, scale: .35, rim: 0, key: 'soil' }),
    wall: toon('#c7c0aa', { mottle: .12, scale: 2, rim: .4, key: 'wall' }),
    wood: toon('#3a2f27', { mottle: .15, scale: 3, key: 'wood' }),
    roof: toon('#34414f', { side: THREE.DoubleSide, mottle: .12, scale: 1.5, rim: .9, key: 'roof' }),
    ridge: toon('#4b5866', { mottle: .1, key: 'ridge' }),
    dark: toon('#1c2328', { key: 'dark' }),
    pole: toon('#7a6f62', { mottle: .25, scale: 4, rim: .8, key: 'pole' }),
    metal: toon('#3c454c', { key: 'metal' }),
    window: emissive(3.4, 2.1, .8),
    windowDim: emissive(1.5, .85, .32),
  };
  const hemi = new THREE.HemisphereLight('#5f86c4', '#0f2a24', 1.05); scene.add(hemi);
  const moonlight = new THREE.DirectionalLight('#c3d6ff', 2.6);
  moonlight.position.copy(LIGHT_DIR).multiplyScalar(60).add(new THREE.Vector3(2, 0, -14)); moonlight.target.position.set(2, 0, -14);
  moonlight.castShadow = true; moonlight.shadow.mapSize.set(2048, 2048);
  Object.assign(moonlight.shadow.camera, { left: -26, right: 26, top: 30, bottom: -30, near: 10, far: 120 });
  moonlight.shadow.radius = 2; moonlight.shadow.bias = -.0004; moonlight.shadow.normalBias = .04;
  scene.add(moonlight, moonlight.target);

  // Sky dome: deep blue gradient, a soft halo around the moon and sparse stars.
  const moonWorld = new THREE.Vector3(-12, 39, -79);
  const sky = new THREE.Mesh(new THREE.SphereGeometry(260, 40, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uMoon: { value: new THREE.Vector3() } },
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `${KP_NOISE}
      uniform vec3 uMoon; varying vec3 vP;
      void main(){
        vec3 d = normalize(vP);
        float h = clamp(d.y * 1.6, 0.0, 1.0);
        vec3 low = vec3(0.07, 0.17, 0.36), high = vec3(0.012, 0.035, 0.12);
        vec3 col = mix(low, high, pow(h, 0.7));
        col *= 0.92 + 0.12 * bwFbm3(d * 3.0);
        float m = max(dot(d, uMoon), 0.0);
        col += vec3(0.16, 0.2, 0.3) * pow(m, 18.0) + vec3(0.35, 0.36, 0.38) * pow(m, 160.0);
        // Sparse single stars: at most one per cell, most cells empty.
        vec3 cell = floor(d * 60.0);
        vec3 hs = bwHash3(cell);
        vec3 starDir = normalize((cell + 0.25 + hs * 0.5) / 60.0);
        float star = step(0.972, hs.x) * smoothstep(0.9999985, 0.9999997, dot(d, starDir)) * smoothstep(0.12, 0.45, d.y);
        col += vec3(0.7, 0.78, 1.0) * star * (0.35 + 1.4 * hs.y * hs.y);
        gl_FragColor = vec4(col, 1.0);
      }`,
  }));
  sky.renderOrder = -10; sky.frustumCulled = false; scene.add(sky);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(150, 170), material.soil);
  ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.045, -40); ground.receiveShadow = true; scene.add(ground);

  function mesh(geometry: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, parent: THREE.Object3D = scene) {
    const result = new THREE.Mesh(geometry, mat); result.position.set(x, y, z); result.castShadow = true; result.receiveShadow = true; parent.add(result); return result;
  }
  function beam(a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D = scene, sides = 7) {
    const delta = b.clone().sub(a);
    const m = mesh(new THREE.CylinderGeometry(radius * 0.88, radius, delta.length(), sides), mat, 0, 0, 0, parent);
    m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); return m;
  }
  function curve(points: THREE.Vector3[], radius: number, mat: THREE.Material, parent: THREE.Object3D = scene, segments = 24) {
    return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 6, false), mat, 0, 0, 0, parent);
  }

  // Field path: S bend, scalloped banks, wheel tracks and a grassy crown.
  const pathX = (z: number) => 2.8 * Math.exp(-(((z + 1) / 10) ** 2)) - 1.2 * Math.exp(-(((z + 13) / 5) ** 2)) + 5.5 * Math.exp(-(((z + 29) / 8) ** 2));
  const pathWidth = (z: number) => 1.15 + (z + 32) * 0.007;
  const roadPositions: number[] = [], roadColors: number[] = [], roadIndices: number[] = [];
  const roadColumns = 15;
  for (let i = 0; i <= 140; i++) {
    const z = 18 - i * .37, center = pathX(z), width = pathWidth(z);
    for (let column = 0; column < roadColumns; column++) {
      const lateral = -1 + 2 * column / (roadColumns - 1);
      const edgeNoise = Math.abs(lateral) > .98 ? (random() - .5) * .18 : 0;
      roadPositions.push(center + lateral * width + edgeNoise, .004 + random() * .004 - Math.exp(-(((Math.abs(lateral) - .55) / .16) ** 2)) * .02, z);
      const track = Math.exp(-(((Math.abs(lateral) - .55) / .2) ** 2));
      const crown = Math.exp(-((lateral / .16) ** 2));
      const edge = Math.pow(Math.abs(lateral), 6);
      const c = new THREE.Color('#7b7166').lerp(new THREE.Color('#a39886'), track * .7).lerp(new THREE.Color('#3d6248'), crown * .55).lerp(new THREE.Color('#34503f'), edge * .6);
      roadColors.push(c.r, c.g, c.b);
      if (i < 140 && column < roadColumns - 1) { const n = i * roadColumns + column; roadIndices.push(n, n + 1, n + roadColumns, n + 1, n + roadColumns + 1, n + roadColumns); }
    }
  }
  const roadMat = toon('#ffffff', { vertexColors: true, mottle: .22, scale: 1.6, rim: 0, key: 'road', fragment: `
    float pebble = smoothstep(0.7, 0.86, bwValue(vRuralWorld * 9.0));
    float dapple = smoothstep(-0.05, 0.35, bwFbm3(vRuralWorld * vec3(0.55, 1.0, 0.55) + 4.0));
    diffuseColor.rgb *= (1.0 + pebble * 0.1) * mix(0.72, 1.02, dapple);` });
  const road = mesh(makeGeometry(roadPositions, roadColors, roadIndices), roadMat); road.castShadow = false;
  const stoneData = new GeometryBuilder();
  for (let i = 0; i < 520; i++) {
    const z = -31 + random() * 50, lateral = (random() - .5) * 1.92;
    const color = new THREE.Color().setHSL(.08 + random() * .06, .06 + random() * .05, .3 + random() * .1);
    stoneData.groundPatch(pathX(z) + lateral * pathWidth(z), z, .02, .014 + random() * .06, .02 + random() * .08, color, random);
  }
  const stones = mesh(stoneData.geometry(), toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, rim: 0, key: 'stones' })); stones.castShadow = false;

  // Rice: rooted, coherent wind bend, plus slow brighter waves that travel across the paddies.
  const touch = { value: new THREE.Vector3(1000, 1000, 0) };
  const riceVertex = `
    vec3 rootPosition = vec3(instanceMatrix[3]);
    float bladeHeight = max(0.0, position.y);
    float breeze = sin(rootPosition.x * 0.29 + rootPosition.z * 0.36 + uRuralTime * 0.71) * 0.038;
    breeze += sin(rootPosition.x * 0.51 - rootPosition.z * 0.18 + uRuralTime * 1.13) * 0.014;
    float touchDistance = length(rootPosition.xz - uRuralTouch.xy);
    float localBend = exp(-touchDistance * touchDistance * 0.48) * uRuralTouch.z;
    transformed.x += (breeze + localBend * 0.23) * bladeHeight * bladeHeight;
    transformed.z += (breeze * 0.57 + localBend * 0.13) * bladeHeight * bladeHeight;
    vRuralWave = smoothstep(0.55, 1.0, sin(rootPosition.x * 0.12 + rootPosition.z * 0.21 - uRuralTime * 0.55) * 0.5 + 0.5) * clamp(bladeHeight, 0.0, 1.0);`;
  const riceMat = toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, rim: 1.1, key: 'rice', vertex: riceVertex, uniforms: { uRuralTouch: touch }, fragment: `
    diffuseColor.rgb *= 1.0 + vRuralWave * 0.35;
    diffuseColor.rgb *= 0.9 + 0.2 * bwNoise(vRuralWorld * 0.23);` });
  const rice: { lod: number; p: THREE.Vector3 }[] = [];
  for (let z = 11; z > -43; z -= z > -12 ? .66 : z > -26 ? .9 : 1.25) {
    const lod = z > -12 ? 0 : z > -26 ? 1 : 2;
    const step = lod === 0 ? .66 : lod === 1 ? .9 : 1.25;
    for (let x = -44; x < 44; x += lod === 0 && Math.abs(x) > 17 ? .9 : step) {
      const px = x + (random() - .5) * .35, pz = z + (random() - .5) * .35;
      if (Math.abs(px - pathX(pz)) < pathWidth(pz) + .4) continue;
      // Behind the seated eye or far outside any supported aspect (with look-around margin).
      if (pz > 10.7 || Math.abs(px) > (10.4 - pz) * 1.45 + 1) continue;
      const row = Math.abs(((pz + 48) % 9) - 4.5);
      if (row < .25) continue;
      rice.push({ lod: lod === 0 && Math.abs(px) > 17 ? 1 : lod, p: new THREE.Vector3(px, 0, pz) });
    }
  }
  const dummy = new THREE.Object3D();
  const riceShapes = [riceClump(random, 7, 5, 2), riceClump(random, 4, 4, 1), riceClump(random, 3, 3, 0)];
  const riceMeshes = riceShapes.map((geometry, lod) => {
    const list = rice.filter(r => r.lod === lod);
    const instanced = new THREE.InstancedMesh(geometry, riceMat, list.length);
    list.forEach(({ p }, i) => {
      dummy.position.copy(p);
      const s = (lod === 0 ? .85 : 1) + random() * .4;
      dummy.scale.set(s, s * (.85 + random() * .26), s); dummy.rotation.set(0, random() * Math.PI * 2, 0); dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
      instanced.setColorAt(i, new THREE.Color().setHSL(.31 + random() * .05, .38 + random() * .14, .48 + random() * .16));
    });
    instanced.castShadow = lod === 0; instanced.receiveShadow = true; instanced.computeBoundingSphere(); scene.add(instanced);
    return instanced;
  });
  // Distant paddies read as one rice canopy surface under the far clumps.
  const fieldGeo = new THREE.PlaneGeometry(120, 56, 120, 56); fieldGeo.rotateX(-Math.PI / 2);
  const cp = fieldGeo.attributes.position;
  for (let i = 0; i < cp.count; i++) {
    const x = cp.getX(i), z = cp.getZ(i) - 32;
    const onPath = Math.abs(x - pathX(z)) < pathWidth(z) + .7;
    const nearHouse = Math.hypot(x - 6.4, z + 31) < 6.5;
    const bund = Math.min(...[-8, -17, -26, -35].map(b => Math.abs(z - b))) < .6;
    cp.setXYZ(i, x, onPath || nearHouse || z < -41 ? -.3 : bund ? .2 : z > -12 ? .38 : .55, z);
  }
  fieldGeo.computeVertexNormals();
  const canopyPlane = new THREE.Mesh(fieldGeo, toon('#2f6a46', { mottle: .3, scale: .6, rim: .5, key: 'rice-canopy', fragment: `
    float rows = 0.5 + 0.5 * sin(vRuralWorld.z * 3.2 + bwNoise(vRuralWorld * 0.4) * 2.0);
    diffuseColor.rgb *= 0.86 + 0.18 * rows;` }));
  canopyPlane.receiveShadow = true; scene.add(canopyPlane);

  // Uneven field bunds and leafy weeds along the path.
  const bankMaterial = toon('#24583f', { mottle: .2, scale: 1, rim: .3, key: 'bank' });
  for (const z of [-8, -17, -26, -35]) for (const side of [-1, 1]) {
    const center = pathX(z), edge = center + side * (pathWidth(z) + .22);
    beam(new THREE.Vector3(edge, .08, z), new THREE.Vector3(side * 48, .08, z + .08), .15, bankMaterial, scene, 6);
  }
  const leafMat = toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, rim: .8, key: 'weeds' });
  const weedGeo = weedClump(random);
  const weeds = new THREE.InstancedMesh(weedGeo, leafMat, 520);
  for (let i = 0; i < 520; i++) {
    const z = 12 - random() * 45, side = i % 2 ? 1 : -1;
    dummy.position.set(pathX(z) + side * (pathWidth(z) + .05 + random() * .6), .015, z);
    dummy.rotation.set(0, random() * 6.28, 0); dummy.scale.setScalar(.26 + random() * .36); dummy.updateMatrix();
    weeds.setMatrixAt(i, dummy.matrix); weeds.setColorAt(i, new THREE.Color().setHSL(.27 + random() * .05, .6, .62 + random() * .2));
  }
  weeds.castShadow = false; weeds.receiveShadow = true; scene.add(weeds);
  const centerWeeds = new THREE.InstancedMesh(weedGeo, leafMat, 110);
  for (let i = 0; i < 110; i++) {
    const z = 11 - random() * 41;
    dummy.position.set(pathX(z) + (random() - .5) * .4, .018, z); dummy.rotation.set(0, random() * 6.28, 0); dummy.scale.setScalar(.08 + random() * .16); dummy.updateMatrix();
    centerWeeds.setMatrixAt(i, dummy.matrix); centerWeeds.setColorAt(i, new THREE.Color().setHSL(.28, .55, .6 + random() * .15));
  }
  centerWeeds.receiveShadow = true; scene.add(centerWeeds);

  // Wooded hill and distant ridges keep the enclosing countryside of the reference.
  const ridgeMat = toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, mottle: .2, scale: .3, rim: .6, key: 'ridges' });
  for (let layer = 0; layer < 3; layer++) {
    const g = new GeometryBuilder(), z = -99 + layer * 19;
    const ridgeColor = new THREE.Color(['#1d3a52', '#1d4250', '#1b4644'][layer]);
    for (let x = -125; x < 125; x += 3) {
      const height = 8 + Math.sin(x * .05 + layer) * 4 + Math.sin(x * .115 + layer * 2) * 2;
      const h2 = 8 + Math.sin((x + 3) * .05 + layer) * 4 + Math.sin((x + 3) * .115 + layer * 2) * 2;
      g.quad([x, -1, z], [x, height, z], [x + 3, h2, z], [x + 3, -1, z], ridgeColor);
    }
    const ridge = mesh(g.geometry(), ridgeMat); ridge.castShadow = false;
  }
  const forest = new THREE.Group(); scene.add(forest);
  const canopyGeo = foliageGeometry(random);
  const crownMat = toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, rim: 1.0, mottle: .15, scale: .8, key: 'crowns' });
  const canopies: { p: THREE.Vector3; scale: THREE.Vector3; color: THREE.Color }[] = [];
  const branches = new GeometryBuilder();
  const crownColors = ['#235a4a', '#2b6650', '#2f6b55', '#1f5045', '#3a7458'];
  for (let i = 0; i < 112; i++) {
    const x = -67 + random() * 134, z = -42 - random() * 24;
    const centerMass = Math.exp(-(((x - 2) / 21) ** 2));
    const h = 4.2 + random() * 6.7 + centerMass * 4.5;
    const trunk = new THREE.Color('#1c3338');
    branches.taperedStem(new THREE.Vector3(x, 0, z), new THREE.Vector3(x + .25, h * .73, z), .1 + .012 * h, trunk, 5);
    for (let b = 0; b < 7; b++) {
      const a = b * 2.4 + random(), y = h * (.48 + random() * .4), reach = 1.4 + random() * 2.0;
      const tx = x + Math.cos(a) * reach, tz = z + Math.sin(a) * reach;
      branches.taperedStem(new THREE.Vector3(x, y * .78, z), new THREE.Vector3(tx, y, tz), .05, trunk, 4);
      canopies.push({ p: new THREE.Vector3(tx, y, tz), scale: new THREE.Vector3(2 + random() * 1.4, 1.6 + random() * 1.3, 1.7 + random()), color: new THREE.Color(crownColors[Math.floor(random() * 5)]) });
    }
    canopies.push({ p: new THREE.Vector3(x, h, z), scale: new THREE.Vector3(2.1, 2.4, 2), color: new THREE.Color(crownColors[Math.floor(random() * 5)]) });
  }
  for (let x = -62; x < 62; x += 2.1) canopies.push({ p: new THREE.Vector3(x, .9 + random(), -40 - random() * 5), scale: new THREE.Vector3(1.6 + random(), 1.2 + random() * .8, 1.6), color: new THREE.Color(crownColors[Math.floor(random() * 3)]) });
  const trunks = mesh(branches.geometry(), toon('#ffffff', { vertexColors: true, key: 'trunks' }), 0, 0, 0, forest); trunks.castShadow = false;
  const treeMesh = new THREE.InstancedMesh(canopyGeo, crownMat, canopies.length);
  canopies.forEach((c, i) => { dummy.position.copy(c.p); dummy.scale.copy(c.scale); dummy.rotation.set(random() * .3, random() * 6.28, random() * .2); dummy.updateMatrix(); treeMesh.setMatrixAt(i, dummy.matrix); treeMesh.setColorAt(i, c.color); });
  treeMesh.castShadow = false; treeMesh.receiveShadow = true; forest.add(treeMesh);
  const cedarMat = toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, rim: .9, key: 'cedar' });
  for (let i = 0; i < 7; i++) { const c = mesh(cedarGeometry(random, 17 + random() * 7), cedarMat, -9 + i * 2.8, 0, -51 - random() * 5, forest); c.castShadow = false; }

  // Farmhouse: timber-framed plaster, tiled roof, warm windows with light spilling out.
  const house = new THREE.Group(); house.position.set(6.4, 0, -31); house.rotation.y = -.36; scene.add(house);
  mesh(new THREE.BoxGeometry(6.7, 4.0, 4.5), material.wall, 0, 2.12, 0, house);
  mesh(new THREE.BoxGeometry(7.0, .28, 4.8), toon('#4f5a46', { key: 'plinth' }), 0, .14, 0, house);
  const gable = new GeometryBuilder();
  gable.triangle([3.35, 4.12, -2.25], [3.35, 4.12, 2.25], [3.35, 6.2, 0], new THREE.Color('#b8b29d'));
  gable.triangle([-3.35, 4.12, 2.25], [-3.35, 4.12, -2.25], [-3.35, 6.2, 0], new THREE.Color('#b8b29d'));
  mesh(gable.geometry(), toon('#ffffff', { vertexColors: true, side: THREE.DoubleSide, key: 'gable' }), 0, 0, 0, house);
  for (const x of [-3.35, 0, 3.35]) mesh(new THREE.BoxGeometry(.13, 4.15, .16), material.wood, x, 2.17, 2.29, house);
  for (const y of [.48, 2.28, 4.1]) mesh(new THREE.BoxGeometry(6.75, .13, .13), material.wood, 0, y, 2.3, house);
  const mainRoof = new THREE.Group(); mainRoof.rotation.y = Math.PI / 2; house.add(mainRoof);
  roof(mainRoof, 0, 4.13, 0, 5.8, 7.7, 2.2, material.roof, material.ridge, mesh, curve);
  function houseWindow(x: number, y: number, z: number, w: number, h: number, parent: THREE.Object3D = house, glow = material.window) {
    mesh(new THREE.BoxGeometry(w + .22, h + .2, .14), material.wood, x, y, z, parent);
    mesh(new THREE.PlaneGeometry(w, h), glow, x, y, z + .083, parent).castShadow = false;
    mesh(new THREE.BoxGeometry(.048, h, .04), material.wood, x, y, z + .115, parent);
    mesh(new THREE.BoxGeometry(w, .045, .04), material.wood, x, y + .08, z + .115, parent);
    mesh(new THREE.BoxGeometry(w + .24, .1, .25), material.dark, x, y - h * .5 - .07, z + .04, parent);
  }
  houseWindow(-2.1, 3.08, 2.36, 1.02, 1.17); houseWindow(-.3, 3.08, 2.36, 1.20, 1.17, house, material.windowDim); houseWindow(1.55, 3.08, 2.36, .68, .95);
  const sideWall = new THREE.Group(); sideWall.position.set(3.39, 0, 0); sideWall.rotation.y = Math.PI / 2; house.add(sideWall);
  houseWindow(.05, 4.64, .015, .78, .92, sideWall, material.windowDim); houseWindow(-.65, 2.8, .015, .78, 1.04, sideWall);
  mesh(new THREE.BoxGeometry(2.7, 2.22, 2.6), toon('#bdb7a2', { mottle: .1, scale: 2, key: 'kitchen' }), 2.45, 1.23, 2.35, house);
  roof(house, 2.45, 2.30, 2.35, 3.4, 3.2, .55, material.roof, material.ridge, mesh, curve);
  houseWindow(2.57, 1.4, 3.67, 1.36, 1.03);
  mesh(new THREE.BoxGeometry(.8, 1.78, .14), material.wood, 1.05, 1.12, 3.7, house);
  for (let i = 0; i < 3; i++) mesh(new THREE.BoxGeometry(2.1 + i * .24, .13, .48), toon('#6f7863', { key: 'steps' }), 1.5, .30 - i * .08, 3.98 + i * .39, house);
  const warm = new THREE.PointLight('#ff9d45', 9, 12, 1.8); warm.position.set(1.8, 2.0, 4.6); house.add(warm);
  const glow = makeGlowTexture();
  for (const x of [-2.1, -.3, 2.6]) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: '#ffb46a', transparent: true, opacity: .22, depthWrite: false, blending: THREE.AdditiveBlending }));
    s.position.set(x, x === 2.6 ? 1.4 : 3.08, x === 2.6 ? 3.9 : 2.5); s.scale.set(2.4, 2.4, 1); house.add(s);
  }
  const shrub = new THREE.InstancedMesh(canopyGeo, crownMat, 30);
  for (let i = 0; i < 30; i++) { dummy.position.set(-5 + random() * 10, .3 + random() * .5, 3.2 + random() * 1.8); dummy.scale.set(.6 + random() * .5, .5 + random() * .5, .65); dummy.rotation.set(0, random() * 6.28, 0); dummy.updateMatrix(); shrub.setMatrixAt(i, dummy.matrix); shrub.setColorAt(i, new THREE.Color(crownColors[i % 5])); }
  house.add(shrub);

  // Utility pole: tapered shaft, bracket hardware, insulators and sagging wires.
  const pole = new THREE.Group(); pole.position.set(7.2, 0, -8.5); pole.scale.y = .92; scene.add(pole);
  mesh(new THREE.CylinderGeometry(.13, .24, 11.7, 12), material.pole, 0, 5.85, 0, pole).rotation.z = -.017;
  mesh(new THREE.BoxGeometry(1.72, .12, .14), material.wood, 0, 10.60, .06, pole);
  beam(new THREE.Vector3(-.73, 10.52, .04), new THREE.Vector3(0, 9.97, .04), .035, material.metal, pole);
  beam(new THREE.Vector3(.73, 10.52, .04), new THREE.Vector3(0, 9.97, .04), .035, material.metal, pole);
  for (const x of [-.72, .69]) {
    beam(new THREE.Vector3(x, 10.58, .06), new THREE.Vector3(x, 10.92, .06), .031, material.metal, pole);
    for (let i = 0; i < 3; i++) mesh(new THREE.CylinderGeometry(.075, .08, .064, 12), toon('#9aa59c', { rim: 1, key: 'insulator' }), x, 10.78 + i * .055, .06, pole);
  }
  for (const y of [2.5, 7.0, 10.25]) { const hoop = mesh(new THREE.TorusGeometry(.181, .021, 4, 12), material.metal, 0, y, 0, pole); hoop.rotation.x = Math.PI / 2; }
  const wireMaterial = toon('#101b24', { rim: .4, key: 'wire' });
  for (const x of [-.72, .69]) {
    curve([new THREE.Vector3(x, 10.94, .06), new THREE.Vector3(x + 3, 11.7, 3), new THREE.Vector3(x + 11, 18, 10)], .016, wireMaterial, pole, 35);
    curve([new THREE.Vector3(x, 10.94, .06), new THREE.Vector3(x - 3, 6.5, -12), new THREE.Vector3(x - 7.7, 6.7, -28)], .016, wireMaterial, pole, 44);
    curve([new THREE.Vector3(x, 10.94, .06), new THREE.Vector3(x + 13, 6.1, -10), new THREE.Vector3(x + 27, 7, -25)], .016, wireMaterial, pole, 38);
  }
  beam(new THREE.Vector3(-2.7, 0, -36.5), new THREE.Vector3(-2.7, 6.7, -36.5), .083, material.pole);
  beam(new THREE.Vector3(-3.4, 6.5, -36.5), new THREE.Vector3(-2, 6.5, -36.5), .04, material.wood);

  // Moon: authored maria texture, HDR so it blooms; halo stays in the sky shader.
  const moonTexture = makeMoonTexture();
  const moonMat = new THREE.MeshBasicMaterial({ map: moonTexture, transparent: true, depthWrite: false, fog: false });
  moonMat.color.setRGB(5.5, 5.2, 4.3, THREE.LinearSRGBColorSpace);
  const moon = mesh(new THREE.PlaneGeometry(7.0, 7.0), moonMat, -12, 39, -79); moon.castShadow = false; moon.receiveShadow = false;

  // Clouds: one continuous surface per bank, toon-lit by the moon with silver linings.
  const clouds = new THREE.Group(); scene.add(clouds);
  const cloudUniforms = { uMoonPos: { value: moonWorld.clone() } };
  const cloudFragment = `${KP_NOISE}
    uniform vec3 uMoonPos; varying vec3 vWorld; varying vec3 vNormalWorld;
    void main(){
      vec3 n = normalize(vNormalWorld);
      vec3 toMoon = normalize(uMoonPos - vWorld);
      vec3 v = normalize(cameraPosition - vWorld);
      float light = dot(n, normalize(toMoon + vec3(0.0, 0.6, 0.0))) * 0.5 + 0.5;
      float tier = smoothstep(0.4, 0.55, light) * 0.55 + smoothstep(0.68, 0.84, light) * 0.45;
      float paint = bwFbm3(vWorld * 0.09) * 0.5 + 0.5;
      vec3 shadow = vec3(0.1, 0.17, 0.33), mid = vec3(0.32, 0.42, 0.6), lit = vec3(0.78, 0.82, 0.9);
      vec3 col = mix(shadow, mid, smoothstep(0.0, 0.55, tier + (paint - 0.5) * 0.12));
      col = mix(col, lit, smoothstep(0.55, 1.0, tier + (paint - 0.5) * 0.1));
      float rimMask = pow(1.0 - abs(dot(n, v)), 2.5) * smoothstep(-0.2, 0.5, dot(n, toMoon));
      col += vec3(0.85, 0.88, 0.82) * rimMask * 0.55;
      gl_FragColor = vec4(col, 1.0);
    }`;
  const billowMaterial = new THREE.ShaderMaterial({
    fog: false, uniforms: cloudUniforms,
    vertexShader: 'varying vec3 vWorld; varying vec3 vNormalWorld; void main(){ vWorld = (modelMatrix * vec4(position, 1.0)).xyz; vNormalWorld = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0); }',
    fragmentShader: cloudFragment,
  });
  const leftBillows: CloudBillow[] = [
    [-14, -.5, -.1, 6.8, 3.0, 3.1], [-6, -.7, 0, 8.3, 3.6, 3.6], [4, -.8, .2, 8.1, 3.4, 3.8], [12, -1, .1, 6.3, 2.8, 3],
    [-11, 3.1, 0, 5.4, 4.8, 3.7], [-6.8, 7.9, -.8, 4.8, 5.0, 3.4], [-.6, 4.7, .3, 5.8, 4.5, 3.9], [7.6, 3.2, -.4, 5.7, 3.8, 3.4],
    [-16.5, 1.9, .1, 3.1, 2.3, 2.4], [-9.3, 10.5, -.7, 2.7, 2.8, 2.4], [-3.8, 9.9, -.5, 2.2, 2.6, 2.2], [3.5, 7.2, -.4, 2.9, 2.6, 2.5], [12.2, 2.9, -.3, 3.2, 2.3, 2.6],
  ];
  const rightBillows: CloudBillow[] = [
    [-16, -1.1, 0, 6.5, 2.7, 3.2], [-7, -.8, .2, 8.1, 3.6, 3.8], [3, -.4, 0, 8.7, 3.7, 4.1], [13, -1.2, .2, 7.6, 3.0, 3.3],
    [-10, 3.1, -.4, 4.8, 4.0, 3.4], [-3.6, 6.3, -.6, 5.0, 4.9, 3.6], [4.7, 4.0, .3, 6.1, 4.3, 3.9], [12, 1.8, -.1, 5.2, 3.5, 3.4],
    [-14.5, 3.6, -.4, 2.7, 2.2, 2.4], [-5.7, 9.0, -.8, 2.6, 2.8, 2.4], [.2, 8.2, -.6, 2.4, 2.7, 2.2], [8.2, 6.0, -.2, 3.0, 2.4, 2.6], [17.9, 1.1, .2, 3.0, 2.3, 2.4],
  ];
  const smallBillows: CloudBillow[] = [[-6, 0, 0, 5.5, 1.6, 2.4], [0, .6, .2, 5, 2.0, 2.4], [6, .1, 0, 4.6, 1.5, 2.2], [-2, 2.0, -.2, 3.2, 1.8, 2], [3, 1.8, 0, 3, 1.6, 2]];
  for (const [billows, x, y, z, s] of [[leftBillows, -44, 23, -82, 1], [rightBillows, 37, 20, -84, 1], [smallBillows, 15, 33, -96, .9], [smallBillows, -20, 33, -100, .7], [smallBillows, 62, 30, -98, .8]] as Array<[CloudBillow[], number, number, number, number]>) {
    const c = mesh(cloudBankGeometry(billows), billowMaterial, x, y, z, clouds); c.scale.setScalar(s); c.castShadow = false; c.receiveShadow = false;
  }
  // Thin moonlit wisps: soft-edged noise ribbons rather than balloon lobes.
  const wispMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, fog: false, uniforms: cloudUniforms,
    vertexShader: 'varying vec2 vUv; varying vec3 vWorld; void main(){ vUv = uv; vWorld = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0); }',
    fragmentShader: `${KP_NOISE}
      uniform vec3 uMoonPos; varying vec2 vUv; varying vec3 vWorld;
      void main(){
        float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x) * smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
        float n = bwFbm5(vec3(vUv * vec2(6.0, 2.0), vWorld.x * 0.01));
        float a = smoothstep(0.0, 0.35, n + edge * 0.6 - 0.45) * edge;
        float lit = smoothstep(0.3, 1.0, vUv.y + n * 0.3) * (0.6 + 0.4 * exp(-distance(vWorld, uMoonPos) * 0.02));
        gl_FragColor = vec4(mix(vec3(0.2, 0.3, 0.5), vec3(0.8, 0.84, 0.92), lit), a * 0.85);
      }`,
  });
  for (const [x, y, z, w, h] of [[-21, 16, -90, 26, 4], [4, 29, -96, 22, 3], [65, 15, -98, 24, 4], [26, 31, -95, 16, 2.5], [-36, 33, -99, 18, 3]]) {
    const wisp = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wispMaterial); wisp.position.set(x, y, z); clouds.add(wisp);
  }

  // Slow fireflies over the paddies: independent drift and breathing glow, never synchronised.
  const flyCount = 46, flyPositions: number[] = [], flyData: number[] = [];
  for (let i = 0; i < flyCount; i++) {
    const z = 6 - random() * 30, side = random() > .5 ? 1 : -1;
    flyPositions.push(pathX(z) + side * (pathWidth(z) + .6 + random() * 9), .7 + random() * 1.6, z);
    flyData.push(random() * 6.28, .5 + random() * .7, .14 + random() * .1);
  }
  const flyGeo = new THREE.BufferGeometry();
  flyGeo.setAttribute('position', new THREE.Float32BufferAttribute(flyPositions, 3));
  flyGeo.setAttribute('fly', new THREE.Float32BufferAttribute(flyData, 3));
  const flyMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uRuralTime: time, uScale: { value: 600 } },
    vertexShader: `attribute vec3 fly; uniform float uRuralTime; uniform float uScale; varying float vGlow;
      void main(){
        vec3 p = position;
        float t = uRuralTime * fly.z + fly.x;
        p += vec3(sin(t * 1.3) * 0.6 + sin(t * 0.47) * 0.9, sin(t * 0.9) * 0.25, cos(t * 1.1) * 0.5);
        vGlow = smoothstep(0.1, 1.0, sin(uRuralTime * fly.y * 0.6 + fly.x * 3.0) * 0.5 + 0.5);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        // ~0.16 m glow at any resolution: uScale is the viewport's focal length in pixels.
        gl_PointSize = uScale * 0.16 / max(-mv.z, 0.5);
      }`,
    fragmentShader: `varying float vGlow; void main(){ vec2 c = gl_PointCoord - 0.5; float a = exp(-dot(c, c) * 30.0); gl_FragColor = vec4(vec3(2.6, 3.0, 1.1) * a * vGlow, 1.0); }`,
  });
  const fireflies = new THREE.Points(flyGeo, flyMat); fireflies.frustumCulled = false; scene.add(fireflies);

  // Static parts merge per material inside their own groups, which still move
  // (portrait recomposition, cloud drift). Draw calls drop by several hundred.
  for (const group of [house, pole, forest, clouds]) bakeStatic(group, group);

  // Nearby rice is the only interaction target. Invisible raycast bounds are
  // intersected analytically and then checked against the actual paddy footprint.
  const raycaster = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -.58), hit = new THREE.Vector3();
  let touchEnergy = 0;
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    const portrait = aspect < .85;
    camera.fov = portrait ? 61 : 55;
    camera.position.set(portrait ? .1 : 0, 1.56, 10.4);
    camera.lookAt(portrait ? 1.1 : .45, portrait ? 4.3 : 3.6, -31);
    camera.updateProjectionMatrix();
    house.position.x = portrait ? 4.1 : 6.4;
    pole.position.x = portrait ? 3.1 : 7.2;
    moon.position.x = portrait ? -8.5 : -12;
    moon.position.y = portrait ? 35 : 39;
    moon.lookAt(camera.position);
    moonWorld.copy(moon.position); cloudUniforms.uMoonPos.value.copy(moon.position);
    (sky.material as THREE.ShaderMaterial).uniforms.uMoon.value.copy(moon.position).sub(camera.position).normalize();
    const height = renderer?.domElement.height || 800;
    flyMat.uniforms.uScale.value = height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
  };
  resize(1);
  return {
    scene, camera, resize,
    post: { exposure: 1.18, bloomStrength: .15, bloomThreshold: 0, aoStrength: .55, aoRadius: .5, saturation: 1.12, contrast: 1.05, shadowTint: [.92, .97, 1.08], highlightTint: [1.06, 1.02, .94], vignette: .35, grain: .012 },
    update(t, dt) { time.value = t; clouds.position.x = Math.sin(t * .018) * .55; touchEnergy *= Math.exp(-dt * 2.5); touch.value.z = touchEnergy; },
    interact(ndc) {
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return null;
      if (hit.z > 10 || hit.z < -7 || Math.abs(hit.x) > 13 || Math.abs(hit.x - pathX(hit.z)) < pathWidth(hit.z) + .28) return null;
      touchEnergy = .65; touch.value.set(hit.x, hit.z, touchEnergy);
      return { scene: 'nature:rural_summer_night', type: 'grass', strength: .28, position: [hit.x, .58, hit.z] };
    },
    dispose() { ramp.dispose(); glow.dispose(); moonTexture.dispose(); riceMeshes.forEach(m => m.dispose()); },
  };
}

function seeded(seed:number){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function makeGeometry(position:number[],color:number[],index:number[]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(position,3));g.setAttribute('color',new THREE.Float32BufferAttribute(color,3));g.setIndex(index);g.computeVertexNormals();return g;}

class GeometryBuilder {
  positions:number[]=[]; colors:number[]=[]; indices:number[]=[];
  vertex(p:number[],c:THREE.Color){const n=this.positions.length/3;this.positions.push(...p);this.colors.push(c.r,c.g,c.b);return n;}
  triangle(a:number[],b:number[],c:number[],color:THREE.Color){const n=this.vertex(a,color);this.vertex(b,color);this.vertex(c,color);this.indices.push(n,n+1,n+2);}
  quad(a:number[],b:number[],c:number[],d:number[],color:THREE.Color){const n=this.vertex(a,color);this.vertex(b,color);this.vertex(c,color);this.vertex(d,color);this.indices.push(n,n+1,n+2,n,n+2,n+3);}
  groundPatch(x:number,z:number,y:number,sx:number,sz:number,color:THREE.Color,random:()=>number){const center=this.vertex([x,y,z],color);const points:number[]=[];for(let i=0;i<6;i++){const a=i/6*Math.PI*2;points.push(this.vertex([x+Math.cos(a)*sx*(.7+random()*.3),y,z+Math.sin(a)*sz*(.7+random()*.3)],color));}for(let i=0;i<6;i++)this.indices.push(center,points[(i+1)%6],points[i]);}
  taperedStem(a:THREE.Vector3,b:THREE.Vector3,r:number,c:THREE.Color,sides:number){const axis=b.clone().sub(a).normalize(),u=new THREE.Vector3(0,0,1).cross(axis).normalize();if(u.lengthSq()<.1)u.set(1,0,0);const v=axis.clone().cross(u);for(let i=0;i<sides;i++){const t=i/sides*Math.PI*2,t1=(i+1)/sides*Math.PI*2;const pa=a.clone().addScaledVector(u,Math.cos(t)*r).addScaledVector(v,Math.sin(t)*r),pb=a.clone().addScaledVector(u,Math.cos(t1)*r).addScaledVector(v,Math.sin(t1)*r),pc=b.clone().addScaledVector(u,Math.cos(t1)*r*.45).addScaledVector(v,Math.sin(t1)*r*.45),pd=b.clone().addScaledVector(u,Math.cos(t)*r*.45).addScaledVector(v,Math.sin(t)*r*.45);this.quad(pa.toArray(),pb.toArray(),pc.toArray(),pd.toArray(),c);}}
  geometry(){return makeGeometry(this.positions,this.colors,this.indices);}
}

function riceClump(random:()=>number,blades:number,segments:number,stalks:number){
  const g=new GeometryBuilder();
  for(let blade=0;blade<blades;blade++){
    const angle=blade*2.399+random()*.4,h=.69+random()*.74,lean=.44+random()*.37,width=.028+random()*.02;
    const cos=Math.cos(angle),sin=Math.sin(angle),base=g.positions.length/3;
    for(let j=0;j<=segments;j++){
      const t=j/segments,rad=lean*t*t,y=h*(t-.18*t*t*t),w=width*Math.sin(Math.PI*Math.pow(t,.7));
      for(const side of [-1,0,1]){
        // Colour carries the blade height (tips lighter) so the shader can light the tips.
        const c=new THREE.Color('#1f5a3a').lerp(new THREE.Color('#5c9c5a'),Math.pow(t,2.2)*.85);if(side===0)c.multiplyScalar(1.1);
        g.vertex([cos*rad-sin*w*side,y+(side===0?.009:0),sin*rad+cos*w*side],c);
      }
      if(j<segments)for(let s=0;s<2;s++){const n=base+j*3+s;g.indices.push(n,n+3,n+1,n+1,n+3,n+4);}
    }
  }
  for(let stalk=0;stalk<stalks;stalk++){
    const a=stalk*2.5+.4,h=.87+random()*.37,ca=Math.cos(a),sa=Math.sin(a);
    const pts=[new THREE.Vector3(0,0,0),new THREE.Vector3(ca*.04,h*.64,sa*.04),new THREE.Vector3(ca*.13,h,sa*.13),new THREE.Vector3(ca*.34,h-.14,sa*.34)];
    for(let i=0;i<3;i++)g.taperedStem(pts[i],pts[i+1],.008,new THREE.Color('#4f8a5e'),3);
    for(let k=0;k<7;k++){
      const t=k/7,x=ca*(.14+t*.19),z=sa*(.14+t*.19),y=h-.13*t*t;
      const off=k%2?-.02:.02;
      const c=new THREE.Color(k%3?'#86ad74':'#b4bd82');
      g.quad([x+sa*off-.011,y,z-ca*off],[x+sa*off,y+.035,z-ca*off+.008],[x+sa*off+.013,y,z-ca*off],[x+sa*off,y-.032,z-ca*off-.008],c);
    }
  }
  return g.geometry();
}
function weedClump(random:()=>number){
  const g=new GeometryBuilder();
  for(let branch=0;branch<7;branch++){
    const a=branch*2.4,h=.45+random()*.5;
    for(let leaf=0;leaf<4;leaf++){
      const t=.25+leaf*.19,c=new THREE.Color('#2a6236').lerp(new THREE.Color('#6aa35c'),random()*.6);
      const base=new THREE.Vector3(Math.cos(a)*h*.3*t,h*.45*t,Math.sin(a)*h*.3*t);
      const direction=a+(leaf%2?1.0:-1.0),len=.17+random()*.16;
      const tip=base.clone().add(new THREE.Vector3(Math.cos(direction)*len,len*.22,Math.sin(direction)*len));
      const center=base.clone().lerp(tip,.52).add(new THREE.Vector3(0,.035,0));
      const axis=tip.clone().sub(base),cross=new THREE.Vector3(-Math.sin(direction),0,Math.cos(direction)).multiplyScalar(len*.26);
      const top=g.vertex(center.toArray(),c.clone().multiplyScalar(1.08));
      const ring:number[]=[];
      for(let k=0;k<8;k++){
        const u=k/8*Math.PI*2;
        ring.push(g.vertex(base.clone().lerp(tip,(Math.cos(u)+1)*.5).addScaledVector(cross,Math.sin(u)).toArray(),c));
      }
      for(let k=0;k<8;k++)g.indices.push(top,ring[k],ring[(k+1)%8]);
    }
  }
  return g.geometry();
}

// Each crown is a volume of hundreds of small leaf contours, not a low-poly ball.
// Fine, overlapping scalloped edges remain organic when instanced at forest depth.
function foliageGeometry(random:()=>number){
  const g=new GeometryBuilder();
  for(let i=0;i<72;i++){
    const a=i*2.399963,y=1-2*(i+.5)/72,r=Math.sqrt(Math.max(0,1-y*y));
    const radial=.74+random()*.32;
    const center=new THREE.Vector3(Math.cos(a)*r*radial,y*radial,Math.sin(a)*r*radial);
    center.x+=.09*Math.sin(center.y*13+center.z*8);center.y+=.09*Math.cos(center.x*11);
    const normal=center.clone().normalize().add(new THREE.Vector3(0,0,.5)).normalize();
    const axis=new THREE.Vector3(0,1,0).cross(normal).normalize();if(axis.lengthSq()<.1)axis.set(1,0,0);
    const other=normal.clone().cross(axis).normalize();
    const size=.24+random()*.16;
    const color=new THREE.Color().setScalar(.68+(center.y+1)*.12+random()*.12);
    const top=g.vertex(center.clone().addScaledVector(normal,.026).toArray(),color.clone().multiplyScalar(1.06));
    const ring:number[]=[];
    for(let k=0;k<10;k++){
      const ang=k/10*Math.PI*2,edge=1+.13*Math.sin(k*2.6+i);
      const p=center.clone().addScaledVector(axis,Math.cos(ang)*size*edge).addScaledVector(other,Math.sin(ang)*size*.72*edge);
      ring.push(g.vertex(p.toArray(),color));
    }
    for(let k=0;k<10;k++)g.indices.push(top,ring[k],ring[(k+1)%10]);
  }
  return g.geometry();
}
function cedarGeometry(random:()=>number,height:number){
  const g=new GeometryBuilder();
  g.taperedStem(new THREE.Vector3(0,0,0),new THREE.Vector3(.1,height,0),.12,new THREE.Color('#435f63'),5);
  for(let tier=0;tier<22;tier++){
    const y=height*.22+tier/22*height*.76,reach=(height-y)*.19;
    for(let branch=0;branch<9;branch++){
      const a=branch*2.4+tier*.64,r=reach*(.68+random()*.45),lift=.25+random()*.38;
      const tip=new THREE.Vector3(Math.cos(a)*r,y+lift,Math.sin(a)*r);
      const base=new THREE.Vector3(0,y-.12,0),c=new THREE.Color('#8caaa9').multiplyScalar(.64+random()*.26);
      g.taperedStem(base,tip,.018,c,3);
      for(let twig=1;twig<=4;twig++){
        const t=twig/4,center=base.clone().lerp(tip,t),width=(.32+random()*.13)*(1-t*.48);
        for(const side of [-1,1]){
          const p=center.clone().add(new THREE.Vector3(Math.cos(a+side*.93)*width,.11+random()*.18,Math.sin(a+side*.93)*width));
          const back=center.clone().add(new THREE.Vector3(-Math.cos(a)*.18,-.13,-Math.sin(a)*.18));
          g.triangle(back.toArray(),p.toArray(),tip.clone().lerp(center,.6).add(new THREE.Vector3(0,.22,0)).toArray(),c);
        }
      }
    }
  }
  return g.geometry();
}
type CloudBillow = [x:number,y:number,z:number,sx:number,sy:number,sz:number];

// A smooth union keeps each bank one continuous 3D surface instead of a string
// of overlapping transparent spheres. The unequal shoulders and small billows
// are intentionally different in the two masses. This is generated once; cloud
// animation still only moves their shared parent by the original quiet amount.
function cloudBankGeometry(billows:CloudBillow[]){
  const nx=68,ny=34,nz=20,minX=-24,minY=-6,minZ=-7,dx=48/nx,dy=23/ny,dz=14/nz;
  const field=(x:number,y:number,z:number)=>{
    let distance=100;
    for(const [cx,cy,cz,sx,sy,sz] of billows){
      const d=(Math.hypot((x-cx)/sx,(y-cy)/sy,(z-cz)/sz)-1)*Math.min(sx,sy,sz);
      const blend=Math.max(0,1-Math.abs(distance-d)/.82);
      distance=Math.min(distance,d)-blend*blend*.82*.25;
    }
    // Low-amplitude unevenness breaks polished balloon contours without pointed
    // noise, repeated scallops or high-contrast surface speckles.
    return distance+.16*Math.sin(x*1.27+y*.61)*Math.sin(y*1.49-z*.93)+.065*Math.sin(x*2.71+z*1.83)*Math.cos(y*2.36);
  };
  const width=nx+1,height=ny+1,count=width*height*(nz+1);
  const samples=new Float32Array(count);
  const index=(x:number,y:number,z:number)=>(z*height+y)*width+x;
  for(let z=0;z<=nz;z++)for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++)samples[index(x,y,z)]=field(minX+x*dx,minY+y*dy,minZ+z*dz);
  const positions:number[]=[],normals:number[]=[],indices:number[]=[],vertices=new Map<number,number>();
  const point=(i:number)=>[minX+(i%width)*dx,minY+(Math.floor(i/width)%height)*dy,minZ+Math.floor(i/(width*height))*dz];
  const edge=(ia:number,ib:number)=>{
    const a=Math.min(ia,ib),b=Math.max(ia,ib),key=a*count+b,cached=vertices.get(key);
    if(cached!==undefined)return cached;
    const pa=point(a),pb=point(b),t=samples[a]/(samples[a]-samples[b]);
    const x=pa[0]+(pb[0]-pa[0])*t,y=pa[1]+(pb[1]-pa[1])*t,z=pa[2]+(pb[2]-pa[2])*t,e=.045;
    const normal=new THREE.Vector3(field(x+e,y,z)-field(x-e,y,z),field(x,y+e,z)-field(x,y-e,z),field(x,y,z+e)-field(x,y,z-e)).normalize();
    const result=positions.length/3;positions.push(x,y,z);normals.push(normal.x,normal.y,normal.z);vertices.set(key,result);return result;
  };
  const triangle=(a:number,b:number,c:number)=>{
    const ax=positions[b*3]-positions[a*3],ay=positions[b*3+1]-positions[a*3+1],az=positions[b*3+2]-positions[a*3+2];
    const bx=positions[c*3]-positions[a*3],by=positions[c*3+1]-positions[a*3+1],bz=positions[c*3+2]-positions[a*3+2];
    const outward=(ay*bz-az*by)*normals[a*3]+(az*bx-ax*bz)*normals[a*3+1]+(ax*by-ay*bx)*normals[a*3+2];
    if(outward<0)indices.push(a,c,b);else indices.push(a,b,c);
  };
  const tetrahedra=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
  for(let z=0;z<nz;z++)for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
    const corners=[index(x,y,z),index(x+1,y,z),index(x+1,y+1,z),index(x,y+1,z),index(x,y,z+1),index(x+1,y,z+1),index(x+1,y+1,z+1),index(x,y+1,z+1)];
    if(corners.every(i=>samples[i]>=0)||corners.every(i=>samples[i]<0))continue;
    for(const tetra of tetrahedra){
      const inside=tetra.map(i=>corners[i]).filter(i=>samples[i]<0),outside=tetra.map(i=>corners[i]).filter(i=>samples[i]>=0);
      if(inside.length===1)triangle(edge(inside[0],outside[0]),edge(inside[0],outside[1]),edge(inside[0],outside[2]));
      else if(inside.length===3)triangle(edge(outside[0],inside[0]),edge(outside[0],inside[1]),edge(outside[0],inside[2]));
      else if(inside.length===2){const a=edge(inside[0],outside[0]),b=edge(inside[0],outside[1]),c=edge(inside[1],outside[0]),d=edge(inside[1],outside[1]);triangle(a,b,c);triangle(b,d,c);}
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setIndex(indices);return geometry;
}

function roof(parent:THREE.Object3D,cx:number,y:number,cz:number,width:number,depth:number,rise:number,mat:THREE.Material,trim:THREE.Material,
  mesh:(g:THREE.BufferGeometry,m:THREE.Material,x?:number,y?:number,z?:number,p?:THREE.Object3D)=>THREE.Mesh,
  curve:(p:THREE.Vector3[],r:number,m:THREE.Material,parent?:THREE.Object3D,segments?:number)=>THREE.Mesh){
  const g=new GeometryBuilder(),color=new THREE.Color('#ffffff');
  for(const side of [-1,1]){
    g.quad([cx,y+rise,cz-depth/2],[cx+side*width/2,y,cz-depth/2],[cx+side*width/2,y,cz+depth/2],[cx,y+rise,cz+depth/2],color);
    for(let z=-depth/2;z<=depth/2;z+=.19){curve([new THREE.Vector3(cx,y+rise+.025,cz+z),new THREE.Vector3(cx+side*width*.24,y+rise*.51,cz+z),new THREE.Vector3(cx+side*width*.5,y+.035,cz+z)],.034,trim,parent,7);}
    curve([new THREE.Vector3(cx+side*width*.5,y+.04,cz-depth/2),new THREE.Vector3(cx+side*width*.5,y+.015,cz),new THREE.Vector3(cx+side*width*.5,y+.04,cz+depth/2)],.068,trim,parent,9);
    for(const front of [-1,1])curve([new THREE.Vector3(cx,y+rise,cz+front*depth/2),new THREE.Vector3(cx+side*width*.23,y+rise*.5,cz+front*depth/2),new THREE.Vector3(cx+side*width*.5,y,cz+front*depth/2)],.095,trim,parent,9);
  }
  const roofMat=mat.clone();if('side'in roofMat)roofMat.side=THREE.DoubleSide;
  mesh(g.geometry(),roofMat,0,0,0,parent);
  curve([new THREE.Vector3(cx,y+rise+.08,cz-depth/2-.12),new THREE.Vector3(cx,y+rise+.09,cz),new THREE.Vector3(cx,y+rise+.08,cz+depth/2+.12)],.11,trim,parent,10);
}
function makeGlowTexture(){const size=64,data=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const d=Math.hypot((x-size/2)/(size/2),(y-size/2)/(size/2)),a=Math.max(0,1-d);const i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=255;data[i+3]=Math.round(a*a*a*255);}const t=new THREE.DataTexture(data,size,size);t.needsUpdate=true;return t;}
function makeMoonTexture(){
  const size=256,data=new Uint8Array(size*size*4),r=seeded(2905);
  const spots=Array.from({length:86},(_,i)=>({x:(r()-.5)*1.7,y:(r()-.5)*1.7,s:i<12?.1+r()*.17:.016+r()*.068,v:i<12?.035+r()*.07:.025+r()*.07}));
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const px=(x-size/2)/(size/2),py=(y-size/2)/(size/2),dist=Math.hypot(px,py),i=(y*size+x)*4;
    let shade=.97;
    for(const c of spots){const d=Math.hypot(px-c.x,py-c.y)/c.s;if(d<1)shade-=c.v*Math.pow(1-d,.7);else if(d<1.06)shade+=.008;}
    shade+=Math.sin(px*121+py*62)*Math.cos(py*103)*.005;
    data[i]=Math.min(255,255*shade);data[i+1]=Math.min(255,241*shade);data[i+2]=Math.min(255,196*shade);data[i+3]=dist<.98?255:Math.max(0,(1-dist)*50*255);
  }
  const t=new THREE.DataTexture(data,size,size);t.colorSpace=THREE.SRGBColorSpace;t.needsUpdate=true;return t;
}
