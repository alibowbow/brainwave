import * as THREE from 'three';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { noise3 } from '../../shared/render/noise';

/*
 * Moss cushions for stream boulders. A shell is lifted off the stone's own
 * surface along its normals wherever moss would grow (upward faces, above the
 * splash line, in noisy patches); its thickness tapers to nothing at the
 * patch edge, so the moss has a real cushion profile and silhouette. The
 * shader cuts the edge into a ragged border, clumps the surface and adds the
 * velvet sheen and leaf translucency of a moss carpet.
 */

/**
 * @param geometry unit-box stone geometry with normals
 * @param matrix   the stone's world transform (for the splash line)
 * @param waterY   water surface height; moss stays clear of the wet band
 */
export function mossShellGeometry(geometry: THREE.BufferGeometry, matrix: THREE.Matrix4, seed: number, waterY: number, thickness = .045) {
  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const normal = geometry.getAttribute('normal') as THREE.BufferAttribute;
  const index = geometry.index!;
  const count = position.count;
  const moss = new Float32Array(count);
  const p = new THREE.Vector3(), n = new THREE.Vector3(), world = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);
  for (let i = 0; i < count; i++) {
    p.fromBufferAttribute(position, i); n.fromBufferAttribute(normal, i).applyMatrix3(normalMatrix).normalize();
    world.copy(p).applyMatrix4(matrix);
    const patch = noise3(p.x * 1.6 + seed, p.y * 1.6, p.z * 1.6) * .5 + noise3(p.x * 4.1, p.y * 4.1 + seed, p.z * 4.1) * .2;
    moss[i] = (n.y * .8 + patch * 1.3 - .02) * THREE.MathUtils.smoothstep(world.y, waterY + .12, waterY + .32);
  }
  const positions: number[] = [], normals: number[] = [], weights: number[] = [];
  const remap = new Map<number, number>();
  const indices: number[] = [];
  const keep = (v: number) => {
    let k = remap.get(v);
    if (k !== undefined) return k;
    k = positions.length / 3;
    remap.set(v, k);
    p.fromBufferAttribute(position, v); n.fromBufferAttribute(normal, v);
    const lift = thickness * THREE.MathUtils.smoothstep(moss[v], .42, .75);
    positions.push(p.x + n.x * lift, p.y + n.y * lift, p.z + n.z * lift);
    normals.push(n.x, n.y, n.z);
    weights.push(moss[v]);
    return k;
  };
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i), b = index.getX(i + 1), c = index.getX(i + 2);
    if (Math.max(moss[a], moss[b], moss[c]) < .42) continue;
    indices.push(keep(a), keep(b), keep(c));
  }
  const shell = new THREE.BufferGeometry();
  shell.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  shell.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  shell.setAttribute('aMoss', new THREE.Float32BufferAttribute(weights, 1));
  shell.setIndex(indices);
  shell.computeVertexNormals();
  return shell;
}

export function mossMaterial(options: { key: string; lightDirection: THREE.Vector3; lightColor: THREE.Color }) {
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .92, metalness: 0 });
  material.onBeforeCompile = shader => {
    shader.uniforms.uMossLightDir = { value: options.lightDirection };
    shader.uniforms.uMossLightColor = { value: options.lightColor };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aMoss;\nvarying float vMoss;\nvarying vec3 vMossWorld;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvMoss = aMoss;\nvMossWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
uniform vec3 uMossLightDir;
uniform vec3 uMossLightColor;
varying float vMoss;
varying vec3 vMossWorld;
${GLSL_NOISE}
float mossClumps(vec3 p) { return bwNoise(p * 38.0) * 0.6 + bwNoise(p * 95.0) * 0.4; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
vec3 mp = vMossWorld;
float mossFine = 1.0 - smoothstep(0.002, 0.008, length(fwidth(mp)));
// Ragged border: the patch edge breaks into islands and single tufts.
float border = vMoss + bwNoise(mp * 22.0) * 0.12 + bwNoise(mp * 60.0) * 0.06 * mossFine;
if (border < 0.5) discard;
float clump = mossClumps(mp);
float age = smoothstep(-0.35, 0.35, bwFbm3(mp * 5.0 + 4.0));
vec3 young = vec3(0.11, 0.19, 0.025), old = vec3(0.035, 0.065, 0.014), dry = vec3(0.13, 0.12, 0.05);
vec3 mossColor = mix(young, old, age);
mossColor = mix(mossColor, dry, smoothstep(0.55, 0.85, bwNoise(mp * 6.0 + 2.0)) * 0.5);
mossColor *= 0.6 + 0.7 * (clump * 0.5 + 0.5) * mossFine + (1.0 - mossFine) * 0.35;
// Darker hollows between cushions.
mossColor *= 0.65 + 0.35 * smoothstep(-0.5, 0.3, bwNoise(mp * 11.0));
// Thin edges of the cushion are sparser, showing a little stone.
mossColor *= mix(0.7, 1.0, smoothstep(0.5, 0.62, border));
diffuseColor.rgb = mossColor;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
{
  float grain = mossClumps(mp) * mossFine;
  vec3 sx = dFdx(-vViewPosition), sy = dFdy(-vViewPosition);
  vec3 gx = cross(sy, normal), gy = cross(normal, sx);
  float det = dot(sx, gx);
  vec3 gradient = sign(det) * (dFdx(grain) * gx + dFdy(grain) * gy);
  normal = normalize(max(abs(det), 1e-10) * normal - gradient * 0.007);
}`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  // Velvet: tips catch the light at grazing view; thin leaves glow when backlit.
  vec3 viewDir = normalize(cameraPosition - vMossWorld);
  float rim = pow(1.0 - max(dot(normal, normalize((viewMatrix * vec4(viewDir, 0.0)).xyz)), 0.0), 3.0);
  float back = pow(max(dot(-viewDir, uMossLightDir), 0.0), 3.0);
  totalEmissiveRadiance += diffuseColor.rgb * (rim * 0.35 + back * 0.6) * uMossLightColor * 0.08;
}`);
  };
  material.customProgramCacheKey = () => `water-edge-moss-v1|${options.key}`;
  return material;
}
