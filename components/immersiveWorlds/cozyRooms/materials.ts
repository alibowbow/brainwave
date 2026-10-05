import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// All maps are authored here procedurally. No borrowed images or network requests.
function rng(seed: number) { return () => { seed = Math.imul(1664525, seed) + 1013904223 | 0; return (seed >>> 0) / 4294967296; }; }
function noise(x:number,y:number) {
  const hash=(i:number,j:number)=>{let v=Math.imul(i,374761393)+Math.imul(j,668265263);v=Math.imul(v^(v>>>13),1274126177);return ((v^(v>>>16))>>>0)/4294967296;};
  const a=Math.floor(x),b=Math.floor(y),fx=x-a,fy=y-b,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
  return (hash(a,b)*(1-sx)+hash(a+1,b)*sx)*(1-sy)+(hash(a,b+1)*(1-sx)+hash(a+1,b+1)*sx)*sy;
}
function texture(kind: 'wood' | 'stone' | 'fabric', scale: number) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!; const random = rng(kind === 'wood' ? 73 : kind === 'stone' ? 152 : 67);
  const pixels = ctx.createImageData(512,512);
  for (let y=0;y<512;y++) for(let x=0;x<512;x++) {
    let value: number;
    if (kind === 'wood') {
      const phase = x*.24 + Math.sin(y*.016)*1.2 + Math.sin(y*.041 + x*.023)*.6;
      value = 177 + Math.sin(phase)*15 + Math.sin(phase*3.13)*5 + random()*15;
    } else if (kind === 'fabric') {
      value = 197 + (x%4<2?17:-5) + (y%4<2?7:-15) + random()*19;
    } else {
      value=180 + noise(x*.022,y*.022)*24 + noise(x*.067,y*.067)*12 + (random()-.5)*19;
    }
    const i=(y*512+x)*4; pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=value; pixels.data[i+3]=255;
  }
  ctx.putImageData(pixels,0,0);
  if(kind==='wood') {
    for(let i=0;i<65;i++) { const x=random()*512; ctx.strokeStyle=`rgba(49,37,23,${.035+random()*.09})`;ctx.lineWidth=.4+random();ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+15,150,x-7,350,x+3,512);ctx.stroke(); }
    for(let i=0;i<3;i++) { const x=random()*512,y=random()*512; for(let r=2;r<12;r+=2){ctx.strokeStyle='rgba(45,31,16,.09)';ctx.beginPath();ctx.ellipse(x,y,r,r*3.5,0,0,Math.PI*2);ctx.stroke();} }
  }
  const map = new THREE.CanvasTexture(canvas); map.wrapS=map.wrapT=THREE.RepeatWrapping; map.repeat.set(scale,scale); map.colorSpace=THREE.SRGBColorSpace; map.anisotropy=4;
  return map;
}
export function rough(color: string, roughness=.82) { return new THREE.MeshStandardMaterial({color,roughness}); }
export function wood(color: string, scale=1) { const map=texture('wood',scale); return new THREE.MeshStandardMaterial({color,map,bumpMap:map,bumpScale:.012,roughness:.57}); }
export function stone(color: string, scale=1) { const map=texture('stone',scale); return new THREE.MeshStandardMaterial({color,map,bumpMap:map,bumpScale:.007,roughness:.91}); }
export function fabric(color: string, scale=1) { const map=texture('fabric',scale); return new THREE.MeshStandardMaterial({color,map,bumpMap:map,bumpScale:.014,roughness:.96,side:THREE.DoubleSide}); }
export function rounded(w:number,h:number,d:number,r:number,material:THREE.Material) {
  const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,Math.min(w,h,d)/2)),material); mesh.castShadow=true;mesh.receiveShadow=true; return mesh;
}
