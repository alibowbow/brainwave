import {describe,it,expect} from 'vitest';
import {createPlant,createBotany} from '../botany';
import {createCosmicSky} from '../sky';
import {cosmicPixelRatio} from '../CosmicEngine';
import * as THREE from 'three';

describe('cosmic botanical resources',()=>{
 it('keeps curved foliage finite at varied seeds and has reachable leaf surfaces',()=>{
   for(const kind of ['fern','broadleaf','grass','blossom'] as const){
     const plant=createPlant(kind,54);
     expect(plant.interactables.length).toBeGreaterThan(0);
     let triangles=0;
     plant.group.traverse(o=>{if(o instanceof THREE.Mesh){
       const p=o.geometry.getAttribute('position');
       expect(Array.from(p.array).every(Number.isFinite)).toBe(true);
       expect(Array.from(o.geometry.getAttribute('normal').array).every(Number.isFinite)).toBe(true);
       expect(o.geometry.boundingSphere?.radius).toBeLessThan(4);
       triangles+=o.geometry.index!.count/3;
     }});
     expect(triangles).toBeGreaterThan(500);plant.dispose();
   }
 });
 it('releases every botanical geometry/material once, even with repeated dispose',()=>{
   const plant=createBotany(22);const resources=new Set<THREE.BufferGeometry|THREE.Material>();
   plant.group.traverse(o=>{if(o instanceof THREE.Mesh){resources.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>resources.add(m));}});
   const counts=new Map<object,number>();resources.forEach(r=>r.addEventListener('dispose',()=>counts.set(r,(counts.get(r)||0)+1)));
   plant.update(4);plant.dispose();plant.dispose();resources.forEach(r=>expect(counts.get(r)).toBe(1));
 });
});

describe('cosmic sky lifecycle',()=>{
 it('releases shared spheres, shader materials and star buffers exactly once',()=>{
   const sky=createCosmicSky();const resources=new Set<THREE.BufferGeometry|THREE.Material>();
   sky.group.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Points){resources.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>resources.add(m));}});
   const counts=new Map<object,number>();resources.forEach(r=>r.addEventListener('dispose',()=>counts.set(r,(counts.get(r)||0)+1)));
   sky.update(600);sky.dispose();sky.dispose();resources.forEach(r=>expect(counts.get(r)).toBe(1));
 });
});

describe('quality budget',()=>{
 it('preserves full standard resolution and high-DPI portrait while bounding large buffers',()=>{
   expect(cosmicPixelRatio(1280,800,1)).toBe(1);
   expect(cosmicPixelRatio(390,844,3)).toBe(2);
   const dpr=cosmicPixelRatio(3840,2160,2);
   expect(3840*2160*dpr*dpr).toBeLessThanOrEqual(3_600_001);
   expect(cosmicPixelRatio(1280,800,1,.8)).toBe(.8);
 });
});
