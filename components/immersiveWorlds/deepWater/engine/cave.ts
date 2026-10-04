import * as THREE from 'three';
import { addRock, rockMaterial, createPool } from './environment';
import type { WorldContent } from './types';

/** Original continuous limestone grotto. Units are metres; the observer sits at a real water ledge. */
export function createCave(renderer: THREE.WebGLRenderer): WorldContent {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#263b3e');
  scene.fog = new THREE.FogExp2('#324749', 0.015);
  const camera = new THREE.PerspectiveCamera(53, 1, 0.08, 115);
  camera.position.set(0.75, 2.2, 10.5);
  const target = new THREE.Vector3(-0.2, 4.2, -15);
  camera.lookAt(target);
  scene.add(new THREE.HemisphereLight('#a3c7cd', '#47402f', 0.78));
  const sun = new THREE.DirectionalLight('#fff4d7', 2.2);
  sun.position.set(5, 18, -15);
  sun.target.position.set(-3, -1, -12);
  scene.add(sun, sun.target);
  const entranceLight = new THREE.PointLight('#a0dcdb', 28, 28, 1.5);
  entranceLight.position.set(-1.5, 3.6, -13);
  scene.add(entranceLight);
  const softFront = new THREE.PointLight('#b7ccc3', 15, 26, 1.6);
  softFront.position.set(1, 3.7, 8);
  scene.add(softFront);
  const poolBounce = new THREE.PointLight('#65bba9', 30, 24, 1.5);
  poolBounce.position.set(0, 1.8, -5);
  scene.add(poolBounce);

  const timeUniform = { value: 0 };
  const limestone = rockMaterial('#9c9380', 0.64);
  limestone.side = THREE.DoubleSide;
  limestone.roughness = 0.83;
  // World-space mineral variation remains continuous across the high resolution cavern mesh.
  const previousCompile = limestone.onBeforeCompile.bind(limestone);
  limestone.onBeforeCompile = (shader, currentRenderer) => {
    previousCompile(shader, currentRenderer);
    shader.uniforms.uCaveTime = timeUniform;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vCaveP;');
    shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvCaveP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vCaveP; uniform float uCaveTime;
    `);
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      float coarse=rfbm(vCaveP*vec3(.31,.52,.31));
      float flow=rn(vCaveP*vec3(2.1,.11,2.1)+vec3(0.,coarse*3.,0.));
      float strata=sin(vCaveP.y*5.1+coarse*8.0+sin(vCaveP.z*.35)*2.0);
      vec3 mineral=mix(vec3(.65,.72,.66),vec3(1.10,1.04,.91),smoothstep(.23,.77,coarse));
      mineral=mix(mineral,vec3(.91,.80,.63),smoothstep(.60,.83,flow)*.21);
      mineral*=.94+strata*.06;
      float wet=1.-smoothstep(-.2,1.9,vCaveP.y);
      mineral=mix(mineral,mineral*vec3(.60,.73,.70),wet*.48);
      diffuseColor.rgb*=mineral;
      float caustic=pow(.5+.5*sin(vCaveP.x*3.2+sin(vCaveP.z*2.8+uCaveTime*.18)*1.6),10.)*pow(.5+.5*sin(vCaveP.z*3.3+sin(vCaveP.x*2.1-uCaveTime*.15)),7.);
      diffuseColor.rgb+=vec3(.20,.40,.30)*caustic*(1.-smoothstep(.1,3.2,vCaveP.y))*.25;
    `);
  };
  limestone.customProgramCacheKey = () => 'deepwater-cave-mineral-v2';
  const paleCalcite = rockMaterial('#c8b99b', 0.72);
  paleCalcite.roughness = 0.72;
  const wetStone = rockMaterial('#65736b', 0.89);
  wetStone.roughness = 0.43;

  function wallPoint(theta: number, z: number) {
    const taper = 1 - THREE.MathUtils.smoothstep(-z, 35, 59) * 0.86;
    const radius = (13.5 + 2.6*Math.exp(-(((z+16)/13)**2)) + Math.sin(z * .13) * 1.5 + Math.sin(z * .41) * .53) * taper;
    const roof = (15.5 + Math.sin(z * .10 + 1) * 1.1) * Math.max(.45, taper);
    const ripple = Math.sin(theta*21+z*.14)*.20+Math.sin(theta*47-z*.53)*.085;
    const shelves = Math.sin(Math.sin(theta)*18+z*.085)*.10 + Math.sin(theta*8.3+z*.26)*.13;
    const x = Math.cos(theta) * (radius+ripple+shelves) + Math.sin(z*.075)*1.5;
    const y = Math.pow(Math.max(0,Math.sin(theta)),.88)*roof-3 + ripple*.8;
    return new THREE.Vector3(x,y,z);
  }
  const wallPositions: number[] = [], wallUvs: number[] = [], wallIndices: number[] = [];
  const circum = 144, length = 180;
  for (let j=0;j<=length;j++) {
    const z = 17 - j / length * 77;
    for (let i=0;i<=circum;i++) {
      const theta = i / circum * Math.PI;
      const p = wallPoint(theta,z);
      wallPositions.push(p.x,p.y,p.z); wallUvs.push(i/circum*8,j/length*24);
    }
  }
  for (let j=0;j<length;j++) for(let i=0;i<circum;i++) {
    const z=17-(j+.5)/length*77, theta=(i+.5)/circum*Math.PI;
    // Actual opening in the roof, not a light pasted on a closed ceiling.
    const opening=((z+18.2)/1.95)**2+((theta-1.285)/.087)**2;
    if (opening<1+.14*Math.sin(z*3.7+theta*17)) continue;
    const a=j*(circum+1)+i,b=a+circum+1;
    wallIndices.push(a,b,a+1,b,b+1,a+1);
  }
  const wallGeometry = new THREE.BufferGeometry();
  wallGeometry.setAttribute('position',new THREE.Float32BufferAttribute(wallPositions,3));
  wallGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(wallUvs,2));
  wallGeometry.setIndex(wallIndices);wallGeometry.computeVertexNormals();
  const cavern = new THREE.Mesh(wallGeometry,limestone);
  cavern.name='cave-continuous-limestone-shell';
  cavern.receiveShadow = true;
  scene.add(cavern);

  // Submerged stone bed with a deep centre and shallow, irregular side shelves.
  const bedGeometry = new THREE.PlaneGeometry(34,82,72,140);
  bedGeometry.rotateX(-Math.PI/2);
  const bp=bedGeometry.attributes.position as THREE.BufferAttribute;
  for(let i=0;i<bp.count;i++) {
    const x=bp.getX(i),z=bp.getZ(i)-16;
    const bank=Math.pow(Math.abs(x)/17,3)*3.4;
    bp.setXYZ(i,x,-3.45+bank+Math.sin(x*.9+z*.21)*.3+Math.cos(z*.62+x*.18)*.19,z);
  }
  bedGeometry.computeVertexNormals();
  const bed=new THREE.Mesh(bedGeometry,limestone);bed.receiveShadow=true;scene.add(bed);
  const pool=createPool(renderer,scene,{width:31,depth:70,y:.02,color:'#3d9082',position:[0,.02,-16],distortion:.56});

  // Curved, fluted carbonate deposits with uneven accretion rings. No cone primitives.
  function formation(position: THREE.Vector3,height:number,radius:number,seed:number,up=false) {
    const rings=28,sides=20,positions:number[]=[],uvs:number[]=[],indices:number[]=[];
    for(let j=0;j<=rings;j++) {
      const t=j/rings;
      const centreX=Math.sin(t*2.4+seed)*Math.sin(t*Math.PI)*height*.074;
      const centreZ=Math.cos(t*3.2+seed)*Math.sin(t*Math.PI)*height*.045;
      const taper=Math.pow(1-t,.58)+.18*Math.exp(-(((t-(.22+.10*Math.sin(seed)))/.15)**2));
      const apron=1+.45*Math.exp(-t*18);
      const lobe=.94+.032*Math.sin(t*29+seed)+.019*Math.sin(t*67+seed*2)+.022*Math.sin(t*11+seed);
      for(let i=0;i<=sides;i++) {
        const a=i/sides*Math.PI*2;
        const flute=1+.085*Math.sin(a*7+seed)+.035*Math.sin(a*13+t*8);
        const r=Math.max(.008,radius*taper*lobe*flute*apron);
        positions.push(centreX+Math.cos(a)*r,(up?1:-1)*t*height,centreZ+Math.sin(a)*r);
        uvs.push(i/sides,t*height);
        if(j<rings&&i<sides){const n=j*(sides+1)+i;indices.push(n,n+sides+1,n+1,n+1,n+sides+1,n+sides+2);}
      }
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
    geometry.setIndex(indices);geometry.computeVertexNormals();
    const mesh=new THREE.Mesh(geometry,seed%3===0?paleCalcite:limestone);
    mesh.position.copy(position);if(!up)mesh.position.y+=radius*.78;mesh.receiveShadow=true;mesh.castShadow=true;scene.add(mesh);
    return mesh;
  }
  const hanging: Array<[number,number,number,number]> = [
    [.64,-2,4.3,.8],[.79,-4,3.8,.65],[.99,-6,2.9,.48],
    [2.30,-5,5.2,.90],[2.14,-9,4.8,.66],[2.40,-12,4.0,.69],
    [.72,-17,5.0,.70],[.85,-20,3.5,.54],
    [1.59,-18,2.9,.43],[1.85,-28,4.1,.57],
    [.61,-31,2.6,.48],[2.22,-32,4.3,.65],
    [.50,4,4.2,.85],[2.55,3,3.6,.64],
  ];
  hanging.forEach(([angle,z,h,r],i)=>{
    formation(wallPoint(angle,z),h,r,i+9);
    if(i===1||i===4||i===8){const root=wallPoint(angle,z);root.x+=r*.57;root.z+=r*.38;formation(root,h*.62,r*.49,i+64);}
  });
  // Broad mineral buttresses are anchored to the cave walls and break their silhouette.
  const buttresses: Array<[number,number,number,number,number]> = [
    [-10.7,-1,-3,9,1.8],[-10.2,-1,-13,7,1.3],[-8.9,-1,-25,6,1.15],
    [11.0,-1,-6,7,1.8],[10.2,-1,-19,8,1.35],[8.5,-1,-32,5,1.1],
  ];
  buttresses.forEach(([x,y,z,h,r],i)=>formation(new THREE.Vector3(x,y,z),h,r,31+i,true));

  // Resting ledge is close enough to touch; its irregular waterline occupies the bottom corners.
  addRock(scene,[-4.0,-.37,7.2],[5.1,.88,3.5],42,wetStone);
  addRock(scene,[3.8,-.48,10.2],[5.0,1.0,3.6],27,limestone);
  addRock(scene,[-7.3,-.15,2.3],[2.1,.95,2.6],83,wetStone);
  addRock(scene,[8.3,-.4,-1.5],[2.0,1.0,3.1],57,wetStone);
  addRock(scene,[-5.7,-.67,-9],[2.2,1.4,3.2],12,wetStone);
  addRock(scene,[6.6,-1.64,-17],[2.5,1.4,2.9],91,wetStone);
  addRock(scene,[8.6,-.59,-31.4],[3.8,.79,3.9],124,wetStone);
  addRock(scene,[-1.15,-.12,5.8],[1.85,.56,2.35],163,wetStone);
  addRock(scene,[-1.6,-.22,4.3],[1.5,.44,1.4],187,wetStone);
  for(let i=0;i<23;i++) {
    const s=Math.sin(i*19.79)*.5+.5;
    const side=i%2===0?-1:1;
    const z=8-i*1.45;
    const x=side*(7.2+s*2.2);
    addRock(scene,[x,-.69+s*.18,z],[.28+s*.6,.17+s*.25,.42+s*.76],100+i,wetStone);
  }
  // Tiny pale deposits break up the close dark ledge, with coherent crevice placement.
  for(let i=0;i<11;i++) {
    const q=i*.47;
    addRock(scene,[-5.5+q*.72,.29+Math.sin(q)*.06,5.6+Math.sin(q*1.6)*.7],[.035+.015*(i%3),.018,.07],207+i,paleCalcite);
  }

  const aperture=wallPoint(1.285,-18.2);
  const skylight=new THREE.Mesh(new THREE.PlaneGeometry(9,10),new THREE.MeshBasicMaterial({color:'#e7eddf',side:THREE.DoubleSide}));
  skylight.rotation.x=-Math.PI/2;
  skylight.name='cave-daylight-aperture';
  skylight.position.copy(aperture).add(new THREE.Vector3(0,1.2,0));
  scene.add(skylight);
  const spot=new THREE.SpotLight('#fff3c5',210,44,.255,.95,1.5);
  spot.castShadow=true;spot.shadow.mapSize.set(1024,1024);
  spot.shadow.camera.near=.2;spot.shadow.camera.far=44;spot.shadow.bias=-.0001;spot.shadow.normalBias=.035;
  spot.shadow.autoUpdate=false;spot.shadow.needsUpdate=true;
  spot.position.copy(aperture).add(new THREE.Vector3(0,.3,0));
  const shaftFoot = new THREE.Vector3(-2,.03,-12.3);
  spot.target.position.copy(shaftFoot);scene.add(spot,spot.target);
  // Diffuse volume is a soft spatial veil inside the actual opening, with no hard cone rim.
  const beamGeometry=new THREE.BufferGeometry();
  const across=new THREE.Vector3(1,0,.32).normalize();
  const points=[aperture.clone().addScaledVector(across,-.48),aperture.clone().addScaledVector(across,.48),shaftFoot.clone().addScaledVector(across,3.9),shaftFoot.clone().addScaledVector(across,-3.9)];
  beamGeometry.setAttribute('position',new THREE.Float32BufferAttribute(points.flatMap(p=>p.toArray()),3));
  beamGeometry.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,1,1,0,1],2));
  beamGeometry.setIndex([0,1,2,0,2,3]);
  const beamMaterial=new THREE.ShaderMaterial({
    uniforms:{uTime:timeUniform},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec2 vUv;uniform float uTime;void main(){float edge=pow(max(0.,sin(vUv.x*3.14159265)),2.7);float lines=.78+.1*sin(vUv.x*46.+sin(vUv.y*2.+uTime*.07))+.07*sin(vUv.x*89.);float fade=smoothstep(0.,.055,vUv.y)*(1.-smoothstep(.65,1.,vUv.y));gl_FragColor=vec4(vec3(.91,.91,.68),edge*lines*fade*.19);}`,
  });
  const beam=new THREE.Mesh(beamGeometry,beamMaterial);scene.add(beam);

  // Suspended moisture occupies only the lit volume; restrained, slow dust-like motion.
  const dustCount=80,dustPositions=new Float32Array(dustCount*3),dustBase=new Float32Array(dustCount*3);
  for(let i=0;i<dustCount;i++) {
    const t=(i+.5)/dustCount;
    const p=aperture.clone().lerp(shaftFoot,t);
    const radius=t*2.5+.15;
    p.x+=Math.sin(i*43.7)*radius;p.z+=Math.cos(i*21.13)*radius*.6;
    dustBase.set(p.toArray(),i*3);dustPositions.set(p.toArray(),i*3);
  }
  const dustGeometry=new THREE.BufferGeometry();dustGeometry.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));
  const dustMaterial=new THREE.ShaderMaterial({
    uniforms:{uPixelRatio:{value:Math.min(renderer.getPixelRatio(),2)}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'uniform float uPixelRatio;void main(){vec4 p=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(20./-p.z,1.,2.0)*uPixelRatio;gl_Position=projectionMatrix*p;}',
    fragmentShader:'void main(){float d=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(.85,.91,.77,(1.-smoothstep(.05,1.,d))*.27);}',
  });
  scene.add(new THREE.Points(dustGeometry,dustMaterial));
  const dropMat = new THREE.MeshPhysicalMaterial({color:'#a7d1c7',roughness:.1,metalness:.1,transparent:true,opacity:.5});
  const drops:THREE.Mesh[]=[];
  for(let i=0;i<4;i++) {
    const drop=new THREE.Mesh(new THREE.SphereGeometry(.017,6,8),dropMat);
    drop.scale.set(.8,2.5,.8);drop.position.set(-3.3+i*1.42,8,-10.5-i*.68);scene.add(drop);drops.push(drop);
  }
  const solidOccluders=scene.children.filter(object=>object instanceof THREE.Mesh && object!==pool.mesh && !(object.material instanceof THREE.ShaderMaterial) && !(Array.isArray(object.material)?object.material.some(m=>m.transparent):object.material.transparent));
  let lastDropCycle=-1;
  return {
    scene,camera,target,
    update(time,dt) {
      timeUniform.value=time;pool.update(time);
      for(let i=0;i<dustCount;i++) {
        dustPositions[i*3]=dustBase[i*3]+Math.sin(time*.085+i)*.075;
        dustPositions[i*3+1]=dustBase[i*3+1]+Math.sin(time*.05+i*3.1)*.12;
      }
      dustGeometry.attributes.position.needsUpdate=true;
      drops.forEach((drop,i)=>{const phase=((time*.095+i*.237)%1);drop.visible=phase>.87;drop.position.y=7.5-(Math.max(0,phase-.87)/.13)**2*7.45;});
      const cycle=Math.floor(time*.095);
      if(cycle!==lastDropCycle&&dt>0){lastDropCycle=cycle;pool.ripple(-1.9,-11.2,time);}
    },
    interact(ray,time){
      const hits=ray.intersectObjects([...solidOccluders,pool.mesh],false);
      if(!hits.length||hits[0].object!==pool.mesh)return null;
      const p=hits[0].point;
      pool.ripple(p.x,p.z,time);
      return {world:'cave',kind:'pool-ripple',strength:.35,pan:THREE.MathUtils.clamp(p.x/14,-.75,.75)};
    },
    resize(aspect){
      camera.fov=aspect<.8?59:53;
      camera.position.set(aspect<.8?.4:.75,2.2,10.5);
      target.set(aspect<.8?.45:-.2,aspect<.8?4.2:4.2,-15);
      camera.updateProjectionMatrix();camera.lookAt(target);
    },
    dispose(){pool.dispose();},
  };
}
