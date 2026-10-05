import * as THREE from 'three';
import { createShoreEnvironment } from '../byteEnvironment';
import type { WorldScene, WaterEdgeInteraction } from '../contracts';

/** Independently authored basalt strand: physical stones, shallow swash and a silver dawn. */
export function createPebbleShore(renderer: THREE.WebGLRenderer): WorldScene {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(56, 1, 0.035, 210);
  const raycaster = new THREE.Raycaster();
  const clock = { value: 0 };
  const palette = [0x555951, 0x424b49, 0x696960, 0x393f40, 0x626364, 0x5e625c, 0x3b4146, 0x6b6a61];
  const random = seeded(731923);
  const scaleMatrix = new THREE.Object3D();
  scene.fog = new THREE.FogExp2(0xa7b9ba, 0.0085);
  renderer.toneMappingExposure = 1.06;

  const skyMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: `varying vec3 vD; void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `
      varying vec3 vD;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      float rnCloud(vec2 p){return noise(p)*.7+noise(p*2.7)*.3;}
      void main(){
        vec3 d=normalize(vD);float h=max(d.y,0.);
        vec3 c=mix(vec3(.67,.76,.77),vec3(.32,.46,.54),pow(h,.55));
        float glow=pow(max(dot(d,normalize(vec3(.62,.14,-.78))),0.),15.);
        c+=vec3(.26,.17,.075)*glow;
        vec2 q=d.xz/max(d.y+.22,.1)*1.8;
        float clouds=noise(q*.7)*.56+noise(q*1.8)*.28+noise(q*4.3)*.16;
        float band=rnCloud(vec2(d.x*4.2+d.z*1.7,d.y*24.+d.z*2.));
        c=mix(c,vec3(.77,.8,.8),smoothstep(.32,.7,clouds)*smoothstep(.005,.2,h)*.34);
        c-=vec3(.055,.047,.035)*smoothstep(.48,.78,band)*(1.-smoothstep(.13,.58,h));
        c+=vec3(.045,.041,.028)*pow(1.-abs(d.y),7.);
        gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(180, 32, 16), skyMaterial);
  sky.name = 'silver-morning-sky';
  scene.add(sky);
  // Environment radiance is rendered once; stones retain actual roughness-dependent reflections.
  const environmentScene = new THREE.Scene();
  const environmentSky = new THREE.Mesh(new THREE.SphereGeometry(25, 32, 16), skyMaterial);
  environmentScene.add(environmentSky);
  const environment = createShoreEnvironment(renderer, environmentScene);
  scene.environment = environment.texture;
  environmentSky.geometry.dispose();

  scene.add(new THREE.HemisphereLight(0xd1e8eb, 0x5a5144, 1.85));
  const morning = new THREE.DirectionalLight(0xffe6c1, 2.65);
  morning.position.set(8, 12, -13);
  morning.castShadow = true;
  morning.shadow.mapSize.set(2048, 2048);
  morning.shadow.camera.left = -10; morning.shadow.camera.right = 10;
  morning.shadow.camera.top = 9; morning.shadow.camera.bottom = -7;
  morning.shadow.camera.near = 0.5; morning.shadow.camera.far = 40;
  morning.shadow.normalBias = 0.018;
  morning.shadow.bias = -0.00015;
  morning.shadow.radius = 3;
  morning.target.position.set(0, 0, 0);
  scene.add(morning, morning.target);
  const fill = new THREE.DirectionalLight(0xbdd8e5, 0.6);
  fill.position.set(-9, 4, 3); scene.add(fill);

  const bedGeometry = new THREE.PlaneGeometry(85, 120, 80, 95);
  bedGeometry.rotateX(-Math.PI / 2);
  bedGeometry.translate(0, 0, -48);
  const bedPositions = bedGeometry.getAttribute('position');
  for (let i = 0; i < bedPositions.count; i++) {
    const x = bedPositions.getX(i), z = bedPositions.getZ(i);
    bedPositions.setY(i, bedHeight(x, z));
  }
  bedGeometry.computeVertexNormals();
  const bedMaterial = new THREE.MeshStandardMaterial({ color: 0x414944, roughness: 0.92 });
  bedMaterial.onBeforeCompile = shader => {
    shader.vertexShader = `varying vec3 vBed;\n${shader.vertexShader}`.replace('#include <begin_vertex>', '#include <begin_vertex>\nvBed=position;');
    shader.fragmentShader = `varying vec3 vBed;\n${noiseGLSL}\n${shader.fragmentShader}`.replace('#include <color_fragment>', `#include <color_fragment>
      float gravel=rn(vBed.xz*55.);float broad=rn(vBed.xz*1.8);
      diffuseColor.rgb*=.64+gravel*.56+broad*.17;`);
  };
  const bed = new THREE.Mesh(bedGeometry, bedMaterial);
  bed.receiveShadow = true; bed.name = 'sloped-gravel-strand'; scene.add(bed);

  // Basalt is dielectric. Dry crowns stay diffuse; only the actual swash contact
  // and its narrow damp fringe acquire a smoother, darker surface.
  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.79, metalness: 0, vertexColors: true, envMapIntensity: 0.75 });
  stoneMaterial.onBeforeCompile = shader => {
    shader.uniforms.uShoreTime = clock;
    shader.vertexShader = `varying vec3 vStoneLocal;varying vec3 vStoneWorld;varying float vStoneSeed;\n${shader.vertexShader}`.replace('#include <begin_vertex>', `#include <begin_vertex>
      vStoneLocal=position;
      vec4 shoreWorld=vec4(transformed,1.);
      vec3 stoneTint=vec3(1.);
      #ifdef USE_COLOR
        stoneTint=color;
      #endif
      #ifdef USE_INSTANCING
        shoreWorld=instanceMatrix*shoreWorld;
      #endif
      #ifdef USE_INSTANCING_COLOR
        stoneTint*=instanceColor;
      #endif
      // Immutable mineral colour anchors grain even while the reachable pebble rolls.
      vStoneSeed=fract(dot(stoneTint,vec3(17.3,11.7,23.1)));
      vStoneWorld=(modelMatrix*shoreWorld).xyz;`);
    shader.fragmentShader = `varying vec3 vStoneLocal;varying vec3 vStoneWorld;varying float vStoneSeed;uniform float uShoreTime;\n${noiseGLSL}\n${shader.fragmentShader}`
      .replace('#include <color_fragment>', `#include <color_fragment>
        vec3 stoneP=vStoneLocal+vec3(vStoneSeed*17.3,vStoneSeed*11.7,vStoneSeed*23.1);
        // Low-contrast isotropic mineral grain, filtered below a pixel. No pale
        // sine stripes, thresholded flecks or repeated scratch-like quartz marks.
        float broad=rn(stoneP.xz*3.6+stoneP.y*.8)*.55+rn(stoneP.zy*4.1)*.45;
        float grain=rn(stoneP.xy*58.)*.35+rn(stoneP.yz*61.)*.35+rn(stoneP.zx*55.)*.3;
        float resolved=1.-smoothstep(.35,1.4,length(fwidth(vStoneLocal))*60.);
        grain=mix(.5,grain,resolved);
        float mineral=rn(stoneP.xz*17.+stoneP.y*3.1)*.6+rn(stoneP.zy*19.)*.4;
        diffuseColor.rgb*=.89+broad*.23+(mineral-.5)*.17+(grain-.5)*.16;
        float shoreBed=.038*(vStoneWorld.z+1.7)+.018*sin(vStoneWorld.x*.67)+.009*sin(vStoneWorld.z*1.3+vStoneWorld.x*.2)
          -.09*exp(-pow((vStoneWorld.x+.4)*.6,2.))*exp(-pow((vStoneWorld.z-.2)*.35,2.));
        float tide=.076+sin(uShoreTime*.29-.7)*.042+sin(uShoreTime*.14)*.009;
        float waterHeight=tide+(sin(vStoneWorld.x*.94+vStoneWorld.z*1.57+uShoreTime*.72)*.014
          +sin(vStoneWorld.z*4.1-vStoneWorld.x*1.3+uShoreTime*.88)*.006)*smoothstep(0.,.8,tide-shoreBed);
        float contact=1.-smoothstep(-.006,.008,vStoneWorld.y-waterHeight);
        float damp=(1.-smoothstep(.008,.043,vStoneWorld.y-waterHeight))*(.7+broad*.3);
        diffuseColor.rgb*=mix(1.,.68,max(contact,damp*.65));`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        float dryR=.73+vStoneSeed*.13+(broad-.5)*.065;
        roughnessFactor=mix(dryR,.57+vStoneSeed*.095,damp);
        roughnessFactor=mix(roughnessFactor,.32+vStoneSeed*.1,contact);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        // Sub-millimetre surface grain modulates local light without glitter.
        // Derivatives are in view-space, so bumps follow the real curved surface.
        vec3 surfaceX=dFdx(-vViewPosition),surfaceY=dFdy(-vViewPosition);
        vec3 gradX=cross(surfaceY,normal),gradY=cross(normal,surfaceX);
        float surfaceDet=dot(surfaceX,gradX);
        vec3 mineralGradient=sign(surfaceDet)*(dFdx(grain)*gradX+dFdy(grain)*gradY);
        normal=normalize(max(abs(surfaceDet),1.e-10)*normal-mineralGradient*.00065*(1.-contact*.7));`);
  };
  stoneMaterial.customProgramCacheKey = () => 'water-edge-basalt-contact-v4';

  // Several independently warped rounded geometries, distributed by a jittered hexagonal field.
  // No shared sphere silhouettes: each variant has flattened lobes and uneven worn shoulders.
  const stoneVariants = Array.from({ length: 9 }, (_, i) => wornStoneGeometry(i + 2, 14, 10));
  const smallStones: { position: THREE.Vector3; scale: THREE.Vector3; rotation: THREE.Euler; color: THREE.Color }[][] = stoneVariants.map(() => []);
  const rollPebblePosition = new THREE.Vector3(-0.18, 0, 1.36);
  // This open patch is intentional: it leaves one reachable stone distinct enough to touch.
  for (let row = 0; row < 26; row++) {
    const z = 3.1 - row * .3;
    for (let col = 0; col < 75; col++) {
      const x = (col - 37) * .31 + (row % 2) * .16 + (random() - .5) * .17;
      const pz = z + (random() - .5) * .17;
      if (Math.abs(x + .18) < .29 && Math.abs(pz - 1.36) < .21) continue;
      if (random() < .13 || (pz < -1 && random() < .15)) continue;
      const swashOpening = Math.exp(-Math.pow((x + .35) * .64, 2));
      if (pz < 1.32 && pz > -3.1 && random() < swashOpening * .78) continue;
      const size = .075 + random() * .11;
      const sx = size * (1. + random() * .8), sy = size * (.47 + random() * .4), sz = size * (.8 + random() * .6);
      const y = bedHeight(x, pz) + sy * .53;
      smallStones[Math.floor(random() * stoneVariants.length)].push({
        position: new THREE.Vector3(x, y, pz), scale: new THREE.Vector3(sx, sy, sz),
        rotation: new THREE.Euler((random() - .5) * .6, random() * Math.PI * 2, (random() - .5) * .5),
        color: new THREE.Color(palette[Math.floor(random() * palette.length)]),
      });
    }
  }
  smallStones.forEach((stones, v) => {
    const instanced = new THREE.InstancedMesh(stoneVariants[v], stoneMaterial, stones.length);
    instanced.name = `rounded-basalt-field-${v}`;
    instanced.castShadow = true; instanced.receiveShadow = true;
    stones.forEach((stone, i) => {
      scaleMatrix.position.copy(stone.position); scaleMatrix.scale.copy(stone.scale); scaleMatrix.rotation.copy(stone.rotation); scaleMatrix.updateMatrix();
      instanced.setMatrixAt(i, scaleMatrix.matrix); instanced.setColorAt(i, stone.color);
    });
    instanced.instanceMatrix.needsUpdate = true;
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
    scene.add(instanced);
  });

  // Foreground stones have higher tessellation and individual shape/color; their rims occlude
  // one another and sit into the coarse bed instead of floating above a flat plane.
  const foregroundSpecs = [
    [-1.32, 2.35, .56, .25, .43, 3], [1.49, 2.49, .58, .24, .42, 1],
    [-1.19, .65, .31, .13, .26, 5], [1.7, 1.21, .35, .14, .3, 7],
    [-2.3, 1.39, .4, .19, .34, 4], [.85, 2.78, .32, .16, .27, 2],
    [2.59, .25, .46, .2, .4, 8], [-2.97, -.48, .5, .2, .4, 3],
    [1.53, -.61, .24, .115, .21, 5], [-.12, 2.82, .29, .105, .22, 6],
  ];
  foregroundSpecs.forEach(([x, z, sx, sy, sz, n], i) => {
    const g = wornStoneGeometry(n + 31, 30, 22);
    const colors = new Float32Array(g.getAttribute('position').count * 3);
    const c = new THREE.Color(palette[i % palette.length]);
    for (let j = 0; j < colors.length; j += 3) { colors[j] = c.r; colors[j + 1] = c.g; colors[j + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mesh = new THREE.Mesh(g, stoneMaterial);
    mesh.position.set(x, bedHeight(x, z) + sy * .53, z);
    mesh.scale.set(sx, sy, sz); mesh.rotation.set(.07 * (i % 3), n * .62, -.1);
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = `foreground-quartz-basalt-${i}`;
    scene.add(mesh);
  });

  const targetGeometry = wornStoneGeometry(108, 36, 26);
  const targetColors = new Float32Array(targetGeometry.getAttribute('position').count * 3);
  const targetColor = new THREE.Color(0x484e49);
  for (let i = 0; i < targetColors.length; i += 3) { targetColors[i] = targetColor.r; targetColors[i + 1] = targetColor.g; targetColors[i + 2] = targetColor.b; }
  targetGeometry.setAttribute('color', new THREE.BufferAttribute(targetColors, 3));
  const rollPebble = new THREE.Mesh(targetGeometry, stoneMaterial);
  rollPebble.name = 'touch-to-roll-near-pebble';
  rollPebblePosition.y = bedHeight(rollPebblePosition.x, rollPebblePosition.z) + .076;
  rollPebble.position.copy(rollPebblePosition); rollPebble.scale.set(.195, .112, .165);
  rollPebble.rotation.set(.1, .44, .06);
  rollPebble.castShadow = true; rollPebble.receiveShadow = true;
  scene.add(rollPebble);
  let rollStarted = -100;
  let rollBaseX = rollPebblePosition.x;
  let rollBaseRotation = rollPebble.rotation.z;
  let rollDirection = 1;
  let nextDirection = 1;

  const waterGeometry = new THREE.PlaneGeometry(280, 162, 110, 160);
  waterGeometry.rotateX(-Math.PI / 2); waterGeometry.translate(0, .04, -71);
  const waterMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uTime: clock, uCamera: { value: camera.position } },
    vertexShader: `
      uniform float uTime;varying vec3 vWorld;varying float vDepth;
      float bed(float x,float z){return .038*(z+1.7)+.018*sin(x*.67)+.009*sin(z*1.3+x*.2)-.09*exp(-pow((x+.4)*.6,2.))*exp(-pow((z-.2)*.35,2.));}
      void main(){vec3 p=position;
        float tide=.076+sin(uTime*.29-.7)*.042+sin(uTime*.14)*.009;
        float depth=tide-bed(p.x,p.z);
        p.y=tide+(sin(p.x*.94+p.z*1.57+uTime*.72)*.014+sin(p.z*4.1-p.x*1.3+uTime*.88)*.006)*smoothstep(0.,.8,depth);
        vDepth=p.y-bed(p.x,p.z);vWorld=p;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
      }`,
    fragmentShader: `
      uniform float uTime;uniform vec3 uCamera;varying vec3 vWorld;varying float vDepth;
      ${noiseGLSL}
      void main(){
        vec2 p=vWorld.xz;
        float depth=vWorld.y-(.038*(p.y+1.7)+.018*sin(p.x*.67)+.009*sin(p.y*1.3+p.x*.2)-.09*exp(-pow((p.x+.4)*.6,2.))*exp(-pow((p.y-.2)*.35,2.)));
        if(depth<.0005)discard;
        float tideNoise=(rn(vec2(p.x*2.7+uTime*.06,p.y*.5))-.5)*.012;
        float edge=depth+tideNoise;
        vec2 wav=vec2(sin(p.x*1.32+p.y*2.1+uTime*.8)*.045+sin(p.y*5.6+uTime*.98)*.022,
          cos(p.x*.91-p.y*1.45+uTime*.52)*.07+sin(p.x*6.1+p.y*3.6+uTime*.83)*.021);
        float detail=rn(p*22.+vec2(uTime*.024,uTime*.053));
        vec3 normal=normalize(vec3(-wav.x-detail*.014,1.,-wav.y));
        vec3 viewDir=normalize(uCamera-vWorld);
        float fresnel=pow(1.-max(dot(viewDir,normal),0.),3.2);
        vec3 reflected=reflect(-viewDir,normal);
        float rh=max(reflected.y,0.);
        vec3 skyColor=mix(vec3(.53,.65,.66),vec3(.25,.4,.49),pow(rh,.45));
        float warm=pow(max(dot(reflected,normalize(vec3(.62,.14,-.78))),0.),20.);
        skyColor+=vec3(.28,.19,.085)*warm;
        vec3 body=mix(vec3(.22,.32,.29),vec3(.16,.29,.31),smoothstep(0.,3.,depth));
        vec3 c=mix(body,skyColor,.29+fresnel*.63);
        float glimmer=pow(max(dot(reflect(-normalize(vec3(.48,.65,-.59)),normal),viewDir),0.),85.);
        c+=vec3(.77,.62,.35)*glimmer*.2;
        // A thin, broken line at the actual moving swash edge; open water remains foam-free.
        float lip=(1.-smoothstep(.006,.03,abs(edge-.017)))*smoothstep(.23,.51,rn(vec2(p.x*5.8,p.y*10.-uTime*.12)));
        float lace=(1.-smoothstep(.006,.014,abs(edge-.071-rn(vec2(p.x*2.4,uTime*.07))*.027)));
        lace*=smoothstep(.48,.69,rn(p*vec2(13.,21.)+uTime*.06))*.41;
        float foam=clamp(lip*.64+lace,0.,.82);
        c=mix(c,vec3(.78,.85,.79),foam);
        float alpha=(.25+fresnel*.56+smoothstep(.0,.65,depth)*.21)*smoothstep(.0,.014,depth);
        alpha=max(alpha,foam*.8);
        // Distance mist blends the far water naturally into a luminous silver horizon.
        c=mix(c,vec3(.57,.67,.67),1.-exp(-length(p)*.008));
        gl_FragColor=vec4(c,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.name = 'advancing-shallow-swash'; water.renderOrder = 2; water.frustumCulled = false; scene.add(water);

  // A low, asymmetric basalt headland defines this small cove; it is not the open oil-sea panorama.
  const coastMaterial = new THREE.MeshStandardMaterial({ color: 0xb3b7af, roughness: .96, vertexColors: true, envMapIntensity: .15 });
  coastMaterial.onBeforeCompile = shader => {
    shader.vertexShader = `varying vec3 vCrag;\n${shader.vertexShader}`.replace('#include <begin_vertex>', '#include <begin_vertex>\nvCrag=(modelMatrix*vec4(position,1.)).xyz;');
    shader.fragmentShader = `varying vec3 vCrag;\n${noiseGLSL}\n${shader.fragmentShader}`.replace('#include <color_fragment>', `#include <color_fragment>
      float strata=abs(sin(vCrag.y*5.5+rn(vCrag.xz*.65)*1.1));
      float cleft=1.-smoothstep(.035,.18,strata);
      float fissure=1.-smoothstep(.028,.1,abs(sin(vCrag.x*3.7+vCrag.z*2.2+rn(vCrag.xy*.9)*2.)));
      diffuseColor.rgb*=.64+rn(vCrag.xz*3.2+vCrag.y*.6)*.37;
      diffuseColor.rgb*=1.-cleft*.2-fissure*.15;`);
  };
  const coastSpecs = [
    [-28, -33, 13, 5.8, 8, 53], [-19, -37, 9, 4.5, 7, 39], [-13, -37, 7, 2.8, 6, 91],
    [-8.8, -38, 4.8, 1.7, 3.5, 13], [-33, -27, 10, 5.6, 7, 84],
    [12.7, -24, 2.5, .62, 1.5, 5], [14.5, -26, 1.7, .44, 1.4, 44],
  ];
  coastSpecs.forEach(([x, z, sx, sy, sz, seed], i) => {
    const geometry = cragGeometry(seed, 36, 24);
    const positions = geometry.getAttribute('position');
    const colors = new Float32Array(positions.count * 3);
    for (let j = 0; j < positions.count; j++) {
      const y = positions.getY(j);
      const top = THREE.MathUtils.smoothstep(y, .31, .8);
      const c = new THREE.Color(0x646b67).lerp(new THREE.Color(0x676d50), top * .48);
      c.multiplyScalar(.9 + .1 * Math.sin(positions.getX(j) * 21 + positions.getZ(j) * 13));
      colors[j * 3] = c.r; colors[j * 3 + 1] = c.g; colors[j * 3 + 2] = c.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const cliff = new THREE.Mesh(geometry, coastMaterial);
    cliff.position.set(x, -.18, z); cliff.scale.set(sx, sy, sz);
    cliff.rotation.y = i * .39;
    cliff.name = `weathered-headland-${i}`; scene.add(cliff);
  });

  // Water-worn driftwood and a single washed-up frond supply quiet scale cues at the strand edge.
  const driftGeometry = new THREE.CylinderGeometry(.022, .035, .85, 9, 8);
  const driftPos = driftGeometry.getAttribute('position');
  for (let i = 0; i < driftPos.count; i++) { driftPos.setX(i, driftPos.getX(i) + Math.sin(driftPos.getY(i) * 5) * .036); }
  driftGeometry.computeVertexNormals();
  const driftwood = new THREE.Mesh(driftGeometry, new THREE.MeshStandardMaterial({ color: 0x80715c, roughness: .92 }));
  driftwood.position.set(1.83, bedHeight(1.83, 1.8) + .041, 1.8); driftwood.rotation.set(Math.PI / 2, .3, .71);
  driftwood.castShadow = true; driftwood.receiveShadow = true; driftwood.name = 'water-worn-twig'; scene.add(driftwood);
  const seaweed = new THREE.Group(); seaweed.name = 'washed-kelp-frond';
  const kelpMaterial = new THREE.MeshStandardMaterial({ color: 0x5c6040, roughness: .44, side: THREE.DoubleSide });
  for (let i = 0; i < 5; i++) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(.05 * (i - 2), .018, .15),
      new THREE.Vector3(.06 * (i - 2), .022, .31), new THREE.Vector3(.065 * (i - 2) + .03, .012, .41 + i * .025),
    ]);
    const points = curve.getPoints(16);
    const vertices: number[] = [], indices: number[] = [];
    points.forEach((point, j) => { const width = Math.sin(j / 16 * Math.PI) * .017; vertices.push(point.x - width, point.y, point.z, point.x + width, point.y, point.z); if(j<16){const a=j*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);} });
    const g = new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();
    seaweed.add(new THREE.Mesh(g, kelpMaterial));
  }
  seaweed.position.set(-1.54, bedHeight(-1.54, .36) + .014, .36);seaweed.rotation.y=-.48;scene.add(seaweed);

  function resize(width: number, height: number) {
    const portrait = width / height < .8;
    camera.aspect = width / height;
    camera.fov = portrait ? 58 : 55;
    camera.position.set(portrait ? -.05 : .05, portrait ? .67 : .72, portrait ? 3.35 : 3.25);
    // Portrait deliberately tilts toward the reachable waterline, retaining the horizon and
    // substantial tactile stones rather than spending the narrow frame on an empty sky.
    camera.lookAt(portrait ? -.2 : -.32, portrait ? -.43 : -.2, portrait ? -1.25 : -2.65);
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
  }
  function update(time: number, _dt: number) {
    clock.value = time;
    if (time - rollStarted >= 0 && time - rollStarted < 2.2) {
      renderer.shadowMap.needsUpdate = true;
      const t = Math.min(1, (time - rollStarted) / 1.7);
      const ease = 1 - Math.pow(1 - t, 3);
      const rocking = Math.sin(t * Math.PI * 5) * (1 - t) * .035;
      rollPebble.position.x = rollBaseX + rollDirection * .19 * ease;
      rollPebble.position.y = bedHeight(rollPebble.position.x, rollPebble.position.z) + .076 + Math.sin(t * Math.PI) * .027;
      rollPebble.rotation.z = rollBaseRotation - rollDirection * ease * .62 + rocking;
    }
  }
  function interact(x: number, y: number, time: number): WaterEdgeInteraction | null {
    if (time - rollStarted < 2.2) return null;
    camera.updateMatrixWorld(); scene.updateMatrixWorld(true);
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    if (!raycaster.intersectObject(rollPebble, false).length) return null;
    rollStarted = time; rollBaseX = rollPebble.position.x; rollBaseRotation = rollPebble.rotation.z;
    rollDirection = nextDirection; nextDirection *= -1;
    return { world: 'pebble-shore', kind: 'pebble-roll', strength: .24,
      position: { x: rollPebble.position.x, z: rollPebble.position.z } };
  }
  resize(1400, 900);
  update(0, 0);
  return { scene, camera, resize, update, interact, dispose: () => { environment.dispose(); } };
}

function seeded(seed: number) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
function bedHeight(x: number, z: number) { return .038 * (z + 1.7) + .018 * Math.sin(x * .67) + .009 * Math.sin(z * 1.3 + x * .2) - .09 * Math.exp(-Math.pow((x + .4) * .6, 2)) * Math.exp(-Math.pow((z - .2) * .35, 2)); }
function wornStoneGeometry(seed: number, width: number, height: number) {
  const g = new THREE.SphereGeometry(1, width, height);
  const p = g.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const r = 1 + Math.sin(x * 3.4 + seed) * Math.sin(z * 3.7 - seed * .61) * .13 + Math.sin(y * 4.7 + x * 2.9 + seed * .44) * .055;
    p.setXYZ(i, x * r + y * y * .045, y * r * (.94 + .06 * Math.cos(x * 3 + seed)), z * r + x * y * .047);
  }
  g.computeVertexNormals(); return g;
}
function cragGeometry(seed: number, width: number, height: number) {
  const g = new THREE.SphereGeometry(1, width, height);
  const p = g.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const ridges = Math.sin(x * 8 + seed) * Math.sin(z * 9 + seed * .5) * .12 + Math.sin(x * 19 + z * 12) * .035;
    const terrace = Math.sin(y * 27. + x * 2.4 + seed) * .034;
    const r = 1 + ridges + Math.sin(y * 9 + x * 5) * .11 + terrace;
    p.setXYZ(i, x * r, y < -.05 ? -.04 : Math.pow(Math.max(0, y), .73) * r, z * r);
  }
  g.computeVertexNormals(); return g;
}
const noiseGLSL = `
  float rh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
  float rn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(rh(i),rh(i+vec2(1,0)),f.x),mix(rh(i+vec2(0,1)),rh(i+vec2(1,1)),f.x),f.y);}
`;
