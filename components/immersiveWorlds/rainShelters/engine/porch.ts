import * as THREE from 'three';
import type { WorldBuilder } from './types';

/** Original procedural architecture/materials. No external assets or copied gallery code. */
export const buildPorch: WorldBuilder = ({ scene, camera, renderer }) => {
  let seed = 520731;
  const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const range = (a: number, b: number) => a + rand() * (b - a);
  scene.background = new THREE.Color('#8faaa8');
  scene.fog = new THREE.FogExp2('#839b94', 0.036);
  camera.position.set(0, 1.49, 3.7);
  camera.lookAt(0.08, 0.92, -5);
  camera.near = 0.035;
  camera.far = 90;

  const texture = (kind: 'wood' | 'stone' | 'soil') => {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const pixels = ctx.createImageData(512, 512);
    for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
      const g = kind === 'wood'
        ? 128 + Math.sin(y * .23 + Math.sin(x * .014) * 1.8 + Math.sin(y * .041) * 4) * 19 + Math.sin(y * 1.3 + x * .007) * 7 + range(-12, 12)
        : 139 + Math.sin(x * .042 + Math.sin(y * .029) * 3) * 15 + Math.sin(y * .052 - x * .027) * 12 + range(-29, 29);
      const k = (y * 512 + x) * 4;
      pixels.data[k] = g; pixels.data[k + 1] = g; pixels.data[k + 2] = g; pixels.data[k + 3] = 255;
    }
    ctx.putImageData(pixels, 0, 0);
    if (kind === 'wood') {
      for (let i = 0; i < 70; i++) {
        const y = range(0, 512); ctx.strokeStyle = `rgba(34,24,17,${range(.07, .19)})`; ctx.lineWidth = range(.4, 1.3);
        ctx.beginPath(); ctx.moveTo(range(-90, 180), y); ctx.bezierCurveTo(180, y - 2, 310, y + 3, range(400, 600), y + 1); ctx.stroke();
      }
    }
    const tex = new THREE.CanvasTexture(canvas); tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); return tex;
  };
  const woodTex = texture('wood'), stoneTex = texture('stone'), soilTex = texture('soil');
  const wood = new THREE.MeshStandardMaterial({ color: '#856746', map: woodTex, bumpMap: woodTex, bumpScale: .045, roughness: .74 });
  const darkWood = new THREE.MeshStandardMaterial({ color: '#5d4530', map: woodTex, bumpMap: woodTex, bumpScale: .028, roughness: .82 });
  const endWood = new THREE.MeshStandardMaterial({ color: '#a08561', map: woodTex, roughness: .92 });
  const stoneMat = new THREE.MeshStandardMaterial({ color: '#74796b', map: stoneTex, bumpMap: stoneTex, bumpScale: .08, roughness: .88 });
  const wetStone = new THREE.MeshStandardMaterial({ color: '#536052', map: stoneTex, bumpMap: stoneTex, bumpScale: .055, roughness: .46 });
  const moss = new THREE.MeshStandardMaterial({ color: '#596b3a', map: soilTex, bumpMap: soilTex, bumpScale: .09, roughness: 1 });
  const soil = new THREE.MeshStandardMaterial({ color: '#444e34', map: soilTex, bumpMap: soilTex, bumpScale: .07, roughness: .9 });
  const mortar = new THREE.MeshStandardMaterial({ color: '#353d30', roughness: 1 });
  const stemMat = new THREE.MeshStandardMaterial({ color: '#526337', roughness: .9 });
  const trunkMat = new THREE.MeshStandardMaterial({ color: '#655b46', map: woodTex, bumpMap: woodTex, bumpScale: .085, roughness: .9 });
  const shadowMat = new THREE.MeshBasicMaterial({ color: '#0c1b17', transparent: true, opacity: .13, depthWrite: false });

  scene.add(new THREE.HemisphereLight('#d4e2de', '#777057', 2.05));
  const sun = new THREE.DirectionalLight('#e8e1c8', 1.7); sun.position.set(-8, 13, -7);
  sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); sun.shadow.camera.left = -12; sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 12; sun.shadow.camera.bottom = -12; sun.shadow.camera.near = 1; sun.shadow.camera.far = 40; sun.shadow.bias = -.001;
  sun.shadow.normalBias = .035; sun.shadow.radius = 3; scene.add(sun);
  const fill = new THREE.PointLight('#edcba0', 5.5, 9, 2); fill.position.set(-2.3, 2.1, 3.2); scene.add(fill);

  const box = (w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; scene.add(m); return m;
  };
  const between = (a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material, endRadius = radius * .7, sides = 9) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(endRadius, radius, a.distanceTo(b), sides), mat);
    m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    m.castShadow = m.receiveShadow = true; scene.add(m); return m;
  };
  const groundGeo = new THREE.PlaneGeometry(70, 60, 42, 42); groundGeo.rotateX(-Math.PI / 2);
  const gp = groundGeo.attributes.position;
  for (let i = 0; i < gp.count; i++) { const x = gp.getX(i), z = gp.getZ(i); gp.setY(i, -.23 + Math.sin(x * .41) * Math.sin(z * .3) * .13); }
  groundGeo.computeVertexNormals(); const ground = new THREE.Mesh(groundGeo, soil); ground.position.z = -20; ground.receiveShadow = true; scene.add(ground);

  // An actual veranda surrounding the eye: individual worn planks, exposed joinery and asymmetric posts.
  box(14, .28, 5.5, darkWood, 0, -.13, 3.0);
  for (let i = 0; i < 31; i++) {
    const plank = box(.442, .12, 5.45, i % 6 === 0 ? endWood : wood, -6.91 + i * .462, .065 + range(-.004, .004), 3.0);
    plank.rotation.z = range(-.001, .001);
  }
  box(14.3, .18, .18, darkWood, 0, .015, .26);
  box(14.1, .12, .31, wood, 0, -.055, .16);
  box(14.25, .14, .29, darkWood, 0, -.16, -.08);
  for (const x of [-4.5, 1.35]) {
    box(.34, 3.03, .35, darkWood, x, 1.455, .54);
    box(.41, .1, .43, endWood, x, .16, .54);
    box(.48, .2, .48, stoneMat, x, -.015, .54);
    box(.64, .18, .46, wood, x, 2.53, .54);
    const brace = box(.15, 1.1, .19, wood, x + (x < 0 ? .32 : -.32), 2.27, .54); brace.rotation.z = x < 0 ? -.64 : .64;
    box(.47, .1, .41, darkWood, x, 2.04, .54);
  }
  box(14.3, .3, .32, darkWood, 0, 2.77, .54);
  box(14.6, .16, 4.7, darkWood, 0, 3.18, 2.25);
  for (let i = 0; i < 17; i++) {
    const beam = box(.13, .18, 5.8, i % 3 ? wood : endWood, -7.1 + i * .9, 2.93, 1.9); beam.rotation.x = -.065;
  }
  // The tile edge is visible as a tactile dark scallop; the roof remains above the sightline.
  const tileMat = new THREE.MeshStandardMaterial({ color: '#565951', roughness: .9, map: stoneTex, bumpMap: stoneTex, bumpScale: .025 });
  const tileGeo = new THREE.CylinderGeometry(.17, .17, .55, 10, 1, true, 0, Math.PI); tileGeo.rotateX(Math.PI / 2);
  const tiles = new THREE.InstancedMesh(tileGeo, tileMat, 53); const dummy = new THREE.Object3D();
  for (let i = 0; i < 53; i++) { dummy.position.set(-7.2 + i * .275, 2.99 + Math.pow((i - 26) / 26, 2) * .16, -.22); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); tiles.setMatrixAt(i, dummy.matrix); }
  tiles.castShadow = true; scene.add(tiles);

  // Wet stones lead away from the porch; their surfaces are individually deformed, not a box path.
  const rockGeo = new THREE.IcosahedronGeometry(1, 2);
  const rp = rockGeo.attributes.position;
  for (let i = 0; i < rp.count; i++) { const x = rp.getX(i), y = rp.getY(i), z = rp.getZ(i); const n = 1 + Math.sin(x * 8 + z * 4) * .08 + Math.sin(y * 13 - x * 3) * .035; rp.setXYZ(i, x * n, y * n, z * n); }
  rockGeo.computeVertexNormals();
  const stones = new THREE.InstancedMesh(rockGeo, wetStone, 63);
  for (let i = 0; i < 63; i++) {
    const x = i < 11 ? -.8 + Math.sin(i * .74) * 1.1 - i * .06 : range(-12, 12);
    const z = i < 11 ? -1.5 - i * .77 : range(-3, -19);
    dummy.position.set(x, -.095 + (i < 11 ? 0 : range(-.07, .08)), z);
    dummy.scale.set(i < 11 ? range(.37, .56) : range(.15, .61), i < 11 ? range(.07, .12) : range(.1, .27), i < 11 ? range(.3, .48) : range(.17, .7));
    dummy.rotation.set(range(-.2, .2), range(0, 6.28), range(-.1, .1)); dummy.updateMatrix(); stones.setMatrixAt(i, dummy.matrix);
    stones.setColorAt(i, new THREE.Color().setHSL(range(.12, .18), range(.05, .16), range(.46, .67)));
  }
  stones.castShadow = stones.receiveShadow = true; scene.add(stones);
  // Larger weathered garden stones make the garden human-scale and establish occlusion.
  const boulders = new THREE.InstancedMesh(rockGeo, stoneMat, 19); const mossCaps = new THREE.InstancedMesh(rockGeo, moss, 19);
  for (let i = 0; i < 19; i++) {
    const x = i < 7 ? -3.7 + i * 1.12 : range(-13, 13), z = i < 7 ? -7.7 - Math.sin(i) * 1.7 : range(-9, -24);
    const h = range(.35, .9); dummy.position.set(x, h * .21 - .12, z); dummy.scale.set(range(.65, 1.3), h, range(.5, 1.05)); dummy.rotation.set(range(-.25, .25), range(0, 6.28), range(-.2, .2)); dummy.updateMatrix(); boulders.setMatrixAt(i, dummy.matrix);
    dummy.position.y += h * .16; dummy.scale.multiply(new THREE.Vector3(.89, .86, .89)); dummy.updateMatrix(); mossCaps.setMatrixAt(i, dummy.matrix);
  }
  boulders.castShadow = boulders.receiveShadow = true; mossCaps.castShadow = mossCaps.receiveShadow = true; scene.add(boulders, mossCaps);

  // Low dry-stacked rear boundary recedes into monsoon air, with interrupted stone courses.
  const wall = new THREE.InstancedMesh(rockGeo, stoneMat, 94);
  for (let i = 0; i < 94; i++) {
    const row = Math.floor(i / 31); dummy.position.set(-15 + (i % 31) * 1.03 + row * .31, row * .35 - .03, -16.2 + Math.sin(i % 31) * .13);
    dummy.scale.set(range(.49, .61), range(.21, .26), range(.39, .53)); dummy.rotation.set(range(-.04, .04), range(-.25, .25), range(-.08, .08)); dummy.updateMatrix(); wall.setMatrixAt(i, dummy.matrix);
  }
  wall.receiveShadow = true; scene.add(wall);

  // Broad foliage: each blade has a raised central vein and asymmetrical curved outline.
  const bladeGeo = new THREE.BufferGeometry();
  const bladePos: number[] = [], bladeUv: number[] = [], bladeIdx: number[] = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8, width = Math.sin(Math.PI * t) * (.16 + .055 * t);
    for (const side of [-1, 0, 1]) { bladePos.push(side * width, t, Math.sin(t * Math.PI) * .1 + (side === 0 ? .025 : 0)); bladeUv.push((side + 1) * .5, t); }
  }
  for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { const a = i * 3 + j; bladeIdx.push(a, a + 1, a + 3, a + 1, a + 4, a + 3); }
  bladeGeo.setAttribute('position', new THREE.Float32BufferAttribute(bladePos, 3)); bladeGeo.setAttribute('uv', new THREE.Float32BufferAttribute(bladeUv, 2)); bladeGeo.setIndex(bladeIdx); bladeGeo.computeVertexNormals();
  const leafMat = new THREE.MeshStandardMaterial({ color: '#7f9c55', roughness: .72, side: THREE.DoubleSide });
  const fernLeaves = new THREE.InstancedMesh(bladeGeo, leafMat, 2280); let leafIndex = 0;
  const fernLocations: [number, number, number][] = [[-2.1,-1.15,1.25],[2.15,-1.25,1.2],[-3.2,-2.6,1.45],[2.7,-3.4,1.3],[3.5,-5.9,1.4],[-4.5,-4.9,1.3],[-2.9,-8.2,1.1],[4.8,-9,1.6],[-5.5,-10,1.4],[6.5,-5,1.2],[1.9,-10,1],[-7.1,-7.2,1.4]];
  for (const [fx, fz, size] of fernLocations) {
    for (let fr = 0; fr < 7; fr++) {
      const angle = fr / 7 * Math.PI * 2 + range(-.24, .24), length = size * range(.7, 1.1);
      const pts: THREE.Vector3[] = [];
      for (let k = 0; k < 5; k++) { const t = k / 4; pts.push(new THREE.Vector3(fx + Math.cos(angle) * t * length, -.1 + Math.sin(t * Math.PI * .8) * length * .67, fz + Math.sin(angle) * t * length)); }
      const curve = new THREE.CatmullRomCurve3(pts);
      const stem = new THREE.Mesh(new THREE.TubeGeometry(curve, 10, .008, 3, false), stemMat); scene.add(stem);
      for (let pair = 1; pair <= 12; pair++) {
        const t = pair / 13, point = curve.getPoint(t), len = Math.sin(t * Math.PI) * length * .36;
        for (const side of [-1, 1]) {
          const direction = new THREE.Vector3(Math.cos(angle) * .2 + Math.sin(angle) * side, .12, Math.sin(angle) * .2 - Math.cos(angle) * side).normalize();
          dummy.position.copy(point); dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction); dummy.scale.set(.54 * size, len, .8); dummy.updateMatrix(); fernLeaves.setMatrixAt(leafIndex, dummy.matrix);
          fernLeaves.setColorAt(leafIndex++, new THREE.Color().setHSL(range(.20, .27), range(.25, .49), range(.29, .61)));
        }
      }
    }
  }
  fernLeaves.count = leafIndex; fernLeaves.receiveShadow = true; scene.add(fernLeaves);

  // Trees are rooted beyond the stone garden; trunks and branching silhouette remain visible.
  const treeLeaves = new THREE.InstancedMesh(bladeGeo, leafMat, 3800); let treeLeafCount = 0;
  for (let t = 0; t < 10; t++) {
    const tx = t < 2 ? (t ? 5.4 : -5.6) : range(-17, 17), tz = t < 2 ? -8.8 : range(-15, -29), h = range(5.3, 8.3);
    between(new THREE.Vector3(tx, -.25, tz), new THREE.Vector3(tx + .23, h, tz - .2), range(.13, .24), trunkMat, .047, 9);
    for (let b = 0; b < 5; b++) {
      const angle = b * 2.39 + t, y = h * range(.45, .8), reach = range(1.2, 2.7);
      const tip = new THREE.Vector3(tx + Math.cos(angle) * reach, y + range(.4, 1.3), tz + Math.sin(angle) * reach);
      between(new THREE.Vector3(tx, y, tz), tip, .047, trunkMat, .012, 7);
      for (let j = 0; j < 60; j++) {
        const r = Math.sqrt(rand()) * 1.2, a = range(0, Math.PI * 2);
        dummy.position.copy(tip).add(new THREE.Vector3(Math.cos(a) * r, range(-.22, .85), Math.sin(a) * r));
        dummy.rotation.set(range(.5, 2.4), range(0, Math.PI * 2), range(0, Math.PI * 2)); dummy.scale.set(range(.6, 1), range(.3, .64), 1); dummy.updateMatrix(); treeLeaves.setMatrixAt(treeLeafCount, dummy.matrix);
        treeLeaves.setColorAt(treeLeafCount++, new THREE.Color().setHSL(range(.22, .32), range(.19, .35), range(.25, .56)));
      }
    }
  }
  treeLeaves.count = treeLeafCount; treeLeaves.receiveShadow = true; scene.add(treeLeaves);

  // Hollow carved granite bowl at arm's reach. Both inside wall and irregular rim are geometry.
  const basin = new THREE.Group(); basin.position.set(.64, -.13, -.03); scene.add(basin);
  const profile = [new THREE.Vector2(.09, 0), new THREE.Vector2(.37, .025), new THREE.Vector2(.55, .11), new THREE.Vector2(.65, .25), new THREE.Vector2(.715, .49), new THREE.Vector2(.7, .63), new THREE.Vector2(.665, .67), new THREE.Vector2(.588, .665), new THREE.Vector2(.55, .60), new THREE.Vector2(.51, .37), new THREE.Vector2(.39, .23), new THREE.Vector2(.1, .19), new THREE.Vector2(0, .19)];
  const basinGeo = new THREE.LatheGeometry(profile, 72); const bp = basinGeo.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i), a = Math.atan2(x, z), variation = Math.sin(a * 7 + .4) * .012 + Math.sin(a * 13 - .7) * .004;
    bp.setXYZ(i, x * (1 + variation), y + Math.sin(a * 5) * .008 * Math.min(y, 1), z * (1 + variation));
  }
  basinGeo.computeVertexNormals(); const bowl = new THREE.Mesh(basinGeo, stoneMat); bowl.castShadow = bowl.receiveShadow = true; basin.add(bowl);
  const footing = new THREE.Mesh(rockGeo, wetStone); footing.position.set(.64, -.2, -.03); footing.scale.set(.65, .13, .54); scene.add(footing);
  const contact = new THREE.Mesh(new THREE.CircleGeometry(.85, 48), shadowMat); contact.rotation.x = -Math.PI / 2; contact.position.set(.64, -.201, -.03); scene.add(contact);
  // A trickling bamboo feeder ends above the bowl, with dark open mouth and binding twine.
  const bamboo = new THREE.MeshStandardMaterial({ color: '#9a9166', map: woodTex, roughness: .73 });
  between(new THREE.Vector3(1.26, -.13, -.4), new THREE.Vector3(1.26, .89, -.4), .036, bamboo, .034, 12);
  const spoutStart = new THREE.Vector3(1.48, .9, -.33), spoutEnd = new THREE.Vector3(.91, .81, -.12);
  between(spoutStart, spoutEnd, .054, bamboo, .057, 14);
  const mouth = new THREE.Mesh(new THREE.CircleGeometry(.042, 20), mortar); mouth.position.copy(spoutEnd); mouth.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), spoutEnd.clone().sub(spoutStart).normalize()); scene.add(mouth);
  const twine = new THREE.MeshStandardMaterial({ color: '#464330', roughness: 1 });
  for (let i = 0; i < 3; i++) { const knot = new THREE.Mesh(new THREE.TorusGeometry(.059, .007, 5, 16), twine); knot.position.set(1.24 - i * .015, .867 - i * .002, -.242 + i * .005); knot.rotation.set(.0, 1.22, 1.73); scene.add(knot); }

  const uniforms = { uTime: { value: 0 }, uTouch: { value: new THREE.Vector2(.12, -.05) }, uTouchTime: { value: -100 } };
  const waterMat = new THREE.ShaderMaterial({
    uniforms, side: THREE.DoubleSide,
    vertexShader: `
      uniform float uTime; uniform vec2 uTouch; uniform float uTouchTime;
      varying vec2 vP; varying vec3 vWorld; varying vec3 vNormal;
      float ripple(vec2 p,vec2 o,float age,float amp){float d=length(p-o);return sin(d*56.-age*11.)*exp(-pow((d-age*.27)*9.,2.))*exp(-age*.65)*amp;}
      float surface(vec2 p){float h=sin(p.x*14.+uTime*.58)*sin(p.y*13.-uTime*.65)*.0011;
        for(int i=0;i<7;i++){float f=float(i);float age=mod(uTime*.87+f*.471,3.6);vec2 c=vec2(sin(f*12.4),cos(f*8.7))*.39;h+=ripple(p,c,age,.0018);}
        h+=ripple(p,vec2(.27,-.09),mod(uTime*1.5,2.5),.0027);
        float age=uTime-uTouchTime;if(age>=0.&&age<8.)h+=ripple(p,uTouch,age,.013);
        return h;}
      void main(){vP=position.xy;float h=surface(position.xy);vec3 p=position+vec3(0.,0.,h);vec4 w=modelMatrix*vec4(p,1.);vWorld=w.xyz;
        float e=.004;float dx=surface(position.xy+vec2(e,0.))-surface(position.xy-vec2(e,0.));float dy=surface(position.xy+vec2(0.,e))-surface(position.xy-vec2(0.,e));
        vNormal=normalize(mat3(modelMatrix)*normalize(vec3(-dx/(2.*e),-dy/(2.*e),1.)));gl_Position=projectionMatrix*viewMatrix*w;}
    `,
    fragmentShader: `
      varying vec2 vP; varying vec3 vWorld; varying vec3 vNormal;
      void main(){vec3 n=normalize(vNormal);vec3 v=normalize(cameraPosition-vWorld);vec3 r=reflect(-v,n);float f=.04+.72*pow(1.-max(dot(n,v),0.),4.);
        vec3 deep=vec3(.083,.15,.118);vec3 sky=mix(vec3(.22,.32,.27),vec3(.62,.72,.67),smoothstep(-.05,.6,r.y));
        float branch=sin(r.x*23.+r.z*4.)*sin(r.z*17.-r.x*6.);sky*=mix(.7,1.,smoothstep(-.1,.15,branch+r.y*.6));
        vec3 c=mix(deep,sky,.35+f*.55);float glint=pow(max(dot(reflect(normalize(vec3(-.4,-1.,.3)),n),v),0.),65.);c+=vec3(.63,.68,.60)*glint*.22;
        float edge=smoothstep(.39,.558,length(vP));c*=1.-edge*.18;gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const water: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> = new THREE.Mesh(new THREE.CircleGeometry(.562, 96), waterMat); water.rotation.x = -Math.PI / 2; water.position.y = .581; basin.add(water);
  // Dense radial tessellation makes the ripple normals and silhouette truly spatial.
  const waterGrid = new THREE.PlaneGeometry(1.124, 1.124, 64, 64);
  const idx: number[] = [], wp = waterGrid.attributes.position, oldIndex = waterGrid.index!;
  for (let i = 0; i < oldIndex.count; i += 3) {
    const a = oldIndex.getX(i), b = oldIndex.getX(i + 1), c = oldIndex.getX(i + 2);
    if ([a,b,c].every(v => Math.hypot(wp.getX(v), wp.getY(v)) < .557)) idx.push(a,b,c);
  }
  waterGrid.setIndex(idx); water.geometry.dispose(); water.geometry = waterGrid;

  // Roof runoff has coherent streams plus detached falling drops; there is no glass plane.
  const streamMat = new THREE.MeshPhysicalMaterial({ color: '#b4d1cc', transparent: true, opacity: .34, roughness: .14, metalness: .08, depthWrite: false });
  const streamGeometries: THREE.BufferGeometry[] = [];
  for (const [x,z,thickness] of [[-3.5,-.33,.015],[-1.74,-.3,.012],[2.5,-.34,.018],[4.4,-.35,.019],[.91,-.12,.009]]) {
    const startY = x === .91 ? .8 : 2.96, endY = x === .91 ? .46 : -.13;
    const line = new THREE.CatmullRomCurve3([new THREE.Vector3(x,startY,z),new THREE.Vector3(x+.012,startY*.67,z+.015),new THREE.Vector3(x+.025,(startY+endY)*.37,z+.036),new THREE.Vector3(x+.012,endY,z+.045)]);
    const geo = new THREE.TubeGeometry(line, 18, thickness, 5, false); streamGeometries.push(geo); scene.add(new THREE.Mesh(geo, streamMat));
  }
  const rainCount = 1550, rainPositions = new Float32Array(rainCount * 6), rainSeeds: number[] = [];
  for (let i = 0; i < rainCount; i++) rainSeeds.push(range(-17,17),range(0,9),range(-24,-.45),range(.7,1.35));
  const rainGeo = new THREE.BufferGeometry(); rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rain = new THREE.LineSegments(rainGeo,new THREE.LineBasicMaterial({color:'#c3d4d0',transparent:true,opacity:.26,depthWrite:false})); rain.frustumCulled = false; scene.add(rain);
  const sprayGeo = new THREE.BufferGeometry(), sprayPos = new Float32Array(55 * 3); sprayGeo.setAttribute('position',new THREE.BufferAttribute(sprayPos,3));
  const spray = new THREE.Points(sprayGeo,new THREE.PointsMaterial({color:'#cbdfd5',size:.018,transparent:true,opacity:.51,depthWrite:false})); spray.frustumCulled = false; scene.add(spray);
  const raycaster = new THREE.Raycaster(); let now = 0;

  return {
    resize(aspect) {
      camera.fov = aspect < .8 ? 61 : 52;
      // Narrow composition keeps the bowl, rain edge and the path; it never becomes empty roof/floor.
      camera.position.set(aspect < .8 ? .48 : 0, aspect < .8 ? 1.38 : 1.49, aspect < .8 ? 2.75 : 3.7);
      camera.lookAt(aspect < .8 ? .43 : .08, aspect < .8 ? 1.02 : .92, -5);
      camera.updateProjectionMatrix();
    },
    update(time) {
      now = time; uniforms.uTime.value = time;
      for (let i = 0; i < rainCount; i++) {
        const s = i * 4, k = i * 6, y = ((rainSeeds[s+1] - time * 4.9 * rainSeeds[s+3]) % 9 + 9) % 9 - .25;
        const x = rainSeeds[s] + Math.sin(time*.16 + rainSeeds[s+2])*.02;
        rainPositions[k]=x; rainPositions[k+1]=y; rainPositions[k+2]=rainSeeds[s+2];
        rainPositions[k+3]=x+.023; rainPositions[k+4]=y+.16*rainSeeds[s+3]; rainPositions[k+5]=rainSeeds[s+2]-.008;
      }
      rainGeo.attributes.position.needsUpdate = true;
      for (let i = 0; i < 55; i++) {
        const age = (time * .9 + i * .371) % 1, x = [-3.5,-1.74,2.5,4.4,.91][i%5], a = i * 2.4;
        sprayPos[i*3]=x+Math.cos(a)*age*.095; sprayPos[i*3+1]=(i%5===4 ? .459 : -.12)+Math.sin(age*Math.PI)*.045; sprayPos[i*3+2]=(i%5===4 ? -.12 : -.3)+Math.sin(a)*age*.07;
      }
      sprayGeo.attributes.position.needsUpdate=true;
      // Low-amplitude coherent canopy motion, not attention-seeking per-leaf oscillation.
      treeLeaves.rotation.z = Math.sin(time * .22) * .0016;
      fernLeaves.rotation.y = Math.sin(time * .31) * .0014;
      streamMat.opacity = .34 + Math.sin(time * 1.3) * .025;
    },
    interact(x, y, explicit = false) {
      raycaster.setFromCamera(new THREE.Vector2(x,y),camera); scene.updateMatrixWorld(true);
      const hit = explicit ? null : raycaster.intersectObject(water,false)[0];
      if (!explicit && !hit) return null;
      if(hit) { const local = water.worldToLocal(hit.point.clone()); uniforms.uTouch.value.set(local.x,local.y); }
      else uniforms.uTouch.value.set(-.08,.06);
      uniforms.uTouchTime.value=now;
      return { action:'basin-ripple',value:.55 };
    },
  };
};
