import * as THREE from 'three';
import type { WorldBuilder } from './types';

/* Independent procedural artwork. No downloaded source, image, model or sound.
 * JEV S090: separate sky, distant water/rain atmosphere and near moving details.
 * JEV S092/O041: rain has depth and an exterior acoustic boundary; no lightning.
 * O078/O061: coherent low-amplitude wind across spatially distributed vegetation.
 */
const seedRandom = (seed: number) => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
  return (seed >>> 0) / 4294967296;
};

function surface(kind: 'timber' | 'clay' | 'canvas' | 'stone', color: number, roughness = .85) {
  const random = seedRandom(9187 + kind.length);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const c = canvas.getContext('2d')!;
  c.fillStyle = '#bcb9b0'; c.fillRect(0, 0, 256, 256);
  const data = c.getImageData(0, 0, 256, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
    const grain = kind === 'timber' ? Math.sin(y * .39 + Math.sin(x * .019) * 3) * 12 + Math.sin(y * 1.8) * 5
      : kind === 'canvas' ? ((x % 3 === 0 ? 9 : 0) + (y % 3 === 0 ? -11 : 0)) : Math.sin(x * .055) * Math.sin(y * .091) * 6;
    const v = 174 + random() * 43 + grain;
    const p = (y * 256 + x) * 4;
    data.data[p] = v; data.data[p + 1] = v - 2; data.data[p + 2] = v - 6; data.data[p + 3] = 255;
  }
  c.putImageData(data, 0, 0);
  if (kind === 'timber') {
    for (let i = 0; i < 65; i++) {
      c.strokeStyle = `rgba(52,38,24,${.06 + random() * .10})`;
      c.lineWidth = .4 + random() * 1.1; c.beginPath();
      const y = random() * 256;
      c.moveTo(0, y); c.bezierCurveTo(80, y - 5, 150, y + 5, 256, y + random() * 9 - 4); c.stroke();
    }
    for (let k = 0; k < 4; k++) {
      const x = random() * 256, y = random() * 256;
      for (let i = 0; i < 7; i++) {
        c.strokeStyle = `rgba(43,29,21,${.13 - i * .013})`; c.beginPath();
        c.ellipse(x, y, 5 + i * 4, 1.8 + i * 1.25, 0, 0, Math.PI * 2); c.stroke();
      }
    }
  }
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(kind === 'timber' ? 2 : 3, kind === 'timber' ? 1 : 3);
  return new THREE.MeshStandardMaterial({ color, map, bumpMap: map, bumpScale: kind === 'timber' ? .022 : .009, roughness });
}

const cloudVertex = `varying vec3 vWorld;
void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const noiseGLSL = `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float n=0.,a=.5;mat2 m=mat2(.80,-.60,.60,.80);for(int i=0;i<5;i++){n+=a*noise(p);p=m*p*2.03+13.7;a*=.5;}return n;}
`;
const cloudFragment = `uniform float uTime;varying vec3 vWorld;
${noiseGLSL}
void main(){
 vec3 d=normalize(vWorld-cameraPosition);float h=max(d.y,0.);
 vec3 sky=mix(vec3(.57,.65,.65),vec3(.24,.32,.37),pow(h,.47));
 vec2 p=d.xz/max(d.y+.35,.13);p=p*1.18+vec2(uTime*.002,0.);
 float broad=fbm(p*.61+vec2(4.1,13.));
 float fold=fbm(p*2.1+vec2(broad*2.,-uTime*.003));
 float billow=fbm(p*4.8+fold*2.);
 float cover=smoothstep(.25,.72,broad*.57+fold*.35+billow*.08);
 vec3 cloud=mix(vec3(.15,.205,.24),vec3(.44,.50,.52),smoothstep(.3,.75,fold));
 float side=clamp(-d.x*.50+.40,0.,1.);
 cloud+=vec3(.085,.09,.078)*side*smoothstep(.52,.70,fold);
 sky=mix(sky,cloud,cover*.97*smoothstep(-.20,.085,d.y));
 float underside=smoothstep(.50,.70,fbm(p*.83+vec2(19.,5.)))*smoothstep(-.15,.16,d.y);
 sky=mix(sky,vec3(.17,.235,.275),underside*.45);
 float haze=1.-smoothstep(.0,.16,abs(d.y));
 sky=mix(sky,vec3(.60,.68,.66),haze*.19);
 gl_FragColor=vec4(sky,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;

function beam(scene: THREE.Object3D, size: [number, number, number], pos: [number, number, number], mat: THREE.Material) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(...size), mat); m.position.set(...pos); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
}
function cylinderBetween(scene: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, topRadius = radius) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(topRadius, radius, a.distanceTo(b), 9), mat);
  m.position.copy(a).lerp(b, .5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); scene.add(m); return m;
}

export const buildStorm: WorldBuilder = ({ scene, camera }) => {
  const random = seedRandom(564932);
  scene.background = new THREE.Color('#718687');
  scene.fog = new THREE.FogExp2('#869e9a', .0085);
  const skyMat = new THREE.ShaderMaterial({ vertexShader: cloudVertex, fragmentShader: cloudFragment, uniforms: { uTime: { value: 0 } }, side: THREE.BackSide, depthWrite: false });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(240, 48, 24), skyMat); sky.renderOrder = -10; scene.add(sky);
  const ambient = new THREE.HemisphereLight('#cbdcda', '#6f6b51', 2.55); scene.add(ambient);
  const daylight = new THREE.DirectionalLight('#e4eadc', 1.9); daylight.position.set(-30, 35, 12); scene.add(daylight);
  const warmFill = new THREE.PointLight('#ffbe79', 5.5, 7, 2); warmFill.position.set(-1.55, 1.42, 1.7); scene.add(warmFill);

  const wood = surface('timber', 0x75634e, .85);
  const wetWood = surface('timber', 0x635745, .43);
  const cutWood = surface('timber', 0x85765b, .79);
  const clay = surface('clay', 0x965e40, .74);
  const stone = surface('stone', 0x706f61, .89);
  const brass = new THREE.MeshStandardMaterial({ color: 0x65513b, metalness: .72, roughness: .42 });
  const canvasMat = surface('canvas', 0x8b8369, .94); canvasMat.side = THREE.DoubleSide;
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x64706a, metalness: .58, roughness: .59 });

  // Broad undulating terrain, not a flat image. Color variation follows contour and field strips.
  const terrainGeo = new THREE.PlaneGeometry(230, 215, 90, 76); terrainGeo.rotateX(-Math.PI / 2);
  const pos = terrainGeo.attributes.position; const colors: number[] = [];
  const height = (x: number, z: number) => -.50 + Math.sin(x * .035 + .5) * Math.sin(z * .019) * 2.8 + Math.sin(x * .072 - z * .038) * 1.1;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i) - 83;
    pos.setY(i, height(x, z)); pos.setZ(i, z);
    const v = .5 + .5 * Math.sin(x * .097 + z * .18 + Math.sin(x * .11));
    const c = new THREE.Color().lerpColors(new THREE.Color('#56674a'), new THREE.Color('#81916a'), v * .58);
    const furrow = Math.pow(.5 + .5 * Math.cos(z * .67 + x * .026), 14) * .048;
    c.offsetHSL(0, 0, -furrow); colors.push(c.r, c.g, c.b);
  }
  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); terrainGeo.computeVertexNormals();
  const terrain = new THREE.Mesh(terrainGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 })); terrain.receiveShadow = true; scene.add(terrain);

  // Continuous soft hills behind the fields: irregular ridges recede into storm haze.
  for (let layer = 0; layer < 3; layer++) {
    const z = -88 - layer * 25, verts: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 80; i++) {
      const x = -190 + i * 4.75;
      const top = 4.2 + Math.sin(i * .13 + layer * 2) * 3.5 + Math.sin(i * .35 + layer) * 1.25 + layer * 1.4;
      verts.push(x, top, z, x, -9, z);
      if (i < 80) { const k = i * 2; indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3)); g.setIndex(indices); g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: [0x4b6250, 0x64776a, 0x798d82][layer], roughness: 1, side: THREE.DoubleSide })));
  }

  // Fine, organic ground variation joins the many true 3D grass tufts.
  const fieldCanvas = document.createElement('canvas'); fieldCanvas.width = fieldCanvas.height = 256;
  const fieldContext = fieldCanvas.getContext('2d')!;
  fieldContext.fillStyle = '#bdc3a9'; fieldContext.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 6000; i++) {
    const alpha = .025 + random() * .11;
    fieldContext.fillStyle = random() < .58 ? `rgba(49,65,32,${alpha})` : `rgba(230,225,165,${alpha})`;
    fieldContext.beginPath(); fieldContext.ellipse(random() * 256, random() * 256, 1 + random() * 8, 1 + random() * 3, random() * 3, 0, Math.PI * 2); fieldContext.fill();
  }
  const fieldMap = new THREE.CanvasTexture(fieldCanvas); fieldMap.colorSpace = THREE.SRGBColorSpace; fieldMap.wrapS = fieldMap.wrapT = THREE.RepeatWrapping; fieldMap.repeat.set(30, 26);
  (terrain.material as THREE.MeshStandardMaterial).map = fieldMap;
  (terrain.material as THREE.MeshStandardMaterial).bumpMap = fieldMap;
  (terrain.material as THREE.MeshStandardMaterial).bumpScale = .045;

  // Field grasses are individually rooted in space; the shader bends tips, not whole patches.
  const bladeGeo = new THREE.BufferGeometry();
  const bladePositions: number[] = [], bladeIndices: number[] = [];
  // Each instance is a loosely clustered tussock of slender curved blades.
  for (let b = 0; b < 12; b++) {
    const direction = random() * Math.PI * 2, spread = random() * .19, bend = .06 + random() * .18;
    const bx = Math.cos(direction) * spread, bz = Math.sin(direction) * spread;
    const h = .26 + random() * .37, width = .015 + random() * .015, start = bladePositions.length / 3;
    for (let j = 0; j < 4; j++) {
      const t = j / 3, cx = bx + Math.cos(direction) * t * t * bend, cz = bz + Math.sin(direction) * t * t * bend;
      const w = width * (1 - t * .92);
      bladePositions.push(cx - Math.cos(direction + 1.57) * w, t * h, cz - Math.sin(direction + 1.57) * w,
        cx + Math.cos(direction + 1.57) * w, t * h, cz + Math.sin(direction + 1.57) * w);
      if (j < 3) { const k = start + j * 2; bladeIndices.push(k,k+1,k+2,k+1,k+3,k+2); }
    }
  }
  bladeGeo.setAttribute('position', new THREE.Float32BufferAttribute(bladePositions, 3)); bladeGeo.setIndex(bladeIndices); bladeGeo.computeVertexNormals();
  const grassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .97, side: THREE.DoubleSide });
  const grassTime = { value: 0 };
  grassMat.onBeforeCompile = shader => {
    shader.uniforms.uGrassTime = grassTime;
    shader.vertexShader = 'uniform float uGrassTime;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      float bx = instanceMatrix[3].x; float bz=instanceMatrix[3].z;
      transformed.x += sin(uGrassTime*.65+bx*.15+bz*.11)*pow(max(position.y,0.),2.)*.19;
      transformed.z += sin(uGrassTime*.49+bz*.16)*pow(max(position.y,0.),2.)*.09;`);
  };
  const grass = new THREE.InstancedMesh(bladeGeo, grassMat, 4200); const dummy = new THREE.Object3D();
  const grassColor = new THREE.Color();
  for (let i = 0; i < 4200; i++) {
    const x = (random() - .5) * 80, z = -3.0 - Math.pow(random(), 1.9) * 69;
    dummy.position.set(x, height(x, z) + .08, z); dummy.rotation.set(0, random() * Math.PI * 2, 0); dummy.scale.setScalar(.6 + random() * 1.1); dummy.updateMatrix(); grass.setMatrixAt(i, dummy.matrix);
    grassColor.setHSL(.19 + random() * .05, .20 + random() * .18, .24 + random() * .12); grass.setColorAt(i, grassColor);
  }
  grass.frustumCulled = false; scene.add(grass);

  // The distant shelterbelt uses irregular crown geometry and staggered trunks.
  const crownGeo = new THREE.IcosahedronGeometry(1, 3);
  const cp = crownGeo.attributes.position;
  for (let i = 0; i < cp.count; i++) {
    const x = cp.getX(i), y = cp.getY(i), z = cp.getZ(i);
    const f = 1 + Math.sin(x * 8 + z * 6) * .072 + Math.sin(y * 11 + x * 5) * .068 + Math.cos(z * 14 - y * 9) * .053;
    cp.setXYZ(i, x * f, y * f, z * f);
  }
  // Continuous normals prevent faceted low-poly clouds of foliage.
  const cn = crownGeo.attributes.normal;
  for (let i = 0; i < cp.count; i++) { const v = new THREE.Vector3(cp.getX(i), cp.getY(i), cp.getZ(i)).normalize(); cn.setXYZ(i, v.x, v.y, v.z); }
  const crowns = new THREE.InstancedMesh(crownGeo, new THREE.MeshStandardMaterial({ color: 0x7d9572, roughness: 1 }), 165);
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.10, .18, 1, 5), new THREE.MeshStandardMaterial({ color: 0x4e5141 }), 55);
  for (let t = 0; t < 55; t++) {
    const x = -87 + t * 3.4 + random() * 2, z = -62 + Math.sin(t * .33) * 7, h = 2.2 + random() * 2.7;
    dummy.position.set(x, height(x, z) + h * .35, z); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, h * .7, 1); dummy.updateMatrix(); trunks.setMatrixAt(t, dummy.matrix);
    for (let c = 0; c < 3; c++) {
      dummy.position.set(x + (c - 1) * h * .25, height(x, z) + h * (.68 + random() * .16), z + (random() - .5) * 2);
      dummy.rotation.set(random(), random(), random()); dummy.scale.set(h * (.37 + random() * .1), h * (.35 + random() * .22), h * .40); dummy.updateMatrix(); crowns.setMatrixAt(t * 3 + c, dummy.matrix);
      grassColor.setHSL(.25, .21, .22 + random() * .08); crowns.setColorAt(t * 3 + c, grassColor);
    }
  }
  scene.add(crowns, trunks);

  // Raised deck, jointed posts and functional roof frame surround the seated viewpoint.
  beam(scene, [6.8, .24, 6.8], [0, -.19, 1.55], wood);
  for (let i = 0; i < 19; i++) {
    const board = beam(scene, [.346, .10, 6.8], [-3.22 + i * .357, -.025 + random() * .006, 1.55], i % 4 === 0 ? cutWood : wetWood);
    board.rotation.y = (random() - .5) * .002;
  }
  beam(scene, [6.9, .24, .20], [0, -.04, -1.88], cutWood);
  const postPositions = [[-2.85, -1.13], [2.85, -1.13], [-2.85, 4.20], [2.85, 4.2]];
  for (const [x, z] of postPositions) {
    beam(scene, [.21, 3.38, .23], [x, 1.59, z], wood);
    beam(scene, [.25, .18, .27], [x, .15, z], cutWood);
    const brace = beam(scene, [.13, 1.0, .13], [x - Math.sign(x) * .26, 2.75, z], cutWood); brace.rotation.z = Math.sign(x) * -.54;
    for (const y of [.56, 2.45]) {
      const nail = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, .01, 9), brass); nail.rotation.x = Math.PI / 2; nail.position.set(x, y, z + .124); scene.add(nail);
    }
  }
  beam(scene, [6.15, .25, .27], [0, 3.19, -1.13], wood);
  beam(scene, [6.15, .25, .27], [0, 3.57, 4.2], wood);
  for (let i = 0; i < 7; i++) {
    const r = beam(scene, [.14, .18, 6.15], [-2.75 + i * .916, 3.42, 1.4], cutWood); r.rotation.x = .063;
  }
  // Thin corrugated sheets have formed cross sections rather than an untextured box roof.
  const roofGeo = new THREE.PlaneGeometry(6.6, 6.4, 120, 1); roofGeo.rotateX(-Math.PI / 2);
  const rp = roofGeo.attributes.position;
  for (let i = 0; i < rp.count; i++) rp.setY(i, Math.sin(rp.getX(i) * 31) * .032 + rp.getZ(i) * .064);
  roofGeo.computeVertexNormals(); const roof = new THREE.Mesh(roofGeo, roofMat); roof.material.side = THREE.DoubleSide; roof.position.set(0, 3.58, 1.35); scene.add(roof);
  // Gutter shaped as a trough; slow overflow streams down beyond the edge.
  const gutter = new THREE.Mesh(new THREE.CylinderGeometry(.095, .095, 6.55, 14, 1, true, 0, Math.PI), roofMat); gutter.rotation.z = Math.PI / 2; gutter.position.set(0, 3.12, -1.87); scene.add(gutter);

  // Woven retractable sun/rain awning, a short and deliberately calm range of travel.
  const awningGeo = new THREE.PlaneGeometry(5.66, 1, 64, 14); const ap = awningGeo.attributes.position;
  for (let i = 0; i < ap.count; i++) ap.setZ(i, Math.sin(ap.getX(i) * 12.5) * .016 + .035 * Math.sin((ap.getY(i) + .5) * Math.PI));
  awningGeo.computeVertexNormals();
  const awning = new THREE.Mesh(awningGeo, canvasMat); awning.position.set(0, 2.85, -1.32); scene.add(awning);
  const lowerRail = beam(scene, [5.74, .055, .06], [0, 2.6, -1.32], cutWood);
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(.11, .11, 5.72, 20), canvasMat); roll.rotation.z = Math.PI / 2; roll.position.set(0, 3.03, -1.32); scene.add(roll);
  const ropeMat = new THREE.MeshStandardMaterial({ color: 0xa69778, roughness: 1 });
  const rope = cylinderBetween(scene, new THREE.Vector3(.84, 3.04, -1.24), new THREE.Vector3(.84, 1.64, -1.24), .012, ropeMat);
  const ropeLoop = new THREE.Mesh(new THREE.TorusGeometry(.060, .012, 6, 24), ropeMat); ropeLoop.scale.y = 1.75; ropeLoop.position.set(.84, 1.58, -1.24); scene.add(ropeLoop);
  const target = new THREE.Mesh(new THREE.BoxGeometry(.50, 1.8, .4), new THREE.MeshBasicMaterial({ visible: false })); target.position.set(.84, 2.15, -1.24); scene.add(target);
  let opening = .82, requestedOpening = .82;

  // Near handmade terracotta vessel: lathed walls, thick lip, interior and damp shoulder.
  const potProfile = [new THREE.Vector2(.21, 0), new THREE.Vector2(.28, .08), new THREE.Vector2(.40, .40), new THREE.Vector2(.42, .62), new THREE.Vector2(.34, .84), new THREE.Vector2(.29, .89), new THREE.Vector2(.30, .96), new THREE.Vector2(.34, .99), new THREE.Vector2(.35, 1.03), new THREE.Vector2(.30, 1.06), new THREE.Vector2(.26, 1.01), new THREE.Vector2(.255, .90), new THREE.Vector2(.30, .77)];
  const pot = new THREE.Mesh(new THREE.LatheGeometry(potProfile, 56), clay); pot.position.set(1.11, .025, .25); pot.castShadow = true; pot.receiveShadow = true; scene.add(pot);
  const potInside = new THREE.Mesh(new THREE.CircleGeometry(.29, 40), new THREE.MeshStandardMaterial({ color: 0x342c23, roughness: .9 })); potInside.rotation.x = -Math.PI / 2; potInside.position.set(1.11, .79, .25); scene.add(potInside);
  const potRings: THREE.Mesh[] = [];
  for (const y of [.13, .75, .94]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(y === .75 ? .368 : y === .94 ? .292 : .30, .007, 4, 56), clay);
    ring.rotation.x = Math.PI / 2; ring.position.set(1.11, y + .025, .25); scene.add(ring); potRings.push(ring);
  }
  const saucer = new THREE.Mesh(new THREE.CylinderGeometry(.52, .46, .07, 40), clay); saucer.position.set(1.11, .067, .25); scene.add(saucer);

  // Low stool and softly glowing metal lantern at the warm left edge.
  const stool = new THREE.Group(); stool.position.set(-1.6, .06, 1.35);
  beam(stool, [.66, .08, .45], [0, .53, 0], cutWood);
  for (const x of [-.23, .23]) for (const z of [-.13, .13]) {
    const leg = beam(stool, [.07, .51, .08], [x, .27, z], wood); leg.rotation.z = -Math.sign(x) * .11;
  }
  scene.add(stool);
  const lantern = new THREE.Group(); lantern.position.set(-1.60, .65, 1.35);
  const lanternBase = new THREE.Mesh(new THREE.CylinderGeometry(.16, .18, .08, 32), brass); lantern.add(lanternBase);
  const lampGlass = new THREE.Mesh(new THREE.CylinderGeometry(.12, .135, .27, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xe9ddba, roughness: .1, transparent: true, opacity: .20, side: THREE.DoubleSide, metalness: .12 })); lampGlass.position.y = .17; lantern.add(lampGlass);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(.032, .042, .19, 12), new THREE.MeshBasicMaterial({ color: 0xffd59d })); core.position.y = .13; lantern.add(core);
  const top = new THREE.Mesh(new THREE.ConeGeometry(.19, .13, 32), brass); top.position.y = .38; lantern.add(top);
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; cylinderBetween(lantern, new THREE.Vector3(Math.cos(a) * .145, .04, Math.sin(a) * .145), new THREE.Vector3(Math.cos(a) * .145, .33, Math.sin(a) * .145), .014, brass); }
  const handle = new THREE.Mesh(new THREE.TorusGeometry(.115, .009, 5, 24, Math.PI), brass); handle.position.y = .46; lantern.add(handle); scene.add(lantern);

  // Rain curtains are separated through true world depths, with irregular diagonal bands.
  const curtainMats: THREE.ShaderMaterial[] = [];
  for (const [x, z, width, opacity] of [[-32,-69,31,.28],[20,-95,54,.28],[-1,-45,19,.12],[48,-56,24,.26],[-58,-112,44,.33]]) {
    const m = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: opacity } },
      vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: `varying vec2 vUv;uniform float uTime;uniform float uOpacity;${noiseGLSL}
      void main(){float x=vUv.x+vUv.y*.17;float streak=fbm(vec2(x*19.,vUv.y*.8-uTime*.022));float edge=smoothstep(0.,.2,vUv.x)*smoothstep(1.,.79,vUv.x);float base=smoothstep(0.,.07,vUv.y)*smoothstep(1.,.48,vUv.y);float a=(.3+streak*.7)*edge*base*uOpacity;gl_FragColor=vec4(.70,.78,.78,a);#include <colorspace_fragment>}`.replace(';#include', ';\n#include') });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, 30), m); mesh.position.set(x, 13.1, z); mesh.renderOrder = 2; scene.add(mesh); curtainMats.push(m);
  }
  // Near rainfall lives outside the porch. Keep sharp streaks sparse against a soft storm bed.
  const rainCount = 1350, rainGeo = new THREE.BufferGeometry(), rainPos = new Float32Array(rainCount * 6), rainSeeds: number[] = [];
  for (let i = 0; i < rainCount; i++) rainSeeds.push((random() - .5) * 64, random() * 16, -2.35 - random() * 54, .30 + random() * .38);
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
  const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: 0xcbdcda, transparent: true, opacity: .23, depthWrite: false })); rain.frustumCulled = false; rain.renderOrder = 3; scene.add(rain);
  const runoffGeo = new THREE.BufferGeometry(), runoffPos = new Float32Array(46 * 6), runoffSeeds: number[] = [];
  for (let i = 0; i < 46; i++) runoffSeeds.push((random() - .5) * 6.45, random() * 3.1, .06 + random() * .13);
  runoffGeo.setAttribute('position', new THREE.BufferAttribute(runoffPos, 3));
  const runoff = new THREE.LineSegments(runoffGeo, new THREE.LineBasicMaterial({ color: 0xcbd8c6, transparent: true, opacity: .39, depthWrite: false })); runoff.frustumCulled = false; scene.add(runoff);
  // Muted wet glints on the deck edge reinforce shelter and contact with rain.
  const splashGeo = new THREE.RingGeometry(.017, .031, 14), splashMat = new THREE.MeshBasicMaterial({ color: 0xb3c5b8, transparent: true, opacity: .065, depthWrite: false, side: THREE.DoubleSide });
  const splashes = new THREE.InstancedMesh(splashGeo, splashMat, 36); scene.add(splashes);

  // Local contact shading stays soft under overcast light; silhouettes meet the deck.
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext('2d')!;
  const shadowGradient = shadowContext.createRadialGradient(64, 64, 7, 64, 64, 64);
  shadowGradient.addColorStop(0, 'rgba(19,22,18,0.52)'); shadowGradient.addColorStop(.45, 'rgba(19,22,18,0.29)'); shadowGradient.addColorStop(1, 'rgba(19,22,18,0)');
  shadowContext.fillStyle = shadowGradient; shadowContext.fillRect(0, 0, 128, 128);
  const shadowMap = new THREE.CanvasTexture(shadowCanvas);
  const contactMaterial = new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 });
  const contacts: THREE.Mesh[] = [];
  for (const [x, z, width, depth] of [[1.11,.25,1.4,1.2],[-1.6,1.35,1.1,.86],[-2.85,-1.13,.74,.7],[2.85,-1.13,.74,.7]]) {
    const contact = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), contactMaterial); contact.rotation.x = -Math.PI / 2; contact.position.set(x, .033, z); scene.add(contact); contacts.push(contact);
  }
  const raycaster = new THREE.Raycaster();
  function update(time: number, dt: number) {
    skyMat.uniforms.uTime.value = time; grassTime.value = time;
    for (const m of curtainMats) m.uniforms.uTime.value = time;
    opening += (requestedOpening - opening) * Math.min(1, dt * 2.0);
    const drop = .18 + (1 - opening) * .86;
    awning.scale.y = drop; awning.position.y = 3.02 - drop * .5; lowerRail.position.y = 3.02 - drop;
    awning.rotation.y = Math.sin(time * .31) * .003;
    for (let i = 0; i < rainCount; i++) {
      const s = i * 4, k = i * 6, y = (rainSeeds[s + 1] - time * 6.4) % 16;
      const yy = y < 0 ? y + 16 : y, x = rainSeeds[s] + yy * .078;
      rainPos[k] = x; rainPos[k + 1] = yy - .8; rainPos[k + 2] = rainSeeds[s + 2];
      rainPos[k + 3] = x + .031; rainPos[k + 4] = yy + rainSeeds[s + 3] - .8; rainPos[k + 5] = rainSeeds[s + 2] + .018;
    }
    rainGeo.attributes.position.needsUpdate = true;
    for (let i = 0; i < 46; i++) {
      const s = i * 3, k = i * 6, yy = ((runoffSeeds[s + 1] - time * 3.35) % 3.1 + 3.1) % 3.1;
      runoffPos[k] = runoffSeeds[s]; runoffPos[k + 1] = yy; runoffPos[k + 2] = -1.91;
      runoffPos[k + 3] = runoffSeeds[s] + .003; runoffPos[k + 4] = yy + runoffSeeds[s + 2]; runoffPos[k + 5] = -1.92;
    }
    runoffGeo.attributes.position.needsUpdate = true;
    for (let i = 0; i < 36; i++) {
      const phase = (time * .41 + i * .317) % 1;
      dummy.position.set(runoffSeeds[i * 3], .033, -1.66 - ((i * .618) % 1) * .16); dummy.rotation.set(-Math.PI / 2, 0, 0); dummy.scale.setScalar(.25 + phase * 1.1); dummy.updateMatrix(); splashes.setMatrixAt(i, dummy.matrix);
    }
    splashes.instanceMatrix.needsUpdate = true;
  }
  function resize(aspect: number) {
    camera.position.set(aspect < .8 ? .12 : 0, 1.48, 2.45);
    const portrait = aspect < .8;
    const potX = portrait ? .61 : 1.11, potZ = portrait ? -.28 : .25;
    pot.position.set(potX, .025, potZ); potInside.position.set(potX, .79, potZ); saucer.position.set(potX, .067, potZ);
    for (const ring of potRings) { ring.position.x = potX; ring.position.z = potZ; }
    stool.position.set(portrait ? -.39 : -1.6, .06, portrait ? -.05 : 1.35);
    lantern.position.set(portrait ? -.39 : -1.6, .65, portrait ? -.05 : 1.35);
    contacts[0].position.set(potX, .033, potZ); contacts[1].position.set(portrait ? -.39 : -1.6, .033, portrait ? -.05 : 1.35);
    warmFill.position.set(portrait ? -.39 : -1.55, 1.20, portrait ? -.05 : 1.7);
    camera.fov = aspect < .8 ? 62 : 56; camera.near = .08; camera.far = 420;
    camera.lookAt(aspect < .8 ? -.10 : 0, aspect < .8 ? 1.78 : 1.90, -27); camera.updateProjectionMatrix();
  }
  update(0, 0); resize(camera.aspect);
  return {
    update, resize,
    interact(x, y, explicit = false, immediate = false) {
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      if (!explicit && raycaster.intersectObjects([target, awning, lowerRail, rope, ropeLoop], false).length === 0) return null;
      requestedOpening = requestedOpening > .6 ? .26 : .90;
      if (immediate) opening = requestedOpening;
      return { action: 'awning', value: requestedOpening };
    },
  };
};
