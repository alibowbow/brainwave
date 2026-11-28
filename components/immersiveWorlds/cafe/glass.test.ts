import { describe, expect, it } from 'vitest';
import * as T from 'three';
import { cafeGlassShader, createCafeDepthVolume, createExteriorBokeh, GLASS_FRAGMENT, MAX_HALO_LAMPS } from './glass';
import { CAFE_GLASS, cafeShot } from './world';

describe('cafe rain glass', () => {
  it('provides the uniforms Reflector writes plus the refraction, depth and bokeh inputs', () => {
    const shader = cafeGlassShader(new T.Vector2(CAFE_GLASS.w, CAFE_GLASS.h));
    for (const name of ['color', 'tDiffuse', 'textureMatrix', 'tSharp', 'tSharpDepth', 'tBokeh', 'resolution', 'wipe', 'wipeAge', 'time']) {
      expect(shader.uniforms).toHaveProperty(name);
    }
    expect(shader.uniforms.glassSize.value.toArray()).toEqual([CAFE_GLASS.w, CAFE_GLASS.h]);
  });

  it('outputs linear radiance and leaves tone mapping and sRGB to three (no-ops on the HDR target)', () => {
    expect(GLASS_FRAGMENT).toContain('#include <tonemapping_fragment>');
    expect(GLASS_FRAGMENT).toContain('#include <colorspace_fragment>');
  });

  it('pads the street-lamp halo list to a fixed size and copies colours', () => {
    const color = new T.Color(1, .8, .5);
    const material = createExteriorBokeh({ glassZ: CAFE_GLASS.z, lamps: [{ position: new T.Vector3(1, 2, -9), color, strength: .08 }] });
    const lamps = material.uniforms.uLamps.value as T.Vector4[];
    expect(lamps).toHaveLength(MAX_HALO_LAMPS);
    expect(lamps[0].toArray()).toEqual([1, 2, -9, .08]);
    expect(lamps.slice(1).every(lamp => lamp.w === 0)).toBe(true);
    expect(material.uniforms.uLampColors.value[0]).not.toBe(color);
    expect(material.toneMapped).toBe(false);
    material.dispose();
  });

  it('scales the room depth of field with the volume target and keeps glass pixels untouched', () => {
    const volume = createCafeDepthVolume({ color: new T.Texture(), glass: CAFE_GLASS, lights: [] });
    volume.material.uniforms.uResolution = { value: new T.Vector2(640, 400) };
    volume.update?.(0, new T.PerspectiveCamera());
    const small = volume.uniforms.uMaxRadius.value as number;
    volume.material.uniforms.uResolution.value.set(1280, 800);
    volume.update?.(0, new T.PerspectiveCamera());
    expect(volume.uniforms.uMaxRadius.value).toBeCloseTo(small * 2, 5);
    expect(volume.material.fragmentShader).toContain('cdvOnGlass(hit)');
    volume.material.dispose();
  });
});

describe('cafe shot', () => {
  it('keeps cup and lamp on the window table, lamp behind the cup, at every aspect', () => {
    for (const portrait of [0, .5, 1]) {
      const shot = cafeShot(portrait);
      expect(shot.lamp.z).toBeLessThan(shot.cup.z);
      for (const prop of [shot.cup, shot.lamp, shot.book]) {
        expect(prop.z).toBeGreaterThan(CAFE_GLASS.z + .2);
        expect(prop.z).toBeLessThan(shot.camera.z);
      }
      expect(shot.fov).toBeGreaterThanOrEqual(48);
      expect(shot.fov).toBeLessThanOrEqual(62);
    }
  });

  it('frames the seat from the middle ground, about three metres from the glass', () => {
    for (const portrait of [0, .5, 1]) {
      const shot = cafeShot(portrait);
      const toGlass = shot.camera.z - CAFE_GLASS.z;
      expect(toGlass).toBeGreaterThanOrEqual(2.8);
      expect(toGlass).toBeLessThanOrEqual(3.5);
    }
  });

  it('keeps the cup inside the lit cone below the lamp shade so the latte reads', () => {
    for (const portrait of [0, .5, 1]) {
      const shot = cafeShot(portrait);
      const reach = Math.hypot(shot.cup.x - shot.lamp.x, shot.cup.z - shot.lamp.z);
      expect(reach).toBeLessThan(.74);
    }
  });
});
