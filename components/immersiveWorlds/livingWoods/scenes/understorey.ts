import * as THREE from 'three';
import { canvasToFoliageTexture, type LeafPalette } from '../../shared/render/foliageTextures';
import { seeded } from '../../shared/render/noise';

/*
 * Rooted broad-leaved understorey for the wet forest: butterbur-like round
 * leaves held up on petioles from one crown, and fountains of ribbed,
 * hosta-like leaves arching from the soil. Each clump is one merged leaf
 * geometry plus one petiole geometry, built around its own root so a touch
 * can tremble the whole plant. Leaf tips also feed a GPU drip layer: water
 * gathers at each tip, swells, lets go and falls under gravity, all in the
 * vertex shader. Original geometry and drawings.
 */

type Ctx = CanvasRenderingContext2D;

function shade(color: string, random: () => number, light: number) {
  const c = new THREE.Color(color);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL(hsl.h + (random() - 0.5) * 0.03, hsl.s, THREE.MathUtils.clamp(hsl.l * (1 + (random() - 0.5) * light), 0, 1));
  return `#${c.getHexString()}`;
}

/** Two round, notched (reniform) leaves side by side; the petiole meets each at the bottom centre (v = 0). */
export function roundLeafTexture(o: { seed: number; palette: LeafPalette; size?: number }) {
  const size = o.size ?? 512;
  const element = document.createElement('canvas');
  element.width = size * 2; element.height = size;
  const ctx = element.getContext('2d', { willReadFrequently: true })!;
  const random = seeded(o.seed);
  for (let variant = 0; variant < 2; variant++) {
    const cx = size * (variant + 0.5), base = size * 0.985;
    const r = size * 0.47;
    const centre = base - r * 1.02;
    const outline = (inset = 0) => {
      ctx.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        // Angle measured from straight down (the sinus) around the leaf.
        const a = 0.42 + (i / steps) * (Math.PI * 2 - 0.84);
        const wobble = 1 + 0.025 * Math.sin(a * 9 + variant * 2) + 0.012 * Math.sin(a * 23 + variant) + (variant ? 0.04 : 0.02) * Math.sin(a * 2.5);
        // Fine teeth along the margin.
        const tooth = 1 - 0.012 * Math.abs(Math.sin(a * 36));
        const rr = (r - inset) * wobble * tooth;
        const x = cx + Math.sin(a) * rr, y = centre + Math.cos(a) * rr * 0.96;
        if (i === 0) ctx.moveTo(cx, centre + r * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cx, centre + r * 0.5);
      ctx.closePath();
    };
    const body = ctx.createRadialGradient(cx, centre + r * 0.6, r * 0.05, cx, centre, r * 1.05);
    body.addColorStop(0, o.palette.light);
    body.addColorStop(0.45, o.palette.base);
    body.addColorStop(1, o.palette.dark);
    outline();
    ctx.fillStyle = body;
    ctx.fill();
    ctx.save();
    outline();
    ctx.clip();
    // Puckered lamina between the veins and a few darker, older patches.
    for (let i = 0; i < 180; i++) {
      ctx.fillStyle = random() > 0.5 ? 'rgba(255,255,210,0.045)' : 'rgba(10,25,6,0.06)';
      ctx.beginPath();
      ctx.ellipse(cx + (random() - 0.5) * r * 2, centre + (random() - 0.5) * r * 2, 3 + random() * size * 0.03, 3 + random() * size * 0.03, random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // Palmate veins fan from the petiole point, forking toward the margin.
    const veins = 9;
    ctx.lineCap = 'round';
    for (let v = 0; v < veins; v++) {
      const a = Math.PI + (v / (veins - 1) - 0.5) * 2 * 2.3;
      const len = r * (0.95 + random() * 0.08);
      const sx = cx, sy = centre + r * 0.5;
      const ex = cx + Math.sin(a) * len, ey = centre + Math.cos(a) * len * 0.96;
      ctx.strokeStyle = shade(o.palette.light, random, 0.1);
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = size * 0.009;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + Math.cos(a) * r * 0.08, (sy + ey) / 2, ex, ey); ctx.stroke();
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = size * 0.004;
      for (let k = 1; k <= 4; k++) {
        const t = k / 5;
        const px = sx + (ex - sx) * t, py = sy + (ey - sy) * t;
        for (const side of [-1, 1]) {
          const b = a + side * (0.5 + random() * 0.3);
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.sin(b) * r * 0.22 * (1 - t * 0.5), py + Math.cos(b) * r * 0.22 * (1 - t * 0.5)); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    // A browned, slightly torn margin and the odd hole.
    ctx.strokeStyle = 'rgba(95,80,35,0.5)';
    ctx.lineWidth = size * 0.012;
    outline(size * 0.004);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    for (let k = 0; k < 3; k++) {
      ctx.beginPath(); ctx.arc(cx + (random() - 0.5) * r * 1.4, centre + (random() - 0.5) * r * 1.2, 2 + random() * size * 0.012, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
  return canvasToFoliageTexture(element, 8);
}

/** Two ribbed, ovate leaves with arcuate veins (hosta-like); base at v = 0. */
export function ribbedLeafTexture(o: { seed: number; palette: LeafPalette; width?: number; height?: number }) {
  const w = o.width ?? 256, h = o.height ?? 512;
  const element = document.createElement('canvas');
  element.width = w * 2; element.height = h;
  const ctx = element.getContext('2d', { willReadFrequently: true })!;
  const random = seeded(o.seed);
  for (let variant = 0; variant < 2; variant++) {
    const cx = w * (variant + 0.5);
    const half = w * (0.43 + variant * 0.04);
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(cx, h * 0.99);
      ctx.bezierCurveTo(cx + half * 0.9, h * 0.86, cx + half * 1.1, h * 0.45, cx, h * 0.015);
      ctx.bezierCurveTo(cx - half * 1.1, h * 0.45, cx - half * 0.9, h * 0.86, cx, h * 0.99);
      ctx.closePath();
    };
    const across = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
    across.addColorStop(0, o.palette.dark);
    across.addColorStop(0.3, o.palette.base);
    across.addColorStop(0.5, o.palette.light);
    across.addColorStop(0.7, o.palette.base);
    across.addColorStop(1, o.palette.dark);
    path();
    ctx.fillStyle = across;
    ctx.fill();
    ctx.save();
    path();
    ctx.clip();
    // Deep parallel ribs: alternating dark furrow and light crest arcs.
    for (let i = 1; i <= 7; i++) {
      for (const side of [-1, 1]) {
        const s = i / 8;
        for (const [color, offset, width] of [['rgba(15,30,8,0.35)', 0, 0.012], ['rgba(230,255,190,0.16)', 0.012, 0.007]] as Array<[string, number, number]>) {
          ctx.strokeStyle = color;
          ctx.lineWidth = w * width;
          ctx.beginPath();
          ctx.moveTo(cx, h * 0.97);
          ctx.bezierCurveTo(cx + side * half * (s * 1.1 + offset), h * 0.82, cx + side * half * (s * 1.0 + offset), h * (0.45 + s * 0.05), cx + side * half * s * 0.15, h * (0.06 + s * 0.04));
          ctx.stroke();
        }
      }
    }
    ctx.strokeStyle = 'rgba(220,240,180,0.55)';
    ctx.lineWidth = w * 0.02;
    ctx.beginPath(); ctx.moveTo(cx, h * 0.99); ctx.lineTo(cx, h * 0.03); ctx.stroke();
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = random() > 0.5 ? 'rgba(255,255,210,0.05)' : 'rgba(10,25,6,0.07)';
      ctx.beginPath(); ctx.ellipse(cx + (random() - 0.5) * half * 2, random() * h, 2 + random() * w * 0.05, 2 + random() * w * 0.08, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
  return canvasToFoliageTexture(element, 8);
}

/**
 * A leaf blade grid in its own frame: base at the origin, running along +z,
 * width along x, cupped across and drooping toward the tip. uv spans one atlas
 * column. Returns the geometry and the local position of its tip.
 */
export function bladeGrid(o: { width: number; length: number; cup: number; droop: number; column: number; columns: number; arch?: number; cols?: number; rows?: number; attach?: number; wave?: number }) {
  // `attach`: where along the blade (0..1) the petiole meets it; lobes behind that point reach back past the stalk.
  const attach = o.attach ?? 0;
  const cols = o.cols ?? 10, rows = o.rows ?? 14;
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let i = 0; i <= rows; i++) {
    const v = i / rows;
    for (let j = 0; j <= cols; j++) {
      const u = j / cols;
      const x = (u - 0.5) * o.width;
      const across = (u - 0.5) * 2;
      // Cup across, an arch along the midrib, and a droop at the far end.
      const y = across * across * o.cup * Math.sin(Math.PI * Math.min(1, v * 1.1 + 0.1)) + (o.arch ?? 0) * Math.sin(Math.PI * v) - o.droop * v * v
        // A soft wave toward the margin, so a broad blade never reads as a flat disc.
        + (o.wave ?? 0) * Math.sin(Math.atan2(across, v * 2 - 1) * 5 + o.column) * Math.min(1, Math.hypot(across, v * 2 - 1)) ** 2;
      positions.push(x, y, (v - attach) * o.length);
      uvs.push((o.column + u) / o.columns, v);
    }
  }
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const a = i * (cols + 1) + j, b = a + cols + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return { geometry, tip: new THREE.Vector3(0, (o.arch ?? 0) * Math.sin(Math.PI * 0.97) - o.droop * 0.94, (0.97 - attach) * o.length) };
}

export interface ClumpBuild {
  leaves: THREE.BufferGeometry;
  stalks: THREE.BufferGeometry;
  /** Leaf tips in the clump's frame, where water gathers and drips. */
  tips: THREE.Vector3[];
  /** Points on upward-facing leaf surfaces (for beads and splashes), clump frame. */
  tops: THREE.Vector3[];
}

function mergeIndexed(parts: THREE.BufferGeometry[]) {
  const out = new THREE.BufferGeometry();
  const names = Object.keys(parts[0].attributes);
  let count = 0;
  for (const p of parts) count += p.attributes.position.count;
  for (const name of names) {
    const size = parts[0].attributes[name].itemSize;
    const array = new Float32Array(count * size);
    let offset = 0;
    for (const p of parts) { array.set(p.attributes[name].array as Float32Array, offset); offset += p.attributes[name].count * size; }
    out.setAttribute(name, new THREE.BufferAttribute(array, size));
  }
  const indices: number[] = [];
  let base = 0;
  for (const p of parts) { for (const i of p.index!.array) indices.push(i + base); base += p.attributes.position.count; }
  out.setIndex(indices);
  return out;
}

/**
 * One plant: `kind` 'round' (leaves held out on long petioles, nearly level) or
 * 'ribbed' (a fountain of arching leaves on short petioles). Built at the origin.
 */
export function buildClump(o: { seed: number; kind: 'round' | 'ribbed'; leaves: number; scale: number; columns?: number }): ClumpBuild {
  const random = seeded(o.seed);
  const leafParts: THREE.BufferGeometry[] = [], stalkParts: THREE.BufferGeometry[] = [];
  const tips: THREE.Vector3[] = [], tops: THREE.Vector3[] = [];
  const columns = o.columns ?? 2;
  for (let i = 0; i < o.leaves; i++) {
    const azimuth = (i / o.leaves) * Math.PI * 2 + (random() - 0.5) * 0.9;
    const inner = i < Math.ceil(o.leaves * 0.35);
    let petiole: number, out: number, width: number, length: number, pitch: number, droop: number, cup: number, arch: number;
    if (o.kind === 'round') {
      // Younger leaves stand taller in the middle; older ones lean out lower.
      petiole = (inner ? 0.55 + random() * 0.3 : 0.3 + random() * 0.3) * o.scale;
      out = (inner ? 0.06 + random() * 0.1 : 0.16 + random() * 0.2) * o.scale;
      width = (0.42 + random() * 0.24) * o.scale;
      length = width * 0.98;
      pitch = 0.05 - random() * 0.25 - (inner ? 0 : 0.12);
      droop = width * (0.05 + random() * 0.08); cup = width * 0.07; arch = width * 0.04;
    } else {
      // Broad ovate blades on arching petioles that lean out from the crown, tips bowed down.
      petiole = (inner ? 0.22 + random() * 0.12 : 0.12 + random() * 0.1) * o.scale;
      out = (inner ? 0.06 : 0.12 + random() * 0.1) * o.scale;
      width = (0.24 + random() * 0.08) * o.scale;
      length = (0.36 + random() * 0.12) * o.scale;
      pitch = (inner ? 0.45 : 0.18) + random() * 0.2;
      droop = length * (0.34 + random() * 0.2); cup = width * 0.12; arch = length * 0.12;
    }
    const dir = new THREE.Vector3(Math.cos(azimuth), 0, Math.sin(azimuth));
    // The petiole rises from the crown and bends out toward the blade's base.
    const top = new THREE.Vector3(dir.x * out, petiole, dir.z * out);
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(dir.x * 0.01, -0.03, dir.z * 0.01),
      new THREE.Vector3(dir.x * out * 0.2, petiole * 0.45, dir.z * out * 0.2),
      new THREE.Vector3(dir.x * out * 0.65, petiole * 0.85, dir.z * out * 0.65),
      top,
    ]);
    const stalkRadius = (o.kind === 'round' ? 0.011 : 0.008) * Math.sqrt(o.scale);
    stalkParts.push(new THREE.TubeGeometry(curve, 10, stalkRadius, 6, false));
    const attach = o.kind === 'round' ? 0.26 : 0;
    const blade = bladeGrid({ width, length, cup, droop, arch, attach, wave: o.kind === 'round' ? width * 0.035 : 0, column: Math.floor(random() * columns), columns });
    // Blade frame: base at the petiole top, running outward along `dir`, pitched and rolled a little.
    const frame = new THREE.Matrix4().compose(
      top,
      new THREE.Quaternion().setFromEuler(new THREE.Euler(-pitch, Math.atan2(dir.x, dir.z), (random() - 0.5) * 0.25, 'YXZ')),
      new THREE.Vector3(1, 1, 1),
    );
    blade.geometry.applyMatrix4(frame);
    leafParts.push(blade.geometry);
    tips.push(blade.tip.clone().applyMatrix4(frame));
    for (let k = 0; k < 4; k++) {
      const v = 0.25 + random() * 0.55, u = (random() - 0.5) * 0.6;
      const across = u * 2;
      const local = new THREE.Vector3(u * width, across * across * cup + arch * Math.sin(Math.PI * v) - droop * v * v + 0.006, (v - attach) * length);
      tops.push(local.applyMatrix4(frame));
    }
  }
  const leaves = mergeIndexed(leafParts);
  leaves.computeVertexNormals();
  const stalks = mergeIndexed(stalkParts);
  leafParts.forEach(g => g.dispose()); stalkParts.forEach(g => g.dispose());
  return { leaves, stalks, tips, tops };
}

/**
 * Water gathering at leaf tips and falling: a bead swells at each tip, lets go,
 * and falls under gravity as a short motion-blurred streak, all in the vertex
 * shader. `touch` holds the time of the last touch per group, which shakes
 * that group's drops loose at once.
 */
export function createDrips(o: { tips: Array<{ point: THREE.Vector3; ground: number; group: number }>; time: { value: number }; groups: number; radiance: THREE.Color }) {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0], 3));
  geometry.setIndex([0, 2, 1, 2, 3, 1]);
  const origin = new Float32Array(o.tips.length * 4), seed = new Float32Array(o.tips.length * 2);
  const random = seeded(9917);
  o.tips.forEach((tip, i) => {
    origin.set([tip.point.x, tip.point.y, tip.point.z, Math.max(0.05, tip.point.y - tip.ground)], i * 4);
    seed.set([random(), tip.group], i * 2);
  });
  geometry.setAttribute('aOrigin', new THREE.InstancedBufferAttribute(origin, 4));
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 2));
  geometry.instanceCount = o.tips.length;
  const touch = new Float32Array(Math.max(1, o.groups)).fill(-100);
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: o.time, uTouch: { value: touch }, uRadiance: { value: o.radiance.clone() } },
    vertexShader: /* glsl */ `
#define GROUPS ${Math.max(1, o.groups)}
attribute vec4 aOrigin;
attribute vec2 aSeed;
uniform float uTime;
uniform float uTouch[GROUPS];
varying vec2 vCorner;
varying float vAlpha;
void main() {
  float fall = sqrt(2.0 * aOrigin.w / 9.81);
  float swell = 1.6 + 3.2 * aSeed.x;
  float period = swell + fall;
  float t = mod(uTime + aSeed.x * 37.0, period);
  float since = uTime - uTouch[int(aSeed.y + 0.5)];
  // A touch releases the drop at once (whatever its own rhythm).
  if (since >= 0.0 && since < fall * 1.5) t = swell + since * (0.85 + 0.3 * aSeed.x);
  vec3 p;
  float len, width;
  if (t < swell) {
    // Hanging and slowly growing at the tip.
    float g = t / swell;
    p = aOrigin.xyz - vec3(0.0, 0.004 + 0.004 * g, 0.0);
    len = 0.004 + 0.006 * g; width = 0.0025 + 0.0022 * g;
    vAlpha = 0.45 + 0.4 * g;
  } else {
    float s = min(t - swell, fall);
    float drop = 4.905 * s * s;
    float v = 9.81 * s;
    p = aOrigin.xyz - vec3(0.0, drop, 0.0);
    len = 0.006 + v * 0.018; width = 0.0024;
    vAlpha = (t - swell < fall) ? 0.9 : 0.0;
  }
  vec3 viewP = (viewMatrix * vec4(p, 1.0)).xyz;
  vec3 viewUp = (viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
  vec3 side = normalize(cross(viewUp, viewP));
  // Keep at least about a pixel wide so a drop never flickers away.
  float pixel = -viewP.z * 2.0 / (projectionMatrix[1][1] * 800.0);
  float w = max(width, pixel * 1.2);
  vAlpha *= width / w;
  vec3 q = viewP + side * position.x * w + viewUp * position.y * len;
  vCorner = position.xy;
  gl_Position = projectionMatrix * vec4(q, 1.0);
}`,
    fragmentShader: /* glsl */ `
uniform vec3 uRadiance;
varying vec2 vCorner;
varying float vAlpha;
void main() {
  float a = exp(-vCorner.x * vCorner.x * 2.5) * (1.0 - vCorner.y * 0.6) * vAlpha;
  if (a < 0.003) discard;
  // A bright refracted core and a darker rim, like a lens of water.
  vec3 c = uRadiance * (0.55 + 0.9 * exp(-vCorner.x * vCorner.x * 9.0));
  gl_FragColor = vec4(c * a, a * 0.5);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
    transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 6;
  return { mesh, touch(group: number, time: number) { touch[group] = time; }, dispose() { geometry.dispose(); material.dispose(); } };
}
