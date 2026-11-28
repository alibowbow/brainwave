import * as THREE from 'three';
import { buildTree, concatGeometries, loftTube } from '../shared/render/treeGeometry';
import { beforeMain, type CanopyLight } from '../shared/render/foliageShading';
import { GLSL_NOISE } from '../shared/render/glsl';
import { VOLUME_PRELUDE, type VolumeEffect } from '../shared/render/hdrPipeline';
import { FULLSCREEN_VERTEX } from '../shared/render/targets';
import { fbm3, noise3, seeded } from '../shared/render/noise';

/*
 * The garden beyond the nap terrace: gnarled olives with twisted, split trunks
 * (lofted strands under treeGeometry crowns), columnar cypresses, an instanced
 * meadow of drawn tufts with a distance LOD, and the light they share. One
 * canopy function (sun visibility through the olive crowns) shades the leaves,
 * bark, meadow, terrace and the sail's transmitted light, and lights the shafts
 * in the volume pass, so every dapple lines up. Original procedural work.
 */

export type Random = () => number;

/** Early-afternoon sun, high and ahead-left: the garden is softly back-lit. */
export const TO_SUN = new THREE.Vector3(-0.52, 0.74, -0.42).normalize();

/**
 * Meadow and grove slope height (metres); the terrace sits at y = 0. The grove
 * climbs to a low crest around z = -65 and the land falls away behind it, so
 * the farmed ridges and the far range show above the last planted rows.
 */
export function groundY(x: number, z: number) {
  const rise = Math.max(0, -z - 18);
  return -0.4 + Math.sin(x * 0.15 + z * 0.1) * 0.22 + Math.sin(z * 0.12) * 0.3
    + rise * (0.13 + Math.sin(x * 0.07) * 0.035) - Math.max(0, rise - 30) ** 2 * 0.0035;
}

/** Centre line of the trodden path that curves away through the meadow. */
export function pathX(z: number) {
  return 1.4 + Math.sin(((-z - 4.6) / 0.6) * 0.092) * 2.5;
}

/** Low-frequency meadow fields shared by the instancer (CPU) and the ground shader (GPU). */
export const meadowDry = (x: number, z: number) => THREE.MathUtils.smoothstep(fbm3(x * 0.07 + 4, 0.5, z * 0.07, 3), -0.18, 0.3);
export const meadowLush = (x: number, z: number) => fbm3(x * 0.16 + 9, 1.5, z * 0.16, 3);

// ---- Shared sun visibility ------------------------------------------------------------------------

export interface Crown { centre: THREE.Vector3; radius: THREE.Vector3 }

/**
 * Sun visibility through olive crowns: each crown is an ellipsoid whose chord
 * along the sun ray attenuates the light. Its outline is ragged, and inside it
 * the foliage breaks into branch-scale clumps with sky between them and
 * leaf-scale flecks that breathe slowly with the wind. The noise is sampled at
 * the chord's midpoint, so all points on one sun ray (sail, floor, air) see the
 * same leaves.
 */
export interface OliveCanopyOptions {
  crowns: Crown[];
  /** Extinction per metre of crown. */
  density: number;
  /** Hole threshold and its soft width: higher `gaps` closes the crown. */
  gaps: number;
  softness: number;
  /** Leaf-fleck and branch-clump frequencies (per metre). */
  fleck: number;
  clump: number;
  time: { value: number };
}

export function oliveCanopy(o: OliveCanopyOptions): CanopyLight {
  const count = Math.max(1, o.crowns.length);
  const data: THREE.Vector4[] = [];
  o.crowns.forEach((c, i) => {
    data.push(new THREE.Vector4(c.centre.x, c.centre.y, c.centre.z, i * 17.31));
    data.push(new THREE.Vector4(c.radius.x, c.radius.y, c.radius.z, o.density));
  });
  while (data.length < count * 2) { data.push(new THREE.Vector4(0, -1e3, 0, 0), new THREE.Vector4(1, 1, 1, 0)); }
  return {
    key: `nap-olives-${count}`,
    uniforms: {
      uBwToSun: { value: TO_SUN.clone() },
      uNapCrown: { value: data },
      uNapLeaf: { value: new THREE.Vector4(o.gaps, o.softness, o.fleck, o.clump) },
      uBwCanopyTime: o.time,
    },
    glsl: /* glsl */ `
#define NAP_CROWNS ${count}
uniform vec3 uBwToSun;
uniform vec4 uNapCrown[NAP_CROWNS * 2];
uniform vec4 uNapLeaf;
uniform float uBwCanopyTime;
float bwCanopy(vec3 p) {
  float visibility = 1.0;
  float t = uBwCanopyTime;
  for (int i = 0; i < NAP_CROWNS; i++) {
    vec4 c = uNapCrown[i * 2], rr = uNapCrown[i * 2 + 1];
    vec3 r = rr.xyz;
    vec3 o = (p - c.xyz) / r;
    vec3 d = uBwToSun / r;
    float a = dot(d, d), b = dot(o, d), k = dot(o, o) - 1.0;
    float disc = b * b - a * k;
    if (disc <= 0.0) continue;
    float q = sqrt(disc);
    float t1 = (-b + q) / a;
    if (t1 <= 0.0) continue;
    float t0 = max((-b - q) / a, 0.0);
    float chord = t1 - t0;
    vec3 mid = p + uBwToSun * (0.5 * (t0 + t1)) + c.w;
    // How far the ray passes from the crown's centre (0 core .. 1 rim), with a ragged outline.
    float rim = sqrt(max(k + 1.0 - b * b / a, 0.0)) + 0.3 * bwNoise(mid * 0.55 + 3.0);
    // Branch-scale clumps with sky between them, then leaf-scale flecks that breathe with the wind.
    float clumps = bwNoise(mid * uNapLeaf.w);
    vec3 drift = vec3(sin(t * 0.29 + mid.y * 0.7), cos(t * 0.23 + mid.x * 0.6), sin(t * 0.26 + mid.z * 0.8)) * 0.07;
    float flecks = bwNoise(mid * uNapLeaf.z + drift);
    float open = smoothstep(uNapLeaf.x, uNapLeaf.x + uNapLeaf.y, clumps * 0.6 + flecks * 0.4 + smoothstep(0.6, 1.0, rim) * 0.7);
    float blocked = 1.0 - exp(-chord * rr.w);
    visibility *= 1.0 - blocked * (1.0 - open);
  }
  return visibility;
}
`,
  };
}

/**
 * CPU twin of `bwCanopy` from oliveCanopy (same noise, same constants), for
 * tests and for placing things where the dapple falls.
 */
export function canopyVisibility(canopy: CanopyLight, p: THREE.Vector3) {
  const crowns = canopy.uniforms.uNapCrown.value as THREE.Vector4[];
  const leaf = canopy.uniforms.uNapLeaf.value as THREE.Vector4;
  const t = (canopy.uniforms.uBwCanopyTime.value as number) ?? 0;
  const toSun = canopy.uniforms.uBwToSun.value as THREE.Vector3;
  let visibility = 1;
  for (let i = 0; i < crowns.length; i += 2) {
    const c = crowns[i], rr = crowns[i + 1];
    const ox = (p.x - c.x) / rr.x, oy = (p.y - c.y) / rr.y, oz = (p.z - c.z) / rr.z;
    const dx = toSun.x / rr.x, dy = toSun.y / rr.y, dz = toSun.z / rr.z;
    const a = dx * dx + dy * dy + dz * dz, b = ox * dx + oy * dy + oz * dz, k = ox * ox + oy * oy + oz * oz - 1;
    const disc = b * b - a * k;
    if (disc <= 0) continue;
    const q = Math.sqrt(disc), t1 = (-b + q) / a;
    if (t1 <= 0) continue;
    const t0 = Math.max((-b - q) / a, 0), chord = t1 - t0, h = 0.5 * (t0 + t1);
    const mx = p.x + toSun.x * h + c.w, my = p.y + toSun.y * h + c.w, mz = p.z + toSun.z * h + c.w;
    const rim = Math.sqrt(Math.max(k + 1 - b * b / a, 0)) + 0.3 * noise3(mx * 0.55 + 3, my * 0.55 + 3, mz * 0.55 + 3);
    const clumps = noise3(mx * leaf.w, my * leaf.w, mz * leaf.w);
    const flecks = noise3(mx * leaf.z + Math.sin(t * 0.29 + my * 0.7) * 0.07, my * leaf.z + Math.cos(t * 0.23 + mx * 0.6) * 0.07, mz * leaf.z + Math.sin(t * 0.26 + mz * 0.8) * 0.07);
    const open = THREE.MathUtils.smoothstep(clumps * 0.6 + flecks * 0.4 + THREE.MathUtils.smoothstep(rim, 0.6, 1) * 0.7, leaf.x, leaf.x + leaf.y);
    const blocked = 1 - Math.exp(-chord * rr.w);
    visibility *= 1 - blocked * (1 - open);
  }
  return visibility;
}

/**
 * Light bounced up from the sunlit meadow onto trunks and the undersides of
 * crowns out in the garden. The terrace's radiance probe is taken in the
 * sail's shade and cannot see it, so this adds a warm term on normals that
 * face the ground (linear radiance of the lit meadow).
 */
export function groundBounce<T extends THREE.MeshStandardMaterial>(material: T, key: string, radiance: THREE.Color): T {
  const previous = material.onBeforeCompile;
  const uniform = { value: new THREE.Vector3(radiance.r, radiance.g, radiance.b) };
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.uniforms.uNapBounce = uniform;
    shader.fragmentShader = beforeMain(shader.fragmentShader, 'uniform vec3 uNapBounce;').replace('#include <lights_fragment_end>', `{
  vec3 napBounceN = inverseTransformDirection(geometryNormal, viewMatrix);
  irradiance += PI * uNapBounce * clamp(0.55 - 0.45 * napBounceN.y, 0.0, 1.0);
}
#include <lights_fragment_end>`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|nap-bounce|${key}`;
  return material;
}

// ---- Volume: aerial haze and leaf shafts ------------------------------------------------------------

export interface GardenVolumeOptions {
  canopy: CanopyLight;
  /** Sun radiance scattered by the haze (linear HDR) and the isotropic sky term. */
  sun: THREE.Color;
  ambient: THREE.Color;
  /** Density per metre at `base` height, height falloff per metre, base height, maximum march distance. */
  haze: [number, number, number, number];
  /** Path length used for sky pixels. */
  skyDistance: number;
  /** The sail as a horizontal rectangle (height, x min, x max, z min, z max) that blocks the sun. */
  sail: [number, number, number, number, number];
  anisotropy: number;
  steps: number;
}

export function createGardenVolume(o: GardenVolumeOptions): VolumeEffect {
  const fragmentShader = /* glsl */ `
${VOLUME_PRELUDE}
${GLSL_NOISE}
${o.canopy.glsl}
uniform vec3 uVolToSun;
uniform vec3 uVolSun;
uniform vec3 uVolAmbient;
uniform vec4 uVolHaze;
uniform float uVolSky;
uniform float uVolSailY;
uniform vec4 uVolSail;
uniform float uVolG;
float sailShade(vec3 p) {
  float rise = uVolSailY - p.y;
  if (rise <= 0.0) return 1.0;
  vec2 q = p.xz + uVolToSun.xz / uVolToSun.y * rise;
  vec2 inside = smoothstep(vec2(-0.15), vec2(0.15), q - uVolSail.xz) * smoothstep(vec2(-0.15), vec2(0.15), uVolSail.yw - q);
  return 1.0 - 0.94 * inside.x * inside.y;
}
void main() {
  vec3 ro, rd; float surface;
  bwSceneRay(vUv, ro, rd, surface);
  float maxT = surface >= 1e4 ? uVolSky : min(surface, uVolHaze.w);
  float mu = dot(rd, uVolToSun);
  float phase = mix(bwPhase(mu, uVolG), 0.0795775, 0.45) * 12.5663706;
  float jitter = fract(bwIgn(gl_FragCoord.xy) + uFrame * 0.618034);
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0, previous = 0.0;
  const int STEPS = ${Math.min(32, o.steps)};
  for (int i = 0; i < STEPS; i++) {
    // Quadratic spacing: shafts near the viewer are sharp, distance is smooth haze.
    float s = (float(i) + jitter) / float(STEPS);
    float t = s * s * maxT;
    float dt = t - previous;
    previous = t;
    vec3 p = ro + rd * t;
    float density = uVolHaze.x * exp(-max(p.y - uVolHaze.z, 0.0) * uVolHaze.y) * (0.8 + 0.2 * bwValue(p * 0.05 + vec3(uTime * 0.01, 0.0, 0.0)));
    float sun = bwCanopy(p) * sailShade(p);
    vec3 radiance = uVolSun * phase * sun + uVolAmbient;
    float stepT = exp(-density * dt);
    scatter += transmittance * radiance * (1.0 - stepT);
    transmittance *= stepT;
  }
  gl_FragColor = vec4(scatter, transmittance);
}
`;
  const material = new THREE.ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX, fragmentShader, depthTest: false, depthWrite: false, toneMapped: false,
    uniforms: {
      ...o.canopy.uniforms,
      uVolToSun: { value: TO_SUN.clone() },
      uVolSun: { value: new THREE.Vector3(o.sun.r, o.sun.g, o.sun.b) },
      uVolAmbient: { value: new THREE.Vector3(o.ambient.r, o.ambient.g, o.ambient.b) },
      uVolHaze: { value: new THREE.Vector4(...o.haze) },
      uVolSky: { value: o.skyDistance },
      uVolSailY: { value: o.sail[0] },
      uVolSail: { value: new THREE.Vector4(o.sail[1], o.sail[2], o.sail[3], o.sail[4]) },
      uVolG: { value: o.anisotropy },
    },
  });
  return { material };
}

// ---- Olive trees ------------------------------------------------------------------------------------

export interface OliveSpec {
  seed: number;
  x: number;
  z: number;
  /** Number of twisted strands the old trunk has split into (1..4). */
  strands: number;
  /** Radius of the fused trunk near the ground (metres). */
  girth: number;
  /** Height at which the strands part. */
  split: number;
  /** Height of the crown each strand carries. */
  crown: number;
  /** Whole-tree lean (metres of offset at the split). */
  lean?: [number, number];
  /** Azimuth the strands open toward, and how far each strand's crown is pushed out. */
  open?: number;
  reach?: number;
  twist?: number;
  /** Extra offset (metres) every strand's crown leans toward, e.g. over the terrace. */
  crownLean?: [number, number];
  /** How much the crown's leaders and limbs wander (treeGeometry gnarl). */
  gnarl?: number;
  /**
   * Sinuous lofted scaffold limbs per strand, each carrying its own crown
   * (`crown` is then each limb's crown height). Without it each strand
   * continues straight into a single crown.
   */
  scaffold?: { limbs: number; length: number };
  detail: 'hero' | 'mid';
  leafSize: number;
  cards: number;
}

export interface OliveBuild { bark: THREE.BufferGeometry; leaves: THREE.BufferGeometry; crowns: Crown[]; triangles: number }

/** Olive bark frequency and plate elongation, shared by the modelled relief and the bark shader. */
export const OLIVE_BARK = { scale: 4.5, stretch: 5.5 };

/**
 * Burls, knots and twisted flutes on a lofted trunk (`radial` + 1 vertices per
 * ring): low-frequency world-space noise pushes the surface along its normal,
 * strongest near the foot, then normals are rebuilt with the ring seam welded.
 */
export function gnarlTube(geometry: THREE.BufferGeometry, radial: number, amount: number, seed: number, baseY: number, fade: number) {
  const p = geometry.attributes.position as THREE.BufferAttribute, n = geometry.attributes.normal as THREE.BufferAttribute;
  const b = geometry.attributes.aBark as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const around = Math.atan2(b.getY(i), b.getX(i)), along = b.getZ(i);
    // Flutes spiral with the strand's twist; burls are knotted lumps; both fade up the trunk.
    const flute = Math.sin(around * 3 + along * 1.7 + seed) * 0.5 + noise3(Math.cos(around) * 1.4, along * 0.9, Math.sin(around) * 1.4 + seed) * 0.6;
    const burl = Math.max(0, fbm3(x * 2.1 + seed, y * 2.1, z * 2.1, 3)) * 1.6;
    const k = amount * (0.35 + 0.65 * Math.exp(-Math.max(0, y - baseY) / fade));
    const d = (flute * 0.6 + burl) * k;
    p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d * 0.4, z + n.getZ(i) * d);
  }
  geometry.computeVertexNormals();
  const v = new THREE.Vector3();
  for (let row = 0; row < p.count; row += radial + 1) {
    const a = row, c = row + radial;
    v.set(n.getX(a) + n.getX(c), n.getY(a) + n.getY(c), n.getZ(a) + n.getZ(c)).normalize();
    n.setXYZ(a, v.x, v.y, v.z); n.setXYZ(c, v.x, v.y, v.z);
  }
  return geometry;
}

/**
 * An old olive: the trunk is a few lofted strands that twist around each other,
 * fused and fluted at the foot and parting into separate leaders, each carrying
 * a treeGeometry crown of dense silver-green leaf clusters.
 */
export function buildOlive(spec: OliveSpec): OliveBuild {
  const random = seeded(spec.seed * 977 + 13);
  const range = (a: number, b: number) => a + random() * (b - a);
  const hero = spec.detail === 'hero';
  const base = new THREE.Vector3(spec.x, groundY(spec.x, spec.z) - 0.12, spec.z);
  const n = spec.strands;
  const G = spec.girth, Hs = spec.split;
  const twist = spec.twist ?? range(0.9, 1.5);
  const lean = spec.lean ?? [0, 0];
  const open = spec.open ?? random() * Math.PI * 2;
  const treePhase = random() * Math.PI * 2;
  const barkParts: THREE.BufferGeometry[] = [], leafParts: THREE.BufferGeometry[] = [], crowns: Crown[] = [];
  const steps = hero ? 12 : 8;
  for (let k = 0; k < n; k++) {
    const a0 = open + (k / n) * Math.PI * 2 + range(-0.35, 0.35);
    const strandR = G * (n === 1 ? 0.95 : n === 2 ? 0.66 : n === 3 ? 0.56 : 0.5) * range(0.85, 1.12);
    const points: THREE.Vector3[] = [], radii: number[] = [];
    // A strand starts below ground so the flare meets the soil, hugs its
    // neighbours while twisting, then leans out where the trunk splits.
    for (let i = 0; i <= steps; i++) {
      const s = i / steps;
      const h = -0.2 + s * (Hs + 0.2);
      const u = Math.max(0, h) / Hs;
      const angle = a0 + twist * u + noise3(k * 3.1, u * 2, spec.seed) * 0.25;
      const rho = (n === 1 ? 0 : G * (0.5 - 0.22 * Math.sin(Math.PI * u) + 0.55 * THREE.MathUtils.smoothstep(u, 0.45, 1)));
      const leanU = Math.pow(u, 1.5);
      points.push(new THREE.Vector3(
        base.x + Math.cos(angle) * rho + lean[0] * leanU + noise3(u * 3, k, spec.seed + 1) * G * 0.12,
        base.y + h,
        base.z + Math.sin(angle) * rho + lean[1] * leanU + noise3(u * 3, k + 5, spec.seed + 2) * G * 0.12));
      radii.push(strandR * (1 + 0.7 * Math.exp(-Math.max(0, h) / 0.22)) * (1 - 0.22 * u));
    }
    const radial = hero ? 18 : 9;
    barkParts.push(gnarlTube(loftTube(points, radii, {
      radial, ringsPerMetre: hero ? 12 : 5, displace: hero ? 0.016 : 0.008, barkScale: OLIVE_BARK.scale, barkStretch: OLIVE_BARK.stretch,
      barkOffset: k * 5.3 + spec.seed, wind: [0, 0, 0], phase: [treePhase, treePhase + k],
    }), radial, strandR * (hero ? 0.26 : 0.16), spec.seed + k * 3.7, base.y, Hs * 0.45));
    // The strand's leaders and crowns lean outward from the trunk axis.
    const top = points[points.length - 1], topR = radii[radii.length - 1];
    const out = new THREE.Vector3(Math.cos(a0 + twist), 0, Math.sin(a0 + twist));
    const crownLean = spec.crownLean ?? [0, 0];
    const leaders: Array<{ base: THREE.Vector3; radius: number; out: THREE.Vector3; reach: number; lean: number; seed: number }> = [];
    if (spec.scaffold) {
      const { limbs, length } = spec.scaffold;
      const limbRadial = hero ? 14 : 8;
      for (let j = 0; j < limbs; j++) {
        // Thick, sinuous scaffold limbs fork from the strand top, rising and
        // reaching out toward the crown's lean, then carry the twig crowns.
        const yaw = Math.atan2(out.z + crownLean[1] * 0.3, out.x + crownLean[0] * 0.3) + (j - (limbs - 1) / 2) * 1.05 + range(-0.25, 0.25);
        const elevation = range(0.6, 1.0), L = length * range(0.8, 1.2);
        const dir = new THREE.Vector3(Math.cos(yaw) * Math.cos(elevation), Math.sin(elevation), Math.sin(yaw) * Math.cos(elevation));
        const side = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
        const start = top.clone().add(new THREE.Vector3(0, -0.3, 0));
        // A quadratic sweep out along `dir` that turns upward at its end, so it
        // flows into the crown's leader instead of meeting it at an elbow.
        const mid = start.clone().addScaledVector(dir, L * 0.62);
        const end = mid.clone().addScaledVector(new THREE.Vector3(dir.x * 0.35, 1, dir.z * 0.35).normalize(), L * 0.45);
        const pts: THREE.Vector3[] = [], rs: number[] = [];
        for (let i = 0; i <= 9; i++) {
          const s = i / 9, a = (1 - s) * (1 - s), b = 2 * s * (1 - s), c = s * s;
          pts.push(new THREE.Vector3(start.x * a + mid.x * b + end.x * c, start.y * a + mid.y * b + end.y * c, start.z * a + mid.z * b + end.z * c)
            // Knotty wander rather than a smooth S: two noise octaves, fading at both ends.
            .addScaledVector(side, (noise3(s * 2.6, j + 0.5, k + spec.seed) * 0.7 + noise3(s * 6.1, j + 3.5, k) * 0.3) * L * 0.09 * Math.sin(s * Math.PI))
            .add(new THREE.Vector3(0, noise3(s * 2.2, j + 7.5, k + spec.seed) * L * 0.06 * Math.sin(s * Math.PI), 0)));
          rs.push(topR * (0.84 - 0.34 * s) * (1 + 0.08 * noise3(s * 5, j, k + 9)));
        }
        barkParts.push(gnarlTube(loftTube(pts, rs, {
          radial: limbRadial, ringsPerMetre: hero ? 9 : 4, displace: hero ? 0.012 : 0.006, barkScale: OLIVE_BARK.scale, barkStretch: OLIVE_BARK.stretch,
          barkOffset: k * 5.3 + j * 2.9 + spec.seed + 1, wind: [0, 0, 0], phase: [treePhase, treePhase + k + j],
        }), limbRadial, rs[0] * 0.2, spec.seed + k * 3.7 + j * 1.3, start.y, L * 0.5));
        // The crown's leader starts one segment back, inside the limb, so the join is hidden.
        leaders.push({ base: pts[pts.length - 2], radius: rs[rs.length - 2] * 0.94, out: dir.clone().setY(0).normalize(), reach: 0.35, lean: 0.45, seed: k * 7 + j * 3 + 1 });
      }
    } else {
      leaders.push({ base: top.clone().setY(top.y - 0.05), radius: topR * 0.874, out, reach: n === 1 ? 0.3 : 1, lean: 1, seed: k * 7 });
    }
    for (const leader of leaders) {
      const reach = (spec.reach ?? 0.9) * range(0.75, 1.15) * leader.reach;
      const tree = buildTree({
        seed: spec.seed * 31 + leader.seed, base: leader.base, height: spec.crown * range(0.88, 1.08), radius: leader.radius, form: 'broadleaf',
        lean: [leader.out.x * reach + (lean[0] * 0.5 + crownLean[0]) * leader.lean, leader.out.z * reach + (lean[1] * 0.5 + crownLean[1]) * leader.lean],
        gnarl: spec.gnarl ?? 0.85, flare: 0, buttresses: 0,
        crownStart: hero ? 0.12 : 0.18, limbs: hero ? 6 : 4, levels: 2, children: 3, spread: 0.5, curl: 0.25,
        radial: hero ? 12 : 7, ringsPerMetre: hero ? 4.5 : 2.5, displace: hero ? 0.01 : 0, barkScale: OLIVE_BARK.scale, barkStretch: OLIVE_BARK.stretch, flex: 0.55,
        leaves: { cardsPerTwig: spec.cards, size: spec.leafSize, reach: 0.8, atlasColumns: 4, crownNormals: 0.68, shade: [0.32, 1.06], skyward: 0.25, fill: 0.35 },
      });
      barkParts.push(tree.bark);
      if (tree.leaves) leafParts.push(tree.leaves);
      crowns.push({ centre: tree.crown.centre.clone(), radius: tree.crown.radius.clone() });
    }
  }
  const bark = concatGeometries(barkParts), leaves = concatGeometries(leafParts);
  barkParts.forEach(g => g.dispose()); leafParts.forEach(g => g.dispose());
  const triangles = (bark.index!.count + leaves.index!.count) / 3;
  return { bark, leaves, crowns, triangles };
}

/** Merges strand crowns into one bounding ellipsoid (for far canopy lists). */
export function mergeCrowns(crowns: Crown[], shrink = 0.9): Crown {
  const box = new THREE.Box3();
  for (const c of crowns) { box.expandByPoint(c.centre.clone().sub(c.radius)); box.expandByPoint(c.centre.clone().add(c.radius)); }
  const centre = box.getCenter(new THREE.Vector3()), radius = box.getSize(new THREE.Vector3()).multiplyScalar(0.5 * shrink);
  return { centre, radius };
}

/** A small olive for the grove on the slope, built at the origin for instancing. */
export function groveOlive(seed: number, cards: number, size: number) {
  return buildTree({
    seed, base: new THREE.Vector3(0, -0.1, 0), height: 4.2, radius: 0.16, form: 'broadleaf', lean: [0.4, 0.2], gnarl: 0.9, flare: 0.6, buttresses: 3,
    crownStart: 0.22, limbs: 5, levels: 1, children: 3, spread: 0.5, curl: 0.3, radial: 5, ringsPerMetre: 1.5, flex: 0.5,
    leaves: { cardsPerTwig: cards, size, reach: 0.85, atlasColumns: 4, crownNormals: 0.82, shade: [0.35, 1.05], skyward: 0.3, fill: 0.4 },
  });
}

// ---- Cypress ------------------------------------------------------------------------------------------

/**
 * Italian cypress as a dense column: leaf cards packed over a narrow flame-shaped
 * envelope with vertical tufts, in two layers, around a dark core that closes the
 * gaps. Card attributes match treeGeometry's leaves, so the foliage shading is shared.
 */
export function buildCypress(o: { seed: number; base: THREE.Vector3; height: number; radius: number; cards: number; size: number; columns?: number }) {
  const random = seeded(o.seed * 613 + 7);
  const H = o.height, R = o.radius, columns = o.columns ?? 2;
  const profile = (t: number) => R * (0.6 + 0.4 * THREE.MathUtils.smoothstep(t, 0, 0.22)) * Math.pow(Math.max(0, 1 - t), 0.7);
  const tuft = (angle: number, t: number) => 1 + 0.2 * noise3(Math.cos(angle) * 1.7, t * H * 0.45, Math.sin(angle) * 1.7 + o.seed) + 0.08 * noise3(Math.cos(angle) * 5, t * H * 1.6, Math.sin(angle) * 5 + o.seed);
  const treePhase = random() * Math.PI * 2;
  const lp: number[] = [], ln: number[] = [], luv: number[] = [], lc: number[] = [], lw: number[] = [], lph: number[] = [], li: number[] = [];
  const up = new THREE.Vector3(), face = new THREE.Vector3(), right = new THREE.Vector3(), out = new THREE.Vector3(), corner = new THREE.Vector3(), nrm = new THREE.Vector3();
  let placed = 0, guard = o.cards * 8;
  while (placed < o.cards && guard-- > 0) {
    const t = Math.pow(random(), 0.85) * 0.97;
    const r = profile(t);
    // Area-weighted: wider sections receive more cards.
    if (random() > r / R) continue;
    const angle = random() * Math.PI * 2;
    const layer = random() < 0.7 ? 1 : 0.72;
    const radial = r * tuft(angle, t) * layer;
    out.set(Math.cos(angle), 0.25, Math.sin(angle)).normalize();
    const p = new THREE.Vector3(o.base.x + Math.cos(angle) * radial, o.base.y + 0.3 + t * H, o.base.z + Math.sin(angle) * radial);
    up.set(Math.cos(angle) * 0.3 + (random() - 0.5) * 0.3, 1, Math.sin(angle) * 0.3 + (random() - 0.5) * 0.3).normalize();
    face.copy(out).addScaledVector(up, -out.dot(up)).normalize();
    face.applyAxisAngle(up, (random() - 0.5) * 1.2);
    right.crossVectors(up, face).normalize();
    const size = o.size * (0.8 + random() * 0.45) * (1 - t * 0.4);
    const column = Math.floor(random() * columns);
    const tint = 0.88 + random() * 0.2;
    const baseIndex = lp.length / 3;
    for (let row = 0; row <= 2; row++) for (let col = 0; col <= 2; col++) {
      const u = col / 2, w = row / 2;
      corner.copy(p).addScaledVector(right, (u - 0.5) * size).addScaledVector(up, (w - 0.15) * size).addScaledVector(face, ((u - 0.5) * 2) ** 2 * size * 0.08);
      lp.push(corner.x, corner.y, corner.z);
      nrm.set(corner.x - o.base.x, 0, corner.z - o.base.z).normalize().multiplyScalar(0.9).add(new THREE.Vector3(0, 0.35 + (1 - t) * 0.1, 0)).normalize().lerp(face, 0.15).normalize();
      ln.push(nrm.x, nrm.y, nrm.z);
      luv.push((column + u) / columns, w);
      const ao = (layer < 1 ? 0.45 : 0.85 + 0.2 * w) * (0.6 + 0.4 * THREE.MathUtils.smoothstep(t, 0, 0.3)) * tint;
      lc.push(ao, ao, ao);
      lw.push(0.06 * t * t, 0.02 * t, 0.12 + 0.6 * w);
      lph.push(treePhase, treePhase + angle);
    }
    for (let row = 0; row < 2; row++) for (let col = 0; col < 2; col++) {
      const a = baseIndex + row * 3 + col;
      li.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
    }
    placed++;
  }
  const leaves = new THREE.BufferGeometry();
  leaves.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
  leaves.setAttribute('normal', new THREE.Float32BufferAttribute(ln, 3));
  leaves.setAttribute('uv', new THREE.Float32BufferAttribute(luv, 2));
  leaves.setAttribute('color', new THREE.Float32BufferAttribute(lc, 3));
  leaves.setAttribute('aWind', new THREE.Float32BufferAttribute(lw, 3));
  leaves.setAttribute('aWindPhase', new THREE.Float32BufferAttribute(lph, 2));
  leaves.setIndex(li);
  // The core: a lathe inside the leaf shell, dark so gaps read as depth, not sky.
  const core = new THREE.LatheGeometry(Array.from({ length: 12 }, (_, i) => { const t = i / 11; return new THREE.Vector2(Math.max(0.02, profile(t * 0.97) * 0.74), 0.25 + t * 0.97 * H); }), 7);
  core.translate(o.base.x, o.base.y, o.base.z);
  return { leaves, core, crown: { centre: new THREE.Vector3(o.base.x, o.base.y + H * 0.45, o.base.z), radius: new THREE.Vector3(R, H * 0.5, R) } };
}

// ---- Meadow ---------------------------------------------------------------------------------------------

/**
 * A tuft card cluster, unit height and width: `quads` vertical cards crossing at
 * the centre, each bowed outward and split into `rows` so wind can bend it.
 * Normals lean up so tufts take the light like the ground they stand on.
 */
export function tuftGeometry(column: number, columns: number, quads: number, rows: number, seed: number) {
  const random = seeded(seed);
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], colors: number[] = [], indices: number[] = [];
  for (let q = 0; q < quads; q++) {
    const phi = (q / quads) * Math.PI + (random() - 0.5) * 0.3;
    const dx = Math.cos(phi), dz = Math.sin(phi);
    const bow = (random() < 0.5 ? -1 : 1) * 0.1;
    const shift = (random() - 0.5) * 0.12;
    const start = positions.length / 3;
    for (let r = 0; r <= rows; r++) {
      const v = r / rows;
      for (let c = 0; c <= 1; c++) {
        const u = c;
        const x = (u - 0.5) * (1 + v * 0.15);
        const offset = bow * v * v;
        positions.push(dx * x - dz * (offset + shift), v, dz * x + dx * (offset + shift));
        const n = new THREE.Vector3(-dz * 0.25, 1, dx * 0.25).normalize();
        normals.push(n.x, n.y, n.z);
        uvs.push((column + u) / columns, v);
        const ao = 0.3 + 0.7 * Math.pow(v, 0.7);
        colors.push(ao, ao, ao);
      }
    }
    for (let r = 0; r < rows; r++) {
      const a = start + r * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  return geometry;
}

export interface TuftPlacement { x: number; y: number; z: number; yaw: number; width: number; height: number; tint: THREE.Color }

export function instanceTufts(geometry: THREE.BufferGeometry, material: THREE.Material, placements: TuftPlacement[]) {
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, placements.length));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler();
  placements.forEach((t, i) => {
    q.setFromEuler(e.set(0, t.yaw, 0));
    m.compose(p.set(t.x, t.y, t.z), q, s.set(t.width, t.height, t.width));
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, t.tint);
  });
  mesh.count = placements.length;
  mesh.castShadow = false; mesh.receiveShadow = true;
  mesh.computeBoundingSphere();
  return mesh;
}

// ---- Far landscape ------------------------------------------------------------------------------------

/** Height of the far ridges (metres) at x for ridge 0 (nearer, farmed) and 1 (far, blue). */
export function ridgeHeight(x: number, ridge: number) {
  return ridge === 0
    ? 21 + 9 * fbm3(x * 0.012, 0, 2.5, 4) + 5 * Math.sin(x * 0.021 + 0.6)
    : 52 + 18 * fbm3(x * 0.006, 3, 7.5, 4) + 8 * Math.sin(x * 0.009 + 2.1);
}

/** A ridge sheet: crest at z = crestZ rising from the valley floor in front of it. */
export function ridgeGeometry(ridge: number, crestZ: number, depth: number, width: number, columns: number) {
  const g = new THREE.PlaneGeometry(width, depth, columns, 16);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), local = p.getZ(i) / depth + 0.5; // 0 at the back (crest) .. 1 at the front
    const crest = ridgeHeight(x, ridge);
    const y = crest * Math.pow(Math.max(0, 1 - local), 0.75) - 2 + noise3(x * 0.05, local * 3, ridge + 4) * 1.2;
    p.setXYZ(i, x, y, crestZ + local * depth);
  }
  g.computeVertexNormals();
  return g;
}

/** Height on a ridge sheet at (x, z), matching ridgeGeometry. */
export function ridgeSurface(ridge: number, crestZ: number, depth: number, x: number, z: number) {
  const local = (z - crestZ) / depth;
  return ridgeHeight(x, ridge) * Math.pow(Math.max(0, 1 - local), 0.75) - 2 + noise3(x * 0.05, local * 3, ridge + 4) * 1.2;
}

/** Low, noisy blob for distant tree crowns (instanced). */
export function blobGeometry(seed: number) {
  const g = new THREE.IcosahedronGeometry(1, 1);
  const p = g.attributes.position;
  const colors: number[] = [];
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const k = 1 + 0.22 * noise3(x * 2.1 + seed, y * 2.1, z * 2.1);
    p.setXYZ(i, x * k, Math.max(-0.35, y) * k, z * k);
    const ao = 0.45 + 0.55 * THREE.MathUtils.smoothstep(y, -0.6, 0.8);
    colors.push(ao, ao, ao);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

/** Hip-roofed farmhouses with terracotta roofs, merged with vertex colours. */
export function farmhouseGeometry(houses: Array<{ x: number; y: number; z: number; w: number; d: number; h: number; yaw: number; wall: THREE.Color; roof: THREE.Color }>) {
  const parts: THREE.BufferGeometry[] = [];
  const paint = (g: THREE.BufferGeometry, c: THREE.Color) => {
    const g2 = g.index ? g.toNonIndexed() : g;
    const colors = new Float32Array(g2.attributes.position.count * 3);
    for (let i = 0; i < colors.length; i += 3) colors.set([c.r, c.g, c.b], i);
    g2.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    g2.deleteAttribute('uv');
    return g2;
  };
  for (const h of houses) {
    const m = new THREE.Matrix4().compose(new THREE.Vector3(h.x, h.y, h.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, h.yaw, 0)), new THREE.Vector3(1, 1, 1));
    const walls = new THREE.BoxGeometry(h.w, h.h, h.d); walls.translate(0, h.h / 2 - 1, 0);
    const roof = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1); roof.rotateY(Math.PI / 4); roof.scale(h.w * 1.12, h.h * 0.42, h.d * 1.12); roof.translate(0, h.h - 1 + h.h * 0.21, 0);
    for (const [g, c] of [[walls, h.wall], [roof, h.roof]] as const) { const painted = paint(g, c); painted.applyMatrix4(m); parts.push(painted); if (painted !== g) g.dispose(); }
  }
  const out = new THREE.BufferGeometry();
  const count = parts.reduce((n, g) => n + g.attributes.position.count, 0);
  for (const name of ['position', 'normal', 'color']) {
    const array = new Float32Array(count * 3); let offset = 0;
    for (const g of parts) { array.set(g.attributes[name].array as Float32Array, offset); offset += g.attributes[name].count * 3; }
    out.setAttribute(name, new THREE.BufferAttribute(array, 3));
  }
  parts.forEach(g => g.dispose());
  return out;
}

/**
 * Multiplicative soft shadows under trees beyond the shadow map (one instanced
 * quad each, offset along the sun): darkens the lit ground beneath distant crowns.
 */
export function shadowDecals(spots: Array<{ x: number; y: number; z: number; radius: number; height: number; strength: number; normal?: THREE.Vector3 }>) {
  const geometry = new THREE.PlaneGeometry(1, 1); geometry.rotateX(-Math.PI / 2);
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
    vertexShader: /* glsl */ `attribute float aStrength; varying vec2 vUv; varying float vStrength; varying vec3 vSeed;
void main(){ vUv = uv; vStrength = aStrength; vSeed = instanceMatrix[3].xyz; gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `varying vec2 vUv; varying float vStrength; varying vec3 vSeed;
void main(){ vec2 q = vUv * 2.0 - 1.0; float a = atan(q.y, q.x);
  float edge = 0.78 + 0.12 * sin(a * 3.0 + vSeed.x) + 0.08 * sin(a * 7.0 + vSeed.z);
  float s = (1.0 - smoothstep(edge * 0.55, edge, length(q))) * vStrength;
  gl_FragColor = vec4(vec3(1.0 - s), 1.0); }`,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, spots.length));
  const strength = new Float32Array(Math.max(1, spots.length));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  spots.forEach((s, i) => {
    const offset = s.height / TO_SUN.y;
    const cx = s.x - TO_SUN.x * offset, cz = s.z - TO_SUN.z * offset;
    q.setFromUnitVectors(up, s.normal ?? up);
    // Stretched along the sun's ground direction, as a low sun stretches shadows.
    const stretch = 1 + Math.hypot(TO_SUN.x, TO_SUN.z) / TO_SUN.y * 0.35;
    const yaw = new THREE.Quaternion().setFromAxisAngle(up, Math.atan2(TO_SUN.x, TO_SUN.z));
    m.compose(new THREE.Vector3(cx, s.y + 0.04, cz), q.multiply(yaw), new THREE.Vector3(s.radius * 2, 1, s.radius * 2 * stretch));
    mesh.setMatrixAt(i, m);
    strength[i] = s.strength;
  });
  geometry.setAttribute('aStrength', new THREE.InstancedBufferAttribute(strength, 1));
  mesh.count = spots.length;
  mesh.castShadow = mesh.receiveShadow = false;
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  return mesh;
}
