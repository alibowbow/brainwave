import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

type Triple = [number, number, number];
type FireLog = { length: number; radius: number; position: Triple; rotation: Triple };
type FireOptions = {
  seed: number;
  logs: FireLog[];
  bed: { width: number; depth: number; y: number; z: number };
  flame: { width: number; depth: number; y: number; z: number; height: number; count?: number };
};

// Independently authored char, ash and end-grain maps. These deliberately keep
// the light ash separate from the dark fissures and their sparse buried heat.
function charMaps(random: () => number) {
  const surfaces = Array.from({ length: 3 }, () => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
    return { canvas, ctx: canvas.getContext('2d')! };
  });
  const [color, relief, heat] = surfaces;
  heat.ctx.fillStyle = '#000000'; heat.ctx.fillRect(0, 0, 512, 512);
  const grain = Array.from({ length: 65 * 65 }, () => random());
  const noise = (x: number, y: number) => {
    const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    return (grain[iy * 65 + ix] * (1 - sx) + grain[iy * 65 + ix + 1] * sx) * (1 - sy)
      + (grain[(iy + 1) * 65 + ix] * (1 - sx) + grain[(iy + 1) * 65 + ix + 1] * sx) * sy;
  };
  const colorPixels = color.ctx.createImageData(512, 512), reliefPixels = relief.ctx.createImageData(512, 512);
  for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
    const broad = noise(x * 0.025, y * 0.008), fine = noise(x * 0.12, y * 0.09);
    const value = 23 + broad * 13 + fine * 7 + random() * 5;
    const height = 92 + broad * 104 + fine * 35;
    const offset = (y * 512 + x) * 4;
    for (let channel = 0; channel < 3; channel++) {
      colorPixels.data[offset + channel] = value;
      reliefPixels.data[offset + channel] = height;
    }
    colorPixels.data[offset + 3] = reliefPixels.data[offset + 3] = 255;
  }
  color.ctx.putImageData(colorPixels, 0, 0); relief.ctx.putImageData(reliefPixels, 0, 0);
  // Broken, branching splits follow the wood fibers; there is no tiled cell grid.
  for (let i = 0; i < 155; i++) {
    const x = random() * 512, y = random() * 512, length = 22 + random() * 120;
    const bend = (random() - 0.5) * 13, width = 0.65 + random() * 2.1;
    const draw = (ctx: CanvasRenderingContext2D, dx = 0, from = 0, to = 1) => {
      ctx.beginPath(); ctx.moveTo(x + dx, y + length * from);
      ctx.bezierCurveTo(x + dx + bend, y + length * (from + (to - from) * 0.3), x + dx - bend * 0.4, y + length * (from + (to - from) * 0.7), x + dx + bend * 0.3, y + length * to); ctx.stroke();
    };
    color.ctx.strokeStyle = 'rgba(6,9,8,.84)'; color.ctx.lineWidth = width; draw(color.ctx);
    relief.ctx.strokeStyle = '#303030'; relief.ctx.lineWidth = width + 1.3; draw(relief.ctx);
    if (i % 3 === 0) { color.ctx.strokeStyle = 'rgba(158,159,147,.22)'; color.ctx.lineWidth = 0.7; draw(color.ctx, 1.8, 0.2, 0.8); }
    if (i % 8 === 0) { heat.ctx.strokeStyle = '#c84813'; heat.ctx.lineWidth = 0.7 + random(); draw(heat.ctx, 0, 0.25, 0.48 + random() * 0.19); }
    if (i % 2 === 0) {
      const branchY = y + length * 0.62;
      color.ctx.strokeStyle = '#141615'; color.ctx.lineWidth = 0.9;
      color.ctx.beginPath(); color.ctx.moveTo(x, branchY); color.ctx.lineTo(x + 5 + random() * 13, branchY - 6); color.ctx.lineTo(x + 9 + random() * 16, branchY - 3); color.ctx.stroke();
    }
  }
  // Short irregular checks and worn ash flecks interrupt the grain at many scales.
  for (let i = 0; i < 190; i++) {
    const x = random() * 512, y = random() * 512, w = 4 + random() * 20;
    color.ctx.strokeStyle = 'rgba(8,11,10,.60)'; color.ctx.lineWidth = 0.7 + random();
    color.ctx.beginPath(); color.ctx.moveTo(x, y); color.ctx.lineTo(x + w * 0.43, y - 3); color.ctx.lineTo(x + w, y + 2); color.ctx.stroke();
    relief.ctx.strokeStyle = '#4b4b4b'; relief.ctx.lineWidth = 1.6;
    relief.ctx.beginPath(); relief.ctx.moveTo(x, y); relief.ctx.lineTo(x + w * 0.43, y - 3); relief.ctx.lineTo(x + w, y + 2); relief.ctx.stroke();
  }
  for (let i = 0; i < 5800; i++) {
    const x = random() * 512, y = random() * 512, pale = random() > 0.70;
    color.ctx.fillStyle = pale ? 'rgba(171,172,159,.25)' : 'rgba(7,10,9,.29)';
    color.ctx.fillRect(x, y, 0.4 + random() * 1.7, 0.7 + random() * 5);
  }
  return surfaces.map(({ canvas }, i) => {
    const map = new THREE.CanvasTexture(canvas); map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 4;
    if (i !== 1) map.colorSpace = THREE.SRGBColorSpace;
    return map;
  });
}

function endMap(random: () => number) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#4b4031'; ctx.fillRect(0, 0, 256, 256);
  const cx = 118, cy = 133;
  for (let r = 7; r < 175; r += 4 + random() * 6) {
    ctx.beginPath();
    for (let i = 0; i <= 96; i++) {
      const a = i / 96 * Math.PI * 2, radius = r * (1 + Math.sin(a * 3 + r * 0.022) * 0.045 + Math.sin(a * 7 + 2) * 0.021);
      const x = cx + Math.cos(a) * radius, y = cy + Math.sin(a) * radius * 0.94;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.strokeStyle = r > 100 ? 'rgba(12,15,14,.70)' : 'rgba(21,20,16,.48)'; ctx.lineWidth = 1 + random() * 2.5; ctx.stroke();
  }
  for (let i = 0; i < 13; i++) {
    const a = random() * Math.PI * 2, inner = 15 + random() * 75;
    ctx.strokeStyle = '#111411'; ctx.lineWidth = 1.4 + random() * 3;
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
    ctx.lineTo(cx + Math.cos(a + 0.035) * 91, cy + Math.sin(a + 0.035) * 91);
    ctx.lineTo(cx + Math.cos(a) * 138, cy + Math.sin(a) * 138); ctx.stroke();
  }
  for (let i = 0; i < 1600; i++) {
    ctx.fillStyle = i % 3 ? 'rgba(17,19,16,.12)' : 'rgba(198,185,152,.19)';
    ctx.fillRect(random() * 256, random() * 256, 1, 1);
  }
  const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4; return map;
}

// Coals are much smaller on screen than logs. Their heat has its own coarse,
// discontinuous pattern so it survives minification between the dark ash faces.
function emberMap(seed: number) {
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#320602'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 11; i++) {
    const x = random() * 256, y = random() * 256, radius = 15 + random() * 24;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, '#cb3910'); glow.addColorStop(0.36, '#8a1d06'); glow.addColorStop(1, 'rgba(41,3,0,0)');
    ctx.fillStyle = glow; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  for (let i = 0; i < 17; i++) {
    const x = random() * 256, y = random() * 256, length = 22 + random() * 68, angle = random() * Math.PI * 2;
    const dx = Math.cos(angle) * length, dy = Math.sin(angle) * length;
    const draw = () => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx * 0.42 + 4, y + dy * 0.42 - 3); ctx.lineTo(x + dx * 0.73 - 3, y + dy * 0.73); ctx.lineTo(x + dx, y + dy); ctx.stroke(); };
    ctx.strokeStyle = '#a93208'; ctx.lineWidth = 10 + random() * 5; draw();
    ctx.strokeStyle = i % 3 ? '#ec6218' : '#ff942a'; ctx.lineWidth = 3.2 + random() * 3; draw();
  }
  const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 4; return map;
}

export function createFireDetail(options: FireOptions) {
  let seed = options.seed >>> 0;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const group = new THREE.Group();
  const [charColor, charRelief, charHeat] = charMaps(random);
  const endGrain = endMap(random);
  const bark = new THREE.MeshStandardMaterial({ color: '#8a8e88', map: charColor, bumpMap: charRelief, bumpScale: 0.011, roughness: 1, emissive: '#e75b1c', emissiveMap: charHeat, emissiveIntensity: 0.25 });
  const ends = new THREE.MeshStandardMaterial({ color: '#a7a394', map: endGrain, bumpMap: endGrain, bumpScale: 0.009, roughness: 1 });
  const logCenters: THREE.Vector4[] = [], logAxes: THREE.Vector4[] = [];
  options.logs.forEach((definition, logIndex) => {
    const { length, radius, position, rotation } = definition;
    const geometry = new THREE.CylinderGeometry(radius * 0.85, radius, length, 23, 12);
    const positions = geometry.attributes.position;
    const phase = logIndex * 1.93;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
      const a = Math.atan2(x, z);
      // An uneven perimeter and one split face replace the lathed dowel outline.
      const notch = Math.pow(Math.max(0, Math.cos(a - phase)), 12) * 0.24;
      const scale = 1 + Math.sin(a * 3 + phase) * 0.10 + Math.cos(a * 7 - phase) * 0.043 + Math.sin(a * 11 + y * 17) * 0.027 - notch;
      const bend = Math.sin(y / length * Math.PI + 0.6) * radius * 0.075;
      positions.setXYZ(i, x * scale + bend, y + Math.sin(a * 4 + phase) * radius * 0.035, z * scale);
    }
    geometry.computeVertexNormals();
    const log = new THREE.Mesh(geometry, [bark, ends, ends]);
    log.position.set(...position); log.rotation.set(...rotation); log.castShadow = true; log.receiveShadow = true; log.userData.cozyAction = 'log'; group.add(log);
    // Opaque fuel terminates the volume rays, retaining the real wood occlusion.
    const axis = new THREE.Vector3(0, 1, 0).applyEuler(log.rotation);
    logCenters.push(new THREE.Vector4(position[0], position[1] - options.flame.y, position[2] - options.flame.z, radius * 0.88));
    logAxes.push(new THREE.Vector4(axis.x, axis.y, axis.z, length * 0.5));
  });

  // Several depths of ash-coated fuel form a continuous low bed. Heat lives in
  // fissures rather than turning every low-poly piece into a solid orange gem.
  const coalGeometry: THREE.BufferGeometry[] = [];
  const coalCount = Math.round(105 * options.bed.width / 1.9);
  const matrix = new THREE.Matrix4(), quaternion = new THREE.Quaternion();
  const position = new THREE.Vector3(), scale = new THREE.Vector3();
  for (let i = 0; i < coalCount; i++) {
    const size = options.bed.width * (0.013 + random() * 0.022);
    const geometry = new THREE.IcosahedronGeometry(size, 1);
    const vertices = geometry.attributes.position, colors: number[] = [];
    const shade = 0.15 + random() * 0.16;
    const color = new THREE.Color().setRGB(shade, shade * 0.89, shade * 0.74, THREE.SRGBColorSpace);
    for (let j = 0; j < vertices.count; j++) {
      const x = vertices.getX(j), y = vertices.getY(j), z = vertices.getZ(j);
      const warp = 1 + Math.sin(x / size * 4 + i) * 0.11 + Math.cos(z / size * 5 + i * 0.6) * 0.08;
      vertices.setXYZ(j, x * warp, y * warp, z * warp);
      const ash = Math.max(0, y / size) * 0.15;
      colors.push(color.r + ash, color.g + ash * 0.97, color.b + ash * 0.9);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); geometry.computeVertexNormals();
    const x = (random() - 0.5) * options.bed.width, z = (random() - 0.5) * options.bed.depth;
    const mound = 1 - Math.min(1, Math.abs(x) / (options.bed.width * 0.5));
    position.set(x, options.bed.y + size * 0.3 + random() * 0.029 + mound * 0.023, options.bed.z + z);
    scale.set(1 + random() * 0.4, 0.38 + random() * 0.42, 0.65 + random() * 0.5);
    quaternion.setFromEuler(new THREE.Euler(random() * 0.5, random() * Math.PI, random() * 0.5));
    matrix.compose(position, quaternion, scale); geometry.applyMatrix4(matrix); coalGeometry.push(geometry);
  }
  const bedMaterial = new THREE.MeshStandardMaterial({ color: '#c0b9aa', vertexColors: true, map: charColor, bumpMap: charRelief, bumpScale: 0.008, emissive: '#ff9b4a', emissiveMap: emberMap(options.seed ^ 0x7412), emissiveIntensity: 1.1, roughness: 1 });
  const mergedCoal = mergeGeometries(coalGeometry, false)!; coalGeometry.forEach(geometry => geometry.dispose());
  const coals = new THREE.Mesh(mergedCoal, bedMaterial); coals.receiveShadow = true; group.add(coals);
  const bedBase = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 10), new THREE.MeshStandardMaterial({ color: '#24201a', emissive: '#661905', emissiveIntensity: 0.25, roughness: 1, map: charColor, bumpMap: charRelief, bumpScale: 0.012 }));
  bedBase.position.set(0, options.bed.y - 0.018, options.bed.z); bedBase.scale.set(options.bed.width * 0.52, 0.034, options.bed.depth * 0.56); group.add(bedBase);

  const { flame } = options;
  const bounds = new THREE.Vector3(flame.width * 1.35, flame.height * 1.15, flame.depth * 1.6);
  const roots = Array.from({ length: 8 }, (_, i) => {
    const x = (i / 7 - 0.5) * flame.width * 0.91 + (random() - 0.5) * flame.width * 0.08;
    return new THREE.Vector4(x, (random() - 0.5) * flame.depth * 0.63, flame.height * (0.45 + random() * 0.50), flame.width * (0.073 + random() * 0.041));
  });
  // One bounded, low-step volume gives translucent flame depth and connected,
  // differently sized tongues. Its motion is upward advection, never a flash.
  const volumeMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.FrontSide,
    uniforms: {
      uTime: { value: 0 }, uResponse: { value: 0 }, uBounds: { value: bounds },
      uDepth: { value: flame.depth }, uHeight: { value: flame.height }, uRoots: { value: roots },
      uLogCenter: { value: logCenters }, uLogAxis: { value: logAxes },
    },
    vertexShader: `varying vec3 vSurface; varying vec3 vOrigin;
      void main(){vSurface=position;vec3 eye=cameraPosition-modelMatrix[3].xyz;
        vOrigin=vec3(dot(eye,modelMatrix[0].xyz)/dot(modelMatrix[0].xyz,modelMatrix[0].xyz),dot(eye,modelMatrix[1].xyz)/dot(modelMatrix[1].xyz,modelMatrix[1].xyz),dot(eye,modelMatrix[2].xyz)/dot(modelMatrix[2].xyz,modelMatrix[2].xyz));
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 vSurface; varying vec3 vOrigin;
      uniform float uTime,uResponse,uDepth,uHeight;uniform vec3 uBounds;uniform vec4 uRoots[8];
      uniform vec4 uLogCenter[${options.logs.length}];uniform vec4 uLogAxis[${options.logs.length}];
      float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
      float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
      float fuelHit(vec3 ro,vec3 rd,vec4 center,vec4 axis){
        vec3 p=ro-center.xyz;float da=dot(rd,axis.xyz),pa=dot(p,axis.xyz);float a=1.-da*da,b=dot(rd,p)-da*pa,c=dot(p,p)-pa*pa-center.w*center.w;float result=1.e4;
        float discriminant=b*b-a*c;if(discriminant>0.&&a>.00001){float t=(-b-sqrt(discriminant))/a;if(t>0.&&abs(pa+t*da)<axis.w)result=t;}
        if(abs(da)>.00001){for(int end=0;end<2;end++){float t=((float(end)*2.-1.)*axis.w-pa)/da;vec3 q=p+rd*t;float axial=dot(q,axis.xyz);float radial=dot(q,q)-axial*axial;if(t>0.&&radial<center.w*center.w)result=min(result,t);}}return result;
      }
      void main(){vec3 rd=normalize(vSurface-vOrigin);vec3 inv=1./rd;
        vec3 low=vec3(-uBounds.x*.5,0.,-uBounds.z*.5),high=vec3(uBounds.x*.5,uBounds.y,uBounds.z*.5);
        vec3 t0=(low-vOrigin)*inv,t1=(high-vOrigin)*inv;vec3 nearT=min(t0,t1),farT=max(t0,t1);
        float start=max(0.,max(nearT.x,max(nearT.y,nearT.z))),finish=min(farT.x,min(farT.y,farT.z));
        for(int i=0;i<${options.logs.length};i++)finish=min(finish,fuelHit(vOrigin,rd,uLogCenter[i],uLogAxis[i]));
        if(finish<=start)discard;float stepSize=(finish-start)/24.;vec3 light=vec3(0.);float alpha=0.;
        for(int sampleIndex=0;sampleIndex<24;sampleIndex++){
          vec3 p=vOrigin+rd*(start+(float(sampleIndex)+.5)*stepSize);float h=p.y/uHeight;
          float n=noise(vec3(p.x/uDepth*5.,h*7.-uTime*.72,p.z/uDepth*5.));
          float fine=noise(vec3(p.x/uDepth*11.+2.,h*15.-uTime*1.12,p.z/uDepth*11.));float density=0.;
          for(int i=0;i<8;i++){vec4 root=uRoots[i];float y=p.y/root.z;if(y>0.&&y<1.){
            float sway=(sin(y*5.3+float(i)*2.4-uTime*.94)*.052+(n-.5)*.095)*uHeight*y;
            float radius=root.w*(1.-y)*(.85+n*.36);vec2 offset=p.xz-root.xy-vec2(sway,cos(y*5.+float(i))*uDepth*.055*y);
            offset.y*=1.45;float field=1.-dot(offset,offset)/(radius*radius+.000001);
            density+=max(0.,field-(1.-fine)*.24)*smoothstep(0.,.10,y)*(1.-smoothstep(.82,1.,y));}}
          density=min(density,1.8);float a=1.-exp(-density*stepSize/uDepth*9.2);
          float hot=clamp(density*.58+(1.-h)*.25,0.,1.);vec3 color=mix(vec3(2.7,.13,.0015),vec3(3.1,1.12,.025),hot);
          color=mix(color,vec3(3.5,1.65,.095),smoothstep(.82,1.,hot)*.38);color*=1.+uResponse*.035;
          light+=(1.-alpha)*a*color;alpha+=(1.-alpha)*a;
        }
        if(alpha<.002)discard;gl_FragColor=vec4(light/max(alpha,.001),alpha*.94);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const volumeGeometry = new THREE.BoxGeometry(bounds.x, bounds.y, bounds.z); volumeGeometry.translate(0, bounds.y * 0.5, 0);
  const volume = new THREE.Mesh(volumeGeometry, volumeMaterial); volume.position.set(0, flame.y, flame.z); volume.renderOrder = 2; group.add(volume);
  // A small warm pool touches the fuel and nearby masonry, with no room-wide wash.
  const fuelLight = new THREE.PointLight('#ff8f35', 0.62, Math.max(0.72, flame.width * 1.02), 2);
  fuelLight.position.set(0.06 * flame.width, flame.y + flame.height * 0.24, flame.z + flame.depth * 0.35);
  group.add(fuelLight);
  return {
    group,
    update(time: number, response: number) {
      volumeMaterial.uniforms.uTime.value = time; volumeMaterial.uniforms.uResponse.value = response;
      bedMaterial.emissiveIntensity = 1.1 + Math.sin(time * 0.73) * 0.055 + response * 0.11;
      bark.emissiveIntensity = 0.25 + Math.sin(time * 0.61 + 1.3) * 0.020 + response * 0.030;
      fuelLight.intensity = 0.62 + Math.sin(time * 0.83 + 0.7) * 0.012 + response * 0.022;
    },
  };
}
