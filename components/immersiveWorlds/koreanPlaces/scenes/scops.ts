import * as THREE from 'three';
import type { SceneContent, WorldInteraction } from '../types';

/** Original procedural Korean forest-edge porch. All textures are authored here. */
export function createScopsScene(): SceneContent {
  let seed = 78219;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1c3046');
  scene.fog = new THREE.FogExp2('#20394a', .011);
  const camera = new THREE.PerspectiveCamera(53, 1, .08, 200);
  const Y = new THREE.Vector3(0, 1, 0);
  function texture(kind: 'wood' | 'bark' | 'leaf' | 'feather' | 'stone'): THREE.CanvasTexture {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    if (kind === 'leaf') {
      ctx.clearRect(0, 0, 512, 512);
      const g = ctx.createLinearGradient(0, 0, 512, 400);
      g.addColorStop(0, '#cad8a3'); g.addColorStop(.35, '#8ba86b'); g.addColorStop(1, '#35532b');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(30, 256);
      ctx.bezierCurveTo(160, 100, 350, 110, 488, 256);
      ctx.bezierCurveTo(330, 412, 155, 402, 30, 256); ctx.fill();
      ctx.strokeStyle = '#bbc991'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(27, 256); ctx.lineTo(480, 256); ctx.stroke();
      ctx.strokeStyle = '#9cb879'; ctx.lineWidth = 1.5;
      for (let x = 100; x < 430; x += 38) {
        ctx.beginPath(); ctx.moveTo(x - 34, 256); ctx.lineTo(x + 14, 169 + Math.abs(x - 256) * .25); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 34, 256); ctx.lineTo(x + 14, 343 - Math.abs(x - 256) * .25); ctx.stroke();
      }
    } else {
      const base = kind === 'wood' ? '#846a48' : kind === 'bark' ? '#716b57' : kind === 'stone' ? '#626c68' : '#918677';
      ctx.fillStyle = base; ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 4200; i++) {
        const v = random(); const x = random() * 512; const y = random() * 512;
        ctx.strokeStyle = v < .5 ? `rgba(13,15,11,${.035 + v * .21})` : `rgba(237,227,190,${.035 + (v-.5) * .12})`;
        ctx.lineWidth = kind === 'bark' ? 1 + random() * 3 : .4 + random() * 1.6;
        ctx.beginPath(); ctx.moveTo(x, y);
        if (kind === 'stone') ctx.lineTo(x + random() * 8, y + random() * 5);
        else if (kind === 'feather') { ctx.quadraticCurveTo(x + 5, y + 8, x + random() * 9 - 4, y + 8 + random() * 25); }
        else ctx.bezierCurveTo(x + random() * 6 - 3, y + 28, x + random() * 12 - 6, y + 75, x + random() * 8 - 4, y + 40 + random() * 130);
        ctx.stroke();
      }
      if (kind === 'wood') for (let i = 0; i < 8; i++) {
        const x = random() * 512; const y = random() * 512;
        for (let j = 1; j < 9; j++) {
          ctx.strokeStyle = `rgba(35,25,14,${.13 - j * .01})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(x, y, 2 + j * 2.2, 5 + j * 8.5, .01, 0, Math.PI * 2); ctx.stroke();
        }
      }
    }
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 4;
    return map;
  }
  const woodMap = texture('wood'); woodMap.repeat.set(1, 2.5);
  const barkMap = texture('bark'); barkMap.repeat.set(2, 3);
  const leafMap = texture('leaf'); const featherMap = texture('feather'); const stoneMap = texture('stone');
  const wood = new THREE.MeshStandardMaterial({ color: '#947958', map: woodMap, bumpMap: woodMap, bumpScale: .026, roughness: .88 });
  const edgeWood = new THREE.MeshStandardMaterial({ color: '#645039', map: woodMap, roughness: .93, bumpMap: woodMap, bumpScale: .04 });
  const bark = new THREE.MeshStandardMaterial({ color: '#8d8870', map: barkMap, bumpMap: barkMap, bumpScale: .07, roughness: .99 });
  const stone = new THREE.MeshStandardMaterial({ color: '#626f69', map: stoneMap, roughness: 1, bumpMap: stoneMap, bumpScale: .025 });
  const leafMat = new THREE.MeshStandardMaterial({ color: '#a2bca2', map: leafMap, alphaTest: .55, side: THREE.DoubleSide, roughness: .93 });
  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], parent: THREE.Object3D = scene) {
    const m = new THREE.Mesh(geometry, material); m.position.set(...position); m.castShadow = m.receiveShadow = true; parent.add(m); return m;
  }
  const box = (w: number, h: number, d: number, material: THREE.Material, p: [number, number, number], parent?: THREE.Object3D) => mesh(new THREE.BoxGeometry(w, h, d), material, p, parent);
  function limb(a: THREE.Vector3, b: THREE.Vector3, r1: number, r2: number, material = bark, parent: THREE.Object3D = scene, sides = 9) {
    const d = b.clone().sub(a); const m = mesh(new THREE.CylinderGeometry(r2, r1, d.length(), sides), material, a.clone().add(b).multiplyScalar(.5).toArray() as [number, number, number], parent);
    m.quaternion.setFromUnitVectors(Y, d.normalize()); return m;
  }
  scene.add(new THREE.HemisphereLight('#aac6dc', '#38452f', 1.1));
  const moonLight = new THREE.DirectionalLight('#bed8f7', 2.25); moonLight.position.set(-8, 17, -7); moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(1024, 1024); moonLight.shadow.camera.left = -12; moonLight.shadow.camera.right = 12;
  moonLight.shadow.camera.top = 12; moonLight.shadow.camera.bottom = -12; moonLight.shadow.normalBias = .035;
  moonLight.shadow.bias = -.0002; scene.add(moonLight); moonLight.target.position.set(0, 0, -7); scene.add(moonLight.target);
  const porchFill = new THREE.PointLight('#b6cadc', 2.7, 12, 2); porchFill.position.set(-2, 3.8, .2); scene.add(porchFill);

  // A full-scale wood floor, old edge beam and roof framing put the eye inside a place.
  const nailMatrices: THREE.Matrix4[] = [];
  const nailTransform = new THREE.Object3D();
  for (let i = 0; i < 19; i++) {
    const plank = box(.46, .135, 6.7, wood, [-4.35 + i * .48, -.07 + (random() - .5) * .008, 3.2]);
    plank.rotation.y = (random() - .5) * .001;
    for (const z of [.35, 3.1, 5.9]) for (const side of [-1, 1]) {
      nailTransform.position.set(-4.35+i*.48+side*.15, .002, z); nailTransform.rotation.x = -Math.PI / 2; nailTransform.updateMatrix(); nailMatrices.push(nailTransform.matrix.clone());
    }
  }
  const nails = new THREE.InstancedMesh(new THREE.CircleGeometry(.017, 7), new THREE.MeshStandardMaterial({ color: '#3e3931', metalness: .5, roughness: .85 }), nailMatrices.length);
  nailMatrices.forEach((m,i)=>nails.setMatrixAt(i,m)); scene.add(nails);
  box(9.25, .3, .26, edgeWood, [0, -.18, -.17]);
  box(.32, 3.4, .32, edgeWood, [-3.85, 1.7, .04]);
  box(.27, 3.4, .27, edgeWood, [4.15, 1.7, .1]);
  box(8.5, .31, .34, edgeWood, [.15, 3.26, .04]);
  for (const x of [-3.78, 4.07]) {
    const brace = box(.17, 1.07, .18, edgeWood, [x + (x < 0 ? .29 : -.29), 2.89, .05]); brace.rotation.z = x < 0 ? -.7 : .7;
  }
  // Lower right step and one low rail, intentionally leaving the stream sightline open.
  box(1.0, .15, .85, wood, [3.65, -.30, -.6]);
  box(.16, .83, .16, edgeWood, [4.08, .35, -.12]); box(.16, .83, .16, edgeWood, [4.08, .35, 2.8]);
  box(.2, .16, 3.2, edgeWood, [4.08, .81, 1.32]);

  // Forest floor uses gentle relief, not a flat platform; stream bed sits beyond its edge.
  const groundGeo = new THREE.PlaneGeometry(100, 120, 90, 100); groundGeo.rotateX(-Math.PI / 2);
  const gp = groundGeo.attributes.position;
  for (let i = 0; i < gp.count; i++) {
    const x = gp.getX(i), z = gp.getZ(i) - 48;
    gp.setXYZ(i, x, -.8 + Math.sin(x * .31 + z * .17) * .18 + Math.cos(z * .27) * .12, z);
  }
  groundGeo.computeVertexNormals(); mesh(groundGeo, new THREE.MeshStandardMaterial({ color: '#3d5140', map: stoneMap, roughness: 1 }), [0, 0, 0]);
  // River meanders left then right into depth. Its visible width decreases by perspective.
  const riverX = (z: number) => 3.3 + Math.sin((-z - 10) * .074) * 2.6;
  const riverVertices: number[] = [], riverUv: number[] = [], riverIndices: number[] = [];
  for (let i = 0; i <= 120; i++) {
    const z = -8 - i * .73; const width = 1.2 + Math.sin(i * .021) * .35;
    riverVertices.push(riverX(z) - width, -.535, z, riverX(z) + width, -.535, z);
    riverUv.push(0, i / 5, 1, i / 5);
    if (i < 120) { const a = i * 2; riverIndices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const riverGeo = new THREE.BufferGeometry(); riverGeo.setAttribute('position', new THREE.Float32BufferAttribute(riverVertices, 3)); riverGeo.setAttribute('uv', new THREE.Float32BufferAttribute(riverUv, 2)); riverGeo.setIndex(riverIndices); riverGeo.computeVertexNormals();
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uCamera: { value: camera.position } },
    vertexShader: `varying vec2 vUv; varying vec3 vWorld; void main(){vUv=uv; vec4 p=modelMatrix*vec4(position,1.);vWorld=p.xyz; gl_Position=projectionMatrix*viewMatrix*p;}`,
    fragmentShader: `uniform float uTime;uniform vec3 uCamera;varying vec2 vUv;varying vec3 vWorld;
      void main(){float rip=sin(vUv.y*25.+sin(vUv.x*18.+uTime*.28)*1.8-uTime*.6);
      float rip2=sin(vUv.y*63.-vUv.x*13.+uTime*.38);float m=pow(max(0.,rip*.57+rip2*.43),7.);
      float fres=pow(1.-max(0.,normalize(uCamera-vWorld).y),3.);
      float path=exp(-pow((vUv.x-.46)*2.6,2.));
      vec3 c=mix(vec3(.06,.13,.17),vec3(.23,.38,.46),fres*.7);
      c+=vec3(.35,.48,.54)*m*path*.75;float fog=1.-exp(-length(uCamera-vWorld)*.013);c=mix(c,vec3(.075,.145,.19),fog);
      gl_FragColor=vec4(c,1.); #include <tonemapping_fragment> #include <colorspace_fragment> }`,
    side: THREE.DoubleSide,
  });
  // Shader chunks require directives on their own lines.
  waterMaterial.fragmentShader = waterMaterial.fragmentShader.replace(' #include', '\n#include').replace(' #include', '\n#include').replace('> }', '>\n}');
  mesh(riverGeo, waterMaterial, [0, 0, 0]);
  for (let i = 0; i < 65; i++) {
    const z = -8 - random() * 58; const side = random() > .5 ? 1 : -1;
    const rock = mesh(new THREE.IcosahedronGeometry(.17 + random() * .38, 1), stone, [riverX(z) + side * (1.33 + random() * .48), -.47, z]);
    rock.scale.set(1.3, .5, .7 + random()); rock.rotation.set(random(), random(), random());
  }

  // Distant mountain silhouettes remain actual spatial meshes, with independently shaped profiles.
  for (let layer = 0; layer < 4; layer++) {
    const vertices: number[] = [], indices: number[] = []; const z = -66 - layer * 21;
    for (let i = 0; i <= 55; i++) {
      const x = -125 + i * 4.55;
      const y = 4 + layer * 2 + Math.sin(i*.18 + layer*2)*2.8 + Math.sin(i*.41 + layer)*1.1 + Math.sin(i*.083+1)*2.6;
      vertices.push(x, -5, z, x, y, z);
      if (i < 55) { const a = i*2; indices.push(a,a+1,a+2,a+1,a+3,a+2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3)); g.setIndex(indices); g.computeVertexNormals();
    const colors = ['#1b353b','#294650','#345461','#3a5a6a']; mesh(g,new THREE.MeshBasicMaterial({color:colors[layer],fog:false,side:THREE.DoubleSide}),[0,0,0]);
  }
  const skyGeo = new THREE.SphereGeometry(155, 36, 24);
  const skyMat = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false,
    vertexShader: `varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 vP;void main(){float h=clamp(normalize(vP).y,0.,1.);vec3 c=mix(vec3(.17,.28,.34),vec3(.018,.045,.09),pow(h,.55));gl_FragColor=vec4(c,1.);}` });
  const sky = mesh(skyGeo,skyMat,[0,0,0]); sky.renderOrder=-10; sky.castShadow=false; sky.receiveShadow=false;
  const stars: number[] = []; for (let i=0;i<100;i++) { const x=(random()-.5)*210,y=18+random()*88,z=-100-random()*25; stars.push(x,y,z); }
  const starGeo = new THREE.BufferGeometry(); starGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
  scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:'#b0c2ce',size:.095,transparent:true,opacity:.48,depthWrite:false,fog:false})));
  const moon = mesh(new THREE.SphereGeometry(1.15,28,20),new THREE.MeshBasicMaterial({color:'#bdccd0',fog:false}),[-43,38,-110]); moon.castShadow=false;

  // Asymmetric trunks and many real leaves layered above, beside and behind the owl.
  const leafGeo = new THREE.PlaneGeometry(1, .5);
  const treePositions: [number,number,number][] = [[-3.7,-.55,-3.8],[-7,-.5,-8],[7.8,-.55,-13],[-11,-.6,-16],[13,-.6,-24],[-9,-.6,-28],[-15,-.6,-40],[17,-.6,-43]];
  const leafMatrices: THREE.Matrix4[] = []; const leafColors: THREE.Color[] = [];
  const transform = new THREE.Object3D();
  function addLeafCluster(center: THREE.Vector3, radius: number, count: number, size: number) {
    for (let j=0;j<count;j++) {
      const a=random()*Math.PI*2,r=Math.sqrt(random())*radius;
      transform.position.set(center.x+Math.cos(a)*r,center.y+(random()-.5)*radius*.75,center.z+Math.sin(a)*r*.65);
      transform.rotation.set(-.35 + random()*1.35,random()*Math.PI*2,random()*.65-.32);
      const s=size*(.6+random()*.9);transform.scale.set(s,s,s);transform.updateMatrix();leafMatrices.push(transform.matrix.clone());leafColors.push(new THREE.Color().setHSL(.26+random()*.055,.2+random()*.2,.28+random()*.18));
    }
  }
  treePositions.forEach(([x,y,z],index)=>{
    const h=index===0?5.8:6+random()*4, r=index===0?.34:.24+random()*.18;
    const a=new THREE.Vector3(x,y,z),b=new THREE.Vector3(x+.25,y+h*.56,z+.18),c=new THREE.Vector3(x-.08,y+h,z-.23);
    limb(a,b,r,r*.72);limb(b,c,r*.72,.10);
    for(let k=0;k<7;k++){
      const level=.36+k*.075;const start=new THREE.Vector3(x+.12,y+h*level,z);const angle=k*2.36+index;
      const end=new THREE.Vector3(x+Math.cos(angle)*(1.7+random()*1.4),y+h*level+1.1,z+Math.sin(angle)*2);
      limb(start,end,r*.24,.025);addLeafCluster(end,1.6,70,.5+index*.045);
    }
  });
  // Owl's branch is a distinct continuous branch in front of the forest, no animal approach.
  const branchA=new THREE.Vector3(-3.7,1.84,-3.8),branchB=new THREE.Vector3(-1.6,2.25,-4.7),branchC=new THREE.Vector3(.8,2.37,-6.0);
  limb(branchA,branchB,.135,.077);limb(branchB,branchC,.077,.025);
  limb(new THREE.Vector3(-2.7,2.05,-4.1),new THREE.Vector3(-2.4,3.4,-4.4),.06,.016);
  limb(new THREE.Vector3(-.1,2.32,-5.5),new THREE.Vector3(.9,2.88,-5.9),.032,.012);
  addLeafCluster(new THREE.Vector3(.8,2.95,-5.9),.65,40,.42);
  addLeafCluster(new THREE.Vector3(-2.45,3.25,-4.4),.7,55,.40);
  const canopy=new THREE.InstancedMesh(leafGeo,leafMat,leafMatrices.length);
  leafMatrices.forEach((matrix,i)=>{canopy.setMatrixAt(i,matrix);canopy.setColorAt(i,leafColors[i]);});canopy.castShadow=true;canopy.receiveShadow=true;scene.add(canopy);

  // Individual near blades and compound ferns frame the view below the decking.
  const grassGeo=new THREE.BufferGeometry();grassGeo.setAttribute('position',new THREE.Float32BufferAttribute([-.035,0,0,.035,0,0,.016,.32,-.012,.03,.64,-.065],3));grassGeo.setIndex([0,1,2,1,3,2]);grassGeo.computeVertexNormals();
  const grassMat=new THREE.MeshStandardMaterial({color:'#56724d',side:THREE.DoubleSide,roughness:1});
  const grasses=new THREE.InstancedMesh(grassGeo,grassMat,1050);
  for(let i=0;i<1050;i++){
    const x=(random()-.5)*32,z=-.6-random()*34;const riverDistance=Math.abs(x-riverX(z));
    transform.position.set(riverDistance<1.35&&z<-8?x+3.2:x,-.6+Math.sin(x*.31+z*.17)*.16,z);
    transform.rotation.set(0,random()*Math.PI*2,(random()-.5)*.35);transform.scale.setScalar(.45+random()*.85);transform.updateMatrix();grasses.setMatrixAt(i,transform.matrix);
    grasses.setColorAt(i,new THREE.Color().setHSL(.24+random()*.07,.25,.28+random()*.1));
  }
  scene.add(grasses);
  const fernMatrices: THREE.Matrix4[] = [];
  for(const [x,z,s] of [[-2.7,-1.2,1],[2.9,-2,.9],[-4.1,-2.7,1.2],[5,-3.5,1.3],[-1.6,-1.7,.8]]){
    for(let frond=0;frond<6;frond++){
      const a=frond*1.05+.4;
      const start=new THREE.Vector3(x,-.5,z),end=new THREE.Vector3(x+Math.sin(a)*s,.08+frond*.07,z+Math.cos(a)*s);
      limb(start,end,.012,.002,bark);
      for(let k=1;k<9;k++)for(const side of [-1,1]){
        const t=k/10,pos=start.clone().lerp(end,t),sz=Math.sin(t*Math.PI)*.32*s;
        transform.position.set(pos.x+Math.cos(a)*sz*.5*side,pos.y,pos.z-Math.sin(a)*sz*.5*side);transform.rotation.set(-Math.PI/2,a+(side>0?.7:-.7),0);transform.scale.set(sz,.3,.4);transform.updateMatrix();fernMatrices.push(transform.matrix.clone());
      }
    }
  }

  const ferns=new THREE.InstancedMesh(leafGeo,leafMat,fernMatrices.length);fernMatrices.forEach((m,i)=>ferns.setMatrixAt(i,m));ferns.receiveShadow=true;scene.add(ferns);
  // A Korean scops owl is small and bark-coloured: a low-contrast silhouette with restrained eye glints.
  const owl=new THREE.Group();owl.position.set(-1.28,2.29,-4.84);scene.add(owl);
  const feathers=new THREE.MeshStandardMaterial({color:'#a39884',map:featherMap,bumpMap:featherMap,bumpScale:.02,roughness:1});
  const wingMat=new THREE.MeshStandardMaterial({color:'#6f695a',map:featherMap,roughness:1});
  const faceMat=new THREE.MeshStandardMaterial({color:'#aaa28f',map:featherMap,roughness:1});
  const body=mesh(new THREE.SphereGeometry(.18,20,16),feathers,[0,.23,0],owl);body.scale.set(.88,1.33,.85);
  for(const side of [-1,1]){const wing=mesh(new THREE.SphereGeometry(.13,14,12),wingMat,[side*.137,.21,.035],owl);wing.scale.set(.5,1.8,.86);wing.rotation.z=side*.15;}
  const tail=mesh(new THREE.ConeGeometry(.07,.2,5),wingMat,[0,.05,.11],owl);tail.rotation.x=-.22;
  const head=new THREE.Group();head.position.set(0,.43,-.012);owl.add(head);
  const headBase=mesh(new THREE.SphereGeometry(.158,20,16),feathers,[0,0,0],head);headBase.scale.set(1.06,.91,.85);
  const eyelids: THREE.Mesh[]=[];
  for(const side of [-1,1]){
    const disc=mesh(new THREE.SphereGeometry(.066,16,12),faceMat,[side*.066,-.012,-.112],head);disc.scale.set(1,1.15,.22);
    const eye=mesh(new THREE.SphereGeometry(.027,14,10),new THREE.MeshStandardMaterial({color:'#83764b',roughness:.5}),[side*.066,-.006,-.129],head);eye.scale.set(1,.87,.35);eyelids.push(eye);
    const pupil=mesh(new THREE.SphereGeometry(.013,12,8),new THREE.MeshStandardMaterial({color:'#131a16',roughness:.35}),[side*.066,-.006,-.14],head);pupil.scale.set(1,1,.25);eyelids.push(pupil);
    const tuft=mesh(new THREE.ConeGeometry(.05,.14,5),wingMat,[side*.105,.115,.01],head);tuft.rotation.z=side*-.23;
    for(const dx of [-.025,.005,.03])limb(new THREE.Vector3(side*.06+dx,.037,-.014),new THREE.Vector3(side*.06+dx,.002,-.08),.008,.005,wingMat,owl,5);
  }
  const beak=mesh(new THREE.ConeGeometry(.022,.065,5),new THREE.MeshStandardMaterial({color:'#6f7262',roughness:.78}),[0,-.05,-.138],head);beak.rotation.x=Math.PI/2+.15;
  owl.rotation.y=Math.PI; // Face geometry points -Z; viewer is on the +Z side.

  // Small oil lantern: etched glass, warm oil reservoir, brass ribs and wire carrying loop.
  const table=new THREE.Group();table.position.set(1.15,0,1.5);scene.add(table);
  box(.84,.085,.69,wood,[0,.4,0],table);
  for(const x of [-.32,.32])for(const z of [-.24,.24])box(.065,.39,.065,edgeWood,[x,.2,z],table);
  const lantern=new THREE.Group();lantern.position.set(0,.45,0);table.add(lantern);
  const brass=new THREE.MeshStandardMaterial({color:'#746441',metalness:.72,roughness:.48});
  const darkMetal=new THREE.MeshStandardMaterial({color:'#30382e',metalness:.6,roughness:.6});
  const glowing=new THREE.MeshStandardMaterial({color:'#ffd594',emissive:'#ffab43',emissiveIntensity:2,roughness:.8});
  mesh(new THREE.CylinderGeometry(.15,.17,.11,24),brass,[0,.05,0],lantern);
  mesh(new THREE.CylinderGeometry(.11,.115,.07,24),darkMetal,[0,.126,0],lantern);
  const chimney=mesh(new THREE.CylinderGeometry(.103,.135,.31,24,1,true),new THREE.MeshPhysicalMaterial({color:'#dfceb0',transparent:true,opacity:.14,roughness:.19,metalness:.04,side:THREE.DoubleSide,depthWrite:false}),[0,.3,0],lantern);chimney.castShadow=false;
  const flame=mesh(new THREE.SphereGeometry(.042,16,12),glowing,[0,.23,0],lantern);flame.scale.set(.72,1.9,.72);flame.castShadow=false;
  for(const side of [-1,1])limb(new THREE.Vector3(side*.165,.08,0),new THREE.Vector3(side*.155,.47,0),.014,.012,darkMetal,lantern,8);
  mesh(new THREE.CylinderGeometry(.065,.17,.095,24),darkMetal,[0,.50,0],lantern);
  mesh(new THREE.CylinderGeometry(.055,.065,.055,16),brass,[0,.575,0],lantern);
  const handle=mesh(new THREE.TorusGeometry(.16,.009,7,32,Math.PI),darkMetal,[0,.58,0],lantern);handle.rotation.z=0;
  const knob=mesh(new THREE.CylinderGeometry(.026,.026,.06,12),brass,[.175,.076,0],lantern);knob.rotation.z=Math.PI/2;
  const lanternLight=new THREE.PointLight('#ffb767',13,7,1.8);lanternLight.position.set(1.15,.72,1.5);lanternLight.castShadow=true;lanternLight.shadow.mapSize.set(512,512);lanternLight.shadow.normalBias=.025;scene.add(lanternLight);
  // A low opaque dish with two worn pebbles makes the foreground inhabited, without clutter.
  const dishMat=new THREE.MeshStandardMaterial({color:'#77847a',roughness:.42,metalness:.03});
  mesh(new THREE.CylinderGeometry(.115,.082,.028,24),dishMat,[-.27,.452,.08],table);
  for(let i=0;i<2;i++){const p=mesh(new THREE.SphereGeometry(.045,10,8),stone,[-.29+i*.07,.478,.08],table);p.scale.y=.4;}

  const raycaster=new THREE.Raycaster();
  const touchProxy=mesh(new THREE.SphereGeometry(.32,12,10),new THREE.MeshBasicMaterial({visible:false}),[0,.34,0],lantern);touchProxy.scale.y=1.4;
  let brightness=1,targetBrightness=1,brightnessStep=1,lastTime=0,nextBlink=4.1,blinkUntil=-1,callStart=-100;
  function resize(aspect:number){
    camera.aspect=aspect;
    if(aspect<.8){camera.fov=58;camera.position.set(.22,1.22,3.6);camera.lookAt(.2,1.35,-5.8);table.position.set(.37,0,.84);lanternLight.position.set(.37,.72,.84);}
    else {camera.fov=52;camera.position.set(0,1.33,4.05);camera.lookAt(.2,1.15,-10);table.position.set(1.15,0,1.5);lanternLight.position.set(1.15,.72,1.5);}
    camera.updateProjectionMatrix(); scene.updateMatrixWorld(true);
  }
  resize(1.6);
  function update(time:number,dt:number){
    lastTime=time;waterMaterial.uniforms.uTime.value=time;
    brightness=THREE.MathUtils.damp(brightness,targetBrightness,5,Math.min(dt,.1));lanternLight.intensity=13*brightness;glowing.emissiveIntensity=1.4+brightness*.6;
    canopy.rotation.z=Math.sin(time*.13)*.0017;grasses.rotation.z=Math.sin(time*.2)*.0018;
    if(time>nextBlink){blinkUntil=time+.16;nextBlink=time+6.3+random()*12;}
    const eyeScale=time<blinkUntil?.08:.87;eyelids.forEach(e=>{e.scale.y=eyeScale;});
    const callAge=time-callStart;const callWeight=callAge>=0&&callAge<1.35?Math.sin(callAge/1.35*Math.PI):0;
    head.rotation.y=Math.sin(time*.12)*.055;head.rotation.x=callWeight*-.065;
    body.scale.y=1.33+callWeight*.025;
  }
  function interact(ndc:THREE.Vector2):WorldInteraction|null{
    raycaster.setFromCamera(ndc,camera);scene.updateMatrixWorld(true);
    if(!raycaster.intersectObject(touchProxy,false).length)return null;
    brightnessStep=(brightnessStep+1)%3;targetBrightness=[.55,1,1.35][brightnessStep];
    // Immediate adjustment also works when the host is holding a reduced-motion static frame.
    brightness=targetBrightness;lanternLight.intensity=13*brightness;glowing.emissiveIntensity=1.4+brightness*.6;
    const p=new THREE.Vector3();lantern.getWorldPosition(p);
    return {scene:'nature:scops_night',type:'lantern',strength:targetBrightness/1.35,position:p.toArray() as [number,number,number]};
  }
  return {scene,camera,resize,update,interact,audioEvent(type:'scops-call'){if(type==='scops-call')callStart=lastTime;}};
}
