import * as THREE from 'three';
import { noise3, seeded } from '../../shared/render/noise';
import { GLSL_NOISE } from '../../shared/render/glsl';
import { applyTranslucency } from '../../shared/render/translucentSurface';
import type { PoolSurface } from './environment';

/*
 * Cave detail (original code): fluted, banded dripstones; a wet flowstone
 * shading layer; drops that gather on stalactite tips, fall and ring the pool;
 * dust motes and moisture glinting in the daylight shaft; and the still-pool
 * surface, which shows the lit stones on its bed under the shaft.
 */

const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/**
 * A dripstone: accretion rings around a gently wandering axis, carved into
 * vertical flowstone flutes that twist slowly, with faint growth bands. The
 * root flares into the rock; stalactites taper to a soda-straw tip.
 */
export function flutedDripstone(anchor: THREE.Vector3, height: number, radius: number, seed: number, up: boolean) {
  // Tessellation follows size: big formations carry flutes, straws stay cheap.
  const sides = radius > .45 ? 22 : radius > .2 ? 16 : radius > .08 ? 10 : 6;
  const rings = Math.max(8, Math.round((radius > .2 ? 12 : 6) + height * (radius > .2 ? 5 : 3)));
  const positions: number[] = [], indices: number[] = [];
  const random = seeded(seed * 104729 + 7);
  const bendX = (random() - .5) * .12 * height, bendZ = (random() - .5) * .12 * height;
  const sign = up ? 1 : -1;
  const flutes = 4 + Math.floor(random() * 5);
  const fluteDepth = up ? .26 + random() * .1 : .16 + random() * .1;
  const twist = (random() - .5) * 1.4;
  const bandPhase = random() * 6.28;
  for (let j = 0; j <= rings; j++) {
    const t = j / rings - .06; // start inside the rock so the root never floats
    const tc = Math.max(0, t);
    const axisX = bendX * tc * tc, axisZ = bendZ * tc * tc;
    const y = sign * t * height;
    const profile = up
      ? (Math.pow(1 - tc, .55) * .8 + .2) * (1 + .65 * Math.exp(-tc * 6))
      : Math.pow(1 - tc, 1.3) * (1 + .8 * Math.exp(-tc * 6.5));
    // Growth bands: soft bulges where the drip rate once changed.
    const bands = 1 + (up ? .012 : .022) * Math.sin(tc * height * 8.5 + bandPhase + noise3(seed, tc * 4, 5) * 2) + .012 * Math.sin(tc * height * 21 + bandPhase * 2);
    const tip = up ? radius * .25 : .011;
    for (let i = 0; i <= sides; i++) {
      const a = i / sides * Math.PI * 2;
      const cx = Math.cos(a), cz = Math.sin(a);
      const wander = noise3(seed, y * .45, 3) * 1.6 + twist * tc * 3;
      const flute = Math.pow(Math.abs(Math.sin((a * flutes + wander) / 2)), 1.6);
      const ridge = 1 - fluteDepth * (1 - flute) * (1 - tc * .55);
      const lump = 1 + (up ? .2 : .12) * noise3(cx * 1.3 + seed, y * (up ? .9 : 2.1), cz * 1.3) + .05 * noise3(cx * 4 + seed, y * 7, cz * 4);
      const r = Math.max(tip * (1 - tc) + .004, radius * profile * lump * ridge * bands);
      positions.push(anchor.x + axisX + cx * r, anchor.y + y, anchor.z + axisZ + cz * r);
      if (j < rings && i < sides) {
        const n = j * (sides + 1) + i;
        if (up) indices.push(n, n + 1, n + sides + 1, n + 1, n + sides + 2, n + sides + 1);
        else indices.push(n, n + sides + 1, n + 1, n + 1, n + sides + 1, n + sides + 2);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const end = rings / rings - .06;
  const tipPoint = new THREE.Vector3(anchor.x + bendX * end * end, anchor.y + sign * end * height, anchor.z + bendZ * end * end);
  return { geometry, tip: tipPoint };
}

/**
 * Wet calcite on top of the shared rock surface: cream and amber growth
 * bands, iron streaks running down the flutes, water films that turn glossy,
 * and translucency so thin stone glows where daylight is behind it.
 */
export function applyFlowstone(material: THREE.MeshStandardMaterial, key: string) {
  applyTranslucency(material, { key: `flowstone-${key}`, color: '#ffc890', forward: .55, diffuse: .35, distortion: .25, power: 3, wrap: .35, wrapTint: '#ffd8b0' });
  const previous = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {', 'float flowstoneFilm = 0.0;\nvoid main() {')
      .replace('#include <alphamap_fragment>', `{
  vec3 fw = vTranslucentWorld;
  float bands = sin(fw.y * 8.0 + bwNoise(fw * 1.7) * 2.5);
  float iron = smoothstep(0.1, 0.75, bwNoise(vec3(fw.x * 5.0, fw.y * 0.35, fw.z * 5.0) + 13.0));
  diffuseColor.rgb *= mix(vec3(1.0), vec3(1.1, 0.86, 0.64), iron * 0.55) * (0.93 + 0.07 * bands);
  // Water films follow the flutes downward.
  flowstoneFilm = smoothstep(0.35, 0.7, bwNoise(vec3(fw.x * 7.0, fw.y * 0.22, fw.z * 7.0) + 4.0));
  diffuseColor.rgb *= 1.0 - flowstoneFilm * 0.22;
}
#include <alphamap_fragment>`)
      .replace('#include <metalnessmap_fragment>', `roughnessFactor = mix(roughnessFactor, 0.06, flowstoneFilm * 0.85);
#include <metalnessmap_fragment>`);
  };
  const base = material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey = () => `${base()}|flowstone-v1|${key}`;
  return material;
}

// --- Drips ---------------------------------------------------------------------------

export interface DripSource { tip: THREE.Vector3; period: number; offset: number }
const GRAVITY = 9.8;

/** Deterministic schedule: when the drop from `source` last landed, at or before `time`. */
export function lastLanding(source: DripSource, waterY: number, time: number) {
  const k = Math.floor((time + source.offset) / source.period);
  return k * source.period - source.offset;
}
export function fallTime(source: DripSource, waterY: number) { return Math.sqrt(2 * Math.max(.1, source.tip.y - waterY) / GRAVITY); }

/**
 * Hanging drops swell at each tip, fall as short glinting streaks and burst
 * into a small crown on the water. Motion is a pure function of time.
 */
export function createDrips(sources: DripSource[], waterY: number) {
  const group = new THREE.Group();
  group.name = 'cave-drips';
  const material = new THREE.MeshStandardMaterial({ color: '#d8ece6', roughness: .04, metalness: 0, emissive: '#5a7a74', envMapIntensity: 2.5 });
  const geometry = new THREE.SphereGeometry(1, 10, 8);
  const drops = sources.map(() => { const mesh = new THREE.Mesh(geometry, material); group.add(mesh); return mesh; });
  // Splash crowns: ten droplets per source, thrown up and out from the landing point.
  const perSplash = 10;
  const crown = new Float32Array(sources.length * perSplash * 3);
  const random = seeded(311);
  sources.forEach((_, s) => { for (let k = 0; k < perSplash; k++) crown.set([s, k / perSplash * Math.PI * 2 + random() * .4, .6 + random() * .6], (s * perSplash + k) * 3); });
  const splashGeometry = new THREE.BufferGeometry();
  splashGeometry.setAttribute('position', new THREE.BufferAttribute(crown, 3));
  const landing = sources.map(() => new THREE.Vector4(0, 0, 0, -100));
  const splash = new THREE.Points(splashGeometry, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uLanding: { value: landing }, uTime: { value: 0 }, uWaterY: { value: waterY } },
    vertexShader: `uniform vec4 uLanding[${sources.length}];uniform float uTime;uniform float uWaterY;varying float vA;
      void main(){
        vec4 l=uLanding[int(position.x+.5)];
        float age=uTime-l.w;
        float speed=position.z;
        vec3 p=vec3(l.x+cos(position.y)*speed*.35*age, uWaterY+speed*1.6*age-4.9*age*age, l.z+sin(position.y)*speed*.35*age);
        vA=step(0.,age)*(1.-smoothstep(.15,.42,age))*step(uWaterY-.01,p.y);
        vec4 mv=modelViewMatrix*vec4(p,1.);
        gl_PointSize=clamp(22./-mv.z,1.,3.);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vA;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(vec3(.75,.85,.82)*vA*(1.-smoothstep(.2,1.,d)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  }));
  splash.frustumCulled = false;
  group.add(splash);
  const splashUniforms = (splash.material as THREE.ShaderMaterial).uniforms;
  return {
    group,
    update(time: number) {
      splashUniforms.uTime.value = time;
      sources.forEach((source, i) => {
        const land = lastLanding(source, waterY, time);
        const fall = fallTime(source, waterY);
        const next = land + source.period;
        const drop = drops[i];
        const sinceRelease = time - (next - fall);
        if (sinceRelease >= 0) {
          // Falling: a streak stretched along its speed (about two frames of travel).
          const speed = GRAVITY * sinceRelease;
          const y = source.tip.y - .5 * GRAVITY * sinceRelease * sinceRelease;
          const length = .02 + speed * .028;
          drop.position.set(source.tip.x, y + length * .5, source.tip.z);
          drop.scale.set(.011, length, .011);
          drop.visible = y > waterY;
        } else {
          // Gathering on the tip: swells over the cycle, sags as it grows.
          const grow = smooth(0, 1, (time - land) / Math.max(.1, source.period - fall));
          const r = .006 + .016 * Math.sqrt(grow);
          drop.position.set(source.tip.x, source.tip.y - r * 1.2, source.tip.z);
          drop.scale.set(r, r * (1.15 + grow * .5), r);
          drop.visible = true;
        }
        landing[i].set(source.tip.x, waterY, source.tip.z, land);
      });
    },
  };
}

// --- Roots through the opening ----------------------------------------------------------

/**
 * Tree roots and vines hanging through the roof opening: thin dark strands
 * silhouetted against the daylight, swaying a little in the air that moves
 * through the shaft.
 */
export function createRoots(rim: THREE.Vector3[], time: { value: number }) {
  const random = seeded(919);
  const pos: number[] = [], hang: number[] = [], idx: number[] = [];
  for (let k = 0; k < 22; k++) {
    const top = rim[Math.floor(random() * rim.length)].clone().add(new THREE.Vector3(0, .4, 0));
    const length = .8 + random() ** 1.5 * 3.6;
    const radius = .008 + random() * .022;
    const drift = new THREE.Vector3(random() - .5, 0, random() - .5).multiplyScalar(.5);
    const segs = 12, sides = 4, start = pos.length / 3;
    for (let j = 0; j <= segs; j++) {
      const t = j / segs;
      const c = top.clone().add(new THREE.Vector3(drift.x * t * t + Math.sin(t * 5 + k) * .05, -t * length, drift.z * t * t + Math.cos(t * 4 + k) * .05));
      const r = radius * (1 - t * .7);
      for (let i = 0; i < sides; i++) {
        const a = i / sides * Math.PI * 2;
        pos.push(c.x + Math.cos(a) * r, c.y, c.z + Math.sin(a) * r); hang.push(t * length);
      }
    }
    for (let j = 0; j < segs; j++) for (let i = 0; i < sides; i++) {
      const a = start + j * sides + i, b = start + j * sides + (i + 1) % sides;
      idx.push(a, a + sides, b, b, a + sides, b + sides);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geometry.setAttribute('hang', new THREE.Float32BufferAttribute(hang, 1));
  geometry.setIndex(idx); geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ color: '#3a2c20', roughness: .9, side: THREE.DoubleSide });
  material.onBeforeCompile = shader => {
    shader.uniforms.uRootTime = time;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uRootTime;\nattribute float hang;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
float sway = hang * hang * 0.012;
transformed.x += sin(uRootTime * 0.35 + position.z * 3.0) * sway;
transformed.z += cos(uRootTime * 0.28 + position.x * 3.0) * sway;`);
  };
  material.customProgramCacheKey = () => 'cave-roots-v1';
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'cave-roots';
  mesh.castShadow = true;
  mesh.frustumCulled = false;
  return mesh;
}

// --- Dust motes in the shaft -------------------------------------------------------------

/**
 * Motes in cone coordinates (along the shaft, across it, around it) so they
 * can drift on their own: a slow updraft, gentle swirl, and wrap from foot to
 * top. Brightness follows forward scattering toward the eye; a few tumbling
 * flakes catch the light and sparkle.
 */
export function createMotes(aperture: THREE.Vector3, foot: THREE.Vector3, topRadius: number, footRadius: number, pixelRatio: number, time: { value: number }) {
  const count = 2600;
  const coords = new Float32Array(count * 3), seeds = new Float32Array(count);
  const random = seeded(77);
  for (let i = 0; i < count; i++) { coords.set([random(), Math.sqrt(random()) * 1.15, random() * Math.PI * 2], i * 3); seeds[i] = random(); }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(coords, 3));
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));
  const axis = foot.clone().sub(aperture);
  const side = new THREE.Vector3().crossVectors(axis, new THREE.Vector3(0, 0, 1)).normalize();
  const side2 = new THREE.Vector3().crossVectors(axis, side).normalize();
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: time, uPixelRatio: { value: pixelRatio }, uApex: { value: aperture.clone() }, uAxis: { value: axis }, uSide: { value: side }, uSide2: { value: side2 }, uRadii: { value: new THREE.Vector2(topRadius, footRadius) } },
    vertexShader: `${GLSL_NOISE}
      uniform float uTime;uniform float uPixelRatio;uniform vec3 uApex;uniform vec3 uAxis;uniform vec3 uSide;uniform vec3 uSide2;uniform vec2 uRadii;
      attribute float seed;varying vec3 vColor;
      void main(){
        // Rising slowly in the warm shaft, wrapping from the foot back to the top.
        float s = fract(position.x - uTime * (0.0025 + 0.003 * seed));
        float spin = position.z + uTime * (0.02 + 0.03 * seed) * (seed > 0.5 ? 1.0 : -1.0);
        float r = mix(uRadii.x, uRadii.y, s) * position.y;
        vec3 p = uApex + uAxis * s + (uSide * cos(spin) + uSide2 * sin(spin)) * r;
        p += vec3(bwNoise(vec3(seed * 40.0, uTime * 0.05, 1.0)), bwNoise(vec3(seed * 40.0, uTime * 0.04, 7.0)), bwNoise(vec3(seed * 40.0, uTime * 0.05, 13.0))) * 0.25;
        float inside = 1.0 - smoothstep(0.55, 1.1, position.y);
        float ends = smoothstep(0.02, 0.1, s) * (1.0 - smoothstep(0.88, 1.0, s));
        vec3 toEye = normalize(cameraPosition - p);
        float g = 0.55, c = dot(toEye, normalize(uAxis));
        float phase = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * c, 1.5);
        float sparkle = pow(0.5 + 0.5 * sin(uTime * (0.7 + seed * 1.9) + seed * 90.0), 14.0) * step(0.72, seed);
        float big = step(0.93, fract(seed * 13.7));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float size = (0.024 + 0.03 * fract(seed * 7.13) + big * 0.05) * uPixelRatio * 900.0 / -mv.z;
        gl_PointSize = clamp(size, 1.0, 7.0 * uPixelRatio);
        float cover = min(size * size, 1.0);
        vColor = vec3(1.6, 1.42, 1.1) * 2.0 * inside * ends * cover * (0.3 + 0.55 * phase + 2.6 * sparkle) * (0.35 + 0.65 * fract(seed * 3.7)) * (big > 0.5 ? 0.5 : 1.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(vColor*(1.-smoothstep(.15,1.,d)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.name = 'cave-shaft-motes';
  return points;
}

// --- Pool surface -----------------------------------------------------------------------

/**
 * Still-pool shading for the cave: Schlick reflection of the cavern with
 * micro-ripples that make the mirrored glowworms twinkle; fine rings from
 * falling drops (a short train of wavelets) and broader rings from a touch;
 * and, under the shaft, a view down through clear water to a pebbled bed
 * dappled with moving caustics, its red absorbed with depth.
 */
export function cavePoolSurface(time: { value: number }, bedSpot: THREE.Vector3): PoolSurface {
  return {
    uniforms: { uBedSpot: { value: bedSpot }, uCaveTime: time },
    fragmentShader: /* glsl */ `
uniform vec3 color;uniform vec3 deepColor;uniform sampler2D tDiffuse;uniform float time;uniform float rippleClock;uniform vec4 rings[8];uniform float rippleStrength;
uniform vec3 glowColor;uniform vec3 glowCentre;uniform vec3 lightDirection;uniform float glint;uniform vec3 uBedSpot;
varying vec4 reflectionCoord;varying vec3 poolWorld;
${GLSL_NOISE}
vec2 waveSlope(vec2 p,float t){
  vec2 s=vec2(cos(p.x*2.1+p.y*.72+t*.42)*.016+cos(p.x*5.3-p.y*3.1-t*.3)*.006,sin(p.y*2.8+p.x*.56-t*.27)*.014);
  s+=vec2(cos(p.x*11.3+p.y*7.1+t*.9),sin(p.y*12.7-p.x*5.9-t*.8))*.004;
  s+=vec2(sin(p.x*23.1-p.y*17.3+t*1.3),cos(p.y*27.9+p.x*13.1+t*1.1))*.0024;
  s+=vec2(sin(p.x*47.0+p.y*31.0+t*2.1),cos(p.y*53.0-p.x*29.0+t*1.9))*.0011;
  return s;
}
vec2 cellPoint(vec2 c,float t){vec3 h=bwHash3(vec3(c,5.0));return .5+.36*sin(t*(.5+.4*h.z)+6.2831853*h.xy);}
float cellEdge(vec2 p,float t){vec2 i=floor(p),q=fract(p);float f1=8.,f2=8.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec2 r=o+cellPoint(i+o,t)-q;float d=dot(r,r);if(d<f1){f2=f1;f1=d;}else if(d<f2){f2=d;}}
  return sqrt(f2)-sqrt(f1);}
float pebbles(vec2 p,out float id){vec2 i=floor(p),q=fract(p);float best=8.;id=0.;
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y));vec3 h=bwHash3(vec3(i+o,9.0));vec2 r=o+.2+.6*h.xy-q;float d=dot(r,r);if(d<best){best=d;id=h.z;}}
  return sqrt(best);}
void main(){
  vec2 p=poolWorld.xz;
  vec2 slope=waveSlope(p,time);
  float ringLight=0.;
  for(int i=0;i<8;i++){
    float age=rippleClock-rings[i].z;
    if(age<0.0||age>10.0)continue;
    vec2 delta=p-rings[i].xy;float d=length(delta);
    // A touch makes broad rings; a drop makes a train of fine wavelets.
    float touch=step(.8,rings[i].w);
    float speed=mix(.42,1.3,touch),k=mix(26.,15.,touch);
    float front=d-age*speed;
    float packet=exp(-front*front*mix(3.,2.8,touch))*step(front,.35);
    float env=packet*exp(-age*mix(.28,.72,touch))*rings[i].w/(1.+d*mix(1.2,0.,touch));
    slope+=delta/max(d,.01)*cos(front*k)*env*mix(.28,.075,touch);
    ringLight+=sin(front*k)*env*mix(.08,.02,touch);
  }
  slope*=rippleStrength;
  vec3 normal=normalize(vec3(-slope.x,1.,-slope.y));
  vec3 viewDir=normalize(cameraPosition-poolWorld);
  float cosV=max(dot(normal,viewDir),0.);
  float fresnel=.02+.98*pow(1.-cosV,5.);
  vec2 uv=reflectionCoord.xy/reflectionCoord.w+slope*.05;
  vec2 texel=vec2(.0012,.0009);
  vec3 reflected=texture2D(tDiffuse,clamp(uv,vec2(.002),vec2(.998))).rgb*.5
    +texture2D(tDiffuse,clamp(uv+texel,vec2(.002),vec2(.998))).rgb*.125+texture2D(tDiffuse,clamp(uv-texel,vec2(.002),vec2(.998))).rgb*.125
    +texture2D(tDiffuse,clamp(uv+vec2(texel.x,-texel.y),vec2(.002),vec2(.998))).rgb*.125+texture2D(tDiffuse,clamp(uv+vec2(-texel.x,texel.y),vec2(.002),vec2(.998))).rgb*.125;
  // Looking down through the water: a pebbled bed, lit by the refracted shaft.
  vec3 refr=refract(-viewDir,normal,.75);
  float depth=1.6+.9*bwNoise(vec3(p*.3,2.0));
  float path=depth/max(-refr.y,.2);
  vec3 bed=poolWorld+refr*path;
  vec2 toSpot=bed.xz-uBedSpot.xy;
  float lit=exp(-dot(toSpot,toSpot)/(uBedSpot.z*uBedSpot.z));
  float id;float pd=pebbles(bed.xz*3.2,id);
  float stone=smoothstep(.62,.35,pd);
  vec3 albedo=mix(vec3(.18,.16,.13),mix(vec3(.62,.58,.5),vec3(.42,.46,.4),id),stone)*(.8+.2*bwNoise(vec3(bed.xz*14.,1.)));
  float c1=1.-smoothstep(0.,.07,cellEdge(bed.xz*2.4+vec2(time*.03,0.),time*.5));
  float c2=1.-smoothstep(0.,.09,cellEdge(bed.xz*3.6+vec2(0.,time*.04)+4.,time*.42));
  float caustic=.25+1.1*c1+.7*c2+1.6*c1*c2;
  vec3 absorb=exp(-vec3(.55,.16,.12)*(path+depth));
  vec3 bedLight=albedo*glowColor*(1.7*lit*caustic+.02)*absorb;
  float dist=length(p-glowCentre.xy);
  float pool=exp(-dist*dist/(glowCentre.z*glowCentre.z));
  vec3 body=deepColor*(.75+.25*sin(p.y*.14))+bedLight+glowColor*.07*pool+glowColor*.05*exp(-dist*.25);
  vec3 light=mix(body,reflected,fresnel)+ringLight*(color*.5+glowColor*pool);
  vec3 h=normalize(lightDirection+viewDir);
  light+=glowColor*glint*pow(max(dot(normal,h),0.),420.)*(.25+pool*4.);
  gl_FragColor=vec4(light,1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  };
}
