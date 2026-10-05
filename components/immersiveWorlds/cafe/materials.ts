import * as THREE from 'three';

/** Original, deterministic cafe surfaces. All maps are generated locally. */
export interface CafeMaterials {
  oak: THREE.MeshStandardMaterial;
  darkWood: THREE.MeshStandardMaterial;
  plaster: THREE.MeshStandardMaterial;
  fabric: THREE.MeshStandardMaterial;
  ceramic: THREE.MeshPhysicalMaterial;
  brass: THREE.MeshStandardMaterial;
  coffee: THREE.MeshPhysicalMaterial;
  leather: THREE.MeshStandardMaterial;
  pavement: THREE.MeshPhysicalMaterial;
  foliage: THREE.MeshStandardMaterial;
  textures: THREE.Texture[];
  dispose(): void;
}

type Pixel = readonly [number, number, number, number, number];

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

// A repeating value field: unlike white-noise overlays, this gives continuous
// mineral clouds and fibres at several physical scales without image assets.
function makeNoise(seed: number) {
  const random = seeded(seed);
  const size = 128;
  const values = Float32Array.from({ length: size * size }, random);
  return (x: number, y: number) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const tx = x - ix;
    const ty = y - iy;
    const sx = tx * tx * (3 - 2 * tx);
    const sy = ty * ty * (3 - 2 * ty);
    const a = values[(iy & 127) * size + (ix & 127)];
    const b = values[(iy & 127) * size + ((ix + 1) & 127)];
    const c = values[((iy + 1) & 127) * size + (ix & 127)];
    const d = values[((iy + 1) & 127) * size + ((ix + 1) & 127)];
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };
}

function clampByte(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function makeCafeMaterials(): CafeMaterials {
  const textures: THREE.Texture[] = [];
  const noise = makeNoise(36092);
  const random = seeded(110640);

  const surface = (width: number, height: number, sample: (u: number, v: number) => Pixel) => {
    const canvases = Array.from({ length: 3 }, () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    });
    const contexts = canvases.map(canvas => {
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Cafe surface canvas unavailable');
      return context;
    });
    const data = contexts.map(context => context.createImageData(width, height));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const [r, g, b, elevation, roughness] = sample(x / width, y / height);
        const offset = (y * width + x) * 4;
        data[0].data[offset] = clampByte(r);
        data[0].data[offset + 1] = clampByte(g);
        data[0].data[offset + 2] = clampByte(b);
        data[0].data[offset + 3] = 255;
        for (let index = 1; index < 3; index++) {
          const gray = clampByte((index === 1 ? elevation : roughness) * 255);
          data[index].data[offset] = gray;
          data[index].data[offset + 1] = gray;
          data[index].data[offset + 2] = gray;
          data[index].data[offset + 3] = 255;
        }
      }
    }
    const maps = canvases.map((canvas, index) => {
      contexts[index].putImageData(data[index], 0, 0);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = index === 0 ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = 8;
      texture.name = `cafe-local-surface-${textures.length}`;
      textures.push(texture);
      return texture;
    });
    return { map: maps[0], bumpMap: maps[1], roughnessMap: maps[2] };
  };

  const wood = surface(1024, 1024, (u, v) => {
    // Longitudinal fibres dominate. Unequal growth widths and locally bending
    // grain avoid the equally spaced high-contrast rings of imitation wood.
    const longitudinal = noise(u * 1.7 + 17, v * 23 + 39) - 0.5;
    const curl = (noise(u * 2.8, v * 7) - 0.5) * 0.019
      + (noise(u * 9, v * 3 + 71) - 0.5) * 0.0025;
    const dx = (u - 0.72) * 3.1;
    const dy = (v - 0.38) * 9.5;
    const knotRadius = Math.sqrt(dx * dx + dy * dy + 0.008);
    const knotInfluence = Math.exp(-(dx * dx * 8 + dy * dy * 3));
    const across = v + curl + knotInfluence * (knotRadius * 0.023 - dy * 0.018);
    const growth = across * 46 + noise(u * 0.9 + 31, across * 13) * 5;
    const latewood = Math.pow(Math.sin(growth * Math.PI * 2) * 0.5 + 0.5, 13)
      * (0.22 + noise(u * 9 + 53, across * 51) * 0.78);
    const fiber = noise(u * 7.5, across * 390) - 0.5;
    const hairline = noise(u * 31 + 11, across * 478 + 27) - 0.5;
    // Open elongated pores and pale ray flecks break up the satin grain at
    // grazing angles without painting broad dark stripes onto the surface.
    const pore = Math.pow(Math.max(0, (noise(u * 67 + 41, across * 360) - 0.70) / 0.30), 1.6);
    const paleRay = Math.pow(Math.max(0, (noise(u * 13 + 87, across * 102 + 13) - 0.73) / 0.27), 1.4);
    const mineral = noise(u * 2.2 + 67, across * 69 + 23) - 0.5;
    const tone = longitudinal * 25 + mineral * 12 + fiber * 13 + hairline * 4
      - latewood * 10 - pore * 28 + paleRay * 16;
    const knotCore = Math.exp(-knotRadius * knotRadius * 35) * 8;
    return [
      147 + tone - knotCore,
      134 + tone * 0.94 - knotCore * 0.9,
      116 + tone * 0.84 - knotCore * 0.75,
      0.51 + fiber * 0.10 + hairline * 0.025 - latewood * 0.045 - pore * 0.20 + paleRay * 0.025,
      0.69 + longitudinal * 0.08 + fiber * 0.075 + pore * 0.12 - paleRay * 0.03,
    ];
  });

  const plasterMaps = surface(512, 512, (u, v) => {
    const cloud = noise(u * 7, v * 7) * 0.6 + noise(u * 28, v * 28) * 0.4 - 0.5;
    const grit = random() - 0.5;
    const tone = cloud * 11 + grit * 3;
    return [190 + tone, 181 + tone, 158 + tone, 0.5 + cloud * 0.12 + grit * 0.18, 0.9 + cloud * 0.09];
  });

  const linen = surface(512, 512, (u, v) => {
    const threadX = u * 104 + noise(u * 10, v * 8) * 0.24;
    const threadY = v * 104 + noise(u * 8, v * 10) * 0.24;
    const over = (Math.floor(threadX) + Math.floor(threadY)) % 2;
    const warp = Math.pow(Math.sin(threadX * Math.PI), 2);
    const weft = Math.pow(Math.sin(threadY * Math.PI), 2);
    const weave = (over ? warp * 0.7 + weft * 0.3 : weft * 0.7 + warp * 0.3);
    const fibers = random() - 0.5;
    const natural = noise(u * 14, v * 14) - 0.5;
    const slub = noise(u * 3 + 21, v * 93) * 0.5 + noise(u * 93, v * 3 + 43) * 0.5 - 0.5;
    const tone = (weave - 0.5) * 25 + natural * 8 + slub * 13 + fibers * 5;
    return [152 + tone, 154 + tone, 142 + tone * 0.92, 0.19 + weave * 0.62 + fibers * 0.07 + slub * 0.06, 0.95];
  });

  const glaze = surface(512, 256, (u, v) => {
    const clay = noise(u * 20, v * 10) - 0.5;
    const speck = Math.pow(Math.max(0, (noise(u * 146 + 3, v * 81 + 16) - 0.79) / 0.21), 0.85) * 24;
    const pinhole = random() > 0.997 ? 15 : 0;
    const tone = clay * 3 - speck - pinhole;
    return [233 + tone, 230 + tone, 219 + tone * 0.92, 0.5 + clay * 0.026 - speck * 0.0007, 0.67 + clay * 0.14 + speck * 0.0014];
  });

  const hide = surface(256, 256, (u, v) => {
    const grain = noise(u * 90, v * 90);
    const mottling = noise(u * 12, v * 12) - 0.5;
    const tone = (grain - 0.5) * 12 + mottling * 9;
    return [99 + tone, 66 + tone * 0.75, 44 + tone * 0.55, 0.2 + grain * 0.55, 0.67 + grain * 0.23];
  });

  const road = surface(512, 512, (u, v) => {
    const grit = random();
    const puddle = noise(u * 5, v * 7);
    const aggregate = noise(u * 170, v * 170);
    const wet = Math.min(1, Math.max(0, (puddle - 0.26) * 2.1));
    const tone = aggregate * 13 + grit * 5 - wet * 7;
    return [43 + tone, 48 + tone, 49 + tone, 0.43 + aggregate * (1 - wet) * 0.23 + grit * 0.04, 0.14 + (1 - wet) * 0.55];
  });

  const oak = new THREE.MeshStandardMaterial({ ...wood, roughness: 1, bumpScale: 0.0045, envMapIntensity: 0.62 });
  oak.name = 'Cafe natural satin oak';
  const darkWood = new THREE.MeshStandardMaterial({ ...wood, color: 0x817b72, roughness: 1, bumpScale: 0.004, envMapIntensity: 0.55 });
  darkWood.name = 'Cafe dark stained oak';
  const plaster = new THREE.MeshStandardMaterial({ ...plasterMaps, roughness: 1, bumpScale: 0.014 });
  plaster.name = 'Cafe limewashed plaster';
  const fabric = new THREE.MeshStandardMaterial({ ...linen, roughness: 1, bumpScale: 0.004, envMapIntensity: 0.45 });
  fabric.name = 'Cafe woven linen';
  const ceramic = new THREE.MeshPhysicalMaterial({
    ...glaze, roughness: 0.53, bumpScale: 0.001,
    clearcoat: 0.32, clearcoatRoughness: 0.26,
  });
  ceramic.name = 'Cafe speckled stoneware';
  const brass = new THREE.MeshStandardMaterial({ color: 0xb29251, metalness: 0.82, roughness: 0.29 });
  brass.name = 'Cafe brushed brass';
  const coffee = new THREE.MeshPhysicalMaterial({
    color: 0x291509, roughness: 0.15, metalness: 0.03,
    clearcoat: 1, clearcoatRoughness: 0.06,
  });
  coffee.name = 'Cafe fresh coffee';
  const leather = new THREE.MeshStandardMaterial({ ...hide, roughness: 0.82, bumpScale: 0.006 });
  leather.name = 'Cafe cognac leather';
  const pavement = new THREE.MeshPhysicalMaterial({
    ...road, roughness: 0.85, bumpScale: 0.012,
    clearcoat: 0.8, clearcoatRoughness: 0.1,
  });
  pavement.name = 'Cafe rain-wet pavement';
  const foliage = new THREE.MeshStandardMaterial({ color: 0x3f6643, roughness: 0.73, side: THREE.DoubleSide });
  foliage.name = 'Cafe deep green foliage';

  const materials = new Set<THREE.Material>([oak, darkWood, plaster, fabric, ceramic, brass, coffee, leather, pavement, foliage]);
  let disposed = false;
  return {
    oak, darkWood, plaster, fabric, ceramic, brass, coffee, leather, pavement, foliage, textures,
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const material of materials) material.dispose();
      for (const texture of new Set(textures)) texture.dispose();
    },
  };
}
