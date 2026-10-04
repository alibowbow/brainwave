import * as THREE from 'three';

type ShelfMaterials = {
  oak: THREE.Material;
  darkWood: THREE.Material;
  ceramic: THREE.Material;
  brass: THREE.Material;
  foliage: THREE.Material;
};

/** Original, quiet service-wall details. Shared maps remain owned by makeCafeMaterials. */
export function buildCafeShelves(m: ShelfMaterials): {
  group: THREE.Group;
  materials: THREE.Material[];
  textures: THREE.Texture[];
} {
  const group = new THREE.Group();
  group.name = 'Asymmetrical cafe service shelves';
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  const material = (color: string, roughness = .86, metalness = 0) => {
    const result = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    materials.push(result);
    return result;
  };
  const glazed = (color: string) => {
    const result = m.ceramic.clone();
    if (result instanceof THREE.MeshStandardMaterial) {
      result.color.set(color);
      result.roughness = .56;
      if (result instanceof THREE.MeshPhysicalMaterial) {
        result.clearcoat = .30;
        result.clearcoatRoughness = .34;
      }
    }
    materials.push(result);
    return result;
  };
  const stone = glazed('#8d9781');
  const cream = glazed('#c6bda7');
  const umber = glazed('#806750');
  const ink = material('#374441');
  const paper = material('#b4a180', .98);
  const russet = material('#77604f', .96);
  const linen = material('#9d9785', 1);
  const cork = material('#826b4c', .98);
  const leafMaterial = m.foliage.clone();
  if (leafMaterial instanceof THREE.MeshStandardMaterial) leafMaterial.color.set('#3b5140');
  leafMaterial.side = THREE.DoubleSide;
  materials.push(leafMaterial);
  const strip = new THREE.MeshStandardMaterial({
    color: '#ba9670', emissive: '#e9b574', emissiveIntensity: .38, roughness: .75,
  });
  materials.push(strip);

  const mesh = (geometry: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = group) => {
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(x, y, z);
    object.castShadow = object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material, parent?: THREE.Object3D) =>
    mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent);
  const cylinder = (x: number, y: number, z: number, rt: number, rb: number, h: number, mat: THREE.Material, parent?: THREE.Object3D) =>
    mesh(new THREE.CylinderGeometry(rt, rb, h, 32), mat, x, y, z, parent);
  const lathe = (profile: number[][], mat: THREE.Material, x: number, y: number, z: number, parent?: THREE.Object3D) =>
    mesh(new THREE.LatheGeometry(profile.map(([r, h]) => new THREE.Vector2(r, h)), 40), mat, x, y, z, parent);

  // The lower shelf ends before the tall jar grouping: gaps reveal the wall.
  for (const [x, y, length] of [[4.25, 2.64, 5.2], [3.98, 1.96, 4.52]]) {
    box(x, y, -8.73, length, .066, .44, m.oak);
    const emitter = box(x, y - .038, -8.61, length - .24, .009, .015, strip);
    emitter.castShadow = false;
    for (const sign of [-1, 1]) {
      box(x + sign * (length / 2 - .42), y - .13, -8.88, .034, .23, .06, m.darkWood);
    }
  }

  // Pouring lips grow out of a real open lathe shell, not cylindrical proxies.
  const pitcher = (x: number, y: number, z: number, height: number, mat: THREE.Material, angle: number) => {
    const item = new THREE.Group();
    item.position.set(x, y, z);
    item.rotation.y = angle;
    item.scale.setScalar(height / .40);
    group.add(item);
    const shell = lathe([
      [0, .008], [.083, .008], [.101, .033], [.124, .135], [.118, .235],
      [.083, .33], [.083, .388], [.093, .398], [.084, .402], [.072, .385],
      [.074, .331], [.108, .235], [.110, .132], [.090, .035], [0, .035],
    ], mat, 0, 0, 0, item);
    const positions = shell.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const yPos = positions.getY(i);
      const xPos = positions.getX(i);
      const zPos = positions.getZ(i);
      const lip = Math.max(0, (yPos - .33) / .072);
      const direction = Math.pow(Math.max(0, -zPos / Math.hypot(xPos, zPos || .0001)), 8);
      positions.setXYZ(i, xPos, yPos + lip * direction * .019, zPos - lip * direction * .039);
    }
    shell.geometry.computeVertexNormals();
    const handle = new THREE.CatmullRomCurve3([
      new THREE.Vector3(.090, .312, 0), new THREE.Vector3(.170, .311, 0),
      new THREE.Vector3(.184, .237, 0), new THREE.Vector3(.162, .151, 0),
      new THREE.Vector3(.119, .132, 0),
    ]);
    mesh(new THREE.TubeGeometry(handle, 20, .015, 8, false), mat, 0, 0, 0, item);
  };
  pitcher(2.12, 2.681, -8.72, .39, stone, -.38);
  pitcher(2.47, 2.681, -8.69, .27, cream, .18);
  pitcher(4.43, 2.001, -8.72, .32, umber, -.6);

  const cups = (x: number, y: number, z: number, count: number, mat: THREE.Material) => {
    lathe([[0, 0], [.111, 0], [.139, .015], [.149, .026], [.139, .037], [.093, .025], [0, .025]], mat, x, y, z);
    for (let i = 0; i < count; i++) {
      const item = new THREE.Group();
      item.position.set(x + Math.sin(i * 2) * .009, y + .027 + i * .077, z + Math.cos(i * 2) * .006);
      item.rotation.y = -.20 + i * .27;
      group.add(item);
      lathe([[0, 0], [.054, 0], [.069, .012], [.087, .10], [.084, .116], [.075, .116], [.077, .098], [.057, .022], [0, .022]], mat, 0, 0, 0, item);
      mesh(new THREE.TorusGeometry(.033, .009, 8, 20, Math.PI * 1.65), mat, .088, .062, 0, item).rotation.z = -.825 * Math.PI;
    }
  };
  cups(2.27, 2.003, -8.62, 2, cream);
  cups(2.66, 2.003, -8.75, 3, stone);

  // No labels: folded kraft packets and their material colors supply detail.
  const coffeeBag = (x: number, y: number, z: number, height: number, mat: THREE.Material, angle: number) => {
    const item = new THREE.Group();
    item.position.set(x, y, z);
    item.rotation.y = angle;
    group.add(item);
    const bag = box(0, height / 2, 0, .21, height, .135, mat, item);
    const positions = bag.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      if (positions.getY(i) > 0) {
        positions.setX(i, positions.getX(i) * .84);
        positions.setZ(i, positions.getZ(i) * .29);
      }
    }
    bag.geometry.computeVertexNormals();
    box(0, height - .014, .003, .19, .032, .027, russet, item);
  };
  coffeeBag(3.76, 2.681, -8.77, .31, paper, -.13);
  coffeeBag(3.98, 2.681, -8.68, .255, ink, .09);

  // Small stacks are varied in thickness and partially hidden behind the jar.
  for (const [i, width, height, mat] of [
    [0, .46, .045, linen], [1, .40, .058, russet], [2, .43, .031, ink],
  ] as const) {
    const book = box(5.40 + i * .011, 2.68 + [.0225, .074, .119][i], -8.72, width, height, .28, mat);
    book.rotation.y = [.04, -.07, .03][i];
  }
  lathe([[0, 0], [.095, 0], [.114, .023], [.12, .13], [.116, .30], [.095, .323], [.095, .343], [.084, .343], [.085, .320], [.103, .298], [.105, .03], [0, .03]], umber, 5.60, 2.818, -8.66);
  cylinder(5.60, 3.175, -8.66, .09, .093, .026, cork);
  const recipe = new THREE.Group();
  recipe.position.set(5.62, 2.001, -8.78);
  recipe.rotation.x = -.095;
  recipe.rotation.y = -.08;
  group.add(recipe);
  box(0, .18, 0, .35, .36, .027, m.darkWood, recipe);
  box(0, .18, .018, .307, .317, .008, paper, recipe);
  // A ceramic still-life mark, deliberately unlettered and muted.
  const stillLife = mesh(new THREE.CircleGeometry(.066, 28), russet, -.035, .194, .024, recipe);
  stillLife.scale.y = 1.25;
  box(.061, .154, .025, .057, .10, .004, ink, recipe);

  // A single small trailing plant breaks the silhouette; instances keep its
  // individual curved leaves inexpensive and remain true geometry at every view.
  lathe([[0, 0], [.087, 0], [.123, .176], [.128, .195], [.118, .204], [.109, .182], [.075, .023], [0, .023]], cream, 6.33, 2.681, -8.70);
  cylinder(6.33, 2.877, -8.70, .108, .108, .009, ink);
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(6.33, 2.885, -8.69), new THREE.Vector3(6.39, 2.98, -8.49),
    new THREE.Vector3(6.43, 2.79, -8.42), new THREE.Vector3(6.41, 2.55, -8.43),
    new THREE.Vector3(6.49, 2.27, -8.47),
  ]);
  mesh(new THREE.TubeGeometry(path, 32, .005, 5, false), leafMaterial, 0, 0, 0);
  const leafGeometry = new THREE.PlaneGeometry(1, 1, 6, 10);
  const leafPositions = leafGeometry.attributes.position;
  for (let i = 0; i < leafPositions.count; i++) {
    const t = leafPositions.getY(i) + .5;
    const width = Math.pow(Math.sin(t * Math.PI), .72);
    const side = leafPositions.getX(i);
    leafPositions.setXYZ(i, side * width, t, .11 * Math.sin(t * Math.PI) - .065 * Math.abs(side) * 2);
  }
  leafGeometry.computeVertexNormals();
  const leaves = new THREE.InstancedMesh(leafGeometry, leafMaterial, 14);
  const transform = new THREE.Object3D();
  for (let i = 0; i < leaves.count; i++) {
    const t = .04 + i / leaves.count * .91;
    transform.position.copy(path.getPoint(t));
    transform.rotation.set(.22 + Math.sin(i * 1.9) * .30, (i % 2 ? -1 : 1) * .50, (i % 2 ? -1 : 1) * (1.10 + t * 1.2));
    transform.scale.set(.083 + (i % 3) * .015, .123 + (i % 4) * .016, .13);
    transform.updateMatrix();
    leaves.setMatrixAt(i, transform.matrix);
  }
  leaves.castShadow = leaves.receiveShadow = true;
  group.add(leaves);
  group.userData.provenance = 'Original procedural shelf geometry; no external assets.';
  return { group, materials, textures };
}
