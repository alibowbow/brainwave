import { preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
const output=process.env.DEEP_WATER_QA_OUTPUT||'/tmp/deepwater-initial';
await mkdir(output,{recursive:true});
const server=process.env.DEEP_WATER_QA_BASE?null:await preview({configFile:'components/immersiveWorlds/deepWater/qa/vite.config.ts'});
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH||'/workspace/scratch/2bd758a1b983/browser-runtime/chromium',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
page.setDefaultTimeout(120000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
try {
for(const scene of (process.env.DEEP_WATER_SCENES||'waterfall,cave,sea').split(',')){
 await page.goto(`${process.env.DEEP_WATER_QA_BASE||'http://127.0.0.1:4198'}/?scene=${scene}`);
 await page.waitForSelector('.deepwater-world[data-state="ready"]');
 for(const [name,width,height] of [['desktop',1280,800],['portrait',390,844]]) {
  await page.setViewportSize({width,height});
  await page.waitForFunction(({width,height})=>{const c=document.querySelector('canvas');return c.width===width&&c.height===height&&Number(c.dataset.frames)>0},{width,height});
  await page.screenshot({path:`${output}/${scene}-${name}.png`});
  console.log(`${output}/${scene}-${name}.png`);
 }
}
if(errors.length)throw new Error(`Capture recorded ${errors.length} runtime/shader errors; see ${output}/errors.json`);
} finally {await writeFile(`${output}/errors.json`,JSON.stringify(errors,null,2));await browser.close();if(server)await new Promise(resolve=>server.httpServer.close(resolve));}
