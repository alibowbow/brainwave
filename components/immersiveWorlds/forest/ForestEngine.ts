import * as THREE from 'three';
import type { Reflector } from 'three/addons/objects/Reflector.js';
import type { LiveSceneEngine } from '../../liveScene/liveSceneHost';
import { LookSpring } from '../../liveScene/look';
import { HdrPipeline } from '../shared/render/hdrPipeline';
import { createTarget, disposeTarget } from '../shared/render/targets';
import type { ForestInteraction } from './forestHost';
import { createForestMaterials, createBroadleafPlant, createForegroundMaterials } from './botany';
import { forestRandom, groundHeight, forestPixelRatio, FOREST_LOOK, FOREST_FEEL } from './forestMath';
import { ForestFrameScheduler } from './forestFrameScheduler';
import { createForestTargetPolicy, createForestEnvironment, configureForestReflectionTarget, checkForestFramebuffer, type ForestFramebufferCheck, type ForestTargetPolicy } from './forestRenderTargets';
import { applyForestSurface, createCanopyCookie, createForestLightUniforms, createMistNoise, GLSL_CANOPY_LIGHT, SUN_COLOR, SUN_DIRECTION, SUN_INTENSITY, type CanopyCookie, type ForestLightUniforms } from './forestLight';
import { createProbeScene, createSky, createForestVolume, disposeProbeScene, FOREST_POST, forestFog } from './forestAtmosphere';
import { CanopyBuilder, WoodBuilder, createBarkMaterial, createCanopyMaterial, growLog, growSapling, growTree, type TreeSpec } from './forestTrees';
import { createCanopyAtlas, leafClusterGeometry } from './forestFoliage';
import { createFloatingLeaves, createGroundGeometry, createGroundMaterial, createUndergrowth } from './forestUndergrowth';
import { createForestStones } from './forestStones';
import { createForestWater } from './forestWater';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

export interface ForestEngineOptions {
  /** Owned QA byte-target path; chosen before any render target exists. */
  forceByteTargets?: boolean;
  /** Owned QA comparison: keep the direct renderer even where HDR targets work. */
  preferDirect?: boolean;
}

/** Original, seated eye-height woodland. All geometry and maps are generated locally. */
export class ForestEngine implements LiveSceneEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(55, 1, 0.06, 140);
  private look = new LookSpring(FOREST_LOOK, FOREST_FEEL);
  private rng = forestRandom();
  private clock = { value: 0 };
  private time = 0;
  private frame = 0;
  private scheduler: ForestFrameScheduler<{ dataUrl: string; width: number; height: number; time: number; method: 'same-task-webgl-png'; readbackMs: number }>;
  private requestedSize: { width: number; height: number; ratio: number } | null = null;
  private appliedSize: { width: number; height: number; ratio: number } | null = null;
  private requestedHolder: HTMLElement | null = null;
  private staticDirty = true;
  private running = false;
  private disposed = false;
  private ready = false;
  private reflection!: Reflector;
  private waterUniforms!: Record<string, THREE.IUniform>;
  private plants: THREE.Group[] = [];
  private solidSurfaces: THREE.Object3D[] = [];
  private birds: THREE.Group[] = [];
  private leafHitTime = -20;
  private leafHit: THREE.Group | null = null;
  private raycaster = new THREE.Raycaster();
  private onInteraction?: (event: ForestInteraction) => void;
  private resources: { dispose(): void }[] = [];
  private onLost: (event: Event) => void;
  private targetPolicy: ForestTargetPolicy;
  private auditedTargets = new WeakSet<THREE.WebGLRenderTarget>();
  /** HDR image pipeline; null keeps the direct renderer (byte targets, QA comparison, or no float targets). */
  private post: HdrPipeline | null = null;
  private postChecks: ForestFramebufferCheck[] = [];
  private postSceneTarget: THREE.WebGLRenderTarget | null = null;
  private light: ForestLightUniforms | null = null;
  private cookie: CanopyCookie | null = null;
  private mist: THREE.Texture | null = null;
  private directOnly: THREE.Object3D[] = [];

  constructor(private canvas: HTMLCanvasElement, onContextLost: () => void, private options: ForestEngineOptions = {}) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.targetPolicy = createForestTargetPolicy(this.renderer, options);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.95;
    this.renderer.shadowMap.enabled = true;
    // three r186 maps PCFSoft onto PCF; ask for PCF directly (same filtering, no warning).
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.shadowMap.autoUpdate = false;
    // Count both the planar reflection pass and the main pass honestly.
    this.renderer.info.autoReset = false;
    this.scheduler = new ForestFrameScheduler({
      gl: this.renderer.getContext() as WebGL2RenderingContext,
      canDraw: () => this.canvas.isConnected,
      draw: (dt) => this.drawFrame(dt),
      readback: () => {
        const started=performance.now(),dataUrl=this.canvas.toDataURL('image/png');
        return {dataUrl,width:this.canvas.width,height:this.canvas.height,time:this.time,method:'same-task-webgl-png',readbackMs:performance.now()-started};
      },
      requestFrame: (callback) => requestAnimationFrame(callback), cancelFrame: (request) => cancelAnimationFrame(request), now: () => performance.now(),
      onState: (state) => Object.assign(this.canvas.dataset, {
        gpuSubmitted: String(state.submitted), gpuSubmissionAttempts: String(state.submitted), gpuInitializationSubmitted: String(state.initializationSubmitted), gpuCompleted: String(state.completed),
        gpuPending: String(state.pending), gpuAbandoned: String(state.abandoned), gpuQueued: String(state.queued), gpuCaptures: String(state.captures),
        gpuFault: state.fault ?? '', running: String(state.running),
      }),
      onFault: () => { this.stop(); onContextLost(); },
    });
    this.onLost = (event) => {
      event.preventDefault(); this.canvas.dataset.contextLostAt = String(performance.now()); this.scheduler.contextLost();
    };
    canvas.addEventListener('webglcontextlost', this.onLost);
    canvas.dataset.frames = '0';
    canvas.dataset.time = '0';
    canvas.dataset.waterHits = '0';
    canvas.dataset.leafHits = '0';
  }

  async init() {
    this.buildWorld();
    this.createPipeline();
    this.renderer.shadowMap.needsUpdate = true;
    // Async compilation leaves React responsive while drivers prepare shaders.
    // On the HDR path every scene program renders into a linear float target
    // (main pass and reflection alike), so compile exactly those variants.
    const compileTarget = this.post ? createTarget(1, 1) : null;
    let compiling: Promise<unknown>;
    try {
      if (compileTarget) this.renderer.setRenderTarget(compileTarget);
      compiling = this.renderer.compileAsync(this.scene, this.camera);
    } finally {
      if (compileTarget) { this.renderer.setRenderTarget(null); disposeTarget(compileTarget); }
    }
    try { await compiling; }
    catch (error) { if (!this.disposed) throw error; }
    if (this.disposed) return;
    // PMREM preparation is real queued GL work too. Account for it before the
    // host requests the initial main frame, without reducing render quality.
    this.scheduler.trackInitialization();
    if (!this.disposed && !this.scheduler.state.fault) this.ready = true;
  }

  /** The HDR pipeline exists only where the forest's own policy found native, complete half-float targets. */
  private createPipeline() {
    const policy = this.targetPolicy;
    let reason: string;
    if (this.options.preferDirect) reason = 'preferred-direct';
    else if (!policy.halfFloatEnabled || policy.mode !== 'native-half-float') reason = policy.mode;
    else if (policy.checks.some((check) => !check.complete)) reason = 'framebuffer-incomplete';
    else {
      const probe = createTarget(4, 4, { depthTexture: true });
      let complete = false;
      try { complete = checkForestFramebuffer(this.renderer, probe, 'hdr-pipeline-preflight', policy.checks).complete; }
      finally { disposeTarget(probe); }
      const light = this.light, mist = this.mist;
      if (complete && light && mist) {
        this.post = HdrPipeline.create(this.renderer, { settings: FOREST_POST, volume: () => createForestVolume(light, mist) });
      }
      reason = this.post ? 'native-half-float' : complete ? 'pipeline-unavailable' : 'framebuffer-incomplete';
    }
    this.canvas.dataset.postReason = reason;
    this.setPostActive(!!this.post);
  }

  private setPostActive(active: boolean) {
    // The direct path has no volume pass: fog carries the aerial perspective
    // and a few soft shaft cards stand in for the volumetric light.
    this.scene.fog = forestFog(active);
    this.renderer.toneMappingExposure = active ? 1 : 0.95;
    for (const object of this.directOnly) object.visible = !active;
    this.canvas.dataset.post = this.post ? JSON.stringify(this.post.report) : 'direct';
  }

  private disablePost(reason: string) {
    this.post?.dispose(); this.post = null; this.postSceneTarget = null;
    this.canvas.dataset.postReason = reason;
    this.setPostActive(false);
  }

  private buildWorld() {
    const random = this.rng;
    this.cookie = createCanopyCookie(); this.resources.push(this.cookie);
    const mist = createMistNoise(); this.mist = mist; this.resources.push(mist);
    const light = this.light = createForestLightUniforms(this.cookie, this.clock);
    this.scene.background = new THREE.Color(0.08, 0.09, 0.06);
    this.camera.position.set(0, 1.42, 5.0);
    this.camera.lookAt(0, 1.65, -9);

    // One motivated key light: the low sun behind the canopy. Shadows come from
    // wood, stones and near plants; the canopy itself is the light cookie.
    const sun = new THREE.DirectionalLight(SUN_COLOR, SUN_INTENSITY);
    const focus = V(0, 0, -7);
    sun.position.copy(focus).addScaledVector(SUN_DIRECTION, 70);
    sun.target.position.copy(focus);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.03; sun.shadow.radius = 2.5;
    {
      const shadowCamera = sun.shadow.camera;
      shadowCamera.position.copy(sun.position); shadowCamera.lookAt(focus); shadowCamera.updateMatrixWorld();
      const box = new THREE.Box3(V(-16, -0.6, -30), V(16, 21, 7.5)), corner = V();
      const min = V(Infinity, Infinity, Infinity), max = V(-Infinity, -Infinity, -Infinity);
      for (let i = 0; i < 8; i++) {
        corner.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).applyMatrix4(shadowCamera.matrixWorldInverse);
        min.min(corner); max.max(corner);
      }
      Object.assign(shadowCamera, { left: min.x, right: max.x, bottom: min.y, top: max.y, near: 1, far: -min.z + 4 });
      shadowCamera.updateProjectionMatrix();
    }
    this.scene.add(sun, sun.target);
    // Fake bounce, small and local: warm light thrown up by the sunlit pool and
    // floor, and a dim green under the crowns. No flat fill.
    const poolBounce = new THREE.PointLight('#f0cf94', 2.4, 8, 2); poolBounce.position.set(0.6, 0.55, -0.8);
    const canopyBounce = new THREE.PointLight('#93b25c', 1.6, 16, 2); canopyBounce.position.set(-0.5, 4.5, -7);
    this.scene.add(poolBounce, canopyBounce);

    this.scene.add(createSky());
    const probe = createProbeScene();
    const environment = createForestEnvironment(this.renderer, probe, this.targetPolicy);
    disposeProbeScene(probe);
    // The byte path's prefiltered sky is far brighter than the canopy probe.
    this.scene.environment = environment.texture;
    this.scene.environmentIntensity = (environment.kind === 'byte-cubeuv' ? 0.22 : 1.3) * environment.intensityScale;
    this.canvas.dataset.environmentPath = environment.kind;
    this.resources.push(environment);

    const floor = new THREE.Mesh(createGroundGeometry(), createGroundMaterial(light));
    floor.name = 'forest-floor'; floor.receiveShadow = true;
    this.scene.add(floor); this.solidSurfaces.push(floor);

    // --- Trees: near, middle and far stands, all wood one mesh, all leaves one instanced draw.
    const specs: TreeSpec[] = [];
    const layout = [
      [-3.7, -0.2, 17, .62], [3.85, -1.8, 18, .7], [-6.3, -5.8, 19, .64], [5.9, -8, 18, .6],
      [-2.8, -9.8, 16, .43], [1.7, -12.6, 17, .42], [-7.8, -14, 18, .5], [8.2, -15, 19, .6],
      [-4.7, -19, 18, .5], [4.8, -23, 19, .48], [-.9, -25, 18, .44], [-10, -25, 20, .55],
      [11, -28, 19, .5], [-7, -32, 19, .47], [2.3, -35, 20, .44], [-3.5, -40, 20, .5],
      [8, -43, 20, .5], [-14, -38, 20, .6], [16, -41, 20, .62], [-10, -52, 20, .42],
      [.7, -53, 20, .4], [5, -62, 21, .42], [-7, -67, 21, .45], [15, -59, 20, .46],
      [-9, -3, 17, .45], [10, -4, 18, .5], [-13, -12, 18, .53], [14, -14, 18, .5], [-19, -22, 20, .56], [20, -25, 20, .58],
    ];
    layout.forEach(([x, z, height, radius], i) => specs.push({
      x, z, height, radius, detail: i < 5 ? 2 : i < 12 || i >= 24 ? 1 : 0, seed: 101 + i * 31,
      crownStart: i < 12 ? 0.36 : 0.4, toward: i < 4 ? [-0.2, -1.2] : undefined,
    }));
    for (let row = 0; row < 4; row++) for (let column = 0; column < 9; column++) {
      const x = (column - 4) * 6.4 + (random() - .5) * 4, z = -31 - row * 11 + (random() - .5) * 6;
      specs.push({ x, z, height: 17 + random() * 5, radius: .3 + random() * .2, detail: 0, seed: 2001 + row * 17 + column, crownStart: 0.36 });
    }
    // A sub-canopy of younger trees fills the middle distance with backlit leaves.
    const understory = forestRandom(3307);
    for (let i = 0; i < 26; i++) {
      const z = -7 - understory() * 34, x = (understory() - 0.5) * (16 + (-z) * 0.9);
      if (Math.abs(x) < 1.2 && z > -12) continue;
      specs.push({ x, z, height: 6 + understory() * 6, radius: .1 + understory() * .1, detail: 1, seed: 3401 + i * 13, crownStart: 0.3 });
    }
    // The surrounding stand closes the woodland beyond the frustum.
    const stand = forestRandom(9187);
    for (let row = 0; row < 6; row++) for (let column = 0; column < 22; column++) {
      const x = (column - 10.5) * 4.6 + (stand() - .5) * 2.8, z = -9 - row * 9 + (stand() - .5) * 4;
      if (Math.abs(x) < 9.5) continue;
      specs.push({ x, z, height: 15 + stand() * 6, radius: .22 + stand() * .2, detail: 0, seed: 5001 + row * 41 + column, crownStart: 0.34 });
    }
    const wood = new WoodBuilder(), canopy = new CanopyBuilder();
    for (const spec of specs) growTree(spec, wood, canopy);
    // Understory saplings of uneven age between the trunks.
    for (let i = 0; i < 34; i++) {
      const angle = random() * Math.PI * 2, distance = 4.5 + random() * 24;
      const x = Math.cos(angle) * distance * 1.2, z = Math.sin(angle) * distance - 9;
      if (z > 2 || Math.hypot((x + .18) / 2.55, (z + .55) / 3.45) < 1.5 || (Math.abs(x) < 2.2 && z > -6)) continue;
      growSapling(x, z, 1.4 + random() * 3.2, 7001 + i, wood, canopy);
    }
    const bark = createBarkMaterial(light, { key: 'trees', color: '#8a7f6c', moss: 0.8, upMoss: 0.7 });
    const trees = new THREE.Mesh(wood.build(), bark); trees.name = 'forest-trees';
    trees.castShadow = true; trees.receiveShadow = true; this.scene.add(trees);
    const atlas = createCanopyAtlas();
    const leaves = canopy.build(leafClusterGeometry(5), createCanopyMaterial(light, atlas, 'forest-canopy'));
    leaves.name = 'forest-canopy'; leaves.receiveShadow = true; this.scene.add(leaves);
    this.canvas.dataset.canopyClusters = String(leaves.count);

    // Fallen trunks: mossy, half sunk, broken at both ends. The far one holds the bird.
    const logs = new WoodBuilder();
    growLog(V(-4.7, groundHeight(-4.7, -5.95) + .1, -5.95), V(-0.85, groundHeight(-.85, -4.7) + .12, -4.7), .27, 61, logs);
    growLog(V(4.4, groundHeight(4.4, -11.5) + .15, -11.5), V(8.8, groundHeight(8.8, -9.2) + .2, -9.2), .34, 67, logs);
    growLog(V(-6.2, groundHeight(-6.2, -1.6) + .08, -1.6), V(-4.6, groundHeight(-4.6, 1.4) + .1, 1.4), .2, 71, logs, 1);
    const logMesh = new THREE.Mesh(logs.build(), createBarkMaterial(light, { key: 'logs', color: '#7a6d58', moss: 0.6, upMoss: 1 }));
    logMesh.name = 'forest-fallen-wood'; logMesh.castShadow = true; logMesh.receiveShadow = true;
    this.scene.add(logMesh); this.solidSurfaces.push(logMesh);

    const stones = createForestStones(light, random, this.clock);
    this.scene.add(stones); this.solidSurfaces.push(stones.children[0]);
    this.addWater(light);
    this.scene.add(createFloatingLeaves(light, 811));
    const undergrowth = createUndergrowth(light, 4411);
    this.scene.add(undergrowth.group);

    // Large, physically near leaves frame the sitting place without blocking
    // the pool. Wet foreground leaves and droplets move together at the stem.
    const materials = createForestMaterials();
    applyForestSurface(materials.leaf, light, { key: 'forest-wet-leaf', translucency: 0.9 });
    applyForestSurface(materials.twig, light, { key: 'forest-near-stem', translucency: 0.3 });
    const foregroundMaterials = createForegroundMaterials(materials);
    // Dew: tiny, very smooth caps; the HDR sun makes their highlight sparkle.
    applyForestSurface(foregroundMaterials.dew, light, { key: 'forest-dew' });
    materials.dew.dispose();
    for (const [x,z,s] of [[-1.65,3.22,1.10],[1.95,3.02,.95],[-.48,3.48,.82],[.66,3.58,.65],[-2.95,1.4,1.2],[2.85,.7,.92],[-2.1,-2.8,.8]]) {
      const foreground = z > 3;
      const plant = createBroadleafPlant(foreground ? foregroundMaterials : {...materials,dew:foregroundMaterials.dew}, random, s, foreground);
      plant.position.set(x, groundHeight(x,z), z); plant.rotation.y = random() * 6.28;
      plant.userData.baseRotation = plant.rotation.z;
      // Dew reads only the canopy cookie, so caps in a sunfleck sparkle even where
      // the static shadow map is too coarse to resolve a 1 cm droplet.
      plant.traverse((object) => { const dew = object.name === 'forest-leaf-dew'; object.castShadow = !dew; object.receiveShadow = !dew; });
      this.plants.push(plant); this.scene.add(plant);
    }

    this.addBirds(light);
    this.addDirectShafts();
    this.addMotes(light);
  }

  /** Audit the actual lazily-created shadow FBO after Three allocates it. */
  private auditRenderTargets() {
    // The directional PCF shadow allocates a byte colour attachment and an
    // unsigned-int depth texture inside Three on first use. All materials keep
    // transmission=0, so no transmission target exists. HDR pipeline targets
    // are audited separately before they are rendered into.
    this.scene.traverse((object) => {
      if (!(object instanceof THREE.DirectionalLight)) return;
      const target = object.shadow.map as THREE.WebGLRenderTarget | null;
      if (!target || this.auditedTargets.has(target)) return;
      if (target.texture.type !== THREE.UnsignedByteType) throw new Error('Unexpected forest shadow color target type.');
      const result = checkForestFramebuffer(this.renderer, target, 'directional-pcf-shadow', this.targetPolicy.checks);
      if (!result.complete) throw new Error('Forest shadow framebuffer is incomplete.');
      this.auditedTargets.add(target);
    });
    Object.assign(this.canvas.dataset, {
      targetMode: this.targetPolicy.mode, halfFloatSupported: String(this.targetPolicy.halfFloatSupported),
      targetChecks: JSON.stringify(this.targetPolicy.checks),
    });
  }

  /**
   * Check every target of the current HDR allocation before the first render
   * into it. A new allocation (resize) replaces the previous report. Any
   * incomplete attachment returns the engine to the direct renderer.
   */
  private auditPipelineTargets() {
    const post = this.post;
    if (!post) return;
    const internal = post as unknown as Record<string, THREE.WebGLRenderTarget | THREE.WebGLRenderTarget[] | null>;
    const scene = internal.sceneTarget as THREE.WebGLRenderTarget | null;
    if (!scene || scene === this.postSceneTarget) return;
    this.postSceneTarget = scene; this.postChecks = [];
    const targets: Array<[string, THREE.WebGLRenderTarget]> = [];
    for (const name of ['sceneTarget', 'litTarget', 'aoTarget', 'aoBlurTarget', 'volumeTarget', 'volumeBlurTarget']) {
      const target = internal[name];
      if (target && !Array.isArray(target)) targets.push([`hdr-${name.replace('Target', '')}`, target]);
    }
    ((internal.mips as THREE.WebGLRenderTarget[] | undefined) ?? []).forEach((target, i) => targets.push([`hdr-bloom-${i}`, target]));
    let complete = true;
    for (const [label, target] of targets) {
      const result = checkForestFramebuffer(this.renderer, target, label, this.postChecks);
      this.auditedTargets.add(target);
      complete &&= result.complete;
    }
    this.canvas.dataset.postChecks = JSON.stringify(this.postChecks);
    if (!complete) this.disablePost('framebuffer-incomplete');
  }

  private addWater(light: ForestLightUniforms) {
    this.reflection = createForestWater(light);
    configureForestReflectionTarget(this.renderer, this.reflection.getRenderTarget(), this.targetPolicy);
    const material = this.reflection.material as THREE.ShaderMaterial;
    this.waterUniforms = material.uniforms;
    // Small litter and grass never reach the mirror image: skip them there.
    const render = this.reflection.onBeforeRender.bind(this.reflection);
    this.reflection.onBeforeRender = (...args: Parameters<THREE.Object3D['onBeforeRender']>) => {
      const hidden = this.scene.children.filter((object) => object.name === 'forest-undergrowth' && object.visible);
      const inner: THREE.Object3D[] = [];
      for (const group of hidden) for (const child of group.children) if (child.name !== 'forest-ferns-near' && child.visible) { child.visible = false; inner.push(child); }
      try { render(...args); } finally { for (const child of inner) child.visible = true; }
    };
    this.scene.add(this.reflection);
  }

  private addBirds(light: ForestLightUniforms) {
    // One small, calm bird far across the pool on the fallen trunk. It only
    // turns its head and body a little; it never moves toward the viewer.
    const material = (color: string, roughness: number) => applyForestSurface(new THREE.MeshStandardMaterial({ color, roughness }), light, { key: 'forest-bird' });
    const bodyMat = material('#5e5a42', .8), breastMat = material('#b8aa86', .85), eyeMat = material('#1c1d19', .3);
    const x = -1.95, z = -5.05;
    const logTop = groundHeight(x, z) + .12 + .27 * .93;
    const bird = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(.12, 16, 12), bodyMat); body.scale.set(.78, .92, 1.3); bird.add(body);
    const chest = new THREE.Mesh(new THREE.SphereGeometry(.096, 14, 10), breastMat); chest.position.set(0, -.015, .06); chest.scale.set(.76, .9, 1); bird.add(chest);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.072, 14, 10), bodyMat); head.position.set(0, .12, .085); bird.add(head);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(.018, .07, 8), eyeMat); beak.rotation.x = Math.PI / 2; beak.position.set(0, .115, .17); bird.add(beak);
    for (const side of [-1, 1]) { const eye = new THREE.Mesh(new THREE.SphereGeometry(.012, 8, 6), eyeMat); eye.position.set(side * .052, .135, .12); bird.add(eye); }
    const tail = new THREE.Mesh(new THREE.ConeGeometry(.05, .22, 6), bodyMat); tail.rotation.x = -1.25; tail.position.set(0, -.03, -.2); tail.scale.set(1, 1, .35); bird.add(tail);
    for (const side of [-.034, .034]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(.006, .004, .08, 5), eyeMat); leg.position.set(side, -.12, .01); bird.add(leg); }
    bird.scale.setScalar(.62);
    bird.position.set(x, logTop + .12 * .62, z); bird.rotation.y = .65;
    bird.traverse((object) => { object.castShadow = true; object.receiveShadow = true; });
    this.birds.push(bird); this.scene.add(bird);
  }

  /** Direct-path stand-in for the volume pass: soft crossed shaft cards through real cookie gaps. */
  private addDirectShafts() {
    const material = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false,
      vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'varying vec2 vUv;void main(){float edge=pow(sin(vUv.x*3.14159),3.);float end=smoothstep(0.,.18,vUv.y)*(1.-smoothstep(.55,1.,vUv.y));gl_FragColor=vec4(vec3(1.,.86,.62)*edge*end*.07,1.);}',
    });
    const up = SUN_DIRECTION.clone();
    for (const [x, z, width] of [[0.35, -1.0, 1.4], [2.4, -8.6, 1.0], [-3.4, -12.8, 1.1], [5.6, -16.5, 1.0], [-1.0, -21.5, 1.4]]) {
      const ground = V(x, groundHeight(x, z), z), length = 24;
      for (const turn of [0, Math.PI / 2]) {
        const card = new THREE.Mesh(new THREE.PlaneGeometry(width, length), material);
        card.position.copy(ground).addScaledVector(up, length * 0.5);
        card.quaternion.setFromUnitVectors(V(0, 1, 0), up);
        card.rotateY(turn);
        card.name = 'forest-direct-shaft'; card.renderOrder = 3; card.visible = false;
        this.directOnly.push(card); this.scene.add(card);
      }
    }
  }

  private addMotes(light: ForestLightUniforms) {
    const pos:number[]=[], phase:number[]=[];
    for(let i=0;i<160;i++){pos.push((this.rng()-.5)*14,this.rng()*5+.4,1.5-this.rng()*22);phase.push(this.rng()*6.28);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('phase',new THREE.Float32BufferAttribute(phase,1));
    const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{time:this.clock,uForestCookie:light.uForestCookie,uForestCookieRect:light.uForestCookieRect,uForestSun:light.uForestSun},
      vertexShader:`uniform float time;attribute float phase;varying float fade;${GLSL_CANOPY_LIGHT}
        void main(){vec3 p=position;p.x+=sin(time*.05+phase)*.4;p.y+=sin(time*.07+phase*1.3)*.25;p.z+=cos(time*.045+phase)*.35;
        vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(16./-mv.z,1.,2.4);
        fade=forestCanopyCookie(p)*(.35+.65*pow(max(0.,sin(phase*3.+time*.21)),2.));}`,
      fragmentShader:`varying float fade;void main(){float a=1.-smoothstep(.1,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(vec3(2.4,2.1,1.5)*a*fade,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    });
    const motes=new THREE.Points(g,mat);motes.name='forest-sunlit-motes';motes.frustumCulled=false;this.scene.add(motes);
  }

  setSize(width:number,height:number,devicePixelRatio:number){
    if(this.disposed)return;
    const next={width:Math.max(1,width),height:Math.max(1,height),ratio:forestPixelRatio(width,height,devicePixelRatio)};
    const previous=this.requestedSize;
    const holder=this.canvas.parentElement;
    if(previous&&previous.width===next.width&&previous.height===next.height&&previous.ratio===next.ratio&&holder===this.requestedHolder)return;
    this.requestedSize=next;this.requestedHolder=holder;this.staticDirty=true;
    if(this.ready)this.scheduler.renderFrame(0);
  }

  private applySize(){
    const next=this.requestedSize;
    if(!next)return;
    const previous=this.appliedSize;
    if(previous&&previous.width===next.width&&previous.height===next.height&&previous.ratio===next.ratio)return;
    // Resize only when a render slot is available. Clearing the drawing buffer
    // before a saturated queue drains would blank a paused/restored holder.
    if(this.renderer.getPixelRatio()!==next.ratio)this.renderer.setPixelRatio(next.ratio);
    this.renderer.setSize(next.width,next.height,false);
    // HDR targets follow the drawing buffer inside the same fenced submission.
    this.post?.setSize(next.width,next.height,this.renderer.getPixelRatio());
    if(this.post)this.canvas.dataset.post=JSON.stringify(this.post.report);
    this.appliedSize=next;
    this.camera.aspect=next.width/next.height;
    // Preserve the near pool + canopy in narrow folded screens, without zooming into a trunk.
    this.camera.fov=this.camera.aspect<.8?66:this.camera.aspect>2?45:55;this.camera.updateProjectionMatrix();
    this.canvas.dataset.dpr=String(this.renderer.getPixelRatio());
  }

  renderFrame(dt:number){
    if(!this.ready||this.disposed)return;
    // Same-size ResizeObserver/attachTop callbacks do not invalidate a frame.
    if(dt===0&&!this.staticDirty)return;
    this.scheduler.renderFrame(dt);
  }

  private drawFrame(dt:number){
    this.applySize();this.staticDirty=false;
    const step=Math.max(0,Math.min(dt,.05));this.time+=step;this.clock.value=this.time;
    // The analytic camera spring follows elapsed time even on a slow GPU.
    // Ambient wind remains conservatively clamped after unusually long frames.
    this.look.update(Math.max(0,Math.min(dt,1)));
    this.camera.lookAt(Math.sin(this.look.yaw)*14,1.65+this.look.pitch*14,-9);
    this.waterUniforms.time.value=this.time;
    for(let i=0;i<this.plants.length;i++){
      const plant=this.plants[i];const age=this.time-this.leafHitTime;
      const touch=plant===this.leafHit&&age<5?Math.sin(age*5.5)*Math.exp(-age*1.15)*.045:0;
      plant.rotation.z=(plant.userData.baseRotation||0)+Math.sin(this.time*.48+i*1.8)*.007+touch;
    }
    for(let i=0;i<this.birds.length;i++)this.birds[i].rotation.y=.65+Math.sin(this.time*.21+i*2.1)*.09;
    this.auditPipelineTargets();
    const submissionStarted=performance.now();
    // The whole multi-pass HDR image (reflection, scene, AO, volume, bloom,
    // grade) is one submission inside the scheduler's fenced draw.
    this.renderer.info.reset();
    if(this.post)this.post.render(this.scene,this.camera,this.time);else this.renderer.render(this.scene,this.camera);
    this.frame++;
    this.canvas.dataset.cpuSubmissionMs=(performance.now()-submissionStarted).toFixed(3);
    Object.assign(this.canvas.dataset,{frames:String(this.frame),time:this.time.toFixed(4),lookYaw:this.look.yaw.toFixed(5),lookPitch:this.look.pitch.toFixed(5),drawCalls:String(this.renderer.info.render.calls),triangles:String(this.renderer.info.render.triangles)});
    this.auditRenderTargets();
  }

  start(){
    if(this.running||this.disposed||!this.ready||this.scheduler.state.fault)return;
    this.running=true;this.scheduler.start();
  }
  stop(){this.running=false;this.scheduler.stop();this.look.release();}
  drag(dx:number,dy:number){if(this.running)this.look.drag(dx,dy);}
  releaseDrag(){this.look.release();}
  /** Owned QA harness only: wait for a bounded slot, then render and read in
   * the same task before the drawing buffer can clear. GPU completion is
   * separately reported by gpuCompleted; this promise is readback evidence. */
  captureFrame(){
    if(!this.ready||this.disposed)return Promise.reject(new Error('Forest renderer is not ready.'));
    return this.scheduler.capture();
  }
  setOnInteraction(callback:((event:ForestInteraction)=>void)|undefined){this.onInteraction=callback;}
  touch(x:number,y:number){
    if(!this.running||this.disposed)return;
    this.raycaster.setFromCamera(new THREE.Vector2(x,y),this.camera);
    const leaf=this.raycaster.intersectObjects(this.plants,true)[0];
    const water=this.raycaster.intersectObject(this.reflection)[0];
    const hitDistance=Math.min(leaf?.distance??Infinity,water?.distance??Infinity);
    const solid=this.raycaster.intersectObjects(this.solidSurfaces,false)[0];
    if(solid&&solid.distance<hitDistance-.012)return;
    if(leaf&&(!water||leaf.distance<water.distance)){
      let group:THREE.Object3D=leaf.object;while(group.parent&&!this.plants.includes(group as THREE.Group))group=group.parent;
      this.leafHit=group as THREE.Group;this.leafHitTime=this.time;
      this.canvas.dataset.leafHits=String(Number(this.canvas.dataset.leafHits)+1);
      this.onInteraction?.({kind:'leaf',position:leaf.point.toArray() as [number,number,number],strength:.18});
    }else if(water){
      this.waterUniforms.ripple.value.set(water.point.x,water.point.z,this.time);
      this.canvas.dataset.waterHits=String(Number(this.canvas.dataset.waterHits)+1);
      this.onInteraction?.({kind:'water',position:water.point.toArray() as [number,number,number],strength:.22});
    }
  }

  dispose(){
    if(this.disposed)return;
    this.canvas.dataset.disposeStartedAt=String(performance.now());
    this.disposed=true;this.ready=false;this.stop();this.onInteraction=undefined;this.scheduler.dispose();
    this.canvas.removeEventListener('webglcontextlost',this.onLost);
    const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();
    this.scene.traverse(object=>{
      const mesh=object as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);
      if(object instanceof THREE.InstancedMesh)object.dispose();
      if(mesh.material)for(const m of Array.isArray(mesh.material)?mesh.material:[mesh.material])materials.add(m);
      if(object instanceof THREE.Light&&'shadow' in object)(object as THREE.DirectionalLight).shadow?.dispose();
    });
    for(const m of materials){for(const value of Object.values(m))if(value instanceof THREE.Texture)textures.add(value);m.dispose();}
    geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());
    this.post?.dispose();this.post=null;
    this.reflection?.getRenderTarget().dispose();this.resources.forEach(r=>r.dispose());
    this.renderer.renderLists.dispose();this.renderer.dispose();this.renderer.forceContextLoss();this.scene.clear();
    this.canvas.dataset.disposed='true';
    this.canvas.dataset.disposeFinishedAt=String(performance.now());
  }
}
