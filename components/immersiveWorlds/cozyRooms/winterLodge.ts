import * as THREE from 'three';
import type { WorldBuild } from './contracts';
import { wood, stone, fabric, rough, rounded } from './materials';

// Original procedural geometry. The window is a real opening into layered 3D
// terrain; no landscape image, outside village or snow-globe camera is used.
export function createWinterLodgeWorld(): WorldBuild {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#93b3cd');
  scene.fog = new THREE.Fog('#94acc1', 25, 135);
  const camera = new THREE.PerspectiveCamera(51, 1, 0.06, 180);
  const oak = wood('#6c452b', 3);
  const endgrain = wood('#412e23', 2);
  const floorWood = wood('#74553d', 3);
  const brass = new THREE.MeshStandardMaterial({ color: '#af8c52', metalness: .72, roughness: .3 });
  const iron = rough('#292d2c', .76);
  const snowMat = new THREE.MeshStandardMaterial({color:'#d6e5ec',roughness:.95,emissive:'#5b7283',emissiveIntensity:.18});
  const blanketMaterial = fabric('#777261', 6); blanketMaterial.bumpScale=.003;
  const mossWeave = fabric('#5f6653', 7);
  const tableMat = wood('#694935', 3);
  const v = new THREE.Vector3();
  let lampOn = true;
  let cupResponse = 0;
  let logResponse = 0;
  let timeNow = 0;
  const ambient = new THREE.HemisphereLight('#bed7ed', '#66452f', 1.0);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight('#bcd6ee', 2.15);
  sun.position.set(-10, 19, -30); sun.target.position.set(0, 0, -3);
  sun.castShadow=true; sun.shadow.mapSize.set(1536,1536); sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-8;sun.shadow.camera.near=1;sun.shadow.camera.far=70;sun.shadow.bias=-.00025;sun.shadow.normalBias=.025;sun.shadow.radius=3;
  scene.add(sun, sun.target);
  const interior = new THREE.PointLight('#ffce8f', 28, 14, 2);
  interior.position.set(-1.45, 2.4, .4); scene.add(interior);

  function box(w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene, bevel = .018) {
    const m = rounded(w, h, d, Math.min(bevel, w / 5, h / 5, d / 5), mat);
    m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  }
  function sphere(sx: number, sy: number, sz: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), mat);
    m.scale.set(sx, sy, sz); m.position.set(x, y, z); m.receiveShadow = true; parent.add(m); return m;
  }
  function cylinder(rt: number, rb: number, h: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene, segments = 24) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segments), mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  }
  function rod(a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D = scene) {
    const m = cylinder(radius, radius * 1.18, a.distanceTo(b), mat, 0, 0, 0, parent, 8);
    m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); return m;
  }
  function seeded(seed: number) { let n = seed >>> 0; return () => { n = (1664525 * n + 1013904223) >>> 0; return n / 4294967296; }; }
  const random = seeded(30410);

  // Broad boards have fine grooves and independently varying grain orientation.
  for (let i = 0; i < 24; i++) {
    const x = -4.4 + i * .38;
    const pl = box(.37, .07, 11, floorWood, x, -.07, -.6);
    if (i % 2) pl.rotation.y = Math.PI;
    for (let j = 0; j < 3; j++) {
      box(.008, .009, .09, iron, x - .125, -.029, -4.2 + j * 3.4);
    }
  }
  // Board-and-batten walls stop at the actual window opening.
  const plaster = rough('#aa9479', .97);
  box(9.3, .77, .24, plaster, 0, .385, -5);
  box(9.3, .52, .24, plaster, 0, 4.13, -5);
  box(.65, 3.15, .24, plaster, -4.24, 2.31, -5);
  box(1.62, 3.15, .24, plaster, 3.78, 2.31, -5);
  box(.22, 4.6, 10.2, plaster, -4.62, 2.15, -.1);
  box(.22, 4.6, 10.2, plaster, 4.62, 2.15, -.1);
  box(9.3, .18, 10.2, wood('#6c523a', 2), 0, 4.46, -.1);
  for (let i = 0; i < 6; i++) box(9.22, .12, .13, oak, 0, .13 + i * .115, -4.835);
  for (const x of [-4.47, 4.47]) for (let k = 0; k < 6; k++) box(.15, .116, 9.8, oak, x, .15 + k * .115, -.1);
  for (const z of [-4.95, -.3, 3.8]) box(9.4, .25, .27, endgrain, 0, 4.2, z);
  for (const x of [-4.48, 2.99]) box(.29, 4.4, .37, oak, x, 2.17, -4.71, scene, .045);

  const winCenter = -.69, winWidth = 7.04;
  const frameZ = -4.78;
  for (const x of [winCenter - winWidth / 2, winCenter + winWidth / 2]) box(.18, 3.2, .31, oak, x, 2.3, frameZ);
  for (const y of [.77, 3.87]) box(winWidth + .16, .17, .34, oak, winCenter, y, frameZ);
  box(7.56, .16, .69, tableMat, winCenter, .7, -4.55, scene, .045);
  // Asymmetric wide panes retain an uninterrupted landscape in portrait.
  for (const x of [-2.83, 1.23]) {
    box(.065, 2.98, .17, endgrain, x, 2.3, -4.77);
    box(.025, 2.98, .035, rough('#b0956c', .4), x - .05, 2.3, -4.67);
  }
  const glass = new THREE.MeshPhysicalMaterial({ color: '#bcdae0', roughness: .08, metalness: .1, transparent: true, opacity: .035, depthWrite: false, side: THREE.DoubleSide });
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(7, 3.02), glass);
  pane.position.set(winCenter, 2.3, -4.84); pane.renderOrder = 8; scene.add(pane);
  // Frost catches only the cold pane margins, never an opaque window overlay.
  const frostCanvas = document.createElement('canvas'); frostCanvas.width = 512; frostCanvas.height = 256;
  const fc = frostCanvas.getContext('2d')!;
  for (let i = 0; i < 430; i++) {
    const x = random() * 512; const edge = random() < .76;
    const y = edge ? 252 - random() ** 3 * 33 : random() ** 3 * 10;
    const radius = 1.5 + random() * 9;
    const grad = fc.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, `rgba(226,243,249,${.025 + random() * .12})`); grad.addColorStop(1, 'rgba(226,243,249,0)');
    fc.fillStyle = grad; fc.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  const frostMap = new THREE.CanvasTexture(frostCanvas); frostMap.colorSpace = THREE.SRGBColorSpace;
  const frost = new THREE.Mesh(new THREE.PlaneGeometry(6.98, 3.01), new THREE.MeshBasicMaterial({ map: frostMap, transparent: true, depthWrite: false, opacity: .6 }));
  frost.position.set(winCenter, 2.3, -4.72); frost.renderOrder = 9; scene.add(frost);
  // Blackened brass latch is close enough to reveal real thickness.
  box(.05, .23, .055, brass, 1.31, 1.62, -4.57);
  box(.15, .045, .065, brass, 1.36, 1.68, -4.52);

  // Undulating snowfield, with a dark creek cut concealed behind the nearer bank.
  const fieldGeom = new THREE.PlaneGeometry(130, 125, 60, 54); fieldGeom.rotateX(-Math.PI / 2);
  const fp = fieldGeom.attributes.position;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i), z = fp.getZ(i) - 68;
    fp.setXYZ(i, x, -.26 + .25 * Math.sin(x * .12 + z * .18) + .11 * Math.cos(x * .23 - z * .1), z);
  }
  fieldGeom.computeVertexNormals(); const ground = new THREE.Mesh(fieldGeom, snowMat); ground.receiveShadow = true; scene.add(ground);
  // Jagged swept ridgelines carry quiet variation rather than repeated cones.
  function mountain(z: number, height: number, color: string, seed: number) {
    // Indexed, smoothly shaded alpine surfaces, rather than disconnected ridge
    // triangles. Their whole slopes exist in depth and dissolve into cold haze.
    const geo=new THREE.PlaneGeometry(155,27,138,26);geo.rotateX(-Math.PI/2);
    const p=geo.attributes.position, colors:number[]=[];
    const base=new THREE.Color(color), snowColor=new THREE.Color('#c4d6e1');
    for(let i=0;i<p.count;i++){
      const x=p.getX(i), t=(p.getZ(i)+13.5)/27;
      const crest=height*(.42+.20*Math.sin(x*.071+seed)+.13*Math.sin(x*.139+seed*.35)+.065*Math.cos(x*.32+seed));
      const fold=.27*Math.sin(x*.21+t*7)+.12*Math.cos(x*.41-t*11);
      const y=-2+(crest+2)*Math.pow(1-t,.79)+fold*Math.sin(t*Math.PI);
      p.setXYZ(i,x,y,z+p.getZ(i));
      const col=base.clone().lerp(snowColor,Math.max(0,(1-t)*.30-.06));
      colors.push(col.r,col.g,col.b);
    }
    geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();
    const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,side:THREE.DoubleSide}));scene.add(mesh);
  }
  mountain(-114, 26, '#a6bdcf', 11); mountain(-91, 21, '#8ca9bf', 20); mountain(-69, 16, '#7894ad', 38);

  // Original bent evergreen limbs with an opaque needle-bearing core and
  // irregular, overlapping snow. Continuous spiral growth avoids whorl stacks.
  const treeCount=56,boughsPerTree=72,boughCount=treeCount*boughsPerTree;
  const branchVertices:number[]=[];
  const branchRadius=(t:number)=>.225*Math.pow(1-t,.77)*(.68+.32*Math.sin(Math.min(1,t*4)*Math.PI/2));
  const droop=(t:number)=>-.24*t-.105*Math.sin(t*Math.PI);
  const radial=9, longitudinal=11;
  function surface(t:number,a:number){
    const r=branchRadius(t)*(1+.075*Math.sin(t*37+a*3));
    return new THREE.Vector3(Math.cos(a)*r,droop(t)+Math.sin(a)*r*.68,t);
  }
  function tri(a:THREE.Vector3,b:THREE.Vector3,c:THREE.Vector3){branchVertices.push(a.x,a.y,a.z,b.x,b.y,b.z,c.x,c.y,c.z);}
  for(let j=0;j<longitudinal;j++)for(let k=0;k<radial;k++){
    const t0=j/longitudinal,t1=(j+1)/longitudinal,a0=k/radial*Math.PI*2,a1=(k+1)/radial*Math.PI*2;
    const p0=surface(t0,a0),p1=surface(t0,a1),p2=surface(t1,a0),p3=surface(t1,a1);tri(p0,p2,p1);tri(p1,p2,p3);
  }
  // Thick sprays follow the branch envelope, with needle tips of mixed lengths.
  for(let j=0;j<76;j++){
    const t=.035+random()*.9,a=random()*Math.PI*2,at=surface(t,a);
    const tip=at.clone().add(new THREE.Vector3(Math.cos(a)*(.036+random()*.045),Math.sin(a)*.058-.013,.02+random()*.055));
    tri(at.clone().add(new THREE.Vector3(.012,0,-.027)),at.clone().add(new THREE.Vector3(-.012,.018,.012)),tip);
    tri(at.clone().add(new THREE.Vector3(0,-.013,-.022)),at.clone().add(new THREE.Vector3(0,.023,.015)),tip);
  }
  const boughGeo=new THREE.BufferGeometry();boughGeo.setAttribute('position',new THREE.Float32BufferAttribute(branchVertices,3));boughGeo.computeVertexNormals();
  // The snow cap bends and tapers with its supporting limb. Uneven thickness
  // exposes dark foliage gaps, instead of floating oval discs above naked poles.
  const snowGeo=new THREE.SphereGeometry(1,14,9);const sp=snowGeo.attributes.position;
  for(let i=0;i<sp.count;i++){
    const ox=sp.getX(i),oy=sp.getY(i),oz=sp.getZ(i),t=.13+(oz+1)*.385;
    const width=branchRadius(t)*.99;
    const wav=1+.12*Math.sin(t*25+ox*7)+.06*Math.cos(t*43);
    sp.setXYZ(i,ox*width*wav,droop(t)+branchRadius(t)*.49+.067+oy*(.064+.042*Math.sin(t*9)**2),t);
  }
  snowGeo.computeVertexNormals();
  const foliage=new THREE.InstancedMesh(boughGeo,new THREE.MeshStandardMaterial({color:'#315b60',roughness:1,side:THREE.DoubleSide}),boughCount);
  const snowBoughs=new THREE.InstancedMesh(snowGeo,snowMat,boughCount);
  const trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.045,.11,1,8),rough('#50625d',1),treeCount);
  const dummy=new THREE.Object3D();let bi=0;
  for(let i=0;i<treeCount;i++){
    const row=Math.floor(i/16), x=-37+(i%16)*4.9+(random()-.5)*3.4;
    const z=-18-row*13-random()*9,h=3.8+random()*4.8,lean=(random()-.5)*.11,spread=.255+random()*.068;
    dummy.position.set(x,h*.48,z);dummy.rotation.set(lean*.2,0,lean);dummy.scale.set(1,h*.98,1);dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);
    for(let j=0;j<boughsPerTree;j++){
      const t=.026+j/(boughsPerTree-1)*.974;
      const angle=j*2.399963+i*.81+(random()-.5)*.49;
      const len=Math.max(.1,Math.pow(1-t,.79)*h*spread*(.82+random()*.35));
      const cy=.28+t*(h-.32)+(random()-.5)*.105;
      dummy.position.set(x+lean*cy,cy,z);
      dummy.rotation.set(-.16+random()*.15,angle,(random()-.5)*.11);
      dummy.scale.set(len*(.85+random()*.26),len*(1.05+random()*.32),len);dummy.updateMatrix();foliage.setMatrixAt(bi,dummy.matrix);
      // Asymmetric snow coverage varies between adjacent boughs; all snow is
      // physically supported by the branch body even where the tips are bare.
      const frostScale=.73+random()*.25;dummy.scale.x*=frostScale;dummy.scale.y*=.93+random()*.12;dummy.updateMatrix();snowBoughs.setMatrixAt(bi,dummy.matrix);bi++;
    }
  }
  scene.add(foliage,snowBoughs,trunks);

  // Uneven nearby snow-laden bare branches frame the broad distant forest.
  const bark = wood('#484842', 4);
  const branches = [
    [new THREE.Vector3(-5.4, -.2, -10), new THREE.Vector3(-4.9, 6.5, -10.7)],
    [new THREE.Vector3(-5.1, 2.5, -10.3), new THREE.Vector3(-2.4, 4.5, -11.3)],
    [new THREE.Vector3(-5, 3.4, -10.5), new THREE.Vector3(-6.9, 5.3, -11.3)],
  ];
  for (const [a,b] of branches) {
    rod(a,b,.065,bark);
    for (let j=0;j<5;j++) {
      const at=a.clone().lerp(b,.23+j*.15), end=at.clone().add(new THREE.Vector3(.45+random()*.6,.42+random()*.6,(random()-.5)*.8));
      rod(at,end,.013,bark);
      const snowline=rod(at.clone().add(v.set(0,.024,0)),end.clone().add(v.set(0,.024,0)),.027,snowMat); snowline.scale.y=.91;
    }
  }

  // A wool blanket lies over the seated viewer's knees, with long folded edge.
  const blanketGeo = new THREE.PlaneGeometry(2.7, 3.7, 82, 104); blanketGeo.rotateX(-Math.PI / 2);
  const bp = blanketGeo.attributes.position;
  function blanketY(x: number, z: number) { return .97 + .037 * Math.sin(x * 5.7 + z * .7) + .019 * Math.sin(x * 13.8 - z * 1.8) + .055 * Math.exp(-Math.pow(x-.38,2)*4) - .18 * Math.max(0, -z - .5); }
  for (let i = 0; i < bp.count; i++) { const x = bp.getX(i), z = bp.getZ(i); bp.setXYZ(i, x, blanketY(x,z), z + 1.3); }
  blanketGeo.computeVertexNormals(); const blanket = new THREE.Mesh(blanketGeo, blanketMaterial); blanket.receiveShadow = true; blanket.castShadow = true; scene.add(blanket);
  // Woven narrow bands follow the same deformed cloth surface.
  for (const bandX of [-.89, -.75, .71, .84]) {
    const g = new THREE.PlaneGeometry(.035, 3.67, 2, 90); g.rotateX(-Math.PI/2); const p=g.attributes.position;
    for(let i=0;i<p.count;i++){ const x=p.getX(i)+bandX,z=p.getZ(i); p.setXYZ(i,x,blanketY(x,z)+.006,z+1.3); } g.computeVertexNormals();
    scene.add(new THREE.Mesh(g,mossWeave));
  }
  for (let i = 0; i < 38; i++) {
    const x = -1.19 + i * .064;
    const a = new THREE.Vector3(x, blanketY(x,-1.84), -.54), b = a.clone().add(new THREE.Vector3(.014*Math.sin(i),-.11,.035));
    rod(a,b,.008,blanketMaterial);
  }
  // Curving armchair sides bracket, but do not close off, the lower view.
  const chairMat = fabric('#443f37', 5);
  for (const x of [-1.38, 1.38]) {
    const arm = box(.24,.28,2.13,chairMat,x,.7,2.4,scene,.1); arm.rotation.x = -.045;
    box(.10,.2,1.92,oak,x,.51,2.42,scene,.04);
  }

  // Side table is deliberately near: ceramic thickness, coffee meniscus and
  // rolled lip remain legible on a phone instead of becoming miniature props.
  const table = new THREE.Group(); table.position.set(-1.49,0,.68); scene.add(table);
  cylinder(.53,.55,.075,tableMat,0,.8,0,table,48);
  cylinder(.052,.072,.76,endgrain,0,.39,0,table);
  for(let i=0;i<3;i++){ const a=i*Math.PI*2/3; rod(new THREE.Vector3(0,.15,0),new THREE.Vector3(Math.sin(a)*.43,.035,Math.cos(a)*.43),.028,endgrain,table); }
  const cupGroup = new THREE.Group(); cupGroup.position.set(.1,.85,.15); table.add(cupGroup);
  const ceramic = new THREE.MeshPhysicalMaterial({ color:'#ccbeb0', roughness:.23, metalness:.025, clearcoat:.34, clearcoatRoughness:.2 });
  const profile = [new THREE.Vector2(.125,0),new THREE.Vector2(.137,.016),new THREE.Vector2(.152,.20),new THREE.Vector2(.147,.225),new THREE.Vector2(.130,.225),new THREE.Vector2(.133,.201),new THREE.Vector2(.121,.033),new THREE.Vector2(0,.03)];
  const cup = new THREE.Mesh(new THREE.LatheGeometry(profile,40),ceramic); cup.userData.cozyAction='cup'; cup.castShadow=true; cupGroup.add(cup);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(.09,.022,10,28,Math.PI*1.6),ceramic); handle.position.set(-.17,.12,0); handle.rotation.z=-Math.PI*.8; handle.userData.cozyAction='cup'; cupGroup.add(handle);
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(.128,40), new THREE.MeshPhysicalMaterial({ color:'#352019',roughness:.14,metalness:.17,clearcoat:1 })); coffee.rotation.x=-Math.PI/2; coffee.position.y=.199; cupGroup.add(coffee);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(.139,.009,8,40),ceramic); lip.rotation.x=Math.PI/2; lip.position.y=.219; cupGroup.add(lip);
  cylinder(.205,.205,.018,rough('#9b8973',.9),.1,.847,.15,table,40);
  // Steam uses softened ribbons in space and never a stack of white cylinders.
  const steamMat = new THREE.MeshBasicMaterial({ color:'#ebddcb',transparent:true,opacity:.055,side:THREE.DoubleSide,depthWrite:false });
  const steam: THREE.Mesh[]=[];
  for(let n=0;n<3;n++) {
    const g=new THREE.PlaneGeometry(.035,.47,1,18), p=g.attributes.position;
    for(let j=0;j<p.count;j++){const y=p.getY(j);p.setX(j,p.getX(j)+Math.sin(y*13+n)*.025);}
    const m=new THREE.Mesh(g,steamMat);m.position.set(.08+n*.032,1.28,.15);m.rotation.y=n;table.add(m);steam.push(m);
  }

  // Brass stem and linen shade cast a local warm pool over the lap and table.
  const lamp = new THREE.Group(); lamp.position.set(-1.82,0,-.05); scene.add(lamp);
  cylinder(.23,.25,.048,brass,0,.032,0,lamp,40);
  cylinder(.017,.020,1.59,brass,0,.83,0,lamp,20);
  const shadeMat = new THREE.MeshStandardMaterial({ color:'#dbc9a5',emissive:'#ffba61',emissiveIntensity:.32,side:THREE.DoubleSide,roughness:.92 });
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(.22,.39,.51,48,1,true),shadeMat);shade.position.y=1.79;shade.userData.cozyAction='lamp';shade.castShadow=true;lamp.add(shade);
  const shadeLinen=fabric('#d1b58c',6);
  for(let i=0;i<32;i++){const a=i*Math.PI/16;rod(new THREE.Vector3(Math.sin(a)*.388,1.535,Math.cos(a)*.388),new THREE.Vector3(Math.sin(a)*.219,2.045,Math.cos(a)*.219),.0026,shadeLinen,lamp);}
  for(const [y,r] of [[1.535,.388],[2.045,.22]]) {const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.009,7,48),brass);rim.rotation.x=Math.PI/2;rim.position.y=y;lamp.add(rim);}
  const bulb=sphere(.065,.09,.065,new THREE.MeshBasicMaterial({color:'#ffdaa0'}),0,1.74,0,lamp);
  const lampLight=new THREE.PointLight('#ffc37c',17,6,2); lampLight.position.set(0,1.66,.04);lamp.add(lampLight);
  const switchMesh=box(.075,.09,.055,brass,.03,1.28,.024,lamp);switchMesh.userData.cozyAction='lamp';

  // Side fireplace: weathered irregular masonry, soot, split logs and embers.
  const hearth = new THREE.Group(); hearth.position.set(3.1,0,-1.94); hearth.rotation.y=-.37; scene.add(hearth);
  const hearthStone=stone('#786e5e',4), paleStone=stone('#938b7a',3), darkStone=stone('#4c4841',4);
  box(1.88,.12,1.07,hearthStone,0,.06,.05,hearth,.04);
  box(1.65,2.82,.62,darkStone,0,1.48,-.25,hearth,.04);
  const cavity=box(1.16,1.1,.025,rough('#161612',1),0,.75,.087,hearth);cavity.castShadow=false;
  for (let row=0;row<9;row++) for(const side of [-1,1]) {
    const m=box(.28+random()*.075,.24+random()*.022,.48,random()>.5?hearthStone:paleStone,side*(.716+random()*.018),.25+row*.274,.026+(random()-.5)*.03,hearth,.038);
    m.rotation.z=(random()-.5)*.035;
  }
  for(let row=0;row<5;row++){let x=-.815;const count=row%2?3:4;const widths=Array.from({length:count},()=>.7+random()*.6);const sum=widths.reduce((a,b)=>a+b,0);for(const fraction of widths){const w=fraction/sum*1.63;const st=box(w-.022,.238+random()*.015,.39,random()>.6?paleStone:hearthStone,x+w/2,1.53+row*.26,.07+(random()-.5)*.025,hearth,.025);st.rotation.z=(random()-.5)*.017;x+=w;}}
  box(1.76,.13,.78,wood('#5b3d2a',3),0,1.47,.09,hearth,.04);
  box(1.30,.11,.59,rough('#282721',.9),0,.24,.17,hearth);
  const charred=wood('#282019',5);
  for(let i=0;i<5;i++) {
    const log=cylinder(.075,.087,.62,charred,(i-2)*.17,.36+(i%2)*.1,.27,hearth,9);log.rotation.z=Math.PI/2;log.rotation.y=-.4+i*.27;log.userData.cozyAction='log';
    for(let j=0;j<3;j++){
      const ember=sphere(.012,.006,.021,new THREE.MeshBasicMaterial({color:j%2?'#ce5719':'#e88a31'}),(i-2)*.17-.12+j*.1,.425+(i%2)*.1,.28,hearth);ember.userData.cozyAction='log';
    }
  }
  const fireMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{uTime:{value:0}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 vUv;uniform float uTime;void main(){vec2 p=vUv;float sway=.04*sin(uTime*1.4+p.y*8.)+.03*sin(uTime*.8-p.y*13.);float shape=abs(p.x-.5-sway);float w=.34*pow(1.-p.y,1.5);float a=smoothstep(w,w-.10,shape)*smoothstep(.0,.08,p.y)*smoothstep(1.,.77,p.y);float core=smoothstep(w*.7,.0,shape)*(1.-p.y);vec3 c=mix(vec3(.87,.16,.013),vec3(1.,.64,.15),core);gl_FragColor=vec4(c,a*.68);}`});
  const flamePlanes:THREE.Mesh[]=[];
  for(let i=0;i<5;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(.23,.56-i%2*.12),fireMat);m.position.set(-.36+i*.18,.61+(i%2)*.04,.31);m.rotation.y=(i-2)*.13;hearth.add(m);flamePlanes.push(m);}
  const fireLight=new THREE.PointLight('#ff9d49',8,5,2);fireLight.position.set(0,.77,.63);hearth.add(fireLight);
  // Mantel still-life, asymmetric and small: a closed book and two pine cones.
  const book=box(.41,.07,.29,fabric('#676650',4),-.39,1.57,.15,hearth);book.rotation.y=.09;
  for(let n=0;n<2;n++){
    const group=new THREE.Group();group.position.set(.4+n*.16,1.59,.16+n*.04);group.rotation.z=.2-n*.4;hearth.add(group);
    sphere(.067,.11,.062,rough('#604631',.92),0,.08,0,group);
    for(let i=0;i<24;i++){const a=i*2.4,y=(i/24)*.18;const flake=sphere(.03,.012,.039,endgrain,Math.sin(a)*.054,y,Math.cos(a)*.054,group);flake.rotation.z=Math.sin(a)*.4;}
  }
  // Split wood in a low wrought-iron cradle beside the stone hearth.
  const woodBin=new THREE.Group();woodBin.position.set(2.28,.07,-.9);woodBin.rotation.y=-.22;scene.add(woodBin);
  for(let i=0;i<6;i++){const log=cylinder(.07,.085,.46,wood('#6b4b31',3),-.16+(i%3)*.16,.08+Math.floor(i/3)*.13,0,woodBin,8);log.rotation.x=Math.PI/2;}
  for(const x of [-.28,.28]){rod(new THREE.Vector3(x,.01,-.29),new THREE.Vector3(x,.39,-.19),.014,iron,woodBin);rod(new THREE.Vector3(x,.01,.29),new THREE.Vector3(x,.39,.19),.014,iron,woodBin);}

  // Snow always remains outside the glazing and is visible at varied depths.
  const snowCount=165, snowPos=new Float32Array(snowCount*3), snowSeeds:number[]=[];
  for(let i=0;i<snowCount;i++){snowSeeds.push(random());snowPos[i*3]=-18+random()*36;snowPos[i*3+1]=random()*13;snowPos[i*3+2]=-7-random()*35;}
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(snowPos,3));
  const snowDot=document.createElement('canvas');snowDot.width=snowDot.height=32;const sc=snowDot.getContext('2d')!;const grd=sc.createRadialGradient(16,16,0,16,16,16);grd.addColorStop(0,'rgba(255,255,255,.8)');grd.addColorStop(.42,'rgba(255,255,255,.7)');grd.addColorStop(1,'rgba(255,255,255,0)');sc.fillStyle=grd;sc.fillRect(0,0,32,32);
  const snowMap=new THREE.CanvasTexture(snowDot);const snow=new THREE.Points(sg,new THREE.PointsMaterial({color:'#e8f5ff',size:.055,sizeAttenuation:true,transparent:true,opacity:.68,map:snowMap,depthWrite:false}));scene.add(snow);

  function resize(aspect:number) {
    camera.aspect=aspect;
    const portrait=aspect<.8;table.position.set(portrait?-1.0:-1.49,0,portrait?-.95:.68);lamp.position.set(portrait?-1.15:-1.82,0,portrait?-1.8:-.05);
    interior.position.set(portrait?-.9:-1.45,2.4,portrait?-1.2:.4);
    if(aspect<.8){camera.fov=56;camera.position.set(-.27,1.72,3.3);camera.lookAt(-.53,1.54,-3.2);}
    else if(aspect<1.25){camera.fov=53;camera.position.set(-.13,1.71,3.56);camera.lookAt(-.14,1.57,-3.5);}
    else{camera.fov=50;camera.position.set(.06,1.73,3.52);camera.lookAt(-.08,1.52,-3.6);}
    camera.updateProjectionMatrix();
  }
  resize(1.6);
  return {
    scene,camera,resize,
    update(time:number,dt:number){
      timeNow=time;cupResponse=Math.max(0,cupResponse-dt*.55);logResponse=Math.max(0,logResponse-dt*.8);
      fireMat.uniforms.uTime.value=time;
      fireLight.intensity=8+Math.sin(time*1.9)*.24+Math.sin(time*3.1)*.12+logResponse*.65;
      lampLight.intensity=lampOn?17:3.2;shadeMat.emissiveIntensity=lampOn?.32:.055;bulb.visible=lampOn;
      interior.intensity=lampOn?28:19;
      cupGroup.rotation.z=Math.sin(cupResponse*Math.PI)*.012;
      steam.forEach((m,i)=>{m.position.x=.08+i*.032+Math.sin(time*.22+i)*.014;m.rotation.y=i+Math.sin(time*.16+i)*.18;});
      const p=sg.attributes.position as THREE.BufferAttribute;
      for(let i=0;i<snowCount;i++){
        p.setY(i,((snowSeeds[i]*13-time*(.09+snowSeeds[i]*.12))%13+13)%13);
        p.setX(i,snowPos[i*3]+Math.sin(time*.14+snowSeeds[i]*17)*dt*.022);
      }
      p.needsUpdate=true;
      flamePlanes.forEach((m,i)=>{m.scale.y=1+Math.sin(time*.8+i)*.026;});
    },
    interact(action:string){
      if(action==='lamp'){lampOn=!lampOn;lampLight.intensity=lampOn?17:3.2;shadeMat.emissiveIntensity=lampOn?.32:.055;bulb.visible=lampOn;interior.intensity=lampOn?28:19;return{type:'lamp',intensity:lampOn?.24:.16};}
      if(action==='cup'){cupResponse=1;return{type:'cup',intensity:.12};}
      if(action==='log'){logResponse=1;fireLight.intensity=8.65;fireMat.uniforms.uTime.value=timeNow+.08;return{type:'log',intensity:.18};}
      return null;
    },
  };
}
