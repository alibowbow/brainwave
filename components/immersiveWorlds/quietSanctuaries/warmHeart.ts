import * as THREE from 'three';
import type { SanctuaryBuilder } from './worldTypes';

/* Original procedural cocoon geometry and textile textures; no external assets or demo code. */
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
/** Two continuous faces and a closed, thin curled edge. No alpha cutout or floating edge tube. */
function membrane(nu: number, nv: number, at: (u: number, v: number) => THREE.Vector3) {
  const base = surface(nu, nv, at);
  const p = base.getAttribute('position'), n = base.getAttribute('normal'), uv = base.getAttribute('uv');
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let face = 0; face < 2; face++) for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i), v = uv.getY(i);
    const thickness = .010 + .016 * Math.sin(u * Math.PI) ** 2 + .004 * Math.sin(v * 11 + u * 5) ** 2;
    const direction = face === 0 ? 1 : -1;
    positions.push(p.getX(i) + n.getX(i) * thickness * direction, p.getY(i) + n.getY(i) * thickness * direction, p.getZ(i) + n.getZ(i) * thickness * direction);
    uvs.push(u, v);
  }
  const src = base.getIndex()!;
  for (let i = 0; i < src.count; i++) indices.push(src.getX(i));
  const faceCount = indices.length;
  for (let i = 0; i < src.count; i += 3) indices.push(src.getX(i) + p.count, src.getX(i + 2) + p.count, src.getX(i + 1) + p.count);
  const edgeStart = indices.length;
  const edge = (a: number, b: number) => { indices.push(a, a + p.count, b, b, a + p.count, b + p.count); };
  for (let i = 0; i < nu; i++) { edge(i + 1, i); edge(nv * (nu + 1) + i, nv * (nu + 1) + i + 1); }
  for (let j = 0; j < nv; j++) { edge(j * (nu + 1), (j + 1) * (nu + 1)); edge((j + 1) * (nu + 1) + nu, j * (nu + 1) + nu); }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geometry.setIndex(indices);
  geometry.addGroup(0, faceCount, 0); geometry.addGroup(faceCount, faceCount, 1); geometry.addGroup(edgeStart, indices.length - edgeStart, 2);
  geometry.computeVertexNormals(); base.dispose(); return geometry;
}
function textileMaps(woven: boolean) {
  const size = 512, col = new Uint8Array(size * size * 4), normal = new Uint8Array(size * size * 4);
  const rand = random(woven ? 9172 : 4213), heights = new Float32Array(size * size), strands = new Float32Array(size);
  for (let x = 0; x < size; x++) strands[x] = rand() - .5;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const warp = Math.round(3.7 * Math.sin(y * Math.PI * 2 / size) + 2.4 * Math.sin(y * Math.PI * 6 / size));
    const strand = strands[(x + warp + size) % size];
    const slub = Math.sin(x * Math.PI * 2 / size + Math.sin(y * Math.PI * 2 / size) * .8) * .009;
    // Foreground has a dense irregular crossed weave; membranes carry longitudinal fine fibrils.
    const cross = woven ? Math.sin(y * .81 + strands[(x + 151) % size] * 1.2) * .022 : 0;
    heights[y * size + x] = strand * (woven ? .065 : .046) + cross + slub + (rand() - .5) * .009;
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4, h = heights[y * size + x];
    const v = Math.round((.95 + h * .85) * 255);
    col[i] = v; col[i + 1] = Math.round(v * .985); col[i + 2] = Math.round(v * .963); col[i + 3] = 255;
    const dx = heights[y * size + (x + 1) % size] - heights[y * size + (x + size - 1) % size];
    const dy = heights[((y + 1) % size) * size + x] - heights[((y + size - 1) % size) * size + x];
    normal[i] = 128 + Math.round(dx * 380); normal[i + 1] = 128 + Math.round(dy * 280);
    normal[i + 2] = 255; normal[i + 3] = 255;
  }
  const map = new THREE.DataTexture(col, size, size, THREE.RGBAFormat);
  const normalMap = new THREE.DataTexture(normal, size, size, THREE.RGBAFormat);
  for (const tex of [map, normalMap]) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(woven ? 7 : 5, woven ? 9 : 8);
    tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true; tex.needsUpdate = true;
  }
  map.colorSpace = THREE.SRGBColorSpace;
  return { map, normalMap };
}

export const buildWarmHeart: SanctuaryBuilder = () => {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#a78373');
  scene.fog = new THREE.FogExp2('#b99a87', .014);
  const camera = new THREE.PerspectiveCamera(49, 1, .08, 80);
  const habitat = new THREE.Group(); scene.add(habitat);
  const membraneMaps = textileMaps(false), clothMaps = textileMaps(true);
  const uniforms = { time: { value: -100 }, touch: { value: point(0, 2, -6) }, pulse: { value: 0 } };
  function warmth(material: THREE.MeshPhysicalMaterial, thin = 0) {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uWarmthAge = uniforms.time; shader.uniforms.uWarmthPoint = uniforms.touch;
      shader.uniforms.uWarmthPulse = uniforms.pulse; shader.uniforms.uMembrane = { value: thin };
      shader.vertexShader = 'varying vec3 vCocoonPosition; varying vec2 vCocoonUv;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvCocoonPosition=(modelMatrix*vec4(transformed,1.0)).xyz; vCocoonUv=uv;');
      shader.fragmentShader = 'varying vec3 vCocoonPosition; varying vec2 vCocoonUv; uniform float uWarmthAge; uniform vec3 uWarmthPoint; uniform float uWarmthPulse; uniform float uMembrane;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float distanceToTouch=distance(vCocoonPosition,uWarmthPoint);
        float waveRadius=max(uWarmthAge,0.0)*0.68;
        float wave=exp(-pow((distanceToTouch-waveRadius)/0.7,2.0))*exp(-max(uWarmthAge,0.0)*0.27)*step(0.0,uWarmthAge);
        totalEmissiveRadiance+=vec3(0.32,0.16,0.045)*wave+vec3(0.010,0.005,0.002)*uWarmthPulse;
        // Restrained transmitted-light cues are local to thin folds, not a screen-wide color wash.
        float thinEdge=0.25+0.75*pow(abs(vCocoonUv.x*2.0-1.0),5.0);
        float amberPool=exp(-dot(vCocoonPosition-vec3(1.15,2.1,-7.2),vCocoonPosition-vec3(1.15,2.1,-7.2))*0.10);
        float rosePool=exp(-dot(vCocoonPosition-vec3(-2.4,2.1,-2.1),vCocoonPosition-vec3(-2.4,2.1,-2.1))*0.16);
        totalEmissiveRadiance+=uMembrane*thinEdge*(vec3(0.22,0.10,0.025)*amberPool+vec3(0.105,0.036,0.03)*rosePool);
      `);
    };
    material.customProgramCacheKey = () => `warm-heart-membrane-touch-v3-${thin}`;
    return material;
  }
  function silk(color: string, thin = 0) {
    return warmth(new THREE.MeshPhysicalMaterial({
      color, ...membraneMaps, normalScale: new THREE.Vector2(.34, .26), roughness: .90,
      sheen: .48, sheenColor: new THREE.Color('#ffe8d0'), sheenRoughness: .86, side: THREE.DoubleSide,
    }), thin);
  }
  const vaultMaterial = silk('#dccabb', .35);
  const innerIvory = silk('#f3decc', 1);
  const innerReverse = silk('#e1bfb1', .8);
  const innerEdge = silk('#f4dab4', 1.25);
  const roseIvory = silk('#dcb8aa', .85);
  const roseReverse = silk('#eed3bd', .8);
  const farMaterial = silk('#d3b4a0', .45);
  const floorMaterial = warmth(new THREE.MeshPhysicalMaterial({ color: '#c8a993', ...membraneMaps, normalScale: new THREE.Vector2(.3, .25), roughness: .98, sheen: .32, side: THREE.DoubleSide }));
  const clothMaterial = warmth(new THREE.MeshPhysicalMaterial({ color: '#ede0cd', ...clothMaps, normalScale: new THREE.Vector2(.62, .54), roughness: .96, sheen: .64, sheenColor: new THREE.Color('#fff1d8'), sheenRoughness: .87, side: THREE.DoubleSide }));
  const foldReverse = warmth(new THREE.MeshPhysicalMaterial({ color: '#d0b59e', ...clothMaps, normalScale: new THREE.Vector2(.55, .48), roughness: .98, sheen: .3, side: THREE.DoubleSide }));
  const seamMaterial = new THREE.MeshStandardMaterial({ color: '#bca58b', roughness: .97 });
  const targets: THREE.Object3D[] = [];
  function add(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], cast = false, touch = true) {
    const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = cast; mesh.receiveShadow = true;
    habitat.add(mesh); if (touch) targets.push(mesh); return mesh;
  }
  // The continuous outer enclosure has broad, organic folds. Surface relief replaces detached rods.
  function vault(theta: number, z: number) {
    const rear = Math.max(0, (-z - 3.5) / 9);
    const bow = .30 * Math.sin(z * .32 + theta * .6);
    const pleat = .024 * Math.sin(theta * 4.6 + z * .14) + .008 * Math.sin(theta * 9.3 - z * .27);
    return point(Math.cos(theta) * (4.55 - rear * 1.20 + bow + pleat) + Math.sin(z * .23) * .18,
      -.10 + Math.sin(theta) * (4.12 - rear * .40 + bow * .6 + pleat), z);
  }
  add(surface(144, 126, (u, v) => vault(-.04 + u * (Math.PI + .08), 5.5 - v * 19)), vaultMaterial);

  // Left membrane grows continuously from the floor, curves over the viewer and recedes into the rear.
  // Its open edge curls back into the surface with actual thickness, never an alpha-cut strip.
  const leftSheet = add(membrane(126, 114, (u, v) => {
    const z = 3.8 - v * 16.1;
    const start = .74 + .26 * Math.sin(v * 4.8 + .4) + .13 * Math.cos(v * 8);
    const theta = start + u * (Math.PI + .045 - start);
    const edgeCurl = Math.exp(-u * 19) * .20 * Math.sin(u * 30);
    const width = 4.36 - v * 1.74 + .21 * Math.sin(v * 5.4);
    const roof = 3.93 - v * .66 + .19 * Math.sin(v * 4.0 + .7);
    const ridge = .014 * Math.sin(theta * 5.2 + v * 3.1) + .006 * Math.sin(theta * 10.7 - v * 2.3);
    return point(Math.cos(theta) * (width + ridge) - .15 + .14 * Math.sin(v * 7),
      -.13 + Math.sin(theta) * (roof + ridge) + edgeCurl,
      z + .28 * Math.sin(theta * 2 + v * 3) + Math.exp(-u * 20) * .16);
  }), [innerIvory, innerReverse, innerEdge], true);

  // An offset, lower right fold overlaps the left sheet only deep in the chamber; no repeated apertures.
  const rightSheet = add(membrane(114, 106, (u, v) => {
    const z = 1.9 - v * 14.1;
    const finish = 1.53 + .28 * Math.sin(v * 4.9 + 1.6) - .12 * v;
    const theta = -.055 + u * (finish + .055);
    const edgeCurl = Math.exp(-(1 - u) * 21) * .17 * Math.sin((1 - u) * 32);
    const width = 3.80 - v * 2.02 + .26 * Math.sin(v * 4.4 + .8);
    const roof = 3.40 - v * .44 + .18 * Math.sin(v * 5.5);
    const ridge = .012 * Math.sin(theta * 4.7 - v * 3.2) + .005 * Math.sin(theta * 9.8 + v * 3.1);
    return point(.12 + Math.cos(theta) * (width + ridge),
      -.16 + Math.sin(theta) * (roof + ridge) - edgeCurl,
      z + .52 * Math.sin(theta * 1.7 + v * 2.4) - Math.exp(-(1 - u) * 18) * .18);
  }), [roseIvory, roseReverse, innerEdge], true);

  // The rear closes obliquely, rather than exposing a circular cross-section of the enclosure.
  add(surface(116, 104, (u, v) => {
    const x = (u - .5) * 9.2, y = -.4 + v * 5.9;
    const fold = .38 * Math.sin(u * Math.PI * 1.4 + v * .7) + .13 * Math.sin(u * Math.PI * 2.8 - v * .5);
    return point(x + .15 * Math.sin(v * 3.5), y, -12.9 + (1 - u) * 3.1 + fold);
  }), farMaterial);
  // One broad S-curled overlap merges into floor/roof and interrupts the round terminal silhouette.
  // Its ends are outside the enclosure, and its visible edge is a closed soft membrane, not a cut strip.
  add(membrane(94, 98, (u, v) => {
    const edgeX = -.12 + .37 * Math.sin(v * 5.3 + .45);
    const x = -4.7 + u * (edgeX + 4.7);
    const y = -.42 + v * 5.8;
    const curl = Math.exp(-(1 - u) * 12) * .19 * Math.sin((1 - u) * 19);
    return point(x - curl, y, -9.7 + .58 * Math.sin(v * 2.7 + .5) - .38 * Math.sin(u * Math.PI) + u * .13);
  }), [innerReverse, innerIvory, innerEdge], true);

  // Grounded fabric rises into the walls. Close textiles use their own dense irregular weave map.
  const floorHeight = (x: number, z: number) => -.12 + .085 * Math.sin(z * .53 + x * .39) + .075 * Math.cos(x * 1.1) + .018 * Math.sin(x * 8 + z * 2.2) + Math.pow(Math.abs(x) / 5, 3) * .72;
  add(surface(106, 118, (u, v) => {
    const x = (u - .5) * 10, z = 6.5 - v * 20.4;
    return point(x, floorHeight(x, z), z);
  }), floorMaterial);
  for (let side = 0; side < 2; side++) {
    add(membrane(96, 84, (u, v) => {
      const sign = side === 0 ? -1 : 1;
      const innerCurve = .26 * Math.sin(v * Math.PI) + .12 * Math.sin(v * 4.7);
      const x = sign * (.63 + innerCurve + u * 4.2), z = 5.4 - v * 8.5 + side * .55;
      const edgeTaper = THREE.MathUtils.smoothstep(v, 0, .13) * (1 - THREE.MathUtils.smoothstep(v, .81, 1));
      const mound = Math.sin(u * Math.PI) ** .64;
      const loft = mound * (.47 + .24 * Math.sin(v * 3.8 + side)) + .08 * Math.sin(u * 10 + v * 3.5) * Math.sin(u * Math.PI);
      const y = floorHeight(x, z) - .045 + loft * edgeTaper;
      return point(x, y, z);
    }), [clothMaterial, foldReverse, foldReverse], true);
  }
  add(membrane(112, 40, (u, v) => {
    const x = (u - .5) * 6.8;
    return point(x, .11 + Math.sin(v * Math.PI) * (.23 + .09 * Math.sin(u * 9)) + .024 * Math.sin(u * 44) * Math.sin(v * Math.PI), 1.65 + v * 1.45 + .18 * Math.sin(u * 7));
  }), [clothMaterial, foldReverse, foldReverse], true);
  // Small embedded stitches sit on the cloth lip; they are grounded detail, not free-floating ribs.
  const stitchGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([point(-.014, 0, -.035), point(0, .018, 0), point(.01, .007, .06)]), 5, .003, 5, false);
  const stitches = new THREE.InstancedMesh(stitchGeometry, seamMaterial, 72);
  const stitchMatrix = new THREE.Matrix4();
  for (let i = 0; i < 72; i++) {
    const u = (i + .5) / 72;
    stitches.setMatrixAt(i, stitchMatrix.makeTranslation((u - .5) * 6.8, .12, 1.65 + .18 * Math.sin(u * 7)));
  }
  stitches.instanceMatrix.needsUpdate = true; habitat.add(stitches);

  // White-ivory near light, muted rose side bounce and restrained amber rear light define separate depths.
  scene.add(new THREE.HemisphereLight('#fff4e8', '#775b50', .90));
  const apertureLight = new THREE.PointLight('#ffd09a', 11, 14, 1.8); apertureLight.position.set(.6, 2.3, -6.4); scene.add(apertureLight);
  const warmKey = new THREE.SpotLight('#fff2df', 32, 16, .91, 1, 1.5);
  warmKey.position.set(-1.65, 3.1, 1.25); warmKey.target.position.set(.8, .15, -1.9);
  warmKey.castShadow = true; warmKey.shadow.mapSize.set(1024, 1024); warmKey.shadow.bias = -.0002;
  warmKey.shadow.normalBias = .032; warmKey.shadow.radius = 6; scene.add(warmKey, warmKey.target);
  const roseLight = new THREE.PointLight('#f2b3a6', 6.5, 9, 1.9); roseLight.position.set(-1.9, 2.7, -1.4); scene.add(roseLight);
  const nearFill = new THREE.PointLight('#fff0dc', 3.4, 7, 2); nearFill.position.set(1.5, 1.5, 2.8); scene.add(nearFill);
  const farGlow = new THREE.PointLight('#f3ba88', 5, 8, 1.8); farGlow.position.set(-.65, 2.15, -12.1); scene.add(farGlow);
  const rand = random(983), dustBase: number[] = [];
  for (let i = 0; i < 54; i++) dustBase.push((rand() - .5) * 6, .3 + rand() * 3.3, 2 - rand() * 13);
  const dustGeometry = new THREE.BufferGeometry(); dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustBase, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: '#ffe7bc', size: .01, transparent: true, opacity: .22, depthWrite: false, sizeAttenuation: true }));
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
      habitat.scale.set(1 + breath * .0025, 1 + breath * .0035, 1);
      uniforms.pulse.value = breath; uniforms.time.value = touchAt < 0 ? -100 : elapsed - touchAt;
      apertureLight.intensity = 11 + breath * .45;
      leftSheet.scale.y = 1 + Math.sin(elapsed * .34) * .0012;
      rightSheet.scale.y = 1 + Math.sin(elapsed * .34 + .8) * .0012;
      const array = dustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 54; i++) {
        array[i * 3] = dustBase[i * 3] + Math.sin(elapsed * .047 + i * 1.73) * .045;
        array[i * 3 + 1] = dustBase[i * 3 + 1] + Math.sin(elapsed * .065 + i * .93) * .05;
      }
      dustGeometry.attributes.position.needsUpdate = true;
    },
    interact(ndc) {
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(true); raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(targets, false)[0];
      if (!hit) return undefined;
      touchAt = now; uniforms.touch.value.copy(hit.point); uniforms.time.value = 0;
      return { kind: 'warmth', strength: .27, x: THREE.MathUtils.clamp(ndc.x, -1, 1) };
    },
  };
};
