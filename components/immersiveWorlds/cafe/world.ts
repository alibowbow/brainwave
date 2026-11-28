import * as T from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { GLSL_NOISE } from '../shared/render/glsl';
import { patchSurface } from '../shared/render/interiorSurface';
import { makeCafeMaterials, metricUv } from './materials';
import { createCafePlant } from './plant';
import { buildCafeShelves } from './shelves';
import { buildCafeExterior } from './exterior';

export type CafeInteraction = 'cup' | 'lamp' | 'window';

/** The window opening (glass plane) in world space. */
export const CAFE_GLASS = { x: -2.15, y: 2.14, z: -1.55, w: 5.7, h: 3.5 } as const;
const TABLE_TOP = .775;

/**
 * Camera and hero-prop placement; `portrait` blends 0 (wide) to 1 (tall phone).
 * A middle-ground view about three metres from the glass: the lit table in the
 * lower third, the rainy window with a mullion and its post, and the café
 * opening to the right with pendants, the counter and quiet patrons.
 */
export function cafeShot(portrait: number) {
  const l = T.MathUtils.lerp;
  return {
    camera: new T.Vector3(l(.62, .66, portrait), l(1.36, 1.42, portrait), l(1.45, 1.5, portrait)),
    aim: new T.Vector3(l(-.03, .72, portrait), l(1.52, 1.5, portrait), -1.6),
    fov: l(52, 60, portrait),
    // The cup sits well inside the shade's light cone so the crema and heart are lit.
    cup: new T.Vector3(l(-.12, .46, portrait), TABLE_TOP, l(-.36, -.34, portrait)),
    lamp: new T.Vector3(l(-.55, .25, portrait), TABLE_TOP, l(-.92, -.98, portrait)),
    lampScale: l(1.2, 1.1, portrait),
    book: new T.Vector3(l(.3, .52, portrait), TABLE_TOP, l(-.42, -.66, portrait)),
  };
}

export function buildCafe() {
  const scene = new T.Scene();
  scene.background = new T.Color(0.012, 0.018, 0.03);
  const m = makeCafeMaterials();
  const interactables: T.Object3D[] = [];
  const extraMaterials: T.Material[] = [];
  const extraTextures: T.Texture[] = [];
  const animated: Array<(time: number) => void> = [];
  const mat = (color: string, roughness = .8, metalness = 0) => {
    const v = new T.MeshStandardMaterial({ color, roughness, metalness }); extraMaterials.push(v); return v;
  };
  const physical = (params: T.MeshPhysicalMaterialParameters) => { const v = new T.MeshPhysicalMaterial(params); extraMaterials.push(v); return v; };
  const mesh = (g: T.BufferGeometry, material: T.Material | T.Material[], x: number, y: number, z: number, parent: T.Object3D = scene) => {
    const o = new T.Mesh(g, material); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o;
  };
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, material: T.Material, parent?: T.Object3D) => mesh(new T.BoxGeometry(w, h, d), material, x, y, z, parent);
  // Bevelled slabs: every visible edge catches a thin line of light, as real joinery does.
  const slab = (x: number, y: number, z: number, w: number, h: number, d: number, material: T.Material, radius = .008, parent?: T.Object3D) =>
    mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, w / 2.1, h / 2.1, d / 2.1)), material, x, y, z, parent);
  const lathe = (profile: number[][], material: T.Material, segments: number, x: number, y: number, z: number, parent?: T.Object3D) =>
    mesh(new T.LatheGeometry(profile.map(([r, h]) => new T.Vector2(r, h)), segments), material, x, y, z, parent);
  const cylinder = (x: number, y: number, z: number, r1: number, r2: number, h: number, material: T.Material, parent?: T.Object3D, segments = 48) => mesh(new T.CylinderGeometry(r1, r2, h, segments), material, x, y, z, parent);
  const ball = (x: number, y: number, z: number, r: number, material: T.Material, parent?: T.Object3D) => mesh(new T.SphereGeometry(r, 24, 16), material, x, y, z, parent);
  const tube = (points: T.Vector3[], r: number, material: T.Material, parent: T.Object3D = scene, segments = 32) =>
    mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points), segments, r, 10, false), material, 0, 0, 0, parent);
  const hdr = (color: string, intensity: number) => new T.Color(color).multiplyScalar(intensity);

  // ---------------------------------------------------------------- room shell
  // Window bay (left) and the main room that opens to the right and deepens.
  slab(-2.2, -.1, 3.2, 6, .2, 9.5, m.floor, .002);
  slab(4, -.1, -3.2, 6.5, .2, 12, m.floor, .002);
  box(4, 2, -9.05, 6.5, 4.1, .18, m.brick);
  box(7.2, 2, -2, .2, 4, 14, m.plaster);
  // The street-side wall of the main room: painted render outside, plaster inside.
  const exteriorWall = mat('#151c21', .95);
  mesh(new T.BoxGeometry(.16, 4, 7.5), [m.plaster, exteriorWall, exteriorWall, exteriorWall, m.plaster, exteriorWall], .82, 2, -5.3);
  box(-2.2, 4.15, 3.2, 6, .16, 9.5, m.plaster);
  box(4, 4.15, -3.2, 6.5, .16, 12, m.plaster);
  box(-5.3, 2, 1, .25, 4, 6, m.plaster);
  // Panelled wainscot along the main room's long wall.
  slab(7.08, .55, -3.0, .05, 1.1, 11.6, m.darkWoodV, .006);
  slab(7.04, 1.12, -3.0, .09, .05, 11.6, m.darkWood, .01);
  // Dark beams across the ceiling read as structure rather than a flat lid.
  for (const z of [-1.4, -4.2, -7.0]) slab(4, 3.95, z, 6.5, .26, .22, m.darkWood, .015);

  // ---------------------------------------------------------------- window joinery
  const g = CAFE_GLASS;
  const glassBottom = g.y - g.h / 2;
  slab(g.x, glassBottom / 2, g.z + .02, g.w + .24, glassBottom, .2, m.darkWood, .01);
  slab(g.x, glassBottom + .015, g.z + .16, g.w + .36, .045, .34, m.oak, .012);
  for (const x of [-5.06, -2.25, .74]) {
    slab(x, g.y + .01, g.z + .04, .11, g.h + .2, .16, m.darkWoodV, .012);
    // Narrow bronze glazing beads either side of each post.
    for (const side of [-1, 1]) slab(x + side * .062, g.y, g.z + .02, .012, g.h, .022, m.brass, .004);
  }
  slab(g.x, g.y + g.h / 2 + .07, g.z + .03, g.w + .3, .16, .2, m.darkWood, .012);
  slab(g.x, 3.18, g.z + .05, g.w, .07, .13, m.darkWood, .01);

  // Linen drapes gathered at the posts: real folds near the camera.
  const drape = (x: number, width: number, gathers: number, seed: number) => {
    const height = 3.42;
    const geometry = new T.PlaneGeometry(width, height, 64, 40);
    const p = geometry.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i) / width + .5, v = p.getY(i) / height + .5;
      const fold = Math.sin(u * Math.PI * 2 * gathers + seed) * (.032 + .018 * Math.sin(u * 7 + seed)) + Math.sin(u * Math.PI * 2 * gathers * 2.1 + seed * 2) * .008;
      const flare = 1 + (1 - v) * .18;
      p.setXYZ(i, p.getX(i) * flare, p.getY(i), fold * (.7 + .3 * (1 - v)) + (1 - v) * (1 - v) * .03);
    }
    geometry.computeVertexNormals();
    const uv = geometry.getAttribute('uv');
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * width * 1.3, uv.getY(i) * height);
    const curtain = mesh(geometry, m.fabric, x, g.y + .05, g.z + .17);
    curtain.castShadow = false;
    return curtain;
  };
  drape(-2.48, .5, 3.5, 1.2);
  const rod = mesh(new T.CylinderGeometry(.014, .014, g.w + .5, 24), m.brass, g.x, g.y + g.h / 2 - .02, g.z + .2);
  rod.rotation.z = Math.PI / 2;
  for (const x of [g.x - g.w / 2 - .22, g.x + g.w / 2 + .22]) ball(x, g.y + g.h / 2 - .02, g.z + .2, .024, m.brass);

  // ---------------------------------------------------------------- window table
  const table = new T.Group(); scene.add(table); table.position.set(-.5, TABLE_TOP - .042, -.675);
  const shape = new T.Shape(); const w = 2.4, d = 1.25, r = .07;
  shape.moveTo(-w / 2 + r, -d / 2); shape.lineTo(w / 2 - r, -d / 2); shape.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r); shape.lineTo(w / 2, d / 2 - r); shape.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2); shape.lineTo(-w / 2 + r, d / 2); shape.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r); shape.lineTo(-w / 2, -d / 2 + r); shape.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  const top = mesh(new T.ExtrudeGeometry(shape, { depth: .03, bevelEnabled: true, bevelSize: .012, bevelThickness: .012, bevelSegments: 5, steps: 1, curveSegments: 18 }), m.oak, 0, 0, 0, table);
  top.rotation.x = -Math.PI / 2;
  slab(0, -.05, 0, w - .12, .07, d - .14, m.darkWood, .01, table);
  for (const x of [-w / 2 + .14, w / 2 - .14]) for (const z of [-d / 2 + .12, d / 2 - .12]) lathe([[0, 0], [.026, 0], [.03, .05], [.022, .3], [.02, .62], [.028, .7], [.028, .72], [0, .72]], m.darkWoodV, 24, x, -.75, z, table);

  // Soft baked contact occlusion complements the shadow map and SSAO at object bases.
  const contactCanvas = document.createElement('canvas'); contactCanvas.width = contactCanvas.height = 128;
  const cc = contactCanvas.getContext('2d')!; const cg = cc.createRadialGradient(64, 64, 4, 64, 64, 64); cg.addColorStop(0, 'rgba(0,0,0,.5)'); cg.addColorStop(.45, 'rgba(0,0,0,.2)'); cg.addColorStop(1, 'rgba(0,0,0,0)'); cc.fillStyle = cg; cc.fillRect(0, 0, 128, 128);
  const contactTexture = new T.CanvasTexture(contactCanvas); extraTextures.push(contactTexture);
  const contactMaterial = new T.MeshBasicMaterial({ map: contactTexture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); extraMaterials.push(contactMaterial);
  const decal = (size: number) => { const o = mesh(new T.PlaneGeometry(size, size), contactMaterial, 0, TABLE_TOP + .001, 0); o.rotation.x = -Math.PI / 2; o.castShadow = false; o.receiveShadow = false; return o; };
  const cupContact = decal(.3), lampContact = decal(.32);

  // ---------------------------------------------------------------- cup, saucer, spoon
  const cup = new T.Group(); scene.add(cup);
  const saucer = lathe([[0, 0], [.045, 0], [.05, .004], [.056, .006], [.06, .008], [.085, .012], [.1, .019], [.106, .022], [.104, .025], [.098, .022], [.084, .016], [.062, .013], [.04, .014], [0, .014]], m.ceramic, 128, 0, 0, 0, cup);
  const saucerFoot = lathe([[.04, 0], [.046, 0], [.046, .004], [.04, .004]], m.clay, 64, 0, 0, 0, cup);
  saucerFoot.castShadow = false;
  const body = new T.Group(); body.position.y = .014; cup.add(body);
  const outer = [[0, .0], [.03, .0], [.034, .002], [.035, .007], [.042, .012], [.055, .028], [.066, .05], [.074, .072], [.078, .088], [.079, .094]];
  const inner = [[.0755, .0945], [.0745, .088], [.07, .07], [.06, .045], [.045, .022], [.025, .013], [0, .012]];
  const cupBody = lathe([...outer, [.0785, .0962], [.077, .0964], ...inner], m.ceramic, 128, 0, 0, 0, body);
  const foot = lathe([[.029, -.0005], [.035, -.0005], [.035, .003], [.029, .003]], m.clay, 64, 0, 0, 0, body);
  foot.castShadow = false;
  // Coffee with crema, sitting just below the rim.
  const coffeeGeometry = new T.CircleGeometry(.0715, 96); coffeeGeometry.rotateX(-Math.PI / 2);
  const coffee = mesh(coffeeGeometry, m.coffee, 0, .079, 0, body); coffee.castShadow = false;
  // An ear-shaped handle swept along a smooth curve, thicker at its roots.
  const handleCurve = new T.CatmullRomCurve3([
    new T.Vector3(.066, .074, 0), new T.Vector3(.098, .081, 0), new T.Vector3(.115, .06, 0),
    new T.Vector3(.106, .035, 0), new T.Vector3(.08, .026, 0), new T.Vector3(.058, .03, 0)]);
  const handle = mesh(new T.TubeGeometry(handleCurve, 48, .0085, 16, false), m.ceramic, 0, 0, 0, body);
  handle.scale.z = 1.25;
  body.rotation.y = .5;
  // Teaspoon resting on the saucer: a shallow bowl and a tapering stem.
  const silver = physical({ color: '#d9d6cf', metalness: 1, roughness: .2 });
  const spoon = new T.Group(); spoon.position.set(.058, .022, .062); spoon.rotation.set(0, -.95, 0); cup.add(spoon);
  const bowl = mesh(new T.SphereGeometry(.015, 32, 12, 0, Math.PI * 2, Math.PI * .6, Math.PI * .4), silver, 0, .012, 0, spoon);
  bowl.scale.set(1, .5, 1.5); bowl.castShadow = false;
  const shaft = tube([new T.Vector3(0, .006, .021), new T.Vector3(0, .009, .045), new T.Vector3(0, .015, .075), new T.Vector3(0, .017, .098)], .0028, silver, spoon, 20);
  shaft.scale.x = 1.6; shaft.castShadow = false;
  for (const o of [cupBody, handle, saucer]) { o.userData.interaction = 'cup'; interactables.push(o); }
  // Two sugar cubes and a torn paper sugar stick beside the saucer.
  const sugar = physical({ color: '#f1ece2', roughness: .85, sheen: .5, sheenColor: new T.Color('#ffffff') });
  for (const [x, z, a] of [[-.135, .055, .3], [-.118, .085, -.5]]) { const c = mesh(new RoundedBoxGeometry(.017, .016, .017, 2, .003), sugar, x, .008, z, cup); c.rotation.y = a; }
  const stick = mesh(new RoundedBoxGeometry(.11, .006, .022, 2, .0025), physical({ color: '#b98d5a', roughness: .9 }), -.16, .003, -.03, cup);
  stick.rotation.y = 1.1;

  // An open notebook with a pencil: a focus table, not a still life.
  // Pages written in ink on faint rules: words are noise-gated strokes with a
  // wandering baseline, each page and line ending at its own place.
  const paper = physical({ color: '#e7dfcd', roughness: .92, sheen: .3, sheenColor: new T.Color('#ffffff') });
  patchSurface(paper, {
    key: 'cafe-notebook-ink',
    objectSpace: true,
    color: `
vec2 nbP = vSurface.xy;
float nbPage = floor(vSurfaceWorld.x * 7.0 + vSurfaceWorld.z * 7.0);
float nbRow = floor((nbP.y + 0.1) / 0.0105);
float nbF = fract((nbP.y + 0.1) / 0.0105);
float nbArea = step(-0.066, nbP.x) * step(nbP.x, 0.068) * step(-0.092, nbP.y) * step(nbP.y, 0.088);
float nbRule = (1.0 - smoothstep(0.0, 0.07, abs(nbF - 0.06))) * nbArea;
float nbEnd = 0.068 - 0.08 * bwHash1(vec3(nbRow, nbPage, 4.0)) * step(0.55, bwHash1(vec3(nbRow, nbPage, 8.0)));
float nbRows = mix(18.0, 9.0, step(0.5, bwHash1(vec3(nbPage, 1.0, 2.0))));
float nbWord = step(0.3, bwValue(vec3(nbP.x * 75.0, nbRow * 3.1 + nbPage, 2.0)));
float nbBase = 0.42 + 0.16 * sin(nbP.x * 2100.0 + nbRow * 7.0) + 0.08 * sin(nbP.x * 640.0 + nbRow * 3.0 + nbPage);
float nbInk = (1.0 - smoothstep(0.1, 0.2, abs(nbF - nbBase))) * nbWord * step(nbP.x, nbEnd) * step(nbRow, nbRows) * nbArea;
float nbSharp = bwResolve(length(fwidth(nbP)) / 0.0016);
vec3 nbColor = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.72, 0.8, 0.95), nbRule * 0.45);
diffuseColor.rgb = mix(nbColor, vec3(0.1, 0.12, 0.22), nbInk * mix(0.3, 0.92, nbSharp));`,
  });
  const book = new T.Group(); scene.add(book);
  slab(0, .006, 0, .34, .012, .24, mat('#2f3b3a', .7), .004, book);
  for (const side of [-1, 1]) {
    const leaf = new T.PlaneGeometry(.162, .225, 24, 4); const lp = leaf.getAttribute('position');
    for (let i = 0; i < lp.count; i++) { const x = lp.getX(i) * side; lp.setZ(i, .012 * Math.sin(Math.min(1, (x + .081) / .162) * Math.PI * .5) * (1 - Math.pow((x + .081) / .162, 3) * .5)); }
    leaf.computeVertexNormals();
    const page = mesh(leaf, paper, side * .083, .0145, 0, book); page.rotation.x = -Math.PI / 2; page.castShadow = false;
  }
  const pencil = mesh(new T.CylinderGeometry(.0042, .0042, .17, 6), mat('#a3713d', .55), .1, .019, .07, book);
  pencil.rotation.set(0, 0, Math.PI / 2); pencil.rotation.y = .4;

  // ---------------------------------------------------------------- table lamp
  const lamp = new T.Group(); scene.add(lamp);
  lathe([[0, 0], [.082, 0], [.088, .004], [.086, .012], [.07, .018], [.05, .026], [.034, .036], [.022, .05], [.016, .064], [.013, .07], [0, .07]], m.brass, 96, 0, 0, 0, lamp);
  const stem = cylinder(0, .2, 0, .0075, .0085, .27, m.brass, lamp, 24); stem.castShadow = false;
  const knuckle = mesh(new T.TorusGeometry(.0095, .003, 10, 32), m.brass, 0, .19, 0, lamp); knuckle.rotation.x = Math.PI / 2; knuckle.castShadow = false;
  const socket = cylinder(0, .352, 0, .016, .018, .045, physical({ color: '#5a4a35', metalness: 1, roughness: .4 }), lamp, 32); socket.castShadow = false;
  const bulbMaterial = new T.MeshBasicMaterial({ color: hdr('#ffd2a0', 30) }); extraMaterials.push(bulbMaterial);
  const bulb = ball(0, .392, 0, .026, bulbMaterial, lamp); bulb.castShadow = false;
  // Pleated linen shade: a lathed drum with radial pleats, translucent glow brighter
  // inside and toward the open hem, as a lit fabric shade is.
  const shadeH = .2, shadeBottom = .31;
  const shadeGeometry = new T.LatheGeometry([new T.Vector2(.165, 0), new T.Vector2(.15, .05), new T.Vector2(.133, .1), new T.Vector2(.117, .15), new T.Vector2(.1, shadeH)], 240);
  const sp = shadeGeometry.getAttribute('position');
  for (let i = 0; i < sp.count; i++) {
    const x = sp.getX(i), z = sp.getZ(i), a = Math.atan2(z, x);
    const pleat = 1 + .012 * Math.abs(Math.sin(a * 24));
    sp.setX(i, x * pleat); sp.setZ(i, z * pleat);
  }
  shadeGeometry.computeVertexNormals();
  const shadeMat = new T.MeshPhysicalMaterial({ color: '#e7d6b6', roughness: .9, side: T.DoubleSide, emissive: '#ffb366', emissiveIntensity: 1.6, sheen: .4, sheenColor: new T.Color('#fff2dc') });
  patchSurface(shadeMat, {
    key: 'cafe-lamp-shade',
    objectSpace: true,
    color: `
float shA = atan(vSurface.z, vSurface.x);
float shPleat = abs(sin(shA * 24.0));
float shY = clamp(vSurface.y / ${shadeH.toFixed(3)}, 0.0, 1.0);
float shWeave = bwNoise(vec3(shA * 300.0, vSurface.y * 900.0, 1.0)) * bwResolve(length(fwidth(vSurface)) * 900.0);
diffuseColor.rgb *= 0.9 + 0.1 * shPleat + 0.05 * shWeave;`,
    emissive: `
float shInside = gl_FrontFacing ? 1.0 : 2.0;
totalEmissiveRadiance *= shInside * (0.55 + 0.75 * (1.0 - shY)) * (0.85 + 0.3 * shPleat) * (0.94 + 0.12 * shWeave);`,
  });
  extraMaterials.push(shadeMat);
  const shade = mesh(shadeGeometry, shadeMat, 0, shadeBottom, 0, lamp);
  for (const [y, radius] of [[shadeBottom, .168], [shadeBottom + shadeH, .102]]) { const q = mesh(new T.TorusGeometry(radius, .0028, 8, 96), m.brass, 0, y, 0, lamp); q.rotation.x = Math.PI / 2; q.castShadow = false; }
  for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; const spoke = tube([new T.Vector3(0, .412, 0), new T.Vector3(Math.cos(a) * .1, shadeBottom + shadeH, Math.sin(a) * .1)], .0016, m.brass, lamp, 4); spoke.castShadow = false; }
  shade.userData.interaction = 'lamp'; interactables.push(shade);
  const warm = '#ffc58a';
  // Key light: the shade's open hem defines the soft pool on the table (shadowed).
  const key = new T.SpotLight(warm, 5.2, 0, 1.12, .75, 2);
  key.castShadow = true; key.shadow.radius = 3.5; key.shadow.bias = -.0006; key.shadow.normalBias = .012; key.shadow.camera.near = .05; key.shadow.camera.far = 6;
  scene.add(key, key.target);
  // Light leaking upward and through the shade cloth onto the window and drapes.
  const lampLight = new T.PointLight('#ffb978', .9, 4, 2); scene.add(lampLight);
  // Fake bounce from the lit table top: warm, soft, low.
  // Bounce from the lit table top in front of the cup, lifting its shadowed face.
  const bounce = new T.PointLight('#ffa062', .35, 1.6, 2); scene.add(bounce);

  // ---------------------------------------------------------------- steam
  const steamUniforms = { time: { value: 0 }, pulse: { value: 0 }, light: { value: new T.Color(1.4, .9, .5) }, ambient: { value: new T.Color(.03, .03, .035) } };
  const steamMaterial = new T.ShaderMaterial({
    transparent: true, depthWrite: false, premultipliedAlpha: true, side: T.DoubleSide, uniforms: { ...steamUniforms, seed: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; vec4 centre = modelViewMatrix * vec4(0.0, position.y, 0.0, 1.0); centre.x += position.x; gl_Position = projectionMatrix * centre; }`,
    fragmentShader: `${GLSL_NOISE}
uniform float time; uniform float pulse; uniform float seed; uniform vec3 light; uniform vec3 ambient;
varying vec2 vUv;
void main(){
  float y = vUv.y;
  float t = time * 0.32;
  float sway = (0.08 * sin(y * 3.4 - time * 0.45 + seed) + 0.04 * sin(y * 7.0 - time * 0.8 + seed * 2.0)) * y;
  float x = (vUv.x - 0.5 - sway) / (0.05 + 0.26 * y);
  vec3 q = vec3(x * 0.9, y * 3.2 - t, seed + time * 0.04);
  vec3 warp = vec3(bwNoise(q * 1.4 + vec3(0.0, 0.0, 1.7)), bwNoise(q * 1.4 + vec3(5.2, 1.3, 2.8)), 0.0);
  float n = bwFbm3(q * vec3(1.8, 1.2, 1.0) + warp * 1.1);
  float column = exp(-x * x * 2.2);
  float wisps = smoothstep(0.0, 0.5, n * 0.9 + column * 0.6 - 0.32);
  float density = wisps * column * smoothstep(0.0, 0.08, y) * (1.0 - smoothstep(0.25, 0.8, y));
  density *= 0.17 * (1.0 + pulse * 0.6);
  vec3 c = ambient + light * (0.7 + 0.5 * n);
  gl_FragColor = vec4(c * density, density);
}`,
  });
  extraMaterials.push(steamMaterial);
  const steam = new T.Group(); scene.add(steam);
  for (let i = 0; i < 3; i++) {
    const material = i ? steamMaterial.clone() : steamMaterial;
    if (i) { material.uniforms = { ...steamUniforms, seed: { value: i * 3.7 } }; extraMaterials.push(material); }
    const plume = mesh(new T.PlaneGeometry(.2, .36, 1, 1), material, (i - 1) * .012, .19, (i - 1) * .01, steam);
    plume.castShadow = false; plume.receiveShadow = false; plume.renderOrder = 2 + i;
  }

  // ---------------------------------------------------------------- service counter and shelves
  slab(3.9, .53, -7.45, 5.2, 1.06, .9, m.darkWoodV, .012);
  slab(3.9, 1.085, -7.42, 5.4, .05, 1.02, m.oak, .012);
  // Two-group espresso machine in oxblood enamel: the shape that says "café" even
  // when defocused. Chrome drip tray and cup rail, group heads with walnut-handled
  // portafilters, a steam wand, a round pressure gauge and a small amber pilot light.
  const enamel = physical({ color: '#6e2219', roughness: .32, clearcoat: 1, clearcoatRoughness: .08 });
  const machine = new T.Group(); machine.position.set(2.85, 1.11, -7.55); scene.add(machine);
  slab(0, .035, .02, .86, .07, .56, m.chrome, .02, machine);
  slab(0, .29, -.02, .8, .44, .48, enamel, .05, machine);
  slab(0, .2, .225, .8, .08, .04, m.chrome, .015, machine);
  slab(0, .525, -.02, .82, .03, .5, m.chrome, .012, machine);
  for (const z of [-.25, .21]) { const rail = cylinder(0, .575, z, .007, .007, .8, m.chrome, machine, 10); rail.rotation.z = Math.PI / 2; rail.castShadow = false; }
  for (const x of [-.2, .2]) {
    cylinder(x, .15, .27, .042, .036, .07, m.chrome, machine, 32);
    cylinder(x, .105, .29, .038, .033, .035, m.chrome, machine, 32);
    tube([new T.Vector3(x, .105, .31), new T.Vector3(x, .1, .4), new T.Vector3(x, .095, .5)], .013, m.darkWood, machine, 8);
  }
  for (const [x, z] of [[-.26, .02], [-.12, -.04], [.04, .03], [.2, -.05], [.3, .06]]) lathe([[0, 0], [.028, 0], [.034, .05], [.036, .066], [0, .066]], m.ceramic, 24, x, .54, z, machine).castShadow = false;
  tube([new T.Vector3(.4, .36, .12), new T.Vector3(.45, .33, .2), new T.Vector3(.46, .2, .24), new T.Vector3(.45, .1, .24)], .006, m.chrome, machine, 16).castShadow = false;
  const gauge = cylinder(0, .4, .225, .055, .055, .012, physical({ color: '#efe6d2', roughness: .3, clearcoat: 1, clearcoatRoughness: .05 }), machine, 32);
  gauge.rotation.x = Math.PI / 2; gauge.castShadow = false;
  const bezel = mesh(new T.TorusGeometry(.056, .006, 8, 32), m.brass, 0, .4, .232, machine); bezel.castShadow = false;
  const pilotLight = new T.MeshBasicMaterial({ color: hdr('#ffae5c', 14) }); extraMaterials.push(pilotLight);
  ball(.3, .4, .225, .009, pilotLight, machine).castShadow = false;
  // Grinder beside the machine: a lathed body under a smoked hopper.
  lathe([[0, 0], [.09, 0], [.095, .02], [.07, .05], [.065, .26], [.075, .3], [0, .3]], m.chrome, 48, 3.55, 1.11, -7.6);
  lathe([[.03, 0], [.05, .01], [.1, .16], [.1, .18], [0, .18]], physical({ color: '#3b2a1f', roughness: .15, transmission: 0, opacity: .9, transparent: true }), 48, 3.55, 1.41, -7.6);
  // Chalk menu board above the shelves, lit by a small brass picture light. The
  // chalk is unlettered: rows of soft strokes that read as a menu when defocused.
  const slate = new T.MeshStandardMaterial({ color: '#1d2420', roughness: .95, emissive: '#fff1dc', emissiveIntensity: .0 });
  patchSurface(slate, {
    key: 'cafe-chalk-menu',
    objectSpace: true,
    color: `
vec2 chP = vSurface.xy;
float chRow = floor((chP.y + 0.33) / 0.062);
float chF = fract((chP.y + 0.33) / 0.062);
float chCol = step(0.0, chP.x);
float chArea = step(-0.5, chP.x) * step(chP.x, 0.5) * step(-0.3, chP.y) * step(chP.y, 0.22);
float chEnd = mix(-0.08, 0.42, chCol) - 0.18 * bwHash1(vec3(chRow, chCol, 3.0));
float chStart = mix(-0.46, 0.04, chCol);
float chWord = step(0.28, bwValue(vec3(chP.x * 22.0, chRow * 2.7 + chCol * 5.0, 1.0)));
float chBase = 0.45 + 0.1 * sin(chP.x * 260.0 + chRow * 5.0);
float chalk = (1.0 - smoothstep(0.08, 0.2, abs(chF - chBase))) * chWord * step(chStart, chP.x) * step(chP.x, chEnd) * chArea;
float chTitle = (1.0 - smoothstep(0.0, 0.025, abs(chP.y - 0.27))) * step(abs(chP.x), 0.22) * step(0.25, bwValue(vec3(chP.x * 14.0, 9.0, 1.0)));
float chDust = 0.04 * smoothstep(0.3, 0.9, bwFbm3(vec3(chP * 6.0, 2.0)));
diffuseColor.rgb = mix(diffuseColor.rgb + chDust, vec3(0.86, 0.84, 0.78), clamp(chalk + chTitle, 0.0, 1.0) * 0.85);`,
    // Washed by the picture light above it: brightest at the top edge.
    emissive: 'totalEmissiveRadiance += diffuseColor.rgb * (0.12 + 0.55 * smoothstep(-0.45, 0.33, chP.y)) * vec3(1.0, 0.9, 0.76);',
  });
  extraMaterials.push(slate);
  const board = new T.Group(); board.position.set(3.25, 3.28, -8.86); scene.add(board);
  slab(0, 0, 0, 1.16, .76, .04, m.darkWood, .01, board);
  mesh(new T.PlaneGeometry(1.06, .66), slate, 0, 0, .022, board).castShadow = false;
  const pictureLight = new T.MeshBasicMaterial({ color: hdr('#ffd9a8', 9) }); extraMaterials.push(pictureLight);
  cylinder(0, .44, .12, .018, .018, .5, m.brass, board, 16).rotation.z = Math.PI / 2;
  const glowBar = mesh(new T.BoxGeometry(.46, .006, .02), pictureLight, 0, .425, .12, board); glowBar.castShadow = false;
  // A ceiling spot washes the back wall: the board, the shelved cups and the brick
  // read as a lit service wall behind the counter instead of a dark void.
  const wallWash = new T.SpotLight('#ffcf98', 22, 0, .78, .85, 2);
  wallWash.position.set(3.3, 3.98, -7.7); wallWash.target.position.set(3.3, 2.5, -8.95);
  scene.add(wallWash, wallWash.target);

  const shelves = buildCafeShelves(m); shelves.group.position.z = -.1; scene.add(shelves.group); extraMaterials.push(...shelves.materials); extraTextures.push(...shelves.textures);

  // ---------------------------------------------------------------- pendants over the far tables
  const pendantShell = physical({ color: '#1f2a26', roughness: .35, metalness: .6, clearcoat: .6, clearcoatRoughness: .2 });
  const pendantInner = new T.MeshStandardMaterial({ color: '#f1e6d2', roughness: .6, emissive: '#ffc690', emissiveIntensity: 1.4, side: T.BackSide }); extraMaterials.push(pendantInner);
  const pendantBulb = new T.MeshBasicMaterial({ color: hdr('#ffd5a4', 36) }); extraMaterials.push(pendantBulb);
  const pendantLights: T.SpotLight[] = [];
  const pendantPositions: T.Vector3[] = [];
  const pendant = (x: number, z: number, y: number, shadow: boolean, intensity: number) => {
    tube([new T.Vector3(x, 4.07, z), new T.Vector3(x, y + .2, z)], .004, m.darkWood, scene, 4).castShadow = false;
    cylinder(x, 4.05, z, .05, .05, .03, m.brass, scene, 24);
    const profile = [[.255, 0], [.24, .02], [.15, .1], [.08, .19], [.05, .23], [.02, .24]];
    lathe(profile, pendantShell, 64, x, y - .02, z).castShadow = true;
    lathe(profile.map(([r, h]) => [r * .97, h - .006]), pendantInner, 64, x, y - .02, z).castShadow = false;
    const b = ball(x, y + .04, z, .04, pendantBulb); b.castShadow = false;
    const l = new T.SpotLight('#ffc98e', intensity, 0, .78, .85, 2);
    l.position.set(x, y + .02, z); l.target.position.set(x, 0, z);
    if (shadow) { l.castShadow = true; l.shadow.radius = 6; l.shadow.bias = -.0008; l.shadow.normalBias = .02; l.shadow.camera.near = .1; l.shadow.camera.far = 6; }
    scene.add(l, l.target);
    pendantLights.push(l);
    pendantPositions.push(new T.Vector3(x, y + .04, z));
  };
  // Pools sized for the far tables; the counter lamp hangs higher and dimmer so the
  // machine's enamel and chrome catch it without burning out.
  pendant(1.6, -4.0, 2.08, true, 17);
  pendant(3.0, -5.55, 2.12, true, 15);
  pendant(2.95, -7.15, 2.45, false, 6);

  // ---------------------------------------------------------------- quiet patrons
  const patronMaterials = {
    coatA: physical({ color: '#2c3438', roughness: .92, sheen: .6, sheenColor: new T.Color('#6d7a80') }),
    coatB: physical({ color: '#5b4436', roughness: .95, sheen: .7, sheenColor: new T.Color('#a08670') }),
    knit: physical({ color: '#8c8170', roughness: .97, sheen: .8, sheenColor: new T.Color('#d2c6b1') }),
    skin: physical({ color: '#9a7a62', roughness: .6, sheen: .3, sheenColor: new T.Color('#e0a88a') }),
    hair: physical({ color: '#1d1714', roughness: .55, sheen: .5, sheenColor: new T.Color('#5a4a3c') }),
  };
  const chair = (x: number, z: number, angle: number) => {
    const c = new T.Group(); c.position.set(x, 0, z); c.rotation.y = angle; scene.add(c);
    slab(0, .45, 0, .44, .06, .42, m.velvet, .02, c);
    slab(0, .78, .2, .44, .5, .04, m.darkWoodV, .012, c);
    for (const a of [-.19, .19]) for (const b of [-.17, .17]) lathe([[0, 0], [.016, 0], [.019, .4], [.013, .42], [0, .42]], m.darkWoodV, 12, a, 0, b, c);
    return c;
  };
  const person = (x: number, z: number, angle: number, variant: number, phase: number) => {
    const seat = chair(x, z, angle);
    const p = new T.Group(); p.position.y = .48; seat.add(p);
    const cloth = variant ? patronMaterials.coatB : patronMaterials.coatA;
    // Seated torso: a lathed, slightly forward-leaning coat silhouette with shoulders.
    const torso = new T.Group(); torso.rotation.x = -.12; p.add(torso);
    const tg = new T.LatheGeometry([[0, 0], [.16, 0], [.175, .06], [.165, .2], [.17, .32], [.19, .4], [.18, .45], [.12, .5], [.06, .52], [0, .52]].map(([r, h]) => new T.Vector2(r, h)), 48);
    tg.scale(1, 1, .62);
    mesh(tg, cloth, 0, 0, 0, torso);
    const collar = mesh(new T.TorusGeometry(.065, .028, 12, 32), variant ? patronMaterials.knit : cloth, 0, .51, 0, torso); collar.rotation.x = Math.PI / 2; collar.scale.set(1, .8, 1);
    const neck = cylinder(0, .55, -.01, .04, .045, .08, patronMaterials.skin, torso, 24);
    neck.castShadow = false;
    const head = new T.Group(); head.position.set(0, .64, -.015); torso.add(head);
    const skull = ball(0, 0, 0, .095, patronMaterials.skin, head); skull.scale.set(.84, 1.06, .96);
    const hairCap = mesh(new T.SphereGeometry(.101, 32, 20, 0, Math.PI * 2, 0, Math.PI * (variant ? .7 : .55)), patronMaterials.hair, 0, .008, .012, head); hairCap.scale.set(.86, 1.05, .98); hairCap.rotation.x = -.35;
    if (variant) { const bun = ball(0, .06, .07, .042, patronMaterials.hair, head); bun.scale.set(1, .9, .9); }
    ball(0, -.02, -.085, .014, patronMaterials.skin, head);
    // Arms rest forward on the table: a sleeve from shoulder to wrist, hand cupped.
    for (const side of [-1, 1]) {
      tube([new T.Vector3(side * .16, .42, 0), new T.Vector3(side * .2, .28, -.06), new T.Vector3(side * .16, .2, -.2), new T.Vector3(side * .08, .23, -.34)], .045, cloth, torso, 20);
      const hand = ball(side * .06, .235, -.36, .032, patronMaterials.skin, torso); hand.scale.set(1, .6, 1.3);
    }
    const lean = .05 + .04 * variant;
    animated.push(time => {
      // Breathing, a slow drift of attention: never synchronised, never toward the viewer.
      const breath = Math.sin(time * (1.05 + .1 * variant) + phase);
      torso.scale.set(1 + breath * .006, 1 + breath * .01, 1 + breath * .008);
      head.rotation.y = .22 * Math.sin(time * .045 + phase) + .06 * Math.sin(time * .13 + phase * 2);
      head.rotation.x = lean + .05 * Math.sin(time * .07 + phase * 1.7);
    });
    return seat;
  };
  const patronTable = (x: number, z: number) => {
    lathe([[0, 0], [.2, 0], [.21, .02], [.06, .05], [.03, .1], [.028, .68], [.06, .71], [0, .71]], m.darkWoodV, 32, x, 0, z);
    const topG = new T.CylinderGeometry(.42, .42, .035, 64); const t2 = mesh(topG, m.oak, x, .728, z);
    t2.castShadow = true;
    const contact = mesh(new T.PlaneGeometry(1.8, 1.8), contactMaterial, x, .004, z); contact.rotation.x = -Math.PI / 2; contact.castShadow = false;
  };
  patronTable(1.6, -4.0);
  person(2.18, -3.95, Math.PI / 2 + .18, 0, 0);
  chair(1.03, -4.05, -Math.PI / 2 - .1);
  lathe([[0, 0], [.03, 0], [.04, .07], [.036, .08], [0, .08]], m.ceramic, 32, 1.53, .746, -3.95);
  slab(1.77, .75, -4.07, .2, .012, .26, paper, .003);
  patronTable(3.0, -5.55);
  person(3.55, -5.8, Math.PI / 2 + .55, 1, 2.3);
  chair(2.5, -5.4, -Math.PI / 2 + .25);
  lathe([[0, 0], [.03, 0], [.04, .07], [.036, .08], [0, .08]], m.ceramic, 32, 2.91, .746, -5.53);

  // Velvet banquette along the bay's side wall (seen mostly in the glass).
  const seatGeometry = metricUv(new RoundedBoxGeometry(1.0, .2, 4.0, 4, .05));
  mesh(seatGeometry, m.velvet, -3.85, .55, 1.6);
  const backGeometry = metricUv(new RoundedBoxGeometry(.18, .9, 4.0, 4, .06));
  mesh(backGeometry, m.velvet, -4.4, 1.05, 1.6);
  slab(-3.9, .23, 1.6, 1.1, .46, 4.05, m.darkWoodV, .01);

  // Potted plants frame the room, built from curved individual leaves.
  for (const [x, z, s] of [[3.25, -7.2, .9], [4.6, -3.6, 1.1], [6.6, -7.9, 1.3], [-1.05, -1.22, .55]]) {
    const plant = createCafePlant({ ...m, darkWood: m.soil }, s); plant.position.set(x, x < 0 ? TABLE_TOP : 0, z); scene.add(plant);
  }

  // ---------------------------------------------------------------- street
  const exterior = buildCafeExterior(m); scene.add(exterior.group); extraMaterials.push(...exterior.materials); extraTextures.push(...exterior.textures);
  const rainTime = (m.pavement.userData.rainTime as { value: number });

  // Faint cool light from the blue-hour window: a rim on the cup and the drapes.
  const windowLight = new T.DirectionalLight('#7f9fc4', .05); windowLight.position.set(-3, 3.5, -6); scene.add(windowLight, windowLight.target);
  windowLight.target.position.set(0, .8, 0);

  // A wall sconce behind the seat (out of frame): a low, warm motivated fill so the
  // camera-facing side of the cup and table keeps its shape.
  const sconce = new T.PointLight('#ffb070', 2.4, 6, 2); sconce.position.set(1.4, 1.9, 2.6); scene.add(sconce);

  const shadowCasters = [key, ...pendantLights.filter(l => l.castShadow)];

  /** Places the hero props for this aspect and returns the shot. */
  const arrange = (portrait: number) => {
    const shot = cafeShot(portrait);
    cup.position.copy(shot.cup);
    steam.position.set(shot.cup.x, TABLE_TOP + .1, shot.cup.z);
    cupContact.position.set(shot.cup.x, TABLE_TOP + .001, shot.cup.z);
    lamp.position.copy(shot.lamp); lamp.scale.setScalar(shot.lampScale);
    lampContact.position.set(shot.lamp.x, TABLE_TOP + .001, shot.lamp.z);
    book.position.copy(shot.book); book.rotation.y = -.3 - .25 * portrait;
    const bulbY = shot.lamp.y + .392 * shot.lampScale;
    key.position.set(shot.lamp.x, bulbY, shot.lamp.z);
    key.target.position.set(shot.cup.x * .55 + shot.lamp.x * .45, TABLE_TOP, shot.cup.z * .6 + shot.lamp.z * .4);
    lampLight.position.set(shot.lamp.x, bulbY + .06, shot.lamp.z);
    bounce.position.set(shot.cup.x - .05, TABLE_TOP + .05, shot.cup.z + .26);
    return shot;
  };

  return {
    scene, m, cup, saucer, steam, lamp, key, cupContact, lampContact, lampLight, bounce, shadeMat, bulbMaterial, steamUniforms, interactables,
    glass: { ...CAFE_GLASS }, exterior, pendantPositions, pendantLights, shadowCasters, arrange,
    update(time: number) { rainTime.value = time; for (const step of animated) step(time); },
    dispose() {
      const geometries = new Set<T.BufferGeometry>();
      scene.traverse(o => { if (o instanceof T.Mesh) geometries.add(o.geometry); if (o instanceof T.InstancedMesh) o.dispose(); });
      geometries.forEach(geometry => geometry.dispose());
      extraMaterials.forEach(v => v.dispose());
      extraTextures.forEach(v => v.dispose());
      scene.traverse(o => { if (o instanceof T.Light && 'shadow' in o) (o as T.SpotLight).shadow?.dispose(); });
      m.dispose();
    },
  };
}
