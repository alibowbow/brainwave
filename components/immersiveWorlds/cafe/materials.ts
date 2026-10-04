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

  const wood = surface(1024, 512, (u, v) => {
    const broad = noise(u * 4, v * 18);
    const waviness = noise(u * 7, v * 5) * 1.4 + noise(u * 2, v * 16) * 2.4;
    // Subdued elliptical knot changes the direction of the grain locally.
    // Its axes follow the timber, so it reads as wood rather than zebra bands.
    const dx = (u - 0.68) * 2.8;
    const dy = (v - 0.43) * 8;
    const knotRadius = Math.sqrt(dx * dx + dy * dy + 0.004);
    const knotInfluence = Math.exp(-(dx * dx * 8 + dy * dy * 2.4));
    const grainPosition = v * 112 + waviness + knotInfluence * (knotRadius * 9 - dy * 2.5);
    const wave = Math.sin(grainPosition * Math.PI * 2) * 0.5 + 0.5;
    const latewood = Math.pow(wave, 11) * (0.3 + noise(u * 12, v * 31) * 0.7);
    const fiber = noise(u * 23, v * 500) - 0.5;
    const pore = Math.max(0, noise(u * 100, v * 720) - 0.78) * 4.5;
    const mineral = noise(u * 3, v * 72) - 0.5;
    const tone = (broad - 0.5) * 23 + fiber * 12 + mineral * 14 - latewood * 16 - pore * 15;
    const knotCore = Math.exp(-knotRadius * knotRadius * 30) * 18;
    return [
      165 + tone - knotCore,
      123 + tone * 0.8 - knotCore,
      81 + tone * 0.59 - knotCore * 0.75,
      0.49 + fiber * 0.13 - latewood * 0.09 - pore * 0.14,
      0.47 + fiber * 0.09 + latewood * 0.08 + pore * 0.1,
    ];
  });

  const plasterMaps = surface(512, 512, (u, v) => {
    const cloud = noise(u * 7, v * 7) * 0.6 + noise(u * 28, v * 28) * 0.4 - 0.5;
    const grit = random() - 0.5;
    const tone = cloud * 11 + grit * 3;
    return [190 + tone, 181 + tone, 158 + tone, 0.5 + cloud * 0.12 + grit * 0.18, 0.9 + cloud * 0.09];
  });

  const linen = surface(512, 512, (u, v) => {
    const threadX = u * 150 + noise(u * 10, v * 8) * 0.2;
    const threadY = v * 150 + noise(u * 8, v * 10) * 0.2;
    const over = (Math.floor(threadX) + Math.floor(threadY)) % 2;
    const warp = Math.pow(Math.sin(threadX * Math.PI), 2);
    const weft = Math.pow(Math.sin(threadY * Math.PI), 2);
    const weave = (over ? warp * 0.7 + weft * 0.3 : weft * 0.7 + warp * 0.3);
    const fibers = random() - 0.5;
    const natural = noise(u * 14, v * 14) - 0.5;
    const tone = weave * 14 + natural * 9 + fibers * 6;
    return [146 + tone, 139 + tone, 112 + tone * 0.8, 0.2 + weave * 0.6 + fibers * 0.14, 0.95];
  });

  const glaze = surface(512, 256, (u, v) => {
    const clay = noise(u * 20, v * 10) - 0.5;
    const speckle = random();
    const speck = speckle > 0.988 ? (speckle - 0.988) * 3400 : 0;
    const tone = clay * 8 - speck;
    return [233 + tone, 225 + tone, 205 + tone * 0.9, 0.5 + clay * 0.025 - speck * 0.0008, 0.58 + clay * 0.13];
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

  const oak = new THREE.MeshStandardMaterial({ ...wood, roughness: 0.9, bumpScale: 0.009 });
  oak.name = 'Cafe oiled oak';
  const darkWood = new THREE.MeshStandardMaterial({ ...wood, color: 0x716153, roughness: 1, bumpScale: 0.007 });
  darkWood.name = 'Cafe dark stained oak';
  const plaster = new THREE.MeshStandardMaterial({ ...plasterMaps, roughness: 1, bumpScale: 0.014 });
  plaster.name = 'Cafe limewashed plaster';
  const fabric = new THREE.MeshStandardMaterial({ ...linen, roughness: 1, bumpScale: 0.005 });
  fabric.name = 'Cafe woven linen';
  const ceramic = new THREE.MeshPhysicalMaterial({
    ...glaze, roughness: 0.38, bumpScale: 0.0015,
    clearcoat: 0.9, clearcoatRoughness: 0.16,
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
