import * as THREE from 'three';
import { seeded, material, mesh, beam, rock, sky, fire, lantern } from './scenery';
import type { WorldRecipe, NightInteractionKind } from './worldTypes';

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const shore = (x: number) => -5.6 + Math.sin(x * .29 + .8) * .48 + Math.cos(x * .7) * .18 + Math.min(Math.abs(x) * .11, 1.5);

/** All geometry and shading are original. Distances are metres; the viewpoint is a seated camper. */
export function buildLakesideWorld(): WorldRecipe {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#72728d');
  scene.fog = new THREE.FogExp2('#696780', .0057);
  sky(scene, '#172644', '#bc939e', 2048, 180);
  scene.add(new THREE.HemisphereLight('#a9b5e8', '#4e3b39', 1.12));
  const twilight = new THREE.DirectionalLight('#dfbfce', 1.24);
  twilight.position.set(-18, 24, -35);
  twilight.castShadow = true;
  twilight.shadow.mapSize.set(2048, 2048);
  twilight.shadow.camera.left = -12; twilight.shadow.camera.right = 12;
  twilight.shadow.camera.top = 11; twilight.shadow.camera.bottom = -11;
  twilight.shadow.camera.near = .5; twilight.shadow.camera.far = 80;
  twilight.shadow.normalBias = .025; twilight.shadow.bias = -.00004;
  twilight.shadow.radius = 3;
  scene.add(twilight);
  const moonlight = new THREE.DirectionalLight('#9babdc', .5);
  moonlight.position.set(20, 35, 8);
  scene.add(moonlight);
  const fireFill = new THREE.PointLight('#ffc584', 5.2, 9, 1.9);
  fireFill.position.set(-.72, 1.05, -.9);
  scene.add(fireFill);
  const rng = seeded(882719);
  const bark = material('bark', '#635648');
  const wood = material('wood', '#71604b');
  const stone = material('stone', '#6f6a68');
  const canvas = material('fabric', '#aaa38b');
  canvas.side = THREE.DoubleSide;
  const canvasDark = material('fabric', '#777a65');
  canvasDark.side = THREE.DoubleSide;
  const canvasInside = material('fabric', '#c9b38c');
  canvasInside.side = THREE.DoubleSide;
  const darkMetal = material('metal', '#343b3a');
  const ropeMat = new THREE.MeshStandardMaterial({ color: '#bab8a1', roughness: .98 });
  const add = (object: THREE.Object3D) => { scene.add(object); return object; };
  const tube = (points: THREE.Vector3[], radius: number, mat: THREE.Material, segments = 24) => {
    const obj = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 5, false), mat);
    obj.castShadow = true;
    return obj;
  };

  // A scalloped mineral beach, rising into the campsite: the waterline is actual geometry.
  const groundGeometry = new THREE.BufferGeometry();
  const groundVertices: number[] = [], groundUV: number[] = [], groundIndices: number[] = [];
  const gx = 86, gz = 32;
  for (let iz = 0; iz <= gz; iz++) for (let ix = 0; ix <= gx; ix++) {
    const x = -32 + ix / gx * 64;
    const v = iz / gz;
    const z = THREE.MathUtils.lerp(shore(x) - .15, 19, v);
    const rise = Math.min(v * 2.9, 1);
    const y = -.08 + rise * .075 + Math.sin(x * 1.2) * Math.sin(z * 1.5) * .025 * rise;
    groundVertices.push(x, y, z);
    groundUV.push(x / 6, z / 6);
    if (ix < gx && iz < gz) { const a = iz * (gx + 1) + ix; groundIndices.push(a, a + gx + 1, a + 1, a + 1, a + gx + 1, a + gx + 2); }
  }
  groundGeometry.setAttribute('position', new THREE.Float32BufferAttribute(groundVertices, 3));
  groundGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(groundUV, 2));
  groundGeometry.setIndex(groundIndices); groundGeometry.computeVertexNormals();
  const ground = new THREE.Mesh(groundGeometry, material('earth', '#847c71'));
  ground.receiveShadow = true; add(ground);

  // Broad water with analytic, slowly travelling wave normals and a layered reflected sky/island field.
  const waterUniforms = { uTime: { value: 0 }, uWarmth: { value: .55 } };
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: waterUniforms,
    vertexShader: `varying vec3 vWorld; varying vec2 vUv;
      uniform float uTime;
      void main(){vec3 p=position;
        p.y+=sin(p.x*.64+p.z*.48+uTime*.24)*.012+sin(p.x*1.71-p.z*.88+uTime*.31)*.006;
        vWorld=(modelMatrix*vec4(p,1.)).xyz; vUv=uv;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
    fragmentShader: `precision highp float;
      varying vec3 vWorld; varying vec2 vUv; uniform float uTime; uniform float uWarmth;
      float wave(vec2 p){ return sin(p.x*.64+p.y*.48+uTime*.24)*.012+sin(p.x*1.71-p.y*.88+uTime*.31)*.006+sin(p.x*3.8+p.y*2.5+uTime*.4)*.0018; }
      float hill(float a){return .033+pow(max(0.,sin(a*5.8+.2)),2.)*.041+pow(max(0.,sin(a*13.7+1.8)),4.)*.018;}
      void main(){
        vec2 p=vWorld.xz; float e=.08;
        vec3 n=normalize(vec3((wave(p-vec2(e,0.))-wave(p+vec2(e,0.)))/(2.*e),1.,(wave(p-vec2(0.,e))-wave(p+vec2(0.,e)))/(2.*e)));
        vec3 viewDir=normalize(cameraPosition-vWorld); vec3 r=reflect(-viewDir,n);
        float fresnel=.18+.82*pow(1.-max(0.,dot(viewDir,n)),3.6);
        float h=clamp(r.y,0.,1.);
        vec3 reflected=mix(vec3(.63,.40,.49),vec3(.095,.16,.285),smoothstep(0.,.65,h));
        reflected+=vec3(.135,.075,.105)*exp(-pow((h-.105)*7.5,2.));
        float a=atan(r.x,-r.z); float silhouette=hill(a);
        float soften=.0045+abs(vWorld.z)*.000018;
        reflected=mix(vec3(.15,.20,.255),reflected,smoothstep(silhouette-soften,silhouette+soften,h));
        reflected=mix(vec3(.105,.165,.18),reflected,smoothstep(silhouette*.57-soften,silhouette*.57+soften,h));
        float ripples=sin(p.y*17.+sin(p.x*3.2)+uTime*.3)*.5+.5;
        float cloud=(sin(a*16.+h*35.)*.5+.5)*exp(-pow((h-.16)*14.,2.));
        reflected+=cloud*vec3(.025,.013,.019);
        vec3 base=vec3(.045,.105,.135)+vec3(.055,.06,.055)*clamp(-vWorld.z/100.,0.,1.);
        vec3 color=mix(base,reflected,fresnel);
        vec3 moonDir=normalize(vec3(.34,.31,-1.));
        float moon=pow(max(dot(r,moonDir),0.),560.)*.43;
        color+=moon*vec3(.83,.79,.66)*(ripples*.55+.45);
        float warm=exp(-abs(p.x+.7)*2.8)*exp(-max(0.,-p.y-5.)*.55)*uWarmth;
        color+=vec3(.21,.084,.022)*warm*pow(ripples,5.);
        gl_FragColor=vec4(color,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const waterGeometry = new THREE.PlaneGeometry(230, 210, 128, 100);
  waterGeometry.rotateX(-Math.PI / 2);
  waterGeometry.translate(0, -.035, -108);
  const wp = waterGeometry.attributes.position;
  for (let i = 0; i < wp.count; i++) {
    const z = wp.getZ(i); const near = THREE.MathUtils.clamp((z + 11) / 8, 0, 1);
    wp.setZ(i, z + near * (shore(wp.getX(i)) + 3));
  }
  wp.needsUpdate = true;
  add(new THREE.Mesh(waterGeometry, waterMaterial));

  // Unique lake geography: long rounded islands, an open central sound, and distant overlapping headlands.
  function island(cx: number, z: number, width: number, height: number, color: string, phase: number) {
    const geo = new THREE.BufferGeometry(); const vertices: number[] = [], uv: number[] = [], indices: number[] = [];
    const count = 72;
    for (let i = 0; i <= count; i++) {
      const t = i / count, x = (t - .5) * width;
      const arch = Math.pow(Math.sin(t * Math.PI), 1.12);
      const h = .15 + arch * height * (.78 + .14 * Math.sin(t * 16 + phase) + .08 * Math.cos(t * 29));
      vertices.push(cx + x, -.12, z + Math.cos(t * 6 + phase) * 2, cx + x, h, z - 3);
      uv.push(t, 0, t, 1);
      if (i < count) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(indices); geo.computeVertexNormals();
    add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 1, side: THREE.DoubleSide })));
  }
  island(-45, -137, 175, 18, '#697084', .4);
  island(81, -113, 165, 22, '#535f75', 1.8);
  island(-75, -80, 118, 12, '#354956', 3);
  island(83, -78, 123, 14, '#364d59', 5);
  island(-26, -95, 46, 3.8, '#415568', 4);
  // Far banks have many varied narrow trunks/crowns, not a repeated row of cones.
  const farTreeMaterial = new THREE.MeshStandardMaterial({ color: '#334a51', roughness: 1 });
  const farTreeGeometry = new THREE.ConeGeometry(1, 1, 6, 1);
  const farTrees = new THREE.InstancedMesh(farTreeGeometry, farTreeMaterial, 190);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 190; i++) {
    const side = i < 102 ? -1 : 1;
    const x = side * (25 + rng() * 92), z = -77 - rng() * 9;
    const h = 1.1 + rng() * 2.9;
    dummy.position.set(x, h / 2 + .4, z); dummy.scale.set(h * .19, h, h * .18); dummy.rotation.set(0, rng() * 6.28, (rng() - .5) * .13); dummy.updateMatrix(); farTrees.setMatrixAt(i, dummy.matrix);
  }
  add(farTrees);

  // Pebbles are actual rounded meshes, with wet dark pieces interleaved at the shoreline.
  const pebbleGeometry = new THREE.IcosahedronGeometry(1, 1);
  const pebbleMaterial = material('stone', '#b0a69a');
  const pebbles = new THREE.InstancedMesh(pebbleGeometry, pebbleMaterial, 540);
  for (let i = 0; i < 540; i++) {
    const x = (rng() - .5) * 32; const z = shore(x) + rng() * (i < 390 ? 2.9 : 12);
    const size = .027 + Math.pow(rng(), 2) * .13;
    dummy.position.set(x, -.018 + size * .28, z); dummy.scale.set(size * (1 + rng()), size * (.38 + rng() * .45), size); dummy.rotation.set(rng(), rng() * 6, rng()); dummy.updateMatrix(); pebbles.setMatrixAt(i, dummy.matrix);
    pebbles.setColorAt(i, new THREE.Color().setHSL(.07 + rng() * .06, .05 + rng() * .11, .25 + rng() * .28));
  }
  pebbles.receiveShadow = true; pebbles.castShadow = true; add(pebbles);
  for (let i = 0; i < 20; i++) {
    const side = i % 2 ? -1 : 1, x = side * (3.5 + rng() * 14), z = shore(x) + rng() * .9;
    add(rock([x, -.06, z], [.25 + rng() * .6, .16 + rng() * .24, .32 + rng() * .56], 130 + i, stone));
  }

  // Tensioned canvas tent with bowed panels, seams, a raised fly edge and a genuinely open entrance.
  const tent = new THREE.Group(); tent.position.set(-3.06, 0, -3.3); tent.rotation.y = -.17; add(tent);
  const halfWidth = 1.44, frontZ = 1.34, backZ = -1.65, ridgeHeight = 2.07;
  function tentPoint(side: number, s: number, t: number, inner = false) {
    const z = THREE.MathUtils.lerp(frontZ, backZ, t);
    const ridge = ridgeHeight - .105 * Math.sin(t * Math.PI) - t * .12;
    const x = side * (halfWidth * s + Math.sin(t * Math.PI) * .055 * s);
    const y = .07 + (ridge - .07) * (1 - s) - Math.sin(s * Math.PI) * (.13 + .045 * Math.sin(t * 9)) + .018 * Math.sin(s * 27 + t * 11) * Math.sin(t * Math.PI) * Math.sin(s * Math.PI);
    return V(x, y - (inner ? .032 : 0), z);
  }
  for (const side of [-1, 1]) {
    const geometry = new THREE.BufferGeometry(); const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    const nu = 32, nv = 26;
    for (let v = 0; v <= nv; v++) for (let u = 0; u <= nu; u++) {
      const p = tentPoint(side, u / nu, v / nv); pos.push(p.x, p.y, p.z); uv.push(u / nu * 2, v / nv * 3);
      if (u < nu && v < nv) { const a = v * (nu + 1) + u; idx.push(a, a + 1, a + nu + 1, a + 1, a + nu + 2, a + nu + 1); }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geometry.setIndex(idx); geometry.computeVertexNormals();
    const panel = new THREE.Mesh(geometry, canvas); panel.castShadow = true; panel.receiveShadow = true; tent.add(panel);
    for (const t of [0, .5, 1]) {
      const pts = Array.from({ length: 25 }, (_, n) => tentPoint(side, n / 24, t).add(V(0, .008, .004)));
      tent.add(tube(pts, .012, canvasDark, 32));
    }
    const hemPts = Array.from({ length: 30 }, (_, n) => tentPoint(side, 1, n / 29));
    tent.add(tube(hemPts, .024, canvasDark, 36));
  }
  tent.add(tube(Array.from({ length: 25 }, (_, n) => tentPoint(1, 0, n / 24).add(V(0, .018, 0))), .019, canvasDark, 30));
  // Rear canvas and two softly curled doorway panels leave an irregular central opening.
  const rearShape = new THREE.Shape(); rearShape.moveTo(-halfWidth, .08); rearShape.lineTo(0, ridgeHeight - .12); rearShape.lineTo(halfWidth, .08); rearShape.closePath();
  tent.add(mesh(new THREE.ShapeGeometry(rearShape), canvasDark, [0, 0, backZ]));
  for (const side of [-1, 1]) {
    const geo = new THREE.BufferGeometry(); const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    const cols = 14, rows = 28;
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
      const h = j / rows, u = i / cols;
      const outside = halfWidth * (1 - h);
      const inside = (.82 * (1 - h) + .18 * Math.sin(h * Math.PI));
      const x = side * THREE.MathUtils.lerp(outside, inside, u);
      const y = .07 + h * (ridgeHeight - .08);
      const z = frontZ + Math.sin(u * Math.PI * 1.6) * .1 * Math.sin(h * Math.PI) + side * .018;
      pos.push(x, y, z); uv.push(u, h * 2);
      if (i < cols && j < rows) { const a = j * (cols + 1) + i; idx.push(a, a + 1, a + cols + 1, a + 1, a + cols + 2, a + cols + 1); }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
    const flap = new THREE.Mesh(geo, canvasInside); flap.castShadow = true; flap.receiveShadow = true; tent.add(flap);
    const seam = Array.from({ length: 30 }, (_, i) => { const h = i / 29; return V(side * (.82 * (1 - h) + .18 * Math.sin(h * Math.PI)), .07 + h * (ridgeHeight - .08), frontZ + .018); });
    tent.add(tube(seam, .014, canvasDark, 30));
  }
  tent.add(beam(V(0, .02, frontZ - .015), V(0, ridgeHeight + .014, frontZ - .015), .021, darkMetal));
  // Low warm sleeping area is visible through the open entrance.
  tent.add(mesh(new THREE.BoxGeometry(2.57, .055, 2.8), canvasDark, [0, .02, -.1]));
  const sleeping = material('fabric', '#9c796c');
  const pad = mesh(new THREE.BoxGeometry(.79, .08, 1.95), sleeping, [-.45, .12, -.2]); pad.receiveShadow = true; tent.add(pad);
  for (let i = 0; i < 12; i++) tent.add(mesh(new THREE.CapsuleGeometry(.08, .58, 3, 7), sleeping, [-.45, .19, -.99 + i * .143], [0, 0, Math.PI / 2]));
  const pillow = mesh(new THREE.SphereGeometry(.3, 18, 12), canvasInside, [-.46, .26, -1.02]); pillow.scale.set(1.19, .36, .68); tent.add(pillow);
  const innerGlow = new THREE.PointLight('#f9b166', 3.6, 4.2, 2); innerGlow.position.set(.45, .55, -.75); tent.add(innerGlow);
  for (const side of [-1, 1]) for (const z of [frontZ, backZ]) {
    const peg = V(side * 2.07, .005, z + (z > 0 ? .58 : -.3));
    const anchor = V(side * halfWidth, .09, z);
    tent.add(tube([anchor, V((anchor.x + peg.x) * .5, .045, (anchor.z + peg.z) * .5), peg], .009, ropeMat, 10));
    tent.add(beam(peg.clone().add(V(0, -.10, 0)), peg.clone().add(V(.018, .09, -.035)), .018, darkMetal));
  }
  const guyEnd = V(0, .06, frontZ + 1.04);
  tent.add(tube([V(0, ridgeHeight, frontZ), V(.01, 1.02, frontZ + .54), guyEnd], .008, ropeMat));
  tent.add(beam(guyEnd.clone().add(V(0, -.1, 0)), guyEnd.clone().add(V(.018, .1, -.025)), .018, darkMetal));

  // Empty folding chair opposite the tent, three-dimensional rails and sagging canvas rather than a box.
  const chair = new THREE.Group(); chair.position.set(2.16, .02, -1.65); chair.rotation.y = -.34; add(chair);
  function fabricPatch(width: number, depth: number, height: number, back: boolean) {
    const geo = new THREE.PlaneGeometry(width, depth, 22, 20); const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), sag = (1 - Math.pow(x / (width / 2), 2)) * (1 - Math.pow(y / (depth / 2), 2));
      if (back) pos.setXYZ(i, x, height + y, -.30 - sag * .13 - y * .20);
      else pos.setXYZ(i, x, height - sag * .087, y);
    }
    geo.computeVertexNormals(); const fabric = new THREE.Mesh(geo, canvasDark); fabric.castShadow = true; fabric.receiveShadow = true; chair.add(fabric);
  }
  fabricPatch(.72, .61, .56, false); fabricPatch(.72, .69, .96, true);
  for (const side of [-1, 1]) {
    const x = side * .39;
    chair.add(beam(V(x, .03, .39), V(x, 1.37, -.45), .026, darkMetal));
    chair.add(beam(V(x, .03, -.43), V(x, .65, .31), .026, darkMetal));
    chair.add(beam(V(x, .63, .34), V(x, .7, -.37), .03, wood));
    chair.add(mesh(new THREE.SphereGeometry(.047, 10, 6), darkMetal, [x, .40, .0]));
  }
  chair.add(beam(V(-.39, .57, .3), V(.39, .57, .3), .024, darkMetal));
  chair.add(beam(V(-.39, 1.32, -.45), V(.39, 1.32, -.45), .024, darkMetal));
  chair.add(beam(V(-.39, .56, -.32), V(.39, .56, -.32), .024, darkMetal));
  // A draped woven throw has real folds and a short uneven fringe.
  const throwMat = material('fabric', '#ad7964'); throwMat.side = THREE.DoubleSide;
  const throwGeo = new THREE.PlaneGeometry(.47, .68, 25, 25); const tp = throwGeo.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i), s = (tp.getY(i) + .34) / .68;
    tp.setXYZ(i, x + .14, s < .45 ? .59 + Math.sin(x * 39) * .01 : .59 - (s - .45) * .55, .1 + s * .48);
  }
  throwGeo.computeVertexNormals(); chair.add(new THREE.Mesh(throwGeo, throwMat));
  for (let i = 0; i < 16; i++) chair.add(beam(V(-.085 + i * .03, .28, .58), V(-.08 + i * .03, .21 - rng() * .025, .595), .004, throwMat));

  const campfire = fire([-.78, .035, -.87], .74); add(campfire.group);
  // Split firewood and cut growth rings are tactile, off-centre foreground objects.
  const logEnds = new THREE.MeshStandardMaterial({ color: '#a18a69', roughness: .94 });
  for (let i = 0; i < 4; i++) {
    const a = V(-2.08 + i * .11, .12 + (i > 2 ? .17 : 0), .21 + i * .08), b = a.clone().add(V(.67, -.015, .29));
    add(beam(a, b, .095, bark));
    const end = mesh(new THREE.CircleGeometry(.082, 16), logEnds, [b.x, b.y, b.z]); end.quaternion.setFromUnitVectors(V(0, 0, 1), b.clone().sub(a).normalize()); add(end);
    for (const rad of [.025, .047, .064]) {
      const ring = mesh(new THREE.TorusGeometry(rad, .0015, 3, 20), bark, [b.x, b.y, b.z]); ring.quaternion.copy(end.quaternion); ring.position.addScaledVector(b.clone().sub(a).normalize(), .002); add(ring);
    }
  }

  // A low hand-built camp table at arm's reach. Individual curved-edge planks preserve broad wood grain.
  const table = new THREE.Group(); table.position.set(.62, 0, 1.31); table.rotation.y = -.08; add(table);
  for (let i = 0; i < 3; i++) {
    const shape = new THREE.Shape();
    shape.moveTo(-.71, -.142); shape.lineTo(.67, -.145); shape.quadraticCurveTo(.72, -.13, .714, -.09); shape.lineTo(.705, .127); shape.quadraticCurveTo(.70, .15, .66, .15); shape.lineTo(-.68, .147); shape.quadraticCurveTo(-.726, .14, -.72, .09); shape.lineTo(-.715, -.1); shape.quadraticCurveTo(-.715, -.145, -.71, -.142);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: .056, bevelEnabled: true, bevelSize: .007, bevelThickness: .004, bevelSegments: 2, steps: 1 });
    const plank = mesh(geo, wood, [0, .63, -.33 + i * .323], [-Math.PI / 2, 0, 0]); plank.castShadow = true; plank.receiveShadow = true; table.add(plank);
    for (const x of [-.54, .54]) { const nail = mesh(new THREE.CylinderGeometry(.009, .009, .003, 8), darkMetal, [x, .692, -.33 + i * .323]); table.add(nail); }
  }
  for (const x of [-.5, .5]) {
    table.add(beam(V(x, .02, -.40), V(x, .64, .25), .042, wood));
    table.add(beam(V(x, .02, .35), V(x, .64, -.28), .042, wood));
  }
  table.add(beam(V(-.52, .32, -.02), V(.52, .32, -.02), .032, wood));
  // Enamel mug: hollow lathed walls, thick chipped rim, recessed coffee and a true open handle.
  const mug = new THREE.Group(); mug.position.set(-.18, .702, .02); mug.rotation.y = -.2; table.add(mug);
  const enamel = new THREE.MeshPhysicalMaterial({ color: '#c4d5ca', roughness: .27, metalness: .23, clearcoat: .7, clearcoatRoughness: .22 });
  const mugProfile = [V(.0, .008, 0), V(.119, .008, 0), V(.136, .028, 0), V(.142, .212, 0), V(.146, .23, 0), V(.136, .236, 0), V(.128, .23, 0), V(.126, .037, 0), V(.02, .032, 0)];
  const body = new THREE.Mesh(new THREE.LatheGeometry(mugProfile.map(p => new THREE.Vector2(p.x, p.y)), 48), enamel); body.castShadow = true; body.receiveShadow = true; mug.add(body);
  const rimMat = new THREE.MeshStandardMaterial({ color: '#3d504e', roughness: .32, metalness: .4 });
  mug.add(mesh(new THREE.TorusGeometry(.14, .009, 8, 48), rimMat, [0, .231, 0], [Math.PI / 2, 0, 0]));
  const handle = mesh(new THREE.TorusGeometry(.082, .019, 10, 32, Math.PI * 1.66), enamel, [.15, .124, 0], [0, 0, -.83 * Math.PI]); handle.scale.set(.83, 1, 1); handle.castShadow = true; mug.add(handle);
  const coffeeMat = new THREE.MeshPhysicalMaterial({ color: '#31201a', roughness: .14, metalness: .12, clearcoat: 1 });
  mug.add(mesh(new THREE.CircleGeometry(.126, 48), coffeeMat, [0, .203, 0], [-Math.PI / 2, 0, 0]));
  // A few rim wear marks deliberately break the pristine plastic appearance.
  for (let i = 0; i < 9; i++) {
    const angle = rng() * Math.PI * 2;
    const chip = mesh(new THREE.SphereGeometry(.009, 5, 4), rimMat, [Math.cos(angle) * .139, .233, Math.sin(angle) * .139]); chip.scale.set(1, .21, .7); mug.add(chip);
  }
  const bookMat = material('fabric', '#78664e');
  table.add(mesh(new THREE.BoxGeometry(.29, .033, .39), bookMat, [.26, .71, -.25], [0, -.12, 0]));
  table.add(mesh(new THREE.BoxGeometry(.267, .022, .36), new THREE.MeshStandardMaterial({ color: '#d4c6a6', roughness: 1 }), [.26, .714, -.25], [0, -.12, 0]));
  const lamp = lantern([1.16, .707, 1.49], .68); add(lamp.group);

  // Soft steam is spatial, with stationary turbulence and no billboards concealing the scene.
  const steamMaterials: THREE.MeshBasicMaterial[] = [];
  const steamGeometries: THREE.BufferGeometry[] = [];
  const steamObjects: THREE.Mesh[] = [];
  const steamOrigin = V(.62, 0, 1.31).add(V(-.18, .94, .02).applyAxisAngle(V(0, 1, 0), -.08));
  for (let strand = 0; strand < 3; strand++) {
    const geometry = new THREE.PlaneGeometry(.021, .36, 1, 18); const mat = new THREE.MeshBasicMaterial({ color: '#d4d1d6', transparent: true, opacity: .085, side: THREE.DoubleSide, depthWrite: false });
    const obj = new THREE.Mesh(geometry, mat); obj.position.copy(steamOrigin); obj.rotation.y = strand * Math.PI / 3; add(obj); steamMaterials.push(mat); steamGeometries.push(geometry); steamObjects.push(obj);
  }

  // Shore grasses: individually bent ribbons, seedheads and occasional leaves in spatial clumps.
  const grassVerts: number[] = [], grassIndices: number[] = [], grassColors: number[] = [];
  const grassBase = new THREE.Color('#736f4e');
  for (let clump = 0; clump < 145; clump++) {
    const x = (rng() - .5) * 38, z = shore(x) + rng() * 3.8;
    if (Math.abs(x) < 3.2 || (x < -1 && z > -4.6)) continue;
    for (let blade = 0; blade < 9; blade++) {
      const angle = rng() * 6.28, lean = .1 + rng() * .22, h = .14 + rng() * .53, width = .014 + rng() * .018;
      const bx = x + (rng() - .5) * .32, bz = z + (rng() - .5) * .32;
      const base = grassVerts.length / 3;
      const color = grassBase.clone().multiplyScalar(.75 + rng() * .62);
      for (let s = 0; s <= 4; s++) {
        const t = s / 4, cx = bx + Math.cos(angle) * lean * t * t, cz = bz + Math.sin(angle) * lean * t * t;
        for (const side of [-1, 1]) {
          grassVerts.push(cx + Math.cos(angle + Math.PI / 2) * width * (1 - t) * side, .012 + h * t, cz + Math.sin(angle + Math.PI / 2) * width * (1 - t) * side);
          grassColors.push(color.r * (1 - .25 * t), color.g * (1 - .1 * t), color.b);
        }
        if (s < 4) { const a = base + s * 2; grassIndices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
      }
    }
  }
  const grassGeometry = new THREE.BufferGeometry(); grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grassVerts, 3)); grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(grassColors, 3)); grassGeometry.setIndex(grassIndices); grassGeometry.computeVertexNormals();
  const grassMotion = { value: 0 };
  const grassMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide });
  grassMat.onBeforeCompile = shader => {
    shader.uniforms.uLakesideWindTime = grassMotion;
    shader.vertexShader = 'uniform float uLakesideWindTime;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      float bend=max(0.,position.y); bend*=bend;
      float wind=sin(position.x*.31+position.z*.22+uLakesideWindTime*.28)*.026;
      wind+=sin(position.x*1.7-position.z*.91+uLakesideWindTime*.34)*.009;
      transformed.x+=wind*bend; transformed.z+=wind*.32*bend;
    `);
  };
  grassMat.customProgramCacheKey = () => 'nightfires-lakeside-grass-v1';
  add(new THREE.Mesh(grassGeometry, grassMat));

  // Birch trunks frame the open sky on the right. Branch fans are individually bent and sparse.
  const birchMaterial = material('bark', '#beb6a1');
  const leafMaterial = material('fabric', '#596347'); leafMaterial.side = THREE.DoubleSide;
  const leafGeometry = new THREE.SphereGeometry(1, 5, 3);
  const foliage = new THREE.InstancedMesh(leafGeometry, leafMaterial, 370);
  let leafIndex = 0;
  for (let tree = 0; tree < 3; tree++) {
    const x = 5.9 + tree * 2.1, z = -2.7 - tree * 3.2, h = 6.5 + rng() * 3;
    const trunkPoints = [V(x, -.1, z), V(x + .13, h * .4, z -.04), V(x + .43, h * .77, z -.21), V(x + .68, h, z -.4)];
    add(tube(trunkPoints, .074 + (2 - tree) * .014, birchMaterial, 20));
    for (let b = 0; b < 8; b++) {
      const by = h * (.48 + b * .061), angle = b * 2.36 + tree;
      const start = V(x + .3, by, z -.1), end = V(x + .3 + Math.cos(angle) * (1.35 + rng() * .7), by + .55 + rng() * .65, z + Math.sin(angle) * 1.3);
      add(tube([start, start.clone().lerp(end, .5).add(V(0, .2, 0)), end], .018 + (8 - b) * .0014, bark, 12));
      for (let l = 0; l < 15 && leafIndex < 370; l++) {
        const t = .3 + rng() * .7; const p = start.clone().lerp(end, t).add(V((rng() - .5) * .8, rng() * .6, (rng() - .5) * .7));
        dummy.position.copy(p); dummy.scale.set(.12 + rng() * .16, .026, .08 + rng() * .08); dummy.rotation.set(rng() * .8, rng() * 6, rng() * .8); dummy.updateMatrix(); foliage.setMatrixAt(leafIndex++, dummy.matrix);
      }
    }
  }
  foliage.count = leafIndex; add(foliage);

  let elapsed = 0;
  return {
    scene,
    view: aspect => {
      // A narrow screen receives a closer semicircle of equipment. The tent's
      // doorway and the complete mug/lantern remain readable instead of a blind crop.
      const portrait = aspect < .85;
      tent.position.x = portrait ? -1.98 : -3.06;
      tent.position.z = portrait ? -3.65 : -3.3;
      chair.position.x = portrait ? 1.66 : 2.16;
      chair.position.z = portrait ? -2.15 : -1.65;
      table.position.x = portrait ? .36 : .62;
      lamp.group.position.x = portrait ? .90 : 1.16;
      for (const steam of steamObjects) steam.position.x = steamOrigin.x + (portrait ? -.26 : 0);
      return portrait
        ? { position: [.16, 1.65, 5.2], target: [-.05, 1.0, -5.7], fov: 61 }
        : { position: [.12, 1.63, 4.23], target: [-.18, 1.10, -7.4], fov: 55 };
    },
    update: (time, dt) => {
      elapsed = time;
      waterUniforms.uTime.value = time;
      grassMotion.value = time;
      campfire.update(time, dt); lamp.update(time, dt);
      fireFill.intensity = 5.2 + Math.sin(time * 2.4) * .14 + Math.sin(time * 4.17) * .07;
      for (let strand = 0; strand < steamGeometries.length; strand++) {
        const pos = steamGeometries[strand].attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const row = Math.floor(i / 2), t = row / 18;
          pos.setXYZ(i, (i % 2 ? 1 : -1) * .011 * (1 + t * .7) + Math.sin(t * 7.2 - time * .35 + strand * 2) * .031 * t, t * .36, Math.cos(t * 5.1 - time * .24 + strand) * .019 * t);
        }
        pos.needsUpdate = true; steamMaterials[strand].opacity = .07 + Math.sin(time * .32 + strand) * .012;
      }
    },
    targets: [{ object: campfire.target, kind: 'log-embers' }, { object: lamp.target, kind: 'lantern-brightness' }],
    interact: (kind: NightInteractionKind) => {
      if (kind === 'lantern-brightness') return lamp.toggle();
      campfire.stoke(); waterUniforms.uWarmth.value = .64 + Math.sin(elapsed) * .02; return .45;
    },
  };
}
