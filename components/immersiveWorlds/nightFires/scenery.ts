import * as THREE from 'three';

/** Original deterministic geometry/material helpers. No external assets or source ports. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

type MaterialKind = 'wood' | 'bark' | 'stone' | 'earth' | 'fabric' | 'metal';
const tau = Math.PI * 2;

/** The small, independently generated maps carry grain, not a painted scene. */
export function material(kind: MaterialKind, color: THREE.ColorRepresentation): THREE.MeshStandardMaterial {
  const finish = {
    wood: [0.79, 0, 0.022], bark: [0.96, 0, 0.045], stone: [0.93, 0, 0.025],
    earth: [1, 0, 0.018], fabric: [0.96, 0, 0.008], metal: [0.39, 0.72, 0.002],
  }[kind];
  const result = new THREE.MeshStandardMaterial({ color, roughness: finish[0], metalness: finish[1] });
  // Scene recipes can also be assembled in non-DOM tests.
  if (typeof document === 'undefined') return result;
  const side = 256;
  const albedo = document.createElement('canvas');
  const relief = document.createElement('canvas');
  albedo.width = relief.width = side;
  albedo.height = relief.height = side;
  const ctx = albedo.getContext('2d');
  const bump = relief.getContext('2d');
  if (!ctx || !bump) return result;
  const pixels = ctx.createImageData(side, side);
  const heights = bump.createImageData(side, side);
  const random = seeded(131 + kind.charCodeAt(0) * 79);
  const mineralField = Float32Array.from({ length: 32 * 32 }, () => random());
  const mineralNoise = (u: number, v: number) => {
    const x = u * 32, y = v * 32, ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const at = (a: number, b: number) => mineralField[((b + 32) % 32) * 32 + (a + 32) % 32];
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(at(ix, iy), at(ix + 1, iy), sx),
      THREE.MathUtils.lerp(at(ix, iy + 1), at(ix + 1, iy + 1), sx), sy) - 0.5;
  };
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      const u = x / side;
      const v = y / side;
      const grain = random() - 0.5;
      const soft = Math.sin(u * tau * 3 + Math.sin(v * tau * 2)) * 0.3
        + Math.sin(v * tau * 7 + u * tau * 2) * 0.13;
      let detail = grain * 0.13 + soft * 0.12;
      if (kind === 'wood') {
        const bend = Math.sin(v * tau) * 0.28 + Math.sin(v * tau * 3) * 0.08;
        const growth = Math.sin(u * tau * 23 + bend + Math.sin(u * tau * 3) * 2.2);
        detail = growth * 0.12 + Math.sin(u * tau * 71 + bend * 2) * 0.035 + grain * 0.10 + soft * 0.07;
      } else if (kind === 'bark') {
        const groove = Math.pow(Math.max(0, Math.sin(u * tau * 19 + Math.sin(v * tau * 3) * 0.35)), 9);
        detail = -groove * 0.36 + Math.sin(v * tau * 39 + u * 19) * 0.028 + grain * 0.15 + soft * 0.07;
      } else if (kind === 'stone' || kind === 'earth') {
        detail = soft * 0.30 + grain * 0.30 + mineralNoise(u, v) * 0.50
          + mineralNoise(u * 0.25, v * 0.25) * 0.38;
        if (kind === 'stone' && random() > 0.98) detail += random() > 0.5 ? 0.23 : -0.28;
      } else if (kind === 'fabric') {
        detail = ((x % 4 < 2 ? 1 : -1) + (y % 4 < 2 ? 1 : -1)) * 0.027 + grain * 0.035 + soft * 0.035;
      } else {
        detail = Math.sin(v * tau * 113) * 0.018 + grain * 0.015 + soft * 0.045;
      }
      const shade = THREE.MathUtils.clamp((kind === 'stone' ? 213 : 235) + detail * (kind === 'stone' ? 140 : 85), kind === 'stone' ? 112 : 165, 255);
      const height = THREE.MathUtils.clamp(128 + detail * 220, 0, 255);
      const i = (y * side + x) * 4;
      pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = shade;
      heights.data[i] = heights.data[i + 1] = heights.data[i + 2] = height;
      pixels.data[i + 3] = heights.data[i + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  bump.putImageData(heights, 0, 0);
  result.map = new THREE.CanvasTexture(albedo);
  result.map.colorSpace = THREE.SRGBColorSpace;
  result.bumpMap = new THREE.CanvasTexture(relief);
  for (const texture of [result.map, result.bumpMap]) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
  }
  result.bumpScale = finish[2];
  return result;
}

export function mesh(
  geometry: THREE.BufferGeometry,
  surface: THREE.Material | THREE.Material[],
  pos: [number, number, number] = [0, 0, 0],
  rotation: [number, number, number] = [0, 0, 0],
): THREE.Mesh {
  const object = new THREE.Mesh(geometry, surface);
  object.position.set(...pos);
  object.rotation.set(...rotation);
  object.castShadow = object.receiveShadow = true;
  return object;
}

export function beam(a: THREE.Vector3, b: THREE.Vector3, radius: number, surface: THREE.Material): THREE.Mesh {
  const d = b.clone().sub(a);
  const object = mesh(new THREE.CylinderGeometry(radius * 0.84, radius, d.length(), 8), surface);
  object.position.copy(a).add(b).multiplyScalar(0.5);
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return object;
}

export function rock(
  pos: [number, number, number], scale: [number, number, number], seed: number, surface?: THREE.Material,
): THREE.Mesh {
  const random = seeded(seed);
  const geometry = new THREE.IcosahedronGeometry(1, 3);
  const positions = geometry.getAttribute('position');
  const phase = random() * 20;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
    const n = 1 + Math.sin(x * 5.1 + z * 3.3 + phase) * 0.085
      + Math.cos(y * 6.2 - x * 2.7 + phase) * 0.07 + Math.sin(z * 8.3 + y * 3.4) * 0.035;
    positions.setXYZ(i, x * n, Math.max(-0.72, y * n), z * n);
  }
  geometry.computeVertexNormals();
  // IcosahedronGeometry duplicates triangle corners. Average matching positions so
  // large foreground boulders retain weathering rather than a low-poly silhouette.
  const normals = geometry.getAttribute('normal');
  const accumulated = new Map<string, THREE.Vector3>();
  const keys: string[] = [];
  for (let i = 0; i < positions.count; i++) {
    const key = `${Math.round(positions.getX(i) * 1e5)},${Math.round(positions.getY(i) * 1e5)},${Math.round(positions.getZ(i) * 1e5)}`;
    keys.push(key);
    const average = accumulated.get(key) ?? new THREE.Vector3();
    average.add(new THREE.Vector3(normals.getX(i), normals.getY(i), normals.getZ(i)));
    accumulated.set(key, average);
  }
  for (const normal of accumulated.values()) normal.normalize();
  for (let i = 0; i < normals.count; i++) {
    const average = accumulated.get(keys[i])!;
    const face = new THREE.Vector3(normals.getX(i), normals.getY(i), normals.getZ(i));
    face.lerp(average, 0.94).normalize();
    normals.setXYZ(i, face.x, face.y, face.z);
  }
  const object = mesh(geometry, surface ?? material('stone', '#77716c'), pos);
  object.scale.set(...scale);
  object.rotation.set(random() * 0.22, random() * tau, random() * 0.15);
  return object;
}

function joinGeometry(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const p: number[] = [], n: number[] = [], uv: number[] = [];
  for (const source of geometries) {
    const g = source.index ? source.toNonIndexed() : source;
    const position = g.getAttribute('position'), normal = g.getAttribute('normal'), tex = g.getAttribute('uv');
    for (let i = 0; i < position.count; i++) {
      p.push(position.getX(i), position.getY(i), position.getZ(i));
      n.push(normal?.getX(i) ?? 0, normal?.getY(i) ?? 1, normal?.getZ(i) ?? 0);
      uv.push(tex?.getX(i) ?? 0, tex?.getY(i) ?? 0);
    }
    if (g !== source) g.dispose();
    source.dispose();
  }
  const result = new THREE.BufferGeometry();
  result.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  result.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3));
  result.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return result;
}

/** Individual branch whorls and needle sprays; intentionally no stacked cones. */
export function pine(x: number, y: number, z: number, height: number, seed: number): THREE.Group {
  const random = seeded(seed);
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = random() * tau;
  const wood = material('bark', '#53473d');
  const branches: THREE.BufferGeometry[] = [];
  const points: number[] = [], colors: number[] = [];
  const trunk = new THREE.CylinderGeometry(height * 0.008, height * 0.039, height, 8, 9);
  trunk.translate(0, height * 0.5, 0);
  const tp = trunk.getAttribute('position');
  const lean = (random() - 0.5) * height * 0.07;
  for (let i = 0; i < tp.count; i++) {
    const t = tp.getY(i) / height;
    tp.setX(i, tp.getX(i) + lean * t * t);
  }
  trunk.computeVertexNormals();
  branches.push(trunk);
  function addBranch(a: THREE.Vector3, b: THREE.Vector3, radius: number) {
    const delta = b.clone().sub(a);
    const g = new THREE.CylinderGeometry(radius * 0.25, radius, delta.length(), 5);
    const matrix = new THREE.Matrix4().compose(
      a.clone().add(b).multiplyScalar(0.5),
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()),
      new THREE.Vector3(1, 1, 1),
    );
    g.applyMatrix4(matrix);
    branches.push(g);
  }
  function needle(a: THREE.Vector3, direction: THREE.Vector3, length: number, width: number) {
    const b = a.clone().addScaledVector(direction, length);
    const perpendicular = new THREE.Vector3(direction.z, 0.23 + random() * 0.25, -direction.x).normalize().multiplyScalar(width);
    const shade = 0.70 + random() * 0.55;
    points.push(a.x - perpendicular.x, a.y - perpendicular.y, a.z - perpendicular.z,
      a.x + perpendicular.x, a.y + perpendicular.y, a.z + perpendicular.z, b.x, b.y, b.z);
    for (let v = 0; v < 3; v++) colors.push(0.16 * shade, 0.27 * shade, 0.205 * shade);
  }
  for (let ring = 0; ring < 8; ring++) {
    const t = 0.22 + ring * 0.096 + random() * 0.016;
    const count = 4 + (ring % 3);
    for (let arm = 0; arm < count; arm++) {
      const angle = arm / count * tau + ring * 2.39 + (random() - 0.5) * 0.35;
      const length = height * (0.30 * Math.pow(1 - t, 0.7)) * (0.72 + random() * 0.45);
      const start = new THREE.Vector3(lean * t * t, height * t, 0);
      const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const end = start.clone().addScaledVector(radial, length);
      end.y += length * (ring > 5 ? 0.26 : 0.035 + random() * 0.16);
      addBranch(start, end, height * (1 - t) * 0.009);
      const side = new THREE.Vector3(-radial.z, 0, radial.x);
      for (let twig = 0; twig < 7; twig++) {
        const along = 0.20 + twig * 0.12;
        const origin = start.clone().lerp(end, along);
        const lateral = (twig % 2 ? 1 : -1) * (0.15 + random() * 0.20) * length * (1 - along * 0.55);
        const twigEnd = origin.clone().addScaledVector(radial, length * 0.20).addScaledVector(side, lateral);
        twigEnd.y += length * (0.05 + random() * 0.09);
        addBranch(origin, twigEnd, height * 0.0026 * (1 - along * 0.7));
        const twigDirection = twigEnd.clone().sub(origin).normalize();
        for (let bundle = 0; bundle < 8; bundle++) {
          const centre = origin.clone().lerp(twigEnd, bundle / 8);
          for (let ray = 0; ray < 7; ray++) {
            const theta = ray / 7 * tau + random() * 0.3;
            const direction = twigDirection.clone().multiplyScalar(0.55)
              .addScaledVector(side, Math.cos(theta) * 0.78)
              .add(new THREE.Vector3(0, Math.sin(theta) * 0.54, 0)).normalize();
            needle(centre, direction, height * (0.017 + random() * 0.017), height * 0.0013);
          }
        }
      }
    }
  }
  group.add(mesh(joinGeometry(branches), wood));
  const needles = new THREE.BufferGeometry();
  needles.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  needles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  needles.computeVertexNormals();
  const canopy = mesh(needles, new THREE.MeshStandardMaterial({
    color: '#ffffff', vertexColors: true, roughness: 0.94, side: THREE.DoubleSide,
  }));
  group.add(canopy);
  return group;
}

export function sky(scene: THREE.Scene, top: THREE.ColorRepresentation, horizon: THREE.ColorRepresentation, seed: number, starCount = 650): void {
  const dome = new THREE.Mesh(new THREE.SphereGeometry(170, 48, 28), new THREE.ShaderMaterial({
    uniforms: { topColor: { value: new THREE.Color(top) }, horizonColor: { value: new THREE.Color(horizon) } },
    vertexShader: `varying vec3 vDirection; void main(){vDirection=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform vec3 topColor;uniform vec3 horizonColor;varying vec3 vDirection;
      void main(){float h=max(normalize(vDirection).y,0.);float blend=pow(smoothstep(0.,.82,h),.65);
      vec3 c=mix(horizonColor,topColor,blend);gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
    side: THREE.BackSide, depthWrite: false,
  }));
  dome.renderOrder = -10;
  scene.add(dome);
  const random = seeded(seed);
  const positions = new Float32Array(starCount * 3), strengths = new Float32Array(starCount);
  for (let i = 0; i < starCount; i++) {
    const altitude = 0.025 + random() * 0.97;
    const angle = random() * tau;
    const radius = Math.sqrt(1 - altitude * altitude) * 158;
    positions.set([Math.cos(angle) * radius, altitude * 158, Math.sin(angle) * radius], i * 3);
    strengths[i] = 0.18 + Math.pow(random(), 3) * 0.68;
  }
  const starsGeometry = new THREE.BufferGeometry();
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute('strength', new THREE.BufferAttribute(strengths, 1));
  const stars = new THREE.Points(starsGeometry, new THREE.ShaderMaterial({
    vertexShader: `attribute float strength;varying float vStrength;void main(){vStrength=strength;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=1.15+strength*1.15;}`,
    fragmentShader: `varying float vStrength;void main(){float d=length(gl_PointCoord-.5);float a=(1.-smoothstep(.05,.5,d))*vStrength;gl_FragColor=vec4(.77,.85,1.,a);}`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  stars.renderOrder = -8;
  scene.add(stars);
}

/** A deep, asymmetric ridgeline with actual sloped facets and valleys. */
export function ridge(scene: THREE.Scene, z: number, height: number, color: string, seed: number): void {
  const random = seeded(seed);
  const width = 150, depth = 25;
  const terrain = new THREE.PlaneGeometry(width, depth, 100, 10);
  terrain.rotateX(-Math.PI / 2);
  const peaks = Array.from({ length: 7 }, (_, i) => ({
    x: -70 + i * 22 + random() * 12,
    h: height * (0.36 + random() * 0.72),
    w: 6 + random() * 15,
  }));
  const positions = terrain.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);
  const base = new THREE.Color(color);
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), originalZ = positions.getZ(i);
    const along = (originalZ + depth * 0.5) / depth;
    let summit = height * 0.12;
    for (const peak of peaks) summit += peak.h * Math.exp(-Math.pow((x - peak.x) / peak.w, 2)) * 0.68;
    const profile = Math.pow(Math.max(0, Math.sin(along * Math.PI)), 0.68);
    const small = Math.sin(x * 0.47 + along * 4.7 + seed) * height * 0.038;
    const y = (summit + small) * profile - height * 0.12;
    positions.setY(i, y);
    positions.setZ(i, originalZ + z - depth * 0.5);
    const tint = base.clone().multiplyScalar(0.77 + along * 0.15 + y / Math.max(1, height) * 0.13);
    colors.set([tint.r, tint.g, tint.b], i * 3);
  }
  terrain.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  terrain.computeVertexNormals();
  scene.add(mesh(terrain, new THREE.MeshStandardMaterial({ color: '#ffffff', vertexColors: true, roughness: 1 })));
}

/** Fire-only textures: physical charcoal, ash and recessed hot fissures. */
function fireSurface(kind: 'bark' | 'end' | 'coal', seed: number): THREE.MeshStandardMaterial {
  // Map colours are already the intended albedo. A second dark tint would crush
  // the shadow-facing cut faces and erase their grey ash midtones.
  const result = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.97 });
  if (typeof document === 'undefined') {
    result.color.set(kind === 'end' ? '#6c6a63' : '#4a4945');
    return result;
  }
  const width = kind === 'bark' ? 512 : 256, height = 256;
  const random = seeded(seed);
  const field = Float32Array.from({ length: 64 * 64 }, () => random());
  const noise = (x: number, y: number) => {
    const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const at = (a: number, b: number) => field[((b % 64 + 64) % 64) * 64 + (a % 64 + 64) % 64];
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(at(ix, iy), at(ix + 1, iy), sx),
      THREE.MathUtils.lerp(at(ix, iy + 1), at(ix + 1, iy + 1), sx), sy) - 0.5;
  };
  const canvases = Array.from({ length: 3 }, () => {
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height; return canvas;
  });
  const contexts = canvases.map(canvas => canvas.getContext('2d'));
  if (contexts.some(context => !context)) return result;
  const images = contexts.map(context => context!.createImageData(width, height));
  const radialSplits = Array.from({ length: 9 }, (_, i) => ({ angle: i * 2.399 + random() * 0.14, start: 0.15 + random() * 0.42 }));
  const longSplits = Array.from({ length: 17 }, (_, i) => ({
    u: i / 17 + (random() - 0.5) * 0.024, phase: random() * tau,
    start: i % 3 ? random() * 0.30 : -0.05, end: i % 4 ? 0.67 + random() * 0.38 : 1.05,
    width: 0.0017 + random() * 0.0034, wander: 0.008 + random() * 0.011,
  }));
  const crossSplits = Array.from({ length: 21 }, () => ({
    u: random(), v: random(), span: 0.025 + random() * 0.060, phase: random() * tau,
  }));
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const u = x / width, v = y / height;
    const broad = kind === 'bark' ? noise(u * 9.7 + 2.3, v * 2.1 + 0.8) : noise(u * 5.1 + 2.3, v * 5.7 + 0.8);
    const small = noise(u * 31.7, v * 29.1);
    const ash = THREE.MathUtils.smoothstep(broad * 0.72 + small * 0.26, 0.005, 0.24);
    let fissure = 0, grain = 0;
    if (kind === 'end') {
      const dx = (u - 0.511) * 2, dy = (v - 0.477) * 2;
      const radius = Math.hypot(dx, dy), angle = Math.atan2(dy, dx);
      grain = Math.sin(radius * 109 + Math.sin(angle * 4) * 0.68 + broad * 1.2) * 0.5;
      for (const split of radialSplits) {
        const a = angle - split.angle + Math.sin(radius * 20 + split.angle) * 0.025;
        const distance = Math.abs(Math.sin(a)) * radius;
        if (Math.cos(a) > 0 && radius > split.start) {
          fissure = Math.max(fissure, 1 - THREE.MathUtils.smoothstep(distance, 0.003, 0.016));
        }
      }
      // Short circumferential separations connect the larger radial splits.
      fissure = Math.max(fissure, Math.pow(Math.max(0, -grain * 2), 15) * 0.36);
    } else if (kind === 'bark') {
      // Carbonised fibres split mainly along the log. The few transverse cracks
      // end within individual strips instead of forming a regular checker grid.
      for (const split of longSplits) {
        const path = split.u + Math.sin(v * 9 + split.phase) * split.wander
          + Math.sin(v * 27 + split.phase * 0.71) * 0.003;
        const delta = Math.abs(u - path);
        const distance = Math.min(delta, Math.abs(1 - delta));
        const extent = THREE.MathUtils.smoothstep(v, split.start, split.start + 0.055) *
          (1 - THREE.MathUtils.smoothstep(v, split.end - 0.06, split.end));
        fissure = Math.max(fissure, (1 - THREE.MathUtils.smoothstep(distance, split.width * 0.23, split.width)) * extent);
      }
      for (const split of crossSplits) {
        const dx = ((u - split.u + 1.5) % 1) - 0.5;
        const path = split.v + Math.sin(dx / split.span * 2 + split.phase) * 0.006 + dx * 0.08;
        const extent = 1 - THREE.MathUtils.smoothstep(Math.abs(dx), split.span * 0.64, split.span);
        fissure = Math.max(fissure, (1 - THREE.MathUtils.smoothstep(Math.abs(v - path), 0.0014, 0.0045)) * extent * 0.88);
      }
      grain = Math.sin(u * 285 + noise(u * 13, v * 3) * 4) * 0.22 + noise(u * 36, v * 2.5) * 0.65;
    } else {
      const gx = u * 5.6 + noise(u * 4, v * 7) * 0.31;
      const gy = v * 5.1 + noise(u * 9 + 7, v * 4) * 0.29;
      const fx = gx - Math.floor(gx), fy = gy - Math.floor(gy);
      const edgeX = Math.min(fx, 1 - fx), edgeY = Math.min(fy, 1 - fy);
      fissure = Math.max(1 - THREE.MathUtils.smoothstep(edgeX, 0.017, 0.062),
        (1 - THREE.MathUtils.smoothstep(edgeY, 0.012, 0.048)) * 0.86);
      grain = Math.sin(u * 285 + broad * 4) * 0.25 + small * 0.6;
    }
    const mottledAsh = ash * (0.60 + small * 0.38);
    const charcoal = kind === 'bark' ? 42 + broad * 14 + grain * 8 :
      (kind === 'end' ? 88 : 56) + broad * 23 + grain * 16;
    const shade = THREE.MathUtils.lerp(charcoal + mottledAsh * (kind === 'bark' ? 30 : 110), 19 + broad * 9, fissure);
    const relief = 137 + grain * 14 + mottledAsh * 15 - fissure * 67;
    const heat = kind === 'end' ? 0 : fissure * (kind === 'coal' ? 231 : 48) *
      THREE.MathUtils.smoothstep(broad + small * 0.38, -0.28, 0.02) * (1 - ash * 0.85);
    const i = (y * width + x) * 4;
    images[0].data[i] = shade; images[0].data[i + 1] = shade * 0.988; images[0].data[i + 2] = shade * 0.946;
    for (let channel = 0; channel < 3; channel++) {
      images[1].data[i + channel] = relief;
      images[2].data[i + channel] = heat;
    }
    for (const img of images) img.data[i + 3] = 255;
  }
  contexts.forEach((context, i) => context!.putImageData(images[i], 0, 0));
  result.map = new THREE.CanvasTexture(canvases[0]);
  result.map.colorSpace = THREE.SRGBColorSpace;
  result.bumpMap = new THREE.CanvasTexture(canvases[1]);
  result.bumpScale = kind === 'end' ? 0.0035 : 0.006;
  if (kind !== 'end') {
    result.emissiveMap = new THREE.CanvasTexture(canvases[2]);
    result.emissiveMap.colorSpace = THREE.SRGBColorSpace;
    result.emissive.set(kind === 'coal' ? '#ff5908' : '#a93208');
    result.emissiveIntensity = kind === 'coal' ? 0.9 : 0.18;
  }
  for (const map of [result.map, result.bumpMap, result.emissiveMap]) {
    if (map) { map.anisotropy = 4; map.wrapS = THREE.RepeatWrapping; }
  }
  return result;
}

/** Rounded split wood with recessed, uneven cut faces rather than polygon disks. */
function charredLogGeometry(length: number, radius: number, variation: number): THREE.BufferGeometry {
  const vertices: number[] = [], uvs: number[] = [], indices: number[] = [];
  const segments = 40, axial = 10, rings = 6;
  const geometry = new THREE.BufferGeometry();
  const radiusAt = (angle: number, t: number) => {
    const fracture = 1 + Math.sin(angle * 3 + variation * 2.3) * 0.062 + Math.cos(angle * 7 - variation) * 0.036;
    const groove = Math.pow(Math.max(0, Math.cos(angle * 11 + Math.sin(t * 7 + variation) * 0.1)), 20) * 0.022;
    return radius * THREE.MathUtils.lerp(1, 0.86, t) * (fracture - groove);
  };
  const add = (x: number, y: number, z: number, u: number, v: number) => {
    vertices.push(x, y, z); uvs.push(u, v); return vertices.length / 3 - 1;
  };
  for (let row = 0; row <= axial; row++) for (let col = 0; col <= segments; col++) {
    const t = row / axial, angle = col / segments * tau;
    const r = radiusAt(angle, t);
    const edge = Math.pow(Math.abs(t * 2 - 1), 8);
    const y = (t - 0.5) * length + Math.sin(angle * 5 + variation) * 0.009 * edge;
    add(Math.cos(angle) * r, y, Math.sin(angle) * r, col / segments, t);
  }
  for (let row = 0; row < axial; row++) for (let col = 0; col < segments; col++) {
    const a = row * (segments + 1) + col, b = a + 1, c = a + segments + 1, d = c + 1;
    indices.push(a, c, b, b, c, d);
  }
  geometry.addGroup(0, indices.length, 0);
  for (let end = 0; end < 2; end++) {
    const sign = end ? 1 : -1, t = end;
    const firstIndex = indices.length;
    const centre = add(0, sign * (length * 0.5 - 0.016), 0, 0.5, 0.5);
    const start = vertices.length / 3;
    for (let ring = 1; ring <= rings; ring++) for (let col = 0; col <= segments; col++) {
      const q = ring / rings, angle = col / segments * tau;
      const r = radiusAt(angle, t) * q;
      const chips = Math.sin(angle * 5 + variation) * 0.009 * Math.pow(q, 3);
      const scoop = 0.016 * (1 - q * q) + Math.sin(q * 23 + angle * 2) * 0.0018 * q * (1 - q);
      add(Math.cos(angle) * r, sign * (length * 0.5 - scoop) + chips, Math.sin(angle) * r,
        0.5 + Math.cos(angle) * q * 0.5, 0.5 + Math.sin(angle) * q * 0.5);
    }
    for (let col = 0; col < segments; col++) {
      const current = start + col, next = current + 1;
      if (end) indices.push(centre, next, current); else indices.push(centre, current, next);
    }
    for (let ring = 0; ring < rings - 1; ring++) for (let col = 0; col < segments; col++) {
      const a = start + ring * (segments + 1) + col, b = a + 1, c = a + segments + 1, d = c + 1;
      if (end) indices.push(a, b, c, b, d, c); else indices.push(a, c, b, b, c, d);
    }
    geometry.addGroup(firstIndex, indices.length - firstIndex, end + 1);
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function flameGeometry(height: number, width: number): THREE.BufferGeometry {
  const g = new THREE.PlaneGeometry(width, height, 10, 22);
  const p = g.getAttribute('position');
  const uv = g.getAttribute('uv');
  for (let i = 0; i < p.count; i++) {
    const t = uv.getY(i);
    const taper = Math.pow(1 - t, 0.75) * (0.72 + Math.sin(t * Math.PI) * 0.38);
    p.setXYZ(i, p.getX(i) * taper, t * height, 0);
  }
  return g;
}

export function fire(position: [number, number, number], scale = 1): {
  group: THREE.Group; target: THREE.Object3D; update: (time: number, dt: number) => void; stoke: () => number;
} {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);
  const stone = material('stone', '#858784');
  const char = fireSurface('bark', 85023);
  const cut = fireSurface('end', 85021);
  const ash = material('earth', '#333130');
  group.add(mesh(new THREE.CylinderGeometry(0.74, 0.78, 0.025, 40), ash, [0, 0.02, 0]));
  const random = seeded(73217);
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * tau;
    group.add(rock([Math.cos(angle) * (0.75 + random() * 0.05), 0.067 + random() * 0.025, Math.sin(angle) * 0.70],
      [0.19 + random() * 0.07, 0.075 + random() * 0.055, 0.15 + random() * 0.10], i + 717, stone));
  }
  const logs = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const angle = i * 1.31 + 0.18;
    const radius = 0.15 + random() * 0.035;
    const length = 1.05 - i * 0.06;
    const logGeometry = charredLogGeometry(length, radius, i);
    const log = mesh(logGeometry, [char, cut, cut]);
    const mid = new THREE.Vector3((random() - 0.5) * 0.19, 0.16 + (i % 2) * 0.11, (random() - 0.5) * 0.17);
    log.position.copy(mid);
    log.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(Math.cos(angle), 0.12 * (i % 2), Math.sin(angle)).normalize());
    logs.add(log);
    for (let scar = 0; scar < 3; scar++) {
      const glowing = new THREE.MeshStandardMaterial({ color: '#3c1003', emissive: '#e95007', emissiveIntensity: 0.12 + random() * 0.19, roughness: 1 });
      const seam = mesh(new THREE.CylinderGeometry(0.0025, 0.0045, 0.24 + random() * 0.19, 5), glowing);
      seam.position.copy(mid).add(new THREE.Vector3(Math.cos(angle) * (scar - 1) * 0.16, radius * 0.87, Math.sin(angle) * (scar - 1) * 0.16));
      seam.quaternion.copy(log.quaternion);
      logs.add(seam);
    }
  }
  group.add(logs);
  const ashPositions: number[] = [], ashColors: number[] = [];
  for (let fleck = 0; fleck < 75; fleck++) {
    const a = random() * tau, r = Math.sqrt(random()) * 0.66;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const size = 0.008 + random() * 0.018;
    const y = 0.039 + random() * 0.003;
    ashPositions.push(x - size, y, z - size * 0.3, x + size, y, z, x + size * 0.4, y, z + size);
    const shade = 0.16 + random() * 0.18;
    for (let v = 0; v < 3; v++) ashColors.push(shade, shade * 0.96, shade * 0.89);
  }
  const flakes = new THREE.BufferGeometry();
  flakes.setAttribute('position', new THREE.Float32BufferAttribute(ashPositions, 3));
  flakes.setAttribute('color', new THREE.Float32BufferAttribute(ashColors, 3));
  flakes.computeVertexNormals();
  group.add(mesh(flakes, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide })));
  const emberSurface = fireSurface('coal', 85027);
  for (let i = 0; i < 31; i++) {
    const angle = random() * tau, r = Math.sqrt(random()) * 0.48;
    group.add(rock([Math.cos(angle) * r, 0.064, Math.sin(angle) * r], [0.032 + random() * 0.044, 0.02, 0.033], i * 33, emberSurface));
  }
  // Cooled crust partly overlaps the lower glowing coals. Its separate seed
  // preserves the established flame placement and interaction spark sequence.
  const coalRandom = seeded(790019);
  const crustGeometries: THREE.BufferGeometry[] = [];
  for (let chip = 0; chip < 23; chip++) {
    const angle = coalRandom() * tau, r = Math.sqrt(coalRandom()) * 0.62;
    const fragment = rock([Math.cos(angle) * r, 0.047 + coalRandom() * 0.028, Math.sin(angle) * r],
      [0.039 + coalRandom() * 0.046, 0.011 + coalRandom() * 0.016, 0.031 + coalRandom() * 0.050], chip * 113 + 7, char);
    fragment.updateMatrix();
    fragment.geometry.applyMatrix4(fragment.matrix);
    crustGeometries.push(fragment.geometry);
  }
  const crust = mesh(joinGeometry(crustGeometries), char);
  crust.name = 'Overlapping cooled charcoal and ash above ember fissures';
  group.add(crust);
  const uniforms = { clock: { value: 0 }, boost: { value: 0 } };
  for (let i = 0; i < 7; i++) {
    const surface = new THREE.ShaderMaterial({
      uniforms: { ...uniforms, phase: { value: i * 1.91 }, opacity: { value: i < 3 ? 0.70 : 0.37 } },
      vertexShader: `uniform float clock;uniform float phase;uniform float boost;varying vec2 vUv;varying float vHeight;
        void main(){vUv=uv;vec3 p=position;float t=uv.y;
        p.x+=sin(t*5.7-clock*1.6+phase)*.065*t+sin(t*10.+clock*.87+phase)*.028*t;
        p.z+=cos(t*5.2-clock*1.2+phase)*.056*t;
        p.y*=1.+.075*sin(clock*1.2+phase)+boost*.08;
        vHeight=t;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader: `uniform float clock;uniform float phase;uniform float opacity;varying vec2 vUv;varying float vHeight;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
        void main(){float t=vUv.y;float edge=sin(vUv.x*3.1415926);float n=noise(vec2(vUv.x*5.+phase,t*4.-clock*1.3));
        float body=pow(max(edge,0.),1.5)*(1.-smoothstep(.60,1.,t))*smoothstep(0.,.10,t);
        float holes=smoothstep(.20,.67,n+t*.11);
        float a=body*mix(.37,1.,holes)*opacity;
        vec3 heat=mix(vec3(1.6,.96,.25),vec3(1.22,.22,.023),smoothstep(.06,.74,t));
        heat=mix(heat,vec3(.53,.072,.007),smoothstep(.70,1.,t));
        gl_FragColor=vec4(heat,a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    });
    const height = 0.51 + random() * 0.35;
    const flame = mesh(flameGeometry(height, 0.36 + random() * 0.20), surface,
      [(random() - 0.5) * 0.28, 0.12 + random() * 0.045, (random() - 0.5) * 0.24], [0, i * 1.24, 0]);
    flame.castShadow = flame.receiveShadow = false;
    flame.renderOrder = 3;
    group.add(flame);
  }
  const light = new THREE.PointLight('#ffad5f', 4.1, 9 * scale, 1.7);
  light.position.set(0, 0.73, 0);
  group.add(light);
  const sparkCount = 32;
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkAges = new Float32Array(sparkCount).fill(10);
  const sparkVelocities = new Float32Array(sparkCount * 3);
  const sparkStrength = new Float32Array(sparkCount);
  const sparkGeometry = new THREE.BufferGeometry();
  sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  sparkGeometry.setAttribute('strength', new THREE.BufferAttribute(sparkStrength, 1));
  const sparks = new THREE.Points(sparkGeometry, new THREE.ShaderMaterial({
    vertexShader: `attribute float strength;varying float vStrength;void main(){vStrength=strength;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_PointSize=1.6+strength*1.3;}`,
    fragmentShader: `varying float vStrength;void main(){float a=(1.-smoothstep(.08,.5,length(gl_PointCoord-.5)))*vStrength;gl_FragColor=vec4(1.,.35,.045,a);}`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  group.add(sparks);
  let boost = 0;
  let driftCountdown = 0.6;
  function ignite(index: number, strength: number) {
    sparkAges[index] = 0;
    sparkPositions[index * 3] = (random() - 0.5) * 0.38;
    sparkPositions[index * 3 + 1] = 0.30 + random() * 0.20;
    sparkPositions[index * 3 + 2] = (random() - 0.5) * 0.30;
    sparkVelocities[index * 3] = (random() - 0.5) * 0.14;
    sparkVelocities[index * 3 + 1] = 0.25 + random() * 0.32;
    sparkVelocities[index * 3 + 2] = (random() - 0.5) * 0.10;
    sparkStrength[index] = strength;
  }
  return {
    group, target: logs,
    update(time, dt) {
      const step = THREE.MathUtils.clamp(dt, 0, 0.08);
      boost = Math.max(0, boost - step * 0.35);
      uniforms.clock.value = time;
      uniforms.boost.value = boost;
      light.intensity = (4.1 + Math.sin(time * 2.1) * 0.15 + Math.sin(time * 3.87 + 1) * 0.09 + boost * 0.45) * scale;
      emberSurface.emissiveIntensity = 0.86 + Math.sin(time * 0.8) * 0.07 + boost * 0.1;
      driftCountdown -= step;
      if (driftCountdown <= 0) {
        const free = sparkAges.findIndex(age => age > 2.5);
        if (free >= 0) ignite(free, 0.42);
        driftCountdown = 0.70 + random() * 0.8;
      }
      for (let i = 0; i < sparkCount; i++) {
        sparkAges[i] += step;
        if (sparkAges[i] > 2.5) { sparkStrength[i] = 0; continue; }
        const k = i * 3;
        sparkPositions[k] += sparkVelocities[k] * step + Math.sin(time * 0.6 + i) * step * 0.016;
        sparkPositions[k + 1] += sparkVelocities[k + 1] * step;
        sparkPositions[k + 2] += sparkVelocities[k + 2] * step;
        sparkStrength[i] = Math.max(0, (1 - sparkAges[i] / 2.5) * 0.72);
      }
      sparkGeometry.getAttribute('position').needsUpdate = true;
      sparkGeometry.getAttribute('strength').needsUpdate = true;
    },
    stoke() {
      boost = Math.min(1, boost + 0.6);
      let emitted = 0;
      for (let i = 0; i < sparkCount && emitted < 9; i++) {
        if (sparkAges[i] > 1.8) { ignite(i, 0.75); emitted++; }
      }
      return 0.5;
    },
  };
}

export function lantern(position: [number, number, number], scale = 1): {
  group: THREE.Group; target: THREE.Object3D; update: (time: number, dt: number) => void; toggle: () => number;
} {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);
  const brass = material('metal', '#9a7848');
  const darkMetal = material('metal', '#454643');
  const baseProfile = [new THREE.Vector2(0.13, 0), new THREE.Vector2(0.16, 0.02), new THREE.Vector2(0.158, 0.056),
    new THREE.Vector2(0.11, 0.085), new THREE.Vector2(0.08, 0.104)];
  group.add(mesh(new THREE.LatheGeometry(baseProfile, 28), brass));
  const capProfile = [new THREE.Vector2(0.15, 0.44), new THREE.Vector2(0.16, 0.461),
    new THREE.Vector2(0.12, 0.48), new THREE.Vector2(0.085, 0.505), new THREE.Vector2(0.069, 0.54), new THREE.Vector2(0.055, 0.555)];
  group.add(mesh(new THREE.LatheGeometry(capProfile, 28), brass));
  group.add(mesh(new THREE.CylinderGeometry(0.062, 0.072, 0.043, 24), darkMetal, [0, 0.535, 0]));
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#fae6bb', roughness: 0.13, metalness: 0, transparent: true, opacity: 0.18,
    transmission: 0.08, thickness: 0.026, clearcoat: 1, clearcoatRoughness: 0.12, side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassProfile = [new THREE.Vector2(0.096, 0.094), new THREE.Vector2(0.123, 0.15),
    new THREE.Vector2(0.126, 0.30), new THREE.Vector2(0.104, 0.40), new THREE.Vector2(0.099, 0.447)];
  const chimney = mesh(new THREE.LatheGeometry(glassProfile, 40), glass);
  chimney.castShadow = false;
  group.add(chimney);
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * tau + 0.3;
    const x = Math.cos(angle) * 0.143, z = Math.sin(angle) * 0.143;
    group.add(beam(new THREE.Vector3(x, 0.061, z), new THREE.Vector3(x * 0.89, 0.46, z * 0.89), 0.010, brass));
  }
  for (const y of [0.10, 0.424]) {
    group.add(mesh(new THREE.TorusGeometry(0.116, 0.006, 6, 36), brass, [0, y, 0], [Math.PI / 2, 0, 0]));
  }
  const handlePoints: THREE.Vector3[] = [];
  for (let i = 0; i <= 24; i++) {
    const angle = i / 24 * Math.PI;
    handlePoints.push(new THREE.Vector3(Math.cos(angle) * 0.155, 0.475 + Math.sin(angle) * 0.20, 0));
  }
  group.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(handlePoints), 30, 0.009, 6, false), darkMetal));
  const mantle = new THREE.MeshStandardMaterial({ color: '#ffdda5', emissive: '#ffac4a', emissiveIntensity: 2.1, roughness: 0.67 });
  group.add(mesh(new THREE.CapsuleGeometry(0.038, 0.10, 6, 12), mantle, [0, 0.25, 0]));
  group.add(mesh(new THREE.CylinderGeometry(0.048, 0.061, 0.025, 16), brass, [0, 0.16, 0]));
  const light = new THREE.PointLight('#ffca86', 2.3, 7 * scale, 1.65);
  light.position.set(0, 0.27, 0);
  group.add(light);
  let level = 0.7, targetLevel = 0.7, index = 1;
  let changed = false;
  const levels = [0.38, 0.7, 1];
  return {
    group, target: group,
    update(time, dt) {
      // A user interaction must remain visible in reduced-motion/static rendering.
      if (changed && dt <= 0) level = targetLevel;
      changed = false;
      level += (targetLevel - level) * (1 - Math.exp(-Math.max(0, Math.min(dt, 0.08)) * 2.4));
      light.intensity = 3.3 * level * scale * (1 + Math.sin(time * 0.91) * 0.012);
      mantle.emissiveIntensity = 3 * level;
    },
    toggle() { index = (index + 1) % levels.length; targetLevel = levels[index]; changed = true; return targetLevel; },
  };
}
