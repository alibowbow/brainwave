import * as T from 'three';
import { makeCafeMaterials } from './materials';
import { createCafePlant } from './plant';

export type CafeInteraction = 'cup' | 'lamp' | 'window';
export function buildCafe() {
  const scene = new T.Scene();
  scene.background = new T.Color('#263846');
  scene.fog = new T.FogExp2('#263846', .021);
  const m = makeCafeMaterials();
  m.oak.color.set('#b99171');
  m.plaster.color.set('#b6ac95');
  const interactables: T.Object3D[] = [];
  const extraMaterials: T.Material[] = [];
  const mat = (color: string, roughness = .8, metalness = 0) => {
    const v = new T.MeshStandardMaterial({color, roughness, metalness}); extraMaterials.push(v); return v;
  };
  const warm = new T.MeshStandardMaterial({color:'#fff4d6', emissive:'#ffc580', emissiveIntensity:2});
  extraMaterials.push(warm);
  const mesh = (g: T.BufferGeometry, material: T.Material, x: number,y: number,z: number, parent:T.Object3D=scene) => {
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
  for(let i=0;i<12;i++) box(-4.9+i*.5,.008,3.2,.483,.024,9.5,m.oak);
  for(let i=0;i<13;i++) box(1+i*.5,.008,-3.2,.483,.024,12,m.oak);
  box(4,2,-9,8,4,.18,m.plaster); box(7.2,2,-2,.2,4,14,m.plaster);
  box(.82,2,-5.3,.16,4,7.5,m.darkWood);
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
  for(const x of [-1.0,1.0])for(const z of [-.43,.43])box(x,-.43,z,.065,.8,.065,m.darkWood,table);
  // Cup with a true open ceramic lathe wall, rolled lip, handle, liquid and crema.
  const cup=new T.Group();cup.position.set(-.64,.905,1.45);scene.add(cup);
  const profile=[[.0,.008],[.087,.008],[.112,.018],[.14,.13],[.151,.228],[.153,.249],[.148,.256],[.140,.249],[.137,.22],[.129,.115],[.098,.035],[0,.035]].map(([x,y])=>new T.Vector2(x,y));
  const body=mesh(new T.LatheGeometry(profile,96),m.ceramic,0,0,0,cup);
  const handle=mesh(new T.TorusGeometry(.085,.021,20,48,Math.PI*1.72),m.ceramic,.16,.139,0,cup);handle.rotation.z=-Math.PI*.86;
  const saucer=cylinder(-.64,.890,1.45,.235,.21,.025,m.ceramic);
  const lip=mesh(new T.TorusGeometry(.145,.007,12,72),m.ceramic,0,.246,0,cup);lip.rotation.x=Math.PI/2;
  cylinder(0,.224,0,.136,.136,.002,m.coffee,cup);
  const crema=mat('#be9561',.42);
  const ring=mesh(new T.TorusGeometry(.129,.0025,8,96),crema,0,.226,0,cup);ring.rotation.x=Math.PI/2;
  for(const o of [body,handle,saucer,lip]) {o.userData.interaction='cup';interactables.push(o);}
  // A linen napkin with rolled edge, spoon and small paper menu.
  const napkin=box(.1,.898,1.28,.36,.014,.49,m.fabric);napkin.rotation.y=-.13;
  const spoon=ball(.12,.923,1.34,.041,m.brass);spoon.scale.set(.65,.15,1.3);
  rod(new T.Vector3(.12,.92,1.36),new T.Vector3(.11,.92,1.60),.008,m.brass);
  const paper=mat('#d8cdb3',.96);const menu=box(-1.61,.902,1.29,.43,.013,.33,paper);menu.rotation.y=.12;
  for(let i=0;i<6;i++)box(-1.61,.91,1.2+i*.031,.25-(i%3)*.04,.001,.003,m.darkWood);
  // Table lamp: luminous pleated linen shade and localized real lighting.
  const lamp=new T.Group();lamp.position.set(-1.15,.90,.56);scene.add(lamp);
  cylinder(0,.018,0,.15,.17,.035,m.brass,lamp);cylinder(0,.26,0,.017,.022,.48,m.brass,lamp);
  const shadeMat=new T.MeshStandardMaterial({color:'#edcc94',roughness:.85,side:T.DoubleSide,emissive:'#edac55',emissiveIntensity:.24});extraMaterials.push(shadeMat);
  const shade=mesh(new T.CylinderGeometry(.15,.29,.36,96,1,true),shadeMat,0,.56,0,lamp);
  for(let i=0;i<64;i++){const a=i/64*Math.PI*2;rod(new T.Vector3(Math.cos(a)*.289,.38,Math.sin(a)*.289),new T.Vector3(Math.cos(a)*.15,.74,Math.sin(a)*.15),.0025,m.fabric,lamp);}
  for(const [y,radius] of [[.38,.29],[.74,.15]]) {const q=mesh(new T.TorusGeometry(radius,.007,8,72),m.brass,0,y,0,lamp);q.rotation.x=Math.PI/2;}
  ball(0,.43,0,.048,warm,lamp);
  const lampLight=new T.PointLight('#ffcf91',3.8,5.0,2);lampLight.position.set(-1.15,1.33,.56);scene.add(lampLight);
  const key=new T.SpotLight('#ffdbab',14,9,1.10,.8,2);key.position.set(-1.15,2.5,1.1);key.target.position.set(-.75,.72,1.2);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.001;key.shadow.normalBias=.018;scene.add(key,key.target);
  shade.userData.interaction='lamp';interactables.push(shade);
  // Back wall service counter, espresso machine, shelving and stacked crockery.
  box(4,.56,-7.35,5.2,1.12,1.0,m.darkWood);box(4,1.15,-7.35,5.4,.14,1.12,m.oak);
  for(let x=1.65;x<6.5;x+=.14)box(x,.61,-6.833,.037,1.0,.025,m.oak);
  const steel=mat('#64666a',.26,.82);box(4.7,1.46,-7.32,1.12,.48,.54,steel);box(4.7,1.56,-7.015,.87,.19,.02,m.darkWood);
  for(const x of [4.45,4.91]){cylinder(x,1.345,-6.98,.038,.038,.17,m.brass);rod(new T.Vector3(x,1.34,-7),new T.Vector3(x,1.32,-6.76),.021,m.darkWood);}
  for(const y of [1.96,2.64]){box(4.25,y,-8.73,5.2,.07,.49,m.oak);for(let i=0;i<9;i++){const x=2.1+i*.52; if(i%3===0){cylinder(x,y+.19,-8.70,.115,.115,.30,m.ceramic);}else{for(let j=0;j<3;j++)cylinder(x,y+.05+j*.053,-8.65,.078,.058,.05,m.ceramic);}}}
  // Architectural wall lights and hanging shades form warm pools down the room.
  const pendant=(x:number,z:number,y=2.9)=>{
    cylinder(x,3.54,z,.012,.012,1.2,m.darkWood);
    cylinder(x,y,z,.14,.42,.22,m.darkWood);
    cylinder(x,y-.115,z,.38,.38,.012,warm);
    const l=new T.PointLight('#ffd6a0',12,7,2);l.position.set(x,y-.25,z);scene.add(l);
  };
  pendant(2.15,-1.4);pendant(3.6,-4.5);pendant(5.6,-6.8);
  const ceilingFill=new T.HemisphereLight('#9cbbd0','#897564',.38);scene.add(ceilingFill);
  const roomFill=new T.PointLight('#ffe1b8',14,15,2);roomFill.position.set(3,3,0);scene.add(roomFill);
  const windowFill=new T.DirectionalLight('#9cbfd8',.28);windowFill.position.set(-5,5,-6);scene.add(windowFill);
  // Distant quiet guests seated side-on: layered body/clothes geometry, no approach or gestures.
  const jacket=mat('#4a5554');const trousers=mat('#242c30');const skin=mat('#ae8972');const hair=mat('#332a28');
  const chair=(x:number,z:number,angle:number)=>{const g=new T.Group();g.position.set(x,0,z);g.rotation.y=angle;scene.add(g);box(0,.49,0,.56,.12,.56,m.fabric,g);box(0,.90,.24,.55,.72,.10,m.fabric,g);for(const a of [-.23,.23])for(const b of [-.22,.22])box(a,.25,b,.035,.50,.035,m.darkWood,g);return g;};
  const person=(x:number,z:number,angle:number)=>{
    const g=chair(x,z,angle);
    const torso=ball(0,1.02,0,.29,jacket,g);torso.scale.set(.74,1.20,.60);torso.rotation.x=-.1;
    cylinder(0,1.33,-.03,.056,.065,.13,skin,g);
    const head=ball(0,1.47,-.05,.14,skin,g);head.scale.set(.86,1.16,.92);
    ball(0,1.45,-.179,.027,skin,g);for(const side of [-1,1]){const ear=ball(side*.119,1.46,-.03,.03,skin,g);ear.scale.set(.4,1,.75);}
    const h=ball(0,1.53,-.018,.144,hair,g);h.scale.set(.88,.85,.93);
    for(const a of [-1,1]){rod(new T.Vector3(a*.16,1.10,-.02),new T.Vector3(a*.21,.9,-.26),.067,jacket,g);rod(new T.Vector3(a*.21,.9,-.26),new T.Vector3(a*.12,.91,-.46),.048,jacket,g);ball(a*.12,.91,-.47,.048,skin,g);rod(new T.Vector3(a*.12,.60,-.1),new T.Vector3(a*.13,.43,-.35),.085,trousers,g);rod(new T.Vector3(a*.13,.43,-.35),new T.Vector3(a*.13,.09,-.35),.055,trousers,g);const shoe=ball(a*.13,.065,-.40,.095,m.darkWood,g);shoe.scale.set(.7,.6,1.4);}
  };
  for(const [x,z] of [[1.45,-3.90],[4.15,-5.5]]){
    cylinder(x,.79,z,.64,.64,.065,m.oak);cylinder(x,.4,z,.055,.07,.76,m.darkWood);cylinder(x,.04,z,.30,.30,.05,m.darkWood);
    chair(x-.94,z,-Math.PI/2);person(x+.93,z,Math.PI/2);
    cylinder(x-.15,.87,z,.07,.05,.13,m.ceramic);box(x+.1,.835,z+.1,.28,.015,.33,paper);
  }
  // Potted plants frame the room, built from curved individual leaves.
  for(const [x,z,s] of [[.9,-1.5,.86],[6.6,-7.9,1.3]]){const p=createCafePlant(m,s);p.position.set(x,0,z);scene.add(p);}
  // Outside: real 3D storefronts and wet paving, receding behind the window.
  box(-4,-.035,-12,26,.05,22,m.pavement);
  const facade=[mat('#25343e'),mat('#394048'),mat('#283e48')];
  for(let i=0;i<6;i++){
    const x=-12+i*3.6;box(x,3.7,-18,3.48,7.4,1.4,facade[i%3]);
    for(let j=0;j<3;j++)for(let k=0;k<2;k++){
      const wx=x-.85+k*1.7,wy=1.65+j*1.8;
      box(wx,wy,-17.26,1.04,1.24,.09,m.darkWood);
      const windowMaterial=new T.MeshStandardMaterial({color:j===0?'#75624f':'#3c4344',emissive:j===0?'#f1b36b':'#b4a484',emissiveIntensity:j===0?1.05:.18,roughness:.28});extraMaterials.push(windowMaterial);box(wx,wy,-17.20,.92,1.10,.025,windowMaterial);
      box(wx,wy,-17.16,.035,1.1,.03,m.darkWood);
    }
    box(x,.9,-17.08,2.80,.08,.4,m.darkWood);
    // broken amber streaks lie on pavement instead of hovering as particles
    for(let k=0;k<24;k++){
      const streakMat=new T.MeshBasicMaterial({color:i%2?'#acac87':'#d2a376',transparent:true,opacity:.018+.07*(1-k/24),depthWrite:false});extraMaterials.push(streakMat);
      const p=mesh(new T.PlaneGeometry(.32+Math.sin(k*8.7+i)*.15,.075),streakMat,x+Math.sin(k*2.1)*.24,.005,-16.2+k*.28);p.rotation.x=-Math.PI/2;
    }
  }
  for(const [x,z] of [[-3.8,-9.2],[-8,-12.6]]){
    cylinder(x,1.75,z,.036,.05,3.5,m.darkWood);rod(new T.Vector3(x,3.5,z),new T.Vector3(x+.36,3.5,z),.035,m.darkWood);ball(x+.36,3.44,z,.12,warm);
    const l=new T.PointLight('#f5c18a',18,7,2);l.position.set(x+.36,3.37,z);scene.add(l);
  }
  // A soft steam column with three independently drifting transparent ribbons.
  const steamUniforms={time:{value:0},pulse:{value:0}};
  const steamMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,uniforms:steamUniforms,
    vertexShader:`varying vec2 vUv; uniform float time; void main(){vUv=uv;vec3 p=position;p.x+=sin(uv.y*8.0-time*.75)*.033*uv.y+sin(uv.y*17.0+time*.3)*.015;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
    fragmentShader:`varying vec2 vUv;uniform float time;uniform float pulse;void main(){float center=.5+.10*sin(vUv.y*13.-time*.35);float w=.10+vUv.y*.22;float a=exp(-pow((vUv.x-center)/w,2.)*3.);a*=smoothstep(0.,.16,vUv.y)*(1.-smoothstep(.45,1.,vUv.y));a*=.12+.035*sin(vUv.y*28.-time*.9);gl_FragColor=vec4(.92,.88,.80,a*(1.+pulse*.35));}`});extraMaterials.push(steamMaterial);
  const steam=new T.Group();steam.position.set(-.64,1.12,1.45);scene.add(steam);
  for(let i=0;i<3;i++){const p=mesh(new T.PlaneGeometry(.31,.69,12,36),steamMaterial,(i-1)*.045,.345,0,steam);p.rotation.y=i*Math.PI/3;p.castShadow=false;p.receiveShadow=false;}
  return {scene,m,cup,lampLight,shadeMat,steamUniforms,interactables,glass:{x:glassX,y:glassY,z:glassZ,w:glassW,h:glassH},
    dispose(){const geometries=new Set<T.BufferGeometry>();scene.traverse(o=>{if(o instanceof T.Mesh)geometries.add(o.geometry);});geometries.forEach(g=>g.dispose());extraMaterials.forEach(v=>v.dispose());scene.traverse(o=>{if(o instanceof T.Light && 'shadow' in o)(o as T.SpotLight).shadow?.dispose();});m.dispose();}};
}
