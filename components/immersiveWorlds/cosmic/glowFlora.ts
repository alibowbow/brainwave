import * as THREE from 'three';
import { noise3, seeded } from '../shared/render/noise';
import { VegetationBuffer, addStrand, glowPulse, GLOW_HUES, type GlowLights, MAX_GLOW_LIGHTS } from './vegetation';

/*
 * Bioluminescent flora for the cosmic garden (original implementation).
 *  - Lantern lilies: a rosette of strap leaves and arching stems hung with
 *    translucent bells; a glowing pistil lights each bell from inside.
 *  - Glow caps: clusters of small mushrooms on the rim stones with luminous
 *    gills and faintly translucent caps.
 *  - Spark tendrils: tufts of fine stalks tipped with glowing beads.
 * Every plant pulses on its own slow phase (about fifteen seconds), and the
 * brightest clusters feed the garden's glow lights, so grass and stone near
 * them take a soft coloured light. Spores rise slowly from the plants and
 * fade, adding drifting motes the pond reflects.
 */

export type GlowKind = 'lantern' | 'caps' | 'tendrils';

export interface GlowPlanting {
  kind: GlowKind;
  x: number; z: number;
  /** Ground height at the plant (filled in by the garden). */
  y?: number;
  scale: number;
  seed: number;
  hue: number;
}

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);

/** A surface of revolution around `axis` (bells, caps, beads). */
function addLathe(buffer: VegetationBuffer, o: { centre: THREE.Vector3; axis: THREE.Vector3; profile: [number, number][]; radial: number; color: (t: number, out: THREE.Color) => THREE.Color; sway: number; phase: number; thin: number; glow?: (t: number) => number }) {
  const axis = o.axis.clone().normalize();
  const u = new THREE.Vector3().crossVectors(axis, Math.abs(axis.y) > .9 ? new THREE.Vector3(1, 0, 0) : UP).normalize();
  const v = new THREE.Vector3().crossVectors(axis, u).normalize();
  const base = buffer;
  const rows = o.profile.length;
  const color = new THREE.Color();
  const start = base.positions.length / 3;
  const saved = base.glowState[0];
  for (let r = 0; r < rows; r++) {
    const [radius, height] = o.profile[r];
    const t = r / (rows - 1);
    // Profile slope for the normal.
    const [r0, h0] = o.profile[Math.max(0, r - 1)], [r1, h1] = o.profile[Math.min(rows - 1, r + 1)];
    const dr = r1 - r0, dh = h1 - h0;
    if (o.glow) base.glowState[0] = o.glow(t);
    o.color(t, color);
    for (let s = 0; s < o.radial; s++) {
      const a = s / o.radial * TAU;
      const radial = u.clone().multiplyScalar(Math.cos(a)).addScaledVector(v, Math.sin(a));
      const p = o.centre.clone().addScaledVector(axis, height).addScaledVector(radial, radius);
      const n = radial.clone().multiplyScalar(dh).addScaledVector(axis, -dr).normalize();
      if (!Number.isFinite(n.x)) n.copy(axis);
      base.vertex(p, n, color, o.sway, o.phase, o.thin);
    }
  }
  base.glowState[0] = saved;
  for (let r = 0; r < rows - 1; r++) {
    for (let s = 0; s < o.radial; s++) {
      const a = start + r * o.radial + s, b = start + r * o.radial + (s + 1) % o.radial;
      base.indices.push(a, a + o.radial, b, b, a + o.radial, b + o.radial);
    }
  }
}

/** A curved strap leaf (two triangles per row). */
function addStrap(buffer: VegetationBuffer, root: THREE.Vector3, dir: THREE.Vector3, length: number, width: number, droop: number, color: THREE.Color, phase: number) {
  const across = new THREE.Vector3().crossVectors(dir, UP).normalize();
  const face = new THREE.Vector3().crossVectors(across, dir).normalize();
  if (face.y < 0) face.negate();
  const rows = 6, start = buffer.positions.length / 3;
  const c = new THREE.Color();
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    const w = width * Math.pow(Math.sin(Math.PI * Math.min(.98, t * .9 + .08)), .7);
    const p = root.clone().addScaledVector(dir, length * t);
    p.y -= droop * length * t * t;
    c.copy(color).multiplyScalar(.6 + .55 * t);
    for (const side of [-1, 1]) buffer.vertex(p.clone().addScaledVector(across, side * w * .5).addScaledVector(face, -Math.abs(side) * w * .12), face, c, .02 * t * t, phase, .9);
  }
  for (let r = 0; r < rows; r++) { const a = start + r * 2; buffer.indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
}

function growLantern(buffer: VegetationBuffer, p: GlowPlanting, base: THREE.Vector3) {
  const random = seeded(p.seed);
  const phase = random() * TAU;
  const s = p.scale;
  buffer.glowState = [0, p.hue, phase];
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU + random() * .4;
    const dir = new THREE.Vector3(Math.cos(a), .9 + random() * .5, Math.sin(a)).normalize();
    addStrap(buffer, base.clone().addScaledVector(dir, .02), dir, (.32 + random() * .18) * s, .045 * s, .9, new THREE.Color(.035, .07, .035), phase + i);
  }
  const stems = 3 + Math.floor(random() * 2);
  for (let k = 0; k < stems; k++) {
    const a = k / stems * TAU + random() * .8;
    const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const h = (.55 + random() * .35) * s;
    const reach = (.25 + random() * .2) * s;
    const points = [
      base.clone(),
      base.clone().addScaledVector(out, reach * .15).addScaledVector(UP, h * .55),
      base.clone().addScaledVector(out, reach * .6).addScaledVector(UP, h * .95),
      base.clone().addScaledVector(out, reach).addScaledVector(UP, h * .78),
    ];
    buffer.glowState = [.04, p.hue, phase];
    const curve = addStrand(buffer, { points, radius: [.008 * s, .004 * s], sides: 4, segments: 10, sway: .03 * s, phase, color: (t, c) => c.setRGB(.05, .09, .045).multiplyScalar(.8 + .4 * t) });
    const bells = 4 + Math.floor(random() * 3);
    for (let b = 0; b < bells; b++) {
      const t = .55 + .45 * b / bells;
      const at = curve.getPointAt(t);
      const size = (.045 + .02 * (1 - b / bells)) * s * (.85 + random() * .3);
      const hang = at.clone().add(new THREE.Vector3((random() - .5) * .03, -size * .9, (random() - .5) * .03));
      // A short pedicel, then the bell hanging mouth-down.
      buffer.glowState = [.04, p.hue, phase + t * 1.2];
      addStrand(buffer, { points: [at, at.clone().lerp(hang, .5).add(new THREE.Vector3(0, .01, 0)), hang], radius: [.003 * s, .002 * s], sides: 3, segments: 3, sway: .04 * s, phase, color: (_, c) => c.setRGB(.06, .09, .05) });
      buffer.glowState = [0, p.hue, phase + t * 1.2];
      addLathe(buffer, {
        centre: hang, axis: new THREE.Vector3((random() - .5) * .3, -1, (random() - .5) * .3), radial: 9, sway: .045 * s, phase, thin: 1,
        profile: [[.0, 0], [size * .35, size * .08], [size * .55, size * .35], [size * .62, size * .7], [size * .72, size * .95], [size * .9, size * 1.08]],
        color: (tt, c) => c.setRGB(.06, .10, .10).lerp(new THREE.Color(.16, .22, .22), tt),
        // Petals glow faintly, brightest at the flared mouth; the pistil carries the light.
        glow: tt => .06 + .42 * Math.pow(tt, 3.0),
      });
      buffer.glowState = [1.9, p.hue, phase + t * 1.2];
      addLathe(buffer, {
        centre: hang.clone().add(new THREE.Vector3(0, -size * .55, 0)), axis: UP, radial: 6, sway: .045 * s, phase, thin: 1,
        profile: [[0, -size * .22], [size * .16, -size * .12], [size * .18, 0], [size * .12, size * .12], [0, size * .2]],
        color: (_, c) => c.setRGB(.35, .42, .36),
      });
    }
  }
  buffer.glowState = [0, 0, 0];
}

function growCaps(buffer: VegetationBuffer, p: GlowPlanting, base: THREE.Vector3) {
  const random = seeded(p.seed);
  const phase = random() * TAU;
  const count = 6 + Math.floor(random() * 8);
  for (let i = 0; i < count; i++) {
    const a = random() * TAU, r = Math.sqrt(random()) * .16 * p.scale;
    const root = base.clone().add(new THREE.Vector3(Math.cos(a) * r, -.01, Math.sin(a) * r));
    const size = (.03 + random() * .045) * p.scale * (1 - r / (.2 * p.scale) * .4);
    const h = size * (1.4 + random() * 1.6);
    const lean = new THREE.Vector3(Math.cos(a) * .3 + (random() - .5) * .2, 1, Math.sin(a) * .3 + (random() - .5) * .2).normalize();
    const top = root.clone().addScaledVector(lean, h);
    const pulsePhase = phase + i * .35;
    buffer.glowState = [.25, p.hue, pulsePhase];
    addStrand(buffer, { points: [root, root.clone().lerp(top, .5).add(new THREE.Vector3(0, 0, 0)), top], radius: [size * .22, size * .16], sides: 5, segments: 3, sway: .002, phase, color: (_, c) => c.setRGB(.55, .58, .5), thin: .8 });
    // Gills: an emissive disc under the cap.
    buffer.glowState = [1.6, p.hue, pulsePhase];
    addLathe(buffer, { centre: top, axis: lean, radial: 10, sway: .002, phase, thin: 1, profile: [[size * .2, -size * .05], [size * .75, -size * .12], [size * .98, -size * .2]], color: (_, c) => c.setRGB(.7, .8, .75) });
    // Cap: a translucent dome, faintly lit from within.
    buffer.glowState = [.32, p.hue, pulsePhase];
    addLathe(buffer, {
      centre: top, axis: lean, radial: 10, sway: .002, phase, thin: 1,
      profile: [[size, -size * .2], [size * .95, size * .1], [size * .75, size * .38], [size * .42, size * .55], [0, size * .6]],
      color: (t, c) => c.setRGB(.30, .36, .42).lerp(new THREE.Color(.55, .62, .66), t),
      glow: t => .32 * (1 - t) + .1,
    });
  }
  buffer.glowState = [0, 0, 0];
}

function growTendrils(buffer: VegetationBuffer, p: GlowPlanting, base: THREE.Vector3) {
  const random = seeded(p.seed);
  const phase = random() * TAU;
  const count = 16 + Math.floor(random() * 14);
  for (let i = 0; i < count; i++) {
    const a = random() * TAU, r = Math.sqrt(random()) * .12 * p.scale;
    const root = base.clone().add(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    const h = (.22 + random() * .38) * p.scale;
    const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)).multiplyScalar(h * (.2 + random() * .35));
    const tip = root.clone().add(out).addScaledVector(UP, h);
    const mid = root.clone().addScaledVector(out, .3).addScaledVector(UP, h * .6).add(new THREE.Vector3(noise3(i, 1, p.seed) * .03, 0, noise3(i, 2, p.seed) * .03));
    const pulsePhase = phase + i * .5;
    buffer.glowState = [.06, p.hue, pulsePhase];
    addStrand(buffer, { points: [root, mid, tip], radius: [.0045 * p.scale, .0025 * p.scale], sides: 3, segments: 5, sway: .05 * p.scale, phase: phase + i, color: (t, c) => c.setRGB(.04, .06, .05).lerp(new THREE.Color(.10, .15, .13), t) });
    const bead = .012 * p.scale * (.8 + random() * .6);
    buffer.glowState = [1.5, p.hue, pulsePhase];
    addLathe(buffer, { centre: tip, axis: UP, radial: 6, sway: .05 * p.scale, phase: phase + i, thin: 1, profile: [[0, -bead], [bead * .8, -bead * .5], [bead, 0], [bead * .8, bead * .55], [0, bead]], color: (_, c) => c.setRGB(.16, .24, .22) });
  }
  buffer.glowState = [0, 0, 0];
}

/** Grows one bioluminescent planting into a glow-enabled buffer (`buffer.glow` set). */
export function growGlowPlanting(buffer: VegetationBuffer, p: GlowPlanting) {
  const base = new THREE.Vector3(p.x, p.y ?? 0, p.z);
  if (p.kind === 'lantern') growLantern(buffer, p, base);
  else if (p.kind === 'caps') growCaps(buffer, p, base);
  else growTendrils(buffer, p, base);
}

const SPORE_VERTEX = /* glsl */ `
attribute vec4 aSpore; // phase, rise speed, drift, hue
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uHues[4];
varying vec3 vColor;
varying float vAlpha;
void main() {
  float life = fract(uTime * aSpore.y * .028 + aSpore.x);
  vec3 p = position;
  // Spores lift off the glowing plants, wander and fade over half a minute.
  p.y += life * (.7 + aSpore.z * .9);
  p.x += sin(uTime * .21 + aSpore.x * 17.0) * .18 * life + sin(life * 6.0 + aSpore.x * 9.0) * .05;
  p.z += cos(uTime * .17 + aSpore.x * 11.0) * .18 * life;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float twinkle = .75 + .25 * sin(uTime * 1.3 + aSpore.x * 40.0);
  // Spores right in front of the lens would bloom into blobs: they fade out.
  vAlpha = smoothstep(0.0, .12, life) * (1.0 - smoothstep(.55, 1.0, life)) * twinkle * smoothstep(4.0, 6.0, -mv.z);
  vColor = uHues[int(aSpore.w + .5)];
  gl_PointSize = clamp(uPixelRatio * 26.0 / -mv.z, 1.5, 9.0 * uPixelRatio);
}
`;

const SPORE_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - .5) * 2.0;
  float core = exp(-d * d * 14.0) * 1.1 + exp(-d * d * 3.5) * .22;
  gl_FragColor = vec4(vColor * core * vAlpha * 1.4, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export interface GlowFloraOptions {
  plantings: GlowPlanting[];
  material: THREE.Material;
  glow: GlowLights;
  time: { value: number };
  /** Plants farther than this from the pond centre skip the reflection pass. */
  reflectionLayer: (planting: GlowPlanting) => number;
}

export function createGlowFlora(o: GlowFloraOptions) {
  const group = new THREE.Group();
  group.name = 'cosmic-bioluminescent-flora';
  const geometries: THREE.BufferGeometry[] = [];
  const buffers = new Map<number, VegetationBuffer>();
  const centres: { position: THREE.Vector3; strength: number; hue: number; phase: number }[] = [];
  for (const p of o.plantings) {
    const layer = o.reflectionLayer(p);
    let buffer = buffers.get(layer);
    if (!buffer) { buffer = new VegetationBuffer(); buffer.glow = []; buffers.set(layer, buffer); }
    const base = new THREE.Vector3(p.x, p.y ?? 0, p.z);
    const phase = seeded(p.seed)() * TAU;
    growGlowPlanting(buffer, p);
    centres.push({ position: base.clone().add(new THREE.Vector3(0, p.kind === 'lantern' ? .45 * p.scale : .12 * p.scale, 0)), strength: p.kind === 'lantern' ? 1.0 : p.kind === 'caps' ? .75 : .6, hue: p.hue, phase });
  }
  for (const [layer, buffer] of buffers) {
    const geometry = buffer.geometry(); geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, o.material);
    mesh.name = 'cosmic-glow-flora'; mesh.receiveShadow = true; mesh.layers.set(layer);
    group.add(mesh);
  }

  // Spores rising from the plants.
  const random = seeded(4401);
  const spores: number[] = [], sporeData: number[] = [];
  // Spores rise from the plants out in the garden, not those beside the seat:
  // a mote a few metres from the lens would bloom into a blob.
  const sources = o.plantings.filter(p => p.z < 1);
  for (let i = 0; i < 150 && sources.length; i++) {
    const p = sources[i % sources.length];
    const a = random() * TAU, r = random() * .5 * p.scale;
    spores.push(p.x + Math.cos(a) * r, (p.y ?? 0) + .1 + random() * .4, p.z + Math.sin(a) * r);
    sporeData.push(random(), .5 + random(), random(), p.hue);
  }
  const sporeGeometry = new THREE.BufferGeometry();
  sporeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(spores, 3));
  sporeGeometry.setAttribute('aSpore', new THREE.Float32BufferAttribute(sporeData, 4));
  sporeGeometry.computeBoundingSphere();
  if (sporeGeometry.boundingSphere) sporeGeometry.boundingSphere.radius += 2;
  geometries.push(sporeGeometry);
  const sporeMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: o.time, uPixelRatio: { value: 1 }, uHues: { value: GLOW_HUES.map(c => new THREE.Vector3(c.r, c.g, c.b)) } },
    vertexShader: SPORE_VERTEX, fragmentShader: SPORE_FRAGMENT,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const sporePoints = new THREE.Points(sporeGeometry, sporeMaterial);
  sporePoints.name = 'cosmic-glow-spores'; sporePoints.renderOrder = 5;
  sporePoints.onBeforeRender = renderer => { sporeMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio(); };
  group.add(sporePoints);

  // The strongest clusters light their surroundings.
  const ranked = centres.slice().sort((a, b) => b.strength - a.strength).slice(0, MAX_GLOW_LIGHTS);
  let disposed = false;
  return {
    group,
    interactables: group.children.filter(c => c instanceof THREE.Mesh),
    update(time: number) {
      const positions = o.glow.uniforms.uGlowPos.value, colors = o.glow.uniforms.uGlowColor.value;
      o.glow.uniforms.uGlowTime.value = time;
      for (let i = 0; i < MAX_GLOW_LIGHTS; i++) {
        const c = ranked[i];
        if (!c) { positions[i].set(0, 0, 0, 0); colors[i].setRGB(0, 0, 0); continue; }
        positions[i].set(c.position.x, c.position.y, c.position.z, .32);
        colors[i].copy(GLOW_HUES[c.hue]).multiplyScalar(.10 * c.strength * glowPulse(time, c.phase));
      }
    },
    dispose() {
      if (disposed) return; disposed = true;
      geometries.forEach(g => g.dispose()); sporeMaterial.dispose();
    },
  };
}
