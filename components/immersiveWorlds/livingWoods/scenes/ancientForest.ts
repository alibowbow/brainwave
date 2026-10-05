import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldContent } from '../types';

/** Independent, metre-scale old-growth forest. All forms/textures are authored here. */
export function createAncientForest(scene: THREE.Scene, camera: THREE.PerspectiveCamera): WorldContent {
  let seed = 74129;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const tau = Math.PI * 2;
  const root = new THREE.Group();
  root.name = 'ancient-forest-world';
  scene.add(root);
  scene.background = new THREE.Color('#78887a');
  scene.fog = new THREE.FogExp2('#78887a', .024);
  camera.position.set(.15, 1.42, 5.25);
  camera.lookAt(.1, 2.75, -9.8);
  camera.fov = 58;
  camera.near = .08;
  camera.far = 95;
  camera.updateProjectionMatrix();

  const hemi = new THREE.HemisphereLight('#dbe4d0', '#555342', 2.25);
  root.add(hemi);
  const sun = new THREE.DirectionalLight('#ffdfa5', 3.7);
  sun.position.set(7, 18, -9);
  sun.target.position.set(0, 0, -2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 18, bottom: -16, near: 1, far: 48 });
  sun.shadow.bias = -.0004;
  sun.shadow.normalBias = .035;
  sun.shadow.radius = 3;
  root.add(sun, sun.target);
  const shade = new THREE.DirectionalLight('#8fbdb0', .58);
  shade.position.set(-10, 7, 5);
  root.add(shade);
  const bounce = new THREE.PointLight('#ffe2a5', 16, 9, 2);
  bounce.position.set(-1.15, 3.0, .8);
  root.add(bounce);
  const frontFill = new THREE.DirectionalLight('#f3e8be', .72);
  frontFill.position.set(1, 7, 8); root.add(frontFill);

  function texture(kind: 'bark' | 'floor') {
    const canvas = document.createElement('canvas');
    canvas.width = kind === 'bark' ? 512 : 512;
    canvas.height = kind === 'bark' ? 1024 : 512;
    const ctx = canvas.getContext('2d')!;
    const image = ctx.createImageData(canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const j = (y * canvas.width + x) * 4;
        const grain = random() * 29;
        const cracks = kind === 'bark' ? Math.pow(Math.abs(Math.sin(x * .083 + Math.sin(y * .008) * .9 + Math.sin(x * .035 + y * .014) * .5)), 14) * 38 : 0;
        const broad = Math.sin(x * .038 + Math.sin(y * .007)) * 9 + Math.sin(y * .051 + x * .059) * 5;
        const val = (kind === 'bark' ? 112 : 71) + broad + grain - cracks;
        image.data[j] = val * (kind === 'bark' ? .96 : .86);
        image.data[j + 1] = val * (kind === 'bark' ? .94 : .94);
        image.data[j + 2] = val * (kind === 'bark' ? .8 : .64);
        image.data[j + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    if (kind === 'bark') {
      for (let i = 0; i < 235; i++) {
        const x = random() * 512, y = random() * 1024, length = 35 + random() * 300;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - 10, y + length * .33, x + 12, y + length * .6, x - 2, y + length);
        ctx.strokeStyle = `rgba(30,32,24,${.18 + random() * .32})`;
        ctx.lineWidth = .6 + random() * 2.2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + 2.5, y + 4); ctx.lineTo(x + 4, y + length * .8);
        ctx.strokeStyle = 'rgba(197,194,159,.18)'; ctx.lineWidth = 1; ctx.stroke();
      }
    } else {
      for (let i = 0; i < 5200; i++) {
        const x = random() * 512, y = random() * 512;
        ctx.fillStyle = ['#454936', '#343b29', '#656145', '#74704a', '#576047'][Math.floor(random() * 5)];
        ctx.beginPath(); ctx.ellipse(x, y, .5 + random() * 4, .5 + random() * 2, random() * tau, 0, tau); ctx.fill();
      }
    }
    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(kind === 'bark' ? 2.5 : 12, kind === 'bark' ? 2 : 12);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    return map;
  }
  const barkMap = texture('bark');
  const floorMap = texture('floor');
  const bark = new THREE.MeshStandardMaterial({ map: barkMap, bumpMap: barkMap, bumpScale: .13, roughness: .98, vertexColors: true });
  const darkBark = new THREE.MeshStandardMaterial({ map: barkMap, bumpMap: barkMap, bumpScale: .08, roughness: 1, color: '#899380', vertexColors: true });
  const mossCanvas = document.createElement('canvas'); mossCanvas.width = mossCanvas.height = 256;
  const mossContext = mossCanvas.getContext('2d')!;
  mossContext.fillStyle = '#76835b'; mossContext.fillRect(0,0,256,256);
  for (let i = 0; i < 12000; i++) {
    const x=random()*256,y=random()*256;
    mossContext.fillStyle=['#829660','#65794a','#536842','#a0aa6d','#778e58'][Math.floor(random()*5)];
    mossContext.fillRect(x,y,.4+random()*1.5,.5+random()*3.5);
  }
  const mossMap = new THREE.CanvasTexture(mossCanvas);mossMap.colorSpace=THREE.SRGBColorSpace;
  mossMap.wrapS=mossMap.wrapT=THREE.RepeatWrapping;mossMap.repeat.set(2,2);mossMap.anisotropy=8;
  const moss = new THREE.MeshStandardMaterial({ color: '#cad5a7', map:mossMap,bumpMap:mossMap,bumpScale:.038,roughness: 1, vertexColors: true });
  const leafCanvas=document.createElement('canvas');leafCanvas.width=256;leafCanvas.height=512;
  const leafContext=leafCanvas.getContext('2d')!;
  const leafImage=leafContext.createImageData(256,512);
  for(let y=0;y<512;y++)for(let x=0;x<256;x++){
    const i=(y*256+x)*4,noise=random()*14+Math.sin(x*.09+y*.012)*4;
    leafImage.data[i]=112+noise;leafImage.data[i+1]=137+noise;leafImage.data[i+2]=70+noise*.65;leafImage.data[i+3]=255;
  }
  leafContext.putImageData(leafImage,0,0);
  leafContext.strokeStyle='rgba(207,214,143,.55)';leafContext.lineWidth=2;
  leafContext.beginPath();leafContext.moveTo(128,512);leafContext.lineTo(128,0);leafContext.stroke();
  for(let i=1;i<12;i++)for(const side of [-1,1]){
    const y=512-i*39;
    leafContext.strokeStyle='rgba(188,202,130,.33)';leafContext.lineWidth=1;
    leafContext.beginPath();leafContext.moveTo(128,y);leafContext.quadraticCurveTo(128+side*59,y-30,128+side*124,y-85);leafContext.stroke();
  }
  const leafMap=new THREE.CanvasTexture(leafCanvas);leafMap.colorSpace=THREE.SRGBColorSpace;leafMap.anisotropy=8;
  const leafMat = new THREE.MeshStandardMaterial({ color: '#aab899', side: THREE.DoubleSide, roughness: .78, vertexColors: true, emissive:'#1b2b18',emissiveIntensity:.055 });
  const canopyMat = new THREE.MeshStandardMaterial({ color: '#9ba88a',map:leafMap,side: THREE.DoubleSide, roughness: .87,emissive:'#1e2b19',emissiveIntensity:.13 });
  const twigMat = new THREE.MeshStandardMaterial({ color: '#655942', roughness: 1 });
  const litterMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 1, vertexColors: true });
  const ground = new THREE.PlaneGeometry(120, 120, 130, 130);
  ground.rotateX(-Math.PI / 2);
  const groundY = (x: number, z: number) => -.16 + .15 * Math.sin(x * .28 + z * .14) + .10 * Math.cos(z * .61 + x * .28) + Math.max(0, -z - 12) * .023;
  const gp = ground.getAttribute('position');
  for (let i = 0; i < gp.count; i++) gp.setY(i, groundY(gp.getX(i), gp.getZ(i)));
  ground.computeVertexNormals();
  const groundMesh = new THREE.Mesh(ground, new THREE.MeshStandardMaterial({ map: floorMap, bumpMap: floorMap, bumpScale: .12, roughness: 1, color: '#a4a783' }));
  groundMesh.receiveShadow = true; root.add(groundMesh);

  const barkPieces: THREE.BufferGeometry[] = [], farBarkPieces: THREE.BufferGeometry[] = [], mossPieces: THREE.BufferGeometry[] = [];
  function tube(points: THREE.Vector3[], radius: number, taper: number, segments = 30, radial = 12, mossTop = false) {
    const curve = new THREE.CatmullRomCurve3(points);
    const g = new THREE.TubeGeometry(curve, segments, 1, radial, false);
    const pos = g.getAttribute('position'), uv = g.getAttribute('uv');
    const frames = curve.computeFrenetFrames(segments, false);
    const colors = new Float32Array(pos.count * 3);
    for (let j = 0; j <= segments; j++) {
      const t = j / segments, center = curve.getPointAt(t);
      const r = radius * Math.pow(1 - t * .96, taper);
      for (let k = 0; k <= radial; k++) {
        const i = j * (radial + 1) + k, a = k / radial * tau;
        const ripple = 1 + .075 * Math.sin(a * 5 + t * 17) + .045 * Math.sin(a * 9 - t * 29);
        const n = frames.normals[j], b = frames.binormals[j];
        pos.setXYZ(i, center.x + (-Math.cos(a) * n.x + Math.sin(a) * b.x) * r * ripple,
          center.y + (-Math.cos(a) * n.y + Math.sin(a) * b.y) * r * ripple,
          center.z + (-Math.cos(a) * n.z + Math.sin(a) * b.z) * r * ripple);
        const c = new THREE.Color(mossTop ? '#a1b184' : '#aaab94');
        c.multiplyScalar(.79 + .19 * Math.sin(a * 3 + t * 14) ** 2);
        colors.set([c.r, c.g, c.b], i * 3);
        uv.setXY(i, k / radial, t * (points[0].distanceTo(points[points.length - 1]) / 4));
      }
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3)); g.computeVertexNormals();
    return g;
  }
  function trunk(x: number, z: number, radius: number, height: number, lean: number, near: boolean) {
    const radial = near ? 52 : 22, levels = near ? 66 : 28;
    const g = new THREE.CylinderGeometry(1, 1, 1, radial, levels, true);
    const pos = g.getAttribute('position'), uv = g.getAttribute('uv'), colors = new Float32Array(pos.count * 3);
    // Spatially stable variation keeps the fixed trees and old root composition,
    // while avoiding identical fluting and repeated bark phases on every trunk.
    const phase = near ? 0.27 : Math.sin(x * 1.71 + z * .83) * Math.PI;
    const species = .5 + .5 * Math.sin(x * .79 - z * .41);
    for (let i = 0; i < pos.count; i++) {
      const t = pos.getY(i) + .5;
      const a = Math.atan2(pos.getX(i), pos.getZ(i));
      const flare = .98 + Math.exp(-t * 15) * .73;
      const ridge = 1 + .075 * Math.sin(a * (7 + species * 2) + t * 8 + phase)
        + .075 * Math.sin(a * 5 - t * (2.5 + species * 1.7) + phase * .7)
        + .02 * Math.sin(a * 23 + t * 44 + phase);
      const knotAngle = Math.atan2(Math.sin(a - .45 - phase * .3), Math.cos(a - .45 - phase * .3));
      const healedKnot = Math.exp(-knotAngle * knotAngle * 9 - ((t - .18 - species * .13) / .042) ** 2) * .15;
      const r = radius * (1 - t * (near ? .44 : .40 + species * .18)) * flare * (ridge + healedKnot);
      const y = t * height + groundY(x, z);
      pos.setXYZ(i, x + Math.sin(a) * r + lean * t * t + Math.sin(t*5.2)*radius*.23, y, z + Math.cos(a) * r + Math.sin(t * 4.6) * radius * .58);
      const mossBand = t < .16 && Math.sin(a * 3 + t * 18 + phase) > -.15;
      const c = new THREE.Color(mossBand ? '#829376' : species > .56 ? '#b5b3a8' : '#b8a793');
      // Broad, broken lichens and damp flanks remain in the bark surface rather
      // than being a repeated ring or a separate floating geometry shell.
      const lichen = Math.max(0, Math.sin(a * 3.3 + t * 49 + phase) * Math.sin(a * 7.2 - t * 23) - .56);
      c.lerp(new THREE.Color('#a9b3a1'), lichen * .48);
      c.multiplyScalar(.77 + .21 * Math.sin(a * 4 + phase + t * 3) ** 2);
      colors.set([c.r, c.g, c.b], i * 3);
      uv.setXY(i, uv.getX(i) * (.82 + species * .39) + phase * .17, uv.getY(i) * (.81 + species * .43) + species * .61);
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3)); g.computeVertexNormals();
    (near ? barkPieces : farBarkPieces).push(g);
  }
  const oldX = -3.6, oldZ = -3.8;
  trunk(oldX, oldZ, 1.65, 25, -.9, true);
  const mossTufts: THREE.Vector3[] = [];
  const rootCurves = [
    [new THREE.Vector3(-3.1, 1.9, -3.4), new THREE.Vector3(-2.05, .80, -1.6), new THREE.Vector3(-.3, .31, .1), new THREE.Vector3(1.18, .0, 2.4)],
    [new THREE.Vector3(-3.4, 1.3, -2.9), new THREE.Vector3(-4.2, .52, -1.0), new THREE.Vector3(-3.6, .13, 2.7), new THREE.Vector3(-4.3, -.02, 4.9)],
    [new THREE.Vector3(-2.6, 1.5, -4.1), new THREE.Vector3(-.9, .43, -4.6), new THREE.Vector3(.8, .11, -5.9), new THREE.Vector3(2.9, -.04, -6.4)],
    [new THREE.Vector3(-4.0, 1.0, -4.5), new THREE.Vector3(-5.3, .42, -6.3), new THREE.Vector3(-7.2, .04, -8.9)],
    [new THREE.Vector3(-4.1, 1.7, -3.6), new THREE.Vector3(-5.8, .45, -2.1), new THREE.Vector3(-8.3, -.04, -.9)],
  ];
  rootCurves.forEach((p, i) => {
    const r = i === 0 ? .58 : .49;
    barkPieces.push(tube(p, r, .65, 46, 18));
    // Broken moss strips follow the upper crest instead of a smooth green sleeve.
    for (let strip = 0; strip < 5; strip++) {
      const curve = new THREE.CatmullRomCurve3(p);
      const start = .12 + strip * .15;
      const vertices: number[] = [], colors: number[] = [], uvs: number[] = [], indices: number[] = [];
      const rows = 14, cols = 9;
      for (let row = 0; row <= rows; row++) {
        const t = start + row / rows * .13;
        const center = curve.getPointAt(t), tangent = curve.getTangentAt(t);
        const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const radius = r * Math.pow(1 - t * .96, .65);
        for (let col = 0; col <= cols; col++) {
          const theta = ((col / cols) - .5) * (1.35 + .2 * Math.sin(row * 1.7));
          const thickness = .014 + random() * .029;
          const v = center.clone().addScaledVector(side, Math.sin(theta) * (radius + thickness));
          v.y += Math.cos(theta) * (radius + thickness);
          if(row>0&&row<rows&&col>0&&col<cols)for(let sprout=0;sprout<3;sprout++)mossTufts.push(v.clone().add(new THREE.Vector3((random()-.5)*.055,0,(random()-.5)*.055))); 
          vertices.push(v.x,v.y,v.z); uvs.push(col / cols,row / rows);
          const color = new THREE.Color().setHSL(.20 + random() * .035,.27 + random() * .21,.40 + random() * .17);
          colors.push(color.r,color.g,color.b);
          if (row < rows && col < cols) {
            const a = row * (cols + 1) + col;
            indices.push(a,a+1,a+cols+1,a+1,a+cols+2,a+cols+1);
          }
        }
      }
      const patch = new THREE.BufferGeometry();
      patch.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
      patch.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
      patch.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
      patch.setIndex(indices);patch.computeVertexNormals();mossPieces.push(patch);
    }
  });
  barkPieces.push(tube([new THREE.Vector3(-3.0, 8.5, -3.8), new THREE.Vector3(-.8, 10.3, -5.3), new THREE.Vector3(3.0, 11.4, -5.9), new THREE.Vector3(6.7, 11.8, -9.0)], .53, 1, 35, 16));
  barkPieces.push(tube([new THREE.Vector3(-3.8, 12.5, -3.8), new THREE.Vector3(-5.6, 14.2, -1.4), new THREE.Vector3(-8.2, 14.3, 1.3)], .53, 1, 24, 14));

  const trees = [
    [5.6, -6, .66, 24], [2.6, -13.0, .8, 28], [-8, -12, .7, 24], [-1.7, -18.5, .73, 31],
    [7.7, -17, .53, 26], [-7.4, -22, .47, 28], [12, -24, .6, 30], [2.5, -29, .66, 32],
    [-14, -16, .9, 29], [-12, -34, .47, 30], [16, -33, .6, 31], [-.8, -42, .55, 30],
  ];
  for (let i = 0; i < 51; i++) {
    const z = -13 - random() * 55, x = (random() - .5) * 65;
    if (Math.abs(x) < 4 && z > -20) continue;
    trees.push([x, z, .18 + random() * .39, 19 + random() * 15]);
  }
  trees.forEach(([x, z, r, h], i) => {
    trunk(x, z, r, h, (random() - .5) * 2, false);
    if (i < 4) {
      const side = x < 0 ? -1 : 1;
      farBarkPieces.push(tube([
        new THREE.Vector3(x, h * .19, z),
        new THREE.Vector3(x + side * r * .85, h * .29, z + r * .31),
        new THREE.Vector3(x + side * (1.05 + r), h * .42, z - .5),
        new THREE.Vector3(x + side * (1.9 + r), h * .52, z - 1.4),
      ], r * .43, 1.25, 20, 9));
    }
    if (i < 17) {
      for (let b = 0; b < 3; b++) {
        const angle = random() * tau, y = h * (.28 + b * .17), reach = 3 + random() * 4;
        farBarkPieces.push(tube([new THREE.Vector3(x, y, z), new THREE.Vector3(x + Math.cos(angle) * reach * .55, y + 1.1, z + Math.sin(angle) * reach * .55), new THREE.Vector3(x + Math.cos(angle) * reach, y + 1.7, z + Math.sin(angle) * reach)], r * .43, .9, 15, 7));
      }
    }
  });

  // Decayed fallen timber introduces a horizontal landmark and broken organic silhouette.
  const fallen = [new THREE.Vector3(2.3, .34, -8.2), new THREE.Vector3(4.4, .48, -10.2), new THREE.Vector3(7.8, .20, -11.4)];
  barkPieces.push(tube(fallen, .51, .2, 30, 18));
  mossPieces.push(tube(fallen.map(v => v.clone().add(new THREE.Vector3(0, .47, 0))), .11, .4, 30, 10, true));
  for (let i = 0; i < 6; i++) {
    const angle = i * 1.1;
    barkPieces.push(tube([new THREE.Vector3(2.3, .34, -8.2), new THREE.Vector3(2.3 + Math.sin(angle) * .37, .3 + Math.cos(angle) * .35, -7.8 + random() * .3)], .12, 1.2, 6, 5));
  }
  function merged(parts: THREE.BufferGeometry[], material: THREE.Material, shadow: boolean) {
    const g = mergeGeometries(parts.map(part => part.index ? part.toNonIndexed() : part), false)!;
    const mesh = new THREE.Mesh(g, material); mesh.castShadow = shadow; mesh.receiveShadow = true; root.add(mesh);
    parts.forEach(p => p.dispose()); return mesh;
  }
  merged(barkPieces, bark, true); merged(farBarkPieces, darkBark, true); merged(mossPieces, moss, false);
  // Thousands of tiny, curved moss shoots soften the crust edges and catch grazing light.
  const tuftVertices:number[]=[],tuftIndices:number[]=[];
  for(let blade=0;blade<4;blade++){
    const angle=blade/4*tau,dx=Math.cos(angle),dz=Math.sin(angle),base=tuftVertices.length/3;
    for(let k=0;k<=3;k++){
      const t=k/3,width=.006*(1-t)+.0006,bend=t*t*.022;
      tuftVertices.push(dx*bend-dz*width,t*.044,dz*bend+dx*width,dx*bend+dz*width,t*.044,dz*bend-dx*width);
      if(k<3){const a=base+k*2;tuftIndices.push(a,a+1,a+2,a+1,a+3,a+2);}
    }
  }
  const tuftGeo=new THREE.BufferGeometry();tuftGeo.setAttribute('position',new THREE.Float32BufferAttribute(tuftVertices,3));tuftGeo.setIndex(tuftIndices);tuftGeo.computeVertexNormals();
  const tufts=new THREE.InstancedMesh(tuftGeo,new THREE.MeshStandardMaterial({color:'#9bad77',roughness:1,side:THREE.DoubleSide,emissive:'#20270c',emissiveIntensity:.06}),mossTufts.length);
  const tuftMatrix=new THREE.Object3D();
  mossTufts.forEach((position,i)=>{
    tuftMatrix.position.copy(position);tuftMatrix.rotation.set((random()-.5)*.3,random()*tau,(random()-.5)*.3);
    tuftMatrix.scale.setScalar(.75+random()*.95);tuftMatrix.updateMatrix();tufts.setMatrixAt(i,tuftMatrix.matrix);
    tufts.setColorAt(i,new THREE.Color().setHSL(.21+random()*.04,.3+random()*.15,.35+random()*.25));
  });tufts.receiveShadow=true;root.add(tufts);

  // Individual three-dimensional canopy leaves, never sphere foliage.
  function leafGeometry(detail = 20, cols = 6) {
    const g = new THREE.BufferGeometry(), vertices:number[]=[],uvs:number[]=[],indices:number[]=[];
    for(let row=0;row<=detail;row++){
      const t=row/detail,w=.235*Math.pow(Math.sin(Math.PI*t),.78)*(1-.18*t);
      for(let col=0;col<=cols;col++){
        const u=col/cols*2-1;
        vertices.push(u*w*(1+.025*Math.sin(row*3.3)),t,.095*Math.sin(t*Math.PI)*(1-u*u*.76)+u*.018*Math.sin(t*5));
        uvs.push(col/cols,t);
        if(row<detail&&col<cols){const a=row*(cols+1)+col;indices.push(a,a+1,a+cols+1,a+1,a+cols+2,a+cols+1);}
      }
    }
    g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
  }
  const leafGeo = leafGeometry();
  const canopyGeo=leafGeometry(8,2);
  const canopies: THREE.InstancedMesh[] = [];
  const temp = new THREE.Object3D();
  const clusterOrigins = [new THREE.Vector3(-3, 11.5, -4.8), new THREE.Vector3(3.5, 11.6, -7.2), new THREE.Vector3(-7, 9, -6), ...trees.slice(0, 24).map(t => new THREE.Vector3(t[0], t[3] * .54, t[1]))];
  for (let layer = 0; layer < 3; layer++) {
    const count = 1700, leaves = new THREE.InstancedMesh(canopyGeo, canopyMat, count);
    leaves.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    for (let i = 0; i < count; i++) {
      const c = clusterOrigins[Math.floor(random() * clusterOrigins.length)];
      const a = random() * tau, r = Math.sqrt(random()) * 6;
      temp.position.set(c.x + Math.cos(a) * r, c.y + (random() - .5) * 2.8 + layer * 1.7, c.z + Math.sin(a) * r);
      temp.rotation.set(Math.PI / 2 + (random() - .5) * 1.1, random() * tau, random() * tau);
      const size = .55 + random() * .72;
      temp.scale.set(size, size, size); temp.updateMatrix(); leaves.setMatrixAt(i, temp.matrix);
      leaves.setColorAt(i, new THREE.Color().setHSL(.21 + random() * .075, .28 + random() * .2, .37 + random() * .21));
    }
    leaves.castShadow = true; leaves.receiveShadow = true; root.add(leaves); canopies.push(leaves);
  }

  // Asymmetric sub-canopy saplings interrupt the tall trunk rhythm at a human scale.
  const understoryBranches:THREE.BufferGeometry[]=[];
  const understoryLeaves=new THREE.InstancedMesh(canopyGeo,canopyMat,430);
  let understoryCount=0;
  for(const [x,z,h] of [[-1.5,-11,3.1],[5,-13,4.2],[-6.1,-9,3.6],[1.1,-22,4.1],[9.1,-19,5.0]]){
    const base=groundY(x,z),lean=(random()-.5)*.65;
    understoryBranches.push(tube([new THREE.Vector3(x,base,z),new THREE.Vector3(x+lean*.4,base+h*.5,z-.12),new THREE.Vector3(x+lean,base+h,z-.35)],.036,.85,14,6));
    for(let branch=0;branch<4;branch++){
      const angle=random()*tau,y=base+h*(.42+branch*.14),reach=.55+random()*.72;
      const start=new THREE.Vector3(x+lean*.4,y,z-.15),end=new THREE.Vector3(x+Math.cos(angle)*reach,y+.28,z+Math.sin(angle)*reach);
      understoryBranches.push(tube([start,start.clone().lerp(end,.55).add(new THREE.Vector3(0,.15,0)),end],.014,.8,8,5));
      for(let leaf=0;leaf<20;leaf++){
        const t=random();temp.position.copy(start).lerp(end,t);temp.position.x+=(random()-.5)*.3;temp.position.y+=(random()-.5)*.25;temp.position.z+=(random()-.5)*.3;
        temp.rotation.set(-.5+random(),random()*tau,random()*tau);temp.scale.setScalar(.28+random()*.26);temp.updateMatrix();
        understoryLeaves.setMatrixAt(understoryCount,temp.matrix);understoryLeaves.setColorAt(understoryCount,new THREE.Color().setHSL(.23+random()*.03,.24,.47+random()*.13));understoryCount++;
      }
    }
  }
  understoryLeaves.count=understoryCount;understoryLeaves.receiveShadow=true;root.add(understoryLeaves);merged(understoryBranches,darkBark,false);

  // Ground fern pinnae are folded surfaces with a central rib. Asymmetric fronds
  // overlap the root silhouettes and carry the localized warm illumination.
  const fernPositions: number[] = [], fernColors: number[] = [];
  function triangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, color: THREE.Color, positions = fernPositions, colors = fernColors) {
    for (const v of [a,b,c]) { positions.push(v.x,v.y,v.z); colors.push(color.r,color.g,color.b); }
  }
  function fern(x: number, z: number, size: number, density = 8) {
    const baseY = groundY(x,z) + .03;
    const plantPhase = x * 1.71 + z * .83;
    const plantShade = .82 + .15 * Math.sin(plantPhase * .63);
    for (let f = 0; f < density; f++) {
      const a = f / density * tau + random() * .6 + .18 * Math.sin(f * 2.3 + plantPhase);
      const length = size * (.53 + random() * .68);
      const arch = .37 + .22 * (.5 + .5 * Math.sin(f * 2.1 + plantPhase));
      const lean = .18 * Math.sin(f * 1.4 + plantPhase);
      const curl = .72 + .23 * (.5 + .5 * Math.cos(f * 1.7 + plantPhase));
      const frondShade = plantShade * (.83 + .18 * Math.sin(f * 2.7 + 1));
      const forward = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const sideways = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a));
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 14; j++) {
        const t = j / 14;
        points.push(new THREE.Vector3(x, baseY + Math.sin(t * Math.PI * curl) * size * arch + .045, z)
          .addScaledVector(forward, t * length).addScaledVector(sideways, lean * size * t * t));
      }
      for (let j = 1; j < 14; j++) {
        const t = j / 14;
        const p = points[j];
        const half = size * (.17 + .05 * Math.sin(f + plantPhase) ** 2) * Math.sin(Math.PI * t) ** .7;
        for (const side of [-1,1]) {
          const tip = p.clone().addScaledVector(sideways, half * side).addScaledVector(forward, length * .075);
          tip.y -= .025 * size;
          const color = new THREE.Color().setHSL(.225 + random() * .054, .24 + random() * .18, (.30 + random() * .15) * frondShade);
          const left:THREE.Vector3[]=[],middle:THREE.Vector3[]=[],right:THREE.Vector3[]=[];
          const pinnaSegments=Math.hypot(x,z)<9?8:4;
          for(let k=0;k<=pinnaSegments;k++){
            const u=k/pinnaSegments,center=p.clone().lerp(tip,u),width=size*.039*Math.sin(Math.PI*u)**.72;
            center.y+=Math.sin(Math.PI*u)*size*.025;
            const l=center.clone().addScaledVector(forward,-width),r=center.clone().addScaledVector(forward,width*.84);
            l.y-=width*.21;r.y-=width*.21;
            left.push(l);right.push(r);middle.push(center);
          }
          for(let k=0;k<pinnaSegments;k++){
            triangle(left[k],left[k+1],middle[k],color);triangle(left[k+1],middle[k+1],middle[k],color);
            const lightColor=color.clone().multiplyScalar(1.075);
            triangle(middle[k],middle[k+1],right[k],lightColor);triangle(middle[k+1],right[k+1],right[k],lightColor);
          }
        }
        const ribA = p.clone().addScaledVector(sideways, .008 * size), ribB = p.clone().addScaledVector(sideways,-.008*size);
        triangle(ribA, ribB, points[j+1], new THREE.Color('#829060').multiplyScalar(.83 + frondShade * .18));
      }
    }
  }
  fern(1.57, 1.12, 1.27, 8); fern(-1.16, 1.46, .83, 7); fern(2.8, -1.8, 1.0); fern(-.9,-4.3,.81);
  for (let i = 0; i < 68; i++) {
    const x = (random() - .5) * 33, z = 2 - random() * 35;
    if (Math.abs(x) < 1.8 && z > -6 && z < .8) continue;
    fern(x,z,.42 + random() * .82, 6 + Math.floor(random()*3));
  }
  const fernGeo = new THREE.BufferGeometry();
  fernGeo.setAttribute('position', new THREE.Float32BufferAttribute(fernPositions,3));
  fernGeo.setAttribute('color', new THREE.Float32BufferAttribute(fernColors,3)); fernGeo.computeVertexNormals();
  const fernMesh = new THREE.Mesh(fernGeo,leafMat); fernMesh.receiveShadow = true; root.add(fernMesh);

  // Scattered real leaf litter catches light at different angles, breaking a flat ground plane.
  const litterPositions: number[] = [], litterColors: number[] = [];
  for (let i = 0; i < 760; i++) {
    const x = (random()-.5)*28, z = 4-random()*27, a=random()*tau, s=.035+random()*.13;
    const c = new THREE.Vector3(x,groundY(x,z)+.025,z);
    const d = new THREE.Vector3(Math.cos(a)*s,0,Math.sin(a)*s), e = new THREE.Vector3(-d.z*.47,.008+random()*.02,d.x*.47);
    const color = new THREE.Color().setHSL(.08+random()*.07,.24+random()*.25,.2+random()*.12);
    triangle(c.clone().sub(d), c.clone().add(e), c.clone().add(d),color,litterPositions,litterColors);
    triangle(c.clone().sub(d), c.clone().add(d), c.clone().sub(e),color,litterPositions,litterColors);
  }
  const litterGeo = new THREE.BufferGeometry(); litterGeo.setAttribute('position',new THREE.Float32BufferAttribute(litterPositions,3)); litterGeo.setAttribute('color',new THREE.Float32BufferAttribute(litterColors,3)); litterGeo.computeVertexNormals();
  const litter = new THREE.Mesh(litterGeo,litterMat); litter.receiveShadow = true; root.add(litter);

  // Tactile sapling in the shared portrait centre-right. Touch only deflects this twig.
  const sprig = new THREE.Group(); sprig.position.set(1.13,.0,1.45); root.add(sprig);
  const stemCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(-.09,.52,-.05),new THREE.Vector3(-.27,1.06,-.12)]);
  const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve,20,.012,6,false),twigMat); sprig.add(stem);
  const nearLeaves: THREE.Object3D[] = [];
  const broadleaf = new THREE.MeshStandardMaterial({ color:'#d0d6b5',map:leafMap,bumpMap:leafMap,bumpScale:.012,roughness:.66,side:THREE.DoubleSide,emissive:'#27371b',emissiveIntensity:.14 });
  for (let i=0;i<7;i++) {
    const t=.23+i*.105, p=stemCurve.getPoint(t), side=i%2===0?1:-1;
    const leaf=new THREE.Mesh(leafGeo,broadleaf); leaf.position.copy(p);
    leaf.rotation.set(-.38,.32*side,-side*(.8+i*.035)); leaf.scale.set(.55,.48+(i%3)*.07,.55);
    leaf.castShadow=true;leaf.receiveShadow=true;leaf.userData.livingWoodsInteraction='leaf';sprig.add(leaf);nearLeaves.push(leaf);
    const vein = new THREE.Mesh(new THREE.CylinderGeometry(.0017,.003,.82,4),new THREE.MeshStandardMaterial({ color:'#c6ca8a',roughness:1 }));
    vein.position.set(0,.46,.107); vein.scale.set(1,1,1); leaf.add(vein);
  }
  const restRotation = .08; sprig.rotation.z=restRotation;
  let touchedAt=-100;

  // Very small drifting dust motes only in the sunlit opening; no glowing firefly show.
  const motesGeo = new THREE.BufferGeometry(), motesPositions = new Float32Array(34*3);
  for(let i=0;i<34;i++){motesPositions[i*3]=-1+random()*5;motesPositions[i*3+1]=.3+random()*4.5;motesPositions[i*3+2]=-2-random()*13;}
  motesGeo.setAttribute('position',new THREE.BufferAttribute(motesPositions,3));
  const motes=new THREE.Points(motesGeo,new THREE.PointsMaterial({color:'#e4d6a3',size:.025,transparent:true,opacity:.33,depthWrite:false}));root.add(motes);

  // A tiny distant insect uses two folded wing planes; life stays low contrast.
  const insect = new THREE.Group(); insect.position.set(.9,1.7,-13); root.add(insect);
  const wingMaterial = new THREE.MeshStandardMaterial({ color:'#9a9f76',roughness:1,side:THREE.DoubleSide });
  const wings:THREE.Mesh[]=[];
  for(const side of [-1,1]){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,side*.026,.035,0,side*.064,.004,.01,side*.032,-.021,0],3));geometry.setIndex([0,1,2,0,2,3]);geometry.computeVertexNormals();
    const wing=new THREE.Mesh(geometry,wingMaterial);insect.add(wing);wings.push(wing);
  }
  return {
    interactionTargets: nearLeaves,
    interact(_hit: THREE.Intersection, time: number) { touchedAt=time; },
    update(time: number, _dt: number) {
      const elapsed=time-touchedAt;
      const response=elapsed>=0&&elapsed<5?Math.exp(-elapsed*1.25)*Math.sin(elapsed*4)*.19:0;
      sprig.rotation.z=restRotation+Math.sin(time*.35)*.011+response;
      sprig.rotation.x=Math.sin(time*.27+1)*.008;
      canopies.forEach((canopy,i)=>{canopy.rotation.z=Math.sin(time*.085+i*1.9)*.0011;});
      motes.position.x=Math.sin(time*.07)*.23;motes.position.y=Math.sin(time*.11)*.08;
      insect.position.x=.9+Math.sin(time*.13)*.38;insect.position.y=1.7+Math.sin(time*.21)*.09;
      wings[0].rotation.y=Math.sin(time*3.2)*.4;wings[1].rotation.y=-Math.sin(time*3.2)*.4;
    },
    resize(aspect:number) {
      camera.fov=aspect<.8?61:58;
      camera.position.set(aspect<.8?-.85:.15,1.42,aspect<.8?5.50:5.25);
      camera.lookAt(aspect<.8?-1.55:.1,aspect<.8?2.45:2.75,-9.8);
      sprig.position.x=aspect<.8?-.18:1.13;
      camera.updateProjectionMatrix();
    },
  };
}
