import * as THREE from 'three';
import type { WorldBuild } from './contracts';
import { wood, fabric, rough, rounded } from './materials';

/** Original procedural bedroom. No borrowed artwork, external models or audio. */
export function createSleepRoomWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#101c32');
  scene.fog = new THREE.FogExp2('#111e31', 0.017);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.06, 80);
  const walnut = wood('#846147', 3);
  const darkWood = wood('#594332', 3);
  const linen = fabric('#bac1bd', 12);
  linen.bumpScale = 0.0018;
  const sheet = fabric('#d8ddd5', 12);
  sheet.bumpScale = 0.0015;
  const curtainMaterial = fabric('#c5c7bf', 9);
  curtainMaterial.bumpScale = 0.0014;
  curtainMaterial.side = THREE.DoubleSide;
  const plaster = rough('#63717a', 0.98);
  const ceiling = rough('#646e70', 0.97);
  const brass = new THREE.MeshStandardMaterial({ color: '#ae8852', roughness: 0.42, metalness: 0.74 });
  const cream = rough('#c7b798', 0.79);
  const teal = rough('#607975', 0.87);
  let destination: THREE.Object3D = scene;
  const add = <T extends THREE.Object3D>(object: T, x = 0, y = 0, z = 0): T => {
    object.position.set(x, y, z); destination.add(object); return object;
  };
  const box = (w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, bevel = 0): THREE.Mesh => {
    const mesh = bevel ? rounded(w, h, d, bevel, material) : new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.castShadow = true; mesh.receiveShadow = true; return add(mesh, x, y, z);
  };
  const tube = (points: THREE.Vector3[], radius: number, mat: THREE.Material, segments = 32): THREE.Mesh => {
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 6, false), mat);
    mesh.castShadow = true; return add(mesh);
  };

  // Localized bedside warmth against moonlit linen. The lamp is intentionally steady.
  add(new THREE.HemisphereLight('#b0c7e1', '#55534d', 1.5));
  const moonlight = add(new THREE.DirectionalLight('#c1d7ff', 1.5), -3.5, 5.8, -9);
  moonlight.target.position.set(0.8, 0.3, 2.8); scene.add(moonlight.target);
  moonlight.castShadow = true;
  moonlight.shadow.mapSize.set(1024, 1024);
  moonlight.shadow.camera.left = -4; moonlight.shadow.camera.right = 4;
  moonlight.shadow.camera.top = 4; moonlight.shadow.camera.bottom = -3;
  moonlight.shadow.camera.near = 0.4; moonlight.shadow.camera.far = 22;
  moonlight.shadow.bias = -0.00035; moonlight.shadow.normalBias = 0.015;
  const lampLight = add(new THREE.PointLight('#ffd59c', 16, 7.5, 2), 1.63, 1.68, -0.96);
  lampLight.castShadow = true; lampLight.shadow.mapSize.set(512, 512);
  lampLight.shadow.bias = -0.0007; lampLight.shadow.normalBias = 0.01;
  add(new THREE.PointLight('#ddb289', 1.0, 4.2, 2), -1.4, 0.55, 1.4);

  // Actual room shell and individual boards, with a true opening beyond the glass.
  box(7, 0.16, 10, darkWood, 0, -0.15, 0);
  for (let i = 0; i < 18; i++) {
    const plank = box(0.374, 0.075, 10, i % 4 === 0 ? walnut : darkWood, -3.21 + i * 0.38, -0.032, 0);
    plank.receiveShadow = true;
  }
  box(2.1, 4.8, 0.22, plaster, -2.55, 2.3, -4.12);
  box(1.7, 4.8, 0.22, plaster, 2.75, 2.3, -4.12);
  box(3.3, 0.82, 0.22, plaster, 0.2, 0.36, -4.12);
  box(3.3, 0.94, 0.22, plaster, 0.2, 4.23, -4.12);
  box(0.22, 4.8, 10, plaster, -3.6, 2.3, 0);
  box(0.22, 4.8, 10, plaster, 3.6, 2.3, 0);
  box(7.4, 0.15, 10, ceiling, 0, 4.68, 0);
  box(7.0, 0.17, 0.08, darkWood, 0, 0.08, -3.97);
  box(0.08, 0.17, 9, darkWood, -3.47, 0.08, 0.5);

  const windowFrame = wood('#807465', 2);
  box(0.11, 3.07, 0.22, windowFrame, -1.41, 2.28, -3.98);
  box(0.11, 3.07, 0.22, windowFrame, 1.81, 2.28, -3.98);
  box(3.3, 0.11, 0.22, windowFrame, 0.2, 3.78, -3.98);
  box(3.3, 0.12, 0.42, walnut, 0.2, 0.79, -3.9, 0.015);
  box(0.065, 2.91, 0.15, windowFrame, 0.27, 2.29, -4.0);
  box(3.17, 0.065, 0.12, windowFrame, 0.2, 1.49, -4.0);
  const glass = new THREE.MeshPhysicalMaterial({ color: '#b8d4e7', roughness: 0.12, metalness: 0.05, transparent: true, opacity: 0.075, depthWrite: false, side: THREE.DoubleSide });
  box(3.14, 2.9, 0.018, glass, 0.2, 2.29, -4.035);
  // Tiny brass sash catch reads as worked hardware at the curtain opening.
  box(0.1, 0.025, 0.06, brass, 0.25, 1.53, -3.88, 0.009);

  // Quiet night garden occupies real depth behind the opening, not a flat backdrop.
  const hillMaterial = new THREE.MeshStandardMaterial({ color: '#21364c', roughness: 1 });
  const hill = new THREE.PlaneGeometry(52, 10, 64, 1);
  const hp = hill.attributes.position;
  for (let i = 0; i < hp.count; i++) {
    const x = hp.getX(i); const top = hp.getY(i) > 0;
    hp.setY(i, top ? 0.6 + 0.45 * Math.sin(x * 0.31) + 0.25 * Math.sin(x * 0.72) : -7);
  }
  hill.computeVertexNormals(); add(new THREE.Mesh(hill, hillMaterial), 0, 0.7, -29);
  const nightBark = rough('#273136', 1);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#284446', roughness: 0.96, side: THREE.DoubleSide });
  const leafGeo = new THREE.BufferGeometry();
  const leafPositions: number[] = [], leafIndices: number[] = [];
  for (let row=0; row<=10; row++) {
    const t=row/10, half=Math.sin(t*Math.PI)*0.048;
    leafPositions.push(-half,t*0.18,Math.sin(t*Math.PI)*0.008, 0,t*0.18,Math.sin(t*Math.PI)*0.022, half,t*0.18,Math.sin(t*Math.PI)*0.008);
    if(row<10) for(let col=0;col<2;col++){const n=row*3+col;leafIndices.push(n,n+3,n+1,n+1,n+3,n+4);}
  }
  leafGeo.setAttribute('position',new THREE.Float32BufferAttribute(leafPositions,3));
  leafGeo.setIndex(leafIndices); leafGeo.computeVertexNormals();
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, 1300);
  const tmp = new THREE.Object3D(); let leafIndex = 0;
  const rand = (i: number) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
  for (let t = 0; t < 5; t++) {
    const tx = [-4.9, 3.6, -4.8, 5.5, -7.8][t];
    const tz = [-10, -11, -19, -21, -23][t];
    const h = [5.5, 4.8, 5.6, 7, 6.1][t];
    tube([new THREE.Vector3(tx, -1, tz), new THREE.Vector3(tx + 0.11, h * 0.3, tz + 0.08), new THREE.Vector3(tx - 0.19, h * 0.68, tz - 0.08)], 0.075, nightBark, 12);
    for (let b = 0; b < 5; b++) {
      const sign = b % 2 ? 1 : -1;
      const by = 1.02 + b * 0.57 + rand(b+t*11)*0.24;
      const endpoint = new THREE.Vector3(tx + sign * (1.1 + rand(b + t * 22) * 0.7), by + 0.48 + rand(b+t*29)*0.98, tz - 0.4 + rand(b * 3 + t));
      tube([new THREE.Vector3(tx, by, tz), new THREE.Vector3(tx + sign * 0.64, by + 0.4, tz + 0.05), endpoint], 0.025, nightBark, 12);
      for(let twig=0;twig<5;twig++) {
        const u=0.25+twig*0.15;
        const start=new THREE.Vector3(tx,by,tz).lerp(endpoint,u);
        const tip=start.clone().add(new THREE.Vector3(sign*(0.28+rand(twig+t*17)*0.26),0.4+rand(twig+43)*0.4,(rand(twig+t*4)-0.5)*0.5));
        tube([start,start.clone().lerp(tip,0.5).add(new THREE.Vector3(0,-0.03,0)),tip],0.009,nightBark,7);
        for(let j=0;j<10 && leafIndex<1300;j++) {
          const q=leafIndex*7;const p=start.clone().lerp(tip,0.22+j*0.082);
          tmp.position.copy(p);tmp.position.x+=(j%2?1:-1)*0.025;
          tmp.rotation.set((rand(q+4)-0.5)*1.6,(rand(q+5)-0.5)*2.2,(j%2?1:-1)*(0.65+rand(q+6)*0.65));
          tmp.scale.setScalar(0.8+rand(q+7)*0.8);tmp.updateMatrix();leaves.setMatrixAt(leafIndex++,tmp.matrix);
        }
      }
    }
  }
  leaves.count = leafIndex; leaves.instanceMatrix.needsUpdate = true; add(leaves);
  const moon = add(new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 24), new THREE.MeshBasicMaterial({ color: '#edf1dc', fog: false })), -0.9, 4.22, -19.6);
  // The dark limb leaves an unchanging soft crescent, with no blinking or visual pulse.
  add(new THREE.Mesh(new THREE.SphereGeometry(0.264, 32, 24), new THREE.MeshBasicMaterial({ color: '#101c32', fog: false })), -0.8, 4.26, -19.39);
  moon.userData.label = 'distant crescent moon';
  const haloCanvas=document.createElement('canvas');haloCanvas.width=haloCanvas.height=128;
  const haloContext=haloCanvas.getContext('2d')!;const haloGradient=haloContext.createRadialGradient(64,64,1,64,64,64);
  haloGradient.addColorStop(0,'rgba(182,210,229,0.13)');haloGradient.addColorStop(0.26,'rgba(150,181,212,0.065)');haloGradient.addColorStop(1,'rgba(100,145,188,0)');
  haloContext.fillStyle=haloGradient;haloContext.fillRect(0,0,128,128);
  const moonHalo=add(new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(haloCanvas),transparent:true,depthWrite:false,fog:false})), -0.9,4.22,-19.5);
  moonHalo.scale.set(1.8,1.8,1);
  const stars = new THREE.BufferGeometry(); const starPos: number[] = [];
  for (let i = 0; i < 34; i++) starPos.push((rand(i + 80) - 0.5) * 30, 3.5 + rand(i + 180) * 9, -28 - rand(i + 250) * 8);
  stars.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
  add(new THREE.Points(stars, new THREE.PointsMaterial({ color: '#b7cce0', size: 0.022, transparent: true, opacity: 0.55, depthWrite: false })));

  // Two unequal, deeply pleated linen panels. Their silhouette and hems are geometry.
  const rod = add(new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 4.0, 12), brass), 0.18, 4.01, -3.62);
  rod.rotation.z = Math.PI / 2;
  const curtainState: { mesh: THREE.Mesh; base: Float32Array; side: number }[] = [];
  for (const side of [-1, 1]) {
    const width = side < 0 ? 1.18 : 0.99;
    const geo = new THREE.PlaneGeometry(width, 3.34, 48, 44);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i); const down = (1.67 - y) / 3.34;
      pos.setXYZ(i, x + side * Math.sin(down * Math.PI) * 0.055, y + (Math.cos(x * 12.5) - 1) * 0.025 * down, Math.sin(x * 22.5 + Math.sin(x * 5.6) * 0.65 + down * 0.12) * (0.045 + down * 0.042) + Math.sin(x * 9.3 + 0.5) * down * 0.027);
    }
    geo.computeVertexNormals();
    const mesh = add(new THREE.Mesh(geo, curtainMaterial), side < 0 ? -1.09 : 1.54, 2.23, -3.57);
    mesh.castShadow = false; mesh.receiveShadow = true; mesh.userData.cozyAction = 'curtain';
    curtainState.push({ mesh, base: new Float32Array(pos.array), side });
    for (let j = 0; j < 9; j++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.006, 6, 12), brass);
      ring.rotation.y = Math.PI / 2; add(ring, mesh.position.x - width * 0.45 + j * width * 0.1125, 3.98, -3.62);
    }
  }

  // Grounded walnut bed, tailored linen mattress and a draped, stitched duvet.
  box(2.48, 0.25, 4.85, darkWood, -0.12, 0.35, 1.82, 0.07);
  box(2.32, 0.25, 4.68, sheet, -0.12, 0.57, 1.86, 0.095);
  for (const x of [-1.15, 0.91]) for (const z of [-0.05, 3.6]) box(0.13, 0.35, 0.13, darkWood, x, 0.12, z, 0.025);
  const duvetGeometry = new THREE.PlaneGeometry(2.71, 4.67, 80, 110);
  duvetGeometry.rotateX(-Math.PI / 2);
  const quiltHeight = (x: number, z: number) => {
    const edge = Math.max(0, (Math.abs(x) - 1.02) / 0.34);
    const knee = Math.exp(-((x + 0.22) ** 2 / 0.56 + (z - 0.42) ** 2 / 0.5)) * 0.32;
    const turn = Math.exp(-((z - 1.57) ** 2) / 0.045) * 0.095;
    return 0.76 + knee + turn - edge * edge * 0.36 + Math.sin(z * 8.2 + x * 1.9) * 0.023 + Math.sin(x * 11.7 + z * 3.6) * 0.013;
  };
  const quiltPos = duvetGeometry.attributes.position;
  for (let i = 0; i < quiltPos.count; i++) quiltPos.setY(i, quiltHeight(quiltPos.getX(i), quiltPos.getZ(i)));
  duvetGeometry.computeVertexNormals();
  const duvet = add(new THREE.Mesh(duvetGeometry, linen), -0.12, 0, 1.63); duvet.receiveShadow = true; duvet.castShadow = true;
  // Long tailored seams follow the real folds; subdued thread avoids a graphic grid.
  const thread = rough('#8b958d', 1);
  for (const seamX of [-0.78, -0.32, 0.14, 0.6, 1.01]) {
    const p: THREE.Vector3[] = [];
    for (let j = 0; j < 36; j++) { const z = -2.24 + j * 4.51 / 35; p.push(new THREE.Vector3(seamX - 0.12, quiltHeight(seamX, z) + 0.006, z + 1.63)); }
    const stitch = tube(p, 0.0009, thread, 50); stitch.castShadow = false;
  }
  // Folded-over top sheet, with a rounded curl rather than a featureless plane.
  const foldGeo = new THREE.PlaneGeometry(2.36, 0.44, 64, 12); foldGeo.rotateX(-Math.PI / 2);
  const fp = foldGeo.attributes.position;
  for (let i = 0; i < fp.count; i++) { const x = fp.getX(i), z = fp.getZ(i); fp.setY(i, 0.79 + Math.sin((z + 0.22) / 0.44 * Math.PI) * 0.095 + Math.sin(x * 9) * 0.012 - Math.max(0, Math.abs(x) - 1.05) * 1.15); }
  foldGeo.computeVertexNormals(); const fold = add(new THREE.Mesh(foldGeo, sheet), -0.12, 0, 3.24); fold.castShadow = true; fold.receiveShadow = true;

  // Low bedside cabinet: rounded edges, recessed drawers, real knob and joint gaps.
  const bedside = new THREE.Group(); scene.add(bedside);
  bedside.add(lampLight); destination = bedside;
  box(0.84, 0.70, 0.73, darkWood, 1.66, 0.4, -1.0, 0.035);
  box(0.92, 0.055, 0.81, walnut, 1.66, 0.77, -1.0, 0.023);
  for (let y = 0.24; y <= 0.59; y += 0.29) {
    box(0.73, 0.25, 0.035, walnut, 1.66, y + 0.03, -0.612, 0.014);
    const knob = add(new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.02, 0.026, 12), brass), 1.66, y + 0.06, -0.58); knob.rotation.x = Math.PI / 2;
  }
  // A turned ceramic lamp and individually ridged shade are recognizable at close range.
  const baseProfile: THREE.Vector2[] = [[0,0],[0.13,0],[0.15,0.04],[0.135,0.075],[0.12,0.12],[0.145,0.23],[0.13,0.29],[0.07,0.34],[0.055,0.38]].map(([x,y]) => new THREE.Vector2(x,y));
  const lampBase = add(new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 40), teal), 1.63, 0.8, -0.96);
  lampBase.castShadow = true; lampBase.userData.cozyAction = 'lamp';
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.24, 12), brass), 1.63, 1.27, -0.96);
  const shadeGeo = new THREE.CylinderGeometry(0.23, 0.37, 0.45, 192, 12, true);
  const sp = shadeGeo.attributes.position;
  for (let i = 0; i < sp.count; i++) {
    const x = sp.getX(i), z = sp.getZ(i), r = Math.hypot(x,z), a = Math.atan2(z,x);
    const ridge = 1 + Math.cos(a * 32) * 0.009;
    sp.setXYZ(i, x * ridge, sp.getY(i), z * ridge);
    if (r === 0) sp.setZ(i, 0.001);
  }
  shadeGeo.computeVertexNormals();
  const shadeMat = new THREE.MeshStandardMaterial({ color: '#e1cc9f', roughness: 0.89, side: THREE.DoubleSide, emissive: '#d09852', emissiveIntensity: 0.48 });
  const shade = add(new THREE.Mesh(shadeGeo, shadeMat), 1.63, 1.49, -0.96); shade.userData.cozyAction = 'lamp';
  for (const [r,y] of [[0.232,1.715],[0.372,1.265]]) { const ring = add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.007, 6, 64), cream), 1.63, y, -0.96); ring.rotation.x = Math.PI / 2; }
  // Closed book, linen bookmark, glazed dish and small glass: varied useful objects.
  const bookCover = rough('#4b625b', 0.9);
  box(0.25, 0.014, 0.34, bookCover, 1.41, 0.818, -0.8, 0.008);
  box(0.234, 0.045, 0.32, rough('#c9c2aa', 1), 1.41, 0.845, -0.8, 0.004);
  box(0.25, 0.012, 0.34, bookCover, 1.41, 0.876, -0.8, 0.007);
  box(0.035, 0.003, 0.11, fabric('#a47454'), 1.45, 0.824, -0.61);
  const cupGlass = new THREE.MeshPhysicalMaterial({ color: '#cadae0', roughness: 0.13, transparent: true, opacity: 0.24, metalness: 0.12, side: THREE.DoubleSide, depthWrite: false });
  const glassProfile = [[0.053,0],[0.062,0.016],[0.065,0.18],[0.06,0.18],[0.057,0.02],[0.052,0.015]].map(([x,y])=>new THREE.Vector2(x,y));
  add(new THREE.Mesh(new THREE.LatheGeometry(glassProfile, 28), cupGlass), 1.92, 0.802, -0.77);
  const water = add(new THREE.Mesh(new THREE.CircleGeometry(0.057, 32), new THREE.MeshPhysicalMaterial({ color: '#a7c3cb', roughness: 0.12, transparent: true, opacity: 0.3, metalness: 0.2 })), 1.92, 0.918, -0.77); water.rotation.x = -Math.PI/2;

  destination = scene;

  // A quiet, asymmetrical left wall detail and a woven rug support room scale.
  box(0.72, 0.92, 0.052, walnut, -2.32, 2.57, -3.95, 0.008);
  box(0.64, 0.84, 0.015, rough('#b7b2a0', 1), -2.32, 2.57, -3.914);
  const drawing = rough('#727f79', 1);
  tube([new THREE.Vector3(-2.42,2.26,-3.898), new THREE.Vector3(-2.44,2.50,-3.898), new THREE.Vector3(-2.34,2.78,-3.898)], 0.007, drawing, 20);
  for (let i=0;i<5;i++) { const leaf = new THREE.Mesh(leafGeo, drawing); leaf.position.set(-2.42 + i*0.015,2.39+i*0.066,-3.886); leaf.scale.set(0.29,0.26,0.3); leaf.rotation.z=(i%2?-1:1)*0.95; scene.add(leaf); }
  const rug = box(3.25, 0.024, 3.55, fabric('#756d5b', 6), -0.12, 0.027, 1.37, 0.025); rug.receiveShadow = true;

  let lampBright = true;
  let lampLevel = 1;
  let curtainOpen = false;
  let curtainGap = 0;
  let currentTime = 0;
  const resize = (aspect: number) => {
    camera.aspect = aspect;
    // The bedside vignette is staged nearer the opening in narrow portrait.
    // This keeps a useful physical lamp target, with its shadow and light source together.
    bedside.position.set(aspect < 0.82 ? -1.04 : 0, 0, aspect < 0.82 ? -0.7 : 0);
    if (aspect < 0.82) {
      // Narrow layout brings the lamp toward the lower right while keeping real bed linen near.
      camera.fov = 52;
      camera.position.set(0.15, 1.30, 2.34);
      camera.lookAt(0.25, 1.78, -3.45);
    } else if (aspect < 1.32) {
      camera.fov = 48;
      camera.position.set(-0.15, 1.31, 2.66);
      camera.lookAt(0.12, 1.62, -3.32);
    } else {
      camera.fov = 45;
      camera.position.set(-0.22, 1.29, 2.9);
      camera.lookAt(0.06, 1.55, -3.1);
    }
    camera.updateProjectionMatrix();
  };
  resize(16 / 9);
  return {
    scene, camera, resize,
    update(time, dt) {
      currentTime = time;
      const ease = dt > 0 ? 1 - Math.exp(-dt * 3.2) : 1;
      lampLevel += ((lampBright ? 1 : 0.36) - lampLevel) * ease;
      lampLight.intensity = 16 * lampLevel;
      shadeMat.emissiveIntensity = 0.14 + lampLevel * 0.34;
      curtainGap += ((curtainOpen ? 0.27 : 0) - curtainGap) * ease;
      for (const item of curtainState) {
        const p = item.mesh.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          const x = item.base[i*3], y = item.base[i*3+1], z = item.base[i*3+2];
          const down = Math.max(0, (1.67-y)/3.34);
          p.setXYZ(i, x + item.side * curtainGap * (0.2 + down*0.8), y, z + Math.sin(currentTime*0.37 + x*2.3 + item.side) * 0.022 * down*down);
        }
        p.needsUpdate = true; item.mesh.geometry.computeVertexNormals();
      }
    },
    interact(action) {
      if (action === 'lamp') { lampBright = !lampBright; return { type: 'lamp', intensity: 0.16 }; }
      if (action === 'curtain') { curtainOpen = !curtainOpen; return { type: 'curtain', intensity: 0.2 }; }
      return null;
    },
  };
}
