import * as THREE from 'three';

/** Original near-field hydrangea surfaces; no cards, alpha cutouts or external art. */
export function gardenLeafGeometry(variant: number) {
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  const rows = 20, columns = 6;
  const bend = 0.13 + variant * 0.036, twist = (variant - 1.5) * 0.025;
  for (let row = 0; row <= rows; row++) {
    const t = row / rows, envelope = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.8);
    const width = envelope * (0.48 - t * 0.10) * (1 + 0.035 * Math.sin(t * Math.PI * 15));
    for (let col = 0; col <= columns; col++) {
      const q = col / columns * 2 - 1;
      const asymmetry = 1 + q * (0.05 + variant * 0.012) * Math.sin(t * Math.PI);
      positions.push(
        q * width * asymmetry + twist * t * t,
        t - 0.025 * q * q * envelope,
        0.075 * envelope - bend * t * t + q * q * envelope * (0.075 + variant * 0.008)
          + twist * q * t + 0.012 * Math.sin(t * 4 * Math.PI + variant) * q * q,
      );
      uv.push(col / columns, t);
    }
  }
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const a = row * (columns + 1) + col, b = a + columns + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

export function gardenSepalGeometry(variant: number) {
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  const rows = 8, columns = 6;
  for (let row = 0; row <= rows; row++) {
    const t = row / rows, envelope = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.55);
    const width = envelope * (0.41 + t * 0.16);
    for (let col = 0; col <= columns; col++) {
      const q = col / columns * 2 - 1;
      positions.push(
        q * width * (1 + 0.06 * q * Math.sin(t * Math.PI + variant)) + (variant - 1.5) * 0.02 * t * t,
        t + 0.02 * q * Math.sin(t * Math.PI * 2 + variant),
        (0.06 + variant * 0.018) * q * q * envelope + 0.052 * envelope
          - (0.045 + variant * 0.02) * t * t + 0.021 * q * Math.sin(t * Math.PI + variant),
      );
      uv.push(col / columns, t);
    }
  }
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const a = row * (columns + 1) + col, b = a + columns + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}

/** Thin surface scattering responds to the real garden key light, with no transmission target. */
export function gardenFoliageMaterial(kind: 'leaf' | 'sepal') {
  const leaf = kind === 'leaf';
  const material = new THREE.MeshStandardMaterial({
    color: '#ffffff', roughness: leaf ? 0.57 : 0.76, side: THREE.DoubleSide,
  });
  material.defines = { USE_UV: '' };
  material.customProgramCacheKey = () => `rain-garden-${kind}-organic-v1`;
  material.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', leaf
      ? `#include <color_fragment>
        float gardenMidrib = 1.0-smoothstep(0.006,0.021,abs(vUv.x-0.5));
        float gardenVeins = pow(max(0.0,cos((vUv.y-abs(vUv.x-0.5)*0.57)*73.0)),18.0);
        float gardenEdge = smoothstep(0.31,0.50,abs(vUv.x-0.5));
        diffuseColor.rgb *= 0.88+0.12*sin(vUv.y*3.14159)-gardenEdge*0.08;
        diffuseColor.rgb += vec3(0.065,0.075,0.021)*(gardenMidrib*0.60+gardenVeins*0.16);
        diffuseColor.rgb *= 0.78+0.22*smoothstep(0.0,0.23,vUv.y);`
      : `#include <color_fragment>
        float gardenVeins = pow(max(0.0,cos((vUv.x-0.5)*(14.0+vUv.y*22.0))),16.0);
        diffuseColor.rgb *= 0.79+0.17*vUv.y+gardenVeins*0.035;
        diffuseColor.rgb = mix(diffuseColor.rgb,diffuseColor.rgb*vec3(0.64,0.71,0.75),pow(1.0-vUv.y,3.0)*0.62);`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = clamp(roughnessFactor + 0.035*sin(vUv.y*23.0+vUv.x*11.0) + 0.018*cos(vUv.x*47.0-vUv.y*19.0),0.35,0.90);`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
      #if NUM_DIR_LIGHTS > 0
        float gardenBacklight = pow(max(0.0,dot(-normal,directionalLights[0].direction)),1.7);
        float gardenThinEdge = smoothstep(0.20,0.49,abs(vUv.x-0.5));
        reflectedLight.directDiffuse += diffuseColor.rgb * directionalLights[0].color * gardenBacklight * (${leaf ? '0.035+gardenThinEdge*0.055' : '0.055+gardenThinEdge*0.060'});
      #endif`);
  };
  return material;
}
