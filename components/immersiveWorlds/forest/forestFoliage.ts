import * as THREE from 'three';
import { seeded } from '../shared/render/noise';

/*
 * Leaf atlases and small instanced plant geometries for the morning forest,
 * all generated in code. Atlases are painted with Canvas 2D paths and then
 * uploaded as DataTextures whose transparent texels carry the leaf colour, so
 * mipmapped alpha-cut edges never darken into black fringes.
 */

type Random = () => number;
const TAU = Math.PI * 2;

/** Paints `variants` square cells, then returns a mipmapped RGBA texture with bled edge colour. */
function paintAtlas(cell: number, variants: number, paint: (ctx: CanvasRenderingContext2D, ox: number, variant: number) => void, name: string) {
  const canvas = document.createElement('canvas');
  canvas.width = cell * variants; canvas.height = cell;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let v = 0; v < variants; v++) {
    ctx.save(); ctx.beginPath(); ctx.rect(v * cell + 2, 2, cell - 4, cell - 4); ctx.clip();
    paint(ctx, v * cell, v);
    ctx.restore();
  }
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = new Uint8Array(image.data.buffer.slice(0));
  // Bleed: every transparent texel takes the mean opaque colour of its cell.
  for (let v = 0; v < variants; v++) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = 0; y < cell; y++) for (let x = v * cell; x < (v + 1) * cell; x++) {
      const o = (y * canvas.width + x) * 4;
      if (data[o + 3] > 200) { r += data[o]; g += data[o + 1]; b += data[o + 2]; n++; }
    }
    if (!n) continue;
    r /= n; g /= n; b /= n;
    for (let y = 0; y < cell; y++) for (let x = v * cell; x < (v + 1) * cell; x++) {
      const o = (y * canvas.width + x) * 4, a = data[o + 3] / 255;
      // Un-premultiply soft edges toward the mean so filtering keeps their hue.
      data[o] = Math.round(data[o] * a + r * (1 - a));
      data[o + 1] = Math.round(data[o + 1] * a + g * (1 - a));
      data[o + 2] = Math.round(data[o + 2] * a + b * (1 - a));
    }
  }
  canvas.width = canvas.height = 1;
  const texture = new THREE.DataTexture(data, cell * variants, cell, THREE.RGBAFormat, THREE.UnsignedByteType);
  texture.name = name;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter; texture.magFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** An ovate, finely serrated broadleaf with midrib and lateral veins, base at the origin pointing +y. */
function broadleaf(ctx: CanvasRenderingContext2D, random: Random, length: number, hsl: [number, number, number]) {
  const width = length * (0.46 + random() * 0.1);
  const outline: Array<[number, number]> = [];
  const teeth = 18;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i <= teeth; i++) {
      const t = side > 0 ? i / teeth : 1 - i / teeth;
      // Widest a third of the way up, drawn out to an acuminate tip.
      const half = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.8)), 0.85) * width * 0.5 * (1 - 0.25 * t * t);
      const tooth = i % 2 && t > 0.12 && t < 0.94 ? 1.0 + 0.045 : 1.0;
      outline.push([side * half * tooth, t * length]);
    }
  }
  const [h, s, l] = hsl;
  ctx.beginPath();
  outline.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  const gradient = ctx.createLinearGradient(-width * 0.5, 0, width * 0.5, length);
  gradient.addColorStop(0, `hsl(${h},${s}%,${l * 0.82}%)`);
  gradient.addColorStop(0.55, `hsl(${h + 2},${s + 4}%,${l}%)`);
  gradient.addColorStop(1, `hsl(${h + 6},${s}%,${l * 1.12}%)`);
  ctx.fillStyle = gradient; ctx.fill();
  // Soft blotches: leaves are never one flat colour.
  ctx.save(); ctx.clip();
  for (let i = 0; i < 5; i++) {
    const x = (random() - 0.5) * width * 0.7, y = random() * length, r = length * (0.12 + random() * 0.2);
    const blot = ctx.createRadialGradient(x, y, 0, x, y, r);
    blot.addColorStop(0, random() > 0.5 ? `hsla(${h - 8},${s + 8}%,${l * 1.18}%,.35)` : `hsla(${h + 10},${s}%,${l * 0.75}%,.3)`);
    blot.addColorStop(1, `hsla(${h},${s}%,${l}%,0)`);
    ctx.fillStyle = blot; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.strokeStyle = `hsla(${h + 6},${s - 10}%,${Math.min(85, l * 1.55)}%,.7)`;
  ctx.lineWidth = Math.max(0.8, length * 0.024);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(width * 0.04, length * 0.5, 0, length * 0.97); ctx.stroke();
  ctx.lineWidth = Math.max(0.5, length * 0.011);
  ctx.strokeStyle = `hsla(${h + 6},${s - 10}%,${Math.min(85, l * 1.4)}%,.45)`;
  for (let v = 1; v <= 7; v++) {
    const t = v / 8.2;
    const half = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.8)), 0.85) * width * 0.44;
    for (const side of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(0, t * length);
      ctx.quadraticCurveTo(side * half * 0.5, t * length + length * 0.06, side * half * 0.92, t * length + length * 0.16);
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** Canopy sprigs: a twig with alternate leaves, base at the top edge (texture v = 0). */
export function createCanopyAtlas() {
  return paintAtlas(256, 4, (ctx, ox, variant) => {
    const random = seeded(4103 + variant * 97);
    const young = variant === 3;
    const baseX = ox + 128 + (random() - 0.5) * 20;
    const twigs = variant === 2 ? 3 : 2;
    for (let twig = 0; twig < twigs; twig++) {
      const spread = (twig - (twigs - 1) / 2) * 0.55 + (random() - 0.5) * 0.25;
      const reach = 190 + random() * 50;
      const endX = baseX + Math.sin(spread) * reach, endY = 6 + Math.cos(spread) * reach;
      const ctrlX = (baseX + endX) / 2 + (random() - 0.5) * 30, ctrlY = (6 + endY) / 2;
      ctx.strokeStyle = '#4b3e2b'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(baseX, 4); ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY); ctx.stroke();
      const count = 6 + Math.floor(random() * 3);
      for (let k = 0; k < count; k++) {
        const u = 0.2 + 0.8 * (k + random() * 0.4) / count;
        const x = (1 - u) * (1 - u) * baseX + 2 * (1 - u) * u * ctrlX + u * u * endX;
        const y = (1 - u) * (1 - u) * 4 + 2 * (1 - u) * u * ctrlY + u * u * endY;
        const side = k % 2 ? 1 : -1;
        const angle = -spread + side * (0.6 + random() * 0.5);
        const hsl: [number, number, number] = young
          ? [78 + random() * 14, 52 + random() * 12, 40 + random() * 9]
          : [92 + random() * 18, 40 + random() * 16, 25 + random() * 10];
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
        broadleaf(ctx, random, (44 + random() * 26) * (1.08 - u * 0.25), hsl);
        ctx.restore();
      }
      ctx.save(); ctx.translate(endX, endY); ctx.rotate(-spread + (random() - 0.5) * 0.3);
      broadleaf(ctx, random, 48 + random() * 14, young ? [82, 55, 44] : [100, 46, 30]);
      ctx.restore();
    }
  }, 'Forest canopy sprig atlas');
}

/**
 * A clump of sprig cards radiating from a branch tip (unit size). Normals point
 * out of the clump, so the clump shades as a soft volume rather than flat cards.
 */
export function leafClusterGeometry(cards = 5) {
  const random = seeded(7717 + cards);
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [], indices: number[] = [];
  const corner = new THREE.Vector3(), normal = new THREE.Vector3();
  for (let i = 0; i < cards; i++) {
    const azimuth = i / cards * TAU + (random() - 0.5) * 0.6;
    const elevation = i === cards - 1 ? 1.1 : -0.15 + random() * 0.8;
    const out = new THREE.Vector3(Math.cos(azimuth) * Math.cos(elevation), Math.sin(elevation), Math.sin(azimuth) * Math.cos(elevation));
    const side = new THREE.Vector3().crossVectors(out, new THREE.Vector3(0, 1, 0));
    if (side.lengthSq() < 1e-3) side.set(1, 0, 0);
    side.normalize().applyAxisAngle(out, (random() - 0.5) * 1.1);
    const variant = i % 4;
    const width = 0.75 + random() * 0.25;
    const start = positions.length / 3;
    for (const [a, b] of [[-0.5, 0], [0.5, 0], [0.5, 1], [-0.5, 1]] as const) {
      corner.copy(out).multiplyScalar(b * 0.95 - 0.12).addScaledVector(side, a * width);
      corner.y += b * b * -0.1;
      positions.push(corner.x, corner.y, corner.z);
      normal.copy(corner).add(new THREE.Vector3(0, 0.45, 0)).normalize();
      normals.push(normal.x, normal.y, normal.z);
      uvs.push((variant + a + 0.5) / 4 * 0.996 + 0.002, b);
    }
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

/**
 * One fern frond along +x, arching up and drooping at the tip: a tapered
 * rachis ribbon carrying folded, lanceolate pinnae. uv.y runs base to tip.
 */
export function frondGeometry(pinnae: number) {
  const positions: number[] = [], colors: number[] = [], uvs: number[] = [], indices: number[] = [];
  const spine = (t: number) => new THREE.Vector3(t, Math.sin(t * Math.PI * 0.78) * 0.34 - t * t * 0.12, 0);
  const push = (p: THREE.Vector3, t: number, shade: number) => {
    positions.push(p.x, p.y, p.z); uvs.push(0.5, t);
    const c = new THREE.Color().setHSL(0.24 - t * 0.03, 0.55, 0.18 + 0.12 * t * shade);
    colors.push(c.r, c.g, c.b);
    return positions.length / 3 - 1;
  };
  // Rachis: a narrow ribbon, wide enough to read, never a line primitive.
  const segments = pinnae;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments, p = spine(t), w = 0.009 * (1 - t * 0.85);
    push(p.clone().setZ(-w), t, 0.6); push(p.clone().setZ(w), t, 0.6);
    if (i < segments) { const a = i * 2; indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  }
  for (let i = 0; i < pinnae; i++) {
    const t = 0.1 + 0.86 * (i + 0.5) / pinnae;
    const base = spine(t), ahead = spine(Math.min(1, t + 0.02)).sub(base).normalize();
    const length = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), 0.7) * 0.2 + 0.015;
    for (const side of [-1, 1]) {
      // Pinnae sweep forward and droop a little; a central fold catches light.
      const out = new THREE.Vector3(ahead.x * 0.55, -0.12, side).normalize();
      const tip = base.clone().addScaledVector(out, length);
      const across = new THREE.Vector3().crossVectors(out, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(length * 0.17);
      const mid = base.clone().addScaledVector(out, length * 0.42);
      const fold = new THREE.Vector3(0, length * 0.05, 0);
      const a = push(base, t, 1), b = push(mid.clone().add(across).sub(fold), t, 1);
      const c = push(tip, t + 0.02, 1.3), d = push(mid.clone().sub(across).sub(fold), t, 1);
      const m = push(mid.clone().add(fold), t, 1.2);
      indices.push(a, b, m, m, b, c, a, m, d, m, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  // Fronds are lit mostly from above: lift normals so folds do not go black.
  const n = geometry.attributes.normal as THREE.BufferAttribute;
  for (let i = 0; i < n.count; i++) {
    const v = new THREE.Vector3(n.getX(i), Math.abs(n.getY(i)) + 0.6, n.getZ(i)).normalize();
    n.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeBoundingSphere();
  return geometry;
}

/** A tuft of curved, tapering grass and sedge blades rooted at the origin (unit height). */
export function grassClumpGeometry(blades = 7, seed = 3) {
  const random = seeded(seed);
  const positions: number[] = [], colors: number[] = [], uvs: number[] = [], indices: number[] = [];
  for (let b = 0; b < blades; b++) {
    const angle = random() * TAU, lean = 0.12 + random() * 0.35, height = 0.55 + random() * 0.45, width = 0.012 + random() * 0.01;
    const ox = (random() - 0.5) * 0.08, oz = (random() - 0.5) * 0.08;
    const hue = 0.2 + random() * 0.06;
    const start = positions.length / 3;
    for (let j = 0; j <= 3; j++) {
      const t = j / 3, bend = t * t * lean, w = width * (1 - t * 0.9);
      const cx = ox + Math.cos(angle) * bend, cz = oz + Math.sin(angle) * bend, y = height * t * (1 - lean * t * 0.35);
      for (const k of [-1, 1]) {
        positions.push(cx - Math.sin(angle) * w * k, y, cz + Math.cos(angle) * w * k);
        const c = new THREE.Color().setHSL(hue, 0.42, 0.14 + 0.2 * t);
        colors.push(c.r, c.g, c.b); uvs.push(0.5, t);
      }
      if (j < 3) { const q = start + j * 2; indices.push(q, q + 2, q + 3, q, q + 3, q + 1); }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const n = geometry.attributes.normal as THREE.BufferAttribute;
  for (let i = 0; i < n.count; i++) {
    const v = new THREE.Vector3(n.getX(i) * 0.5, 1, n.getZ(i) * 0.5).normalize();
    n.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeBoundingSphere();
  return geometry;
}

/** A fallen leaf: ovate outline, raised midrib and a slight curl, lying on +y (unit length along z). */
export function litterLeafGeometry(curl = 0.12) {
  const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
  const rows = 5, columns = 4;
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    const half = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.85)), 0.9) * 0.24 + 0.004;
    for (let c = 0; c <= columns; c++) {
      const s = c / columns * 2 - 1;
      positions.push(s * half, curl * s * s + 0.02 * Math.sin(t * Math.PI) - 0.012 * Math.abs(s), t - 0.5);
      uvs.push(c / columns, t);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    const a = r * (columns + 1) + c, b = a + columns + 1;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}
