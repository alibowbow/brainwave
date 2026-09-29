import * as THREE from 'three';
import { createTarget, FullscreenPass, passMaterial } from './fullscreen';
import type { RainSimulation, Stamp } from './rainSimulation';

/*
 * The rain simulation is turned into a height field of water on the glass
 * (R: bead and drop height in mm, G: thin film left by running drops).
 * Beads accumulate in a persistent target that moving drops wipe clean;
 * each frame the live drops are max-blended on top of a copy of it.
 */

/** Spherical cap with a 60° contact angle, normalised to 1 at its centre. */
const CAP_R2 = 4 / 3;
const CAP_C = 0.5773503;
const CAP_NORM = 1.7320508;
const CAP_HEIGHT = 0.5773503;

const STAMP_VERTEX = /* glsl */ `
attribute vec4 aA;
attribute vec4 aB;
uniform vec2 uSizeMM;
varying vec2 vP;
varying vec4 vA;
varying vec4 vB;
void main() {
  vec2 a = aA.xy;
  vec2 b = aA.zw;
  vec2 radius = aB.xy * 1.08;
  vec2 center = 0.5 * (a + b);
  vec2 extent = 0.5 * abs(b - a) + radius;
  vec2 p = center + position.xy * extent;
  vP = p;
  vA = aA;
  vB = aB;
  vec2 uv = vec2(p.x / uSizeMM.x, 1.0 - p.y / uSizeMM.y);
  gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0);
}
`;

const SHAPE = /* glsl */ `
varying vec2 vP;
varying vec4 vA;
varying vec4 vB;
vec2 shapeOffset() {
  vec2 radius = vB.xy;
  vec2 pa = (vP - vA.xy) / radius;
  vec2 ba = (vA.zw - vA.xy) / radius;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return pa - ba * h;
}
float capHeight(float rho2) {
  return (sqrt(${CAP_R2.toFixed(6)} - rho2) - ${CAP_C.toFixed(6)}) * ${CAP_NORM.toFixed(6)};
}
`;

const DROP_FRAGMENT = /* glsl */ `
${SHAPE}
void main() {
  vec2 q = shapeOffset();
  float moving = vB.w;
  // Sliding drops sag into a teardrop: a narrow tail up the glass, a full bottom.
  float tail = smoothstep(0.0, 1.0, -q.y);
  q.x /= max(0.3, 1.0 - 0.52 * moving * tail);
  q.y *= mix(1.0, 0.92, moving * step(0.0, q.y));
  float rho2 = dot(q, q);
  if (rho2 >= 1.0) discard;
  gl_FragColor = vec4(capHeight(rho2) * vB.z, 0.0, 0.0, 0.0);
}
`;

const ERASE_FRAGMENT = /* glsl */ `
${SHAPE}
void main() {
  float rho = length(shapeOffset());
  if (rho >= 1.0) discard;
  float mask = 1.0 - smoothstep(0.6, 1.0, rho);
  gl_FragColor = vec4(1.0 - mask, 1.0, 1.0, 1.0);
}
`;

const FILM_FRAGMENT = /* glsl */ `
${SHAPE}
void main() {
  vec2 q = shapeOffset();
  float rho2 = dot(q, q);
  if (rho2 >= 1.0) discard;
  // A rivulet is a thin cylinder of water: rounded across its width.
  gl_FragColor = vec4(0.0, vB.z * sqrt(1.0 - rho2), 0.0, 0.0);
}
`;

const DECAY_FRAGMENT = /* glsl */ `
uniform vec2 uDecay;
void main() {
  gl_FragColor = vec4(uDecay, 1.0, 1.0);
}
`;

const COPY_FRAGMENT = /* glsl */ `
uniform sampler2D tSource;
varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(tSource, vUv);
}
`;

// The stamp shader flips y into texture space, which reverses the winding.
const maxBlend = {
  side: THREE.DoubleSide,
  transparent: true,
  depthTest: false,
  depthWrite: false,
  blending: THREE.CustomBlending,
  blendEquation: THREE.MaxEquation,
  blendSrc: THREE.OneFactor,
  blendDst: THREE.OneFactor,
} as const;

const multiplyBlend = {
  side: THREE.DoubleSide,
  transparent: true,
  depthTest: false,
  depthWrite: false,
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.ZeroFactor,
  blendDst: THREE.SrcColorFactor,
} as const;

class StampBatch {
  readonly geometry = new THREE.InstancedBufferGeometry();
  readonly mesh: THREE.Mesh;
  private a = new Float32Array(0);
  private b = new Float32Array(0);
  private attributeA!: THREE.InstancedBufferAttribute;
  private attributeB!: THREE.InstancedBufferAttribute;
  count = 0;

  constructor(material: THREE.Material, capacity = 1024) {
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3));
    this.geometry.setIndex([0, 1, 2, 0, 2, 3]);
    this.allocate(capacity);
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.frustumCulled = false;
  }

  private allocate(capacity: number) {
    const a = new Float32Array(capacity * 4);
    const b = new Float32Array(capacity * 4);
    a.set(this.a.subarray(0, Math.min(this.a.length, a.length)));
    b.set(this.b.subarray(0, Math.min(this.b.length, b.length)));
    this.a = a;
    this.b = b;
    this.attributeA = new THREE.InstancedBufferAttribute(a, 4).setUsage(THREE.DynamicDrawUsage);
    this.attributeB = new THREE.InstancedBufferAttribute(b, 4).setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute('aA', this.attributeA);
    this.geometry.setAttribute('aB', this.attributeB);
  }

  push(x: number, y: number, px: number, py: number, rx: number, ry: number, value: number, extra: number) {
    if (this.count * 4 >= this.a.length) this.allocate(Math.ceil(this.a.length / 4 * 1.6) + 64);
    const i = this.count * 4;
    this.a[i] = x; this.a[i + 1] = y; this.a[i + 2] = px; this.a[i + 3] = py;
    this.b[i] = rx; this.b[i + 1] = ry; this.b[i + 2] = value; this.b[i + 3] = extra;
    this.count++;
  }

  commit() {
    this.geometry.instanceCount = this.count;
    this.attributeA.clearUpdateRanges();
    this.attributeB.clearUpdateRanges();
    this.attributeA.addUpdateRange(0, this.count * 4);
    this.attributeB.addUpdateRange(0, this.count * 4);
    this.attributeA.needsUpdate = true;
    this.attributeB.needsUpdate = true;
  }

  reset() { this.count = 0; }

  dispose() { this.geometry.dispose(); }
}

export interface WaterRegion {
  /** World-space rectangle on the glass, in metres. */
  x0: number; y0: number; x1: number; y1: number;
}

export class WaterMap {
  width = 1;
  height = 1;
  region: WaterRegion = { x0: 0, y0: 0, x1: 1, y1: 1 };
  readonly sizeMM = new THREE.Vector2(1, 1);
  private beads: THREE.WebGLRenderTarget | null = null;
  private water: THREE.WebGLRenderTarget | null = null;
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly pass = new FullscreenPass();
  private readonly uniforms = { uSizeMM: { value: this.sizeMM } };
  private readonly dropMaterial = new THREE.ShaderMaterial({ vertexShader: STAMP_VERTEX, fragmentShader: DROP_FRAGMENT, uniforms: this.uniforms, ...maxBlend });
  private readonly beadMaterial = new THREE.ShaderMaterial({ vertexShader: STAMP_VERTEX, fragmentShader: DROP_FRAGMENT, uniforms: this.uniforms, ...maxBlend });
  private readonly eraseMaterial = new THREE.ShaderMaterial({ vertexShader: STAMP_VERTEX, fragmentShader: ERASE_FRAGMENT, uniforms: this.uniforms, ...multiplyBlend });
  private readonly filmMaterial = new THREE.ShaderMaterial({ vertexShader: STAMP_VERTEX, fragmentShader: FILM_FRAGMENT, uniforms: this.uniforms, ...maxBlend });
  private readonly decayMaterial = passMaterial(DECAY_FRAGMENT, { uDecay: { value: new THREE.Vector2(1, 1) } }, multiplyBlend);
  private readonly copyMaterial = passMaterial(COPY_FRAGMENT, { tSource: { value: null } });
  private readonly drops = new StampBatch(this.dropMaterial, 3000);
  private readonly beadStamps = new StampBatch(this.beadMaterial, 4096);
  private readonly eraseStamps = new StampBatch(this.eraseMaterial, 512);
  private readonly filmStamps = new StampBatch(this.filmMaterial, 512);
  private pendingTicks = 0;
  private needsClear = true;

  constructor(private readonly renderer: THREE.WebGLRenderer) {}

  get texture() { return this.water!.texture; }

  get targets() { return { beads: this.beads, water: this.water }; }

  /** Resize to cover `region` at `texelsPerMM`; returns true when the targets were rebuilt. */
  setRegion(region: WaterRegion, texelsPerMM: number) {
    const widthMM = (region.x1 - region.x0) * 1000;
    const heightMM = (region.y1 - region.y0) * 1000;
    const width = Math.max(64, Math.min(4096, Math.round(widthMM * texelsPerMM)));
    const height = Math.max(64, Math.min(4096, Math.round(heightMM * texelsPerMM)));
    this.region = { ...region };
    this.sizeMM.set(widthMM, heightMM);
    if (this.beads && width === this.width && height === this.height) return false;
    this.width = width;
    this.height = height;
    this.beads?.dispose();
    this.water?.dispose();
    const options = { type: THREE.HalfFloatType, format: THREE.RGFormat, filter: THREE.LinearFilter } as const;
    this.beads = createTarget(width, height, options);
    this.water = createTarget(width, height, options);
    this.needsClear = true;
    return true;
  }

  /** Queue what one simulation tick changed on the glass. */
  collect(sim: RainSimulation) {
    this.pendingTicks++;
    for (const bead of sim.droplets) {
      this.beadStamps.push(bead.x, bead.y, bead.x, bead.y, bead.r, bead.r, bead.r * CAP_HEIGHT, 0);
    }
    for (const channel of sim.clearings) {
      const px = channel.px ?? channel.x;
      const py = channel.py ?? channel.y;
      this.eraseStamps.push(channel.x, channel.y, px, py, channel.r * 1.25, channel.r * 1.6, 1, 0);
      this.filmStamps.push(channel.x, channel.y, px, py, channel.r * 0.42, channel.r * 0.8, 0.1 + channel.r * 0.03, 0);
    }
  }

  /** Stamp beads directly (used to pre-wet the pane). */
  sprinkle(beads: Stamp[]) {
    for (const bead of beads) this.beadStamps.push(bead.x, bead.y, bead.x, bead.y, bead.r, bead.r, bead.r * CAP_HEIGHT, 0);
  }

  render(sim: RainSimulation) {
    const renderer = this.renderer;
    const previousClear = renderer.getClearAlpha();
    const clearColor = renderer.getClearColor(new THREE.Color());
    if (this.needsClear) {
      renderer.setRenderTarget(this.beads);
      renderer.setClearColor(0x000000, 0);
      renderer.clear(true, false, false);
      this.needsClear = false;
    }
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;

    if (this.pendingTicks > 0) {
      // Beads slowly evaporate or merge away; film dries faster.
      this.decayMaterial.uniforms.uDecay.value.set(Math.pow(0.99965, this.pendingTicks), Math.pow(0.9975, this.pendingTicks));
      this.pass.render(renderer, this.decayMaterial, this.beads);
    }
    renderer.setRenderTarget(this.beads);
    for (const batch of [this.eraseStamps, this.filmStamps, this.beadStamps]) {
      if (!batch.count) continue;
      batch.commit();
      renderer.render(batch.mesh, this.camera);
      batch.reset();
    }
    this.pendingTicks = 0;

    this.copyMaterial.uniforms.tSource.value = this.beads!.texture;
    this.pass.render(renderer, this.copyMaterial, this.water);

    this.drops.reset();
    for (const drop of sim.drops) {
      if (drop.killed) continue;
      const moving = Math.min(1, drop.momentum / 0.35);
      const rx = drop.r * (1 + drop.spreadX * 0.5);
      const ry = drop.r * (1.12 + 0.28 * moving) * (1 + drop.spreadY * 0.5);
      this.drops.push(drop.x, drop.y, drop.x, drop.y, rx, ry, drop.r * CAP_HEIGHT * (1 - 0.15 * moving), moving);
    }
    if (this.drops.count) {
      this.drops.commit();
      renderer.setRenderTarget(this.water);
      renderer.render(this.drops.mesh, this.camera);
    }

    renderer.autoClear = autoClear;
    renderer.setClearColor(clearColor, previousClear);
  }

  dispose() {
    this.beads?.dispose();
    this.water?.dispose();
    for (const batch of [this.drops, this.beadStamps, this.eraseStamps, this.filmStamps]) batch.dispose();
    for (const material of [this.dropMaterial, this.beadMaterial, this.eraseMaterial, this.filmMaterial, this.decayMaterial, this.copyMaterial]) material.dispose();
    this.pass.dispose();
  }
}
