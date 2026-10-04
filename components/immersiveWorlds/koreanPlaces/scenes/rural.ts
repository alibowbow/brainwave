import * as THREE from 'three';
import type { SceneContent } from '../types';

/** Original spatial interpretation of the approved rural-ghibli-v9 composition.
 * All forms, textures and animation below are authored procedurally for this scene.
 * The image is a composition reference only; it is never rendered as the world.
 */
export function createRuralScene(): SceneContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#143b68');
  scene.fog = new THREE.FogExp2('#244f64', 0.0055);
  scene.userData.exposure = 1.08;
  const camera = new THREE.PerspectiveCamera(55, 1, 0.08, 300);
  const random = seeded(18073);
  const gradient = new THREE.DataTexture(new Uint8Array([75, 126, 186, 244]), 4, 1, THREE.RedFormat);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  const toon = (color: THREE.ColorRepresentation, extra: THREE.MeshToonMaterialParameters = {}) =>
    new THREE.MeshToonMaterial({ color, gradientMap: gradient, ...extra });
  const basic = (color: THREE.ColorRepresentation, extra: THREE.MeshBasicMaterialParameters = {}) =>
    new THREE.MeshBasicMaterial({ color, ...extra });
  const material = {
    soil: toon('#203f31'), road: toon('#7c8771'), wall: toon('#adad83'),
    wood: toon('#354e43'), roof: toon('#354d69'), ridge: toon('#577080'),
    dark: toon('#182c31'), pole: toon('#707364'), metal: toon('#394548'),
    rice: toon('#8fab66', { vertexColors: true, side: THREE.DoubleSide }),
    leaf: toon('#567d46', { vertexColors: true, side: THREE.DoubleSide }),
    window: basic('#ffc86c', { toneMapped: false }),
  };
  scene.add(new THREE.HemisphereLight('#bed5ec', '#29412f', 2.2));
  const moonlight = new THREE.DirectionalLight('#b7d0f0', 2.4);
  moonlight.position.set(-24, 45, 20);
  scene.add(moonlight);
  const blueFill = new THREE.DirectionalLight('#709bbc', 0.7);
  blueFill.position.set(30, 12, -25);
  scene.add(blueFill);

  // Atmosphere encloses the viewer. Its gradient is a 3D sky, independent of the
  // cloud geometry, tree silhouettes and ground geometry in front of it.
  const sky = new THREE.Mesh(new THREE.SphereGeometry(180, 32, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    vertexShader: 'varying vec3 vP; void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: `varying vec3 vP; void main(){float h=clamp(normalize(vP).y*1.75,0.,1.);vec3 low=vec3(.19,.36,.49);vec3 high=vec3(.035,.105,.245);gl_FragColor=vec4(mix(low,high,pow(h,.62)),1.);}`,
  }));
  scene.add(sky);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(150, 170), material.soil);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.045, -40);
  ground.receiveShadow = true;
  scene.add(ground);

  function mesh(geometry: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, parent: THREE.Object3D = scene) {
    const result = new THREE.Mesh(geometry, mat);
    result.position.set(x, y, z);
    parent.add(result);
    return result;
  }
  function beam(a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, parent: THREE.Object3D = scene, sides = 7) {
    const delta = b.clone().sub(a);
    const m = mesh(new THREE.CylinderGeometry(radius * 0.88, radius, delta.length(), sides), mat, 0, 0, 0, parent);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
    return m;
  }
  function curve(points: THREE.Vector3[], radius: number, mat: THREE.Material, parent: THREE.Object3D = scene, segments = 24) {
    return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 5, false), mat, 0, 0, 0, parent);
  }

  // The path has an S bend, irregularly scalloped banks, wheel wear and individual
  // inset stones. Perspective comes from real distances, not a painted ground card.
  const pathX = (z: number) => 2.8 * Math.exp(-(((z + 1) / 10) ** 2)) - 1.2 * Math.exp(-(((z + 13) / 5) ** 2)) + 5.5 * Math.exp(-(((z + 29) / 8) ** 2));
  const pathWidth = (z: number) => 1.15 + (z + 32) * 0.007;
  const roadPositions: number[] = [], roadColors: number[] = [], roadIndices: number[] = [];
  for (let i = 0; i <= 110; i++) {
    const z = 18 - i * 0.47, center = pathX(z), width = pathWidth(z);
    for (let side = -1; side <= 1; side += 2) {
      roadPositions.push(center + side * (width + random() * 0.12), 0.002 + random() * 0.007, z);
      const c = new THREE.Color().setHSL(.14, .1, .7 + random() * .12);
      roadColors.push(c.r, c.g, c.b);
    }
    if (i < 110) { const n = i * 2; roadIndices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3); }
  }
  const roadGeometry = makeGeometry(roadPositions, roadColors, roadIndices);
  material.road.vertexColors = true;
  mesh(roadGeometry, material.road);
  const stoneData = new GeometryBuilder();
  for (let i = 0; i < 1200; i++) {
    const z = -31 + random() * 50, lateral = (random() - .5) * 1.92;
    const x = pathX(z) + lateral * pathWidth(z);
    const color = new THREE.Color().setHSL(.15 + random() * .025, .07 + random() * .08, .25 + random() * .24);
    stoneData.groundPatch(x, z, .022, .025 + random() * .23, .04 + random() * .30, color, random);
  }
  mesh(stoneData.geometry(), toon('#bec3ad', { vertexColors: true, side: THREE.DoubleSide }));

  // Rice uses sculpted three-column, curved lanceolate leaves and drooping grain
  // heads. One instanced mesh carries thousands of individual clumps. Bending is
  // rooted and follows a travelling wind field; touching makes only a local bend.
  const ricePositions: THREE.Vector3[][] = [[], []];
  for (let z = 11; z > -43; z -= z > -12 ? .64 : .92) {
    for (let x = -44; x < 44; x += z > -12 && Math.abs(x)<17 ? .64 : .92) {
      const px = x + (random() - .5) * .35, pz = z + (random() - .5) * .35;
      if (Math.abs(px - pathX(pz)) < pathWidth(pz) + .40) continue;
      const row = Math.abs(((pz + 48) % 9) - 4.5);
      if (row < .25) continue;
      ricePositions[pz > -12 && Math.abs(px)<17 ? 0 : 1].push(new THREE.Vector3(px, 0, pz));
    }
  }
  const dummy = new THREE.Object3D();
  ricePositions.forEach((positions,lod)=>{
    const rice = new THREE.InstancedMesh(riceClump(random,lod===0), material.rice, positions.length);
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      const s = (lod===0?.68:.88) + random() * .41;
      dummy.scale.set(s, s * (.85 + random() * .26), s);
      dummy.rotation.set(0, random() * Math.PI * 2, 0);
      dummy.updateMatrix(); rice.setMatrixAt(i, dummy.matrix);
      rice.setColorAt(i, new THREE.Color().setHSL(.23 + random() * .025, .22 + random() * .11, .48 + random() * .15));
    });
    rice.computeBoundingSphere();
    scene.add(rice);
  });
  const wind = { value: 0 }, touch = { value: new THREE.Vector3(1000, 1000, 0) };
  material.rice.onBeforeCompile = shader => {
    shader.uniforms.uRuralTime = wind;
    shader.uniforms.uRuralTouch = touch;
    shader.vertexShader = 'uniform float uRuralTime; uniform vec3 uRuralTouch;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      vec3 rootPosition = vec3(instanceMatrix[3]);
      float bladeHeight = max(0.,position.y);
      float breeze = sin(rootPosition.x*.29+rootPosition.z*.36+uRuralTime*.71)*.038;
      breeze += sin(rootPosition.x*.51-rootPosition.z*.18+uRuralTime*1.13)*.014;
      float touchDistance=length(rootPosition.xz-uRuralTouch.xy);
      float localBend=exp(-touchDistance*touchDistance*.48)*uRuralTouch.z;
      transformed.x += (breeze+localBend*.23)*bladeHeight*bladeHeight;
      transformed.z += (breeze*.57+localBend*.13)*bladeHeight*bladeHeight;
    `);
  };
  material.rice.customProgramCacheKey = () => 'rural-rice-coherent-bend-v1';

  // Uneven field bunds mark quiet paddy plots without turning the landscape into
  // rigid repeating rows. Low leafy weeds soften the road and utility-pole base.
  const bankMaterial = toon('#335439');
  for (const z of [-8, -17, -26, -35]) {
    for (const side of [-1, 1]) {
      const center = pathX(z), edge = center + side * (pathWidth(z) + .22);
      const far = side * 48;
      beam(new THREE.Vector3(edge, .08, z), new THREE.Vector3(far, .08, z + .08), .15, bankMaterial, scene, 6);
    }
  }
  const weeds = new THREE.InstancedMesh(weedClump(random), material.leaf, 390);
  for (let i = 0; i < 390; i++) {
    const z = 12 - random() * 45, side = i % 2 ? 1 : -1;
    dummy.position.set(pathX(z) + side * (pathWidth(z) + .1 + random() * .5), .015, z);
    dummy.rotation.set(0, random() * 6.28, 0);
    dummy.scale.setScalar(.3 + random() * .42); dummy.updateMatrix();
    weeds.setMatrixAt(i, dummy.matrix);
    weeds.setColorAt(i, new THREE.Color().setHSL(.22 + random() * .06, .27, .5 + random() * .18));
  }
  scene.add(weeds);

  // Distant mountains and trees have actual spatial silhouettes. Their overlapping
  // irregular crowns retain the original image's enclosing, wooded countryside.
  for (let layer = 0; layer < 3; layer++) {
    const g = new GeometryBuilder(), z = -99 + layer * 19;
    const ridgeColor = new THREE.Color(['#26455d', '#244c59', '#214d4c'][layer]);
    for (let x = -125; x < 125; x += 3) {
      const height = 8 + Math.sin(x * .05 + layer) * 4 + Math.sin(x * .115 + layer * 2) * 2;
      const h2 = 8 + Math.sin((x + 3) * .05 + layer) * 4 + Math.sin((x + 3) * .115 + layer * 2) * 2;
      g.quad([x,-1,z],[x,height,z],[x+3,h2,z],[x+3,-1,z],ridgeColor);
    }
    mesh(g.geometry(), basic('#ffffff', { vertexColors: true, side: THREE.DoubleSide }));
  }
  const forest = new THREE.Group(); scene.add(forest);
  const canopyGeo = foliageGeometry(random);
  const canopies: { p: THREE.Vector3; scale: THREE.Vector3; color: THREE.Color }[] = [];
  const branches = new GeometryBuilder();
  for (let i = 0; i < 150; i++) {
    const x = -67 + random() * 134;
    const z = -42 - random() * 24;
    const centerMass = Math.exp(-(((x-2)/21) ** 2));
    const h = 4.2 + random() * 6.7 + centerMass * 4.5;
    const trunk = new THREE.Color('#344a39');
    branches.taperedStem(new THREE.Vector3(x,0,z),new THREE.Vector3(x+.25,h*.73,z),.10+.012*h,trunk,5);
    for (let b = 0; b < 7; b++) {
      const a = b * 2.4 + random(), y = h * (.48 + random() * .4);
      const reach = 1.4 + random() * 2.0;
      const tx = x + Math.cos(a) * reach, tz = z + Math.sin(a) * reach;
      branches.taperedStem(new THREE.Vector3(x,y*.78,z), new THREE.Vector3(tx,y,tz), .05, trunk, 4);
      canopies.push({p:new THREE.Vector3(tx,y,tz),scale:new THREE.Vector3(2+random()*1.4,1.6+random()*1.3,1.7+random()),color:new THREE.Color().setHSL(.29+random()*.045,.25+random()*.12,.14+random()*.08)});
    }
    canopies.push({p:new THREE.Vector3(x,h,z),scale:new THREE.Vector3(2.1,2.4,2),color:new THREE.Color().setHSL(.29,.32,.18+random()*.06)});
  }
  mesh(branches.geometry(), toon('#ffffff',{vertexColors:true}),0,0,0,forest);
  const treeMesh = new THREE.InstancedMesh(canopyGeo, toon('#ffffff',{vertexColors:true}), canopies.length);
  canopies.forEach((c,i)=>{dummy.position.copy(c.p);dummy.scale.copy(c.scale);dummy.rotation.set(random()*.3,random()*6.28,random()*.2);dummy.updateMatrix();treeMesh.setMatrixAt(i,dummy.matrix);treeMesh.setColorAt(i,c.color);});
  forest.add(treeMesh);
  // A few taller irregular cedars break the broadleaf skyline above the farmhouse.
  for (let i = 0; i < 7; i++) {
    const pine = cedarGeometry(random,11+random()*5);
    mesh(pine,toon('#21483c',{vertexColors:true}),-9+i*2.8,0,-51-random()*5,forest);
  }

  const house = new THREE.Group();
  house.position.set(6.4,0,-31);
  house.rotation.y = -.12;
  scene.add(house);
  // The farmhouse is timber-framed plaster with a real pitched tiled roof and
  // asymmetrical kitchen extension; warm windows have inset mullions and eaves.
  mesh(new THREE.BoxGeometry(6.7,4.0,4.5),material.wall,0,2.12,0,house);
  mesh(new THREE.BoxGeometry(7.0,.28,4.8),toon('#555d49'),0,.14,0,house);
  const gable = new GeometryBuilder();
  gable.triangle([-3.35,4.12,2.25],[3.35,4.12,2.25],[0,6.2,2.25],new THREE.Color('#a7ab8a'));
  gable.triangle([3.35,4.12,-2.25],[-3.35,4.12,-2.25],[0,6.2,-2.25],new THREE.Color('#a7ab8a'));
  mesh(gable.geometry(),toon('#ffffff',{vertexColors:true,side:THREE.DoubleSide}),0,0,0,house);
  for (const x of [-3.35,0,3.35]) mesh(new THREE.BoxGeometry(.13,4.15,.16),material.wood,x,2.17,2.29,house);
  for (const y of [.48,2.28,4.1]) mesh(new THREE.BoxGeometry(6.75,.13,.13),material.wood,0,y,2.3,house);
  roof(house,0,4.13,0,7.7,5.8,2.2,material.roof,material.ridge,mesh,curve);
  function window(x:number,y:number,z:number,w:number,h:number,parent:THREE.Object3D=house) {
    mesh(new THREE.BoxGeometry(w+.22,h+.2,.14),material.wood,x,y,z,parent);
    mesh(new THREE.PlaneGeometry(w,h),material.window,x,y,z+.083,parent);
    mesh(new THREE.BoxGeometry(.048,h,.04),material.wood,x,y,z+.115,parent);
    mesh(new THREE.BoxGeometry(w,.045,.04),material.wood,x,y+.08,z+.115,parent);
    mesh(new THREE.BoxGeometry(w+.24,.1,.25),material.dark,x,y-h*.5-.07,z+.04,parent);
  }
  window(-2.1,3.08,2.36,1.02,1.17);window(-.3,3.08,2.36,1.20,1.17);window(1.55,3.08,2.36,.68,.95);
  window(.03,4.76,2.3,.92,.88);
  // Lower kitchen light spills onto steps and the soft greenery around the door.
  mesh(new THREE.BoxGeometry(2.7,2.22,2.6),toon('#969c77'),2.45,1.23,2.35,house);
  roof(house,2.45,2.30,2.35,3.4,3.2,.55,material.roof,material.ridge,mesh,curve);
  window(2.57,1.4,3.67,1.36,1.03);
  mesh(new THREE.BoxGeometry(.8,1.78,.14),material.wood,1.05,1.12,3.7,house);
  for(let i=0;i<3;i++) mesh(new THREE.BoxGeometry(2.1+i*.24,.13, .48),toon('#727c66'),1.5,.30-i*.08,3.98+i*.39,house);
  const warm = new THREE.PointLight('#ffb14c',5.5,9,2);warm.position.set(1.8,2.0,4.4);house.add(warm);
  // A dim translucent glow exists only around the windows; it cannot flatten the
  // trees or conceal geometry behind a full-screen bloom/vignette.
  const glow = makeGlowTexture();
  for (const x of [-2.1,-.3,2.6]) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:'#ffc477',transparent:true,opacity:.15,depthWrite:false,blending:THREE.AdditiveBlending}));
    s.position.set(x,x===2.6?1.4:3.08,x===2.6?3.9:2.5);s.scale.set(2.7,2.7,1);house.add(s);
  }
  const shrub = new THREE.InstancedMesh(canopyGeo,toon('#5b7844',{vertexColors:true}),28);
  for(let i=0;i<28;i++) {dummy.position.set(-5+random()*10,.3+random()*.5,3.2+random()*1.8);dummy.scale.set(.6+random()*.5,.5+random()*.5,.65);dummy.rotation.set(0,random()*6.28,0);dummy.updateMatrix();shrub.setMatrixAt(i,dummy.matrix);}
  house.add(shrub);

  // Foreground pole has a tapered shaft, bracket hardware, ceramic insulators,
  // weather lines and sagging overhead conductors, all spatial geometry.
  const pole = new THREE.Group();pole.position.set(5.1,0,-8.5);scene.add(pole);
  const poleShaft = mesh(new THREE.CylinderGeometry(.13,.24,11.7,9),material.pole,0,5.85,0,pole);
  poleShaft.rotation.z=-.017;
  mesh(new THREE.BoxGeometry(1.72,.12,.14),material.wood,0,10.60,.06,pole);
  beam(new THREE.Vector3(-.73,10.52,.04),new THREE.Vector3(0,9.97,.04),.035,material.metal,pole);
  beam(new THREE.Vector3(.73,10.52,.04),new THREE.Vector3(0,9.97,.04),.035,material.metal,pole);
  for(const x of [-.72,.69]) {
    beam(new THREE.Vector3(x,10.58,.06),new THREE.Vector3(x,10.92,.06),.031,material.metal,pole);
    for(let i=0;i<3;i++) mesh(new THREE.CylinderGeometry(.075,.08,.064,10),toon('#839088'),x,10.78+i*.055,.06,pole);
  }
  for(const y of [2.5,7.0,10.25]) {
    const hoop=mesh(new THREE.TorusGeometry(.181,.021,4,9),material.metal,0,y,0,pole);hoop.rotation.x=Math.PI/2;
  }
  for(let i=0;i<6;i++) curve([new THREE.Vector3(-.08+i*.025,.3,.204),new THREE.Vector3(-.03+i*.022,5,.17),new THREE.Vector3(-.1+i*.026,10.1,.125)],.007,toon(i%2?'#91917a':'#494f46'),pole,14);
  const wireMaterial = basic('#152a35');
  // All wire endpoints are in pole coordinates, so portrait composition keeps the
  // actual attachment geometry intact instead of moving disconnected sky lines.
  for(const x of [-.72,.69]) {
    curve([new THREE.Vector3(x,10.94,.06),new THREE.Vector3(x+3,11.7,3),new THREE.Vector3(x+11,18,10)],.014,wireMaterial,pole,35);
    curve([new THREE.Vector3(x,10.94,.06),new THREE.Vector3(x-3,6.5,-12),new THREE.Vector3(x-7.7,6.7,-28)],.014,wireMaterial,pole,44);
    curve([new THREE.Vector3(x,10.94,.06),new THREE.Vector3(x+13,6.1,-10),new THREE.Vector3(x+27,7,-25)],.014,wireMaterial,pole,38);
  }
  // Small receding pole makes the catenary distance legible.
  beam(new THREE.Vector3(-2.7,0,-36.5),new THREE.Vector3(-2.7,6.7,-36.5),.083,material.pole);
  beam(new THREE.Vector3(-3.4,6.5,-36.5),new THREE.Vector3(-2,6.5,-36.5),.04,material.wood);

  // Textured moon: authored basalt-like maria and fine crater rings. No stock image
  // or copied illustration is used. The disk stays geographically behind clouds.
  const moonTexture = makeMoonTexture();
  const moon = mesh(new THREE.PlaneGeometry(7.0,7.0),basic('#fff1bb',{map:moonTexture,transparent:true,depthWrite:false,toneMapped:false}),-12,27,-79);
  moon.lookAt(camera.position);
  const moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:'#ffe4a0',opacity:.15,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  moonHalo.position.copy(moon.position).add(new THREE.Vector3(0,0,-.25));moonHalo.scale.set(15,15,1);scene.add(moonHalo);

  const clouds = new THREE.Group();scene.add(clouds);
  const cloudGeometry = cloudLobeGeometry(random);
  const cloudMaterial = new THREE.MeshBasicMaterial({vertexColors:true});
  const cloudLobes: {x:number;y:number;z:number;sx:number;sy:number;sz:number;color:THREE.Color}[]=[];
  const cloudBanks=[[-45,20,-78,17,10],[-25,12,-87,12,5],[26,18,-79,19,8],[4,31,-93,16,3],[62,15,-91,23,6]];
  for(const [cx,cy,cz,cw,ch] of cloudBanks) {
    for(let i=0;i<28;i++) {
      const x=cx+(random()-.5)*cw*2, edge=Math.max(0,1-Math.abs(x-cx)/cw);
      const y=cy+(random()-.5)*ch*edge;
      cloudLobes.push({x,y,z:cz+(random()-.5)*4,sx:1.6+random()*4,sy:.6+random()*2.3+edge*1.2,sz:.7+random()*1.8,color:new THREE.Color().setHSL(.57,.27,.29+random()*.11)});
    }
  }
  const cloudMesh = new THREE.InstancedMesh(cloudGeometry,cloudMaterial,cloudLobes.length);
  cloudLobes.forEach((c,i)=>{dummy.position.set(c.x,c.y,c.z);dummy.scale.set(c.sx,c.sy,c.sz);dummy.rotation.set(random()*.3,random()*6.28,random()*.35);dummy.updateMatrix();cloudMesh.setMatrixAt(i,dummy.matrix);cloudMesh.setColorAt(i,c.color);});
  clouds.add(cloudMesh);
  // Sparse, dim stars leave the same restful cloud-and-moon identity as the image.
  const stars=new GeometryBuilder();
  for(let i=0;i<54;i++){const x=(random()-.5)*150,y=18+random()*56,z=-113;stars.quad([x-.035,y-.035,z],[x+.035,y-.035,z],[x+.035,y+.035,z],[x-.035,y+.035,z],new THREE.Color('#8da7b7'));}
  mesh(stars.geometry(),basic('#ffffff',{vertexColors:true,side:THREE.DoubleSide}));

  // Nearby rice is the only interaction target. Invisible raycast bounds are
  // intersected analytically and then checked against the actual paddy footprint.
  const raycaster=new THREE.Raycaster(), plane=new THREE.Plane(new THREE.Vector3(0,1,0),-.58), hit=new THREE.Vector3();
  let touchEnergy=0;
  const resize=(aspect:number)=>{
    camera.aspect=aspect;
    const portrait=aspect<.85;
    camera.fov=portrait?61:55;
    camera.position.set(portrait?.1:0,1.56,10.4);
    camera.lookAt(portrait?1.1:.45,portrait?4.3:3.6,-31);
    camera.updateProjectionMatrix();
    house.position.x=portrait?4.1:6.4;
    pole.position.x=portrait?2.9:5.1;
    moon.position.x=portrait?-8.5:-12;
    moon.position.y=portrait?27:27;
    moon.lookAt(camera.position);
    moonHalo.position.copy(moon.position).add(new THREE.Vector3(0,0,-.25));
  };
  resize(1);
  return {
    scene,camera,resize,
    update(time,dt){wind.value=time;clouds.position.x=Math.sin(time*.018)*.55;touchEnergy*=Math.exp(-dt*2.5);touch.value.z=touchEnergy;},
    interact(ndc){
      raycaster.setFromCamera(ndc,camera);
      if(!raycaster.ray.intersectPlane(plane,hit)) return null;
      if(hit.z>10 || hit.z< -7 || Math.abs(hit.x)>13 || Math.abs(hit.x-pathX(hit.z))<pathWidth(hit.z)+.28) return null;
      touchEnergy=.65;touch.value.set(hit.x,hit.z,touchEnergy);
      return {scene:'nature:rural_summer_night',type:'grass',strength:.28,position:[hit.x,.58,hit.z]};
    },
    dispose(){gradient.dispose();glow.dispose();moonTexture.dispose();},
  };
}

function seeded(seed:number){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function makeGeometry(position:number[],color:number[],index:number[]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(position,3));g.setAttribute('color',new THREE.Float32BufferAttribute(color,3));g.setIndex(index);g.computeVertexNormals();return g;}

class GeometryBuilder {
  positions:number[]=[]; colors:number[]=[]; indices:number[]=[];
  vertex(p:number[],c:THREE.Color){const n=this.positions.length/3;this.positions.push(...p);this.colors.push(c.r,c.g,c.b);return n;}
  triangle(a:number[],b:number[],c:number[],color:THREE.Color){const n=this.vertex(a,color);this.vertex(b,color);this.vertex(c,color);this.indices.push(n,n+1,n+2);}
  quad(a:number[],b:number[],c:number[],d:number[],color:THREE.Color){const n=this.vertex(a,color);this.vertex(b,color);this.vertex(c,color);this.vertex(d,color);this.indices.push(n,n+1,n+2,n,n+2,n+3);}
  groundPatch(x:number,z:number,y:number,sx:number,sz:number,color:THREE.Color,random:()=>number){const center=this.vertex([x,y,z],color);const points:number[]=[];for(let i=0;i<6;i++){const a=i/6*Math.PI*2;points.push(this.vertex([x+Math.cos(a)*sx*(.7+random()*.3),y,z+Math.sin(a)*sz*(.7+random()*.3)],color));}for(let i=0;i<6;i++)this.indices.push(center,points[(i+1)%6],points[i]);}
  taperedStem(a:THREE.Vector3,b:THREE.Vector3,r:number,c:THREE.Color,sides:number){const axis=b.clone().sub(a).normalize(),u=new THREE.Vector3(0,0,1).cross(axis).normalize();if(u.lengthSq()<.1)u.set(1,0,0);const v=axis.clone().cross(u);for(let i=0;i<sides;i++){const t=i/sides*Math.PI*2,t1=(i+1)/sides*Math.PI*2;const pa=a.clone().addScaledVector(u,Math.cos(t)*r).addScaledVector(v,Math.sin(t)*r),pb=a.clone().addScaledVector(u,Math.cos(t1)*r).addScaledVector(v,Math.sin(t1)*r),pc=b.clone().addScaledVector(u,Math.cos(t1)*r*.45).addScaledVector(v,Math.sin(t1)*r*.45),pd=b.clone().addScaledVector(u,Math.cos(t)*r*.45).addScaledVector(v,Math.sin(t)*r*.45);this.quad(pa.toArray(),pb.toArray(),pc.toArray(),pd.toArray(),c);}}
  geometry(){return makeGeometry(this.positions,this.colors,this.indices);}
}

function riceClump(random:()=>number,detailed=true){
  const g=new GeometryBuilder();
  const segments=detailed?6:4;
  for(let blade=0;blade<(detailed?9:6);blade++){
    const angle=blade*2.399+random()*.4,h=.69+random()*.74,lean=.2+random()*.32,width=.032+random()*.023;
    const cos=Math.cos(angle),sin=Math.sin(angle),base=g.positions.length/3;
    for(let j=0;j<=segments;j++){
      const t=j/segments,rad=lean*t*t,y=h*(t-.18*t*t*t),w=width*Math.sin(Math.PI*Math.pow(t,.7));
      for(const side of [-1,0,1]){
        const c=new THREE.Color().setHSL(.23+.025*t,.35,.42+t*.20+(side===0?.055:0));
        g.vertex([cos*rad-sin*w*side,y+(side===0?.009:0),sin*rad+cos*w*side],c);
      }
      if(j<segments)for(let s=0;s<2;s++){const n=base+j*3+s;g.indices.push(n,n+3,n+1,n+1,n+3,n+4);}
    }
  }
  for(let stalk=0;stalk<(detailed?3:1);stalk++){
    const a=stalk*2.5+.4,h=.87+random()*.37,ca=Math.cos(a),sa=Math.sin(a);
    const pts=[new THREE.Vector3(0,0,0),new THREE.Vector3(ca*.04,h*.64,sa*.04),new THREE.Vector3(ca*.13,h,sa*.13),new THREE.Vector3(ca*.34,h-.14,sa*.34)];
    for(let i=0;i<3;i++)g.taperedStem(pts[i],pts[i+1],.008,new THREE.Color('#a9ac61'),detailed?4:3);
    for(let k=0;k<8;k++){
      const t=k/8,x=ca*(.14+t*.19),z=sa*(.14+t*.19),y=h-.13*t*t;
      const off=k%2?-.02:.02;
      const c=new THREE.Color(k%3?'#c4bf7a':'#e0d599');
      g.quad([x+sa*off-.011,y,z-ca*off],[x+sa*off,y+.035,z-ca*off+.008],[x+sa*off+.013,y,z-ca*off],[x+sa*off,y-.032,z-ca*off-.008],c);
    }
  }
  return g.geometry();
}
function weedClump(random:()=>number){const g=new GeometryBuilder();for(let i=0;i<13;i++){const a=i*2.4,h=.4+random()*.6;const c=new THREE.Color().setHSL(.23+random()*.035,.34,.38+random()*.18);const base=new THREE.Vector3(0,.02,0),tip=new THREE.Vector3(Math.cos(a)*h*.7,h*.55,Math.sin(a)*h*.7),mid=base.clone().lerp(tip,.55).add(new THREE.Vector3(0,h*.25,0)),w=.11+random()*.06;const cross=new THREE.Vector3(-Math.sin(a)*w,0,Math.cos(a)*w);g.quad(base.toArray(),mid.clone().add(cross).toArray(),tip.toArray(),mid.clone().sub(cross).toArray(),c);}return g.geometry();}

function foliageGeometry(random:()=>number){const geom=new THREE.IcosahedronGeometry(1,2).toNonIndexed();const p=geom.attributes.position;const colors:number[]=[];for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);const noise=1+.12*Math.sin(x*17+y*12)+.075*Math.cos(z*22-x*9)+.045*Math.sin(y*33);p.setXYZ(i,x*noise,y*noise,z*noise);const c=new THREE.Color().setHSL(.27,.20,.63+y*.07+random()*.07);colors.push(c.r,c.g,c.b);}geom.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geom.computeVertexNormals();return geom;}
function cedarGeometry(random:()=>number,height:number){const g=new GeometryBuilder();const col=new THREE.Color('#7b9472');g.taperedStem(new THREE.Vector3(0,0,0),new THREE.Vector3(.15,height,0),.13,new THREE.Color('#46563e'),5);for(let l=0;l<12;l++){const y=height*.22+l/12*height*.73,r=(height-y)*.22;for(let i=0;i<11;i++){const a=i/11*Math.PI*2,b=(i+1)/11*Math.PI*2;g.triangle([Math.cos(a)*r*(.8+random()*.4),y,Math.sin(a)*r],[Math.cos(b)*r*(.8+random()*.4),y-.16,Math.sin(b)*r],[.05,y+height*.2,0],col.clone().multiplyScalar(.75+random()*.25));}}return g.geometry();}
function cloudLobeGeometry(random:()=>number){const g=new THREE.IcosahedronGeometry(1,2).toNonIndexed(),p=g.attributes.position,colors:number[]=[];for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),noise=1+.075*Math.sin(x*19+y*11)+.055*Math.cos(z*23+y*7);p.setXYZ(i,x*noise,y*noise,z*noise);const c=new THREE.Color().setScalar(.65+(y+1)*.145+random()*.07);colors.push(c.r,c.g,c.b);}g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;}

function roof(parent:THREE.Object3D,cx:number,y:number,cz:number,width:number,depth:number,rise:number,mat:THREE.Material,trim:THREE.Material,
  mesh:(g:THREE.BufferGeometry,m:THREE.Material,x?:number,y?:number,z?:number,p?:THREE.Object3D)=>THREE.Mesh,
  curve:(p:THREE.Vector3[],r:number,m:THREE.Material,parent?:THREE.Object3D,segments?:number)=>THREE.Mesh){
  const g=new GeometryBuilder(),color=new THREE.Color('#ffffff');
  for(const side of [-1,1]){
    g.quad([cx,y+rise,cz-depth/2],[cx+side*width/2,y,cz-depth/2],[cx+side*width/2,y,cz+depth/2],[cx,y+rise,cz+depth/2],color);
    for(let z=-depth/2;z<=depth/2;z+=.19){curve([new THREE.Vector3(cx,y+rise+.025,cz+z),new THREE.Vector3(cx+side*width*.24,y+rise*.51,cz+z),new THREE.Vector3(cx+side*width*.5,y+.035,cz+z)],.034,trim,parent,7);}
    curve([new THREE.Vector3(cx+side*width*.5,y+.04,cz-depth/2),new THREE.Vector3(cx+side*width*.5,y+.015,cz),new THREE.Vector3(cx+side*width*.5,y+.04,cz+depth/2)],.068,trim,parent,9);
    for(const front of [-1,1])curve([new THREE.Vector3(cx,y+rise,cz+front*depth/2),new THREE.Vector3(cx+side*width*.23,y+rise*.5,cz+front*depth/2),new THREE.Vector3(cx+side*width*.5,y,cz+front*depth/2)],.095,trim,parent,9);
  }
  const roofMat=mat.clone();if('side'in roofMat)roofMat.side=THREE.DoubleSide;
  mesh(g.geometry(),roofMat,0,0,0,parent);
  curve([new THREE.Vector3(cx,y+rise+.08,cz-depth/2-.12),new THREE.Vector3(cx,y+rise+.09,cz),new THREE.Vector3(cx,y+rise+.08,cz+depth/2+.12)],.11,trim,parent,10);
}
function makeGlowTexture(){const size=64,data=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const d=Math.hypot((x-size/2)/(size/2),(y-size/2)/(size/2)),a=Math.max(0,1-d);const i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=255;data[i+3]=Math.round(a*a*a*255);}const t=new THREE.DataTexture(data,size,size);t.needsUpdate=true;return t;}
function makeMoonTexture(){const size=256,data=new Uint8Array(size*size*4),r=seeded(2905);const spots=Array.from({length:33},()=>({x:(r()-.5)*1.55,y:(r()-.5)*1.55,s:.055+r()*.21,v:.09+r()*.14}));for(let y=0;y<size;y++)for(let x=0;x<size;x++){const px=(x-size/2)/(size/2),py=(y-size/2)/(size/2),dist=Math.hypot(px,py),i=(y*size+x)*4;let shade=.94;for(const c of spots){const d=Math.hypot(px-c.x,py-c.y)/c.s;if(d<1)shade-=c.v*Math.pow(1-d,.45);else if(d<1.08)shade+=.025;}shade+=Math.sin(px*81+py*42)*Math.cos(py*63)*.013;data[i]=Math.min(255,255*shade);data[i+1]=Math.min(255,245*shade);data[i+2]=Math.min(255,199*shade);data[i+3]=dist<.98?255:Math.max(0,(1-dist)*50*255);}const t=new THREE.DataTexture(data,size,size);t.colorSpace=THREE.SRGBColorSpace;t.needsUpdate=true;return t;}
