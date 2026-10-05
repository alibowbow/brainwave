import * as T from 'three';
import { makeCafeMaterials } from './materials';
import { createCafePlant } from './plant';
import { buildCafeShelves } from './shelves';
import { buildCafeExterior } from './exterior';

export type CafeInteraction = 'cup' | 'lamp' | 'window';
export function buildCafe() {
  const scene = new T.Scene();
  scene.background = new T.Color('#263846');
  scene.fog = new T.FogExp2('#263846', .021);
  const m = makeCafeMaterials();
  m.oak.color.set('#ffffff');
  m.plaster.color.set('#b6ac95');
  const interactables: T.Object3D[] = [];
  const extraMaterials: T.Material[] = [];
  const extraTextures: T.Texture[] = [];
  const floorWood=m.oak.clone();floorWood.color.set('#a6a098');extraMaterials.push(floorWood);
  const mat = (color: string, roughness = .8, metalness = 0) => {
    const v = new T.MeshStandardMaterial({color, roughness, metalness}); extraMaterials.push(v); return v;
  };
  const warm = new T.MeshStandardMaterial({color:'#fff4d6', emissive:'#ffc580', emissiveIntensity:2});
  extraMaterials.push(warm);
  const mesh = (g: T.BufferGeometry, material: T.Material | T.Material[], x: number,y: number,z: number, parent:T.Object3D=scene) => {
    const o = new T.Mesh(g,material); o.position.set(x,y,z); o.castShadow=true; o.receiveShadow=true; parent.add(o); return o;
  };
  const box = (x:number,y:number,z:number,w:number,h:number,d:number,material:T.Material,parent?:T.Object3D) => mesh(new T.BoxGeometry(w,h,d),material,x,y,z,parent);
  const cylinder=(x:number,y:number,z:number,r1:number,r2:number,h:number,material:T.Material,parent?:T.Object3D)=>mesh(new T.CylinderGeometry(r1,r2,h,48),material,x,y,z,parent);
  const ball=(x:number,y:number,z:number,r:number,material:T.Material,parent?:T.Object3D)=>mesh(new T.SphereGeometry(r,24,16),material,x,y,z,parent);
  const rod=(a:T.Vector3,b:T.Vector3,r:number,material:T.Material,parent:T.Object3D=scene)=>{
    const o=mesh(new T.CylinderGeometry(r,r,a.distanceTo(b),12),material,0,0,0,parent);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());return o;
  };
  // A full café volume opens to the right of the near window bay.
  box(-2.2,-.1,3.2,6,.2,9.5,m.darkWood);
  box(4,-.1,-3.2,6.5,.2,12,m.darkWood);
  for(let i=0;i<12;i++) box(-4.9+i*.5,.008,3.2,.483,.024,9.5,floorWood);
  for(let i=0;i<13;i++) box(1+i*.5,.008,-3.2,.483,.024,12,floorWood);
  box(4,2,-9,6.5,4,.18,m.plaster); box(7.2,2,-2,.2,4,14,m.plaster);
  const exteriorWall=mat('#202c33',.97);mesh(new T.BoxGeometry(.16,4,7.5),[m.darkWood,exteriorWall,exteriorWall,exteriorWall,m.darkWood,exteriorWall],.82,2,-5.3);
  box(-2.2,4.15,3.2,6,.16,9.5,m.plaster);
  box(4,4.15,-3.2,6.5,.16,12,m.plaster);
  box(-5.3,2,1,.25,4,6,m.plaster);
  // Window sill, joinery and narrow bronze glazing beads.
  const glassX=-2.15, glassZ=-1.55, glassW=5.7, glassH=3.50, glassY=2.14;
  box(glassX,.19,glassZ,glassW+.24,.40,.21,m.plaster);
  box(glassX,.42,glassZ+.10,glassW+.44,.13,.48,m.oak);
  for(const x of [-5.06,-2.25,.74]) {
    box(x,2.15,glassZ+.03,.105,3.70,.17,m.darkWood);
    box(x+.058,2.15,glassZ+.125,.018,3.70,.018,m.brass);
  }
  box(glassX,3.95,glassZ,glassW+.3,.15,.2,m.darkWood);
  box(glassX,3.18,glassZ+.04,glassW,.065,.14,m.darkWood);
  // Upholstered banquette and piping: textile remains visible in close foreground.
  box(-3.9,.45,1.6,1.25,.28,4.0,m.darkWood);
  box(-3.8,.67,1.6,1.20,.20,4,m.fabric);
  box(-4.45,1.15,1.6,.19,1.02,4.05,m.fabric);
  for(let z=-.2;z<3.6;z+=.58) {
    box(-4.337,1.15,z,.012,.79,.016,m.darkWood);
    ball(-4.315,1.2,z+.28,.022,m.brass);
  }
  // Foreground: generously sized rounded solid oak top, readable at narrow aspects.
  const table=new T.Group();scene.add(table); table.position.set(-.85,.79,1.12);
  const shape=new T.Shape();const w=2.75,d=1.45,r=.12;
  shape.moveTo(-w/2+r,-d/2);shape.lineTo(w/2-r,-d/2);shape.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);shape.lineTo(w/2,d/2-r);shape.quadraticCurveTo(w/2,d/2,w/2-r,d/2);shape.lineTo(-w/2+r,d/2);shape.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);shape.lineTo(-w/2,-d/2+r);shape.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);
  const top=mesh(new T.ExtrudeGeometry(shape,{depth:.065,bevelEnabled:true,bevelSize:.025,bevelThickness:.018,bevelSegments:3,steps:1}),m.oak,0,0,0,table);top.rotation.x=-Math.PI/2;
  const topUV=top.geometry.getAttribute('uv');for(let i=0;i<topUV.count;i++)topUV.setXY(i,topUV.getX(i)/w+.5,topUV.getY(i)/d+.5);topUV.needsUpdate=true;
  for(const x of [-1.0,1.0])for(const z of [-.43,.43])box(x,-.43,z,.065,.8,.065,m.darkWood,table);
  // Subtle baked contact occlusion complements the real shadow map at object bases.
  const contactCanvas=document.createElement('canvas');contactCanvas.width=contactCanvas.height=128;
  const cc=contactCanvas.getContext('2d')!;const cg=cc.createRadialGradient(64,64,8,64,64,64);cg.addColorStop(0,'rgba(0,0,0,.26)');cg.addColorStop(.6,'rgba(0,0,0,.14)');cg.addColorStop(1,'rgba(0,0,0,0)');cc.fillStyle=cg;cc.fillRect(0,0,128,128);
  const contactTexture=new T.CanvasTexture(contactCanvas);extraTextures.push(contactTexture);
  const contactMaterial=new T.MeshBasicMaterial({map:contactTexture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});extraMaterials.push(contactMaterial);
  const cupContact=mesh(new T.PlaneGeometry(.68,.68),contactMaterial,-.64,.875,1.45);cupContact.rotation.x=-Math.PI/2;cupContact.castShadow=false;
  const lampContact=mesh(new T.PlaneGeometry(.45,.45),contactMaterial,-1.15,.875,.56);lampContact.rotation.x=-Math.PI/2;lampContact.castShadow=false;
  // Cup with a true open ceramic lathe wall, rolled lip, handle, liquid and crema.
  const cup=new T.Group();cup.position.set(-.64,.895,1.45);scene.add(cup);
  const profile=[[.0,.008],[.087,.008],[.112,.018],[.14,.13],[.151,.228],[.153,.249],[.148,.256],[.140,.249],[.137,.22],[.129,.115],[.098,.035],[0,.035]].map(([x,y])=>new T.Vector2(x,y));
  const body=mesh(new T.LatheGeometry(profile,96),m.ceramic,0,0,0,cup);
  const cupUV=body.geometry.getAttribute('uv'),cupP=body.geometry.getAttribute('position');for(let i=0;i<cupUV.count;i++)cupUV.setY(i,cupP.getY(i)/.256);cupUV.needsUpdate=true;
  const handle=mesh(new T.TorusGeometry(.085,.021,20,48,Math.PI*1.72),m.ceramic,.16,.139,0,cup);handle.rotation.z=-Math.PI*.86;
  const saucer=cylinder(-.64,.890,1.45,.235,.21,.025,m.ceramic);
  const lip=mesh(new T.TorusGeometry(.145,.007,12,72),m.ceramic,0,.246,0,cup);lip.rotation.x=Math.PI/2;
  cylinder(0,.224,0,.136,.136,.002,m.coffee,cup);
  const crema=mat('#be9561',.42);
  const ring=mesh(new T.TorusGeometry(.129,.0025,8,96),crema,0,.226,0,cup);ring.rotation.x=Math.PI/2;
  for(const o of [body,handle,saucer,lip]) {o.userData.interaction='cup';interactables.push(o);}
  // A linen napkin with rolled edge, spoon and small paper menu.
  const cloth=new T.PlaneGeometry(.40,.49,24,24);const cp=cloth.getAttribute('position');for(let i=0;i<cp.count;i++){const x=cp.getX(i),y=cp.getY(i);cp.setZ(i,.008+.004*Math.sin(x*25+y*8)+.015*Math.pow(Math.abs(x)/.2,6));}cloth.computeVertexNormals();const napkin=mesh(cloth,m.fabric,.1,.871,1.28);napkin.rotation.set(-Math.PI/2,0,-.13);
  const spoon=ball(.12,.886,1.34,.041,m.brass);spoon.scale.set(.65,.15,1.3);
  rod(new T.Vector3(.12,.888,1.36),new T.Vector3(.11,.888,1.60),.008,m.brass);
  const paper=mat('#d8cdb3',.96);const menu=box(-1.61,.8795,1.29,.43,.013,.33,paper);menu.rotation.y=.12;
  for(let i=0;i<6;i++)box(-1.61,.887,1.2+i*.031,.25-(i%3)*.04,.001,.003,m.darkWood);
  // Table lamp: luminous pleated linen shade and localized real lighting.
  const lamp=new T.Group();lamp.position.set(-1.15,.8725,.56);scene.add(lamp);
  cylinder(0,.018,0,.15,.17,.035,m.brass,lamp);cylinder(0,.26,0,.017,.022,.48,m.brass,lamp);
  const shadeMat=new T.MeshStandardMaterial({color:'#edcc94',roughness:.85,side:T.DoubleSide,emissive:'#edac55',emissiveIntensity:.24});extraMaterials.push(shadeMat);
  const shade=mesh(new T.CylinderGeometry(.15,.29,.36,96,1,true),shadeMat,0,.56,0,lamp);
  for(let i=0;i<64;i++){const a=i/64*Math.PI*2;rod(new T.Vector3(Math.cos(a)*.289,.38,Math.sin(a)*.289),new T.Vector3(Math.cos(a)*.15,.74,Math.sin(a)*.15),.0021,shadeMat,lamp);}
  for(const [y,radius] of [[.38,.29],[.74,.15]]) {const q=mesh(new T.TorusGeometry(radius,.007,8,72),m.brass,0,y,0,lamp);q.rotation.x=Math.PI/2;}
  ball(0,.43,0,.048,warm,lamp);
  const lampLight=new T.PointLight('#ffcf91',2.6,4.2,2);lampLight.position.set(-1.15,1.3025,.56);scene.add(lampLight);
  const key=new T.SpotLight('#ffe0af',7,5,1.18,.95,2);key.position.set(-1.15,1.3525,.56);key.target.position.set(-.48,.83,1.65);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.radius=4;key.shadow.bias=-.001;key.shadow.normalBias=.018;scene.add(key,key.target);
  shade.userData.interaction='lamp';interactables.push(shade);
  // Back wall service counter, espresso machine, shelving and stacked crockery.
  box(4,.56,-7.35,5.2,1.12,1.0,m.darkWood);box(4,1.15,-7.35,5.4,.14,1.12,m.oak);
  for(let x=1.65;x<6.5;x+=.14)box(x,.61,-6.833,.037,1.0,.025,m.oak);
  const steel=mat('#64666a',.26,.82);box(4.7,1.46,-7.32,1.12,.48,.54,steel);box(4.7,1.56,-7.015,.87,.19,.02,m.darkWood);
  for(const x of [4.45,4.91]){cylinder(x,1.345,-6.98,.038,.038,.17,m.brass);rod(new T.Vector3(x,1.34,-7),new T.Vector3(x,1.32,-6.76),.021,m.darkWood);}
  const shelves=buildCafeShelves(m);scene.add(shelves.group);extraMaterials.push(...shelves.materials);extraTextures.push(...shelves.textures);
  // Architectural wall lights and hanging shades form warm pools down the room.
  const pendant=(x:number,z:number,y=2.9)=>{
    cylinder(x,3.54,z,.012,.012,1.2,m.darkWood);
    cylinder(x,y,z,.14,.42,.22,m.darkWood);
    cylinder(x,y-.115,z,.38,.38,.012,warm);
    const l=new T.SpotLight('#ffdda6',13,8,.88,1,2);l.position.set(x,y-.18,z);l.target.position.set(x,0,z);scene.add(l,l.target);
  };
  pendant(2.15,-1.4);pendant(3.6,-4.5);pendant(5.6,-6.8);
  const ceilingFill=new T.HemisphereLight('#c3d0d9','#534c44',.21);scene.add(ceilingFill);
  const roomFill=new T.PointLight('#ffe6c7',4.5,13,2);roomFill.position.set(3,3,0);scene.add(roomFill);
  const windowFill=new T.DirectionalLight('#9cbfd8',.34);windowFill.position.set(-5,5,-6);scene.add(windowFill);
  // Quiet, partially occluded rear occupants. Faces are deliberately subdued and
  // small; clothing silhouettes carry the gesture, never articulated toy limbs.
  const jacket=mat('#242c2e',.94),coat=mat('#34302c',.97),trousers=mat('#20282b',.96),skin=mat('#65594e',.96),hair=mat('#222524',1);
  const chair=(x:number,z:number,angle:number)=>{const g=new T.Group();g.position.set(x,0,z);g.rotation.y=angle;scene.add(g);box(0,.46,0,.52,.10,.50,m.fabric,g);box(0,.78,.23,.53,.56,.08,m.darkWood,g);for(const a of [-.22,.22])for(const b of [-.20,.20])box(a,.24,b,.032,.48,.032,m.darkWood,g);return g;};
  const person=(x:number,z:number,angle:number,variant:number)=>{
    const g=chair(x,z,angle);g.scale.setScalar(.88);const cloth=variant?coat:jacket;
    const torso=mesh(new T.CapsuleGeometry(.20,.32,8,24),cloth,0,.92,0,g);torso.scale.set(1,.95,.65);torso.rotation.x=-.16;
    const neck=cylinder(0,1.22,-.075,.042,.049,.085,skin,g);
    const head=ball(0,1.345,-.10,.11,skin,g);head.scale.set(.78,1.14,.85);head.rotation.x=.18;
    const h=ball(0,1.38,-.075,.113,hair,g);h.scale.set(.81,.96,.86);
    if(variant){const bun=ball(.04,1.385,.022,.049,hair,g);bun.scale.set(1,1.1,.9);}
    // Sleeves join the coat; hands and knees are hidden by table/chair and plants.
    for(const a of [-1,1]){const sleeve=mesh(new T.CapsuleGeometry(.055,.25,6,16),cloth,a*.18,.92,-.12,g);sleeve.rotation.x=-.65;rod(new T.Vector3(a*.17,.78,-.24),new T.Vector3(a*.09,.77,-.39),.043,cloth,g);rod(new T.Vector3(a*.105,.46,-.05),new T.Vector3(a*.105,.10,-.27),.055,trousers,g);}
    return g;
  };
  for(const [i,x,z] of [[0,2.30,-5.6],[1,4.85,-6.10]]){
    const contact=mesh(new T.PlaneGeometry(2.4,2.2),contactMaterial,x,.026,z);contact.rotation.x=-Math.PI/2;contact.castShadow=false;
    cylinder(x,.72,z,.49,.49,.055,m.oak);cylinder(x,.36,z,.044,.06,.7,m.darkWood);cylinder(x,.04,z,.23,.23,.05,m.darkWood);
    chair(x-.69,z,-Math.PI/2).scale.setScalar(.88);person(x+.66,z-.1,Math.PI/2+(i?.22:-.14),i);
    cylinder(x-.10,.79,z,.050,.04,.10,m.ceramic);box(x+.12,.755,z+.02,.20,.008,.26,paper);
  }
  // Potted plants frame the room, built from curved individual leaves.
  for(const [x,z,s] of [[1.30,-3.25,1.35],[5.10,-4.75,1.12],[.90,-1.6,.56],[6.6,-7.9,1.3]]){const p=createCafePlant(m,s);p.position.set(x,0,z);scene.add(p);}
  // Varied receding architecture, wet paving and soft practical street lights.
  const exterior=buildCafeExterior(m);scene.add(exterior.group);extraMaterials.push(...exterior.materials);extraTextures.push(...exterior.textures);
  // A soft steam column with three independently drifting transparent ribbons.
  const steamUniforms={time:{value:0},pulse:{value:0}};
  const steamMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,uniforms:steamUniforms,
    vertexShader:`varying vec2 vUv; uniform float time; void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*8.0-time*.75)*.033*uv.y+sin(uv.y*17.0+time*.3)*.015;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
    fragmentShader:`varying vec2 vUv;uniform float time;uniform float pulse;void main(){float center=.5+.10*sin(vUv.y*13.-time*.35);float w=.10+vUv.y*.22;float a=exp(-pow((vUv.x-center)/w,2.)*3.);a*=smoothstep(0.,.16,vUv.y)*(1.-smoothstep(.45,1.,vUv.y));a*=.12+.035*sin(vUv.y*28.-time*.9);gl_FragColor=vec4(.92,.88,.80,a*(1.+pulse*.35));}`});extraMaterials.push(steamMaterial);
  const steam=new T.Group();steam.position.set(-.64,1.11,1.45);scene.add(steam);
  for(let i=0;i<3;i++){const p=mesh(new T.PlaneGeometry(.31,.69,12,36),steamMaterial,(i-1)*.045,.345,0,steam);p.rotation.y=i*Math.PI/3;p.castShadow=false;p.receiveShadow=false;}
  return {scene,m,cup,saucer,steam,lamp,key,cupContact,lampContact,lampLight,shadeMat,steamUniforms,interactables,glass:{x:glassX,y:glassY,z:glassZ,w:glassW,h:glassH},
    dispose(){const geometries=new Set<T.BufferGeometry>();scene.traverse(o=>{if(o instanceof T.Mesh)geometries.add(o.geometry);if(o instanceof T.InstancedMesh)o.dispose();});geometries.forEach(g=>g.dispose());extraMaterials.forEach(v=>v.dispose());extraTextures.forEach(v=>v.dispose());scene.traverse(o=>{if(o instanceof T.Light && 'shadow' in o)(o as T.SpotLight).shadow?.dispose();});m.dispose();}};
}
