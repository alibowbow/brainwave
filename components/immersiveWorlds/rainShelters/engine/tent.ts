import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { WorldBuilder } from './types';
import { material, rng, addRain } from './materials';

/** Original procedural shelter: view from a quilt into a wet, layered cedar wood. */
export const buildTent: WorldBuilder = ({ scene, camera }) => {
  const random = rng(190719);
  scene.background = new THREE.Color('#586d69');
  scene.fog = new THREE.FogExp2('#677e78', 0.052);
  scene.add(new THREE.HemisphereLight('#b7d3d3', '#343b2b', 1.15));
  const sky = new THREE.DirectionalLight('#c5e0df', 1.8);
  sky.position.set(-6, 12, -10); scene.add(sky);
  const bounce = new THREE.PointLight('#efd9b3', 1.4, 7, 2);
  bounce.position.set(0, 1.3, 2); scene.add(bounce);

  const canvasTexture = (paint: (c: CanvasRenderingContext2D) => void, size = 512) => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
    const context = canvas.getContext('2d')!; paint(context);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  };
  const fabricMap = canvasTexture(c => {
    c.fillStyle = '#bbb59f'; c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 512; i += 2) {
      c.strokeStyle = i % 4 ? 'rgba(55,43,28,.08)' : 'rgba(247,228,177,.13)';
      c.beginPath(); c.moveTo(i, 0); c.lineTo(i, 512); c.stroke();
      c.beginPath(); c.moveTo(0, i); c.lineTo(512, i); c.stroke();
    }
    for (let i = 0; i < 5500; i++) {
      c.fillStyle = `rgba(32,29,21,${random() * .06})`;
      c.fillRect(random() * 512, random() * 512, 1, 1);
    }
    for (let k = 0; k < 7; k++) {
      const x = random() * 512;
      const gradient = c.createLinearGradient(x - 12, 0, x + 12, 0);
      gradient.addColorStop(0, 'rgba(50,41,28,0)');
      gradient.addColorStop(.5, 'rgba(50,41,28,.055)');
      gradient.addColorStop(1, 'rgba(240,226,179,0)');
      c.fillStyle = gradient; c.fillRect(x - 12, 0, 24, 512);
    }
  });
  fabricMap.repeat.set(6, 12);
  const canvas = new THREE.MeshStandardMaterial({
    map: fabricMap, color: '#d5d2b7', roughness: .94, side: THREE.DoubleSide,
    bumpMap: fabricMap, bumpScale: .006,
  });
  const seamMaterial = material('fabric', '#796444', .97);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: '#3e4947', metalness: .7, roughness: .38 });
  const cordMaterial = new THREE.MeshStandardMaterial({ color: '#d3bd8c', roughness: .94 });
  const mesh = (geometry: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, parent: THREE.Object3D = scene) => {
    const object = new THREE.Mesh(geometry, mat); object.position.set(x, y, z); parent.add(object); return object;
  };
  const tube = (points: THREE.Vector3[], radius: number, mat: THREE.Material, parent: THREE.Object3D = scene, segments = 32) =>
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 6, false), mat, 0, 0, 0, parent);

  // The tent is a folded fabric vault, open at the front, with individual tension ribs.
  const canopyGeometry = new THREE.BufferGeometry();
  const positions: number[] = [], uv: number[] = [], indices: number[] = [];
  const na = 72, nz = 44;
  const canopyPoint = (u: number, v: number) => {
    const a = u * Math.PI;
    const z = -1.72 + v * 6.1;
    const bulge = .052 * Math.sin(v * Math.PI) * Math.sin(a * 19 + v * 7)
      + .025 * Math.sin(a * 31 + v * 17) * Math.sin(a);
    return new THREE.Vector3(Math.cos(a) * (2.08 + bulge), .025 + Math.sin(a) * (2.12 + bulge), z);
  };
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= na; i++) {
    const p = canopyPoint(i / na, j / nz); positions.push(p.x, p.y, p.z); uv.push(i / na, j / nz);
  }
  for (let j = 0; j < nz; j++) for (let i = 0; i < na; i++) {
    const a = j * (na + 1) + i, b = a + na + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  canopyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  canopyGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  canopyGeometry.setIndex(indices); canopyGeometry.computeVertexNormals(); mesh(canopyGeometry, canvas);
  for (const v of [0, .43, .88]) {
    const points = Array.from({ length: 45 }, (_, i) => canopyPoint(i / 44, v));
    tube(points, .027, poleMaterial);
    // A sewn sleeve alongside the inner pole gives the canopy readable construction.
    tube(points.map(p => p.clone().add(new THREE.Vector3(0, -.024, .034))), .017, seamMaterial);
  }
  for (const u of [.16, .36, .65, .84]) {
    tube(Array.from({ length: 26 }, (_, i) => canopyPoint(u, i / 25).multiply(new THREE.Vector3(.993, .994, 1))), .008, seamMaterial);
  }
  const groundsheet = mesh(new THREE.PlaneGeometry(4.17, 6.35, 10, 18), material('fabric', '#514c38', .99), 0, .018, 1.27);
  groundsheet.rotation.x = -Math.PI / 2;
  // Visible welded floor seams and a raised perimeter prevent the flat-box interior look.
  for (const x of [-1.85, 1.85]) tube([
    new THREE.Vector3(x, .055, -1.65), new THREE.Vector3(x, .055, 1), new THREE.Vector3(x, .07, 4.15),
  ], .019, seamMaterial);

  const entrance = new THREE.Group(); scene.add(entrance);
  const flaps: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const g = new THREE.BufferGeometry(); const pp: number[] = [], uu: number[] = [], ii: number[] = [];
    const rows = 36, cols = 20;
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
      const v = j / rows, u = i / cols;
      const y = .035 + v * 2.085;
      const outer = 2.09 * Math.sqrt(Math.max(0, 1 - v * v));
      const inner = .96 * Math.pow(1 - v, .58) + .02;
      const x = side * THREE.MathUtils.lerp(inner, Math.max(inner, outer), u);
      const fold = .085 * Math.sin(u * 8 * Math.PI + v * 5) * Math.sin(Math.PI * u);
      pp.push(x, y, -1.65 + fold + .05 * Math.sin(v * 13)); uu.push(u, v);
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const a = j * (cols + 1) + i, b = a + cols + 1;
      ii.push(a, b, a + 1, b, b + 1, a + 1);
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uu, 2)); g.setIndex(ii); g.computeVertexNormals();
    const flap = mesh(g, canvas, 0, 0, 0, entrance); flaps.push(flap);
    const edge = Array.from({ length: 40 }, (_, j) => {
      const v = j / 39;
      return new THREE.Vector3(side * (.96 * Math.pow(1 - v, .58) + .02), .035 + v * 2.085, -1.585 + .05 * Math.sin(v * 13));
    });
    const zipper = tube(edge, .014, seamMaterial, flap);
    const stitches = new THREE.BufferGeometry(); const ss: number[] = [];
    for (let i = 1; i < edge.length - 1; i++) {
      const p = edge[i]; ss.push(p.x - .01, p.y, p.z + .02, p.x + .01, p.y + .007, p.z + .02);
    }
    stitches.setAttribute('position', new THREE.Float32BufferAttribute(ss, 3));
    zipper.add(new THREE.LineSegments(stitches, new THREE.LineBasicMaterial({ color: '#dbc697', transparent: true, opacity: .8 })));
    const tie = mesh(new THREE.TorusGeometry(.045, .011, 6, 18), cordMaterial, side * 1.09, .65, -1.48, flap);
    tie.rotation.y = .3;
  }
  // Far-front rain fly and taut guy ropes are visible around the entrance at wider angles.
  for (const s of [-1, 1]) {
    tube([new THREE.Vector3(s * 1.95, .25, -1.72), new THREE.Vector3(s * 2.85, .04, -3.7)], .01, cordMaterial);
    mesh(new THREE.CylinderGeometry(.017, .022, .24, 5), poleMaterial, s * 2.85, .03, -3.7).rotation.z = s * .25;
  }
  const openingShape = new THREE.Shape();
  openingShape.moveTo(-1.22, .03); openingShape.lineTo(1.22, .03);
  openingShape.quadraticCurveTo(.77, 1.32, 0, 2.1);
  openingShape.quadraticCurveTo(-.77, 1.32, -1.22, .03);
  const openingHit = mesh(new THREE.ShapeGeometry(openingShape), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide }), 0, 0, -1.57);
  openingHit.name = 'tent-entrance-interaction';

  // A soft down quilt fills the near view with a broad, curved surface and stitched baffles.
  const quiltMaterial = material('fabric', '#294c50', .94);
  quiltMaterial.map?.repeat.set(2, 2); quiltMaterial.bumpMap?.repeat.set(2, 2); quiltMaterial.bumpScale = .004;
  const quiltGeo = new THREE.BufferGeometry(); const qp: number[] = [], qu: number[] = [], qi: number[] = [];
  const qx = 52, qz = 100;
  const quiltPoint = (u: number, v: number, seam = false) => {
    const z = -.78 + v * 4;
    const width = .54 + .28 * Math.sin(v * Math.PI * .69);
    const xx = (u * 2 - 1) * width;
    const puff = Math.pow(Math.max(0, 1 - Math.pow(u * 2 - 1, 2)), .65);
    const baffle = seam ? -.004 : .044 * Math.pow(Math.sin(v * Math.PI * 13), 2);
    const fold = .013 * Math.sin(u * 31 + v * 17) * (1 - puff);
    return new THREE.Vector3(xx - .03, .04 + puff * (.245 + .08 * v + baffle) + fold, z);
  };
  for (let j = 0; j <= qz; j++) for (let i = 0; i <= qx; i++) {
    const p = quiltPoint(i / qx, j / qz); qp.push(p.x, p.y, p.z); qu.push(i / qx * 2, j / qz * 5);
  }
  for (let j = 0; j < qz; j++) for (let i = 0; i < qx; i++) {
    const a = j * (qx + 1) + i, b = a + qx + 1; qi.push(a, b, a + 1, b, b + 1, a + 1);
  }
  quiltGeo.setAttribute('position', new THREE.Float32BufferAttribute(qp, 3));
  quiltGeo.setAttribute('uv', new THREE.Float32BufferAttribute(qu, 2)); quiltGeo.setIndex(qi); quiltGeo.computeVertexNormals();
  mesh(quiltGeo, quiltMaterial);
  const quiltThread = new THREE.MeshStandardMaterial({ color: '#819590', roughness: 1 });
  for (let row = 1; row < 13; row++) {
    tube(Array.from({ length: 40 }, (_, i) => quiltPoint(i / 39, row / 13, true).add(new THREE.Vector3(0, .004, 0))), .0035, quiltThread, scene, 39);
  }
  tube(Array.from({ length: 40 }, (_, i) => quiltPoint(.975, i / 39).add(new THREE.Vector3(.007, .008, 0))), .012, seamMaterial);
  // An asymmetrically folded blanket edge lays across the sleeping bag, close enough to read weave.
  const blanket = mesh(new THREE.PlaneGeometry(.85, .62, 30, 20), material('fabric', '#998363', 1), -.49, .20, 1.63);
  const bp = blanket.geometry.attributes.position;
  for (let i = 0; i < bp.count; i++) bp.setZ(i, .025 * Math.sin(bp.getX(i) * 35) + .02 * Math.cos(bp.getY(i) * 14));
  blanket.geometry.computeVertexNormals(); blanket.rotation.set(-Math.PI / 2, .05, -.26);

  // Lantern: metal, glass, warm emitter, handle and cage are separate spatial surfaces.
  const lantern = new THREE.Group(); lantern.position.set(-.88, .027, .40); scene.add(lantern);
  const brass = new THREE.MeshStandardMaterial({ color: '#554b32', metalness: .78, roughness: .32 });
  const warm = new THREE.MeshStandardMaterial({ color: '#ffd48a', emissive: '#ffbd64', emissiveIntensity: 1.9, roughness: .5 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#faecd1', transparent: true, opacity: .15, roughness: .12, metalness: .08, side: THREE.DoubleSide, depthWrite: false });
  mesh(new THREE.CylinderGeometry(.12, .155, .075, 24), brass, 0, .055, 0, lantern);
  mesh(new THREE.CylinderGeometry(.104, .11, .245, 24, 1, true), glass, 0, .215, 0, lantern);
  mesh(new THREE.CylinderGeometry(.047, .06, .175, 20), warm, 0, .19, 0, lantern);
  mesh(new THREE.CylinderGeometry(.15, .13, .035, 24), brass, 0, .352, 0, lantern);
  mesh(new THREE.ConeGeometry(.12, .075, 24), brass, 0, .4, 0, lantern);
  mesh(new THREE.CylinderGeometry(.038, .038, .028, 16), brass, 0, .446, 0, lantern);
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    tube([new THREE.Vector3(Math.cos(a) * .125, .075, Math.sin(a) * .125), new THREE.Vector3(Math.cos(a) * .132, .22, Math.sin(a) * .132), new THREE.Vector3(Math.cos(a) * .121, .355, Math.sin(a) * .121)], .009, brass, lantern, 12);
  }
  tube(Array.from({ length: 22 }, (_, i) => {
    const a = i / 21 * Math.PI; return new THREE.Vector3(Math.cos(a) * .13, .385 + Math.sin(a) * .16, 0);
  }), .009, brass, lantern, 22);
  const lanternLight = new THREE.PointLight('#ffce86', 5.2, 4.8, 2); lanternLight.position.set(-.88, .26, .40); scene.add(lanternLight);
  // Local pooled warm light is restrained, with a soft grounding shadow beneath the lantern.
  const shadowMap = canvasTexture(c => {
    const g = c.createRadialGradient(256, 256, 15, 256, 256, 250);
    g.addColorStop(0, 'rgba(0,0,0,.65)'); g.addColorStop(.48, 'rgba(0,0,0,.2)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.fillRect(0, 0, 512, 512);
  });
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false });
  const lanternShadow = mesh(new THREE.PlaneGeometry(.8, .75), shadowMat, -.88, .031, .40); lanternShadow.rotation.x = -Math.PI / 2;

  // Wet forest floor: irregular terrain and dark shallow pools beyond the fly.
  const forestFloor = new THREE.PlaneGeometry(46, 48, 68, 68);
  const fp = forestFloor.attributes.position;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i), y = fp.getY(i);
    fp.setZ(i, .09 * Math.sin(x * .47) * Math.cos(y * .39) + .025 * Math.sin(x * 2.4 + y));
  }
  forestFloor.computeVertexNormals();
  const floor = mesh(forestFloor, material('earth', '#353c2b', .91), 0, -.115, -19); floor.rotation.x = -Math.PI / 2;
  const puddleMaterial = new THREE.MeshStandardMaterial({ color: '#638379', roughness: .2, metalness: .33, transparent: true, opacity: .64 });
  for (let i = 0; i < 9; i++) {
    const shape = new THREE.Shape(); const rx = .32 + random() * .9, rz = .25 + random() * .8;
    for (let k = 0; k <= 30; k++) {
      const a = k / 30 * Math.PI * 2, r = 1 + .13 * Math.sin(a * 3) + .1 * Math.cos(a * 5);
      const x = Math.cos(a) * rx * r, y = Math.sin(a) * rz * r; if (!k) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    const pool = mesh(new THREE.ShapeGeometry(shape), puddleMaterial, (random() - .5) * 8, -.007, -3.1 - random() * 9); pool.rotation.x = -Math.PI / 2;
  }

  const bark = material('wood', '#343d31', .99);
  const barkLight = material('wood', '#485244', .96);
  const trees = new THREE.Group(); scene.add(trees);
  // Trunks and branch roots taper and bend; foliage is built from flattened branch sprays, never spheres.
  const leafMat = material('leaf', '#385644', .94); leafMat.side = THREE.DoubleSide;
  const leafGeo = new THREE.BufferGeometry(); const lp: number[] = [], lu: number[] = [], li: number[] = [];
  for (let j = 0; j <= 8; j++) for (let k = 0; k < 3; k++) {
    const t = j / 8, side = k - 1;
    lp.push(side * Math.sin(t * Math.PI) * .23, t - .5, Math.sin(t * Math.PI) * (.06 - Math.abs(side) * .04)); lu.push(k / 2, t);
  }
  for (let j = 0; j < 8; j++) for (let k = 0; k < 2; k++) {
    const a = j * 3 + k; li.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
  }
  leafGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3)); leafGeo.setAttribute('uv', new THREE.Float32BufferAttribute(lu, 2)); leafGeo.setIndex(li); leafGeo.computeVertexNormals();
  const foliage = new THREE.InstancedMesh(leafGeo, leafMat, 8000); foliage.instanceMatrix.setUsage(THREE.StaticDrawUsage); trees.add(foliage);
  const transform = new THREE.Object3D(); let leafCount = 0;
  const addLeaf = (x: number, y: number, z: number, sx: number, sy: number, angle: number) => {
    if (leafCount >= 8000) return;
    transform.position.set(x, y, z); transform.rotation.set(.8 + random() * 1.1, random() * Math.PI * 2, angle);
    transform.scale.set(sx, sy, 1); transform.updateMatrix(); foliage.setMatrixAt(leafCount++, transform.matrix);
  };
  for (let i = 0; i < 38; i++) {
    let x = (random() - .5) * 34, z = -4.3 - random() * 29;
    if (i < 5) { x = [-3.1, 3.7, -1.7, 1.4, -.45][i]; z = [-5.5, -7.2, -10, -12, -20][i]; }
    const h = 7 + random() * 9, r = .13 + random() * .26;
    const trunk = mesh(new THREE.CylinderGeometry(r * .38, r, h, 13, 12), i % 3 ? bark : barkLight, x, h / 2 - .1, z, trees);
    const tp = trunk.geometry.attributes.position;
    for (let k = 0; k < tp.count; k++) {
      const yy = tp.getY(k), a = Math.atan2(tp.getZ(k), tp.getX(k));
      const ridge = 1 + .08 * Math.sin(a * 5 + Math.sin(yy * .8));
      tp.setX(k, tp.getX(k) * ridge + .055 * Math.sin(yy * 1.2 + i)); tp.setZ(k, tp.getZ(k) * ridge);
    }
    trunk.geometry.computeVertexNormals(); trunk.rotation.z = (random() - .5) * .09;
    for (let k = 0; k < 4; k++) {
      const a = random() * Math.PI * 2;
      tube([new THREE.Vector3(x, .23, z), new THREE.Vector3(x + Math.cos(a) * r * 1.7, .025, z + Math.sin(a) * r * 1.7), new THREE.Vector3(x + Math.cos(a) * r * 3, -.04, z + Math.sin(a) * r * 3)], r * .18, bark, trees, 10);
    }
    for (let b = 0; b < 5; b++) {
      const a = random() * Math.PI * 2, yy = 3.6 + b * h * .105, len = 1.3 + random() * 1.6;
      const end = new THREE.Vector3(x + Math.cos(a) * len, yy + .38, z + Math.sin(a) * len);
      tube([new THREE.Vector3(x, yy, z), new THREE.Vector3((x + end.x) / 2, yy + .1, (z + end.z) / 2), end], r * .17, bark, trees, 10);
      for (let l = 0; l < 25; l++) {
        const f = .12 + random() * .93;
        addLeaf(THREE.MathUtils.lerp(x, end.x, f) + (random() - .5) * .8, yy + .4 * f + (random() - .5) * .45, THREE.MathUtils.lerp(z, end.z, f) + (random() - .5) * .8, .3 + random() * .38, .34 + random() * .45, a);
      }
    }
  }
  // All static woody pieces share two draw calls; their uneven silhouettes remain full geometry.
  trees.updateMatrixWorld(true);
  for (const mat of [bark, barkLight]) {
    const parts = trees.children.filter((object): object is THREE.Mesh => object instanceof THREE.Mesh && !(object instanceof THREE.InstancedMesh) && object.material === mat);
    const geometries = parts.map(object => object.geometry.clone().applyMatrix4(object.matrix));
    const combined = mergeGeometries(geometries, false);
    if (combined) mesh(combined, mat, 0, 0, 0, trees);
    for (const part of parts) { trees.remove(part); part.geometry.dispose(); }
    for (const geometry of geometries) geometry.dispose();
  }
  // Fern rosettes sit at human scale on both sides of the muddy opening.
  const fernStems: number[] = [];
  for (let f = 0; f < 28; f++) {
    const x = (random() - .5) * 13, z = -2.8 - random() * 12;
    if (Math.abs(x) < .55 && z > -5) continue;
    for (let k = 0; k < 7; k++) {
      const a = k / 7 * Math.PI * 2 + random() * .25, len = .6 + random() * .65;
      const point = (v: number) => new THREE.Vector3(x + Math.cos(a) * len * v, .025 + Math.sin(v * Math.PI * .85) * len * .68, z + Math.sin(a) * len * v);
      for (let j = 1; j < 10; j++) {
        const p = point(j / 10), q = point((j - 1) / 10); fernStems.push(p.x, p.y, p.z, q.x, q.y, q.z);
        for (const s of [-1, 1]) {
          const size = .15 * Math.sin(j / 10 * Math.PI) + .045;
          if (leafCount < 8000) {
            const direction = new THREE.Vector3(Math.cos(a + s * 1.25), .25, Math.sin(a + s * 1.25)).normalize();
            transform.position.set(p.x + direction.x * size * .5, p.y, p.z + direction.z * size * .5);
            transform.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
            transform.scale.set(size * .85, size * 1.6, 1); transform.updateMatrix(); foliage.setMatrixAt(leafCount++, transform.matrix);
          }
        }
      }
    }
  }
  foliage.count = leafCount; foliage.instanceMatrix.needsUpdate = true;
  const fernLines = new THREE.BufferGeometry(); fernLines.setAttribute('position', new THREE.Float32BufferAttribute(fernStems, 3));
  trees.add(new THREE.LineSegments(fernLines, new THREE.LineBasicMaterial({ color: '#526b40' })));

  const rockMat = material('stone', '#454d42', .83);
  const rockInst = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), rockMat, 60); scene.add(rockInst);
  for (let i = 0; i < 60; i++) {
    transform.position.set((random() - .5) * 18, -.08, -2.4 - random() * 18);
    transform.rotation.set(random(), random() * 6.2, random());
    const scale = .06 + random() * .22; transform.scale.set(scale * 1.6, scale * .55, scale); transform.updateMatrix(); rockInst.setMatrixAt(i, transform.matrix);
  }
  const fallenLog = mesh(new THREE.CylinderGeometry(.18, .22, 3.8, 10), bark, -2.3, .18, -5.5); fallenLog.rotation.set(0, -.32, Math.PI / 2);
  const cutMap = canvasTexture(c => {
    c.fillStyle = '#948063'; c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 32; i++) {
      c.beginPath(); c.ellipse(249, 265, 6 + i * 8.3, 5 + i * 7.7, .12, 0, Math.PI * 2);
      c.strokeStyle = `rgba(53,42,29,${.1 + random() * .2})`; c.lineWidth = 1 + random() * 2.5; c.stroke();
    }
    c.strokeStyle = '#443f30'; c.lineWidth = 3;
    for (let i = 0; i < 5; i++) { const a = random() * 6.28; c.beginPath(); c.moveTo(256 + Math.cos(a) * 245, 256 + Math.sin(a) * 245); c.lineTo(256 + Math.cos(a + .1) * 100, 256 + Math.sin(a + .1) * 100); c.stroke(); }
  });
  const cutFace = mesh(new THREE.CircleGeometry(.216, 20), new THREE.MeshStandardMaterial({ map: cutMap, color: '#aaa18b', roughness: .92 }), 0, -1.905, 0, fallenLog); cutFace.rotation.x = Math.PI / 2;

  const rain = addRain(scene, { count: 1400, width: 29, height: 17, depth: 27, z: -16, speed: 8.5, color: '#d0e1de', opacity: .29 });
  // Tiny beaded water follows the exposed front pole, distinct from rain behind the tent.
  const beadMat = new THREE.MeshPhysicalMaterial({ color: '#c1ded4', metalness: .05, roughness: .06, transparent: true, opacity: .63 });
  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 6, 5), beadMat, 47); scene.add(beads);
  for (let i = 0; i < 47; i++) {
    const a = .09 + i / 46 * (Math.PI - .18), r = .01 + random() * .012;
    transform.position.set(Math.cos(a) * 2.09, Math.sin(a) * 2.12, -1.75); transform.rotation.set(0, 0, 0); transform.scale.set(r, r * 1.4, r); transform.updateMatrix(); beads.setMatrixAt(i, transform.matrix);
  }
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const s = sideIndex ? 1 : -1;
    const edgeBeads = new THREE.InstancedMesh(beads.geometry, beadMat, 24); flaps[sideIndex].add(edgeBeads);
    for (let i = 0; i < 24; i++) {
      const v = .08 + random() * .86, r = .007 + random() * .006;
      transform.position.set(s * (.96 * Math.pow(1 - v, .58) + .03 + random() * .05), .035 + v * 2.085, -1.54 + .05 * Math.sin(v * 13));
      transform.rotation.set(0, 0, 0); transform.scale.set(r, r * 1.7, r * .65); transform.updateMatrix(); edgeBeads.setMatrixAt(i, transform.matrix);
    }
  }

  let opening = .68, targetOpening = .68;
  const raycaster = new THREE.Raycaster();
  return {
    update(time, dt) {
      opening = THREE.MathUtils.damp(opening, targetOpening, 2.1, dt);
      const spread = .8 + opening * .38;
      flaps[0].scale.x = spread; flaps[1].scale.x = spread;
      flaps[0].position.x = -.10 * opening; flaps[1].position.x = .10 * opening;
      lanternLight.intensity = 5.2 + Math.sin(time * .71) * .055;
      rain.update(time);
    },
    resize(aspect) {
      const portrait = aspect < .82;
      lantern.position.set(portrait ? -.62 : -.88, .027, portrait ? -.52 : .40);
      lanternLight.position.set(lantern.position.x, .26, lantern.position.z);
      lanternShadow.position.set(lantern.position.x, .031, lantern.position.z);
      camera.fov = portrait ? 69 : 62;
      camera.position.set(portrait ? 0 : .10, portrait ? .75 : .78, portrait ? 1.77 : 2.05);
      camera.lookAt(portrait ? 0 : .02, portrait ? .84 : .83, -6);
      camera.updateProjectionMatrix();
    },
    interact(x, y, explicit = false, immediate = false) {
      if (!explicit) {
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const hit = raycaster.intersectObjects([...flaps, openingHit], false)[0];
        if (!hit) return null;
      }
      targetOpening = targetOpening > .5 ? .2 : .95;
      if (immediate) opening = targetOpening;
      return { action: 'opening', value: targetOpening };
    },
  };
};
