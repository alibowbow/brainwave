import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { BokehLamp } from './glass';

type ExteriorSurfaces = {
  pavement: THREE.Material;
  darkWood: THREE.Material;
  brass: THREE.Material;
};

/*
 * Original quiet street at blue hour. All textures are generated here; no
 * image or network assets. Light sources are HDR (well above 1) so the bokeh
 * pass turns them into round discs and the pipeline's bloom can veil them:
 * warm shop fronts and a few lit flats, street lamps with real light pools,
 * a cold sky gradient and long broken reflections on the wet paving. The
 * lamps are also handed to the bokeh pass for closed-form volumetric halos.
 */
export function buildCafeExterior(surfaces: ExteriorSurfaces): {
  group: THREE.Group;
  materials: THREE.Material[];
  textures: THREE.Texture[];
  lamps: BokehLamp[];
  /** Street probe for every outside material (HDR path); null restores the scene environment. */
  setEnvironment(texture: THREE.Texture | null): void;
} {
  const group = new THREE.Group();
  group.name = 'Cafe rain-wet evening street';
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  const lit: THREE.MeshStandardMaterial[] = [];
  const lamps: BokehLamp[] = [];
  let state = 914035;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const material = (color: string, roughness = .85, emissive?: string, intensity = 0) => {
    const result = new THREE.MeshStandardMaterial({ color, roughness, emissive: emissive ?? '#000000', emissiveIntensity: intensity });
    materials.push(result);
    lit.push(result);
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
  const facades = ['#2c3a44', '#3d4245', '#36464f', '#323f49', '#4a4743', '#2d3d47'].map(color => {
    const result = material(color, .9);
    result.map = masonry;
    return result;
  });
  const stone = material('#4a5257', .55);
  const curb = material('#5c6466', .5);
  const joint = material('#1d262c', .96);
  const frame = material('#252f35', .55);
  const trim = material('#4f5a5c', .75);
  const roof = material('#1c272e', .84);
  const coolGlass = material('#1d2f3a', .12, '#5d86a3', .22);
  const darkGlass = material('#121e26', .1);
  // Lit flats: warm tungsten behind curtains, deliberately varied in strength.
  const warmGlass = [
    material('#3c342a', .3, '#ffc78a', .9),
    material('#4a3d2d', .3, '#ffd29c', 1.6),
    material('#3a3226', .3, '#f2b77a', .55),
    material('#4f402e', .3, '#ffcb8a', 2.2),
  ];
  // Shop fronts: the brightest, softest warm blocks at street level.
  const shopGlass = [material('#4a3b2a', .25, '#ffcf92', 2.8), material('#3d3326', .25, '#ffd9a6', 2.0)];
  const curtains = [material('#978e7d', .94, '#ffc890', .15), material('#776f60', .96, '#ffbf80', .09), material('#617076', .98)];
  const awnings = [material('#2f3a36'), material('#3b373a'), material('#3a342d')];
  const bulb = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, .78, .5).multiplyScalar(28) });
  materials.push(bulb);

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

  // Blue-hour sky: deep cobalt overhead, a cooler grey-blue band at the rooftops
  // and a faint warm city glow at the horizon. Linear HDR radiance.
  const skyMaterial = new THREE.ShaderMaterial({
    name: 'CafeBlueHourSky',
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `varying vec3 vDir;
void main(){
  float y = vDir.y;
  // Blue hour: the sky still glows after sunset, brightest just above the rooftops.
  vec3 top = vec3(0.012, 0.03, 0.09), mid = vec3(0.04, 0.075, 0.165), low = vec3(0.095, 0.11, 0.155);
  vec3 c = mix(mid, top, smoothstep(0.3, 0.95, y));
  c = mix(low, c, smoothstep(0.0, 0.26, y));
  // Thin, slow cloud deck lit from below by the city.
  float band = sin(vDir.x * 9.0 + y * 31.0) * sin(vDir.x * 23.0 - y * 13.0);
  c += vec3(0.006, 0.007, 0.01) * smoothstep(0.2, 0.9, band) * smoothstep(0.05, 0.3, y) * (1.0 - smoothstep(0.4, 0.8, y));
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
  materials.push(skyMaterial);
  const sky = new THREE.Mesh(new THREE.SphereGeometry(70, 32, 16), skyMaterial);
  sky.position.set(-3, 0, -10);
  sky.name = 'Blue-hour sky dome';
  group.add(sky);

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
  box(-7, -.017, -4.12, 32, .012, .035, joint);
  for (let i = 0; i < 4; i++) {
    const x = -10.5 + i * 4.6;
    box(x, -.012, -4.24, .57, .024, .34, frame);
    for (let j = 0; j < 6; j++) box(x - .23 + j * .09, .002, -4.24, .014, .013, .31, curb);
  }

  const haloTexture = canvasTexture(128, 128, ctx => {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, '#ffffffff');
    gradient.addColorStop(.12, '#ffffff70');
    gradient.addColorStop(.4, '#ffffff16');
    gradient.addColorStop(1, '#ffffff00');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ffd6a0').multiplyScalar(.7), map: haloTexture, transparent: true, opacity: .5,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  materials.push(glowMaterial);
  const halo = (x: number, y: number, z: number, size: number) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size * .7), glowMaterial);
    mesh.position.set(x, y, z);
    mesh.name = 'Shop window light spill';
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
  const reflected = [['#ffcf96', 6.5], ['#9fb8c8', 2], ['#ffc58a', 5]].map(([color, gain]) => {
    const mat = new THREE.MeshBasicMaterial({
      map: reflectionTexture, color: new THREE.Color(color as string).multiplyScalar(gain as number), transparent: true, opacity: .8,
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
    // A light's reflection runs from below it straight toward the viewer, so the near
    // end of each strip is swung onto the line to the window seat (x ≈ .6, z ≈ 1.45):
    // on screen it then falls vertically beneath its lamp.
    const lean = (.6 - x) * length / (1.45 - (z - length / 2));
    for (let i = 0; i < position.count; i++) position.setX(i, position.getX(i) + (1 - uv.getY(i)) * lean);
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
        const glazed = chance < .5 ? darkGlass : chance < .64 ? coolGlass : warmGlass[Math.floor(random() * warmGlass.length)];
        box(wx, wy, z + .101, ww, wh, .012, glazed);
        box(wx, wy - wh / 2 - .055, z + .13, ww + .21, .08, .27, trim);
        if (bay % 2 === 0 || style % 2 === 0) box(wx + (random() - .5) * .09, wy, z + .15, .026, wh, .035, frame);
        if ((row + style) % 3 === 0) box(wx, wy + wh * .21, z + .151, ww, .024, .036, frame);
        if (chance > .40 && random() > .34) {
          const curtain = curtains[(bay + row + style) % curtains.length];
          const panelWidth = ww * (.17 + random() * .18);
          const side = random() > .5 ? 1 : -1;
          box(wx + side * (ww - panelWidth) * .5, wy, z + .119, panelWidth, wh * .98, .016, curtain);
        }
        if (chance < .18) {
          // A partly lowered blind catches a cooler strip of the evening sky.
          box(wx, wy + wh * .28, z + .134, ww, wh * .43, .014, curtains[2]);
        }
      }
    }
    // Distinct ground-floor businesses: two quiet display bays and a recessed door.
    const shopHeight = 1.71 + (style % 2) * .16;
    const doorX = x + w * .28;
    const shopLit = style !== 1 && style !== 5;
    box(x - w * .10, 1.20, z + .053, w * .60, shopHeight, .08, frame);
    box(x - w * .10, 1.20, z + .105, w * .54, shopHeight - .13, .024, shopLit ? shopGlass[style % 2] : coolGlass);
    box(x - w * .10, 1.20, z + .15, .042, shopHeight - .1, .07, frame);
    box(doorX, 1.13, z + .08, .72, 2.07, .12, frame);
    box(doorX, 1.18, z + .153, .56, 1.68, .02, style % 2 ? darkGlass : warmGlass[2]);
    box(doorX + .18, .94, z + .18, .018, .18, .025, surfaces.brass);
    box(x - .1, 2.38, z + .16, w * .86, .25, .14, awnings[style % 3]);
    // A slim awning slopes toward the street, with real thickness and an edge.
    add(new THREE.BoxGeometry(w * .89, .048, .67), awnings[style % 3], x - .1, 2.19, z + .39, .15);
    box(x - .1, 2.11, z + .71, w * .89, .13, .037, awnings[style % 3]);
    for (let item = 0; item < 3; item++) box(x - w * .31 + item * .41, .63 + (item % 2) * .11, z + .145, .18 + random() * .10, .34 + random() * .20, .05, curtains[(item + style) % 3]);
    if (shopLit) {
      // The bokeh pass mirrors lit shop fronts in the wet street itself (screen-space
      // planar reflection), so they need no stand-in strip. The draws this strip used
      // are still taken from the seeded sequence to keep later façades unchanged.
      for (let i = 0; i < 4; i++) random();
      halo(x - w * .10, 1.2, z + .25, w * .75);
    }
  }

  // Strings of small warm bulbs sag under two awnings: a row of soft bokeh discs.
  const fairy = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, .74, .45).multiplyScalar(6) });
  materials.push(fairy);
  for (const [x, z, w] of [[-7.6, -18.4 + .74, 3.9], [-3.2, -16.95 + .74, 3.9], [5.45, -20.1 + .74, 4.0]]) {
    const count = 11;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const sag = Math.sin(t * Math.PI) * .22 + Math.sin(t * Math.PI * 2) * .02;
      add(new THREE.SphereGeometry(.05, 10, 6), fairy, x - w / 2 + t * w, 2.02 - sag, z);
    }
  }
  // A few cooler lights (stairwells, a television) keep the façades from reading all amber.
  const coolLight = material('#1f2a33', .2, '#9fc0e0', .9);
  for (const [x, y, z] of [[-14.9, 5.4, -19.1], [-10.9, 6.7, -17.5], [2.0, 4.9, -17.9], [6.5, 7.6, -20.0]]) box(x, y, z + .11, .5, .75, .012, coolLight);

  // Parked cars along the far kerb: low dark bodies with their tail lights left on,
  // and a crossing signal: small red and green accents among the amber bokeh.
  const body = material('#161b20', .22);
  const tail = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, .08, .04).multiplyScalar(2.4) });
  const signalGreen = new THREE.MeshBasicMaterial({ color: new THREE.Color(.2, 1, .55).multiplyScalar(3) });
  materials.push(tail, signalGreen);
  for (const [x, z] of [[-9.6, -13.6], [-1.9, -13.7]]) {
    add(new THREE.BoxGeometry(4.1, .62, 1.75), body, x, .52, z);
    add(new THREE.BoxGeometry(2.2, .5, 1.6), body, x - .25, 1.06, z);
    for (const side of [-1, 1]) add(new THREE.BoxGeometry(.04, .07, .2), tail, x + 2.05, .66, z + side * .68);
  }
  cylinder(.9, 1.55, -14.95, .05, .05, 3.1, frame);
  box(.9, 2.85, -14.85, .3, .62, .2, frame);
  add(new THREE.CircleGeometry(.085, 16), signalGreen, .9, 2.68, -14.74);

  // A narrow side street behind the left address gives a second depth plane.
  box(-20.9, 4.7, -25.1, 6.3, 9.4, 1.8, facades[3]);
  box(-13.8, 6.9, -27.2, 3.0, 13.8, 2.0, facades[0]);
  for (const [x, y, z] of [[-21.5, 4.3, -24.17], [-20.0, 6.4, -24.17], [-13.2, 7.3, -26.16]]) {
    box(x, y, z, .40, .64, .02, warmGlass[2]);
  }

  // Street lamps along both pavements. Two carry real light pools; the rest are
  // emissive with halos and reflections, which is all the defocused view needs.
  const lampPosts: Array<[number, number, number, boolean]> = [
    [-8.1, -8.6, 3.65, true], [-12.4, -13.9, 3.92, true], [-1.2, -14.6, 3.9, false],
    [4.6, -14.9, 3.9, false], [-18.6, -14.4, 3.9, false], [-8.9, -4.25, 3.7, false],
  ];
  for (const [index, [x, z, height, real]] of lampPosts.entries()) {
    cylinder(x, height / 2, z, .027, .058, height, frame);
    cylinder(x, .12, z, .09, .13, .24, frame);
    add(new THREE.CylinderGeometry(.028, .028, .52, 12), frame, x + .25, height - .09, z, 0, 0, Math.PI / 2);
    add(new THREE.SphereGeometry(.075, 16, 10), bulb, x + .46, height - .17, z);
    cylinder(x + .46, height - .095, z, .085, .155, .075, roof);
    const bulbPosition = new THREE.Vector3(x + .46, height - .19, z);
    if (real) {
      const light = new THREE.PointLight('#ffc98c', index === 0 ? 14 : 11, 9, 2);
      light.position.copy(bulbPosition);
      group.add(light);
    }
    lamps.push({ position: bulbPosition, color: new THREE.Color('#ffc890'), strength: index === 5 ? .02 : .032 });
    reflection(x + .46, z + 2.3, .75, 4.8 + (z < -12 ? 3 : 0), index % 2 ? 2 : 0, 1);
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
  const outsideLit = [...lit, surfaces.pavement as THREE.MeshStandardMaterial];
  return {
    group, materials, textures, lamps,
    setEnvironment(texture) {
      // The probe cannot place reflections, so on the grazing wet paving it would smear
      // the shop fronts into one bright band. Keep it to a dim sky sheen there and let
      // the streaks and the lamps' own highlights carry the reflections.
      for (const mat of outsideLit) { mat.envMap = texture; mat.envMapIntensity = texture ? (mat === surfaces.pavement ? .25 : 1) : .6; mat.needsUpdate = true; }
    },
  };
}
