import * as THREE from 'three';
import { Painter } from './gardenPaint';
import { buildTree, concatGeometries } from '../shared/render/treeGeometry';
import { applyFoliageShading, crownCanopy, type CanopyLight } from '../shared/render/foliageShading';
import { applyBarkSurface } from '../shared/render/barkSurface';
import { createNightSky } from '../shared/render/skyNight';
import { createNoiseVolume } from '../shared/render/fireFlame';
import { patchSurface } from '../shared/render/interiorSurface';
import { fbm3, seeded } from '../shared/render/noise';

/*
 * The night garden seen through the bedroom window: an HDR night sky with a
 * moon and twinkling stars, a big lime tree whose lower boughs cross the
 * glazing and sway slowly, a dark lawn and a ragged treeline on a low rise.
 * The tree is back-lit by the moon, so leaves read as silhouettes with thin
 * silver edges and a faint glow where the moon shines through them. The same
 * crown, as a canopy function, breaks the moonbeam into soft dapples on the
 * bed and floor. Original procedural work.
 */

type RGB = [number, number, number];
const srgb = (value: string): RGB => { const c = new THREE.Color(value); c.convertLinearToSRGB(); return [c.r, c.g, c.b]; };
const mix3 = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/** Lime (linden) sprays: alternate heart-shaped leaves on zig-zag twigs, four variants. */
export function limeSprayAtlas(seed: number, columns = 4, cell = 256) {
  const p = new Painter(cell * columns, cell);
  const random = seeded(seed);
  const dark = srgb('#1e2a1a'), base = srgb('#34472a'), light = srgb('#58703e'), stem = srgb('#3a3226');
  for (let column = 0; column < columns; column++) {
    const ox = column * cell;
    p.setClip(ox + 1, 0, cell - 2, cell - 1);
    const pts: Array<[number, number]> = [];
    let x = ox + cell * (0.45 + random() * 0.1), y = cell * 0.02, a = (random() - 0.5) * 0.4;
    pts.push([x, y]);
    for (let i = 0; i < 7; i++) { a += (i % 2 ? 0.28 : -0.28) + (random() - 0.5) * 0.15; x += Math.sin(a) * cell * 0.11; y += Math.cos(a) * cell * 0.11; pts.push([x, y]); }
    p.stroke(pts, t => cell * 0.011 * (1 - 0.6 * t), () => stem);
    const leaves: Array<() => void> = [];
    for (let i = 1; i < pts.length; i++) {
      const [nx, ny] = pts[i];
      const side = i % 2 ? 1 : -1;
      const along = Math.atan2(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const angle = along + side * (0.7 + random() * 0.5);
      const len = cell * (0.2 + random() * 0.09) * (1 - i * 0.04);
      const tone = random();
      const edgeOn = random() < 0.2 ? 0.5 : 1;
      // Keep the whole leaf inside its cell.
      const tipX = nx + Math.sin(angle) * len, tipY = ny + Math.cos(angle) * len;
      if (tipX < ox + len * 0.35 || tipX > ox + cell - len * 0.35 || tipY > cell - len * 0.3) continue;
      leaves.push(() => p.leaf(nx, ny, angle, len, len * 0.42 * edgeOn, (u, v) => {
        const c = mix3(mix3(dark, base, tone), light, Math.max(0, 0.35 - Math.abs(v) * 0.5) * (1 - u));
        const vein = Math.max(0, 1 - Math.abs(v) * 9) * 0.25;
        return mix3(c, light, vein);
      }, 0.55));
    }
    leaves.forEach(draw => draw());
  }
  return p.toTexture(8);
}

export interface NightViewOptions {
  /** Direction toward the moon for lighting (unit). */
  toMoon: THREE.Vector3;
  /** Where the moon disc appears in the sky (unit). */
  moonDisc: THREE.Vector3;
  time: { value: number };
  /** Point the leaf cards face (the viewer). */
  eye: THREE.Vector3;
}

export function createNightView(o: NightViewOptions) {
  const group = new THREE.Group();
  group.name = 'night garden';
  const noise = createNoiseVolume(48, 17);
  const sky = createNightSky({
    noise, zenith: '#01040e', horizon: '#243659', brightness: 0.06,
    glow: { color: '#5d6f96', direction: o.moonDisc, intensity: 0.05, width: 3.5, height: 0.22 },
    airglow: 0.01,
    moon: { direction: o.moonDisc, intensity: 48, radius: 0.016, halo: 0.4, color: '#fff3df', sunDirection: o.moonDisc.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), 2.2).setY(-0.2).normalize() },
    galaxy: { pole: new THREE.Vector3(0.3, 0.4, 0.85).normalize(), centre: new THREE.Vector3(-0.8, 0.25, -0.5).normalize(), intensity: 0.012 },
    stars: { count: 4200, seed: 4417, intensity: 2.6, galacticFraction: 0.3, twinkle: 0.8 },
  });
  group.add(sky.group);

  // Lawn and a low rise with a ragged treeline against the sky.
  const lawnGeometry = new THREE.PlaneGeometry(90, 70, 60, 40); lawnGeometry.rotateX(-Math.PI / 2);
  const lp = lawnGeometry.attributes.position;
  for (let i = 0; i < lp.count; i++) {
    const x = lp.getX(i), z = lp.getZ(i) - 38;
    lp.setXYZ(i, x, -0.55 + fbm3(x * 0.07, 0, z * 0.07, 3) * 0.5 + Math.max(0, -z - 26) * 0.12, z);
  }
  lawnGeometry.computeVertexNormals();
  const lawn = new THREE.Mesh(lawnGeometry, patchSurface(new THREE.MeshStandardMaterial({ color: '#0a0f09', roughness: 0.97, envMapIntensity: 0.2 }), {
    key: 'night-lawn',
    color: 'float lwN = bwFbm3(vSurfaceWorld * 0.45); float lwB = bwNoise(vSurfaceWorld * 6.0); diffuseColor.rgb *= 0.55 + 0.35 * lwN + 0.15 * lwB;',
    height: 'bwNoise(vSurfaceWorld * 22.0) * 0.004',
  }));
  lawn.name = 'night-lawn';
  group.add(lawn);

  const treeline = new THREE.Mesh(new THREE.PlaneGeometry(160, 22, 1, 1), new THREE.ShaderMaterial({
    transparent: false, depthWrite: true,
    uniforms: { uTime: o.time, uMoon: { value: o.toMoon.clone() } },
    vertexShader: 'varying vec3 vWorld; varying vec2 vUv; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: /* glsl */ `
uniform float uTime; varying vec3 vWorld; varying vec2 vUv;
float h1(float n) { return fract(sin(n) * 43758.5453); }
float vnoise(float x) { float i = floor(x), f = fract(x); return mix(h1(i), h1(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  float x = vWorld.x;
  // Rounded crowns of different sizes, a few taller trees, fine leafy fringe.
  float crowns = 0.0;
  for (int k = 0; k < 3; k++) {
    float s = 0.35 * pow(2.1, float(k));
    float c = floor(x * s), f = fract(x * s) - 0.5;
    float r = 0.35 + 0.4 * h1(c * 7.1 + float(k) * 13.0);
    crowns = max(crowns, (sqrt(max(0.0, r * r - f * f)) * 2.0) / s * (0.6 + 0.5 * h1(c * 3.3 + float(k))));
  }
  float top = 1.6 + crowns * 0.75 + vnoise(x * 0.09) * 1.8 + vnoise(x * 3.7) * 0.22 + vnoise(x * 9.0 + 3.0) * 0.1;
  float y = vWorld.y;
  if (y > top) discard;
  float edge = smoothstep(0.6, 0.0, top - y);
  vec3 color = vec3(0.006, 0.009, 0.012) + vec3(0.03, 0.04, 0.065) * edge * (0.5 + 0.5 * vnoise(x * 5.0));
  // Distance haze toward the sky colour.
  color = mix(color, vec3(0.02, 0.03, 0.055), 0.3);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  }));
  treeline.position.set(-10, 8.5, -34); treeline.name = 'night-treeline';
  group.add(treeline);

  // The lime tree beside the window: lower boughs cross the glazing, the crown rises out of view.
  const time = o.time;
  const atlas = limeSprayAtlas(91);
  const trees = [
    buildTree({
      seed: 211, base: new THREE.Vector3(1.9, -0.5, -7.4), height: 10, radius: 0.3, form: 'broadleaf', lean: [-0.45, 0.05], gnarl: 0.45, flare: 0.5,
      crownStart: 0.2, limbs: 7, levels: 2, children: 3, spread: 0.62, curl: 0.12, radial: 10, ringsPerMetre: 3, displace: 0, flex: 0.6,
      leaves: { cardsPerTwig: 7, size: 0.85, reach: 0.7, atlasColumns: 4, crownNormals: 0.75, shade: [0.25, 1.05], skyward: 0.2, fill: 0.2 },
    }),
    buildTree({
      seed: 223, base: new THREE.Vector3(-6.5, -0.5, -13), height: 8, radius: 0.24, form: 'broadleaf', lean: [0.15, 0], gnarl: 0.4, flare: 0.4,
      crownStart: 0.3, limbs: 6, levels: 1, children: 3, spread: 0.5, curl: 0.2, radial: 7, ringsPerMetre: 2, displace: 0, flex: 0.5,
      leaves: { cardsPerTwig: 9, size: 1.05, reach: 0.8, atlasColumns: 4, crownNormals: 0.85, shade: [0.25, 1.05], skyward: 0.2, fill: 0.3 },
    }),
  ];
  const bark = new THREE.Mesh(concatGeometries(trees.map(t => t.bark)), applyFoliageShading(applyBarkSurface(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9 }), {
    key: 'night-lime-bark', plate: '#4a4740', fissure: '#151310', lichen: { color: '#7d846f', amount: 0.2 },
  }), { key: 'night-lime-bark', wind: { time, mode: 'attribute', sway: 0.06, flutter: 0, speed: 0.45 } }));
  bark.name = 'night-tree-bark';
  const leafMaterial = applyFoliageShading(new THREE.MeshStandardMaterial({ map: atlas, vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.6, metalness: 0, color: '#1f251c', envMapIntensity: 0.2 }), {
    key: 'night-lime-leaves', sharedNormals: true, coverage: true,
    translucency: { tint: '#9fb87a', back: 0.03, forward: 0.03 },
    wind: { time, mode: 'attribute', sway: 0.06, flutter: 0.014, speed: 0.45 },
  });
  const leaves = new THREE.Mesh(concatGeometries(trees.map(t => t.leaves).filter((g): g is THREE.BufferGeometry => !!g)), leafMaterial);
  leaves.name = 'night-tree-leaves';
  trees.forEach(t => { t.bark.dispose(); t.leaves?.dispose(); });
  const foliage = new THREE.Group(); foliage.name = 'night-tree'; foliage.add(bark, leaves);
  group.add(foliage);
  for (const mesh of [lawn, treeline, bark, leaves]) { mesh.castShadow = false; mesh.receiveShadow = false; }
  bark.frustumCulled = false; leaves.frustumCulled = false;

  const canopy: CanopyLight = crownCanopy({
    key: 'night-lime', toSun: o.toMoon, crowns: trees.slice(0, 1).map(t => ({ centre: t.crown.centre.clone(), radius: t.crown.radius.clone().multiplyScalar(0.85) })),
    density: 0.07, gaps: 0.45, time,
  });
  return {
    group, canopy, sky, foliage,
    triangles: trees.reduce((n, t) => n + t.triangles, 0),
    update(seconds: number) { sky.update(seconds); },
  };
}
