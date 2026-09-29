import * as THREE from 'three';
import { GLSL_FILTER, GLSL_NOISE } from './glsl';
import { createFullscreenMesh, createTarget, FullscreenPass, passMaterial } from './fullscreen';
import { updateMirrorCamera } from './mirror';
import { CITY_EYE_HEIGHT } from './layout';
import { mulberry32, range, skewed, type Rng } from './random';

/*
 * The skyline across the river is a real 3D city rendered from the viewer's
 * eye. It is drawn twice per view: once sharp (seen through each raindrop,
 * which acts as a tiny in-focus lens) and once defocused as the camera sees
 * it through clear glass. Point lights are drawn as bokeh sprites whose disc
 * matches the lens' circle of confusion, with cat's-eye vignetting.
 */

const SHORE_Z = -900;
const GROUND_Y = 2.5;
const FAR = 15000;
/** The static layer stores view distance in alpha, normalised by this. */
const DIST_NORM = 16000;

interface Building {
  x: number; z: number; w: number; d: number; h: number; rot: number;
  style: number; lit: number; warmth: number; seed: number;
  winW: number; floorH: number; accent: number; crown: number;
  accentColor: [number, number, number];
}

const enum SpriteKind { Static = 0, Moving = 1, Blink = 2, Glint = 3, Toggle = 4 }

interface Sprite {
  x: number; y: number; z: number;
  r: number; g: number; b: number;
  intensity: number; kind: SpriteKind; phase: number; speed: number;
  dirX: number; dirZ: number; span: number; size: number;
}

const ACCENTS: [number, number, number][] = [
  [0.35, 0.62, 1.0], [0.5, 0.85, 1.0], [0.85, 0.9, 1.0], [0.62, 0.45, 1.0], [0.3, 0.95, 0.9],
];

function makeBuilding(rng: Rng, x: number, z: number, w: number, d: number, h: number, style: number): Building {
  const residential = style === 0;
  const office = style === 1;
  return {
    x, z, w, d, h,
    rot: rng() < 0.28 ? range(rng, -0.28, 0.28) : 0,
    style,
    lit: style === 3 ? range(rng, 0.04, 0.12) : residential ? range(rng, 0.22, 0.46) : office ? range(rng, 0.3, 0.62) : range(rng, 0.28, 0.52),
    warmth: residential ? range(rng, 0.45, 0.85) : office ? range(rng, 0.0, 0.25) : range(rng, 0.05, 0.4),
    seed: rng() * 100,
    winW: residential ? range(rng, 2.3, 3.2) : range(rng, 1.5, 2.3),
    floorH: residential ? range(rng, 2.9, 3.2) : range(rng, 3.6, 4.2),
    accent: 0,
    crown: 0,
    accentColor: ACCENTS[Math.floor(rng() * ACCENTS.length)],
  };
}

function generateBuildings(rng: Rng): Building[] {
  const buildings: Building[] = [];
  const styleFor = (towerish: number) => {
    const roll = rng();
    if (roll < 0.12) return 3;
    if (roll < 0.12 + 0.45 * (1 - towerish)) return 0;
    return roll < 0.8 ? 1 : 2;
  };

  // Waterfront row: low and mid rise right behind the promenade.
  for (let x = -3400; x < 3400;) {
    const w = range(rng, 22, 58);
    const d = range(rng, 18, 42);
    const h = rng() < 0.18 ? range(rng, 60, 115) : range(rng, 14, 58);
    buildings.push(makeBuilding(rng, x + w / 2, SHORE_Z - 48 - d / 2 - range(rng, 0, 45), w, d, h, styleFor(0.2)));
    x += w + range(rng, 3, 22);
  }

  // Downtown: a jittered grid whose towers rise toward the centre.
  const coreX = 60;
  for (let row = 0; row < 11; row++) {
    for (let column = -20; column <= 20; column++) {
      const x = column * 88 + range(rng, -28, 28);
      const z = SHORE_Z - 175 - row * 112 - range(rng, 0, 55);
      const core = Math.exp(-((x - coreX) ** 2) / (2 * 760 * 760)) * Math.exp(-((row - 3) ** 2) / 30);
      if (rng() > 0.3 + 0.62 * core) continue;
      const tower = rng() < 0.2 + 0.7 * core;
      const h = tower ? range(rng, 70, 120 + 240 * core) : range(rng, 22, 75);
      const w = tower ? range(rng, 24, 46) : range(rng, 26, 60);
      const d = tower ? range(rng, 22, 44) : range(rng, 24, 58);
      const building = makeBuilding(rng, x, z, w, d, h, styleFor(tower ? 0.9 : 0.3));
      if (tower && rng() < 0.2 + 0.25 * core) {
        building.accent = range(rng, 0.45, 1);
        building.crown = rng() < 0.55 ? range(rng, 0.5, 1) : 0;
      }
      buildings.push(building);
    }
  }

  // Distant districts dissolve into rain haze.
  for (let i = 0; i < 260; i++) {
    const x = range(rng, -4200, 4200);
    const z = range(rng, SHORE_Z - 1350, -4800);
    const h = skewed(rng, 18, 190, 1.8);
    buildings.push(makeBuilding(rng, x, z, range(rng, 28, 70), range(rng, 28, 70), h, styleFor(0.5)));
  }

  // Landmarks that give the skyline its silhouette.
  const landmarks: [number, number, number, number][] = [
    [-275, SHORE_Z - 450, 372, 40], [205, SHORE_Z - 285, 318, 36], [640, SHORE_Z - 610, 292, 42], [-720, SHORE_Z - 330, 238, 34],
  ];
  for (const [x, z, h, w] of landmarks) {
    const building = makeBuilding(rng, x, z, w, w * range(rng, 0.85, 1.1), h, 2);
    building.rot = range(rng, -0.12, 0.12);
    building.accent = range(rng, 0.7, 1);
    building.crown = 1;
    building.lit = range(rng, 0.4, 0.58);
    buildings.push(building);
  }
  return buildings;
}

const faceBasis = (b: Building, face: 'front' | 'left' | 'right') => {
  // Returns the face centre, its tangent and outward normal in world space.
  const cos = Math.cos(b.rot);
  const sin = Math.sin(b.rot);
  const rotate = (x: number, z: number) => ({ x: x * cos + z * sin, z: -x * sin + z * cos });
  if (face === 'front') {
    const c = rotate(0, b.d / 2);
    const t = rotate(1, 0);
    const n = rotate(0, 1);
    return { cx: b.x + c.x, cz: b.z + c.z, tx: t.x, tz: t.z, nx: n.x, nz: n.z, width: b.w };
  }
  const sign = face === 'right' ? 1 : -1;
  const c = rotate(sign * b.w / 2, 0);
  const t = rotate(0, -sign);
  const n = rotate(sign, 0);
  return { cx: b.x + c.x, cz: b.z + c.z, tx: t.x, tz: t.z, nx: n.x, nz: n.z, width: b.d };
};

function generateSprites(rng: Rng, buildings: Building[]): Sprite[] {
  const sprites: Sprite[] = [];
  const add = (sprite: Partial<Sprite> & Pick<Sprite, 'x' | 'y' | 'z' | 'r' | 'g' | 'b' | 'intensity'>) => {
    sprites.push({ kind: SpriteKind.Static, phase: rng(), speed: 0, dirX: 0, dirZ: 0, span: 1, size: 1, ...sprite });
  };
  const warm: [number, number, number] = [1.0, 0.74, 0.46];
  const sodium: [number, number, number] = [1.0, 0.58, 0.24];
  const cool: [number, number, number] = [0.74, 0.86, 1.0];
  const blue: [number, number, number] = [0.46, 0.64, 1.0];

  const glintsFor = (x: number, height: number, z: number, color: [number, number, number], intensity: number, count: number) => {
    const distance = -z;
    const center = distance * CITY_EYE_HEIGHT / (CITY_EYE_HEIGHT + height);
    for (let i = 0; i < count; i++) {
      const spread = (rng() + rng() + rng() - 1.5) * 0.19;
      const d = Math.min(distance * 0.985, Math.max(distance * 0.55, center * (1 + spread)));
      add({
        x: x * d / distance + range(rng, -1.2, 1.2), y: 0.05, z: -d,
        r: color[0], g: color[1], b: color[2],
        intensity: intensity * range(rng, 0.25, 0.7) * (1 - Math.abs(spread) * 2.2),
        kind: SpriteKind.Glint, speed: range(rng, 1.4, 4.2), size: range(rng, 0.9, 1.05),
      });
    }
  };

  // Promenade lamps along the far quay, in districts of warm and cool light.
  for (let x = -3600; x < 3600; x += range(rng, 18, 38)) {
    // Dark stretches (parks, piers) break the promenade into districts.
    if (Math.sin(x * 0.0041 + 1.3) + Math.sin(x * 0.0113) > 1.25 || rng() < 0.08) continue;
    const district = Math.floor((x + 5000) / 420) % 4;
    const color = district === 0 || district === 3 ? cool : district === 1 ? warm : sodium;
    const intensity = range(rng, 0.9, 2.6);
    const y = GROUND_Y + 7;
    add({ x, y, z: SHORE_Z - 4, r: color[0], g: color[1], b: color[2], intensity });
    glintsFor(x, y, SHORE_Z - 4, color, intensity, 9);
  }

  // Riverside boulevard traffic.
  for (let i = 0; i < 70; i++) {
    const eastbound = i % 2 === 0;
    const color: [number, number, number] = eastbound ? [1.0, 0.9, 0.76] : [1.0, 0.1, 0.04];
    add({
      x: 0, y: GROUND_Y + 1, z: SHORE_Z - (eastbound ? 17 : 21),
      r: color[0], g: color[1], b: color[2], intensity: eastbound ? range(rng, 1.4, 2.4) : range(rng, 0.9, 1.6),
      kind: SpriteKind.Moving, phase: range(rng, 0, 7000), speed: range(rng, 9, 17),
      dirX: eastbound ? 1 : -1, dirZ: 0, span: 7000, size: 0.95,
    });
  }

  // A slow river boat with its running lights and a trembling reflection.
  const boatLights: [number, number, number, number, number][] = [
    [0, 7, 1.0, 0.95, 0.85], [-6, 2.4, 1.0, 0.72, 0.42], [-2, 2.4, 1.0, 0.72, 0.42], [2, 2.4, 1.0, 0.72, 0.42], [7, 2.2, 0.2, 1.0, 0.35],
  ];
  for (const [dx, y, r, g, b] of boatLights) {
    const phase = 900 + dx;
    add({ x: 0, y, z: -560, r, g, b, intensity: 1.3, kind: SpriteKind.Moving, phase, speed: 2.6, dirX: 1, dirZ: 0, span: 2600, size: 0.9 });
    for (let k = 0; k < 3; k++) {
      add({ x: 0, y: 0.05, z: -560 + 14 + k * 9, r, g, b, intensity: 0.35 - k * 0.08, kind: SpriteKind.Moving, phase: phase + range(rng, -1.5, 1.5), speed: 2.6, dirX: 1, dirZ: 0, span: 2600, size: 0.95 });
    }
  }

  // City street lights between the buildings (mostly occluded).
  for (let i = 0; i < 420; i++) {
    const color = rng() < 0.55 ? sodium : rng() < 0.5 ? warm : cool;
    add({ x: range(rng, -3600, 3600), y: GROUND_Y + 6, z: range(rng, SHORE_Z - 70, -3600), r: color[0], g: color[1], b: color[2], intensity: range(rng, 0.7, 1.5) });
  }

  // Standout windows, beacons and crowns on each building.
  let windowBudget = 1500;
  for (const b of buildings) {
    const faces: ('front' | 'left' | 'right')[] = ['front', b.x < 0 ? 'right' : 'left'];
    const distance = Math.hypot(b.x, b.z);
    for (const face of faces) {
      const basis = faceBasis(b, face);
      const floors = Math.max(1, Math.floor((b.h - 2) / b.floorH) - 1);
      const columns = Math.max(1, Math.floor(basis.width / b.winW));
      const count = Math.round(floors * columns * b.lit * (face === 'front' ? 0.07 : 0.035) * (distance < 2600 ? 1 : 0.5));
      for (let i = 0; i < count && windowBudget > 0; i++, windowBudget--) {
        const column = Math.floor(rng() * columns);
        const floor = Math.floor(rng() * floors);
        const u = (column + 0.5) * b.winW - columns * b.winW / 2;
        const y = 2 + (floor + 0.5) * b.floorH;
        const tint = rng();
        const base = b.warmth + (tint - 0.5) * 0.6 > 0.55 ? warm : rng() < 0.35 ? blue : cool;
        const colored = rng() < 0.05;
        const color: [number, number, number] = colored ? (rng() < 0.6 ? [0.35, 0.55, 1.0] : [0.9, 0.55, 1.0]) : base;
        add({
          x: basis.cx + basis.tx * u + basis.nx * 0.8, y, z: basis.cz + basis.tz * u + basis.nz * 0.8,
          r: color[0], g: color[1], b: color[2], intensity: range(rng, 0.45, 1.25),
          kind: rng() < 0.16 ? SpriteKind.Toggle : SpriteKind.Static, speed: range(rng, 0.015, 0.05),
        });
      }
    }

    if (b.h > 190 || (b.h > 130 && rng() < 0.3)) {
      const front = faceBasis(b, 'front');
      add({
        x: front.cx + front.nx * 1.2, y: b.h + 1.2, z: front.cz + front.nz * 1.2,
        r: 1.0, g: 0.08, b: 0.03, intensity: range(rng, 0.9, 1.4), kind: SpriteKind.Blink, phase: rng(), speed: range(rng, 0.42, 0.55), size: 0.85,
      });
    }
    if (b.crown > 0) {
      const front = faceBasis(b, 'front');
      const count = 3 + Math.floor(rng() * 4);
      for (let i = 0; i < count; i++) {
        const u = (i / (count - 1) - 0.5) * front.width * 0.8;
        add({
          x: front.cx + front.tx * u + front.nx, y: b.h * range(rng, 0.94, 0.99), z: front.cz + front.tz * u + front.nz,
          r: b.accentColor[0], g: b.accentColor[1], b: b.accentColor[2], intensity: range(rng, 0.8, 1.5) * b.crown,
        });
      }
    }
  }
  return sprites;
}

const BUILDING_VERTEX = /* glsl */ `
attribute vec4 aStyle;
attribute vec4 aGrid;
attribute vec3 aAccent;
attribute vec3 aSize;
varying vec3 vWorld;
varying vec3 vObj;
varying vec3 vObjNormal;
varying vec4 vStyle;
varying vec4 vGrid;
varying vec3 vAccent;
varying vec3 vSize;
void main() {
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vObj = position * aSize;
  vObjNormal = normal;
  vStyle = aStyle;
  vGrid = aGrid;
  vAccent = aAccent;
  vSize = aSize;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FOG = /* glsl */ `
uniform vec3 uFogColor;
uniform float uFogDensity;
vec3 applyFog(vec3 color, vec3 world, float dist) {
  float fog = 1.0 - exp(-dist * uFogDensity);
  fog *= mix(1.0, 0.72, clamp(world.y / 420.0, 0.0, 1.0));
  return mix(color, uFogColor, fog);
}
`;

const BUILDING_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
${GLSL_FILTER}
${FOG}
varying vec3 vWorld;
varying vec3 vObj;
varying vec3 vObjNormal;
varying vec4 vStyle;
varying vec4 vGrid;
varying vec3 vAccent;
varying vec3 vSize;
void main() {
  float style = vStyle.x;
  float litRatio = vStyle.y;
  float warmth = vStyle.z;
  float seed = vStyle.w;
  vec3 n = vObjNormal;
  float dist = length(vWorld - cameraPosition);
  vec3 color = vec3(0.0022, 0.0028, 0.0042);

  if (n.y < 0.5) {
    float u; float faceWidth; float faceId;
    if (abs(n.x) > 0.5) { u = vObj.z; faceWidth = vSize.z; faceId = n.x > 0.0 ? 1.0 : 2.0; }
    else { u = vObj.x; faceWidth = vSize.x; faceId = n.z > 0.0 ? 3.0 : 4.0; }
    float v = vObj.y;
    float winW = vGrid.x;
    float floorH = vGrid.y;
    float uu = (u + faceWidth * 0.5) / winW;
    float vv = (v - 2.0) / floorH;
    vec2 cell = floor(vec2(uu, vv));
    float fs = seed * 9.17 + faceId * 13.3;
    float rnd = hash12(cell + vec2(fs, fs * 0.37));
    float rnd2 = hash12(cell.yx * 1.31 + vec2(fs * 0.71, 3.7));
    float floorRnd = hash12(vec2(cell.y * 0.73 + fs, 11.0));
    float prob;
    if (style < 0.5) prob = litRatio * mix(0.55, 1.45, floorRnd);
    else if (style < 1.5) prob = floorRnd < litRatio ? 0.88 : 0.05;
    else if (style < 2.5) prob = litRatio * mix(0.25, 1.7, hash12(vec2(floor(uu / 5.0), cell.y + fs)));
    else prob = litRatio;
    float topFloor = (vSize.y - 2.0) / floorH - 0.8;
    float lit = step(rnd, prob) * step(0.0, vv) * step(vv, topFloor);
    float fw = fwidth(uu);
    float fh = fwidth(vv);
    float mask;
    if (style > 0.5 && style < 1.5) mask = filteredPulse(vv, 0.18, 0.88, fh) * filteredPulse(uu, 0.03, 0.97, fw);
    else if (style > 1.5 && style < 2.5) mask = filteredPulse(vv, 0.14, 0.9, fh) * filteredPulse(uu, 0.08, 0.92, fw);
    else mask = filteredPulse(uu, 0.18, 0.82, fw) * filteredPulse(vv, 0.24, 0.8, fh);

    vec3 warm = vec3(1.0, 0.7, 0.4);
    vec3 cool = vec3(0.7, 0.83, 1.0);
    vec3 lightColor = mix(cool, warm, clamp(warmth + (rnd2 - 0.5) * 0.55, 0.0, 1.0));
    float bright = 0.35 + 1.5 * rnd2 * rnd2;
    vec3 unlit = vec3(0.005, 0.008, 0.015) * (0.6 + 0.8 * hash12(cell + 7.0));
    color += mask * mix(unlit, lightColor * bright, lit);

    // Street glow washing the base and a faint sky sheen on glass towers.
    color += vec3(0.05, 0.034, 0.018) * exp(-v / 10.0) * 0.5;
    color += vec3(0.004, 0.007, 0.014) * step(1.5, style) * (1.0 - mask);

    float edge = faceWidth * 0.5 - abs(u);
    float strip = (1.0 - smoothstep(0.0, 0.8, edge)) * vGrid.z;
    color += vAccent * strip * 1.8;
    float crown = smoothstep(vSize.y * 0.9, vSize.y, v) * vGrid.w;
    color += (vAccent * 0.55 + lightColor * 0.15) * crown;
  } else {
    color = vec3(0.003, 0.0035, 0.005);
  }

  color = applyFog(color, vWorld, dist);
  gl_FragColor = vec4(color, dist / ${DIST_NORM.toFixed(1)});
}
`;

const WORLD_VERTEX = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const SKY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uGlow;
varying vec3 vWorld;
void main() {
  vec3 d = normalize(vWorld - cameraPosition);
  float e = d.y;
  vec3 color = mix(uHorizon, uZenith, smoothstep(-0.02, 0.55, e));
  color += uGlow * exp(-max(e, 0.0) * 13.0);
  if (e > -0.05) {
    vec2 p = d.xz / (max(e, 0.0) + 0.09);
    float broad = fbm(p * 0.9 + vec2(3.1, 7.7));
    float fine = fbm(p * 3.4 - vec2(1.3, 2.0));
    float clouds = smoothstep(0.32, 0.86, broad * 0.78 + fine * 0.34);
    color *= mix(0.72, 1.45, clouds) ;
  }
  gl_FragColor = vec4(color, 1.0);
}
`;

const GROUND_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
${FOG}
varying vec3 vWorld;
void main() {
  float dist = length(vWorld - cameraPosition);
  vec3 color = vec3(0.0025, 0.0028, 0.0035) * (0.6 + 0.8 * vnoise(vWorld.xz * 0.02));
  // Promenade paving catches the street lamps right behind the quay.
  float promenade = exp(-max(${(SHORE_Z).toFixed(1)} - vWorld.z, 0.0) / 22.0);
  color += vec3(0.05, 0.036, 0.022) * promenade * 0.3;
  color = applyFog(color, vWorld, dist);
  gl_FragColor = vec4(color, dist / ${DIST_NORM.toFixed(1)});
}
`;

const QUAY_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
${FOG}
varying vec3 vWorld;
void main() {
  float dist = length(vWorld - cameraPosition);
  float top = smoothstep(${(GROUND_Y - 0.9).toFixed(2)}, ${GROUND_Y.toFixed(2)}, vWorld.y);
  vec3 color = vec3(0.0035, 0.0036, 0.0042) * (0.7 + 0.6 * vnoise(vWorld.xy * vec2(0.4, 3.0)));
  color += vec3(0.06, 0.042, 0.025) * top * 0.45;
  color = applyFog(color, vWorld, dist);
  gl_FragColor = vec4(color, dist / ${DIST_NORM.toFixed(1)});
}
`;

const WATER_FRAGMENT = /* glsl */ `
${GLSL_NOISE}
${FOG}
uniform sampler2D tReflection;
uniform mat4 uTextureMatrix;
uniform float uSmear;
varying vec3 vWorld;
void main() {
  vec3 view = normalize(vWorld - cameraPosition);
  float cosTheta = abs(view.y);
  float fresnel = 0.02 + 0.98 * pow(1.0 - cosTheta, 5.0);
  vec4 projected = uTextureMatrix * vec4(vWorld, 1.0);
  vec2 uv = projected.xy / projected.w;
  float n1 = gnoise(vWorld.xz * vec2(0.03, 0.55));
  float n2 = gnoise(vWorld.xz * vec2(0.08, 1.3) + 3.0);
  uv.x += (n1 * 0.6 + n2 * 0.4) * 0.0035;
  vec3 sum = vec3(0.0);
  float weight = 0.0;
  for (int i = 0; i < 24; i++) {
    float t = float(i) / 23.0 * 2.0 - 1.0;
    float w = exp(-t * t * 2.2);
    sum += texture2D(tReflection, uv + vec2(0.0, t * uSmear)).rgb * w;
    weight += w;
  }
  vec3 reflection = sum / weight;
  float breakup = 0.55 + 0.9 * smoothstep(0.2, 0.8, vnoise(vWorld.xz * vec2(0.012, 0.25)));
  float dist = length(vWorld - cameraPosition);
  vec3 color = vec3(0.0012, 0.002, 0.0034) + reflection * fresnel * 0.9 * breakup;
  color = applyFog(color, vWorld, dist * 0.7);
  gl_FragColor = vec4(color, dist / ${DIST_NORM.toFixed(1)});
}
`;

const SPRITE_VERTEX = /* glsl */ `
attribute vec3 aPos;
attribute vec3 aColor;
attribute vec4 aParams;
attribute vec4 aMotion;
uniform mat4 uViewProj;
uniform vec3 uEye;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uGain;
uniform float uTime;
uniform sampler2D tDepth;
varying vec2 vCorner;
varying vec3 vColor;
varying vec2 vNdc;
void main() {
  vec3 p = aPos;
  float intensity = aParams.x;
  float kind = aParams.y;
  float phase = aParams.z;
  float speed = aParams.w;
  if (kind > 0.5 && kind < 1.5) {
    float s = mod(phase + uTime * speed, aMotion.z) - 0.5 * aMotion.z;
    p.xz += aMotion.xy * s;
  } else if (kind > 1.5 && kind < 2.5) {
    float c = fract(uTime * speed + phase);
    intensity *= smoothstep(0.0, 0.06, c) * (1.0 - smoothstep(0.3, 0.5, c));
  } else if (kind > 2.5 && kind < 3.5) {
    float a = 0.5 + 0.5 * sin(uTime * speed + phase * 6.2831);
    float b = 0.5 + 0.5 * sin(uTime * speed * 2.37 + phase * 17.0);
    intensity *= 0.12 + 0.88 * pow(a * b, 1.4);
  } else if (kind > 3.5) {
    intensity *= smoothstep(-0.35, 0.35, sin(uTime * speed + phase * 6.2831));
  }
  vec4 clip = uViewProj * vec4(p, 1.0);
  vColor = aColor * intensity * uGain;
  vCorner = position.xy;
  if (clip.w <= 1.0 || intensity < 0.002) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); vNdc = vec2(0.0); return; }
  vec2 ndc = clip.xy / clip.w;
  float sceneDist = textureLod(tDepth, clamp(ndc * 0.5 + 0.5, 0.001, 0.999), 0.0).a * ${DIST_NORM.toFixed(1)};
  float ownDist = length(p - uEye);
  if (abs(ndc.x) < 1.02 && abs(ndc.y) < 1.02 && sceneDist < ownDist - 6.0 - ownDist * 0.012) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  vNdc = ndc;
  gl_Position = vec4(ndc + position.xy * uRadius * aMotion.w * 2.0 / uResolution, 0.0, 1.0);
}
`;

const BOKEH_FRAGMENT = /* glsl */ `
uniform float uAspect;
uniform float uEdge;
uniform float uCatEye;
varying vec2 vCorner;
varying vec3 vColor;
varying vec2 vNdc;
void main() {
  float r = length(vCorner);
  float disc = 1.0 - smoothstep(1.0 - uEdge, 1.0, r);
  vec2 shift = vNdc * vec2(uAspect, 1.0) * uCatEye;
  float r2 = length(vCorner + shift) / 1.08;
  float vignetted = 1.0 - smoothstep(1.0 - uEdge, 1.0, r2);
  float shape = disc * vignetted;
  if (shape <= 0.0) discard;
  float rim = smoothstep(0.55, 0.96, r) * 0.3;
  float rings = 0.035 * sin(r * 27.0);
  vec3 fringe = mix(vec3(1.0), vec3(0.8, 1.03, 1.16), smoothstep(0.8, 1.0, r));
  gl_FragColor = vec4(vColor * shape * (0.78 + rim + rings) * fringe, 0.0);
}
`;

const POINT_FRAGMENT = /* glsl */ `
varying vec2 vCorner;
varying vec3 vColor;
void main() {
  float g = exp(-dot(vCorner, vCorner) * 5.0);
  gl_FragColor = vec4(vColor * g, 0.0);
}
`;

const DISC_BLUR_FRAGMENT = /* glsl */ `
uniform sampler2D tSource;
uniform vec2 uTexel;
uniform float uRadius;
varying vec2 vUv;
#define TAPS 112
void main() {
  vec4 sum = vec4(0.0);
  for (int i = 0; i < TAPS; i++) {
    float r = sqrt((float(i) + 0.5) / float(TAPS));
    float a = float(i) * 2.39996323;
    sum += texture2D(tSource, vUv + vec2(cos(a), sin(a)) * r * uRadius * uTexel);
  }
  gl_FragColor = sum / float(TAPS);
}
`;

const DOWNSAMPLE_FRAGMENT = /* glsl */ `
uniform sampler2D tSource;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec4 a = texture2D(tSource, vUv + uTexel * vec2(-0.5, -0.5));
  vec4 b = texture2D(tSource, vUv + uTexel * vec2(0.5, -0.5));
  vec4 c = texture2D(tSource, vUv + uTexel * vec2(-0.5, 0.5));
  vec4 d = texture2D(tSource, vUv + uTexel * vec2(0.5, 0.5));
  gl_FragColor = (a + b + c + d) * 0.25;
}
`;

const FRAME_COPY_FRAGMENT = /* glsl */ `
uniform sampler2D tSource;
uniform float uFlash;
uniform vec3 uFlashColor;
varying vec2 vUv;
void main() {
  vec4 source = texture2D(tSource, vUv);
  // Lightning lights the cloud deck and, through the haze, the far city.
  float skyMask = smoothstep(0.35, 0.9, source.a);
  vec3 flash = uFlashColor * uFlash * (0.25 + 0.75 * skyMask) * (0.6 + 0.4 * vUv.y);
  gl_FragColor = vec4(source.rgb * (1.0 + uFlash * 0.6) + flash, 1.0);
}
`;

export interface CityPalette {
  zenith: THREE.Color;
  horizon: THREE.Color;
  glow: THREE.Color;
  fog: THREE.Color;
}

export class CityBackdrop {
  readonly camera = new THREE.PerspectiveCamera(40, 1, 4, FAR);
  readonly viewProjection = new THREE.Matrix4();
  private readonly mirrorCamera = new THREE.PerspectiveCamera();
  private readonly mirrorMatrix = new THREE.Matrix4();
  private readonly staticScene = new THREE.Scene();
  private readonly reflectionScene = new THREE.Scene();
  private readonly blurFrameScene = new THREE.Scene();
  private readonly sharpFrameScene = new THREE.Scene();
  private readonly pass = new FullscreenPass();
  private readonly spriteGeometry: THREE.InstancedBufferGeometry;
  private readonly bokehMaterial: THREE.ShaderMaterial;
  private readonly pointMaterial: THREE.ShaderMaterial;
  private readonly blurCopy: THREE.ShaderMaterial;
  private readonly sharpCopy: THREE.ShaderMaterial;
  private readonly downsample: THREE.ShaderMaterial;
  private readonly discBlur: THREE.ShaderMaterial;
  private readonly waterMaterial: THREE.ShaderMaterial;
  private readonly materials: THREE.Material[] = [];
  private readonly geometries: THREE.BufferGeometry[] = [];
  private staticSharp: THREE.WebGLRenderTarget | null = null;
  private reflection: THREE.WebGLRenderTarget | null = null;
  private half: THREE.WebGLRenderTarget | null = null;
  private staticBlur: THREE.WebGLRenderTarget | null = null;
  private blur: THREE.WebGLRenderTarget | null = null;
  private sharp: THREE.WebGLRenderTarget | null = null;
  private dirty = true;
  private width = 1;
  private height = 1;
  private cocRadius = 8;

  constructor(private readonly renderer: THREE.WebGLRenderer, palette: CityPalette, seed = 20240611) {
    const rng = mulberry32(seed);
    const buildings = generateBuildings(rng);
    const sprites = generateSprites(rng, buildings);

    const fogUniforms = { uFogColor: { value: palette.fog }, uFogDensity: { value: 0.00042 } };
    const sky = new THREE.ShaderMaterial({
      vertexShader: WORLD_VERTEX,
      fragmentShader: SKY_FRAGMENT,
      uniforms: { uZenith: { value: palette.zenith }, uHorizon: { value: palette.horizon }, uGlow: { value: palette.glow } },
      side: THREE.BackSide,
      depthWrite: false,
    });
    const buildingMaterial = new THREE.ShaderMaterial({ vertexShader: BUILDING_VERTEX, fragmentShader: BUILDING_FRAGMENT, uniforms: fogUniforms });
    const groundMaterial = new THREE.ShaderMaterial({ vertexShader: WORLD_VERTEX, fragmentShader: GROUND_FRAGMENT, uniforms: fogUniforms, side: THREE.DoubleSide });
    const quayMaterial = new THREE.ShaderMaterial({ vertexShader: WORLD_VERTEX, fragmentShader: QUAY_FRAGMENT, uniforms: fogUniforms, side: THREE.DoubleSide });
    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader: WORLD_VERTEX,
      fragmentShader: WATER_FRAGMENT,
      uniforms: { ...fogUniforms, tReflection: { value: null }, uTextureMatrix: { value: this.mirrorMatrix }, uSmear: { value: 0.045 } },
    });
    this.materials.push(sky, buildingMaterial, groundMaterial, quayMaterial, waterMaterial);

    const skyGeometry = new THREE.SphereGeometry(11000, 48, 24);
    const groundGeometry = new THREE.PlaneGeometry(20000, 12000).rotateX(-Math.PI / 2).translate(0, GROUND_Y, SHORE_Z - 6000);
    const quayGeometry = new THREE.PlaneGeometry(20000, GROUND_Y + 0.6).translate(0, (GROUND_Y + 0.6) / 2 - 0.6, SHORE_Z);
    const waterGeometry = new THREE.PlaneGeometry(20000, -SHORE_Z).rotateX(-Math.PI / 2).translate(0, 0, SHORE_Z / 2);
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
    this.geometries.push(skyGeometry, groundGeometry, quayGeometry, waterGeometry, boxGeometry);

    const buildingMesh = (): THREE.InstancedMesh => {
      const mesh = new THREE.InstancedMesh(boxGeometry, buildingMaterial, buildings.length);
      mesh.frustumCulled = false;
      return mesh;
    };
    const style = new Float32Array(buildings.length * 4);
    const grid = new Float32Array(buildings.length * 4);
    const accent = new Float32Array(buildings.length * 3);
    const size = new Float32Array(buildings.length * 3);
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const primary = buildingMesh();
    const mirrored = buildingMesh();
    buildings.forEach((b, i) => {
      quaternion.setFromAxisAngle(up, b.rot);
      matrix.compose(new THREE.Vector3(b.x, GROUND_Y - 0.5, b.z), quaternion, new THREE.Vector3(b.w, b.h, b.d));
      primary.setMatrixAt(i, matrix);
      mirrored.setMatrixAt(i, matrix);
      style.set([b.style, b.lit, b.warmth, b.seed], i * 4);
      grid.set([b.winW, b.floorH, b.accent, b.crown], i * 4);
      accent.set(b.accentColor, i * 3);
      size.set([b.w, b.h, b.d], i * 3);
    });
    boxGeometry.setAttribute('aStyle', new THREE.InstancedBufferAttribute(style, 4));
    boxGeometry.setAttribute('aGrid', new THREE.InstancedBufferAttribute(grid, 4));
    boxGeometry.setAttribute('aAccent', new THREE.InstancedBufferAttribute(accent, 3));
    boxGeometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(size, 3));

    const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, order = 0) => {
      const result = new THREE.Mesh(geometry, material);
      result.frustumCulled = false;
      result.renderOrder = order;
      return result;
    };
    this.staticScene.add(mesh(skyGeometry, sky, -1), mesh(groundGeometry, groundMaterial), mesh(quayGeometry, quayMaterial), mesh(waterGeometry, waterMaterial), primary);
    this.reflectionScene.add(mesh(skyGeometry, sky, -1), mesh(groundGeometry, groundMaterial), mesh(quayGeometry, quayMaterial), mirrored);
    this.waterMaterial = waterMaterial;

    // Sprites share one instanced quad with two looks: bokeh disc and in-focus point.
    this.spriteGeometry = new THREE.InstancedBufferGeometry();
    this.spriteGeometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3));
    this.spriteGeometry.setIndex([0, 1, 2, 0, 2, 3]);
    const pos = new Float32Array(sprites.length * 3);
    const color = new Float32Array(sprites.length * 3);
    const params = new Float32Array(sprites.length * 4);
    const motion = new Float32Array(sprites.length * 4);
    sprites.forEach((s, i) => {
      pos.set([s.x, s.y, s.z], i * 3);
      color.set([s.r, s.g, s.b], i * 3);
      params.set([s.intensity, s.kind, s.phase, s.speed], i * 4);
      motion.set([s.dirX, s.dirZ, s.span, s.size], i * 4);
    });
    this.spriteGeometry.setAttribute('aPos', new THREE.InstancedBufferAttribute(pos, 3));
    this.spriteGeometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(color, 3));
    this.spriteGeometry.setAttribute('aParams', new THREE.InstancedBufferAttribute(params, 4));
    this.spriteGeometry.setAttribute('aMotion', new THREE.InstancedBufferAttribute(motion, 4));
    this.spriteGeometry.instanceCount = sprites.length;
    this.geometries.push(this.spriteGeometry);

    const spriteUniforms = () => ({
      uViewProj: { value: this.viewProjection },
      uEye: { value: this.camera.position },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uRadius: { value: 8 },
      uGain: { value: 1 },
      uTime: { value: 0 },
      tDepth: { value: null as THREE.Texture | null },
      uAspect: { value: 1 },
      uEdge: { value: 0.12 },
      uCatEye: { value: 0.3 },
    });
    const additive = {
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
      blendSrcAlpha: THREE.ZeroFactor,
      blendDstAlpha: THREE.OneFactor,
    } as const;
    this.bokehMaterial = new THREE.ShaderMaterial({ vertexShader: SPRITE_VERTEX, fragmentShader: BOKEH_FRAGMENT, uniforms: spriteUniforms(), ...additive });
    this.pointMaterial = new THREE.ShaderMaterial({ vertexShader: SPRITE_VERTEX, fragmentShader: POINT_FRAGMENT, uniforms: spriteUniforms(), ...additive });
    this.materials.push(this.bokehMaterial, this.pointMaterial);

    const copyUniforms = () => ({ tSource: { value: null }, uFlash: { value: 0 }, uFlashColor: { value: new THREE.Color(0.2, 0.26, 0.42) } });
    this.blurCopy = passMaterial(FRAME_COPY_FRAGMENT, copyUniforms());
    this.sharpCopy = passMaterial(FRAME_COPY_FRAGMENT, copyUniforms());
    this.downsample = passMaterial(DOWNSAMPLE_FRAGMENT, { tSource: { value: null }, uTexel: { value: new THREE.Vector2() } });
    this.discBlur = passMaterial(DISC_BLUR_FRAGMENT, { tSource: { value: null }, uTexel: { value: new THREE.Vector2() }, uRadius: { value: 4 } });
    this.materials.push(this.blurCopy, this.sharpCopy, this.downsample, this.discBlur);

    const blurCopyMesh = createFullscreenMesh(this.blurCopy);
    const sharpCopyMesh = createFullscreenMesh(this.sharpCopy);
    const bokeh = new THREE.Mesh(this.spriteGeometry, this.bokehMaterial);
    const points = new THREE.Mesh(this.spriteGeometry, this.pointMaterial);
    for (const item of [blurCopyMesh, sharpCopyMesh, bokeh, points]) item.frustumCulled = false;
    bokeh.renderOrder = 1;
    points.renderOrder = 1;
    this.geometries.push(blurCopyMesh.geometry, sharpCopyMesh.geometry);
    this.blurFrameScene.add(blurCopyMesh, bokeh);
    this.sharpFrameScene.add(sharpCopyMesh, points);

    this.camera.position.set(0, CITY_EYE_HEIGHT, 0);
  }

  /** Match the interior camera's orientation; the city is effectively at infinity. */
  setView(quaternion: THREE.Quaternion, fov: number, aspect: number, margin: number) {
    const bgFov = 2 * Math.atan(Math.tan((fov * Math.PI) / 360) * margin) * 180 / Math.PI;
    if (
      Math.abs(bgFov - this.camera.fov) > 1e-4
      || Math.abs(aspect - this.camera.aspect) > 1e-4
      || !this.camera.quaternion.equals(quaternion)
    ) {
      this.camera.fov = bgFov;
      this.camera.aspect = aspect;
      this.camera.quaternion.copy(quaternion);
      this.camera.updateProjectionMatrix();
      this.camera.updateMatrixWorld();
      this.viewProjection.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
      this.dirty = true;
    }
  }

  setSize(width: number, height: number, cocRadius: number) {
    width = Math.max(16, Math.round(width));
    height = Math.max(16, Math.round(height));
    this.cocRadius = cocRadius;
    if (width === this.width && height === this.height && this.staticSharp) return;
    this.width = width;
    this.height = height;
    for (const target of [this.staticSharp, this.reflection, this.half, this.staticBlur, this.blur, this.sharp]) target?.dispose();
    this.staticSharp = createTarget(width, height, { samples: 4, depth: true });
    this.reflection = createTarget(width, height, { samples: 4, depth: true });
    this.half = createTarget(width / 2, height / 2);
    this.staticBlur = createTarget(width / 2, height / 2);
    this.blur = createTarget(width, height);
    this.sharp = createTarget(width, height, { mipmaps: true });
    this.dirty = true;
  }

  get blurTexture() { return this.blur!.texture; }
  get sharpTexture() { return this.sharp!.texture; }

  private renderStatic() {
    const renderer = this.renderer;
    updateMirrorCamera(this.camera, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), this.mirrorCamera, this.mirrorMatrix, false);
    renderer.setRenderTarget(this.reflection);
    renderer.setClearColor(0x000000, 1);
    renderer.clear();
    renderer.render(this.reflectionScene, this.mirrorCamera);
    this.waterMaterial.uniforms.tReflection.value = this.reflection!.texture;

    renderer.setRenderTarget(this.staticSharp);
    renderer.clear();
    renderer.render(this.staticScene, this.camera);

    this.downsample.uniforms.tSource.value = this.staticSharp!.texture;
    this.downsample.uniforms.uTexel.value.set(1 / this.width, 1 / this.height);
    this.pass.render(renderer, this.downsample, this.half);
    this.discBlur.uniforms.tSource.value = this.half!.texture;
    this.discBlur.uniforms.uTexel.value.set(2 / this.width, 2 / this.height);
    this.discBlur.uniforms.uRadius.value = this.cocRadius / 2;
    this.pass.render(renderer, this.discBlur, this.staticBlur);
    this.dirty = false;
  }

  render(time: number, flash: number) {
    if (!this.staticSharp) return;
    if (this.dirty) this.renderStatic();
    const renderer = this.renderer;
    const resolution = new THREE.Vector2(this.width, this.height);
    const configure = (material: THREE.ShaderMaterial, radius: number, gain: number) => {
      material.uniforms.uResolution.value.copy(resolution);
      material.uniforms.uRadius.value = radius;
      material.uniforms.uGain.value = gain;
      material.uniforms.uTime.value = time;
      material.uniforms.tDepth.value = this.staticSharp!.texture;
      material.uniforms.uAspect.value = this.camera.aspect;
      material.uniforms.uEdge.value = Math.min(0.5, 1.6 / Math.max(1, radius));
    };
    configure(this.bokehMaterial, this.cocRadius, 1);
    configure(this.pointMaterial, 1.7, 7);

    this.blurCopy.uniforms.tSource.value = this.staticBlur!.texture;
    this.blurCopy.uniforms.uFlash.value = flash;
    this.sharpCopy.uniforms.tSource.value = this.staticSharp!.texture;
    this.sharpCopy.uniforms.uFlash.value = flash;
    renderer.setRenderTarget(this.blur);
    renderer.render(this.blurFrameScene, this.camera);
    renderer.setRenderTarget(this.sharp);
    renderer.render(this.sharpFrameScene, this.camera);
  }

  dispose() {
    for (const target of [this.staticSharp, this.reflection, this.half, this.staticBlur, this.blur, this.sharp]) target?.dispose();
    for (const material of this.materials) material.dispose();
    for (const geometry of this.geometries) geometry.dispose();
    this.pass.dispose();
  }
}
