import * as THREE from 'three';
import { canvasTexture, KP_NOISE } from './kit';

/*
 * Original dancheong-style painting, generated in code. The motifs follow the
 * general vocabulary of Korean architectural colouring (lotus rosettes, graded
 * colour bands, verdigris-green fields with fine white/vermilion edge lines);
 * no historical pattern sheet or photograph is copied.
 */

export const PALETTE = {
  noerok: '#2f6656', // verdigris green ground
  yangrok: '#4f9670',
  samcheong: '#2b5f8c',
  jangdan: '#c4502f', // vermilion
  juhong: '#a8382a',
  hwang: '#dcae4c',
  baek: '#ece3cc',
  meok: '#1c1d1b',
  bunhong: '#d98c86',
  seokganju: '#7b3426', // red-brown timber colour
  yeondam: '#9fc3a8',
};

const HEAD = 5; // head motif length in beam heights
const MID = 2;  // repeating middle tile length in beam heights
const H = 256;

function rosette(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rings: Array<{ count: number; radius: number; width: number; colors: string[]; offset?: number }>, centre: string[]) {
  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const a = (i + (ring.offset ?? 0)) / ring.count * Math.PI * 2;
      ctx.save(); ctx.translate(x + Math.cos(a) * ring.radius * r, y + Math.sin(a) * ring.radius * r); ctx.rotate(a);
      const len = ring.width * r, wid = Math.PI * ring.radius * r / ring.count * 0.95;
      // Graded petal: dark outline, then lighter fills toward the centre line.
      ring.colors.forEach((color, k) => {
        const s = 1 - k / ring.colors.length * 0.8;
        ctx.beginPath(); ctx.ellipse(0, 0, len * s, wid * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      });
      ctx.restore();
    }
  }
  centre.forEach((color, k) => {
    ctx.beginPath(); ctx.arc(x, y, r * 0.24 * (1 - k / centre.length * 0.75), 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  });
}

function bands(ctx: CanvasRenderingContext2D, cx: number, cy: number, from: number, colors: string[], width: number, clip: [number, number]) {
  ctx.save(); ctx.beginPath(); ctx.rect(clip[0], 0, clip[1] - clip[0], H); ctx.clip();
  let r = from;
  for (const color of colors) {
    ctx.beginPath(); ctx.arc(cx, cy, r + width / 2, 0, Math.PI * 2); ctx.lineWidth = width; ctx.strokeStyle = color; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r + width, 0, Math.PI * 2); ctx.lineWidth = 2.2; ctx.strokeStyle = PALETTE.meok; ctx.stroke();
    r += width;
  }
  ctx.restore();
}

/** Beam painting: head motif (0..HEAD heights) then a seamless middle tile. */
export function beamTexture(variant: 'green' | 'blue' = 'green') {
  const head = HEAD * H, mid = MID * H;
  const ground = variant === 'green' ? PALETTE.noerok : PALETTE.samcheong;
  return canvasTexture(head + mid, H, ctx => {
    ctx.fillStyle = ground; ctx.fillRect(0, 0, head + mid, H);
    // End band at the beam end.
    ctx.fillStyle = PALETTE.meok; ctx.fillRect(0, 0, 14, H);
    ctx.fillStyle = PALETTE.baek; ctx.fillRect(14, 0, 6, H);
    ctx.fillStyle = PALETTE.jangdan; ctx.fillRect(20, 0, 26, H);
    ctx.fillStyle = PALETTE.meok; ctx.fillRect(46, 0, 3, H);
    // Main lotus rosette with graded colour arcs wrapping it.
    const cx = 250, cy = H / 2;
    bands(ctx, cx, cy, 122, [PALETTE.samcheong, PALETTE.baek, PALETTE.jangdan, PALETTE.hwang, PALETTE.yangrok], 15, [49, head - 330]);
    ctx.beginPath(); ctx.arc(cx, cy, 121, 0, Math.PI * 2); ctx.fillStyle = PALETTE.meok; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 116, 0, Math.PI * 2); ctx.fillStyle = PALETTE.noerok; ctx.fill();
    rosette(ctx, cx, cy, 118, [
      { count: 10, radius: 0.66, width: 0.33, colors: [PALETTE.meok, PALETTE.juhong, PALETTE.jangdan, PALETTE.bunhong, PALETTE.baek] },
      { count: 8, radius: 0.4, width: 0.2, colors: [PALETTE.meok, '#1f4a7a', PALETTE.samcheong, '#7fb0d2', PALETTE.baek], offset: 0.5 },
    ], [PALETTE.meok, PALETTE.hwang, '#f0d58a', PALETTE.jangdan]);
    // Secondary half rosettes on the edges, then stepped bands into the field.
    for (const y of [0, H]) {
      rosette(ctx, 640, y, 92, [
        { count: 9, radius: 0.62, width: 0.34, colors: [PALETTE.meok, '#245c45', PALETTE.yangrok, PALETTE.yeondam, PALETTE.baek] },
      ], [PALETTE.meok, PALETTE.jangdan, PALETTE.hwang]);
    }
    ctx.beginPath(); ctx.arc(640, H / 2, 40, 0, Math.PI * 2); ctx.fillStyle = PALETTE.meok; ctx.fill();
    rosette(ctx, 640, H / 2, 38, [{ count: 6, radius: .55, width: .38, colors: [PALETTE.juhong, PALETTE.jangdan, PALETTE.bunhong, PALETTE.baek] }], [PALETTE.hwang]);
    const stripes = [PALETTE.meok, PALETTE.baek, PALETTE.samcheong, PALETTE.meok, PALETTE.baek, PALETTE.jangdan, PALETTE.meok, PALETTE.hwang, PALETTE.meok, PALETTE.baek, PALETTE.yangrok, PALETTE.meok];
    let x = 820;
    for (let i = 0; i < stripes.length; i++) {
      const w = stripes[i] === PALETTE.meok ? 4 : 16;
      ctx.fillStyle = stripes[i];
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.quadraticCurveTo(x + 46, H / 2, x, H); ctx.lineTo(x + w, H); ctx.quadraticCurveTo(x + w + 46, H / 2, x + w, 0); ctx.closePath(); ctx.fill();
      x += w;
    }
    // Middle tile: plain ground with edge lines. Seamless horizontally.
    for (const [y, color, h] of [[0, PALETTE.meok, 7], [7, PALETTE.baek, 6], [13, PALETTE.jangdan, 8], [21, PALETTE.meok, 3], [H - 7, PALETTE.meok, 7], [H - 13, PALETTE.baek, 6], [H - 21, PALETTE.jangdan, 8], [H - 24, PALETTE.meok, 3]] as Array<[number, string, number]>) {
      ctx.fillStyle = color; ctx.fillRect(x + 10, y, head + mid - x - 10, h);
    }
    // Quiet geometric ground pattern in the field, subtly darker.
    ctx.strokeStyle = 'rgba(10,30,24,0.22)'; ctx.lineWidth = 3;
    for (let k = head; k < head + mid; k += 64) {
      ctx.beginPath(); ctx.moveTo(k, 60); ctx.lineTo(k + 32, H / 2); ctx.lineTo(k, H - 60); ctx.lineTo(k - 32, H / 2); ctx.closePath(); ctx.stroke();
    }
    ageing(ctx, head + mid, H, 71);
  });
}

function ageing(ctx: CanvasRenderingContext2D, width: number, height: number, seed: number) {
  let s = seed;
  const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  // Faded, flaked pigment: soft pale patches, fine cracks and grime.
  for (let i = 0; i < width * height / 900; i++) {
    const x = r() * width, y = r() * height, rad = 2 + r() * 9;
    ctx.fillStyle = r() < .5 ? `rgba(225,215,190,${.04 + r() * .07})` : `rgba(30,25,18,${.05 + r() * .08})`;
    ctx.beginPath(); ctx.ellipse(x, y, rad * (1 + r() * 2), rad, r() * 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.strokeStyle = 'rgba(20,16,12,0.16)'; ctx.lineWidth = 0.8;
  for (let i = 0; i < width / 9; i++) {
    const x = r() * width, y = r() * height;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (r() - .5) * 30, y + (r() - .5) * 6); ctx.stroke();
  }
}

/** Material for beams whose uv.x is distance from the nearest end in beam heights. */
export function beamMaterial(map: THREE.Texture, key: string, params: THREE.MeshStandardMaterialParameters = {}) {
  map.wrapS = THREE.ClampToEdgeWrapping; map.wrapT = THREE.ClampToEdgeWrapping;
  const material = new THREE.MeshStandardMaterial({ map, roughness: .78, ...params });
  material.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${KP_NOISE}`)
      .replace('#include <map_fragment>', `
{
  float d = vMapUv.x;
  float total = ${HEAD + MID}.0;
  vec2 g = vec2(1.0 / total, 1.0);
  vec2 tuv = d < ${HEAD}.0 ? vec2(d / total, vMapUv.y) : vec2((${HEAD}.0 + mod(d - ${HEAD}.0, ${MID}.0)) / total, vMapUv.y);
  // Continuous gradients avoid mip seams where the tile wraps.
  vec4 paint = textureGrad(map, tuv, dFdx(vMapUv) * g, dFdy(vMapUv) * g);
  diffuseColor *= paint;
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|kp-beam-v1|${key}`;
  return material;
}

/** Box beam along X with uv.x = distance from the nearer end in heights, uv.y across the face. */
export function beamGeometry(length: number, height: number, depth: number) {
  const geometry = new THREE.BoxGeometry(length, height, depth, 2, 1, 1);
  const p = geometry.attributes.position, n = geometry.attributes.normal, uv = geometry.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const d = (length / 2 - Math.abs(x)) / height;
    const across = Math.abs(n.getY(i)) > .5 ? (z / depth + .5) : (y / height + .5);
    uv.setXY(i, Math.abs(n.getX(i)) > .5 ? (y / height + .5) * .3 : d, across);
  }
  return geometry;
}

/** Bracket arm painting in shape space: field, inset edge lines and a bud motif. */
export function bracketTexture(path: THREE.Vector2[], bounds: THREE.Box2, tipFrom: number) {
  const size = bounds.getSize(new THREE.Vector2());
  const W = 512, Hh = Math.round(512 * size.y / size.x);
  const map = (v: THREE.Vector2) => [(v.x - bounds.min.x) / size.x * W, Hh - (v.y - bounds.min.y) / size.y * Hh];
  const texture = canvasTexture(W, Hh, ctx => {
    ctx.fillStyle = PALETTE.noerok; ctx.fillRect(0, 0, W, Hh);
    const outline = (inset: number, color: string) => {
      ctx.save(); ctx.beginPath();
      path.forEach((v, i) => { const [x, y] = map(v); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.closePath(); ctx.clip();
      ctx.lineWidth = inset * 2; ctx.strokeStyle = color; ctx.stroke(); ctx.restore();
    };
    // Tip in vermilion.
    const tipX = (tipFrom - bounds.min.x) / size.x * W;
    const g = ctx.createLinearGradient(tipX, 0, W, 0);
    g.addColorStop(0, PALETTE.noerok); g.addColorStop(.15, PALETTE.jangdan); g.addColorStop(1, PALETTE.juhong);
    ctx.fillStyle = g; ctx.fillRect(tipX, 0, W - tipX, Hh);
    outline(22, PALETTE.meok); outline(16, PALETTE.baek); outline(11, PALETTE.meok); outline(8, PALETTE.yangrok);
    // Lotus bud motif on the arm.
    const bx = W * .42, by = Hh * .55, br = Hh * .26;
    ctx.beginPath(); ctx.ellipse(bx, by, br * 1.5, br, 0, 0, Math.PI * 2); ctx.fillStyle = PALETTE.meok; ctx.fill();
    for (const [color, s] of [[PALETTE.juhong, .92], [PALETTE.jangdan, .75], [PALETTE.bunhong, .55], [PALETTE.baek, .3]] as Array<[string, number]>) {
      ctx.beginPath(); ctx.ellipse(bx + br * (1 - s) * .5, by, br * 1.45 * s, br * .92 * s, 0, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
    }
    ctx.strokeStyle = PALETTE.baek; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx - br * 2.6, by); ctx.bezierCurveTo(bx - br * 2, by - br, bx - br * 1.6, by - br * .2, bx - br * 1.5, by); ctx.stroke();
    ageing(ctx, W, Hh, 91);
  });
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1 / size.x, 1 / size.y); texture.offset.set(-bounds.min.x / size.x, -bounds.min.y / size.y);
  return texture;
}

/** Painted rafter end: concentric rings and an eight-petal flower. */
export function rafterEndTexture(square = false) {
  const S = 128;
  return canvasTexture(S, S, ctx => {
    const c = S / 2;
    ctx.fillStyle = PALETTE.noerok; ctx.fillRect(0, 0, S, S);
    const ring = (r: number, color: string) => { ctx.beginPath(); if (square) ctx.rect(c - r, c - r, r * 2, r * 2); else ctx.arc(c, c, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); };
    ring(62, PALETTE.meok); ring(58, PALETTE.baek); ring(52, PALETTE.noerok); ring(44, PALETTE.meok);
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      ctx.save(); ctx.translate(c + Math.cos(a) * 22, c + Math.sin(a) * 22); ctx.rotate(a);
      for (const [color, s] of [[PALETTE.juhong, 1], [PALETTE.jangdan, .78], [PALETTE.bunhong, .55], [PALETTE.baek, .32]] as Array<[string, number]>) {
        ctx.beginPath(); ctx.ellipse(0, 0, 17 * s, 9 * s, 0, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
      }
      ctx.restore();
    }
    ring(10, PALETTE.hwang); ring(5, PALETTE.jangdan);
    ageing(ctx, S, S, 17);
  });
}
