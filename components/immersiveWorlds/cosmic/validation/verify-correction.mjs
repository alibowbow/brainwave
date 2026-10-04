import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {chromium} from 'playwright-core';
import {mkdir,writeFile} from 'node:fs/promises';
import {sourceFingerprint,hashFile} from './source-fingerprint.mjs';

const output='components/immersiveWorlds/cosmic/validation/correction-20261004';
await mkdir(output,{recursive:true});
const source=await sourceFingerprint();
const report={source,checks:[],captures:[],errors:[],limitations:[
 'Actual GPU API calls use ANGLE SwiftShader; native mobile GPU performance and half-float-only hardware are not verified.',
 'Byte is explicitly requested before allocation on real supporting hardware, not an extension-masking monkeypatch. Absent-extension and failed-half cases are unit-tested renderer doubles.',
 'Captures use the built standalone harness, DPR1, full quality and time0 for an exact comparison; they are genuine rendered 3D stills.',
]};
const server=await createServer({server:{host:'127.0.0.1',port:5195,strictPort:true,hmr:false,watch:null}});
await server.listen();
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
try{
 for(const mode of ['auto','byte']){
  const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
  const page=await context.newPage();
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(`http://127.0.0.1:5195/immersive-worlds/cosmic/preview/index.html?compatibility=${mode}&probe`);
  await page.waitForSelector('.cosmic-world[data-state=ready]',{timeout:120000});
  const probe=await page.locator('section').evaluate(e=>JSON.parse(e.dataset.framebufferProbe));
  assert.equal(probe.beforeStatus,36053);assert.equal(probe.afterStatus,36053);
  assert.equal(probe.stateRestored,true);assert.equal(probe.bindingRestored,true);assert.equal(probe.error,0);
  report.checks.push(`${mode}: actual GPU restores previous cube target, face3 and mip1, with complete framebuffer`);
  report[`${mode}FramebufferProbe`]=probe;
  for(const [name,width,height] of [['desktop',1280,800],['portrait',344,882],...(mode==='auto'?[['landscape',882,344]]:[])]){
   await page.setViewportSize({width,height});
   await page.waitForFunction(()=>{const c=document.querySelector('canvas');return c&&c.width===innerWidth&&c.height===innerHeight&&Number(c.dataset.frame)>0&&Number(getComputedStyle(c).opacity)>=.999;},{},{timeout:120000});
   const diagnostics=await page.locator('section').evaluate(e=>JSON.parse(e.dataset.diagnostics));
   const stats=await page.locator('canvas').evaluate(e=>({...e.dataset}));
   assert.equal(diagnostics.shadow.centerError,0);
   assert.equal(diagnostics.quality.quality,1);assert.equal(diagnostics.reflection.width,1024);
   assert.equal(diagnostics.reflection.framebufferComplete,true);assert.equal(diagnostics.reflection.framebufferStatus,36053);
   const expected=mode==='byte'?'RGBA8':'RGBA16F';
   assert.equal(diagnostics.reflection.format,expected);
   assert.equal(diagnostics.reflection.componentType,mode==='byte'?35863:5126);
   assert.ok(Number(stats.drawCalls)>100&&Number(stats.triangles)>1_000_000);
   if(mode==='auto')assert.ok(diagnostics.reflection.support.float||diagnostics.reflection.support.halfFloat);
   const file=`${output}/cosmic-${mode}-${name}.png`;
   await page.screenshot({path:file,type:'png',timeout:120000});
   report.captures.push({file,width,height,sha256:await hashFile(file),diagnostics,stats});
   report.checks.push(`${mode}/${name}: ${expected} reflection complete, world shadow error0, full-quality actual 3D`);
   console.log('PASS',mode,name,expected);
  }
  await context.close();
 }
 assert.deepEqual(report.errors,[]);
 const after=await sourceFingerprint();assert.equal(after.digest,source.digest,'tested source/bundle unchanged during capture');
 report.status='passed';
}catch(error){report.status='failed';report.error=String(error);throw error;}
finally{
 await writeFile(`${output}/compatibility-report.json`,JSON.stringify(report,null,2)+'\n');
 await browser.close();await server.close();
}
