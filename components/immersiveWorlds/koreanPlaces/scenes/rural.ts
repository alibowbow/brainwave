import * as THREE from 'three';
import type { SceneContent } from '../types';

/** Original spatial interpretation of the approved rural-ghibli-v9 composition.
 * All forms, textures and animation below are authored procedurally for this scene.
 * The image is a composition reference only; it is never rendered as the world.
 */
export function createRuralScene(): SceneContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#143b68');
  scene.fog = new THREE.FogExp2('#244b60', 0.0045);
  scene.userData.exposure = .93;
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
    soil: basic('#153d40', {toneMapped:false}), road: basic('#ffffff', {toneMapped:false}), wall: toon('#8b9997'),
    wood: basic('#293d40', {toneMapped:false}), roof: basic('#263e58', {toneMapped:false}), ridge: basic('#465d72', {toneMapped:false}),
    dark: basic('#182c35', {toneMapped:false}), pole: toon('#697981'), metal: toon('#394953'),
    rice: basic('#ffffff', { vertexColors: true, side: THREE.DoubleSide, toneMapped:false }),
    leaf: basic('#849da1', { vertexColors: true, side: THREE.DoubleSide, toneMapped:false }),
    window: basic('#ffc86c', { toneMapped: false }),
  };
  scene.add(new THREE.HemisphereLight('#9dbadd', '#163b42', .72));
  const moonlight = new THREE.DirectionalLight('#abcaf3', .95);
  moonlight.position.set(-24, 45, 20);
  scene.add(moonlight);
  const blueFill = new THREE.DirectionalLight('#6089af', .28);
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
  const roadColumns=11;
  for (let i = 0; i <= 110; i++) {
    const z = 18 - i * .47, center = pathX(z), width = pathWidth(z);
    for (let column=0;column<roadColumns;column++) {
      const lateral=-1+2*column/(roadColumns-1);
      const edgeNoise=Math.abs(lateral)>.98 ? (random()-.5)*.15 : 0;
      roadPositions.push(center+lateral*width+edgeNoise,.003+random()*.004,z);
      const track=Math.exp(-(((Math.abs(lateral)-.56)/.23)**2));
      const edge=Math.pow(Math.abs(lateral),8);
      const c=new THREE.Color('#647b73').lerp(new THREE.Color('#929b8b'),track*.78).lerp(new THREE.Color('#3d5b58'),edge*.45);
      c.multiplyScalar(.93+.11*Math.sin(z*.82+lateral*9)+random()*.07);
      roadColors.push(c.r,c.g,c.b);
      if(i<110&&column<roadColumns-1){const n=i*roadColumns+column;roadIndices.push(n,n+1,n+roadColumns,n+1,n+roadColumns+1,n+roadColumns);}
    }
  }
  const roadGeometry = makeGeometry(roadPositions, roadColors, roadIndices);
  material.road.vertexColors = true;
  material.road.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec2 vRuralGround;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvRuralGround=position.xz;');
    shader.fragmentShader=`varying vec2 vRuralGround;
      float ruralHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float ruralSoil(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(ruralHash(i),ruralHash(i+vec2(1,0)),f.x),mix(ruralHash(i+vec2(0,1)),ruralHash(i+vec2(1,1)),f.x),f.y);}
      `+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=(.87+ruralSoil(vRuralGround*1.25)*.22)*(.965+ruralSoil(vRuralGround*19.)*.07);');
  };
  material.road.customProgramCacheKey=()=> 'rural-worn-earth-v1';
  mesh(roadGeometry, material.road);
  const stoneData = new GeometryBuilder();
  for (let i = 0; i < 1700; i++) {
    const z = -31 + random() * 50, lateral = (random() - .5) * 1.92;
    const x = pathX(z) + lateral * pathWidth(z);
    const color = new THREE.Color().setHSL(.15 + random() * .025, .07 + random() * .08, .43 + random() * .105);
    stoneData.groundPatch(x, z, .022, .012 + random() * .070, .022 + random() * .095, color, random);
  }
  mesh(stoneData.geometry(), basic('#a7b7b6', { vertexColors: true, side: THREE.DoubleSide, toneMapped:false }));

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
      const s = (lod===0?.83:.98) + random() * .41;
      dummy.scale.set(s, s * (.85 + random() * .26), s);
      dummy.rotation.set(0, random() * Math.PI * 2, 0);
      dummy.updateMatrix(); rice.setMatrixAt(i, dummy.matrix);
      rice.setColorAt(i, new THREE.Color(['#8fa99a','#bdd0b9','#a7c1c0','#88a9a5'][Math.floor(random()*4)]));
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
  const bankMaterial = basic('#24474b', {toneMapped:false});
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
    dummy.scale.setScalar(.24 + random() * .30); dummy.updateMatrix();
    weeds.setMatrixAt(i, dummy.matrix);
    weeds.setColorAt(i, new THREE.Color().setScalar(.68 + random() * .25));
  }
  scene.add(weeds);
  const centerWeeds=new THREE.InstancedMesh(weeds.geometry,material.leaf,85);
  for(let i=0;i<85;i++){
    const z=11-random()*41;
    dummy.position.set(pathX(z)+(random()-.5)*.45,.018,z);
    dummy.rotation.set(0,random()*6.28,0);dummy.scale.setScalar(.08+random()*.16);dummy.updateMatrix();
    centerWeeds.setMatrixAt(i,dummy.matrix);
  }
  scene.add(centerWeeds);

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
  for (let i = 0; i < 108; i++) {
    const x = -67 + random() * 134;
    const z = -42 - random() * 24;
    const centerMass = Math.exp(-(((x-2)/21) ** 2));
    const h = 4.2 + random() * 6.7 + centerMass * 4.5;
    const trunk = new THREE.Color('#18393f');
    branches.taperedStem(new THREE.Vector3(x,0,z),new THREE.Vector3(x+.25,h*.73,z),.10+.012*h,trunk,5);
    for (let b = 0; b < 7; b++) {
      const a = b * 2.4 + random(), y = h * (.48 + random() * .4);
      const reach = 1.4 + random() * 2.0;
      const tx = x + Math.cos(a) * reach, tz = z + Math.sin(a) * reach;
      branches.taperedStem(new THREE.Vector3(x,y*.78,z), new THREE.Vector3(tx,y,tz), .05, trunk, 4);
      canopies.push({p:new THREE.Vector3(tx,y,tz),scale:new THREE.Vector3(2+random()*1.4,1.6+random()*1.3,1.7+random()),color:new THREE.Color(['#163e47','#204c52','#254e4e','#1b4245','#2e5353'][Math.floor(random()*5)])});
    }
    canopies.push({p:new THREE.Vector3(x,h,z),scale:new THREE.Vector3(2.1,2.4,2),color:new THREE.Color(['#284c53','#1c414c','#2c5255'][Math.floor(random()*3)])});
  }
  for(let x=-62;x<62;x+=2.1){
    canopies.push({p:new THREE.Vector3(x,.9+random(),-40-random()*5),scale:new THREE.Vector3(1.6+random(),1.2+random()*.8,1.6),color:new THREE.Color(['#173d43','#21494b','#224c4c'][Math.floor(random()*3)])});
  }
  mesh(branches.geometry(), basic('#ffffff',{vertexColors:true,toneMapped:false}),0,0,0,forest);
  const treeMesh = new THREE.InstancedMesh(canopyGeo, basic('#ffffff',{vertexColors:true,toneMapped:false,side:THREE.DoubleSide}), canopies.length);
  canopies.forEach((c,i)=>{dummy.position.copy(c.p);dummy.scale.copy(c.scale);dummy.rotation.set(random()*.3,random()*6.28,random()*.2);dummy.updateMatrix();treeMesh.setMatrixAt(i,dummy.matrix);treeMesh.setColorAt(i,c.color);});
  forest.add(treeMesh);
  // A few taller irregular cedars break the broadleaf skyline above the farmhouse.
  for (let i = 0; i < 7; i++) {
    const pine = cedarGeometry(random,17+random()*7);
    mesh(pine,basic('#2f5557',{vertexColors:true,toneMapped:false,side:THREE.DoubleSide}),-9+i*2.8,0,-51-random()*5,forest);
  }

  const house = new THREE.Group();
  house.position.set(6.4,0,-31);
  house.rotation.y = -.36;
  scene.add(house);
  // The farmhouse is timber-framed plaster with a real pitched tiled roof and
  // asymmetrical kitchen extension; warm windows have inset mullions and eaves.
  mesh(new THREE.BoxGeometry(6.7,4.0,4.5),material.wall,0,2.12,0,house);
  mesh(new THREE.BoxGeometry(7.0,.28,4.8),toon('#555d49'),0,.14,0,house);
  const gable = new GeometryBuilder();
  gable.triangle([3.35,4.12,-2.25],[3.35,4.12,2.25],[3.35,6.2,0],new THREE.Color('#788f96'));
  gable.triangle([-3.35,4.12,2.25],[-3.35,4.12,-2.25],[-3.35,6.2,0],new THREE.Color('#788f96'));
  mesh(gable.geometry(),basic('#ffffff',{vertexColors:true,side:THREE.DoubleSide,toneMapped:false}),0,0,0,house);
  for (const x of [-3.35,0,3.35]) mesh(new THREE.BoxGeometry(.13,4.15,.16),material.wood,x,2.17,2.29,house);
  for (const y of [.48,2.28,4.1]) mesh(new THREE.BoxGeometry(6.75,.13,.13),material.wood,0,y,2.3,house);
  const mainRoof = new THREE.Group(); mainRoof.rotation.y=Math.PI/2; house.add(mainRoof);
  roof(mainRoof,0,4.13,0,5.8,7.7,2.2,material.roof,material.ridge,mesh,curve);
  function window(x:number,y:number,z:number,w:number,h:number,parent:THREE.Object3D=house) {
    mesh(new THREE.BoxGeometry(w+.22,h+.2,.14),material.wood,x,y,z,parent);
    mesh(new THREE.PlaneGeometry(w,h),material.window,x,y,z+.083,parent);
    mesh(new THREE.BoxGeometry(.048,h,.04),material.wood,x,y,z+.115,parent);
    mesh(new THREE.BoxGeometry(w,.045,.04),material.wood,x,y+.08,z+.115,parent);
    mesh(new THREE.BoxGeometry(w+.24,.1,.25),material.dark,x,y-h*.5-.07,z+.04,parent);
  }
  window(-2.1,3.08,2.36,1.02,1.17);window(-.3,3.08,2.36,1.20,1.17);window(1.55,3.08,2.36,.68,.95);
  const sideWall = new THREE.Group();sideWall.position.set(3.39,0,0);sideWall.rotation.y=Math.PI/2;house.add(sideWall);
  window(.05,4.64,.015,.78,.92,sideWall);window(-.65,2.8,.015,.78,1.04,sideWall);
  for(let y=.6;y<4;y+=.4) mesh(new THREE.BoxGeometry(6.55,.017,.013),basic('#597079',{toneMapped:false}),0,y,2.31,house);
  // Lower kitchen light spills onto steps and the soft greenery around the door.
  mesh(new THREE.BoxGeometry(2.7,2.22,2.6),toon('#899a98'),2.45,1.23,2.35,house);
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
  const shrub = new THREE.InstancedMesh(canopyGeo,basic('#315751',{vertexColors:true,toneMapped:false,side:THREE.DoubleSide}),28);
  for(let i=0;i<28;i++) {dummy.position.set(-5+random()*10,.3+random()*.5,3.2+random()*1.8);dummy.scale.set(.6+random()*.5,.5+random()*.5,.65);dummy.rotation.set(0,random()*6.28,0);dummy.updateMatrix();shrub.setMatrixAt(i,dummy.matrix);}
  house.add(shrub);

  // Foreground pole has a tapered shaft, bracket hardware, ceramic insulators,
  // weather lines and sagging overhead conductors, all spatial geometry.
  const pole = new THREE.Group();pole.position.set(7.2,0,-8.5);pole.scale.y=.92;scene.add(pole);
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
  const moon = mesh(new THREE.PlaneGeometry(7.0,7.0),basic('#ffffff',{map:moonTexture,transparent:true,depthWrite:false,toneMapped:false}),-12,39,-79);
  moon.lookAt(camera.position);
  const moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:'#ffe4a0',opacity:.15,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  moonHalo.position.copy(moon.position).add(new THREE.Vector3(0,0,-.25));moonHalo.scale.set(15,15,1);scene.add(moonHalo);

  const clouds = new THREE.Group();scene.add(clouds);
  const cloudGeometry = cloudLobeGeometry(random);
  const cloudMaterial = new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,
    vertexShader:`varying vec3 vWorld; varying vec3 vNormalWorld;
      void main(){vec4 local=instanceMatrix*vec4(position,1.);vWorld=(modelMatrix*local).xyz;vNormalWorld=normalize(mat3(modelMatrix)*mat3(instanceMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}`,
    fragmentShader:`varying vec3 vWorld; varying vec3 vNormalWorld;
      float hash(vec3 p){return fract(sin(dot(p,vec3(17.7,42.3,113.9)))*43758.53);}
      float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
      void main(){vec3 viewDirection=normalize(cameraPosition-vWorld);float facing=abs(dot(normalize(vNormalWorld),viewDirection));float edge=smoothstep(.04,.40,facing);float n=noise(vWorld*.6)*.65+noise(vWorld*1.9)*.35;float top=smoothstep(15.,39.,vWorld.y);vec3 color=mix(vec3(.24,.34,.46),vec3(.39,.51,.62),top);color+=(n-.5)*.036;gl_FragColor=vec4(color,edge*.82);}`,
  });
  const cloudLobes: {x:number;y:number;z:number;sx:number;sy:number;sz:number;large:boolean;color:THREE.Color}[]=[];
  const cloudBanks=[[-44,23,-82,18,21],[-21,16,-90,19,3],[37,20,-84,22,17],[4,31,-96,18,2],[65,15,-98,21,7]];
  for(const [cx,cy,cz,cw,ch] of cloudBanks) {
    for(let i=0;i<32;i++) {
      const t=-1+2*i/31,arch=Math.pow(Math.max(0,1-t*t),1.4);
      const x=cx+t*cw*.86+(random()-.5)*1.2;
      const y=cy+arch*ch*.44+(random()-.5)*ch*.14;
      cloudLobes.push({x,y,z:cz+(random()-.5)*3,sx:2.7+random()*3.2,sy:ch<4?.4+random()*.7:1.9+random()*2.6,sz:1.6+random()*1.5,large:ch>15,color:new THREE.Color('#ffffff')});
    }
  }
  const cloudMesh = new THREE.InstancedMesh(cloudGeometry,cloudMaterial,cloudLobes.filter(c=>!c.large).length);
  let thinCloudIndex=0;
  // Retain the original random stream and transforms for the thin, distant bands
  // and subsequent stars. Only the two tall banks receive new authored volumes.
  cloudLobes.forEach(c=>{dummy.position.set(c.x,c.y,c.z);dummy.scale.set(c.sx,c.sy,c.sz);dummy.rotation.set(random()*.3,random()*6.28,random()*.35);dummy.updateMatrix();if(!c.large){cloudMesh.setMatrixAt(thinCloudIndex,dummy.matrix);cloudMesh.setColorAt(thinCloudIndex++,c.color);}});
  clouds.add(cloudMesh);
  const billowMaterial = new THREE.ShaderMaterial({
    vertexShader:`varying vec3 vWorld; varying vec3 vNormalWorld;
      void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;vNormalWorld=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}`,
    fragmentShader:`varying vec3 vWorld; varying vec3 vNormalWorld;
      void main(){
        vec3 normal=normalize(vNormalWorld);
        // Broad cool undersides and softly lit upper shoulders give the cloud its
        // volume; there are no bright rims, outlines or translucent lobe seams.
        float light=dot(normal,normalize(vec3(-.38,.79,.47)))*.5+.5;
        float tier=smoothstep(.28,.69,light)*.64+smoothstep(.69,.94,light)*.36;
        float height=smoothstep(17.,36.,vWorld.y);
        float grain=sin(vWorld.x*.77+vWorld.y*.36)*sin(vWorld.y*.69-vWorld.z*.53);
        vec3 shadow=vec3(.225,.335,.445),lit=vec3(.405,.525,.63);
        vec3 color=mix(shadow,lit,clamp(tier*.73+height*.20+grain*.026,0.,1.));
        gl_FragColor=vec4(color,1.);
      }`,
  });
  const leftBillows:CloudBillow[]=[
    [-14,-.5,-.1,6.8,3.0,3.1],[-6,-.7,0,8.3,3.6,3.6],[4,-.8,.2,8.1,3.4,3.8],[12,-1,.1,6.3,2.8,3],
    [-11,3.1,0,5.4,4.8,3.7],[-6.8,7.9,-.8,4.8,5.0,3.4],[-.6,4.7,.3,5.8,4.5,3.9],[7.6,3.2,-.4,5.7,3.8,3.4],
    [-16.5,1.9,.1,3.1,2.3,2.4],[-9.3,10.5,-.7,2.7,2.8,2.4],[-3.8,9.9,-.5,2.2,2.6,2.2],[3.5,7.2,-.4,2.9,2.6,2.5],[12.2,2.9,-.3,3.2,2.3,2.6],
  ];
  const rightBillows:CloudBillow[]=[
    [-16,-1.1,0,6.5,2.7,3.2],[-7,-.8,.2,8.1,3.6,3.8],[3,-.4,0,8.7,3.7,4.1],[13,-1.2,.2,7.6,3.0,3.3],
    [-10,3.1,-.4,4.8,4.0,3.4],[-3.6,6.3,-.6,5.0,4.9,3.6],[4.7,4.0,.3,6.1,4.3,3.9],[12,1.8,-.1,5.2,3.5,3.4],
    [-14.5,3.6,-.4,2.7,2.2,2.4],[-5.7,9.0,-.8,2.6,2.8,2.4],[.2,8.2,-.6,2.4,2.7,2.2],[8.2,6.0,-.2,3.0,2.4,2.6],[17.9,1.1,.2,3.0,2.3,2.4],
  ];
  mesh(cloudBankGeometry(leftBillows),billowMaterial,-44,23,-82,clouds);
  mesh(cloudBankGeometry(rightBillows),billowMaterial,37,20,-84,clouds);
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
    pole.position.x=portrait?3.1:7.2;
    moon.position.x=portrait?-8.5:-12;
    moon.position.y=portrait?35:39;
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
    const angle=blade*2.399+random()*.4,h=.69+random()*.74,lean=.44+random()*.37,width=.025+random()*.020;
    const cos=Math.cos(angle),sin=Math.sin(angle),base=g.positions.length/3;
    for(let j=0;j<=segments;j++){
      const t=j/segments,rad=lean*t*t,y=h*(t-.18*t*t*t),w=width*Math.sin(Math.PI*Math.pow(t,.7));
      for(const side of [-1,0,1]){
        const c=new THREE.Color('#123b3b').lerp(new THREE.Color('#3b6a58'),Math.pow(t,3.4)*.72);if(side===0)c.multiplyScalar(1.11);
        g.vertex([cos*rad-sin*w*side,y+(side===0?.009:0),sin*rad+cos*w*side],c);
      }
      if(j<segments)for(let s=0;s<2;s++){const n=base+j*3+s;g.indices.push(n,n+3,n+1,n+1,n+3,n+4);}
    }
  }
  for(let stalk=0;stalk<(detailed?3:1);stalk++){
    const a=stalk*2.5+.4,h=.87+random()*.37,ca=Math.cos(a),sa=Math.sin(a);
    const pts=[new THREE.Vector3(0,0,0),new THREE.Vector3(ca*.04,h*.64,sa*.04),new THREE.Vector3(ca*.13,h,sa*.13),new THREE.Vector3(ca*.34,h-.14,sa*.34)];
    for(let i=0;i<3;i++)g.taperedStem(pts[i],pts[i+1],.008,new THREE.Color('#537b65'),detailed?4:3);
    for(let k=0;k<8;k++){
      const t=k/8,x=ca*(.14+t*.19),z=sa*(.14+t*.19),y=h-.13*t*t;
      const off=k%2?-.02:.02;
      const c=new THREE.Color(k%3?'#789a86':'#a5ad86');
      g.quad([x+sa*off-.011,y,z-ca*off],[x+sa*off,y+.035,z-ca*off+.008],[x+sa*off+.013,y,z-ca*off],[x+sa*off,y-.032,z-ca*off-.008],c);
    }
  }
  return g.geometry();
}
function weedClump(random:()=>number){
  const g=new GeometryBuilder();
  for(let branch=0;branch<7;branch++){
    const a=branch*2.4,h=.45+random()*.5;
    for(let leaf=0;leaf<4;leaf++){
      const t=.25+leaf*.19,c=new THREE.Color('#325f60').lerp(new THREE.Color('#62877d'),random()*.6);
      const base=new THREE.Vector3(Math.cos(a)*h*.3*t,h*.45*t,Math.sin(a)*h*.3*t);
      const direction=a+(leaf%2?1.0:-1.0),len=.17+random()*.16;
      const tip=base.clone().add(new THREE.Vector3(Math.cos(direction)*len,len*.22,Math.sin(direction)*len));
      const center=base.clone().lerp(tip,.52).add(new THREE.Vector3(0,.035,0));
      const axis=tip.clone().sub(base),cross=new THREE.Vector3(-Math.sin(direction),0,Math.cos(direction)).multiplyScalar(len*.26);
      const top=g.vertex(center.toArray(),c.clone().multiplyScalar(1.08));
      const ring:number[]=[];
      for(let k=0;k<8;k++){
        const u=k/8*Math.PI*2;
        ring.push(g.vertex(base.clone().lerp(tip,(Math.cos(u)+1)*.5).addScaledVector(cross,Math.sin(u)).toArray(),c));
      }
      for(let k=0;k<8;k++)g.indices.push(top,ring[k],ring[(k+1)%8]);
    }
  }
  return g.geometry();
}

// Each crown is a volume of hundreds of small leaf contours, not a low-poly ball.
// Fine, overlapping scalloped edges remain organic when instanced at forest depth.
function foliageGeometry(random:()=>number){
  const g=new GeometryBuilder();
  for(let i=0;i<112;i++){
    const a=i*2.399963,y=1-2*(i+.5)/112,r=Math.sqrt(Math.max(0,1-y*y));
    const radial=.74+random()*.32;
    const center=new THREE.Vector3(Math.cos(a)*r*radial,y*radial,Math.sin(a)*r*radial);
    center.x+=.09*Math.sin(center.y*13+center.z*8);center.y+=.09*Math.cos(center.x*11);
    const normal=center.clone().normalize().add(new THREE.Vector3(0,0,.5)).normalize();
    const axis=new THREE.Vector3(0,1,0).cross(normal).normalize();if(axis.lengthSq()<.1)axis.set(1,0,0);
    const other=normal.clone().cross(axis).normalize();
    const size=.19+random()*.14;
    const color=new THREE.Color().setScalar(.68+(center.y+1)*.12+random()*.12);
    const top=g.vertex(center.clone().addScaledVector(normal,.026).toArray(),color.clone().multiplyScalar(1.06));
    const ring:number[]=[];
    for(let k=0;k<10;k++){
      const ang=k/10*Math.PI*2,edge=1+.13*Math.sin(k*2.6+i);
      const p=center.clone().addScaledVector(axis,Math.cos(ang)*size*edge).addScaledVector(other,Math.sin(ang)*size*.72*edge);
      ring.push(g.vertex(p.toArray(),color));
    }
    for(let k=0;k<10;k++)g.indices.push(top,ring[k],ring[(k+1)%10]);
  }
  return g.geometry();
}
function cedarGeometry(random:()=>number,height:number){
  const g=new GeometryBuilder();
  g.taperedStem(new THREE.Vector3(0,0,0),new THREE.Vector3(.1,height,0),.12,new THREE.Color('#435f63'),5);
  for(let tier=0;tier<22;tier++){
    const y=height*.22+tier/22*height*.76,reach=(height-y)*.19;
    for(let branch=0;branch<9;branch++){
      const a=branch*2.4+tier*.64,r=reach*(.68+random()*.45),lift=.25+random()*.38;
      const tip=new THREE.Vector3(Math.cos(a)*r,y+lift,Math.sin(a)*r);
      const base=new THREE.Vector3(0,y-.12,0),c=new THREE.Color('#8caaa9').multiplyScalar(.64+random()*.26);
      g.taperedStem(base,tip,.018,c,3);
      for(let twig=1;twig<=4;twig++){
        const t=twig/4,center=base.clone().lerp(tip,t),width=(.32+random()*.13)*(1-t*.48);
        for(const side of [-1,1]){
          const p=center.clone().add(new THREE.Vector3(Math.cos(a+side*.93)*width,.11+random()*.18,Math.sin(a+side*.93)*width));
          const back=center.clone().add(new THREE.Vector3(-Math.cos(a)*.18,-.13,-Math.sin(a)*.18));
          g.triangle(back.toArray(),p.toArray(),tip.clone().lerp(center,.6).add(new THREE.Vector3(0,.22,0)).toArray(),c);
        }
      }
    }
  }
  return g.geometry();
}
function cloudLobeGeometry(random:()=>number){
  const g=new THREE.SphereGeometry(1,28,18),p=g.attributes.position,colors:number[]=[];
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
    const n=1+.048*Math.sin(x*13+y*7)*Math.cos(z*11)+.03*Math.cos(y*19+z*9);
    p.setXYZ(i,x*n,y*n,z*n);
    const shade=.7+(y+1)*.14+.024*Math.sin(x*18+y*9)*Math.cos(z*16);
    const c=new THREE.Color().setScalar(shade);colors.push(c.r,c.g,c.b);
  }
  g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;
}

type CloudBillow = [x:number,y:number,z:number,sx:number,sy:number,sz:number];

// A smooth union keeps each bank one continuous 3D surface instead of a string
// of overlapping transparent spheres. The unequal shoulders and small billows
// are intentionally different in the two masses. This is generated once; cloud
// animation still only moves their shared parent by the original quiet amount.
function cloudBankGeometry(billows:CloudBillow[]){
  const nx=68,ny=34,nz=20,minX=-24,minY=-6,minZ=-7,dx=48/nx,dy=23/ny,dz=14/nz;
  const field=(x:number,y:number,z:number)=>{
    let distance=100;
    for(const [cx,cy,cz,sx,sy,sz] of billows){
      const d=(Math.hypot((x-cx)/sx,(y-cy)/sy,(z-cz)/sz)-1)*Math.min(sx,sy,sz);
      const blend=Math.max(0,1-Math.abs(distance-d)/.82);
      distance=Math.min(distance,d)-blend*blend*.82*.25;
    }
    // Low-amplitude unevenness breaks polished balloon contours without pointed
    // noise, repeated scallops or high-contrast surface speckles.
    return distance+.16*Math.sin(x*1.27+y*.61)*Math.sin(y*1.49-z*.93)+.065*Math.sin(x*2.71+z*1.83)*Math.cos(y*2.36);
  };
  const width=nx+1,height=ny+1,count=width*height*(nz+1);
  const samples=new Float32Array(count);
  const index=(x:number,y:number,z:number)=>(z*height+y)*width+x;
  for(let z=0;z<=nz;z++)for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++)samples[index(x,y,z)]=field(minX+x*dx,minY+y*dy,minZ+z*dz);
  const positions:number[]=[],normals:number[]=[],indices:number[]=[],vertices=new Map<number,number>();
  const point=(i:number)=>[minX+(i%width)*dx,minY+(Math.floor(i/width)%height)*dy,minZ+Math.floor(i/(width*height))*dz];
  const edge=(ia:number,ib:number)=>{
    const a=Math.min(ia,ib),b=Math.max(ia,ib),key=a*count+b,cached=vertices.get(key);
    if(cached!==undefined)return cached;
    const pa=point(a),pb=point(b),t=samples[a]/(samples[a]-samples[b]);
    const x=pa[0]+(pb[0]-pa[0])*t,y=pa[1]+(pb[1]-pa[1])*t,z=pa[2]+(pb[2]-pa[2])*t,e=.045;
    const normal=new THREE.Vector3(field(x+e,y,z)-field(x-e,y,z),field(x,y+e,z)-field(x,y-e,z),field(x,y,z+e)-field(x,y,z-e)).normalize();
    const result=positions.length/3;positions.push(x,y,z);normals.push(normal.x,normal.y,normal.z);vertices.set(key,result);return result;
  };
  const triangle=(a:number,b:number,c:number)=>{
    const ax=positions[b*3]-positions[a*3],ay=positions[b*3+1]-positions[a*3+1],az=positions[b*3+2]-positions[a*3+2];
    const bx=positions[c*3]-positions[a*3],by=positions[c*3+1]-positions[a*3+1],bz=positions[c*3+2]-positions[a*3+2];
    const outward=(ay*bz-az*by)*normals[a*3]+(az*bx-ax*bz)*normals[a*3+1]+(ax*by-ay*bx)*normals[a*3+2];
    if(outward<0)indices.push(a,c,b);else indices.push(a,b,c);
  };
  const tetrahedra=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
  for(let z=0;z<nz;z++)for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
    const corners=[index(x,y,z),index(x+1,y,z),index(x+1,y+1,z),index(x,y+1,z),index(x,y,z+1),index(x+1,y,z+1),index(x+1,y+1,z+1),index(x,y+1,z+1)];
    if(corners.every(i=>samples[i]>=0)||corners.every(i=>samples[i]<0))continue;
    for(const tetra of tetrahedra){
      const inside=tetra.map(i=>corners[i]).filter(i=>samples[i]<0),outside=tetra.map(i=>corners[i]).filter(i=>samples[i]>=0);
      if(inside.length===1)triangle(edge(inside[0],outside[0]),edge(inside[0],outside[1]),edge(inside[0],outside[2]));
      else if(inside.length===3)triangle(edge(outside[0],inside[0]),edge(outside[0],inside[1]),edge(outside[0],inside[2]));
      else if(inside.length===2){const a=edge(inside[0],outside[0]),b=edge(inside[0],outside[1]),c=edge(inside[1],outside[0]),d=edge(inside[1],outside[1]);triangle(a,b,c);triangle(b,d,c);}
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));geometry.setIndex(indices);return geometry;
}

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
function makeMoonTexture(){
  const size=256,data=new Uint8Array(size*size*4),r=seeded(2905);
  const spots=Array.from({length:86},(_,i)=>({x:(r()-.5)*1.7,y:(r()-.5)*1.7,s:i<12?.1+r()*.17:.016+r()*.068,v:i<12?.035+r()*.07:.025+r()*.07}));
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const px=(x-size/2)/(size/2),py=(y-size/2)/(size/2),dist=Math.hypot(px,py),i=(y*size+x)*4;
    let shade=.97;
    for(const c of spots){const d=Math.hypot(px-c.x,py-c.y)/c.s;if(d<1)shade-=c.v*Math.pow(1-d,.7);else if(d<1.06)shade+=.008;}
    shade+=Math.sin(px*121+py*62)*Math.cos(py*103)*.005;
    data[i]=Math.min(255,255*shade);data[i+1]=Math.min(255,241*shade);data[i+2]=Math.min(255,196*shade);data[i+3]=dist<.98?255:Math.max(0,(1-dist)*50*255);
  }
  const t=new THREE.DataTexture(data,size,size);t.colorSpace=THREE.SRGBColorSpace;t.needsUpdate=true;return t;
}
