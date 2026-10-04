import * as THREE from 'three';

/**
 * An original, entirely procedural sky. The nebula is a pair of distant shells
 * with direction-space density fields, not a volume raymarch. Their different
 * scale, opacity and extremely slow drift suggest layers without a full-screen
 * integration loop. The planets and rings are real, depth-tested geometry.
 */
const NOISE = /* glsl */ `
  float hash31(vec3 p) {
    p = fract(p * .1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }
  float noise3(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash31(i), hash31(i + vec3(1,0,0)), f.x),
                   mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
                   mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v = .52 * noise3(p);
    p = p * 2.03 + vec3(12.1, 4.7, 8.3);
    v += .26 * noise3(p);
    p = p * 2.01 + vec3(6.4, 2.8, 17.1);
    v += .13 * noise3(p);
    p = p * 2.02 + vec3(3.2, 9.3, 5.1);
    return v + .065 * noise3(p);
  }
`;

const SKY_VERTEX = /* glsl */ `
  varying vec3 vDirection;
  void main() {
    vDirection = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const NEBULA_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec3 vDirection;
  ${NOISE}
  void main() {
    vec3 d = normalize(vDirection);
    vec3 p = d * 4.2 + vec3(uTime * .00042, 0.0, 0.0);
    float warp = fbm(p + vec3(4.1, 8.2, 1.7));
    float clouds = fbm(p * 2.2 + vec3(warp * 1.8));
    float detail = noise3(p * 21.0 + warp * 3.0);

    // A broad, irregular river of dust, with separate dense ridges and cavities.
    float axis = d.y - .21 - d.x * .24 - sin(d.x * 4.8 - 1.1) * .065;
    float band = exp(-pow((axis + (warp - .5) * .38) * 4.3, 2.0));
    float forward = 1.0 - smoothstep(-.75, .25, d.z);
    float mass = band * smoothstep(.24, .78, clouds) * forward;
    float ridge = pow(max(0.0, 1.0 - abs(clouds - .49) * 7.0), 3.0);
    float dust = smoothstep(.39, .65, fbm(p * 1.3 + vec3(13.0))) * band;

    vec3 col = mix(vec3(.013, .021, .052), vec3(.030, .048, .080),
                   exp(-abs(d.y + .03) * 2.4));
    col += vec3(.024, .020, .057) * fbm(p * .58 + 21.0);
    vec3 cool = mix(vec3(.045, .135, .157), vec3(.120, .225, .245), clouds);
    vec3 warm = vec3(.255, .132, .115);
    float warmth = smoothstep(-.30, .62, d.x) * .79;
    col += mix(cool, warm, warmth) * mass * 1.18;
    col += mix(vec3(.10, .20, .22), vec3(.24, .15, .13), warmth)
         * ridge * band * forward * .13 * (.65 + .35 * detail);
    col *= 1.0 - dust * forward * .38;
    // A little scattered blue at the horizon separates the distant islands.
    col += vec3(.013, .030, .039) * exp(-pow((d.y + .025) * 5.5, 2.0));
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const VEIL_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec3 vDirection;
  ${NOISE}
  void main() {
    vec3 d = normalize(vDirection);
    vec3 p = d * 6.5 + vec3(8.0, -uTime * .00024, 11.0);
    float n = fbm(p);
    float axis = d.y - .32 - .19 * d.x + (n - .5) * .24;
    float ribbon = exp(-axis * axis * 90.0);
    float filaments = pow(smoothstep(.39, .69, fbm(p * 2.6 + n)), 2.0);
    float alpha = ribbon * filaments * (1.0 - smoothstep(-.75, .1, d.z)) * .17;
    gl_FragColor = vec4(mix(vec3(.10, .30, .32), vec3(.36, .19, .17),
      smoothstep(-.2, .65, d.x)), alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const PLANET_VERTEX = /* glsl */ `
  varying vec3 vLocal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vLocal = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

// One direction keeps the surface terminator, high clouds, limb and ring shadow
// coherent. Side lighting gives the sphere a readable crescent of night.
const SUN_DIRECTION = 'normalize(vec3(-.78, .40, .28))';

const PLANET_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uCompanion;
  varying vec3 vLocal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  ${NOISE}
  void main() {
    vec3 p = normalize(vLocal);
    // Large cloud decks remain legible across the whole sphere. The much
    // finer flow only bends their edges; it never breaks them into marbling.
    float flow = fbm(vec3(p.x * 4.5, p.y * 3.0, p.z * 4.5));
    float fine = fbm(vec3(p.x * 22.0, p.y * 10.0, p.z * 22.0) + flow);
    float latitude = p.y + (flow - .5) * .048 + (fine - .5) * .011;
    float broad = .5 + .5 * sin(latitude * 24.0 + .32 * sin(latitude * 7.0));
    float belts = smoothstep(.23, .80, broad);
    float ribbons = .5 + .5 * sin(latitude * 103.0 + flow * 1.7);
    float threads = .5 + .5 * sin(latitude * 237.0 + fine * 1.3);
    vec3 stone = mix(vec3(.12, .205, .225), vec3(.43, .52, .50), belts);
    float ochre = smoothstep(.44, .65, sin(latitude * 10.5 + 1.2) * .5 + .5);
    stone = mix(stone, mix(vec3(.265,.25,.215), vec3(.59,.52,.39), belts), ochre * .63);
    stone *= .92 + ribbons * .12 + threads * .035;
    // Restrained storm curls within selected dark belts, under the high deck.
    stone += vec3(.070,.082,.070) * (fine - .44) * (1.0 - belts) * .8;
    vec3 moon = mix(vec3(.125, .14, .20), vec3(.41, .38, .36), flow);
    moon *= .78 + fine * .48;
    stone = mix(stone, moon, uCompanion);
    vec3 normalWorld = normalize(vWorldNormal);
    vec3 light = ${SUN_DIRECTION};
    float sun = dot(normalWorld, light);
    float day = smoothstep(-.025, .085, sun);
    float diffuse = pow(max(sun, 0.0), .72) * day;
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(normalWorld, viewDirection), 0.0), 4.4);
    vec3 color = stone * (vec3(.023, .038, .067) + diffuse * vec3(1.10, 1.025, .89));
    color += vec3(.13,.28,.36) * rim * smoothstep(-.09, .42, sun) * .32;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const CLOUD_FRAGMENT = /* glsl */ `
  varying vec3 vLocal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  ${NOISE}
  void main() {
    vec3 p = normalize(vLocal);
    float flow = fbm(vec3(p.x * 8.0, p.y * 4.0, p.z * 8.0) + 9.2);
    float latitude = p.y + (flow - .5) * .041;
    float veil = fbm(vec3(p.x * 28.0, p.y * 10.0, p.z * 28.0));
    float decks = smoothstep(.72, .95, .5 + .5 * sin(latitude * 71.0 + flow));
    float strands = smoothstep(.63, .88, .5 + .5 * sin(latitude * 183.0 + flow * 1.8));
    float clouds = (decks * .20 + strands * .07) * smoothstep(.23, .7, veil);
    float sun = dot(normalize(vWorldNormal), ${SUN_DIRECTION});
    float day = smoothstep(-.035, .14, sun);
    vec3 color = vec3(.55,.65,.64) * (.10 + .9 * pow(max(sun, 0.0), .65));
    gl_FragColor = vec4(color, clouds * day);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 5.4);
    float sun = dot(n, ${SUN_DIRECTION});
    float light = smoothstep(-.13, .6, sun);
    gl_FragColor = vec4(vec3(.18, .42, .64), rim * light * .38);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const RING_VERTEX = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  void main() {
    vPosition = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const RING_FRAGMENT = /* glsl */ `
  uniform vec3 uPlanetPosition;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  void main() {
    float r = length(vPosition.xy);
    float t = (r - 20.3) / 10.3;
    float edge = smoothstep(0.0, .055, t) * (1.0 - smoothstep(.87, 1.0, t));
    // Fine radial strata fade at subpixel width instead of producing moire.
    float radialPixel = max(fwidth(r), .0001);
    float grains = .59 + .16 * sin(r * 22.0) * (1.0 - smoothstep(.045, .12, radialPixel))
                       + .055 * sin(r * 63.0) * (1.0 - smoothstep(.015, .045, radialPixel));
    float division = 1.0 - smoothstep(.015, .035, abs(t - .61));
    float broad = .7 + .3 * sin(t * 19.0);
    vec3 color = mix(vec3(.29,.38,.40), vec3(.52,.45,.35), t);
    vec3 toCenter = uPlanetPosition - vWorldPosition;
    vec3 light = ${SUN_DIRECTION};
    float projection = dot(toCenter, light);
    float distanceFromRay = sqrt(max(0.0, dot(toCenter, toCenter) - projection * projection));
    float shadow = smoothstep(15.5, 17.3, distanceFromRay);
    shadow = mix(1.0, shadow, smoothstep(0.0, 2.0, projection));
    color *= .2 + .8 * shadow;
    gl_FragColor = vec4(color, edge * grains * broad * (1.0 - division * .93) * .45);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const STAR_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vIntensity;
  void main() {
    vColor = aColor;
    // No flashing: the faintest variation takes well over a minute.
    vIntensity = .91 + .09 * sin(uTime * .041 + aPhase);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vIntensity;
  void main() {
    vec2 p = gl_PointCoord - .5;
    float d = length(p);
    float core = exp(-d * d * 30.0);
    float halo = exp(-d * d * 8.0) * .16;
    float a = (core + halo) * (1.0 - smoothstep(.3, .5, d)) * vIntensity;
    gl_FragColor = vec4(vColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function createCosmicSky(): {
  group: THREE.Group;
  update(time: number): void;
  dispose(): void;
} {
  const group = new THREE.Group();
  group.name = 'cosmic-sky';
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const timeUniform = { value: 0 };

  function ownGeometry<T extends THREE.BufferGeometry>(geometry: T): T {
    geometries.push(geometry);
    return geometry;
  }
  function ownMaterial<T extends THREE.Material>(material: T): T {
    materials.push(material);
    return material;
  }

  const dome = new THREE.Mesh(
    ownGeometry(new THREE.SphereGeometry(230, 48, 32)),
    ownMaterial(new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform },
      vertexShader: SKY_VERTEX,
      fragmentShader: NEBULA_FRAGMENT,
      side: THREE.BackSide,
      depthWrite: false,
    })),
  );
  dome.name = 'distant-nebula-shell';
  dome.renderOrder = -100;
  group.add(dome);

  const veil = new THREE.Mesh(
    ownGeometry(new THREE.SphereGeometry(205, 32, 24)),
    ownMaterial(new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform },
      vertexShader: SKY_VERTEX,
      fragmentShader: VEIL_FRAGMENT,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })),
  );
  veil.name = 'near-nebula-filaments';
  veil.renderOrder = -90;
  group.add(veil);

  const random = seededRandom(482092);
  const starCount = 2600;
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);
  const phases = new Float32Array(starCount);
  const colors = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i += 1) {
    const y = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const r = Math.sqrt(1 - y * y);
    const distance = 175 + random() * 20;
    positions.set([r * Math.cos(angle) * distance, y * distance, r * Math.sin(angle) * distance], i * 3);
    const brightness = random();
    sizes[i] = brightness > .984 ? 3.7 : .75 + Math.pow(brightness, 3) * 1.85;
    phases[i] = random() * Math.PI * 2;
    const warmth = random();
    const intensity = .35 + brightness * .65;
    colors.set([
      (warmth > .82 ? 1.0 : .66 + warmth * .25) * intensity,
      (.76 + warmth * .14) * intensity,
      (warmth > .82 ? .68 : 1.0) * intensity,
    ], i * 3);
  }
  const starGeometry = ownGeometry(new THREE.BufferGeometry());
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  starGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  starGeometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  const stars = new THREE.Points(starGeometry, ownMaterial(new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform },
    vertexShader: STAR_VERTEX,
    fragmentShader: STAR_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })));
  stars.name = 'fine-distant-stars';
  stars.renderOrder = -70;
  group.add(stars);

  const planetPosition = new THREE.Vector3(19, 24, -78);
  const planetGeometry = ownGeometry(new THREE.SphereGeometry(16.8, 96, 64));
  const planet = new THREE.Mesh(planetGeometry, ownMaterial(new THREE.ShaderMaterial({
    uniforms: { uTime: timeUniform, uCompanion: { value: 0 } },
    vertexShader: PLANET_VERTEX,
    fragmentShader: PLANET_FRAGMENT,
  })));
  planet.name = 'aurelia-gas-giant';
  planet.position.copy(planetPosition);
  planet.rotation.set(.16, -.4, -.27);
  group.add(planet);

  const clouds = new THREE.Mesh(planetGeometry, ownMaterial(new THREE.ShaderMaterial({
    vertexShader: PLANET_VERTEX,
    fragmentShader: CLOUD_FRAGMENT,
    transparent: true,
    depthWrite: false,
  })));
  clouds.name = 'aurelia-high-cloud-deck';
  clouds.position.copy(planetPosition);
  clouds.rotation.copy(planet.rotation);
  clouds.scale.setScalar(1.0035);
  clouds.renderOrder = -45;
  group.add(clouds);

  const atmosphere = new THREE.Mesh(planetGeometry, ownMaterial(new THREE.ShaderMaterial({
    vertexShader: PLANET_VERTEX,
    fragmentShader: ATMOSPHERE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })));
  atmosphere.name = 'aurelia-thin-atmosphere';
  atmosphere.position.copy(planetPosition);
  atmosphere.scale.setScalar(1.013);
  atmosphere.renderOrder = -40;
  group.add(atmosphere);

  const rings = new THREE.Mesh(
    ownGeometry(new THREE.RingGeometry(20.3, 30.6, 192, 1)),
    ownMaterial(new THREE.ShaderMaterial({
      uniforms: { uPlanetPosition: { value: planetPosition } },
      vertexShader: RING_VERTEX,
      fragmentShader: RING_FRAGMENT,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })),
  );
  rings.name = 'aurelia-dust-rings';
  rings.position.copy(planetPosition);
  // Account for the seated view looking up at the planet: this plane presents
  // a shallow, slanted ellipse, rather than a circular halo around the limb.
  rings.rotation.set(1.48, .40, 0);
  rings.renderOrder = -35;
  group.add(rings);

  const moon = new THREE.Mesh(
    ownGeometry(new THREE.SphereGeometry(4.1, 48, 32)),
    ownMaterial(new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform, uCompanion: { value: 1 } },
      vertexShader: PLANET_VERTEX,
      fragmentShader: PLANET_FRAGMENT,
    })),
  );
  moon.name = 'distant-companion-moon';
  moon.position.set(-34, 20, -113);
  moon.rotation.set(.4, .3, .1);
  group.add(moon);

  let disposed = false;
  return {
    group,
    update(time: number) {
      if (disposed) return;
      timeUniform.value = time;
      planet.rotation.y = -.4 + time * .00032;
      clouds.rotation.y = -.4 + time * .00054;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      group.clear();
    },
  };
}
