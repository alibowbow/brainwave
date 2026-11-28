import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { preparePoolTarget } from './poolTarget';

/** Deterministic erosion of a triangulated solid, not a scaled smooth sphere. */
export function rockGeometry(seed: number, radius = 1): THREE.BufferGeometry {
  const base = new THREE.IcosahedronGeometry(radius, 5);
  base.deleteAttribute('normal'); base.deleteAttribute('uv');
  const geometry = mergeVertices(base); base.dispose();
  const positions = geometry.attributes.position;
  const p = new THREE.Vector3();
  for (let i = 0; i < positions.count; i++) {
    p.fromBufferAttribute(positions, i);
    const n = .085 * Math.sin(p.x * 5.3 + seed) * Math.cos(p.y * 4.7 - seed)
      + .055 * Math.sin(p.z * 9.1 + p.x * 3 + seed * 3) + .035 * Math.cos(p.y * 17 + p.z * 7);
    p.multiplyScalar(1 + n);
    p.y += .05 * Math.sin(p.x * 7 + seed);
    positions.setXYZ(i, p.x, p.y, p.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

const noiseGLSL = `
float rhash(vec3 p) { p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float rn(vec3 p) { vec3 i=floor(p), f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(rhash(i),rhash(i+vec3(1,0,0)),f.x),mix(rhash(i+vec3(0,1,0)),rhash(i+vec3(1,1,0)),f.x),f.y),mix(mix(rhash(i+vec3(0,0,1)),rhash(i+vec3(1,0,1)),f.x),mix(rhash(i+vec3(0,1,1)),rhash(i+vec3(1,1,1)),f.x),f.y),f.z); }
float rfbm(vec3 p) { return rn(p)*.56+rn(p*2.03)*.27+rn(p*4.11)*.12+rn(p*8.3)*.05; }
`;

export function rockMaterial(color: string, wetness = .5): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({ color, roughness: .9 - wetness * .46, metalness: .025, side: THREE.DoubleSide });
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 vRockPosition;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvRockPosition=(modelMatrix*vec4(position,1.)).xyz;');
    shader.fragmentShader = 'varying vec3 vRockPosition;\n' + noiseGLSL + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      float grain=rfbm(vRockPosition*3.8);
      float bwRockMineral=rfbm(vRockPosition*.53+vec3(7.));
      float vein=1.-smoothstep(.025,.10,abs(sin(vRockPosition.y*7.+rfbm(vRockPosition*1.5)*8.)));
      diffuseColor.rgb *= (.61+grain*.69+bwRockMineral*.15)*(1.-vein*.22);
      diffuseColor.rgb += vec3(.055,.053,.043)*smoothstep(.61,.79,bwRockMineral);
    `);
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      float crag=rfbm(vRockPosition*12.)*.6+rn(vRockPosition*67.)*.06;
      normal=normalize(normal+vec3(-dFdx(crag)*.45,-dFdy(crag)*.45,0.));
    `);
  };
  material.customProgramCacheKey = () => 'deepwater-rock-v1';
  return material;
}

export function addRock(scene: THREE.Object3D, position: [number, number, number], scale: [number, number, number], seed: number, material?: THREE.Material): THREE.Mesh {
  const mesh = new THREE.Mesh(rockGeometry(seed), material ?? rockMaterial('#64736d'));
  mesh.position.set(...position); mesh.scale.set(...scale);
  mesh.rotation.set(.05 * Math.sin(seed), seed * .71, .07 * Math.cos(seed));
  mesh.castShadow = true; mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

/** Optional physically styled water for HDR worlds: dark body, Schlick
 * reflection, fine moving micro-normals and a lit scattering pool where a
 * light shaft enters the water. Omitted, the original pool shading remains. */
export interface ClearWaterOptions {
  deepColor: string;
  /** Where a shaft of light meets the water (world x, z), radius in metres. */
  glow?: { x: number; z: number; radius: number; color: THREE.Color };
  /** Direction toward the key light, for glints. */
  lightDirection: THREE.Vector3;
  glint: number;
}

const clearWaterFragment = `uniform vec3 color;uniform vec3 deepColor;uniform sampler2D tDiffuse;uniform float time;uniform float rippleClock;uniform vec4 rings[4];uniform float rippleStrength;
  uniform vec3 glowColor;uniform vec3 glowCentre;uniform vec3 lightDirection;uniform float glint;varying vec4 reflectionCoord;varying vec3 poolWorld;
  vec2 waveSlope(vec2 p,float t){
    vec2 s=vec2(cos(p.x*2.1+p.y*.72+t*.42)*.020+cos(p.x*5.3-p.y*3.1-t*.3)*.007,sin(p.y*2.8+p.x*.56-t*.27)*.018);
    s+=vec2(cos(p.x*11.3+p.y*7.1+t*.9),sin(p.y*12.7-p.x*5.9-t*.8))*.0045;
    s+=vec2(sin(p.x*23.1-p.y*17.3+t*1.3),cos(p.y*27.9+p.x*13.1+t*1.1))*.0022;
    return s;
  }
  void main(){
    vec2 p=poolWorld.xz;
    vec2 slope=waveSlope(p,time);
    float ringLight=0.;
    for(int i=0;i<4;i++){float age=rippleClock-rings[i].z;vec2 delta=p-rings[i].xy;float d=length(delta);float front=d-age*1.3;float env=exp(-front*front*2.8)*exp(-age*.72)*rings[i].w*step(0.,age);slope+=delta/max(d,.01)*cos(front*15.)*env*.075;ringLight+=sin(front*15.)*env*.02;}
    slope*=rippleStrength;
    vec3 normal=normalize(vec3(-slope.x,1.,-slope.y));
    vec3 viewDir=normalize(cameraPosition-poolWorld);
    float cosV=max(dot(normal,viewDir),0.);
    float fresnel=.02+.98*pow(1.-cosV,5.);
    vec2 uv=reflectionCoord.xy/reflectionCoord.w+slope*.05;
    vec3 reflected=texture2D(tDiffuse,clamp(uv,vec2(.002),vec2(.998))).rgb;
    float distance=length(p-glowCentre.xy);
    float pool=exp(-distance*distance/(glowCentre.z*glowCentre.z));
    float caustic=.55+.45*sin(p.x*5.1+sin(p.y*4.3+time*.35)*1.7)*sin(p.y*5.7+sin(p.x*3.9-time*.31)*1.5);
    vec3 body=deepColor*(.75+.25*sin(p.y*.14))+glowColor*pool*(.55+.45*caustic)+glowColor*.16*exp(-distance*.2);
    vec3 light=mix(body,reflected,fresnel)+ringLight*(color+glowColor*pool);
    vec3 h=normalize(lightDirection+viewDir);
    light+=glowColor*glint*pow(max(dot(normal,h),0.),420.)*(.25+pool*4.);
    gl_FragColor=vec4(light,1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;

export function createPool(_renderer: THREE.WebGLRenderer, scene: THREE.Scene, options: {
  width: number; depth: number; y: number; color?: string; position?: [number, number, number]; distortion?: number;
  clear?: ClearWaterOptions;
}) {
  const rippleStates = Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, -100, 0));
  const clear = options.clear;
  const shader = {
    name: 'DeepWaterPool',
    uniforms: {
      color: { value: new THREE.Color(options.color ?? '#164d4a') }, tDiffuse: { value: null }, textureMatrix: { value: new THREE.Matrix4() }, time: { value: 0 }, rippleClock: { value: 0 }, rings: { value: rippleStates }, rippleStrength: { value: options.distortion ?? .6 },
      deepColor: { value: new THREE.Color(clear?.deepColor ?? '#000000') },
      glowColor: { value: clear?.glow?.color.clone() ?? new THREE.Color(0, 0, 0) },
      glowCentre: { value: new THREE.Vector3(clear?.glow?.x ?? 0, clear?.glow?.z ?? 0, clear?.glow?.radius ?? 1) },
      lightDirection: { value: (clear?.lightDirection ?? new THREE.Vector3(0, 1, 0)).clone().normalize() },
      glint: { value: clear?.glint ?? 0 },
    },
    vertexShader: `uniform mat4 textureMatrix;varying vec4 reflectionCoord;varying vec3 poolWorld;
      void main(){poolWorld=(modelMatrix*vec4(position,1.)).xyz;reflectionCoord=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: clear ? clearWaterFragment : `uniform vec3 color;uniform sampler2D tDiffuse;uniform float time;uniform float rippleClock;uniform vec4 rings[4];uniform float rippleStrength;varying vec4 reflectionCoord;varying vec3 poolWorld;
      void main(){
        vec2 p=poolWorld.xz;
        vec2 slope=vec2(cos(p.x*2.1+p.y*.72+time*.42)*.025+cos(p.x*5.3-p.y*3.1-time*.3)*.009,sin(p.y*2.8+p.x*.56-time*.27)*.022);
        float ringLight=0.;
        for(int i=0;i<4;i++){float age=rippleClock-rings[i].z;vec2 delta=p-rings[i].xy;float d=length(delta);float front=d-age*1.3;float env=exp(-front*front*2.8)*exp(-age*.72)*rings[i].w*step(0.,age);float wave=sin(front*15.);slope+=delta/max(d,.01)*cos(front*15.)*env*.075;ringLight+=wave*env*.025;}
        slope*=rippleStrength;
        vec3 normal=normalize(vec3(-slope.x,1.,-slope.y));
        vec3 viewDir=normalize(cameraPosition-poolWorld);
        float fresnel=.045+.89*pow(1.-max(dot(normal,viewDir),0.),4.);
        vec2 uv=reflectionCoord.xy/reflectionCoord.w+slope*.065;
        vec3 reflected=texture2D(tDiffuse,clamp(uv,vec2(.002),vec2(.998))).rgb;
        vec3 scatter=color*(.5+.14*sin(p.y*.14)+.10*sin(p.x*.27+p.y*.17));
        vec3 light=mix(scatter,reflected,clamp(fresnel+.24,.0,.95))+ringLight;
        float sparkle=pow(max(dot(reflect(-normalize(vec3(-.3,.9,-.4)),normal),viewDir),0.),140.);
        light+=vec3(.8,.89,.82)*sparkle*.15;
        gl_FragColor=vec4(light,.87+.13*fresnel);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  };
  const mesh = new Reflector(new THREE.PlaneGeometry(options.width, options.depth), { textureWidth: 1024, textureHeight: 1024, clipBias: .003, multisample: 0, color: options.color ?? '#164d4a', shader });
  const reflect = mesh.onBeforeRender;
  let prepared = false;
  mesh.onBeforeRender = function (renderer, ...args) {
    if (!prepared) { preparePoolTarget(renderer, mesh.getRenderTarget()); prepared = true; }
    // Upstream r186 restores the target, but omits cube face/mip. Preserve those
    // too, including if a reflection pass throws, without changing its geometry.
    const previous = renderer.getRenderTarget();
    const face = renderer.getActiveCubeFace(), mip = renderer.getActiveMipmapLevel();
    try { reflect.call(this, renderer, ...args); }
    finally { renderer.setRenderTarget(previous, face, mip); }
  };
  mesh.name = 'deepwater-reflective-pool';
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(...(options.position ?? [0, options.y, 0]));
  mesh.position.y = options.y;
  const material = mesh.material as THREE.ShaderMaterial;
  // Clear water is an opaque surface: it writes depth so screen-space passes
  // (occlusion, light shafts) stop at the water instead of the submerged bed.
  material.transparent = !clear;
  material.depthWrite = !!clear;
  scene.add(mesh);
  let index = 0;
  let disposed = false;
  return {
    mesh,
    update(time: number) { material.uniforms.time.value = time; material.uniforms.rippleClock.value = time; },
    ripple(x: number, z: number, time: number) { (material.uniforms.rings.value as THREE.Vector4[])[index++ % 4].set(x, z, time, 1); },
    dispose() { if (disposed) return; disposed = true; mesh.getRenderTarget().dispose(); },
  };
}
