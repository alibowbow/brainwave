import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LiveSceneHost, type LiveSceneEngine, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { fittedFov, frames, selectFrame } from './framing';
const ROOT = '/immersive-worlds/mosi/';
// The QA harness can start the scene clock later to compare moments on slow rasterisers.
let qaStartTime = 0;
export function setMosiQaStartTime(seconds: number) { qaStartTime = Number.isFinite(seconds) && seconds > 0 ? seconds : 0; }

/**
 * How each authored part moves (code only; the baked Cycles color stays locked to it):
 * x = sway weight, y = phase, z = 1 for the hanging ramie, 0 for the garden outside.
 * The four panels hang from the header and swing a centimetre or two at the hem, each on its
 * own slow phase, as if a breath of air came through; leaves and twigs beyond stir a little.
 */
function swayOf(name: string, box: THREE.Box3, y: number) {
  // GLTFLoader sanitises node names (spaces become underscores).
  const panel = /hanging[\s_]membrane|sewn[\s_]overlap|suspension[\s_]tab/i.test(name);
  const garden = /garden[\s_]leaf|curved[\s_]twig|living[\s_]branch/i.test(name);
  if (!panel && !garden) return [0, 0, 0];
  const centreX = (box.min.x + box.max.x) / 2;
  if (panel) {
    const index = THREE.MathUtils.clamp(Math.floor((centreX + 1.8) / .9), 0, 3);
    const hang = THREE.MathUtils.clamp((3.3 - y) / 3.0, 0, 1);
    return [Math.pow(hang, 1.6), index * 1.9 + .4, 1];
  }
  return [.6 + .4 * THREE.MathUtils.clamp((box.max.y - y) / Math.max(box.max.y - box.min.y, .01), 0, 1), centreX * 2.3 + box.min.z, 0];
}

const MOTE_VERTEX = /* glsl */ `
attribute vec4 seed;
uniform float uTime;
uniform float uPixel;
varying float vLight;
void main() {
  // Each mote drifts on its own slow loop through the backlit air in front of the panels.
  vec3 box = vec3(3.4, 3.1, 2.6);
  vec3 p = seed.xyz * box;
  p += vec3(sin(uTime * .05 + seed.w * 6.3) * .25, uTime * (.006 + .01 * seed.w), cos(uTime * .043 + seed.w * 4.1) * .2);
  p = mod(p, box) - vec3(1.7, 0.0, 0.0);
  p.z = -2.0 + p.z;
  // Light comes in through the panels and the gaps: motes glow nearest them and in the low sun on the floor.
  float nearPanels = smoothstep(.6, -1.8, p.z);
  float lowSun = smoothstep(1.4, .2, p.y) * .6;
  float twinkle = .55 + .45 * sin(uTime * (.6 + seed.w) + seed.x * 40.0);
  vLight = (nearPanels + lowSun) * twinkle;
  vec4 view = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * view;
  gl_PointSize = clamp(uPixel * (.012 + .012 * seed.w) / -view.z, 1.5, 9.0);
}`;
const MOTE_FRAGMENT = /* glsl */ `
varying float vLight;
void main() {
  float r = length(gl_PointCoord - .5) * 2.0;
  float a = exp(-r * r * 4.0) * (1.0 - smoothstep(.8, 1.0, r)) * vLight;
  gl_FragColor = vec4(vec3(1.0, .93, .8) * a * .3, 1.0);
}`;

/** Actual Blender geometry, with view-dependent Cycles color projection.
 * Lighting is baked, not a runtime path tracer; keep navigation within the authored view.
 * Code adds only life: texture-locked cloth sway, stirring leaves, drifting motes and a slow light breath. */
export class MosiEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();
  private projector = new THREE.PerspectiveCamera();
  private mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  private motes: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  private readonly time = { value: 0 };
  private textures = new Map<string, THREE.Texture>();
  private disposed = false;
  private aspect = 1;
  private frameName = '';
  private raf = 0;
  private previous = 0;
  private elapsed = qaStartTime;
  private look = new THREE.Vector2();
  private targetLook = new THREE.Vector2();
  private baseQuaternion = new THREE.Quaternion();
  private lost: (event: Event) => void;
  constructor(private canvas: HTMLCanvasElement, onLost: () => void) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.lost = event => { event.preventDefault(); onLost(); };
    canvas.addEventListener('webglcontextlost', this.lost);
  }
  async init() {
    const textureLoader = new THREE.TextureLoader();
    // allSettled ensures successfully loaded resources are cleaned if any request fails.
    const results = await Promise.allSettled([
      new GLTFLoader().loadAsync(ROOT + 'mosi-room.glb'),
      ...frames.map(async row => {
        const texture = await textureLoader.loadAsync(ROOT + row.name + '.webp');
        texture.colorSpace = THREE.SRGBColorSpace;
        if (this.disposed) texture.dispose(); else this.textures.set(row.name, texture);
        return null;
      }),
    ]);
    const loaded = results[0];
    if (loaded.status === 'fulfilled' && loaded.value && 'scene' in loaded.value) {
      const model = loaded.value.scene;
      model.updateMatrixWorld(true);
      const parts: THREE.BufferGeometry[] = [];
      model.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        if (!this.disposed) {
          const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
          geometry.applyMatrix4(object.matrixWorld);
          for (const key of Object.keys(geometry.attributes)) if (key !== 'position') geometry.deleteAttribute(key);
          geometry.computeBoundingBox();
          const position = geometry.getAttribute('position');
          const sway = new Float32Array(position.count * 3);
          for (let i = 0; i < position.count; i++) sway.set(swayOf(object.name, geometry.boundingBox!, position.getY(i)), i * 3);
          geometry.setAttribute('sway', new THREE.BufferAttribute(sway, 3));
          parts.push(geometry);
        }
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
      });
      if (!this.disposed && parts.length) {
        const geometry = mergeGeometries(parts)!;
        parts.forEach(part => part.dispose());
        const material = new THREE.ShaderMaterial({ side: THREE.DoubleSide, toneMapped: false,
          uniforms: { colorMap: { value: null }, projection: { value: new THREE.Matrix4() }, uTime: this.time },
          vertexShader: `uniform mat4 projection; uniform float uTime; attribute vec3 sway; varying vec4 projected; varying float vPanel;
            void main() { vec4 world = modelMatrix * vec4(position, 1.0);
              // The color is projected from the rest pose, so it stays locked to the moving cloth.
              projected = projection * world;
              float w = sway.x, phase = sway.y;
              vec3 offset = vec3(0.0);
              if (w > 0.0) {
                float gust = .6 + .4 * sin(uTime * .11 + phase * .3);
                if (sway.z > .5) offset = vec3(sin(uTime * .37 + phase * 2.1) * .022 + sin(uTime * .83 + phase) * .006, 0.0,
                  sin(uTime * .53 + phase) * .03 + sin(uTime * 1.21 + phase * 1.7) * .008) * w * gust;
                else offset = vec3(sin(uTime * .9 + phase) * .012 + sin(uTime * 2.3 + phase * 3.1) * .004, sin(uTime * 1.1 + phase * 1.3) * .006, 0.0) * w * gust;
              }
              vPanel = sway.z;
              gl_Position = projectionMatrix * viewMatrix * vec4(world.xyz + offset, 1.0); }`,
          fragmentShader: `uniform sampler2D colorMap; uniform float uTime; varying vec4 projected; varying float vPanel;
            float mosiHash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
            float mosiNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
              return mix(mix(mosiHash(i), mosiHash(i + vec2(1.0, 0.0)), f.x), mix(mosiHash(i + vec2(0.0, 1.0)), mosiHash(i + vec2(1.0, 1.0)), f.x), f.y); }
            void main() { vec2 uv = projected.xy / projected.w * .5 + .5;
              vec4 color = texture2D(colorMap, clamp(uv, vec2(0.0), vec2(1.0)));
              // A slow breath of the daylight beyond: only the sunlit cloth and floor streaks swell, by a few percent.
              float lit = smoothstep(.42, .85, dot(color.rgb, vec3(.3, .59, .11)));
              float breath = sin(uTime * .21) * .6 + sin(uTime * .077 + 1.3) * .4;
              color.rgb *= 1.0 + lit * breath * .045;
              // Soft shade of leaves stirring outside drifts over the sunlit cloth, most near the tree (upper left).
              if (vPanel > .5) {
                vec2 q = uv * vec2(9.0, 6.0);
                vec2 stir = vec2(sin(uTime * .43 + uv.y * 2.0), cos(uTime * .31 + uv.x * 1.7)) * .55;
                float leaves = mosiNoise(q + stir) * .6 + mosiNoise(q * 2.3 - stir * 1.6 + 4.1) * .4;
                float near = smoothstep(.2, .8, uv.y) * (1.0 - .45 * smoothstep(.3, .9, uv.x));
                color.rgb *= 1.0 - lit * smoothstep(.4, .7, leaves) * .2 * near;
              }
              gl_FragColor = color;
              #include <colorspace_fragment>
            }`,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        // Motes drifting in the backlit air, computed on the GPU from fixed seeds.
        const count = 180, seeds = new Float32Array(count * 4);
        let state = 1931;
        for (let i = 0; i < seeds.length; i++) { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; seeds[i] = state / 4294967296; }
        const moteGeometry = new THREE.BufferGeometry();
        moteGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
        moteGeometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 4));
        this.motes = new THREE.Points(moteGeometry, new THREE.ShaderMaterial({
          vertexShader: MOTE_VERTEX, fragmentShader: MOTE_FRAGMENT, uniforms: { uTime: this.time, uPixel: { value: 800 } },
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
        }));
        this.motes.frustumCulled = false;
        this.scene.add(this.motes);
      }
    }
    if (this.disposed) return;
    if (results.some(result => result.status === 'rejected') || !this.mesh) throw new Error('Mosi assets unavailable');
    this.configure();
  }
  setSize(width: number, height: number, dpr: number) {
    this.aspect = Math.max(1, width) / Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(2, Math.max(1, dpr)));
    this.renderer.setSize(Math.max(1, width), Math.max(1, height), false);
    if (this.motes) this.motes.material.uniforms.uPixel.value = Math.max(1, height) * this.renderer.getPixelRatio();
    this.configure();
  }
  private configure() {
    if (!this.mesh) return;
    const frame = selectFrame(this.aspect);
    this.projector.position.set(.85, .85, 1.5);
    this.projector.lookAt(0, frame.targetHeight, -2.1);
    this.projector.fov = 2 * Math.atan(18 / frame.lens) * 180 / Math.PI;
    this.projector.aspect = frame.aspect;
    this.projector.near = .01; this.projector.far = 100;
    this.projector.updateProjectionMatrix(); this.projector.updateMatrixWorld(true);
    this.camera.copy(this.projector);
    this.camera.aspect = this.aspect;
    this.camera.fov = fittedFov(frame.lens, frame.aspect, this.aspect);
    this.camera.updateProjectionMatrix();
    this.baseQuaternion.copy(this.camera.quaternion);
    if (this.frameName !== frame.name) {
      this.mesh.material.uniforms.projection.value.multiplyMatrices(this.projector.projectionMatrix, this.projector.matrixWorldInverse);
      this.mesh.material.uniforms.colorMap.value = this.textures.get(frame.name)!;
      this.frameName = frame.name;
      this.canvas.dataset.preset = frame.name;
    }
    this.renderFrame(0);
  }
  renderFrame(dt: number) {
    if (this.disposed || !this.mesh) return;
    const step = Math.max(0, Math.min(dt, .05)); this.elapsed += step;
    this.time.value = this.elapsed;
    this.look.lerp(this.targetLook, step ? 1 - Math.exp(-step * 7) : 1);
    this.camera.quaternion.copy(this.baseQuaternion).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(this.look.y, this.look.x, 0, 'YXZ')));
    this.renderer.render(this.scene, this.camera);
    this.canvas.dataset.frame = String(Number(this.canvas.dataset.frame || 0) + 1);
    this.canvas.dataset.elapsed = this.elapsed.toFixed(3);
    this.canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    this.canvas.dataset.drawCalls = String(this.renderer.info.render.calls);
  }
  start() { if (this.raf || this.disposed) return; this.previous = performance.now(); this.raf = requestAnimationFrame(this.tick); }
  private tick = (now: number) => { this.raf = 0; this.renderFrame((now - this.previous) / 1000); this.previous = now; if (!this.disposed) this.raf = requestAnimationFrame(this.tick); };
  stop() { cancelAnimationFrame(this.raf); this.raf = 0; this.targetLook.set(0, 0); this.look.set(0, 0); this.renderFrame(0); }
  drag(dx: number, dy: number) { this.targetLook.set(THREE.MathUtils.clamp(-dx * .012, -.006, .006), THREE.MathUtils.clamp(-dy * .008, -.004, .004)); }
  releaseDrag() { this.targetLook.set(0, 0); }
  dispose() {
    if (this.disposed) return;
    this.stop(); this.disposed = true;
    this.canvas.removeEventListener('webglcontextlost', this.lost);
    this.mesh?.geometry.dispose(); this.mesh?.material.dispose();
    this.motes?.geometry.dispose(); this.motes?.material.dispose();
    this.textures.forEach(texture => texture.dispose()); this.textures.clear();
    this.scene.clear(); this.renderer.dispose(); this.renderer.forceContextLoss();
  }
}
export class MosiHost extends LiveSceneHost<MosiEngine> {
  readonly kind = 'meditation' as const;
  constructor() { super({ canvasClass: 'sanctuary-canvas', disposeDelayMs: 0, isSupported: () => typeof window !== 'undefined', create: (canvas, onLost) => new MosiEngine(canvas, onLost) }); }
  interact(_holder: LiveSceneHolder, _x: number, _y: number) { return undefined; }
}
