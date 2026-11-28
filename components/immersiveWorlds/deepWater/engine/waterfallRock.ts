import type * as THREE from 'three';

/*
 * Spray-soaked stone around the falls, layered onto the shared rock surface
 * (it reuses that shader's world-position varying and noise). The cliff behind
 * and beside each curtain and everything in reach of the plunge spray turns
 * dark and glossy, mirrors the sky at grazing angles, and carries thin trickles
 * whose wet films slide downward. Material keys stay distinct per option set.
 */

export interface WetZones {
  /** Main fall: centre x, lip height, half width of the soaked channel. */
  fall: { x: number; top: number; halfWidth: number };
  /** Where the spray is thickest. */
  foot: THREE.Vector3;
  /** Side seep: x, lip height, z beyond which the bank is dry. */
  seep: { x: number; top: number; z: number };
}

const f = (n: number) => n.toFixed(4);

export function wetByFalls(material: THREE.MeshStandardMaterial, time: { value: number }, zones: WetZones, key: string) {
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    // Only meaningful on top of the shared rock surface.
    if (!shader.fragmentShader.includes('vRockWorld') || !shader.fragmentShader.includes('bwNoise')) return;
    shader.uniforms.uWetTime = time;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uWetTime;')
      .replace('#include <lights_physical_fragment>', `{
  vec3 wp = vRockWorld;
  float fallDrop = clamp((${f(zones.fall.top)} - wp.y) / ${f(zones.fall.top)}, 0.0, 1.0);
  float band = abs(wp.x - ${f(zones.fall.x)}) - ${f(zones.fall.halfWidth)} * (1.0 + 0.45 * fallDrop);
  float channel = (1.0 - smoothstep(0.0, 2.4, band + bwNoise(wp * vec3(0.7, 0.12, 0.7)) * 1.1))
    * step(wp.y, ${f(zones.fall.top + .5)}) * (1.0 - smoothstep(${f(zones.foot.z + 1.5)}, ${f(zones.foot.z + 3.5)}, wp.z));
  vec3 q = (wp - vec3(${f(zones.foot.x)}, ${f(zones.foot.y + .4)}, ${f(zones.foot.z - .6)})) * vec3(0.12, 0.16, 0.2);
  float soak = exp(-dot(q, q) * 1.5) * 1.25;
  float seep = (1.0 - smoothstep(0.25, 1.2, abs(wp.x - ${f(zones.seep.x)}) + bwNoise(wp * 0.9) * 0.3))
    * step(wp.y, ${f(zones.seep.top + .3)}) * (1.0 - smoothstep(${f(zones.seep.z)}, ${f(zones.seep.z + 2.5)}, wp.z));
  float wet = clamp(max(max(channel, soak), seep * 0.9), 0.0, 1.0);
  // Trickles: meandering thin films, some of them sliding down as bright beads.
  float lane = wp.x * 2.6 + bwNoise(vec3(wp.x * 1.7, wp.y * 0.22, 3.0)) * 0.9;
  float id = floor(lane);
  float width = fwidth(lane) * 0.8 + 0.03;
  float line = (1.0 - smoothstep(0.0, width, abs(fract(lane) - 0.5))) * step(0.72, bwHash1(vec3(id, 7.0, 11.0)))
    * smoothstep(-0.2, 0.4, bwNoise(vec3(id * 3.1, wp.y * 0.35, 9.0)));
  float bead = fract(wp.y * 0.3 + uWetTime * (0.45 + 0.5 * bwHash1(vec3(id, 3.0, 5.0))) + bwHash1(vec3(id, 1.0, 2.0)) * 9.0);
  float slide = smoothstep(0.82, 0.97, bead) * (1.0 - smoothstep(0.97, 1.0, bead)) * line;
  diffuseColor.rgb *= mix(1.0, 0.46, wet);
  // Glossy, but not mirror-smooth: a sheen rather than a scatter of sun sparkles.
  roughnessFactor = mix(roughnessFactor, 0.24, wet * 0.9);
  roughnessFactor = mix(roughnessFactor, 0.14, line * wet);
  // A water film mirrors the bright sky and the white fall at grazing angles.
  vec3 wn = normalize((vec4(normal, 0.0) * viewMatrix).xyz);
  vec3 wv = normalize(cameraPosition - wp);
  float film = 0.03 + 0.97 * pow(1.0 - clamp(dot(wn, wv), 0.0, 1.0), 5.0);
  vec3 wr = reflect(-wv, wn);
  vec3 skyGlow = mix(vec3(0.95, 1.02, 1.0), vec3(0.4, 0.62, 0.9), clamp(wr.y, 0.0, 1.0));
  totalEmissiveRadiance += skyGlow * (film * 0.7 + line * 0.03) * wet;
  totalEmissiveRadiance += vec3(0.9, 0.95, 1.0) * slide * wet * 0.12;
}
#include <lights_physical_fragment>`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|wf-wet-v1|${key}`;
  return material;
}
