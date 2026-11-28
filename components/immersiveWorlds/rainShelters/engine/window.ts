import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { WorldBuilder } from './types';
import { createRainRefractionTarget, withRainRenderTargetState } from './renderTargets';
import { gardenFoliageMaterial, gardenLeafGeometry, gardenSepalGeometry } from './gardenFoliage';
import { GLSL_COLOR, GLSL_NOISE } from '../../shared/render/glsl';
import { fbm3 } from '../../shared/render/noise';
import { createRockMaterial } from '../../shared/render/rockSurface';
import { applyWetSurface } from '../../shared/render/wetSurface';
import { createRainLayer, createRainSplashes } from '../../shared/render/rainStreaks';
import { assignProbe, captureProbe, captureSkyProbe, createSky } from './atmosphere';
import { applyFoliage, applyGround, patch, TimberSet } from './surfaces';
import { createWoodMaterial } from '../../shared/render/woodSurface';
import { createPlasterMaterial } from '../../shared/render/interiorSurface';
import { boulderGeometry, limbGeometry } from './geometry';

/* Original procedural geometry and shaders. No third-party art assets.
 * Seated at a closed wooden window: the wet glass, with beaded, sliding and
 * misted water, refracts a hydrangea garden rendered from the same scene and
 * camera. Daylight from the window and a warm lamp behind light the timber. */
const random = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

function leafGeometry() {
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  const segments = 8;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const width = Math.pow(Math.sin(t * Math.PI), 0.75) * 0.45 * (i % 2 ? 0.87 : 1);
    for (let j = 0; j < 3; j++) {
      const side = j - 1;
      positions.push(side * width, t, (side ? -0.055 : 0.028) * Math.sin(t * Math.PI) + 0.12 * t * t);
      uv.push(j / 2, t);
    }
  }
  for (let i = 0; i < segments; i++) for (let j = 0; j < 2; j++) {
    const a = i * 3 + j, b = a + 3;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(indices); g.computeVertexNormals();
  return g;
}

function petalGeometry() {
  const p: number[] = [], uv: number[] = [], ix: number[] = [];
  const rows = 7, columns = 7;
  for (let row = 0; row <= rows; row++) {
    const t = row / rows;
    const width = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.52) * (0.44 + t * 0.20);
    for (let col = 0; col <= columns; col++) {
      const q = col / columns * 2 - 1;
      p.push(q * width, t, 0.055 * Math.sin(t * Math.PI) + 0.065 * q * q * t - 0.055 * t * t);
      uv.push(col / columns, t);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    const a = r * (columns + 1) + c, b = a + columns + 1;
    ix.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(ix); g.computeVertexNormals();
  return g;
}

const GLASS_W = 5.72, GLASS_H = 2.69;
const BOWL = new THREE.Vector3(0.38, 0.733, 0.44);

/** Garden view distance is written into alpha (0..1 over this range) for the glass depth of field. */
const DEPTH_RANGE = 40;

const GLASS_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
${GLSL_COLOR}
uniform sampler2D uScene; uniform vec2 uResolution; uniform float uTime; uniform vec2 uTouch; uniform float uTouchStrength;
uniform vec3 uRoom; uniform vec3 uMistTint; uniform float uFocus;
varying vec2 vUv;
const vec2 GLASS = vec2(${GLASS_W.toFixed(3)}, ${GLASS_H.toFixed(3)});
const float DEPTH_RANGE = ${DEPTH_RANGE.toFixed(1)};
// One layer of beaded drops; cell and radii in metres. xy: lens normal, z: coverage.
vec3 beads(vec2 m, float cell, float seed, float rMin, float rMax, float density) {
  vec2 id = floor(m / cell);
  vec3 h = bwHash3(vec3(id, seed));
  vec2 c = (id + 0.2 + 0.6 * h.xy) * cell;
  float r = mix(rMin, rMax, h.z * h.z);
  vec2 q = (m - c) / r;
  q.y *= 0.88 + 0.2 * h.x;                      // gravity flattens the top a little
  float d = length(q);
  float present = step(1.0 - density, fract(h.z * 7.31 + h.x));
  // Edge antialiased over about a pixel at this distance.
  float edge = clamp(fwidth(d) * 1.2, 0.04, 0.4);
  float mask = (1.0 - smoothstep(1.0 - edge, 1.0, d)) * present;
  return vec3(q * mask, mask);
}
// The garden through clean glass is out of focus: the focus sits on the pane.
// Blur grows with the distance written into alpha; bright points bloom into discs.
vec3 bokeh(vec2 uv, float scale) {
  vec2 px = 1.0 / uResolution;
  float dist = max(texture2D(uScene, uv).a * DEPTH_RANGE, uFocus);
  float coc = scale * clamp(1.0 - uFocus / dist, 0.12, 1.0);
  float spin = bwIgn(gl_FragCoord.xy) * 6.2831853;
  vec3 sum = vec3(0.0); float weight = 0.0;
  for (int i = 0; i < 16; i++) {
    float t = (float(i) + 0.5) / 16.0;
    float a = float(i) * 2.39996 + spin;
    vec2 o = vec2(cos(a), sin(a)) * sqrt(t) * coc * px;
    vec3 c = texture2D(uScene, clamp(uv + o, vec2(0.002), vec2(0.998))).rgb;
    float w = 1.0 + 3.0 * smoothstep(0.35, 2.2, bwLuma(c));
    sum += c * w; weight += w;
  }
  return sum / weight;
}
// Inside a drop the inverted image is small and nearly sharp.
vec3 lensView(vec2 uv) {
  vec2 px = 1.0 / uResolution;
  return (texture2D(uScene, clamp(uv, vec2(0.002), vec2(0.998))).rgb * 2.0
    + texture2D(uScene, clamp(uv + vec2(px.x, 0.0), vec2(0.002), vec2(0.998))).rgb
    + texture2D(uScene, clamp(uv + vec2(0.0, px.y), vec2(0.002), vec2(0.998))).rgb) * 0.25;
}
void main() {
  vec2 screenUv = gl_FragCoord.xy / uResolution;
  vec2 m = vUv * GLASS;                         // metres on the pane
  float pixelScale = uResolution.y / 800.0;
  // Touch trace: a wiped path that slowly mists over again.
  vec2 traceDelta = (vUv - uTouch) * vec2(GLASS.x / GLASS.y, 1.0);
  float wiped = exp(-dot(traceDelta, traceDelta) * 48.0) * uTouchStrength;

  // Running drops: each lane releases a drop that creeps, pauses and slides,
  // leaving a clear trail dotted with the beads it shed.
  vec2 slide = vec2(0.0); float slideMask = 0.0, trail = 0.0;
  for (int i = 0; i < 2; i++) {
    float lane = 0.17 + float(i) * 0.1;
    float id = floor((m.x + float(i) * 0.05) / lane);
    vec3 h = bwHash3(vec3(id, float(i) + 40.0, 3.0));
    float x = (id + 0.25 + 0.5 * h.x) * lane - float(i) * 0.05 + 0.005 * sin(m.y * 19.0 + h.y * 9.0);
    float speed = 0.04 + 0.07 * h.y;
    float phase = uTime * speed + h.z * 9.0;
    float progress = floor(phase) + smoothstep(0.3, 1.0, fract(phase));
    float headY = GLASS.y + 0.2 - mod(progress * 0.5, GLASS.y + 0.6);
    float r = 0.012 + 0.008 * h.x;
    vec2 q = (m - vec2(x, headY)) / vec2(r, r * 1.3);
    float d = length(q);
    float alive = step(0.3, h.y);
    float mask = (1.0 - smoothstep(0.82, 1.0, d)) * alive;
    slide += q * mask; slideMask = max(slideMask, mask);
    float behind = m.y - headY;
    trail = max(trail, (1.0 - smoothstep(0.002, 0.0045, abs(m.x - x))) * smoothstep(0.0, 0.02, behind) * (1.0 - smoothstep(0.25, 0.85, behind)) * alive);
  }
  // Seen from across the room, so the beads are drawn at the size a close look would remember.
  vec3 dust = beads(m, 0.022, 7.0, 0.0016, 0.0026, 0.3);            // tiny static beads
  vec3 small = beads(m + 0.005, 0.036, 1.0, 0.003, 0.0062, 0.45);
  vec3 medium = beads(m + 0.011, 0.085, 2.0, 0.0065, 0.013, 0.45);
  vec3 large = beads(m + 0.031, 0.19, 3.0, 0.013, 0.024, 0.42);
  vec3 trailBeads = beads(vec2(m.x * 3.0, m.y), 0.024, 5.0, 0.0026, 0.004, 0.7) * vec3(1.0, 1.0, trail);
  float clear = max(trail * 0.9, wiped);
  vec3 drop = vec3(0.0);
  float coverage = 0.0, size = 0.0;
  if (dust.z * (1.0 - clear) > coverage) { drop = dust; coverage = dust.z * (1.0 - clear); size = 0.3; }
  if (small.z * (1.0 - clear) > coverage) { drop = small; coverage = small.z * (1.0 - clear); size = 0.5; }
  if (medium.z * (1.0 - clear) > coverage) { drop = medium; coverage = medium.z * (1.0 - clear); size = 0.75; }
  if (large.z * (1.0 - clear) > coverage) { drop = large; coverage = large.z * (1.0 - clear); size = 1.0; }
  if (trailBeads.z * (1.0 - wiped) > coverage) { drop = trailBeads; coverage = trailBeads.z * (1.0 - wiped); size = 0.35; }
  if (slideMask > coverage) { drop = vec3(slide, slideMask); coverage = slideMask; size = 1.0; }
  vec2 n = drop.xy;
  float nn = clamp(dot(n, n), 0.0, 1.0);
  float d = sqrt(nn);

  // A thin film bends the view slightly; condensation mists the lower pane and its edges.
  vec2 film = vec2(bwNoise(vec3(m * 3.0, uTime * 0.02)), bwNoise(vec3(m * 3.0 + 7.0, uTime * 0.02))) * 0.0012;
  float fromEdge = min(min(m.x, GLASS.x - m.x), m.y);
  float mist = 0.06 + 0.62 * (1.0 - smoothstep(0.0, 1.1, m.y)) + 0.3 * (1.0 - smoothstep(0.0, 0.45, fromEdge));
  mist += 0.18 * bwFbm3(vec3(m * 1.2, 2.0));
  mist = clamp(mist, 0.0, 1.0) * (1.0 - clear) * (1.0 - coverage);

  // Each drop is a tiny lens: a minified, inverted view of the garden behind it.
  vec2 lens = -n * (0.028 + 0.045 * size) * (0.7 + 0.5 * nn);
  vec3 colour = coverage > 0.02 ? lensView(screenUv + film + lens) : vec3(0.0);
  vec3 background = bokeh(screenUv + film, (7.0 + 9.0 * mist) * pixelScale);
  background = mix(background, background * 0.86 + uMistTint, mist * 0.55);
  colour = mix(background, colour, coverage);
  // Total internal reflection darkens the rim; light gathers in a bright lower crescent.
  float rim = smoothstep(0.55, 0.97, d) * coverage;
  colour *= 1.0 - 0.75 * rim * mix(0.3, 1.0, size);
  float crescent = smoothstep(-0.15, -0.75, n.y) * smoothstep(0.35, 0.75, d) * (1.0 - smoothstep(0.8, 0.97, d)) * coverage;
  colour += vec3(1.35, 1.45, 1.48) * crescent * 0.7 * size;
  vec2 glintAt = n - vec2(-0.32, 0.44);
  colour += vec3(2.6, 2.75, 2.8) * exp(-dot(glintAt, glintAt) * 70.0) * coverage;
  // Wet trails stay clear and catch a faint edge highlight.
  colour += vec3(0.18) * trail * (1.0 - coverage) * 0.2;
  // Faint reflection of the warm room on the glass.
  colour += uRoom * 0.035;
  gl_FragColor = vec4(colour, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

/** Writes view distance into alpha, so the glass can blur the garden by depth. */
function encodeDepthInAlpha(material: THREE.Material) {
  const standard = material as THREE.MeshStandardMaterial;
  if (!standard.isMeshStandardMaterial) return;
  const previous = standard.onBeforeCompile;
  standard.onBeforeCompile = (shader, renderer) => {
    previous.call(standard, shader, renderer);
    shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
gl_FragColor.a = clamp(length(vViewPosition) / ${DEPTH_RANGE.toFixed(1)}, 0.0, 1.0);`);
  };
  const base = standard.customProgramCacheKey.bind(standard);
  standard.customProgramCacheKey = () => `${base()}|depth-alpha`;
}

export const buildWindow: WorldBuilder = ({ scene, camera, renderer }) => {
  const rnd = random(83059);
  const time = { value: 0 };
  scene.background = new THREE.Color('#a6bab6');
  scene.fog = new THREE.FogExp2('#7a8c86', 0.03);
  const garden = new THREE.Group(); scene.add(garden);
  const disposables: { dispose(): void }[] = [];

  // ---- Sky and light ------------------------------------------------------------------
  const glowDirection = new THREE.Vector3(-0.3, 0.6, -0.75).normalize();
  const sky = createSky({
    time, zenith: new THREE.Color(1.62, 1.82, 1.84), horizon: new THREE.Color(1.08, 1.24, 1.22),
    cloudDark: new THREE.Color(0.9, 1.02, 1.02), cloudLight: new THREE.Color(1.7, 1.9, 1.9),
    glowDirection, glow: new THREE.Color(0.35, 0.34, 0.3), ground: new THREE.Color(0.1, 0.12, 0.09), coverage: 0.85, scale: 0.8, drift: 0.012,
  });
  scene.add(sky.mesh);
  const daylight = new THREE.DirectionalLight('#e7f1f1', 1.25); daylight.position.set(-5, 12, -3);
  daylight.name = 'window-garden-daylight';
  daylight.castShadow = true; daylight.shadow.mapSize.set(1024, 1024);
  daylight.shadow.camera.left = -8; daylight.shadow.camera.right = 8; daylight.shadow.camera.top = 7; daylight.shadow.camera.bottom = -4;
  daylight.shadow.bias = -0.002; daylight.shadow.normalBias = 0.035;
  daylight.shadow.radius = 4; scene.add(daylight);
  // The world is static apart from foliage sway: render the key shadow once, and
  // again only while something that casts it moves (saves a pass every frame).
  daylight.shadow.autoUpdate = false; daylight.shadow.needsUpdate = true;
  // Daylight through the pane falls on the sill; the frame casts its shadow.
  const windowLight = new THREE.SpotLight('#d8e6ea', 4.5, 6, 0.85, 0.9, 2);
  windowLight.position.set(-0.4, 3.1, -1.1); windowLight.target.position.set(0.2, 0.7, 0.7);
  // Both lights graze the sill: normal-offset bias keeps self-shadowing from banding it.
  windowLight.castShadow = true; windowLight.shadow.mapSize.set(512, 512); windowLight.shadow.bias = -0.0005; windowLight.shadow.normalBias = 0.03; windowLight.shadow.radius = 5;
  windowLight.shadow.autoUpdate = false; windowLight.shadow.needsUpdate = true;
  scene.add(windowLight, windowLight.target);
  const roomLight = new THREE.PointLight('#ffc98e', 1.1, 8, 2); roomLight.position.set(1.7, 2.5, 2.7); scene.add(roomLight);
  // A table lamp behind the viewer throws a warm pool across the sill and the bowl.
  const lampPool = new THREE.SpotLight('#ffa95c', 24, 6, 0.34, 1, 2);
  lampPool.position.set(1.45, 2.35, 2.5); lampPool.target.position.set(0.5, 0.72, 0.62);
  lampPool.castShadow = true; lampPool.shadow.mapSize.set(512, 512); lampPool.shadow.bias = -0.0005; lampPool.shadow.normalBias = 0.03; lampPool.shadow.radius = 6;
  lampPool.shadow.autoUpdate = false; lampPool.shadow.needsUpdate = true;
  scene.add(lampPool, lampPool.target);
  const fallbackFill = new THREE.HemisphereLight('#d8edf0', '#748052', 1.3);
  fallbackFill.visible = false; scene.add(fallbackFill);

  // ---- Materials ----------------------------------------------------------------------
  // Oiled timber with a satin coat: real grain, worn patches, a second sharp reflection.
  const frameY = createWoodMaterial('#6b4a30', { key: 'window-frame-y', axis: 'y', rings: 22, figure: 0.55, pores: 0.35, wear: 0.2, varnish: 0.35, roughness: 0.52 }, { clearcoatRoughness: 0.24 });
  const frameX = createWoodMaterial('#6b4a30', { key: 'window-frame-x', axis: 'x', rings: 22, figure: 0.55, pores: 0.35, wear: 0.2, varnish: 0.35, roughness: 0.52 }, { clearcoatRoughness: 0.24 });
  // The sill: wider, softer figure; a worn, paler nose; a damp ring and drip marks by the bowl.
  // Real growth rings are millimetres apart. Seen this flat, wide procedural rings
  // foreshorten into even horizontal stripes; fine rings filter to a tone instead and
  // the figure comes from broad tonal flow, turned a few degrees off the board.
  const sillWood = patch(createWoodMaterial('#946c48', { key: 'window-sill', axis: 'x', objectSpace: true, rings: 75, figure: 0.4, pores: 0.3, wear: 0.3, varnish: 0.45, roughness: 0.5 }, { clearcoatRoughness: 0.2 }), {
    key: 'window-sill-wear', fragmentCommon: 'float sillWet; float sillNose;',
    color: `{
  vec3 p = vSurfWorld; vec3 nrm = normalize(vSurfNormal);
  sillNose = smoothstep(0.2, 0.65, nrm.z) * smoothstep(0.2, 0.65, nrm.y);
  float top = smoothstep(0.85, 0.97, nrm.y);
  vec2 b = p.xz - vec2(${BOWL.x.toFixed(3)}, ${BOWL.z.toFixed(3)});
  float r = length(b), a = atan(b.y, b.x);
  float ring = 1.0 - smoothstep(0.003, 0.011, abs(r - 0.172 - 0.006 * sin(a * 3.0 + 1.0)));
  float under = (1.0 - smoothstep(0.15, 0.19, r)) * 0.6;
  // A few drips that ran off the bowl and from wet hands.
  vec2 cell = floor(p.xz / 0.06);
  vec3 h = bwHash3(vec3(cell, 21.0));
  vec2 spot = (cell + 0.25 + 0.5 * h.xy) * 0.06;
  float drip = (1.0 - smoothstep(0.004, 0.01 + 0.008 * h.z, length(p.xz - spot))) * step(0.72, h.z) * (1.0 - smoothstep(0.25, 0.6, r));
  sillWet = clamp(max(max(ring * 0.9, under), drip), 0.0, 1.0) * top;
  diffuseColor.rgb *= mix(1.0, 0.6, sillWet);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.3 + 0.015, sillNose * 0.55);
}`,
    roughness: 'roughnessFactor = mix(roughnessFactor, 0.1, sillWet); roughnessFactor += 0.18 * sillNose;',
  });
  const plaster = createPlasterMaterial('#c6bca7', { key: 'window-wall', floorY: -0.8, stains: 0.2, bump: 0.6 });
  const bronze = new THREE.MeshStandardMaterial({ color: '#6e5c3c', roughness: 0.38, metalness: 0.85 });
  const earth = applyWetSurface(applyGround(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.92 }), {
    key: 'window-garden', soil: '#433a2a', litter: ['#5a3d22', '#6f5532'], litterAmount: 0.2, moss: '#4a6630', mossAmount: 0.62,
  }), { key: 'window-garden', time, wetness: 0.9, darkening: 0.6, wetRoughness: 0.45, puddles: 0.3, puddleSize: 0.9, rippleDensity: 9 });
  const stone = applyWetSurface(createRockMaterial('#86877c', { key: 'window-stones', scale: 2.2, bump: 0.9, strata: 0.1, cavity: 0.5, wetness: 0.8, drips: 0.1, dryRoughness: 0.7, wetRoughness: 0.14, moss: { color: '#55702e', amount: 0.4 } }), {
    key: 'window-stones', time, wetness: 0.3, darkening: 0.9, wetRoughness: 0.12, puddles: 0.25, puddleSize: 0.25, rippleDensity: 12,
  });
  const leafMat = applyWetSurface(gardenFoliageMaterial('leaf'), { key: 'window-hydrangea-leaf', time, wetness: 0.75, darkening: 0.85, wetRoughness: 0.12 });
  // Rain-soaked sepals: deeper colour and a glossy film that catches the sky.
  const petalMat = applyWetSurface(gardenFoliageMaterial('sepal'), { key: 'window-hydrangea-sepal', time, wetness: 0.75, darkening: 0.88, wetRoughness: 0.14 });
  const foliage = (key: string, color: THREE.ColorRepresentation) => applyWetSurface(applyFoliage(new THREE.MeshStandardMaterial({ color, roughness: 0.45, side: THREE.DoubleSide }), {
    key, translucency: new THREE.Color(0.5, 0.75, 0.3), strength: 0.7,
  }), { key, time, wetness: 0.6, darkening: 0.85, wetRoughness: 0.22 });

  // ---- The window: sash, sill, wall --------------------------------------------------------
  const frame = new TimberSet(7), rails = new TimberSet(8), sill = new TimberSet(13);
  sill.box(6.9, 0.18, 0.66, { x: 0, y: 0.57, z: 0.12 }, undefined, { radius: 0.02 });

  frame.box(0.26, 3.9, 0.3, { x: -3.02, y: 2.0, z: 0.02 }, undefined, { radius: 0.025 });
  frame.box(0.26, 3.9, 0.3, { x: 3.02, y: 2.0, z: 0.02 }, undefined, { radius: 0.025 });
  rails.box(6.3, 0.28, 0.35, { x: 0, y: 3.67, z: 0.02 }, undefined, { radius: 0.025 });
  frame.box(0.13, 2.82, 0.17, { x: -0.63, y: 2.16, z: 0.08 }, undefined, { radius: 0.018 });
  rails.box(5.8, 0.075, 0.15, { x: 0, y: 2.93, z: 0.08 }, undefined, { radius: 0.012 });
  // Inset retaining strips and the sash rails.
  for (const x of [-2.85, 2.85]) frame.box(0.035, 2.94, 0.06, { x, y: 2.14, z: 0.17 }, undefined, { radius: 0.008 });
  for (const y of [0.8, 3.5]) rails.box(5.7, 0.035, 0.06, { x: 0, y, z: 0.17 }, undefined, { radius: 0.008 });
  const sashMesh = frame.build(frameY, 'window-sash');
  const railMesh = rails.build(frameX, 'window-rails');
  const apronMesh = sill.build(frameX, 'window-sill-apron');
  const sillGeometry = new RoundedBoxGeometry(6.8, 0.11, 1.15, 3, 0.03);
  sillGeometry.rotateY(-0.045);
  const sillMesh = new THREE.Mesh(sillGeometry, sillWood);
  sillMesh.name = 'window-sill'; sillMesh.rotation.y = 0.045; sillMesh.position.set(0, 0.67, 0.44);
  sillMesh.castShadow = sillMesh.receiveShadow = true;
  scene.add(sashMesh, railMesh, apronMesh, sillMesh);
  const glassOccluders: THREE.Object3D[] = [sashMesh, railMesh, apronMesh, sillMesh];
  const box = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z); mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh); glassOccluders.push(mesh); return mesh;
  };
  // Pegs and the aged bronze latch.
  for (const x of [-3.03, 3.03, -0.63]) for (const y of [0.88, 3.35]) {
    const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 14), frameX);
    peg.rotation.x = Math.PI / 2; peg.position.set(x, y, 0.183); scene.add(peg);
  }
  box(0.06, 0.19, 0.02, -0.625, 1.63, 0.18, bronze);
  box(0.13, 0.025, 0.037, -0.57, 1.64, 0.205, bronze);
  box(2.5, 5, 0.2, -4.4, 2.0, 0.05, plaster); box(2.5, 5, 0.2, 4.4, 2.0, 0.05, plaster);
  box(9, 1.3, 0.2, 0, -0.11, 0.07, plaster);
  // The room behind the viewer: unseen, but it shapes the probe and the warm bounce.
  const room = new THREE.Group(); scene.add(room);
  const roomMat = new THREE.MeshStandardMaterial({ color: '#6d5a46', roughness: 0.9, side: THREE.BackSide });
  // Five inner faces of a box: the side toward the window stays open.
  const roomGeometry = new THREE.BoxGeometry(11, 5.6, 6);
  const front = roomGeometry.groups[5];
  roomGeometry.setIndex(Array.from(roomGeometry.index!.array).slice(0, front.start));
  roomGeometry.clearGroups();
  const roomBox = new THREE.Mesh(roomGeometry, roomMat); roomBox.position.set(0, 1.8, 3.15); room.add(roomBox);

  // A celadon bowl on the sill, with water and fallen sepals.
  const bowlProfile = [new THREE.Vector2(0.035, 0), new THREE.Vector2(0.16, 0.016), new THREE.Vector2(0.24, 0.085), new THREE.Vector2(0.254, 0.13), new THREE.Vector2(0.24, 0.137), new THREE.Vector2(0.222, 0.09), new THREE.Vector2(0.148, 0.036), new THREE.Vector2(0.04, 0.025)];
  const ceramic = new THREE.MeshPhysicalMaterial({ color: '#8fa69c', roughness: 0.32, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08 });
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(bowlProfile, 72), ceramic);
  bowl.position.copy(BOWL); bowl.receiveShadow = bowl.castShadow = true; scene.add(bowl);
  const bowlWater = new THREE.Mesh(new THREE.CircleGeometry(0.197, 48), new THREE.MeshStandardMaterial({ color: '#2c3d38', roughness: 0.04, metalness: 0 }));
  bowlWater.rotation.x = -Math.PI / 2; bowlWater.position.set(0.38, 0.82, 0.44); scene.add(bowlWater);
  // Beads of water standing on the oiled sill.
  const beadGeometry = new THREE.SphereGeometry(1, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  const beadMat = new THREE.MeshPhysicalMaterial({ color: '#a9bcb6', roughness: 0.03, metalness: 0, transparent: true, opacity: 0.55, clearcoat: 1, clearcoatRoughness: 0.02, depthWrite: false });
  const sillBeads = new THREE.InstancedMesh(beadGeometry, beadMat, 14);
  const beadDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const a = rnd() * Math.PI * 2, rr = 0.22 + rnd() * 0.45, size = 0.004 + rnd() * 0.007;
    beadDummy.position.set(BOWL.x + Math.cos(a) * rr * 1.3, 0.7252, Math.min(0.99, BOWL.z + Math.sin(a) * rr * 0.8));
    beadDummy.scale.set(size * (1 + rnd() * 0.4), size * 0.45, size); beadDummy.updateMatrix();
    sillBeads.setMatrixAt(i, beadDummy.matrix);
  }
  scene.add(sillBeads);
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Mesh(petalGeometry(), new THREE.MeshStandardMaterial({ color: i === 1 ? '#a4a1d2' : '#8da6d0', side: THREE.DoubleSide, roughness: 0.55 }));
    p.rotation.set(-Math.PI / 2, 0, rnd() * 6.28); p.scale.setScalar(0.075);
    p.position.set(0.31 + rnd() * 0.13, 0.822, 0.38 + rnd() * 0.13); scene.add(p);
  }

  // ---- Garden ----------------------------------------------------------------------------
  const groundY = (x: number, z: number) => -0.1 + Math.sin(x * 1.2) * Math.cos(z * 0.55) * 0.1 + Math.sin(x * 2.8 + z) * 0.025 + 0.04 * fbm3(x * 0.4, 1, z * 0.4, 3);
  const groundGeometry = new THREE.PlaneGeometry(25, 26, 120, 120); groundGeometry.rotateX(-Math.PI / 2);
  const gp = groundGeometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < gp.count; i++) { const x = gp.getX(i), z = gp.getZ(i) - 10; gp.setXYZ(i, x, groundY(x, z), z); }
  groundGeometry.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeometry, earth); ground.receiveShadow = true; garden.add(ground);
  // Irregular wet stepping stones recede between asymmetrical flower beds.
  const stoneParts: THREE.BufferGeometry[] = [];
  const pathX = (z: number) => -0.18 + Math.sin((-z - 1.3) / 0.91 * 0.63) * 1.12;
  for (let i = 0; i < 10; i++) {
    const z = -1.3 - i * 0.91, x = -0.18 + Math.sin(i * 0.63) * 1.12;
    const g = boulderGeometry(300 + i, 4, -0.1);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundY(x, z) + 0.04, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rnd() * 5, 0)), new THREE.Vector3(0.48 + rnd() * 0.12, 0.07, (0.48 + rnd() * 0.1) * (0.65 + rnd() * 0.21))));
    stoneParts.push(g);
  }
  for (let i = 0; i < 110; i++) {
    const z = -1.35 - rnd() * 9, x = pathX(z) + (rnd() - 0.5) * 1.65;
    const size = 0.025 + rnd() * 0.055;
    const g = boulderGeometry(500 + (i % 6), 2, -0.2);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, groundY(x, z) + size * 0.3, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd(), rnd() * 6, rnd())), new THREE.Vector3(size * 1.3, size * 0.55, size)));
    stoneParts.push(g);
  }
  const stones = new THREE.Mesh(mergeGeometries(stoneParts)!, stone); stones.castShadow = stones.receiveShadow = true; garden.add(stones);
  stoneParts.forEach(g => g.dispose());

  const stemMat = new THREE.MeshStandardMaterial({ color: '#536746', roughness: 0.7 });
  const leafG = leafGeometry();
  const foliageRandom = random(38291); // Keep the established distant garden/rain placement deterministic.
  const leavesData: { pos: THREE.Vector3; q: THREE.Quaternion; scale: THREE.Vector3; color: THREE.Color }[] = [];
  const petalsData: { pos: THREE.Vector3; q: THREE.Quaternion; scale: THREE.Vector3; color: THREE.Color }[] = [];
  const stems: THREE.BufferGeometry[] = [];
  const eye = new THREE.Vector3(0, 1.6, 3.2);
  const bases = [
    [-1.36, -2.6, 1.87, 0.535], [-3.6, -4.0, 1.40, 0.61], [-1.8, -5.4, 1.13, 0.56],
    [1.42, -2.7, 1.44, 0.62], [3.2, -3.6, 1.57, 0.555], [2.6, -5.8, 1.16, 0.59],
  ];
  bases.forEach(([bx, bz, height, hue], bushIndex) => {
    for (let stem = 0; stem < 7; stem++) {
      const angle = stem * 2.39996 + bushIndex, rad = 0.26 + rnd() * 0.6;
      const top = new THREE.Vector3(bx + Math.cos(angle) * rad, height * (0.63 + rnd() * 0.38), bz + Math.sin(angle) * rad * 0.72);
      const root = new THREE.Vector3(bx + (rnd() - 0.5) * 0.28, -0.05, bz + (rnd() - 0.5) * 0.3);
      stems.push(limbGeometry([root, root.clone().lerp(top, 0.5).add(new THREE.Vector3(0, 0.05, 0)), top], 0.017 + rnd() * 0.009, 0.012, 6, 8));
      for (let j = 0; j < 11; j++) {
        const t = 0.17 + j * 0.068, pos = root.clone().lerp(top, t);
        const outward = new THREE.Vector3(Math.cos(angle + j * 2.4) * 0.65, 0.20 + rnd() * 0.38, Math.sin(angle + j * 2.4) * 0.5);
        const length = 0.34 + rnd() * 0.32;
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward.normalize());
        q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 1.8 - 0.9));
        leavesData.push({ pos, q, scale: new THREE.Vector3(length * (0.72 + foliageRandom() * 0.25), length, length), color: new THREE.Color().setHSL(0.26 + rnd() * 0.07, 0.33 + rnd() * 0.16, 0.22 + rnd() * 0.13) });
      }
      const bloomRadius = 0.20 + rnd() * 0.11;
      const forward = eye.clone().sub(top).normalize().lerp(new THREE.Vector3(0, 1, 0), 0.35).normalize();
      const basisQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), forward);
      const floretCount = bushIndex === 0 || bushIndex === 3 ? 45 : 32;
      for (let f = 0; f < floretCount; f++) {
        const polar = Math.acos(1 - (f + 0.5) / (floretCount + 2)), azimuth = f * 2.39996;
        const normal = new THREE.Vector3(Math.sin(polar) * Math.cos(azimuth), Math.sin(polar) * Math.sin(azimuth), Math.cos(polar));
        const centre = normal.clone().multiplyScalar(bloomRadius * (0.88 + rnd() * 0.25));
        centre.x *= 0.92 + foliageRandom() * 0.13;
        centre.y *= 0.82 + foliageRandom() * 0.17;
        centre.z *= 0.75 + foliageRandom() * 0.17;
        centre.applyQuaternion(basisQ).add(top);
        const flowerQ = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().applyQuaternion(basisQ));
        const spin = rnd() * Math.PI * 2, size = 0.065 + rnd() * 0.027;
        const c = new THREE.Color().setHSL(hue + 0.05 + rnd() * 0.035, 0.5 + rnd() * 0.22, 0.42 + rnd() * 0.16);
        for (let petal = 0; petal < 4; petal++) {
          const q = flowerQ.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), spin + petal * Math.PI / 2 + (foliageRandom() - 0.5) * 0.19));
          q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), (foliageRandom() - 0.5) * 0.22));
          const sepalLength = size * (0.83 + foliageRandom() * 0.32);
          petalsData.push({ pos: centre, q, scale: new THREE.Vector3(size * (0.84 + foliageRandom() * 0.22), sepalLength, size), color: c.clone().offsetHSL((foliageRandom() - 0.5) * 0.012, 0, (foliageRandom() - 0.5) * 0.032) });
        }
      }
    }
  });
  const stemMesh = new THREE.Mesh(mergeGeometries(stems)!, stemMat); stemMesh.castShadow = true; garden.add(stemMesh);
  stems.forEach(g => g.dispose());
  const leaves = new THREE.Group(), petals = new THREE.Group();
  leaves.name = 'hydrangea-curved-leaves'; petals.name = 'hydrangea-irregular-sepals';
  const dummy = new THREE.Object3D();
  // Four actual curved surfaces prevent scale/color changes from repeating one primitive.
  for (const [group, data, geometry, mat] of [
    [leaves, leavesData, gardenLeafGeometry, leafMat],
    [petals, petalsData, gardenSepalGeometry, petalMat],
  ] as const) for (let variant = 0; variant < 4; variant++) {
    const instances = data.filter((_, i) => i % 4 === variant);
    const mesh = new THREE.InstancedMesh(geometry(variant), mat, instances.length);
    instances.forEach((d, i) => {
      dummy.position.copy(d.pos); dummy.quaternion.copy(d.q); dummy.scale.copy(d.scale); dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix); mesh.setColorAt(i, d.color);
    });
    mesh.castShadow = mesh.receiveShadow = true; group.add(mesh);
  }
  garden.add(leaves, petals);
  // The far boundary: a dry-stone garden wall with a tiled coping, and irregular bamboo.
  const wallParts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 84; i++) {
    const row = i % 3, x = -12 + Math.floor(i / 3) * 0.88 + (row % 2) * 0.42 + (rnd() - 0.5) * 0.1;
    const g = boulderGeometry(700 + (i % 11), 3);
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, -0.05 + 0.24 + row * 0.42, -11.5), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, (rnd() - 0.5) * 0.3, 0)), new THREE.Vector3(0.46 + rnd() * 0.1, 0.22 + rnd() * 0.04, 0.24)));
    wallParts.push(g);
  }
  const wall = new THREE.Mesh(mergeGeometries(wallParts)!, stone); wall.receiveShadow = true; garden.add(wall);
  wallParts.forEach(g => g.dispose());
  const coping = new THREE.Mesh(new THREE.BoxGeometry(24.3, 0.14, 0.62), applyWetSurface(new THREE.MeshStandardMaterial({ color: '#3f4845', roughness: 0.6 }), { key: 'window-coping', time, wetness: 1, darkening: 0.7, wetRoughness: 0.12, streaks: 0.6 }));
  coping.position.set(0, 1.37, -11.5); coping.castShadow = true; garden.add(coping);
  const bambooMat = applyWetSurface(new THREE.MeshStandardMaterial({ color: '#7d9163', roughness: 0.4 }), { key: 'window-bamboo', time, wetness: 0.7, darkening: 0.85, wetRoughness: 0.15, streaks: 0.5 });
  const bambooParts: THREE.BufferGeometry[] = [];
  const bambooLeaves: THREE.Matrix4[] = [];
  for (let i = 0; i < 29; i++) {
    const x = -11 + i * 0.79 + rnd() * 0.25, h = 3.8 + rnd() * 3.8, z = -12.8 - rnd() * 3.4;
    const start = new THREE.Vector3(x, 0, z), tip = new THREE.Vector3(x + (rnd() - 0.5) * 1.1, h, z + rnd() * 0.8);
    bambooParts.push(limbGeometry([start, start.clone().lerp(tip, 0.5), tip], 0.05 + rnd() * 0.018, 0.035, 8, 12));
    for (let n = 0; n < 7; n++) {
      const centre = start.clone().lerp(tip, 0.42 + n * 0.077);
      const side = n % 2 ? 1 : -1, end = centre.clone().add(new THREE.Vector3(side * (0.9 + rnd()), 0.1 + rnd() * 0.4, rnd() - 0.5));
      bambooParts.push(limbGeometry([centre, end], 0.009, 0.004, 4, 2));
      for (let f = 0; f < 9; f++) {
        dummy.position.copy(centre).lerp(end, (f + 1) / 10);
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(side * (f % 2 ? 0.2 : 0.9), -0.12 - rnd() * 0.7, 0.4).normalize());
        dummy.scale.set(0.09, 0.48 + rnd() * 0.23, 0.3); dummy.updateMatrix(); bambooLeaves.push(dummy.matrix.clone());
      }
    }
  }
  const bambooMesh = new THREE.Mesh(mergeGeometries(bambooParts)!, bambooMat); garden.add(bambooMesh);
  bambooParts.forEach(g => g.dispose());
  const bambooLeafMesh = new THREE.InstancedMesh(leafG, foliage('window-bamboo-leaf', '#4f7355'), bambooLeaves.length);
  bambooLeaves.forEach((m, i) => bambooLeafMesh.setMatrixAt(i, m)); garden.add(bambooLeafMesh);

  // Broad-leaf trees overlap behind the wall; branch-led clumps avoid a repeated sphere hedge.
  const canopyMatrices: THREE.Matrix4[] = [], canopyColors: THREE.Color[] = [];
  const barkParts: THREE.BufferGeometry[] = [];
  for (const [tx, tz, height] of [[-9, -13, 6.7], [-3.5, -13.8, 7.4], [3.4, -14.3, 7.2], [9.2, -12, 7.0]]) {
    const base = new THREE.Vector3(tx, 0, tz), trunkTop = new THREE.Vector3(tx + 0.45, height * 0.65, tz - 0.25);
    barkParts.push(limbGeometry([base, base.clone().lerp(trunkTop, 0.5).add(new THREE.Vector3(0.1, 0, 0)), trunkTop], 0.19, 0.12, 10, 10));
    for (let branch = 0; branch < 9; branch++) {
      const angle = branch * 2.4, spread = 1.1 + rnd() * 1.5;
      const fork = base.clone().lerp(trunkTop, 0.5 + rnd() * 0.43);
      const tip = new THREE.Vector3(tx + Math.cos(angle) * spread, height * (0.57 + rnd() * 0.43), tz + Math.sin(angle) * spread * 0.7);
      barkParts.push(limbGeometry([fork, fork.clone().lerp(tip, 0.5).add(new THREE.Vector3(0, 0.2, 0)), tip], 0.05, 0.015, 5, 6));
      // Leaves gather in clumps around the twig ends rather than one even cloud.
      for (let c = 0; c < 3; c++) {
        const clump = fork.clone().lerp(tip, 0.5 + c * 0.25).add(new THREE.Vector3((rnd() - 0.5) * 0.8, (rnd() - 0.2) * 0.5, (rnd() - 0.5) * 0.6));
        for (let l = 0; l < 44; l++) {
          const n = new THREE.Vector3(rnd() - 0.5, rnd() - 0.35, rnd() - 0.5).normalize();
          dummy.position.copy(clump).addScaledVector(n, 0.75 * Math.cbrt(rnd()));
          dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n.clone().add(new THREE.Vector3(0, 0.7, 0)).normalize());
          dummy.rotateY(rnd() * 6.28);
          const size = 0.26 + rnd() * 0.18;
          dummy.scale.set(size * 0.7, size, size); dummy.updateMatrix(); canopyMatrices.push(dummy.matrix.clone());
          canopyColors.push(new THREE.Color().setHSL(0.25 + rnd() * 0.05, 0.3 + rnd() * 0.2, 0.1 + rnd() * 0.08));
        }
      }
    }
  }
  const barkMesh = new THREE.Mesh(mergeGeometries(barkParts)!, applyWetSurface(new THREE.MeshStandardMaterial({ color: '#4d4a3c', roughness: 0.85 }), { key: 'window-bark', time, wetness: 0.85, darkening: 0.6, wetRoughness: 0.3, streaks: 0.6 }));
  barkParts.forEach(g => g.dispose()); garden.add(barkMesh);
  const canopy = new THREE.InstancedMesh(leafG, foliage('window-canopy', '#e5ebd5'), canopyMatrices.length);
  canopyMatrices.forEach((m, i) => { canopy.setMatrixAt(i, m); canopy.setColorAt(i, canopyColors[i]); });
  canopy.receiveShadow = true; garden.add(canopy);

  // Small ground plants establish scale between path and flower beds.
  const fernMatrices: THREE.Matrix4[] = [];
  for (let clump = 0; clump < 26; clump++) {
    const z = -1.6 - rnd() * 8, x = pathX(z) + (clump % 2 ? 1 : -1) * (0.71 + rnd() * 1.0);
    for (let frond = 0; frond < 6; frond++) {
      const angle = frond * 1.047 + clump, direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      for (let pair = 1; pair <= 7; pair++) for (const side of [-1, 1]) {
        const t = pair / 8, span = 0.17 * Math.sin(t * Math.PI);
        dummy.position.set(x + direction.x * t * 0.46, groundY(x, z) + 0.1 + Math.sin(t * Math.PI * 0.7) * 0.35, z + direction.z * t * 0.46);
        const out = new THREE.Vector3(direction.z * side, 0.10, -direction.x * side);
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), out.normalize());
        dummy.scale.set(span * 0.62, span, span); dummy.updateMatrix(); fernMatrices.push(dummy.matrix.clone());
      }
    }
  }
  const ferns = new THREE.InstancedMesh(leafG, foliage('window-fern', '#657b43'), fernMatrices.length);
  fernMatrices.forEach((m, i) => ferns.setMatrixAt(i, m)); ferns.receiveShadow = true; garden.add(ferns);

  // Rain fills the garden at several depths, with splashes on the stones and path.
  const rainSky = new THREE.Color(1.25, 1.35, 1.4);
  const rainLayers = [
    createRainLayer({ time, count: 1600, min: new THREE.Vector3(-4, -0.2, -3.2), max: new THREE.Vector3(4, 3.8, -0.35), speed: 7, width: 0.0018, shutter: 0.03, radiance: rainSky, opacity: 0.55, seed: 31, wind: new THREE.Vector2(0.04, 0) }),
    createRainLayer({ time, count: 5000, min: new THREE.Vector3(-10, -0.2, -10), max: new THREE.Vector3(10, 7, -3.2), speed: 7.4, width: 0.0016, shutter: 0.03, radiance: rainSky, opacity: 0.5, seed: 32, wind: new THREE.Vector2(0.04, 0) }),
    createRainLayer({ time, count: 7000, min: new THREE.Vector3(-18, -0.2, -24), max: new THREE.Vector3(18, 12, -10), speed: 7.8, width: 0.0015, shutter: 0.03, radiance: rainSky, opacity: 0.45, seed: 33, wind: new THREE.Vector2(0.04, 0) }),
  ];
  rainLayers.forEach(layer => garden.add(layer.mesh));
  const splashPoints: number[] = [];
  for (let i = 0; i < 360; i++) {
    const z = -1.0 - Math.pow(rnd(), 1.3) * 9, x = (rnd() - 0.5) * 7;
    splashPoints.push(x, groundY(x, z) + 0.03, z);
  }
  const splashes = createRainSplashes({ points: splashPoints, time, size: 0.045, rate: 1.5, jitter: 0.12, radiance: new THREE.Color(1.1, 1.2, 1.25), opacity: 0.45 });
  garden.add(splashes.mesh);
  // Every garden surface writes its view distance into alpha for the glass depth of field.
  const encoded = new Set<THREE.Material>();
  garden.traverse(object => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      if (encoded.has(material)) continue;
      encoded.add(material); encodeDepthInAlpha(material);
    }
  });
  disposables.push(...rainLayers, splashes);

  // ---- Glass: refraction comes from this same 3D scene and camera, not a backdrop image.
  const refraction = createRainRefractionTarget(renderer);
  const glassUniforms = {
    uScene: { value: null as THREE.Texture | null }, uResolution: { value: new THREE.Vector2(1, 1) }, uTime: time,
    uTouch: { value: new THREE.Vector2(-2, -2) }, uTouchStrength: { value: 0 }, uRoom: { value: new THREE.Color(0.12, 0.085, 0.055) },
    uMistTint: { value: new THREE.Color(0.17, 0.2, 0.195) }, uFocus: { value: 3.1 },
  };
  const glassMat = new THREE.ShaderMaterial({
    uniforms: glassUniforms, transparent: false, depthWrite: true, toneMapped: true,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: GLASS_FRAGMENT,
  });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(GLASS_W, GLASS_H), glassMat);
  glass.position.set(0, 2.15, -0.012); scene.add(glass);
  const raycaster = new THREE.Raycaster(), viewport = new THREE.Vector2();
  let traceAge = 100, currentTime = 0;
  const probes: THREE.WebGLRenderTarget[] = [];
  const rainObjects = () => [...rainLayers.map(l => l.mesh), splashes.mesh];
  const resize = (aspect: number) => {
    camera.fov = aspect < 0.85 ? 51 : 49;
    camera.position.set(aspect < 0.85 ? -0.08 : 0.12, aspect < 0.85 ? 1.42 : 1.47, aspect < 0.85 ? 3.15 : 3.05);
    camera.lookAt(aspect < 0.85 ? -0.07 : 0, aspect < 0.85 ? 1.45 : 1.38, -3.5);
    camera.updateProjectionMatrix();
  };
  return {
    resize,
    post: {
      exposure: 1.0, bloomStrength: 0.06, bloomThreshold: 0, aoStrength: 0.8, aoRadius: 0.3,
      saturation: 1.02, contrast: 1.08, shadowTint: [0.96, 0.97, 1.03], highlightTint: [1.03, 1.0, 0.96], vignette: 0.45, grain: 0.028,
    },
    prepare(live, hdr) {
      if (!hdr) return;
      const skyProbe = captureSkyProbe(live, sky.material);
      probes.push(skyProbe);
      scene.environment = skyProbe.texture;
      const glassVisible = glass.visible;
      glass.visible = false;
      try {
        const gardenProbe = captureProbe(live, scene, new THREE.Vector3(0, 1.3, -4), rainObjects(), 128, 120);
        probes.push(gardenProbe);
        scene.environment = gardenProbe.texture;
        const roomProbe = captureProbe(live, scene, new THREE.Vector3(0.1, 1.4, 2.2), rainObjects(), 128, 120);
        probes.push(roomProbe);
        for (const part of [sashMesh, railMesh, apronMesh, sillMesh, bowl, bowlWater, sillBeads, room, ...glassOccluders]) assignProbe(part, roomProbe.texture, 1);
      } finally { glass.visible = glassVisible; }
    },
    setPostActive(active) { fallbackFill.visible = !active && !scene.environment; },
    setViewHeight(pixels) { rainLayers.forEach(layer => layer.setViewHeight(pixels)); },
    update(t, dt) {
      currentTime = t; traceAge += dt;
      time.value = t;
      glassUniforms.uTouchStrength.value = Math.max(0, 1 - traceAge / 8);
      garden.rotation.y = Math.sin(t * 0.19) * 0.00045;
      bambooLeafMesh.rotation.z = Math.sin(t * 0.28) * 0.0025;
      canopy.rotation.z = Math.sin(t * 0.16) * 0.0009;
      leaves.rotation.z = Math.sin(t * 0.37) * 0.0017; petals.rotation.z = Math.sin(t * 0.37) * 0.0017;
      renderer.getDrawingBufferSize(viewport);
      const target = refraction.ensure(Math.max(1, viewport.x), Math.max(1, viewport.y));
      glassUniforms.uScene.value = target.texture; glassUniforms.uResolution.value.copy(viewport);
      const glassVisible = glass.visible;
      try {
        glass.visible = false;
        withRainRenderTargetState(renderer, () => {
          renderer.setRenderTarget(target, 0, 0); renderer.clear(); renderer.render(scene, camera);
        });
      } finally { glass.visible = glassVisible; }
    },
    interact(x, y, explicit) {
      if (explicit) glassUniforms.uTouch.value.set(0.52, 0.43);
      else {
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const hit = raycaster.intersectObjects([glass, ...glassOccluders], false)[0];
        if (!hit?.uv || hit.object !== glass) return null;
        glassUniforms.uTouch.value.copy(hit.uv);
      }
      traceAge = 0;
      return { action: 'glass-trace', value: 0.65 + Math.sin(currentTime) * 0.1 };
    },
    dispose() {
      refraction.dispose();
      disposables.forEach(d => d.dispose());
      probes.forEach(p => p.dispose());
      scene.environment = null;
    },
  };
};
