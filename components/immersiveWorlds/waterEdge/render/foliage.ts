import * as THREE from 'three';
import { seeded } from '../../shared/render/noise';

/*
 * Foliage for the water-edge worlds, all generated in code:
 *  - an alpha-cut atlas of leafy sprigs painted with Canvas 2D paths,
 *  - crown geometry made of many sprig cards with spherical "crown" normals,
 *    so a tree shades as one soft volume instead of a field of flat quads,
 *  - a material patch adding thin-leaf translucency toward the key light,
 *    crown self-occlusion and slow, unsynchronised wind.
 * Every mesh that uses `applyFoliage` must carry `aOcc` and `aWind` attributes.
 */

export interface LeafAtlasOptions {
  seed: number;
  /** Sprig variants laid out side by side (each a square cell). */
  variants?: number;
  cell?: number;
  /** Leaf length relative to the cell, [min, max]. */
  length?: [number, number];
  /** Leaf width relative to its length. */
  width?: number;
  leavesPerTwig?: number;
  twigs?: number;
  /** Base hue/saturation/lightness and jitter (HSL, 0..1). */
  hsl?: [number, number, number];
  jitter?: [number, number, number];
  twigColor?: string;
}

/** Canvas-painted sprigs of leaves with a transparent background. */
export function leafAtlas(options: LeafAtlasOptions) {
  const { seed, variants = 2, cell = 256, length = [.17, .27], width = .42, leavesPerTwig = 9, twigs = 4,
    hsl = [.27, .45, .32], jitter = [.035, .1, .08], twigColor = '#4a3b2a' } = options;
  const random = seeded(seed);
  const canvas = document.createElement('canvas');
  canvas.width = cell * variants; canvas.height = cell;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const leaf = (x: number, y: number, angle: number, size: number) => {
    const w = size * width;
    const h = hsl[0] + (random() - .5) * jitter[0], s = hsl[1] + (random() - .5) * jitter[1], l = hsl[2] + (random() - .5) * jitter[2];
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.bezierCurveTo(w * .95, -size * .18, w * .75, -size * .78, 0, -size);
    ctx.bezierCurveTo(-w * .75, -size * .78, -w * .95, -size * .18, 0, 0);
    const gradient = ctx.createLinearGradient(-w, 0, w, 0);
    gradient.addColorStop(0, `hsl(${h * 360},${s * 100}%,${l * 88}%)`);
    gradient.addColorStop(.5, `hsl(${h * 360},${s * 100}%,${l * 106}%)`);
    gradient.addColorStop(1, `hsl(${h * 360},${s * 100}%,${l * 80}%)`);
    ctx.fillStyle = gradient; ctx.fill();
    ctx.strokeStyle = `hsla(${h * 360},${s * 80}%,${l * 125}%,.55)`; ctx.lineWidth = Math.max(.8, size * .02);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -size * .93); ctx.stroke();
    ctx.lineWidth = Math.max(.5, size * .01); ctx.strokeStyle = `hsla(${h * 360},${s * 80}%,${l * 118}%,.3)`;
    for (let v = 1; v < 5; v++) {
      const t = v / 5.5;
      ctx.beginPath(); ctx.moveTo(0, -size * t); ctx.lineTo(w * .55, -size * (t + .12)); ctx.moveTo(0, -size * t); ctx.lineTo(-w * .55, -size * (t + .12)); ctx.stroke();
    }
    ctx.restore();
  };
  for (let v = 0; v < variants; v++) {
    const ox = v * cell;
    ctx.save(); ctx.beginPath(); ctx.rect(ox + 1, 1, cell - 2, cell - 2); ctx.clip();
    for (let t = 0; t < twigs; t++) {
      const baseX = ox + cell * (.42 + random() * .16), baseY = cell * .97;
      const angle = -Math.PI / 2 + (t - (twigs - 1) / 2) * .42 + (random() - .5) * .3;
      const reach = cell * (.62 + random() * .26);
      const endX = baseX + Math.cos(angle) * reach, endY = baseY + Math.sin(angle) * reach;
      const ctrlX = (baseX + endX) / 2 + (random() - .5) * cell * .12, ctrlY = (baseY + endY) / 2;
      ctx.strokeStyle = twigColor; ctx.lineWidth = cell * .012;
      ctx.beginPath(); ctx.moveTo(baseX, baseY); ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY); ctx.stroke();
      for (let k = 0; k < leavesPerTwig; k++) {
        const u = .22 + .78 * (k + random() * .5) / leavesPerTwig;
        const x = (1 - u) * (1 - u) * baseX + 2 * (1 - u) * u * ctrlX + u * u * endX;
        const y = (1 - u) * (1 - u) * baseY + 2 * (1 - u) * u * ctrlY + u * u * endY;
        const side = k % 2 ? 1 : -1;
        const size = cell * (length[0] + random() * (length[1] - length[0])) * (1.08 - u * .3);
        leaf(x, y, angle + Math.PI / 2 + side * (.55 + random() * .45), size);
      }
      leaf(endX, endY, angle + Math.PI / 2 + (random() - .5) * .4, cell * length[1] * .85);
    }
    ctx.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export interface Crown {
  centre: THREE.Vector3;
  radii: THREE.Vector3;
  cards: number;
  /** Card edge length range in metres. */
  size: [number, number];
  tint: THREE.Color;
}

/** Merged sprig cards filling ellipsoidal crowns. */
export function crownGeometry(crowns: Crown[], seed: number, variants = 2) {
  const random = seeded(seed);
  const total = crowns.reduce((sum, crown) => sum + crown.cards, 0);
  const position = new Float32Array(total * 12), normal = new Float32Array(total * 12), uv = new Float32Array(total * 8);
  const color = new Float32Array(total * 12), occ = new Float32Array(total * 4), wind = new Float32Array(total * 4);
  const index = new Uint32Array(total * 6);
  const dir = new THREE.Vector3(), cardNormal = new THREE.Vector3(), up = new THREE.Vector3(), side = new THREE.Vector3();
  const centrePoint = new THREE.Vector3(), corner = new THREE.Vector3(), sph = new THREE.Vector3(), tint = new THREE.Color();
  let c = 0;
  for (const crown of crowns) {
    for (let k = 0; k < crown.cards; k++, c++) {
      // Uniform direction, radius biased to the shell where light and view land.
      dir.set(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1);
      if (dir.lengthSq() < 1e-4) dir.set(0, 1, 0);
      dir.normalize();
      const r = Math.pow(random(), .45);
      centrePoint.set(dir.x * r * crown.radii.x, dir.y * r * crown.radii.y, dir.z * r * crown.radii.z).add(crown.centre);
      cardNormal.set(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1).normalize().addScaledVector(dir, .7).normalize();
      // Sprigs grow outward and up: the texture's base points back toward the crown.
      up.copy(dir).addScaledVector(new THREE.Vector3(0, 1, 0), .6);
      up.addScaledVector(cardNormal, -up.dot(cardNormal));
      if (up.lengthSq() < 1e-4) up.set(1, 0, 0).addScaledVector(cardNormal, -cardNormal.x);
      up.normalize();
      side.crossVectors(up, cardNormal).normalize();
      const s = crown.size[0] + random() * (crown.size[1] - crown.size[0]);
      const height = (centrePoint.y - (crown.centre.y - crown.radii.y)) / (2 * crown.radii.y);
      const outer = THREE.MathUtils.smoothstep(r, .2, 1);
      const occlusion = (.3 + .7 * outer) * (.62 + .38 * THREE.MathUtils.clamp(height, 0, 1));
      tint.copy(crown.tint).offsetHSL((random() - .5) * .03, (random() - .5) * .08, (random() - .5) * .05);
      const variant = Math.floor(random() * variants);
      const corners: Array<[number, number]> = [[-.5, 0], [.5, 0], [.5, 1], [-.5, 1]];
      corners.forEach(([a, b], v) => {
        corner.copy(centrePoint).addScaledVector(side, a * s).addScaledVector(up, (b - .35) * s);
        const o = c * 4 + v;
        position.set([corner.x, corner.y, corner.z], o * 3);
        sph.copy(corner).sub(crown.centre).divide(crown.radii).normalize();
        sph.y += .25; sph.normalize();
        normal.set([sph.x, sph.y, sph.z], o * 3);
        uv.set([(variant + a + .5) / variants, b], o * 2);
        color.set([tint.r, tint.g, tint.b], o * 3);
        occ[o] = occlusion; wind[o] = .3 + .7 * outer * b;
      });
      index.set([c * 4, c * 4 + 1, c * 4 + 2, c * 4, c * 4 + 2, c * 4 + 3], c * 6);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
  geometry.setAttribute('aOcc', new THREE.BufferAttribute(occ, 1));
  geometry.setAttribute('aWind', new THREE.BufferAttribute(wind, 1));
  geometry.setIndex(new THREE.BufferAttribute(index, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

export interface FoliageOptions {
  key: string;
  time: { value: number };
  /** Unit vector toward the key light, world space. */
  lightDirection: THREE.Vector3;
  /** Key light radiance carried through thin leaves (HDR). */
  lightColor: THREE.Color;
  translucency: number;
  /** Peak sway in metres for aWind = 1. */
  wind: number;
  /** Keep crown normals on back faces instead of flipping them (cards). */
  crownNormals?: boolean;
  /** Scales the leaf cuticle's specular response (1 = plain dielectric). */
  specular?: number;
}

/** Adds translucency, occlusion and wind to a MeshStandardMaterial. */
export function applyFoliage(material: THREE.MeshStandardMaterial, options: FoliageOptions) {
  material.onBeforeCompile = shader => {
    shader.uniforms.uFolTime = options.time;
    shader.uniforms.uFolLightDir = { value: options.lightDirection };
    shader.uniforms.uFolLightColor = { value: options.lightColor };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute float aOcc;
attribute float aWind;
uniform float uFolTime;
varying float vFolOcc;
varying vec3 vFolWorld;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  vec4 anchor = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  anchor = instanceMatrix * anchor;
  #endif
  anchor = modelMatrix * anchor;
  float phase = anchor.x * .37 + anchor.z * .29;
  float gust = .6 + .4 * sin(uFolTime * .11 + anchor.x * .05);
  vec2 sway = vec2(sin(uFolTime * .83 + phase) + .45 * sin(uFolTime * 1.71 + phase * 2.3), cos(uFolTime * .67 + phase * 1.3) * .6);
  transformed.xz += sway * ${options.wind.toFixed(4)} * aWind * gust;
  transformed.y += sin(uFolTime * 1.3 + phase * 3.1) * ${(options.wind * .35).toFixed(4)} * aWind;
}`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
vFolOcc = aOcc;
{
  vec4 folWorld = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  folWorld = instanceMatrix * folWorld;
  #endif
  vFolWorld = (modelMatrix * folWorld).xyz;
}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform vec3 uFolLightDir;
uniform vec3 uFolLightColor;
varying float vFolOcc;
varying vec3 vFolWorld;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
diffuseColor.rgb *= vFolOcc;`)
      .replace('#include <normal_fragment_begin>', options.crownNormals ? `#include <normal_fragment_begin>
normal = normalize(vNormal);
nonPerturbedNormal = normal;` : '#include <normal_fragment_begin>')
      .replace('#include <lights_physical_fragment>', `#include <lights_physical_fragment>
material.specularColor *= ${(options.specular ?? 1).toFixed(3)};
material.specularF90 *= ${(options.specular ?? 1).toFixed(3)};`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  vec3 toPoint = normalize(vFolWorld - cameraPosition);
  float back = pow(max(dot(toPoint, uFolLightDir), 0.0), 3.0);
  // Light carried through thin leaf tissue is filtered by the leaf itself.
  vec3 tissue = diffuseColor.rgb * (diffuseColor.rgb * 2.2 + 0.12);
  totalEmissiveRadiance += uFolLightColor * tissue * (back * 0.85 + 0.15) * ${options.translucency.toFixed(4)} * vFolOcc * vFolOcc;
}`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|we-foliage-v1|${options.key}`;
  return material;
}
