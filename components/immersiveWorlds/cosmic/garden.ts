import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mergeVertices, mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createPlant, type PlantKind } from './botany';

/** Every texture and mesh here is generated locally; no downloaded artwork. */
export function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}

function stoneTexture() {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(512, 512); const random = seededRandom(4204);
  const hash=(x:number,y:number)=>{const t=Math.sin(x*127.1+y*311.7)*43758.5453;return t-Math.floor(t);};
  const noise=(x:number,y:number)=>{
    const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
    const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
    return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(ix,iy),hash(ix+1,iy),sx),THREE.MathUtils.lerp(hash(ix,iy+1),hash(ix+1,iy+1),sx),sy);
  };
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    const cloud=noise(x*.012,y*.012)*.55+noise(x*.037,y*.037)*.28+noise(x*.115,y*.115)*.17;
    const pore=Math.pow(random(),15)*22;
    const grain=(random()-.5)*17;
    const value=142+cloud*72+grain-pore;
    const i=(y*512+x)*4;
    image.data[i]=value*.97;image.data[i+1]=value;image.data[i+2]=value*.99;image.data[i+3]=255;
  }
  ctx.putImageData(image, 0, 0);
  ctx.strokeStyle = 'rgba(63,68,65,.19)'; ctx.lineWidth = .65;
  for (let i = 0; i < 72; i++) {
    let x = random() * 512, y = random() * 512;
    ctx.beginPath(); ctx.moveTo(x,y);
    for(let j=0;j<5;j++){ x += random()*30-10; y += random()*35; ctx.lineTo(x,y); } ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(2.0,2.0);
  texture.anisotropy = 8;
  return texture;
}

function rockGeometry(seed: number, detail = 6) {
  const raw = new THREE.IcosahedronGeometry(1, detail);
  raw.deleteAttribute('normal');
  const geometry = mergeVertices(raw, .0001); raw.dispose();
  const p = geometry.attributes.position;
  for(let i=0;i<p.count;i++) {
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
    const r=1+Math.sin(x*6.9+seed)*.07+Math.sin(z*8.3+y*5.7+seed)*.06+Math.sin(x*19.1+z*13.6)*.018;
    p.setXYZ(i,x*r,y*r,z*r);
  }
  geometry.computeVertexNormals(); return geometry;
}

function islandMassGeometry(seed:number){
  const positions:number[]=[],uv:number[]=[],indices:number[]=[];
  const rings=14,segments=40;
  for(let j=0;j<=rings;j++){
    const t=j/rings,y=-.15-t*4.0;
    const base=3.1*Math.pow(1-t,.52)+.08;
    for(let i=0;i<=segments;i++){
      const angle=i/segments*Math.PI*2;
      const strata=1+Math.sin(t*38+seed)*.08+Math.sin(angle*7+seed+t*4)*.10+Math.cos(angle*11-t*2)*.045;
      const r=base*strata;
      positions.push(Math.cos(angle)*r,y+Math.sin(angle*5+seed)*.14*(1-t),Math.sin(angle)*r*.75);
      uv.push(i/segments,j/rings);
      if(j<rings&&i<segments){const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,a+1,b,b,a+1,b+1);}
    }
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

/** A seated terrace: stone continues behind the camera; the basin is below eye level. */
export function createGarden() {
  const group = new THREE.Group(); group.name = 'cosmic-living-terrace';
  const texture = stoneTexture();
  const stone = new THREE.MeshStandardMaterial({color: '#bbb8ab', map:texture, bumpMap:texture, bumpScale:.022, roughness:.82});
  const wetStone = new THREE.MeshStandardMaterial({color: '#747e7d', map:texture, bumpMap:texture, bumpScale:.018, roughness:.29, metalness:.12});
  const basalt = new THREE.MeshStandardMaterial({color:'#646d78', map:texture,bumpMap:texture,bumpScale:.033,roughness:.86});
  const moss = new THREE.MeshStandardMaterial({color:'#48674d',map:texture,bumpMap:texture,bumpScale:.033,roughness:.98});
  const gold = new THREE.MeshStandardMaterial({color:'#c9b88f',roughness:.5,metalness:.35});
  const materials = [stone,wetStone,basalt,moss,gold];
  const geometries: THREE.BufferGeometry[] = [];
  const plants: ReturnType<typeof createPlant>[] = [];
  const interactables: THREE.Object3D[] = [];
  const islands: {object:THREE.Group;x:number;y:number;phase:number}[] = [];
  const random = seededRandom(81102);
  const rockShapes = Array.from({length:6},(_,i)=>{const g=rockGeometry(31+i);geometries.push(g);return g;});
  const rock = (parent:THREE.Object3D,position:number[],scale:number[],material:THREE.Material=stone,seed=0) => {
    const m=new THREE.Mesh(rockShapes[seed%6],material);m.position.set(position[0],position[1],position[2]);m.scale.set(scale[0],scale[1],scale[2]);m.rotation.y=seed*.71;m.castShadow=true;m.receiveShadow=true;m.userData.cosmicStone=true;parent.add(m);return m;
  };
  const plant = (parent:THREE.Object3D,kind:PlantKind,x:number,y:number,z:number,scale:number,seed:number) => {
    const p=createPlant(kind,seed);p.group.position.set(x,y,z);p.group.scale.setScalar(scale);p.group.rotation.y=seed*.79;
    parent.add(p.group);if(parent===group)p.group.userData.nearPosition={x,z};plants.push(p);interactables.push(...p.interactables);return p;
  };

  // Continuous irregular terrace and exposed weathered edge. The pool is a real inset.
  rock(group,[0,-1.75,2.6],[8.5,1.25,8.6],basalt,1);
  rock(group,[0,-.78,3.9],[7.9,.48,5.5],stone,3);
  for(let i=0;i<32;i++) {
    const a=i/32*Math.PI*2;
    const r=1+(random()-.5)*.08;
    rock(group,[Math.cos(a)*3.12*r,-.44+random()*.10,-.85+Math.sin(a)*3.52*r],[.65+random()*.30,.34,.66+random()*.20],i%3===0?wetStone:stone,i);
  }
  // Submerged stone bed and a scattering of pebbles beneath the reflective surface.
  rock(group,[0,-.66,-.85],[2.9,.17,3.25],wetStone,2);
  for(let i=0;i<42;i++) {
    const a=random()*Math.PI*2, r=Math.sqrt(random())*2.5;
    rock(group,[Math.cos(a)*r,-.40,-.85+Math.sin(a)*r*1.1],[.09+random()*.14,.025+random()*.025,.07+random()*.15],wetStone,i);
  }
  // Close tactile, asymmetric foreground: broad fronds and pale worn seating stones.
  const near: [PlantKind,number,number,number,number][] = [
    ['broadleaf',-3.5,-.22,2.5,1.65],['fern',-2.55,-.18,3.9,1.2],['fern',-4.0,-.25,.1,1.8],
    ['broadleaf',3.55,-.18,1.0,1.75],['fern',2.6,-.2,3.5,1.35],['grass',4.5,-.08,2.8,1.7],
    ['blossom',-2.9,-.05,-2.5,1.15],['blossom',3.3,-.14,-2,1.25],['fern',-4.8,-.2,-2.7,1.5],
    ['broadleaf',4.5,-.18,-3.8,1.35],['grass',-3.3,-.16,-4,1.1],['grass',2.7,-.1,-4.2,1.0],
  ];
  near.forEach(([kind,x,y,z,s],i)=>plant(group,kind,x,y,z,s,120+i));
  plant(group,'fern',-3.55,-.13,1.3,1.1,192);
  plant(group,'broadleaf',3.3,-.14,3.45,1.5,193);
  plant(group,'fern',4,-.1,-.6,1.5,194);
  plant(group,'grass',-4,-.1,3.25,1.0,195);
  rock(group,[-3.6,-.14,3.4],[1.6,.48,1.3],stone,2);
  rock(group,[3.75,-.28,4.15],[1.3,.34,1.5],stone,4);
  for(let i=0;i<26;i++) {
    const a=random()*Math.PI*2;
    rock(group,[Math.cos(a)*(3.7+random()),-.14,-.85+Math.sin(a)*4.1],[.35+random()*.4,.08+random()*.09,.3+random()*.45],moss,i);
  }

  // Hanging gardens occupy distinct depths, never a rotating tabletop diorama.
  const makeIsland=(x:number,y:number,z:number,s:number,seed:number)=>{
    const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s);group.add(g);
    const massGeometry=islandMassGeometry(seed);geometries.push(massGeometry);
    const mass=new THREE.Mesh(massGeometry,basalt);mass.castShadow=true;mass.receiveShadow=true;g.add(mass);
    for(let j=0;j<7;j++){
      const a=j/7*Math.PI*2;
      rock(g,[Math.cos(a)*2.1,-.48,Math.sin(a)*1.5],[1.22,.6,.85],stone,seed+j);
    }
    rock(g,[0,-.02,0],[2.88,.12,2.07],moss,seed+3);
    plant(g,'broadleaf',-.9,.12,-.4,2.0,seed+2);
    plant(g,'fern',-1.35,.06,.3,1.25,seed+15);
    plant(g,'broadleaf',.45,.10,.45,1.15,seed+18);
    plant(g,'grass',1.85,.08,-.5,1.6,seed+17);
    plant(g,'fern',1.2,.13,.1,1.45,seed+5);
    plant(g,'grass',-1.8,.04,.3,1.1,seed+4);
    plant(g,'blossom',.7,.13,-.8,1.6,seed+8);
    // Pendant roots follow gentle curves; sparse small leaves keep the underside alive.
    const rootMat=new THREE.MeshStandardMaterial({color:'#6c7261',roughness:.85});materials.push(rootMat);
    for(let k=0;k<5;k++){
      const a=k*1.42+seed,rx=Math.cos(a)*2.3,rz=Math.sin(a)*1.7;
      const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(rx,.08,rz),new THREE.Vector3(rx*1.03,-.8,rz*1.05),new THREE.Vector3(rx*.86,-2.1-k*.14,rz),new THREE.Vector3(rx*.78+.2,-2.9-k*.2,rz)]);
      const geo=new THREE.TubeGeometry(curve,22,.026,5,false);geometries.push(geo);const vine=new THREE.Mesh(geo,rootMat);g.add(vine);
      if(k%2===0)plant(g,'fern',rx*.9,-1.1,rz, .36,seed+k+40);
    }
    islands.push({object:g,x,y,phase:seed});return g;
  };
  makeIsland(-10,2.6,-20,1.45,31).rotation.y=.5;
  makeIsland(9.8,.75,-16,1.15,45);
  makeIsland(-1.6,.55,-36,1.0,61);
  makeIsland(18,4.4,-43,1.9,76).rotation.z=-.08;
  makeIsland(-18,-1.4,-44,1.45,94);
  makeIsland(5,7.4,-57,.8,112);
  // Small stepped stones across the void connect the garden without becoming UI.
  for(let i=0;i<7;i++)rock(group,[-4.9-i*.65,-.35+i*.2,-6-i*1.35],[.88-i*.055,.25,.65],stone,3+i);

  const waterGeometry=new THREE.CircleGeometry(1,96);geometries.push(waterGeometry);
  const water=new Reflector(waterGeometry,{
    textureWidth:1024,textureHeight:1024,clipBias:.003,multisample:0,
    shader:{name:'CosmicGardenWater', uniforms:{tDiffuse:{value:null},textureMatrix:{value:new THREE.Matrix4()},color:{value:new THREE.Color()},uTime:{value:0},uPulse:{value:new THREE.Vector3()},uAge:{value:20}},
      vertexShader:`uniform mat4 textureMatrix;varying vec4 vReflection;varying vec3 vWorld;varying vec2 vUv;
      void main(){vUv=uv;vWorld=(modelMatrix*vec4(position,1.)).xyz;vReflection=textureMatrix*vec4(position,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`uniform sampler2D tDiffuse;uniform float uTime;uniform vec3 uPulse;uniform float uAge;varying vec4 vReflection;varying vec3 vWorld;varying vec2 vUv;
      void main(){vec2 p=vWorld.xz;float t=uTime;
        vec2 ripple=vec2(sin(p.y*6.3+t*.38)+sin(p.x*9.2+p.y*4.1-t*.29),cos(p.x*5.2-t*.32)+cos(p.y*8.1-p.x*3.8+t*.21))*.0014;
        float dist=length(vWorld.xz-uPulse.xz);float wave=sin(dist*12.-uAge*2.4)*exp(-pow(dist-uAge*.34,2.)*4.)*sin(clamp(uAge/8.,0.,1.)*3.14159);
        ripple+=normalize(p-uPulse.xz+vec2(.001))*wave*.0015;
        vec2 uv=vReflection.xy/vReflection.w+ripple;
        vec3 reflected=texture2D(tDiffuse,clamp(uv,vec2(.002),vec2(.998))).rgb;
        float fresnel=pow(1.-max(dot(normalize(cameraPosition-vWorld),vec3(0,1,0)),0.),3.);
        vec3 col=mix(vec3(.048,.13,.14),reflected,.58+fresnel*.32);
        float glint=pow(max(0.,sin(p.x*17.+p.y*12.+t*.3)*sin(p.y*19.-p.x*7.-t*.25)),18.);
        col+=vec3(.2,.32,.27)*glint*.17;col+=vec3(.16,.25,.19)*max(wave,0.)*.12;
        gl_FragColor=vec4(col,.86);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
    }
  });
  water.name='cosmic-reflecting-pool';water.rotation.x=-Math.PI/2;water.position.set(0,-.265,-.85);water.scale.set(2.83,3.18,1);
  (water.material as THREE.ShaderMaterial).transparent=true;water.renderOrder=2;
  group.add(water);interactables.push(water);
  const waterUniforms=(water.material as THREE.ShaderMaterial).uniforms;
  // Static stones share a draw per material/parent; floating islands keep local transforms.
  const parents=[group,...islands.map(i=>i.object)];
  for(const parent of parents){
    const buckets=new Map<THREE.Material,THREE.Mesh[]>();
    for(const child of [...parent.children])if(child instanceof THREE.Mesh && child.userData.cosmicStone){
      const material=child.material as THREE.Material;
      const bucket=buckets.get(material)??[];bucket.push(child);buckets.set(material,bucket);
    }
    for(const [material,meshes] of buckets){
      const pieces=meshes.map(mesh=>{mesh.updateMatrix();return mesh.geometry.clone().applyMatrix4(mesh.matrix);});
      const merged=mergeGeometries(pieces);pieces.forEach(g=>g.dispose());
      if(merged){geometries.push(merged);const batch=new THREE.Mesh(merged,material);batch.castShadow=true;batch.receiveShadow=true;parent.add(batch);meshes.forEach(mesh=>parent.remove(mesh));}
    }
  }
  let disposed=false;
  return {group,interactables,water,
    update(time:number,pulse?:{position:THREE.Vector3;age:number}|null){
      if(disposed)return;
      plants.forEach(p=>p.update(time,pulse));
      islands.forEach(({object,y,phase})=>{object.position.y=y+Math.sin(time*.065+phase)*.055;});
      waterUniforms.uTime.value=time;waterUniforms.uAge.value=pulse?.age??20;
      if(pulse)waterUniforms.uPulse.value.copy(pulse.position);
    },
    setAspect(aspect:number){
      const narrow=aspect<.8;
      for(const p of plants){const base=p.group.userData.nearPosition;if(base)p.group.position.x=base.x*(narrow?.40:1);}
      for(const island of islands)island.object.position.x=island.x*(narrow?.58:1);
    },
    dispose(){if(disposed)return;disposed=true;plants.forEach(p=>p.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());texture.dispose();water.dispose();group.clear();}
  };
}
