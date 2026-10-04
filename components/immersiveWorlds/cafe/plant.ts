import * as THREE from 'three';

type PlantMaterials = {
  foliage: THREE.Material;
  ceramic: THREE.Material;
  darkWood: THREE.Material;
};

/** Sculpted leaves and a hollow stoneware planter, using only owned materials. */
export function createCafePlant(materials: PlantMaterials, scale = 1): THREE.Group {
  const plant = new THREE.Group();
  plant.name = 'Cafe lanceolate plant';
  plant.scale.setScalar(scale);
  let seed = 437921;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = plant) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const profile = [
    [0, 0.018], [0.126, 0.018], [0.138, 0.026], [0.144, 0.052],
    [0.163, 0.14], [0.183, 0.26], [0.193, 0.334], [0.196, 0.35],
    [0.193, 0.359], [0.181, 0.359], [0.178, 0.345], [0.166, 0.285],
    [0, 0.285],
  ].map(([radius, height]) => new THREE.Vector2(radius, height));
  const pot = addMesh(new THREE.LatheGeometry(profile, 64), materials.ceramic);
  pot.name = 'Hollow stoneware plant pot';
  const soil = addMesh(new THREE.CircleGeometry(0.173, 40), materials.darkWood);
  soil.rotation.x = -Math.PI / 2;
  soil.position.y = 0.327;
  soil.name = 'Recessed pot soil';

  for (let index = 0; index < 18; index++) {
    const tier = Math.floor(index / 6);
    const leaf = new THREE.Group();
    leaf.name = `Curved pointed leaf ${index + 1}`;
    leaf.rotation.y = index * 2.399963 + (random() - 0.5) * 0.31;
    plant.add(leaf);

    const startRadius = 0.065 + random() * 0.036;
    const startHeight = 0.61 + tier * 0.115 + random() * 0.045;
    const length = 0.42 - tier * 0.046 + random() * 0.072;
    const rise = 0.15 + tier * 0.04 + random() * 0.07;
    const droop = 0.15 - tier * 0.04 + random() * 0.04;
    const halfWidth = 0.082 + random() * 0.025 - tier * 0.009;
    const twist = (random() - 0.5) * 0.25;
    const curl = (random() - 0.5) * 0.035;
    const center = (t: number) => new THREE.Vector3(
      startRadius + length * t,
      startHeight + Math.sin(t * Math.PI * 0.88) * rise - droop * t * t,
      Math.sin(t * Math.PI) * curl,
    );

    // The stalk grows from beneath the soil surface and bends into the midrib.
    const stalk = new THREE.CatmullRomCurve3([
      new THREE.Vector3(startRadius * 0.25, 0.324, 0),
      new THREE.Vector3(startRadius * 0.4, 0.45 + tier * 0.045, 0.002),
      new THREE.Vector3(startRadius * 0.74, startHeight - 0.05, 0),
      center(0),
    ]);
    addMesh(new THREE.TubeGeometry(stalk, 10, 0.0042 - tier * 0.0004, 5, false), materials.foliage, leaf);

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const longitudinal = 16;
    const lateral = 6;
    for (let segment = 0; segment <= longitudinal; segment++) {
      const t = segment / longitudinal;
      const mid = center(t);
      // Asymmetric lanceolate silhouette with a long clean pointed tip.
      const silhouette = Math.pow(Math.sin(t * Math.PI), 0.83) * (1.13 - 0.48 * t);
      for (let strip = 0; strip <= lateral; strip++) {
        const across = strip / lateral * 2 - 1;
        const width = halfWidth * silhouette * across;
        const ripple = Math.sin(t * Math.PI * 7 + index) * 0.0018 * across * across * silhouette;
        const centerFold = (1 - Math.abs(across)) * 0.018 * Math.sin(t * Math.PI);
        const edgeRoll = -across * across * 0.017 * silhouette;
        const twistHeight = width * twist * (t - 0.2);
        positions.push(mid.x, mid.y + centerFold + edgeRoll + twistHeight + ripple, mid.z + width);
        uvs.push(t, strip / lateral);
        if (segment < longitudinal && strip < lateral) {
          const a = segment * (lateral + 1) + strip;
          const b = a + lateral + 1;
          indices.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    addMesh(geometry, materials.foliage, leaf);

    // A narrow raised midrib catches the cafe light along the central fold.
    const veinPoints = Array.from({ length: 13 }, (_, step) => {
      const t = step / 12 * 0.96;
      const point = center(t);
      point.y += Math.sin(t * Math.PI) * 0.018 + 0.0005;
      return point;
    });
    addMesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(veinPoints), 16, 0.0014, 4, false),
      materials.foliage,
      leaf,
    );
  }
  return plant;
}
