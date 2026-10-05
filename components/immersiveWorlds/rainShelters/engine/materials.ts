import * as THREE from 'three';

export function rng(seed: number) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

/** Original deterministic, tileable microstructure; no external texture assets. */
export function material(kind: 'wood' | 'stone' | 'fabric' | 'earth' | 'leaf', color: THREE.ColorRepresentation, roughness = .78) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!; const random = rng(kind.charCodeAt(0) * 67);
  const pixels = ctx.createImageData(512, 512);
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    let v = 220;
    if (kind === 'wood') {
      const bend = 4 * Math.sin(y * .018) + 1.7 * Math.sin(y * .062);
      v += Math.sin((x + bend) * .28) * 13 + Math.sin((x + bend) * 1.19) * 5 + (random() - .5) * 22;
    } else if (kind === 'fabric') {
      v += (x % 4 < 2 ? 9 : -12) + (y % 4 < 2 ? 8 : -10) + (random() - .5) * 13;
    } else if (kind === 'leaf') {
      v += Math.cos(x * .044) * 9 + (random() - .5) * 10;
    } else {
      v += (random() - .5) * 38 + Math.sin(x * .063 + Math.sin(y * .027) * 3) * 7 + Math.cos(y * .071) * 5;
    }
    const offset = (y * 512 + x) * 4;
    pixels.data[offset] = pixels.data[offset + 1] = pixels.data[offset + 2] = v;
    pixels.data[offset + 3] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
  if (kind === 'wood') {
    for (let i = 0; i < 34; i++) {
      const x = random() * 512; ctx.beginPath(); ctx.moveTo(x, 0);
      for (let y = 0; y <= 512; y += 8) ctx.lineTo(x + 3 * Math.sin(y * .025 + i), y);
      ctx.strokeStyle = `rgba(48,30,17,${.035 + random() * .10})`; ctx.lineWidth = .5 + random(); ctx.stroke();
    }
  }
  const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 4;
  const bump = map.clone(); bump.colorSpace = THREE.NoColorSpace;
  return new THREE.MeshStandardMaterial({ color, map, bumpMap: bump, bumpScale: kind === 'stone' ? .028 : kind === 'fabric' ? .012 : .017, roughness, metalness: 0 });
}

export interface RainOptions { count?: number; width?: number; height?: number; depth?: number; z?: number; speed?: number; color?: THREE.ColorRepresentation; opacity?: number; }
/** Spatial rain, outside the shelter. Exactly one draw call, no camera overlay. */
export function addRain(scene: THREE.Scene, options: RainOptions = {}) {
  const { count = 900, width = 18, height = 13, depth = 22, z = -12, speed = 7.5, color = '#c8dadd', opacity = .25 } = options;
  const random = rng(711); const positions = new Float32Array(count * 6); const factors = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const x = (random() - .5) * width; const y = random() * height; const zz = z + (random() - .5) * depth;
    for (let j = 0; j < 2; j++) { const k = i * 6 + j * 3; positions[k] = x; positions[k + 1] = y; positions[k + 2] = zz; factors[i * 2 + j] = j; }
  }
  const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); geometry.setAttribute('aEnd', new THREE.BufferAttribute(factors, 1));
  const mat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity } },
    vertexShader: `attribute float aEnd; uniform float uTime; varying float vDepth; void main(){vec3 p=position;p.y=mod(p.y-uTime*${speed.toFixed(3)}+10000.,${height.toFixed(3)})-.2;p.y+=aEnd*.18;p.x+=aEnd*.045;vec4 mv=modelViewMatrix*vec4(p,1.);vDepth=-mv.z;gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `uniform vec3 uColor; uniform float uOpacity; varying float vDepth; void main(){gl_FragColor=vec4(uColor,uOpacity*clamp(1.-vDepth/70.,.1,1.)); #include <tonemapping_fragment>\n #include <colorspace_fragment>\n}`.replace('; #include', ';\n#include')
  });
  const mesh = new THREE.LineSegments(geometry, mat); mesh.frustumCulled = false; mesh.name = 'outside-rain'; scene.add(mesh);
  return { update(time: number) { mat.uniforms.uTime.value = time; }, mesh };
}
