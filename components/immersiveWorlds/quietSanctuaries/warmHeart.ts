import * as THREE from 'three';
import type { SanctuaryBuilder } from './worldTypes';

/* Original procedural geometry and textile textures. No external assets or borrowed demo code. */
const point = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
function random(seed: number) {
  let s = seed >>> 0;
  return () => { s = (1664525 * s + 1013904223) >>> 0; return s / 4294967296; };
}
function surface(nu: number, nv: number, at: (u: number, v: number) => THREE.Vector3) {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
    const p = at(i / nu, j / nv);
    positions.push(p.x, p.y, p.z); uvs.push(i / nu, j / nv);
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + nu + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); g.setIndex(indices);
  g.computeVertexNormals(); return g;
}
function textileMaps() {
  const size = 256, col = new Uint8Array(size * size * 4), normal = new Uint8Array(size * size * 4);
  const rand = random(4213);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const thread = Math.sin(x * .62 + Math.sin(y * .098) * .45) * .035 + Math.sin(y * .78 + Math.sin(x * .078) * .4) * .025;
    const slub = Math.sin(x * .035 + y * .019) * .035 + (rand() - .5) * .032;
    const v = Math.round((.86 + thread + slub) * 255);
    col[i] = v; col[i + 1] = Math.round(v * .964); col[i + 2] = Math.round(v * .899); col[i + 3] = 255;
    normal[i] = 128 + Math.round(Math.cos(x * .62 + Math.sin(y * .098) * .45) * 34);
    normal[i + 1] = 128 + Math.round(Math.cos(y * .78 + Math.sin(x * .078) * .4) * 28);
    normal[i + 2] = 248; normal[i + 3] = 255;
  }
  const map = new THREE.DataTexture(col, size, size, THREE.RGBAFormat);
  const normalMap = new THREE.DataTexture(normal, size, size, THREE.RGBAFormat);
  for (const tex of [map, normalMap]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(5, 7);
    tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true; tex.needsUpdate = true;
  }
  map.colorSpace = THREE.SRGBColorSpace;
  return { map, normalMap };
}

export const buildWarmHeart: SanctuaryBuilder = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#bd8865');
  scene.fog = new THREE.FogExp2('#b77b54', .025);
  const camera = new THREE.PerspectiveCamera(49, 1, .08, 80);
  const habitat = new THREE.Group(); scene.add(habitat);
  const { map, normalMap } = textileMaps();
  const uniforms = { time: { value: -100 }, touch: { value: point(0, 2, -6) }, pulse: { value: 0 } };
  const silk = new THREE.MeshPhysicalMaterial({
    color: '#f3d6ad', map, normalMap, normalScale: new THREE.Vector2(.2, .2),
    roughness: .83, metalness: 0, sheen: .7, sheenColor: new THREE.Color('#ffe2ba'),
    sheenRoughness: .7, side: THREE.DoubleSide,
  });
  silk.onBeforeCompile = (shader) => {
    shader.uniforms.uWarmthAge = uniforms.time; shader.uniforms.uWarmthPoint = uniforms.touch;
    shader.uniforms.uWarmthPulse = uniforms.pulse;
    shader.vertexShader = 'varying vec3 vCocoonPosition;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvCocoonPosition=(modelMatrix*vec4(transformed,1.0)).xyz;');
    shader.fragmentShader = 'varying vec3 vCocoonPosition; uniform float uWarmthAge; uniform vec3 uWarmthPoint; uniform float uWarmthPulse;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      float distanceToTouch=distance(vCocoonPosition,uWarmthPoint);
      float waveRadius=max(uWarmthAge,0.0)*0.68;
      float wave=exp(-pow((distanceToTouch-waveRadius)/0.7,2.0))*exp(-max(uWarmthAge,0.0)*0.27)*step(0.0,uWarmthAge);
      totalEmissiveRadiance+=vec3(0.32,0.16,0.045)*wave+vec3(0.013,0.006,0.002)*uWarmthPulse;
    `);
  };
  silk.customProgramCacheKey = () => 'warm-heart-silk-touch-v1';
  const blush = new THREE.MeshPhysicalMaterial({ color: '#c79780', map, normalMap, normalScale: new THREE.Vector2(.23, .2), roughness: .91, sheen: .55, sheenColor: new THREE.Color('#f0c8b0'), side: THREE.DoubleSide });
  const velvet = new THREE.MeshPhysicalMaterial({ color: '#e4c09d', map, normalMap, normalScale: new THREE.Vector2(.38, .32), roughness: .98, sheen: .85, sheenColor: new THREE.Color('#fff0d1'), side: THREE.DoubleSide });
  const fiber = new THREE.MeshStandardMaterial({ color: '#e8c59c', map, normalMap, normalScale: new THREE.Vector2(.16, .16), roughness: .89 });
  const fineFiber = new THREE.MeshStandardMaterial({ color: '#b8865f', roughness: .95 });
  const litFiber = new THREE.MeshStandardMaterial({ color: '#ffdda8', roughness: .76, emissive: '#d59950', emissiveIntensity: .16 });
  for (const material of [blush, velvet, fiber]) {
    material.onBeforeCompile = silk.onBeforeCompile;
    material.customProgramCacheKey = () => 'warm-heart-silk-touch-v1';
  }
  const veils: THREE.Mesh[] = [];
  const targets: THREE.Object3D[] = [];
  function add(geometry: THREE.BufferGeometry, material: THREE.Material, cast = false) {
    const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = cast; mesh.receiveShadow = true;
    habitat.add(mesh); return mesh;
  }
  function tube(points: THREE.Vector3[], radius: number, material: THREE.Material, segments = 72) {
    return add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 7, false), material, radius > .035);
  }
  // The viewer is inside a continuous, irregular fabric vault, rather than looking at an object on a pedestal.
  function vault(theta: number, z: number, inset = 0) {
    const bend = Math.sin(z * .22) * .24;
    const rear = Math.max(0, (-z - 5) / 7);
    const width = 4.65 - rear * 1.9 - inset;
    const roof = 4.05 - rear * .3 - inset * .55;
    const flutter = .11 * Math.sin(theta * 8 + z * .6) + .035 * Math.sin(theta * 21 - z * 1.2);
    return point(Math.cos(theta) * (width + flutter) + bend, .08 + Math.sin(theta) * (roof + flutter), z);
  }
  const vaultMesh = add(surface(112, 136, (u, v) => vault(-.055 + u * (Math.PI + .11), 6 - v * 18)), silk);
  targets.push(vaultMesh);
  // Raised seams follow curved, converging paths along the membrane; adjacent strands are never a repeated grid.
  for (let j = 0; j < 17; j++) {
    const baseTheta = .065 + j / 16 * (Math.PI - .13);
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 36; k++) {
      const z = 5.9 - k / 36 * 17.65;
      const th = baseTheta + .04 * Math.sin(z * .65 + j * .9) + .085 * Math.sin(z * .18 + j * .4);
      pts.push(vault(th, z, .025));
    }
    tube(pts, .022 + .008 * (1 + Math.sin(j * 4)), j % 4 === 0 ? litFiber : fiber, 110);
  }
  // Structural ribs cross the vault like pliant plant fibers; an asymmetrical opening holds the light.
  for (let j = 0; j < 7; j++) {
    const z = 4.9 - j * 2.32;
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 48; k++) {
      const th = k / 48 * Math.PI;
      pts.push(vault(th, z + .55 * Math.sin(th + j * .8) + .12 * Math.sin(th * 4), .09));
    }
    const rib = tube(pts, .055 + (j % 3) * .008, fiber, 100);
    targets.push(rib);
    // Smaller wrapped fibers run along each load bearing seam, with visible strand variation nearby.
    for (let strand = 0; strand < 2; strand++) {
      const woven = pts.map((p, i) => p.clone().add(point(.055 * Math.sin(i * 1.33 + strand * Math.PI), .04 * Math.cos(i * 1.33 + strand * Math.PI), .028 * Math.sin(i * .8))));
      tube(woven, .0075, fineFiber, 130);
    }
  }
  // Open layered petals form an offset far chamber, giving a softly illuminated depth destination.
  for (let layer = 0; layer < 5; layer++) {
    const z = -7.5 - layer * .74;
    const angle = -.17 + layer * .085;
    const petal = add(surface(78, 34, (u, v) => {
      const th = -.25 + u * (Math.PI + .5);
      const outer = 3.75 - layer * .37, inner = outer - .62;
      const r = inner + v * (outer - inner);
      const tip = .14 * Math.sin(th * 3 + layer * .7) + .055 * Math.sin(th * 9);
      return point(Math.cos(th) * (r + tip) + .24 + angle, .18 + Math.sin(th) * (r * 1.18 + tip), z + .54 * Math.sin(v * Math.PI) + .28 * Math.cos(th));
    }), layer % 2 === 0 ? silk : blush, true);
    targets.push(petal);
  }
  const backWall = add(surface(64, 64, (u, v) => {
    const x = (u - .5) * 7.6, y = v * 6 - .1;
    return point(x, y, -12.2 - .6 * Math.cos(x * .5) * Math.sin(v * Math.PI));
  }), silk);
  targets.push(backWall);
  // Suspended translucent panels are separate folds with real overlapping edges and parallax.
  const veilMaterial = new THREE.MeshPhysicalMaterial({
    color: '#f6d9b0', map, normalMap, normalScale: new THREE.Vector2(.09, .1),
    roughness: .9, sheen: .65, sheenColor: new THREE.Color('#fff2d5'), sheenRoughness: .82,
    transparent: true, opacity: .62, side: THREE.DoubleSide, depthWrite: false,
  });
  for (let side = 0; side < 3; side++) {
    const left = side !== 1;
    const veil = add(surface(52, 66, (u, v) => {
      const z = -2.3 - side * 1.6 - u * 3.1;
      const x = (left ? -1 : 1) * (2.65 + .52 * Math.sin(v * Math.PI) + u * .36) + .09 * Math.sin(v * 18 + u * 8);
      const y = .3 + v * (3.15 - u * .4) + .12 * Math.sin(u * 8 + v * 4);
      return point(x, y, z + .16 * Math.sin(v * 15 + u * 5));
    }), veilMaterial);
    veils.push(veil);
  }
  // The continuous sloping floor and banked fabric fill the foreground in both aspect ratios.
  const floor = add(surface(96, 112, (u, v) => {
    const x = (u - .5) * 10, z = 6.5 - v * 19;
    return point(x, -.1 + .08 * Math.sin(z * .55 + x * .35) + .095 * Math.cos(x * 1.2) + .027 * Math.sin(x * 8 + z * 2.2) + Math.pow(Math.abs(x) / 5, 3) * .85, z);
  }), blush);
  targets.push(floor);
  for (let side = 0; side < 2; side++) {
    const fold = add(surface(108, 82, (u, v) => {
      const sign = side === 0 ? -1 : 1;
      const x = sign * (.58 + u * 4.2), z = 5.4 - v * 7.2 + side * .55;
      const mound = Math.sin(u * Math.PI) ** .65;
      const y = .04 + mound * (.42 + .26 * Math.sin(v * 3.8 + side)) + .17 * Math.sin(u * 16 + v * 3.5) * Math.sin(u * Math.PI) + .05 * Math.sin(v * 17 + u * 5);
      return point(x, y, z);
    }), velvet, true);
    targets.push(fold);
  }
  // Soft folded lip close to the hand: a deliberately irregular fabric edge, not a generic cushion primitive.
  const frontFold = add(surface(126, 38, (u, v) => {
    const x = (u - .5) * 6.8;
    return point(x, .11 + Math.sin(v * Math.PI) * (.23 + .09 * Math.sin(u * 9)) + .035 * Math.sin(u * 44) * Math.sin(v * Math.PI), 1.65 + v * 1.45 + .18 * Math.sin(u * 7));
  }), velvet, true);
  targets.push(frontFold);
  // An irregular seam with microscopic paired fibers makes the near cloth read as tactile woven material.
  const hem: THREE.Vector3[] = [];
  for (let i = 0; i <= 80; i++) {
    const u = i / 80; hem.push(point((u - .5) * 6.8, .125, 1.65 + .18 * Math.sin(u * 7)));
  }
  tube(hem, .014, fiber, 140);
  const stitchGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([point(-.014, 0, -.035), point(0, .025, 0), point(.01, .01, .06)]), 5, .004, 5, false);
  const stitches = new THREE.InstancedMesh(stitchGeometry, fineFiber, 64);
  const stitchMatrix = new THREE.Matrix4();
  for (let i = 0; i < 64; i++) {
    const u = (i + .5) / 64, x = (u - .5) * 6.8, z = 1.65 + .18 * Math.sin(u * 7);
    stitches.setMatrixAt(i, stitchMatrix.makeTranslation(x, .12, z));
  }
  stitches.instanceMatrix.needsUpdate = true; habitat.add(stitches);
  const hemi = new THREE.HemisphereLight('#fff0d6', '#865849', 1.35); scene.add(hemi);
  const apertureLight = new THREE.PointLight('#ffcf83', 21, 18, 1.7); apertureLight.position.set(.2, 2.4, -10.0); scene.add(apertureLight);
  const warmKey = new THREE.SpotLight('#ffe7ba', 46, 21, .9, .9, 1.5);
  warmKey.position.set(-2.4, 3.3, -.3); warmKey.target.position.set(.3, .1, 2);
  warmKey.castShadow = true; warmKey.shadow.mapSize.set(1024, 1024); warmKey.shadow.bias = -.0002;
  warmKey.shadow.normalBias = .035; warmKey.shadow.radius = 4; scene.add(warmKey, warmKey.target);
  const blushFill = new THREE.PointLight('#ffd1c0', 9, 12, 1.9); blushFill.position.set(3.15, 1.5, -.1); scene.add(blushFill);
  const ceilingGlow = new THREE.PointLight('#ffdfaa', 11, 11, 1.8); ceilingGlow.position.set(-.8, 2.9, -5.8); scene.add(ceilingGlow);
  // Sparse tiny airborne fibers float through the illuminated chamber, with no attraction or flashing.
  const rand = random(983), dustBase: number[] = [];
  for (let i = 0; i < 64; i++) dustBase.push((rand() - .5) * 7, .3 + rand() * 3.4, 3 - rand() * 13);
  const dustGeometry = new THREE.BufferGeometry(); dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustBase, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: '#ffe7bc', size: .012, transparent: true, opacity: .29, depthWrite: false, sizeAttenuation: true }));
  habitat.add(dust);
  const raycaster = new THREE.Raycaster();
  let now = 0, touchAt = -100;
  function resize(aspect: number) {
    camera.aspect = aspect;
    if (aspect < .85) { camera.fov = 58; camera.position.set(.1, 1.19, 4.55); camera.lookAt(-.08, 1.55, -5.2); }
    else { camera.fov = aspect > 1.9 ? 46 : 49; camera.position.set(.1, 1.23, 4.5); camera.lookAt(-.14, 1.58, -4.9); }
    camera.updateProjectionMatrix();
  }
  resize(1);
  return {
    scene, camera, resize,
    update(elapsed) {
      now = elapsed;
      const breath = Math.sin(elapsed * .57) * .5 + .5;
      habitat.scale.set(1 + breath * .003, 1 + breath * .004, 1);
      uniforms.pulse.value = breath;
      uniforms.time.value = touchAt < 0 ? -100 : elapsed - touchAt;
      apertureLight.intensity = 21 + breath * 1.2;
      litFiber.emissiveIntensity = .14 + breath * .025;
      for (let i = 0; i < veils.length; i++) veils[i].rotation.z = Math.sin(elapsed * .23 + i * 1.4) * .002;
      const array = dustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 64; i++) {
        array[i * 3] = dustBase[i * 3] + Math.sin(elapsed * .047 + i * 1.73) * .055;
        array[i * 3 + 1] = dustBase[i * 3 + 1] + Math.sin(elapsed * .065 + i * .93) * .06;
      }
      dustGeometry.attributes.position.needsUpdate = true;
    },
    interact(ndc) {
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(targets, false)[0];
      if (!hit) return undefined;
      touchAt = now; uniforms.touch.value.copy(hit.point); uniforms.time.value = 0;
      return { kind: 'warmth', strength: .27, x: THREE.MathUtils.clamp(ndc.x, -1, 1) };
    },
  };
};
