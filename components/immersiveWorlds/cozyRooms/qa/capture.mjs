import {chromium} from 'playwright-core';
import {createServer} from 'vite';
import {mkdir,writeFile} from 'node:fs/promises';
const output=process.env.COZY_OUTPUT||'/tmp/cozy-preview';await mkdir(output,{recursive:true});
const port=Number(process.env.COZY_PORT||4197);
const server=await createServer({cacheDir:`/tmp/cozy-vite-${port}`,server:{host:'127.0.0.1',port,strictPort:true}});await server.listen();
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1});page.setDefaultTimeout(120000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
try{for(const world of (process.env.COZY_WORLDS||'relax,sleep_prep,power_nap,nature:winter_lodge').split(',')){
await page.goto(`http://127.0.0.1:${port}/components/immersiveWorlds/cozyRooms/qa/index.html?world=${encodeURIComponent(world)}`);await page.waitForSelector('.cozy-world[data-state="ready"]');
for(const [name,width,height] of [['desktop',1280,850],['portrait',412,915]]){await page.setViewportSize({width,height});await page.waitForFunction(({w,h})=>{const c=document.querySelector('canvas');return c.width===w&&c.height===h;},{w:width,h:height});await page.screenshot({path:`${output}/${world.replace(':','-')}-${name}.png`});}
console.log(world,await page.evaluate(()=>window.__cozyQA.inspect()));}
await writeFile(output+'/errors.json',JSON.stringify(errors,null,2));}finally{await browser.close();await server.close();}
