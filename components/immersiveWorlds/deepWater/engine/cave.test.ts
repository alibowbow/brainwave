import { afterEach, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { createCave } from './cave';
import type { WorldContent } from './types';

const created: WorldContent[]=[];
function world() {
  const result=createCave({getPixelRatio:()=>1} as THREE.WebGLRenderer);
  result.scene.updateMatrixWorld(true);
  created.push(result);return result;
}
afterEach(()=>{
  created.splice(0).forEach(w=>{
    w.dispose?.();
    const materials=new Set<THREE.Material>();
    w.scene.traverse(o=>{if(o instanceof THREE.Mesh || o instanceof THREE.Points){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));}});
    materials.forEach(m=>m.dispose());
  });
});

describe('cavern world spatial contracts',()=>{
  it('contains finite geometry in metre-scale depth, with the seated eye above the water',()=>{
    const w=world();
    const shell=w.scene.getObjectByName('cave-continuous-limestone-shell') as THREE.Mesh;
    shell.geometry.computeBoundingBox();
    const size=shell.geometry.boundingBox!.getSize(new THREE.Vector3());
    expect(size.z).toBeGreaterThan(60);expect(size.x).toBeGreaterThan(20);expect(size.y).toBeGreaterThan(12);
    const pool=w.scene.getObjectByName('deepwater-reflective-pool')!;
    expect(w.camera.position.y-pool.position.y).toBeGreaterThan(1.5);
    expect(w.camera.position.y-pool.position.y).toBeLessThan(3);
    let invalid=0;
    w.scene.traverse(o=>{if(o instanceof THREE.Mesh || o instanceof THREE.Points)for(const value of o.geometry.attributes.position.array)if(!Number.isFinite(value))invalid++;});
    expect(invalid).toBe(0);
  });

  it('leaves an actual unobstructed roof opening for the daylight shaft',()=>{
    const w=world();
    const shell=w.scene.getObjectByName('cave-continuous-limestone-shell')!;
    const aperture=w.scene.getObjectByName('cave-daylight-aperture')!;
    const origin=new THREE.Vector3(-2,.03,-12.3);
    const direction=aperture.position.clone().sub(origin);
    const ray=new THREE.Raycaster(origin,direction.clone().normalize(),0,direction.length());
    expect(ray.intersectObject(shell,false)).toHaveLength(0);
  });

  it('accepts a visible pool touch but rejects a foreground ledge touch',()=>{
    const w=world();
    const touch=(p:THREE.Vector3)=>w.interact?.(new THREE.Raycaster(w.camera.position,p.sub(w.camera.position).normalize()),3);
    expect(touch(new THREE.Vector3(0,.02,-8))?.kind).toBe('pool-ripple');
    expect(touch(new THREE.Vector3(-4,.45,7.2))).toBeNull();
  });

  it('returns the same moisture positions for a frozen timestamp',()=>{
    const w=world();
    const points=w.scene.children.find(o=>o instanceof THREE.Points) as THREE.Points;
    w.update(5,0);
    const first=Array.from(points.geometry.attributes.position.array);
    w.update(5,0);
    expect(Array.from(points.geometry.attributes.position.array)).toEqual(first);
  });

  it('disposes the owned reflection target once across repeated cleanup',()=>{
    const w=world();
    const mirror=w.scene.getObjectByName('deepwater-reflective-pool') as Reflector;
    let count=0;
    mirror.getRenderTarget().addEventListener('dispose',()=>count++);
    w.dispose?.();w.dispose?.();expect(count).toBe(1);
  });
});
