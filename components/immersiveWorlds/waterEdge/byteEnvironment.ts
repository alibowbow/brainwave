import * as THREE from 'three';
import { assertFramebufferComplete, createCheckedCubeTarget, pmremHalfFloatSupported, recordEnvironmentPath, withRenderTargetState } from './renderTargets';

/** Same sky geometry, same 256px cube-face resolution and 768×1024 CubeUV atlas
 * as r186's default PMREM. The fallback uses ordinary RGBA8 targets throughout.
 * Its independently authored GGX importance filter retains roughness-dependent
 * lighting; CubeUV mapping prevents an implicit float PMREM inside Three. */
export function createShoreEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  if (pmremHalfFloatSupported(renderer)) {
    const pmrem = new THREE.PMREMGenerator(renderer);
    try {
      const target = withRenderTargetState(renderer, () => pmrem.fromScene(scene, 0.05, 0.1, 80));
      try { assertFramebufferComplete(renderer, target, 'pebble-pmrem-output'); }
      catch (error) { target.dispose(); throw error; }
      recordEnvironmentPath(renderer, 'three-pmrem-half-float');
      return target;
    } finally { pmrem.dispose(); }
  }
  const target = createByteEnvironment(renderer, scene);
  recordEnvironmentPath(renderer, 'byte-ggx-cube-uv');
  return target;
}

export function roughnessForCubeUvMip(mip: number) {
  // Inverse of Three r186 ShaderChunk/cube_uv_reflection_fragment roughnessToMip.
  if (mip >= 4) return Math.pow(2, -mip / 2) / 1.16;
  if (mip >= 3) return .305 - (mip - 3) * .095;
  if (mip >= 2) return .4 - (mip - 2) * .095;
  if (mip >= -1) return .8 - (mip + 1) * .4 / 3;
  return 1 - (mip + 2) * .2;
}

export function cubeUvTile(mip: number, face: number) {
  const size = 2 ** Math.max(4, mip);
  return { size, x: (face % 3) * size + Math.max(4 - mip, 0) * 48,
    y: (face > 2 ? size : 0) + 4 * (256 - size) };
}

function createByteEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const cube = createCheckedCubeTarget(renderer, 'pebble-byte-sky-cube', 256, {
    generateMipmaps: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
  }, true);
  const output = new THREE.WebGLRenderTarget(768, 1024, {
    type: THREE.UnsignedByteType, format: THREE.RGBAFormat, colorSpace: THREE.LinearSRGBColorSpace,
    depthBuffer: false, generateMipmaps: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
  });
  output.texture.mapping = THREE.CubeUVReflectionMapping;
  output.texture.name = 'WaterEdge.byte-GGX-CubeUV';
  const material = new THREE.ShaderMaterial({
    depthTest: false, depthWrite: false, blending: THREE.NoBlending,
    uniforms: { uCube: { value: cube.texture }, uFace: { value: 0 }, uSize: { value: 256 }, uRoughness: { value: 0 } },
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
    fragmentShader: `
      uniform samplerCube uCube;uniform float uFace,uSize,uRoughness;varying vec2 vUv;
      vec3 direction(vec2 uv){
        vec2 p=2.*((uv*uSize-1.)/(uSize-2.))-1.;
        if(uFace<.5)return normalize(vec3(1.,p.y,p.x));
        if(uFace<1.5)return normalize(vec3(-p.x,1.,-p.y));
        if(uFace<2.5)return normalize(vec3(-p.x,p.y,1.));
        if(uFace<3.5)return normalize(vec3(-1.,p.y,-p.x));
        if(uFace<4.5)return normalize(vec3(-p.x,-1.,p.y));
        return normalize(vec3(p.x,p.y,-1.));
      }
      float radicalInverse(float n){
        float value=0.;float place=.5;
        for(int bit=0;bit<6;bit++){value+=mod(n,2.)*place;n=floor(n*.5);place*=.5;}
        return value;
      }
      void main(){
        vec3 n=direction(vUv);
        // Finest level preserves the captured sky at full resolution.
        if(uRoughness<.06){gl_FragColor=vec4(textureCube(uCube,n).rgb,1.);return;}
        vec3 up=abs(n.y)<.99?vec3(0.,1.,0.):vec3(1.,0.,0.);
        vec3 tangent=normalize(cross(up,n));vec3 bitangent=cross(n,tangent);
        float a=uRoughness*uRoughness;vec3 sum=vec3(0.);float weight=0.;
        for(int i=0;i<64;i++){
          float xi=(float(i)+.5)/64.;float phi=6.28318530718*radicalInverse(float(i));
          float c=sqrt((1.-xi)/(1.+(a*a-1.)*xi));float s=sqrt(max(0.,1.-c*c));
          vec3 h=normalize(tangent*(cos(phi)*s)+bitangent*(sin(phi)*s)+n*c);
          vec3 l=2.*dot(n,h)*h-n;float w=max(dot(n,l),0.);
          sum+=textureCube(uCube,l).rgb*w;weight+=w;
        }
        gl_FragColor=vec4(sum/max(weight,.0001),1.);
      }`,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  const quad = new THREE.Mesh(geometry, material);
  const camera = new THREE.OrthographicCamera();
  const oldToneMapping = renderer.toneMapping;
  const oldXr = renderer.xr.enabled;
  const oldAutoClear = renderer.autoClear;
  try {
    assertFramebufferComplete(renderer, output, 'pebble-byte-cube-uv');
    withRenderTargetState(renderer, () => {
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.xr.enabled = false;
      new THREE.CubeCamera(.1, 80, cube).update(renderer, scene);
      // Each tile has a one-pixel spherical border matching CubeUV's sampling
      // inset. All eleven roughness levels are filled, including diffuse m=-2.
      renderer.autoClear = false;
      for (let mip = 8; mip >= -2; mip--) {
        material.uniforms.uRoughness.value = roughnessForCubeUvMip(mip);
        for (let face = 0; face < 6; face++) {
          const tile = cubeUvTile(mip, face);
          material.uniforms.uFace.value = face;
          material.uniforms.uSize.value = tile.size;
          output.viewport.set(tile.x, tile.y, tile.size, tile.size);
          output.scissor.copy(output.viewport); output.scissorTest = true;
          renderer.setRenderTarget(output);
          renderer.render(quad, camera);
        }
      }
      output.viewport.set(0, 0, output.width, output.height);
      output.scissor.copy(output.viewport); output.scissorTest = false;
    });
    return output;
  } catch (error) { output.dispose(); throw error; }
  finally {
    renderer.toneMapping = oldToneMapping; renderer.xr.enabled = oldXr; renderer.autoClear = oldAutoClear;
    cube.dispose(); geometry.dispose(); material.dispose();
  }
}
