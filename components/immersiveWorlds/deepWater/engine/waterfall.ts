import * as THREE from 'three';
import { addRock, createPool, rockMaterial } from './environment';
import type { WorldContent } from './types';

/** Original geometry/materials. Metres, Y up; the observer rests above the pool's near lip. */
export function createWaterfall(renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#c5dce0');
  scene.fog = new THREE.FogExp2('#98b9ac', 0.012);
  const camera = new THREE.PerspectiveCamera(56, 1, 0.06, 130);
  camera.position.set(0, 2.15, 8.4);
  const target = new THREE.Vector3(0.75, 5.45, -21);
  camera.lookAt(target);
  const timeUniform = { value: 0 };
  const rnd = seeded(83111);
  const occluders: THREE.Object3D[] = [];
  const sky = new THREE.Mesh(new THREE.SphereGeometry(98, 28, 16), new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform }, side: THREE.BackSide, depthWrite: false,
    vertexShader: `varying vec3 vSky;void main(){vSky=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 vSky;uniform float uTime;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
      void main(){vec3 d=normalize(vSky);float elevation=max(0.,d.y);
        vec3 c=mix(vec3(.53,.67,.64),vec3(.20,.34,.43),pow(elevation,.6));
        vec2 q=d.xz/max(.12,d.y)*1.4+vec2(uTime*.0015,0.);float cloud=n(q)*.65+n(q*2.04)*.25+n(q*4.1)*.1;
        float veil=smoothstep(.53,.76,cloud)*smoothstep(.02,.2,elevation)*.65;
        gl_FragColor=vec4(mix(c,vec3(.85,.88,.79),veil),1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }));
  scene.add(sky);

  scene.add(new THREE.HemisphereLight('#e0efea', '#555245', 1.9));
  const sunlight = new THREE.DirectionalLight('#fff0ca', 3.0);
  sunlight.position.set(-18, 34, 13);
  sunlight.target.position.set(1, 6, -19);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048, 2048);
  sunlight.shadow.camera.left = -27;
  sunlight.shadow.camera.right = 27;
  sunlight.shadow.camera.top = 29;
  sunlight.shadow.camera.bottom = -22;
  sunlight.shadow.camera.near = 1;
  sunlight.shadow.camera.far = 90;
  sunlight.shadow.normalBias = 0.055;
  sunlight.shadow.bias = -0.00022;
  sunlight.shadow.radius = 3;
  scene.add(sunlight, sunlight.target);
  const bounce = new THREE.DirectionalLight('#a0d1ca', 0.4);
  bounce.position.set(5, 6, 8);
  scene.add(bounce);

  // The gorge is one continuous weathered face, not a row of detached boulders.
  const wallMaterial = rockMaterial('#90948c', 0.48);
  wallMaterial.vertexColors = true;
  wallMaterial.side = THREE.DoubleSide;
  const cliffPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-15, 0, 13), new THREE.Vector3(-14, 0, -4),
    new THREE.Vector3(-10.8, 0, -15.5), new THREE.Vector3(-6.3, 0, -25.2),
    new THREE.Vector3(0.5, 0, -27.0), new THREE.Vector3(7.4, 0, -22.4),
    new THREE.Vector3(12, 0, -13.8), new THREE.Vector3(15, 0, -1),
    new THREE.Vector3(18, 0, 12),
  ]);
  const cliffGeo = new THREE.BufferGeometry();
  const wallVertices: number[] = [], wallColors: number[] = [], wallIndices: number[] = [];
  const nc = 182, nr = 88;
  const stoneColor = new THREE.Color();
  for (let row = 0; row <= nr; row++) {
    for (let col = 0; col <= nc; col++) {
      const u = col / nc;
      const p = cliffPath.getPoint(u);
      const normal = new THREE.Vector3(-p.x, 0, -10 - p.z).normalize();
      const height = 21.7 + Math.sin(u * 15 + 1) * 2.4 + Math.sin(u * 41) * 1.0 + Math.sin(u * 77) * .4 - 4.15 * Math.exp(-Math.pow((u - .50) * 19, 2));
      const y = -2 + row / nr * (height + 2);
      const ledge = Math.pow(0.5 + 0.5 * Math.sin(y * 1.08 + u * 21 + noise2(u * 8, y * .12, 3) * 2.1), 9) * (.25 + .75 * Math.pow(Math.sin(u * 29), 2));
      const broad = noise2(u * 17, y * 0.18, 39) * 1.5 + noise2(u * 42, y * 0.32, 18) * 0.7 + Math.sin(u * 51 + Math.sin(y * .09) * .35) * .65;
      const fine = noise2(u * 100, y * 2.2, 86) * 0.22;
      const cuts = Math.pow(Math.max(0, Math.cos(u * 112 + Math.sin(y * 0.15) * .6)), 12) * .8;
      const projection = broad + fine + ledge * .75 - cuts;
      wallVertices.push(p.x + normal.x * projection, y, p.z + normal.z * projection);
      const wetChannel = Math.exp(-Math.pow((u - .50) * 17, 2));
      const damp = Math.max(0, 1 - y / 7) * .22 + wetChannel * .14;
      const green = Math.max(0, noise2(u * 23, y * 0.34, 8) - .18) * .58;
      const brightness = .92 - damp - cuts * .08 + ledge * .05;
      stoneColor.setRGB(brightness * (1 - green * 0.57), brightness * (1 - green * 0.03), brightness * (1 - green * 0.62));
      wallColors.push(stoneColor.r, stoneColor.g, stoneColor.b);
      if (row < nr && col < nc) {
        const a = row * (nc + 1) + col, b = a + nc + 1;
        wallIndices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
  }
  cliffGeo.setAttribute('position', new THREE.Float32BufferAttribute(wallVertices, 3));
  cliffGeo.setAttribute('color', new THREE.Float32BufferAttribute(wallColors, 3));
  cliffGeo.setIndex(wallIndices);
  cliffGeo.computeVertexNormals();
  const cliff = new THREE.Mesh(cliffGeo, wallMaterial);
  cliff.castShadow = cliff.receiveShadow = true;
  scene.add(cliff);
  occluders.push(cliff);

  const bankMaterial = rockMaterial('#6e7667', 0.63);
  bankMaterial.vertexColors = true;
  bankMaterial.side = THREE.DoubleSide;
  addBank(-1);
  addBank(1);
  // The cropped foreground shelf establishes the seated, human-scale viewpoint.
  const ledgeMat = rockMaterial('#6a7162', 0.8);
  occluders.push(addRock(scene, [-2.9, -.4, 4.9], [3.25, 1.05, 2.4], 177, ledgeMat));
  occluders.push(addRock(scene, [3.1, -.35, 5.8], [2.95, 1.05, 2.3], 232, ledgeMat));
  const dampStone = rockMaterial('#4b5b51', 0.86);

  const rockPositions: [number, number, number, number, number, number][] = [
    [-8, 0.1, -1, 2.2, 1.2, 2], [-6.8, -0.2, -9, 1.9, 0.9, 1.7],
    [7.4, 0, -6, 2.3, 1.1, 2.7], [6.5, -0.1, -14, 1.9, 0.9, 1.5],
    [-5.2, -0.2, -20.8, 1.9, 1.4, 1.2], [4.8, -0.45, -22.1, 2.1, 1.2, 1.8],

  ];
  rockPositions.forEach((p, i) => {
    const rock = addRock(scene, [p[0], p[1], p[2]], [p[3], p[4], p[5]], 300 + i, dampStone);
    rock.rotation.y = i * 0.83;
    rock.castShadow = rock.receiveShadow = true;
    occluders.push(rock);
  });

  const pool = createPool(renderer, scene, { width: 37, depth: 46, y: 0.025, color: '#1c7771', position: [0, 0.025, -8], distortion: 0.88 });
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(33, 44, 1, 1), new THREE.MeshStandardMaterial({ color: '#174b45', roughness: 1 }));
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.set(0, -1.8, -8);
  scene.add(bottom);

  // Long ribbons retain depth and a lit front edge, while the fragmented sheet lets rock show through.
  const waterfallMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform },
    vertexShader: `
      varying vec2 vUv; varying vec3 vWorld;
      uniform float uTime;
      void main(){
        vUv=uv; vec3 p=position;
        p.x += sin(p.y*1.6-uTime*1.8+p.x*4.0)*0.018;
        p.z += sin(p.y*2.4-uTime*3.3+p.x*3.0)*0.025;
        vWorld=(modelMatrix*vec4(p,1.)).xyz;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
      }`,
    fragmentShader: `
      varying vec2 vUv; varying vec3 vWorld; uniform float uTime;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
      void main(){
        float flow = n(vec2(vUv.x*24.,vUv.y*10.3+uTime*1.8));
        float fine = n(vec2(vUv.x*86.+sin(vUv.y*32.-uTime*6.)*.7,vUv.y*22.+uTime*4.7));
        float lanes = n(vec2(vUv.x*23.,vUv.y*1.8+uTime*.20));
        float edge = smoothstep(0.,.11,vUv.x)*smoothstep(0.,.11,1.-vUv.x);
        float broken = smoothstep(.12,.71,flow*.6+fine*.4);
        float base = smoothstep(0.,.035,vUv.y);
        float alpha = edge * base * (.035+pow(broken,1.35)*.83+lanes*.07);
        vec3 white = mix(vec3(.61,.78,.75),vec3(.94,.98,.9),.35+fine*.65);
        float distanceFade = clamp(length(cameraPosition-vWorld)*.006,0.,.3);
        white=mix(white,vec3(.6,.75,.7),distanceFade);
        gl_FragColor=vec4(white,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
  });
  makeFall(.72, 20.45, 2.48, -25.65, 0);
  makeFall(-.95, 20.2, .46, -25.73, 1.7);
  makeFall(2.12, 20.4, .43, -25.6, 3.4);
  // A smaller side seep follows a separate ledge on the left wall.
  makeFall(-7.0, 7.0, 0.25, -20.0, 5.5);

  const foamMat = new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `
      varying vec2 vUv; uniform float uTime;
      float hash(vec2 p){return fract(sin(dot(p,vec2(41.33,77.71)))*43758.5);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
      void main(){vec2 p=vUv*2.-1.;float r=length(p);float a=atan(p.y,p.x);
        float cloud=n(p*17.+vec2(uTime*.07,-uTime*.13))*.55+n(p*35.+uTime*.05)*.45;
        float reach = 1.-smoothstep(.12,.97,r+sin(a*11.+r*8.)*.045);
        float alpha=reach*smoothstep(.31,.77,cloud)*.40;
        gl_FragColor=vec4(.77,.91,.85,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
  });
  const foam = new THREE.Mesh(new THREE.PlaneGeometry(9, 6.6), foamMat);
  foam.rotation.x = -Math.PI / 2;
  foam.position.set(0.9, 0.059, -23.6);
  scene.add(foam);

  const sprayCount = 380;
  const sprayGeo = new THREE.BufferGeometry();
  const spraySeed = new Float32Array(sprayCount * 3), spraySize = new Float32Array(sprayCount);
  for (let i = 0; i < sprayCount; i++) {
    spraySeed[i * 3] = rnd(); spraySeed[i * 3 + 1] = rnd(); spraySeed[i * 3 + 2] = rnd();
    spraySize[i] = 0.6 + rnd() * 1.4;
  }
  sprayGeo.setAttribute('position', new THREE.BufferAttribute(spraySeed, 3));
  sprayGeo.setAttribute('aSize', new THREE.BufferAttribute(spraySize, 1));
  const sprayMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform, uScale: { value: 640 } },
    vertexShader: `uniform float uTime; uniform float uScale; attribute float aSize; varying float vLife;
      void main(){
        float life=fract(position.y+uTime*.16);float angle=position.x*6.2831853;
        float radius=(.6+position.z*2.4)*sqrt(life);
        vec3 p=vec3(.85+cos(angle)*radius,.12+sin(life*3.14159)*(1.+position.z*2.8),-24.0+sin(angle)*radius*.65+life*.3);
        vec4 mv=modelViewMatrix*vec4(p,1.);vLife=sin(life*3.14159);
        gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale*.13/-mv.z,1.,12.);
      }`,
    fragmentShader: `varying float vLife;void main(){float r=length(gl_PointCoord-.5)*2.;float a=pow(max(0.,1.-r),2.)*vLife*.25;gl_FragColor=vec4(.82,.96,.9,a);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
    transparent: true, depthWrite: false,
  });
  const spray = new THREE.Points(sprayGeo, sprayMaterial);
  spray.frustumCulled = false;
  scene.add(spray);

  // Low layered spray hangs at the foot of the fall; it never blankets the whole scene.
  const mistMaterials: THREE.ShaderMaterial[] = [];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform, uSeed: { value: i * 4.21 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform float uTime,uSeed;void main(){vec2 p=vUv*2.-1.;float a=exp(-dot(p*vec2(1.3,1.7),p*vec2(1.3,1.7))*3.);
        float w=.7+.3*sin(p.x*6.+p.y*4.+uTime*.17+uSeed);gl_FragColor=vec4(.78,.9,.84,a*w*.095);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    const mist = new THREE.Mesh(new THREE.PlaneGeometry(8 + i * 1.5, 3.5), mat);
    mist.position.set(0.8 - i * 0.45, 1.3, -23.6 + i * 0.7);
    mist.rotation.y = i * 0.13;
    scene.add(mist); mistMaterials.push(mat);
  }

  const foliage = makeFoliage();
  scene.add(foliage);

  function addBank(side: number) {
    const nx = 35, nz = 67;
    const pos: number[] = [], col: number[] = [], idx: number[] = [];
    for (let j = 0; j <= nz; j++) {
      const z = 15 - j / nz * 42;
      const edge = (4.6 + 0.9 * Math.sin(z * 0.24 + side) + 1.2 * Math.sin(z * 0.1)) * side;
      for (let i = 0; i <= nx; i++) {
        const v = i / nx;
        const x = edge + v * side * 11;
        const n = noise2(x * 0.67, z * 0.67, 16);
        const shelf = Math.pow(Math.max(0, Math.sin(x * 3 + z * 0.4)), 7) * 0.13;
        const y = -0.45 + v * 3.2 + n * (0.10 + v * 0.30) + shelf;
        pos.push(x, y, z);
        const moss = Math.max(0, noise2(x * 0.5, z * 0.8, 9));
        col.push(.65 - moss * .16, .7 - moss * .04, .56 - moss * .2);
        if (j < nz && i < nx) {
          const a = j * (nx + 1) + i, b = a + nx + 1;
          idx.push(a, b, a + 1, a + 1, b, b + 1);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, bankMaterial); mesh.castShadow = mesh.receiveShadow = true;
    scene.add(mesh); occluders.push(mesh);
  }

  function makeFall(x: number, height: number, width: number, z: number, seed: number) {
    const positions: number[] = [], uvs: number[] = [], indices: number[] = [];
    const rows = Math.max(32, Math.round(height * 7)), columns = 34;
    for (let y = 0; y <= rows; y++) {
      const v = y / rows;
      const spread = width * (.86 + (1 - v) * .6 + Math.sin(v * 8.4 + seed) * .065 + Math.sin(v * 29 + seed) * .025);
      const center = x + Math.sin((1 - v) * 4.1 + seed) * .18 * (1 - v);
      for (let c = 0; c <= columns; c++) {
        const u = c / columns;
        positions.push(center + (u - .5) * spread + Math.sin(v * 43 + u * 19 + seed) * .025,
          .16 + v * height, z + Math.sqrt(1 - v) * 1.55 + Math.sin(u * 19 + seed) * .035);
        uvs.push(u, v);
        if (y < rows && c < columns) {
          const a = y * (columns + 1) + c, b = a + columns + 1;
          indices.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, waterfallMaterial); mesh.renderOrder = 2;
    scene.add(mesh);
  }

  function makeFoliage() {
    const positions: number[] = [], colors: number[] = [], bends: number[] = [], indices: number[] = [];
    const stemPositions: number[] = [];
    const localRandom = seeded(324912);
    const leafColor = new THREE.Color();
    const up = new THREE.Vector3(0, 1, 0);
    function leaf(base: THREE.Vector3, direction: THREE.Vector3, length: number, width: number, hue: number, bend = 1) {
      const d = direction.clone().normalize();
      const side = new THREE.Vector3().crossVectors(d, up).normalize();
      if (side.lengthSq() < .1) side.set(1, 0, 0);
      const normal = new THREE.Vector3().crossVectors(side, d).normalize();
      const verts: THREE.Vector3[][] = [];
      const steps = Math.abs(base.z) < 8 && Math.abs(base.x) < 6 ? 6 : 3;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const center = base.clone().addScaledVector(d, t * length).addScaledVector(normal, Math.sin(t * Math.PI) * length * .12);
        const half = Math.sin(Math.PI * Math.pow(t, .8)) * width;
        verts.push([center.clone().addScaledVector(side, -half).addScaledVector(normal, -half * .18), center.clone().addScaledVector(normal, half * .08), center.clone().addScaledVector(side, half).addScaledVector(normal, -half * .18)]);
      }
      leafColor.setHSL(.235 + hue * .07, .35 + hue * .20, .18 + hue * .11);
      function push(v: THREE.Vector3, value: number) {
        positions.push(v.x, v.y, v.z); colors.push(leafColor.r * value, leafColor.g * value, leafColor.b * value); bends.push(bend);
      }
      const start = positions.length / 3;
      for (const row of verts) { push(row[0], .88); push(row[1], 1.08); push(row[2], 1.12); }
      for (let s = 0; s < steps; s++) {
        for (let sideIdx = 0; sideIdx < 2; sideIdx++) {
          const a = start + s * 3 + sideIdx, b = a + 3;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    function fern(x: number, y: number, z: number, size: number, seed: number) {
      const r = seeded(seed); const base = new THREE.Vector3(x, y, z);
      const fronds = 7 + Math.floor(r() * 4);
      for (let f = 0; f < fronds; f++) {
        const angle = f / fronds * Math.PI * 2 + r() * .28;
        const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
        const across = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
        const length = size * (.75 + r() * .47);
        let previous = base.clone();
        for (let n = 1; n <= 15; n++) {
          const t = n / 15;
          const point = base.clone().addScaledVector(radial, length * t * .80);
          point.y += length * (Math.sin(t * 2.4) * .56 + t * .10);
          stemPositions.push(previous.x, previous.y, previous.z, point.x, point.y, point.z);
          previous = point;
          if (n > 1) {
            const bladeLength = length * (.27 * Math.sin(t * Math.PI) + .015);
            for (const sign of [-1, 1]) {
              const dir = across.clone().multiplyScalar(sign).addScaledVector(radial, .48 + t * .30);
              dir.y = .14 - t * .32;
              leaf(point, dir, bladeLength, bladeLength * .135, .2 + r() * .7, t);
            }
          }
        }
      }
    }
    // The two closest ferns have readable stems and paired leaflets, well away from the centre of attention.
    fern(-2.8, .54, 3.8, 1.65, 400);
    fern(2.0, .58, 4.0, 1.4, 401);
    fern(-4.5, .25, 1.6, 1.16, 404);
    fern(4.3, .17, -.3, 1.38, 405);
    fern(-3.25, .38, 6.2, 1.1, 408);
    for (let i = 0; i < 42; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = 7 - localRandom() * 31;
      const edge = 4.6 + .9 * Math.sin(z * .24 + side) + 1.2 * Math.sin(z * .1);
      fern(side * (edge + .55 + localRandom() * 2.5), .1 + localRandom() * .45, z, .60 + localRandom() * .8, 430 + i);
    }
    // Narrow creeping vines occupy sheltered fissures rather than a uniform curtain.
    for (let i = 0; i < 23; i++) {
      const u = .10 + localRandom() * .8;
      const p = cliffPath.getPoint(u);
      const inward = new THREE.Vector3(-p.x, 0, -10 - p.z).normalize();
      p.addScaledVector(inward, 1.05);
      p.y = 10 + localRandom() * 12;
      const total = 1.4 + localRandom() * 4.7;
      let previous = p.clone();
      for (let n = 1; n <= 20; n++) {
        const current = p.clone().add(new THREE.Vector3(Math.sin(n * .38 + i) * .17, -n / 20 * total, Math.cos(n * .24 + i) * .11));
        stemPositions.push(previous.x, previous.y, previous.z, current.x, current.y, current.z);
        previous = current;
        const d = inward.clone().multiplyScalar(.35).add(new THREE.Vector3(n % 2 ? -.9 : .9, -.1, .1));
        leaf(current, d, .18 + localRandom() * .22, .060, .25 + localRandom() * .55, .3);
      }
    }
    // Small trees break the cliff skyline; individual leaves, rather than spherical crowns.
    for (const [u, scale] of [[.14, 2.8], [.25, 2.2], [.36, 2.0], [.65, 2.6], [.76, 3.2], [.87, 2.6]]) {
      const trunk = cliffPath.getPoint(u);
      trunk.y = 21.5 + Math.sin(u * 15 + 1) * 2.4 + Math.sin(u * 41) * 1.0 + Math.sin(u * 77) * .4;
      const inward = new THREE.Vector3(-trunk.x, 0, -10 - trunk.z).normalize();
      trunk.addScaledVector(inward, .35);
      const wood = new THREE.Mesh(new THREE.CylinderGeometry(.028 * scale, .05 * scale, scale, 7), new THREE.MeshStandardMaterial({ color: '#534e37', roughness: .97 }));
      wood.position.copy(trunk).add(new THREE.Vector3(0, scale * .5, 0));
      wood.rotation.z = localRandom() * .18 - .09;
      scene.add(wood);
      for (let cluster = 0; cluster < 8; cluster++) {
        const angle = cluster * 2.39;
        const height = scale * (.60 + localRandom() * .55);
        const tip = trunk.clone().add(new THREE.Vector3(Math.sin(angle) * scale * .63, height, Math.cos(angle) * scale * .51));
        const attach = trunk.clone().add(new THREE.Vector3(0, height * .56, 0));
        stemPositions.push(attach.x, attach.y, attach.z, tip.x, tip.y, tip.z);
        for (let n = 0; n < 78; n++) {
          const pos = tip.clone().add(new THREE.Vector3((localRandom() - .5) * scale, (localRandom() - .5) * scale * .48, (localRandom() - .5) * scale));
          const dir = new THREE.Vector3(localRandom() - .5, .25 + localRandom() * .5, localRandom() - .5);
          leaf(pos, dir, .16 + localRandom() * .15, .05 + localRandom() * .045, localRandom(), .3);
        }
      }
    }
    const group = new THREE.Group();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('aBend', new THREE.Float32BufferAttribute(bends, 1));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ color: '#b9cf9f', vertexColors: true, side: THREE.DoubleSide, roughness: .72, metalness: 0, emissive: '#172a10', emissiveIntensity: .16 });
    mat.onBeforeCompile = shader => {
      shader.uniforms.uForestTime = timeUniform;
      shader.vertexShader = 'uniform float uForestTime; attribute float aBend;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nfloat sway=sin(uForestTime*.38+position.z*.15)+sin(uForestTime*.63+position.x*.19)*.3; transformed.x += sway*.030*aBend; transformed.z += cos(uForestTime*.31+position.x*.13)*.018*aBend;');
    };
    mat.customProgramCacheKey = () => 'waterfall-ferns-v1';
    const leaves = new THREE.Mesh(geo, mat); leaves.castShadow = leaves.receiveShadow = true;
    group.add(leaves);
    const stemGeo = new THREE.BufferGeometry();
    stemGeo.setAttribute('position', new THREE.Float32BufferAttribute(stemPositions, 3));
    group.add(new THREE.LineSegments(stemGeo, new THREE.LineBasicMaterial({ color: '#607143', transparent: true, opacity: .78 })));
    return group;
  }

  let lastTap = -100;
  return {
    scene, camera, target,
    update(time) { timeUniform.value = time; pool.update(time); },
    interact(ray, time) {
      if (time - lastTap < .55) return null;
      const hit = ray.intersectObject(pool.mesh, false)[0];
      if (!hit || hit.distance > 23 || Math.abs(hit.point.x) > 5.7 || hit.point.z < -18 || hit.point.z > 7.5) return null;
      const obstruction = ray.intersectObjects(occluders, false)[0];
      if (obstruction && obstruction.distance < hit.distance - .03) return null;
      lastTap = time;
      pool.ripple(hit.point.x, hit.point.z, time);
      return { world: 'waterfall', kind: 'pool-ripple', strength: .22, pan: THREE.MathUtils.clamp(hit.point.x / 8, -.55, .55) };
    },
    resize(aspect) {
      const portrait = aspect < .82;
      camera.position.set(portrait ? .40 : 0, portrait ? 2.05 : 2.15, portrait ? 8.8 : 8.4);
      target.set(portrait ? .70 : .75, portrait ? 5.3 : 5.45, -21);
      camera.fov = portrait ? 62 : aspect > 2 ? 52 : 56;
      camera.aspect = aspect; camera.updateProjectionMatrix(); camera.lookAt(target);
      sprayMaterial.uniforms.uScale.value = Math.min(renderer.domElement.height || 720, 1600);
    },
    dispose() { pool.dispose(); },
  };
}

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
function noise2(x: number, y: number, seed: number) {
  const hash = (a: number, b: number) => {
    const n = Math.sin(a * 127.1 + b * 311.7 + seed * 53.17) * 43758.5453;
    return n - Math.floor(n);
  };
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  return (THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), sx), THREE.MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), sx), sy) - .5) * 2;
}
