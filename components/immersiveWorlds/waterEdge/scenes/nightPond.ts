import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldScene } from '../contracts';

/** Original procedural scene. Metres; y=0 is the mean pond surface. */
export function createNightPond(_renderer: THREE.WebGLRenderer): WorldScene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#182c3d');
  scene.fog = new THREE.FogExp2('#253f48', 0.023);
  const camera = new THREE.PerspectiveCamera(51, 1, 0.08, 150);
  camera.position.set(0, 0.97, 4.8);
  camera.lookAt(0, 0.54, -7);
  let seed = 173921;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const between = (a: number, b: number) => a + (b - a) * random();
  const moonDirection = new THREE.Vector3(0.105, 0.135, -1).normalize();
  const light = new THREE.DirectionalLight('#b5dcf5', 2.3);
  light.position.copy(moonDirection).multiplyScalar(30);
  scene.add(light, new THREE.HemisphereLight('#a7c9dd', '#33402f', 1.35));
  const foregroundLight = new THREE.PointLight('#9cbdc8', 1.4, 9, 1.4);
  foregroundLight.position.set(-2, 3, 4);
  scene.add(foregroundLight);

  const skyUniforms = { uTime: { value: 0 }, uMoon: { value: moonDirection } };
  const sky = new THREE.Mesh(new THREE.SphereGeometry(105, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms: skyUniforms,
    vertexShader: 'varying vec3 vDirection; void main(){vDirection=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: `varying vec3 vDirection; uniform vec3 uMoon; uniform float uTime;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
      void main(){vec3 d=normalize(vDirection); float h=max(d.y,0.);
        vec3 c=mix(vec3(.082,.137,.174),vec3(.014,.035,.081),pow(h,.42));
        float md=length(d-uMoon); c+=vec3(.27,.34,.35)*exp(-md*13.)*.28;
        float disc=1.-smoothstep(.017,.0185,md);
        float crater=noise(d.xz*700.)*.13+noise(d.xy*230.)*.12;
        c=mix(c,vec3(.83,.91,.91)*(1.-crater),disc);
        vec2 cloudUV=d.xz/(max(d.y,.09))*1.25+vec2(uTime*.0012,0.);
        float cloud=noise(cloudUV*.65)*.5+noise(cloudUV*1.6)*.3+noise(cloudUV*3.6)*.2;
        float wisps=smoothstep(.5,.72,cloud)*smoothstep(.01,.17,d.y)*(1.-smoothstep(.2,.55,d.y));
        c=mix(c,vec3(.12,.18,.23),wisps*.25);
        gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  }));
  sky.renderOrder = -5; scene.add(sky);

  const starsPos: number[] = [], starsColor: number[] = [];
  for (let i = 0; i < 235; i++) {
    const p = new THREE.Vector3(between(-1, 1), between(.15, 1), between(-1, .2)).normalize().multiplyScalar(90);
    starsPos.push(p.x, p.y, p.z); const b=between(.22,.66); starsColor.push(b*.75,b*.87,b);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starsPos,3));
  starGeo.setAttribute('color',new THREE.Float32BufferAttribute(starsColor,3));
  scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({size:.075,vertexColors:true,transparent:true,opacity:.48,depthWrite:false,fog:false})));

  // Layered water optics: Fresnel sky, rippled lunar path, bank silhouettes and
  // restrained shallow scattering. Four recycled impulse slots avoid growth.
  const impulses = Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, -100, 0));
  const waterUniforms = { uTime: { value: 0 }, uMoon: { value: moonDirection }, uRipples: { value: impulses } };
  const water = new THREE.Mesh(new THREE.PlaneGeometry(80, 92, 1, 1), new THREE.ShaderMaterial({
    uniforms: waterUniforms, transparent:true, depthWrite:false,
    vertexShader: 'varying vec3 vWorld; void main(){vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: `varying vec3 vWorld; uniform float uTime; uniform vec3 uMoon; uniform vec4 uRipples[4];
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
      vec3 skyColor(vec3 d){return mix(vec3(.105,.173,.192),vec3(.023,.052,.105),pow(max(d.y,0.),.44));}
      void main(){vec2 p=vWorld.xz;float t=uTime;
        vec2 slope=vec2(cos(p.x*2.5+p.y*.8+t*.24)*.007+cos(p.x*7.3-p.y*3.1-t*.35)*.0035,
          cos(p.y*4.1-p.x*.8+t*.19)*.010+cos(p.y*13.+p.x*5.-t*.27)*.003);
        slope+=vec2(sin(p.x*31.+sin(p.y*19.)*2.+t*.31),cos(p.y*41.+sin(p.x*27.)*2.-t*.27))*.005;
        for(int i=0;i<4;i++){float age=t-uRipples[i].z;vec2 delta=p-uRipples[i].xy;float d=length(delta);
          float front=d-age*.48;float amp=exp(-front*front*30.)*exp(-age*.52)*step(0.,age)*uRipples[i].w;
          slope+=normalize(delta+vec2(.0001))*cos(front*30.)*amp*.045;}
        vec3 n=normalize(vec3(-slope.x,1.,-slope.y));vec3 v=normalize(cameraPosition-vWorld);vec3 r=reflect(-v,n);
        float f=.04+.96*pow(1.-max(dot(v,n),0.),5.);
        vec3 c=mix(vec3(.011,.043,.044),skyColor(r),.38+f*.54);
        float bank=1.-smoothstep(.00,.075,r.y);float silhouette=noise(vec2(r.x*36.,r.z*7.));
        c=mix(c,vec3(.019,.055,.052),bank*(.36+silhouette*.35));
        float lunar=pow(max(dot(r,uMoon),0.),5500.); float path=pow(max(dot(r,uMoon),0.),160.);
        c+=vec3(.60,.74,.77)*(lunar*.8+path*.018);
        float rippleGlint=pow(max(dot(n,normalize(v+uMoon)),0.),1600.);
        c+=vec3(.23,.33,.35)*rippleGlint*.1;
        float near=1.-smoothstep(0.,8.,distance(cameraPosition.xz,p));
        gl_FragColor=vec4(c,.90-near*.15);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  }));
  water.rotation.x=-Math.PI/2;water.position.set(0,0,-16);water.renderOrder=2;scene.add(water);

  const earthMat = new THREE.MeshStandardMaterial({color:'#a3b39b',roughness:1,vertexColors:true});
  const bankGeo = new THREE.PlaneGeometry(14, 62, 18, 55);
  bankGeo.rotateX(-Math.PI/2);
  const makeBank = (side:number) => {
    const g=bankGeo.clone(), pos=g.attributes.position;const colors:number[]=[];
    for(let i=0;i<pos.count;i++){
      const lx=pos.getX(i), z=pos.getZ(i)-19;
      const inner=side<0?3.9+Math.max(0,-z)*.16+Math.sin(z*.29)*1.05:5.6+Math.max(0,-z)*.1+Math.sin(z*.23+1.5)*1.35;
      const width=lx+7;
      pos.setXYZ(i,side*(inner+width),Math.min(width*.17,.7)+Math.sin(z*.42+lx*.5)*.08-.075,z);
      const shade=.7+random()*.3;const c=new THREE.Color('#314c37').multiplyScalar(shade);colors.push(c.r,c.g,c.b);
    }
    if(side<0&&g.index){for(let i=0;i<g.index.count;i+=3){const b=g.index.getX(i+1);g.index.setX(i+1,g.index.getX(i+2));g.index.setX(i+2,b);}}
    g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();scene.add(new THREE.Mesh(g,earthMat));
  };
  makeBank(-1);makeBank(1);bankGeo.dispose();
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(70,80),new THREE.MeshStandardMaterial({color:'#193a31',roughness:1}));
  bottom.rotation.x=-Math.PI/2;bottom.position.set(0,-.18,-14);scene.add(bottom);

  function rockTexture(){
    const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const ctx=canvas.getContext('2d')!;
    const im=ctx.createImageData(256,256);
    for(let y=0;y<256;y++)for(let x=0;x<256;x++){
      const k=(y*256+x)*4;const n=random();const vein=Math.sin(x*.095+Math.sin(y*.033)*7+y*.027);
      const val=81+n*39+vein*9;im.data[k]=val*.83;im.data[k+1]=val;im.data[k+2]=val*.97;im.data[k+3]=255;
    }ctx.putImageData(im,0,0);
    for(let i=0;i<90;i++){ctx.fillStyle=`rgba(136,155,95,${between(.07,.22)})`;ctx.beginPath();ctx.ellipse(random()*256,random()*256,between(1,12),between(1,5),random()*6,0,Math.PI*2);ctx.fill();}
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;return tex;
  }
  const rockMap=rockTexture();
  const rockMat=new THREE.MeshStandardMaterial({map:rockMap,color:'#9caaa5',roughness:.68,metalness:.04});
  const makeStoneGeo=(index:number)=>{
    const g=new THREE.SphereGeometry(1,18,12),p=g.attributes.position;
    for(let i=0;i<p.count;i++){
      const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
      const n=1+Math.sin(x*6.4+z*4.1+index)*Math.sin(y*5.3+index)*.10+Math.cos(z*8+x*3)*.04;
      p.setXYZ(i,x*n,Math.max(-.63,y)*n,z*n);
    }g.computeVertexNormals();return g;
  };
  const stoneGeos=[makeStoneGeo(0),makeStoneGeo(2),makeStoneGeo(4)];
  const rockPositions=[[-.84,-.09,3.61,.61,.28,.56],[-1.70,-.03,3.30,1.04,.34,.71],[1.83,-.03,3.95,.9,.37,.74],[-2.63,.01,2.7,.82,.32,.56],[2.69,.01,2.4,.86,.35,.58],[-3.6,.03,.0,.94,.30,.74]];
  rockPositions.forEach((r,i)=>{const m=new THREE.Mesh(stoneGeos[i%3],rockMat);m.position.set(r[0],r[1],r[2]);m.scale.set(r[3],r[4],r[5]);m.rotation.y=between(0,6);scene.add(m);});
  const smallStones=new THREE.InstancedMesh(stoneGeos[0],rockMat,145);const dummy=new THREE.Object3D();
  for(let i=0;i<145;i++){
    const z=between(-23,4);const side=random()>.5?1:-1;const x=side*(4.55+Math.max(0,-z)*.17+Math.sin(z*.26)*.85+between(-.45,1.0));
    const s=between(.07,.45);dummy.position.set(x,s*.18-.02,z);dummy.rotation.set(random(),random()*6,random());dummy.scale.set(s,s*.5,s*.85);dummy.updateMatrix();smallStones.setMatrixAt(i,dummy.matrix);
  }scene.add(smallStones);

  // Lily pads have an actual radial notch, curled rim, veins and a wet cuticle.
  const lilyMat=new THREE.ShaderMaterial({side:THREE.DoubleSide,uniforms:{},
    vertexShader:'varying vec2 vUv; varying vec3 vWorld; varying vec3 vNormal;void main(){vUv=uv;vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;vNormal=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:`varying vec2 vUv;varying vec3 vWorld;varying vec3 vNormal;
      void main(){vec2 q=vUv*2.-1.;float r=length(q);float a=atan(q.y,q.x);float vein=pow(abs(cos(a*9.+sin(r*14.)*.11)),95.)*(1.-smoothstep(.75,1.,r));
        float fine=sin(r*127.+sin(a*17.)*2.)*.01;vec3 c=mix(vec3(.016,.044,.035),vec3(.048,.085,.051),r*.5+.2);
        c+=vec3(.007,.015,.007)*vein;c+=fine*vec3(.16,.24,.1);c=mix(c,vec3(.052,.083,.040),smoothstep(.94,1.,r)*.20);
        vec3 v=normalize(cameraPosition-vWorld);float spec=pow(max(dot(normalize(v+vec3(.1,.4,-1.)),normalize(vNormal)),0.),85.);
        c+=vec3(.27,.41,.40)*spec*.45;gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
  function lilyGeometry(radius:number,offset:number){
    const verts:number[]=[],uv:number[]=[],idx:number[]=[];const n=84,rings=10,start=.06,end=Math.PI*2-.07;
    verts.push(0,0,0);uv.push(.5,.5);
    for(let j=1;j<=rings;j++)for(let i=0;i<=n;i++){
      const a=start+(end-start)*i/n, rr=j/rings;const r=radius*rr*(1+Math.sin(a*5+offset)*.065+Math.sin(a*13+offset)*.025);
      verts.push(Math.cos(a)*r,.009+rr*rr*.018+Math.sin(a*4+offset)*.013*rr+Math.pow(rr,7)*.024,Math.sin(a)*r);uv.push(Math.cos(a)*rr*.5+.5,Math.sin(a)*rr*.5+.5);
    }
    for(let i=0;i<n;i++)idx.push(0,1+i+1,1+i);
    for(let j=0;j<rings-1;j++)for(let i=0;i<n;i++){const a=1+j*(n+1)+i,b=a+n+1;idx.push(a,b+1,b,a,a+1,b+1);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
  }
  const lilies: {mesh:THREE.Mesh,phase:number}[]=[];
  const padLocations=[[-.68,2.30,.44],[.63,2.70,.34],[1.64,1.33,.51],[-2.02,1.08,.45],[-.22,.67,.33],[2.27,-.08,.37],[-2.9,-.4,.37],[1.26,-.73,.26],[-3.15,-2,.32],[2.71,-2.1,.31],[-1.73,-3.2,.23]];
  for(let i=0;i<30;i++)if(i>=padLocations.length)padLocations.push([between(-5,5),between(-14,-3),between(.16,.31)]);
  padLocations.forEach((p,i)=>{const m=new THREE.Mesh(lilyGeometry(p[2],i),lilyMat);m.position.set(p[0],.012,p[1]);m.rotation.y=between(-3,3);scene.add(m);lilies.push({mesh:m,phase:random()*6});});

  // Ivory flowers are botanical clusters of curved tapered petals, not spheres.
  function flower(x:number,z:number,size:number){
    const petalGeos:THREE.BufferGeometry[]=[];
    for(let ring=0;ring<3;ring++)for(let i=0;i<9-ring*2;i++){
      const a=i/(9-ring*2)*Math.PI*2+ring*.39;const p:number[]=[],uv:number[]=[],ind:number[]=[];
      for(let j=0;j<=8;j++)for(let k=0;k<=4;k++){
        const t=j/8,w=(k/4-.5)*Math.sin(Math.PI*t)*size*(.7-ring*.10);const out=t*size*(1-ring*.19);
        p.push(Math.cos(a)*out-Math.sin(a)*w,.03+Math.sin(t*Math.PI*.58)*size*(.30+ring*.3),Math.sin(a)*out+Math.cos(a)*w);uv.push(k/4,t);
        if(j<8&&k<4){const q=j*5+k;ind.push(q,q+5,q+6,q,q+6,q+1);}
      }const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ind);g.computeVertexNormals();petalGeos.push(g);
    }
    const g=mergeGeometries(petalGeos)!;petalGeos.forEach(g=>g.dispose());
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:'#c4d7c3',roughness:.53,side:THREE.DoubleSide}));m.position.set(x,.055,z);scene.add(m);
    const core=new THREE.Mesh(new THREE.SphereGeometry(size*.17,10,6),new THREE.MeshStandardMaterial({color:'#b8ab5d',roughness:.78}));core.scale.y=.55;core.position.set(x,.13,z);scene.add(core);
  }
  flower(-.61,2.11,.14);flower(2.14,-1.3,.16);

  // Curved blade meshes include a centre ridge and actual tapered tips.
  const blades:THREE.BufferGeometry[]=[],stems:THREE.BufferGeometry[]=[],heads:THREE.BufferGeometry[]=[];
  const stemMat=new THREE.MeshStandardMaterial({color:'#3a5140',roughness:.83});
  const headMat=new THREE.MeshStandardMaterial({color:'#574c36',roughness:1});
  const bladeMat=new THREE.MeshStandardMaterial({color:'#9eb28a',roughness:.74,side:THREE.DoubleSide,vertexColors:true});
  function blade(x:number,z:number,h:number,width:number,a:number,lean:number){
    const p:number[]=[],c:number[]=[],idx:number[]=[];const col=new THREE.Color().setHSL(between(.24,.32),between(.18,.30),between(.19,.31));
    for(let j=0;j<=9;j++){
      const t=j/9,curve=t*t*lean;const cx=x+Math.cos(a)*curve,cz=z+Math.sin(a)*curve;const w=width*Math.sin(Math.PI*t*.87)*(1-t*.85);
      for(let k=-1;k<=1;k++){p.push(cx-Math.sin(a)*w*k,h*t-.03+Math.max(0,k===0?.012:0),cz+Math.cos(a)*w*k);const shade=k===0?1.25:.78;c.push(col.r*shade,col.g*shade,col.b*shade);}
      if(j<9){const b=j*3;idx.push(b,b+3,b+4,b,b+4,b+1,b+1,b+4,b+5,b+1,b+5,b+2);}
    }const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));g.setIndex(idx);g.computeVertexNormals();blades.push(g);
  }
  function reeds(cx:number,cz:number,count:number,range:number,near:boolean){
    for(let i=0;i<count;i++){
      const x=cx+between(-range,range),z=cz+between(-range*.6,range*.6),h=between(.38,near?1.33:.95),a=random()*Math.PI*2;
      blade(x,z,h,between(.045,.105),a,between(.15,.45));
      if(i%8===0){
        const stem=new THREE.CylinderGeometry(.009,.015,h*1.18,5);stem.translate(x,h*.59,z);stems.push(stem);
        const head=new THREE.CapsuleGeometry(.025,h*.18,3,5);head.translate(x,h*1.11,z);heads.push(head);
      }
    }
  }
  reeds(-2.9,2.2,78,.65,true);reeds(3.8,2,68,.66,true);
  for(let i=0;i<26;i++)blade(between(-.98,-.55),between(3.3,3.7),between(.35,.72),between(.025,.06),between(-.7,.4),between(.1,.3));
  for(let i=0;i<12;i++)blade(between(1.05,1.25),between(2.6,3.1),between(.45,.9),between(.035,.07),between(2.4,3.5),between(.1,.25));reeds(-3.9,-1.9,68,.8,false);reeds(4.9,-5.5,65,1.4,false);
  reeds(-6.3,-10.3,100,1.8,false);reeds(7.1,-13.7,105,2,false);
  const reedGroup=new THREE.Group();
  for(const [gs,mat] of [[blades,bladeMat],[stems,stemMat],[heads,headMat]] as const){if(gs.length){const g=mergeGeometries(gs)!;gs.forEach(x=>x.dispose());reedGroup.add(new THREE.Mesh(g,mat));}}scene.add(reedGroup);

  // Individually folded broad leaves form spatial crowns with irregular gaps.
  // No sphere/ellipsoid canopy proxy survives in the scene.
  const bark=new THREE.MeshStandardMaterial({color:'#46564a',roughness:1});
  const branchGeos:THREE.BufferGeometry[]=[];
  const leafGeometry=new THREE.BufferGeometry();
  leafGeometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,-1,-.38,-.06,-.38,-.43,-.04,.29,0,.065,.85,.43,-.04,.29,.38,-.06,-.38,0,.11,-.10],3));
  leafGeometry.setIndex([0,1,6,1,2,6,2,3,6,3,4,6,4,5,6,5,0,6]);leafGeometry.computeVertexNormals();
  const crownTips:{p:THREE.Vector3,r:number}[]=[];
  function branch(a:THREE.Vector3,b:THREE.Vector3,r1:number,r2:number){
    const d=b.clone().sub(a);const g=new THREE.CylinderGeometry(r2,r1,d.length(),7);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()));g.translate((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);branchGeos.push(g);
  }
  const trees:{x:number,z:number,h:number}[]=[];
  for(let i=0;i<25;i++){
    const side=i%3===0?1:-1,z=between(-34,-8),x=side*(6.1+Math.max(0,-z)*.12+between(0,5));trees.push({x,z,h:between(3.5,7.5)});
  }
  for(let i=0;i<22;i++){const x=between(-20,20),z=-25-Math.cos(x*.12)*4;trees.push({x,z,h:between(2.2,4.0)});}
  trees.forEach(({x,z,h},index)=>{
    const lean=between(-.6,.6),mid=new THREE.Vector3(x+lean*.4,h*.36,z+.15);
    branch(new THREE.Vector3(x,.25,z),mid,.13,.085);
    for(let j=0;j<5;j++){
      const a=j/5*Math.PI*2+random(),len=between(.65,1.7),tip=new THREE.Vector3(x+lean+Math.cos(a)*len,h*between(.62,1),z+Math.sin(a)*len);
      const elbow=mid.clone().lerp(tip,.54);elbow.y+=.17;
      branch(mid,elbow,.064,.031);branch(elbow,tip,.033,.009);
      crownTips.push({p:tip,r:between(.8,1.5)});
      for(let k=0;k<2;k++){const q=tip.clone().add(new THREE.Vector3(between(-.6,.6),between(-.3,.45),between(-.6,.6)));branch(elbow,q,.019,.004);}
    }
  });
  const branches=new THREE.Mesh(mergeGeometries(branchGeos)!,bark);branchGeos.forEach(g=>g.dispose());scene.add(branches);
  const leafCount=crownTips.length*100;
  const leaves=new THREE.InstancedMesh(leafGeometry,new THREE.MeshStandardMaterial({color:'#adbcab',roughness:.87,side:THREE.DoubleSide}),leafCount);
  let li=0;
  for(const tip of crownTips)for(let j=0;j<100;j++){
    const a=random()*Math.PI*2,y=between(-1,1),r=tip.r*Math.cbrt(random()),s=Math.sqrt(1-y*y);
    dummy.position.set(tip.p.x+Math.cos(a)*r*s,tip.p.y+y*r*.58,tip.p.z+Math.sin(a)*r*s);
    dummy.rotation.set(between(-1.5,1.5),random()*6.28,between(-1.1,1.1));
    const size=between(.12,.27);dummy.scale.set(size,size,size);dummy.updateMatrix();leaves.setMatrixAt(li,dummy.matrix);
    leaves.setColorAt(li,new THREE.Color().setHSL(between(.27,.36),between(.12,.26),between(.12,.27)));li++;
  }
  scene.add(leaves);
  // Curving opposite bank has real raised terrain with reeds and low shrubs.
  const rearGeo=new THREE.PlaneGeometry(45,10,70,12);rearGeo.rotateX(-Math.PI/2);
  const rp=rearGeo.attributes.position,rc:number[]=[];
  for(let i=0;i<rp.count;i++){const x=rp.getX(i),v=rp.getZ(i)+5;rp.setXYZ(i,x,-.08+Math.min(v*.14,.65)+Math.sin(x*.63)*.035,-21.5-Math.cos(x*.18)*3.8-v);const c=new THREE.Color('#49624c').multiplyScalar(between(.8,1.1));rc.push(c.r,c.g,c.b);}
  // z decreases as the original z increases; restore front-facing winding.
  if(rearGeo.index)for(let i=0;i<rearGeo.index.count;i+=3){const b=rearGeo.index.getX(i+1);rearGeo.index.setX(i+1,rearGeo.index.getX(i+2));rearGeo.index.setX(i+2,b);}
  rearGeo.setAttribute('color',new THREE.Float32BufferAttribute(rc,3));rearGeo.computeVertexNormals();scene.add(new THREE.Mesh(rearGeo,earthMat));

  const flyPositions:number[]=[],flyPhases:number[]=[];
  for(let i=0;i<31;i++){const side=i%2?1:-1;const z=between(-19,-3);flyPositions.push(side*between(3.3,6.5),between(.35,1.6),z);flyPhases.push(random()*6.28);}
  const flyGeo=new THREE.BufferGeometry();flyGeo.setAttribute('position',new THREE.Float32BufferAttribute(flyPositions,3));flyGeo.setAttribute('phase',new THREE.Float32BufferAttribute(flyPhases,1));
  const fireflyUniforms={uTime:{value:0}};
  scene.add(new THREE.Points(flyGeo,new THREE.ShaderMaterial({uniforms:fireflyUniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'attribute float phase;uniform float uTime;varying float vGlow;void main(){vec3 p=position;p.x+=sin(uTime*.18+phase)*.09;p.y+=sin(uTime*.24+phase)*.035;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(32./(-mv.z),1.2,3.5);vGlow=.10+.30*pow(.5+.5*sin(uTime*.48+phase),3.);}',
    fragmentShader:'varying float vGlow;void main(){float d=length(gl_PointCoord-.5);float a=exp(-d*d*20.)*vGlow;gl_FragColor=vec4(.66,.80,.31,a);}'
  })));

  const fish: {mesh:THREE.Mesh,base:THREE.Vector3,phase:number}[]=[];
  const fishMat=new THREE.MeshStandardMaterial({color:'#132d29',roughness:.7});
  const fishShape=new THREE.Shape();fishShape.moveTo(-.19,0);fishShape.quadraticCurveTo(-.04,.062,.13,0);fishShape.quadraticCurveTo(-.04,-.062,-.19,0);fishShape.lineTo(-.25,-.046);fishShape.lineTo(-.25,.046);fishShape.closePath();
  const fishGeo=new THREE.ShapeGeometry(fishShape,9);fishGeo.rotateX(-Math.PI/2);
  for(let i=0;i<4;i++){const m=new THREE.Mesh(fishGeo,fishMat);const base=new THREE.Vector3(between(-1.8,2),-.095,between(-1.5,2.2));m.position.copy(base);m.rotation.y=random()*6;scene.add(m);fish.push({mesh:m,base,phase:random()*6});}

  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let rippleSlot=0,lastTap=-100;
  return {
    scene,camera,
    resize(width,height){const portrait=width/height<.85;camera.aspect=width/height;camera.fov=portrait?61:51;camera.position.set(0,portrait?1.02:.97,4.8);camera.lookAt(portrait?.10:0,portrait?-1.35:-.60,portrait?-5:-7);camera.updateProjectionMatrix();},
    update(time){waterUniforms.uTime.value=time;skyUniforms.uTime.value=time;fireflyUniforms.uTime.value=time;
      lilies.forEach(({mesh,phase})=>{mesh.position.y=.015+Math.sin(time*.31+phase)*.006;mesh.rotation.x=Math.sin(time*.25+phase)*.009;mesh.rotation.z=Math.cos(time*.23+phase)*.008;});
      reedGroup.rotation.z=Math.sin(time*.24)*.0018;
      fish.forEach(({mesh,base,phase})=>{mesh.position.x=base.x+Math.sin(time*.055+phase)*.29;mesh.position.z=base.z+Math.cos(time*.055+phase)*.16;mesh.rotation.y=Math.atan2(Math.cos(time*.055+phase)*.29,-Math.sin(time*.055+phase)*.16);});
    },
    interact(x,y,time){if(time-lastTap<.65)return null;pointer.set(x,y);camera.updateMatrixWorld();water.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);scene.updateMatrixWorld(true);const hit=raycaster.intersectObjects(scene.children,true).find(h=>h.object instanceof THREE.Mesh);if(!hit||hit.object!==water||hit.distance>24)return null;const p=hit.point;if(Math.abs(p.x)>4.4+Math.max(0,-p.z)*.17)return null;lastTap=time;impulses[rippleSlot].set(p.x,p.z,time,.75);rippleSlot=(rippleSlot+1)%4;return {world:'night-pond',kind:'ripple',strength:.32,position:{x:p.x,z:p.z}};}
  };
}
