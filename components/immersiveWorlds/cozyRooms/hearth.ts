import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldBuild } from './contracts';
import { wood, stone, fabric, rough, rounded } from './materials';

// All geometry and texture pixels are original procedural work. No gallery source or assets.
export function createHearthWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#292c29');
  scene.fog = new THREE.FogExp2('#302c26', 0.018);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.06, 35);
  let seed = 0x5825;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const add = <T extends THREE.Object3D>(object: T, x = 0, y = 0, z = 0): T => {
    object.position.set(x, y, z); scene.add(object); return object;
  };
  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0) => {
    const m = add(new THREE.Mesh(geometry, material), x, y, z); m.castShadow = true; m.receiveShadow = true; return m;
  };
  const block = (w: number, h: number, d: number, r: number, material: THREE.Material, x: number, y: number, z: number) => {
    const m = rounded(w, h, d, r, material); m.castShadow = true; m.receiveShadow = true; return add(m, x, y, z);
  };
  const tube = (points: THREE.Vector3[], radius: number, material: THREE.Material) => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 24, radius, 6, false), material);
  // A non-periodic mineral map avoids sinusoidal bands across grazing-lit stone.
  const mineralCanvas = document.createElement('canvas'); mineralCanvas.width = mineralCanvas.height = 256;
  const mineralCtx = mineralCanvas.getContext('2d')!;
  const mineralPixels = mineralCtx.createImageData(256, 256);
  const noiseGrids = [8, 19, 51].map(size => ({ size, values: Array.from({ length: (size + 1) ** 2 }, () => random()) }));
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
    let value = 186;
    noiseGrids.forEach(({ size, values }, octave) => {
      const u = x / 256 * size, v = y / 256 * size, ix = Math.floor(u), iy = Math.floor(v);
      const fx = u - ix, fy = v - iy, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const a = values[iy * (size + 1) + ix], b = values[iy * (size + 1) + ix + 1], c = values[(iy + 1) * (size + 1) + ix], d = values[(iy + 1) * (size + 1) + ix + 1];
      value += ((a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy - 0.5) * [59, 29, 15][octave];
    });
    value += (random() - 0.5) * 12;
    const index = (y * 256 + x) * 4; mineralPixels.data[index] = value; mineralPixels.data[index + 1] = value; mineralPixels.data[index + 2] = value; mineralPixels.data[index + 3] = 255;
  }
  mineralCtx.putImageData(mineralPixels, 0, 0);
  const mineral = new THREE.CanvasTexture(mineralCanvas); mineral.colorSpace = THREE.SRGBColorSpace; mineral.wrapS = mineral.wrapT = THREE.RepeatWrapping; mineral.anisotropy = 4;
  const limestone = (color: string) => new THREE.MeshStandardMaterial({ color, map: mineral, bumpMap: mineral, bumpScale: 0.055, roughness: 0.96 });
  const plaster = new THREE.MeshStandardMaterial({ color: '#8b8374', bumpMap: mineral, bumpScale: 0.012, roughness: 1 });
  const soot = rough('#181817', 1);
  const iron = new THREE.MeshStandardMaterial({ color: '#292725', roughness: 0.71, metalness: 0.78 });
  const brass = new THREE.MeshStandardMaterial({ color: '#ab8150', roughness: 0.42, metalness: 0.78 });
  const oak = wood('#604631', 2);
  const darkOak = wood('#3a2c22', 2);
  const mossVelvet = fabric('#5b6659', 3);
  const cream = fabric('#bcb6a1', 4);
  const floorMaterials = ['#69503a', '#70573e', '#796044', '#674f38'].map(color => wood(color, 1.5));

  scene.add(new THREE.HemisphereLight('#beb9ac', '#655543', 1.18));
  const ambientBounce = new THREE.PointLight('#ffc17c', 14.5, 10, 2);
  add(ambientBounce, 0.2, 1.12, -1.65);
  // A soft overhead bounced key supplies contact shadows without giant point-source wall silhouettes.
  const shadowKey = add(new THREE.SpotLight('#ffe2b3', 18, 12, 0.9, 1, 2), -0.5, 3.4, 1.2);
  shadowKey.target.position.set(0, 0.45, -2.6); scene.add(shadowKey.target);
  shadowKey.castShadow = true; shadowKey.shadow.mapSize.set(1024, 1024);
  shadowKey.shadow.bias = -0.0005; shadowKey.shadow.normalBias = 0.02;
  shadowKey.shadow.camera.near = 0.2; shadowKey.shadow.camera.far = 12;
  shadowKey.shadow.radius = 3;
  const wallWash = add(new THREE.PointLight('#e6b988', 5.8, 7.4, 2), -2.8, 2.35, -0.9);
  const softCool = add(new THREE.DirectionalLight('#b9c2c2', 1.1), 3.0, 3.3, 3.8);
  softCool.target.position.set(0, 1, -2); scene.add(softCool.target);

  // A room at human scale: laid plank floor and quiet plaster around the chimney mass.
  block(8.7, 0.16, 10, 0.01, darkOak, 0, -0.1, 0);
  for (let row = 0; row < 26; row++) {
    const z = -4.5 + row * 0.35;
    for (let col = 0; col < 4; col++) {
      const x = -4.32 + col * 2.24 + (row % 2 ? 0.37 : 0);
      block(2.21, 0.035, 0.335, 0.008, floorMaterials[Math.floor(random() * 4)], x + 1.11, 0.006, z);
    }
  }
  block(8.5, 4.3, 0.2, 0.02, plaster, 0, 2.1, -4.1);
  block(0.18, 4.3, 9, 0.02, plaster, -4.12, 2.1, -0.3);
  block(0.18, 4.3, 9, 0.02, plaster, 4.12, 2.1, -0.3);
  block(8.5, 0.18, 0.14, 0.01, darkOak, 0, 0.11, -3.97);
  block(8.5, 0.24, 0.25, 0.018, darkOak, 0, 3.78, -3.95);
  block(8.5, 0.2, 8, 0.01, wood('#473c30', 3), 0, 4.08, 0);

  // Irregular, deliberately hand-sized limestone courses, with recessed mortar joints.
  const masonry = ['#a19b8c', '#838278', '#a39b8c', '#94948a', '#b1a28a', '#858b82'].map(c => limestone(c));
  block(4.65, 0.23, 1.76, 0.035, limestone('#8b8d82'), 0.04, 0.18, -2.94);
  block(4.5, 0.05, 1.65, 0.013, limestone('#aaa99a'), 0.04, 0.31, -2.95);
  block(4.14, 3.2, 0.19, 0.025, limestone('#777970'), 0, 1.99, -3.9);
  block(2.65, 1.9, 0.12, 0.005, soot, 0, 1.25, -3.73);
  block(2.7, 0.09, 1, 0.01, soot, 0, 0.37, -3.31);
  for (let row = 0; row < 6; row++) {
    for (const side of [-1, 1]) {
      const h = 0.27 + random() * 0.045;
      const width = 0.54 + random() * 0.14;
      const s = block(width, h, 0.68 + random() * 0.07, 0.012 + random() * 0.017, masonry[(row * 2 + (side + 1)) % masonry.length], side * (1.43 + width / 2), 0.48 + row * 0.31, -3.27 + (random() - 0.5) * 0.025);
      s.rotation.z = (random() - 0.5) * 0.017;
    }
  }
  // Stone arch: each voussoir is a genuine curved wedge with deep reveal.
  for (let i = 0; i < 13; i++) {
    const a0 = i / 13 * Math.PI + 0.012;
    const a1 = (i + 1) / 13 * Math.PI - 0.012;
    const shape = new THREE.Shape();
    const arch = (a: number, outer: boolean) => new THREE.Vector2(Math.cos(a) * (outer ? 1.98 : 1.43), 1.39 + Math.sin(a) * (outer ? 1.33 : 0.94));
    const p = arch(a0, false); shape.moveTo(p.x, p.y);
    for (let j = 0; j <= 6; j++) { const q = arch(a0 + (a1 - a0) * j / 6, true); shape.lineTo(q.x, q.y); }
    for (let j = 6; j >= 0; j--) { const q = arch(a0 + (a1 - a0) * j / 6, false); shape.lineTo(q.x, q.y); }
    shape.closePath();
    mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.7, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.018, bevelThickness: 0.018, curveSegments: 6 }), masonry[i % masonry.length], 0, 0, -3.7);
  }
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      const s = block(0.65, 0.26, 0.52, 0.025, masonry[(row + col * 2) % masonry.length], -1.7 + col * 0.68, 2.88 + row * 0.285, -3.36);
      s.rotation.z = (random() - 0.5) * 0.01;
    }
  }
  block(4.57, 0.23, 1.0, 0.045, wood('#584332', 3), 0, 2.76, -3.18);
  block(4.66, 0.065, 1.06, 0.025, wood('#746047', 3), 0, 2.885, -3.18);

  // Mantel objects have quiet asymmetry, muted glaze and real thickness.
  const potMat = new THREE.MeshStandardMaterial({ color: '#67776c', roughness: 0.32, metalness: 0.03 });
  const vasePoints = [new THREE.Vector2(0, 0), new THREE.Vector2(0.18, 0.01), new THREE.Vector2(0.22, 0.09), new THREE.Vector2(0.235, 0.3), new THREE.Vector2(0.17, 0.48), new THREE.Vector2(0.12, 0.56), new THREE.Vector2(0.095, 0.56), new THREE.Vector2(0.14, 0.46), new THREE.Vector2(0.19, 0.29), new THREE.Vector2(0.15, 0.055), new THREE.Vector2(0, 0.045)];
  mesh(new THREE.LatheGeometry(vasePoints, 36), potMat, -1.48, 2.93, -3.18);
  for (let k = 0; k < 5; k++) {
    const x = -1.5 + (random() - 0.5) * 0.2;
    const tip = new THREE.Vector3(x + (random() - 0.5) * 0.6, 3.68 + random() * 0.2, -3.1);
    tube([new THREE.Vector3(-1.48, 3.28, -3.18), new THREE.Vector3(x, 3.55, -3.17), tip], 0.008, rough('#78694a', 1));
    for (let j = 0; j < 4; j++) {
      const leaf = mesh(new THREE.SphereGeometry(1, 8, 6), rough('#898667', 0.96), tip.x + (j % 2 ? 0.042 : -0.042), tip.y - j * 0.045, tip.z);
      leaf.scale.set(0.058, 0.018, 0.025); leaf.rotation.z = j % 2 ? 0.6 : -0.6;
    }
  }
  const frame = block(0.55, 0.67, 0.052, 0.018, darkOak, 1.47, 3.26, -3.45); frame.rotation.y = -0.08;
  block(0.445, 0.56, 0.012, 0.001, rough('#aea38c', 1), 1.47, 3.26, -3.411);
  for (let i = 0; i < 4; i++) {
    const b = tube([new THREE.Vector3(1.38, 3.05, -3.397), new THREE.Vector3(1.38 + i * 0.03, 3.24, -3.397), new THREE.Vector3(1.33 + i * 0.075, 3.4, -3.397)], 0.0035, rough('#585e4d', 1)); b.castShadow = false;
  }

  // Refractory bricks read through the flame, while the inner vaulted roof remains soot dark.
  const firebrickMaterials = [limestone('#494137'), limestone('#373731')];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      block(0.32, 0.2, 0.04, 0.006, firebrickMaterials[row < 2 ? 0 : 1], -1.13 + col * 0.33, 0.56 + row * 0.215, -3.64);
    }
  }
  for (const x of [-1.32, 1.32]) block(0.1, 1.07, 0.8, 0.01, soot, x, 0.94, -3.32);
  const logCanvas = document.createElement('canvas'); logCanvas.width = 256; logCanvas.height = 512;
  const ctx = logCanvas.getContext('2d')!;
  ctx.fillStyle = '#25221c'; ctx.fillRect(0, 0, 256, 512);
  for (let i = 0; i < 760; i++) {
    const x = random() * 256; const y = random() * 512;
    const shade = Math.floor(27 + random() * 25);
    ctx.strokeStyle = `rgb(${shade + 6},${shade + 1},${shade - 5})`; ctx.lineWidth = 1 + random() * 5;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 7, y + 14, x - 4, y + 38, x + 3, y + 75); ctx.stroke();
  }
  for (let i = 0; i < 45; i++) {
    ctx.strokeStyle = i % 4 === 0 ? '#a85220' : '#0a0b0a'; ctx.lineWidth = 1.2;
    const x = random() * 256, y = random() * 512;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 4, y + 18); ctx.lineTo(x - 2, y + 45); ctx.stroke();
  }
  const barkTex = new THREE.CanvasTexture(logCanvas); barkTex.colorSpace = THREE.SRGBColorSpace; barkTex.wrapS = barkTex.wrapT = THREE.RepeatWrapping;
  const barkMat = new THREE.MeshStandardMaterial({ color: '#847760', map: barkTex, bumpMap: barkTex, bumpScale: 0.042, roughness: 1 });
  const logEndMat = wood('#28261f', 4);
  const logGroup = new THREE.Group(); scene.add(logGroup);
  const logs: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const length = 1.48 + random() * 0.35, radius = 0.13 + random() * 0.035;
    const logGeometry = new THREE.CylinderGeometry(radius * 0.82, radius, length, 17, 9);
    const logVertices = logGeometry.attributes.position;
    for (let j = 0; j < logVertices.count; j++) {
      const x = logVertices.getX(j), y = logVertices.getY(j), z = logVertices.getZ(j);
      const irregularity = 1 + Math.sin(y * 27 + Math.atan2(x, z) * 5) * 0.048 + Math.sin(y * 11) * 0.034;
      logVertices.setXYZ(j, x * irregularity, y, z * irregularity);
    }
    logGeometry.computeVertexNormals();
    const log = new THREE.Mesh(logGeometry, [barkMat, logEndMat, logEndMat]);
    log.rotation.z = Math.PI / 2 + (i % 2 ? 0.16 : -0.19); log.rotation.y = (i % 2 ? -0.37 : 0.3);
    log.position.set((i - 2) * 0.075, 0.56 + (i > 1 ? 0.17 : 0), -3.08 + (i % 3 - 1) * 0.19);
    log.castShadow = true; log.receiveShadow = true; log.userData.cozyAction = 'log'; logGroup.add(log); logs.push(log);
    for (const end of [-1, 1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.62, 0.008, 5, 17), rough('#44372b', 0.98));
      ring.rotation.x = Math.PI / 2; ring.position.y = end * (length / 2 + 0.001); log.add(ring);
    }
    for (let crack = 0; crack < 5; crack++) {
      const crackCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, -0.09, 0), new THREE.Vector3(0.012, -0.026, 0.004), new THREE.Vector3(-0.009, 0.015, 0), new THREE.Vector3(0.003, 0.074, 0.004)]);
      const glow = new THREE.Mesh(new THREE.TubeGeometry(crackCurve, 7, 0.004, 4, false), new THREE.MeshStandardMaterial({ color: '#311304', emissive: '#b7450d', emissiveIntensity: 0.6, roughness: 1 }));
      const a = crack / 5 * Math.PI * 2;
      glow.position.set(Math.sin(a) * radius * 0.96, (random() - 0.5) * 0.5, Math.cos(a) * radius * 0.96); glow.rotation.z = 0.03; log.add(glow);
    }
  }
  const coalMaterials = Array.from({ length: 4 }, (_, i) => new THREE.MeshStandardMaterial({ color: i ? '#211c13' : '#4a230e', emissive: i ? '#441306' : '#c84708', emissiveIntensity: i ? 0.12 : 0.5, roughness: 0.95 }));
  for (let i = 0; i < 67; i++) {
    const coalMat = coalMaterials[i % 4];
    const coal = mesh(new THREE.DodecahedronGeometry(0.025 + random() * 0.055, 0), coalMat, (random() - 0.5) * 1.9, 0.415 + random() * 0.04, -3.04 + (random() - 0.5) * 0.56);
    coal.scale.y = 0.45 + random() * 0.35; coal.rotation.set(random(), random(), random()); coal.castShadow = false; coal.receiveShadow = false;
  }
  // Low iron andirons ground the fuel. Log touch remains a small, slow ember response.
  for (const x of [-0.83, 0.83]) {
    mesh(new THREE.CylinderGeometry(0.025, 0.037, 0.41, 9), iron, x, 0.57, -2.64);
    mesh(new THREE.SphereGeometry(0.049, 12, 8), iron, x, 0.79, -2.64);
    const foot = block(0.18, 0.037, 0.64, 0.009, iron, x, 0.38, -2.87); foot.rotation.y = 0.08;
  }

  // Interleaved spatial flame bodies: irregular radii, slow rising noise and translucent edges.
  // These are lit-looking volumes, not a screen-space fire sprite or emissive cone placeholders.
  const fireMaterials: THREE.ShaderMaterial[] = [];
  for (let i = 0; i < 13; i++) {
    const height = i < 9 ? 0.52 + random() * 0.59 : 0.38 + random() * 0.29;
    const width = i < 9 ? 0.085 + random() * 0.084 : 0.065;
    const profile: THREE.Vector2[] = [];
    for (let j = 0; j <= 23; j++) {
      const t = j / 23;
      const r = width * Math.pow(Math.sin(t * Math.PI), 0.66) * (1.12 - t * 0.55) + 0.001;
      profile.push(new THREE.Vector2(r, t * height));
    }
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPhase: { value: i * 4.17 }, uHeight: { value: height }, uCore: { value: i >= 9 ? 1 : 0 }, uResponse: { value: 0 } },
      vertexShader: `varying vec3 vPosition; varying vec3 vNormal; varying vec3 vView; uniform float uTime; uniform float uPhase; uniform float uHeight;
        void main(){ vec3 p=position; float h=p.y/uHeight; float drift=sin(uTime*1.7+uPhase+h*5.0)*0.055+sin(uTime*2.9+uPhase*.4+h*9.0)*0.018;
          p.x+=drift*h; p.z+=cos(uTime*1.35+uPhase+h*7.0)*.043*h; p.xz*=1.0+sin(uTime*2.1+uPhase+h*16.0)*.22; p.y*=.94+sin(uTime*1.53+uPhase)*.06;
          vPosition=p; vNormal=normalize(normalMatrix*normal); vec4 view=modelViewMatrix*vec4(p,1.0); vView=normalize(-view.xyz); gl_Position=projectionMatrix*view; }`,
      fragmentShader: `varying vec3 vPosition; varying vec3 vNormal; varying vec3 vView; uniform float uTime; uniform float uPhase; uniform float uHeight; uniform float uCore; uniform float uResponse;
        float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);} float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
        void main(){float h=clamp(vPosition.y/uHeight,0.,1.); float n=noise(vPosition*vec3(17.,10.,17.)+vec3(uPhase,-uTime*1.8,0.)); float facing=abs(dot(normalize(vNormal),normalize(vView)));
          float a=pow(facing,.55)*smoothstep(0.,.12,h)*(1.-smoothstep(.73,1.,h)); a*=.38+n*.34; a*=1.-smoothstep(.32,.82,h)*(1.-n)*.45;
          vec3 low=vec3(1.0,.36,.035); vec3 high=vec3(.95,.025,.001); vec3 col=mix(low,high,smoothstep(.12,.85,h)); col=mix(col,vec3(1.,.63,.14),uCore*.7); col*=1.3+uResponse*.05;
          gl_FragColor=vec4(col,a*.88);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
    });
    fireMaterials.push(material);
    const flame = mesh(new THREE.LatheGeometry(profile, 21), material, (random() - 0.5) * 1.45, 0.56 + random() * 0.12, -3.03 + (random() - 0.5) * 0.44);
    flame.castShadow = false; flame.receiveShadow = false; flame.renderOrder = 2;
  }
  // Smoke is almost invisible indoors, rising into the throat, never covering the room.
  const smokeMaterial = new THREE.MeshBasicMaterial({ color: '#777366', transparent: true, opacity: 0.006, depthWrite: false });
  const smoke: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const m = mesh(new THREE.SphereGeometry(1, 12, 9), smokeMaterial, 0, 1.37 + i * 0.14, -3.25); m.scale.set(0.18 + i * 0.025, 0.20, 0.14); m.castShadow = false; smoke.push(m);
  }

  // Heavy woven rug and frayed edges keep the foreground tactile, grounded and non-plastic.
  const rug = block(3.8, 0.045, 3.35, 0.07, fabric('#8c7560', 5), -0.12, 0.055, -0.05);
  rug.rotation.y = -0.035;
  for (let i = 0; i < 44; i++) {
    const fringe = mesh(new THREE.CylinderGeometry(0.005, 0.007, 0.11 + random() * 0.07, 4), cream, -1.98 + i * 0.085, 0.04, 1.7 + random() * 0.025); fringe.rotation.x = Math.PI / 2; fringe.rotation.z = random() * 0.2;
  }
  const chairArms: THREE.Object3D[] = [];
  for (const side of [-1, 1]) {
    const arm = block(0.40, 0.52, 2.1, 0.17, mossVelvet, side * 1.04, 0.66, 2.01); arm.rotation.y = side * -0.035;
    const cap = block(0.32, 0.09, 1.98, 0.045, wood('#463a2b', 3), side * 1.04, 0.91, 2.0);
    chairArms.push(arm, cap); arm.userData.foreground = true; cap.userData.foreground = true;
    const seam = tube([new THREE.Vector3(side * 0.87, 0.81, 1.06), new THREE.Vector3(side * 0.86, 0.80, 1.75), new THREE.Vector3(side * 0.88, 0.79, 2.65)], 0.007, fabric('#3d4b40', 3)); seam.castShadow = false;
  }
  block(1.61, 0.30, 1.56, 0.10, mossVelvet, 0, 0.30, 2.40);
  const blanketGeometry = new THREE.PlaneGeometry(1.56, 1.78, 64, 64);
  const blanketPosition = blanketGeometry.attributes.position;
  for (let i = 0; i < blanketPosition.count; i++) {
    const x = blanketPosition.getX(i), z = blanketPosition.getY(i);
    const dome = 0.16 * Math.exp(-x * x * 3.2) + 0.11 * Math.exp(-Math.pow(x - 0.37, 2) * 18);
    blanketPosition.setXYZ(i, x, 0.56 + dome + Math.sin(x * 18 + z * 2.5) * 0.025 + Math.sin(z * 8 + x * 3) * 0.016, 1.12 + z);
  }
  blanketGeometry.computeVertexNormals();
  const blanketMat = fabric('#b0a08a', 8); blanketMat.side = THREE.DoubleSide;
  mesh(blanketGeometry, blanketMat, 0, 0.05, 1.0);
  // Hand stitched edge follows the actual rippled fabric surface.
  const edgePoints = Array.from({ length: 33 }, (_, i) => { const x = -0.77 + i / 32 * 1.54; return new THREE.Vector3(x, 0.61 + 0.16 * Math.exp(-x * x * 3.2) + 0.11 * Math.exp(-Math.pow(x - 0.37, 2) * 18) + Math.sin(x * 18 - 2.2) * 0.025 + Math.sin(-0.89 * 8 + x * 3) * 0.016, 1.231); });
  tube(edgePoints, 0.004, fabric('#8c7b65', 5));

  // Side table: the tiny rough stoneware cup carries a thick lip and visible dark tea surface.
  const tableObjectsStart = scene.children.length;
  const tableTop = mesh(new THREE.CylinderGeometry(0.54, 0.52, 0.09, 48), wood('#8b6543', 2), 1.86, 0.62, 0.50);
  tableTop.receiveShadow = true;
  for (const a of [0.2, 2.3, 4.4]) {
    const leg = mesh(new THREE.CylinderGeometry(0.028, 0.039, 0.57, 10), darkOak, 1.86 + Math.sin(a) * 0.34, 0.29, 0.5 + Math.cos(a) * 0.34); leg.rotation.z = -Math.sin(a) * 0.13; leg.rotation.x = Math.cos(a) * 0.13;
  }
  mesh(new THREE.CylinderGeometry(0.16, 0.168, 0.013, 32), stone('#6b5d48', 3), 1.78, 0.677, 0.37);
  const ceramic = new THREE.MeshStandardMaterial({ color: '#b5aa88', roughness: 0.32, metalness: 0.02 });
  const cupProfile = [new THREE.Vector2(0.075, 0), new THREE.Vector2(0.095, 0.018), new THREE.Vector2(0.103, 0.135), new THREE.Vector2(0.101, 0.16), new THREE.Vector2(0.088, 0.16), new THREE.Vector2(0.085, 0.032), new THREE.Vector2(0, 0.026)];
  mesh(new THREE.LatheGeometry(cupProfile, 36), ceramic, 1.78, 0.689, 0.37);
  const handle = mesh(new THREE.TorusGeometry(0.066, 0.014, 9, 24, Math.PI * 1.7), ceramic, 1.91, 0.773, 0.37); handle.rotation.z = -Math.PI * 0.85;
  mesh(new THREE.CylinderGeometry(0.087, 0.087, 0.002, 32), new THREE.MeshStandardMaterial({ color: '#44281a', roughness: 0.16, metalness: 0.02 }), 1.78, 0.824, 0.37);
  const book = block(0.32, 0.045, 0.40, 0.009, rough('#47594f', 0.87), 1.99, 0.693, 0.7); book.rotation.y = 0.23;
  const pages = block(0.301, 0.026, 0.376, 0.001, rough('#b5ad92', 0.95), 1.99, 0.695, 0.7); pages.rotation.y = 0.23;
  const tableGroup = new THREE.Group();
  scene.children.slice(tableObjectsStart).forEach(object => tableGroup.add(object));
  add(tableGroup, -0.35, 0, -0.45);

  // Basket of split dry wood: rods woven around the volume, distinct from the live fuel.
  const basket = new THREE.Group(); add(basket, 2.48, 0.08, -2.60);
  const wicker = wood('#70593b', 4);
  for (let i = 0; i < 10; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34 + i * 0.007, 0.012, 5, 36), wicker); ring.rotation.x = Math.PI / 2; ring.scale.y = 0.72; ring.position.y = 0.04 + i * 0.045; basket.add(ring);
  }
  for (let i = 0; i < 22; i++) {
    const a = i / 22 * Math.PI * 2; const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.46, 5), wicker); rod.position.set(Math.sin(a) * 0.38, 0.23, Math.cos(a) * 0.28); rod.rotation.z = -Math.sin(a) * 0.15; basket.add(rod);
  }
  const dryBark = wood('#4e3d2a', 2), dryEnd = wood('#a48454', 3);
  for (let i = 0; i < 7; i++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.067, 0.094, 0.72, 7), [dryBark, dryEnd, dryEnd]); log.position.set((random() - 0.5) * 0.4, 0.36, (random() - 0.5) * 0.23); log.rotation.z = Math.PI / 2 + random() * 0.4; log.rotation.y = random() * 0.6; log.castShadow = true; basket.add(log);
  }
  for (let i = 0; i < 3; i++) {
    const x = -2.44 + i * 0.14;
    mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.94, 7), iron, x, 0.61, -2.84);
    const loop = mesh(new THREE.TorusGeometry(0.036, 0.009, 6, 14), iron, x, 1.12, -2.84); loop.rotation.y = 0.15;
    if (i === 1) block(0.12, 0.17, 0.02, 0.015, iron, x, 0.19, -2.84);
    else tube([new THREE.Vector3(x, 0.17, -2.84), new THREE.Vector3(x + 0.05, 0.13, -2.82), new THREE.Vector3(x + 0.065, 0.20, -2.80)], 0.011, iron);
  }
  mesh(new THREE.CylinderGeometry(0.24, 0.27, 0.055, 24), iron, -2.30, 0.077, -2.88);
  // Small shaded sconce, away from the hero fire; no naked point-light sphere.
  block(0.14, 0.23, 0.035, 0.025, brass, -2.85, 2.16, -3.91);
  tube([new THREE.Vector3(-2.85, 2.13, -3.9), new THREE.Vector3(-2.85, 2.09, -3.64), new THREE.Vector3(-2.85, 2.25, -3.59)], 0.019, brass);
  const shadeMat = fabric('#cebb8e', 3); shadeMat.side = THREE.DoubleSide;
  mesh(new THREE.CylinderGeometry(0.17, 0.29, 0.31, 40, 1, true), shadeMat, -2.85, 2.42, -3.59);
  add(new THREE.PointLight('#ffcc8d', 2.1, 3.2, 2), -2.85, 2.3, -3.59);

  // Batch static repeated details by material. Keep fuel targets and moving smoke/flames intact.
  scene.updateMatrixWorld(true);
  const batches = new Map<string, THREE.Mesh[]>();
  scene.traverse(object => {
    if (!(object instanceof THREE.Mesh) || Array.isArray(object.material) || object.children.length || object.userData.foreground || object.material instanceof THREE.ShaderMaterial || object.material === smokeMaterial) return;
    let parent: THREE.Object3D | null = object;
    while (parent) { if (parent.userData.cozyAction) return; parent = parent.parent; }
    const key = `${object.material.uuid}:${object.castShadow}:${object.receiveShadow}`;
    const group = batches.get(key) ?? []; group.push(object); batches.set(key, group);
  });
  batches.forEach(objects => {
    if (objects.length < 3) return;
    const geometries = objects.map(object => {
      const copy = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
      copy.applyMatrix4(object.matrixWorld); return copy;
    });
    const geometry = mergeGeometries(geometries, false);
    geometries.forEach(g => g.dispose());
    if (!geometry) return;
    const combined = new THREE.Mesh(geometry, objects[0].material);
    combined.castShadow = objects[0].castShadow; combined.receiveShadow = objects[0].receiveShadow;
    objects.forEach(object => { object.removeFromParent(); object.geometry.dispose(); });
    scene.add(combined);
  });

  let response = 0;
  return {
    scene, camera,
    resize(aspect) {
      camera.aspect = aspect;
      if (aspect < 0.8) {
        camera.fov = 55;
        camera.position.set(0.08, 1.18, 2.20);
        camera.lookAt(0.02, 1.02, -2.95);
      } else if (aspect < 1.25) {
        camera.fov = 50;
        camera.position.set(0.10, 1.24, 2.60);
        camera.lookAt(0.05, 1.37, -2.95);
      } else {
        camera.fov = 50;
        camera.position.set(0.31, 1.23, 2.70);
        camera.lookAt(0.05, 1.36, -3.0);
      }
      chairArms.forEach((arm, i) => { arm.position.x = (i < 2 ? -1 : 1) * (aspect < 0.8 ? 0.65 : 1.04); arm.position.z = aspect < 0.8 ? 1.24 : 2.01; });
      camera.updateProjectionMatrix();
    },
    update(time, dt) {
      response = Math.max(0, response - dt * 0.28);
      const warmth = Math.sin(time * 1.73) * 0.11 + Math.sin(time * 2.89 + 2) * 0.07;
      ambientBounce.intensity = 14.5 + warmth + response * 0.32;
      wallWash.intensity = 5.8 + Math.sin(time * 0.91) * 0.035;
      fireMaterials.forEach(m => { m.uniforms.uTime.value = time; m.uniforms.uResponse.value = response; });
      coalMaterials.forEach((material, i) => { material.emissiveIntensity = (i ? 0.12 : 0.5) + Math.sin(time * 0.71 + i * 1.7) * (i ? 0.025 : 0.07) + response * (i ? 0.03 : 0.12); });
      smoke.forEach((m, i) => { m.position.x = Math.sin(time * 0.37 + i * 0.6) * 0.11; m.position.y = 1.52 + i * 0.13 + Math.sin(time * 0.3 + i) * 0.045; });
    },
    interact(action) {
      if (action !== 'log') return null;
      response = 1;
      return { type: 'ember', intensity: 0.2 };
    },
  };
}
