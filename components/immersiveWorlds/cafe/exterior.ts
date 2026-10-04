import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

type ExteriorSurfaces = {
  pavement: THREE.Material;
  darkWood: THREE.Material;
  brass: THREE.Material;
};

/** Original quiet street. All textures are generated here; no image/network assets. */
export function buildCafeExterior(surfaces: ExteriorSurfaces): {
  group: THREE.Group;
  materials: THREE.Material[];
  textures: THREE.Texture[];
} {
  const group = new THREE.Group();
  group.name = 'Cafe rain-wet evening street';
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  let state = 914035;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const material = (color: string, roughness = .85, emissive?: string, intensity = 0) => {
    const result = new THREE.MeshStandardMaterial({ color, roughness, emissive: emissive ?? '#000000', emissiveIntensity: intensity });
    materials.push(result);
    return result;
  };
  const canvasTexture = (width: number, height: number, paint: (ctx: CanvasRenderingContext2D) => void) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cafe exterior surface canvas unavailable');
    paint(ctx);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    textures.push(result);
    return result;
  };

  // Soft mineral variation adds age without a conspicuous repeating brick grid.
  const masonry = canvasTexture(256, 512, ctx => {
    ctx.fillStyle = '#b6b9b8';
    ctx.fillRect(0, 0, 256, 512);
    for (let i = 0; i < 95; i++) {
      const x = random() * 256, y = random() * 512;
      const radius = 8 + random() * 100;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, random() > .45 ? '#77868b13' : '#e1d5bf12');
      gradient.addColorStop(1, '#00000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    for (let i = 0; i < 9000; i++) {
      ctx.fillStyle = random() > .5 ? '#f0eee80b' : '#2033420a';
      ctx.fillRect(random() * 256, random() * 512, 1, 1);
    }
  });
  masonry.wrapS = masonry.wrapT = THREE.RepeatWrapping;
  masonry.anisotropy = 4;
  const facades = ['#354650', '#4b5052', '#465860', '#3e4d57', '#5b5954', '#354955'].map(color => {
    const result = material(color);
    result.map = masonry;
    return result;
  });
  const stone = material('#576065', .78);
  const curb = material('#6f7778', .7);
  const joint = material('#25333b', .96);
  const frame = material('#303d43', .6);
  const trim = material('#647071', .8);
  const roof = material('#26353e', .84);
  const coolGlass = material('#283d49', .29, '#597b89', .075);
  const darkGlass = material('#192b36', .24);
  const warmGlass = [
    material('#736a55', .39, '#d4b482', .34),
    material('#9b8662', .42, '#efd2a0', .65),
    material('#71674f', .36, '#bd9f71', .20),
    material('#a58a61', .42, '#f0c688', .90),
  ];
  const curtains = [material('#978e7d', .94), material('#776f60', .96), material('#617076', .98)];
  const awnings = [material('#46544f'), material('#555054'), material('#544d42')];
  const bulb = material('#f1d3a3', .3, '#ffd9a0', 2.4);

  // One draw per material for opaque architecture. Source geometries are released
  // after merging; the owner disposes the returned group's merged geometries.
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const add = (geometry: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) => {
    const transform = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );
    geometry.applyMatrix4(transform);
    const list = batches.get(mat) ?? [];
    list.push(geometry);
    batches.set(mat, list);
  };
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material) =>
    add(new THREE.BoxGeometry(w, h, d), mat, x, y, z);
  const cylinder = (x: number, y: number, z: number, top: number, bottom: number, height: number, mat: THREE.Material) =>
    add(new THREE.CylinderGeometry(top, bottom, height, 14), mat, x, y, z);

  // The foreground paving ends at the cafe wall; the street widens beyond it.
  box(-7, -.064, -15, 32, .08, 23, surfaces.pavement);
  box(-10.9, -.064, -2.65, 23.0, .08, 2.20, surfaces.pavement);
  box(-10.9, .026, -2.55, 23.0, .10, 1.85, stone);
  box(-10.9, .064, -3.51, 23.0, .17, .14, curb);
  box(-7, .025, -15.8, 32, .12, 1.38, stone);
  box(-7, .08, -15.07, 32, .19, .13, curb);
  // Directional joints and a gutter establish perspective before the buildings.
  for (let x = -22; x < .6; x += 1.32) box(x, .078, -2.55, .014, .004, 1.78, joint);
  for (let x = -22; x < 9; x += 1.57) box(x, .087, -15.8, .013, .004, 1.31, joint);
  box(-10.9, .078, -2.6, 23, .004, .012, joint);
  box(-7, -.017, -4.12, 32, .012, .035, joint);
  for (let i = 0; i < 4; i++) {
    const x = -10.5 + i * 4.6;
    box(x, -.012, -4.24, .57, .024, .34, frame);
    for (let j = 0; j < 6; j++) box(x - .23 + j * .09, .002, -4.24, .014, .013, .31, curb);
  }

  const haloTexture = canvasTexture(128, 128, ctx => {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, '#ffffff88');
    gradient.addColorStop(.065, '#fffffff0');
    gradient.addColorStop(.19, '#ffffff28');
    gradient.addColorStop(.55, '#ffffff06');
    gradient.addColorStop(1, '#ffffff00');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: '#ffe0b5', map: haloTexture, transparent: true, opacity: .25,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  materials.push(glowMaterial);
  const halo = (x: number, y: number, z: number, size: number) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), glowMaterial);
    mesh.position.set(x, y, z);
    mesh.name = 'Soft atmospheric lamp halo';
    group.add(mesh);
  };

  // Reflected light has irregular lateral ripples and a soft longitudinal falloff.
  // It lies on the wet paving, rather than as floating horizontal light bars.
  const reflectionTexture = canvasTexture(256, 1024, ctx => {
    const image = ctx.createImageData(256, 1024);
    let band = .5;
    for (let y = 0; y < 1024; y++) {
      if (y % (4 + Math.floor(random() * 9)) === 0) band = random();
      const t = y / 1023;
      const taper = Math.sin(Math.PI * t) ** .55;
      const center = .5 + .085 * Math.sin(t * 31) + .034 * Math.sin(t * 103);
      const width = .05 + .22 * t;
      for (let x = 0; x < 256; x++) {
        const across = (x / 255 - center) / width;
        const alpha = Math.exp(-across * across * 3.4) * taper * (.13 + band * .64) * (1 - t * .60);
        const offset = (y * 256 + x) * 4;
        image.data[offset] = image.data[offset + 1] = image.data[offset + 2] = 255;
        image.data[offset + 3] = Math.round(alpha * 255);
      }
    }
    ctx.putImageData(image, 0, 0);
  });
  const reflected = ['#eac58d', '#b2c5ca', '#c6b391'].map(color => {
    const mat = new THREE.MeshBasicMaterial({
      map: reflectionTexture, color, transparent: true, opacity: .68,
      depthWrite: false, blending: THREE.AdditiveBlending,
    });
    materials.push(mat);
    return mat;
  });
  const reflection = (x: number, z: number, width: number, length: number, tint = 0, strength = 1) => {
    const geometry = new THREE.PlaneGeometry(width, length);
    // Independent UV offsets avoid repeating exactly the same ripple silhouette.
    const uv = geometry.getAttribute('uv');
    const position = geometry.getAttribute('position');
    // The near end of each reflected strip converges toward the window seat.
    for (let i = 0; i < position.count; i++) position.setX(i, position.getX(i) + (1 - uv.getY(i)) * (-.5 - x) * .45);
    if (random() > .5) for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
    const mesh = new THREE.Mesh(geometry, reflected[tint]);
    mesh.position.set(x, -.018 + strength * .001, z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = (random() - .5) * .025;
    mesh.name = 'Broken wet-street light reflection';
    group.add(mesh);
  };

  // Each address has a separate silhouette, bay rhythm, depth and occupancy.
  const buildings = [
    { x: -16.3, z: -19.2, w: 4.5, h: 9.7, rows: 4, bays: 3, style: 0 },
    { x: -11.8, z: -17.6, w: 4.2, h: 7.1, rows: 3, bays: 2, style: 1 },
    { x: -7.5, z: -18.4, w: 4.3, h: 9.1, rows: 4, bays: 2, style: 2 },
    { x: -3.1, z: -16.95, w: 4.35, h: 6.55, rows: 2, bays: 3, style: 3 },
    { x: 1.25, z: -18.0, w: 4.1, h: 8.35, rows: 3, bays: 2, style: 4 },
    { x: 5.55, z: -20.1, w: 4.4, h: 10.4, rows: 4, bays: 3, style: 5 },
  ];
  for (const building of buildings) {
    const { x, z, w, h, rows, bays, style } = building;
    box(x, h / 2, z - .65, w, h, 1.3, facades[style]);
    box(x, h + .025, z - .08, w + .14, .16, 1.65, roof);
    box(x, 2.50, z + .055, w + .05, .09, .20, trim);
    box(x - w / 2 + .11, h / 2, z + .025, .16, h, .09, trim);
    box(x + w / 2 - .10, h / 2, z + .025, .13, h, .09, frame);
    const top = h - .73;
    const spacing = (top - 3.15) / Math.max(1, rows - 1);
    for (let row = 0; row < rows; row++) {
      for (let bay = 0; bay < bays; bay++) {
        // An occasional blind panel / missing opening interrupts lit grids.
        if ((style === 2 && row === 2 && bay === 0) || (style === 5 && row === 1 && bay === 2)) continue;
        const wx = x + (bay - (bays - 1) / 2) * (w / (bays + .34));
        const wy = 3.15 + row * spacing + (style === 3 && bay === 2 ? .22 : 0);
        const ww = bays === 3 ? .72 + random() * .16 : 1.03 + random() * .22;
        const wh = Math.min(spacing * .67, .91 + random() * .35);
        box(wx, wy, z + .045, ww + .16, wh + .18, .09, frame);
        const chance = random();
        const glazed = chance < .46 ? darkGlass : chance < .62 ? coolGlass : warmGlass[Math.floor(random() * warmGlass.length)];
        box(wx, wy, z + .101, ww, wh, .012, glazed);
        box(wx, wy - wh / 2 - .055, z + .13, ww + .21, .08, .27, trim);
        if (bay % 2 === 0 || style % 2 === 0) box(wx + (random() - .5) * .09, wy, z + .15, .026, wh, .035, frame);
        if ((row + style) % 3 === 0) box(wx, wy + wh * .21, z + .151, ww, .024, .036, frame);
        if (chance > .40 && random() > .34) {
          const curtain = curtains[(bay + row + style) % curtains.length];
          const panelWidth = ww * (.17 + random() * .18);
          const side = random() > .5 ? 1 : -1;
          box(wx + side * (ww - panelWidth) * .5, wy, z + .119, panelWidth, wh * .98, .016, curtain);
          for (let fold = 0; fold < 3; fold++) box(wx + side * (ww - panelWidth) * .5 - panelWidth * .3 + fold * panelWidth * .3, wy, z + .139, .012, wh * .97, .010, frame);
        }
        if (chance < .18) {
          // A partly lowered blind catches a cooler strip of the evening sky.
          box(wx, wy + wh * .28, z + .134, ww, wh * .43, .014, curtains[2]);
          for (let slat = 0; slat < 4; slat++) box(wx, wy + wh * .10 + slat * wh * .09, z + .15, ww, .009, .01, frame);
        }
      }
    }
    // Distinct ground-floor businesses: two quiet display bays and a recessed door.
    const shopHeight = 1.71 + (style % 2) * .16;
    const doorX = x + w * .28;
    box(x - w * .10, 1.20, z + .053, w * .60, shopHeight, .08, frame);
    box(x - w * .10, 1.20, z + .105, w * .54, shopHeight - .13, .024, style === 1 || style === 4 ? coolGlass : warmGlass[style % 4]);
    box(x - w * .10, 1.20, z + .15, .042, shopHeight - .1, .07, frame);
    box(doorX, 1.13, z + .08, .72, 2.07, .12, frame);
    box(doorX, 1.18, z + .153, .56, 1.68, .02, style % 2 ? darkGlass : warmGlass[0]);
    box(doorX + .18, .94, z + .18, .018, .18, .025, surfaces.brass);
    box(x - .1, 2.38, z + .16, w * .86, .25, .14, awnings[style % 3]);
    // A slim awning slopes toward the street, with real thickness and an edge.
    add(new THREE.BoxGeometry(w * .89, .048, .67), awnings[style % 3], x - .1, 2.19, z + .39, .15);
    box(x - .1, 2.11, z + .71, w * .89, .13, .037, awnings[style % 3]);
    for (let item = 0; item < 3; item++) box(x - w * .31 + item * .41, .63 + (item % 2) * .11, z + .145, .18 + random() * .10, .34 + random() * .20, .05, curtains[(item + style) % 3]);
    if (style !== 1 && style !== 5) {
      reflection(x - .15, -11.95, 1.8 + random() * .6, 8.6 + random() * 1.1, style === 4 ? 1 : 0);
      halo(x - w * .18, 1.72, z + .20, 1.0);
    }
  }

  // A narrow side street behind the left address gives a second depth plane.
  box(-20.9, 4.7, -25.1, 6.3, 9.4, 1.8, facades[3]);
  box(-13.8, 6.9, -27.2, 3.0, 13.8, 2.0, facades[0]);
  for (const [x, y, z] of [[-21.5, 4.3, -24.17], [-20.0, 6.4, -24.17], [-13.2, 7.3, -26.16]]) {
    box(x, y, z, .40, .64, .02, warmGlass[2]);
  }

  // Two unobtrusive pools of real light; the surrounding glow is a soft texture.
  for (const [index, placement] of [[-5.75, -8.6, 3.65], [-12.4, -13.9, 3.92]].entries()) {
    const [x, z, height] = placement;
    cylinder(x, height / 2, z, .027, .058, height, frame);
    cylinder(x, .12, z, .09, .13, .24, frame);
    add(new THREE.CylinderGeometry(.028, .028, .52, 12), frame, x + .25, height - .09, z, 0, 0, Math.PI / 2);
    add(new THREE.SphereGeometry(.085, 16, 10), bulb, x + .46, height - .17, z);
    cylinder(x + .46, height - .095, z, .085, .155, .075, roof);
    const light = new THREE.PointLight('#f1c893', index === 0 ? 12 : 9, 5.6, 2);
    light.position.set(x + .46, height - .19, z);
    group.add(light);
    halo(x + .46, height - .17, z + .13, index === 0 ? 1.30 : 1.12);
    reflection(x + .46, z + 2.3, .75, 4.8, index === 0 ? 0 : 2);
  }

  for (const [mat, geometries] of batches) {
    const merged = mergeGeometries(geometries, false);
    geometries.forEach(geometry => geometry.dispose());
    if (!merged) throw new Error('Cafe exterior batch geometry mismatch');
    const mesh = new THREE.Mesh(merged, mat);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.name = 'Batched cafe street architecture';
    group.add(mesh);
  }
  return { group, materials, textures };
}
