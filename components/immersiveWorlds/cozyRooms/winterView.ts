import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GLSL_NOISE } from '../shared/render/glsl';
import { noise3, seeded } from '../shared/render/noise';

/*
 * The winter lodge's view: snow-laden Norway spruces built branch by branch
 * (whorls of drooping, flattened sprays around a straight leader, each spray a
 * ribbon whose upper face carries snow and whose ragged edges and dark
 * undersides stay needle-green), placed in depth layers that fade into the
 * blue-hour air; and the window's own winter: fern frost creeping in from the
 * corners and frame, a fogged band of condensation along the bottom rail with
 * beads of water. Original procedural work.
 */

/**
 * A spruce of unit height on the origin. `detail` 0 is a near tree (many
 * sprays), 2 a far silhouette. Vertices carry `aSpray` = (height fraction,
 * distance along the spray, across the spray, per-spray random).
 */
export function spruceGeometry(seed: number, detail: 0 | 1 | 2) {
  const random = seeded(seed * 977 + 13);
  const whorls = [22, 13, 8][detail], perWhorl = [11, 8, 6][detail], segments = [4, 3, 2][detail];
  const positions: number[] = [], sprays: number[] = [], index: number[] = [];
  let base = 0;
  const lean = (random() - 0.5) * 0.04;
  const profile = (t: number) => 0.3 * Math.pow(1 - t, 1.0) + 0.018;
  for (let w = 0; w < whorls; w++) {
    const t = 0.06 + 0.9 * Math.pow(w / whorls, 0.9);
    const reach = profile(t) * (0.85 + random() * 0.3);
    const twist = random() * Math.PI * 2;
    for (let b = 0; b < perWhorl; b++) {
      const angle = twist + (b / perWhorl) * Math.PI * 2 + (random() - 0.5) * 0.45;
      const len = reach * (0.8 + random() * 0.35);
      const droop = len * (0.45 + random() * 0.25);
      const width = len * (0.75 + random() * 0.3);
      const lift = (random() - 0.5) * 0.9 / whorls;
      const r = random();
      const ca = Math.cos(angle), sa = Math.sin(angle);
      for (let k = 0; k <= segments; k++) {
        const s = k / segments;
        const radial = 0.01 + s * len;
        // Sprays sag under snow and turn up a little at the tip.
        const y = t + lift - droop * Math.pow(s, 1.4) + droop * 0.2 * Math.pow(s, 5) + lean * t;
        const half = width * Math.pow(1 - s * 0.9, 0.6) * (0.5 + 0.5 * Math.sin(Math.min(1, s * 2.5) * Math.PI / 2));
        for (const v of [-1, 0, 1]) {
          const ragged = v === 0 ? 0 : noise3(s * 6 + seed, v * 3 + w, b) * 0.35;
          const off = v * half * (1 + ragged);
          // Perpendicular in the horizontal plane; the spray's sides hang lower than its midrib.
          const x = ca * radial - sa * off, z = sa * radial + ca * off;
          positions.push(x, y - Math.abs(v) * half * 0.45, z);
          sprays.push(t, s, v, r);
        }
        if (k < segments) {
          const a = base + k * 3;
          index.push(a, a + 3, a + 1, a + 1, a + 3, a + 4, a + 1, a + 4, a + 2, a + 2, a + 4, a + 5);
        }
      }
      base += (segments + 1) * 3;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('aSpray', new THREE.Float32BufferAttribute(sprays, 4));
  g.setIndex(index);
  g.computeVertexNormals();
  // A dense, ragged needle core under the sprays so no sky shows through the crown.
  const rings = [16, 10, 6][detail], radial = [14, 10, 7][detail];
  const corePositions: number[] = [], coreSpray: number[] = [], coreIndex: number[] = [];
  for (let i = 0; i <= rings; i++) {
    const t = 0.04 + 0.96 * (i / rings);
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const rr = profile(t) * 0.68 * (1 + noise3(Math.cos(a) * 2 + seed, t * 9, Math.sin(a) * 2) * 0.35) * (i === rings ? 0 : 1);
      corePositions.push(Math.cos(a) * rr, t - 0.04 * Math.sin(t * 40 + a * 3) * (1 - t), Math.sin(a) * rr);
      coreSpray.push(t, 0.35, 0, -2);
      if (i < rings && j < radial) { const n = i * (radial + 1) + j; coreIndex.push(n, n + radial + 1, n + 1, n + 1, n + radial + 1, n + radial + 2); }
    }
  }
  const core = new THREE.BufferGeometry();
  core.setAttribute('position', new THREE.Float32BufferAttribute(corePositions, 3));
  core.setAttribute('aSpray', new THREE.Float32BufferAttribute(coreSpray, 4));
  core.setIndex(coreIndex);
  core.computeVertexNormals();
  const merged = mergeGeometries([g.toNonIndexed(), core.toNonIndexed()], false)!;
  g.dispose(); core.dispose();
  return merged;
}

export const SPRUCE_VERTEX = /* glsl */ `
attribute vec4 aSpray;
uniform float uTime;
varying vec3 vWorld;
varying vec3 vNormalW;
varying vec4 vSpray;
void main() {
  #ifdef USE_INSTANCING
  mat4 m = modelMatrix * instanceMatrix;
  #else
  mat4 m = modelMatrix;
  #endif
  vec3 p = position;
  // A slow sway that grows with height and toward the spray tips.
  float phase = m[3].x * 0.37 + m[3].z * 0.21;
  float sway = sin(uTime * 0.45 + phase) * 0.6 + sin(uTime * 0.83 + phase * 1.7) * 0.4;
  p.x += sway * 0.006 * p.y * p.y + sin(uTime * 1.3 + phase + aSpray.y * 3.0) * 0.003 * aSpray.y;
  vec4 w = m * vec4(p, 1.0);
  vWorld = w.xyz;
  vNormalW = normalize(mat3(m) * normal);
  vSpray = aSpray;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

/** Spruce shading: snow on upward faces of the sprays, dark needles below and at ragged tips, aerial perspective. */
export const SPRUCE_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uHorizon;
uniform vec3 uSkyLight;
uniform vec3 uGlow;
uniform float uTime;
varying vec3 vWorld;
varying vec3 vNormalW;
varying vec4 vSpray;
vec3 aerial(vec3 color, float dist, float height) {
  float f = 1.0 - exp(-dist * 0.0072 * exp(-max(height, 0.0) * 0.03));
  return mix(color, uHorizon, clamp(f, 0.0, 0.88));
}
void main() {
  vec3 n = normalize(vNormalW) * (gl_FrontFacing ? 1.0 : -1.0);
  float dist = length(vWorld - cameraPosition);
  float core = step(vSpray.w, -1.5);
  float trunk = 0.0;
  // Snow lies thickest mid-spray on the upper face, in clumps; tips and edges stay green.
  float clump = bwNoise(vWorld * 4.5 + vSpray.w * 7.0) * 0.5 + bwNoise(vWorld * 13.0) * 0.25;
  float edge = abs(vSpray.z);
  float load = smoothstep(0.25, 0.75, n.y + clump * 0.55) * (1.0 - smoothstep(0.55, 0.95, vSpray.y)) * (1.0 - smoothstep(0.5, 1.0, edge + clump * 0.3));
  load = max(load, smoothstep(0.6, 0.9, n.y) * 0.35);
  // The core is needle mass under the sprays: dark, with a little snow caught on its upper shoulders.
  load = mix(load, smoothstep(0.5, 0.85, n.y + clump * 0.5) * 0.55, core);
  vec3 needles = vec3(0.016, 0.03, 0.028) * (0.7 + 0.6 * clump) * mix(0.6, 1.0, vSpray.y) * mix(1.0, 0.55, core);
  vec3 snow = vec3(0.66, 0.72, 0.86);
  vec3 albedo = mix(needles, snow, load);
  // Sky light from above; the inner crown is self-shadowed.
  float sky = 0.22 + 0.78 * clamp(n.y * 0.5 + 0.5, 0.0, 1.0);
  float inner = mix(0.45, 1.0, smoothstep(0.0, 0.6, vSpray.y));
  vec3 color = albedo * uSkyLight * sky * inner;
  // The last warm light on high snow facing the hidden sun.
  color += snow * uGlow * load * clamp(n.z * 0.5 + 0.6, 0.0, 1.0) * smoothstep(20.0, 60.0, vWorld.y + 40.0) * 0.0;
  // Crystal glints on near snow.
  vec3 h = bwHash3(floor(vWorld * 70.0));
  color += vec3(0.8, 0.9, 1.0) * step(0.996, h.x) * load * smoothstep(40.0, 10.0, dist) * (0.6 + 0.4 * sin(uTime * 0.6 + h.y * 30.0));
  gl_FragColor = vec4(aerial(color, dist, vWorld.y), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/**
 * Frost on the inside of a cold pane: fern frost grown from the frame and the
 * corners, thin and feathery at its front, with a fogged condensation band and
 * beads of water along the bottom rail. `uPanes` are the pane rectangles (x0, y0, x1, y1) in metres.
 */
export const FROST_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec2 uSize;
uniform vec4 uPanes[6];
uniform vec3 uWarm;
uniform float uTime;
varying vec2 vUv;
float paneDistance(vec2 p, vec4 r, out vec2 local) {
  local = (p - r.xy) / (r.zw - r.xy);
  vec2 d = min(p - r.xy, r.zw - p);
  return min(d.x, d.y);
}
void main() {
  vec2 p = vUv * uSize;
  float d = 1e3; vec2 local = vec2(0.5); vec4 pane = uPanes[0];
  for (int i = 0; i < 6; i++) {
    vec2 l; float di = paneDistance(p, uPanes[i], l);
    if (di > -0.001 && (l.x >= 0.0 && l.x <= 1.0 && l.y >= 0.0 && l.y <= 1.0)) { d = di; local = l; pane = uPanes[i]; }
  }
  vec2 ps = pane.zw - pane.xy;
  vec2 q = local * ps;
  vec2 toCorner = min(q, ps - q);
  float corner = length(max(vec2(0.0), 0.32 - toCorner)) * 1.25;
  // The frost front: lobed, thicker in corners and along the bottom rail.
  float front = 0.012 + corner * 0.62 + 0.06 * bwFbm3(vec3(p * 1.7, 1.0)) + 0.035 * (1.0 - smoothstep(0.0, 0.5, q.y));
  float body = 1.0 - smoothstep(front - 0.04, front, d);
  // Fern-like dendrites growing inward: stretched ridged noise aligned to the growth direction.
  vec2 grow = normalize(vec2(toCorner.x < toCorner.y ? (q.x < ps.x * 0.5 ? 1.0 : -1.0) : 0.0, toCorner.y <= toCorner.x ? (q.y < ps.y * 0.5 ? 1.0 : -1.0) : 0.0) + 1e-4);
  vec2 side = vec2(-grow.y, grow.x);
  vec2 f = vec2(dot(p, side), dot(p, grow));
  // Dendrites: a main stem along the growth direction with side branches at about 60 degrees either way.
  vec2 fa = vec2(f.x * 0.5 + f.y * 0.866, f.y * 0.5 - f.x * 0.866), fb = vec2(f.x * 0.5 - f.y * 0.866, f.y * 0.5 + f.x * 0.866);
  float stem = pow(bwRidged(vec3(f * vec2(9.0, 2.2), 3.0)), 6.0);
  float branches = max(pow(bwRidged(vec3(fa * vec2(34.0, 9.0), 4.0)), 7.0), pow(bwRidged(vec3(fb * vec2(34.0, 9.0), 5.0)), 7.0));
  float fern = clamp(stem * 1.4 + branches * 0.9, 0.0, 1.2);
  float feather = (1.0 - smoothstep(front - 0.1, front + 0.12, d)) * fern * (0.6 + 0.4 * bwNoise(vec3(p * 5.0, 7.0)));
  float frost = clamp(body * (0.18 + 0.42 * fern) + feather * 0.6, 0.0, 1.0);
  // Condensation: a misted band above the bottom rail with beads of water.
  float mist = (1.0 - smoothstep(0.02, 0.22, q.y)) * 0.22 * (0.7 + 0.3 * bwNoise(vec3(p * 3.0, 6.0)));
  vec2 cell = floor(p / 0.014), fc = fract(p / 0.014) - 0.5;
  vec3 hh = bwHash3(vec3(cell, 9.0));
  float bead = (1.0 - smoothstep(0.18, 0.3, length(fc - (hh.xy - 0.5) * 0.4) / (0.25 + hh.z * 0.6))) * step(0.72, hh.z) * (1.0 - smoothstep(0.05, 0.3, q.y));
  vec3 ice = vec3(0.7, 0.78, 0.92) * (0.8 + 0.5 * fern);
  vec3 color = mix(ice, ice * uWarm, 0.35);
  float alpha = frost * 0.7 + mist + bead * 0.45;
  color = mix(color, vec3(0.85, 0.88, 0.95), bead * 0.5);
  gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.92));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
