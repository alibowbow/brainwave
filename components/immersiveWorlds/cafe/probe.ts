import * as T from 'three';

/*
 * Code-generated radiance probes, prefiltered with PMREM on the HDR path only
 * (PMREM renders into half-float targets, so the byte path keeps the baked
 * RoomEnvironment atlas). Both are tiny emissive stand-in scenes laid out like
 * the real café and street, so glossy surfaces reflect what is actually there:
 *  - room: dark warm walls, the cold blue-hour window band with a few warm
 *    street lights, the table lamp, the pendants and the shelf strip;
 *  - street: a blue-hour sky gradient, dark façades with lit windows and the
 *    café's own warm frontage, for the wet paving and outside glass.
 */

const basic = (color: T.Color, side: T.Side = T.FrontSide) => new T.MeshBasicMaterial({ color, side, toneMapped: false });
const rgb = (r: number, g: number, b: number) => new T.Color(r, g, b);

function disposeProbe(scene: T.Scene) {
  scene.traverse(object => {
    if (object instanceof T.Mesh) {
      object.geometry.dispose();
      (object.material as T.Material).dispose();
    }
  });
}

function skyGradient(radius: number, top: T.Color, horizon: T.Color, ground: T.Color) {
  const geometry = new T.SphereGeometry(radius, 32, 16);
  const colors: number[] = [];
  const position = geometry.getAttribute('position');
  const c = new T.Color();
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i) / radius;
    if (y >= 0) c.copy(horizon).lerp(top, Math.pow(y, 0.6));
    else c.copy(horizon).lerp(ground, Math.min(1, -y * 4));
    colors.push(c.r, c.g, c.b);
  }
  geometry.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
  return new T.Mesh(geometry, new T.MeshBasicMaterial({ vertexColors: true, side: T.BackSide, toneMapped: false }));
}

function panel(scene: T.Scene, color: T.Color, w: number, h: number, x: number, y: number, z: number, facing: T.Vector3) {
  const mesh = new T.Mesh(new T.PlaneGeometry(w, h), basic(color, T.DoubleSide));
  mesh.position.set(x, y, z);
  mesh.lookAt(facing);
  scene.add(mesh);
  return mesh;
}

function blob(scene: T.Scene, color: T.Color, radius: number, x: number, y: number, z: number) {
  const mesh = new T.Mesh(new T.SphereGeometry(radius, 12, 8), basic(color));
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}

export interface CafeProbes {
  room: T.WebGLRenderTarget;
  street: T.WebGLRenderTarget;
  dispose(): void;
}

/** Prefilters both probes; call only when half-float targets are known to work. */
export function bakeCafeProbes(renderer: T.WebGLRenderer, layout: {
  glass: { x: number; y: number; z: number; w: number; h: number };
  lamp: T.Vector3;
  pendants: T.Vector3[];
}): CafeProbes {
  const pmrem = new T.PMREMGenerator(renderer);
  const centre = new T.Vector3(-0.6, 1.15, -0.4);
  let room: T.WebGLRenderTarget | null = null;
  let street: T.WebGLRenderTarget | null = null;
  try {
    // Room probe: a warm, mostly dark box around the window seat.
    const roomScene = new T.Scene();
    const box = new T.Mesh(new T.BoxGeometry(14, 4.2, 18), basic(rgb(0.016, 0.011, 0.008), T.BackSide));
    box.position.set(1.5, 2.1, -1.5);
    roomScene.add(box);
    const floor = new T.Mesh(new T.PlaneGeometry(14, 18), basic(rgb(0.02, 0.012, 0.007), T.DoubleSide));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(1.5, 0.01, -1.5);
    roomScene.add(floor);
    const g = layout.glass;
    // The window: deep blue upper sky, lighter band at the street, warm specks of shop light.
    panel(roomScene, rgb(0.03, 0.05, 0.095), g.w, g.h * 0.55, g.x, g.y + g.h * 0.22, g.z - 0.05, new T.Vector3(g.x, g.y + g.h * 0.22, 5));
    panel(roomScene, rgb(0.05, 0.065, 0.09), g.w, g.h * 0.45, g.x, g.y - g.h * 0.27, g.z - 0.06, new T.Vector3(g.x, g.y - g.h * 0.27, 5));
    for (const [x, y, s] of [[-4.2, 1.3, 0.5], [-3.1, 2.1, 0.28], [-1.9, 1.1, 0.6], [-0.8, 1.9, 0.3], [0.2, 1.25, 0.45], [-2.6, 2.7, 0.25]]) {
      panel(roomScene, rgb(1.6, 1.1, 0.6), s, s * 0.7, x, y, g.z - 0.04, new T.Vector3(x, y, 5));
    }
    blob(roomScene, rgb(9, 6.2, 3.4), 0.14, layout.lamp.x, layout.lamp.y, layout.lamp.z);
    for (const p of layout.pendants) {
      const disc = new T.Mesh(new T.CircleGeometry(0.22, 20), basic(rgb(14, 10, 6)));
      disc.position.copy(p);
      disc.rotation.x = Math.PI / 2;
      roomScene.add(disc);
    }
    panel(roomScene, rgb(1.2, 0.75, 0.38), 5, 0.06, 4.2, 1.95, -8.6, new T.Vector3(4.2, 1.95, 0));
    blob(roomScene, rgb(3.2, 2.0, 1.0), 0.18, 1.4, 1.9, 2.8);
    panel(roomScene, rgb(0.05, 0.032, 0.02), 6, 2.5, 0.5, 1.4, 4.5, new T.Vector3(0.5, 1.4, 0));
    panel(roomScene, rgb(1.2, 0.75, 0.38), 5, 0.06, 4.2, 2.6, -8.6, new T.Vector3(4.2, 2.6, 0));
    room = pmrem.fromScene(roomScene, 0.04, 0.05, 40, { size: 128, position: centre });
    disposeProbe(roomScene);

    // Street probe: sky, façades and the café frontage behind the viewer.
    const streetScene = new T.Scene();
    streetScene.add(skyGradient(60, rgb(0.014, 0.03, 0.08), rgb(0.06, 0.08, 0.125), rgb(0.008, 0.01, 0.013)));
    panel(streetScene, rgb(0.012, 0.016, 0.022), 40, 10, -5, 5, -18, new T.Vector3(-5, 5, 0));
    for (let i = 0; i < 26; i++) {
      const x = -22 + (i * 7.3) % 30, y = 3.2 + ((i * 3.7) % 6.5);
      panel(streetScene, i % 3 ? rgb(1.3, 0.85, 0.45) : rgb(0.25, 0.32, 0.4), 0.9, 1.1, x, y, -17.8, new T.Vector3(x, y, 0));
    }
    panel(streetScene, rgb(2.2, 1.4, 0.7), 4.5, 1.6, -7, 1.2, -17.7, new T.Vector3(-7, 1.2, 0));
    panel(streetScene, rgb(1.8, 1.15, 0.6), 4, 1.6, 1.5, 1.2, -17.7, new T.Vector3(1.5, 1.2, 0));
    // The café's own window and lamps behind the viewer warm the near paving.
    panel(streetScene, rgb(0.28, 0.18, 0.09), 6, 3.4, -2.1, 2.1, -1.4, new T.Vector3(-2.1, 2.1, -20));
    for (const [x, z] of [[-5.3, -8.6], [-11.9, -13.9], [2.4, -14.2]]) blob(streetScene, rgb(40, 28, 15), 0.12, x, 3.5, z);
    street = pmrem.fromScene(streetScene, 0.03, 0.05, 80, { size: 128, position: new T.Vector3(-3, 0.4, -8) });
    disposeProbe(streetScene);
  } catch (error) {
    room?.dispose();
    street?.dispose();
    throw error;
  } finally {
    pmrem.dispose();
  }
  const result = { room: room!, street: street! };
  return {
    ...result,
    dispose() { result.room.dispose(); result.street.dispose(); },
  };
}
